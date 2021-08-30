const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc take|clans take|clan take|клан снять) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
	   var a = accs[i].clan_uid
       if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."})
	   if(args[2] == 0) return bot({text: "❌ | Извини, но 0 нельзя."})
	   if(clans[a].balance < Number(args[2])) return bot({text: "❌ | В клане нету столько ботсов.\n В клане только: " + clans[a].balance})
	   if(clans[a].balance <= 0) return bot({text: "❌ | Извини, но в клане " + clans[a].balance + " ботсов."})
       if(clans[a].owner == msg.user || clans[a].helpers.indexOf(msg.user) != -1){ 
		   clans[a].balance -= Number(args[2])
		   accs[i].balance += Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\n💳 Бюджет:" + clans[a].balance})
	   }else{
		   bot({text: "Ты не создатель клана!"})
	   }
	},
	desc: "клан снять -- снять баланс клана",
    rights: 0,
	type: "all",
	typ: "clan"
}