console.log('')
console.log('-------------------------------')
console.log('  Скрипт Bot Gorilla запущен.')
console.log('-------------------------------')
console.log('')

// ВСЕ НАСТРОЙКИ В ФАЙЛЕ /database/settings.json! 

const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

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
	},
	{
		name: 'Летающая машина',
		cost: 1000000000,
		id: 27
	},
	{
		name: 'Tesla Cybertruck',
		cost: 10000000000,
		id: 28
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

const computers = [
	{
		name: 'DЕXР Аquilоn О175',
		cost: 10000,
		id: 1
	},
	{
		name: 'HYРЕRРС NЕО',
		cost: 500000,
		id: 2
	},
	{
		name: 'DЕLL Аliеnwаrе Аurоrа R7',
		cost: 1000000,
		id: 3
	},
	{
		name: 'HYРЕRРС СОSMОS X 3',
		cost: 3000000,
		id: 4
	},
	{
		name: 'HYРЕRРС РRЕMIUM',
		cost: 5000000,
		id: 5
	}
];

const cases = [
	{
		name: 'Сюрприз',
		cost: 50000000000,
		id: 1
	},
	{
		name: 'Премиум',
		cost: 2500000000000,
		id: 2
	},
	{
		name: 'Новогодний кейс',
		cost: 1000,
		id: 3	
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
		name: 'Коробка из-под обуви',
		cost: 250,
		id: 1
	},
	{
		name: 'Гараж',
		cost: 3000,
		id: 2
	},
	{
		name: 'Сарай',
		cost: 3500,
		id: 3
	},
	{
		name: 'Старый вагон',
		cost: 5000,
		id: 4
	},
	{
		name: 'Комната в общаге',
		cost: 10000,
		id: 5
	},
	{
		name: 'Разрушенный деревенский дом',
		cost: 25000,
		id: 6
	},
	{
		name: 'Холодильник соседа',
		cost: 37500,
		id: 7
	},
	{
		name: 'Кошачий домик',
		cost: 80000,
		id: 8
	},
	{
		name: 'Кирпичный дом',
		cost: 125000,
		id: 9
	},
	{
		name: 'Коттедж',
		cost: 450000,
		id: 10
	},
	{
		name: 'Вилла в Испании',
		cost: 125000,
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
    },
	{
		name: 'Своя планета',
		cost: 500000000000,
		id: 16
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
	},
	{
		name: 'iPhone XR',
		cost: 500000,
		id: 11
	},
	{
		name: 'iPhone XS MAX',
		cost: 1000000,
		id: 12
	},
	{
		name: 'Огурец',
		cost: 750000000,
		id: 13
	},
	{
		name: 'iРhоnе 11 Рrо Mаx',
		cost: 1000000000,
		id: 14
	}
];

const pets = [
	{
		name: 'Улитка',
		cost: 1000,
		earn: 0,
		id: 1,
		icon: '🐌'
	},
	{
		name: 'Лягушка',
		cost: 25000,
		earn: 0,
		id: 2,
		icon: '🐸'
	},
	{
		name: 'Заяц',
		cost: 500000,
		earn: 0,
		id: 3,
		icon: '🐰'
	},
	{
		name: 'Свинья',
		cost: 300000000,
		earn: 0,
		id: 4,
		icon: '🐷'
	},
	{
		name: 'Лиса',
		cost: 1250000000,
		earn: 0,
		id: 5,
		icon: '🦊'
	},
	{
		name: 'Собака',
		cost: 5000000000,
		earn: 0,
		id: 6,
		icon: '🐶'

	},
	{
		name: 'Панда',
		cost: 30000000000,
		earn: 0,
		id: 7,
		icon: '🐼'
	},
	{
		name: 'Горилла',
		cost: 180000000000,
		earn: 0,
		id: 8,
		icon: '🦍'
	}
];

const zelya = [
	{
		name: 'Зелье удачи',
		cost: 1000000000000,
		id: 1
	},
	{
		name: 'Зелье шахтера',
		cost: 100000000000,
		id: 2
	},
	{
		name: 'Зелье неудачи',
		cost: 50000000000,
		id: 3
	},
	{
		name: 'Молоко против зелья',
		cost: 1000000000,
		id: 4
	}
];

const status = [
	{
		name: 'VIP',
		cost: 250000000000000,
		id: 1,
		icon: '💥'
	},
	{
		name: 'Везучий',
		cost: 1000000000000,
		id: 2,
		icon: '🐰'
	},
	{
		name: 'Верифицированный пользователь',
		cost: 100000000000,
		id: 3,
		icon: '✔'
	},
	{
		
		name: 'Президент',
		cost: 1000,
		id: 129,
		icon: '🤵'
	}
];

const adm = [
	{
		name: 'Администратор',
		cost: 1,
		id: 1,
		icon: '🔥'
	},
	{
		name: 'Администратор',
		cost: 1,
		id: 2,
		icon: '🔥'
	},
	{
		name: 'Администратор',
		cost: 1,
		id: 3,
		icon: '🔥'
	},
	{
		name: 'Администратор',
		cost: 1,
		id: 4,
		icon: '🔥'
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
		name: 'Сервер в Minесrаft',
		cost: 50000,
		earn: 400,
		id: 1,
		icon: '💼'
	},
	{
		name: 'Ларёк',
		cost: 10000,
		earn: 700,
		id: 2,
		icon: '💼'
	},
	{
		name: 'Ресторан',
		cost: 300000,
		earn: 2500,
		id: 3,
		icon: '💼'
	},
	{
		name: 'Магазин',
		cost: 500000,
		earn: 3800,
		id: 4,
		icon: '💼'
	},
	{
		name: 'Завод',
		cost: 1500000,
		earn: 8000,
		id: 5,
		icon: '💼'
	},
	{
		name: 'Шахта',
		cost: 25000000,
		earn: 70000,
		id: 6,
		icon: '💼'
	},
	{
		name: 'Офис',
		cost: 80000000,
		earn: 220000,
		id: 7,
		icon: '💼'
	},
	{
		name: 'Разработка игр',
		cost: 150000000,
		earn: 300000,
		id: 8,
		icon: '💼'
	},
	{
		name: 'Торговля оружием',
		cost: 500000000,
		earn: 700000,
		id: 9,
		icon: '💼'
	},
	{
		name: 'Букмекерская контора',
		cost: 80000000000,
		earn: 1200000000,
		id: 10,
		icon: '💼'
	},
	{
		name: 'Межпланетный экспресс',
		cost: 250000000000000,
		earn: 150000000000,
		id: 11,
		icon: '💼'
	},
	{
		name: 'Адронный коллайдер',
		cost: 1500,
		earn: 80,
		id: 12,
		icon: '🌌'
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

let promo = "0";

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
let smilekoitel = utils.pick([`🍹`, `🍹`, `🍹`, `🍹`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

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

}, 1);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		var frmbtc = 0;
		if(x.misc.farm === 1)
		{
			frmbtc += 2;
		}

		if(x.misc.farm === 2)
		{
			frmbtc += 10;
		}

		if(x.misc.farm === 3)
		{
			frmbtc += 100;
		}
		var frmbtcm = frmbtc * x.farms;
		x.misc.farm_btc += frmbtcm;
	});
}, 3600000);

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
		user.timers.petpoxod = false;
		user.timers.farms = false;
		user.timers.farm_btc = false;
		user.timers.hack = false;
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
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveConfig()
{
	require('fs').writeFileSync('./database/settings.json', JSON.stringify(config, null, '\t'));
	return true;
}

