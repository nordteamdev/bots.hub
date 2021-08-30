const banlist = require("../plugins/autosave.js").banlist
const nickname = require("../plugins/functions.js").nick
const num = require("../plugins/functions.js").replace
const scl = require("../plugins/functions.js").declOfNum
function run(msg, args, vk, bot){
       var l = 1
       bot({text: "список забаненных:\n\n[ № | ID | АВТОР | ПРИЧИНА | ОКОНЧАНИЕ БЛОКИРОВКИ ]\n" + banlist.filter(x=> x.status == true).map(a=> num(l++) + " *id" + a.id + " | " + loves(a.author) + "" + a.author + " | " + a.reason + " | " + convertTime(a.before)).join("\n")})
}
module.exports= {
    r: /(bans|банл)/i,
    f: function (msg, args, vk, bot){
        var l = 1
        if(banlist.filter(x=> x.status == true).map(a=> a.id).length == 0) return bot({text: "В моем банлисте не обнаружено ни одного заблокированного пользователя"})
        bot({text: "📣 | Список забаненных:\n\n[ № | ID | АВТОР | ПРИЧИНА | ОКОНЧАНИЕ БЛОКИРОВКИ ]\n" + banlist.filter(x=> x.status == true).map(a=> num(l++) + " *id" + a.id + " | " + loves(a.author) + "" + a.author + " | " + a.reason + " | " + convertTime(a.before)).join("\n")})
    },
    desc:"банл -- банлист",
    rights: 1,
    type: "all",
    typ: "prosto"
}
function convertTime(seconds) {
    if(seconds == "") return "навсегда"
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
function loves(author){
    var author = author.toString()
    var lol = author.search(/([0-9]+)/i)
    if(lol > -1){
        return "*id"
    }else{
        return ""
    }
}