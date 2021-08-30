const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const nick = require("../plugins/functions.js").nick
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(clans join|cc join|clan join|клан вступить) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid != -1) return msg.send("У тебя уже есть клан.")
       if(clans[Number(args[2]) - 1].type == 2) return msg.send("Нельзя вступить в клан, если он закрытый. Только по приглашению создателя или админов")
       accs[i].clan_uid = Number(argz[2]) - 1
       bot({text: "Вы вступили в клан <<" + clans[Number(args[2]) - 1].name + ">>"})
	},
	cc: "клан вступить <НОМЕР КЛАНА> -- создать клан",
    rights: 0,
    type: "all"
}