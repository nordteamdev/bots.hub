const cases = require("../settings/chance_cases.json")
module.exports = {
    r: /(чат маи|беседа маи)/i,
    f: function (msg, args, vk, bot){
    vk.api.messages.addChatUser({chat_id: 16, user_id: msg.user}).then(res =>
        {bot({text: `Ты добавлен в мою беседу! =)`})}
    ).catch(err => {
        bot({text: `Ой-ой, ты не был добавлен в мою беседу!
        
        Возможные причины:
        1) Ты уже в беседе
        2) Тебя нет у меня в друзьях`})
    })
    },
    rights: 0,
    desc: "чат маи -- беседа Маи =)",
    type: "all",
    typ: "prosto"
}