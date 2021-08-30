const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /adds ([0-9]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
if(Number(args[1]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 коинов"}) 
accs[i].balance += Number(args[1]) 
bot({text: "добавил тебе " + args[1] + "💵"}) 
}, 
rights: 3, 
desc: "adds <число> — добавляет деньги", 
type: "all", 
typ: "game" 
}