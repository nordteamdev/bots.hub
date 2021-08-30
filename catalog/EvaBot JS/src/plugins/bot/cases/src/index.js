import Sequelize from 'sequelize';
import CasesImager from './imager.js' ;

export default class CasesPlugin {
  constructor (henta) {
    this.henta = henta;
    this.imager = new CasesImager(this);
  }

  async init (henta) {
    this.initModel();
    this.cases = await henta.util.loadSettings('cases.json');
    this.fromSlug = Object.fromEntries(this.cases.map(v => [v.slug, v]));
  }

  async initModel () {
    const dbPlugin = this.henta.getPlugin('common/db')
    this.Case = dbPlugin.define('case', {
      vkId: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      slug: { type: Sequelize.STRING, allowNull: false, defaultValue: '' }
    }, { timestamps: false });

    await dbPlugin.safeSync(this.Case);
    this.initCasePrototype(this.Case.prototype, this)
  }

  initCasePrototype (casePrototype, plugin) {
    // Костыли :/
    Object.defineProperty(casePrototype, 'type', { get: function () {
      return plugin.fromSlug[this.slug];
    }});
  }

  getCases (vkId) {
    return this.Case.findAll({ where: { vkId } });
  }
}
