console.log('Идет запуск');
 ﻿const {VK, Keyboard} = require('vk-io');
const vk = new VK();
let giving = false;
const request = require('prequest');
const prequest = require('request-promise');
const commands = [];
var wall_to_send = '';
let user = new VK();
user.setOptions({
	token: '3b92893968437bfaef44f200d2a8cc7c8993664db5b5f6a5688b9293895b00c77c1826186d9d067c9af14'
});

const guns = {

	"1": {
		name: 'Пистолет "Deagle"',
		count: 36,
		price: 100000000
	},
	"2": {
		name: 'Автомат "M4A4"',
		count: 54,
		price: 600000000
	},
	"3": {
		name: 'Дробовик "Sawed-Off"',
		count: 55,
		price: 800000000
	},
	"4": {
		name: 'Пистолет "Five-SeveN | Испытание огнём"',
		count: 43,
		price: 1200000000
	},
	"5": {
		name: 'Автомат "AK-47"',
		count: 43,
		price: 15000000000
	},
	"6": {
		name: 'Автомат "AUG"',
		count: 35,
		price: 200000000
	},
   "7": {
        name: 'Автомат "Galil AR"',
		count: 34,
		price: 40000000
    },
  "8": {
        name: 'Пистолет-Пулемет "ПП-19 Бизон"',
		count: 37,
		price: 500000000
   },
 "9": {
        name: 'Пистолет-Пулемет "MP9"',
		count: 45,
		price: 100000000
  },
 "10": {
 	   name: 'Пистолет-Пулемет "UMP-45"',
		count: 44,
		price: 600200010
  },
  "11": {
        name: 'Пистолеты "Dual Berettas | Удар кобры"',
		count: 55,
		price: 800000000
  },
  "12": {
  	  name: 'Дробовик "Nova | Экзо"',
		count: 49,
		price: 900000000
  },
  "13": {
  	  name: 'Пистолет "Desert Eagle | Директива"',
		count: 43,
		price: 1000000000
  },
 "14": {
 	   name: 'Револьвер "R8 | Кровавая паутина"',
		count: 48,
		price: 1300000000
  },
 "15": {
 	   name: 'Сувенирный "AWP | Dragon Lore"',
		count: 75,
		price: 1600000000
 },
 "16": {
 	   name: 'Star Track "М4А1 | Вой"',
		count: 56,
		price: 1800000000
  },
 "17": {
 	name: 'Star Track "AK-47 | Императрица "',
     count: 63,
     price: 192000000000
   }
}


let cases = [
	{
		uron: 36,
		name: 'Пистолет "Deagle"'
	},
	{
		uron: 36,
		name: 'Автомат "M4A4"'
	}, 
	{
		uron: 55,
		name: `Дробовик "Sawed-Off"`
	},
	{
		uron: 43,
		name: `Пистолет "Five-SeveN | Испытание огнём"`
	},
	{
		uron: 37,
		name: `Автомат "AK-47"`
	},
	{
		uron: 35,
		name: `Автомат "AUG"`
	},
	{
		uron: 34,
		name: `Автомат "Galil AR"`
	},
	{
		uron: 37,
		name: `Пистолет-Пулемет "ПП-19 Бизон"`
	},
	{
		uron: 44,
		name: `Пистолет-Пулемет "MP9"`
	},
	{
		uron: 45,
		name: `Пистолет-Пулемет "UMP-45"`
	}, 
	{
		uron: 55,
		name: `Пистолеты "Dual Berettas | Удар кобры"`
	},
	{
		uron: 49,
		name: `Дробовик "Nova | Экзо"`
	},
	{
		uron: 43,
		name: `Пистолет "Desert Eagle | Директива"`
	},
	{
		uron: 45,
		name: `Револьвер "R8 | Кровавая паутина"`
	},
	{
		uron: 75,
		name: `Сувенирный "AWP | Dragon Lore"`
	}, 
    {
		uron: 56,
		name: `Star Track "М4А1 | Вой"`
	}, 
]

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

const pets = [
	{
		name: 'Котик',
		cost: 1000,
		id: 1
	},
	{
		name: 'Собака',
		cost: 5000,
		id: 2
	},
	{
		name: 'Лошадь',
		cost: 15000,
		id: 3
    },
	{
		name: 'Мутант',
		cost: 40000,
		id: 4
    },
	{
		name: 'Тигр',
		cost: 80000,
		id: 5
    },
	{
		name: 'Дракон',
		cost: 200000,
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

		{ // 3 улучшение
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
		name: '➖Ингнорщик➖',
		cost: 150,
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
		name: '|🔧|JavaScipt|💻|Coder|🔧|',
		cost: 500000,
		id: 15
	}
];

/*
⚡Топер⚡
💰Фортун💰
🍷Пошляк 🍷
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

/* GameBase */
const pr = require('./pravila.json');
const clans = require('./clans.json');
const promo = require('./promo.json');
const users = require('./users2.json'); 
const config = require('./settings/config.js');
let buttons = [];

vk.updates.on(['chat_invite_user_by_link'], async (message, next) => {
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });

		message.send(`🎉 || Приветствую тебя, игрок - ${user[0].first_name}! Вы попали в беседу, где Вы можете играть в меня или можете общаться с другими пользователями.\n\n👾 >> Чтобы в меня начать играть, нажмите нужную кнопку, ну или написать команду - Помощь`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Казино 1к"
		},
			"color": "positive"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});

		await next();
	});
	vk.updates.on(['chat_invite_user'], async (message, next) => {
		if(message.payload.action.member_id == message.senderId) return;

		let user = await vk.api.users.get({user_id: message.payload.action.member_id})

		message.send(`🎉 || Приветствую тебя, игрок - ${user[0].first_name}! Вы попали в беседу, где Вы можете играть в меня или можете общаться с другими пользователями.\n\n👾 >> Чтобы в меня начать играть, нажмите нужную кнопку, ну или написать команду - Помощь`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Казино 1к"
		},
			"color": "positive"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});

		await next();
	});
	vk.updates.on(['chat_kick_user'], async (message, next) => {
		if(message.payload.action.member_id == message.senderId) return;

		let user = await vk.api.users.get({user_id: message.payload.action.member_id})

		message.send(`📢 || Пользователь под названием (${user[0].first_name}), к сожалению, вышел из этой беседы. Вы можете его кикнуть с помощью команды - Кик id${message.payload.action.member_id}\n\n💬 >> Или Вы можете продолжить играть в бота :3`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": `Кикнуть https://vk.com/id${message.payload.action.member_id}`
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});

		await next();
	});

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

/*setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 15000);*/

setInterval(() => {
	let fs = require("fs");
	fs.writeFileSync("./users2.json", JSON.stringify(users, null, "\t"));
	}, 8000)

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += x.misc.farm_count * 2;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += x.misc.farm_count * 10;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += x.misc.farm_count * 100;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
        user.timers.bonus = false;
	    user.timers.shaxta = false;
        user.timers.pet_poxod = false;
        user.giverub = false;
        user.timers.gun_case = false;
        user.timers.poxod = false;
   });
}


clearTemp();

function rand(min, max) {
		return Math.round(Math.random() * (max - min)) + min
	}
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}


function time() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			var times = hours + ':' + minutes + ':' + seconds
			return times;
	}

function adm_log(is) {
  		let id = is[0];	
		let i = config;  
		for(i=0;i<200000;i++){
			if(users[i]){
			if(users[i].right >= 6){ 
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `⚠ ⚠ [ADM-LOG | Игрок: @id${users[is[0]].id}(${users[is[0]].tag}) || Id: ${users[is[0]].uid}] ⚠ ⚠\n[ -> ${is[1]} <- ]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
      }

function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "1" + month;
		if (days < 10) days = "1" + days;
		var datas = days + ':' + month + ':2019' ;
		return datas;
	}

function filter(text){
	var filter0 = text.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ig, "<LINK REMOVED>")
	var filter1 = filter0.replace(/(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.|ТЕСТЕР|Павел Дуров)/ig, '[Запрещено]')
	return filter1
}

async function saveUsers()
{
	require('fs').writeFileSync('./users2.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: '31b135d233012af630f4fb3aea30c992abbf8c6bf48ef490ca369822d47ea77c5098d086b6158dbb4088e', pollingGroupId: 175039543 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club175039543\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club175039543\|(.*)\]/ig, '').trim();


	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();
	
    users.push({
			id: message.senderId,
			uid: users.length,
			rub: 0,
            balance: 5000,
			rubins: 0,
		    bank: 0,
			btc: 0,
			farm_btc: 0,
        	business: [],
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
			gun_name: false,
            verify: 0,
			block_nick: 0,
            prefix: 0,
            rang: "Новичок",
            credit: 0,
            procent: 0,
            msg: 0,
            clan: false,
            biz: 0,
			right: 0,
			block_pay: false,
            givemyrub: false,
            donate_case: 0,
            sex: 0,
            warns: 0,
            warn: 0,
			warn_p: `Нет`,
			roulette: -1,
			roulette_bet: 0,
            rating: 0,
			regDate: `[${time()} | ${data()}]`,
			mention: true,
			block_game: true,
            ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
			    pet_poxod: false,
                poxod: false,
			    shaxta: false,
                pay: false,
                gun_case: false
            },
			tag: user_info.first_name,
			work: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
            keyboard: true,
            nbonus: false,
            operator: 0,
			number: 0,
            messages: false,
            business: [],
			game: {
				strela_win: 0,
				strela_loose: 0
			},
            transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				helicopter: 0
			},
         ainfo: {
					all_ans: 0,
					ans: 0,
					bans: 0,
                    jails: 0,
					warns: 0,
					nicks: 0,
					good_ans: 0,
					bad_ans: 0,
					vig: 0,
					vig_p: []
				}, 
         admin: {
				block_pay: false,
				block_give: false,
				block_rep: false
			}, 
			rep: {
				status: false,
				id: false
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
				requests: [],
			},
			pets: {
				pet: 0,
				level: 0,
			    exp: 0
          },
		   safe: {
				status: false,
				key: false
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

    message.user.msg += 1;

    if(message.user.pets.exp >= 24)
	{
		message.user.pets.exp = 1;
		message.user.pets.level += 1;
	}

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Executed: VK_ID: ${message.user.id} ChatId: ${message.chat} ID: ${message.user.uid} Nickname: ${message.user.tag} Message: ${message.text} `)
});

const cmd = {
	on: (p, f) => {
		commands.push([p, f]);
	}
}


cmd.on(/^(?:zz|eval|dev)\s([^]+)$/i, async (message, bot) => {
        if(message.user.right < 6) return;

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
  var is = [message.user.uid, message.text] 
		adm_log(is)
});
    
    
	cmd.on(/^(фортуна|фортун)$/i, async (message, args, bot) => {
		return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
    💠 Призы рулетки 💠
    🚀 ➣ Привилегия 'Модератор'. 
    💎 ➣ Рубины.
    🏮 ➣ Опыт.
    ⛓ ➣ БитКоины.
    💸 ➣ Валюта.

    ✳ ➣ Цена прокрутки: 500 рубинов.
    ✳ ➣ Команда: 'крутить'
    `,);
	});
 
	////////////////////////////
	cmd.on(/^(крутить|крутить рулетку)$/i, async (message, args, bot) => {
		   	if (message.user.rubins < 500) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Прокрутка рулетки стоит 500 рубинов.`);
			   message.user.rubins -= 500;
			
		let balan = rand(200000, 1000000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (message.user.right > 1) {
						message.user.balance += 500000;
						return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💠 ➣ Вы выиграли 500.000💰`);
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
	

/*cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
 if(message.user.right < 2) return message.send(`🔸➡ Вы не Silver`);
  if(message.args[3]){
  var id = user_id(message.args[3]);
  if (!users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
  return message.send(`
       ?? ➖ Игрок: ${users[id].tag}
    🆔 ➖ ID: ${id}
          ⛔ ➖ Статус: ${users[id].right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "<|System|>")}
  `);
 }else{ 
  if(!message.args[4]) return message.send(`Укажите данные`);
  var domain = message.args[4].split(" ");
  vk.api.call("utils.resolveScreenName", {
   screen_name: message.args[4]
  }).then((res) => { 
   var id = user_id(res.object_id);
   if (!users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
   return message.send(`
    👤 ➖ Игрок: ${users[id].tag}
    🆔 ➖ ID: ${id}
          ⛔ ➖ Статус: ${users[id].right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "<|System|>")}
    `);
  })
  return;
 }
 
});*/


/*cmd.on(/^(?:поиск)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, (message) => { 
 message.user.foolder += 1;
 if (message.args[4]) {
    var domain = message.args[4].split(" ");}

let user = users.find(x=> x.id === Number(message.args[3]));

   let text = ``; 
 
 text +=  `${user.uid}\n`;
 return bot(`Ид игрока\n${text}`);
});*/

/*const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
 r: /(бонус) ([^]+)$/i, 
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

cmd.on(/^(?:аправила|ahelp)$/i, async (message, bot) => { 
 		 return message.send(`
 		 	 🔻 » Актуальный список правил '' бота « 🔻 
			📝 » для АДМИНИСТРАТОРОВ И МОДЕРАТОРОВ « 📝 

			🔸 » 1. Хамство в ответе на репорт. [Выговор] 
			🔸 » 2. Неадекватные ответы на репорт. [Тюрьма 120мин] 
			🔸 » 3. Накрутка ответов на репорт. [Выговор] 
			🔸 » 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
			🔸 » 5. Обман спец.администрации. [Бан] 
			🔸 » 6. Выдача наказания без определённой причины. [Выговор] 
			🔸 » 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
			🔸 » 8. Слив какой-либо административной информации. [Бан] 
			🔸 » 9. Ражигание любых конфликтов между игроками. [Тюрьма 240мин]
			🔸 » 10. Выдача/передача администраторами валюты. [Бан]

 		 	`);
 	});

cmd.on(/^(?:админ|панель)$/i, async (message, bot) => {

	    if (message.user.right < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (message.user.right == 1) {
	        return message.send(`
					☑ » Bronze-Панель « ☑ 
✅ » аправила - к прочтению
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
					☑ » Silver-Панель « ☑
✅ » аправила - к прочтению
✅ » givemycoins [COUNT] - выдать себе валюту.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
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
					☑ » Gold-Панель « ☑
✅ » аправила - к прочтению
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » ban [ID] - заблокировать навсегда.
✅ » Кикнуть [Ссылка] - Кикнуть игрока.
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
					☑ » Diamond-Панель « ☑
✅ » аправила - к прочтению
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » blockpay [id] [Время] [Причина] - Выдать блокировку передачи денег.
✅ » unblock [id] - Разблокировать передачу денег.
✅ » unmute [id] - снять мут с игрока
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » givemycoins [COUNT] - Выдать себе коины.
✅ » givecoins [ID] [COUNT] - Выдать коины.
✅ » removecoins [ID] - аннулировать рубли игрока.
✅ » get [ID] - проверить игрока.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » ban [ID] - заблокировать навсегда.
✅ » unban [ID] - разблокировать игрока.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » ответ [ID] [TEXT] - ответить на репорт.
`);
	}
       if (message.user.right == 5) {
	        return message.send(`
					☑ » System-Панель « ☑
✅ » аправила - к прочтению
✅ » giverating [ID] [COUNT] - Выдать рейтинг.
✅ » removerating [ID] - аннулировать рейтинг игрока.
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » get [ID] - проверить игрока.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » blockrep [ID] [1-0] - Заблокировать ответ на репорт.
✅ » blockgive [ID] [-10] - Заблокировать выдачу денкг.
✅ » blockpay [ID] [Время] [Приина] - Заблокировать переводы игроку.
✅ » unblockpay [ID] - Разблокировать переводы игроку.
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » oon [ID] - снять ограничение на ставки игрока.
✅ » oof [ID] - включить ограничение на ставки игрока.
✅ » ver [ID] - Выдать Подтвержденный Аккаунт игроку.
✅ » unver [ID] - Забрать Подтвержденный аккаунт у игрока.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » ban [ID] - заблокировать навсегда.
✅ » unban [ID] - разблокировать игрока.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » ответ [ID] [TEXT] - ответить на репорт.
✅ » givecoins [ID] [COUNT] - Выдать коины.
✅ » removecoins [ID] - аннулировать рубли игрока.
✅ » setnick [ID] [ИМЯ] - Выдать ник.
`);  
      }
	if (message.user.right == 6) {
	        return message.send(`
					☑ » CREATOR-Панель « ☑
✅ » раздача - начать раздачу.
✅ » giverating [ID] [COUNT] - Выдать рейтинг.
✅ » removerating [ID] - аннулировать рейтинг игрока.
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » get [ID] - проверить игрока.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » blockrep [ID] [1-0] - Заблокировать ответ на репорт.
✅ » blockgive [ID] [-10] - Заблокировать выдачу денкг.
✅ » blockpay [ID] [Время] [Приина] - Заблокировать переводы игроку.
✅ » unblockpay [ID] - Разблокировать переводы игроку.
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » oon [ID] - снять ограничение на ставки игрока.
✅ » oof [ID] - включить ограничение на ставки игрока.
✅ » ver [ID] - Выдать Подтвержденный Аккаунт игроку.
✅ » unver [ID] - Забрать Подтвержденный аккаунт у игрока.
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
 
cmd.on(/^(?:ver)\s?([0-9]+)?$/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 » Вы не System`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].verify = 1; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота выдал вам Потдвержденный Акккунт`
		}); 
		return message.send(`✅ » Вы выдали Подтвержденный Аккаунт игроку [${users[message.args[1]].tag}].`);
	});

	 cmd.on(/^(?:unver)\s?([0-9]+)?$/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 » Вы не System`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].verify = 0; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота забрал у вас Потдвержденный Акккунт`
		}); 
		return message.send(`✅ » Вы убрали Подтвержденный Аккаунт игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:oon)\s?([0-9]+)?$/i, async (message, args, bot) => { 
	
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: oon ID`);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		users[message.args[1]].block_game = true 

		return message.send(`✅ ➾ Вы поставили ограничение на ставки игроку [${users[message.args[1]].tag}]`);
	}); 

	cmd.on(/^(?:oof)\s?([0-9]+)?$/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: ooff ID`);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		users[message.args[1]].block_game = false; 

		return message.send(`✅ ➾ Вы сняли ограничение на ставки игроку [${users[message.args[1]].tag}]`);
	}); 

 /////////////////
cmd.on(/^(?:промокод)\s?([^]+)?$/i, async (message, args, bot) => { 
if(!message.args[1]) return message.send(`📝 ➾ Укажите промокод`); 
if(!promo[message.args[1]]) return message.send(`📝 ➾ Такого промокода нету/либо закончились активации`); 
if(promo[message.args[1]].users[message.user.id]) return message.send(`📝 ➾ Вы уже активировали промокод`); 
promo[message.args[1]].activ -= 1; 
 
if(promo[message.args[1]].type == 1){ 
promo[message.args[1]].users[message.user.id] = {i: true}; 
message.user.balance += Number(promo[message.args[1]].balance); 
message.send(`✅ ➾ Вы активировали промокод!\n✅ ➾ Вы получили: ${promo[message.args[1]].balance}$!\n 📛 ➾ Осталось активаций: ${promo[message.args[1]].activ}`); 
} 
if(promo.type == 2){ 
 promo[message.args[1]].users[message.user.id] = {i: true}; 
message.user.rubins += Number(promo[message.args[1]].balance); 
message.send(`✅ ➾ Вы активировали промокод!\n✅ ➾ Вы получили: ${promo[message.args[1]].balance} рубинов!\n 📛 ➾ Осталось активаций: ${promo[message.args[1]].activ}`); 
 } 
 
if(promo[message.args[1]].activ == 0) delete promo[message.args[1]]; 
 
return 
});

cmd.on(/^(?:коды)$/i, async (message, bot) => {
	if(message.user.right < 5) return;	
	let text = '👑 ➾ Список промокодв:\n\n'
	for(name in promo){
 		text += `📝 ➣ Промокод: ${name}
		🗝 ➣ Количество активаций: ${promo[name].activ}
		💰 ➣ Сумма коинов: ${utils.sp(promo[name].balance)}`
	}
	return message.send(`
	${text}
	`)
	});
 
cmd.on(/^(?:addpromo|devcode)\s?([0-9]+)?\s([0-9]+)?$/i, async (message, args, bot) => {
	if(message < 5) return;
    if(!message.args[1]) return message.send(`📝 ➾ Укажите сумму для промокода`);     if(!message.args[2]) return message.send(`📝 ➾ Укажите кол-во активаций`);  

 	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	promo[result] = {
		users: {},
		activ: Number(message.args[2]),
		type: 1,
		balance: Number(message.args[1])
	}		
  
 	return message.send(`👑 ➾ Ловите промокод:\n👑 ➾ На ${message.args[2]} активаций | На ${utils.sp(message.args[1])} коинов\n👑 ➾ Введите: 'Промокод ${result}'`);
 });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


cmd.on(/^(?:Помощь|Помошь|Начать|меню|команды|help)$/i, async (message, bot) => {
	var admin = (message.user.right == 0) ? "" : "📕 » Админ - админ-панель. " 
			if(message.user.keyboard == false) {
					await message.send(`мои команды: 
🌐 Важное:
${admin}\n🚫 Правила - Правила бота [Обязательно к прочтению!]
✳ Донат
 
♥ Свадьба: 
👪 Брак [id] - сделать предложение 
📘 Бпомощь - брак команды для женатых
💔 Развод 
💍⠀Браки - список предложений 
 
💻 Нужное: 
📋 Профиль - Ваш профиль. 
💰 Баланс - Ваш баланс. 
📝 Ник [name] - Сменить Ник. 
👑 Рейтинг - ваш рейтинг  

🐼 Питомцы:
  🐯 Питомец - статистика питомца
  🐯 Питомцы - список питомцев
  🐯 Питомец поход - отправить питомца в поход
 
🔫 Система оружий:
  🔫 Оружейный кейс
  🔫 Оружие 

🔶 Разделы: 
     💲 Биз/бизнес помощь [✔] 
     ⚠ Разное [✔] 
        🔥 Полезное [✔] 
  🎮 Игры [✔] 
  🗺🌠 Развлечения [✔] 
  💼 Кейсы [✔]
        📝 Прочее [✔]
  🔱 Ранги [✔] 
 
📗 "Промокод [код]" - Активация промокода. 
 
🆘 Репорт [текст] - Связь с Админами/Жалобы/Предложения. `);
}
if(message.user.keyboard == true) {
	await message.send(`мои команды: 
🌐 Важное:
${admin}\n🚫 Правила - Правила бота [Обязательно к прочтению!]
✳ Донат
 
♥ Свадьба: 
👪 Брак [id] - сделать предложение 
💔 Развод 
💍⠀Браки - список предложений 
 
🐼 Питомцы:
  🐯 Питомец - статистика питомца
  🐯 Питомцы - список питомцев
  🐯 Питомец поход - отправить питомца в поход
 
💻 Нужное: 
📋 Профиль - Ваш профиль. 
💰 Баланс - Ваш баланс. 
📝 Ник [name] - Сменить Ник. 
👑 Рейтинг - ваш рейтинг  

🔫 Система оружий:
  🔫 Оружейный кейс
  🔫 Оружие 
 
🔶 Разделы: 
     💼 Биз/бизнес помощь [✔] 
     ⚠ Разное [✔] 
        🔥 Полезное [✔] 
  🎮 Игры [✔] 
  🗺🌠 Развлечения [✔] 
  📝 Прочее [✔]
  🔱 Ранги [✔] 
 
📗 "Промокод [код]" - Активация промокода. 
 
🆘 Репорт [текст] - Связь с Админами/Жалобы/Предложения. `, 
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
			"color": "default"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Донат"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Казино 5к"
		},
			"color": "positive"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	

cmd.on(/^(?:Полезное)$/i, async (message, bot) => {
    return message.send(`
⠀ 👾 Бот - Информация о проекте.
⠀⠀📊 Курс
  ➖ Укороти/cc - укоротить ссылку
  💬 написать [id] [сообщение]
`)
});  

cmd.on(/^(?:Развлечения)$/i, async (message, bot) => {
    return message.send(`
😐 Кто
💋 Бутылочка
🤔 Когда [Текст]
⠀ ↪ Переверни [фраза]
🔮 Шар [фраза]
📊 Инфа [фраза]
🔤 Выбери [фраза] или [фраза2]
🌚 Анекдот - смешная шутка
📣 Крикнуть [фраза]
👐 Обнять [ид]
👊 Ударить [ид]
😘 Поцеловать [ид]
📹 Видео [фраза]
📺 Гиф [фраза]
`)
});  

cmd.on(/^(?:Прочее)$/i, async (message, bot) => {
    return message.send(`
👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться

🔨 Шахта:
   💎 Копать рубины
`)
});  

cmd.on(/^(?:Разное)$/i, async (message, bot) => {
    return message.send(`
   ✅Verify - список подтвержденных.
 💰 Банк [сумма/снять сумма]
⠀⠀👑 Рейтинг - ваш рейтинг
  🔶 Передать [ид] [сумма]
⠀⠀ 🔰 Магазин
⠀⠀❓ Помощь [команда] - описание команды
  ➖ Продать [предмет]
⠀⠀🔋 Финфо - биткоин ферма
⠀⠀🏆 Топ - Топ игроков
⠀⠀💎 Бонус - ежедневный бонус
⠀⠀⌚ Дата [id] - дата регистрации игрока
⠀⠀👫 Реферал - деньги за друзей
⠀⠀💵 Донат - купить игровую валюту
`)
});  

cmd.on(/^(?:Игры|game|games)$/i, async (message, args, bot) => {
	return message.send(`
🚀Список игр:
🚪Поход 
📟 Сейф [Случайные 2 цифры]
🎪 Тир [1-3] [Ставка]
💀 Ловушка [Ставка]
💶 Монетка [Ставка] [Орел|решка]
🔰 Азино - 2 казино
🔫 Рулетка - русская рулетка
🔫 Стрела [ид] [сумма]
💠 » Фортуна - рулетка
 🎲 » Кубик [1-6]
 🎰 » Казино [сумма]
📈 » Трейд [вверх/вниз] [сумма]
🔲 Кости [Ставка]
`)
});

cmd.on(/^(?:оружие)\s?([0-9]+)?/i, async (message) => {
		let i = Number(message.args[1])
		if(i < 0 || i > 17) return message.send(`📛 Номер должен быть > 0 и < 17`);
		if(i){
			if(message.user.balance < guns[i].price) return message.send(`📛 Это оружие стоит ${guns[i].price} коинов а у вас ${utils.sp(message.user.balance)} коинов!`);
			message.user.balance -= Number(guns[i].price);
			message.user.gun_name = guns[i].name;
			message.user.uron = guns[i].count;
            return message.send(`
			⚔ Вы купили ${guns[i].name}
			🗡 Мощность оружия: ${guns[i].count}%
			- - - - -
			🔹 Ваше оружие было заменено.
			`);
		}else{
			let text = '';
			for(i in guns){
				text += `⚔ ${i}. ${guns[i].name} | ${guns[i].price} коинов | ${guns[i].count}%\n`;
			}
			text += `❤ Название | Цена | Урон\n🔸 Для покупки введите: "Оружие ID"`;
			return message.send(text);
		}
	});


/*[id500580851|Давид Волков], команды: 
🌐 Важное: 
  📛 Правила - Правила бота [Обязательно к прочтению!] 
  ✳ Донат
  

📋 Профиль - Ваш профиль. 
💰 Баланс - Ваш баланс. 
📝 Nick [name] - Сменить Ник.

  🌀 Разное [➕] 
  🎮 Игры [➕]
  🗺 Развлечения [➕]
  📝 Прочее [➕] 
  📦 Кейсы [➕]
  🎟 Бизнесы [➕]
  🔱 Ранг [➕]

📢 "Промокод [код]" - Активация промокода.

🆘 Репорт [текст] - Связь с Администраторами.


*/

cmd.on(/^(?:mute)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: mute [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете выдать себе мут`)
         if(message.user.right < 3) return message.send(`🔸 » Вы не Gold`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
       if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать мут этому игроку!`);

		users[message.args[1]].messages = true;  
      var is = [message.user.uid, message.text] 
		adm_log(is)

		let text = `✅ » ${message.user.tag} Выдал вам мут аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
     return message.send(`✅ » Вы выдали мут игроку [${users[message.args[1]].tag}].`);
	}); 
	
	cmd.on(/^(?:unmute)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unmute [ID]`); 
	 
	 users[message.args[1]].messages = false;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вам сняли мут [||] Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы сняли мут с игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })]`);
	 
});

