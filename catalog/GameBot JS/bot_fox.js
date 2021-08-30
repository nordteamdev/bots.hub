const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

const cars = [
	{
		name: 'Ролики',
		cost: 500,
		id: 1
	},
	{
		name: 'Велик',
		cost: 2500,
		id: 2
	},
	{
		name: 'Лодка',
		cost: 5000,
		id: 3
	},
	{
		name: 'ВАЗ 2106',
		cost: 7500,
		id: 4
	},
	{
		name: 'Уазик',
		cost: 50000,
		id: 5
	},
	{
		name: 'BMW m3',
		cost: 1000000,
		id: 6
	},

	{
		name: 'Mercedes C Class',
		cost: 2000000,
		id: 7
	},
	{
		name: 'Lexus',
		cost: 5000000,
		id: 8
	},
	{
		name: 'Porshe',
		cost: 50000000,
		id: 9
	},
	{
		name: 'Mercedes g63',
		cost: 100000000,
		id: 10
	}
];

const yachts = [
	{
		name: 'Двух местная лодка',
		cost: 10000,
		id: 1
	},
	{
		name: 'NautIkle RG',
		cost: 10000000,
		id: 2
	},
	{
		name: 'Fordhadrin 56-RGS',
		cost: 15000000,
		id: 3
	}
];

const airplanes = [
	{
		name: 'Парашут',
		cost: 100000,
		id: 1
	},
	{
		name: 'ИЛ-73',
		cost: 350000,
		id: 2
	}
];

const helicopters = [
	{
		name: 'Вертолет Bronze Class',
		cost: 2,
		id: 1
	},
	{
		name: 'Вертолет Silver Class',
		cost: 300000,
		id: 2
	},
	{
		name: 'Вертолет Gold Class',
		cost: 450000,
		id: 3
	}
];

const homes = [
	{
		name: 'Подвал в 5-ти этажке',
		cost: 250,
		id: 1
	},
	{
		name: 'Подъезд',
		cost: 3000,
		id: 2
	},
	{
		name: 'Квартира',
		cost: 3500,
		id: 3
	},
	{
		name: 'Дача',
		cost: 5000,
		id: 4
	},
	{
		name: 'Особняк за городом',
		cost: 10000,
		id: 5
	}
];

const apartments = [
	{
		name: 'Квартира в Санк-Петербурге',
		cost: 15000,
		id: 1
	},
	{
		name: 'Квартира в общежитии',
		cost: 55000,
		id: 2
	},
	{
		name: 'Двух комнатная квартира',
		cost: 175000,
		id: 3
	},
	{
		name: 'Пятикоманатная квартира',
		cost: 260000,
		id: 4
	},
	{
		name: 'Десятикомнатная квартира',
		cost: 500000,
		id: 5
	}
];

const phones = [
	{
		name: 'Lenovo',
		cost: 250,
		id: 1
	},
	{
		name: 'Xiomi MI5',
		cost: 500,
		id: 2
	},
	{
		name: 'Honor 7C',
		cost: 2000,
		id: 3
	},
	{
		name: 'Honor 7A Pro',
		cost: 10000,
		id: 4
	},
	{
		name: 'IPhone 4',
		cost: 15000,
		id: 5
	},
	{
		name: 'IPhone 5S',
		cost: 30000,
		id: 6
	}
];

const farms = [
	{
		name: 'GTX I8',
		cost: 2500000,
		id: 1
	},
	{
		name: 'NV-890',
		cost: 3500000,
		id: 2
	},
	{
		name: 'Gold GTX',
		cost: 5000000,
		id: 3
	}
];

	const admin_businesses = [
		{
			name: 'Аптека',
			cost: 1,
			earn: 50000000,
			id: 1,
			icon: '🗓'
		}
	];


const businesses = [
	{
		name: 'Автомойка',
		cost: 50000,
		earn: 400,
		id: 1,
		icon: '1⃣'
	},
	{
		name: 'РосПечать',
		cost: 10000,
		earn: 700,
		id: 2,
		icon: '2⃣'
	},
	{
		name: 'Магазин',
		cost: 300000,
		earn: 2500,
		id: 3,
		icon: '3⃣'
	},
	{
		name: 'Супер-маркет',
		cost: 500000,
		earn: 3800,
		id: 4,
		icon: '4⃣'
	},
	{
		name: 'Командор',
		cost: 1500000,
		earn: 8000,
		id: 5,
		icon: '5⃣'
	},
	{
		name: 'Аллея',
		cost: 25000000,
		earn: 70000,
		id: 6,
		icon: '6⃣'
	},
	{
		name: 'Спортмастер',
		cost: 80000000,
		earn: 220000,
		id: 7,
		icon: '7⃣'
	}
];

const works = [
	{
		name: 'Грузчик',
		requiredLevel: 1,
		min: 10000,
		max: 10000,
		id: 1
	},
	{
		name: 'Водитель автобуса',
		requiredLevel: 3,
		min: 20000,
		max: 20000,
		id: 2
	},
	{
		name: 'Водитель скорой помощи',
		requiredLevel: 5,
		min: 30000,
		max: 30000,
		id: 3
	},
	{
		name: 'Помощник машиниста',
		requiredLevel: 8,
		min: 40000,
		max: 40000,
		id: 4
	},
	{
		name: 'Машинист',
		requiredLevel: 10,
		min: 50000,
		max: 50000,
		id: 5
	}
];

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', 'бесконечно'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/infinity/g, 'бесконечно');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

let btc = 6000;
let coins = utils.random(43860, 87524);

let users = require('./users.json');

setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 60000);

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 1000);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += 2;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += 10;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += 100;
		}
	});
}, 3600000);


setInterval(async () => {
	users.map(user => {
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn;
		}
	});
}, 3600000);

function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.bonus = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'суда токен', pollingGroupId: 45432  });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club178373573\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club178373573\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 250,
			donate: 0,
			check: false,
			bank: 2500,
			btc: 0,
			farm_btc: 0,
			biz: 0,
			sberbank: {
				activation: 0,
				number: 0,
				cvv: 0,
				user_name: `Не указано`,
				balance: 0
			},
			rating: 1,
			regDate: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
			mention: false,
			timers: {
				hasWorked: false,
				bonus: false,
				verify: false
			},
			account: {
				ban: false,
				banrep: false,
				banpay: false,
				bangame: false,
				banname: false
			},
			tag: user_info.first_name,
			work: 0,
			coins: 0,
			report: true,
			report_flood: false,
			rabotat: false,
			support: 0,		
			/*лимит на сообщения*/ limit_sms: 25,
			/*поинтов*/ points: 0,
			last_sms: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
			limit_pay: 5000000,
			message_sms: 0,
			number_captcha: 0,
			admin_business: 0,
			chat10: 0,
			chat11: 0,
			chat12: 0,
			chats2: 0,
			chats3: 0,
			chats4: 0,
			chats5: 0,
			chats6: 0,
			chats7: 0,
			chats8: 0,
			chats10: 0,
			chats11: 0,
			/* вакцина от коронавируса */ chats12: 0,
			/* приватность админа */ groups1: false,
			/* последнее смс в репорт */ groups2: `Пусто`,
			/* болезнь коронавируса */ groups3: false,
			/* блокировка */ groups4: false,
			user_sberbank: false,
			groups6: false,
			groups7: false,
			groups8: false,
			groups9: false,
			groups10: false,
			/* город в профиле */ group1: false,
			/* встречаеться с */ group2: `Не указано`,
			/* сис. уведомления*/ group3: false,
			/* страртовый бонус*/ group4: false,
			/* лимит на заразность коронки*/ group5: false,
			/* подарок*/ group6: false,

			/* информация */ 
			/* префикс */ prefix: `Не указано`,
			/* встречаеться с */ bronze: false,
			/* сис. уведомления*/ silver: false,
			/* страртовый бонус*/ gold: false,
			/* лимит на заразность коронки*/ group5: false,
			/* подарок*/ group6: false,
			group7: false,
			group8: false,
			group9: false,
			group10: false,
			flood_change_name: false,
			business: 0,
			notifications: true,
			exp: 1,
			level: 0,
			captcha_token: 0,
			captcha_sms: 0,
			sex: `Не указано`,
			lvl: 1,
			verify: false,
			banks: {
				limit: 250000000			
			},
			quest: {
				santa: false,
				pashalka: false,
				pozdravit: false,
				bonus: 0,
				kazino: 0				
			},
			transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				helicopter: 0
			},
			realty: {
				home: 0,
				apartment: 0
			},
			admin: {
				otvet: 0,
				banotvet: false,
				bangivemoney: false,
				bancmd: false
			},
			misc: {
				phone: 0,
				farm: 0
			}
		});
		console.log(` +1 игрок [Игроков: ${users.length}]`);
		saveUsers();
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.account.ban) return;
	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.lvl += 1;
		message.user.donate += 1;
	}
	

		
		if(message.user.captcha_sms >= message.user.limit_sms)
		{
			var captcha = utils.random(57, 98);
			message.user.captcha_token = captcha;
			message.user.captcha_sms = 0;
			message.user.check = true;
		return bot(`[⛔] Введите "Капча ${captcha}"`);

		}
		

		setTimeout(() => {
		
			saveUsers();
		}, 600000);

		 
		
		/* if(message.user.level > 1){
			vk.api.messages.send({ 
				user_id: 465413320, 
				message: `✅ ID Администратора: ${message.user.uid} || 💭 Введена команда: ${message.text}` 
					})
		} */
	
		if(message.user.chats12 >= 100)
		{
		
			message.user.balance = 250;
			message.user.donate = 15;
			message.user.check = false;
			message.user.bank = 2500;
			message.user.btc = 0;
			message.user.farm_btc = 0;
			message.user.biz = 0;
			message.user.sberbank = 0;
			message.user.sberbank = 0;
			message.user.sberbank = 0;
			message.user.sberbank.activation = 0;
			message.user.sberbank.number = 0;
			message.user.sberbank.cvv = 0;
			message.user.sberbank.user_name = `Не указано`;
			message.user.sberbank.balance = 0;
			message.user.rating = 1;
			message.user.mention = false;
			message.user.tag = user_info.first_name;
			message.user.work = 0;
			message.user.coins = 0;
			message.user.report = true;
			message.user.report_flood = false;
			message.user.rabotat = false;
			message.user.support = 0;
			message.user.limit_sms = 25;
			message.user.chats12 = 0;
			message.user.groups1 = false;
			message.user.groups2 = `Пусто`;
			message.user.groups3 = false;
			message.user.group1 = false;
			message.user.group2 = false;
			message.user.group3 = false;
			message.user.group4 = false;
			flood_change_name = false;
			message.user.business = 0;
			notifications = true;
			message.user.exp = 1;
			message.user.level = 0;
			message.user.captcha_token = 0;
			message.user.captcha_sms = 0;
			message.user.sex = `Не указано`;
			message.user.lvl = 1;
			message.user.verify = false;
			message.user.banks.limit = 250000000;
			message.user.transport.car = 0;
			message.user.transport.yacht = 0;
			message.user.transport.airplane = 0;
			message.user.transport.helicopter = 0;
			message.user.realty.home = 0;
			message.user.realty.apartment = 0;
			message.user.misc.phone = 0;
			message.user.misc.farm = 0;
		
		return bot(`😷 К сожалению вы умерли. Ваш аккаунт был полностью очищен.`);

		}
	
	
	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	let date = new Date;
	message.user.last_sms = date;

	message.user.message_sms += 1;

	console.log(`NEW MESSAGE: VK_ID: ${message.user.id} || ID: ${message.user.uid} || Nickname: ${message.user.tag} || Message: ${message.text} `)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}




cmd.hear(/^(?:зароботок|заработок)$/i, async (message, bot) => {

return bot(`
➡ 1. Работа - выведет список работ\n
➡ 2. Казино [сумма] - для азртных\n
➡ 3. Бонус - вы получите рандомный ежедневный бонус\n
➡ 4. Трейд [сумма] - тоже для азартных\n
➡ 5. Магазин - займитесь скупкой и продажей\n
➡ 6. Бизнес - постройте свою карьеру с помощью бизнесов\n
➡ 7. Ферма - майните биткоины, и зарабатывайте на них\n
➡ 8. Кубик - если вы счастливчик, то вас суда\n
➡ 9. Police_rg - получите бонус от разработчика\n
`);

});

cmd.hear(/^(?:купить вакцину|вылечиться|выздоровить|вылечится|вакцина)$/i, async (message, bot) => {
	if(!message.user.groups3) return bot(`Вы не болеете коронавирусом.`);
	if(message.user.balance < 1000000000) return bot(`Ошибка, вакцина стоит 1.000.000.000$`);
	if(message.user.chats12 <= 15) return bot(`Вам не требуется вакцина. Либо у вас еще маленький % прогресcирования.`);
	message.user.balance -= 1000000000;
	message.user.chats12 -= 5;
return bot(`➡ Вы купили 5% вакцины. Теперь Ваш процент прогресcирования равен ${message.user.chats12}%/100% (Если у вас будет число в минусе, значит вы здоровы)`);

});


