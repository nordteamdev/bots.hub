class DoSubcommand {
  name = 'бой';
  arguments = {
    slug: { type: 'word', optional: true }
  };

  async handler(ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');
    const clanMember = await ctx.user.clans.getMember();
    if (!clanMember) {
      return ctx.oops('Вы не можете воевать за территорию без клана.', 'Зашибись', 'меню');
    }

    const game = await redisPlugin.get('terrwar-game');
    if (!game) {
      return ctx.oops('Сейчас никто не воюет.');
    }

    if (ctx.params.slug) {
      const right = await redisPlugin.get(`terrwar:${ctx.user.vkId}`);
      if (right !== ctx.params.slug) {
        return ctx.oops('Вы промахнулись с ответом', 'Ну капец..', 'меню');
      }

      ctx.send('➕ Ваше очко достаётся вашему клану.');
    }

    const right = ['vegetable', 'fish', 'fruit', 'berry', 'nut', 'drink'][Math.floor(Math.random() * 6)];
    await redisPlugin.set(`terrwar:${ctx.user.vkId}`, right);

    const data = await ctx.henta.util.loadSettings('terwar.json');
    const names = {
      vegetable: 'Овощ',
      fish: 'Рыба',
      fruit: 'Фрукт',
      berry: 'Ягода',
      nut: 'Орех',
      drink: 'Напиток'
    };

    ctx.builder()
      .text(`💎 ${data[right][Math.floor(Math.random() * data[right].length)]} - это что?`)
      .buttons(ctx, Object.keys(data).map(v => ({
        label: names[v],
        payload: { command: `тервар бой ${v}` }
      })))
      .answer();
  }
}

export default class TerrWarCommand {
  name = 'тервар';
  description = 'войны за территорию';
  emoji = '⚔';
  subcommands = [
    new DoSubcommand()
  ];

  handler(ctx) {
    ctx.answer('abd');
  }
}
