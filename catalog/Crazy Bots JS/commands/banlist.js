const accs = require("../data/accs.json")
const nickname = require("../plugins/functions.js").nick
const num = require("../plugins/functions.js").replace
function run(msg, args, vk, bot){
       var l = 1
       bot({text: "список забаненных:\n\n[ № | ID | АВТОР | ПРИЧИНА | ОКОНЧАНИЕ БЛОКИРОВКИ ]\n" + banlist.filter(x=> x.status == true).map(a=> num(l++) + " *id" + a.id + " | " + loves(a.author) + "" + a.author + " | " + a.reason + " | " + convertTime(a.before)).join("\n")})
}
module.exports= {
    r: /(banlist|банлист)/i,
    f: function (msg, args, vk, bot){
        var l = 1
        if(accs.filter(x=> x.ban.status == true).map(a=> a.id).length == 0) return bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nВ моем банлисте не обнаружено ни одного заблокированного пользователя\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
        bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nсписок забаненных:\n\n[ № | ID | АВТОР | ПРИЧИНА | ОКОНЧАНИЕ БЛОКИРОВКИ ]\n" + accs.filter(x=> x.ban.status == true).map(a=> num(l++) + " *id" + a.id + " | " + loves(a.ban.author) + "" + a.ban.author + " | " + a.ban.reason + " | " + convertTime(a.ban.before)).join("\n")})
    },
    desv:"банлист -- банлист",
    rights: 1,
    type: "all"
}
function convertTime(time){
    if(time == '') return 'навсегда'
    return (time/60|0) + " минут " + (time%60|0) + " секунд"
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