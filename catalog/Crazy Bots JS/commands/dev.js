const rights = require("../data/rights.json")
const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const ggg = require("../plugins/functions.js").getRights
const request = require("request");
const os = require("os");
const config = require("../settings/config.js")
const punycode = require('punycode');
const readline = require('readline');
const colors = require('colors/safe');
const steam = require('steam-web');
const date = require('date-and-time');
const tcpp = require('tcp-ping');
const vk = new require("VK-Promise")(require("../settings/config.js").token)
const child = require("child_process");
const check = require("../plugins/functions.js").check
const http = require("http"),
	https = require("https"),
	fs = require('fs')
module.exports = {
	r: /(eval|евал|#|~|zz) ([^]+)/i,
	f: function (msg, args, vk, bot){
		if(config.eval.indexOf(msg.from_id) == -1) return
		try{
			var gone = "Результат: " + JSON.stringify(eval(args[2]))
		}catch (err){
			var gone = "Ошибка: " + err.toString()
		}
		return bot({text: gone})
	},
	rights: 8,
	desc: "# <<eval>> -- евал команды",
	type: "all"
}