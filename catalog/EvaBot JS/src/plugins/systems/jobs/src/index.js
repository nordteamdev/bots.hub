import Sequelize from 'sequelize';

export default class JobsPlugin {
  constructor(henta) {
    this.henta = henta;
  }

  async init() {
    this.initUser();
    await this.loadJobs();
  }

  initUser() {
    const usersPlugin = this.henta.getPlugin('common/users');

    usersPlugin.field('job', Sequelize.STRING(16));
    usersPlugin.group('jobs')
      .method('get', user => user.job && this.get(user.job))
      .method('paySalary', user => this.paySalary(user))
      .end();
  }

  async loadJobs() {
    this.list = await this.henta.util.loadSettings('jobs.json');
    this.fromSlug = Object.fromEntries(this.list.map(v => [v.slug, v]));
  }

  get(slug) {
    return this.fromSlug[slug];
  }
}
