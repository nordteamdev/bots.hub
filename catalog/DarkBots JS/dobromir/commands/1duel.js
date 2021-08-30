var users = {}
const getRandomInt = require("../plugins/functions.js").getRandomInt
const accs = require("../data/accs.json")
module.exports = {
	r: /(дуэль) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
		ID = msg.from_id
		IDс = msg.chat_id
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		if(args[2] == 0) return bot({text: "Извини, но 0 нельзя."})
		if(args[2] < 1000) return bot({text: "Извини, но меньше 1000 нельзя."})
		if(accs[i].spots < Number(args[2])) return bot({text: "Извини, но у тебя " + accs[i].spots + " ботсов."})
		if(users[IDс].duel.users_ids.indexOf(ID) > -1) return bot({text: "Уже есть дуэль долбаеб"})
		
		users[msg.chat_id] = {
			//chat: message.chat_id,
			users_ids: ID,
			status: true,
			Stavka: Number(args[2])
		}
		//bot({text:"🎮 | Игра началась \n💷 | Ваша ставка:" + Number(args[2]) + " ботсов.\n🔷 | Чтобы открыть ячейку напиши пеппа ячейка <Номер ячейки> (Через запятую)\nℹ | Чтобы забрать выйграш напиши Катя стоп сапер\n\n" }) 
	bot({text: "Дуэль начался! и пизда историка увеличелась\nВаша ставка:" + Number(args[2]) + "\nЖдем саперника" }) 
    },
	desc: "дуэль -- начать игру в сапера",
    rights: 4,
    type: "game",
	other: users
}

// пп дуэль 5000
// пп eval accs[0].spots = 350000