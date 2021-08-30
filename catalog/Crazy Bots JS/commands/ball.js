const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(шар|ball) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var frazs = ['Да.','Сто пудова.','Это правда.', 'Нет.', 'Может быть.', 'Возможно.']
       bot({text:" \n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n\n Мой ответ - " + rand(frazs)})
    },
	desc: "шар <ВОПРОС> -- ответит на ваш вопрос",
    rights: 0,
    type: "chat"
}