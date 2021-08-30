let users = require('../bot/base/users.json');
let economy = require('../bot/base/course.json');
let command = {
	pattern: /^(?:биткоин)\s(купить|продать)$/i,
	f: (message, bot) => {
		if(message.args[1] === 'купить')
		{
			if(users[message.senderId].balance.dollars === null) return bot.reply(`❌ Произошла ошибка. Свяжитесь с админом: @rumzan или @thepipidon`)
			if(economy.btc > users[message.senderId].balance.dollars) return bot.reply(`❌ Недостаточно средств! Биткоин стоит: ${economy.btc}`);
			else if(economy.btc <= users[message.senderId].balance.dollars)
			{
				users[message.senderId].balance.bitcoins += 1;
				users[message.senderId].balance.dollars -= Number(economy.btc);
				return bot.reply(`✔ Вы купили биткоин!`);
			}
		}

		if(message.args[1] === 'продать')
		{
			if(users[message.senderId].balance.bitcoins === null) return bot.reply(`❌ Произошла ошибка. Свяжитесь с админом: @rumzan или @thepipidon`)
			if(users[message.senderId].balance.bitcoins <= 0) return bot.reply(`❌ Недостаточно биткоинов!`);
			if(users[message.senderId].balance.bitcoins > 0)
			{
				users[message.senderId].balance.bitcoins -= Number(1);
				users[message.senderId].balance.dollars += Number(economy.btc);
				return bot.reply(`✔ Вы продали биткоин.`);
			}
		}
	}
}

module.exports = command;