class OnlinePlugin {
  constructor (henta) {
    this.henta = henta
    this.timeToOffline = 300
    this.online = {}
  }

  init ({getPlugin}) {
    process.on('SIGINT', this.onProcessExit.bind(this))
    // getPlugin('common/bot').addHandler(this.onMessage.bind(this), 9999)
  }

  async onMessage (ctx, next) {
    if (!this.online[ctx.msg.from_id]) {
      this.henta.hookManager.runOut('online_in', ctx.msg.from_id)
      //await ctx.user.openAchievement('firstMessage')
      this.henta.log(`${ctx.user.getFullName()} вошёл в онлайн.`)
    }

    this.online[ctx.msg.from_id] = Date.now()
    await next()
  }

  async start ({log, getPlugin}) {
    const jsonOnline = await getPlugin('common/redis').get('online')
    if (jsonOnline)
      this.online = JSON.parse(jsonOnline)

    log(`Текущий онлайн: ${this.getOnline()} п.`)
  }

  onProcessExit () {
    this.henta.getPlugin('common/redis')
      .set('online', JSON.stringify(this.online))
  }

  isOnline (vkId) {
    const last = this.online[vkId]
    if (!last)
      return false

    const isOnline = Date.now() - last <= this.timeToOffline * 1000
    if (!isOnline)
      delete this.online[vkId]

    return isOnline
  }

  getOnline () {
    this.clear()
    return Object.values(this.online).length
  }

  clear () {
    Object.keys(this.online).forEach((vkId) => {
      if (Date.now() - this.online[vkId] <= this.timeToOffline * 1000)
        return;

      delete this.online[vkId]
      this.henta.hookManager.runOut('online_out', vkId)
      this.henta.log(`vk.com/id${vkId} покинул онлайн.`)
    })
  }
}

module.exports = OnlinePlugin
