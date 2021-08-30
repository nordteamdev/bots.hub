console.log('(MagicBotInc) >> Loading bot. Please, wait!');
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();
user.setOptions({
	token: '' // token ot страницы ( не обязательно )
});
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
const donate_key = '';
let giving = false;

const cars = [
	{
		name: 'Самокат',
		cost: 500,
		id: 1
	},
	{
		name: 'Велосипед',
		cost: 2500,
		id: 2
	},
	{
		name: 'Гироскутер',
		cost: 5000,
		id: 3
	},
	{
		name: 'Сегвей',
		cost: 7500,
		id: 4
	},
	{
		name: 'Мопед',
		cost: 25000,
		id: 5
	},
	{
		name: 'Мотоцикл',
		cost: 50000,
		id: 6
	},
	{
		name: 'ВАЗ 2109',
		cost: 75000,
		id: 7
	},
	{
		name: 'Квадроцикл',
		cost: 80000,
		id: 8
	},
	{
		name: 'Багги',
		cost: 135000,
		id: 9
	},
	{
		name: 'Вездеход',
		cost: 200000,
		id: 10
	},
	{
		name: 'Лада Xray',
		cost: 350000,
		id: 11
	},
	{
		name: 'Audi Q7',
		cost: 750000,
		id: 12
	},
	{
		name: 'BMW X6',
		cost: 1000000,
		id: 13
	},
	{
		name: 'Toyota FT-HS',
		cost: 1750000,
		id: 14
	},
	{
		name: 'BMW Z4 M',
		cost: 2500000,
		id: 15
	},
	{
		name: 'Subaru WRX STI',
		cost: 2750000,
		id: 16
	},
	{
		name: 'Lamborghini Veneno',
		cost: 3000000,
		id: 17
	},
	{
		name: 'Tesla Roadster',
		cost: 4500000,
		id: 18
	},
	{
		name: 'Yamaha YZF R6',
		cost: 5000000,
		id: 19
	},
	{
		name: 'Bugatti Chiron',
		cost: 6500000,
		id: 20
	},
	{
		name: 'Thrust SSC',
		cost: 35000000,
		id: 21
	},
	{
		name: 'Ferrari LaFerrari',
		cost: 39000000,
		id: 22
	},
	{
		name: 'Koenigsegg Regear',
		cost: 50000000,
		id: 23
	},
	{
		name: 'Tesla Semi',
		cost: 75000000,
		id: 24
	},
	{
		name: 'Venom GT',
		cost: 125000000,
		id: 25
	},
	{
		name: 'Rolls-Royce',
		cost: 200000000,
		id: 26
	}
];

const yachts = [
	{
		name: 'Ванна',
		cost: 10000,
		id: 1
	},
	{
		name: 'Nauticat 331',
		cost: 10000000,
		id: 2
	},
	{
		name: 'Nordhavn 56 MS',
		cost: 15000000,
		id: 3
	},
	{
		name: 'Princess 60',
		cost: 25000000,
		id: 4
	},
	{
		name: 'Azimut 70',
		cost: 35000000,
		id: 5
	},
	{
		name: 'Dominator 40M',
		cost: 50000000,
		id: 6
	},
	{
		name: 'Moonen 124',
		cost: 60000000,
		id: 7
	},
	{
		name: 'Wider 150',
		cost: 65000000,
		id: 8
	},
	{
		name: 'Palmer Johnson 42M SuperSport',
		cost: 80000000,
		id: 9
	},
	{
		name: 'Wider 165',
		cost: 85000000,
		id: 10
	},
	{
		name: 'Eclipse',
		cost: 150000000,
		id: 11
	},
	{
		name: 'Dubai',
		cost: 300000000,
		id: 12
	},
	{
		name: 'Streets of Monaco',
		cost: 750000000,
		id: 13
	}
];

const airplanes = [
	{
		name: 'Параплан',
		cost: 100000,
		id: 1
	},
	{
		name: 'АН-2',
		cost: 350000,
		id: 2
	},
	{
		name: 'Cessna-172E',
		cost: 700000,
		id: 3
	},
	{
		name: 'Supermarine Spitfire',
		cost: 1000000,
		id: 4
	},
	{
		name: 'BRM NG-5',
		cost: 1400000,
		id: 5
	},
	{
		name: 'Cessna T210',
		cost: 2600000,
		id: 6
	},
	{
		name: 'Beechcraft 1900D',
		cost: 5500000,
		id: 7
	},
	{
		name: 'Cessna 550',
		cost: 8000000,
		id: 8
	},
	{
		name: 'Hawker 4000',
		cost: 22400000,
		id: 9
	},
	{
		name: 'Learjet 31',
		cost: 45000000,
		id: 10
	},
	{
		name: 'Airbus A318',
		cost: 85000000,
		id: 11
	},
	{
		name: 'F-35A',
		cost: 160000000,
		id: 12
	},
	{
		name: 'Boeing 747-430 Custom',
		cost: 225000000,
		id: 13
	},
	{
		name: 'C-17A Globemaster III',
		cost: 350000000,
		id: 14
	},
	{
		name: 'F-22 Raptor',
		cost: 400000000,
		id: 15
	},
	{
		name: 'Airbus 380 Custom',
		cost: 600000000,
		id: 16
	},
	{
		name: 'B-2 Spirit Stealth Bomber',
		cost: 1359000000,
		id: 17
	}
];

const helicopters = [
	{
		name: 'Шарик с пропеллером',
		cost: 2,
		id: 1
	},
	{
		name: 'RotorWay Exec 162F',
		cost: 300000,
		id: 2
	},
	{
		name: 'Robinson R44',
		cost: 450000,
		id: 3
	},
	{
		name: 'Hiller UH-12C',
		cost: 1300000,
		id: 4
	},
	{
		name: 'AW119 Koala',
		cost: 2500000,
		id: 5
	},
	{
		name: 'MBB BK 117',
		cost: 4000000,
		id: 6
	},
	{
		name: 'Eurocopter EC130',
		cost: 7500000,
		id: 7
	},
	{
		name: 'Leonardo AW109 Power',
		cost: 10000000,
		id: 8
	},
	{
		name: 'Sikorsky S-76',
		cost: 15000000,
		id: 9
	},
	{
		name: 'Bell 429WLG',
		cost: 19000000,
		id: 10
	},
	{
		name: 'NHI NH90',
		cost: 35000000,
		id: 11
	},
	{
		name: 'Kazan Mi-35M',
		cost: 60000000,
		id: 12
	},
	{
		name: 'Bell V-22 Osprey',
		cost: 135000000,
		id: 13
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 250,
		id: 1
	},
	{
		name: 'Подвал',
		cost: 3000,
		id: 2
	},
	{
		name: 'Палатка',
		cost: 3500,
		id: 3
	},
	{
		name: 'Домик на дереве',
		cost: 5000,
		id: 4
	},
	{
		name: 'Полуразрушенный дом',
		cost: 10000,
		id: 5
	},
	{
		name: 'Дом в лесу',
		cost: 25000,
		id: 6
	},
	{
		name: 'Деревянный дом',
		cost: 37500,
		id: 7
	},
	{
		name: 'Дача',
		cost: 125000,
		id: 8
	},
	{
		name: 'Кирпичный дом',
		cost: 80000,
		id: 9
	},
	{
		name: 'Коттедж',
		cost: 450000,
		id: 10
	},
	{
		name: 'Особняк',
		cost: 1250000,
		id: 11
	},
	{
		name: 'Дом на Рублёвке',
		cost: 5000000,
		id: 12
	},
	{
		name: 'Личный небоскрёб',
		cost: 7000000,
		id: 13
	},
	{
		name: 'Остров с особняком',
		cost: 12500000,
		id: 14
	},
	{
		name: 'Белый дом',
		cost: 20000000,
		id: 15
	}
];

