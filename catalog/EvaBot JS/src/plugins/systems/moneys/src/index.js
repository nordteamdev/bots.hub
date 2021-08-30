import initBotcmdType from './botcmdType.js'
import initUserMethods from './userMethods.js'

export default class {
  constructor (henta) {
    this.henta = henta

    this.diffLine = this.diffLine.bind(this)
  }

  init (henta) {
    initBotcmdType(this)
    initUserMethods(this)

    const { messageProcessor } = henta.getPlugin('common/bot')
    messageProcessor.handlers.set('write-balance', this.writeBalance.bind(this))
    messageProcessor.on('answer', this.balanceLine.bind(this))
  }

  writeBalance (ctx, next) {
    ctx.lastBalance = ctx.user.money
    return next()
  }

  balanceLine (ctx, builder) {
    if (ctx.lastBalance === ctx.user.money) {
      return
    }

    const diff = ctx.user.money - ctx.lastBalance
    builder.line(this.diffLine(ctx.user, diff))
  }

  diffLine (user, diff) {
    const briefedDiff = this.briefNumber(Math.abs(diff))
    const briefedBalance = this.briefNumber(user.money)
    return `${diff > 0 ? '➕' : '➖'} ${briefedDiff} бит (${briefedBalance}).`
  }

  briefNumber (number) {
    let suffix = ''
    if (Math.abs(number) >= 1e9) {
      number /= 1e9
      suffix = 'млрд'
    } else if (Math.abs(number) >= 1e6) {
      number /= 1e6
      suffix = 'млн'
    } else {
      while (Math.abs(number) >= 1e3) {
        number /= 1e3
        suffix += 'к'
      }
    }

    return `${Number(number.toFixed(1))}${suffix}`
  }
}
