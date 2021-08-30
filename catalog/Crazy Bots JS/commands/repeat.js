module.exports = {
    r: /(повтори|repeat) ([^]+)/i,
    f: function (msg, args, vk, bot){
        return bot({text: args[2]})
    },
    rights: 0,
    desc: "повтори <ТЕКСТ> -- повторяет ваш текст",
    type: "all"
}