/*

➖➖➖➖➖➖➖➖
🔸 Игрок [id392931260|Тёма Дворянов] [ID: 245], прислал вам сообщение!

📨 :ггвп пожалуйста
➖➖➖➖➖➖➖➖
if(users[message.args[1]].right > users.right) return message.send(`🔸 ➾ Нельзя выдать этому игроку выговор`);
[id250925079|Đýbàĺá], вот мои команды:
❓ Помощь [команда] - описание команды

ᅠᅠᅠᅠᅠ🎉 Развлекательные:

🔮 Шар [фраза]
📊 Инфа [фраза]
🤔 Когда [фраза]
😝 Кто [фраза]
⚖ Выбери [фраза] или [фраза2]
📠 Реши [пример]
↪ Переверни [фраза]
📣 Крикнуть [фраза]
 👐 Обнять [фраза]
🔑 Вики [фраза]
🌆 Погода [город]
⚠ Объявление  
🖤 Поэма 
✨ Стих 
💬 История 
🤡 Анекдот
📹 Гиф

ᅠᅠᅠᅠᅠ🚀 Игры:

🎲 Кубик [1-6]
🎰 Казино [сумма]
📈 Акция [вверх/вниз] [сумма]
🥛 Стаканчик [1-3] [сумма]
🔦 Сейф [случайные 2 цифры]
💵Мегасейф [100-999; Доступен только для VIP!] 

ᅠᅠᅠᅠᅠ🔥 Деятельность:

ᅠ👔 Работа:
🔨 Работать
❌ Уволиться

ᅠ💼 Бизнес:
📈 Бизнес - статистика
💵 Бизнес снять - снять деньги со счёта

ᅠᅠᅠᅠᅠ💡 Другое:

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
📊 Курс
💎 Бонус - ежедневный бонус
💣 ВипБонус - каждые 10 минут для VIP'a!
👪 Брак [id] - сделать предложение
💍⠀Браки - список предложений
💔 Развод
⌚ Дата [id] - дата регистрации игрока
👫 Реферал - деньги за друзей
💵 Донат - купить игровую валюту
👾 Бот - информация о боте
💀 Kick -  пользователя

🆘 Репорт [фраза] - ошибки или пожелания*/

cmd.on(/^(?:Донат|Товары)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей) 
 
💠 Привилегии/Аккаунты [➕] 
🌐 Специальные [➕] 
💰 Валюта [➕] 
 💳Рубли[➕]
 
🔹Что бы приобрести рубли, добавьте в друзья [id500580851|Давида] с пометкой "rub"`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});}
					if(message.user.keyboard == false) {
					await message.send(`🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей) 
 
💠 Привилегии/Аккаунты [➕] 
🌐 Специальные [➕] 
💰 Валюта [➕] 
 💳Рубли[➕]
 
🔹Что бы приобрести товар, перейдите на наш сайт https://xzerobot.ru и выберите его`);}
});	


cmd.on(/^(?:Азино|Азино777)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

    message.user.exp += 4;
	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0.5, 0.50, 0.75, 0.75, 0.25, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,3,2,3,2,3,3,4,3,2,3,3,0,0,0,1]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return message.send(`[🎰] >> Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}]
		[${['😐','🤐', '😝', '😰', '🤧'].random()}] >> ${multiply === 1 ? `Ваши деньги остаются при вас` : `${multiply < 1 ? `Вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `Вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}
		[❤] >> На этот раз, мы умножили вашу сумму на -> x${multiply}
		
		[💰] || Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.on(/^(?:Аккаунты|Привилегии)$/i, async (message, bot) => {
 let text = ``
let text1 = ``   
     if(message.user.rub == 0) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, перейдите на наш сайт https://xzerobot.ru и купите нужную сумму рублей

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 1) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, перейдите на наш сайт https://xzerobot.ru и купите нужную сумму рублей

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 2) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, перейдите на наш сайт https://xzerobot.ru и купите нужную сумму рублей

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 3) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, перейдите на наш сайт https://xzerobot.ru и купите нужную сумму рублей

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 4) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, перейдите на наш сайт https://xzerobot.ru и купите нужную сумму рублей

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 50) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

❤ || Привилегия: Bronze 
🤑 | Стоимость: 50 RUB 

[💬] Команды: 
1) get [id] проверить игрока
2) givemycoins [1-1.500.000] - выдать себе валюту

✨ || Id товара - 1

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 100) text += `

❤ || Привилегия: Silver 
🤑 | Стоимость: 100 RUB 

[💬] Команды: 
1) givemycoins [COUNT] - выдать себе валюту.
2) warn [ID] - выдать предупреждение.
3) unwarn [ID] - снять все предупреждения.
4) jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
5) unjail [ID] - Выпустить игрока из тюрмы.
6) поиск [ссылка] - Вычеслить игрока по ссылке.

✨ || Id товара - 2

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 200) text += `

❤ || Привилегия: Gold 
🤑 | Стоимость: 200 RUB 

[💬] Команды: 
1) поиск [ссылка] - Вычеслить игрока по ссылке.
2) mute [ID] [ПРИЧИНА] - выдать мут игроку
2) unmute [id] - снять мут с игрока
3) ban [ID] - заблокировать навсегда.
4) Кикнуть [Ссылка] - Кикнуть игрока.
3) unban [ID] - разблокировать игрока.
3) warn [ID] - выдать предупреждение.
4) unwarn [ID] - снять все предупреждения.
5) jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
6) unjail [ID] - Выпустить игрока из тюрмы.
7) givemycoins [COUNT] - выдать себе валюту.

✨ || Id товара - 3

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 300) text += `

❤ || Привилегия: Diamond 
🤑 | Стоимость: 300 RUB 

[💬] Команды: 
1) поиск [ссылка] - Вычеслить игрока по ссылке.
2) mute [ID] [ПРИЧИНА] - выдать мут(send) игроку
3) blockpay [id] [Время] [Причина] - Выдать блокировку передачи денег.
4) unblock [id] - Разблокировать передачу денег.
5) unmute [id] - снять мут с игрока
6) vig [ID] [Причина] - Выдать админ-выговор.
7) unvig [ID] - Забрать админ-выговр.
8) givemycoins [COUNT] - Выдать себе коины.
9) givecoins [ID] [COUNT] - Выдать коины.
10) removecoins [ID] - аннулировать рубли игрока.
11) get [ID] - проверить игрока.
12) jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
13) unjail [ID] - Выпустить игрока из тюрмы.
14) ban [ID] - заблокировать навсегда.
15) unban [ID] - разблокировать игрока.
16) warn [ID] - выдать предупреждение.
17) unwarn [ID] - снять все предупреждения.
18) ответ [ID] [TEXT] - ответить на репорт.

✨ || Id товара - 4

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 1) text1 += `

😏 >> Чтобы приобрести товары, напишите: Аккаунт [id товара]`;

     return message.send(`[🎉] | [id${message.user.id}|${message.user.tag}], хочешь купить донат? Ты можешь его купить недорого!
		💸 >> На вашем балансе: ${message.user.rub} rub
		👾 >> Что Вы можете купить за ваши рубли:

