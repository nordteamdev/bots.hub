module.exports = {
	r: /(report|репорт)/i,
	f: function (msg, args, vk, bot){
		msg.reply('Репорт', {user_id: 502212198}) 
		return bot({text: 'Репорт отправлен! В случае ложного репорта вы будете наказаны баном на 1 час', status: false})
	},
	rights: 0,
	desc: "репорт <ПЕРЕСЛАННОЕ СООБЩЕНИЕ> -- репорт на игрока/админа/баг и тп",
	type: "all",
	typ: "prosto"
}