const accs = require("../plugins/autosave.js").accs
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(kick)/i,
	f: function (msg, args, vk, bot){
		vk.api.call('messages.getById', {message_ids: msg.id}).then(res => { 
		if(!res.items[0].fwd_messages) return bot({text: `✉ Обязательно перешлите сообщение!`})
		res.items[0].fwd_messages.map(e => {
		var i = accs.filter(a=> a.id == e.user_id).map(a=> a.uid)
		vk.api.call('messages.removeChatUser', { chat_id: msg.chat, user_id: e.user_id });
		bot({text: `Вы успешно кикнули игрока - @id${e.user_id}`})
	           });
	   });
	},
	rights: 3,
	desc: "kick <Пересланное сообщение> -- кикает пользователя",
	type: "all",
	typ: "prosto"
}