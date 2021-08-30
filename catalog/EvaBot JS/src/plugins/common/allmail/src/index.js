import model from './model.js';

export default class AllmailPlugin {
  constructor(henta) {
    Object.assign(this, {
      henta
    });
  }

  async init(henta) {
    const dbPlugin = henta.getPlugin('common/db');

    // Load categories
    this.categories = await henta.util.loadSettings('allmailCategories.json');

    // Create Subscriber table
    this.AllmailSubscriber = dbPlugin.define('allmailSubscriber', model, { timestamps: false });
    await dbPlugin.safeSync(this.AllmailSubscriber);
  }

  async is(vkId, slug) {
    return !!await this.AllmailSubscriber.findOne({ where: { vkId, slug } });
  }

  subscribe(vkId, slug) {
    return this.AllmailSubscriber.findOrCreate({ where: { vkId, slug } });
  }

  unsubscribe(vkId, slug) {
    return this.AllmailSubscriber.destroy({ where: { vkId, slug } });
  }

  async getSubscribes(vkId) {
    const rows = await this.AllmailSubscriber.findAll({ where: { vkId } });
    return rows.map(v => v.slug);
  }
}
