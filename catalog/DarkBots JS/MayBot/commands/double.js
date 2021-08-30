const accs = require("../plugins/autosave.js").accs
const rand = require("../plugins/functions.js").getRandomInt
const gen = require("../plugins/functions.js").generation
var col = {
    'r': 2,
    'b': 2,
    'g': 14,
    'к': 2,
    'ч': 2,
    'з': 14
}
module.exports= {
    r: /(double|rgb|ргб) (r|g|b|к|з|ч) ([0-9]+)/i,
    f: function (msg, args, vk, bot){
       args[3] = Number(args[3])
       args[2] = args[2].toLowerCase()
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].balance <= 0) return
       if(accs[i].balance < args[3]) return bot({text: "Ставка превышает твой баланс."})
       if(accs[i].balance <= 0) return bot({text: "Твой баланс меньше нуля."})
       var fuck = {
           "r": 50,
           "b": 25,
           "g": 10
       }
       var pr = rand(0, 50)
       if(pr <= fuck.r && pr > fuck.b){
           var color = "красное"
           var c = "r"
           var lel = "к"
           var balance = 2
           var att = "photo-137139998_456239580"
       }else if(pr <= fuck.b && pr > fuck.g){
           var color = "черное"
           var c = "b" 
           var lel = "ч"
           var balance = 2
           var att = "photo-137139998_456239579"
       }else if(pr <= fuck.g){
           var color = "зелёное"
           var c = "g"
           var lel = "з"
           var balance = 14
           var att = "photo-137139998_456239578"
       }
       if(args[2] == c || args[2] == lel){
           var ogor = "выйграли"
           var lol = "w" //win
           accs[i].balance += Number(args[3])*balance
       }else{
           var ogor = "проиграли"
           var lol = "l" //lose
           accs[i].balance -= Number(args[3])*col[args[2]]
       }
       bot({text:"Вам выпало " + color + ".\nВы " + ogor + " " + check(lol, balance, args[2])*Number(args[3]) + " поинтов.\nВаш баланс: " + accs[i].balance + " поинтов.", att: att})
    },
    desc:"ргб <К|З|Ч> <СТАВКА> -- [красное x2], [зеленое x14], [черное x2] тип рулетки",
    rights: 0,
    type: "all",
    typ: "game"
}
function check(text, kof, lo){
    if(text == "l") return col[lo]
    if(text == "w") return kof
}