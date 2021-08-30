let command = {
	pattern: /^(?:банк)$/i,
	f: async (message, bot) => {
		return bot.reply(`&#128313; Баланс карточки: ${bot.user.balance.bank}

			&#128312; Положить деньги: банк положить [сумма]
			&#128312; Снять деньги: банк снять [сумма]`);
	}
}

module.exports = command;