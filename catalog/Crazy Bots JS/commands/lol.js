const rand = require("../plugins/functions.js").rand
const answers = require("../settings/answers.json")
const request = require("request")
module.exports = {
	r: /(lol|лол) ([^]+)/i,
	f: function (msg, args, vk, bot){
		var text = args[2].toLowerCase()
       /*if(answers.some(a=> a.answer.toLowerCase() == text)){
           var ans = answers.filter(a=> a.answer.toLowerCase() == text).map(a=> a.otvet)
           if(ans.length > 1){
              var i = rand(i)
           }else{
              var i = ans
           }
        }else{
           var i = rand(answers).otvet
        }
        if(i == ""){
            var k = []
            var t = []
           for(var g = 0; l < 10; l ++){
               k.push(rand(answers).otvet)
           }
           for(var l = 0; l < k.length; l ++){
               if(k[l] != ""){
                  t.push(k)
               }
           }
           i = rand(t)
        }
        if(i == undefined || i == ""){
            a = ['Продолжай...', 'Ага']
            i = rand(a)
        }
           bot({text: i})*/
           request.get("https://andriy2.tk/api/talk?q="+ encodeURIComponent(text), (e, r, b) => {
            if(!b) return bot({text: "Ошибка"})
            var data = JSON.parse(b)
            bot({text: data.message})
        })
	},
	desc: "лол <ТЕКСТ> -- общение с ботом",
	rights: 0,
	type: "all"
}