${text}
\n\n${text1}
🔹Что бы поплнить баланс для покупки привилегии перейдите на наш сайт || https://xzerobot.ru
	`);
});

cmd.on(/^(?:Рубли|rubs)$/i, async (message, bot) => {
	return message.send(`
  [💰] Рубли: 
 1&#8419; 50➖45руб
 2&#8419; 100руб➖90руб
 3&#8419; 200руб➖190руб
    4&#8419; 300руб➖290руб

🔹Что бы купить рубли перейдите на наш сайт || https://xzerobot.ru`)
});

/*cmd.on(/^(?:админ|панель)$/i, async (message, bot) => {

	    if (message.user.right < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (message.user.right == 1) {
	        return message.send(`
					☑ » Bronze-Панель « ☑ 
✅ » аправила - к прочтению
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
					☑ » Silver-Панель « ☑
✅ » аправила - к прочтению
✅ » givemycoins [COUNT] - выдать себе валюту.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
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
					☑ » Gold-Панель « ☑
✅ » аправила - к прочтению
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » ban [ID] - заблокировать навсегда.
✅ » Кикнуть [Ссылка] - Кикнуть игрока.
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
					☑ » Diamond-Панель « ☑
✅ » аправила - к прочтению
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » blockpay [id] [Время] [Причина] - Выдать блокировку передачи денег.
✅ » unblock [id] - Разблокировать передачу денег.
✅ » unmute [id] - снять мут с игрока
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » givemycoins [COUNT] - Выдать себе коины.
✅ » givecoins [ID] [COUNT] - Выдать коины.
✅ » removecoins [ID] - аннулировать рубли игрока.
✅ » get [ID] - проверить игрока.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » ban [ID] - заблокировать навсегда.
✅ » unban [ID] - разблокировать игрока.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » ответ [ID] [TEXT] - ответить на репорт.
`);
	}
       if (message.user.right == 5) {
	        return message.send(`
					☑ » System-Панель « ☑
✅ » аправила - к прочтению
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » get [ID] - проверить игрока.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » blockrep [ID] [1-0] - Заблокировать ответ на репорт.
✅ » blockgive [ID] [-10] - Заблокировать выдачу денкг.
✅ » blockpay [ID] [Время] [Приина] - Заблокировать переводы игроку.
✅ » unblockpay [ID] - Разблокировать переводы игроку.
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » oon [ID] - снять ограничение на ставки игрока.
✅ » oof [ID] - включить ограничение на ставки игрока.
✅ » ver [ID] - Выдать Подтвержденный Аккаунт игроку.
✅ » unver [ID] - Забрать Подтвержденный аккаунт у игрока.
✅ » jail [ID] [TIME] [ПРИЧИНА] - посадить игрока в тюрму.
✅ » unjail [ID] - Выпустить игрока из тюрмы.
✅ » ban [ID] - заблокировать навсегда.
✅ » unban [ID] - разблокировать игрока.
✅ » warn [ID] - выдать предупреждение.
✅ » unwarn [ID] - снять все предупреждения.
✅ » ответ [ID] [TEXT] - ответить на репорт.
✅ » givecoins [ID] [COUNT] - Выдать коины.
✅ » removecoins [ID] - аннулировать рубли игрока.
✅ » setnick [ID] [ИМЯ] - Выдать ник.
`);  
      }
	if (message.user.right == 6) {
	        return message.send(`
					☑ » CREATOR-Панель « ☑
✅ » раздача - начать раздачу.
✅ » поиск [ссылка] - Вычеслить игрока по ссылке.
✅ » get [ID] - проверить игрока.
✅ » mute [ID] [ПРИЧИНА] - выдать мут игроку
✅ » unmute [id] - снять мут с игрока
✅ » blockrep [ID] [1-0] - Заблокировать ответ на репорт.
✅ » blockgive [ID] [-10] - Заблокировать выдачу денкг.
✅ » blockpay [ID] [Время] [Приина] - Заблокировать переводы игроку.
✅ » unblockpay [ID] - Разблокировать переводы игроку.
✅ » vig [ID] [Причина] - Выдать админ-выговор.
✅ » unvig [ID] - Забрать админ-выговр.
✅ » oon [ID] - снять ограничение на ставки игрока.
✅ » oof [ID] - включить ограничение на ставки игрока.
✅ » ver [ID] - Выдать Подтвержденный Аккаунт игроку.
✅ » unver [ID] - Забрать Подтвержденный аккаунт у игрока.
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
});*/

cmd.on(/^(?:Аккаунт 1)$/i, async (message, bot) => {
	if(message.user.right == 1) return bot(`[❌] вы уже имеете данную привилегию...`);
	if(message.user.right == 2) return bot(`[❌] вы уже имеете более высокую привилегию...`);
	if(message.user.right == 3) return bot(`[❌] вы уже имеете более высокую привилегию...`);
	if(message.user.right == 4) return bot(`[❌] Bы уже имеете более высокую привилегию...`);
    if(message.user.rub < 50) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 50,
message.user.right = 1;
return message.send(`👍🏻 || Вы успешно купили привилегию: Bronze`);
}
});

cmd.on(/^(?:Аккаунт 2)$/i, async (message, bot) => {
	if(message.user.right == 2) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 100) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 100,
message.user.right = 2;
return message.send(`👍🏻 || Вы успешно купили привилегию: Silver`);
}
});

cmd.on(/^(?:Аккаунт 3)$/i, async (message, bot) => {
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 200) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 200,
message.user.right = 3;
return message.send(`👍🏻 || Вы успешно купили привилегию: Gold`);
}
});


cmd.on(/^(?:Валюта|Деньги)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`💰Валюта:  
 1⃣10ккк$➖20руб
 2⃣50ккк$➖60руб
 3⃣100кккк$➖120руб
   
🔹Что бы купить игровую валюту перейдите на наш сайт || https://xzerobot.ru`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});}
					if(message.user.keyboard == false) {
					await message.send(`💰Валюта:  
 1&#8419;10ккккк$➖20руб
 2&#8419;50кккккк$➖60руб
 3&#8419;100кккккк$➖120руб
   
🔹Что бы купить игровую валюту перейдите на наш сайт || https://xzerobot.ru`);}
});	

cmd.on(/^(?:Специальные|Специальное)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`🌟Специальное:  
 1&#8419; Снять ограничение в играх➖100руб
 2&#8419; Разблокирока передачи ➖50руб
 3&#8419; Подтвержденный аккаунт $➖150руб
   
🔹Что бы купить специальный товар перейдите на наш сайт || https://xzerobot.ru`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});}
					if(message.user.keyboard == false) {
					await message.send(`🌟Специальное:  
 1&#8419; Снять ограничение в играх➖100руб
 2&#8419; Разблокирока передачи ➖50руб
 3&#8419; Подтвержденный аккаунт ➖150руб
   
🔹Что бы купить специальный товар перейдите на наш сайт || https://xzerobot.ru
`);}
});	



/////
/*cmd.on(/^(?:Клан создать|Создать клан|Ксоздать)\s?([^]+)?$/i, async (message, bot) => { 
	let id = message.user.uid;
	if(message.user.rubins < 1000) return message.send(`📘 ➾ Создание клана стоит 1000 рубинов`);
	if(!message.args[1]) return message.send(`📘 ➾ Напишите название для фракции.`);
	if(users[id].clan != false) return message.send(`📘 ➾ Вы уже находитесь во вракции`);
	if(clans[message.args[1]]) return message.send(`📘 ➾ Фракция с таким названием уже существует.`);
	clans[message.args[1]] = {
		users: {},
		balance: 0,
		bank: 0,
		people: 1, 
		counts: 0,
		owner: message.user.id
	}
	clans[message.args[1]].users[id] = {
		count: 0
	}
	message.user.clan = message.args[1];
	return message.send(`
		📘 ➾ Вы создали фракцию ${message.args[1]}
		📘 ➾ Информация: "Клан"
		`);
}); 

cmd.on(/^(?:кланы)$/i, async (message, bot) => { 
	let text = '📘 ➾ Список фракций:\n\n'
	for(i in clans){
 		text += `💼 ➾ Название: ${i} | Владелец: @id${clans[i].owner}\n`
	}
	return message.send(`
	${text}
	`);
});

cmd.on(/^(?:войти)\s?([^]+)?/i, async (message, bot) => { 
	let id = message.user.uid;
	if(clans[message.args[1]].owner == message.user) return message.send(`📘 ➾ Вы итак создатель фракции!`); 
	if(!message.args[1]) return message.send(`📘 ➾ Напишите точное название клана. (Учитывая регистр/знаки/символы/смайлы)`);
	if(users[id].clan != false) return message.send(`📘 ➾ Вы уже находитесь во вракции`);
	if(!clans[message.args[1]]) return message.send(`📘 ➾ Клан с таким названием не существует.`);
	if(clans[message.args[1]].people >= 40) return message.send(`📘 ➾ Максимальное кол-во участников в клане 40.`)
	clans[message.args[1]].people += 1;
	clans[message.args[1]].users[id] = {
		count: 0
	}
	message.user.clan = message.args[1];
	return message.send(`
		📘 ➾ Вы вступили в клан: ${message.args[1]}
		📘 ➾ Информация: "Клан"
		`);
}); 

cmd.on(/^(?:выйти)$/i, async (message, bot) => { 
	let id = message.user.uid;
	if(users[id].clan == false) return message.send(`📘 ➾ Вы не находитесь во вракции`);      
	let name = users[id].clan;
	if(clans[name].owner == message.user) return message.send(`📘 ➾ Создатель фракции не может её покинуть!`); 

	clans[name].people -= 1;
	delete clans[name].users[id];

	message.user.clan = false;
	return message.send(`
		📘 ➾ Вы покинули клан ${name}
		`);
});

cmd.on(/^(?:клан снять)$/i, async (message, bot) => { 
	let id = message.user.uid;
	if(users[id].clan == false) return message.send(`📘 ➾ Вы не находитесь во вракции`);      
	let name = message.user.clan;
	if(clans[name].owner != message.user.id) return message.send(`📘 ➾ Команда доступна создателю фракции!`); 
	let sum = clans[name].balance;
	clans[name].balance = 0;
	message.user.balance += Number(sum);
	return message.send(`
		💴 ➾ Вы сняли с баланса фракции ${utils.sp(sum)}$
		`);
});

cmd.on(/^(?:Клан воевать)$/i, async (message, bot) => { 
	let id = message.user.uid
	if(users[id].clan == false) return message.send(`📘 ➾ Вы не находитесь в клане`);  
	if(message.user.timers.clans == true) return message.send(`📘 ➾ Воевать можно раз в 10 минут)`);     
	let name = users[id].clan; 

	clans[name].bank += 100000;

      users[id].timers.clans = true; 
		setTimeout(() => {
			users[id].timers.clans = false;
	}, 360000);

	 
	return message.send(`
		📘 ➾ Вы отваевали 10 минут на войне.
		💰 ➾ +100.000$ в копилку клана.
		`);
});

cmd.on(/^(?:khelp|клан помощь)$/i, async (message, args) => {
return message.send(`
		💼 ➾ Информация о кланах:

		🔸 ➾ Вступить в клан: 'Войти <название фракции>'
		🔸 ➾ Покинуть клан: 'Выйти'
		🔸 ➾ клан снять - снять все деньги(для создателя)

		🔸 ➾ Каждые 10 минут соклановцы должны писать команду 'Клан воевать'.
		🔸 ➾ За каждое написание в копилку клана идет 100.000$.
	`);
	});

cmd.on(/^(?:клан)$/i, async (message, bot) => { 
	let name = message.user.clan;
	let id = message.user.uid;
if(users[id].clan == false) return message.send(`🔸 ➾ У вас нету клана`)
	
		 return message.send(`
		📘 ➾ Название клана ${message.user.clan}
		📑 ➾ Соклановцев: ${clans[name].people}
		💴 ➾ В копилке: ${clans[name].bank}$
		💰 ➾ На счету: ${clans[name].balance}$

		👑 ➾ Создатель: @id${clans[name].owner}

		`);
}); */

cmd.on(/^(?:Клан создать)\s(.*)$/i, async (message, bot) => {
    if(!message.args[1]) return bot(`введите название для клана!`); 
    if(message.user.right <= 1) {
    let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(👨‍|🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|👷|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍💻️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️|👨‍🚒️|👩‍✈️|👨‍✈️|👩‍🚀️|👨‍🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.send(`[🆘] » Ой... Похоже, что [id500580851|Создатель] заблокировал запрещенные слова/символы/смайлики.\n\n[😉] » Чтобы убрать блокировку, Вы можете приобрести донат С Vip'а у || [id500580851|Администратора]`);
}
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return message.send(`[🆘] »  Отказ! |-| Подозрительная сслыка.`);
}
	}else{ 
 	let user = message.user;
 	let name = message.args[1];
 	let clanid = message.user.clanid;
 	if(message.user.btc < 20) return message.send(`[⚠] »  Создание клана стоит 20 БитКоинов!!!`);
 	message.user.btc -= 20;

 	if(clans[clanid]) return message.send(`[⚠] »  У вас уже создан клан или Вы уже состоите в другом клане.`);
 	if(!clans[clanid]){
 		let smile = [`🤘`,`💥`,`💣`,`😻`,`😏`,`🤒`,`🤔`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌝`].random();  
 	 	botinfo.length += 1;
 	 	clans[botinfo.length] = {
 		owner: message.user,
 		users: {},
 		number: botinfo.length,
 		name: name,
 		balance: 0,
 		smile: smile,
 		open: true,
 		price: 100,
        exs: 0,
        people: 0
 	}
 	message.user.clanid = botinfo.number;
 	clans[botinfo.number].users[message.user.uid] = {
 		                    names: message.user.tag,
        	        		level: 2
    }
 	 

 	return message.send(`
 		&#4448;${clans[user.clanid].smile} + ${name} + ${clans[user.clanid].smile}&#4448; 

 		[${clans[user.clanid].smile}] >> Я успешно создал клан под названием - ${name}
 		[${clans[user.clanid].smile}] >> Создатель клана - vk.com/id${message.user.id}
 		[${clans[user.clanid].smile}] >> Логотип клана: ${clans[user.clanid].smile}
 		[${clans[user.clanid].smile}] >> Тип клана: открытый.

 		[${clans[user.clanid].smile}] >> Команды клана: Кпомощь
 		`);
}}
});

cmd.on(/^(?:покинуть)$/i, async (message, bot) => {


  
 
	let user = message.user;
	let idclan = message.user.clanid;
	if(!clans[idclan]) return message.send(`Вы не в клане.`); 
    
	if(message.user.clanid == false) return message.send(`Вы не состоите в клане.`); 
	if(clans[idclan].users[message.user.uid].level == 2) return message.send(`Создатель не может выйти из клана.`);
	user.clanid = false;
	delete clans[idclan].users[message.user.uid];
    return message.send(`Вы добровольно покинули клан.`);
});


cmd.on(/^(?:Коткрыть)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`); 
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
    if(clans[clanid].open == true) return message.send(`Клан уже открытый.`)
    clans[clanid].open = true;
	return message.send(`Вы открыли клан. Цена за вход: ${clans[clanid].price}$`);
});


cmd.on(/^(?:Кзакрыть)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
    if(clans[clanid].open == false) return message.send(`Клан уже закрытый.`)
    clans[clanid].open = false;
	return message.send(`Вы закрыли клан. Набор участников могут проводить только зам/создатель :3`);
});


cmd.on(/^(?:Квход)\s([0-9]+)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
    if(!message.args[1]) return message.send(`Укажите сумму для входа в клан.`);
    if(message.args[1] < 100) return message.send(`Сумма для входа в клан не должна быть < 100 Coins`);
    if(message.args[1] > 50000) return message.send(`Сумма для входа в клан не должна быть > 50000 Coins`);
    clans[clanid].price = Number(message.args[1]);
    return message.send(`Вы установили цену за вход в размере ${Number(message.args[1])} Coins`);
});


cmd.on(/^(?:Вступить)\s([0-9]+)$/i, async (message, bot) => {



    let user = message.user;
	let idclan = message.args[1]; 
	if(message.users.clanid != false) return message.send(`Вы уже состоите в клане.`);
	if(!message.args[1]) return message.send(`Вы не указали ID клана.`);
	 
	 
	if(!clans[idclan]) return message.send(`Данного клана не существует.`);
	if(clans[idclan].open == false) return message.send(`Данный клан закрыт. В него нельзя войти.`);
	if(clans[idclan].open == true){
		if(message.user.balance < clans[idclan].price) return message.send(`Вход в данный клан стоит: ${spaces(clans[idclan].price)} Coins`);
		message.user.balance -= Number(clans[idclan].price);
		clans[idclan].price += clans[idclan].price;
		message.user.clanid = Number(message.args[1]);
		if(!clans[idclan].users[message.user]){
        	        	clans[idclan].users[message.user.uid] = {
        	        		level: 0
        	        	}
        }
        return message.send(`Вы вошли в клан за ${spaces(clans[idclan].price)} Coins \n\n Команды клана - Кпомощь`, {attachment: 'photo512809754_456239056'});
	}
});


cmd.on(/^(?:Кназвание)\s([^]+)$/i, async (message, bot) => {


 	if(!message.args[1]) return message.send(`⚠ »  Укажите название для клана.`);
 	if(message.user.right <= 1) {
 	    let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
 return message.send(`[🆘] » Ой... Похоже, что [id500580851|Создатель] заблокировал запрещенные слова/символы/смайлики.\n\n[😉] » Чтобы убрать блокировку, Вы можете приобрести донат С Vip'а у || [id500580851|Администратора]`);
}
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return message.send(`[🆘] »  Отказ! |-| Подозрительная сслыка.`);
}
	}else{
		 	let user = message.user;
			let clanid = user.clanid;
			if(!clans[clanid]) return message.send(`У вас нет клана.`);
			if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
		    if(clans[clanid].balance < 10000) return message.send(`На балансе клана нету 10.000 Coins `);
		   	clans[clanid].balance -= 10000;

			if(clans[clanid]){
				if(message.user != clans[clanid].owner) return message.send(`Изменить название клана может только Создатель!`);
				if(message.user == clans[clanid].owner){
					clans[clanid].name = message.args[1];
					return message.send(`Вы успешно изменили название клана за 10.000 Coins!`);
				}
			}
	}  

});


