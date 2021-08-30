let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:vipb)$/i,
	f: async (message, bot) => {
            if(bot.user.group < 1) return bot.reply(`❌ Ты не вип игрок!`);
		if(users[message.senderId].balance.dollars > 10000) return bot.reply(`❌ Ой дурачок...`);
		users[message.senderId].balance.dollars = 5000;

		return bot.reply(` Вы получили бабло`);
	}
}

module.exports = command;