let users = require('../bot/base/users.json');
let utils = require('../utils.js');

let command = {
	pattern: /^(?:кости)\s([0-9]+)$/i,
	f: async (message, bot) => {/*
		if(Number(message.args[1]) > 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999) return bot.reply('❌ Максимальная сумма ставки - 1.000.000$');
		if(bot.user.balance.dollars < Number(message.args[1])) return bot.reply(`❌ Недостаточно денег!`); else if(bot.user.balance.dollars >= Number(message.args[1]))
		{

		users[message.senderId].balance.dollars -= Number(message.args[1]);

		let player_int = utils.random(1, 9);
		let bot_int = utils.random(1, 9);

			if(player_int > bot_int)
			{
				let win_dollars = 0;

				if(bot.user.group === 0)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2));
				}

				if(bot.user.group === 1)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2 * 2));
				}

				if(bot.user.group === 2)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2 * 3));
				}
	
				if(bot.user.group === 3)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2 * 4));
				}

				if(bot.user.group === 4)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2* 5));
				}

				if(bot.user.group === 5)
				{
					win_dollars = Math.floor(Number(message.args[2] * 2 * 6))
				}

				users[message.senderId].balance.dollars += win_dollars;
				return bot.reply(`Результат игры:

					&#4448; Вы: ${player_int}&#8419;
					&#4448; Бот: ${bot_int}&#8419;

					🔪 Вы выиграли и получили ${win_dollars}$`);
			}

			if(player_int < bot_int)
			{
				return bot.reply(`Результат игры:

					&#4448; Вы: ${player_int}&#8419;
					&#4448; Бот: ${bot_int}&#8419;

					🔪 Вы проиграли ${Number(message.args[1])}$`);
			}

			if(player_int === bot_int)
			{
				users[message.senderId].balance.dollars += Number(message.args[1]);
				return bot.reply(`Результат игры:

					&#4448; Вы: ${player_int}&#8419;
					&#4448; Бот: ${bot_int}&#8419;

					🔪 Ставка возвращена на баланс`);*/
			bot.reply('Команда временно недоступна.')
	}
}

module.exports = command;