cmd.on(/^(?:Клого)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 1) return message.send(`Вы не создатель/заместитель клана.`);
    if(clans[clanid].balance < 10000) return message.send(`На балансе клана нету 10.000 Coins`);
    clans[clanid].balance -= 10000;

	if(clans[clanid]){
			let smile = [`📺`,`💥`,`💣`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌈`,`🌝`].random(); 
			clans[clanid].smile = smile;
			return message.send(`Вы успешно изменили логотип клана за 10.000 Coins!`);
	}
});



cmd.on(/^(?:Клан)$/i, async (message, bot) => {

let user = message.user;
	let clanid = message.user.clanid;
if(!clans[clanid]) return message.send(`У вас нет клана.`);

let text = ``;
let tipe = ``;
text += `[🏆] | Участники Клана: \n\n`;

text += `[${clans[clanid].smile}] >> [id${clans[clanid].owner.id}|${clans[clanid].owner.tag}] | Создатель.\n\n`;
 	for(let id in clans[clanid].users) {
             let people = clans[clanid].users[id];   
        	 if(clans[clanid].users[id].level == 1) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id]}|${people.prefix}] | Заместитель.\n\n`;
        	 if(clans[clanid].users[id].level == 0) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id]}|${people.prefix}] | Участник.\n`;
        }

 function indexOfByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] == value) {
                return i;
            }
        }
        return null;
    }
    
    var tops = []
    for (let i in clans) {
        tops.push({
            id: i,
            balance: clans[i].balance
        })
    }
    tops.sort(function(a, b) {
        if (b.balance > a.balance) return 1
        if (b.balance < a.balance) return -1
        return 0
    })
   
    var inTop = indexOfByKey(tops, 'id', message.user);
    inTop++; 


if(clans[clanid].open == true) tipe += `Открытый.`
if(clans[clanid].open == false) tipe += `Закрытый.`
if(clans[clanid]){
    let exs = 0;
    let convert = 0;


	return message.send(`
		[${clans[clanid].smile}]: ~ ${clans[clanid].name} ~ :[${clans[clanid].smile}]

 		[${clans[clanid].smile}] »  Создатель: [id${clans[clanid].owner.id}|${clans[clanid].owner.tag}]
 		[${clans[clanid].smile}] »  Номер клана: ${clans[clanid].number}
 		[${clans[clanid].smile}] »  Логотип клана: ${clans[clanid].smile} 
 		[${clans[clanid].smile}] »  Тип клана: ${tipe}
 		[${clans[clanid].smile}] »  Цена за вход: ${clans[clanid].price} Coins
        [💰] »  На балансе клана: ${clans[clanid].balance} Coins

        [🔥] »  Баланс клана: ${clans[clanid].balance}
        [🌍] »  Место в топе: ${inTop}

 		${text}
		`);
	} 
});

cmd.on(/^(?:Кпомощь)$/i, async (message, bot) => {

	let user = message.user;
 	let clanid = message.user.clanid;
 	if(!clans[clanid]) return message.send(`У вас нет клана.`);

if(clans[clanid].users[message.user.uid].level < 1){
	return message.send(`
		${clans[clanid].smile} - Команды клана -  ${clans[clanid].smile}
		${clans[clanid].smile} Клан - Информация о вашем клане.
		${clans[clanid].smile} КПоложить <сумма> - положить Coins в банк клана.
		${clans[clanid].smile} Кбанк - баланс клана.

		${clans[clanid].smile} Покинуть - Выйти из клана(от vip юзера)
		`);
}
if(clans[clanid].users[message.user.uid].level == 1){
	return message.send(`
		${clans[clanid].smile} - Команды клана -  ${clans[clanid].smile}
		${clans[clanid].smile} Клан - Информация о вашем клане. 
		${clans[clanid].smile} ККик ID(user'a) - выгнать из клана.
		${clans[clanid].smile} КЛого - Сменить логотип клана.
		${clans[clanid].smile} КПоложить <сумма> - положить Coins в банк клана.
		${clans[clanid].smile} КБанк - баланс клана.

		${clans[clanid].smile} Покинуть - Выйти из клана (Только от vip пользователей)
		`);
}
if(clans[clanid].users[message.user.uid].level == 2){
	return message.send(`
		${clans[clanid].smile} - Команды клана -   ${clans[clanid].smile}
		${clans[clanid].smile} Клан - Информация о вашем клане. 
		${clans[clanid].smile} ККик (ID Пользователя) - выгнать из клана.
		${clans[clanid].smile} Кмодер (ID Пользователя) - назначить заместителем.
		${clans[clanid].smile} КУдалить (ID Пользователя) - снять заместителя.
		${clans[clanid].smile} КНазвание (name) - изменить название клана.
		${clans[clanid].smile} КЛого - Сменить логотип клана.

		${clans[clanid].smile} КОткрыть - Открыть клан.
		${clans[clanid].smile} КЦена - Установить цену за вход.
		${clans[clanid].smile} КЗакрыть - Закрыть клан.

		${clans[clanid].smile} КПоложить <сумма> - положить Coins в банк клана.
		${clans[clanid].smile} КСнять <сумма> - снять Coins из банка клана.
		${clans[clanid].smile} КБанк - баланс клана.

		${clans[clanid].smile} Clanwar [id клана] [сумма] - Атаковать клан!
		`);
}
});

cmd.on(/^(?:Кбанк)$/i, async (message, bot) => {

	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	return message.send(`Баланс Вашего клана: ${spaces(clans[clanid].balance)} Coins`);

});



cmd.on(/^(?:Кположить)\s(.*)$/i, async (message, bot) => {

	if(!message.args[1]) return message.send(`Укажите сумму вклада.`);
	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(message.args[1] > message.user.balance || message.args[1] <= 0) return message.send(message.args[1] <= 0 ? `Вклад не может быть меньше 0 или равен 0 Coins.` : `Вклад не может превышать Ваш баланс.`);
	message.user.balance -= Number(message.args[1]);
	clans[clanid].balance += Number(message.args[1]);
	return message.send(`Вы успешно положили ${spaces(message.args[1])} Coins в банк клана.`);
});


cmd.on(/^(?:Кснять)\s(.*)$/i, async (message, bot) => {

	if(!message.args[1]) return message.send(`Укажите сумму снятия.`);
	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Снимать деньги может только создатель клана.`);
    
	if(message.args[1] > clans[clanid].balance) return message.send(`Данной суммы нет в банке клана.`);
	if(message.args[1] <= 0) return message.send(`Сумма не должна быть меньше или равно 0 Coins`);
	message.user.balance += Number(message.args[1]);
	clans[clanid].balance -= Number(message.args[1]);
	return message.send(`[${clans[clanid].smile}] »  Вы успешно сняли ${spaces(message.args[1])} Coins с банка клана.`);
});

cmd.on(/^(?:clanwar)\s([0-9]+)\s([^\s	].*)$/i, async (message, bot) => {
		let clanid = message.user.clanid;
		if(!message.args[1]) return bot(`Укажите ID клана, который хотите атаковать.`);
		if(!message.args[2]) return bot(`Укажите ставку.`);
		let id = Number(message.args[1]); 
		let amount = parserInt(message.args[2]);
		if(!Number(amount)) return bot(`укажите корректно ставку.`);
		if(amount < 1000) return bot(`минимальная сумма для атаки 1.000💰`);
		if (clans[clanid].users[message.user.uid].level < 1) return bot(`вы не ~создатель/заместитель~  клана.`);
		if(id == clanid) return bot(`нельзя нападать на свой клан.`);
		if(amount > clans[clanid].balance) return bot(`на счету вашего клана не хватает 💰`);
		if(amount > clans[id].balance) return bot(`на счету клана не хватает 💰`); 
		if (clanid == false) return bot(`у вас нет клана.`);
		if (!clans[clanid]) return bot(`у вас нет клана.`);
		if (!clans[id]) return bot(`такого клана нет.`);

if(message.user.right <= 1) {
	if(message.user.timers.clanwar) return bot(`в ближайшие 10 минут, Вы сможете ещё раз атаковать клан!`);

	setTimeout(() => {
		message.user.timers.clanwar = false;
	}, 600000);

	message.user.timers.clanwar = true;
}

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += amount;
			clans[clanid].balance -= amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан ${clans[clanid].name} напал на ${clans[id].name}\n[🏆] >> Победу одержал клан: ${clans[id].name}\n💰 >> Выигрыш: ${spaces(amount)} 💰`);
		}else{
			clans[id].balance -= amount;
			clans[clanid].balance += amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан ${clans[clanid].name} напал на ${clans[id].name}\n[🏆] >> Победу одержал клан: ${clans[clanid].name}\n💰 >> Выигрыш: ${spaces(amount)} 💰`);
		}
	});	

cmd.on(/^(?:Кмодер)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);

 	let clanid = user.clanid;
 	if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);
 	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель/заместитель клана.`);
        	        
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {

        	        if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);
              	    if(user.clanid != message.user.clanid) return message.send(`Юзер уже состоит в другом клане.`);
        	       

        	        clans[clanid].users[user.uid].level = 1;
        	        return message.send(`vk.com/id${user.id} был назначен заместителем в клане.`); 

        })
        return;
    }else{

        if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);
        if(user.clanid != message.user.clanid) return message.send(`Юзер уже состоит в другом клане.`);
          

        	clans[clanid].users[user.uid].level = 1;
        	return message.send(`vk.com/id${user.id} был назначен заместителем в клане.`); 
    }
});


cmd.on(/^(?:Кудалить)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);


 	let clanid = message.user.clanid;
 	if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);
 	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель/заместитель клана!`);
        	        
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {

              	    if(user.clanid != acc.users[message.user.uid].clanid) return message.send(`Юзер уже состоит в другом клане.`);
         			if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);
        	        
        	        clans[clanid].users[user.uid].level = 0;
        	        return message.send(`vk.com/id${user.id} был понижен до "участника" в клане.`);
        })
        return;
    }else{

        if(acc.users[user.uid].clanid != acc.users[message.user].clanid) return message.send(`Юзер уже состоит в другом клане.`);
         if(!clans[clanid]) return message.send(`этот человек не состоит в клане.`);

        	clans[clanid].users[user.uid].level = 0;
        	return message.send(`vk.com/id${user.id} был понижен до "участника" в клане.`);      
    }
});

/*
let cases = [
	{
		uron: 36,
		name: 'Пистолет "Deagle"'
	},
	{
		uron: 36,
		name: 'Автомат "M4A4"'
	}, 
	{
		uron: 55,
		name: `Дробовик "Sawed-Off"`
	},
	{
		uron: 43,
		name: `Пистолет "Five-SeveN | Испытание огнём"`
	},
	{
		uron: 37,
		name: `Автомат "AK-47"`
	},
	{
		uron: 35,
		name: `Автомат "AUG"`
	},
	{
		uron: 34,
		name: `Автомат "Galil AR"`
	},
	{
		uron: 37,
		name: `Пистолет-Пулемет "ПП-19 Бизон"`
	},
	{
		uron: 44,
		name: `Пистолет-Пулемет "MP9"`
	},
	{
		uron: 45,
		name: `Пистолет-Пулемет "UMP-45"`
	}, 
	{
		uron: 55,
		name: `Пистолеты "Dual Berettas | Удар кобры"`
	},
	{
		uron: 49,
		name: `Дробовик "Nova | Экзо"`
	},
	{
		uron: 43,
		name: `Пистолет "Desert Eagle | Директива"`
	},
	{
		uron: 45,
		name: `Револьвер "R8 | Кровавая паутина"`
	},
	{
		uron: 75,
		name: `Сувенирный "AWP | Dragon Lore"`
	}, 
    {
		uron: 56,
		name: `Star Track "М4А1 | Вой"`
	}, 
]*/

cmd.on(/^(?:оружейный кейс)$/i, async (message, bot) => { 
	let a = cases.random(); 

	if(message.user.balance < 10000000) return message.send(`💸 ➾ Оружейный кейс стоит 10.000.00$`);
	if(message.user.timers.gun_case == true) return message.send(`🔫 ➾ Крутить оружейный кейс можно раз в 10 минут.`);
	message.user.balance -= 10000000;
	message.user.timers.gun_case = true; 
		setTimeout(() => {
			message.user.timers.gun_case = false;
	}, 360000);

	message.user.uron = a.uron;
	message.user.gun_name = a.name;
	return message.send(`
		💸 ➾ Вы открыли оружейный кейс за 10000000$
		💸 ➾ Вам выпало оружие:
		🔫 ➾ ${a.name} с уроном ${a.uron} единиц
		
		⚠ ➾ При следующем открытии кейса, данное оружие будет заменено выпавшим.
	`);
});

cmd.on(/^(?:питомец)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return message.send(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	return bot(`\n🐧 Ваш питомец: ${pets[message.user.pets.pet - 1].name}\n🌟 Уровень питомца: ${message.user.pets.level}\n🌟 Опыт питомца: [${message.user.pets.exp}|24]`);
});

