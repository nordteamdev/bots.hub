const fs = require("fs")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./" + x));
const nick = require("../plugins/functions.js").nick
const accs = require("../data/accs.json")
module.exports = {
	r: /(помощь|команды|хелп)/i,
	f: function (msg, args, vk, bot){     //
		var access = ['👤', '👥', '🌟', '🌍', '💻', '💻']
		var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
		
		//bot({text: "\n✉ Обычные команды:\n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'all').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\n🕹 Игровые команды:\n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'game').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\n🔱 Чат команды:\n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'chat').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\n 💻 Админ команды 💻 \n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'admin').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\n🌠 Другие:\n\n" + cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'api').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n") + "\n\nУровень доступа:\n👤 - Пользователь\n👥 - с Випа\n🌟 - с Модератора\n🌍 - с Администратора\n💻 - с Создателя Бота"})
		bot({text: `\n✉ Обычные команды:\n\n ${cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'all').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n")} \n\n🕹 Игровые команды:\n\n ${cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'game').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n")} \n\n🔱 Чат команды:\n\n ${cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'chat').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n")} ${accs[i].rights >= 1 ? "\n\n 💻 Админ команды 💻": ''} \n\n ${cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'admin').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n")} \n\n🌠 Другие:\n\n ${cmds.filter(a=> a.rights <= accs[i].rights && a.type == 'api').map(a=> `[${access[a.rights]}] ${a.desc}`).join("\n")} \n\nУровень доступа: ${accs[i].rights >= 0 ? "\n👤 - Пользователь": ''}${accs[i].rights >= 1 ? "\n👥 - с Випа": ''}${accs[i].rights >= 2 ? "\n🌟 - с Модератора": ''}${accs[i].rights >= 3 ? "\n🌍 - с Администратора": ''}${accs[i].rights >= 4 ? "\n💻 - с Создателя Бота": ''}`})
	},
	desc: "помощь -- справка команд",
	rights: 0,
	type: "all"
}