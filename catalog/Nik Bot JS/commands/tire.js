const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /tire ([0-9]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
if(Number(args[1]) > 10) return bot ({text: "\n⚠ Нельзя добавлять больше 10 опыта"}) 
accs[i].exp += Number(args[1]) 
bot({text: "добавил тебе " + args[1] + "🌟"}) 
}, 
rights: 1, 
desc: "tire <число> — добавляет опыт до 10🌟", 
type: "all", 
typ: "game" 
}