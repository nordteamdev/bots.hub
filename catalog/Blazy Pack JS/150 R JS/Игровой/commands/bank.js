	const bank = require('../plugins/autosave.js').bank
	const accs = require('../plugins/autosave.js').accs
	module.exports = {
		r: /(банк|bank)\s?(пополнить|вывести|перевести)?\s?(поинты|доллары|mcoins)?\s?([0-9]+)?\s?([0-9]+)?$/i,
		f: function (msg, args, vk, bot){
			var b = bank.filter(a=> a.id == msg.user).map(a=> a.number)
			var main = require('../main.js').main
			const time = require("../plugins/functions.js").time(2)
			var loh_istorik = ['📈', '📉']
			var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
			if(!args[2] || !args[3] || !args[4]){
				var gone1 = `📇 | Банковский счёт: ${Number(b) + 1}
	📇 | Валютный счёт: ${bank[b].balance.balance} поинтов 
	💳 | Долларов: ${bank[b].balance.diamonds} 
	💷 | MCoins: ${bank[b].balance.bitcoins} 

	📝  | Статистика курса: 

	${main.course.bit >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс Долларов: 
	1💵 = ${main.course.diamonds} поинтов (${main.course.dd >= 0? (main.course.dd == 0 ? '0' : "+" + main.course.dd ) : main.course.dd})
	${main.course.bit >= 0? loh_istorik[0] : loh_istorik[1]} | Текущий курс MCoins: 
	1💷 = ${main.course.bitcoins} поинтов (${main.course.bit >= 0? (main.course.bit == 0 ? '0' : "+" + main.course.bit ) : main.course.bit})

	🕓 | Время: ${time}`
				bot({text: gone1})
			}else{
				if(args[2].toLowerCase() == 'пополнить'){
				   if(!args[4]) return
				   var num = Number(args[4])
				   if(args[3].toLowerCase() == 'поинты'){
					   if(num > accs[i].balance) return bot({text: `❌ | Недостаточно поинтов чтобы пополнить банковский счет`})
					   accs[i].balance -= num
					   bank[b].balance.balance += num
					   bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} поинтов.
					   💷 | Счет - ${bank[b].balance.balance} поинтов
					   💰 | Твой баланс - ${accs[i].balance} поинтов`})
				   }
				   if(args[3].toLowerCase() == 'доллары'){
					   if(num > accs[i].inventory.diamonds) return bot({text: `❌ | Недостаточно 💵 чтобы пополнить банковский счет`})
					   accs[i].inventory.diamonds -= num
					   bank[b].balance.diamonds += num
					   bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} 💵
					   💷 | Долларов (банк) - ${bank[b].balance.diamonds} 💵
					   💰 | Долларов - ${accs[i].inventory.diamonds} 💵`})
					}
					if(args[3].toLowerCase() == 'mcoins'){
						if(num > accs[i].inventory.bitcoins) return bot({text: `❌ | Недостаточно 💷 чтобы пополнить банковский счет`})
						accs[i].inventory.bitcoins -= num
						bank[b].balance.bitcoins += num
						bot({text: `✅ | Ты успешно пополнил банковский счет на ${num} 💷
						💷 | MCoins (банк) - ${bank[b].balance.bitcoins} 💷
						💰 | MCoins - ${accs[i].inventory.bitcoins} 💷`})
					 }
				}
				if(args[2].toLowerCase() == 'вывести'){
					if(!args[4]) return
					var num = Number(args[4])
					if(args[3].toLowerCase() == 'поинты'){
						if(num > bank[b].balance.balance) return bot({text: `❌ | Недостаточно поинтов на банковском счету`})
						accs[i].balance += num
						bank[b].balance.balance -= num
						bot({text: `✅ | Ты успешно снял с банковского счета ${num} поинтов
						💷 | Счет - ${bank[b].balance.balance} поинтов 
						💰 | Твой баланс - ${accs[i].balance} поинтов`})
					}
					if(args[3].toLowerCase() == 'доллары'){
						if(num > bank[b].balance.diamonds) return bot({text: `❌ | Недостаточно 💵 на банковском счету`})
						accs[i].inventory.diamonds += num
						bank[b].balance.diamonds -= num
						bot({text: `✅ | Ты успешно снял с банковского счета ${num} 💵
						💷 | Долларов (банк) - ${bank[b].balance.diamonds} 💵
						💰 | Долларов - ${accs[i].inventory.diamonds} 💵`})
					 }
					 if(args[3].toLowerCase() == 'mcoins'){
						 if(num > bank[b].balance.bitcoins) return bot({text: `❌ | Недостаточно 💷 на банковском счету`})
						 accs[i].inventory.bitcoins += num
						 bank[b].balance.bitcoins -= num
						 bot({text: `✅ | Ты успешно снял с банковского счета ${num} 💷
						 💷 | MCoins (банк) - ${bank[b].balance.bitcoins} 💷
						 💰 | MCoins - ${accs[i].inventory.bitcoins} 💷`})
					  }
				 }
				 if(args[2].toLowerCase() == 'перевести'){
					if(!args[4] || !args[5]) return
					var num = Number(args[4])
					var number_bank = Number(args[5]) - 1
					if(args[3].toLowerCase() == 'поинты'){
						var rights = accs.filter(a=> a.id == bank[b].id).map(a=> a.rights)
						var comm = (rights == 5 ? 0 : (rights == 4 ? 5 : (rights == 3 ? 9 : (rights == 2 ? 13 : (rights == 1 ? 17 : 20)))))
						var commision = (num / 100 * comm) + num
						if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
						if(commision > bank[b].balance.balance) return bot({text: `￼❌ | Недостаточно поинтов чтобы перевести другому человеку`})
						bank[number_bank].balance.balance += num
						bank[b].balance.balance -= Math.floor(commision)
						bot({text: `👦 | Перевел » ${b}
						👦 | Кому » ${number_bank}
						💷 | Сумма с учетом комиссии » ${commision} поинтов. (${comm}%) 
						💰 | Счет » ${bank[b].balance.balance} поинтов.
						✅ | Перевод выполнен успешно`})
					}
					if(args[3].toLowerCase() == 'доллары'){
						if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
						if(num > bank[b].balance.diamonds) return bot({text: `￼❌ | Недостаточно 💷 чтобы перевести другому человеку`})
						bank[number_bank].balance.diamonds += num
						bank[b].balance.diamonds -= num
						bot({text: `👦 | Перевел » ${b + 1}
						👦 | Кому » ${number_bank}
						💷 | Сумма перевода » ${num} 💵
						💰 | Счет » ${bank[b].balance.diamonds} 💵
						✅ | Перевод выполнен успешно`})
					}
					if(args[3].toLowerCase() == 'mcoins'){
						if(!bank.some(a=> a.number == number_bank)) return bot({text: `❌ | Такого банковского счета не существует!`})
						if(num > bank[b].balance.bitcoins) return bot({text: `￼❌ | Недостаточно 💷 чтобы перевести другому человеку`})
						bank[number_bank].balance.bitcoins += num
						bank[b].balance.bitcoins -= num
						bot({text: `👦 | Перевел » ${b}
						👦 | Кому » ${number_bank}
						💷 | Сумма перевода » ${num} 💷
						💰 | Счет » ${bank[b].balance.bitcoins} 💷
						✅ | Перевод выполнен успешно`})
					}
				 }
			}
		},
		desc: "банк <пополнить|вывести|перевести> <поинты|доллары|mcoins> <КОЛ-ВО ВАЛЮТЫ> <БАНКОВСКИЙ СЧЕТ>?",
		rights: 0,
		type: "all",
		typ: "prosto"
	}