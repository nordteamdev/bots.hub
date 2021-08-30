const accs = require("../plugins/autosave.js").accs
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
const limiter = require("../plugins/skills.js").limiter
module.exports = {
	r: /(get|проф) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var text = Number(args[2])
       if(!accs.some(accs=> accs.uid == text)) return msg.send("\n👦 | Пользователь *id" + text + " не найден в базе аккаунтов.")
	   //bot({text: accs.filter(accs=> accs.uid == text).map(a=>"\n\n👦 | Его профиль : \n⚡ | Ник » ${a.nickname} \n📝 | Префикс » ${a.prefix} \n💰 | Баланс » " + a.balance + "\n💎 | Его клан » " + getClan(a.id) + "💵\n🔝 | Привилегия » " + getRights(a.id) + "\n🎰 | Ставок » " + a.bets + "💵\n💡 | Уровень » " + a.level + " lvl [" + a.exp + "🌟 / "+ a.next_level +"🌟] \n 🔫 | Побед в дуэли >> " + a.winDuel +"\n 💀 | Поражений в дуэли >> " + a.loseDuel + "\n💻 | ID аккаунта » " + Math.round(a.uid) + "")})
	   bot({text: accs.filter(accs=> accs.uid == text).map(a=>`📋 Информация об игроке [${a.nickname}] 📋 \n\n🔎 ID: ${a.uid} \n🔹 VK: [id${a.id}|${a.nickname}] \n💰 Баланс: ${a.balance} \n💎 Алмазы: ${a.inventory.diamonds} \n💳 Биткоины: ${a.inventory.bitcoins} \n⛔ » Статус: ${getRights(a.id)} \n⏰ Зарегистрирован: ${a.register} \n✉ Сообщений в боте: ▪${a.cmds}▪ \n ${a.inventory.rabs != 0 ? ' + ' + (limiter(args[2]).farm * a.inventory.rabs) + " / 60 сек.\n👲 | Рабов >> "+ a.inventory.rabs : ''} ${a.inventory.barons != 0 ? `\n💂 | Баронов: ${a.inventory.barons}` : ''}`)})
	},
	desc: "проф <<ID пользователя>> -- проверить у него профиль",
	rights: 3,
	type: "all",
	type: "prosto"
}