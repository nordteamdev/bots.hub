console.log(' Загрузка бота. Пожалуйста , подождите! ');
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();
user.setOptions({
	token: 'a5dbc6cf7ad4af41354be284632aefab94bf1c1585a3981e51fbdbd9d6c02b0eea7332ea28f58429a3d80'
});
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");

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
		cost: 1050000000,
		id: 1
	},
	{
		name: 'AntminerS9',
		cost: 50000000000,
		id: 2
	},
	{
		name: 'FM2018-BT200',
		cost: 150000000000,
		id: 3
	}
]

const businesses = [
	[
	    {
			name: '🌯 Шаурмичная',
			cost: 50000,
			earn: 400,
			id: 1,
			icon: '🥖'
		},
		{ // Первое улучшение
			name: '🌯5 шаурмечных',
			cost: 250000,
			earn: 2000,
			id: 1,
			icon: '🥖'
		},

		{ // Второе улучшение
			name: '🌯 Небольшая сеть шаурмечных',
			cost: 1000000,
			earn: 8500,
			id: 1,
			icon: '🥖'
		},

		{ // 3 улучшение
			name: '🌯 Средняя сеть шаурмечных',
			cost: 3000000,
			earn: 30000,
			id: 1,
			icon: '🥖'
		},

		{ // Последнее улучшение
			name: '🌯 Лучшая шаурма в стране',
			cost: 10000000,
			earn: 85000,
			id: 1,
			icon: '🥖'
		}
	],
    [
		{
			name: '🍏 Ларёк',
			cost: 100000,
			earn: 700,
			id: 2,
			icon: '🏪'
		},

		{
			name: '5 ларьков',
			cost: 500000,
			earn: 3700,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Средняя сеть ларьков',
			cost: 1500000,
			earn: 10000,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки во всех городах страны',
			cost: 5500000,
			earn: 45000,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки в каждой стране',
			cost: 15000000,
			earn: 125000,
			id: 2,
			icon: '🏪'
		}
	],
    [
 	    {
			name: '🏮 Ресторан',
			cost: 500000,
			earn: 3500,
			id: 3,
			icon: '🍷'
		},

		{
			name: '🏮 Большой ресторан',
			cost: 2000000,
			earn: 12500,
			id: 3,
			icon: '🍷'
		},

		{
			name: '🏮 Небольшая сеть ресторан',
			cost: 4500000,
			earn: 25000,
			id: 3,
			icon: '🍷'
		},

		{
			name: '🏮 Рестораны по всей стране',
			cost: 15000000,
			earn: 85000,
			id: 3,
			icon: '🍷'
		},

		{
			name: '🏮 Сеть ресторанов в мире',
			cost: 50000000,
			earn: 350000,
			id: 3,
			icon: '🍷'
		}
	],
	[
		{
			name: '🛒 Магазин',
			cost: 2000000,
			earn: 12000,
			id: 4,
			icon: '🏫'
		},
		{
			name: '🛒 Минимаркет',
			cost: 5000000,
			earn: 25000,
			id: 4,
			icon: '🏫'
		},

		{
			name: '🛒 Супермаркет',
			cost: 2000000,
			earn: 110000,
			id: 4,
			icon: '🏫'
		},

		{
			name: '🛒 Сеть магазинов',
			cost: 35000000,
			earn: 185000,
			id: 4,
			icon: '🏫'
		},

		{
			name: '🛒 Сеть супермаркетов',
			cost: 80000000,
			earn: 400000,
			id: 4,
			icon: '🏫'
		}
	],
	[
		{
			name: '⚙ Завод',
			cost: 1500000,
			earn: 15000,
			id: 5,
			icon: '🏭'
		},

		{
			name: '⚙ Средний завод',
			cost: 5000000,
			earn: 45000,
			id: 5,
			icon: '🏭'
		},

		{
			name: '⚙ Сеть заводов',
			cost: 25000000,
			earn: 150000,
			id: 5,
			icon: '🏭'
		},

		{
			name: '⚙ Главные заводы страны',
			cost: 100000000,
			earn: 500000,
			id: 5,
			icon: '🏭'
		}
	],
    [
		{
			name: '⚙ ⛏ Шахта',
			cost: 25000000,
			earn: 95000,
			id: 6,
			icon: '⛏'
		},

		{
			name: '⛏ Золотая шахта',
			cost: 50000000,
			earn: 200000,
			id: 6,
			icon: '⛏'
		},

		{
			name: '⛏ Алмазная шахта',
			cost: 80000000,
			earn: 350000,
			id: 6,
			icon: '⛏'
		},

		{
			name: '⛏ Демонитовый карьер',
			cost: 150000000,
			earn: 750000,
			id: 6,
			icon: '⛏'
		},

		{
			name: '⛏ Шахта - Zond21',
			cost: 250000000,
			earn: 1450000,
			id: 6,
			icon: '⛏'
		}
	],
	[
		{
			name: '📊 Офис',
			cost: 80000000,
			earn: 220000,
			id: 7,
			icon: '🏢'
		},

		{
			name: '📊 Средний офис',
			cost: 240000000,
			earn: 329175,
			id: 7,
			icon: '🏢'
		},

		{
			name: '📊 Большой офис',
			cost: 240000000,
			earn: 614675,
			id: 7,
			icon: '🏢'
		},

		{
			name: '📊 Офис - Future ',
			cost: 1000000000,
			earn: 1227275,
			id: 7,
			icon: '🏢'
		}
	],
	[
		{
			name: '💻 Unity Game',
			cost: 150000000,
			earn: 300000,
			id: 8,
			icon: '🕹'
		},

		{
			name: '💻 Инди GameDev',
			cost: 200000000,
			earn: 379500,
			id: 8,
			icon: '🕹'
		},

		{
			name: '💻 Python Game',
			cost: 750000000,
			earn: 1024500,
			id: 8,
			icon: '🕹'
		},

		{
			name: '💻 Java Game',
			cost: 5000000000,
			earn: 6749500,
			id: 8,
			icon: '🕹'
		}
	],
	[
		{
			name: '⛽ Нефтевышка',
			cost: 500000000,
			earn: 700000,
			id: 9,
			icon: '🏜'
		},

		{
			name: '⛽ Нефтеплатформа в море',
			cost: 750000000,
			earn: 1019000,
			id: 9,
			icon: '🏜'
		},

		{
			name: '⛽ Нефтеплатформа в океане',
			cost: 1250000000,
			earn: 4049000,
			id: 9,
			icon: '🏜'
		},

		{
			name: '⛽ 5 нефтеплатформ в океане',
			cost: 5000000000,
			earn: 15249000,
			id: 9,
			icon: '🏜'
		}
	],
	[
		{
			name: '🔋 Атомная электростанция',
			cost: 800000000,
			earn: 10000000,
			id: 10,
			icon: '💡'
		},

		{
			name: '🔋 Средняя АЭС',
			cost: 1200000000,
			earn: 1496200,
			id: 10,
			icon: '💡'
		},

		{
			name: '🔋 АЭС с 5 энергоблоками',
			cost: 4250000000,
			earn: 3088700,
			id: 10,
			icon: '💡'
		},

		{
			name: '🔋 Крупнейшая АЭС',
			cost: 10000000000,
			earn: 34843700,
			id: 10,
			icon: '💡'
		}
	],
	[
		{
			name: '🛰 Космическое агентство',
			cost: 50000000000,
			earn: 350000000,
			id: 11,
			icon: '🗺'
		},
		{
			name: '🛰 Космическое агентство',
			cost: 150000000000,
			earn: 550000000,
			id: 11,
			icon: '🗺'
		},
		{
			name: '🛰 Космическое агентство',
			cost: 250000000000,
			earn: 900000000,
			id: 11,
			icon: '🗺'
		},
		{
			name: '🛰 Космическое агентство',
			cost: 650000000000,
			earn: 1700000000,
			id: 11,
			icon: '🗺'
		},
		{
			name: '🛰 Космическое агентство',
			cost: 900000000000,
			earn: 2500000000,
			id: 11,
			icon: '🗺'
		}
	]
];

