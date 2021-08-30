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
		   price: 3000,
		   items: [
			{
				name: "100 🌟",
				cmd: "accs[i].exp += 100",
				chance: 1,
				uid: 0
			},
			{
				name: "4000 💵",
				cmd: "accs[i].spots += 4000",
				chance: 4,
				uid: 1
			},
			{
				name: "5000 💵",
				cmd: "accs[i].spots += 5000",
				chance: 7,
				uid: 2
			},
			{
				name: "2500 💵",
				cmd: "accs[i].spots += 2000",
				chance: 8,
				uid: 3
			},
			{
				name: "10 🌟",
				cmd: "accs[i].exp += 10",
				chance: 10,
				uid: 4
			},
			{
				name: "Вип",
				cmd: "accs[i].rights += 1",
				chance: 2,
				uid: 5
			},
			{
				name: "10000 💵",
				cmd: "accs[i].spots += 10000",
				chance: 6,
				uid: 6
			},
			{
				name: "25 🌟",
				cmd: "accs[i].exp += 25",
				chance: 9,
				uid: 7
			},
			{
				name: "1000000 💵",
				cmd: "accs[i].spots += 1000000",
				chance: 3,
				uid: 8
			}],
		   uid: 0
	   }]
	   if(!cases.some(a=> a.name == ogo)) return bot({text: "\nНет такого кейса"})
	   var c = cases.filter(a=> a.name == ogo).map(a=> a.uid)
	   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
	   if(accs[i].spots < cases[c].price) return bot({text: "\nСначало подкопи денег"})
	   var rand = random(1, 10)
	   accs[i].spots -= cases[c].price
	   var plz = checking(cases[c].items, rand)
	   eval(plz.cmd)
	   bot({text: "\n🎁 | Открываем кейс \n📦 | Вам выпало : " + plz.name + ""})
	},
	rights: 0,
	desc: "кейс <> \n1. 💎 | case homer - 3000 💵",
	type: "game"
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