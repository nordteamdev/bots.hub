console.log('')
console.log('-------------------------------')
console.log('  Бот работает!')
console.log('-------------------------------')
console.log('')

const { VK } = require("vk-io");
const vk = new VK();
const commands = [];
const fs = require("fs");
const rq = require("prequest");
const request = require('prequest');

const promo = require('./base/promo.json');
const clans = require('./base/clans.json');
const botinfo = require('./base/botinfo.json');
let giving = false;
let user = new VK();

user.setOptions({
token: 'токен страницы'
});

setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

		setInterval(() => {
			fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"));
		}, 15000);

const cars = [
	{
		id: 1,
		name: "Lada 2110",
		cost: 75000,
		att: "photo-160021944_456240473"
	},
	{
		id: 2,
		name: "Hyundai Solaris",
		cost: 250000,
		att: "photo-160021944_456240472"
	},
	{
		id: 3,
		name: "Toyota Camry",
		cost: 1000000,
		att: "photo-160021944_456240477"
	},
	{
		id: 4,
		name: "BMW 5",
		cost: 100000000,
		att: "photo-160021944_456240471"
	},
	{
		id: 5,
		name: "Mercedes - Benz",
		cost: 5000000000,
		att: "photo-160021944_456240475"
	},
	{
		id: 6,
		name: "Lamborghini Huracan",
		cost: 100000000000,
		att: "photo-160021944_456240474"
	},
	{
		id: 7,
		name: "Rolls Roys Wrath",
		cost: 50000000000000,
		att: "photo-160021944_456240476"
	}
];
// Нужно сделать турнир"", вообщем.
const bicycles = [
	{
		id: 1,
		name: "ELOPS 520 BTWIN",
		cost: 20000,
		att: "photo-181133436_456239018"
	},
	{
		id: 2,
		name: "Stern Rocket 20",
		cost: 100000,
		att: "photo-181133436_456239019"
	},
	{
		id: 3,
		name: "ST520 27.5 ROCKRIDER",
		cost: 250000,
		att: "photo-181133436_456239020"
	},
	{
		id: 4,
	    name: "(BMX)Subrosa Tiro 20'",
		cost: 400000,
		att: "photo-181133436_456239021"
	},
	{
		id: 5,
		name: "(BMX) FORWARD Zigzag 1.0",
		cost: 500000,
		att: "photo-181133436_456239022"
	},
	{
		id: 6,
		name: "(BMX) Stark Gravity",
		cost: 600000,
		att: "photo-181133436_456239023"
	},
	{
		id: 7,
		name: "(BMX) Blitz Mini M1 10'",
		cost: 800000,
		att: "photo-181133436_456239024"
	}
];

const scooters = [
	{
		id: 1,
		name: "Самокат 'Зенит'",
		coins: 14000,
		att: "photo220302713_456240623"
	}
];

const pets = [
	{
		name: 'Утка',
		cost: 50000,
		id: 1,
		att: "photo-178650735_456239076"
	},
	{
		name: 'Петух',
		cost: 150000,
		id: 2,
		att: "photo-178650735_456239077"
	},
	{
		name: 'Обезьяна',
		cost: 300000,
		id: 3,
		att: "photo-178650735_456239078"
	},
	{
		name: 'Мыртышка',
		cost: 900000,
		id: 4,
		att: "photo-178650735_456239079"
	},
	{
		name: 'Лошадь',
		cost: 1500000,
		id: 5,
		att: "photo-178650735_456239081"
	},
	{
		name: 'Слон',
		cost: 2500000,
		id: 6,
		att: "photo-178650735_456239082"
	},
	{
		name: 'Гепард',
		cost: 30000000,
		id: 7,
		att: "photo-178650735_456239083"
	}
];

const petsupd = [
	{
		cost: 60000,
		id: 1
	},
	{
		cost: 1750000,
		id: 2
	},
	{
		cost: 310000,
		id: 3
	},
	{
		cost: 915000,
		id: 4
	},
	{
		cost: 1550000,
		id: 5
	},
	{
		cost: 2800000,
		id: 6
	},
	{
		cost: 40000000,
		id: 7
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 250,
		id: 1,
		att: "photo-178650735_456239085"
	},
	{
		name: 'Подвал',
		cost: 3000,
		id: 2,
		att: "photo-178650735_456239086"

	},
	{
		name: 'Палатка',
		cost: 3500,
		id: 3,
		att: "photo-178650735_456239087"
	},
	{
		name: 'Домик на дереве',
		cost: 5000,
		id: 4,
		att: "photo-178650735_456239088"
	},
	{
		name: 'Полуразрушенный дом',
		cost: 10000,
		id: 5,
		att: "photo-178650735_456239089"
	},
	{
		name: 'Дом в лесу',
		cost: 25000,
		id: 6,
		att: "photo-178650735_456239090"
	},
	{
		name: 'Деревянный дом',
		cost: 37500,
		id: 7,
		att: "photo-178650735_456239091"
	},
	{
		name: 'Дача',
		cost: 125000,
		id: 8,
		att: "photo-178650735_456239092"
	},
	{
		name: 'Кирпичный дом',
		cost: 80000,
		id: 9,
		att: "photo-178650735_456239093"
	},
	{
		name: 'Коттедж',
		cost: 450000,
		id: 10,
		att: "photo-178650735_456239095"
	},
	{
		name: 'Особняк',
		cost: 1250000,
		id: 11,
		att: "photo-178650735_456239096"
	},
	{
		name: 'Дом на Рублёвке',
		cost: 5000000,
		id: 12,
		att: "photo-178650735_456239097"
	},
	{
		name: 'Личный небоскрёб',
		cost: 7000000,
		id: 13,
		att: "photo-178650735_456239098"
	},
	{
		name: 'Остров с особняком',
		cost: 12500000,
		id: 14,
		att: "photo-178650735_456239099"
	},
	{
		name: 'Белый дом',
		cost: 20000000,
		id: 15,
		att: "photo-178650735_456239100"
	}
];

const airplanes = [
	{
		name: 'Небольшой планер',
		cost: 10000,
		id: 1,
		att: "photo-178650735_456239102"
	},
	{
		name: 'Параплан',
		cost: 75000,
		id: 2,
		att: "photo-178650735_456239103"
	},
	{
		name: 'Як-40',
		cost: 400000,
		id: 3,
		att: "photo-178650735_456239104"
	},
	{
		name: 'ВиС 1',
		cost: 900000,
		id: 4,
		att: "photo-178650735_456239105"
	},
	{
		name: 'Tundra',
		cost: 1200000,
		id: 5,
		att: "photo-178650735_456239106"
	},
	{
		name: 'СА-20П',
		cost: 1750000,
		id: 6,
		att: "photo-178650735_456239107"
	},
	{
		name: 'Л-39',
		cost: 3000000,
		id: 7,
		att: "photo-178650735_456239109"
	},
	{
		name: 'Boeing 737-500',
		cost: 6000000,
		id: 8,
		att: "photo-178650735_456239110"
	},
	{
		name: 'Piper M350',
		cost: 15000000,
		id: 9,
		att: "photo-178650735_456239111"
	},
	{
		name: 'Beechcraft Baron 58P',
		cost: 25000000,
		id: 10,
		att: "photo-178650735_456239112"
	},
	{
		name: 'УТ-2Б',
		cost: 45000000,
		id: 11,
		att: "photo-178650735_456239113"
	},
	{
		name: 'Beechcraft 60 Duke',
		cost: 80000000,
		id: 12,
		att: "photo-178650735_456239114"
	},
	{
		name: 'ТР-301ТВ',
		cost: 150000000,
		id: 13,
		att: "photo-178650735_456239115"
	},
	{
		name: 'Л-410УВП',
		cost: 280000000,
		id: 14,
		att: "photo-178650735_456239116"
	},
	{
		name: 'C-17A Globemaster III',
		cost: 400000000,
		id: 15,
		att: "photo-178650735_456239117"
	},
	{
		name: 'Boeing 747SP',
		cost: 750000000,
		id: 16,
		att: "photo-178650735_456239118"
	},
	{
		name: 'Gulfstream IV',
		cost: 1000000000,
		id: 17,
		att: "photo-178650735_456239119"
	}
];

const phones = [
	{
		name: 'Nokia 105',
		cost: 1500,
		id: 1,
		att: "photo-178650735_456239121"
	},
	{
		name: 'Philips Xenium E168',
		cost: 4000,
		id: 2,
		att: "photo-178650735_456239122"
	},
	{
		name: 'Xiaomi Redmi 6A 2',
		cost: 6000,
		id: 3,
		att: "photo-178650735_456239123"
	},
	{
		name: 'Digma LINX ATOM 3G',
		cost: 9000,
		id: 4,
		att: "photo-178650735_456239124"
	},
	{
		name: 'Alcatel 1',
		cost: 12000,
		id: 5,
		att: "photo-178650735_456239125"
	},
	{
		name: 'Honor 9 Lite',
		cost: 20000,
		id: 6,
		att: "photo-178650735_456239126"
	},
	{
		name: 'Samsung Galaxy J6',
		cost: 36000,
		id: 7,
		att: "photo-178650735_456239127"
	},
	{
		name: 'IPhone 5',
		cost: 60000,
		id: 8,
		att: "photo-178650735_456239128"
	},
	{
		name: 'Xperia XZ Premium',
		cost: 100000,
		id: 9,
		att: "photo-178650735_456239129"
	},
	{
		name: 'Samsung Galaxy J8',
		cost: 300000,
		id: 10,
		att: "photo-178650735_456239130"
	},
	{
		name: 'IPhone X',
		cost: 1500000,
		id: 11,
		att: "photo-178650735_456239131"
	},
	{
		name: 'IPhone 3GS Supreme',
		cost: 5000000,
		id: 12,
		att: "photo-178650735_456239132"
	}
];

const peka = [
	{
		name: 'TOPCOMP MG 5567830 GL503VD',
		cost: 32500,
		id: 1,
		att: "photo-178650735_456239136"
	},
	{
		name: 'COMPYOU GAME PC G777',
		cost: 74000,
		id: 2,
		att: "photo-178650735_456239137"
	},
	{
		name: 'RIWER GAME-GTX (G9-793)',
		cost: 96000,
		id: 3,
		att: "photo-178650735_456239138"
	},
	{
		name: 'ASUS ROG GR8II-T055Z',
		cost: 105000,
		id: 4,
		att: "photo-178650735_456239139"
	},
	{
		name: 'KEY GM PRO',
		cost: 117600,
		id: 5,
		att: "photo-178650735_456239140"
	},
	{
		name: 'MSI VORTEX G65VR 7RE',
		cost: 130000,
		id: 6,
		att: "photo-178650735_456239142"
	},
	{
		name: 'ARENA A085885',
		cost: 325000,
		id: 7,
		att: "photo-178650735_456239143"
	},
	{
		name: 'DELL XPS TOWER SPECIAL EDITION',
		cost: 486000,
		id: 8,
		att: "photo-178650735_456239144"
	},
	{
		name: 'APPLE IMAC С ЭКРАНОМ 5K RETINA',
		cost: 564000,
		id: 9,
		att: "photo-178650735_456239145"
	},
	{
		name: 'SURFACE STUDIO',
		cost: 835000,
		id: 10,
		att: "photo-178650735_456239146"
	}
];

/*const logcmdes = [];*/

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
			name: 'Заводы Apple по всей Галактике',
			cost: 200000000000000,
			earn: 75000000000,
			workers: 1500,
			id: 11,
			icon: '🗺'
		},
		
		{
			name: '[VIP]Межгалактические заводы Apple',
			cost: 500000000000000,
			earn: 300000000000,
			workers: 15000,
			id: 11,
			icon: '🗺'
		}
	]
];

const farms = [
	{
		name: 'Мини ферма',
		cost: 100000000,
		id: 1
	},
	{
		name: 'Средняя ферма',
		cost: 500000000,
		id: 2
	},
	{
		name: 'Большая ферма',
		cost: 780000000,
		id: 3
	},
		{
		name: 'Корпорация',
		cost: 21500000000,
		id: 4
	},
		{
		name: 'Forbes',
		cost: 220000000000,
		id: 5
	}
];

function getUnix() {
	return Date.now();
}

function unixStamp(stamp) {
	let date = new Date(stamp),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;

	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;

	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;

	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;

	let text = ``;

	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";

	return text;
}

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

let users = require('./base/users.json');
//let logsUsers = require('./base/Logs.json');
let config = require('./base/settings.json');

/*async function saveLogs()
{
	require('fs').createFileSync('./base/Logs.json', JSON.stringify(users, null, '\t'));;
	return true;
}*/

vk.setOptions({ token: config.grouptoken, pollingGroupId: config.groupid });
	const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	stats.messages.inbox += 1;
if(Number(message.senderId) <= 0) return;

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			level: 1,
			exp: 1,
			expup: 24,
			balance: 5000,
			bank: 0,
			coins: 0,
			cosmos: 0,
			ruda: 0,
			operator: 1,
			number: 0,
			numberss: false,
			shaxt_tpcoins: 0,
			farm_coins: 0,
			farms: 0,
			bonustime: 0,
			poxod: 0,
			petpoxod: 0,
			case: 0,
			stag: 0,
			biz: 0,
			bizlvl: 0,
			business: [],
			foolder: 0,
			workenergy: 5,
			energy: 10,
			petenergy: 10,
			opit: 0,
			zhelezo: 0,
			zoloto: 0,
			almaz: 0,
			ugol: 0,
			old: false,
			rubin: 0,
			platina: 0,
			hack: 0,
			floder: 0,
			rating: 0,
			nicklimit: 16,
			notifications: true,
			regDate: getUnix(),
			adm: 0,
			adm_time: 0,
			ban: false,
			banreport: true,
			trade: true,
			warns: 0,
            warn: 0,
			warn_p: `Нет`,
			vig: 0,
			vig_p: `Нет`,
			firstmsg: true,
			tag: user_info.first_name,
			work: 0,
			clanid: false,
			mention: true,
			realty: {
				home: 0
			},
			ainfo: {
				all_ans: 0,
				ans: 0, 
				good_ans: 0,
				bad_ans: 0
				
			},	
			rep: {
				status: false,
				id: false
			},
			marriage: {
				partner: 0,
				requests: []
			},
			transport: {
				car: 0,
				airplane: 0,
				bicycle: 0
				
				
			},
			misc: {
				phone: 0,
				pet: 0,
				farm: 0,
				farm_count: 0,
				shaxt: 0,
				shaxt_count: 0,
				pk: 0
			},
			pet: {
				lvl: 0,
				poterl: false
			},
			сcoin: 0
		});
		/*require('fs').createFileSync('./base/Logs[user.uid].json', JSON.stringify(users, null, '\t'));;*/
		console.log(` +1 игрок [Игроков: ${users.length}]`);
		console.log(``);
		saveUsers();
		/*logsUsers([{
		command: command
		}]);
		saveLogs;*/
	}
	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}
	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;
	
	if(message.user.ban) return bot(`ваш аккаунт заблокирован ⛔`);
	
	/*logsUsers.push([{
	command: command
	}]);
	saveLogs;*/
	if(message.user.firstmsg)
	{

bot(`я вижу ты новенький! Рад познакомится, отправь «помощь» что бы узнать мои команды. [📚]`, 
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
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "🤖 Бот"
		},
			"color": "negative"
		}
]
		]
			})
		});
message.sendSticker(10053);
        stats.new_users += 1;
        message.user.firstmsg = false;
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

setInterval(async () => {
	await saveUsers();
	console.log(' База данных успешно сохранена.');
	console.log('');
}, 30000);

async function saveUsers()
{
	require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));;
	return true;
}

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
let smilerand = utils.pick([`[🍒🍊🍓]`, `[💰🍊🍒]`, `[🍊🍊💰]`, `[🍋🍊🍊]`, `[💰🍓💰]`]);
let smilelov = utils.pick([`💶`, `💍`, `💎`, `💰`, `🎁`, `⚽`]);
let smilelovf = utils.pick([`ловушкой`, `мышеловкой`, `капканом`]);

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
smilerand = utils.pick([`[🍒🍊🍓]`, `[💰🍊🍒]`, `[🍊🍊💰]`, `[🍋🍊🍊]`, `[💰🍓💰]`]);
smilelov = utils.pick([`💶`, `💍`, `💎`, `💰`, `🎁`, `⚽`]);
smilelovf = utils.pick([`ловушкой`, `мышеловкой`, `капканом`]);


}, 1);

function msgError(messagetext)
{
	return (`${messagetext} ${utils.pick([`😯`, `🙂`, `🤑`, `☺`])}`);
}

