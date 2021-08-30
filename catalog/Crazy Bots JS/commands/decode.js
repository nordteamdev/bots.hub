const decode = require("../plugins/functions.js").decode
const filter = require("../plugins/functions.js").filter
module.exports = {
    r: /(decode|расшифруй) ([^]+)/i,
    f: function (msg, args, vk, bot){
       bot({text: decode(args[2])})    
    },
    rights: 7,
    desc: "СКОРО!!!!!!",
    type: "all"
}