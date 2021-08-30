let command = {
	pattern: /^(?:помощь|help)$/i,
	f: (message, bot) => {
		return bot.reply(`КУРС | БИТКОИН:
Курс: ${course.btc}$ - 1 BTC

			`);
	}
}

module.exports = command;