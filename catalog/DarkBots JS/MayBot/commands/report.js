module.exports = {
	r: /(report|репорт)/i,
	f: function (msg, args, vk, bot){
		msg.reply('Трах дибитох дибитох...\nPEER_ID: ' + msg.peer, {user_id: 303293209})
		return bot({text: 'Репорт отправлен! В случае ложного репорта вы будете заблокированы на 3 дня!', status: false})
	},
	rights: 5,
	desc: "репорт <ПЕРЕСЛАННОЕ СООБЩЕНИЕ> -- репорт на игрока/админа/баг и тп",
	type: "all",
	typ: "prosto"
}