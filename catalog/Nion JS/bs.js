console.log('[Nion Bot] >> LOADING BOT,PLACE WAIT!');
const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();
const promo = require('./base/promo.json');
const kazna = require('./base/kazna.json');
const promos = ''

let giving = false;

let chats = require('./chats.json');
let chatslist = require('./chatslist.json'),
settings = require('./settings.json');

const farms = [
	{
		name: 'Огород',
		cost: 500000,
		id: 1
	},
	{
		name: 'Ферма',
		cost: 1000000,
		id: 2
	},
	{
		name: 'Дача',
		cost: 1500000,
		id: 3
	}
];

const pitoms = [
	{
		name: 'Курица',
		cost: 5000,
		id: 1
	},
	{
		name: 'Кот',
		cost: 10000,
		id: 2
	},
	{
		name: 'Собака',
		cost: 12000,
		id: 3
	},
	{
		name: 'Корова',
		cost: 20000,
		id: 4
	},
	{
		name: 'Тигр',
		cost: 30000,
		id: 5
	},
	{
		name: 'Дракон',
		cost: 100000,
		id: 6
	},
];

const quest1s = [
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 1
	},
	{
		name: 'Выполнено✔',
		cost: 0,
		id: 2
	}
];

const quest2s = [
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 1
	},
	{
		name: 'Выполнено✔',
		cost: 0,
		id: 2
	}
];

const businesses = [
	{
		name: '.Сервер майнкрафт ',
		cost: 50000,
		earn: 5000,
		id: 1,
		roza: 0,
		icon: '🥖'
	},
	{
		name: 'Сервер самп',
		cost: 100000,
		earn: 10000,
		id: 2,
		roza: 0,
		icon: '🏪'
	},
	{
		name: 'Ларёк',
		cost: 175000,
		earn: 2500,
		id: 3,
		roza: 0,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 200000,
		earn: 30000,
		id: 4,
		roza: 0,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 300000,
		earn: 50000,
		id: 5,
		roza: 0,
		icon: '🏭'
	},
	{
		name: 'Nion Company',
		cost: 0,
		earn: 400000,
		id: 6,
		icon: '💰'
	}
];

const houses = [
		{
		name: 'Коробка из-под обуви',
		cost: 5000,
		level: 0,
		id: 1
	},
	{
		name: 'Гараж',
		cost: 10000,
		level: 0,
		id: 2
	},
	{
		name: 'Сарай',
		cost: 15000,
		level: 0,
		id: 3
	},
	{
		name: 'Вагон',
		cost: 30000,
		level: 0,
		id: 4
	},
	{
		name: 'Съёмная комната в общаге',
		cost: 50000,
		level: 0,
		id: 5
	},
	{
		name: 'Дом в деревне',
		cost: 75000,
		level: 0,
		id: 6
	},
	{
		name: 'Кирпичный дом',
		cost: 85000,
		level: 0,
		id: 7
	},
	{
		name: 'Коттедж',
		cost: 120000,
		level: 0,
		id: 8
	},
	{
		name: 'Небоскрёб',
		cost: 200000,
		level: 0,
		id: 9
	},
	{
		name: 'Особняк на Гаваях',
		cost: 1000000,
		level: 10,
		id: 10
	},
	{
		name: 'Дом на марсе',
		cost: 10000000,
		level: 10,
		id: 11
	}
];

const cars = [
		{
		name: 'Вишневая семерка',
		cost: 5000,
		level: 0,
		id: 1
	},
	{
		name: 'ВАЗ 2019',
		cost: 25000,
		level: 0,
		id: 2
	},
	{
		name: 'Багги',
		cost: 50000,
		level: 0,
		id: 3
	},
	{
		name: 'BMW X5',
		cost: 75000,
		level: 0,
		id: 4
	},
	{
		name: 'Audi A6',
		cost: 250000,
		level: 0,
		id: 5
	},
	{
		name: 'Lada 2019',
		cost: 300000,
		level: 0,
		id: 6
	},
	{
		name: 'Grand Cherokee',
		cost: 400000,
		level: 0,
		id: 7
	},
	{
		name: 'Lamborghini URUS',
		cost: 600000,
		level: 0,
		id: 8
	},
	{
		name: 'Rolls Royce',
		cost: 850000,
		level: 0,
		id: 9
	},
	{
		name: 'ЧЕРНАЯ СЕМЕРКА',
		cost: 1000000,
		level: 10,
		id: 10
	}
];
//
user.setOptions({
	token: '67681610c13e9d3e2c340ee1e788ea90b89e71214670e215a1b9227b1e30b613ee28df797a8a6de6e6c69' // token ot страницы ( не обязательно )
});


const requesti = require('request');
const fs = require("fs");
const rq = require("prequest");

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
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'Infinity');

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
let btc = 12000;

let users = require('./users.json');

let buttons = [];

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
}, 12000);

setInterval(async () => {
	await saveUsers();
	console.log('[Nion Bot] >> BASE - SAVED');
}, 50000);

setInterval(async () => {
	users.filter(x=> x.ferma.farm !== 0).map(x=> {
		if(x.ferma.farm === 1)
		{
			x.farm_btc += 50;
		}

		if(x.ferma.farm === 2)
		{
			x.farm_btc += 200;
		}

		if(x.ferma.farm === 3)
		{
			x.farm_btc += 500;
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
		user.timers.bonus = false;
		user.timers.hasWorked = false;
		user.timers.clanwar = false;
		user.timers.dln = false;
		user.timers.pizza = false;
		user.timers.useeda = false;
		user.timers.pit = false;
		user.timers.poxod = false;
		user.timers.shaxta = false;
		user.timers.sunduk = false;
		user.timers.capt = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}


vk.setOptions({ token: 'cdf94e6d71b2746d6a1d35856527c8d1e940c9efcacd919aa93411263f347a26c1879024c37b3e2d773e4', pollingGroupId:179275498});
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club179170041\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club179170041\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		message.send (`[👋🏻]Привет,я игровой бот "Nion".
[👾]Ты успешно прошел регестрацию,что-бы узнать мои команды введи "помощь"
`);
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();
	

		users.push({
			id: message.senderId,
			uid: users.length,
			mats: 0,
			bank: 0,
			//new
			golod: 100,
			petlvl: 1,
			artifact: 0,
			ygol: 0,
			zarplata: 0,
			roza: 0,
			almaz: 0,
			irans: 0,
			rating: 0,
			//new 1.2
			cart: 0,
			farm_btc: 0,
			goldrullet: 0,
			bronserullet: 0,
			serebrorullet: 0,
			brank: 0, //ballas rank
			grank: 0, //groove rank
			bpriglos: 0,
			gpriglos: 0,
			//mew
			balance: 500000,
			alvl: 0,
			//дает завершить квест
			quest11: 0,
			quest22: 0,
			///
			floder: 0,
			avig: 0,
			biz: 0,
			//для квеста 2
			razvez: 0,
			//
			pizza: 0,
			warn: 0,
			//завершение квестов
			vipquest1: 0, //1 quest
			vipquest2: 0, //2 quest
			//
			tityl: 0,
			work: 0,
			//лишнее
			ybralcmd: 0,
			//Не трогать лишнее!)
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			keyboard: true,
			ban: false,
			tester: false,
			lox:false,
			referal: null,
			timers: {
				bonus: false,
				hasWorked: false,
				clanwar: false,
				dln: false,
				pizza: false,
				useeda: false,
				pit: false,
				poxod: false,
				shaxta: false,
				sunduk: false,
				capt: false,
			},
			transport: {
				car: 0
			},
			dom: {
				home: 0
			},
			pet: {
				pitom: 0
			},
			ferma: {
				farm: 0
			},
			questi: {
				quest1: 1, // quest 1
				quest2: 1 // quest 2
			},		
			tag: user_info.first_name,
			notifications: true,
			exp: 1,
			level: 1,
			marriage: {
				partner: 0,
				requesti: []
			}
		});
	}
	
	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.jail) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if (message.text) {
		message.user.floder += 1;
		
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	if(message.user.level == 1)
	{
		message.user.tityl = "Новичок";
	}

	if(message.user.level == 2)
	{
		message.user.tityl = "Дальнобойщик";
	}

	if(message.user.level == 3)
	{
		message.user.tityl = "Раб";
	}

	if(message.user.level == 4)
	{
		message.user.tityl = "Бизнесмен";
	}
	
	if(message.user.level == 5)
	{
		message.user.tityl = "Зам.Одмена";
	}

	if(message.user.level == 6)
	{
		message.user.tityl = "Одмен";
	}
	
		if(message.user.level == 7)
	{
		message.user.tityl = "Одмен";
	}
	
		if(message.user.level == 8)
	{
		message.user.tityl = "Одмен";
	}
	
		if(message.user.level == 9)
	{
		message.user.tityl = "Одмен";
	}
	
	if(message.user.level >= 10)
	{
		message.user.tityl = "BOG";
	}
	
	if(message.user.level >= 500)
	{
		message.user.tityl = "LORD228";
	}
	

if(message.user.razvez >= 49) {

message.user.quest22 = 1;
	
}

	message.args = message.text.match(command[0]);
	
	await command[1](message, bot);
	console.log(`ID: ${message.user.uid} TEXT: "${message.text}"`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}
		
cmd.hear(/^(?:топ)$/i, async (message, bot) => {
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — [👑]${utils.sp(user.rating)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — [👑]${utils.sp(message.user.rating)}`);
});		
		
	
cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {

	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));


	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`[💳]вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});	
	
cmd.hear(/^(?:помощь|старт|начать|start|go|cmd|команды|хелп|help)$/i, async (message, bot) => {
	message.user.floder += 1;

	await message.send(`

[👾]Профиль-Информация о вас 
[💰]Баланс-Информация о деньгах 
[🌟]Ур инфо-информация о вашем уровне 
[💳]Банк[сумма]-положить деньги в банк
[👑]Купить короны[кол-во]-покупка корон
[🥇]Топ-топ игроков

[🍕]Развозчик пиццы-Устроится на работу развозчика пиццы. 
[🍕]Развести-Развести пиццу 
[🚚]Дальнобойщик-Устроится на работу дальнобойщика. 
[🍷]Грузы-список грузов 
[⚙]Материалы [кол-во]-купить материалы
[⚒]Работать-Отработать 

[🛒]Продать [предмет]-Продать вещь 
[🎰]Казино [сумма]-Играть в казино 
[🤝]Передать [ид] [сумма]-Передать деньги игроку 
[⏰]Бонус-Ежедневный бонус 
[🍕]Еда-список еды 
[📗]Квесты-список квестов(BETA) 

[💼]Бизнесы-список бизнесов 
[💼]Бизнес снять [сумма]-снять деньги с бизнеса 
[💼]Бизнес-информция о бизнесе

[🌲]Поход-сходить в поход 
[⚒]Шахта-сходить в шахту 
[🚗]Машины-Список машин 
[🏡]Дома-список домов 

[🦎]Питомцы-список питомцев 
[🦎]Пет инфо-информация о питомце 
[🦎]Пет улучшить-улучшить питомца 
[🦎]Пет поход-отправить питомца в поход 

[💉]Банды-команды банд
[📈]Трейд вверх/вниз [сумма]-игра
[🚣]Фермы-список ферм
[📦]Сундук-сундук с рулетками
[👨‍✈]Мер-команды мера
[👝]Инвентарь-список ваших предметов
[🔆]Пожертвовать [сумма]-пожертвовать деньги в казну
`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Профиль"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Помощь"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Развести"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Работать"
			},
				"color": "positive"
			}]
		]
			})
		});
		}
);	

