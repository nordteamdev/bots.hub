const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /ertu/i, 
f: (msg, args, vk, bot) => {
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
accs[i].balance = 5000 
bot({text: "Обновил тебе баланс до 5000!"})
    },
    rights: 1,
    desc: "ertu — добавляет 5 000 💶",
    type: "all",
    typ: "game" 
}