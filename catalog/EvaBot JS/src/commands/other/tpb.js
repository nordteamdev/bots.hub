export default class {
  constructor () {
    Object.assign(this, {
      name: 'тпб',
      description: 'список тех. персонала',
      emoji: '🕶'
    })
  }

  async handler (ctx) {
    const usersPlugin = ctx.getPlugin('common/users')

    const mainAdmin = await usersPlugin.User.findOne({ where: { role: 'mainAdministrator' } })
    const admins = await usersPlugin.User.findAll({ where: { role: 'administrator' } })
    const moders = await usersPlugin.User.findAll({ where: { role: 'moderator' } })

    ctx.answer([
      '⬛ Гл. Администратор:',
      `>> ${mainAdmin}`,
      '⬛ Администрация:',
      ...admins.map(v => `>> ${v}`),
      moders.length > 0 && '⬛ Модерация:',
      ...moders.map(v => `>> ${v}`),
      '⬛ По вопросам:',
      '>> [evabottp|EVABOT SUPPORT]'
    ])
  }
}