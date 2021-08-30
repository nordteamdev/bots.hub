import moment from 'moment';
import 'moment/locale/ru';

export default class PlayTask {
  constructor(plugin, petId, data) {
    this.plugin = plugin;
    this.petId = petId;
    Object.assign(this, data);

    setTimeout(() => this.end(), this.endTime - Date.now());
  }

  async end() {
    const pet = await this.plugin.Pet.findOne({ where: { id: this.petId } });
    const petOwner = await this.plugin.henta.getPlugin('common/users').get(pet.ownerVkId);

    const force = Math.floor(Math.random() * 100);
    pet.force += force;
    pet.save();

    petOwner.lvl.addScore(force);
    petOwner.save();

    petOwner.send([
      '⚾ Вы поиграли с питомцем.',
      `➕ ${force} ед. силы питомцу.`
    ]);

    this.plugin.tasks.delete(this.petId);
  }

  getText() {
    return `⌛ %petname% закончит игру ${moment(this.endTime).fromNow()}.`;
  }

  toJSON() {
    return {
      endTime: this.endTime
    };
  }
}
