const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /unmon ([0-9]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
if(Number(args[1]) > 50000000000000000000000000000000000000000000000000000000000000000000000000000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 коинов"}) 
accs[i].balance -= Number(args[1]) 
bot({text: "Зарбал у тебя " + args[1] + "💵"}) 
}, 
rights: 4, 
desc: "unmon <число> — отбирает деньги", 
type: "all", 
typ: "game" 
}