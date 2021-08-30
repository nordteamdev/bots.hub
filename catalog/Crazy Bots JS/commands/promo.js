const promo = require("../data/promocodes.json")
const pass = require("../plugins/functions.js").password
module.exports = {
	r: /(promo|промо) (ген|удалить) ([0-9]+)?\s?([0-9]+)?\s?([^]+)/i,
	f: function (msg, args, vk, bot){
	   if(args[2].toLowerCase() == "ген"){ 
			var gen = pass(10)
			if(!args[3]) return
			var gone = args[5].split(" ").join("")
		  promo[gone + "-" + gen] = {balance: Number(args[3]), used: Number(args[4]), users: [], status: true}
		  bot({text: "Промокод создан " + gone + "-" + gen + " успешно!\nДополнительные параметры: \nБаланс промокода: " + args[3] + " 💵.\nИспользований: " + args[4]})
		 }
		 if(args[2].toLowerCase() == "удалить") {
			 if(!promo[args[5]]) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТакого промокода не существует!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
			 promo[args[5]].status = false
			 bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПромокод " + args[5] + " деактивирован!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
		 }
    },
	desc: "промо <ген|удалить> <ДОП аргументы>",
	rights: 8,
	type: "all"
}