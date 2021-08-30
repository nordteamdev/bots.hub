const bank = require('../plugins/autosave.js').bank
const accs = require('../plugins/autosave.js').accs
module.exports = {
	r: /(банк|bank)\s?(пополнить|вывести|перевести)?\s?(коины|алмазы|биткоины)?\s?([0-9]+)?\s?([0-9]+)?/i,
	f: function (msg, args, vk, bot){
        var b = bank.filter(a=> a.id == msg.user).map(a=> a.number)
        var main = require('../main.js').main
        const time = require("../plugins/functions.js").time(2)
        var loh_istorik = ['📈', '📉']
        var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        if(accs[i].level < 0) return bot({text: "=)"})
        if(!args[2] || !args[3] || !args[4]){
            var gone1 = `<< 🏤 Банк 🏤 >>

            📇 | Банковский счёт: ${accs[i].uid}
            💵 | Валютный счёт: ${bank[b].balance.balance} коинов
            💎 | Алмазов: ${bank[b].balance.diamonds}
            💳 | Биткоинов: ${bank[b].balance.bitcoins}
            
            📝 | Статистика курса
            ${main.course.dd >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс DD: 1💎 = ${main.course.diamonds} коинов (${main.course.dd >= 0? (main.course.dd == 0 ? '0' : "+" + main.course.dd ) : main.course.dd})
            ${main.course.bit >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс BTC: 1💳 = ${main.course.bitcoins} коинов (${main.course.bit >= 0? (main.course.bit == 0 ? '0' : "+" + main.course.bit ) : main.course.bit})
            🕓 | Время: ${time}`
            bot({text: gone1})
        }else{
            if(args[2].toLowerCase() == 'пополнить'){
               if(!args[4]) return
               var num = Number(args[4])
               if(args[3].toLowerCase() == 'коины'){
                   if(num > accs[i].balance) return bot({text: `❌ | Недостаточно коинов  чтобы пополнить банковский счет`})
                   accs[i].balance -= num
                   bank[b].balance.balance += num
                   bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} коинов.
                   💳 | Счет - ${bank[b].balance.balance} коинов
                   💰 | Твой баланс - ${accs[i].balance} коинов`})
               }
               if(args[3].toLowerCase() == 'алмазы'){
                   if(num > accs[i].inventory.diamonds) return bot({text: `❌ | Недостаточно 💎 чтобы пополнить банковский счет`})
                   accs[i].inventory.diamonds -= num
                   bank[b].balance.diamonds += num
                   bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} 💎
                   💳 | Алмазов (банк) - ${bank[b].balance.diamonds} 💎
                   💰 | Алмазов - ${accs[i].inventory.diamonds} 💎`})
                }
                if(args[3].toLowerCase() == 'биткоины'){
                    if(num > accs[i].inventory.bitcoins) return bot({text: `❌ | Недостаточно 💳 чтобы пополнить банковский счет`})
                    accs[i].inventory.bitcoins -= num
                    bank[b].balance.bitcoins += num
                    bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} 💳
                    💳 | Биткоинов (банк) - ${bank[b].balance.bitcoins} 💳
                    💰 | Биткоинов - ${accs[i].inventory.bitcoins} 💳`})
                 }
            }
            if(args[2].toLowerCase() == 'вывести'){
                if(!args[4]) return
                var num = Number(args[4])
                if(args[3].toLowerCase() == 'коины'){
                    if(num > bank[b].balance.balance) return bot({text: `❌ | Недостаточно коиноы на банковском счету`})
                    accs[i].balance += num
                    bank[b].balance.balance -= num
                    bot({text: `✅ | Ты успешно снял с банковского счета ${num} коинов
                    💳 | Счет - ${bank[b].balance.balance} коинов 
                    💰 | Твой баланс - ${accs[i].balance} коинов`})
                }
                if(args[3].toLowerCase() == 'алмазы'){
                    if(num > bank[b].balance.diamonds) return bot({text: `❌ | Недостаточно 💎 на банковском счету`})
                    accs[i].inventory.diamonds += num
                    bank[b].balance.diamonds -= num
                    bot({text: `✅ | Ты успешно снял с банковского счета ${num} 💎
                    💳 | Алмазов (банк) - ${bank[b].balance.diamonds} 💎
                    💰 | Алмазов - ${accs[i].inventory.diamonds} 💎`})
                 }
                 if(args[3].toLowerCase() == 'биткоины'){
                     if(num > bank[b].balance.bitcoins) return bot({text: `❌ | Недостаточно 💳 на банковском счету`})
                     accs[i].inventory.bitcoins += num
                     bank[b].balance.bitcoins -= num
                     bot({text: `✅ | Ты успешно снял с банковского счета ${num} 💳
                     💳 | Биткоинов (банк) - ${bank[b].balance.bitcoins} 💳
                     💰 | Биткоинов - ${accs[i].inventory.bitcoins} 💳`})
                  }
             }
             if(args[2].toLowerCase() == 'перевести'){
                if(!args[4] || !args[5]) return
                var num = Number(args[4])
                var number_bank = Number(args[5]) - 1
                if(args[3].toLowerCase() == 'коины'){
                    var rights = accs.filter(a=> a.id == bank[b].id).map(a=> a.rights)
                    var comm = (rights == 5 ? 0 : (rights == 4 ? 5 : (rights == 3 ? 9 : (rights == 2 ? 13 : (rights == 1 ? 17 : 20)))))
                    var commision = (num / 100 * comm) + num
                    if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
                    if(commision > bank[b].balance.balance) return bot({text: ` ❌ | Недостаточно коинов чтобы перевести другому человеку`})
                    bank[number_bank].balance.balance += num
                    bank[b].balance.balance -= Math.floor(commision)
                    bot({text: `👦 | Перевел » ${b}
                    👦 | Кому » ${number_bank}
                    💳 | Сумма с учетом комиссии » ${commision} коинов. (${comm}%) 
                    💰 | Счет » ${bank[b].balance.balance} коинов.
                    ✅ | Перевод выполнен успешно`})
                }
                if(args[3].toLowerCase() == 'алмазы'){
                    if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
                    if(num > bank[b].balance.diamonds) return bot({text: ` ❌ | Недостаточно 💎 чтобы перевести другому человеку`})
                    bank[number_bank].balance.diamonds += num
                    bank[b].balance.diamonds -= num
                    bot({text: `👦 | Перевел » ${b + 1}
                    👦 | Кому » ${number_bank}
                    💳 | Сумма перевода » ${num} 💎
                    💰 | Счет » ${bank[b].balance.diamonds} 💎
                    ✅ | Перевод выполнен успешно`})
                }
                if(args[3].toLowerCase() == 'биткоины'){
                    if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
                    if(num > bank[b].balance.bitcoins) return bot({text: ` ❌ | Недостаточно 💎 чтобы перевести другому человеку`})
                    bank[number_bank].balance.bitcoins += num
                    bank[b].balance.bitcoins -= num
                    bot({text: `👦 | Перевел » ${b}
                    👦 | Кому » ${number_bank}
                    💳 | Сумма перевода » ${num} 💳
                    💰 | Счет » ${bank[b].balance.bitcoins} 💳
                    ✅ | Перевод выполнен успешно`})
                }
             }
        }
	},
	desc: "банк",
	rights: 0,
	type: "all",
	typ: "prosto"
}