cmd.hear(/^(?:police_rg|police)$/i, async (message, bot) => {
	if(message.user.group4) return bot(`Бонус от Разработчика можно получить всего 1 раз`);
	
	message.user.balance += 1000000;

	message.user.group4 = true;
	return bot(`✉ Вы получили бонус от Разработчика, в размере 1.000.000$`);
});

cmd.hear(/^(?:подтвердить аккаунт)$/i, async (message, bot) => {
	if(message.user.timers.verify) return bot(`Заявку на подтверждение аккаунта можно подавать всего 1 раз.`);
	
	vk.api.messages.send({ 
	peer_id: 2000000101, 
	message: `[✅ ЗАПРОС НА ВЕРИФИКАЦИЮ ✅]\n\n🔎 ID игрока: ${message.user.uid}\n⚙ Подробная информация "get ${message.user.uid}"\n\n✅ Подтвердить игрока "accept ${message.user.uid}"` 
		})
		
	return bot(`✉ Вы отправили заявку на верификацию аккаунта.`);
});


cmd.hear(/^(?:Капча)\s?([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] != message.user.captcha_token) return bot(`Не правильный код от капчи.`);
	let ranom = utils.random(29, 94);
	
	if(message.args[1] = message.user.captcha_token){
		message.user.check = false;
		message.user.captcha_sms = 0;
		message.user.captcha_token = ranom;
		message.user.number_captcha += 1;
	}
	return bot(`Капча пройдена!`);
});	


cmd.hear(/^(?:if)\s([^]+)$/i, async (message, bot) => {
	if(message.user.id !== 465413320) return

	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return bot(`number: ${result}`);
		} else {
			return bot(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return bot(`ошибка:
		${e.toString()}`);
	}
});

cmd.hear(/^(?:клик)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=5;
	
	message.user.coins += 1;
	await bot(`🚀 За клик вы заработали 1 Coin`);

});

cmd.hear(/^(?:важное)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	await bot(`
👔 Работа - список работ
📒 Профиль  ваш профиль, вся информация
💲 Баланс - выведет информацию вашего баланса
🏠 Город [ваш город] - изменить город, село, деревню
💰 Хранилище - ваши сбережения
💎 Бонус - ежедневный бонус
🛒 Магазин - список того, чего вы можете купить
🏆 Топ - самые лучшие игроки
🏆 Топ баланс - самые богатые игроки
✅ Подтвердить аккаунт
 

🆘 Репорт [фраза] - связаться с администрацией


👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`);

});

cmd.hear(/^(?:остальное)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	await bot(` 
👔 Работа - список работ
🔨 Работать - заработать денег
❌ Уволиться - перестать работать
📈 Бизнес - ваш бизнес
💵 Бизнес снять - снять деньги с бизнеса
📊 Курс - курс на данный момент
❤ Встречаться [ID] - предложить встр
😔 Развод [ID] - расстаться
👑 Рейтинг - ваш рейтинг
✒ Ник [ваш ник] - сменить имя
➖ Продать [машину/дом/квартиру]
🔋 Ферма - ваша ферма
🤝 Передать [id] [сумма]

🆘 Репорт [фраза] - связаться с администрацией


👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`);
});

cmd.hear(/^(?:игры)$/i, async (message, bot) => {
	if(message.user.account.bangame) return bot(`Вы не можете играть в игры.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	await bot(` 
🎲 Кубик [1-6]
🎰 Казино [сумма]
📈 Трейд [вверх/вниз] [сумма]

🆘 Репорт [фраза] - связаться с администрацией


👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`);
});


cmd.hear(/^(?:беседы|беседа)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	await bot(` 
	📋 1. https://vk.me/join/AJQ1d2UY7RYRFMO4Wf2JWlLs (/500)

👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`);
});



cmd.hear(/^(?:помощь|команды|меню|help|commands|cmds|menu|начать|start)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	await bot(`
1⃣  Важное
2⃣  Остальное
3⃣  Игры
👫 Пол [Мужской/Женский] - указать пол
➡ Заработок - выведет подсказку
🎁 Клик - +1 Coin
🚀 Карта - выведет информацию вашей карты
💎 Coin - новая валюта
💯 Points - ваш счет
👑 Кейсы - список кейсов
🆘 Репорт [фраза] - связаться с администрацией
📋 Беседы - беседы с ботом
📊 Police_rg - получить бонус от Разработчика
✅ Подарок - раз в 24 часа
🚑 Умереть - очистить свой аккаунт

🥀 Сохранить - сохранить свой аккаунт

👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`
);

});

cmd.hear(/^(?:получить деньги)$/i, async (message, bot) => {
	if(!message.user.silver) return bot(`Вы не купили статус Silver. Подробнее "Донат"`)
		message.user.balance += 1000000000;
		await bot(`Вы получили на свой баланс 1.000.000.000$`);
});

cmd.hear(/^(?:деньги)$/i, async (message, bot) => {
	if(message.user.level < 3)

		message.user.balance += 1000000000;
		await bot(`*вы получили на свой баланс 1kkk`);
	
});

cmd.hear(/^(?:профиль|проф)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let text = ``;
	
	if(message.user.level > 1) text += `✅ Вы администратор ${message.user.level} уровня\n\n`;
	if(message.user.verify) text += `✅ Аккаунт подтвержден.\n\n`;
	text += `🔎 Ваш игровой ID: ${message.user.uid}\n`;
	text += `💰 На руках у вас: ${utils.sp(message.user.balance)}\n`;
	if(message.user.bank) text += `💳 В хранилище: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 В вашей ферме: ${utils.sp(message.user.btc)} BTC\n`;
	text += `👑 Ваша популярность: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Вы работаете: ${works[message.user.work - 1].name}\n`;
	text += `🌟 Игровой уровень: ${message.user.lvl}\n`;
	text += `👫 Ваш пол: ${message.user.sex}\n`;
	if(!message.user.group2) text += `❤ Встречается с: ${message.user.group2}\n\n`;
	if(message.user.groups3) text += `😷 Внимание, вы заражены коронавирусом.\n😱 Болезнь прогресcировала на: ${message.user.chats12}%/100%\n😩 (Если у вас будет значение 100%/100%, вы умрете)\n\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business)
	{
		text += `\n🔑 Вы владеете:\n`;

		if(message.user.transport.car) text += `⠀🚗 У вас есть машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Вы имеете яхту: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 У вас присутствует самолет: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вы летаете на вертолете: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Вы живете в доме: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Живете вы в: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Вы носите с собой телефон марки: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 У вас ферма: ${farms[message.user.misc.farm - 1].name}\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
		if(message.user.admin_business) text += `🏆 Вы владеете: ${admin_businesses[message.user.admin_business - 1].icon} ${admin_businesses[message.user.admin_business - 1].name}\n`;
	}

	text += `\n📗 Дата регистрации аккаунта: ${message.user.regDate}`;
	if(message.user.group1) text += `\n🏡 Живет в городе/деревне: ${message.user.group1}`;
	return bot(`Ваш профиль:\n${text}\n\n👀 Подпишись на нашу группу, что бы не пропускать новых обновлений!`);
});

cmd.hear(/^(?:удалить карту)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 1) return bot(`Извините, у вас нет карты, вы можете ее создать, введя команду "Создать карту"`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	message.user.sberbank.number = 0; 
	message.user.sberbank.cvv = 0; 
	message.user.sberbank.activation = 0;
	message.user.sberbank.user_name = `Не указано`;
	message.user.sberbank.balance += 0;
	return bot(`💸 Ваша карта успешно удалена\n🚀 Что-бы создать новую, введите "Создать карту"`);
});

cmd.hear(/^(?:пересоздать карту)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 1) return bot(`Извините, у вас нет карты.\nВведите "Создать карту"`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let number_karta = utils.random(385395526, 987539526);
	let cvv_karta = utils.random(285, 985);
	let name_karta = message.user.tag;
	message.user.sberbank.number = number_karta; 
	message.user.sberbank.cvv = cvv_karta; 
	message.user.sberbank.activation = 1;
	message.user.sberbank.user_name = name_karta;
	return bot(`💸 Ваша карта успешно пересоздана, посмотреть информация можно введя команду "Карта"\n🚀 Не забудьте внести сумму более 500$, ибо ваша карта будет удалена.`);
});

cmd.hear(/^(?:Создать карту)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 0) return bot(`Извините, но ваша карта уже создана.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let number_karta = utils.random(385395526, 987539526);
	let cvv_karta = utils.random(285, 985);
	let name_karta = message.user.tag;
	message.user.sberbank.number = number_karta; 
	message.user.sberbank.cvv = cvv_karta; 
	message.user.sberbank.activation = 1;
	message.user.sberbank.user_name = name_karta;
	message.user.sberbank.balance += 250;
	return bot(`💸 Ваша карта успешно создана, посмотреть информация можно введя команду "Карта"\n🚀 Не забудьте внести сумму более 500$, ибо ваша карта будет удалена.`);
});

cmd.hear(/^(?:продать коины|продать coin|продать coins|продать коин)\s([0-9]+)$/i, async (message, bot) => {
if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
if(message.args[1] > message.user.coins) return bot(`У вас нет столько Коинов`);

	let coini = 72984 * message.args[1];
	
	message.user.coins -= message.args[1];
	message.user.balance += coini;


	return bot(`Вы продали ${message.args[1]} за ${utils.sp(coini)}`); 	

});

cmd.hear(/^(?:снять)\s(.*)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 1) return bot(`Извините, но ваша карта еще не активирована.\nВведите "Создать карту"`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.sberbank.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1] <= 0) return;
	if(message.args[1] <= 499) return bot(`⛏ Минимальная сумма для вывода, 500$`);
	
	if(message.args[1] > message.user.sberbank.balance) return bot(`🎁 Ой, у вас нет столько денег на карте.`);
	else if(message.args[1] <= message.user.sberbank.balance)
	{
		message.user.sberbank.balance -= message.args[1];
		message.user.balance += message.args[1];

		return bot(`💎 Успешно, вы сняли со счета карты ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:внести|положить)\s(.*)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 1) return bot(`Извините, но ваша карта еще не активирована.\nВведите "Создать карту"`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1] <= 0) return;
	if(message.args[1] <= 49) return bot(`⛏ Минимальная сумма для взноса, 50$`);
	
	if(message.args[1] > message.user.balance) return bot(`🎁 Ой, у вас нет столько денег для пополнения карты.`);

	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.sberbank.balance += message.args[1];

		return bot(`💎 Успешно, вы положили на счет карты ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:карта)$/i, async (message, bot) => {
	if(message.user.sberbank.activation !== 1) return bot(`Извините, но ваша карта еще не активирована.\nВведите "Создать карту"`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let text = ``;
	text += `\n🔔 Карта оформлена на: ${message.user.sberbank.user_name}\n`;
	text += `💸 CVV-код: ${message.user.sberbank.cvv}\n`;
	text += `⚠ Карта активна\n`;
	text += `💾 Номер вашей карты: ${message.user.sberbank.number}\n`;
	text += `💸 Баланс вашей сберкарты: ${utils.sp(message.user.sberbank.balance)}$\n\n`;
	text += `⚙ Снять [сумма] - снять с карты\n`;
	text += `⚙ Внести [сумма] - положить на карту\n`;
	text += `⚙ Удалить карту - удалить свою карту\n`;
	text += `⚙ Пересоздать карту - пересоздать вашу карту\n`;
	text += `⚙ Перевести [номер карты] [сумма] - отправить деньги на карту\n`;
	
	return bot(text);
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let text = `💸 Сейчас у вас на руках: ${utils.sp(message.user.balance)}$`;
	if(message.user.bank) text += `\n💳 В хранилище у вас: ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n🌐 В вашей ферме: ${utils.sp(message.user.btc)} BTC`;

	return bot(text);
});

cmd.hear(/^(?:хранилище)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`💳 В вашем хранилище ${utils.sp(message.user.bank)}$\n\n📝 Что-бы положить, введите "Хранилище [сумма]"\n💰 Что-бы обналичить счет введите "Хранилище снять [сумма]"\n🚀 Ваш лимит на вклад: ${utils.sp(message.user.banks.limit)}`);
});


cmd.hear(/^(?:умереть)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
		if(message.args[1] != `да`) return bot(`Введите "Умереть да"\nЕсли вы введете данную команду, ваш профиль будет полностью очищен, кроме важных элементов.`);
			
});

