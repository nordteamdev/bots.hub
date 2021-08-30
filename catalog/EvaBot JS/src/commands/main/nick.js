export default class NickCommands {
  name = 'ник'
  description = 'изменить никнейм'
  emoji = '🎩'
  right = 'change-nickname'
  arguments = {
    nick: { name: 'ник', type: 'string', min: 2, max: 15 }
  }

  handler (ctx) {
    const oldNickname = ctx.user.nickName
    ctx.user.nickName = ctx.params.nick
    ctx.answer([
      '✔ Вы изменили свой никнейм',
      `📃 ${oldNickname} → ${ctx.params.nick}`
    ])
  }
}
