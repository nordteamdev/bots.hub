let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:дать)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(Number(message.args[1]) > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег.`);

		let msg = await message.vk.api.messages.getById({message_ids: message.id});
		if(msg.items[0].fwd_messages === []) return bot.reply(`❌ Перешлите сообщение пользователя.`);

		let user = msg.items[0].fwd_messages[0].user_id;
		if(api.items[0].fwd_messages[0].from_id === undefined) return bot.reply('\n&#10067; Пользователь не зарегистрирован в боте или не определен.')

		users[message.senderId].balance.dollars -= Number(message.args[1]);
		users[user].balance.dollars += Number(message.args[1]);

		return bot.reply(`✔ Перевод выполнен.`);
	}
}

module.exports = command;