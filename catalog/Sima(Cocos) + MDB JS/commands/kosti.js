const { Command, Utils} = require('cocoscore') 
const { sp } = require('../functions.js') 

module.exports = new Command({ 
	trigger: /^(?:кости)\s(.*)/i,
	type: "game", 
	name: 'Кости [ставка]', 
	description: 'игра в кости', 
	emoji: '🎲', 
	handler(ctx, bot) {
	ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
	ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
	ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
	ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.balance);

    if (!ctx.body[1]) return
    if (ctx.body[1] > ctx.user.balance) return ctx.send(`недостаточно денег.`)
    if (!Number(ctx.body[1])) return

    let summ = Number(ctx.body[1]);
    let im = Utils.getRandomInRange(1, 6);
    let you = Utils.getRandomInRange(1, 6);
    if (im < you) {
        ctx.user.balance -= summ;
         ctx.send(`Результат:\n👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n\n😕 Ты проиграл ${summ.toLocaleString()}$\n💰 Баланс: ${ctx.user.balance.toLocaleString()}$`);
    } else if (im == you) {
         ctx.send(`Результат:\n👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n🤝 Ничья`);
    } else if (im > you) {
        ctx.user.balance += summ;
         ctx.send(`Результат:\n🔹 Тебе выпало ${im}&#8419;\n🔺 Мне выпало ${you}&#8419;\n\n😄 Ты выиграл ${summ.toLocaleString()}$\n💰 Баланс: ${ctx.user.balance.toLocaleString()}$`);
    }
	} 
});