let users = require('../base/users.json');
let command = {
	pattern: /^(?:топ)/i,
	f: async (message) => {
		function intParser(int, fixed)
		{
			if (int === null) return null;
			if (int === 0) return '0';
			fixed = (!fixed || fixed < 0) ? 0 : fixed;
			let b = (int).toPrecision(2).split('e'),
				k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
				c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
				d = c < 0 ? c : Math.abs(c),
				e = d + ['', 'K', 'M', 'B', 'T'][k];
			return e;
		}
		let top = [];

		for (key in users)
		{
			top.push({id: key, balance: users[key].bills.main, tag: users[key].tag});
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
				text += `&#128287; @id${top[i- 1].id} (${top[i - 1].tag}): ${intParser(top[i - 1].balance)}$
				`;

				break;
			}

			text += `${i}&#8419; @id${top[i- 1].id} (${top[i - 1].tag}): ${intParser(top[i - 1].balance)}$
			`;
		}

		return message.reply(`Топ пользователей по балансу:

			${text}`);
	}
}

module.exports = command;