const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc exit|clans exit|clan exit|клан выйти|клан выход|клан покинуть)/i,
	f: function (msg, args, vk, bot){ 
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid) 
		var a = accs[i].clan_uid 
		if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."}) 
		accs[i].clan_uid = -1 
		bot({text: "Ты покинул клан"}) 
	}, 
	desc: "клан покинуть -- выйти из клана",
    rights: 0,
    type: "all"
}