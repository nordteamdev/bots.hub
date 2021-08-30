import Sequelize from 'sequelize'

export default function initUsersMethods (plugin) {
  const usersPlugin = plugin.henta.getPlugin('common/users')

  usersPlugin.field('partner', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  })

  usersPlugin.group('marriage')
    .method('get', async (self) => self.partner === null ? null : await usersPlugin.get(self.partner))
    .end()
}