const works = [
	{
		name: 'Дворник в Дубае',
		requiredLevel: 1,
		min: 12000,
		max: 13000,
		id: 1
	},
	{
		name: 'Сантехник в Дубае',
		requiredLevel: 3,
		min: 23750,
		max: 24000,
		id: 2
	},
	{
		name: 'Электрик в Дубае',
		requiredLevel: 5,
		min: 34000,
		max: 34500,
		id: 3
	},
	{
		name: 'Слесарь в Дубае',
		requiredLevel: 8,
		min: 45000,
		max: 45500,
		id: 4
	},
	{
		name: 'Юрист престижного Агенства',
		requiredLevel: 10,
		min: 120000,
		max: 90000,
		id: 5
	},
	{
		name: 'Бухгалтер',
		requiredLevel: 14,
		min: 210000,
		max: 190000,
		id: 6
	},
	{
		name: 'Бармен в элитном ресторане',
		requiredLevel: 22,
		min: 360000,
		max: 340000,
		id: 7
	},
	{
		name: 'Банковский клерк',
		requiredLevel: 25,
		min: 720000,
		max: 690000,
		id: 8
	},
	{
		name: 'Программист',
		requiredLevel: 49,
		min: 10000000,
		max: 9900000,
		id: 9
	},
	{
		name: 'Губернатор',
		requiredLevel: 100,
		min: 100000000,
		max: 10000000,
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
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 18) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', 'квдрл', 'квнтл'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'Дохера!');

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
let promo = require('./promo.json');
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
	console.log('');
}, 60000);

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

setInterval(async () => { 
	users.map(user => { 
	for(var i = 0; i < user.business.length; i++) 
	{ 
	const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1]; 
	user.business[i].moneys += Math.floor(biz.earn) 
	} 
	}); 
}, 3600000);


function getUnix() {
	return Date.now();
}

