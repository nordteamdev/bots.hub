const accs = require("../data/accs.json")
const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
    r: /(trade|передать) ([0-9]+)/i,
    f: function (msg, args, vk, bot){
    vk("messages.getById", {message_ids: msg.id}).then((res) => {
        var balance = args[2]
        if(!res.items[0].fwd_messages) return bot({text: "Надо пересланное сообщение с пользователем которому хочешь передать 💵."})
        if(balance > 1000000 || balance < 1) return bot({text: "Максимальная передача - 1000000 💵.Минимальная передача - 1 💵"})
        if(!accs.some(a=> a.id == Number(res.items[0].fwd_messages[0].user_id))) return bot({text: "Данного пользователя *id"+ res.items[0].fwd_messages[0].user_id + " нет в базе аккаунтов"})
        var lol = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
        if(accs[lol].rights == 0){
            var comm = 10
        }else if(accs[lol].rights == 1){
            var comm = 7
        }else if(accs[lol].rights == 2){
            var comm = 5
        }else if(accs[lol].rights == 3){
            var comm = 2
        }else if(accs[lol].rights == 4){
            var comm = 0
        }
        var commision = Number(balance)/100*comm
        commision = commision*comm
        var right = Number(balance) + Number(commision)
        if(accs[lol].spots < right) return bot({text: "\nНе хватает денег чтобы перевести другому пользователю. Надо " + right + " 💵 (с комиссией " + comm + "%)."})
        var a = accs.filter(a=> a.id == Number(res.items[0].fwd_messages[0].user_id)).map(a=> a.uid)
        accs[a].spots += Number(balance)
        accs[lol].spots -= right
        bot({text: "\n👦 | Передача денег пользователю *id"+ Number(res.items[0].fwd_messages[0].user_id) + " выполнена!\n👦 | Передано (с комиссией " + comm + "%) " + Number(balance) + "💵\n🎁 | Ваш баланс: " + accs[lol].spots + "💵"})
    })
    },
    right: 0,
    desc: "передать <количество денег> -- обязательно с пересланным сообщение, передать ботсы другому игроку.",
    type: "game"
}