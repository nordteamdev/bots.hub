const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Админ Панель|Панель Админа|Admin Panel|Panel Admina)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `
		 ✳Функционал Администратора:
		 🔸 » накрути (перешлите сообщение) (сумма) - Выдать игровую валюту игроку. 
		 🔸 » adds (Число) - Добавить себе игрвою валюту. 
		 🔸 » ban (цифровой id вк) причина время (s|m|h|d|w) - Забанить игрока. 
		 🔸 » unban (цифровой id вк) - Разбанить игрока. 
		 🔸 » kick (Перешлите соощение) - Кикнуть игрка.
     🔸 » чаты - посмотреть чаты где есть бот. 		
 		 🔥 » добавь ID - вас добавляет бот в которй он беседе сейчас.
		 🔥 » take - добавить себе 20 опыта.
     🔥 » tesk - добавить себе 10.000 опыта.
		 🔥 » ertu - заменить баланс на 5.000.
     🔥 » tire - добавить себе 10 опыта.`
        bot({text: gone}) 
    },
    rights: 3,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