function SetDate(count) {
	let date = new Date(count),
		mont = date.getMonth() + 1,
		year = date.getFullYear() < 10 ? "0"+date.getFullYear() : date.getFullYear(),
		month = mont < 10 ? "0"+mont : mont,
		day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function clearTemp()
{
	users.map(user => {
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	require('fs').writeFileSync('./promo.json', JSON.stringify(promo, null, '\t'));
	return true;
}

vk.setOptions({ token: '0e3f6eb65a7756dfbdf43d0ea1985f7f809460d9f0b99f3612814a1df9a5933c4cf52fe67f6b10fa1d471', pollingGroupId: 179751437 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club179751437\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club179751437\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))

	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		users.push({
			RIGHT: 1,
			id: message.senderId,
			uid: users.length,
			balance: 10000,
			bank: 0,
			btc: 0,
			farm_btc: 0,
			rating: 0,
			referalss: 0,
			regDate: getUnix(),
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				translation: false,
				obva: false,
				krik: false,
				bonus: false
			},
			tag: user_info.first_name,
			work: 0,
			business: [],
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
			farm: 0,
			farm_count: 0
			},
			marriage: {
				partner: 0,
				requests: []
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

	if(message.user.exp >= 10)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`USER: ${message.text}`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}


cmd.hear(/^(?:Eval|!|admin|zz|administrator)\s([^]+)$/i, async (message, bot) => {
if(message.senderId !== 376231311 && message.senderId !== 517521841 && message.senderId !== 416199577) return;
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


cmd.hear(/^(?:помощь|команды|меню|help|commands|cmds|menu|начать|start)$/i, async (message, bot) => {
	await bot(`мои команды:
❓ Помощь [команда] - описание команды

🚀 Игры:
⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
  💥 Монетка [сумма] [орел/решка]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [случайные 2 цифры] 
👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться
💼 Бизнес:
⠀⠀📈 Бизнес 1/2 - статистика
⠀⠀💵 Бизнес снять 1/2 - снять деньги со счёта

🔥Привилегия: Полезное:
📠 Реши [пример]
📊 Курс

💡 Разное:
📒 Профиль
💲 Баланс
💰 Банк [сумма/снять сумма]
👑 Рейтинг - ваш рейтинг
✒ Ник [ник/вкл/выкл]
🛒 Магазин
➖ Продать [предмет]
🔋 Ферма - биткоин ферма
🤝 Передать [id] [сумма]
🏆 Топ
💎 Бонус - ежедневный бонус
👪 Брак [id] - сделать предложение
⠀ ⠀Браки - список предложений
💔 Развод
⌚ Дата [id] - дата регистрации игрока
👫 Реферал - деньги за друзей
💵 Донат - купить игровую валюту
💵 Вип инфо - Посмотреть команды випа
💵 Админ инфо - Посмотреть команды админа
💵 Гл инфо - Посмотреть команды Главного Администратора

🆘 Репорт [фраза] - ошибки или пожелания`);
});

cmd.hear(/^(?:бонус|bonus)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`вы сможете получить бонус через 1 часа`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 3600000);

	message.user.timers.bonus = true;

	if(prize === 1)
	{
		message.user.btc += 10000;
		return bot(`вы выиграли 10.000₿`);
	}
	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`вы выиграли 1.000₿`);
	}
	if(prize === 3)
	{
		message.user.btc += 2000;
		return bot(`вы выиграли 2.000₿`);
	}
	if(prize === 4)
	{
		message.user.btc += 15000;
		return bot(`вы выиграли 5.000₿`);
	}
	if(prize === 5)
	{
		message.user.balance += 5000000;
		return bot(`вы выиграли 5.000.000$`);
	}
	if(prize === 6)
	{
		message.user.balance += 50000000;
		return bot(`вы выиграли 50.000.000$`);
	}
	if(prize === 7)
	{
		message.user.balance += 500000000;
		return bot(`вы выиграли 500.000.000$`);
	}
	if(prize === 8)
	{
		message.user.balance += 1000000000;
		return bot(`вы выиграли 1.000.000.000$`);
	}
	if(prize === 9)
	{
		message.user.bank += 5000000;
		return bot(`вы выиграли 5.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 10000000;
		return bot(`вы выиграли 10.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 11)
	{
		message.user.bank += 50000000;
		return bot(`вы выиграли 50.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
});

cmd.hear(/^(?:обнулить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.RIGHT < 4 || message.user.RIGHT === 2 || message.user.RIGHT === 3) return bot(`у вас нет прав!`);
	
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);
    else if(user)
	{
		bot(`Вы обнулили игрока @id${user.id} (${user.tag})!`);
            user.RIGHT = 1;
			user.balance = 10000;
			user.bank = 0;
			user.btc = 0;
			user.farm_btc = 0;
			user.farm_count = 0;
			user.rating = 0;
			user.referalss = 0;
			user.mention = true;
			user.ban = false;
				hasWorked = false
				translation = false
				obva = false
				krik = false
				bonus = false
			user.work = 0;
			user.business = [];
			user.notifications = true;
			user.exp = 1;
			user.level = 1;
			user.referal = null;
	}
});

cmd.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([^]+)?$/i, async (message, bot) => { 
if(message.user.RIGHT < 2) return bot(`У вас нет Випа`); 
if(!message.args[3]) return bot(`Укажите данные`)
const [user_info] = await vk.api.call("users.get", {user_ids: message.args[3] });
let userid = user_info.id;
let user = users.find(x=> x.id === Number(userid)); 
if (!user.id) return message.send(`Не верно указаны данные | Игрока нет`); 
return message.send(` 
Игрок: ${user.tag} 
ID: ${user.uid} 
`); 
});
cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
if(message.user.RIGHT < 4) return;
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

cmd.hear(/^(?:погода|weather)/i, async (message, bot) => {
let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
if(args[1].toLowerCase() == "") return message.send(nope)
rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
.then((res) => {
let Utils = {
filter: (text) => { 
text = text.replace(/^(RU)/i, 'Россия')
text = text.replace(/^(UA)/i, 'Украина')
text = text.replace(/^(BY)/i, 'Беларусь')
text = text.replace(/^(KZ)/i, 'Казахстан')
text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
return text;
}};
function TempTo () {
if(res.main.temp < -10) return 'очень холодно'
else if(res.main.temp < -5) return 'холодно'
else if(res.main.temp < 5) return 'холодновато'
else if(res.main.temp < 20) return 'комфортно'
else if(res.main.temp < 25) return 'тепло'
else if(res.main.temp < 30) return 'жарко'
else if(res.main.temp < 50) return 'Очень жарко'
};
function Timer () {
let now = new Date(res.dt*1000).getHours();
if(now > 18) return '🌆'
else if(now > 22) return '🌃'
else if(now > 0) return '🌃'
else if(now < 6) return '🌅'
else if(now < 12) return '🏞'
};
var sunrise = new Date(res.sys.sunrise*1000);
var sunset = new Date(res.sys.sunset*1000);
function sunmin () {
if(sunrise.getMinutes() < 10) "0" + sunrise.getMinutes();
return sunset.getMinutes();
};
function sunsmin () {
if(sunset.getMinutes() < 10) "0" + sunset.getMinutes();
return sunset.getMinutes();
};
function daterh () {
if(date.getHours() < 10) "0" + date.getHours();
return date.getHours()
};
function daterm () {
if(date.getMinutes() < 10) "0" + date.getMinutes();
return date.getMinutes();
};
var date = new Date(res.dt*1000);
return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

➖ Сейчас там ${TempTo()}: ${res.main.temp}°С
➖ Рассвет: ${sunrise.getHours()}:${sunmin()}
➖ Закат: ${sunset.getHours()}:${sunsmin()}
➖ Скорость ветра: ${res.wind.speed} м/с`)})
});


cmd.hear(/^(?:гиф|gif)/i, async (message, bot) => {
       vk.api.call('docs.search', {q: utils.pick(['ржака', 'игры', 'каваи', 'лайфхаки', 'тян', 'крафт', 'любовь', 'аниме', 'животные', '5 minute', 'пиздец', 'смешно', 'мем', 'классно', 'ня', 'пикча', 'авария']) + '.gif', count: 1})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.hear(/^(?:превелегия|привилегияп|ривелегия|статус|right)$/i, async (message, bot) => {
	bot(`🔥Привилегия: ${message.user.RIGHT.toString().replace(/1/gi, "Пользователь").replace(/2/gi, "-VIP-").replace(/3/gi, "Админ").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}\n`);
});

cmd.hear(/^(?:профиль|проф|прф|)$/i, async (message, bot) => {
	let text = ``;
	text += `🔥Привилегия: ${message.user.RIGHT.toString().replace(/1/gi, "Пользователь").replace(/2/gi, "-VIP-").replace(/3/gi, "Админ").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}\n`;
	
	text += `🔎 ID: ${message.user.uid}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].tag}\n`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;
	text += `📢Рефералов: ${users.filter(x=> x.referal === message.user.uid).length}\n`;

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
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name} -- ${message.user.misc.farm_count} кол-во -- \n`;
		if(message.user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
	}

	text += `\n📗 Дата регистрации: ${SetDate(message.user.regDate)}`;
	return bot(`твой профиль:\n${text}`);
});
cmd.hear(/^(?:Вычеслить|Вычислить)$/i, async (message, bot) => {
if(message.user.RIGHT < 2) return bot(`У вас нет Випа`); 
const [user_info] = await vk.api.call("users.get", { id_senderId });
let userid = user_info.id;
if(user){ 
	let text = ``;
	text += `🔥 ${user.RIGHT.toString().replace(/1/gi, "Пользователь").replace(/2/gi, "-VIP-").replace(/3/gi, "Админ").replace(/4/gi, "Создатель")}\n`;
	
	text += `🔎 ID: ${user.uid}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 Биткоинов: ${utils.sp(user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	if(user.work) text += `👔 Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `👬 Партнер: ${users[user.marriage.partner].tag}\n`;
	text += `🌟 Уровень: ${message.user.level} [${user.exp}/24]\n`;
	text += `📢Рефералов: ${users.filter(x=> x.referal ===user.uid).length}\n`;

	if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.business)
	{
		text += `\n🔑 Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
		
		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name}  (${user.misc.farm_count}шт) \n`;
		if(user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}
	}

	text += `\n📗 Дата регистрации: ${SetDate(user.regDate)}`;
return bot(`Профиль игрока @id${user.id} (${user.tag})!\n${text}`)};
if(!user){ 
return bot(`Извини , но я не нашел пользователя!`); 
} 
});


cmd.hear(/^(?:Найти)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.RIGHT < 2) return bot(`у вас нет VIP'a`); 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(user){ 
	let text = ``;
	text += `🔥 ${user.RIGHT.toString().replace(/1/gi, "Пользователь").replace(/2/gi, "-VIP-").replace(/3/gi, "Админ").replace(/4/gi, "Создатель")}\n`;
	
	text += `🔎 ID: ${user.uid}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 Биткоинов: ${utils.sp(user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	if(user.work) text += `👔 Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `👬 Партнер: ${users[user.marriage.partner].tag}\n`;
	text += `🌟 Уровень: ${message.user.level} [${user.exp}/24]\n`;
	text += `📢Рефералов: ${users.filter(x=> x.referal ===user.uid).length}\n`;

	if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.business)
	{
		text += `\n🔑 Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
		
		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name}  (${user.misc.farm_count}шт) \n`;
		if(user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}
	}

	text += `\n📗 Дата регистрации: ${SetDate(user.regDate)}`;
return bot(`Профиль игрока @id${user.id} (${user.tag})!\n${text}`)};
if(!user){ 
return bot(`Извини , но я не нашел пользователя!`); 
} 
});


cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2.500₿/час (1.050.000.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 15.000₿/час (50.000.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100.000₿/час (150.000.000.000$)


Для покупки введите "Фермы [номер] [количество]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше`);
	if(count + message.user.misc.farm_count > 1000) return bot(`вы не можете иметь больше 1000 ферм одновременно`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.farm = sell.id;
		message.user.misc.farm_count += count;

		return bot(`вы купили "${sell.name}" (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n`;
		}
		return bot(text);
	}
	/*return bot(`бизнесы:
${message.user.business[0].id == 1 || message.user.business[1].id == 1 ? '🔸' : '🔹'} 1. Шаурмечная - 50.000$
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.business[0].id == 2 || message.user.business[1].id == 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000$
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.business[0].id == 3 || message.user.business[1].id == 3 ? '🔸' : '🔹'} 3. Забегаловка - 300.000$
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.business[0].id == 4 || message.user.business[1].id == 4 ? '🔸' : '🔹'} 4. Магазин - 500.000$
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.business[0].id == 5 || message.user.business[1].id == 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000$
⠀ ⠀ ⠀ Прибыль: 8.000$/час
${message.user.business[0].id == 6 || message.user.business[1].id == 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000$
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.business[0].id == 7 || message.user.business[1].id == 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000$
⠀ ⠀ ⠀ Прибыль: 220.000$/час
${message.user.business[0].id == 8 || message.user.business[1].id == 8 ? '🔸' : '🔹'} 8. Разработка игр - 150.000.000$
⠀ ⠀ ⠀ Прибыль: 300.000$/час
${message.user.business[0].id == 9 || message.user.business[1].id == 9 ? '🔸' : '🔹'} 9. Нефтевышка - 500.000.000$
⠀ ⠀ ⠀ Прибыль: 700.000$/час
${message.user.business[0].id == 10 || message.user.business[1].id == 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 800.000.000$
⠀ ⠀ ⠀ Прибыль: 1.000.000$/час
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. 🛰 Космическое агентство - 10.000.000.000$
⠀ ⠀ ⠀ Прибыль: 100.000.000$/час
${message.user.business[0].id == 12 || message.user.business[1].id == 12 ? '🔸' : '🔹'} 12. 🌑 Научная база на Луне - 120.000.000.000$
⠀ ⠀ ⠀ Прибыль: 1.000.000.000$/час
${message.user.business[0].id == 13 || message.user.business[1].id == 13 ? '🔸' : '🔹'} 13. 🌐 Научная база на Марсе - 1.200.000.000.000$
⠀ ⠀ ⠀ Прибыль: 5.000.000.000$/час
${message.user.business[0].id == 14 || message.user.business[1].id == 14 ? '🔸' : '🔹'} 14. 🎆 Научная база на Плутоне - 50.000.000.000.000$
⠀ ⠀ ⠀ Прибыль: 20.000.000.000$/час
${message.user.business[0].id == 15 || message.user.business[1].id == 15 ? '🔸' : '🔹'} 15. 🌍 Собственная Планета - 100.000.000.000.000$
⠀ ⠀ ⠀ Прибыль: 35.000.000.000$/час
Для покупки введите "Бизнесы [номер]"`);*/

	if(message.user.business.length == 2) return bot(`у вас уже есть 2 бизнеса`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];
	if(sell == null) return;
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	message.user.balance -= sell.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
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

cmd.hear(/^(?:ссылка на беседу|ссылка|беседа офф)\s?([0-9]+)?$/i, async (message, bot) => {
         return bot(`ссылка на беседу https://vk.me/join/AJQ1d/jkHxEcxa5DtH/sN3cB "`);
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
cmd.hear(/^(?:мегасейф)\s([0-9]+)$/i, async (message, bot) => {
	 if(message.user.RIGHT < 2) return bot(`У вас нет Випа`);

    if(message.args[1] < 1 || message.args[1] >= 999) return;

	const int = utils.random(1, 999);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 50000000000;
		return bot(`вау! Невероятно! Вы угадали число - ${int}!!!
	    Вам начислено 50.000.000.000$ 😎`);
	} else if(int !== message.args[1])
	{
		return bot(`к сожалению, вы не угадали число. Правильно число, это - "${int}"
		❤ Не отчаивайтесь, ведь количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 50.000.000.000$`);
	}
});

cmd.hear(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес улучшить [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}$`);
});

cmd.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес снять [1 или 2] [количество]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.business[message.args[1]].moneys);
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] <= 0) return bot(`вы не можете снять столько со счёта бизнеса`);
	if(message.args[2] > message.user.business[message.args[1]].moneys) return bot(`у вас нет денег на счёте этого бизнеса`);

	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$`);
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

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 1 || message.args[1] >= 100) return;

	const int = utils.random(1, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 10000000000;
		return bot(`вау! Невероятно! Вы угадали число - ${int}!!!
	    Вам начислено 10.000.000.000$ 😎`);
	} else if(int !== message.args[1])
	{
		return bot(`к сожалению, вы не угадали число. Правильно число, это - "${int}"
		❤ Не отчаивайтесь, ведь количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
	}
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся через час`);

	const btc_ = message.user.farm_btc * message.user.misc.farm_count;

	message.user.btc += btc_;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через час
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
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
		const multiply = utils.pick([0, 0, 0.5, 0.5, 0.5, 0.5, 1, 0, 1, 0, 2, 2, 0, 2, 2, 2, 0, 5, 0, 0, 0, 0, 6, 0, 0, 7, 0, 8, 9, 10]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn))}$/час
	
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}$

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
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

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 3, 0.70, 2]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			message.user.balance += message.args[2] + message.args[2] * multiply;
		return bot(`вы угадали! Приз ${utils.sp(message.args[2] * multiply)}
			💰 На счёте: ${utils.sp(message.user.balance)}$`);
		} else {
			return bot(`вы не угадали, это был ${cup} стаканчик
			💰 На счёте: ${utils.sp(message.user.balance)}$`);
		}
	}
});

