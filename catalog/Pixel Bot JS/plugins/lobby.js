var chats = {}
const accs = require("./autosave.js").accs
var funct = require('./functions.js')
var quiz = require('../settings/quiz.json')
function lobby(chat){
    chats[chat] ? null : chats[chat] = {
        duel: {
            balance: 0,
            users_ids: [],
            winner: 0,
            loser: 0,
            ok: false
        },
        quiz: {
            answer: '',
            word: '',
            hint: [],
            price: 0,
            status: false
        }
    }
}
lobby.duel = (chat, user) => {
    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
    lobby(chat)
    chats[chat].duel.ok == true ? chats[chat].duel = {
        balance: 0,
        users_ids: [],
        winner: 0,
        loser: 0,
        ok: false
    } : null
    if(chats[chat].duel.users_ids.indexOf(user) > -1) return false
    if(chats[chat].duel.users_ids.length <= 1){
        chats[chat].duel.users_ids.push(user)
        chats[chat].duel.balance += accs[i].balance
        accs[i].balance = 0
        var huy = chats[chat].duel
    }
    if(chats[chat].duel.users_ids.length >= 2){
        chats[chat].duel.ok = true
        chats[chat].duel.winner = funct.rand(chats[chat].duel.users_ids)
        chats[chat].duel.loser = chats[chat].duel.users_ids.indexOf(chats[chat].duel.winner) == 0 ? chats[chat].duel.users_ids[1] : chats[chat].duel.users_ids[0]
        var huy = chats[chat].duel
    }
    return huy
}
quiz.starting = (chat) => {
     lobby(chat)
     if(chats[chat].quiz.status == true) return true
     var quizing = funct.rand(quiz)
     chats[chat].quiz.answer = quizing.question
     chats[chat].quiz.word = quizing.word.toLowerCase()
     chats[chat].quiz.status = true
     chats[chat].quiz.price = quizing.price
     chats[chat].quiz.hint = quizing.word.toLowerCase().replace(/([0а-я9])/ig, '*').split('')
     return chats[chat].quiz
}
quiz.stop = (chat) => {
    lobby(chat)
    if(chats[chat].quiz.status == false) return false
    chats[chat].quiz.answer = ''
    chats[chat].quiz.word = ''
    chats[chat].quiz.status = false
    chats[chat].quiz.price = 0
    return true
}
quiz.hint = (chat) => {
    lobby(chat)
    if(chats[chat].quiz.status == false) return false
    var hm = rand(chats[chat].quiz.hint)
    chats[chat].quiz.hint[hm.rand] = chats[chat].quiz.word.charAt(hm.rand)
    return chats[chat].quiz
}
quiz.check = (chat, word) => {
    lobby(chat)
    if(chats[chat].quiz.status == false) return false
    var checking = chats[chat].quiz.word == word.toLowerCase() ? true : false
    checking == true ? chats[chat].quiz.status = false : null
    return chats[chat].quiz
}
function rand(text) {
	var tts = Math.floor(text.length * Math.random())
	return {rand: tts, word: text[tts]}
}
module.exports = {
    lobby,
    quiz,
    chats
}