vk.setOptions({ token: config.grouptoken, pollingGroupId: config.groupid });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public176715957\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public176715957\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

			users.push({
			id: message.senderId,
			uid: users.length,
			balance: 100000000000,
			bank: 0,
			btc: 0,
			farm_btc: 0,
			farms: 0,
			farmslimit: 2000,
			energy: 10,
			opit: 100,
			biz: 0,
			surprise: 15,
			platinium: 5,
			zhelezo: 0,
			materia: 0,
			zoloto: 0,
			almaz: 0,	
			bizlvl: 0,
			nicklimit: 40,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				kopat: false
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			status: 0,
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
				report: true,
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

Беседа с ботом: https://vk.me/join/AJQ1dwt0LBZ3U4AWfjAkhzTz`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Ферма"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "🤑 Бонус"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "📦 Кейсы"
		},
			"color": "primary"
		}
]
		]
			})
		});

		message.user.settings.firstmsg = false;


		saveUsers();
		return;

	}

	if(!command)
	{

		if(!message.isChat) return bot(`такой команды не существует, отправь «помощь» чтобы узнать мои команды. 😖
Возможно, вы имели ввиду:
1⃣ Ник
2⃣ Кубик
3⃣ Биткоин`);
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

cmd.hear(/^(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start|@gorillasbot 📚 Помощь)$/i, async (message, bot) => {
	await bot(`мои команды:

🍀 Развлекательные:
⠀⠀🙊 Анекдот
⠀⠀💏 Совместимость
⠀⠀📖 Переверни [фраза]
⠀⠀⏳ Шар [фраза]
⠀⠀💬 Выбери [фраза] или [фраза2]
⠀⠀📊 Инфа [фраза]
⠀⠀📠 Реши [пример]
⠀⠀📈 Курс

 💼 Бизнес:
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять
⠀⠀✅ Бизнес улучшить

🚀 Игры:
⠀⠀🎲 Кубик [число 1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [число 10-99]
⠀⠀🍂 Копать
⠀⠀👒 Квесты
⠀⠀🚕 Таксовать
⠀⠀🌲 Поход
⠀⠀👮 Взломать
⠀⠀📦 Кейсы

🌽 Питомцы:
⠀⠀🐒 Питомец - информация
⠀⠀🐪 Питомец поход
⠀⠀🌟 Питомец улучшить
⠀⠀🙈 Питомец найти

💡 Разное:
⠀⠀📒 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀👑 Рейтинг - ваш рейтинг
⠀⠀🎮 Ник [ник/вкл/выкл]
⠀⠀🛒 Магазин
⠀⠀💸 Продать [предмет]
⠀⠀💽 Ферма - биткоин ферма
⠀⠀🤝 Передать [ID игрока] [сумма]
⠀⠀🏆 Топ
⠀⠀🤵 Президент
⠀⠀⚔ Кланы
⠀⠀🍹 Зелья
⠀⠀🛍 Донат
⠀⠀💎 Бонус - ежедневный бонус

📱 Кнопки [вкл/выкл] - автоматические кнопки
🆘 Репорт [фраза] - ошибки или пожелания`, );

{
			keyboard:JSON.stringify(
		{
			"one_time": true,
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

cmd.hear(/^(?:переверни|перевернуть)\s([^]+)$/i, async (message, bot) => {
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
	return bot(`узнать список товаров и купить донат в автоматическом режиме можно на нашем сайте: https://gorillasbot.ru/ ✅
🎲 При покупке укажите ваш игровой ID: ${message.user.uid}`);
});

cmd.hear(/^(?:профиль|проф)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
    if(message.user.settings.adm) text += `${adm[message.user.settings.adm - 1].icon} ${adm[message.user.settings.adm - 1].name}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(message.user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet || message.user.energy || message.user.opit || message.user.clan || message.user.status || message.user.misc.computer)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.computer) text += `⠀🖥 Компьютер: ${computers[message.user.misc.computer - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀${pets[message.user.misc.pet - 1].icon} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	text += `\n📚 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});
cmd.hear(/^(?:клан)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
    if(message.user.status) text += `${status[message.user.status - 1].icon} ${status[message.user.status - 1].name}\n`;
	if(message.user.clan) text += `⠀${clan[message.user.clan - 1].icon} ${clan[message.user.clan - 1].name}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(message.user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet || message.user.energy || message.user.opit || message.user.clan || message.user.status || message.user.misc.computer)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.computer) text += `⠀🖥 Компьютер: ${computers[message.user.misc.computer - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀${pets[message.user.misc.pet - 1].icon} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	text += `\n📚 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.balance)}$ 💸`;

	if(message.user.bank) text += `\n💳 В банке ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n💽 Биткоинов ${utils.sp(message.user.btc)}฿`;
	if(message.user.zhelezo) text += `\n🎛 ${message.user.zhelezo} железа`;
	if(message.user.zoloto) text += `\n🏵 ${message.user.zoloto} золота`;
	if(message.user.almaz) text += `\n💎 ${message.user.almaz} алмаза`;
	if(message.user.materia) text += `\n🌌 ${message.user.materia} материи`;
    if(message.user.novogod) text += `\n🎅 ${message.user.novogod} новогодней руды`;

	return bot(text);
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	if(message.user.bank < 1) return bot(`ваш банковский счет пуст.`);
	return bot(`на балансе в банке ${message.user.bank}$
✍🏻 Введите "Банк [кол-во]" для пополнения`);
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
	if(!message.user.settings.limit) return bot(`передавать можно только 10 миллиардов (10.000.000.000) ${smileerror}`);

	if(message.args[1] < 1) return bot(`на балансе в банке ${message.user.bank}$
✍🏻 Введите "Банк снять [кол-во]" для снятия`);

	if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили в банк ${utils.sp(message.args[1])}$ ${smilesuccess}
💰 На руках ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 4) return;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`}); 
}); 
let people = 0;
bot(`рассылка отправлена!`);
for(let id in users) {
vk.api.call('messages.send', {
chat_id: id,
message: `${message.args[1]}` });
}
return;
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smileerror}
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
	return bot(`ваш рейтинг ${utils.sp(message.user.rating)}👑`);
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
⠀⠀🚗 Машины
⠀⠀🛥 Яхты
⠀⠀🛩 Самолеты
⠀⠀🚁 Вертолеты

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

📌 Остальное:
⠀⠀🐌 Питомцы
⠀⠀📱 Телефоны
⠀⠀🖥 Компьютеры
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $150 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]
⠀⠀📦 Кейсы
⠀⠀🍹 Зелья

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "Рейтинг 1"`);
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

	if(/железо/i.test(message.args[1].toLowerCase()))
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
		let a3 = message.user.almaz * 10000000;

		var zhelezosda2 = message.user.almaz;

		message.user.balance += message.user.almaz * 100000;
		message.user.almaz = 0;

		return bot(`вы продали ${zhelezosda2} алмазов за ${utils.sp(a3)}$ ✅`);
	}

	if(/материю/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.materia < 1) return bot(`у Вас нет материи. ⚠`);
		let a3 = message.user.materia * 10000000000;

		var zhelezosda2 = message.user.materia;

		message.user.balance += message.user.materia * 100000;
		message.user.materia = 0;

		return bot(`вы продали ${zhelezosda2} материю за ${utils.sp(a3)}$ ✅`);
	}

		if(/новогоднюю руду/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.novogod < 1) return bot(`у Вас нет новогодней руды. ⚠`);
		let a3 = message.user.novogod * 10000000000;

		var zhelezosda2 = message.user.novogod;

		message.user.balance += message.user.novogod * 100000;
		message.user.novogod = 0;

		return bot(`вы продали ${zhelezosda2} новогоднюю руду за ${utils.sp(a3)}$ ✅`);
	}

	if(/золото/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zoloto < 1) return bot(`у Вас нет золота. ⚠`);
		let a4 = message.user.zoloto * 50000;

		var zhelezosda3 = message.user.zoloto;

		message.user.balance += message.user.zoloto * 50000;
		message.user.zoloto = 0;

		return bot(`вы продали ${zhelezosda3} золота за ${utils.sp(a4)}$ ✅`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты ${smileerror}`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/статус/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.status) return bot(`у Вас нет статуса ${smileerror}`);
		let a = Math.floor(status[message.user.status - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.status - 1].cost * 0.85);
		message.user.status = 0;

		return bot(`вы успешно продали свой статус ${smilesuccess}`);
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

	if(/компьютер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.computer) return bot(`у вас нет компьютера ${smileerror}`);
		let a = Math.floor(computers[message.user.misc.computer - 1].cost * 0.85);

		message.user.balance += Math.floor(computers[message.user.misc.computer - 1].cost * 0.85);
		message.user.misc.computer = 0;

		return bot(`вы продали свой компьютер за ${utils.sp(a)}$`);
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

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$ ${smilesuccess}`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`у Вас недостаточно биткоинов ${SMILEERROR}`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`машины:
🎒 1. Самокат (500$)
🎒 2. Велосипед (2.500$)
🎒 3. Гироскутер (5.000$)
🎒 4. Сегвеи (7.500$)
🎒 5. Мопед (25.000$)
🎒 6. Мотоцикл (50.000$)
🎒 7. ВАЗ 2109 (75.000$)
🎒 8. Квадроцикл (80.000$)
🎒 9. Багги (135.000$)
🎒 10. Вездеход (200.000$)
🎒 11. Лада Xrау (350.000$)
🎒 12. Аudi Q7 (750.000$)
🎒 13. BMW X6 (1.000.000$)
🎒 14. Tоуоtа FT-HS (1.750.000$)
🎒 15. BMW Z4 M (2.500.000$)
🎒 16. Subaru WRX STI (2.750.000$)
🎒 17. Lаmbоrghini Vеnеnо (3.000.000$)
🎒 18. Tеslа Rоаdstеr (4.500.000$)
🎒 19. Yаmаhа YZF R6 (5.000.000$)
🎒 20. Bugаtti Сhirоn (6.500.000$)
🎒 21. Thrust SSС (35.000.000$)
🎒 22. Fеrrаri LаFеrrаri (39.000.000$)
🎒 23. Kоеnigsеgg Rеgеrа (50.000.000$)
🎒 24. Tеslа Sеmi (75.000.000$)
🎒 25. Vеnоm GT (125.000.000$)
🎒 26. Rоlls-Rоусе (200.000.000$)
🎒 27. Летающая машина (1.000.000.000$)
🎒 28. Tesla Cybertruck (10.000.000.000$)

