const accs = require("../data/accs.json")
const config = require("../settings/config.js")
module.exports = {
	r: /о боте/i,
	f: function (msg, args, vk, bot){
		bot({text: "\n📊 | Информация о боте:\n📎 | Версия : alpha " + config.version + "\n🔧 | Разработчик: https://vk.com/ofnik2016"})
	},
	desc: "о боте -- о бота",
	rights: 0,
	type: "all"
}