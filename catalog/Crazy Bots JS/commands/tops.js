const accs = require("../data/accs.json")
const nick = require("../plugins/functions.js").nick
const num = require("../plugins/functions.js").replace
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /топ/i,
	f: function (msg, args, vk, bot){
	   var tops = []
	   var exp = []
	   for(var i = 0; i < accs.length; i++){
		   tops.push({id: accs[i].id, balance: accs[i].spots})
	   }
	   for(var a = 0; a < accs.length; a++){
		   exp.push({id: accs[a].id, level: accs[a].level, exp: accs[a].exp})
	   }
	   tops.sort(function(a, b){
		   if(b.balance > a.balance) return 1
		   if(b.balance < a.balance) return -1
		   return 0
	   })
	   exp.sort(function(a, b){
		   if(a.level > b.level){
	           return -1
           }else if(a.level < b.level){
	           return 1
           }else if(a.level == b.level){
	           if(a.exp > b.exp){
		           return -1
	           }else if(a.exp < b.exp){
	  	           return 1
	           }else if(a.exp == b.exp){
		           return 0
	           }    
           }
	   })
	   var yo = []
	   var you = []
	   for(var g = 0; g < 10; g++){
	   if(tops.length > g){
		   yo.push({id: tops[g].id, balance: tops[g].balance})
		   you.push({id: exp[g].id, level: exp[g].level, exp: exp[g].exp})
	   }
	   }
	   var i = 1 
	   var p = 1
	   var users = yo.map(a=> a.id).join(",")
	   var users1 = you.map(a=> a.id).join(",")
	   vk("users.get", {user_ids: users}).then(function (r) {
	   var l = 0
	   var lolik = nick(msg.from_id) + "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТоп по балансу: \n" + r.map(a=> num(i++) + " [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + yo[l++].balance + " 💵 ").join("\n")
	   vk("users.get", {user_ids: users1}).then(function (res) {
		   var home = 0
		   bot({text: lolik + "\n\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nТоп по опыту: \n" + res.map(a=> num(p++) + " [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + you[home].level + " уровень " + you[home++].exp + " 🌟 ").join("\n")})
	   })
	   })
    },
	desc: "топ -- узнать топ игроков",
	rights: 0,
	type: "all"
}