🛒 Для покупки введите "Машина [номер]"
`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`яхты:
🎒 1. Ванна (10.000$)
🎒 2. Nаutiсаt 331 (10.000.000$)
🎒 3. Nоrdhаvn 56 MS (15.000.000$)
🎒 4. Рrinсеss 60 (25.000.000$)
🎒 5. Аzimut 70 (35.000.000$)
🎒 6. Dоminаtоr 40M (50.000.000$)
🎒 7. Mооnеn 124 (60.000.000$)
🎒 8. Widеr 150 (65.000.000$)
🎒 9. Раlmеr Jоhnsоn 42M SuреrSроrt (80.000.000$)
🎒 10. Widеr 165 (85.000.000$)
🎒 11. Есliрsе (150.000.000$)
🎒 12. Dubаi (300.000.000$)
🎒 13. Strееts оf Mоnасо (750.000.000$)

🛒 Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`самолеты: 
🎒 1. Параплан (100.000$)
🎒 2. АН-2 (350.000$)
🎒 3. Сеssnа-172Е (700.000$)
🎒 4. Suреrmаrinе Sрitfirе (1.000.000$)
🎒 5. BRM NG-5 (1.400.000$)
🎒 6. Сеssnа T210 (2.600.000$)
🎒 7. Bеесhсrаft 1900D (5.500.000$)
🎒 8. Сеssnа 550 (8.000.000$)
🎒 9. Hаwkеr 4000 (22.400.000$)
🎒 10. Lеаrjеt 31 (45.000.000$)
🎒 11. Аirbus А318 (85.000.000$)
🎒 12. F-35А (160.000.000$)
🎒 13. Bоеing 747-430 Сustоm (225.000.000$)
🎒 14. С-17А Glоbеmаstеr III (350.000.000$)
🎒 15. F-22 Rарtоr (400.000.000$)
🎒 16. Аirbus 380 Сustоm (600.000.000$)
🎒 17. B-2 Sрirit Stеаlth Bоmbеr (1.359.000.000$)

🛒 Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`вертолеты: 
🎒 1. Шарик с пропеллером (2$)
🎒 2. RоtоrWау Еxес 162F (300.000$)
🎒 3. Rоbinsоn R44 (450.000$)
🎒 4. Hillеr UH-12С (1.300.000$)
🎒 5. АW119 Kоаlа (2.500.000$)
🎒 6. MBB BK 117 (4.000.000$)
🎒 7. Еurосорtеr ЕС130 (7.500.000$)
🎒 8. Lеоnаrdо АW109 Роwеr (10.000.000$)
🎒 9. Sikоrskу S-76 (15.000.000$)
🎒 10. Bеll 429WLG (19.000.000$)
🎒 11. NHI NH90 (35.000.000$)
🎒 12. Kаzаn Mi-35M (60.000.000$)
🎒 13. Bеll V-22 Оsрrеу (135.000.000$)

