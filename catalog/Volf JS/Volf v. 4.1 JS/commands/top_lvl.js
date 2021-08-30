let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:топ)\s(?:уровень)$/i,
	f: async (message, bot) => {
		let top = [];

		for (key in users)
		{
			top.push({balance: users[key].level, tag: users[key].tag});
		}

		top.sort((a, b) => {
			return b.balance - a.balance;
		});

		let text = ``;

		for (let i = 1; i < 11; i++)
		{
			if(!top[i - 1] && i === 10)
			{
				text += `&#128287; Не зарегистрирован: 0 lvl
			`;

				break;
			}
			if(!top[i - 1])
			{
				text += `${i}&#8419; Не зарегистрирован: 0 lvl
			`;

				break;
			}
			
			if(i === 10)
			{
				text += `&#128287; ${top[i - 1].tag}: ${top[i - 1].balance} LVL
				`;

				break;
			}

			text += `${i}&#8419; ${top[i - 1].tag}: ${top[i - 1].balance} LVL
			`;
		}

		return bot.reply(`Топ пользователей по уровню:

			${text}`);
	}
}

module.exports = command;