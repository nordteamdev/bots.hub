let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let command = {
	pattern: /^(?:создать)\s(.*)$/i,
	f: async (message, bot) => {
		if(users[message.senderId].clan !== '') return bot.reply(`❌ Вы уже состоите в клане!`);
		if(/(http(s)?:\/\/.)?(www\.)?[0-9@:%._\+~#=]{2,256}\.[]{2,6}\b([0-9@:%_\+.~#?&//=]*)/ig.test(message.args[1])) return bot.reply('❌ В названии клана обнаружены подозрительные символы/слова.') // ок бро
		if(/(\&\#(?:[0-9]+);)(f57|синий|vk|bot|vto|vtо|vt|кит|сова|тихий|тиxий|turboliker|нaкрутка|накрутка|лайки|лaйки|секс|зоофилия|порно|бот)(в|v)(t|т)(o|о)|vkm|вкм|вkm|vкм|vkм|liker|ru|ру|ре|pe|рe|pе|com|сом|cоm|cом|\.|\,|\||\&|\#|bot|bоt|bот|([0-9]+)/ig.test(message.args[1])) return bot.reply(`❌ В названии клана обнаружены подозрительные символы/слова.`); // govnofilter доделай если что!

		if(message.args[1].length > 12) return bot.reply(`❌ Максимальная длина названия клана: 12 символов`);
		if(message.args[1].length < 4) return bot.reply(`❌ Минимальная длина названия клана: 4 символа`);

		if(clans[message.args[1]]) return bot.reply(`❌ Клан с таким названием уже существует!`);
		if(users[message.senderId].balance.dollars < 20000 && bot.user.group < 2) return bot.reply(`❌ Цена создания клана: 20000$`);

		clans[message.args[1]] = {
			"title": message.args[1],
			"cash": 0,
			"leader": message.senderId
		}

		users[message.senderId].balance.dollars -= Number(20000);
		users[message.senderId].clan = message.args[1];
		return bot.reply(`✔ Клан <<${message.args[1]}>> создан!\n\nЛюбой желающий сможет зайти по команде 'вступить ${message.args[1]}'`);
	}
}

module.exports = command;