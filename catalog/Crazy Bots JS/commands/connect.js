const accs = require("../data/accs.json")
const ggg = require("../plugins/functions.js").getRights
const mes = require("../settings/messages.json")
const nick = require("../plugins/functions.js").nick
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(добавь|закинь|addconf) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
	   vk("messages.addChatUser", {chat_id: args[2], user_id: msg.from_id}).catch(function (error){
		  bot({text:"\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nМне не удалось добавить тебя в другую конфу!\n\nВозможные причины: \n1) Ты не добавил меня в друзья\n2) Ты добавил у меня в чс\n3) Ты запретил добавлять в беседу в настройках приватности\n 4) Ты уже в беседе\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   })
		.then(function(res){if(!res) return; bot({text: "Добавил(а) тебя в другую конфу"})})
	},
	rights: 2,
	desc: "добавь <id конфы> -- добавляет вас в беседу по id",
	type: "all"
}