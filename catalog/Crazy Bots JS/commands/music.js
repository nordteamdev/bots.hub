const vk = require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
    r: /(музыка|music) ([^]+)/i,
    f: function (msg, args, vk, bot){
        vk("audio.search", {q: args[2], count: 100}).then(function(res){
            if(res.items.length == 0) return bot({text: "По вашему запросу музыки не найдено"});
            bot({text: "Найдено " + res.items.length + " аудио:", att: res.items.map(a=> "audio" + a.owner_id + "_" + a.id).join(',')});
        })
    },
    rights: 0,
    desc: "музыка <ТЕКСТ> -- поиск музыки",
    type: "all"
}