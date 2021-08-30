export default async function startDataSaver (plugin) {
  const redisPlugin = plugin.henta.getPlugin('common/redis')

  // Save
  process.on('SIGINT', () =>
    redisPlugin.setObject('requests', Array.from(plugin.requests))
  )

  // Load
  const requestsSaves = await redisPlugin.getObject('requests')
  if (requestsSaves) {
    plugin.requests = new Set(requestsSaves)
    plugin.henta.log(`Заявки успешно восстановлены. (${plugin.requests.size} шт.)`)
  }
}
