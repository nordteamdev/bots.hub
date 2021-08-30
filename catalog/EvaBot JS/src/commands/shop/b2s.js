export default class B2sCommand {
  name = 'б2с';
  description = 'ориджинал';
  emoji = '🤩';
  arguments = {
    count: {
      name: 'кол-во', type: 'integer', min: 100, max: 1000
    }
  };

  handler(ctx) {
    if (ctx.user.money < ctx.params.count * 1000) {
      return ctx.answer('Недостаточно бит');
    }

    ctx.user.lvl.addScore(ctx.params.count);
    ctx.user.money -= ctx.params.count * 1000;

    ctx.answer('✔ Биты испарились, опыт припарился.');
  }
}
