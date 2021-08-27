const global = require("../main.js")
const times = require("../plugins/functions.js").time
const vk = new require("VK-Promise")(require("../settings/config.js").token)
const config = require("../settings/config.js")
const banlist = require("./autosave.js").banlist
const rand = require("../plugins/functions.js").rand
const scl = require("../plugins/functions.js").declOfNum
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
function antispam(){
    const users = require("../main.js").users
    for(var s = 0; s < Number(users.length); s++){ 
        var user = users[s].mess
        if(user >= 1){
            var reasons = ["Не строчи так много!"]
            ban({id: Number(users[s].id), before: 300, reason: rand(reasons), author: "Автобан", system: false})
            users[s].mess = 0
        }
    }
    return
}
function ban(array){
    var time = require("../plugins/functions.js").time
    var id = Number(array.id)
    var lolik ={ 
    acc: {
        status: true,
        ban: false,
        protect: false
    },
    ban: {
        id: array.id,
        author: array.author,
        reason: "",
        before: "",
        time: time(2)
    }
}
    banlist.some(a=> a.id == id) == false ? banlist.push({id: id, status: true, reason: "", before: "", author: "", system: false, time: "", uid: banlist.length}) : null
    var i = banlist.filter(a=> a.id == array.id).map(a=> a.uid)
    if(banlist[i].status == false){
        lolik.acc.ban = false
        return lolik
    }
    var bef = ""
    if(array.before != ""){
        bef = convertTime(array.before)
    }else{
        bef = "навсегда"
    }
    banlist[i].status = false
    banlist[i].before = array.before
    banlist[i].reason = array.reason
    banlist[i].author = array.author
    banlist[i].system = array.system
    banlist[i].time = time(2)
    lolik.ban.reason = array.reason
    lolik.ban.before = array.before
    var text_user = "⚠ Вам был выдан бан от " + array.author + "\n⏳ Время бана " + bef + "\n✉ Причина бана: " + array.reason
    sendvk({text: text_user, id: array.id, att: "photo474668811_456247826"})
    return lolik
}
function sendvk(array){
    if(!array.att){
        var att = ""
    }else{
        var att = array.att
    }
    vk("messages.send", {user_id: array.id, message: array.text, attachment: att})
}
function unban(array){
    var time = require("../plugins/functions.js").time 
    var author = array.author
    var id = Number(array.id)
    var lolka = {
        acc: {
             id: array.id,
             ban: true,
             system: false
        },
        author: array.author,
        time: time(2)
    }
    if(banlist[banlist.filter(a=> a.id == id).map(a=> a.uid)].status == false || !banlist.some(a=> a.id == id)){
        lolka.acc.ban = false
        return lolka
    }
    var i = banlist.filter(a=> a.id == id).map(a=> a.uid)
    if(banlist[i].system == true && array.code != 228){
        lolka.acc.system = true
        return lolka
    }
        banlist[i].reason = ""
        banlist[i].time = ""
        banlist[i].status = false
        banlist[i].author = ""
        banlist[i].before = ""
        banlist[i].system = false
    var text_user = "✔ Вы разбанены!"
    sendvk({text: text_user, id: id, att: "photo474668811_456247890"})
    return lolka
}
function forbans(){
    banlist.filter(a=> a.status == true && a.before != 0 && a.before != "").map((ban) => {
        ban.before -= 1
        if(ban.before <= 0){
            unban({id: ban.id, author: "Система авторазбана", code: 228})
        }
    })
}
module.exports = {
    antispam,
    ban,
    unban,
    forbans
}