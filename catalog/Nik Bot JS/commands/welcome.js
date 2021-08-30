const rand = require("../plugins/functions.js").rand
const accs = require("../plugins/autosave.js").accs
module.exports = {
	r: /(привет|дороу|Дратути|привит|хелло|прувет)/i,
	f: function (msg, args, vk, bot){
       var frazs = ['Привет Человек','Привет! Удачного времяпровождения!','Ку-ку', 'Дратути', 'Хуллоу гы', 'Здоров братан!']
       bot({text:"-->" + rand(frazs)})
    },
	desc: "",
	rights: 0,
	type: "chat"
}