cmd.hear(/^(?:обменять)\s(.*)$/i, async (message, bot) => {
	if(message.user.roza < message.args[1]) return bot(`[🌹]У вас нет столько роз!`);
	if(!message.user.roza)return bot (`[🌹]У вас нет роз!`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
	
	message.user.balance += Number(message.args[1] * 5000);
	message.user.roza -= message.args[1];
	return bot (`[🌹]Вы успешно обменяли  ${message.args[1]} на  ${message.args[1] * 5000}$`);
});

cmd.hear(/^(?:Бизнес улучшить)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`У вас нет бизнеса!`);
	if(message.user.biz_lvl >= 3) return bot (`Ваш бизнес макс.уровня!`);
	
	if(message.user.biz_lvl == 1) { 
	if(message.user.balance < 300000)return bot (`Для улучшения бизнеса,нужно:300.000$`);
	message.user.balance -= 300000;
	message.user.biz_lvl = 2;
	user.biz.earn +=20000;
	}
	return bot (`Вы успешно улучшили бизнес!`);
});


cmd.hear(/^(?:короны|купить кароны|кароны|купить короны)\s(.*)$/i, async (message, bot) => {

	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
		if(message.user.balance < message.args[1] * 1000000) return bot(`[👑]У вас недостаточно денег!1корона=1.000.000$`);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

		message.user.balance -= Number(message.args[1] * 1000000);
		message.user.rating += Number(message.args[1]);
		
		return bot(`[👑]Вы успешно купили ${utils.sp(message.args[1])} корон[👑]`);
});	

cmd.hear(/^(?:Сундук)$/i, async (message, bot) => {
	if(message.user.timers.sunduk) return bot(`🎁Сундук можно открывать 1 раз в час!`);
	if(message.user.level < 2) return bot(`Сундук доступен с 2го уровня!`);
let prize = utils.pick([1, 2, 3]);
	setTimeout(() => {
		message.user.timers.sunduk = false;
	vk.api.messages.send({ user_id: user.id, message: `1час прошел!Вы сного можете открыть сундук! "сундку"` });
	},  3600000);

	message.user.timers.sunduk  = true;
	
	if(prize === 1)
	{
		message.user.goldrullet += 1;
		return bot(`🥇Вам попалась золотая рулетка!🥇Что бы использовать рулетку введите "голд"`);
	}

	if(prize === 2)
	{
		message.user.bronserullet += 1;
		return bot(`🥉Вам попалась брозновая рулетка!🥉Что бы использовать рулетку введите "бронз"`);
	}
	
	if(prize === 3)
	{
		message.user.serebrorullet += 1;
		return bot(`🥈Вам попалась серебренная рулетка!🥈Что бы использовать рулетку введите "серебро"`);
	}
});

cmd.hear(/^(?:Еда|Меню)$/i, async (message, bot) => {
	message.user.floder += 1;
					if(message.user.keyboard == false) {
	await message.send(`\n[🍕]Список еды:
1.Бургер[10]:500$🍔
2.Суп[20]:1200$🍝
3.Креветки[40]:2500$🥐
4.Пицца[50]:3000$🍕

👉🏻Для того что-бы купить еду,введите: "Еда [номер]"
👉🏻Если ваш персонаж будет голоден,вы не сможете работать!


`);
}
if(message.user.keyboard == true) {
	await message.send(`\n[🍕]Список еды:
1.Бургер[10]:500$🍔
2.Суп[20]:1200$🍝
3.Креветки[40]:2500$🥐
4.Пицца[50]:3000$🍕

👉🏻Для того что-бы купить еду,введите: "Еда [номер]"
👉🏻Если ваш персонаж будет голоден,вы не сможете работать!
`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Еда 1"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Еда 2"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Еда 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Еда 4"
			},
				"color": "positive"
			}]
		]
			})
		});
		}}
);	

cmd.hear(/^(?:kick)\s(.*)$/i, async (message, bot) => {
	if(message.user.alvl < 2)return;
	message.user.floder += 1;
	let chatid = message.chatId;
		let argses = message.text.split("!kick ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id});
		});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	message.user.floder += 1;

	await message.send(`>>[📖] Привет! Я игровой бот - [nionbot|Nion Bot]
	»[🖥]Версия:1.0
	»[💰]Баланс казны: ${kazna.kbalanc}$
	»[🎩]Игроков: ${users.length}
`
);
user.balanc = kazna.kbalanc;
user.balanc = kazna.acc;
});		
cmd.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`[⚠]У вас нет данной суммы!`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`\n>>[📊]Курс ${nav === 1 ? `подорожал` : `подешевел`} на ${utils.random(100)}$
			>>[➕]Вы заработали: ${message.args[2] * multiply}$
			>>[💰]Баланс: ${message.user.balance}Coin's🏵`);
		} else {
			return bot(`\n>>[📊]Курс ${nav === 2 ? `подорожал` : `подешевел`} на ${utils.random(100)}$
			>>[➖]Вы проиграли: ${message.args[2]}$
			>>[💰]Баланс: ${message.user.balance}$`);
		}
	}
});

cmd.hear(/\.(com|ru|me|xyz|pro|ooo|community|steam|pw|org)$/i, async (message, bot) => {
	message.user.floder += 1;
	if(!message.isChat) return;
		let chatid = message.chatId;
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id});
		return message.send(`[id${message.user.id}|${message.user.tag}],Был кикнут за рекламу.`);
	});


cmd.hear(/^(?:https:)/i,  (message) => { 
	message.user.floder += 1;
	if(!message.isChat) return;
		let chatid = message.chatId;
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id});
			return message.send(`[id${message.user.id}|${message.user.tag}],Был кикнут за рекламу.`);
});

cmd.hear(/^(?:vk.com)/i,  (message) => { 
	message.user.floder += 1;
	if(!message.isChat) return;
		let chatid = message.chatId;
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id});
			return message.send(`[id${message.user.id}|${message.user.tag}],Был кикнут за рекламу.`);
});

cmd.hear(/^(?:Сдохни|Чмо|Анал|Мать ебал|Умри|MQ|Гондон|хуйня бот|бот хуйня|нубо бот|херня бот|сдохните|уроды|Мать|лох|блять|бля|рот|хуй)/i,  (message) => {  
	message.user.floder += 1;
	if(!message.isChat) return;
		let chatid = message.chatId;
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id});
			return message.send(`[id${message.user.id}|${message.user.tag}],Был кикнут за неадекватное поведение.`);
});



cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
		if(message.senderId !== 263623627 && message.senderId !== 263623627) return;
	if(giving)return bot (`Раздача уже создана!`);
	giving = true;
	user.api.wall.post({
		owner_id: -179170041,
		message: `
>>[💰]Проводим новую раздачу на: 200.000$
>>[💰]Сделайте репост и получите свои деньги!

>>[🎁]Деньги будут выданы по окончанию акции!
>>[⏰]Акция закончится ровно через 5часов!!`,
		attachments: 'photo-179170041_456239034'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -179275498,
				post_id: response.post_id
			});
			
				user.api.wall.createComment({
				owner_id: -179275498,
				post_id: response.post_id,
				from_group:179275498,
				message: '*Вы должны начать диалог с ботом в личных сообщениях что-бы получить деньги.'
			});
			user.api.wall.createComment({
				owner_id: -179275498,
				post_id: response.post_id,
				from_group:179275498,
				message: '*Ваш профиль ВКонтакте должен быть открытым,что-бы бот увидел репост записи.'
			});
			
				user.api.wall.closeComments({
				owner_id: -179275498,
				post_id: response.post_id
			});
			
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -179170041, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance += 200000; 
					vk.api.messages.send({ user_id: user.id, message: `\nПривет👋🏻
Спасибо за участие в раздаче!🎁
На твой баланс поступило 200.000$💰
Приятной игры,с уваженим Admin's Team👓` });
					vk.api.messages.send({ user_id: 179275498, message: `[😜] >> [blueshark27|Одмэн], я выдал игроку ([id${user.id}|${user.tag}]) - 200.000 на баланс.\nНа данный момент, его баланс составляет:\n${user.balance}$`})
				});
			});
			user.api.wall.openComments({
				owner_id: -179275498,
				post_id: response.post_id
			});
				user.api.wall.createComment({
				owner_id: -179275498,
				post_id: response.post_id,
				from_group:179275498,
				message: 'Раздача окончена,деньги выданы!'
			});
			user.api.wall.closeComments({
				owner_id: -179275498,
				post_id: response.post_id
			});
			giving = false;
		}, 180000);
	});
	await bot(`[👾]Раздача создана`);
});

