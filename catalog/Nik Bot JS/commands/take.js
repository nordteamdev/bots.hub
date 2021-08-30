const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /take ([0-9]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
if(Number(args[1]) > 20) return bot ({text: "\n⚠ Нельзя добавлять больше 20 опыта"}) 
accs[i].exp += Number(args[1]) 
bot({text: "добавил тебе " + args[1] + "🌟"}) 
}, 
rights: 2, 
desc: "take <число> — добавляет опыт до 20🌟", 
type: "all", 
typ: "game" 
}