cmd.hear(/(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start|📚 Помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;
		await bot(`Мои команды:
[🌏] Основное:		
&#4448[🎀 Профиль 
&#4448;💲 Баланс 
&#4448;💳 Банк [банк/сумма/снять] 
&#4448;📎 Ник [ник/вкл/выкл] 
&#4448;🌏 Топ - топ игроков 
&#4448;💵 Передать [ID] [СУММА] - передача валюты. 
&#4448;💎 КПередать [ID] [СУММА] - передача коинов. 
&#4448;👑 Бонус - Ежедневный бонус 
&#4448;🎁 Кейс - кейс с призами
&#4448;💊 Донат - Донат-магазин.
&#4448;🚗 Автомобиль - информация об вашем автомобиле 
&#4448;💦 Репорт - отправить жалобу
&#4448;💦 Спец - команды Администратора.
КЛАНЫ В РАЗРАБОТКЕ  

[🚀] Товары:
&#4448;🛒 Магазин - Купить что-то
&#4448;🛒 Интернет-магазин - Купить что-то 

&#4448;➖ Продать [предмет] - Продать что-то 

[👷‍♂]Работы 
&#4448;🔨 Работать 
&#4448;🔧 "Работа" - список работ 
&#4448;⚒ Уволиться 

[🐒] Питомцы: 
&#4448;🐒 Питомец - информация
&#4448;🌟 Питомец улучшить 
&#4448;🐪 Питомец поход 
&#4448;🙈 Питомец найти

[💒] Браки:
&#4448;💍⠀Браки - Список игроков, которые хотят стать вашими партнёрами
&#4448;👪 Брак [id] - Сделать предложение игроку
&#4448;💔 Развод - Развестить с игроком

[💼] Бизнесы:
&#4448;📈 Бизнес [Номер] - статистика 
&#4448;👷 Бизнес нанять [Номер] [кол-во] - нанять рабочих 
&#4448;💵 Бизнес снять [Номер] [кол-во] - снять деньги со счёта 
&#4448;✅ Бизнес улучшить [Номер] - улучшить бизнес

[📹]Прочее:
&#4448;&#4448;🎮 Игры - Покажет игровые команды 
&#4448;&#4448;⚠ Беседы - список наших бесед 
&#4448;&#4448;🤖 Бот - Информация о боте 
&#4448;&#4448;⚠ Правила - список правил
&#4448;&#4448;📺 Видео [фраза] 
&#4448;&#4448;⚠ Онлайн - список онлайн игроков 
&#4448;&#4448;🇷🇺 translate [текст] - перевод английского текста на русский 
&#4448;&#4448;🇺🇸 Переведи [текст] 
&#4448;&#4448;🙊 Анекдот
&#4448;&#4448;📹 Гиф [фраза] 

		  `);
		 });


cmd.hear(/^(?:аправила)$/i, async (message, bot) => {
	message.user.foolder += 1;
    if(message.user.adm < 1) return message.send(`🔸 » Вы не VIP-ДОСТУП`);
	return bot(`
	[🌍] Актуальный список правил '' бота [🌍] 
			[💎] для АДМИНИСТРАТОРОВ И VIP [💎]

	🚀 1. Хамство в ответе на репорт. [Выговор] 
	🚀 2. Неадекватные ответы на репорт. ['Молчанка' 120мин] 
	🚀 3. Накрутка ответов на репорт. [Выговор] 
	🚀 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
	🚀 5. Обман спец.администрации. [Бан] 
	🚀 6. Выдача наказания без определённой причины. [Выговор] 
	🚀 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
	🚀 8. Слив какой-либо административной информации. [Бан] 
	🚀 9. Ражигание любых конфликтов между игроками. ['Молчанка' 240мин]
	🚀 10. Выдача/передача администраторами валюты. [Бан]
	🚀 11. Админ-Абуз. [Бан]`);
});

cmd.hear(/^(?:правила)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`
	[🌍] Актуальный список правил '' бота [🌍] 
		[💎] Для бесед/чатов с ботом [💎] 

		[🌍] Наказание: Бан || Предупреждение. 
		  [🚀] 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
		  [🚀] 2. Мат/оскорбления в репорт. 
		  [🚀] 3. Оскорбление проекта.  
		  [🚀] 4. Обман администрации/игроков.

		[🌍] Наказание: 'Молчанка'(60-240) минут || Предупреждение
		 [🚀] 5. Оскорбление чувств игрока(ов).  
		 [🚀] 6. Флуд/оффтоп в репорт.  
		 [🚀] 7. Выдача себя за ADMIN/MODER/VIP. 
		 [🚀] 8. Использование неадекватных ников. 
	     [🚀] 9. Оскорбление Администрации.


		[🌍] Наказание: Бан || Предупреждение. 
		 [🚀] 10. Использование БАГов, скрытие их от @akullaaa00(Создателя)
		 [🚀] 11. Распространение шок контента, контента 18+ и тд. 
		 [🚀] 12. Накрутка любых игровых средств с фейковых аккаунтов. 
		 [🚀] 13. Использование фейк аккаунта. 
		 [🚀] 14. Пиар/реклама/выпрашивание лайков и т.д. `);
});

cmd.hear(/^(?:профиль)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = ``;

        text += `🌍 Ваш игровой айди: ${message.user.uid}\n`;
        text += `👤 Ваш ник: ${message.user.tag}\n`;
        text += `🔗 Ссылка:  vk.com/id${message.user.id}\n`;
        text += `🚀 Привилегия: ${message.user.adm.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "MVP").replace(/3/gi, "Мл.Модер").replace(/4/gi, "Moderator").replace(/5/gi, "Admin").replace(/6/gi, "Gl.Admin").replace(/7/gi, "Пользoватель")}\n`;
        text += `💷 Ваш баланс: ${utils.sp(message.user.balance)} $\n`;
        text += `💳 В банке: ${utils.sp(message.user.bank)} $\n`;
        text += `💎 Коинов: ${utils.sp(message.user.coins)} 💎\n`;
        text += `💠 Руды: ${utils.sp(message.user.ruda)} кг\n`;
        text += `☄ Метеоритов: ${utils.sp(message.user.cosmos)}\n`
        text += `👑 Рейтинг: ${utils.sp(message.user.rating)} 👑\n`;
        text += `🎀 Уровень: ${message.user.level} (${message.user.exp}🌟/${message.user.expup}🌟)\n`;
        if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	    if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].tag}\n`;
        text += (`💎 Бонус: ${message.user.bonustime > Date.now() ? "Не доступен" : "Доступен!"}\n`);
        if(message.user.foolder) text += `✉ Использовано команд: ${message.user.foolder}\n`;

        if(message.user.transport.car || message.user.transport.bicycle || message.user.misc.pet || message.user.transport.airplane || message.user.misc.phone || message.user.number ||
		message.user.realty.home || message.user.misc.pk)
 	{
		text += `\n 🍀 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.bicycle) text += `⠀🚗 Велосипед: ${bicycles[message.user.transport.bicycle - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.misc.phone) text += `[📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.phone)	text += `&#4448; 📱 Оператор: ${message.user.operator.toString().replace(/1/gi, "отсутствует || Команда: Купить номер").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}\n`;
		if(message.user.number) text += `&#4448; 📱 Номер телефона: +79${message.user.number}\n`;
        if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀🐌 Питомец: ${pets[message.user.misc.pet - 1].name}\n`;}
		if(message.user.misc.pk) text += `⠀💻 Компьютер: ${peka[message.user.misc.pk - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name} (${message.user.misc.farm_count}х)\n`;
		if(message.user.misc.shaxt) text += ` 🎟⠀Шахта: ${shaxts[message.user.misc.shaxt - 1].name} (${message.user.misc.shaxt_count}х)\n`;
		
		if(message.user.business.length != 0)
		{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}
	

	text += ("\n📗 Дата регистрации: " + unixStamp(message.user.regDate));
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:get)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
    if(message.user.adm < 1) return message.send(`🔸 » Вам не доступно!`);
	if(message.args[1] == 176 && message.args[1] == 27);
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
			let text = ``;	
	text += `📕 Информация об игроке\n`;
	text += `[🌍] Игровой айди: ${user.uid}\n`;
	text += `[🔗] Ссылка:  vk.com/id${user.id}\n`;
	text += `[🚀] Привилегия: ${user.adm.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "MVP").replace(/3/gi, "Мл.Модер").replace(/4/gi, "Mодератор").replace(/5/gi, "Администратор").replace(/6/gi, "Гл.Администратор").replace(/7/gi, "Создатель")}\n`;
	text += `[💷] Баланс: ${utils.sp(user.balance)} $\n`;
	if(user.bank) text += `[💳] В банке: ${utils.sp(user.bank)} $\n`;
	if(user.btc) text += `[💎] Коинов: ${utils.sp(user.coins)} 💎\n`;
	text += `[💠] Руды: ${utils.sp(user.ruda)} кг\n `
	text += `[👑] Рейтинг: ${utils.sp(user.rating)} 👑\n`;;
	text += `[🎀] Уровень: ${user.level} [${user.exp}/24]\n`;
		if(user.work) text += `👔 ⇢ Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `👬 ⇢ Партнер: ${users[user.marriage.partner].tag}`;


	if(user.transport.car || user.transport.bicycle || user.transport.airplane ||
		user.realty.home || user.misc.pet || user.misc.pk ||
		user.misc.phone || user.misc.pet || user.misc.phone || user.number)
	{
		text += `\n [🍀] Имущество:\n`;

		if(user.transport.car) text += `⠀🚗 ⇢ Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.bicycle) text += `⠀🚗 ⇢ Велосипед: ${bicycles[user.transport.bicycle - 1].name}\n`;
		if(user.transport.airplane) text += ` 🛩 ⇢ Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.misc.phone) text += ` [📱] Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.phone)	text += `&#4448; [📱] Оператор: ${user.operator.toString().replace(/1/gi, "отсутствует || Команда: Купить номер").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}\n`;
		if(user.number) text += `&#4448; [📱] Номер телефона: +79${user.number}\n`;
		if(user.realty.home) text += `⠀🏠 ⇢ Дом: ${homes[user.realty.home - 1].name}\n`;

		if(user.misc.pet) text += `⠀🐼 ⇢ Питомец: ${pets[user.misc.pet - 1].name}\n`;}
		if(user.misc.pk) text += `💻 ⇢ Компьютер: ${peka[user.misc.pk - 1].name}\n\n`;
		if(user.business.length != 0)
		{
			for(var i = 0; i < user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}
		
	if(user.foolder) text += `\n [✉] Использовано команд: ${message.user.foolder}\n`;
	text += `[⚠] Предупреждений: ${user.warn}\n`
	text += `[⚠] Причины: ${user.warn_p}\n`
	text += `[⛔] Админ-выговоров: ${user.vig}\n`
	text += `\n[💎] Бан передачи: ${user.trade ? "Нет" : "Да"}\n`
	text += `[🔥] Бан репорта: ${user.banreport ? "Нет" : "Да"}\n`
	text += `[🔥] Аккаунт заблокирован: ${user.ban ? "Да" : "Нет"}\n`
	text += `\n[🔥] Уведомления: ${user.notifications ? "Включены" : "Выключены"}\n`
	text += (`[💎] Бонус: ${user.bonustime > Date.now() ? "Не доступен" : "Доступен!"}`);

	text += ("\n\n[📗] Дата регистрации: " + unixStamp(message.user.regDate));
	return bot(`профиль игрока:\n${text}`);
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`разделы магазина:

🚙 Транспорт:
⠀⠀[🚗] ⇢ Машины
⠀⠀[🛩] ⇢ Самолеты

🏘 Недвижимость:
⠀⠀[🏠] Дома

📌 Остальное:
  [🐌] ⇢ Питомцы
  [💻] ⇢ Компьютеры
⠀⠀[📱] ⇢ Телефоны
⠀⠀[⭐] ⇢ Фермы
   [💠] ⇢ Шахты
⠀⠀[👑] ⇢ Рейтинг [кол-во] - $250 млн
⠀⠀[💼] ⇢ Бизнесы
⠀⠀
🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Коин 100', 'Рейтинг 10'])}"`);
});

cmd.hear(/^(?:интернет-магазин)$/i, async (message, bot) => {
	if(!message.user.misc.pk || !message.user.misc.phone) return bot(`У вас нет компьютера или телефона`);
	return bot(`разделы магазина:

🚙 Транспорт:
  [🚲] ⇢ Велосипеды

❗ Другое:
	[💸] ⇢ Деньги [кол-во коинов] - Обменять коины на деньги
	[💎] ⇢ Коин [кол-во коинов] - Обменять деньги на коины

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Деньги 18 Велосипеды 4'])}"`);
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`вы включили гиперссылку ${smilesuccess}`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`вы выключили гиперссылку ${smilesuccess}`);
	}
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = `\n`
    text += `[💷] Баланс: ${utils.sp(message.user.balance)} $ 💸\n`;
	if(message.user.bank) text += `\n[💳] В банке: ${utils.sp(message.user.bank)} $`;
	if(message.user.coins) text += `\n[💎] Коинов: ${utils.sp(message.user.coins)} 💎`;
	if(message.user.ugol) text += `\n📼 ${message.user.ugol} угля`;
	if(message.user.zhelezo) text += `\n🎛 ${message.user.zhelezo} железа`;
	if(message.user.zoloto) text += `\n🏵 ${message.user.zoloto} золота`;
	if(message.user.almaz) text += `\n💎 ${message.user.almaz} алмаза`;
	if(message.user.rubin) text += `\n💍 ${message.user.rubin} рубинов`;
	if(message.user.platina) text += `\n🎫 ${message.user.platina} платины`;
	
	return bot(text);

});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {

if(message.args[1].length > message.user.nicklimit) return bot(`вы указали длинный ник. ${smileerror}`);

message.user.tag = message.args[1];
let smilenick = utils.pick([`😯`, `🙂`, `☺`]);
let ggtext = utils.pick([`фантастический`, `крутой`, `классный`, `прикольный`]);
return bot(`${ggtext} ник! ${smilenick}`);
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`на вашем банковском счёте находится: ${utils.sp(message.user.bank)} $`);
});

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы ${smileerror}`);
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

		return bot(`вы сняли ${utils.sp(message.args[1])} $
[💳] Остаток на счёте: ${utils.sp(message.user.bank)} $
[💷] Ваш баланс: ${utils.sp(message.user.balance)} $`);
	}
});

cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50 $ ${smileerror}`);
	if(message.user.bank + message.args[1] > 250000000000) return bot(`на счету в банке не может лежать одновременно больше 250.000.000.000 $ ${smileerror}`);

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы ${smileerror}`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])} $ ${smilesuccess}`);
	}
});

cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	message.user.foolder += 1;

	let top = [];

	users.filter(x => x.adm < 2).map(x=> {
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
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rating)}👑 | ${utils.rn(message.user.balance)}$`);
});

cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

 if(message.args[2] > 5000000000) return bot(`вы не можете столько передать ${smileerror}`);

	if(message.args[2] <= 0) return;
	if(!message.user.trade) return bot(`у вас установлен бан передачи ${smileerror}`);

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
[💷] Баланс: ${utils.sp(message.user.balance)} $`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`);

		if(user.uid === message.user.uid) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`);

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])}$ ${smilesuccess}
		[💷] Ваш баланс: ${utils.sp(message.user.balance)}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
[👤] Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!
[🔕] Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:буква)\s([а-я])$/i, async (message, bot) => {

let letter = utils.pick("йцукенгшщзхъфывапролджэячсмитьбю".split(""));
message.args[1] = message.args[1].toLowerCase();

if(letter === message.args[1]) {
message.user.balance += 1000000;
return bot(`вы отгадали букву! Буква была "${letter}".
💰 Приз: 1.000.000 $`);
} else {
return bot(`вы не отгадали букву! Буква была "${letter}".
🔥 Не отчаивайтесь, попытки неограничены!`);
}
});

cmd.hear(/^(?:лник)\s([0-9]+)$/i, async (message, bot) => {
    if(message.user.adm < 3) return bot(`вы не администратор ${smileerror}`);
    let user = users.find(x=> x.uid === Number(message.args[1]));
 
    if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
 
    if(message.user.old)
    {
        user.nicklimit = 15;
        user.old = false;
        await bot(`Пользователю ${user.tag} отключен длинный ник.`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `Администратор отключил функцию "Длинный ник" на вашем аккаунте ${smileerror}`
        });
    } else {
        user.nicklimit = 30;
        user.old = true;
        await bot(`Пользователю ${user.tag} включен длинный ник.`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `Вы получили функцию "Длинный ник", теперь вы сможете ставить ник до 30 символов. Поздравляем!`
        });
    }
});

cmd.hear(/^(?:Кпередать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.coins);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
	if(!message.user.trade) return bot(`у вас установлен бан передачи ${smileerror}`);

	if(message.args[2] > message.user.coins) return bot(`недостаточно коинов
[💎] Коинов: ${utils.sp(message.user.coins)} 💎`);
	else if(message.args[2] <= message.user.coins)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`);

		if(user.uid === message.user.uid) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`);

		message.user.coins -= message.args[2];
		user.coins += message.args[2];

		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])} коинов ${smilesuccess}
		[💎] Коинов: ${utils.sp(message.user.coins)}`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
[👤] Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])} коинов!
[🔕] Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

//Админ команды
cmd.hear(/^(?:Пбан)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.adm < 1) return bot(`Отказ`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID игрока`);

	user.trade = false;

    saveUsers();
	await bot(`вы поставили бан передачи игроку ${user.tag} ${smilesuccess}`,);
	vk.api.messages.send({ user_id: user.id, message: `Вам выдали бан передачи ⛔` }); 
});

cmd.hear(/^(?:Рбан)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.adm < 1) return bot(`Отказ`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный [ID] игрока`);

	user.trade = true;
	
    saveUsers();
	await bot(`вы сняли бан передачи у игрока ${user.tag} ${smilesuccess}`,);
	vk.api.messages.send({ user_id: user.id, message: `Вам сняли блокировку передачи` }); 
});

cmd.hear(/^(?:бан|ban)\s(.*)$/i, async (message, bot) => { 
	message.user.foolder += 1;

//if(!message.user.ainfo.bans) message.user.ainfo.bans = 0;
if(/*message.user.ainfo.bans === 0*/ message.user.adm < 3) return bot(`Вам не доступна команда.`);

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`); 


user.ban = true; 
blocked += 1;

saveUsers();
await bot(`вы забанили игрока *id${user.id} (${user.tag}). ${smilesuccess}`,); 
att: "photo220302713_45624069";
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован. ${smileerror}` }); 
}
});

let blocked = 0;

cmd.hear(/^(?:разбан|unban)\s(.*)$/i, async (message, bot) => { 
	message.user.foolder += 1;

if(message.user.adm < 1) return bot(`доступно с привилегии - Хэлпер `);

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите [ID] игрока из его профиля. ${smileerror}`); 