cmd.hear(/^(?:запись)\s(.*)$/i, async (message, bot) => {
		if(message.senderId !== 263623627 && message.senderId !== 263623627) return;
	message.user.floder += 1;
			if(message.user.alvl < 5) return;
	user.api.wall.post({
		owner_id: -179275498,
		message: `${message.args[1]}`,
		attachments: 'photo-179170041_456239034'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -179275498,
			post_id: response.post_id
		});
	});
	await bot(`[👾]Запись создана`);
});


cmd.hear(/^(?:пост)\s(.*)$/i, async (message, bot) => {
		if(message.senderId !== 263623627 && message.senderId !== 263623627) return;
	message.user.floder += 1;
	user.api.wall.post({
		owner_id: 179275498,
		message: `${message.args[1]}`,
		attachments: 'photo-179170041_456239034'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id:179275498,
			post_id: response.post_id
		});
	});
});

cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.senderId !== 263623627 && message.senderId !== 263623627 && message.senderId !== 263623627 && message.senderId !== 263623627 && message.senderId !== 263623627) return;

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


cmd.hear(/^(?:бонус)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.timers.bonus) return bot(`⏰Бонус можно брать 1раз в 24часа!`);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;

	const balance = utils.random(50000);

	message.user.balance += balance;
	
	return bot (`[🎁]Ваш бонус составил: ${utils.sp(balance)}$!`);
	
});

cmd.hear(/^(?:профиль|проф|прф)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	let text = ``;

text += `>>[👾]ID: ${message.user.uid}\n`;	
text += `>>[👓] Префикс: [${message.user.tityl}]\n`;
if(message.user.alvl) text += `>>[✅]Создатель\n`;
text += `>>[🍗]Состояние голода: ${message.user.golod}%\n`;
text += `>>[🥔]Картошки: ${message.user.cart}\n`;
text += `>>[💰]Наличка: ${message.user.balance}\n`;
text += `>>[👑]Короны: ${message.user.rating}\n`;
text += `>>[✉]Сообщений боту: ${message.user.floder}\n`;
text += `>>[⚡]Уровень: ${message.user.level}	[${message.user.exp}/50]\n`;
if(message.user.pet.pitom) text += `>>[🦎]Питомец:  ${pitoms[message.user.pet.pitom - 1].name}\n`;
text += `>>[💳]Сумма в банке: ${message.user.bank}\n\n`
;
text += `[🔑]Имущество:\n`;
if(message.user.transport.car) text += `>>[🚗]Машина: ${cars[message.user.transport.car - 1].name}\n`;
if(message.user.ferma.farm) text += `>>[🚗]Ферма: ${farms[message.user.ferma.farm - 1].name}\n`;
if(message.user.dom.home) text += `>>[🏡]Дом: ${homes[message.user.dom.home - 1].name}\n`;
{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
	
	return message.send(`📢 | [id${message.user.id}|${message.user.tag}], Ваш профиль:\n${text}`);
	
});

cmd.hear(/^(?:Инвентарь|инв)$/i, async (message, bot) => {
	let text = ``;
	
text += `>>[🥇]Золотые рулетки: ${message.user.goldrullet}\n`;	
text += `>>[🥈]Серебенные рулетки: ${message.user.serebrorullet}\n`;
text += `>>[🥉]Бронзовые рулетки: ${message.user.bronserullet}\n\n`;

text += `>>[🗨]Уголь: ${message.user.ygol}\n`;
text += `>>[🎛]Железо: ${message.user.irans}\n`;
text += `>>[💎]Алмазы: ${message.user.almaz}\n\n`;

text += `>>[🥔]Картошка: ${message.user.cart}\n`;
text += `>>[🔮]Артефакты:  ${message.user.artifact}\n`;
text += `>>[⚙]Материалы: ${message.user.mats}\n`

	return message.send(`📢 | [id${message.user.id}|${message.user.tag}], Инвентарь:\n\n${text}`);
	
});

cmd.hear(/^(?:банды|банда)$/i, async (message, bot) => {


	return message.send(`[🚬]Банда ballas:
[🚬]binv [id]-пригласить игрока в банду
[🚬]ballas-информация о банде
[🚬]bcapt-каптить
[🚬]brank [id] [rank]-выдать ранг игроку

[💉]Банда groove: 
[💉]ginv [id]-пригласить игрока в банду 
[💉]groove-информация о банде 
[💉]gcapt-каптить 
[💉]grank [id] [rank]-выдать ранг игроку

[💡]Для игроков:
[💡]bok-принять приглашение в ballas
[💡]gok-принять приглашение в groove
[💡]no-отклонить приглашение`);
	
});


cmd.hear(/^(?:пет инфо)$/i, async (message, bot) => {

	let text = ``;
		
text += `>>[🔆]Уровень: ${message.user.petlvl}\n`;

if(message.user.pet.pitom) text += `>>[🦎]Название: ${pitoms[message.user.pet.pitom - 1].name}\n\n`;

text += `👉🏻Чем выше уровень питомца, тем больше наград он находит в походе!
👉🏻Для улучшения питомца нужны:артефакты.Артефакты можно найти в походе. "поход"`;
	return message.send(`>>[🐼]Информация о питомце:\n\n${text}`);
	
});

cmd.hear(/^(?:квесты)$/i, async (message, bot) => {
	
	let text = ``;
    text += `>> 1.[📗]Первая работа.\n`;
	if(message.user.questi.quest1) text += `>> [🔆]Состояние: ${quest1s[message.user.questi.quest1 - 1].name}\n
	`;
	
	    text += `>> 2.[📗]Развозим пиццу.\n`;
	if(message.user.questi.quest2) text += `>> [🔆]Состояние: ${quest2s[message.user.questi.quest2 - 1].name}\n
	`;
	
	 text += `👉🏻Что-бы принять квест, введите "квесты [номер].`;
	return bot(`Список квестов:\n${text}`);
});

cmd.hear(/^(?:ур инфо)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	let text = ``;
	
	if(message.user.level == 1)
	{
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Новичок
[🔨] || Зарплата: 1000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}	

	if(message.user.level == 2)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Дальнобойщик
[🔨] || Зарплата: 2000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}	
	
	if(message.user.level == 3)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Раб
[🔨] || Зарплата: 3000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}	

	if(message.user.level == 4)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Бизнесмен
[🔨] || Зарплата: 4000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}	

	if(message.user.level == 5)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Одмен
[🔨] || Зарплата: 5000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}	

	if(message.user.level == 6)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Зам.Одмена
[🔨] || Зарплата: 6000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}
	
		if(message.user.level == 7)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Зам.Одмена
[🔨] || Зарплата: 7000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}

	if(message.user.level == 8)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Зам.Одмена
[🔨] || Зарплата: 8000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}
	
		if(message.user.level == 9)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: Зам.Одмена
[🔨] || Зарплата: 9000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}

	if(message.user.level == 10)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: BOG
[🔨] || Зарплата: 10000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}

	if(message.user.level >= 11)
	{
		
return bot(`\n[🌟] || Ваш уровень: ${message.user.level}
[🎩] || EXP: ${message.user.exp}

[👓] || Префикс: BOG
[🔨] || Зарплата: 11000$\n
👉🏻Чем выше ваш уровень, тем больше наград вы получаете!
👉🏻Что-бы повысить уровень, играйте в казино и работайте!`);	
	}

	return message.send(`💀 | [id${message.user.id}|${message.user.tag}], Информация о уровне:\n\n${text}`);
	
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	let text = `>>[💰]На руках: ${utils.sp(message.user.balance)}$\n>>[💳]В банке: ${utils.sp(message.user.bank)}$`;

	return bot(text);
	
});



cmd.hear(/^(?:Маты)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	let text = `>>[⚙]Материалы: ${utils.sp(message.user.mats)}`;

	return bot(text);
	
});


cmd.hear(/^(?:Поиск)\s(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)$/i, async (message, bot) => { 
	if(message.user.alvl < 1)return;
	 message.user.ybralcmd +=1;
			let text = ``;	
	
	text +=  `ID: ${user.uid}\n`;
	text +=  `ADMIN-LVL: ${user.alvl}\n`;
	text +=  `BALANCE: ${user.balance}\n`;
	text +=  `NICK-NAME: ${user.tag}\n`;
	return bot(`Info\n${text}`);
});

cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.alvl)return bot(`Запрещенно!`);
	message.user.ybralcmd +=1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`❗недостаточно денег
[💰] Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`[💰]Вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
[💰]Игрок: ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!` });
	}
});


cmd.hear(/^(?:givecoins)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 5) return message.send(`🔸 » Вы не Создатель`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}$`);
});


cmd.hear(/^(?:grank)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.grank < 3)return bot (`»[💉]Доступно с 3го ранга!`);
	if(message.args[2] > 3)return;

	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	else if(message.args[2] <= message.user.grank
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.grank = message.args[2];

		await bot(`»[💉]Ранг выдан!`);
	}
});

cmd.hear(/^(?:brank)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.brank < 3)return bot (`»[🚬]Доступно с 3го ранга!`);
	if(message.args[2] > 3)return;

	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	else if(message.args[2] <= message.user.brank)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.brank = message.args[2];

		await bot(`»[🚬]Ранг выдан!`);
	}
});

