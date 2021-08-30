const accs = require("../data/accs.json")
const nick = require("../plugins/functions.js").nick
const filter = require("../plugins/functions.js").filter
const mes = require("../settings/messages.json")
var fail= ['разраб', 'dev', 'briancrazy', 'admin', 'vip', 'moder', 'админ', 'модер', 'вип', 'смотритель', 'прем']
module.exports = {
	r: /(setnick|ник) ([^]+)/i,
	f: function (msg, args, vk, bot){
	   if(accs.filter(a=> a.id == msg.from_id).map(a=> a.inventory.nick) <= 0) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПрости, но ты не купил в магазине никнеймов!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   if(args[2].toString().length > 20) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nМаксимальный размер ника - 20 символов.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   if(fail.indexOf(args[2].toLowerCase()) != -1) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТы не имеешь право ставить такой ник.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       accs[i].inventory.nick -= 1
       bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЯ изменил тебе ник на <<" + args[2] + ">>\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
	   accs[i].nickname = args[2]
	},
	desc: "ник <НИК> -- сделать свой ник",
	rights: 0,
	type: "all"
}