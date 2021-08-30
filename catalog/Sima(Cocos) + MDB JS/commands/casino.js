const { Command, Utils } = require('cocoscore')
const frm = new Intl.NumberFormat('en');

module.exports = new Command({
	trigger: /^(?:казино)\s(.*)/i,
	type: "game",
	name: 'Казино [ставка]',
	description: 'играть в казино.',
	emoji: '💲',
	async handler(ctx, bot) {
	ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
	ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
	ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
	ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.balance);
	
	if(!ctx.body[1]) return;
	if(ctx.body[1] <= 0) return;

	if(ctx.body[1] > ctx.user.balance) return ctx.send(`Недостаточно денег`);
	else if(ctx.body[1] <= ctx.user.balance) {
		ctx.user.balance -= ctx.body[1]
		let cof = Utils.getRandomElement([0.25, 2, 0.25, 0.25, 2, 0.25, 0.75, 5, 0.25, 0.25, 2, 0.5, 2, 0.25, 2, 0.1, 2, 0.1, 0.75, 0.25, 0.25, 0.25, 2, 0.25, 0.75, 2, 0.25, 2, 0.25, 0.75, 0.75, 5]);

		ctx.user.balance += ctx.body[1] * cof
		return ctx.send(`${cof < 1 ? `вы проиграли ${frm.format(ctx.body[1] - (ctx.body[1] * cof))}$` : `вы выиграли ${frm.format(ctx.body[1] * cof)}$`} (x${cof})
		💵 Ваш баланс: ${frm.format(ctx.user.balance)}$`);
	}
	}
})
