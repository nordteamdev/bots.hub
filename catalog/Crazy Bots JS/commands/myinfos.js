const fs = require('fs')
const update = require("../data/info.json")
module.exports = {
    r: /dev (add|change) ([^]+);([1-3])/i,
    f: function (msg, args, vk, bot){
       if(args[1] == "add"){
              update.push({text: args[2], type: Number(args[3]), uid: update.length})
              return bot({text: `\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nВ журнал разработки добавлено <<${args[2]}>> с типом <<${check(args[3])}>>\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~`})
       }
       if(args[1] == "change"){
           var num = Number(args[2])
           var rightnum = num - 1
           update[rightnum].type = Number(par)       
           return bot({text: `\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПараметр <<${args[2]}>> изменен на <<${check(args[3])}>>\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~`})
       }
    },
    desc: "dev <add|change> <params>;<params2> -- Журнал разработки",
    rights: 7,
    type: "all"
}
function check(type){
    if(type == 1) return "в разработке"
    if(type == 2) return "команда сделана"
    if(type == 3) return "команда удалена"
}