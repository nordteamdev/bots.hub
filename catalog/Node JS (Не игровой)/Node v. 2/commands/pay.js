const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /(Передать|Pay) ([0-9]+) ([^]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
if(!Number(args[2]) || !Number(args[3])) return msg.send("[⛔]error » Id или Сумма не числовые!")
	if(!accs.some || args[2] < 0 || Number(args[3]) < 1) return msg.send("[⛔]error - Не корректно введены данные!")
if(accs[i].balance < Number(args[3])) return msg.send("[⛔]error » Не хватает монеток!\n💰Ваш баланс » "+accs[i].balance+" монеток")
	accs[i].balance -= Number(args[3])
	accs[args[2]].balance += Number(args[3])
	msg.send("🔔Передача на ID » "+args[2]+"\n💳Суммы » "+Number(args[3])+" монеток\n👊-Успешно выполнена!")
             },
	rights: 0, 
	desc: "pay", 
	type: "all", 
	typ: "game" 
}