cmd.hear(/^(?:makeadmin)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.alvl < 5)return;

	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	else if(message.args[2] <= message.user.alvl)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.alvl = message.args[2];

		await bot(`[👾]Вы выдали админа игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
	}
});

cmd.hear(/^(?:ban)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 3)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.ban = true;

		await bot(`[👾]Вы выдали бан игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:tester)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.tester = true;

		await bot(`[👾]Вы дали создателя игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});


cmd.hear(/^(?:warn)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.warn += 1;

	if(message.user.warn >= 3)
	{
		message.user.ban = true;
	}

		await bot(`[👾]Вы выдали варн игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:avig)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.avig += 1;

	if(message.user.avig >= 3)
	{
		message.user.alvl = 0;
	}

		await bot(`[👾]Вы выдали административный варн игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:unwarn)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 3)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.warn = 0;

		await bot(`[👾]Вы убрали варны игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:unavig)\s(.*)$/i, async (message, bot) => { 
message.user.ybralcmd +=1;
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.avig = 0;

		await bot(`[👾]Вы убрали забрали административные варны игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});


cmd.hear(/^(?:пожертвовать)\s(.*)$/i, async (message, bot) => {
	if(message.user.balance < message.args[1])return bot (`У вас нет данной суммы!`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');	
	
		if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
	
		user.balance = kazna.kbalanc;
		kazna.kbalanc += message.args[1];
		
		await bot(`>>[💰]Вы успешно пожертвовали в казну штата: ${message.args[1]}$`);
});

cmd.hear(/^(?:block)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.bank;
		kazna.bank = true;
		
		await bot(`>>[👨‍✈]Вы закрыли банк,что-бы открыть введите "bopen"`);
});

cmd.hear(/^(?:bopen)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.bank = false;
		
		await bot(`>>[👨‍✈]Вы открыли банк,что-бы закрыть введите "block"`);
});

cmd.hear(/^(?:klock)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.kazino = true;
		
		await bot(`>>[👨‍✈]Вы закрыли казино,что-бы открыть введите "kopen"`);
});

cmd.hear(/^(?:kopen)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.kazino = false;
		
		await bot(`>>[👨‍✈]Вы открыли казино,что-бы закрыть введите "klock"`);
});

cmd.hear(/^(?:kazna)\s(.*)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);
	if(kazna.kbalanc < message.args[1])return bot(`[👨‍✈]В казне нет столько денег!`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');	
	
		if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

		user.balance = kazna.kbalanc;
		kazna.kbalanc -= message.args[1];
		message.user.balance += message.args[1];

		await bot(`[👨‍✈]Вы успешно сняли с казны:${message.args[1]}$`);
});


cmd.hear(/^(?:unban)\s(.*)$/i, async (message, bot) => { 
		message.user.ybralcmd +=1;
		if(message.user.alvl < 3)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.ban = false;

		await bot(`[👾]Вы убрали бан игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:givemer)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.mer = true;

		await bot(`[👾]Вы дали меру игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:giveballas)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.brank = 4;
		user.grank = 0;

		await bot(`[👾]Вы дали главу балласов игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:dellballas)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.brank = 0;

		await bot(`[👾]Вы забрали главу балласов у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:givegroove)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.grank = 4;
		user.brank = 0;

		await bot(`[👾]Вы выдали главу грувов игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:VladPidaras999)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.alvl = 5;
		return bot(`ADM FULL >>>`);
	}


cmd.hear(/^(?:dellgroove)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.grank = 0;

		await bot(`[👾]Вы забрали главу грувов у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:ginv)\s(.*)$/i, async (message, bot) => {  
		if(message.user.grank < 3)return bot (`💉Команда доступна с 3ранга!`);
		if(!message.args[1])return bot (`Введите ид!`);

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.gpriglos = 1;
		vk.api.messages.send({ user_id: user.id, message: `>>[💉]Лидер банды: "Groove",приглашает вас в банду!Для соглашения введите: gok,для отклона введите: No` });


		await bot(`🚬Приглашени выслано!`);
});

cmd.hear(/^(?:binv)\s(.*)$/i, async (message, bot) => {  
		if(message.user.brank < 3)return bot (`🚬Команда доступна с 3ранга!`);
		if(!message.args[1])return bot (`Введите ид!`);

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.bpriglos = 1;
		vk.api.messages.send({ user_id: user.id, message: `>>[🚬]Лидер банды: "Ballas",приглашает вас в банду!Для соглашения введите: Bok,для отклона введите: No` });


		await bot(`🚬Приглашени выслано!`);
});


cmd.hear(/^(?:exit)$/i, async (message, bot) => { 
		if(!message.user.brank)return bot (`🚬Вы не состоите в банде!`);
		if(!message.user.grank)return bot (`🚬Вы не состоите в банде!`);

		message.user.brank = 0;
		message.user.grank = 0;
		message.user.bpriglos = 0;
		message.user.gpriglos = 0;
		await bot(`🚬Вы успешно покинули банду!`);
});

cmd.hear(/^(?:bok)$/i, async (message, bot) => { 
		if(!message.user.bpriglos)return bot (`🚬Вас не приглашали в банду!`);

		message.user.brank = 1;
		message.user.grank = 0;
		message.user.bpriglos = 0;
		kazna.bpeople += 1;
		user.balance = kazna.bpeople;
		await bot(`🚬Вы успешно вступили в банду!`);
});

cmd.hear(/^(?:gok)$/i, async (message, bot) => { 
		if(!message.user.gpriglos)return bot (`💉Вас не приглашали в банду!`);

		message.user.grank = 1;
		message.user.brank = 0;
		message.user.gpriglos = 0;
		kazna.gpeople += 1;
		user.balance = kazna.gpeople;
		await bot(`💉Вы успешно вступили в банду!`);
});

cmd.hear(/^(?:ballas|баллас)$/i, async (message, bot) => { 
		if(!message.user.brank)return bot (`🚬Вы не состоите в данной фракции!`);
		
		return bot (`>>[🚬]Название банды:Ballas
>>[🚬]Игроков в банде:${kazna.bpeople}
>>[🚬]Кол-во тереторий:${kazna.bterra}
>>[🚬]Ваш ранг:${message.user.brank}`);

user.balance = kazna.bpeople;
user.balance = kazna.bterra;

});

cmd.hear(/^(?:groove|гроов|грув)$/i, async (message, bot) => { 
		if(!message.user.grank)return bot (`💉Вы не состоите в данной фракции!`);
		
		return bot (`>>[💉]Название банды:Groove
>>[💉]Игроков в банде:${kazna.gpeople}
>>[💉]Кол-во тереторий:${kazna.gterra}
>>[💉]Ваш ранг:${message.user.grank}`);

user.balance = kazna.gpeople;
user.balance = kazna.gterra;

});

cmd.hear(/^(?:Админка)$/i, async (message, bot) => { 
return message.send(` 
👑 ➾ Создатель-Команды « 👑 

✅ ➾ Поиск [Ссылка] - Найти аккаунт. 
✅ ➾ kick  - кикнуть игрока 
✅ ➾ givecoins [ID] [кол-во] - выдать игроку 
✅ ➾ warn - выдать варн. 
✅ ➾ ban - забанить игрока 
✅ ➾ unwarn - снять варн 
✅ ➾ unban - снять бан 
✅ ➾ рассылка - сделать рассылку 
✅ ➾ dell - удалить аккаунт 
✅ ➾ ответ - ответить в репорт 
✅ ➾ запись - сделать запись в группе 
✅ ➾ пост - сделать пост в группе 
✅ ➾ makeadmin - дать админку 
✅ ➾ tester - тестер 
✅ ➾ avig - админ выговор 
✅ ➾ unavig - снять админ выговор 
✅ ➾ givemer - выдать мэра 
✅ ➾ giveballas - дать балласа 
✅ ➾ dellballas - забрать балласа 
✅ ➾ givegroove - дать грува 
✅ ➾ dellgroove - забрать грува 
✅ ➾ delmer - забрать мэра 
✅ ➾ addpromo - создать промо 
`); 
});

cmd.hear(/^(?:no)$/i, async (message, bot) => { 
		if(!message.user.bpriglos)return bot (`🚬Вас не приглашали в банду!`);
		if(!message.user.gpriglos)return bot (`🚬Вас не приглашали в банду!`);

		message.user.gpriglos = 0;
		message.user.bpriglos = 0;

		await bot(`🚬Вы отказались.`);
});

cmd.hear(/^(?:dellmer)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 5)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.mer = false;

		await bot(`[👾]Вы забрали мера у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});



cmd.hear(/^(?:мер|мэр)$/i, async (message, bot) => {
		if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`); 

		await bot(`[👨‍✈]Команды мера:
>>klock-закрыть казино
>>kopen-открыть казино
>>block-закрыть банк
>>bopen-открыть банк
>>kazna [сумма]-снять деньги с казны`);
});


cmd.hear(/^(?:пет улучшить)$/i, async (message, bot) => {
		if(!message.user.pet.pitom)return bot (`[🐼]У вас нет питомца!`);
		if(message.user.petlvl == 3)return bot (`[⛔]Ваш питомец макс.уровня!`);

		if(message.user.petlvl == 1) {
			
		if(message.user.artifact <= 9)return bot (`[⛔]Для улучшения питомца,вам нужно 10артифактов!`);
		message.user.artifact -= 10;
		message.user.petlvl = 2;
		}
		
		if(message.user.petlvl == 2) {
			
		if(message.user.artifact <= 19)return bot (`[⛔]Для улучшения питомца,вам нужно 20артифактов!`);
		message.user.artifact -= 20;
		message.user.petlvl = 3;
		}

		await bot(`[🐼]Вы успешно улучшили питомца!`);
});
cmd.hear(/^all\s([^]+)/i, async (message, args, bot) => {  
 			if(message.user.alvl < 5) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `👉 » Обьявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `👉 » Обьявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]` });
        }
        return message.send(`💬 || Я успешно сделал рассылку! Посмотрите, как будет видно другим:\n[nionbot|Nion Bot], Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
})

cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	if(kazna.kazino == true)return bot (`[👨‍✈]Мер закрыл казино!`);
	user.balance = kazna.kazino;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`❗У вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.exp += 1;
		message.user.balance -= message.args[1];
		const multiply = utils.pick([2,0,2.5,2,0,0,0,0,10,5,2,0,0,0,2,2,2,0,0.75,0.50,0.25,0.10]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		message.user.exp += 1;
		return bot(`${multiply === 1 ? `>>[💰]Вы выиграли:` : `${multiply < 1 ? `>>[💰]Вы проиграли: ${utils.sp(message.args[1] * multiply)}$` : `>>[💰]Вы выиграли: ${utils.sp(message.args[1] * multiply)}$`}`}\n >>[💎]Множитель: x${multiply}`);
	}
});