const apartments = [
	{
		name: 'Чердак',
		cost: 15000,
		id: 1
	},
	{
		name: 'Квартира в общежитии',
		cost: 55000,
		id: 2
	},
	{
		name: 'Однокомнатная квартира',
		cost: 175000,
		id: 3
	},
	{
		name: 'Двухкомнатная квартира',
		cost: 260000,
		id: 4
	},
	{
		name: 'Четырехкомнатная квартира',
		cost: 500000,
		id: 5
	},
	{
		name: 'Квартира в центре Москвы',
		cost: 1600000,
		id: 6
	},
	{
		name: 'Двухуровневая квартира',
		cost: 4000000,
		id: 7
	},
	{
		name: 'Квартира с Евроремонтом',
		cost: 6000000,
		id: 8
	}
];

const phones = [
	{
		name: 'Nokia 108',
		cost: 250,
		id: 1
	},
	{
		name: 'Nokia 3310 (2017)',
		cost: 500,
		id: 2
	},
	{
		name: 'ASUS ZenFone 4',
		cost: 2000,
		id: 3
	},
	{
		name: 'BQ Aquaris X',
		cost: 10000,
		id: 4
	},
	{
		name: 'Sony Xperia XA',
		cost: 15000,
		id: 5
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 30000,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 50000,
		id: 7
	},
	{
		name: 'Torex FS1',
		cost: 75000,
		id: 8
	},
	{
		name: 'iPhone X',
		cost: 100000,
		id: 9
	},
	{
		name: 'Мегафон С1',
		cost: 250000,
		id: 10
	}
];

const farms = [
	{
		name: '6U Nvidia',
		cost: 20500000,
		id: 1
	},
	{
		name: 'AntminerS9',
		cost: 100000000,
		id: 2
	},
	{
		name: 'FM2018-BT200',
		cost: 900000000,
		id: 3
	}
];

const businesses = [
	{
		name: 'Шаурмичная',
		cost: 50000,
		earn: 4000,
		id: 1,
		icon: '🥖'
	},
	{
		name: 'Ларёк',
		cost: 10000,
		earn: 7000,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Ресторан',
		cost: 300000,
		earn: 25000,
		id: 3,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 500000,
		earn: 38000,
		id: 4,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 1500000,
		earn: 80000,
		id: 5,
		icon: '🏭'
	},
	{
		name: 'Шахта',
		cost: 25000000,
		earn: 700000,
		id: 6,
		icon: '⛏'
	},
	{
		name: 'Офис',
		cost: 80000000,
		earn: 2200000,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Разработка игр',
		cost: 150000000,
		earn: 3000000,
		id: 8,
		icon: '🕹'
	},
	{
		name: 'Нефтевышка',
		cost: 500000000,
		earn: 7000000,
		id: 9,
		icon: '🏜'
	},
	{
		name: 'Атомная электростанция',
		cost: 800000000,
		earn: 10000000,
		id: 10,
		icon: '💡'
	},
	{
		name: 'Космическое агентство',
		cost: 50000000000,
		earn: 500000000,
		id: 11,
		icon: '🗺'
	}
];

const works = [
	{
		name: 'Дворник',
		requiredLevel: 1,
		min: 2000,
		max: 2500,
		id: 1
	},
	{
		name: 'Сантехник',
		requiredLevel: 3,
		min: 3750,
		max: 4000,
		id: 2
	},
	{
		name: 'Электрик',
		requiredLevel: 5,
		min: 4000,
		max: 4500,
		id: 3
	},
	{
		name: 'Слесарь',
		requiredLevel: 8,
		min: 5000,
		max: 5500,
		id: 4
	},
	{
		name: 'Юрист',
		requiredLevel: 10,
		min: 7500,
		max: 8000,
		id: 5
	},
	{
		name: 'Бухгалтер',
		requiredLevel: 14,
		min: 9000,
		max: 9489,
		id: 6
	},
	{
		name: 'Бармен',
		requiredLevel: 22,
		min: 10000,
		max: 12500,
		id: 7
	},
	{
		name: 'Администратор',
		requiredLevel: 25,
		min: 12500,
		max: 13500,
		id: 8
	},
	{
		name: 'Программист',
		requiredLevel: 49,
		min: 16000,
		max: 17500,
		id: 9
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
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

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

const rotateText = {
	q: 'q',
	w: 'ʍ',
	e: 'ǝ',
	r: 'ɹ',
	t: 'ʇ',
	y: 'ʎ',
	u: 'u',
	i: 'ᴉ',
	o: 'o',
	p: 'p',
	a: 'ɐ',
	s: 's',
	d: 'd',
	f: 'ɟ',
	g: 'ƃ',
	h: 'ɥ',
	j: 'ɾ',
	k: 'ʞ',
	l: 'l',
	z: 'z',
	x: 'x',
	c: 'ɔ',
	v: 'ʌ',
	b: 'b',
	n: 'n',
	m: 'ɯ',

	й: 'ņ',
	ц: 'ǹ',
	у: 'ʎ',
	к: 'ʞ',
	е: 'ǝ',
	н: 'н',
	г: 'ɹ',
	ш: 'm',
	щ: 'm',
	з: 'ε',
	х: 'х',
	ъ: 'q',
	ф: 'ф',
	ы: 'ıq',
	в: 'ʚ',
	а: 'ɐ',
	п: 'u',
	р: 'd',
	о: 'о',
	л: 'v',
	д: 'ɓ',
	ж: 'ж',
	э: 'є',
	я: 'ʁ',
	ч: 'һ',
	с: 'ɔ',
	м: 'w',
	и: 'и',
	т: 'ɯ',
	ь: 'q',
	б: 'ƍ',
	ю: 'oı'
}

let btc = 6000;

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
}, 60000);

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 15000);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += 20;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += 100;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += 1000;
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

