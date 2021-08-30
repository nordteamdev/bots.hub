const rand = require("../plugins/functions.js").rand
module.exports = {
    r: /(кого|who|кто) ([^]+)/i,
    f: function (msg, args, vk, bot){
        var phrases = rand(['Мои показатели показывают на', 'Мои сенсоры показывают на', 'Я думаю, что это', 'Кто кто.. это', 'Сто пудова это', 'По-любому это'])
        vk.api.call("messages.getChatUsers",{
            chat_id: msg.chat,
            fields: "photo_100"
        }).then(function (res) {
            var user = res.filter(a=> !a.deactivated && a.type == "profile").map(a=> a)
            user = rand(user);
            bot({text: `${phrases} ${user.first_name} ${user.last_name}`});
        })
    },
    rights: 0,
    desc: "кто <ТЕКСТ> -- выберит случайного пользователя",
    type: "chat",
    typ: 'prosto'
}