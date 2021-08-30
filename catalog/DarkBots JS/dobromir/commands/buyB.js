const accs = require("../data/accs.json")
module.exports = {
	    r: /(биткуп) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var main = require("../main.js").home
		   if(accs[i].spots < main.course.bitcoins*Number(args[2])) return bot({text: "у тебя нету столько баланса.\nТебе нужно: " + main.course.bitcoins*Number(args[2])})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		   if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
		if(accs[i].spots){
				 accs[i].spots -= main.course.bitcoins*Number(args[2])
				 accs[i].inventory.bitcoins += Number(args[2])
				 bot({text:"\n😉 теперь у тебя : " + accs[i].inventory.bitcoins + " 💳 " + " биткоинов\n💰 Твой баланс: " + accs[i].spots  + " 💵 "})
			  }
		},
		desc: "биткуп кол-во -- купить биткоин",
	    rights: 0,
		type: "game"
}