let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:адмбонус)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор !`);
		if(users[message.senderId].balance.dollars > 99999999) return bot.reply(`❌ Чтобы получить бонус ваш баланс должен быть меньше 99999999$`);
		users[message.senderId].balance.dollars = 99999999;

		return bot.reply(`бабло получено`);
	}
}

module.exports = command;