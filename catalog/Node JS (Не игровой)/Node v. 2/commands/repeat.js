module.exports = {
    r: /(повтори) ([^]+)/i,
    f: function (msg, args, vk, bot){
        return bot({text: args[2]})
    },
    rights: 1,
    desc: "повтори <ТЕКСТ> -- повторяет ваш текст",
    type: "all"
}