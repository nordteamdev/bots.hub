const accs = require("../data/accs.json")
const random = require("../plugins/functions.js").getRandomInt
module.exports = {
	r: /(reset|резет)/i,
	f: function (msg, args, vk, bot){
	   const i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       accs[i].spots = random(1500, 2300)
	   bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЯ тебе перезагрузил(а) баланс!\nБаланс: " + accs[i].spots + " 💵\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	},
	rulet: "резет -- резетнуть свой баланс",
	rights: 0,
	type: "all"
}