cmd.hear(/^(?:умереть да)$/i, async (message, bot) => {
	 
			if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
		
			
			message.user.balance = 250;
			message.user.donate = 15;
			message.user.check = false;
			message.user.bank = 2500;
			message.user.btc = 0;
			message.user.farm_btc = 0;
			message.user.biz = 0;
			message.user.sberbank.activation = 0;
			message.user.sberbank.number = 0;
			message.user.sberbank.cvv = 0;
			message.user.sberbank.user_name = `Не указано`;
			message.user.sberbank.balance = 0;
			message.user.rating = 1;
			message.user.mention = false;
			message.user.work = 0;
			message.user.coins = 0;
			message.user.report = true;
			message.user.report_flood = false;
			message.user.rabotat = false;
			message.user.support = 0;
			message.user.limit_sms = 25;
			message.user.chats12 = 0;
			message.user.groups1 = false;
			message.user.groups2 = `Пусто`;
			message.user.groups3 = false;
			message.user.group1 = false;
			message.user.group2 = false;
			message.user.group3 = false;
			message.user.group4 = false;
			flood_change_name = false;
			message.user.business = 0;
			notifications = true;
			message.user.exp = 1;
			message.user.level = 0;
			message.user.sex = `Не указано`;
			message.user.lvl = 1;
			message.user.verify = false;
			message.user.banks.limit = 250000000;
			message.user.transport.car = 0;
			message.user.transport.yacht = 0;
			message.user.transport.airplane = 0;
			message.user.transport.helicopter = 0;
			message.user.realty.home = 0;
			message.user.realty.apartment = 0;
			message.user.misc.phone = 0;
			message.user.misc.farm = 0;
			return bot(`вы умерли...`);
});


cmd.hear(/^(?:хранилище)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.bank) return bot(`📌 В вашем хранилище нету столько денег.`);
 
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

		return bot(`
💴 Вы успешно сняли со своего хранилища, ${utils.sp(message.args[1])}$
💳 Что-бы посмотреть остаток на счете, введите "хранилище"`);
	}
});
cmd.hear(/^(?:хранилище лимит)$/i, async (message, bot) => {
	
	if(message.user.balance < 250000000000) return bot(`⛏ У вас нет столько денег. Нужно 250.000.000.000$ для снятия ограничения.`)
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	message.user.balance -= 250000000000;
	message.user.banks.limit = 1000000000000000;

	return bot(`⛏ Вы успешно сняли лимит на вложения денег в хранилище.`);
});

cmd.hear(/^(?:хранилище)\s(.*)$/i, async (message, bot) => {

	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1] <= 0) return;
	if(message.args[1] <= 4) return bot(`⛏ Минимальная сумма вклада, 5$`);
	if(message.args[1] > message.user.banks.limit) return bot(`⛏ Максимальная сумма вклада на данный момент: ${utils.sp(message.user.banks.limit)}$\n\n🚀 Если у вас лимит меньше 1000трлн, то вы можете его убрать, введя команду "Хранилище Лимит"`);

	if(message.args[1] > message.user.balance) return bot(`🎁 Ой, у вас нет столько денег для пополнения хранилища.`);
 
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`💎 Успешно, вы положили в хранилище ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:приват|приватность|скрытность|скрытость)\s(вкл|выкл)$/i, async (message, bot) => {
	if(message.user.level < 3) return
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.group1 = true;
		return bot(`Приватность включена.`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.group1 = false;
		return bot(`Приватность выклчюена.`);
	}
});

cmd.hear(/^(?:пол)\s(мужской|женский)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1].toLowerCase() === 'мужской')
	{
		message.user.sex = `Мужчина`;
		return bot(`Вы указали мужской пол.`);
	}

	if(message.args[1].toLowerCase() === 'женский')
	{
		message.user.sex = `Женщина`;
		return bot(`Вы указали женский пол.`);
	}
});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`🚀 Вы отключили уведомления`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.notifications = true;
		return bot(`🚀 Уведомления включены :)`);
	}
});

cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.account.banpay) return bot(`У вас стоит запрет на передачу денег.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
	if(!message.user.verify){
		if(message.args[2] > message.user.limit_pay) return bot(`Ошибка, ваш максимальный лимит передачи равен: ${utils.sp(message.user.limit_pay)}$\nЧто-бы снять лимит, ваш аккаунт должен быть подтвержденным.`)
	}
	
	if(message.args[2] > message.user.balance) return bot(`🧳 Вы не можете передать столько денег, сколько нету на вашем балансе!`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`Игрок не найден в базе данных, может вы указали не правильный ID?\nПерепроверьте вводимые данные!`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		if(message.args[2] >= 100000000){
			let randomig = utils.random(100, 463);
			message.user.points += randomig;
			bot(`⚠ На ваш счет было зачисленно ${randomig} Points, за перевод другу.`);
		}

	    message.user.captcha_sms +=1;

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		
		await bot(`🚀 Вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[Пополнение вашего кошелька]
▶ 📩 На ваш счет пришло пополнения на сумму ${utils.sp(message.args[2])}$!
🔕 Если вас раздрожают такие уведомления, введите "Уведомления выкл", что-бы не получать подобных уведомлений!` });

	}
	
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`💎 Ого, вы популярны на: ${utils.sp(message.user.rating)}👑`);
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`⚠ Гиперссылка включена`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`⚠ Гиперссылка отключена`);
	}
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.user.account.banname) return bot(`Вы не можете поменять ник.\nВведите "Поменять ник [ник который хотите]"`);
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	message.user.tag = message.args[1];
	return bot(`🎉 Поздравляю, ваш новый игровой ник: "${message.user.tag}"`);
});

cmd.hear(/^(?:прейтинг)\s(.*)$/i, async (message, bot) => {
	if(message.user.points < Number(message.args[1] * 239)) return bot(`У вас недостаточно поинтов. Цена за 1 рейтинг: 239 Points `);
	message.user.points -= Number(message.args[1] * 239);
	message.user.rating += Number(message.args[1]);
	return bot(`🎉 Вы купили "${message.args[1]} Рейтинг(-а)" за ${utils.sp(message.args[1] * 239)} Points`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`Разделы магазина:
⠀⠀➕ Машины
⠀⠀➕ Яхты
⠀⠀➕ Самолеты
⠀⠀➕ Вертолеты
⠀⠀➕ Дома
⠀⠀➕ Квартиры
⠀⠀➕ Телефоны
⠀⠀➕ Фермы
⠀⠀👑 Рейтинг [кол-во]
⠀⠀➕ Бизнесы
⠀⠀🌐 Биткоин [кол-во]`);
});

cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	let options = {
		count: null
	}

	message.args[2] = message.args[1].split(' ')[1];

	if(!message.args[2]) options.count = 1;
	if(message.args[2])
	{
		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.car) return bot(`Увы, но у вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;
		message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свою машину за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`Увы, но у вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`Увы, но у вас нет самолёта`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свой самолёт за ${utils.sp(a)}$`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`Увы, но у вас нет самолёта`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свой вертолёт за ${utils.sp(a)}$`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`Увы, но у вас нет дома`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свой дом за ${utils.sp(a)}$`);
	}
	

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`Увы, но у вас нет квартиры`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свою квартиру за ${utils.sp(a)}$`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`Увы, но у вас нет телефона`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свой телефон за ${utils.sp(a)}$`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.farm) return bot(`Увы, но вы не владеете фермой`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		message.user.misc.farm = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свою ферму за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`Вот ведь не задача, но у вас нет рейтинга, что бы продать его...`);
		let a = (150000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`Вы не владеете бизнесом`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали свой бизнес за ${utils.sp(a)}$`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`У вас нет столько биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '✅' : '⛔'} 1. Ролики (500$)
${message.user.transport.car === 2 ? '✅' : '⛔'} 2. Велик (2.500$)
${message.user.transport.car === 3 ? '✅' : '⛔'} 3. Лодка (5.000$)
${message.user.transport.car === 4 ? '✅' : '⛔'} 4. ВАЗ 2106 (7.500$)
${message.user.transport.car === 5 ? '✅' : '⛔'} 5. Уазик (50.000$)
${message.user.transport.car === 6 ? '✅' : '⛔'} 6. BMW m3 (1.000.000$)
${message.user.transport.car === 7 ? '✅' : '⛔'} 7. Mercedes С Сlass (2.000.000$)
${message.user.transport.car === 8 ? '✅' : '⛔'} 8. Lexus (5.000.000$)
${message.user.transport.car === 9 ? '✅' : '⛔'} 9. Porshe (50.000.000$)
${message.user.transport.car === 10 ? '✅' : '⛔'} 10. Mercedes g63 (100.000.000$)

Для покупки авто, введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`Дак у вас же уже есть машина, куда вам 2 то?, введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`Ахах, у тебя нет столько денег для покупки авто`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;
		message.user.captcha_sms +=1;
		return bot(`🚀 🚀 Вы успешно купили ${sell.name}`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '✅' : '⛔'} 1. Двух местная лодка (10.000$)
${message.user.transport.yacht === 2 ? '✅' : '⛔'} 2. NautIkle RG (10.000.000$)
${message.user.transport.yacht === 3 ? '✅' : '⛔'} 3. Fordhadrin 56-RGS' (15.000.000$)

Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`Извините, но вы уже имеете яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '✅' : '⛔'} 1. Парашут (100.000$)
${message.user.transport.airplane === 2 ? '✅' : '⛔'} 2. ИЛ-73 (350.000$)

Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`Извините, но вы уже имеете самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '✅' : '⛔'} 1. Вертолет Bronze Class (2$)
${message.user.transport.helicopter === 2 ? '✅' : '⛔'} 2. Вертолет Silver Class (300.000$)
${message.user.transport.helicopter === 3 ? '✅' : '⛔'} 3. Вертолет Gold Class (450.000$)

Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`Извините, но вы уже имеете вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '✅' : '⛔'} 1. Подвал в 5-ти этажке (250$)
${message.user.realty.home === 2 ? '✅' : '⛔'} 2. Подъезд (3.000$)
${message.user.realty.home === 3 ? '✅' : '⛔'} 3. Квартира (3.500$)
${message.user.realty.home === 4 ? '✅' : '⛔'} 4. Дача (5.000$)
${message.user.realty.home === 5 ? '✅' : '⛔'} 5. Особняк за городом (10.000$)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`Извините, но вы уже имеете дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	 
	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '✅' : '⛔'} 1. Квартира в Санк-Петербурге (15.000$)
${message.user.realty.apartment === 2 ? '✅' : '⛔'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '✅' : '⛔'} 3. Двухкомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '✅' : '⛔'} 4. Пятикоманатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '✅' : '⛔'} 5. Десятикомнатная квартира (500.000$)

Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`Извините, но вы уже имеете квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	 
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '✅' : '⛔'} 1. Lenovo (250$)
${message.user.misc.phone === 2 ? '✅' : '⛔'} 2. Xiomi MI5 (500$)
${message.user.misc.phone === 3 ? '✅' : '⛔'} 3. Honor 7C (2.000$)
${message.user.misc.phone === 4 ? '✅' : '⛔'} 4. Honor 7A Pro (10.000$)
${message.user.misc.phone === 5 ? '✅' : '⛔'} 5. IPhone 4 (15.000$)
${message.user.misc.phone === 6 ? '✅' : '⛔'} 6. IPhone 5S (30.000$)

Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`Извините, но вы уже имеете телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
 
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '✅' : '⛔'} 1. GTX I8 2₿/в час (20.500.000$)
${message.user.misc.farm === 2 ? '✅' : '⛔'} 2. NV-890 10₿/в час (100.000.000$)
${message.user.misc.farm === 3 ? '✅' : '⛔'} 3. Gold GTX 100₿/в час (900.000.000$)

Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.farm) return bot(`Извините, но вы уже имеете ферма (${farms[message.user.misc.farm - 1].name}), введите "Продать ферму"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`⚙ У вас нету столько денег, 1 рейтинг стоит 250kk`);
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];
message.user.captcha_sms +=1;
		return bot(`💽 🚀 Вы успешно купили ${message.args[1]} рейтинга за ${message.args[1] * 250000000}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);

	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '✅' : '⛔'} 1. Автомойка - 50.000$
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.business === 2 ? '✅' : '⛔'} 2. РосПечать - 100.000$
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.business === 3 ? '✅' : '⛔'} 3. Магазин - 300.000$
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.business === 4 ? '✅' : '⛔'} 4. Супер-маркет - 500.000$
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.business === 5 ? '✅' : '⛔'} 5. Командор - 1.500.000$
⠀ ⠀ ⠀ Прибыль: 8.000$/час
${message.user.business === 6 ? '✅' : '⛔'} 6. Аллея - 25.000.000$
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.business === 7 ? '✅' : '⛔'} 7. Спортмастер - 80.000.000$
⠀ ⠀ ⠀ Прибыль: 220.000$/час

Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`Извините, но вы уже имеете бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`У вас нет столько денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
	message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});




cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`
💸Биткоин стоит: ${utils.sp(btc)}$
🔋 Coins стоит: ${utils.sp(coins)}$`);
});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`🚀 У вас нет столько денег\nКурс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];
	message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});


cmd.hear(/^(?:купить coin|купить коины|купить коин|купить coins)\s(.*)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * coins ) > message.user.balance) return bot(`💎 У вас нет столько денег\n🚀 Курс Coin: ${utils.gi(coins)}$`);
	else if(( message.args[1] * coins ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * coins );
		message.user.coins += message.args[1];
message.user.captcha_sms +=1;
		return bot(`🚀 Вы успешно купили ${utils.sp(message.args[1])} Coins, за ${utils.sp(message.args[1] * coins)}$`);
	}
});


cmd.hear(/^(?:состав)$/i, async (message, bot) => {
	if(message.user.level < 2) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	let top = [];

	users.map(x=> {
		top.push({ level: x.level, uid: x.uid, tag: x.tag, groups2: x.groups2, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.level - a.level;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];
		
	
			if(user.level > 1){
			text += `😎 ID: ${user.uid} || 🛑 Администратор ${user.level} уровеня
		`;
			}
		
		
		
	}

	return bot(`Список Администраторов: 
	${text}`);
});

cmd.hear(/^(?:блокировки|блоки|запреты|чс)$/i, async (message, bot) => {
	if(message.user.level < 1) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	let top = [];

	users.map(x=> {
		top.push({ groups4: x.groups4, uid: x.uid, tag: x.tag, groups2: x.groups2, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.groups4 - a.groups4;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];
		
	
			if(user.groups4){
			text += `⛔ ID: ${user.uid} | Введите "лист ${user.uid}"\n`;
			}
		
		
		
	}

	return bot(`Список блокировок: 
	${text}`);
});

cmd.hear(/^(?:лист)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 1) return
	let user = users.find(x=> x.uid === Number(message.args[1]));
	return bot(`Бан на игры: ${user.account.bangame.toString().replace(/true/gi, "✅ Есть").replace(/false/gi, "⛔ Нету")}\nБан аккаунта:  ${user.account.ban.toString().replace(/true/gi, "✅ Есть").replace(/false/gi, "⛔ Нету")}\nБан репорта: ${user.account.banrep.toString().replace(/true/gi, "✅ Есть").replace(/false/gi, "⛔ Нету")}\nБан на передачи: ${user.account.banpay.toString().replace(/true/gi, "✅ Есть").replace(/false/gi, "⛔ Нету")}\nБан на смену ника: ${user.account.banname.toString().replace(/true/gi, "✅ Есть").replace(/false/gi, "⛔ Нету")}`)
});
cmd.hear(/^(?:репорты|реп|список репортов|неотвеченные репы)$/i, async (message, bot) => {
	if(message.user.level < 1) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	let top = [];

	users.map(x=> {
		top.push({ report_flood: x.report_flood, uid: x.uid, tag: x.tag, groups2: x.groups2, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.report_flood - a.report_flood;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];
		
	
			if(user.report_flood){
			text += `ID: ${utils.gi(user.uid)} - ${user.report_flood.toString().replace(/true/gi, "Нет ответа.")} || 💭 Сообщение: ${user.groups2}\n`;
			}
		
		
		
	}

	return bot(`Список репортов: 
	${text}`);
});

cmd.hear(/^(?:топ баланс)$/i, async (message, bot) => {
	if(users.length < 10) return bot(`Топ на данный момент не работает, т.к мало пользователей!`)
		if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.balance - a.balance;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — $${utils.sp(user.balance)}
		`;
	}

	return bot(`топ игроков по балансу:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — $${utils.sp(message.user.balance)}`);
});

cmd.hear(/^(?:сохранить)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	saveUsers();
	return bot(`Вы успешно сохранили свой профиль.`)
});

cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	if(users.length < 10) return bot(`Топ на данный момент не работает, т.к мало пользователей!`)
		if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.rating - a.rating;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑${utils.sp(user.rating)} | $${utils.sp(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} | $${utils.sp(message.user.balance)}`);
});
cmd.hear(/^(?:кейс|case|кейсы)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`
1.Кейс деревянный 1.000 - (приз: 500-2К)
2.Кейс золотой 50.000 - (приз: 30К-60К)
3.Кейс алмазный 100.000 - (приз: 70К-110К
4.Кейс изумрудный 500.000 - (приз: 300К-585К)`);
	
});

cmd.hear(/^(?:Кейс изумрудный)$/i, async (message, bot) => {
	if(message.user.balance < 500000) return bot(`Недостаточно денег`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let randmon = utils.random(300000, 585346);
	message.user.balance -= 500000;
	message.user.balance += randmon;
	return bot(`+${utils.sp(randmon)}$`);
});
cmd.hear(/^(?:Кейс алмазный)$/i, async (message, bot) => {
	if(message.user.balance < 100000) return bot(`Недостаточно денег`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let randmon = utils.random(70000, 110000);
	message.user.balance -= 100000;
	message.user.balance += randmon;
	return bot(`+${utils.sp(randmon)}$`);
});
cmd.hear(/^(?:Кейс золотой)$/i, async (message, bot) => {
	if(message.user.balance < 50000) return bot(`Недостаточно денег`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let randmon = utils.random(30000, 60000);
	message.user.balance -= 50000;
	message.user.balance += randmon;
	return bot(`+${utils.sp(randmon)}$`);
});
cmd.hear(/^(?:Кейс деревянный)$/i, async (message, bot) => {
	if(message.user.balance < 1000) return bot(`Недостаточно денег`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let randmon = utils.random(500, 2000);
	message.user.balance -= 1000;
	message.user.balance += randmon;
	return bot(`+${utils.sp(randmon)}$`);
});


cmd.hear(/^(?:коины|коин|coin|coins)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	return bot(`🚀 У вас ${utils.sp(message.user.coins)} Coin\n🚀 Что-бы купить коины, введите "Купить коины [кол-во]"\n🚀 Что-бы продать, введите "Продать коины [кол-во]\n\n⚠ Это самая уникаьная валюта в нашем боте.\n🔑 Скоро ее уже нельзя будет купить...`)
});

cmd.hear(/^(?:бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`Вы уже получали бонус за эти 24 часа, подождите 24 часа, и можете открыть еще раз бонус.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;
	message.user.quest.bonus +=1;

	if(prize === 1)
	{
		message.user.balance += 50000;
		return bot(`🚀 Ого, вы выиграли 50.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`🚀 Ого, вы выиграли 1.000₿`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		return bot(`🚀 Ого, вы выиграли 5👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		return bot(`🚀 Ого, вы выиграли 1👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		return bot(`🚀 Ого, вы выиграли 10👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		return bot(`🚀 вы выиграли 2👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		return bot(`🚀 Ого, вы выиграли 3👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		return bot(`🚀 Ого, вы выиграли 4👑!\n👑 Теперь у вас: ${utils.sp(message.user.rating)} Рейтинг(-а)`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		return bot(`🚀 Ого, вы выиграли 1.000.000$ в ваше хранилище!\n💳 В хранилище: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		return bot(`🚀 Ого, вы выиграли 5.000.000$ в ваше хранилище!\n💳 В хранилище: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		return bot(`🚀 Ого, вы выиграли 10.000.000$ в ваше хранилище!\n💳 В хранилище: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		return bot(`🚀 Ого, вы выиграли 50.000.000$ в ваше хранилище!\n💳 В хранилище: ${utils.sp(message.user.bank)}$`);
	}
});

cmd.hear(/^(?:заразить)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.groups3) return bot(`Вы не можете заразить, потому что вы здоровы.`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`Вы указали не правильный ID.`);
	if(user.groups3) return bot(`Пользователь уже заражен коронавирусом.`);
	if(message.user.group5) return bot(`Вы уже заражали пользователя, попросите друзей.`);
	message.user.group5 = true;
	user.groups3 = true;
	user.chats12 = 5;

	return bot(`🚀 Пользователь был заражен на 5%`);
});

cmd.hear(/^(?:points|point|поинт|поинты)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let us_id = message.user.id;
	return bot(`🚀 Ваш счет Points: ${utils.sp(message.user.points)}
	😨 Points Вы можете заработать если переведете другу больше 100.000.000$
	
	🏆 1. Прейтинг [кол-во] - купить рейтинг за поинты`);
	message.sendSticker(14085);
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
	if(message.user.level < 4) return;
	let randoming = utils.random(1, 6);
	users.filter(x=> x.id !== 1).map(zz => { 
			vk.api.messages.send({ user_id: zz.id, message: `📩 ${message.args[1]}\n\n🔕 Бот в момент рассылки, будет отключен на 5 минут`}); 

		}); 
		let people = 0;
		bot(`рассылка отправлена!`);
		for(let id in users) {
		vk.api.call('messages.send', {
		chat_id: id,
		message: `📩 ${message.args[1]}\n\n🔕 Бот в момент рассылки, будет отключен на ${randoming} минут(-ы) `,
	    sticker_id: 14085 }); 
		}
			return;
	});



cmd.hear(/^(?:перевести)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.account.banpay) return bot(`У вас стоит запрет на передачу денег.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
 
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.sberbank.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.sberbank.balance) return bot(`🧳 Вы не можете передать столько денег, сколько нету на вашем балансе!`);
	else if(message.args[2] <= message.user.sberbank.balance)
	{
		let user = users.find(x=> x.sberbank.number === Number(message.args[1]));
		if(!user) return bot(`Номер карты не найден в базе данных, может вы указали не правильный номер карты?\nПерепроверьте вводимые данные!`);

		if(user.sberbank.number === message.user.sberbank.number) return bot(`неверный ID`);

		message.user.sberbank.balance -= message.args[2];
		user.sberbank.balance += message.args[2];
message.user.captcha_sms +=1;
		await bot(`Вы перевели игроку ${user.tag} ${utils.sp(message.args[2])}$ на карту`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[Пополнение вашей карты]
▶ 📩 На вашу карту пришло пополнения на сумму ${utils.sp(message.args[2])}$!
🔕 Если вас раздрожают такие уведомления, введите "Уведомления выкл", что-бы не получать подобных уведомлений!` });
	}
});

cmd.hear(/^(?:поменять ник)\s([^]+)$/i, async (message, bot) => {
	if(message.user.flood_change_name) return bot(`Ошибка, дождитесь смены ника.`);
	if(message.args[1].length >= 121) return bot(`Максимальное количество символов 120`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	const otvers = utils.random(6);
	vk.api.messages.send({ 
	peer_id: 2000000101, 
	message: `🔎 ID игрока: ${message.user.uid}\n⚙ Ник который хочет: ${message.args[1]}\n\n📝 Для смены ника введите введите "setnick ${message.user.uid} ${message.args[1]}"` 
		})
	message.user.flood_change_name = true;
	return bot(`✉ Вы отправили заявку на смену ника.\n📮 Примерное время ожидания ответа ${otvers} час(ов)`);
});


cmd.hear(/^(?:город|деревня|поселок|село)\s(.*)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	if(message.args[1].length >= 26) return bot(`Максимальная длина 25 символов.`);
	message.user.captcha_sms +=1;
	message.user.group1 = message.args[1];
	return bot(`✉ Вы успешно добавили новое место: ${message.args[1]}`);	
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	if(message.user.report_flood) return bot(`[АНТИ-ФЛУД] Извините, но вы уже писали в репорт, подождите пока ответят на ваш репорт.`);
	if(message.user.account.banrep) return bot(`Вы не можете написать в репорт, у вас стоит блокировка.`);
	if(message.args[1].length >= 121) return bot(`Максимальное количество символов 120`);
	const reportts = utils.random(24);
	const otvers = utils.random(13);
	vk.api.messages.send({ 
	peer_id: 2000000101, 
	message: `[Поступила новая жалоба от игрока: ${message.user.tag}]\n\n\n🔎 ID игрока: ${message.user.uid}\n⚙ Сообщение: ${message.args[1]}\n\n📝 Для ответа введите "ответ ${message.user.uid} [ваше сообщение, без скобок]"\n📖 Подробная информация: "get ${message.user.uid}"` 
		})

	message.user.report_flood = true;
	message.user.groups2 = message.args[1];
	return bot(`✉ Вы успешно отправили сообщение Администрации.\n⏰ Вы ${reportts} в очереди.\n\n📮 Примерное время ожидания ответа ${otvers} час(ов)`);
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.support < 1) return bot(`Вы не саппорт.`);
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	if(message.user.admin.banotvet) return bot(`У вас стоит запрет на ответы в репорт`);


	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	if(!user.report_flood) return bot(`Ошибка, игрок не писал в репорт, либо на него уже ответили.`);
	message.user.admin.otvet +=1;
	user.report_flood = false;
	vk.api.messages.send({ user_id: user.id, message: `⏰  Пришел ответ от Администрации\n\n✉ Сообщение: ${message.args[2]}\n\n📮 С уважением, Администратор ${message.user.tag}` });
	
	return bot(`Ответ отправлен.`);
});

cmd.hear(/^(?:beta_no)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 4) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `✉ Увы, но ваша заявка была отклонена.\n\n📮 С уважением, Администратор ${message.user.tag}` });
	
	return bot(`👍🏻 Ответ отправлен.`);
});

cmd.hear(/^(?:модератор)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 6) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	vk.api.groups.editManager({access_token: `06b6e26179d31367c91d2289edda0ebf83ba851f926f66e470128d756d7f9fbc2676d0b7d5bb76a79e556`, group_id: 178373573, user_id: user.id, role: `moderator` });
	return bot(`Пользователь был добавлен в список модераторов сообщества!`)
});

cmd.hear(/^(?:администратор)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 6) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	vk.api.groups.editManager({access_token: `06b6e26179d31367c91d2289edda0ebf83ba851f926f66e470128d756d7f9fbc2676d0b7d5bb76a79e556`, group_id: 178373573, user_id: user.id, role: `administrator` });
	return bot(`Пользователь был добавлен в список администраторов сообщества!`)
});

