const accs = require('../plugins/autosave.js').accs
module.exports = {
	r: /(setnick|ник) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].level < 3) return bot({text: "🌚 | Чтобы установить ник нужно иметь хотя бы 3 уровень!"})
       if(accs[i].balance < 10000) return bot({text: "❌ | Чтобы установить ник нужно иметь на балансе минимум 10000 поинтов."})
       if(args[2].length >= 20) return bot({text: "❌ | Превышен максимальный лимит символов ника."})
       accs[i].balance -= 10000
       accs[i].nickname = args[2]
       bot({text: `✔ | Ник <<${args[2]}>> успешно установлен!`})
	},
	rights: 0,
	desc: "ник <НИК> -- установить себе ник | Стоимость: 10000 поинтов",
	type: "all",
	typ: "prosto"
}