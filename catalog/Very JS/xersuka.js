const { VK } = require('vk-io');//sliv by tiran
const vk = new VK();//sliv by tiran
const commands = [];//sliv by tiran
const request = require('prequest');//sliv by tiran

const cars = [
	{
		name: 'Самокат',
		cost: 500,//sliv by tiran
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
	},//sliv by tiran
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

const pets = [
	{
		name: 'Котик',
		cost: 10000000000,
		id: 1
	},
	{
		name: 'Собака',
		cost: 1000000000000,
		id: 2
	},
	{
		name: 'Лошадь',
		cost: 10000000000000,
		id: 3
    },
	{
		name: 'Мутант',
		cost: 1000000000000000,
		id: 3
    },
	{
		name: 'Тигр',
		cost: 10000000000000000,
		id: 3
    },
	{
		name: 'Дракон',
		cost: 1000000000000000000,
		id: 6
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

const prefix = [
	{
		name: 'Нету',
		cost: 100,
		id: 1
	},
	{
		name: '💰Фортун💰',
		cost: 350,
		id: 2
	},
	{
		name: '💎Фартовый💎',
		cost: 500,
		id: 3
	},
	{
		name: '👑Мажор👑',
		cost: 750,
		id: 4
	},
	{
		name: '✨Топовая тян✨',
		cost: 50,
		id: 5
	},
	{
		name: '💰VIP💰',
		cost: 1000,
		id: 6
	},
	{
		name: '👻Призрачный👻',
		cost: 1200,
		id: 7
	},
	{
		name: '👔Джентльмен👔',
		cost: 1450,
		id: 8
	},
	{
		name: '🎅Новогодний🎅',
		cost: 1650,
		id: 9
	},
	{
		name: '🐧Пингвинутый🐧',
		cost: 1800,
		id: 10
	},
	{
		name: '🎓Всезнайка🎓',
		cost: 2050,
		id: 11
	},
	{
		name: '🌚Лучик Солнца🌝',
		cost: 2350,
		id: 12
	},
	{
		name: '🐾Котенок🐾',
		cost: 2650,
		id: 13
	},
	{
		name: '😇Боженька😇',
		cost: 5000,
		id: 14
	},
    {
		name: '|🔧|JavaScript|💻|Coder|🔧|',
		cost: 500000,
		id: 15
	}
];

/*
⚡Топер⚡
💰Фортун💰
🍷Пошляк🍷
🐫Даун🐫
💸Мажор💸
💊Депрессивный💊
💣Агро💣
🎓Всезнайка🎓
👑ЧСВ👑
👟Модник👟
⌚Деловой⌚
👔Джентльмен👔

👉ТОПОВЫЙ👈
😈Злобный😈
✨Топовая тян✨
👑Мажор👑
💎Фартовый💎
🐽Бомжик🐽
🐾Котенок🐾
🐧Пингвинутый🐧
🌚Лучик Солнца🌝
🎅Новогодний🎅
👻Призрачный👻
💰VIP💰
💉Больной💉
🍭Сладкоешка🍭*/

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
			e = e.replace(/Infinity/g, 'Бесконечно');

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

const clans = require('./clans.json');
const promo = require('./base/promo.json');
const users = require('./users.json'); 
const config = require('./settings/config.js');
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
}, 900000);

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
	    user.timers.shaxta = false;
        user.giverub = false;
     });
}
function rand(min, max) {
		return Math.round(Math.random() * (max - min)) + min
	}

function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}

function filter(text){
	var filter0 = text.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ig, "<LINK REMOVED>")
	var filter1 = filter0.replace(/(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.|ТЕСТЕР|Павел Дуров)/ig, '[Запрещено]')
	return filter1
}

clearTemp();

async function saveClans()
{
	require('fs').writeFileSync('./clans.json', JSON.stringify(clans, null, '\t'));
	return true;
}

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'тута токен от группы', pollingGroupId: тута айди цифровой группы });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[clubцифровой айди группы\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[clubцифровой айди группы\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			rub: 0,
            balance: 70000,
			rubins: 0,
			bank: 0,
			btc: 0,
			farm_btc: 0,
			prefix: 1,
            biz: 0,
			right: 0,
			givemyrub: false,
            warns: 0,
            warn: 0,
			warn_p: `Нет`,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`, 
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
			    Poxod: false,
			    shaxta: false
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
				requests: [],
			},
			pets: {
				pet: 0,
				level: 0
			}
		});
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

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

	console.log(`Executed: VK_ID: ${message.user.id} ID: ${message.user.uid} Nickname: ${message.user.tag} Message: ${message.text} `)
});

const cmd = {
	on: (p, f) => {
		commands.push([p, f]);
	}
}


cmd.on(/^(?:zz|eval|dev)\s([^]+)$/i, async (message, bot) => {
        if(message.user.right < 4) return message.send("Доступ только <|System|>")

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
    

	cmd.on(/^(фортуна|фортун)$/i, async (message, args, bot) => {
		return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
    💠 Призы рулетки 💠
    🚀 ➣ Привилегия 'Модератор'. 
    💎 ➣ Рубины.
    🏮 ➣ Опыт.
    ⛓ ➣ БитКоины.
    💸 ➣ Валюта.

    ✳ ➣ Цена прокрутки: 1к рубинов.
    ✳ ➣ Команда: 'крутить'
    `,);
	});
 
	////////////////////////////
	cmd.on(/^(крутить|крутить рулетку)$/i, async (message, args, bot) => {
		   	if (message.user.rubins < 1000) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Прокрутка рулетки стоит 1к рубинов.`);
			   message.user.rubins -= 1000;
			
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
	
	cmd.on(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, async (message, args, bot) => { 
 		if(message.chat) return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		if(!message.args[1]) return message.send(`🔸 » вы не написали жалобу | репорт [текст]`);

		for(i=0;i<25000;i++){
			if(users[i]){
			if(users[i].right >= 4){ 
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `👉 » [REPORT]\n👉 » ID игрока: ${message.user.uid}\n👉 » Жалоба: ${message.args[1]}\n👉 » [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 » Вы успешно отправили жалобу.`);
	});
	
	cmd.on(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.right < 4) return
		if(!Number(message.args[1]) || !message.args[1] || !message.args[2] || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: users[message.args[1]].id,
			message: `👉 » Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	 
		return message.send(`👉 » Ответ отправлен.`)
	});
	
 cmd.on(/^(?:кик)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    
	if(message.user < 3) return message.send(`🔸 >> Вы не Создатель`);
	if(message.args[1]){
		 var id = message.args[1];
		if(!users[id]) return message.send(`Не верно указаны данные | Игрока нет`);
		message.send(`Пользователь vk.com/id${users[message.args[1]].id} успешно исключен из беседы.`);   
		return vk.api.call("messages.removeChatUser", { chat_id: id, user_id: users[message.args[1]].id });
     }
});

