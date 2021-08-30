export default class {
  name = 'тест';
  description = 'проверка бота';
  emoji = '✅';
  cache = {
    type: 'all',
    ttl: 86400 * 1000
  };

  handler(ctx) {
    ctx.answer('✅ Бот работает.');
  }
}
