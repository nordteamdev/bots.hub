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

class PullSubcommand {
  name = 'продать';
  arguments = {
    count: { name: 'кол-во', type: 'integer' }
  }

  async handler(ctx) {
    if (ctx.params.count < 1) {
      return ctx.answer('⛔ Минимум - 1 ярик.');
    }

    const bankPlugin = ctx.getPlugin('bot/bank');
    const account = await bankPlugin.getAccount(ctx.user.vkId);
    if (!account || account.count < ctx.params.count) {
      return ctx.answer('⛔ Недостаточно яриков.');
    }

    account.count -= ctx.params.count;
    if (account.count <= 0) {
      // account.destroy();
      // bankPlugin.cache.set(ctx.user.vkId, 0);
    // } else {
      account.save();
    }

    const rate = await bankPlugin.getRate();
    ctx.user.money += ctx.params.count * rate;

    ctx.builder()
      .lines([
        '💿 Вы продали ярики.',
        `📟 ${account.count.toLocaleString('ru')} яр.`
      ])
      .keyboard(makeButtons(ctx, [
        ['Банк', 'банк', true]
      ]))
      .answer();
  }
}

class PushSubcommand {
  name = 'купить';
  arguments = {
    count: { name: 'кол-во', type: 'integer' }
  }

  async handler(ctx) {
    if (ctx.params.count < 10) {
      return ctx.answer('⛔ Минимум - 10 яриков.');
    }

    const bankPlugin = ctx.getPlugin('bot/bank');
    const rate = await bankPlugin.getRate();
    if (ctx.params.count * rate > ctx.user.money) {
      return ctx.answer('⛔ Недостаточно бит.');
    }

    if (ctx.params.count < 10) {
      return ctx.answer('⛔ Минимум - 10 яриков.');
    }

    const account = await bankPlugin.getAccount(ctx.user.vkId)
      || await bankPlugin.createAccount(ctx.user.vkId);

    account.count += ctx.params.count;
    account.save();
    ctx.user.money -= ctx.params.count * rate;

    ctx.builder()
      .lines([
        '💿 Ваш счёт пополнен.',
        `📟 ${account.count.toLocaleString('ru')} яр.`
      ])
      .keyboard(makeButtons(ctx, [
        ['Банк', 'банк', true]
      ]))
      .answer();
  }
}

export default class BankCommand {
  name = 'банк';
  description = 'второй баланс';
  emoji = '🏦';
  arguments = {
    target: { name: 'цель', type: 'user', optional: true }
  };

  subcommands = [
    new PushSubcommand(),
    new PullSubcommand()
  ];

  generateChart(history) {
    const data = {
      type: 'line',
      data: {
        labels: history.map(() => ''),
        datasets: [
          { label: 'Курс', data: history, borderColor: 'green', fill: false }
        ]
      },
      options: {
        legend: { display: false },
        scales: { yAxes: [{ display: true, ticks: { beginAtZero: false } }] }
      }
    };

    return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(data))}`;
  }

  async handler(ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');

    const target = ctx.params.target || ctx.user;
    const bankPlugin = ctx.getPlugin('bot/bank');
    const [history, account, rate] = await Promise.all([
      redisPlugin.getObject('bank-history'),
      bankPlugin.getAccount(target.vkId),
      bankPlugin.getRate()
    ]);

    ctx.builder()
      .lines([
        account && target !== ctx.user && `👤 ${target}:`,
        account && `📟 ${account.count.toLocaleString('ru')} яр.`,
        `📈 Курс: ${rate.toLocaleString('ru')} бит.`,
        !account && '\n💡 Используйте `банк купить <кол-во>` для покупки яриков.',
        account && '\n💡 Используйте `банк продать <кол-во>` для продажи яриков.'
      ])
      .cachedPhoto(history.join(','), () => this.generateChart(history))
      .answer();
  }
}
