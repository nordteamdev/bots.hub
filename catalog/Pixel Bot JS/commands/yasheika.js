var users = require('./saper.js').other
var funct = require('../plugins/functions.js')
const accs = require('../plugins/autosave.js').accs
//my
module.exports = {
    r: /ячейка ([1-5]),?\s?([1-5])/i,
    f: (msg, args, vk, bot) => {
        var users = require('./saper.js').other
        var u = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        if(!users[msg.user] || users[msg.user].status == false) return bot({text: 'Ты ебобо? Начни игру через "Лео сапер <<ставка>>"'})
        var поле = [{id: 11,replacer: '1x'}, {id: 12,replacer: '2x'}, {id: 13,replacer: '3x'}, {id: 14,replacer: '4x'}, {id: 15,replacer: '5x'},
        {id: 21,replacer: '1y'}, {id: 22,replacer: '2y'}, {id: 23,replacer: '3y'}, {id: 24,replacer: '4y'}, {id: 25,replacer: '5y'}, {id: 31,replacer: '1z'}, {id: 32,replacer: '2z'}, {id: 33,replacer: '3z'}, {id: 34,replacer: '4z'}, {id: 35,replacer: '5z'},
        {id: 41,replacer: '1u'}, {id: 42,replacer: '2u'}, {id: 43,replacer: '3u'}, {id: 44,replacer: '4u'}, {id: 45,replacer: '5u'},
        {id: 51,replacer: '1t'}, {id: 52,replacer: '2t'}, {id: 53,replacer: '3t'}, {id: 54,replacer: '4t'}, {id: 55,replacer: '5t'}] // x => y
        var bombs = users[msg.user].bombs
        var texts = {
            bomb: `💣 | Тебе попалась бомба. Ты проигрываешь ${users[msg.user].spot}.`,
            yaika: `💎 | Ты открыл пустую ячейку. Твоя ставка увеличивается в 2 раза.
			ℹ | Чтобы забрать выигрыш напиши "Nik сапер стоп"
            💰 | Ваш выигрыш: %winner%`,
        }
        var ri = Number(args[1] + args[2])
        if(users[msg.user].opened.indexOf(ri) > -1) return bot({text: "Данная ячейка уже открыта!"})
        if(bombs.indexOf(ri) > -1){
            users[msg.user].status = false
         }else if(bombs.indexOf(ri) == -1){
            users[msg.user].winner += users[msg.user].spot
         }
        users[msg.user].opened.push(ri)
            bot({text: `%text%

            0⃣1⃣2⃣3⃣4⃣5⃣ 
            1⃣1x2x3x4x5x
            2⃣1y2y3y4y5y
            3⃣1z2z3z4z5z 
            4⃣1u2u3u4u5u 
            5⃣1t2t3t4t5t`.replace(/([1-5])([a-z])/ig, (x) => {
                 var i = поле.filter(a=> a.replacer == x).map(a=> Number(a.id))[0]
                 if(users[msg.user].opened.indexOf(i) > -1){
                     if(bombs.indexOf(i) > -1){ 
                        return ' 💣'
                     }else{
                        return ' 💲'
                     }
                 }else return '⚫'
            }).replace(/%text%/ig, (z) => {
                if(users[msg.user].status == false) return texts.bomb
                return texts.yaika.replace(/%winner%/, users[msg.user].winner)
            })
        })
    },
    desc: ' ячейка [номер ячейки]',
    rights: 0,
    type: 'all',
    typ: 'game'
}