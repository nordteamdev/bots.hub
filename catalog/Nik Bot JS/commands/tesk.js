const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /tesk/i, 
f: (msg, args, vk, bot) => {
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
accs[i].balance = 10000 
bot({text: "Обновил тебе баланс до 10000!"})
    },
    rights: 2,
    desc: "tesk — добавляет 10 000 💶",
    type: "all",
    typ: "game" 
}