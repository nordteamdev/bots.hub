const accs = require("../plugins/autosave.js").accs
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
module.exports = {
	    r: /(kosti|кости) ([0-9]+)$/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
           var spot = Number(args[2])
           if(spot == 0) return
		   if(spot > mes.limit) return bot({text: "⚠ Превышен лимит ставки."})
		   if(accs[i].balance < spot) return bot({text: "⚠ Ты ставишь больше, чем свой баланс."})
		   if(accs[i].balance <= 0) return bot({text: "⚠ У тебя " + accs[i].balance + " поинтов."})
           var my = getRandomInt(1, 6)
           var boting = getRandomInt(1, 6)
           const check = my > boting ? false : true
           const ogo = my == boting ? false : true
           const killme = ogo == true ? (check == true ? mes.kosti.lose : mes.kosti.win) : mes.kosti.ogo
           ogo == true ? (check == true ? accs[i].balance -= spot : accs[i].balance += spot) : null
           var gone = killme.replace(/%bot%/ig, num(boting.toString())).replace(/%my%/ig, num(my.toString())).replace(/%balance%/ig, num(accs[i].balance.toString())).replace(/%spoting%/ig, num(spot.toString()))
		   bot({text: gone})
		},
		desc: "кости <СТАВКА> -- игра <<Кости>>",
		rights: 0,
		type: "all",
		typ: 'game'
}