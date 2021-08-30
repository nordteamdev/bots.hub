const promo = require("../data/promocodes.json")
module.exports = {
	r: /(promo|промо) (ген|удалить) ([0-9]+)?\s?([0-9]+)?\s?([^]+)/i,
	f: function (msg, args, vk, bot){
	   if(args[2].toLowerCase() == "ген"){ 
			if(args[3] > 100000) return bot({text: "\n⛔ | Нельзя создавать промокод суммой выше 100000"})
			var gone = args[5].split(" ").join("")
		  promo[gone] = {balance: Number(args[3]), used: Number(args[4]), users: [], status: true}
		  bot({text: "\n💡 | Промокод "+ gone + " создан успешно!\n💼 | Дополнительные параметры: \n💰 | Баланс промокода: " + args[3] + " 💵.\n📄 | Использований: " + args[4]})
		 }
		 if(args[2].toLowerCase() == "удалить") {
			if(!promo[args[5]]) return bot({text: "\n⛔ | Такого промокода не существует!"})
			promo[args[5]].status = false
			bot({text: "\nПромокод " + args[5] + " деактивирован!"})
		 }
    },
	desc: "промо <ген|удалить> <баланс> <использований><название промокода>",
	rights: 4,
	type: "admin"
}