cmd.on(/^(?:test|ко|тест)$/i, async (message, bot) => {
if(message.user.keyboard == false) {
					await message.send(`♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
}
if(message.user.keyboard == true) {
	await message.send(`♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	

cmd.on(/^(?:правила|rules)$/i, async (message, bot) => {
 let text= `${pr.prav}`
 return message.send(`
 ${text}
 `);
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
		Бизнесы [номер] - купить бизнес`);
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
		return message.send(`Пустая команда "Рейтинг" (без параметров) выводит ваше кол-во рейтинга (также можно узнать в профиле). При указании параметра (любое число) вы купите данное кол-во единиц рейтинга (👑1 = 200.000$). Рейтинг влияет на ваше положение в топе.`);
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

cmd.on(/^(?:Ранги|Rangs)$/i, async (message, bot) => {
return message.send(`
👋🏻 Привет. хочешь получить ранг, но не знаешь как?
😉 Это очень просто.
☝ Ранг игрока зависит от сообщений.
➖➖➖➖➖➖➖
🔹Что бы получить первый ранг "Начинающий", вам нужно играть в бота и набрать 100 сообщений (В графе "Профиль", показывается ваше кол-во сообщений.)
➖➖➖➖➖➖➖
🔹Что бы получить ранг "Общительный" нужно играть в бота до 500 сообщений.
➖➖➖➖➖➖➖
🔹Что бы получить ранг "Любитель" нужно играть в бота до 1000 сообщений.
➖➖➖➖➖➖➖
🔹Что бы получить ранг "Старший" нужно играть в бота до 2000 сообщений.
➖➖➖➖➖➖➖
🔹Что бы получить ранг "ПРОФЕССИОНАЛ" нужно играть в бота до 3000 сообщений.
➖➖➖➖➖➖➖
🔹Что бы получить ранг "Генералиссимус" нужно играть в бота до 8000 сообщений.
➖➖➖➖➖➖➖`)
});


/*cmd.on(/^(?:профиль|проф|прф|аккаунт)$/i, async (message, bot) => {
	var ver = (message.user.verify == 0) ? "" : "✅Аккаунт Подтверждён✅"
   return message.send(`
🔎 ID: ${message.user.uid}\n
🆔 Цифровой id: ${message.user.id}\n
📗 Префикс: ${prefix[message.user.prefix - 1].name}\n
👑 Рейтинг: ${utils.sp(message.user.rating)}\n
👔 Работа: ${works[message.user.work - 1].name}\n
🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n
🔺Status: [${message.user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "<|System|>").replace(/6/gi, "CREATOR")}]\n
    \n\n💱 Валюта:\n
    💴 ${utils.sp(message.user.rub)}₽ (Рубли)\n
    💰 Коины: ${utils.sp(message.user.balance)}$\n
	💳 В банке: ${utils.sp(message.user.bank)}$\n
	🌐 Биткоинов: ${utils.sp(message.user.btc)}\n
    💎 Рубины: ${utils.sp(message.user.rubins)}\n
    
    \n${ver}\n
      \n\n🔫 ➾ Оружие:
		`+(message.user.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${message.user.gun_name}\n`)+  
		` 
    
     \n⚠ Варнов: ${message.user.warn}
    \n⚠ Причинa: ${message.user.warn_p}
	
    if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business)
	{
      \n\n🔑 Имущество:\n
		if(message.user.transport.car)⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n
		if(message.user.transport.yacht) ⛵ Яхта: ${yachts[message.user.transport.yacht - 1].name}\n
		if(message.user.transport.airplane) ✈ Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n
		if(message.user.transport.helicopter) 🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n
		
		if(message.user.realty.home) 🏠 Дом: ${homes[message.user.realty.home - 1].name}\n
		if(message.user.realty.apartment) 🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n

		if(message.user.misc.phone)📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n
		if(message.user.misc.farm)🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n
	}
       \n\n 💬 Сообщений в боте: ◾${message.user.msg}◾
       📗 Дата регистрации: ${message.user.regDate}     
`)
});*/

cmd.on(/^(?:профиль|проф|прф|аккаунт)$/i, async (message, bot) => { 
let text = `` 
var ver = (message.user.verify == 0) ? "" : "✅Аккаунт Подтверждён✅" 
var gun = (message.user.gun_name === false) ? "🔫 ➾ Отсутствует" : `🔫 ➾ Название: ${message.user.gun_name}`; 
 
text += `🔎 ID: ${message.user.uid}\n`; 
text += `🆔 Цифровой id: ${message.user.id}\n`; 
if(message.user.prefix) text += `📗 Префикс: ${prefix[message.user.prefix - 1].name}\n`;
text += `👑 Рейтинг: ${utils.sp(message.user.rating)} || [${utils.rn(message.user.rating)}]\n`; 
if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`; 
text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`; 
text += `🌎 Ранг: [${message.user.rang}] || [${message.user.msg}]\n`; 
text += `🔺Status: [${message.user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "<|System|>").replace(/6/gi, "CREATOR")}]\n`; 
text += `\n\n💱 Валюта:\n`; 
text += ` 💴 ${utils.sp(message.user.rub)}₽ (Рубли)\n`; 
text += `💰 Коины: ${utils.sp(message.user.balance)}$ [${utils.rn(message.user.balance)}]\n`; 
if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`; 
if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`; 
text += `💎 Рубины: ${utils.sp(message.user.rubins)}\n`; 
 if(message.user.marriage.partner) text += `\n\n👬 Партнер: ${users[message.user.marriage.partner].tag}\n`;
 text += `🔞Пол: [${message.user.sex.toString().replace(/0/gi, "Мужской").replace(/1/gi, "Женский")}]\n`; 
 
text += `\n⚠ Варнов: ${message.user.warn}`; 
text += `\n⚠ Причинa: ${message.user.warn_p}`; 
 
text +=`\n🔫 ➾ Оружие:\n`; 
text += `${gun}\n`; 
text += `💥 Урон: ${message.user.uron}`; 
 
if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter || 
message.user.realty.home || message.user.realty.apartment || 
message.user.misc.phone || message.user.misc.farm || message.user.business) 
{ 
text += `\n\n🔑 Имущество:\n`; 
 
if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`; 
if(message.user.transport.yacht) text += `⠀⛵ Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`; 
if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`; 
if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`; 
 
if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`; 
if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`; 
 
if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`; 
if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`; 
if(message.user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
	} 
text += `\n\n📗 Дата регистрации: ${message.user.regDate}\n`; 
if(message.user.keyboard == false) {
					await message.send(`🔰 Tвой профиль:\n${text}`);
}
if(message.user.keyboard == true) {
	await message.send(`🔰 Tвой профиль:\n${text}`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	
 
 cmd.on(/^(?:Хочу админку)$/i, async (message, bot) => {
 	if(message.senderId !== 500580851) return message.send(`❌ Доступ только у @daviderbaev (Давида)`)
      message.user.right=6;
      return bot(`[👌] Вы успешно получили Админку 6-го уровня`)
     });
 
 cmd.on(/^(?:Пол|Sex|Сменить пол|Пол сменить)\s?([0-9]+)?$/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`🔸 Пример команды "Сменить пол 0 - мужской || 1 - Женский" `);
     let text = '';
        if(Number(message.args[1]) == 0){
			texts = 'Мужской' 
			message.user.sex = 0;
		}
		if(Number(message.args[1]) == 1){
			texts = 'Женский' 
			message.user.sex = 1;
		}
		return message.send(`🔸 >> Вы сменили себе пол на ${texts}`);
	});
 
cmd.on(/^(?:баланс)$/i, async (message, bot) => { 
if(message.user.keyboard == false) {
					await message.send(`@id${message.user.id}(${message.user.tag}), ваш баланс: 
На руках: ${utils.sp(message.user.balance)}$ (${utils.rn(message.user.balance)})\n💎 Рубины: ${utils.sp(message.user.rubins)} (${utils.rn(message.user.rubins)})\n₽ Рубли: ${message.user.rub} (${utils.rn(message.user.rub)})\n💳 В банке: ${utils.sp(message.user.bank)}$ (${utils.rn(message.user.bank)})\n🅱 Биткоинов: ${utils.sp(message.user.btc)}฿ (${utils.rn(message.user.btc)})`);
}
if(message.user.keyboard == true) {
	await message.send(`@id${message.user.id}(${message.user.tag}), ваш баланс: 
На руках: ${utils.sp(message.user.balance)}$ (${utils.rn(message.user.balance)})\n💎 Рубины: ${utils.sp(message.user.rubins)} (${utils.rn(message.user.rubins)})\n₽ Рубли: ${message.user.rub} (${utils.rn(message.user.rub)})\n💳 В банке: ${utils.sp(message.user.bank)}$ (${utils.rn(message.user.bank)})\n🅱 Биткоинов: ${utils.sp(message.user.btc)}฿ (${utils.rn(message.user.btc)})`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	

/*  🌍 Ранг: Новичок
   🔺Status: [Игрок]*/


cmd.on(/^(?:банк)$/i, async (message, bot) => {
	return bot(`
на вашем банковском счёте находится ${utils.sp(message.user.bank)}$
💳 » Взять кредит под 15%: 'Кредит [СУММА]' 
💳 » Погасить кредит: 'Погасить [СУММА]'

⚠ » Важно! Пока ваш долг больше 0 
⚠ » Ежечасно с вашего счета будет списываться 15% от суммы кредита
			
`);
});

cmd.on(/^(?:Время|Time)$/i, async (message, bot) => {
return message.send(`
🕗 Время: ${time()} 
💫 Дата: ${data()}
`)
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

cmd.on(/^(?:Биз помощь|Бизнес помощь|bizhelp)\s?([0-9]+)?$/i, async (message, bot) => {
	return message.send(`📙 Помощь по бизнесам:
	📗 Бизнесы - список бизнесов
	📗 Бизнес [1-2] - Посмотреть статистику бизнесов
	📗 Бизнес улучшить - улучшить бизнес
	📗 Бизнес нанять [1-2] [Количество] 
	📗 Бизнес снять [1 или 2] [количество] - Снять доход
	📗 Бизнес продать - продать бизнес`)
});

cmd.on(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n`;
		}
		return bot(text);
	}
	if(message.user.business.length == 2) return bot(`у вас уже есть 2 бизнеса`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];
	if(sell == null) return;
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	message.user.balance -= sell.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
});

cmd.on(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
	💼 Рабочих: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}$

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
});


cmd.on(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес нанять [1 или 2] [кол-во работников]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(message.user.business[message.args[1]].workers + message.args[2] > businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers) return bot(`в вашем бизнесе не может поместится столько работников`);
	const cost = message.args[2] * 0;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для покупки рабочих`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].workers += message.args[2];

	return bot(`вы наняли ${message.args[2]} рабочих для бизнеса #${message.args[1] + 1}`);
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
	if(message.args[2] <= 0) return bot(`вы не можете снять столько со счёта бизнеса`);
	if(message.args[2] > message.user.business[message.args[1]].moneys) return bot(`у вас нет денег на счёте этого бизнеса`);

	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$`);
});

cmd.on(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
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

		await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$ ${utils.rn(message.args[2])}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$ ${utils.rn(message.args[2])}
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
	  if(message.user.block_nick <= 1) {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов\n\n[😉] » Чтобы убрать блокировку, Вы можете приобрести разблокировку на нашем сайте https://xzerobot.ru`);
}
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

🐼 Питомцы

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $200 тысяч
⠀⠀💼 Бизнесы
⠀⠀🌐 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2 1', 'Биткоин 100', 'Рейтинг 10'])}"`);
});

cmd.on(/^(?:Бот|О боте)$/i, async (message, bot) => {
	const nagruzka = utils.random(100);
  const ping = utils.random(300);
if(message.user.keyboard == true) {
					await message.send(`[📖] » Привет! Я игровой бот - ${config.group_url}! 

👾 » Мой проект: ${config.group_url}
🔧 » Версия бота: ${config.version}
😎 » Мои создатели - ${config.admin} и ${config.admin2}
 ᅠ❤ » Я нагружен на ${nagruzka}%
📡 » Пинг: ${ping}
📗 » Пользователей: ${users.length}`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});}
					if(message.user.keyboard == false) {
					await message.send(`[📖] » Привет! Я игровой бот - ${config.group_url}! 

👾 » Мой проект: ${config.group_url}
🔧 » Версия бота: ${config.version}
😎 » Мои создатели - ${config.admin} и ${config.admin2}
 ᅠ❤ » Я нагружен на ${nagruzka}%
📡 » Пинг: ${ping}
📗 » Пользователей: ${users.length}`);
}
});	

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

	if(/питомца/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pets.pet) return bot(`у вас нет питомца`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);

		message.user.balance += Math.floor(pets[message.user.pets.pet - 1].cost * 0.85);
		message.user.pets.pet = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}$`);
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

		return bot(`вы продали свой бизнес за ${utils.sp(a)} $`);
	}

   if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
	if(/ферм(у|ы)/i.test(message.args[1].toLowerCase()))
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
		let a = (50000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
}

if(/рубин(ы)/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rubins) return bot(`у вас нет рубинов`);
		let a = (900 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rubins -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рубин', 'рубина', 'рубинов'])} за ${utils.sp(Math.floor(a))}`);
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
${message.user.transport.car === 10 ? ' 🔹' : '🔸'} 10. Вездеход (200.000$)
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
${message.user.transport.airplane === 10 ? '??' : '🔸'} 10. Learjet 31 (45.000.000$)
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
${message.user.transport.helicopter === 10 ? '🔹' : ' 🔸'} 10. Bell 429WLG (19.000.000$)
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
${message.user.prefix === 1 ? '🔹' : '🔸'} 2. ➖Ингорщик➖ (150) рубинов
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
${message.user.prefix === 12 ? '🔹' : '🔸'} 12.  🌝Лучик Солнца🌝 (2350) рубинов
${message.user.prefix === 13 ? '🔹' : '🔸'} 13. 🐾Котенок🐾 (2650) рубинов
${message.user.prefix === 14 ? '🔹' : '🔸'} 14. 😇Боженька😇 (5000) рубинов


Для покупки введите "Префиксы [номер]"`);

	const sell = prefix.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.prefix) return bot(`у вас уже есть префикс (${prefix[message.user.prefix - 1].name})`);

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

cmd.on(/^(?:телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '??' : '🔸'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. Мегафон С1 (250.000$)

Для покупки введите "Телефоны [номер]"
Меню телефона командой "Телефон"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$, чтобы открыть меню введите "Телефон"`);
	}
});

	cmd.on(/^(?:Питомцы|pets)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.pets.pet === 1 ? '🔹' : '🔸'} 1. Котик (1.000$)
${message.user.pets.pet === 2 ? '🔹' : '🔸'} 2. Собака (5.000$)
${message.user.pets.pet === 3 ? '🔹' : '🔸'} 3. Лошадь (15.000$)
${message.user.pets.pet === 4 ? '🔹' : '🔸'} 4. Мутант (40.000$)
${message.user.pets.pet === 5 ? '🔹' : '🔸'} 5. Тигр (80.000$)
${message.user.pets.pet === 6 ? '🔹' : '🔸'} 6. Дракон (200.000$)

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
	}
})

cmd.on(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])  return bot(`Майнинг фермы:
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [количество]"
Посмотреть статистику "Финфо"`);

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

cmd.on(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 200000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 200000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 200000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 200000}$`);
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

	if(( message.args[1] * btc ) > message.user.balance) return bot(`недостаточно денег
Курс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

cmd.on(/^(?:топ|top)$/i, async (message, bot) => {
	return message.send(`@id${message.user.id} (${message.user.tag}), команды топа:
	👑 Топ рейтинг
	💰 Топ баланс
	🌟 Топ уровень
	`)
});

cmd.on(/^(?:топ рейтинг)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });
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

	for (let i = 0; i < 5; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑 ${utils.sp(user.rating)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑 ${utils.sp(message.user.rating)}`);
});

cmd.on(/^(?:Топ баланс)$/i, async (message, bot) => {
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 💰 ${utils.sp(user.balance)}
		`;
	}

	return bot(`Топ баланса:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 💰 ${utils.sp(message.user.balance)}`);
});

cmd.on(/^(?:Топ уровень)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ level: x.level, tag: x.tag, id: x.id, mention: x.mention });
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

	for (let i = 0; i < 5; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 🌟 ${utils.sp(user.level)} 
		`;
	}

	return bot(`Топ уровня:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 🌟 ${utils.sp(message.user.level)}`);
});

cmd.on(/^(?:бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`вы сможете получить бонус через 24 часа`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;

	if(prize === 1)
	{
		message.user.balance += 1000000;
		return bot(`вы выиграли 10.000.00$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`вы выиграли 1000฿`);
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
		message.user.bank += 100000;
		return bot(`вы выиграли 100.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 500000;
		return bot(`вы выиграли 500.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 1000000;
		return bot(`вы выиграли 1.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 5000000;
		return bot(`вы выиграли 5.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
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

		return message.send(`➖➖➖➖➖\n⚠ ➾ - - - - [ВНИМАНИЕ] - - - - <<⚠\n👫 ➾ Поздравим молодоженов: \n👫 ➾ -->> ${message.user.tag} и ${users[message.args[1]].tag} <<--\n➖➖➖➖➖`);
	}

	user.marriage.requests.push(message.user.uid);
	return bot(`вы сделали предложение игроку "${user.tag}"`);
});

cmd.on(/^(?:Бпомощь|Брак помощь)$/i, async (message, bot) => {
 if(!message.user.marriage.partner) return message.send(`Вы не состоите в браке`);
   return message.send(` 
	💬 >> Бсмс [ид] [сообщение]
    Скоро добавим еще команды
    `);
});

cmd.on(/^(?:Бнаписать|Бсмс|Bsms)\s([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
 let user = users.find(x => x.uid === Number(message.args[1])); 
if(!message.user.marriage.partner) return message.send(`Вы не состоите в браке`);
 if(users[message.args[1]].marriage.partner) return message.send(`Данный игрок не состоит в браке`);
 let id = message.args[1]; 
vk.api.call('messages.send', { 
   user_id: users[message.args[1]].id, 
   message: `➖➖➖➖➖➖➖➖ 
🔸 Ваш партнер @id${message.user.id}(${message.user.tag}) [ID: ${message.user.uid}] || ${data()} в ${time()}, прислал вам сообщение! 
 
📨 Сообщение: ➡${message.args[2]}⬅ 
➖➖➖➖➖➖➖➖` 
 }); 
return message.send(`💬 Вы успешно отправили сообшение своему партнеру`) 
});

cmd.on(/^(?:браки)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`Вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.on(/^(?:развод)$/i, async (message, bot) => {
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
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

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
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
	🔹 4. Слесарь - зарплата ~30.000$
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

cmd.on(/^(?:Питомца в поход|Отправить питомца в поход)$/i, async (message, bot) => {
	if(!message.user.pets.pet == 1) return bot(`У вас нет питомца чтобы купить напишите команду "Питомцы"`);

	if(message.user.timers.Poxod) return bot(`Питомец устал и сегодня он не сможет пойти в поход он сново станет бодрым через 10 минут`);

	setTimeout(() => {
		message.user.timers.Poxod = false;
	}, 600000);

	message.user.timers.Poxod = true;

	const work = pets.find(x=> x.id === message.user.pets);
	const earn = utils.random(pets.min, pets.max);

	message.user.balance += earn;
	message.user.pets.exp += 1;

	return bot(`Ваш питомец принес вам сокровище с похода в размере ${utils.sp(earn)}$`);
});


cmd.on(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
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
	🔸 Выпало число ${int}`);
});

cmd.on(/^(?:казино)\s?([^\s].*)?$/i, async (message, args, bot) => {
    var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000').replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
       if(!message.args[1]) return message.send(`📛 ➾ укажите ставку`);
        let amount = Number(parserInt(message.args[1]));
        amount = Math.round(amount);   
        if(!Number(amount)) return message.send(`🔸 ➟ Ставка должна быть числом!`);
        if (amount > message.user.balance || amount < 1 ) return message.send(`⚠ ➟ Недостаточно средств для игры `);

        
        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲','😎|😎|😎','🙀|🙀|🙀'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲','😎|😭|🙀','🙀|🌚|😎'].random();

        if(rand(1,100) < 60){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	message.user.balance += Number(win_balance) 
        	message.user.exp += 3;
            return message.send(`🎲 ➟ Вам выпала комбинация: [${win}]\n💎 ➟ Вы выиграли ${utils.sp(win_balance)} (${utils.rn(win_balance)})$!\n🔥 ➟ Множитель: ${mnojitel}x`); 
        }else{
        	message.user.exp += 3;
            message.user.balance -= amount;
        	return message.send(`🎲 ➟ Вам выпала комбинация: [${lose}]\n🌚 ➟ Вы проиграли ${utils.sp(amount)} (${utils.rn(amount)})$!`);
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


cmd.on(/^(?:финфо|инфо ферма|ферма инфо)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	let text = ``
	if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`; 
	text += ` 📟 Количество: ${message.user.misc.farm_count}\n`;
	text += ` 🅱 BTC: ${utils.sp(message.user.farm_btc)} ${utils.rn(message.user.farm_btc)}\n`;
    text += `\n\n📘 Для снятия введите "ферма снять"\n`;
   return message.send(`📗 Информация: \n${text}`)
  });
  
cmd.on(/^(?:ферма снять|ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через 15мин
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});


cmd.on(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 100.000$ (100 тысяч)
	Если друг активирует вашу рефералку, то он получит 500.000$ (500 тысяч)`);
});

