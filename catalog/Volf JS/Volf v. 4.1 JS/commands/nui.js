let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:левелпередать)\s([0-9]+)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор !`);
		if(Number(message.args[1]) > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег.`);

		let msg = await message.vk.api.messages.getById({message_ids: message.id});
		if(msg.items[0].fwd_messages === []) return bot.reply(`❌ Перешлите сообщение пользователя.`);

		let user = msg.items[0].fwd_messages[0].user_id;
		if(!users[user]) return bot.reply(`❌ Пользователь не зарегистрирован в боте!`);

		users[message.senderId].balance.dollars -= Number(message.args[1]);
		users[user].balance.level += Number(message.args[1]);

		return bot.reply(`✔ Левел передан`);
	}
}

module.exports = command;