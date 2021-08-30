const Sequelize = require('sequelize')

class BansPlugin {
  constructor () {
    Object.assign(this, {

    })
  }

  init ({ getPlugin, hookManager }) {
    const usersPlugin = getPlugin('common/users')
    usersPlugin.addModelField(
      'ban',
      { type: Sequelize.STRING, allowNull: false, defaultValue: '0' }
    )
    usersPlugin.addMethod('banUser', async (self, time) => await this.banUser(self, time))
    usersPlugin.addMethod('isBanned', (self) => this.isBanned(self))
    /* hookManager.add('bot_answer', async (ctx) => {
      if (ctx.user.isBanned()) ctx.answered = true
    }) */
  }

  isBanned (user) {
    const now = new Date().getTime()
    return Number(user.ban) > 0 ? (now < Number(user.ban)) : false
  }

  async banUser (user, time) {
    const now = new Date().getTime()
    user.ban = now + (time * 1000)
    await user.save()
  }
}

module.exports = BansPlugin
