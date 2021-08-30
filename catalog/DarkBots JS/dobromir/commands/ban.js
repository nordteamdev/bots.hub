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
        if(Number(args[2]) == 197933618){
            gone = "\n👦 | Пользователя нельзя забанить."
        }else if(Number(args[2]) == 435609266){
            gone = "\n👦 | Пользователя нельзя забанить."
        }else if(args[2] == msg.from_id){ gone = "\n🤔 | Сейчас бы самого себя банить"}else{
        var bantik = ban({id: Number(args[2]), before: before, reason: args[3], author: msg.from_id})
        var user = args[2]
        if(bantik.acc.ban == true){
            gone = "\n👦 | Пользователь *id"+ user +" уже в бане."
        }
        if(bantik.acc.status == false){
            gone = "\n👦 | Пользователя *id"+ user +" нету в базе аккаунтов."
        }else{
            gone = "\n👦 | Пользователь *id" + user + " успешно забанен."
        }
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
				if(Number(user) == 197933618){
					gone = "\n👦 | Пользователя нельзя забанить."
				}else if(Number(user) == 435609266){
					gone = "\n👦 | Пользователя нельзя забанить."
				}else if(user != msg.from_id){
                  var bantik = ban({id: Number(user), before: before, reason: args[3], author: msg.from_id})
                  console.log(JSON.stringify(bantik))
                  if(bantik.acc.ban == true){
                      gone += "\n👦 | Пользователь *id"+ user +" уже в бане."
                  }else if(bantik.acc.status == false){
                      gone += "\n👦 |Пользователя *id"+ user +" нету в базе аккаунтов."
                  }else{
                      gone += "\n👦 | Пользователь *id" + user + " успешно забанен."
                  }
                }else{
                  gone += "\n🤔 | Сейчас самого себя банить"
                }
            }
            gone += "\n\n💾 | Дополнительные параметры: \n⏰ | Время блокировки: " + times(2) + "\n⚠ | Причина: " + args[3] + "\n👮 | Автор бана: *id" + msg.from_id + "\n🌞 | Забанен(а/ы) на " + bef
    }
    bot({text: gone})
    })
    },
    rights: 3,
    desc: "бан <ID пользователя> <ПРИЧИНА>;<ЧИСЛО> <s|m|h|d|w> -- забанить юзера на время или нет, s - sec, m - min, d - days, w - week",
    type: "admin"
}
function convertTime(time){
    return (time/60|0) + " минут " + (time%60|0) + " секунд"
}