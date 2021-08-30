var data = require("../plugins/console.js").data
var mess = []
module.exports = {
    r: /(log|лог)/i,
    f: function (msg, args, vk, bot){
       var gone = ""
       if(data.length >= 10){
          for(var l = data.length - 10; l < data.length; l++){
              gone += check(data[l].level) + " ["+ data[l].date +"] [PEER: " + data[l].peer + "] [USER: "+ data[l].id + "\n" 
          }
        }
          bot({text: gone + "\n\nВсего сообщений в логе: " + data.length})
    },
    rights: 8,
    desc: "log -- лог -_-",
    type: "all"
}
function check(type){
    if(type == "error") return "[ERROR]"
    if(type == "info") return "[INFO]"
    if(type == "log") return "[LOG]"
    if(type == "warn") return "[WARNING]"
}