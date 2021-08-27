const duel = require("../plugins/lobby.js").lobby.duel
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /(дуэль|duel)$/i,
	f: function (msg, args, vk, bot){
       if(!msg.chat) return
       if(accs[accs.filter(a=> a.id == msg.user).map(a=> a.uid)].balance < 1000) return bot({text: "🤓 Минимальный баланс для дуэли 1000 поинтов."})
       var ha = duel(msg.chat, msg.user)
	   if(ha == false || ha.users_ids.length == 1) return bot({text: "🙉 Ваши ставки приняты, ждем соперника!"})
       accs[accs.filter(a=> a.id == ha.winner).map(a=> a.uid)].balance += ha.balance
       bot({text: `Прости, *id${ha.loser} (${accs.filter(a=> a.id == ha.loser).map(a=> a.nickname)}), покойся с миром бомж, твой баланс переходит твоему повелителю.`})
	},
	desc: "дуэль -- дуэль с игроками",
	rights: 0,
	type: "all",
	typ: "game"
}