user.ban = false; 
blocked -= 1;

saveUsers();
await bot(`вы разбанили игрока *id${user.id} (${user.tag}). ${smilesuccess} `); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован. ${smilesuccess}` }); 
}
});

cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `); 
		if(!message.args[1] || !message.args[2]) return message.send(`[🚀] Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`[🚀] Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`[🚀] Придумайте адекватный ник`);
		} 
		users[message.args[1]].tag = message.args[2];
		return message.send(`[🚀] Вы сменили ник игрока на: ${message.args[2]}`);
	});

var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
setInterval(() => {
	uptime.sec++;
	if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
	if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
 	if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
}, 1000);

let stats = {
	messages: {
		inbox: 0,
		outbox: 0
	},
	new_users: 0,
	bot_start: Date.now()
}

cmd.hear(/^(?:givecoins)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - MVP+ `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].coins += Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов`);
});

cmd.hear(/^(?:givebans)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    if(message.user.adm < 7) return message.send(`[🚀] » Доступно с привилегии - Создателя `);
	if(!message.args[1] || !users[message.args[1]] ) return message.send(`[💰] » Пример: 'givebans [ID]'`);
	users[message.args[1]].ainfo.bans === 1;
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} возможность Блокировки акка`);
});

cmd.hear(/^(?:givepet)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - MVP+ `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'givepet [ID] [COUNT]'`); 
	users[message.args[1]].misk.pet = Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Питомца`);
});

cmd.hear(/^(?:givecar)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - MVP+ `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'givecar [ID] [COUNT]'`); 
	users[message.args[1]].transport.car = Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов`);
});

cmd.hear(/^(?:givebicycle)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - MVP+ `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].transport.bicycle = Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов`);
});

cmd.hear(/^(?:givebusines)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 6) return message.send(`[🚀] » Доступно с привилегии - Администратор `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0 ) return message.send(`[💰] » Пример: 'givebusines [ID] [id]'`); 
	message.args[2] = Number(message.args[2]) - 1;
	const sella = businesses[message.args[2]][0];
	if(sella == null) return;
	users[message.args[1]].business.push({
		"id": message.args[2] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${(message.args[2])+1} бизнес`);
});


cmd.hear(/^(?:giverating)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'giverating [ID] [COUNT]'`); 
	users[message.args[1]].rating += Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рейтинг`);
});

cmd.hear(/^(?:giveuid)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    if(message.user.adm < 7) return message.send(`[🚀] » Доступно с привилегии - MVP+ `);
	if(!message.args[1] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'giveuid [ID] [COUNT]'`); 
	users[message.args[1]].uid = message.args[2];
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} UID`);
	saveUsers();
	
});

cmd.hear(/^(?:giveopit)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'giveopit [ID] [COUNT]'`); 
	users[message.args[1]].opit += Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} opit`);
});


cmd.hear(/^(?:giverud)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'giverud [ID] [COUNT]'`); 
	users[message.args[1]].ruda += Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} кг руды`);
});

cmd.hear(/^(?:givebank)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`[💰] » Пример: 'givebank [ID] [COUNT]'`); 
	users[message.args[1]].bank += Number(message.args[2]);
 	 
	return message.send(`[💰] » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} $ в банковский счёт`);
});

cmd.hear(/^(?:removebank)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removebank [ID]'`); 
	users[message.args[1]].bank = 0; 
	return message.send(`[💰] » Вы забрали все рубли из банковского счета у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removepet)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removepet [ID]'`); 
	users[message.args[1]].misk.pet = 0; 
	return message.send(`[💰] » Вы забрали питомца у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removebicycle)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removebicycle [ID]'`); 
	users[message.args[1]].transport.bicycle = 0; 
	return message.send(`[💰] » Вы забрали велосипед у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removeacc|removeakk)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 7) return message.send(`[🚀] » Доступно с привилегии - Owner `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removeakk [ID]'`); 
		users[message.args[1]].bank = 0;
		users[message.args[1]].level = 1;
		users[message.args[1]].exp = 1;
		users[message.args[1]].expup = 24;
		users[message.args[1]].balance = 5000;
		users[message.args[1]].coins = 0;
		users[message.args[1]].cosmos = 0;
		users[message.args[1]].ruda = 0;
		users[message.args[1]].operator = 1;
		users[message.args[1]].number = 0;
		users[message.args[1]].numberss = false;
		users[message.args[1]].shaxt_tpcoins = 0;
		users[message.args[1]].farm_coins = 0;
		users[message.args[1]].farms = 0;
		users[message.args[1]].bonustime = 0;
		users[message.args[1]].poxod = 0;
		users[message.args[1]].petpoxod = 0;
		users[message.args[1]].case = 0;
		users[message.args[1]].stag = 0;
		users[message.args[1]].biz = 0;
		users[message.args[1]].bizlvl = 0;
		users[message.args[1]].business = [];
		users[message.args[1]].foolder = 0;
		users[message.args[1]].workenergy = 5;
		users[message.args[1]].energy = 10;
		users[message.args[1]].petenergy = 10;
		users[message.args[1]].opit = 0;
		users[message.args[1]].zhelezo = 0;
		users[message.args[1]].zoloto = 0;
		users[message.args[1]].almaz = 0;
		users[message.args[1]].ugol = 0;
		users[message.args[1]].old = false;
		users[message.args[1]].rubin = 0;
		users[message.args[1]].platina = 0;
		users[message.args[1]].hack = 0;
		users[message.args[1]].floder = 0;
		users[message.args[1]].rating = 0;
		users[message.args[1]].nicklimit = 16;
		users[message.args[1]].notifications = true;
		users[message.args[1]].regDate = getUnix();
		users[message.args[1]].adm = 0,
		users[message.args[1]].adm_time = 0;
		users[message.args[1]].ban = false;
		users[message.args[1]].banreport = true;
		users[message.args[1]].trade = true;
		users[message.args[1]].warns = 0;
       	users[message.args[1]].warn = 0;
		users[message.args[1]].warn_p = `Нет`;
		users[message.args[1]].vig = 0;
		users[message.args[1]].vig_p = `Нет`;
		users[message.args[1]].firstmsg = true;
		users[message.args[1]].work = 0;
		users[message.args[1]].clanid = false;
		users[message.args[1]].mention = true;
		users[message.args[1]].home = 0;
		users[message.args[1]].ainfo.all_ans = 0;
		users[message.args[1]].ainfo.ans = 0; 
		users[message.args[1]].ainfo.good_ans = 0;
		users[message.args[1]].ainfo.bad_ans = 0;
		users[message.args[1]].ainfo.bans = 0;
		users[message.args[1]].transport.car = 0;
		users[message.args[1]].transport.airplane = 0;
		users[message.args[1]].transport.bicycle = 0;
		users[message.args[1]].transport.scooter = 0;
		users[message.args[1]].misc.phone = 0;
		users[message.args[1]].misc.pet = 0;
		users[message.args[1]].misc.farm = 0;
		users[message.args[1]].misc.farm_count = 0;
		users[message.args[1]].misc.shaxt = 0;
		users[message.args[1]].misc.shaxt_count = 0;
		users[message.args[1]].misc.pk = 0;
		users[message.args[1]].pet.lvl = 0;
		users[message.args[1]].pet.poterl = false;
		users[message.args[1]].сcoin = 0;
		return message.send(`[💰] » Вы обнулили пользователя [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
		console.log(` Был обнулён игрок id${users[message.args[1]].id}`);
		console.log(``);
		saveUsers();
	});

cmd.hear(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removecoins [ID]'`); 
	users[message.args[1]].coins = 0; 
	return message.send(`[💰] » Вы забрали все коины у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removebusines)\s?([0-9]+)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 4) return message.send(`[🚀] » Доступно с привилегии - Moder `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removebusines [ID] [1-5]'`);
		if(message.args[2] < 1 || message.args[2] > 5) return bot(`используйте: removebusines [ID] [1-5]`);
		if(users[message.args[1]].business.length < message.args[2]) return bot(`нет такого бизнеса`);
		message.args[2]--;
		users[message.args[1]].business.splice(message.args[2], 1);
	return message.send(`[💰] » Вы забрали бизнес №${message.args[2]+1} у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removecars)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removecars [ID]'`); 
	users[message.args[1]].cars = 0; 
	return message.send(`[💰] » Вы забрали машину у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removerating)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removerating [ID]'`); 
	users[message.args[1]].rating = 0; 
	return message.send(`[💰] » Вы забрали весь рейтинг у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removerub)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removerub [ID]'`); 
	users[message.args[1]].balance = 0; 
	return message.send(`[💰] » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removebans)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 7) return message.send(`[🚀] » Доступно с привилегии - Создатель`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removebans [ID]'`); 
	users[message.args[1]].ainfo,bans = 0; 
	return message.send(`[💰] » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removerud)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 3) return message.send(`[🚀] » Доступно с привилегии - Хэлпер `);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`[💰] » Пример: 'removerud [ID]'`); 
	users[message.args[1]].ruda = 0; 
	return message.send(`[💰] » Вы забрали всю руду у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});



cmd.hear(/^(?:статистика)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(message.user.adm < 1) return message.send(`[🚀] » Вы не VIP-ДОСТУП`);
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`
			[🎀] ID беседы: ${message.chatId}.
			[✉] Сообщений собрано: ${stats.messages.inbox}.
			[📗] Пользователей: ${users.length}
	 		[❗] Заблокировано: ${blocked}
	 		[✔] Uptime : ${uptime.days}д. ${uptime.hours}ч. ${uptime.min}минут. ${uptime.sec}с.
	 		[🙎‍♂️] Новых игроков с момента старта: ${stats.new_users}.`);
	}); 

	cmd.hear(/^all\s([^]+)/i, async (message, args, bot) => {   
	if(!message.args[1]) return message.send(`[🚀] » Введите текст рассылки`)
   if(message.user.adm < 4) return message.send(`[🚀] »Вы не Owner`)
      let i = config;
		
		for(x in i.full){if(!i.full[id]) return;} 
		for(i=0;i<20000;i++){	
			if(users[i]){
				vk.api.call("messages.send", {
					peer_id: users[i].id,
					message: `[🚀] » Обьявление от @id${message.user.id}(${message.user.tag}) \n💎${message.args[1]}💎`
				})  	
			}
		}
	});


		cmd.hear(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.adm < 1) return message.send(`🔸 » Вам не доступно! `);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 99999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-99999)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	users[message.args[1]].ban = true;

	setTimeout(() => {
			users[id].ban = false;
			vk.api.call('messages.send', {
				peer_id: users[message.args[1]].id,
				message: `[🚀] » Вы были выпущены из тюрьмы | Больше не нарушайте :)`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: users[id].id,
		message: `[🚀] » ${message.user.tag} Посадил вас  в тюрьму на [${message.args[2]}] минут(ы). по причине ${message.args[3]}`
	});
	return message.send(`[🚀] » Вы посадили в тюрьму игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} минут`); 
});

cmd.hear(/^(?:unjail)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 1) return message.send(`🔸 » Вы не Разраб`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`[🚀] » Проверьте вводимые данные:\n[🚀] » unjail [ID]`); 
	 
	 users[message.args[1]].ban = false;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `[🚀] » Вы были выпущены из тюрьмы досрочно | Больше не нарушайте :)`
	});
	return message.send(`[🚀] » Вы выпустили  игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })] из тюрьмы`);
	 
});

cmd.hear(/^(?:!пострассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.adm < 6) return;
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
        return message.send(`[🚀] || Я успешно сделал рассылку!`);
 
})

cmd.hear(/^(?:!рассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.adm < 6) return bot(`доступно с привилегии - Owner.`);
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `${message.args[1]}` });
        }
        return message.send(`[🚀] || Я успешно сделал рассылку! Посмотрите, как будет видно другим:\n\n,Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
})

cmd.hear(/^(?:setmoney)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
if(message.user.adm < 1) return message.send(`[🚀] » Вы не VIP-ДОСТУП`);
if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
if(message.user.adm == 1){
if(!message.args[1] || message.args[1] < 0 || message.args[1] > 500000) return message.send(`[🚀] » Пример: 'giverub [1-500.000]'`);
message.user.balance += Number(message.args[1]);
}
if(message.user.adm == 2){
if(!message.args[1] || message.args[1] < 0 || message.args[1] > 1000000) return message.send(`[🚀] » Пример: 'giverub [1-1.000.000]'`);
message.user.balance += Number(message.args[1]);
} 
if(message.user.adm == 3){
if(!message.args[1] || message.args[1] < 0 || message.args[1] > 1500000) return message.send(`[🚀] » Пример: 'giverub [1-1.500.000]'`);
message.user.balance += Number(message.args[1]);
} 
message.user.giverub = true;
setInterval(() => {
message.user.giverub = false;
}, 3600000);

return message.send(`[🚀] » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.hear(/^(?:mute)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.adm < 1) return message.send(`[🚀] » Вы не имеете VIP-ДОСТУП`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 99999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » mute [ID] [TIME(1-999)] [ПРИЧИНА]`);
	let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	users[message.args[1]].ban = true;

	setTimeout(() => {
			users[id].ban = false;
			vk.api.call('messages.send', {
				peer_id: users[message.args[1]].id,
				message: `[🚀] » Вы были размучены. Больше не нарушайте!`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: users[id].id,
		message: `[🚀] » ${message.user.tag} Замутил вас на [${message.args[2]}] минут(ы). по причине ${message.args[3]}`
	});
	return message.send(`[🚀] » Вы замутили игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} минут`); 
});
//unmute
cmd.hear(/^(?:unmute)\s?([0-9]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.adm < 1) return message.send(`🔸 » Вы не имеете VIP-ДОСТУП`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`[🚀] » Проверьте вводимые данные:\n⏺ » unmute [ID]`); 
	 
	 users[message.args[1]].ban = false;
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `[🚀] » Администратор [${message.user.tag}] снял с вас мут. Больше не нарушайте:)`
	});
	return message.send(`[🚀] » Вы размутили игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })]`);
	 
});

cmd.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`[🚀] » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`[🚀] » Число должно быть цифрового вида.`);
		if(message.user.adm < 2) return message.send(`[🚀] » Вы не MVP`);
		if(!users[message.args[1]]) return message.send(`[❎] » Такого игрока нет!`);

		users[message.args[1]].warn += 1;  
        users[message.args[1]].warn_p = `${message.args[2]}`

		let text = `[🚀] » [${message.user.tag}] выдал вам варн по причине: [${message.args[2]}]`
		if(users[message.args[1]].warn == 3){
			users[message.args[1]].warn = 0;
			users[message.args[1]].ban = true; 
			text += `\n[🚀] » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`[🚀] » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].\n[🚀] По причине: [${message.args[2]}]`);
	}); 
//unwarn
	cmd.hear(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`[🚀] » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`[🚀] » Число должно быть цифрового вида.`);
		if(message.user.adm < 2) return message.send(`[🚀] » Вы не MVP`);
		if(!users[message.args[1]]) return message.send(`[🚀] » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `[🚀] » Администратор [${message.user.tag}] снял Вам все предупреждения`
		}); 
		return message.send(`[🚀] » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
	});
	
	
	cmd.hear(/^(?:vig)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`[🚀] ⇢ Пример команды: vig [ID] [ПРИЧИНА] `);
		if(!Number(message.args[1])) return message.send(`[🚀] ⇢ Число должно быть цифрового вида.`);
		if(message.user.adm[2] < 4) return message.send(`[🚀] ⇢ Вы не Гл.Администратор`);
		if(message.user.adm[1] < 1) return message.send(`[🚀] ⇢ Данный игрок не Администратор.`);
		if(!users[message.args[1]]) return message.send(`[🚀] ⇢ Такого игрока нет!`);

		users[message.args[1]].vig += 1;  
        users[message.args[1]].vig_p = `${message.args[2]}`

		let text = `[🚀] » [${message.user.tag}] выдал вам админ-выговор.\n[🚀] ⇢ После 3 вас снимет с админ-поста.\n[🚀] По причине: [${message.args[2]}]`
		if(users[message.args[1]].vig == 3){
			users[message.args[1]].vig = 0; 
			text += `\n[🚀] ⇢ У вас 3 выговора.\n[🚀] ⇢ Вы были.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`[🚀] ⇢ Вы выдали выговор игроку  [${users[message.args[1]].tag}].\n[🚀] По причине: [${message.args[2]}]`);
	}); 


		cmd.hear(/^(?:unvig)\s?([0-9]+)?/i, async (message, args, bot) => { 
		message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`[🚀] » Пример команды: unvig [ID]`);
		if(!Number(message.args[1])) return message.send(`[🚀] » Число должно быть цифрового вида.`);
		if(message.user.adm < 4) return message.send(`[🚀] » Вам не доступно!`);
		if(!users[message.args[1]]) return message.send(`[🚀] » Такого игрока нет!`);

		users[message.args[1]].vig = 0; 
		users[message.args[1]].vig_p = `Нету`;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `[🚀] » Администратор [${message.user.tag}] снял Вам все выговоры`
		}); 
		return message.send(`[🚀] » Вы сняли все выговоры игроку [${users[message.args[1]].tag}].`);
	});

cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.user.foolder += 1;
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.adm < 3) return message.send(`[🚀] ⇢ Доступно с привилегии - Хэлпер`);
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.balance += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор [${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});
cmd.hear(/^(?:снять)\s(?:руб|rub|рубл|рубли)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.user.foolder += 1;
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.adm < 3) return message.send(`[🚀] ⇢ Доступно с привилегии - Хэлпер`);
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 
if(user.balance <= message.args[2]) return bot(`Больше баланса нельзя`) 
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.balance -= message.args[2]; 


await bot(`вы сняли у игрока ${user.tag} ${utils.sp(message.args[2])}$`);
} 
});

cmd.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.adm === 6) {
       if(!message.args[1] || !message.args[2]) return message.send(`[🚀] >> Пример команды: giveadm [ID] [LVL(1-5)]`); 
		if(message.args[2] > 5) return message.send(` [🚀] >> Максимальный админ-уровень 5!`)
		if(message.args[2] < 1) return message.send(` [🚀] >> Минимальный админ-уровень 1!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		if(users[message.args[1]].adm > message.user.adm) return message.send(`Error.`)
		users[message.args[1]].adm = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `[🚀] » ${user.tag} Вам выдали Пользователя.`
		}); 
		return message.send(` [🚀] >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n[🚀] >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Пользователь").replace(/1/gi, "Вип").replace(/2/gi, "MVP").replace(/3/gi, "Хэлпер").replace(/4/gi, "Moderator").replace(/5/gi, "Admin").replace(/6/gi, "Gl.Admin").replace(/7/gi, "Пользователь")}]`);
		vk.api.call("messages.send", {
			peer_id: /*265374671*/220302713,
			message: `${message.reply} 👉 ➾ Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		}
		if(message.user.adm < 7||message.user.uid === 215) {
       if(!message.args[1] || !message.args[2]) return message.send(`[🚀] >> Пример команды: giveadm [ID] [LVL(1-7)]`); 
		if(message.args[2] > 7) return message.send(` [🚀] >> Максимальный админ-уровень 7!`)
		if(message.args[2] < 1) return message.send(` [🚀] >> Минимальный админ-уровень 1!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].adm = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `[🚀] » ${user.tag} Вам выдали Пользователя.`
		}); 
