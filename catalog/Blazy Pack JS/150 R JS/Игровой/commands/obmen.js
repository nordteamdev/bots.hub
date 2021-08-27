const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /обменять (поинты|доллары|мкоины) на (поинты|доллары|мкоины)$/i,
	f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(args[1].toLowerCase() == args[2].toLowerCase()) return
       if(args[1].toLowerCase() == 'поинты'){
           if(args[2].toLowerCase() == 'мкоины'){
                if(main.course.bitcoins > accs[i].balance) return bot({text: "￼❌ | Вам не хватает поинтов для обмена"})
                var colvo = Number((accs[i].balance / main.course.bitcoins).toString().split('.')[0])
                var balance = main.course.bitcoins * colvo
                accs[i].balance -= balance
                accs[i].inventory.bitcoins += colvo
                bot({text: `✅ | Вы успешно обменяли ${balance} поинтов на ${colvo} Mcoins`})
           }else{
                if(main.course.diamonds > accs[i].balance) return bot({text: "￼❌ | Вам не хватает поинтов для обмена"})
                var colvo = Number((accs[i].balance / main.course.diamonds).toString().split('.')[0])
                var balance = main.course.diamonds * colvo
                accs[i].balance -= balance
                accs[i].inventory.diamonds += colvo
                bot({text: `✅ | Вы успешно обменяли ${balance} поинтов на ${colvo} долларов`})
           }
       }else if(args[1].toLowerCase() == 'доллары' && args[2].toLowerCase() == 'поинты'){
           if(accs[i].inventory.diamonds <= 0) return bot({text: "￼❌ | Вам не хватает долларов для обмена"})
           var course = main.course.diamonds
           var balance = course * accs[i].inventory.diamonds
           accs[i].balance += balance
           bot({text: `✅ | Вы успешно обменяли ${accs[i].inventory.diamonds} доллары на ${balance} поинтов`})
           accs[i].inventory.diamonds = 0
       }else if(args[1].toLowerCase() == 'мкоины' && args[2].toLowerCase() == 'поинты'){
           if(accs[i].inventory.bitcoins <= 0) return bot({text: "￼❌ | Вам не хватает MCoins для обмена"})
           var course = main.course.bitcoins
           var balance = course * accs[i].inventory.bitcoins
           accs[i].balance += balance
           bot({text: `✅ | Вы успешно обменяли ${accs[i].inventory.bitcoins} MCoins на ${balance} поинтов`})
           accs[i].inventory.bitcoins = 0
       }
	},
	desc: "обменять <поинты|доллары|мкоины> на <поинты|доллары|мкоины> -- обмен курсов",
	rights: 0,
	type: "all",
	typ: "game"
}