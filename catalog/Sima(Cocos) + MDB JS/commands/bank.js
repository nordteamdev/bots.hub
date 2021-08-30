const {Command} = require('cocoscore')
const frm = new Intl.NumberFormat('en');

module.exports = [
new Command({
	trigger: /^(?:банк)\s?(.*)$/i,
	handler(ctx, bot) {
	ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
	ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
	ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
	ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.balance);
if(ctx.body[1]) {
			if(ctx.user.balance < ctx.body[1]) return ctx.send(`недостаточно денег`)

				ctx.user.balance -= ctx.body[1];
				ctx.user.bank += Number(ctx.body[1]) 

			ctx.send(`вы успешно положили в банк ${frm.format(ctx.body[1])}$\n💰 Счёт в банке: ${frm.format(ctx.user.bank)}$`)	
	} else ctx.send(`на банковском счету: ${frm.format(ctx.user.bank)}$`)
}
}),
new Command({
	trigger: /^(?:снять)\s(.*)$/i,
	handler(ctx, bot) {
	ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
	ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
	ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
	ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.bank);

			if(ctx.user.bank < ctx.body[1]) return ctx.error(`недостаточно денег`)
				ctx.user.balance += Number(ctx.body[1]);
				ctx.user.bank -= Number(ctx.body[1]) 
			ctx.send(`вы успешно сняли с банка ${frm.format(ctx.body[1])}$\n💰 Счёт в банке: ${frm.format(ctx.user.bank)}$\n💵 Баланс: ${frm.format(ctx.user.balance)}$`)	
		}
})
]