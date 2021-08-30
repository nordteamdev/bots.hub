let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:вывести) ?([0-9]+)?$/i,
	f: async (message, bot) => {
		if(bot.user.balance.work === 0) return bot.reply('❌ Минимальная сумма выплаты - 1$');
		let earn = bot.user.balance.work;
		users[message.senderId].balance.dollars += bot.user.balance.work;
		users[message.senderId].balance.work = 0;
		return bot.reply('✔ Выплачено ' + earn + '$ на ваш основной кошелёк.');
	}
}

module.exports = command;