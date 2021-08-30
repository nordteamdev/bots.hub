const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const {Keyboard} = require("vk-io");
const donate_key = 'ключ автодоната';
const request = require('prequest');
const kazna = require('./base/kazna.json');
let user = new VK();
user.setOptions({
	token: 'Типичный кодер' // token ot страницы ( не обязательно )
});
let giving = false;
const footwear = [
	{
		name: 'Палённые кроссовки',
		cost: 5500,
		id: 1
	},
	{
		name: 'SAUCONY',
		cost: 200000,
		id: 2
	},
	{
		name: 'FILA',
		cost: 450000,
		id: 3
	},
	{
		name: 'TIMBERLAND',
		cost: 700000,
		id: 4
	},
	{
		name: 'PUMA',
		cost: 800000,
		id: 5
	},
	{
		name: 'UNDER ARMOUR',
		cost: 1000000,
		id: 6
	},
	{
		name: 'ASICS',
		cost: 1250000,
		id: 7
	},
	{
		name: 'REEBOK',
		cost: 1450000,
		id: 8
	},
	{
		name: 'NEW BALANCE',
		cost: 1650000,
		id: 9
	},
	{
		name: 'ADIDAS',
		cost: 1700000,
		id: 10
	},
	{
		name: 'NIKE',
		cost: 2000000,
		id: 11
	}
]

const pants = [
	{
		name: 'Палённые штаны',
		cost: 8000,
		id: 1
	},
	{
		name: 'COS',
		cost: 700000,
		id: 2
	},
	{
		name: 'GANT',
		cost: 800000,
		id: 3
	},
	{
		name: 'BROOKS BROTHERS',
		cost: 1200000,
		id: 4
	},
	{
		name: 'J. CREW',
		cost: 1450000,
		id: 5
	},
	{
		name: 'STRELLSON',
		cost: 1500000,
		id: 6
	},
	{
		name: 'LUCIANO BARBERA',
		cost: 1600000,
		id: 7
	},
	{
		name: 'INCOTEX',
		cost: 1750000,
		id: 8
	},
	{
		name: 'CORNELIANI',
		cost: 1850000,
		id: 9
	},
	{
		name: 'ASICS',
		cost: 2000000,
		id: 10
	},
	{
		name: 'HUGO BOSS',
		cost: 2450000,
		id: 11
	}
]

const tors = [
	{
		name: 'Футболка неизвестного бренда',
		cost: 10000,
		id: 1
	},
	{
		name: 'NIKE',
		cost: 500000,
		id: 2
	},
	{
		name: 'ZARA',
		cost: 680000,
		id: 3
	},
	{
		name: 'LOUIS VUITTON',
		cost: 1600000,
		id: 4
	},
	{
		name: 'HERMES',
		cost: 1800000,
		id: 5
	},
	{
		name: 'CHANEL',
		cost: 2300000,
		id: 6
	},
	{
		name: 'GUCCI',
		cost: 2580000,
		id: 7
	},
	{
		name: 'UNDER ARMOUR',
		cost: 2870000,
		id: 8
	},
	{
		name: 'ARMANI',
		cost: 3000000,
		id: 9
	},
	{
		name: 'VERSACE',
		cost: 3400000,
		id: 10
	},
	{
		name: 'D&G',
		cost: 3800000,
		id: 11
	}
	
]

const head = [
	{
		name: 'Кепка неизвестного бренда',
		cost: 500,
		id: 1
	},
	{
		name: 'BEFREE',
		cost: 140000,
		id: 2
	},
	{
		name: 'OBEY',
		cost: 320000,
		id: 3
	},
	{
		name: 'NIKE',
		cost: 400000,
		id: 4
	},
	{
		name: 'UNDER ARMOUR',
		cost: 480000,
		id: 5
	},
	{
		name: 'GUCCI',
		cost: 745000,
		id: 6
	}
]

const privel = [
	{
		name: 'vip',
		cost: 35,
		id: 1
	},
		{
		name: 'admin',
		cost: 80,
		id: 2
	},
		{
		name: 'megaadmin',
		cost: 280,
		id: 3
	}
]

const cars = [
	{
		name: 'Лада Калина',
		cost: 1000000,
		id: 1
	},
	{
		name: 'Лада Нива',
		cost: 2200000,
		id: 2
	},
	{
		name: 'Bugatti Chiron',
		cost: 30000000,
		id: 3
	},
	{
		name: 'Bugatti Veryon',
		cost: 41000000,
		id: 4
	},
	{
		name: 'SSC Tuatara',
		cost: 59000000,
		id: 5
	},
	{
		name: 'Lamborghini Avendator',
		cost: 80000000,
		id: 6
	},
	{
		name: 'McLaren F1',
		cost: 100000000,
		id: 7
	},
	{
		name: 'Ferrari Enzo V5',
		cost: 300000000,
		id: 8
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

const stranas = [

	{
		name: 'Не указана',
		cost: 0,
		id: 1
    },
	{
		name: '🇺🇸США',
		cost: 0,
		id: 2
    },

	{
		name: '🇷🇺Россия',
		cost: 0,
		id: 3
    },

	{
		name: '🇰🇷Япония',
		cost: 0,
		id: 4
    },

	{
		name: '🇺🇦Украина',
		cost: 0,
		id: 5
    },
	{
		name: '🇰🇿Казахстан',
		cost: 0,
		id: 6
    },
	{
		name: '🇧🇾Беларусь',
		cost: 0,
		id: 7
    },
	{
		name: '🇹🇩Молдавия',
		cost: 0,
		id: 8
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
		name: 'Коттедж Медведева',
		cost: 4500000,
		id: 1
	},
	{
		name: 'Особняк Порошенко',
		cost: 7250000 ,
		id: 2
	},
	{
		name: 'Дом на Рублёвке',
		cost: 10000000,
		id: 3
	},
	{
		name: 'Личный небоскрёб Tramp',
		cost: 15000000,
		id: 4
	},
	{
		name: 'Остров с особняком',
		cost: 19500000,
		id: 5
	},
	{
		name: 'Белый дом Путина',
		cost: 23000000,
		id: 6
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
		cost: 2500,
		id: 1
	},
	{
		name: 'Nokia 3310 (2017)',
		cost: 5000,
		id: 2
	},
	{
		name: 'ASUS ZenFone 4',
		cost: 20000,
		id: 3
	},
	{
		name: 'BQ Aquaris X',
		cost: 100000,
		id: 4
	},
	{
		name: 'Sony Xperia XA',
		cost: 150000,
		id: 5
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 300000,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 500000,
		id: 7
	},
	{
		name: 'Torex FS1',
		cost: 750000,
		id: 8
	},
	{
		name: 'iPhone X',
		cost: 2500000,
		id: 9
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
	},
	{
		name: 'FM2019-BTC2000',
		cost: 1000000000,
		id: 4
	},
	{
		name: 'Коробка админа',
		cost: 99999999999999999999,
		id: 5
	}
];

const businesses = [
	[ // Бизнес #1
		{ // Стандартный бизнес
			name: 'Шаурмечная',
			cost: 50000,
			earn: 200,
			workers: 1,
			id: 1,
			icon: '🥖'
		},

		{ // Первое улучшение
			name: '5 шаурмечных',
			cost: 350000,
			earn: 1000,
			workers: 10,
			id: 1,
			icon: '🥖'
		},

		{ // Второе улучшение
			name: 'Небольшая сеть шаурмечных',
			cost: 900000,
			earn: 2625,
			workers: 30,
			id: 1,
			icon: '🥖'
		},

		{ // Третье улучшение
			name: 'Средняя сеть шаурмечных',
			cost: 1200000,
			earn: 3750,
			workers: 50,
			id: 1,
			icon: '🥖'
		},

		{ // Последнее улучшение
			name: 'Лучшая шаурма в стране',
			cost: 4000000,
			earn: 11000,
			workers: 200,
			id: 1,
			icon: '🥖'
		}
	],

	[
		{
			name: 'Ларёк',
			cost: 100000,
			earn: 700,
			workers: 1,
			id: 2,
			icon: '🏪'
		},

		{
			name: '5 ларьков',
			cost: 500000,
			earn: 3700,
			workers: 5,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Средняя сеть ларьков',
			cost: 950000,
			earn: 7725,
			workers: 40,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки во всех городах страны',
			cost: 8000000,
			earn: 37450,
			workers: 150,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки в каждой стране',
			cost: 17500000,
			earn: 79950,
			workers: 400,
			id: 2,
			icon: '🏪'
		}
	],

	[
		{
			name: 'Забегаловка',
			cost: 300000,
			earn: 2700,
			workers: 3,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Общепит',
			cost: 450000,
			earn: 4350,
			workers: 7,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Ресторан',
			cost: 450000,
			earn: 7400,
			workers: 15,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Небольшая сеть ресторанов',
			cost: 4000000,
			earn: 19900,
			workers: 80,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Лучшие рестораны в стране',
			cost: 11000000,
			earn: 47400,
			workers: 300,
			id: 3,
			icon: '🍷'
		}
	],

	[
		{
			name: 'Мини-магазин',
			cost: 500000,
			earn: 4100,
			workers: 15,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Магазин',
			cost: 1250000,
			earn: 9350,
			workers: 10,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Сеть магазинов',
			cost: 3000000,
			earn: 23350,
			workers: 70,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Сеть супермаркетов',
			cost: 20000000,
			earn: 109850,
			workers: 500,
			id: 4,
			icon: '🏫'
		}
	],

	[
		{
			name: 'Завод в гараже',
			cost: 1500000,
			earn: 8800,
			workers: 5,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Средний завод',
			cost: 3500000,
			earn: 13800,
			workers: 20,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Сеть заводов',
			cost: 15000000,
			earn: 60800,
			workers: 200,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Главные заводы страны',
			cost: 50000000,
			earn: 274800,
			workers: 1000,
			id: 5,
			icon: '🏭'
		}
	],

	[
		{
			name: 'Угольная шахта',
			cost: 25000000,
			earn: 84700,
			workers: 50,
			id: 6,
			icon: '⛏'
		},

		{
			name: 'Золотая шахта',
			cost: 50000000,
			earn: 117200,
			workers: 75,
			id: 6,
			icon: '⛏'
		},

		{
			name: 'Алмазная шахта',
			cost: 60000000,
			earn: 229700,
			workers: 200,
			id: 6,
			icon: '⛏'
		},

		{
			name: 'Алмазный карьер',
			cost: 90000000,
			earn: 432700,
			workers: 360,
			id: 6,
			icon: '⛏'
		},

		{
			name: 'Крупнейший алмазный карьер',
			cost: 200000000,
			earn: 709700,
			workers: 700,
			id: 6,
			icon: '⛏'
		}
	],

	[
		{
			name: 'Маленький офис',
			cost: 80000000,
			earn: 229625,
			workers: 10,
			id: 7,
			icon: '🏢'
		},

		{
			name: 'Средний офис',
			cost: 240000000,
			earn: 329175,
			workers: 60,
			id: 7,
			icon: '🏢'
		},

		{
			name: 'Большой офис',
			cost: 240000000,
			earn: 614675,
			workers: 200,
			id: 7,
			icon: '🏢'
		},

		{
			name: 'Офис-небоскрёб',
			cost: 1000000000,
			earn: 1227275,
			workers: 700,
			id: 7,
			icon: '🏢'
		}
	],

	[
		{
			name: 'Любительский GameDev',
			cost: 150000000,
			earn: 302000,
			workers: 5,
			id: 8,
			icon: '🕹'
		},

		{
			name: 'Инди GameDev',
			cost: 200000000,
			earn: 379500,
			workers: 10,
			id: 8,
			icon: '🕹'
		},

		{
			name: 'AA GameDev',
			cost: 750000000,
			earn: 1024500,
			workers: 50,
			id: 8,
			icon: '🕹'
		},

		{
			name: 'AAA GameDev',
			cost: 5000000000,
			earn: 6749500,
			workers: 500,
			id: 8,
			icon: '🕹'
		}
	],

	[
		{
			name: 'Нефтевышка',
			cost: 500000000,
			earn: 707000,
			workers: 8,
			id: 9,
			icon: '🏜'
		},

		{
			name: 'Нефтеплатформа в море',
			cost: 750000000,
			earn: 1019000,
			workers: 20,
			id: 9,
			icon: '🏜'
		},

		{
			name: 'Нефтеплатформа в океане',
			cost: 1250000000,
			earn: 4049000,
			workers: 50,
			id: 9,
			icon: '🏜'
		},

		{
			name: '5 нефтеплатформ в океане',
			cost: 5000000000,
			earn: 15249000,
			workers: 250,
			id: 9,
			icon: '🏜'
		}
	],

	[
		{
			name: 'Мини АЭС',
			cost: 800000000,
			earn: 1050700,
			workers: 40,
			id: 10,
			icon: '💡'
		},

		{
			name: 'Средняя АЭС',
			cost: 1200000000,
			earn: 1496200,
			workers: 75,
			id: 10,
			icon: '💡'
		},

		{
			name: 'АЭС с 5 энергоблоками',
			cost: 4250000000,
			earn: 3088700,
			workers: 300,
			id: 10,
			icon: '💡'
		},

		{
			name: 'Крупнейшая АЭС',
			cost: 10000000000,
			earn: 34843700,
			workers: 650,
			id: 10,
			icon: '💡'
		}
	],

	[
		{
			name: 'Apple Store',
			cost: 25000000000,
			earn: 250000000,
			workers: 75,
			id: 11,
			icon: '🗺'
		},

		{
			name: 'Магазин Apple',
			cost: 3000000000000,
			earn: 1000000000,
			workers: 150,
			id: 11,
			icon: '🗺'
		},

		{
			name: 'Центральный Apple Store',
			cost: 9000000000000,
			earn: 5000000000,
			workers: 250,
			id: 11,
			icon: '🗺'
		},

		{
			name: 'Завод Apple',
			cost: 20000000000000,
			earn: 11000000000,
			workers: 500,
			id: 11,
			icon: '🗺'
		},

		{
			name: 'Заводы Apple по всему миру',
			cost: 100000000000000,
			earn: 45000000000,
			workers: 1000,
			id: 11,
			icon: '🗺'
		},

		{
			name: 'Заводы Apple по всему миру',
			cost: 200000000000000,
			earn: 75000000000,
			workers: 1500,
			id: 11,
			icon: '🗺'
		}
	]
];
const works = [
	{
		name: 'Работник в Орифлейм',
		requiredLevel: 1,
		min: 20000,
		max: 25000,
		id: 1
	},
	{
		name: 'Программист в ITM',
		requiredLevel: 2,
		min: 37500,
		max: 40000,
		id: 2
	},
	{
		name: 'Уборщик в IT школе',
		requiredLevel: 3,
		min: 40000,
		max: 45000,
		id: 3
	},
	{
		name: 'Работник в Роскомнадзоре',
		requiredLevel: 4,
		min: 50000,
		max: 55000,
		id: 4
	},
	{
		name: 'Уборщик в Роскомнадзоре',
		requiredLevel: 5,
		min: 75000,
		max: 80000,
		id: 5
	},
	{
		name: 'Программист в Kaspersky',
		requiredLevel: 6,
		min: 90000,
		max: 94890,
		id: 6
	},
	{
		name: 'Зам.Президента IT школы',
		requiredLevel: 7,
		min: 100000,
		max: 125000,
		id: 7
	},
	{
		name: 'Президент IT школы',
		requiredLevel: 8,
		min: 125000,
		max: 135000,
		id: 8
	},
	{
		name: 'Основатель RuNet',
		requiredLevel: 9,
		min: 160000,
		max: 175000,
		id: 9
	},
	{
		name: 'Основатель DarkNet',
		requiredLevel: 10,
		min: 1600000,
		max: 1750000,
		id: 10
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
			x.farm_btc += 200000;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += 300000;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += 500000;
		}
		if(x.misc.farm === 4)
		{
			x.farm_btc += 1000000;
		}
		if(x.misc.farm === 5)
		{
			x.farm_btc += 100000000;
		}
	});
}, 900000);

setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
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
user.timers.translation = false; 
user.orcase = false; 
user.war = false; 
user.urabota = false; 
user.a_case = false; 
user.a_war = false; 
user.vivi = false; 
user.bonus_balance = false; 
user.bcase = false; 
user.timers.shaxta = false; 
user.bonus_exs = false; 
user.timers.eda = false; 
user.timers.krik = false; 
user.timers.mine = false; 
user.giverub = false; 
user.energy = 10;
user.timers.blockpay = false; 
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


async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveKazna()
{
	require('fs').writeFileSync('./base/kazna.json', JSON.stringify(users, null, '\t'));
	return true;
}


