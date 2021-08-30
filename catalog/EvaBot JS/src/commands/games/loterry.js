export default class LoterryCommand {
  name = 'лотерея';
  description = 'лотерея с числом';
  emoji = '🔟';
  arguments = {
    rate: { name: 'ставка', type: 'moneys', min: 100 }
  };

  async handler(ctx) {
    const isWin = Math.random() > 0.7;
    const coff = Math.random() > 0.9 ? 3 : 2;

    ctx.user.money -= ctx.params.rate;
    if (isWin) {
      ctx.user.money += ctx.params.rate * coff;
      await ctx.user.achievements.unlockIf('loterry-winner', ctx.params.rate >= 1000000);
    }

    ctx.builder()
      .text(isWin ? `🎆 Победа X${coff}` : '💸 Поражение :~)')
      .answer();
  }
}
