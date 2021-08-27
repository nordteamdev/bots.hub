const quiz = require("../plugins/lobby.js").quiz
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /викторина (начать|остановить|ответ|подсказка)\s?([^]+)?$/i,
	f: function (msg, args, vk, bot){
       if(!msg.chat) return
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
	   if(args[1].toLowerCase() == 'начать'){
           var q = quiz.starting(msg.chat)
           if(q == true) return bot({text: '❌ | Викторина уже начата!'})
           bot({text: `⚡ | Викторина началась!!!
           📖 | Вопрос: ${q.answer}
           🎁 | Приз: ${q.price} поинтов
           📢 | Чтобы дать ответ : Викторина ответ [слово or число] (без [])
           💡 | Подсказка: Викторина подсказка. Подсказка стоит ${Math.floor(q.price / 2)}.
           `})
       }
       if(args[1].toLowerCase() == 'остановить'){
           var q = quiz.stop(msg.chat)
           if(q == false) return bot({text: '❌ | Викторина уже остановлена!'})
           bot({text: `⚡ | Викторина остановлена!`})
       }
       if(args[1].toLowerCase() == 'ответ'){
           if(!args[2]) return
           var q = quiz.check(msg.chat, args[2])
           if(q == false) return bot({text: '❌ | Викторина не начата!'})
           if(q.status == false) {accs[i].balance += Number(q.price); return bot({text: `✅ | Правильно ответил(а) *id${msg.user} (${accs[i].nickname}) — «${q.word}»
           🎁 | Награда : ${q.price} поинтов`})}
           bot({text: `❌ | Неправильно, подумай и напиши ответ еще раз.`})
       }
       if(args[1].toLowerCase() == 'подсказка'){
           var q = quiz.hint(msg.chat)
           if(q == false) return bot({text: '❌ | Викторина не начата!'})
           if(accs[i].balance < Math.floor(q.price / 2)) return bot({text: `❌ | Недостаточно средств чтобы использовать подсказку`})
           accs[i].balance -= Math.floor(q.price / 2)
           bot({text: `💵 | С вашего счета списано ${Math.floor(q.price / 2)} поинтов за подсказку
           💡 | Подсказка: ${q.hint.join('')}
           🎁 | Приз: ${q.price} поинтов`})
    }
	},
	desc: "викторина <начать|остановить|ответ|подсказка> [тут ответ] -- викторина",
	rights: 0,
	type: "all",
	typ: "prosto"
}