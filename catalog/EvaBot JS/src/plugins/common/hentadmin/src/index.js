export default class HentadminPlugin {
  constructor(henta) {
    this.henta = henta;
    this.messages = [];
    this.avgResponseTime = 0;
    this.messagesInProcess = new WeakMap();
  }

  init(henta) {
    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('hentadmin', this.onProcessMessage.bind(this));
    messageProcessor.on('answer', this.onAnswerMessage.bind(this));
  }

  async start(henta) {
    const redisPlugin = henta.getPlugin('common/redis');
    this.messages = await redisPlugin.serializer.run({
      slug: 'hentadmin:message-times'
    });

    this.computeResponseTime();
  }

  computeResponseTime() {
    if (this.messages.size === 0) {
      return 0;
    }

    const values = Array.from(this.messages).sort((a, b) => a < b);
    const half = Math.floor(values.length / 2);

    if (values.length % 2) {
      this.avgResponseTime = values[half];
    }

    this.avgResponseTime = (values[half - 1] + values[half]) / 2.0;
  }

  onProcessMessage(ctx, next) {
    this.messagesInProcess.set(ctx, Date.now());
    return next();
  }

  onAnswerMessage(ctx) {
    const startTime = this.messagesInProcess.get(ctx);
    if (!startTime) {
      return;
    }

    const timeDiff = Date.now() - startTime;

    setImmediate(() => {
      this.messages.push(timeDiff);
      while (this.messages.length > 200) {
        this.messages.shift();
      }

      this.computeResponseTime();
    
      this.henta.log(`${ctx.senderId}${ctx.isChat ? `/${ctx.chatId}` : ''}: ${ctx.text || '<текст отсутствует>'} (${timeDiff} мс.)`);
      if (timeDiff > 500) {
        this.henta.warning(`Время обработки сообщения слишком высоко: ${timeDiff} мс.`);
      }
    });
  }
}
