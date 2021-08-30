module.exports = {
    r: /(зови)/i,
    f: function (msg, args, vk, bot){
        if(!msg.chat) return
        vk.api.call("messages.getChatUsers",{
            chat_id: msg.chat,
            fields: "photo_100"
        }).then(function (res) {
            bot({text: "Вызываем: \n" + res.filter(a=> !a.deactivated && a.type == "profile").map(a=> "💨 [id" + a.id + "|" + a.first_name + " " + a.last_name + "]").join("\n")})
        })
    },
    rights: 0,
    desc: "зови -- зовет всех из беседы",
    type: "all",
    typ: "prosto"
}