const accs = require("../plugins/autosave.js").accs
const getClan = require("../plugins/functions.js").getClan
const getRights = require("../plugins/functions.js").getRights
module.exports = {
	r: /(прф|профиль|проф|аккаунт)/i, 
	f: function (msg, args, vk, bot){
		var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
		var test = `🌍 » Ваш профиль « 🌍 \n\n🔎 ID: ${accs[i].uid} \n📝 Ник: ${accs[i].nickname}\n💎 » Привилегия: ${getRights(accs[i].id)}\n💵 » Баланс: [${accs[i].balance}] коинов\n🔸 » Уровень ${accs[i].level}\n🔸 » Опыта [${accs[i].exp} | ${accs[i].next_level}]\n🔰 » Клан: ${getClan(accs[i].id)} \n🔹» Статистика дуэлей:\n[😎Win: ${accs[i].winDuel} | 😭Lose: ${accs[i].loseDuel}]\n\n📝 » Дата регистрации: ${accs[i].register}`
		bot({text: test, status: false}) 
	},
	desc: "профиль -- ваш профиль",
	rights: 0,
	type: "all",
	typ: "game"
}