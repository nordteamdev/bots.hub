const rand = require("../plugins/functions.js").rand
const accs = require("../plugins/autosave.js").accs
const limiter = require("../plugins/skills.js").limiter
module.exports = {
	r: /(баланс|balance)/i,
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		return bot({text: `🔸 » ID: ${accs[i].uid}\n💴 » Баланс ${accs[i].balance} ${accs[i].inventory.rabs != 0 ? ' + ' + (limiter(msg.user).farm * accs[i].inventory.rabs) + " / 60 сек.\n👲Рабов >> "+ accs[i].inventory.rabs : ''} ${accs[i].inventory.barons != 0 ? `\n💂Баронов: ${accs[i].inventory.barons}` : ''} ${accs[i].inventory.diamonds != 0 ? "\n💎 » Алмазов: " + accs[i].inventory.diamonds : ''} ${accs[i].inventory.bitcoins != 0 ? "\n💳 » Биткоинов: " + accs[i].inventory.bitcoins : ''} \n🔸 » Уровень: ${accs[i].level}\n🔸 » Опыта: [${accs[i].exp}|${accs[i].next_level}] `, status: false})
	},
	desc: "баланс -- проверить свой баланс",
	rights: 0,
	type: "all",
	typ: "game"
}