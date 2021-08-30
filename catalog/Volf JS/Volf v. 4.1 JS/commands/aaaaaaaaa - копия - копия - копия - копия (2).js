let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:передать)\s([0-9]+)$/i,
	f: async (message, bot) => {

           message.args[1] = message.args[1].replace(/http/ig, '');
           message.args[1] = message.args[1].replace(/https/ig, '');
           message.args[1] = message.args[1].replace(/\:/ig, '');
           message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
           message.args[1] = message.args[1].replace(/vk\.com/ig, '');
           message.args[1] = message.args[1].replace(/\//ig, '');

		if(Number(message.args[1]) > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег.`);

		let msg = await message.vk.api.messages.getById({message_ids: message.id});
		if(msg.items[0].fwd_messages === []) return bot.reply(`❌ Перешлите сообщение пользователя.`);

		let user = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});
		if(!users[user.object_id]) return bot.reply(`❌ Игрока не существует!`);

		users[message.senderId].balance.dollars -= Number(message.args[1]);
		users[user].balance.dollars += Number(message.args[1]);

		return bot.reply(`✔ Перевод выполнен.`);
	}
}

module.exports = command;

module.exports = command;