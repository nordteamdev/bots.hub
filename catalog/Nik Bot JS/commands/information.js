const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(о боте|about bot)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `📝Основная информация:\n&#8195;💻 | Проект: ${config.codename}\n&#8195;⚙ | Название бота: ${config.namebot} \n&#8195;📎 | Версия: ${config.version} \n&#8195;🔧 | Разработчик: [id347241116|Sergey Volkov] \n&#8195;🌍 | Сис.Администратор/Кодер: [id347241116|Sergey Volkov]  \n&#8195;❤ | СамыйСасныйЗам: [id408717579|🔐TimiChanga🔐] \n&#8195;👪 | Группа: ${config.group_url}\n\n👬 | Всего пользователей: ${accs.length}\n😲 | Банлист: ${banlist.filter(a=> a.status == true).length}\n\n💎Статистика по донату:\n&#8195;🔝 | Всего VIP: ${accs.filter(a=> a.rights == 1).length}\n&#8195;Ⓜ | Всего MODERATOR: ${accs.filter(a=> a.rights == 2).length}\n&#8195;🅰 | Всего ADMIN: ${accs.filter(a=> a.rights == 3).length}\n&#8195;⚠ | Всего SUPPORT: ${accs.filter(a=> a.rights == 4).length}\n&#8195;👀 | Всего LOOKING: ${accs.filter(a=> a.rights == 5).length}\n&#8195;💎 | Всего ZAM: ${accs.filter(a=> a.rights == 6).length}\n&#8195;🔧\n&#8195;🔧 | Всего CREATOR: ${accs.filter(a=> a.rights == 7).length}`
        bot({text: gone}) 
    },
    rights: 1,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
