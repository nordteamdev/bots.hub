let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:бизнес|бизнес купить) ?([0-9]+)?$/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
		return bot.reply(`Список доступных бизнесов для вас:
			${bot.business.filter(x=> x.cost <= bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$ [${x.earn}$]`).join('\n')}
			
			Список недоступных бизнесов для вас:
			${bot.business.filter(x=> x.cost > bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$ [${x.earn}$]`).join('\n')}`);
		}

		if(bot.user.misc.business !== 0) return bot.reply(`❌ Вы уже имеете бизнес!`);

		let business = bot.business.filter(x=> x.id === Number(message.args[1]));
		if(!business[0]) { return bot.reply(`❌ Бизнес не найден!`) }

		if(business[0].cost > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для покупки бизнеса.`);

		users[message.senderId].balance.dollars -= business[0].cost;
		users[message.senderId].misc.business = business[0].id;

		return bot.reply(`✔ Вы приобрели бизнес <<${business[0].name}>>. Ваша прибыль будет начисляться на ваш банковский счёт.`);
	}
}

module.exports = command;