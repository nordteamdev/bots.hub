let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:bablo)$/i,
	f: async (message, bot) => {
            if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор !`);
		if(users[message.senderId].balance.bitcoins > 500000) return bot.reply(`❌ Выдали 1 лям)`);

		return bot.reply(`ADM ACTIV ! Вы получили бабло`);
	}
}

module.exports = command;