return message.send(` [🚀] >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n[🚀] >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Пользователь").replace(/1/gi, "Вип").replace(/2/gi, "MVP").replace(/3/gi, "Хэлпер").replace(/4/gi, "Moderator").replace(/5/gi, "Admin").replace(/6/gi, "Gl.Admin").replace(/7/gi, "Пользователь")}]`);}
});
cmd.hear(/^(?:removeadm)\s?([0-9]+)?/i, async (message, args, bot) => {
	message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		let adms = users[message.args[1]].adm 
        if(message.user.adm < 6) return message.send(`Вам не доступно!`)
       if(!message.args[1]) return message.send(`[🚀] >> Пример команды: remobeadm [ID]`); 
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		if(message.user.adm < users[message.args[1]].adm) return message.send(`Error.`)
		users[message.args[1]].adm = 0; 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `[🚀] » ${user.tag} Вас сняли с должности Администратора!`
		}); 
		return message.send(` [🚀] >> Вы сняли игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] с Адинистративного уровня [${adms}]  `);
	});


cmd.hear(/^(?:банреп | Репбан)\s([0-9]+)$/i, async (message, bot) => {
    message.user.foolder += 1;
    if(message.user.adm < 1) return;
    let user = users.find(x=> x.uid === Number(message.args[1]));
 
    if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
 
    if(user.banreport)
    {
        user.banreport = false;
        await bot(`Пользователю ${user.tag} заблокирован репорт.`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `Вам сняли бан репорта`
        });
    } else {
        user.banreport = true;
        await bot(`Пользователю ${user.tag} разблокирован репорт.`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `Вы получили бан репорта, теперь вы не можете писать в репорт.`
        });
    }
});
cmd.hear(/^(?:дать | givecmdban)\s([0-9]+)$/i, async (message, bot) => {
    message.user.foolder += 1;
    if(message.user.adm < 6) return;
    let user = users.find(x=> x.uid === Number(message.args[1]));
 
    if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
 
    if(user.abans)
    {
        user.abans = false;
        await bot(`Вы забрали у пользователя ${user.tag} возможность "бана".`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `У вас забрали возможность бана.`
        });
    } else {
        user.abans = true;
        await bot(`Вы выдали пользователю ${user.tag} возможность бана.`);
 
        if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `Вам выдали возможность бана.`
        });
    }
});


cmd.hear(/^(?:спец)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.adm > 1) {

	return bot(`
		👑 → Амдинистратор - Команды ← 👑
	
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	
	`);
	}
	if(message.user.adm > 4) {

	return bot(`
		👑 → Амдинистратор - Команды ← 👑
	
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] All - сделать объявление.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] рассылка - сделать рассылку.
	[🚀] пострассылка - сделать рассылку с постом.
	[🚀] поиск [id] - найти игрока.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	`)};
	if(message.user.adm === 7) {

	return bot(`
		👑 → мудила- Команды ← 👑
	
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] All - сделать объявление.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] рассылка - сделать рассылку.
	[🚀] пострассылка - сделать рассылку с постом.
	[🚀] поиск [id] - найти игрока.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	[🚀] givevip [id] - Выдать VIP игроку.
	[🚀] givemvp [id] - Выдать MVP игроку.
	[🚀] givemvph [id] - Выдать Хэлпер игроку.
	[🚀] кикнуть [id] 
	[🚀] раздача ??
	[🚀] Браздача ??
	`);}

});

cmd.hear(/(?:бонус|🔑 Бонус|🔑 Бонус)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.adm < 1){
	if(message.user.bonustime > getUnix()) return bot(`рано пришел, приходи через ${unixStampLeft(message.user.bonustime - Date.now())}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

   getUnix() + 86400000

	if(prize === 1)
	{
		message.user.balance += 50000;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 50.000$ ${smilesuccess}`);
	}

	if(prize === 2) 
	{
		message.user.coins += 1000;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 1.000 коинов ${smilesuccess}`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 5👑`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 1👑`);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 10👑`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 2👑`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 3👑`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 4👑`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 1.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 5.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли 10.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		message.user.rating += 5;
		message.user.bonustime = getUnix() + 86400000;
		return bot(`вы выиграли в Казино Удача-леприкона 50.000.000 $ на свой банковский счёт и 5👑 ${smilesuccess}`);
	}
	}
	if(message.user.adm > 1){
	if(message.user.bonustime > getUnix()) return bot(`рано пришел, приходи через ${unixStampLeft(message.user.bonustime - Date.now())}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

   getUnix() + 3600000

	if(prize === 1)
	{
		message.user.balance += 50000;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 50.000$ ${smilesuccess}`);
	}

	if(prize === 2) 
	{
		message.user.coins += 1000;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 1.000 коинов ${smilesuccess}`);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 5👑`);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 1👑`);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 10👑`);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 2👑`);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 3👑`);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 4👑`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 1.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 5.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли 10.000.000 $ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		message.user.rating += 5;
		message.user.bonustime = getUnix() + 3600000;
		return bot(`вы выиграли в Казино Удача-леприкона 50.000.000 $ на свой банковский счёт и 5👑 ${smilesuccess}`);
	}
	}
});


cmd.hear(/^(?:поход)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.user.poxod > getUnix()) return bot(`вы сегодня уже были в походе,приходите через ${unixStampLeft(message.user.poxod - Date.now())}`);

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

    getUnix() + 60000

	if(prize2 === 1)
	{
		message.user.balance += 5000;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 5.000 $ ${smilesuccess}`);
	}

	if(prize2 === 2)
	{
		message.user.coins += 20;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 20💎 ${smilesuccess}`);
	}

	if(prize2 === 3)
	{
		message.user.rating += 5;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 5👑`);
	}

	if(prize2 === 4)
	{
		message.user.rating += 1;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 1👑`);
	}

	if(prize2 === 5)
	{
		message.user.rating += 6;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 6👑`);
	}

	if(prize2 === 6)
	{
		message.user.rating += 2;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 2👑`);
	}
	if(prize2 === 7)
	{
		message.user.rating += 3;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 3👑`);
	}
	if(prize2 === 8)
	{
		message.user.rating += 4;
		message.user.poxod = getUnix() + 60000;
		return bot(`находясь в походе, вы нашли 4👑`);
	}
	if(prize2 === 9)
	{
		message.user.bank += 25000;
		message.user.poxod = getUnix() + 60000;
		return bot('находясь в походе, вы нашли 25.000 $ на банковский счет!')
	}	
});
cmd.hear(/^(?:видео)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
       vk.api.call('video.search', {q: message.args[1], count: 10, adult: 0, access_token: '5ed4b326f0798f88eaf223fadd7482b148c3dd138ae50e1b3fd387c0818d36e9daa67e7a81830c4eeac97'})
        .then(response => {
            let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
			return bot(`видео по запросу "${message.args[1]}"`,	
			{
				attachment: items

			}),
		message.sendSticker(10053)
        })
});
cmd.hear(/^(?:гиф)\s(.*)$/i, async (message, bot) => {
		let a = zapret(message.args[1]);
		if(a != 0) return message.send(a);
	message.user.foolder += 1;
       vk.api.call('docs.search', {q: message.args[1] + '.gif', count: 10})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
        if(!items === 0) return message.send(`гифки по запросу "${message.args[1]}" не найдены!`);
            return bot(`гифки по запросу "${message.args[1]}"`, 
            {
            	attachment: items
            }),
		message.sendSticker(10053)
        });
});

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

//БОТ
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

            Shark Bot | Беседа #1
			https://vk.me/join/AJQ1dwz2hBCjd0zTDR3ebxId

          
			`);
});

//бот информация
cmd.hear(/^(?:бот|🤖 Бот|@botssahk 🤖 Бот|@botssahk🤖 Бот)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`
	[📖] ⇢ Техническая информация:

     ♥️ ⇢ Проект: @botsshark (Shark Bot)
	 💻 ⇢ Версия бота: 3.0
	 💊 ⇢ Создатель: @riconc(Алексей Гусаров)  
	 📗 ⇢ Пользователей: ${users.length}
	 🚫 ⇢ Заблокировано: ${blocked}

	 ✔ ⇢ Uptime : ${uptime.days}д. ${uptime.hours}ч. ${uptime.min}м. ${uptime.sec}с.
	 ✉️ ⇢ Сообщений с момента старта: ${stats.messages.inbox}.
	 🙎‍♂️ ⇢ Новых игроков с момента старта: ${stats.new_users}.

	 📜 ⇢ @botsshark(Наша группа!)
`);
});	

cmd.hear(/^(?:Деньги)\s?(.*)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.misc.pk&&!message.user.misc.phone) return bot(`У вас нет компьютера или телефона`);
	if(message.args[1] > message.user.coins) return bot(`недостаточно коинов`);
	let a = Math.floor(coins * message.args[1]);

	message.user.balance += Math.floor(a);
	message.user.coins -= message.args[1];

	return bot(`вы продали ${message.args[1]}💎 за ${utils.sp(a)} $`);
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
		let b = (cars[message.user.transport.car - 1].name)

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали "${b}" за ${utils.sp(a)} $`, {
			attachment: "photo-178650735_456239061"
			});
	}
	
	if(/велосипед/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.bicycle) return bot(`у вас нет  велосипеда ${smileerror}`);
		let a = Math.floor(bicycles[message.user.transport. bicycle - 1].cost * 0.85);
		let b = (bicycles[message.user.transport.bicycle - 1].name)

		message.user.coins += Math.floor(bicycles[message.user.transport.bicycle - 1].cost * 0.85);
		message.user.transport.bicycle = 0;

		return bot(`вы продали "${b}" за ${utils.sp(a)} $`, {
			attachment: "photo-178650735_456239061"
			});
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома ${smileerror}`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		let b = (homes[message.user.realty.home - 1].name)

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали "${b}" за ${utils.sp(a)} $` , {
			attachment: "photo-178650735_456239101"
			});
	}

	if(/питом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.pet) return bot(`у вас нет питомца ${smileerror}`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		let b = (pets[message.user.misc.pet - 1].name)

		message.user.balance += Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		message.user.misc.pet = 0;
		message.user.pet.lvl = 0;
		message.user.pet.poterl = false;

		bot(`вы продали "${b}" за ${utils.sp(a)} $`);
		return message.sendSticker(10053);
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

		return bot(`вы продали свои фермы (${options.count} шт.) за ${utils.sp(a)} $`);
	}

	if(/шахт/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.misc.shaxt == 0) return bot(`У вас нет шахты`);
		if(options.count > message.user.misc.shaxt_count) return bot(`У вас нет столько шахт`);
		if(options.count <= 0) return bot(`Вы не можете продать столько шахт`);
		let a = Math.floor(shaxts[message.user.misc.shaxt - 1].cost * options.count * 0.85);

		message.user.balance += a;
		message.user.misc.shaxt_count -= options.count;
		if(message.user.misc.shaxt_count == 0) message.user.misc.shaxt = 0;

		return bot(`Вы продали свои шахты (${options.count} шт.) за ${utils.sp(a)} $ `)
	}	

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
		message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
		message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');		
		message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rating);
	
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга ${smileerror}`);
		let a = (150000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))} $ `);
	}

		if(/руд/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.tpcoins) return bot(`недостаточно руды`);
		let a = Math.floor(tpcoins * options.count);

		message.user.balance += Math.floor(a);
		message.user.tpcoins -= options.count;

		return bot(`вы продали ${options.count} кг руды за ${utils.sp(a)} $`);
	}

    if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		
		if(message.user.adm < 5) {
		if(message.user.business.length == 0) return bot(`у вас нет бизнеса`);
		if(options.count < 1 || options.count > 2) return bot(`используйте: Продать бизнес [1 - 5]`);
		if(message.user.business.length < options.count) return bot(`у вас нет этого бизнеса`);
		options.count--;
		let a = Math.floor(businesses[message.user.business[options.count].id - 1][message.user.business[options.count].upgrade - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business.splice(options.count, 1);

		return bot(`вы продали свой бизнес за ${ utils.sp(a) }$`);
		
		}else{(message.user.adm > 5) 
		if(message.user.business.length == 0) return bot(`у вас нет бизнеса`);
		if(options.count < 1 || options.count > 5) return bot(`используйте: Продать бизнес [1 - 5]`);
		if(message.user.business.length < options.count) return bot(`у вас нет этого бизнеса`);
		options.count--;
		message.user.balance += Math.floor(a);
		message.user.business.splice(options.count, 1);

		return bot(`вы продали свой бизнес за ${ utils.sp(a) }$`);}
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта ${smileerror}`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		let b = (airplanes[message.user.transport.airplane - 1].name)

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали "${b}" за ${utils.sp(a)} $` , {
			attachment: "photo-178650735_456239120"
			});
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона ${smileerror}`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		let b = (phones[message.user.misc.phone - 1].name);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;
		message.user.number = 0;
		message.user.operator = 0;

		return bot(`вы продали свой "${b}" за ${utils.sp(a)} $` , {
			attachment: "photo-178650735_456239133"
			});
	}

	    if(/компьютер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.pk) return bot(`У вас нет компьютера`);
		let a = Math.floor(peka[message.user.misc.pk - 1].cost * 0.85);
		let b = (peka[message.user.misc.pk - 1].name)

		message.user.balance += Math.floor(peka[message.user.misc.pk - 1].cost * 0.85);
		message.user.misc.pk = 0;

		return bot(`Вы продали "${b}" за ${utils.sp(a)} $` , {
			attachment: "photo-178650735_456239134"
			});
	}

		if(/желез/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zhelezo < 1) return bot(`у Вас нет железа. ⚠`);
		let a2 = message.user.zhelezo * 1000;

		var zhelezosda = message.user.zhelezo;

		message.user.balance += message.user.zhelezo * 1000;
		message.user.zhelezo = 0;

		return bot(`вы продали ${zhelezosda} железа за ${utils.sp(a2)}$ ✅`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.almaz < 1) return bot(`у Вас нет алмазов. ⚠`);
		let a3 = message.user.almaz * 1500;

		var zhelezosda2 = message.user.almaz;

		message.user.balance += message.user.almaz * 1500;
		message.user.almaz = 0;

		return bot(`вы продали ${zhelezosda2} алмазов за ${utils.sp(a3)}$ ✅`);
	}

	if(/золот/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zoloto < 1) return bot(`у Вас нет золота. ⚠`);
		let a4 = message.user.zoloto * 1600;

		var zhelezosda3 = message.user.zoloto;

		message.user.balance += message.user.zoloto * 1600;
		message.user.zoloto = 0;

		return bot(`вы продали ${zhelezosda3} золота за ${utils.sp(a4)}$ ✅`);
	}

	if(/уголь|угл/i.test(message.args[1].toLowerCase()))
	{
	    if(message.user.ugol < 1) return bot(`у вас нет угля. ⚠`);	
	    let a5 = message.user.ugol * 900;

	    var zhelezosda4 = message.user.ugol;

	    message.user.balance += message.user.ugol * 900;
	    message.user.ugol = 0;

	    return bot(`вы продали ${zhelezosda4} угля за ${utils.sp(a5)}$ ✅`);
	}

		if(/рубин/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.rubin < 1) return bot(`у Вас нет рубинов. ⚠`);
		let a6 = message.user.rubin * 1900;

		var zhelezosda5 = message.user.rubin;

		message.user.balance += message.user.rubin * 1900;
		message.user.rubin = 0;

		return bot(`вы продали ${zhelezosda5} рубинов за ${utils.sp(a6)}$ ✅`);
	}

			if(/платин/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.platina < 1) return bot(`у Вас нет платины. ⚠`);
		let a7 = message.user.platina * 2100;

		var zhelezosda6 = message.user.platina;

		message.user.balance += message.user.platina * 2100;
		message.user.platina = 0;

		return bot(`вы продали ${zhelezosda5} платины за ${utils.sp(a6)}$ ✅`);
	}
});	




setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	coins = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	coins = Math.floor(Number(rq.ticker.price));
}, 60000);

setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	tpcoins = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	tpcoins = Math.floor(Number(rq.ticker.price));
}, 60000);


