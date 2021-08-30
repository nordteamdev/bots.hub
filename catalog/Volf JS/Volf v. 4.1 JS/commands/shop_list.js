let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:магазин)$/i,
	f: async (message, bot) => {
		return bot.reply(`Доступные разделы:

			Машины
			Телефоны
			Ферма`);
	}
}

module.exports = command;