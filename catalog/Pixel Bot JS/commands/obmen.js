const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /обменять (коины|алмазы|биткоины) на (коины|алмазы|биткоины)/i,
	f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        if(accs[i].level < 3) return bot({text: "🌚 | Чтобы воспользоваться курсами нужно имееть хотя бы 3 уровень!"})
       if(args[1].toLowerCase() == args[2].toLowerCase()) return
       if(args[1].toLowerCase() == 'коины'){
           if(args[2].toLowerCase() == 'биткоины'){
                if(main.course.bitcoins > accs[i].balance) return bot({text: " ❌ | Вам не хватает коинов для обмена"})
                var colvo = Number((accs[i].balance / main.course.bitcoins).toString().split('.')[0])
                var balance = main.course.bitcoins * colvo
                accs[i].balance -= balance
                accs[i].inventory.bitcoins += colvo
                bot({text: `✅ | Вы успешно обменяли ${balance} коинов на ${colvo} BT`})
           }else{
                if(main.course.diamonds > accs[i].balance) return bot({text: " ❌ | Вам не хватает коинов для обмена"})
                var colvo = Number((accs[i].balance / main.course.diamonds).toString().split('.')[0])
                var balance = main.course.diamonds * colvo
                accs[i].balance -= balance
                accs[i].inventory.diamonds += colvo
                bot({text: `✅ | Вы успешно обменяли ${balance} коинов на ${colvo} 💎`})
           }
       }else if(args[1].toLowerCase() == 'алмазы' && args[2].toLowerCase() == 'коины'){
           if(accs[i].inventory.diamonds <= 0) return bot({text: " ❌ | Вам не хватает 💎 для обмена"})
           var course = main.course.diamonds
           var balance = course * accs[i].inventory.diamonds
           accs[i].balance += balance
           bot({text: `✅ | Вы успешно обменяли ${accs[i].inventory.diamonds} 💎 на ${balance} коинов`})
           accs[i].inventory.diamonds = 0
       }else if(args[1].toLowerCase() == 'биткоины' && args[2].toLowerCase() == 'коины'){
           if(accs[i].inventory.bitcoins <= 0) return bot({text: " ❌ | Вам не хватает BT для обмена"})
           var course = main.course.bitcoins
           var balance = course * accs[i].inventory.bitcoins
           accs[i].balance += balance
           bot({text: `✅ | Вы успешно обменяли ${accs[i].inventory.bitcoins} BT на ${balance} коинов`})
           accs[i].inventory.bitcoins = 0
       }
	},
	desc: "обменять <коины|алмазы|биткоины> на <коины|алмазы|биткоины> -- обмен курсов",
	rights: 0,
	type: "all",
	typ: "game"
}