vk.setOptions({ token: 'cec95c59e7272d5cebd34a9f1bf5d6a92890205743b1bf9f8cbcbfed209f5640a70d43ddb3bb39cc00dfe', pollingGroupId: 190739238 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club190739238\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club190739238\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		message.send (`[👋🏻]Добро Пожаловать игрок ! Я игровой бот "Steven Bot".
[👾]Вы успешно прошли Регистрацию,что-бы узнать мои команды введите команду помощь "помощь"
`);
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
            id: message.senderId,
			uid: users.length,
			 podpis: 0,
               hei: 0,
               video: 0,
               kanal: false,
               knser: false,
               mikro: false,
               serkn: false,
               kakake: false,
			   opit: 0,
               uggg: false,
               vivi: false,
               fggg: false,
               bonus_balance: false,
               xxxkn: false,
               herkn: false,
               bcase: false,
               orcase: false,
               huikn: false,
               govkn: false,
               gerkn: false,
               gggkn: false,
               zolkn: false,
               brilkn: false,
               monit: false,
               prosm: 0,
               dizlike: 0,
               kom: 0,
               global_podpis: 0,
               huih: 0,
               cers: 0,
               name: `Имя буд канала`,
               bbbb: 0,
               monk: false,
			podarki: 10,
               kaki: false,
			cip: 0,
			his: 0,
			like: 0,
               obor: false,
            balance: 5500,
			rubins: 0,
			bank: 0,
			diamonds: 0,
			emeralds: 0,
			verify: 0,
			pass: 0,
			coal: 0,
			a_war: false,
			iron: 0,
			uron: 0,
			war: false,
            card: 0,
            hero_id: false,
            hero_name: `Герой не выбран`,
            hero_hp: 100,
            hero_zashita: 8,
            hero_ataka: 10,
            hero_kr_udar: 4,
			gold: 0,
			btc: 0,
			farm_btc: 0,
			straik: 0,
			prefix: 1,
			energy: 10,
			pay: false,
			gold: 0,
            biz: 0,
            ruda: 0,
		    alvl: 0,
			donate: 0,
			car_skorost: 1,
			car_loshidey: 1,
			givemyrub: false,
			stat: false,
			urabota: false,
			ymoney: 0,
            warns: 0,
            warn: 0,
			warn_p: `Нет`,
			rating: 0,
			regDate: `${date.getDate() < 10 ? [0] + (date.getDate() + 1) : date.getDate()}.${date.getMonth() < 10 ? [0] + (date.getMonth() + 1) : date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				translation: false,
				commands: false,
				clanwar: false,
				delacc: false,
				obva: false,
				blockpay: false,
				krik: false,
				mine: false,
				hasWorked: false,
				bonus: false,
			    poxod: false,
				poxod2: false,
			    shaxta: false,
            },
			tag: user_info.first_name,
			work: 0,
            sword: false,
            eda: false,
            times: false,
            call: 0,
            clan: 0,
			clans: [],
            ccard: false,
         	business: [],
			brank: 2, //ballas rank
			grank: 2, //groove rank
			bpriglos: 0,
			gpriglos: 0,
			mer:false,
			pp: 0,
			card: 0,
			case1: 0,
			case2: 0,
			case3: 0,
			case4: 0,
			seccard: 0,
			cardss: 0,
            messages: true,
            giverub: false,
            mute: false,
			message: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
			transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				strana: 1,
				helicopter: 0
			},
			realty: {
				home: 0,
				apartment: 0
			},
			misc: {
				phone: 0,
				farm: 0,
			    farm_count: 0,
				pet: 0
            },
			cloth: {
				head: 0,
				tors: 0,
				pants: 0,
				footwear: 0
			},
			marriage: {
				partner: 0,
				requests: [],
			},
			pet: {
				lvl: 0,
				poterl: false
			

			}
		});
	} 
	
bcase: false,

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

cmd.on(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	if(i.id != 467656406 && i.id != 274077723 && i.id != 467656406) return;
	try {
	  message.send("Готово: "+JSON.stringify(eval(args[1])));
	} catch(err){
		console.log(err);
		message.send("~Error: "+ err);
	}
});

cmd.on(/^(?:Страны)$/i, async (message, bot) => {
	return bot(`Список стран:

	1.❓Не указана
	2.🇺🇸США
	3.🇷🇺Россия
	4.🇰🇷Япония
	5.🇺🇦Украина
	6.🇰🇿Казахстан
	7.🇧🇾Беларусь
	8.🇹🇩Молдавия
	
	Для выбора страны проживания введите:Страна [номер]`);
});

cmd.on(/^(?:Страна 7)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 7;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 8)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 8;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 6)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 6;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 5)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 5;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 4)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 4;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 3)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 3;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});


cmd.on(/^(?:Страна 1)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 1;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

cmd.on(/^(?:Страна 2)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 2;
		return bot(`Вы успешно сменили страну проживания. Напоминаем: За оскорбления по нацинальности, рассовому, религиозному признаку, и.т.д - бан`);
	}
});

/////*Обнова тут*0.1*/////////////

cmd.on(/^(?:dev|Разработчики)$/i, async (message, bot) => {
	return bot(`Разработчики:

	1.Разработчик: @nikita_briskin (ДЮДЮКА)
	2.Разработчик: @niksorokin2005 
	
	`);
});

/////*1*/////////////

cmd.on(/^(?:прайс-лист|цены|!прайс-лист|Sпрайс-лист|!цены|Sцены|прайс|!прайс|Sпрайс)$/i, async (message, bot) => {
	return bot(`Цены:

		1.Привелегия: Вип
			Стоит : 35 Рублей
			Покупка : Привелегии (Комманда в боте)
		2.Привелегия: Админ
			Стоит : 80 Рублей
			Покупка : Привелегии (Комманда в боте)
		3.Привелегия: MegaAdmin
			Стоит : 280 Рублей
			Покупка : Привелегии (Комманда в боте)
		
		
	`);
});

/////*2*/////////////

cmd.on(/^(?:соглашение|!соглашение|Sсоглашение)$/i, async (message, bot) => {
	return bot(`
		Пользовательское соглашение проекта |Разных Тем|:
1.  Используя услуги проекта |Разных Тем| Вы автоматически соглашаетесь со всем перечисленным ниже.
1.1 Покупая любую услуги проекта |Разных Тем|, Вы соглашаетесь на - изъятие данной услуги по усмотрению следящих данной услуги, без возврата средств, а так же отказ при покупке по соображениям следящего по данному продукту.
1.2 В любое время мы можем сделать с Вашей учётной записью |Разных Тем| и всевозможными аккаунтами наших дочерних проектов (в том числе и ботов) необходимые по нашему мнению действия: Удалить, заблокировать, сбросить прогресс/статистику/покупки, прекратить поставку услуги, отказать в покупке, ввести санкции в случае нарушений правил использования услуг проекта |Разных Тем|.
1.3 Всё купленные ранее услуги проекта |Разных Тем| мы имеем право отменить, без возврата средств.
1.4 Все беседы проекта |Разных Тем|, а также дочерних проектов, имеют право в отказании Вам в услугах, отмене или изъятии чего-либо, что способна сделать беседа.
	`);
});

/////*3*/////////////

cmd.on(/^(?:Головной убор|Шапка)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.pass < 1) return bot(`Нету паспорта! Что бы его получить введите команду "!паспорт", затем "правила" !`);
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Головные уборы: 
${message.user.cloth.head === 1 ? '🔹' : '🔸'} 1. Кепка неизвестного бренда (500$)
2. BEFREE (140000$)
3. OBEY (320000$)
4. NIKE (400000$)
5. UNDER ARMOUR (480000$)
6. GUCCI (745000$)
Для покупки введите "Шапка [номер]"`);

	const sell = head.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.cloth.head) return bot(`У Вас уже есть шапка (${head[message.user.cloth.head - 1].name}), введите "Продать шапку"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.cloth.head = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:Кофты|Футболки|Куртки|Верх)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.pass < 1) return bot(`Нету паспорта! Что бы его получить введите команду "!паспорт", затем "правила" !`);
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Кофты и футболки с куртками: 
${message.user.cloth.tors === 1 ? '🔹' : '🔸'} 1. Футболка неизвестного бренда (10000$)
2. NIKE (500000$)
3. ZARA (680000$)
4. LOUIS VUITTON (1600000$)
5. HERMES (1800000$)
6. CHANEL (2300000$)
7. GUCCI (2580000$)
8. UNDER ARMOUR (2870000$)
9. ARMANI (3000000$)
10. VERSACE (3400000$)
11. D&G (3800000$)

Для покупки введите "Верх [номер]"`);

	const sell = cloth.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.cloth.tors) return bot(`У Вас уже есть верхняя одежда (${tors[message.user.cloth.tors - 1].name}), введите "Продать верх"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.cloth.tors = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:Штаны|!штаны|Sштаны)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.pass < 1) return bot(`Нету паспорта! Что бы его получить введите команду "!паспорт", затем "правила" !`);
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Одежда: 
${message.user.cloth.pants === 1 ? '🔹' : '🔸'} 1. Палённые штаны (8000$)
2. COS (700000$)
3. GANT (800000$)
4. BROOKS BROTHERS (1200000$)
5. J. CREW (1450000$)
6. STRELLSON (1500000$)
7. LUCIANO BARBERA (1600000$)
8. INCOTEX (1750000$)
9. CORNELIANI (1850000$)
10. ASICS (2000000$)
11. HUGO BOSS (2450000$)
Для покупки введите "Штаны [номер]"`);

	const sell = pants.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.cloth.cloth) return bot(`У Вас уже есть штаны (${pants[message.user.cloth.pants - 1].name}), введите "Продать штаны"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.cloth.pants = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:Обувь|!обувь|Sобувь)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.pass < 1) return bot(`Нету паспорта! Что бы его получить введите команду "!паспорт" !`);
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Одежда: 
${message.user.cloth.footwear === 1 ? '🔹' : '🔸'} 1. Палённые кросовки (5500$)
2. SAUCONY (200000$)
3. FILA (450000$)
4. TIMBERLAND (700000$)
5. PUMA (800000$)
6. UNDER ARMOUR (1000000$)
7. ASICS (1250000$)
8. REEBOK (1450000$)
9. NEW BALANCE (1650000$)
10. ADIDAS (1700000$)
11. NIKE (2000000$)
Для покупки введите "обувь [номер]"`);

	const sell = footwear.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.cloth.footwear) return bot(`У Вас уже есть обувь (${footwear[message.user.cloth.footwear - 1].name}), введите "Продать обувь"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.cloth.footwear = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

/////*4*/////////////

cmd.on(/^(?:givedonate|!givedonate|Sgivedonate)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 5) return message.send(`🔸 » Вы не Разработчик`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givedonate [ID] [COUNT]'`); 
	users[message.args[1]].donate += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}донат рублей`);
});

    cmd.on(/^(?:Гонка)\s?([0-9]+)?/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`@id${message.user.id}(${message.user.tag}),\n?? Пример команды: "гонка ID(игрока)"`);
		let i = Number(message.args[1])
		if(message.user.uid == i) return message.send(`@id${message.user.id}(${message.user.tag}),\n?? Упс... Вы указали свой ID`);
		let a = users[i];
		if(!users[i]) return message.send(`@id${message.user.car}(${message.user.tag}),\n?? У него нет машины.Он бомж.`);
		if(message.user.car < 0) return message.send(`@id${message.user.id}(${message.user.tag}),\n?? ??У Вас нет машины купите её в магазине??.`);
		if(message.user.war == true) return message.send(`@id${message.user.id}(${message.user.tag}),\n?? ??Видутся тех роботы вашего транспорта??.`);
		if(a.war == true) return message.send(`@id${message.user.id}(${message.user.tag}),\n?? ??Этот игрок уже устраивает гонки??.`);

		 

		let summ_user = message.user.hero_hp + message.user.hero_zashita + message.user.hero_ataka;
		let summ_a = a.hero_hp + a.hero_zashita + a.hero_ataka;

		if(rand(0,1) == 1){ 
			summ_user += message.user.hero_kr_udar; 
		} 
		if(rand(0,1) == 1){ 
			summ_a += a.hero_kr_udar; 
		} 
		if(message.user.gun != false){ summ_user += message.user.uron;}
		if(a.gun != false){ summ_a += a.uron;}

		if(summ_user > summ_a){
			message.user.hero_hp += 1; message.user.hero_zashita += 1; message.user.hero_ataka += 1; message.user.hero_kr_udar += 1; message.user.rubins += rand(100,250);
			if(message.user.alvl == 1){message.user.rubins += rand(100,250);}
			message.send(`@id${message.user.id}(${message.user.tag}),
				? Мощь Вашей машины ${summ_user}%
				? Мощь противника машины ${a.tag} ${summ_a}%

				?? Победу гонки одержал ${message.user.tag}!
				?? Вы получаете 100.000.000 на баланс .
				?? Характеристики машины улучшены на 1%.
			`);
		}
		if(summ_user < summ_a){
			a.hero_hp += 1; a.hero_zashita += 1; a.hero_ataka += 1; a.hero_kr_udar += 1; a.balance += 100000000;
			if(a.alvl == 1){message.user.rubins += rand(100,250);}
			message.send(`@id${message.user.id}(${message.user.tag}),
				? Мощь Вашей машины: ${summ_user}%
				? Мощь противника машины ${a.tag} ${summ_a}%

				?? К сожелению вы проиграли победил ${a.tag}!
				?? <${a.tag}> получает на свой баланс 100000000.
				?? Характеристики его машины улучшены на 1%.
			`);
		}
		if(summ_a == summ_user){
			message.send(`@id${message.user.id}(${message.user.tag}),
				? Мощь Вашей машины: ${summ_user}%
				? Мощь союзника машины${a.tag} ${summ_a}%

				?? Шансы равны...
				?? Бой не состоялся.
			`);
		}
		message.user.war = true;
		a_war = true;
		setTimeout(() => {
			message.user.war = false;
			a_war = false;
		}, 6000); // 6000 
	});

//////////*ДОНАТ*////////////

cmd.on(/^(?:Привелегия|Привелегии)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Привелегии: 
${message.user.alvl === 1 ? '🔹' : '🔸'} 1. VIP (1 ДРубль)

Для покупки введите "Привелегия [номер]"`);

	const sell = privel.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.alvl) return bot(`У Вас уже есть донат, введите "Продать привелегию" (УДАЛЯЕТ БЕЗ ВОЗВРАТА СРЕДСТВ!)`);

	if(message.user.donate < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.donate >= sell.cost)
	{
		message.user.donate -= sell.cost;
		message.user.alvl = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

////////////////////////

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
		const multiply = utils.pick([0.25, 0.75, 0.5, 0.5, 0.5, 0.5, 0.50, 0.50, 0.75, 0.75, 0.25, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

/////*Ютуб*/////////////

cmd.on(/^(?:создать канал|!crch|Scrch)\s?([^]+)?/i, async (message, args, bot) => {
	let user = message.user 
	let zaprets1 = message.args[1].toLowerCase();
          if(message.user.obor == false) return message.send(`${message.user.tag}, У Вас нет оборудования!`);
		if(message.user.obor == true){
		if(message.user.kanal == true) return message.send(`${message.user.tag}, У Вас уже есть канал!`);
		if(message.user.kanal == false){
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`${message.user.tag}, Придумайте адекватное название канала`);
     }
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`${message.user.tag}, Придумайте адекватное название канала`);
	}
	if(message.args[1].length > 18) return message.send(`${message.user.tag}, Максимальная длина канала 18 символов.`);
	if(user.balance < 1000) return message.send(`${message.user.tag} У вас не достаточно денег для создания канала, стоимость 1.000₽`);
 	user.balance -= 1000;
	user.name = message.args[1];
     user.kanal = true;
	return message.send(`${message.user.tag}, Вы успешно создали канал: ${message.args[1]}`);
      }
   }
});

cmd.on(/^(?:оборудование|!оборудование|Sоборудование)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.obor == true) return message.send(`${message.user.tag}, У Вас уже есть оборудование!`);
		if(message.user.obor == false){
 		if(message.user.balance < 3000) return message.send(`${message.user.tag}, У Вас не достаточно денег! Цена оборудования 3.000₽.`);
 		message.user.balance -= 3000;
          message.user.obor = true;
	return message.send(`${message.user.tag}, Вы успешно купили оборудование для съёмок! Вас ждёт светлое будущее`);
   }
});

	cmd.on(/^(?:канал|!канал|Sканал)$/i, async (message, bot) => {

	let user = message.user
	let id = message.user.id
		if(message.user.kanal == false) return message.send(`(${message.user.tag}), У Вас нет канала`);
		if(message.user.kanal == true){
		return message.send(`
         (${message.user.tag}), твой канал 🔥
       📕 Название канала: ${message.user.name}
	   💎 Баланс канала: ${message.user.ymoney}
       😻 Подписчики: ${message.user.podpis}
       🚫 Хейтеры: ${message.user.hei}
       👁 Просмотры: ${message.user.prosm}
       👍 Лайки: ${message.user.like}
       👎 Дизлайки: ${message.user.dizlike}
       💬 Комментарии: ${message.user.kom}
       🎥 Ролики: ${message.user.video}
       ⛔ Страйки: ${message.user.straik}

		Кнопки:\n`+
		(message.user.serkn== false ? ` ` : `Серебрянная кнопка: Получена\n`)+
          (message.user.zolkn== false ? ` ` : `Золотая кнопка: Получена\n`)+
          (message.user.brilkn== false ? ` ` : `Бриллиантовая кнопка: Получена\n`)+
		`
			`);
			}
 		return message.send(text)
 	});

 	 	cmd.on(/^(?:юработать|!юработать|Sюработать)$/i, async (message, bot) => {
		let user = message.user
 		let id = message.user.id
 		if(message.user.urabota == true) return message.send(`${message.user.tag}, Работать можно раз в 10 минут`);
 		message.user.urabota = true
		setTimeout(() => {
			message.user.urabota = false
		}, 600000);

 		text = ' Ухх, тяжелый был денёк😃!\n💰Вы заработали: '
 		let count = rand(1,1);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(100,200)
 				if(message.user.bonus_balance == true) mon = mon * 2;
 				text += ` ${spaces(mon)}$\n`
 				message.user.ymoney += mon
 			}
 			if(x>79 && x <80){
 				mon = 1
 				text += `${spaces(mon)}$\n`
 				message.user.ymoney += mon
 			}
 			if(x>80){
 				mon = rand(1,5)
 				if(message.user.bonus_exs == true) mon = mon * 2;
 				message.user.ymoney += mon
 					text += `${mon}$\n`
 				}
 				 
 				 
 			}
 		return message.send(text)
 	});

