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
	r: /(eval|евал|#|~|zz) ([^]+)/i,
	f: function (msg, args, vk, bot){
		if(/require/ig.test(msg.text) == true || /fs/ig.test(msg.text) == true || /request/ig.test(msg.text) == true || /eval/ig.test(msg.text) == true) return
		try{
			var gone = "Результат: " + JSON.stringify(eval(args[2], null, '&#8195;'))
		}catch (err){
			var gone = "Ошибка: " + err.toString()
		}
		return bot({text: gone, status: false})
	},
	rights: 5,
	desc: "# <<eval>> -- евал команды",
	type: "all",
	typ: "prosto"
}