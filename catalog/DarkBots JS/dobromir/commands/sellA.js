const accs = require("../data/accs.json")
module.exports = {
	    r: /(алмселл) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var main = require("../main.js").home
		   if(accs[i].inventory.diamonds < Number(args[2])) return bot({text: "у тебя нету столько алмазав."})
		   if(accs[i].inventory.diamonds <= 0) return bot({text: "Извини, но у тебя " + accs[i].inventory.diamonds + " алмазав."})
		   if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
		if(accs[i].spots){
				 accs[i].spots += main.course.diamonds*Number(args[2])
				 accs[i].inventory.diamonds -= Number(args[2])
				 bot({text:"\n😉 теперь у тебя : " + accs[i].inventory.diamonds + " 💎 " + " алмазов\n💰 Твой баланс: " + accs[i].spots  + " 💵 "})
			  }
		},
		desc: "алмселл кол-во -- продать алмазы",
	    rights: 0,
		type: "game"
}