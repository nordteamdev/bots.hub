const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /ertu/i,
    f: (msg, args, vk, bot) => {
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       accs[i].balance = 5000
       bot({text: "Обновил тебе баланс до 5к!", status: true, type: "send"})
    },
    rights: 1,
    desc: "🀄 | ertu — добавляет 5 000 💶"
}