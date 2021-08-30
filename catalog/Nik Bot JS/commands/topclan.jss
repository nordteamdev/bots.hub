const clans = require("../plugins/autosave.js").clans
const name = require("../plugins/functions.js").name
const num = require("../plugins/functions.js").replace
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /topc/i,
	f: function (msg, args, vk, bot){
	   var tops = []
	   var exp = []
	   for(var i = 0; i < clans.length; i++){
		   tops.push({id: clans[i].uid, balance: clans[i].balance, name: clans[i].name})
	   }
	   for(var a = 0; a < clans.length; a++){
		   exp.push({id: clans[a].uid, level: clans[a].level, exp: clans[a].exp, name: clans[a].name})
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
	   for(var g = 0; g < 5; g++){
	   if(tops.length > g){
		   yo.push({id: tops[g].uid, balance: tops[g].balance, name: tops[g].name})
		   you.push({id: exp[g].uid, level: exp[g].level, exp: exp[g].exp, name: exp[g].name})
	   }
	   }
	   var i = 1 
	   var p = 1
	   var l = 0
	   var lolik = "Топ 5 по балансу: \n" + yo.map(a=> num(i++) + a.name +" - " + a.balance + " коинов. ").join("\n")
		   var home = 0
		   bot({text: lolik + "\n\nТоп 5 по опыту: \n" + you.map(a=> num(p++) + a.name +" - " + a.level + " уровень " + a.exp + " 🌟 ").join("\n")})
    },
	desc: "top -- узнать топ игроков",
	rights: 0,
	type: "all",
	typ: 'game'
}