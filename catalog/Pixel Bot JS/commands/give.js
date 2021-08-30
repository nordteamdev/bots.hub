const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
		r: /give ([0-9]+)/i, 
		f: (msg, args, vk, bot) => { 
			var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
				if(Number(args[1]) > 100000) return bot ({text: "\n⚠ Не больше 100000 коинов"}) 
			accs[i].balance += Number(args[1]) 
		bot({text: "добавил тебе " + args[1] + "💵"}) 
	}, 
	rights: 3, 
	desc: "give <число> — Выдать себе деньги", 
	type: "all", 
	typ: "game" 
}