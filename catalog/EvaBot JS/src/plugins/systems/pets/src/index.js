import Sequelize from 'sequelize';
import PlayTask from './tasks/play';
import DuelTask from './tasks/duel';

export default class PetsPlugin {
  constructor(henta) {
    this.henta = henta;

    this.taskTypes = {
      play: PlayTask,
      duel: DuelTask
    };
  }

  async init(henta) {
    this.kinds = await henta.util.loadSettings('pets/kinds.json');
    this.kindsFromSlug = Object.fromEntries(this.kinds.map(v => [v.slug, v]));
    this.getKind = slug => this.kindsFromSlug[slug];

    this.skill = await henta.util.loadSettings('pets/skill.json');
    this.skillFromSlug = Object.fromEntries(this.skill.map(v => [v.slug, v]));

    this.initUser(henta);
    this.initPetModel(henta);
  }

  initUser(henta) {
    const usersPlugin = henta.getPlugin('common/users');
    usersPlugin.group('pets')
      .method('get', ({ vkId: ownerVkId }) => this.Pet.findOne({ where: { ownerVkId } }))
      .end();
  }

  async initPetModel(henta) {
    const dbPlugin = henta.getPlugin('common/db');
    this.Pet = dbPlugin.define('pet', {
      name: Sequelize.STRING,
      type: Sequelize.STRING,
      ownerVkId: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      variety: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      force: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      energy: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 100 },
      skill: { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
      rating: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
    }, { timestamps: false });
    await dbPlugin.safeSync(this.Pet);
    this.applyMethods();
  }

  addMethod(name, fn) {
    // eslint-disable-next-line func-names
    this.Pet.prototype[name] = function (...args) {
      return fn(this, ...args);
    };
  }

  applyMethods() {
    this.addMethod('getKind', pet => this.kindsFromSlug[pet.type]);
    this.addMethod('getSkill', pet => {
      const str = pet.skill.split('|');
      return {
        attack: this.skillFromSlug[str[0]],
        defend: this.skillFromSlug[str[1]]
      };
    });

    this.addMethod('getAvailableSkill', pet => {
      const kind = pet.getKind();
      return kind.skill.map(v => this.skillFromSlug[v]);
    });

    this.addMethod('setSkill', (pet, skill) => {
      const oldSkill = pet.skill.split('|');
      pet.skill = `${skill.attack || oldSkill[0] || ''}|${skill.defend || oldSkill[1] || ''}`;
    });
  }

  async start(henta) {
    const redisPlugin = henta.getPlugin('common/redis');
    this.tasks = await redisPlugin.serializer.run({
      slug: 'pets:tasks',
      class: Map
    });

    Array.from(this.tasks).forEach(([key, value]) => {
      const Task = this.taskTypes[value.type];
      if (!Task) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      value.data = new Task(this, key, value.data);
    });
  }

  createTask(petId, type, data) {
    const Task = this.taskTypes[type];
    this.tasks.set(petId, {
      data: new Task(this, petId, data),
      type
    });
  }

  getBusy(petId) {
    return this.tasks.get(petId);
  }
}
