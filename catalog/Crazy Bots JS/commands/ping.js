module.exports = {
	r: /(пинг|ping)/i,
	f: function (msg, args, vk, bot){
		var start = new Date().getTime()
		vk.users.get({ 
		user_ids: 1 
		}); 
		bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПонг!\nПинг: " + (new Date().getTime() - start) + " мс.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"}); 
	},
	desc: "пинг -- пинг бота",
	rights: 5,
	type: "all"
}