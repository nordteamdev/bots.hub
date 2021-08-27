const accs = require("../plugins/autosave.js").accs
const shop = require("../settings/shop.json")

module.exports = {
	r: /(buy|купить) ([0-9]+)\s?([0-9]+)?$/i,
	f: function (msg, args, vk, bot){
       var uid = Number(args[2]) - 1
       var colvo = args[3] ? Number(args[3]) : 1
       if(colvo > 10) return
       if(!shop[uid]) return bot({text: "⚠ Данного товара не существует!", status: true})
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)   
       if(shop[uid].buy.price * colvo > accs[i].balance || shop[uid].buy.diamonds * colvo > accs[i].inventory.diamonds || shop[uid].buy.bitcoins * colvo > accs[i].inventory.bitcoins) return bot({text: "товар <<" + shop[uid].name + ">>, в кол-ве "+ colvo +", для вас слишком дорогой.", status: true})
       accs[i].inventory.diamonds -= shop[uid].buy.diamonds * colvo
       accs[i].inventory.bitcoins -= shop[uid].buy.bitcoins * colvo
       accs[i].balance -= shop[uid].buy.price * colvo
       eval(shop[uid].cmd.replace(/%colvo%/ig, colvo))
       bot({text: "🎁 | Товар <<" + shop[uid].name + ">> успешно куплен!\n💵 | C вашего баланса снято " + (shop[uid].buy.price * colvo > 0 ? shop[uid].buy.price * colvo + " поинтов." : '') + " " + (shop[uid].buy.diamonds * colvo > 0 ? shop[uid].buy.diamonds * colvo + " долларов" : '') + " " + (shop[uid].buy.bitcoinds * colvo > 0 ? shop[uid].buy.bitcoins * colvo + " Mcoins" : '') +"\n📍 | Количество: "+ colvo +"\n💰 | Ваш баланс >> " + accs[i].balance + " ботсов."})
	}, 
	desc: "купить <ID товара> [кол-во] -- купить товар в магазине",
	rights: 0,
	type: "all",
	typ: "game"
}