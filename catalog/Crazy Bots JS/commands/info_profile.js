const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const getRights = require("../plugins/functions.js").getRights
const getClan = require("../plugins/functions.js").getClan
module.exports = {
	r: /(profile|проф) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var text = Number(args[2])
       if(!accs.some(a=> a.id == text)) return msg.send("\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~ \nПользователь *id" + text + " не найден в базе аккаунтов.\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~ ")
	   bot({text: accs.filter(a=> a.id == text).map(a=> "\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~ \n ~/~/~/~/~/~/~🎄Его профиль 🎄~/~/~/~/~/~/~\n\n🎁 Твой баланс: " + a.spots + " 💵\n🎅 Твой id: " + a.id + "\n⛄ Привилегия: " + getRights(a.id) + "\n🎀 Твой клан: " + getClan(a.id) + "\n🎈 Использований: " + a.used + " шт\n🎊 Ставок (в рулетке): " + a.bets + " 💵\n🔮 Уровень: " + a.level + "\n🌟 Опыт: [ " + a.exp + " | "+ a.next_level +" ]\n🔔 Использовано команд: " + a.cmds + "\n💡 Оповещения: " + a.not.length + "\n🍭 ID аккаунта: " + Math.round(a.uid + 1) + "\n\n~/~/~/~/~/~/~🎄Его профиль 🎄~/~/~/~/~/~/~\n ~/~/~/~❄❄❄❄❄❄❄~/~/~/~")})
	},
	desc: "проф <<ID пользователя>> -- проверить у него профиль",
	rights: 3,
	type: "all"
}