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
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id"+ user +" не в бане.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }else if(unb.acc.status == false){
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователя *id"+ user +" нету в базе аккаунтов.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }else{
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id" + user + " успешно разблокирован.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
                  var unb = unban({id: Number(user), author: msg.from_id})
                  console.log(JSON.stringify(unb))
                  if(unb.acc.ban == false){
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id"+ user +" не в бане.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }else if(unb.acc.status == false){
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователя *id"+ user +" нету в базе аккаунтов.\n~~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }else{
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id" + user + " успешно разблокирован.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }
            }
            gone += "\n\nДополнительные параметры: \nВремя разблокировки: " + times(2) + "\nАвтор: *id" + msg.from_id
    }
    bot({text: gone})
    })
    },
    rights: 5,
    desc: "разбанить <ID пользователя>? -- разбанить пользователя",
    type: "all"
}