const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(clans create|clan create|cc create|клан создать) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid != -1) return bot({text: "❌ | У тебя уже есть клан.", status: false})
       if(accs[i].balance < 200000) return bot({text: "❌ | Чтобы создать клан нужно иметь минимум 200 000 ботсов.", status: false})
	   accs[i].balance -= 200000
       clans.push({name: args[2], level:0, owner: msg.user, balance:0, helpers: [], exp: 0, next_exp: 2, events: [], next_level: 1000, uid: clans.length, type: "1", upgrade: {attck: 0, defance: 0, limit: 0}});
       accs[i].clan_uid = clans.length - 1
       return bot({text: "✅ | Клан <<" + args[2] + ">> успешно создан", status: false})
	},
	desc: "клан создать <НАЗВАНИЕ> -- создать клан",
    rights: 0,
	type: "all",
	typ: "clan"
}