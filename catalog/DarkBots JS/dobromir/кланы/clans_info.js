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
       //bot({text: "["+ clans[a].smile + " "+ clans[a].name +"] 🆔 "+ a +"\n ⬆ Уровень: "+ clans[a].level +" ❕[" + clans[a].exp +"/500] \n Баланс клана: "+ clans[a].spots +" ботсов. \n 👑 [id"+ clans[a].owner +"|Создатель] \n 🔧 Тип клана: "+ check(clans[a].type) + "\n 👥 Участники: " + accs.filter(k=> k.clan_uid == a).map(k=> k.id).length})
       bot({text: `| ${clans[a].smile} | ${clans[a].name} \n 🔥 [id${clans[a].owner}|Создатель клана] \n 🅿 Твой ранг: ${clans[a].owner == msg.from_id ? 'Создатель' : 'Участник'} \n 🆔 Клана: ${a} \n ✴ Уровень: ${clans[a].level} \n🆙 Опыт: [${clans[a].exp}/${clans[a].next_level}] \n ❇ Тип клана: ${check(clans[a].type)} \n 💳 Бюджет: ${clans[a].spots} ботсов. \n 👬 Участников: ${accs.filter(k=> k.clan_uid == a).map(k=> k.id).length}`})
	},
	desc: "клан инфо -- информация о вашем клане",
    rights: 0,
    type: "all"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}