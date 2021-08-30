const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc moder|clans moder|clan moder|клан модер) ([0-9]+)/i,
	f: function (msg, args, vk, bot){ 
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
		var a = accs[i].clan_uid 
		if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."}) 
		if(accs[Number(args[2])].clan_uid != a) return bot({text: "❌ | Данный игрок не в твоем клане!"}) 
		if(clans[a].helpers.indexOf(Number(args[2])) != -1) return bot({text: "❌ | Человек уже модератор клана"})
		if(clans[a].owner == msg.user){ 
		clans[a].helpers.push(Number(args[2]))
		bot({text: "🆔 Клана:" + a + "\n💳 игрок " + Number(args[2]) + " теперь модератор клана"}) 
		}else{ 
		bot({text: "❌ | Ты не создатель клана!"}) 
		} 
	}, 
	desc: "клан модер ID -- сделать модером клана",
    rights: 0,
	type: "all",
	typ: "clan"
}