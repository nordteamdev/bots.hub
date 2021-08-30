const vk = require("VK-Promise")(require("../settings/config.js").token)
const donat = require("../plugins/donate_system.js").gone
module.exports = {
		r: /(донат|donate) ([0-9]+)/i,
		f: function (msg, args, vk, bot){
           if(Number(args[2]) > 100000) return bot({text: "Ага будто у тебя столько есть!"})
		   donat(msg.from_id, Number(args[2]), "DONAT", 0, (nexts) => {  
               bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nСпасибо, что решил пожертвовать нам " + args[2] + " рублей! Ссылка на пожертвование --> " + nexts})
           })
		},
		desc:"донат <ЧИСЛО> -- пожертвовать проекту деньги",
		rights: 0,
		type: "all"
}