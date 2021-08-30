class SelectSubcommand {
  name = 'выбрать';

  async handler(ctx) {
    if (await ctx.user.pets.get()) {
      return ctx.builder()
        .line('🧧 У вас уже есть питомец.')
        .makeButtons(ctx, [['Чудесно!', 'пит', true]])
        .answer();
    }

    const petsPlugin = ctx.getPlugin('systems/pets');
    const redisPlugin = ctx.getPlugin('common/redis');

    const pet = await redisPlugin.getObject(`pets:select:${ctx.user.vkId}`);
    if (!pet) {
      return ctx.builder()
        .text('🔎 Давайте для начала найдём питомца.')
        .makeButtons(ctx, [['Ну давай', 'приют', true]])
        .answer();
    }

    petsPlugin.Pet.create({
      name: pet.name,
      type: pet.type,
      ownerVkId: ctx.user.vkId,
      variety: 0,
      force: 0,
      rating: 0
    });

    ctx.builder()
      .text('✔ Вы завели питомца!')
      .makeButtons(ctx, [['Чудесно!', 'пит', true]])
      .answer();
  }
}

export default class ShelderCommand {
  name = 'приют';
  description = 'поиск питомца';
  emoji = '🌷';
  subcommands = [
    new SelectSubcommand()
  ];

  async handler(ctx) {
    if (await ctx.user.pets.get()) {
      return ctx.builder()
        .line('🧧 У вас уже есть питомец.')
        .makeButtons(ctx, [['Чудесно!', 'пит', true]])
        .answer();
    }

    const petsPlugin = ctx.getPlugin('systems/pets');
    const redisPlugin = ctx.getPlugin('common/redis');

    const names = await ctx.henta.util.loadSettings('pets/names.json');

    const kind = petsPlugin.kinds[Math.floor(Math.random() * petsPlugin.kinds.length)];
    const name = names[Math.floor(Math.random() * names.length)];

    const pet = {
      type: kind.slug,
      name
    };

    redisPlugin.setObject(`pets:select:${ctx.user.vkId}`, pet);

    ctx.builder()
      .text(`${kind.emoji} ${pet.name}`)
      .makeButtons(ctx, [
        ['Его!', 'приют выбрать', true],
        ['Следующий', 'приют']
      ])
      .answer();
  }
}
