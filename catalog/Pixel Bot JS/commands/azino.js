const accs = require("../plugins/autosave.js").accs
const random = require("../plugins/functions.js").getRandomInt
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(казино) ([0-9]+)$/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > 10000000000000000000000000000000000000000000000000000000000000000000000000000000000) return bot({text: "Превышен лимит ставки. Макс лимит - 10000000000000000000000000000000000000000000000000000000000000000000000000000000000 мани."})
		   if(accs[i].balance < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].balance <= 0) return bot({text: "Извини, но у тебя " + accs[i].balance + " ботсов."})
		   var spot1 = getRandomInt(0, 2)
	           var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var random = ["🔨", "🔧", "🔪"]
                   var lop = getRandomInt(0, 3)
		   var lop1 = getRandomInt(0, 3)
                   var win = rand(["photo500580851_456239191"])
		   var lose = rand(["photo500580851_456239192"])
		   accs[i].bets += spot
		   if(spot1 && spot2 && spot3){
			  if(accs[i].balance && spot && lop && lop1){
				 accs[i].balance += (spot)*2
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 УРА! Ты выиграл: " + like(spot, 2) + " 💵\n💰 Твой баланс: " + num(accs[i].balance.toString())  + " 💵 ", att: win})
			  }else if(accs[i].balance == spot){
				 accs[i].balance += (spot)*2
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 УРА! Ты выиграл: " + like(spot, 2)  + " 💵\n💰 Твой баланс: " + num(accs[i].balance.toString())  + " 💵 ", att: win})
			  }else{
                                 accs[i].balance += (spot)*4
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 Ты выиграл джекпот: твоя ставка увеличивается в четыре раза! \n💰 Твой баланс: " + num(accs[i].balance.toString())  + " 💵 ", att: win})
			  }
                          }else{
				 if(accs[i].balance == spot){
					accs[i].balance -= (spot) 
					bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] + "\n😢 Ты проиграл: " + like(spot, 1) + " 💵\n💰 Твой баланс: " + num(accs[i].balance.toString())  + " 💵 ", att: lose})
				 }else{
					accs[i].balance -= (spot) 
					bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] + "\n😢 Ты проиграл: " + like(spot, 1) + " 💵\n💰 Твой баланс: " + num(accs[i].balance.toString())  + " 💵 ", att: lose}) 
				 }
		    }
		},
		desc: "азино <СТАВКА> -- рулетка,  испытай удачу и выбей 3 инструмента",
	        rights: 0,
		type: "game"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}