cmd.hear(/^(?:РП действие||РП||действие)\s(.*)$/i, async (message, bot) => {
	return bot(` ${message.user.tag} ${message.args[1]}`);
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
	if(message.user.misc.pk) return bot(`У вас уже есть компьютер (${peka[message.user.misc.pk - 1].name}), введите "Продать компьютер"`);

	if(message.user.balance < sell.cost) return bot(`Недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.pk = sell.id;

		return bot(`Вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});


cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
message.user.foolder += 1;

	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '📲' : '📱'} 1. Nokia 105 (1.500$)
${message.user.misc.phone === 2 ? '📲' : '📱'} 2. Philips Xenium E168 (4.000$) 
${message.user.misc.phone === 3 ? '📲' : '📱'} 3. Xiaomi Redmi 6A 2 (6.000$) 
${message.user.misc.phone === 4 ? '📲' : '📱'} 4. Digma LINX ATOM 3G (9.000$) 
${message.user.misc.phone === 5 ? '📲' : '📱'} 5. Alcatel 1 (12.000$) 
${message.user.misc.phone === 6 ? '📲' : '📱'} 6. Honor 9 Lite (20.000$) 
${message.user.misc.phone === 7 ? '📲' : '📱'} 7. Samsung Galaxy J6 (36.000$)
${message.user.misc.phone === 8 ? '📲' : '📱'} 8. IPhone 5 (60.000$)
${message.user.misc.phone === 9 ? '📲' : '📱'} 9. Xperia XZ Premium (100.000$)
${message.user.misc.phone === 10 ? '📲' : '📱'} 10. Samsung Galaxy J8 (300.000$) 
${message.user.misc.phone === 11 ? '📲' : '📱'} 11. IPhone X (1.500.000$)
${message.user.misc.phone === 12 ? '📲' : '📱'} 12. IPhone 3GS Supreme (5.000.000$)

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

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
     message.user.foolder += 1;

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

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
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

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $` , {
			attachment: sell.att
	});
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🔸' : '🚗'} 1. Lada 2110 (50.000$)
${message.user.transport.car === 2 ? '🔸' : '🚗'} 2. Hyundai Solaris (250.000$)
${message.user.transport.car === 3 ? '🔸' : '🚗'} 3. Toyota Camry (1.000.000$)
${message.user.transport.car === 4 ? '🔸' : '🚗'} 4. BMW 5 (100.000.000$)
${message.user.transport.car === 5 ? '🔸' : '🚗'} 5. Mercedes - Benz (5.000.000.000$)
${message.user.transport.car === 6 ? '🔸' : '🚗'} 6. Lamborghini Huracan (100.000.000.000)
${message.user.transport.car === 7 ? '🔸' : '🚗'} 7. Rolls Roys Wrath (50.000.000.000.000$)

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

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} $`, {
			attachment: sell.att
	});
	}
});

cmd.hear(/^(?:велосипеды|велосипед)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Велосипеды: 
${message.user.transport.bicycle === 1 ? '🔸' : '🛴'} 1. ELOPS 520 B'TWIN (20.000)
${message.user.transport.bicycle === 2 ? '🔸' : '🛴'} 2. Stern Rocket 20' (100.000)
${message.user.transport.bicycle === 3 ? '🔸' : '🛴'} 3. ST520 27,5' ROCKRIDER (250.000)
${message.user.transport.bicycle === 4 ? '🔸' : '🛴'} 4. [BMX]Subrosa Tiro 20' (400.000)
${message.user.transport.bicycle === 5 ? '🔸' : '🛴'} 5. [BMX] FORWARD Zigzag (500.000)
${message.user.transport.bicycle === 6 ? '🔸' : '🛴'} 6. [BMX] Stark Gravity (600.000)
${message.user.transport.bicycle === 7 ? '🔸' : '🛴'} 7. [BMX] Blitz Mini M1 10' (800.000)

⚠ ⇢ Для покупки введите "Велосипед [номер]"
⚠ ⇢ Для продажи машины "Продать Велосипед"`);

	const sell = bicycles.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.bicycle) return bot(`у вас уже есть Велосипед (${bicycles[message.user.transport.bicycle - 1].name}), введите "Продать велосипед"`);

	if(message.user.coins < sell.cost) return bot(`недостаточно коинов`);
	else if(message.user.coins >= sell.cost)
	{
		message.user.coins -= sell.cost;
		message.user.transport.bicycle = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} коинов`, {
			attachment: sell.att
	});
	}
});

cmd.hear(/^(?:автомобиль)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.transport.car) return bot(`у вас нет машины ${smileerror}`);

	return bot(`информация о вашей машине:
	
	📋 Название: ${cars[message.user.transport.car - 1].name}
	💰 Стоимость: ${utils.sp(cars[message.user.transport.car - 1].cost)} $`, {
		attachment: cars[message.user.transport.car - 1].att
	}); 
});

//dimka
cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
cmd.hear(/^(?:translate)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	var args = message.text.split("переведи ");
    rq(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171222T132221Z.fbf2cf596e2b761e.a1b798767f783060345b01389031ac433c854493&lang=ru&text=${encodeURIComponent(message.args[1])}`).then((res) => {
      return bot(`результат: ${res.text}`);
  });
cmd.hear(/^(?:переведи)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	var args = message.text.split("переведи ");
    rq(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171222T132221Z.fbf2cf596e2b761e.a1b798767f783060345b01389031ac433c854493&lang=en&text=${encodeURIComponent(message.args[1])}`).then((res) => {
      return bot(`результат: ${res.text}`);
  });
});
})

//AKULLAAA
cmd.hear(/^(?:питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`питомцы:
🦆 1) Утка (50.000$)
🐓 2) Петух (150.000$)
🐒 3) Обезьяна (300.000$)
🐵 4) Мыртышка (900.000$)
🐎 5) Лошадь (1.500.000$)
🐘 6) Слон (2.500.000$)
🦁 7) Гепард (30.000.000$)

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

		bot(`вы успешно купили себе питомца, отправляйте его в поход и прокачивайте его уровень. ${smilesuccess}`);
			return message.sendSticker(10053)
	}
});


cmd.hear(/^(?:питомец)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {
return bot(`информация:
🌸 Питомец: «${pets[message.user.misc.pet - 1].name}»
💳 Стоимость улучшения: ${utils.sp(petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl)}$
🌟 Уровень: ${message.user.pet.lvl}`, {
		attachment: pets[message.user.misc.pet - 1].att
		}); 
}

});

cmd.hear(/^(?:питомец улучшить)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`недостаточно денег. ${smileerror}`);

		var priceupd = petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl;

		var lvlpoupd = message.user.pet.lvl+1;

		message.user.balance -= priceupd;
		message.user.pet.lvl += 1;

		bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
			return message.sendSticker(9214)

}

});

cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => { 
	message.user.foolder += 1;
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`); 
else { 

if(message.user.petpoxod > getUnix()) return bot(`ваш питомец довольно сильно устал!\n Вы сможете отправить питомца в поход через ${unixStampLeft(message.user.petpoxod - Date.now())}`);

getUnix() + 600000

if(message.user.misc.pet === 1) { 

let cashfind = utils.random(5000,10000); 
message.user.balance += cashfind;
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 2) { 

let cashfind = utils.random(8000,20000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 3) { 

let cashfind = utils.random(9000,30000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 4) { 

let cashfind = utils.random(9800, 35000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 5) { 

let cashfind = utils.random(10000, 38000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 6) { 

let cashfind = utils.random(10200, 40000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 

if(message.user.misc.pet === 7) { 

let cashfind = utils.random(11000, 45000); 
message.user.balance += cashfind; 
message.user.petpoxod = getUnix() + 600000; 

return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`); 
} 
} 

});

function zapret(text) {
 		let text1 = text.toLowerCase();
 		let texts = 0;
 		let stat = false;
		var zaprets = /(пизда|ебут в жопу|соска|соски|сосёт|мамка|мамки|брат с сестрой|сперма|ебалка|вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zaprets.test(text1) == true) { 
				texts = `📗 ➾ Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 ➾ Некорректный запрос.` 
			stat = true; 
		}
		return texts
 	} 
cmd.hear(/^(?:cid)$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`[🎉] » ID этого чата: ${message.chatId}`);
	});   

///////////////////////РЕПОРТЫ
cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`команда работает только в ЛС.`);

	vk.api.messages.send({ chat_id: 53, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		return bot(`ваше сообщение отправлено.`);
	}).catch((err) => {
		return bot(`произошла ошибка при отправлении сообщения технической поддержке.`);
	});
});
cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 469284392| message.senderId !== 469284392) return;

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


cmd.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.adm < 2) return
		let a = zapret(message.args[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: users[message.args[1]].id,
			message: `👉 ➾ Администратор: ${message.user.tag} ответил Вам:\n👉 ${message.args[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [message.user, message.text] 
		message.user.ainfo.all_ans += 1;
		message.user.ainfo.ans += 1;
	    users[message.args[1]].rep.status = true;
		users[message.args[1]].rep.id = Number(message.user.uid);
		return message.send(`👉 ➾ Ответ отправлен.`)
	});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i , async (message, bot) => {
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


//Бизнесы
cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.adm < 5) {
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)} $\nПрибыль: ${utils.sp(businesses[i][0].earn)} $/час\n`;
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
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
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
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
	if(message.user.adm > 1) { 
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)} $\nПрибыль: ${utils.sp(businesses[i][0].earn)} $/час\n`;
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
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
Для покупки введите "Бизнесы [номер]"`);*/

	if(message.user.business.length == 3) return bot(`куда тебе больше?`);

	message.args[1] = Number(message.args[1]) - 1;
	const sella = businesses[message.args[1]][0];
	if(sella == null) return;
	if(message.user.balance < sella.cost) return bot(`недостаточно денег`);
	message.user.balance -= sella.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sella.name}" за ${utils.sp(sella.cost)}$`);
	}
	if(message.user.adm > 3) { 
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)} $\nПрибыль: ${utils.sp(businesses[i][0].earn)} $/час\n`;
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
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
Для покупки введите "Бизнесы [номер]"`);*/

	if(message.user.business.length == 4) return bot(`куда тебе больше?`);

	message.args[1] = Number(message.args[1]) - 1;
	const sella = businesses[message.args[1]][0];
	if(sella == null) return;
	if(message.user.balance < sella.cost) return bot(`недостаточно денег`);
	message.user.balance -= sella.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sella.name}" за ${utils.sp(sella.cost)}$`);
	}
	if(message.user.adm > 5) { 
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)} $\nПрибыль: ${utils.sp(businesses[i][0].earn)} $/час\n`;
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
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
Для покупки введите "Бизнесы [номер]"`);*/

	if(message.user.business.length == 5) return bot(`куда тебе больше?`);

	message.args[1] = Number(message.args[1]) - 1;
	const sella = businesses[message.args[1]][0];
	if(sella == null) return;
	if(message.user.balance < sella.cost) return bot(`недостаточно денег`);
	message.user.balance -= sella.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sella.name}" за ${utils.sp(sella.cost)}$`);
	}
	if(message.user.adm > 7) { 
	if(!message.args[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(message.user.business.length == 1 && message.user.business[0].id == i + 1) || (message.user.business.length == 2 && message.user.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)} $\nПрибыль: ${utils.sp(businesses[i][0].earn)} $/час\n`;
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
${message.user.business[0].id == 11 || message.user.business[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
Для покупки введите "Бизнесы [номер]"`);*/
	message.args[1] = Number(message.args[1]) - 1;
	const sella = businesses[message.args[1]][0];
	if(sella == null) return;
	if(message.user.balance < sella.cost) return bot(`недостаточно денег`);
	message.user.balance -= sella.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили "${sella.name}" за ${utils.sp(sella.cost)}$`);
	}
});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.user.business.length < 5) {
	if(message.args[1] < 1 || message.args[1] > 5) return bot(`используйте: Бизнес [1 - 5]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))} $/час
	💼 Рабочих: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)} $

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
	}else{(message.user.business.length > 5)
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))} $/час
	💼 Рабочих: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)} $

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
	}
});

cmd.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.user.business.length < 5) {
	if(message.args[1] < 1 || message.args[1] > 5) return bot(`используйте: Бизнес снять [1 - 5] [количество]`);
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

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])} $`);
	}else{(message.user.business.length > 5)
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

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])} $`);}
});

cmd.hear(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
if(message.user.business.length < 5) {
	if(message.args[1] < 1 || message.args[1] > 5) return bot(`используйте: Бизнес улучшить [1 - 2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)} $`);
}else{(message.user.business.length > 5)
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)} $`);}
});

cmd.hear(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(!message.args[1] || !message.args[2]) return bot(`используйте: Бизнес нанять [номер] [кол-во работников]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(message.user.business[message.args[1]].workers + message.args[2] > businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers) return bot(`в вашем бизнесе не может поместится столько работников`);
	const cost = message.args[2] * 0;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для покупки рабочих`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].workers += message.args[2];

	return bot(`вы наняли ${message.args[2]} рабочих для бизнеса #${message.args[1] + 1}`);
});

const shaxts = [
	{
		name: 'Алмазная',
		id: 1,
		cost: 1000000
	},
	{
		name: 'Визейская',
		id: 2,
		cost: 3000000
	},
	{
		name: 'Антрацит',
		id: 3,
		cost: 30000000
	},
	{
		name: 'Карбонит',
		id: 4,
		cost: 80000000
	},
	{
		name: 'Прогресс',
		id: 5,
		cost: 150000000
	},
	{
		name: 'Ударник',
		id: 6,
		cost: 400000000
	},
	{
		name: 'Возрождение',
		id: 7,
		cost: 800000000
	},
	{
		name: 'Новая',
		id: 8,
		cost: 2000000000
	},
	{
		name: 'Дальняя',
		id: 9,
		cost: 5000000000
	},
	{
		name: 'Россия',
		id: 10,
		cost: 10000000000
	}
];

cmd.hear(/^(?:шахты)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Шахты:
${message.user.misc.shaxt === 1 ? '💠' : '💠'} 1. Алмазная 1💠/час (1.000.000 $)
${message.user.misc.shaxt === 2 ? '💠' : '💠'} 2. Визейская 3💠/час (3.000.000 $)
${message.user.misc.shaxt === 3 ? '💠' : '💠'} 3. Антрацит 7💠/час (30.000.000 $)
${message.user.misc.shaxt === 4 ? '💠' : '💠'} 4. Карбонит 10💠/час (80.000.000 $)
${message.user.misc.shaxt === 5 ? '💠' : '💠'} 5. Прогресс 15💠/час (150.000.000 $)
${message.user.misc.shaxt === 6 ? '💠' : '💠'} 6. Ударник 20💠/час (400.000.000 $)
${message.user.misc.shaxt === 7 ? '💠' : '💠'} 7. Возрождение 30💠/час (800.000.000 $)
${message.user.misc.shaxt === 8 ? '💠' : '💠'} 8. Новая 50💠/час (2.000.000.000 $)
${message.user.misc.shaxt === 9 ? '💠' : '💠'} 9. Дальняя 100💠/час (5.000.000.000 $)
${message.user.misc.shaxt === 10 ? '💠' : '💠'} 10. Россия 125💠/час (10.000.000.000 $)	
Для покупки введите "Шахты [номер] [количество]"
Для продажи введите 'Продать шахты'`)

	const sell = shaxts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`Нельзя купить 0 шахт или меньше`);
	if(count + message.user.misc.shaxt_count > 1000) return bot(`Вы не можете иметь больше 1000 шахт одновременно ${smileerror}`)
	if(message.user.misc.shaxt != 0 && message.user.misc.shaxt != message.args[1]) return bot(`Вы не можете купить шахту другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`Недостаточно денег на вашем балансе ${smileerror}`);
	else if(message.user.balance >= sell.cost * count)
	{
        message.user.balance -= sell.cost * count;
        message.user.misc.shaxt = sell.id;
        message.user.misc.shaxt_count += count;

        return bot(`Вы купили "${sell.name}" (${count}x) за ${utils.sp(sell.cost * count)} $`);

	}
});	

cmd.hear(/(?:шахта)$/i, async (message, bot) => {
	if(!message.user.misc.shaxt) return bot(`У вас нет шахты ${smileerror}`);
	if(!message.user.shaxt_tpcoins) return bot(`На ваших шахтах еще нет руды. Новая руда появится через час`);

	const tpcoins_ = message.user.shaxt_tpcoins * message.user.misc.shaxt_count;

	message.user.tpcoins += tpcoins_;
	message.user.shaxt_tpcoins = 0;

	return bot(`Вы собрали ${utils.sp(tpcoins_)} кг, следующую руду вы сможете собрать через час
	💠 Руды: ${utils.sp(message.user.tpcoins)} кг `);	

});	

setInterval(async () => {
	users.filter(x=> x.misc.shaxt !== 0).map(x=> {
		if(x.misc.shaxt === 1)
		{
			x.shaxt_tpcoins += 1;
		}

		if(x.misc.shaxt === 2)
		{
		    x.shaxt_tpcoins += 3;
		}
		
		if(x.misc.shaxt === 3)
		{
			x.shaxt_tpcoins += 7;
		}    	

		if(x.misc.shaxt === 4)
		{
			x.shaxt_tpcoins += 10;
		}	

		if(x.misc.shaxt === 5)
		{
			x.shaxt_tpcoins += 15;
		}	

		if(x.misc.shaxt === 6)
		{
			x.shaxt_tpcoins += 20;
		}	

		if(x.misc.shaxt === 7)
		{
			x.shaxt_tpcoins += 30;
		}	

		if(x.misc.shaxt === 8)
		{
			x.shaxt_tpcoins += 50;
		}	

		if(x.misc.shaxt === 9)
		{
			x.shaxt_tpcoins += 100;
		}	

		if(x.misc.shaxt === 10)
		{
			x.shaxt_tpcoins += 125;
		}
	 });
}, 3600000);	 		



