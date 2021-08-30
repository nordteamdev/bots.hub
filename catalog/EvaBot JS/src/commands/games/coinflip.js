class CoinflipRequest {
  accept(ctx, { source, rate, sendResult }) {
    const { diffLine } = ctx.getPlugin('systems/moneys');

    if (ctx.user.money < rate) {
      return ctx.answer('⛔ Недостаточно бит.');
    }

    if (source.money < rate) {
      return ctx.answer('⛔ У оппонента недостаточно бит.');
    }

    const winner = Math.random() >= 0.5 ? ctx.user : source;
    const looser = winner === ctx.user ? source : ctx.user;

    winner.money += rate;
    looser.money -= rate;
    source.save();

    sendResult([
      `💰 ${rate.toLocaleString('ru')} бит.`,
      `⚜ ${winner} победил!`
    ]);

    winner.send([
      '✔ Вы победили в коинфлип!',
      diffLine(winner, rate)
    ]);

    looser.send([
      '💢 Вы проиграли в коинфлип.',
      diffLine(looser, -rate)
    ]);
  }

  deny(ctx, { source }) {
    ctx.answer('⭕ Вы отклонили приглашение в коинфлип.');
    source.send(`⭕ ${ctx.user} отклонил ваше приглашение в коинфлип.`);
  }
}

export default class {
  name = 'кф'
  description = 'коинфлип'
  emoji = '🌗'
  arguments = {
    target: { name: 'профиль', type: 'user', notSelf: true },
    rate: { name: 'ставка', type: 'moneys' }
  }

  init(henta) {
    const reqPlugin = henta.getPlugin('common/req');
    reqPlugin.set('games:coinflip', new CoinflipRequest());
  }

  clear(henta) {
    const reqPlugin = henta.getPlugin('common/req');
    reqPlugin.unset('games:coinflip');
  }

  async handler(ctx) {
    if (ctx.params.target.money < ctx.params.rate) {
      return ctx.answer('⛔ У оппонента недостаточно бит.');
    }

    const rateStr = ctx.params.rate.toLocaleString('ru');
    const { tip } = ctx.params.target.req.new({
      tag: 'games:coinflip',
      text: `${ctx.user} хочет сыграть с вами в КФ на ${rateStr} бит.`,
      payload: { rate: ctx.params.rate },
      peer: ctx.peerId
    }, ctx.user);

    ctx.answer([
      `💰 Ставка: ${rateStr} бит.`,
      '⏳ Ожидание ответа оппонента...',
      tip
    ]);
  }
}