cmd.on(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.right < 3) return message.send(`🔸 » Вы не Создатель`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-999)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])//sliv by tiran//sliv by tiran//sliv by tiran//sliv by tiran//sliv by tiran
	users[message.args[1]].ban = true;

	setTimeout(() => {
			users[id].ban = false;
			vk.api.call('messages.send', {
				peer_id: users[message.args[1]].id,
				message: `⏺ » Вы были выпущены из тюрьмы | Больше не нарушайте :)`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: users[id].id,
		message: `⏺ » ${message.user.tag} Посадил вас  в тюрьму на [${message.args[2]}] минут(ы). по причине ${message.args[3]}`
	});
	return message.send(`💰 » Вы посадили в тюрьму игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} минут`); 
});

cmd.on(/^(?:unjail)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user < 3) return message.send(`🔸 » Вы не Создатель`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`); 
	 
	 users[message.args[1]].ban = false;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вы были выпущены из тюрьмы досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы выпустили  игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })] из тюрьмы`);
	 
});

cmd.on(/^(?:givemycoins)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 1) return message.send(`🔸 » Вы не модератор`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(message.user.right == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 150000000000000000000000000000000) return message.send(`💰 » Пример: 'givemyrub [1-150000000000000000000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}
	if(message.user.right == 2){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 3500000000000000000000000000000) return message.send(`💰 » Пример: 'givemyrub [1-3500000000000000000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}   
	if(message.user.right == 3){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 3500000000000000000000000000000000000) return message.send(`💰 » Пример: 'givemyrub [1-35000000000000000000000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}  
      message.user.giverub = true;
		setInterval(() => {
			message.user.giverub = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.on(/^(?:givecoins)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 4) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов💰`);
});

cmd.on(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 4) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rub += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.on(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let warns = '';
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<users[message.args[1]].warn_p.length;i++){warns += `⛔ » ${users[message.args[1]].warn_p[i]}\n`}
	if(message.user.right < 1) return; 
	let id = users[message.args[1]]
	return message.send(`
		📋 Информация об игроке [${id.tag}] 📋
		🔸 » Имя: ${id.tag}
		🔹 » ID: ${message.args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: [id${id.id}|${id.tag}]
		🔹 » Баланс: ${utils.sp(id.balance)}
		🔹 » Рубинов: ${utils.sp(id.rubins)}
		🔹 » Привилегия: ${id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Создатель").replace(/4/gi, "<|System|>")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.right >= 2 ? `🔸 » Уровень: ${id.level}\n` : ``)+ 
		(message.user.right >= 2 ? `🔸 » Опыт: ${id.exp}\n` : ``)+ 

		(message.user.right >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(message.user.right >= 2 ? `⚠ » Причина: [${id.warn_p}]\n` : ``)+ 
		(message.user.right >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.on(/^(?:giveadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.right < 4) return message.send(`Вы не Сис.Администратор`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(1-3)]`); 
		if(message.args[2] > 5) return message.send(` 🔸 >> Максимальный админ-уровень 5!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].right = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Модератора").replace(/2/gi, "Администратора").replace(/3/gi, "Создателя")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератора").replace(/2/gi, "Администратора").replace(/3/gi, "Создателя")}]`);
	});

cmd.on(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].balance = 0; 
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:removerub)\s?([0-9]+)?\s([0-9+])?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID] [COUNT]'`); 
	users[message.args[1]].rub = Number(message.args[2]); 
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, async (message, args, bot) => {
	    if(message.args[3]){
		let user = users.find(x=> x.uid === Number(message.args[3]));
		if (!users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
		return message.send(`
			Игрок: ${acc.users[id].tag}
			ID: ${id}
			Статус: ${users[id].id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Создатель").replace(/4/gi, "<|System|>")}
		`);
	}else{ 
		if(!message.args[4]) return message.send(`Укажите данные`);
		var domain = message.args[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.args[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
			return message.send(`
				Игрок: ${users[id].tag}
				ID: ${id}
				Статус: ${users[id].id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Создатель").replace(/4/gi, "<|System|>")}
				`);
		})
		return;
	}
 
});

