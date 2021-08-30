let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:накрути)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].cooldowns.cheat) return bot.reply(`❌ Накрутить баланс можно 1 раз в сутки.`);
		if(bot.user.group === 5) return bot.reply(`❌ Данная услуга доступна для людей с подписками.`);

		switch (bot.user.group)
		{
			case 1:
				users[message.senderId].balance.dollars += Number(50000000000);
				bot.reply(`✔ Вам начислено 50000$`);
				break;

			case 2:
				users[message.senderId].balance.dollars += Number(10000000000);
				bot.reply(`✔ Вам начислено 100000$`);
				break;

			case 3:
				users[message.senderId].balance.dollars += Number(150000000000);
				bot.reply(`✔ Вам начислено 150000$`);
				break;

			case 4:
				users[message.senderId].balance.dollars += Number(500000000000000);
				bot.reply(`✔ Ооо, здравствуйте, Владимир Владимирович. Вам начислено 500000$`);
				break;
		}

		users[message.senderId].cooldowns.cheat = false;
		setTimeout(() => {
			users[message.senderId].cooldowns.cheat = false;
		}, );
	}
}

module.exports = command;