const promo = require("../plugins/autosave.js").promo
module.exports = {
    r: /создать ([^]+) ([0-9]+) ([0-9]+)$/i,
    f: function (msg, args, vk, bot){
       if(promo[args[1]]) return bot({text: '❌ | Такой промокод уже существует!'})
       if(Number(args[2]) >= 1000000000000 || Number(args[3]) >= 100) return bot({text: '❌ | Вы достигли максимального баланса промокода, либо использований'})
       promo[args[1]] = {
           balance: Number(args[2]),
           users: [],
           used: Number(args[3])
       }
       bot({text: `✔ | Промокод «${args[1]}» успешно создан.
       📄 | Параметры промокода :
       💰 | Баланс - ${args[2]} поинтов
       📌 | Использования - ${args[3]}`})
    },
    rights: 4,    
    desc: "addpromo <PROMO> <BALANCE> <USED> - создать промокод.",
    type: "all",
    typ: "prosto"
}