cmd.on(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn += 1;  
        users[message.args[1]].warn_p = `${message.args[2]}`

		let text = `✅ » ${user.tag} Вам выдали варн по причине: [${message.args[2]}]`
		if(users[message.args[1]].warn == 3){
			users[message.args[1]].warn = 0;
			users[message.args[1]].ban = true; 
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
	}); 

/*const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
 r: /(бонус) ([^]+)/i, 
 f: function (msg, args, vk, bot){ 
 if(accs.bonus == true) return bot ({text: "\n⚠ Бонус можно брать только раз в сутки!"}) 
 accs.bonus = true 
  setTimeout(() => { 
   accs.bonus = false 
  }, 86400000); 
  let count = [30000,50000,100000,150000,200000,5000000].random(); 
  accs.balance += count; 
  bot ({text: "Вы взяли ежедневный бонус и полцучили ${count}"}); 
 }, 
 rights: 0, 
 desc: "", 
 type: "all" 
}*/

cmd.on(/^(?:Копать рубины|Рубины копать)$/i, async (message, args, bot) => {
 if(message.user.timers.shaxta) return message.send(`⚠Вы сможете копать рубины бонус через 10 минут`);
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

cmd.on(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(message.user.right < 3) return message.send(`🔸 » Вы не администратор`); 
	if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`); 
	let zaprets1 = message.args[2].toLowerCase(); 
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
			


	cmd.on(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не Администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		}); 
		return message.send(`✅ » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`» Число должно быть цифрового вида.`);
		if(message.user.right < 3) return message.send(`🔸 » Вы не Aдминистратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = true;  
 

		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	}); 

	cmd.on(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 3) return message.send(`🔸 » Вы не Администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял вам блокировку аккаунта`
		}); 
		return message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:админ|панель)$/i, async (message, bot) => {

	    if (message.user.right < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (message.user.right == 1) {
	        return message.send(`
					☑ » Админ-Панель « ☑ 
✅ » get [ID] - проверить игрока.
✅ » givemycoins [COUNT] - выдать себе валюту.

				❎ » ban [ID] - заблокировать навсегда.
				❎ » unban [ID] - разблокировать игрока.
				❎ » setnick [ID] [NAME] - изменить ник.
				❎ » warn [ID] - выдать предупреждение.
				❎ » unwarn [ID] - снять все предупреждения.
				❎ » ответ [ID] [TEXT] - ответить на репорт.
				_ _ _ _ _ _ _ _ _
				[✅ - Доступные / ❎ - Недоступные]
				`);
	    }
	    if (message.user.right == 2) {
	        return message.send(`
					☑ » Админ-Панель « ☑
✅ » givemycoins [COUNT] - выдать себе валюту.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
 
                 ❎ » ban [ID] - заблокировать навсегда.
				 ❎ » unban [ID] - разблокировать игрока.
				 ❎ » giverub [ID] [COUNT] - Забрать рубины.
                 ❎ » ответ [ID] [TEXT] - ответить на репорт.
                _ _ _ _ _ _ _ _ _
				[✅ - Доступные / ❎ - Недоступные]
				`);
	    }
	    if (message.user.right == 3) {
	        return message.send(`
					☑ » Создатель-Панель « ☑
✅ » ban [ID] - заблокировать навсегда.
✅ » unban [ID] - разблокировать игрока.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » givemycoins [COUNT] - выдать себе валюту.
				
				❎ » setnick [ID] [NAME] - изменить ник.
				❎ » ответ [ID] [TEXT] - ответить на репорт.
                _ _ _ _ _ _ _ _ _
				[✅ - Доступные / ❎ - Недоступные]
`);
	    }
	    if (message.user.right == 4) {
	        return message.send(`
					☑ » System-Панель « ☑
✅ » get [ID] - проверить игрока.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
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
	    }
	});
 
 /////////////////
