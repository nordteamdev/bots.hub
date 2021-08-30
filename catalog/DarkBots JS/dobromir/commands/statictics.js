const accs = require("../data/accs.json")
const scl = require("../plugins/functions.js").declOfNum
module.exports = {
	r: /стата/i,
	f: function (msg, args, vk, bot){
	    var vip = accs.filter(a=> a.rights == 1).map(a=> a.id).length
		var moders = accs.filter(a=> a.rights == 2).map(a=> a.id).length
		var admins = accs.filter(a=> a.rights == 3).map(a=> a.id).length
		var dev = accs.filter(a=> a.rights == 4).map(a=> a.id).length
		var users = accs.filter(a=> a.rights == 0).map(a=> a.id).length
		var f_add = require("../main.js").home.friends.add     
		var f_rem = require("../main.js").home.friends.remove
		var sec = require("../main.js").home.uptime.sec
		var min = require("../main.js").home.uptime.min
		var hour = require("../main.js").home.uptime.hours
		var days = require("../main.js").home.uptime.days
		var api = require("../main.js").home.api
		var stats = require("../main.js").home.stats
		var cmds = require("../main.js").home.cmds
		bot({text: "\n📊 | Статистика на данный момент:\n⚙ | Название Бота: Максим\n📎 | Версия : alpha 0.03\n🔧 | Разработчик: https://vk.com/ofnik2016\n\n👦 | Всего в базе аккаунтов: " + accs.length + "\n✉ | Принято сообщений: " + stats +"\n📝 | Обработано команд: " + cmds +"\n⏳ | Бот работает уже "+ days +" " + scl(days, ["день", "дня", "дней"]) +" " + hour + " " + scl(hour, ["час", "часа", "часов"]) + " " + min + " "+ scl(min, ["минута", "минуты", "минут"]) + " " + sec + " " + scl(sec, ["секунда", "секунды", "секунд"]) + "\n\n ℹ | Всего: \n&#4448;&#4448;&#4448;💡 Випов: " + vip + "\n&#4448;&#4448;&#4448;📖 Модераторов: " + moders + "\n&#4448;&#4448;&#4448;🐩 Администраторов: " + admins + "\n&#4448;&#4448;&#4448;🔧 Разработчиков: " + dev + "\n&#4448;&#4448;&#4448;👬 Пользователей: " + users + "\n\n✌ Друзья: \n&#4448;&#4448;&#4448;✔ Добавлено: " + f_add + "\n&#4448;&#4448;&#4448;❌ Удалено: " + f_rem})
	},
	desc: "стата -- статистика бота",
	rights: 1,
	type: "admin"
}