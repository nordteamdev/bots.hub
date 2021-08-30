let previes = ['отсутствует', 'Серебро', 'Золото', 'Diamond', 'Staff', 'Легенда'];
let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:профиль|баланс)\s?(.*)?/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
			let user = bot.user;

			return bot.reply(`Ваш профиль:
				💡 Подписка: ${previes[user.group]}${user.marriage.partner === 0 ? '' : `\n💍 Женат на ${users[user.marriage.partner].tag}`}

				💰 Денег: ${user.balance.dollars}$
				💰 Банковский счёт: ${user.balance.bank}$
				💰 Рабочий счёт: ${user.balance.work}$
				👑 Биткоинов: ${user.balance.bitcoins}
				🌟 Уровень (опыт): ${user.level} (${user.exp})

				&#4448; 👔 Работа: ${user.misc.work === 0 ? 'Нет' : bot.work[user.misc.work - 1].name}
				&#4448; 🏚 Бизнес: ${user.misc.business === 0 ? 'Нет' : bot.business[user.misc.business - 1].name}
				&#4448; 🚘 Машина: ${user.misc.car === 0 ? 'Нет' : bot.car[user.misc.car - 1].name}
				&#4448; 📱 Телефон: ${user.misc.phone === 0 ? 'Нет' : bot.phone[user.misc.phone - 1].name}

				📕 Дата регистрации: ${user.registerDate}`);
		} else if(message.args[1])
		{

		message.args[1] = message.args[1].replace(/http/ig, '');
		message.args[1] = message.args[1].replace(/https/ig, '');
		message.args[1] = message.args[1].replace(/\:/ig, '');
		message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/\//ig, '');

			let res = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});
			if(!users[res.object_id]) return bot.reply(`❌ Игрок не зарегистрирован!`);

			let user = users[res.object_id];
			return bot.reply(`Профиль пользователя:
				💡 Подписка: ${previes[user.group]}${user.marriage.partner === 0 ? '' : `\n💍 Женат на ${users[user.marriage.partner].tag}`}
				
				💰 Денег: ${user.balance.dollars}$
				💰 Банковский счёт: ${user.balance.bank}$
				💰 Рабочий счёт: ${user.balance.work}$
				👑 Биткоинов: ${user.balance.bitcoins}
				🌟 Уровень (опыт): ${user.level} (${user.exp})

				&#4448; 👔 Работа: ${user.misc.work === 0 ? 'Нет' : bot.work[user.misc.work - 1].name}
				&#4448; 🏚 Бизнес: ${user.misc.business === 0 ? 'Нет' : bot.business[user.misc.business - 1].name}
				&#4448; 🚘 Машина: ${user.misc.car === 0 ? 'Нет' : bot.car[user.misc.car - 1].name}
				&#4448; 📱 Телефон: ${user.misc.phone === 0 ? 'Нет' : bot.phone[user.misc.phone - 1].name}
				
				📕 Дата регистрации: ${user.registerDate}`);
		}
	}
}

module.exports = command;