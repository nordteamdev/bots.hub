let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:кинфо)$/i,
	f: async (message, bot) => {
		if(bot.user.clan === '') return bot.reply(`❌ Вы не состоите в клане!`);
		let members = [];

		for (key in users)
		{
			if(users[key].clan === bot.user.clan) members.push({id: key, tag: users[key].tag});
		}

		return bot.reply(`Информация о вашем клане:

			Лидер: @id${clans[bot.user.clan].leader}
			Казна клана: ${clans[bot.user.clan].cash}$

			Участники клана:

			${members.map(x=> `&#4448; • @id${x.id} (${x.tag})`).join('\n')}`);
	}
}

module.exports = command;