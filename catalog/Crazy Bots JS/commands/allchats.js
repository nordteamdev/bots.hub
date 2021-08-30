module.exports = {
	r: /(allchats|чаты|все чаты)/i,
	f: function (msg, args, vk, bot){
		vk("messages.getDialogs", {count: 200}).then(function (res){
			return bot({text: "Я есть в таких чатах:\n" + res.items.map(a=> a.message.chat_id).join(" | ")})
		});
	},	
	rights: 2,
	desc: "чаты -- вывести все чаты бота",
	type: "all"
}