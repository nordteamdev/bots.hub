const request = require("request")
const key = 'trnsl.1.1.20171222T132221Z.fbf2cf596e2b761e.a1b798767f783060345b01389031ac433c854493'
module.exports = {
    r: /(переведи|translate) ([^]+):([^]+)/i,
	f: function (msg, args, vk, bot){
       request.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${encodeURIComponent(key)}&lang=${args[2]}&text=${encodeURIComponent(args[3])}`, (e, r, b) => {
           if(!b || JSON.parse(b).code != 200) return
           bot({text: "Перевод: " + JSON.parse(b).text[0]})
       })
	},
	rights: 0,
	desc: "переведи <ЯЗЫК на англ, пример: ru>:<ТЕКСТ> -- переводчик",
	type: "all",
	typ: "prosto"
}