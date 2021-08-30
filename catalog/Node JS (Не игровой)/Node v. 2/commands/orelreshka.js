const accs = require("../plugins/autosave.js").accs
const random = require("../plugins/functions.js").getRandomInt
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(орел|решка|орёл) ([0-9]+)$/i,
	    f: function (msg, args, vk, bot){
		    var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
            var spot = Number(args[2])
            if(spot == 0) return
		    if(spot > mes.limit) return bot({text: "Превышен лимит ставки. Максимальный лимит - "+ mes.limit +" ботсов."})
		    if(accs[i].balance < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		    if(accs[i].balance <= 0) return bot({text: "Извини, но у тебя " + accs[i].balance + " ботсов."})
            var l = args[1].toLowerCase()
            var r = rand(['орел', 'решка'])
            r == l ? accs[i].balance += spot : accs[i].balance -= spot
            var gone = r == l ? `🏆 Итог: ${r}
🎯 Ты выиграл ${spot} ботсов

🍭 Баланс: ${accs[i].balance} ботсов` : `🔪 Итог: ${r}
💀 Ты проиграл ${spot} ботсов 

🍭 Баланс: ${accs[i].balance} ботсов`
            bot({text: gone})
		},
		desc: "орел/решка <СТАВКА> -- ОРЕЛ/РЕШКА",
		rights: 0,
		type: "all",
		typ: 'game'
}