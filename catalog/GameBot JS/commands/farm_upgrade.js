let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:ферма)\s(?:улучшить)$/i,
	f: async (message, bot) => {
		if(!bot.user.farm.hasFarm) return bot.reply(`❌ Вы не имеете ферму.`);
		if(bot.user.balance.dollars < 150000) return bot.reply(`❌ Улучшение фермы стоит 150000$`);

		users[message.senderId].farm.level += 1;
		users[message.senderId].balance.dollars -= Number(150000);

		return bot.reply(`Вы улучшили ферму.`);
	}
}

module.exports = command;