cmd.on(/^(?:получить ск|!givesb|Sgivesb)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(messageuser.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала !`);
		if(messageuser.kanal == true){
		if(messageuser.serkn == true) return message.send(`${message.user.tag}, Вы уже получили кнопку !`);
		if(messageuser.serkn == false){
 		if(messageuser.podpis < 100000) return message.send(`${message.user.tag}, У Вас не достаточно подписчиков. Нужно 100000`);

     message.user.serkn = true;
	return message.send(`${message.user.tag}, Вы получили серебрянную кнопку, поздравляю !`);
     }
   }
});

updates.hear(/\/кнопки|!кнопки|Sкнопки/i, (context) => {
	let platform = false
	if(context.isChat) platform = true
	let user = users.bs[base.id[context.senderId].id]
	let nick = ``
	if(user.nicknotify == false) {
		nick = `${base.bs[base.id[context.senderId].id].nick}`
	}
	if(user.nicknotify == true) {
		nick = `*id${context.senderId} (${user.bs[user.id[context.senderId].id].nick})`
	}
	let myclan = clan[base.bs[base.id[context.senderId].id].clan]
	if(context.isChat) return context.send(`${nick}, данную команду можно использовать только в ЛС!!`)
	return context.send(`📚 Настройка:
						 | /кнопки вкл / включить кнопки.
						 | /кнопки изм (текст) (1-3)/ изменить текст кнопки.`)
})

cmd.on(/^(?:получить зк|!givegb|Sgivegb)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.zolkn == true) return message.send(`${message.user.tag}, Вы уже получили кнопку!`);
		if(message.user.zolkn == false){
 		if(message.user.podpis < 1000000) return message.send(`${message.user.tag}, У Вас не достаточно подписчиков. Нужно 1 миллион`);

     message.user.zolkn = true;
	return message.send(`${message.user.tag}, Вы получили золотую кнопку, поздравляю !!`);
     }
   }
});
user.orcase = false; 
user.urabota = false; 
user.a_case = false;
cmd.on(/^(?:получить бк|!givedb|Sgivedb)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.message.user.brilkn == true) return message.send(`${message.user.tag}, Вы уже получили кнопку!`);
		if(message.user.brilkn == false){
 		if(message.user.podpis < 10000000) return message.send(`${message.user.tag}, У Вас не достаточно подписчиков. Нужно 10 миллионов`);

     message.user.brilkn = true;
	return message.send(`${message.user.tag}, Вы получили брилиантовую кнопку, поздравляю !!!`);
     }
   }
});

cmd.on(/^(?:гулять|!гулять|Sгулять)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	if(user.vivi == true) return message.send(`${message.user.tag}, Гулять можно раз в 3 часа`);
 		user.vivi = true
		setTimeout(() => {
			user.vivi = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `${message.user.tag}, Вы снова можете гулять!"` 
		});
		}, 10800000);
	let rez = [1,2].random();
	if(rez == 1){
  		let text = [].random(); 
          mones = rand(1000,4000);
       	message.user.balance += mones;
		return message.send(`${message.user.tag}, Гуляя, вы нашли кошелек, в котором лежало ${spaces(mones)}₽`);
   }
	if(rez == 2){
		let text = [].random(); 
		hmones = rand(2000,4000);
       	message.user.balance -= hmones;
		return message.send(`${message.user.tag}, Гуляя на Вас напала банда хейтеров, на лечение Вы потратили: ${spaces(hmones)}₽`);
	}
});

 	 cmd.on(/^(?:стрим|!стрим|Sстрим)$/i, async (message, bot) => {
		let user = message.user
         	if(message.user.mikro == false) return message.send(`${message.user.tag}, У Вас нет микрофона, купите его командой «микрофон» без «»`);
		if(message.user.mikro == true){
 		if(message.user.a_case == true) return message.send(`${message.user.tag}, Стримить можно один раз в 5 минут`); 
 		let id = message.user.id
 		message.user.a_case = true
		setTimeout(() => {
			message.user.a_case = false
		}, 600000);

 		text = ''
 		let count = rand(1,1);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = 2 + message.user.podpis + 5
 				if(user.bonus_balance == true) mon = mon * 2;
 				text += `${message.user.tag}, Мои подписчики самые крутые😊\n💰Заработано за стрим: ${spaces(mon)}₽\n`
 				message.user.ymoney += mon
 			}
 			if(x>81 && x <82){
 				mon = 2 + message.user.podpis + 5
 				text += `${message.user.tag}, Обожаю себя!😋\n💰Заработано за стрим: ${spaces(mon)}₽\n`
 				message.user.ymoney += mon
 			}
 				 }
 				 
 		}
 		return message.send(text)
 	});

 	cmd.on(/^(?:реклама|!реклама|Sреклама)$/i, async (message, bot) => {
	let user = message.user
	if(message.user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
    ${message.user.tag}, Хай, хочешь купить рекламу для своего канала😏?

✅Мы - самая надежная и законная компания по продаже рекламы, с нами Вы достигнете карьерного роста !

1.Тариф «Старт»:
　📈Прирост: ~1.000 сабов
　💸Цена: 15.000₽

2.Тариф «Нормал»:
　📈Прирост: ~10.000 сабов
　💸Цена: 75.000₽

3.Тариф «Про»:
　📈Прирост: ~100.000 сабов
　💸Цена: 750.000₽

4. Тариф «Мега»:
　💸Прирост: ~500.000 сабов
　💸Цена: 3.000.000₽

5. Тариф «Гипер»:
　💸Прирост: ~1.000.000 сабов
　💸Цена: 30.000.000₽      

🔥Для покупки введите реклама «нужный вам тариф»
　📈 пиши : реклама <нужный тариф»
  Пример : рекалама мега

    `)
   });

cmd.on(/^(?:тренды|!тренды|Sтренды)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ podpis: x.podpis, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.podpis - a.podpis;
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

	for (let i = 0; i < 5; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 🎬 ${utils.sp(user.podpis) } подписчиков
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag}, у вас — 🎬 ${utils.sp(message.user.podpis)} сабов`);
});

 	cmd.on(/^(?:снять|!снять|Sснять)\s?([^]+)?/i, async (message, args, bot) => {
	let user = message.user
	 let id = message.user.id
	 
	 if(message.args[1].length < 2) return message.send(`Слишком мало символов в названии видео!`);
	 if(message.args[1].length > 40) return message.send(`Слишком много символов в названии видео!`);	 
		if(message.user.kanal == false) return message.send(`У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.orcase == true) return message.send(`Снимать можно раз в 10 минут`);
 		message.user.orcase = true
		setTimeout(() => {
			message.user.orcase = false
		}, 600000);
	if(message.args[1].length > 40) return message.send(`Максимальная длина ролика 40 символов.`);
     message.user.video += 1;
     mones = 1 + message.user.podpis + 3;
 	message.user.ymoney += mones;
     likes = message.user.podpis + 2 - rand(2,5);
     message.user.like += likes;
     dizlikes = message.user.hei - rand(10,12);
     message.user.dizlike += dizlikes;
     prosm = 3 + message.user.podpis * rand(4,6);
     message.user.prosm += prosm;
     podpis = rand(10,30);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
     heit = rand(20,50);
     message.user.hei += heit;
     kom = 1 + message.user.podpis - rand(2,3);
     message.user.kom += kom;
	return message.send(`${message.user.tag}, Вы успешно отсняли ролик: ${message.args[1]}\n\n🎬Статистика ролика:\n👁 Просмотров: ${spaces(prosm)}\n👍 Лайков: ${spaces(likes)}\n👎 Дизлайков: ${spaces(dizlikes)}\n💬 Комментариев: ${spaces(kom)}\n💸 + ${spaces(mones)}$\n🎬Новых сабов: ${spaces(podpis)}\n🚫 Новых хейтеров: ${spaces(heit)}\n✅Ты на верном пути, продолжай выпускать ролики!:`);
   }
});

cmd.on(/^(?:микрофон)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.mikro == true) return message.send(`${message.user.tag}, У Вас уже есть микрофон!`);
		if(message.user.mikro == false){
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала)`);
		if(message.user.kanal == true){
 		if(message.user.ymoney < 500) return message.send(`${message.user.tag}, У Вас не достаточно денег цена микрофона 500₽ .`);
 		message.user.ymoney -= 500;
         message.user.mikro = true;
	return message.send(`${message.user.tag}, Вы успешно купили микрофон для стримов`);
     }
   }
});

cmd.on(/^(?:реклама старт|!advst|Sadvst)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`${message.user.tag}, Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 15000) return message.send(`${message.user.tag}, У Вас не достаточно денег.`);
 		message.user.ymoney -= 15000;
     podpis = rand(700,900);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`${message.user.tag}, Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.on(/^(?:реклама нормал|!advnorm|Sadvnorm)$/i, async (message, bot) => { 
	let user = message.user
     let id = message.user.id

		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`${message.user.tag}, Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 75000) return message.send(`${message.user.tag}, У Вас не достаточно денег.`);
 	message.user.ymoney -= 75000;
     podpis = rand(1000,5000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`${message.user.tag}, Реклама принесла Вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.on(/^(?:реклама про)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У Вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`${message.user.tag}, Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 750000) return message.send(`${message.user.tag}, У вас не достаточно денег.`);
 	message.user.ymoney -= 750000;
     podpis = rand(100000,130000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`${message.user.tag}, Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.on(/^(?:реклама мега)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`${message.user.tag}, Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 3000000) return message.send(`${message.user.tag}, У вас не достаточно денег.`);
 	message.user.ymoney -= 3000000;
     podpis = rand(500000,550000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`${message.user.tag}, Реклама принесла вам ${spaces(podpis)} подписчиков`);
  }
});
cmd.on(/^(?:реклама гипер)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`${message.user.tag}, Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 30000000) return message.send(`${message.user.tag}, У вас не достаточно денег.`);
 	message.user.ymoney -= 30000000;
     podpis = rand(500000,1000000,5000000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`${message.user.tag}, Реклама принесла вам ${spaces(podpis)} подписчиков`);
  }
});
cmd.on(/^(?:убрать хейтеров)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`${message.user.tag}, У тебя нет канала`);
		if(message.user.kanal == true){
 		if(message.user.ymoney < 50000000) return message.send(`${message.user.tag}, У вас не достаточно денег. Чтобы подкупить хейтеров на вашем балансе должно быть 50.000.000₽.`);
		 message.user.ymoney -= 50000000;
     message.user.hei = 1;
	return message.send(`${message.user.tag}, Хейтеры подкуплены!`);
   }
});


 
  ///////////////////////////////////////
	
	cmd.on(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, async (message, args, bot) => { 
 		if(message.chat) return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		if(!message.args[1]) return message.send(`🔸 » Вы не написали жалобу | репорт [текст]`);

		for(i=0;i<25000;i++){
			if(users[i]){
			if(users[i].VIP >= 1){ 
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `📚 | Был задан новый вопрос!\n🆔 >> ID игрока: ${message.user.uid}\n📜 >> Текст ${message.args[1]}\n👉 >> [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 » Вы успешно отправили жалобу.`);
	});
	
	cmd.on(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.vip < 1) return
		if(!Number(message.args[1]) || !message.args[1] || !message.args[2] || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: users[message.args[1]].id,
			message: `👉 » Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	 
		return message.send(`👉 » Ответ отправлен.`)
	});
	

cmd.on(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-999)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])
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
		message: `⏺ » ${message.user.tag} Посадил Вас  в тюрьму на [${message.args[2]}] минут(ы). по причине ${message.args[3]}`
	});
	return message.send(`💰 » Вы посадили в тюрьму игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} минут`); 
});

cmd.on(/^(?:unjail)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
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
    if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(message.user.alvl == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 15000000) return message.send(`💰 » Пример: givemycoins [1-15000000]`);
		message.user.balance += Number(message.args[1]);
	}  
      message.user.giverub = true;
		setInterval(() => {
			message.user.giverub = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.on(/^(?:ver)\s?([0-9]+)?$/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: ver [ID]`);
		if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);

		users[message.args[1]].verify = 1; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Вам выдали потдвержденный акккунт`
		}); 
		return message.send(`✅ » Вы выдали подтвержденный аккаунт игроку [${users[message.args[1]].tag}].`);
	});

	 cmd.on(/^(?:unver)\s?([0-9]+)?$/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].verify = 0; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » У вас забрали потдвержденный акккунт`
		}); 
		return message.send(`✅ » Вы убрали подтвержденный аккаунт игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:givecoins)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 2) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}₽`);
});

updates.hear(/кейск1 (.*)/i, (context) => {
let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
		}
    if(!Number(res)) return context.send(`${nick}, используй: «кейс 1 кол-во» 👀`)
	let colvo = Number(res)
	let price = 50000000000
    price *= Number(colvo)
if(user.balance < price) return context.send(`${nick}, у Вас недостаточно денег 😮`)
user.balance -= Number(price)
user.case1 += Number(colvo) 

	return context.send({message: `${nick}, Вы успешно купили "Сюрприз Кейс" (x${colvo}) 💰`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс 1', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
  })

cmd.on(/^(?:givesubs)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givepodpic [ID] [COUNT]'`); 
	users[message.args[1]].podpis += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}🦊`);
});

cmd.on(/^(?:2givecase)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givepodpic [ID] [COUNT]'`); 
	users[message.args[1]].case2 += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}кейс`);
});

cmd.on(/^(?:3givecase)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givepodpic [ID] [COUNT]'`); 
	users[message.args[1]].case3 += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Мажор кейсов`);
});

cmd.on(/^(?:4givecase)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 5) return message.send(`🔸 » Вы не Разработчик`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givepodpic [ID] [COUNT]'`); 
	users[message.args[1]].case3 += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Донат кейсов`);
});


cmd.on(/^(?:1givecase)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givepodpic [ID] [COUNT]'`); 
	users[message.args[1]].case1 += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} обычных кейсов`);
});

cmd.on(/^(?:removerating)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 1) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'removerating [ID] [COUNT]'`); 
	users[message.args[1]].rating -= Number(message.args[2]);
 	 
	return message.send(`💰 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рейтинга💰`);
});
cmd.on(/^(?:giveymoney)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 2) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giveymoney [ID] [COUNT]'`); 
	users[message.args[1]].ymoney += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}₽ на баланс канала💰`);
});
cmd.on(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let warns = '';
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<users[message.args[1]].warn_p.length;i++){warns += `⛔ » ${users[message.args[1]].warn_p[i]}\n`}
	if(message.user.alvl < 1) return; 
	let id = users[message.args[1]]
	return message.send(`
		📋 Информация об игроке [${id.tag}] 📋
		🔸 » Имя: ${id.tag}
		🔹 » ID: ${message.args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: [id${id.id}|${id.tag}]
		🔹 » Баланс: ${utils.sp(id.balance)}
		🔹 » Тапкоинов: ${utils.sp(id.btc)}
		🔹 » кристаллов: ${utils.sp(id.rubins)}
		🔹 » Донат: ${utils.sp(id.donate)}
		🔹 » Привилегия: ${id.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.alvl >= 1 ? `🔸 » Уровень: ${id.level}\n` : ``)+ 
		(message.user.alvl >= 1 ? `🔸 » Опыт: ${id.exp}\n` : ``)+ 

		(message.user.alvl >= 1 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(message.user.alvl >= 1 ? `⚠ » Причина: [${id.warn_p}]\n` : ``)+ 
		(message.user.alvl >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.on(/^(?:giveadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.alvl < 5) return message.send(`Вы не разработчик`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(1-5)]`); 
		if(message.args[2] > 5) return message.send(` 🔸 >> Максимальный админ-уровень 5!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].alvl = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP'а").replace(/2/gi, "Администратора").replace(3/gi, "MegaAdmin").replace(4/gi, "🖤СуперАдмин🖤").replace(5/gi, "🖤Разработчик🖤")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратора").replace(3/gi, "MegaAdmin").replace(4/gi, "🖤СуперАдмин🖤").replace(5/gi, "🖤Разработчик🖤")}]`);
	});
	
	cmd.on(/^(?:awarn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn += 1;  
        users[message.args[1]].warn_p = `${message.args[2]}`

		let text = `✅ » ${user.tag} Вам выдали варн админстратора по причине: [${message.args[2]}]`
		if(users[message.args[1]].warn == 3){
			users[message.args[1]].warn = 0;
			users[message.args[1]].alvl = 0; 
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Вы сняты с поста.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали предупреждение админа игроку [${users[message.args[1]].tag}].`);
	}); 
	
	cmd.on(/^(?:aunwarn)\s?([0-9]+)?/i, async (message, args, bot) => {
     		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.alvl < 3) return message.send(`🔸 » Вы не MegaAdmin`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » MegaAdmin снял Вам все предупреждения`
		}); 
		return message.send(`✅ » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.alvl < 2) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].balance = 0; 
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:removecase)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.alvl < 2) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].case1 = 0; 
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});


cmd.on(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn += 1;  
        users[message.args[1]].warn_p = `${message.args[2]}`

		let text = `✅ » ${user.tag} Вам выдали варн по причине: [${message.args[2]}]`
		if(users[message.args[1]].warn == 3){
			users[message.args[1]].warn = 0;
			users[message.args[1]].ban = true; 
			text += `\n🔸 » У Вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
	}); 
	
cmd.on(/^(?:бонус|!бонус|Sбонус )$/i, async (message, bot) => {
	if(message.user.timers.bonus == true) return bot(`Бонус можно взять через 24 часа`) 
let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
let carta = rand(1,3); 

setTimeout(() => { 
message.user.timers.bonus = false; 
}, 86400000); 

message.user.timers.bonus = true; 

if(prize === 1) 
{ 
message.user.card += 1; 
message.user.balance += 1000000; 
return bot(`Вы выиграли 10.000.00₽ и 1 Карту Героя`); 
} 

if(prize === 2) 
{ 
message.user.card += 1; 
message.user.btc += 1000; 
return bot(`Вы выиграли 1000฿ и 1 Карту Героя`); 
} 

if(prize === 3) 
{ 
message.user.card += 2; 
message.user.rating += 5; 
return bot(`Вы выиграли 5👑 и 2 Карты Героя!`); 
} 

if(prize === 4) 
{ 
message.user.card += 1; 
message.user.rating += 1; 
return bot(`Вы выиграли 1👑 и 1 Карту Героя!`); 
} 

if(prize === 5) 
{ 
message.user.card += 3; 
message.user.rating += 10; 
return bot(`Вы выиграли 10👑 и 3 Карты Героя!`); 
} 

if(prize === 6) 
{ 
message.user.card += 1; 
message.user.rating += 2; 
return bot(`Вы выиграли 2👑 и 1 Карту Героя!`); 
} 
if(prize === 7) 
{ 
message.user.card += 1; 
message.user.rating += 30; 
return bot(`Вы выиграли 30👑 и 1 Карту Героя!`); 
} 
if(prize === 8) 
{ 
message.user.card += 2; 
message.user.rating += 40; 
return bot(`Вы выиграли 40👑 и 2 Карты Героя!`); 
} 
if(prize === 9) 
{ 
message.user.card += 1; 
message.user.bank += 100000000; 
return bot(`Вы выиграли 100.000.000₽ на свой банковский счёт и 1 Карту Героя!`); 
} 
if(prize === 10) 
{ 
message.user.card += 2; 
message.user.bank += 500000000; 
return bot(`Вы выиграли 500.000.000₽ на свой банковский счёт и 2 Карты Героя!`); 
} 

if(prize === 11) 
{ 
message.user.card += 1; 
message.user.bank += 1000000000; 
return bot(`Вы выиграли 1.000.000.000₽ на свой банковский счёт и 1 Карту Героя!`); 
} 

if(prize === 12) 
{ 
message.user.card += 2; 
message.user.bank += 5000000000; 
return bot(`Вы выиграли 5.000.000.000₽ на свой банковский счёт и 3 Карты Героя!`); 
} 
});


cmd.on(/^(?:Копать кристаллы|!копать|Sкопать)$/i, async (message, args, bot) => {
 if(message.user.timers.shaxta) return message.send(`⚠Вы сможете копать кристаллы бонус через 10 минут`);
 let mine = utils.pick([1, 2, 3, 4, 5]);
  setTimeout(() => {
		message.user.timers.shaxta = false;
	}, 600000);

	message.user.timers.shaxta = true;

if(mine === 1)
	{
		message.user.rubins += 50;
		message.user.exp += 20;
        return message.send(`@id${message.user.id}(${message.user.tag}) Вы накопали 50 кристаллов💎`);
	}

	if(mine === 2)
	{
		message.user.rubins += 80;
		message.user.exp += 70;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы накопали 80 кристаллов💎`);
	}

	if(mine === 3)
	{
		message.user.rubins += 100;
		message.user.exp += 100;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы накопали 100 кристаллов💎`);
	}

	if(mine === 4)
	{
		message.user.rubins += 130;
		message.user.exp += 180;
         return message.send(`@id${message.user.id}(${message.user.tag}) Вы накопали 130 кристаллов💎`);
	}

	if(mine === 5)
	{
		message.user.rubins += 180;
		message.user.exp += 200;
        return message.send(`@id${message.user.id}(${message.user.tag}) вы накопали 180 кристаллов💎`);
	}
});
cmd.on(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.vip < 1) return message.send(`🔸 » Вы не VIP`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		users[message.args[1]].tag = message.args[2];
		return message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
	});
	