🛒 Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`дома: 
🎒 1. Коробка из-под обуви (250$)
🎒 2. Гараж (3.000$)
🎒 3. Сарай (3.500$)
🎒 4. Старый вагон (5.000$)
🎒 5. Комната в общаге (10.000$)
🎒 6. Разрушенный деревенский дом (25.000$)
🎒 7. Холодильник соседа (37.500$)
🎒 8. Кошачий домик (80.000$)
🎒 9. Кирпичный дом (125.000$)
🎒 10. Коттедж (450.000$)
🎒 11. Вилла в Испании (1.250.000$)
🎒 12. Дом на Рублевке (5.000.000$)
🎒 13. Личный небоскреб (7.000.000$)
🎒 14. Остров с особняком (12.500.000$)
🎒 15. Белый дом (20.000.000$)
🎒 16. Своя планета (500.000.000.000$)

🛒 Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры: 
🎒 1. Чердак (15.000$)
🎒 2. Квартира в общежитии (55.000$)
🎒 3. Однокомнатная квартира (175.000$)
🎒 4. Двухкомнатная квартира (260.000$)
🎒 5. Четырехкомнатная квартира (500.000$)
🎒 6. Квартира в центре Москвы (1.600.000$)
🎒 7. Двухуровневая квартира (4.000.000$)
🎒 8. Квартира с Евроремонтом (6.000.000$)

🛒 Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
🎒 1. Nоkiа 108 (250$)
🎒 2. Nоkiа 3310 (500$)
🎒 3. АSUS ZеnFоnе 4 (2.000$)
🎒 4. BQ Аquаris X (10.000$)
🎒 5. Sоnу Xреriа XА (15.000$)
🎒 6. Sаmsung Gаlаxу S8 (30.000$)
🎒 7. Xiаоmi Mi Mix (50.000$)
🎒 8. Tоrеx FS1 (75.000$)
🎒 9. iРhоnе X (100.000$)
🎒 10. Мегафон С1 (250.000$)
🎒 11. iРhоnе XR (500.000$)
🎒 12. iРhоnе XS MАX (1.000.000$)
🎒 13. Огурец (750.000.000$)
🎒 14. iРhоnе 11 Рrо Mаx (1.000.000.000$)

🛒 Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:компьютер|компьютеры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`компьютеры:
🎒 1. DЕXР Аquilоn О175 (10.000$)
🎒 2. HYРЕRРС NЕО (500.000$)
🎒 3. DЕLL Аliеnwаrе Аurоrа R7 (1.000.000$)
🎒 4. HYРЕRРС СОSMОS X 3 (3.000.000$)
🎒 5. HYРЕRРС РRЕMIUM (5.000.000$)

🛒 Для покупки введите "Компьютер [номер]"`);

	const sell = computers.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.computer) return bot(`у вас уже есть компьютер (${computers[message.user.misc.computer - 1].name}), введите "Продать компьютер"`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.computer = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
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

🛒 Для покупки введите "Питомец [номер]"
📜 Информация о вашем питомце "Питомец"
🛑 Для продажи питомца "Продать питомца"`);
	
	{
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
if(message.isChat) return bot(`что бы получить бонус с промокода вы должны отправить этот промокод боту в личку.`);
if(message.user.promo) return bot(`вы уже активировали промокод. ${smileerror}`);
else 
{

	if(promo >= config.promolimit) return bot(`у этого промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ, включи уведомления в группе о новых записях что бы узнавать ОДНИМ ИЗ ПЕРВЫХ о новых промокодах. 📢 







































		https://vk.com/gorillasbot?z=photo-178396242_457239108%2Falbum-178396242_00%2Frev`);
	if(config.promotip === "btc") message.user.btc += config.promovalue;
	if(config.promotip === "balance") message.user.balance += config.promovalue;
	message.user.promo = true;
	promo += 1;
	ostalos = config.promolimit-promo;
	return bot(`зачислено +${utils.sp(config.promovalue)}${config.promotip.toString().replace(/btc/gi, "฿").replace(/balance/gi, "$")} ✅
📢 Осталось ${ostalos} использований.`);

}

});

cmd.hear(/^(?:питомец улучшить)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`у Вас недостаточно денег. ${smileerror}`);

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

		if(message.user.timers.petpoxod) return bot(`вы сможете отправить питомца в поход через 60 минут. Ваш питомец довольно сильно устал! ${smileerror}`);

		let cashfind = utils.random(4000000000,30000000000);
		message.user.balance += cashfind;
		message.user.timers.petpoxod = true;

			setTimeout(() => {
				message.user.timers.petpoxod = false;
			}, 324000);

		return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`);
}

});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`майнинг фермы: 
${message.user.misc.farm === 1 ? '🎒' : '🎒'} 1. АSIС Minеr 2฿/час (5.000.000$)
${message.user.misc.farm === 2 ? '🎒' : '🎒'} 2. DRАGОNMINT T1 10฿/час (60.000.000$)
${message.user.misc.farm === 3 ? '🎒' : '🎒'} 3. FM2018-BT400 100฿/час (700.000.000$)

🛒 Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм. ${smileerror}`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
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

	if(message.user.balance < 20500000) return bot(`у Вас недостаточно денег ${smileerror}`);
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

	if(message.user.balance < 100000000) return bot(`у Вас недостаточно денег ${smileerror}`);
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

	if(message.user.balance < 900000000) return bot(`у Вас недостаточно денег ${smileerror}`);
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
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 150000000 ) > message.user.balance) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(( message.args[1] * 150000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 150000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 250000000)}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
🌳 1. Сервер в Minесrаft: 10 тыс $
Прибыль: 400$/час

🚓 2. Сервер в SАMР: 50 тыс $
Прибыль: 1.500$/час

👕 3. Продажа палёных вещей: 200 тыс $
Прибыль: 4.000$/час

🕺 4. Ночной клуб: 3 млн $
Прибыль: 10.000$/час

🏪 5. Магазин электронных сигарет: 7 млн $
Прибыль: 50.000$/час

🚬 6. Кальянная: 15 млн $
Прибыль: 100.000$/час

🏩 7. Порностудия: 50 млн $
Прибыль: 450.000$/час

👯 8. Бордель: 2.5 млрд $
Прибыль: 60.000.000$/час

🔫 9. Торговля оружием: 10 млрд $
Прибыль: 120.000.000$/час

💹 10. Букмекерская контора: 80 млрд $
Прибыль: 1.200.000.000$/час

🚀 11. Межпланетный экспресс: 250 трлн $
Прибыль: 150.000.000.000$/час

🌌 12. Адронный коллайдер: 1.500 материи
🆕 Этот бизнес можно использовать как второй.
Приносит: 80 материи/час.

💡 Вы можете иметь только ОДИН обычный бизнес.
🛒 Для покупки введите "Бизнес [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у Вас уже есть бизнес (${businesses[message.user.business - 1].name})! 🙌 
		чтобы продать его отправьте «Продать бизнес»`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});
cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
🌳 1. Сервер в Minесrаft: 10 тыс $
Прибыль: 400$/час

🚓 2. Сервер в SАMР: 50 тыс $
Прибыль: 1.500$/час

👕 3. Продажа палёных вещей: 200 тыс $
Прибыль: 4.000$/час

🕺 4. Ночной клуб: 3 млн $
Прибыль: 10.000$/час

🏪 5. Магазин электронных сигарет: 7 млн $
Прибыль: 50.000$/час

🚬 6. Кальянная: 15 млн $
Прибыль: 100.000$/час

🏩 7. Порностудия: 50 млн $
Прибыль: 450.000$/час

👯 8. Бордель: 2.5 млрд $
Прибыль: 60.000.000$/час

🔫 9. Торговля оружием: 10 млрд $
Прибыль: 120.000.000$/час

💹 10. Букмекерская контора: 80 млрд $
Прибыль: 1.200.000.000$/час

🚀 11. Межпланетный экспресс: 250 трлн $
Прибыль: 150.000.000.000$/час

🌌 12. Адронный коллайдер: 1.500 материи
🆕 Этот бизнес можно использовать как второй.
Приносит: 80 материи/час.

💡 Вы можете иметь только ОДИН обычный бизнес.
🛒 Для покупки введите "Бизнес [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у Вас уже есть бизнес (${businesses[message.user.business - 1].name})! 🙌 
		чтобы продать его отправьте «Продать бизнес»`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:зелья|зелье)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`список зелий:

🍀 Зелье удачи на 10 минут (1.000.000.000.000$)
🛒 Купить: "зелья 1"

⚒ Зелье шахтера на 1 час (100.000.000.000$)
🛒 Купить: "зелья 2"

❌ Зелье неудачи на 5 минут (50.000.000.000$)
🛒 Купить: "зелья 3"

🥛 Молоко против зелья (1.000.000.000$)
🛒 Купить: "зелья 4""`);

	const sell = zelya.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.zelya = sell.id;

		return bot(`вы успешно выпили "${sell.name}" за ${utils.sp(sell.cost)}$ ${smilekoitel}`);
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

	if(( message.args[1] * btc ) > message.user.balance) return bot(`у Вас недостаточно денег ${smileerror}
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑${utils.sp(user.rating)} | $${utils.rn(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} | $${utils.rn(message.user.balance)}`);
});

cmd.hear(/^(?:бонус|🤑 Бонус|Bot Gorilla 🤑 Бонус)$/i, async (message, bot) => {

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

	vk.api.messages.send({ user_id: config.ownerid, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		if(!message.user.settings.report) return bot(`у вас установлен бан на репорты ${smileerror}`);

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
});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else return bot(`вы проиграли! Выпало число ${int} ${smileerror}`);
});

cmd.hear(/^(?:казино|казик|азино)\s([^]+)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	let smilekazinobad2 = utils.pick([`😒`, `😯`, `😔`]);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег! ${smileerror}`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([2, 0.75, 2, 0.5, 0.50, 0.50, 0.75, 2, 0.25, 2, 1, 1, 2, 0.5, 0.5, 5, 0.5, 1, 1, 2, 2, 0, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас ${smilesuccess}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$ ${smileerror}` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$ ${smilesuccess}`}`} (x${multiply})
		💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
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
	if(message.args[2] >= 500000000000000000000000000000000) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
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
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			❌ Вы потеряли ${message.args[2]}$  
			💰 Баланс: ${utils.sp(message.user.balance)}`);
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smileerror}
💰 Ваш баланс: ${message.user.balance}$`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${message.args[2] * multiply} ${smilesuccess}`);
		} else {
			return bot(`вы не угадали, это был ${cup}-ый стаканчик ${smileerror}`);
		}
	}
});

cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);
	var lvlcash = biz.earn*message.user.bizlvl;
var updprice2 = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl
	return bot(`статистика «${biz.name}»:
	💸 Прибыль: ${utils.sp(lvlcash)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$
	🌟 Уровень: ${message.user.bizlvl}
	✅ Стоимость улучшения: ${utils.sp(updprice2)}$`);
});

cmd.hear(/^(?:бизнес улучшить)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);

	var updprice = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl;

	if(message.user.balance < updprice) return bot(`у Вас недостаточно денег. ${smileerror}`);

	message.user.bizlvl += 1;
	message.user.balance -= updprice;

	return bot(`вы успешно улучшили бизнес. ${smilesuccess}
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);


});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:ферма|💽 Ферма|Bot Gorilla 💽 Ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на ваших фермах еще нет биткоинов. Новые биткойны появятся через час 🔎`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿`);
});

cmd.hear(/^(?:restart)$/i, async (message, bot) => {
	if(message.user.settings.adm < 4) return;
	await bot(`бот уходит в перезагрузку.`);

	await saveUsers();
	process.exit(-1);
	console.log("node app")
});

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`акция завершена. 🙅‍`);
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


cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.settings.adm< 1) return; 
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

cmd.hear(/^(?:бан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = true; 

saveUsers();
await bot(`вы забанили игрока *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован. ⛔` }); 
}
});

cmd.hear(/^(?:разбан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

saveUsers();
await bot(`вы разбанили игрока *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:промо вкл)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return; 

clearPromo();
return bot(`промокод включен! ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип btc)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
config.promotip = "btc"; 
saveConfig();
return bot(`тип промокода: Bitcoin. ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
config.promotip = "balance"; 
saveConfig();
return bot(`тип промокода: Баланс. ${smilesuccess}`);

});

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: «копать железо/золото/алмазы/материю/новогоднюю руду» ${smileerror}`);

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
Энергия закончилась. 📛`);

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
Энергия закончилась. 📛`);

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
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать материю)$/i, async (message, bot) => { 

if(message.user.opit < 100000) return bot(`что бы копать материю нужно больше 100 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(3, 10);

message.user.energy -= 1;
message.user.opit += 50;
message.user.materia += randalmaz;

saveUsers();

if(message.user.energy > 0) return bot(`+${randalmaz} материи.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randalmaz} материи.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать новогоднюю руду)$/i, async (message, bot) => { 

if(message.user.opit < 100) return bot(`что бы копать новогоднюю руду нужно больше 100 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(7, 30);

message.user.energy -= 1;
message.user.opit += 30;
message.user.novogod += randalmaz;

saveUsers();

if(message.user.energy > 0) return bot(`+${randalmaz} новогодней руды.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randalmaz} новогодней руды.
Энергия закончилась. 📛`);

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

cmd.hear(/^(?:материя)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.materia)} материи. 🌌`);

});

cmd.hear(/^(?:новогодняя руда)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.novogod)} новогодней руды. 🎅`);

});

cmd.hear(/^(?:таксовать)$/i, async (message, bot) => { 
if(message.user.opit < 3000) return bot(`что бы Таксовать вам нужно 3 000 опыта.
Копайте железо и увеличивайте свой опыт! ⚠`);
if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

taxicash = utils.random(987923, 3416011);
message.user.energy -= 1;
message.user.balance += taxicash;

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`вы заработали ${utils.sp(taxicash)}$
Энергия закончилась. ⚠`);

}

if(message.user.energy > 0) bot(`вы заработали ${utils.sp(taxicash)}$`);

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
}, 6200);

message.user.timers.hack = true;
return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`);

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 600);

