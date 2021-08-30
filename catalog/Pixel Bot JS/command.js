const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs
module.exports = {
    r: /(Состав|sostav|team)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `💎Состав:\n&#8195;🆒 | Випы: \n ${accs.filter(a=> a.rights == 1)} \n&#8195;🎲 | Модераторы:: \n ${accs.filter(a=> a.rights == 2).length}  \n&#8195;📢 | Администраторы: \n ${accs.filter(a=> a.rights == 3).length}\n&#8195;🖥 | Хелперы: \n ${accs.filter(a=> a.rights == 4).length}  ${accs.nickname}\n&#8195;🌍 | Ст.Хелперы: \n ${accs.filter(a=> a.rights == 5).length}  ${accs.nickname}\n&#8195;🔧 | Заместители: " + " [accs" + rights = 6 + "|" + a.nick +") \n&#8195;🔧 | Президенты: " + " [accs" + rights = 7 + "|" + a.nick +"]")`
         return bot({text: gone, status: false})
	},
    rights: 0,
    desc: "Состав -- Посмотреть состав NikBot",
    type: "all",
    typ: "prosto"
}
