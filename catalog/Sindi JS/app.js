console.log('')
console.log('-------------------------------')
console.log('  Скрипт Bot Sindi запущен.')
console.log('  Разработчик: Никита Тарасов.')
console.log('  VK: https://vk.com/akullaaa00')
console.log('-------------------------------')
console.log('')

// ВСЕ НАСТРОЙКИ В ФАЙЛЕ /database/settings.json! 

let promo = 0;
let promolimit = 0;
let promotip = 0;
let promovalue = 0;

const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

const cars = [
	{
		name: 'Скейтборд',
		cost: 750,
		id: 1
	},
	{
		name: 'Ролики',
		cost: 2000,
		id: 2
	},
	{
		name: 'Самокат',
		cost: 6000,
		id: 3
	},
	{
		name: 'Велосипед',
		cost: 15000,
		id: 4
	},
	{
		name: 'Гироскутер',
		cost: 35000,
		id: 5
	},
	{
		name: 'Мопед',
		cost: 70000,
		id: 6
	},
	{
		name: 'ВАЗ 2103',
		cost: 125000,
		id: 7
	},
	{
		name: 'Мотоцикл SP110C-1A',
		cost: 170000,
		id: 8
	},
	{
		name: 'Квадроцикл МОТАХ',
		cost: 260000,
		id: 9
	},
	{
		name: 'AUDI A2',
		cost: 300000,
		id: 10
	},
	{
		name: 'Toyota Mark II',
		cost: 450000,
		id: 11
	},
	{
		name: 'LADA АМТ7',
		cost: 800000,
		id: 12
	},
	{
		name: 'BMW X1',
		cost: 1200000,
		id: 13
	},
	{
		name: 'Ford Explorer',
		cost: 2000000,
		id: 14
	},
	{
		name: 'BMW Z4 M',
		cost: 2500000,
		id: 15
	},
	{
		name: 'Citroen Berlingo',
		cost: 3400000,
		id: 16
	},
	{
		name: 'Porsche 718 Cayman S',
		cost: 4000000,
		id: 17
	},
	{
		name: 'Lamborghini Gallardo',
		cost: 5500000,
		id: 18
	},
	{
		name: 'Subaru WRX',
		cost: 7500000,
		id: 19
	},
	{
		name: 'Tesla model X P100D',
		cost: 12000000,
		id: 20
	},
	{
		name: 'Ferrari 488 Pista',
		cost: 30000000,
		id: 21
	},
	{
		name: 'Koenigsegg Regera',
		cost: 40000000,
		id: 22
	},
	{
		name: 'Ferrari F60',
		cost: 90000000,
		id: 23
	},
	{
		name: 'Aston Martin Valkyrie',
		cost: 150000000,
		id: 24
	},
	{
		name: 'Lamborghini Venen',
		cost: 400000000,
		id: 25
	},
	{
		name: 'Koenigsegg CCXR Trevita',
		cost: 750000000,
		id: 26
	}
];

const yachts = [
	{
		name: 'Carer X',
		cost: 10000,
		id: 1
	},
	{
		name: 'Nauticat F',
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
		name: 'Palmer Johnson 42M',
		cost: 80000000,
		id: 9
	},
	{
		name: 'Wider FR',
		cost: 85000000,
		id: 10
	},
	{
		name: 'Browns',
		cost: 150000000,
		id: 11
	},
	{
		name: 'Golden Sky',
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
		name: 'Вентилятор',
		cost: 500,
		id: 1
	},
	{
		name: 'Robinson R44 Raven I',
		cost: 400000,
		id: 2
	},
	{
		name: 'Ка-32С',
		cost: 750000,
		id: 3
	},
	{
		name: 'Ми-8Т',
		cost: 1200000,
		id: 4
	},
	{
		name: 'Аgusta Westland 119 Koala',
		cost: 2500000,
		id: 5
	},
	{
		name: 'Ми-8МТВ-1',
		cost: 3750000,
		id: 6
	},
	{
		name: 'Bell 205A-1',
		cost: 4800000,
		id: 7
	},
	{
		name: 'AW109 Power',
		cost: 7500000,
		id: 8
	},
	{
		name: 'Eurocopter EC155 B1 Dauphin',
		cost: 12000000,
		id: 9
	},
	{
		name: 'AgustaWestland AW149',
		cost: 18000000,
		id: 10
	},
	{
		name: 'Eurocopoter AS332 L1 Super Puma',
		cost: 25000000,
		id: 11
	},
	{
		name: 'Kazan Mi-171A2',
		cost: 40500000,
		id: 12
	},
	{
		name: 'Sikorsky S-92 Cougar',
		cost: 70000000,
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
		name: 'Nokia 105',
		cost: 1500,
		id: 1
	},
	{
		name: 'Philips Xenium E168',
		cost: 4000,
		id: 2
	},
	{
		name: 'Xiaomi Redmi 6A 2',
		cost: 6000,
		id: 3
	},
	{
		name: 'Digma LINX ATOM 3G',
		cost: 9000,
		id: 4
	},
	{
		name: 'Alcatel 1',
		cost: 12000,
		id: 5
	},
	{
		name: 'Honor 9 Lite',
		cost: 20000,
		id: 6
	},
	{
		name: 'Samsung Galaxy J6',
		cost: 36000,
		id: 7
	},
	{
		name: 'IPhone 5',
		cost: 60000,
		id: 8
	},
	{
		name: 'Xperia XZ Premium',
		cost: 100000,
		id: 9
	},
	{
		name: 'Samsung Galaxy J8',
		cost: 300000,
		id: 10
	},
	{
		name: 'IPhone X',
		cost: 1500000,
		id: 11
	},
	{
		name: 'IPhone 3GS Supreme',
		cost: 5000000,
		id: 12
	}
];

const pets = [
	{
		name: 'Улитка',
		cost: 1000,
		id: 1
	},
	{
		name: 'Лягушка',
		cost: 25000,
		id: 2
	},
	{
		name: 'Заяц',
		cost: 500000,
		id: 3
	},
	{
		name: 'Свинья',
		cost: 300000000,
		id: 4
	},
	{
		name: 'Лиса',
		cost: 1250000000,
		id: 5
	},
	{
		name: 'Собака',
		cost: 5000000000,
		id: 6
	},
	{
		name: 'Панда',
		cost: 30000000000,
		id: 7
	},
	{
		name: 'Горилла',
		cost: 180000000000,
		id: 8
	}
];


const petsupd = [
	{
		cost: 2000,
		id: 1
	},
	{
		cost: 50000,
		id: 2
	},
	{
		cost: 1000000,
		id: 3
	},
	{
		cost: 600000000,
		id: 4
	},
	{
		cost: 2500000000,
		id: 5
	},
	{
		cost: 10000000000,
		id: 6
	},
	{
		cost: 60000000000,
		id: 7
	},
	{
		cost: 360000000000,
		id: 8
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
		name: 'Сбор макулатуры',
		cost: 750000,
		earn: 15000,
		id: 1,
		icon: '📕'
	},
	{
		name: 'Киоск',
		cost: 1300000,
		earn: 40000,
		id: 2,
		icon: '🛒'
	},
	{
		name: 'Завод по переработке мусора',
		cost: 6000000,
		earn: 65000,
		id: 3,
		icon: '🏭'
	},
	{
		name: 'Небольшой магазин',
		cost: 17500000,
		earn: 100000,
		id: 4,
		icon: '🏪'
	},
	{
		name: 'Супермаркет',
		cost: 28000000,
		earn: 145000,
		id: 5,
		icon: '🏬'
	},
	{
		name: 'Рекламное агентство',
		cost: 45000000,
		earn: 200000,
		id: 6,
		icon: '🏢'
	},
	{
		name: 'Ломбард',
		cost: 75000000,
		earn: 225000,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Популярный бар',
		cost: 100000000,
		earn: 265000,
		id: 8,
		icon: '💶'
	},
	{
		name: 'ТЭЦ',
		cost: 160000000,
		earn: 300000,
		id: 9,
		icon: '🏭'
	},
	{
		name: 'Компания по разработке игр',
		cost: 275000000,
		earn: 350000,
		id: 10,
		icon: '🎮'
	},
	{
		name: 'Банк',
		cost: 275000000,
		earn: 400000,
		id: 11,
		icon: '🏦'
	},
	{
		name: 'Агентство недвижимости',
		cost: 350000000,
		earn: 425000,
		id: 12,
		icon: '🏣'
	},
	{
		name: 'Наркопритон',
		cost: 500000000,
		earn: 450000,
		id: 13,
		icon: '🤤'
	},
	{
		name: 'Заправка',
		cost: 700000000,
		earn: 500000,
		id: 14,
		icon: '⛽'
	},
	{
		name: 'Майнинг биткоинов',
		cost: 1200000000,
		earn: 600000,
		id: 15,
		icon: '🔋'
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
		name: 'Сторож',
		requiredLevel: 2,
		min: 3750,
		max: 4000,
		id: 2
	},
	{
		name: 'Продавец',
		requiredLevel: 3,
		min: 4000,
		max: 4500,
		id: 3
	},
	{
		name: 'Няня',
		requiredLevel: 4,
		min: 6000,
		max: 8000,
		id: 4
	},
	{
		name: 'Курьер',
		requiredLevel: 5,
		min: 7500,
		max: 8000,
		id: 5
	},
	{
		name: 'Слесарь',
		requiredLevel: 6,
		min: 9000,
		max: 9489,
		id: 6
	},
	{
		name: 'Охранник',
		requiredLevel: 7,
		min: 10000,
		max: 12500,
		id: 7
	},
	{
		name: 'Библиотекарь',
		requiredLevel: 8,
		min: 12500,
		max: 13500,
		id: 8
	},
	{
		name: 'Воспитатель',
		requiredLevel: 9,
		min: 14500,
		max: 16500,
		id: 9
	},
	{
		name: 'Педагог',
		requiredLevel: 10,
		min: 16000,
		max: 17500,
		id: 10
	},
	{
		name: 'Повар',
		requiredLevel: 11,
		min: 17500,
		max: 18500,
		id: 11
	},
	{
		name: 'Грузчик',
		requiredLevel: 12,
		min: 19500,
		max: 20500,
		id: 12
	},
	{
		name: 'Парикмахер',
		requiredLevel: 13,
		min: 23500,
		max: 24500,
		id: 13
	},
	{
		name: 'Врач',
		requiredLevel: 14,
		min: 24500,
		max: 25500,
		id: 14
	},
	{
		name: 'Торговый представитель',
		requiredLevel: 15,
		min: 26500,
		max: 27500,
		id: 15
	},
	{
		name: 'Специалист по валютным операциям',
		requiredLevel: 16,
		min: 55500,
		max: 70500,
		id: 16
	},
	{
		name: 'Юрист по налоговому праву',
		requiredLevel: 17,
		min: 70500,
		max: 110500,
		id: 17
	},
	{
		name: 'Программист PHP',
		requiredLevel: 18,
		min: 90500,
		max: 120500,
		id: 18
	}
];

