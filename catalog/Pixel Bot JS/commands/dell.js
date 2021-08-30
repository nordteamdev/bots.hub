const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
const bank = require("../plugins/autosave.js").bank 
module.exports = { 
		r: /dell/i, 
		f: (msg, args, vk, bot) => { 
	var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
	vk.api.call('messages.getById', {message_ids: msg.id}).then(res => { 
		if(!res.items[0].fwd_messages) return bot({text: `⛔ Ошибка! Перешлите сообщение`}) 
		let text = ``; 
		res.items[0].fwd_messages.map(e => { 
		var i = accs.filter(a=> a.id == e.user_id).map(a=> a.uid) 
		accs[i].balance = 0;  
		accs[i].level = 0; 
		accs[i].exp = 0; 
		accs[i].bets = 0; 
		accs[i].winDuel = 0; 
		accs[i].loseDuel = 0; 
		accs[i].rights = 0; 
		accs[i].clan_uid = -1; 
		accs[i].inventory.invites = 0;
		accs[i].inventory.scans = 0;
		accs[i].inventory.nicks = 0;
		accs[i].inventory.diamonds = 0;
		accs[i].inventory.bitcoins = 0;
		accs[i].inventory.barons = 0;
		accs[i].inventory.rabs = 0;
		accs[i].inventory.cases.donate = 0;
		bank[i].balance.balance = 0;
		bank[i].balance.diamonds = 0;
		bank[i].balance.bitcoins = 0;
	bot({text: `Вы обнулили @id${e.user_id}`}) 
		}); 
	}); 
},
	rights: 5, 
	desc: "dell <Пересланное сообщение> - обнулить ресурсы игрока", 
	type: "all", 
	typ: "game" 
}