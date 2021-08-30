const accs = require("../plugins/autosave.js").accs
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(spot|спот|рулетка) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot < 10) return bot ({text: "Слишком маленькая ставка"})
		   if(accs[i].balance < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].balance <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " 🎁."})
		   var spot1 = getRandomInt(0, 2)
		   var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var spot4 = getRandomInt(0, 2)
		   const check = spot1 && spot2 && spot3 && spot4 ? true : false
		   const gone = check == true ? mes.spot.win : mes.spot.lose
		   check == true ? accs[i].balance += spot : accs[i].balance -= spot
		   accs[i].bets += spot
		   const g = gone.replace(/%spot1%/ig, mes.spot.smiles[spot1]).replace(/%spot2%/ig, mes.spot.smiles[spot2]).replace(/%spot3%/ig, mes.spot.smiles[spot3]).replace(/%spot4%/ig, mes.spot.smiles[spot4]).replace(/%balance%/ig, num(accs[i].balance.toString())).replace(/%spoting%/ig, num(spot.toString()))
		   bot({text: "\n" + g, status: false})
		},
		desc: "рулетка <СТАВКА> -- рулетка",
		rights: 0,
		type: "all",
		typ: "game"
}