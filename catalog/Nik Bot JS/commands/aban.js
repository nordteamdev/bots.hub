const banlist = require("../plugins/autosave.js").banlist
const ban = require("../plugins/systems.js").ban
const config = require("../settings/config.js")
const accs = require("../plugins/autosave.js").accs
const times = require("../plugins/functions.js").time 
const scl = require("../plugins/functions.js").declOfNum
module.exports = {
    r: /(aban|абан|азабань) ([0-9]+)?\s?([^]+);([0-9]+) (s|m|h|d|w)/i,
    f: function (msg, args, vk, bot){
        vk.api.call("messages.getById", {message_ids: msg.id}).then((res) => {
            var gone = ""
            var arr = {
                "s": 1,
                "m": 60,
                "h": 60*60,
                "d": 60*60*24,
                "w": 60*60*24*7
            }
            var before = Number(args[4])*arr[args[5]]
            var bef = "347241116"
            if(before >= 347241116){
                before = "347241116"
            }
            if(before == ""){
                bef = "навсегда"
            }else{
                bef = convertTime(before)
            }
    if(!res.items[0].fwd_messages){
        if(args[2] == msg.user){ gone = "Сейчас бы самого себя банить"}else{
        var bantik = ban({id: Number(args[2]), before: before, reason: args[3], author: msg.user, system: true})
        var user = args[2]
        if(bantik.acc.ban == true){
            gone = "Пользователь *id"+ user +" уже в бане."
        }
        if(bantik.acc.protect == true){
            gone = "Пользователя *id" + user + " нельзя забанить!"
        }
        if(bantik.acc.status == false){
            gone = "Пользователя *id" + user + " нельзя забанить!\n"
        }else{
            gone = "Пользователь *id" + user + " успешно забанен."
        }
        }
    }else{
            for(var j = 0; j < res.items[0].fwd_messages.length; j++){
                var user = res.items[0].fwd_messages[j].user_id
                if(user != msg.user){
                  var bantik = ban({id: Number(user), before: before, reason: args[3], author: msg.user, system: true})
                  console.log(JSON.stringify(bantik))
                  if(bantik.acc.protect == true){
                    gone += "Пользователя *id" + user + " нельзя забанить!\n"
                  }
                  if(bantik.acc.ban == true){
                      gone += "Пользователь *id"+ user +" уже в бане.\n"
                  }else if(bantik.acc.status == true){
                      gone += "Пользователь *id" + user + " успешно забанен.\n"
                  }
                }else{
                  gone += "Сейчас самого себя банить\n"
                }
            }
            gone += "\n\n⏰ | Время блокировки: " + times(2) + "\n✏ | Причина: " + args[3] + "\n👦 | Автор бана: *id" + msg.user + "\n⏳ | Забанен(а/ы) на " + bef
    }
    bot({text: gone})
    })
    },
    rights: 6,
    desc: "абан <ID пользователя> <ПРИЧИНА>;<ЧИСЛО> <s|m|h|d|w> -- забанить системой юзера на время или нет, s - sec, m - min, d - days, w - week",
    type: "all",
    typ: "admin"
}
function convertTime(seconds) {
    var hours = parseInt(seconds/3600 );
    seconds = seconds%3600;
    var minutes = parseInt(seconds/60); 
    seconds = seconds%60;
    hours = (hours == 0 ? "" : hours + " " + scl(hours, ["час", "часа", "часов"]))
    minutes = (minutes == 0 ? "" : minutes + " " + scl(minutes, ["минуту", "минуты", "минут"]))
    seconds = (seconds == 0 ? "" : seconds + " " + scl(seconds, ["секунду", "секунды", "секунд"]))
    var gone = hours + " " + minutes + " " + seconds
    return gone
}