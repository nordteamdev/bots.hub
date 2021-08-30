const banlist = require("../data/banlist.json")
const ban = require("../plugins/systems.js").ban
const config = require("../settings/config.js")
const accs = require("../data/accs.json")
const times = require("../plugins/functions.js").time
module.exports = {
    r: /(ban|бан|забань) ([0-9]+)?\s?([^]+);([0-9]+) (s|m|h|d|w)/i,
    f: function (msg, args, vk, bot){
        vk("messages.getById", {message_ids: msg.id}).then((res) => {
            var gone = ""
            var arr = {
                "s": 1,
                "m": 60,
                "h": 60*60,
                "d": 60*60*24,
                "w": 60*60*24*7
            }
            var before = Number(args[4])*arr[args[5]]
            var bef = ""
            if(before >= 59875200){
                before = ""
            }
            if(before == ""){
                bef = "навсегда"
            }else{
                bef = convertTime(before)
            }
    if(!res.items[0].fwd_messages){
        if(args[2] == msg.from_id){ gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nСейчас бы самого себя банить\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"}else{
        var bantik = ban({id: Number(args[2]), before: before, reason: args[3], author: msg.from_id})
        var user = args[2]
        if(bantik.acc.ban == true){
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id"+ user +" уже в бане.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }
        if(bantik.acc.status == false){
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователя *id"+ user +" нету в базе аккаунтов.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }else{
            gone = "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id" + user + " успешно забанен.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"
        }
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
                if(user != msg.from_id){
                  var bantik = ban({id: Number(user), before: before, reason: args[3], author: msg.from_id})
                  console.log(JSON.stringify(bantik))
                  if(bantik.acc.ban == true){
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id"+ user +" уже в бане.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }else if(bantik.acc.status == false){
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователя *id"+ user +" нету в базе аккаунтов.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }else{
                      gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПользователь *id" + user + " успешно забанен.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                  }
                }else{
                  gone += "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nСейчас самого себя банить\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n"
                }
            }
            gone += "\n\nДополнительные параметры: \nВремя блокировки: " + times(2) + "\nПричина: " + args[3] + "\nАвтор бана: *id" + msg.from_id + "\nЗабанен(а/ы) на " + bef
    }
    bot({text: gone})
    })
    },
    rights: 5,
    desc: "бан <ID пользователя> <ПРИЧИНА>;<ЧИСЛО> <s|m|h|d|w> -- забанить юзера на время или нет, s - sec, m - min, d - days, w - week",
    type: "all"
}
function convertTime(time){
    return (time/60|0) + " минут " + (time%60|0) + " секунд"
}