//Фермы
cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы:
${message.user.misc.farm === 1 ? '💎' : '🔋'} 1. Мини ферма 25💎/час (100.000.000 $)
${message.user.misc.farm === 2 ? '💎' : '🔋'} 2. Средняя ферма 50💎/час (500.000.000 $)
${message.user.misc.farm === 3 ? '💎' : '🔋'} 3. Большая ферма 110💎/час (780.000.000 $)
${message.user.misc.farm === 4 ? '💎' : '🔋'} 4. Корпорация 200💎/час (21.500.000.000 $)
${message.user.misc.farm === 5 ? '💎' : '🔋'} 5. Forbes 350💎/час (220.000.000.000 $)
Для покупки введите "Фермы [номер] [количество]"
Для продажи введите 'Продать фермы'`);

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

		return bot(`вы купили "${sell.name}" (${count}х) за ${utils.sp(sell.cost * count)} $`);
	}
});

cmd.hear(/(?:ферма|🔋 Ферма|@botsshark 🔋 Ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_coins) return bot(`на ваших фермах еще нет коинов. Новые койны появятся через час 🔎`);

	const coins_ = message.user.farm_coins * message.user.misc.farm_count;

	message.user.coins += coins_;
	message.user.farm_coins = 0;

	return bot(`вы собрали ${utils.sp(coins_)}, следующие коины появятся через час
	💎 Коинов: ${utils.sp(message.user.coins)}`);
});

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_coins += 25;
		}

		if(x.misc.farm === 2)
		{
			x.farm_coins += 50;
		}

		if(x.misc.farm === 3)
		{
			x.farm_coins += 110;
		}

		if(x.misc.farm === 4)
		{
			x.farm_coins += 200;
		}

		if(x.misc.farm === 5)
		{
			x.farm_coins += 350;
		}
	});
}, 3600000);


////////////РАБОТЫ

const works = [
	{
		name: 'Бомж',
		requiredLevel: 0,
		min: 2000,
		max: 2500,
		id: 1
	},
	{
		name: 'Дворник',
		requiredLevel: 10,
		min: 3750,
		max: 4000,
		id: 2
	},
	{
		name: 'Продавец',
		requiredLevel: 15,
		min: 4000,
		max: 4500,
		id: 3
	},
	{
		name: 'Няня',
		requiredLevel: 21,
		min: 6000,
		max: 8000,
		id: 4
	},
	{
		name: 'Курьер',
		requiredLevel: 29,
		min: 7500,
		max: 8500,
		id: 5
	},
	{
		name: 'Слесарь',
		requiredLevel: 34,
		min: 9000,
		max: 9489,
		id: 6
	},
	{
		name: 'Охранник',
		requiredLevel: 49,
		min: 10000,
		max: 12500,
		id: 7
	},
	{
		name: 'Библиотекарь',
		requiredLevel: 65,
		min: 12500,
		max: 13500,
		id: 8
	},
	{
		name: 'Воспитатель',
		requiredLevel: 95,
		min: 14500,
		max: 16500,
		id: 9
	},
	{
		name: 'Педагог',
		requiredLevel: 105,
		min: 16000,
		max: 17500,
		id: 10
	},
	{
		name: 'Повар',
		requiredLevel: 125,
		min: 17500,
		max: 18500,
		id: 11
	},
	{
		name: 'Грузчик',
		requiredLevel: 145,
		min: 19500,
		max: 20500,
		id: 12
	},
	{
		name: 'Парикмахер',
		requiredLevel: 175,
		min: 23500,
		max: 24500,
		id: 13
	},
	{
		name: 'Врач',
		requiredLevel: 230,
		min: 24500,
		max: 25500,
		id: 14
	},
	{
		name: 'Наркоторговец',
		requiredLevel: 270,
		min: 26500,
		max: 27500,
		id: 15
	},
	{
		name: 'Вор',
		requiredLevel: 310,
		min: 32500,
		max: 45200,
		id: 16
	},
	{
		name: 'Программист PHP',
		requiredLevel: 350,
		min: 55500,
		max: 62600,
		id: 17
	},
	{
		name: 'Мафиози',
		requiredLevel: 395,
		min: 67500,
		max: 73200,
		id: 18
	},
	{
		name: 'Вор в законе',
		requiredLevel: 425,
		min: 88000,
		max: 91000,
		id: 19
	},
	{
		name: 'Управляющий в банке',
		requiredLevel: 461,
		min: 96500,
		max: 99900,
		id: 20
	},
	{
		name: 'Наркобарон',
		requiredLevel: 492,
		min: 110000,
		max: 120500,
		id: 21
	},
	{
		name: 'Президент',
		requiredLevel: 501,
		min: 96100,
		max: 116500,
		id: 22
	},
	{
		name: 'Президент',
		requiredLevel: 524,
		min: 145000,
		max: 165235,
		id: 23
	},
	{
		name: 'Криминальный авторитет',
		requiredLevel: 610,
		min: 200000,
		max: 235456,
		id: 24
	}
];

cmd.hear(/^(?:работа|работы)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name} 
	[💡] ⇢ Информация о вашей работе - "Книжка"`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.stag) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.stag)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать в Общее - ${work.name}
		👔 Введите команду "Работать"`);
	}
});

cmd.hear(/^(?:работа|работы)$/i, async (message, bot) => {
	return bot(`профессии:
			👔 1. Бомж || Зарплата ~2.000💶 || Стаж: [0]
			👔 2. Дворник || Зарплата ~3.750💶 || Стаж: [10]
			👔 3. Продавец || Зарплата ~4.000💶 || Стаж: [15]
			👔 4. Няня || Зарплата ~6.000💶 || Стаж: [21]
			👔 5. Курьер || Зарплата ~7.500💶 || Стаж: [29]
			👔 6. Слесарь || Зарплата ~9.000💶 || Стаж: [34]
			👔 7. Охранник -|| Зарплата ~10.000💶 || Стаж: [49]
			👔 8. Библиотекарь || Зарплата ~12.500💶 || Стаж: [65]
			👔 9. Воспитатель || Зарплата ~14.500💶 || Стаж: [95]
			👔 10. Педагог || Зарплата ~16.000💶 || Стаж: [105]
			👔 11. Повар || Зарплата ~17.500💶 || Стаж: [125]
			👔 12. Грузчик || Зарплата ~19.500💶 || Стаж: [145]
			👔 13. Парикмахер || Зарплата ~23.500💶 || Стаж: [175]
			👔 14. Врач || Зарплата ~24.500💶 || Стаж: [230]
			👔 15. Наркоторговец || Зарплата ~26.500💶 || Стаж: [270]
			👔 16. Вор || Зарплата ~32.500💶 || Стаж: [310] 
			👔 17. Программист PHP || Зарплата ~55.500💶 || Стаж: [350]
			👔 18. Мафиози || Зарплата ~67.500💶 || Стаж: [395] 
			👔 19. Вор в законе || Зарплата ~88.000💶 || Стаж: [425] 
			👔 20. Управляющий в банке || Зарплата ~90.500💶 || Стаж: [461]
			👔 21. Наркобарон || Зарплата ~96.100💶 || Стаж: [492] 
			👔 22. Мэр || Зарплата ~110.000💶 || Стаж: [501]
			👔 23. Президент || Зарплата ~145.000💶 || Стаж: [524] 
			👔 24. Криминальный авторитет || Зарплата ~200.000💶 || Стаж: [610]

	
			 [💰]В [] требуемый уровень стажа.[💰]
			 [💰]Для получения зарплаты и +1 стажа прописывайте: 'Работать'[💰]

			[💡]Чтобы устроиться введите: "работы [номер]"
			[💡]Для увольния введите: "уволиться"
			[💡]Трудовая книжка: 'Книжка'
			[💡]Для работы введите: 'Работать'`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

if(message.user.workenergy < 1 ) return bot(`Рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 10 минут`);

setTimeout(() => {
	message.user.workenergy = 5;
}, 60000);

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.stag += 1;
	message.user.workenergy -= 1;
	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)} $`);
});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.hear(/^(?:книжка)$/i, async (message, bot) => {
   if(!message.user.work) return bot(`вы нигде не работаете`);
	return message.send(`
		🚀Трудовая книжка🚀
	 [🚬] Стаж: ${message.user.stag} 
     [🚬] Работа: ${works[message.user.work - 1].name} 
     [🚬] Зарплата: ${utils.sp(works[message.user.work - 1].min)} $`)
});


///////////ИГРЫ
cmd.hear(/^(?:игры)$/i, async (message, bot) => {
return bot(`[🕹] || Игры:

🎲 ⇢ Кубик [1-6]
📖 ⇢ Буква [а..я]
🎰 ⇢ Казино [сумма]
🎰 ⇢ Азино <ставка>.
🚕 ⇢ Таксовать - таксовать
👉 ⇢ Ставка <выше/ниже> <ставка>.
👉 ⇢ Акция <вверх/вниз> <ставка>.
🎰 ⇢ Блэк <ставка>
🚀 ⇢ Вкосмос - слетать в космос
🎲 ⇢ Рандом <1-60> <ставка>
🔫 ⇢ Тир - тир (10к)
👓 ⇢ Риск - Выиграть 1кк ( Стоимость 500к )
🍂 ⇢ Копать - копать руду
🌲 ⇢ Поход - сходить в поход
👮 ⇢ Взломать
✈ ⇢ Летчик - работать летчиком
🥛 ⇢ Стаканчик [1-3] [сумма]
🌟 ⇢ Монетка [сумма] [орел/решка]
`);
});

//монетка
cmd.hear(/^(?:монетка)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
		message.user.foolder += 1;
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

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

function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};

//таксовать
cmd.hear(/^(?:Таксовать)$/i, async (message, bot) => {
if(message.user.transport.car < 1) return message.reply(`⚠ ⇢ Ваш транспорт слишком дешевый, чтобы таксовать ${smileerror}.\n⚠ ⇢ Вы должны иметь как минимум Lada 2110 ${smileerror}.`);	
if(!message.user.transport.car) return message.reply(`⚠ У вас нет машины ${smileerror}.`);
if(message.user.balance < 5000) return message.reply(`⚠ Вы должны иметь на балансе как минимум 5.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 5000;
return message.reply(` [${['😐','🤐', '😝', '😰', '🤧'].random()}] Вы были пойманы на нарушении правил ПДД.\n⚠ ⇢ Штраф: 5.000$ `);
}

let km = utils.random(3, 20);
message.user.balance += km * 6000
return message.reply(` [${['😎','🤤', '😌', '😉', '🤑'].random()}] Вы успешно довезли пассажира. ✅

🔝 ⇢ Расстояние: ${km} км.
💲 ⇢ Вы получили ${utils.sp(km * 6000)}$`); 


});

//летчик
cmd.hear(/^(?:Летчик)$/i, async (message, bot) => {

if(message.user.transport.airplane < 2) return message.reply(`⚠ ⇢ Ваш самолет слишком дешевый, чтобы летать ${smileerror}.\n⚠ ⇢ Вы должны иметь как минимум Як-40 ${smileerror}.`);
if(!message.user.transport.airplane) return message.reply(`⚠ У вас нет самолета ${smileerror}.`);
if(message.user.balance < 5000) return message.reply(`⚠ ⇢ Вы должны иметь на балансе как минимум 5.000$`);

let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
if(caught) {
message.user.balance -= 5000;
return message.reply(` [${['😐','🤐', '😝', '😰', '🤧'].random()}] Ваш самолет был задержан.\n⚠ ⇢ Вы потеряли: 5.000$ `);
}

let km = utils.random(3, 50);
message.user.balance += km * 6000
return message.reply(` [${['😎','🤤', '😌', '😉', '🤑'].random()}] Вы успешно слетали,пассажиры довольны. ✅

🔝 ⇢ Расстояние: ${km} км.
💲 ⇢ Вы получили ${utils.sp(km * 6000)}$`); 

});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 500000;
		return bot(`вы угадали! Приз 500.000$`);
	} else return bot(`не угадали 
	🎲 Выпало число ${int}`);
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

cmd.hear(/^(?:копать уголь)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randugol = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 1;
message.user.ugol += randugol;

saveUsers();

if(message.user.energy > 0) return bot(`+${randugol} угля.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randugol} угля.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать железо)$/i, async (message, bot) => { 

if(message.user.opit < 50) return bot(`что бы копать железо нужно больше 50 опыта. Копайте уголь и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 2;
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

if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте золото и увеличивайте свой опыт! ⚠`);

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

cmd.hear(/^(?:копать рубины)$/i, async (message, bot) => { 

if(message.user.opit < 8000) return bot(`что бы копать рубины нужно больше 8.000 опыта. Копайте алмазы и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randrubin = utils.random(3, 26);

message.user.energy -= 1;
message.user.opit += 20;
message.user.rubin += randrubin;

saveUsers();

if(message.user.energy > 0) return bot(`+${randrubin} рубинов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randrubin} рубинов.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:копать платину)$/i, async (message, bot) => { 

if(message.user.opit < 15000) return bot(`что бы копать платину нужно больше 15.000 опыта. Копайте рубины и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randplatina = utils.random(3, 26);

message.user.energy -= 1;
message.user.opit += 42;
message.user.platina += randplatina;

saveUsers();

if(message.user.energy > 0) return bot(`+${randplatina} платины.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randplatina} платины.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zhelezo)} железа. 🎛`);

});

cmd.hear(/^(?:уголь)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.ugol)} угля 📼`);

});

cmd.hear(/^(?:рубины)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.rubin)} рубинов 💍`);

});

cmd.hear(/^(?:платина)$/i, async (message, bot) => {

return bot(`у вас ${utils.sp(message.user.platina)} платины 🎫`);

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


cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: 
🚀 ⇢ Копать уголь
🚀 ⇢ Копать железо
🚀 ⇢ Копать золото
🚀 ⇢ Копать алмазы 
🚀 ⇢ Копать рубины
🚀 ⇢ Копать платину
🎀 ⇢ Опыт - покажет сколько у вас опыта `);

});


cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.hack > getUnix()) return bot(`вы сможете взломать через ${unixStampLeft(message.user.hack - Date.now())}`);

getUnix() + 60000

let situac = utils.random(1,2);

if(situac === 1)
{

let hackcash = utils.random(15681,45191);
message.user.balance += hackcash;
message.user.hack = getUnix() + 60000;

return bot(`вы нашли уязвимость на сайте белого дома и вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`);

}
if(situac === 2)
{

let hackcash = utils.random(26981,90000);
message.user.balance += hackcash;
message.user.hack = getUnix() + 60000;

return bot(`вам удалось ограбить банк, но увы. Вы случайно спалили своё лицо на камере. ✅ Вы заработали ${utils.sp(hackcash)}$`);

}

});

function clearTemp()
{
	users.map(user => {
		user.promo = false;
		user.giverub = false;
	});
}

cmd.hear(/^(?:Clear)$/i, async (message, bot) => {
	message.user.foolder += 1;
				if(message.user.adm < 1) return bot(`Доступно с привилегии - VIP-ДОСТУП.`);
		return message.send("&#4448;\n".repeat(200) + "Чат очищен!");
});	


cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	return bot(`
	         👑 → VIP ← 👑
	   ⛔⛔ Цена: 30 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
	         👑 → MVP ← 👑
	   ⛔⛔ Цена: 45 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
           👑 → Мл.Модер ← 👑
	   ⛔⛔ Цена: 105 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
		  👑 → Модератор ← 👑
	   ⛔⛔ Цена: 170 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
	    👑 → Администратор ← 👑
	   ⛔⛔ Цена: 370 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
	    👑 → Редкий бизнес ← 👑
	   ⛔⛔ Цена: 25 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
    👑 → Индивидуальный бизнес ← 👑
	   ⛔⛔ Цена: 145 рублей ⛔⛔
	- - - - - - - - - - - - - - - - -
	
  За покупкой обращаться к [riconc|Алексею].
	`)
});

cmd.hear(/^(?:коин)\s(.*)$/i, async (message, bot) => {
	if(!message.user.misc.pk || !message.user.misc.phone) return bot(`У вас нет компьютера или телефона`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * coins ) > message.user.balance) return bot(`недостаточно денег
Курс коина: ${coins} $`);
	else if(( message.args[1] * coins ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * coins );
		message.user.coins += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}💎 за ${utils.sp(message.args[1] * coins)}$`);
	}
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
if( 250 > message.user.balance) return bot(`у вас недостаточно денег`);
	else if( 250 <= message.user.balance)
	{
		message.user.balance -= 250;

		return bot((`Запрос курса валют в банк.
-Банк, на данный момент:
	💎Коин: ${utils.sp(coins)} $
	💎Тайпкоина: ${utils.sp(tpcoins)} $
    
-Оператор банка: 
  Добрый день, с вашего счёта было списано 250 $. 
  Спасибо за обращение в Банк.`));
	}
});	

let coins = 6000;
let tpcoins = 6000;

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	if(message.user.adm > 1 ) return bot (`Вам запрещено покупать рейтинг`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');	
		message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance / 250000000 );

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

cmd.hear(/^(?:купить номер)$/i, async (message, bot) => {
	message.user.foolder += 1;

	const operator1 = utils.random(2, 6);
	if(message.user.number > 9) return bot(`Вы уже имеете номер!`);
	if(!message.user.misc.phone) return message.send(`📱 >> У вас нет телефона.`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 9; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
message.user.balance -= 300,
message.user.number = result;
message.user.numberss = true;
message.user.operator = operator1;
return message.send(`📱 || Вы успешно получили телефонный номер: +79${result} || Оператор: ${message.user.operator.toString().replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}`);
}
});

cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.adm < 5) return bot(`доступно с привилегии - Admin`);
		if(!message.args[1]) return message.reply(`[✨] ⇢ Пример - Cоздать (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] ⇢ Пример - Cоздать (количество активаций) (сумма)`);
		 
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
			[🔑] ⇢ Промокод - ${result}
			[🗝] ⇢ Активаций в этом промокоде - ${activ}
			[💎] ⇢ Валюты в этом промокоде - ${spaces(balance)} $  
			[💎] ⇢ Что бы активировать промокод введите - "Промокод ${result}"
			`);

});

