const accs = require("../data/accs.json")
const rand = require("../plugins/functions.js").getRandomInt
const gen = require("../plugins/functions.js").generation
module.exports= {
    r: /(double|rgb|ргб) (r|g|b|к|з|ч) ([0-9]+)/i,
    f: function (msg, args, vk, bot){
       args[3] = Number(args[3])
       if(args[3] > 100000000000000000000000000000000000) return bot({text: "Превышен лимит ставки. Макс лимит - 100000000000000000000000000000000000 мани."})
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].spots < args[3]) return bot({text: "Ставка превышает твой баланс."})
       if(accs[i].spots <= 0) return bot({text: "Твой баланс меньше нуля."})
       var fuck = {
           "r": 50,
           "b": 25,
           "g": 5
       }
       var pr = rand(0, 50)
       if(pr <= fuck.r && pr > fuck.b){
           var color = "красное"
           var c = "r"
           var lel = "к"
           var balance = 2
           var att = "photo183533453_456240728"
       }else if(pr <= fuck.b && pr > fuck.g){
           var color = "черное"
           var c = "b" 
           var lel = "ч"
           var balance = 2
           var att = "photo183533453_456240729"
       }else if(pr <= fuck.g){
           var color = "зелёное"
           var c = "g"
           var lel = "з"
           var balance = 14
           var att = "photo183533453_456240727"
       }
       if(args[2] == c || args[2] == lel){
           var ogor = "выйграли"
           var lol = "w" //win
           accs[i].spots += Number(args[3])*balance
       }else{
           var ogor = "проиграли"
           var lol = "l" //lose
           accs[i].spots -= Number(args[3])
       }
       bot({text:"Вам выпало " + color + ".\nВы " + ogor + " " + check(lol, balance)*Number(args[3]) + " 💵.\nВаш баланс: " + accs[i].spots + " 💵.", att: att})
    },
    desc:"ргб <К|З|Ч> <СТАВКА> -- [красное x2], [зеленое x14], [черное x2] тип рулетки",
    rights: 8,
    type: "all"
}
function check(text, kof){
    if(text == "l") return 1
    if(text == "w") return kof
}