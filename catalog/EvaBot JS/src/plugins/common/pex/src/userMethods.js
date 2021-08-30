import Sequelize from 'sequelize'

export default function initUsersMethods (plugin) {
  const usersPlugin = plugin.henta.getPlugin('common/users')

  usersPlugin.field('role', {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: 'user'
  })

  usersPlugin.group('pex')
    .method('is', ({ role }, right) => plugin.isAllow(role, right))
    .method('get', ({ role }) => plugin.fromSlug[role])
    .end()
}
