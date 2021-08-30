const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs
module.exports = {
    r: /(Состав)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `💎Состав:\n&#8195;🆒 | Випы: \n ${accs.filter(a=> a.rights == 1)} \n&#8195;🎲 | Модераторы:: \n ${accs.filter(a=> a.rights == 2).length}  \n&#8195;📢 | Администраторы: \n ${accs.filter(a=> a.rights == 3).length}\n&#8195;🖥 | HELPER'ы: \n ${accs.filter(a=> a.rights == 4).length}  ${accs.nickname}\n&#8195;🌍 | GLAV'ы: \n ${accs.filter(a=> a.rights == 5).length}  ${accs.nickname}\n&#8195;🔧 | DEVELOPER'ы: " + " [accs" + rights = 6 + "|" + a.nick +"] ")`
    },
    rights: 0,
    desc: "Состав -- Посмотреть состав NikBot",
    type: "all",
    typ: "prosto"
}
