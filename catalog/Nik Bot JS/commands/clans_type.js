const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(cc type|clans type|clan type|клан тип) ([1-2])/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."})
	   var a = accs[i].clan_uid
       if(clans[a].owner == msg.user || clans[a].helpers.indexOf(msg.user) != -1){ 
		   clans[a].type = Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\nТип клана: " + check(clans[a].type)})
	   }else{
		   bot({text: "❌ | Ты не создатель клана!"})
	   }
	},
	desc: "клан тип -- установить тип клана 1 - Открыт 2 - закрыт",
    rights: 0,
	type: "all",
	typ: "clan"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}