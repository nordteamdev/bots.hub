import Sequelize from 'sequelize';
import Vk from 'vk-io';

export default class PostGamePlugin {
  constructor(henta) {
    this.henta = henta;
  }

  async init(henta) {
    const dbPlugin = henta.getPlugin('common/db');

    this.RepostProcess = dbPlugin.define('repostProcess', {
      wallId: Sequelize.INTEGER(),
      endTime: Sequelize.INTEGER()
    }, { timestamps: false });

    await this.RepostProcess.sync();

    setInterval(async () => {
      const ends = await this.RepostProcess.findAll({
        where: {
          endTime: { [Sequelize.Op.lte]: Math.floor(Date.now() / 1000) }
        }
      });

      ends.forEach(async v => {
        await this.processReposts(v);
        v.destroy();
      });
    }, 60000);
  }

  async processReposts(process) {
    const serviceVk = new Vk({
      token: this.henta.config.private.pageToken
    });

    const { profiles } = await serviceVk.api.wall.getReposts({
      owner_id: -134466548,
      post_id: process.wallId
    });

    const usersPlugin = this.henta.getPlugin('common/users');
    const { diffLine } = this.henta.getPlugin('systems/moneys');
    profiles.forEach(async ({ id }) => {
      const user = await usersPlugin.get(id);
      if (!user) {
        this.henta.warning(`${user.getFullName()} не игрок.`);
        return;
      }

      user.money += 1000000;
      user.lvl.addScore(50);
      user.save();

      user.send([
        '✔ Раздача окончена, ты получил биты!',
        diffLine(user, 1000000)
      ]);

      this.henta.log(`${user.getFullName()} получил бонус с раздачи.`);
    });
  }

  async createPost() {
    const uploader = new Vk({
      token: this.henta.config.private.pageToken
    });

    const photo = await uploader.upload.wallPhoto({
      source: 'res/img/repost.png'
    });

    // eslint-disable-next-line camelcase
    const { post_id } = await uploader.api.wall.post({
      owner_id: -134466548,
      message: '💰 Сделай репост записи и получи 1.000.000 бит!\n\n#раздача@bot_eva',
      attachment: photo
    });

    this.henta.vk.api.wall.createComment({
      owner_id: -134466548,
      message: '* Бонус будет выдан через сутки после начала акции. Вы должны быть зарегистрированы в боте. Для регистрации просто отправьте мне в ЛС любое сообщение.',
      post_id
    });

    this.RepostProcess.create({
      wallId: post_id,
      endTime: Math.floor(Date.now() / 1000) + 86400
    });

    // eslint-disable-next-line camelcase
    return post_id;
  }
}