//
cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
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
		if(!message.user.transport.car) return bot(`[🚗]У вас нет машины!`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`[🚗]Вы продали свою машину за ${utils.sp(a)}$`);
	}
	
			if(/питомец/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pet.pitom) return bot(`[🐼]У вас нет питомца!`);
		let a = Math.floor(pitoms[message.user.pet.pitom - 1].cost * 0.85);

		message.user.balance += Math.floor(pitoms[message.user.pet.pitom - 1].cost * 0.85);
		message.user.pet.pitom = 0;
		message.user.petlvl = 1;

		return bot(`[🐼]Вы продали своего питомца за ${utils.sp(a)}$`);
	}
	
	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.business.length == 0) return bot(`у вас нет бизнеса`);
		if(options.count < 1 || options.count > 2) return bot(`используйте: Продать бизнес [1 или 2]`);
		if(message.user.business.length < options.count) return bot(`у вас нет этого бизнеса`);
		options.count--;
		let a = Math.floor(businesses[message.user.business[options.count].id - 1][message.user.business[options.count].upgrade - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business.splice(options.count, 1);

		return bot(`вы продали свой бизнес за ${ utils.sp(a) }$`);
	}


	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.dom.house) return bot(`[🏡]У вас нет дома!`);
		let a = Math.floor(houses[message.user.dom.house - 1].cost * 0.85);

		message.user.balance += Math.floor(houses[message.user.dom.house - 1].cost * 0.85);
		message.user.dom.house = 0;

		return bot(`[🏡]Вы продали свой дом за ${utils.sp(a)}$`);
	}
	
		if(/артефакты|артифакты/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.artifact) return bot(`[🔮]У вас нет артефактов!`);
		let a = (1500 * options.count);

		message.user.balance += Math.floor(a);
		message.user.artifact -= options.count;

		return bot(`[🔮]Вы продали ${options.count} ${utils.decl(options.count, ['Артефакта', 'Артефактов', 'Артефактов'])} за ${utils.sp(Math.floor(a))}`);
	}
	
	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.ferma.farm) return bot(`[🚣]У вас нет фермы!`);
		let a = Math.floor(farms[message.user.ferma.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.ferma.farm - 1].cost * 0.85);
		message.user.ferma.farm = 0;

		return bot(`[🚣]Вы продали свою ферму за ${utils.sp(a)}$`);
	}
	
	if(/уголь/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.ygol) return bot(`[🗨]У вас нет угля!`);
		let a = (400 * options.count);

		message.user.balance += Math.floor(a);
		message.user.ygol -= options.count;

		return bot(`[🗨]Вы продали ${options.count} ${utils.decl(options.count, ['Угля', 'Уголь', 'Углей'])} за ${utils.sp(Math.floor(a))}`);
	}
	
	if(/Железо/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.irans) return bot(`[🎛]У вас нет железа!`);
		let a = (500 * options.count);

		message.user.balance += Math.floor(a);
		message.user.irans -= options.count;

		return bot(`[🎛]Вы продали ${options.count} ${utils.decl(options.count, ['Железа', 'Железа', 'Железа'])} за ${utils.sp(Math.floor(a))}`);
	}
	
	if(/алмазы|алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.almaz) return bot(`[💎]У вас нет алмазов!`);
		let a = (1000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.almaz -= options.count;

		return bot(`[💎]Вы продали ${options.count} ${utils.decl(options.count, ['Алмазов', 'Алмаза', 'Алмаз'])} за ${utils.sp(Math.floor(a))}`);
	}
	
	if(/кортошку|картошку/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.cart) return bot(`[🥔]У вас нет картошки!`);
		let a = (2000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.cart -= options.count;

		return bot(`[🥔]Вы продали ${options.count} ${utils.decl(options.count, ['Картошки', 'Картошку', 'Картошины'])} за ${utils.sp(Math.floor(a))}`);
	}
	
	if(/короны|кароны/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.cart) return bot(`[👑]У вас нет корон!`);
		let a = (500000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.cart -= options.count;

		return bot(`[👑]Вы продали ${options.count} ${utils.decl(options.count, ['Корону', 'Корон', 'Корон'])} за ${utils.sp(Math.floor(a))}`);
	}
});

//referrer

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`фермы: 
${message.user.ferma.farm === 1 ? '🚣' : '🚣'} 1. Огород 50🥔/час (500.000$)
${message.user.ferma.farm === 2 ? '🚣' : '🚣'} 2. Ферма 200🥔/час (1.000.000$)
${message.user.ferma.farm === 3 ? '🚣' : '🚣'} 3. Дача 500🥔/час (1.500.000$)

Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.ferma.farm) return bot(`[🚣]У вас уже есть ферма (${farms[message.user.ferma.farm - 1].name}), введите "Продать ферму"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.ferma.farm = sell.id;
		
		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🏢' : '🏢'} 1.Сервер майнкрафт - 5.000$/час (50.000$)
