export default class HelloChatPlugin {
  init (henta) {
    this.henta = henta
    henta.vk.updates.on('message', this.processMessage.bind(this))
  }

  processMessage (ctx, next) {
    if (!ctx.isEvent ||
      ctx.eventType !== 'chat_invite_user' ||
      ctx.eventMemberId !== -this.henta.groupId) {
      return next()
    }

    const allmailPlugin = this.henta.getPlugin('common/allmail')
    allmailPlugin.subscribe(ctx.peerId, 'news');
    allmailPlugin.subscribe(ctx.peerId, 'updates');
    allmailPlugin.subscribe(ctx.peerId, 'payouts');

    ctx.send([
      `🦄 Я вас категорически приветствую.`,
      `\nТеперь в вашей беседе будет намного веселее, ведь здесь поселилась прекрасная Ева Цифрова.`,
      `\n📣 Со мной можно общаться:`,
      '>> Упоминаниями (*bot_eva)',
      '>> Слешем (/)',
      '>> Или выдайте боту полный доступ к переписке и используйте привычные вам обращения (Ева)',
      '\nПо всем вопросам >> *evabottp(тык!)',
      'vk.com/@bot_eva-who'
    ].join('\n'))

    return next()
  }
}
