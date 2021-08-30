const global = require("../main.js")
const times = require("../plugins/functions.js").time
const VK = require('vk-io')
const vk = new VK()
const config = require("../settings/config.js")
vk.setToken(config.token)
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
        if(user >= 40){
            var reasons = ["Не строчи так много!", "Нарушение правила №1.2 | Подробнее тут -->"]
            ban({id: Number(users[s].id), before: 300, reason: rand(reasons), author: "Система антиспама/антифлуда", system: true})
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
    banlist.some(a=> a.id == id) == false ? banlist.push({id: id, status: false, reason: "", before: "", author: "", system: false, time: "", uid: banlist.length}) : null
    var i = banlist.filter(a=> a.id == array.id).map(a=> a.uid)
    if(banlist[i].status == true){
        lolik.acc.ban = true
        return lolik
    }
    if(config.eval.indexOf(id) != -1){
        lolik.acc.protect = true
        lolik.acc.status = false
        return lolik
    }
    var bef = ""
    if(array.before != ""){
        bef = convertTime(array.before)
    }else{
        bef = "навсегда"
    }
    banlist[i].status = true
    banlist[i].before = array.before
    banlist[i].reason = array.reason
    banlist[i].author = array.author
    banlist[i].system = array.system
    banlist[i].time = time(2)
    lolik.ban.reason = array.reason
    lolik.ban.before = array.before
    var text_user = "⚠ Вы забанены!\n👦 Автор бана: "+ array.author +"\n⏳ Вы забанены на "+ bef +"\n⏰ Время блокировки: " + times(2) + "\n✉ Причина бана: " + array.reason + "\n➡ Если это не так пишите это сюда ==> " + config.ban_topic
    sendvk({text: text_user, id: array.id, att: "photo-150252159_456239048"})
    return lolik
}
function sendvk(array){
    if(!array.att){
        var att = ""
    }else{
        var att = array.att
    }
    vk.api.call("messages.send", {user_id: array.id, message: array.text, attachment: att})
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
    var text_user = "✔ Вы разбанены!\n♦ Разбанил: " + array.author + "\n⏰ Время разблокировки: " + time(2)
    sendvk({text: text_user, id: id, att: "photo-150252159_456239047"})
    return lolka
}
function forbans(){
    banlist.filter(a=> a.status == true && a.before != 0 && a.before != "").map((ban) => {
        ban.before -= 1
        if(ban.before <= 0) unban({id: ban.id, author: "Система авторазбана", code: 228})
    })
}
module.exports = {
    antispam,
    ban,
    unban,
    forbans
}