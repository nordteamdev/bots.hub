let users = require('../bot/base/users.json');
let utils = require('../utils.js');

let command = {
	pattern: /^(?:taxi|такси)$/i,
	f: async (message, bot) => {
		let shtrafa = utils.random(100);
		//pitunskaya proverka
		if(users[message.senderId].misc.car === 0) return bot.reply('❌ У вас нет машины. \n\n🤔 Совет: Вы можете узнать список машин написав мне <<авто>>. Или приобрите машину получше.');
		if(!users[message.senderId].misc.license) return bot.reply('❌ У вас нет прав рулить автомобилем.\n\n🤔 Совет: Вы можете получить права водителя написав мне <<лицензия>>');
		if(users[message.senderId].cooldowns.taxi) return bot.reply('❌ Вы пока что не можете водить автомобилем! Попробуйте чуть позже.');
		let x = utils.random(1, 100);
	    let dtp = ['Клиент отказался платить и убежал',
		'Вас остановил сотрудник ДПС и выяснилось, что вы пьяны',
		'Вы превысили скорость',
		'Ваш клиент начал бушевать, и вам пришлось высадить его',
		''];
		let randans = utils.pick(dtp);
		if(x >= 50)
		{
				let win_dollars = utils.random(400,1500);

				if(bot.user.group === 0)
				{
					win_dollars * 2;
				}

				if(bot.user.group === 1)
				{
					win_dollars * 2.2;
				}

				if(bot.user.group === 2)
				{
					win_dollars * 2.5;
				}
	
				if(bot.user.group === 3)
				{
					win_dollars * 2.7;
				}

				if(bot.user.group === 4)
				{
					win_dollars * 3;
				}

				if(bot.user.group === 5)
				{
					win_dollars * 3.5;
				}
			let shtraf = utils.random(1, 100);
			let a = utils.random(1,2);
			if(shtraf < a)
			{
				users[message.senderId].misc.license = false;
				if(users[message.senderId].balance.dollars < 15000) {users[message.senderId].balance.dollars = 0}
				users[message.senderId].balance.dollars -= 15000;
				return bot.reply('❌ Полиция обнаружила, что у вас поддельные права. \n\nБыл выписан штраф и изъяты права.');
			}
			users[message.senderId].balance.dollars += Number(win_dollars);
			users[message.senderId].cooldowns.taxi = true;
		    setTimeout(() => {
		    	users[message.senderId].cooldowns.taxi = false;
		    }, 600000)
			let nalog = utils.random(100,400);
			return bot.reply('✔ Вы доставили клиента быстро и получили за это ' + win_dollars + '$' + '\nНалог составил: ' + nalog + '$' + '\nВы сможете продолжить через 2 минуты..');
			users[message.senderId].balance.dollars -= nalog;
			}
}}

module.exports = command;