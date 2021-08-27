const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /накрути ([0-9]+)$/i,
    f: function (msg, args, vk, bot){
        vk.api.call("messages.getById", {message_ids: msg.id}).then((res) => {
            if(!res.items[0].fwd_messages) return
            var gone = ''
            for(var t = 0; t < res.items[0].fwd_messages.length; t++){
                var user = Number(res.items[0].fwd_messages[t].user_id)
                if(!accs.some(a=> a.id == user)){
                    gone += `\nУ пользователя *id${user} нет в базе аккаунтов`
                }else{
                    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
                    accs[i].balance += Number(args[1])
                    gone += `\nПользователю [id${accs[i].id}|${accs[i].nickname}] было накручено ${args[1]} поинтов.`
                }
            }
            bot({text: gone, status: false})
        })
    },
    rights: 3,
    desc: "накрути <пересланные сообщения> <КОЛ-во поинтов> -- накрутить поинты пользователям",
    type: "chat",
    typ: 'game'
}
