const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(pravila|правила)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n Представлены на сайте : http://bot.cryazbotss.online/rules " ]
		return bot({text: rand(rep)})
	},
	desc: "правила -- прочитайте внимательно",
	rights: 0,
	type: "game"
}