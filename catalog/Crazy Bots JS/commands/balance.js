const accs = require("../data/accs.json")
module.exports = {
	r: /(balance|баланс)/i,
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		return bot({text:"\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n\n🎁Твой баланс: " + accs[i].spots + "💵\n\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
    },
	desc: "balance -- узнать свой баланс",
	rights: 0, 
	type: "all"
}