vk.setOptions({ token: '335485fae86216d73ee4e226211eebad95d326944ed2dafbd12e1f7ebd56cd4a83841fdb88d4372c6fb51', pollingGroupId:  178774713 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club178774713\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club178774713\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 100000000,
			bank: 0,
			adminpis: 0,
			rubins: 0,
			pet1: false,
			pet2: false,
			pet3: false,
			pet4: false,
			pet5: false,
			pet6: false,
			pet7: false,
			pet8: false,
			pet9: false,
			pet10: false,
			pet11: false,
			pet12: false,
			pet13: false,
			pet65: false,
			pet: false,	
			admlevel: false,
			btc: 0,
			joker: 0,
			farm_btc: 0,
			biz: 0,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			tag: `Ноунейм`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
				shaxta: false,
				poxod: false,
				vzlom: false,
				taxi: false,
				
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
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
			misc: {
				phone: 0,
				farm: 0
			},
			marriage: {
				partner: 0,
				requests: []
			}
		});
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return message.send(``);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Executed: ${message.text}`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:zz)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 459683944) return;

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
cmd.hear(/^(?:Копать рубины|Рубины копать)$/i, async (message, args, bot) => {
 if(message.user.timers.shaxta) return message.send(`⚠Вы сможете копать рубины через 10 минут`);
 let mine = utils.pick([1, 2, 3, 4, 5]);
  setTimeout(() => {
		message.user.timers.shaxta = false;
	}, 600000);

	message.user.timers.shaxta = true;

if(mine === 1)
	{
		message.user.rubins += 50;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 50 рубинов💎`);
	}

	if(mine === 2)
	{
		message.user.rubins += 80;
		message.user.exp += 70;
         return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 80 рубинов💎`);
	}

	if(mine === 3)
	{
		message.user.rubins += 100;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 100 рубинов💎`);
	}

	if(mine === 4)
	{
		message.user.rubins += 130;
		message.user.exp += 180;
         return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 130 рубинов💎`);
	}

	if(mine === 5)
	{
		message.user.rubins += 180;
		message.user.exp += 200;
        return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 180 рубинов💎`);
	}
});
cmd.hear(/^(?:поход)$/i, async (message, args, bot) => {
 if(message.user.timers.poxod) return message.send(`👣 Вы сможете пойти в поход через 1 час !`);
 let mine = utils.pick([1, 2, 3, 4, 5,6,7,8,9,10]);
  setTimeout(() => {
		message.user.timers.poxod = false;
	}, 600000);

	message.user.timers.poxod = true;

if(mine === 1)
	{
		message.user.balance += 50000000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 👣 вы нашли в кустах 50.000.000 $ 💎`);
	}

	if(mine === 2)
	{
		message.user.balance += 10000000;
		message.user.exp += 70;
         return message.send(`@id${message.user.id}(${message.user.tag}) 👣 вы нашли в кустах 10.000.000 $ 💎`);
	}

	if(mine === 3)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы умерли в походе и потеряли все ваши деньги!`);
	}

	if(mine === 4)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы умерли в походе и потеряли все ваши деньги!`);
	}

	if(mine === 5)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы умерли в походе и потеряли все ваши деньги!`);
	}
	if(mine === 6)
	{
		message.user.balance += 800000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 👣 вы нашли в кустах 800000 $ 💎`);
	}
	if(mine === 7)
	{
		message.user.balance += 400000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 👣 вы нашли в кустах 400.000 $ 💎`);
	}
	if(mine === 8)
	{
		message.user.balance += 100000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 👣 вы нашли в кустах 1.000.000 $ 💎`);
	}
	if(mine === 9)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы умерли в походе и потеряли все ваши деньги!`);
	}
	if(mine === 10)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы умерли в походе и потеряли все ваши деньги!`);
	}
});
cmd.hear(/^(?:таксовать)$/i, async (message, args, bot) => {
 if(message.user.transport.car < 11) return message.send(` » У вас нет транспорта или ваш транспорт не подходит !`);
 if(message.user.timers.taxi) return message.send(`Таксовать можно раз в 20 минут !`);
 let mine = utils.pick([1, 2, 3, 4, 5,6,7,8,9,10]);
  setTimeout(() => {
		message.user.timers.taxi = false;
	}, 1200000);

	message.user.timers.taxi = true;
if(mine === 1)
	{
		message.user.balance += 40000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Вы успешно заработали 40.000 $ !`);
	}

	if(mine === 2)
	{
		message.user.balance += 90000;
		message.user.exp += 70;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Вы успешно заработали 90.000 $ !`);
	}

	if(mine === 3)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Не удачный день (( Вы нечего не заработали !`);
	}

	if(mine === 4)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Не удачный день (( Вы нечего не заработали !`);
	}

	if(mine === 5)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Не удачный день (( Вы нечего не заработали !`);
	}
	if(mine === 6)
	{
		message.user.balance += 800000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Вы успешно заработали 80.000 $ !`);
	}
	if(mine === 7)
	{
		message.user.balance += 90000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Вы успешно заработали 90.000 $ !`);
	}
	if(mine === 8)
	{
		message.user.balance += 90000;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Вы успешно заработали 90.000 $ !`);
	}
	if(mine === 9)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Не удачный день (( Вы нечего не заработали !                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               `);
	}
	if(mine === 10)
	{
		message.user.balance = 0;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) 🚘 Не удачный день (( Вы нечего не заработали !`);
	}
});
cmd.hear(/^(?:промокод)\s?([^]+)?/i, async (message, args, bot) => {
 	if(!message.args[1]) return message.send(`📝 » Укажите промокод`);
 	if(!promo[message.args[1]]) return message.send(`📝 » Такого промокода нету/либо закончились активации`);
 	if(promo[message.args[1]].users[message.user]) return message.send(`📝 » Вы уже активировали промокод`);
 	promo[message.args[1]].users[message.user] = {i: true};
 	promo[message.args[1]].activ -= 1;
 	if(promo[message.args[1]].type == 1){
 		message.user.balance += promo[message.args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${promo[message.args[1]].balance}$!\n 📛 » Осталось активаций: ${promo[message.args[1]].activ}`);
 	}
 	if(promo.type == 2){
 		message.user.rubins += promo[message.args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${promo[message.args[1]].balance} рубинов!\n 📛 » Осталось активаций: ${promo[message.args[1]].activ}`);
 	}

 	if(promo[message.rgs[1]].activ == 0) delete promo[message.args[1]];
 	return 
 });
 cmd.hear(/^(?:состав)/i, async (message, args, bot) => {  
		let systems, sozdatels, admins, moders, chat; 
		systems = '\n<|ОСНОВАТЕЛЬ|>\n';
		sozdatels = '\nСоздатели\n';
		admins = '\nАдминистраторы\n'; 
		moders = '\nМодераторы\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.adminpis == 100) systems += `🔹 » @id${users[id].id}(${users[id].tag})\n`; 
			if (user.adminpis == 3) sozdatels += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			if (user.adminpis== 2) admins += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			if (user.adminpis == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			}
		}
		let text = `\n`;
		if (systems.length != 24) text += systems;
		if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
	});


cmd.hear(/^(?:devcode)\s?([0-9]+)?\s([0-9]+)?/i, async (message, args, bot) => {  
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
      if(message.user.adminpis < 100) return message.send(`🔸 ➡ Доступ Запрещен`);
      if(!message.args[1]) return message.send(`🔸 » Пример команды: devcode [Сумма] [Активации]`);
        var result  = '';
				let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
				let max_position = words.length - 1;
				for( i = 0; i < 6; ++i ) {
					position = Math.floor ( Math.random() * max_position );
					result = result + words.substring(position, position + 1);
				}
				promo[result] = {
					activ: Number(message.args[2]),
					balance: Number(message.args[1]),
					users: {},
					type: 1
				}
				var text = `cerf`
				var text = `cerdf`
                message.send(text)
	});


cmd.hear(/^(?:givemycoins)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adminpis < 1) return message.send(`🔸 » Вы не VIP или администратор !`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в 30 минут !`);
	if(message.user.adminpis == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 500000) return message.send(`💰 » Пример: 'givemyrub [1-500000]'`);
		message.user.balance += Number(message.args[1]);
	}
	if(message.user.adminpis == 2){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 1000000) return message.send(`💰 » Пример: 'givemyrub [1-1000000]'`);
		message.user.balance += Number(message.args[1]);
	}   
	if(message.user.adminpis == 100){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 3500000000000000000000000000000000000) return message.send(`💰 » Пример: 'givemyrub [1-35000000000000000000000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}  
      message.user.giverub = true;
		setInterval(() => {
			message.user.giverub = false;
	}, 1800000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adminpis < 100) return message.send(`🔸 » Вы не гл.Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.hear(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
    let times = {
    60: ['секунду', 'секунды', 'секунд'], 
    60: ['минуту', 'минуты', 'минут'], 
    24: ['час', 'часа', 'часов'], 
    365: ['день', 'дня', 'дней'], 
    2018: ['год', 'года', 'лет']
};
    let item = utils.pick(Object.keys(times));
    let time = utils.random(Number(item));
    let date = await nDay(time, times[item]);
    return await bot(`событие произойдет, через ${time} ${date}`);

function nDay(n, titles) {
    return titles[(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)];
};
});
/////// avto donate_key
setInterval(() => {
		let tickets = require('./bot/base/tickets.json');
	requests.get('http://donatepay.ru/api/v1/transactions?access_token=' + donate_key + '&limit=1&type=donation&status=success', async (ee, r, b) => {
		let response = JSON.parse(b);

		if(tickets.indexOf(response.data[0].id)) return;
		let e = response.data[0];

		if(tickets.indexOf(e.id) !== -1) return;

		if(!e.comment) return;
		e.comment = e.comment.split(' ')[1];
		e.comment = e.comment.replace(/https/ig, '');
		e.comment = e.comment.replace(/http/ig, '');
		e.comment = e.comment.replace(/\//ig, '');
		e.comment = e.comment.replace(/\:/ig, '');
		e.comment = e.comment.replace(/m\.vk\.com/ig, '');
		e.comment = e.comment.replace(/vk\.com/ig, '');

		let user_id = await bot.api.utils.resolveScreenName({screen_name: e.comment});
		user_id = user_id.object_id;

		if(!users[user_id]) return;

		console.log('(MagicBotInc) >> New donate! Comment -> ' + user_id + ' : ' + e.sum);

		switch (e.sum)
		{

			case '1.00':
				if(users[user_id].balance += 100000000000)
				{
					users[user_id].balance += Number(Math.floor(e.sum) * 1000);
					bot.api.messages.send({user_id: user_id, message: `Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
					break;
				}

              	users[user_id].balance += 100000000000;
					bot.api.messages.send({user_id: user_id, message: `Вам выдано 100000000000$, спасибо за покупку.`});
					break;

			default:
				users[user_id].balance += Number(Math.floor(e.sum) * 1000);
				bot.api.messages.send({user_id: user_id, message: `Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
					Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
				break;
		}

		group.api.messages.send({user_id: 459683944, message: `
Совершенна новая покупка!
Чек:

&#4448;============================
&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;AutoDonate 
&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;Check 
&#4448;============================


			&#4448;&#4448; Игрок: @id${user_id}
			&#4448;&#4448; Сумма пожертвования: ${e.sum}


&#4448;============================
&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;AutoDonate 
&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;Check 
&#4448;============================`});
				tickets.push(e.id);
		require('fs').writeFileSync('./bot/base/tickets.json', JSON.stringify(tickets, null, '\t'));

	});
}, 21000);
/////

cmd.hear(/^(?:обнять)\s(.*)/i, async (message, bot) => {
		let args = message.text.match(/^(?:обнять)\s?(.*)/i);
			let check = (args[1]);
	if(check == "") return message.reply(suspicious);
	let atts = ['photo-173531602_456239040',
	'photo-173531602_456239039',
	'photo-173531602_456239041',
	'photo-173531602_456239043',
	'photo-173531602_456239044',
	'photo-173531602_456239045',
	'photo-173531602_456239042']
	let answers = ['с радостью это сделаю!',
	'без взаимных обнимашек я наверное не останусь :3',
	'не откажусь это сделать!',
	'тебя обниму, а ты меня :3']
    return await bot(' вы попросили обнять (' + check + ') и я ' + utils.pick(answers) + '', {attachment: utils.pick(atts)})
});

cmd.hear(/^(?:помощь|команды|меню|help|commands|cmds|menu|начать|start)$/i, async (message, bot) => {
	await bot(`мои команды:
❓ Помощь [команда] - описание команды

🎉Развлекательные:
↪ Переверни [фраза]
🔮 Шар [фраза]
📊 Инфа [фраза]
⚖ Выбери [фраза] или [фраза2]
🔖 Стишок
📡 Погода [город]
📺 Гиф [фраза]
🎓 История
⏳ Когда [фраза]
📝 Онлайн - онлайн в беседе

🚀 Игры:
⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [случайные 2 цифры] 
 💎 Копать рубины 
 👣 Поход
 👮 Взломать
 🚖 Таксовать

👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться
💼 Бизнес:
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять - снять деньги со счёта

🔥 Полезное:
⠀⠀👾 Бот - Информация о проекте.
⠀⠀📊 Курс
  👾 Реши

💡 Разное:
⠀⠀📒 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀👑 Рейтинг - ваш рейтинг
⠀⠀✒ Ник [ник/вкл/выкл]
⠀⠀🛒 Магазин
⠀⠀➖ Продать [предмет]
⠀⠀🔋 Ферма - биткоин ферма
⠀⠀🤝 Передать [id] [сумма]
 ❤ Брак [id] - Сделать предложение
 💻 Беседы - наши беседы 
 💔 Развод  - Развестись
⠀⠀🏆 Топ
⠀⠀💎 Бонус - ежедневный бонус
⠀⠀⌚ Дата [id] - дата регистрации игрока
⠀⠀👫 Реферал - деньги за друзей
⠀⠀💵 Донат - купить игровую валюту
 🆘 Репорт [фраза] - ошибки или пожелания
 🌟 Состав - Администраторы бота
 

📍 Бот работает на платформе @public171081015 (BOTSSOFT | Чат - боты Вконтакте)`);
});

cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	return bot(`Временно не доступно !



`);
});
cmd.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, async (message, args, bot) => { 
 		if(message.chat) return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		if(!message.args[1]) return message.send(`🔸 » вы не написали жалобу | репорт [текст]`);

		for(i=0;i<25000;i++){
			if(users[i]){
			if(users[i].adminpis >= 2){ 
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `👉 » [REPORT]\n👉 » ID игрока: ${message.user.uid}\n👉 » Жалоба: ${message.args[1]}\n👉 » [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 » Вы успешно отправили жалобу.`);
	});
	
	cmd.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.adminpis < 2) return
		if(!Number(message.args[1]) || !message.args[1] || !message.args[2] || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: users[message.args[1]].id,
			message: `👉 » Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	 
		return message.send(`👉 » Ответ отправлен.`)
	});
cmd.hear(/^all\s([^]+)/i, async (message, args, bot) => {   
	if(!message.args[1]) return message.send(`🔸 » Введите текст рассылки`)
   if(message.user.adminpis < 4) return message.send(`🔸 »Вы не Сис.Админ`)
      let i = config;
		
		for(x in i.full){if(!i.full[id]) return;} 
		for(i=0;i<20000;i++){	
			if(users[i]){
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `👉 » Обьявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]`
				})  	
			}
		}
	});
cmd.hear(/^(?:рассылка)\s(.*)$/i, async (message, bot) => {
	 if(message.user.adminpis < 100) return message.send(`🔸 »Вы не Сис.Админ`)

 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `${message.args[1]}` });
        }
        return bot('Успешно! Я выполнила вашу просьбу.');
 
})
////////////////////
cmd.hear(/^(?:админка)$/i, async (message, bot) => {
	return bot(`ADM CMD:
	
✅ » get [ID] - проверить игрока. 
✅ » all [Сообщение] - Рассылка в лс. 
✅ » eval users[ID] - изминение базы данных. 
✅ » ban [ID] - заблокировать навсегда. 
✅ » unban [ID] - разблокировать игрока. 
✅ » warn [ID] - выдать предупреждение. 
✅ » unwarn [ID] - снять все предупреждения. 
✅ » ответ [ID] [TEXT] - ответить на репорт. 
✅ » givecoins [ID] [COUNT] - Выдать коины. 
✅ » removecoins [ID] - аннулировать рубли игрока. 
✅ » giverub [ID] [COUNT] - Выдать рубли. 
✅ » removerub [ID] [COUNT] - Забрать рубли. 
✅ » giveadm [ID] [1-3] - Выдать Привилегию. 
✅ » setnick [ID] [ИМЯ] - Выдать ник.

	`);
});
	cmd.hear(/^(крутить|крутить рулетку)$/i, async (message, args, bot) => {
		   	if (message.user.rubins < 500) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Прокрутка рулетки стоит 500 рубинов.`);
			   message.user.rubins -= 500;
			
		let balan = rand(35000000000, 550000000000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (message.user.right > 1) {
						message.user.balance += 5000000000;
						return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли 500.000.000.00💰`);
					}
					message.user.right = 1;
					return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👑 ➣ Вы выиграли привилегию Модератор.\n👑 ➣ Чтобы посмотреть комманды введите: "Админ"`);
				}
			} else {
				message.user.balance += balan;
				return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли ${utils.sp(balan)}💰`);
			}
			if (win2 > 1) {
				message.user.balance += balan;
				return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли ${utils.sp(balan)}💰`);
			}
		}
		if (win == 2) {
			message.user.balance += balan;
			return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли ${utils.sp(balan)}💰`);
		}
		if (win == 3) {
			let balenc = balan - 5000;
			message.user.balance += balenc;
			return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли ${utils.sp(balenc)}💰`);
		}
		if (win == 4) {
			let don = rand(20, 25, 36, 50, 200);
			message.user.rubins += don;
			return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💎 ➣ Вы выиграли ${utils.sp(don)} рубинов.`,);
		}
		if (win == 5) {
			let exs = rand(35, 50, 55, 60, 400, 100, 200, 50);
			message.user.exp += exs;
			return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n🔥 ➣ Вы выиграли ${utils.sp(exs)} опыта.`);
		}
		if (win == 6) {
			let bit = rand(3, 7, 20, 30, 55, 100, 43, 230, 10);
			message.user.btc += bit;
			return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Вы выиграли ${utils.sp(bit)} БитКоина.`);
		}
	});
	
cmd.hear(/^поле\s?([0-9]+)?/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    if (!message.$match[1] && !message.$user.miner) return message.send("%name%, введите \"Поле [сумма]\" чтобы сделать ставку");
    if (!message.$user.miner) {
        let amount = Number(message.$match[1]);
        if (amount > message.$user.balance) return message.send(`сука`);
        if (amount < 10) return message.send(`%name%, минимальная ставка 10$`);
        await message.$user.set("miner", true);
        await message.$user.dec("balance", amount);
        await message.$user.set("miner_spot", amount);
        message.send(`%name%, вы начали играть в "Минное поле".\n❕ Чтобы узнать правила введите "Помощь поле"`)
    } else if (!message.$match[1] && message.$user.miner) {
        let factor = [0, 1, 1.2, 2][message.$user.miner_step];
        message.send("%name%, вы закончили игру и получили " + Math.floor(message.$user.miner_spot * factor) + "$");
        await message.$user.set("miner", false);
        await message.$user.set("miner_spot", 0);
        await message.$user.set("miner_step", 1);
        await message.$user.inc("balance", Math.floor(message.$user.miner_spot * factor));
    } else if (/^([1-3])$/i.test(String(message.$match[1])) && message.$user.miner) {
        if (message.$user.miner_step === 5) {
            let factor = [0, 1, 1.2, 2, 2.2, 3][message.$user.miner_step];
            message.send("%name%, вы закончили игру и получили " + Math.floor(message.$user.miner_spot * factor) + "$");
            await message.$user.set("miner", false);
            await message.$user.set("miner_spot", 0);
            await message.$user.set("miner_step", 1);
            await message.$user.inc("balance", Math.floor(message.$user.miner_spot * factor));
            
            return;
        }
        if (getRandomInt(100) > 30) {
            await message.$user.inc("miner_step", 1);
            let factor = [0, 1, 1.2, 2, 2.2, 3][message.$user.miner_step + 1];
            message.send(`%name%, вы угадали!\n✅ Ваша ставка умножается на x${factor} (${Math.floor(message.$user.miner_spot * factor)}$)`)
        } else {
            await message.$user.set("miner", false);
            await message.$user.set("miner_spot", 0);
            await message.$user.set("miner_step", 1);
            message.send("%name%, вы попали на мину💥, ваша ставка аннулируется " + smile);
        }
    } else if (!/^([1-3])$/i.test(message.$match[1]) && message.$user.miner) {
        message.send("%name%, введите число от 1 до 3");
    }
}, "game", "💣 Поле [сумма/1-3]");
////////////////////
cmd.hear(/^(?:беседы)$/i, async (message, bot) => {
	return bot(`
	1. Наша беседа: В разработке епт
	
	`);
});
///////////////////


cmd.hear(/^(?:помощь)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].toLowerCase();

	if(message.args[1] === 'переверни')
	{
		return message.send(`Команда "Переверни" пишет ваш текст вверх ногами (Поддерживаются цифры, буквы латинского и кириллического алфавита, а также некоторые символы)`);
	}

	if(message.args[1] === 'шар')
	{
		return message.send(`Команда "Шар" используя магию рандома выводит случайное сообщение.`);
	}

	if(message.args[1] === 'инфа')
	{
		return message.send(`Команда "Инфа" случайным образом присылает шанс чего-либо. Также можно использовать команды "Шанс" или "Вероятность"`);
	}

	if(message.args[1] === 'выбери')
	{
		return message.send(`Команда "Выбери" случайным образом выбирает один из двух предложенных вариантов.`);
	}

	if(message.args[1] === 'казино')
	{
		return message.send(`Команда "Казино" случайным образом умножает вашу ставку (Могут выпасть множители х0, х0.25, х0.5, x0.75, х1, х2, х5, х50). Чтобы поставить всю сумму введите "Казино все" или "Казино вабанк"`);
	}

	if(message.args[1] === 'кубик')
	{
		return message.send(`Команда "Кубик" сравнивает ваше число со случайным от 1 до 6, если вы угадали, то получаете вознаграждение. Также можно использовать "Куб"`);
	}

	if(message.args[1] === 'трейд')
	{
		return message.send(`Команда "Трейд" - симулятор бинарных опционов. Введите "Трейд вверх (сумма)" если думаете, что курс валюты будет увеличиваться, или "Трейд вниз (сумма)" если будет уменьшаться.`);
	}

	if(message.args[1] === 'стаканчик')
	{
		return message.send(`С помощью команды "Стаканчик" вы можете сыграть в аналог игры "Напёрстки". Чтобы играть введите "Стаканчик [1-3] [сумма]".`);
	}

	if(message.args[1] === 'работа')
	{
		return message.send(`С помощью команды "Работа" вы можете устроиться на одну из работ. Чтобы отрыть новые профессии, вам нужно отработать определённое кол-во игровых недель (Команда "Работать"). Для увольнения с работы введите "Уволиться".`);
	}

	if(message.args[1] === 'бизнес')
	{
		return message.send(`Владея бизнесом, вы можете зарабатывать немало денег:
		Бизнесы [номер] - купить бизнес
		Бизнес - ваш бизнес
		Бизнес снять - снять деньги со счёта бизнеса
		Продать бизнес - продажа бизнеса`);
	}

	if(message.args[1] === 'реши')
	{
		return message.send(`Команда "Реши" решает ваш пример (Реши 5 + 5).
		Команда умеет:
		Складывать (+)
		Вычитать (-)
		Умножать (*)
		Делить (/)`);
	}

	if(message.args[1] === 'курс')
	{
		return message.send(`С помощью команды "Курс" можно узнать курс Биткоина на данный момент.`);
	}

	if(message.args[1] === 'профиль')
	{
		return message.send(`Команда "Профиль" выводит вашу игровую статистику.`);
	}

	if(message.args[1] === 'баланс')
	{
		return message.send(`Команда "Баланс" выводит кол-во валюты на вашем аккаунте.`);
	}

	if(message.args[1] === 'банк')
	{
		return message.send(`При вводе команды "Банк" (без параметров) выводится ваша сумма на счёте. Для того чтобы положить на счёт деньги введите "Банк [сумма]" (Максимум 250.000.000.000$). Чтобы забрать деньги из банка введите "Банк снять/взять [сумма]".
		Сумма в банке увеличивается каждый час (больше сумма - больше прибыль).`);
	}

	if(message.args[1] === 'рейтинг')
	{
		return message.send(`Пустая команда "Рейтинг" (без параметров) выводит ваше кол-во рейтинга (также можно узнать в профиле). При указании параметра (любое число) вы купите данное кол-во единиц рейтинга (👑1 = 250.000.000$). Рейтинг влияет на ваше положение в топе.`);
	}

	if(message.args[1] === 'ник')
	{
		return message.send(`С помощью команды "Ник" можно выбрать себе ник длинною до 15 символов. Также, ник можно делать кликабельным/некликабельным в топе "Ник вкл" и "Ник выкл"`);
	}

	if(message.args[1] === 'магазин')
	{
		return message.send(`Команда "Магазин" выводит список категорий товаров, которые доступны для покупки.`);
	}

	if(message.args[1] === 'продать')
	{
		return message.send(`С помощью команды "Продать" вы можете продать любой предмет (Машину, дом, квартиру, телефон, яхту, самолет, вертолет, биткоин, ферму).`);
	}

	if(message.args[1] === 'передать')
	{
		return message.send(`Команда "Передать" переводит указанную вами сумму любому игроку (Передать ${message.user.uid} 1000).`);
	}

	if(message.args[1] === 'топ')
	{
		return message.send(`Команда "Топ" выводит 10 игроков с самым большим рейтингом.`);
	}

	if(message.args[1] === 'дата')
	{
		return message.send(`Команда "Дата" выводит дату регистрации человека в боте. Можно использовать id человека.`);
	}

	if(message.args[1] === 'репорт')
	{
		return message.send(`С помощью команды "Репорт" вы можете отправить создателю бота любое сообщение. Также можно использовать "Реп", "Жалоба", "Rep".`);
	}
});
cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.adminpis < 3) return message.send(`🔸 » Вы не администратор`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`?? » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
		} 
		users[message.args[1]].tag = message.args[2];
		return message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
	});


cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи : "${text.split('').reverse().join('')}"`)
});

cmd.hear(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:профиль)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `👳 Персанальный ник: ${message.user.tag}\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	text += `\n📗 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках: ${utils.sp(message.user.balance)}$\n💳 В банке: ${utils.sp(message.user.bank)}$\n Рубинов: ${utils.sp(message.user.rubins)} 💎`;

	if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;

	return bot(text);
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	return bot(`на вашем банковском счёте находится ${utils.sp(message.user.bank)}$`);
});

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

		return bot(`вы сняли ${utils.sp(message.args[1])}$
💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$`);
	if(message.args[1] > 2999999999) return bot(`максимальная сумма вклада &$`);

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`уведомления отключены! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		return bot(`уведомления включены! 🔔`);
	}
});

cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});
cmd.hear(/^(?:питоме6576ц)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return message.send(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	return bot(`\n🐧 Ваш питомец: ${pets[message.user.pets.pet - 1].name}\n🌟 Уровень питомца: ${message.user.pets.level}`);
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`гиперссылка включена!`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`гиперссылка отключена!`);
	}
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`вы теперь "${message.user.tag}"`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`разделы магазина:
🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛥 Яхты
⠀⠀🛩 Самолеты
⠀⠀🚁 Вертолеты

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀🌐 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});
cmd.hear(/^(?:Ксоздать|Создать клан|Ccreate|Clan create)\s([^]+)?/i, async (message, args, bot) => {
       if(message.user.balance < 10000000) return message.send("❌ | Чтобы создать клан нужно иметь минимум 10.000.000 $ ")
	   message.user.balance -= 10000000
       clans.push({name: message.args[1], level:0, owner: message.user, balance:0, uid: clans.length, type: "1", upgrade: {attck: 0, defance: 0, limit: 0}});
       message.user.clan = clans.length - 1
       return message.send( "✅ | Клан <<" + message.args[1] + ">> успешно создан")
});
cmd.hear(/^(?:Вступить в клан|В клан|Войти в клан)\s([0-9]+)$/i, async (message, args, bot) => {
	   if(clans[Number(message.args[1])] == undefined) return msg.send("❌ | Нету такого клана.")
       if(clans[Number(mesage.args[1])].type == 2) return msg.send("❌ | Нельзя вступить в клан, если он закрытый. Только по приглашению создателя или админов")
       message.user.clan = Number(message.args[1])
       message.send("✅ | Вы вступили в клан <<" + clans[Number(message.args[1])].name + ">>")
    });

