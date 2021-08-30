const encode = require("../plugins/functions.js").encode
const filter = require("../plugins/functions.js").filter
const nick = require("../plugins/functions.js").nick
module.exports = {
	r: /(зашифруй|encode) ([^]+)/i,
	f: function (msg, args, vk, bot){
	   bot({text: "результат: " + encode(args[2])})
	},
	desc: "зашифруй <ТЕКСТ> -- зашифрует ваш текст",
	rights: 0,
	type: "all"
}