cmd.on(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 10000000;
	message.user.balance += 50000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 10.00.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50.00.000$`);
});


 
cmd.on(/^(?:пострассылка)\s?([^]+)?/i, async (message, args, bot) => { 
	if(message.user.right < 5) return;
	for(i in users){
		vk.api.call('messages.send', {
			user_id: users[i].id,
			message: `[Рассылка]:\n`,
			attachment: `${message.args[1]}`
		});
	}
	return message.send(`Посты отправлены!`);
});

cmd.on(/^all\s([^]+)$/i, async (message, args, bot) => {   
	if(!message.args[1]) return message.send(`🔸 » Введите текст рассылки`)
   if(message.user.right < 6) return;
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

cmd.on(/^(?:анекдот)$/i, async (message, bot) => {

	return prequest('http://www.anekdot.ru/rss/randomu.html')
	    .then(response => {
	      let match = response.match(/\['([^']+)/);
	          match = match && match[1].replace(/<br>/, '\n');
	          message.send("Анекдот  &#127770; \n " + match);

	      return {
	        message:      match
	      }
	    });
	});

	cmd.on(/^(?:cc|укороти|скороти|сс)\s?([^]+)?/i, async (message, args, bot) => {

		   let cc = message.args[1].toLowerCase();
	 
	       let text = message.args[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 » Короткая ссылка: " + res.short_url);
	     });
	  
	   });

cmd.on(/^(?:стата)$/i, async (message, bot) => { 
 		let id = message.user.uid;
 		if(message.user.right < 2) return;
 		return message.send(`
 			🔔 ~ ~ Статистика Администратора ~ ~ 🔔
 			✉ » Количество ответов
 	       ✉ » За все время: [${message.user.ainfo.all_ans}]
			♻ » Репутация: [${message.user.ainfo.good_ans}/${message.user.ainfo.bad_ans}] (хорошо/плохо)

        ⚠ ➾ Выговоров: [${message.user.ainfo.vig}]
			 
			✏ » Статистика наказаний:
			📜 » Выдано банов: [${message.user.ainfo.bans}]
			📜 » Выдано варнов: [${message.user.ainfo.warns}]
			📜 » Сменено ников: [${message.user.ainfo.nicks}] 
       📜 » Отправлено в тюрму: [${message.user.ainfo.jails}]
 			`);

 	});


cmd.on(/^(?:состав)$/i, async (message, args, bot) => {  
		let systems, podergka, sozdatels, admins, moders, chat; 
		creator = '\n🔺CREATOR🔺\n';
        systems = '\n◾<|System|>◾\n';
	    podergka =  '\n◾Diamond◾\n';
        sozdatels = '\n◾Gold◾\n';
		admins = '\n◾Silvers◾\n'; 
		moders = '\n◾Bronze◾\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.right == 6) creator += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            if (user.right == 5) systems += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            if (user.right == 4) podergka += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
			if (user.right == 3) sozdatels += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			if (user.right == 2) admins += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			if (user.right == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			}
		}
		let text = `\n`;
		if (creator.length != 2) text += creator;
        if (systems.length != 24) text += systems;
		if (podergka.length != 24) text += podergka;
        if (sozdatels.length != 24) text += sozdatels; 
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

cmd.on(/^(?:bans|banlist|blsit)$/i, async (message, args, bot) => {  
		let bans, chat; 
		bans = '\n❌Забаненые Аккаунты❌\n';
        for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.ban == true) bans += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            }
		}
		let text = `\n`;
		if (bans.length != 24) text += bans;
        return message.send(`${text}`);
	});

cmd.on(/^(?:крикнуть)\s([^]+)?$/i, async (message, args, bot) => {
 return message.send(`📣 Вы крикнули 🌟${message.args[1]}🌟`)
})

cmd.on(/^(?:Обнять)\s([0-9]+)?$/i, async (message, args, bot) => { 
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
 vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `😊 Вас обнял игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`😊 Вы обняли игрока @id${users[id].id}(${users[id].tag})`) 
});

cmd.on(/^(?:Ударить|hit)\s([0-9]+)?$/i, async (message, args, bot) => { 
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
  vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `👊 Вас ударил игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`👊 Вы ударили игрока @id${users[id].id}(${users[id].tag})`) 
});

cmd.on(/^(?:Поцеловать|kiss)\s([0-9]+)?$/i, async (message, args, bot) => { 
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
  vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `😘Вас поцеловал игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`😘 Вы поцеловали игрока @id${users[id].id}(${users[id].tag})`) 
});


cmd.on(/^(?:кости)\s?([^\s].*)?$/i, async (message, args, bot) => {
    var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
          if(!message.args[1]) return message.send("⚠ Укажите ставку!");
		  let text = parserInt(message.args[1]); 
  		  if(!Number(text)) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n😈 ➣ Ставка должна быть целым числом или 1(к|k).`);  
		  if(text > 100000000000) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💰 ➣ Максимальная ставка для игры: 10.000.000.000💰 `);
		   if(text < 1) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💰 ➣ Минимальная ставка для игры: 1💰 `);
		  if(text > message.user.balance) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n💰 ➣  У вас нет столько 💰`);
		  if(!text) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\nВы не указали ставку`);
		  if(text > message.user.balance || text <= 0) return message.send(text <= 0 ? `🎉 ➣ @id${message.user.id}(${message.user.tag}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${users[message.user.uid].tag}), Ставка не может превышать баланс`);
		  
		  if(text > 9999){

		   if(rand(1,100) > 93){
		  let userchis = rand(1,5);
		  let botchis = rand(5,6);
		  let userchis1 = rand(1,3);
		  let botchis1 = rand(2,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		  	let conv = sumbot;
		  	sumbot = sumuser;
		  	sumuser = sumbot;
		  }


		  if(sumuser > sumbot) {
		        let win = text * 2;
		        message.user.balance += Math.round(win);  
		        message.user.exp += 6;
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🎆 Ого, ты выиграл ${utils.sp(win)} (${utils.rn(win)})💰!
               🔹Тебе выпало [${userchis}] и [${userchis1}]
                🔳 Мне выпало [${botchis}] и [${botchis1}]
                💰Твой баланс: ${utils.sp(message.user.balance)}💲
                `);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        message.user.balance -= Math.round(win);  
		        message.user.exp -= 1;
			    if(message.user.balance <= 0){
			    	message.user.balance = 0;
			    }
			    if(message.user.exp <= 0){
					    message.user.exp = 0;
				}
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        👎 Ты проиграл ${utils.sp(win)} (${utils.rn(win)})💲
               🔹Тебе выпало [${userchis}] и [${userchis1}]
               🔳 Мне выпало [${botchis}] и [${botchis1}]
               💰Твой баланс: ${utils.sp(message.user.balance)}💲
               `);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        message.user.balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🔥У нас ничья!!!
                💰Твой баланс: ${utils.sp(message.user.balance)} (${utils.rn(message.user.balance)})💲`);
		  } 
		  }else{
		  let userchis = rand(1,6);
		  let botchis = rand(3,6);
		  let userchis1 = rand(1,6);
		  let botchis1 = rand(3,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		        let win = text * 2;
		        message.user.balance += Math.round(win);  
		        message.user.exp += 6;
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🎆 Ого, ты выиграл ${utils.sp(win)} (${utils.rn(win)})💰!
               🔹Тебе выпало [${userchis}] и [${userchis1}]
                🔳 Мне выпало [${botchis}] и [${botchis1}]
                💰Твой баланс: ${utils.sp(message.user.balance)}💲}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        message.user.balance -= Math.round(win);  
		        message.user.exp -= 1;
			    if(message.user.balance <= 0){
			    	message.user.balance = 0;
			    }
			    if(message.user.exp <= 0){
					    message.user.exp = 0;
				}
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        👎 Ты проиграл ${utils.sp(win)} (${utils.rn(win)})💲
               🔹Тебе выпало [${userchis}] и [${userchis1}]
               🔳 Мне выпало [${botchis}] и [${botchis1}]
               💰Твой баланс: ${utils.sp(message.user.balance)}💲`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        message.user.balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🔥У нас ничья!!!
                💰Твой баланс: ${utils.sp(message.user.balance)} (${utils.rn(message.user.balance)})💲`);
		  } 
		  }
		  }else{

		  }
		  if(rand(1,100) > 93){
		  let userchis = rand(1,5);
		  let botchis = rand(5,6);
		  let userchis1 = rand(1,3);
		  let botchis1 = rand(2,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		  	let conv = sumbot;
		  	sumbot = sumuser;
		  	sumuser = sumbot;
		  }


		  if(sumuser > sumbot) {
		        let win = text * 2;
		        message.user.balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag})
		        🎆 Ого, ты выиграл ${utils.sp(win)} (${utils.rn(win)})💰!
               🔹Тебе выпало [${userchis}] и [${userchis1}]
                🔳 Мне выпало [${botchis}] и [${botchis1}]
                💰Твой баланс: ${utils.sp(message.user.balance)}💲}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        message.user.balance -= Math.round(win);   
			    if(message.user.balance <= 0){
			    	message.user.balance = 0;
			    } 
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        👎 Ты проиграл ${utils.sp(win)} (${utils.rn(win)})💲
               🔹Тебе выпало [${userchis}] и [${userchis1}]
               🔳 Мне выпало [${botchis}] и [${botchis1}]
               💰Твой баланс: ${utils.sp(message.user.balance)}💲`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        message.user.balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🔥У нас ничья!!!
                💰Твой баланс: ${utils.sp(message.user.balance)} (${utils.rn(message.user.balance)})💲`);
		  } 
		  }else{
		  let userchis = rand(1,6);
		  let botchis = rand(3,6);
		  let userchis1 = rand(1,6);
		  let botchis1 = rand(3,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		        let win = text * 2;
		        message.user.balance += Math.round(win); 
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🎆 Ого, ты выиграл ${utils.sp(win)} (${utils.rn(win)})💰!
               🔹Тебе выпало [${userchis}] и [${userchis1}]
                🔳 Мне выпало [${botchis}] и [${botchis1}]
                💰Твой баланс: ${utils.sp(message.user.balance)}💲}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        message.user.balance -= Math.round(win);   
			    if(message.user.balance <= 0){
			    	message.user.balance = 0;
			    }
			    if(message.user.exp <= 0){
					    message.user.exp = 0;
				}
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        👎 Ты проиграл ${utils.sp(win)} (${utils.rn(win)})💲
               🔹Тебе выпало [${userchis}] и [${userchis1}]
               🔳 Мне выпало [${botchis}] и [${botchis1}]
               💰Твой баланс: ${utils.sp(message.user.balance)}💲`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        message.user.balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),
		        🔥У нас ничья!!!
                💰Твой баланс: ${utils.sp(message.user.balance)} (${utils.rn(message.user.balance)})💲`);
		  } 
		  }
   
})

cmd.on(/^(?:кредит)\s?([0-9]+)?$/i, async (message, args, bot) => {
		if(message.user.credit != 0) return message.send(`💳 » Чтобы взять кредит, нужно погасить старый: [${utils.sp(message.user.credit)}$]`);
		if(!message.args[1] || message.args[1] <= 0 ) return message.send(`💳 » Вы не указали сумму`);
		if(message.args[1] < 100000 || message.args[1] > 10000000) return message.send(`💳 » Минимальная сумма кредита 100.000$\n💳 » Максимальная сумма кредита 10.000.000$`);
 		message.user.balance += Number(message.args[1]);
 		let dolg = Number(message.args[1]) / 100 * 15;
 		dolg += Number(message.args[1]);
		message.user.credit = Number(dolg);
		message.user.procent = Number(message.args[1] / 100 * 15);
		return message.send(`
			 💳 » Вы взяли кредит на сумму: ${utils.sp(message.args[1])}$
			💳 » К погашению: ${utils.sp(dolg)}$
			💳 » Ежечасно будет списываться: ${utils.sp(message.args[1] / 100 * 15)}$
		`);
	});
	
 	cmd.on(/^(?:погасить)\s?([0-9]+)?$/i, async (message, args, bot) => {
		if(message.user.credit == 0) return message.send(`💳 » у вас нет кредита`);
		if(!message.args[1] || message.args[1] <= 0 ) return message.send(`💳 » Вы не указали сумму.`);
		if(message.user.credit > message.user.balance) return message.send(`💳 » У вас не достаточно денег.`);
		if(message.user.credit > message.args[1]) return message.send(`💳 » Оплатить кредит можно одним вкладом. [${utils.sp(message.user.credit)}$]`);
		if(message.user.credit < message.args[1]) return message.send(`💳 » Введите точную сумму к погашению. [${utils.sp(message.user.credit)}$]`);

		message.user.balance -= Number(mesage.args[1]);
		message.user.credit -= Number(message.args[1]);
		message.user.procent = 0;
		return message.send(`
			💳 » Вы успешно погасили весь кредит.
		`);
	});

