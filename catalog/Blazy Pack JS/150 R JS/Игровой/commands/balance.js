const rand = require("../plugins/functions.js").rand
const accs = require("../plugins/autosave.js").accs
const limiter = require("../plugins/skills.js").limiter
module.exports = {
	r: /(баланс|balance)$/i,
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		return bot({text: `💵 | Твой баланс » ${accs[i].balance} поинтов ${accs[i].inventory.rabs != 0 ? ' + ' + (limiter(msg.user).farm * accs[i].inventory.rabs) + " / 60 сек.\n👾 | Майнеров >> "+ accs[i].inventory.rabs : ''} ${accs[i].inventory.barons != 0 ? `\n￼💻 | Ратников: ${accs[i].inventory.barons}` : ''} ${accs[i].inventory.diamonds != 0 ? "\n💵 | Долларов: " + accs[i].inventory.diamonds + " 💵": ''} ${accs[i].inventory.bitcoins != 0 ? "\n💷 | MCoins: " + accs[i].inventory.bitcoins + " 💷" : ''}`, status: false})
	},
	desc: "баланс -- проверить свой баланс",
	rights: 0,
	type: "all",
	typ: "game"
}