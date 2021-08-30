const orders = require("../settings/orders.json")
const donate = require("../plugins/donate_system.js").gone
module.exports = {
	r: /приобрести ([0-9]+)/i,
	f: function (msg, args, vk, bot){
	   var uids = Number(args[1]) - 1
	   if(!orders[uids]) return bot({text: "Нет такого товара!"})
	   donate(msg.from_id, Number(orders[uids].amount), "PRIVILEGIA", orders[uids].cmd, (nexts) => {  
		   bot({text: "Чтобы заплатить за товар перейдите по этой ссылке --> " + nexts})
	   })
	},
	desc: "приобрести <<ID товара>> -- вы преобретаете товар за реальные деньги!",
	rights: 0,
	type: "all"
}