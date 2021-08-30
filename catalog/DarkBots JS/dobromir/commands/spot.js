const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(спот) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > 100000000000000000000000000000000000) return bot({text: "\n⚠ | Превышен лимит ставки \n💰 | Максимальный лимит - 100000000000000000000000000000000000 💵 "})
		   if(spot <= 0) return bot ({text: "\n⚠ | Нельзя ставить  0 💵 "})
		   if(accs[i].spots < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		   var spot1 = getRandomInt(0, 2)
	       var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var random = ["🍏","🍍","🍌"]
           var lop = getRandomInt(0, 3)
		   var lop1 = getRandomInt(0, 3)
		   var win = rand(["audio183533453_456239453","audio183533453_456239449","audio183533453_456239448","audio183533453_456239434","audio183533453_456239431","audio183533453_456239422","audio183533453_456239419","audio183533453_456239411","audio183533453_456239409","audio183533453_456239428","audio183533453_456239405","audio183533453_456239400","audio183533453_456239397","audio183533453_456239385","audio183533453_456239367","audio183533453_456239344","audio183533453_456239315","audio183533453_456239312","audio183533453_456239291"])
		   var lose = rand(["audio183533453_456239446","audio183533453_456239441","audio183533453_456239440","audio183533453_456239425","audio183533453_456239423","audio183533453_456239420","audio183533453_456239418","audio183533453_456239413","audio183533453_456239410","audio183533453_456239408","audio183533453_456239406","audio183533453_456239415","audio183533453_456239396","audio183533453_456239394","audio183533453_456239384","audio183533453_456239428","audio183533453_456239350","audio183533453_456239286"])
		   accs[i].bets += spot
		   if(spot1 && spot2 && spot3){
			  if(accs[i].spots && spot && lop && lop1){
				 accs[i].spots += (spot)*2
				 bot({text:  "\n" + random[spot1] +" х "+ random[spot2] +" х "+ random[spot3] +  "\n😉 | УРА! Ты выиграл: " + like(spot, 1) + " 💵\n💰 | Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }else if(accs[i].spots == spot){
				 accs[i].spots += (spot)*2
				 bot({text:  "\n" + random[spot1] +" х "+ random[spot2] +" х "+ random[spot3] +  "\n😉 | УРА! Ты выиграл: " + like(spot, 1)  + " 💵\n💰 | Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }else{
                 accs[i].spots += (spot)*4
				 bot({text:  "\n" + random[spot1] +" х "+ random[spot2] +" х "+ random[spot3] +  "\n😉 | УРА! Поздравляю ✨! Ты выиграл ✨ ДЖЕКПОТ ✨! Твоя ставка увеличивается в четыре раза!!!\n💰 | Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: win})
			  }
                          }else{
				 if(accs[i].spots == spot){
					accs[i].spots -= (spot) 
					bot({text:   "\n" + random[spot1] +" х "+ random[spot2] +" х "+ random[spot3] + "\n😢 | Ты проиграл: " + like(spot, 1) + " 💵\n💰 | Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: lose})
				 }else{
					accs[i].spots -= (spot) 
					bot({text:    "\n" + random[spot1] +" х "+ random[spot2] +" х "+ random[spot3] + "\n😢 | Ты проиграл: " + like(spot, 1) + " 💵\n💰 | Твой баланс: " + num(accs[i].spots.toString())  + " 💵 ", att: lose}) 
				 }
		    }
		},
		desc: "спот <СТАВКА> -- фруктовый автомат",
	        rights: 0,
		type: "game"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}