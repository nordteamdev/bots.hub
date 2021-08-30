const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(newyear|happyrulet|ngrulet) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > 100000000000000000000000000000000000) return bot({text: "Превышен лимит ставки. Макс лимит - 100000000000000000000000000000000000 мани."})
		   if(accs[i].spots < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		   var spot1 = getRandomInt(0, 2)
	       var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var random = ["❄", "⛄", "🎅"]
           var lop = getRandomInt(0, 3)
		   var lop1 = getRandomInt(0, 3)
           var win = rand(["photo442449834_456283111","audio442449834_456239026","audio442449834_456239023"])
		   var lose = rand(["photo442449834_456283112","audio442449834_456239025","audio442449834_456239022"])
		   accs[i].bets += spot
		   if(spot1 && spot2 && spot3){
			  if(accs[i].spots && spot && lop && lop1){
				 accs[i].spots += (spot)*2
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 УРА! Ты выиграл: " + like(spot, 2) + " 💵\n💰 Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }else if(accs[i].spots == spot){
				 accs[i].spots += (spot)*2
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 УРА! Ты выиграл: " + like(spot, 2)  + " 💵\n💰 Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }else{
                 accs[i].spots += (spot)*4
				 bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] +  "\n😉 УРА! Поздравляю ✨! Ты выиграл ✨ ДЖЕКПОТ ✨! Твоя ставка увеличивается в четыре раза!!! \n💰 Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }
                          }else{
				 if(accs[i].spots == spot){
					accs[i].spots -= (spot) 
					bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] + "\n😢 Ты проиграл: " + like(spot, 1) + " 💵\n💰 Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: lose})
				 }else{
					accs[i].spots -= (spot) 
					bot({text: random[spot1] + " | " + random[spot2] + " | " + random[spot3] + "\n😢 Ты проиграл: " + like(spot, 1) + " 💵\n💰 Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: lose}) 
				 }
		    }
		},
		desc: "happyrulet <СТАВКА> -- новогодняя рулетка",
	        rights: 0,
		type: "all"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}