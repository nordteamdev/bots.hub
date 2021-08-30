const vk = require("VK-Promise")(require("../settings/config.js").token)
const accs = require("../data/accs.json")
const filter = require("../plugins/functions.js").filter
module.exports = {
	r: /(invite|пригласи) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       if(accs[accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)].inventory.invites <= 0) return msg.send("\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nКупи инвайты\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~")
	   vk("messages.addChatUser", {chat_id: Number(args[2]), user_id: msg.from_id}).then(function(res){
         accs[accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)].inventory.invites -= 1
         bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n- 1 инвайт\nВ беседу пригласил, но это не точно!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
       })
	},
	desc: "пригласи <id беседы> -- пригласит вас в др беседу",
	rights: 0,
	type: "all"
}