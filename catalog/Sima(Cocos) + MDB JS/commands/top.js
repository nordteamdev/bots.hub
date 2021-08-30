const { Command, Utils } = require('cocoscore');
const { sp } = require('../functions.js')

module.exports = new Command({
    trigger: /^топ/i,
    name: 'Топ',
    type: 'osnovnoe',
    description: 'Топ игроков',
    emoji: '🔝',
    async handler(ctx, bot) {
    let users = await bot.db.getModel('user').find({ bantop: false }).sort('-rating').limit(10); 
let top = users
	.map((user, i) => `⠀${i === 9 ? "🔟" : `${i + 1}⃣`} @id${user.vkId} (${user.nickname}) — ${Utils.numberSeparator(user.rating)} 👑 ➖ ${form(user.balance)}$`).join('\n');

ctx.send(`топ лучших игроков:\n\n${top}`, {emoji: '🏆'});
}
})


function form(count) {
		count = Math.floor(count);
		let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
		let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
		if (i >= 17) return "Дохуя";
		result += "" + ["", "тыс", "млн", "млрд", "трлн", "кврлн", "квинтл", "скстлн", "сптлн", "октлн", "нонлн", "дцлн", "ундцлн", "додцлн", "трдцлн", "квтуордцлн", "квндцлн"][i];
		return result;
}