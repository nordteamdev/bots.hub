import Sequelize from 'sequelize'

export default function initUsersMethods (plugin) {
  const usersPlugin = plugin.henta.getPlugin('common/users')

  usersPlugin.field('money', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10000
  })

  usersPlugin.group('moneys')
    .method('getBrief', (self) => plugin.briefNumber(self.money))
    .method('getLocaled', (self) => self.money.toLocaleString('ru'))
    .end()
}