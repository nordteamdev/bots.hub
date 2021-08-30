const banlist = require("../data/banlist.json")
const unban = require("../plugins/systems.js").unban
const accs = require("../data/accs.json")
const mes = require("../settings/messages.json")
const times = require("../plugins/functions.js").time
module.exports = {
    r: /(unban|разбанить|разбан)\s?([0-9]+)?/i,
    f: function (msg, args, vk, bot){
        vk("messages.getById", {message_ids: msg.id}).then((res) => {
            var gone = ""
    if(!res.items[0].fwd_messages){
        var unb = unban({id: Number(args[2]), author: msg.from_id})
        var user = args[2]
        console.log(JSON.stringify(unb))
        if(unb.acc.ban == false){
            gone = "\n👦 | Пользователь *id"+ user +" не в бане."
        }else if(unb.acc.status == false){
            gone = "\n👦 | Пользователя *id"+ user +" нету в базе аккаунтов."
        }else{
            gone = "\n👦 | Пользователь *id" + user + " успешно разблокирован."
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
                  var unb = unban({id: Number(user), author: msg.from_id})
                  console.log(JSON.stringify(unb))
                  if(unb.acc.ban == false){
                      gone += "\n👦 | Пользователь *id"+ user +" не в бане."
                  }else if(unb.acc.status == false){
                      gone += "\n👦 | Пользователя *id"+ user +" нету в базе аккаунтов."
                  }else{
                      gone += "\n👦 | Пользователь *id" + user + " успешно разблокирован."
                  }
            }
            gone += "\n\n💾 | Дополнительные параметры: \n⏰ | Время разблокировки: " + times(2) + "\n👮 | Автор: *id" + msg.from_id
    }
    bot({text: gone})
    })
    },
    rights: 3,
    desc: "разбанить <ID пользователя>? -- разбанить пользователя",
    type: "admin"
}