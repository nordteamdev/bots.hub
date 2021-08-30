const accs = require("../data/accs.json")
const ggg = require("../plugins/functions.js").getRights
const mes = require("../settings/messages.json")
const nick = require("../plugins/functions.js").nick
module.exports = {
	r: /права ([0-9]+) ([0-8])/i,
	f: function (msg, args, vk, bot){
		try{
	    if(!accs.some(a=> a.id == Number(args[1]))) return bot({text: "у нас проблемки! Пользователь не зареган."})
		var user = accs.filter(a=> a.id == Number(args[1])).map(a=> a.uid)
	    if(args[2] == 4) return bot({text: "Разработчика можно выдать только в конфиге!"})
		accs[user].rights = Number(args[2])
		var r = Number(args[2])
	    if(r == 0){
			var ri = "Пользователя"
		}else if(r == 1){
            var ri = "Випа"
		}else if(r == 2){
			var ri = "Модератора"
		}else if(r == 3){
			var ri = "Администратора"
		}
		bot({text: "[id" + accs[user].id + "|Ему] выданы права " + ri})
	}catch(err){
		console.log(err)
	}
	},
	rights: 4,
	desc: "права <ПОЛЬЗОВАТЕЛЬ> <ПРАВА, 0 - пользователь, 1 - вип, 2 - модератор, 3 - администратор, 4 - разработчик>",
	type: "admin"
}