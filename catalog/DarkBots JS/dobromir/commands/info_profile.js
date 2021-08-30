const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const getRights = require("../plugins/functions.js").getRights
const getClan = require("../plugins/functions.js").getClan
module.exports = {
	r: /(profile|проф) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var text = Number(args[2])
       if(!accs.some(a=> a.id == text)) return msg.send("\n👦 | Пользователь *id" + text + " не найден в базе аккаунтов.")
	   bot({text: accs.filter(a=> a.id == text).map(a=>"\n\n👦 | Его профиль : \n\n💰 | Баланс » " + a.spots + "💵\n🔝 | Привилегия » " + getRights(a.id) + "\n🎰 | Ставок » " + a.bets + "💵\n💡 | Уровень » " + a.level + " lvl [" + a.exp + "🌟 / "+ a.next_level +"🌟]\n💻 | ID аккаунта » " + Math.round(a.uid) + "")})
	},
	desc: "проф <<ID пользователя>> -- проверить у него профиль",
	rights: 3,
	type: "admin"
}