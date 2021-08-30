let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:развод)$/i,
	f: async (message, bot) => {
		if(bot.user.marriage.partner === 0) return bot.reply(`❌ Вы не имеете партнёра`);

		users[users[message.senderId].marriage.partner].marriage.partner = 0;
		users[message.senderId].marriage.partner = 0;
		return bot.reply(`Вы развелись.`);
	}
}

module.exports = command;