class SlotSubcommand {
  name = 'слот';

  async handler(ctx) {
    const clan = await ctx.user.clans.get();
    if (!clan) {
      return ctx.oops('Вы не состоите в клане', 'Назад', 'клан');
    }

    const price = Math.floor(1000 * 1.6 ** clan.slots);
    if (ctx.user.money < price) {
      return ctx.oops(`У вас нет ${price.toLocaleString('ru')} бит`, 'Назад', 'клан');
    }

    ctx.user.money -= price;
    clan.slots += 1;
    clan.save();

    ctx.builder()
      .text('✅ Вы купили слоты для клана.')
      .buttons(ctx, [
        { label: 'Купить ещё', color: 'primary', payload: { command: 'клан слот' } },
        { label: 'К клану', payload: { command: 'клан' } }
      ])
      .answer();
  }
}

class CreateSubcommand {
  name = 'создать';
  arguments = {
    name: { name: 'название', type: 'string' }
  };

  async handler(ctx) {
    if (await ctx.user.clans.getMember()) {
      return ctx.oops('Вы уже состоите в клане', 'К клану', 'клан');
    }

    if (ctx.user.money < 1e8) {
      return ctx.oops('У вас нет 100 000 000 бит', 'Назад', 'клан');
    }

    const clansPlugin = ctx.getPlugin('systems/clans');
    const clan = await clansPlugin.createClan({
      name: ctx.params.name,
      ownerVkId: ctx.user.vkId
    });

    ctx.user.money -= 1e8;

    ctx.builder()
      .text(`✅ Вы успешно создали клан №${clan.id}.`)
      .buttons(ctx, [
        { label: 'К клану', color: 'primary', payload: { command: 'клан' } }
      ])
      .answer();
  }
}

class ModeSubcommand {
  name = 'режим';

  async handler(ctx) {
    const clan = await ctx.user.clans.get();
    if (!clan || clan.ownerVkId !== ctx.user.vkId) {
      return ctx.oops('Вы не владелец клана', 'Назад', 'клан');
    }

    clan.isClosed = !clan.isClosed;
    clan.save();

    ctx.answer([
      clan.isClosed ? '🔒 Вы закрыли клан.' : '🔓 Вы открыли клан.',
      clan.isClosed
        ? '\nТеперь в него можно попасть только по приглашению.'
        : '\nТеперь любой желающий может подать заявку на вступление в клан.'
    ]);
  }
}

class MembersSubcommand {
  name = 'участники';
  arguments = {
    clan: { name: 'клан', type: 'clan' }
  };

  async handler(ctx) {
    const clanMembers = await ctx.params.clan.getMembers();

    ctx.builder()
      .line('👥 Список участников:')
      .lines(clanMembers.map((v, i) => `${i + 1}. ${v}`))
      .answer();
  }
}

class KickSubcommand {
  name = 'выгнать';
  arguments = {
    target: { name: 'цель', type: 'user', notSelf: true }
  };

  async handler(ctx) {
    const clan = await ctx.user.clans.get();
    if (!clan || clan.ownerVkId !== ctx.user.vkId) {
      return ctx.oops('Вы не владелец клана', 'Назад', 'клан');
    }

    const member = await ctx.params.target.clans.getMember();
    if (!member || member.clanId !== clan.id) {
      return ctx.oops(`${ctx.params.target} нет в вашем клане.`, 'Назад', 'клан');
    }

    member.destroy();

    ctx.params.target.send(`💢 ${ctx.user} исключил вас из клана.`);
    ctx.answer(`✔ ${ctx.params.target} исключён из клана.`);
  }
}

class LeaveSubcommand {
  name = 'покинуть';

  async handler(ctx) {
    const clan = await ctx.user.clans.get();
    if (!clan) {
      return ctx.oops('Вы не состоите в клане', 'Назад', 'клан');
    }

    if (clan.ownerVkId === ctx.user.vkId) {
      return ctx.oops('Вы не можете покинуть свой клан', 'Назад', 'клан');
    }

    const member = await ctx.user.clans.getMember();
    member.destroy();

    const clanOwner = await clan.getOwner();

    clanOwner.send(`💢 ${ctx.user} покинул ваш клан.`);
    ctx.answer('✔ Вы успешно покинули клан.');
  }
}

