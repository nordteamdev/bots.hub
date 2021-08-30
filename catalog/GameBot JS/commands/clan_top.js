let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:топ)\s(?:кланы)$/i,
	f: async (message, bot) => {
		let top = [];

		for (key in clans)
		{
			top.push({balance: clans[key].cash, tag: key});
		}

		top.sort((a, b) => {
			return b.balance - a.balance;
		});

		let text = ``;

		for (let i = 1; i < 11; i++)
		{
			if(!top[i - 1] && i === 10)
			{
				text += `&#128287; Не создан: 0$
			`;

				break;
			}
			if(!top[i - 1])
			{
				text += `${i}&#8419; Не создан: 0$
			`;

				break;
			}
			
			if(i === 10)
			{
				text += `&#128287; ${top[i - 1].tag}: ${top[i - 1].balance}$ 
				`;

				break;
			}

			text += `${i}&#8419; ${top[i - 1].tag}: ${top[i - 1].balance}$
			`;
		}

		return bot.reply(`Топ кланов по балансу:

			${text}`);
	}
}

module.exports = command;