let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:топ)\s(?:баланс)$/i,
	f: async (message, bot) => {
		let top = [];

		for (key in users)
		{
			top.push({id: key, balance: users[key].balance.dollars, tag: users[key].tag});
		}

		top.sort((a, b) => {
			return b.balance - a.balance;
		});

		let text = ``;

		for (let i = 1; i < 11; i++)
		{
			if(!top[i - 1] && i === 10)
			{
				text += `&#128287; Не зарегистрирован: 0$
			`;

				break;
			}
			if(!top[i - 1])
			{
				text += `${i}&#8419; Не зарегистрирован: 0$
			`;

				break;
			}

			if(i === 10)
			{
				text += `&#128287; @id${top[i- 1].id} (${top[i - 1].tag}): ${top[i - 1].balance}$
				`;

				break;
			}

			text += `${i}&#8419; @id${top[i- 1].id} (${top[i - 1].tag}): ${top[i - 1].balance}$
			`;
		}

		return bot.reply(`Топ пользователей по балансу:

			${text}`);
	}
}

module.exports = command;