class MarriageRequestHandler {
  async accept (ctx, { source, sendResult }) {
    ctx.user.partner = source.vkId
    await ctx.user.save()

    source.partner = ctx.user.vkId
    await source.save()

    sendResult([
      `🎇 ${ctx.user} согласился на предложение ${source}!`
    ])

    source.send([
      `💍 ${ctx.user} сказал вам <<да>>!`
    ])
  }

  deny (ctx, { source }) {
    ctx.answer(`⭕ Вы отклонили приглашение вступления в брак.`)

    source.send(`⭕ ${ctx.user} отклонил ваше приглашение вступления в брак.`)
  }
}

class DivorceSubcommand {
  name = 'развод'

  async handler(ctx) {
    const oldPartner = await ctx.user.marriage.get()

    if (oldPartner) {
      oldPartner.partner = null
      await oldPartner.save()

      ctx.user.partner = null
      await ctx.user.save()

      oldPartner.send(`💔 ${ctx.user} развёлся с вами.`)
    }

    ctx.answer(oldPartner ? `💔 Вы больше не в браке с ${oldPartner}.` : '⛔ Вы и так не в браке!')
  }
}

export default class MarriageCommand {
  name = 'свадьба'
  aliases = ['брак']
  description = 'вступите в брак с дорогим человеком'
  emoji = '❤'
  arguments = {
    target: { name: 'цель', type: 'user', notSelf: true }
  }

  subcommands = [
    new DivorceSubcommand()
  ];

  init (henta) {
    const reqPlugin = henta.getPlugin('common/req')
    reqPlugin.set('tools:marriage', new MarriageRequestHandler())
  }

  clear (henta) {
    const reqPlugin = henta.getPlugin('common/req')
    reqPlugin.unset('tools:marriage')
  }

  async handler(ctx) {
    const oldPartner = await ctx.user.marriage.get()

    if (!oldPartner) {
      const { tip } = ctx.params.target.req.new({
        tag: 'tools:marriage',
        text: `${ctx.user} хочет вступить с вами в брак.`,
        peer: ctx.peerId
      }, ctx.user)

      return ctx.answer(
        ['❤ Надеемся, ваша любовь взаимна и крепка.\n⏳ Ожидание ответа партнёра...', tip]
      )
    }

    ctx.answer(
      (oldPartner && ctx.params.target) && '⛔ Сначала разведитесь.'
    )
  }
}