const elka = [
	{
		name: 'Ель обыкновенная',
		cost: 50000,
		id: 1
	},
	{
		name: 'Ель канадская',
		cost: 900000,
		id: 2
	},
	{
		name: 'Ель французская',
		cost: 1000000,
		id: 3
	},
	{
		name: 'Ель русская',
		cost: 5000000,
		id: 4
	}
];

const peka = [
	{
		name: 'TOPCOMP MG 5567830 GL503VD',
		cost: 32500,
		id: 1
	},
	{
		name: 'COMPYOU GAME PC G777',
		cost: 74000,
		id: 2
	},
	{
		name: 'RIWER GAME-GTX (G9-793)',
		cost: 96000,
		id: 3
	},
	{
		name: 'ASUS ROG GR8II-T055Z',
		cost: 105000,
		id: 4
	},
	{
		name: 'KEY GM PRO',
		cost: 117600,
		id: 5
	},
	{
		name: 'MSI VORTEX G65VR 7RE',
		cost: 130000,
		id: 6
	},
	{
		name: 'ARENA A085885',
		cost: 325000,
		id: 7
	},
	{
		name: 'DELL XPS TOWER SPECIAL EDITION',
		cost: 486000,
		id: 8
	},
	{
		name: 'APPLE IMAC С ЭКРАНОМ 5K RETINA',
		cost: 564000,
		id: 9
	},
	{
		name: 'SURFACE STUDIO',
		cost: 835000,
		id: 10
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

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
let smilerand = utils.pick([`[🍒🍊🍓]`, `[💰🍊🍒]`, `[🍊🍊💰]`, `[🍋🍊🍊]`, `[💰🍓💰]`]);
let smilelov = utils.pick([`💶`, `💍`, `💎`, `💰`, `🎁`, `⚽`]);
let smilelovf = utils.pick([`ловушкой`, `мышеловкой`, `капканом`]);


let users = require('./database/users.json');
let config = require('./database/settings.json');
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
	console.log(' База данных успешно сохранена.');
	console.log('');
}, 30000);

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
smilerand = utils.pick([`[🍒🍊🍓]`, `[💰🍊🍒]`, `[🍊🍊💰]`, `[🍋🍊🍊]`, `[💰🍓💰]`]);
smilelov = utils.pick([`💶`, `💍`, `💎`, `💰`, `🎁`, `⚽`]);
smilelovf = utils.pick([`ловушкой`, `мышеловкой`, `капканом`]);


}, 1);

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
		var farmbtcm = farmbtc * x.farms;
		x.misc.farm_btc += farmbtcm;
	});
}, 60000);

setInterval(async () => {
	users.filter(x=> x.settings.old == false).map(x=> {
		x.settings.old == true;
	});
}, 604800);

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
		user.promo = false;
		user.energy = 10;
	});
}

function clearPromo()
{
	promo = 0;
	users.map(user => {
		user.promo = false;
	});
}

function msgError(messagetext)
{
	return bot(`${messagetext} ${utils.pick([`😯`, `🙂`, `🤑`, `☺`])}`);
}

clearTemp();
clearPromo();

async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));;
	return true;
}

async function saveConfig()
{
	require('fs').writeFileSync('./database/settings.json', JSON.stringify(config, null, '\t'));
	return true;
}

vk.setOptions({ token: "eaa81331a4fc2950a21113b527b4c3a83da672ed14ec5524c68367e958167433619e45f5dd4a5f1690a3b", pollingGroupId: 177407912 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 5000,
			bank: 0,
			btc: 0,
			farm_btc: 0,
			farms: 0,
			farmslimit: 200,
			energy: 10,
			opit: 0,
			biz: 0,
			zhelezo: 0,
			stag: 0,
			zoloto: 0,
			almaz: 0,
			bizlvl: 0,
			nicklimit: 16,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
				poxod: false,
				poxod2: false,
				kopat: false,
				hack: false
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
			promo: false,
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
				farm: 0,
				pet: 0,
			},
			settings: {
				firstmsg: true,
				adm: 0,
				trade: true,
				old: false,
				limit: 1000000,
			},
			pet: {
				lvl: 0,
				poterl: false
			},
			marriage: {
				partner: 0,
				requests: []
			},
			titles: {
				car: false,
				
			}
		});
		console.log(` +1 игрок [Игроков: ${users.length}]`);
		console.log(``);
		saveUsers();
	}

	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if(message.user.ban) return bot(`ваш аккаунт заблокирован ⛔`);

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.settings.firstmsg)
	{


bot(`я вижу ты новенький! Рад познакомится, отправь «помощь» что бы узнать мои команды. 📚

Беседа с ботом: https://vk.me/join/AJQ1d9O5yQy5EAbeYVYl/Owz`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🔑 Бонус"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "📚 Помощь"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🔋 Ферма"
		},
			"color": "primary"
		}
]
		]
			})
		});

		message.user.settings.firstmsg = false;
		return;

	}

	if(!command)
	{

		if(!message.isChat) return bot(`Такой команды не существует, отправь «помощь» что бы узнать мои команды.${smileerror}`);
		if(message.isChat) return;

	}

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	saveUsers();
	console.log(` Введена команда: ${message.text}.`)
	console.log(``)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start|@club178650735 📚 Помощь)$/i, async (message, bot) => {
	await bot(`мои команды:

[🤑] | Основное:
📒 Профиль
💲 Баланс
👑 Рейтинг - ваш рейтинг
✒ Ник [ник/вкл/выкл]
🏆 Топ
🤝 Передать [id] [сумма]

[💻] | Банк:
💰 ⇢ Банк [сумма/снять сумма] - Положить/Снять деньги в банке
💎 ⇢ Бонус - Ежедневный бонус
📉 ⇢ Курс - Курс валют
💻 ⇢ Банк - банк 

[🔋] | Ферма:
🔋 ⇢ Ферма  - Биткоин Ферма

[🎪] | Магазин:
💊 ⇢ Донат - Донат-магазин.
🛒 ⇢ Магазин - Купить что-то
➖ ⇢ Продать [предмет] - Продать что-то

[👷‍♂] | Работа:
  🔨 Работать
  🔧 "Работа" - список работ
  ⚒ Уволиться

[💼] | Бизнес:
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять
⠀⠀✅ Бизнес улучшить

[🌽] | Питомцы:
⠀⠀🐒 Питомец - информация
⠀⠀🐪 Питомец поход
⠀⠀🌟 Питомец улучшить

💒] | Браки:
  💍⠀⇢ Браки - Список игроков, которые хотят стать вашими партнёрами
  👪 ⇢ Брак [id] - Сделать предложение игроку
  💔 ⇢ Развод - Развестить с игроком

[💡] | Прочее:
⌚ Дата [id] - дата регистрации игрока
⚠ ⇢ Онлайн - список онлайн игроков
⚠ ⇢ Беседы - список наших бесед
🤖 ⇢ Бот - Информация о боте

[💡] | Развлекательные:
📊 Курс
🙊 Анекдот
↪ Переверни [фраза]
🔮 Шар [фраза]
📊 Инфа [фраза]
⚖ Выбери [фраза] или [фраза2

[🎮] ⇢ Игры - Покажет игровые команды

🆘 Репорт [фраза] - ошибки или пожелания`, );
{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🔑 Бонус"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "📚 Помощь"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🔋 Ферма"
		},
			"color": "primary"
		}
]
		]
			})
		};
});

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

	if(message.args[1].includes('брак'))
	{
		return message.send(`Используя команды "Брак", "Браки", "развод", вы можете жениться/выходить замуж/разводиться.
		Брак [id] - сделать предложение
		Браки - список предложений
		Развод - ...`);
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

cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи: "${text.split('').reverse().join('')}"`)
});

cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {

	let textanek = utils.pick(['Разговариваают два американца:\n — У этих русских не только душа другая. Они и устроены по-другому.\n — ?\n — Я сам слышал как один сказал другому — Одень ты на х@й шапку, а то уши замерзнут.', 'Бывает, борешься за что-то, борешься, а потом в один прекрасный момент понимаешь: «А пошло оно все на х@й! » И жить становится намного проще.', '"А это точно поможет? ", — недоверчиво спрашивала царевна Несмеяна, поднося к губам какую-то самокрутку.', 'Чтобы хоть как-то привлечь внимание школьников, преподавательница написала на доске « Жесть. Смотреть всем».', 'Если Патриарх Кирилл верит в Бога, то почему он ездит в бронированном Мерседесе под охраной ФСО за счет бюджета, а не надеется на заступничество своего небесного начальника?']);

	return bot(`анекдот: 

	${textanek}`)
});

cmd.hear(/^(?:книжка)$/i, async (message, bot) => {

	return message.send(`📝Трудовая 
	 📋 Уровень: ${message.user.level} [${message.user.exp}/24]
     📋 Работа: ${works[message.user.work - 1].name}
     📋 Зарплата: ${utils.sp(works[message.user.work - 1].min)}$/10 минут`)
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

cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	return bot(`
❤ || Привилегия: Vip 
🤑 | Стоимость: 5 RUB 

[💬] Команды: 
1) Clear - очистить чат
2) Giverub [id] [сумма] - Выдать $
3) промо лимит - кол-во активаций
4) промо [сумма] - кол-во денег

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

