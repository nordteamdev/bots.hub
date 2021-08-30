const rand = require("../plugins/functions.js").getRandomInt
const nick = require("../plugins/functions.js").nick
module.exports = {
	r: /(инфо|информация|инфа|infa|info) ([^]+)/i,
	f: function (msg, args, vk, bot){
		bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nвероятность - " + rand(0, 100) + "%\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	},
	desc: "инфа <<ТЕКСТ>> -- проверить информацию",
	rights: 0,
	type: "all"
}