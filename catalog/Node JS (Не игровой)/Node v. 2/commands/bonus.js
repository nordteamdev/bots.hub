const rand = require("../plugins/functions.js").rand
const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /(бонус)/i,
    f: function (msg, args, vk, bot){
	if(accs.bonus == true) return bot ({text: "\n⚠ Бонус можно брать только раз в сутки!"})
	accs.bonus = true
		setTimeout(() => {
			accs.bonus = false
		}, 15000);
		var tmp = [30000,50000,100000,150000,200000,5000000]
		accs.balance += tmp;
		return bot({text:"Вы открыли бонус и получили: "+rand(tmp)})
    },
    rights: 0,
    desc: "",
    type: "all"
}