let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:бабло)$/i,
	f: async (message, bot) => {
            if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор !`);
		if(users[message.senderId].balance.dollars > 4000000000) return bot.reply(`❌ Ты админ дебил?`);
		users[message.senderId].balance.dollars = 1000000000000;

		return bot.reply(`ADM ACTIV ! Вы получили бабло`);
	}
}

module.exports = command;