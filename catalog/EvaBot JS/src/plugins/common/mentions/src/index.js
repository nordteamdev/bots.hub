export default class {
  constructor(henta) {
    this.regexp = new RegExp(`\\[club${henta.groupId}\\|[^\\|\\[\\]]+\\]`);
  }

  async init(henta) {
    this.mentions = await henta.util.loadSettings('mentions.json');
    henta.log(`К вашему боту можно будет обращаться через: ${this.mentions.join(', ')}`);

    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('check-mentions', this.handler.bind(this));
  }

  handler(ctx, next) {
    if (ctx.text) {
      const [isMention, mentionLength] = this.checkMentions(ctx.text);
      if (isMention) {
        ctx.text = this.clear(ctx.text.substring(mentionLength));
        return next();
      }

      const [isPush, str] = this.checkPush(ctx.text);
      if (isPush) {
        ctx.text = this.clear(ctx.text.replace(str, ''));
        return next();
      }
    }

    if (!ctx.isChat || this.checkReply(ctx)) {
      return next();
    }
  }

  checkReply(ctx) {
    return ctx.replyMessage && ctx.replyMessage.senderId === -ctx.henta.groupId;
  }

  checkPush(text) {
    const result = text.match(this.regexp);
    if (!result) {
      return [false];
    }

    return [true, result[0]];
  }

  checkMentions(text) {
    const str = text.toLowerCase();
    for (const mention of this.mentions) {
      if (str.startsWith(mention)) {
        return [true, mention.length];
      }
    }

    return [false];
  }

  clear(text) {
    return text.replace(/^[., ]+/, '');
  }
}
