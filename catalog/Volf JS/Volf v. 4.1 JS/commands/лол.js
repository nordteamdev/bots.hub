
let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:випник)\s(.*)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 1) return bot.reply(`❌ Данное действие доступно только для VIP`);
		let checked = filter(message.args[1]);
		if(!checked) return bot.reply('❌ В вашем новом нике содержатся запрещённые символы.');
		users[message.senderId].tag = message.args[1];
		return bot.reply('✔ Вы сменили свой ник на новый <<' + message.args[1] + '>>');
	}
}

function filter (string) {
	if(/(http(s)?:\/\/.)?(www\.)?[0-9@:%._\+~#=]{2,256}\.[]{2,6}\b([0-9@:%_\+.~#?&//=]*)/ig.test(string)) return false;
	if(/(\&\#(?:[0-9]+);)(z|z|z|z|z|vkм|\.|\,|\||\&|\#|bot|bоt|bот|([0-9]+)/ig.test(string)) return false;
	return true;
}

module.exports = command;