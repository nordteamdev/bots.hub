let users = require('../bot/base/users.json');
let utils = require('../utils.js');

let command = {
	pattern: /^(?:license|лицензия)$/i,
	f: async (message, bot) => {
		//pitunskaya proverka
		if(users[message.senderId].misc.car === 0) return bot.reply('❌ У вас нет машины. \n\n🤔 Совет: Вы можете узнать список машин написав мне <<авто>>');
		if(users[message.senderId].misc.license) return bot.reply('✔ У вас уже есть права на вождение автомобиля');

		users[message.senderId].misc.license = true
		if(users[message.senderId].balance.dollars < 300001) return bot.reply('❌ У вас недостаточно денег. У вас: ' + users[message.senderId].balance.dollars + '$. Требуется: 300000$');
		users[message.senderId].balance.dollars -= 300000;
		return bot.reply('✔ Вы приобрели поддельные права за 300000$.');
}}

module.exports = command;