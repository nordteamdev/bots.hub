let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:машина|машины|авто) ?([0-9]+)?$/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
		return bot.reply(`Список доступных машин для вас:
			${bot.car.filter(x=> x.cost <= bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}
			
			Список недоступных машин для вас:
			${bot.car.filter(x=> x.cost > bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}`);
		}

		let car = bot.car.filter(x=> x.id === Number(message.args[1]));
		if(!car[0]) { return bot.reply(`❌ Машина не найдена!`) }

		if(car[0].cost > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для покупки.`);

		users[message.senderId].balance.dollars -= car[0].cost;
		users[message.senderId].misc.car = car[0].id;

		return bot.reply(`✔ Вы купили машину <<${car[0].name}>>.`);
	}
}

module.exports = command;