let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:покинуть)$/i,
	f: async (message, bot) => {
		if(bot.user.clan === '') return bot.reply(`❌ Вы не состоите в клане.`);
		if(clans[bot.user.clan].leader === message.senderId)
		{
			for (key in users)
			{
				if(users[key].clan === bot.user.clan) users[key].clan = '';
			}

			delete clans[bot.user.clan];
			return bot.reply(`Вы распустили клан.`);
		}

		users[message.senderId].clan = '';
		return bot.reply(`Вы покинули клан.`);
	}
}

module.exports = command;