cmd.on(/^(?:сдаюсь)$/i, async (message, args, bot) => {
 
	if(message.user.duel == false) return message.send(`🔫 ➾ Вам никто не бросал вызов/Вы не вызывали на стрелу никого.`);
	
	vk.api.call("messages.send", {
		peer_id: users[message.user.duel].id,
		message: `
		🔫 ➾ Игрок не согласился на стрелу.
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	message.user.duel_summ = false;
	users[message.user.duel].duel_summ = false;
	users[message.user.duel].duel = false;
	users[message.user.duel].nachal = false;
	message.user.duel = false;
	message.user.nachal = false; 

 

	return message.send(`
		🔫 ➾ Вы отменили стрелу.
	`);
});

cmd.on(/^(?:стрела)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 let user = users.find(x => x.uid === Number(message.args[1])); 
	let id = message.args[1];
	if(users[id].gun_name == false) return message.send(`🔫 ➾ У игрока нет оружия. ('Оружейный Кейс')`)
	if(message.user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия. ('Оружейный кейс')`)

	if(id == message.user.uid) return message.send(`🔫 ➾ Вы указали свой ID`)
	if(!message.args[2] || !id || message.args[2] < 1) return message.send(`💸 ➾ Пример команды: 'Стрела ID СТАВКА'`)
	if(message.user.balance < message.args[2]) return message.send(`💸 ➾ Ваша ставка больше вашего баланса`)
	if(!users[id]) return message.send(`🔫 ➾ Такого игрока нет!`)
	if(users[id].balance < message.args[2]) return message.send(`💸 ➾ У игрока баланс меньше вашей ставки`)
	if(message.user.duel != false) return message.send(`🔫 ➾ Вы уже назначали стрелу игроку ${users[message.user.duel].tag}\n🎌 ➾ Для отмены напишите: 'Сдаюсь'`);
	if(users[id].duel != false) return message.send(`🔫 ➾ Вы уже назначали стрелу игроку ${users[message.user.duel].tag}\n&#127987; ➾ Для отмены напишите: 'Сдаюсь'`);
	message.user.duel_summ = Number(message.args[2]);
	users[id].duel_summ = Number(message.args[2]);
	message.user.duel = Number(id);
	users[id].duel = Number(message.user.uid);
	message.user.nachal = message.user.uid;
	users[id].nachal =  message.user.uid;

	vk.api.call("messages.send", {
		peer_id: users[message.args[1]].id,
		message: `
		🔫 ➾ Игрок @id${message.user.id}(${message.user.tag}) назначил вам стрелу
		💸 ➾ Ставка ${message.args[2]}$

		🔫 ➾ Для принятия напишите: 'Принять'
		🎌 ➾ Для отмены напишите: 'Сдаюсь'
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	return message.send(`
		🔫 ➾ Вы назначили стрелу игроку @id${users[id].id}(${users[id].tag})
		💸 ➾ Ставка ${message.args[2]}$
		🔫 ➾ Ожидайте принятия боя игроком.
		
		&#127987; ➾ Для отмены напишите: 'Сдаюсь'
	`);
});


cmd.on(/^(?:принять)$/i, async (message, args, bot) => {

	if(message.user.duel == false) return message.send(`🔫 ➾ Вам не назначали стрелу!`); 
	if(message.user.balance < message.user.balance) return message.send(`💸 ➾ Ставка больше вашего баланса`)
	if(users[message.user.duel].balance < message.args[2]) return message.send(`💸 ➾ У противника баланс меньше ставки`) 
	if(message.user.uid == message.user.nachal) return message.send(`💸 ➾ Принять стрелу должен соперник!`);

	let sum = message.user.duel_summ;  
	let us2 = message.user.duel;
	let one_hp = 100; //кто принимает
	let two_hp = 100; //кто атакует
	let text = '';

	//1 этап
	one_hp -= users[message.user.duel].uron;
	two_hp -= message.user.uron;
	text += `
	- - 1&#8419; этап - - 
	🔸 ➾ ${message.user.tag} | -${users[message.user.duel].uron}% | ${one_hp}❤
 	🔹 ➾ ${users[message.user.duel].tag} | -${message.user.uron}% | ${two_hp}❤ 
	`;
	// 2 этап
	one_hp -= users[message.user.duel].uron;
	two_hp -= message.user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					message.user.balance -= Number(message.user.duel_summ);
					users[message.user.duel].balance += Number(message.user.duel_summ);

					message.user.game.strela_loose += 1; 
					users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${users[us2].id}(${users[us2].tag})
					🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | 0❤
				 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | ${two_hp}❤ 
					`;
					vk.api.call("messages.send", {
						user_id: message.user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					users[us2].duel_summ = false;
					users[us2].duel = false; 
					message.user.duel = false;
					message.user.duel_summ = false;
					users[us2].nachal = false;
					message.user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					message.user.balance += Number(message.user.duel_summ);
					users[us2].balance -= Number(message.user.duel_summ);

					message.user.game.strela_win += 1;  
					users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${message.user.id}(${message.user.tag})
					🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | ${one_hp}❤
				 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | 0❤ 
					`;
					vk.api.call("messages.send", {
						user_id: message.user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					users[us2].duel = false;
					users[us2].duel_summ = false;
					message.user.duel = false;
					message.user.duel_summ = false;
					users[us2].nachal = false;
					message.user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				message.user.balance += Number(message.user.duel_summ);
				users[us2].balance -= Number(message.user.duel_summ);

				message.user.game.strela_win += 1;  
				users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${message.user.id}(${message.user.tag})
				🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | ${one_hp}❤
			 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | 0❤ 
				`;
				vk.api.call("messages.send", {
					user_id: message.user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				users[us2].duel = false;
				users[us2].duel_summ = false;
				message.user.duel = false;
				message.user.duel_summ = false;
				users[us2].nachal = false;
				message.user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				message.user.balance -= Number(message.user.duel_summ);
				users[message.user.duel].balance += Number(message.user.duel_summ);

				message.user.game.strela_loose += 1; 
				users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${users[us2].id}(${users[us2].tag})
				🔸 ➾ ${message.user.tag} | -${ausers[us2].uron}% | 0❤
			 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | ${two_hp}❤ 
				`;
				vk.api.call("messages.send", {
					user_id: message.user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				users[us2].duel_summ = false;
				users[us2].duel = false; 
				message.user.duel = false;
				message.user.duel_summ = false;
				users[us2].nachal = false;
				message.user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			} 
	
	}else{
		text += `
		- - 2&#8419; этап - - 
		🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | ${one_hp}❤
	 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | ${two_hp}❤ 
		`;
	} 
	// 3 этап
	one_hp -= users[us2].uron;
	two_hp -= message.user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					message.user.balance -= Number(message.user.duel_summ);
					users[us2].balance += Number(message.user.duel_summ);

					message.user.game.strela_loose += 1; 
					users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${users[us2].id}(${users[us2].tag})
					🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | 0❤
				 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | ${two_hp}❤ 
					`;
					vk.api.call("messages.send", {
						user_id: message.user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					users[us2].duel = false;
					users[us2].duel_summ = false;
					message.user.duel = false;
					message.user.duel_summ = false;
					users[us2].nachal = false;
					message.user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					message.user.balance += Number(message.user.duel_summ);
					users[us2].balance -= Number(message.user.duel_summ);

					message.user.game.strela_win += 1;
					users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${message.user.id}(${message.user.tag})
					🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | ${one_hp}❤
				 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | 0❤ 
					`;
					vk.api.call("messages.send", {
						user_id: message.user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					users[us2].duel = false;
					users[us2].duel_summ = false;
					message.user.duel = false;
					message.user.duel_summ = false;
					users[us2].nachal = false;
					message.user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				message.user.balance += Number(message.user.duel_summ);
				users[us2].balance -= Number(message.user.duel_summ);

				message.user.game.strela_win += 1;
				users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${message.user.id}(${message.user.tag})
				🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | ${one_hp}❤
			 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | 0❤ 
				`;
				vk.api.call("messages.send", {
					user_id: message.user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				users[us2].duel = false;
				users[us2].duel_summ = false;
				message.user.duel = false;
				message.user.duel_summ = false;
				users[us2].nachal = false;
				message.user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				message.user.balance -= Number(message.user.duel_summ);
				users[us2].balance += Number(message.user.duel_summ);

				message.user.game.strela_loose += 1; 
				users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${users[us2].id}(${users[us2].tag})
				🔸 ➾ ${message.user.tag} | -${users[us2].uron}% | 0❤
			 	🔹 ➾ ${users[us2].tag} | -${message.user.uron}% | ${two_hp}❤ 
				`;
				vk.api.call("messages.send", {
					user_id: message.user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				users[us2].duel = false;
				users[us2].duel_summ = false;
				message.user.duel = false;
				message.user.duel_summ = false;
				users[us2].nachal = false;
				message.user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
		 
		
	}else{
		text += `
		- - 3&#8419; этап - - 
		Вы сыграли в ничью!`;
		vk.api.call("messages.send", {
				user_id: message.user.id,
				message: text
				
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

			vk.api.call("messages.send", {
				user_id: users[us2].id,
				message: text
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });
		users[us2].duel = false;
		users[us2].duel_summ = false;
		message.user.duel = false;
		message.user.duel_summ = false;
		users[us2].nachal = false;
		message.user.nachal = false; 
		 
	}  

 
	 
});

cmd.on(/^(?:гиф)\s(.*)$/i, async (message, bot) => {
       vk.api.call('docs.search', {q: message.args[1] + '.gif', count: 10})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.on(/^(?:видео)\s(.*)$/i, async (message, bot) => {
       vk.api.call('video.search', {q: message.args[1], count: 5, adult: 0, access_token: '3b92893968437bfaef44f200d2a8cc7c8993664db5b5f6a5688b9293895b00c77c1826186d9d067c9af14'})
        .then(response => {
            let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.on(/^(?:рулетка)\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])
	{
		if(message.user.roulette == -1) return bot(`используйте: Рулетка [ставка]`);
		if(message.user.roulette == 0) return bot(`вы не сделали ни 1 выстрела`);
		const win = Math.floor((message.user.roulette + 1) * message.user.roulette_bet);
		message.user.balance += win;
		message.user.roulette = -1;
		message.user.roulette_bet = 0;
		return bot(`вы ушли живым и забрали с собой ${win}$`);
	}
	else
	{
		if(message.user.roulette != -1) return bot(`вы уже начали игру и не можете сделать ещё 1 ставку`);
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
			message.user.roulette = 0;
			message.user.roulette_bet = message.args[1];
			message.user.balance -= message.args[1];
			return bot(`вы начали игру в русскую рулетку<br>Для выстрела используйте: Выстрел`);
		}
	}
});

cmd.on(/^(?:выстрел)$/i, async (message, bot) => {
	if(message.user.roulette == -1) return bot(`используйте: Рулетка [ставка]`);
	if(utils.random(0, 100) < 50)
	{
		message.user.roulette += 1;
		bot(`вы выстреливаете и остаётесь в живых. Всего выстрелов: ${message.user.roulette}`);
	}
	else
	{
		message.user.roulette = -1;
		message.user.roulette_bet = 0;
		bot(`вы погибли при выстреле и проиграли свою ставку`);
	}
});


cmd.on(/^(?:онлайн)$/i, async (message, bot) => {
	if(!message.isChat) return bot(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "online"
    }).then(async function (response) {
        let text = `[😎] || Список людей, которые сейчас находятся онлайн:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.online != 0) text += `${['😍', '😎', '😏', '🙂', '🙃', '😌', '🤤', '😇', '😳', '😂', '😝', '🙄', '😝', '😘', '😗', '😙', '😛', '🤑'].random()} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.send(text)
    })
});

cmd.on(/^(?:очистить чат)$/i, async (message, bot) => {
	if(message.user.right < 3) return bot(`доступно с привилегии - Gold.`);
		return message.send("&#4448;\n".repeat(5000) + "Я очистила чат от лишних сообщений!");
});

cmd.on(/^(?:вернуть клавиатуру|Включить клавиатуру|Включить клаву|Вернуть клаву)$/i, async (message, bot) => {
	message.user.keyboard = true;
	return bot(`[📟] Я успешно убрал клавиатуру`,{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Помощь"
		},
			"color": "default"
		},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать клавиатуру"
			},
				"color": "negative"
			}]
		]
			})
		});
});

cmd.on(/^(?:Убрать клавиатуру|Убать клавиатуру|Убрать клаву|Убрать клаву)$/i, async (message, bot) => {
	message.user.keyboard = false;
	return bot(`[📟] Я успешно убрал клавиатуру чтобы вернуть клавиатуру напишите "Вернуть клавиатуру/клаву"`);
});

//----|°Админ Команды•|----\\

cmd.on(/^(?:blockpay|заблокировать перевод|заблокировать переводы)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?$/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.right < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » blockpay [ID] [TIME(1-999)] [ПРИЧИНА]`);
	 if(users[message.args[1]].right > 4) return message.send(`⚠  ➾ Нельзя выдать этому игроку блокировку перевода!`);
   let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	users[message.args[1]].block_pay = true;
    var is = [message.user.uid, message.text] 
		adm_log(is)

	setTimeout(() => {
			users[id].block_pay = false;
			vk.api.call('messages.send', {
				peer_id: users[message.args[1]].id,
				message: `⏺ » Вам разблокировали перевод [||] Больше не нарушайте :)`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: users[id].id,
		message: `⏺ » ${message.user.tag} Заблокировал вам перевод на [${message.args[2]}] минут(ы). по причине ${message.args[3]}`
	});
	return message.send(`💰 » Вы заблокировали перевод игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} минут`); 
});
	
	cmd.on(/^(?:разблокировать перевод|разбанить перевод|unblockpay)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`); 
	 
	 users[message.args[1]].block_pay = false;
	var is = [message.user.uid, message.text] 
		adm_log(is)
    vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вам разблокировали перевод [||] Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы разблокировали перевод  игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag })]`);
	 
});

//------------|•Команды тюрмы•|------------\\

cmd.on(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
  if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете посадить себя в тюрму`)
     if(message.user.right < 2) return message.send(`🔸 » Вы не Silver`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-999)] [ПРИЧИНА]`);
	 if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя посадить этого игрока в тюрму!`);
    let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	users[message.args[1]].ban = true;
   var is = [message.user.uid, message.text] 
		adm_log(is)

     message.user.ainfo.jails += 1;

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
	if(message.user < 2) return message.send(`🔸 » Вы не Silver`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`); 
	 
	 users[message.args[1]].ban = false;
    var is = [message.user.uid, message.text] 
		adm_log(is)
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вы были выпущены из тюрьмы досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы выпустили  игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })] из тюрьмы`);
	 
});

//------------|•Команды выговора•|------------\\

cmd.on(/^(?:vig)\s?([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: vig [ID] [Причина] `);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете выдать себе выговор`)
        if(message.user.right < 4) return message.send(`🔸 ➾ Вы не Diamond`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
       if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать выговор данному игроку!`);

		users[message.args[1]].ainfo.vig += 1; 

		var is = [message.user.uid, message.text] 
		adm_log(is)

		let text = `✅ ➾ ${message.user.tag} выдал вам админ-выговор по причине [${message.args[2]}].\n✅ ➾ После 3 вас снимет с админ-поста.`
		if(users[message.args[1]].ainfo.vig == 3){
			users[message.args[1]].ainfo.vig = 0;  
			users[message.args[1]].right = 0;
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 ➾ Вы лишились админ-прав.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		}); 
		return message.send(`✅ ➾ Вы выдали выговор игроку [${users[message.args[1]].tag}] по причине [${message.args[2]}].`);
	}); 

	cmd.on(/^(?:unvig)\s?([0-9]+)?/i, async (message, args, bot) => { 
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: unvig ID`);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.user.right < 4) return message.send(`🔸 ➾ Вы не Diamond`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		users[message.args[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ ➾ Администратор снял Вам все выговоры`
		});
		var is = [message.user.uid, message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли все выговоры игроку [${users[message.args[1]].tag}].`);
	}); 

//------------|•Выдача и забирание денег•|------------\\

cmd.on(/^(?:givemycoins)\s?([0-9]+)?/i, async (message, args, bot) => {
   if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 1) return message.send(`🔸 » Вы не bronze`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(message.user.right == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 15000000000000000) return message.send(`💰 » Пример: 'givemycoins [1-15000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}
	if(message.user.right == 2){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 35000000000000000) return message.send(`💰 » Пример: 'givemycoins [1-35000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}   
	if(message.user.right == 3){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 650000000000000000) return message.send(`💰 » Пример: 'givemycoins [1-650000000000000000]'`);
		message.user.balance += Number(message.args[1]);
	}  
     if(message.user.right == 4){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 10000000000000000000) return message.send(`💰 » Пример: 'givemycoins [1-10000000000000000000]'`);
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
 if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
   var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов💰`);
});

cmd.on(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rub += Number(message.args[2]);
var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.on(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].balance = 0; 
   var is = [message.user.uid, message.text] 
		adm_log(is)
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.on(/^(?:removerub)\s?([0-9]+)?\s([0-9+])?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 6) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID] [COUNT]'`); 
	users[message.args[1]].rub = Number(message.args[2]); 
   var is = [message.user.uid, message.text] 
		adm_log(is)
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

//----------|•Команды Поиска•|----------\\

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
		🔹 » Привилегия: ${id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "<|System|>")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.right >= 2 ? `🔸 » Уровень: ${id.level}\n` : ``)+ 
		(message.user.right >= 2 ? `🔸 » Опыт: ${id.exp}\n` : ``)+ 

		(message.user.right >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(message.user.right >= 2 ? `⚠ » Причина: [${id.warn_p}]\n` : ``)+ 
		(message.user.right >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.right < 2) return message.send(`🔸➡ Вы не Silver`);
if(message.args[3]){
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(`
👤 ➖ Игрок: ${user.tag}
    🆔 ➖ ID: ${user.uid}
          ⛔ ➖ Статус: ${user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "<|System|>")}
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
          ⛔ ➖ Статус: ${user2.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "<|System|>")}
    `)
})
  return;
 }
 
});

//----------|•Выдача Админки•|----------\\

cmd.on(/^(?:giveadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if( message.user.right < 6) return;
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(1-5)]`); 
		if(message.args[2] > 5) return message.send(` 🔸 >> Максимальный админ-уровень 5!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		let id = Number(message.args[1])
       users[id].right = Number(message.args[2]); 
       var is = [message.user.uid, message.text] 
		adm_log(is)
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "System")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "System")}]`);
	});
	
//------------|•Система Варнов•|------------\\

cmd.on(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не выдать себе предупреждение`)
        if(message.user.right < 2) return message.send(`🔸 » Вы не Silver`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
        if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать предупреждение данному игроку!`);

		users[message.args[1]].warn += 1;  
      users[message.args[1]].warn_p = `${message.args[2]}`
      var is = [message.user.uid, message.text] 
		adm_log(is)

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
      message.user.ainfo.warns += 1;
		return message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
	}); 

cmd.on(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не Silver`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;
      var is = [message.user.uid, message.text] 
		adm_log(is)
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		}); 
		return message.send(`✅ » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
	});
	
 //----------|•Смена ника•|----------\\

cmd.on(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.right < 3) return message.send(`🔸 » Вы не администратор`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`🔸 » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
		} 
		users[message.args[1]].tag = message.args[2];
      var is = [message.user.uid, message.text] 
		adm_log(is)
      message.user.ainfo.nicks += 1;
		return message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
	});

//---------------|•Выдача/Обнуление Рейтинга•|------------------\\
cmd.on(/^(?:giverating)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » Вы не Sytem`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rating += Number(parserInt(message.args[2]));
var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
	return message.send(`👑 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рейтинга`)
	});
	
	cmd.on(/^(?:removerating)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].rating = 0; 
   var is = [message.user.uid, message.text] 
		adm_log(is)
	return message.send(`👑 » Вы забрали весь рейтинг у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});
	
//----------|•Система Банов•|----------\\

cmd.on(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете забанить себя`)
       if(message.user.right < 3) return message.send(`🔸 » Вы не Gold`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
       if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя заблокировать этого игрока!`);
        
		users[message.args[1]].ban = true;  
      var is = [message.user.uid, message.text] 
		adm_log(is)

		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
     message.user.ainfo.bans += 1;
		return message.send(`✅ » Вы выдали блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	}); 

	cmd.on(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 3) return message.send(`🔸 » Вы не Gold`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;
      var is = [message.user.uid, message.text] 
		adm_log(is)
    
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял вам блокировку аккаунта`
		}); 
		return message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	});

//----------|•Админ блокировка•|-------------\

cmd.on(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		if(message.user.right < 5) return;
		let text = '';
		if(!message.args[1] || !message.args[2]) return;
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете заблокировать себе ответ на репорт`)
        if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);  
		if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя заблокировать ответ на репорт этому игроку!`);
        if(Number(message.args[2]) == 1){
			texts = 'включил' 
			ausers[message.args[1]].admin.block_rep = true;
		}
		if(Number(message.args[2]) == 0){
			texts = 'отключил' 
			users[message.args[1]].admin.block_rep = false;
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ ➾ Администратор ${texts} Вам запрет на ответы на репорты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на ответ на репорты.`);
	});

cmd.on(/^(?:blockgive)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		if(message.user.right < 5) return;
		let text = '';
		if(!message.args[1] || !message.args[2]) return;
		let i = config;
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете заблокировать себе выдачу денег`)
        if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);  
	    if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя заблокировать выдачу денег этому игроку!`);
        if(Number(message.args[2]) == 1){
			texts = 'включил' 
			users[message.args[1]].admin.block_give = true;
		}
		if(Number(message.args[2]) == 0){
			texts = 'отключил' 
			users[message.args[1]].admin.block_give = false;
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ ➾ Администратор ${texts} Вам запрет на выдачу денег.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на выдачу денег.`);
	});

//---------|•Система Репорта•|----------\\
	
	 cmd.on(/^(?:репорт|report|rep|жалоба)\s?([^]+)?/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`🔸 ➾ вы не написали жалобу | репорт [текст]`);

		for(i=0;i<200000;i++){
			if(users[i]){
			if(users[i].right >= 5){ 
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `👉 ➾ [REPORT]\n👉 ➾ ID игрока: ${message.user.uid}\n👉 ➾ Жалоба: ${message.args[1]}\n👉 ➾ [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 ➾ Вы успешно отправили жалобу.`);
	});


	cmd.on(/^(?:респект)\s?([^]+)?/i, async (message, args, bot) => {
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: респект +/-\n🔸 ➾ [+ -> хороший ответ/ - -> плохой ответ]`);
		if(message.user.rep.status == false) return message.send(`🔸 ➾ Проверьте вводимые данные.`); 
		if(message.args[1] == '+' || message.args[1] == '-'){
			message.user.rep.status = false; 
			if(message.args[1] == '+') users[message.user.rep.id].ainfo.good_ans += 1; 
			if(message.args[1] == '-') users[message.user.rep.id].ainfo.bad_ans += 1;  
			let id = message.user.rep.id;
			message.user.rep.id = false;
			return message.send(`🔸 ➾ Вы успешно оценили ответ \n🔸 ➾ Администратора [${users[id].tag}] - ${message.args[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)
			 
		}
		return message.send(`🔸 ➾ Проверьте вводимые данные.`); 
	});

