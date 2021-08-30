const global = require("../main.js")
const times = require("../plugins/functions.js").time
const vk = new require("VK-Promise")(require("../settings/config.js").token)
const config = require("../settings/config.js")
const accs = require("../data/accs.json")
const rand = require("../plugins/functions.js").rand
function convertTime(time){
    return (time/60|0) + " минут " + (time%60|0) + " секунд"
}
function antispam(){
    const users = require("../main.js").users
	for(var s = 0; s < Number(users.length); s++){
        var user = users[s].mess
        if(user >= 80){
            var reasons = ["Твоим ручкам нужен отдых :3", "Не строчи так много!", "Не спамь/флуди так много!"]
            ban({id: Number(users[s].id), before: 900, reason: rand(reasons), author: "Система антиспам/антифлуда"})
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
        ban: false
    },
    ban: {
        id: array.id,
        author: array.author,
        reason: "",
        before: "",
        time: time(2)
    }
}
    const accs = require("../data/accs.json")
    if(accs.some(a=> a.id == id) == false){
        lolik.acc.status = false
        return lolik
    }
    var i = accs.filter(a=> a.id == array.id).map(a=> a.uid)
    if(accs[i].ban.status == true){
        lolik.acc.ban = true
        return lolik
    }
    var bef = ""
    if(array.before != ""){
        bef = convertTime(array.before)
    }else{
        bef = "навсегда"
    }
    accs[i].ban.status = true
    accs[i].ban.before = array.before
    accs[i].ban.reason = array.reason
    accs[i].ban.author = array.author
    lolik.ban.reason = array.reason
    lolik.ban.before = array.before
    var text_user = "⚠ Вы забанены!\n👦 Автор бана: "+ array.author +"\n⏳ Вы забанены на "+ bef +"\n⏰ Время блокировки: " + times(2) + "\n✉ Причина бана: " + array.reason + "\n➡ Если это не так пишите это сюда ==> " + config.ban_topic
    sendvk({text: text_user, id: array.id, att: "photo-137139998_456239538,video127513472_456239027"})
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
    const accs = require("../data/accs.json")
    var author = array.author
    var id = Number(array.id)
    var lolka = {
        acc: {
             id: array.id,
             ban: true,
             status: true
        },
        author: array.author,
        time: time(2)
    }
    if(accs.some(a=> a.id == id) == false){
        lolka.acc.status = false
        return lolik
    }
    var i = accs.filter(a=> a.id == id).map(a=> a.uid)
    if(accs[i].ban.status == false){
        lolka.acc.ban = false
        return lolka
    }
        accs[i].ban.reason = ""
        accs[i].ban.time = ""
        accs[i].ban.status = false
        accs[i].ban.author = ""
        accs[i].ban.before = ""
    var text_user = "✔ Вы разбанены!\n♦ Разбанил: " + array.author + "\n⏰ Время разблокировки: " + time(2)
    sendvk({text: text_user, id: id, att: "photo-137139998_456239540,video-45745333_456242763"})
    return lolka
}
function forbans(){
    accs.filter(a=> a.ban.status == true && a.ban.before != 0 && a.ban.before != "").map((acc) => {
        var ban = acc.ban
        ban.before -= 1
        if(ban.before <= 0){
            unban({id: acc.id, author: "Система авторазбана"})
        }
    })
}
module.exports = {
    antispam,
    ban,
    unban,
    forbans
}