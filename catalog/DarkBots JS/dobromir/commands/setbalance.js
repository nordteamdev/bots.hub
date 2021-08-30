const accs = require("../data/accs.json")
const nick = require("../plugins/functions.js").nick
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(установить баланс|setbalance) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
       vk("messages.getById", {message_ids: msg.id}).then((res) => {
          if(!res.items[0].fwd_messages) return
          var gone = ""
          for(var j = 0; j < res.items[0].fwd_messages.length; j++){
          if(!accs.some(a=> a.id == Number(res.items[0].fwd_messages[j].user_id))) { 
            gone += "👦 | Пользователя *id"+ res.items[0].fwd_messages[j].user_id + " нет в базе аккаунтов\n" 
          }else{
            var i = accs.filter(a=> a.id == res.items[0].fwd_messages[j].user_id).map(a=> a.uid)
            if(Number(args[2]) > 1000000){
              gone += "\n📌 | Превышен лимит накрутки, лимит = 1000000"
            }else{
              accs[i].spots = Number(args[2])
              gone += "\n📌 | Баланс пользователю *id" + res.items[0].fwd_messages[j].user_id + " успешно установлен"
            }
          }
          }
            bot({text: gone})
       })
	},
	desc: "установить баланс <пересланные сообщения> -- установить баланс юзеру",
  rights: 3,
  type: "admin"
}