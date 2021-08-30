let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:банк положить)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(Number(message.args[1]) > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для вноса депозита!`);
		if(Number(message.args[1]) < 50000) return bot.reply(`❌ Минимальная сумма депозита - 50000$`)

		users[message.senderId].balance.bank += Number(message.args[1]);
		users[message.senderId].balance.dollars -= Number(message.args[1]);

		return bot.reply(`✔ Вы положили деньги в банк.`);
	}
}

module.exports = command;