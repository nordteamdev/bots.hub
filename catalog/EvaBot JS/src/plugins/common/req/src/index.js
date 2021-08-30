import createMessageBuilder from './../../bot/src/messageBuilder/creator.js'
import initUserMethods from './userMethods.js'
import startDataSaver from './dataSaver.js'

export default class {
  constructor (henta) {
    this.henta = henta
    this.tags = {}
    this.requests = new Set()
  }

  init (henta) {
    initUserMethods(this)

    const { messageProcessor } = henta.getPlugin('common/bot')
    messageProcessor.handlers.set('requests', this.handler.bind(this))
  }

  async start (henta) {
    await startDataSaver(this)
  }

  async processButton (ctx, payload) {
    const req = Array.from(this.requests).find(v => v.code === payload.code)
    if (!req) {
      return
    }

    if (ctx.user.vkId === req.vkId) {
      this.triggerAction(ctx, req, payload.action)
      // await this.processSelf(ctx, req)
    } else if (req.sourceId && ctx.user.vkId === req.sourceId) {
      // this.processSource(ctx, req)
    }
  }

  async triggerAction (ctx, req, action) {
    this.requests.delete(req)

    req.payload = req.payload || {}
    if (req.sourceId) {
      req.payload.source = await ctx.getPlugin('common/users').get(req.sourceId)
    }

    if (req.peers[0] !== ctx.peerId) {
      req.peers.push(ctx.peerId)
    }

    req.payload.peers = req.payload.peers || req.peers

    req.payload.sendResult = async (data) => {
      ctx.answered = true
      const messageBuilder = createMessageBuilder(data)
      messageBuilder.setContext({ vk: ctx.vk })
      await messageBuilder.run()

      for (const peerId of req.payload.peers) {
        messageBuilder.msg['peer_id'] = peerId
        ctx.api.messages.send(messageBuilder.msg)
      }
    }

    return this.tags[req.tag][action](ctx, req.payload)
  }

  async handler (ctx, next) {
    const payload = ctx.getPayloadValue('req')
    if (payload) {
      await this.processButton(ctx, payload)
      return next()
    }

    const reply = ctx.replyMessage

    if (!reply || reply.senderId !== -ctx.henta.groupId) {
      return next()
    }

    if (!['+', '-', '1', '0', 'да', 'нет', 'отмена'].includes(ctx.text.toLowerCase())) {
      return next()
    }

    const req = Array.from(this.requests).find((i) => reply.text.includes(`(${i.code})`))

    if (!req) {
      return next()
    }

    if (ctx.user.vkId === req.vkId) {
      await this.processSelf(ctx, req)
    } else if (req.sourceId && ctx.user.vkId === req.sourceId) {
      this.processSource(ctx, req)
    }

    await next()
  }

  async processSelf (ctx, req) {
    this.requests.delete(req)

    req.payload = req.payload || {}
    if (req.sourceId) {
      req.payload.source = await ctx.getPlugin('common/users').get(req.sourceId)
    }

    if (req.peers[0] !== ctx.peerId) {
      req.peers.push(ctx.peerId)
    }

    req.payload.peers = req.payload.peers || req.peers

    req.payload.sendResult = async (data) => {
      const messageBuilder = createMessageBuilder(data)
      messageBuilder.setContext({ vk: ctx.vk })
      await messageBuilder.run()

      for (const peerId of req.payload.peers) {
        messageBuilder.msg.peer_id = peerId
        messageBuilder.context.vk.api.messages.send(messageBuilder.msg);
      }
    }

    switch (ctx.text.toLowerCase()) {
      case '+':
      case '1':
      case 'принять':
      case 'да':
        await this.tags[req.tag].accept(ctx, req.payload)
        break
      case '-':
      case '0':
      case 'отклонить':
      case 'нет':
      case 'отмена':
        await this.tags[req.tag].deny(ctx, req.payload)
        break
    }
  }

  processSource (ctx, req) {
    if (ctx.text.toLowerCase() !== 'отмена') {
      return
    }

    this.requests.delete(req)
    ctx.answer('⭕ Вы отменили свою заявку.')
  }

  getFreeCode () {
    const symbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    const getSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]
    while (true) {
      const code = `${getSymbol()}${getSymbol()}`
      if (!Array.from(this.requests).find((i) => i.code === code)) {
        return code
      }
    }
  }

  set (tag, handler) {
    if (this.tags[tag]) {
      this.henta.warning(`Тег ${tag} уже существует`)
    }

    this.tags[tag] = handler
  }

  unset (tag) {
    delete this.tags[tag]
  }
}