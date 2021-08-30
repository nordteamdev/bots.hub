module.exports = {
	r: /(чаты|все чаты)/i,
	f: function (msg, args, vk, bot){
		vk("messages.getDialogs", {count: 200}).then(function (res){
			//return bot({text: "" + res.items.map(a=>`[${a.message.chat_id }] ${a.message.title}`).join("\n")})
			return bot({text: "Чаты в которых я состою:\n" + res.items.filter(a=> a.message.chat_id && a.message.chat_active.length > 0 && a.message.users_count > 0).map(a=>`[${a.message.chat_id - 1}] [${Math.round(a.message.users_count - 1)}/250]${a.message.title}`).join("\n")})
		});
	},	
	rights: 4,
	desc: "чаты -- вывести все чаты бота",
	type: "admin"
}