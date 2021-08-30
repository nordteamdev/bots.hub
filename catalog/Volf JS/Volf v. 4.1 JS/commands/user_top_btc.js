let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:топ)\s(?:биткоины)$/i,
	f: async (message, bot) => {
		let top = [];

		for (key in users)
		{
			top.push({balance: users[key].balance.bitcoins, tag: users[key].tag});
		}

		top.sort((a, b) => {
			return b.balance - a.balance;
		});

		let text = ``;

		for (let i = 1; i < 11; i++)
		{
			if(!top[i - 1] && i === 10)
			{
				text += `&#128287; Не зарегистрирован: 0 BTC
			`;

				break;
			}
			if(!top[i - 1])
			{
				text += `${i}&#8419; Не зарегистрирован: 0 BTC
			`;

				break;
			}
			
			if(i === 10)
			{
				text += `&#128287; ${top[i - 1].tag}: ${top[i - 1].balance} BTC
				`;

				break;
			}

			text += `${i}&#8419; ${top[i - 1].tag}: ${top[i - 1].balance} BTC
			`;
		}

		return bot.reply(`Топ пользователей по BTC:

			${text}`);
	}
}

module.exports = command;