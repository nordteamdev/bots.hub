const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /(Передать)\s(коины|алмазы|биткоины)\s([0-9]+)\s([^]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
                if(args[2].toLowerCase() == 'pay'){
                if(!args[4] || !args[5]) return
                var num = Number(args[4])
                var i = Number(args[5]) - 1
                if(args[3].toLowerCase() == 'коины'){
                    var rights = accs.filter(a=> a.id == accs[i].uid).map(a=> a.rights)
                    var comm = (rights == 5 ? 0 : (rights == 4 ? 5 : (rights == 3 ? 9 : (rights == 2 ? 13 : (rights == 1 ? 17 : 20)))))
                    var commision = (num / 100 * comm) + num
                    if(!accs.some(a=> a.number == i)) return bot({text: `❌ | Такого профиля не существует!`})
                    if(commision > bank[b].balance.balance) return bot({text: ` ❌ | Недостаточно коинов чтобы перевести другому человеку`})
                    accs[i].balance += num
                    accs[i].balance -= Math.floor(commision)
                    bot({text: `👦 | Перевел » ${accs.uid}
                    👦 | Кому » ${accs.uid}
                    💳 | Сумма с учетом комиссии » ${commision} коинов. (${comm}%) 
                    💰 | Счет » ${accs[i].balance} коинов.
                    ✅ | Перевод выполнен успешно`})
                }
                if(args[3].toLowerCase() == 'алмазы'){
                    if(!accs.some(a=> a.number == accs[i].uid)) return bot({text: `❌ | Такого профиля не существует!`})
                    if(num > accs[i].inventory.diamonds) return bot({text: ` ❌ | Недостаточно 💎 чтобы перевести другому человеку`})
                    accs[i].inventory.diamonds += num
                    accs[i].inventory.diamonds -= num
                    bot({text: `👦 | Перевел » ${accs.uid}
                    👦 | Кому » ${accs[i].balance}
                    💳 | Сумма перевода » ${num} 💎
                    💰 | Счет » ${accs[i].inventory.diamonds} 💎
                    ✅ | Перевод выполнен успешно`})
                }
                if(args[3].toLowerCase() == 'биткоины'){
                    if(!accs.some(a=> a.number == accs[i].uid)) return bot({text: `❌ | Такого профиля не существует!`})
                    if(num > accs[i].inventory.bitcoins) return bot({text: ` ❌ | Недостаточно 💎 чтобы перевести другому человеку`})
                    accs[i].inventory.bitcoins += num
                    accs[i].inventory.bitcoins -= num
                    bot({text: `👦 | Перевел » ${accs.uid}
                    👦 | Кому » ${accs.uid}
                    💳 | Сумма перевода » ${num} 💳
                    💰 | Счет » ${accs[i].inventory.bitcoins} 💳
                    ✅ | Перевод выполнен успешно`})
                }
    }
	rights: 0, 
	desc "pay", 
	type "all", 
	type "game" 
}