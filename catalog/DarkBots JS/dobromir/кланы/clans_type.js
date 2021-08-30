const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc type|clans type|clan type|клан тип) ([1-2])/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
	   var a = accs[i].clan_uid
       if(clans[a].owner == msg.from_id){
		   clans[a].type = Number(args[2])
		   bot({text: "🆔 Клана:" + a + "\nТип клана: " + check(clans[a].type)})
	   }else{
		   bot({text: "Ты не создатель клана!"})
	   }
	},
	desc: "клан тип -- установить тип клана 1 - Открыт 2 - закрыт",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}