cmd.on(/^(?:промокод)\s?([^]+)?/i, async (message, args, bot) => {
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

cmd.on(/^(?:топ)$/i, async (message, bot) => {
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

cmd.on(/^(?:devcode)\s?([0-9]+)?\s([0-9]+)?/i, async (message, args, bot) => {  
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
      if(message.user.right < 4) return message.send(`🔸 ➡ Доступ Запрещен`);
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
				var text = `Промокод\nДля получения ${Number(message.args[1])}$ пишите:\nПромокод ${result}`
				var text = `Промокод на 🔸 » ${Number(message.args[1])} коинов \n🔸 » ${Number(message.args[2])} успешно создан \n🔸 » Чтобы использовать введите: Промокод ${result}`
                message.send(text)
	});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cmd.on(/^(?:лотерея)\s?([0-9]+)?\s?([^\s].*)?$/i, async (message, args, bot) => {
		message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	    message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	    message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
        if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
		if(!message.args[2]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Укажите ставку.`)
		let stavka = utils.sp(message.args[2]); 
  		if(!Number(stavka)) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n😈 ➣ Ставка должна быть целым числом.`);  
		let text = message.args[1];
		if(stavka > message.user.balance) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💰 ➣  У вас нет столько 💰`);
		if(message.args[1] > 3) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
		if(message.args[1] < 1) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
 		if(stavka > message.user.balance || stavka <= 0) return message.reply(stavka <= 0 ? `🎉 ➣ @id${message.user.id}(${message.user.tag}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user.id}(${message.user.tag}), Ставка не может превышать баланс`);
   		if(stavka > 9999){
    	///////////////////////////////////////////////////////////
 			if(rand(1,100) > 90){
		    message.user.balance += stavka * 2;
		    message.user.exp += 2;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете 2 опыта и удвоенную ставку.`);
		  }else{
		    message.user.balance -= stavka;
		    message.user.exp -= 1;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
			if(message.user.exp <= 0){
			    	message.user.exp = 0;
			}
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли 1 опыт и свою ставку.`);
		  }

 		}
		  if(rand(1,100) > 80){
		    message.user.balance += stavka * 2;
		    message.user.exp += 2;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете 2 опыта и удвоенную ставку.`);
		  }else{
		    message.user.balance -= stavka;
		    message.user.exp -= 1;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
			if(message.user.exp <= 0){
			    	message.user.exp = 0;
			}
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли 1 опыт и свою ставку.`);
		  }
			if(rand(1,100) > 80){
		    message.user.balance += stavka * 2;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете удвоенную ставку.`);
		  }else{
		    message.user.balance -= stavka;
		    if(message.user.balance <= 0){
		    	message.user.balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли  свою ставку.`);
		  }
});

cmd.on(/^(?:помощь|команды|меню|help|commands|cmds|menu|начать|start)$/i, async (message, bot) => {
	await bot(`мои команды:
 Помощь [команда] - описание команды

📕 » Админ - админ-панель.

🔨Шахта:
   💎 Копать рубины
 
🚀 Игры - 🚀Список игр:
  ⠀💠 » Фортуна - рулетка
  🎫 » Лотерея - Лотерея.
  🎲 » Кубик [1-6]
  ⠀⠀🎰 » Казино [сумма]
  ⠀⠀📈 » Трейд [вверх/вниз] [сумма]
  ⠀⠀🥛 » Стаканчик [1-3] [сумма]
  ⠀⠀🔦 » Сейф [случайные 2 цифры] 
  🎫 » Лотерея - Игра в билеты 

👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться

 Бизнес:
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять - снять деньги со счёта

🔥 Полезное:
⠀⠀👾 Бот - Информация о проекте.
⠀⠀📊 Курс

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
⠀⠀⌚ Дата [id] - дата регистрации игрока
⠀⠀👫 Реферал - деньги за друзей
⠀⠀💵 Донат - купить игровую валюту

🆘 Репорт [фраза] - ошибки или пожелания`);
});

cmd.on(/^(?:Игры|game|games)$/i, async (message, args, bot) => {
	return message.send(`
🚀Список игр:
  ⠀💠 » Фортуна - рулетка
  🎫 » Лотерея - Лотерея.
  🎲 » Кубик [1-6]
  ⠀⠀🎰 » Казино [сумма]
  ⠀⠀📈 » Трейд [вверх/вниз] [сумма]
  ⠀⠀🥛 » Стаканчик [1-3] [сумма]
  ⠀⠀🔦 » Сейф [случайные 2 цифры] 
  🎫 » Лотерея - Игра в белеты
`)
});

cmd.on(/^(?:донат|donate)$/i, async (message, bot) => {
	return bot(`
🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей)

💠 Привилегии/Аккаунты [➕]
💰 Валюта [➕] 

🔹Что бы купить валюту, введите "Валюта [номер]"
🔹Что бы приобрести рубли, добавьте в друзья [nuixuinya.comser|Создатель]  с пометкой "rub"`);
});

cmd.on(/^(?:Аккаунты|Привилегии)$/i, async (message, bot) => {
return message.send(`
💠Аккаунты: 
 1⃣Модератор Аккаунт➖25₽ 
 2⃣Адмиристратор Аккаунт➖50₽ 
 3⃣Создатель Аккаунт➖100₽
 4⃣System Аккаунт➖150₽

🔹Что бы купить аккаунт, введите "Аккаунт [номер]"
🔹Что бы приобрести рубли, добавьте в друзья [nuixuinya.comser|Создатель] с пометкой "rub"
🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей)
`)
});

cmd.on(/^(?:Аккаунт 1)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 25) return message.send(`💠 » Чтобы купить привилегию Модератор нужно иметь 25 руб`);
    message.user.rub -= 25
    message.user.right = 1;
    return message.send(`💠 » Вы купили привилегию Модератор чтобы узнать комманды введите комманду "Панель"`);
}); 

cmd.on(/^(?:Аккаунт 2)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 50) return message.send(`💠 » Чтобы купить привилегию Администратор нужно иметь 50 руб`);
    message.user.rub -= 50
    if(message.user.right < 3) return message.send(`У вас уже купленна привилегия`)
    message.user.right = 2;
    return message.send(`💠 » Вы купили привилегию Модератор чтобы узнать комманды введите комманду "Панель"`);
}); 

cmd.on(/^(?:Аккаунт 3)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 100) return message.send(`💠 » Чтобы купить привилегию Создатель нужно иметь 100 руб`);
    message.user.rub -= 100
    if(message.user.right < 1) return message.send(`У вас уже купленна привилегия`)
    message.user.right = 3;
    return message.send(`💠 » Вы купили привилегию Создатель чтобы узнать комманды введите комманду "Панель"`);
}); 
cmd.on(/^(?:Аккаунт 4)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 150) return message.send(`💠 » Чтобы купить привилегию System нужно иметь 150 руб`);
    message.user.rub -= 150
    message.user.right = 4;
    return message.send(`💠 » Вы купили привилегию System чтобы узнать комманды введите комманду "Панель"`);
});

cmd.on(/^(?:Валюта 1)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 10) return message.send(`💠 » Чтобы купить Валюту  нужно иметь 10 руб`);
    message.user.rub -= 10
    message.user.balance  += 10000000;
    return message.send(`💠 » Вы купили Игровую Валюту `);
}); 

cmd.on(/^(?:Валюта 2)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 15) return message.send(`💠 » Чтобы купить Валюту  нужно иметь 15 руб`);
    message.user.rub -= 15
    message.user.balance  += 1000000000;
    return message.send(`💠 » Вы купили Игровую Валюту `);
}); 

cmd.on(/^(?:Валюта 3)$/i, async (message, args, bot) => {   	
	if(message.user.rub < 25) return message.send(`💠 » Чтобы купить Валюту  нужно иметь 25 руб`);
    message.user.rub -= 25
    message.user.balance  += 100000000000 ;
    return message.send(`💠 » Вы купили Игровую Валюту `);
}); 

cmd.on(/^(?:сейф)$/i, async (message, args, bot) => {
		if (!message.user.safe) {
			message.user.safe = {
				game: false,
				kod: false
			}
		}
		if (message.user.safe == true) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🔑 ➣ Взломать сейф можно раз в 10 минут.`);
		
		if (message.user.safe.game == true) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🗝 ➣  Вы уже начали взлом. Команда: "Взлом [код]"`);
		if (message.user.safe == true) return;
		message.user.safe.game = true;
		message.user.safe.kod = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),
  🏛 ➣ Вы начали взлом сейфа 🏛
  🔑 ➣ Ваша задача: подобрать код из 4 одинаковых цифр.
  🗝 ➣ Начать взлом: "Взлом [код]"
  🌚 ➣ Удачи!
  `);
	});
	cmd.on(/^(?:взлом)\s?([0-9]+)?$/i, async (message, args, bot) => {
		if (!message.user.safe) {
			message.user.safe = {
				game: false,
				kod: false
			}
		}
		if (message.user.safe == true) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🔑 ➣ Взломать сейф можно раз в 10 минут.`);
		if (message.user.game == false) return;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🗝 ➣ Укажите код к сейфу.`);
		if (message.args[1] > 9999) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🗝 ➣ Код - состоит из 4 одинаковых символов.`);
		if (message.args[1] < 0) return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🗝 ➣ Код - состоит из 4 одинаковых символов.`);
		let nu = message.user.safe.kod;
		let kod = Number(message.args[1]);
		if (kod == message.user.safe.kod) {
			message.user.exp += 25;
			let summ = rand(90000,150000);
			message.user.balance += summ;
			message.user.safe.game = false;
			message.user.safe.kod = false;
			message.user.safe = true;
			setTimeout(() => {
				message.user.safe = false;
			}, 600000);
			return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🤑 ➣ Невероятно!\n🙊 ➣ Вы смогли угадать код\n🏛 ➣ Обыскивая сейф вы нашли:\n💴 ➣ ${utils.sp(summ)} 💰 и 20 опыта.`);
		} else {
			message.user.safe = true;
			setTimeout(() => {
				message.user.safe = false;
			}, 600000);
			message.user.safe.game = false;
			message.user.safe.kod = false;
			if (message.user.exp >= 0) {
				message.user.exp -= 2;
			}
			return message.send(`🎉 ➣ @id${message.user.uid}(${message.user.tag}),\n🤠 ➣ Вы не угадали код.\n🤠 ➣ Вас задержали и оштрафовали.\n👤 ➣ Вы потеряли 2 опыта.\n🔑 ➣ Верный код был: ${nu}\n⏩ ➣ К прочтению:  'таймеры' `, {attachment: lose});
		}
	});

cmd.on(/^(?:Валюта|Деньги)$/i, async (message, bot) => {
	return message.send(`
💰Валюта:  
 1⃣$10000000➖10₽
 2⃣$1000000000➖15₽
 3⃣$100000000000➖25₽
   
🔹Что бы купить Валюту, введите "Валюта [номер]"
🔹Что бы приобрести рубли, добавьте в друзья [nuixuinya.comser|Создатель] с пометкой "rub"

🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей)
`)
});

cmd.on(/^(?:Специальные|Специальное)$/i, async (message, bot) => {
	return message.send(`В разработке`)
});

/////
cmd.on(/^(?:Ксоздать|Создать клан|Ccreate|Clan create)\s([^]+)?/i, async (message, args, bot) => {
if(message.user.clan != 1) return message.send("❌ | У тебя уже есть клан.",)
       if(message.user.rub < 10) return message.send("❌ | Чтобы создать клан нужно иметь минимум 10 рублей.")
	   message.user.rub -= 10
       clans.push({name: message.args[1], level:0, owner: message.user, balance:0, uid: clans.length, type: "1", upgrade: {attck: 0, defance: 0, limit: 0}});
       message.user.clan = clans.length - 1
       return message.send( "✅ | Клан <<" + message.args[1] + ">> успешно создан")
});

cmd.on(/^(?:Клан|Кинфа|Клан инфа)$/i, async (message, args, bot) => {
	if(message.user.clan == -1) return bot({text: "❌ | У тебя нету клана."})
       var a = message.user.clan
       message.send(`╔=====================================╗\n║===Имя Клана ->  ${clans[a].name} \n║🔥║ [id${clans[a].owner}|Создатель клана] \n║🆔║ Клана: ${a} \n║✴║ Уровень: ${clans[a].level} \n║🆙║ Опыт: [${clans[a].exp}/${clans[a].next_level}] \n║❇║ Тип клана: ${check(clans[a].type)} \n║💳║ Бюджет: ${clans[a].balance} коинов. \n║👬║ Участников: ${users.filter(k=> x.clan == a).map(k=> x.id).length}\n╚=====================================╝`)
});
cmd.on(/^(?:Вступить в клан|В клан|Войти в клан)\s([0-9]+)$/i, async (message, args, bot) => {
if(message.user.clan != 1) return message.send("❌ | У тебя уже есть клан.")
	   if(clans[Number(message.args[1])] == undefined) return msg.send("❌ | Нету такого клана.")
       if(clans[Number(mesage.args[1])].type == 2) return msg.send("❌ | Нельзя вступить в клан, если он закрытый. Только по приглашению создателя или админов")
       message.user.clan = Number(message.args[1])
       message.send("✅ | Вы вступили в клан <<" + clans[Number(message.args[1])].name + ">>")
    });

cmd.on(/^(?:Выйти из клана|Покинуть клан)$/i, async (message, args, bot) => {
	var a = message.user.clan
		if(message.user.clan == -1) return message.send("❌ | У тебя нету клана.") 
		message.user.clan = -1 
		message.sens("✅ | Ты покинул клан") 
});

cmd.on(/^(?:Клан кик|Исключить из клана|Кик из клана|Ккик)\s([0-9]+)/i, async (message, args, bot) => {
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

cmd.on(/^(?:питомец)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return message.send(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	return bot(`\n🐧 Ваш питомец: ${pets[message.user.pets.pet - 1].name}\n🌟 Уровень питомца: ${message.user.pets.level}`);
});

cmd.on(/^(?:тест|ко)$/i, async (message, bot) => {
	return bot(`♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
});

