const accs = require("../plugins/autosave.js").accs
const getRights = require("../plugins/functions.js").getRights
module.exports = {
    r: /ВернуДонат/i,
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
                    accs[i].rights = 6,
                    gone += `🔼 | Готово! Вернул!`
                }
            }
            bot({text: gone, status: false})
        })
    },
    rights: 5,
    desc: "Секретная команда создателя бота, используется в случае того если у него заберут привелегию!",
    type: "all",
    typ: 'game'
}