cmd.on(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => {
		if(message.user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
		if(message.user.right < 2) return
		if(!Number(message.args[1]) || !message.args[1] || !message.args[2] || !users[message.args[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: users[message.args[1]].id,
			message: `👉 ➾ Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [message.user.uid, message.text] 
		adm_log(is)
		message.user.ainfo.all_ans += 1;
		message.user.ainfo.ans += 1;
		users[message.args[1]].rep.status = true;
		users[message.args[1]].rep.id = Number(message.user.uid);
		return message.send(`👉 ➾ Ответ отправлен.`)
	});
	
	//---------|•Кик Пользователя•|--------\\
	
	cmd.on(/^(?:кикнуть|kick|кик)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, (message) => { 
	let user = users[message.user];
 	if(message.user.right < 3) return message.send(`⚠ ➾ Вы не Gold`);

	if(message.args[4]) { 
		var domain = message.args[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.args[4] 
	}).then((res) => { 
			if(res.object_id == 500580851) return message.send('⚠ ➾ Отказ'); 

			if(users[res.object_id]){
				if(users[res.object_id].right > 4) return message.send(`⚠ ➾ Нельзя кикнуть этого игрока!`);
			} 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);
			});  
			return  
		})  
	}else{
		if(!message.args[3]) return message.send("⚠ ➾ ID не указан, либо указан неверно."); 
		if(message.args[3] == 500580851) return message.send('⚠ ➾ Отказ'); 

		if(users[message.args[3]]){
			if(users[message.args[3]].right > 4) return message.send(`⚠ ➾Нельзя кикнуть этого игрока!`);
		}

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.args[3] }).
		catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);}); 

		return  
}
});

/* |                      |*\
/"     •|Раздача  •|   */

cmd.on(/^(?:раздача)$/i, async (message, bot) => {
	if(message.user.right < 6) return bot(`доступно с привилегии - Разраб.`);
	if(giving) return bot(`серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"`);
	giving = true;
	user.api.wall.post({
		owner_id: -126781365,
		message: `🔥 >> Всем привет! мы проводим раздачу на сумму 500.000.000.000.00$ чтобы их получить посмотрите инструкцию ниже.
                                                                        ↓↓↓↓↓↓↓↓↓↓

🔥 >> Инструкция:
⚠ || Перед тем, как репостить, Вы должны написать любое сообщение в ЛС нашему сообществу. Так же необходимо, чтобы у Вас был открыт профиль. 
		(Наш бот для раздачи проверяет репост на вашей стене)

😝 >> Время раздачи: 1 ЧАС

UPD: Деньги на баланс будут выданы по окончанию акции.`,
		attachments: 'photo-126781365_456239104'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -175039543,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -175039543,
				post_id: response.post_id,
				from_group: 175039543,
				message: '😜 >> Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\n[🤤] Также, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.'
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -175039543, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance +=50000000000000; 
					vk.api.messages.send({ user_id: user.id, message: `Приветик!!!\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +500.000.000.000.00$, поэтому ваш баланс составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник [xzerobot|ZeroBot || Chat Bot]` });
					vk.api.messages.send({ user_id: 500580851, message: `[😜] >> [daviderbaev|Одмэн], я выдал игроку ([id${user.id}|${user.tag}]) - 500.000.000.000.00 на баланс.\n\nНа данный момент, его баланс составляет:\n${user.balance}$`})
				});
			});
			user.api.wall.openComments({
				owner_id: -175039543,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: -175039543,
				post_id: response.post_id,
				from_group: 175039543,
				message: '😉 || Сейчас закончю раздачу!!!.'
			});
			user.api.wall.createComment({
				owner_id: -175039543,
				post_id: response.post_id,
				from_group: 175039543,
				message: 'ВСЁ! Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -175039543,
				post_id: response.post_id
			});
			giving = false;
		}, 3600000);
	});
});

//-------(Телефон Команды)---------\\

cmd.on(/^(?:Телефон|telephone)$/i, async (message, bot) => {
	if(message.user.misc.phone < 1) return message.send(`[➖] У вас нету телефона, чтобы купить введите команду "Телефоны"`);
   return message.send(`🎊 @id${message.user.id} (${message.user.tag} меню телефона,
   1) Тинфо - посмотреть инфу о телефоне
   2) Купить номер - купить сим-карту
   4) Смс (ид) (сообщение)
   5) Рр - Руская рулетка(в разработке)
 `);
 });
 
 cmd.on(/^(?:Тинфо|Тпомощь)$/i, async (message, bot) => { 
 let text = ``
   if(message.user.misc.phone < 1) return message.send(`📱У вас нет телефона`);
   if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
   text += `Оператор: ${message.user.operator.toString().replace(/0/gi, "Нету").replace(/1/gi, "Феникс").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}\n`;
   text += `📟 Номер: ${message.user.number}\n`;
   text += `\n\nЧтобы выйти в меню телефона введите "Телефон"`;
  return message.send(`📱Ваш телефон:  \n${text}`);
});


cmd.on(/^(?:купить номер)$/i, async (message, bot) => {
	const operator1 = utils.random(1, 6);
	if(message.user.number > 9) return bot(`Вы уже имеете номер!`);
	if(!message.user.misc.phone == 1) return message.send(`📱 >> У вас нет телефона.`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 9; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
message.user.balance -= 1000,
message.user.number = result;
message.user.numberss = true;
message.user.operator = operator1;
return message.send(`📱 || Вы успешно получили телефонный номер: +79${result} || Оператор: ${message.user.operator.toString().replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}, с вас было снято 1к`);
}
});

cmd.on(/^(?:написать|смс|sms)\s([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
 let user = users.find(x => x.uid === Number(message.args[1])); 
 if(message.user.messages == true) return message.send(`🔸 ➾ Вы не можете писать сообщение так как у вас мут.`); 
if(message.user.number == 9) return bot(`📟 У вас нет номера!`);
if(message.user.misc.phone == 1) return message.send(`📱У вас нету телефона`);
if(users[message.args[1]].misc.phone == 1) return message.send(`📱 ➾ У игрока под id[${message.args[1]}] нет телефона.`)
 let id = message.args[1]; 
vk.api.call('messages.send', { 
   user_id: users[message.args[1]].id, 
   message: `➖➖➖➖➖➖➖➖ 
🔸 Игрок @id${message.user.id}(${message.user.tag}) [ID: ${message.user.uid}] || ${data()} в ${time()}, прислал вам сообщение! 
 
📨 Сообщение: ➡${message.args[2]}⬅ 
➖➖➖➖➖➖➖➖` 
 }); 
return message.send(`💬 Вы успешно отправили сообшение на ид [${users[id].uid}]`) 
});

//-------------(игры)---------------\\

cmd.on(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
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

cmd.on(/^(?:кто)/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.isChat) return bot(`команда работает только в беседе!`);
    let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: message.peerId
    });
    let profile = getRandomElement(profiles);
    await message.send(
        getRandomElement(['Это точно', 'Я уверен, что это', 'Твоя мама говрит, что это', 'Кнч, это', 'Думаю, что это', 'Наверное, это', 'Википедия говорит, что это', 'Сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});

cmd.on(/^(?:погода|weather)/i, async (message, bot) => {
let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    request("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
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
    	if(now > 18) return '&#127750;'
    	else if(now > 22) return '&#127747;'
    	else if(now > 0) return '&#127747;'
    	else if(now < 6) return '&#127749;'
    	else if(now < 12) return '&#127966;'
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

cmd.on(/^(?:бутылочка)$/i, async (message, bot) => { 
	message.user.foolder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles); 
message.send(`[🍷]: Бутылочка :[🍷]

[id${profile.id}|${profile.first_name}] и [id${profile2.id}|${profile2.first_name}] — ваше действие: ` + utils.pick(['Заняться сексом!', 'Поцеловаться', 'Сесть на бутылочку', 'Начать встречаться', '*Вы пропускаете ход*', 'Раздеться', 'Бухнуть', 'Пожениться'])); 
});

cmd.on(/^(?:монетка)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
     var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
    if(!message.args[1]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  монетка ставка орел/решка`);
    let user = message.user;
    if(parserInt(message.args[1]) > message.user.balance || parserInt(message.args[1]) <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   	
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[^_^] » Вы выиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[-_-] » Вы проиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[-_-] » Вы проиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[^_^] » Вы выиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    		}
   		 }
	return message.reply(`[Подсказка] » монетка [ставка] [орел/решка]`);
});

cmd.on(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
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
		
		Если вы угадаете код, то вы получите 10.000.000.000.000$`);
	}
});

cmd.on(/^(?:ловушка)\s(.*)$/i, async (message, bot) => {
 var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
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
        return bot(`Вы засунули руку в коробку...\n[😎] >> Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 >> Вы выиграли:  ${utils.sp(win)}$`);
    }else{
        let win = text;
        message.user.balance -= Math.round(win);  
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n[💀] >> Какая неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n[💴] >> Вы проиграли:  ${utils.sp(win)}$`);
   
    } 		

}
})

cmd.on(/^(?:тир)\s(.*)\s(.*)$/i, async (message, bot) => {
     var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
		if(!message.args[1]) return bot(`укажите ID мишени (от 1 до 3)`)
		if(!message.args[2]) return bot(`укажите ставку.`)
		let stavka = parserInt(message.args[2]); 
  		if(!Number(stavka)) return bot(`ставка должна быть целым числом.`); 
		if(stavka > message.user.balance) return bot(`у вас нет столько денег`);
		let text = message.args[1];   
		if(message.args[1] > 3) return bot(`укажите ID мишени (от 1 до 3)`)
		if(message.args[1] < 1) return bot(`укажите ID мишени (от 1 до 3)`)
		if(stavka > message.user.balance || stavka <= 0) return bot(stavka <= 0 ? `ставка не может быть меньше 0 или равна 0` : `ставка не может превышать баланс`);

 	if(rand(1,100) > 50){
	    message.user.balance += stavka;
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
	    return bot(`поздравляю! Вы попали прямо в цель!!\n[👤] >> Вы забираете ваш выигрыш`);
	  }else{
	    message.user.balance -= stavka;
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }

    return bot(`Вы промохнулись...\n[💀] >> Вы теряете всю свою ставку.`);
  	}
	   
});

cmd.on(/^(?:Поход)$/i, async (message, bot) => {
	if(message.user.timers.poxod) return bot(`вы сегодня уже были в походе. Следуйщий поход через 24 часа😕`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.poxod = false;
	}, 86400000);

	message.user.timers.poxod = true;

	if(prize === 1)
	{
		message.user.balance += 300359492;
		return bot(`находясь в походе, вы нашли 300.359.492💸`);
	}
	
	if(prize === 2)
	{
		message.user.balance += 105065;
		return bot(`находясь в походе, вы нашли 105.065💸`);
	}
	
	if(prize === 3)
	{
		message.user.balance += 15900654;
		return bot(`находясь в походе, вы нашли 15.900.654💸`);
	}
	
	if(prize === 4)
	{
		message.user.btc += 10000;
	return bot (`находясь в походе, вы нашли 10000 Биткоинов💸`);
	}
	
	if (prize === 5)
	{
		message.user.rubins += 3000;
	return bot (`находясь в походе, вы нашли 3.000 рубинов💸`);
	}
});

cmd.on(/^(?:Питомец поход|Поход питомец|Питомца в поход)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return message.send(`🐯 || У вас нету питомца, чтобы его купить введите "Питомцы" `);
   if(message.user.timers.pet_poxod) return message.send(`🐯 || Ваш питомец уже был в походе следуйщий поход, через 24 часа`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.pet_poxod = false;
	}, 86400000);

	message.user.timers.pet_poxod = true;

	if(prize === 1)
	{
	   message.user.pets.exp += 2;
       message.user.balance += 300359492;
		return bot(`🐯 Ваш питомец нашёл ${utils.sp(300359492)} коинов`);
	}
	
	if(prize === 2)
	{
		message.user.pets.exp += 2;
        message.user.balance += 105065;
		return bot(`🐯 Ваш питомец нашёл ${utils.sp(105065)} коинов`);
	}
	
	if(prize === 3)
	{
		message.user.pets.exp += 2;
        message.user.balance += 1590000;
		return bot(`🐯 Ваш питомец нашёл ${utils.sp(1590000)} коинов`);
	}
	
	if(prize === 4)
	{
	 message.user.pets.exp += 4;
      message.user.btc += 10000;
	return bot (`🐯 Ваш питомец нашёл ${utils.sp(10000)} биткоинов`);
	}
	
	if (prize === 5)
	{
	  message.user.pets.exp += 4;
      message.user.rubins += 3000;
	return bot (`🐯 Ваш питомец нашёл ${utils.sp(3000)} рубинов`);
	}
});

//---------------|•|•| Система Кейсов |•|•|------------------\\

cmd.on(/^(?:кейс обычный)/i, async (message, bot) => { 
 let user = message.user; 
 if(user.balance < 1000000000000000000) return message.send(`⚠ Обычный кейс стоит ${utils.sp(1000000000000000000)}$`); 
 user.balance -= 1000000000000000000; 
 if(rand(1,3) == 1){ 
  let count = rand(1500000000000000000,200000000000000000); 
    user.balance += count; 
    return message.send(`😃 Вам выпало ${utils.sp(count)}$`); 
}else{ 
  return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `); 
  } 
});

cmd.on(/^(?:кейс средний)/i, async (message, bot) => { 
 let user = message.user; 
 if(user.balance < 60000000000000000) return message.send(`⚠ Обычный кейс стоит ${utils.sp(60000000000000000)}$`); 
 user.balance -= 6000000000000000000; 
 if(rand(1,3) == 80){ 
  let count = rand(150000000000000000000,50000000000000000000); 
  let btc = rand(30000000,58000000); 
  user.balance += count; 
  user.btc += btc; 
  return message.send(`😃 Вам выпало ${utils.sp(count)}$ 💰 и ${btc} 💳`); 
}else{ 
  return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `); 
  } 
});

cmd.on(/^(?:кейс большой)/i, async (message, bot) => { 
 let user = message.user; 
 if(user.balance < 60000000000000000) return message.send(`⚠ Обычный кейс стоит ${utils.sp(60000000000000000)}$`); 
 user.balance -= 6000000000000000000; 
 if(rand(1,4) == 75){ 
  let count = rand(750000000000000000000,3300000000000000000000); 
  let btc = rand(80000000,120000000); 
  user.balance += count; 
  user.btc += btc; 
  return message.send(`😃 Вам выпало ${utils.sp(count)}$ 💰 и ${btc} 💳`); 
}else{ 
  return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `); 
  } 
});

cmd.on(/^(?:кейс большой)/i, async (message, bot) => { 
 let user = message.user; 
 if(user.balance < 60000000000000000) return message.send(`⚠ Обычный кейс стоит ${utils.sp(60000000000000000)}$`); 
 user.balance -= 6000000000000000000; 
 if(rand(1,3) == 65){ 
  let count = rand(750000000000000000000,3300000000000000000000); 
  let btc = rand(60000000,120000000); 
  user.balance += count; 
  user.btc += btc; 
  return message.send(`😃 Вам выпало ${utils.sp(count)}$ 💰 и ${btc} 💳`); 
}else{ 
  return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `); 
  } 
});

cmd.on(/^(?:кейс донат)/i, async (message, bot) => { 
 let user = message.user; 
 if(user.donate_case < 1) return message.send(`⚠ У вас нету донат-кейсов чтобы их купить перейдите на наш сайт https://xzerobot.ru/`); 
 user.donate_cass -= 1; 
 if(rand(1,3) == 45){ 
  let right = rand(1,5);
  let count = rand(950000000000000000000,10300000000000000000000); 
  let btc = rand(800000000,1200000000); 
  user.right = right;
  user.balance += count; 
  user.btc += btc; 
  return message.send(`😃 Вам выпало Админ-Уровень: ${right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "<|System|>")} --- ${utils.sp(count)}$ 💰 и ${btc} 💳`); 
}else{ 
  return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `); 
  } 
});

cmd.on(/^(?:Кейсы|Cases)$/i, async (message, bot) => {
 return message.send(`@id${message.user.id}(${message.user.tag}), кейсы:
📦 Маленький - ${utils.sp(10000000000000000)}$💰 
🎁От ${utils.sp(1500000000000000000)}$ до ${utils.sp(200000000000000000)}$
➖➖➖➖➖➖➖➖➖
🗳 Средний - ${utils.sp(60000000000000000)}$💰 
🎁 От ${utils.sp(250000000000000000000)}$ $ до ${utils.sp(50000000000000000000)}$
🎁 От ${utils.sp(30000000)} до ${utils.sp(58000000)} 💳 
➖➖➖➖➖➖➖➖➖
🗄 Большой - ${utils.sp(120000000000000000)}$💰 
🎁 От ${utils.sp(750000000000000000000)}$ до ${utils.sp(3300000000000000000000)}$ 
🎁 От ${utils.sp(60000000)} до ${utils.sp(1200000000)} 💳 
➖➖➖➖➖➖➖➖➖
💠 Донат - 100₽ 
🎁 От 1 до 5 Админ-Уровень 
🎁 От ${utils.sp(950000000000000000000)}$ до ${utils.sp(950000000000000000000)}$ 
🎁 От ${utils.sp(1200000000)} до ${utils.sp(1200000000)} 💳
➖➖➖➖➖➖➖➖➖

☝ Что бы открыть кейс, введите: "Кейс [имя]"
☺ Пример: "Кейс маленький"
`);
});

//----------|•Функции•|-----------\\

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
 function user_id(id) {
	 	let uid = 0
	 	if(users[id]){
	 		uid = users[id].id
	 	}    
		return uid; 
	}  
  //------------------------------------------------------------------------------------\\
  setInterval(() =>{ 
for(i=1;i<200000;i++){ 
   if(users[i]){ 
 if(users[i].msg == 100) {users[i].rang = "Начинающий"} 
 if(users[i].msg == 500) {users[i].rang = "Любитель общения"} 
 if(users[i].msg == 1000) {users[i].rang = "Обсолютный любитель"} 
 if(users[i].msg == 2000) {users[i].rang = "Старший"} 
 if(users[i].msg == 3000) {users[i].rang = "Профессионал"} 
 if(users[i].msg == 8000) {users[i].rang = "Генералиссимус"} 
 } 
} 
  }, 1000);
//------------------------------------------------------------------------------------------------------------------------------\\

/*setTimeout(() => {
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
		            		balance: 50000000,
		            		activ: 75,
		            		users: {}
		            	}
		}else{
		}
			user.api.wall.post({
		owner_id: -126781365,
		message: `[☺] | ${utils.pick(answers)}

		[📝] >> Промокод ${result}
		[🗝] >> Активаций в этом промокоде - 75
		[💰] >> Валюты в этом промокоде - 50.000.000$ 

		[🤴] || ${utils.pick(rullka)}`,
		attachments: 'photo-126781365_456239079'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -126781365,
			post_id: response.post_id
		});
		});
	}, 1320000);*/


function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}


function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}
