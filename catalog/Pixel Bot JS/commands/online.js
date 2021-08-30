const vk = require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(онлайн)/i,
	f: function (msg, args, vk, bot){
		vk.api.call('messages.getChatUsers', {chat_id: msg.chat, fields: "online"}).then(function(res){
            var users = res.filter(a=> a.type == "profile")
			bot({text: "Онлайн беседы: \n" + users.map(a=> "| " + a.first_name + " " + a.last_name + "| - " + check(a.online)).join("\n")})
        }) 
	},
	desc: "онлайн -- онлайн беседы",
	rights: 0,
	type: "all",
	typ: "prosto"
}
function check(status){
    if(status == 1) return "✔ ONLINE ✔"
    if(status == 0) return "❌ OFFLINE ❌"
}