cmd.hear(/^(?:редактор)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 6) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	vk.api.groups.editManager({access_token: `06b6e26179d31367c91d2289edda0ebf83ba851f926f66e470128d756d7f9fbc2676d0b7d5bb76a79e556`, group_id: 178373573, user_id: user.id, role: `editor` });
	return bot(`Пользователь был добавлен в список редакторов сообщества!`)
});

cmd.hear(/^(?:лимит)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 4) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	user.banks.limit = 1000000000000000;
	return bot(`Пользователю был снят лимит на хранилище.`)
});

cmd.hear(/^(?:beta_yes)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.level < 4) return;
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	vk.api.messages.send({ user_id: user.id, message: `✉ Ваша заявка была одобрена\n\n📮 С уважением, Администратор ${message.user.tag}\n\n👍🏻 Напишите: vk.com/police_rg` });
	return bot(`👍🏻 Ответ отправлен.`);
});

cmd.hear(/^(?:статистика|стата)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора.`);
	if(message.user.level < 1) return;
	return bot(`
Ваш уровень Администратора: ${message.user.level}
Ответов на репорты: ${utils.sp(message.user.admin.otvet)}`);
});


cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.user.work) return bot(`На данный момент, ваша работа ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Отдохните 10 минут, и продолжайте работать` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.lvl) return bot(`Вы не можете устроиться на эту работу, ваш уровень слишком мал`);

	else if(work.requiredLevel <= message.user.lvl)
	{
		message.user.work = work.id;
		return bot(`Вы успешно устроились на работу ${work.name}
		👔 Введите команду "Работать"`);
	}
});

cmd.hear(/^(?:работа)$/i, async (message, bot) => {
if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.user.work) return bot(`На данный момент, ваша работа ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Отдохните 10 минут, и продолжайте работать` : ``}`);
	return bot(`Список работ:
	✅ 1. Грузчик - зарплата ~10.000$
	✅ 2. Водитель автобуса - зарплата ~20.000$
	✅ 3. Водитель скорой помощи - зарплата ~30.000$
	✅ 4. Помощник машиниста - зарплата ~40.000$
	✅ 5. Машинист - зарплата ~50.000$
	
	Что-бы устроиться на работу, введите "Работа [номер работы]`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(!message.user.work) return bot(`😩 Вы еще не устроились на работу\nДля трудоустройства введите "Работа"`);
		
		if(message.user.timers.hasWorked) return bot(`Ваша смена была закончена\n⏳ Вы сможете работать только через 10 минут`);
	
	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);
		
	
	if(message.user.timers.hasWorked) return bot(`Ваша смена была закончена\n⏳ Вы сможете работать только через 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`💵 Ваша смена была закончена\n💵 Вы заработали ${utils.sp(earn)}$`);
	

});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`Вы еще не устроились на работу`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	
	message.user.work = 0;
	return bot(`Эх, уволился самый лучший сотрудник...`);
});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	if(message.user.account.bangame) return bot(`Вы не можете играть в игры, у вас стоит блокировка.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	const randomsd = utils.random(240935,300000);
	if(int == message.args[1])
	{
		message.user.balance += randomsd;
		return bot(`👍 Хм.. вы выйграли ${randomsd}$`);
	} else return bot(`🤔 Эх, вы не угодали, это было число ${int}`);
});

cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	if(message.user.account.bangame) return bot(`Вы не можете играть в игры, у вас стоит блокировка.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	message.user.quest.kazino +=1;
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`На вашем счету нету такой суммы.`);
	else if(message.args[1] <= message.user.balance)
	{
		
			message.user.balance -= message.args[1];
			
				const multiply = utils.pick([0.50, 0.75, 2, 1, 5, 0, 0, 0, 0.70, 0.5, 2, 1, 0.90, 1, 0, 0, 0.54, 0.1, 2, 0]);
		
			message.user.balance += Math.floor(message.args[1] * multiply);
		
		return bot(`${multiply === 1 ? `😧 Ого, везет вам сегодня, ваши деньги остаются при вас` : `${multiply < 1 ? `👺 Увы, но вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `😇 Ваш выйгрыш ${utils.sp(message.args[1] * multiply)}$`}`} (+Х${multiply})`);
	}
});

cmd.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	if(message.user.account.bangame) return bot(`Вы не можете играть в игры, у вас стоит блокировка.`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`На вашем счету нету такой суммы.`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`${nav === 1 ? `Евро повысился⤴` : `Евро подешевел⤵`} на ${utils.random(13)} рублей
			👑 Вы заработали на свой счет +${message.args[2] * multiply}$
			💰 Баланс: ${message.user.balance}$`);
		} else {
			return bot(`${nav === 2 ? `Евро повысился⤴` : `Евро подешевел⤵`} на ${utils.random(13)} рублей
			👀 Вы потеряли со своего счета ${message.args[2]}$ 
			💰 Баланс: ${message.user.balance}`);
		}
	}
});



cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`Вы не владеете никаким бизнесом`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`Статистика бизнеса "${biz.name}":
	💸 Вы получаете: ${utils.sp(biz.earn)}$/час
	💰 На счету бизнеса сейчас находится: ${utils.sp(message.user.biz)}$`);
});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`Вы не владеете никаким бизнесом`);
	if(!message.user.biz) return bot(`На счету вашего бизнеса, нету денег`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`Вы сняли со счёта своего предприятия ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`У вас нету майнинг ферм`);
	if(!message.user.farm_btc) return bot(`На ферме пока-что ничего нет, через час будут биткоины`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`Вы намайнили ${utils.sp(btc_)}₿, следующие биткоины появятся через час
	🌐 Теперь у Вас биткоинов: ${utils.sp(message.user.btc)}฿`);
});


cmd.hear(/^(?:ban)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);	
	if(message.user.level < 3) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.account.ban = true; 
	user.groups4 = true;
	return bot(`Игрок ${user.tag} забанен\nПричина бана: ${message.args[2]}`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
Вы получили блокировку аккаунта\nПричина блокировки: ${message.args[2]}` }); 
		
} 
});

cmd.hear(/^(?:banpay)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);	
	if(message.user.level < 3) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.account.banpay = true; 
	user.groups4 = true;
	return bot(`Игрокy ${user.tag} был выдан запрет на передачу валюты.\nПричина: ${message.args[2]}`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
Вы получили блок на передачу валюты.\nПричина блокировки: ${message.args[2]}` }); 
		
} 
});

cmd.hear(/^(?:unbanpay)\s([0-9]+)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);	
	if(message.user.level < 3) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.account.banpay = false; 
	
	return bot(`Игрокy ${user.tag} был снят запрет на передачу валюты.`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
Вам сняли запрет на передачу валюты.` }); 
		
} 
});

cmd.hear(/^(?:banrep)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);	
	if(message.user.level < 3) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.account.banrep = true; 
	user.groups4 = true;
	return bot(`Игрокy ${user.tag} был выдан запрет на написание в репорт.\nПричина: ${message.args[2]}`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
Вы получили блокировку репорта.\nПричина блокировки: ${message.args[2]}` }); 
		
} 
});

cmd.hear(/^(?:unbanrep)\s([0-9]+)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);	
	if(message.user.level < 3) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.account.banrep = false; 
	
	return bot(`Игрокy ${user.tag} был снят блок на репорт.`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
Вам сняли блокировку репорта.` }); 
		
} 
});

cmd.hear(/^(?:unban)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.account.ban = false; 


	return bot(`Вы разбанили игрока ${user.tag}`); 	
} 
});
cmd.hear(/^(?:user)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 0; 


	return bot(`Вы выдали игроку ${user.tag} User`); 	
} 
});

cmd.hear(/^(?:helper)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 1; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Helper`); 	
} 
});
cmd.hear(/^(?:moder)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 2; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Moder`); 	
} 
});
cmd.hear(/^(?:саппорт)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} доступ к репорту.`); 	
} 
});
cmd.hear(/^(?:support)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 3; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Support`); 	
} 
});
cmd.hear(/^(?:admin)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 4; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Admin`); 	
} 
});
cmd.hear(/^(?:gladmin)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 5; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Gl.Admin`); 	
} 
});

cmd.hear(/^(?:developer)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 6) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.level = 7; 
	user.support = 1;

	return bot(`Вы выдали игроку ${user.tag} Developer`); 	
} 
});

cmd.hear(/^(?:bancmd)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.admin.bancmd = true; 
	user.groups4 = true;

	return bot(`Вы выдали игроку ${user.tag} бан на использование админ-команд`); 	
} 
});

cmd.hear(/^(?:banname)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 3) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.account.banname = true; 
	user.groups4 = true;

	return bot(`Вы выдали игроку ${user.tag} бан на смену ника`); 	
} 
});

cmd.hear(/^(?:админка)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.id !== 465413320) return
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 
	user.level = message.args[2];
	return bot(`ok`)
});

cmd.hear(/^(?:стоп|выключить|перезагрузка)$/i, async (message, bot) => {
	if(message.user.id !== 465413320) return
	await bot(`вы успешно отключили бота.`);

	await saveUsers();
	process.exit(-1);
	console.log("node app")
});

cmd.hear(/^(?:unbanname)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.account.banname = false; 


	return bot(`Вы сняли игроку ${user.tag} бан на смену ника`); 	
} 
});

cmd.hear(/^(?:unbancmd)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.admin.bancmd = false; 


	return bot(`Вы сняли игроку ${user.tag} бан на использование админ-команд`); 	
} 
});

cmd.hear(/^(?:bangame)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.account.bangame = true; 
	user.groups4 = true;

	return bot(`Вы выдали игроку ${user.tag} бан на игры`); 	
} 
});

cmd.hear(/^(?:unbangame)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.account.bangame = false; 


	return bot(`Вы сняли игроку ${user.tag} бан на игры`); 	
} 
});

cmd.hear(/^(?:limitsms)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 4) return;
		{ 
		let user = users.find(x=> x.uid === Number(message.args[1]));  
	
		user.limit_sms = Number(message.args[2]); 
	
		await bot(`Лимит СМС игрока ${user.tag}, изменен на ${utils.sp(message.args[2])}`); 	
		}
		});

cmd.hear(/^(?:setlimit)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 4) return;
		{ 
		let user = users.find(x=> x.uid === Number(message.args[1]));  
	
		user.limit_pay = Number(message.args[2]); 
	
		await bot(`Лимит игрока ${user.tag}, изменен на ${utils.sp(message.args[2])}$`); 	
		}
		});

		cmd.hear(/^(?:изменить номер)\s([0-9]+)$/i, async (message, bot) => {
			if(!message.user.user_sberbank) return bot(`Вы не сотрудник банка.\nНо если вы хотите им стать, напишите ему [police_rg|Admin]`);
	
		{ 
			let user = users.find(x=> x.uid === Number(message.args[1]));  
			let number_karty = utils.random(385395526, 987539526);
			user.sberbank.number = number_karty; 
				
			await bot(`Теперь у @id${user.id}(${user.tag}) новый номер карты, номер: ${number_karty}\nНе забудьте сообщить ему, о смене номера карты.`); 	
		}
	});

	cmd.hear(/^(?:изменить)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
		if(!message.user.user_sberbank) return bot(`Вы не сотрудник банка.\nНо если вы хотите им стать, напишите ему [police_rg|Admin]`);
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1]));  
		user.sberbank.user_name = message.args[2]; 
			
		await bot(`Теперь у @id${user.id}(${user.tag}) новое Имя на карте.`); 	
	}
});

cmd.hear(/^(?:минус)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.user_sberbank) return bot(`Вы не сотрудник банка.\nНо если вы хотите им стать, напишите ему [police_rg|Admin]`);
{ 
	let user = users.find(x=> x.uid === Number(message.args[1]));  
	if(message.args[2] > user.sberbank.balance) return bot(`Ошибка, у данного пользователя нет столько денег, его баланс: ${utils.sp(user.sberbank.balance)}`)
	
	user.sberbank.balance -= message.args[2]; 
	await bot(`Теперь у @id${user.id}(${user.tag}) остаток на карте ${utils.sp(user.sberbank.balance)}.`); 	
}
});

cmd.hear(/^(?:заблокировать карту)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.user_sberbank) return bot(`Вы не сотрудник банка.\nНо если вы хотите им стать, напишите ему [police_rg|Admin]`);
{ 
	let user = users.find(x=> x.uid === Number(message.args[1]));  
	if(user.sberbank.activation !== 1) return bot(`Ошибка, у данного пользователя карта либо не создана, либо заблокирована.`)
	
	user.sberbank.activation = 0; 	
	user.sberbank.cvv = 0; 
	user.sberbank.number = 0; 
	user.sberbank.balance = 250; 
	
	await bot(`Теперь у @id${user.id}(${user.tag}) карта заблокирована.`); 	
}
});


	cmd.hear(/^(?:карты)$/i, async (message, bot) => {
		if(!message.user.user_sberbank) return bot(`Вы не сотрудник банка.\nНо если вы хотите им стать, напишите ему [police_rg|Admin]`);
	return bot(`Список команд:
	✅ 1. Изменить номер [id] - сменить номер карты пользователю\n
	✅ 2. Изменить [id] [Имя] - сменить владельца карты, то есть "Имя"\n
	✅ 3. Минус [id] [сумма] - снять деньги с карты пользователя\n
	✅ 4. Заблокировать карту [id] - заблокать карту
	
	
	‼ Правила для сотрудника банка:
	⚠ 1. Сотрудник не должен просто так снимать деньги со счетов других игроков. (Наказание: устный выговор)
	⚠ 2. Сотрудник не должен менять номер карты без ведома игрока. (Наказание: устный выговор)
	⚠ 3. Сотрудник не должен менять имя владельца карты, без ведома игрока (Наказание: устный выговор)
	⚠ 4. Сотрудник не должен блокировать карту просто так. (Наказание: снятие, без возврата. Смотря какая сумма была на счету карты)`);
});

