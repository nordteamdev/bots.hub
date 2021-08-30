const request = require("request");
const http = require("http")
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.json")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /^\/pworld ([^]+) ([0-2])/i,
	f: function (msg, user, sex){
		request.get("http://andriy2.tk/api/thepr?username=" + encodeURIComponent(user) + "&sex=" + encodeURIComponent(sex), (e,r,b) => {
			wait(3000);
			if(b.search("<!DOCTYPE html>") != -1 || !b) return msg.send("Упс, произошла ошибка на сервере")
			var data = JSON.parse(b)
			http.get(data.picture, function(stream){
					stream.filename = 'thepr.jpg';
					vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
						files:{file:stream}}).then(function (r){
							console.log(r);
                            msg.reply("", {attachment:"photo"+r[0].owner_id+"_"+r[0].id});
						}).catch(msg.send("Жди крч"));
                });
		});
	},
	desc: "/pworld <ВАШЕ ИМЯ> <ВАШ ПОЛ, 0 - парень, 1 - женщина, 2 - оно> -- сертификат о парабащении мира",
	rights: 0
}