message.user.timers.hack = true;
return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. ✅ Вы заработали ${utils.sp(hackcash)}$`);

}

});

cmd.hear(/^(?:промо)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
config.promovalue = Number(message.args[1]); 
saveConfig();
return bot(`сумма промокода: ${config.promovalue}. ${smilesuccess}`);

});

cmd.hear(/^(?:промо лимит)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return;
config.promolimit = Number(message.args[1]); 
saveConfig();
return bot(`лимит использований промокода: ${config.promolimit}. ${smilesuccess}`);

});
cmd.hear(/^(?:президент)$/i, async (message, bot) => {
	await bot(`президент сейчас: [id302809128ихн|៴៱៳៷៵៷៳៱៴]

Стать им может любой желающий, на выборах выигрывает тот кто заплатит больше всех. Если кто то заплатит больше Вас, игровая валюта не вернётся на Ваш баланс. У президента появляется красивая отметка в профиле. 🤵

💬 Будущий президент: ​[id572090502|🌪Набор в ᴘᴀʀᴀᴅɪsᴇ🌪] (100.000.000.000.000$) 
🆘 Президент выбирается каждый день в 16:00 MSK.
📛 Подать заявку: «президент заявка [сумма]»`);

});
cmd.hear(/^(?:президент)\s(?:заявка)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у Вас недостаточно средств ${smileerror}`);
	else if(message.args[1] <= message.user.prezident)
	{
		message.user.balance += message.args[1];
		message.user.prezident -= message.args[1];

		return bot(`вы стали кандидатом на президента. Но если вашу ставку кто-то перебьют, ваши деньги которые вы ставите не вернуться на счет. ${utils.sp(message.args[1])}$`);
	}
});
cmd.hear(/^(?:президент заявка)$/i, async (message, bot) => {
	await bot(`использование: «президент заявка [сумма]» ☺`);
});
cmd.hear(/^(?:кнопки выкл)$/i, async (message, bot) => {
	await bot(`кнопки в личке с ботом отключены. 👍
🔒 Для включения кнопок, введите «Кнопки вкл»`);
});
cmd.hear(/^(?:кнопки вкл)$/i, async (message, bot) => {
	await bot(`кнопки в личке с ботом включены. 👍
🔓 Для отключения кнопок, введите «Кнопки выкл»`);
});
cmd.hear(/^(?:питомец)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(``);

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
cmd.hear(/^(?:выдать опыт)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
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


user.opit += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} опыта!`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} опыта! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:поход|🔑 поход|@gorillasbot 🔑 поход)$/i, async (message, bot) => {

	if(message.user.timers.bonus) return bot(`ходить в поход можно  раз в 24 часа ${smileerror}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;


	if(prize === 1)
	{
		message.user.opit += 150;
		return bot(`вы сходили в поход и нашли 150 опыта! ${smilesuccess}`);
	}

	if(prize === 2)
	{
		message.user.btc += 0;
		return bot(`вы сходили в поход и ничего не нашли. ${smileerror}`);
	}

	if(prize === 3)
	{
		message.user.rating += 150;
		return bot(`вы сходили в поход и нашли 150 рейтинга! ${smilesuccess}`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		return bot(`вы сходили в поход и нашли 1 рейтинг! ${smilesuccess}`);
	}

	if(prize === 5)
	{
		message.user.rating += 0;
		return bot(`вы сходили в поход и ничего не нашли. ${smileerror}`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		return bot(`вы сходили в поход и нашли 2 рейтинга! ${smilesuccess}`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		return bot(`вы сходили в поход и нашли 3 рейтинга! ${smilesuccess}`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		return bot(`вы сходили в поход и нашли 4 рейтинга! ${smilesuccess}`);
	}
	if(prize === 9)
	{
		message.user.balance += 150000000000;
		return bot(`вы сходили в поход и нашли 150.000.000.000$ ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.balance += 50000000000;
		return bot(`вы сходили в поход и нашли 50.000.000.000$ ${smilesuccess}`);
	}
});
cmd.hear(/^(?:кланы)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане.
Информация по командам: «клан помощь» 🔔`);
});
cmd.hear(/^(?:клан)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане.
Информация по командам: «клан помощь» 🔔`);
});
cmd.hear(/^(?:клан помощь)$/i, async (message, bot) => {
	await bot(`информация по командам:

1⃣ Клан — информация о клане.
2⃣ Клан создать [название] — стоимость 100.000.000.000$
3⃣ Клан удалить — распустить клан.
4⃣ Клан пригласить [ID игрока] — пригласить игрока в клан.
5⃣ Клан исключить [ID игрока] — исключить игрока из клана.
6⃣ Клан выйти — выйти из клана.
7⃣ Клан вступить [ID клана] — принять приглашение в клан.
8⃣ Клан топ — рейтинг кланов.
9⃣ Клан казна — история пополнения казны за сутки.
🔟 Клан казна [сумма] — внести деньги в казну клана.
1⃣1⃣ Клан изменить [название] — сменить название.
1⃣2⃣ Клан состав — участники клана.
1⃣3⃣ Клан магазин — покупка войск для клана.
1⃣4⃣ Клан атака — напасть на другой клан.
1⃣5⃣ Клан админ [ID игрока] — выдать админа в клане.
1⃣6⃣ Клан снять [ID игрока] — снять админа в клане.

🆕 Клан ограбление — ежедневное ограбление.

📜 Админ в клане может приглашать и исключать игроков, установить новое название, а так же устраивать атаки на другие кланы.`);
});
cmd.hear(/^(?:клан создать)$/i, async (message, bot) => {
	await bot(`использование: «клан создать [название]»`);
});
cmd.hear(/^(?:клан создать)\s(.*)$/i, async (message, bot) => {
	await bot(`вам нужно 100.000.000.000$ для создания клана.`);
	});
cmd.hear(/^(?:клан удалить)$/i, async (message, bot) => {
	await bot(`у Вас нет клана. 🤐`);
});
cmd.hear(/^(?:выдать энергию)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.settings.adm< 2) return; 
if(message.args[2] >= 100) return bot(`вы достигли лимита в 100 энергии, вы сможете выдавать энергию завтра. ${smileerror}`);
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.energy += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} энергии!`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} энергии! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:выдать рейтинг)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
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


user.rating += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} рейтинга!`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} рейтинга! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:кубик)$/i, async (message, bot) => {
	await bot(`использование: «кубик (число от 1 до 6)» 😕`);
});
cmd.hear(/^(?:трейд)$/i, async (message, bot) => {
	await bot(`использование: «трейд вверх/вниз [сумма]» 😔`);
});
cmd.hear(/^(?:трейд вверх)$/i, async (message, bot) => {
	await bot(`использование: «трейд вверх/вниз [сумма]» 😔`);
});
cmd.hear(/^(?:трейд вниз)$/i, async (message, bot) => {
	await bot(`использование: «трейд вверх/вниз [сумма]» 😔`);
});
cmd.hear(/^(?:казино)$/i, async (message, bot) => {
	await bot(`использование: «казино [сумма]» 😯`);
});
cmd.hear(/^(?:стаканчик)$/i, async (message, bot) => {
	await bot(`использование: «стаканчик [1-3] [сумма ставки]» 😔`);
});
cmd.hear(/^(?:совместимость)$/i, async (message, bot) => {
	await bot(`использование: «совместимость [женщина] [мужчина]»

Знаки зодиака:
♈ Овен
♉ Телец
♊ Близнецы
♋ Рак
♌ Лев
♍ Дева
♎ Весы
♏ Скорпион
♐ Стрелец
♑ Козерог
♒ Водолей
♓ Рыбы
`);
});
cmd.hear(/^(?:перевести)$/i, async (message, bot) => {
	await bot(`использование: «передать [ID игрока] [сумма]»`);
});
cmd.hear(/^(?:передать)$/i, async (message, bot) => {
	await bot(`использование: «передать [ID игрока] [сумма]»`);
});
cmd.hear(/^(?:реши)$/i, async (message, bot) => {
	await bot(`использование: «реши [пример]» 😔`);
});
cmd.hear(/^(?:шар)$/i, async (message, bot) => {
	await bot(`использование: «шар [текст]» 😔`);
});
cmd.hear(/^(?:переверни|перевернуть)$/i, async (message, bot) => {
	await bot(`использование: «переверни [текст]» 😔`);
});
cmd.hear(/^(?:шанс|вероятность|инфа)$/i, async (message, bot) => {
	await bot(`введите текст.`);
});
cmd.hear(/^(?:клан пригласить)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
});
cmd.hear(/^(?:клан исключить)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
});
cmd.hear(/^(?:клан выйти)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
});
cmd.hear(/^(?:клан вступить)$/i, async (message, bot) => {
	await bot(`использование: «клан вступить [ID клана]»`);
});
cmd.hear(/^(?:клан вступить)\s(.*)$/i, async (message, bot) => {
	await bot(`вам не поступало приглашения в этот клан.`);
	});
cmd.hear(/^(?:клан топ)$/i, async (message, bot) => {
	await bot(`топ кланов:
1⃣ [20/50] [id572090502|🌪ᴘᴀʀᴀᴅɪsᴇ🌪] — 👑13.655 | $146 трлн.
2⃣ [37/50] 乡ОПГ乡🌪ᴘᴀʀᴀᴅɪsᴇ🌪 — 👑8.714 | $1.61 трлд.
3⃣ [27/50] Набор.25кккк — 👑6.914 | $50 трлн.
4⃣ [10/50] НАБОР — 👑6.167 | $400 трлн.
5⃣ [33/50] 🖤Blасk_Аngеls_GB🖤 — 👑5.826 | $11 трлн.
6⃣ [24/50] 🔝ПодаркиGB⚔ — 👑5.743 | $791 млрд.
7⃣ [36/50] 🅼🆂🆃🅸🆃🅴🅻🅸 — 👑5.214 | $504 млрд.
8⃣ [11/50] 乡│Lоrеlасks│乡 — 👑5.210 | $12 трлн.
9⃣ [30/50] 🖤🔝ЕvеrуDауGB⚔🖤 — 👑4.967 | $10 трлн.
🔟 [25/50] казна5кккк — 👑4.223 | $14 трлн.

📢 Рейтинг клана складывается из побед и поражений.`);
	});
cmd.hear(/^(?:клан пригласить)\s(.*)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
});
cmd.hear(/^(?:клан исключить)\s(.*)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
	});
cmd.hear(/^(?:президент заявка)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] < 1) return bot(`на балансе в банке ${message.user.bank}$
✍🏻 Введите "Банк снять [кол-во]" для снятия`);

	if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили в банк ${utils.sp(message.args[1])}$ ${smilesuccess}
💰 На руках ${utils.sp(message.user.balance)}$`);
	}
});
cmd.hear(/^(?:ahelp)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return;
	await bot(`команды администратора 2 уровня:
		1. Выдать - выдать неограниченное количество денег! Использование: Выдать [ид] [сумма] ${smilesuccess}
		2. Выдать рейтинг - выдать неограниченное количество рейтинга! Использование: Выдать рейтинг [ид] [количество] ${smilesuccess}
		3. Выдать опыт - выдать неограниченное количество опыта для копки руды или таксования! Использование: Выдать опыт [ид] [количество] ${smilesuccess}
		4. Выдать энергию - выдать неограниченное количество энергии, используется для той же копки или таксования! Использование: Выдать энергию [ид] [количество] ${smilesuccess}
		5. Выдать биткоины - выдать неограниченное количество биткоинов! Использование: Выдать биткоины [ид] [сумма] ${smilesuccess}
		6. Выдать материю - выдать неограниченное количество руды - материя! Использование: Выдать материю [ид] [количество] ${smilesuccess}
		7. Ответ - используется для ответа на репорт! Использование: Ответ [ид] [текст] ${smilesuccess}
		8. Бан - используется для ограничения доступа игрока к боту из-за нарушений правил! Использование: Бан [ид] ${smilesuccess}
		9. Разбан - используется для возобновления доступа игрока к боту! Использование: Разбан [ид] ${smilesuccess}


		`);
});
cmd.hear(/^(?:энергия)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.energy)} энергии. 🏋`);

});
cmd.hear(/^(?:бизнес)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(``);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у Вас уже есть бизнес (${businesses[message.user.business - 1].name})! 🙌 
		чтобы продать его отправьте «Продать бизнес»`);

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы успешно купили бизнес "${sell.name}" ${smilesuccess}
			💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
});
cmd.hear(/^(?:клан выйти)$/i, async (message, bot) => {
	await bot(`вы не состоите в клане. 🤐`);
});
cmd.hear(/^(?:питомец найти)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`у Вас закончилась энергия.
`);

