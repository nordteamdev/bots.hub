let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:работа|устроиться) ?([0-9]+)?$/i,
	f: async (message, bot) => {
		if(!message.args[1])
		{
		return bot.reply(`Список доступных работ для вас:
			${bot.work.filter(x=> x.cost <= bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$ [${x.earn}$]`).join('\n')}
			
			Список недоступных работ для вас:
			${bot.work.filter(x=> x.cost > bot.user.balance.dollars).map(x=> `📕 ${x.id}. ${x.name} — ${x.cost}$ [${x.earn}$]`).join('\n')}`);
		}

		if(bot.user.misc.work !== 0) return bot.reply(`Доступно для вывода: ${bot.user.balance.work}\n\nЧтобы вывести напиши <<работа вывести>>`);
		if(message.args[1] === "вывести") {bot.user.balance.dollars += bot.user.balance.work
		return bot.reply('Средства выведены на ваш основной кошелёк.')}
		let work = bot.work.filter(x=> x.id === Number(message.args[1]));
		if(!work[0]) { return bot.reply(`❌ Работа не найдена!`) }

		if(work[0].cost > bot.user.balance.dollars) return bot.reply(`❌ Недостаточно денег для устройства.`);

		users[message.senderId].balance.dollars -= work[0].cost;
		users[message.senderId].misc.work = work[0].id;

		return bot.reply(`✔ Вы устроились на работу <<${work[0].name}>>. Ваша зарплата будет поступать на ваш рабочий счёт`);
	}
}

module.exports = command;