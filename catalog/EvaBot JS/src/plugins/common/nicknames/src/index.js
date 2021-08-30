import Sequelize from 'sequelize'

export default class {
  init (henta) {
    const usersPlugin = henta.getPlugin('common/users')
    usersPlugin.field('nickName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })

    usersPlugin.on('create', (user) => {
      user.nickName = user.firstName
    })
  }
}
