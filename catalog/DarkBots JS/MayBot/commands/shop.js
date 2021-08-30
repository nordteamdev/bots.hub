const accs = require("../plugins/autosave.js").accs
const shop = require("../settings/shop.json")
module.exports = {
	r: /(shop|магазин)/i,
	f: function (msg, args, vk, bot){
        bot({text: "🔵 Магазин: \n\n" + shop.map(a=> `➡ Товар: ${a.name}\n🎁 Цена:  ${a.buy.price > 0 ? a.buy.price + " поинтов " : ""} ${a.buy.diamonds > 0 ? a.buy.diamonds + "💵 " : ""} ${a.buy.bitcoins > 0 ? a.buy.bitcoins + "💷 " : ""}.\n✏ Описание: ${a.desc}\n🆔 Номер товара: ${Math.round(a.uid + 1)}`).join("\n\n") + "\n\n➡🎁 Чтобы купить напиши <<купить <НОМЕР ТОВАРА> >>"})
	},
	desc: "магазин -- магазин",
	rights: 0,
	type: "all",
	typ: "game"
}