const funct = require("../plugins/functions.js")
module.exports = {
	r: /(чаты|все чаты|allchats|chats)\s?([^]+)?/i,
	f: function (msg, args, vk, bot){
		if(!args[2]){
        vk.api.call("messages.getDialogs", {count: 50}).then((res) => {
        var gone = res.items.filter(a=> a.message.chat_id && a.message.chat_active.length > 0 && a.message.users_count > 0).map(a=> `[${a.message.users_count}/250] <ID: ${a.message.chat_id}> ${a.message.title}`).join("\n")
        gone += "\n\nИ еще " + Math.round(res.count - 50) + " бесед..."
		return bot({text: funct.filter(gone), status: false})
	})
		}else{
		vk.api.call("messages.searchDialogs", {q: args[2], limit: 500}).then((res) => {
			if(res.filter(a=> a.type == 'chat').length == 0) return bot({text: "Беседы по запросу <<"+ args[2] +">> не найдены!", status: false})
			var gone1 = "Результаты по запросу <<" + args[2]+ ">>:\n" + res.filter(a=> a.type == 'chat').map(a=> `[${a.users.length}/250] <ID: ${a.id}> ${a.title}`).join("\n")
			return bot({text: funct.filter(gone1), status: false})
		  })
		}
	},
	rights: 1,
	desc: "чаты [text] -- все беседы бота или чаты по поиску",
	type: "all",
	typ: "prosto"
}