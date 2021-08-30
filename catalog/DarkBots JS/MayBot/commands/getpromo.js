const promo = require("../plugins/autosave.js").promo
const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /(промокод|promocode) ([^]+)/i,
    f: function (msg, args, vk, bot){
       if(!promo[args[2]]) return bot({text: '❌ | Такого промокода не существует!'})
       if(promo[args[2]].users.indexOf(msg.user) != -1) return bot({text: '❌ | Ты уже активировал данный промокод!'})
       if(promo[args[2]].used <= 0) return bot({text: '❌ | Данный промокод просрочен!'})
       promo[args[2]].used -= 1
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       accs[i].balance += promo[args[2]].balance
       promo[args[2]].users.push(msg.user)
       bot({text: `✔ | Ты активировал промокод <<${args[2]}>> \n💰 | Твой баланс: ${accs[i].balance} поинтов.`})
    },
    rights: 0,
    desc: "промокод <PROMO> -- активировать промокод.",
    type: "all",
    typ: "prosto"
}