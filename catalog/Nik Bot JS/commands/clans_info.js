const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(cc info|clans info|clan info|клан инфо|клан информация)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid == -1) return bot({text: "❌ | У тебя нету клана."})
       var a = accs[i].clan_uid
       bot({text: `╔=====================================╗\n║===Имя Клана ->  ${clans[a].name} \n║🔥║ [id${clans[a].owner}|Создатель клана] \n║🅿║ Твой ранг: ${clans[a].owner == msg.user ? 'Создатель' : ''} ${clans[a].helpers.indexOf(i) != -1 ? '' : 'Модератор'} ${clans[a].helpers.indexOf(i) != -1 && clans[a].owner != msg.user ? 'Участник' : ''} \n║🆔║ Клана: ${a} \n║✴║ Уровень: ${clans[a].level} \n║🆙║ Опыт: [${clans[a].exp}/${clans[a].next_level}] \n║❇║ Тип клана: ${check(clans[a].type)} \n║💳║ Бюджет: ${clans[a].balance} коинов. \n║👬║ Участников: ${accs.filter(k=> k.clan_uid == a).map(k=> k.id).length}\n╚=====================================╝`})
	},
	desc: "клан инфо -- информация о вашем клане",
    rights: 0,
	type: "all",
	typ: "clan"
}
function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}