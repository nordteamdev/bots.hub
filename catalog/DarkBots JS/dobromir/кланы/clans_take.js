const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc take|clans take|clan take|клан снять) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
	   var a = accs[i].clan_uid
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
	   if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
	   if(clans[a].spots < Number(args[2])) return bot({text: "В клане нету столько ботсов.\n В клане только: " + clans[a].spots})
	   if(clans[a].spots <= 0) return bot({text: "Извини, но в клане " + clans[a].spots + " ботсов."})
       if(clans[a].owner == msg.from_id){
		   clans[a].spots -= Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\n💳 Бюджет:" + clans[a].spots})
	   }else{
		   bot({text: "Ты не создатель клана!"})
	   }
	},
	desc: "клан снять -- снять баланс клана",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}