export default function handleError (plugin, ctx, err) {
  plugin.henta.error(`${err.stack}`)
  if (ctx.user.pex.is('get-errors')) {
    return ctx.send(err.stack)
  }

  report(plugin, err, ctx)
  if (plugin.settings.errorMessage) {
    ctx.send(plugin.settings.errorMessage)
  }
}

async function report (plugin, err, ctx) {
  const usersPlugin = plugin.henta.getPlugin('common/users')
  const recipient = await usersPlugin.get(plugin.settings.sendErrorsTo)
  recipient.send([
    `⚠ ${ctx.user} совершил ошибку:`,
    `📟 Текст: ${ctx.text || '<текст отсутствует>'}`,
    `🧨 Ошибка: ${err.stack}`
  ])
}
