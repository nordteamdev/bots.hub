let users = require('../bot/base/users.json');
let utils = require('../utils.js');

let command = {
	pattern: /^(?:трейд)\s(вверх|вниз)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(Number(message.args[1]) > 1000001) return bot.reply('❌ Максимальная сумма ставки - 1.000.000$');
		if(users[message.senderId].balance.dollars < Number(message.args[2])) return bot.reply(`❌ Недостаточно денег.`); else if(bot.user.balance.dollars >= Number(message.args[2]))
		{
		users[message.senderId].balance.dollars -= Number(message.args[2]);
		let x = utils.random(1, 100);

		if(x >= 61)
		{
				let win_dollars = 0;

				if(bot.user.group === 0)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2));
				}

				if(bot.user.group === 1)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2.2));
				}

				if(bot.user.group === 2)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2.5));
				}
	
				if(bot.user.group === 3)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2.7));
				}

				if(bot.user.group === 4)
				{
					win_dollars = Math.floor(Number(message.args[2] * 3));
				}

				if(bot.user.group === 5)
				{
					win_dollars = Math.floor(Number(message.args[2] * 3.5))
				}

			users[message.senderId].balance.dollars += win_dollars;
			return bot.reply(`Результат игры:
				&#4448; ${message.args[1] === 'вверх' ? `📈 Курс акций вырос на ${utils.random(1, 99)}%` : `📉 Курс акций обвалился на ${utils.random(1, 99)}%`}

				🔪 Вы выиграли и получили ${win_dollars}$`);
		} else if(x < 61) return bot.reply(`Результат игры:
				&#4448; ${message.args[1] === 'вниз' ? `📈 Курс акций вырос на ${utils.random(1, 99)}%` : `📉 Курс акций обвалился на ${utils.random(1, 99)}%`}

				🔪 Вы проиграли ${Number(message.args[2])}$`);
		}
	}
}

module.exports = command;