const rand = require("../plugins/functions.js").rand
const accs = require("../plugins/autosave.js").accs
module.exports = {
	
	r: /(Слоты) ([^]+)/i,
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		var ss = Number(args[2])
		var wins = Number(args[2])
		if(isFinite(Number(args[2])) == false) return bot({text: "[⛔]error » Введите числовую ставку!"})
		if(ss < 1) return bot({text: "[⛔]error » Введите адекватную ставку!"})
		if(accs[i].balance < ss) return bot({text: "[⛔]error » Не хватает монеток!\n💸Ваш баланс » "+accs[i].balance+" монеток"})
		
		
var smiles = ["💥", "🐬", "😎"]

var x1 = rand(smiles)
var x2 = rand(smiles)
var x3 = rand(smiles)
var y1 = rand(smiles)
var y2 = rand(smiles)
var y3 = rand(smiles)
var z1 = rand(smiles)
var z2 = rand(smiles)
var z3 = rand(smiles)

var line = ""
		
line += (x1 == x2 && x2 == x3) ? "😎Вам выпала линия 1\n⚠Ставка умножена в 2 раза!\n---\n": "";
wins *= (x1 == x2 && x2 == x3) ? 2: 1;

line += (y1 == y2 && y2 == y3) ? "😎Вам выпала линия 2\n⚠Ставка умножена в 2 раза!\n---\n": "";
wins *= (y1 == y2 && y2 == y3) ? 2: 1;

line += (z1 == z2 && z2 == z3) ? "😎Вам выпала линия 3\n⚠Ставка умножена в 2 раза!": "";
wins *= (z1 == z2 && z2 == z3) ? 2: 1;
accs[i].balance -= ss
wins -= (line == "") ? ss: 0;
accs[i].balance += (line == "") ? 0: wins;
bot({text: "|"+x1+"|"+x2+"|"+x3+"| - линия 1\n|"+y1+"|"+y2+"|"+y3+"| - линия 2\n|"+z1+"|"+z2+"|"+z3+"| - линия 3\n\n"+line+"\n\n🔔Ваш выигрыш » "+wins+" монеток\n💲Баланс » "+accs[i].balance+" монеток"})
    },
	desc: "",
	rights: 0,
	type: "chat"
}

