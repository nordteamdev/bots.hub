const request = require("request");
const rand = require("../plugins/functions.js").rand
module.exports = {
    r: /(кого|who|кто) ([^]+)/i,
    f: function (msg, args, vk, bot){
        var phrases = rand(['Мне кажется или, это', 'Я знаю, это', 'Это же очевидно, это', 'Мамой клянусь, это', 'Это', 'Вангую, это', 'Это ведь', 'Полюбому это', 'Это точно', 'Инфа сотка что это'])
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