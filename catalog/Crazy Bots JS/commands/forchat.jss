const chat = require("../settings/chats.json")
const vk = new require("VK-Promise")(config.token)
module.exports = {
	r: /^\/lock (photo|title)/i,
	f: function (msg, text){
	   if(!chat_id) return 
	   if(!chat.some(a=> a.id == msg.chat_id)){
		  chat.push({cid: msg.chat_id, photo: "", title: "", title_act: false, photo_ac: false, uid: chat.length})
	   }
	   if(text == "title"){
		   var c = chat.filter(a=> a.cid == msg.chat_id).map(a=> a.uid)
		   chat[c].title = msg.title
	   }
	   if(text == "photo"){
		   
	   }
	},
	desc: "Артур пидор)0)))"
}