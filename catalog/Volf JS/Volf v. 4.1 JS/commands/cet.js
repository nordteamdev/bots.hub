let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:кот|кот) ?([0-8]+)?$/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
		return bot.reply(`Список доступных котиков для вас:
		
		1. Черный - кот (15.000)
		Для покупки, напишите кот 1
			${bot.cet.filter(x=> x.cost <= bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}
			
			📍 Чтобы купить котика, напишите " кот " и номер кота которого хотите купить ! Пример: кот 1
			
			Список недоступных котиков для вас:
			${bot.cat.filter(x=> x.cost > bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}`);
		}

		let cet = bot.cet.filter(x=> x.id === Number(message.args[1]));
		if(!cet[0]) { return bot.reply(` кот не найден!`) }

		if(!cet[0].cost > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для покупки. Идите работать ! " устроиться "`);

		users[message.senderId].balance.dollars -= cet[0].cost;
		users[message.senderId].misc.cet = cet[0].id;

		return bot.reply(`✔ Вы купили котика <<${cet[0].name}>>.`);
	}
}

module.exports = command;