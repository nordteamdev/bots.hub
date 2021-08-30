const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(spot|спот|рулетка) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > mes.limit) return bot({text: "Превышен лимит ставки. Макс лимит - "+ mes.limit +" 💵"})
		   if(accs[i].spots < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		   var spot1 = getRandomInt(0, 2)
		   var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   const check = spot1 == spot2 == spot3 ? false : true
		   const gone = check == true ? mes.spot.lose : mes.spot.win
		   const att = check == true ? mes.spot.att.lose : mes.spot.att.win
		   check == true ? accs[i].spots -= spot : accs[i].spots += spot
		   const g = gone.replace(/%spot1%/ig, mes.spot.smiles[spot1]).replace(/%spot2%/ig, mes.spot.smiles[spot2]).replace(/%spot3%/ig, mes.spot.smiles[spot3]).replace(/%balance%/ig, num(accs[i].spots.toString())).replace(/%spoting%/ig, num(spot.toString()))
		   bot({text: "\n" + g, att: att})
		},
		desc: "рулетка <СТАВКА> -- рулетка",
		rights: 0,
		type: "all"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}