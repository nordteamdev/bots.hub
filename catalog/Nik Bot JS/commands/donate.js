const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(Донат)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n📝Привелегии\n&#8195;🔝 VIP - 30 Рублей \n&#8195;Ⓜ MODERATOR - 50 Рублей \n&#8195;🅰 ADMIN - 100 Рублей \n&#8195;⚠ SUPPORT - 200 Рублей\n&#8195;👀 LOOKING - 300 Рублей \n&#8195;🔧DEVELOPER🔧 - 600 Рублей \n\n🔥 Нарушение правил - 100 рублей. \n💰 100.000.000 Коинов - 30 Рублей \n⛔ Анти-бан - 50 рублей \n🐩 Разбан - 40 рублей \n⚠ Доступ к серверу и файлам бота - 2000 Рублей \n\n💬 | Покупать у [id502212198|Владислава]⚕❄ " ]
		return bot({text: rand(rep)})
	},
	desc: "Товары -- Посмотреть цены на товары бота",
	rights: 0,
	type: "all"
}