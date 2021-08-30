const accs = require("../data/accs.json")
const limiter = require("../plugins/skills.js").limiter 
module.exports = { 
	r: /(баланс)/i, 
	f: function (msg, args, vk, bot){ 
	var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		return bot({text: `💵 | Твой баланс » ${accs[i].spots} ботсов ${accs[i].inventory.miner != 0 ? ' \n Прибыль: \n + ' + (accs[i].inventory.miner*2) + " / 60 сек." : ''}  ${accs[i].inventory.videocard != 0 ? '\n+ ' + (accs[i].inventory.videocard*5) +  "/ 60 сек." : ''} ${accs[i].inventory.miner != 0 ? "\n👾 | Майнеров » "+ accs[i].inventory.miner : ''} ${accs[i].inventory.videocard != 0 ? "\n💽 | Видеокарт » "+ accs[i].inventory.videocard : ''} ${accs[i].inventory.diamonds != 0 ? "\n💎 | DD: " + accs[i].inventory.diamonds + " 💎": ''} ${accs[i].inventory.bitcoins != 0 ? "\n💳 | BTC: " + accs[i].inventory.bitcoins + " 💳" : ''}`, status: false}) 
	//return bot({text: `💵 | Твой баланс » ${accs[i].spots} ботсов ${accs[i].inventory.miner != 0 ? ' + ' + (accs[i].inventory.miner) + " / 60 сек.\n👲 | Рабов » "+ accs[i].inventory.miner : ''} ${accs[i].inventory.videocard != 0 ? `\n💂 | Баронов: ${accs[i].inventory.videocard}` : ''} ${accs[i].inventory.diamonds != 0 ? "\n💎 | DD: " + accs[i].inventory.diamonds + " 💎": ''} ${accs[i].inventory.bitcoins != 0 ? "\n💳 | BT: " + accs[i].inventory.bitcoins + " 💳" : ''}`, status: false}) 
	}, 
	desc: "баланс — проверить свой баланс", 
	rights: 0, 
	type: "all", 
}