class JoinRequestHandler {
  async accept(ctx, { source }) {
    const clan = await ctx.user.clans.get();
    if (!clan) {
      return ctx.oops('У вас нет клана.', 'Топ кланов', 'клан топ');
    }

    if (clan.ownerVkId !== ctx.user.vkId) {
      return ctx.oops('Вы не владелец клана.', 'К клану', 'клан');
    }

    if (await source.clans.getMember()) {
      return ctx.oops('Он уже состоит в клане.', 'К клану', 'клан');
    }

    if (await clan.getMembersCount() >= clan.slots) {
      return ctx.oops('В клане нет мест.', 'К клану', 'клан');
    }

    await clan.addMember(source.vkId);

    source.send(`✅ ${ctx.user} принял вас в клан <<${clan.name}>> №${clan.id}.`);
    ctx.answer(`✅ Вы приняли ${source} в клан.`);
  }

  deny(ctx, { source }) {
    ctx.answer('⭕ Вы отклонили заявку в клан.');
    source.send(`⭕ ${ctx.user} отклонил вашу заявку в клан.`);
  }
}

class JoinSubcommand {
  name = 'вступить';
  arguments = {
    clan: { name: 'клан', type: 'clan' }
  };

  init(henta) {
    const reqPlugin = henta.getPlugin('common/req');
    reqPlugin.set('clans:join', new JoinRequestHandler());
  }

  clear(henta) {
    const reqPlugin = henta.getPlugin('common/req');
    reqPlugin.unset('clans:join');
  }

  async handler(ctx) {
    if (await ctx.user.clans.getMember()) {
      return ctx.oops('Вы уже состоите в клане', 'К клану', 'клан');
    }

    if (ctx.params.clan.isClosed) {
      return ctx.answer('🔒 Это закрытый клан. Попасть в него можно только по приглашению.');
    }

    const clanOwner = await ctx.params.clan.getOwner();
    clanOwner.req.new({
      tag: 'clans:join',
      text: `${ctx.user} хочет вступить в ваш клан.`
    }, ctx.user);

    ctx.answer('✅ Вы подали заявку в клан.');
  }
}

class InfoSubcommand {
  name = 'инфо';
  arguments = {
    clan: { name: 'клан', type: 'clan' }
  };

  async handler(ctx) {
    const { clan } = ctx.params;

    ctx.builder()
      .lines([
        `🛡 Клан «${clan.name}» №${clan.id}:`,
        `👤 Владелец: ${await clan.getOwner()};`,
        `👥 Участников: ${await clan.getMembersCount()}/${clan.slots} чел.`,
        clan.isClosed ? '🔒 Закрытый клан;' : '🔓 Открытый клан;'
      ])
      // .buttons([])
      .answer();
  }
}

export default class ClanCommand {
  name = 'клан';
  description = 'клановая система';
  emoji = '🛡';
  subcommands = [
    new InfoSubcommand(),
    new JoinSubcommand(),
    new KickSubcommand(),
    new ModeSubcommand(),
    new CreateSubcommand(),
    new LeaveSubcommand(),
    new SlotSubcommand(),
    new MembersSubcommand()
  ];

  init(henta) {
    this.subcommands[1].init(henta);
  }

  clear(henta) {
    this.subcommands[1].clear(henta);
  }

  async handler(ctx) {
    const clan = await ctx.user.clans.get();
    if (!clan) {
      return ctx.oops('У вас нет клана.', 'Топ кланов', 'клан топ');
    }

    ctx.params = { clan };
    return this.subcommands[0].handler(ctx);
  }
}
/*
  async createHandler (ctx) {
    await ctx.user.assertClan(ctx, 'free')
    ctx.user.buy(ctx, 1e7)

    const clan = await ctx.getPlugin('mybot/systems').createClan({
      name: ctx.params.name,
      ownerVkId: ctx.user.vkId
    })

    ctx.send([
      '✅ Вы успешно создали клан.',
      '➤ Информация о нём появится в следующем сообщении.'
    ])

    ctx.user.acceptBuy(ctx)
    await this.infoHandler(Object.assign(ctx, { params: { clan } }))
  }
*/