updates.hear(/кейсы$/i, (context) => {
let platform = false
if(context.isChat) platform = true
if(user.suprcase > 0) {
	invshow = `👜 У Вас в инвентаре:`
	inv += `\n📦 Сюрприз Кейс (${utils.sp(user.suprcase)} шт.)
📜 Открыть: «кейс открыть 1» `
}
if(user.platcase > 0) {
	invshow = `👜 У Вас в инвентаре:`
	inv += `\n📦 Платинум Кейс (${utils.sp(user.platcase)} шт.)
📜 Открыть: «кейс открыть 2» `
}
return context.send(`${nick}, кейсы: 

1⃣ Сюрприз Кейс: 50.000.000.000$ 
📜 Информация: "кейс инфо 1" 
🛒 Купить: "кейс 1 [кол-во]" 

2⃣ Платинум Кейс: 3.000.000.000.000$ 
📜 Информация: "кейс инфо 2" 
🛒 Купить: "кейс 2 [кол-во]" 

${invshow}
${inv} `)
});

	cmd.on(/^(?:кейс 1|@steven_bot|Кейс 1 )$/i, async (message, bot) => {
	if(message.user.case1 < 1) return message.send(`У Вас нет кейса Обычного`) 
let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
let carta = rand(1,3); 

setTimeout(() => { 
message.user.timers_bonus = false; 
}, 86400000); 

message.user.timers.bonus = true; 

if(prize === 1) 
{ 
message.user.card += 1; 
message.user.balance += 50000000;
message.user.case1 -= 1;
return bot(`Вы выиграйли 50000000₽`); 
} 

if(prize === 2) 
{ 
message.user.card += 1; 
message.user.btc += 1000000;
message.user.case1 -= 1;
return bot(`Вы выиграли 100000฿`); 
} 

if(prize === 3) 
{ 
message.user.case2 += 1; 
message.user.case1 -= 1; 
return bot(`Вы выиграли Кейс платинун`); 
} 

if(prize === 4) 
{ 
message.user.rating += 500; 
message.user.case1 -= 1; 
return bot(`Вы выиграли 500👑`); 
} 

if(prize === 5) 
{ 
message.user.exp += 500; 
message.user.case1 -= 1; 
return bot(`Вы выиграли 500 Опыта`); 
} 

if(prize === 6) 
{ 
message.user.card += 1; 
message.user.exp += 500;
message.user.case1 -= 1; 
return bot(`Вы выиграли 1000 опыта`); 
} 
if(prize === 7) 
{ 
message.user.card += 1; 
message.user.rating += 30;
message.user.case1 -= 1; 
return bot(`Вы выиграли 30👑`); 
} 
if(prize === 8) 
{ 
message.user.card += 2; 
message.user.rating += 4000;
message.user.case1 -= 1; 
return bot(`Вы выиграли 4000👑`); 
} 
if(prize === 9) 
{ 
message.user.card += 1; 
message.user.bank += 100000000;
message.user.case1 -= 1; 
return bot(`Вы выиграли 100.000.000₽ на свой банковский счет`); 
} 
if(prize === 10) 
{ 
message.user.card += 2; 
message.user.bank += 500000000;
message.user.case1 -= 1; 
return bot(`Вы выиграли 500.000.000₽ на свой банковский счет`); 
} 

if(prize === 11) 
{ 
message.user.card += 1; 
message.user.bank += 1000000000;
message.user.case1 -= 1;
return bot(`Вы выиграли 1.000.000.000₽ на свой банковский счёт`); 
} 

if(prize === 12) 
{ 
message.user.card += 2; 
message.user.bank += 5000000000;
message.user.case1 -= 1; 
return bot(`Вы выиграли 5.000.000.000₽ на свой банковский счёт`); 
} 
});


cmd.on(/^(?:setpet)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		users[message.args[1]].misc.pet  = message.args[2];
		return message.send(`📗 » Вы сменили питомца на: ${message.args[2]}`);
	});
	
		cmd.on(/^(?:кейс 2|@steven_bot|Кейс 2 )$/i, async (message, bot) => {
	if(message.user.case2 < 1) return message.send(`У Вас нет кейса Платинуна`) 
let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
let carta = rand(1,3); 
setTimeout(() => { 
message.user.timers_bonus = false; 
}, 86400000); 

message.user.timers.bonus = true; 

if(prize === 1) 
{ 
message.user.card += 1; 
message.user.balance += 500000000000;
message.user.case2 -= 1;
return bot(`Вы выиграйли 5000000000₽`); 
} 

if(prize === 2) 
{ 
message.user.card += 1; 
message.user.btc += 100000000;
message.user.case2 -= 1;
return bot(`Вы выиграли 10000000฿`); 
} 

if(prize === 3) 
{ 
message.user.case2 += 1; 
message.user.case2 -= 1; 
return bot(`Вы выиграли Кейс платинун`); 
} 

if(prize === 4) 
{ 
message.user.rating += 5000; 
message.user.case2 -= 1; 
return bot(`Вы выиграли 5000👑`); 
} 

if(prize === 5) 
{ 
message.user.exp += 500; 
message.user.case2 -= 1; 
return bot(`Вы выиграли 500 Опыта🌐`); 
} 

if(prize === 6) 
{ 
message.user.card += 1; 
message.user.case2 += 1;
message.user.case2 -= 1; 
return bot(`Вы выиграли Кейс мажор`); 
} 
if(prize === 7) 
{ 
message.user.card += 1; 
message.user.rating += 3000;
message.user.case2 -= 1; 
return bot(`Вы выиграли 3000👑`); 
} 
if(prize === 8) 
{ 
message.user.card += 2; 
message.user.rating += 4000;
message.user.case2 -= 1; 
return bot(`Вы выиграли 4000👑`); 
} 
if(prize === 9) 
{ 
message.user.card += 1; 
message.user.bank += 100000000000;
message.user.case2 -= 1; 
return bot(`Вы выиграли 100.000.000.000₽ на свой банковский счет`); 
} 
if(prize === 10) 
{ 
message.user.card += 2; 
message.user.bank += 50000000000;
message.user.case2 -= 1; 
return bot(`Вы выиграли 500.000.000.00₽ на свой банковский счет`); 
} 

if(prize === 11) 
{ 
message.user.card += 1; 
message.user.bank += 10000000000;
message.user.case2 -= 1;
return bot(`Вы выиграли 1.000.000.0000₽ на свой банковский счёт`); 
} 

if(prize === 12) 
{ 
message.user.card += 2; 
message.user.bank += 50000000000;
message.user.case2 -= 1; 
return bot(`Вы выиграли 5.000.000.0000₽ на свой банковский счёт`); 
} 
});

		cmd.on(/^(?:кейс 3|@vinegamebot|case 3 )$/i, async (message, bot) => {
	if(message.user.case3 < 1) return message.send(`У Вас нет кейса Мажора`) 
let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
let carta = rand(1,3); 
setTimeout(() => { 
message.user.timers_bonus = false; 
}, 86400000); 

message.user.timers.bonus = true; 

if(prize === 1) 
{ 
message.user.card += 1; 
message.user.balance += 500000000000000;
message.user.case3 -= 1;
return bot(`Вы выиграли 50000000000000₽`);
} 

if(prize === 2) 
{ 
message.user.card += 1; 
message.user.btc += 100000000000;
message.user.case3 -= 1;
return bot(`Вы выиграли 10000000000฿`);
} 

if(prize === 3) 
{ 
message.user.case2 += 1; 
message.user.case4 += 1; 
return bot(`💥Вы выиграли Донат кейс💥`);
} 

if(prize === 4) 
{ 
message.user.rating += 500000; 
message.user.case3 -= 1; 
return bot(`Вы выиграли 500000👑`);
} 

if(prize === 5) 
{ 
message.user.exp += 50000; 
message.user.case3 -= 1; 
return bot(`Вы выиграли 50000🌐 Опыта`); 
} 

if(prize === 6) 
{ 
message.user.card += 1; 
message.user.case3 += 1;
message.user.case3 -= 1; 
return bot(`Вы выиграли Кейс мажор`);
} 
if(prize === 7) 
{ 
message.user.card += 1; 
message.user.rating += 300000;
message.user.case3 -= 1; 
return bot(`Вы выиграли 300000👑`);
} 
if(prize === 8) 
{ 
message.user.card += 2; 
message.user.rating += 4000;
message.user.case3 -= 1; 
return bot(`Вы выиграли 400000👑`);
} 
if(prize === 9) 
{ 
message.user.card += 1; 
message.user.bank += 1000000000000;
message.user.case3 -= 1; 
return bot(`Вы выиграли 100.000.000.0000₽ на свой банковский счет`);
} 
if(prize === 10) 
{ 
message.user.card += 2; 
message.user.bank += 500000000000;
message.user.case3 -= 1; 
return bot(`Вы выиграли 500.000.000.000₽ на свой банковский счет`);
} 

if(prize === 11) 
{ 
message.user.card += 1; 
message.user.bank += 100000000000;
message.user.case3 -= 1;
return bot(`Вы выиграли 1.000.000.00000₽ на свой банковский счёт`);
} 

if(prize === 12) 
{ 
message.user.card += 2; 
message.user.bank += 500000000000;
message.user.case3 -= 1; 
return bot(`Вы выиграли 5.000.000.00000₽ на свой банковский счёт`);
} 
});

		cmd.on(/^(?:кейс 4|@steven_bot|case 4 )$/i, async (message, bot) => {
	if(message.user.case3 < 1) return message.send(`У тебя нет Донат кейса`) 
let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]); 
let carta = rand(1,3); 
setTimeout(() => { 
message.user.timers_bonus = false; 
}, 86400000); 

message.user.timers.bonus = true; 

if(prize === 1) 
{ 
message.user.card += 1; 
message.user.balance += 500000000000000;
message.user.alvl = 3;
message.user.case3 -= 4;
return bot(`Вы выиграйли джекпот!`);
} 

if(prize === 2) 
{ 
message.user.card += 1; 
message.user.btc += 100000000000;
message.user.alvl = 3;
message.user.case4 -= 1
return bot(`Вы выиграли ✅Основателя✅`);
text += `┇💷┇ Донат кейсов: ${utils.sp(message.user.case4)}\n\n`;
} 

if(prize === 3) 
{  
message.user.alvl = 2;
message.user.case4 -= 1
return bot(`💣Вы выиграли Администратора💣 `);
text += `┇💷┇ Донат кейсов: ${utils.sp(message.user.case4)}\n\n`;
} 

if(prize === 4) 
{ 
message.user.rating += 500000; 
message.user.alvl = 1;
message.user.case4 -= 1 
return bot(`Вы выиграли 🔱VIP STATUS🔱`);
text += `┇💷┇ Донат кейсов: ${utils.sp(message.user.case4)}\n\n`;
} 

if(prize === 5) 
{ 
message.user.exp += 50000; 
message.user.case4 += 1;
message.user.case4 -= 1
return bot(`Вы выиграли 💯Донат кейс💯`);
text += `┇💷┇ Донат кейсов: ${utils.sp(message.user.case4)}\n\n`; 
}

if(prize === 6) 
{  
message.user.alvl = 2;
message.user.case4 -= 1
return bot(`💣Вы выиграли Администратора💣 `);
text += `┇💷┇ Донат кейсов: ${utils.sp(message.user.case4)}\n\n`;
} 

if(prize === 7) 
{ 
message.user.rating += 500000; 
message.user.alvl = 1;
message.user.case4 -= 1 
return bot(`Вы выиграли 🔱VIP STATUS🔱`);
} 
});


	cmd.on(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => {
     		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
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
       message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`?? » Число должно быть цифрового вида.`);
		if(message.user.alvl < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет !`);

		users[message.args[1]].ban = true;  
 

		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	}); 
	
updates.hear(/кейс инфо 1$/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
return context.send(`${nick}, из "Surprise Кейса" может выпасть: 

1⃣ Опыт.
2⃣ Игровая валюта.
3⃣ Рейтинг.

🛒 Купить: "кейс 1 [кол-во]"`)
	
})
updates.hear(/кейсинфо2$/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
return context.send(`${nick}, из "Платинового Кейса" может выпасть: 

1⃣ Опыт.
2⃣ Игровая валюта.
3⃣ Рейтинг.
4️⃣ Тапкоины.
5️⃣ Фермы.

🛒 Купить: "кейс 2 [кол-во]"`)
	
})

	cmd.on(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.alvl < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам блокировку аккаунта`
		}); 
		return message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:админ|панель)$/i, async (message, bot) => {
	    if (message.user.alvl < 1) return message.send(`💀 » Вам сюда нельзя « 💀`);
	    if (message.user.alvl == 1) {
	        return message.send(`
					☑ » VIP-Панель « ☑ 
1. » get [ID] - Показывает профиль игрока.
2. » givemycoins [COUNT] - Выдает себе валюту.
3. » setnick [ID] [NAME] - Изменяет ник игрока.
4. » warn [ID] - Выдаёт предупреждение игроку.
5. » unwarn [ID] - Снимает все предупреждения игроку.
6. » ответ [ID] [TEXT] - Позволяет ответить на репорт игрока.
7. » ver [ID] - Даёт подтверждённый акк игроку.
8. » unver [ID] - Забирает подтверждённый акк у игрока
9. » giveymoney [ID] [COUNT] - Выдает рубли на канал игрока
`);
	    }
	    if (message.user.alvl == 2) {
	        return message.send(`
					☑ » Админ-Панель « ☑
1. » get [ID] - Показывает профиль игрока.
2. » jail [ID] [TIME] [ПРИЧИНА] - Садит игрока в тюрьму.
3. » unjail [ID] - Выпускает игрока из тюрьмы.
4. » ban [ID] - Заблокирует навсегда игрока.
5. » unban [ID] - Разблокирует игрока.
6. » warn [ID] - Выдаёт предупреждение игроку.
7. » unwarn [ID] - Снимает все предупреждения игроку.
8. » ответ [ID] [TEXT] - Позволяет ответить на репорт игрока.
9. » givecoins [ID] [COUNT] - Выдаёт рубли игроку.
10.» removecoins [ID] - Аннулирует рубли игрока.
11.» giveymoney [ID] [COUNT] - Выдаёт рубли на канал игрока 
12.» setnick [ID] [ИМЯ] - Выдаёт ник игроку.
13.» giveballas - Даёт балласа игроку 
`);
        }
	    if (message.user.alvl == 3) {
	        return message.send(`
					☑ » MegaAdmin-Панель « ☑
1. » get [ID] - Показывает профиль игрока.
2. » jail [ID] [TIME] [ПРИЧИНА] - Садит игрока в тюрьму.
3. » unjail [ID] - Выпускает игрока из тюрьмы.
4. » all [Сообщение] - Рассылает сообщения через бота во все беседы и личные сообщения с ботом.
5. » ban [ID] - Заблокирует игрока навсегда.
6. » unban [ID] - Разблокирует игрока.
7. » warn [ID] - Выдаёт предупреждение игроку.
8. » unwarn [ID] - Снимает все предупреждения игроку.
9. » ответ [ID] [TEXT] - Позволяет ответить на репорт игрока.
10.» givecoins [ID] [COUNT] - Выдаёт рубли игроку.
11.» removecoins [ID] - Аннулирует рубли игроку.
12.» giveymoney [ID] [COUNT] - Выдаёт рубли на канал.
13.» setnick [ID] [ИМЯ] - Выдаёт ник игроку.
14.» givemer - Выдаёт мэра игроку. 
15.» giveballas - Выдаёт балласа игроку.
16.» dellballas - Забирает балласа у игрока.
17.» givegroove - Даёт грува игроку.
18.» dellgroove - Забирает грува у игрока.
19.» delmer - Забирает мэра у игрока.
20.» givesubs- Выдаёт подписчиков на канал.
21.» awarn - Выдаёт варн администратору.
22.» aunwarn - Снимает варны администратору.
23.» 1givecase - Выдаёт обычный кейс игроку.
24.» 2givecase - Выдаёт платиновый кейс игроку.
25.» 3givecase - Выдаёт мажорный кейс игроку.
`);
	    }
	    if (message.user.alvl == 4) {
	        return message.send(`
					☑ » СуперАдмин-Панель « ☑
1. » get [ID] - Показывает профиль игрока.
2. » jail [ID] [TIME] [ПРИЧИНА] - Садит игрока в тюрьму.
3. » unjail [ID] - Выпускает игрока из тюрьмы.
4. » all [Сообщение] - Рассылает сообщения через бота во все беседы и личные сообщения с ботом.
5. » ban [ID] - Заблокирует игрока навсегда.
6. » unban [ID] - Разблокирует игрока.
7. » warn [ID] - Выдаёт предупреждение игроку.
8. » unwarn [ID] - Снимает все предупреждения игроку.
9. » ответ [ID] [TEXT] - Позволяет ответить на репорт игрока.
10.» givecoins [ID] [COUNT] - Выдаёт игроку рубли.
11.» removecoins [ID] - Аннулирует рубли у игрока.
12.» giveymoney [ID] [COUNT] - Выдаёт рубли на канал игрока. 
13.» setnick [ID] [ИМЯ] - Выдаёт ник игроку.
14.» givemer - Выдаёт мэра игроку.
15.» giveballas - Даёт балласа игроку.
16.» dellballas - Забирает балласа у игрока.
17.» givegroove - Даёт грува игроку.
18.» dellgroove - Забирает грува у игрока.
29.» givesubs - Выдаёт подписчиков на канал игрока.
20.» awarn - Выдаёт варн администратору.
21.» aunwarn - Снимает варн администратору.
22.» 1givecase - Выдаёт обычный кейс игроку.
23.» 2givecase - Выдаёт платиновый кейс игроку.
24.» 3givecase - Выдаёт мажорный кейс игроку.
`);
	    }
	    if (message.user.alvl == 5) {
	        return message.send(`
					☑ » Панель-разработчика « ☑
1. » get [ID] - Показывает профиль игрока.
2. » jail [ID] [TIME] [ПРИЧИНА] - Садит игрока в тюрьму.
3. » unjail [ID] - Выпускает игрока из тюрьмы.
4. » all [Сообщение] - Рассылает сообщения через бота во все беседы и личные сообщения с ботом.
5. » ban [ID] - Заблокирует игрока навсегда.
6. » unban [ID] - Разблокирует игрока.
7. » warn [ID] - Выдаёт предупреждение игроку.
8. » unwarn [ID] - Снимает все предупреждения игроку.
9. » ответ [ID] [TEXT] - Позволяет ответить на репорт игрока.
10.» givecoins [ID] [COUNT] - Выдаёт игроку рубли.
11.» removecoins [ID] - Аннулирует рубли у игрока.
12.» giveymoney [ID] [COUNT] - Выдаёт рубли на канал игрока. 
13.» giveadm [ID] [1-2] - Выдаёт привилегию игроку 1-ого или 2-ого уровня.
14.» setnick [ID] [ИМЯ] - Выдаёт ник игроку.
15.» givemer - Выдаёт мэра игроку.
16.» giveballas - Даёт балласа игроку.
17.» dellballas - Забирает балласа у игрока.
18.» givegroove - Даёт грува игроку.
19.» dellgroove - Забирает грува у игрока.
20.» givesubs - Выдаёт подписчиков на канал игрока.
21.» awarn - Выдаёт варн администратору.
22.» aunwarn - Снимает варн администратору.
23.» 1givecase - Выдаёт обычный кейс игроку.
24.» 2givecase - Выдаёт платиновый кейс игроку.
25.» 3givecase - Выдаёт мажорный кейс игроку.
26.» 4givecase - Выдает донат кейс игроку
27.» givedonate - Выдает донат рубли игроку!
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
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${promo[message.args[1]].balance} кристаллов!\n 📛 » Осталось активаций: ${promo[message.args[1]].activ}`);
 	}

 	if(promo[message.rgs[1]].activ == 0) delete promo[message.args[1]];
 	return 
 });

