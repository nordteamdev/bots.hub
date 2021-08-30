const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /(pay) ([0-9]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
	if(!args[1] || !args[2]) return message.send(`👉 » Пример команды: передать ID СУММА`)
	if(!Number(args[1]) || !Number(args[2])) return message.send(`👉 » ID и СУММА должны быть числового вида.`)
	if(!accs.some || args[2] < 0) return message.send(`👉 » Некорректно введены данные`)
	if(args[2] > user.balance) return message.send(`👉 » У вас нет столько $`);
	accs[i].balance -= Number(args[2]);
	accs[i].balance += Number(args[2])
             },
	rights: 0, 
	desc: "pay", 
	type: "all", 
	typ: "game" 
}