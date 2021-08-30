const cases = require("../settings/chance_cases.json")
module.exports = {
	r: /(list cases|список кейсов)/i,
	f: function (msg, args, vk, bot){
       var pizda_koly = `Список доступных кейсов: \n\n${cases.map(a=> "📦 | " + a.name + "\n💲 | Стоимость: " + check(a.price)).join("\n\n")}`
       bot({text: pizda_koly})
	},
	rights: 0,
	desc: "список кейсов -- узнать список всех доступных кейсов.",
	type: "all",
	typ: "game"
}
function check(text) {
	 var gone = ``
	 if(text.price > 0) {
        gone += `${text.price} коинов`
	 }
     if(text.rub > 0) {
        gone += `${text.rub} Рублей.`
	 }
	 if(text.diamonds > 0) {
        gone += `${text.diamonds} 💎`
	 }
	 if(text.bitcoins > 0) {
        gone += `${text.bitcoins} 💳`
	 }
	 return gone
}