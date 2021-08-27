const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(о боте|about bot)$/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = {text: `🔪 Я - игровой бот.
Я написана на языке C# и я нахожусь в бета-версии
Мой создатель/разработчик >> vk.com/nextgorun
Группа моего создателя >> vk.com/topendbot
Надеюсь, я Вам понравлюсь:)`, att: "photo-164002385_456239019"}
        return bot({text: gone, status: false})
    },
    rights: 0,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
