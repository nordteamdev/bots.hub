const accs = require("../plugins/autosave.js").accs
const nick = require("../plugins/functions.js").nick
const num = require("../plugins/functions.js").replace
const wait = require("../plugins/functions.js").wait
const config = require("../settings/config.js")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /(exptop)/i,
	f: function (msg, args, vk, bot){
	   var tops = []
	   var exp = []
	   for(var a = 0; a < accs.length; a++){
		   exp.push({id: accs[a].id, level: accs[a].level, exp: accs[a].exp, nick: accs[a].nickname})
	   }
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
	   var you = []
	   for(var g = 0; g < 5; g++){
	   if(tops.length > g){
		   you.push({id: exp[g].id, level: exp[g].level, exp: exp[g].exp, nick: exp[g].nick})
	   }
	   }
	   var i = 1 
	   var p = 1
	   var l = 0
	   var lolik = "Топ 5 по опыту: \n" + you.map(a=> num(p++) + " [id" + a.id + "|" + a.nick +"] - " + a.level + " уровень " + a.exp + " 🌟 ").join("\n")
       bot({text: lolik})    
    },
	desc: "top -- узнать топ игроков",
	rights: 0,
	type: "all",
	typ: 'game'
}