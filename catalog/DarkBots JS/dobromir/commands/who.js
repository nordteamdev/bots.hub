const request = require("request");
const rand = require("../plugins/functions.js").rand
module.exports = {
    r: /(кого|who|кто) ([^]+)/i,
    f: function (msg, args, vk, bot){
        var phrases = rand(['Это','Мои пизды подсказывают это','Мои сканеры анализируют это ведь','Гадалка предсказывает что это','Сто пудова это','Анализирую это',])
        vk("messages.getChatUsers",{
            chat_id: msg.chat_id,
            fields: "photo_100"
        }).then(function (res) {
            var user = res.filter(a=> !a.deactivated && a.type == "profile").map(a=> a)
            user = rand(user);
            bot({text: phrases + " - [id"+user.id+"|"+user.first_name+" "+user.last_name+"]"});
        })
    },
    rights: 0,
    desc: "кто <ТЕКСТ> -- выберит кто есть кто",
    type: "chat"
}