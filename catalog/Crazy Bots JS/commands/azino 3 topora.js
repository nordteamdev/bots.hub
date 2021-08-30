const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /(tritopora|insrulet|tricazino) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
		   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		   var spot = Number(args[2])
		   if(spot > 100000000000000000000000000000000000) return bot({text: "Превышен лимит ставки. Макс лимит - 100000000000000000000000000000000000 мани."})
		   if(accs[i].spots < spot) return bot({text: "Ты ставишь больше, чем свой баланс."})
		   if(accs[i].spots <= 0) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		   var spot1 = getRandomInt(0, 2)
	           var spot2 = getRandomInt(0, 2)
		   var spot3 = getRandomInt(0, 2)
		   var random = ["🔨", "🔧", "🔪"]
                   var lop = getRandomInt(0, 3)
		   var lop1 = getRandomInt(0, 3)
                   var win = rand(["audio183533453_456239429", "audio183533453_456239430", "audio183533453_456239427", "audio183533453_456239420", "audio183533453_456239400", "audio183533453_456239385", "audio183533453_456239368", "audio183533453_456239369", "audio183533453_456239343", "audio183533453_456239315", "audio183533453_456239306", "audio183533453_456239291", "audio183533453_456239215", "audio183533453_456239212", "audio183533453_456239179", "audio183533453_456238847", "audio183533453_456239350","audio183533453_456239423","audio183533453_456239418","audio183533453_456239421","audio183533453_456239420", "audio183533453_456239314", "audio183533453_456239315", "audio183533453_456239380", "audio183533453_456239343", "audio183533453_456239344", "audio-150252159_456239018", "doc284682278_437553957", "doc284682278_437719315", "doc284682278_447870285", "audio183533453_456239407",  "audio183533453_456239408", "audio328452681_404400069"])
		   var lose = rand(["audio183533453_456239428", "audio183533453_456239421", "audio183533453_456239408", "audio183533453_456239406", "audio183533453_456239415", "audio183533453_456239373", "audio183533453_456239357", "audio183533453_456239356", "audio183533453_456239350", "audio183533453_456239294", "audio183533453_456239279", "photo-137139998_456239494", "photo-137139998_456239495", "audio183533453_456239406", "audio183533453_456239294","audio183533453_456239419","audio183533453_456239422", "audio183533453_456239412", "audio183533453_456239415", "audio183533453_456239413", "audio183533453_456239414", "audio183533453_456239367" , "photo-137139998_456239494", "photo-137139998_456239495"])
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
		desc: "tritopora <СТАВКА> -- рулетка,  испытай удачу и выбей 3 инструмента",
	        rights: 0,
		type: "all"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}