❤ || Привилегия: Админ 
🤑 | Стоимость: 50 RUB 

[💬] Команды: 
1) Removerub [id] - Снять все $
2) Ban [id] - Забанить пользователя
3) Unban [id] - Разбанить пользователя
4) Ответ [id] [Сообщение] - Ответить в репорте
5) Givebtc [id] [сумма] - выдать биткоины
6) Removebtc [id] - забрать все биткоины

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

❤ || Привилегия: Разраб 
🤑 | Стоимость: 250 RUB 

[💬] Команды: 
1) Eval [js code] - Выполнить код
2) Рассылка [Сообщение] - рассылка в беседах
3) Пострассылка [Ссылка на пост] - рассылка поста
4) Поиск [id] - информация об игроке
5) Промо тип btc - сделать промокод на биткоины

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

😏 ⇢ Чтобы приобрести товары, напишите администратору || [akullaaa00|Администратор]`);
});

cmd.hear(/^(?:профиль)$/i, async (message, bot) => {
	let text = ``;

        text += `[❤] || Основное:\n`;
	text += `🆔 ⇢ Ваш ID: ${message.user.uid}\n`;
	text += `💲 ⇢ Наличные: ${utils.sp(message.user.balance)}$\n`;
	text += `💳 ⇢ В банке: ${utils.sp(message.user.bank)}$\n`;
	text += `💽 ⇢ Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 ⇢ Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].tag}`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment || message.user.transport.elk || message.user.transport.pk ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀🐌 Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.transport.elk) text += `&#4448;⠀🎄 ⇢ Елка: ${elka[message.user.transport.elk - 1].name}\n`;
		if(message.user.transport.pk) text += `&#4448;⠀💻 ⇢ Компьютер: ${peka[message.user.transport.pk - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	text += `\n📗 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:zz|eval|dev)\s([^]+)$/i, async (message, bot) => {
        if(message.user.adm < 4) return message.send("Доступ только CREATOR")

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

cmd.hear(/^(?:get)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
			let text = ``;	
	text += `📕 Информация об игроке\n`;
	text += `🆔 ⇢ ID: ${user.uid}\n`;
	text += `🔗 ⇢ Ссылка:  vk.com/id${user.id}\n`;
	text += `💲 ⇢ Наличные: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 ⇢ На банковск счете: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 ⇢ Биткоинов: ${utils.sp(user.btc)}\n`;
	text += `👑 ⇢ Рейтинг: ${utils.sp(user.rating)}\n`;
	if(user.work) text += `👔 ⇢ Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `👬 ⇢ Партнер: ${users[user.marriage.partner].tag}`;
	text += `🌟 ⇢ Уровень: ${user.level} [${user.exp}/24]\n`;
	if(user.foolder) text += `&#4448;&#128228; ⇢ Использовано команд: ${message.user.foolder}\n`;
    if(user.floder) text += `&#4448;&#128229; ⇢ Всего сообщfений: ${message.user.floder}\n`;

	if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.transport.pet || user.transport.elk || user.transport.pk || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.business || user.misc.pet)
	{
		text += `\n?? Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 ⇢ Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht) text += `⠀🛥 ⇢ Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += ` 🛩 ⇢ Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 ⇢ Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
		
		if(user.realty.home) text += `⠀🏠 ⇢ Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 ⇢ Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 ⇢ Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 ⇢ Ферма: ${farms[user.misc.farm - 1].name}\n`;
		if(user.transport.pet) text += `⠀🐼 ⇢ Питомец: ${pets[user.transport.pet - 1].name}\n`;
		if(user.transport.elk) text += `⠀🎄 ⇢ Елка: ${elka[user.transport.elk - 1].name}\n`;
		if(user.transport.pk) text += `💻 ⇢ Компьютер: ${peka[user.transport.pk - 1].name}\n`;
		if(user.business) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}
	text += `\n📗 ⇢ Дата регистрации в боте: ${user.regDate}`;
	return bot(`профиль игрока:\n${text}`);
	});


cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.balance)}$ 💸`;

	if(message.user.bank) text += `\n💳 В банке ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n💽 Биткоинов ${utils.sp(message.user.btc)}฿`;
	if(message.user.zhelezo) text += `\n🎛 ${message.user.zhelezo} железа`;
	if(message.user.zoloto) text += `\n🏵 ${message.user.zoloto} золота`;
	if(message.user.almaz) text += `\n💎 ${message.user.almaz} алмаза`;

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
	if(message.args[1] > 250000000000) return bot(`максимальная сумма вклада 250.000.000.000$`);

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
	if(!message.user.settings.trade) return bot(`у вас установлен бан передачи ${smileerror}`);

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		if(user.uid === message.user.uid) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])}$ ${smilesuccess}
		💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
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

	if(message.args[1].length > message.user.nicklimit) return bot(`вы указали длинный ник. ${smileerror}`);

	message.user.tag = message.args[1];
	let smilenick = utils.pick([`😯`, `🙂`, `☺`]);
	let ggtext = utils.pick([`фантастический`, `крутой`, `классный`, `прикольный`]);
	return bot(`${ggtext} ник! ${smilenick}`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`разделы магазина:

🚙 Транспорт:
⠀⠀🚗 ⇢ Машины
⠀⠀🛥 ⇢ Яхты
⠀⠀🛩 ⇢ Самолеты
⠀⠀🚁 ⇢ Вертолеты

🏘 Недвижимость:
⠀⠀🏠 ⇢ Дома
⠀⠀🌇 ⇢ Квартиры

📌 Остальное:
  🐌 ⇢ Питомцы
  🎄 ⇢ Елки
  💻 ⇢ Компьютеры
⠀⠀📱 ⇢ Телефоны
⠀⠀⭐ ⇢ Фермы
⠀⠀👑 ⇢ Рейтинг [кол-во] - $250 млн
⠀⠀💼 ⇢ Бизнесы
⠀⠀💽 ⇢ Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});

cmd.hear(/^(?:игры)$/i, async (message, bot) => {
	return bot(`[🕹] || Игры:

🎲 ⇢ Кубик [1-6]
🎰 ⇢ Казино [сумма]
🚕 ⇢ Таксовать - таксовать
🍂 ⇢ Копать - копать руду
🌲 ⇢ Поход - сходить в поход
👮 ⇢ Взломать
✈ ⇢ Летчик - работать летчиком
📈 ⇢ Трейд [вверх/вниз] [сумма]
🥛 ⇢ Стаканчик [1-3] [сумма]
🔦 ⇢ Сейф [случайные 2 цифры] 
🌟 ⇢ Монетка [сумма] [орел/решка]
👛 ⇢ Ловушка [сумма]`);
});

//ловушка
cmd.hear(/^(?:ловушка)\s(.*)$/i, async (message, bot) => {
  if(!message.args[1]) return message.send(`укажите ставку`);	
  let text = parserInt(message.args[1]); 
  if(!Number(text)) return bot(`ставка должна быть целым числом.`); 
  if(!text) return bot("укажите ставку!");
  if(!message.args[1]) return bot(`Вы не указали ставку`);
  if(text > message.user.balance || text <= 0) return bot(text <= 0 ? `ставка не может быть меньше 0 или равна 0` : `ставка не может превышать баланс`);
{
 	if(rand(1,100) > 50) {
        let win = text * 2;
        message.user.balance += Math.round(win);   
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n[😎] ⇢ Из нее вы достали -> ${smilelov} \n💴 ⇢ Вы выиграли:  ${spaces(win)}$`);
    }else{
        let win = text;
        message.user.balance -= Math.round(win);  
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n[💀] ⇢ Какая неудача... Вы повредили руку -> ${smilelovf} \n[💴] ⇢ Вы проиграли:  ${spaces(win)}$`);
   
    } 		

}
})

var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));

function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}

Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

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

//монетка
cmd.hear(/^(?:монетка)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {


    if(!message.args[1]) return message.reply(`Ⓜ ⇢ Проверьте вводимые данные:\nⓂ ⇢  монетка ставка орел/решка`);
    let user = message.user;
    if(message.args[1] > message.user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   	
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[^_^] ⇢ Вы выиграли: ${spaces(message.args[1])}$\n[$] ⇢ Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[-_-] ⇢ Вы проиграли: ${spaces(message.args[1])}$\n[$] ⇢ Баланс: ${spaces(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[-_-] ⇢ Вы проиграли: ${spaces(message.args[1])}$\n[$] ⇢ Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[^_^] ⇢ Вы выиграли: ${spaces(message.args[1])}$\n[$] ⇢ Баланс: ${spaces(user.balance)}`);
    		}
   		 }
	return message.reply(`[Подсказка] ⇢ монетка [ставка] [орел/решка]`);
});