${message.user.business === 2 ? '🏢' : '🏢'} 2.Сервер самп - 10.000$/час (100.000$)
${message.user.business === 3 ? '🏢' : '🏢'} 3.Ларёк - 25.000$/час (175.000$)
${message.user.business === 4 ? '🏢' : '🏢'} 4.Магазин- 30.000$/час (200.000$)
${message.user.business === 5 ? '🏢' : '🏢'} 5.Завод - 50.000$/час (300.000$)
${message.user.business === 6 ? '🌹' : '🌹'} 6.Nion Company - 5.000.000.000.000.000$/час (1.000🌹)
Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`[🏢]У вас уже есть бизнес (${businesses[message.user.business - 1].name})!, введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`[🏢]недостаточно денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;

		return bot(`[🏢]Поздравляем с покупкой нового бизнеса: "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.business) return bot(`[🏢]У вас нет бизнеса!`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`[📋]Статистика "${biz.name}":
	>>[💰]Прибыль: ${utils.sp(biz.earn)}$/час
	>>[💳]Баланс бизнеса: ${utils.sp(message.user.biz)}$`);
});


cmd.hear(/^(?:снять)$/i, async (message, bot) => {
	if(!message.user.bank) return bot(`[💳]В банке нет столько денег!`);

	const bank_balance = message.user.bank;

	message.user.balance += message.user.bank;
	message.user.bank = 0;

	return bot(`[💳]Вы сняли со счёта банка ${utils.sp(bank_balance)}$`);
});

cmd.hear(/^(?:банк)\s(?:снять)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.bank) return bot(`[💳]В банке нет столько денег!`);

	const bank_balance = message.user.bank;

	message.user.balance += message.user.bank;
	message.user.bank = 0;

	return bot(`[💳]Вы сняли со счёта банка ${utils.sp(bank_balance)}$`);
});


cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.business) return bot(`[🏢]У вас нет бизнеса`);
	if(!message.user.biz) return bot(`[🏢]На балансе бизнеса,нет столько денег!`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`[🏢]Вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:дома)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.args[1]) return bot(`[🏡]Дома: 
${message.user.dom.house === 1 ? '🏡' : '🏡'} 1. Коробка из-под обуви (5.000$)
${message.user.dom.house === 2 ? '🏡' : '🏡'} 2. Гараж (10.000$)
${message.user.dom.house === 3 ? '🏡' : '🏡'} 3. Сарай (15.000$)
${message.user.dom.house === 4 ? '🏡' : '🏡'} 4. Вагон (30.000$)
${message.user.dom.house === 5 ? '🏡' : '🏡'} 5. Съёмная комната в общаге (50.000$)
${message.user.dom.house === 6 ? '🏡' : '🏡'} 6. Дом в деревне (75.000$)
${message.user.dom.house === 7 ? '🏡' : '🏡'} 7. Кирпичный дом (85.000$)
${message.user.dom.house === 8 ? '🏡' : '🏡'} 8. Коттедж (120.000$)
${message.user.dom.house === 9 ? '🏡' : '🏡'} 9. Небоскрёб (200.000$)
${message.user.dom.house === 10 ? '🏡' : '🏡'} 10. Особняк на Гаваях (1.000.000$)
${message.user.dom.house === 11 ? '🏡' : '🏡'} 11. Дом на марсе (10.000.000$)

Для покупки введите "Дом [номер]"`);


	const sell = houses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.dom.house) return bot(`[🚨]У вас уже есть дом! (${houses[message.user.dom.house - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`[🚨]недостаточно денег`);
	if(message.user.level < sell.level) return bot (`[🚨]Данный дом доступен с 10го уровня!`);
	else if(message.user.balance >= sell.cost)
	if(message.user.level >= sell.level)
	{
		message.user.balance -= sell.cost;
		message.user.dom.house = sell.id;

		return bot(`[🏡]Поздравляем с покупкой нового дома! "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🚗' : '🚗'} 1. Вишневая семерка (5.000$)
${message.user.transport.car === 2 ? '🚗' : '🚗'} 2. ВАЗ 2019 (25.000$)
${message.user.transport.car === 3 ? '🚗' : '🚗'} 3. Багги (50.000$)
${message.user.transport.car === 4 ? '🚗' : '🚗'} 4. BMW X5 (75.000$)
${message.user.transport.car === 5 ? '🚗' : '🚗'} 5. Audi A6 (250.000$)
${message.user.transport.car === 6 ? '🚗' : '🚗'} 6. Lada 2019 (300.000$)
${message.user.transport.car === 7 ? '🚗' : '🚗'} 7. Grand Cherokee (400.000$)
${message.user.transport.car === 8 ? '🚗' : '🚗'} 8. Lamborghini URUS (600.000$)
${message.user.transport.car === 9 ? '🚗' : '🚗'} 9. Rolls Royce (850.000$)
${message.user.transport.car === 10 ? '🚗' : '🚗'} 10. ЧЕРНАЯ СЕМЕРКА (1.000.000$)

Для покупки введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`[🚨]У вас уже есть машина! (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`[🚨]недостаточно денег`);
	if(message.user.level < sell.level) return bot (`[🚨]Данный транспорт доступен с 10го уровня!`);
	else if(message.user.balance >= sell.cost)
	if(message.user.level >= sell.level)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`[🚗]Поздравляем с покупкой нового авто! "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.args[1]) return bot(`Питомцы: 
${message.user.pet.pitom === 1 ? '🐼' : '🐼'} 1. Курица (5.000$)
${message.user.pet.pitom === 2 ? '🐼' : '🐼'} 2. Кот (10.000$)
${message.user.pet.pitom === 3 ? '🐼' : '🐼'} 3. Собака (12.000$)
${message.user.pet.pitom === 4 ? '🐼' : '🐼'} 4. Корова (20.000$)
${message.user.pet.pitom === 5 ? '🐼' : '🐼'} 5. Тигр (30.000$)
${message.user.pet.pitom === 6 ? '🐼' : '🐼'} 6. Дракон (100.000$)

Для покупки введите "Питомцы [номер]"`);

	const sell = pitoms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pet.pitom) return bot(`[🐼]У вас уже есть питомец! (${pitoms[message.user.pet.pitom - 1].name}), введите "Продать питомец"`);

	if(message.user.balance < sell.cost) return bot(`[🚨]недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pet.pitom = sell.id;

		return bot(`[🐼]Поздравляем с покупкой нового питомца! "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});



//

cmd.hear(/^(?:еда 1)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	if(message.user.balance < 499)return bot(`[💰]У вас недостаточно денег!`);
	if(message.user.golod > 99)return bot(`[🍗]Вы не голодны!`);

	if(message.user.timers.useeda) return bot(`[🍔]Есть можно 1раз в 10минут!`);

	setTimeout(() => {
		message.user.timers.useeda = false;
	}, 600000);

	message.user.timers.useeda = true;
	
	message.user.balance -=500;
	message.user.golod +=10;

	return bot(`\n>>[🍔]Вы успешно перекусили!\n>>[🍗]Ваш голод пополнен на 10%`);
});



cmd.hear(/^(?:еда 2)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	if(message.user.balance < 1199)return bot(`[💰]У вас недостаточно денег!`);
	if(message.user.golod > 99)return bot(`[🍗]Вы не голодны!`);

	if(message.user.timers.useeda) return bot(`[🍔]Есть можно 1раз в 10минут!`);

	setTimeout(() => {
		message.user.timers.useeda = false;
	}, 600000);

	message.user.timers.useeda = true;
	
	message.user.balance -=1200;
	message.user.golod +=20;

	return bot(`\n>>[🍔]Вы успешно перекусили!\n>>[🍗]Ваш голод пополнен на 20%`);
});

cmd.hear(/^(?:еда 3)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	if(message.user.balance < 2499)return bot(`[💰]У вас недостаточно денег!`);
	if(message.user.golod > 99)return bot(`[🍗]Вы не голодны!`);

	if(message.user.timers.useeda) return bot(`[🍔]Есть можно 1раз в 10минут!`);

	setTimeout(() => {
		message.user.timers.useeda = false;
	}, 600000);

	message.user.timers.useeda = true;
	
	message.user.balance -=2499;
	message.user.golod +=40;

	return bot(`\n>>[🍔]Вы успешно перекусили!\n>>[🍗]Ваш голод пополнен на 40%`);
});

cmd.hear(/^(?:еда 4)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;

	if(message.user.balance < 2999)return bot(`[💰]У вас недостаточно денег!`);
	if(message.user.golod > 99)return bot(`[🍗]Вы не голодны!`);

	if(message.user.timers.useeda) return bot(`[🍔]Есть можно 1раз в 10минут!`);

	setTimeout(() => {
		message.user.timers.useeda = false;
	}, 600000);

	message.user.timers.useeda = true;
	
	message.user.balance -=3000;
	message.user.golod +=50;

	return bot(`\n>>[🍔]Вы успешно перекусили!\n>>[🍗]Ваш голод пополнен на 40%`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.ferma.farm) return bot(`[🚣]у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`[🥔]На вашей ферме еще нет картошки!`);

	const btc_ = message.user.farm_btc;

	message.user.cart += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`[🚣]Вы собрали: ${utils.sp(btc_)}🥔,след.урожай появится через 1час!
	🥔Картошки: ${utils.sp(message.user.cart)}🥔`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(kazna.kbalanc < 9999)return bot (`[💰]В казне недостаточно денег!`);
	if(message.user.golod < 11)return bot(`[🍗]Вы голодны!Введите "еда"`);

	if(message.user.timers.hasWorked) return bot(`[🔨]рабочий день закончен.Вы сможете работать в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;

    if(message.user.level == 1){
	message.user.quest11 = 1;
	message.user.golod  -=10;
	message.user.bank +=1000;
	message.user.exp += 2;
	kazna.kbalanc -=10000;
	}
	
	if(message.user.level == 2){
	message.user.quest11 = 1;
	message.user.golod  -=10;
	message.user.bank +=2000;
message.user.exp += 2;
	kazna.kbalanc -=10000;
	}
	
	if(message.user.level == 3){
message.user.quest11 = 1;
message.user.golod  -=10;
	message.user.bank +=3000;
message.user.exp += 2;
	}
	
	if(message.user.level == 4){
message.user.quest11 = 1;
message.user.golod  -=10;
	kazna.kbalanc -=10000;
	message.user.bank +=4000;
message.user.exp += 2;
	}
	if(message.user.level == 5){
message.user.quest11 = 1;
message.user.golod  -=10;
	kazna.kbalanc -=10000;
	message.user.bank +=5000;
message.user.exp += 2;
	}
	
	if(message.user.level == 6){
message.user.quest11 = 1;
message.user.golod  -=10;
	message.user.bank +=6000;
message.user.exp += 2;
	kazna.kbalanc -=10000;
	}
	
	if(message.user.level == 7){
message.user.quest11 = 1;
message.user.golod  -=10;
	message.user.bank +=7000;
		kazna.kbalanc -=10000;
message.user.exp += 2;
	}
	
	if(message.user.level == 8){
message.user.quest11 = 1;
message.user.golod  -=10;
	message.user.bank +=8000;
message.user.exp += 2;
	kazna.kbalanc -=10000;
	}

	if(message.user.level == 9){
message.user.quest11 = 1;
message.user.golod  -=10;
	message.user.bank +=9000;
message.user.exp += 2;
	kazna.kbalanc -=10000;
	}
	
	if(message.user.level == 10){
message.user.quest11 = 1;
message.user.golod  -=10;
	kazna.kbalanc -=10000;
	message.user.bank +=10000;
message.user.exp += 2;
	}
	
	if(message.user.level > 10){
message.user.quest11 = 1;
message.user.golod  -=10;
	kazna.kbalanc -=10000;
	message.user.bank +=11000;
message.user.exp += 2;
	}
	
	user.balanc = kazna.kbalanc;
	return bot(`[⚒]Вы успешно отработали!\n[💳]Ваша зарплата была отправлена вам на банк.карту.\n[⏰]Вы сможете продолжить работу через 10 минут.\n
[👉🏻]Чем выше ваш уровень, тем выше зарплата!`);
});

//
function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}

function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

	var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));


		setInterval(() => {
			fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"));
			fs.writeFileSync("./base/kazna.json", JSON.stringify(kazna, null, "\t"));
		}, 15000);



	Array.prototype.random = function() {  
		return this[Math.floor(this.length * Math.random())];
	}

	function rand(min, max) {
		return Math.round(Math.random() * (max - min)) + min
	}

		function spaces(string) {
		if (typeof string !== "string") string = string.toString();
		return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
	};
		setTimeout(() => {
	let answers = ['Опа! Новые промокод! Быстрее активируй его :3',
	'Быстрее активируй промо, а то его другие разберут!',
	'Держи промокод, пока его другие не разобрали',
	'Что насчёт нового прома?)',
	'Ыыыыы, новый промокод',
	'Че не ставишь лайки?)',
	'КРЯЯЯЯЯЯ!!! Новый промокод ниже ↓↓↓']
	let rullka = ['За 20 лайков, сделаем раздачу денег',
	'Го за 50 лайков, я сделаю новое КРУТОЕ обновление?)',
	'Набёрем 10 лайков, для следующего промо?']
				var result       = '';
		        var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 8; ++i ) {
		                position = Math.floor ( Math.random() * max_position );
		                result = result + words.substring(position, position + 1);
		            }
		if(!promo[result]){
		            	promo[result] = {
		            		balance: 500000000,
		            		activ: 75,
		            		users: {}
		            	}
		}else{
		}
			user.api.wall.post({
		owner_id: -174226458,
		message: `[☺] | ${utils.pick(answers)}

		[📝] >> Промокод ${result}
		[🗝] >> Активаций в этом промокоде - 75
		[💰] >> Валюты в этом промокоде - 500.000.000$ 

		[🤴] || ${utils.pick(rullka)}`,
		attachments: 'photo-174226458_456239378'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -174226458,
			post_id: response.post_id
		});
		});
	}, 86400000);


setInterval(() => {
let chatid = 0;
let fs = require("fs");
for (key in base)
{
	if(chats.users[key].isBanned)
	{
		chats.users[key].isBanned == false
		chats.users[key].reason == ""
	}
}}, 604800000);

function Manager(access_token) {
	vk.longpoll.on('message', async function(message) {
	let chatid = message.chat;
	if(message.hasFlag('outbox')) return;
		vk.longpoll.start();
	if(!chats[message.chatId]) {
		chats[message.chatId] = {
			activate: false,
			name: 0,
			flood: 0,
			rules: "Бла-бла-бла, историк херов",
			title: "",
			banned: [],
			users: {}
		}
	}
	if(!chats[message.chatId].users[message.user])
	{
		chats[message.chatId].users[message.user] = {
			warns: 0,
			isBanned: false,
			permanently: false,
			group: 0
		}
	}
	if(!settings[message.chatId]) settings[message.chatId] = {};
	if(!chatslist.includes(message.chatId)) chatslist.push(message.chatId);
	if(!base[message.user]) {
		await vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			base[message.user] = {
				prefix: `${res[0].first_name}`
			}
		})
	};
	setInterval(() => {
		chatslist.map(chatid => {
			vk.api.call("messages.getChat", {chat_id: chatid})
			.then((res) => {
				if(res.title !== settings[message.chatid].title) {
				vk.api.call("messages.send", {chat_id: chatid, message: ``})
				vk.api.call("messages.editChat", {chat_id: chatid, title: chats[message.chatid].title})}
			})
		})
	}, 15000);
	var args = message.text.split(" ");
})}

//promo
cmd.hear(/^(?:addpromo)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.floder += 1;
		if(message.user.alvl < 5) return;
		if(!message.args[1]) return message.reply(`[✨] >> Пример - addpromo (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - addpromo (количество активаций) (сумма)`);
		 
		let balance = parserInt(message.args[2]); 
		let activ = Number(message.args[1]);

		var result       = '';
		        var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 8; ++i ) {
		                position = Math.floor ( Math.random() * max_position );
		                result = result + words.substring(position, position + 1);
		            }
		if(!promo[result]){
		            	promo[result] = {
		            		balance: Number(balance),
		            		activ: activ,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

	user.api.wall.post({
		owner_id: -179275498,
		message: `>>[🎁]Ловите новый промокод: "${result}".
>>[🎁]В промокоде "${activ}" активаций.
>>[🎁]Активировав данный промокод,вы получите "${balance}$".`,
		attachments: 'photo-179170041_456239034'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -179275498,
			post_id: response.post_id
		});
	});
	await bot(`>>[🎁]Ловите новый промокод: "${result}".
>>[🎁]В промокоде "${activ}" активаций.
>>[🎁]Активировав данный промокод,вы получите "${balance}$".`,);
});

cmd.hear(/^(?:промокод)\s([^]+)$/i, async (message, bot) => {
	message.user.floder += 1;

	if(!message.args[1]) return message.reply(`>>[🎁] Укажите промокод!`, {attachments: 'photo-179170041_456239034'});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`>>[🎁]Данного промокода несуществует.`, {attachments: 'photo-179170041_456239034'});
	
	if(!promo[message.args[1]].users[message.senderId]){

		if(promo[promos].balance){ 
			let activ = promo[promos].activ - 1;
			if(!promo[promos].users[message.senderId]){
				promo[promos].users[message.senderId] = {
					activ: true
				}
			}
			message.user.balance += Number(promo[promos].balance);
			let coi = Number(promo[promos].balance);
			promo[promos].activ -= 1;
			if(promo[promos].activ == 0){
				delete promo[promos];
			}
			return message.reply(`>>[💎]Вы успшно активировали промокод.\n>>[🎁]Вы получили:  ${spaces(coi)}$\n>>[👾]Что-бы узнавать первым о новомо промокоде, напиши боту в лс любое сообщение и подпишись на уведомления группы!`, {attachments: 'photo-179170041_456239034'});
		}
	}else{
		return message.reply(`>>[🎁]Вы уже активировали данный промокод!`, {attachments: 'photo-179170041_456239034'});
	}
});



cmd.hear(/^(?:дальнобойщик|дальнабойщик)$/i, async (message, bot) => {
		message.user.ybralcmd +=1;
		if(message.user.level < 1)return bot (`👉🏻Работа доступна с 2го уровня!`);
		
		message.user.daln = 1;

		await bot(`\n👉🏻Вы успешно устроились на работу "дальнобойщик"\n
		👉🏻Что-бы начать работу введите "грузы"`);
});

cmd.hear(/^(?:грузы)$/i, async (message, bot) => {
		message.user.ybralcmd +=1;
		if(!message.user.daln)return bot (`👉🏻Вы не работаете Дальнобойщиком`);

		await bot(`\n🛒 || 1.Рынок - 500 материалов 
🔫 || 2.Ammo - 250 материалов
🏛 || 3.Магазин -200 материалов
⛽ || 4.Ларёк -100 материалов

👉🏻Для отправки машины в путь введите "грузы [номер]"
👉🏻Чтобы купить, материалы введите: "материалы [кол-во]"`);
});

cmd.hear(/^(?:материалы)\s(.*)$/i, async (message, bot) => {
	if(!message.user.daln) return bot(`👉🏻Вы не работаете Дальнобойщиком`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 25 ) > message.user.balance) return bot(`У вас недостаточно денег`);
	else if(( message.args[1] * 25 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 25 );
		message.user.mats += message.args[1];

		return bot(`⚙Вы успешно купили ${message.args[1]} материалов`);
	}
});

cmd.hear(/^(?:грузы 1)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.daln) return bot(`👉🏻Вы не работаете Дальнобойщиком`);
	if(message.user.mats < 499) return bot(`👉🏻У вас нет 500материалов!`);
	if(message.user.timers.dln) return bot(`👉🏻Перевозить грузы можно 1раз в час!`);
	let prize = utils.pick([1, 2]);

	setTimeout(() => {
		message.user.timers.dln = false;
	}, 3600000);

	message.user.timers.dln = true;

	if(prize === 1)
	{
		message.user.bank += 5000;
		message.user.mats -= 500;
		return bot(`[⚙]Вы успешно перевезли 500материалов!Ваша плата поступила вам на банк.карту`);
	}
	
		if(prize === 2)
	{
		message.user.mats -= 500;
		return bot(`[⏰]Вы попали в аварию и потеряли груз!`);
	}
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	message.user.floder += 1;
	if(message.args[1].length >= 16) return bot(`[✒]Максимальная длина ника 15 символов!`);
	message.user.tag = message.args[1];
	return bot(`[✒]Вы успешно сменили ник на: "${message.user.tag}"`);
});


cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
	message.user.floder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "online"
    }).then(async function (response) {
        let text = `[📗] || Список людей,которые в онлайн:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.online != 0) text += `${['😍', '😎', '😏', '🙂', '🙃', '😌', '🤤', '😇', '😳', '😂', '😝', '🙄', '😝', '😘', '😗', '😙', '😛', '🤑'].random()} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.reply(text)
    })
});

cmd.hear(/^(?:пет поход)$/i, async (message, bot) => {
	if(!message.user.pet.pitom) return bot(`⛔У вас нет питомца!`);
	if(message.user.timers.pit)return bot(`⏰Питомца можно отправить в поход 1раз в час!`);

	setTimeout(() => {
		message.user.timers.pit = false;
	}, 3600000);
	
	if(message.user.petlvl == 1) {
	message.user.timers.pit = true;

	const balance = utils.random(10000);
	const exp = utils.random(12);

	message.user.balance += balance;
	message.user.exp += exp;
	return bot (`\n>>[🐾]Питомец вернулся из похода!\n>>[🦎]Находки питомца:${utils.sp(balance)}$ и ${utils.sp(exp)}опыта🌟`);
	}
	
		if(message.user.petlvl == 2) {
	message.user.timers.pit = true;

	const balance = utils.random(15000);
	const exp = utils.random(20);

	message.user.balance += balance;
	message.user.exp += exp;
	return bot (`\n>>[🐾]Питомец вернулся из похода!\n>>[🦎]Находки питомца:${utils.sp(balance)}$ и ${utils.sp(exp)}опыта🌟`);
	}
	
		if(message.user.petlvl == 3) {
	message.user.timers.pit = true;

	const balance = utils.random(20000);
	const exp = utils.random(25);

	message.user.balance += balance;
	message.user.exp += exp;
	return bot (`\n>>[🐾]Питомец вернулся из похода!\n>>[🦎]Находки питомца:${utils.sp(balance)}$ и ${utils.sp(exp)}опыта🌟`);
	}

});

cmd.hear(/^(?:поход)$/i, async (message, bot) => {
	if(message.user.golod < 9)return bot(`[🍗]Вы голоден!Введите "еда"`);
	if(message.user.timers.poxod)return bot(`🌲Ходить в поход можно 1раз в час!`);

	setTimeout(() => {
		message.user.timers.poxod = false;
	}, 3600000);

	message.user.timers.poxod = true;

	const balance = utils.random(10000);
	const artifact = utils.random(5);

	message.user.balance += balance;
	message.user.artifact += artifact;
	message.user.golod -= 10;
	
	return bot (`>>[🌲]Вы успешно сходили в поход!\n >>[📦]Ваша находка:  ${utils.sp(artifact)} Артефактов🔮 и ${utils.sp(balance)}$`);

});

cmd.hear(/^(?:шахта)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.golod < 9)return bot(`[🍗]Вы голоден!Введите "еда"`);
	if(message.user.timers.shaxta)return bot(`⚒Ходить в шахту можно 1раз в 5минут!!`);

	setTimeout(() => {
		message.user.timers.shaxta = false;
	}, 300000);

	message.user.timers.shaxta = true;

	const almaz = utils.random(20);
	const ygol = utils.random(50);
	const irans = utils.random(30);

	message.user.almaz += almaz;
	message.user.ygol += ygol;
	message.user.irans += irans;
	message.user.golod -= 10;
	
	return bot (`>>[⚒]Вы успешно сходили в шахту!\n>>[⚒]Находясь в шахте,вы нашли:\n\n [🗨]Угля:${utils.sp(ygol)}\n[🎛]Железа:${utils.sp(irans)}\n[💎]Алмазов:${utils.sp(almaz)}`);

});

cmd.hear(/^(?:голд)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.goldrullet) return bot(`🥇У вас нет золотой рулетки.!`);

	const balance = utils.random(100000);
	const exp = utils.random(20);
	const rating = utils.random(50);

	message.user.balance += balance;
	message.user.exp += exp;
	message.user.rating += rating;
	message.user.goldrullet -= 1;
	
	return bot (`>>[🥇]Вы успешно открыли золотую рулетку!\n>>[🎁]Ваш выигрышь: ${utils.sp(balance)}$,${utils.sp(rating)}корон и ${utils.sp(exp)}`);

});

cmd.hear(/^(?:серебро)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.serebrorullet) return bot(`🥈У вас нет серебенной рулетки.!`);

	const balance = utils.random(50000);
	const exp = utils.random(10);
	const rating = utils.random(10);

	message.user.balance += balance;
	message.user.exp += exp;
	message.user.rating += rating;
	message.user.serebrorullet -= 1;
	
	return bot (`>>[🥈]Вы успешно открыли серебенную рулетку!\n>>[🎁]Ваш выигрышь: ${utils.sp(balance)}$,${utils.sp(rating)}корон и ${utils.sp(exp)}`);

});


cmd.hear(/^(?:бронз)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.bronserullet) return bot(`🥉У вас нет бронзовой рулетки!`);

	const balance = utils.random(30000);
	const exp = utils.random(5);

	message.user.balance += balance;
	message.user.exp += exp;
	message.user.bronserullet -= 1;
	
	return bot (`>>[🥉]Вы успешно открыли бронз. рулетку!\n>>[🎁]Ваш выигрышь: ${utils.sp(balance)}$ и ${utils.sp(exp)}`);

});

cmd.hear(/^(?:gcapt)$/i, async (message, bot) => {
	if(message.user.grank < 2) return bot(`💉Каптить можно с 2ранга!`);
	if(message.user.timers.capt)return bot(`💉Каптить 1раз в 5минут!`);

	setTimeout(() => {
		message.user.timers.capt = false;
	}, 300000);

	message.user.timers.capt = true;

	const capt = utils.random(5);

	kazna.gterra += capt;
	user.balance = kazna.gterra;
	return bot (`>>[💉]Капт пройден успешно!\n >>[🔫]Вы заработали: ${utils.sp(capt)} фрагов(тер)`);

});

cmd.hear(/^(?:bcapt)$/i, async (message, bot) => {
	if(message.user.brank < 2) return bot(`🚬Каптить можно с 2ранга!`);
	if(message.user.timers.capt)return bot(`🚬Каптить 1раз в 5минут!`);

	setTimeout(() => {
		message.user.timers.capt = false;
	}, 300000);

	message.user.timers.capt = true;

	const capt = utils.random(5);

	kazna.bterra += capt;
	user.balance = kazna.bterra;
	return bot (`>>[🚬]Капт пройден успешно!\n >>[🔫]Вы заработали: ${utils.sp(capt)} фрагов(тер)`);

});

cmd.hear(/^(?:развести)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
		if(kazna.kbalanc < 9999)return bot (`[💰]В казне недостаточно денег!`);
	if(!message.user.pizza) return bot(`🍕Вы не работаете развозчиком пиццы`);
	if(message.user.golod < 9)return bot(`[🍗]Вы голоден!Введите "еда"`);
	if(message.user.timers.pizza)return bot(`🍕Пиццу можно развозить 1раз в 5минут!`);

	setTimeout(() => {
		message.user.timers.pizza = false;
	}, 300000);

	message.user.timers.pizza = true;

	const balance = utils.random(5000);
	const pizza = utils.random(20);

	message.user.balance += balance;
	message.user.razvez += pizza;
	message.user.golod -= 10;
	kazna.kbalanc -=10000;
	user.balanc = kazna.kbalanc;
	
	return bot (`>>[🍕]Вы успешно развезли: ${utils.sp(pizza)} пицц!\n>>[💰]Ваша зарплата:${utils.sp(balance)}$`);

});

cmd.hear(/^(?:развозчик пиццы)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.pizza) return bot(`🍕Вы уже работаете на данной работе!`);
	message.user.pizza = 1;
	return bot (`>>[🍕]Вы успешно устроились на работу "Развочик пиццы"!\n[>>[💰]Что-бы начать работу введите "развести".`);

});

//questi
cmd.hear(/^(?:квесты 1)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.vipquest1) return bot(`👉🏻Вы уже выполнили данный квест!`);

	return bot (`\n[📗]Вы успешно приняли квест!
[📗]Для выполнения отработайте на работе. "работать"
[📗]Что-бы завершить квест введите "завершить квест 1"
[🎁]Награда: 10exp и 5.000$
`);
});

cmd.hear(/^(?:квесты 2)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.vipquest2) return bot(`👉🏻Вы уже выполнили данный квест!`);

	return bot (`\n[📗]Вы успешно приняли квест!
[📗]Для выполнения вам нужно развести 50 пицц! "развести" "развозчик пиццы"
[📗]Что-бы завершить квест введите "завершить квест 2"
[🎁]Награда: 15exp и 20.000$
`);
});

cmd.hear(/^(?:завершить квест 1)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.vipquest1) return bot(`👉🏻Вы уже выполнили данный квест!`);
	if(!message.user.quest11)return bot(`👉🏻Вы еще не отработали!`);
	if(message.user.quest11 == 1) {
	
	message.user.balance += 5000;
	message.user.exp += 10;
	message.user.vipquest1 = 1;
	message.user.questi.quest1 = 2;
	return bot (`[📗]Вы успешно завершили квест!`);
	}
	
});

cmd.hear(/^(?:завершить квест 2)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(message.user.vipquest2) return bot(`👉🏻Вы уже выполнили данный квест!`);
	if(!message.user.quest22)return bot(`👉🏻Вы еще не развезли 50пицц!`);
	if(message.user.quest22 == 1) {
	
	message.user.balance += 20000;
	message.user.exp += 15;
	message.user.vipquest2 = 1;
	message.user.questi.quest2 = 2;
	return bot (`[📗]Вы успешно завершили квест!`);
	}
	
});

//
cmd.hear(/^(?:грузы 2)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.daln) return bot(`👉🏻Вы не работаете Дальнобойщиком`);
	if(message.user.mats < 249) return bot(`👉🏻У вас нет 250материалов!`);
	if(message.user.timers.dln) return bot(`👉🏻Перевозить грузы можно 1раз в час!`);
	let prize = utils.pick([1, 2]);

	setTimeout(() => {
		message.user.timers.dln = false;
	}, 3600000);

	message.user.timers.dln = true;

	if(prize === 1)
	{
		message.user.bank += 2500;
		message.user.mats -= 250;
		return bot(`[⚙]Вы успешно перевезли 250материалов!Ваша плата поступила вам на банк.карту`);
	}
	
		if(prize === 2)
	{
		message.user.mats -= 250;
		return bot(`[⏰]Вы попали в аварию и потеряли груз!`);
	}
});

cmd.hear(/^(?:грузы 3)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.daln) return bot(`👉🏻Вы не работаете Дальнобойщиком`);
	if(message.user.mats < 199) return bot(`👉🏻У вас нет 200материалов!`);
	if(message.user.timers.dln) return bot(`👉🏻Перевозить грузы можно 1раз в час!`);
	let prize = utils.pick([1, 2]);

	setTimeout(() => {
		message.user.timers.dln = false;
	}, 3600000);

	message.user.timers.dln = true;

	if(prize === 1)
	{
		message.user.bank += 2000;
		message.user.mats -= 200;
		return bot(`[⚙]Вы успешно перевезли 200материалов!Ваша плата поступила вам на банк.карту`);
	}
	
		if(prize === 2)
	{
		message.user.mats -= 200;
		return bot(`[⏰]Вы попали в аварию и потеряли груз!`);
	}
});

cmd.hear(/^(?:грузы 4)$/i, async (message, bot) => {
	message.user.ybralcmd +=1;
	if(!message.user.daln) return bot(`👉🏻Вы не работаете Дальнобойщиком`);
	if(message.user.mats < 99) return bot(`👉🏻У вас нет 100материалов!`);
	if(message.user.timers.dln) return bot(`👉🏻Перевозить грузы можно 1раз в час!`);
	let prize = utils.pick([1, 2]);

	setTimeout(() => {
		message.user.timers.dln = false;
	}, 3600000);

	message.user.timers.dln = true;

	if(prize === 1)
	{
		message.user.bank += 1500;
		message.user.mats -= 100;
		return bot(`[⚙]Вы успешно перевезли 100материалов!Ваша плата поступила вам на банк.карту`);
	}
	
		if(prize === 2)
	{
		message.user.mats -= 100;
		return bot(`[⏰]Вы попали в аварию и потеряли груз!`);
	}
});


setInterval(() => {
	let fs = require("fs");
	fs.writeFileSync("./settings.json", JSON.stringify(settings, null, "\t"));
	fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t"));
}, 1000)


setInterval(() => {
let chatid = 0;
let fs = require("fs");
for (key in base)
{
	if(chats.users[key].isBanned)
	{
		chats.users[key].isBanned == false
		chats.users[key].reason == ""
	}
}}, 604800000);

function Manager(access_token) {
	vk.longpoll.on('message', async function(message) {
	let chatid = message.chat;
	if(message.hasFlag('outbox')) return;
		vk.longpoll.start();
	if(!chats[message.chatId]) {
		chats[message.chatId] = {
			activate: false,
			name: 0,
			flood: 0,
			rules: "Бла-бла-бла, историк херов",
			title: "",
			banned: [],
			users: {}
		}
	}
	if(!chats[message.chatId].users[message.user])
	{
		chats[message.chatId].users[message.user] = {
			warns: 0,
			isBanned: false,
			permanently: false,
			group: 0
		}
	}
	if(!settings[message.chatId]) settings[message.chatId] = {};
	if(!chatslist.includes(message.chatId)) chatslist.push(message.chatId);
	if(!base[message.user]) {
		await vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			base[message.user] = {
				prefix: `${res[0].first_name}`
			}
		})
	};
	setInterval(() => {
		chatslist.map(chatid => {
			vk.api.call("messages.getChat", {chat_id: chatid})
			.then((res) => {
				if(res.title !== settings[message.chatid].title) {
				vk.api.call("messages.send", {chat_id: chatid, message: ``})
				vk.api.call("messages.editChat", {chat_id: chatid, title: chats[message.chatid].title})}
			})
		})
	}, 15000);
	var args = message.text.split(" ");
})}

cmd.hear(/^(?:репорт|реп|rep|жалоба|report)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`команда работает только в ЛС.`);

	vk.api.messages.send({ user_id: 299908038, forward_messages: message.id, message: `<<☐>> Чтобы отправить ответ пользователю, вы должны написать - Ответ ${message.user.uid} (Ваш ответ) <<☐>>` }).then(() => {
		return bot(`[💬]Ожидайте ответа от администрации!`);
	}).catch((err) => {
		return message.send(`Error #1554`);
	});
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
			if(message.user.alvl < 5) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: ` [💬]Ответ от администрации: "${message.args[2]}"` });
});
});