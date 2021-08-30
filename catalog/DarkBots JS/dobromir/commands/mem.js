const request = require("request");
const http = require("http")
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
var https = require('https')
module.exports = { 
	r: /мем ([0-9]+) ([^]+) ([^]+)/i, 
	f: function (msg, args, vk, bot){ 
		request.get("https://andriy2.tk/api/risovach/" + encodeURIComponent(args[1]) + "?zdata1=" + encodeURIComponent(args[2]) + "&zdata2="+ encodeURIComponent(args[3]), (e, r, b) => { 
		if(e) return msg.send('Ошибка!') 
		var data = JSON.parse(b) 
			http.get(data.picture, function(stream){ 
			stream.filename = 'mem.png'; 
			msg.sendPhoto(stream); 
			}) 
		}) 
	}, 
	desc: "мем <ид картинки мема | команда мем лист> <текст сверху> <текст снизу> — сделать мем",
	rights: 0,
	type: "api"
}