//таксовать
cmd.hear(/^(?:Таксовать)$/i, async (message, bot) => {

if(!message.user.transport.car) return message.reply(`⚠ У вас нет машины.`);
if(message.user.balance < 500000) return message.reply(`⚠ Вы должны иметь на балансе как минимум 500.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 500000;

return message.reply(` [${['😐','🤐', '😝', '😰', '🤧'].random()}] Вы были пойманы на нарушении правил ПДД.\n⚠ ⇢ Штраф: 500.000$ `);
}

let km = utils.random(3, 50);
message.user.balance += km * 100000

return message.reply(` [${['😎','🤤', '😌', '😉', '🤑'].random()}] Вы успешно довезли пассажира. ✅

🔝 ⇢ Расстояние: ${km} км.
💲 ⇢ Вы получили ${utils.sp(km * 100000)}$`); 


});

//летчик
cmd.hear(/^(?:Летчик)$/i, async (message, bot) => {

if(!message.user.transport.airplane) return message.reply(`⚠ ⇢ У вас нет самолета.`);
if(message.user.balance < 500000) return message.reply(`⚠ ⇢ Вы должны иметь на балансе как минимум 500.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 500000;

return message.reply(` [${['😐','🤐', '😝', '😰', '🤧'].random()}] Ваш самолет был задержан.\n⚠ ⇢ Вы потеряли: 500.000$ `);
}

let km = utils.random(3, 50);
message.user.balance += km * 100000

return message.reply(` [${['😎','🤤', '😌', '😉', '🤑'].random()}] Вы успешно слетали,пассажиры довольны. ✅

🔝 ⇢ Расстояние: ${km} км.
💲 ⇢ Вы получили ${utils.sp(km * 100000)}$`); 


});

//онлайн
cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
	message.user.foolder += 1;
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "online"
    }).then(async function (response) {
        let text = `[😎] || Список людей, которые сейчас находятся онлайн:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.online != 0) text += `${['😍', '😎', '😏', '🙂', '🙃', '😌', '🤤', '😇', '😳', '😂', '😝', '🙄', '😝', '😘', '😗', '😙', '😛', '🤑'].random()} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.reply(text)
    })
});

//беседы
cmd.hear(/^(?:беседы)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`
	        📘 ⇢ Ссылки на наши беседы: 
 
			https://vk.me/join/AJQ1d9O5yQy5EAbeYVYl/Owz
			`);
});

//бот информация
cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	message.user.foolder += 1;

const percent = utils.random(100);
const ping = utils.random(300);
	await message.send(`[📖] ⇢ Техническая информация:

     ♥️ ⇢ Проект: [sindigame|BotSindi]
	 💻 ⇢ Версия бота: 1.0
	 💊 ⇢ Создатель: @akullaaa00(Никита Тарасов)  
	 
	 📗 ⇢ Пользователей: ${users.length}
	 
	 📜 ⇢ @club177407912(Группа)
	 ❤ ⇢ Нагрузка: ${percent}%
	 📡 ⇢ Пинг: ${ping}
`);
});	


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
		if(!message.user.transport.car) return bot(`у вас нет машины ${smileerror}`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}$`);
	}

	if(/питом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.pet) return bot(`у вас нет питомца ${smileerror}`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);

		message.user.balance += Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		message.user.misc.pet = 0;
		message.user.pet.lvl = 0;
		message.user.pet.poterl = false;

		return bot(`вы продали своего питомца за ${utils.sp(a)}$`);
	}
	
	if(/(е|ё|йо)лк/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.elk) return bot(`У вас нет елки`);
		let a = Math.floor(elka[message.user.transport.elk - 1].cost * 0.85);

		message.user.balance += Math.floor(elka[message.user.transport.elk - 1].cost * 0.85);
		message.user.transport.elk = 0;

		return bot(`Вы продали свою елку за ${utils.sp(a)}$`);
	}

    if(/компьютер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.pk) return bot(`У вас нет компьютера`);
		let a = Math.floor(peka[message.user.transport.pk - 1].cost * 0.85);

		message.user.balance += Math.floor(peka[message.user.transport.pk - 1].cost * 0.85);
		message.user.transport.pk = 0;

		return bot(`Вы продали свой компьютер за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты ${smileerror}`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}
	
	if(/желез/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zhelezo < 1) return bot(`у Вас нет железа. ⚠`);
		let a2 = message.user.zhelezo * 15000;

		var zhelezosda = message.user.zhelezo;

		message.user.balance += message.user.zhelezo * 15000;
		message.user.zhelezo = 0;

		return bot(`вы продали ${zhelezosda} железа за ${utils.sp(a2)}$ ✅`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.almaz < 1) return bot(`у Вас нет алмазов. ⚠`);
		let a3 = message.user.almaz * 100000;

		var zhelezosda2 = message.user.almaz;

		message.user.balance += message.user.almaz * 100000;
		message.user.almaz = 0;

		return bot(`вы продали ${zhelezosda2} алмазов за ${utils.sp(a3)}$ ✅`);
	}

	if(/золот/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zoloto < 1) return bot(`у Вас нет золота. ⚠`);
		let a4 = message.user.zoloto * 50000;

		var zhelezosda3 = message.user.zoloto;

		message.user.balance += message.user.zoloto * 50000;
		message.user.zoloto = 0;

		return bot(`вы продали ${zhelezosda3} золота за ${utils.sp(a4)}$ ✅`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта ${smileerror}`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали свой самолёт за ${utils.sp(a)}$`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у вас нет самолёта ${smileerror}`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`вы продали свой вертолёт за ${utils.sp(a)}$`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома ${smileerror}`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у вас нет квартиры ${smileerror}`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`вы продали свою квартиру за ${utils.sp(a)}$`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона ${smileerror}`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}$`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.farm) return bot(`у вас нет ферм ${smileerror}`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		let a2 = a*message.user.farms;

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		bot(`вы продали ${farms[message.user.misc.farm - 1].name} (x${message.user.farms}) за ${utils.sp(a2)}$ ${smilesuccess}`);
		message.user.misc.farm = 0;
		message.user.farms = 0;
		return;
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга ${smileerror}`);
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
		message.user.bizlvl = 0;

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
${message.user.transport.car === 1 ? '🔸' : '🚗'} 1. Скейтборд (750$)
${message.user.transport.car === 2 ? '🔸' : '🚗'} 2. Ролики (2.000$)
${message.user.transport.car === 3 ? '🔸' : '🚗'} 3. Самокат (6.000$)
${message.user.transport.car === 4 ? '🔸' : '🚗'} 4. Велосипед (15.000$)
${message.user.transport.car === 5 ? '🔸' : '🚗'} 5. Гироскутер (35.000$)
${message.user.transport.car === 6 ? '🔸' : '🚗'} 6. Мопед (70.000$)
${message.user.transport.car === 7 ? '🔸' : '🚗'} 7. ВАЗ 2103 (125.000$)
${message.user.transport.car === 8 ? '🔸' : '🚗'} 8. Мотоцикл SP110C-1A (170.000$)
${message.user.transport.car === 9 ? '🔸' : '🚗'} 9. Квадроцикл МОТАХ (260.000$)
${message.user.transport.car === 10 ? '🔸' : '🚗'} 10. AUDI A2 (300.000$)
${message.user.transport.car === 11 ? '🔸' : '🚗'} 11. Toyota Mark II (450.000$)
${message.user.transport.car === 12 ? '🔸' : '🚗'} 12. LADA АМТ (800.000$)
${message.user.transport.car === 13 ? '🔸' : '🚗'} 13. BMW X1 (1.200.000$)
${message.user.transport.car === 14 ? '🔸' : '🚗'} 14. Ford Explorer (2.000.000$)
${message.user.transport.car === 15 ? '🔸' : '🚗'} 15. BMW Z4 M (2.500.000$)
${message.user.transport.car === 16 ? '🔸' : '🚗'} 16. Citroen Berlingo (3.400.000$)
${message.user.transport.car === 17 ? '🔸' : '🚗'} 17. Porsche 718 Cayman S (4.000.000$)
${message.user.transport.car === 18 ? '🔸' : '🚗'} 18. Lamborghini Gallardo (5.500.000$)
${message.user.transport.car === 19 ? '🔸' : '🚗'} 19. Subaru WRX (7.500.000$)
${message.user.transport.car === 20 ? '🔸' : '🚗'} 20. Tesla model X P100D (12.000.000$)
${message.user.transport.car === 21 ? '🔸' : '🚗'} 21. Ferrari 488 Pista (30.000.000$)
${message.user.transport.car === 22 ? '🔸' : '🚗'} 22. Koenigsegg Regera (40.000.000$)
${message.user.transport.car === 23 ? '🔸' : '🚗'} 23. Ferrari F60 (90.000.000$)
${message.user.transport.car === 24 ? '🔸' : '🚗'} 24. Aston Martin Valkyrie (150.000.000$)
${message.user.transport.car === 25 ? '🔸' : '🚗'} 25. Lamborghini Venen (400.000.000$)
${message.user.transport.car === 26 ? '🔸' : '🚗'} 26. Koenigsegg CCXR Trevita (750.000.000$)

⚠ ⇢ Для покупки введите "Машина [номер]"
⚠ ⇢ Для продажи машины "Продать машину"
🚘 ⇢ Таксовать - таксовать"`);

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
${message.user.transport.yacht === 1 ? '🛥' : '🚤'} 1. Carer X (10.000$)
${message.user.transport.yacht === 2 ? '🛥' : '🚤'} 2. Nauticat F (10.000.000$)
${message.user.transport.yacht === 3 ? '🛥' : '🚤'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '🛥' : '🚤'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '🛥' : '🚤'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '🛥' : '🚤'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '🛥' : '🚤'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '🛥' : '🚤'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '🛥' : '🚤'} 9. Palmer Johnson 42M (80.000.000$)
${message.user.transport.yacht === 10 ? '🛥' : '🚤'} 10. Wider FR (85.000.000$)
${message.user.transport.yacht === 11 ? '🛥' : '🚤'} 11. Browns (150.000.000$)
${message.user.transport.yacht === 12 ? '🛥' : '🚤'} 12. Golden Sky (300.000.000$)
${message.user.transport.yacht === 13 ? '🛥' : '🚤'} 13. Streets of Monaco (750.000.000$)

