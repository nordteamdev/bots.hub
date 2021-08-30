const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(о боте|about bot)/i,
    f: function (msg, args, vk, bot){
        const main = require("../maya.js").main
        var gone = `Основная информация: \n💻 | Проект: ${config.codename}\n⚙ | Название бота: ${config.namebot}\n📎 | Версия: ${config.version}\n👮 | Владелец бота: [id303293209|Сергей Бойцов]\n💡 | Группа бота: ${config.group_url}\n\nСтатистика:\n💾 | Всего команд: ${main.cmds}\n✉ | Всего сообщений: ${main.in}\n👬 | Всего пользователей: ${accs.length}\n😲 | Банлист: ${banlist.filter(a=> a.status == true).length}\n\nСтатистика по донату:\n🆒 | Всего випов: ${accs.filter(a=> a.rights == 1).length}\n🎁 | Всего премиумов: ${accs.filter(a=> a.rights == 2).length}\n🎲 | Всего модераторов: ${accs.filter(a=> a.rights == 3).length}\n📢 | Всего администраторов: ${accs.filter(a=> a.rights == 4).length}\n\nДрузья: \n✔ | Добавлено: ${main.friends.add}\n❌ | Удалено: ${main.friends.remove}`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
