const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const getRights = require("../plugins/functions.js").getRights
const getClan = require("../plugins/functions.js").getClan
const config = require("../settings/config.js")
const vk = require("VK-Promise")(config.token)
module.exports = {
	r: /(scan|конфа) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
	   if(accs.filter(a=> a.id == msg.from_id).map(a=> a.inventory.scans) == 0) return bot({text: "Недостаточно сканов, чтобы использовать данную команду!"})
	   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
	   vk.messages.getChat({chat_id: args[2], fields: "sex"}).then(function (res) {
				if(res.admin_id == 0) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТакой беседы не существует\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"});
				if(!res.users[0]) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~Меня кикнули из этой беседы\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"});
				accs[i].inventory.scans -= 1
				bot({text: "🆔 Информация по беседе "+ args[2] + "\n✏ Название беседы: "+ res.title +"\n👮 Создатель беседы: vk.com/id"+res.admin_id+"\n👥 Пользователи беседы: \n" + res.users.map(a=> "[id" + a.id + "|" + a.first_name + " " + a.last_name + "]").join(', ')});
	   })
	},
	desc: "конфа <ID беседы> -- проверить свой профиль",
	rights: 0,
	type: "all"
}