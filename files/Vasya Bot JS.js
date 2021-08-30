console.log('<VALERA EVDOKIMOV>, I started!');
const { VK } = require('vk-io');
const vk = new VK();
const vk2 = new VK();
const {Keyboard} = require("vk-io");
const commands = [];
const request = require('prequest');
const user = new VK({
token: '99103bb720b7262670aa1092f9bf8c13aba952e07b1f17384e78e197011758b485198b22d3e44855b797b'
});
const user2 = new VK({
token: '99103bb720b7262670aa1092f9bf8c13aba952e07b1f17384e78e197011758b485198b22d3e44855b797b'
}); 
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
const bot_owner = 444997646;
let giving = false;
let k = 0;
let razdaha = 0;
let zz = false;
let xx2 = false;
let prize = 1;
const kompany = require('./vb/kompany.json');
const game = require('./vb/game.json');
const bet = require('./vb/bet2.json');
const pres = require('./vb/pres.json');
const trade = require('./vb/trade5.json');
const clans = require('./vb/clans6.json');
const botinfo = require('./vb/botinfo5.json');
const promo = require('./vb/promo5.json');
const stavka = require('./vb/stavka5.json');
const chats = require('./vb/chats2.json');
const rep = require('./vb/rep.json');
const bb = require('./vb/bb.json');
const promos = '';

var tcpp = require('tcp-ping');

var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi('524a14a5c2247620d640da79f7e880d8');
var Wallet2 = new Qiwi('d21cd1901f480664f3548ab4699121db');
var Wallet3 = new Qiwi('f3149e7047f7d5c49dd7f1e3573480db');

const googleTTS = require('google-tts-api');
const child = require('child_process');

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(800, 800)
const Canvas = require('canvas');
const ctx = canvas.getContext('2d')
const path = require('path')

const kar = [
	{
		name: "Варвары",
		ur: 10,
		zi: 60,
		id: 1,
		red: 1
	},
	{
		name: "Лучницы",
		ur: 15,
		zi: 50,
		id: 2,
		red: 1
	},
	{
		name: "Голем",
		ur: 50,
		zi: 200,
		id: 3,
		red: 4
	}
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
		name: 'Ламборгини Veneno',
		cost: 75000000,
		id: 16
	},
	{
		name: 'Лошадь артур',
		cost: 100,
		id: 17
	}
];

const itemss = [
	{
		name: 'ТАЛИСМАН МОНОПОЛИСТА',
		cost: 5000000000000,
		id: 1
	},
	{
		name: 'КУЛАК СУДЬБЫ',
		cost: 5000000000000,
		id: 2
	},
	{
		name: 'ТАЛИСМАН ОПЫТНОГО РАБОТНИКА',
		cost: 5000000000000,
		id: 3
	}
];

const reklama = [
	{
		name: 'Старт',
		sub: 1000,
		cost: 15000,
		id: 1
	},
	{
		name: 'Нормал',
		sub: 5000,
		cost: 75000,
		id: 2
	},
	{
		name: 'Нормал',
		sub: 25000,
		cost: 750000,
		id: 3
	},
	{
		name: 'Мега',
		sub: 70000,
		cost: 1000000,
		id: 4
	},
	{
		name: 'Горох',
		sub: 140000,
		cost: 2000000,
		id: 5
	},
	{
		name: 'Сметанка',
		sub: 220000,
		cost: 3500000,
		id: 6
	},
	{
		name: 'ЧИТЕРСКИЙ ПИАР',
		sub: 22220000,
		cost: 3500000000,
		id: 7
	},
];

const PC = [
	{
		name: ' ноут',
		cost: 25000,
		id: 1
	},
	{
		name: 'пк разраба',
		cost: 50000,
		id: 2
	},
	{
		name: 'игровой пк',
		cost: 2500000,
		id: 3
	}
];

const petsi = [
	{
		name: 'мартышка дима',
		cost: 25000,
		id: 1
	},
	{
		name: 'бухой огурчик вова',
		cost: 50000,
		id: 2
	},
	{
		name: 'кот космонавт Виталий',
		cost: 2500000,
		id: 3
	}
];

const suite = [
	{
		name: 'Костюм лимона',
		cost: 25000,
		id: 1
	},
	{
		name: 'костюм за 300',
		cost: 50000,
		id: 2
	},
	{
		name: 'нанокостюм',
		cost: 25000000000,
		id: 3
	}
];

const weapon = [
	{
		name: 'пистолет',
		cost: 25000,
		id: 1
	},
	{
		name: 'дигл',
		cost: 50000,
		id: 2
	},
	{
		name: 'миниган',
		cost: 25000000000,
		id: 3
	}
];

const yachts = [
	{
		name: 'Поплавок',
		cost: 5000,
		id: 1
	},
	{
		name: 'Ванна',
		cost: 25000,
		id: 2
	},
	{
		name: 'Шлюбка',
		cost: 50000,
		id: 3
	},
	{
		name: 'Деревянная лодка',
		cost: 250000,
		id: 4
	},
	{
		name: 'Reedor D12',
		cost: 500000,
		id: 5
	},
	{
		name: 'Phowater 89',
		cost: 1000000,
		id: 6
	},
	{
		name: 'Droomware',
		cost: 2500000,
		id: 7
	},
	{
		name: 'V1ZE-AD',
		cost: 5000000,
		id: 8
	},
	{
		name: 'Vilworn Re-11',
		cost: 25000000,
		id: 9
	},
	{
		name: 'X-Water 187',
		cost: 50000000,
		id: 10
	},
	{
		name: 'BreVNo SeRgEi v12',
		cost: 75000000,
		id: 11
	}
];

const airplanes = [
	{
		name: 'Параплан',
		cost: 75000,
		id: 1
	},
	{
		name: 'Летучий змей',
		cost: 250000,
		id: 2
	},
	{
		name: 'Wermetta T12',
		cost: 500000,
		id: 3
	},
	{
		name: 'Marine-Acvate',
		cost: 1000000,
		id: 4
	},
	{
		name: 'DBR 25',
		cost: 2500000,
		id: 5
	},
	{
		name: 'Bollow-81',
		cost: 5000000,
		id: 6
	},
	{
		name: 'Zenda R310B',
		cost: 1500000,
		id: 7
	},
	{
		name: 'Air-Knight DDR200',
		cost: 50000000,
		id: 8
	},
	{
		name: 'Water-marine B11',
		cost: 100000000,
		id: 9
	},
	{
		name: 'Mediumjet REDOK',
		cost: 250000000,
		id: 10
	},
	{
		name: 'Growh Z1',
		cost: 500000000,
		id: 11
	},
	{
		name: 'SN1V1Z-AD',
		cost: 1000000000,
		id: 12
	}
];

const helicopters = [
	{
		name: 'Шарик с пропеллером',
		cost: 5000,
		id: 1
	},
	{
		name: 'WoZd 3000',
		cost: 25000,
		id: 2
	},
	{
		name: 'Bell 49-A',
		cost: 50000,
		id: 3
	},
	{
		name: 'ReD-EsCaPe',
		cost: 250000,
		id: 4
	},
	{
		name: 'ZN242-AR',
		cost: 500000,
		id: 5
	},
	{
		name: 'ARR DE COMR',
		cost: 1000000,
		id: 6
	},
	{
		name: 'De Luke HIGH',
		cost: 2500000,
		id: 7
	},
	{
		name: 'Eurocopter 1500',
		cost: 5000000,
		id: 8
	},
	{
		name: 'Snight NH90',
		cost: 20000000,
		id: 9
	},
	{
		name: 'OBell Sprey',
		cost: 32000000,
		id: 10
	},
	{
		name: 'SN1ZE-AD',
		cost: 40000000,
		id: 11
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 250,
		id: 1
	},
	{
		name: 'Чердак',
		cost: 3000,
		id: 2
	},
	{
		name: 'Подвал',
		cost: 3500,
		id: 3
	},
	{
		name: 'Будка',
		cost: 5000,
		id: 4
	},
	{
		name: 'Дом на дереве',
		cost: 10000,
		id: 5
	},
	{
		name: 'Дом в Горловке',
		cost: 25000,
		id: 6
	},
	{
		name: 'Дом в ЛДНР',
		cost: 37500,
		id: 7
	},
	{
		name: 'Дом в центре Донецка',
		cost: 125000,
		id: 8
	},
	{
		name: 'Многоэтажный дом',
		cost: 80000,
		id: 9
	},
	{
		name: 'Вилла в Монако',
		cost: 450000,
		id: 10
	},
	{
		name: 'Дом на Сахалине',
		cost: 1250000,
		id: 11
	},
	{
		name: 'Дом на Рублёвке',
		cost: 5000000,
		id: 12
	},
	{
		name: 'Личный "Москва-Сити"',
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
		name: 'Подвал',
		cost: 50000,
		id: 1
	},
	{
		name: 'Крыша дома',
		cost: 150000,
		id: 2
	},
	{
		name: 'Квартира в общежитии',
		cost: 500000,
		id: 3
	},
	{
		name: 'Однокомнатная квартира',
		cost: 1000000,
		id: 4
	},
	{
		name: 'Двухкомнатная квартира',
		cost: 5000000,
		id: 5
	},
	{
		name: 'Квартира в Горловке',
		cost: 25000000,
		id: 6
	},
	{
		name: 'Квартира в центре Донецка',
		cost: 50000000,
		id: 7
	},
	{
		name: 'Квартира в центре Луганска',
		cost: 100000000,
		id: 8
	},
	{
		name: 'Квартира в центре Москвы',
		cost: 150000000,
		id: 9
	}
];

const phones = [
	{
		name: 'Nokia 108',
		cost: 250,
		id: 1
	},
	{
		name: 'Samsung (2012)',
		cost: 500,
		id: 2
	},
	{
		name: 'P-Hoe 7000',
		cost: 2000,
		id: 3
	},
	{
		name: 'Frenc IO de 21',
		cost: 10000,
		id: 4
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 15000,
		id: 5
	},
	{
		name: 'Rotan 316',
		cost: 30000,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 50000,
		id: 7
	},
	{
		name: 'Sneg CE12',
		cost: 75000,
		id: 8
	},
	{
		name: 'IPhone X',
		cost: 100000,
		id: 9
	},
	{
		name: 'IPhone XS',
		cost: 250000,
		id: 10
	}
];

const farms = [
	{
		name: '6U Nvidia',
		cost: 10000000,
		id: 1
	},
	{
		name: 'AntminerS9',
		cost: 175000000,
		id: 2
	},
	{
		name: 'FM2018-BT200',
		cost: 1000000000,
		id: 3
	},
	{    name: 'Vasya FARM BTC',                
		cost: 100000000000,
		id: 4
    },
	{    name: 'ANONO FARM BTC',                
			cost: 200000000000,
			id: 5
	},
	{    name: 'ADMINS FERM RICHI',                
				cost: 5000000000000,
				id: 6
	}
	];

const farmse = [
	{
		name: 'ФАРМ НА БОМЖАХ',
		cost: 1000000,
		id: 1
	},
	{
		name: 'БАНДЫ НА РАЙОНЕ',
		cost: 17500000,
		id: 2
	},
	{
		name: 'МАФИЯ',
		cost: 100000000,
		id: 3
	},
	{    name: 'ПРОДАЖА НАРКОТКОВ',                
		cost: 10000000000,
		id: 4
    },
	{    name: 'КОСМИЧЕСКОЕ АГЕНСТВО',                
			cost: 20000000000,
			id: 5
	},
	{    name: 'ДРУЖБА С ПРИЗИДЕНТОМ',                
				cost: 500000000000,
				id: 6
	}
	];
	

const businesses = [
	[ 
		{ 
			name: 'Nivea [&#11088;]',
			cost: 50000,
			earn: 20,
			workers: 1,
			id: 1,
			icon: '&#128132;'
		},

		{ 
			name: 'Nivea [&#11088;&#11088;]',
			cost: 350000,
			earn: 100,
			workers: 10,
			id: 1,
			icon: '&#128132;'
		},

		{ 
			name: 'Nivea [&#11088;&#11088;&#11088]',
			cost: 900000,
			earn: 262,
			workers: 30,
			id: 1,
			icon: '&#128132;'
		},

		{
			name: 'Nivea [&#11088;&#11088;&#11088;&#11088;]',
			cost: 1200000,
			earn: 375,
			workers: 50,
			id: 1,
			icon: '&#128132;'
		},

		{
			name: 'Nivea [&#127775;]',
			cost: 4000000,
			earn: 110,
			workers: 200,
			id: 1,
			icon: '&#128132;'
		}
	],

	[
		{
			name: 'Lacoste [&#11088;]',
			cost: 100000,
			earn: 70,
			workers: 1,
			id: 2,
			icon: '&#128085;'
		},

		{
			name: 'Lacoste [&#11088;&#11088;]',
			cost: 500000,
			earn: 370,
			workers: 5,
			id: 2,
			icon: '&#128085;'
		},

		{
			name: 'Lacoste [&#11088;&#11088;&#11088;]',
			cost: 950000,
			earn: 772,
			workers: 40,
			id: 2,
			icon: '&#128085;'
		},

		{
			name: 'Lacoste [&#11088;&#11088;&#11088;&#11088;]',
			cost: 8000000,
			earn: 3745,
			workers: 150,
			id: 2,
			icon: '&#128085;'
		},

		{
			name: 'Lacoste [&#127775;]',
			cost: 17500000,
			earn: 7995,
			workers: 400,
			id: 2,
			icon: '&#128085;'
		}
	],

	[
		{
			name: 'Burger King [&#11088;]',
			cost: 300000,
			earn: 270,
			workers: 3,
			id: 3,
			icon: '&#127828;'
		},

		{
			name: 'Burger King [&#11088;&#11088;]',
			cost: 450000,
			earn: 435,
			workers: 7,
			id: 3,
			icon: '&#127828;'
		},

		{
			name: 'Burger King [&#11088;&#11088;&#11088;]',
			cost: 450000,
			earn: 740,
			workers: 15,
			id: 3,
			icon: '&#127828;'
		},

		{
			name: 'Burger King [&#11088;&#11088;&#11088;&#11088;]',
			cost: 4000000,
			earn: 1990,
			workers: 80,
			id: 3,
			icon: '&#127828;'
		},

		{
			name: 'Burger King [&#127775;]',
			cost: 11000000,
			earn: 4740,
			workers: 300,
			id: 3,
			icon: '&#127828;'
		}
	],

	[
		{
			name: 'Sprite [&#11088;]',
			cost: 500000,
			earn: 410,
			workers: 15,
			id: 4,
			icon: '&#127870;'
		},

		{
			name: 'Sprite [&#11088;&#11088;]',
			cost: 1250000,
			earn: 930,
			workers: 10,
			id: 4,
			icon: '&#127870;'
		},

		{
			name: 'Sprite [&#11088;&#11088;&#11088;]',
			cost: 3000000,
			earn: 2335,
			workers: 70,
			id: 4,
			icon: '&#127870;'
		},

		{
			name: 'Sprite [&#127775;]',
			cost: 20000000,
			earn: 10985,
			workers: 500,
			id: 4,
			icon: '&#127870;'
		}
	],

	[
		{
			name: 'Audi [&#11088;]',
			cost: 1500000,
			earn: 8800,
			workers: 5,
			id: 5,
			icon: '&#128664;'
		},

		{
			name: 'Audi [&#11088;&#11088;]',
			cost: 3500000,
			earn: 1380,
			workers: 10,
			id: 5,
			icon: '&#128664;'
		},

		{
			name: 'Audi [&#11088;&#11088;&#11088;]',
			cost: 15000000,
			earn: 6080,
			workers: 200,
			id: 5,
			icon: '&#128664;'
		},

		{
			name: 'Audi [&#127775;]',
			cost: 50000000,
			earn: 2748,
			workers: 1000,
			id: 5,
			icon: '&#128664;'
		}
	],

	[
		{
			name: 'Marina Bay Sands [&#11088;]',
			cost: 25000000,
			earn: 8470,
			workers: 50,
			id: 6,
			icon: '&#127976;'
		},

		{
			name: 'Marina Bay Sands [&#11088;&#11088;]',
			cost: 50000000,
			earn: 11720,
			workers: 75,
			id: 6,
			icon: '&#127976;'
		},

		{
			name: 'Marina Bay Sands [&#11088;&#11088;&#11088;]',
			cost: 60000000,
			earn: 22970,
			workers: 200,
			id: 6,
			icon: '&#127976;'
		},

		{
			name: 'Marina Bay Sands [&#11088;&#11088;&#11088;&#11088;]',
			cost: 90000000,
			earn: 43270,
			workers: 360,
			id: 6,
			icon: '&#127976;'
		},

		{
			name: 'Marina Bay Sands [&#127775;]',
			cost: 200000000,
			earn: 70970,
			workers: 700,
			id: 6,
			icon: '&#127976;'
		}
	],

	[
		{
			name: 'GUCCI [&#11088;]',
			cost: 80000000,
			earn: 22962,
			workers: 10,
			id: 7,
			icon: '&#128095;'
		},

		{
			name: 'GUCCI [&#11088;&#11088;]',
			cost: 240000000,
			earn: 32917,
			workers: 60,
			id: 7,
			icon: '&#128095;'
		},

		{
			name: 'GUCCI [&#11088;&#11088;&#11088;]',
			cost: 240000000,
			earn: 61467,
			workers: 200,
			id: 7,
			icon: '&#128095;'
		},

		{
			name: 'GUCCI [&#127775;]',
			cost: 1000000000,
			earn: 122727,
			workers: 700,
			id: 7,
			icon: '&#128095;'
		}
	],

	[
		{
			name: 'Maore DeGrand [&#11088;]',
			cost: 150000000,
			earn: 30200,
			workers: 5,
			id: 8,
			icon: '&#127970;'
		},

		{
			name: 'Maore DeGrand [&#11088;&#11088;]',
			cost: 200000000,
			earn: 37950,
			workers: 10,
			id: 8,
			icon: '&#127970;'
		},

		{
			name: 'Maore DeGrand [&#11088;&#11088;&#11088;]',
			cost: 750000000,
			earn: 102450,
			workers: 50,
			id: 8,
			icon: '&#127970;'
		},

		{
			name: 'Maore DeGrand [&#127775;]',
			cost: 5000000000,
			earn: 674950,
			workers: 500,
			id: 8,
			icon: '&#127970;'
		}
	],

	[
		{
			name: 'GameDev [&#11088;]',
			cost: 500000000,
			earn: 70700,
			workers: 8,
			id: 9,
			icon: '&#127918;'
		},

		{
			name: 'GameDev [&#11088;&#11088;]',
			cost: 750000000,
			earn: 101900,
			workers: 20,
			id: 9,
			icon: '&#127918;'
		},

		{
			name: 'GameDev [&#11088;&#11088;&#11088;]',
			cost: 1250000000,
			earn: 404900,
			workers: 50,
			id: 9,
			icon: '&#127918;'
		},

		{
			name: 'GameDev [&#127775;]',
			cost: 5000000000,
			earn: 1524900,
			workers: 250,
			id: 9,
			icon: '&#127918;'
		}
	],

	[
		{
			name: 'Газпром [&#11088;]',
			cost: 800000000,
			earn: 105070,
			workers: 40,
			id: 10,
			icon: '&#128738;'
		},

		{
			name: 'Газпром[&#11088;&#11088;]',
			cost: 1200000000,
			earn: 149620,
			workers: 75,
			id: 10,
			icon: '&#128738;'
		},

		{
			name: 'Газпром [&#11088;&#11088;&#11088;]',
			cost: 4250000000,
			earn: 308870,
			workers: 300,
			id: 10,
			icon: '&#128738;'
		},

		{
			name: 'Газпром [&#127775;]',
			cost: 10000000000,
			earn: 3484370,
			workers: 650,
			id: 10,
			icon: '&#128738;'
		}
	],

	[
		{
			name: 'VASYA FARM [&#11088;]',
			cost: 50000000000,
			earn: 5029700,
			workers: 100,
			id: 11,
			icon: '&#128189;'
		},

		{
			name: 'VASYA FARM [&#11088;&#11088;]',
			cost: 80000000000,
			earn: 10059700,
			workers: 200,
			id: 11,
			icon: '&#128189;'
		},

		{
			name: 'VASYA FARM [&#11088;&#11088;&#11088;]',
			cost: 250000000000,
			earn: 40104700,
			workers: 350,
			id: 11,
			icon: '&#128189;'
		},

		{
			name: 'VASYA FARM [&#11088;&#11088;&#11088;&#11088;]',
			cost: 1000000000000,
			earn: 150239700,
			workers: 800,
			id: 11,
			icon: '&#128189;'
		},

		{
			name: 'VASYA FARM [&#11088;&#11088;&#11088;&#11088;&#11088;]',
			cost: 20000000000000,
			earn: 1100749700,
			workers: 2500,
			id: 11,
			icon: '&#128189;'
		},

		{
			name: 'VASYA FARM [&#127775;]',
			cost: 100000000000000,
			earn: 58449970000,
			workers: 16000,
			id: 11,
			icon: '&#128189;'
		}
	],
	
	[
		{
			name: 'YARIK FARM [&#11088;]',
			cost: 500000000000,
			earn: 59297000,
			workers: 190,
			id: 12,
			icon: '&#9940;'
		},

		{
			name: 'YARIK FARM [&#11088;&#11088;]',
			cost: 100000000000,
			earn: 60059700,
			workers: 200,
			id: 12,
			icon: '&#9940;'
		},

		{
			name: 'YARIK FARM [&#11088;&#11088;&#11088;]',
			cost: 2500000000000,
			earn: 401047000,
			workers: 350,
			id: 12,
			icon: '&#9940;'
		},

		{
			name: 'YARIK FARM [&#11088;&#11088;&#11088;&#11088;]',
			cost: 10000000000000,
			earn: 5502397000,
			workers: 800,
			id: 12,
			icon: '&#9940;'
		},

		{
			name: 'YARIK FARM [&#11088;&#11088;&#11088;&#11088;&#11088;]',
			cost: 200000000000000,
			earn: 11007497000,
			workers: 2500,
			id: 12,
			icon: '&#9940;'
		},

		{
			name: 'YARIK FARM [&#127775;]',
			cost: 1000000000000000,
			earn: 584499700000,
			workers: 16000,
			id: 12,
			icon: '&#9940;'
		},
		{
			name: 'YARIK FARM [&#127775;]',
			cost: 10000000000000000,
			earn: 784499700000,
			workers: 20000,
			id: 12,
			icon: '&#9940;'
		}
	],
	
	[
		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#11088;]',
			cost: 5000000000000,
			earn: 592970000,
			workers: 1090,
			id: 13,
			icon: '&#9940;'
		},

		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#11088;&#11088;]',
			cost: 1000000000000,
			earn: 600597000,
			workers: 1200,
			id: 13,
			icon: '&#9940;'
		},

		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#11088;&#11088;&#11088;]',
			cost: 25000000000000,
			earn: 4010470000,
			workers: 1350,
			id: 13,
			icon: '&#9940;'
		},

		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#11088;&#11088;&#11088;&#11088;]',
			cost: 100000000000000,
			earn: 55023970000,
			workers: 1800,
			id: 13,
			icon: '&#9940;'
		},

		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#11088;&#11088;&#11088;&#11088;&#11088;]',
			cost: 2000000000000000,
			earn: 110074970000,
			workers: 12500,
			id: 13,
			icon: '&#9940;'
		},

		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#127775;]',
			cost: 10000000000000000,
			earn: 5844997000000,
			workers: 16000,
			id: 13,
			icon: '&#9940;'
		},
		{
			name: 'D҉E҉M҉O҉N҉S҉ ҉V҉S҉ ҉Y҉O҉U҉ [&#127775;] [ВНИМАНИЕ ОПАСНО ЧЕЛОВЕК ВЛАДЕЕТ АДОМ]',
			cost: 100000000000000000,
			earn: 7844997000000,
			workers: 25000,
			id: 13,
			icon: '&#9940;'
		}
	],
	
	[
		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},

		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},

		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},

		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},

		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},

		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},
		{
			name: 'СЕКРЕТНЫЙ БИЗНЕС',
			cost: 1,
			earn: 150000000000000,
			workers: 1,
			id: 14,
			icon: ''
		},
	]
];

const works = [
	{
		name: 'Уборщик',
		requiredLevel: 1,
		min: 2000,
		max: 2500,
		id: 1
	},
	{
		name: 'Водитель автобуса',
		requiredLevel: 3,
		min: 3750,
		max: 4000,
		id: 2
	},
	{
		name: 'Сантехник',
		requiredLevel: 5,
		min: 4000,
		max: 4500,
		id: 3
	},
	{
		name: 'Адвокат',
		requiredLevel: 8,
		min: 5000,
		max: 5500,
		id: 4
	},
	{
		name: 'Врач',
		requiredLevel: 10,
		min: 7500,
		max: 8000,
		id: 5
	},
	{
		name: 'Мент',
		requiredLevel: 12,
		min: 8500,
		max: 8999,
		id: 6
	},
	{
		name: 'Менеджер',
		requiredLevel: 14,
		min: 9000,
		max: 9489,
		id: 7
	},
	{
		name: 'Программист',
		requiredLevel: 22,
		min: 10000,
		max: 12500,
		id: 8
	},
	{
		name: 'Системный Администратор',
		requiredLevel: 25,
		min: 12500,
		max: 13500,
		id: 9
	},
	{
		name: 'Депутат',
		requiredLevel: 49,
		min: 16000,
		max: 17500,
		id: 10
	},
	{
		name: 'Министр',
		requiredLevel: 499,
		min: 16000000000,
		max: 17500000000,
		id: 11
	},
	{
		name: 'Премьер-Министр',
		requiredLevel: 999,
		min: 18000000000,
		max: 20500000000,
		id: 12
	},
	{
		name: 'Президент',
		requiredLevel: 9999,
		min: 1800000000000,
		max: 2000500000000,
		id: 13
	},
		{
		name: 'илюминат',
		admin : 6,
		min: 88000000000000,
		max: 90005000000000,
		id: 14
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
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', 'дохуилион'][k];

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
	},
	time: () => {
		return parseInt(new Date().getTime()/1000)
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


const antiEval = (str) => {

        let arr = str.split(' ');

        switch (arr[1]) {
            case '+':
                return Math.round((+arr[0] + +arr[2]) * 100) / 100;
                break;
            case '-':
                return Math.round((+arr[0] - +arr[2]) * 100) / 100;
                break;
            case '/':

                return Math.round((+arr[0] / +arr[2]) * 100) / 100;
                break;
            case '*':
                return Math.round((+arr[0] * +arr[2]) * 100) / 100;
                break;
        };
    };

let btc = 6000;
let meteorit = 1000000000;
let shokolad = 3000000000;
let igrushki = 4500000000;

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

let users = require('./vb/users5.json');
let za = require('./vb/za.json');
let ka = require('./vb/ka.json');
let vid = require('./vb/vid.json');
let ro = require('./vb/ro.json');
let games = require('./vb/game.json');
let trades = require('./vb/trade5.json');
let buttons = [];

vk.updates.on(['chat_invite_user_by_link'], async (message, next) => {
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		let user = await vk.api.users.get({user_id: message.senderId })
		let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 
		
		chat.chat_invite_user_by_link += 1;

		message.send(`😜Приветствую тебя, игрок - ${user[0].first_name}! я бот вася напиши помощь и узнаешь мои команды`, 
				{
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Помощь`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Бонус`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Ферма`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Баланс`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Казино 5000`
},
"color": "negative"
}]
]
})
});

		await next();
	});
function displayTime(ticksInSecs) { 
var ticks = ticksInSecs; 
var hh = Math.floor(ticks / 3600); 
var mm = Math.floor((ticks % 3600) / 60); 
var ss = ticks % 60; 

return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) ); 
} 

function pad(n, width) { 
var n = n + ''; 
return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
}
	
vk.updates.on(['chat_invite_user'], async (message, next) => {
		if(message.payload.action.member_id == message.senderId) return;
		let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 
		
		chat.chat_invite_user += 1;

		let user = await vk.api.users.get({user_id: message.payload.action.member_id})

		message.send(`😜Приветствую тебя, игрок - ${user[0].first_name}! я бот вася напиши помощь и узнаешь мои команды`, 
		{
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Помощь`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Бонус`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Ферма`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Баланс`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Казино 5000`
},
"color": "negative"
}]
]
})
});
  

		await next();
	});
	
const widget = new VK({ token: 'c34f756c94bcb241f207da985c0b3a35ebbc7054a7ce6875e877571966d782d76f7973f2ec7bffd2011bf', pollingGroupId: '181025518' });
widget.setOptions({ token: 'c34f756c94bcb241f207da985c0b3a35ebbc7054a7ce6875e877571966d782d76f7973f2ec7bffd2011bf', pollingGroupId: '181025518' });
let top = ``;
setInterval(() => {
	widget.api.call('appWidgets.update', {
		type: 'table',
		code: `return {
			"title": "Лучшие игроки",
			"title_url": "vk.me/vasyabot0",
			"head": [
				{
					"text": "Пользователь"
				},
				{
					"text": "рейтинг",
					"align": "left"
				},
				{
					"text": "баланс",
					"align": "left"
				}
			],
			"body": ${JSON.stringify(top)}
		};`
	});
}, 60000);
async function leaderBoard() {
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, rating: x.rating, prefix: x.prefix, id: x.id, uid: x.uid, regDate: x.regDate, mention: x.mention});
	});


	return top
	.sort((a, b) => b.rating - a.rating)
	.slice(0, 10)
	.map((x, i) => [
		{
			"icon_id": `id${x.id}`,
			"text": `${x.prefix}`,
			"url": `https://vk.com/id${x.id}`
		},
		{
			"text": `${utils.sp(x.rating)} 👑`
		},
		{
			"text": `${utils.sp(x.balance)}$`
		}
	]);
}
setInterval(async () => top = await leaderBoard(), 55000); 

vk.updates.on(['join_group_member'], async (ctx, next) => { 
	var group = await vk.api.groups.getMembers({ group_id: 181025518}).catch((error) => { console.log(` Ошибка.`);}); 
	vk.api.users.get({user_ids: ctx.userId}).then(function(res) { 
		var user = res[0] 
		var text = `

		[${data()},${time()}] @id${ctx.userId} (${user.first_name} ${user.last_name}) подписался на нашу группу

		👪 Участников в группе: ${utils.sp(group.count)}
		📈 Цель 5.000 подписчиков, до цели осталось: ${utils.sp(5000 - group.count)}

		` 
		vk.api.call('messages.send', { chat_id: 17, message: text, random_id: 0, }).catch((error) => { console.log(` Ошибка.`);}); 
	}).catch((error) => { console.log(` Ошибка.`);}) 
}); 




vk.updates.on(['leave_group_member'], async (ctx, next) => { 
	var group = await vk.api.groups.getMembers({ group_id: 181025518}).catch((error) => { console.log(` Ошибка.`);}); 
	vk.api.users.get({user_ids: ctx.userId}).then(function(res) { 
		var user = res[0] 
		var text = `

		[${data()},${time()}] @id${ctx.userId} (${user.first_name} ${user.last_name}) отписился от нас(

		👪 Участников в группе: ${utils.sp(group.count)}
		📈 Цель 5.000 подписчиков, до цели осталось: ${utils.sp(5000 - group.count)}

		` 
		vk.api.call('messages.send', { chat_id: 17, message: text, random_id: 0, }).catch((error) => { console.log(` Ошибка.`);}); 
	}).catch((error) => { console.log(` Ошибка.`);}) 
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


setInterval(async () => {
	await saveAll();
	console.log('saved');
}, 30000);

setInterval(async () => {
 		for(name in frac){
 			let sum = frac[name].bank;
 			frac[name].bank = 0;
 			let owner_sum = sum / 100 * 10;
 			let user_sums = sum / 100 * 90;
 			let people = frac[name].people - 1;
 			let user_sum = user_sums / people;

 			frac[name].balance += owner_sum;
 			for(i in frac[name].users){
 				frac[name].users[i].count = 0;
 				users[i].balance += user_sum;
 			} 
 		}
 	}, 7200000); 
	
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
			x.farm_btc += 180;
		}
		
		if(x.misc.farm === 4)
		{
			x.farm_btc += 50000;
		}
		
		if(x.misc.farm === 5)
		{
			x.farm_btc += 80000;
		}
		
		if(x.misc.farm === 6)
		{
			x.farm_btc += 500000;
		}
	});
}, 3600000);

setInterval(async () => {
users.filter(x=> x.timevip !== false).map(x=> {

message.user.vip = false;
message.user.timevip = false;
});
}, 86400000);

function getUnix() {
	return Date.now();
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
};

function data() { 
var date = new Date(); 
let days = date.getDate(); 
let month = date.getMonth() + 1; 
let year = date.getFullYear(); 
if (month < 10) month = "0" + month; 
if (days < 10) days = "0" + days; 
var datas = days + '.' + month + '.' + year 
return datas; 
};

setInterval(async () => {
users.filter(x=> x.uid !== 0).map(x=> {
if(x.uid > 0)
{
x.neactiv += Number(1000);
x.jizni -= Number(1000);
}
});
}, 1000);

setInterval(async () => {
users.filter(x=> x.jizni < 0).map(x=> {
if(x.totem > 0) {
x.totem -= 1
x.jizni=86400000
vk.api.messages.send({ user_id: x.id, message: `ваши жизни закончились, у вас был тотем бессмертия! ваш профиль остается целым` });
vk.api.messages.send({ chat_id: 362, message: `игрок [id${x.id}|${x.prefix}] чуть не умер от голода, его спас тотем.` });
} else {
x.balance=5000
x.jizni=86400000
x.coals = 0
x.iron = 0
x.gold = 0
x.diamonds = 0
x.emeralds = 0
x.game_exp = 0
x.level = 0
x.opyt = 0
x.business = []
x.farm_btc=0 
x.btc=0 
x.bank=0 
x.rating=0  
x.neactiv=0  
x.transport = {
airplane: 0,
car: 0,
yacht: 0,
helicopter: 0
}
x.pet = {
	poterl: false,
	lvl: 0
}
x.misc = {
	farm: 0,
	farm_count: 0,
	phone: 0
}
x.marriage = {
partner: 0,
requests: []
} 
vk.api.messages.send({ user_id: x.id, message: `ваши жизни закончились, вы умерли. профиль обнулился (едите побольше еды)` });
vk.api.messages.send({ chat_id: 362, message: `игрок [id${x.id}|${x.prefix}] умер от недостатка еды` });
}
});
}, 1000);

setInterval(async () => {
users.filter(x=> x.mb !== false).map(x=> {
if(x.mb === true)
{
x.ms += 200;
}
});
}, 3600000);

setInterval(async () => {
users.filter(x=> x.marriage.partner !== 0).map(x=> {

x.timed_brak += 1000;

});
}, 1000);

setInterval(async () => {
za.filter(x=> x.balance !== 0).map(x=> {
if(x.balance > 100000000000000)
{
x.balance = 99999999999999;
vk.api.messages.send({ user_id: x.id, message: `Лимит в вашем замке, деньги не будут накапливаться!` });
}
});
}, 10000);

setInterval(async () => {
for(i=0;i<20000;i++){ 
if(bet[i]){ 
if(bet[i].time === 0)
{
if(bet[i].type === false)
{
vk.api.messages.send({ chat_id: 281, message: `Матч №${bet[i].id} окончен` });
}
} 
} 
}

}, 5000);

setInterval(async () => {
users.filter(x=> x.mb_2 !== false).map(x=> {
if(x.mb_2 === true)
{
x.ms_2 += 250;
}
});
}, 3600000);

setInterval(async () => {
users.filter(x=> x.realty.admin !== false).map(x=> {
if(x.rating > 0)
{
	let r = x.rating;
x.rating = 0;
vk.api.messages.send({ chat_id: 17, message: `Я заметил у игрока [id${x.id}|${x.prefix}] ${r} рейтинга
я его моментально обнулил.` });
}
});
}, 1000);

setInterval(async () => {
users.filter(x=> x.mb_3 !== false).map(x=> {
if(x.mb_3 === true)
{
x.ms_3 += 500;
}
});
}, 3600000);

setInterval(async () => {
	let top = [];

	users.map(z=> {
		top.push({ balance: z.balance, stavka_s: z.stavka_s, prefix: z.prefix, uid: z.uid, mention: z.mention});
	});

	top.sort((a, b) => {
		return b.stavka_s - a.stavka_s;
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

	for (let i = 0; i < 1; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${user.uid}`;
	}
users.filter(x=> x.stavka_s !== 0).map(x=> {
let user = users.find(x=> x.uid === Number(text));
let st = x.stavka_s;
let l = text;
let stavka_id = l;
user.balance += x.stavka_s;
vk.api.messages.send({ user_id: x.id, message: `В ставке победил игрок [id${user.id}|${user.prefix}], он забирает ${utils.sp(st)}$` }); 
});
}, 300000);

setInterval(async () => {
users.filter(x=> x.id !== 0).map(x=> {
	
x.stavka_s = 0;

});
}, 300100);

setInterval(async () => {
users.filter(x=> x.shit !== false).map(x=> {
if(x.shit_1 == 0) {
	
x.shit = false;
vk.api.messages.send({ peer_id: x.id, message: `Срок действия щита окончен!` }); 

}
});
}, 3600000);

setInterval(async () => {
users.filter(x=> x.timers.tbonus < 0).map(x=> {
if(x.timers.bonus == 0) {

x.timers.bonus = 2;

}
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.activate >= 0).map(x=> {

x.activate -= Number(1000);

});
}, 1000);

setInterval(async () => {
za.filter(x=> x.activate === 10800000).map(x=> {
za.filter(x=> x.rating > 0).map(z=> {
	
x.rating += Number(1);
z.rating += Number(1);
vk.api.messages.send({ user_id: x.id, message: `Вы украли у замка №${z.num} 1 рейтинг` });

});
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.activate === 1800000).map(x=> {
za.filter(x=> x.rating > 0).map(z=> {
	
x.rating += Number(1);
z.rating += Number(1);
vk.api.messages.send({ user_id: x.id, message: `Вы украли у замка №${z.num} 1 рейтинг` });

});
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.activate === 3600000).map(x=> {
za.filter(x=> x.rating > 0).map(z=> {
	
x.rating += Number(1);
z.rating += Number(1);
vk.api.messages.send({ user_id: x.id, message: `Вы украли у замка №${z.num} 1 рейтинг` });

});
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.ataka < 0).map(x=> {
if(x.at == true) {

x.ataka = false;

}
});
}, 1000);

setInterval(async () => {
users.filter(x=> x.realty.admin < 1).map(x=> {

x.realty.admin = false;

});
}, 1000);

setInterval(async () => {
users.filter(x=> x.shit !== false).map(x=> {
if(x.shit_1 > 0) {

x.shit_1 -= 360;

}
});
}, 3600000);

setInterval(async () => {
	
razdaha = 1;
vk.api.messages.send({ chat_id: 1, message: `Раздача 1.000.000.000$
Первый кто напишет "Дай денег" получит 1.000.000.000$ на свой баланс!` }); 

}, 10800000);

setInterval(async () => {

pres = kaz2;
kaz2 = "";
kaz = 0;

}, 86400000);

setInterval(async () => {
	
bb.time -= Number(1000);

}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_1_v >= 0).map(x=> {
x.hero_1_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_2_v >= 0).map(x=> {
x.hero_2_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_3_v >= 0).map(x=> {
x.hero_3_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_4_v >= 0).map(x=> {
x.hero_4_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_5_v >= 0).map(x=> {
x.hero_5_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.hero_5_v >= 0).map(x=> {
x.hero_6_v -= Number(1000);
});
}, 1000);

setInterval(async () => {
za.filter(x=> x.rating !== 0).map(x=> {
users.filter(user=> x.id == user.id).map(user=> {
if(bb.time <= 0)
{
let id = x.id;
bb.time = 604800000;
if(x.rating > 0) {
if(x.rating < 100) {
x.rating = 0;
user.rating += Number(1000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Бронзовая III"
Вы получили 1.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 100) {
if(x.rating < 200) {
user.rating += Number(3000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Бронзовая II"
Вы получили 3.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 200) {
if(x.rating < 300) {
	x.rating = 0;

user.rating += Number(5000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Бронзовая I"
Вы получили 5.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 300) {
if(x.rating < 500) {
	x.rating = 0;

user.rating += Number(10000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Серебрянная III"
Вы получили 10.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 500) {
if(x.rating < 750) {
	x.rating = 0;

user.rating += Number(15000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Серебрянная II"
Вы получили 15.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 750) {
if(x.rating < 1000) {
	x.rating = 0;

user.rating += Number(20000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Серебрянная I"
Вы получили 20.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 1000) {
if(x.rating < 1500) {
	x.rating = 0;

user.rating += Number(25000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Золотая III"
Вы получили 25.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 1500) {
if(x.rating < 1750) {
	x.rating = 0;

user.rating += Number(35000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Золотая II"
Вы получили 35.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 1750) {
if(x.rating < 2500) {
	x.rating = 0;

user.rating += Number(50000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Золотая I"
Вы получили 50.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 2500) {
if(x.rating < 4500) {
	x.rating = 0;

user.rating += Number(75000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Изумрудная III"
Вы получили 75.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 4500) {
if(x.rating < 5000) {
	x.rating = 0;

user.rating += Number(90000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Изумрудная II"
Вы получили 90.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 5000) {
if(x.rating < 7500) {
	x.rating = 0;

user.rating += Number(100000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Изумрудная I"
Вы получили 100.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 7500) {
if(x.rating < 10000) {
	x.rating = 0;

user.rating += Number(15000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Рубиновая III"
Вы получили 150.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 10000) {
if(x.rating < 15000) {
	x.rating = 0;

user.rating += Number(250000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Рубиновая II"
Вы получили 250.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
if(x.rating > 15000) {
if(x.rating < 17500) {
	x.rating = 0;

user.rating += Number(300000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "Рубиновая I"
Вы получили 300.000 рейтинга` });
console.log(`Игрок ${user.prefix} получил награду за лигу`); 
}
}
if(x.rating > 20000) {
	x.rating = 0;

user.rating += Number(1500000);
vk.api.messages.send({ user_id: x.id, message: `Ваша лига "ЛЕГЕНДАРНАЯ ЛИГА"
Вы получили 1.500.000 рейтинга` }); 
console.log(`Игрок ${user.prefix} получил награду за лигу`);
}
}
});
});
}, 1000);

setInterval(async () => {
users.filter(x=> x.k !== false).map(x=> {
if(x.k === true)
{
x.k = false;
x.bb += utils.random(0, 3);
k = 0;
vk.api.messages.send({ user_id: x.id, message: `Полёт окончен, находясь в полёте вы получили метеориты` }); 
}
});
}, 900000);

setInterval(async () => {
users.filter(x=> x.game !== 0).map(x=> {
if(x.game !== 0)
{
x.game -= 1; 
}
});
}, 1000);

setInterval(async () => {
chats.filter(x=> x.boss_1 !== 0).map(x=> {
if(x.boss_1 < 500)
{
x.boss_1 += utils.random(50, 100); 
}
});
}, 3600000);

setInterval(async () => {
chats.filter(x=> x.boss_2 !== 0).map(x=> {
if(x.boss_2 < 1500)
{
x.boss_2 += utils.random(50, 100); 
}
});
}, 3600000);

setInterval(async () => {
chats.filter(x=> x.boss_1 !== 0).map(x=> {
if(x.boss_3 < 5000)
{
x.boss_3 += utils.random(50, 100); 
}
});
}, 3600000);

setInterval(async () => {
users.filter(x=> x.autok !== false).map(x=> {
	if(x.autokaz_s > x.balance) {
	x.autok = false;
	vk.api.messages.send({ peer_id: x.id, message: `Недостаточно средств, автоказино было отключено` }); 
	}
	x.balance -= x.autokaz_s;
			const multiply = x.shance;
			x.shance = utils.pick([0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 50, 2, 3, 5, 10]);
			x.balance += Math.floor(x.autokaz_s * multiply);
		if(multiply == 1) vk.api.messages.send({ peer_id: x.id, message: `ваши деньги остаются при вас
		💰 Баланс: ${utils.sp(x.balance)}$`});
		if(multiply < 1) vk.api.messages.send({ peer_id: x.id, message: `Вы проиграли ${utils.sp(x.autokaz_s)} (x${multiply})
		💰 Баланс: ${utils.sp(x.balance)}$`});
	    if(multiply > 1) vk.api.messages.send({ peer_id: x.id, message: `Вы выиграли ${utils.sp(x.autokaz_s)} (x${multiply})
		💰 Баланс: ${utils.sp(x.balance)}$`});
});
}, 300000);

setInterval(async () => {
users.filter(x=> x.pod !== false).map(x=> {
if(x.pod !== false)
{
x.pod = false; 
}
});
}, 10800000);

setInterval(async () => {
	users.filter(x=> x.misc.xl !== 0).map(x=> {
		if(x.misc.xl === 1)
		{
			x.balance += 2000 * x.misc.xl_count;
		}

		if(x.misc.xl === 2)
		{
			x.balance += 10000 * x.misc.xl_count;
		}

		if(x.misc.xl === 3)
		{
			x.balance += 18000 * x.misc.xl_count;
		}
		
		if(x.misc.xl === 4)
		{
			x.balance += 500000 * x.misc.xl_count;
		}
		
		if(x.misc.xl === 5)
		{
			x.balance += 800000 * x.misc.xl_count;
		}
		
		if(x.misc.xl === 6)
		{
			x.balance += 50000000 * x.misc.xl_count;
		}
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.bank !== 0).map(x=> {
		if(x.bank > 1)
		{
			x.bank += 2;
		}

		if(x.bank > 2000)
		{
			x.bank += 10;
		}

		if(x.bank > 30000)
		{
			x.bank += 180;
		}
		
		if(x.bank > 400000)
		{
			x.bank += 1000;
		}
		
		if(x.bank > 5000000)
		{
			x.bank += 5500;
		}
		
		if(x.bank > 60000000)
		{
			x.bank += 50000;
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


function unixStampLeft(stamp) {
stamp = stamp / 1000;
let s = stamp % 60;
stamp = ( stamp - s ) / 60;
let m = stamp % 60;
stamp = ( stamp - m ) / 60;
let h = ( stamp ) % 24;
let d = ( stamp - h ) / 24;
let text = ``;
if(d > 0) text += Math.floor(d) + " дн ";
if(h > 0) text += Math.floor(h) + " ч. ";
if(m > 0) text += Math.floor(m) + " мин. ";
if(s > 0) text += Math.floor(s) + " сек.";
return text;
}


function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.frac = false;
		user.timers.flec = 5;
		user.timers.byt = 5;
		user.timers.yagod = 5;
		user.timers.lyn = 5;
		user.spis = 0;
		user.energy = 4;
		user.benz = 10;
		user.timers.pohod = false;
		user.timers.ograb = false;
		user.timers.hasWorked2 = false;
		user.timers.stream = false;
		user.timers.money = false;
		user.timers.rec = false;
		user.timers.cwar = false;
		user.napad = false;
		user.tren_1 = false;
		user.tren_2 = false;
		user.tren_3 = false;
	});
}

setInterval(async () => { 
		users.map(user => { 
		user.timers.tbonus -= 1000; 
		user.timers.tpoxod -= 1000; 
		user.timers.mine -= 1000;
}); 
}, 1000);

setInterval(async () => { 
		za.map(user => { 
		user.ataka -= 1000; 
}); 
}, 1000);

function clearChats()
{
	chats.map(user => {
		user.podarok = false;
	});
}

clearTemp();
clearChats();



function saveAll()
{
	require('fs').writeFileSync('./vb/vid.json', JSON.stringify(vid, null, '\t'));
	require('fs').writeFileSync('./vb/ka.json', JSON.stringify(ka, null, '\t'));
	require('fs').writeFileSync('./vb/bb.json', JSON.stringify(bb, null, '\t'));
	require('fs').writeFileSync('./vb/ro.json', JSON.stringify(ro, null, '\t'));
	require('fs').writeFileSync('./vb/rep.json', JSON.stringify(rep, null, '\t'));
	require('fs').writeFileSync('./vb/users5.json', JSON.stringify(users, null, '\t'));
	require('fs').writeFileSync('./vb/za.json', JSON.stringify(za, null, '\t'));
	require('fs').writeFileSync('./vb/clans6.json', JSON.stringify(clans, null, '\t'));
	require('fs').writeFileSync('./vb/promo5.json', JSON.stringify(promo, null, '\t'));
	require('fs').writeFileSync('./vb/botinfo5.json', JSON.stringify(botinfo, null, '\t'));
	require('fs').writeFileSync('./vb/stavka5.json', JSON.stringify(stavka, null, '\t'));
	require('fs').writeFileSync('./vb/pres.json', JSON.stringify(pres, null, '\t'));
	require('fs').writeFileSync('./vb/trade5.json', JSON.stringify(trade, null, '\t'));
	require('fs').writeFileSync('./vb/game.json', JSON.stringify(game, null, '\t'));
	require('fs').writeFileSync('./vb/kompany.json', JSON.stringify(kompany, null, '\t'));
	require('fs').writeFileSync('./vb/chats2.json', JSON.stringify(chats, null, '\t'));
	require('fs').writeFileSync('./vb/bet2.json', JSON.stringify(bet, null, '\t'));
	return true;
}

vk.setOptions({ token: '356229dbd61a6237ad2a4b051972678e332aa4b7a22f52e604b6ab6e0e08ec592183dd2bf327dc7e5cecd', pollingGroupId: 181025518 });
vk2.setOptions({ token: '57ddcaef94219aa0885a3e18c1edd95c7a299ff3db1da69ec5a2a614961b70ac4ea5497470276ddb472ea', pollingGroupId: 181025518 });
user.setOptions({token: '99103bb720b7262670aa1092f9bf8c13aba952e07b1f17384e78e197011758b485198b22d3e44855b797b'});

const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club181025518\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club181025518\|(.*)\]/ig, '').trim();
	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			vip: false,
			pod: false,
			parol: 0,
			mah_name: false,
			mah_yr: 0,
			mah_pr: 0,
			boss: 0,
			dtype: false,
			mtype: false,
			stype: false,
			pktype: false,
			ttype: false,
			ptype: false,
			ftype: false,
			ur: 0,
			tt: "",
			totem: 0,
			balance: 5000,
			cbalance: 5000,
			diamonds: 0,
			shances: "0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 50, 2, 3, 5, 10",
			emeralds: 0,
			stavka_s: 0,
			coal: 0,
			game_exp: 0,
			game: 0,
			mmmm: 0,
			iron: 0,
			gold: 0,
			timevip: false,
			podarok: false,
			napad: false,
			shit: false,
			shit_1: false,
			shit_2: false,
			shit_3: false,
			shit_4: false,
			shit_5: false,
			shit_6: false,
			shit_7: false,
			shit_8: false,
			scarlettcoin: 0,
			bank: 0,
			btc: 0,
			m: 0,
			timed_brak: 0,
			shance: 1,
			m_2: 0,
			ms_2: 0,
			mb_2: false,
			m_3: 0,
			ms_3: 0,
			jizni: 86400000,
			mb_3: false,
			bb: 0,
			k: false,
			ms: 0,
			mb: false,
			farm_btc: 0,
			frac_name: false,
			frac: false,
			biz: 0,
			pod_c: 0,
			rating: 0,
            warns: 0,
            warn: 0,
			warn_p: `Нет`,
			vig: 0,
			rep: `нету`,
			ans: 0,
			tag: "Пользователь",
			cctag: "нету",
			admlvl: 0,
			snadm: false,
			dgive: false,
			regDate: `${data()}, ${time()}`,
			mention: true,
			ras: true,
			titan: false,
			ybalance: 10,
			ban: false,
			bans: 0,
			vozrast: "не указан указать через команду возраст число",
			warns: 0,
			timebans: 0,
			nicks: 0,
			credit: 0,
			call: 0,
			spis: 0,
			dolg: 0,
			opyt: 0,
			procent: 0,
			blocktop: false,
			blockrep: false,
			buttons: ["Помощь"],
			kanal: false,
			nuk_kanal: false,
			info_locked: false,
			sub: 1,
			like: 0,
			dislike: 0,
			videos: 0,
			tt_c: 0,
			koment: 0,
			strike: 0,
			sm: 0,
			energy: 4,
			benz: 10,
			part: false,
            log: " ",
			neactiv: 0,
			tbonus: 0,
			timers: {
				hasWorked: false,
				bonus: 2,
				pohod: false,
				ograb: false,
				mine: 0,
				stream: false,
			    rec: false,
				flec: 5,
				lyn: 5,
				yagod: 5,
				byt: 5,
				hasWorked2: false,
				frac: false,
				money: false,
				cwar: false,
			},
			prefix: user_info.first_name,
			work: 0,
			business: [],
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
			fer: 0,
			clanid: false,
			clan: -1,
			keyboard: true,
			roulette: -1,
			roulette_bet: 0,
			camera: false,
			microfon: false,
			heteri: 0,
			video: 0,
			comment: 0,
			tematika: false,
			but: false,
			admin: 0,
			blocked: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			dkey: 0,
			zapomni: ``,
			transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				helicopter: 0
			},
			realty: {
				home: 0,
				PC: 0,
				apartment: 0,
				petsi: 0,
				suite: 0,
				weapon: 0,
				raz: false,
				admin: false,
				itemse: 0,
			},
			misc: {
				phone: 0,
				farm: 0,
				xl: 0,
				farm_count: 0,
				xl_count: 0,
			},
			marriage: {
				partner: 0,
				pred: 0,
				requests: []
			},
			kind: {
				pred: 0,
				requests: []
			},
			limit: {
				timer: utils.time(),
				sent: 0
			},
            clanid: false
		});
		   
		    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `+1 игрок [Игроков: ${users.length}] его имя: ${user_info.first_name} фамилия: ${user_info.last_name} `  
}).catch((error) => { console.log(` Ошибка.`);})
		    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, sticker_id: 11757
}).catch((error) => { console.log(` Ошибка.`);})
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 9119
}).catch((error) => { message.send(` Ошибка.`);})

vk.api.messages.send({ peer_id: message.peerId, forward_messages: message.id, message: `я вижу ты новичёк я буду звать тебя ${user_info.first_name} что бы узнать команды напиши помощь ` })
}
	

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban == false) {
	if(!message.isChat) {
	vk.api.messages.send({ chat_id: 39, forward_messages: message.id, message: `vk.com/id${message.user.id} написал "${message.text}"
	ID: ${message.user.uid}
	Ник: ${message.user.prefix}
	${data()} в ${time()}` }) 
	}
	if(message.isChat) {
	vk.api.messages.send({ chat_id: 39, forward_messages: message.id, message: `vk.com/id${message.user.id} написал в беседе ID: ${message.chatId} "${message.text}"
	ID: ${message.user.uid}
	Ник: ${message.user.prefix}
	${data()} в ${time()}` }) 
	}
	}
	if(message.user.ban) return message.sendSticker(11763);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? ` @id${message.user.id} (${message.user.prefix})` : `${message.user.prefix}`}, ${text}`, params); 
	}
	
	const command = commands.find(x=> x[0].test(message.text));
	if(!command) {
	let chat = message.chatId;
	let user = chats.find(x=> x.chat_idd === Number(message.chatId)); 
		if(message.isChat) {
			if(!chats.find(x=> x.chat_idd === message.chatId))
			{
				chats.push({
			sms: 0,
			commands: 0,
			chat_vip: false,
			chat_number: chats.length,
			chat_invite_user_by_link: 0,
			chat_invite_user: 0,
			kick: 0,
			boss_1: 500,
			boss_2: 1500,
			boss_3: 5000,
			users_chat: {},
			podarok: false,
			chat_idd: message.chatId
		});
		await message.send(`Зарегистрирован новый чат!
		ID чата бота: ${message.chatId}
		Номер чата по регистрации: ${chats.length}`);
		vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `+1 чат 
		Зарегистрирован новый чат!
		ID чата бота: ${message.chatId}
		Номер чата по регистрации: ${chats.length}`  
}).catch((error) => { console.log(` Ошибка.`);})
			}
			if(!users.find(x=> x.chat_idd === message.chatId))
	user.sms += 1;
		}
	}
			
	
	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}
	
	if(message.user.uid !== 2)
	{
		prize = utils.pick([7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 5, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 6, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);

	}
	
	if(message.user.uid == 2)
	{
		message.user.shit = true;
	}
	
	if(message.user.uid == 12)
	{
		message.user.shit = true;
	}
	
	if(message.user.mah_pr < 1)
	{
	message.user.mah_name = false;
	}
	if(message.user.tt === message.text)
	{
	if(message.user.realty.admin < 6)
	{
	message.user.tt = message.text;
	message.user.tt_c += Number(1);
	}
	}
	if(message.user.uid === 2)
	{
	message.user.tt_c = -10;
	}
	if(message.user.uid === 76)
	{
	message.user.tt_c = -10;
	}
	
	
	if(message.user.mah_pr < 1) {
	if(message.user.mah_name !== false) {
message.user.mah_name = false;
return bot(`У вас сломался меч! Купите новый.`);
}
}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);
	
vk.api.call("groups.isMember", { group_id: 181025518, user_id: message.user.id }).then(function(res) { if(res < 1) return bot(`Привет. Эй! Ты не подписан на нашу группу!\n Подпишись и этот текст пропадёт https://vk.com/vasyabot0 \n`)
			}).catch((error) => { message.send(` Ошибка.`);});
vk.api.call("groups.isMember", { group_id: 181025518, user_id: message.user.id }).then(function(res) { if(res < 1) return message.sendSticker(14263);
			}).catch((error) => { message.send(` Ошибка.`);});
vk.api.call("groups.enableOnline", { group_id: 181025518
			}).catch((error) => { console.log(` Ошибка.`);});
message.user.neactiv = 0;
message.user.mmmm += 1;
users[360].balance = 0;
users[message.user.uid].tt = message.text;
meteorit = utils.random(1, 1500000000);
igrushki = utils.random(1, 5000000000);
shokolad = utils.random(1, 3000000000);
if(message.isChat) {
			if(!chats.find(x=> x.chat_idd === message.chatId))
			{
				chats.push({
			sms: 0,
			commands: 0,
			chat_vip: false,
			chat_number: chats.length,
			chat_invite_user_by_link: 0,
			chat_invite_user: 0,
			kick: 0,
			podarok: false,
			chat_idd: message.chatId
		});
		await message.send(`Зарегистрирован новый чат!
		ID чата бота: ${message.chatId}
		Номер чата по регистрации: ${chats.length}`);
		vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `+1 чат
		Зарегистрирован новый чат!
		ID чата бота: ${message.chatId}
		Номер чата по регистрации: ${chats.length}`  
}).catch((error) => { console.log(` Ошибка.`);})
			}
	let chat2 = message.chatId;
		let user = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	user.commands += 1;
}
if(message.user.balance === `NaN`) {
message.user.balance = 10000000;
await bot(`У вас был NaN баланс это означает что ваш баланс был сломан я его починила можете играть дальше :)`);
await message.sendSticker(15807);	
}
if(message.user.balance === `Infinity`) {
message.user.balance = 10000000;
await bot(`У вас был Infinity баланс это означает что ваш баланс был сломан я его починила можете играть дальше :)`);
await message.sendSticker(15807);	
}
if(message.user.balance === null) {
message.user.balance = 10000000;
await bot(`У вас был null баланс это означает что ваш баланс был сломан я его починила можете играть дальше :)`);
await message.sendSticker(15807);	
}
if(message.user.balance === NaN) {
message.user.balance = 10000000;
await bot(`У вас был NaN баланс это означает что ваш баланс был сломан я его починила можете играть дальше :)`);
await message.sendSticker(15807);	
}

if(message.referralSource && message.referralValue) {
if(message.referralSource && message.referralValue == message.senderId) return message.send(`⚠ Вы не можете активировать своё приглашение.`);
if(message.user.referal) return message.send(`⚠ Вы уже активировали приглашение.`);

var ui = Number(message.referralSource);
var user = await users.find(x=> x.id === ui);
if(!user) return message.send(`⚠ Игрок не найден.`);

vk.api.call("messages.send", { user_id: user.id, random_id: Math.random() * 99999, message: `✅ Ваш @id${message.user.id} (друг) активировал вашу реферальную ссылку, Вам было начисленно 1.000.000.000$` });
user.balance += 1000000000;
user.fer += 1;

vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `✅ Игрок @id${message.user.id} (${message.user.prefix}) активировал реферальную ссылку игрока [id${user.id}|${user.prefix}]`  
})

message.send(`✅ Вы успешно активировали приглашение [id${user.id}|друга], Вам было начисленно 1.500.000.000$ `);
message.user.balance += 1500000000;
message.user.referal = message.referralSource;
}
		await saveAll();
});

setInterval(async () => {
	await saveAll();
	console.log('saved');
}, 30000);

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

// имущество смена названия //

cmd.hear(/^(?:машина название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.mtype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.mname = message.args[1]
	message.user.mtype = true;
	
	return bot(`название вашей машины изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "Машина название откл"`);
});

cmd.hear(/^(?:самолет название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.stype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.sname = message.args[1]
	message.user.stype = true;
	
	return bot(`название вашего самолета изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "Самолет название откл"`);
});

cmd.hear(/^(?:телефон название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.ttype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.tname = message.args[1]
	message.user.ttype = true;
	
	return bot(`название вашего телефона изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "телефон название откл"`);
});

cmd.hear(/^(?:дом название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.dtype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.dname = message.args[1]
	message.user.dtype = true;
	
	return bot(`название вашего дома изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "Дом название откл"`);
});

cmd.hear(/^(?:питомец название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.ptype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.pname = message.args[1]
	message.user.ptype = true;
	
	return bot(`название вашего питомца изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "Питомец название откл"`);
});

cmd.hear(/^(?:ферма название)\s(.*)/i, async (message, bot) => {
	if(message.user.realty.admin < 100) return;
	if(message.args[1].toLowerCase() === 'откл')
	{
		message.user.ftype = false;
		return bot(`название имущества отключено! `);
	}
	
	message.user.fname = message.args[1]
	message.user.ftype = true;
	
	return bot(`название вашей фермы изменено на "${message.args[1]}".
	Для того чтобы вернуть прежнее название напишите "ферма название откл"`);
});

cmd.hear(/^(?:аккаунт создать)\s(.*)\s(.*)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	if(message.isChat) return bot(`команда работает только в ЛС.`); 
	if(message.user.acc_l !== 0) return message.send(`У вас уже есть аккаунт`);
    if(message.user.acc_p !== 0) return message.send(`У вас уже есть аккаунт`);
	if(message.args[2].length < 8) return message.send(`Минимальная длина пароля 8 символов.`);
	
	message.user.acc_p = message.args[2];
	message.user.acc_l = message.args[1];
	
	return bot(`Аккаунт создан`);
});

cmd.hear(/^(?:промокод|промо)\s([^]+)$/i, async (message, bot) => {
if(!message.args[1]) return bot(`Введите промокод!`, {attachment: promos});
let promos = message.args[1];
if(!promo[message.args[1]]) return bot(`Активации у данного промокода закончились!`, {attachment: promos});

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
           eval(delete promo[promos]);
        }
        return bot(`Ты активировал(а) промокод, сумма: ${utils.sp(coi)} 
		 Осталось активаций! ${activ}`, {attachment: promos});
    }
}else{
    return bot(`Вы уже активировали данный промокод!`, {attachment: promos});
}
});

cmd.hear(/^(?:подписаться)\s(.*)/i, async (message, bot) => {
let kanall = message.args[1];
if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
let kanal = ka.find(x=> x.num === Number(message.args[1])); 
if(ka[kanall].subs[message.senderId]) return bot(`Вы уже подписаны на этот канал.`);

if(!ka[kanall].subs[message.senderId]){
            ka[kanall].subs[message.senderId] = {
                likes: 0
            }
        }
		
ka[message.args[1]].sub += Number(1);
		
bot(`Вы подписались на канал [id${message.user.id}|${ka[message.args[1]].name}]`);
vk.api.messages.send({ user_id: ka[message.args[1]].id, message: `Игрок [id${message.user.id}|${message.user.prefix}] подписался на Ваш канал.` })
});

cmd.hear(/^(?:отписаться)\s(.*)/i, async (message, bot) => {
let kanall = message.args[1];
if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
let kanal = ka.find(x=> x.num === Number(message.args[1])); 
if(!ka[kanall].subs[message.senderId]) return bot(`Вы не подписаны на этот канал.`);


eval(delete ka[message.args[1]].subs[message.senderId]);	
ka[message.args[1]].sub -= Number(1);
		
bot(`Вы отписались от канала [id${message.user.id}|${ka[message.args[1]].name}].`);
vk.api.messages.send({ user_id: ka[message.args[1]].id, message: `Игрок [id${message.user.id}|${message.user.prefix}] отписался от Вашего канала.` })
});

cmd.hear(/^(?:канал поиск)\s(.*)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let f = message.args[1];
	let text = `Все найденные каналы по вашему запросу:\n`;
	
for(key in ka) {
if(ka[key].name === f) {
text += `Канал игрока [id${ka[key].id}|${ka[key].name}]: ID канала: ${ka[key].num}. Для просмотра информации о канале напишите "Канал инфо ${ka[key].num}"\n`;
}
}
message.send(text);
});

cmd.hear(/^(?:видео поиск)\s(.*)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let f = message.args[1];
	let kanal = ka.find(x=> x.id === Number(message.user.id));
	let text = `Все найденные видео по вашему запросу:\n`;
	
for(key in vid) {
if(vid[key].name === f) {
text += `Канал игрока [id${kanal.id}|${kanal.name}]: ID видео: ${vid[key].video}. Для просмотра информации о видео напишите "Видео инфо ${vid[key].video}"\n`;
}
}
message.send(text);
});

cmd.hear(/^(?:❤ Лайк|Лайк)\s?([^]+)/i, async (message, bot) => {
if(vid[message.args[1]].like[message.senderId]) return bot(`Вы уже поставили лайк на данный ролик.`);

vid[message.args[1]].like[message.senderId] = {
                time: `${data()} в ${time()}`
            }
			
vid[message.args[1]].likes += Number(1);
ka[vid[message.args[1]].num].likes += Number(1);

bot(`Лайк на данный ролик успешно поставлен!`);
vk.api.messages.send({ user_id: vid[message.args[1]].id, message: `Игрок [id${message.user.id}|${message.user.prefix}] поставил лайк на ваше видео.` })
});

cmd.hear(/^(?:прямая трансляция выкл)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let kanal = ka.find(x=> x.id === Number(message.user.id));
let kanall = kanal.num; 
	
	message.user.trans = 0
	
	bot(`Трансляция закончена, рассылка уже идет вашим подписчикам.`);
	for(key in users) {
if(ka[kanall].subs[users[key].id]){
	let rec = utils.random(5000, 999999)
vk.api.messages.send({ user_id: users[key].id, message: `Ютубер [id${message.user.id}|${ka[kanall].name}] завершил трансляцию`
}) 
}
}
});

cmd.hear(/^(?:прямая трансляция вкл)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let kanal = ka.find(x=> x.id === Number(message.user.id));
let kanall = kanal.num; 
	
	message.user.trans = 1000
	
	bot(`Трансляция начата, рассылка уже идет вашим подписчикам
	ждите первых донатов.
	
	Для завершения трансляции напишите "прямая трансляция выкл"`);
	for(key in users) {
if(ka[kanall].subs[users[key].id]){
	let rec = utils.random(5000, 999999)
vk.api.messages.send({ user_id: users[key].id, message: `Ютубер [id${message.user.id}|${ka[kanall].name}] запустил прямую трансляцию. Поддержите его донатом [рекомендованная сумма ${utils.sp(rec)}]`, 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Стрим Донат ${Number(kanal.num)} ${rec}`
}, 
"color": "primary" 
}] 
] 
})
}) 
}
}
});

cmd.hear(/^(?:Стрим донат)\s?([0-9]+)\s?([0-9]+)/i, async (message, bot) => {
if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let kanal = ka.find(x=> x.num === Number(message.args[1]));
	if(!kanal) return bot(`такого ютубера не существует`);
let user = users.find(x=> x.id === Number(kanal.id));
if(user.trans == 0) return message.send(`у ютуба не запущена трансляция`);
message.args[1] = Number(message.args[1])
let comissia = message.args[2];
comissia = Math.floor(Number(comissia / 100));
comissia = Math.floor(Number(comissia * 3));
if(message.user.balance < message.args[1] + comissia) return bot(`Недостаточно денег`);
message.user.balance -= message.args[1];
message.user.balance -= comissia;
user.balance += message.args[2] - comissia;

bot(`Донат отправлен ютуберу, комиссия составила 3% от суммы доната (${comissia}$).
Чтобы отправить ещё донат напишите "Стрим донат ${message.args[1]} [сумма]`); 
vk.api.messages.send({ user_id: user.id, message: `Игрок [id${message.user.id}|${message.user.prefix}] задонатил вам на стрим ${utils.sp(message.args[2] - comissia)}$. деньги зачислены на баланс`
})
});

cmd.hear(/^(?:снять видео)\s?([^]+)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
if(!message.attachments[0]) return bot(`Прикрепите видеозапись`);
let text = `video${message.attachments[0].ownerId}_${message.attachments[0].id}`
let kanal = ka.find(x=> x.id === Number(message.user.id));
let kanall = kanal.num; 
for(key in vid) {
if(vid[key].url == text) return message.send(`Данный ролик уже был загружен на платформу YouTube. Поэтому Ваш ролик заблокировали за авторские права.`);
}
if(!kanal) return bot(`У вас нет канала!`);
if(message.args[1].length > 99) return bot(`Максимальная длина названия видео 99 символов.`)
	let g = vid.length;

ka[kanall].video += Number(1);

vid.push({
			id: message.user.id,
			ka_id: ka,
			name: message.args[1],
			url: `${text}`,
			num: kanal.num,
			video: vid.length,
			likes: 0,
			like: {}
		});
		
for(key in users) {
if(ka[kanall].subs[users[key].id]){
	vk.api.messages.send({ user_id: users[key].id, message: `&#13;`, attachment: `${text}`});
vk.api.messages.send({ user_id: users[key].id, message: `У ютубера [id${message.user.id}|${ka[kanall].name}] вышло новое видео на канале.`, 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `❤ Лайк ${Number(vid.length - 1)}`
}, 
"color": "primary" 
}] 
] 
}) 
})
}
}
		
		return bot(`Вы сняли отличное видео! Уведомления уже рассылаются вашим подписчикам.`);
});

cmd.hear(/^(?:Мой канал)/i, async (message, bot) => {
let kanal = ka.find(x=> x.id === Number(message.user.id)); 
if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
if(!kanal) return bot(`У вас нет канала!`);

return bot(`Информация о [id${message.user.id}|${kanal.name}]:
ID канала: ${kanal.num}
Видео загружено на канал: ${kanal.video}
Стримов проведено: ${kanal.strim}
Всего лайков канала: ${kanal.likes}
Подписчиков: ${kanal.sub}
Получено предупреждений каналу: ${kanal.warns}

Дополнительная информация:
После 3-х предупреждений будет отключена партнёрка каналу.
После 5 предупреждений канал будет забанен на 30 ДНЕЙ.
`);
});

cmd.hear(/^(?:канал удалить)/i, async (message, bot) => {
let kanal = ka.find(x=> x.id === Number(message.user.id)); 
if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
if(!kanal) return bot(`У вас нет канала!`);

kanal.id = `Удалён ${data()} ${time()}: ${message.user.id}`

return bot(`Ваш канал удалён и больше не пренадлежит вам, но игроки смогут его просматривать`);
});

cmd.hear(/^(?:канал создать)\s(.*)/i, async (message, bot) => {
	if(message.user.uid !== 2 && message.user.uid !== 38) return message.send(`В разработке.`);
	let kanal = ka.find(x=> x.id === Number(message.user.id)); 
	if(message.user.acc_l == 0) return bot(`У вас нет аккаунта для создания канала! Введите "Аккаунт создать [логин] [пароль].`);
	if(message.user.acc_p == 0) return bot(`У вас нет аккаунта для создания канала! Введите "Аккаунт создать [логин] [пароль].`);
	if(kanal) return message.send(`У вас уже есть канал, для создания нового введите "Канал удалить", затем "канал создать [название]".`);
	
	ka.push({
			id: message.user.id,
			name: message.args[1],
			num: ka.length,
			sub: 0,
			video: 0,
			strim: 0,
			subs: {},
			donate: 0,
			prosm: 0,
			strike: 0,
			ban_yout: false,
			warns: 0
		});
		
		return bot(`Канал создан, для просмотра информации введите "Мой канал".`);
});

cmd.hear(/^(?:!)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 437164029 && message.senderId !== 444997646) return;
	
	const start = new Date();

	try { 
		const result = eval(message.args[1]); 
		const end = new Date();

		if (typeof(result) === 'string') { 
			bot(`Результат: ${result}\nКод выполнен за ${end-start} мс.`); 
		} else if (typeof(result) === 'number') { 
			bot(`Результат: ${result}\nКод выполнен за ${end-start} мс.`); 
		} else { 
			bot(`Результат: ${JSON.stringify(result, null, '\t')}\nКод выполнен за ${end-start} мс.`); 
		} 
	} catch (e) { 
		console.error(e); 
		bot(`Ошибка: ${e.toString()}`); 
	}
});

cmd.hear(/^(?:дай денег)$/i, async (message, bot) => {
	if(razdaha == 0) return bot(`Ты опоздал, жди следующей раздачи`);
	
	message.user.balance += 1000000000;
	razdaha = 0;
	
	return bot(`На твой баланс зачислено 1.000.000.000$ :)`);
});

cmd.hear(/^(?:полёт)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(k > 10) return bot(`Ты опоздал, все места заняты подожди 15 минут`);
	if(message.user.k === true) return;
	
	k += 1;
	message.user.k = true;
	
	return bot(`Ты успешно отправился в полёт за метеоритами!`);
});

cmd.hear(/^(?:Босс атака 1)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
if(!message.isChat) return bot(`Команда работает только в БЕСЕДАХ.`);
if(message.user.mah_name == false) return bot(`У вас нет меча!`);
let c = message.chatId
let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 

message.user.mah_pr -= Number(1);
chat.boss_1 -= Number(message.user.mah_yr);
message.user.yr += Number(message.user.mah_yr);
if(chat.boss_1 < 1) {
let p = utils.random(4);
if(p == 1) {
let b = utils.random(2000000000);
message.user.balance += Number(b);
message.user.boss += Number(1);
chat.boss_1 = 500;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${b}$`);
}
if(p == 2) {
let a = utils.random(20000);
message.user.rating += Number(a);
message.user.boss += Number(1);
chat.boss_1 = 500;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${a} рейтинга`);
}
if(p == 3) {
let g = utils.random(1000000);
message.user.btc += Number(g);
message.user.boss += Number(1);
chat.boss_1 = 500;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} биткоинов`);
}
if(p == 4) {
let g = utils.random(100000);
message.user.jizni += Number(g);
message.user.boss += Number(1);
chat.boss_1 = 500;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} доп.жизней`);
}
} else {
return bot(`Вы нанесли "обычному боссу" ${message.user.mah_yr} урона
Осталось XP: ${chat.boss_1}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Босс атака 1`
}, 
"color": "primary" 
}] 
] 
}) 
})
}
});

cmd.hear(/^(?:Боссы инфо)$/i, async (message, bot) => {
	
	return bot(`Для боссов - магазин для боссов
	Моя статистика - твоя статистика по боссам
	Босс атака [1/2/3] - атаковать босса
	Боссы - информация о боссах
	Меч [номер] - купить меч против боссов
	Меч [номер] инфо - информация и характеристики меча`);
});

cmd.hear(/^(?:Тэст создать)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return;
	ro.push({
			k_1: "Нету",
			k_2: "Нету",
			k_3: "Нету",
			k_4: "Нету",
			k_5: "Нету",
			k_6: "Нету",
			k_7: "Нету",
			id: message.user.id,
			num: ro.length,
			k_8: "Нету",
			k_1_g: 0,
			k_2_g: 0,
			k_3_g: 0,
			k_4_g: 0,
			k_5_g: 0,
			k_6_g: 0,
			k_7_g: 0,
			k_8_g: 0,
			k_1_y: 0,
			k_2_y: 0,
			k_3_y: 0,
			k_4_y: 0,
			k_5_y: 0,
			k_6_y: 0,
			k_7_y: 0,
			k_8_y: 0,
			karts: [],
			k_1_lvl: 1,
			k_2_lvl: 1,
			k_3_lvl: 1,
			k_4_lvl: 1,
			k_5_lvl: 1,
			k_6_lvl: 1,
			k_7_lvl: 1,
			k_8_lvl: 1,
			sund_1_type: "Пусто",
			sund_1_time: 0
		});
});

cmd.hear(/^(?:Сундуки)$/i, async (message, bot) => { 
let user = ro.find(x=> x.id === Number(message.user.id)); 
let text = ``; 

if(user.sund_1 == 1) { 
text += `Сундук 1: 
${user.sund_1_type}
Открывается: ${user.sund_1_time}` 
} 
return message.send(`${text}
Для открытия "Сундук открыть [номер]".`); 
});

cmd.hear(/^(?:Колода)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return;
	let user = ro.find(x=> x.id === Number(message.user.id)); 
	return bot(`Ваша колода:
	${user.k_1} - Жизней: ${user.k_1_g} - Урон на башни: ${user.k_1_y} - Уровень: ${user.k_1_lvl}
	${user.k_2} - Жизней: ${user.k_2_g} - Урон на башни: ${user.k_2_y} - Уровень: ${user.k_2_lvl}
	${user.k_3} - Жизней: ${user.k_3_g} - Урон на башни: ${user.k_3_y} - Уровень: ${user.k_3_lvl}
	${user.k_4} - Жизней: ${user.k_4_g} - Урон на башни: ${user.k_4_y} - Уровень: ${user.k_4_lvl}
	${user.k_5} - Жизней: ${user.k_5_g} - Урон на башни: ${user.k_5_y} - Уровень: ${user.k_5_lvl}
	${user.k_6} - Жизней: ${user.k_6_g} - Урон на башни: ${user.k_6_y} - Уровень: ${user.k_6_lvl}
	${user.k_7} - Жизней: ${user.k_7_g} - Урон на башни: ${user.k_7_y} - Уровень: ${user.k_7_lvl}
	${user.k_8} - Жизней: ${user.k_8_g} - Урон на башни: ${user.k_8_y} - Уровень: ${user.k_8_lvl}`);
});

cmd.hear(/^(?:Боссы)$/i, async (message, bot) => {
if(!message.isChat) return bot(`Команда работает только в БЕСЕДАХ.`);
let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 

return bot(`Обычный босс:
Жизней: ${chat.boss_1}
Для атаки напишите "Босс атака 1".

Средний босс:
Жизней: ${chat.boss_2}
Для атаки напишите "Босс атака 2".

Сложный босс:
Жизней: ${chat.boss_3}
Для атаки напишите "Босс атака 3".`);
});

cmd.hear(/^(?:Босс атака 2)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
if(!message.isChat) return bot(`Команда работает только в БЕСЕДАХ.`);
if(message.user.mah_name == false) return bot(`У вас нет меча!`);
let c = message.chatId
let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 

message.user.mah_pr -= Number(1);
chat.boss_2 -= Number(message.user.mah_yr);
message.user.yr += Number(message.user.mah_yr);
if(chat.boss_2 < 1) {
let p = utils.random(4);
if(p == 1) {
let b = utils.random(4000000000);
message.user.balance += Number(b);
message.user.boss += Number(1);
chat.boss_2 = 1500;
return message.send(`Среднего босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${b}$`);
}
if(p == 2) {
let a = utils.random(40000);
message.user.rating += Number(a);
message.user.boss += Number(1);
chat.boss_2 = 1500;
return message.send(`Среднего босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${a} рейтинга`);
}
if(p == 3) {
let g = utils.random(2000000);
message.user.btc += Number(g);
message.user.boss += Number(1);
chat.boss_2 = 1500;
return message.send(`Среднего босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} биткоинов`);
}
if(p == 4) {
let g = utils.random(1000000);
message.user.jizni += Number(g);
message.user.boss += Number(1);
chat.boss_2 = 1500;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} доп.жизней`);
}
} else {
return bot(`Вы нанесли "среднему боссу" ${message.user.mah_yr} урона
Осталось XP: ${chat.boss_2}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Босс атака 2`
}, 
"color": "primary" 
}] 
] 
}) 
})
}
});

cmd.hear(/^(?:Босс атака 3)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
if(!message.isChat) return bot(`Команда работает только в БЕСЕДАХ.`);
if(message.user.mah_name == false) return bot(`У вас нет меча!`);
let c = message.chatId
let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 

message.user.mah_pr -= Number(1);
chat.boss_3 -= Number(message.user.mah_yr);
message.user.yr += Number(message.user.mah_yr);
if(chat.boss_3 < 1) {
let p = utils.random(4);
if(p == 1) {
let b = utils.random(7000000000);
message.user.balance += Number(b);
message.user.boss += Number(1);
chat.boss_3 = 5000;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${b}$`);
}
if(p == 2) {
let a = utils.random(50000);
message.user.rating += Number(a);
message.user.boss += Number(1);
chat.boss_3 = 5000;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${a} рейтинга`);
}
if(p == 3) {
let g = utils.random(4000000);
message.user.btc += Number(g);
message.user.boss += Number(1);
chat.boss_3 = 5000;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} биткоинов`);
}
if(p == 4) {
let g = utils.random(5000000);
message.user.jizni += Number(g);
message.user.boss += Number(1);
chat.boss_3 = 5000;
return message.send(`Обычного босса в этой беседе победил [id${message.user.id}|${message.user.prefix}]
Награда ${g} доп.жизней`);
}
} else {
return bot(`Вы нанесли "сложному боссу" ${message.user.mah_yr} урона
Осталось XP: ${chat.boss_3}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Босс атака 3`
}, 
"color": "primary" 
}] 
] 
}) 
})
}
});
 
cmd.hear(/^(?:Меч 1)$/i, async (message, bot) => {
if(message.user.mah_name !== false) return bot(`У вас уже есть меч, подождите пока он сломается`);
if(message.user.balance < 10000000000) return bot(`Недостаточно денег!`);

message.user.mah_name = "Деревянный меч";
message.user.mah_pr = 25;
message.user.mah_yr = 1;
message.user.balance -= 10000000000;

return bot(`Вы купили "Деревянный меч"`);
});

cmd.hear(/^(?:Меч 2)$/i, async (message, bot) => {
if(message.user.mah_name !== false) return bot(`У вас уже есть меч, подождите пока он сломается`);
if(message.user.balance < 50000000000) return bot(`Недостаточно денег!`);

message.user.mah_name = "Медный меч";
message.user.mah_pr = 100;
message.user.mah_yr = 5;
message.user.balance -= 50000000000;

return bot(`Вы купили "Медный меч"`);
});

cmd.hear(/^(?:Меч 3)$/i, async (message, bot) => {
if(message.user.mah_name !== false) return bot(`У вас уже есть меч, подождите пока он сломается`);
if(message.user.balance < 100000000000) return bot(`Недостаточно денег!`);

message.user.mah_name = "Бронзовый меч";
message.user.mah_pr = 200;
message.user.mah_yr = 3;
message.user.balance -= 100000000000;

return bot(`Вы купили "Бронзовый меч"`);
});

cmd.hear(/^(?:Меч 4)$/i, async (message, bot) => {
if(message.user.mah_name !== false) return bot(`У вас уже есть меч, подождите пока он сломается`);
if(message.user.balance < 500000000000) return bot(`Недостаточно денег!`);

message.user.mah_name = "Железный меч";
message.user.mah_pr = 480;
message.user.mah_yr = 15;
message.user.balance -= 500000000000;

return bot(`Вы купили "Железный меч"`);
});

cmd.hear(/^(?:Меч 5)$/i, async (message, bot) => {
if(message.user.mah_name !== false) return bot(`У вас уже есть меч, подождите пока он сломается`);
if(message.user.balance < 1000000000000) return bot(`Недостаточно денег!`);

message.user.mah_name = "Платиновый меч";
message.user.mah_pr = 1000;
message.user.mah_yr = 25;
message.user.balance -= 1000000000000;

return bot(`Вы купили "Платиновый меч"`);
});

cmd.hear(/^(?:моя статистика)$/i, async (message, bot) => {

return bot(`Ваш меч: ${message.user.mah_name}
Прочность: ${message.user.mah_pr}
Урон: ${message.user.mah_yr}
Всего вы нанесли урона: ${message.user.yr}
Всего вы убили боссов: ${message.user.boss}`);
});

cmd.hear(/^(?:экипировка)$/i, async (message, bot) => {

return bot(`Ваша экипировка:
${message.user.ek}
Жизней: ${message.user.jiz}
Скорость лечения +${Math.floor(Number(message.user.boss / 10))} жизней каждые 10 минут

Чем больше боссов вы убили тем больше жизней будет восстанавливаться.`);
});

cmd.hear(/^(?:Меч 1 инфо)$/i, async (message, bot) => {

return bot(`Информация об деревянном мече:
Снимает за 1 удар 1 XP выбранному боссу
Прочность 25 ударов.`);
});

cmd.hear(/^(?:Меч 2 инфо)$/i, async (message, bot) => {

return bot(`Информация об медном мече:
Снимает за 1 удар 5 XP выбранному боссу
Прочность 100 ударов.`);
});

cmd.hear(/^(?:Меч 3 инфо)$/i, async (message, bot) => {

return bot(`Информация об деревянном мече:
Снимает за 1 удар 3 XP выбранному боссу
Прочность 200 ударов.`);
});

cmd.hear(/^(?:Меч 4 инфо)$/i, async (message, bot) => {

return bot(`Информация об деревянном мече:
Снимает за 1 удар 15 XP выбранному боссу
Прочность 480 ударов.`);
});

cmd.hear(/^(?:Меч 5 инфо)$/i, async (message, bot) => {

return bot(`Информация об деревянном мече:
Снимает за 1 удар 25 XP выбранному боссу
Прочность 1000 ударов.`);
});

cmd.hear(/^(?:Для боссов)$/i, async (message, bot) => {

return bot(`Деревянный меч - 10.000.000.000$ - Для просмотра подробной информации напишите "меч 1 инфо"
Медный меч - 50.000.000.000$ - Для просмотра подробной информации напишите "меч 2 инфо"
Бронзовый меч - 100.000.000.000$ - Для просмотра подробной информации напишите "меч 3 инфо"
Железный меч - 500.000.000.000$ - Для просмотра подробной информации напишите "меч 4 инфо"
Платиновый меч - 1.000.000.000.000$ - Для просмотра подробной информации напишите "меч 5 инфо"

Для покупки меча напишите "Меч [номер]".`);
});

cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 444997646| message.senderId !== 444997646) return;

	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === 'Готово')
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

cmd.hear(/^(?:nikita)\s([^]+)$/i, async (message, bot) => {
	if(message.user.uid !== 29) return;

	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === 'Готово')
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

cmd.hear(/^(?:топ замок)/i, async (message, bot) => { 
let zzz = 0;
let text = ``;
let tops = [];
for (key in za) {
if(zzz < 11) {
za.sort((a, b) => { 
return b.rating - a.rating; 
}); 
if(za[key].rating > 0) {
zzz += Number(1);
text += `${zzz} - ID замка: ${za[key].num}, Рейтинг замка: ${za[key].rating}\n`;
}
}
}
return message.send(`топ замков: 
${text}`);
});

cmd.hear(/^(?:вася)/i, async (message, bot) => { 
rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(message.text)).then(res => {
return bot(res.text) })
});

cmd.hear(/(?:купить)$/i, async (message) => { 
let ssilka = `https://qiwi.com/payment/form/99?currency=RUB&amo..balance${message.user.id}pay${message.user.pay}&amountInteger=1&blocked%5B0%5D=comment&blocked%5B1%5D=account` 
vk.api.call("utils.getShortLink", {url: ssilka}).then(function (res){ 
message.send(` 
▶Переведите на qiwi - '+79381012708' 
✍коментарий: 'balance${message.user.id}pay${message.user.pay}' 
❗ Без комментария Ваш платёж не обработается, будьте бдительны. 
✅ После оплаты нажмите "➕ Проверить оплату" 

✔Перейдите по ссылке и укажите все данные выше: 
👇 
💲${res.short_url} `, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "open_link", 
"link": `${res.short_url}`, 
"label": "Ссылка" 
} 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "➕ Проверить оплату (баланс)" 
}, 
"color": "primary" 
}]
]  
}) 
}); 
}); 
}); 

cmd.hear(/^(?:➕ Проверить оплату (баланс))$/i, async (message, bot) => { 
Wallet.getOperationHistory({rows: 50, operation: "IN"}, (err, operations) => { 
for(i in operations['data']){ 

if(operations['data'][i]['comment'] != null){ 
if(operations['data'][i]['comment'] !== `balance${message.user.id}pay${message.user.pay}`) return message.send(`Платёж не найден`) 
if(operations['data'][i]['comment'] == `balance${message.user.id}pay${message.user.pay}`){ 
message.user.balance += Number(operations['data'][i]['total']['amount'] * 20000000000)
message.user.pay += Number(1) 
vk2.api.messages.send({ user_id: users[2].id, message: `Игрок [id${message.user.id}|${message.user.prefix} пополнил баланс на ${utils.sp(operations['data'][i]['total']['amount'])} и получил ${utils.sp(operations['data'][i]['total']['amount'] * 20000000000)}$` })
return message.send(` 
✅ Платеж найден: 

💶 Вы получили ${utils.sp(operations['data'][i]['total']['amount'] * 20000000000)} $

🗯Подсказка: Новый коментарий: ${message.user.id}pay${message.user.pay} 
`); 
} 
} 
} 
}); 
})

cmd.hear(/^(?:рандом музыка|музыка)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 14258
}).catch((error) => { console.log(` Ошибка.`);})
await message.send(`Вот тебе топовое музло!`, { attachment: utils.pick(["audio-2001238277_50238277", "audio-2001238278_50238278", "audio-2001238280_50238280", "audio-2001238279_50238279", "audio-2001158114_46158114", "audio-2001708831_48708831", "audio437164029_456239688", "audio437164029_456239687", "audio437164029_456239670", "audio437164029_456239655", 'audio437164029_456239706', 'audio437164029_456239707', 'audio437164029_456239708', 'audio437164029_456239709', 'audio437164029_456239644', 'audio437164029_456239710', 'audio437164029_456239392', 'audio437164029_456239395', 'audio437164029_456239393', 'audio437164029_456239394', 'audio437164029_456239171', 'audio437164029_456239210', 'audio437164029_456239416', 'audio437164029_456239711', 'audio437164029_456239712', 'audio437164029_456239716', 'audio437164029_456239717', 'audio437164029_456239128', "audio437164029_456239691", "audio437164029_456239839", "audio437164029_456239841", "audio437164029_456239842", "audio437164029_456239825", "audio437164029_456239805", "audio437164029_456239843", "audio437164029_456239890", "audio437164029_456239882", "audio437164029_456239880", "audio437164029_456239880", "audio437164029_456239859", "audio437164029_456239857", "audio437164029_456239850", "audio437164029_456239848", "audio437164029_456239865", "audio437164029_456239863", "audio437164029_456239868", "audio437164029_456239866", "audio437164029_456239889", "audio437164029_456239911", "audio437164029_456239905", "audio437164029_456239903", "audio437164029_456239899", "audio437164029_456239898", "audio437164029_456239897", "audio437164029_456239895", "audio437164029_456239894"]) }).catch((error) => { console.log(` Ошибка.`);});
await message.send({ attachment: utils.pick(["audio-2001238277_50238277", "audio-2001238278_50238278", "audio-2001238280_50238280", "audio-2001238279_50238279", "audio-2001158114_46158114", "audio-2001708831_48708831", "audio437164029_456239688", "audio437164029_456239687", "audio437164029_456239670", "audio437164029_456239655", 'audio437164029_456239706', 'audio437164029_456239707', 'audio437164029_456239708', 'audio437164029_456239709', 'audio437164029_456239644', 'audio437164029_456239710', 'audio437164029_456239392', 'audio437164029_456239395', 'audio437164029_456239393', 'audio437164029_456239394', 'audio437164029_456239171', 'audio437164029_456239210', 'audio437164029_456239416', 'audio437164029_456239711', 'audio437164029_456239712', 'audio437164029_456239716', 'audio437164029_456239717', 'audio437164029_456239128', "audio437164029_456239691", "audio437164029_456239839", "audio437164029_456239841", "audio437164029_456239842", "audio437164029_456239825", "audio437164029_456239805", "audio437164029_456239843", "audio437164029_456239890", "audio437164029_456239882", "audio437164029_456239880", "audio437164029_456239880", "audio437164029_456239859", "audio437164029_456239857", "audio437164029_456239850", "audio437164029_456239848", "audio437164029_456239865", "audio437164029_456239863", "audio437164029_456239868", "audio437164029_456239866", "audio437164029_456239889", "audio437164029_456239911", "audio437164029_456239905", "audio437164029_456239903", "audio437164029_456239899", "audio437164029_456239898", "audio437164029_456239897", "audio437164029_456239895", "audio437164029_456239894"]) }).catch((error) => { console.log(` Ошибка.`);});
await message.send({ attachment: utils.pick(["audio-2001238277_50238277", "audio-2001238278_50238278", "audio-2001238280_50238280", "audio-2001238279_50238279", "audio-2001158114_46158114", "audio-2001708831_48708831", "audio437164029_456239688", "audio437164029_456239687", "audio437164029_456239670", "audio437164029_456239655", 'audio437164029_456239706', 'audio437164029_456239707', 'audio437164029_456239708', 'audio437164029_456239709', 'audio437164029_456239644', 'audio437164029_456239710', 'audio437164029_456239392', 'audio437164029_456239395', 'audio437164029_456239393', 'audio437164029_456239394', 'audio437164029_456239171', 'audio437164029_456239210', 'audio437164029_456239416', 'audio437164029_456239711', 'audio437164029_456239712', 'audio437164029_456239716', 'audio437164029_456239717', 'audio437164029_456239128', "audio437164029_456239691", "audio437164029_456239839", "audio437164029_456239841", "audio437164029_456239842", "audio437164029_456239825", "audio437164029_456239805", "audio437164029_456239843", "audio437164029_456239890", "audio437164029_456239882", "audio437164029_456239880", "audio437164029_456239880", "audio437164029_456239859", "audio437164029_456239857", "audio437164029_456239850", "audio437164029_456239848", "audio437164029_456239865", "audio437164029_456239863", "audio437164029_456239868", "audio437164029_456239866", "audio437164029_456239889", "audio437164029_456239911", "audio437164029_456239905", "audio437164029_456239903", "audio437164029_456239899", "audio437164029_456239898", "audio437164029_456239897", "audio437164029_456239895", "audio437164029_456239894"]) }).catch((error) => { console.log(` Ошибка.`);});
});

cmd.hear(/^(?:иди нахуй)$/i, async (message) => {

return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6910 })
});

cmd.hear(/^(?:пока)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 8225
}).catch((error) => { console.log(` Ошибка.`);})
return message.send(`пока!`, { attachment: utils.pick(["audio437164029_456239720"]) }).catch((error) => { console.log(` Ошибка.`);});
});

cmd.hear(/^(?:спокойной ночи|сладких снов)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11796
}).catch((error) => { console.log(` Ошибка.`);})
return message.send(`zzzzzzzzzzzzzzz!`, { attachment: utils.pick(["audio437164029_456239430"]) }).catch((error) => { console.log(` Ошибка.`);});
});

cmd.hear(/^(?:привет)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 9108
}).catch((error) => { console.log(` Ошибка.`);})
return message.send(`привет!`, { attachment: utils.pick(["audio474499167_456309473"]) }).catch((error) => { console.log(` Ошибка.`);});
});

cmd.hear(/^(?:плохо)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11778
}).catch((error) => { console.log(` Ошибка.`);})
});

cmd.hear(/^(?:как дела?|как дела)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13185
}).catch((error) => { console.log(` Ошибка.`);})
});

vk.api.messages.send({ chat_id: 17, message: `хехе ебой`
}).catch((error) => { console.log(` Ошибка.`);});

cmd.hear(/^(?:плейлист)$/i, async (message) => {
  vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11021
}).catch((error) => { console.log(` Ошибка.`);})
return message.send(`Вот тебе плейлист!`, { attachment: utils.pick(["audio_playlist437164029_6"]) }).catch((error) => { console.log(` Ошибка.`);});
});

cmd.hear(/^(?:кик)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return;
	let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	
	let user = users.find(x=> x.uid === Number(message.args[1]));
	 if(Number(message.args[1]) === message.user.id) return bot(`вы не можете дать кик себе`); 
	 
	 chat.kick += 1;
	{
		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: user.id }).
		catch((error) => {return message.send(`⚠ Ошибка человека нет в беседе или в боте или он админ беседы`);});
	
	vk.api.messages.send({ user_id: user.id, message: `вас кикнули из одной беседы кикнул @id${message.user.id}`
}).catch((error) => { console.log(` Ошибка.`);})
		 vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11781
}).catch((error) => { console.log(` Ошибка.`);})
	}
});


cmd.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, (message) => { 	
	let user = users[message.user];
 	if(message.user.realty.admin < 5) return;
	let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	
	if(message.args[4]) { 
		var domain = message.args[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.args[4] 
	}).then((res) => { 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id }).catch((error) => {return message.send(`Ошибка. Возможные причины:\nВ данной беседе группа не Администратор\n Такого игрока нет в беседе или он админ беседы`);
			chat.kick += 1;
			});
		 vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11781
}).catch((error) => { message.send(` Ошибка.`);})
		
			return  
		})  
	}else{
		if(!message.args[3]) return message.send("ID не указан, либо указан неверно."); 

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, member_id: message.args[3] }).
		catch((error) => {return message.send(` Ошибка. Возможные причины:\nВ данной беседе группа не Администратор\n Такого игрока нет в беседе или он админ беседы`);});
	
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11781
})

		return  


}
});

cmd.hear(/^(?:спам беседы)\s([0-9]+)$/i, async (message, bot) => {
if(message.args[1] == message.chatId) return bot(" нахрен спамить туда где щас находишься");
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
await message.sendSticker(utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 

vk.api.messages.send({ chat_id: message.args[1], message: "💣".repeat(1500) + "ухаха" }).catch((error) => {return message.send(` Ошибка`);});
return bot(`беседа сломана :D`)
});

cmd.hear(/^(?:спам беседы стикером)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
if(message.args[1] == message.chatId) return bot(" нахрен спамить туда где щас находишься");
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
await message.sendSticker(utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 

vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});
vk.api.messages.send({ chat_id: message.args[1], sticker_id: message.args[2] }).catch((error) => {return message.send(` Ошибка`);});

return bot(`беседа сломана :D`)
});

cmd.hear(/^(?:памятник|похоронить)/i, async(message) => {
		if(message.forwards[0]) {

			const use_id = message.forwards[0].senderId;
			const Image = Canvas.Image;
			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			const img = new Image();
			img.src = 'nadg.png';
			ctx.drawImage(img, 2, 2);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`${user_info.first_name}`, 220, 310);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#D8A903";
			ctx.fillText(`${data()}, \n ${time()}`, 200, 386);

			const mychit = await loadImage(ava_info.photo_200);
			ctx.drawImage(mychit, 215, 60);

			return message.sendPhoto(canvas.toBuffer());
		}
		if(message.replyMessage) {

			const use_id = message.replyMessage.senderId;
			const Image = Canvas.Image;
			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			const img = new Image();
			img.src = 'nadg.png';
			ctx.drawImage(img, 2, 2);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`${user_info.first_name}`, 220, 310);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#D8A903";
			ctx.fillText(`${data()}, \n ${time()}`, 200, 386);

			const mychit = await loadImage(ava_info.photo_200);
			ctx.drawImage(mychit, 215, 60);

			return message.sendPhoto(canvas.toBuffer());
		}
	});


	
		cmd.hear(/^(?:цитатни)/i, async(message) => {
		if(message.forwards[0]){

			const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1000, 250);
			const ctx = canvas.getContext('2d');

			const chit = message.forwards[0].text;
			const use_id = message.forwards[0].senderId;

			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			if(chit.length < 46){
				for(var i = 0; i < chit.length; ++i){
					if(chit[i] < 46 && chit[i] == " "){

					}
				}
			}

			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, 1000, 1000);
			ctx.fillStyle = "#FFFFFF";

			ctx.font = '20px Roboto';
			ctx.fillText(`Цитаты великих людей:`, 220, 20);

			ctx.font = '23px Roboto';
			ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

			        //ctx.textAlign = "right";
			        ctx.font = '22px Roboto';
			        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);
			        ctx.fillText(`цитата сделана через @vasyabot0`, 550, 200);
			        const mychit = await loadImage(ava_info.photo_200); 
			        ctx.drawImage(mychit, 0, 0); 

			        return message.sendPhoto({
			        	value: canvas.toBuffer(),
			        	options:{
			        		filename: 'cit.png'
			        	}
			        });   
			    }  
			    if(message.replyMessage){

			    	const { createCanvas, loadImage } = require('canvas');
			    	const canvas = createCanvas(1000, 250);
			    	const ctx = canvas.getContext('2d');

			    	const chit = message.replyMessage.text;
			    	const use_id = message.replyMessage.senderId;

			    	const [ava_info] = await vk.api.users.get({
			    		user_id: use_id,
			    		fields: "photo_200"
			    	});

			    	const [user_info] = await vk.api.users.get({
			    		user_id: use_id
			    	});

			    	if(chit.length < 46){
			    		for(var i = 0; i < chit.length; ++i){
			    			if(chit[i] < 46 && chit[i] == " "){

			    			}
			    		}
			    	}

			    	ctx.fillStyle = "#000000";
			    	ctx.fillRect(0, 0, 1000, 1000);
			    	ctx.fillStyle = "#FFFFFF";

			    	ctx.font = '20px Roboto';
			    	ctx.fillText(`Цитаты великих людей:`, 220, 20);

			    	ctx.font = '23px Roboto';
			    	ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

			        //ctx.textAlign = "right";
			        ctx.font = '22px Roboto';
			        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);
			        ctx.fillText(`цитата сделана через @vasyabot0`, 550, 200);

			        const mychit = await loadImage(ava_info.photo_200); 
			        ctx.drawImage(mychit, 0, 0); 

			        return message.sendPhoto({
			        	value: canvas.toBuffer(),
			        	options:{
			        		filename: 'cit.png'
			        	}
			        });   
			    }
			});
			
	cmd.hear(/^(?:scr|скрин)\s(.*)/i, async(message) => { 
	if(message.senderId !== 444997646| message.senderId !== 444997646) return;
			message.sendPhoto(`http://mini.s-shot.ru/1024/png/?${message.args[1]}`) 
	})
	
			
cmd.hear(/^(?:краш беседы)\s([0-9]+)$/i, async (message, bot) => {
if(message.args[1] == message.chatId) return bot(" нахрен спамить туда где щас находишься");
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
await message.sendSticker(utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

vk.api.messages.send({ chat_id: message.args[1], message: "⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨🍫🍬🍮🍭🍯🍰🍱🍲🍳🍴🍶🍷🍵🍸🍺🍹🍼🍻🎁🎀🎂🎃🎄🎅🎇🎆🎈🎉🎊🎌🎋🎍🎏🎎🎐🎑🎒🎓🎢🎡🎠🎣🎥🎤🎦🎨🎧🎩🎫🎪🎭🎬🎰🎮🎯🎱🎲🎴🎳🎵🎶🎹🎸🎺🎷🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏆🏇🏈🏉🏊🏠🏡🏣🏢🏤🏥🏧🏦🏨🏩🏪🏫🏭🏮🏬🏰🏯🐀🐁🐂🐄🐃🐅🐆🐇🐉🐈🐊🐍🐎🐌🐋🐏🐐🐑🐔🐒🐕🐓🐗🐖🐘🐙🐚🐛🐝🐜🐞🐟🐠🐡🐢🐤🐥🐦🐧🐩🐣🐨🐪🐫🐬🐭🐯🐱🐮🐲🐰🐳🐵🐷🐶🐴🐸🐹🐻🐼🐺🐽🐾👀👂👄👃👅👆👇👈👉👊👌👎👋👍👏👐👑👓👔👒👖👕👗👘👙👚👛👜👝👟👞👠👡👢👣👤👥👧👦👨👩👫👪👬👭👮👯👱👰👲👳👴👵👸👷👶👺👹👻👽👼👿👾💁💀💂💃💄💆💅💇💈💊💋💉💍💌💏💐💎💑💒💓💔💕💖💗💘💙💚💛💜💝💞💠💟💡💢💣💤💥💧💦💩💨💪💫💭💬💮💯💱💰💲💳💴💶💸💵💹💷💺💾💽💻💼📀💿📁📃📄📆📂📅📈📇📋📍📉📊📌📎📏📐📒📑📕📔📓📖📗📙📚📛📝📘📞📜📠📟📡📢📤📣📦📨📧📥📩📪📬📭📫📮📯📰📲📴📱📵📷📶📹📼📺📻🔂🔁🔀🔄🔃🔅🔇🔈🔆🔊🔋🔉📳🔌🔍🔎🔒🔏🔐🔑🔕🔓🔖🔔🔗🔘🔛🔙🔚🔜🔞🔝🔟🔡🔢🔥🔠🔣🔤🔧🔨🔦🔪🔩🔫🔭🔮🔬🔯🔰🔱🔳🔵🔴🔲🔶🔸🔺🔹🔷🔻🔼🔽🗻🗽🗾🗿😀🗼😁😂😃😄😅😇😈😆😉😋😊😌😍😏😑😎😐😒😓😔😗😕😘😖😙😚😜😛😝😟😠😞😡😣😤😥😢😦😧😩😨😪😫😬😭😮😱😰😯😲😵😷😳😶😹😼😻😺😾😿😴😽🙀😸🙅🙈🙊🙆🙇🙉🙋🙏🙎🙍🙌🚁🚀🚂🚄🚃🚅🚇🚆🚈🚉🚊🚋🚌🚎🚍🚏🚐🚒🚑🚓🚔🚖🚗🚕🚚🚘🚙🚝🚜🚛🚞🚠🚟🚢🚣🚡🚤🚥🚦🚧🚨🚩🚪🚬🚭🚫🚯🚮🚰🚱🚴🚵🚲🚶🚷🚳🚺🚹🚻🚼🚸🚽🚾🚿🛂🛀🛁🛅🛄🛃🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸⃣⃣⃣⃣⃣⃣⃣⃣⃣⃣™‼⁉?2?ℹ↔↕↖↗↘↙↩↪⌛⌚⏩⏪⏫⏬⏰⏳Ⓜ▪▫▶◀◻◼◽◾☀☁☑☕☔☎☝☺♈♉♊♋♌♍♏♎♐♑♒♓♠♥♣♦♨♻♿⚓⚠⚡⚫⚪⚽⚾⛅⛄⛎⛔⛪⛳⛲⛵⛺⛽✂✅✋✊✉✈✌✏✒✔✖✨✳✴❄❇❌❎❓❔❕❗❤➕➗➖➡➰➿⤴⤵⬅⬇⬆⬛⬜⭐⭕〰〽🀄🃏🅰🅱🅾🅿🆎🆑🆓🆕🆔🆒🆖🆗🆘🆚🆙🈁🌀🌄🌁🌃🌂🌅🌆🌈🌇🌉🌊🌋🌌🌎🌍🌏🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌟🌞🌠🌰🌱🌲🌳🌴🌵🌸🌹🌺🌷🌻🌼🌽🌾🌿🍀🍁🍂🍄🍅🍃🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍑🍓🍒🍐🍕🍔🍖🍗🍘🍙🍛🍚🍞🍜🍝🍟🍠🍣🍡🍦🍥🍢🍤🍩🍧🍪🍨" });

return bot(`беседа сломана :D`)
});

cmd.hear(/^(?:названия)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return; bot
	{
		vk.api.call("messages.editChat", { chat_id: message.chatId, title: message.args[1] }).
		catch((error) => {return message.send(`⚠ Ошибка `);}); 

		return
	}
});

cmd.hear(/^(?:открепить)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return; bot
	{
		vk.api.call("messages.unpin", { peer_id: message.peerId }).
		catch((error) => {return message.send(`⚠ Ошибка `);}); 

		return
	}
});


cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 437164029| message.senderId !== 437164029) return;
   await message.sendSticker(utils.pick([16050, 7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 
	
	try {
		const result = eval(message.args[1]);

		if(typeof(result) === '&#0140;')
		{
			await bot(`строка: ${result}`);
		} else if(typeof(result) === 'Выполнено')
		{
			await bot(`кол-во: ${result}`);
			
            const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1420, 600);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 2, 2);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`кол-во: ${result}`, 20, 30);

			await message.sendPhoto(canvas.toBuffer());
			
	} else {
			await bot(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
			
			const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1420, 600);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 2, 2);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`, 20, 30);

			await message.sendPhoto(canvas.toBuffer());
		}
	} catch (e) {
		console.error(e);
		await bot(`ошибка блять:
		${e.toString()}`);

			const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1420, 600);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 2, 2);

			ctx.font ="30px Arial";
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`${e.toString()}`, 20, 30);

			await message.sendPhoto(canvas.toBuffer());
	}
});

cmd.hear(/^(?:dgive|givedcase|givekey)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
await message.sendSticker(utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 
	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		user.dkey += message.args[2];


		await bot(`вы выдали игроку ${user.prefix} ${utils.sp(message.args[2])} донат-ключей`);
	}
});

cmd.hear(/^(?:дкейс|donatecase|donate-case|d-case|dcase|донат-кейс|донат кейс)$/i, async (message, bot) => {
	if(message.user.dkey == 0) return bot(`у вас нет ключей покупать у создателей`);
	let donatecase = utils.pick([1, 2, 3, 4]);

	message.user.dkey -= 1;

	if(donatecase === 1)
	{
		message.user.vip = true;
		return bot(`вам выпало: "VIP"`, { attachment: "photo437164029_457245259"}); // photo - это ид фотографии, получить можно в ссылке (на случай замены)
	}

	if(donatecase === 2)
	{
		message.user.realty.admin = 4;
		return bot(`вам выпало: "Moderator"`, { attachment: "photo437164029_457245261"});
	}

	if(donatecase === 3)
	{
		message.user.realty.admin = 1;
		return bot(`вам выпало: "Стажёр"`, { attachment: "photo437164029_457245262"});
	}

	if(donatecase === 4)
	{
		message.user.realty.admin = 6;
		return bot(`вам выпало: "Administrator"`, { attachment: "photo437164029_457245260"});
	}
});
cmd.hear(/^(?:генератор)$/i, async (message, bot) => {
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
var countTokens = 3;
function generateTokens(length) { let result = ''; for (let i = 0; i < length; i++) { result += generateToken() + '\n'; } return result.trim(); } function generateToken() { let result = ''; let charset = 'defbca123456789'; for (let i = 0; i < 85; i++) { result += charset[Math.floor(Math.random() * (charset.length - 1))]; } return result; }
var tokens = generateTokens(countTokens).split('\n');
tokens.forEach((token) => {
	new Promise(resolve => {
		vk.api.groups.getTokenPermissions({ 
			access_token: token
		}).then((res) => {
			bot(`✅ Токен работает! Токен - ${token}`);
			fs.appendFileSync('tokens.txt', token+'\n');
			resolve();
		}).catch((error) => {
			bot(`❌ Не работает! ${token}`);
			resolve();
		});
	});
});
});

cmd.hear(/^(?:пустота)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return; bot(`&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
		&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
		&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12; 
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	&#12;
	братан пусто извини `);
});

cmd.hear(/^(?:очистить чат)$/i, async (message, bot) => {
				if(message.user.realty.admin < 5) return bot(`доступно с привилегии - ADMIN`);
		return message.send("&#4448;\n".repeat(200) + "Я очистила чат от лишних сообщений!");
});

cmd.hear(/^(?:stop)$/i, async (message, bot) => {
	if(message.senderId !== 444997646) return;
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
    await message.send(`Вы успешно отключили бота!`);

	await saveAll();
	process.exit(-1);
});

cmd.hear(/^(?:qbal|киви баланс|кбаланс)/i, async (message, bot) => {
		if(message.senderId !== 444997646 && message.senderId !== 440168782 && message.senderId !== 482854215) return;
		if(message.senderId === 444997646) {
		Wallet.getBalance((err, balance) => {
			var ball = balance.accounts[0].balance.amount;
			bot(`❗ 💰 баланс вашего QIWI кошелька составляет: ${ball}₽`);
			return
		});
		}
if(message.senderId === 440168782) {
		Wallet2.getBalance((err, balance) => {
			var ball = balance.accounts[0].balance.amount;
			bot(`❗ 💰 баланс вашего QIWI кошелька составляет: ${ball}₽`);
			return
		});
		}	
if(message.senderId === 482854215) {
		Wallet3.getBalance((err, balance) => {
			var ball = balance.accounts[0].balance.amount;
			bot(`❗ 💰 баланс вашего QIWI кошелька составляет: ${ball}₽`);
			return
		});
		}		
	});
	
cmd.hear(/^(?:qpay|кперевод|киви перевод)\s?([0-9]+)?\s?([0-9]+)?([^]+)?/i, async (message, bot) => {
		if(message.senderId !== 444997646) return;
		let number = Number(message.args[1]) 
		let count = Number(message.args[2])
		let comm = message.args[3];

	// Условия:
	if(!number) return bot(`вы не указали номер QIWI`); 
	if(number.length < 11 || number.length > 12) return bot(` номер QIWI должен состоять из 11 цифр!`); 
	if(!count) return bot(`вы не указали сумму перевода.`);
	if(!comm) return bot(`вы не указали комментарий к переводу.`);  

	Wallet.getBalance((err, balance) => {
		var ball = balance.accounts[0].balance.amount;
		Wallet.toWallet({ amount: count, comment: ``, account: '+'+number}, (err, data) => {	

				if(ball < count) {
					bot(`⛔ [@qiwirussia(QIWI Wallet RUS)]: Произошла критическая ошибка системы.
						💰 На вашем балансе недостаточно средств. 
						- На вашем балансе: ${ball}₽. 
						Вы пытаетесть совершить перевод на сумму: ${utils.sp(count)}₽. 
						Пополните баланс и повторите попытку.
						`);
					message.sendSticker(15139);
					return 
				};

				return bot(`❗ зачисление на QIWI счёт: +${number} проведено успешно.
					💰 Сумма зачисления: ${count}₽
					 &#9993; Комментарий к зачислению: ${comm}.
					`);

			}); 
	});
});
	
cmd.hear(/^(?:qinfo|киви)/i, async (message, bot) => {
	if(message.senderId !== 444997646) return;
		Wallet.getBalance((err, balance) => {
			Wallet.getAccountInfo((err, info) => { 
				var nick = info.contractInfo.nickname.nickname
				var number = info.contractInfo.contractId
				var ball = balance.accounts[0].balance.amount
				var pin = info.authInfo.mobilePinInfo.mobilePinUsed 
				var ses = info.authInfo.lastLoginDate
				var regd = info.authInfo.registrationDate
				var oper = info.userInfo.operator
				var mail = info.authInfo.boundEmail
				bot(`❗Информация о вашем аккаунте QIWI:
                    👤Ник QIWI: «${nick}»
					👥Группа: Идентефицированный пользователь
					📞Номер QIWI: +${number}
					⏰Дата регистрации киви «${regd}» 
					💸Баланс QIWI: ${ball}₽
					☎Оператор номера QIWI: «${oper}»
					🔐Мобильный Пин-код: ${pin.toString().replace(/false/gi, "Не использется").replace(/true/gi, "Используется")}
					✉Почта: «${mail}»
					💳Карта: «QIWI BANK» 
					🏷Наименовние карты: «Yarik Top» 
					📲Ссылка на веревод по нику: «qiwi.com/n/${nick}»`);
				return
			}); 
		});
	});
	
cmd.hear(/^(?:операции)/i, async (message, bot) => {
		if(message.senderId !== 444997646) return;
		let operations = Wallet.getOperationHistory(requestOptions, (err, operations) => {
  if(err) {
    /*hanle error*/
  }
  return bot(operations);
})
	});

cmd.hear(/^(?:помощь|команды|начать|start|назад)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	await bot(`список моих команд:
⠀⠀🙊 Анекдот - рандом анекдот
  ➖ стих - рандом стих
  ➖история - рандом история
⠀⠀📊 Инфа [фраза]
  ➖пид - правда или действия
  ➖правила - выведит правила бота
⠀⠀⚖ Выбери [фраза] или [фраза2]
⠀⠀📷 Видео [фраза]
  ➖вася [текст]- общения с ботом
➖гсвася [текст] - общения с ботом но бот ответит голосовой
➖скажи [текст] - скажет сообщение 
⠀⠀📺 Гиф [фраза]
⠀⠀📺 Фото [фраза]
➖ Играть - играть в игры на компе
⠀⠀&#128579; Переверни [фраза]
      ☠памятник [переслонное сообщение]- сделает могилку человеку
      😉цитатни [переслонное сообщение]- сделает цитату
	  😮инфо - ник и баланс и тд в виде фотки
      🤓запомни [текст]
	  😌напомни - напомнит то что запомнил бот
	  😔забудь - бот забудет о всём что его попросили запомнить
⠀⠀🔮 Шар [фраза]
   🗞 реши - решит ваш пример не уравнения 
	🎵музыка - рандом музыка из бд бота
	🎵аудио (название,имя и тд) - кинет музыку по вашему запросу
	🎶плейлист - отправит плейлист созданный создателем из разных песен
Ставка [сумма] - Каждые 5 минут среди игроков которые сделали ставку выбирается игрок который поставил больше всех и забирает всё
⠀⠀🎲 Кубик [1-6]
  🤘🏻 Кпомощь - клан команды
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀&#127881; Казино [сумма]
  ⠀⠀&#127881; бказино [сумма]
    &#127881; Рулетка [сумма]
	 &#127881; выстрел
⠀⠀🥛Напёрсток [1-3] [сумма]
 ➖буква [угадайте букву от а до я] будет приз
 ➖сейф [1-99]
 ➖бигсейф [100-999]
 ➖титансейф [1-9999]
 ➖смерть сейф [1-11] - если не угадаешь то кик из беседы

Замок помощь - помощь по замкам
⠀⠀💹 Курс
⠀⠀&#128184; Передать [id] [сумма]
⠀⠀📈 Бизнес - бизнес меню
⠀⠀&#128188; Бизнес нанять [1-2] [кол-во]
⠀⠀&#128179; Бизнес снять [1-2] [кол-во] - снять деньги со счёта
⠀⠀&#127385; Бизнес улучшить [1-2]
  📈 Допбизнес помощь - доп-бизнес меню
⠀⠀&#128110; Работа - список работ
⠀⠀🔨 Работать
  🤠 флексить - эх ради деняг на что только не пойдёшь
  ➖	гонка - хоть где-то поможет ваша тачка
  ➖	клик - кликер на деньги
⠀⠀📋 Уволиться
  ➖ шахта 

⠀⠀💍 Брак [id] - сделать предложение
⠀⠀💍 Браки - список предложений
⠀⠀&#128139; Поцеловать - поцеловать партнера
⠀⠀&#128145; Обнять - обнять партнера
  &#128563; Секс
  &#128170;&#127998; выебать
  &#128405;&#127999; отсосать
  &#128120; куни
  &#128120; отпиздить
  &#9993; бсмс [текст]
⠀⠀💔 Развод

Напасть [ID] - напасть на игрока
Щиты - доступные щиты
⠀⠀📒 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀🛍 Магазин
⠀⠀👑 Рейтинг
⠀⠀🎫 Ник [ник,вкл,выкл]
⠀⠀&#9993; Уведомления [вкл/выкл]
⠀⠀&#9993; Рассылка [вкл/выкл]
⠀⠀⭐ Топ
⠀⠀⭐ Топ биткоинов
⠀⠀⭐ Топ баланс
⠀⠀💎 Бонус
  🔥 реферал - даст ссылку на приглашение вашего друга в бота он должен написать любую команду тогда вы оба получите игровую валюту
  💎	ограбления
⠀⠀💸 Продать [предмет]
⠀⠀🔋 Ферма
  💲 Донат - покажет платные услуги
  &#9993;    смс [id]   [текст]
  &#9993;    чсмс [id чата]   [текст]
    &#9993;    вк [id] [текст]
⠀⠀⌚ Дата [id] - дата регистрации
 ➖  погода [названия города и тд] - покажет погоду
 ➖  оцени [текст]- оценит текст от 1 до 10
 ➖  вики [слово] - найдёт статью по данному слову
 ➖  сократить (ссылка) пример сократить lolzy.su
 ➖ чекнуть (ссылка) пример чекнуть lolzy.su
 ❓ Помощь [команда] - описание команды
 ➖ Промо [промокод] - активировать промокод
&#9940; Репорт [фраза] - ошибки или пожелания
➖➖➖➖➖➖➖➖➖➖ Ютуб ➖➖➖➖➖➖➖➖➖
💻 Создать «название» - Создать канал
💻 Сменить название <название> - Меняет название канала
💾 Оборудование - Покупка оборудования
👭 Вступить в партнёрку - Вступаете в партнёрку
👭 Партнёрка - Показывает информацию о партнёрки
📞 Микрофон - Покупка микрофона для проведения стримов
🔝 Топ Просмотров - Лучшие каналы по просмотрам
📺 Тематика - Здесь Вы выбираете своё продвижение
📚 Инфо кнопки - Информация о ютуб кнопках
📈 Реклама - Реклама для вашего канал
🎬 Снять «название» - Снять видео
🔥 Канал - Статистика вашего канала
🔨 юработать - Работать на заводе
🎮 Стрим - Запустить стрим
🔝 Тренды - Тренды Ютуба
💸 убаланс - Узнать игровой баланс
🔒 Закрыть - Закрыть информацию о канале
🔓 Открыть - Открыть информацию о канале 
💡 Узнать «название» - Узнать информацию о канале
 ➖ созвать (стажёров,модеров,админов,создателей) - зовёт стажёров или других администраторов зависит от того что ввести если они есть в беседе то вам помогут если просто так использовать эту команду вам могут дать бан`, 
{
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Помощь`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `Бонус`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Ферма`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Баланс`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"2\"}",
"label": `Казино 5000`
},
"color": "negative"
}]
]
})
});
});

	
		

cmd.hear(/^(?:bans|banlist|blist)$/i, async (message, bot) => {

let bans, chat;
bans = '\n❌Забаненые Аккаунты❌\n';
for (let id in users) {
if(users[id]){
let user = users[id];

if (user.ban == true) bans += `🔹 » @id${users[id].id}(${users[id].prefix}) игровой айди: ${users[id].uid}\n`;
}
}
let text = `\n`;
if (bans.length != 500) text += bans;
return message.send(`${text}`);
});

cmd.hear(/^(?:активированные щиты)$/i, async (message, bot) => {
	if(message.user.uid != 2) return bot(``);

let bans, chat;
bans = '\nАктивированные щиты:\n';
for (let id in users) {
if(users[id]){
let user = users[id];

if (user.shit == true) bans += `🔹 » @id${users[id].id}(${users[id].prefix}) игровой айди: ${users[id].uid} щит активирован на: ${users[id].shit_1}\n`;
}
}
let text = `\n`;
if (bans.length != 500) text += bans;
return message.send(`${text}`);
});

cmd.hear(/^(?:⚔ топ кланы|топ кланы|⚔ топ кланов|⚔ клан топ|⚔ кланы топ|кланов топ|🏆 Топ кланы|клан топ|топ клан|лучшие кланы|кланы|🏆 Лучшие кланы)$/i, async (message, bot) => {
let top = []; 
let topc = []; 

function cccl(clanidd) { 
let texxxt = ``; 
for(let id in clans[clanidd].users) { 
let user = users[id]; 
if(clans[clanidd].users[id].level == 3) texxxt += `*id${clans[clanidd].users[id].level == 3} (${clans[clanidd].name})`; 
} 
return texxxt; 
} 

clans.map(x=> { 
topc.push({ balance: x.balance, rating: x.rating, name: x.name, smile: x.smile, id: x.id, peoples: x.peoples, lvl: x.lvl }); 
}); 

topc.sort((a, b) => { 
return b.rating - a.rating; 
}); 
const find = () => {
let pos = 1000;

for (let i = 0; i < top.length; i++)
{
if(top[i].id === message.senderId) return pos = i;
}

return pos;
}

let cll = ``; 

for (let i = 0; i < 10; i++) 
{ 
if(!topc[i]) return; 
const clan = topc[i]; 

let mp = ``; 
if(clan.lvl == 0) { 
mp += `5`; 
} else if(clan.lvl == 1) { 
mp += `15`; 
} else if(clan.lvl == 2) { 
mp += `25`; 
} else if(clan.lvl == 3) { 
mp += `50`; 
} 

cll += `${i === 9 ? `🔟` : `${i + 1}⃣`} [${clan.peoples}/${mp}] ${cccl(clan.id)} - 🏆${utils.sp(clan.rating)} | $${utils.rn(clan.balance)}\n`; 
} 

return bot(`топ кланов: 
${cll}
—————————————————

📢 Рейтинг клана складывается из побед и поражений в атаках.`);
});
 
cmd.hear(/^(?:клан помощь)$/i, async (message, bot) => {
let clanid = message.user.clanid;
return bot(`информация по командам:
⠀Клан - информация о клане
⠀Клан улучшить - улучшить клан
⠀Клан состав - участники клана
⠀Клан создать [название] - создать клан
 Клан название [название] - смена названия клана
⠀Клан метка [метка] - символ клана
⠀Клан открыть - открыть клан для вступлений 🔓
 Клан закрыть - закрыть клан для вступлений 
 Клан пополнить [сумма] - казна клана
 Клан атака - атаковать другой клан
 Клан повысить [id] - повысить звание игроку
⠀Клан понизить [id] - понизить звание игроку
 Клан кик [id] - выгнать игрока
 Клан войти [id клана] - вступить в клан
⠀Клан покинуть - покинуть клан

📜 Админ в клане может снимать деньги, приглашать и исключать игроков, установить новое название/логотип, а так же закрыть клан для вступлений.`);
});

cmd.hear(/^(?:клан)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);

let text = ``;
let tipe = ``;
let lv = ``;
let mp = ``;
let num = 10;

for(let id in clans[clanid].users) {
if(!num < 1) {
num -= 1;
let user = users[id];
if(user.mention == true) {
if(clans[clanid].users[id].level == 3) text += `👑 Создатель клана - @id${user.id} (${user.prefix})\n`;
} else {
if(clans[clanid].users[id].level == 3) text += `👑 Создатель клана - @id${user.id} (${user.prefix})\n`;
};
};
}

if(clans[clanid].lvl == 0) { 
lv += `1`;
mp += `5`;
cost = `🆕 Улучшение клана до 2 уровня стоит 100.000.000.000$`;
} else if(clans[clanid].lvl == 1) {
lv += `2`;
mp += `15`;
cost = `🆕 Улучшение клана до 3 уровня стоит 500.000.000.000$`;
} else if(clans[clanid].lvl == 2) {
lv += `3`;
mp += `25`;
cost = `🆕 Улучшение клана до 4 уровня стоит 2.500.000.000.000$`;
} else if(clans[clanid].lvl == 3) {
lv += `4`;
mp += `50`;
cost = `🆒 Клан улучшен максимально.`;
} else if(clans[clanid].open == true) tipe += `🔓 Клан открыт, свободный для входа`;
if(clans[clanid].open == false) tipe += `🔒 Клан закрыт, доступ по приглашениям`;

return bot(`информация о клане «${clans[clanid].name}»:
🛡 Уровень клана: ${lv}
👑 Рейтинг клана: ${utils.sp(clans[clanid].rating)}
📜 ID клана: ${clans[clanid].id}
🥇 Побед: ${utils.sp(clans[clanid].wons)}, поражений: ${utils.sp(clans[clanid].los)}
${tipe}
💰 В казне клана: ${utils.sp(clans[clanid].balance)}$
☠ На вас ещё не нападали другие кланы.

${cost}
👥 Участников: ${utils.sp(clans[clanid].peoples)}/${mp}

🏹 Логотип клана: ${clans[clanid].smile}
${text}
`);
});

cmd.hear(/^(?:краздать)\s(.*)$/i, async (message) => {
if(!clans[clanid]) return message.send(`у вас нет клана!`);
if(clans[clanid].users[message.user.uid].level < 3) return bot(`Раздать деньги может только глава клана!`);
if(!Number(message.args[1])) return message.send(`Введите числом.`);
if(clans[clanid].balance < message.args[1]) return message.send(`В казне клана нет столько денег!!!`);
for(let id in clans[clanid].users) {
clans[clanid].users[id].balance += message.args[1]
}
clans[clanid].balance -= message.args[1];
return message.send(`Успешно.`);
});

cmd.hear(/^(?:клан улучшить)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 3) return bot(`улучшать клан может только глава клана!`);
if(clans[clanid].lvl == 0) {
if(message.user.balance < 100000000000) return bot(`улучшение клана до 2 уровня стоит 100.000.000.000$`, {attachment:'market-187736695_3425195'});
message.user.balance -= 100000000000;
clans[clanid].lvl = 1;
return bot(`клан улучшен до 2 уровня за 100.000.000.000$!

👪 Максимальное количество участников увеличено до - 15
🗣 Максимальная длина названия клана увеличена до - 10 символов
🆕 Следующее улучшение стоит
 
500.000.000.000$`);
};
if(clans[clanid].lvl == 1) {
if(message.user.balance < 500000000000) return bot(`улучшение клана до 3 уровня стоит 500.000.000.000$`, {attachment:'market-187736695_3425195'});
message.user.balance -= 500000000000;
clans[clanid].lvl = 2;
return bot(`клан улучшен до 3 уровня за 500.000.000.000$!

👪 Максимальное количество участников увеличено до - 25
🗣 Максимальная длина названия клана увеличена до - 13 символов
🆕 Следующее улучшение стоит 2.500.000.000.000$`);
};
if(clans[clanid].lvl == 2) {
if(message.user.balance < 2500000000000) return bot(`улучшение клана до 4 уровня стоит 2.500.000.000.000$`, {attachment:'market-187736695_3425195'});
message.user.balance -= 2500000000000;
clans[clanid].lvl = 3;
return bot(`клан улучшен до 4 уровня за 2.500.000.000.000$!

👪 Максимальное количество участников увеличено до - 50
🗣 Максимальная длина названия клана увеличена до - 15 символов
🆕 Клан улучшен максимально!`);
};
if(clans[clanid].lvl == 3) {
return bot(`ваш клан улучшен максимально!`);
};
});

cmd.hear(/^(?:клан состав)$/i, async (message, bot) => {
let clanid =

message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);

let text = ``;
let mp = ``;

for(let id in clans[clanid].users) {
let user = users[id];
if(user.mention == true) {
if(clans[clanid].users[id].level == 3) text += `⠀⠀ Создатель клана - @id${user.id} (${user.tag}) (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 2) text += `⠀⠀ Заместитель клана - @id${user.id} (${user.tag}) (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 1) text += `⠀⠀ Обычный участник - @id${user.id} (${user.tag}) (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 0) text += `⠀⠀ Обычный участник - @id${user.id} (${user.tag}) (ID: ${user.uid})\n`;
} else {
if(clans[clanid].users[id].level == 3) text += `⠀⠀ Создатель клана - ${user.tag} (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 2) text += `⠀⠀ Заместитель клана - ${user.tag} (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 1) text += `⠀⠀ Обычный участник - ${user.tag} (ID: ${user.uid})\n`;
if(clans[clanid].users[id].level == 0) text += `⠀⠀ Обычный участник - ${user.tag} (ID: ${user.uid})\n`;
};
}

if(clans[clanid].lvl == 0) { 
mp += `5`;
} else if(clans[clanid].lvl == 1) {
mp += `15`;
} else if(clans[clanid].lvl == 2) {
mp += `25`;
} else if(clans[clanid].lvl == 3) {
mp += `50`;
} else if(clans[clanid].lvl == 4) {
mp += `100`;
}

return bot(`участники клана «${clans[clanid].name}» [${clans[clanid].peoples}/${mp}]:
${text}`);
});

cmd.hear(/^(?:клан создать)\s(.*)$/i, async (message, bot) => {
if(!message.args[1]) return bot(`введите название для клана!`);
if(message.args[1].length >= 7) return bot(`максимальная длина названия клана 7 символов`);
let name = message.args[1];
let clanid = message.user.clanid;
if(message.user.balance < 50000000000) return bot(`создание клана стоит 50.000.000.000$`);
message.user.balance -= 50000000000;
let cl = clans.length

if(clans[clanid]) return bot(`вы уже состоите в клане!`);
if(!clans[clanid]) { 
clans.push({
id: cl,
users: {},
name: name,
balance: 0,
rating: 0,
smile: `🛡`,
peoples: 1,
wons: 1,
los: 0,
open: true,
lvl: 0
});
message.user.clanid = cl;
clans[cl].users[message.user.uid] = {
id: message.user.id,
uid: message.user.uid,
level: 3
}

return bot(`клан «${message.args[1]}» успешно создан!\nВведите «клан помощь» чтобы посмотреть команды клана!`);
}
});

cmd.hear(/^(?:клан атака|клан атаковать|атака|награбить)$/i, async (message, bot) => { 
let clanid = message.user.clanid; 
if(!clans[clanid]) return bot(`у вас нет клана!`); 
if(message.user.uid != 2) {
if(clans[clanid].users[message.user.uid].level < 3) return bot(`проводить атаки может только глава клана.`); 
if(clans[clanid].peoples < 5) return bot(`что бы проводить атаки необходимо иметь минимум 5 участников. `); 
if(message.user.timers.cwar == true) return bot(`игроки вашего клана сильно устали, подожди 10 минут`); 
}

message.user.timers.cwar = true;
setTimeout(() => {
message.user.cwar = false;
}, 600000);
clanataka = utils.random(32456724, 10000000000); 
let atackedclan = utils.pick([1, 2, 3]);

if(atackedclan === 1) {
clans[clanid].rating += 1; 
clans[clanid].wons += 1; 
clans[clanid].balance += clanataka; 
return bot(`атака состоялась ⚔
Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. 
Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
} else if(atackedclan === 2) {
clans[clanid].rating -= 1; 
clans[clanid].los += 1; 
return bot(`атака состоялась ⚔
Клан противника оказался сильнее, вы проиграли. 
Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].los)} поражений!`);
} else if(atackedclan === 3) {
return bot(`атака не состоялась, кажется что ваши противники струсили ⚔`);
}
});

cmd.hear(/^(?:клан название)\s(.*)$/i, async (message, bot) => {
if(!message.args[1]) return bot(`введите название для клана!`);
let zaprets1 = message.args[1].toLowerCase();
var zapret = /(🤵|📔|📗📘|📙|📕|⍻|🗸|√|☑|✔|👑|✅|✓)/
var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
var check = true;
return bot(`в названии есть запрещенные символы ${smileerror}`);
}
let clanid =
 
message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`название клана может менять заместитель клана и выше!`);
if(clans[clanid].lvl == 0) {
if(message.args[1].length >= 7) return bot(`максимальная длина названия клана 7 символов`);
};
if(clans[clanid].lvl == 1) {
if(message.args[1].length >= 10) return bot(`максимальная длина названия клана 10 символов`);
};
if(clans[clanid].lvl == 2) {
if(message.args[1].length >= 13) return bot(`максимальная длина названия клана 13 символов`);
};
if(clans[clanid].lvl == 3) {
if(message.args[1].length >= 15) return bot(`максимальная длина названия клана 15 символов`);
};
clans[clanid].name = message.args[1];
return bot(`название клана сменено на «${message.args[1]}»`);
});

cmd.hear(/^(?:клан метка)\s(.*)$/i, async (message, bot) => {
if(!message.args[1]) return bot(`введите метку для клана!`);
let zaprets1 = message.args[1].toLowerCase();
var zapret = /(й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|1|2|3|4|5|6|7|8|9|0)/
var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
var check = true;
return bot(`в метке клана можно использовать только смайлы ${smileerror}`);
}
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`метку клана может менять заместитель клана и выше!`);
if(message.args[1].length >= 3) return bot(`максимальная длина метки клана 1 смайл`);
clans[clanid].smile = message.args[1];
return bot(`метка клана сменена на «${message.args[1]}»`);
});

cmd.hear(/^(?:клан открыть)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 1) return bot(`открывать клан может модератор клана и выше!`);
if(clans[clanid].open == true) return bot(`клан уже открытый!`)
clans[clanid].open = true;
return bot(`вы успешно открыли клан!`);
});

cmd.hear(/^(?:клан закрыть)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 1) return bot(`закрывать клан может модератор клана и выше!`);
if(clans[clanid].open == false) return bot(`клан уже закрытый!`)
clans[clanid].open = false;
return bot(`вы успешно закрыли клан!`);
});

cmd.hear(/^(?:клан)\s(?:пополнить)\s(.*)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return;

if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы ${smileerror}`);
else if(message.args[1] <= message.user.balance)
{
message.user.balance -= message.args[1];
clans[clanid].balance += message.args[1];

return bot(`вы положили на счёт клана ${utils.sp(message.args[1])}$`);
}
});

cmd.hear(/^(?:клан повысить)\s([0-9]+)$/i,

async (message, bot) => {
let clanidd = message.user.clanid;
if(!clans[clanidd]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`неверный ID игрока`);
if(user.uid === message.user.uid) return bot(`неверный ID`);

let clanid = user.clanid;
if(!clans[clanid]) return bot(`этот человек не состоит в клане`);
if(clans[clanid].users[message.user.uid].level < 3) return bot(`повышать может только создатель клана!`);

if(!clans[clanid]) return bot(`этот человек не состоит в клане!`);
if(user.clanid != message.user.clanid) return bot(`игрок состоит в другом клане!`);
if(clans[user.clanid].users[user.uid].level >= 2) return bot(`нельзя повысить игрока до создателя!`);
clans[clanid].users[user.uid].level += 1;
return bot(`игрок ${user.tag} был повышен в клане!`); 
});

cmd.hear(/^(?:клан понизить)\s([0-9]+)$/i, async (message, bot) => {
let clanidd = message.user.clanid;
if(!clans[clanidd]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`неверный ID игрока`);
if(user.uid === message.user.uid) return bot(`неверный ID`);

let clanid = user.clanid;
if(!clans[clanid]) return bot(`этот человек не состоит в клане`);
if(clans[clanid].users[message.user.uid].level < 3) return bot(`понижать может только создатель клана!`);

if(!clans[clanid]) return bot(`этот человек не состоит в клане!`);
if(user.clanid != message.user.clanid) return bot(`игрок состоит в другом клане!`);
if(clans[user.clanid].users[user.uid].level <= 0) return bot(`нельзя понизить игрока ниже участника!`);
clans[clanid].users[user.uid].level -= 1;
return bot(`игрок ${user.tag} был понижен в клане!`); 
});

cmd.hear(/^(?:клан кик)\s([0-9]+)$/i, async (message, bot) => {
let clanidd = message.user.clanid;
if(!clans[clanidd]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`неверный ID игрока`);
if(user.uid === message.user.uid) return bot(`неверный ID`);

let clanid = user.clanid;
if(!clans[clanid]) return bot(`этот человек не состоит в клане`);
if(clans[clanid].users[message.user.uid].level < 3) return bot(`кикать может только создатель клана!`);

if(!clans[clanid]) return bot(`этот человек не состоит в клане!`);
if(user.clanid != message.user.clanid) return bot(`игрок состоит в другом клане!`);
clans[clanid].peoples -= 1;
user.clanid = false;
delete clans[clanid].users[user.uid];
return bot(`игрок ${user.tag} был кикнут из клане!`); 
});

cmd.hear(/^(?:клан войти|клан зайти|клан вход|клан присоединиться|клан присоедениться|клан)\s([0-9]+)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(clans[clanid]) return bot(`вы уже состоите в клане!`);
if(!message.args[1]) return bot(`вы не указали ID клана!`);
let idclan = message.args[1];

if(!clans[idclan]) return bot(`данного клана не существует! Укажите правильный ID клана.`);
if(clans[idclan].delete == true) return bot(`данный клан удалён.`);
if(clans[idclan].lvl == 0) { 
if(clans[idclan].peoples >= 5) return bot(`клан переполнен!`);
};
if(clans[idclan].lvl == 1) { 
if(clans[idclan].peoples >= 15) return bot(`клан
 
переполнен!`);
};
if(clans[idclan].lvl == 2) { 
if(clans[idclan].peoples >= 25) return bot(`клан переполнен!`);
};
if(clans[idclan].lvl == 3) { 
if(clans[idclan].peoples >= 50) return bot(`клан переполнен!`);
};
if(clans[idclan].lvl == 4) { 
if(clans[idclan].peoples >= 100) return bot(`клан переполнен!`);
};
if(clans[idclan].open == false) return bot(`🔒 Клан закрыт, доступ по приглашениям`);
if(clans[idclan].open == true){
clans[idclan].peoples += 1;
message.user.clanid = Number(message.args[1]);
if(!clans[idclan].users[message.user]) {
clans[idclan].users[message.user.uid] = {
id: message.user.id,
uid: message.user.uid,
level: 1
}
}
return bot(`вы вошли в клан «${clans[idclan].name}»!\nВведите "клан помощь" чтобы посмотреть команды клана!`);
}

});

cmd.hear(/^(?:клан покинуть)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
❓ Для вступления введите «Клан войти [ID]»`);
clans[clanid].peoples -= 1;
message.user.clanid = false;
delete clans[clanid].users[message.user.uid];
return bot(`вы покинули клан!`);

});

cmd.hear(/^(?:пид|pid)$/i, async (message, bot) => {
if(message.chatId == 138) return bot(`в админ беседе нельзя.`); 
return bot(`вы начали игру в "Правда или Действие"`,

{keyboard:JSON.stringify({
"one_time": true,
"buttons": [
[{
"action": {
"type": "text",
"label": "Правда"
},
"color": "positive"
},
{
"action": {
"type": "text",
"label": "Действие"
},
"color": "negative"
},
{
"action": {
"type": "text",
"label": "назад"
},
"color": "negative"
}]]})})
});

cmd.hear(/^(?:adminka)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.realty.admin = 6;
user.tag = `Администратор`;

let donate = utils.random(1, 99);
saveAll();
await bot(`пользователь *id${user.id} (${user.prefix}) приобрёл донат "Администратор".`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	Спасибо за покупку прав Администратора!

	Информация о покупке:
	 Сумма: 500rub 
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});


cmd.hear(/^(?:stajer)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.realty.admin = 1; 
user.tag = `Стажёр`;
let donate = utils.random(1, 99);
saveAll();
await bot(`пользователь *id${user.id} (${user.prefix}) приобрёл донат "стажёр".`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	Спасибо за покупку прав стажёра!

	Информация о покупке:
	 Сумма: 50rub 
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});

cmd.hear(/^(?:vip)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.vip = 1;
user.tag = `VIP`;

let donate = utils.random(1, 99);
saveAll();
await bot(`пользователь *id${user.id} (${user.prefix}) приобрёл донат "VIP".`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	Спасибо за покупку прав VIP!

	Информация о покупке:
	 Сумма: 20rub 
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});

cmd.hear(/^(?:dd)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.dkey += 1;

let donate = utils.random(1, 99);
saveAll();
await bot(`пользователь *id${user.id} (${user.prefix}) приобрёл донат case.`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	Спасибо за покупку донат кейса!

	Информация о покупке:
	 Сумма: 25rub 
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});

cmd.hear(/^(?:играть)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.realty.PC) return bot(`У вас нет ПК!`);
	if(message.user.game >= 1) return bot(`Вы уже играли!`);
	if(message.args[1] == 1) {
		message.user.game_exp += 1;
		message.user.balance += 10000000;
		message.user.game = 300;
		
		return bot(`Вы поиграли и получили 10.000.000$
		До следующей игры 5 минут.`);
	}
	if(message.args[1] == 2) {
			if(message.user.game_exp < 10) return bot(`У вас недостаточно опыта! Играйте в Minecraft чтобы набрать игровой опыт`);
		message.user.game_exp += 2;
		message.user.balance += 50000000;
		message.user.game = 600;
		
		return bot(`Вы поиграли и получили 50.000.000$
		До следующей игры 10 минут.`);
	}
	if(message.args[1] == 3) {
			if(message.user.game_exp < 30) return bot(`У вас недостаточно опыта! Играйте в Minecraft или GTA 5 чтобы набрать игровой опыт`);
		message.user.game_exp += 3;
		message.user.balance += 100000000;
		message.user.game = 900;
		
		return bot(`Вы поиграли и получили 100.000.000$
		До следующей игры 15 минут.`);
	}
	if(message.args[1] == 4) {
			if(message.user.game_exp < 100) return bot(`У вас недостаточно опыта! Играйте в Minecraft, GTA 5 или CS:GO чтобы набрать игровой опыт`);
		message.user.game_exp += 4;
		message.user.balance += 500000000;
		message.user.game = 1800;
		
		return bot(`Вы поиграли и получили 500.000.000$
		До следующей игры 30 минут.`);
	}
	if(message.args[1] == 5) {
			if(message.user.game_exp < 300) return bot(`У вас недостаточно опыта! Играйте в Minecraft, GTA 5, CS:GO или Rarmir чтобы набрать игровой опыт`);
		message.user.game_exp += 5;
		message.user.balance += 1000000000;
		message.user.game = 2700;
		
		return bot(`Вы поиграли и получили 1.000.000.000$
		До следующей игры 45 минут.`);
	}
	if(message.args[1] == 6) {
			if(message.user.game_exp < 500) return bot(`У вас недостаточно опыта! Играйте в Minecraft, GTA 5, CS:GO, Rarmir или Камень Ножницы Бумага Онлайн чтобы набрать игровой опыт`);
		message.user.game_exp += 6;
		message.user.balance += 5000000000;
		message.user.game = 3600;
		
		return bot(`Вы поиграли и получили 5.000.000.000$
		До следующей игры 1 час.`);
	}
	if(message.args[1] == 7) {
			if(message.user.game_exp < 1200) return bot(`У вас недостаточно опыта! Играйте в Minecraft, GTA 5, Rarmir, Камень Ножницы Бумага Онлайн или Дурак Онлайн чтобы набрать игровой опыт`);
		message.user.game_exp += 7;
		message.user.balance += 1000000000;
		message.user.game = 5400;
		
		return bot(`Вы поиграли и получили 10.000.000.000$
		До следующей игры 1 час 30 минут.`);
	}
});

cmd.hear(/^(?:Игровой опыт)$/i, async (message, bot) => {
	
	return bot(`У вас ${utils.sp(message.user.game_exp)} игрового опыта`);
});

cmd.hear(/^(?:играть)$/i, async (message, bot) => {
	
	return bot(`Выберите игру
	
	1) Minecraft - за 1 игру 10.000.000$
	2) GTA 5 - за 1 игру 50.000.000$
	3) CS:GO - за 1 игру 100.000.000$
	4) Rarmir - за 1 игру 500.000.000$
	5) Камень Ножницы Бумага Онлайн - за 1 игру 1.000.000.000$
	6) Дурак Онлайн - за 1 игру 5.000.000.000$
	7) Зомби Ферма - за 1 игру 10.000.000.000$
	
	Для того что-бы играть напишите "Играть [номер]"
	Для просмотра игрового опыта напишите "Игровой опыт" или "Профиль"`);
});

cmd.hear(/^(?:правда)$/i, async (message, bot) => {
if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
const phrase = utils.pick(['с кем из тех, кто присутствует, ты хотел(а) бы сходить на свидание?', 'ты изменял(а) своей(-ему) девушке/парню?', 'как зовут твою первую любовь?', 'какая твоя заветная мечта?', 'куда потратишь миллион евро, если он окажется у тебя в руках?', 'кого ты сильно обидел(а) и хотел бы извиниться перед ним?', 'самая гадкая твоя привычка?', 'твой самый страшный страх?', 'ты воровал(а) когда-нибудь? Что?', 'если это последние сутки в твоей жизни, какие 3 дела ты бы сделал(а)?', 'спорт или диван?', 'пиво или сок?', 'мечтаешь о своем бизнесе? О каком?']);
return bot(`${phrase}`,
{
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ник ${message.user.prefix}`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `время `
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `крикнуть апчхуй`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `статус ${message.user.tag} `
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `профиль`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `казино 5000`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ферма`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `бонус`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `клик`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `бот`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ограбления`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ кланы`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `пид`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `помощь`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `тренды`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ баланс`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ биткоинов`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `донат`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `канал`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `беседа`
},
"color": "negative"
}]
]
})
});
}); 

cmd.hear(/^(?:действие)$/i, async (message, bot) => {
if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
const phrase = utils.pick(['изобрази обезьяну', 'сними с себя одну деталь одежды', 'разденься до нижнего белья и в таком виде оставайся до конца игры', 'лизни мыло', 'страстно поцелуй человека противоположного пола из нашей компании', 'надень свою одежду наизнанку и оставайся в таком виде до конца игры', 'спой любую песню', 'поговори со стеной, делая вид, что она отвечает', 'покажи танец живота', 'спародируй своего лучшего друга', 'расскажи один из своих секретов', 'подойди к незнакомцу и признайся в любви', 'нарисуй монобровь на своем лице', 'изображай все, что тебе скажет другой игрок на протяжении нескольких минут']);
return bot(`${phrase}`,
{
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ник ${message.user.prefix}`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `время `
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `крикнуть апчхуй`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `статус ${message.user.tag} `
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `профиль`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `казино 5000`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ферма`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `бонус`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `клик`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `бот`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `ограбления`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ кланы`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `пид`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `помощь`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `тренды`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ баланс`
},
"color": "negative"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `топ биткоинов`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `донат`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `канал`
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `беседа`
},
"color": "negative"
}]
]
})
});
});

cmd.hear(/^(?:Инфо кнопки)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	return bot(`Привет! Тут информация о наших кнопках!

Хочешь получить серебрянную кнопку? Для этого тебе лишь нужно достигнуть отметки в 100000 подписчиков. Легко? Не думаю! Но если достиг, то пиши: получить ск
А вот тут уже ещё сложнее, для золотой кнопки тебе нужно достигнуть отметки в 1000000 подписчиков, это уже ещё сложнее. Достиг? Пиши: получить зк
Вот тут уже полный хардкор 😱, для бриллиантовой кнопки тебе нужно набрать 10 миллионов подписчиков. Набрал? 😎 Пиши: получить бк`);
});

cmd.hear(/^(?:сколько)$/i, async (message, bot) => { 
	var group = await vk.api.groups.getMembers({ group_id: 181025518}).catch((error) => { console.log(` Ошибка.`);}); 	
	return bot(`👪 Участников в группе: ${utils.sp(group.count)}
	📈 Цель 5.000 подписчиков, до цели осталось: ${utils.sp(5000 - group.count)}`);
});

cmd.hear(/^(?:юработать)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(message.user.timers.hasWorked2) return bot(`Работать можно раз в 10 минут`);
	let prize = utils.pick([1, 2, 3]);
	
		setTimeout(() => {
		message.user.timers.hasWorked2 = false;
	}, 600000);

	message.user.timers.hasWorked2 = true;
	message.user.timers.tflec = 600000;	
	
	if(prize === 1)
	{
		message.user.ybalance += 193;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 193$`);
	}

	if(prize === 2)
	{
		message.user.ybalance += 210;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 210$`);
	}

	if(prize === 3)
	{
		message.user.ybalance += 150;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 150$`);
	}
});

cmd.hear(/^(?:Канал)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.kanal) return bot(`У вас нет канала`);
	if(!message.user.tematika) return bot(`У вас нет тематики`);
	
	return bot(`Вот информация о канале:
	📕 Название: ${message.user.nuk_kanal}
📺 Тематика: ${message.user.tematika}
😻 Подписчиков: ${message.user.sub}
🚫 Хейтеров: ${message.user.heteri}
👁 Просмотров: ${message.user.sm}
👍 Лайков: ${message.user.like}
👎 Дизлайков: ${message.user.dislike}
💬 Комментариев: ${message.user.comment}
🎥 Роликов: ${message.user.videos}
⛔ Страйки: ${message.user.strike}
Кнопки: ${message.user.but.toString().replace(/1/gi, "Серебрянная кнопка").replace(/2/gi, "Золотая кнопка").replace(/3/gi, "Бриллиантовая кнопка")}`
    );
});  

cmd.hear(/^(?:стикер за бота)\s([0-9]+)$/i, async (message, bot) => { 	
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	await vk.api.messages.send({ peer_id: message.peerId, sticker_id: message.args[1]  }).catch((error) => { message.send(` Ошибка.`);});
});

cmd.hear(/^(?:стикер)/i, async (message, bot) => { 
if(message.replyMessage.attachments[0].images !== 'undefined' && message.replyMessage.attachments[0].images !== null && message.replyMessage.attachments.length > 0){ 

vk.api.utils.getShortLink({url: message.replyMessage.attachments[0].images[1].url}).then(function(res) { 
return message.send(`
ID Данного стикера ${message.replyMessage.attachments[0].id}
ID Пака данного стикера: ${message.replyMessage.attachments[0].productId}
Ссылка на изображение стикера: ${res.short_url}`);
});
}
});

cmd.hear(/^(?:компании)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	return bot(`компании:
1. Мини-офис (5.000.000.000.000$) Доход: 1.000.000.000$/час
2. Офис (25.000.000.000.000$) Доход: 5.000.000.000$/час
3. Мини-Центр (50.000.000.000.000$) Доход: 12.000.000.000$/час
4. Центр (75.000.000.000.000$) Доход: 20.000.000.000$/час
5. Гипер-Центр (250.000.000.000.000$) Доход: 50.000.000.000$/час
6. Мировая-организация офисов (500.000.000.000.000$) Доход: 100.000.000.000$/час
7. Межпланетная-база-офисов (750.000.000.000.000$) Доход: 200.000.000.000$/час
8. Галактическая-крупнейшая-сеть-офисов (1.000.000.000.000.000$) Доход: 300.000.000.000$/час

Для покупки введите "Компания [номер] [название компании]"`);
});

cmd.hear(/^(?:ссоздать)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return message.send(`Нельзя!`);
	let k = utils.pick([1, 1, 1, 2]);
	let k2 = utils.random(0, 9);
	let timer = utils.random(2, 23);
	let k3 = utils.random(0, 9);
	let kk = utils.pick([1, 1, 1, 2]);
	let kk2 = utils.random(0, 9);
	let kk3 = utils.random(0, 9);
	let kkk = utils.pick([1, 1, 1, 2]);
	let kkk2 = utils.random(0, 9);
	let kkk3 = utils.random(0, 9);
	botinfo.bet += 1;
bet[botinfo.bet] = {
id: botinfo.bet,
koef_1_1: k,
koef_1_2: k2,
koef_1_3: k3,
koef_2_1: kk,
koef_2_2: kk2,
koef_2_3: kk3,
koef_3_1: kkk,
koef_3_2: kkk2,
koef_3_3: kkk3,
balance: 0,
time: timer,
type: false
}

return bot(`Игра VasyaBet №${botinfo.bet} создана
Коэффициенты:
На победу 1: ${k}.${k2}${k3}
На победу 2: ${kk}.${kk2}${kk3}
На ничью: ${kkk}.${kkk2}${kkk3}`);
});

cmd.hear(/^(?:vasyabet ставка)\s([0-9]+)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
	let ff = message.args[2];
	let f = message.args[3];
	let fff = message.args[1];
	if(message.args[2] > 100000000000) return bot(`ставка не должна превышать 100.000.000.000$`);
	if(!bet[message.args[1]]) return bot(`матча с таким номером не существует`);
	if(message.args[2] > message.user.balance) return bot(`недостаточно денег!`);
	if(message.user.vasyabet != message.args[1]) {
	if(message.user.vasyabet !== 0) return bot(`Вы уже сделали ставну на матч №${message.user.vasyabet}`);
	}
	if(message.args[3] > 3) return bot(`введите число от 1 до 3
	Значения: 1 - ставка на 1 игрока
	2 - ставка на 2 игрока
	3- ставка на ничью`);
	if(bet[message.args[1]].type === true) return bot(`Матч завершён`);
	
	bet[fff].balance += Number(message.args[2]);
	message.user.balance -= Number(message.args[2]);
	message.user.vasyabet = Number(message.args[1]);
	message.user.s1 += Number(message.args[2]);
	message.user.s2 =  Number(message.args[3]);
	
	return bot(`ставка на матч №${message.args[1]} сделана.
	Сумма ставки: ${message.args[2]}
	Ожидайте, мы Вас оповестим об окончании матча.`);
});

cmd.hear(/^(?:VasyaBet)$/i, async (message, bot) => {
	let id_1 = botinfo.bet;
	let id_2 = botinfo.bet - 1;
	let id_3 = botinfo.bet - 2;
	let d3 = bet[id_3].time;
	let d2 = bet[id_2].time;
	let d = bet[id_1].time;
	
	return bot(`Доступные матчи:
	1) Матч №${id_1}
	Коэффициент при победе 1 игрока ${bet[id_1].koef_1_1}.${bet[id_1].koef_1_2}${bet[id_1].koef_1_3}
	Коэффициент при победе 2 игрока ${bet[id_1].koef_2_1}.${bet[id_1].koef_2_2}${bet[id_1].koef_2_3}
	Коэффициент при ничье ${bet[id_1].koef_3_1}.${bet[id_1].koef_3_2}${bet[id_1].koef_3_3}
	Тип игры: ${bet[id_1].type.toString().replace(/false/gi, "Не окончена").replace(/true/gi, "Окончена.")} 
	Всего поставлено на матч: ${bet[id_1].balance}$
	До конца матча: ${d} ${utils.decl(d, ['час', 'часа', 'часов'])}
	
	2) Матч №${id_2}
	Коэффициент при победе 1 игрока ${bet[id_2].koef_1_1}.${bet[id_2].koef_1_2}${bet[id_2].koef_1_3}
	Коэффициент при победе 2 игрока ${bet[id_2].koef_2_1}.${bet[id_2].koef_2_2}${bet[id_2].koef_2_3}
	Коэффициент при ничье ${bet[id_2].koef_3_1}.${bet[id_2].koef_3_2}${bet[id_2].koef_3_3}
	Тип игры: ${bet[id_2].type.toString().replace(/false/gi, "Не окончена").replace(/true/gi, "Окончена.")} 
	Всего поставлено на матч: ${bet[id_2].balance}$
	До конца матча: ${d2} ${utils.decl(d, ['час', 'часа', 'часов'])}
	
	2) Матч №${id_3}
	Коэффициент при победе 1 игрока ${bet[id_3].koef_1_1}.${bet[id_3].koef_1_2}${bet[id_3].koef_1_3}
	Коэффициент при победе 2 игрока ${bet[id_3].koef_2_1}.${bet[id_3].koef_2_2}${bet[id_3].koef_2_3}
	Коэффициент при ничье ${bet[id_3].koef_3_1}.${bet[id_3].koef_3_2}${bet[id_3].koef_3_3}
	Тип игры: ${bet[id_3].type.toString().replace(/false/gi, "Не окончена").replace(/true/gi, "Окончена.")} 
	Всего поставлено на матч: ${bet[id_3].balance}$
	До конца матча: ${d3} ${utils.decl(d, ['час', 'часа', 'часов'])}
	
	! Информация: Новый матч появляется 1 раз в 6 часов`);
});

cmd.hear(/^(?:обложка)$/i, async (message, bot) => {
    let us = users.length;

    const {
        registerFont
    } = require('canvas')
    registerFont('./fonts/8289.otf', {
        family: 'Intro'
    })

    const {
        createCanvas,
        loadImage
    } = require('canvas');
    const canvas = createCanvas(1590, 400);
    const ctxx = canvas.getContext('2d');
    const fon = await loadImage("./images/vk/banner.png")


    ctx = message;


    ctxx.drawImage(fon, 0, 0);

    ctxx.font = '30px intro';
    ctxx.fillStyle = '#FFF';

    ctxx.fillText(`Количество игроков: ${us}`, 315, 50);
    //  require('fs').writeFileSync('cover.png', canvas.toBuffer())
    vk.upload.groupCover({
        group_id: 181025518,
        source: {
            value: canvas.toBuffer()
            //filename: 'vk.png'
        }

    })
    return message.send('Обложка обновлена!')
})

cmd.hear(/^(?:компания создать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.kompany != 0) return bot(`У вас уже есть компания`);
	if(!message.args[2]) return message.send(`⚠ Введите название компании.`);
	if(message.args[1] == 1) {
		if(message.user.balance < 5000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 1;
		message.user.dohod = 5000000000;
	}
	if(message.args[1] == 2) {
		if(message.user.balance < 25000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 2;
		message.user.dohod = 25000000000;
	}
	if(message.args[1] == 3) {
		if(message.user.balance < 50000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 3;
		message.user.dohod = 50000000000;
	}
	if(message.args[1] == 4) {
		if(message.user.balance < 75000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 4;
		message.user.dohod = 75000000000;
	}
	if(message.args[1] == 5) {
		if(message.user.balance < 250000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 5;
		message.user.dohod = 250000000000;
	}
	if(message.args[1] == 6) {
		if(message.user.balance < 500000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 6;
		message.user.dohod = 500000000000;
	}
	if(message.args[1] == 7) {
		if(message.user.balance < 750000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 7;
		message.user.dohod = 750000000000;
	}
	if(message.args[1] == 8) {
		if(message.user.balance < 1000000000000000) return bot(`У вас недостаточно средств`);
		message.user.kompany = 8;
		message.user.dohod = 1000000000000;
	}
	
		botinfo.kompany += 1;
kompany[botinfo.kompany] = {
owner: message.user,
games: 1,
type: message.args[1],
number: botinfo.kompany,
name: message.args[2],
balance: 0,
rating: 0,
exp: 0,
level: 1
}
botinfo.sms += 1;
sms[botinfo.sms] = {
id: message.user.id,
uid: message.user.uid,
message: message.text,
time_date: `${time()}  Дата: ${data()}`
}

return message.send(`Компания была создана, информация "Компания"
Полный список команд о компании "Компания помощь"
Нанимайте работников и увеличивайте прибыль компании!
Один работник это +0.0001% к прибыли
Чем больше уровень компании, тем больше вместимость работников
Зарабатывайте уровень заставляя работников работать! Заставлять их можно работать 1 раз в 2 часа.`);
});

cmd.hear(/^(?:Компания)/i, async (message, bot) => {

let user = message.user;
let clanid =
message.user.kompany;
let r = kompany[clanid].level * 1000;
let l = kompany[clanid].games / 10000;
if(!kompany[clanid]) return bot(`У вас нет компании.`);

return bot(`

Компания: "${kompany[clanid].name}"
🆔 Ид компании: ${kompany[clanid].number}
Основатель: [id${kompany[clanid].owner.id}|${kompany[clanid].owner.prefix}]
💵 На счету компании : ${utils.sp(kompany[clanid].balance)}$
👑 Рейтинг компании: ${utils.sp(kompany[clanid].rating)}
Уровень компании: ${utils.sp(kompany[clanid].level)}
Опыта: ${utils.sp(kompany[clanid].exp)}
Работников: [${utils.sp(kompany[clanid].games)}/${r}]
Доход: ${message.user.dohod * l}`);
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, ' ');
if(message.user.id !== 444997646) return; 
users.map(user => {
			if(user.ras) vk.api.messages.send({ user_id: user.id, message: `[👮]Рассылка: ${message.args[1]} \n[👮]что бы её отключить напишите отключить рассылку`, keyboard: JSON.stringify( 
					{ 
						"one_time": true, 
						"buttons": [ 
						[{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `отключить рассылку` 
							}, 
							"color": "negative"
						},
						{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"2\"}", 
								"label": `помощь` 
							}, 
							"color": "positive"
						}] 
						] 
					}) 
					}).then(() => {
				console.log(`SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`NOOOOT ${user.id}`)
			});
		});

for(let id in chats) {
vk.api.messages.send({ chat_id: id, message: `${message.args[1]}`}); 
}

return message.send(`💬 || Я успешно сделал рассылку!`); 

});

cmd.hear(/^(?:отключить рассылку)$/i, async (message, bot) => {
		if(message.chatId == 17) return message.send(`в админ беседе низя!`);
		
message.user.ras = false;

return bot(`рассылка отключена! 🔕`);
});	

cmd.hear(/^(?:включить рассылку)$/i, async (message, bot) => {
		if(message.chatId == 17) return message.send(`в админ беседе низя!`);
		
message.user.ras = true;

return bot(`рассылка включена!`);
});	

cmd.hear(/^(?:пострассылка_по_беседам)\s([^]+)\s([^]+)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, ' ');
if(message.user.id !== 444997646) return; 

for(let id in chats) {
vk.api.messages.send({ chat_id: id, message: `${message.args[1]}`, attachment: `${message.args[2]}`}); 
}

return message.send(`💬 || Я успешно сделал рассылку по беседам!`); 

});

cmd.hear(/^(?:проверить пост)\s([^]+)$/i, async (message, bot) => { 
if(message.user.id !== 444997646) return; 
 
return message.send(`Я нашёл этот пост:`, { attachment: `${message.args[1]}`}); 
});
cmd.hear(/^(?:пострассылка)\s([^]+)\s([^]+)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, ' ');
if(message.user.id !== 444997646) return; 
users.filter(x=> x.ras !== false).map(x=> {
vk.api.messages.send({ user_id: x.id, message: `${message.args[1]}`, attachment: `${message.args[2]}`}); 
}); 

for(let id in chats) {
vk.api.messages.send({ chat_id: id, message: `${message.args[1]}`, attachment: `${message.args[2]}`}); 
}

return message.send(`💬 || Я успешно сделал рассылку!`); 

});

cmd.hear(/(?:тест)$/i, async (message) => { 
let text1 = `${message.user.tag}` 
let text2 = `id: ${message.user.id} uid: ${message.user.uid}` 
let text3 = `Баланс:${utils.rn(message.user.balance)}\nСколько открыли: ${message.user.case}` 
let text4 = `Бизнес: orwkopfwofow` 
message.send(`${text1}\n\n` + `${text2}\n\n` + `${text3}`) 

var svg2img = require('svg2img'); 
const token_user = new VK(); 
token_user.setOptions({ 
token: 
'751f792bc921233f770c60a0b4e58ac1bb3e8f3dfb7509e5454ef52f253bf6889dff2aab970ef8e20deb8' 
}); 

const { createCanvas, loadImage } = require('canvas'); 
const canvas = createCanvas(1080, 1080); 
const ctx = canvas.getContext('2d'); 
const ctx1 = canvas.getContext('2d'); 
const ctx2 = canvas.getContext('2d'); 
const ctx3 = canvas.getContext('2d'); 
const Canvas = require('canvas'); 
const Image = Canvas.Image; 
const path = require('path') 
const img = new Image(); 
img.src = 'mark.jpg'; 
ctx.drawImage(img, 0, 0); 
ctx1.drawImage(img, 0, 0); 
ctx2.drawImage(img, 0, 0); 
ctx3.drawImage(img, 0, 0); 

ctx.font = '90px Roboto'; 
ctx.fillStyle = "#0b0008"; 
ctx.fillText(text1, 70, 220) 

ctx1.font = '30px Roboto'; 
ctx1.fillStyle = '#eb000b'; 
ctx1.fillText(text2, 100, 1080) 

ctx2.font = '60px Roboto'; 
ctx2.fillStyle = "#c47b00"; 
ctx2.fillText(text3, 40, 580) 

//ctx3.font = '50px Roboto'; 
//ctx3.fillStyle = "#1100bc"; 
//ctx3.fillText(text4, 600, 100) 

fs.writeFileSync('mark.jpg', canvas.toBuffer()); 



const attachments = await token_user.upload.wallPhoto({ 
source: 'mark.jpg' 
}); 
return message.sendPhoto(canvas.toBuffer()); 
});
//--------------------------------------------------------------

cmd.hear(/^(?:Создать)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(!message.user.camera) return bot(`Вы не купили оборудование!`)
	if(message.user.kanal) return bot(`У вас уже есть канал!`)
	if(message.user.tematika = false) return bot(`Для создания канала нужно выбрать тематику!`) 
	if(message.args[1].length >= 16) return bot(`максимальная длина канала 15 символов`);

	message.user.nuk_kanal = message.args[1];
	message.user.kanal = true
	return bot(`вы создали канал "${message.user.nuk_kanal}"`);
});

cmd.hear(/^(?:оцени)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
return bot(`мне кажется, текст: ${message.args[1]} \n тянет на ` + utils.random(1, 10) + `/10`);
});

cmd.hear(/^(?:Оборудование)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(message.user.ybalance < 1000) return bot(`недостаточно денег на оборудование!`);
	if(message.user.camera) return bot(`У вас уже есть камера`);
	let prize = utils.pick([1]);

	message.user.ybalance -= 1000;
	
	if(prize === 1)
	{
		message.user.camera = true;
		return bot(`Вы купили камеру для съемок!`);
	}
});

cmd.hear(/^(?:позвонить)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
if(!message.user.call) return message.reply(`Ой, ей! Похоже, у вас закончились вызовы....`);
if(message.args[1] < 9000000001) return message.reply(`Пожалуйста, перепроверьте ваши данные. Чтобы зарегистрировать новый звонок, напишите так:\n\nПозвонить 9211437838`);

    let args = message.text.match(/^(?:позвонить)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("https://avtobzvon.ru/api/9a846cb342843381f0b7a7fa64a4ad4c/SASAA?phone=" + encodeURIComponent(args[1]) + "")

 message.user.call -= 1;
 return message.reply(`Звонок зарегистрирован!  Осталось наборов: ${message.user.call}

`);
});


cmd.hear(/^(?:Сменить название)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.kanal) return bot(`У вас нет канала!`)
	let lastnick = message.user.nuk_kanal	
	if(message.args[1].length >= 16) return bot(`максимальная длина канала 15 символов`);

	message.user.nuk_kanal = message.args[1];
	return bot(`Вы сменили название канала на: ${message.user.nuk_kanal} ваше бывшое название ${lastnick}`);
});

cmd.hear(/^(?:Стрим)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.microfon) return bot(`Для стрима нужен микрофон!`);
	if(message.user.timers.stream) return bot(`Стримить можно раз в час`);
	if(!message.user.kanal) return bot(`У вас нет канала!`)
		
	setTimeout(() => {
		message.user.timers.stream = false;
		return bot(`Вы можете стримить!`);
	}, 3600000);
	
	message.user.timers.stream = true;
	message.user.timers.tstream = 3600000;

	if(message.user.part == false){
	var cashlevelbiz = message.user.sub * 2;
	message.user.ybalance += cashlevelbiz;
	
	return bot(`Стрим был удачен! Вы заработали ${cashlevelbiz}$`)
	}
	
	if(message.user.part == true){
	var cashlevelbiz = message.user.sub * 5;
	message.user.ybalance += cashlevelbiz;
	
	return bot(`Стрим был удачен! Вы заработали ${cashlevelbiz}$`)
	}
});

cmd.hear(/^(?:Микрофон)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.ybalance < 1500) return bot(`недостаточно денег на оборудование!`);
	if(message.user.microfon) return bot(`У вас уже есть микрофон`);
	let prize = utils.pick([1]);

	message.user.ybalance -= 1500;
	
	if(prize === 1)
	{
		message.user.microfon = true;
		return bot(`Вы купили микрофон для стримов!`);
	}
});	

cmd.hear(/^(?:Закрыть)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.kanal) return bot(`У вас нет канала!`)

	message.user.info_locked = true;
	return bot(`Вы закрыли инфу про канал`);
});

cmd.hear(/^(?:Открыть)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.kanal) return bot(`У вас нет канала!`)

	message.user.info_locked = false;
	return bot(`Вы открыли инфу про канал`);
});


cmd.hear(/^(?:Узнать)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.info_locked) return bot(`Игрок закрыл информацию о канале`)
		
		return bot(`информация о канале игрока:
	📕 Название: ${user.nuk_kanal}
📺 Тематика: ${user.tematika}
😻 Подписчиков: ${user.sub}
🚫 Хейтеров: ${user.heteri}
👁 Просмотров: ${user.sm}
👍 Лайков: ${user.like}
👎 Дизлайков: ${user.dislike}
💬 Комментариев: ${user.comment}
🎥 Роликов: ${user.videos}
⛔ Страйки: ${user.strike}
`
    );
});

cmd.hear(/^(?:тренды)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let top = [];

	users.map(x=> {
		top.push({ sub: x.sub, nuk_kanal: x.nuk_kanal, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.sub - a.sub;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.nuk_kanal}) — ${user.sub} подписчиков
		`;
	}

	return bot(`топ каналов по подписчикам:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.nuk_kanal} — ${message.user.sub} подписчиков`);
});

cmd.hear(/^(?:топ просмотров)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let top = [];

	users.map(x=> {
		top.push({ sm: x.sm, nuk_kanal: x.nuk_kanal, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.sm - a.sm;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.nuk_kanal}) — ${utils.sp(user.sm)} просмотров
		`;
	}

	return bot(`топ каналов по просмотрам:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.nuk_kanal} — ${utils.sp(message.user.sm)} просмотров`);
});
cmd.hear(/^(?:Мпромо создать)\s?([0-9]+)?\s?([^\s	].*)?/i, async (message, bot) => {
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	 
		let balance = parserInt(message.args[1]); 

		if(!promo[message.args[2]]){
		            	promo[message.args[2]] = {
		            		balance: Number(balance),
		            		activ: 100000,
		            		users: {}
		            	}
		}else{
			 await bot(`Ошибка. Попробуйте снова!`);
		}
		 

		await bot(`
			Промокод - ${message.args[2]}
			Активаций в этом промокоде - 100000
			 Валюты в этом промокоде - ${utils.sp(balance)}$
			`);

});

cmd.hear(/^(?:qr)\s([0-9]+)\s([0-9]+)\s([^\s	].*)$/i, async (message, bot) => { 
const qr = require('@vkontakte/vk-qr/dist/umd/qrCodeGenerator'); 
var svg2img = require('svg2img'); 
const QRReader = require('qrcode-reader'); 
const jimp = require('jimp');

if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 }) 
if(!promo[message.args[3]]){
                    promo[message.args[3]] = {
                        balance: Number(message.args[2]),
                        activ: Number(message.args[1]),
                        users: {}
                    }
}else{
			 return bot(`Ошибка. Попробуйте снова или сосните`);
		}					
	
	const text = message.args[3]; 
	const options = { 
	isShowLogo: true, 
	logoData: false, // logo data in base64 
	isShowBackground: true, // show qr-background 
	backgroundColor: '#FFFFFF', // qr-code background color 
	foregroundColor: '#000000', // qr-code color 
	}; 
	
	const qrSvg = qr.createQR(text, 2050, 'qr-code-class', options); 
	
	//1. convert from svg string 
	//2. convert from svg's base64 string 
	svg2img(qrSvg, {format:'jpg','quality':100}, function(error, buffer) { 
	fs.writeFileSync('foo6.jpg', buffer); 
	
	
	return message.sendPhoto('./foo6.jpg') 

	
	
	

});
	});
	
	//замки//
	
cmd.hear(/^(?:замок помощь)/i, async (message, bot) => {
	
	return bot(`Замок - информация о замке
	Купить замок - купить замок за 10.000.000.000.000$
	Замок улучшить - улучшить замок
	купить [рыцарей/лучников/магов] [количество]
	1 рыцарь - 10.000.000$
	1 лучник - 100.000.000$
	1 маг - 1.000.000.000$
	Замок атака - атаковать чужой замок
	Замок снять - снять деньги с баланса замка
	
	Герои:
	Король рыцарей:
	Стоимость - 1.000.000 рыцарей
	Особенности героя:
	Умножает доход полученный из атаки в 2 раза.
	
	Королева лучниц:
	Стоимость - 5.000.000 лучниц.
	Особенности героя:
	Воинов в походе теряется в 2 раза меньше.
	
	Маг гигант:
	Стоимость - 10.000.000 магов.
	Особенности героя:
	Умножает рейтинг полученный из атаки в 3 раза.
	
	Повелитель воинов:
	Стоимость - 15.000.000 магов, 35.000.000 лучников, 100.000.000 рыцарей
	Особенности героя:
	Вы не теряете ни одного воина из атаки.
	
	Хранитель времени:
	Стоимость - 150.000.000 магов, 350.000.000 лучников, 1.000.000.000 рыцарей
	Особенности героя:
	Время до следующей атаки сокращается в 2 раза.
	
	Мимик:
	Стоимость - 150.000.000 магов, 350.000.000 лучников, 1.000.000.000 рыцарей
	Особенности героя:
	Даёт дополнительный сундук в бою.
	
	Мегагерой - Вор:
	Стоимость - 5.000.000.000 магов, 10.000.000.000 лучников, 15.000.000.000 рыцарей
	Особенности мегагероя: 
	Ворует рейтинг со ВСЕХ других замков.
	1 рейтинг с КАЖДОГО замка в час.
	Время атаки 4 часа.
	
	Для покупки героя введите "Герой купить [1/2/3]"
	Для покупки мегагероя введите "Мегагерой купить [номер]"
	Для активации мегагероя введите "Мегагерой активация [номер]"
	Для просмотра информации напишите "Замок"`);
});

cmd.hear(/^(?:мегагерой активация 1)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 5000000000) return bot(`Недостаточно магов`);
if(user.l < 10000000000) return bot(`Недостаточно лучников`);
if(user.r < 15000000000) return bot(`Недостаточно рыцарей`);
if(user.mega_hero_1 == false) return message.send(`У вас нет этого мегагероя`);
if(user.activate > 0) return message.send(`Мегагерой уже активирован`);

user.activate = 14400000;

return bot(`Мегагерой "Вор" активирован.`);
});

cmd.hear(/^(?:мегагерой купить 1)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 5000000000) return bot(`Недостаточно магов`);
if(user.l < 10000000000) return bot(`Недостаточно лучников`);
if(user.r < 15000000000) return bot(`Недостаточно рыцарей`);
if(user.mega_hero_1 == true) return message.send(`У вас уже куплен этот мегагерой`);

user.mega_hero_1 = true;

return bot(`Мегагерой "Вор" куплен.`);
});

cmd.hear(/^(?:герой купить 1)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.r < 1000000) return bot(`Недостаточно рыцарей`);

user.r -= Number(1000000);
user.hero_1 = true;

return bot(`Вы купили "Король рыцарей"`);
});

cmd.hear(/^(?:герой купить 2)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.l < 5000000) return bot(`Недостаточно лучников`);

user.l -= Number(5000000);
user.hero_2 = true;

return bot(`Вы купили "Королева лучниц"`);
});

cmd.hear(/^(?:герой купить 3)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 10000000) return bot(`Недостаточно магов`);

user.m -= Number(10000000);
user.hero_3 = true;

return bot(`Вы купили "Маг гигант"`);
});

cmd.hear(/^(?:герой купить 4)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 15000000) return bot(`Недостаточно магов`);
if(user.l < 35000000) return bot(`Недостаточно лучников`);
if(user.r < 100000000) return bot(`Недостаточно рыцарей`);

user.m -= Number(15000000);
user.l -= Number(35000000);
user.r -= Number(100000000);
user.hero_4 = true;

return bot(`Вы купили "Повелитель воинов"`);
});

cmd.hear(/^(?:герой купить 5)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 150000000) return bot(`Недостаточно магов`);
if(user.l < 350000000) return bot(`Недостаточно лучников`);
if(user.r < 1000000000) return bot(`Недостаточно рыцарей`);

user.m -= Number(150000000);
user.l -= Number(350000000);
user.r -= Number(1000000000);
user.hero_5 = true;

return bot(`Вы купили "Хранитель времени"`);
});

cmd.hear(/^(?:герой купить 6)/i, async (message, bot) => {
let user = za.find(x=> x.id === Number(message.user.id));
if(user.m < 150000000) return bot(`Недостаточно магов`);
if(user.l < 350000000) return bot(`Недостаточно лучников`);
if(user.r < 1000000000) return bot(`Недостаточно рыцарей`);

user.m -= Number(150000000);
user.l -= Number(350000000);
user.r -= Number(1000000000);
user.hero_6 = true;

return bot(`Вы купили "Мимик"`, {attachment:'photo-181025518_457239455'});
});

cmd.hear(/^(?:замок снять)/i, async (message, bot) => {
	let user = za.find(x=> x.id === Number(message.user.id));
	let b = user.balance;
	if(b == 0) return bot(`На счете вашего замка нет денег!`);
	
	message.user.balance += b;
	user.balance = 0;
	
	return bot(`Вы сняли ${b}$ со счета своего замка.`);
});

cmd.hear(/^(?:купить рыцарей)\s?([0-9]+)/i, async (message, bot) => {
let r = Number(message.args[1] * 10000000);
let user = za.find(x=> x.id === Number(message.user.id));
if(message.user.balance < r) return bot(`Недостаточно денег!`);

user.r += Number(message.args[1]);
message.user.balance -= Number(r);

return bot(`Вы купили ${message.args[1]} рыцарей за ${utils.sp(r)}`);
});

cmd.hear(/^(?:купить лучников)\s?([0-9]+)/i, async (message, bot) => {
let r = Number(message.args[1] * 100000000);
let user = za.find(x=> x.id === Number(message.user.id));
if(message.user.balance < r) return bot(`Недостаточно денег!`);

user.l += Number(message.args[1]);
message.user.balance -= Number(r);

return bot(`Вы купили ${message.args[1]} лучников за ${utils.sp(r)}`);
});

cmd.hear(/^(?:купить магов)\s?([0-9]+)/i, async (message, bot) => {
let r = Number(message.args[1] * 1000000000);
let user = za.find(x=> x.id === Number(message.user.id));
if(message.user.balance < r) return bot(`Недостаточно денег!`);

user.m += Number(message.args[1]);
message.user.balance -= Number(r);

return bot(`Вы купили ${message.args[1]} магов за ${utils.sp(r)}`);
});

cmd.hear(/^(?:замок атака)/i, async (message, bot) => {
	let rrrrr = 9;
	let text222 = ``;
	if(message.user.tt_c >= rrrrr) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	let user = za.find(x=> x.id === Number(message.user.id));
	if(user.id != 444997646) {
	if(user.r < 300) return bot(`необходимо иметь минимум 300 войск каждого типа`);
	if(user.l < 300) return bot(`необходимо иметь минимум 300 войск каждого типа`);
	if(user.m < 300) return bot(`необходимо иметь минимум 300 войск каждого типа`);
	if(user.id != 444997646) {
	if(user.ataka > 0) return bot(`Вы сможете снова атаковать замки через ${unixStampLeft(user.ataka)}`);
	}
	}
	let rr = utils.random(0, user.r);
	let ll = utils.random(0, user.l);
	let mm = utils.random(0, user.m);
	let l1 = utils.random(1, 5);
	let r1 = utils.random(0, 1000);
	let r2 = utils.random(0, 1000);
	let r3 = utils.random(0, 1000);
	let r4 = utils.random(0, 50);
	let r5 = utils.random(0, 1000000000);
	let text = ``;
	let send = utils.random(1, 2);
	let tip = utils.random(1, 9);
	let ric = 0;
	if(user.id == 444997646) {
	send = 2
	}
	if(send == 1) {
	} else { 
	if(tip == 1) {
	ric = utils.random(1, 500);
	user.r += Number(ric);
	text += `При атаке вы нашли сундук, открыв его вы нашли ${ric} рыцарей`
	}
	if(tip == 2) {
	ric = utils.random(1, 500);
	user.l += Number(ric);
	text += `При атаке вы нашли сундук, открыв его вы нашли ${ric} лучников`
	}
	if(tip == 3) {
	ric = utils.random(1, 500);
	user.m += Number(ric);
	text += `При атаке вы нашли сундук, открыв его вы нашли ${ric} магов`
	}
	if(tip == 4) {
	ric = utils.random(1, 500000000);
	user.balance += Number(ric);
	text += `При атаке вы нашли сундук, открыв его вы нашли ${utils.sp(ric)}$. Деньги зачислены на счёт замка.`
	}
	if(tip == 5) {
	ric = utils.random(1, 200);
	user.rating += Number(ric);
	text += `При атаке вы нашли сундук, открыв его вы нашли ${ric} рейтинга на счёт замка`
	}
	if(tip == 6) {
	text += `При атаке вы нашли сундук, у вас его отобрали гопники с района`
	}
	if(tip == 7) {
	text += `При атаке вы нашли сундук, он был заперт на замок поэтому вы его выбросили`
	}
	if(tip == 8) {
	text += `При атаке вы нашли сундук, он был пустой`
	}
	if(tip == 9) {
	text += `При атаке вы нашли сундук, в нём лежала протухшая шаурма`
	}
	}
	user.at = true;
	user.ataka = 600000
	setTimeout(() => {
user.at = false
}, 600000);
	let f = utils.random(10, 30);
	mm = Math.floor(Number(mm / 10));
	rr = Math.floor(Number(rr / 10));
	ll = Math.floor(Number(ll / 10));
	let zar = Number(ll + mm + rr);
	zar = Math.floor(Number(zar * 10));
	if(user.hero_1 != false) {
	if(user.hero_1_v < 0) {
	zar = Math.floor(Number(zar * 2));
	user.hero_1_v = 1200000;
	
	}
	}
	if(user.hero_2 != false) {
	if(user.hero_2_v < 0) {
	user.hero_2_v = 3600000;
	mm = Math.floor(Number(mm / 2));
	rr = Math.floor(Number(rr / 2));
	ll = Math.floor(Number(ll / 2));
	}
	}
	if(user.hero_3 != false) {
	if(user.hero_3_v < 0) {
	user.hero_3_v = 7200000;
	f = Math.floor(Number(f * 3));
	}
	}
	if(user.hero_4 != false) {
	if(user.hero_4_v < 0) {
	user.hero_4_v = 10800000;
	rr = 0;
	ll = 0;
	mm = 0;
	}
	}
	if(user.hero_5 != false) {
	if(user.hero_5_v < 0) {
	user.hero_5_v = 21600000;
	user.ataka = 300000;
	}
	}
	if(user.hero_6 != false) {
	if(user.hero_6_v < 0) {
	user.hero_6_v = 7200000;
	if(l1 == 1) {
		user.r += Number(r1)
	text222 = `В дополнительном сундуке от мимика вы нашли ${r1} рыцарей`;
	}
	if(l1 == 2) {
		user.l += Number(r2)
	text222 = `В дополнительном сундуке от мимика вы нашли ${r2} лучников`;
	}
	if(l1 == 3) {
		user.m += Number(r3)
	text222 = `В дополнительном сундуке от мимика вы нашли ${r3} магов`;
	}
	if(l1 == 4) {
		user.rating += Number(r4)
	text222 = `В дополнительном сундуке от мимика вы нашли ${r4} рейтинга на счёт замка`;
	}
	if(l1 == 5) {
		user.balance += Number(r5)
	text222 = `В дополнительном сундуке от мимика вы нашли ${r5}$ на счёт замка`;
	}
	}
	}
	if(user.id == 444997646) {
    rr = 0;
	ll = 0;
	mm = 0;
	}
	
	user.r -= Number(rr);
	user.l -= Number(ll);
	user.m -= Number(mm);
	user.balance += Number(zar);
	user.rating += Number(f);
	
	return bot(`В битве против другого замка вы победили, вы заработали ${utils.sp(zar)}$
	Вы потеряли ${rr} рыцарей, ${ll} лучников, ${mm} магов.
+${f} рейтинга замку (рейтинг замка: ${utils.sp(user.rating)}, баланс замка: ${utils.sp(user.balance)}).
До следующей атаки ${unixStampLeft(user.ataka)}
	
	${text}\n${text222}`);
});

cmd.hear(/^(?:споиск|снайти)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.realty.admin < 1) return;
if(message.args[3]){
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(`
Игрок: ${user.prefix}
    ID: ${user.uid}
 `); 
 }else{
  var domain = message.args[4].split(" ");
  vk.api.call("utils.resolveScreenName", {
   screen_name: message.args[4]
  }).then((res) => { 
     let user = users.find(x=> x.id === Number(res.object_id)); 
    return message.send(`
Игрок: ${user.prefix}
    ID: ${user.uid}
    `)
})
  return;
 }
});

cmd.hear(/^(?:замок улучшить)/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
    let user = za.find(x=> x.id === Number(message.user.id));
	let m = Number(user.lvl * 10000000000000);
	if(message.user.balance < m) return bot(`Недостаточно денег!`);
	
	user.lvl += 1;
	message.user.balance -= Number(m);
	
	return bot(`Вы улучшили свой замок до ${user.lvl} уровня!`);
});

cmd.hear(/^(?:замок)/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	let user = za.find(x=> x.id === Number(message.user.id));
	if(!user) return message.send(`У вас нет замка`);
	let text = ``;
	let text3 = ``;
	let text2 = ``;
	if(user.r < 0) user.r = 0;
	if(user.l < 0) user.l = 0;
	if(user.m < 0) user.m = 0;
	let pr = Number(user.r + user.l + user.m);
	let p = Math.floor(Number(pr / 100));
	if(user.rating == 0) text = `Вы не состоите в лиге`;
	if(user.rating > 0) text = `Бронзовая III`;
	if(user.rating > 100) text = `Бронзовая II`;
	if(user.rating > 200) text = `Бронзовая I`;
	if(user.rating > 300) text = `Серебрянная III`;
	if(user.rating > 500) text = `Серебрянная II`;
	if(user.rating > 750) text = `Серебрянная I`;
	if(user.rating > 1000) text = `Золотая III`;
	if(user.rating > 1500) text = `Золотая II`;
	if(user.rating > 2500) text = `Золотая I`;
	if(user.rating > 4500) text = `Изумрудная III`;
	if(user.rating > 5000) text = `Изумрудная II`;
	if(user.rating > 7500) text = `Изумрудная I`;
	if(user.rating > 10000) text = `Рубиновая III`;
	if(user.rating > 15000) text = `Рубиновая II`;
	if(user.rating > 17500) text = `Рубиновая I`;
	if(user.rating > 20000) text = `🔥 ЛЕГЕНДАРНАЯ ЛИГА`;
	if(user.hero_1_v > 0) {
	if(user.hero_1 == true) text2 += `Король рыцарей:
	Восстанавливается ${unixStampLeft(user.hero_1_v)}.\n`;
	}
	if(user.hero_1_v <= 0) {
	if(user.hero_1 == true) text2 += `Король рыцарей:
	Жизни полностью восстановлены.\n`;
	}
	if(user.hero_2_v > 0) {
	if(user.hero_2 == true) text2 += `Королева лучниц:
	Восстанавливается ${unixStampLeft(user.hero_2_v)}.\n`;
	}
	if(user.hero_2_v <= 0) {
	if(user.hero_2 == true) text2 += `Королева лучниц:
	Жизни полностью восстановлены.\n`;
	}
	if(user.hero_3_v > 0) {
	if(user.hero_3 == true) text2 += `Маг гигант:
	Восстанавливается ${unixStampLeft(user.hero_3_v)}.\n`;
	}
	if(user.hero_3_v <= 0) {
	if(user.hero_3 == true) text2 += `Маг гигант:
	Жизни полностью восстановлены.\n`;
	}
	if(user.hero_4_v > 0) {
	if(user.hero_4 == true) text2 += `Повелитель воинов:
	Восстанавливается ${unixStampLeft(user.hero_4_v)}.\n`;
	}
	if(user.hero_4_v <= 0) {
	if(user.hero_4 == true) text2 += `Повелитель воинов:
	Жизни полностью восстановлены.\n`;
	}
	if(user.hero_5_v > 0) {
	if(user.hero_5 == true) text2 += `Хранитель времени:
	Восстанавливается ${unixStampLeft(user.hero_5_v)}.\n`;
	}
	if(user.hero_5_v <= 0) {
	if(user.hero_5 == true) text2 += `Хранитель времени:
	Жизни полностью восстановлены.\n`;
	}
	if(user.hero_6_v > 0) {
	if(user.hero_6 == true) text2 += `Мимик:
	Восстанавливается ${unixStampLeft(user.hero_6_v)}.\n`;
	}
	if(user.hero_6_v <= 0) {
	if(user.hero_6 == true) text2 += `Мимик:
	Жизни полностью восстановлены.\n`;
	}
	if(user.ataka > 0) {
	text3 += `До следующей атаки ${unixStampLeft(user.ataka)}.`;
	}
	if(user.ataka <= 0) {
	text3 += `Можно идти в атаки.`;
	}
	if(user.activate > 0) {
	if(user.mega_hero_1 == true) text2 += `Мегагерой Вор:
	В атаке ещё ${unixStampLeft(user.activate)}.\n`;
	}
	if(user.activate <= 0) {
	if(user.mega_hero_1 == true) text2 += `Мегагерой Вор:
	Готов снова идти в атаку.\n`;
	}
	
	return bot(`Информация о вашем замке:
	Уровень замка: ${user.lvl}
	Рейтинг замка ${user.rating}
	Баланс: ${user.balance}
	${text3}
	
	Ваш замок охраняют:
	${user.r} рыцарей, ${user.l} лучников ${user.m} магов.
	Процент защиты: ${p}%
	
	Ваша лига:
    ${text}
	До окончания сезона лиги ${unixStampLeft(bb.time)}
	
	Информация о героях:
	${text2}
	`);
});

cmd.hear(/^(?:купить замок)/i, async (message, bot) => {
	for(key in za) {
	if(za[key].id == message.user.id) return bot(`у вас уже есть замок!`);
	}
	if(message.user.balance < 10000000000000) return bot(`Недостаточно денег`);
	
	message.user.balance -= Number(10000000000000);
	za.push({
			lvl: 1,
			rating: 0,
			id: message.user.id,
			balance: 0,
			r: 0,
			l: 0,
			num: za.length,
			m: 0,
			lvl_r: 1,
			lvl_l: 1,
			lvl_m: 1,
			at: false,
			tren_1: false,
			tren_2: false,
			hero_1_v: 0,
			hero_2_v: 0,
			hero_3_v: 0,
			hero_4_v: 0,
			hero_5_v: 0,
			mega_hero_1: false,
			hero_6_v: 0,
			zi1: 0,
			zi2: 0,
			zi3: 0,
			activate: 0,
			hero_1: false,
			hero_2: false,
			hero_3: false,
			hero_4: false,
			hero_5: false,
			hero_6: false,
			tren_3: false,
			time: 0
		});
		
		return bot(`Замок успешно создан! 
		Информация "Замок".`);
});

	//замки//

cmd.hear(/^(?:читай)/i, async (message, bot) => {
const qr = require('@vkontakte/vk-qr/dist/umd/qrCodeGenerator'); 
var svg2img = require('svg2img'); 
const QRReader = require('qrcode-reader'); 
const jimp = require('jimp');

if(message.hasAttachments('wall')) { 
	let user = users.find(x=> x.uid === Number(message.user.uid));
	let url = message.attachments[0].attachments[0].largePhoto; 
	console.log(url) 
	if(!url) return bot(`пришли мне запись с QR-Кодом`); 
	const img = await jimp.read(url); 
	
	const qr = new QRReader(); 
	
	// qrcode-reader's API doesn't support promises, so wrap it 
	const value = await new Promise((resolve, reject) => { 
	qr.callback = (err, v) => err != null ? reject(err) : resolve(v); 
	qr.decode(img.bitmap); 
	});
let promos = value.result;
if(!promo[value.result]) return bot(`Активации у данного промокода закончились!`, {attachment: promos});

if(!promo[value.result].users[message.senderId]){

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
           eval(delete promo[promos]);
        }
        return bot(`вы успешно активировали QR-промокод, зачислено: ${utils.sp(coi)}$\n📢 Осталось ${activ} использований.`, {attachment: promos});
    }
}else{
	return bot(`Вы уже активировали данный промокод!`, {attachment: promos});	
	}
}	
	
	if(message.hasAttachments('photo')) { 
	let user = users.find(x=> x.uid === Number(message.user.uid));
	let url = message.attachments[0].largePhoto; 
	if(!url) return bot(`пришли мне QR-Код`); 
	const img = await jimp.read(url); 
	
	const qr = new QRReader(); 
	
	// qrcode-reader's API doesn't support promises, so wrap it 
	const value = await new Promise((resolve, reject) => { 
	qr.callback = (err, v) => err != null ? reject(err) : resolve(v); 
	qr.decode(img.bitmap); 
	
	
	
	});
	
let promos = value.result;
if(!promo[value.result]) return bot(`Активации у данного промокода закончились!`, {attachment: promos});

if(!promo[value.result].users[message.senderId]){

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
           eval(delete promo[promos]);
        }
        return bot(`вы успешно активировали QR-промокод, зачислено: ${utils.sp(coi)}$\n📢 Осталось ${activ} использований.`, {attachment: promos});
    }
}else{
	return bot(`Вы уже активировали данный промокод!`, {attachment: promos});	
	}
	}
});

cmd.hear(/^(?:обмен подарков 10)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
    if(message.user.pod_c < 1) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	let prize = utils.pick([1, 2, 2, 2, 3, 4]);
	let money = utils.random(1, 1000000000);
	let btc = utils.random(1, 1000000);
	let rating = utils.random(1, 1000);
	
	message.user.pod_c -= 1;
	
	if(prize == 1) 
	{
	message.user.balance += money;
	return bot(`В подарке вы нашли ${utils.sp(money)}$`);
	}
	
	if(prize == 2) 
	{
	return bot(`злобный Дед Мороз забрал у Вас подарок`);
	}
	
	if(prize == 3) 
	{
	message.user.btc += btc;
	return bot(`В подарке вы нашли ${utils.sp(btc)} биткоинов`);
	}
	
	if(prize == 4) 
	{
	message.user.rating += rating;
	return bot(`В подарке вы нашли ${utils.sp(rating)} рейтинга`);
	}
});

cmd.hear(/^(?:обмен подарков 10 всё)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
    if(message.user.pod_c < 1) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	let prize = utils.pick([1, 2, 2, 2, 3, 4]);
	let money = utils.random(1, 1000000000);
	let btc = utils.random(1, 1000000);
	let rating = utils.random(1, 1000);
	let money2 = money * message.user.pod_c;
	let btc2 = btc * message.user.pod_c;
	let rating2 = rating * message.user.pod_c;
	
	message.user.pod_c = 0;
	
	if(prize == 1) 
	{
	message.user.balance += money2;
	return bot(`В подарке вы нашли ${utils.sp(money2)}$`);
	}
	
	if(prize == 2) 
	{
	return bot(`злобный Дед Мороз забрал у Вас подарок`);
	}
	
	if(prize == 3) 
	{
	message.user.btc += btc2;
	return bot(`В подарке вы нашли ${utils.sp(btc2)} биткоинов`);
	}
	
	if(prize == 4) 
	{
	message.user.rating += rating2;
	return bot(`В подарке вы нашли ${utils.sp(rating2)} рейтинга`);
	}
});
	
cmd.hear(/^(?:обмен подарков 1)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 30) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 30;
	message.user.balance += 5000000000;
	
	return bot(`Вы обменяли 30 подарков на 5.000.000.000$`);
});

cmd.hear(/^(?:обмен подарков 2)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 70) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 70;
	message.user.balance += 20000000000;
	
	return bot(`Вы обменяли 70 подарков на 20.000.000.000$`);
});

cmd.hear(/^(?:обмен подарков 3)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 150) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 150;
	message.user.balance += 1000000000000;
	
	return bot(`Вы обменяли 150 подарков на 1.000.000.000.000$`);
});

cmd.hear(/^(?:обмен подарков 4)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 250) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 250;
	message.user.vip = 1;
	
	return bot(`Вы обменяли 250 подарков на VIP статус
	Команды VIP: "вип помощь"`);
});

cmd.hear(/^(?:обмен подарков 5)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 500) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 500;
	message.user.business = [
		{
　 　 　 "id": 14,
　 　 　 "upgrade": 5,
　 　 　 "workers": 1,
　 　 　 "moneys": 10
　 　 }
];
	
	return bot(`Вы обменяли 500 подарков на секретный бизнес`);
});

cmd.hear(/^(?:обмен подарков 6)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 750) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 500;
	message.user.mb = true;
	
	return bot(`Вы обменяли 750 подарков на Допбизнес <<Межгалактическая станция>>`);
});

cmd.hear(/^(?:обмен подарков 7)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 1000) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 1000;
	message.user.mb_2 = true;
	
	return bot(`Вы обменяли 1000 подарков на Допбизнес <<Шоколадная фабрика>>`);
});

cmd.hear(/^(?:обмен подарков 8)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 5000) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 5000;
	message.user.realty.admin = 1;
	
	return bot(`Вы обменяли 5000 подарков на привилегию Стажёр`);
});

cmd.hear(/^(?:обмен подарков 9)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(message.user.pod_c < 10000) return bot(`Недостаточно подарков, прописывайте в беседах "забрать подарок" и получайте подарок 1 раз в 15 минут`);
	
	message.user.pod_c -= 10000;
	message.user.realty.admin = 6;
	
	return bot(`Вы обменяли 10000 подарков на привилегию Админ. Поздравляю!`);
});

cmd.hear(/^(?:обмен подарков)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	
	return bot(`Обмен подарков на призы:
	1) 30 подарков - 5.000.000.000$
	2) 70 подарков - 20.000.000.000$
	3) 150 подарков - 1.000.000.000.000$
	4) 250 подарков - VIP статус
	5) 500 подарков - Секретный бизнес
	6) 750 подарков - Допбизнес <<Межгалактическая станция>>
	7) 1000 подарков - Допбизнес <<Шоколадная фабрика>>
	8) 5000 подарков - Стажёр
	9) 10000 подарков - Админка в боте
	10) 1 подарок - рандом приз (валюта, биткоины, рейтинг и т.д.)
	Можно рискнуть написать "обмен подарков 10 всё" и обменять сразу все подарки на приз!
	Для обмена напишите "Обмен подарков [номер приза]"`);
});

cmd.hear(/^(?:подарки помощь)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	
	return bot(`забрать подарок - забрать подарок в беседе
	подарки - посмотреть счёт подарков
	обмен подарков - посмотреть список призов
	обмен подарков [номер приза] - обменять подарок на призы`);
});

cmd.hear(/^(?:подарки)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	
	return bot(`у вас в наличии ${message.user.pod_c} подарков`);
});

cmd.hear(/^(?:забрать подарок)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return message.send(`Акция завершена!`);
	if(!message.isChat) return bot(`команда работает только в БЕСЕДАХ.`); 
    let chat = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	let iddd = 2000000000;
	let id = chat.chat_idd;
	let idddd = iddd += id
	let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: idddd
		
 })
	let mem = profiles.length;
	if(message.chatId !== 283) {
		if(mem < 20) return bot(`В беседе должно быть не менее 20 участников (группы не учитываются ботом)!`);
	}
		if(chat.chat_vip == false) {
		if(chat.podarok > 0) return bot(`В этой беседе уже получали подарок, следующий подарок можно будет получить в течении 15 минут`);
		}
		if(chat.chat_vip == true) {
		if(chat.podarok > 0) return bot(`В этой беседе уже получали подарок, следующий подарок можно будет получить в течении 5 минут`);
		}
		if(chat.chat_vip == false) {
			setTimeout(() => {
		chat.podarok = false;
		return message.send(`В этой беседе снова можно получать подарок!`);
	}, 900000);
		}
		if(chat.chat_vip == true) {
			setTimeout(() => {
		chat.podarok = false;
		return message.send(`VIP статус в этой беседе активирован, поэтомуВ этой беседе снова можно получать подарок!`);
	}, 300000);
		}
	
	chat.podarok = true;
	message.user.pod_c += 1;
	
	await bot(`Вы забрали подарок в этой беседе, у вас в наличии ${message.user.pod_c} подарков`);
	await vk.api.messages.send({ chat_id: 262, message: `В беседе ID: ${chat.chat_idd}, ID чата в боте: ${chat.chat_number} забрал подарок игрок: [id${message.user.id}|${message.user.prefix}]` });

});

cmd.hear(/^(?:пользователи обновить)$/i, (message, bot) => { 
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	let user = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
	}).then(function(res){
		let text = '';
		let text2 = '';
		for(i in res.profiles){
		if(res.profiles[i]){
			text += `${res.profiles[i].first_name} ${res.profiles[i].last_name}\n`
			text2 += `${res.profiles[i].first_name} ${res.profiles[i].last_name}, `
			}
		} 
		user.users = text;
		return message.send(`Пользователи обновлены:
		${text}`);
		
    }).catch((error) => {return message.send(`⚠ Ошибка `);}); 
});

cmd.hear(/^(?:бинфо)\s?([0-9]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 6) return;
	let user = chats.find(x=> x.chat_number === Number(message.args[1])); 
	let sms = user.sms;
	let comm = user.commands;
	let num = user.chat_number;
	let id = user.chat_idd;
	let vip = user.chat_vip;
	let kick = user.kick;
	let l1 = user.chat_invite_user_by_link;
	let l2 = user.chat_invite_user;
	let iddd = 2000000000;
	let idddd = iddd += id;
	let text = ``;
	let text2 = ``;
	let text3 = ``;
	let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: 2000000000 + id,
});
    if(!profiles) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(!user) return bot(`я не нашёл информацию об этом чате, возможно его не существует или он не зарегистирован.`);
	
    vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + id, 
	}).then(function(res){
		let user = chats.find(x=> x.chat_number === Number(message.args[1])); 
	if(!user) return bot(`я не нашёл информацию об этом чате, возможно его не существует или он не зарегистирован.`);
		let text = '';
		let text2 = '';
		let chat = message.chatId;
	let sms = user.sms;
	let comm = user.commands;
	let num = user.chat_number;
	let id = user.chat_idd;
	let vip = user.chat_vip;
	let kick = user.kick;
	let l1 = user.chat_invite_user_by_link;
	let l2 = user.chat_invite_user;
	let iddd = 2000000000;
	let idddd = iddd += id; 
	for(i in res.profiles){
		if(res.profiles[i]){
			text += `${res.profiles[i].first_name} ${res.profiles[i].last_name}\n`
			text2 += `${res.profiles[i].first_name} ${res.profiles[i].last_name}, `
			}
		} 
		user.users = text;
		message.send(`Информация о чате:
	VIP статус ${vip.toString().replace(/false/gi, "Не активирован").replace(/true/gi, "Активирован.")} 
	ID чата бота: ${id}
	Номер чата по регистрации: ${num}
	Команд: ${comm}
	Сообщений: ${sms}
	Участники беседы:\n` + `${text2} (${profiles.length})`);
		
    }).catch((error) => {return message.send(`ошибка`);});		
});

cmd.hear(/^(?:бинфо)$/i, async (message, bot) => {
	let user = chats.find(x=> x.chat_idd === Number(message.chatId)); 
	let sms = user.sms;
	let comm = user.commands;
	let num = user.chat_number;
	let id = user.chat_idd;
	let vip = user.chat_vip;
	let kick = user.kick;
	let l1 = user.chat_invite_user_by_link;
	let l2 = user.chat_invite_user;
	let iddd = 2000000000;
	let idddd = iddd += id;
	let text = ``;
	let text2 = ``;
	let text3 = ``;
	let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: 2000000000 + id,
});
    if(profiles == "undefined") return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(!profiles) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(!profiles.length) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(profiles == undefined) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(profiles == null) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(profiles == "null") return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(profiles == "NaN") return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(profiles == NaN) return message.send(`Ошибка, для начала дайте мне админа в этой беседе`);
	if(!user) return bot(`я не нашёл информацию об этом чате, возможно его не существует или он не зарегистирован.`);
	
    vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + id, 
	}).then(function(res){
		let user = chats.find(x=> x.chat_number === Number(message.chatId)); 
	if(!user) return bot(`я не нашёл информацию об этом чате, возможно его не существует или он не зарегистирован.`);
		let text = '';
		let text2 = '';
		let chat = message.chatId;
	let sms = user.sms;
	let comm = user.commands;
	let num = user.chat_number;
	let id = user.chat_idd;
	let vip = user.chat_vip;
	let kick = user.kick;
	let l1 = user.chat_invite_user_by_link;
	let l2 = user.chat_invite_user;
	let iddd = 2000000000;
	let idddd = iddd += id; 
	for(i in res.profiles){
		if(res.profiles[i]){
			text += `${res.profiles[i].first_name} ${res.profiles[i].last_name}\n`
			text2 += `${res.profiles[i].first_name} ${res.profiles[i].last_name}, `
			}
		} 
		user.users = text;
		message.send(`Информация о чате:
	VIP статус ${vip.toString().replace(/false/gi, "Не активирован").replace(/true/gi, "Активирован.")} 
	ID чата бота: ${id}
	Номер чата по регистрации: ${num}
	Команд: ${comm}
	Сообщений: ${sms}
	Участники беседы:\n` + `${text2} (${profiles.length})`);
		
    }).catch((error) => {return message.send(`⚠ Ошибка `);});		
});

cmd.hear(/^(?:система)$/i, async (message, bot) => {
	if(message.user.uid !== 2) return bot(`неа`);;	
	let os = require('os');
	let uptime = require('os-uptime');
	let cpu = os.cpus();
	 tcpp.ping({ address: 'vk.com' }, function(err, data) {
        bot(`

			🚀 Состояние VDS сервера: Активно
			🖥 Система: ${os.type()} ${os.arch()} / Ubuntu 19.04
			🐧 Версия системы: ${os.release()}
			💻 Процессор: ${cpu[0].model}
			💾 Обьем памяти: ${Math.floor(os.freemem() /1024/1024)} МБ используется из 30.000 МБ
			⏱ Uptime: ${unixStampLeft(os.uptime()* 1000)}
			🔋 Мониторинг нагрузки сервера: ${os.loadavg()}

			🛰 Подключение: 
			- Сигнал: Подключение сервера до https://vk.com составляет - ${Math.round(data.avg)} ms.

			Время с момента включения/перезапуска бота: ${unixStampLeft(process.uptime() * 1000)}

			`)
    }, 600).catch((error) => { message.send(` Ошибка.`);});

});

cmd.hear(/^(?:промо создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
    if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');
	
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
        await bot(`Ошибка. Попробуйте снова!`);
    }
     

    await bot(`
        Промокод ${result}, сумма ${utils.sp(balance)}$ создан!
        Осталось активаций! ${activ}`);
	user.api.wall.post({
		owner_id: -181025518,
		message: `Эй у нас новый промокод.\n Промокод ${result}, сумма ${utils.sp(balance)}$ создан!
        Осталось активаций! ${activ}`
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: `Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\nТакже, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.`
	});
	});
});

cmd.hear(/^(?:пост создать)\s(.*)$/i, async (message, bot) => {
    if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

    await bot(`пост готов`);
	user.api.wall.post({
		owner_id: -181025518,
		message: `${message.args[1]}`
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: `Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\nТакже, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.`
	});
	});
});

cmd.hear(/^(?:золотой час)$/i, async (message, bot) => {
    if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
		if(zz == true) return bot(`Зачем включать золотой час когда он уже включен`);		
	setTimeout(() => {
		zz = false;
		return bot(`золотой час отключен`);
	}, 3600000);
zz = true;

    await bot(`золотой час включен`);
	user.api.wall.post({
		owner_id: -181025518,
		message: `Активирован золотой час, шансы в казино увеличены ровно на 1 час`
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: `Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\nТакже, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.`
	});
	});
});

cmd.hear(/^(?:x2 час)$/i, async (message, bot) => {
    if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
		if(xx2 == true) return bot(`Зачем включать x2 режим когда он уже включен`);		
	setTimeout(() => {
		xx2 = false;
		return bot(`x2 час отключен`);
	}, 300000);
xx2 = true;

    await bot(`x2 час включен`);
	user.api.wall.post({
		owner_id: -181025518,
		message: `Активирован x2 режим, выигрыш в казино увеличен ровно на 5 минут`
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: `Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\nТакже, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.`
	});
	});
});

cmd.hear(/^(?:Тематика)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	message.user.tematika = message.args[1];
	return bot(`у вас теперь тематика "${message.user.tematika}"`);
});

cmd.hear(/^(?:Тематика)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	return bot(`Привет! Решил выбрать тематику для канала?

🎯 Тематика игры - Снимаете по играм

👀 Тематика обзоры - Снимаете обзоры

🚥 Тематика влоги - Снимаете влоги и т.д

🔥 Или любая ваша тематика)`);
});

cmd.hear(/^(?:Реклама)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(!message.args[1]) return bot(`Хай, хочешь купить рекламу для своего канала😏?

✅Мы - самая надежная и законная компания по продаже рекламы, с нами ты достигнешь высот!

1.Тариф «Старт»:
　📈Прирост: 1.000 сабов
　💸Цена: 15.000$

2.Тариф «Нормал»:
　📈Прирост: 5.000 сабов
　💸Цена: 75.000$

3.Тариф «Про»:
　📈Прирост: 25.000 сабов
　💸Цена: 750.000$

4. Тариф «Мега»:
　💸Прирост: 70.000 сабов
　💸Цена: 1.000.000$

5. Тариф «Горох»:
　💸Прирост: 140.000 сабов
　💸Цена: 2.000.000$

6. Тариф «Сметанка»:
　💸Прирост: 220.000 сабов
　💸Цена: 3.500.000$

7. Тариф «читерсий пиар»:
　💸Прирост: 22.220.000 сабов
　💸Цена: 3.500.000.000$

🔥Для покупки введите реклама «id тарифа»`);

	const sell = reklama.find(x=> x.id === Number(message.args[1]));

	if(message.user.ybalance < sell.cost) return bot(`недостаточно денег`);
	if(!message.user.kanal) return bot(`У вас нет канала для пиара!`)
	else if(message.user.ybalance >= sell.cost)
	{
		message.user.ybalance -= sell.cost;
		message.user.sub += sell.sub;

		return bot(`вы купили рекламу за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:убаланс)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	return bot(`Ваш id:${message.user.uid}
	Баланс:${message.user.ybalance}`);
});

cmd.hear(/^(?:Снять)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.camera) return bot(`Для записи нужна камера!`);
	if(message.user.timers.rec) return bot(`Снимать можно раз в час`);
	if(!message.user.kanal) return bot(`У вас нет канала!`)
if(message.user.realty.itemse == 1) {		
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать!`);
	}, 3600000);
message.user.timers.trec = 3600000;
}

if(message.user.realty.itemse == 0) {
	
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать!`);
	}, 3600000);
	message.user.timers.trec = 3600000;
}

if(message.user.realty.itemse == 2) {		
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать из-за кулака судьбы!`);
	}, 1200000);
message.user.timers.trec = 1200000;
}

if(message.user.realty.itemse == 3) {		
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать!`);
	}, 3600000);
message.user.timers.trec = 3600000;
}
	message.user.timers.rec = true;

	if(message.user.part == false){
    var sub = message.user.sub * 2;
	var koment = message.user.sub * 2;
	var like = message.user.sub * 3;
    var sm = message.user.sub * 50;
	let dis = utils.random(1,8);
	const phrase = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);
    const phrase2 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);	
   const phrase3 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);
 const phrase4 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]); 
   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
✅Ты на верном пути, продолжай выпускать ролики!

💬 ПОСЛЕДНИЕ КОММЕНТАРИИ 
${phrase}
${phrase2}
${phrase3}
${phrase4}
`);	
}

	if(message.user.part == true){
    var sub = message.user.sub * 5;
	var koment = message.user.sub * 3;
	var like = message.user.sub * 4;
    var sm = message.user.sub * 100;
	let dis = utils.random(0,1);
	let and = utils.random(10000,100000);
const phrase = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);
const phrase2 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);
const phrase3 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);
const phrase4 = utils.pick([`Валера Евдокимов: видео хуйня давай по новой`, `Павел Дуров: бан тебе`, `Виталий Кусь: топчик`, `Сергей Власов: ахуенно братан`, `Дима Минин: всё норм`, `Marmok: у тебя большое будущее`, `Ярослав Синкин: дай автограф`, `ПЕТЬКА С ЧЕРМЕТА: Братан дай деняг`, `Стас Тиханский: фу мой канал лучше`, `Коля Чернышов: ну норм`, `Владимир Путин: в США падонка`, `ТРАМП: you bad yotuber`, `SPIDER-MAN: качество хуйня в моём мультики 1994 и то лучше качество было`, `HULK: где разрушение без них скучно`, `Юлия Михалкова: да тебе к нам в шоу уральские пельмени надо`, `SUPER-MAN: я чуть не спалил свой телефон от такой хуйни`, `Никита Иванов: да ты снимаешь по чти так же как снимают люди в тренде`, `Коля Чернышков: ТОП`, `ЦВЕТОЧНЫЙ ЛОХ: ЦВЕТЫ И ТО ЛУЧШЕ`, `Иван Смолинин: хуйня`, `Георгий Солдатов: еееееее я в коментах видео топ`]);

   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.ybalance += and;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
🎬 С партнёрки: ${and}$
✅Ты на верном пути, продолжай выпускать ролики!

💬 ПОСЛЕДНИЕ КОММЕНТАРИИ 
${phrase}
${phrase2}
${phrase3}
${phrase4}`);
}
});

cmd.hear(/^(?:аСнять)\s(.*)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1) return;	
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.camera) return bot(`Для записи нужна камера!`);
	if(message.user.timers.rec) return bot(`аСнимать можно раз в 6 минут`);
	if(!message.user.kanal) return bot(`У вас нет канала!`)
		
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать!`);
	}, 360000);

	message.user.timers.rec = true;
message.user.timers.trec = 360000;
	
	if(message.user.part == false){
    var sub = message.user.sub * 15;
	var koment = message.user.sub * 4;
	var like = message.user.sub * 5;
    var sm = message.user.sub * 100;
	let dis = utils.random(1,2);
	
   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
✅Ты на верном пути, продолжай выпускать ролики!`);	
}
	if(message.user.part == true){
    var sub = message.user.sub * 26;
	var koment = message.user.sub * 7;
	var like = message.user.sub * 8;
    var sm = message.user.sub * 150;
	let dis = utils.random(0,1);
	let and = utils.random(100000,1000000);

   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.ybalance += and;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
🎬 С партнёрки: ${and}$
✅Ты на верном пути, продолжай выпускать ролики!`);
}

});

cmd.hear(/^(?:Вступить в партнёрку)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.sub < 10000) return bot(`У вас нет 10.000 подписчиков!`);
	
	message.user.part = true;
	return bot(`Вы успешно вступили в партнёрку!`)
});

cmd.hear(/^(?:strike)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		if(message.args[1] == 0)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		if(message.args[1] == 3)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		
		if(user.strike < 10){
		user.strike += 1;
        return bot(`Успешно! Вы дали пользователю (${user.tag}) -> страйк`);
		}

        if(user.strike >= 10){
		user.strike += 1;
		user.ban = true;
	return bot(`Успешно! Вы дали пользователю (${user.tag}) -> страйк и его канал заблокирован!`);
		}
}
	});
	
cmd.hear(/^(?:unstrike)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		if(user.strike < 10){
		user.strike -= user.strike;
        return bot(`Успешно! Вы сняли пользователю (${user.tag}) -> страйки`);
		}

        if(user.strike >= 10){
		user.strike -= user.strike;
		user.blocked = false;
	return bot(`Успешно! Вы сняли пользователю (${user.tag}) -> страйки и его канал разблокирован!`);
		}
}
	});
	
cmd.hear(/^(?:кобнулить)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.admin < 6) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(message.args[1] == 0)return bot(`Ай! Ай! Ай! Очищать создателей нельзя!`)
		if(message.args[1] == 3)return bot(`Ай! Ай! Ай! Очищать создателей нельзя!`)

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.ybalance = 0;
		user.kanal = false;
		user.nuk_kanal = false;
		user.info_locked = false;
		user.sub = 1;
		user.like = 0;
		user.dislike = 0;
		user.videos = 0;
		user.strike = 0;
		user.sm = 0;
		user.camera = false;
		user.microfon = false;
		user.heteri = 0;
		user.video = false;
		user.comment = 0;
		user.tematika = false;
		user.but = 0;
		user.blocked = false;
		return bot(`Вы успешно удалили канал игроку -> (${user.tag})`);
}
	});
	
cmd.hear(/^(?:Партнёрка)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	return bot(`Возможности:
1. Зарабатывать с рекламы на видео
2. Удвоенные подписчики с видео
3. Удвоенные просмотры с видео
4. Удвоенные лайки с видео
5. Уменьшее количество дизлайков и хейтеров!

**** Возможности будут постепенно увеличиваться ****`);
});

cmd.hear(/^(?:Получить ск)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.sub < 100000)return bot(`Ай! Ай! Ай! Кнопка только с 100.000 подписчиков!`)
		
	message.user.but = 1;
	return bot(`Успешно! Вы получили серебрянную кнопку!`)
});

cmd.hear(/^(?:Получить зк)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.sub < 1000000)return bot(`Ай! Ай! Ай! Кнопка только с 1.000.000 подписчиков!`)
		
	message.user.but = 2;
	return bot(`Успешно! Вы получили золотую кнопку!`)
});

cmd.hear(/^(?:Получить бк)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.sub < 10000000)return bot(`Ай! Ай! Ай! Кнопка только с 10.000.000 подписчиков!`)
		
	message.user.but = 3;
	return bot(`Успешно! Вы получили бриллиантоваю кнопку!`)
});

cmd.hear(/^(?:бутылочка)$/i, async (message, bot) => { 
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  		
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles); 
message.send(`[🍷]: (Бутылочка) :[🍷]

[id${profile.id}|${profile.first_name}] и [id${profile2.id}|${profile2.first_name}] — ваше действие: ` + utils.pick(['Заняться сексом!', 'Поцеловаться', 'Сесть на бутылочку', 'Начать встречаться', '*Вы пропускаете ход*', 'Раздеться', 'Бухнуть', 'Пожениться', 'Родить сына', 'поесть вместе в ресторане', 'Родить дочь'])); 
});

cmd.hear(/^(?:список)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  		
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles);
let profile3 = utils.pick(profiles);
let profile4 = utils.pick(profiles);
let profile5 = utils.pick(profiles);
let profile6 = utils.pick(profiles);
    
message.send(`(СПИСОК ${message.args[1]})

[id${profile.id}|${profile.first_name}]
[id${profile2.id}|${profile2.first_name}]
[id${profile3.id}|${profile3.first_name}]
[id${profile4.id}|${profile4.first_name}]
[id${profile5.id}|${profile5.first_name}]
[id${profile6.id}|${profile6.first_name}] `); 
});



cmd.hear(/^(?:кик рандом)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
	{
		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: profile.id }).
		catch((error) => {return message.send(`⚠ Ошибка человека нет в беседе или в боте или он админ беседы`);});
	vk.api.messages.send({ user_id: profile.id, message: `вас кикнул рандом из одной из бесед`
})
		
		 vk.api.messages.send({ peer_id: message.peerId, sticker_id: utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])
})
	}
});

cmd.hear(/^(?:пара)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  		
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles);
    
message.send(`(ПАРА ${message.args[1]})

[id${profile.id}|${profile.first_name}]
[id${profile2.id}|${profile2.first_name}] `); 
});

cmd.hear(/^(?:любовь)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  		
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles);
    
message.send(`(ЛЮБОВЬ)

[id${profile.id}|${profile.first_name}] и [id${profile2.id}|${profile2.first_name}] я уверен что у них любовь `); 
});

cmd.hear(/^(?:гл админ помощь)$/i, async (message, bot) => {
    if(message.user.realty.admin < 100) return;
	
	message.send(`команды гл админа:
	машина название [название/откл] - поставить своё название машины/отключить название
	самолет название [название/откл] - поставить своё название самолета/отключить название
	телефон название [название/откл] - поставить своё название телефона/отключить название
	ферма название [название/откл] - поставить своё название фермы/отключить название
	дом название [название/откл] - поставить своё название дома/отключить название
	питомец название [название/откл] - поставить своё название питомца/отключить название
	все команды админа, стажёра`);
});

cmd.hear(/^(?:админ помощь)$/i, async (message, bot) => {
    if(message.user.realty.admin < 5) return;;
    vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13168
})
	if(message.isChat) return bot(`команда работает только в ЛС.`);
    await bot(`команды админа:
➖get айди - покажет профиль игрока
➖найти ссылка на человека -найдёт его айди в боте
💳give айди количество - выдать деньги игроку
💳деньги кол-во -выдать себе деньги
🌐bgive айди количество - выдать биткоины игроку
👔wgive айди 1-13 - выдать работу игроку от 1 до 13
👑rgive айди количество - изменит игроку рейтинг
➖бан айди причина - забанит игрока
➖бан топа id причина
➖бан репорта id причина
➖разбан айди - разбанит игрока
➖permban айди - забанит навсегда игрока
➖выдать статус айди текст - выдать статус игроку так же можно и себе просто введи айди
➖выдать ник айди текст - впринципе почти как статус
➖аказино количество -админ казино без поражений
➖fgive айди количество -выдать фермы игроку
➖пустота - бот напишет пустоту
➖асекс айди - секс с игроком
➖авыебать айди - выебать игрока
➖аотпиздить айди - отпиздить игрока
➖аотсосать айди - отсосать у игрока
➖акуни айди - сделать куни игроку
➖кик айди в в боте -кикнет человека
➖кикнуть ссылка -кикнет человека
➖аник айди в боте вкл или выкл - вкл
➖аник айди в боте вкл или выкл - включит гипперссылку игрока или выключит
➖аобнять айди в боте - обнять игрока
➖названия текст - изменит названия беседы
➖открепить - тут всё понятно)
➖обнулить id причина - думаю тоже понятно
➖warn id причина -выдаст варн игроку
➖timeban ID TIME(1-999) ПРИЧИНА
➖фейк профиль - включит фейк профиль
➖фейк профиль off - выключит фейк профиль
➖состав - покажет всех админов
➖кейс
➖аснять текст - снимает видео но со своими бонусами)
➖стажёр получить деньги
➖сообщение за бота текст
➖стикер за бота номер стикера
все команды стажёра`);
}); 

cmd.hear(/^(?:фейк профиль)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1) return;

    message.user.tag = `Пользователь`;
    message.user.realty.feik = true;
	
	return bot(`Вы включили фейк профиль`);
	
});

cmd.hear(/^(?:фейк профиль off)$/i, async (message, bot) => {
	if(message.user.realty.admin == 1) {

    message.user.tag = `стажёр`;
	
	}
	
	if(message.user.realty.admin == 6) {

	 message.user.tag = `администратор`;
}

	if(message.user.realty.admin == 100) {

	 message.user.tag = `главный администратор`;
}

	if(message.user.realty.admin == 500) {

	 message.user.tag = `Заместитель`;
}

	if(message.user.realty.admin == 1000) {

	 message.user.tag = `создатель`;
}

return bot(`Вы отключили фейк профиль`);
});

cmd.hear(/^(?:стажёр помощь)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1) return;
	return message.reply(`команды стажёра:
➖get айди - покажет профиль игрока
➖найти ссылка на человека -найдёт его айди в боте
➖бан айди причина - забанит игрока
➖разбан айди - разбанит игрока
➖фейк профиль - включит фейк профиль
➖фейк профиль off - выключит фейк профиль
➖состав - покажет всех админов
➖warn id причина -выдаст варн игроку
➖timeban ID TIME(1-999) ПРИЧИНА
➖бан топа id причина
➖бан репорта id причина
➖кейс
➖аснять текст - снимает видео но со своими бонусами)
➖стажёр получить деньги
➖сообщение за бота текст
➖стикер за бота номер стикера`);
});

cmd.hear(/^(?:создатель помощь)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	return message.reply(`команды создателя:
➖админ выдать фулл|стажёра|вип|зама|гл админа ссылка на человека - выдаст донат
➖спам беседы айди беседы - спамь в беседу
➖спам беседы стикером айди беседы и айди стикера  - спамь в беседу стикером
➖краш беседы айди беседы - крашни беседу
➖кик рандом - кикнет рандом пользователя в беседе
➖Промо создать кол-во сумма - создать промокод
➖выдать бизнес айди номер бизнеса - выдаст бизнес
➖пост создать текст - создаст пост
➖допбизнес выдать айди - выдаст доп-бизнес
➖обмен проверить [номер обмена] - выдаст доп-бизнес
`);
});

cmd.hear(/^(?:ДОНАТ)$/i, async (message, bot) => {

	return bot(`Стажёр 50 рублей:
➖get айди - покажет профиль игрока
➖найти ссылка на человека -найдёт его айди в боте
➖бан айди причина - забанит игрока
➖разбан айди - разбанит игрока
➖permban айди - забанит навсегда игрока
➖фейк профиль - включит фейк профиль
➖фейк профиль off - выключит фейк профиль
➖состав - покажет всех админов
➖warn id причина -выдаст варн игроку
➖timeban ID TIME(1-999) ПРИЧИНА
➖бан топа id причина
➖бан репорта id причина
➖кейс
➖аснять текст - снимает видео но со своими бонусами)
➖стажёр получить деньги
➖сообщение за бота текст
➖стикер за бота номер стикера

vip 20 рублей:
➖вип клик
➖вип работать
➖вип флексить
➖вип гонка
➖випкейс
➖вип деньги 
Пример: вип деньги [1-20000000000]

Админ 500 рублей:
➖get айди - покажет профиль игрока
➖найти ссылка на человека -найдёт его айди в боте
💳give айди количество - выдать деньги игроку
💳деньги кол-во -выдать себе деньги
🌐bgive айди количество - выдать биткоины игроку
👔wgive айди 1-13 - выдать работу игроку от 1 до 13
👑rgive айди количество - изменит игроку рейтинг
💳remove айди количество - забирает деньги у игрока
➖бан айди причина - забанит игрока
➖бан топа id причина
➖бан репорта id причина
➖разбан айди - разбанит игрока
➖permban айди - забанит навсегда игрока
➖выдать статус айди текст - выдать статус игроку так же можно и себе просто введи айди
➖выдать ник айди текст - впринципе почти как статус
➖аказино количество -админ казино без поражений
➖fgive айди количество -выдать фермы игроку
➖пустота - бот напишет пустоту
➖асекс айди - секс с игроком
➖авыебать айди - выебать игрока
➖аотпиздить айди - отпиздить игрока
➖аотсосать айди - отсосать у игрока
➖акуни айди - сделать куни игроку
➖кик айди в в боте -кикнет человека
➖кикнуть ссылка -кикнет человека
➖аник айди в боте вкл или выкл - вкл
➖аник айди в боте вкл или выкл - включит гипперссылку игрока или выключит
➖аобнять айди в боте - обнять игрока
➖названия текст - изменит названия беседы
➖открепить - тут всё понятно)
➖обнулить id причина - думаю тоже понятно
➖warn id причина -выдаст варн игроку
➖timeban ID TIME(1-999) ПРИЧИНА
➖фейк профиль - включит фейк профиль
➖фейк профиль off - выключит фейк профиль
➖состав - покажет всех админов
➖кейс
➖аснять текст - снимает видео но со своими бонусами)
➖стажёр получить деньги
➖сообщение за бота текст
➖стикер за бота номер стикера
все команды стажёра

команды гл админа:
	машина название [название/откл] - поставить своё название машины/отключить название
	самолет название [название/откл] - поставить своё название самолета/отключить название
	телефон название [название/откл] - поставить своё название телефона/отключить название
	ферма название [название/откл] - поставить своё название фермы/отключить название
	дом название [название/откл] - поставить своё название дома/отключить название
	питомец название [название/откл] - поставить своё название питомца/отключить название
	все команды админа, стажёра

донат кейс (55 рублей) - могут выпасть все донаты выше

EVAL 2500(выбить нельзя) -
donater users[айди игрока] покажет строчку бд игрока
как что менять подробнее к кодеру создателю валере так же вы можете выдавать донат`);
});

cmd.hear(/^(?:вип помощь)$/i, async (message, bot) => {
	if(message.user.vip < 1) return;
	return message.reply(`команды vip:
➖вип клик
➖вип работать
➖вип флексить
➖вип гонка
➖випкейс
➖вип деньги 
Пример: вип деньги [1-20000000000]`);
});

cmd.hear(/^(?:помощь)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = message.args[1].toLowerCase();

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

	if(message.args[1] === 'Трейд')
	{
		return message.send(`Команда "Трейд" - симулятор бинарных опционов. Введите "Трейд вверх (сумма)" если думаете, что курс валюты будет увеличиваться, или "Трейд вниз (сумма)" если будет уменьшаться.`);
	}

	if(message.args[1] === 'наперсток')
	{
		return message.send(`С помощью команды "Наперсток" вы можете сыграть в игру. Чтобы играть введите "Наперсток [1-3] [сумма]".`);
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
		return message.send(`С помощью команды "Ник" можно выбрать себе ник длинною до 25 символов.`);
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
		Обнять - обнять партнера
		Поцеловать - поцеловать партнера
		выебать - выебать партнера
		куни - сделать куни партнёра
		отсосать - отосать у партнера
		Развод - ...`);
	}

	if(message.args[1] === 'дата')
	{
		return message.send(`Команда "Дата" выводит дату регистрации человека в боте. Можно использовать id человека.`);
	}

	if(message.args[1] === 'репорт')
	{
		return message.send(`С помощью команды "Репорт" вы можете отправить создателю бота любое сообщение.`);
	}
});

cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`вот: "${text.split('').reverse().join('')}"`)
});

cmd.hear(/^(?:реши)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].toString().replace(/(&.*;|@|vk|user|token|api|message)/gi, "");
	const result = eval(`${message.args[1]}`);
	
	if(result == undefined && result == null && result == NaN) {
	result = 0;
	}
	
	return bot(`${message.args[1]}=${result}`).catch((error) => {return message.send(`Я не смог решить этот пример`);});
});

////// может сломать бота *связано с евалом ЛУЧШЕ НЕ ТРОГАЙ!!! 

cmd.hear(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"', 'я бы вас послал но правила вк говорят нельзя', 'Валера говорит нет', 'Виталий вас послал']);
	return bot(phrase);
});

cmd.hear(/^(?:репутация)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(!user) return;
	if(user.id === message.senderId) return;

    user.rep = `Есть`;
	
	return bot(`репутация изменена успешна.`);
}); 

cmd.hear(/^(?:антирепутация)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(!user) return;
	if(user.id === message.senderId) return;

    user.rep = `Нету`;
	
	return bot(`репутация изменена успешна.`);
}); 


cmd.hear(/^(?:админ выдать фулл)/i, async(message) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })		
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 6;
user.dgive = true;
user.tag = `Администратор`;

return message.send(`
Игрок ${user.prefix} получил админку
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 6;
user.dgive = true;
user.tag = `Администратор`;

return message.send(`
Игрок ${user.prefix} получил админку
`);					
			    }
			});

cmd.hear(/^(?:админ выдать модератора)/i, async(message) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })	
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 4;
user.dgive = true;
user.tag = `Модератор`;

return message.send(`
Игрок ${user.prefix} получил Модератора
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 4;
user.dgive = true;
user.tag = `модератор`;

return message.send(`
Игрок ${user.prefix} получил Модератора
`);					
			    }
			});

cmd.hear(/^(?:админ выдать стажёра)/i, async(message) => {
			if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 1;
user.dgive = true;
user.tag = `Стажёр`;

return message.send(`
Игрок ${user.prefix} получил Стажёра
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 1;
user.dgive = true;
user.tag = `Стажёр`;

return message.send(`
Игрок ${user.prefix} получил Стажёра
`);					
			    }
			});

cmd.hear(/^(?:админ выдать вип)/i, async(message) => {
			if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.vip = 1;
user.dgive = true;
user.tag = `VIP`;

return message.send(`
Игрок ${user.prefix} получил VIP
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.vip = 1;
user.dgive = true;
user.tag = `VIP`;

return message.send(`
Игрок ${user.prefix} получил VIP
`);					
			    }
			});
			
cmd.hear(/^(?:админ выдать гл админа)/i, async(message) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })	
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 100;
user.dgive = true;
user.tag = `Главный Администратор`;

return message.send(`
Игрок ${user.prefix} получил Главного Администратора
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 100;
user.dgive = true;
user.tag = `Главный Администратор`;

return message.send(`
Игрок ${user.prefix} получил Главного Администратора
`);				
			    }
			});
			
cmd.hear(/^(?:админ выдать зама)/i, async(message) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })		
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 500;
user.dgive = true;
user.tag = `ЗАМЕСТИТЕЛЬ`;

return message.send(`
Игрок ${user.prefix} получил ЗАМЕСТИТЕЛЯ
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 500;
user.dgive = true;
user.tag = `ЗАМЕСТИТЕЛЬ`;

return message.send(`
Игрок ${user.prefix} получил ЗАМЕСТИТЕЛЯ
`);				
			    }
			});

cmd.hear(/^(?:админ снять)/i, async(message) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })	
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 0;
user.vip = 0;
user.dgive = false;
user.tag = `Пользователь`;

return message.send(`
Игрок ${user.prefix} получил Пользователя
`);	
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);

user.realty.admin = 0;
user.vip = 0;
user.dgive = false;
user.tag = `Пользователь`;

return message.send(`
Игрок ${user.prefix} получил Пользователя
`);				
			    }
			});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	const phrase = utils.pick([`шанс фразы (${message.args[1]}) равен`, `мне кажется вероятность этой фразы (${message.args[1]}) равна `, `Валера говорит что шанс фразы (${message.args[1]}) равен`, `Виталя говорит что шанс фразы (${message.args[1]}) равен`]);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`, `Валера, считает что ${utils.random(1, 2)} вариант лучше`, `Виталя, считает что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let text = `на руках: ${utils.sp(message.user.balance)}$
	Добытых Метеоритов: ${message.user.m}
	Литров шоколада: ${message.user.m_2}
	Игрушек: ${message.user.m_3}
	Найденых в полёте Метеоритов: ${message.user.bb}`;

	if(message.user.bank) text += `\n💳 В банке: ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;

	await bot(text);
	
		const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1420, 600);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 0, 0);
				
			ctx.font = '30px Roboto'; 
			ctx.fillStyle = "#FFFFFF"; 
			ctx.fillText(text, 400, 90)

			await message.sendPhoto(canvas.toBuffer());
});

cmd.hear(/^(?:инфо)$/i, (message, bot) => { 
			const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1420, 600);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 0, 0);
			
            ctx.font = '30px Roboto'; 
			ctx.fillStyle = "#FFFFFF"; 
			ctx.fillText(`
			
                   Ник ${message.user.prefix},
				   
				   
				  `, 400, 90)
				
			ctx.font = '30px Roboto'; 
			ctx.fillStyle = "#FFFFFF"; 
			ctx.fillText(`

				\n Баланс: ${utils.sp(message.user.balance)}$,
				\n айди: ${message.user.uid},
				\n Биткоинов: ${utils.sp(message.user.btc)}, 
				\n Рейтинг: ${utils.sp(message.user.rating)}, `, 400, 90)

			return message.sendPhoto(canvas.toBuffer());
		});
		
		cmd.hear(/^(?:еда помощь)$/i, async (message, bot) => {
	return bot(`Привет, тут вся информация о еде бота и о жизнях!
	Изначально при регистрации вам дается 1 день жизни, потом нужно будет покупать еду и увеличивать срок жизни! (команда "еда") \n
	узнать сколько осталось до смерти можно написав "профиль".`);
});

const eda = [
	{
		name: "Еда с помойки",
		cost: 5000000000,
		id: 0,
		heal: 3600000
	},
	{
		name: "Еда с кормушек птичек",
		cost: 10000000000,
		id: 1,
		heal: 7200000
	},
	{
		name: "Воровать еду",
		cost: 50000000000,
		id: 2,
		heal: 14400000
	},
	{
		name: "Еда с ашана",
		cost: 100000000000,
		id: 3,
		heal: 28800000
	},
	{
		name: "Просрочка с магнита",
		cost: 300000000000,
		id: 4,
		heal: 57600000
	},
	{
		name: "Свежая еда с магнита",
		cost: 600000000000,
		id: 5,
		heal: 115200000
	}
];

cmd.hear(/^(?:еда)\s?([0-9]+)?$/i, async (message, bot) => {
							if(!message.args[1]) {
							let text = `` 
							let ccc = 0
							let ed = 0
for(key in eda) { 
ccc += Number(1);
ed = eda[key].cost
ed = utils.sp(ed)
text += `${ccc}. ${eda[key].name} - Стоимость: ${ed}$, Восстанавливает жизней ${unixStampLeft(eda[key].heal)}\n` 
} 
return message.send(`${text}
Для покупки еды напишите "еда [номер]"`)
							}
							
						
							const sell = eda.find(x=> x.id === Number(message.args[1] - 1));
							if(!sell) return;
						
						if(message.user.jizni > 432000000) return bot(`вы слишком много поели, подождите немного. если много кушать ваш живот может лопнуть 😄`);
							if(message.user.balance < sell.cost) return bot(`вам нужно ${utils.sp(sell.cost)}$ для покупки. `);
							else if(message.user.balance >= sell.cost)
							{
								message.user.balance -= Number(sell.cost);
								message.user.jizni += Number(sell.heal);
						
								return bot(`вы успешно купили еду ${sell.name} и продлили жизнь на ${unixStampLeft(sell.heal)}
								До смерти осталось ${unixStampLeft(message.user.jizni)}`);
							}
						});
		
cmd.hear(/^(?:профиль|проф|пр)$/i, async (message, bot) => {

await message.sendSticker(utils.pick([9451, 11751, 14010, 9975, 14261, 9109, 10117, 13164, 11025, 5796, 15791, 15834])); 

	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);  
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
	text += `&#128520;Cтатус: ${message.user.tag}\n Возраст: ${message.user.vozrast} лет\n`
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `💥опыт: ${utils.sp(message.user.opyt)}\n`;
	text += `☢уровень: ${utils.sp(message.user.level)}\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `💫 Игрового опыта: ${utils.sp(message.user.game_exp)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name} \n Зарплата от ${utils.sp(works[message.user.work - 1].min)} до ${utils.sp(works[message.user.work - 1].max)} за 1д работы\n`;
	
	text += `\n⚠ Варнов: ${message.user.warn}\n`;
    text += `\n⚠ Причинa: ${message.user.warn_p}\n`;
	text += `До смерти осталось: ${unixStampLeft(message.user.jizni)} (для пополнения жизней покупайте еду)\n`;
	text += `🗿 Тотемов: ${message.user.totem}\n`;
	
	if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].prefix}\n`;
	if(message.user.marriage.partner) text += `👩‍❤‍👨 В браке уже ${unixStampLeft(message.user.timed_brak)}`;
	
	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment || message.user.realty.PC ||
		message.user.misc.phone || message.user.misc.farm || message.user.realty.petsi || message.user.realty.suite || message.user.realty.weapon || message.user.misc.xl || message.user.business)
	{
		text += `\n🔑 Имущество:\n`;
		if(message.user.mtype === false) {
		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		} else {
		text += `⠀🚗 Машина: ${message.user.mname}\n`;
		}
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.stype === false) {
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		} else {
		text += `⠀🛩 Самолёт: ${message.user.sname}\n`;
		}
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;

if(message.user.dtype === false) {
		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
			} else {
		text += `⠀🏠 Дом: ${message.user.dname}\n`;
			}
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;
		if(message.user.pktype === false) {
        if(message.user.realty.PC) text += ` &#128187;Комп: ${PC[message.user.realty.PC - 1].name}\n`;
		} else {
			text += ` &#128187;Комп: ${message.user.pkname}\n`;
		}
		if(message.user.ptype === false) {
		if(message.user.realty.petsi) text += `&#128021;Питомец: ${petsi[message.user.realty.petsi - 1].name}\n`;
		} else {
		text += `&#128021;Питомец: ${message.user.pname}\n`;
		}
		if(message.user.realty.suite) text += `&#128084;Костюм: ${suite[message.user.realty.suite - 1].name}\n`;
		if(message.user.realty.weapon) text += `&#128299;Оружие: ${weapon[message.user.realty.weapon - 1].name}\n`;
		
		if(message.user.ttype === false) {
		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		} else {
		text += `⠀📱 Телефон: ${message.user.tname}\n`;
		}
		if(message.user.ftype === false) {
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name} (${message.user.misc.farm_count} шт.)\n`;
		} else {
		text += `⠀🔋 Ферма: ${message.user.fname} (${message.user.misc.farm_count} шт.)\n`;
		}
		if(message.user.misc.xl) text += `⠀🔋 Фарм: ${farmse[message.user.misc.xl - 1].name} (${message.user.misc.xl_count} шт.)\n`
		if(message.user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
				{
		text += `\n[&#128184;] || Руды:\n`;

    if(message.user.diamonds) text += `&#4448;&#128142; ⇢ Алмазов: ${message.user.diamonds}\n`;
    if(message.user.emeralds) text += `&#4448;&#128160; ⇢ Изумрудов: ${message.user.emeralds}\n`;
    if(message.user.coal) text += `&#4448;&#128488; ⇢ Угля: ${message.user.coal}\n`;
    if(message.user.iron) text += `&#4448;&#11036; ⇢ Железа: ${message.user.iron}\n`;
    if(message.user.gold) text += `&#4448;&#128155; ⇢ Золото: ${message.user.gold}\n`;
	}
	}

	text += `\n📗 Дата регистрации: ${message.user.regDate}`;
	await bot(`твой профиль[&#128100;]:\n${text}`).catch((error) => { console.log(` Ошибка.`);}); ;
	
});

cmd.hear(/^(?:айди)$/i, async (message, bot) => {
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 10117
})
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
	
	return bot(`твой айди[&#128100;]:\n${text}`);
});

cmd.hear(/^(?:статус)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let text = ``;

	text += `&#128520;Cтатус: ${message.user.tag}\n`
	return bot(`твой статус [&#128100;]:\n${text}`);
});

cmd.hear(/^(?:get)\s([0-9]+)$/i, async (message, bot) => { 
	if(message.user.realty.admin < 1) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`пользователь не зарегистрирован`); 
		let text = ``; 
		
		text += `🔎 ID: ${user.uid}\n`; 
		text += `💾 VKID: ${user.id}\n`;
		text += `&#128520;Cтатус: ${user.tag}\n`
		text += `📋 Имя: [id${user.id}| ${user.prefix}]\n`;
		text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
		if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`; 
		if(user.btc) text += `🌐 Биткоинов: ${utils.sp(user.btc)}\n`; 
		text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`; 
		if(user.work) text += `👔 Работа: ${works[user.work - 1].name}\n`;

	text += `\n⚠ Варнов: ${user.warn}`;
    text += `\n⚠ Причинa: ${user.warn_p}`;
	
		if(user.marriage.partner) text += `👬 Партнер: ${users[user.marriage.partner].prefix}`; 
		{ 
		if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter || 
		user.realty.home || user.realty.apartment || 
		user.misc.phone || user.misc.farm || user.business) 
		text += `\n🔑 Имущество:\n`; 
		
		if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`; 
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`; 
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`; 
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`; 
		
		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`; 
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`; 
		
		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`; 
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name} (${user.misc.farm_count} шт.)\n`; 
		if(user.business.length != 0) 
		{ 
		for(var i = 0; i < user.business.length; i++) 
		{ 
		text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`; 
		}}} 
		text += `\n📗 Дата регистрации: ${user.regDate}\n`; 
		return bot(`профиль:\n${text}`);  
		});

cmd.hear(/^(?:getmoney)\s([0-9]+)$/i, async (message, bot) => { 
	if(message.user.realty.admin < 1) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`пользователь не зарегистрирован`); 
		let text = ``; 
	
		text += `${utils.sp(user.balance)}$\n`;
		return bot(`${text}`);  
		});
		
cmd.hear(/^(?:поиск|найти)/i, async(message) => {
		if(message.user.realty.admin < 5) return;		
		if(message.forwards[0]){

			const use_id = message.forwards[0].senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);
      return message.send(`
Игрок: ${user.prefix}
    ID: ${user.uid}
    `)
			    }  
			    if(message.replyMessage){

			    	const use_id = message.replyMessage.senderId;
let user = users.find(x=> x.id === Number(use_id));
if(!user) return message.send(`Игрок не зарегистрирован`);
    return message.send(`
Игрок: ${user.prefix}
    ID: ${user.uid}
    `)					
			    }
			});

cmd.hear(/^(?:вчат)?$/i, async (message, args, bot) => {
		if(message.user.realty.admin < 5) return; 
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 			
			return message.send(` 

					Информация чата: 
					Имя участников: ${profiles.last_name}`);  
	});

cmd.hear(/^(?:впрофиль)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => {
		if(message.user.realty.admin < 5) return; 
		if(message.args[3]) { 
			vk.api.call('users.get', {user_id: message.args[3], fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}).then((res) => { 
				return message.send(` 

					Информация пользователя: @id${user.id} (${user.first_name} ${user.last_name}) ✓ 
					ID Профиля ВКонтакте: @id${user.id} 
					Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)} шт.`)+` 
					Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+` 
					Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")} 
					Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+` 
					Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+` 
					Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")} 
					Верификация: ${user.verified.toString().replace(/undefined/gi, "Не Верифицирован.").replace(/0/gi, "Не Верифицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")} 

					Ава профиля:`, 
					{attachment: `photo${user.photo_id}`}); 
			}) 
		} 
		if(message.args[4]) { 

			var domain = message.args[4].split(" "); 

			vk.api.call("utils.resolveScreenName", {screen_name: message.args[4]}).then((res) => { 
				vk.api.users.get({user_id: res.object_id, fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}) 

				.then((res) => { 

					let user = res[0]; 
					return message.send(` 

						Информация пользователя: @id${user.id} (${user.first_name} ${user.last_name}) ✓  
						ID Профиля ВКонтакте: @id${user.id} (${user.id}) 
						Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${utils.sp(user.followers_count)} шт.`)+` 
						Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+` 
						Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")} 
						Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+` 
						Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+` 
						Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")} 
						Верификация: ${user.verified.toString().replace(/undefined/gi, "Не Верифицирован.").replace(/0/gi, "Не Верифицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")} 

						Ава профиля:`, 
						{attachment: `photo${user.photo_id}`}); 
				}) 
			}) 
		}
	});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	return bot(`на вашем банковском счёте находится ${utils.sp(message.user.bank)}$`);
});

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.bank) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
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
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$`);
	if(message.user.uid != 105 && message.user.uid != 12 && message.user.uid != 2) {
		if(message.user.bank + message.args[1] > 25000000000000) return bot(`на счету в банке не может лежать одновременно больше 25.000.000.000.000$`);
	}

	if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`уведомления отключены! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.notifications = true;
		return bot(`уведомления включены! 🔔`);
	}
});


cmd.hear(/^(?:ник)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`гипперссылка отключена! `);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`гипперссылка включена! `);
	}
});

cmd.hear(/^(?:аник)\s([0-9]+)\s(выкл|вкл)$/i, async (message, bot) => {
  	
	if(message.user.realty.admin < 5) return;

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);
	
	if(message.args[2].toLowerCase() === 'выкл')
	{
		user.mention = false;
		await bot(`гипперссылка игрока отключена! `);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НИК]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] отключил вам гипперссылку!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}

	if(message.args[2].toLowerCase() === 'вкл')
	{
		user.mention = true;
		await bot(`гипперссылка игрока включена! `);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НИК]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] включил вам гипперссылку!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:пк|компы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);  
	if(!message.args[1]) return bot(`пк:
${message.user.realty.PC === 1 ? '🔹' : '🔸'} 1. ноут - (25000$)
${message.user.realty.PC === 2 ? '🔹' : '🔸'} 2. пк разраба - (50000$)
${message.user.realty.PC === 3 ? '🔹' : '🔸'} 3. игровой пк - (2500000$)

Для покупки введите "пк [номер]"`);

	const sell = PC.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.PC) return bot(`у вас уже есть пк (${PC[message.user.realty.PC - 1].name}), введите "Продать пк"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-178269772_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.PC = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:ban|бан)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);
    if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
    if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);

	user.ban = true;
    message.user.bans += 1;

    await bot(`вы выдали игроку ${user.prefix} бан`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[БАН]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам бан по причине: ${message.args[2]} !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения
время бана ${time()}
Не нарушали пишите [yarik_228220|СОЗДАТЕЛЬ 1] , [pystoi132|СОЗДАТЕЛЬ 2] , [vk.com.xyli.palish|ЗАМ]` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 11763 });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[БАН]\n&#128100; Игровой ID: ${user.uid} \n был забанен с причиной ${message.args[2]} Забанил ${message.user.prefix}`  
})
});

cmd.hear(/^(?:бан топа)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);
	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
    if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);

	user.blocktop = true;

    await bot(`вы выдали игроку ${user.prefix} бан топа`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[БАН]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам бан топа по причине: ${message.args[2]} !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения
время бана ${time()}
Не нарушали пишите [yarik_228220|СОЗДАТЕЛЬ 1] , [pystoi132|СОЗДАТЕЛЬ 2] , [vk.com.xyli.palish|ЗАМ]` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13191 });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[БАН]\n&#128100; Игровой ID: ${user.uid} \n был забанен в топе с причиной ${message.args[2]} Забанил ${message.user.prefix}`  
})
});

cmd.hear(/^(?:бан репорта)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);
	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
    if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);

	user.blockrep = true;

    await bot(`вы выдали игроку ${user.prefix} бан репорта`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[БАН]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам бан репорта по причине: ${message.args[2]} !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения
время бана ${time()}
Не нарушали пишите [yarik_228220|СОЗДАТЕЛЬ 1] , [pystoi132|СОЗДАТЕЛЬ 2] , [vk.com.xyli.palish|ЗАМ]` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13191 });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[БАН]\n&#128100; Игровой ID: ${user.uid} \n был забанен в репорте с причиной ${message.args[2]} Забанил ${message.user.prefix}`  
})
});

// Система тред


cmd.hear(/^(?:Время|time)$/i, async (message, bot) => { 
  	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);    
	await bot(`время сейчас:

⏰ | Москва:  ${time()}  Дата: ${data()}`);
});

cmd.hear(/^(?:стата)$/i, async (message, bot) => {
     if(message.user.realty.admin < 1) return;
		 
 await message.send(`🔔 Статистика Администратора 🔔

🔸 ➾ Уровень администратора: ${message.user.realty.admin}
     статус: ${message.user.tag}
     VKID: ${message.user.id}
     ИГРОВОЙ ID: ${message.user.uid}
✉ ➾ Количество ответов: ${message.user.ans}
      количество выговоров : ${message.user.vig}
      репутация у создателей : ${message.user.rep}
	  ✏ Статистика наказаний:
			📜  Выдано банов: ${message.user.bans}
			📜  Выдано варнов: ${message.user.warns}
       📜  выдано временных банов: ${message.user.timebans}
`);
});

cmd.hear(/^(?:возраст)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
	let lastnick = message.user.vozrast; 	
	let nick = message.args[1].toString().replace(/(&.*;|vk|s[сc]ri[рp]t|t[аa]rg[еe]t|[mм][iи]([xх]|[ксks])|[ilл][ilи][kк][eе]|\\u.{1,10}|mi[хx]|vt[оo]|[.&#]+|\.[рpеe]+)/gi, " ");
    if (nick.length > 2 || nick.length < 1) return bot(`максимальная длина 2 цифры.`);
message.user.vozrast = nick; 
return bot(`вы изменили возраст с ${lastnick} на ${nick}`);
});

cmd.hear(/^(?:стата)\s([0-9]+)$/i, async (message, bot) => { 
	if(message.user.realty.admin < 500) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`пользователь не зарегистрирован`);
		
 await message.send(`🔔 Статистика 🔔

🔸 ➾ Уровень администратора: ${user.realty.admin}
     статус: ${user.tag}
     VKID: ${user.id}
     ИГРОВОЙ ID: ${user.uid}
✉ ➾ Количество ответов: ${user.ans}
      количество выговоров : ${user.vig}
      репутация у создателей : ${user.rep}
	  	  ✏ Статистика наказаний:
			📜  Выдано банов: ${user.bans}
			📜  Выдано варнов: ${user.warns}
       📜  выдано временных банов: ${user.timebans}
`);
});
		
cmd.hear(/^(?:timeban)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
     if(message.user.realty.admin < 1) return message.send(`🔸 » Вы не стажёр и тд`);
	if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » timeban [ID] [TIME(1-999)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать timeban себе`);
    if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
	
	user.ban = true;
    message.user.timebans += 1;
	setTimeout(() => {
			user.ban = false;
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[РАЗБАН]
▶ срок наказиня закончен` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}, time);

if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[БАН]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам бан на ${message.args[2]} минуты по причине! ${message.args[3]}
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13191 });
	return message.send(`💰 » Вы забанили игрока [@id${user.id}(${user.prefix})] на ${message.args[2]} минут`); 
});

cmd.hear(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
     if(message.user.work !== 6) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 3 || message.args[2] < 1 ) return message.send(`⏺ Проверьте вводимые данные:\n⏺ jail [ID] [TIME(1-3)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать jail себе`);
    if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
	
	user.ban = true;
	setTimeout(() => {
			user.ban = false;
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ТЮРЯГА]
▶ срок наказиня закончен` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}, time);

if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ТЮРЯГА]
▶ Мент [id${message.user.id}| ${message.user.prefix}] выдал вам срок в тюрьме на ${message.args[2]} (минуты|минут) по причине! ${message.args[3]}
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13191 });
	return message.send(`💰 Вы посадили игрока [@id${user.id}(${user.prefix})] на ${message.args[2]} (минут|минуты)`); 
});

cmd.hear(/^(?:warn)\s([0-9]+)\s([^]+)/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.realty.admin < 5) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
		if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать warn себе`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);

		user.warn += 1;  
        user.warn_p = `${message.args[2]}`
        message.user.warns += 1;

		let text = `✅ » ${user.prefix} Вам выдали варн по причине: [${message.args[2]}]`
		if(user.warn == 3){
			user.warn = 0;
			user.ban = true; 
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
        vk.api.messages.send({ user_id: user.id, message: text
		});
		
		return message.send(`✅ » Вы выдали предупреждение игроку [${user.prefix}].`);
}); 

cmd.hear(/^(?:vig)\s([0-9]+)/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать vig себе`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
		user.vig += 1;  

		let text = `✅ » ${user.prefix} Вам выдали выговор`
		if(user.vig == 2){
			user.vig = 0;
			user.vip = false; 
			user.realty.admin = 0;
			user.tag = "пользователь";
			text += `\n🔸 » У вас 2 выговора.\n🔸 » Ваш аккаунт снят с поста админки и тд.`
		}
		vk.api.messages.send({ user_id: user.id, message: text
		});
		return message.send(`✅ » Вы выдали предупреждение игроку [${user.prefix}].`);
});


cmd.hear(/^(?:delete|обнулить)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 });

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);

	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
	
	user.balance = 2000;
	user.btc = 0;
	user.rating = 0;
	user.business = [];
	user.farm_btc = 0;
	user.transport.car = 0;
	user.transport.helicopter = 0;
	user.transport.yacht = 0;
	user.transport.airplane = 0;
	user.realty.PC = 0;
	user.realty.home = 0;
	user.realty.petsi = 0;
	user.realty.apartment = 0;
	user.realty.suite = 0;
	user.realty.weapon = 0;
	user.bank = 0;
	user.misc.farm = 0;
	user.misc.farm_count = 0;
	user.misc.phone = 0;
	user.work = 0;
	user.level = 1;
	user.exp = 0;

    await bot(`вы обнулили игрока ${user.prefix}`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ОБНУЛЕНИЯ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] обнулил вас по причине: ${message.args[2]}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ОБНУЛЕНИЯ]\n&#128100; Игровой ID: ${user.uid} \n был обнулён с причиной ${message.args[2]} обнулил ${message.user.prefix} `  
})
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 11765 });
});

cmd.hear(/^(?:правила|rules)$/i, async (message, bot) => {

 await bot(`
Правила Игрового бота; - 1
1.1 Запрещены оскорбления в любом виде: игроков, администрацию и сам проект!
1.2 Найдя баг незамедлительно сообщите Администрации! За использование багов - ((Наказания: Бан ))
. Не просите денег у админов не дадут! Также и с админкой потому что им нельзя
1.3 (поправка) администратор может выдать до 10кк
По его желанию , при злоупотреблении просьбами ((Наказания: бан / временный бан / предупреждение))
1.4 Неуважение к высшей администрации в любой форме Может наказываться баном /временным баном или же снятию,сокращению ваших имуществ .
1.5 К высшей администрации относятся : главный администратор , создатель , зам. создателя
1.6 Выдача себя за администрацию или модера со стажёром - бан
1.7 Если вас оскорбил администратор то пишите в репорт пример: "рeпорт [ид админа] оскорбил " так " и "так"
1.8 Репорт без причины ((Наказания: бан/или же предупреждение ))
1.9 Запрещены неоднократные "репорты без смысла". ((Наказания: бан / временный бан / предупреждение ))
Правила для администрации; - 2
2.1 Выдача баланса строго запрещена (исключения: Администратор может выдать максимум 10кк любому игроку )
2.2 Выдача прав без уведомления создателя/главного администратора строго запрещена
2.3 Оскорбления и попытки неуважения/унижения в любом виде строго запрещены!
2.4 Разбан любого игрока без согласования с главной администрацей ( по своей инициативе ) - ((Наказания: снятие ))
2.5 Запрещено банить без причины ((Наказания: выговор / 2 выговора / снятие с должности навсегда / временно* ))
2.6 Администрация не должна быть в каком-либо топе! ((Наказания: обнуление аккаунта))
2.7 Оскорбление участников в любом виде и вне зависимости от обстоятельства ((Наказания: выговор ))
2.8 Администратор может выдать предупреждение(warn) игроку который оскорбил его , или же при повторном оскорблении выдать бан пользователю
2.9 Запрещено превышать обязанности, вне зависимости от ситуации !!! ((Наказания: снятие ))

Если админ получил выговор и в течении 2 недель (14 дней ) ничего не нарушал то выговор будет снят

Правила для всех одинаковы !

Для админов :
Создатель , всегда может снять или дать выговор/предупреждение Гл.админу/модеру/ стажеру без предупреждения и объяснения.
**** важные вопросы в поддержку ****
1) вопросы касательно покупки администратора/модератора или же вип аккаунта
2) проблемы касательно конкурсов
Остальные вопросы не считаются более важными и принимаются только в лс группы или же в репорт : репорт ( ваше сообщение)
Больше 3 сообщений - спам
`)

await bot(`
Соглашение

Договор-оферта
Данный документ обязателен для ознакомления всем посетителям и пользователям нашего бота
1. Предмет соглашения.
1.1. Администрация предоставляет бесплатный доступ к игровому боту

1.2. Пользовательское соглашение является публичным и обязательно к ознакомлению.

2. Стороны соглашения.
2.1. Пользователь – физическое лицо, написавшее какое-либо сообщение в группу vk.com/vasyabot0
При написании какого-либо сообщения Пользователь полностью соглашается с данным соглашением.

2.2. Администрация бота vk.com/vasyabot0

3. Обязанности пользователя.
3.1. Пользователь обязан соблюдать данное пользовательское соглашение.

3.2. Пользователь обязан соблюдать правила, которые подробно изложены в обсуждение «Правила» в нашем сообществе

3.3. Пользователь обязан соблюдать требования законодательства Российской Федерации и своей страны нахождения.
4. Права администрации.
4.1. Администрация имеет право проводить технические работы в любое время, без предупреждения Пользователей.

4.2. Администрация имеет право заблокировать любого Пользователя за несоблюдение данного соглашения.

4.3. Администрация имеет право отслеживать и сохранять информацию о Пользователе, его ID , кол-во различных ресурсов таких как : деньги, биткоины и др.

4.4. Администрация имеет право изменять группу по своему усмотрению.

4.5. Администрация имеет право вносить поправки в состав/конструктивность бота

4.6. Администрация имеет право провести вайп (обнуление) игровых ресурсов по своему усмотрению стирая при этом все данные пользователей и\или купленные игроками вещи и\или товары.

4.7. В случае вайпа\бага\лага\неисправности администрация имеет право не возвращать купленные игроками вещи и\или товары .

4.8. Администрация имеет право производить рассылки используя учетную запись с которой было отправлено(ы) сообщение(я) в группу бота.

4.8.1. Администрация и ее сотрудники имеют право публиковать ID пользователя для доказательств нарушения правил.

5. Обязанности администрации.
5.1. Администрация обеспечивает доступность ресурса.

5.2. Администрация гарантирует, что доступ к ресурсу является совершенно бесплатным.

5.3. Администрация обязуется сохранить все данные Пользователя от третьих лиц, кроме случаев, предусмотренных законодательством РФ.

6. Ответственность пользователя.
6.1. Пользователь несет полную ответственность за действия совершенные на сайте или сервере с его учетной записи.

6.2. Пользователь полностью на добровольной основе вкладывает реальные деньги в свою учетную запись.

7. Вступление в силу.
7.1. Настоящее соглашение вступает в силу, после написания какого-либо сообщения в группу Пользователем учетной записи, то есть регистрации аккаунта в игровом боте.

8. Сроки действия.
8.1. Сроки действия данного соглашения неограниченны.

9. Изменение настоящего соглашения.
9.1. Администрация сайта может внести любое изменение в данное пользовательское соглашение с/без уведомлением/я Пользователя.

10. Иные положения.
10.1. В случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации пользователей, а также бесперебойную работу ресурса.

10.2. Администрация имеет право забрать звание : админ/модератор/вип без обьяснения и без возвращения денежных средств.

10.3. Выдача звания в связи с тем что вы его купили во время того когда игровой бот не работал, был перезапущен и т.д. производиться в течение 96 часов с момента покупки.

10.4. В случае нарушения правил игрового бота (указанных здесь) выдача званий не производится.

10.5. При покупке звания , некоторые из заявленных возможностей могут быть отключены по решению администрации.
10.6 В нашего бота разрешено играть только с одного аккаунта ! При обнаружении фейка (бан/временный бан)`)


await bot(`СПИСОК ЭТИХ  ПРАВИЛ, ОБЯЗАТЕЛЕН К ПРОЧТЕНИЮ, ЕСЛИ ВЫ НЕ ПРОЧИТАЛИ ПРАВИЛО И ЧТО-ТО ИЗ ЭТОГО НАРУШИЛИ, ТО ВАМ БАН, УДАЧИ!!!!`)

await message.send({ attachment: utils.pick(["audio437164029_456239494"]) });	
});

cmd.hear(/^(?:permban|вечныйбан)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);
	if(user.realty.admin == 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6870 })
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать бан себе`);
	
	user.ban = true;
	user.uid = "минус пидорас";	

    await bot(`вы выдали игроку ${user.prefix} бан навсегда`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[PERMBAN]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам бан навсегда по причине: ${message.args[2]}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13191 });
});

cmd.hear(/^(?:лог)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);

    await bot(`действия донатера: ${user.log}`);
});

cmd.hear(/^(?:разбан|unban)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID игрока`);

	user.ban = false;
	user.blocktop = false;

	await bot(`вы разбанили ${user.prefix}`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[РАЗБАН]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам разбан  !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[РАЗБАН]\n&#128100; Игровой ID: ${user.uid} \n был разбанен  разбанил ${message.user.prefix}`  
})
});

// Система рынка //

cmd.hear(/^(?:написать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		if(user.uid === message.user.uid) return bot(`убедитесь в правильности ID`);

		return bot(`вы написали игроку ${user.prefix} ${message.args[2]}`);
 vk.api.messages.send({ peer_id: user.id, message: `[СООБЩЕНИЕ]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] написал вам ${message.args[2]}!` });
 vk.api.messages.send({ peer_id: 444997646, message: `[СООБЩЕНИЕ]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] написал игроку [id${user.id}| ${user.prefix}] ${message.args[2]}!` });
});

cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 9126
})
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.limit.sent);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас недостаточно средств
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
if(message.user.realty.itemse == 0) {
	{
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.user.uid != 12 && message.user.uid != 2) {
		if(message.args[2] + message.user.limit.sent > 20000000000) return bot(`доступно: ${utils.sp(20000000000 - message.user.limit.sent)}$`)
		}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		if(user.uid === message.user.uid) return bot(`убедитесь в правильности ID`);

		message.user.balance -= message.args[2];
		message.user.limit.sent += message.args[2];
		user.balance += message.args[2];

		await bot(`вы передали игроку ${user.prefix} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ chat_id: 361, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел [id${user.id}| ${user.prefix}] ${utils.sp(message.args[2])}$!` }); 
	}
}	

if(message.user.realty.itemse == 1) {
	{
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 40000000000) return bot(`доступно: ${utils.sp(40000000000 - message.user.limit.sent)}$`)
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		if(user.uid === message.user.uid) return bot(`убедитесь в правильности ID`);

		message.user.balance -= message.args[2];
		message.user.limit.sent += message.args[2];
		user.balance += message.args[2];

		await bot(`вы передали игроку ${user.prefix} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ chat_id: 361, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел [id${user.id}| ${user.prefix}] ${utils.sp(message.args[2])}$!` }); 
	}
}

if(message.user.realty.itemse == 2) {
	{
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.user.uid != 12 && message.user.uid != 2) {
		if(message.args[2] + message.user.limit.sent > 20000000000) return bot(`доступно: ${utils.sp(20000000000 - message.user.limit.sent)}$`)
		}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		if(user.uid === message.user.uid) return bot(`убедитесь в правильности ID`);

		message.user.balance -= message.args[2];
		message.user.limit.sent += message.args[2];
		user.balance += message.args[2];

		await bot(`вы передали игроку ${user.prefix} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ chat_id: 361, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел [id${user.id}| ${user.prefix}] ${utils.sp(message.args[2])}$!` }); 
	}
}

if(message.user.realty.itemse == 3) {
	{
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.user.uid != 12 && message.user.uid != 2) {
		if(message.args[2] + message.user.limit.sent > 20000000000) return bot(`доступно: ${utils.sp(20000000000 - message.user.limit.sent)}$`)
		}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);

		if(user.uid === message.user.uid) return bot(`убедитесь в правильности ID`);

		message.user.balance -= message.args[2];
		message.user.limit.sent += message.args[2];
		user.balance += message.args[2];

		await bot(`вы передали игроку ${user.prefix} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ chat_id: 361, message: `[ПЕРЕВОД]
▶ Игрок [id${message.user.id}| ${message.user.prefix}] перевел [id${user.id}| ${user.prefix}] ${utils.sp(message.args[2])}$!` }); 
	}
}	
});

cmd.hear(/^(?:репост проверка)\s(.*)$/i, async (message, bot) => {
user.api.call('wall.getReposts', { owner_id: -181025518, post_id: message.args[1], count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					vk.api.messages.send({ peer_id: message.peerId, message: `[id${user.id}|${user.prefix}], сделал репост` });
				});
			});
});

cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -181025518,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит 20ккк$
		
		🔍 Посылки будут отправлены ровно через 48 часов МСК, Ваш профиль ВК должен быть открыт сейчас в Москве:  ${time()}  Дата: ${data()}`,
		attachments: ' '
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -181025518, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance += 20000000000;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.prefix}], спасибо за участие в раздаче! 🔑\n\n 💥 Вы получили 20ккк$` });
					vk.api.messages.send({ user_id: 444997646, message: ``})
				});
			});
			user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			giving = false;
		}, 172800000);
	});
	await bot(`раздача начата`);
});

cmd.hear(/^(?:раздачарейт)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -181025518,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит 1.500 рейтинга
		
		🔍 Посылки будут отправлены ровно через 1 час по МСК, Ваш профиль ВК должен быть открыт сейчас в Москве:  ${time()}  Дата: ${data()}`,
		attachments: ' '
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -181025518, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.rating += Number(1500);
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.prefix}], спасибо за участие в раздаче! 🔑\n\n 💥 Вы получили 1.500 рейтинга` });
					vk.api.messages.send({ user_id: 444997646, message: ``})
				});
			});
			user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			giving = false;
		}, 3600000);
	});
	await bot(`раздача начата`);
});

cmd.hear(/^(?:подраздача)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -181025518,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит 5 подарков
		
		🔍 Акция действует ровно 24 часа`,
		attachments: ' '
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -181025518, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.pod_c += 5;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.prefix}], спасибо за участие в раздаче! 🔑\n\n 💥 Вы получили 5 подарков` });
					vk.api.messages.send({ user_id: 444997646, message: `[id${user.id}|${user.prefix}] поучаствовал в раздаче и получил 5 подарков`})
				});
			});
			user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			giving = false;
		}, 86400000);
	});
	await bot(`раздача начата`);
});

cmd.hear(/^(?:меч раздача)$/i, async (message, bot) => {
	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -181025518,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит СЕКРЕТНЫЙ МЕЧ
		
		🔍 Акция действует ровно 24 часа`,
		attachments: ' '
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181025518,
				post_id: response.post_id,
				from_group: 181025518,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -181025518, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.mah_name = "Рубиновый меч";
					user.mah_pr = 2000;
					user.mah_yr = 10;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.prefix}], спасибо за участие в раздаче! 🔑\n\n 💥 Вы получили Секретный меч` });
				});
			});
			user.api.wall.openComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -181025518,
				post_id: response.post_id
			});
			giving = false;
		}, 86400000);
	});
	await bot(`раздача начата`);
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
	let lastnick = message.user.prefix; 	
	let nick = message.args[1].toString().replace(/(&.*;|@|vk|user|token|api|message|s[сc]ri[рp]t|t[аa]rg[еe]t|[mм][iи]([xх]|[ксks])|[ilл][ilи][kк][eе]|\\u.{1,10}|mi[хx]|vt[оo]|[.&#]+|\.[рpеe]+)/gi, "?");
    if (nick.length > 25 || nick.length < 1) return bot(`максимальная длина 25 символов.`);
    message.user.prefix = nick; 
				
await message.send(`[id${message.user.id}|${lastnick}] вы изменили ник на ${nick}`, { disable_mentions: 1 });
});

cmd.hear(/^(?:запомни)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);

message.user.zapomni += `${message.args[1]},`;
return bot(`я запомнила ${message.args[1]} я на помню это по команде напомни`);
});

cmd.hear(/^(?:забудь)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);

message.user.zapomni = ` `;
return bot(`я забыла всё что вы просили меня на помнить `);
});

cmd.hear(/^(?:напомни)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);

return bot(`всё что я запомнила от вас: ${message.user.zapomni}`);
});

cmd.hear(/^(?:чатинфо)$/i, async (message, bot) => {
	let l = message.chatId;
	let f = vk.api.messages.getConversationMembers({ peer_id: 1 }).catch((error) => {return message.send(`⚠ Ошибка 1`);});
	
	return bot(`айди чата: ${l}
	участников в беседе: ${f.count}`).catch((error) => {return message.send(`⚠ Ошибка 2`);});
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 10139
})
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
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
    Метеорит [кол-во] - $2 трлн
⠀⠀📱 Телефоны
⠀⠀⭐ Фермы

   &#128187;Пк
   ⚔ Для боссов
   &#128021;Питомцы
   &#128084;Костюмы
   &#128299;Оружия
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀🌐 Биткоин [кол-во]
   предметы

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 3', 'Машина 4', 'Ферма 2', 'Биткоин 10', 'Рейтинг 5'])}"`);
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
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
${message.user.transport.car === 16 ? '🔹' : '🔸'} 16. Ламборгини Veneno (70.500.000$)

Для покупки введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:предметы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`предметы:
${message.user.realty.itemse === 1 ? '🔹' : '🔸'} 1. талисман монополиста - увиличивает лимит передачи на 20ккк (засекречено)
${message.user.realty.itemse === 2 ? '🔹' : '🔸'} 2. кулак судьбы - уменьшает время окончания таймера на снять до 20 минут (засекречено)
${message.user.realty.itemse === 3 ? '🔹' : '🔸'} 3. талисман опытного работника - получайте в 2 раза больше опыта с работы и флекса с кликом (засекречено)

Для покупки введите "предметы [номер]"`);

	const sell = itemss.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.itemse = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:пк|компы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(!message.args[1]) return bot(`пк:
${message.user.realty.PC === 1 ? '🔹' : '🔸'} 1. ноут - (25000$)
${message.user.realty.PC === 2 ? '🔹' : '🔸'} 2. пк разраба - (50000$)
${message.user.realty.PC === 3 ? '🔹' : '🔸'} 3. игровой пк - (2500000$)

Для покупки введите "пк [номер]"`);

	const sell = PC.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.PC) return bot(`у вас уже есть пк (${PC[message.user.realty.PC - 1].name}), введите "Продать пк"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.PC = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:питомцы|pets)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`питомцы:
${message.user.realty.petsi === 1 ? '🔹' : '🔸'} 1. мартышка дима - (25000$)
${message.user.realty.petsi === 2 ? '🔹' : '🔸'} 2. бухой огурчик вова - (50000$)
${message.user.realty.petsi === 3 ? '🔹' : '🔸'} 3. кот космонавт виталий - (2500000$)

Для покупки введите "питомцы [номер]"`);

	const sell = petsi.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.petsi) return bot(`у вас уже есть питомец (${petsi[message.user.realty.petsi - 1].name}), введите "Продать питомца"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.petsi = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:костюмы|suite)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`костюмы:
${message.user.realty.suite === 1 ? '🔹' : '🔸'} 1. костюм лимона - (25000$)
${message.user.realty.suite === 2 ? '🔹' : '🔸'} 2. костюм за 300 - (50000$)
${message.user.realty.suite === 3 ? '🔹' : '🔸'} 3. нанокостюм - (25000000000$)

Для покупки введите "костюмы [номер]"`);

	const sell = suite.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.suite) return bot(`у вас уже есть костюм (${suite[message.user.realty.suite - 1].name}), введите "Продать костюм"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.suite = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:оружия|weapon)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`оружия:
${message.user.realty.weapon === 1 ? '🔹' : '🔸'} 1. пистолет - (25000$)
${message.user.realty.weapon === 2 ? '🔹' : '🔸'} 2. дигл - (50000$)
${message.user.realty.weapon === 3 ? '🔹' : '🔸'} 3. миниган - (25000000000$)

Для покупки введите "оружия [номер]"`);

	const sell = weapon.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.weapon) return bot(`у вас уже есть оружия (${weapon[message.user.realty.weapon - 1].name}), введите "Продать оружия"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.weapon = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`яхты:
${message.user.transport.yacht === 1 ? '🔹' : '🔸'} 1. Поплавок (5.000$)
${message.user.transport.yacht === 2 ? '🔹' : '🔸'} 2. Ванна (25.000$)
${message.user.transport.yacht === 3 ? '🔹' : '🔸'} 3. Шлюбка (50.000$)
${message.user.transport.yacht === 4 ? '🔹' : '🔸'} 4. Деревянная лодка (250.000$)
${message.user.transport.yacht === 5 ? '🔹' : '🔸'} 5. Reedor D12 (500.000$)
${message.user.transport.yacht === 6 ? '🔹' : '🔸'} 6. Phowater 89 (1.000.000$)
${message.user.transport.yacht === 7 ? '🔹' : '🔸'} 7. Droomware (2.500.000$)
${message.user.transport.yacht === 8 ? '🔹' : '🔸'} 8. V1ZE-AD (5.000.000$)
${message.user.transport.yacht === 9 ? '🔹' : '🔸'} 9. Vilworn Re-11 (25.000.000$)
${message.user.transport.yacht === 10 ? '🔹' : '🔸'} 10. X-Water 187 (50.000.000$)
${message.user.transport.yacht === 11 ? '🔹' : '🔸'} 11. BreVNo SeRgEi v12 (75.000.000$)

Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});



cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`самолеты:
${message.user.transport.airplane === 1 ? '🔹' : '🔸'} 1. Параплан (75.000$)
${message.user.transport.airplane === 2 ? '🔹' : '🔸'} 2. Летучий змей (250.000$)
${message.user.transport.airplane === 3 ? '🔹' : '🔸'} 3. Wermetta T12 (500.000$)
${message.user.transport.airplane === 4 ? '🔹' : '🔸'} 4. Marine-Acvate (1.000.000$)
${message.user.transport.airplane === 5 ? '🔹' : '🔸'} 5. DBR 25 (2.500.000$)
${message.user.transport.airplane === 6 ? '🔹' : '🔸'} 6. Bollow-81 (5.000.000$)
${message.user.transport.airplane === 7 ? '🔹' : '🔸'} 7. Zenda R310B (15.000.000$)
${message.user.transport.airplane === 8 ? '🔹' : '🔸'} 8. Air-Knight DDR200 (50.000.000$)
${message.user.transport.airplane === 9 ? '🔹' : '🔸'} 9. Water-marine B11 (100.000.000$)
${message.user.transport.airplane === 10 ? '🔹' : '🔸'} 10. Mediumjet REDOK (250.000.000$)
${message.user.transport.airplane === 11 ? '🔹' : '🔸'} 11. Growh Z1 (500.000.000$)
${message.user.transport.airplane === 12 ? '🔹' : '🔸'} 12. SN1V1Z-AD (1.000.000.000$)
Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`вертолеты:
${message.user.transport.helicopter === 1 ? '🔹' : '🔸'} 1. Шарик с пропеллером (5.000$)
${message.user.transport.helicopter === 2 ? '🔹' : '🔸'} 2. WoZd 3000 (25.000$)
${message.user.transport.helicopter === 3 ? '🔹' : '🔸'} 3. Bell 49-A (50.000$)
${message.user.transport.helicopter === 4 ? '🔹' : '🔸'} 4. ReD-EsCaPe (250.000$)
${message.user.transport.helicopter === 5 ? '🔹' : '🔸'} 5. ZN242-AR (500.000$)
${message.user.transport.helicopter === 6 ? '🔹' : '🔸'} 6. ARR DE COMR (1.000.000$)
${message.user.transport.helicopter === 7 ? '🔹' : '🔸'} 7. De Luke HIGH (2.500.000$)
${message.user.transport.helicopter === 8 ? '🔹' : '🔸'} 8. Eurocopter 1500 (5.000.000$)
${message.user.transport.helicopter === 9 ? '🔹' : '🔸'} 9. Snight NH90 (20.000.000$)
${message.user.transport.helicopter === 10 ? '🔹' : '🔸'} 10. O'Bell Sprey (32.000.000$)
${message.user.transport.helicopter === 11 ? '🔹' : '🔸'} 11. SN1ZE-AD (40.000.000$)

Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`дома:
${message.user.realty.home === 1 ? '🔹' : '🔸'} 1. Коробка из-под холодильника - (250$)
${message.user.realty.home === 2 ? '🔹' : '🔸'} 2. Чердак - (3.000$)
${message.user.realty.home === 3 ? '🔹' : '🔸'} 3. Подвал - (3.500$)
${message.user.realty.home === 4 ? '🔹' : '🔸'} 4. Будка - (5.000$)
${message.user.realty.home === 5 ? '🔹' : '🔸'} 5. Дом на дереве - (10.000$)
${message.user.realty.home === 6 ? '🔹' : '🔸'} 6. Дом в Горловке - (25.000$)
${message.user.realty.home === 7 ? '🔹' : '🔸'} 7. Дом в ЛДНР - (37.500$)
${message.user.realty.home === 8 ? '🔹' : '🔸'} 8. Дом в центре Донецка - (125.000$)
${message.user.realty.home === 9 ? '🔹' : '🔸'} 9. Многоэтажный дом - (80.000$)
${message.user.realty.home === 10 ? '🔹' : '🔸'} 10. Вилла в Монако - (450.000$)
${message.user.realty.home === 11 ? '🔹' : '🔸'} 11. Дом на Сахалине - (1.250.000$)
${message.user.realty.home === 12 ? '🔹' : '🔸'} 12. Дом на Рублёвке - (5.000.000$)
${message.user.realty.home === 13 ? '🔹' : '🔸'} 13. Личный "Москва-Сити" - (7.000.000$)
${message.user.realty.home === 14 ? '🔹' : '🔸'} 14. Остров с особняком - (12.500.000$)
${message.user.realty.home === 15 ? '🔹' : '🔸'} 15. Белый дом - (20.000.000$)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`квартиры:
${message.user.realty.apartment === 1 ? '🔹' : '🔸'} 1. Подвал (50.000$)
${message.user.realty.apartment === 2 ? '🔹' : '🔸'} 2. Крыша дома (150.000$)
${message.user.realty.apartment === 3 ? '🔹' : '🔸'} 3. Квартира в общежитии (500.000$)
${message.user.realty.apartment === 4 ? '🔹' : '🔸'} 4. Однокомнатная квартира (1.000.000$)
${message.user.realty.apartment === 5 ? '🔹' : '🔸'} 5. Двухкомнатная квартира (5.000.000$)
${message.user.realty.apartment === 6 ? '🔹' : '🔸'} 6. Квартира в Горловке (25.000.000$)
${message.user.realty.apartment === 7 ? '🔹' : '🔸'} 7. Квартира в центре Донецка (50.000.000$)
${message.user.realty.apartment === 8 ? '🔹' : '🔸'} 8. Квартира в центре Луганска (100.000.000$)
${message.user.realty.apartment === 9 ? '🔹' : '🔸'} 9. Квартира в центре Москвы (150.000.000$)

Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`телефоны:
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Samsung (2012) (500$)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. P-Hoe 7000 (2.000$)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. Frenc IO de 21 (10.000$)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Samsung Galaxy S8 (15.000$)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Rotan 316 (30.000$)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Sneg CE12 (75.000$)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. IPhone X (100.000$)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. IPhone XS (250.000$)

Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`Майнинг фермы:
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2₿/час (10.000.000$)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 10₿/час (175.000.000$)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 100₿/час (1.000.000.000$)
${message.user.misc.farm === 4 ? '🔹' : '🔸'} 4. VASYA FARM BTC 50000₿/час (100.000.000.000$)
${message.user.misc.farm === 5 ? '🔹' : '🔸'} 5. ANONO FARM BTC 60000₿/час (200.000.000.000$)
${message.user.misc.farm === 6 ? '🔹' : '🔸'} 6. ADMINS FERM RICHI 500000₿/час (5.000.000.000.000$) 


Для покупки введите "Фермы [номер] [количество]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить меньше 0 ферм`);
	if(count + message.user.misc.farm_count > 3500) return bot(`вы не можете иметь больше 3500 ферм`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.farm = sell.id;
		message.user.misc.farm_count += count;

		return bot(`вы купили "${sell.name}" (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});

cmd.hear(/^(?:фарм)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1]) return bot(`Фармы:
${message.user.misc.xl === 1 ? '🔹' : '🔸'} 1. скрыто
${message.user.misc.xl === 2 ? '🔹' : '🔸'} 2. скрыто
${message.user.misc.xl === 3 ? '🔹' : '🔸'} 3.    скрыто
${message.user.misc.xl === 4 ? '🔹' : '🔸'} 4.  скрыто
${message.user.misc.xl === 5 ? '🔹' : '🔸'} 5. скрыто
${message.user.misc.xl === 6 ? '🔹' : '🔸'} 6. скрыто


Для покупки введите "Фарм [номер] [количество]"`);

	const sell = farmse.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить меньше 0 фармов`);
	if(count + message.user.misc.xl_count > 3500) return bot(`вы не можете иметь больше 3500 фармов`);
	if(message.user.misc.xl != 0 && message.user.misc.xl != message.args[1]) return bot(`вы не можете купить фарм другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.xl = sell.id;
		message.user.misc.xl_count += count;

		return bot(`вы купили "${sell.name}" (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.admin === 1) return bot(`вам в топ нельзя`)
	if(message.user.vip === 1) return bot(`вам в топ нельзя`)
	if(message.user.realty.admin === 2) return bot(`вам в топ нельзя`)	
	if(message.user.realty.admin === 3) return bot(`вам в топ нельзя`)
	if(message.user.realty.admin === 4) return bot(`вам в топ нельзя`)
	if(message.user.realty.admin === 5) return bot(`вам в топ нельзя`)
	if(message.user.realty.admin === 6) return bot(`вам в топ нельзя`)
	if(message.user.realty.admin === 100) return bot(`вам в топ нельзя`)
	if(message.user.blocktop == true) return bot(`вам блокнули топ`)
		
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 250000000}$`);
	}
});

cmd.hear(/^(?:допбизнес помощь)?$/i, async (message, bot) => {
	
	return bot(`допбизнес купить [номер допбизнеса] - купить доп-бизнес
допбизнес снять [номер допбизнеса] - снять метеориты с доп-бизнеса
допбизнес - информация о доп-бизнесах`);
});

cmd.hear(/^(?:допбизнес купить 1)?$/i, async (message, bot) => {
if(message.user.bb < 20000) return bot(`Нехватает метеоритов!`);

   message.user.bb -= 20000;
   message.user.mb = true;
   
  return bot(`Вы купили доп-бизнес Межгалактическая станция! Введите "Допбизнес 1" Для просмотра информации`);
}); 

cmd.hear(/^(?:допбизнес купить 2)?$/i, async (message, bot) => {
if(message.user.m_2 < 50000) return bot(`Нехватает шоколада!`);

   message.user.m_2 -= 50000;
   message.user.mb_2 = true;
   
  return bot(`Вы купили доп-бизнес Произовдство игрушек! Введите "Допбизнес 2" Для просмотра информации`);
});

cmd.hear(/^(?:допбизнес выдать 1)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`убедитесь в правильности ID игрока`);

   user.mb = true;
   
  return bot(`Вы выдали доп-бизнес игроку ${user.prefix}`);
  vk.api.messages.send({ user_id: user.id, message: `Создатель [id${message.user.id}| ${message.user.prefix}] выдал вам доп-бизнес Межгалактическая станция!` });
});

cmd.hear(/^(?:допбизнес выдать 2)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`убедитесь в правильности ID игрока`);

   user.mb_2 = true;
   
  return bot(`Вы выдали доп-бизнес игроку ${user.prefix}`);
  vk.api.messages.send({ user_id: user.id, message: `Создатель [id${message.user.id}| ${message.user.prefix}] выдал вам доп-бизнес Шоколадная фабрика !` });
});

cmd.hear(/^(?:допбизнес выдать 3)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`убедитесь в правильности ID игрока`);

   user.mb_3 = true;
   
  return bot(`Вы выдали доп-бизнес игроку ${user.prefix}`);
  vk.api.messages.send({ user_id: user.id, message: `Создатель [id${message.user.id}| ${message.user.prefix}] выдал вам доп-бизнес Производство игрушек !` });
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n `;

		}
		text += `\n(📚)что-бы купить бизнесы [1-13](📚)`
		return bot(text);
	}
	
	if(message.args[1] > 13) return bot(`Введите номер бизнеса от 1 до 13`);

	if(message.user.business.length == 2) return bot(`у вас уже есть 2 бизнеса`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];
	if(sell == null) return;
	if(message.user.balance < sell.cost) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	message.user.balance -= sell.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});
	
	return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
async function cours() {
	const bit = await request('https://api.cryptonator.com/api/ticker/btc-usd');
var x = bit; 
const bitr = await request("http://api.cryptonator.com/api/ticker/btc-rub"); 
var c = bitr; 
const usd = await request("http://api.cryptonator.com/api/ticker/usd-rub"); 
var u = usd; 
const eur = await request("http://api.cryptonator.com/api/ticker/eur-rub"); 
var e = eur;  	
	return bot(`курс валют на данный момент:
💵 Доллар США: ${Math.floor(Number(u.ticker.price))}₽
💶 Евро: ${Math.floor(Number(e.ticker.price))}₽
🌐 Биткоин: ${Math.floor(Number(x.ticker.price))}$ или ${Math.floor(c.ticker.price)}₽

Метеорит: ${utils.sp(meteorit)}
Шоколад: ${utils.sp(shokolad)}
Игрушки: ${utils.sp(igrushki)}`);
}
setTimeout(() => {
	return cours().catch(console.error);
}, 0.1);
});

cmd.hear(/^(?:гонка)$/i, async (message, bot) => { 
let f = 9;
let vibb = utils.pick([1, 2]);
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
			if(vibb == 1) {
		message.user.kapha = utils.random(1000, 9999);
			}
			if(vibb == 2) {
		message.user.kapha = utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
			}
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(!message.user.transport.car) return bot(`у вас нету машины`);
if(message.user.level < 45) return bot(`что бы гонять вам нужно иметь 45 уровень.`);
if(message.user.benz < 1) return bot(`машину заправят через 5 минут`);

let km = utils.random(30, 1200);
taxicash = utils.random(987923, 3416011);
message.user.benz -= 1;
message.user.balance += taxicash * km;

if(message.user.benz < 1) {

setTimeout(() => {
	message.user.benz = 10;
	return bot(`прошло 5 минут вы можете гонять команда гонка`);
}, 300000);

return bot(`вы заработали ${utils.sp(taxicash * km)}$
бензин закончился.`);

}

if(message.user.benz > 0) bot(`вы заработали ${utils.sp(taxicash * km)}$ \n бензина хватит на ${message.user.benz} гонок`);

});

cmd.hear(/^(?:вип гонка)$/i, async (message, bot) => { 
let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
if(message.user.vip == 0 ) return bot(`доступна только вип`)
	if(!message.user.transport.car) return bot(`у вас нету машины`);
if(message.user.level < 25) return bot(`что бы вип гонять вам нужно иметь 25 уровень.`);

let km = utils.random(30, 1200);
taxicash = utils.random(9879231, 34160111);

message.user.balance += taxicash * km;
message.user.exp += 9;



return bot(`вы заработали ${utils.sp(taxicash * km)}$
бензин бесконечный.`);

});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(б|b)/ig, '000000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`у вас недостаточно средств
Курс биткоина: ${btc}$`, {attachment:'market-181025518_2646788'});
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

cmd.hear(/^(?:топ биткоинов)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.uid != 2 && message.user.uid != 12 && message.user.uid != 1 && message.user.uid != 29) return bot(`Топ биткоинов доступен только создателю.`);	
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, btc: x.btc, prefix: x.prefix, id: x.id, mention: x.mention, admin: x.admin });
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

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.prefix}) — ${utils.sp(user.btc)}₿ | ${utils.rn(user.balance)}$
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.prefix} — ${utils.sp(message.user.btc)}₿ | ${utils.rn(message.user.balance)}$`);
});


cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, rating: x.rating, prefix: x.prefix, id: x.id, mention: x.mention});
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.prefix}) — 👑${utils.sp(user.rating)} | $${utils.rn(user.balance)}
		`;
	}

	await bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.prefix} — 👑${utils.sp(message.user.rating)} | $${utils.rn(message.user.balance)}`);

});

cmd.hear(/^(?:Неактив)$/i, async (message, bot) => {
let top = [];

users.map(x=> {
top.push({ neactiv: x.neactiv, prefix: x.prefix, id: x.id, mention: x.mention });
});

top.sort((a, b) => {
return b.neactiv - a.neactiv;
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

for (let i = 0; i < 40; i++)
{
if(!top[i]) return;
const user = top[i];

text += `${utils.gi(i + 1)}. @id${user.id} (${user.prefix}) — ${unixStampLeft(user.neactiv)}
`;
}

return bot(`Неактив в боте:
${text}`);
});
cmd.hear(/^(?:топ баланс)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
if(message.user.uid != 2 && message.user.uid != 12 && message.user.uid != 1 && message.user.uid != 29) return bot(`Топ баланс доступен только создателю.`);	
	let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, prefix: x.prefix, id: x.id, mention: x.mention });
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.prefix}) — $${utils.rn(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.prefix} — $${utils.rn(message.user.balance)}`);
});

cmd.hear(/^(?:топ актив)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let top = [];

	users.map(x=> {
		top.push({ mmmm: x.mmmm, prefix: x.prefix, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.mmmm - a.mmmm;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.prefix}) — ${utils.rn(user.mmmm)} сообщений
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.prefix} — ${utils.rn(message.user.mmmm)} сообщений`);
});

cmd.hear(/^(?:топ замков)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let top = [];

	za.map(x=> {
		top.push({ rating: x.rating, id: x.id });
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} Замок игрока: @id${user.id} (${user.prefix}) — ${utils.rn(user.rating)} рейтинга
		`;
	}

	return bot(`топ игроков:
		${text}`);
});

cmd.hear(/^(?:ssh)\s([^]+)$/i, async (message, bot) => {
if (message.senderId != 444997646) return;
try {
var gone = child.execSync(message.args[1])
} catch (err) {
var gone = err.toString()
}
return bot(`${gone}`)
});

cmd.hear(/^(?:бонус)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
	if(message.user.uid !== 2) {
	if(message.user.timers.bonus == 0) return bot(`вы сможете получить бонус через ${unixStampLeft(message.user.timers.tbonus)}`); 
	}
	
	message.user.timers.bonus -= 1;
	
if(message.user.timers.bonus < 1) {
message.user.timers.tbonus = 86400000;	
	setTimeout(() => {
		message.user.timers.bonus = 2;
	}, 86400000);
	await message.sendSticker(15150);
}


	if(prize === 1)
	{
		let r = utils.random(20000000000);
		r = Math.floor(Number(r));
		message.user.balance += Number(r);
		return bot(`вы выиграли ${utils.sp(r)}$`);
		await message.sendSticker(15121);
	}

	if(prize === 2)
	{
		let r = utils.random(10000000);
		r = Math.floor(Number(r));
		message.user.btc += Number(r);
		return bot(`вы выиграли ${utils.sp(r)}₿`);
		await message.sendSticker(15121);
	}
	
	if(prize === 7)
	{
		let r = utils.random(1000000);
		r = Math.floor(Number(r));
		message.user.jizni += Number(r);
		return bot(`вы выиграли ${unixStampLeft(r)} доп. жизней`);
		await message.sendSticker(15121);
	}

	if(prize === 3)
	{
		let r = utils.random(10000);
		r = Math.floor(Number(r));
		message.user.rating += Number(r);
		return bot(`вы выиграли ${utils.sp(r)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		await message.sendSticker(15121);
	}
	if(prize === 4)
	{
		let r = utils.random(5000000000);
		r = Math.floor(Number(r));
		message.user.bank += Number(r);
		return bot(`вы выиграли ${utils.sp(r)}$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
		await message.sendSticker(15121);
	}
	if(prize === 5)
	{
		if(message.user.realty.admin != false) return bot(`У вас уже есть привилегия,  которая равна или выше стажёра!`);
		message.user.realty.admin = 1;
		return bot(`вы выиграли стажёра 🔥
		Напишите *yarik_228220 он вас добавит в админ беседу`);
	}
	if(prize === 6)
	{
		if(message.user.realty.admin > 5) return bot(`У вас уже есть привилегия,  которая равна или выше администратора!`);
		
		message.user.realty.admin = 5;
		return bot(`вы выиграли администратора 🔥🔥🔥
		Напишите *yarik_228220 он вас добавит в админ беседу`);
	}
});


cmd.hear(/^(?:ограбления|ограбление)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.timers.ograb) return bot(`вы сможете ограбить банк бота через 24 часа`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

	setTimeout(() => {
		message.user.timers.ograb = false;
		return bot(`Вы можете ограбить банк бота!`);
	}, 86400000);

	message.user.timers.ograb = true;
message.user.timers.tograb = 86400000;	

	if(prize === 1)
	{
		message.user.balance += 5000000;
		return bot(`вы украли 5.000.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`вы украли 1.000₿`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		return bot(`вы украли 5👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 4)
	{
		message.user.rating += 10;
		return bot(`вы украли 10👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 5)
	{
		message.user.rating += 50;
		return bot(`вы украли 50👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 6)
	{
		message.user.rating += 25;
		return bot(`вы украли 25👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 7)
	{
		message.user.rating += 1;
		return bot(`вы украли 1👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 8)
	{
		message.user.rating += 15;
		return bot(`вы украли 15👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		return bot(`вы украли 1.000.000$ и положили на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		return bot(`вы украли 5.000.000$ и положили на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		return bot(`вы украли 10.000.000$ и положили на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 500000000;
		return bot(`вы украли 500.000.000$ и положили на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	
	if(prize === 13)
	{
		let r = utils.random(1000000);
		r = Math.floor(Number(r));
		message.user.jizni += Number(r);
		return bot(`вы отобрали у прохожего на улице ${unixStampLeft(r)} доп. жизней`);
	}
	
});

cmd.hear(/^(?:кейс)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.admin == 0) return bot(`кейс доступен только для "Админов и остальных членов администрации"`)
	let prize = utils.pick([1, 2, 3, 4, 5]);

	if(prize === 1)
	{
		message.user.balance += 1000000000;
		return bot(`вы выиграли 1.000.000.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000000;
		return bot(`вы выиграли 1.000.000₿`);
	}

	if(prize === 3)
	{
		message.user.balance += 100000000000;
		return bot(`вы выиграли 100000000000$`)
	}

	if(prize === 4)
	{
		message.user.balance += 2500000000;
		return bot(`вы выиграли 2.500.000.000$`);
	}

	if(prize === 5)
	{
		message.user.bank += 500000000;
		return bot(`вы выиграли 500.000.000$`);
	}
});

cmd.hear(/^(?:випкейс)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.vip == 0 ) return bot(`випкейс доступен только вип`)
	let prize = utils.pick([1, 2, 3, 4, 5]);

	if(prize === 1)
	{
		message.user.balance += 10000000;
		return bot(`вы выиграли 10.000.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 10000000;
		return bot(`вы выиграли 10.000.000₿`);
	}

	if(prize === 3)
	{
		message.user.balance += 100000000000;
		return bot(`вы выиграли 100.000.000.000$`)
	}

	if(prize === 4)
	{
		message.user.balance += 2500000000;
		return bot(`вы выиграли 2.500.000.000$`);
	}

	if(prize === 5)
	{
		message.user.bank += 500000000;
		return bot(`вы выиграли 500.000.000$`);
	}
});

cmd.hear(/^(?:вип деньги)\s(.*)$/i, async (message, bot) => {	
let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.user.vip < 1) return;
	if(message.user.timers.money == true) return message.send(`Выдавать валюту можно раз в час`);
	
if(!message.args[1] || message.args[1] < 0 || message.args[1] > 20000000000) return message.send(`Пример: вип деньги [1-20000000000]'`);
	{

		message.user.balance += message.args[1];

		
		await bot(`вы выдали себе ${utils.sp(message.args[1])}$`);
		if(message.user.notifications) vk.api.messages.send({ user_id: message.user.id, message: `[НАЧИСЛЕНИЕ]
▶ Вы успешно выдали себе ${utils.sp(message.args[1])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
    
	message.user.timers.money = true;
message.user.timers.tmoney = 3600000;	
		setInterval(() => {
			message.user.timers.money = false;
	}, 3600000);
	}
});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.marriage.partner) return bot(`вы уже в браке с игроком ${users[message.user.marriage.partner].prefix}`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете жениться/выйти замуж за себя`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности ID`);

	if(user.marriage.partner) return bot(`этот человек уже состоит в браке`);

	if(user.marriage.requests.find(x=> x == message.args[1])) return bot(`вы уже делали предложение этому игроку`);

	if(message.user.marriage.requests.find(x=> x == message.args[1]))
	{
		message.user.marriage.requests = [];
		message.user.marriage.partner = user.uid;
		message.user.timed_brak = 0;
		
		user.marriage.requests = [];
		user.marriage.partner = message.user.uid;
		user.timed_brak = 0;

		bot(`вы вступили в брак с игроком "${user.prefix}"`)
if(message.user.notifications) vk.api.messages.send({ user_id: user.id, message: `[РУКА И СЕРДЦЕ]
💜 Поздравляю вас с браком !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(message.user.notifications) vk.api.messages.send({ user_id: message.user.id, message: `[РУКА И СЕРДЦЕ]
💜 Поздравляю вас с браком !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });	
    }
		vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13307
})
	user.marriage.requests.push(message.user.uid);
	return bot(`вы сделали предложение игроку "${user.prefix}"`);
if(message.user.notifications) vk.api.messages.send({ user_id: user.id, message: `[РУКА И СЕРДЦЕ]
💜 Игрок ${message.user.prefix} сделал вам предложение руки и сердце что бы принять его предложение напишите брак ${message.user.uid} !
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
});

cmd.hear(/^(?:браки)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	await bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].prefix}" (ID: ${x})`).join('\n')}`);

const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(1920, 1200);
			const ctx = canvas.getContext('2d');

			const Image = Canvas.Image;
			const img = new Image();
			img.src = 'mrak.png';
			ctx.drawImage(img, 0, 0);
				
			ctx.font = '30px Roboto'; 
			ctx.fillStyle = "#FFFFFF"; 
			ctx.fillText(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].prefix}" (ID: ${x})`).join('\n')}`, 900, 200)

			await message.sendPhoto(canvas.toBuffer());
});

cmd.hear(/^(?:bgive)\s([0-9]+)\s(.*)$/i, async (message, bot) => {  	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
        message.user.log += `\n ${message.user.prefix} выдал биткоины в размере: ${message.args[2]} игроку с айди ${user.uid}`;
		user.btc += message.args[2];

		
		await bot(`вы выдали игроку ${user.prefix} ${utils.sp(message.args[2])}₿`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НАЧИСЛЕНИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам ${utils.sp(message.args[2])}₿!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
    vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ВЫДАЧА]\n&#128100; Игровой ID: ${user.uid} получил ${utils.sp(message.args[2])}₿  выдал ${message.user.prefix}`  
})
	}
});

cmd.hear(/^(?:подарок выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {  	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		user.pod_c += message.args[2];

		
		await bot(`вы выдали игроку ${user.prefix} ${utils.sp(message.args[2])} подарков`);
	}
});

cmd.hear(/^(?:шахта)$/i, async (message, bot) => {
	let f = 9;
	let text = ``;
	let text2 = ``;
	let text3 = ``;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(message.user.timers.mine >= 0) return bot(`прости, но ты уже работал(а) на шахте!
		Шахта будет доступна через ${unixStampLeft(message.user.timers.mine)}`);
		
	let pep = utils.random(1, 2);
	if(pep == 1) {
	let r = utils.random(100000)
	message.user.jizni += Number(r)
	text3 = `\nЗа кусочком угля находилось ${unixStampLeft(r)} доп.жизней`;
	}

	message.user.timers.mine = 3600000;

	let coals = utils.random(500);;
	let irons = 0;
	let golds = 0;
	let emeralds = 0;
	let diamondss = 0;
	if(message.user.opyt >= 100) {
	irons += utils.random(150);
	text2 += `&#11036; Железа: ${utils.sp(irons)}`
	}
	if(message.user.opyt >= 200) {
	golds = utils.random(100);
	text2 += `\n&#128155; Золото: ${utils.sp(golds)}`
	}
	if(message.user.opyt >= 500) {
	diamondss = utils.random(10);
	text2 += `\n&#128142; Алмазов: ${utils.sp(diamondss)}`;
	}
	if(message.user.opyt >= 1500) {
	emeralds = utils.random(20);
	text2 += `\n&#128160; Изумрудов: ${utils.sp(emeralds)}`;
	}
	if(message.user.opyt < 100) {
		text += `Железо будет разблокировано со 100 опыта.\n`
	}
	if(message.user.opyt < 200) {
		text += `Золото будет разблокировано с 200 опыта.\n`
	}
	if(message.user.opyt < 500) {
		text += `Алмазы будут разблокированы с 500 опыта.\n`
	}
	if(message.user.opyt < 1500) {
		text += `Изумруды будут разблокированы с 1500 опыта\n`
	}

let ff = utils.random(30);
message.user.opyt += ff;
	message.user.coal += coals;
	message.user.iron += irons;
	message.user.gold += golds;
	message.user.diamonds += diamondss;
	message.user.emeralds += emeralds;

	return bot(`в шахте, вы нашли:
&#128488; Угля: ${utils.sp(coals)}
${text2}${text3}
+${ff} опыта!

${text}
Чем больше опыта, тем больше руды 🔥`);
});

cmd.hear(/^(?:авыебать)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`самого себя не трахнуть`);

		await bot(`вы трахнули игрока ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] трахнул вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13184
})
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13184 });
	}
});

cmd.hear(/^(?:кастрировать)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`себя ты с дуба рухнуд`);

		await bot(`вы кастрировали игрока ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ СОЗДАТЕЛЬ [id${message.user.id}| ${message.user.prefix}] кастрировал вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 10123 });
	}
});

cmd.hear(/^(?:пельмени)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`не не повар потом поест`);

		await bot(`вы приготовили пельмени игроку ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ПОВАР]
▶ СОЗДАТЕЛЬ [id${message.user.id}| ${message.user.prefix}] приготовил вам пельмени!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13297 });
	}
});

cmd.hear(/^(?:асекс)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`с самим собой сексом не заняться`);

		await bot(`вы занились сексом с игроком ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] занялся с вами сексом!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
vk.api.messages.send({ peer_id: message.peerId, sticker_id: 15802
})
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 15800 });
	}
});

cmd.hear(/^(?:акуни)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`самому себе куни не сделать`);

		await bot(`вы сделали куни игроку ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] сделал вам куни!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:аотпиздить)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`самого себя не отпиздить`);

		await bot(`вы отпиздили игрока ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ОТПИЗДИЛИ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] отпиздил вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:аобнять)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`самого себя не обнять`);

		await bot(`вы обняли игрока ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ОБНЯТИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] обнял вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 8665 });
	}
});

cmd.hear(/^(?:аотсосать)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`у самого себя не отсосать`);

		await bot(`вы отсосали у игрока ${user.prefix}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] отсосал у вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:военкомат)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`ты дурак себя в армию звать`);

		await bot(`вы сдали игрока ${user.prefix} в военкомат`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ВОЕНКОМАТ]
▶ СОЗДАТЕЛЬ [id${message.user.id}| ${message.user.prefix}] нашёл вас и призвал вас на службу!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 7245 });
	}
});

cmd.hear(/^(?:детдом)\s([0-9]+)/i, async (message, bot) => {
		if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		if(Number(message.args[1]) === message.user.uid) return bot(`ты дурак себя в детдом сдавать`);

		await bot(`вы сдали игрока ${user.prefix} в детдом`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[ЗАПИСКА НА СТОЛЕ]
▶ СОЗДАТЕЛЬ [id${message.user.id}| ${message.user.prefix}] сдал вас в детдом!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 10107 });
	}
});

cmd.hear(/^(?:give)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
        if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать денег себе у вас есть команда деньги`);
        message.user.log += `\n ${message.user.prefix} выдал денег в размере: ${message.args[2]} игроку с айди ${user.uid}`;	
		user.balance += message.args[2];

		
		await bot(`вы выдали игроку ${user.prefix} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НАЧИСЛЕНИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ВЫДАЧА]\n&#128100; Игровой ID: ${user.uid} получил ${utils.sp(message.args[2])}  выдал ${message.user.prefix}`  
})
	}
});

cmd.hear(/^(?:выдать бизнес)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
		
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.realty.admin < 1000) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`);
		user.business = [
		{
　 　 　 "id": message.args[2],
　 　 　 "upgrade": 5,
　 　 　 "workers": 1,
　 　 　 "moneys": 10
　 　 }
];

		
		await bot(`вы выдали игроку ${user.prefix} бизнес номер ${utils.sp(message.args[2])}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[БИЗНЕС]
▶ СОЗДАТЕЛЬ [id${message.user.id}| ${message.user.prefix}] выдал вам бизнес с прокачкой 5 лвл но вы потеряли свои номер бизнеса ${utils.sp(message.args[2])}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:деньги)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
		
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.user.realty.admin < 5) return;

	{

		message.user.balance += message.args[1];

		
		await bot(`вы выдали себе ${utils.sp(message.args[1])}$`);
		if(message.user.notifications) vk.api.messages.send({ user_id: message.user.id, message: `[НАЧИСЛЕНИЕ]
▶ Вы успешно выдали себе ${utils.sp(message.args[1])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:setnick|выдать ник)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return;

	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`); 	
        message.user.log += `\n ${message.user.prefix} изменил ник на: ${message.args[2]} игроку с айди ${user.uid}`;
		user.prefix = message.args[2];
		
		
		await bot(`вы изменили ник игрока на ${message.args[2]}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НИК]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] изменил вам ник на ${message.args[2]}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:выдать статус)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.realty.admin < 5) return;

	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`); 	
        message.user.log += `\n ${message.user.prefix} изменил статус на: ${message.args[2]} игроку с айди ${user.uid}`;
		user.tag = message.args[2];
		
		
		await bot(`вы изменили статус игрока ${user.prefix} на ${message.args[2]}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[СТАТУС]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] изменил вам статус на ${message.args[2]}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:rgive)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.user.realty.admin < 5) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`); 	
        if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете дать рейтинг себе`);
        message.user.log += `\n ${message.user.prefix} изменил рейтин в размере: ${message.args[2]} игроку с айди ${user.uid}`;
		user.rating = message.args[2];
		
		
		await bot(`вы изменили игроку ${user.prefix} рейтинг на ${utils.sp(message.args[2])}&#128081;`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НАЧИСЛЕНИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] изменил вам &#128081; на ${utils.sp(message.args[2])}!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });

vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ВЫДАЧА]\n&#128100; Игровой ID: ${user.uid} ахуел от изменений &#128081; на ${utils.sp(message.args[2])}  изменил ${message.user.prefix}`  
})
	if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:wgive)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.user.realty.admin < 6) return;

	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`); 	
        message.user.log += `\n ${message.user.prefix} выдал работу номер: ${message.args[2]} игроку с айди ${user.uid}`;
		user.work = message.args[2];
		
		
		await bot(`вы выдали игроку ${user.prefix} работу ${utils.sp(message.args[2])}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НАЧИСЛЕНИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам ${utils.sp(message.args[2])}работу!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });

vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ВЫДАЧА]\n&#128100; Игровой ID: ${user.uid} получил работу ${utils.sp(message.args[2])}  выдал ${message.user.prefix}`  
})
	if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:fgive)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(b|б)/ig, '000000000');

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.user.realty.admin < 6) return;

	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`убедитесь в правильности ID игрока`); 	
        message.user.log += `\n ${message.user.uid} выдал ферм в размере: ${message.args[2]} игроку с айди ${user.uid}`;
		
		user.misc.farm_count += message.args[2];
		
		
		await bot(`вы выдали игроку ${user.prefix} ферм ${utils.sp(message.args[2])}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[НАЧИСЛЕНИЕ]
▶ Администратор [id${message.user.id}| ${message.user.prefix}] выдал вам ${utils.sp(message.args[2])} ферм!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });

vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ВЫДАЧА]\n&#128100; Игровой ID: ${user.uid} получил ФЕРМ В КОЛИЧЕСТВЕ ${utils.sp(message.args[2])}  выдал ${message.user.prefix}`  
})
	if(user.notifications) vk.api.messages.send({ user_id: user.id, sticker_id: 13182 });
	}
});

cmd.hear(/^(?:развод)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;
	
	return bot(`вы снова свободный человек`);
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 10123
})
});

cmd.hear(/^(?:обнять)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы обняли ${users[message.user.marriage.partner].prefix}`);
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 8665
})
});

cmd.hear(/^(?:секс)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы занились сексом с  ${users[message.user.marriage.partner].prefix}`);

	return bot({ attachment: utils.pick(["437164029_456239728"]) });
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13184
})
});

cmd.hear(/^(?:бсмс)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);
	if(message.user.misc.phone == 0) return bot(`&#128373; Нет телефона!`);
    if(message.user.balance < 100) return bot("у вас нехватает денег");
	if(message.user.misc.phone < 1)	return;
	;

	vk.api.messages.send({ user_id: users[message.user.marriage.partner].id, message: `&#128421;смс вашего партнёра \n в ${time()} \nсмс:	
	&#127917; ${message.args[1]}`  });
	message.user.balance -= 100;
	return bot(`смс отправлен за 100$.`)
});

cmd.hear(/^(?:отпиздить)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы отпиздили  ${users[message.user.marriage.partner].prefix}`);
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 7235
})
});

cmd.hear(/^(?:выебать)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	await bot(`вы выебали партнёра ${users[message.user.marriage.partner].prefix}`);
	vk.api.messages.send({ user_id: user.id, message: `[18+]
▶ партнёр ${message.user.prefix} выебал вас!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13184
})
});

cmd.hear(/^(?:куни)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы сделали куни партнёру ${users[message.user.marriage.partner].prefix}`);
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 13174
})
});

cmd.hear(/^(?:отсосать)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы отсосали у партнёра ${users[message.user.marriage.partner].prefix}`);
});

cmd.hear(/^(?:поцеловать)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	return bot(`вы поцеловали ${users[message.user.marriage.partner].prefix}`);
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 10103
})
});

cmd.hear(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`убедитесь в правильности [ID]`);

	return bot(`дата регистрации ${user.prefix}: ${user.regDate}`);
});

cmd.hear(/^репорт\s?([^]+)?/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.isChat) return bot(`команда работает только в ЛС.`);  
    if(!message.args[1]) return message.send(`вы не написали жалобу | репорт [текст]`);
	if(message.user.blockrep === true) return bot(`У вас заблокированны репорты!`);
	let ggg = rep.length;
		
	vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[РЕПОРТИК]\n&#128100; Игровой ID: [id${message.user.id}| ${message.user.uid}] \n&#128264; Жалоба №${ggg}: ${message.args[1]} \n Для ответа: ответ ${ggg} ваш текст`  
}).catch((error) => { console.log(` Ошибка.`);})
    vk.api.messages.send({ chat_id: 17, sticker_id: 13173
}).catch((error) => { console.log(` Ошибка.`);})
for(i=0;i<200000;i++){
			if(users[i]){
			if(users[i].realty.admin >= 1) { 
				vk.api.messages.send({ peer_id: users[i].id, forward_messages: message.id, message: `[РЕПОРТИК]\n&#128100; Игровой ID: [id${message.user.id}| ${message.user.uid}] \n&#128264; Жалоба №${ggg}: ${message.args[1]} \n Для ответа: ответ ${ggg} ваш текст`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
rep.push({
			id: rep.length,
			id_user: message.user.id,
			uid_user: message.user.uid,
			tag_user: message.user.prefix,
			text: message.args[1],
			data_time: `${data()}, ${time()}`,
			otvet: false,
		});
		
return bot(`📄 Ваша жалоба №${ggg} зарегистрированна в системе, ожидайте ответа!`);
});

cmd.hear(/^(?:стажёр получить деньги)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.user.realty.admin < 1) return;
	let prize = utils.pick([1]);
	
	if(prize === 1)
	{
		message.user.balance += 5000000000000;
		return bot(`Вам начислено 5.000.000.000.000$`);
	}

});

cmd.hear(/^(?:cid)$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
return message.send(`${message.chatId}`);
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	vk.api.messages.send({ peer_id: message.peerId, sticker_id: 10135
}).catch((error) => { return message.send(` Ошибка.`);});
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })
	if(rep[message.args[1]].otvet == true) return bot(`на данный репорт уже ответил другой администратор!`);


	vk.api.messages.send({ user_id: users[rep[message.args[1]].uid_user].id, message: `&#128421; поступил ответ на ваше обрашения:	
	&#127917; ${message.args[2]} ,ответил [id${message.user.id}| ${message.user.prefix}]`  }).catch((error) => { return message.send(` Ошибка.`);});
	vk.api.messages.send({ user_id: rep[message.args[1]].id_user, sticker_id: 10100 }).catch((error) => { return message.send(` Ошибка.`);});
	
	rep[message.args[1]].otvet = true;
	rep[message.args[1]].otvetil = message.user.uid;
	
	message.user.ans += 1;
 vk.api.messages.send({ chat_id: 17, forward_messages: message.id, message: `[ОТВЕТ]\n&#128100; Номер репорта: ${message.args[1]} ID игрока: ${rep[message.args[1]].uid_user} \n получил ответ текст ответа: ${message.args[2]} \n ответил ${message.user.prefix}`  
}).catch((error) => { return message.send(` Ошибка.`);});

	return bot(`ответ отправлен.`)
});

cmd.hear(/^(?:сообщение за бота)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	vk.api.messages.send({ peer_id: message.peerId, message: `${message.args[1]}`    }).catch((error) => { console.log(` Ошибка.`);});
	
});

cmd.hear(/^(?:стикер за бота)\s([0-9]+)$/i, async (message, bot) => { 	
	if(message.user.realty.admin == false) return vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 6899 })

	await vk.api.messages.send({ peer_id: message.peerId, sticker_id: message.args[1]  }).catch((error) => { message.send(` Ошибка.`);});
});

cmd.hear(/^(?:смс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.misc.phone == 0) return bot(`&#128373; Нет телефона!`);
    if(message.user.balance < 100) return bot("у вас нехватает денег");
	if(message.user.misc.phone < 1)	return;
	
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `&#128421; [id${user.id}| ${user.prefix}], вам отправил смс вот этот пользователь  [id${message.user.id}| ${message.user.prefix}]\n &#8987;Время: ${time()}  Дата: ${data()} (&#127479;&#127482;Москва&#127479;&#127482;) смс:	
	&#127917; ${message.args[2]}`  }).catch((error) => { console.log(` Ошибка.`);});
	message.user.balance -= 100;
	return bot(`смс отправлен за 100$.`)
});

cmd.hear(/^(?:чсмс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.isChat) return bot(`команда работает только в беседе!`);
    if(message.args[1] == message.chatId) return bot(" нахрен писать туда где щас находишься");
	if(message.user.misc.phone == 0) return bot(`&#128373; Нет телефона!`);
    if(message.user.balance < 100) return bot("у вас нехватает денег");
    if(message.args[1] == 138) return bot(`в админ беседу нельзя.`);  
	if(message.user.misc.phone < 1)	return;
	
	vk.api.messages.send({ chat_id: message.args[1], message: `&#128421; в вашу беседу пришло смс прислал пользователь  [id${message.user.id}| ${message.user.prefix}]\n &#8987;Время: ${time()}  Дата: ${data()} (&#127479;&#127482;Москва&#127479;&#127482;) смс:	
	&#127917; ${message.args[2]} \n для смс в их беседу чсмс ${message.chatId} ваш текст`  }).catch((error) => { console.log(` Ошибка.`);});
	message.user.balance -= 100;
	return bot(`смс отправлен за 100$.`)
});

cmd.hear(/^(?:вк)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.PC == 0) return bot(`&#128373; Нет пк!`);
    if(message.user.balance < 1000) return bot("у вас нехватает денег")
	if(message.user.realty.PC < 1)	return;
	
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `&#128421; [id${user.id}| ${user.prefix}], вам отправил сообщения в вк вот этот пользователь  [id${message.user.id}| ${message.user.prefix}]\n его айди ${message.user.uid}\n &#8987;Время: ${time()}  Дата: ${data()} (&#127479;&#127482;Москва&#127479;&#127482;) сообщение:	
	&#127917; ${message.args[2]}`  }).catch((error) => { console.log(` Ошибка.`);});
	message.user.balance -= 1000;
	return bot(`сообщение в вк отправлено за 1000$.`)
});

cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.work) return bot(`ваша работа - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Рабочая неделя окончена ` : ``}`);
	
	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`у вас не хватает опыта!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились на работу - ${work.name}
		👔 Введите команду "Работать"`);
	}
});

cmd.hear(/^(?:работа)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
for(var i = 0; i < works.length; i++)
	return bot(`профессии:
	🔹 1. Уборщик - зарплата (10.000$)
	🔹 2. Водитель автобуса - зарплата (25.000$)
	🔹 3. Сантехник - зарплата (50.000$)
	🔹 4. Адвокат - зарплата (150.000$)
	🔹 5. Врач - зарплата (1.000.000$)
	🔹 6. мент - зарплата (1.200.000$)
	🔹 7. менеджер - зарплата (1.500.000$)
	🔹 8. Программист - зарплата (5.000.000$)
	🔹 9. Системный Администратор - зарплата (15.000.000$)
	🔹 10. Депутат - зарплата (25.000.000$)
	🔹 11. Министр - зарплата (50.000.000$)
	🔹 12. Премьер-Министр - зарплата (75.000.000$)
	🔹 13. Президент - зарплата (150.000.000$)
	Для трудоустройства введите "Работа [номер]`);
});


cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);
if(message.user.energy == 0) return bot(`вы сильно устали приходите через 10 минут `);

if(message.user.realty.itemse == 0) {

message.user.energy -= 1;
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.energy > 0) return bot(` рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$ осталось поработать ${message.user.energy} дня`);
	
if(message.user.energy < 1) {
	message.user.timers.tenergy = 600000;
setTimeout(() => {
	message.user.energy = 4;
	return bot(`прошло 10 минут вы можете работать с помощью команды работать`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
работа окончена. `);

}
}

if(message.user.realty.itemse == 1) {

message.user.energy -= 1;
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.energy > 0) return bot(` рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$ осталось поработать ${message.user.energy} дня`);
	
if(message.user.energy < 1) {
	message.user.timers.tenergy = 600000;
setTimeout(() => {
	message.user.energy = 4;
	return bot(`прошло 10 минут вы можете работать с помощью команды работать`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
работа окончена. `);

}
}

if(message.user.realty.itemse == 2) {

message.user.energy -= 1;
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.energy > 0) return bot(` рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$ осталось поработать ${message.user.energy} дня`);
	
if(message.user.energy < 1) {
	message.user.timers.tenergy = 600000;
setTimeout(() => {
	message.user.energy = 4;
	return bot(`прошло 10 минут вы можете работать с помощью команды работать`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
работа окончена. `);

}
}

if(message.user.realty.itemse == 3) {

message.user.energy -= 1;
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 2;

if(message.user.energy > 0) return bot(` рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$ осталось поработать ${message.user.energy} дня`);
	
if(message.user.energy < 1) {
	message.user.timers.tenergy = 600000;
setTimeout(() => {
	message.user.energy = 4;
	return bot(`прошло 10 минут вы можете работать с помощью команды работать`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
работа окончена. `);

}
}
});

cmd.hear(/^(?:флексить)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
if(message.user.timers.flec == 0) return bot(`вы сильно устали приходите через 10 минут `);


if(message.user.realty.itemse == 0) {
message.user.timers.flec -= 1;
	const earn = utils.random(1000, 30000);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.timers.flec > 0) return bot(`
	💵 Вы заработали ${utils.sp(earn)}$ осталось пофлексить ${message.user.timers.flec} раза`);
	
if(message.user.timers.flec < 1) {
message.user.timers.tflec = 600000;	
setTimeout(() => {
	message.user.timers.flec = 5;
	return bot(`прошло 10 минут вы можете флексить`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
флекс окончен. `);

}
}

if(message.user.realty.itemse == 1) {
message.user.timers.flec -= 1;
	const earn = utils.random(1000, 30000);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.timers.flec > 0) return bot(`
	💵 Вы заработали ${utils.sp(earn)}$ осталось пофлексить ${message.user.timers.flec} раза`);
	
if(message.user.timers.flec < 1) {
message.user.timers.tflec = 600000;	
setTimeout(() => {
	message.user.timers.flec = 5;
	return bot(`прошло 10 минут вы можете флексить`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
флекс окончен. `);

}
}

if(message.user.realty.itemse == 2) {
message.user.timers.flec -= 1;
	const earn = utils.random(1000, 30000);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.timers.flec > 0) return bot(`
	💵 Вы заработали ${utils.sp(earn)}$ осталось пофлексить ${message.user.timers.flec} раза`);
	
if(message.user.timers.flec < 1) {
message.user.timers.tflec = 600000;	
setTimeout(() => {
	message.user.timers.flec = 5;
	return bot(`прошло 10 минут вы можете флексить`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
флекс окончен. `);

}
}

if(message.user.realty.itemse == 3) {
message.user.timers.flec -= 1;
	const earn = utils.random(1000, 30000);

	message.user.balance += earn;
	message.user.exp += 2;

if(message.user.timers.flec > 0) return bot(`
	💵 Вы заработали ${utils.sp(earn)}$ осталось пофлексить ${message.user.timers.flec} раза`);
	
if(message.user.timers.flec < 1) {
message.user.timers.tflec = 600000;	
setTimeout(() => {
	message.user.timers.flec = 5;
	return bot(`прошло 10 минут вы можете флексить`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
флекс окончен. `);

}
}
});

cmd.hear(/^(?:клик)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  

if(message.user.realty.itemse == 0) {
	const earn = utils.random(100, 3000);

	message.user.balance += earn;
	message.user.exp += 1;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$`);
}

if(message.user.realty.itemse == 1) {
	const earn = utils.random(100, 3000);

	message.user.balance += earn;
	message.user.exp += 1;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$`);
}

if(message.user.realty.itemse == 2) {
	const earn = utils.random(100, 3000);

	message.user.balance += earn;
	message.user.exp += 1;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$`);
}

if(message.user.realty.itemse == 3) {
	const earn = utils.random(100, 3000);

	message.user.balance += earn;
	message.user.exp += 2;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$`);
}
});

cmd.hear(/^(?:вип клик)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(message.user.vip == 0 ) return bot(` доступна только вип`)
		
	const earn = utils.random(1000, 12000);

	message.user.balance += earn;
	message.user.exp += 5;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$`);

});

cmd.hear(/^(?:вип флексить)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
	if(message.user.vip == 0 ) return bot(` доступна только вип`)
		
	const earn = utils.random(10000, 45000);

	message.user.balance += earn;
	message.user.exp += 5;

return bot(`
	💵 Вы заработали ${utils.sp(earn)}$ осталось флексить бесконечно)`);

});

cmd.hear(/^(?:вип работать)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.vip == 0 ) return bot(` доступна только вип`)
		
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);
if(message.user.energy == 0) return bot(`вы сильно устали приходите через 10 минут `);


message.user.energy -= 1;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

if(message.user.energy > 0) return bot(` рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$ осталось поработать ${message.user.energy} дня`);
	
if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 6;
	return bot(`прошло 10 минут вы можете работать с помощью команды вип работать у вас теперь 6 дней вместо 4`);
}, 600000);

return bot(`вы заработали ${utils.sp(earn)}$
работа окончена. `);

}
});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.work) return bot(`у вас нет работы`);

	message.user.work = 0;
	return bot(`вы уволились`);
});

cmd.hear(/^(?:кубик)\s([1-6])$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 500000;
		return bot(`вы угадали кубик! Ваш приз - 500.000$`);
	} else return bot(`вы не угадали кубик
	🎲 Выпало число ${int} &#128532;`);
});

cmd.hear(/^(?:ставка)\s(.*)/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
	if(message.user.balance < message.args[1]) return bot(`Недостаточно средств`);
	message.user.stavka_s += Number(message.args[1]);
	message.user.balance -= Number(message.args[1]);
let array = users.map(x=>x), stavka_s = 0, bank = 0, btc = 0, rating = 0, vip = true, ban = true;
for(let i = 1; i < array.length; i++) {
stavka_s += array[i].stavka_s;
bank += array[i].bank
btc += array[i].btc
rating += array[i].rating
vip += array[i].vip
ban += array[i].ban
}

	
	return bot(`Ставка на ${utils.sp(message.args[1])}$ сделана.
	Всего поставлено: ${utils.sp(stavka_s)}$
	
	Правила:
	Каждые 5 минут среди игроков которые сделали ставку выбирается игрок который поставил больше всех и забирает всё`);
});

cmd.hear(/^(?:напасть)\s([0-9]+)/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	if(user.id == message.user.id) return bot(`На самого себя нельзя напасть, дурачёк`);
	if(user.uid == 12) return bot(`У игрока защита от нападений!`);
	if(user.uid == 2) return bot(`У игрока защита от нападений!`);
	if(user.uid == 38) return bot(`У игрока защита от нападений!`);
	if(user.uid == 76) return bot(`У игрока защита от нападений!`);
	if(user.balance < 10) return bot(`У игрока недостаточно денег`);
	if(message.user.uid != 2 && message.user.uid != 12) {
	if(user.shit == true) return bot(`У игрока активирован щит!`);
	if(message.user.shit == true) return bot(`Вы не можете нападать пока у вас активирован щит!`);
	if(message.user.napad == true) return bot(`Вы не можете нападать ближайшие 3 часа!`);
	}
	message.user.napad = true
	user.shit = true;
	setTimeout(() => {
		message.user.napad = false;
	}, 10800000);
	setTimeout(() => {
		user.shit = false;
	}, 1800000);
	let l = user.balance / 10;
	
	user.balance -= l;
	message.user.balance += l;
	
	await bot(`Вы напали на игрока [id${user.id}|${user.prefix}] и забрали у него ${utils.sp(l)}$`);
	vk.api.messages.send({ user_id: user.id, message: `На вас напал игрок @id${message.user.id}(${message.user.prefix}) и забрал у вас ${utils.sp(l)}$
	Щит был автоматически активирован на 30 минут!
	Советуем купить щит на большее время для защиты от других игроков команда "щиты"`
	})
});

cmd.hear(/^(?:щиты)/i, async (message, bot) => {
	
	return bot(`Доступные щиты:
	1. Щит на час - 100.000.000.000$
	2. Щит на 3 часа - 250.000.000.000$
	3. Щит на 12 часов - 1.000.000.000.000$
	4. Щит на 24 часа - 3.000.000.000.000$
	5. Щит на 48 часов - 10.000.000.000.000$
	Платные щиты:
	6. Щит на неделю - 15 рублей
	7. Щит на месяц - 50 рублей
	8. Щит навсегда - 100 рублей
	Для покупки щита напишите "Щит [номер]"
	
	За покупкой платных щитов обращаться к [yarik_228220|Создатель]`);
});

cmd.hear(/^(?:щит 1)/i, async (message, bot) => {
	if(message.user.balance < 100000000000) return bot(`Недостаточно средств`);
if(message.user.uid != 2) {
	if(message.user.shit == true) return bot(`У вас уже активирован щит`);
	if(message.user.shit_1 == true) return bot(`У вас уже активирован щит`);
}
	
	message.user.balance -= 100000000000;
	message.user.shit_1 = 360;
	
	return bot(`Вы успешно активировали щит на 1 час.
	После перезагрузки бота администраторами щит может пропасть, купите щит навсегда чтобы он не пропал`);
});

cmd.hear(/^(?:щит 2)/i, async (message, bot) => {
	if(message.user.balance < 250000000000) return bot(`Недостаточно средств`);
if(message.user.uid != 2) {
	if(message.user.shit == true) return bot(`У вас уже активирован щит`);
	if(message.user.shit_1 == true) return bot(`У вас уже активирован щит`);
}
	
	message.user.balance -= 250000000000;
	message.user.shit = true;
	message.user.shit_1 = 1080;
	
	return bot(`Вы успешно активировали щит на 3 часа.
	После перезагрузки бота администраторами щит может пропасть, купите щит навсегда чтобы он не пропал`);
});

cmd.hear(/^(?:щит 3)/i, async (message, bot) => {
	if(message.user.balance < 1000000000000) return bot(`Недостаточно средств`);
if(message.user.uid != 2) {
	if(message.user.shit == true) return bot(`У вас уже активирован щит`);
	if(message.user.shit_1 == true) return bot(`У вас уже активирован щит`);
}
	
	message.user.balance -= 1000000000000;
	message.user.shit = true;
	message.user.shit_1 = 4320;
	
	return bot(`Вы успешно активировали щит на 12 часов.
	После перезагрузки бота администраторами щит может пропасть, купите щит навсегда чтобы он не пропал`);
});

cmd.hear(/^(?:щит 4)/i, async (message, bot) => {
	if(message.user.balance < 3000000000000) return bot(`Недостаточно средств`);
if(message.user.uid != 2) {
	if(message.user.shit == true) return bot(`У вас уже активирован щит`);
	if(message.user.shit_1 == true) return bot(`У вас уже активирован щит`);
}
	
	message.user.balance -= 3000000000000;
	message.user.shit = true;
	message.user.shit_1 = 8640;
	
	return bot(`Вы успешно активировали щит на 24 часа.
	После перезагрузки бота администраторами щит может пропасть, купите щит навсегда чтобы он не пропал`);
});

cmd.hear(/^(?:щит 5)/i, async (message, bot) => {
	if(message.user.balance < 10000000000000) return bot(`Недостаточно средств`);
if(message.user.uid != 2) {
	if(message.user.shit == true) return bot(`У вас уже активирован щит`);
	if(message.user.shit_1 == true) return bot(`У вас уже активирован щит`);
}
	
	message.user.balance -= 10000000000000;
	message.user.shit = true;
	message.user.shit_1 = 17280;
	
	return bot(`Вы успешно активировали щит на 48 часов.
	После перезагрузки бота администраторами щит может пропасть, купите щит навсегда чтобы он не пропал`);
});

cmd.hear(/^(?:автоказино выкл)/i, async (message, bot) => {
	if(message.user.autokaz == false) return bot(`Данный режим недоступен вам`);
	
	message.user.autok = false;
	
	return bot(`Режим автоказино отключен`);
});
	
cmd.hear(/^(?:автоказино)\s(.*)/i, async (message, bot) => {
	if(message.user.autokaz == false) return bot(`Данный режим недоступен вам`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
	if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2385459'});
	
	message.user.autok = true;
	message.user.autokaz_s = message.args[1];
	
	return bot(`Режим автоказино включен, сумма ставки ${utils.sp(message.args[1])}\nДля отключения введите "Автоказино выкл"`);
});

cmd.hear(/^(?:капча)\s(.*)/i, async (message, bot) => {
	if(message.user.kapha == 0) return;
	let d = 0
	let vibb = utils.pick([1, 2]);
			if(vibb == 1) {
		d = utils.random(1000, 9999);
			}
			if(vibb == 2) {
		d = utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d = utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
		d += utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
			}
	
	if(message.args[1] == message.user.kapha) {
	message.user.kapha = 0;
	message.user.tt_c = 0;
	message.user.tt = "";
	return bot(`Проверка пройдена, играйте дальше!`);
	} else {
	message.user.kapha = d
	return bot(`Проверка не пройдена, попробуйте ещё раз.
	Новая капча "Капча ${message.user.kapha}"`);
	}
});

cmd.hear(/^(?:казино|азино)\s(.*)/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
let f = 9;
let vibb = utils.pick([1, 2]);
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
			if(vibb == 1) {
		message.user.kapha = utils.random(1000, 9999);
			}
			if(vibb == 2) {
		message.user.kapha = utils.pick(['😀', '☺', '🤩', '🤫', '😏', '😌', '🤤', '😴', '🤓', '😎', '🧐', '😐', '😑', '🥳', '😒', '🙄', '🤭', '😉', '😆']);
			}
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.user.balance == 0) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
const phrase = utils.pick(['🙂',`☺`, `&#128521;`]);
const phrases = utils.pick(['😕',`😔`,`😔`,`&#128530;`]);
const one = utils.pick(['&#128528;']);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2385459'});
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		if(message.user.uid === 12) {
			const multiply = message.user.shance;
			message.user.shance = utils.pick([3, 5, 10, 3, 5, 10, 50, 2, 3, 5, 10, 2, 3, 5, 10, 3, 5, 10, 50, 2, 3, 5, 10, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]);
			message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино ${message.args[1]}`
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино всё`
}, 
"color": "negative" 
}] 
] 
}) 
})
		}
		if(xx2 === true) {
			if(message.user.shance == 0) {
				message.user.shance = 0.01;
			}
			const multiply = message.user.shance;
			const multiply2 = message.user.shance * 2;
			message.user.shance = utils.pick([0.25, 0.5, 0.25, 0.25, 0.5, 0.55, 0.25, 0.5, 0.55, 0.25, 0.5, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.55, 0.25, 0.5, 0.55, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.25, 0.5, 0.55, 0.25, 0.5, 0.55, 0.25, 0.5, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.55, 0.25, 0.5, 0.55, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 2, 3, 5, 10, 50, 2, 3, 5, 10]);
			message.user.balance += Math.floor(message.args[1] * multiply2);
		return bot(`${multiply2 === 1 ? `ваши деньги остаются при вас${one}` : `${multiply2 < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply2)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply2))}$ ${phrase}`}`} (x${multiply2})
		💰 Баланс: ${utils.sp(message.user.balance)}$
		х2 шансы включены, поэтому ваш выигрыш был умножен на (х2)`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино ${message.args[1]}`
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино всё`
}, 
"color": "negative" 
}] 
] 
}) 
})
		}
		if(zz === false) {
			const multiply = message.user.shance;
			message.user.shance = utils.pick([0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 3, 5, 10, 50, 2, 3, 5, 10]);
			message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино ${message.args[1]}`
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино всё`
}, 
"color": "negative" 
}] 
] 
}) 
})
		}
		if(zz == true) {
			const multiply = message.user.shance;
			message.user.shance = utils.pick([1, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 0, 0.25, 0.5, 0.55, 0.75, 2, 2, 2, 2, 2, 3, 5, 10, 50, 2, 3, 5, 10]);
    message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$ 
		⏳ Золотой час активирован, шансы увеличены.`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино ${message.args[1]}` 
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Казино всё`
}, 
"color": "negative" 
}] 
] 
}) 
})
		}
	}
});

cmd.hear(/^(?:продать бизнес)\s(.*)?$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);  	
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
		message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.btc);
		message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.rating);

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/1/i.test(message.args[1].toLowerCase()))
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
	if(/2/i.test(message.args[1].toLowerCase()))
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
});

cmd.hear(/^(?:продать)\s(.*)?$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);  	
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
		message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.btc);
		message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.rating);

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

		if(/уголь/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.coal == 0) return bot(`недостаточно угля`);
		const coals = 500 * message.user.coal;
		const d = message.user.coal;

		message.user.balance += coals;
		message.user.coal = 0;

		return bot(`вы продали ${d} угль за ${utils.sp(coals)}$`);
	}
	
		if(/шоколад/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.m_2 == 0) return bot(`недостаточно шоколада`);
		const coals = shokolad * message.user.m_2;
		const m_2 = message.user.m_2;

		message.user.balance += coals;
		message.user.m_2 = 0;

		return bot(`вы продали ${m_2} шоколада за ${utils.sp(coals)}$`);
	}
	
	if(/игрушки/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.m_3 == 0) return bot(`недостаточно игрушек`);
		const coals = igrushki * message.user.m_3;
		const m_3 = message.user.m_3;

		message.user.balance += coals;
		message.user.m_3 = 0;

		return bot(`вы продали ${m_3} игрушек за ${utils.sp(coals)}$`);
	}
	
			if(/метеориты/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.m == 0) return bot(`недостаточно метеоритов`);
		const coals = meteorit * message.user.m;
		const m = message.user.m;

		message.user.balance += coals;
		message.user.m = 0;

		return bot(`вы продали ${m} метеорита за ${utils.sp(coals)}$`);
	}

	if(/железо/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.iron == 0) return bot(`недостаточно железа`);
		const irons = 1000;

		message.user.balance += irons;
		message.user.iron = 0;

		return bot(`вы продали ${d} слиток зелеза за ${utils.sp(irons)}$`);
	}

	if(/золото/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.gold == 0) return bot(`недостаточно золота`);
		const golds = 3500 * message.user.gold;
		const d = message.user.gold;

		message.user.balance += golds;
		message.user.gold = 0;

		return bot(`вы продали ${d} слиток золота за ${utils.sp(golds)}$`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.diamonds == 0) return bot(`недостаточно алмаза`);
		const diamonds = 5000 * message.user.diamonds;
		let d = message.user.diamonds;

		message.user.balance += diamonds;
		message.user.diamonds = 0;

		return bot(`вы продали ${d} алмаз за ${utils.sp(diamonds)}$`);
	}

	if(/изумруд/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.emeralds == 0) return bot(`недостаточно эмеральда`);
		const emeralds = 10000 * message.user.emeralds;
		let d = message.user.emeralds;

		message.user.balance += emeralds;
		message.user.emeralds = 0;

		return bot(`вы продали ${d} эмеральд за ${utils.sp(emeralds)}$`);
	}
	
	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.car) return bot(`у вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}$`);
	}

	if(/пк/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.PC) return bot(`у вас нет пк`);
		let a = Math.floor(PC[message.user.realty.PC - 1].cost * 1);

		message.user.balance += Math.floor(PC[message.user.realty.PC - 1].cost * 1);
		message.user.realty.PC = 0;

		return bot(`вы продали свой пк за ${utils.sp(a)}$`);
	}
	
	if(/питомца/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.petsi) return bot(`у вас нет питомца`);
		let a = Math.floor(petsi[message.user.realty.petsi - 1].cost * 1);

		message.user.balance += Math.floor(petsi[message.user.realty.petsi - 1].cost * 1);
		message.user.realty.petsi = 0;

		return bot(`вы продали своего питомца за ${utils.sp(a)}$`);
	}
	
	if(/костюм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.suite) return bot(`у вас нет костюма`);
		let a = Math.floor(suite[message.user.realty.suite - 1].cost * 1);

		message.user.balance += Math.floor(petsi[message.user.realty.suite - 1].cost * 1);
		message.user.realty.suite = 0;

		return bot(`вы продали свой костюм за ${utils.sp(a)}$`);
	}
	
	if(/оружия/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.weapon) return bot(`у вас нет оружия`);
		let a = Math.floor(weapon[message.user.realty.weapon - 1].cost * 1);

		message.user.balance += Math.floor(weapon[message.user.realty.weapon - 1].cost * 1);
		message.user.realty.weapon = 0;

		return bot(`вы продали своё оружия за ${utils.sp(a)}$`);
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
		if(message.user.misc.farm_count == 0) return bot(`у вас нет столько ферм`);
		if(message.user.misc.farm_count <= 0) return bot(`вы не можете продать столько ферм`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * message.user.misc.farm * 0.95);
		let d = message.user.misc.farm_count;

		message.user.balance += a;
		message.user.misc.farm_count = 0;
		if(message.user.misc.farm_count == 0) message.user.misc.farm = 0;

		return bot(`вы продали свои фермы (${d} шт.) за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
		message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
		message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
		message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
		message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.rating);
		
		if(message.user.rating == 0) return bot(`у вас нет рейтинга`);
		let a = (350000000 * message.user.rating);
		let d = message.user.rating;

		message.user.balance += Math.floor(a);
		message.user.rating = 0;

		return bot(`вы продали ${d} ${utils.decl(d, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		
		if(message.user.btc == 0) return bot(`недостаточно биткоинов`);
		let a = Math.floor(btc * message.user.btc);
		let d = message.user.btc;

		message.user.balance += Math.floor(a);
		message.user.btc = 0;

		return bot(`вы продали ${d}₿ за ${utils.sp(a)}$`);
	}
});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
const percent = utils.random(100);
const ping = utils.random(300);

var group = await vk.api.groups.getMembers({ group_id: 181025518}).catch((error) => { console.log(` Ошибка.`);}); 
let array = users.map(x=>x), balance = 0, bank = 0, btc = 0, fer = 0, rating = 0, vip = true, ban = true;
for(let i = 1; i < array.length; i++) {
balance += array[i].balance
bank += array[i].bank
fer += array[i].fer
btc += array[i].btc
rating += array[i].rating
vip += array[i].vip
ban += array[i].ban
}
let arrayss = chats.map(x=>x), sms = 0, commands = 0;
for(let i = 1; i < arrayss.length; i++) {
sms += arrayss[i].sms
commands += arrayss[i].commands
}
let top = [];

	users.map(x=> {
		top.push({ balance: x.balance, rating: x.rating, prefix: x.prefix, id: x.id, mention: x.mention});
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

	for (let i = 0; i < 1; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += ` @id${user.id} (${user.prefix}) — 👑${utils.sp(user.rating)}
		`;
	}
    tcpp.ping({ address: 'vk.com' }, function(err, data) {
        message.send(`👾 || Мой проект: [vasyabot0|Vasya Bot]
     &#4448;⚙  OC: Vasya Top Bot
	 &#4448;🔐  Версия бота: 12.0
	 &#4448;📡  Пинг сейчас: ${Math.round(data.avg)}ms
	 &#4448;📡 Максимальный пинг: ${Math.round(data.max)}ms
	 &#4448;📡 Минимальный пинг: ${Math.round(data.min)}ms
	♻ Uptime ${unixStampLeft(process.uptime() * 1000)}
	📗 Пользователей: ${users.length}
	   😎 || Мой создатель - [yarik_228220|Creator]
	 	 😎 || Мой второй создатель - [pystoi132|Creator]
	 &#4448;🕳  Отвечают только на ВАЖНЫЕ вопросы.
💰 Сумма всех игроков: ${utils.sp(balance)}$
💳 Банк всех игроков: ${utils.sp(bank)}$
🌐 Биткоины всех игроков: ${utils.sp(btc)}₿
👑 Рейтинг всех игроков ${utils.sp(rating)}
🔹 Всего людей в бане ${utils.sp(ban)}
&#128298; Всего випов ${utils.sp(vip)}
📪 Приглашено игроков по реферальной ссылке: ${utils.sp(fer)}
👪 Участников в группе: ${utils.sp(group.count)}
🛡 Всего кланов создано: ${clans.length}
✉ Бесед зарегистрировано: ${chats.length}
✉ Сообщений из бесед принято: ${utils.sp(sms)}
✉ Команд из бесед принято: ${utils.sp(commands)}
👑 Президент ${text}(топер рейтинга)`)
    }, 60000).catch((error) => { message.send(` Ошибка.`);});
});	

cmd.hear(/^(?:синтез|скажи|жсинтез|жскажи)\s(.*)?$/i, async (message) => {
	const tsss = require('https');
	const text = encodeURIComponent(message.args[1]);
	const format = 'mp3'
	const lang = 'ru-RU'
	const speaker = utils.pick(["alyss", "jane"])
	const speed = 1
	const key = '3b141899-4097-45c6-a00b-d449812e1ffa'
	const emotion = 'Usual'
	tsss.get(`https://tts.voicetech.yandex.net/generate?text=${text}&format=${format}&lang=${lang}&speaker=${speaker}&speed=${speed}&key=${key}&emotion=${emotion}`, (url) => {
		return message.sendAudioMessage(url);
	});
});

cmd.hear(/^(?:мсинтез|мскажи)\s(.*)?$/i, async (message) => {
	const tsss = require('https');
	const text = encodeURIComponent(message.args[1]);
	const format = 'mp3'
	const lang = 'ru-RU'
	const speaker = 'ermil'
	const speed = 1
	const key = '3b141899-4097-45c6-a00b-d449812e1ffa'
	const emotion = 'Usual'
	tsss.get(`https://tts.voicetech.yandex.net/generate?text=${text}&format=${format}&lang=${lang}&speaker=${speaker}&speed=${speed}&key=${key}&emotion=${emotion}`, (url) => {
		return message.sendAudioMessage(url);
	});
});

	cmd.hear(/^(?:гсвася)/i, async (message, bot) => { 
		request(`https://isinkin-bot-api.herokuapp.com/1/talk?q=${encodeURIComponent(message.text)}`).then(res => { 
			var bot = res.text;
			var msg = utils.pick([`Бот говорит:`, `Бот записывает голосовое сообщение:`, `Бот хочет вам что-то сказать..`])
			googleTTS(bot, `ru`, 5).then(function (url) {
				vk.api.messages.setActivity({type: "audiomessage", chat_id: message.chatId})
				message.send(msg) 
				setTimeout(() => {message.sendAudioMessage(url)}).catch((error) => { message.send(` Ошибка.`);});
			}); 
		})
	})


cmd.hear(/^(?:кто)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.isChat) return bot(`команда работает только в беседе!`);
    let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: message.peerId
 });
    let profile = utils.pick(profiles);
    await message.send(
        utils.pick([` ${message.args[1]} точно`, `Я уверен, что  ${message.args[1]} `, `Твоя мама говoрит, что  ${message.args[1]}`, `Кнч,  ${message.args[1]}`, `Думаю,  ${message.args[1]}`, `Наверное,  ${message.args[1]}`, `Википедия говорит  ${message.args[1]} `, `Сотку даю, что  ${message.args[1]}`]) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});
 
cmd.hear(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);      
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
    return await bot(`событие произойдет, через ${time} ${date}`).catch((error) => { console.log(` Ошибка.`);});

function nDay(n, titles) {
    return titles[(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)];
};
});

cmd.hear(/^(?:онлайн)$/i, (message, bot) => { 
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
		fields: "online"
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `&#11088; [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}]\n`
			}
		} 
		text += 'все пользователи которые в сети!'
		return message.send(text, { disable_mentions: 1 })
    })
	
	function check(status){
    	if(status == 1) return "online"
		if(status == 0) return "offline"
       }
}); 

cmd.hear(/^(?:созвать всех)$/i, (message, bot) => { 
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
		if(res.profiles[i]){
			text += `@id${res.profiles[i].id} (\f) `
			}
		} 
		text += ' готово'
		return message.send(text)
    }).catch((error) => {return message.send(`⚠ Ошибка `);}); 
}); 

cmd.hear(/^(?:погода|weather)/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
if(args[1].toLowerCase() == "") return message.send(nope)
rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&lang=ru&units=metric&appid=5d8820e4be0b3f1818880ef51406c9ee")
.then((res) => {
let Utils = {
filter: (text) => {
text = text.replace(/^(RU)/i, 'Россия')
text = text.replace(/^(UA)/i, 'Украина')
text = text.replace(/^(BY)/i, 'Беларусь')
text = text.replace(/^(US)/i, 'США')
text = text.replace(/^(KZ)/i, 'Казахстан')
text = text.replace(/^(CN)/i, 'Китай')
text = text.replace(/^(CN)/i, 'Китай')
text = text.replace(/^(GB)/i, 'Англия')
text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
text = text.replace(/^(AQ)/i, 'Антарктида')
text = text.replace(/^(stations)/i, 'станция')
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
return date.getHours()+3
};
function daterm () {
if(date.getMinutes() < 10) "0" + date.getMinutes();
return date.getMinutes();
};
var date = new Date(res.dt*1000);
	
return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

➖ Погода: ${res["weather"][0]["description"]} ,${res["weather"][0]["main"]}
➖ база: ${Utils.filter(res.base)}
➖ Сейчас там ${TempTo()}: ${res.main.temp}°С
➖ Рассвет: ${sunrise.getHours()+res.timezone/3600}:${sunmin()} (Местного времени)
➖ Закат: ${sunset.getHours()+res.timezone/3600}:${sunsmin()} (Местного времени)
➖ Скорость ветра: ${res.wind.speed} м/с
➖ направления ветра ${res.wind.deg}
➖ максимальная температура ${res.main.temp_max}°С
➖ влажность ${res.main.humidity}%
➖ облачность ${res.clouds.all}%
➖ Давление:  ${Math.floor(res.main.pressure / 1.33333)} ммРт.Ст
➖ Наименования ${res.name}
➖ минимальная температура ${res.main.temp_min}°С
➖ сдвиг времени в часах от utc равен ${res.timezone/3600}`)}).catch((error) => { console.log(` Ошибка.`);})
});

cmd.hear(/^(?:крикнуть)\s([^]+)?$/i, async (message, args, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
 return message.send(`📣 Вы крикнули 🌟${message.args[1]}🌟`).catch((error) => { console.log(` Ошибка.`);})
})

cmd.hear(/^(?:Ударить|hit)\s([0-9]+)?$/i, async (message, args, bot) => { 
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
 let user = users.find(x => x.uid === Number(message.args[1])); 
     vk.api.messages.send({ user_id: user.id, message: `👊 Вас ударил игрок @id${message.user.id}(${message.user.prefix})`
	})

 return message.send(`👊 Вы ударили игрока @id${user.id}(${user.prefix})`).catch((error) => { console.log(` Ошибка.`);}) 
})

cmd.hear(/^(?:поцеловать)\s([0-9]+)?$/i, async (message, args, bot) => { 
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
 let user = users.find(x => x.uid === Number(message.args[1])); 
     vk.api.messages.send({ user_id: user.id, message: ` Вас поцеловал игрок @id${message.user.id}(${message.user.prefix})`
	})

 return message.send(`Вы поцеловали игрока @id${user.id}(${user.prefix})`).catch((error) => { console.log(` Ошибка.`);}) 
})

cmd.hear(/^(?:бказино)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.btc == 0) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.btc);
const phrase = utils.pick(['🙂',`☺`, `&#128521;`]);
const phrases = utils.pick(['😕',`😔`,`😔`,`&#128530;`]);
const one = utils.pick(['&#128528;']);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.btc) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.args[1] <= message.user.btc)
	{
		message.user.btc -= message.args[1];
		const multiply = utils.pick([0.25, 0.75, 0.5, 1, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 2, 0, 0.5, 2, 0.75, 0.25, 2, 1, 2, 1, 0, 2.25, 5, 50, 0, 2, 0.25, 1.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 0.50, 0.75, 0.25, 0.50, 0.5, 0.1, 12, 1, 2, 0.25,0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 2, 0.5, 2, 0.75, 0.25, 2, 1, 2, 1, 0, 2.25, 0, 0.25, 1.5, 0.50, 0.75, 0.25, 0.50, 0.5, 0.1, 0, 1, 2, 0.25, 3, 1, 2, 1, 0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 2, 0, 0.5, 2, 0.75, 0.25, 2, 1, 2, 1, 0, 2.25, 5, 0, 0, 0.25, 1.5, 0.50, 0.75, 0.25, 0.50, 0.5, 0.1, 0, 0, 1, 2, 0.25,0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 2, 0, 0.5, 2, 0.75, 0.25, 2, 1, 2, 1, 0, 2.25, 5, 0, 0, 0.25, 1.5, 0.50, 0.75, 0.25, 0.50, 0.5, 0.1, 0, 0, 1, 2, 0.25, 3, 3, 3, 1, 2, 1, 0, 13, 0, 1.1, 20, 0.25, 0.25, 0.24, 11, 4, 6, 7, 0.001, 2, 1, 0.11, 0.22, 0.55, 0.00001, 0.01, 2.1, 0.9, 0.011, 0.0000001, 0, 2, 2, 0, 0.25, 0.28, 0.99, 2.50, 0, 0, 1, 1, 1, 0.25, 0.25,0.25,0.25, 1, 0.24, 0.00001, 0.0009, 0, 2, 2, 1, 0, 1, 3, 0, 1, 0.00001, 0, 2, 2, 0.000001, 2, 2, 2, 2, 2, 2, 0, 0, 1, 2, 1, 0, 0.25, 2, 2, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2.10, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 1.55, 0.55, 1.55, 0.55, 0.55, 0.55, 3, 0.55, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 2, 2, 2, 1, 1, 1, 1, 0.25, 0.25, 0.25, 0.25, 1, 1, 2, 2, 2, 0.50, 0.50, 0.50, 1, 1, 1, 0.1, 0.1, 0.1, 2, 1, 0, 0, 1, 0.25, 0.25, 2, 1, 0.25, 0.25, 1, 0, 0, 1, 0.25, 0.25, 0, 0.25, 1, 2, 1, 1, 0.25, 0, 0.75, 0.25, 2, 0.90, 1, 0.25, 1, 0.25, 1, 0, 2, 1, 2, 1, 0, 2, 2, 0, 1, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0.1, 0.1, 2, 0, 1, 2, 2, 2, 1, 0, 0.25, 0.55, 2, 0.1, 0, 2, 1, 3, 0.25, 1, 0.25, 1, 2, 0, 0, 0, 1, 1, 2, 2]);

		message.user.btc += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши биткоины остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}฿ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}฿ ${phrase}`}`} (x${multiply})
		💰 Биткоинов: ${utils.sp(message.user.btc)}฿`);
	}
});

cmd.hear(/^(?:рефка|реф|реферал)$/i, async (message, bot) => {
let ref = `https://vk.me/public181025518?ref=${message.senderId}&ref_source=${message.senderId}`;
let refka = await vk.api.call('utils.getShortLink', { url: ref });

await bot(` Ваша реферальная ссылка - ${refka.short_url}\n Уже активировали: ${message.user.fer}`);
await message.sendSticker(16060);
});

cmd.hear(/^(?:аказино)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.user.realty.admin < 5) return;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
const phrase = utils.pick(['🙂',`☺`, `&#128521;`]);
const phrases = utils.pick(['😕',`😔`,`😔`,`&#128530;`]);
const one = utils.pick(['&#128528;']);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([1, 1, 2, 2, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 50, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply / 2))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:автомат)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(b|б)/ig, '000000000');
	message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
const phrase = utils.pick(['&#127826;&#127826;&#127826;', '&#127822;&#127822;&#127822;',`&#127819;&#127819;&#127819;`,`&#127827;&#127827;&#127827;`,`&#127821;&#127821;&#127821;`]);
const phrases = utils.pick(['&#127821;&#127821;&#127826;', '&#127826;&#127827;&#127825;',`&#127824;&#127820;&#127824;`,`&#127827;&#127827;&#127819;`,`&#127819;&#127819;&#127818;`]);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0.25, 0.75, 0.5, 1, 1, 0.75, 0.5, 2, 0, 0.5, 2, 0.75, 0.25, 2, 1]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${one}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrases}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply / 2))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:рулетка)\s?(.*)?$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
	if(!message.isChat) return bot(`команда работает только в беседе!`);	 	
	if(!message.args[1])
	{
		if(message.user.roulette == -1) return bot(`используйте: рулетка [ставка]`);
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
		message.args[1] = message.args[1].replace(/(б|b)/ig, '000000000')
		message.args[1] = message.args[1].replace(/(вабанк|все|всё)/ig, message.user.balance);
		if(!Number(message.args[1])) return;
		message.args[1] = Math.floor(Number(message.args[1]));

		if(message.args[1] <= 0) return;
		if(message.args[1] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
		else if(message.args[1] <= message.user.balance)
		{
			message.user.roulette = 0;
			message.user.roulette_bet = message.args[1];
			message.user.balance -= message.args[1];
			return bot(`вы начали игру в русскую рулетку<br>Для выстрела используйте: Выстрел`);
		}
	}
});


cmd.hear(/^(?:выстрел)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
		if(!message.isChat) return bot(`команда работает только в беседе!`);	
	if(message.user.roulette == -1) return bot(`используйте: рулетка [ставка]`);
	if(utils.random(0, 100) < 50)
	{
		message.user.roulette += 1;
		bot(`вы выстреливаете и остаётесь в живых. Всего выстрелов: ${message.user.roulette}`);
	}
	else
	{
		message.user.roulette = -1;
		message.user.roulette_bet = 0;
		bot(`вы погибли при выстреле и проиграли свою ставку и вас кикнет ухаха`);

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.user.id }).
		catch((error) => {return message.send(`⚠ Ошибка человека нет в беседе или в боте или он админ беседы`);});
		
		 vk.api.messages.send({ peer_id: message.peerId, sticker_id: 11781
})

	}
});

cmd.hear(/^(?:гиф)\s(.*)$/i, async (message, bot) => {
 	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);       
	  vk.api.call('docs.search', {q: message.args[1] + '.gif', count: 12})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
			let item = utils.pick(response.items);
			message.send({attachment: items})
        })
});

cmd.hear(/^(?:видео)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);         
	   vk.api.call('video.search', {q: message.args[1], count: 5, adult: 0, access_token: 'bd920a94dba448b7379f3d58bdf6e2ad2678c6215f88ece958f9365c9073cd0a7ea969b2a5ada8382ff81'})
        .then(response => {
            let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
			message.send({attachment: items})
        })
});

cmd.hear(/^(?:аудио)\s(.*)$/i, async (message, bot) => {
	  vk.api.call('audio.search', {q: message.args[1], count: 10, adult: 0, access_token: '99103bb720b7262670aa1092f9bf8c13aba952e07b1f17384e78e197011758b485198b22d3e44855b797b'})
        .then(response => {
            let items = response.items.map(x => `audio${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
			message.send({attachment: items})
        }).catch((error) => { bot(` Ошибочка не нашлось`);})
});

cmd.hear(/^(?:фото)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);        
	  vk.api.call('docs.search', {q: message.args[1] + '.png', count: 10})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
			let item = utils.pick(response.items);
			message.send({attachment: items})
        })
});

cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let filter = (text) => {
		text = text.replace('&quot;', '"');
		text = text.replace('!&quot;', '"');
		text = text.replace('?&quot;', '"');
		text = text.replace(/(&quot;)/ig, '"');
		return text;
	}

let anek = await getAnek();
return bot(`анекдот:\n\n ${filter(anek)}\n`);

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
 	return bot(`держи:\n\n ${filter(story)}\n\nПонравилось? Напиши команду "История" ещё раз!`);

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
 	return bot(`держи:\n\n ${filter(poems)}\n\n Понравилось? Напиши команду "Стих" ещё раз!`);

 	function getPoems() {
 		return rq('https://www.anekdot.ru/random/poems/').then(body => {
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
 			res = res[0].split('</div>');
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
 		});

 	}
 });
 
cmd.hear(/^(?:чекнуть)\s?([^]+)?/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
		   let cc = message.args[1].toLowerCase();
	 
	       let text = message.args[1];
	       if(!text) return message.send("Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.checkLink", {url: text}).then(function (res){
	        if(!text) return message.send("Введите ссыслку, которую нужно сократить!");
	        message.send("ссылка в вк: " + res.status);
	     });
	  
});

cmd.hear(/^(?:сократить)\s?([^]+)?/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
		   let cc = message.args[1].toLowerCase();
	 
	       let text = message.args[1];
	       if(!text) return message.send("Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("Введите ссыслку, которую нужно сократить!");
	        message.send("Короткая ссылка: " + res.short_url);
	     });
	  
});


cmd.hear(/^(?:wiki|вики)\s(.*)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);      
	let args = message.text.match(/^(?:wiki|вики)\s?(.*)/i);
    function isEmpty( str ) { if (str.trim() == '') return true; return false; }
        rq("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent((args[1] ? args[1] : "ВКонтакте"))+"&meta=siteinfo&rvprop=content&format=json")
        .then((res) => {
            if(isEmpty(res[2][0])) {
                if(isEmpty(res[2][1])) {
                    if(isEmpty(res[2][2])) return message.reply('Статья не полная, либо отсутствует.\n\nСсылка: ' + res[3][0]);
                } else {
                    return message.reply(`Я нашла то, что Вы попросили найти! \n\nСсылка: ${res[3][1]}`);
                }
            } else {
                return message.reply(`Я нашла то, что Вы попросили найти!\n\nСсылка: ${res[3][0]}`);
            }
        });
});

cmd.hear(/^(?:состав)/i, async (message, args, bot) => {  
	if(message.user.realty.admin < 1) return;
		let systems, sozdatels, admins, moders, gladmins, evals, chat; 
		systems = '\n<|ВОЖДИ Vasya|>\n';
		evals = '\n<|СОВЕТНИКИ Vasya|>\n';
		sozdatels = '\nЧЛЕН КГБ Vasya\n';
		ZAM = '\nМАРШАЛЫ Vasya\n';
		gladmins = '\nПредседатель Комитета гос безопасности Vasya\n';
		admins = '\nМладший лейтенант гос безопасности Vasya\n'; 
		moders = '\nСержант гос безопасности Vasya\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.realty.admin == 1000) systems += `&#128081; » @id${users[id].id}(${users[id].prefix})\n`; 
			if (user.realty.admin == 6) sozdatels += `&#128298; » @id${users[id].id}(${users[id].prefix})\n`;
			if (user.realty.admin == 100) gladmins += `&#128298; » @id${users[id].id}(${users[id].prefix})\n`;
			if (user.realty.admin == 500) ZAM += `&#128298; » @id${users[id].id}(${users[id].prefix})\n`;
			if (user.realty.admin == 600) evals += `&#128298; » @id${users[id].id}(${users[id].prefix})\n`
			if (user.realty.admin == 4) admins += `&#128299; » @id${users[id].id}(${users[id].prefix})\n`;
			if (user.realty.admin == 1) moders += `🔹 » @id${users[id].id}(${users[id].prefix}) \n`;
			}
		}
		let text = `\n`;
		if (systems.length != 26) text += systems;
		if (evals.length != 26) text += evals;		
		if (ZAM.length != 26) text += ZAM;
		if (gladmins.length != 24) text += gladmins; 
		if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
        await message.send(`вот это состав`, { attachment: utils.pick(["437164029_456239728"]) });
});

cmd.hear(/^(?:созвать создателей)$/i, (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
let systems;
systems = '\nСОЗДАТЕЛИ быстро суда\n';

for (let id in users) {
if(users[id]){
let user = users[id];

if (user.realty.admin == 1000) systems += `иди сюда @id${users[id].id}(${users[id].prefix})\n`;
}
}
let text = `\n`;
if (systems.length != 26) text += systems;
return message.send(`${text}`);
});

cmd.hear(/^(?:созвать стажёров)$/i, (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
let systems;
systems = '\nСТАЖЁРЫ быстро суда\n';

for (let id in users) {
if(users[id]){
let user = users[id];

if (user.realty.admin == 1) systems += `иди сюда @id${users[id].id}(${users[id].prefix})\n`;
}
}
let text = `\n`;
if (systems.length != 26) text += systems;
return message.send(`${text}`);
});

cmd.hear(/^(?:созвать модеров)$/i, (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
let systems;
systems = '\nМОДЕРЫ быстро суда\n';

for (let id in users) {
if(users[id]){
let user = users[id];

if (user.realty.admin == 4) systems += `иди сюда @id${users[id].id}(${users[id].prefix})\n`;
}
}
let text = `\n`;
if (systems.length != 26) text += systems;
return message.send(`${text}`);
});

cmd.hear(/^(?:созвать админов)$/i, (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
let systems;
systems = '\nАДМИНЫ быстро суда\n';

for (let id in users) {
if(users[id]){
let user = users[id];

if (user.realty.admin == 6) systems += `иди сюда @id${users[id].id}(${users[id].prefix})\n`;
}
}
let text = `\n`;
if (systems.length != 26) text += systems;
return message.send(`${text}`);
});

cmd.hear(/^(?:випы)/i, async (message, args, bot) => {  
		let systems, sozdatels, admins, moders, chat; 
		systems = '\n<|ВИПЫ|>\n';
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.vip == 1) systems += `@id${users[id].id}(${users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (systems.length != 26) text += systems; 
		return message.send(`${text}`);
});

//////////////////////////////////////

cmd.hear(/^(?:трейд)\s(вверх|вниз|)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([1.25, 1.5, 1.75, 2, 2.5]);
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

cmd.hear(/^(?:тт)\s(1|2|)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
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

cmd.hear(/^(?:нап(?:е|ё)рсток|)\s([1-3])\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`у вас недостаточно средств`, {attachment:'market-181025518_2646788'});
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
			return bot(`вы не угадали, это был ${cup} напёрсток`);
		}
	}
});

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(message.args[1] < 1 || message.args[1] > 99) return;

	const int = utils.random(1, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		 await message.sendSticker(11761);
		message.user.balance += 10000000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 10.000.000.000$`);
	} else if(int !== message.args[1])
	{
		await message.sendSticker(11753);
		return bot(`вы не угадали число. Вам выпало число "${int}"
		 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
	}
});

cmd.hear(/^(?:смерть сейф)\s([0-9]+)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
	if(!message.isChat) return bot(`команда работает только в беседе!`);	
	if(message.args[1] < 1 || message.args[1] > 11) return;

	const int = utils.random(1, 11);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		 await message.sendSticker(11761);
		message.user.balance += 10000000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 10.000.000.000$`);
	} else if(int !== message.args[1])
	{
		await message.sendSticker(11753);
		await bot(`вы не угадали число. Вам выпало число "${int}"
		 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$ но к сожелению я вынужден вас кикнуть потому что СМЕРТЬ`);

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.user.id }).catch((error) => {return message.send(`⚠ Ошибка человека нет в беседе или в боте или он админ беседы`);});
		
		 await message.sendSticker(11781);

	}
});

cmd.hear(/^(?:бигсейф)\s([0-9]+)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  
if(message.args[1] < 100 || message.args[1] > 999) return;

	const int = utils.random(100, 999);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		 await message.sendSticker(11761);
		message.user.balance += 100000000000;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 100.000.000.000$`);
	} else if(int !== message.args[1])
	{
				 await message.sendSticker(11753);
		return bot(`вы не угадали число. Вам выпало число "${int}"
		 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
	}
});

cmd.hear(/^(?:титансейф)\s([0-9]+)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  		
	if(message.args[1] < 1 || message.args[1] > 9999) return;

	const int = utils.random(1, 9999);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		 await message.sendSticker(11761);
		message.user.realty.admin = 6;
		message.user.tag = "Администратор";
		return bot(`невероятно! Вы угадали число.
		 вам выдана админка напишите созду вас добавят в админ беседу`);
		 await message.sendSticker(11761);
	} else if(int !== message.args[1])
	{
				 await message.sendSticker(11753);
		return bot(`вы не угадали число. Вам выпало число "${int}"
		 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите админку`);
	}
});

cmd.hear(/^(?:буква)\s([а-я])$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	let letter = utils.pick("йцукенгшщзхъфывапролджэячсмитьбю".split(""));
	message.args[1] = message.args[1].toLowerCase();

	if(letter === message.args[1]) {
		 await message.sendSticker(11761);
       message.user.balance += 1000000000;
		return bot(`вы отгадали букву! Буква была <<${letter}>>.
		💰 Приз: 1.000.000.000$`);
	} else {
		 await message.sendSticker(11753);
		return bot(`вы не отгадали букву! Буква была <<${letter}>>.
		🔥 Не отчаивайтесь, попытки неограничены!
		💰 Приз: 1.000.000.000$`);
	}
});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 138) return bot(`в админ беседе нельзя.`);
    if(!message.args[1]) return message.send(`используйте бизнес 1,2 если у вас только 1 бизнес то бизнес 1 если 2 то бизнес 2 покажет стату 2 бизнеса`);	
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Заработная плата: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
	💼 Сотрудников: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 Счёт бизнеса: ${utils.sp(message.user.business[message.args[1]].moneys)}$

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
});

cmd.hear(/^(?:допбизнес снять 1)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.user.mb === false) return bot(`У вас нет этого доп-бизнеса`);
	let llll = message.user.ms;
	
	message.user.ms = 0;
	message.user.m += llll;
	
	return bot(`Вы сняли со своего доп-бизнеса ${llll}`);
});

cmd.hear(/^(?:допбизнес снять 2)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.user.mb_2 === false) return bot(`У вас нет этого доп-бизнеса`);
	let llll = message.user.ms_2;
	
	message.user.ms_2 = 0;
	message.user.m_2 += llll;
	
	return bot(`Вы сняли со своего доп-бизнеса ${llll}`);
});

cmd.hear(/^(?:допбизнес снять 3)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.user.mb_3 === false) return bot(`У вас нет этого доп-бизнеса`);
	let llll = message.user.ms_3;
	
	message.user.ms_3 = 0;
	message.user.m_3 += llll;
	
	return bot(`Вы сняли со своего доп-бизнеса ${llll}`);
});

cmd.hear(/^(?:допбизнесы)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	
	return bot(`1. Межгалактическая станция
	Стоимость 20.000 метеоритов/149 рублей
	Прибыль: 200 метеоритов/час
	
	2. Шоколадная фабрика 
	Стоимость: 50.000 литров шоколада/199 рублей
	Прибыль:  250 литров шоролада/час
	
	3. Производство игрушек:
	Стоимость: 250 рублей
	Прибыль: 500 игрушек/час`);
});

cmd.hear(/^(?:допбизнес)$/i, async (message, bot) => {
	let text = ``;
	if(message.user.mb != false) text += `Статистика "Межгалактическая станция"
	Прибыль: 200 метеоритов/час
	На счёте: ${utils.sp(message.user.ms)}\n\n`;
	if(message.user.mb_2 != false) text += `Статистика "Шоколадная фабрика"
	Прибыль: 250 литров шоколада/час
	На счёте: ${utils.sp(message.user.ms_2)}\n\n`;
	if(message.user.mb_3 != false) text += `Статистика "Производство игрушек"
	Прибыль: 500 игрушек/час
	На счёте: ${utils.sp(message.user.ms_3)}\n\n`;
	if(message.user.mb == false) {
		if(message.user.mb_2 == false) {
			if(message.user.mb_3 == false) {
			text += `У вас нет допбизнеса`;
			}
		}
	}
	
	return bot(`${text}`);
});

cmd.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес снять [1 или 2] [количество]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|все|всё)/ig, message.user.business[message.args[1]].moneys);
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] <= 0) return bot(`вы не можете снять столько со счёта бизнеса`);
	if(message.args[2] > message.user.business[message.args[1]].moneys) return bot(`у вас нет денег на счёте этого бизнеса`);

	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$`);
});

cmd.hear(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
	let f = 9;
	if(message.user.tt_c >= f) {
		if(message.user.kapha == 0) {
		message.user.kapha = utils.random(1000, 9999);
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	} else {
	return message.send(`Введите "Капча ${message.user.kapha}", чтобы подтвердить что вы не робот!`, {attachment:'photo-181025518_457239442'});
	}
	}
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес улучшить [1 или 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно средств для улучшения`, {attachment:'market-181025518_2646788'});
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}$`);
});

cmd.hear(/^(?:бизнес)\s(?:нанять)\s(.*)\s([0-9]+)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес нанять [1 или 2] [кол-во работников]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(message.user.business[message.args[1]].workers + message.args[2] > businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers) return bot(`в вашем бизнесе не может поместится столько работников`);
	const cost = message.args[2] * 0;
	if(cost > message.user.balance) return bot(`у вас недостаточно средств для покупки рабочих`, {attachment:'market-181025518_2646788'});
	message.user.balance -= cost;
	message.user.business[message.args[1]].workers += message.args[2];

	return bot(`вы наняли ${message.args[2]} рабочих для бизнеса #${message.args[1] + 1}`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(message.chatId == 17) return bot(`в админ беседе нельзя.`);  	
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины будут через час`);

	const btc_ = message.user.farm_btc * message.user.misc.farm_count;

	message.user.btc += btc_;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через час
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:restart)$/i, async (message, bot) => {
	
	if(message.senderId !== 444997646) return bot(`&#128373; Недостаточно прав!`).catch((error) => { console.log(` Ошибка.`);});
	if(message.senderId !== 444997646) return;
	if(giving) return message.send(`вы не можете перезапустить бота пока идёт раздача
	если это очень необходимо то напишите "eval giving = false" и заного пропишите эту команду`);
	vk2.api.messages.send({ peer_id: message.peerId, sticker_id: 14306 })
	await bot("Запускаю");
    await saveAll();
    process.exit(-1);
});

cmd.hear(/^(?:!restart)$/i, async (message, bot) => {
	
	if(message.senderId !== 437164029) return bot(`&#128373; Недостаточно прав!`).catch((error) => { console.log(` Ошибка.`);});
	if(message.senderId !== 437164029) return;
	await bot(`Перезагрузка бота, ожидайте!`).catch((error) => { console.log(` Ошибка.`);});
    await message.sendSticker(utils.pick([7369, 14266, 11757, 9119, 13164, 10104, 5824, 9449, 5832, 8655, 11031, 10101, 13163, 9139, 7376, 14268, 14265, 10012, 14017, 11761, 11781, 11777, 11792, 14000, 14011, 14016, 11770, 10001, 14258, 7246, 9120, 9138, 13176, 13190, 13189, 10108, 10122, 10133, 5819, 5816, 14010, 11797, 11765, 11759, 11783, 9996, 14262, 5796, 5803, 9451])); 
    
	await saveAll();
	process.exit(-1);
    vk.api.messages.send({ user_id: 437164029, message: `&#128100; [ПЕРЕЗАГРУЗКА] Бот будет перезагружен через минуту: ${message.user.prefix}` });

});

function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
function spaces(string) {
		if (typeof string !== "string") string = string.toString();
		return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};

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
  var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));

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
}; 

function data() { 
var date = new Date(); 
let days = date.getDate(); 
let month = date.getMonth() + 1; 
let year = date.getFullYear(); 
if (month < 10) month = "0" + month; 
if (days < 10) days = "0" + days; 
var datas = days + '.' + month + '.' + year 
return datas; 
};

function pad(n, width) { 
var n = n + ''; 
return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
}

function displayTime(ticksInSecs) { 
var ticks = ticksInSecs; 
var hh = Math.floor(ticks / 3600); 
var mm = Math.floor((ticks % 3600)); 
var ss = ticks

return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) ); 
} 

setInterval(function () {
user.api.status.set({
group_id: 181025518,
text: `👤 Пользователей: ${Object.keys(users).length} &#8987;Время: ${utils.gi(time())}  Дата: ${utils.gi(data())} (&#127479;&#127482;Москва&#127479;&#127482;) \n ✅Бот Работает статус обновляется каждые 5 минут`});

}, 300000);
	
