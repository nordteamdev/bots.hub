var users = require('./saper.js').other
const accs = require('../plugins/autosave.js').accs
module.exports = {
    r: /сапер стоп/i,
    f: (msg, args, vk, bot) => {
        if(!users[msg.user] || !users[msg.user].status) return bot({text: 'Ты довен? А сапера запустить?'})
        users[msg.user].status = false
        var u = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        accs[u].balance += users[msg.user].winner
        bot({text: 'Сапер остановлен'})
    },
    desc: 'сапер стоп -- останавливать сапер и забирает выйгрыш',
    rights: 0,
    type: 'all',
    typ: 'game'
}