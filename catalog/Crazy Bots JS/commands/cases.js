const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const gap = require("../plugins/functions.js").gap
const cases = require("../settings/chance_cases.json")
const random = require("../plugins/functions.js").getRandomInt
module.exports = {
	r: /(case|кейс) ([^]+)/i,
	f: function (msg, args, vk, bot){
	   var ogo = args[2].toLowerCase()
	   var cases = [{
		   name: "homer",
		   price: 20000,
		   items: [
			{
				name: "100🌟",
				cmd: "accs[i].exp = 100",
				chance: 2,
				uid: 0
			},
			{
				name: "1000000 💵",
				cmd: "accs[i].spots += 1000000",
				chance: 6,
				uid: 1
			},
			{
				name: "15000 💵",
				cmd: "accs[i].spots += 15000",
				chance: 20,
				uid: 2
			},
			{
				name: "30000 💵",
				cmd: "accs[i].spots += 30000",
				chance: 40,
				uid: 3
			},
			{
				name: "10 🌟",
				cmd: "accs[i].exp += 10",
				chance: 100,
				uid: 4
			}
		   ],
		   uid: 0
	   }]
	   if(!cases.some(a=> a.name == ogo)) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТакого кейса не существует.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   var c = cases.filter(a=> a.name == ogo).map(a=> a.uid)
	   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
	   if(accs[i].spots < cases[c].price) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nНе хватает денег чтобы открыть кейс.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   var rand = random(1, 100)
	   accs[i].spots -= cases[c].price
	   var plz = checking(cases[c].items, rand)
	   eval(plz.cmd)
	   bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n🎉🎉🎉Поздравляю🎉🎉🎉 вам выпало : <<" + plz.name + ">> с шансом " + plz.chance})
	},
	rights: 0,
	desc: "кейс <> 1. на данный момент есть один кейс чтобы его открыть пишите case homer - цена 20000."
}
function checking(items, rand){
    for(var p = 0; p < items.length; p++){
		if(items[p - 1] != undefined){
			if(rand <= items[p].chance && rand > items[p - 1].chance) return items[p]
		}else{
			if(rand <= items[p].chance) return items[p]
		}
	}
}