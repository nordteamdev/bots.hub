const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc exit|clans exit|clan exit|клан выйти|клан выход|клан покинуть)/i,
	f: function (msg, args, vk, bot){ 
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
		var a = accs[i].clan_uid 
		if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."}) 
		accs[i].clan_uid = -1 
		bot({text: "✅ | Ты покинул клан"}) 
	}, 
	desc: "клан покинуть -- выйти из клана",
    rights: 0,
	type: "all",
	typ: "clan"
}