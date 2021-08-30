const accs = require("../plugins/autosave.js").accs
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(acc|профиль|account|аккаунт)/i, 
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		var gone = `💵 | Твой баланс » ${accs[i].balance} поинтов.\n👦 | Твой ник >> ${accs[i].nickname}\n🔝 | Твоя привилегия » ${getRights(accs[i].id)}${getClan(accs[i].id) ? "\n💎 | Твой клан »" + getClan(accs[i].id) : ""}\n🔔 | Использовано команд >> ${accs[i].cmds}\n⏰ | Дата регистрации >> ${accs[i].register} (МСК)\n💡 | Уровень » ${accs[i].level} lvl [${accs[i].exp} 🌟 / ${accs[i].next_level} 🌟]`
		bot({text: gone, status: false}) 
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all",
	typ: "game"
}