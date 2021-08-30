const promo = require("../data/promocodes.json")
const accs = require("../data/accs.json")
module.exports = {
	r: /(promocode|промокод) ([^]+)/i,
	f: function (msg, args, vk, bot){
       if(!promo[args[2]] || promo[args[2]].status == false) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТакого промокода не существует!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
       if(promo[args[2]].users.indexOf(msg.from_id) != -1) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТы уже активировал данный промокод.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
       if(promo[args[2]].used == 0) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЗакончились использования данного промокода.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       promo[args[2]].users.push(msg.from_id)
       accs[i].spots += promo[args[2]].balance
       promo[args[2]].used -= 1
       bot({text: "Ты активировал промокод " + args[2]})
    },
	desc: "промокод <ПРОМОКОД> -- активировать промокод",
    rights: 0,
    type: "all"
}