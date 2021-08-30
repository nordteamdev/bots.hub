let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:банк снять)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(Number(message.args[1]) > bot.user.balance.bank) return bot.reply(`❌ Недостаточно денег на карте для снятия денег`);
		if(Number(message.args[1]) < 1) return bot.reply(`❌ Снять можно 1$ и больше.`)
		users[message.senderId].balance.bank -= Number(message.args[1]);
		users[message.senderId].balance.dollars += Number(message.args[1]);

		return bot.reply(`✔ Вы сняли ${Number(message.args[1])}$ с карточки.`);
	}
}

module.exports = command;