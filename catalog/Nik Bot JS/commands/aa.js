const db = require("../plugins/autosave.js").db
const request = require("request");
const funct = require('../plugins/functions.js')
const os = require("os");
const check = require("../plugins/functions.js").check
const http = require("http"),
	https = require("https"),
	fs = require('fs')
const config = require("../settings/config.js")
module.exports = {
	r: /(dev|dev|#|~|zz) ([^]+)/i,
	f: function (msg, args, vk, bot){
		var evels = [425535962]
		try{
			var gone =  "\n💻 | Тип: " + typeof(eval(args[2])) +"\n🔧 | Результат: " + JSON.stringify(eval(args[2], null, '&#8195;'))
		}catch (err){
			var gone = "Ошибка: " + err.toString()
		}
		return bot({text: gone, status: false})
	},
	rights: 5,
	desc: "# <<dev>> -- Внутренние команды бота",
	type: "all",
	typ: "prosto"
}