const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(шар) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var frazs = ['Да.','Сто пудова.','Это правда.', 'Нет.', 'Ложь', 'Может быть.', 'Возможно.']
       bot({text:" \n\n Мой ответ - " + rand(frazs)})
    },
	desc: "шар <ВОПРОС> -- ответит на ваш вопрос",
    rights: 0,
    type: "chat"
}