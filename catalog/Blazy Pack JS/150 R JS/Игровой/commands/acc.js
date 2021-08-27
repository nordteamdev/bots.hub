const accs = require("../plugins/autosave.js").accs
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(acc|профиль|account|аккаунт)$/i, 
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		var gone = `💵 | Твой баланс » ${accs[i].balance} поинтов.
👦 | Твой ник >> ${accs[i].nickname}
🔝 | Твоя привилегия » ${getRights(accs[i].id)}
🔔 | Использовано команд >> ${accs[i].cmds}
⏰ | Дата регистрации >> ${accs[i].register} (МСК)
💡 | Уровень бомжа » ${accs[i].level} lvl [${accs[i].exp} 🌟 / ${accs[i].next_level} 🌟]`
		bot({text: gone, status: false}) 
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all",
	typ: "game"
}