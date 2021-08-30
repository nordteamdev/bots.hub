let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:внести)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].clan === '') return bot.reply(`❌ Вы не состоите в клане.`);
		if(bot.user.balance.dollars < Number(message.args[1])) return bot.reply(`❌ Недостаточно денег.`);
		if(Number(message.args[1] < 50000)) return bot.reply(`❌ Внести можно только от 50000$ и выше!`)

		users[message.senderId].balance.dollars -= Number(message.args[1]);
		clans[bot.user.clan].cash += Number(message.args[1]);
		return bot.reply(`✔ Вы положили ${Number(message.args[1])}$ в казну клана.`);
	}
}

module.exports = command;