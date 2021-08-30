import compose from 'middleware-io'
import applyContextMethods from './messageContext'
import handleError from './errorHandler'
import AwaitEventEmitter from 'await-event-emitter'

export default class MessageProcessor extends AwaitEventEmitter {
  constructor (bot) {
    super()
    Object.assign(this, {
      bot,
      handlers: new Map()
    })
  }

  async start (bot) {
    const handlersQueue = await bot.henta.util.loadSettings('bot/handlers.json')
    // Check
    handlersQueue.forEach(v => {
      if (!this.handlers.get(v)) {
        throw Error(`Обработчик ${v} не существует.`)
      }
    })
    
    this.middleware = compose(handlersQueue.map(v => this.handlers.get(v)))

    bot.henta.vk.updates.on('message', (ctx, next) => this.process(ctx, next))
  }

  async process (ctx, next) {
    if (this.bot.settings.ignoreGroups) {
      if (ctx.senderId < 0) {
        return next()
      }
    }

    applyContextMethods(ctx, this.bot);

    try {
      await this.middleware(ctx, () => {
        
      });
    } catch (err) {
      this.emit('processError', ctx, err)
      handleError(this.bot, ctx, err)
    }

    await next()
  }
}