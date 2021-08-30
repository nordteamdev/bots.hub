const accs = require("../data/accs.json")
const ggg = require("../plugins/functions.js").getRights
const mes = require("../settings/messages.json")
module.exports = {
    r: /(cif|чат|беседа) ([0-9]+)/i,
    f: function (msg, args, vk, bot){
            if(args[2] == 0) return
            vk.messages.getChat({
                chat_id: args[2],
                fields: "sex"
            }).then(function (res) {
                if(res.admin_id == 0) return bot({text:"Такой беседы не существует!"});
                if(!res.users[0]) return bot({text:"Меня кикнули из этой беседв"});
                bot({text:"\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nℹ Информация по беседе "+ args[2] +" | ✏ Название беседы: "+res.title+"\n👱 Создатель беседы: *id"+res.admin_id+"\nПользователи беседы (Всего: "+ res.users.length + " пользователей): \n"+ res.users.map(a=> "[id" + a.id + "|" + a.first_name + " " + a.last_name + "]").join(', ')});
            })
        },
	rights: 3,
    desc: "беседа <<ID чата>> -- информация о беседе",
    type: "all"
}