const accs = require("../data/accs.json")
const ggg = require("../plugins/functions.js").getRights
const mes = require("../settings/messages.json")
const nick = require("../plugins/functions.js").nick
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /Мем лист/i,
	f: function (msg, args, vk, bot){
	bot({text:" Список мемов:", att: "photo136286839_456247706"})
	},
	rights: 0,
	desc: "Мем лист -- cписок мемов",
	type: "api"
}