const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
module.exports = {
	    r: /(kosti|кости) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
           var spot = Number(args[2])
           if(spot == 0) return
		   if(spot > mes.limit) return bot({text: "Превышен лимит ставки. Макс лимит - "+ mes.limit +" 💵"})
		   if(accs[i].spots < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
           var my = getRandomInt(1, 6)
           var boting = getRandomInt(1, 6)
           const check = my > boting ? false : true
           const ogo = my == boting ? false : true
           const killme = ogo == true ? (check == true ? mes.kosti.lose : mes.kosti.win) : mes.kosti.ogo
           ogo == true ? (check == true ? accs[i].spots -= spot : accs[i].spots += spot) : null
           var gone = killme.replace(/%bot%/ig, num(boting.toString())).replace(/%my%/ig, num(my.toString())).replace(/%balance%/ig, num(accs[i].spots.toString())).replace(/%spoting%/ig, num(spot.toString()))
		   bot({text: "\n" + gone})
		},
		desc: "кости <СТАВКА> -- игра <<Кости>>",
		rights: 0,
		type: "all"
}