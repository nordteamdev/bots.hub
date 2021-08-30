const rand = require("../plugins/functions.js").rand
const chats = require("../data/chats.json")
module.exports = {
	r: /(rename|переменовать) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var cc = chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.uid)
       if(chats[cc].title != ""){
       chats[cc].title = args[2]
       }
       vk("messages.editChat", {chat_id: msg.chat_id, title: args[2]})
       bot({text: rand(["\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nНазвание <<" + args[2] + ">> просто велеколепно!", "Какое сексуальное название", "Зачем? Ух какое название\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"])})
    },
	desc: "переименовать <НАЗВАНИЕ> -- переменовать беседу",
    rights: 2,
    type: "chat"
}