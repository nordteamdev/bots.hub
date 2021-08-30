let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:взять)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].clan === '') return bot.reply(`❌ Вы не состоите в клане.`);
		if(clans[bot.user.clan].leader !== message.senderId) return bot.reply(`❌ Вы не лидер клана!`);
		if(clans[bot.user.clan].cash < Number(message.args[1])) return bot.reply(`❌ Недостаточно денег.`);

		users[message.senderId].balance.dollars += Number(message.args[1]);
		clans[bot.user.clan].cash -= Number(message.args[1]);
		return bot.reply(`Вы взяли ${Number(message.args[1])}$ из казны клана.`);
	}
}

module.exports = command;