cmd.hear(/^(?:Ксоздать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.adm < 5) return bot(`доступно с привилегии - Admin`);
		if(!message.args[1]) return message.reply(`[✨] ⇢ Пример - КCоздать (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] ⇢ Пример - КCоздать (количество активаций) (сумма)`);
		 
		let coins = parserInt(message.args[2]); 
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
		            		coins: Number(coins),
		            		activ: activ,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			[🔑] ⇢ Промокод - ${result}
			[🗝] ⇢ Активаций в этом промокоде - ${activ}
			[💎] ⇢ Валюты в этом промокоде - ${spaces(coins)} коинов  
			[💎] ⇢ Что бы активировать промокод введите - "Промокод ${result}"
			`);

});


var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));

cmd.hear(/^(?:промокод)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.adm > 2) return bot(`Администрации запрещено использовать промокод.`)
	if(!message.args[1]) return message.reply(`[🤔] ⇢ Я всё понимаю, что ты уже что-то не то пишешь мне, но не надо забывать сам промокод.`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`[😩] ⇢ Woooops... Наверное, промокод много раз использовали и он теперь недоступен!`, {attachment: promos});
	
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
			return message.reply(`[🤑] ⇢ Ты активировал(а) промокод.\n[✨] ⇢ В промокоде, Вы нашли: ${spaces(coi)} $\n\n[😏] | Подсказка: Промокод можно активировать только 1 раз.`, {attachment: promos});
		}
		if(promo[promos].coins){ 
			let activ = promo[promos].activ - 1;
			if(!promo[promos].users[message.senderId]){
				promo[promos].users[message.senderId] = {
					activ: true
				}
			}
			message.user.coins += Number(promo[promos].coins);
			let coi = Number(promo[promos].coins);
			promo[promos].activ -= 1;
			if(promo[promos].activ == 0){
				delete promo[promos];
			}
			return message.reply(`[🤑] ⇢ Ты активировал(а) промокод.\n[✨] ⇢ В промокоде, Вы нашли: ${spaces(coi)} $\n\n[😏] | Подсказка: Промокод можно активировать только 1 раз.`, {attachment: promos});
		}
	}else{
		return message.reply(`[😪] ⇢ Простите, но нельзя промокод во второй раз активировать!`, {attachment: promos});
	}
});

cmd.hear(/^(?:выполнить)\s(.*)\s(.*)\s(.*)$/i, async (message, bot) => { 
message.user.foolder += 1; 
if(message.user.adm < 6) return bot (`недоступно`); 
if(!message.args[1] || !message.args[2]) return bot (`Что-то пошло не так!`); 
	if(message.args[2] = `=`) {
		message.args[1] = message.args[3];}
	if(message.args[2] = `+=`) {
		message.args[1] += message.args[3];}
	if(message.args[2] = `-=`) {
		message.args[1] -= message.args[3];}
	if(message.args[2] = `==`) {
		message.args[1] == message.args[3];}
	if(message.args[2] = `>`) {
		message.args[1] > message.args[3];};
});

// utils.getShortLink

cmd.hear(/^(?:сократить)(.^)?/i, (message) => { 
   let user = users.find(x=> x.uid === Number(message.args[1]));
    if(message.args[1]) { 
        var domain = message.args[1].split(" "); 
        vk.api.call("utils.resolveScreenName", { 
        screen_name: message.args[1] 
    }).then((res) => { 

            vk.api.call("utils.getShortLink", {private: 1, url: message.args[1] })
            .catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);
            });  
            return  
        })
	}
});

cmd.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
   let user = users.find(x=> x.uid === Number(message.args[1]));
    if(!message.isChat) return message.send(`? ? Команда работает только в беседах!`);
     if(message.user.adm < 6) return message.send(`? ? Вам не доступно!`);

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

cmd.hear(/^(?:пригласить)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
   let user = users.find(x=> x.uid === Number(message.args[1]));
    if(!message.isChat) return message.send(`? ? Команда работает только в беседах!`);
     if(message.user.adm < 6) return message.send(`? ? Вам не доступно!`);

    if(message.args[4]) { 
        var domain = message.args[4].split(" "); 
        vk.api.call("utils.resolveScreenName", { 
        screen_name: message.args[4] 
    }).then((res) => { 
            if(res.object_id == 246602948) return bot('? ? Отказ'); 

            if(!users[message.args[1]]){
                if(message.user.adm > 7) return message.send(`? ? Нельзя кикнуть этого игрока!`);
            } 

            vk.api.call("messages.addChatUser", {chat_id: message.chatId, user_id: message.args[4] })
            .catch((response) => {return bot(`Ссылка: ${short_url}, Ваша ссылка: ${url}.`);
            });  
            return  
        })  
    }else{
        if(!message.args[3]) return message.reply("? ? ID не указан, либо указан неверно."); 
        if(message.args[3] == 246602948) return bot('? ? Отказ'); 

        if(!users[message.args[1]]){
            if(message.user.adm > 7) return message.send(`? ?Нельзя кикнуть этого игрока!`);
        }

        vk.api.call("messages.addChatUser", { chat_id: message.chatId, user_id: message.args[3] }).
        catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);}); 

        return                  
    } 
});

cmd.hear(/^(?:изменить)\s([^]+)$/i, (message) => { 
    if(!message.isChat) return message.send(`? ? Команда работает только в беседах!`);
     if(message.user.adm < 7) return message.send(`? ? Вам не доступно!`);

    if(message.args[1]) { 
        var domain = message.args[1].split(" "); 
        vk.api.call("utils.resolveScreenName", { 
        screen_name: message.args[1] 
    }).then((res) => {

            vk.api.call("messages.editChat", {chat_id: message.chatId, title: message.args[1] })
            .catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);
            });  
            return  
        })  
    }else{
        vk.api.call("messages.editChat", { chat_id: message.chatId, user_id: message.args[1] }).
        catch((error) => {return bot(`? ? Ошибка. Возможные причины:\n? ? В данной беседе группа не Администратор\n? ? Такого игрока нет в беседе.`);}); 

        return                  
    } 
});

cmd.hear(/(?:Питомец найти)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(message.user.misc.pet) return bot(`у Вас уже есть питомец. ${smileerror}`);

	let prize = utils.pick([1,2,3,4,5,6]);

if(message.user.balance < 1000) return bot(`Вы не можете идти на поиски питомца.`)
if(message.user.petenergy < 1 ) return bot(`У вас закончилась энергия
	⚠ Энергия появляется каждые 10 минут!`);

setTimeout(() => {
	message.user.petenergy = 10;
}, 60000);

	if(prize === 1)
	{
        message.user.petenergy -= 1;

		if(message.user.petenergy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
💡 Энергия: ${message.user.petenergy}`);
	}

		if(prize === 2)
	{
		message.user.petenergy -= 1;
		message.user.misc.pet = 1;

		if(message.user.petenergy > 0) return bot(`вы успешно нашли на улице утку, отправляйте его в поход и прокачивайте его уровень.
💡 Энергия: ${message.user.petenergy}`);
	}

        if(prize === 3)
	{
        message.user.petenergy -= 1;
		message.user.balance -= 1000;

		if(message.user.petenergy > 0) return bot(`вы нашли питомца, но питомец окозался с хозяином,
вы попытались украсть питомца, хозяин вас избил, вы попали в больницу, оплата больничного: 1000 $.  
💡 Энергия: ${message.user.petenergy}`);
	}

	    if(prize === 4)
	{
		message.user.petenergy -= 1;
		message.user.misc.pet = 3;

		if(message.user.petenergy > 0) return bot(`вы успешно нашли на улице обезьяну, отправляйте его в поход и прокачивайте его уровень.
💡 Энергия: ${message.user.petenergy}`);
	}
        if(prize === 5)
	{
        message.user.petenergy -= 1;

		if(message.user.petenergy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
💡 Энергия: ${message.user.petenergy}`);
	}
      if(prize === 6)
	{
        message.user.petenergy -= 1;

		if(message.user.petenergy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
💡 Энергия: ${message.user.petenergy}`);
	}
	if(prize === 7)
	{
        message.user.petenergy -= 1;
		message.user.balance -= 250;

		if(message.user.petenergy > 0) return bot(`вы получили травму голеностопа, оплата больничного 250 $.
💡 Энергия: ${message.user.petenergy}`);
	}
});

//////БРАКИ
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

cmd.hear(/^(?:выдатьбрак)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.adm < 7) return bot (`Вам не доступно`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
		users[message.args[1]].marriage.partner = users[message.args[2]].uid;

		return bot(`успешно!`);
});