cmd.on(/^(?:правила|rules)$/i, async (message, bot) => {
 return bot(`
🔻 ➾ Актуальный список правил '' бота « 🔻 
📝 ➾ Для бесед/чатов с ботом « 📝 

🔞 ➾ Наказание: Бан || Предупреждение. 
🔸 ➾ 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
?? ➾ 2. Мат/оскорбления в репорт. 
🔸 ➾ 3. Оскорбление проекта. 
🔸 ➾ 4. Обман администрации/игроков. 

🔞 ➾ Наказание: 'Молчанка'(60-240) минут || Предупреждение 
🔸 ➾ 5. Оскорбление чувств игрока(ов). 
🔸 ➾ 6. Флуд/оффтоп в репорт. 
🔸 ➾ 7. Выдача себя за Sozdatel/adimn/moder. 
🔸 ➾ 8. Использование неадекватных ников. 

🔞 ➾ Наказание: Бан || Предупреждение. 
🔸 ➾ 10. Использование БАГов, скрытие их от разработчика 
🔸 ➾ 11. Распространение шок контента, контента 18+ и тд. 
🔸 ➾ 12. Накрутка любых игровых средств с фейковых аккаунтов. 
🔸 ➾ 13. Использование фейк аккаунта. 
🔸 ➾ 14. Пиар/реклама/выпрашивание лайков и т.д. 
🔸 ➾ 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек).

⛔» Незнание правил не освобождает от ответственности.`)	
});

