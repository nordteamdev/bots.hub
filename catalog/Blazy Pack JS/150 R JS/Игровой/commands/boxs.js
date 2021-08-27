const accs = require("../plugins/autosave.js").accs
const random = require("../plugins/functions.js").getRandomInt
const mes = require("../settings/messages.json")
const num = require("../plugins/functions.js").replace
const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
var players = {}
module.exports = {
	    r: /(шляпы|шляпа)\s?([0-9]+)?\s?([0-9]+)?$/i,
	    f: function (msg, args, vk, bot){
           if(!args[2] || !args[3]){
              if(players[msg.user]) return bot({text: 'Игра уже начата!', status: true, type: "send"})
              var true_box = getRandomInt(1, 3)
              players[msg.user] = {box: true_box}
              bot({text: '🙈 Угадайте, в какой шляпе торт \n1 >> 🎩 | 2 >> 🎩 | 3 >> 🎩\n\n⚠ | Использование: Шляпа [номер] [ставка]'})
           }else{
              if(Number(args[2]) == 0 || Number(args[3]) == 0) return
              var true_box = getRandomInt(1, 3)
              players[msg.user] ? players[msg.user].box = true_box : null
              var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
              if(accs[i].balance < Number(args[3]) || accs[i].balance <= 0) return bot({text: 'Ставка превышает ваш баланс', status: true, type: "send"}) 
              var priz = '🎂'
              var box = '🎩'
              var ogo = players[msg.user].box == Number(args[2]) ? true : false
              ogo == true ? accs[i].balance += Math.round(Number(args[balance3]) * 2 + Number(args[3])/2) : accs[i].balance -= Math.round(Number(args[3]))
              var gone = `${ogo == true ? 'Правильно :)\n🤤 Ваша ставка была умножена в 2 раза' : 'Неверно :(\n🙉 Вы потеряли свою ставку'} \n1)￼ ${players[msg.user].box == 1 ? priz : box} | 2) ￼${players[msg.user].box == 2 ? priz : box} | 3) ${players[msg.user].box == 3 ? priz : box}￼ `
              bot({text: gone, status: true, type: "send"}) 
        }
		},
		desc: "🎩 | шляпы [НОМЕР ШЛЯПЫ] [СТАВКА] -- игра в <<Шляпы>>",
		rights: 0
}