const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc kick|clans kick|clan kick|клан кик) ([0-9]+)/i,
	f: function (msg, args, vk, bot){ 
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid) 
		var a = accs[i].clan_uid 
		if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."}) 
		if(accs[Number(args[2])].clan_uid != a) return bot({text: "Данный игрок не в твоем клане!"}) 
		if(clans[a].owner == msg.from_id){ 
		accs[Number(args[2])].clan_uid = -1 
		bot({text: "🆔 Клана:" + a + "\n💳 игрок с 🆔" + Number(args[2]) + " Кикнут из клана"}) 
		}else{ 
		bot({text: "Ты не создатель клана!"}) 
		} 
	}, 
	desc: "клан кик ID -- кикнуть из клана",
    rights: 0,
    type: "all"
}