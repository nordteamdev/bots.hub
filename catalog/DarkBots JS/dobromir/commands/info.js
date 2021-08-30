const rand = require("../plugins/functions.js").getRandomInt
const nick = require("../plugins/functions.js").nick
module.exports = {
	r: /(инфо|информация|инфа) ([^]+)/i,
	f: function (msg, args, vk, bot){
		bot({text: "\n🎲 | Вероятность - " + rand(0, 100) + "%"})
	},
	desc: "инфа | инфо <<ТЕКСТ>> -- проверить информацию",
	rights: 0,
	type: "all"
}