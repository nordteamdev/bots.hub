const promo = require("../data/promocodes.json")
const accs = require("../data/accs.json")
module.exports = {
	r: /(promocode|промокод) ([^]+)/i,
	f: function (msg, args, vk, bot){
       if(!promo[args[2]] || promo[args[2]].status == false) return bot({text: "\nТакого промокода не существует!"})
       if(promo[args[2]].users.indexOf(msg.from_id) != -1) return bot({text: "\nТы уже активировал данный промокод."})
       if(promo[args[2]].used == 0) return bot({text: "\nЗакончились использования данного промокода."})
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       promo[args[2]].users.push(msg.from_id)
       accs[i].spots += promo[args[2]].balance
       promo[args[2]].used -= 1
       bot({text: "Ты активировал промокод " + args[2]})
    },
	desc: "промокод <ПРОМОКОД> -- активировать промокод",
    rights: 0,
    type: "game"
}