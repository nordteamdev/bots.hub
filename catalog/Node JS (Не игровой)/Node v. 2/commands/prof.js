const accs = require("../plugins/autosave.js").accs
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
const limiter = require("../plugins/skills.js").limiter
module.exports = {
	r: /(check) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var text = Number(args[2])
       if(!accs.some(a=> a.id == text)) return msg.send("\n👦 | Пользователь *id" + text + " не найден в базе аккаунтов.")
	   //bot({text: accs.filter(a=> a.id == text).map(a=>"\n\n👦 | Его профиль : \n\n💰 | Баланс » " + a.balance + "\n💎 | Его клан » " + getClan(a.id) + "💵\n🔝 | Привилегия » " + getRights(a.id) + "\n🎰 | Ставок » " + a.bets + "💵\n💡 | Уровень » " + a.level + " lvl [" + a.exp + "🌟 / "+ a.next_level +"🌟] \n 🔫 | Побед в дуэли >> " + a.winDuel +"\n 💀 | Поражений в дуэли >> " + a.loseDuel + "\n💻 | ID аккаунта » " + Math.round(a.uid) + "")})
	   bot({text: accs.filter(a=> a.id == text).map(a=>`\n\n👦 | Его профиль \n\n💰 | Баланс » ${a.balance} ${getClan(a.id) ? "\n💎 | Его клан » " + getClan(a.id) : "\n💎 | Нету клана"} \n🔝 | Привилегия » ${getRights(a.id)}\n💡 | Уровень » ${a.level} [${a.exp} + 🌟 / ${a.next_level} 🌟] \n 🔫 | Побед в дуэли >> ${a.winDuel} \n 💀 | Поражений в дуэли >> ${a.loseDuel} \n💻 | ID аккаунта » ${a.uid} \n💎 | DD: ${a.inventory.diamonds} 💎\n💳 | BTC: ${a.inventory.bitcoins} 💳 \n ${a.inventory.rabs != 0 ? ' + ' + (limiter(args[2]).farm * a.inventory.rabs) + " / 60 сек.\n👲 | Рабов >> "+ a.inventory.rabs : ''} ${a.inventory.barons != 0 ? `\n💂 | Баронов: ${a.inventory.barons}` : ''}`)})
	},
	desc: "проф <<ID пользователя>> -- проверить у него профиль",
	rights: 3,
	type: "all",
	type: "prosto"
}