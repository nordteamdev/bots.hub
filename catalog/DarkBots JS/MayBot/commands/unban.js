const banlist = require("../plugins/autosave.js").banlist
const unban = require("../plugins/systems.js").unban
const accs = require("../plugins/autosave.js").accs
const mes = require("../settings/messages.json")
const times = require("../plugins/functions.js").time
module.exports = {
    r: /(unban|разбанить|разбан)\s?([0-9]+)?/i,
    f: function (msg, args, vk, bot){
        vk.api.call("messages.getById", {message_ids: msg.id}).then((res) => {
            var gone = ""
    if(!res.items[0].fwd_messages){
        var unb = unban({id: Number(args[2]), author: msg.user, code: -1})
        var user = args[2]
        if(unb.acc.ban == false){
            gone = "Пользователь *id"+ user +" не в бане."
        }else if(unb.acc.system == true){
            gone = "Невозможно разблокировать *id"+ user +" т.к его забанила система."
        }else{
            gone = "Пользователь *id" + user + " успешно разблокирован."
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
                  var unb = unban({id: Number(user), author: msg.user, code: -1})
                  if(unb.acc.ban == false){
                      gone += "Пользователь *id"+ user +" не в бане.\n"
                  }else if(unb.acc.system == true){
                      gone += "Невозможно разблокировать *id"+ user +" т.к его забанила система.\n"
                  }else{
                      gone += "Пользователь *id" + user + " успешно разблокирован.\n"
                  }
            }
    }
    gone += "\n\n⏰ | Время разблокировки: " + times(2) + "\n👦 | Автор: *id" + msg.user
    bot({text: gone})
    })
    },
    rights: 4,
    desc: "разбанить <ID пользователя>? -- разбанить пользователя",
    type: "all",
    typ: "prosto"
}