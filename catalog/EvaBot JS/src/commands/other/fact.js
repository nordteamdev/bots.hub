const facts = [
  // 0
  async ctx => {
    const dbPlugin = ctx.getPlugin('common/db');
    const [data] = await dbPlugin.query(
      'SELECT (SELECT count(id) FROM users WHERE money < :bal) * 100 / (SELECT count(id) FROM users) as res',
      { replacements: { bal: ctx.user.money } }
    );

    ctx.answer(`💡 Вы богаче, чем ${data[0].res}% игроков бота.`);
  },
  // 1
  async ctx => {
    ctx.answer(`💡 Если бы в Еве были игровые ID, то вы бы имели ID-${ctx.user.id}.`);
  },
  // 2
  async ctx => {
    const items = [
      ['дошираков', 40],
      ['пицц', 300],
      ['булок хлеба', 22],
      ['яблок', 20],
      ['бананов', 15],
      ['слабых ноутбуков', 15000],
      ['сяоми', 10000],
      ['долларов', 60]
    ];

    const item = items[Math.floor(Math.random() * items.length)];
    ctx.answer(`💡 Если бы ваш баланс был рублями, то вы смогли бы купить ${Math.floor(ctx.user.money / item[1])} ${item[0]}.`);
  }
];

export default class FactCommand {
  name = 'факт'
  aliases = ['факт']
  description = 'узнайте факт о себе'
  emoji = '💡'
  right = 'set-role'

  handler(ctx) {
    return facts[facts.length - 1](ctx);
    // return facts[Math.floor(Math.random() * facts.length)](ctx);
  }
}