cmd.hear(/^(?:user_bank)\s([0-9]+)$/i, async (message, bot) => {
		if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
		if(message.user.level < 4) return;
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1]));  
		if(!user) return bot(`неверный ID игрока`);
		user.user_sberbank = true; 
			
		await bot(`Теперь ${user.tag} имеет доступ к картам.\nПодробнее можно узнать, введя "Карты"`); 	
	}
});	

cmd.hear(/^(?:setnick)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 1) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1]));  
	if(!user) return bot(`неверный ID игрока`);

	user.tag = message.args[2]; 
	user.flood_change_name = false;

	await bot(`Ник успешно изменен.`); 	
	}
	});
	
	
	cmd.hear(/^(?:givedonate)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.admin.bangivemoney) return bot(`У вас стоит запрет на выдачу денег/доната`);
if(message.user.level < 6) return;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 

	if(message.args[2] <= 0) return; 

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.donate += message.args[2]; 


	await bot(`Вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} доната`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
	Администратор ${message.user.tag} выдал вам ${utils.sp(message.args[2])} доната! 
	🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	
	}
	});

cmd.hear(/^(?:givemoney)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.admin.bangivemoney) return bot(`У вас стоит запрет на выдачу денег`);
if(message.user.level < 6) return;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 

	if(message.args[2] <= 0) return; 

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.balance += message.args[2]; 


	await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`); 
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
	Администратор ${message.user.tag} выдал вам ${utils.sp(message.args[2])}$! 
	🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	
	}
	});
	
	


cmd.hear(/^(?:панель)$/i, async (message, bot) => { 
if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 1) return;
	return bot(`
➡ ban [id] [причина] - заблокировать аккаунт (3 LVL)\n
➡ unban [id] - разблокировать аккаунт (4 LVL)\n
➡ givemoney [id] [сумма] - выдать денег (6 LVL)\n
➡ get [id] - посмотреть статистику игрока (1 LVL)\n
➡ ответ [id] [text] - ответ на репорт (1 LVL)\n
➡ деньги - получить 1ккк (3 LVL)\n
➡ banpay [id] [причина] - выдать бан передачи (3 LVL)\n
➡ banall [id] - выдать бан на все (5 LVL)\n
➡ unbanall [id] - снять бан со всего (5 LVL)\n
➡ unbanpay [id] - снять бан передачи (3 LVL)\n
➡ banrep [id] [причина] - выдать бан репорта (3 LVL)\n
➡ unbanrep [id] - снять запрет на репорт (3 LVL)\n
➡ убрать с чс [id] - убрать с листа (3 LVL)\n
➡ bancmd [id] - выдать запрет на админ-команды (5 LVL)\n
➡ accept [id] - выдать галочку (4 LVL)\n
➡ limitsms [id] [кол-во] - лимит на сообщения (4 LVL)\n
➡ unaccept [id] - забрать галочку (4 LVL)\n
➡ setlimit [id] [сумма] - сменить лимит передачи валюты (4 LVL)\n
➡ чс [id] - лист тех, у кого блокировки (1 LVL)\n
➡ banotvet [id] - выдать бан на ответы в репорт (4 LVL)\n
➡ user_bank [id] - выдать доступ к картам (4 LVL)\n
➡ состав - список админов (2 LVL)\n
➡ unbanotvet [id] - снять бан на ответы в репорт (4 LVL)\n
➡ banname [id] - выдать запрет на смену ника (3 LVL)\n
➡ unbanname [id] - снять запрет на смену ника (5 LVL)\n
➡ user [id] - снять с админки(6 LVL)\n
➡ приватность [вкл/выкл] - приватность профиля (get) (3 LVL)\n
➡ unbancmd [id] - снять запрет на использование админ-команд (5 LVL)\n
➡ bangame [id] - выдать запрет на игры (4 LVL)\n
➡ unbangame [id]  - снять запрет на игры (5 LVL)\n
➡ bronze [id]  - выдать статус (5 LVL)\n
➡ silver [id]  - выдать статус (5 LVL)\n
➡ gold [id]  - выдать статус (5 LVL)\n
➡ helper [id] - выдать Хелпера(6 LVL) \n
➡ setnick [id] [ник] - сменить ник игроку (1 LVL)\n
➡ moder [id]  выдать модератора(6 LVL) \n
➡ support [id] - выдать Следящего(6 LVL)\n 
➡ admin [id] - выдать Администратора (6 LVL)\n
➡ gladmin [id] - Выдать ГЛ.Админа (6 LVL)\n
➡ givedonate [id] [сумма] - Выдать доната (6 LVL)\n

➡ модератор [id] - выдать модератора (Группа) (6 LVL)\n 
➡ редактор [id] - выдать редактора (Группа) (6 LVL)\n
➡ администратор [id] - Выдать ГЛ.Админа (Группа) (6 LVL)\n

➡ лимит [id] - снять лимит на хранилище (4 LVL)\n

💭 репорты - список репортов, у которых нет ответа (1 LVL)\n

➡ beta_yes [id] - подтвердить бета тест
➡ beta_no [id] - отклонить бета тест

➡ developer [id] - выдать Разработчика (6 LVL)`);
	
});

cmd.hear(/^(?:развод)\s([0-9]+)$/i, async (message, bot) => {
let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`Ошибка, неверный ID`);
	
	user.group2 = `Не встречается`;
	message.user.group2 = `Не встречается`;
	if(!user.group3) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
	❤ ${message.user.tag} порвал(-а) с вами отношения...` });
	return bot(`❤ Вы порвали отношения...`)
});

cmd.hear(/^(?:встречаться)\s([0-9]+)$/i, async (message, bot) => {
let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`Ошибка, неверный ID`);
	let name_svadba2 = user.tag;
	
	message.user.group2 = name_svadba2;
	if(!user.group3) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
	❤ ${message.user.tag} хочет встречаться с вами.
	💌 Если, вы согласны, введите "Согласен/Согласна ${message.user.uid}"` });
	return bot(`❤ Поздравляю, запрос отправлен.`)
});
	
cmd.hear(/^(?:согласен|согласна)\s([0-9]+)$/i, async (message, bot) => {
let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`Ошибка, неверный ID`);
	let name_svadba2 = user.tag;
	
	message.user.group2 = name_svadba2;
	if(!user.group3) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
	❤ ${message.user.tag} принял(-а) вашу руку, и сердце.` });
	return bot(`❤ Поздравляю, вы успешно начали встречаться.\n💌 Поздравим ${message.user.tag} и ${user.tag}!`)
});	
	
cmd.hear(/^(?:get|гет)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 1) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`);
	if(message.user.level < 5){
		if(user.groups1) return bot(`Ошибка, данный администратор скрыл свою подробную информацию.\nПросматривать могут только Старшые Администраторы 5-го уровня`);
	}
	let text = ``;
	var check_time = new Date();
	let lose_check = utils.random(1, 6);
	text += `🧳---Admin Info---🧳\n`;
	if(user.level > 1) text += `\n✅ ${user.tag} администратор ${user.level} уровня\n`;
	if(user.verify) text += `\n✅ Аккаунт подтвержден\n\n`;

	text += `🎗---Основаня информация---🎗\n`;
	text += `🔎 ID ${user.uid}\n`;
	text += `🔎 VK @id${user.id}\n`;
	text += `💥 Points:  ${utils.sp(user.points)}\n`;
	text += `✅ Подарок: ${user.group6.toString().replace(/false/gi, "Не получен").replace(/true/gi, "Получен")}\n`;
	text += `💰 У ${user.tag} на руках: ${utils.sp(user.balance)}$\n`;
	text += `⚠ Лимит в хранилище ${utils.sp(user.banks.limit)}$\n`;
	 
	text += `💸 У ${user.tag}, ${utils.sp(user.donate)} донат очков\n`;
	if(user.bank) text += `💳 В хранилище ${user.tag}: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 У ${user.tag} на ферме : ${utils.sp(user.btc)} BTC\n`; 
	text += `🌟 Игровой уровень: ${user.level} [${user.exp}/24]\n`;
	text += `👫 Пол: ${user.sex}\n`;
	if(user.timers.hasWorked) text += `⛏ Работа не доступна\n`
	if(user.timers.bonus) text += `🎁 Бонус получен\n`
	text += `⛏ Работа под номером: ${user.work}\n`
	text += `👑 ${user.tag} популярен на: ${utils.sp(user.rating)}\n\n`;

	text += `🔑----Блокировки----🔑\n`;
	if(user.account.banname) text += `✅ Выдан бан на смену ника\n`;
	if(user.account.bangame) text += `✅ Выдан бан на игры\n`;
	if(user.account.banrep) text += `✅ Выдан бан на репорт\n`;
	if(user.account.banpay) text += `✅ Выдан бан на передачу денег\n`;
	if(user.admin.bancmd) text += `✅ Выдан бан на админ-команды\n`;
	if(user.admin.banotvet) text += `✅ Выдан бан на ответы в репорт\n`;
	if(user.account.ban) text += `✅ Выдан бан аккаунта\n\n`;
	
	text += `❤----Браки----❤\n`;
	text += `💌 Встречается с: ${user.group2}\n\n`;

	text += `\n📚---Подробная информация---📚\n`;
	if(user.report_flood) text += `🆘 Есть 1 не отвеченный репорт.\n`;
	if(user.mention) text += `🔔 Уведомления включены.\n`;
	text += `☠ Последнее СМС боту:  ${user.last_sms}\n`;
	text += `💭 Всего введено сообщений:  ${utils.sp(user.message_sms)}\n`;
	text += `\n🏡 Живет в городе/деревне: ${user.group1}`;
	text += `\n📗 Дата регистрации аккаунта: ${user.regDate}\n\n`;

	text += `💎----Квесты----💎\n`;
	text += `➡ Казино: ${user.quest.kazino}/500\n`;
	text += `➡ Бонус: ${user.quest.bonus}/15\n`;
	text += `➡ Пасхалка: ${user.quest.pashalka.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Поздравления: ${user.quest.pozdravit.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Обращение: ${user.quest.santa.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n\n`;
	
	text += `💾----Дата----💾\n`;
	text += `📗 Дата проверки аккаунта: ${check_time}\n`;
	text += `✅ Предыдущая проверка была: ${lose_check} день(-ей)\n\n`;
	
	text += `😷----Коронавирус----😷\n`;
	if(user.group5) text += `😷 Заразил: 1-го человека\n`;
	if(user.groups3) text += `😷 Болезнь прогресcировала на: ${user.chats12}%/100%\n`;
	if(user.groups3) text += `🤢 Болеет коронавирусом\n\n`;
	
	text += `🚀----Карта сбербанка----🚀\n`;
	text += `📗 Номер карты: ${user.sberbank.number}\n`;
	text += `🔑 CVV: ${user.sberbank.cvv}\n`;
	text += `📗 Владелец: ${user.sberbank.user_name}\n`;
	text += `💸 Баланс карты: ${user.sberbank.balance}$\n\n`;
	
	text += `💾----Капча----💾\n`;
	text += `📗 Введено СМС: ${user.captcha_sms}/${user.limit_sms}\n`;
	text += `🔑 Капча-Код: ${user.captcha_token}\n`;
	text += `🗣 Всего пройдено капч: ${utils.sp(user.number_captcha)}\n`;
	text += `⚙ ${user.check.toString().replace(/false/gi, "Не нужно вводить капчу").replace(/true/gi, "Нужно ввести капчу")}\n`;
	text += `💸 ${user.flood_change_name.toString().replace(/false/gi, "Может поменять ник").replace(/true/gi, "Не может поменять ник")}\n\n`;

	text += `⚙-----Остальное-----⚙\n`;
	text += `😨 Лимит передачи: ${utils.sp(user.limit_pay)}$\n`;
	if(user.bronze) text += `🏆 Имееться статус Bronze\n`;
	if(user.silver) text += `🏆 Имееться статус Silver\n`;
	if(user.gold) text += `🏆 Имееться статус Gold\n`;
	text += `${user.support.toString().replace(/1/gi, "⚠ Может отвечать в репорты").replace(/0/gi, "⚠ Не может отвечать в репорты")}\n`;
	text += `🚀 Последнее СМС в репорт: ${user.groups2}\n\n`;
	if(message.user.level > 5){
		text += `💌-----Приватность-----💌\n`;
		text += `${user.groups1.toString().replace(/false/gi, "👀 Просмотр информации возможен").replace(/true/gi, "😉 Просмотр профиля не возможен")}\n\n`;
	}
	
	return bot(`${text}`);
	
	}
});

cmd.hear(/^(?:accept)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.verify = true; 


	return bot(`Вы выдали игроку ${user.tag} подтвержденный аккаунт!`); 	
} 
});

cmd.hear(/^(?:unbanotvet)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.admin.banotvet = false; 
	

	return bot(`Вы сняли игроку ${user.tag} бан на ответы в репорт`); 	
} 
});

cmd.hear(/^(?:banotvet)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.admin.banotvet = true; 
	user.groups4 = true;

	return bot(`Вы выдали игроку ${user.tag} бан на ответы в репорт`); 	
} 
});



cmd.hear(/^(?:unaccept)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 4) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 


	user.verify = false; 


	return bot(`Вы забрали у игрока ${user.tag} подтвержденный аккаунт!`); 	
} 
});

cmd.hear(/^(?:banall)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	user.groups4 = true;
	user.account.banname = true; 
	user.account.bangame = true;
	user.account.banrep = true;
	user.account.banpay = true;
	user.account.bancmd = true;
	user.account.banotvet = true;


	return bot(`Вы выдали игроку ${user.tag} бан на все.`); 	
} 
});



cmd.hear(/^(?:убрать с чс)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 3) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	
	user.groups4 = false;


	return bot(`Вы убрали игрока ${user.tag} с листа.`); 	
} 
});

cmd.hear(/^(?:unbanall)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	
	user.account.banname = false; 
	user.account.bangame = false;
	user.account.banrep = false;
	user.account.banpay = false;
	user.account.bancmd = false;
	user.account.banotvet = false;
	user.account.ban = false;


	return bot(`Вы сняли игроку ${user.tag} бан на все.`); 	
} 
});

cmd.hear(/^(?:подарок|падарок|падарак)$/i, async (message, bot) => {

	if(message.user.group6) return bot(`Вы уже получали подарок, приходите через 24 часа.`);

	setTimeout(() => {
		message.user.group6 = false;
	}, 86400000);
	let rand = utils.random(45834, 895834);
	message.user.group6 = true;
	message.user.balance += rand;
	return bot(`С подарка, вам выпало ${utils.sp(rand)}$`);
});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	if(message.user.level < 1) return
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let balnce_user = message.user.balance * users.length / 2;
	let rating_user = message.user.rating * users.length / 2;
	let biz_user = message.user.biz * users.length / 2;
	let points_user = message.user.points * users.length / 2;
	let coins_user = message.user.coins * users.length / 2;
	let btc_user = message.user.btc * users.length / 2;
	return bot(`Общая информация бота:
	Пользователей: ${users.length - 1}
	Баланс пользователей: ~${utils.rn(balnce_user)}
	Рейтинг пользователей: ~${utils.rn(rating_user)}
	Б.Бизнеса пользователей: ~${utils.rn(biz_user)}
	Points всего: ~${utils.rn(points_user)}
	Coin пользователей: ~${utils.rn(coins_user)}
	Всего BTC: ~${utils.rn(btc_user)}`); 

});


cmd.hear(/^(?:bronze)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	
	user.bronze = true;


	return bot(`Вы выдали игроку статус ${user.tag} Bronze`); 	
} 
});

cmd.hear(/^(?:silver)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	
	user.silver = true;
	user.limit_pay = 50000000;


	return bot(`Вы выдали игроку статус ${user.tag} Silver`); 	
} 
});

cmd.hear(/^(?:получить)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.gold) return (`Вы не купили статус Gold. Подробнее "Донат"`);
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(message.args[1] > 1000000000) return bot(`Нельзя выдать себе больше 1.000.000.000$ за 1 раз.`);
	message.user.balance += Number(message.args[1])
	return bot(`Вы получили на свой баланс: ${utils.sp(message.args[1])}$`); 	
});

cmd.hear(/^(?:gold)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin.bancmd) return bot(`У вас стоит запрет на команды администратора`);
	if(message.user.level < 5) return;

	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`); 

	
	user.gold = true;
	user.limit_pay = 100000000;
	user.points += 190000;


	return bot(`Вы выдали игроку статус ${user.tag} Gold`); 	
} 
});

cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;

	return bot(`Донат меню:
	✅ Bronze - 25 рублей (Комады: get_bronze [id], бот_bronze)
	✅ Silver - 50 рублей (Комады: get_silver [id], бот_silver, получить деньги, + лимит будет 50.000.000$)
	✅ Gold - 140 рублей (Комады: get_gold [id], бот_gold, получить [сумма], + лимит будет +100.000.000$, +190.000 Points)

	✅ 1 уровень Администратор - 25 рублей.
	✅ 2 уровень Администратор - 100 рублей.
	✅ 3 уровень Администратор - 180 рублей.
	✅ 4 уровень Администратор - 240 рублей.
	✅ 5 уровень Администратор - 320 рублей.
	✅ Саппорт - 20 рублей.
	
	💭 Если вы хотите купить права Администратора, пишите ему [police_rg|Admin]`);

});
cmd.hear(/^(?:бот_gold)$/i, async (message, bot) => {
	if(!message.user.gold) return bot(`Вы не купили статус Gold. Подробнее "Донат"`)
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let balnce_user = message.user.balance * users.length / 2;
	let rating_user = message.user.rating * users.length / 2;
	let biz_user = message.user.biz * users.length / 2;
	let points_user = message.user.points * users.length / 2;
	let coins_user = message.user.coins * users.length / 2;
	let btc_user = message.user.btc * users.length / 2;
	return bot(`Общая информация бота:
	Пользователей: ${users.length - 1}
	Баланс пользователей: ~${utils.rn(balnce_user)}
	Рейтинг пользователей: ~${utils.rn(rating_user)}
	Б.Бизнеса пользователей: ~${utils.rn(biz_user)}
	Points всего: ~${utils.rn(points_user)}
	Coin пользователей: ~${utils.rn(coins_user)}
	Всего BTC: ~${utils.rn(btc_user)}`); 

});
cmd.hear(/^(?:бот_bronze)$/i, async (message, bot) => {
	if(!message.user.silver) return bot(`Вы не купили статус Silver. Подробнее "Донат"`)
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let balnce_user = message.user.balance * users.length / 2;
	let rating_user = message.user.rating * users.length / 2;
	let biz_user = message.user.biz * users.length / 2;
	let points_user = message.user.points * users.length / 2;
	let coins_user = message.user.coins * users.length / 2;
	let btc_user = message.user.btc * users.length / 2;
	return bot(`Общая информация бота:
	Пользователей: ${users.length - 1}
	Баланс пользователей: ~${utils.rn(balnce_user)}
	Рейтинг пользователей: ~${utils.rn(rating_user)}
	Б.Бизнеса пользователей: ~${utils.rn(biz_user)}
	Points всего: ~${utils.rn(points_user)}
	Coin пользователей: ~${utils.rn(coins_user)}
	Всего BTC: ~${utils.rn(btc_user)}`); 

});
cmd.hear(/^(?:бот_silver)$/i, async (message, bot) => {
	if(!message.user.bronze) return bot(`Вы не купили статус Bronze. Подробнее "Донат"`)
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	let balnce_user = message.user.balance * users.length / 2;
	let rating_user = message.user.rating * users.length / 2;
	let biz_user = message.user.biz * users.length / 2;
	let points_user = message.user.points * users.length / 2;
	let coins_user = message.user.coins * users.length / 2;
	let btc_user = message.user.btc * users.length / 2;
	return bot(`Общая информация бота:
	Пользователей: ${users.length - 1}
	Баланс пользователей: ~${utils.rn(balnce_user)}
	Рейтинг пользователей: ~${utils.rn(rating_user)}
	Б.Бизнеса пользователей: ~${utils.rn(biz_user)}
	Points всего: ~${utils.rn(points_user)}
	Coin пользователей: ~${utils.rn(coins_user)}
	Всего BTC: ~${utils.rn(btc_user)}`); 

});
cmd.hear(/^(?:get_bronze|гет_bronze)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(!message.user.bronze) return bot(`Вы не купили статус Bronze. Подробнее "Донат"`)
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`);
	if(message.user.level < 5){
		if(user.groups1) return bot(`Ошибка, данный администратор скрыл свою подробную информацию.\nПросматривать могут только Старшые Администраторы 5-го уровня`);
	}
	let text = ``;
	var check_time = new Date();
	let lose_check = utils.random(1, 6);
	text += `🧳---Admin Info---🧳\n`;
	if(user.level > 1) text += `\n✅ ${user.tag} администратор ${user.level} уровня\n`;
	if(user.verify) text += `\n✅ Аккаунт подтвержден\n\n`;

	text += `🎗---Основаня информация---🎗\n`;
	text += `🔎 ID ${user.uid}\n`;
	text += `🔎 VK @id${user.id}\n`;
	text += `💥 Points:  ${utils.sp(user.points)}\n`;
	text += `✅ Подарок: ${user.group6.toString().replace(/false/gi, "Не получен").replace(/true/gi, "Получен")}\n`;
	text += `💰 У ${user.tag} на руках: ${utils.sp(user.balance)}$\n`;
	text += `⚠ Лимит в хранилище ${utils.sp(user.banks.limit)}$\n`;
	 
	text += `💸 У ${user.tag}, ${utils.sp(user.donate)} донат очков\n`;
	if(user.bank) text += `💳 В хранилище ${user.tag}: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 У ${user.tag} на ферме : ${utils.sp(user.btc)} BTC\n`; 
	text += `🌟 Игровой уровень: ${user.level} [${user.exp}/24]\n`;
	text += `👫 Пол: ${user.sex}\n`;
	if(user.timers.hasWorked) text += `⛏ Работа не доступна\n`
	if(user.timers.bonus) text += `🎁 Бонус получен\n`
	text += `⛏ Работа под номером: ${user.work}\n`
	text += `👑 ${user.tag} популярен на: ${utils.sp(user.rating)}\n\n`;

	text += `🔑----Блокировки----🔑\n`;
	if(user.account.banname) text += `✅ Выдан бан на смену ника\n`;
	if(user.account.bangame) text += `✅ Выдан бан на игры\n`;
	if(user.account.banrep) text += `✅ Выдан бан на репорт\n`;
	if(user.account.banpay) text += `✅ Выдан бан на передачу денег\n`;
	if(user.admin.bancmd) text += `✅ Выдан бан на админ-команды\n`;
	if(user.admin.banotvet) text += `✅ Выдан бан на ответы в репорт\n`;
	if(user.account.ban) text += `✅ Выдан бан аккаунта\n\n`;
	
	text += `❤----Браки----❤\n`;
	text += `💌 Встречается с: ${user.group2}\n\n`;

	text += `\n📚---Подробная информация---📚\n`;
	if(user.report_flood) text += `🆘 Есть 1 не отвеченный репорт.\n`;
	if(user.mention) text += `🔔 Уведомления включены.\n`;
	text += `☠ Последнее СМС боту:  ${user.last_sms}\n`;
	text += `💭 Всего введено сообщений:  ${utils.sp(user.message_sms)}\n`;
	text += `\n🏡 Живет в городе/деревне: ${user.group1}`;
	text += `\n📗 Дата регистрации аккаунта: ${user.regDate}\n\n`;

	text += `💎----Квесты----💎\n`;
	text += `➡ Казино: ${user.quest.kazino}/500\n`;
	text += `➡ Бонус: ${user.quest.bonus}/15\n`;
	text += `➡ Пасхалка: ${user.quest.pashalka.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Поздравления: ${user.quest.pozdravit.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Обращение: ${user.quest.santa.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n\n`;
	
	text += `💾----Дата----💾\n`;
	text += `📗 Дата проверки аккаунта: ${check_time}\n`;
	text += `✅ Предыдущая проверка была: ${lose_check} день(-ей)\n\n`;
	
	text += `😷----Коронавирус----😷\n`;
	if(user.group5) text += `😷 Заразил: 1-го человека\n`;
	if(user.groups3) text += `😷 Болезнь прогресcировала на: ${user.chats12}%/100%\n`;
	if(user.groups3) text += `🤢 Болеет коронавирусом\n\n`;
	
	text += `🚀----Карта сбербанка----🚀\n`;
	text += `📗 Номер карты: ${user.sberbank.number}\n`;
	text += `🔑 CVV: ${user.sberbank.cvv}\n`;
	text += `📗 Владелец: ${user.sberbank.user_name}\n`;
	text += `💸 Баланс карты: ${user.sberbank.balance}$\n\n`;
	
	text += `💾----Капча----💾\n`;
	text += `📗 Введено СМС: ${user.captcha_sms}/${user.limit_sms}\n`;
	text += `🔑 Капча-Код: ${user.captcha_token}\n`;
	text += `🗣 Всего пройдено капч: ${utils.sp(user.number_captcha)}\n`;
	text += `⚙ ${user.check.toString().replace(/false/gi, "Не нужно вводить капчу").replace(/true/gi, "Нужно ввести капчу")}\n`;
	text += `💸 ${user.flood_change_name.toString().replace(/false/gi, "Может поменять ник").replace(/true/gi, "Не может поменять ник")}\n\n`;

	text += `⚙-----Остальное-----⚙\n`;
	text += `😨 Лимит передачи: ${utils.sp(user.limit_pay)}$\n`;
	text += `${user.support.toString().replace(/1/gi, "⚠ Может отвечать в репорты").replace(/0/gi, "⚠ Не может отвечать в репорты")}\n`;
	text += `🚀 Последнее СМС в репорт: ${user.groups2}\n\n`;
	if(message.user.level > 5){
		text += `💌-----Приватность-----💌\n`;
		text += `${user.groups1.toString().replace(/false/gi, "👀 Просмотр информации возможен").replace(/true/gi, "😉 Просмотр профиля не возможен")}\n\n`;
	}
	
	return bot(`${text}`);
	
	}
});
cmd.hear(/^(?:get_silver|гет_silver)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(!message.user.silver) return bot(`Вы не купили статус Silver. Подробнее "Донат"`)
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`);
	if(message.user.level < 5){
		if(user.groups1) return bot(`Ошибка, данный администратор скрыл свою подробную информацию.\nПросматривать могут только Старшые Администраторы 5-го уровня`);
	}
	let text = ``;
	var check_time = new Date();
	let lose_check = utils.random(1, 6);
	text += `🧳---Admin Info---🧳\n`;
	if(user.level > 1) text += `\n✅ ${user.tag} администратор ${user.level} уровня\n`;
	if(user.verify) text += `\n✅ Аккаунт подтвержден\n\n`;

	text += `🎗---Основаня информация---🎗\n`;
	text += `🔎 ID ${user.uid}\n`;
	text += `🔎 VK @id${user.id}\n`;
	text += `💥 Points:  ${utils.sp(user.points)}\n`;
	text += `✅ Подарок: ${user.group6.toString().replace(/false/gi, "Не получен").replace(/true/gi, "Получен")}\n`;
	text += `💰 У ${user.tag} на руках: ${utils.sp(user.balance)}$\n`;
	text += `⚠ Лимит в хранилище ${utils.sp(user.banks.limit)}$\n`;
	 
	text += `💸 У ${user.tag}, ${utils.sp(user.donate)} донат очков\n`;
	if(user.bank) text += `💳 В хранилище ${user.tag}: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 У ${user.tag} на ферме : ${utils.sp(user.btc)} BTC\n`; 
	text += `🌟 Игровой уровень: ${user.level} [${user.exp}/24]\n`;
	text += `👫 Пол: ${user.sex}\n`;
	if(user.timers.hasWorked) text += `⛏ Работа не доступна\n`
	if(user.timers.bonus) text += `🎁 Бонус получен\n`
	text += `⛏ Работа под номером: ${user.work}\n`
	text += `👑 ${user.tag} популярен на: ${utils.sp(user.rating)}\n\n`;

	text += `🔑----Блокировки----🔑\n`;
	if(user.account.banname) text += `✅ Выдан бан на смену ника\n`;
	if(user.account.bangame) text += `✅ Выдан бан на игры\n`;
	if(user.account.banrep) text += `✅ Выдан бан на репорт\n`;
	if(user.account.banpay) text += `✅ Выдан бан на передачу денег\n`;
	if(user.admin.bancmd) text += `✅ Выдан бан на админ-команды\n`;
	if(user.admin.banotvet) text += `✅ Выдан бан на ответы в репорт\n`;
	if(user.account.ban) text += `✅ Выдан бан аккаунта\n\n`;
	
	text += `❤----Браки----❤\n`;
	text += `💌 Встречается с: ${user.group2}\n\n`;

	text += `\n📚---Подробная информация---📚\n`;
	if(user.report_flood) text += `🆘 Есть 1 не отвеченный репорт.\n`;
	if(user.mention) text += `🔔 Уведомления включены.\n`;
	text += `☠ Последнее СМС боту:  ${user.last_sms}\n`;
	text += `💭 Всего введено сообщений:  ${utils.sp(user.message_sms)}\n`;
	text += `\n🏡 Живет в городе/деревне: ${user.group1}`;
	text += `\n📗 Дата регистрации аккаунта: ${user.regDate}\n\n`;

	text += `💎----Квесты----💎\n`;
	text += `➡ Казино: ${user.quest.kazino}/500\n`;
	text += `➡ Бонус: ${user.quest.bonus}/15\n`;
	text += `➡ Пасхалка: ${user.quest.pashalka.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Поздравления: ${user.quest.pozdravit.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Обращение: ${user.quest.santa.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n\n`;
	
	text += `💾----Дата----💾\n`;
	text += `📗 Дата проверки аккаунта: ${check_time}\n`;
	text += `✅ Предыдущая проверка была: ${lose_check} день(-ей)\n\n`;
	
	text += `😷----Коронавирус----😷\n`;
	if(user.group5) text += `😷 Заразил: 1-го человека\n`;
	if(user.groups3) text += `😷 Болезнь прогресcировала на: ${user.chats12}%/100%\n`;
	if(user.groups3) text += `🤢 Болеет коронавирусом\n\n`;
	
	text += `🚀----Карта сбербанка----🚀\n`;
	text += `📗 Номер карты: ${user.sberbank.number}\n`;
	text += `🔑 CVV: ${user.sberbank.cvv}\n`;
	text += `📗 Владелец: ${user.sberbank.user_name}\n`;
	text += `💸 Баланс карты: ${user.sberbank.balance}$\n\n`;
	
	text += `💾----Капча----💾\n`;
	text += `📗 Введено СМС: ${user.captcha_sms}/${user.limit_sms}\n`;
	text += `🔑 Капча-Код: ${user.captcha_token}\n`;
	text += `🗣 Всего пройдено капч: ${utils.sp(user.number_captcha)}\n`;
	text += `⚙ ${user.check.toString().replace(/false/gi, "Не нужно вводить капчу").replace(/true/gi, "Нужно ввести капчу")}\n`;
	text += `💸 ${user.flood_change_name.toString().replace(/false/gi, "Может поменять ник").replace(/true/gi, "Не может поменять ник")}\n\n`;

	text += `⚙-----Остальное-----⚙\n`;
	text += `😨 Лимит передачи: ${utils.sp(user.limit_pay)}$\n`;
	text += `${user.support.toString().replace(/1/gi, "⚠ Может отвечать в репорты").replace(/0/gi, "⚠ Не может отвечать в репорты")}\n`;
	text += `🚀 Последнее СМС в репорт: ${user.groups2}\n\n`;
	if(message.user.level > 5){
		text += `💌-----Приватность-----💌\n`;
		text += `${user.groups1.toString().replace(/false/gi, "👀 Просмотр информации возможен").replace(/true/gi, "😉 Просмотр профиля не возможен")}\n\n`;
	}
	
	return bot(`${text}`);
	
	}
});