⚠ ⇢ Для покупки введите "Яхта [номер]"
⚠ ⇢ Для продажи введите "Продать яхту"`);

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
${message.user.transport.airplane === 1 ? '🚀' : '✈'} 1. Небольшой планер (10.000$)
${message.user.transport.airplane === 2 ? '🚀' : '✈'} 2. Параплан (75.000$)
${message.user.transport.airplane === 3 ? '🚀' : '✈'} 3. Як-40 (400.000$)
${message.user.transport.airplane === 4 ? '🚀' : '✈'} 4. ВиС 1 (900.000$)
${message.user.transport.airplane === 5 ? '🚀' : '✈'} 5. Tundra (1.200.000$)
${message.user.transport.airplane === 6 ? '🚀' : '✈'} 6. СА-20П (1.750.000$)
${message.user.transport.airplane === 7 ? '🚀' : '✈'} 7. Л-39 (3.000.000$)
${message.user.transport.airplane === 8 ? '🚀' : '✈'} 8. Boeing 737-500 (6.000.000$)
${message.user.transport.airplane === 9 ? '🚀' : '✈'} 9. Piper M350 (15.000.000$)
${message.user.transport.airplane === 10 ? '🚀' : '✈'} 10. Beechcraft Baron 58P (25.000.000$)
${message.user.transport.airplane === 11 ? '🚀' : '✈'} 11. УТ-2Б (45.000.000$)
${message.user.transport.airplane === 12 ? '🚀' : '✈'} 12. Beechcraft 60 Duke (80.000.000$)
${message.user.transport.airplane === 13 ? '🚀' : '✈'} 13. ТР-301ТВ (150.000.000$)
${message.user.transport.airplane === 14 ? '🚀' : '✈'} 14. Л-410УВП (280.000.000$)
${message.user.transport.airplane === 15 ? '🚀' : '✈'} 15. C-17A Globemaster III (400.000.000$)
${message.user.transport.airplane === 16 ? '🚀' : '✈'} 16. Boeing 747SP (750.000.000$)
${message.user.transport.airplane === 17 ? '🚀' : '✈'} 17. Gulfstream IV (1.000.000.000$)

⚠ ⇢ Для покупки введите "Самолет [номер]"
⚠ ⇢ Для продажи введите "Продать самолет"
✈ ⇢ Летчик - работать летчиком`);

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
${message.user.transport.helicopter === 1 ? '🔹' : '🚁'} 1. Вентилятор (500$)
${message.user.transport.helicopter === 2 ? '🔹' : '🚁'} 2. Robinson R44 Raven I (400.000$)
${message.user.transport.helicopter === 3 ? '🔹' : '🚁'} 3. Ка-32С (750.000$)
${message.user.transport.helicopter === 4 ? '🔹' : '🚁'} 4. Ми-8Т (1.200.000$)
${message.user.transport.helicopter === 5 ? '🔹' : '🚁'} 5. Аgusta Westland 119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '🔹' : '🚁'} 6. Ми-8МТВ-1 (3.750.000$)
${message.user.transport.helicopter === 7 ? '🔹' : '🚁'} 7. Bell 205A-1 (4.800.000$)
${message.user.transport.helicopter === 8 ? '🔹' : '🚁'} 8. AW109 Power (7.500.000$)
${message.user.transport.helicopter === 9 ? '🔹' : '🚁'} 9. Eurocopter EC155 B1 Dauphin (12.000.000$)
${message.user.transport.helicopter === 10 ? '🔹' : '🚁'} 10. AgustaWestland AW149 (18.000.000$)
${message.user.transport.helicopter === 11 ? '🔹' : '🚁'} 11. Eurocopoter AS332 L1 Super Puma (25.000.000$)
${message.user.transport.helicopter === 12 ? '🔹' : '🚁'} 12. Kazan Mi-171A2 (40.500.000$)
${message.user.transport.helicopter === 13 ? '🔹' : '🚁'} 13. Sikorsky S-92 Cougar (70.000.000$)

⚠ ⇢ Для покупки введите "Вертолет [номер]"
⚠ ⇢ Для продажи введите "Продать вертолет"`);

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
${message.user.realty.home === 1 ? '🔹' : '🏡'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '🔹' : '🏡'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '🔹' : '🏡'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '🔹' : '🏡'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '🔹' : '🏡'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '🔹' : '🏡'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '🔹' : '🏡'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '🔹' : '🏡'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '🔹' : '🏡'} 9. Кирпичный дом (80.000$)
${message.user.realty.home === 10 ? '🔹' : '🏡'} 10. Коттедж (450.000$)
${message.user.realty.home === 11 ? '🔹' : '🏡'} 11. Особняк (1.250.000$)
${message.user.realty.home === 12 ? '🔹' : '🏡'} 12. Дом на Рублёвке (5.000.000$)
${message.user.realty.home === 13 ? '🔹' : '🏡'} 13. Личный небоскрёб (7.000.000$)
${message.user.realty.home === 14 ? '🔹' : '🏡'} 14. Остров с особняком (12.500.000$)
${message.user.realty.home === 15 ? '🔹' : '🏡'} 15. Белый дом (20.000.000$)

⚠ ⇢ Для покупки введите "Дом [номер]
⚠ ⇢ Для продажи введите "Продать дом"`);

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

