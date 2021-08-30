class InfoSubcommand {
  name = 'инфо';
  arguments = {
    slug: { name: 'slug', type: 'word' }
  };

  async handler(ctx) {
    const petsPlugin = ctx.getPlugin('systems/pets');
    const skill = petsPlugin.skillFromSlug[ctx.params.slug];
    if (!skill) {
      return ctx.answer('⛔ Умение не существует.');
    }

    ctx.builder()
      .lines([
        `⚡ ${skill.name}`,
        skill.type === 'attack' ? '💥 Тип: Атака' : '🛡 Тип: Защита',
        `📄 Описание: ${skill.description}`,
        `\n📚 Доступно для: ${petsPlugin.kinds.filter(v => v.skill.includes(skill.slug)).map(v => v.name).join(', ')}.`
      ])
      .buttons(ctx, [
        { label: 'Установить', payload: { command: `питскилл сет ${skill.slug}` }, color: 'positive' },
        { label: 'Назад', payload: { command: 'питскилл' } }
      ], 2)
      .answer();
  }
}

class SetSubcommand {
  name = 'сет';
  arguments = {
    slug: { name: 'slug', type: 'word' }
  };

  async handler(ctx) {
    const petsPlugin = ctx.getPlugin('systems/pets');
    const oneSkill = petsPlugin.skillFromSlug[ctx.params.slug];
    if (!oneSkill) {
      return ctx.answer('⛔ Умение не существует.');
    }

    const pet = await ctx.user.pets.get();
    if (!pet) {
      return ctx.oops('У вас нет питомца.');
    }

    const kind = petsPlugin.getKind(pet.type);
    if (!kind.skill.includes(oneSkill.slug)) {
      return ctx.answer('⛔ Вашему питомцу недоступно такое умение.');
    }

    pet.setSkill({ [oneSkill.type]: oneSkill.slug });
    pet.save();

    const skill = pet.getSkill();

    ctx.builder()
      .lines([
        '⚡ Обновлено:',
        `💥 Атака: ${skill.attack ? skill.attack.name : 'нет'}`,
        `🛡 Защита: ${skill.defend ? skill.defend.name : 'нет'}`
      ])
      .buttons(ctx, [{ label: 'Назад', payload: { command: 'питскилл' } }])
      .answer();
  }
}

export default class PetSkillCommand {
  name = 'питскилл';
  description = 'умения питомца';
  emoji = '🦠';
  subcommands = [
    new InfoSubcommand(),
    new SetSubcommand()
  ];

  async handler(ctx) {
    const pet = await ctx.user.pets.get();
    if (!pet) {
      return ctx.oops('У вас нет питомца.');
    }

    const skill = pet.getSkill();
    const available = pet.getAvailableSkill();

    ctx.builder()
      .lines([
        `💥 Атака: ${skill.attack ? skill.attack.name : 'нет'}`,
        `🛡 Защита: ${skill.defend ? skill.defend.name : 'нет'}`,
        `\n📚 Доступно: ${available.map(v => v.name).join(', ')}.`
      ])
      .buttons(ctx, available.map(v => ({
        label: v.name,
        payload: { command: `питскилл инфо ${v.slug}` }
      })), 2)
      .answer();
  }
}
