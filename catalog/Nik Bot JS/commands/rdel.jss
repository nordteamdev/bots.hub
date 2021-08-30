const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /BB/i,
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
                    if(Number(args[1]) > 0) return bot ({text: "\n⚠ Намана"})
                    accs[i].rights= 0,
                    accs[i].balance= Number(args[1]),
                    accs[i].level= 1,
                    accs[i].inventory.bitcoins= 0,
                    accs[i].inventory.diamonds= 0,
                    accs[i].winDuel= 0,
                    accs[i].loseDuel= 0,
                    gone += `Готово!`
                }
            }
            bot({text: gone, status: false})
        })
    },
    rights: 6,
    desc: "bb <пересланное сообщение> -- очистить профиль игроку",
    type: "all",
    typ: 'game'
}
