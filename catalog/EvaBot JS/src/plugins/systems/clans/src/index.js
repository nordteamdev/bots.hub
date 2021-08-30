import Sequelize from 'sequelize';
import initArgumentType from './argumentType';

export default class ClansPlugin {
  constructor(henta) {
    this.henta = henta;
  }

  async init(henta) {
    const dbPlugin = henta.getPlugin('common/db');

    this.Clan = dbPlugin.define('clan', {
      name: Sequelize.STRING,
      chatId: Sequelize.INTEGER,
      ownerVkId: Sequelize.INTEGER,
      slots: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 5 },
      terr: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      isClosed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    }, { timestamps: false });
    await dbPlugin.safeSync(this.Clan);

    this.ClanMember = dbPlugin.define('clanMember', {
      vkId: Sequelize.INTEGER,
      clanId: Sequelize.INTEGER
    }, { timestamps: false });
    await dbPlugin.safeSync(this.ClanMember);

    this.applyMethods();
    this.userMethods();
    initArgumentType(this);
  }

  applyMethods() {
    const usersPlugin = this.henta.getPlugin('common/users');

    this.addMethod('addMember', (self, vkId) => this.ClanMember.create({ vkId, clanId: self.id }));
    this.addMethod('getOwner', ({ ownerVkId }) => usersPlugin.get(ownerVkId));
    this.addMethod('getMembersCount', ({ id }) => this.ClanMember.count({ where: { clanId: id } }));
    this.addMethod('getMembers', async ({ id }) => {
      const memberList = await this.ClanMember.findAll({ where: { clanId: id } });
      return Promise.all(memberList.map(i => usersPlugin.get(i.vkId)));
    });
  }

  userMethods() {
    const usersPlugin = this.henta.getPlugin('common/users');

    usersPlugin.group('clans')
      .method('getMember', ({ vkId }) => this.ClanMember.findOne({ where: { vkId } }))
      .method('get', async user => {
        const member = await user.clans.getMember();
        return member && this.getClanById(member.clanId);
      })
      .method('isOwner', async user => {
        const clan = await user.clans.getClan();
        return clan && user.vkId === clan.ownerVkId;
      })
      .end();
  }

  async createClan(clanInfo) {
    const clan = await this.Clan.create(clanInfo);

    this.henta.log(`Новый клан: ${clan.name} (№${clan.id})`);
    await this.ClanMember.create({ vkId: clan.ownerVkId, clanId: clan.id });
    return clan;
  }

  async getClanById(clanId) {
    return this.Clan.findOne({ where: { id: clanId } });
  }

  addMethod(name, fn) {
    // eslint-disable-next-line func-names
    this.Clan.prototype[name] = function (...args) { return fn(this, ...args); };
  }
}