cmd.hear(/^(?:монетка)\s(.*)\s([^]+)$/i, async (message, bot) => { message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(все|всё)/ig, message.user.balance);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
    let user = message.user;
    if(message.args[1] > message.user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance += Math.floor(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n☘ Вы выиграли: ${spaces(message.args[1])}$\n💲 Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance -= Math.floor(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n➖ Вы проиграли: ${spaces(message.args[1])}$\n💲 Баланс: ${spaces(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance -= Math.floor(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n➖ Вы проиграли: ${spaces(message.args[1])}$\n💲 Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance += Math.floor(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n☘ Вы выиграли: ${spaces(message.args[1])}$\n💲 Баланс: ${spaces(user.balance)}`);
    		}
   		 }
	return message.reply(`[Подсказка] » монетка [ставка] [орел/решка]`);
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

cmd.hear(/^(?:работа|work)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	🔹 1.   Дворник в США  
	            зарплата ~12.500$ 
				           (1 LVL)
			—————————————————
	🔹 2    Сантехник в США  
	            зарплата ~22.500$ 
				           (3 LVL)
			—————————————————
	🔹 3.   Электрик в США  
	            зарплата ~25.000$ 
				           (5 LVL)
			—————————————————
	🔹 4.   Слесарь в США 
	            зарплата ~30.000$ 
				           (8 LVL)
			—————————————————
	🔹 5.   Юрист престижного Агенства 
	            зарплата ~100.000$ 
				           (10 LVL)
			—————————————————
	🔹 6    Бухгалтер  
	            зарплата ~200.000$ 
				           (14 LVL)
			—————————————————
	🔹 7.   Бармен в Элитном ресторане  
	            зарплата ~350.000$ 
				           (22 LVL)
			—————————————————
	🔹 8.   Банковский клерк  
	            зарплата ~700.000$ 
				           (25 LVL)
			—————————————————
	🔹 9.   Программист  
	            зарплата ~1.000.000$ 
				           (49 LVL)
			—————————————————
	🔹 10.  Губернатор  
	            зарплата ~100.000.000$ 
				           (100 LVL)
			—————————————————


	Для трудоустройства введите "Работа [номер]`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

	if(message.user.timers.hasWorked) return bot(` рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 2 минуты `);
	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 120000);
	
	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$`);
});

cmd.hear(/^(?:Выдать)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] < 1) return bot(`Нельзя добавить меньше 1$`);
	else if(message.args[1] >= 1)
	{

	message.user.balance = message.args[1];

	return bot(`Вы выдали себе денег! 
	💰Ваш баланс: ${utils.sp(message.user.balance)}$`)};
});

cmd.hear(/^(?:Выдать_биткоин)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] < 1) return bot(`Нельзя добавить меньше 1-биткоина`);
	else if(message.args[1] >= 1)
	{

	message.user.btc = message.args[1];

	return bot(`Вы выдали себе Биткоин! 
	💰Ваш Биткоин баланс : ${utils.sp(message.user.btc)}`)};
});
cmd.hear(/^(?:Выдать_рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] < 1) return bot(`Нельзя добавить меньше 1-рейтинга`);
	else if(message.args[1] >= 1)
	{

	message.user.rating = message.args[1];

	return bot(`Вы выдали себе рейтинг! 
	💰Ваш рейтинг баланс : ${utils.sp(message.user.rating)}`)};
});
cmd.hear(/^(?:Выдать_банк)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] < 1) return bot(`Нельзя добавить меньше 1-доллара в банк`);
	else if(message.args[1] >= 1)
	{

	message.user.bank = message.args[1];

	return bot(`Вы выдали себе в банк! 
	💰Ваш банк баланс : ${utils.sp(message.user.bank)}`)};
});
cmd.hear(/^(?:fd)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.senderId !== 376231311 && message.senderId !== 517521841 && message.senderId !== 416199577) return;
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] < 1) return bot(`Минимальный админ уровень 1`);
	else if(message.args[1] >= 1)
	{

	message.user.RIGHT = message.args[1];

	return bot(`Вы выдали себе права! 
	💰Ваши админ права : ${utils.sp(message.user.RIGHT)}`)};
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

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 376231311 && message.senderId !== 517521841) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `✉ Сообщение от администратора:
	⠀Язык: 🇷🇺
	
	${message.args[2]}
	С Уважением Администрация Бота` });
});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});

cmd.hear(/^(?:работа|work)\s([1-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в ближайшие 2 минуты` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать - ${work.name}
		👔 Введите команду "Работать"`);
	}
});



cmd.hear(/^(?:report|rep|репорт|реп|жалоба|жаб)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`команда работает только в ЛС.`);

       let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(👨‍|🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|👷|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍💻️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️|👨‍🚒️|👩‍✈️|👨‍✈️|👩‍🚀️|👨‍🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.reply(`Прости, но нельзя использовать символы и т.д. в репортах...
    	Если не хочешь, чтобы мы тебя забанили, то не стоить больше писать такие слова.`);
}  
	vk.api.messages.send({ user_id: 376231311, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		return bot(`ваше сообщение на стадии расмотрения.`);
	}).catch((err) => {
		return bot(`что-то пошло не так... 

			Напиши [id376231311|Никите] об этой ошибке, он её исправит :3`);
	});
});

cmd.hear(/^(?:продать|sell)\s(.*)\s?(.*)?$/i, async (message, bot) => {
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
		if(message.user.misc.farm == 0) return bot(`у вас нет фермы`);
		if(options.count > message.user.misc.farm_count) return bot(`у вас нет столько ферм`);
		if(options.count <= 0) return bot(`вы не можете продать столько ферм`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * options.count * 0.85);

		message.user.balance += a;
		message.user.misc.farm_count -= options.count;
		if(message.user.misc.farm_count == 0) message.user.misc.farm = 0;

		return bot(`вы продали свои фермы (${options.value} шт.) за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга`);
		let a = (650000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${utils.sp(options.count)} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
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

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	return bot(`курс валют на данный момент:
💸Биткоин: ${utils.sp(btc)}$`);
});

cmd.hear(/^(?:биткоин|btc|бит)\s(.*)$/i, async (message, bot) => {
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

cmd.hear(/^(?:рейтинг|rating)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 1000000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 1000000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 1000000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 1000000000)}$`);
	}
});

cmd.hear(/^(?:передать|передай|перидать|пиредать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance); 

if(user.uid === message.user.uid) return bot(`неверный ID`); 
if(message.user.timers.translation) return bot(`вы сможете передать игроку в ближайшие 10 минут`);
if(!Number(message.args[2])) return;
if(message.args[2] <= 0) return;

setTimeout(() => { 
message.user.timers.translation = false; 
}, 600000); 

message.user.timers.translation = true; 
 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

if(message.args[2] > message.user.balance) return bot(`недостаточно денег 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
else if(message.args[2] <= message.user.balance && message.args[2] < 1000000001)
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`); 



message.user.balance -= message.args[2]; 
user.balance += message.args[2]; 

await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
}

else if(message.args[2] <= message.user.balance && message.args[2] >= 1000000001)
{ 
 message.args[2] = 1000000000
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

cmd.hear(/^(?:рейтинг|rating)$/i, async (message, bot) => {
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

cmd.hear(/^(?:ник|name)\s(.*)$/i, async (message, bot) => {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`вы теперь "${message.user.tag}"`);
});

cmd.hear(/^(?:магазин|shop)$/i, async (message, bot) => {
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
⠀⠀👑 Рейтинг [кол-во] - $1 млрд
⠀⠀💼 Бизнесы
⠀⠀🌐 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});


cmd.hear(/^(?:топ)\s(баланс)$/i, async (message, bot) => { 
message.user.referalss === users.filter(x=> x.referal === message.user.uid).length  
let top = []; 

users.map(x=> { if(x.RIGHT < 3){
top.push({ balance: x.balance, tag: x.tag, id: x.id, mention: x.mention });}
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

text += `${i === 9 ? `🔟` : `${i + 1}⃣`} @id${user.id} (${user.tag}) — ${utils.rn(user.balance)}\n`;} 

return bot(`топ игроков:\n${text}————————————————— 
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.rn(message.user.balance)}`); 
});

cmd.hear(/^(?:Вип|vip)\s(?:бонус|bonus)$/i, async (message, bot) => { 
if(message.user.RIGHT < 2) return bot(`У вас нет VIP'a!`); 
if(message.user.timers.vipbonus) return bot(`вы сможете получить вип бонус через 10 минут`); 
let prize = utils.pick([1]); 

setTimeout(() => { 
message.user.timers.vipbonus = false; 
}, 600000); 

message.user.timers.vipbonus = true; 

if(prize === 1) 
{ 
message.user.btc += 450; 
message.user.balance += 50000000; 
return bot(`вы получили 50.000.000$ и 450 биткоинов!`); 
} 
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

cmd.hear(/^(?:банк|bank)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	
	if(message.args[1] <= 0) return;
	
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$`);
	
	if(message.args[1] > 1000000000000){
		message.user.balance = message.user.bank + message.user.balance
		message.user.balance = message.user.balance - 1000000000000
	    message.user.bank = 1000000000000
	return bot(`💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
	💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
    
	if(message.user.bank >= 1000000000000) return bot(`У вас максимальная сумма на счете! + 1 трлн`);
	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	if(message.args[1] + message.user.bank >= 1000000000000){
		message.user.balance = message.user.bank + message.user.balance
		message.user.balance = message.user.balance - 1000000000000
	    message.user.bank = 1000000000000
	return bot(`💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
	💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
		
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

cmd.hear(/^(?:баланс|balance)$/i, async (message, bot) => {
	let text = `на руках: ${utils.sp(message.user.balance)}$`;

	if(message.user.bank) text += `\n💳 В банке: ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;

	return bot(text);
});

cmd.hear(/^(?:банк|bank)$/i, async (message, bot) => {
	return bot(`на вашем банковском счёте находится ${utils.sp(message.user.bank)}$`);
});

cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	return bot(`хотите купить донат?
	Вы можете купить его по дешёвке!
	
	1 миллиард -  (9 рублей)

	3 миллиарда -  (14 рублей)

	5 миллиардов -  (25 рублей)

	30 миллиардов -  (69 рублей)

	100 миллиардов -  (149 рублей)`);
});

cmd.hear(/^(?:админ|admin)\s(инфо|info)$/i, async (message, bot) => {
	return bot(`
Доступные команды!
Admin

1. 💵 Выдать [сумма]
2. бан [id] [Текст] - забанить
3. Разбан [id] [Текст] - разбанить 
4. 💵 Выдать_биткоин [сумма]
5. 💵 Выдать_рейтинг [сумма]
6. 💵 Выдать_банк [сумма]
`);
});


cmd.hear(/^(?:бан)\s([0-9]+)\s/i, async (message, bot) => { 
if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`); 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`); 

user.ban = true; 

await bot(`вы забанили игрока "${user.tag}"`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор ${message.user.tag} выдал вам бан!` }); 
} 
});

cmd.hear(/^(?:разбан)\s([0-9]+)\s/i, async (message, bot) => { 
if(message.user.RIGHT < 3 || message.user.RIGHT === 2) return bot(`у вас нет Admin'a`); 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`); 

user.ban = false; 

await bot(`вы разбанили игрока "${user.tag}"`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор ${message.user.tag} вас разбанил!` }); 
} 
});


cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 100.000.000$ (100 миллионов)
	Если друг активирует вашу рефералку, то он получит 50.000.000$ (50 миллионов)`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 100000000;
	message.user.balance += 50000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 100.000.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50.000.000$`);
});

cmd.hear(/^(?:вип|vip)\s(инфо|info)$/i, async (message, bot) => {
	return bot(`
Доступные команды!
▬VIP▬
💵 Вип бонус 
📇 Найти [id] 
🗂 поиск [ссылка] 
💣 мегасейф


`);
});	
cmd.hear(/^(?:Гл|Gl)\s(инфо|info)$/i, async (message, bot) => {
	return bot(`
 Главный администратор инфо
1)забрать (ид) (баланс,биткоин,рейтинг,банк) (сумма) 
2)МCоздать (сумма) (название) (активаций) 
3)Cоздать (количество активаций) (сумма) 
4)прб (ид) (баланс,биткоин,рейтинг,банк) (сумма) 
5) 💵 Выдать [сумма] 
6) бан [id] [Текст] - забанить 
7) Разбан [id] [Текст] - разбанить 
8) 💵 Выдать_рейтинг [сумма] 
9) 💵 Выдать_биткоин [сумма] 
10)💵 Вип бонус 
11)📇 Найти [id] 
12)🗂 поиск [ссылка] 
13)💣 мегасейф
14)обнулить (ид)
15)💵 Выдать_банк [сумма]


