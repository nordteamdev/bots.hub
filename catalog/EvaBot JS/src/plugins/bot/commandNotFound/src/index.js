import { Keyboard } from 'vk-io';

export default class CommandNotFoundPlugin {
  init(henta) {
    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('commandNotFound', this.handler.bind(this));
  }

  async handler(ctx, next) {
    if (ctx.answered || ctx.isChat) {
      return next();
    }

    ctx.builder()
      .text('🔘 Используйте кнопки для игры в бота.')
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Так точно!', color: 'primary', payload: { command: 'меню' } })
        .oneTime())
      .answer();
    await next();
  }
}
