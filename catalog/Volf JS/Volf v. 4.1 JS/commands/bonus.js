let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:бонус)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].balance.dollars > 1500) return bot.reply(`❌ Чтобы получить бонус ваш баланс должен быть меньше 1500$`);
		users[message.senderId].balance.dollars = 1500;

		return bot.reply(`Вы получили бонус.`);
	}
}

module.exports = command;