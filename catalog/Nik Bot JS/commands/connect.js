const getRights = require("../plugins/functions.js").getRights
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(добавь|закинь) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
	   vk.api.call('messages.addChatUser', {chat_id: args[2], user_id: msg.user}).catch(function (error){
		   bot({text:"\n😢 | Мне не удалось добавить тебя в другую конфу!\n\nВозможные причины: \n1) Ты не добавил меня в друзья\n2) Ты добавил у меня в чс\n3) Ты запретил добавлять в беседу в настройках приватности\n 4) Ты уже в беседе"})
	   }).then(function(res){if(!res) return; bot({text: "\n👮 | Добавил(а) тебя в другую конфу"})})
	},
	rights: 2,
	desc: "добавь <id конфы> -- добавляет вас в беседу по id",
	type: "all",
	typ: "prosto"
}