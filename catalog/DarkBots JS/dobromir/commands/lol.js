const rand = require("../plugins/functions.js").rand
const answers = require("../settings/answers.json")
const request = require("request")
module.exports = {
	r: /(lol|лол) ([^]+)/i, 
	f: function (msg, args, vk, bot){ 
	var text = args[2].toLowerCase() 
	request.post("https://andriy2.tk/api/talk?q="+ encodeURIComponent(text), {form:{ 

	adminname: 'Андрей Королев', 
	adminfname: 'Андрей', 
	adminlname: 'Королев', 
	botname: 'Свинка Пеппа', 
	botfname: 'Свинка', 
	botlname: 'Пеппа', 
	adminvklink: 'vk.com/iamxyesos' 

	}}, (e, r, b) => { 
	if(!b) return bot({text: "Ошибка"}) 
	var data = JSON.parse(b) 
	bot({text: data.message}) 
	}) 
	},
	desc: "лол <ТЕКСТ> -- общение с ботом",
	rights: 0,
	type: "game"
}