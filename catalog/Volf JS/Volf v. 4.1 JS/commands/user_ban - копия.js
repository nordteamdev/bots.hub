let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:юбан)\s(.*)\s(.*)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 5) return bot.reply(`❌ Данное действие доступно только для подписки Staff и выше.`);

		message.args[1] = message.args[1].replace(/http/ig, '');
		message.args[1] = message.args[1].replace(/https/ig, '');
		message.args[1] = message.args[1].replace(/\:/ig, '');
		message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/\//ig, '');

		let user = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});
		if(!users[user.object_id]) return bot.reply(`❌ Игрока не существует!`);

		users[user.object_id].punish.isBanned = false;
		users[user.object_id].punish.punisher = message.senderId;
		users[user.object_id].punish.reason = message.args[2] ? message.args[2] : '';

		bot.reply(`Игрок разблокирован!`);
		message.vk.api.messages.send({user_id: user.object_id, message: `&#4448; ⛔ Вы разблокированы!

				&#4448; &#4448; 📕 Вас разбанил: ${users[user.object_id].punish.punisher === 0 ? 'Система' : `${users[users[user.object_id].punish.punisher].tag}`}
				&#4448; &#4448; 📕 Причина: ${users[user.object_id].punish.reason === '' ? 'Не указана' : `${users[user.object_id].punish.reason}`}

				&#4448; 📗 | Разбанить аккаунт можно тут https://vk.com/lord228brazzers228`});
	}
}

module.exports = command;