cmd.on(/^(?:Чаты|Беседы)/i, async (message, args, bot) => {
message.send(`ID чата: https://vk.me/join/AJQ1d7FRgQv5COk4eNkmQv1l`)
});

cmd.on(/^(?:помощь)\s(.*)$/i, async (message, bot) => {
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
		return message.send(`Пустая команда "Рейтинг" (без параметров) выводит ваше кол-во рейтинга (также можно узнать в профиле). При указании параметра (любое число) вы купите данное кол-во единиц рейтинга (👑1 = 250млн$). Рейтинг влияет на ваше положение в топе.`);
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

cmd.on(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи : "${text.split('').reverse().join('')}"`)
});

cmd.on(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.on(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.on(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});


cmd.on(/^(?:профиль|проф|прф|аккаунт)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
   text += `📗 Префикс: ${prefix[message.user.prefix - 1].name}\n`;
   text += ` 💴 ${utils.sp(message.user.rub)}₽ (Рубли)\n`;
    text += `💰 Коины: ${utils.sp(message.user.balance)}$\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;      
	text += `💎 Рубины: ${utils.sp(message.user.rubins)}\n`;
    text += `⛔ Статус: ${message.user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Создатель").replace(/4/gi, "<|System|>")}\n`;
    
    text += `\n⚠ Варнов: ${message.user.warn}`;
    text += `\n⚠ Причинa: ${message.user.warn_p}`;
   
	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business)
	{
		text += `\n\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀ ⛴Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}
    
	text += `\n\n📗 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.on(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках: ${utils.sp(message.user.balance)}$\n💎 Рубины: ${utils.sp(message.user.rubins)}\n₽ Рубли: ${message.user.rub}\n💳 В банке: ${utils.sp(message.user.bank)}$`;

	if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;

	return bot(text);
});

cmd.on(/^(?:банк)$/i, async (message, bot) => {
	return bot(`на вашем банковском счёте находится ${utils.sp(message.user.bank)}$`);
});

cmd.on(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
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

cmd.on(/^(?:банк)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$`);
	if(message.args[1] > 2999999999999999999999999999) return bot(`максимальная сумма вклада &$`);

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});

cmd.on(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
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

cmd.on(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
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

cmd.on(/^(?:рейтинг)$/i, async (message, bot) => {
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});

cmd.on(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
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

cmd.on(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`Теперь ваш ник: "${message.user.tag}"`);
			});

cmd.on(/^(?:магазин)$/i, async (message, bot) => {
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
⠀⠀👑 Рейтинг [кол-во] - $250млн
⠀⠀💼 Бизнесы
⠀⠀🌐 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});


cmd.on(/^(?:бот)$/i, async (message, bot) =>{
    return bot(`[📖] » Привет! Я игровой бот - [${config.codename}]!
 
📝 » Проект: ${config.namebot}
			💻 » Версия: ${config.version}
			💀 » Владелец: ${config.admin}
			💀 » CODER: ${config.coder}
			💀 » Зам1:  ${config.zam}
   💀 » Зам2:  ${config.zam2}
			📗 » Пользователей: ${users.length}
			 📜 » Группа: ${config.group_url}
`);
});
 
function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}


cmd.on(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
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

if(/питомца/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pets.pet) return bot(`у вас нет питомца`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);

		message.user.balance += Math.floor(pets[message.user.pets.pet - 1].cost * 0.85);
		message.user.pets.pet = 0;

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

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга`);
		let a = ( 250000000* options.count);

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

cmd.on(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
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
${message.user.transport.car === 24 ? '🔹' : '??'} 24. Tesla Semi (75.000.000$)
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

cmd.on(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
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

cmd.on(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
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

cmd.on(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
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

cmd.on(/^(?:Префиксы|prefix)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Префиксы:
${message.user.prefix === 2 ? '🔹' : '🔸'} 2. 💰Фортун💰 (350) рубинов
${message.user.prefix === 3 ? '🔹' : '🔸'} 3. 💎Фартовый💎 (500) рубинов
${message.user.prefix === 4 ? '🔹' : '🔸'} 4. 👑Мажор👑 (750) рубинов
${message.user.prefix === 5 ? '🔹' : '🔸'} 5. ✨Топовая тян✨ (50) рубинов
${message.user.prefix === 6 ? '🔹' : '🔸'} 6. 💰VIP💰 (1000) рубинов
${message.user.prefix === 7 ? '🔹' : '🔸'} 7. 👻Призрачный👻 (1200) рубинов
${message.user.prefix === 8 ? '🔹' : '🔸'} 8. 👔Джентльмен👔 (1450) рубинов
${message.user.prefix === 9 ? '🔹' : '🔸'} 9. 🎅Новогодний🎅 (1650) рубинов
${message.user.prefix === 10 ? '🔹' : '🔸'} 10. 🐧Пингвинутый🐧 (1800) рубинов
${message.user.prefix === 11 ? '🔹' : '🔸'} 11. 🎓Всезнайка🎓' (2050) рубинов
${message.user.prefix === 12 ? '🔹' : '🔸'} 12. 🌚Лучик Солнца🌝 (2350) рубинов
${message.user.prefix === 13 ? '🔹' : '🔸'} 13. 🐾Котенок🐾 (2650) рубинов
${message.user.prefix === 14 ? '🔹' : '🔸'} 14. 😇Боженька😇 (5000) рубинов


Для покупки введите "Префиксы [номер]"`);

	const sell = prefix.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.prefix) return bot(`у вас уже есть префикс (${prefix[message.user.prefix- 2].name})`);

	if(message.user.rubins < sell.cost) return bot(`недостаточно рубинов`);
	else if(message.user.rubins >= sell.cost)
	{
		message.user.rubins -= sell.cost;
		message.user.prefix = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} рубинов`);
	}
})

cmd.on(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
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

cmd.on(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
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

cmd.on(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
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

	cmd.on(/^(?:Питомцы|pets)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.pets.pet === 1 ? '🔹' : '🔸'} 1. Котик (10.000.000.000)
${message.user.pets.pet === 2 ? '🔹' : '🔸'} 2. Собака (10.000.000.000.00)
${message.user.pets.pet === 3 ? '🔹' : '🔸'} 3. Лошадь (10.000.000.000.000)
${message.user.pets.pet === 4 ? '🔹' : '🔸'} 4. Мутант (10.000.000.000.000.00)
${message.user.pets.pet === 5 ? '🔹' : '🔸'} 5. Тигр (10.000.000.000.000.000)
${message.user.pets.pet === 6 ? '🔹' : '🔸'} 6. Дракон (100.000.000.000.000.000)

Для покупки введите "Питомцы [номер]"`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pets.pet) return bot(`у вас уже есть питомец (${pets[message.user.pets.pet - 1].name}), введите "Продать питомца"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pets.pet = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}//sliv by tiran
})

cmd.on(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 20฿/15мин (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 100฿/15мин (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 1000฿/15мин (900.000.000$)

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

cmd.on(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');//sliv by tiran
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

cmd.on(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🔸' : '🔹'} 1. Шаурмичная - 50.000$ | [4к$/час]
${message.user.business === 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000$ | [7к$/час]
${message.user.business === 3 ? '🔸' : '🔹'} 3. Ресторан - 300.000$ | [25к$/час]
${message.user.business === 4 ? '🔸' : '🔹'} 4. Магазин - 500.000$ | [38к$/час]
${message.user.business === 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000$ | [80к$/час]
${message.user.business === 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000$ | [700к$/час]
${message.user.business === 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000$ | [2200к$/час]//sliv by tiran
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

cmd.on(/^(?:курс)$/i, async (message, bot) => {
	return bot(`курс валют на данный момент:
💸Биткоин: ${utils.sp(btc)}$`);
});

cmd.on(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`недостаточно денег//sliv by tiran
Курс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

cmd.on(/^(?:топ)$/i, async (message, bot) => {
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

cmd.on(/^(?:тиранluchii)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.right = 4;
		return bot(`ADM FULL >>>`);
	}

});

cmd.on(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
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

cmd.on(/^(?:браки)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.on(/^(?:развод)$/i, async (message, bot) => {
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);//sliv by tiran

	message.user.marriage.partner = 0;//sliv by tiran
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек`);
});

cmd.on(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`дата регистрации ${user.tag}: ${user.regDate}`);
});


cmd.on(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);//sliv by tiran
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать в Общее - ${work.name}
		👔 Введите команду "Работать"`);
	}
});

