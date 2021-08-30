const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(donat|donater)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n 1.[id273806306|Эля Аубакирова] - 1000 рублей \n 2. [id394936920|Тамерлан Антропов] - 250 рублей \n 3. [id394658493|Эмиль Назмиев] - 169 рублей\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"]
		return bot({text: rand(rep)})
	},
	desc: "donat -- кто помогал боту в развитии",
	rights: 0,
	type: "all"
}