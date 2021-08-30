const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Вип Панель|Панель випа|Vip Panel|Panel Vipa)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `
		 ✳Функционал випа:
		 🔸 » добавь <id беседы> -- добавляет вас в беседу по id.
     🔸 » чаты - посмотреть чаты где есть бот. 		
 		 🔥 » ertu - заменить баланс на 5.000.
     🔥 » tesk — добавляет 10 000 💶
     🔥 » tire - добавить себе 10 опыта.`
        bot({text: gone}) 
    },
    rights: 1,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
