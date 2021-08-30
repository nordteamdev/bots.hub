const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc deposit|clans deposit|clan deposit|клан пополнить|клан внести) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
	   if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
	   if(accs[i].balance < Number(args[2])) return bot({text: "у тебя нету столько баланса.\n У тебя только: " + Number(args[2])})
	   if(accs[i].balance <= 0) return bot({text: "Извини, но у тебя " + accs[i].balance + " коинов."})
	   var a = accs[i].clan_uid
       if(accs[i].balance){
		   clans[a].balance += Number(args[2])
		   accs[i].balance -= Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\n💳 Бюджет:" + clans[a].balance})
	   }
	},
	desc: "клан пополнить -- пополнить баланс клана",
    rights: 0,
	type: "all",
	typ: "clan"
}