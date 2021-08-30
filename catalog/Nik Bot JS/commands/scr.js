const request = require("request");
const http = require("http")
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
var https = require('https')
module.exports = { 
	r: /scr/i, 
	f: function (msg, args, vk, bot){ 
		msg.get().then(m => request.post('https://andriy2.tk/api/fwd', {form: m}, (e,r,b) => {if(e) return msg.send('Ошибка!');
				let data = JSON.parse(b);
				if(!data.picture) return msg.send('Нету пересланных!');
				https.get(data.picture, stream => {stream.filename = 'fwd.png';msg.sendPhoto(stream)
			})
		}))
	}, 
	desc: "screen пересланное сообщение",
	rights: 0,
	type: "api"
}