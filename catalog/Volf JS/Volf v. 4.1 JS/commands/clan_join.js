let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:вступить)\s(.*)$/i,
	f: async (message, bot) => {
		if(bot.user.clan !== '') return bot.reply(`❌ Вы уже состоите в клане!`);
		if(!clans[message.args[1]]) return bot.reply(`❌ Клан не найден!`);

		users[message.senderId].clan = message.args[1];
		return bot.reply(`Вы вступили в клан.`);
	}
}

module.exports = command;