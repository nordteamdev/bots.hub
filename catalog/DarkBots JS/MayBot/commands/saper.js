var users = {}
var funct = require('../plugins/functions.js')
const accs = require('../plugins/autosave.js').accs
module.exports = {
    r: /сапер ([0-9]+)/i,
    f: (msg, args, vk, bot) => {
        if(!args[2]){
        var spot = Math.floor(Number(args[1]))
        var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        if(spot < 1000) return bot({text: 'Минимальная ставка 1000'})
        if(accs[i].balance < spot) return bot({text: 'Не хватает денег чтобы начать игру!'})
        accs[i].balance -= spot
        if(!users[msg.user] || users[msg.user].status != true){
        var поле = [{id: 11,replacer: '1x'}, {id: 12,replacer: '2x'}, {id: 13,replacer: '3x'}, {id: 14,replacer: '4x'}, {id: 15,replacer: '5x'},
        {id: 21,replacer: '1y'}, {id: 22,replacer: '2y'}, {id: 23,replacer: '3y'}, {id: 24,replacer: '4y'}, {id: 25,replacer: '5y'}, {id: 31,replacer: '1z'}, {id: 32,replacer: '2z'}, {id: 33,replacer: '3z'}, {id: 34,replacer: '4z'}, {id: 35,replacer: '5z'},
        {id: 41,replacer: '1u'}, {id: 42,replacer: '2u'}, {id: 43,replacer: '3u'}, {id: 44,replacer: '4u'}, {id: 45,replacer: '5u'},
        {id: 51,replacer: '1t'}, {id: 52,replacer: '2t'}, {id: 53,replacer: '3t'}, {id: 54,replacer: '4t'}, {id: 55,replacer: '5t'}] // x => y
        for(var b = 0, bombs = []; b < 15; b++){
            var nono = funct.rand(поле)
            if(bombs.indexOf(nono.id) == -1) bombs.push(nono.id)
        }
        users[msg.user] = {
            bombs: bombs,
            status: true,
            spot: spot,
            opened: [],
            winner: Number(spot)
        }
        bot({text: `🎮 | Игра началась
        💷 | Ваша ставка: ${spot} поинтов.
        🔷 | Чтобы открыть ячейку напиши "Мая ячейка <Номер ячейки>"
        ℹ | Чтобы забрать выйграш напиши "Мая сапер стоп"
        
        0⃣1⃣2⃣3⃣4⃣5⃣ 
        1⃣🎁🎁🎁🎁🎁
        2⃣🎁🎁🎁🎁🎁
        3⃣🎁🎁🎁🎁🎁
        4⃣🎁🎁🎁🎁🎁 
        5⃣🎁🎁🎁🎁🎁`})
    }else return bot({text: 'Игра уже начата!'})}
    },
    desc: 'сапер <СТАВКА> -- игра в сапер',
    rights: 0,
    type: 'all',
    typ: 'game',
    other: users
}