const accs = require("../data/accs.json") 
module.exports = { 
r: /(курс)/i, 
f: function (msg, args, vk, bot){ 
	var main = require("../main.js").home
	var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid) 
	return bot({text: `\n${main.course.change.bitcoins >= 0 ? "📈" : '📉'} | 💳 | BTC » ${main.course.bitcoins} [ ${main.course.change.bitcoins} ]\n${main.course.change.diamonds >= 0 ? "📈" : '📉'} | 💎 | Алмазы » ${main.course.diamonds} [ ${main.course.change.diamonds } ]`}) 
	}, 
	desc: "курс — узнать курс валют", 
	rights: 0, 
	type: "game" 
}