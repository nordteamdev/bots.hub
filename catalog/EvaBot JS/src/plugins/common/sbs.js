class StepByStepPlugin {
  constructor (henta) {
    this.henta = henta
    this.sessions = new Map()
  }

  init ({ getPlugin }) {
    const botPlugin = getPlugin('common/bot')

    // botPlugin.addHandler(this.handler.bind(this), 1000)
  }

  async handler (ctx, next) {
    const sbsCommand = ctx.payloadValue('sbs')
    if (sbsCommand) {
      if (sbsCommand === "stop") {
        this.sessions.delete(ctx.user.vkId)
      } else {
        await this.startSession(ctx, ctx.msg.payload.sbs)
      }
    }

    if (this.sessions.get(ctx.user.vkId)) {
      await this.process(ctx)
    }

    await next()
  }

  startSession (ctx, data) {
    this.sessions.set(ctx.user.vkId, { data, step: 0, init: true, params: [] })
  }

  async process (ctx) {
    const session = this.sessions.get(ctx.user.vkId)

    if (!session.init) {
      await this.processUserData(ctx, session)
    } else {
      delete session.init
    }

    if (session.step == session.data.titles.length) {
      return this.processEnd(ctx, session)
    }

    ctx.answer({
      message: session.data.titles[session.step],
      keyboard: ctx.keyboard()
        .textButton({ label: 'Отмена', payload: { sbs: 'stop', botcmd: 'меню' } })
    }, { mainMenu: false })
  }

  async processUserData (ctx, session) {
    const botcmdPlugin = ctx.getPlugin('common/botcmd')
    const cmdStr = session.data.command
    const cmd = cmdStr.includes(' ')
      ? botcmdPlugin.commandsSet[cmdStr.split(' ')[0]].subcommands[cmdStr.split(' ')[1]]
      : botcmdPlugin.commandsSet[cmdStr]

    const argsValues = Object.values(cmd.arguments)

    if(argsValues[session.step].type !== 'string') {
      const func = botcmdPlugin.argTypes[argsValues[session.step].type]
      ctx.assert(await func({ ctx, index: session.step, arg: ctx.msg.text }), [
        `⛔ Вы неправильно ввели аргумент <<${argsValues[session.step].name}>>.`,
        '➤ Введите его ещё раз.'
      ])
    }

    session.params.push(ctx.msg.text)
    session.step++
  }

  processEnd (ctx, session) {
    this.sessions.delete(ctx.user.vkId)
    ctx.msg.text = `${session.data.command} ${session.params.join(' ')}`
  }
}

module.exports = StepByStepPlugin