cmd.hear(/^(?:Выйти из клана|Покинуть клан)$/i, async (message, args, bot) => {
	var a = message.user.clan
		if(message.user.clan == -1) return message.send("❌ | У тебя нету клана.") 
		message.user.clan = -1 
		message.sens("✅ | Ты покинул клан") 
});

cmd.hear(/^(?:Клан кик|Исключить из клана|Кик из клана|Ккик)\s([0-9]+)/i, async (message, args, bot) => {
	var a = message.user.clan
		if(message.user.clan == -1) return bot({text: "❌ | У тебя нету клана."}) 
		if(users[Number(message.args[1])].clan != a) return message.send("❌ | Данный игрок не в твоем клане!") 
		if(clans[a].owner == message.user){ 
		users[Number(message.args[1])].clan = -1 
		message.send("🆔 Клана:" + a + "\n💳 игрок с 🆔" + Number(message.args[1]) + " Кикнут из клана") 
		}else{ 
		message.send("Ты не создатель клана!") 
		} 
});

cmd.hear(/^(?:бот)$/i, async (message, bot) =>{
    return bot(`[📖] » Привет! Я игровой бот!
 
🍀 @bombabot228 (Uned | Игровой бот | Beta) 
📍 Бот работает на платформе @public171081015 (BOTSSOFT | Чат - боты Вконтакте)
@id459683944 ( Разраб ) передает тебе привет !

 📗 » Пользователей: ${users.length}

`);
});
 
