const {Command} = require('cocoscore')
const tcp = require('tcp-ping')
const frm = new Intl.NumberFormat('en');


module.exports = [
new Command({
	trigger: /^info|инфо|о\sботе/i,
	name: "Инфо",
	description: "Информация о боте",
	type: "osnovnoe",
	emoji: "ℹ",
	async handler(ctx, bot) {
let a = 0;
tcp.ping({address: `vk.com`}, function(err, data) {
	a += Math.round(data.avg)
});

		let users = await bot.db.getModel('user').countDocuments();
		let chats = await bot.db.getModel('chat').countDocuments();
		ctx.send(`информация:
			@botsima (Бот Sima — Игровой бот с большим функционалом, разработан специально для Вас и Ваших друзей.)

			⒈ Разработчик: @cypcep (Артём большаков)
			⒉ Принцесска: false
			⒊ Заместитель: false

			👥 Пользователей: ${users}
			📄 Бесед: ${chats} 
			📡 Пинг: ${a}ms
			`)
	}
}),
new Command({
	trigger: /^статистика|стата/i,
	permission: 1,
	async handler(ctx, bot) {
	let money = 0; let ratings = 0; let bitcoins = 0;
		let users = await bot.db.getModel('user').find({bantop: false}).select('balance');
			for (let user of users) {money += user.balance}
				let x = await bot.db.getModel('user').find({bantop: false}).select('rating');
					for (let user of x) {ratings += user.rating}
						let c = await bot.db.getModel('user').find({bantop: false}).select('bitcoin');
					for (let user of c) {bitcoins += user.bitcoin;}
				let admins = await bot.db.getModel('user').find({permission: 1}).countDocuments();
			let bans = await bot.db.getModel('user').find({banned: true}).countDocuments();
		let top = await bot.db.getModel('user').find({bantop: true}).countDocuments();
	let pay = await bot.db.getModel('user').find({banpay: true}).countDocuments();
		ctx.send(`cтатистика бота и экономики:
			⏱ Uptime: ${unixStampLeft(Math.floor(process.uptime() * 1000))}
				🅰 Admin's: ${admins}
					💰 Money's: ${frm.format(money)}$
						👑 Rating's: ${frm.format(ratings)}
						🌐 Bitcoins's: ${frm.format(bitcoins)}
					🚫 Blocked: ${bans}
				❌ Offtop's: ${top}
			⚠ Banpay's: ${pay}
			`)

	}
})
]

function unixStampLeft(stamp) {
    stamp = stamp / 1000;
    	let s = stamp % 60;
    		stamp = ( stamp - s ) / 60;
    			let m = stamp % 60;
    				stamp = ( stamp - m ) / 60;
    					let h = ( stamp ) % 24;
    						let d = ( stamp - h ) / 24;
    					let text = ``;
    				if(d > 0) text += Math.floor(d) + " д. ";
    			if(h > 0) text += Math.floor(h) + " ч. ";
    		if(m > 0) text += Math.floor(m) + " м.";
    	if(s > 0) text += Math.floor(s) + " с. ";
    return text;
}