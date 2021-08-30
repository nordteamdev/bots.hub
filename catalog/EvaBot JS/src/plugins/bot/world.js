const Sequelize = require('sequelize');

class WorldPlugin {
  constructor(henta) {
    const usersPlugin = henta.getPlugin('common/users');

    usersPlugin.addModelField('position', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: `city:varifan`
    });

    usersPlugin.addMethod('getPosition', (self) => this.cities[self.position.split(':')[1]].name);
    usersPlugin.addMethod('getCity', (self) => this.cities[self.position.split(':')[1]]);
  }

  init(henta) {
    this.cities = require(`${henta.botdir}/cities.json`);
    //henta.hookManager.add("bot_answer", this.navigateKeyboard.bind(this));
  }

  navigateKeyboard(ctx) {
          ctx.answer({
              keyboard: this.henta.vk.Keyboard.builder()
                  .textButton({ label: '🖼 Переместиться', payload: { botcmd: 'навигация' } }).row()
                  .textButton({ label: '📋 Информация о проекте', payload: { botcmd: 'информация' } }).row()
                  .textButton({ label: '🚪 Профиль', payload: { hud: 'профиль' } })
          })
  }
}

module.exports = WorldPlugin;
