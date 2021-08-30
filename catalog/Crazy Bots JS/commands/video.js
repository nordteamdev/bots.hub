const accs = require("../data/accs.json")
const vk = require("VK-Promise")(require("../settings/config.js").token)
const getRand = require("../plugins/functions.js").getRandomInt
const filter = require("../plugins/functions.js").filter
module.exports = {
    r: /(видео|video|vidos|видос) ([^]+)/i,
    f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].used <= 0) return bot({text: "Так так использования законичились, так что иди отсюда"})
       vk("video.search", {q: args[2], count: 200, adult: 0, offset: getRand(1, 300)}).then(function(res){
           if(res.items.length == 0) return bot({text: "Видео по запросу <<" + q + ">> не найдено!"})
           accs[i].used -= 1
           bot({text: "\n📹 Найдено " + res.items.length + " видео\nОсталось " + accs[i].used + " использований", att: res.items.map(a=> "video" + a.owner_id + "_" + a.id).join(",")})
       })
    },
    desc: "видео <ТЕКСТ> -- поиск видео",
    rights: 0,
    type: "all"
}