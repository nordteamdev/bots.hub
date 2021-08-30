const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc list|clans list|clan list|клан лист)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
       var a = accs[i].clan_uid
	   bot({text: "\n 👥 Участники:\n" + accs.filter(k=> k.clan_uid == a).map(k=> `🆔 ${k.uid} | [id${k.id}|${k.nickname}]`).join("\n") })
	},
	desc: "клан лсит -- список участников клана",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытая"
    if(num == 2) return "Закрытая"
}