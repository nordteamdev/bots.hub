let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:фермавыдать)\s(.*)\s(.*)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор!`);

		message.args[1] = message.args[1].replace(/http/ig, '');
		message.args[1] = message.args[1].replace(/https/ig, '');
		message.args[1] = message.args[1].replace(/\:/ig, '');
		message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/\//ig, '');

		let user = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});
		if(!users[user.object_id]) return bot.reply(`❌ Игрока не существует!`);

		users[user.object_id].punish.hasFarm = true;

		bot.reply(`Игроку была выдана майнинг ферма!`);
		message.vk.api.messages.send({user_id: user.object_id, message: `&#4448; ⛔ Внимание!

				&#4448; &#4448; 📕 Вам была выдана майнинг ферма: ${users[user.object_id].punish.punisher === 0 ? 'Система' : `${users[users[user.object_id].punish.punisher].tag}`}
				&#4448; &#4448; 📕 Причина: ${users[user.object_id].punish.reason === '' ? 'Не указана' : `${users[user.object_id].punish.reason}`}

				&#4448; 📗 | Напиши " помощь " `});
	}
}

module.exports = command;
