const pass = require('../plugins/functions.js').password
const nick = require("../plugins/functions.js").nick
module.exports = {
	r: /(pass|password|пароль) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
        if(Number(args[2]) > 100) return bot({text: 'Шо це я не понял(а) ты це ахуил(а), почему генерируем пароль больше 100?'})
		bot({text: "твой пароль: " + pass(Number(args[2]))})
	},
	desc: "пароль <ДЛИНА ПАРОЛЯ> -- генератор пароля",
	rights: 0,
	type: "all"
}