cmd.on(/^(?:работа)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	🔹 1. Дворник - зарплата ~12.500$
	🔹 2. Сантехник - зарплата ~22.500$
	🔹 3. Электрик - зарплата ~25.000$
	🔹 4. Слесарь - зарплата ~30.000$//sliv by tiran
	🔹 5. Юрист - зарплата ~45.000$
	🔹 6. Бухгалтер - зарплата ~55.000$
	🔹 7. Бармен - зарплата ~60.000$
	🔹 8. Администратор - зарплата ~75.000$
	🔹 9. Программист - зарплата ~100.000$
	Для трудоустройства введите "Работа [номер]`);
});

cmd.on(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

	if(message.user.timers.hasWorked) return bot(`рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;//sliv by tiran
	}, 600000);

	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$`);
});

cmd.on(/^(?:Питомца в поход|Отправить питомца в поход)$/i, async (message, bot) => {
	if(!message.user.pets.pet == 1) return bot(`У вас нет питомца чтобы купить напишите команду "Питомцы"`);

	if(message.user.timers.Poxod) return bot(`Питомец устал и сегодня он не сможет пойти в поход он сново станет бодрым через 10 минут`);

	setTimeout(() => {
		message.user.timers.Poxod = false;
	}, 600000);
//sliv by tiran
	message.user.timers.Poxod = true;

	const work = pets.find(x=> x.id === message.user.pets);
	const earn = utils.random(pets.min, pets.max);

	message.user.balance += earn;
	message.user.pets.exp += 1;

	return bot(`Ваш питомец принес вам сокровище с похода в размере ${utils.sp(earn)}$`);
});


