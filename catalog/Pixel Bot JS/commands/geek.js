const request = require("request");
const http = require("http")
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
var https = require('https')
module.exports = { 
	r: /geek ([^]+) ([1-2]+)/i, 
	f: function (msg, args, vk, bot){ 
		request.get("https://andriy2.tk/api/geekbrains?text=" + encodeURIComponent(args[1]) + "&v="+ encodeURIComponent(args[2]), (e, r, b) => { 
		if(e) return msg.send('Ошибка!') 
		var data = JSON.parse(b) 
			https.get(data.picture, function(stream){ 
			stream.filename = 'mine.png'; 
			msg.sendPhoto(stream); 
			}) 
		}) 
	}, 
	desc: "geek текст — получить сертификат",
	rights: 0,
	type: "prosto",
	typ: "prosto"
}