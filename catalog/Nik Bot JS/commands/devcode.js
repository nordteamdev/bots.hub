const promo = require("../plugins/autosave.js").promo
module.exports = {
    r: /devcode ([^]+) ([0-9]+) ([0-9]+)/i,
    f: function (msg, args, vk, bot){
       if(promo[args[1]]) return bot({text: '❌ | Нельзя!'})
       if(Number(args[2]) >= 100000000000000000000000000000000000000000000000000000 || Number(args[3]) >= 100) return bot({text: '❌ | Вы достигли максимального баланса промокода, либо использований'})
       promo[args[1]] = {
           balance: Number(args[2]),
           users: [],
           used: Number(args[3])
       }
       bot({text: `✔ | Код «${args[1]}» успешно создан.
       📄 | Параметры кода :
       💰 | Баланс - ${args[2]} коинов
       📌 | Использования - ${args[3]}`})
    },
    rights: 7,
    desc: "devcode <PROMO> <BALANCE> <USED> - создать devcode.",
    type: "all",
    typ: "prosto"
}