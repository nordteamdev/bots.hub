const accs = require("../plugins/autosave.js").accs
const clans = require("../plugins/autosave.js").clans
module.exports = {
	r: /(clans join|cc join|clan join|клан вступить|клан войти) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].clan_uid != -1) return msg.send("❌ | У тебя уже есть клан.")
	   if(clans[Number(args[2])] == undefined) return msg.send("❌ | Нету такого клана.")
       if(clans[Number(args[2])].type == 2) return msg.send("❌ | Нельзя вступить в клан, если он закрытый. Только по приглашению создателя или админов")
       accs[i].clan_uid = Number(args[2])
       bot({text: "✅ | Вы вступили в клан <<" + clans[Number(args[2])].name + ">>"})
	},
	desc: "клан вступить <НОМЕР КЛАНА> -- Вступить в клан",
    rights: 0,
	type: "all",
	typ: "clan"
}