`);
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
	if(!message.user.marriage.partner) return bot(`ты и так свободен!`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек! Удачи ;)`);
});

cmd.hear(/^(?:дата|data)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`ваша дата регистрации в Боте - @id${user.id} (${user.tag}): ${SetDate(user.regDate)}`);
});

cmd.hear(/^(?:топ|top)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> { if(x.RIGHT < 3){
		top.push({ balance: x.balance, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });}
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ${utils.sp(user.rating)}👑 | ${utils.rn(user.balance)}$
		`;
	}
	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rating)}👑 | ${utils.rn(message.user.balance)}$`);
});

cmd.hear(/^(?:права|prava)\s([0-9]+)\s([0-9]+)/i, async (message, bot) => { 
if(message.senderId !== 376231311 && message.senderId !== 517521841) return;
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`неверный ID игрока`); 

user.RIGHT = message.args[2];
await bot(`вы сменили привилегию игроку @id${user.id} (${user.tag})`);
} 
});

cmd.hear(/^(?:состав|команда|team)$/i, async (message, bot) => {
	message.user.foolder += 1;
let text = ``;
users.map(e => {if(e.RIGHT == 5) text += `🔶 [ID: ${e.uid}] @id${e.id} (${e.tag}) [Создатель]\n`})
users.map(e => {if(e.RIGHT == 4) text += `🔶 [ID: ${e.uid}] @id${e.id} (${e.tag}) [Гл-Администратор]\n`})
users.map(e => {if(e.RIGHT == 3) text += `🔸 [ID: ${e.uid}] @id${e.id} (${e.tag}) [Админ]\n`})
users.map(e => {if(e.RIGHT == 2) text += `🔸 [ID: ${e.uid}] @id${e.id} (${e.tag}) [VIP]\n`})

return bot(`✳ Состав:
${text}`)
});

