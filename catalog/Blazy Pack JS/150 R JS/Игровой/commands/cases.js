const accs = require("../plugins/autosave.js").accs
const cases = require("../settings/chance_cases.json")
module.exports = {
	r: /(case|кейс) ([^]+)$/i,
	f: function (msg, args, vk, bot){
	   var ogo = args[2].toLowerCase()
	   if(!cases.some(a=> a.name == ogo)) return bot({text: "⚠ | Такого кейса не существует."})
	   var c = cases.filter(a=> a.name == ogo).map(a=> a.uid)
	   var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
	   if(accs[i].balance < cases[c].price.price || accs[i].inventory.diamonds < cases[c].price.diamonds || accs[i].inventory.bitcoins < cases[c].price.bitcoins) return bot({text: "❌ | Не хватает денег чтобы открыть кейс."})
	   if(cases[c].price.rub > 0) return bot({text: "⚠ | Этот кейс временно недоступен."})
	   accs[i].balance -= cases[c].price.price
	   accs[i].inventory.diamonds -= cases[c].price.diamonds
	   accs[i].inventory.bitcoins -= cases[c].price.bitcoins
	   var plz = checking(cases[c].items)
	   bot({text: `🎁 | Открываем кейс...\n👍 | Вам выпало: ${plz.name}`})
	},
	rights: 0,
	desc: "кейс <НАЗВАНИЕ КЕЙСА> -- открыть кейс",
	type: "all",
	typ: "game"
}
function checking(items){
	var rand = Math.random() * 100
		for(var a = 0; a < items.length; a++){
			if(items[a - 1]){ 
				if(rand <= items[a].chance && rand > items[a - 1].chance) return items[a]
			}else{
				if(rand <= items[a].chance) return items[a]
			}
		}
}