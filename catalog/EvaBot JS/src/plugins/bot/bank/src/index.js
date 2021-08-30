import Sequelize from 'sequelize';

export default class BankPlugin {
  constructor(henta) {
    this.henta = henta;
    this.cache = new Map();
  }

  async init() {
    this.initModel();
  }

  async initModel() {
    const dbPlugin = this.henta.getPlugin('common/db');
    this.BankAccount = dbPlugin.define('bankAccount', {
      vkId: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
    }, { timestamps: false });

    await dbPlugin.safeSync(this.BankAccount);
  }

  async getRate() {
    const redisPlugin = this.henta.getPlugin('common/redis');
    return +(await redisPlugin.get('bank-rate'));
  }

  async changeRate(rand = 0.5) {
    let isUp = Math.random() < rand;
    let rate = await this.getRate();

    if (rate <= 500) {
      isUp = true;
    }

    if (rate >= 1000) {
      isUp = false;
    }

    rate += Math.floor(Math.random() * (isUp ? 5 : -5));
    this.henta.vk.api.messages.send({
      message: `${isUp ? '📈' : '📉'} Курс: ${rate.toLocaleString('ru')} бит.`,
      chat_id: 2
    });

    const redisPlugin = this.henta.getPlugin('common/redis');
    redisPlugin.set('bank-rate', rate);

    const history = await redisPlugin.getObject('bank-history') || [];
    history.push(rate);
    if (history.length > 50) {
      history.shift();
    }

    redisPlugin.setObject('bank-history', history);
  }

  async getAccount(vkId) {
    const cachedUser = this.cache.get(vkId);
    if (cachedUser) {
      return cachedUser;
    }

    const row = await this.BankAccount.findOne({ where: { vkId } });
    if (row) {
      this.cache.set(vkId, row);
      return row;
    }
  }

  async createAccount(vkId) {
    const [row] = await this.BankAccount.findOrCreate({ where: { vkId } });
    this.cache.set(vkId, row);

    return row;
  }
}