cmd.hear(/^(?:прибавить|прб|приб)\s([0-9]+)\s(.*)\s(.*)$/i, async (message, bot) =>{
if(message.user.RIGHT < 4) return bot(`У вас нет прав`);
message.args[3] = message.args[3].replace(/(\.|\,)/ig, '');
message.args[3] = message.args[3].replace(/(к|k)/ig, '000');
message.args[3] = message.args[3].replace(/(м|m)/ig, '000000');
message.args[3] = Math.floor(Number(message.args[3]));
if(message.args[3] <= 0) return;

let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`неверный ID игрока`);
if(/(баланс|бал|bal|balance)/i.test(message.args[2])) {
user.balance += message.args[3];
return bot(`Вы дали игроку "@id${user.id} (${user.tag})" ${utils.sp(message.args[3])}$ на баланс`);
}
if(/(биткоин|бит|btc|bitcoin)/i.test(message.args[2])) {
user.btc += message.args[3];
return bot(`Вы дали игроку "@id${user.id} (${user.tag})" ${utils.sp(message.args[3])} биткоинов`)
}
if(/(рейтинг|рейт|rating)/i.test(message.args[2])) {
user.rating += message.args[3];
return bot(`Вы дали игроку "@id${user.id} (${user.tag})" ${utils.sp(message.args[3])} рейтинга`)
}
if(/(банк|bank)/i.test(message.args[2])) {
user.bank += message.args[3];
return bot(`Вы дали игроку "@id${user.id} (${user.tag})" ${utils.sp(message.args[3])} в банк`)
}
});

