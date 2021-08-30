const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs
module.exports = {
    r: /(Состав)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `\n\n\n&#8195;&#8195;&#8195;&#8195;&#8195;🌍NikBot Team🌍\n&#8195;&#8195;=========================\n\n💎 Создатель бота - [id502212198|Сергей Волков]\n✨ Заместитель создателя: [id408717579|Тимофей]\n⚡ Старшие администраторы: [id264837781|Vlad] | [id461929633|Aleksandra]`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "Состав -- Посмотреть состав NikBot",
    type: "all",
    typ: "prosto"
}
