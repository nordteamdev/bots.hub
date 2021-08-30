let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:бизнес продать)$/i,
	f: async (message, bot) => {
		if(bot.user.misc.business === 0) return bot.reply(`❌ Вы не имеете бизнес!`);

		users[message.senderId].balance.dollars += bot.business[bot.user.misc.business].cost / 2;
		users[message.senderId].misc.business = 0;

		return bot.reply(`Вы продали бизнес.`);
	}
}

module.exports = command;