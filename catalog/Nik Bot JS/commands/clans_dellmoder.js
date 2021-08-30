const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc dell|clans dell|clan dell|клан удалить) ([0-9]+)/i,
	f: function (msg, args, vk, bot){ 
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
		var a = accs[i].clan_uid 
		if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."}) 
		if(accs[Number(args[2])].clan_uid != a) return bot({text: "❌ | Данный игрок не в твоем клане!"}) 
		if(clans[a].helpers.indexOf(Number(args[2])) == -1) return bot({text: "❌ | Человек не модератор клана"})
		if(clans[a].owner == msg.user){ 
		clans[a].helpers.splice(clans[a].helpers.indexOf(Number(args[2])),1)
		bot({text: "🆔 Клана:" + a + "\n💳 игрок " + Number(args[2]) + " теперь не модератор клана"}) 
		}else{ 
		bot({text: "❌ | Ты не создатель клана!"}) 
		} 
	}, 
	desc: "клан удалить ID -- удалить модера из клана",
    rights: 0,
	type: "all",
	typ: "clan"
}