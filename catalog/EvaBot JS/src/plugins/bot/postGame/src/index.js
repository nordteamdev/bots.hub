import Sequelize from 'sequelize';
import Vk from 'vk-io';

export default class PostGamePlugin {
  constructor(henta) {
    this.henta = henta;
  }

  async init(henta) {
    const dbPlugin = henta.getPlugin('common/db');

    this.PostGameProcess = dbPlugin.define('postGameProcess', {
      wallId: Sequelize.INTEGER(),
      answered: Sequelize.TEXT(),
      rightAnswer: Sequelize.STRING(),
      createTime: Sequelize.INTEGER(),
      bonusData: Sequelize.TEXT()
    }, { timestamps: false });

    await dbPlugin.safeSync(this.PostGameProcess);

    // await this.PostGameProcess.sync({ force: true })

    henta.vk.updates.on('comment', this.processUserAnswer.bind(this));
  }

  async processUserAnswer(ctx, next) {
    if (ctx.userId < 0) {
      return next();
    }

    const gameProcess = await this.PostGameProcess.findOne({
      where: { wallId: ctx.objectId }
    });

    if (!gameProcess) {
      return next();
    }

    const usersPlugin = this.henta.getPlugin('common/users');
    const user = await usersPlugin.get(ctx.userId);
    if (!user) {
      this.henta.vk.api.wall.createComment({
        owner_id: -134466548,
        post_id: gameProcess.wallId,
        reply_to_comment: ctx.id,
        message: '❔ Похоже я вижу тебя впервые и не могу проверить твой ответ без регистрации. Напиши мне в ЛС, а после, вернись сюда и напиши свой ответ снова.'
      });
      return next();
    }

    const answered = JSON.parse(gameProcess.answered);
    if (answered[user.vkId]) {
      return user.send('🎈 Вы уже участвовали в этой игре.');
    }

    if (ctx.text.toLowerCase().replace('ё', 'е') === gameProcess.rightAnswer) {
      // const { diffLine } = this.henta.getPlugin('systems/moneys');

      const bonus = JSON.parse(gameProcess.bonusData);
      if (bonus.type === 'bits') {
        user.money += bonus.count;
      }

      if (bonus.type === 'case') {
        const casesPlugin = this.henta.getPlugin('bot/cases');
        casesPlugin.Case.create({
          vkId: user.vkId,
          slug: bonus.slug
        });
      }

      user.lvl.addScore(100);
      user.save();

      user.send([
        '✔ Ты правильно ответил в игре и получил приз!'
      // diffLine(user, gameProcess.bonus)
      ]);

      answered[user.vkId] = 'W';
    } else {
      user.send([
        '❌ Увы, но ты ошибся с ответом.',
        '💢 В этой игре больше нельзя отвечать.'
      ]);

      answered[user.vkId] = 'L';
    }

    if (Object.entries(answered).filter(v => v[1] === 'W').length >= 100) {
      this.destroyGame(gameProcess);
    } else {
      gameProcess.answered = JSON.stringify(answered);
      gameProcess.save();
    }

    await next();
  }

  destroyGame(gameProcess) {
    this.henta.vk.api.wall.createComment({
      owner_id: -134466548,
      post_id: gameProcess.wallId,
      message: '🔷 Игра завершена!'
    });
  }

  async createGame(GameClass, bonusType, custom) {
    const currentGame = new GameClass();
    await currentGame.init();

    const uploader = new Vk({
      token: this.henta.config.private.pageToken
    });

    const photo = await uploader.upload.wallPhoto({
      source: await currentGame.generateImage()
    });

    let text = '';
    const bonusData = { type: bonusType };
    if (bonusType === 'bits') {
      bonusData.count = 10000 + Math.floor(Math.random() * 1e6);
      text = `💰 Напиши ответ в комментарии и получи ${bonusData.count.toLocaleString()} бит!`;
    }

    if (bonusType === 'case') {
      const casesPlugin = this.henta.getPlugin('bot/cases');
      bonusData.slug = custom;
      text = `📦 Напиши ответ в комментарии и получи ${casesPlugin.fromSlug[custom].title}!`;
    }

    const wallId = await uploader.api.wall.post({
      owner_id: -134466548,
      message: `${text}\n${currentGame.tip || ''}\n#game@bot_eva`,
      attachment: photo.toString()
    });

    this.henta.vk.api.wall.createComment({
      owner_id: -134466548,
      post_id: wallId.post_id,
      message: '* Вы должны быть зарегистрированы в боте. Для регистрации просто отправьте мне в ЛС любое сообщение.'
    });

    this.PostGameProcess.create({
      wallId: wallId.post_id,
      answered: '{}',
      rightAnswer: currentGame.rightAnswer,
      createTime: Math.floor(Date.now() / 1000),
      bonusData: JSON.stringify(bonusData)
    });

    return currentGame;
    // Debug
  /* const usersPlugin = this.henta.getPlugin('common/users')
    const user = await usersPlugin.get(169494689)
    user.sendBuilder()
      .text(`Правильный ответ: ${currentGame.rightAnswer}`)
      .photo(await currentGame.generateImage())
      .send() */
  }

  async debugGame(GameClass) {
    const currentGame = new GameClass();
    const usersPlugin = this.henta.getPlugin('common/users');
    const user = await usersPlugin.get(169494689);
    user.sendBuilder()
      .text(`Правильный ответ: ${currentGame.rightAnswer}`)
      .photo(await currentGame.generateImage())
      .send();
  }
}