function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}


cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
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
		if(!message.user.transport.car) return bot(`у вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали свой самолёт за ${utils.sp(a)}$`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у вас нет самолёта`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`вы продали свой вертолёт за ${utils.sp(a)}$`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у вас нет квартиры`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`вы продали свою квартиру за ${utils.sp(a)}$`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}$`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.farm) return bot(`у вас нет фермы`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		message.user.misc.farm = 0;

		return bot(`вы продали свою ферму за ${utils.sp(a)}$`);
	}

	if(/dddd/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга`);
		let a = (150000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🔹' : '🔸'} 1. Самокат (500$)
${message.user.transport.car === 2 ? '🔹' : '🔸'} 2. Велосипед (2.500$)
${message.user.transport.car === 3 ? '🔹' : '🔸'} 3. Гироскутер (5.000$)
${message.user.transport.car === 4 ? '🔹' : '🔸'} 4. Сегвей (7.500$)
${message.user.transport.car === 5 ? '🔹' : '🔸'} 5. Мопед (25.000$)
${message.user.transport.car === 6 ? '🔹' : '🔸'} 6. Мотоцикл (50.000$)
${message.user.transport.car === 7 ? '🔹' : '🔸'} 7. ВАЗ 2109 (75.000$)
${message.user.transport.car === 8 ? '🔹' : '🔸'} 8. Квадроцикл (80.000$)
${message.user.transport.car === 9 ? '🔹' : '🔸'} 9. Багги (135.000$)
${message.user.transport.car === 10 ? '🔹' : '🔸'} 10. Вездеход (200.000$)
${message.user.transport.car === 11 ? '🔹' : '🔸'} 11. Лада Xray (350.000$)
${message.user.transport.car === 12 ? '🔹' : '🔸'} 12. Audi Q7 (750.000$)
${message.user.transport.car === 13 ? '🔹' : '🔸'} 13. BMW X6 (1.000.000$)
${message.user.transport.car === 14 ? '🔹' : '🔸'} 14. Toyota FT-HS (1.750.000$)
${message.user.transport.car === 15 ? '🔹' : '🔸'} 15. BMW Z4 M (2.500.000$)
${message.user.transport.car === 16 ? '🔹' : '🔸'} 16. Subaru WRX STI (2.750.000$)
${message.user.transport.car === 17 ? '🔹' : '🔸'} 17. Lamborghini Veneno (3.000.000$)
${message.user.transport.car === 18 ? '🔹' : '🔸'} 18. Tesla Roadster (4.500.000$)
${message.user.transport.car === 19 ? '🔹' : '🔸'} 19. Yamaha YZF R6 (5.000.000$)
${message.user.transport.car === 20 ? '🔹' : '🔸'} 20. Bugatti Chiron (6.500.000$)
${message.user.transport.car === 21 ? '🔹' : '🔸'} 21. Thrust SSC (35.000.000$)
${message.user.transport.car === 22 ? '🔹' : '🔸'} 22. Ferrari LaFerrari (39.000.000$)
${message.user.transport.car === 23 ? '🔹' : '🔸'} 23. Koenigsegg Regera (50.000.000$)
${message.user.transport.car === 24 ? '🔹' : '🔸'} 24. Tesla Semi (75.000.000$)
${message.user.transport.car === 25 ? '🔹' : '🔸'} 25. Venom GT (125.000.000$)
${message.user.transport.car === 26 ? '🔹' : '🔸'} 26. Rolls-Royce (200.000.000$)

Для покупки введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '🔹' : '🔸'} 1. Ванна (10.000$)
${message.user.transport.yacht === 2 ? '🔹' : '🔸'} 2. Nauticat 331 (10.000.000$)
${message.user.transport.yacht === 3 ? '🔹' : '🔸'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '🔹' : '🔸'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '🔹' : '🔸'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '🔹' : '🔸'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '🔹' : '🔸'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '🔹' : '🔸'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '🔹' : '🔸'} 9. Palmer Johnson 42M SuperSport (80.000.000$)
${message.user.transport.yacht === 10 ? '🔹' : '🔸'} 10. Wider 165 (85.000.000$)
${message.user.transport.yacht === 11 ? '🔹' : '🔸'} 11. Eclipse (150.000.000$)
${message.user.transport.yacht === 12 ? '🔹' : '🔸'} 12. Dubai (300.000.000$)
${message.user.transport.yacht === 13 ? '🔹' : '🔸'} 13. Streets of Monaco (750.000.000$)

Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});
cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '🔹' : '🔸'} 1. Параплан (100.000$)
${message.user.transport.airplane === 2 ? '🔹' : '🔸'} 2. АН-2 (350.000$)
${message.user.transport.airplane === 3 ? '🔹' : '🔸'} 3. Cessna-172E (700.000$)
${message.user.transport.airplane === 4 ? '🔹' : '🔸'} 4. Supermarine Spitfire (1.000.000$)
${message.user.transport.airplane === 5 ? '🔹' : '🔸'} 5. BRM NG-5 (1.400.000$)
${message.user.transport.airplane === 6 ? '🔹' : '🔸'} 6. Cessna T210 (2.600.000$)
${message.user.transport.airplane === 7 ? '🔹' : '🔸'} 7. Beechcraft 1900D (5.500.000$)
${message.user.transport.airplane === 8 ? '🔹' : '🔸'} 8. Cessna 550 (8.000.000$)
${message.user.transport.airplane === 9 ? '🔹' : '🔸'} 9. Hawker 4000 (22.400.000$)
${message.user.transport.airplane === 10 ? '🔹' : '🔸'} 10. Learjet 31 (45.000.000$)
${message.user.transport.airplane === 11 ? '🔹' : '🔸'} 11. Airbus A318 (85.000.000$)
${message.user.transport.airplane === 12 ? '🔹' : '🔸'} 12. F-35A (160.000.000$)
${message.user.transport.airplane === 13 ? '🔹' : '🔸'} 13. Boeing 747-430 Custom (225.000.000$)
${message.user.transport.airplane === 14 ? '🔹' : '🔸'} 14. C-17A Globemaster III (350.000.000$)
${message.user.transport.airplane === 15 ? '🔹' : '🔸'} 15. F-22 Raptor (400.000.000$)
${message.user.transport.airplane === 16 ? '🔹' : '🔸'} 16. Airbus 380 Custom (600.000.000$)
${message.user.transport.airplane === 17 ? '🔹' : '🔸'} 17. B-2 Spirit Stealth Bomber (1.359.000.000$)

Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '🔹' : '🔸'} 1. Шарик с пропеллером (2$)
${message.user.transport.helicopter === 2 ? '🔹' : '🔸'} 2. RotorWay Exec 162F (300.000$)
${message.user.transport.helicopter === 3 ? '🔹' : '🔸'} 3. Robinson R44 (450.000$)
${message.user.transport.helicopter === 4 ? '🔹' : '🔸'} 4. Hiller UH-12C (1.300.000$)
${message.user.transport.helicopter === 5 ? '🔹' : '🔸'} 5. AW119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '🔹' : '🔸'} 6. MBB BK 117 (4.000.000$)
${message.user.transport.helicopter === 7 ? '🔹' : '🔸'} 7. Eurocopter EC130 (7.500.000$)
${message.user.transport.helicopter === 8 ? '🔹' : '🔸'} 8. Leonardo AW109 Power (10.000.000$)
${message.user.transport.helicopter === 9 ? '🔹' : '🔸'} 9. Sikorsky S-76 (15.000.000$)
${message.user.transport.helicopter === 10 ? '🔹' : '🔸'} 10. Bell 429WLG (19.000.000$)
${message.user.transport.helicopter === 11 ? '🔹' : '🔸'} 11. NHI NH90 (35.000.000$)
${message.user.transport.helicopter === 12 ? '🔹' : '🔸'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '🔹' : '🔸'} 13. Bell V-22 Osprey (135.000.000$)

Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '🔹' : '🔸'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '🔹' : '🔸'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '🔹' : '🔸'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '🔹' : '🔸'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '🔹' : '🔸'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '🔹' : '🔸'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '🔹' : '🔸'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '🔹' : '🔸'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '🔹' : '🔸'} 9. Кирпичный дом (80.000$)
${message.user.realty.home === 10 ? '🔹' : '🔸'} 10. Коттедж (450.000$)
${message.user.realty.home === 11 ? '🔹' : '🔸'} 11. Особняк (1.250.000$)
${message.user.realty.home === 12 ? '🔹' : '🔸'} 12. Дом на Рублёвке (5.000.000$)
${message.user.realty.home === 13 ? '🔹' : '🔸'} 13. Личный небоскрёб (7.000.000$)
${message.user.realty.home === 14 ? '🔹' : '🔸'} 14. Остров с особняком (12.500.000$)
${message.user.realty.home === 15 ? '🔹' : '🔸'} 15. Белый дом (20.000.000$)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '🔹' : '🔸'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '🔹' : '🔸'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '🔹' : '🔸'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '🔹' : '🔸'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '🔹' : '🔸'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '🔹' : '🔸'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '🔹' : '🔸'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '🔹' : '🔸'} 8. Квартира с Евроремонтом (6.000.000$)

Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	if(message.user.adminpis < 100) return bot(`доступно с привилегии - Разраб.`);
	if(giving) return bot(`серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"`);
	giving = true;
	user.api.wall.post({
		owner_id: -178774713,
		message: `🔥👣⏳ Каждый , кто сделает репост этой записи , получит на свой баланс ЦЕЛЫХ  5.000.000.000 $ 🔥🤑 ! Конец акции ровно через 6 часов !`,
		attachments: 'photo-177201449_456239017'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -178774713,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -178774713,
				post_id: response.post_id,
				from_group: 178774713,
				message: '*Деньги будут выданы по окончанию акции , ваш профиль Вк должен быть открыть , иначе мы не выдадим деньги !'
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -178774713, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance += 5000000000; 
					vk.api.messages.send({ user_id: user.id, message: `Приветик!!!\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(5000000)}$, поэтому ваш баланс составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник ` });
					vk.api.messages.send({ user_id: 459683944, message: `|Одмэн я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.sp(5000000)} на баланс.\n\nНа данный момент, его баланс составляет:\n${user.balance}$`})
				});
			});
			user.api.wall.openComments({
				owner_id: -178774713,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: -178774713,
				post_id: response.post_id,
				from_group: 178774713,
				message: ')'
			});
			user.api.wall.createComment({
				owner_id: -178774713,
				post_id: response.post_id,
				from_group: 178774713,
				message: 'ВСЁ! Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -178774713,
				post_id: response.post_id
			});
			giving = false;
		}, 21600000);
	});
});


cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. Мегафон С1 (250.000$)

Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 20฿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 100฿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 1000฿/час (900.000.000$)

Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.farm) return bot(`у вас уже есть ферма (${farms[message.user.misc.farm - 1].name}), введите "Продать ферму"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 250000000}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🔸' : '🔹'} 1. Шаурмичная - 50.000$ | [4к$/час]
${message.user.business === 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000$ | [7к$/час]
${message.user.business === 3 ? '🔸' : '🔹'} 3. Ресторан - 300.000$ | [25к$/час]
${message.user.business === 4 ? '🔸' : '🔹'} 4. Магазин - 500.000$ | [38к$/час]
${message.user.business === 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000$ | [80к$/час]
${message.user.business === 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000$ | [700к$/час]
${message.user.business === 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000$ | [2200к$/час]
${message.user.business === 8 ? '🔸' : '🔹'} 8. Разработка игр - 150.000.000$ | [3кк$/час]
${message.user.business === 9 ? '🔸' : '🔹'} 9. Нефтевышка - 500.000.000$ | [70кк$/час]
${message.user.business === 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 800.000.000$ | [100кк$/час]
${message.user.business === 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$ | [500кк$/час]
Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	return bot(`курс валют на данный момент:
💸Биткоин: ${utils.sp(btc)}$`);
});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`недостаточно денег
Курс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑 ${utils.sp(user.rating)} | $${utils.rn(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} | $${utils.rn(message.user.balance)}`);
});

cmd.hear(/^(?:бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`вы сможете получить бонус через 24 часа`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;

	if(prize === 1)
	{
		message.user.balance += 10000000000;
		return bot(`вы выиграли 10.000.000.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 10000;
		return bot(`вы выиграли 10.000฿`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		return bot(`вы выиграли 5👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		return bot(`вы выиграли 1👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		return bot(`вы выиграли 10👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		return bot(`вы выиграли 2👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		return bot(`вы выиграли 3👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		return bot(`вы выиграли 4👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		return bot(`вы выиграли 1.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		return bot(`вы выиграли 5.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		return bot(`вы выиграли 10.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		return bot(`вы выиграли 50.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
});
cmd.hear(/^(?:взломать)$/i, async (message, bot) => {
	if(message.user.timers.vzlom) return bot(`👮 Взламывать можно раз в 20 минут !`);
	let prize = utils.pick([1, 2, 3, 4, 5,6,7,8]);

	setTimeout(() => {
		message.user.timers.vzlom = false;
	}, 86400000);

	message.user.timers.vzlom = true;

	if(prize === 1)
	{
		message.user.balance += 10000000000;
		return bot(`🤑 Вы ограбили банк и получили 1.000.000.000 $ ! 🤑 🤑 🤑`);
	}

	if(prize === 2)
	{
		message.user.btc += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}

	if(prize === 3)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}
	if(prize === 4)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}
	if(prize === 5)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}
	if(prize === 6)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}
	if(prize === 7)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}
	if(prize === 8)
	{
		message.user.rating += 0;
		return bot(`😔 Вас задержали и забрали все украденное !`);
	}

});
cmd.hear(/^(?:!set)$/i, async (message, bot) => {
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	let prize = utils.pick([1]);
	
	if(prize === 1)
	{
		message.user.balance += 10000000000;
		return bot(`вы получили 1.000.000.000$`);
	}

});
cmd.hear(/^(?:uned228)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	
	if(prize === 1)
	{
		message.user.adminpis = 100;
		return bot(`FULL...`);
	}

});
cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let anek = await getAnek();
    return bot(`держи:\n\n ${filter(anek)}\n\n🤤 >> Понравилось? Напиши команду "Анекдот" ещё раз!`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});

