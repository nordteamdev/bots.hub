module.exports = {
    r: /(clr|clear|очистка|чистка)/i,
    f: function (msg, args, vk, bot){
        bot({text: "&#4448;\n".repeat(1000)})
        bot({text: "Очистка беседы прошла успешно!"})
    },
    desc: "очистка -- чистка беседы",
    rights: 1,
    type: "chat"
}