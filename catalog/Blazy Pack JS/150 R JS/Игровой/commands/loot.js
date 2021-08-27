const cases = require("../settings/chance_cases.json")
module.exports = {
	r: /(loot|drop|дроп|лут) ([^]+)$/i,
	f: function (msg, args, vk, bot){
       var case1 = args[2].toLowerCase()
       if(!cases.some(a=> a.name == case1)) return bot({text: "⚠ Такого кейса не существует!"})
       var c = cases.filter(a=> a.name == case1).map(a=> a.uid)
       var gone = `Доступный дроп кейса <<${case1}>> \n\n${cases[c].items.map(a=> "🎁 | " + a.name).join("\n")}`
       bot({text: gone})
	},
	rights: 0,
	desc: "дроп <<НАЗВАНИЕ КЕЙСА>> -- узнать дроп кейса",
	type: "all",
	typ: "game"
}