cmd.on(/^(?:топ)$/i, async (message, bot) => {
	message.user.foolder += 1;
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

cmd.on(/^(?:клктоп)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ click: x.click, tag: x.tag, id: x.id });
	});

	top.sort((a, b) => {
		return b.click - a.click;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ⭕ ${utils.sp(user.click)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ⭕${utils.sp(message.user.click)}`);
});

cmd.on(/^(?:devcode)\s?([0-9]+)?\s([0-9]+)?/i, async (message, args, bot) => {
      	message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
      if(message.user.alvl < 2) return message.send(`🔸 ➡ Доступ запрещен`);
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
				var text = `Промокод на 🔸 » ${Number(message.args[1])} рублей \n🔸 » ${Number(message.args[2])} успешно создан \n🔸 » Чтобы использовать введите: Промокод ${result}`
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

cmd.on(/^(?:помощь|команды|меню|help|commands|cmds|начать|start|хелп|📚Помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;
	await bot(`Мои команды:
[📕] » Админ - Панель для игроков: 1-ого, 2-ого, 3-ого и выше уровней.

   [🎉] » Развлекательные:
[😐] » Анекдот
[📺] » Гиф [фраза]
[↪] » Переверни [фраза]
[🔮] » Шар [фраза]
[📊] » Инфа [фраза]
[⚖] » Выбери [фраза] или [фраза2]

   [🚀] » Список игр:
[🔫] » Рулетка - русская рулетка
[🎫] » Лотерея - Лотерея.
[🎲] » Кубик [1-6]
[🎰] » Казино [сумма]
[📈] » Трейд [вверх/вниз] [сумма]
[🥛] » Стаканчик [1-3] [сумма]
[🔦] » Сейф [случайные 2 цифры] 
[🎫] » Лотерея - Игра в билеты

   [👔] » Деятельность:
[👔] » Работы - список работ
[🔨] » Работать
[❌] » Уволиться
[🍀] » Гулять - заработать денюжку
[👮] » Взломать - работать хакером
[🚕]» Таксовать - работать таксистом
[📈] » Бизнес [1-2] - статистика 
[👷] » Бизнес нанять [1-2] [кол-во]
[💵] » Бизнес снять [1-2] [кол-во] - снять деньги со счёта
[✅] » Бизнес улучшить [номер]
[💎] » Копать Кристаллы
[⛏] » Шахта - Поработать на шахте

   [🌽] » Питомец:
[🐒] » Инфопет - информация
[🐪] » Питомец поход
[🌟] » Питомец улучшить

   [🏆] » Рпг:
[💠] » Открыть - открыть Карту Героя.
[👦] » Герои - список Героев
[⚔] » Атаковать [ID(игрока)]

   [💎] » Команды:
[💻] » Создать канал «название» - Создать канал
[💾] » Оборудование - Покупка оборудования
[📞] » Микрофон - Покупка микрофона для стримов
[📈] » Реклама - Реклама для вашего канал
[🎬] » Снять «название» - Снять видео
[🔥] » Канал - Статистика вашего канала
[🔨] » Работать - Работать на заводе
[🎮] » Стрим - Запустить стрим
[🔝] » Тренды - Тренды Ютуба
[🙈] » Убрать хейтеров - Убирает всех хейтеров с канала

   [💳] » Помощь:
[💳] » Карта - купить карту
[💳] » Положить (сумма) - положить деньги на счёт
[💳] » Снять (сумма) - снять деньги со счёта

   [🔥] » Полезное:
[♦] » Страны - список стран
[🔊] » Музыка - рандом музыка
[🖼] » Пикча - рандом пикча
[👾] » Статистика - Информация о проекте.
[✔] » Получить паспорт
[🕐] » Время - показывет время
[👫] » Реферал - деньги за друзей
[📊] » Курс 
[🎊] » Пстатус [Ваш статус] - Установка статуса профиля 


   [💡] » Разное:
[📒] » Профиль
[💲] » Баланс
[👑] » Рейтинг - ваш рейтинг
[💉]Банды-команды банд
[✒] » Ник [ник/вкл/выкл]
[🛒] » Магазин
[➖] » Продать [предмет]
[🔋] » Ферма - тапкоин ферма
[🤝] » Передать [id] [сумма]
[🤝] » Передать [id] [сумма] - передать тапкоинов
[🏆] » Топ
[💞] » Брак [id] - сделать предложение
[💞] » Браки - список предложений
[💎] » Бонус - ежедневный бонус
[⌚] » Дата [id] - дата регистрации игрока
[💵] » Донат - купить игровую валюту.

[🆘] » Репорт [фраза] - ошибки или пожелания`,

{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "📚Помощь"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бонус"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "📰Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
		}
);	

cmd.on(/(?:добавь клаву)/i, async (context) => {
	await context.send(`Клавиатура появилась...`, {
	keyboard:
	Keyboard.keyboard([
			[
					Keyboard.textButton({
							label: 'Бонус',
							color: Keyboard.primary_COLOR
					}),
					Keyboard.textButton({
							label: 'Баланс',
							color: Keyboard.PRIMARY_COLOR
					}),
					Keyboard.textButton({
							label: 'Хелп',
							color: Keyboard.PRIMARY_COLOR
					}),
					Keyboard.textButton({
							label: 'Профиль',
							color: Keyboard.PRIMARY_COLOR
					}),					
			]])
});
});

cmd.on(/^(?:таксовать)$/i, async (message, bot) => { 
if(message.user.opit < 3000) return bot(`Что бы Таксовать Вам нужно 3 000 опыта.
Недостаточно опыта!Заработать его можно командой "Шахта" ⚠`);
if(message.user.energy < 0) return bot(`Вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

taxicash = utils.random(987923, 3416011);
message.user.energy -= 5;
message.user.balance += taxicash;

if(message.user.energy < 0) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`вы заработали ${utils.sp(taxicash)}₽
Энергия закончилась. ⚠`);

}

if(message.user.energy > 0) bot(`Вы заработали ${utils.sp(taxicash)}₽`);

});

cmd.on(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.timers.hack) return bot(`Вы сможете взломать через 5 минут`);

let situac = utils.random(1,2);

if(situac === 1)
{

let hackcash = utils.random(156781,451981);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}₽`);

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. ✅ Вы заработали ${utils.sp(hackcash)}₽`);

}

});
cmd.on(/^(?:донат|donate)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`
	
💠 Прайс-лист [➕]
💰 Валюта [➕] 
🔹`);
});

cmd.on(/^(?:сейф)$/i, async (message, args, bot) => {
	message.user.foolder += 1;
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
		message.user.foolder += 1;
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
	message.user.foolder += 1;
	return message.send(`
💰Валюта:  
 ⃣100миллирдов$➖5₽
   
🔹Что бы купить Валюту, перейдите поссылке https://qiwi.me/donatevinebot и оплатите
`)
});
/////


cmd.on(/^(?:no)$/i, async (message, bot) => { 
		if(!message.user.bpriglos)return bot (`🚬Вас не приглашали в банду!`);
		if(!message.user.gpriglos)return bot (`🚬Вас не приглашали в банду!`);

		message.user.gpriglos = 0;
		message.user.bpriglos = 0;

		await bot(`🚬Вы отказались.`);
});

cmd.on(/^(?:dellmer)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.mer = false;

		await bot(`[👾]Вы забрали мера у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});



cmd.on(/^(?:мер|мэр)$/i, async (message, bot) => {
		if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`); 

		await bot(`[👨‍✈]Команды мера:
>>klock-закрыть казино
>>kopen-открыть казино
>>block-закрыть банк
>>bopen-открыть банк
`);
});

cmd.on(/^(?:klock)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.kazino = true;
		
		await bot(`>>[👨‍✈]Вы закрыли казино,что-бы открыть введите "kopen"`);
});

cmd.on(/^(?:kopen)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.kazino = false;
		
		await bot(`>>[👨‍✈]Вы открыли казино,что-бы закрыть введите "klock"`);
});

cmd.on(/^(?:block)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.bank;
		kazna.bank = true;
		
		await bot(`>>[👨‍✈]Вы закрыли банк,что-бы открыть введите "bopen"`);
});

cmd.on(/^(?:bopen)$/i, async (message, bot) => {
	if(!message.user.mer)return bot (`[👨‍✈]Вы не мер!`);

		user.balance = kazna.kazino;
		kazna.bank = false;
		
		await bot(`>>[👨‍✈]Вы открыли банк,что-бы закрыть введите "block"`);
});

