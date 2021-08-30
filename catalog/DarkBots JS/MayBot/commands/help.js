const fs = require("fs")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./" + x));
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /(help|помощь)/i,
	f: function (msg, args, vk, bot){
       var lll = ['👥', '🆒', '💡', '⭐', '🆙', '🔧']
       var gone = "✉ Обычные команды: \n" + cmds.filter(a=> a.rights <= accs.filter(a=> a.id == msg.user).map(a=> a.rights) && a.typ == "prosto").map(a=> `(${lll[a.rights]}) -> Мая ${a.desc}`).join("\n") + "\n\n🕹 Игровые команды: \n" + cmds.filter(a=> a.rights <= accs.filter(a=> a.id == msg.user).map(a=> a.rights) && a.typ == "game").map(a=> `(${lll[a.rights]}) -> Мая ${a.desc}`).join("\n") 
       gone += `\n\nУровни доступа: \n${lll[0]} -- Пользователь\n${lll[1]} -- Вип\n${lll[2]} -- Премиум\n${lll[3]} -- Модератор\n${lll[4]} -- Администратор\n${lll[5]} -- только Системному Разработчику`
       return bot({text: gone, status: false}) 
	},
	desc: "помощь -- помощь по командам",
	rights: 0,
	type: "all",
	typ: "prosto"
}