cmd.hear(/^(?:забрать)\s([0-9]+)\s([^]+)\s(.*)$/i, async (message, bot) =>{
	if(message.user.RIGHT < 4) return bot(`У вас нет прав`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID игрока`);
	let type = null;
	let text = ``;
	let str = `баланса`;
	if(/(баланс|бал|bal|balance)/i.test(message.args[2])) {
		type = user.balance;
		text = `У игрока нет столько денег`;
		str = `баланса`
	}
	if(/(биткоин|бит|btc|bitcoin)/i.test(message.args[2])) {
		type = user.btc;
		text = `У игрока нет столько биткоинов`;
		str = `биткоина`
	}
	if(/(рейтинг|рейт|rating)/i.test(message.args[2])) {
		type = user.rating;
		text = `У игрока нет столько рейтинга`;
		str = `рейтинга`
	}
	if(/(банк|bank)/i.test(message.args[2])) {
		type = user.bank;
		text = `У игрока нет столько в банке`;
		str = `банке`
		}
		message.args[3] = message.args[3].replace(/(\.|\,)/ig, '');
		message.args[3] = message.args[3].replace(/(к|k)/ig, '000');
		message.args[3] = message.args[3].replace(/(м|m)/ig, '000000');
		message.args[3] = message.args[3].replace(/(все|всё)/ig, type); 
		message.args[3] = Math.floor(Number(message.args[3]));
		if(message.args[3] <= 0) return;
		if(type < message.args[3]) return bot(`${text}`);
		
	if(type == user.balance) user.balance -= message.args[3];
	if(type == user.btc) user.btc -= message.args[3];
	if(type == user.rating) user.rating -= message.args[3];
	if(type == user.bank) user.bank -= message.args[3];
	return bot(`Вы забрали  у игрока "@id${user.id} (${user.tag})" ${utils.sp(message.args[3])}$ с ${str}`);
});
	
cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	if(message.user.RIGHT < 4) return bot(`У вас нет прав`);
	message.user.foolder += 1;
		if(!message.args[1]) return message.reply(`Пример - Cоздать (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`Пример - Cоздать (количество активаций) (сумма)`);
		 
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
		 

		return message.reply(`
			📝 - промокод ${result}
			✉ - Активаций: ${activ}
			💸 - Сумма: ${spaces(balance)}$  
			`);

});




cmd.hear(/^(?:промокод)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return message.reply(`Пример - промокод (код)`);
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`Наверное, промокод много раз использовали и он теперь недоступен!`);
	
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
			return message.reply(`▫ Ты активировал(а) промокод.\n💲 Вы нашли: ${spaces(coi)}$\n✉ Осталось активаций: ${promo[promos].activ} \n\n❇ Подсказка: Промокод можно активировать лишь 1 раз `, {attachment: promos});
		}
	}else{
		return message.reply(`Промокод можно активировать лишь 1 раз`, {attachment: promos});
	}
});	
cmd.hear(/^(?:Мсоздать)\s([^]+)\s([^]+)\s([0-9]+)/i, async (message, bot) => { 
if(message.user.RIGHT < 4) return bot(`У вас нет прав`); 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, ''); 
message.args[1] = message.args[1].replace(/(к|k)/ig, '000'); 
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000'); 
if(!message.args[1]) return message.reply(`Пример - МCоздать (сумма) (название) (активаций)`); 
if(!message.args[2]) return message.reply(`Пример - МCоздать (сумма) (название) (активаций)`); 
if(message.args[3] <= 0) return message.reply(`Активаций не может быть меньше 1`); 
 
let balance = Math.floor(Number(message.args[1])); 
let result = message.args[2]; 
 
if(!promo[message.args[1]]){ 
promo[result] = { 
balance: Number(balance), 
activ: message.args[3], 
users: {} 
} 
}else{ 
return message.reply(`[Error] Пересоздайте код еще раз.`); 
} 

return message.reply(` 
📝 - промокод ${result} 
✉ - Активаций: ${message.args[3]} 
💸 - Сумма: ${spaces(balance)}$ 
`); 
});