const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(работоспособность|тест)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `\n Я 🔧 ${config.codename} даю отчет работоспособности \n | 💻 UPTIME: ${main.uptime.days} дней ${main.uptime.hours} часов ${main.uptime.min} минут \n | 📤 Сообщений отправлено: ${main.out} \n | ✉ Сообщений принято: ${main.in} |`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}