const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc list|clans list|clan list|клан лист)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."})
       var a = accs[i].clan_uid
	   bot({text: "\n 👥 Участники:\n" + accs.filter(k=> k.clan_uid == a).map(k=> `🆔 ${k.uid} | [id${k.id}|${k.nickname}] ${clans[a].helpers.indexOf(k.uid) != -1 ? 'Модератор' : ''} ${clans[a].owner == k.id ? 'Создатель' : ''} ${clans[a].owner == k.id && clans[a].helpers.indexOf(k.uid) == -1 ? 'Участник' : ''}`).join("\n") })
	},
	desc: "клан лист -- список участников клана",
    rights: 0,
	type: "all",
	typ: "clan"
}