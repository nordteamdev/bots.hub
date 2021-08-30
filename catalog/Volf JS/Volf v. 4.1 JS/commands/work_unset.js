let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:уволиться)$/i,
	f: async (message, bot) => {
		if(bot.user.misc.work === 0) return bot.reply(`❌ Вы не имеете работу!`);

		users[message.senderId].misc.work = 0;
		return bot.reply(`Вы уволились.`);
	}
}

module.exports = command;