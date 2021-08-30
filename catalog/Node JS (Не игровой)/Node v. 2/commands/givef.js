const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /givef ([0-9]+)/i,
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
                    if(Number(args[1]) > 3000000000) return bot ({text: "\n⚠ Нельзя накручивать больше 3000000000 ботсов"})
                    accs[i].balance += Number(args[1])
                    gone += `\nПользователю [id${accs[i].id}|${accs[i].nickname}] было добавлено ${args[1]} коинов.`
                }
            }
            bot({text: gone, status: false})
        })
    },
    rights: 4,
    desc: "givef <пересланные сообщения> <КОЛ-во коинов> -- выдать коины игрокам",
    type: "all",
    typ: 'game'
}
