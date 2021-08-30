const vk = require("VK-Promise")(require("../settings/config.js").token)
const http = require("http")
const request = require("request");
const wait = require("../plugins/functions.js").wait
module.exports = {
		r: /вжух ([^]+)/i,
		f: function (msg, args, vk, bot){
			var vhuz = "вжух и "+ args[1].replace("и", "");
			request.get("http://andriy2.tk/api/risovach/1716314?zdata1=" + encodeURIComponent(vhuz), function(e,r,b){
				    wait(10000)
					if(!b) return bot({text: "Ошибка сервера risovach"})
					var data = JSON.parse(b);
					//msg.send(data.picture);
                    http.get(data.picture, function (stream){
						stream.filename = 'mem.jpg';
						vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
						files:{file:stream}}).then(function (r){
							bot({text: "Мемес готов блеать", att:"photo"+r[0].owner_id+"_"+r[0].id});
						}).catch(bot({text: "Ща будет.."}));
					});
			});
		},
		desc:"вжух <текст> -- вжухнуть что-нибудь",
		rights: 0,
		type: "all"
}