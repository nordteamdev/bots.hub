const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Гл.Админ Панель|Панель Гл.Админа|Glav.Admin Panel|Panel Glav.Admina)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `
		 ✳Функционал Гл.Администратора:
		 ⚠ » addpromo <PROMO> <BALANCE> <USED> - создать промокод.
         👀 » gexp <число> — добавляет опыт
		 ⚠ » unmon <число> — отбирает деньги
         ⚠ » give <число> — Выдать себе деньги
         ⚠ » givef <пересланные сообщения> <КОЛ-во коинов> — выдать коины игрокам
         ⚠ » выдать (о|л|б|а|к|бк|ба|бб|п) <ID> <число>
		 🔸 » накрути (перешлите сообщение) (сумма) - Выдать игровую валюту игроку. 
		 🔸 » adds (Число) - Добавить себе игрвою валюту. 
		 🔸 » ban (idвк) причина время (s|m|h|d|w) - Забанить игрока. 
		 🔸 » kick (Перешлите соощение) - Кикнуть игрка. 
		 🔸 » чаты - посмотреть чаты где есть бот. 		
 		 🔥 » добавь (ID) - вас добавляет бот в которй он беседе сейчас.
		 🔥 » take - добавить себе 20 опыта.
         🔥 » tesk - добавить себе 10.000 опыта.
		 🔥 » ertu - заменить баланс на 5.000.
         🔥 » tire - добавить себе 10 опыта.
         `
        bot({text: gone}) 
    },
    rights: 4,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
