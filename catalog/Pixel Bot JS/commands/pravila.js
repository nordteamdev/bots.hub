const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(pravila|правила)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n🔥Актуальный список правил бота🔥 \n\n⚠» ЗАПРЕЩЕНО: \n\n🔹» 1.1. Оскорбление любого пользователя. \n🚫» Наказание: Блокировка аккаунта. \n🔹» 1.2. Выпрашивание у админов валюты/доната/вип/админки. \n 🚫» Наказание: Временная блокировка \n🔹» 1.3. Бессмысленные сообщения в репорт.\n🚫» Наказание: Временная блокировка. \n🔹» 1.4. Часто использовать однотипные команды с целью нагубить боту.\n 🚫» Наказание: Временная блокировка аккаунта.\n 🔹» 1.5. Выдавать себя за модератора/администратора.\n 🚫» Наказание: Блокировка аккаунта. \n🔹» 1.6. Продажа игровой валюты. \n 🚫» Наказание: Блокировка аккаунта. \n🔹» 1.7. Использовать баги не сообщая о них разрабочикам.\n 🚫» Наказание: Временная(вечная) блокировка. \n🔹» 1.8. Использоват нецензурные выражения в никах/названиях клана.\n🚫» Наказание: в 1 раз - предупреждение. 2-й раз - бан. \n🔹» 1.9. Контент 18+ запрещен (порно, эротика и т.д.) \n🔹» 1.10. Менять название беседы запрещено. \n🔹» 1.11. Добавлять других ботов запрещено. \n🔹» 1.12. Упоминание других ботов запрещено. \n🔹» 1.13. Добавление человека которого только что кикнули запрещено. \n🔹» 1.14. Использование мульти-аккаунтов. \n🔹» 1.15. Оскорбление/обман администрации,проекта. \n🔹» 1.16. Накрутка валюты с других аккаунтов(фейков). \n🚫» Наказание: Блокировка аккаунта. \n\n 🔹» Администрация в праве не разглашать причину блокировки. \n\n ⛔» Незнание правил не освобождает от ответственности." ]
		return bot({text: rand(rep)})
	},
	desc: "Правила -- ПРОЧИТАТЬ ПРАВИЛА ОБЯЗАТЕЛЬНО!!!!!",
	rights: 0,
	type: "all"
}