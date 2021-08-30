export default class InformationCommand {
  name = 'информация';
  description = 'о проекте';
  emoji = '📜';
  cache = {
    type: 'all',
    ttl: 10 * 60 * 1000
  };

  async handler(ctx) {
    const { User } = ctx.getPlugin('common/users');
    const { briefNumber } = ctx.getPlugin('systems/moneys');
    const { avgResponseTime } = ctx.getPlugin('common/hentadmin');

    ctx.answer([
      `⚙ Движок: [hentavk|HENTA] ${ctx.henta.version}.`,
      `👤 Игроков: ${await User.count()} ч.`,
      `💵 Денег: ${briefNumber(await User.sum('money'))} бит.`,
      `⏱️ Время ответа: ${Math.floor(avgResponseTime)} мс.`
    ]);
  }
}
