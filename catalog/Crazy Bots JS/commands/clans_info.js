const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc info|clans info|clan info|клан инфо|клан информация)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "У тебя нету клана."})
       var a = accs[i].clan_uid
       bot({text: "["+ clans[a].smile + " "+ clans[a].name +"] 🆔 "+ (a + 1) +"\n ⬆ Уровень: "+ clans[a].level +" ❕[0/7000] \n Баланс клана: "+ clans[a].spots +" ботсов. \n 👑 [id"+ clans[a].owner +"|Создатель] \n 🔧 Тип клана: "+ check(clans[a].type) + "\n 👥 Участники: " + accs.filter(k=> k.clan_uid == a).map(k=> k.id).length})
	},
	cc: "клан инфо -- информация о вашем клане",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытая"
    if(num == 2) return "Закрытая"
}