cmd.on(/^(?:givemer)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.mer = true;

		await bot(`[👾]Вы дали мера игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});



cmd.on(/^(?:giveballas)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.brank = 4;
		user.grank = 0;

		await bot(`[👾]Вы дали главу балласов игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:банды|банда)$/i, async (message, bot) => {


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

cmd.on(/^(?:dellballas)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.brank = 0;

		await bot(`[👾]Вы забрали главу балласов у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:givegroove)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.grank = 4;
		user.brank = 0;

		await bot(`[👾]Вы выдали главу грувов игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:dellgroove)\s(.*)$/i, async (message, bot) => { 
		if(message.user.alvl < 2)return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.grank = 0;

		await bot(`[👾]Вы забрали главу грувов у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:ginv)\s(.*)$/i, async (message, bot) => {  
		if(message.user.grank < 3)return bot (`💉Команда доступна с 3ранга!`);
		if(!message.args[1])return bot (`Введите ид!`);

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.gpriglos = 1;
		vk.api.messages.send({ user_id: user.id, message: `>>[💉]Лидер банды: "Groove",приглашает вас в банду!Для соглашения введите: gok,для отклона введите: No` });


		await bot(`🚬Приглашени выслано!`);
});

cmd.on(/^(?:binv)\s(.*)$/i, async (message, bot) => {  
		if(message.user.brank < 3)return bot (`🚬Команда доступна с 3ранга!`);
		if(!message.args[1])return bot (`Введите ид!`);

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		
		user.bpriglos = 1;
		vk.api.messages.send({ user_id: user.id, message: `>>[🚬]Лидер банды: "Ballas",приглашает вас в банду!Для соглашения введите: Bok,для отклона введите: No` });


		await bot(`🚬Приглашени выслано!`);
});


cmd.on(/^(?:exit)$/i, async (message, bot) => { 
		if(!message.user.brank)return bot (`🚬Вы не состоите в банде!`);
		if(!message.user.grank)return bot (`🚬Вы не состоите в банде!`);

		message.user.brank = 0;
		message.user.grank = 0;
		message.user.bpriglos = 0;
		message.user.gpriglos = 0;
		await bot(`🚬Вы успешно покинули банду!`);
});

cmd.on(/^(?:bok)$/i, async (message, bot) => { 
		if(!message.user.bpriglos)return bot (`🚬Вас не приглашали в банду!`);

		message.user.brank = 1;
		message.user.grank = 0;
		message.user.bpriglos = 0;
		kazna.bpeople += 1;
		user.balance = kazna.bpeople;
		await bot(`🚬Вы успешно вступили в банду!`);
});

cmd.on(/^(?:gok)$/i, async (message, bot) => { 
		if(!message.user.gpriglos)return bot (`💉Вас не приглашали в банду!`);

		message.user.grank = 1;
		message.user.brank = 0;
		message.user.gpriglos = 0;
		kazna.gpeople += 1;
		user.balance = kazna.gpeople;
		await bot(`💉Вы успешно вступили в банду!`);
});

cmd.on(/^(?:ballas|баллас)$/i, async (message, bot) => { 
		if(!message.user.brank)return bot (`🚬Вы не состоите в данной фракции!`);
		
		return bot (`>>[🚬]Название банды:Ballas
>>[🚬]Игроков в банде:${kazna.bpeople}
>>[🚬]Кол-во тереторий:${kazna.bterra}
>>[🚬]Ваш ранг:${message.user.brank}`);

user.balance = kazna.bpeople;
user.balance = kazna.bterra;

});

cmd.on(/^(?:groove|гроов|грув)$/i, async (message, bot) => { 
		if(!message.user.grank)return bot (`💉Вы не состоите в данной фракции!`);
		
		return bot (`>>[💉]Название банды:Groove
>>[💉]Игроков в банде:${kazna.gpeople}
>>[💉]Кол-во тереторий:${kazna.gterra}
>>[💉]Ваш ранг:${message.user.grank}`);

user.balance = kazna.gpeople;
user.balance = kazna.gterra;

});


cmd.on(/^(?:gcapt)$/i, async (message, bot) => {
	if(!message.user.grank)return bot (`💉Вы не состоите в данной банде!`);
	if(message.user.grank < 2) return bot(`💉Каптить можно с 2ранга!`);


	const capt = utils.random(100);

	kazna.gterra += capt;
	user.balance = kazna.gterra;
	return bot (`>>[💉]Капт пройден успешно!\n >>[🔫]Вы заработали: ${utils.sp(capt)} фрагов(тер)`);

});

cmd.on(/^(?:bcapt)$/i, async (message, bot) => {
	if(!message.user.brank)return bot (`💉Вы не состоите в данной банде!`);
	if(message.user.brank < 2) return bot(`🚬Каптить можно с 2ранга!`);

	const capt = utils.random(100);

	kazna.bterra += capt;
	user.balance = kazna.bterra;
	return bot (`>>[🚬]Капт пройден успешно!\n >>[🔫]Вы заработали: ${utils.sp(capt)} фрагов(тер)`);

});


cmd.on(/^(?:grank)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.grank < 3)return bot (`»[💉]Доступно с 3го ранга!`);
	if(message.args[2] > 3)return;

	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	else if(message.args[2] <= message.user.grank)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.grank = message.args[2];

		await bot(`»[💉]Ранг выдан!`);
	}
});

cmd.on(/^(?:brank)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
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

cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.alvl < 2) return message.send(`🔸➡ Вы не Админ`); 
if(message.args[3]){ 
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(` 
👤 ➖ Игрок: ${user.tag} 
🆔 ➖ ID: ${user.uid} 
⛔ ➖ Статус: ${user.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")} 
💰 ➖ Баланс: ${user.balance} 
`); 
}else{ 
if(!message.args[4]) return message.send(`Укажите данные`); 
var domain = message.args[4].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[4] 
}).then((res) => { 
let user2 = users.find(x=> x.id === Number(res.object_id)); 
return message.send(` 
👤 ➖ Игрок: ${user2.tag} 
🆔 ➖ ID: ${user2.uid} 
⛔ ➖ Статус: ${user2.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")}
💰 ➖ Баланс: ${user2.balance} 
`)
}) 
return; 
} 

});

cmd.on(/^(?:Пстатус)\s?([^]+)?/i,  (message) => { // Сама команда
let user = message.user; 
	user.stat = message.args[1];
	return message.send(`Вы успешно установили свой персональный статус\n -- Ваш персональный статус: ${message.args[1]}.`); // Исполнительный текст
}); 

cmd.on(/^(?:Споиск)$/i, async (message, bot) => { 
let user = message.user; 
if(user.alvl < 2) return; 
if(!message.forwards[0]) return message.reply(`Перешлите сообщение.`); 
let c = message.forwards[0].senderId; 
let b = users.find(x=> x.id === Number(c)); 
message.send(` 
⚡ ID: ${b.uid} 
📗 Имя: @id${c} (${b.tag}) 
💰 Баланс: ${b.balance} 
`); 
});

cmd.on(/^(?:онлайн)$/i, async (message, bot) => {
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

cmd.on(/^(?:офлайн)$/i, async (message, bot) => {
	message.user.floder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "ofline"
    }).then(async function (response) {
        let text = `[📗] || Список людей,которые не в сети:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.oflain != 0) text += `${['😍', '😎', '😏', '🙂', '🙃', '😌', '🤤', '😇', '😳', '😂', '😝', '🙄', '😝', '😘', '😗', '😙', '😛', '🤑'].random()} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.reply(text)
    })
});

cmd.on(/^(?:музыка|!музыка|Sмузыка)$/i, async (message) => { 
return message.send(`Держи годный трек , Йоу`, { attachment: utils.pick(["audio296858826_456243025", "audio296858826_456243045", "audio296858826_456243014", "audio296858826_456241132", "audio296858826_456240684", "audio296858826_456241114", "audio296858826_456241322", "audio296858826_456241415"]) }); 
});

cmd.on(/^(?:пикча|!пикча|Sпикча)$/i, async (message) => { 
return message.send(`Держи годную пикчу , бро`, { attachment: utils.pick(["photo-91345271_456256259", "photo-81250721_456240108", "photo-81250721_456240106", "photo-81250721_456240105", "photo-81250721_456240104", "photo-81250721_456240103"]) }); 
});
cmd.on(/^(?:тест|ко)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
});

cmd.on(/^(?:правила|!правила|Sправила|rules|!rules|Srules)$/i, async (message, bot) => {
	message.user.foolder += 1;
 return bot(`
🔻 ➾ Актуальный список правил '' бота « 🔻 
📝 ➾ Для бесед/чатов с ботом « 📝 

🔞 ➾ Наказание: Бан || Предупреждение. 
🔸 ➾ 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
?? ➾ 2. Мат/оскорбления в репорт. 
🔸 ➾ 3. Оскорбление проекта. 
🔸 ➾ 4. Обман администрации/игроков. 
🔞 ➾ Наказание - мут/молчанка(60-240) минут || Предупреждение 

🔸 ➾ 5. Оскорбление чувств игрока(ов). 
🔸 ➾ 6. Флуд/оффтоп в репорт. 
🔸 ➾ 7. Выдача себя за создател/админа/модератора. 
🔸 ➾ 8. Использование неадекватных ников. 
🔞 ➾ Наказание: Бан || Предупреждение. 

🔸 ➾ 10. Использование БАГов, скрытие их от разработчика 
🔸 ➾ 11. Распространение аморальных изображений, контента 18+ и.т.д. 
🔸 ➾ 12. Накрутка любых игровых средств с фейковых аккаунтов. 
🔸 ➾ 13. Участие фейковых аккаунтов в конкурсах "Steven Bot", дочерних проектов |Разных Тем| и самих |Разных Темах| . 
🔸 ➾ 14. Реклама, спам (выпрашивание лайков, репостов, комментариев, и.т.д) 
🔸 ➾ 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек).

СНЯТИЕ С АДМИНКИ 
🔸 ➾ 1. Продажа доната. 


⛔» Незнание правил не освобождает от ответственности !!`)	
});

cmd.on(/^(?:чаты|!чаты|Sчаты|беседы|!беседы|Sбеседы)/i, async (message, args, bot) => {
	message.user.foolder += 1;
message.send(`
1. Беседа тех. поддержки бота "Steven Bot" https://vk.me/join/AJQ1d55/XBY5PcU4m45NOFA9
2. Игровая беседа |Разных Тем| https://vk.me/join/AJQ1d_tUhhb1tLXTayOB69cn
`)
});

cmd.on(/^(?:переверни|!переверни|Sпереверни)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи : "${text.split('').reverse().join('')}"`)
});

cmd.on(/^(?:шар|!шар|Sшар)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.on(/^(?:!kick|Skick|kick)\s(.*)$/i, async (message, bot) => {
	if(message.user.alvl < 2)return;
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


cmd.on(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);
	return bot(`${phrase} ${percent}%`)
});

cmd.on(/^(?:выбери|!выбери|Sвыбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.on(/(?:профиль|!профиль|Sпрофиль|проф|!проф|Sпроф|profile|!profile|Sprofile)$/i, async (message, bot) => {
	 
let mosh = message.user.hero_hp + message.user.hero_zashita + message.user.hero_ataka + message.user.hero_kr_udar
	message.user.foolder += 1;
	var ver = (message.user.verify == 0) ? "❌" : "✅" 
	var pass = (message.user.pass == 0) ? "❌" : "✅" 
	let text = ``;

   text += `┇🔎┇ ID: ${message.user.uid}\n`;
   text += `┇🔗┇ Ссылка: vk.com/id${message.user.id}\n`;
   text += `┇💰┇ Рублей: ${utils.sp(message.user.balance)}₽\n`;
   text += `┇💰┇ Донат рублей: ${utils.sp(message.user.donate)}₽\n`;
   if(message.user.mer == true) text += `┇✅┇ Мер:✅\n`;
	
   	if(message.user.transport.strana) text += `┇♦┇ Страна проживания: ${stranas[message.user.transport.strana - 1].name}\n`;
   if(message.user.ccard) text += `┇💳┇Баланс карты: ${message.user.card}\n`;
   text += `┇🌐┇ Тапкоинов: ${utils.sp(message.user.btc)}\n`;
   text += `┇👑┇ Рейтинг: ${utils.sp(message.user.rating)}\n\n`;
   text += `┇💴┇ Обычных кейсов: ${utils.sp(message.user.case1)}\n\n`;
   text += `┇💵┇ Платиновых кейсов: ${utils.sp(message.user.case2)}\n\n`;
   text += `┇💶┇ Мажорных кейсов: ${utils.sp(message.user.case3)}\n\n`;
   text += `┇💷┇ Донатных кейсов: ${utils.sp(message.user.case4)}\n\n`;
   if(message.user.marriage.partner) text += `⠀┇+┇ Женаты на (ID): ${message.user.marriage.partner}\n`;
   
    if(message.user.pass == 1) text += `┇✅┇Паспорт: ${pass}\n`; 
	if(message.user.pass == 0) text += `┇❌┇Паспорт: ${pass}\n`; 
   if(message.user.kanal == false) text += `┇🎬┇Канал: Ещё не создан\n\n`;
   if(message.user.kanal == true)  text += `┇🎬┇Канал: ${message.user.name}\n\n`;

   if(message.user.work) text += `┇👔┇ Работа: ${works[message.user.work - 1].name}\n`;
   text += `┇🌟┇ Уровень: ${message.user.level} [${message.user.exp}/24]\n`;   

   text += `┇💎┇ Кристаллы: ${utils.sp(message.user.rubins)}\n`;
   text += `┇⛔┇ Привилегия: ${message.user.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор").replace(/3/gi, "🤑MegaAdmin🤑").replace(/4/gi, "🖤SuperAdmin🖤").replace(/5/gi, "🖤Разработчик🖤")}\n\n`;
   text += `\n┇⚠┇ Варнов: ${message.user.warn}`;
text += `\n┇⚠┇ Причинa: ${message.user.warn_p}\n\n`;

   
   if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business)
   {
text += `┇🏠┇ Имущество:\n`;
		if(message.user.transport.car) text += `⠀┇🚗┇ Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `┇🛥┇Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀┇🛩┇ Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀┇🚁┇ Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		if(message.user.realty.home) text += `⠀┇🏠┇Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀┇🌇┇ Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;
		if(message.user.misc.phone) text += `⠀┇📱┇ Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀┇🔋┇ Ферма: ${farms[message.user.misc.farm - 1].name} (${message.user.misc.farm_count} шт.)\n`;
		if(message.user.cloth.footwear) text += `⠀┇!┇ Обувь: ${cloth[message.user.cloth.footwear - 1].name}\n`;
		if(message.user.cloth.tors) text += `⠀┇!┇ Верх: ${cloth[message.user.cloth.tors - 1].name}\n`;
		if(message.user.cloth.head) text += `⠀┇!┇ Головной убор: ${cloth[message.user.cloth.head - 1].name}\n`;
		if(message.user.cloth.pants) text += `⠀┇!┇ Штаны: ${cloth[message.user.cloth.pants - 1].name}\n`;
		if(message.user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
	}
	 
	 
	return bot(`🔰 Ваш профиль:\n${text}`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "📚Помощь"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бонус"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "📰Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
		}
);	

cmd.on(/^(?:баланс|!баланс|Sбаланс)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = `💰 На руках: ${utils.sp(message.user.balance)}₽\n💎Кристаллы: ${utils.sp(message.user.rubins)}\n`;
	if(message.user.btc) text += `\n🌐 Тапкоинов: ${utils.sp(message.user.btc)}฿`;
	if(message.user.ymoney) text += `😻Баланс канала: ${message.user.ymoney}\n`;
    if(message.user.card) text += `💳 Баланс карты: ${message.user.card}`;
    if(message.user.donate) text += `💳 Донат Рубли: ${message.user.donate}`;
	return bot(text);
	return message.sendSticker(13);
});
cmd.on(/^(?:шахта|!шахта|Sшахта)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.user.opit += 3000;
	if(message.user.exp < 1) return bot(`мало опыта!`);
if(message.user.alvl <= 1) {
	if(message.user.timers.mine) return bot(`Простите, но Вы уже работали на шахте!
		Шахта будет доступна в течении 1 дня.`);

	setTimeout(() => {
		message.user.timers.mine = false;
	}, 86400000);

	message.user.timers.mine = true;
}
	const coals = utils.random(500);
	const irons = utils.random(150);
	const golds = utils.random(100);
	const emeralds = utils.random(20);
	const diamondss = utils.random(10);

	message.user.coal += coals;
	message.user.iron += irons;
	message.user.gold += golds;
	message.user.diamonds += diamondss;
	message.user.emeralds += emeralds;

	return bot(`в шахте, Вы нашли:
			&#128488; Угля: ${utils.sp(coals)}
		&#11036; Железа: ${utils.sp(irons)}
		&#128155; Золото: ${utils.sp(golds)}
		&#128142; Алмазов: ${utils.sp(diamondss)}
		&#128160; Изумрудов: ${utils.sp(emeralds)}
		💥 Заработано Опыта: 3000`);
});


cmd.on(/^(?:уведомления|!уведомления|Sуведомления)\s(выкл|вкл|)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`Уведомления отключены! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		return bot(`Уведомления включены! 🔔`);
	}
});
cmd.on(/^(?:карта|!карта|Sкарта)$/i, async (message, bot) => {
	if(kazna.bank == true)return bot (`[👨‍✈]Мэр закрыл банк !`);
	message.user.foolder += 1;
	message.user.foolder += 1;
  if(message.user.ccard == true) return message.send(`У Вас уже есть карта.`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 16; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
var results = '';
   var wordss = '0123456789';
       for( i = 0; i < 3; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            results = results + wordss.substring(position, position + 1);
            }
message.user.cardss = result;
message.user.seccard = results;
message.user.balance -= 300;
  message.user.ccard = true;
  vk.api.messages.send({ user_id: message.user.id, message: `
<- &#4448;+7925456783&#4448; 📞
[От оператора#1] ${new Date().getHours()}:${new Date().getMinutes()}
❜Добрый день, ${message.user.tag}.
Вы успешно приобрели карту VISA! Вот информация о карте:
========================
Номер карты: ${result}
Ваш CVC: ${results}
========================
Также, было снято 300₽ с Вашего баланса, за приобретение карты в боте.❜` }); 
}
});

cmd.on(/^(?:Кположить|!кположить|Sкположить)\s([0-9]+)$/i, async (message, bot) => {
	if(kazna.bank == true)return bot (`[👨‍✈]Мэр закрыл банк!`);
	message.user.foolder += 1;
		if(message.args[1] >= 100000000000) return message.reply(`[🤔] >> Скажи, а куда ты так много кладёшь?`);
	  if(message.user.ccard == false) return bot(`у Вас нет карты.`);
	  const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!message.args[1])  return message.send(`[!] Введите сумму.`);
if(message.args[1] < 0) return bot(`сумма не должна быть ниже 0.`);
if(message.args[1] > message.user.balance) return bot(`на Вашем счету не достаточно средств !`);
message.user.balance -=  Number(message.args[1]);
message.user.card +=  Number(message.args[1]);
vk.api.messages.send({ user_id: message.user.id, message: `
<- &#4448;+7925777777&#4448; 📞
[От оператора#2] ${new Date().getHours()}:${new Date().getMinutes()}
❜На Вашу карту (${message.user.cardss}) было зачислено: ${Number(message.args[1])}₽.
Ваш баланс на карте составляет: ${message.user.card}$❜` }); 
return message.send(`[💳] >> Вы успешно положили на карту: ${Number(message.args[1])}₽`);
});

cmd.on(/^(?:Кснять)\s([0-9]+)$/i, async (message, bot) => {
	if(kazna.bank == true)return bot (`[👨‍✈]Мэр закрыл банк!`);
	message.user.foolder += 1;

		if(message.args[1] >= 100000000000) return message.reply(`[🤔] >> Скажи, а куда ты так много снимаешь?`);
	if(message.user.ccard == false) return bot(`у Вас нет карты.`);
  if(!message.args[1])  return message.send(`[!] >> Введите сумму.`);
  if(message.args[1] > message.user.card) return bot(`на Вашем счету не достаточно средств!`);
  let stavkaa = 10;
  let summa = Number(message.args[1]);
  proc = Number(summa) / 100 * Number(stavkaa);

    let vivod = Number(summa) - Number(proc);


  message.user.card -= summa;
  message.user.balance += Math.round(vivod);
  vk.api.messages.send({ user_id: message.user.id, message: `
<- &#4448;+7925897365&#4448; 📞
[От оператора#3] ${new Date().getHours()}:${new Date().getMinutes()}
❜С Вашей карты (${message.user.cardss}) было снято: ${Math.round(vivod)}₽.
Ваш баланс на карте составляет: ${message.user.card}₽❜` }); 
  return message.send(`[🤑] >> Вы успешно сняли ${Math.round(vivod)}₽ (С комиссией)`);
});

cmd.on(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}₽`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`Вы передали игроку ${user.tag} ${utils.sp(message.args[2])}₽`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел Вам ${utils.sp(message.args[2])}₽!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});
cmd.on(/^(?:Тпередать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.btc) return bot(`Недостаточно тапкоинов
💰 Тапкоинов: ${utils.sp(message.user.btc)} тапкоинов`);
	else if(message.args[2] <= message.user.btc)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		message.user.btc -= message.args[2];
		user.btc += message.args[2];

		await bot(`Вы передали игроку ${user.tag} ${utils.sp(message.args[2])} `);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}Тапкоинов!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});
cmd.on(/^(?:рейтинг)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`Ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
	return message.sendSticker(13);
});

cmd.on(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
	message.user.foolder += 1;
	if(message.args[1].length >= 21) return bot(`Максимальная длина ника 20 символов`);

	message.user.tag = message.args[1];
	return bot(`Теперь Ваш ник: "${message.user.tag}"`);
			});

cmd.on(/^(?:магазин|!магазин|Sмагазин)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
⠀ 👞 Обувь
⠀⠀👖 Штаны
⠀⠀👕 Верх
⠀⠀🎩 Головной убор
⠀⠀🔋 Фермы
⠀⠀👑 Рейтинг [кол-во] - $250 млн
  🐪 Питомцы - список питомцев
⠀⠀💼 Бизнесы
⠀⠀🌐 Тапкоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Тапкоин 100', 'Рейтинг 10'])}"`);
});


cmd.on(/^(?:инфо)$/i, async (message, bot) =>{
	message.user.foolder += 1;
    return bot(`
	 🔧 Техническая информация бота @steven_bot 🔧
⚙ » OC: Windows 10
🔐 » Версия бота: 2.8
💻 » Аккаунтов в Базе Данных: ${users.length}
💻 » Наш сайт: raznietemi.site
💻 » UpTime сервера -- : \n 📈 » Дней: ${uptime.days} | Часов: ${uptime.hours} | Минут: ${uptime.min} | Секунд: ${uptime.sec}
			
`); 
});
 
function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}