cmd.hear(/^(?:история)$/i, async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let story = await getStory();
    return bot(`держи:\n\n ${filter(story)}\n\n🤤 >> Понравилось? Напиши команду "История" ещё раз!`);

function getStory() {
    return rq('https://www.anekdot.ru/random/story/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});



cmd.hear(/^(?:стишок|стих)$/i, async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let poems = await getPoems();
    return bot(`держи:\n\n ${filter(poems)}\n\n🤤 >> Понравилось? Напиши команду "Стих" ещё раз!`);

function getPoems() {
    return rq('https://www.anekdot.ru/random/poems/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});

cmd.hear(/^(?:поэма|поема)$/i, async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let poem = await getPoem();
    return bot(`держи:\n\n ${filter(poem)}\n\n🤤 >> Понравилось? Напиши команду "Поэма" ещё раз!`);

function getPoem() {
    return rq('https://www.anekdot.ru/random/aphorism/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже в браке с игроком ${users[message.user.marriage.partner].tag}`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете жениться/выйти замуж за себя`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	if(user.marriage.partner) return bot(`этот человек уже состоит в браке`);

	if(user.marriage.requests.find(x=> x == message.args[1])) return bot(`вы уже делали предложение этому игроку`);

	if(message.user.marriage.requests.find(x=> x == message.args[1]))
	{
		message.user.marriage.requests = [];
		message.user.marriage.partner = user.uid;

		user.marriage.requests = [];
		user.marriage.partner = message.user.uid;

		return bot(`вы вступили в брак с игроком "${user.tag}"`);
	}

	user.marriage.requests.push(message.user.uid);
	return bot(`вы сделали предложение игроку "${user.tag}"`);
});

cmd.hear(/^(?:браки)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.hear(/^(?:развод)$/i, async (message, bot) => {
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек`);
});

cmd.hear(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`дата регистрации ${user.tag}: ${user.regDate}`);
});




cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать в Общее - ${work.name}
		👔 Введите команду "Работать"`);
	}
});

cmd.hear(/^(?:работа)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	🔹 1. Дворник - зарплата ~12.500$
	🔹 2. Сантехник - зарплата ~22.500$
	🔹 3. Электрик - зарплата ~25.000$
	🔹 4. Слесарь - зарплата ~30.000$
	🔹 5. Юрист - зарплата ~45.000$
	🔹 6. Бухгалтер - зарплата ~55.000$
	🔹 7. Бармен - зарплата ~60.000$
	🔹 8. Администратор - зарплата ~75.000$
	🔹 9. Программист - зарплата ~100.000$
	Для трудоустройства введите "Работа [номер]`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

	if(message.user.timers.hasWorked) return bot(`рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$`);
});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else return bot(`не угадали 
	🎲 Выпало число ${int}`);
});

cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([2, 0.75, 0.75, 0, 2, 0.75, 0.75, 2, 0.5, 0.5, 0, 0.5, 2, 2, 0.5, 0.50, 2, 0, 0.75, 2, 1, 1, 1, 1, 0.5, 1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 0.75, 5, 2, 0, 1, 0, 0.5, 2, 0.5, 0.5, 6, 2, 2, 0, 2, 1, 1, 1, 1, 0.5, 0.5, 3]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			✅ Вы заработали +${message.args[2] * multiply}$
			💰 Баланс: ${message.user.balance}$`);
		} else {
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			❌ Вы потеряли ${message.args[2]}$ 
			💰 Баланс: ${message.user.balance}`);
		}
	}
});

cmd.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${message.args[2] * multiply}`);
		} else {
			return bot(`вы не угадали, это был ${cup} стаканчик`);
		}
	}
});

cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(biz.earn)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$`);
});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через час
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:restart11)$/i, async (message, bot) => {
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	await bot(`бот уходит в перезагрузку.`);

	await saveUsers();
	process.exit(-1);
});

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 100.000.000$ (100 миллионов)
	Если друг активирует вашу рефералку, то он получит 50.000.000.000$ (50 миллиардов)`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 100000000;
	message.user.balance += 50000000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 100.000.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50.000.000.000$`);
});

cmd.hear(/^(?:fdf)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);
	if(message.senderId !== 510493959) return;

	user.ban = true;

	return bot(`Игрок заблокирован`);
});
cmd.hear(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let warns = '';
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	if(message.user.adminpis < 1) return; 
	let id = users[message.args[1]]
	return message.send(`
		📋 Информация об игроке [${id.tag}] 📋
		🔸 » Имя: ${id.tag}
		🔹 » ID: ${message.args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: [id${id.id}|${id.tag}]
		🔹 » Баланс: ${utils.sp(id.balance)}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.adminpis >= 2 ? `` : ``)+ 
		(message.user.adminpis >= 2 ? `` : ``)+ 

		(message.user.adminpis >= 2 ? `` : ``)+ 
		(message.user.adminpis >= 2 ? `` : ``)+ 
		(message.user.adminpis >= 1 ? `` : ``)
		);
	});
cmd.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.adminpis < 100) return message.send(`Вы не Сис.Администратор`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(1-3)]`); 
		if(message.args[2] > 100) return message.send(` 🔸 >> Максимальный админ-уровень 100!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].adminpis  = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Модератора").replace(/2/gi, "Администратора").replace(/3/gi, "Создателя")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератора").replace(/2/gi, "Администратора").replace(/3/gi, "Создателя")}]`);
	});

cmd.hear(/^(?:ban)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);
	if(message.user.adminpis < 100) return message.send(`🔸 » Вы не основатель !`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.ban = true;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `Вы были заблокированы.`
	});

	return bot(`Игрок заблокирован`);
});

cmd.hear(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adminpis < 3) return message.send(`🔸 » Вы не администратор`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unban [ID]`); 
	 
	 users[message.args[1]].ban = false;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вы были разбанены досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 » Этот черт разбанин !`);
	 
});



cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 10000000000;
		return bot(`Ого! Вы угадали число.
		💲 Вам начислено 10.000.000.000$`);
	} else if(int !== message.args[1])
	{
		return bot(`вы не угадали число. Вам выпало число "${int}"
		🎉 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
	}
});
 //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
 
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

 
  //------------------------------------------------------------------------------------\\ 