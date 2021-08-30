const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(test|тест)/i,
	f: function (msg, args, vk, bot){
		var rep = ["Я работаю нахой", "Я работаю, все отлично", "Я работаю сэр!"]
		return bot({text: rand(rep)})
	},
	desc: "test -- проверка работоспособности бота",
	rights: 0,
	type: "all"
}