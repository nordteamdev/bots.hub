const shop = require("../settings/shop.json")
module.exports = {
	r: /(shop|магазин)/i,
	f: function (msg, args, vk, bot){
	   bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\n🔵 Магазин: \n\n" + shop.map(a=> "➡ Товар: " + a.name + "\n🎁 Цена: " + a.buy + " 💵.\n✏ Описание: "+ a.desc +"\n🆔 Номер товара: " + Math.round(a.uid + 1)).join("\n\n") + "\n\n➡🎁 Чтобы купить напиши /buy <НОМЕР ТОВАРА>\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
    },
	rulet: "магазин -- магазин",
	rights: 0,
	type: "all"
}