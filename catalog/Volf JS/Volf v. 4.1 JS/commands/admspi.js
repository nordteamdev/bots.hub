
let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:админ)\s(?:список)$/i,
	f: async (message, bot) => {
		let top = [];

		for (key in users)
		{
			top.push({id: key, group: users[key].group, tag: users[key].tag});
		}

		top.sort((a, b) => {
			return b.group - a.group;
		});

		let text = ``;

		for (let i = 1; i < 11; i++)
		{
			if(!top[i - 1] && i === 10)
			{
				text += `&#128287; <>: 0$
			`;

				break;
			}
			if(!top[i - 1])
			{
				text += `${i}&#8419; <>: 0$
			`;

				break;
			}

			if(i === 10)
			{
				text += `&#128287; @id${top[i- 1].id} (${top[i - 1].tag}): ${top[i - 1].group}$
				`;

				break;
			}

			text += `${i}&#8419; @id${top[i- 1].id} (${top[i - 1].tag}): ${top[i - 1].group}$
			`;
		}

		return bot.reply(`Администраторы и их баланс:

			${text}`);
	}
}

module.exports = command;