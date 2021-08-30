const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(о боте|about bot)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `📝Основная информация:\n&#8195;💻 | Проект: ${config.codename}\n&#8195;⚙ | Название бота: ${config.namebot} \n&#8195;📎 | Версия: ${config.version} \n&#8195;🔧 | Разработчик: [evgentop23|Давид Ербаев] \n&#8195;🌍 | Кодер: [evgentop23|Давид Ербаев] \n&#8195;🌚 | 2 Руководитель: ${config.admin} \n&#8195;💎 | Заместитель: ${config.zam} \n💎 |2 Заместитель: ${config.zam2} \n&#8195;👪 | Группа: ${config.group_url} \n\n📋 | Сайт бота: ${config.site} | \n\n| ✉ Сообщений принято: ${main.in}\n\n👬 | Всего пользователей: ${accs.length}\n😲 | Банлист: ${banlist.filter(a=> a.status == true).length} \n| 💻 UPTIME: ${main.uptime.days} дней ${main.uptime.hours} часов ${main.uptime.min} минут \n | 📤 Сообщений отправлено: ${main.out} |`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