let pet = utils.random(1, 7);

message.user.energy -= 1;
message.user.opit += 1;
message.user.pet += pet;

saveUsers();

if(message.user.energy > 0) return bot(`+${pet} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${pet} железа.
Энергия закончилась. 📛`);

}

});
cmd.hear(/^(?:выдать материю)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
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


user.materia += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} материю`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} материю! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:закрыть передачи)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.trade = false; 

saveUsers();
await bot(`вы закрыли доступ на передачу игроку *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `Вам закрыли доступ к передачам. ⛔` }); 
}
});
cmd.hear(/^(?:открыть передачи)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.trade = true; 

saveUsers();
await bot(`вы открыли доступ к передачам игроку *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Вам открыли доступ к передачам.` }); 
}
});
cmd.hear(/^(?:закрыть репорт)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.report = false; 

saveUsers();
await bot(`вы закрыли доступ к репорту игроку *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `Вам закрыли доступ к репорту. ⛔` }); 
}
});
cmd.hear(/^(?:открыть репорт)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.report = true; 

saveUsers();
await bot(`вы открыли доступ к репортам игроку *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Вам открыли доступ к репортам.` }); 
}
});
cmd.hear(/^(?:выдать)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «выдать [ид] [сумма]» 😯`);
});
cmd.hear(/^(?:выдать рейтинг)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «выдать рейтинг [ид] [количество]» 😯`);
});
cmd.hear(/^(?:выдать опыт)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «выдать опыт [ид] [количество]» 😯`);
});
cmd.hear(/^(?:выдать биткоины)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
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


user.btc += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} биткоинов`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} биткоины! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:выдать биткоины)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «выдать биткоины [ид] [сумма]» 😯`);
});
cmd.hear(/^(?:выдать материю)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «выдать материю [ид] [количество]» 😯`);
});
cmd.hear(/^(?:бан)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «бан [ид] 😯`);
});
cmd.hear(/^(?:разбан)$/i, async (message, bot) => {
	if(message.user.settings.adm< 2) return; 
	await bot(`использование: «разбан [ид] 😯`);
});
cmd.hear(/^(?:выдать опыт себе)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.settings.cmd< 2) return; 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.opit += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} опыта!`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} опыта! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса. ${smileerror}`);


	var cashlvlbiz = message.user.biz*messsage.user.bizlvl;

	message.user.balance += cashlvlbiz;
	message.user.biz = 0;

	bot(`вы сняли со счёта своего бизнеса ${utils.sp(cashlvlbiz)}$ ${smilesuccess}`);
	message.user.biz = 0;

	return;
});
cmd.hear(/^(?:екоекнокеокенгоьнкгьлнль)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`
`);

	const sell = cases.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

	if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.case = sell.id;

		return bot(`вы успешно купили кейс "${sell.name}" за ${utils.sp(sell.cost)}$ ${smilesuccess}`);
	}
});
cmd.hear(/^(?:открыть кейс 1)$/i, async (message, bot) => {
	await bot(`использование: "кейс открыть 1" ${smilesuccess}`);
});
cmd.hear(/^(?:открыть кейс 2)$/i, async (message, bot) => {
	await bot(`использование: "кейс открыть 2" ${smilesuccess}`);
});
cmd.hear(/^(?:статистика)$/i, async (message, bot) => {
	await bot(`в боте зарегистрировано ${users.length} игроков.`);
});
cmd.hear(/^(?:работа)$/i, async (message, bot) => {
	await bot(`вы работаете на шахте, добывайте ресурсы (железо, золото, алмазы, материю) пока не закончится энергия.

✅ Как начать работать и добывать ресурсы? Используйте команды «копать железо», «копать золото», «копать алмазы», «копать материю».

♻ Как продавать накопанные ресурсы? Используйте команды «продать железо», «продать золото», «продать алмазы», «продать материю».`);
});
cmd.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
   let user = users.find(x=> x.uid === Number(message.args[1]));
    if(!message.isChat) return message.send(`? ? Команда работает только в беседах!`);
     if(message.user.adm < 4) return message.send(`? ? Вам не доступно!`);

    if(message.args[4]) { 
        var domain = message.args[4].split(" "); 
        vk.api.call("utils.resolveScreenName", { 
        screen_name: message.args[4] 
    }).then((res) => { 
            if(res.object_id == 246602948) return bot('? ? Отказ'); 

            if(!users[message.args[1]]){
                if(message.user.adm > 7) return message.send(`? ? Нельзя кикнуть этого игрока!`);
            } 

            vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
            .catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);
            });  
            return  
        })  
    }else{
        if(!message.args[3]) return message.reply("? ? ID не указан, либо указан неверно."); 
        if(message.args[3] == 246602948) return bot('? ? Отказ'); 

        if(!users[message.args[1]]){
            if(message.user.adm > 7) return message.send(`? ?Нельзя кикнуть этого игрока!`);
        }

        vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.args[3] }).
        catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);}); 

        return                  
    } 
});
cmd.hear(/^(?:найти)\s([0-9]+)$/i, async (message, bot) => {
   if(message.user.settings.adm < 2) return; 
	if(message.args[1] == 176 && message.args[1] == 27);
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
			let text = ``;	
	text += `🔎 ID: ${user.uid}\n`;
	if(user.settings.adm) text += `${adm[user.settings.adm - 1].icon} ${adm[user.settings.adm - 1].name}\n`;
    if(user.status) text += `${status[user.status - 1].icon} ${status[user.status - 1].name}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	text += `💽 Биткоинов: ${utils.sp(user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(user.opit)}\n`;
	text += `🔗 Ссылка:  vk.com/id${user.id}\n`;


	text += `⛔ Бан репорта: ${user.settings.report ? "Нет" : "Есть"}\n`
	text += `⛔ Заблокирован: ${user.settings.ban ? "Да" : "Нет"}\n`


	if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.business || user.misc.pet || user.energy || user.opit || user.clan || user.status || user.misc.computer)
	{
		text += `\n🔑 Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
		
		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.computer) text += `⠀🖥 Компьютер: ${computers[user.misc.computer - 1].name}\n`;
		if(user.misc.pet) text += `⠀${pets[user.misc.pet - 1].icon} Питомец: ${pets[user.misc.pet - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Фермы: ${farms[user.misc.farm - 1].name} (x${user.farms})\n`;
		if(user.business) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}

	text += `\n📚 Дата регистрации: ${user.regDate}`;
	return bot(`профиль игрока:\n${text}`);
});

