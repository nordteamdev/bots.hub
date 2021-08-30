const duel = require("../plugins/lobby.js").lobby.duel
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /(дуэль|duel)/i,
	f: function (msg, args, vk, bot){
       if(!msg.chat) return
       if(accs[accs.filter(a=> a.id == msg.user).map(a=> a.uid)].balance < 1000) return bot({text: "Минимальный баланс для дуэли 1000 ботсов."})
       var ha = duel(msg.chat, msg.user)
	   if(ha == false || ha.users_ids.length == 1) return bot({text: "Ваши ставки приняты, ждем соперника!"})
       accs[accs.filter(a=> a.id == ha.winner).map(a=> a.uid)].balance += ha.balance
       accs[accs.filter(a=> a.id == ha.winner).map(a=> a.uid)].winDuel += 1
       accs[accs.filter(a=> a.id == ha.loser).map(a=> a.uid)].loseDuel += 1
       bot({text: `Пиу пиу пау пау... *id${ha.loser} (${accs.filter(a=> a.id == ha.loser).map(a=> a.nickname)}) покойся с миром, твой баланс переходит твоему сопернику.`})
	},
	desc: "дуэль -- дуэль с игроками",
	rights: 0,
	type: "all",
	typ: "game"
}