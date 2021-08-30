import { Keyboard } from 'vk-io';

function makeButtons(ctx, buttons) {
  const keyboard = Keyboard.builder();
  buttons.forEach(v => keyboard.textButton({
    label: v[0],
    payload: { command: v[1] },
    color: v[2] && 'primary'
  }));

  keyboard.inline(ctx.clientInfo.inline_keyboard === true);
  keyboard.oneTime();

  return keyboard;
}

class ChangeSubcommand {
  name = 'сменить';
  arguments = {
    slug: { name: 'тип', type: 'word' }
  };

  async handler(ctx) {
    const allmailPlugin = ctx.getPlugin('common/allmail');
    // const { briefNumber } = ctx.getPlugin('mybot/moneys');

    const category = allmailPlugin.categories.find(v => v.slug === ctx.params.slug);
    if (!category) {
      return ctx.answer('📛 Такая подписка не существует.');
    }

    const isSubscribed = await allmailPlugin.is(ctx.peerId, category.slug);

    if (isSubscribed) {
      allmailPlugin.unsubscribe(ctx.peerId, category.slug);

      ctx.builder()
        .text(`💔 Вы отписались от <<${category.title}>>`)
        .keyboard(makeButtons(ctx, [
          ['Назад', 'рассылка', true]
        ]))
        .answer();
    } else {
      allmailPlugin.subscribe(ctx.peerId, category.slug);

      ctx.builder()
        .lines([
          `${category.emoji} Вы подписались на <<${category.title}>>`,
          !ctx.isChat && `💸 За каждое полученное сообщение вы будете получать ${category.bonus.toLocaleString('ru')} яриков!`
        ])
        .keyboard(makeButtons(ctx, [
          ['Назад', 'рассылка', true]
        ]))
        .answer();
    }
  }
}

export default class MailSumscriberCommand {
  name = 'рассылка';
  description = 'управление рассылкой';
  emoji = '📣';
  subcommands = [
    new ChangeSubcommand()
  ];

  async handler(ctx) {
    const allmailPlugin = ctx.getPlugin('common/allmail');
    const subscribes = await allmailPlugin.getSubscribes(ctx.peerId);

    const keyboard = Keyboard.builder();

    allmailPlugin.categories.forEach(v => keyboard.textButton({
      label: `${v.title}`,
      color: subscribes.includes(v.slug) ? 'positive' : 'negative',
      payload: { command: `рассылка сменить ${v.slug}` }
    }).row());

    ctx.builder()
      .text(ctx.isChat ? '✉ Подписки чата:' : '✉ Ваши подписки:')
      .keyboard(keyboard.inline(ctx.clientInfo.inline_keyboard === true).oneTime())
      .answer();
  }
}
