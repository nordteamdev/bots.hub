let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:ферма)$/i,
	f: async (message, bot) => {
		if(!bot.user.farm.hasFarm) return bot.reply(`❌ Вы не имеете ферму! Купить ферму: ферма купить\n\nСтоимость 100000 монет.`);

		return bot.reply(`🔋 Уровень фермы: ${bot.user.farm.level}
			&#4448; Доход: ${bot.user.farm.level * 1} BTC/неделя`);
	}
}

module.exports = command;