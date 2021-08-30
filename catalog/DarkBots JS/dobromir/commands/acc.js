const accs = require("../data/accs.json")
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(профиль|аккаунт)/i,
	f: function (msg, args, vk, bot){
	   bot({text: accs.filter(a=> a.id == msg.from_id).map(a=> "\n\n💰 | Баланс » " + a.spots + "💵\n🔝 | Привилегия » " + getRights(a.id) + "\n🎰 | Ставок » " + a.bets + "💵\n💡 | Уровень » " + a.level + " lvl [" + a.exp + "🌟 / "+ a.next_level +"🌟]\n💻 | ID аккаунта » " + Math.round(a.uid) + "")})
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all"
}