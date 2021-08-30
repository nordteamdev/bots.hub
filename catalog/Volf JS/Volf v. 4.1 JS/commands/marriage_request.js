let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:брак)\s(.*)$/i,
	f: async (message, bot) => {
		
		message.args[1] = message.args[1].replace(/https/ig, '');
		message.args[1] = message.args[1].replace(/http/ig, '');
		message.args[1] = message.args[1].replace(/\:/ig, '');
		message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/\//ig, '');

		let user = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});

		if(!users[user.object_id]) return bot.reply(`❌ Игрок не зарегистрирован!`);

		user = user.object_id;
		if(user === message.senderId) return bot.reply(`❌ Хм...`);

		if(bot.user.marriage.partner !== 0) return bot.reply(`❌ Вы уже имеете партнёра.`);
		if(users[user].marriage.partner !== 0) return bot.reply(`❌ Игрок имеет партнёра!`);

		if(users[user].marriage.requests[users[user].marriage.requests.length - 1] === message.senderId)
		{
			users[message.senderId].marriage.partner = user;
			users[user].marriage.partner = message.senderId;

			users[message.senderId].marriage.requests = [];
			users[user].marriage.requests = [];

			return bot.reply(`${users[message.senderId].tag} <3 ${users[user].tag}`);
		}

		users[message.senderId].marriage.requests.push(user);
		users[user].marriage.requests.push(message.senderId);

		return bot.reply(`Вы сделали предложение.`);
	}
}

module.exports = command;