cmd.hear(/^(?:Поиск)\s(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)$/i, async (message, bot) => { 
   if(message.user.settings.adm < 2) return; 
	if(message.args[1] == 176 && message.args[1] == 27);
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
			let text = ``;	
	text += `🔎 ID: ${user.uid}\n`;
    if(user.status) text += `${status[user.status - 1].icon} ${status[user.status - 1].name}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	text += `💽 Биткоинов: ${utils.sp(user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(user.opit)}\n`;
	text += `🔗 Ссылка:  vk.com/id${user.id}\n`;
	text += `🔥 Бан репорта: ${user.settings.report ? "Нет" : "Есть"}\n`
	text += `🔥 Аккаунт заблокирован: ${user.settings.ban ? "Да" : "Нет"}\n`


	if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.business || user.misc.pet || user.energy || user.opit || user.clan || user.status || user.misc.computer)
	{
		text += `\n🔑 Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
		
		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.computer) text += `⠀🖥 Компьютер: ${computers[user.misc.computer - 1].name}\n`;
		if(user.misc.pet) text += `⠀${pets[user.misc.pet - 1].icon} Питомец: ${pets[user.misc.pet - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Фермы: ${farms[user.misc.farm - 1].name} (x${user.farms})\n`;
		if(user.business) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}

	text += `\n📚 Дата регистрации: ${user.regDate}`;
	return bot(`профиль игрока:\n${text}`);
});






































