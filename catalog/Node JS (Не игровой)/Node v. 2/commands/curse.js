module.exports = { 
r: /(курс)/i, 
f: function (msg, args, vk, bot){ 
	var main = require('../main.js').main
	var loh_istorik = ['📈', '📉']
	return bot({text: `${main.course.dd >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс DD: 1💎 = ${main.course.diamonds} коинов (${main.course.dd >= 0? (main.course.dd == 0 ? '0' : "+" + main.course.dd ) : main.course.dd}) \n${main.course.bit >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс BTC: 1💳 = ${main.course.bitcoins} коинов (${main.course.bit >= 0? (main.course.bit == 0 ? '0' : "+" + main.course.bit ) : main.course.bit})`}) 
	}, 
	desc: "курс — узнать курс валют", 
	rights: 0, 
	type: "all",
	typ: "game"
}