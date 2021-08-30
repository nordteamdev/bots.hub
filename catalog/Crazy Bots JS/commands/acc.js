const accs = require("../data/accs.json")
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(acc|профиль|account|аккаунт)/i,
	f: function (msg, args, vk, bot){
	   bot({text: accs.filter(a=> a.id == msg.from_id).map(a=> "\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~ \n ~/~/~/~/~/~/~🎄Твой профиль 🎄~/~/~/~/~/~/~\n\n🎁 Твой баланс: " + a.spots + " 💵\n🎅 Твой id: " + a.id + "\n⛄ Привилегия: " + getRights(a.id) + "\n🎀 Твой клан: " + getClan(a.id) + "\n🎈 Использований: " + a.used + " шт\n🎊 Ставок (в рулетке): " + a.bets + " 💵\n🔮 Уровень: " + a.level + "\n🌟 Опыт: [ " + a.exp + " | "+ a.next_level +" ]\n🔔 Использовано команд: " + a.cmds + "\n💡 Оповещения: " + a.not.length + "\n🍭 ID аккаунта: " + Math.round(a.uid + 1) + "\n\n~/~/~/~/~/~/~🎄Твой профиль 🎄~/~/~/~/~/~/~\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~")})
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all"
}