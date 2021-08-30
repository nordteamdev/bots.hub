const point = require("../settings/point.json")
module.exports = {
	r: /(point|задания)/i,
	f: function (msg, args, vk, bot){
	   var gone = "Все доступные задания: \n\n" + point.map(a=> checking(a)).join("\n\n")
	   bot({text: gone})
	},
	desc: "СКОРО!!!!",
	rights: 5,
	type: "all"
}
function checking(data){
    if(data.type == "used"){
		if(data.object.type == "cmds"){
		    return "♦ " + data.name + "\n✔ Описание: использовать команды " + data.object.count + " раз.\n💰 Награда: " + data.price
		}
		if(data.object.type == "stats"){
			return "♦ " + data.name + "\n✔ Описание: написать " + data.object.count + " сообщений при боте.\n💰 Награда: " + data.price
		}
	}else{
		return "♦ " + data.name + "\n✔ Ссылка: " + data.object.link + "\n💰 Награда: " + data.price
	}
}