⚠ ⇢ Для покупки введите "Квартира [номер]"
⚠ ⇢ Для продажи введите "Продать квартиру"`);

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

cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 105 (1.500$)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Philips Xenium E168 (4.000$) 
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. Xiaomi Redmi 6A 2 (6.000$) 
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. Digma LINX ATOM 3G (9.000$) 
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Alcatel 1 (12.000$) 
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Honor 9 Lite (20.000$) 
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Samsung Galaxy J6 (36.000$)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. IPhone 5 (60.000$)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. Xperia XZ Premium (100.000$)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. Samsung Galaxy J8 (300.000$) 
${message.user.misc.phone === 11 ? '🔹' : '🔸'} 11. IPhone X (1.500.000$)
${message.user.misc.phone === 12 ? '🔹' : '🔸'} 12. IPhone 3GS Supreme (5.000.000$)

⚠ ⇢ Для покупки введите "Телефон [номер]"
⚠ ⇢ Для продажи введите "Продать телефон"`);

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

cmd.hear(/^(?:Елки)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`
	        🎄🎁 1.Ель обыкновенная - 50.000 $
            🎄🎁 2.Ель канадская - 900.000 $
            🎄🎁 3.Ель французская - 1.000.000 $
            🎄🎁 4.Ель русская - 5.000.000 $

			 
			🎄 ⇢ Для покупки напишите: "Елки [номер]"
			🎄 ⇢ Для продажи напишите: "Продать елку"
`);

	const sell = elka.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.elk) return bot(`У вас уже есть елка (${elka[message.user.transport.elk - 1].name}), введите "Продать елку"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.elk = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Компьютеры)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`
	       👾Компьютеры👾 

           💻 1. TOPCOMP MG 5567830 GL503VD (32.500) 
           💻 2. COMPYOU GAME PC G777 (74.000) 
           💻 3. RIWER GAME-GTX (G9-793) (96.000) 
		   💻 4. ASUS ROG GR8II-T055Z (105.000)
           💻 5. KEY GM PRO (117.600)
           💻 6. MSI VORTEX G65VR 7RE (130.000)
		   💻 7. ARENA A085885 (325.000)
		   💻 8. DELL XPS TOWER SPECIAL EDITION (486.000)
		   💻 9. APPLE IMAC С ЭКРАНОМ 5K RETINA (564.000)
		   💻 10. SURFACE STUDIO (835.000)

           💻Для покупки введите "Компьютеры [номер]"
			⚠ ⇢ Для продажи введите "Продать компьютер" 
			⚠ ⇢ При продаже вернется 75% от суммы.
`);

	const sell = peka.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.pk) return bot(`У вас уже есть компьютер (${peka[message.user.transport.pk - 1].name}), введите "Продать компьютер"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.pk = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`питомцы:
🐌 1. Улитка (1.000$)
🐸 2. Лягушка (25.000$)
🐰 3. Заяц (500.000$)
🐷 4. Свинья (300.000.000$)
🦊 5. Лиса (1.250.000.000$)
🐶 6. Собака (5.000.000.000$)
🐼 7. Панда (30.000.000.000$)
🦍 8. Горилла (180.000.000.000$)

🚩Для покупки введите "Питомцы [номер]"`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.pet) return bot(`у Вас уже есть питомец. ${smileerror}`);

	if(message.user.balance < sell.cost) return bot(`вам нужно ${utils.sp(sell.cost)}$ для покупки. ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.pet = sell.id;
		message.user.pet.lvl += 1;

		return bot(`вы успешно купили себе питомца, отправляйте его в поход и прокачивайте его уровень. ${smilesuccess}`);
	}
});

cmd.hear(/^(?:питомец)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {
return bot(`информация:
🐌 Питомец: «${pets[message.user.misc.pet - 1].name}»
💳 Стоимость улучшения: ${utils.sp(petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl)}$
🌟 Уровень: ${message.user.pet.lvl}`);
}

});

cmd.hear(/^(?:промо бабки)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
if(message.user.promo) return bot(`вы уже активировали промокод. ${smileerror}`);
else 
{

	if(promo >= promolimit) return bot(`у этого промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ, включи уведомления в группе о новых записях что бы узнавать ОДНИМ ИЗ ПЕРВЫХ о новых промокодах. 📢`);
	if(promotip === "btc") message.user.btc += promovalue;
	if(promotip === "balance") message.user.balance += promovalue;
	message.user.promo = true;
	promo += 1;
	ostalos = promolimit-promo;
	return bot(`зачислено +${utils.sp(promovalue)}${promotip.toString().replace(/btc/gi, "฿").replace(/balance/gi, "$")} ✅
📢 Осталось ${ostalos} использований.`);

}

});

cmd.hear(/^(?:питомец улучшить)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`недостаточно денег. ${smileerror}`);

		var priceupd = petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl;

		var lvlpoupd = message.user.pet.lvl+1;

		message.user.balance -= priceupd;
		message.user.pet.lvl += 1;

		return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);


}

});

cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.timers.poxod) return bot(`вы сможете отправить питомца в поход через 60 минут. Ваш питомец довольно сильно устал! ${smileerror}`);

		let cashfind = utils.random(736,2879);
		message.user.balance += cashfind;
		message.user.timers.poxod = true;

			setTimeout(() => {
				message.user.timers.poxod = false;
			}, 3600000);

		return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`);
}

});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм. ${smileerror}`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{

		if(Number(message.args[2])){

		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

			message.user.balance -= sell.cost;
			message.user.misc.farm = sell.id;
			message.user.farms += message.args[2];

			saveUsers();
			return bot(`вы купили ${sell.name} (x${message.args[2]}) за ${utils.sp(sell.cost)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);

		}
		else {

		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;
		message.user.farms += 1;

		saveUsers();
		return bot(`вы купили ${sell.name} (x1) за ${utils.sp(sell.cost)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		}	
	}
});

cmd.hear(/^(?:фермы 1)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`);

	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм. ${smileerror}`);

	if(message.user.balance < 20500000) return bot(`недостаточно денег ${smileerror}`);
	else if(message.user.balance >= 20500000)
	{

		var pricefarms1 = 20500000*message.args[1];

		message.user.balance -= pricefarms1;
		message.user.misc.farm = 1;

		if(message.user.misc.farm === 1) message.user.farms += Number(message.args[1]);
		else
		{

			message.user.farms = Number(message.args[1]);

		}

		saveUsers();
		return bot(`вы купили 6U Nvidia (x${Number(message.args[1])}) за ${utils.sp(pricefarms1)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
			
	}
});

cmd.hear(/^(?:фермы 2)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`);

	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм. ${smileerror}`);

	if(message.user.balance < 100000000) return bot(`недостаточно денег ${smileerror}`);
	else if(message.user.balance >= 100000000)
	{

		var pricefarms2 = 100000000*message.args[1];

		message.user.balance -= pricefarms2;
		message.user.misc.farm = 2;

		if(message.user.misc.farm === 2) message.user.farms += Number(message.args[1]);
		else
		{

			message.user.farms = Number(message.args[1]);

		}

		saveUsers();
		return bot(`вы купили AntminerS9 (x${Number(message.args[1])}) за ${utils.sp(pricefarms2)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
			
	}
});

cmd.hear(/^(?:фермы 3)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`);

	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм. ${smileerror}`);

	if(message.user.balance < 900000000) return bot(`недостаточно денег ${smileerror}`);
	else if(message.user.balance >= 900000000)
	{

		var pricefarms3 = 900000000*message.args[1];

		message.user.balance -= pricefarms3;
		message.user.misc.farm = 3;

		if(message.user.misc.farm === 3) message.user.farms += Number(message.args[1]);
		else
		{

			message.user.farms = Number(message.args[1]);

		}

		saveUsers();
		return bot(`вы купили FM2018-BT200 (x${Number(message.args[1])}) за ${utils.sp(pricefarms3)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
			
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

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 250000000)}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🔸' : '🚬'} 1. Сбор макулатуры | 750.000$
⠀ ⠀ ⠀ Прибыль: 15.000$/час
${message.user.business === 2 ? '🔸' : '🚬'} 2. Киоск | 1.300.000$ 
⠀ ⠀ ⠀ Прибыль: 40.000$/час
${message.user.business === 3 ? '🔸' : '🚬'} 3. Завод по переработке мусора | 6.000.000$
⠀ ⠀ ⠀ Прибыль: 65.000$/час
${message.user.business === 4 ? '🔸' : '🚬'} 4. Небольшой магазин | 17.500.000$
⠀ ⠀ ⠀ Прибыль: 100.000$/час
${message.user.business === 5 ? '🔸' : '🚬'} 5. Супермаркет | 28.000.000$
⠀ ⠀ ⠀ Прибыль: 145.000$/час
${message.user.business === 6 ? '🔸' : '🚬'} 6. Рекламное агентство | 45.000.000$
⠀ ⠀ ⠀ Прибыль: 200.000$/час
${message.user.business === 7 ? '🔸' : '🚬'} 7. Ломбард | 75.000.000$
⠀ ⠀ ⠀ Прибыль: 225.000$/час
${message.user.business === 8 ? '🔸' : '🚬'} 8. Популярный бар | 100.000.000$
⠀ ⠀ ⠀ Прибыль: 265.000$/час
${message.user.business === 9 ? '🔸' : '🚬'} 9. ТЭЦ | 160.000.000$
⠀ ⠀ ⠀ Прибыль: 300.000$/час
${message.user.business === 10 ? '🔸' : '🚬'} 10. Компания по разработке игр | 275.000.000$
⠀ ⠀ ⠀ Прибыль: 350.000$/час
${message.user.business === 11 ? '🔸' : '🚬'} 11. Банк | 275.000.000$
⠀ ⠀ ⠀ Прибыль: 400.000$/час
${message.user.business === 12 ? '🔸' : '🚬'} 12. Агентство недвижимости | 350.000.000$
⠀ ⠀ ⠀ Прибыль: 425.000$/час
${message.user.business === 13 ? '🔸' : '🚬'} 13. Наркопритон | 500.000.000$
⠀ ⠀ ⠀ Прибыль: 450.000$/час
${message.user.business === 14 ? '🔸' : '🚬'} 14. АЭС | 700.000.000$
⠀ ⠀ ⠀ Прибыль: 500.000$/час
${message.user.business === 15 ? '🔸' : '🚬'} 15. Майнинг биткоинов | 1.200.000.000$
⠀ ⠀ ⠀ Прибыль: 600.000$/час

