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
	    if(args[2] == 8) return bot({text: "Создателям бота нельзя стать просто так!"})
		accs[user].rights = Number(args[2])
		var r = Number(args[2])
	    if(r == 0){
			var ri = "Пользователя"
		}else if(r == 0){
			var ri = "Випа"
		}else if(r == 1){
                        var ri = "Випа"
		}else if(r == 2){
			var ri = "Премиума"
		}else if(r == 3){
			var ri = "Модератора"
		}else if(r == 4){
			var ri = "Администратора"
		}else if(r == 5){
			var ri = "Смотрителя"
		}else if(r == 6){
			var ri = "Разработчика"
		}else if(r == 7){
			var ri = "СИСАДМИНА"
		}
		bot({text: "[id" + accs[user].id + "|Ему] выданы права " + ri})
	}catch(err){
		console.log(err)
	}
	},
	rights: 7,
	desc: "права <ПОЛЬЗОВАТЕЛЬ> <ПРАВА, 0 - пользователь, 1 - вип, 2 - премиум, 3 - модератор, 4 - администратор, 5 - смотритель, 6 - разработчик, 7- сисадмин,>",
	type: "all"
}