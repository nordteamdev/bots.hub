const accs = require("../plugins/autosave.js").accs
const shop = require("../settings/shop.json")
module.exports = {
	r: /(shop|магазин)$/i,
	f: function (msg, args, vk, bot){
        bot({text: `💀 | Доступно: 

➡ Товар: Майнер 
🎁 | Цена: 7500 💵. 
✏ | Описание: Зарабатывает за вас ботсы! Одна минута - два ботса 
🆔 | Номер товара: 1

➡ Товар: Ратник 
🎁 | Цена: 20000 💵. 
✏ | Описание: Увеличивает скорость майнеров в два раза
🆔 | Номер товара: 2

Для покупки напиши «купить [id]»`})
	},
	desc: "магазин -- магазин",
	rights: 0,
	type: "all",
	typ: "game"
}