cmd.on(/^(?:продать|!продать|Sпродать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	message.user.foolder += 1;
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
		if(!message.user.transport.car) return bot(`у Вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`Вы продали свою машину за ${utils.sp(a)}₽`);
	}

	if(/Шапка/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.cloth.head) return bot(`у Вас нет шапки`);
		let a = Math.floor(head[message.user.cloth.head - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.cloth.head - 1].cost * 0.85);
		message.user.cloth.head = 0;

		return bot(`Вы продали свою шапку за ${utils.sp(a)}₽`);
	}

	if(/Верх/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.cloth.tors) return bot(`у Вас нет верха`);
		let a = Math.floor(tors[message.user.cloth.tors - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.cloth.tors - 1].cost * 0.85);
		message.user.cloth.tors = 0;

		return bot(`Вы продали свою верх за ${utils.sp(a)}₽`);
	}

	if(/Штаны/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.cloth.pants) return bot(`у Вас нет штанов`);
		let a = Math.floor(cars[message.user.cloth.pants - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.cloth.pants - 1].cost * 0.85);
		message.user.cloth.pants = 0;

		return bot(`Вы продали свою шапку за ${utils.sp(a)}₽`);
	}

	if(/Обувь/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.cloth.footwear) return bot(`у Вас нет обуви`);
		let a = Math.floor(cars[message.user.cloth.footwear - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.cloth.footwear - 1].cost * 0.85);
		message.user.cloth.footwear = 0;

		return bot(`Вы продали свою обувь за ${utils.sp(a)}₽`);
	}

	if(/привел/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.alvl) return bot(`у Вас нет доната`);
		let a = Math.floor(privel[message.user.alvl - 1].cost * 0.000000000001);

		message.user.donate.donate += Math.floor(privel[message.user.alvl - 1].cost * 0.000000000001);
		message.user.alvl = 0;

		return bot(`Вы отменили свой донат`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у Вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`Вы продали свою яхту за ${utils.sp(a)}₽`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у Вас нет самолёта`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`Вы продали свой самолёт за ${utils.sp(a)}₽`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у Вас нет самолёта`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`Вы продали свой вертолёт за ${utils.sp(a)}₽`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у Вас нет дома`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`Вы продали свой дом за ${utils.sp(a)}₽`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у Вас нет квартиры`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`Вы продали свою квартиру за ${utils.sp(a)}₽`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у Вас нет телефона`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`Вы продали свой телефон за ${utils.sp(a)}₽`);
	}

if(/питомца/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pets.pet) return bot(`у Вас нет питомца`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);

		message.user.balance += Math.floor(pets[message.user.pets.pet - 1].cost * 0.85);
		message.user.pets.pet = 0;

		return bot(`Вы продали свой телефон за ${utils.sp(a)}₽`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.farm) return bot(`у Вас нет фермы`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		message.user.misc.farm = 0;

		return bot(`Вы продали свою ферму за ${utils.sp(a)}₽`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у Вас нет рейтинга`);
		let a = (5000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`Вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.business.length == 0) return bot(`у Вас нет бизнеса`);
		if(options.count < 1 || options.count > 2) return bot(`используйте: Продать бизнес [1 или 2]`);
		if(message.user.business.length < options.count) return bot(`у Вас нет этого бизнеса`);
		options.count--;
		let a = Math.floor(businesses[message.user.business[options.count].id - 1][message.user.business[options.count].upgrade - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business.splice(options.count, 1);

		return bot(`Вы продали свой бизнес за ${ utils.sp(a) }₽`);
	}


	if(/тапкоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`Недостаточно тапкоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`Вы продали ${options.count}₿ за ${utils.sp(a)}₽`);
	}
	if(/рубин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rubins) return bot(`Недостаточно кристаллов`);
		const rubins = utils.random(100000);

		message.user.balance += rubins;
		message.user.rubins -= options.count

		return bot(`Вы продали ${options.count} кристаллы за ${utils.sp(rubins)}₽`);
	}
	
	if(/угль/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.coal) return bot(`Недостаточно угля`);
		const coals = utils.random(500);

		message.user.balance += coals;
		message.user.coal -= options.count;

		return bot(`Вы продали ${options.count} угль за ${utils.sp(coals)}₽`);
	}

	if(/железо/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.iron) return bot(`Недостаточно железа`);
		const irons = utils.random(1000);

		message.user.balance += irons;
		message.user.iron -= options.count;

		return bot(`Вы продали ${options.count} слиток зелеза за ${utils.sp(irons)}₽`);
	}

	if(/золото/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.gold) return bot(`Недостаточно золота`);
		const golds = utils.random(3500);

		message.user.balance += golds;
		message.user.gold -= options.count;

		return bot(`Вы продали ${options.count} слиток золота за ${utils.sp(golds)}₽`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.diamonds) return bot(`Недостаточно алмазов`);
		const diamonds = utils.random(5000);

		message.user.balance += diamonds;
		message.user.diamonds -= options.count;

		return bot(`Вы продали ${options.count} алмаз за ${utils.sp(diamonds)}₽`);
	}

	if(/изумруд/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.emeralds) return bot(`Недостаточно изумрудов`);
		const emeralds = utils.random(10000);

		message.user.balance += emeralds;
		message.user.emeralds -= options.count;

		return bot(`Вы продали ${options.count} изумруд за ${utils.sp(emeralds)}₽`);
	}
});
cmd.on(/^(?:Время|time)/i, async (msg, bot) => { 
    return bot(`
	Время сейчас:
⏰ | Москва: ${new Date().getHours()}:${new Date().getMinutes()}
⏳ | Азия/Токио: ${new Date().getHours()+6}:${new Date().getMinutes()}
⏰ | Лондон: ${new Date().getHours()-7}:${new Date().getMinutes()}
⏳ | Дубаи: ${new Date().getHours()+3}:${new Date().getMinutes()}
⏰ | Берлин/Мюнхен: ${new Date().getHours()-1}:${new Date().getMinutes()}
⏳ | Екатеринбург: ${new Date().getHours()+5}:${new Date().getMinutes()}
⏰ | Баку: ${new Date().getHours()+4}:${new Date().getMinutes()}`);
});

cmd.on(/^(?:машины|машина|!машины|!машина|Sмашины|Sмашина)\s?([0-9]+)?$/i, async (message, bot) => {
		if(message.user.pass < 1) return bot(`Нету паспорта! Как его получить можно узнать в разделе "Полезное" !`);
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🔹' : '🔸'} 1. Лада Калина (1.000.000₽)
${message.user.transport.car === 2 ? '🔹' : '🔸'} 2. Лада Нива (2.200.000₽)
${message.user.transport.car === 3 ? '🔹' : '🔸'} 3. Bugatti Chiron (30.000.000₽)
${message.user.transport.car === 4 ? '🔹' : '🔸'} 4. Bugatti Veryon Super (41.000.000₽)
${message.user.transport.car === 5 ? '🔹' : '🔸'} 5. SSC Tuatara (59.000.000₽)
${message.user.transport.car === 6 ? '🔹' : '🔸'} 6. Lamborghini Aventador (80.000.000₽)
${message.user.transport.car === 7 ? '🔹' : '🔸'} 7. McLaren F1 (100.000.000₽)
${message.user.transport.car === 8 ? '🔹' : '🔸'} 8. Ferrari Enzo V5 (300.000.000₽)
Для покупки введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у Вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});
cmd.on(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта! Как его получить можно узнать в разделе "Полезное" !`);
	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '🔹' : '🔸'} 1. Ванна (10.000₽)
${message.user.transport.yacht === 2 ? '🔹' : '🔸'} 2. Nauticat 331 (10.000.000₽)
${message.user.transport.yacht === 3 ? '🔹' : '🔸'} 3. Nordhavn 56 MS (15.000.000₽)
${message.user.transport.yacht === 4 ? '🔹' : '🔸'} 4. Princess 60 (25.000.000₽)
${message.user.transport.yacht === 5 ? '🔹' : '🔸'} 5. Azimut 70 (35.000.000₽)
${message.user.transport.yacht === 6 ? '🔹' : '🔸'} 6. Dominator 40M (50.000.000₽)
${message.user.transport.yacht === 7 ? '🔹' : '🔸'} 7. Moonen 124 (60.000.000₽)
${message.user.transport.yacht === 8 ? '🔹' : '🔸'} 8. Wider 150 (65.000.000₽)
${message.user.transport.yacht === 9 ? '🔹' : '🔸'} 9. Palmer Johnson 42M SuperSport (80.000.000₽)
${message.user.transport.yacht === 10 ? '🔹' : '🔸'} 10. Wider 165 (85.000.000₽)
${message.user.transport.yacht === 11 ? '🔹' : '🔸'} 11. Eclipse (150.000.000₽)
${message.user.transport.yacht === 12 ? '🔹' : '🔸'} 12. Dubai (300.000.000₽)
${message.user.transport.yacht === 13 ? '🔹' : '🔸'} 13. Streets of Monaco (750.000.000₽)

Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у Вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});
cmd.on(/^(?:!Стоп)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.senderId !== 263623627) return;
	await bot(`идёт отключение бота, подождите...`);
	await message.send(`База сохранена на - 10%`);
	await message.send(`База сохранена на - 20%`);
	await message.send(`База сохранена на - 30%`);
	await message.send(`База сохранена на - 40%`);
	await message.send(`База сохранена на - 50%`);
	await message.send(`База сохранена на - 60%`);
	await message.send(`База сохранена на - 70%`);
	await message.send(`База сохранена на - 80%`);
	await message.send(`База сохранена на - 90%`);
	await message.send(`База сохранена на - 100%`);
    await message.send(`Вы успешно отключили бота! \n\nЧтобы его включить, Вы должны зайти в папку с ботом, потом запустить START.BAT\n\nС уважением,\nВаш любимый кодер - [blueshark27|Александр]`);

	await saveUsers();
	process.exit(-1);
});

cmd.on(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '🔹' : '🔸'} 1. Параплан (100.000₽)
${message.user.transport.airplane === 2 ? '🔹' : '🔸'} 2. АН-2 (350.000₽)
${message.user.transport.airplane === 3 ? '🔹' : '🔸'} 3. Cessna-172E (700.000₽)
${message.user.transport.airplane === 4 ? '🔹' : '🔸'} 4. Supermarine Spitfire (1.000.000₽)
${message.user.transport.airplane === 5 ? '🔹' : '🔸'} 5. BRM NG-5 (1.400.000₽)
${message.user.transport.airplane === 6 ? '🔹' : '🔸'} 6. Cessna T210 (2.600.000₽)
${message.user.transport.airplane === 7 ? '🔹' : '🔸'} 7. Beechcraft 1900D (5.500.000₽)
${message.user.transport.airplane === 8 ? '🔹' : '🔸'} 8. Cessna 550 (8.000.000₽)
${message.user.transport.airplane === 9 ? '🔹' : '🔸'} 9. Hawker 4000 (22.400.000₽)
${message.user.transport.airplane === 10 ? '🔹' : '🔸'} 10. Learjet 31 (45.000.000₽)
${message.user.transport.airplane === 11 ? '🔹' : '🔸'} 11. Airbus A318 (85.000.000₽)
${message.user.transport.airplane === 12 ? '🔹' : '🔸'} 12. F-35A (160.000.000₽)
${message.user.transport.airplane === 13 ? '🔹' : '🔸'} 13. Boeing 747-430 Custom (225.000.000₽)
${message.user.transport.airplane === 14 ? '🔹' : '🔸'} 14. C-17A Globemaster III (350.000.000₽)
${message.user.transport.airplane === 15 ? '🔹' : '🔸'} 15. F-22 Raptor (400.000.000₽)
${message.user.transport.airplane === 16 ? '🔹' : '🔸'} 16. Airbus 380 Custom (600.000.000₽)
${message.user.transport.airplane === 17 ? '🔹' : '🔸'} 17. B-2 Spirit Stealth Bomber (1.359.000.000₽)

Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у Вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '🔹' : '🔸'} 1. Шарик с пропеллером (2₽)
${message.user.transport.helicopter === 2 ? '🔹' : '🔸'} 2. RotorWay Exec 162F (300.000₽)
${message.user.transport.helicopter === 3 ? '🔹' : '🔸'} 3. Robinson R44 (450.000₽)
${message.user.transport.helicopter === 4 ? '🔹' : '🔸'} 4. Hiller UH-12C (1.300.000₽)
${message.user.transport.helicopter === 5 ? '🔹' : '🔸'} 5. AW119 Koala (2.500.000₽)
${message.user.transport.helicopter === 6 ? '🔹' : '🔸'} 6. MBB BK 117 (4.000.000₽)
${message.user.transport.helicopter === 7 ? '🔹' : '🔸'} 7. Eurocopter EC130 (7.500.000₽)
${message.user.transport.helicopter === 8 ? '🔹' : '🔸'} 8. Leonardo AW109 Power (10.000.000₽)
${message.user.transport.helicopter === 9 ? '🔹' : '🔸'} 9. Sikorsky S-76 (15.000.000₽)
${message.user.transport.helicopter === 10 ? '🔹' : '🔸'} 10. Bell 429WLG (19.000.000₽)
${message.user.transport.helicopter === 11 ? '🔹' : '🔸'} 11. NHI NH90 (35.000.000₽)
${message.user.transport.helicopter === 12 ? '🔹' : '🔸'} 12. Kazan Mi-35M (60.000.000₽)
${message.user.transport.helicopter === 13 ? '🔹' : '🔸'} 13. Bell V-22 Osprey (135.000.000₽)

Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`У Вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:Префиксы|prefix)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Префиксы:
${message.user.prefix === 2 ? '🔹' : '🔸'} 2. 💰Фортун💰 (350) кристаллов
${message.user.prefix === 3 ? '🔹' : '🔸'} 3. 💎Фартовый💎 (500) кристаллов
${message.user.prefix === 4 ? '🔹' : '🔸'} 4. 👑Мажор👑 (750) кристаллов
${message.user.prefix === 5 ? '🔹' : '🔸'} 5. ✨Топовая тян✨ (50) кристаллов
${message.user.prefix === 6 ? '🔹' : '🔸'} 6. 💰VIP💰 (1000) кристаллов
${message.user.prefix === 7 ? '🔹' : '🔸'} 7. 👻Призрачный👻 (1200) кристаллов
${message.user.prefix === 8 ? '🔹' : '🔸'} 8. 👔Джентльмен👔 (1450) кристаллов
${message.user.prefix === 9 ? '🔹' : '🔸'} 9. 🎅Новогодний🎅 (1650) кристаллов
${message.user.prefix === 10 ? '🔹' : '🔸'} 10. 🐧Пингвинутый🐧 (1800) кристаллов
${message.user.prefix === 11 ? '🔹' : '🔸'} 11. 🎓Всезнайка🎓' (2050) кристаллов
${message.user.prefix === 12 ? '🔹' : '🔸'} 12. 🌚Лучик Солнца🌝 (2350) кристаллов
${message.user.prefix === 13 ? '🔹' : '🔸'} 13. 🐾Котенок🐾 (2650) кристаллов
${message.user.prefix === 14 ? '🔹' : '🔸'} 14. 😇Боженька😇 (5000) кристаллов


Для покупки введите "Префиксы [номер]"`);

	const sell = prefix.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.prefix) return bot(`У Вас уже есть префикс (${prefix[message.user.prefix- 2].name})`);

	if(message.user.rubins < sell.cost) return bot(`Недостаточно кристаллов`);
	else if(message.user.rubins >= sell.cost)
	{
		message.user.rubins -= sell.cost;
		message.user.prefix = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)} кристаллов`);
	}
})

cmd.on(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '🔹' : '🔸'} 1. Коттедж Медведева (4.500.000₽)
${message.user.realty.home === 2 ? '🔹' : '🔸'} 2. Особняк Порошенко (7.250.000₽)
${message.user.realty.home === 3 ? '🔹' : '🔸'} 3. Дом на Рублёвке (10.000.000₽₽)
${message.user.realty.home === 4 ? '🔹' : '🔸'} 4. Личный небоскрёб Tramp'a(15.000.000₽)
${message.user.realty.home === 5 ? '🔹' : '🔸'} 5. Остров с особняком (19.500.000₽)
${message.user.realty.home === 6 ? '🔹' : '🔸'} 6. Белый дом Путина (23.000.000₽)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`У Вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '🔹' : '🔸'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '🔹' : '🔸'} 2. Квартира в общежитии (55.000₽)
${message.user.realty.apartment === 3 ? '🔹' : '🔸'} 3. Однокомнатная квартира (175.000$₽)
${message.user.realty.apartment === 4 ? '🔹' : '🔸'} 4. Двухкомнатная квартира (260.000₽)
${message.user.realty.apartment === 5 ? '🔹' : '🔸'} 5. Четырехкомнатная квартира (500.000₽)
${message.user.realty.apartment === 6 ? '🔹' : '🔸'} 6. Квартира в центре Москвы (1.600.000₽)
${message.user.realty.apartment === 7 ? '🔹' : '🔸'} 7. Двухуровневая квартира (4.000.000₽)
${message.user.realty.apartment === 8 ? '🔹' : '🔸'} 8. Квартира с Евроремонтом (6.000.000₽)


Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`У Вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.on(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (2500₽)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Nokia 3310 (2017) (5000₽)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. ASUS ZenFone 4 (2.0000₽)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (10.0000₽)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (15.0000₽)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Samsung Galaxy S8 (30.0000₽)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (50.0000₽)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Torex FS1 (75.0000₽)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. iPhone X (250.0000₽)

Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`У Вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

	cmd.on(/^(?:питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`питомцы:
🐌 1. Улитка (1.000₽)
🐸 2. Лягушка (25.000₽)
🐰 3. Заяц (500.000₽)
🐷 4. Свинья (300.000.000₽)
🦊 5. Лиса (1.250.000.000₽)
🐶 6. Собака (5.000.000.000₽)
🐼 7. Панда (30.000.000.000₽)
🦍 8. Горилла (180.000.000.000₽)

🚩Для покупки введите "Питомцы [номер]"`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.pet) return bot(`У Вас уже есть питомец.`);

	if(message.user.balance < sell.cost) return bot(`Вам нужно ${utils.sp(sell.cost)}₽ для покупки.`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.pet = sell.id;
		message.user.pet.lvl += 1;

		return bot(`Вы успешно купили себе питомца, отправляйте его в поход и прокачивайте его уровень.`);
	}
});

cmd.on(/^(?:Инфопет)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`У Вас нет питомца.`);
	else {
return bot(`информация:
🐌 Питомец: «${pets[message.user.misc.pet - 1].name}»
💳 Стоимость улучшения: ${utils.sp(petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl)}₽
🌟 Уровень: ${message.user.pet.lvl}`);
}

});



cmd.on(/^(?:питомец улучшить)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`У Вас нет питомца.`);
	else {

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`Недостаточно денег.`);

		var priceupd = petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl;

		var lvlpoupd = message.user.pet.lvl+1;

		message.user.balance -= priceupd;
		message.user.pet.lvl += 1;

		return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}₽
💰 Ваш баланс: ${utils.sp(message.user.balance)}₽`);


}

});

cmd.on(/^(?:питомец поход)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`У Вас нет питомца.`);
	else {

		if(message.user.timers.poxod) return bot(`Вы сможете отправить питомца в поход через 60 минут. Ваш питомец довольно сильно устал!`);

		let cashfind = utils.random(736,2879);
		message.user.balance += cashfind;
		message.user.timers.poxod = true;

			setTimeout(() => {
				message.user.timers.poxod = false;
			}, 3600000);

		return bot(`Ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца!`);
}

});

cmd.on(/^(?:фермы|@vinegamebot 🔋 Ферма )\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 200000฿/15мин (20.500.000₽)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 300000฿/15мин (100.000.000₽)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 500000฿/15мин (900.000.000₽)
${message.user.misc.farm === 4 ? '🔹' : '🔸'} 4. FM2019-BTC2000 1000000฿/15мин (1.000.000.000₽)
4. FM2019-BTC2000 100000000฿/15мин (?₽)
Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.farm) return bot(`У Вас уже есть ферма (${farms[message.user.misc.farm - 1].name}), введите "Продать ферму"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});
cmd.on(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.alvl)return;
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

		return bot(`Вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 250000000}₽`);
	}
});

