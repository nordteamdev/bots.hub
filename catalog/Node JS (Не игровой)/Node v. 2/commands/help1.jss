const fs = require("fs")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./" + x));
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /(помощь|help|)/i,
	f: function (msg, args, vk, bot){
	   var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       var lll = ['👥', '🔝', 'Ⓜ', '🅰', '⚠', '👀','💎', '🔧']
       var gone = "✉ Обычные команды: \n\n" + cmds.filter(a=> a.rights <= accs.filter(a=> a.id == msg.user).map(a=> a.rights ) && a.typ == "prosto").map(a=> `(${lll[a.rights]}) -> ${a.desc}`).join("\n") + "\n\n🕹 Игровые команды: \n" + cmds.filter(a=> a.rights <= accs.filter(a=> a.id == msg.user).map(a=> a.rights) && a.typ == "game").map(a=> `(${lll[a.rights]}) -> ${a.desc}`).join("\n") + "\n\n🕹 Клановые команды: \n" + cmds.filter(a=> a.rights <= accs.filter(a=> a.id == msg.user).map(a=> a.rights) && a.typ == "clan").map(a=> `(${lll[a.rights]}) -> ${a.desc}`).join("\n") 
       gone += `\n\nУровни доступа: \n${accs[i].rights >= 0 ? "\n" + lll[0] + " - USER": ''}${accs[i].rights >= 1 ? "\n" + lll[1] + " - VIP": ''}${accs[i].rights >= 2 ? "\n" + lll[2] + " - MODERATOR": ''}${accs[i].rights >= 3 ? "\n" + lll[3] + " - ADMIN": ''}${accs[i].rights >= 4 ? "\n" + lll[4] + " - SUPPORT ": ''}${accs[i].rights >= 5 ? "\n" + lll[5] + " - LOOKING": ''}${accs[i].rights >= 6 ? "\n" + lll[6] + " - ZAM": ''}${accs[i].rights >= 7 ? "\n" + lll[7] + " - CREATOR": ''}`
       return bot({text: gone, status: true}) 
	},
	desc: "помощь -- помощь по командам",
	rights: 0,
	type: "all",
	typ: "prosto"
}