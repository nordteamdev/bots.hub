function logMessage (ctx, next) {
  ctx.henta.log(`${ctx.senderId}: ${ctx.text || '-'}`)
  return next()
}

export default function getHandlers (bot) {
  const handlers = []

  if (bot.settings.logNewMessages) {
    handlers.push(logMessage)
  }

  return handlers
}
