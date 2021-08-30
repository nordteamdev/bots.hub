const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /bb/i,
    f: function (msg, args, vk, bot){
        vk.api.call("messages.getById", {message_ids: msg.id}).then((res) => {
            if(!res.items[0].fwd_messages) return bot({text: `✉ Обязательно перешлите сообщение!`})
            var gone = ''
            for(var t = 0; t < res.items[0].fwd_messages.length; t++){
                var user = Number(res.items[0].fwd_messages[t].user_id)
                if(!accs.some(a=> a.id == user)){
                    gone += `\nУ пользователя *id${user} нет в базе аккаунтов`
                }else{
                    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
                    accs[i].rights=0
                    gone += `⛔ Администратор снят`
                }
            }
            bot({text: gone, status: false})
        })
    },
    rights: 5,
    desc: "BB <Пересланное сообщение> -- Снять Администратора",
    type: "all",
    typ: 'game'
}
