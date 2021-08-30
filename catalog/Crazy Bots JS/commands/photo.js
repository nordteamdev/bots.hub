const vk = new require("VK-Promise")(require("../settings/config.js").token)
const getRandomInt = require("../plugins/functions.js").getRandomInt
module.exports = {
	r: /(фото|photo) ([^]+)/i,
	f: function (msg, args, vk, bot){
	   vk("video.search", {q: args[2], offset: getRandomInt(0, 100), count: 200}).then(function(res){
           if(!res.items[0]) return bot({text: "Фотки не найдены"})
           bot({text: "Найдено " + res.items.length + " фоток: ", att: res.items.map(a=> "photo" + a.owner_id + "_" + a.id).join(",")})
       })
	},
	desc: "фото <ТЕКСТ> -- поиск фото",
	rights: 0,
	type: "all"
}