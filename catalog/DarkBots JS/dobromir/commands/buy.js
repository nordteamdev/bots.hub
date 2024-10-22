﻿const accs = require("../data/accs.json")
const nick = require("../plugins/functions.js").nick
const shop = require("../settings/shop.json")
const scl = require("../plugins/functions.js").declOfNum
const random = require("../plugins/functions.js").getRandomInt
const chats = require("../data/chats.json")
const config = require("../settings/config.js")
const vk = require("VK-Promise")(config.token)
const fs = require("fs")
module.exports = {
	r: /(купить) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
		var text = args[2]
		if(Number(text) > shop.length) return bot({text: "Такого товара не существует."})
		const i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		var trueid = Number(text) - 1
		if(accs[i].spots < shop[trueid].buy) return bot({text: "тебе не хватает 💵 на <<" + shop[trueid].name + ">>, он стоит " + shop[trueid].buy + " 💵. Тебе еще не хватает " + Math.round(shop[trueid].buy - accs[i].spots) + " " + scl(Math.round(shop[trueid].buy - accs[i].spots), ["ботса", "ботсов", "ботсов"])})
		if(trueid == 0){ // Товар блокировка названия
			if(!msg.chat_id) return bot({text: "Как умно заблокировать название в ЛС"})
			accs[i].spots -= shop[trueid].buy	   
			bot({text: "Товар <<"+shop[trueid].name + ">> успешно куплен!\nС вашего баланса снято: " + shop[trueid].buy +" 💵"});
			chats[chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.uid)].title = msg.title
			bot({text: "Название <<" + msg.title + ">> успешно заблокировано!!!"})
		}else if(trueid == 1){
			if(!msg.chat_id) return bot({text:"Как умно разблокировать название в ЛС"})
			if(chats[chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.uid)].title == "") return bot({text: "У вас не заблокировано название в беседе!"})
			accs[i].spots -= shop[trueid].buy
			chats[chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.uid)].title = ""
			bot({text: "Название в беседе разлочено!"})
		}else if(trueid == 2){
			accs[i].spots -= shop[trueid].buy
			bot({text: "Товар <<" + shop[trueid].name + ">> успешно куплен!\nС вашего баланса снято: " + shop[trueid].buy + " 💵\nИспользовать: setnick <<ВАШ НИК>>"})
			accs[i].inventory.nick += 1
		}else if(trueid == 3){
			accs[i].spots -= shop[trueid].buy
			bot({text: "Товар <<" + shop[trueid].name + ">> успешно куплен!\nС вашего баланса снято: " + shop[trueid].buy + "💵"})
			accs[i].inventory.miner += 1
		}else if(trueid == 4){
			accs[i].spots -= shop[trueid].buy
			bot({text: "Товар <<" + shop[trueid].name + ">> успешно куплен!\nС вашего баланса снято: " + shop[trueid].buy + "💵"})
			accs[i].inventory.videocard += 1
		}
	},
	desc: "купить <<ID товара>> -- купить товар из магазина",
	rights: 0,
	type: "all"
}