⚠ ⇢ Для покупки введите "Бизнесы [номер]"
⚠ ⇢ Для продажи введите "Продать бизнес"
⚠ ⇢ "Бизнес" - статистика бизнеса
⚠ ⇢ "Бизнес снять" - снять деньги со счета
⚠ ⇢ Бизнес улучшить - улучшить свой бизнес"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

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
	message.user.foolder += 1;

	return bot(`Вот список топов:

		[$] ⇢ Топ баланс
		[₿] ⇢ Топ биткоинов`);
});

cmd.hear(/^(?:топ баланс)$/i, async (message, bot) => {
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

	for (let i = 0; i < 3; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑${utils.sp(user.rating)} | $${utils.rn(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} | $${utils.rn(message.user.balance)}`);
});

cmd.hear(/^(?:топ биткоинов)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let top = [];

	users.map(x=> {
		top.push({ btc: x.btc, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.btc - a.btc;
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

	for (let i = 0; i < 3; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ${utils.sp(user.btc)}₿
		`;
	}

	return message.send(`Топ игроков по Биткоинам:
		${text}
—————————————————

${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.btc)}₿`);
});

cmd.hear(/^(?:бонус|🔑 Бонус|@club178650735 🔑 Бонус)$/i, async (message, bot) => {

	if(message.user.timers.bonus) return bot(`бонус можно получить раз в 24 часа ${smileerror}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;


	if(prize === 1)
	{
		message.user.balance += 50000;
		return bot(`вы выиграли 50.000$ ${smilesuccess}`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`вы выиграли 1.000₿ ${smilesuccess}`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		return bot(`вы выиграли 5👑`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		return bot(`вы выиграли 1👑`);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		return bot(`вы выиграли 10👑`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		return bot(`вы выиграли 2👑`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		return bot(`вы выиграли 3👑`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		return bot(`вы выиграли 4👑`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		return bot(`вы выиграли 1.000.000$ на свой банковский счёт ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		return bot(`вы выиграли 5.000.000$ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		return bot(`вы выиграли 10.000.000$ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		return bot(`вы выиграли 50.000.000$ на свой банковский счёт ${smilesuccess}`);
	}
});

cmd.hear(/^(?:поход)$/i, async (message, bot) => {

	if(message.user.timers.poxod2) return bot(`вы сегодня уже были в походе. ${smileerror}`);

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

	setTimeout(() => {
		message.user.timers.poxod2 = false;
	}, 86400000);

	message.user.timers.poxod2 = true;


	if(prize2 === 1)
	{
		message.user.balance += 50000;
		return bot(`находясь в походе, вы нашли 50.000$ ${smilesuccess}`);
	}

	if(prize2 === 2)
	{
		message.user.btc += 1000;
		return bot(`находясь в походе, вы нашли 1.000₿ ${smilesuccess}`);
	}

	if(prize2 === 3)
	{
		message.user.rating += 5;
		return bot(`находясь в походе, вы нашли 5👑`);
	}

	if(prize2 === 4)
	{
		message.user.rating += 1;
		return bot(`находясь в походе, вы нашли 1👑`);
	}

	if(prize2 === 5)
	{
		message.user.rating += 10;
		return bot(`находясь в походе, вы нашли 10👑`);
	}

	if(prize2 === 6)
	{
		message.user.rating += 2;
		return bot(`находясь в походе, вы нашли 2👑`);
	}
	if(prize2 === 7)
	{
		message.user.rating += 3;
		return bot(`находясь в походе, вы нашли 3👑`);
	}
	if(prize2 === 8)
	{
		message.user.rating += 4;
		return bot(`находясь в походе, вы нашли 4👑`);
	}
});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже в браке с игроком ${users[message.user.marriage.partner].tag}`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете жениться/выйти замуж за себя`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

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
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

	return bot(`дата регистрации ${user.tag}: ${user.regDate}`);
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`команда работает только в ЛС.`);

	vk.api.messages.send({ user_id: config.ownerid, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		return bot(`ваше сообщение отправлено.`);
	}).catch((err) => {
		return bot(`укажите свой ID в файле /database/settings.json`);
	});
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `✉ Сообщение от администратора:
	Язык: 🇷🇺
	
	${message.args[2]}` });
	
	return bot(`вы ответили игроку *id${user.id} (${user.tag}).`);
	
});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});

cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name} 
	[💡] ⇢ Информация о вашей работе - "Книжка"
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
	[💡] ⇢ Информация о вашей работе - "Книжка"
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	👔 1. Дворник || Зарплата ~2.000$ || Левел: 1
	👔 2. Сторож || Зарплата ~3.750$ || Левел: 2
	👔 3. Продавец || Зарплата ~4.000$ || Левел: 3
	👔 4. Няня || Зарплата ~6.000$ || Левел: 4
	👔 5. Курьер || Зарплата ~7.500$ || Левел: 5
	👔 6. Слесарь || Зарплата ~9.000$ || Левел: 6
	👔 7. Охранник -|| Зарплата ~10.000$ || Левел: 7
	👔 8. Библиотекарь || Зарплата ~12.500$ || Левел: 8
	👔 9. Воспитатель || Зарплата ~14.500$ || Левел: 9
	👔 10. Педагог || Зарплата ~16.000$ || Левел: 10
	👔 11. Повар || Зарплата ~17.500$ || Левел: 11
	👔 12. Грузчик || Зарплата ~19.500$ || Левел: 12
	👔 13. Парикмахер || Зарплата ~23.500$ || Левел: 13
	👔 14. Врач || Зарплата ~24.500$ || Левел: 14
	👔 15. Торговый представитель || Зарплата ~26.500$ || Левел: 15
	👔 16. Специалист по валютным операциям || Зарплата ~55.500$ || Левел: 16
	👔 17. Юрист по налоговому праву || Зарплата ~70.500$ || Левел: 17
	👔 18. Программист PHP || Зарплата ~90.500$ || Левел: 18

	[💡] ⇢ Для усройства на работу - "Работа [номер]" 
    [💡] ⇢ Для для того, чтобы уволиться - "Уволиться"
	[💡] ⇢ Информация о вашей работе - "Книжка"
	
    [💰] || Зарплату можно получать в течении 10 мин.
    [💰] | Командой - "Работать"`);
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
    message.user.stag += 1;
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
	message.user.foolder += 1;
		if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
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
		const multiply = utils.pick([0.5, 0.50, 0.75, 0.75, 0.25, 1, 1, 1, 1, 0.5, 0.5, 0.5, 5, 50, 10, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return message.send(`[🎰] ⇢ Вам выпала комбинация ${smilerand}
		 ${smilesuccess} ⇢ ${multiply === 1 ? `Ваши деньги остаются при вас` : `${multiply < 1 ? `Вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `Вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}
		[❤] ⇢ На этот раз, мы умножили вашу сумму на -> x${multiply}
		
		[💰] || Ваш баланс: ${utils.sp(message.user.balance)}$`);
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

	let smilekazinobad = utils.pick([`😒`, `😯`, `😔`, `😕`]);

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`);
	if(message.args[2] >= 49) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
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
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);
	var lvlcash = biz.earn*message.user.bizlvl;
var updprice2 = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl
	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(lvlcash)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$
	🌟 Уровень: ${message.user.bizlvl}
	✅ Стоимость улучшения: ${utils.sp(updprice2)}$`);
});

