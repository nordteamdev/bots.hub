export default class DonatCommand {
  name = 'донат'
  description = 'товар за деньги'
  emoji = '💲'
  cache = {
    type: 'all',
    ttl: 86400 * 1000
  };

  handler (ctx) {
    ctx.answer([
      '💲 Товар можно выбрать в списке товаров группы, а потом переслать сюда.',
      '>> https://vk.com/market-134466548'
    ])
  }
}