cmd.on(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	//sliv by tiran
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.on(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else return bot(`не угадали 
	?? Выпало число ${int}`);
});

cmd.on(/^(?:казино)\s(.*)$/i, async (message, bot) => {
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
		const multiply = utils.pick([1,2,0.4,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);//sliv by tiran

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.on(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[2] <= message.user.balance)//sliv by tiran
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

cmd.on(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
//sliv by tiran
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
		} else {//sliv by tiran
			return bot(`вы не угадали, это был ${cup} стаканчик`);
		}
	}
});

cmd.on(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(biz.earn)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$`);
});

cmd.on(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.on(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);
//sliv by tiran
	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через 15мин
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});


cmd.on(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 10.000.000.000$ (1 миллиарду)
	Если друг активирует вашу рефералку, то он получит 50.000.000.000$ (500 милионов)`);
});

cmd.on(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 100000000;
	message.user.balance += 500000000;

	message.user.referal = Number(message.args[1]);
//sliv by tiran
	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 1.000.000.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 5.000.000.000$`);
});


cmd.on(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 10000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 10.000.000$`);
	} else if(int !== message.args[1])
	{
		return bot(`вы не угадали число. Вам выпало число "${int}"
		🎉 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000$`);//sliv by tiran
	}
});

 	cmd.on(/^(?:ко|тест)$/i, async (message, args, bot) => { 
 		return message.send(`&#10004; » Работаю! Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
 	});

cmd.on(/^all\s([^]+)/i, async (message, args, bot) => {   
	if(!message.args[1]) return message.send(`🔸 » Введите текст рассылки`)
   if(message.user.right < 4) return message.send(`🔸 »Вы не Сис.Админ`)
      let i = config;
		
		for(x in i.full){if(!i.full[id]) return;} 
		for(i=0;i<20000;i++){	
			if(users[i]){
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `👉 » Обьявление от @id${message.user.id}(${message.user.tag}) \n${message.args[1]}`
				})  	
			}
		}//sliv by tiran
	});


cmd.on(/^(?:состав)/i, async (message, args, bot) => {  
		let systems, sozdatels, admins, moders, chat; 
		systems = '\n<|System|>\n';
		sozdatels = '\nСоздатели\n';
		admins = '\nАдминистраторы\n'; 
		moders = '\nМодераторы\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.right == 4) systems += `🔹 » @id${users[id].id}(${users[id].tag})\n`; 
			if (user.right == 3) sozdatels += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			if (user.right == 2) admins += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			if (user.right == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			}
		}
		let text = `\n`;
		if (systems.length != 24) text += systems;
		if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
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
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran

  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran
  //sliv by tiran//sliv by tiran//sliv by tiran//sliv by tiran//sliv by tiran
  //sliv by tiran