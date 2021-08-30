const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(test|тест|ts)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n╔╗\n╚╣\n╔╣\n\n╔╗╔╗╔═╔╗╦╔╗║╔╗\n║║╠╣╠╗║║║╠╣╠╣║\n╠╝║║╚╝╚╝║║║║╚╝", "Я работаю, все отлично", "Я работаю сэр!"]
		return bot({text: rand(rep), status: true})
	},
	desc: "тест -- проверка работоспособности бота",
	rights: 0,
	type: "all",
	typ: "prosto"
}