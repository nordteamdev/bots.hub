let users = require('../bot/base/users.json');
let utils = require('../utils.js');

let command = {
	pattern: /^(?:пиар)\s(.*)$/i,
	f: async (message, bot, vk) => {
		if(bot.user.group < 3) bot.reply('Вы не являетесь администратором')
		vk.api.call("wall.post", {message: message.args[1]})
		bot.reply('Создано!')
	}
}

module.exports = command;