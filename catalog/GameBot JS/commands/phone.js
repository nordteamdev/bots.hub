let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:телефон|телефоны) ?([0-9]+)?$/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
		return bot.reply(`Список доступных телефонов для вас:
			${bot.phone.filter(x=> x.cost <= bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}
			
			Список недоступных телефонов для вас:
			${bot.phone.filter(x=> x.cost > bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$`).join('\n')}`);
		}

		let phone = bot.phone.filter(x=> x.id === Number(message.args[1]));
		if(!phone[0]) { return bot.reply(`❌ Телефон не найден!`) }

		if(phone[0].cost > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для покупки.`);

		users[message.senderId].balance.dollars -= phone[0].cost;
		users[message.senderId].misc.phone = phone[0].id;

		return bot.reply(`✔ Вы купили телефон <<${phone[0].name}>>.`);
	}
}

module.exports = command;