const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc deposit|clans deposit|clan deposit|клан пополнить) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
	   if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
	   if(accs[i].spots < Number(args[2])) return bot({text: "у тебя нету столько баланса.\n У тебя только: " + Number(args[2])})
	   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
	   var a = accs[i].clan_uid
       if(accs[i].spots){
		   clans[a].spots += Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\n💳 Бюджет:" + clans[a].spots})
	   }
	},
	desc: "клан пополнить -- пополнить баланс клана",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}