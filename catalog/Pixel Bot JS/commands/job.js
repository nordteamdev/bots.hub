const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = {
    r: /(Работать|Work) ([^]+)/i,
    f: function (msg, args, vk, bot){
       if(!work[args[2]]) return bot({text: '❌ | Такой работы не существует!'})
       	 if(work[args[2]].users.indexOf(msg.user) != -1) return bot({text: '❌ | Ты уже отработал подожди 10 минут!'})
        bot({text: "Тест работы еще не доделаны"})
	}, 
	desc: "проф <<ID пользователя>> -- проверить у него профиль",
	rights: 3,
	type: "all",
	type: "prosto"
}