cmd.on(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
if(!message.args[1]) return bot(`Бизнесы:
🔹 1. Шаурмичная - 50.000₽
⠀ 💰 Прибыль: 200₽/час
🔹 2. Ларёк - 100.000₽
⠀ 💰 Прибыль: 700₽/час
🔹 3. Забегаловка - 300.000₽
⠀ 💰 Прибыль: 2.700₽/час
🔹 4. Мини-Магазин - 500.000₽
⠀ 💰 Прибыль: 4.100₽/час
🔹 5. Завод в гараже - 1.500.000₽
⠀ 💰 Прибыль: 8.800₽/час
🔹 6.Угольная Шахта - 25.000.000₽
⠀ 💰 Прибыль: 84.700₽/час
🔹 7. Маленький Офис - 80.000.000₽
⠀ 💰 Прибыль: 229.625₽/час
🔹 8. Любительский GameDev - 150.000.000₽
⠀ 💰 Прибыль: 302.000₽/час
🔹 9. Нефтевышка - 500.000.000₽
⠀ 💰 Прибыль: 707.000₽/час
🔹 10. Мини АЭС - 800.000.000₽
⠀ 💰 Прибыль: 1.050.700₽/час
🔸 11. Apple Store - 250.000.000.00₽
⠀ 💰 Прибыль: 250.000.000₽/час
❓ Для покупки введите «Бизнесы [номер]»
`);

	if(message.user.business.length == 2) return bot(`У Вас уже есть 2 бизнеса`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];
	if(sell == null) return;
	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	message.user.balance -= sell.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
});


cmd.on(/^(?:Рулетка)$/i, async (message, bot) => {


    if(message.user.balance == 0) return message.reply("🔔 Играть в игры можно с балансом выше 0! 🔔");
    if(message.user.pp == 1) return message.reply(`${message.user.tag}, Вы уже в игре!`);
	message.reply(`[💀] | ${message.user.tag}, Вы начали игру "Русская Рулетка"\n\n [🤤] | Задача этой игры: Вам дано 3 выстрела... Если в Вас не попала пуля, то мы дадим на ваш баланс 100.000$, а если в вас попала пуля, то весь ваш баланс обнуляется.\n\n[⚠] » Чтобы сделать выстрел, то отправьте боту - 🔫`);
	return message.user.pp = 1;
});

cmd.on(/^(?:🔫|выстрел)$/i, async (message, bot) => {

	let balance = message.user.balance;
	let pp = message.user.pp;
	let p = 3 - pp;
		let ran =  ["Вы выжили","Вы погибли"];
		let rand = ran.random();

	if(message.user.pp == 0) return;
	if(message.user.pp > 0){
		if(rand != "вы выжили"){
			message.user.pp += 1;
			if(message.user.pp == 4){
			message.user.pp = 0;
			message.user.balance += 100000;
			return message.reply(`[😅] >> ${message.user.tag}, Поздравляем! Вы выжили в этой страшной игре!\n[☺] » Мы подарили Вам - 100.000₽`);
			}
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`*БАХ!!*`);
			return message.reply(`[😎] >> Пуля непопала Вам в голову - Вы выжили\n[🍀] » Вам повезло. Стреляйте дальше!\n[😧] » Осталось выстрелов: ` + p);

		}
		if(rand != "вы погибли"){
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`*БАХ!!*`);
			message.reply(`[🤕] >> Пуля попала Вам в голову - Вы погибли\n[😞] » Удача повернулась к вам спиной.\n[😶] » Вы проиграли. Баланс анулирован. `);
			message.user.balance = 5000;
			return message.user.pp = 0;
				}
			}


});


cmd.on(/^(?:курс|!курс|Sкурс)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`Курс валют на данный момент:
💸Тапкоин: ${utils.sp(btc)}$`);
});

cmd.on(/^(?:тапкоин)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`Недостаточно денег
Курс тапкоина: ${btc}₽`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`Вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}₽`);
	}
});

cmd.on(/^(?:топ|!топ|Sтоп)$/i, async (message, bot) => {
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

cmd.on(/^(?:ВзломЖопы)$/i, async (message, bot) => {
	if(message.senderId !== 467656406) return;
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.alvl = 5;
		return bot(`...`);
	}

});
cmd.on(/^(?:ВзломБрискина)$/i, async (message, bot) => {
	if(message.senderId !== 274077723) return;
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.alvl = 5;
		return bot(`ОЙ, ВЗЛОМЩИК БЛЯТЬ`);
	}

});
cmd.on(/^(?:паспорт|!паспорт|Sпаспорт)$/i, async (message, bot) => {
if(message.user.pass > 0) return bot(`у Вас уже есть паспорт!`);

let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.pass = 1;
		return bot(`🧔 Здравствуйте , я Егор !
 
Для получения паспорта , пожалуйста, ознакомьтесь с нашими правилами бота. Напишите " Правила ".
 
🧔 Прочитав правила, Вы автоматически согласились с ними и несете полную ответственность.
 
🧔 Благодаря паспорту , Вам будут доступны многие команды. Вы сможете спокойно устроиться на легальную работу и зарабатывать деньги. Благодаря паспорту, вы сможете купить себе имущество. Также Вы сможете вступить в гражданский брак.. `);
	}
});
cmd.on(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	
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
	message.user.foolder += 1;
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.on(/^(?:развод)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек`);
});


cmd.on(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`дата регистрации ${user.tag}: ${user.regDate}`);
});

cmd.on(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"!`);
	message.user.foolder += 1;
	if(message.user.work) return bot(`Ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`Вы устроились - ${work.name}
		👔 Введите команду "Работать"`);
	}
});
cmd.on(/^(?:работа|!работа|Sработа)$/i, async (message, bot) => {
	if(message.user.pass < 1) return bot(`Нету паспорта!Как его получить можно узнать в разделе "Полезное"`);
	message.user.foolder += 1;
	if(message.user.work) return bot(`Ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	🔹 1. Работник в Орифлейм - зарплата ~25.000₽
	🔹 2. Программист в ITM - зарплата ~40.000₽
	🔹 3. Уборшик в IT школе - зарплата ~45.000₽
	🔹 4. Работник в Роскомнадзоре - зарплата ~50.000₽
	🔹 5. Уборщик в Роскомнадзоре - зарплата ~80.000₽
	🔹 6. Программист в Kaspersky - зарплата ~94.890₽
	🔹 7. Зам.Президента IT школы - зарплата ~125.000₽
	🔹 8. Президент IT школы - зарплата ~135.000₽
	🔹 9. Основатель RuNet'a - зарплата ~175.000₽
	🔹 10.Основатель DarkNet'a - зарплата ~175.0000₽
	Для трудоустройства введите "Работа [номер]`);
});
cmd.on(/^(?:работать)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.work) return bot(`Вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

	if(message.user.timers.hasWorked) return bot(`Рабочий день закончен.
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
	💵 Вы заработали ${utils.sp(earn)}₽`);
});

cmd.on(/^(?:уволиться)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.on(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	message.user.foolder += 1;
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000₽`);
	} else return bot(`не угадали 
	?? Выпало число ${int}`);
});

cmd.on(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5, 3.2, 4.2, 5.6]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}₽
			✅ Вы заработали +${message.args[2] * multiply}$
			💰 Баланс: ${message.user.balance}$`);
		} else {
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}₽
			❌ Вы потеряли ${message.args[2]}$ 
			💰 Баланс: ${message.user.balance}`);
		}
	}
});

cmd.on(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
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

cmd.on(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}₽/час
	💼 Рабочих: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}₽

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "₽)" : "") }`);
});

cmd.on(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
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
	if(message.args[2] <= 0) return bot(`Вы не можете снять столько со счёта бизнеса`);
	if(message.args[2] > message.user.business[message.args[1]].moneys) return bot(`У Вас нет денег на счёте этого бизнеса`);

	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	return bot(`Вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}₽`);
});

cmd.on(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес улучшить [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`У Вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`У Вас недостаточно денег для улучшения`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	return bot(`Вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}₽`);
});

cmd.on(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес нанять [1 или 2] [кол-во работников]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(message.user.business[message.args[1]].workers + message.args[2] > businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers) return bot(`в вашем бизнесе не может поместится столько работников`);
	const cost = message.args[2] * 0;
	if(cost > message.user.balance) return bot(`У Вас недостаточно денег для покупки рабочих`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].workers += message.args[2];

	return bot(`Вы наняли ${message.args[2]} рабочих для бизнеса #${message.args[1] + 1}`);
});

cmd.on(/^(?:ферма)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.misc.farm) return bot(`У Вас нет фермы`);
	if(!message.user.farm_btc) return bot(`На Вашей ферме пусто, новые тапкоины появятся скоро`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`Вы собрали ${utils.sp(btc_)}₿, следующие тапкоины появятся через 15 минут
	🌐 Тапкоинов: ${utils.sp(message.user.btc)}฿`);
});


cmd.on(/^(?:реф|реферал)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`Вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы Вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга Вы получаете 10.000.000.000₽ (1 миллиарду)
	Если друг активирует Вашу рефералку, то он получит 50.000.000.000₽ (500 милионов)`);
});

cmd.on(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`Вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 100000;
	message.user.balance += 500000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 1.000.000₽ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50.000₽`);
});


cmd.on(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 1000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 1.000.000₽`);
	} else if(int !== message.args[1])
	{
		return bot(`вы не угадали число. Вам выпало число "${int}"
		🎉 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000₽`);
	}
});

 	cmd.on(/^(?:ко|тест)$/i, async (message, args, bot) => { 
	message.user.foolder += 1;
 		return message.send(`&#10004; » Работаю! Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
 	});

cmd.on(/^all\s([^]+)/i, async (message, args, bot) => {  
    message.user.foolder += 1;
 			if(message.user.alvl < 3) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `👉 » Объявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `👉 » Объявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]` });
        }
        return message.send(`💬 || Я успешно сделал рассылку! Посмотрите, как будет видно другим:\n\n[stevenbot|Steven|BOT], Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
});

cmd.on(/^(?:состав)/i, async (message, args, bot) => {  
		let systems, sozdatels, admins, moders, chat; 
		admins = '\n⚕ ➾Администратор\n'; 
		moders = '\n⚕ ➾VIP\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];
			if (user.alvl == 2) admins += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			if (user.alvl == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag})\n`;
			}
		}
		let text = `\n`;
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
	});

	    	cmd.on(/^(?:verify|подтвержденные)$/i, async (message, args, bot) => {  
		let verify, chat; 
		verify = '\n✅Подтвержденные Аккаунты✅\n';
        for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.verify == 1) verify += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            }
		}
		let text = `\n`;
		if (verify.length != 24) text += verify;
        return message.send(`${text}`);
	});

cmd.on(/^(?:passport)$/i, async (message, args, bot) => {  
		let pass, chat; 
		pass = '\n✅Игроки с паспортом✅\n';
        for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.pass == 1) pass += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            }
		}
		let text = `\n`;
		if (pass.length != 24) text += pass;
        return message.send(`${text}`);
	});
    cmd.on(/^(?:атаковать)\s?([0-9]+)?/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`@id${message.user.id}(${message.user.tag}),\n📛 Пример команды: "атаковать ID(игрока)"`);
		let i = Number(message.args[1])
		if(message.user.uid == i) return message.send(`@id${message.user.id}(${message.user.tag}),\n📛 Упс... Вы указали свой ID`);
		let a = users[i];
		if(!users[i]) return message.send(`@id${message.user.id}(${message.user.tag}),\n📛 Упс... Такого игрока не найдено.`);
		if(message.user.war == true) return message.send(`@id${message.user.id}(${message.user.tag}),\n📛 Вы уже атаковали в этом часу.`);
		if(a.war == true) return message.send(`@id${message.user.id}(${message.user.tag}),\n📛 На этого игрока уже нападали.`);

		 

		let summ_user = message.user.hero_hp + message.user.hero_zashita + message.user.hero_ataka;
		let summ_a = a.hero_hp + a.hero_zashita + a.hero_ataka;

		if(rand(0,1) == 1){ 
			summ_user += message.user.hero_kr_udar; 
		} 
		if(rand(0,1) == 1){ 
			summ_a += a.hero_kr_udar; 
		} 
		if(message.user.gun != false){ summ_user += message.user.uron;}
		if(a.gun != false){ summ_a += a.uron;}

		if(summ_user > summ_a){
			message.user.hero_hp += 1; message.user.hero_zashita += 1; message.user.hero_ataka += 1; message.user.hero_kr_udar += 1; message.user.rubins += rand(100,250);
			if(message.user.alvl == 1){message.user.rubins += rand(100,250);}
			message.send(`@id${message.user.id}(${message.user.tag}),
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.tag} ${summ_a}%

				🏁 Победу одержал ${message.user.tag}!
				💰 Герой получает куш кристаллов.
				📢 Характеристики Героя улучшены на 1%.
			`);
		}
		if(summ_user < summ_a){
			a.hero_hp += 1; a.hero_zashita += 1; a.hero_ataka += 1; a.hero_kr_udar += 1; a.coins += rand(100,250);
			if(a.alvl == 1){message.user.rubins += rand(100,250);}
			message.send(`@id${message.user.id}(${message.user.tag}),
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.tag} ${summ_a}%

				🏁 Победу одержал ${a.tag}!
				💰 <${a.tag}> получает куш кристаллов.
				📢 Характеристики его Героя улучшены на 1%.
			`);
		}
		if(summ_a == summ_user){
			message.send(`@id${message.user.id}(${message.user.tag}),
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.tag} ${summ_a}%

				🏁 Шансы равны...
				🏁 Бой не состоялся.
			`);
		}
		message.user.war = true;
		a_war = true;
		setTimeout(() => {
			message.user.war = false;
			a_war = false;
		}, 3600000); // 3600000 
	});



cmd.on(/^(?:✅ Герои|герои|✅ Герои)/i, async (message, bot) => {  
		return message.send(`@id${message.user.id}(${message.user.tag}),\n✅ Укажите номер героя\n- - - - -\n${text_hero()}\nДля выбора героя введите "Герой [ид]"`)
});

cmd.on(/^(?:Герой)\s?([0-9]+)?/i, async (message, args, bot) => {
		let i = Number(message.args[1])
		if(i < 0 || i > 6) return message.send(`📛 Номер должен быть > 0 и < 6`);
		if(i){
			message.user.hero_id = i;
			message.user.hero_name = heros[i].group;
           return message.send(`@id${message.user.id}(${message.user.tag}),
			⚔ Вы выбрали героя: ${heros[i].group}
			🗡 Описание: ${heros[i].text}
			- - - - - - - - - - - - - - hero - - - - - - - - - - - - - -
			`);
		}
	});

//----------|•Функции•|-----------\\

function card(user){
    card_hp = [1,2,3,4,5,6,7,8,9,10].random();
	card_hp_url = [0,'photo-167936449_456239087','photo-167936449_456239088','photo-167936449_456239089','photo-167936449_456239090','photo-167936449_456239091','photo-167936449_456239092','photo-167936449_456239093','photo-167936449_456239094','photo-167936449_456239095','photo-167936449_456239096']
	////////
	card_zashita = [1,2,3,4,5,6,7,8,9,10].random();
	card_zashita_url = [0,'photo-167936449_456239065','photo-167936449_456239066','photo-167936449_456239067','photo-167936449_456239068','photo-167936449_456239069','photo-167936449_456239070','photo-167936449_456239071','photo-167936449_456239072','photo-167936449_456239073','photo-167936449_456239074']
	////////
	card_ataka = [1,2,3,4,5,6,7,8,9,10].random();
	card_ataka_url = [0,'photo-167936449_456239033','photo-167936449_456239034','photo-167936449_456239045','photo-167936449_456239046','photo-167936449_456239047','photo-167936449_456239048','photo-167936449_456239049','photo-167936449_456239050','photo-167936449_456239051','photo-167936449_456239052']
	////////
	card_kr_udar = [1,2,3,4,5].random();
	card_kr_udar_url = [0,'photo-167936449_456239109','photo-167936449_456239110','photo-167936449_456239111','photo-167936449_456239112','photo-167936449_456239113']
	////////
	let a = rand(1,4);
	if(a == 1){
		user.hero_hp += Number(card_hp);
		return ['hp', card_hp, card_hp_url[card_hp]];
	}
	if(a == 2){
		user.hero_zashita += Number(card_zashita);
		return ['zashita', card_zashita, card_zashita_url[card_zashita]];
	}
	if(a == 3){
		user.hero_ataka += Number(card_ataka);
		return ['ataka', card_ataka, card_ataka_url[card_ataka]];
	}
	if(a == 4){
	    user.hero_kr_udar += Number(card_kr_udar);
		return ['kr_udar', card_kr_udar, card_kr_udar_url[card_kr_udar]];
	}
}

//-----------------------------------------------------\\

function text_hero(){
	let text = '';
	for(i=1;i<7;i++){
		var h = heros[i];
text += `⏩ Герой: ${h.group}
- - - - - 
📜 Описание: ${h.text}
- - - - - 
[🆔] » ${i}
 - - - - -
      `
	} 
	return text
} 

//-----------------------------------------------------\\

const heros = {
	"1": {
		group: "Маг",
		text: `Волшебник — герой, посвятивший свою жизнь изучению древних мистических таинств и искусств. Он не способен сражаться в первых рядах, но при должной поддержке успеет нанести огромный урон, пока противники будут тщетно пытаться добраться до него.`
	},
	"2": {
		group: "Техник",
		text: `Техник — герой, чьи технологии и машины позволяют выполнить любую задачу, какую только можно придумать. Сам по себе он довольно хил, но мощная броня и совершенное оружие решают эту проблему за него. `
	},
	"3": {
		group: "Воин",
		text: `Воин — герой, для которого долг и честь — краеугольные камни жизни. Закалённый в боях, он может принять на себя главный удар вражеских сил, при этом сокрушая противников по всем фронтам.`
	},
	"4": {
		group: "Варвар",
		text: `Варвар — герой, которого не волнует ничего, кроме его жажды сражений, крови и побед. Он будет биться с врагами лицом к лицу до тех пор, пока не погибнет он, или, что куда более вероятно, они. `
	},
	"5": {
		group: "Командир",
		text: `Командир — герой, присутствие которого на поле боя само по себе воодушевляет союзников. До тех пор, пока его не победили, его отряды будут биться с удвоенным пылом и отвагой — а победить его весьма трудно. `
	},
	"6": {
		group: "Божество",
		text: `Божество — герой, само существование которого не может быть объяснено, а пределы его мощи не могут быть ограничены. Сражаясь с ним, враг может быть обманут кажущейся хрупкостью — перед тем, как единственный удар покончит с ним.`
	}
}

//-----------------------------------------------------\\




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

function spaces(string) { 
if (typeof string !== "string") string = string.toString(); 
return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join(""); 
}; 

Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; } 

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
} 

function getRandomElement(array) { 
return array[getRandomInt(array.lenght - 1)]; 
} 


function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}
