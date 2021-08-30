let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:ферма)\s(?:купить)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].farm.hasFarm) return bot.reply(`❌ Вы уже имеете ферму!`);
		if(users[message.senderId].balance.dollars < 100000) return bot.reply(`❌ Недостаточно денег! Нужно: 100000 монет.`);

		users[message.senderId].farm.hasFarm = true;
		users[message.senderId].farm.level = 1;
		users[message.senderId].balance.dollars -= Number(100000);
		return bot.reply(`Вы купили майнинг-ферму.`);		
	}
}

module.exports = command;