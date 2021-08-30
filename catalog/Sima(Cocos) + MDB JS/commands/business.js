const {Command} = require('cocoscore')
const {businesses} = require('../business.js')


module.exports = [
new Command({
	trigger: /^бизнесы\s?([0-9]+)?/i,
	//type: "raznoe",
	//name: "Бизнесы",
	//description: "список бизнесов",
	async handler(ctx, bot) {
    	if(!ctx.body[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(ctx.user.business.length == 1 && ctx.user.business[0].id == i + 1) || (ctx.user.business.length == 2 && ctx.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${businesses[i][0].cost.toLocaleString()}$\nПрибыль: ${businesses[i][0].earn.toLocaleString()}$/час\n`;
		}
		return ctx.send(text);
	}
	if(ctx.user.business.length == 2) return ctx.send(`у вас уже есть 2 бизнеса`);

	ctx.body[1] = Number(ctx.body[1]) - 1;
	const sell = businesses[ctx.body[1]][0];
	if(sell == null) return;
	if(ctx.user.balance < sell.cost) return ctx.send(`недостаточно денег`);
	ctx.user.balance -= sell.cost;
	ctx.user.business.push({
		"id": ctx.body[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return ctx.send(`вы купили "${sell.name}" за ${sell.cost.toLocaleString()}$`);
	}
}),
new Command({
	trigger: /^бизнес\s(\d)$/i,
	//type: "raznoe",
	//name: "Бизнес [1|2]",
	//description: "Статистика бизнеса",
	async handler(ctx, bot) {
   ctx.body[1] = Math.floor(Number(ctx.body[1]));
	if(ctx.body[1] < 1 || ctx.body[1] > 2) return ctx.send(`используйте: Бизнес [1 или 2]`);
	if(ctx.user.business.length < ctx.body[1]) return ctx.send(`у вас нет этого бизнеса`);
	ctx.body[1]--;
	const biz = businesses[ctx.user.business[ctx.body[1]].id - 1][ctx.user.business[ctx.body[1]].upgrade - 1];

	return ctx.send(`статистика "${biz.name}":
	💸 Прибыль: ${Math.floor(biz.earn / biz.workers * ctx.user.business[ctx.body[1]].workers).toLocaleString()}$/час
	💼 Рабочих: ${ctx.user.business[ctx.body[1]].workers}/${biz.workers}
	💰 На счёте: ${ctx.user.business[ctx.body[1]].moneys.toLocaleString()}$

	${ (businesses[ctx.user.business[ctx.body[1]].id - 1][ctx.user.business[ctx.body[1]].upgrade] != null ? "✅ Доступно улучшение! (" + businesses[ctx.user.business[ctx.body[1]].id - 1][ctx.user.business[ctx.body[1]].upgrade].cost.toLocaleString() + "$)" : "") }`);
	}
}),
new Command({
	trigger: /^бизнес улучшить\s(.*)/i,
	//type: "raznoe",
	//name: "",
	//description: "",
	async handler(ctx, bot) {
		ctx.body[1] = Math.floor(Number(ctx.body[1]));

		if(ctx.body[1] < 1 || ctx.body[1] > 2) return ctx.send(`используйте: Бизнес улучшить [1|2]`);
		if(ctx.user.business.length < ctx.body[1]) return ctx.send(`у вас нет этого бизнеса`);
	i = ctx.body[1]--;
		if(businesses[ctx.user.business[ctx.body[1]].id - 1][ctx.user.business[ctx.body[1]].upgrade] == null) return ctx.send(`нет доступных улучшений для вашего бизнеса`);
	
	const cost = businesses[ctx.user.business[i].id - 1][ctx.user.business[i].upgrade].cost;
	if(cost > ctx.user.balance) return ctx.send(`у вас недостаточно денег для улучшения`);
	ctx.user.balance -= cost;
	ctx.user.business[i].upgrade++;

	return ctx.send(`вы улучшили бизнес #${i + 1} за ${cost.toLocaleString()}$`);
	}
}),
new Command({
	trigger: /^бизнес\sснять\s(.*)\s(.*)/i,
	type: "raznoe",
	name: "",
	description: "",
	async handler(ctx, bot) {
	ctx.body[1] = Math.floor(Number(ctx.body[1]));
	if(ctx.body[1] < 1 || ctx.body[1] > 2) return ctx.send(`используйте: Бизнес снять [1|2] [количество]`);
	if(ctx.user.business.length < ctx.body[1]) return ctx.send(`у вас нет этого бизнеса`);
	ctx.body[1]--;
	ctx.body[2] = ctx.body[2].replace(/(\.|\,)/ig, '');
	ctx.body[2] = ctx.body[2].replace(/(к|k)/ig, '000');
	ctx.body[2] = ctx.body[2].replace(/(м|m)/ig, '000000');
	ctx.body[2] = ctx.body[2].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.business[ctx.body[1]].moneys);
	if(!Number(ctx.body[2])) return;
	ctx.body[2] = Math.floor(Number(ctx.body[2]));
	if(ctx.body[2] <= 0) return ctx.send(`вы не можете снять столько со счёта бизнеса`);
	if(ctx.body[2] > ctx.user.business[ctx.body[1]].moneys) return ctx.send(`у вас нет денег на счёте этого бизнеса`);

	ctx.user.balance += ctx.body[2];
	ctx.user.business[ctx.body[1]].moneys -= ctx.body[2];

	return ctx.send(`вы сняли со счёта своего бизнеса ${utils.sp(ctx.body[2])}$`);
	}
})/*
new Command({
	trigger: /^/i,
	type: "raznoe",
	name: "",
	description: "",
	async handler(ctx, bot) {

	}
})*/
]