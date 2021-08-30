const accs = require("../plugins/autosave.js").accs
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(прф|профиль|проф|аккаунт)/i, 
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		var gone = `» 🎓[id${accs[i].id}|${accs[i].nickname}], ваш профиль: \n🔎 » Игровой ID: ${accs[i].uid} \n⚡ » Цифровой вк ID: ${accs[i].id} \n📔 » Префикс: ${accs[i].prefix} \n🔰 » Клан: ${getClan(accs[i].id)} \n🐩 » Использовано команд: ${accs[i].cmds} \n💵 » Баланс: ${accs[i].balance} коинов \n🔸 » Уровень ${accs[i].level} \n🔥 » Опыт [${accs[i].exp} | ${accs[i].next_level}] \n⛔ » Статус: ${getRights(accs[i].id)} \n📝 » Зарегистрирован(а): ${accs[i].register}`
		bot({text: gone, status: false}) 
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all",
	typ: "game"
}

