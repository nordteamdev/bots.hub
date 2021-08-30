const fs = require("fs")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./" + x));
const nick = require("../plugins/functions.js").nick
const accs = require("../data/accs.json")
module.exports = {
	r: /(help|помощь)/i,
	f: function (msg, args, vk, bot){
		var access = ['⛄', '❄', '🎁', '🎄', '🎃', '🎈', '👼', '🌍', "🎅"]
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		/*
		0 - user
		1 - vip
		2 - premium
		3 - moder
		4 - admin
		5 - смотритель
		6 - разраб
		7 - сис админ
		8 - создатель бота
		*/
		bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nВсе доступные команды: \n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.desc).map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\nУровень доступа:\n⛄ - Пользователь\n❄ - с Випа\n🎁 - с Премиума\n🎄 - с Модератора\n🎃 - с Администратора\n🎈 - со Смотрителя\n👼 - с Разработчика\n🌍 - только Системному Разработчику\n🎅 - с Создателя Бота\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n🎄====================🎄\nС наступающим новым годом!"})
	},
	desc: "помощь -- справка команд",
	rights: 0,
	type: "all"
}