cmd.hear(/^(?:бизнес улучшить)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`У Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);

	var updprice = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl;

	if(message.user.balance < updprice) return bot(`Недостаточно денег. ${smileerror}`);

	message.user.bizlvl += 1;
	message.user.balance -= updprice;

	return bot(`Вы успешно улучшили бизнес. ${smilesuccess}
💰 Ваш баланс: ${utils.sp(message.user.balance)}$
🌟 Уровень бизнеса: ${message.user.bizlvl}`);


});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса. ${smileerror}`);


	var cashlvlbiz = message.user.biz*message.user.bizlvl;

	message.user.balance += cashlvlbiz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(cashlvlbiz)}$ ${smilesuccess}`);
	user.biz = 0;

	return;
});

cmd.hear(/^(?:ферма|🔋 Ферма|@club178650735 🔋 Ферма)$/i, async (message, bot) => {
	let smileerror2 = utils.pick([`😒`, `😯`, `😔`, `🤔`]);

	if(!message.user.misc.farm) return bot(`у Вас нет майнинговых ферм. ${smileerror2}`);
	if(!message.user.farm_btc) return bot(`на ваших фермах еще нет биткоинов. Новые биткойны появятся через час 🔎`);

	const btc_ = message.user.farm_btc * message.user.farms;

	message.user.btc += message.user.farm_btc * message.user.farms;
	message.user.farm_btc = 0;

	return bot(`вы собрали со своих ферм ${utils.sp(btc_)}฿ ${smilesuccess}`);
});

cmd.hear(/^(?:!Стоп)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.senderId !== 161880759) return;
	await bot(`[BS] Идёт отключение бота, подождите...`);
	await message.send(`[BS] База сохранена на - 10%`);
	await message.send(`[BS] База сохранена на - 20%`);
	await message.send(`[BS] База сохранена на - 30%`);
	await message.send(`[BS] База сохранена на - 40%`);
	await message.send(`[BS] База сохранена на - 50%`);
	await message.send(`[BS] База сохранена на - 60%`);
	await message.send(`[BS] База сохранена на - 70%`);
	await message.send(`[BS] База сохранена на - 80%`);
	await message.send(`[BS] База сохранена на - 90%`);
	await message.send(`[BS] База сохранена на - 100%`);
    await message.send(`[BS] Вы успешно отключили бота`);

	await saveUsers();
	process.exit(-1);
});

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 10000000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 10.000.000.000$`);
	} else if(int !== message.args[1])
	{
		return bot(`вы не угадали число. Вам выпало число "${int}"
		🎉 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
	}
});

//Админ команды
cmd.hear(/^(?:бан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 2) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = true; 

saveUsers();
await bot(`вы забанили игрока *id${user.id} (${user.tag}). ${smilesuccess}`,); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован. ⛔` }); 
}
});

cmd.hear(/^(?:разбан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 2) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

saveUsers();
await bot(`вы разбанили игрока *id${user.id} (${user.tag}). ${smilesuccess} `); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.settings.adm< 2) return; 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.balance += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])}$! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});

cmd.hear(/^(?:промо вкл)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return; 

clearPromo();
return bot(`промокод включен! ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип btc)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
promotip = "btc"; 

return bot(`тип промокода: Bitcoin. ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
promotip = "balance"; 

return bot(`тип промокода: Баланс. ${smilesuccess}`);

});

cmd.hear(/^(?:промо)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
promovalue = Number(message.args[1]); 

return bot(`сумма промокода: ${promovalue}. ${smilesuccess}`);

});

cmd.hear(/^(?:промо лимит)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
promolimit = Number(message.args[1]); 

return bot(`лимит использований промокода: ${promolimit}. ${smilesuccess}`);

});

cmd.hear(/^(?:поиск)\s([0-9]+)$/i, async (message, bot) => { 
let user = users.find(x=> x.id === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

return bot(`ID игрока ${user.tag}: ${user.uid}`); 
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.right < 4) return bot(`доступно с привилегии - Admin.`);
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `${message.args[1]}` });
        }
        return message.send(`💬 || Я успешно сделал рассылку! Посмотрите, как будет видно другим:\n\n[sindigame|BotSindi], Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
})

cmd.hear(/^(?:пострассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.right < 4) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `[👮] ⇢ Быстро посмотрел запись:`, attachment: `${message.args[1]}`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `[👮] ⇢ Быстро посмотрел запись:`,
              attachment: `${message.args[1]}` });
        }
        return message.send(`💬 || Я успешно сделал рассылку!`);
 
})

cmd.hear(/^(?:removerub)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 3) return bot(`доступно с привилегии - Admin.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: «копать железо/золото/алмазы» ${smileerror}`);

});

cmd.hear(/^(?:копать железо)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 1;
message.user.zhelezo += randzhelezo;

saveUsers();

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzhelezo} железа.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать золото)$/i, async (message, bot) => { 

if(message.user.opit < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);

message.user.energy -= 1;
message.user.opit += 5;
message.user.zoloto += randzoloto;

saveUsers();

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzoloto} золота.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать алмазы)$/i, async (message, bot) => { 

if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(3, 26);

message.user.energy -= 1;
message.user.opit += 10;
message.user.almaz += randalmaz;

saveUsers();

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randalmaz} алмазов.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zhelezo)} железа. 🎛`);

});

cmd.hear(/^(?:опыт)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.opit)} опыта. 🏆`);

});

cmd.hear(/^(?:алмазы)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.almaz)} алмазов. 💎`);

});

cmd.hear(/^(?:золото)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zoloto)} золота. 🏵`);

});
		user.balance = 5000;
	return bot(`Успешно! Вы убрали весь баланс у пользователя -> (${user.tag})`);
}
	});
	
	cmd.hear(/^(?:removebtc)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 3) return bot(`доступно с привилегии - Admin.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);


		user.btc = 0;
	return bot(`Успешно! Вы убрали все БитКоины у пользователя -> (${user.tag})`);
}
	});

cmd.hear(/^(?:givebtc)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 3) return bot(`доступно с привилегии - Admin.`);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	let amount = parserInt(message.args[2]); 
		if(message.args[2] <= 0) return;
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.btc += message.args[2];
	return bot(`Успешно! Вы накрутили пользователю (${user.tag}) -> ${utils.sp(message.args[2])}$`);
}
	});
	
	cmd.hear(/^(?:givevip)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.user.right == 2) return bot(`вы уже имеете данную привилегию...`);
{
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`);

message.user.right = 2;
return message.send(`👍🏻 || Вы успешно выдали привилегию: Vip`);
}
});

cmd.hear(/^(?:giveadm)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.user.right == 3) return bot(`вы уже имеете данную привилегию...`);
{
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`);

message.user.right = 3;
return message.send(`👍🏻 || Вы успешно выдали привилегию: Admin`);
}
});

cmd.hear(/^(?:giverab)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.user.right == 4) return bot(`вы уже имеете данную привилегию...`);
{
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`);

message.user.right = 4;
return message.send(`👍🏻 || Вы успешно выдали привилегию: Разраб`);
}
});

cmd.hear(/^(?:giveown)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.user.right == 5) return bot(`вы уже имеете данную привилегию...`);
{
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`);

message.user.right = 5;
return message.send(`👍🏻 || Вы успешно выдали привилегию: Owner`);
}
});

cmd.hear(/^(?:setadm)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 1) return bot(`доступно с привилегии - Owner.`);
		if(message.args[2] <= 0) return;
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		message.user.right = message.args[2];
	return bot(`Успешно! Вы накрутили пользователю (${user.tag}) -> ${utils.sp(message.args[2])}$`);
}
	});
	
cmd.hear(/^(?:Clear)$/i, async (message, bot) => {
	message.user.foolder += 1;
				if(message.user.right < 2) return bot(`Доступно с привилегии - Vip.`);
		return message.send("&#4448;\n".repeat(200) + "Чат очищен!");
});	

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: 
🥈 ⇢ Копать железо
🥇 ⇢ Копать золото
💎 ⇢ Копать алмазы 
🎀 ⇢ Опыт - покажет сколько у вас опыта `);

});

cmd.hear(/^(?:копать железо)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 1;
message.user.zhelezo += randzhelezo;

saveUsers();

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzhelezo} железа.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать золото)$/i, async (message, bot) => { 

if(message.user.opit < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);

message.user.energy -= 1;
message.user.opit += 5;
message.user.zoloto += randzoloto;

saveUsers();

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzoloto} золота.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать алмазы)$/i, async (message, bot) => { 

if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(3, 26);

message.user.energy -= 1;
message.user.opit += 10;
message.user.almaz += randalmaz;

saveUsers();

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randalmaz} алмазов.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zhelezo)} железа. 🎛`);

});

cmd.hear(/^(?:опыт)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.opit)} опыта. 🏆`);

});

cmd.hear(/^(?:алмазы)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.almaz)} алмазов. 💎`);

});

cmd.hear(/^(?:золото)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zoloto)} золота. 🏵`);

});


cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.timers.hack) return bot(`вы сможете взломать через 5 минут ${smileerror}`);

let situac = utils.random(1,2);

if(situac === 1)
{

let hackcash = utils.random(156781,451981);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вы нашли уязвимость на сайте "Вконтакте", и вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`);

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вам удалось ограбить банк, но, есть небольшая проблема. Вас случайно засекли камеры, но вы смогли уйти. ✅ Вы заработали ${utils.sp(hackcash)}$`);

}

});
