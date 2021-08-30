const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(test|тест)/i,
	f: function (msg, args, vk, bot){
		var rep = ["Я работаю нахой\n🎄====================🎄\nС наступающим новым годом!", "Я работаю, все отлично\n🎄====================🎄\nС наступающим новым годом!", "Я работаю сэр!\n🎄====================🎄\nС наступающим новым годом!"]
		return bot({text: rand(rep)})
	},
	desc: "test -- проверка работоспособности бота",
	rights: 0,
	type: "all"
}