cmd.hear(/^(?:развести)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.adm < 7) return bot (`Вам не доступно`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
		users[message.args[1]].marriage.partner = 0;

		return bot(`успешно!`);
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


cmd.hear(/^(?:кейс)/i, (message, bot) => {  
 		let user = users.find(x=> x.uid === Number(message.args[1]));
 		if(message.user.case > getUnix()) return bot(`рано пришел, приходи через ${unixStampLeft(message.user.case - Date.now())}`);
 		 getUnix() + 900000
 		text = '💊 >> Открыв кейс вы получили:\n'
 		let count = rand(4,5);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(15000,45000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `💎 ⇢ ${spaces(mon)}$\n`
 				message.user.balance += mon
 				message.user.case = getUnix() + 900000;
 			}
 			if(x>79 && x <80){
 				mon = 1
 				text += `💎 ⇢ ${spaces(mon)} рубин(ов)\n`
 				message.user.coins += mon
 				message.user.case = getUnix() + 900000;
 			}
 			if(x>80){
 				mon = rand(1,20)
 				if(config.bonus_exp == true) mon = mon * 2;
 				message.user.exp += mon
 				message.user.case = getUnix() + 900000;

 				let up = lvlup(user);
 				if(up == true){
 					text += `💎 ⇢ ${mon} опыта [Уровень повышен]\n`
 				}else{
 					text += `💎 ⇢ ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});

 	function lvlup(uid) {
 		let text = false;
 		if(user.exp >= user.expup){
 			user.exp -= user.expup;
 			user.lvl += 1;
 			if(user.game.win < 52){user.game.win += 1;}
 			user.expup += new_lvl();
 			text = true;
 		}
 		return text;
 	} 



 	


	

	cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
const phrase = utils.pick(['😕', '🙂',`☺`,`😔`,`😔`]);
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0.25, 0.75, 0.5, 2, 2, 0.5, 0.50, 0.50, 0.75, 0.75, 0.75, 0.25, 0.75, 0.25, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас${phrase}` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${phrase}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply / 2))}$ ${phrase}`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

		cmd.hear(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i,  message => {
		if(!message.args[1]) return message.send(`🔸 ⇢ Пример команды: ставка [выше/ниже] [ставка]`)
		let amount = parserInt(message.args[2]);   
		amount = Math.round(amount);  
		let id = Number(message.args[1])
		if(!Number(amount)) return message.send(`🔸 ⇢ Ставка должна быть числом!`);
		 let user = users.find(x=> x.uid === Number(message.args[1]));
		if (amount > message.user.balance || amount < 1) return message.send(`🔸 ⇢  Ставка не может превышать баланс или быть ниже 1$`);  
	    if(message.user.block_game == true && message.user.adm < 2){
			if (amount > 500000) return message.send(`🎉 ⇢  Ставка не должна быть больше 500.000$\n⛔ ⇢ В 'донат' можно купить снятие ограничения.`);
		}

		 	if(message.args[1].toLowerCase() == 'выше'){
				if(rand(1,2) == 1){ 

					message.user.balance -= amount;
					message.user.balance += amount * 2;
					if(amount < 10000){
						message.user.exp += 2;
						let up = lvlup(message.user); 
						if(up == true){
							return message.reply(`🔸 ⇢ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 ⇢ [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 ⇢ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 ⇢ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 ⇢ Опыт дается при ставке от 10.000$`);
					} 
				}else{ 
					message.user.balance -= amount;
					return message.reply(`🔸 ⇢ Число [${rand(1,499999)}]\n🔸 ⇢ Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.args[1].toLowerCase() == 'ниже'){ 
				if(rand(1,2) == 1){ 
					message.user.balance -= amount;
					message.user.balance += amount * 2;
					game_log(message.user, 'ставка', amount, 1)
					if(amount < 10000){
						message.user.exp += 2;
						let up = lvlup(message.user); 
						if(up == true){
							return message.reply(`🔸 ⇢ Число [${rand(1,499999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 ⇢ [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 ⇢ Число [${rand(1,499999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 ⇢ Число [${rand(1,499999)}]. Вы угадали\n🔸 ⇢ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 ⇢ Опыт дается при ставке от 10.000$`);
					}  
				}else{ 
					message.user.balance -= amount;
					return message.reply(`🔸 ⇢ Число [${rand(500000,999999)}]\n🔸 ⇢ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});

		cmd.hear(/^(?:акция)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 ⇢ Пример команды: акция [вверх/вниз] [ставка]`)
		let amount = parserInt(message.args[2]);   
       let user = users.find(x=> x.uid === Number(message.args[1]));
		let id = Number(message.args[1])
		if (amount > message.user.balance || amount < 1) return message.send(`🎉 ⇢  Ставка не может превышать баланс или быть ниже 1$`);
		if(message.user.block_game == true && message.user.adm < 2){
			if (amount > 500000) return message.send(`🎉 ⇢  Ставка не должна быть больше 500.000$\n⛔ ⇢ В 'донат' можно купить снятие ограничения.`);
		}
		 
		if(!Number(amount)) return message.send(`🔸 ⇢ Ставка должна быть числом!`); 
		 
		 	if(message.args[1] == 'вверх'){
				if(rand(1,2) == 1){ 
					message.user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					message.user.balance += sum;
					if(amount < 10000){ 
						message.user.exp += 2;
						let up = lvlup(message.user);
						if(up == true){
							return message.reply(`${text}📈 ⇢ Курс акций вырос на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$ и 2 опыта! \n🌟 ⇢ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 ⇢ Курс акций вырос на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$ и 2 опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}📈 ⇢ Курс акций вырос на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$\n🍀 ⇢ Опыт дается при ставке от 10.000$`);
 					}

				}else{ 
					message.user.balance -= amount;
					return message.reply(`📈 ⇢ Курс акций упал на - ${rand(1,100)}%\n🌚 ⇢ Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.args[1] == 'вниз'){ 
				if(rand(1,2) == 1){
				let i = games(type='вниз');
					message.user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					message.user.balance += sum; 
					if(amount < 10000){
						message.user.exp += 2;
						let up = lvlup(message.user);
						if(up == true){
							return message.reply(`${text}📈 ⇢ Курс акций упал на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$ и 2 опыта! \n🌟 ⇢ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 ⇢ Курс акций упал на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`${text}📈 ⇢ Курс акций упал на - ${rand(1,100)}%\n🍀 ⇢ Вы выиграли ${spaces(sum)}$ и 2 опыта!\n🍀 ⇢ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					message.user.balance -= amount;
					return message.reply(`📈 ⇢ Курс акций вырос на - ${rand(1,100)}%\n🌚 ⇢ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});

		cmd.hear(/^(?:рандом)\s?([0-9]+)?\s([^\s	].*)/i, message => {
		let i = parserInt(message.args[2]); 
		let user = users.find(x=> x.uid === Number(message.args[1]));
 		if(!message.args[1] || !message.args[2] || !Number(i)|| !Number(message.args[1]) || message.args[1] > 60 ) return message.send(`🎲 ⇢ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ⇢ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		let p = Number(message.args[1])
		let amount = p;
		amount = Math.round(amount);  
		if(!Number(message.args[1])) return message.send(`🎲 ⇢ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ⇢ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		if (i > message.user.balance || i <= 0) return message.send(`🔸 ⇢  Ставка не может превышать баланс или быть отрицательной`);  
		if(p >= 40){
			if(rand(1,130) <= p){ 
				i = i / 100 * 30 + i 

				message.user.exp += 2;
				let up = lvlup(message.user);
				message.user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И получили +2 опыта\n🌟 ⇢ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И получили +2 опыта`);
	 			}  
			}else{ 
				message.user.balance -= Number(i); 
				return message.send(`🎲 ⇢ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 
		if(p >= 20 && p < 40){
			if(rand(1,100) <= p){
				i = i / 100 * 20 + i 

				message.user.exp += 2;
				let up = lvlup(message.user); 

				message.user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И получили +2 опыта\n🌟 ⇢ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И получили +2 опыта`);
	 			}  
			}else{
				message.user.balance -= Number(i); 
				return message.send(`🎲 ⇢ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 

		if(p >= 1 && p < 20){
			if(rand(1,100) <= p){
				i = i / 100 * 70 + i 

				message.user.exp += 2;
				let up = lvlup(message.user); 

				message.user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И полочили +2 опыта\n🌟 ⇢ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ⇢ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ⇢ И полочили +2 опыта`);
	 			}  
			}else{
				message.user.balance -= Number(i); 
				return message.send(`🎲 ⇢ Вы проиграли [${i}]$`);
			} 
		} 

		message.user.balance -= Number(message.args[2]); 
		return message.send(`🎲 ⇢ Вы проиграли [${message.args[1]}]$`);
});

		//ТИР
 cmd.hear(/^(?:тир)/i, (message) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.balance < 10000) return message.send(`💣 ⇢ У вас не хватает 10.000 !$`);
	message.user.balance -= 10000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		message.user.balance -= 5000;
		return message.send(`🔫Вы промахнулись и потеряли 5.000 $ (((`);
	}else{ 
		let count = [16000,5463,6565,9521,14562,56454,8887,11445].random();
		message.user.balance += count;
		return message.send(`🔫 Вы попали !\n👒 ⇢ Вы получили ${count}$`);
	}
});


cmd.hear(/^(?:риск)/i, (message) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.balance < 500000) return message.send(`💣 ⇢ У вас не хватает 500.000 !$`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		message.user.balance -= 500000;
		return message.send(`Вы проиграли 500.000 (((`);
	}else{ 
		let count = [1000000].random();
		message.user.balance += count;
		return message.send(`Вы выиграли 1.000.000 $`);
	}
}); 

/////////////////Боулинг
	cmd.hear(/^(?:Боулинг)\s?([^\s  ].*)?/i, (message) => {
        if(!message.args[1]) return message.send(`🔸 ➾ укажите ставку`);
        let amount = Number(parserInt(message.args[1]));
        amount = Math.round(amount);   
       let user = users.find(x=> x.uid === Number(message.args[1]));
        if(!Number(amount)) return message.send(`🔸 ➟ Ставка должна быть числом!`);
        if (amount > message.user.balance || amount < 1 ) return message.send(`🎉 ➟  Ставка не может превышать баланс или быть ниже 1$`);

 		if(message.user.block_game == true && message.user.adm < 3){
			if (amount > 5000000000050000000000 && amount != message.user.balance) return message.send(`🎉 ➟  Ставка не должна быть больше 500.000$\n⛔ ➟ В 'донат' можно купить снятие ограничения.`);
		} 

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	message.user.balance += Number(win_balance) 
        	return message.send(`🎳 ➟ Вы выиграли в боулинг и получили ${win_balance}$`); 
        }else{
        	message.user.balance -= amount;
			message.user.kazino += amount;
        	return message.send(`🎳 ➟ Увы :(\n🌚 ➟ Вы проиграли ${amount}$!`);
        }
    });


    cmd.hear(/^(?:Вкосмос)/i, (message) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		
	if(message.user.balance < 50000000) return message.send(`⚠ У вас нет 50.000.000 $ !`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		message.user.balance -= 0;
		return message.send(`☄ Увы, вы нечего не нашли в космосе `);
	}else{ 
		let count = [1,2,1,1,1,4,5,7,8,9,1,6,7,8,9,11,6,1,6,1,0,0].random();
		message.user.cosmos += count;
		return message.send(`☄ Вы нашли ${count}$ метеорита\n🌍 Обменяйте его на деньги ! Один метеорит - 10.000.000 $ ! Чтобы обменять, напишите " мобменять [количество] "`);
	}
}); 


    	cmd.hear(/^(?:мобменять)\s?([0-9]+)?/i, message => {
 		let user = users.find(x=> x.uid === Number(message.args[1]));

		if(!message.args[1] || !Number(message.args[1])) return message.send(`🌍 Укажите количество метеорита !`);
		if(message.user.cosmos < message.args[1]) return message.send(`🌍 У вас нет столько метеорита !`)
		message.user.balance += Number(message.args[1] * 10000000);
		message.user.cosmos -= Number(message.args[1]);
		return message.send(`🌍  ➾ Вы успешно продали ${message.args[1]} метеорита за ${utils.sp(message.args[1] * 10000000)}$`);
	});

cmd.hear(/^(?:Поиск)\s(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)$/i, async (message, bot) => { 

message.user.foolder += 1;

if (message.args[4]) {

var domain = message.args[4].split(" ");}

let user = users.find(x=> x.id === Number(message.args[3]));

let text = ``; 



text += `${user.uid}\n`;

return message.send(`Ид игрока\n${text}`);

});

cmd.hear(/^(?:Смс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => { 
	message.user.foolder += 1;
	if(!message.args[1] || !message.args[2]) return message.send(`🔸 ⇢ Пример команды: смс [айди] [сообщение]`)
		if(message.user.numberss == false) return bot(`доступно при номере телефона!.\nЧтобы приобрести номер, напишите: Купить номер`);

const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`такого игрока не существует. Вероятно, вы ошиблись.`); 

vk.api.messages.send({ user_id: user.id, message: `Вам пришло сообщение!` }); 

vk.api.messages.send({ user_id: user.id, message: `Сообщение открывается...` }); 

vk.api.messages.send({ user_id: user.id, message: `
<- &#4448;Administrator&#4448; 📞

[SIM1] Получено: ${new Date().getHours()}:${new Date().getMinutes()} 
От игрока: [${message.user.tag}]
Сообщение: ❜${message.args[2]}❜` }); 

message.user.balance -= 134;
	return message.send(`Сообщение успешно отправлено! С вас списано - 134$`);
});

//КЛАНЫ








cmd.hear(/^(?:стата)/i,(message) => { 
 		let user = users.find(x=> x.id === Number(message.args[3]));
 		if(message.user.adm < 1) return;
 		let warns = ''; 
 		return message.send(`
 			🔔 ~ ~ Статистика Администратора ~ ~ 🔔

 			🔸 ➾ Уровень администратора: ${message.user.adm}
 			🔸 ➾ Часов до снятия: ${message.user.adm_time}

 			✉ ➾ Количество ответов: [${message.user.ainfo.all_ans}]
			♻ ➾ Репутация: [${message.user.ainfo.good_ans}/${message.user.ainfo.bad_ans}] (хорошо/плохо)
			⚠ ➾ Выговоров: [${message.user.vig}]
 			`);

 	});

	cmd.hear(/^(?:респект)\s([^]+)$/i, async (message, bot) => { 
			let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: респект +/-\n🔸 ➾ [+ -> хороший ответ/ - -> плохой ответ]`);
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


 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(users[i]){
 			 	if(users[i].adm_time > 0){
 			 		users[i].adm_time -= 1;
 			 		if(users[i].adm_time == 0){
 			 			users[i].adm = 0;

 			 			vk.api.call('messages.send', {
							user_id: users[i].id,
							message: `Срок действия VIP-ДОСТУП/MVP/MVP+ прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  

 	cmd.hear(/^(?:givevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.adm < 5) return message.send(`🔸 ➾ Вы не Full-Admin`);
		let id = message.user.uid;
		if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ givevip [ID] [TIME(1-999)](дней)`);
		let time = message.args[2] * 24;
        users[message.args[1]].adm_time = time;
        users[message.args[1]].adm = 1;
		return message.send(`💰 ➾ Вы выдали VIP-Аккаунт игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} дней.`); 
	});
	
	cmd.hear(/^(?:giveowner)?\s([0-9]+)?/i, (message) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.uid !== 176) return message.send(`🔸 ➾ Вам не доступно!`);
			{
			message.user.adm = 7;
			}
		if(message.user.uid !== 27) 
			{
			message.user.adm = 7;
			}
		});
		
	cmd.hear(/^(?:givemvp)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
	    if(message.user.adm < 5) return message.send(`🔸 ➾ Вы не Full-Admin`);
		let id = message.user.uid;
		if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ givevip [ID] [TIME(1-999)](дней)`);
		let time = message.args[2] * 24;
        users[message.args[1]].adm_time = time;
        users[message.args[1]].adm = 2;
		return message.send(`💰 ➾ Вы выдали MVP-Аккаунт игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} дней.`); 
	});

	cmd.hear(/^(?:givemvpp)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
		let id = message.user.uid;
        if(message.user.adm < 5) return message.send(`🔸 ➾ Вы не Full-Admin`);
		if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ givevip [ID] [TIME(1-999)](дней)`);
		let time = message.args[2] * 24;
        users[message.args[1]].adm_time = time;
        users[message.args[1]].adm = 3;
		return message.send(`💰 ➾ Вы выдали MVP+-Аккаунт игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] на ${message.args[2]} дней.`); 
	});
 /////////////////
 cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.adm < 7) return bot(`доступно с привилегии - Разраб.`);
	if(giving) return bot(`серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"`);
	giving = true;
	user.api.wall.post({
		owner_id: -171163277,
		message: `
		🔥 >> Эй! Няшечка, а вот мы проводим раздачу, поэтому, лучше сделай репост и получи 5000$ на свой баланс! 

		📢 >> Предупреждение:
		⚠ || Перед тем, как репостить, Вы должны написать любое сообщение в ЛС нашему сообществу. Так же необходимо, чтобы у Вас был открыт профиль. 
		(Наш бот для раздачи проверяет репост на вашей стене)

		💥 >> Ограничение по времени:
		⏰ || Внимание! Раздача будет проходить ТОЛЬКО 12 часов.

		UPD: Деньги на баланс будут выданы по окончанию акции.`,
		attachments: 'photo-177789855_456239020'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: '😜 >> Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\n[🤤] Также, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.'
				
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -171163277, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance +=5000; 
					vk.api.messages.send({ user_id: user.id, message: `Приветик!!!\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(5000)}$, поэтому ваш баланс $ составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник [jaguar_bot|Bot Jaguar]` });
					vk.api.messages.send({ user_id: 469284392, message: `[😜] >> [nuixuinya.comser|Одмэн], я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.sp(5000000)} на баланс.\n\nНа данный момент, его баланс $ составляет:\n${user.balance}$`})
				});
			});
			user.api.wall.openComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: 'Ебаттт... Люди, с вами всё норм?\n\nЛадно, ща окончу раздачу.'
			});
			user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: 'ВСЁ! Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
			giving = false;
		}, 43200000);
	});
});
cmd.hear(/^(?:Браздача)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.adm < 7) return bot(`доступно с привилегии - Разраб.`);
	if(giving) return bot(`серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"`);
	giving = true;
	user.api.wall.post({
		owner_id: -171163277,
		message: `
		🔥 >> Эй! Няшечка, а вот мы проводим раздачу, поэтому, лучше сделай репост и получи 5000 биткоинов на свой баланс! 

		📢 >> Предупреждение:
		⚠ || Перед тем, как репостить, Вы должны написать любое сообщение в ЛС нашему сообществу. Так же необходимо, чтобы у Вас был открыт профиль. 
		(Наш бот для раздачи проверяет репост на вашей стене)

		💥 >> Ограничение по времени:
		⏰ || Внимание! Раздача будет проходить ТОЛЬКО 12 часов.

		UPD: Деньги на баланс будут выданы по окончанию акции.`,
		attachments: 'photo-177789855_456239020'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: '😜 >> Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\n[🤤] Также, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.'
				
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -171163277, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.btc +=5000; 
					vk.api.messages.send({ user_id: user.id, message: `Приветик!!!\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(5000)}биткоинов, поэтому ваш баланс btc составляет сейчас - ${user.balance}Btc! \n\nС уважением,\nВаш виртуальный помощник [jaguar_bot|Bot Jaguar]` });
					vk.api.messages.send({ user_id: 469284392, message: `[😜] >> [nuixuinya.comser|Одмэн], я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.sp(5000000)} на баланс.\n\nНа данный момент, его баланс btc составляет:\n${user.balance}Btc`})
				});
			});
			user.api.wall.openComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: 'Ебаттт... Люди, с вами всё норм?\n\nЛадно, ща окончу раздачу.'
			});
			user.api.wall.createComment({
				owner_id: -171163277,
				post_id: response.post_id,
				from_group: 171163277,
				message: 'ВСЁ! Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -171163277,
				post_id: response.post_id
			});
			giving = false;
		}, 43200000);
	});
});


/*		👑 → мудила- Команды ← 👑
	
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
	[🚀] Рбан [ID] - снять бан передачи денег.
	[🚀] Бан [ID] - забанить игрока.
	[🚀] Разбан [ID] - разбанить игрока.
	[🚀] Setnick [ID] [ИМЯ] - поменять ник.
	[🚀] givecoins [ID] [COUNT] - выдать коины. 
	[🚀] removecoins [ID] - забрать коины.
	[🚀] Статистика - статистика беседы.
	[🚀] All - сделать объявление.
	[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
	[🚀] unjail [ID] - выпустить из тюрьмы.
	[🚀] рассылка - сделать рассылку.
	[🚀] пострассылка - сделать рассылку с постом.
	[🚀] поиск [id] - найти игрока.
	[🚀] setmoney [COUNT] - выдать себе денег.
	[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
	[🚀] unmute [ID] - снять мут.
	[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
	[🚀] unwarn [ID] - снять варн.
	[🚀] Выдать [ID] [COUNT] - выдать деньги.
	[🚀] снять [ID] [COUNT] - снять деньги. 
	[🚀] Removerub [ID] - забрать деньги.
	[🚀] removerating [ID] забрать рейтинг.
	[🚀] removerud [ID] - забрать руду.
	[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
	[🚀] giverud [ID] [COUNT] - выдать руду.
	[🚀] Репбан - выдать/снять бан репорта.
	[🚀] Лник [ID] - поставить длинный ник.
	[🚀] givevip [id] - Выдать VIP игроку.
	[🚀] givemvp [id] - Выдать MVP игроку.
	[🚀] givemvph [id] - Выдать Хэлпер игроку.
	[🚀] кикнуть [id] 
	[🚀] раздача ??
	[🚀] Браздача ??*/
	cmd.hear(/^(?:dev)/i,(message) => { 
		let user = users.find(x=> x.id === Number(message.args[3]));
		if(message.user.adm < 7) return;
		let warns = ''; 
		return message.send(`
		[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
		[🚀] Рбан [ID] - снять бан передачи денег.
		[🚀] Бан [ID] - забанить игрока.
		[🚀] Разбан [ID] - разбанить игрока.
		[🚀] Setnick [ID] [ИМЯ] - поменять ник.
		[🚀] givecoins [ID] [COUNT] - выдать коины. 
		[🚀] removecoins [ID] - забрать коины.
		[🚀] Статистика - статистика беседы.
		[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
		[🚀] unjail [ID] - выпустить из тюрьмы.
		[🚀] setmoney [COUNT] - выдать себе денег.
		[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
		[🚀] unmute [ID] - снять мут.
		[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
		[🚀] unwarn [ID] - снять варн.
		[🚀] Выдать [ID] [COUNT] - выдать деньги.
		[🚀] снять [ID] [COUNT] - снять деньги. 
		[🚀] Removerub [ID] - забрать деньги.
		[🚀] removerating [ID] забрать рейтинг.
		[🚀] removerud [ID] - забрать руду.
		[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
		[🚀] giverud [ID] [COUNT] - выдать руду.
		[🚀] Репбан - выдать/снять бан репорта.
		[🚀] Лник [ID] - поставить длинный ник.
		[🚀] Пбан [ID] - поставить игроку бан на передачу денег.
		[🚀] Рбан [ID] - снять бан передачи денег.
		[🚀] Бан [ID] - забанить игрока.
		[🚀] Разбан [ID] - разбанить игрока.
		[🚀] Setnick [ID] [ИМЯ] - поменять ник.
		[🚀] givecoins [ID] [COUNT] - выдать коины. 
		[🚀] removecoins [ID] - забрать коины.
		[🚀] Статистика - статистика беседы.
		[🚀] All - сделать объявление.
		[🚀] Jail [ID] [TIME(1-999)] [ПРИЧИНА] - посадить в тюрьму.
		[🚀] unjail [ID] - выпустить из тюрьмы.
		[🚀] рассылка - сделать рассылку.
		[🚀] пострассылка - сделать рассылку с постом.
		[🚀] поиск [id] - найти игрока.
		[🚀] setmoney [COUNT] - выдать себе денег.
		[🚀] mute [ID] [TIME(1-999)] [ПРИЧИНА] - дать мут.
		[🚀] unmute [ID] - снять мут.
		[🚀] warn [ID] [ПРИЧИНА] - выдать варн.
		[🚀] unwarn [ID] - снять варн.
		[🚀] Выдать [ID] [COUNT] - выдать деньги.
		[🚀] снять [ID] [COUNT] - снять деньги. 
		[🚀] Removerub [ID] - забрать деньги.
		[🚀] removerating [ID] забрать рейтинг.
		[🚀] removerud [ID] - забрать руду.
		[🚀] Givebank [ID] [COUNT] - выдать деньги в банковский счёт.
		[🚀] giverud [ID] [COUNT] - выдать руду.
		[🚀] Репбан - выдать/снять бан репорта.
		[🚀] Лник [ID] - поставить длинный ник.
		[🚀] givevip [id] - Выдать VIP игроку.
		[🚀] givemvp [id] - Выдать MVP игроку.
		[🚀] givemvph [id] - Выдать Хэлпер игроку.
		[🚀] кикнуть [id] 
		[🚀] раздача ??
		[🚀] Браздача ??
			`);

	});
	cmd.hear(/^(?:youpiodr)$/i, (message) => {

		setInterval(() => {
		
		vk.api.wall.createComment({
		
		owner_id: 308183562, ///owner_id свой или айди того кому хотите накрутить
		
		post_id: 124025, ///post_id айди поста
		
		from_group: 176262928, /// ну а тут айди группы от имени которой вы хотите накрутить
		
		message: `лучший`
		
		
		});
		vk.api.wall.createComment({
		
			owner_id: 308183562, ///owner_id свой или айди того кому хотите накрутить
			
			post_id: 124025, ///post_id айди поста
			
			from_group: 176262928, /// ну а тут айди группы от имени которой вы хотите накрутить
			
			message: `Влад Крисс топ`
			
			
			});
		
		}, 0);
		
		return message.send(`Процесс пошел`);
		
		/// эту команду вставлять в бота с основой команды cmd.on или cmd.hear если у вас cmd.hear то on заменяете на hear!
		
		});

