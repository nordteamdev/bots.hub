const update = require("../data/info.json")
module.exports = {
    r: /журнал/i,
    f: function (msg, args, vk, bot){
        try{
        bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЖурнал разработки: \n\n" + update.map(a=> replacer(a.type) + " " + a.text).join("\n") + "\n\nЗначки обозначения: \n ⚠ - в разработке, ✅ - в тестировании, ❌ - удаленные команды\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
        }catch(err){
            msg.send(err)
        }
    },
    rights: 0,
    desc: "журнал -- журнал разработки бота",
    type: "all"
}
function replacer(text){
    if(text == 1) return "⚠"
    if(text == 2) return "✅"
    if(text == 3) return "❌"
}