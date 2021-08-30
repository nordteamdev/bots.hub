const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(рулетка) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > 100000000000000000000000000000000000) return bot({text: "\n⚠ | Превышен лимит ставки | Максимальный лимит - 100000000000000000000000000000000000💵 "})
		   if(spot <= 0) return bot ({text: "\n⚠ | Нельзя ставить  0💵 "})
		   if(accs[i].spots < spot) return bot({text: "Сейчас бы ставить больше своего баланса"})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + "💵 "})
		   var spot1 = getRandomInt(0, 2)
	       var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var random = ["🍏","🍍","🍌"]
		   accs[i].bets += spot
		   if(spot1 && spot2 && spot3){
			  if(accs[i].spots && spot){
				 accs[i].spots += (spot)*2
				 bot({text:   "\nУРА! Ты выиграл " + like(spot, 2) + "💵 | Баланс: " + [accs[i].spots] + "💵 "})
				}else if(accs[i].spots == spot){
					accs[i].spots += (spot)*2
				 bot({text:   "\nУРА! Ты выиграл " + like(spot, 2) + "💵 | Баланс: " + [accs[i].spots] + "💵 "})
			  }
                          }else{
				 if(accs[i].spots == spot){
					accs[i].spots -= (spot) 
					bot({text:     "\nУвы, но ты проиграл " + like(spot, 1)  + "💵 | Баланс: " + [accs[i].spots] + "💵 "})
				}else{
					accs[i].spots -= (spot)
					bot({text: "    \nУвы, но ты проиграл " + like(spot, 1)  + "💵 | Баланс: " + [accs[i].spots] + "💵 "})
				 }
		    }
		},
		desc: "рулетка <СТАВКА> -- обычная игровая рулетка",
	        rights: 0,
		type: "game"
}
function like(text, ym){
	var lik = (text*ym)
	return lik
}