const accs = require("../data/accs.json")
const nick = require("../plugins/functions.js").nick
const num = require("../plugins/functions.js").replace
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /топ (алмаз|биткоин)/i,
	f: function (msg, args, vk, bot){
	   var tops = []
	   var exp = []
	   for(var i = 0; i < accs.length; i++){
		   tops.push({id: accs[i].id, balance: accs[i].inventory.diamonds})
	   }
	   for(var a = 0; a < accs.length; a++){
		   exp.push({id: accs[a].id, balance2: accs[a].inventory.bitcoins})
	   }
	   tops.sort(function(a, b){
		   if(b.balance > a.balance) return 1
		   if(b.balance < a.balance) return -1
		   return 0
	   })
	   exp.sort(function(a, b){
		   if(b.balance2 > a.balance2) return 1
		   if(b.balance2 < a.balance2) return -1
		   return 0
	   })
	   var yo = []
	   var you = []
	   for(var g = 0; g < 10; g++){
	   if(tops.length > g){
		   yo.push({id: tops[g].id, balance: tops[g].balance})
		   you.push({id: exp[g].id, balance2: exp[g].balance2, exp: exp[g].exp})
	   }
	   }
	   var i = 1 
	   var p = 1
	   var users = yo.map(a=> a.id).join(",")
	   var users1 = you.map(a=> a.id).join(",")
	   //vk("users.get", {user_ids: users}).then(function (r) {
	   var l = 0
	   //var lolik = nick(msg.from_id) + "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТоп по балансу: \n" + r.map(a=> num(i++) + " [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + yo[l++].balance + " 💵 ").join("\n")
	   var lolik = nick(msg.from_id)
	   if(args[1].toLowerCase() == "алмаз") {
	   vk("users.get", {user_ids: users}).then(function (r) {
		   var home = 0
		   bot({text: lolik + "\n📊 | Топ по балансу: \n" + r.map(a=> num(i++) + " [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + yo[l++].balance + " 💎 ").join("\n")})
	   })
	   }
	   if(args[1].toLowerCase() == "биткоин") {
	   vk("users.get", {user_ids: users1}).then(function (res) {
		   var home = 0
		   bot({text: lolik + "\n\n📊 | Топ по балансу \n\n" + res.map(a=> num(p++) + " [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + you[l++].balance2 + " 💳 ").join("\n")})
	   })
	   }
    },
	desc: "топ алмаз | биткоин -- узнать топ игроков",
	rights: 0,
	type: "game"
}