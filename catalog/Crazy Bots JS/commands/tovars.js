const orders = require("../settings/orders.json")
const donat = require("../plugins/donate_system.js").gone
module.exports = {
	r: /(tovars|товары)/i,
	f: function (msg, args, vk, bot){
	   return bot({text: "\nТовары: \n\n" + orders.map(a=> "Название: " + a.name + "\nСтоимость: " + a.amount + " руб.").join("\n\n")})
	},
	desc: "товары -- покажет то что можно купить за РЕАЛЬНЫЕ ДЕНЬГИ",
	rights: 7,
	type: "all"
}