cmd.hear(/^(?:get_gold|гет_gold)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.check) return bot(`Ошибка, введите капчу\nВведите "Капча ${message.user.captcha_token}"`);
	message.user.captcha_sms +=1;
	if(!message.user.gold) return bot(`Вы не купили статус Gold. Подробнее "Донат"`);
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`неверный ID игрока`);
	if(message.user.level < 5){
		if(user.groups1) return bot(`Ошибка, данный администратор скрыл свою подробную информацию.\nПросматривать могут только Старшые Администраторы 5-го уровня`);
	}
	let text = ``;
	var check_time = new Date();
	let lose_check = utils.random(1, 6);
	text += `🧳---Admin Info---🧳\n`;
	if(user.level > 1) text += `\n✅ ${user.tag} администратор ${user.level} уровня\n`;
	if(user.verify) text += `\n✅ Аккаунт подтвержден\n\n`;

	text += `🎗---Основаня информация---🎗\n`;
	text += `🔎 ID ${user.uid}\n`;
	text += `🔎 VK @id${user.id}\n`;
	text += `💥 Points:  ${utils.sp(user.points)}\n`;
	text += `✅ Подарок: ${user.group6.toString().replace(/false/gi, "Не получен").replace(/true/gi, "Получен")}\n`;
	text += `💰 У ${user.tag} на руках: ${utils.sp(user.balance)}$\n`;
	text += `⚠ Лимит в хранилище ${utils.sp(user.banks.limit)}$\n`;
	 
	text += `💸 У ${user.tag}, ${utils.sp(user.donate)} донат очков\n`;
	if(user.bank) text += `💳 В хранилище ${user.tag}: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 У ${user.tag} на ферме : ${utils.sp(user.btc)} BTC\n`; 
	text += `🌟 Игровой уровень: ${user.level} [${user.exp}/24]\n`;
	text += `👫 Пол: ${user.sex}\n`;
	if(user.timers.hasWorked) text += `⛏ Работа не доступна\n`
	if(user.timers.bonus) text += `🎁 Бонус получен\n`
	text += `⛏ Работа под номером: ${user.work}\n`
	text += `👑 ${user.tag} популярен на: ${utils.sp(user.rating)}\n\n`;

	text += `🔑----Блокировки----🔑\n`;
	if(user.account.banname) text += `✅ Выдан бан на смену ника\n`;
	if(user.account.bangame) text += `✅ Выдан бан на игры\n`;
	if(user.account.banrep) text += `✅ Выдан бан на репорт\n`;
	if(user.account.banpay) text += `✅ Выдан бан на передачу денег\n`;
	if(user.admin.bancmd) text += `✅ Выдан бан на админ-команды\n`;
	if(user.admin.banotvet) text += `✅ Выдан бан на ответы в репорт\n`;
	if(user.account.ban) text += `✅ Выдан бан аккаунта\n\n`;
	
	text += `❤----Браки----❤\n`;
	text += `💌 Встречается с: ${user.group2}\n\n`;

	text += `\n📚---Подробная информация---📚\n`;
	if(user.report_flood) text += `🆘 Есть 1 не отвеченный репорт.\n`;
	if(user.mention) text += `🔔 Уведомления включены.\n`;
	text += `☠ Последнее СМС боту:  ${user.last_sms}\n`;
	text += `💭 Всего введено сообщений:  ${utils.sp(user.message_sms)}\n`;
	text += `\n🏡 Живет в городе/деревне: ${user.group1}`;
	text += `\n📗 Дата регистрации аккаунта: ${user.regDate}\n\n`;

	text += `💎----Квесты----💎\n`;
	text += `➡ Казино: ${user.quest.kazino}/500\n`;
	text += `➡ Бонус: ${user.quest.bonus}/15\n`;
	text += `➡ Пасхалка: ${user.quest.pashalka.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Поздравления: ${user.quest.pozdravit.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n`;
	text += `➡ Обращение: ${user.quest.santa.toString().replace(/false/gi, "Не выполнено").replace(/true/gi, "Выполнено")}\n\n`;
	
	text += `💾----Дата----💾\n`;
	text += `📗 Дата проверки аккаунта: ${check_time}\n`;
	text += `✅ Предыдущая проверка была: ${lose_check} день(-ей)\n\n`;
	
	text += `😷----Коронавирус----😷\n`;
	if(user.group5) text += `😷 Заразил: 1-го человека\n`;
	if(user.groups3) text += `😷 Болезнь прогресcировала на: ${user.chats12}%/100%\n`;
	if(user.groups3) text += `🤢 Болеет коронавирусом\n\n`;
	
	text += `🚀----Карта сбербанка----🚀\n`;
	text += `📗 Номер карты: ${user.sberbank.number}\n`;
	text += `🔑 CVV: ${user.sberbank.cvv}\n`;
	text += `📗 Владелец: ${user.sberbank.user_name}\n`;
	text += `💸 Баланс карты: ${user.sberbank.balance}$\n\n`;
	
	text += `💾----Капча----💾\n`;
	text += `📗 Введено СМС: ${user.captcha_sms}/${user.limit_sms}\n`;
	text += `🔑 Капча-Код: ${user.captcha_token}\n`;
	text += `🗣 Всего пройдено капч: ${utils.sp(user.number_captcha)}\n`;
	text += `⚙ ${user.check.toString().replace(/false/gi, "Не нужно вводить капчу").replace(/true/gi, "Нужно ввести капчу")}\n`;
	text += `💸 ${user.flood_change_name.toString().replace(/false/gi, "Может поменять ник").replace(/true/gi, "Не может поменять ник")}\n\n`;

	text += `⚙-----Остальное-----⚙\n`;
	text += `😨 Лимит передачи: ${utils.sp(user.limit_pay)}$\n`;
	text += `${user.support.toString().replace(/1/gi, "⚠ Может отвечать в репорты").replace(/0/gi, "⚠ Не может отвечать в репорты")}\n`;
	text += `🚀 Последнее СМС в репорт: ${user.groups2}\n\n`;
	if(message.user.level > 5){
		text += `💌-----Приватность-----💌\n`;
		text += `${user.groups1.toString().replace(/false/gi, "👀 Просмотр информации возможен").replace(/true/gi, "😉 Просмотр профиля не возможен")}\n\n`;
	}
	
	return bot(`${text}`);
	
	}
});

















































