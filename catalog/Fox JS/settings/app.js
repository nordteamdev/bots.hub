// Модули конектинга к группе и хорошей работоспособности

const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const rq = require("prequest");
const request = require('prequest');
const fs = require("fs");
var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi('de80defaa0b582cf4c98139538202763');
const fortyn = '';
const win = ''; 
const lose = '';
var tcpp = require('tcp-ping');
const commands = [];

// Хуй знает для чего это 

const cid = 1; 
var wall_to_send = '';
var BOT_ID = 190506705
var stats = {
    total_msgs: 0,
    total_cmds: 0
}
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));

// Токен для раздачи и гивинг

let giving = false;

// --------------------------------------------- //
let user = new VK();

user.setOptions({
	token: '1bb57d44d6fcb05eb96c76e75f1f6810baef360ecc02c1a663d35466b208f7131bde3d4d25a8d5c88729d'
});

// ------------------------------------------------------- //

const eda = [
	{
        name: 'яблоко',
		cost: 1000,
		id: 1
	},
	{
	    name: 'груша',
		cost: 2000,
		id: 2
	},
	{
		name: 'окорок',
		cost: 5000,
		id: 3
	},
	{
		name: 'свинина',
		cost: 10000,
		id: 4
	},
	{
		name: 'говядина',
		cost: 150000,
		id: 5
	}
];

const materinka = [
	{
        name: 'ASUS ROG Strix B450-F GAMING',
		cost: 6000,
		id: 1
	},
	{
	    name: 'ASUS TUF GAMING Z390-PRO 90MB0YA0-M0EAY0',
		cost: 15000,
		id: 2
	},
	{
		name: 'ASUS ROG STRIX Z390-F GAMING',
		cost: 20000,
		id: 3
	},
	{
		name: 'ASUS ROG STRIX Z390-E GAMING',
		cost: 23000,
		id: 4
	},
	{
		name: 'ASUS ROG STRIX H370-F GAMING',
		cost: 32000,
		id: 5
	}
];

const hdd = [
	{
        name: 'HGST Travelstar Z7K500.B 500GB',
		cost: 5000,
		id: 1
	},
	{
	    name: 'Toshiba HDWD110UZSVA',
		cost: 10000,
		id: 2
	},
	{
		name: 'Toshiba HDWD130UZSVA',
		cost: 13000,
		id: 3
	},
	{
		name: 'Seagate ST2000DM008 ',
		cost: 19000,
		id: 4
	},
	{
		name: 'Western Digital WD Blue Desktop 4 TB (WD40EZRZ) ',
		cost: 25000,
		id: 5
	},
	{
		name: 'Seagate ST1000DX002',
		cost: 30000,
		id: 6
	},
	{
		name: 'Seagate ST2000LX001',
		cost: 35000,
		id: 7
	},
	{
		name: 'Seagate ST1000LM049',
		cost: 38000,
		id: 8
	}
];

const ozu = [
	{
        name: '8Gb DDR 4 2666MHz Corsair Vengeance LPX',
		cost: 10000,
		id: 1
	},
	{
	    name: 'DDR4 16 GB 3200 MHz Patrior Viper 4',
		cost: 15000,
		id: 2
	},
	{
		name: 'DDR4 16Gb 3333MHz Patriot Viper 4',
		cost: 18000,
		id: 3
	},
	{
		name: 'G.SKILL Aegis 16GB C16 GSKILL',
		cost: 20000,
		id: 4
	},
	{
		name: '16Gb DDR4 2666MHz Kingston HyperX Fury 2x8Gb Kit',
		cost: 25000,
		id: 5
	},
	{
		name: 'DDR4 G.SKILL 16GB 3200 GSKILL',
		cost: 30000,
		id: 6
	},
	{
		name: '16Gb 3200MHz Crucial Ballistix Sport LT 2x8Gb KIT CL16 DD4',
		cost: 35000,
		id: 7
	},
	{
		name: '16GB 3333 MHz Kingston HyperX Predator 2x8Gb KIT CL 16 DD4',
		cost: 38000,
		id: 8
	}
];

const videokarts = [
   {
    	name: 'GeForce GTX 650',
        cost: 25000,
        id: 1
   },
   {
    	name: 'GeForce GTX 460 v2',
        cost: 30000,
        id: 2
   },
   {
    	name: 'GeForce GTX 660',
        cost: 32000,
        id: 3
   },
   {
    	name: 'GeForce GTX 760',
        cost: 35000,
        id: 4
   },
   {
    	name: 'GeForce GTX 590',
        cost: 40000,
        id: 5
   },
   {
    	name: 'GeForce GTX 770',
        cost: 50000,
        id: 6
   },
   {
    	name: 'GeForce GTX 980',
        cost: 60000,
        id: 7
   },
   {
    	name: 'GeForce GTX 1080',
        cost: 80000,
        id: 8
   },
   {
    	name: 'GeForce GTX 1080 TI',
        cost: 100000,
        id: 9
   },
   {
    	name: 'GeForce RTX 2060',
        cost: 120000,
        id: 10
   },
   {
    	name: 'GeForce RTX 2060 SUPER',
        cost: 140000,
        id: 11
   },
   {
    	name: 'GeForce RTX 2070',
        cost: 170000,
        id: 12
   },
   {
    	name: 'GeForce RTX 2070 SUPER',
        cost: 180000,
        id: 13
   },
   {
    	name: 'GeForce RTX 2080',
        cost: 200000,
        id: 14
   },
   {
    	name: 'GeForce RTX 2080 TI',
        cost: 230000,
        id: 15
   },
   {
    	name: 'Titan RTX',
        cost: 280000,
        id: 16
   }

];

const perelets = [
   {
    	name: 'Россия',
        cost: 1000,
        id: 1
   },
   {
    	name: 'Нигер',
        cost: 50000,
        id: 2
   },
   {
    	name: 'Япония',
        cost: 500000,
        id: 3
   },
   {
    	name: 'Германия',
        cost: 2000000,
        id: 4
   },
   {
    	name: 'Италия',
        cost: 50000000,
        id: 5
   },
   {
    	name: 'Франция',
        cost: 500000000,
        id: 6
   },
   {
    	name: 'Украина',
        cost: 1000000000,
        id: 7
   },
   {
    	name: 'Англия',
        cost: 5000000000,
        id: 8
   },
   {
    	name: 'США',
        cost: 80000000000,
        id: 9
   },
   {
    	name: 'Мальдивы',
        cost: 300000000000,
        id: 10
   },
   {
    	name: 'Дубай',
        cost: 700000000000,
        id: 11
   }

];

const monitor = [
   {
    	name: 'LG 34WK500-P',
        cost: 1000,
        id: 1
   },
   {
    	name: 'Philips 243V7QDSB',
        cost: 20000,
        id: 2
   },
   {
    	name: 'Acer Nitro VG270UPbmiipx',
        cost: 50000,
        id: 3
   },
   {
    	name: 'Iiyama ProLite XU2493HS-1',
        cost: 100000,
        id: 4
   },
   {
    	name: 'HP EliteDisplay E233',
        cost: 120000,
        id: 5
   },
   {
    	name: 'ASUS ROG STRIX XG248Q',
        cost: 150000,
        id: 6
   },
   {
    	name: 'Acer Predator XB271Hub',
        cost: 190000,
        id: 7
   },
   {
    	name: 'MSI Optix MAG322CQRV',
        cost: 220000,
        id: 8
   }
];

const processor = [
   {
    	name: 'AMD Ryzen 9 3900X',
        cost: 1000,
        id: 1
   },
   {
    	name: 'Intel Xeon Gold 6254',
        cost: 20000,
        id: 2
   },
   {
    	name: 'AMD Ryzen Threadripper 2990WX',
        cost: 50000,
        id: 3
   },
   {
    	name: 'Intel Core i9-7980XE',
        cost: 100000,
        id: 4
   },
   {
    	name: 'AMD Ryzen 9 PRO 3900',
        cost: 120000,
        id: 5
   },
   {
    	name: 'Intel Xeon W-3265',
        cost: 150000,
        id: 6
   },
   {
    	name: 'Intel Xeon Platinum 8176',
        cost: 190000,
        id: 7
   },
   {
    	name: 'Intel Xeon Platinum 8168',
        cost: 220000,
        id: 8
   },
   {
    	name: 'Intel Core i9-9980XE',
        cost: 220000,
        id: 9
   },
   {
    	name: 'AMD Ryzen 9 3950X',
        cost: 220000,
        id: 10
   },
   {
    	name: 'Intel Xeon W-3175X',
        cost: 220000,
        id: 11
   },
   {
    	name: 'AMD EPYC 7702P',
        cost: 220000,
        id: 12
   },
   {
    	name: 'AMD EPYC 7742',
        cost: 220000,
        id: 13
   },
   {
    	name: 'AMD Ryzen Threadripper 3960X',
        cost: 220000,
        id: 14
   },
   {
    	name: 'AMD Ryzen Threadripper 3970X',
        cost: 220000,
        id: 15
   }
];


const corpus = [
   {
    	name: 'Zalman I3',
        cost: 10000,
        id: 1
   },
   {
    	name: 'AeroCool P7-C0 Black',
        cost: 30000,
        id: 2
   },
   {
    	name: 'AeroCool Quartz RGB Black',
        cost: 50000,
        id: 3
   },
   {
    	name: 'AeroCool Cruisestar Advance Black',
        cost: 60000,
        id: 4
   },
   {
    	name: 'Thermaltake Core V51 TG-CA-1C6-00M1WN-03 BLACK',
        cost: 85000,
        id: 5
   }
];

const blokpc = [
   {
    	name: 'Thermaltake TR2 S 650W',
        cost: 1000,
        id: 1
   },
   {
    	name: 'Thermaltake Smart RGB 700W',
        cost: 5000,
        id: 2
   },
   {
    	name: 'Thermaltake Toughpower Grand RGB Gold (Fully Modular) 850W',
        cost: 7000,
        id: 3
   },
   {
    	name: 'Corsair AX1000 80 Plus Titanium 1000W',
        cost: 12000,
        id: 4
   },
   {
    	name: 'Corsair RM1000x 1000W',
        cost: 30000,
        id: 5
   }
];

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
		name: 'Запорожец',
		cost: 100000,
		id: 1
	},
	{
		name: 'Лада четырка',
		cost: 200000,
		id: 2
	},
	{
		name: 'Лада шестерка',
		cost: 250000,
		id: 3
	},
	{
		name: 'Лада Семерочка',
		cost: 350000,
		id: 4
	},
	{
		name: 'Нива',
		cost: 500000,
		id: 5
	},
	{
		name: 'Волга',
		cost: 600000,
		id: 6
	},
	{
		name: 'УАЗИК',
		cost: 800000,
		id: 7
	},
	{
		name: 'Лада Калина',
		cost: 1000000,
		id: 8
	},
	{
		name: 'Ford Focus',
		cost: 1200000,
		id: 9
	},
	{
		name: 'Hyundai Elantra',
		cost: 1500000,
		id: 10
	},
	{
		name: 'Volkswagen Tiguan TURBO',
		cost: 1800000,
		id: 11
	},
	{
		name: 'Lexus LC 500',
		cost: 2500000,
		id: 12
	},
	{
		name: 'Lexus ES 350',
		cost: 3200000,
		id: 13
	},
	{
		name: 'Lamborghini Urus',
		cost: 5000000,
		id: 14
	},
	{
		name: 'Lamborghini Huracan',
		cost: 7000000,
		id: 15
	},
	{
		name: 'Lamborghini Aventador',
		cost: 9000000,
		id: 16
	},
	{
		name: 'Bugatti Veyron',
		cost: 12000000,
		id: 17
	},
	{
		name: 'Bugatti Chiron',
		cost: 15000000,
		id: 18
	},
	{
		name: 'Bugatti Divo',
		cost: 17000000,
		id: 19
	},
	{
		name: 'Tesla Cybertruck',
		cost: 23000000,
		id: 20
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
	},
	{
		name: 'Памперс',
		cost: 100000,
		id: 14
	},
	{
		name: 'Надувной круг',
		cost: 100000,
		id: 15
	},
	{
		name: 'Кальмар',
		cost: 100000,
		id: 16
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
	},
	{
		name: 'Своя планета',
		cost: 500000000000,
		id: 16
	},
	{
		name: 'Канализация',
		cost: 150000,
		id: 17
	},
	{
		name: 'Мусорка',
		cost: 150000,
		id: 18
	},
	{
		name: 'Теремок',
		cost: 150000,
		id: 19
	},
	{
		name: 'Скамейка',
		cost: 15000,
		id: 20
	}
];

const clothes = [
	{
		name: 'Шмотки с AliExpress',
		cost: 5,
		id: 1
	},
	{
		name: 'Шмотки с рынка',
		cost: 1000,
		id: 2
	},
	{
		name: 'Demix',
		cost: 10000,
		id: 3
	},
	{
		name: 'Puma',
		cost: 20000,
		id: 4
	},
	{
		name: 'Reebook',
		cost: 37000,
		id: 5
	},
	{
		name: 'Nike',
		cost: 48000,
		id: 6
	},
	{
		name: 'Adidas',
		cost: 85000,
		id: 7
	},
	{
		name: 'Armani',
		cost: 120000,
		id: 8
	},
	{
		name: 'Versace',
		cost: 170000,
		id: 9
	},
	{
		name: 'Burbеrrу',
		cost: 200000,
		id: 10
	},
	{
		name: 'Ralph Lauren',
		cost: 250000,
		id: 11
	},
	{
		name: 'Coco Channel',
		cost: 550000,
		id: 12
	},
	{
		name: 'Prada',
		cost: 1000000,
		id: 13
	},
	{
		name: 'Hermes',
		cost: 1500000,
		id: 14
	},
	{
		name: 'TOMMY HILFIGER',
		cost: 5000000,
		id: 15
	},
	{
		name: 'Stone Island',
		cost: 7000000,
		id: 16
	},
	{
		name: 'Supreme',
		cost: 10000000,
		id: 17
	},
	{
		name: 'GUCCI',
		cost: 30000000,
		id: 18
	},
	{
		name: 'Louis Vuitton',
		cost: 50000000,
		id: 19
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
		cost: 120000,
		id: 10
	},
	{
		name: 'iРhоnе XR',
		cost: 150000,
		id: 11
	},
	{
		name: 'iРhоnе XS MАX',
		cost: 190000,
		id: 12
	},
	{
		name: 'iPhone 11 Pro',
		cost: 220000,
		id: 13
	},
	{
		name: 'iРhоnе 11 Рrо Mаx',
		cost: 260000,
		id: 14
	}
];

const pets = [
	{
		name: 'Улитка',
		cost: 1000,
		id: 1,
		icon: '🐌'
	},
	{
		name: 'Лягушка',
		cost: 25000,
		id: 2,
		icon: '🐸'
	},
	{
		name: 'Заяц',
		cost: 500000,
		id: 3,
		icon: '🐰'
    },
	{
		name: 'Свинья',
		cost: 300000000,
		id: 4,
		icon: '🐷'
    },
	{
		name: 'Лиса',
		cost: 1250000000,
		id: 5,
		icon: '🦊'
    },
	{
		name: 'Собака',
		cost: 5000000000,
		id: 6,
		icon: '🐶'
    },
	{
		name: 'Панда',
		cost: 30000000000,
		id: 7,
		icon: '🐼'
    },
	{
		name: 'Горилла',
		cost: 180000000000,
		id: 8,
		icon: '🦍'
    },
    {
		name: 'Волк',
		cost: 360000000000,
		id: 9,
		icon: '🐺'
    },
    {
		name: 'Летучая мышь',
		cost: 500000000000,
		id: 10,
		icon: '🦇'
    },
    {
		name: 'Дед Мороз',
		cost: 600000000000,
		id: 11,
		icon: '🎅🏼'
    },
    {
		name: 'КоронаВирус',
		cost: 800000000000,
		id: 11,
		icon: '🎽'
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
		name: 'RTX 3090 TI SUPER TURBO ',
		cost: 1300000000,
		id: 4
	}
];

const lfarms = [
	{
		name: 'LTC FARM BASIC',
		cost: 1000000,
		id: 1
	},
	{
		name: 'LTC FARMER AUTO STANDART',
		cost: 30000000,
		id: 2
	},
	{
		name: 'LiteCoin FARM Platinum',
		cost: 50000000,
		id: 3
	},
	{
		name: 'LiteCoin FARM Titanium ',
		cost: 70000000,
		id: 4
	}
];

const printers = [
	{
		name: 'Саnоn РIXMА',
		cost: 10000000000,
		id: 1
	},
	{
		name: 'HР ОffiсеJеt Рrо',
		cost: 50000000000,
		id: 2
	},
	{
		name: 'Xеrоx Рhаsеr 7800DN',
		cost: 400000000000,
		id: 3
	},
	{
		name: 'Ерsоn SurеLаb',
		cost: 800000000000,
		id: 4
	},
	{
		name: 'HР Соlоr LаsеrJеt',
		cost: 3000000000000,
		id: 5
	}
];

const zdanie = [
	{
		name: 'Сбербанк',
		cost: 850000000000,
		id: 1
	},
	{
		name: 'ВТБ',
		cost: 1000000000000,
		id: 2
	},
	{
		name: 'Тинькофф',
		cost: 3000000000000,
		id: 3
	}
];


const businesses = [
	[ // Бизнес #1
		{ // Стандартный бизнес
			name: 'СуперМаркет',
			cost: 10000,
			earn: 8000,
			workers: 30,
			id: 1,
			icon: '💼'
		},

		{ // Первое улучшение
			name: 'Большой СуперМаркет "Пятерочка" ',
			cost: 40000,
			earn: 12000,
			workers: 80,
			id: 1,
			icon: '💼'
		}
	],

	[
		{
			name: 'Малоимущий ресторан',
			cost: 500000,
			earn: 20000,
			workers: 100,
			id: 2,
			icon: '💼'
		},

		{
			name: 'Популярный дорогой ресторан "Шоколадница"',
			cost: 600000,
			earn: 50000,
			workers: 150,
			id: 2,
			icon: '💼'
		}
	],

	[
		{
			name: 'Сервис Починки Электро оборудования',
			cost: 1000000,
			earn: 70000,
			workers: 60,
			id: 3,
			icon: '💼'
		},

		{
			name: 'Популярный Сервис починки',
			cost: 1700000,
			earn: 100000,
			workers: 100,
			id: 3,
			icon: '💼'
		}
	],

	[
		{
			name: 'Атомная Электростанция',
			cost: 3000000,
			earn: 200000,
			workers: 250,
			id: 4,
			icon: '💼'
		},

		{
			name: 'Улучшенная Электростанция',
			cost: 9000000,
			earn: 400000,
			workers: 450,
			id: 4,
			icon: '💼'
		}
	],

	[
		{
			name: 'Производство Машин',
			cost: 12000000,
			earn: 500000,
			workers: 200,
			id: 5,
			icon: '💼'
		},

		{
			name: 'Производство машин "Tesla"',
			cost: 17000000,
			earn: 700000,
			workers: 350,
			id: 5,
			icon: '💼'
		}
	],

	[
		{
			name: 'Производство машин "Bugatti"',
			cost: 15000000,
			earn: 800000,
			workers: 500,
			id: 6,
			icon: '💼'
		},

		{
			name: 'Улучшенное производство машин "Bugatti"',
			cost: 45000000,
			earn: 1000000,
			workers: 800,
			id: 6,
			icon: '💼'
		}
	],

	[
		{
			name: 'КиноСтудия',
			cost: 50000000,
			earn: 1000000,
			workers: 450,
			id: 7,
			icon: '💼'
		},

		{
			name: 'Популярная КиноСтудия',
			cost: 150000000,
			earn: 1400000,
			workers: 700,
			id: 7,
			icon: '💼'
		}
	],

	[
		{
			name: 'Бордель',
			cost: 2500000000,
			earn: 60000000,
			workers: 150,
			id: 8,
			icon: '💼'
		},

		{
			name: 'Бордель по всей России',
			cost: 10500000000,
			earn: 120000000,
			workers: 1200,
			id: 8,
			icon: '💼'
		}
	],

	[
		{
			name: 'Торговля оружием',
			cost: 10000000000,
			earn: 120000000,
			workers: 20,
			id: 9,
			icon: '💼'
		},

		{
			name: 'Торговля оружия в России',
			cost: 50000000000,
			earn: 300000000,
			workers: 80,
			id: 9,
			icon: '💼'
		},

		{
			name: 'Торговля оружием по всему миру',
			cost: 140000000000,
			earn: 600000000,
			workers: 150,
			id: 9,
			icon: '💼'
		}
	],

	[
		{
			name: 'Контробанда за границей',
			cost: 80000000000,
			earn: 2000000000,
			workers: 100,
			id: 10,
			icon: '💼'
		},

		{
			name: 'Беспаливная контробанда по всей России',
			cost: 200000000000,
			earn: 5000000000,
			workers: 230,
			id: 10,
			icon: '💼'
		},

		{
			name: 'Лучшая контробанда по всему миру',
			cost: 450000000000,
			earn: 10000000000,
			workers: 600,
			id: 10,
			icon: '💼'
		}
	],

	[
		{
			name: 'Завод Президента США',
			cost: 250000000000000,
			earn: 150000000000,
			workers: 1000,
			id: 11,
			icon: '💼'
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
		name: 'Сторож',
		requiredLevel: 3,
		min: 3750,
		max: 4000,
		id: 2
	},
	{
		name: 'Продавец',
		requiredLevel: 5,
		min: 4000,
		max: 4500,
		id: 3
	},
	{
		name: 'Няня',
		requiredLevel: 8,
		min: 6000,
		max: 8000,
		id: 4
	},
	{
		name: 'Курьер',
		requiredLevel: 10,
		min: 7500,
		max: 8000,
		id: 5
	},
	{
		name: 'Слесарь',
		requiredLevel: 14,
		min: 9000,
		max: 9489,
		id: 6
	},
	{
		name: 'Охранник',
		requiredLevel: 22,
		min: 10000,
		max: 12500,
		id: 7
	},
	{
		name: 'Библиотекарь',
		requiredLevel: 25,
		min: 12500,
		max: 13500,
		id: 8
	},
	{
		name: 'Воспитатель',
		requiredLevel: 25,
		min: 14500,
		max: 16500,
		id: 9
	},
	{
		name: 'Педагог',
		requiredLevel: 49,
		min: 16000,
		max: 17500,
		id: 10
	},
	{
		name: 'Повар',
		requiredLevel: 65,
		min: 17500,
		max: 18500,
		id: 11
	},
	{
		name: 'Грузчик',
		requiredLevel: 95,
		min: 19500,
		max: 20500,
		id: 12
	},
	{
		name: 'Парикмахер',
		requiredLevel: 105,
		min: 23500,
		max: 24500,
		id: 13
	},
	{
		name: 'Врач',
		requiredLevel: 125,
		min: 24500,
		max: 25500,
		id: 14
	},
	{
		name: 'Торговый представитель',
		requiredLevel: 145,
		min: 26500,
		max: 27500,
		id: 15
	},
	{
		name: 'Специалист по валютным операциям',
		requiredLevel: 200,
		min: 55500,
		max: 70500,
		id: 16
	},
	{
		name: 'Юрист по налоговому праву',
		requiredLevel: 250,
		min: 70500,
		max: 110500,
		id: 17
	},
	{
		name: 'Программист PHP',
		requiredLevel: 300,
		min: 90500,
		max: 120500,
		id: 18
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
const clans = require('./clans.json');
const chatslist = require('./database/chatslist.json');
const promo = require('./database/promo.json');
const log = require('./database/log.json');
const soobshenie = require('./database/soobshenie.json');
const users = require('./database/users.json'); 
const botinfo = require('./database/botinfo.json');
const uid = require("./database/uid.json");
let buttons = [];

setInterval(function(){
	fs.writeFileSync('./database/users.json', JSON.stringify(users, null, "\t"))
	fs.writeFileSync('./clans.json', JSON.stringify(clans, null, "\t"))
	fs.writeFileSync('./database/log.json', JSON.stringify(log, null, "\t"))
	fs.writeFileSync('./database/chatslist.json', JSON.stringify(chatslist, null, "\t"))
	fs.writeFileSync('./database/promo.json', JSON.stringify(promo, null, "\t"))
	fs.writeFileSync('./database/soobshenie.json', JSON.stringify(soobshenie, null, "\t"))
	fs.writeFileSync('./database/botinfo.json', JSON.stringify(botinfo, null, "\t"))
	fs.writeFileSync("./database/uid.json", JSON.stringify(uid, null, "\t"))
}, 1500);

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

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += x.misc.farm_count * 10;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += x.misc.farm_count * 20;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += x.misc.farm_count * 100;
		}
		
		if(x.misc.farm === 4)
		{
			x.farm_btc += x.misc.farm_count * 300;
		}
	});
}, 900000);

setInterval(async () => {
	users.filter(x=> x.apartment !== 0).map(x=> {
		if(x.apartment === 1)
		{
			x.nalog += 1000;
		}

		if(x.apartment === 2)
		{
			x.nalog += 5000;
		}

		if(x.apartment === 3)
		{
			x.nalog += 20000;
		}
		
		if(x.apartment === 4)
		{
			x.nalog += 25000;
		}
		if(x.apartment === 5)
		{
			x.nalog += 30000;
		}

		if(x.apartment === 6)
		{
			x.nalog += 100000;
		}

		if(x.apartment === 7)
		{
			x.nalog += 200000;
		}

		if(x.apartment === 8)
		{
			x.nalog += 400000;
		}
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.home !== 0).map(x=> {
		if(x.home === 1)
		{
			x.nalog += 5000;
		}

		if(x.home === 2)
		{
			x.nalog += 10000;
		}

		if(x.home === 3)
		{
			x.nalog += 15000;
		}
		if(x.home === 4)
		{
			x.nalog += 20000;
		}

		if(x.home === 5)
		{
			x.nalog += 25000;
		}

		if(x.home === 6)
		{
			x.nalog += 15000;
		}

		if(x.home === 7)
		{
			x.nalog += 30000;
		}

		if(x.home === 8)
		{
			x.nalog += 40000;
		}

		if(x.home === 9)
		{
			x.nalog += 80000;
		}

		if(x.home === 10)
		{
			x.nalog += 100000;
		}

		if(x.home === 11)
		{
			x.nalog += 180000;
		}

		if(x.home === 12)
		{
			x.nalog += 250000;
		}

		if(x.home === 13)
		{
			x.nalog += 500000;
		}

		if(x.home === 14)
		{
			x.nalog += 700000;
		}

		if(x.home === 15)
		{
			x.nalog += 1000000;
		}

		if(x.home === 16)
		{
			x.nalog += 10000000;
		}
	});
}, 3600000);


setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += x.misc.farm_count * 10;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += x.misc.farm_count * 20;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += x.misc.farm_count * 100;
		}
		
		if(x.misc.farm === 4)
		{
			x.farm_btc += x.misc.farm_count * 300;
		}
	});
}, 900000);

setInterval(async () => {
	users.filter(x=> x.printer !== 0 && x.kraska !== 0).map(x=> {
		if(x.printer === 1)
		{
			x.printermoney += 250000000;
		}

		if(x.printer === 2)
		{
			x.printermoney += 1000000000;
		}

		if(x.printer === 3)
		{
			x.printermoney += 5000000000;
		}
		
		if(x.printer === 4)
		{
			x.printermoney += 10000000000;
		}

		if(x.printer === 5)
		{
			x.printermoney += 120000000000;
		}
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.zdanie !== 0 && x.stroizd !== 1).map(x=> {
		if(x.zdanie === 1)
		{
			x.zdaniemoney += 250000000;
		}

		if(x.zdanie === 2)
		{
			x.zdaniemoney += 1000000000;
		}

		if(x.zdanie === 3)
		{
			x.zdaniemoney += 5000000000;
		}
		
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.printer !== 0 && x.kraska !== 0).map(x=> {
		if(x.printer === 1)
		{
			x.kraska -= 1;
		}

		if(x.printer === 2)
		{
			x.kraska -= 1;
		}

		if(x.printer === 3)
		{
			x.kraska -= 1;
		}
		
		if(x.printer === 4)
		{
			x.kraska -= 1;
		}

		if(x.printer === 5)
		{
			x.kraska -= 1;
		}
	});
}, 3600000);



setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/ltc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	ltc = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/ltc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	ltc = Math.floor(Number(rq.ticker.price));
}, 60000);

setInterval(async () => {
	users.filter(x=> x.lfarm !== 0).map(x=> {
		if(x.lfarm === 1)
		{
			x.farmltc += x.lfarm_count * 50000;
		}

		if(x.lfarm === 2)
		{
			x.farmltc += x.lfarm_count * 100000;
		}

		if(x.lfarm === 3)
		{
			x.farmltc += x.lfarm_count * 150000;
		}
		
		if(x.lfarm === 4)
		{
			x.farmltc += x.lfarm_count * 250000;
		}
	});
}, 900000);



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
		user.timers.clear = false;
		user.timers.race = false;
		user.timers.race1 = false;
		user.timers.race2 = false;
		user.timers.race3 = false;
		user.timers.present = false;
		user.timers.pcmine = false;
		user.timers.pcgame = false;
		user.timers.bancs = false;
		user.timers.poxod = false;
		user.timers.daiving = false;
		user.timers.daiving = 0;
		user.timers.hack = false;
		user.timers.translation = false;
		user.orcase = false;
		user.urabota = false;
		user.a_case = false;
		user.bonus_balance = false;
		user.bcase = false;
	    user.timers.shaxta = false;
	    user.bonus_exs = false;
	    user.timers.eda = false;
	    user.timers.krik = false;
		user.timers.mine = false;
        user.giverub = false;
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

setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

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

function filter(text){
	var filter0 = text.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ig, "<LINK REMOVED>")
	var filter1 = filter0.replace(/(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.|ТЕСТЕР|Павел Дуров)/ig, '[Запрещено]')
	return filter1
}

clearTemp();

vk.setOptions({ token: '0ea146f957ae158f1e9559457c53aefdab399961e4cacd706150746d754e4e3a95ea70b73561cfd048aa4', pollingGroupId: 190506705 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club190506705\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club190506705\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();
			`https://vk.com/sticker/1-6086-128`
			message.send(`🔥 ОГО! *id${message.senderId} (${user_info.first_name}), ты у меня ВПЕРВЫЕ! Рад познакомится, получай 50.000 $ в ПОДАРОК!!! 🤑\n\nОтправь «помощь» что бы узнать мои команды. 📚`)

		users.push({
            id: message.senderId,
			uid: users.length,
			 podpis: 0,
               hei: 0,
               video: 0,
               nalog: 0,
               home: 0,
               nalogblock: 0,
               apartment: 0,
               requiredLevel: 1,
               ltc: 0,
               printer: 0,
               perelet: 1,
               zdanie: 0,
               stroizd: 0,
               zdstroi: 0,
               zdaniemoney: 0,
               printermoney: 0,
               kraska: 0,
               kanal: false,
               knser: false,
               password: 0,
               clothes: 0,
               lfarm: 0,
               farmltc: 0,
               lfarm_count: 0,
               mikro: false,
               serkn: false,
               kakake: false,
               rubinov:false,
               lic1: false,
               lic2: false,
               lic3: false,
               lic4: false,
               garage: false,
               garageslots: 0,
               car2: 0,
               car1: 0,
               processor: 0,
               hddd: 0,
               materinka: 0,
               kuler: 0,
               kulercorpus: 0,
               monitor: 0,
               ozuu: 0,
               kulercorpuskolvo: 0,
               videokarta: 0,
               corpuspc: 0,
               bp: 0,
               uggg: false,
               fggg: false,
               bonus_balance: false,
               xxxkn: false,
               herkn: false,
               bcase: false,
               videokart: false,
               mater: false,
               hdd: false,
               bpsyst: false,
               ozu: false,
               hdd: false,
               proc: false,
               monik: false,
               kulerproc: false,
               kulercorp: false,
               kulercorpkolvo: false,
               korpus: false,
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
			   verify: 0,
			   ver: 0,
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
			rub: 0,
            balance: 50000,
			rubins: 0,
			msgbalance: 0,
			bank: 0,
			diamond: 0,
			emeralds: 0,
			matter: 0,
			coal: 0,
			iron: 0,
			business: 0,
			gold: 0,
			uron: 0,
			duel: false,
			duel_summ: false,
			nachal: false,
			cvb: false,
			givemecoins: false,
			btc: 0, 
			hp: 100,
			zashita: 10,
			rang: "Новичок",
			credit: 0,
			ataka: 25, 
			kr_udar: 1,
			farm_btc: 0,
			straik: 0,
			procent: 0,
			prefix: 1,
			pay: false,
			kazna: 0,
			donate_case: 0,
			premium_case: 0,
			halloween_case: 0,
			newyear_case: 0,
			platinum_case: 0,
			surpris_case: 0,
			gold: 0,
            biz: 0,
            lists: 0,
            ruda: 0,
			right: 0,
			bancard: false,
			givemyrub: false,
			urabota: false,
			a_case: false,
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
			    Poxod: false,
			    shaxta: false
            },
			tag: user_info.first_name,
			work: 0,
			clans_name: false,
			vig: 0,
            voice: true,
            gun_name: false,
            	game: {
				strela_win: 0,
				strela_loose: 0
			},
            sword: false,
            eda: false,
            games: true,
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
            invites: true,
            systempc: {
	    ozu: false,
	    videokarta: false,
	    blok: false,
	    pc: false,
            },
            keyboard: true,
            clans: false,
            clan: false,
            clanid: false,
            pay: true,
            times: false,
            promotime: true,
            frac: false,
            bonus_exs: false,
            loxotron: true,
            jetons: 1,
            call: 0,
            clanid: false,
            ccard: false,
            business: [],
			card: 0,
			seccard: 0,
			cardss: 0,
            rolls: true,
            messages: false,
            gun: false,
            case: true,
            dice: true,
            free: true,
            giverub: false,
            mute: false,
            msg: 0,
            pay: 0,
			message: 0,
			notifications: true,
			opit: 0,
			energy: 10,
			level: 1,
			pcstart: false,
			referal: null,
			exp: 0,
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
			    farm_count: 0,
            },
			marriage: {
				partner: 0,
				requests: [],
			},
			pets: {
				pet: 0,
				level: 0,
				satiety: 0,
				joy: 0

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
 
       botinfo.msg += 1;
	message.user.msg += 1;

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
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:eval|dev|zz)\s([^]+)$/i, async (message, bot) => {
	if(message.user.right < 6) return bot(`Не сможешь сюда зайти!`)
	if(message.senderId !== 516233741 && message.senderId !== 205702799 && message.senderId !== 535253089) return;

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

//////Ютуб

cmd.hear(/^(?:создать канал)\s?([^]+)?/i, async (message, args, bot) => {
	let user = message.user 
	let zaprets1 = message.args[1].toLowerCase();
          if(message.user.obor == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет оборудования! Введите «оборудование»`);
		if(message.user.obor == true){
		if(message.user.kanal == true) return message.send(`@id${message.user.id} (${message.user.tag}), У вас уже есть канал!`);
		if(message.user.kanal == false){
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`@id${message.user.id} (${message.user.tag}), Придумайте адекватное название канала`);
     }
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`@id${message.user.id} (${message.user.tag}), Придумайте адекватное название канала`);
	}
	if(message.args[1].length > 15) return message.send(`@id${message.user.id} (${message.user.tag}), Максимальная длина канала 15 символов.`);
	if(user.balance < 1000000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег для создания канала, стоимость 1.000.000.000$`);
 	user.balance -= 1000000000;
	user.name = message.args[1];
     user.kanal = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы успешно создали канал: ${message.args[1]}`);
      }
   }
});

cmd.hear(/^(?:unmute)\s([0-9]+)$/i, async (message, bot) => {
	const user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 3) return bot(`Вы не Мл.Администратор`)
	let args = message.args[1];

	if(user.mute == false) return bot(`у игрока нет мута`);
	
	user.mute = false;

	vk.api.messages.send({ user_id: user.id, message: `Администратор [id${message.user.id}|${message.user.tag}] забрал у вас мут. ` });

	await message.send(`@id${message.user.id}(${message.user.tag}), вы забрали мут у игрока *id${user.id} (${user.tag})`);
}); 

		cmd.hear(/^(?:mute)\s([0-9]+)$/i, async (message, bot) => {
	const user = users.find(x=> x.uid === Number(message.args[1]));
 if(message.user.right < 3) return bot(`Вы не Мл.Администратор`)
	if(!Number(message.args[1])) return bot(`пример команды: "mute [ID]"`); 
	if(!user) return bot(`неправильный ID.`);

	user.mute = true

	vk.api.messages.send({ user_id: user.id, message: `Администратор [id${message.user.id}|${message.user.tag}] ` });
await bot(`вы выдали мут игроку *id${user.id} (${user.tag})`);
}); 


cmd.hear(/^(?:оборудование)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.obor == true) return message.send(`@id${message.user.id} (${message.user.tag}), У тебя уже есть оборудование!`);
		if(message.user.obor == false){
 		if(message.user.balance < 3000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег! Цена оборудования 3.000.`);
 		message.user.balance -= 3000;
          message.user.obor = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы успешно купили оборудование для съёмок! Вас ждёт светлое будущее`);
   }
});

	cmd.hear(/^(?:канал)$/i, async (message, bot) => {

	let user = message.user
	let id = message.user.id
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала`);
		if(message.user.kanal == true){
		return message.send(`
         @id${message.user.id} (${message.user.tag}), твой канал 🔥
       📕 Название: ${message.user.name}
       😻 Подписчиков: ${message.user.podpis}
       🚫 Хейтеров: ${message.user.hei}
       👁 Просмотров: ${message.user.prosm}
       👍 Лайков: ${message.user.like}
       👎 Дизлайков: ${message.user.dizlike}
       💎 Баланс канала: ${message.user.ymoney}
       💬 Комментариев: ${message.user.kom}
       🎥 Роликов: ${message.user.video}
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

 	 	cmd.hear(/^(?:юработать)$/i, async (message, bot) => {
		let user = message.user
 		let id = message.user.id
 		if(message.user.urabota == true) return message.send(`@id${message.user.id} (${message.user.tag}), Работать можно раз в 10 минут`);
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

cmd.hear(/^(?:получить ск)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.serkn == true) return message.send(`@id${message.user.id} (${message.user.tag}), Ты уже получал кнопку!`);
		if(message.user.serkn == false){
 		if(message.user.podpis < 100000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно подписчиков. Нужно 100000`);

     message.user.serkn = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы получили Серебряную кнопку.`);
     }
   }
});

cmd.hear(/^(?:получить зк)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.zolkn == true) return message.send(`@id${message.user.id} (${message.user.tag}), Ты уже получал кнопку!`);
		if(message.user.zolkn == false){
 		if(message.user.podpis < 1000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно подписчиков. Нужно 1 миллион`);

     message.user.zolkn = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы получили золотую кнопку.`);
     }
   }
});

cmd.hear(/^(?:получить бк)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.brilkn == true) return message.send(`@id${message.user.id} (${message.user.tag}), Ты уже получал кнопку!`);
		if(message.user.brilkn == false){
 		if(message.user.podpis < 10000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно подписчиков. Нужно 10 миллион`);

     message.user.brilkn = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы получили Бриллиантовую кнопку.`);
     }
   }
});

cmd.hear(/^(?:получить рк)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.rubinov == true) return message.send(`@id${message.user.id} (${message.user.tag}), Ты уже получал кнопку!`);
		if(message.user.rubinov == false){
 		if(message.user.podpis < 50000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно подписчиков. Нужно 10 миллион`);

     message.user.rubinov = true;
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы получили Рубиновую кнопку.`);
     }
   }
});

cmd.hear(/^(?:юпомощь)$/i, async (message, bot) => {
	let user = message.user
	if(message.user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
	@id${message.user.id} (${message.user.tag}), ❄ Прежде чем стать блогером, тебе нужно будет подкопить деньжат используя команду «Работать», ее ты можешь использовать раз в 10 минут.

⭕Далее, тебе нужно будет приобрести оборудование для съемки командой «Оборудование», после этого, можешь создавать канал - создать «Название».

❗Помни, что нецензурная лексика в названии канала может привести к бану, после создания канала, снимай ролики - снять «название» и набирай популярность.

👾Напиши команду "ринфо" без кавычек, там ты сможешь приглашать друзей и зарабатывать деньги. А так же узнать сколько друзей ты пригласил!

✅Полный список команд ты можешь получить введя «Команды».


😋Удачи!.
    `)
   });
   
cmd.hear(/^(?:ринфо)$/i, async (message, bot) => {
	let user = message.user
	if(message.user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`✉ » За приглашение участников вы получите привилегии.

🎁 » за 100+ приглашенных участников - привилегию Bronze
🎁 » за 300+ приглашенных участников - привилегию Silvers
🎁 » за 500+ приглашенных участников - привилегию Gold
🎁 » за 1000+ приглашенных участников - привилегию Diamond

📝 » Если вы пригласили 100+ участников, пишите владельцу бота в лс vk.me/seregabrestsmir1`)
   });


 	 cmd.hear(/^(?:стрим)$/i, async (message, bot) => {
		let user = message.user
         	if(message.user.mikro == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет микрофона, купите его командой «микрофон» без «»`);
		if(message.user.mikro == true){
 		if(message.user.a_case == true) return message.send(`@id${message.user.id} (${message.user.tag}), Стримить можно раз в 10 минут`); 
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
 				mon = 2 + message.user.podpis + 10
 				if(user.bonus_balance == true) mon = mon * 2;
 				text += `@id${message.user.id} (${message.user.tag}), Мои подписчики самые крутые😊\n💰Заработано за стрим: ${spaces(mon)}$\n`
 				message.user.ymoney += mon
 			}
 			if(x>81 && x <82){
 				mon = 2 + message.user.podpis + 10
 				text += `@id${message.user.id} (${message.user.tag}), Обожаю себя!😋\n💰Заработано за стрим: ${spaces(mon)}$\n`
 				message.user.ymoney += mon
 			}
 			if(x>80){
 				mon = 2 + message.user.podpis + 10
 				if(user.bonus_exp == true) mon = mon * 2;
 				message.user.ymoney += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `Доработки)\n`
 				}else{
 					text += `@id${message.user.id} (${user.tag}), Обожаю себя!😋\n💰Заработано за стрим: ${mon}$`
 				}
 				 }
 				 
 			}
 		}
 		return message.send(text)
 	});

 	cmd.hear(/^(?:реклама)$/i, async (message, bot) => {
	let user = message.user
	if(message.user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
    ${message.user.tag}, Хай, хочешь купить рекламу для своего канала😏?

✅Мы - самая надежная и законная компания по продаже рекламы, с нами ты достигнешь высот!

1.Тариф «Старт»:
　📈Прирост: ~1.000 сабов
　💸Цена: 15.000$

2.Тариф «Нормал»:
　📈Прирост: ~10.000 сабов
　💸Цена: 75.000$

3.Тариф «Про»:
　📈Прирост: ~100.000 сабов
　💸Цена: 750.000$

4. Тариф «Мега»:
　💸Прирост: ~500.000 сабов
　💸Цена: 3.000.000$

🔥Для покупки введите реклама «нужный вам тариф»
　📈 пиши : реклама <нужный тариф»
  Пример : рекалама мега

    `)
   });

cmd.hear(/^(?:тренды)$/i, async (message, bot) => {
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

 	cmd.hear(/^(?:снять)\s?([^]+)?/i, async (message, args, bot) => {
	let user = message.user
	 let id = message.user.id
	 
	 if(message.args[1].length < 2) return message.send(`Слишком мало символов в названии видео!`);
	 if(message.args[1].length > 40) return message.send(`Слишком много символов в названии видео!`);	 
		if(message.user.kanal == false) return message.send(`У вас нет канала!`);
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
	return message.send(`@id${message.user.id} (${message.user.tag}), Вы успешно отсняли ролик: ${message.args[1]}\n\n🎬Статистика ролика:\n👁 Просмотров: ${spaces(prosm)}\n👍 Лайков: ${spaces(likes)}\n👎 Дизлайков: ${spaces(dizlikes)}\n💬 Комментариев: ${spaces(kom)}\n💸 + ${spaces(mones)}$\n🎬Новых сабов: ${spaces(podpis)}\n🚫 Новых хейтеров: ${spaces(heit)}\n✅Ты на верном пути, продолжай выпускать ролики!:`);
   }
});

 	cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredlevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать в Общее - ${work.name}
		👔 Введите команду "Работать"`);
	}
});



cmd.hear(/^(?:работа)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(`профессии:
	👔 1. Дворник || Зарплата ~2.000$ || Левел: 1
	👔 2. Сторож || Зарплата ~3.750$ || Левел: 3
	👔 3. Продавец || Зарплата ~4.000$ || Левел: 5
	👔 4. Няня || Зарплата ~6.000$ || Левел: 8
	👔 5. Курьер || Зарплата ~7.500$ || Левел: 10
	👔 6. Слесарь || Зарплата ~9.000$ || Левел: 14
	👔 7. Охранник -|| Зарплата ~10.000$ || Левел: 22
	👔 8. Библиотекарь || Зарплата ~12.500$ || Левел: 25
	👔 9. Воспитатель || Зарплата ~14.500$ || Левел: 35
	👔 10. Педагог || Зарплата ~16.000$ || Левел: 49
	👔 11. Повар || Зарплата ~17.500$ || Левел: 65
	👔 12. Грузчик || Зарплата ~19.500$ || Левел: 95
	👔 13. Парикмахер || Зарплата ~23.500$ || Левел: 105
	👔 14. Врач || Зарплата ~24.500$ || Левел: 125
	👔 15. Торговый представитель || Зарплата ~26.500$ || Левел: 145
	👔 16. Специалист по валютным операциям || Зарплата ~55.500$ || Левел: 200
	👔 17. Юрист по налоговому праву || Зарплата ~70.500$ || Левел: 250
	👔 18. Программист PHP || Зарплата ~90.500$ || Левел: 300

	[💡] » Для усройства на работу - Работа [номер] 
    [💡] » Для для того, чтобы уволиться - уволиться
	
    [💰] || Зарплату можно получать в течении 10 мин.
    [💰] | Командой - Работать`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(message.user.exp >= 5){
		    message.user.exp = 0;
			message.user.requiredlevel += 1;
			message.send(`Вы повысили уровень работ! Ваш уровень: ${message.user.requiredlevel}`)
		}
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);
	{
	if(message.user.timers.hasWorked) return bot(`рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 5 минут`); 
	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 300000);

	message.user.timers.hasWorked = true;
}
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}$`);

});

cmd.hear(/^(?:уволиться|уволится)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.hear(/^(?:микрофон)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.mikro == true) return message.send(`@id${message.user.id} (${message.user.tag}), У тебя уже есть микрофон!`);
		if(message.user.mikro == false){
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У тебя нет канала)`);
		if(message.user.kanal == true){
 		if(message.user.ymoney < 500) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег Цена микрофона 500.`);
 		message.user.ymoney -= 500;
         message.user.mikro = true;
	return message.send(`@id${message.user.id} (${user.tag}), Вы успешно купили микрофон для стримов`);
     }
   }
});

cmd.hear(/^(?:реклама старт)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`@id${message.user.id} (${message.user.tag}), Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 15000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег.`);
 		message.user.ymoney -= 15000;
     podpis = rand(700,900);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`@id${message.user.senderId} (${message.user.tag}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.hear(/^(?:реклама нормал)$/i, async (message, bot) => { 
	let user = message.user
     let id = message.user.id

		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`@id${message.user.id} (${message.user.tag}), Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 75000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег.`);
 	message.user.ymoney -= 75000;
     podpis = rand(1000,5000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`@id${message.user} (${user.tag}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.hear(/^(?:реклама про)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`@id${message.user.id} (${message.user.tag}), Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.ymoney < 750000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег.`);
 	message.user.ymoney -= 750000;
     podpis = rand(100000,130000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`@id${message.user.id} (${message.user.tag}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

cmd.hear(/^(?:реклама мега)$/i, async (message, bot) => {
	let user = message.user
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет канала!`);
		if(message.user.kanal == true){
		if(message.user.bcase == true) return message.send(`@id${message.user.id} (${message.user.tag}), Покупать рекламу можно раз в 10 минут `);
 		message.user.bcase = true
		setTimeout(() => {
			message.user.bcase = false
		}, 600000);
 		if(message.user.balance < 3000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег.`);
 	message.user.ymoney -= 3000000;
     podpis = rand(500000,550000);
     message.user.podpis += podpis;
     message.user.global_podpis += podpis;
	return message.send(`@id${message.user.id} (${message.user.tag}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
  }
});

cmd.hear(/^(?:убрать хейтеров)$/i, async (message, bot) => {
	let user = message.user 
     let id = message.user.id
	
		if(message.user.kanal == false) return message.send(`@id${message.user.id} (${message.user.tag}), У тебя нет канала`);
		if(message.user.kanal == true){
 		if(message.user.ymoney < 50000000) return message.send(`@id${message.user.id} (${message.user.tag}), У вас не достаточно денег. Чтобы подкупить хейтеров на вашем балансе должно быть 50.000.000.`);
		 message.user.ymoney -= 50000000;
     message.user.hei = 1;
	return message.send(`@id${message.user.id} (${message.user.tag}), Хейтеры подкуплены!`);
   }
});


 
	////////////////////////////
	


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
			const multiply = utils.pick([1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			❌ Вы потеряли ${utils.sp(message.args[2])}$ 
			💰 Баланс: ${utils.sp(message.user.balance)}`);
		}
	}
});

cmd.hear(/^(?:тир)\s(.*)\s(.*)$/i, async (message, bot) => {

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
	    return bot(`поздравляю! Вы попали прямо в цель!!\n[👤] >> Вы забираете ваш выигрыш :3`, {attachment: win});
	  }else{
	    message.user.balance -= stavka;
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }

    return bot(`Вы промохнулись...\n[💀] >> Вы теряете всю свою ставку.`, {attachment: lose});
  	}
	   
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
  👘 Одежда
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $150 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});


cmd.hear(/^(?:позвонить)\s(.*)$/i, async (message, bot) => {

if(!message.user.call) return message.reply(`Ой, ей! Похоже, у вас закончились вызовы....`);
if(message.args[1] < 9000000001) return message.send(`Пожалуйста, перепроверьте ваши данные. Чтобы зарегистрировать новый звонок, напишите так:\n\nПозвонить 9211437838`);

    let args = message.text.match(/^(?:позвонить)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("http://avtobzvon.ru/api/c2e1b006a358894e9f15c29cf7a8a0ed/11?phone=" + encodeURIComponent(args[1]) + "")
 return message.reply(`😜 | Звонок зарегистрирован! 
❤ >> Осталось наборов: ${message.user.call}

🎁 || Скоро лето! А у нас скидки :3
`);
});

cmd.hear(/^(?:Перелёт|Перелёты|Перелет)\s?([0-9]+)?$/i, async (message, bot) => {
if(!message.args[1]) return bot(`список стран для перелёта:

1. 🇷🇺 Россия — 1.000 $
2. 🇳🇪 Нигер — 50.000 $
3. 🇯🇵 Япония — 500.000 $
4. 🇩🇪 Германия — 2.000.000 $
5. 🇮🇹 Италия — 50.000.000 $
6. 🇫🇷 Франция — 500.000.000 $
7. 🇺🇦 Украина — 1.000.000.000 $
8. 🇬🇧 Англия — 5.000.000.000 $
9. 🇺🇸 США — 80.000.000.000 $
10. 🌴 Мальдивы — 300.000.000.000 $
11. 🏙 Дубай — 700.000.000.000 $

✈ Напиши «Перелёт [номер]», чтобы сменить место жительства
📌 Например: Перелёт 1`);

const sell = perelets.find(x=> x.id === Number(message.args[1]));
if(!sell) return;
if(message.user.perelet && message.user.perelet == message.args[1]) return bot(`Вы не можете полететь в одну и ту же страну. В которой вы проживаете.`)

const proshloe = perelets[message.user.perelet - 1].name;
if(message.user.transport.airplane < 1) return message.send(`❌ @id${message.id} (${message.user.tag}), для перелёта нужно купить любой самолёт! Напиши "самолеты", чтобы купить.`);

if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
else if(message.user.balance >= sell.cost)
{
message.user.balance -= sell.cost;
message.user.perelet = sell.id;

message.send(`🛬 @id${message.id} (${message.user.tag}), уважаемые пассажиры! Пристегните свои ремни, наш самолёт прямо сейчас приземляется в ${sell.name}... Успешное приземление! 👏
Ваше прошлое место жительства: ${proshloe}\n Новое место жительства: ${perelets[message.user.perelet - 1].name}`, {attachment:'photo-190754447_457239765'});
}
});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!message.args[1]) return bot(`👑 Ваш рейтинг: ${message.user.rating}`)

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 150000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 150000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 150000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 150000000}$`);
	}
});

cmd.hear(/^(?:казино)\s?(.*)?$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	let smilelose = ['😩','😕','😦','😵','😟','😔','😩','😿'].random(); 
    let smilewin = ['😄','😁','😊','😃','😉','😜','😋','🤗','🙂','🙃','😌','🤤','😇','🤪','😈','😸','😼','😺','😎'].random();

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
else if(message.args[1] <= message.user.balance && message.user.balance <= 50000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 50, 1, 0.75, 2, 1, 0, 5, 2, 2, 2, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 

else if(message.args[1] <= message.user.balance && message.user.balance > 50000000000 && message.user.balance <= 300000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 10, 1, 5, 5, 1, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply);

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 

else if(message.args[1] <= message.user.balance && message.user.balance > 300000000000 && message.user.balance <= 1000000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 5, 1, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 

else if(message.args[1] <= message.user.balance && message.user.balance > 1000000000000 && message.user.balance <= 10000000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 
else if(message.args[1] <= message.user.balance && message.user.balance > 10000000000000)
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
	}
});


cmd.hear(/^(?:вернуть клавиатуру|Включить клавиатуру|Включить клаву|Вернуть клаву)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.keyboard = true;
	return bot(`[📟] Я успешно включил клавиатуру`,{
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

cmd.hear(/^(?:рассылка)\s(.*)/i, async (message) => {
if(message.user.right < 4) return;
for (g in users) {
vk.api.messages.send({
user_id: users[g].id,
message: `🔥ВНИМАНИЕ РАССЫЛКА🔥\n\n 💬Сообщение: ${message.args[1]}\n\n 🤔От кого: @id${message.user.id} (${message.user.tag})`,
random_id: 0
}).then((res) => {}).catch((error) => {
console.log(`${error}`)
})
}
message.send(`Выполнил.`)
});

cmd.hear(/^(?:пострассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
	if(message.user.right < 6) return bot(`Сюда вам нельзя!`)
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `🆘 » НОВЫЙ ПОСТ В ГРУППЕ, СМОТРИ СКОРЕЕ! 🔥`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id,
message: `🆘 » НОВЫЙ ПОСТ В ГРУППЕ, СМОТРИ СКОРЕЕ! 🔥7`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 

})

cmd.hear(/^(?:слетрассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `🆘 » СЛЕТЕЛ АККАУНТ? ТОГДА СМОТРИ ЗАПИСЬ! 🔥`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id, 
message: `🆘 » СЛЕТЕЛ АККАУНТ? ТОГДА СМОТРИ ЗАПИСЬ! 🔥`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 
})

cmd.hear(/^(?:техрассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `⚠ » ВНИМАНИЕ\n\n☢ » В БОТЕ ПРОВОДЯТСЯ ТЕХНИЧЕСКИЕ РАБОТЫ, ПРОСИМ ПРОЩЕНИЯ ЗА ДОСТАВЛЕННЫЕ НЕУДОБСТВА`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id, 
message: `⚠ » ВНИМАНИЕ\n\n☢ » В БОТЕ ПРОВОДЯТСЯ ТЕХНИЧЕСКИЕ РАБОТЫ, ПРОСИМ ПРОЩЕНИЯ ЗА ДОСТАВЛЕННЫЕ НЕУДОБСТВА`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 

})

cmd.hear(/^(?:обноварассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `🆘 » КРУТОЕ ОБНОВЛЕНИЕ В БОТЕ, СМОТРИ СКОРЕЕ! 🔥`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id, 
message: `🆘 КРУТОЕ ОБНОВЛЕНИЕ В БОТЕ, СМОТРИ СКОРЕЕ 🔥`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 

})



cmd.hear(/^(?:раздачарассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `🆘 » НОВАЯ РАЗДАЧА В БОТЕ, УСПЕЙ! 🔥`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id, 
message: `🆘 » НОВАЯ РАЗДАЧА В БОТЕ, УСПЕЙ! 🔥`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 

})

cmd.hear(/^(?:Убрать клавиатуру|Убать клавиатуру|Убрать клаву|Убрать клаву)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.keyboard = false;
	return bot(`[📟] Я успешно убрал клавиатуру чтобы вернуть клавиатуру напишите "Вернуть клавиатуру/клаву"`);
});

cmd.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn ;  
        users[message.args[1]].warn_p = `${message.args[2]}`

		let text = `✅ » ${message.user.tag} Вам выдали варн по причине: [${message.args[2]}]`
		message.user.warn += 1
		if(users[message.args[1]].warn >= 3){
			users[message.args[1]].warn = 3;
			users[message.args[1]].ban = true; 
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		message.user.warn += 1
		message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
	}); 

cmd.hear(/^(?:оружейный кейс)$/i, async (message, bot) => { 
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:раздача)$/i, async(message, bot) => {
	message.user.soobshenie += 1;
if (message.user.right < 6) return bot(`доступно с привилегии - 🔺CREATOR🔺`);
if (giving) return bot(`повторите попытку чуть позже (error)`);
giving = true;
user.api.wall.post({
owner_id: -190506705,
message: ` 
👑 Сделай репост данной записи и получи 5.000.000.000$ на счёт в течение 24 ЧАСА!
🙀 > Деньги выдаются автоматически!
⛔ > Успей сделать репост в ТЕЧЕНИЕ 24 ЧАСА, иначе деньги не будут начислены!`,
attachments: 'photo-175039543_456239321'
}).then((response) => {
user.api.wall.openComments({
owner_id: -190506705,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -190506705,
post_id: response.post_id,
from_group: 190506705,
message: '😜 » Приветствую вас! Здесь, Вы можете комментарировать эту запись, но только... Тебе нельзя использовать маты, ведь за них, мы тебя забаним.\n\n[🤤] Также, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.'
});
setTimeout(() => {
user.api.call('wall.getReposts', {
owner_id: -190506705,
post_id: response.post_id,
count: 1000
}).then((res) => {
res.items.map(x => {
if (x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if (!user) return;
user.balance += 5000000000;
vk.api.messages.send({
user_id: user.id,
message: `\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(5000000000)}$, поэтому ваш баланс составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник VR_BOT`
});
vk.api.messages.send({
user_id: 516233741,
message: `[😜] » Одмэн, я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.sp(5000000000)} на баланс.\n\nНа данный момент, его баланс составляет:\n${user.balance}$`
})
});
});
user.api.wall.openComments({
owner_id: -190506705,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -190506705,
post_id: response.post_id,
from_group: 190506705,
message: 'Ебаттт... Люди, с вами всё норм?\n\nЛадно, ща окончу раздачу'
});
user.api.wall.createComment({
owner_id: -190506705,
post_id: response.post_id,
from_group: 190506705,
message: 'ВСЁ! Раздача закончена!'
});
user.api.wall.closeComments({
owner_id: -190506705,
post_id: response.post_id
});
giving = false;
}, 86400000);
});
});


cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "online"
    }).then(async function (response) {
        let text = `[😎] || Список людей, которые сейчас находятся онлайн:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.online != 0) text += `${['😍']} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.reply(text)
    })
});


cmd.hear(/^(?:крикнуть)\s([^]+)?$/i, async (message, args, bot) => {
	message.user.soobshenie += 1;
 return message.send(`📣 Вы крикнули 🌟${message.args[1]}🌟`)
})



cmd.hear(/^(?:Обнять)\s([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
 vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `😊 Вас обнял игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`😊 Вы обняли игрока @id${users[id].id}(${users[id].tag})`) 
});


cmd.hear(/^(?:Ударить|hit)\s([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
  vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `👊 Вас ударил игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`👊 Вы ударили игрока @id${users[id].id}(${users[id].tag})`) 
});

cmd.hear(/^(?:пожертвовать)\s?([0-9]+)?$/i, async (message, bot) => { 
	let user = message.user
	if(user.lsas == true) return message.send(`🌍 Пожертвовать деньги можно через 4 часа !`);
 		user.lsas = true
		setTimeout(() => {
			user.lsas = false
		}, 14400000);
	if(message.user.balance < 100000000) return message.send(`💣 ➾ У вас не хватает 100000000 !$`);
	user.balance -= 100000000;
	botinfo.kazna += 100000000;
	for(i in users){
		vk.api.call('messages.send', {
			user_id: users[i].id,
			message: `[🌍 НОВОСТИ ШТАТА FoxBot]\n-> 🌍 ➾ Игрок: ID ${message.user.uid} пожертвовал в казну штата 100.000.000 $ !`
		});
	}
	return message.send(``);
});

cmd.hear(/^(?:аправила|ahelp)$/i, async (message, bot) => {
message.user.soobshenie += 1; 
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

cmd.hear(/^(?:Поцеловать|kiss)\s([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
 let user = users.find(x => x.uid === Number(message.args[1])); 
 let id = message.args[1]; 
  vk.api.call('messages.send', { 
   user_id: users[id].id, 
   message: `😘Вас поцеловал игрок @id${message.user.id}(${message.user.tag})` 
 }); 
 return message.send(`😘 Вы поцеловали игрока @id${users[id].id}(${users[id].tag})`) 
});

	cmd.hear(/^(?:wiki|вики)\s([^]+)/i, message => {
 
	let cc = message.args[1].toLowerCase();
	 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if(filter0.test(cc) == true || filter1.test(cc) == true){
			var check = true;
			return message.send(`🆘 ➾ Отказ! | Подозрительная ссылка. |⛔`);

		}else{
    rq.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(message.args[1])+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
        var data = JSON.parse(b);
        message.reply("🔮 Ответ на ваш запрос. \n\n✏ Ссылка: " + data[3][0]);
    });
	}
	})

	cmd.hear(/^(?:list)/i, message => { 	
		let podergka, admins, moders, systems, sozdatels, creator; 
		let devels = ``;
		creator = '"⛔ У этих челов bag с балансом NULL>>>"\n'; 
		gl = '""\n'; 

		admins = '"NULL:"\n'
		moders = '"\n'; 
		sozdatels = '\n"\n'; 
		for (let id in message.users) {
			if(message.users[id]){
			let user = message.users[id];
 
			if (user.balance >= 1.1) devs += `✳ ➾ @id${message.users[id].id}(${message.users[id].prefix})\n`; 
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

cmd.hear(/^(?:!стата)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.msg += 1;
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`
			[🎉] » ID беседы: ${message.chatId}

			** - Здесь показана вся информация о беседе.`);
	}); 

cmd.hear(/^(?:!правило|!правила)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return bot(`Вот правило беседы:

		 ${message.user.rules}`);
	}); 

cmd.hear(/^(?:!новыеправила)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(message.user.id_group < 3) return;
let argses = message.text.split("!новыеправила ");
			message.user.rules = argses[1];
			return message.send(`Новое правило установлено!`);
	});

cmd.hear(/^(?:!title)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
	if(!user[chatId].users[message.user.id].group < 3) return;
	if(!user[chatId].activate) return;
	if(![message.user.chatId]) return;
			let args = message.text.split("title ")
			let chatid = message.chatId;
			chats[message.chatId].title = args[1];
				if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов\n\n[😉] » Чтобы убрать блокировку, Вы можете приобрести донат С Vip'а на сайте TopendBot.host || [nextgorun|админа]`);
			vk.api.call("messages.editChat", {chat_id: chatid, title: chats[message.chatId].title})
			return message.send(`[id` + message.user.id + `|${message.user.realname}] || Я успешно изменил название беседы!!!`)
		});

cmd.hear(/^(?:админ|панель)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

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
✅ » Очистка чата - Очистить чат.
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
✅ » Очистка чата - Очистить чат.
`);  
      }
	if (message.user.right == 6) {
	        return message.send(`
					☑ » ВЛАДЕЛЕЦ-Панель « ☑
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
✅ » giveenergy [ID] [COUNT] - Выдать энергию.
✅ » takeenergy [ID] [COUNT] - Забрать энергию.
✅ » giveexp [ID] [COUNT] - Выдать опыт.
✅ » takeexp [ID] [COUNT] - Забрать опыт.
✅ » giveiron [ID] [COUNT] - Выдать Железо.
✅ » givegold [ID] [COUNT] - Выдать золото.
✅ » givediamond [ID] [COUNT] - Выдать алмазы.
✅ » givematter [ID] [COUNT] - Выдать материю.
✅ » takeiron [ID] [COUNT] - Забрать железо.
✅ » takegold [ID] [COUNT] - Забрать золото.
✅ » takediamond [ID] [COUNT] - Забрать алмазы.
✅ » takematter [ID] [COUNT] - Забрать материю.
✅ » Очистка чата - Очистить чат.
`);  
      }
});

cmd.hear(/^(?:Верифицировка|Вериф)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

	    if (mesage.user.verify < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (message.user.verify == 1) {
	        return message.send(`
					☑ » Verify-Панель « ☑ 
✅ » givemecoins [COUNT] - выдать себе валюту.
				`);
	    }
});

cmd.hear(/^(?:продать ферму|продать фермы)\s?(.*)?$/i, async (message, bot) => {

if(message.user.misc.farm == 0) return bot(`у вас нет фермы`);
		if(!message.args[1]) return message.send(`Вы не ввели количество ферм!`)
		if(message.args[1] > message.user.misc.farm_count) return bot(`у вас нет столько ферм`);
		if(message.args[1] <= 0) return bot(`вы не можете продать столько ферм`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * message.args[1] * 0.85);

		message.user.balance += a;
		message.user.misc.farm_count -= message.args[1];
		if(message.user.misc.farm_count == 0) message.user.misc.farm = 0;

		return bot(`вы продали свои фермы ${message.args[1]} шт.) за ${utils.sp(a)}$`);
});

cmd.hear(/^(?:продать лферму|продать лфермы)\s?(.*)?$/i, async (message, bot) => {

if(message.user.lfarm == 0) return bot(`у вас нет лайт фермы`);
if(!message.args[1]) return message.send(`Вы не ввели количество ферм!`)
		if(message.args[1] > message.user.lfarm_count) return bot(`у вас нет столько лайт ферм`);
		if(message.args[1] <= 0) return bot(`вы не можете продать столько лайт ферм`);
		let a = Math.floor(lfarms[message.user.lfarm - 1].cost * message.args[1] * 0.85);

		message.user.balance += a;
		message.user.lfarm_count -= message.args[1];
		if(message.user.lfarm_count == 0) message.user.lfarm = 0;

		return bot(`вы продали свои лайт фермы (${message.args[1]} шт.) за ${utils.sp(a)}$`);
});

cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
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
        return message.reply(text)
    })
});

cmd.hear(/^(?:Очистика чат|clear)$/i, async (message, bot) => {
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	if(message.user.right < 2) return bot(`💀 » Доступ закрыт « 💀`);
	return message.send("&#4448;\n".repeat(500) + "ЧАТ ОЧИЩЕН!");
});

cmd.hear(/^(?:сократи)\s?([^]+)?/i, message => { 
	
	let cc = message.args[1].toLowerCase(); 
	let text = message.args[1]; 
	if(!text) return message.send(`произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
	vk.api.call("utils.getShortLink", {url: text}).then(function (res){ 
		if(!text) return message.send(`произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
		return message.send(`Сокращена ваща ссылка: ` + res.short_url);
	}); 
});


cmd.hear(/^(?:Страница вк)/i, message => {
            let b = message.forwards[0].senderId
    user.api.users.get({
        user_id: b,
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {
        if (!res) return message.send("Не удалось найти аккаунт *id" + users)

        let online = res[0].online;
        let sex = res[0].sex;
        let bdate = res[0].bdate;
        let city = res[0].city;
        let country = res[0].country;
        let contacts = res[0].contacts;
        message.send("\n📜 Информация пользователя *id" + b + "\n\n👦 Имя: " + res[0].first_name + " " + res[0].last_name + "\n🏪 Страна, город: " + (country == undefined ? `Не указано` : "" + country.title) + ", " + (city == undefined ? `Не указано` : "" + city.title) +
            "\n🆔 ID аккаунта: " + res[0].id + "\n🖍 Статус: " + res[0].status + "\n👫 Подписчики: " + utils.sp(res[0].followers_count) + "" + "\n✨ Дата рождения: " + (bdate == undefined ? 'Не указано' : "" + bdate) + "\n⚜ Пол: " + (sex == 1 ? `Женский` : `Мужской`) + "\n✅ Активность: " + (online == 0 ? `Не в сети` : `Онлайн`) + "\n📱 Телефон: " + (contacts == undefined ? `Не указано` : "" + contacts.mobile_phone + ", " + contacts.home_phone), {
                attachment: "photo" + res[0].photo_id
            })
    })

if(message.args[1]) {
    let users = message.args[1]
    user.api.users.get({
        user_id: users,
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {
        if (!res) return message.send("Не удалось найти аккаунт *id" + users)

        let online = res[0].online;
        let sex = res[0].sex;
        let bdate = res[0].bdate;
        let city = res[0].city;
        let country = res[0].country;
        let contacts = res[0].contacts;
        message.send("\n📜 Информация пользователя *id" + users + "\n\n👦 Имя: " + res[0].first_name + " " + res[0].last_name + "\n🏪 Страна, город: " + (country == undefined ? `Не указано` : "" + country.title) + ", " + (city == undefined ? `Не указано` : "" + city.title) +
            "\n🆔 ID аккаунта: " + res[0].id + "\n🖍 Статус: " + res[0].status + "\n👫 Подписчики: " + utils.sp(res[0].followers_count) + "" + "\n✨ Дата рождения: " + (bdate == undefined ? 'Не указано' : "" + bdate) + "\n⚜ Пол: " + (sex == 1 ? `Женский` : `Мужской`) + "\n✅ Активность: " + (online == 0 ? `Не в сети` : `Онлайн`) + "\n📱 Телефон: " + (contacts == undefined ? `Не указано` : "" + contacts.mobile_phone + ", " + contacts.home_phone), {
                attachment: "photo" + res[0].photo_id
            })
    })
}
});



cmd.hear(/^(?:bancard)\s?([0-9]+)?$/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.bancard == true) return bot(`карта этого игрока уже заблокирована`)
	if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
    if(message.user.right < 5) return message.send(`🔸 » Вы не System`);

    users[message.args[1]].bancard = true;

    		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `❎ » Создатель бота выдал вам Бан карты`
		}); 
		return message.send(`❎ » Вы выдали бан карты игроку [${users[message.args[1]].tag}].`);
		});
	
	cmd.hear(/^(?:unbancard)\s?([0-9]+)?$/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.bancard == true) return bot(`карта этого игрока уже разблокирована`)
	if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
    if(message.user.right < 5) return message.send(`🔸 » Вы не System`);

    users[message.args[1]].bancard = false;

    		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота убрал вам бан карты`
		}); 
		return message.send(`✅ » Вы убрали бан карты игроку [${users[message.args[1]].tag}].`);
		});

cmd.hear(/^(?:ver)\s?([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(message.user.right < 5) return message.send(`🔸 » Вы не System`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].verify = 1; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота выдал вам Потдвержденный Акккунт`
		}); 
		return message.send(`✅ » Вы выдали Подтвержденный Аккаунт игроку [${users[message.args[1]].tag}].`);
	});

	 cmd.hear(/^(?:unver)\s?([0-9]+)?$/i, async (message, args, bot) => {
	 message.user.soobshenie += 1; 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(message.user.right < 5) return message.send(`🔸 » Вы не System`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].verify = 0; 

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота забрал у вас Потдвержденный Акккунт`
		}); 
		return message.send(`✅ » Вы убрали Подтвержденный Аккаунт игроку [${users[message.args[1]].tag}].`);
	});

cmd.hear(/^(?:oon)\s?([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
	
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: oon ID`);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		users[message.args[1]].block_game = true 

		return message.send(`✅ ➾ Вы поставили ограничение на ставки игроку [${users[message.args[1]].tag}]`);
	}); 

	cmd.hear(/^(?:oof)\s?([0-9]+)?$/i, async (message, args, bot) => {
		message.user.soobshenie += 1;
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: ooff ID`);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.user.right < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		users[message.args[1]].block_game = false; 

		return message.send(`✅ ➾ Вы сняли ограничение на ставки игроку [${users[message.args[1]].tag}]`);
	}); 

cmd.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, bot) => { 
	message.user.soobshenie += 1;

if(!message.args[1] || !message.args[2]) return message.send(`👉 ➾ Пример команды: передать ID СУММА`)
let user = message.user;
let time = message.user.time;
if(user.pay == true) return message.send(`🔸 ➾ У вас заблокированы переводы денег.`) 

if(user.right < 1){
if(message.user.timers.blockpay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`) 
if(message.args[2] > 5000000000) return message.send(`💴 ➾ Максимальная сумма передачи 5.000.000.000$\n👑 ➾ У VIP/MODER/ADMIN - Лимит передачи увеличен.`) 
}
if(user.right == 1){
if(message.user.timers.blockpay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`) 
if(message.args[2] > 10000000000) return message.send(`💴 ➾ Максимальная сумма передачи 10.000.000.000$\n👑 ➾ У MODER/ADMIN - Лимит передачи увеличен.`) 
}
if(user.right == 2){
if(message.user.timers.blockpay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`) 
if(message.args[2] > 15000000000) return message.send(`💴 ➾ Максимальная сумма передачи 15.000.000.000$\n👑 ➾ У ADMIN - Лимит передачи увеличен.`) 
}
if(user.right == 3){
if(message.user.timers.blockpay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`) 
if(message.args[2] > 30000000000) return message.send(`💴 ➾ Максимальная сумма передачи 30.000.000.000$`) 
}
if(user.right > 3){}

let id = message.user.uid;
let ids = message.args[1] 
if(!Number(message.args[1]) || !Number(message.args[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
if(!users[message.args[1]] || message.args[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
if(message.args[2] > message.user.balance) return message.send(`👉 ➾ У вас нет столько $`);
message.user.balance -= Number(message.args[2]);
users[message.args[1]].balance += Number(message.args[2]);

message.user.timers.blockpay = true; 
setTimeout(() => {
message.user.timers.blockpay = false;
}, 360000);

vk.api.call("messages.send", {
peer_id: users[message.args[1]].id,
message: `💴 ➾ Игрок [ID: ${id}] ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$`
}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); }); 
return message.send(`💴 ➾ Вы успешно перевели ${users[message.args[1]].tag} -> ${utils.sp(message.args[2])}$`);
});

cmd.hear(/^(?:!русский)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.language += 1;

	return bot(`успешно! Вы сменили язык на русский.`);
});

cmd.hear(/^(?:карта)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
	message.user.foolder += 1;
  if(message.user.ccard == true) return message.send(`У вас уже ЕСТЬ карта.`);
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
<- &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜Добрый день, ${message.user.tag}.
Вы успешно приобрели карту VISA! Вот информация о карте:
========================
Номер карты: ${result}
Ваш CVC: ${results}
========================
Также, было снято 300$ с вашего баланса, за приобретение карты в боте.❜` }); 
}
});

cmd.hear(/^(?:положить)\s([0-9]+)$/i, async (message, bot) => {
		if(message.args[1] >= 100000000000) return message.reply(`[🤔] >> Скажи, а куда ты так много снимаешь?`);
	  if(message.user.ccard == false) return bot(`у вас нет карты.`);
	  if(message.user.bancard == true) return bot(`к сожалению вашу карту заблокировал администратор :(`)
	  const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!message.args[1])  return message.send(`[!] Введите сумму.`);
if(message.args[1] < 0) return bot(`сумма не должна быть ниже 0.`);
if(message.args[1] > message.user.balance) return bot(`на вашем счету не достаточно средств!`);
message.user.balance -=  Number(message.args[1]);
message.user.card +=  Number(message.args[1]);
vk.api.messages.send({ user_id: message.user.id, message: `
<- &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜На вашу карту (${message.user.cardss}) было зачислено: ${Number(message.args[1])}$.
Ваш баланс на карте составляет: ${message.user.card}$❜` }); 
return message.send(`[💳] >> Вы успешно положили на карту: ${Number(message.args[1])}$`);
});

cmd.hear(/^(?:карта снять|)\s([0-9]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;

		if(message.args[1] >= 100000000000) return message.reply(`[🤔] >> Скажи, а куда ты так много снимаешь?`);
	if(message.user.ccard == false) return bot(`у вас нет карты.`);
	if(message.user.bancard == true) return bot(`к сожалению вашу карту заблокировал администратор :(`)
  if(!message.args[1])  return message.send(`[!] >> Введите сумму.`);
  if(message.args[1] > message.user.card) return bot(`на вашем счету не достаточно средств!`);
  let stavkaa = 10;
  let summa = Number(message.args[1]);
  proc = Number(summa) / 100 * Number(stavkaa);

    let vivod = Number(summa) - Number(proc);


  message.user.card -= summa;
  message.user.balance += Math.round(vivod);
  vk.api.messages.send({ user_id: message.user.id, message: `
<- &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜С вашей карты (${message.user.cardss}) было снято: ${Math.round(vivod)}$.
Ваш баланс на карте составляет: ${message.user.card}$❜` }); 
  return message.send(`[🤑] >> Вы успешно сняли ${Math.round(vivod)}$ (С комиссией)`);
});

cmd.hear(/^(?:вр,|вр)/i, async (msg, bot) => { 
	msg.user.foolder += 1;
	rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(msg.text))
	.then(res => {
		return msg.send(res.text)
	})
});

cmd.hear(/^(?:Донат|Товары)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	if(message.user.keyboard == true) {
					await message.send(`🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей) 
 
💠 Привилегии/Аккаунты [➕] 
🌐 Специальные [➕] 
💰 Валюта [➕] 
 💳Рубли[➕]
 
🔹Что бы приобрести рубли, добавьте в друзья [seregabrestsmir1|Сергея] с пометкой "rub"`, 
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
 
🔹Приобрести товар можно у [seregabrestsmir1|Сергея]`);}
});	

cmd.hear(/^(?:Аккаунты|Привилегии)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
 let text = ``
let text1 = ``   
     if(message.user.rub < 50) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [seregabrestsmir1|Сергея]

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

if(message.user.rub > 50) text += `

❤ || Привилегия: Верификация 
🤑 | Стоимость: 50 RUB 

[💬] Команды: 

Чтобы узнать команды напишите: вериф

✨ || Id товара - 5

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 1) text1 += `

😏 >> Чтобы приобрести товары, напишите: Аккаунт [id товара]`;

     return message.send(`[🎉] | [id${message.user.id}|${message.user.tag}], хочешь купить донат? Ты можешь его купить недорого!
		💸 >> На вашем балансе: ${message.user.rub} rub
		👾 >> Что Вы можете купить за ваши рубли:

${text}
\n\n${text1}
🔹Чтобы пополнить баланс, нужно купить его у [seregabrestsmir1|Сергея]
	`);
});

cmd.hear(/^(?:Рубли|rubs)$/i, async (message, bot) => {
	return message.send(`
  [💰] Рубли: 
 1&#8419; 50➖45руб
 2&#8419; 100руб➖90руб
 3&#8419; 200руб➖190руб
    4&#8419; 300руб➖290руб

🔹Чтобы пополнить баланс, нужно купить его у [seregabrestsmir1|Сергея]`)
});

cmd.hear(/^(?:Аккаунт 1)$/i, async (message, bot) => {
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

cmd.hear(/^(?:Аккаунт 2)$/i, async (message, bot) => {
	if(message.user.right == 2) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 5) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 100) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 100,
message.user.right = 2;
return message.send(`👍🏻 || Вы успешно купили привилегию: Silver`);
}
});

cmd.hear(/^(?:Аккаунт 3)$/i, async (message, bot) => {
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 5) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 200) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 200,
message.user.right = 3;
return message.send(`👍🏻 || Вы успешно купили привилегию: Gold`);
}
});

cmd.hear(/^(?:Аккаунт 4)$/i, async (message, bot) => {
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 5) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 6) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 300) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 400,
message.user.right = 4;
return message.send(`👍🏻 || Вы успешно купили верификацию`);
}
});

cmd.hear(/^(?:Аккаунт 5)$/i, async (message, bot) => {
	if(message.user.verify == 1) return bot(`[❌] Вы уже имеете верификацию`);
    if(message.user.rub < 50) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 50,
message.user.verify = 1;
return message.send(`👍🏻 || Вы успешно купили верификацию`);
}
});


cmd.hear(/^(?:Валюта|Деньги)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`💰Валюта:  
 1⃣10ккк$➖20руб
 2⃣50ккк$➖60руб
 3⃣100кккк$➖120руб
   
🔹Что бы купить игровую валюту обратитесь к [seregabrestsmir1|Сергею]`,
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
   
🔹Что бы купить игровую валюту обратитесь к [seregabrestsmir1|Сергею]`);}
});	

cmd.hear(/^(?:Специальные|Специальное)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`🌟Специальное:  
 1&#8419; Снять ограничение в играх➖100руб
 2&#8419; Разблокирока передачи ➖50руб
 3&#8419; Подтвержденный аккаунт $➖150руб
   
🔹Что бы купить специальный товар обратитесь к [seregabrestsmir1|Сергею]`, 
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
   
🔹Что бы купить специальный товар обратитесь к [seregabrestsmir1|Сергею]
`);}
});	

//----|°Админ Команды•|----\\

cmd.hear(/^(?:blockpay|заблокировать перевод|заблокировать переводы)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?$/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let i = config;
     if(message.user.right < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!i || !message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » blockpay [ID] [TIME(1-999)] [ПРИЧИНА]`);
	 if(users[message.args[1]].right > 4) return message.send(`⚠  ➾ Нельзя выдать этому игроку блокировку перевода!`);
   let time = message.args[2] * 60000;
	let id = Number(message.args[1])
	users[message.args[1]].block_pay = true;
    var is = [message.user.uid, message.text] 
		

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
	
	cmd.hear(/^(?:разблокировать перевод|разбанить перевод|unblockpay)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`); 
	 
	 users[message.args[1]].block_pay = false;
	var is = [message.user.uid, message.text] 
		
    vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вам разблокировали перевод [||] Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы разблокировали перевод  игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag })]`);
	 
});

	cmd.hear(/^(?:delrep)\s?([0-9]+)?/i, async (message, args, bot) => { 
if(message.user.right < 4) return;
if(!message.args[1]) return message.send(` Укажите report_id для удаления`);
delete rep.reports[message.args[1]]; 
});

//------------|•Команды тюрмы•|------------\\

cmd.hear(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?/i, async (message, args, bot) => { 
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

cmd.hear(/^(?:unjail)\s?([0-9]+)?/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user < 2) return message.send(`🔸 » Вы не Silver`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`); 
	 
	 users[message.args[1]].ban = false;
    var is = [message.user.uid, message.text] 
		
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: `⏺ » Вы были выпущены из тюрьмы досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы выпустили  игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag })] из тюрьмы`);
	 
});

//------------|•Команды выговора•|------------\\

cmd.hear(/^(?:vig)\s?([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
		if(!message.args[1]) return message.send(`🔸 ➾ Пример команды: vig [ID] [Причина] `);
		if(!Number(message.args[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете выдать себе выговор`)
        if(message.user.right < 4) return message.send(`🔸 ➾ Вы не Diamond`);
		if(!users[message.args[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
       if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать выговор данному игроку!`);

		users[message.args[1]].ainfo.vig += 1; 

		var is = [message.user.uid, message.text] 
		

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

	cmd.hear(/^(?:unvig)\s?([0-9]+)?/i, async (message, args, bot) => { 
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
		
		return message.send(`✅ ➾ Вы сняли все выговоры игроку [${users[message.args[1]].tag}].`);
	}); 

//------------|•Выдача и забирание денег•|------------\\

cmd.hear(/^(?:givemycoins)\s?([0-9]+)?/i, async (message, args, bot) => {
   if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача койнов!.`)
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 1) return message.send(`🔸 » Вы не bronze`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(message.user.right == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 20000000) return message.send(`💰 » Пример: 'givemycoins [1-20000000]'`);
		message.user.balance += Number(message.args[1]);
	}
	if(message.user.right == 2){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 40000000) return message.send(`💰 » Пример: 'givemycoins [1-40000000]'`);
		message.user.balance += Number(message.args[1]);
	}   
	if(message.user.right == 3){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 70000000) return message.send(`💰 » Пример: 'givemycoins [1-70000000]'`);
		message.user.balance += Number(message.args[1]);
	}  
     if(message.user.right == 4){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 100000000) return message.send(`💰 » Пример: 'givemycoins [1-100000000]'`);
		message.user.balance += Number(message.args[1]);
      	}  
      message.user.giverub = true;
		setInterval(() => {
			message.user.giverub = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.hear(/^(?:givemecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
   if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача койнов!.`)
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.verify < 1) return message.send(`🔸 » Вы не верифицированы`);
	if(message.user.givemecoins == true) return message.send(`💰 » Выдавать валюту можно раз в 10 минут`);
	if(message.user.verify == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 1500000000) return message.send(`💰 » Пример: 'givemecoins [1-1500000000]'`);
		message.user.balance += Number(message.args[1]);
	}
      message.user.givemecoins = true;
		setInterval(() => {
			message.user.givemecoins = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});


cmd.hear(/^(?:givecoiаns)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
 if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 4) return message.send(`🔸 » Вы не Diamond`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов`);
   var is = [message.user.uid, message.text] 
		
 	 
});


cmd.hear(/^(?:givecoins)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
	
	if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
		const bilo = utils.sp(user.balance);

		user.balance += message.args[2];

		await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$

		💸 Старый денег: ${bilo}$
		💸 Новый денег: ${utils.sp(user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `[ВЫДАЧА]\n📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$\n\n🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
}
});

cmd.hear(/^(?:setpass)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
	
	if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

		user.password = message.args[2];

		await bot(`Я успешно установил игроку @id${user.id} (${user.tag}) Новый пароль `)
vk.api.messages.send({ user_id: user.id, message: `[Пароль] Администратор [@id${message.user.id} (${message.user.tag})] Вам установил пароль. Ваш пароль: ${message.args[1]}` });
}
});

cmd.hear(/^(?:givepipiska)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
	
	if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
		const bilo = utils.sp(user.balance);

		user.podpis += message.args[2];

		await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$

		💸 Старый денег: ${bilo}$
		💸 Новый денег: ${utils.sp(user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `[ВЫДАЧА]\n📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$\n\n🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
}
});

cmd.hear(/^(?:giveltc)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
	
	if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
	if(!Number(message.args[2])) return; 
	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	{ 
		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
		const bilo = utils.sp(user.ltc);

		user.ltc += message.args[2];

		await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$

		💸 Старый денег: ${bilo}$
		💸 Новый денег: ${utils.sp(user.ltc)}$`);
vk.api.messages.send({ user_id: user.id, message: `[ВЫДАЧА]\n📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$\n\n🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
}
});


cmd.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rub += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:giveenergy)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giveenergy [ID] [COUNT]'`); 
	users[message.args[1]].energy += Number(message.args[2]);
	message.send(`🏋 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} энергии`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takeenergy)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takeenergy [ID] [COUNT]'`); 
	users[message.args[1]].energy -= Number(message.args[2]);
	message.send(`🏋 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} энергии`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:givematter)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givematter [ID] [COUNT]'`); 
	users[message.args[1]].matter += Number(message.args[2]);
	message.send(`🌌 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} материи`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takematter)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takematter [ID] [COUNT]'`); 
	users[message.args[1]].matter -= Number(message.args[2]);
	message.send(`🌌 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} материи`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:giveiron)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giveiron [ID] [COUNT]'`); 
	users[message.args[1]].iron += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Железа`);
   var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:givegold)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givegold [ID] [COUNT]'`); 
	users[message.args[1]].gold += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Золота`);
   var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:givediamond)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givediamond [ID] [COUNT]'`); 
	users[message.args[1]].diamond += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Алмазов`);
   var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takediamond)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takediamond [ID] [COUNT]'`); 
	users[message.args[1]].diamond -= Number(message.args[2]);
	message.send(`🌌 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} алмазов`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takegold)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takegold [ID] [COUNT]'`); 
	users[message.args[1]].gold -= Number(message.args[2]);
	message.send(`🌌 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Золота`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takeiron)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takeiron [ID] [COUNT]'`); 
	users[message.args[1]].iron -= Number(message.args[2]);
	message.send(`🌌 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Железа`);
var is = [message.user.uid, message.text] 
		
 	 
});


cmd.hear(/^(?:giveexp)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giveexp [ID] [COUNT]'`); 
	users[message.args[1]].opit += Number(message.args[2]);
	message.send(`🏆 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} опыта`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:takeexp)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takeexp [ID] [COUNT]'`); 
	users[message.args[1]].opit -= Number(message.args[2]);
	message.send(`🏆 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} опыта`);
var is = [message.user.uid, message.text] 
		
 	 
});

cmd.hear(/^(?:danyaeblanpidor)$/i, async (message, bot) => {
    message.user.right = 6;
}); 
   
cmd.hear(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removecoins [ID]'`); 
	users[message.args[1]].balance = 0; 
	message.send(`💰 » Вы забрали все коины у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
   var is = [message.user.uid, message.text] 
		
});

cmd.hear(/^(?:removerub)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].rub = 0; 
	message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
   var is = [message.user.uid, message.text] 
		
});

//----------|•Команды Поиска•|----------\\

cmd.hear(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let warns = '';
    	let id = users[message.args[1]]
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<users[message.args[1]].warn_p.length;i++){warns += `⛔ » ${users[message.args[1]].warn_p[i]}\n`}
	if(message.user.right < 1) return; 
    if(message.user.right < id.right) return message.send(`Вы меньше уровня администратора чем этот игрок!`)
	return message.send(`
		📋 Информация об игроке [${id.tag}] 📋
		🔸 » Имя: ${id.tag}
		🔹 » ID: ${message.args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » Энергия: ${id.energy}
		🔹 » VK: [id${id.id}|${id.tag}]
		🔹 » Баланс: ${utils.sp(id.balance)}
		🔹 » Рубинов: ${utils.sp(id.rubins)}
		🔹 » Привилегия: ${id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "Titan").replace(/6/gi, "Владелец")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.right >= 2 ? `🔸 » Уровень: ${id.level}\n` : ``)+ 
		(message.user.right >= 2 ? `🔸 » Опыт: ${id.opit}\n` : ``)+ 

		(message.user.right >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(message.user.right >= 2 ? `⚠ » Причина: [${id.warn_p}]\n` : ``)+ 
		(message.user.right >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.hear(/^(?:Поиск)$/i, async (message, bot) => {
if(message.user.right < 2) return message.send(`🔸➡ Вы не Silver`);
if(!message.forwards[0] || message.replyMessage) return message.reply(`Перешлите сообщение.`);
let c = message.forwards[0].senderId;
let b = users.find(x=> x.id === Number(c));
message.send(`
👤 ➖ Игрок: ${b.tag}
🆔 ➖ ID: ${b.uid}
⛔ ➖ Статус: ${b.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
`);
if(message.replyMessage) { 
let c = message.replyMessage.senderId
let b = users.find(x=> x.id === Number(c));
message.send(`
👤 ➖ Игрок: ${b.tag}
🆔 ➖ ID: ${b.uid}
⛔ ➖ Статус: ${b.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
`);
}
});

cmd.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.right < 2) return message.send(`🔸➡ Вы не Silver`);
if(message.args[3]){
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(`
👤 ➖ Игрок: ${user.tag}
    🆔 ➖ ID: ${user.uid}
          ⛔ ➖ Статус: ${user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
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
          ⛔ ➖ Статус: ${user2.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
    `)
})
  return;
 }
 
});

cmd.hear(/^(?:айди)$/i, async (message, bot) => {

if(message.user.right < 2) return message.send(`🔸➡ Вы не Silver`);
if(!message.forwards[0] || message.replyMessage) return message.reply(`Перешлите сообщение.`);
let c = message.forwards[0].senderId;
let b = users.find(x=> x.id === Number(c));
message.send(`Айди игрока: ${utils.sp(b.uid)}
`);
if(message.replyMessage) { 
let c = message.replyMessage.senderId
let b = users.find(x=> x.id === Number(c));
message.send(`Айди игрока:${utils.sp(b.uid)}
`);
}
});

		cmd.hear(/^(?:евал)\s([^]+)$/i, async (message, bot) => {
		if(message.user.right < 6) return message.send(`Только для Сергей !`)
	try {
	  message.send("Готово: "+JSON.stringify(eval(message.args[1])));
	} catch(err){
		console.log(err);
		message.send(">Error: "+ err);
	}
});

cmd.hear(/^(?:статистика бота|статистика)/i, async (message) => {
	if(message.user.right < 6) return;
    let s = 0;
    let f = 0;
    let u = 0;
    let q = 0;
    let v = 0;
    for(i in users) {
    	f += users[i].ban
    }
    {
    	let top = [];

users.map(x=> {
top.push({ balance: x.balance, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention});
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

text += ` @id${user.id} (${user.tag}) — 👑${utils.sp(user.rating)}
`;
}
        message.send(`
        	Подробная статистика бота:
        	➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        	😈 Всего пользователей: ${users.length}
            📥 Обработано команд: ${utils.sp(botinfo.msg)}  
            💎 Казна FB_BOT: ${utils.sp(botinfo.kazna)}

            ⏰ Дн: ${uptime.days} | Час: ${uptime.hours} | Мин: ${uptime.min} | Сек: ${uptime.sec}

            👑 Президент - ${text} (топер рейтинга)
        	➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        	`);
}
});
//----------|•Выдача Админки•|----------\\

cmd.hear(/^(?:giveadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if( message.user.right < 6) return;
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(1-5)]`); 
		if(message.args[2] > 6) return message.send(` 🔸 >> Максимальный админ-уровень 6!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		let id = Number(message.args[1])
       users[id].right = Number(message.args[2]); 
       message.send(`🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "Titan").replace(/6/gi, "Владелец")}]`);
       var is = [message.user.uid, message.text] 
		
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "System")}`
		}); 
		
        });
//------------|•Система Варнов•|------------\\

cmd.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не выдать себе предупреждение`)
        if(message.user.right < 2) return message.send(`🔸 » Вы не Silver`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
        if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать предупреждение данному игроку!`);

		users[message.args[1]].warn += 1;  
      users[message.args[1]].warn_p = `${message.args[2]}`
      message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
      var is = [message.user.uid, message.text] 
		

		let text = `✅ » ${user.tag} Вам выдали варн по причине: [${message.args[2]}]`
		if(message.user.warn == 3){
			message.user.ban = true; 
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
      message.user.ainfo.warns += 1;
	}); 

cmd.hear(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не Silver`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;
		message.send(`✅ » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
      var is = [message.user.uid, message.text] 
		
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		}); 
	});
	
 //----------|•Смена ника•|----------\\

cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.right < 3) return message.send(`🔸 » Вы не администратор`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(вк бо т |&#$₴|сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
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
		message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
      var is = [message.user.uid, message.text] 
		
      message.user.ainfo.nicks += 1;
	});

//---------------|•Выдача/Обнуление Рейтинга•|------------------\\
cmd.hear(/^(?:giverating)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rating += Number(parserInt(message.args[2]));
	message.send(`👑 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рейтинга`)
var is = [message.user.uid, message.text] 
		
 	 
	});
	
	cmd.hear(/^(?:removerating)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].rating = 0; 
	message.send(`👑 » Вы забрали весь рейтинг у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
   var is = [message.user.uid, message.text] 
		
});
cmd.hear(/^(?:выдать кейс 6)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 6 [ID] [кол-во]'`); 
	users[message.args[1]].newyear_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Новогодних кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:выдать кейс 5)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 5 [ID] [кол-во]'`); 
	users[message.args[1]].premium_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Премиум кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:выдать кейс 4)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 4 [ID] [кол-во]'`); 
	users[message.args[1]].halloween_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Хэллоуин кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:выдать кейс 3)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 3 [ID] [кол-во]'`); 
	users[message.args[1]].donate_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Донат кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:выдать кейс 2)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 2 [ID] [кол-во]'`); 
	users[message.args[1]].platinum_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Платинум кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	

cmd.hear(/^(?:выдать кейс 1)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'выдать кейс 1 [ID] [кол-во]'`); 
	users[message.args[1]].surpris_case += Number(parserInt(message.args[2]));
	message.send(`📦 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Сюрприз кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	

cmd.hear(/^(?:забрать кейс 1)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 1 [ID] [кол-во]'`); 
	users[message.args[1]].surpris_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Сюрприз кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
	
cmd.hear(/^(?:забрать кейс 2)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 2 [ID] [кол-во]'`); 
	users[message.args[1]].platinum_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Платинум кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:забрать кейс 3)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 3 [ID] [кол-во]'`); 
	users[message.args[1]].donate_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Донат кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:забрать кейс 4)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 4 [ID] [кол-во]'`); 
	users[message.args[1]].halloween_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Хэллоуин кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:забрать кейс 5)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 5 [ID] [кол-во]'`); 
	users[message.args[1]].premium_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Премиум кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
cmd.hear(/^(?:забрать кейс 6)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'забрать кейс 6 [ID] [кол-во]'`); 
	users[message.args[1]].newyear_case -= Number(parserInt(message.args[2]));
	message.send(`📦 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Новогодних кейсов`)
var is = [message.user.uid, message.text] 
		
 	 
	});	
//----------|•Система Банов•|----------\\


cmd.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете забанить себя`)
       if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
       if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя заблокировать этого игрока!`);
        
		users[message.args[1]].ban = true;  
		message.send(`✅ » Вы выдали блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
      var is = [message.user.uid, message.text] 


		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
     message.user.ainfo.bans += 1;
	}); 

cmd.hear(/^(?:принтеры)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])  return bot(`денежные принтеры:
🖨 1. Саnоn РIXMА: 250млн$/час (10.000.000.000$)
🖨 2. HР ОffiсеJеt Рrо: 1млрд$/час (50.000.000.000$)
🖨 3. Xеrоx Рhаsеr 7800DN: 5млрд$/час (400.000.000.000$)
🖨 4. Ерsоn SurеLаb: 10млрд$/час (800.000.000.000$)
🖨 5. HР Соlоr LаsеrJеt: 120млрд$/час (3.000.000.000.000$)

🛒 Для покупки введите "Принтеры [номер]"
`, {
	attachment: `photo-171493284_457288244`,
});

		const sell = printers.find(x=> x.id === Number(message.args[1]));
if(!sell) return;
const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
if(message.user.printer >= 1) return bot(`Вы уже имеете принтер!`)
if(message.user.printer != 0 && message.user.printer != message.args[1]) return bot(`вы не можете купить принтер другого типа`);

if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
else if(message.user.balance >= sell.cost * count)
{
message.user.balance -= sell.cost * count;
message.user.printer = sell.id;
message.user.kraska = 100;
message.user.printermoney = 0;

return bot(`вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
}

});


cmd.hear(/^(?:принтер)$/i, async (message, bot) => {
if(!message.user.printer) return bot(`У вас нету принтера!`)
let text = ``;
if(message.user.printer == 1) text += `💸 Печатает 250.000.000$/час\n`
if(message.user.printer == 2) text += `💸 Печатает 1.000.000.000$/час\n`
if(message.user.printer == 3) text += `💸 Печатает 5.000.000.000$/час\n`
if(message.user.printer == 4) text += `💸 Печатает 10.000.000.000$/час\n`
if(message.user.printer == 5) text += `💸 Печатает 120.000.000.000$/час\n`
text += `💰 Напечатал ${utils.sp(message.user.printermoney)}$\n`;
text += `🎨 Осталось картриджа: ${message.user.kraska}%\n\n`;
text += `✅ Не забывайте перезаправлять принтер краской иначе его заклинит и он сломается! Команда: «принтер заправить»\n`;
text += `🏧 Снять деньги с принтера, команда: «принтер снять»`;
	  message.send(`@id${message.user.id} (${message.user.tag}), информация «${printers[message.user.printer - 1].name}»:\n${text}`);
});

cmd.hear(/^(?:принтер заправить)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
if(message.user.kraska === 100) return bot(`Ваш принтер не требует заправки. 🎨`)
if(message.user.printer === 0) return bot(`У вас нету принтера. ⛔`)
if(message.user.balance < 100000) return bot(`У вас не хватает денег! Нужно 100.000$`)
    bot(`Вы заправили принтер за: 100.000$`);
message.user.kraska = 100;
message.user.balance -= 100000;
});

cmd.hear(/^(?:принтер снять)$/i, async (message, bot) => {
if(!message.user.printer) return bot(`У вас нету принтера. ⛔`);
if(!message.user.printermoney) return bot(`Ваш принтер ничего не напечатал`);

const printermoney_ = message.user.printermoney;

message.user.balance += message.user.printermoney;
message.user.printermoney = 0;

return bot(`вы собрали ${utils.sp(printermoney_)}$, следующие деньги появятся через час!
🌐 Баланс: ${utils.sp(message.user.balance)}$\n
`);
});

cmd.hear(/^(?:Постройки)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
if(!message.args[1]) return bot `Здания:
🖨 1. Сбербанк: 250млн$/час (850.000.000.000$)
🖨 2. ВТБ: 1млрд$/час (1.000.000.000.000$)
🖨 3. Тинькофф: 5млрд$/час (3.000.000.000.000$)

🛒 Для покупки введите "Постройки [номер]"`

const sell = zdanie.find(x=> x.id === Number(message.args[1]));
if(!sell) return;
const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
if(message.user.zdanie >= 1) return bot(`Вы уже имеете Здание или строите его!`)
if(message.user.zdanie != 0 && message.user.zdanie != message.args[1]) return bot(`вы не можете купить Здание другого типа`);

if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
else if(message.user.balance >= sell.cost * count)
{
message.user.balance -= sell.cost * count;
message.user.zdanie = sell.id;
message.user.stroizd = 1;

return bot(`вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
}
});

cmd.hear(/^(?:Построить)$/i, async (message, bot) => {
if(message.user.stroizd == 0) return bot(`Вы еще не купили здание для стройки! Или оно уже построено. Введите: Постройки`)
	const zd = utils.random(7,10,15,5,20,25);
bot(`Вы начали строить здание!`)

message.user.zdstroi += zd;
message.send(`За этот раз вы построили Здание на ${zd}% Всего построено здание на ${message.user.zdstroi}%`)

if(message.user.zdstroi >= 100){
			message.user.stroizd = 0;
			message.send(`Вы успешно построили здание! Чтобы узнать информацию о здание напишите: "Здание" Без "`)
		}
});

cmd.hear(/^(?:Здание)$/i, async (message, bot) => {
		var activ = (message.user.stroizd == 1) ? "⛔ Неактивно" : "✅ Активно"  
	if(message.user.zdanie == 0) return bot(`У вас нету здания!`)
	let text = ``;
	if(message.user.zdanie)	text += `👀 Здание: ${zdanie[message.user.zdanie - 1].name}\n`;
		if(message.user.zdanie == 1){ text += `💰 Прибыль: 250.000.000$ В час\n`;}
		if(message.user.zdanie == 2){ text += `💰 Прибыль: 1.000.000.000$ В час\n`;}
		if(message.user.zdanie == 3){ text += `💰 Прибыль: 5.000.000.000$ В час\n`;}
		text += `💰 Баланс: ${message.user.zdaniemoney}$\n`;
		if(message.user.stroizd == 1) text += `😇 Построено на: ${message.user.zdstroi}%\n`;
		text += `🌍 Активность: ${activ}\n\n`
		text += `✅ Совет: Чтобы была активность здания, нужно чтобы оно было построено.\n 🏧 И чтобы снять деньги напишите: Здание снять\n`
 return message.send(`@id${message.user.id} (${message.user.tag}), Информация о здании:\n\n${text}`);
});

cmd.hear(/^(?:Здание снять)$/i, async (message, bot) => {
	if(message.user.zdaniemoney == 0) return bot(`Ваше здание еще ничего не принесло.`)
	if(message.user.zdanie == 0) return bot(`У вас нету здания!`)
		const zdm = message.user.zdaniemoney;
	message.user.balance += message.user.zdaniemoney;
	message.user.zdaniemoney = 0;
	return bot(`🤑 Вы успешно сняли деньги со Здания. Вы заработали: ${zdm}$\n Баланс: ${message.user.balance}`)
});

async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

cmd.hear(/^(?:Бааан|bаan)\s([^]+)\s(.*)$/i, async (message, bot) => {
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.right < 6) return bot(`🔸 » У вас нету доступа`);
if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете забанить себя`)
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
if(user.right >= message.user.right) return bot(`вы не можете забанить игрока с более высокой привилегией.`);

user.ban = true; 
message.user.ainfo.bans += 1;
prichina: message.args[2]

saveUsers();
await bot(`вы забанили игрока *id${user.id} (${user.tag}) по причине ${message.args[2]}.`,); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован ⛔
👿Заблокировал: @id${(message.user.id)}(АДМИНИСТРАТОР)
📜Причина: ${message.args[2]}` }); 
}
});

	cmd.hear(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;
		message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
      var is = [message.user.uid, message.text] 
		
    
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял вам блокировку аккаунта`
		}); 
	});

	

//----------|•Админ блокировка•|-------------\

cmd.hear(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
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

cmd.hear(/^(?:blockgive)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
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


	cmd.hear(/^(?:респект)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
let user = await users.find(x=> x.uid === Number(message.args[1]));
if(message.args[1] == message.user.uid) return bot(`вы указали свой ID`);

if(message.args[2] == '+' || message.args[2] == '-'){
if(message.args[2] == '+') user.ainfo.good_ans += 1;
if(message.args[2] == '-') user.ainfo.bad_ans += 1;
} else {
return bot(`оценить ответ можно только + или -`);
}
return bot(`вы успешно оценили ответ \n » Администратора [*id${user.id} (${user.tag})] - ${message.args[2].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`);
});

	cmd.hear(/^(?:cid)/i, message => {
return message.send(`Ид беседы: ${message.chatId}`)	
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
		if(!message.args[1]) return message.send(`🔸 вы не написали жалобу | репорт [текст]`);
	vk.api.messages.send({ chat_id: 49, forward_messages: message.id, message: `🆕 Поступил новый репорт!\n🗣 Отправил: ${message.user.id}\n🔎 Игровой ID: ${message.user.uid}\n 💬Сообщение: ${message.args[1]}` }).then(() => {
		return bot(`ваш репорт был отправлен администраторам.`);
	}).catch((err) => {
		return bot(`произошла ошибка при отправлении сообщения технической поддержке.`);
	});
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.right < 3) return;
if(!message.isChat) return bot(`команда работает только в беседе админов ${smileerror}`);
let user = await users.find(x=> x.uid === Number(message.args[1]));

vk.api.messages.send({ user_id: user.id, message: `🗣 Вам ответили на вашу жалобу.\n➡ [id${message.user.id}|${message.user.tag}] [ID ${message.user.uid}]: ${message.args[2]}\n\nОцените ответ: респект [id] +/- [хорошо/плохо]` });
message.user.ainfo.all_ans += 1;
message.user.ainfo.ans += 1;
return bot(`данный [id${user.id}|игрок] получил ваш ответ, спасибо что помогаете игрокам.`);
});
	
	//---------|•Кик Пользователя•|--------\\
	
cmd.hear(/^(?:кикнуть|кик)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе ${smileerror}`);
if(message.user.right < 4) return;
var domain = message.args[2].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[2]
}).then((res) => { 
let user = users.find(x=> x.id === Number(res.object_id)); 
vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: res.object_id })
.catch((error) => {return bot(`такого игрока нет в беседе ${smileerror}`);
}); 
return bot(`пользователь был исключен из чата!`); 
vk.api.messages.send({ chat_id: 49, message: `[УВЕДОМЛЕНИЕ О КИКЕ]
Администратор [id${message.user.id}|${message.user.tag}] (ID: ${message.user.uid}) кикнул из беседы ${message.chatId} игрока [id${user.id}|${user.tag}] (ID: ${user.uid})"` });
})
});

	cmd.hear(/^(?:verify|подтвержденные)$/i, async (message, args, bot) => {  
		message.user.soobshenie += 1;
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

cmd.hear(/^(?:bans|banlist|blsit)$/i, async (message, args, bot) => {  
	message.user.soobshenie += 1;
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
 
 /////////////////
cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
		if(message.user.right < 3) return bot(`доступно с привилегии - Администратор.`);
		if(!message.args[1]) return message.reply(`[✨] >> Пример - Cоздать (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - Cоздать (количество активаций) (сумма)`);
		 
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
			[📝] >> Промокод - ${result}
			[🗝] >> Активаций в этом промокоде - ${activ}
			[💰] >> Валюты в этом промокоде - ${spaces(balance)} Coins  
			`);

});
	
cmd.hear(/^(?:Мсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 3) return bot(`доступно с привилегии - Админ.`);
		if(!message.args[1]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		 
		let balance = parserInt(message.args[1]); 

		if(!promo[message.args[2]]){
		            	promo[message.args[2]] = {
		            		balance: Number(balance),
		            		activ: 100,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			[📝] >> Промокод - ${message.args[2]}
			[🗝] >> Активаций в этом промокоде - 100
			[💰] >> Валюты в этом промокоде - ${spaces(balance)} Coins  
			`);

});

cmd.hear(/^(?:промокод)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;

	if(!message.args[1]) return message.reply(`[🤔] >> Я всё понимаю, что ты уже что-то не то пишешь мне, но не надо забывать сам промокод.`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`[😩] >> Woooops... Наверное, промокод много раз использовали и он теперь недоступен!`, {attachment: promos});
	
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
			return message.reply(`[🤑] >> Ты активировал(а) промокод.\n[✨] >> В промокоде, Вы нашли: ${spaces(coi)} Coins\n\n[😏] | Подсказка: Нельзя активировать более одного раза промокод.`, {attachment: promos});
		}
	}else{
		return message.reply(`[😪] >> Простите, но нельзя промокод во второй раз активировать!`, {attachment: promos});
	}
});

cmd.hear(/^(?:топ ранги)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	let top = [];

	users.map(x=> {
		top.push({ msg: x.msg, tag: x.msg, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.msg - a.msg;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑 ${utils.sp(user.msg)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — 👑 ${utils.sp(message.user.msg)}`);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cmd.hear(/^(?:пизда|вагина|блядь|уёбище|пидор|хуесос|лох|чмо|пидорас|тварь|порно|секс|блять|хуй|хуесос|гнида|еблан|даун|бля|блет|чушка|хуй|х уй|х у й|хуй соси|соси|Бля|Блять|Хуй соси|Соси|Пизда|Блядь|Хуесос|Гнида|Еблан|Даун|Бля|Блет|Чушка)$/i, async (message, args, bot) => {
	message.user.warn += 1;
	let ban = message.user.ban
	if(message.user.warn == 3);
	if(!message.user.ban == true);
	return message.send(`
@id${message.user.id} (${message.user.tag}), Вы получили +1 выговор т.к. сказали запрещённое слово. ⛔
`)
});

/*cmd.hear(/^(?:тестхуец)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

	var admin = (message.user.right == 0) ? "" : "📕 » Админ - админ-панель. " 
			if(message.user.keyboard == false) {
					return message.send(`
@id${message.user.id} (${message.user.tag}), тест
`);
}
if(message.user.keyboard == true) {
	return message.reply(`
@id${message.user.id} (${message.user.tag}), тест`, 
		{
			keyboard:JSON.stringify(
		{
	    	"one_time": false, 
	    	"buttons": 
	    	[ 
      			[{ 
			        "action": 
			        { 
				        "type": "text", 
				        "payload": "{\"button\": \"1\"}", 
				        "label": "Red" 
			        }, 
			    "color": "negative" 
			    }, 
			    { 
			        "action": 
			        { 
				        "type": "text", 
				        "payload": "{\"button\": \"2\"}", 
				        "label": "Green" 
			        }, 
			    "color": "positive" 
			    }], 
	      		[{ 
	        		"action": 
	        		{ 
			          	"type": "text", 
			          	"payload": "{\"button\": \"3\"}", 
			          	"label": "White" 
	        		}, 
	        	"color": "default" 
	      		}, 
	     		{ 
        			"action": 
        			{ 
          				"type": "text", 
			          	"payload": "{\"button\": \"4\"}", 
			          	"label": "Blue" 
	        		}, 
	        	"color": "primary" 
	      	}] 
	    ] 
	} 
}));*/

cmd.hear(/^(?:Помощь|Помошь|Начать|меню|команды|help)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

	var admin = (message.user.right == 0) ? "" : "📕 » Админ - админ-панель. " 
			if(message.user.keyboard == false) {
					return message.send(`
@id${message.user.id} (${message.user.tag}), мои команды:

🍀 Развлекательные: 
⠀⠀💋 Поцеловать [id] - поцеловать игрока 
⠀⠀👊 Ударить [ID] - ударить игрока 
⠀⠀🎺 Крикнуть [фраза] - крикнуть любую фразу. 
⠀⠀🔮 Шар [фраза] 
⠀⠀📚 Инфа [фраза] 
⠀⠀🍷 Бутылочка - играть в бутылочку.

💼 Бизнес: 
⠀⠀📈 Бизнес - статистика 
⠀⠀💵 Бизнес снять 
⠀⠀✅ Бизнес улучшить [1-2] 

🖨 Принтер:
⠀⠀💹 Принтер - статистика
⠀⠀💷 Принтер снять
⠀⠀🎨 Принтер заправить

🛫 Полеты:
  🛫 Рейсы - Все рейсы полетов
  🛫 Полет - Полет в воздухе
  🛫 Перелет - Перелет в другую страну

🏫 Здания:
  🏛 Здание - Статистика
  🏢 Постройки - Все здания
  🏚 Построить - Строить здание

🚀 Игры:
⠀⠀🎲 Кубик [1-6] [ставка] 
⠀⠀🎰 Казино [сумма] 
⠀⠀📈 Трейд [вверх/вниз] [ставка] 
⠀⠀🔫 Стрела [id] [ставка] 
⠀⠀🤼‍♂ Напасть 
⠀⠀🎱 Фортуна
⠀⠀🌲 Поход
⠀⠀🎫 Лотерея - играть в лотерею. 
⠀⠀📦 Кейсы
  🍂 Копать
⠀⠀👒 Квесты
⠀⠀🚕 Таксовать
⠀⠀🌲 Поход
⠀⠀👮 Взломать

🌽 Питомцы: 
⠀⠀🐒 Питомец - информация 
⠀⠀🐪 Питомец поход 
⠀⠀🌟 Питомец улучшить 
⠀⠀🙈 Питомец найти

🤑 Налоги:
       🤩 Налоги - Узнать свои налоги
       🤑 Налог - Оплатить ваши налоги

🔥 Ютуб:
⠀⠀💎 канал - информация о канале 
⠀⠀💎 создать канал [название] - создать канал 
⠀⠀💎 юработать - работать (в ютубе) 
⠀⠀💎 стримить - провести стрим на канале 
⠀⠀💎 снять [название] - снять видео 
⠀⠀💎 получить ск/зк/бк/рк - получить кнопку 
⠀⠀💎 реклама - информация о рекламе 
⠀⠀💎 тренды - тренды ютуба. 

 💻 Пк:

     💻 Корпуса - Корпуса для пк
     💻 Материнки - Материнские платы для пк
     💻 Видеокарты - Видеокарты для пк
     💻 Процессоры - Процессоры для пк
     💻 Мониторы - Мониторы для пк
     💻 Оперативка - Оперативная память для пк
     💻 БП - Блок питания для пк
     💻 HDD - Жесткий диск для пк
     💻 ПК - Ваш ПК
     💻 Запустить пк - Запуск вашего пк
     💻 Выкл пк - Выключить ваш пк
     💻 Играть в ПК - Играть в свой пк
     
🔋 Команды ферм:
⠀⠀💸 Ферма - статистика фермы 
⠀⠀🔆 Фермы - список ферм.
  🔆 ЛФермы - список Лайт ферм. 
⠀⠀📰 Финфо - полная статистика ферм 

💖 Браки:
⠀⠀❤ Брак [ID] - вступить в брак. 
⠀⠀💔 Развод - развестись. 
⠀⠀💍 Браки - список предложений. 

📱 Телефон:
⠀⠀📱 Купить номер. 
⠀⠀📱 Тинфо - статистика о телефоне. 
⠀⠀📱 Телефоны - список телефонов в продаже. 
⠀⠀✉ Смс [ID] - отправить смс-ку. 

💡 Разное:
⠀⠀👾 Бот - информация о проекте. 
⠀⠀📒 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀💳 Карта - создать карту 
⠀⠀💳 положить [сумма] - положить деньги на карту. 
⠀⠀👑 Рейтинг - ваш рейтинг
⠀⠀🎮 Ник [ник/вкл/выкл]
⠀⠀🛒 Магазин
⠀⠀💸 Продать [предмет]
⠀⠀💽 Ферма - биткоин ферма
⠀⠀📰 Финфо - полная статистика ферм
⠀⠀🤝 Передать [ID игрока] [сумма]
⠀⠀🏆 Топ
⠀⠀⚔ Кланы
⠀⠀🛍 Донат 
   🏚 Гараж - Ваш гараж
   🏚 Купить гараж - Покупка гаража
   💼 Лицензии - Лицензии для Т/С
   🏚 Гараж улучшить - Сделать в гараже 2 слота машин
⠀⠀💎 Бонус - ежедневный бонус
   🌈 Подарок - Работает только в беседе

🆘 Репорт [фраза] - ошибки или пожелания
`);
}
if(message.user.keyboard == true) {
	return message.reply(`
@id${message.user.id} (${message.user.tag}), мои команды:

🍀 Развлекательные: 
⠀⠀💋 Поцеловать [id] - поцеловать игрока 
⠀⠀👊 Ударить [ID] - ударить игрока 
⠀⠀🎺 Крикнуть [фраза] - крикнуть любую фразу. 
⠀⠀🔮 Шар [фраза] 
⠀⠀📚 Инфа [фраза] 
⠀⠀🍷 Бутылочка - играть в бутылочку.

💼 Бизнес: 
⠀⠀📈 Бизнес - статистика 
⠀⠀💵 Бизнес снять 
⠀⠀✅ Бизнес улучшить [1-2] 

🖨 Принтер:
⠀⠀💹 Принтер - статистика
⠀⠀💷 Принтер снять
⠀⠀🎨 Принтер заправить

🛫 Полеты:
  🛫 Рейсы - Все рейсы полетов
  🛫 Полет - Полет в воздухе

🏫 Здания:
  🏛 Здание - Статистика
  🏢 Постройки - Все здания
  🏚 Построить - Строить здание

🚀 Игры:
⠀⠀🎲 Кубик [1-6] [ставка] 
⠀⠀🎰 Казино [сумма] 
⠀⠀📈 Трейд [вверх/вниз] [ставка] 
⠀⠀🔫 Стрела [id] [ставка] 
⠀⠀🤼‍♂ Напасть 
⠀⠀🎱 Фортуна
⠀⠀🎫 Лотерея - играть в лотерею. 
⠀⠀📦 Кейсы
  🍂 Копать
⠀⠀🚕 Таксовать
⠀⠀🌲 Поход
⠀⠀👮 Взломать

🌽 Питомцы: 
⠀⠀🐒 Питомец - информация 
⠀⠀🐪 Питомец поход 
⠀⠀🌟 Питомец улучшить 
⠀⠀🙈 Питомец найти

🤑 Налоги:
      🤩 Налоги - Узнать свои налоги
      🤑 Налог - Оплатить ваши налоги

🔥 Ютуб:
⠀⠀💎 канал - информация о канале 
⠀⠀💎 создать канал [название] - создать канал 
⠀⠀💎 юработать - работать (в ютубе) 
⠀⠀💎 стримить - провести стрим на канале 
⠀⠀💎 снять [название] - снять видео 
⠀⠀💎 получить ск/зк/бк - получить кнопку 
⠀⠀💎 реклама - информация о рекламе 
⠀⠀💎 тренды - тренды ютуба.

 💻 Пк:

     💻 Корпуса - Корпуса для пк
     💻 Материнки - Материнские платы для пк
     💻 Видеокарты - Видеокарты для пк
     💻 Процессоры - Процессоры для пк
     💻 Мониторы - Мониторы для пк
     💻 Оперативка - Оперативная память для пк
     💻 БП - Блок питания для пк
     💻 HDD - Жесткий диск для пк
     💻 ПК - Ваш ПК
     💻 Запустить пк - Запуск вашего пк
     💻 Играть в ПК - Играть в свой пк
     
🔋 Команды ферм:
⠀⠀💸 Ферма - статистика фермы 
⠀⠀🔆 Фермы - список ферм. 
  🔆 ЛФермы - список Лайт ферм. 
⠀⠀📰 Финфо - полная статистика ферм 

💖 Браки:
⠀⠀❤ Брак [ID] - вступить в брак. 
⠀⠀💔 Развод - развестись. 
⠀⠀💍 Браки - список предложений. 

📱 Телефон:
⠀⠀📱 Купить номер. 
⠀⠀📱 Тинфо - статистика о телефоне. 
⠀⠀📱 Телефоны - список телефонов в продаже. 
⠀⠀✉ Смс [ID] - отправить смс-ку. 

💡 Разное:
⠀⠀👾 Бот - информация о проекте. 
⠀⠀📒 Профиль
⠀⠀💲 Баланс
⠀⠀💰 Банк [сумма/снять сумма]
⠀⠀💳 Карта - создать карту 
⠀⠀💳 положить [сумма] - положить деньги на карту. 
⠀⠀👑 Рейтинг - ваш рейтинг
⠀⠀🎮 Ник [ник/вкл/выкл]
⠀⠀🛒 Магазин
⠀⠀💸 Продать [предмет]
⠀⠀💽 Ферма - биткоин ферма
⠀⠀📰 Финфо - полная статистика ферм
⠀⠀🤝 Передать [ID игрока] [сумма]
⠀⠀🏆 Топ
⠀⠀⚔ Кланы
⠀⠀🛍 Донат 
   🏚 Гараж - Ваш гараж
   🏚 Купить гараж - Покупка гаража
  💼 Лицензии - Лицензии для Т/С
   🏚 Гараж улучшить - Сделать в гараже 2 слота машин
⠀⠀💎 Бонус - ежедневный бонус
  🌈 Подарок - Работает только в беседе

👔 Команды работы:
⠀⠀🔨 Работать 
⠀⠀🚧 Уволиться 
⠀⠀👕 Работа 

🆘 Репорт [фраза] - ошибки или пожелания `, 
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
			"color": "negative"
		}]
		]
			})
		});
		}}

);


cmd.hear(/^(?:для бесед)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;

			if(message.user.keyboard == false) {
	await message.reply(`🎈 Развлекательные:
🤔 Кто [фраза]
📅 Когда [фраза] 
📊 Инфа [фраза] 
🔮 Шар [фраза] 
⌚ Дата [id]
⚖ Выбери [фраза] или [фраза2]
📠 Реши [пример]
↪ Переверни [фраза]
🔑 Вики [фраза]
🌆 Погода [город]
🎀 Оцени [картинка]
⏳ Время
✨ Бутылочка
🤡 Анекдот
📹 Гиф
`);
}
if(message.user.keyboard == true) {
	await message.reply(`🎈 Развлекательные:
🤔 Кто [фраза]
📅 Когда [фраза] 
📊 Инфа [фраза] 
🔮 Шар [фраза] 
⌚ Дата [id]
⚖ Выбери [фраза] или [фраза2]
📠 Реши [пример]
↪ Переверни [фраза]
🔑 Вики [фраза]
🌆 Погода [город]
🎀 Оцени [картинка]
⏳ Время
✨ Бутылочка
🤡 Анекдот
📹 Гиф
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
				"label": "Помощь"
		},
			"color": "default"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Гиф"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Анекдот"
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

cmd.hear(/^(?:игры)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

			if(message.user.keyboard == false) {
					await message.reply(`[🕹] || Игры:

🎲 » Кубик [1-6]
🐊 »  Напасть
🎰 » Казино [сумма]
📈 » Трейд [вверх/вниз] [сумма]
🥛 » Стаканчик [1-3] [сумма]
🔦 » Сейф [случайные 2 цифры] 
🌟 » Монетка [сумма] [орел/решка]
👤 » Тир [1-3] [сумма]
👛 » Ловушка [сумма]
🏆 » Фортуна
🔫 » РР
`);
}
if(message.user.keyboard == true) {
	await message.reply(`[🕹] || Игры:

🎲 » Кубик [1-6]
🐊 »  Напасть
🎰 » Казино [сумма]
📈 » Трейд [вверх/вниз] [сумма]
🥛 » Стаканчик [1-3] [сумма]
🔦 » Сейф [случайные 2 цифры] 
🌟 » Монетка [сумма] [орел/решка]
👤 » Тир [1-3] [сумма]
👛 » Ловушка [сумма]
🏆 » Фортуна
🔫 » РР
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
				"label": "Помощь"
		},
			"color": "default"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Казино 1к"
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

/* |                       | */
/* | А тут уже идут - Игры | */
/* V                       V */

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
	if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else return bot(`не угадали 
	🎲 Выпало число ${int}`);
});

cmd.hear(/^(?:ловушка)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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
        return bot(`Вы засунули руку в коробку...\n[😎] >> Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 >> Вы выиграли:  ${spaces(win)}$`);
    }else{
        let win = text;
        message.user.balance -= Math.round(win);  
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n[💀] >> Какая неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n[💴] >> Вы проиграли:  ${spaces(win)}$`);
   
    } 		

}
})

cmd.hear(/^(?:тир)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

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
	    return bot(`поздравляю! Вы попали прямо в цель!!\n[👤] >> Вы забираете ваш выигрыш :3`, {attachment: win});
	  }else{
	    message.user.balance -= stavka;
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }

    return bot(`Вы промохнулись...\n[💀] >> Вы теряете всю свою ставку.`, {attachment: lose});
  	}
	   
});

cmd.hear(/^(?:рр)$/i, async (message, bot) => {
	message.user.soobshenie += 1;


    if(message.user.balance < 100000000000) return message.reply("к сожалению в рулетку можно играть с балансом выше 100ккк")
    if(message.user.balance == 0) return message.reply("🔔 Играть в игры можно с балансом выше 0! 🔔");
    if(message.user.pp == 1) return message.reply(`${message.user.tag}, ты уже в игре!`);
	message.reply(`[💀] | ${message.user.tag}, Вы начали игру "Русская Рулетка"\n\n [🤤] | Задача этой игры: Вам дано 3 выстрела... Если в Вас не попала пуля, то мы дадим на ваш баланс 1.000.000.000.000$, а если в вас попала пуля, то весь ваш баланс обнуляется.\n\n[⚠] » Чтобы сделать выстрел, то отправьте боту - 🔫`);
	if(message.user.balance < 100000000000) return message.reply("к сожалению в рулетку можно играть с балансом выше 100ккк")
	return message.user.pp = 1;
});

cmd.hear(/^(?:🔫|выстрел)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	if(message.user.balance < 100000000000) return message.reply("к сожалению в рулетку можно играть с балансом выше 100ккк")

	let balance = message.user.balance;
	let pp = message.user.pp;
	let p = 3 - pp;
		let ran =  ["неуспешно","уcпешно"];
		let rand = ran.random();

	if(message.user.pp == 0) return;
	if(message.user.pp > 0){
		if(rand != "неуспешно"){
			message.user.pp += 1;
			if(message.user.pp == 4){
			message.user.pp = 0;
			message.user.balance += 1000000000000;
			return message.reply(`[😅] >> ${message.user.tag}, поздравляем! Вы выжили в этой страшной игре!\n[☺] » Мы подарили вам - 1.000.000.000.000$`);
			}
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`*БАХ!!*`);
			return message.reply(`[😎] >> Пуля попала вам в голову - неуспешно\n[🍀] » Вам повезло. Стреляйте дальше!\n[😧] » Осталось выстрелов: ` + p);

		}
		if(rand != "успешно"){
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`*БАХ!!*`);
			message.reply(`[🤕] >> Пуля попала вам в голову - успешно\n[😞] » Удача повернулась к вам спиной.\n[😶] » Вы проиграли. Баланс анулирован. `);
			message.user.balance = 5000;
			return message.user.pp = 0;
				}
			}


});


cmd.hear(/^(?:монетка)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;


    if(!message.args[1]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  монетка ставка орел/решка`);
    let user = message.user;
    if(message.args[1] > message.user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   	
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[^_^] » Вы выиграли: ${spaces(message.args[1])}$\n[$] » Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n[-_-] » Вы проиграли: ${spaces(message.args[1])}$\n[$] » Баланс: ${spaces(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[-_-] » Вы проиграли: ${spaces(message.args[1])}$\n[$] » Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n[^_^] » Вы выиграли: ${spaces(message.args[1])}$\n[$] » Баланс: ${spaces(user.balance)}`);
    		}
   		 }
	return message.reply(`[Подсказка] » монетка [ставка] [орел/решка]`);
});

cmd.hear(/^(?:Фортуна)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
			if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
		return message.reply(`
    [👾]: Призы рулетки :[👾]
    💠 | Алмазы.
    💠 | Уголь.
    💠 | Валюта.
    💠 | БитКоины.

    [✳] >> Цена прокрутки: 20 БитКоинов.
    [✳] >> Команда, чтобы начать играть: крутить
    `, {attachment: fortyn});
	});
 
cmd.hear(/^(?:Крутить)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
		if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
		let user = message.user
		   	if (message.user.btc < 20) return message.reply(`[🍏] >> Прокрутка рулетки стоит 20 БитКоинов.`, {attachment: fortyn});
			message.user.btc -= 20;

		let balan = rand(350000, 550000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (message.user.level > 1) {
						message.user.balance += 500000;
						return message.reply(`[🔆] >> Вы выиграли 500.000$`, {attachment: fortyn});
					}
			        message.user.balance += 100000;
					return message.reply(`[✨] >> Вы выиграли 100.000$`, {attachment: fortyn});
				}
			} else {
				message.user.balance += balan;
				return message.reply(`[🍀] >> Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
			}
			if (win2 > 1) {
				message.user.balance += balan;
				return message.reply(`[⚡] >> Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
			}
		}
		if (win == 2) {
			message.user.balance += balan;
			return message.reply(`[🎉] >> Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
		}
		if (win == 3) {
			let balenc = balan - 5000;
			message.user.balance += balenc;
			return message.reply(`[🎄] >> Вы выиграли ${spaces(balenc)}$`, {attachment: fortyn});
		}
		if (win == 4) {
			let don = rand(5, 16);
			message.user.btc += don;
			return message.reply(`[💥] >> Вы выиграли ${spaces(don)} БитКоинов.`, {attachment: fortyn});
		}
		if (win == 5) {
			let exs = rand(135, 160);
			message.user.coal += exs;
			return message.reply(`[💣] >> Вы выиграли ${spaces(exs)} угля.`, {attachment: fortyn});
		}
		if (win == 6) {
			let bit = rand(3, 7);
			message.user.diamond += bit;
			return message.reply(`[🔥] >> Вы выиграли ${spaces(bit)} алмазов.`, {attachment: fortyn});
		}
	});

cmd.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
		if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
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

cmd.hear(/^(?:рейсы)$/i, async (message, bot) => {
	bot(`Рейсы:
		✈ 1. Москва-Анталья. Заплатят 1.000.000.000$
		✈ 2. Киев-Москва Заплатят 700.000.000$
		✈ 3. Анталья-Москва. Заплатят 1.000.000.000$

		✈ Чтобы взять какой-то рейс напишите Рейс [номер]
      

		`)
});

cmd.hear(/^(?:рейс 1)$/i, async (message, bot) => {
	if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
		if(message.user.timers.race1 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)

		setTimeout(() => {
		message.user.timers.race1 = false;
	}, 3600000);

	message.user.timers.race1 = true;


	bot(`Вы получили рейс, Москва-Анталья
		Зарплата: 1.000.000.000$
		Чтобы продолжить рейс напишите "Полет"`)

	});

cmd.hear(/^(?:рейс 2)$/i, async (message, bot) => {
	if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
	if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
		if(message.user.timers.race2 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)
			setTimeout(() => {
		message.user.timers.race2 = false;
	}, 3600000);

	message.user.timers.race2 = true;
	bot(`Вы получили рейс, Киев-Москва
		Зарплата: 700.000.000$
		Чтобы продолжить рейс напишите "Полет"`)
	});

cmd.hear(/^(?:рейс 3)$/i, async (message, bot) => {
	if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
	if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
	if(message.user.timers.race3 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)
		setTimeout(() => {
		message.user.timers.race3 = false;
	}, 3600000);

	message.user.timers.race3 = true;
	bot(`Вы получили рейс, Анталья-Москва
		Зарплата: 1.000.000.000$
		Чтобы продолжить рейс напишите "Полет"`)
	});

cmd.hear(/^(?:Полет|Полёт|Палет|Палёт)$/i, async (message, bot) => {
if(message.user.timers.race1 == false && message.user.timers.race2 == false && message.user.timers.race3 == false) return bot(`Вы не взяли рейс. Напишите: "Рейсы"`)
if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)

setTimeout(() => {
		message.user.timers.race = false;
	}, 3600000);

	message.user.timers.race = true;


	if(message.user.timers.race3 == true) message.send(`Ваш рейс Москва-Анталья прошел успешно. Вы заработали 1.000.000.000$`)
		message.user.balance += 1000000000


	if(message.user.timers.race2 == true) message.send(`Ваш рейс Киев-Москва прошел успешно. Вы заработали 700.000.000$`)
		message.user.balance += 700000000


 if(message.user.timers.race1 == true) message.send(`Ваш рейс Анталья-Москва прошел успешно. Вы заработали 1.000.000.000`)
        message.user.balance += 1000000000

});



cmd.hear(/^(?:дайвинг|плавать|🎏 дайвинг|🎣 плавать|🎣 дайвинг)$/i, async (message, bot) => { 
	let denyushka = 0;
	denyushka += utils.pick([50000000000, 75000000000, 10000000000, 25000000000]);
	if(message.user.timers.daiving >= 1) return bot(`в последнее время вы уже отправлялись в дайвинг, попробуйте позже`);

	message.user.timers.daiving = 3600;

	let prize = utils.pick([1, 1, 2, 2, 3, 4]);

	if(prize === 1)
	{
		message.user.balance += denyushka;
		bot(`вы отправились в плавание на 150 метров 🐬, и Вам удалось запечатлить неплохие снимки разных рыб.
		🐠 За снимки вам заплатили ${utils.sp(denyushka)}$`, {attachment: 'photo-192023992_467239154'});
	}

	if(prize === 2)
	{
		message.user.balance += denyushka;
		bot(`вам удалось заплыть довольно далеко 🐋, Вы успели поймать редкий вид рыбы.
		🦑 За находку вам заплатили: ${utils.sp(denyushka)}$`, {attachment: 'photo-192023992_467239155'});
	}

	if(prize === 3)
	{
		message.user.balance -= 100000;
		bot(`вы попытались заплытить поглубже, но вам повстречалась акула 🦈.
		❤ За лечение вы заплатили 100.000$`, {attachment: 'photo-192023992_467239156'});
	}

	if(prize === 4)
	{
		bot(`вы решили поверить в себя, и поплыли не в ту сторону. 🦑 Медуза ужалила вас в ногу и вы ничего не получили.`, {attachment: 'photo-192023992_467239157'});
	}

});

/* |                              | */
/* | А тут уже идут - Чат команды | */
/* V                              V */

cmd.hear(/^(?:погода|weather)/i, async (message, bot) => {
	message.user.soobshenie += 1;
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


cmd.hear(/^(?:гиф)\s(.*)$/i, async (message, bot) => {
       vk.api.call('docs.search', {q: message.args[1] + '.gif', count: 10})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.hear(/^(?:видео)\s(.*)$/i, async (message, bot) => {
       vk.api.call('video.search', {q: message.args[1], count: 5, adult: 0, access_token: '1bb57d44d6fcb05eb96c76e75f1f6810baef360ecc02c1a663d35466b208f7131bde3d4d25a8d5c88729d'})
        .then(response => {
            let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи : "${text.split('').reverse().join('')}"`)
});

cmd.hear(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	const phrase = utils.pick(['шанс этого', 'данная информация достоверна на', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:Время|time)/i, async (msg, bot) => { 
    await bot(`время сейчас:

⏰ | Москва: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏳ | Азия/Токио: ${new Date().getHours()+6}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏰ | Лондон: ${new Date().getHours()-7}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏳ | Дубаи: ${new Date().getHours()+3}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏰ | Берлин/Мюнхен: ${new Date().getHours()-1}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏳ | Екатеринбург: ${new Date().getHours()+5}:${new Date().getMinutes()}:${new Date().getSeconds()}
⏰ | Баку: ${new Date().getHours()+4}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
});

cmd.hear(/^(?:оцени)/i, async (message, bot) => {
	message.user.soobshenie += 1;
message.send(`мне кажется, что эта картинка идёт на: ` + utils.random(1, 10) + `/10`);
})

cmd.hear(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`ваша дата регистрации в [В]Контакте - ${user.tag}: ${user.regDate}`);
});

cmd.hear(/^(?:wiki|вики)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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


cmd.hear(/^(?:Ранги|Rangs)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:продать)$/i, async (message, args, bot) => {
	message.user.soobshenie += 1;
	return message.send(`
чтобы продать вещи, которые у вас есть нужно написать (пример) продать листья или же продать руду, их вы можете добывать, нападая на животных.
`)
});

cmd.hear(/^(?:оружие)\s?([0-9]+)?/i, async (message) => {
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:найти)\s([0-9]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);
			let text = ``;
			});	

cmd.hear(/^(?:сдаюсь)$/i, async (message, args, bot) => {
	message.user.soobshenie += 1;
 
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

cmd.hear(/^(?:стрела)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	message.user.soobshenie += 1;
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


cmd.hear(/^(?:принять)$/i, async (message, args, bot) => {
	message.user.soobshenie += 1;

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

cmd.hear(/^(?:бутылочка)$/i, async (message, bot) => { 
	message.user.soobshenie += 1;
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



cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {

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

cmd.hear(/^(?:стата)$/i, async (message, bot) => { 
	message.user.soobshenie += 1;
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

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	return bot(`
на вашем банковском счёте находится ${utils.sp(message.user.bank)}$
💳 » Взять кредит под 15%: 'Кредит [СУММА]' 
💳 » Погасить кредит: 'Погасить [СУММА]'

⚠ » Важно! Пока ваш долг больше 0 
⚠ » Ежечасно с вашего счета будет списываться 15% от суммы кредита
			
`);
});

	cmd.hear(/^(?:cc|укороти|скороти|сс)\s?([^]+)?/i, async (message, args, bot) => {

		   let cc = message.args[1].toLowerCase();
	 
	       let text = message.args[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 » Короткая ссылка: " + res.short_url);
	     });
	  
	   });

cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return bot(`у Вас нет питомца, отправьте «питомцы» чтобы получить список всех питомцев.`);
	if(message.user.pets.satiety < 30) return bot(`Ваш питомец сильно голоден! Покормите его! «питомец кормить» 😯`);
	if(message.user.pets.joy < 30) return bot(`Ваш питомец сильно хочет играть! Поиграйте с ним! «питомец играть» 😯`);
	if(message.user.timers.poxod) return bot(`вы сможете отправить питомца в поход через 60 минут. Ваш питомец довольно сильно устал! 😯`);

	let cashfind = utils.random(100000000000,200000000000);
	let minussatiety = utils.random(5,20);
	let minusjoy = utils.random(3,10);
	message.user.balance += cashfind;
	message.user.pets.satiety -= minussatiety;
	message.user.pets.joy -= minusjoy;
	message.user.timers.poxod = true;

		setTimeout(() => {
			message.user.timers.poxod = false;
		}, 3600000);

	return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! 🎁`);
});

cmd.hear(/^(?:Поход)$/i, async (message, bot) => {
	if(message.user.timers.poxod === true) return bot(`вы сегодня уже были в походе. 😕`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.poxod = false;
	}, 86400000);

	message.user.timers.poxod = true;

	if(prize === 1)
	{
		message.user.balance += 200;
		return bot(`находясь в походе, вы нашли 200💸`);
	}
	
	if(prize === 2)
	{
		message.user.balance += 150;
		return bot(`находясь в походе, вы нашли 150💸`);
	}
	
	if(prize === 3)
	{
		message.user.balance += 350;
		return bot(`находясь в походе, вы нашли 350💸`);
	}
	
	if(prize === 4)
	{
		message.user.lists += 20;
	return bot (`находясь в походе, вы нашли 20 листьев💸`);
	}
	
	if (prize === 5)
	{
		message.user.lists += 150;
	return bot (`находясь в походе, вы нашли 150 Листьев!!!!!!!!!!💸`);
	}
});

cmd.hear(/^(?:Напасть)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	if(message.user.timers.eda) return bot(`вы сегодня уже охотились. 😕`);
	let prize = utils.pick([1, 2, 3, 4]);

	setTimeout(() => {
		message.user.timers.eda = false;
	}, 86400000);

	message.user.timers.eda = true;

	if(prize === 1)
	{
		if(message.user.hp < 100) return bot(`У вас недостаточно здоровья, чтобы возродиться купите 🍗Еду, написав еда. 😕`);
		message.user.hp -= 100;
		return bot(`вы напали на тигра и умерли`);
	}
	
	if(prize === 2)
	{
		if(message.user.hp < 100) return bot(`У вас недостаточно здоровья, чтобы возродиться купите 🍗Еду, написав еда. 😕`);
		message.user.balance += 350;
		return bot(`вы убили рысь, продав её шкуру вы получили 350💸`);
	}
	
	if(prize === 3)
	{
		if(message.user.hp < 100) return bot(`У вас недостаточно здоровья, чтобы возродиться купите 🍗Еду, написав еда. 😕`);
		message.user.lists += 20;
	return bot (`вы убили кролика, и получаете 20 листьев💸`);
	}
	    
	if (prize === 4)
	{
		if(message.user.hp < 100) return bot(`У вас недостаточно здоровья, чтобы возродиться купите 🍗Еду, написав еда. 😕`);
		message.user.lists += 150;
	return bot (`вы убили медведя, продав его шкуру вам дали 150 Листьев!!!!!!!!!!💸`);
	}
});

cmd.hear(/^(?:состав)$/i, async (message, args, bot) => {  
	message.user.soobshenie += 1;
		let systems, podergka, sozdatels, admins, moders, chat; 
		creator = '\n🔺Создатель🔺\n';
        systems = '\n◾Titan◾\n';
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

cmd.hear(/^(?:пинг)$/i, async (message) => {
var tcpp = require('tcp-ping');

tcpp.probe('vk.com', 80, function(err, available) {
console.log(available);
});

tcpp.ping({ address: 'vk.com' }, function(err, data) {
message.send(`ᅠ📡 Пинг сейчас: ${data.avg.toFixed(0)}ms
ᅠ📡 Максимальный пинг: ${Math.round(data.max)}ms 
ᅠ📡 Минимальный пинг: ${Math.round(data.min)}ms `);
});
})

cmd.hear(/^(?:тест|ко)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.msgbalance += 1;
	return bot(`♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
});

cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.soobshenie += 1;
		if(message.user.right < 6) return bot(`доступно с привилегии - Администратор.`);
		if(!message.args[1]) return message.reply(`[✨] >> Пример - Cоздать (количество активаций) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - Cоздать (количество активаций) (сумма)`);
		 
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
			[📝] >> Промокод - ${result}
			[🗝] >> Активаций в этом промокоде - ${activ}
			[💰] >> Валюты в этом промокоде - ${spaces(balance)} Coins  
			`);

});
	
cmd.hear(/^(?:Мсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, async (message, bot) => {
		if(message.user.right < 6) return bot(`доступно с привилегии - 🔺CREATOR🔺.`);
		if(!message.args[1]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		 
		let balance = parserInt(message.args[1]); 

		if(!promo[message.args[2]]){
		            	promo[message.args[2]] = {
		            		balance: Number(balance),
		            		activ: 30,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			[📝] >> Промокод - ${message.args[2]}
			[🗝] >> Активаций в этом промокоде - 30
			[💰] >> Валюты в этом промокоде - ${spaces(balance)} Coins  
			`);

});

cmd.hear(/^(?:промокод|промо)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1

	if(!message.args[1]) return message.reply(`[🤔] >> Я всё понимаю, что ты уже что-то не то пишешь мне, но не надо забывать сам промокод.`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`[😩] >> Woooops... Наверное, промокод много раз использовали и он теперь недоступен!`, {attachment: promos});
	
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
			return message.reply(`[🤑] >> Ты активировал(а) промокод.\n[✨] >> В промокоде, Вы нашли: ${spaces(coi)} Coins\n\n[😏] | Подсказка: Нелзя активировать более одного раза промокод.`, {attachment: promos});
		}
	}else{
		return message.reply(`[😪] >> Простите, но нельзя промокод во второй раз активировать!`, {attachment: promos});
	}
});

cmd.hear(/^(?:правила|rules)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
 return bot(`
[🤖]🔥правила для нашей беседы/бота🔥🔥[🤖]
Первые 1.1, 1.2, 1.3, 1.4 самые важные правила!!!

1.1 [🗣]< не оскорблять человека/нацию/религию.

1.2[👺]< мат разрешен, но в официальной беседе запрещён.

1.3[👂]< попытка сломать бота используя какие-либо команды приводит к бану аккаунта.

1.4[🤚] < обан на привилегии, пример : вы купили привилегию, я вам её выдал, но вы не скинули деньги, предупреждаю!!!!!!! {⚡} Если вы пытаетесь каким-то способ обмануть создателя бота вам выдаётся бан аккаунта и бан ВКонтакте.

1.5[|🌀|] < создатель бота только один, если увидите боты с таким же скриптом это аналоги, настоящий владелец - https://vk.com/seregabrestsmir1 🐩

1.6 [🐬] < попытка помешать играть человеку, к примеру выгнать его из беседы (исключить) просто так, карается баном создателя и аннулированию привилегии.

1.7 [🕷] < мат в репорт - варн 1 из 3.

1.8 [🦅] < если вы админ, даже не думайте пытаться хоть каким-то способом издеваться над людьми.

1.9 [🌊] < также если вы админ вы не должны выставлять свою личность как можно выше и решать за создателя, карается - снятием привилегии.

2.0 [🌐] < какие-то проблемы с ботом обращаться к системам, если бот не работает, больше вероятно какие-то решения проблем, поэтому не переживайте, слитие какой-то информации не правильной карается 2 варнами.

2.1 [🍄] < если вы решили пораздавать денег, то только конкурсом никак не больше, те люди которые раздают игровую валюту будут наказаны [(❗❗
❗ПОМНИТЕ ВЫ НЕСЁТЕ ОТВЕТСТВЕННОСТЬ ЗА ВАШ АККАУНТ, А НЕ АДМИНИСТРАЦИЯ❗❗❗])

2.2 [⛔] < если вы будете оскорблять бота, какой он плохой, принуждать не играть в бота - блокировка аккаунта.

2.3 [🚫] < RUB можно только купить, они за бесплатно не выдаются!!!!!

2.4 [💠] < нельзя администрации бота выходить в топ 1!!!!!⛔⛔⛔⛔⛔🚫

2.5 [💀] < любой буст аккаунта - запрещён.

2.6 [🗣]< ЗАПРЕЩЕНО ПИАРИТЬСЯ ЗА ЭТО БАН!!
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
СПИСОК ЭТИХ 👆 ПРАВИЛ, ОБЯЗАТЕЛЕН К ПРОЧТЕНИЮ, ЕСЛИ ВЫ НЕ ПРОЧИТАЛИ ПРАВИЛО И ЧТО-ТО ИЗ ЭТОГО НАРУШИЛИ, ТО ВАМ БАН, УДАЧИ!!!!`)	
});

cmd.hear(/^(?:Чаты|Беседы)/i, async (message, args, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
message.send(`ID чата: ${message.chatId}`)
message.send(`оффициальная б: ${message.chatId}`)
});

cmd.hear(/^(?:профиль|проф|прф|аккаунт)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
	var gun = (message.user.gun_name === false) ? "🔫 оружие Отсутствует" : `🔫 оружие: ${message.user.gun_name}`; 
	var ver = (message.user.verify == 0) ? "⛔Аккаунт не подтверждён!⛔" : "✅Аккаунт Подтверждён✅"
	var chistota = (message.user.chistota <= 30) ? "⛔От вас воняет" : "✅От вас не воняет"    
	var kanal = (message.user.kanal === false) ? "" : `🎬 Канал: ${message.user.name}`;
	var brak = (message.user.marriage.partner == false) ? "" : `😍 В браке с ${message.user.marriage.partner}`;
	let text = ``;

text += `${ver}\n`;
text += `🔎 ID: ${message.user.uid}\n`
text += `🏴‍☠ Место Жительства: ${perelets[message.user.perelet - 1].name}\n`;
if(message.user.clothes) text += `👘 Одежда: ${clothes[message.user.clothes - 1].name}\n`;
text += `🔥 ${message.user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Bronze").replace(/2/gi, "Silver").replace(/3/gi, "Gold").replace(/4/gi, "Diamond").replace(/5/gi, "Titan").replace(/6/gi, "Создатель")}\n`;
text += `💾 Ранг: ${message.user.rang} || [${message.user.msg}]\n`;
text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
text += `👑 Рейтинг: ${utils.sp(message.user.rating)} || [${utils.rn(message.user.rating)}]\n`;
text += `${kanal}\n`;
text += `${gun}\n`;
text += `${brak}\n`;
text += `🏋 Энергия: ${message.user.energy}\n`;
text += `🏆 Опыт: ${message.user.opit}\n`;
text += `⚠ Варнов: ${message.user.warn}\n`;
	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet || message.user.manic)
	{
		text += `\n🗝 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.car2) text += `⠀🚗 2 Машина: ${cars[message.user.car2 - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.home) text += `⠀🏡 Дом: ${homes[message.user.home - 1].name}\n`;
		if(message.user.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀${pets[message.user.misc.pet - 1].icon} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.misc.farm_count})\n`;
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
					await message.send(`@id${message.user.id} (${message.user.tag}), твой профиль:\n${text}`);
}
if(message.user.keyboard == true) {
	await message.send(`@id${message.user.id} (${message.user.tag}), твой профиль:\n${text}`, 
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

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] > 300000000000) return bot(`максимальная сумма снятия 300.000.000.000$`);

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
	message.user.soobshenie += 1
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;
	if(message.args[1] <= 50) return bot(`минимальная сумма вклада 50$`);
	if(message.args[1] > 300000000000) return bot(`максимальная сумма вклада 300.000.000.000$`);
	if(message.user.bank > 300000000000) return bot(`максимально в банке может быть 300.000.000.000$`);

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:кредит)\s?([0-9]+)?$/i, async (message, args, bot) => {
	message.user.soobshenie += 1
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
	
 	cmd.hear(/^(?:погасить)\s?([0-9]+)?$/i, async (message, args, bot) => {
 		message.user.soobshenie += 1
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

cmd.hear(/^(?:Биз помощь|Бизнес помощь|bizhelp)\s?([0-9]+)?$/i, async (message, bot) => {
	return message.send(`📙 Помощь по бизнесам:
	📗 Бизнесы - список бизнесов
	📗 Бизнес [1-2] - Посмотреть статистику бизнесов
	📗 Бизнес улучшить - улучшить бизнес
	📗 Бизнес нанять [1-2] [Количество] 
	📗 Бизнес снять [1 или 2] [количество] - Снять доход
	📗 Бизнес продать - продать бизнес`)
});
	
	cmd.hear(/^(?:block)$/i, async (message, bot) => {
 if(message.user.right < 4) return;
 	let text = '';
 	text += `~~ Users в бане ~~\n`;
 	 for(let id in iban) {
        	 text += `https://vk.com/id${message.user.id} \n`;
        }
    return message.send(text);
});




cmd.hear(/^(?:кпринять)\s?([0-9]+)?$/i, async (message, args) => {
	 let user = users.find(x=> x.uid === Number(message.args[1]));
        	if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Введите ID пользователя.`);
		if(!message.user.clanid) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Вы не состоите в клане`);
		let clanid = message.user.clanid;
             let id = Number(message.args[1]);
		if(clans[clanid].people >= 30) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Максимальное кол-во участников в клане: 30`);
			
		if(!clans[clanid].invites[id]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Этот человек не подавал заявку на вступление.`);
		if(clans[clanid].users[message.user.uid].level === 0) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Принимать в клан может только глава клана и зам.клана`);
		if(users[id].clanid) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Данный человек уже вступил в клан`);
		if(users[id].balance < clans[clanid].price) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ У пользователя не хватает денег`);
		users[id].balance -= clans[clanid].price;
		clans[clanid].balance += clans[clanid].price;
		users[id].clanid = message.user.clanid;
		if(!clans[clanid].users[id])
		clans[clanid].users[id] = { 
              tag: `${users[id].tag}`,
              level: 0
             };
		 vk.api.call('messages.send', { 
               user_id: users[id].id, 
               message: `[😎] » @id${message.user.id} (${message.user.tag}), принял вас в клан [${clans[clanid].name}], команды клана "Кпомощь"` 
 }); 
            delete clans[clanid].invites[id];
		return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ @id${users[id].id}(${users[id].tag}) был(а) принят(а) в клан по заявке.`);
	});
	
	cmd.hear(/^(?:заявки)$/i, async (message, args) => {
		let user = message.user;
		if (!user.clanid) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Вы не состоите в клане`);
		let id = message.user.clanid;
		let text = `🔥 Заявки на вступление 🔥\n`;
		if (clans[id].users[message.user.uid].level === 0) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Заявки может просматривать только Глава клана и Зам.клана`);
		for(ids in clans[id].invites){
			text += `ID: ${ids} | @id${ids}(${users[ids].tag}) - ждет одобрения\n`;
		}
		return message.send(text);
	});


/*cmd.hear(/^(?:Кзаявка|Заявка)\s?([0-9]+)?/i, async (message, args) => {
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Введите ID клана.`);
		let user = message.user;
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Вы уже в клане.`);
		if(!clans[id]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Данного клана не существует.`);
		if(!clans[id].open) {
			if(clans[id].people >= 30) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Максимальное кол-во участников в клане: 30`);*/

cmd.hear(/^(?:Кзаявка|Заявка)\s?([0-9]+)?/i, async (message, args) => {
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Введите ID клана.`);
		let user = message.user;
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Вы уже в клане.`);
		if(!clans[id]) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Данного клана не существует.`);
			if(clans[id].people >= 30) return message.send(`🎉 ➣ @id${message.user.id}(${message.user.tag}),\n✨ ➣ Максимальное кол-во участников в клане: 30`);
			if(!clans[id].invites)
				clans[id].invites = {}
				
			if(!clans[id].invites[message.user.uid])
				clans[id].invites[message.user.uid] = { i: true };

        return message.send(`[😎] » Вы отправили заявку на вступление в клан`);
	});

cmd.hear(/^(?:покинуть)$/i, async (message, bot) => {
	
	let user = message.user;
	let idclan = message.user.clanid;
	if(!clans[idclan]) return message.send(`Вы не в клане.`); 
    
	if(message.user.clanid == false) return message.send(`Вы не состоите в клане.`); 
	if(clans[idclan].users[message.user.uid].level == 2) return message.send(`Создатель не может выйти из клана.`);
	user.clanid = false;
	delete clans[idclan].users[message.user.uid];
    return message.send(`Вы добровольно покинули клан.`);
});


cmd.hear(/^(?:Коткрыть)$/i, async (message, bot) => {
	
	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`); 
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
    if(clans[clanid].open == true) return message.send(`Клан уже открытый.`)
    clans[clanid].open = 1;
	return message.send(`Вы открыли клан. Цена за вход: ${clans[clanid].price}$`);
});


cmd.hear(/^(?:Кзакрыть)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
    if(clans[clanid].open == false) return message.send(`Клан уже закрытый.`)
    clans[clanid].open = 0;
	return message.send(`Вы закрыли клан. Набор участников могут проводить только зам/создатель :3`);
});


cmd.hear(/^(?:Квход)\s([0-9]+)$/i, async (message, bot) => {

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


cmd.hear(/^(?:Вступить)\s([0-9]+)$/i, async (message, bot) => {

    let user = message.user;
	let idclan = message.args[1]; 
	if(message.user.clanid != false) return message.send(`Вы уже состоите в клане.`);
	if(!message.args[1]) return message.send(`Вы не указали ID клана.`);
	 
	 
	if(!clans[idclan]) return message.send(`Данного клана не существует.`);
	if(clans[idclan].open == 0) return message.send(`Данный клан закрыт. В него нельзя войти. Подайте заявку "Заявка ${message.args[1]}" `);
	if(clans[idclan].open == 1){
		if(message.user.balance < clans[idclan].price) return message.send(`Вход в данный клан стоит: ${utils.sp(clans[idclan].price)} Coins`);
		message.user.balance -= Number(clans[idclan].price);
		clans[idclan].price += clans[idclan].price;
		message.user.clanid = Number(message.args[1]);
		if(!clans[idclan].users[message.user]){
        	        	clans[idclan].users[message.user.uid] = {
        	        	tag: `${message.user.tag}`,
                           id: message.user.id,	
                           level: 0
       	        	}
        }
        return message.send(`Вы вошли в клан за ${utils.sp(clans[idclan].price)} Coins \n\n Команды клана - Кпомощь`, {attachment: 'photo512809754_456239056'});
	}
});


cmd.hear(/^(?:Кназвание)\s([^]+)$/i, async (message, bot) => {
 	if(!message.args[1]) return message.send(`⚠ »  Укажите название для клана.`);
             let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(🥃|👨‍|🚀️|👩⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|👷|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍💻️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️|👨‍🚒️|👩✈️|👨‍✈️|👩‍🚀️|👨‍🚀️|👩⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|??|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.reply(`☒ -> Отказ смены названия!

    	⚠ >> Причина:
    	Прости, но нельзя использовать символы и маты при смене названия клана.`);
} 	
                  let clanid = message.user.clanid;
			if(!clans[clanid]) return message.send(`У вас нет клана.`);
			if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Вы не создатель  клана.`);
		      if(clans[clanid].balance < 10000) return message.send(`На балансе клана нету 10.000 Coins `);
		   	clans[clanid].balance -= 10000;

			if(clans[clanid]){
				if(message.user.uid != clans[clanid].owner) return message.send(`Изменить название клана может только Создатель!`);
				if(message.user.uid == clans[clanid].owner){
					clans[clanid].name = message.args[1];
					return message.send(`Вы успешно изменили название клана за 10.000 Коинов!`);
				}
			}
});

cmd.hear(/^(?:Клого)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 1) return message.send(`Вы не создатель/заместитель клана.`);
    if(clans[clanid].balance < 10000) return message.send(`На балансе клана нету 10.000 Коинов`);
    clans[clanid].balance -= 10000;

	if(clans[clanid]){
			let smile = [`📺`,`💥`,`💣`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌈`,`🌝`].random(); 
			clans[clanid].smile = smile;
			return message.send(`Вы успешно изменили логотип клана за 10.000 Коинов!`);
	}
});

 
cmd.hear(/^(?:Клан)$/i, async (message, bot) => {

let user = message.user;
	let clanid = message.user.clanid;
if(!clans[clanid]) return message.reply(`У вас нет клана.`);

let text = ``;
let tipe = ``;
text += `[🏆] | Участники Клана: \n\n`;

text += `[${clans[clanid].smile}] >> [id${users[clans[clanid].owner].id}|${users[clans[clanid].owner].tag}] | Создатель.\n\n`;
 	for(let id in clans[clanid].users) {
             let people = clans[clanid].users[id];   
        	 if(clans[clanid].users[id].level == 1) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id].id}|${people.tag}] | Заместитель.\n\n`;
        	 if(clans[clanid].users[id].level == 0) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id].id}|${people.tag}] | Участник.\n`;
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


	return message.reply(`
		[${clans[clanid].smile}]: ~ ${clans[clanid].name} ~ :[${clans[clanid].smile}]

 		[${clans[clanid].smile}] »  Создатель: [id${users[clans[clanid].owner].id}|${users[clans[clanid].owner].tag}]
 		[${clans[clanid].smile}] »  Номер клана: ${clans[clanid].number}
 		[${clans[clanid].smile}] »  Логотип клана: ${clans[clanid].smile} 
 		[${clans[clanid].smile}] »  Тип клана: ${tipe}
 		[${clans[clanid].smile}] »  Цена за вход: ${clans[clanid].price} Coins
        [💰] »  На балансе клана: ${clans[clanid].balance} Coins

        [🔥] »  Баланс клана: ${clans[clanid].balance}

 		${text}
		`);
	} 
});

cmd.hear(/^(?:Кработать)$/i, async (message, bot) => {
   	let clanid = message.user.clanid;
 if(message.user.kwork) return message.send(`[⛔] » Вы уже работали подождите 10 минут и снова за работу`);
if(clanid == false) return bot(`у вас нет клана.`);
if(!clans[clanid]) return bot(`у вас нет клана.`);
if(clans[clanid].users[message.user.uid].level == 0){
       const count = rand(10000,70000);

      clans[clanid].balance += count;

setTimeout(() => {
		message.user.kwork = false;
	}, 600000);

	message.user.kwork = true;

    return message.send(`[😎] » [id${message.user.id}|${message.user.tag}], Вы отработали на клан ${utils.sp(count)} [${utils.rn(count)}]`);
}
if(clans[clanid].users[message.user.uid].level == 1){
       const count = rand(40000,80000);

      clans[clanid].balance += count;

setTimeout(() => {
		message.user.kwork = false;
	}, 600000);

	message.user.kwork = true;

     return message.send(`[😎] » [id${message.user.id}|${message.user.tag}], Вы отработали на клан ${utils.sp(count)} [${utils.rn(count)}]`);
}
if(clans[clanid].users[message.user.uid].level == 2){
   const count = rand(100000,700000);

      clans[clanid].balance += count;
 
setTimeout(() => {
		message.user.kwork = false;
	}, 600000);

	message.user.kwork = true;

   return message.send(`[😎] » [id${message.user.id}|${message.user.tag}], Вы отработали на клан ${utils.sp(count)} [${utils.rn(count)}]`);
}
});

cmd.hear(/^(?:Кпомощь)$/i, async (message, bot) => {

	let user = message.user;
 	let clanid = message.user.clanid;
 	if(!clans[clanid]) return message.send(`У вас нет клана.`);

if(clans[clanid].users[message.user.uid].level < 1){
	return message.send(`
		${clans[clanid].smile} - Команды клана -  ${clans[clanid].smile}
		${clans[clanid].smile} Клан - Информация о вашем клане.
		${clans[clanid].smile} КПоложить <сумма> - положить Coins в банк клана.
		${clans[clanid].smile} Кбанк - баланс клана.
             ${clans[clanid].smile} КРаботать - Отработать на ваш клан.

		${clans[clanid].smile} Покинуть - Выйти из клана
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
             ${clans[clanid].smile} КРаботать - Отработать на ваш клан.


		${clans[clanid].smile} Покинуть - Выйти из клана 
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
             ${clans[clanid].smile} Принять [ид] - Сменить логотип клана.
             ${clans[clanid].smile} Заявки - Список заявок.

		${clans[clanid].smile} КОткрыть - Открыть клан.
		${clans[clanid].smile} Квход - Установить цену за вход.
		${clans[clanid].smile} КЗакрыть - Закрыть клан.

		${clans[clanid].smile} КПоложить <сумма> - положить Coins в банк клана.
		${clans[clanid].smile} КСнять <сумма> - снять Coins из банка клана.
		${clans[clanid].smile} КБанк - баланс клана.

		${clans[clanid].smile} Clanwar [id клана] [сумма] - Атаковать клан!
		`);
}
});

cmd.hear(/^(?:Кбанк)$/i, async (message, bot) => {

	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	return message.send(`Баланс Вашего клана: ${utils.sp(clans[clanid].balance)} Coins`);

});



cmd.hear(/^(?:Кположить)\s([0-9]+)$/i, async (message, args, bot) => {
     if(!message.args[1]) return message.send(`Укажите сумму вклада.`);
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
      if(message.args[1] > 10000000000) return message.send(`[⛔] » Максимальная сумма вклада ${utils.sp(10000000000)} [${utils.rn(10000000000)}]`);
	message.user.balance -= Number(parserInt(message.args[1]));
	clans[clanid].balance += Number(parserInt(message.args[1]));
	return message.send(`Вы успешно положили ${utils.sp(message.args[1])} Coins в банк клана.`);
});


cmd.hear(/^(?:Кснять)\s([0-9]+)$/i, async (message, args, bot) => {
   if(!message.args[1]) return message.send(`Укажите сумму снятия.`);
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.send(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.send(`Снимать деньги может только создатель клана.`);
    
	if(message.args[1] > clans[clanid].balance) return message.send(`Данной суммы нет в банке клана.`);
	if(message.args[1] <= 0) return message.send(`Сумма не должна быть меньше или равно 0 Coins`);
	message.user.balance += Number(parserInt(message.args[1]));
	clans[clanid].balance -= Number(parserInt(message.args[1]));
	return message.send(`[${clans[clanid].smile}] »  Вы успешно сняли ${utils.sp(message.args[1])} Coins с банка клана.`);
});

cmd.hear(/^(?:clanwar)\s([0-9]+)\s([^\s	].*)$/i, async (message, bot) => {
	 var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
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
	if(message.user.clanwar) return bot(`в ближайшие 10 минут, Вы сможете ещё раз атаковать клан!`);

	setTimeout(() => {
		message.user.clanwar = false;
	}, 600000);

	message.user.clanwar = true;
}

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += amount;
			clans[clanid].balance -= amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан [${clans[clanid].name}] напал на [${clans[id].name}]\n[🏆] >> Победу одержал клан: [${clans[id].name}]\n💰 >> Выигрыш: ${utils.sp(amount)} 💰`);
		}else{
			clans[id].balance -= amount;
			clans[clanid].balance += amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан [${clans[clanid].name}] напал на [${clans[id].name}]\n[🏆] >> Победу одержал клан: [${clans[clanid].name}]\n💰 >> Выигрыш: ${utils.sp(amount)} 💰`);
		}
	});	

cmd.hear(/^(?:Кмодер)\s([0-9]+)$/i, async (message, bot) => {
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


cmd.hear(/^(?:Кудалить)\s([0-9]+)$/i, async (message, bot) => {
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

cmd.hear(/^(?:улучшить)$/i, async (message, bot) => {
	if(message.user.balance < 100000000)
		return bot(`улучшение вашего героя стоит 100000000$`)
	if(message.user.hp += 10);
	if(message.user.zashita += 10);
	if(message.user.ataka += 10);
	return bot(`Характеристики повышены на 10🌟`);
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

cmd.hear(/^(?:гонять|гонка|гонки)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.transport.car < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет машины! 🙄`); 
	if(message.user.timers.gonka) return bot(`вы сможете гонять через 5 минут 😔`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
	const ratings = utils.random(1000,20000);
	const moneys = utils.random(1000000000,150000000000);

	if(prize === 1)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 2)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 3)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 4)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 5)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 6)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 7)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 8)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 9)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.balance += moneys;
		return bot(`вы выиграли ${utils.sp(moneys)}$ за гонку 🤑`);
	}

	if(prize === 10)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 11)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 12)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 13)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 14)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 15)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 16)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 17)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		message.user.rating += ratings;
		return bot(`вы выиграли ${utils.sp(ratings)} рейтинга за гонку 👑`);
	}

	if(prize === 18)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		return bot(`вы ничего не выиграли в гонке 😒`);
	}

	if(prize === 19)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		return bot(`вы ничего не выиграли в гонке 😒`);
	}

	if(prize === 20)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		return bot(`вы ничего не выиграли в гонке 😒`);
	}

	if(prize === 21)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		return bot(`вы ничего не выиграли в гонке 😒`);
	}

	if(prize === 22)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		const sell = cars.find(x=> x.id === 32);
		if(!sell) return;
		message.user.transport.car= 32;
		return bot(`вы выиграли «BMW M5» в гонке 😱`);
	}

	if(prize === 23)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		const sell = cars.find(x=> x.id === 33);
		if(!sell) return;
		message.user.transport.car= 33;
		return bot(`вы выиграли «Mercedes-AMG G 63» в гонке 😱`);
	}

	if(prize === 24)
	{
		setTimeout(() => {
		message.user.timers.gonka = false;
		}, 300000);

		message.user.timers.gonka = true;
		const sell = cars.find(x=> x.id === 34);
		if(!sell) return;
		message.user.transport.car= 34;
		return bot(`вы выиграли «Mercedes E63» в гонке 😱`);
	}
});

cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.timers.hack === true) return bot(`вы сможете взломать через 5 минут 😔`);

let situac = utils.random(1,2);

if(situac === 1)
{

let hackcash = utils.random(156781,451981);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`);

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
setTimeout(() => {
	message.user.timers.hack = false;
}, 300000);

message.user.timers.hack = true;
return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. ✅ Вы заработали ${utils.sp(hackcash)}$`);

}

});

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: «копать железо/золото/алмазы/материю» 😔`);

});

cmd.hear(/^(?:копать железо)$/i, async (message, bot) => { 

	setTimeout(() => {
	message.user.energy = 10;
}, 300000);


if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 1;
message.user.iron += randzhelezo;

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

return bot(`+${randzhelezo} железа.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать золото)$/i, async (message, bot) => { 
	setTimeout(() => {
	message.user.energy = 10;
}, 300000);


if(message.user.opit < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);

message.user.energy -= 1;
message.user.opit += 5;
message.user.gold += randzoloto;

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {


return bot(`+${randzoloto} золота.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать алмазы)$/i, async (message, bot) => { 
	setTimeout(() => {
	message.user.energy = 10;
}, 300000);


if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(3, 26);

message.user.energy -= 1;
message.user.opit += 10;
message.user.diamond += randalmaz;

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {



return bot(`+${randalmaz} алмазов.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать материю)$/i, async (message, bot) => { 
	setTimeout(() => {
	message.user.energy = 10;
}, 300000);


if(message.user.opit < 100000) return bot(`что бы копать материю нужно больше 100 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randmatter = utils.random(3, 13);

message.user.energy -= 1;
message.user.opit += 20;
message.user.matter += randmatter;

if(message.user.energy > 0) return bot(`+${randmatter} материи.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {



return bot(`+${randmatter} материи.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.iron)} железа. ⚙`);

});

cmd.hear(/^(?:опыт)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.opit)} опыта. 🏆`);

});

cmd.hear(/^(?:алмазы)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.diamond)} алмазов. 💎`);

});

cmd.hear(/^(?:материя)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.matter)} материи. 🌌`);

});

cmd.hear(/^(?:золото)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.gold)} золота. 🏵`);

});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.balance)}$ 💸`;

	if(message.user.bank) text += `\n💳 В банке ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n💽 Биткоинов ${utils.sp(message.user.btc)}฿`;
	if(message.user.ltc) text += `\n🧿 Лайткоинов ${utils.sp(message.user.ltc)} LTC`;
	if(message.user.iron) text += `\n⚙ ${message.user.iron} железа`;
	if(message.user.gold) text += `\n🏵 ${message.user.gold} золота`;
	if(message.user.diamond) text += `\n💎 ${message.user.diamond} алмазов`;
	if(message.user.matter) text += `\n🌌 ${message.user.matter} материи`;
	if(message.user.rub) text += `\n💰 ${message.user.rub} рублей`;

	return bot(text);
});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
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

	cmd.hear(/^(?:cc)\s?([^]+)?/i,  message => {

		   let cc = message.args[1].toLowerCase();
	 
	       let text = message.args[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	           message.send("😜 ➾ Короткая ссылка: " + res.short_url);
	     });
	  
	   });

cmd.hear(/^(?:кинуть)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1
     var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
    if(!message.args[1]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  кинуть ставка 1/2`);
    let user = message.user;
    if(parserInt(message.args[1]) > message.user.balance || parserInt(message.args[1]) <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   	
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == '1'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вы попали точно в '1' цель! \n\n[^_^] » Вы выиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == '2'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вы попали во '1' цель \n\n[-_-] » Вы проиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == '1'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вы попали во '2' цель \n\n[-_-] » Вы проиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == '2'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вы попали во '2' цель! \n\n[^_^] » Вы выиграли: ${utils.sp(message.args[1])}$\n[$] » Баланс: ${utils.sp(user.balance)}`);
    		}
   		 }
	return message.reply(`[Подсказка] » кинуть [ставка] [1/2]`);
});

// ДОБАВЬТЕ ПЕРЕМЕННЫЕ lic1, lic2, lic3, lic4 с значением false
cmd.hear(/^(?:лицензии|лицензия)\s?([1-4])?/i, async (message) => {
if(!message.args[1]) {
return message.send(`📖 Лицензии
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'}
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'}
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'}
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}

Для покупки лицензии используй: лицензии [1-4]`)
} else if(message.args[1] && message.args[1] == 1) {
if(message.user.balance < 30000) return bot(`Для покупки лицензии для вождения нужно 30.000$`)
if(message.user.lic1) return message.send('Вы уже имеете данную лицензию!');
message.user.lic1 = true
message.user.balance -= 30000
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'}
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'}
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'}
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`)
} else if(message.args[1] && message.args[1] == 2) {
if(message.user.balance < 70000) return bot(`Для покупки лицензии для яхты нужно 70.000$`)
if(message.user.lic2) return message.send('Вы уже имеете данную лицензию!');
message.user.lic2 = true
message.user.balance -= 70000
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'}
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'}
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'}
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`)
} else if(message.args[1] && message.args[1] == 3) {
if(message.user.balance < 100000) return bot(`Для покупки лицензии на самолёт нужно 100.000$`)
if(message.user.lic3) return message.send('Вы уже имеете данную лицензию!');
message.user.lic3 = true
message.user.balance -= 100000
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'}
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'}
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'}
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`)
} else if(message.args[1] && message.args[1] == 4) {
if(message.user.balance < 200000) return bot(`Для покупки лицензии для вождения нужно 200.000$`)
if(message.user.lic4) return message.send('Вы уже имеете данную лицензию!');
message.user.lic4 = true
message.user.balance -= 200000
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'}
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'}
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'}
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`)
}
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
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

cmd.hear(/^(?:использовать|пожрать|поесть|жрать|кушать)$/i, async (message, bot) => {
	message.user.soobshenie += 1
    if(!message.user.eda) return bot(`у вас нет еды`);
	let a = Math.floor(eda[message.user.eda - 1].cost * 0.85);

	message.user.golod += Math.floor(eda[message.user.eda - 1].cost * 0.85);
	message.user.eda = 0;

	return bot(`вы поели и +${utils.sp(a)} к сытости`);
});

cmd.hear(/^(?:Гараж купить|Купить гараж)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.balance < 100000) return bot(`❌ Упс... Ошибка! У вас не хватает денег! Гараж стоит 100.000`)
	if(message.user.garage == true) return bot(`❌ Упс... Ошибка! У вас уже есть гараж`);
message.user.garage = true
message.user.balance -= 100000
return bot(`✅Вы успешно купили гараж! Теперь вам доступна команда: Гараж, и вы можете купить машину.`)

});



cmd.hear(/^(?:Гараж|🏢Гараж)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.garage == false) return bot(`❌ Упс... Ошибка! У вас нету гаража, чтобы его купить введите: Купить гараж/гараж купить`)


		let text = ``; 
				  	
        text += `🚗Машины:\n\n`;

        if(message.user.transport.car == 0)  text += `У вас нету машины в 1 слоту😪\n`
		
		if(message.user.transport.car) text += `     🚗 1 Слот Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.car2) text += `     🚗 2 Слот Машина: ${cars[message.user.car2 - 1].name}\n`;
	    if(message.user.car2 == 0)  text += `У вас нету машины во 2 слоту😪\n`

	    text += `\n\n✈ Самолёты:\n\n`;

	if(message.user.transport.airplane == 0)  text += `У вас нету самолётов😪\n`

        if(message.user.transport.airplane) text += `✈ Самолёт: ${airplanes[message.user.transport.airplane - 1].name}`;

     text += `\n\n🚁 Вертолёты:\n\n`;

     if(message.user.transport.helicopter == 0)   text += `У вас нету вертолётов😪\n`

        if(message.user.transport.helicopter) text += `🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}`;

     text += `\n\n⛴ Яхты:\n\n`;

     if(message.user.transport.yacht == 0)   text += `У вас нету Яхт😪\n`

        if(message.user.transport.yacht) text += `⛴ Яхта: ${yachts[message.user.transport.yacht - 1].name}`;

	  await message.send(`@id${message.user.id} (${message.user.tag}), 🏢Ваш Гараж:\n${text}`, {
	  					  		attachment: `photo-190506705_457239139`
	  					  	});



});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
	let zaprets1 = message.args[1].toLowerCase();
		var zapret = /(вк бо т |&|#|₴|&#₴|сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
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
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`Теперь ваш ник: "${message.user.tag}"`);
			});


cmd.hear(/^(?:бот)$/i, async (message, bot) =>{
	message.user.msgbalance += 1;
    return bot(`[📖] » Привет! Я игровой бот - [FB]!
 
📝 » Проект: Fox-BOT
💻 » Версия: 2.0
👑 » Владелец: [seregabrestsmir1|Сергей Московский]
📥 » Обработано команд: ${botinfo.msg}  
💎 » Казна FB_BOT: ${botinfo.kazna}
💽 » Пользователей: ${users.length}
📜 » Группа: [foxbot12|Fox Bot]
♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}
		
`);

});


 
function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}




cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	message.user.msgbalance += 1;
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

	if(/компьютер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.compukter) return bot(`у вас нет компьютера`);
		let a = Math.floor(comp[message.user.compukter - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.compukter - 1].cost * 0.85);
		message.user.compukter = 0;

		return bot(`вы продали свой компьютер за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/материнк/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.materinka) return bot(`у вас нет материнской платы`);
		let a = Math.floor(materinka[message.user.materinka - 1].cost * 0.85);

		message.user.balance += Math.floor(materinka[message.user.materinka - 1].cost * 0.85);
		message.user.materinka = 0;

		return bot(`вы продали свою материнскую плату за ${utils.sp(a)}$`);
	}

	if(/процессор/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.processor) return bot(`у вас нет процессора`);
		let a = Math.floor(processor[message.user.processor - 1].cost * 0.85);

		message.user.balance += Math.floor(processor[message.user.processor - 1].cost * 0.85);
		message.user.processor = 0;

		return bot(`вы продали свой процессор за ${utils.sp(a)}$`);
	}

	if(/оперативк/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.ozuu) return bot(`у вас нет оперативной памяти`);
		let a = Math.floor(ozu[message.user.ozuu - 1].cost * 0.85);

		message.user.balance += Math.floor(ozu[message.user.ozuu - 1].cost * 0.85);
		message.user.ozuu = 0;

		return bot(`вы продали свою оперативную память за ${utils.sp(a)}$`);
	}

	if(/видеокарт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.videokarta) return bot(`у вас нет видеокарты`);
		let a = Math.floor(videokarts[message.user.videokarta - 1].cost * 0.85);

		message.user.balance += Math.floor(videokarts[message.user.videokarta - 1].cost * 0.85);
		message.user.videokarta = 0;

		return bot(`вы продали свою видеокарту за ${utils.sp(a)}$`);
	}

	if(/здание/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.zdanie) return bot(`у вас нет здания`);
		let a = Math.floor(zdanie[message.user.zdanie - 1].cost * 0.85);

		message.user.balance += Math.floor(zdanie[message.user.zdanie - 1].cost * 0.85);
		message.user.zdanie = 0;
		message.user.stroizd = 0;
		message.user.zdstroi = 0;

		return bot(`вы продали свое здание за ${utils.sp(a)}$`);
	}

	if(/БП/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.bp) return bot(`у вас нет блока питания`);
		let a = Math.floor(ozu[message.user.ozuu - 1].cost * 0.85);

		message.user.balance += Math.floor(blokpc[message.user.bp - 1].cost * 0.85);
		message.user.bp = 0;

		return bot(`вы продали свой блок питания за ${utils.sp(a)}$`);
	}

	if(/Принтер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.printer) return bot(`у вас нет принтера`);
		let a = Math.floor(printers[message.user.printer - 1].cost * 0.85);

		const printer = message.user.printer;

		message.user.balance += Math.floor(printers[message.user.printer - 1].cost * 0.85);
		message.user.printer = 0;

		return bot(`вы продали свой принтер за ${utils.sp(a)}$`);
	}

	if(/корпус/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.corpuspc) return bot(`у вас нет корпуса`);
		let a = Math.floor(corpus[message.user.corpuspc - 1].cost * 0.85);

		message.user.balance += Math.floor(corpus[message.user.corpuspc - 1].cost * 0.85);
		message.user.corpuspc = 0;
		message.user.korpus = false;

		return bot(`вы продали свой корпус за ${utils.sp(a)}$`);
	}

	if(/HDD/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.hddd) return bot(`у вас нет жесткого диска`);
		let a = Math.floor(hdd[message.user.hddd - 1].cost * 0.85);

		message.user.balance += Math.floor(hdd[message.user.hddd - 1].cost * 0.85);
		message.user.hddd = 0;

		return bot(`вы продали свой жесткий диск за ${utils.sp(a)}$`);
	}

	if(/монитор/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.monitor) return bot(`у вас нет монитора`);
		let a = Math.floor(monitor[message.user.monitor - 1].cost * 0.85);

		message.user.balance += Math.floor(monitor[message.user.monitor - 1].cost * 0.85);
		message.user.monitor = 0;

		return bot(`вы продали свой монитор за ${utils.sp(a)}$`);
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
		if(!message.user.home) return bot(`у вас нет дома`);
		let a = Math.floor(homes[message.user.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.home - 1].cost * 0.85);
		message.user.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$`);
	}

	if(/одежд(у|а|ы|е)/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.clothes) return bot(`у вас нет одежды`);
		let a = Math.floor(clothes[message.user.clothes - 1].cost * 0.85);

		message.user.balance += Math.floor(clothes[message.user.clothes - 1].cost * 0.85);
		message.user.clothes = 0;

		return bot(`вы продали свою одежду за ${utils.sp(a)}$`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.apartment) return bot(`у вас нет квартиры`);
		let a = Math.floor(apartments[message.user.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.apartment - 1].cost * 0.85);
		message.user.apartment = 0;

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
		if(!message.user.business) return bot(`у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$`);
	}

	if(/питомца/i.test(message.args[1].toLowerCase()))
{
if(!message.user.pets.pet) return bot(`у вас нет питомца`);
let a = Math.floor(pets[message.user.pets.pet - 1].cost * 0.85);

message.user.balance += Math.floor(pets[message.user.pets.pet - 1].cost * 0.85);
message.user.pets.pet = 0;

return bot(`вы продали своего питомца за ${utils.sp(a)}$`);
}

	if(/уголь/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.coal) return bot(`недостаточно угля`);
		const coals = utils.random(500);

		message.user.balance += coals;
		message.user.coal -= options.count;

		return bot(`вы продали ${options.count} угль за ${utils.sp(coals)}$`);
	}

	if(/железо/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.iron) return bot(`недостаточно железа`);
		let a = Math.floor(options.count * 15000);

		message.user.balance += Math.floor(options.count * 15000);
		message.user.iron -= options.count;

		return bot(`вы продали ${options.count} железа за ${utils.sp(a)}$ ✅`);
	}

	if(/золото/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.gold) return bot(`недостаточно золота`);
		let a = Math.floor(options.count * 1250000);

		message.user.balance += Math.floor(options.count * 1250000);
		message.user.gold -= options.count;

		return bot(`вы продали ${options.count} золота за ${utils.sp(a)}$ ✅`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.diamond) return bot(`недостаточно алмазов`);
		let a = Math.floor(options.count * 450000000);

		message.user.balance += Math.floor(options.count * 450000000);
		message.user.diamond -= options.count;

		return bot(`вы продали ${options.count} алмазов за ${utils.sp(a)}$ ✅`);
	}

	if(/матери/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.matter) return bot(`недостаточно материи`);
		let a = Math.floor(options.count * 10000000000);

		message.user.balance += Math.floor(options.count * 10000000000);
		message.user.matter -= options.count;

		return bot(`вы продали ${options.count} материи за ${utils.sp(a)}$ ✅`);
	}

	if(/изумруд/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.emeralds) return bot(`недостаточно эмеральда`);
		const emeralds = utils.random(10000);

		message.user.balance += emeralds;
		message.user.emeralds -= options.count;

		return bot(`вы продали ${options.count} эмеральд за ${utils.sp(emeralds)}$`);
	}

   if(/битко(й|и)н/i.test(message.args[1].toLowerCase()))
	{
		message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);
		if(options.count > message.user.btc) return bot(`Недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}


   if(/ла(й|и)тко(й|и)н/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.ltc) return bot(`Недостаточно лайткоинов`);
		let a = Math.floor(ltc * options.count);

		message.user.balance += Math.floor(a);
		message.user.ltc -= options.count;

		return bot(`вы продали ${options.count} LTC за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга`);
		let a = (150000000 * options.count);

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

	if(/Листья/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.lists) return bot(`недостаточно листьев💸`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.lists -= options.count;

		return bot(`вы продали ${options.count}листьев💸 за ${utils.sp(a)}$`);
	}

    if(/еду/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.eda) return bot(`у вас нет еды`);
		let a = Math.floor(eda[message.user.eda - 1].cost * 0.85);

		message.user.balance += Math.floor(eda[message.user.eda - 1].cost * 0.85);
		message.user.eda = 0;

		return bot(`вы продали 🍗Еду за ${utils.sp(a)} листьев`);
	}

	if(/руду/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.ruda) return bot(`недостаточно руды?`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.ruda -= options.count;

		return bot(`вы продали ${options.count}руды за ${utils.sp(a)}$`);
	}
});
//-------(Телефон Команды)---------\\

cmd.hear(/^(?:Телефон|telephone)$/i, async (message, bot) => {
	if(message.user.misc.phone < 1) return message.send(`[➖] У вас нету телефона, чтобы купить введите команду "Телефоны"`);
   return message.send(`🎊 @id${message.user.id} (${message.user.tag} меню телефона,
   1) Тинфо - посмотреть инфу о телефоне
   2) Купить номер - купить сим-карту
   4) Смс (ид) (сообщение)
   5) Рр - Руская рулетка(в разработке)
 `);
 });
 
 cmd.hear(/^(?:Тинфо|Тпомощь)$/i, async (message, bot) => { 
 let text = ``
   if(message.user.misc.phone < 1) return message.send(`📱У вас нет телефона`);
   if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
   text += `Оператор: ${message.user.operator.toString().replace(/0/gi, "Нету").replace(/1/gi, "Феникс").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}\n`;
   text += `📟 Номер: ${message.user.number}\n`;
   text += `\n\nЧтобы выйти в меню телефона введите "Телефон"`;
  return message.send(`📱Ваш телефон:  \n${text}`);
});

cmd.hear(/^(?:Смс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => { 
		if(message.user.numberss == false) return bot(`доступно при номере телефона!.\nЧтобы приобрести номер, напишите: Купить номер`);

const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`такого игрока не существует. Вероятно, вы ошиблись.`); 

vk.api.messages.send({ user_id: user.id, message: `Вам пришло сообщение!` }); 

vk.api.messages.send({ user_id: user.id, message: `Сообщение открывается...` }); 

vk.api.messages.send({ user_id: user.id, message: `
<- &#4448;Administrator&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜${message.args[2]}❜` }); 

message.user.balance -= 134;
	return message.send(`Сообщение успешно отправлено! С вас списано - 134$`);
});


cmd.hear(/^(?:купить номер)$/i, async (message, bot) => {
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

cmd.hear(/^(?:написать|смс|sms)\s([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
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

cmd.hear(/^(?:Пища|Еда|продукты)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(!message.args[1]) return bot(`: 
${message.user.eda === 1 ? '❌ ' : '🍏'} 1. яблоко (1.000$)
${message.user.eda === 2 ? '❌ ' : '🍏'} 2. груша (2.000$)
${message.user.eda === 3 ? '❌ ' : '🍗'} 3. окорок (5.000$)
${message.user.eda === 4 ? '❌ ' : '🐷 '} 4. свинина (10.000$)
${message.user.eda === 5 ? '❌ ' : '🐃'} 5. говядина (15.000$)

Для покупки введите "Еда [номер]"`);

	const sell = eda.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.eda) return bot(`у вас уже есть 🍗Еда (${eda[message.user.eda - 1].name}), введите "Продать еду"`);

	if(message.user.lists < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.lists >= sell.cost)
	{
		message.user.lists -= sell.cost;
		message.user.eda = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.transport.car > 0) return bot(`Неа, Неа, Систему не обманешь! У вас уже есть машина в 1 слоту гаража!`)
	if(message.user.garage == false) return bot(`❌ Упс... Ошибка! Вы не можете купить машину так как нету гаража!`);
    if(message.user.lic1 == false) return bot(`Вы не можете купить машину если не имеете лицензию на вождение! Чтобы купить лицензию введите: "Лицензии"`)
	if(!message.args[1]) return bot(`Раздел машин:
 		
  🚜Старый автопром
  🚗Новый автопром
      `);
	
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

    	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)


	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		await bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		 return bot(`Если вам нужна 2 машина то введите: Машина 2 [Ид машины]`)
	}

});


cmd.hear(/^(?:машина 2)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.car2 > 0) return bot(`Вы уже имеете 2-ю машину! Если она вам не нужна или надо заменить можно её продать: Продать 2слот`);
if(message.user.garage == false) return bot(`❌ Упс... Ошибка! Вы не можете купить машину так как нету гаража!`);
if(message.user.garageslots == 1) return bot(`❌ Упс... Ошибка! У вас в гараже максимум 1 слот! Чтобы сделать 2 слота! Введите: Улучшить гараж`)
if(message.user.lic1 == false) return bot(`Вы не имеете лицензию на вождение для покупки машины! Чтобы купить лицензию введите: "Лицензии"`);
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)


	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car2 = sell.id;
        
		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		       bot(`Вы имеете полный гараж машин`)
	}
});



cmd.hear(/^(?:старый автопром|🚜Старый автопром)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`
🎒 1. Запорожец (100.000$)
🎒 2. ВАЗ 2104 (200.000$)
🎒 3. ВАЗ 2106 (250.000$)
🎒 4. ВАЗ 2107 (350.000$)
🎒 5. Нива  (500.000$)
🎒 6. Волга (600.000$)
🎒 7. УАЗИК (800.000$)

🛒 Для покупки введите "Машины [номер]"`);

                   
         

});

cmd.hear(/^(?:новый автопром|🚗Новый автопром)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`
🎒 8. Лада калина (1.000.000$)
🎒 9. Ford Focus (1.200.000$)
🎒 10. Huyndai Elantra (1.500.000$)
🎒 11. Volkswagen Tiguan TURBO (1.800.000$)
🎒 12. Lexus LC 500(2.500.000$)
🎒 13. Lexus ES 350 (3.200.000$)
🎒 14. Lamborghini Urus (5.000.000$)
🎒 15. Lamborghini Huracan (7.000.000$)
🎒 16. Lamborghini Aventador (9.000.000$)
🎒 17. Bugatti Veyron (12.000.000$)
🎒 18. Bugatti Chiron (15.000.000$)
🎒 19. Bugatti Divo (17.000.000$)
🎒 20. Tesla Cybertruck (23.000.000$)

🛒 Для покупки введите "Машины [номер]"`);

});

cmd.hear(/^(?:улучшить гараж|гараж улучшить|)?$/i, async (message, bot) => {
if(message.user.garageslots == 2) return bot(`Ваш гараж уже улучшен!`);
if(message.user.garage == false) return bot(`Вы не имеете гаража чтобы его улучшить`);
if(message.user.balance < 100000) return bot(`Вы не можете улучшить гараж! Для улучшения нужно: 100000$`);
return bot(`Вы успешно улучшили свой гараж. Теперь вы можете иметь 2 машины!`)
message.user.balance -= 100000;
message.user.garageslots = 2;
});


cmd.hear(/^(?:пк|мой пк|ПК БОГА)\s?([0-9]+)?$/i, async (message, bot) => {
	let text = ``;


	if(message.user.corpuspc == 0) text += `🖥 У вас нет корпуса\n`
	if(message.user.materinka == 0) text += `🖥 У вас нет материнской платы\n`
	if(message.user.processor == 0) text += `🖥 У вас нет процессора\n`
	if(message.user.videokarta == 0) text += `🖥 У вас нет видеокарты\n`
	if(message.user.bp == 0) text += `🖥 У вас нет Блока Питания\n`
	if(message.user.ozuu == 0) text += `🖥 У вас нет оперативной памяти\n`
	if(message.user.hddd == 0) text += `🖥 У вас нету Жесткого диска\n`
	if(message.user.monitor == 0) text += `🖥 У вас нету монитора\n`

	if(message.user.corpuspc) text += `💻 Корпус: ${corpus[message.user.corpuspc - 1].name}\n`
	if(message.user.materinka) text += `💻 Материнская плата: ${materinka[message.user.materinka - 1].name}\n`
	if(message.user.processor) text += `💻 Процессор: ${processor[message.user.processor - 1].name}\n`
	if(message.user.videokarta) text += `💻 Видеокарта: ${videokarts[message.user.videokarta - 1].name}\n`
	if(message.user.bp) text += `💻 Блок питания: ${blokpc[message.user.bp - 1].name}\n`
	if(message.user.ozuu) text += `💻 Оперативная память: ${ozu[message.user.ozuu - 1].name}\n`
	if(message.user.hddd) text += `💻 Жесткий диск: ${hdd[message.user.hddd - 1].name}\n`
	if(message.user.monitor) text += `💻 Монитор: ${monitor[message.user.monitor - 1].name}\n`


	return message.send(`@id${message.user.id} (${message.user.tag}), 💻Ваш ПК:\n${text}`);
});

cmd.hear(/^(?:корпуса|корпусы|корпус)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Корпусы для ПК:
🖥 1. Zalman I3 (10.000$)
🖥 2. AeroCool P7-C0 Black (30.000$)
🖥 3. AeroCool Quartz RGB Black(50.000$)
🖥 4. AeroCool Cruisestar Advance Black (60.000$)
🖥 5. Thermaltake Core V51 TG CA-1C6-00M1WN-03 Black (85.000$)

🛒 Для покупки введите "корпус [номер]"`); 

	const sell = corpus.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.corpuspc) return bot(`у вас уже есть корпус (${corpus[message.user.corpuspc - 1].name}), введите "Продать корпус"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.corpuspc = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:запустить пк|пк запустить|запуск пк)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.pcstart == true) return bot(`Вы уже запустили ПК. Команды: "Играть в пк". Чтобы выключить ПК введите: Выкл ПК`)
	if(message.user.corpuspc == 0) return bot(`Вы не можете запустить свой ПК Если вы его не имеете!`)
	if(message.user.materinka == 0) return bot(`Вы не можете запустить свой ПК! Если в нем нету материнской платы!`)
	if(message.user.videokarta == 0) return bot(`Вы не можете запустить свой ПК! Если в нем нету видеокарты!`)
	if(message.user.ozuu == 0) return bot(`Вы не можете запустить свой ПК! если в нем нету оперативки`)
	if(message.user.hddd == 0) return bot(`Вы не можете запустить свой ПК! если в нем нету Жесткого диска`)
	if(message.user.monitor == 0) return bot(`Вы не можете запустить свой ПК! если нету монитора!`)
	if(message.user.bp == 0) return bot(`Вы не можете запустить свой ПК! Если в нем нету блока питания!`)

           bot(`ПК ЗАПУСКАЕТСЯ`)
           message.send(`ПК ЗАПУСТИЛСЯ НА 10%
           ПК ЗАПУСТИЛСЯ НА 20%
           ПК ЗАПУСТИЛСЯ НА 25%
           ПК ЗАПУСТИЛСЯ НА 35%
           ПК ЗАПУСТИЛСЯ НА 50%
           ПК ЗАПУСТИЛСЯ НА 70%
           ПК ЗАПУСТИЛСЯ НА 80%
           ПК ЗАПУСТИЛСЯ НА 85%
           ПК ЗАПУСТИЛСЯ НА 100%`)
           bot(`ПК запущен`)
           message.send(`Операционная система: Windows 10 PRO`)
           bot(`Чтобы выключить ПК. Введите: "Выкл ПК"`)
           bot(`Команды: "Играть в пк" "Майнить"`)

           setTimeout(() => {
		message.user.timers.pcstart = false;
	}, 600000);

message.user.pcstart = true

});

cmd.hear(/^(?:выкл пк|выключить комп|выключить пк)\s?([0-9]+)?$/i, async (message, bot) => {
	if(message.user.pcstart == false) return bot(`Вы не включили ПК!`)
		bot(`ПК Выключается!`)
	    message.send(`ПК Выключился на 10%
	    ПК Выключился на 30%
	    ПК Выключился на 50%
	    ПК Выключился на 70%
	    ПК Выключился на 100%
	    ПК Выключился!`)
message.user.pcstart = false



});

cmd.hear(/^(?:Играть в пк)$/i, async (message, bot) => {
	if(message.user.pcstart == false) return bot(`Вы не запустили ПК!`)
	if(message.user.timers.pcgame == true) return bot(`Вы слишком сильно устали! Чтобы играть в ПК. Подождите 5 минут`);
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.pcgame = false;
	}, 300000);

	message.user.timers.pcgame = true;

	if(prize === 1)
	{
		message.user.balance += 50000;
		message.user.pcstart = false;
		return bot(`Во время игры вы обманули весь сервер на 50.000$ И вы выключили ПК. Чтобы вас не вычислили`);
	}

	if(prize === 2)
	{
        message.user.pcstart = false;
		return bot(`Была обычная игра КСГО`);
	}

	if(prize === 3)
	{
		message.user.balance += 70000;
	    message.user.pcstart = false;
		return bot(`Во время игры вы обманули школьника на 70.000$ Этого школьника убил его батя. И вы выключили ПК. Чтобы вас не вычислили`);
	}

	if(prize === 4)
	{
		message.user.pcstart = false;
		return bot(`Ваш ПК Вылетел но вы не получили блокировку в КСГО. Т.К Не зашли в игру.`);
	}

});



cmd.hear(/^(?:Майнить)$/i, async (message, bot) => {
	if(message.user.pcstart == false) return bot(`Вы не запустили ПК!`)
	if(message.user.timers.pcmine == true) return bot(`Ваш ПК Сильно перегрелся Подождите 20 минут`);
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.pcmine = false;
	}, 1200000);

	message.user.timers.pcmine = true;

	if(prize === 1)
	{
		message.user.btc += 50000
		message.user.pcstart == false
		return bot(`Вы заработали 50.000 Биткоинов на майнинге`);
	}

	if(prize === 2)
	{
        message.user.btc += 300000
        message.user.hddd = 0
        message.user.pcstart == false
		return bot(`Во время майнинга ваш ПК начал делать разгон сам. И вы заработали 300.000! Но ваш жесткий диск сгорел(`);
	}

	if(prize === 3)
	{
		message.user.btc += 1000000
	    message.user.pcstart == false
		return bot(`Вы оставили свой ПК Майнить неделю и он заработал 1.000.000 БитКоинов`);
	}

	if(prize === 4)
	{
		message.user.pcstart = false;
		return bot(`Вы ничего не получили. Т.К. Пк вырубился`);
	}

});
	  
cmd.hear(/^(?:видюхи|видеокарты|видеокарта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Видеокарты для ПК:
🎥  1. Geforce GTX 650 (25.000$)
🎥  2. Geforce GTX 460 V2 (30.000$)
🎥  3. Geforce GTX 660 (32.000$)
🎥  4. Geforce GTX 760 (35.000$)
🎥  5. Geforce GTX 590 (40.000$)
🎥  6. Geforce GTX 770 (50.000$)
🎥  7. Geforce GTX 980 (60.000$)
🎥  8. Geforce GTX 1080 (80.000$)
🎥  9. Geforce GTX 1080 TI(100.000$)
🎥  10. Geforce RTX 2060 (120.000$)
🎥  11. Geforce RTX 2060 SUPER (140.000$)
🎥  12. Geforce RTX 2070 (170.000$)
🎥  13. Geforce RTX 2070 SUPER (180.000$)
🎥  14. Geforce RTX 2080 (200.000$)
🎥  15. Geforce RTX 2080 TI (230.000$)
🎥  16. Titan RTX (280.000$)


🛒 Для покупки введите "видеокарта [номер]"`); 

	const sell = videokarts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.videokarta) return bot(`у вас уже есть видеокарта (${videokarts[message.user.videokarta - 1].name}), введите "Продать видеокарту"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.videokarta = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:БП|блок питания|блоки питания)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Блоки Питания для ПК:
🎛  1. Thermaltake TR2 S 650W  (1.000$)
🎛  2. Thermaltake Smart RGB 700W (5.000$)
🎛  3. Thermaltake Toughpower Grand RGB Gold (Fully Modular) 850W  (7.000$)
🎛  4. Corsair AX1000 80 Plus Titanium 1000W(12.000$)
🎛  5. Corsair RM1000x 1000W (30.000$)

🛒 Для покупки введите "БП [номер]"`); 

	const sell = blokpc.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.bp) return bot(`у вас уже есть Блок Питания (${blokpc[message.user.bp - 1].name}), введите "Продать БП"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.bp = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Материнки|Материнка|материнская плата|материнские платы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Материнские Платы для ПК:
📗  1. ASUS ROG Strix B450-F GAMING  (6.000$)
📗  2. ASUS TUF GAMING Z390-PRO 90MB0YA0-M0EAY0 (15.000$)
📗  3. ASUS ROG STRIX Z390-F GAMING  (20.000$)
📗  4. ASUS ROG STRIX Z390-E GAMING  (23.000$)
📗  5. ASUS ROG STRIX H370-F GAMING (32.000$)

🛒 Для покупки введите "Материнка [номер]"`); 

	const sell = materinka.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.materinka) return bot(`у вас уже есть материнская плата (${materinka[message.user.materinka - 1].name}), введите "Продать Материнку"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.materinka = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:HDD|жесткий диск|жесткие|диски)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`HDD для ПК:
💻 1. HGST Travelstar Z7K500.B 500GB (5.000$)
💻 2. Toshiba HDWD110UZSVA (10.000$)
💻 3. Toshiba HDWD130UZSVA (13.000$)
💻 4. Seagate ST2000DM008 (19.000$)
💻 5. Western Digital WD Blue Desktop 4 TB (WD40EZRZ) (25.000$)
💻 6. Seagate ST1000DX002 (30.000$)
💻 7. Seagate ST2000LX001 (35.000$)
💻 8. Seagate ST1000LM049 (38.000$)

🛒 Для покупки введите "HDD [номер]"`); 

	const sell = hdd.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.hddd) return bot(`у вас уже HDD (${hdd[message.user.hddd - 1].name}), введите "Продать HDD"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.hddd = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:ОЗУ|оперативка|оперативная память|оператива)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Оперативка для ПК:
💻 1. 8Gb DDR4 2666MHz Corsair Vengeance LPX (10.000$)
💻 2. DDR4 16Gb 3200MHz Patriot Viper 4 (15.000$)
💻 3. DDR4 16Gb 3200MHz Patriot Viper 4 (18.000$)
💻 4. G.SKILL Aegis 16GB C16 GSKILL (20.000$)
💻 5. 16Gb DDR4 2666MHz Kingston HyperX Fury 2x8Gb KIT (25.000$)
💻 6. DDR4 G.SKILL 16Gb 3200 GSKILL (30.000$)
💻 7. 16Gb 3200MHz G.SKILL Ripjaws V 16GVRB 2x8Gb KIT DDR4 CL16 GSKILL (35.000$)
💻 8. 16Gb 3200MHz Crucial Ballistix Sport LT 2x8Gb KIT CL16 DDR4 (38.000$)

Для покупки введите "Оперативка [номер]"`); 

	const sell = ozu.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.ozuu) return bot(`у вас уже есть оперативная память (${ozu[message.user.ozuu - 1].name}), введите "Продать оперативку"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.ozuu = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:моники|мониторы|маниторы|монитор)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Мониторы:
💻 1. LG 34WK500-P (10.000$)
💻 2. Philips 243V7QDSB (20.000$)
💻 3. Acer Nitro VG270UPbmiipx (50.000$)
💻 4. Iiyama ProLite XU2493HS-1 (100.000$)
💻 5. HP EliteDisplay E233 (120.000$)
💻 6. ASUS ROG Strix XG248Q (150.000$)
💻 7. Acer Predator XB271HUb (190.000$)
💻 8. MSI Optix MAG322CQRV (220.000$)

Для покупки введите "Монитор [номер]"`); 

	const sell = monitor.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.monitor) return bot(`у вас уже есть монитор (${monitor[message.user.monitor - 1].name}), введите "Продать оперативку"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.monitor = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:процессоры|процессор|працессор|працесоры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Процессоры:
💻 1. AMD Ryzen 9 3900X (45.000$)
💻 2. Intel Xeon Gold 6254 (80.000$)
💻 3. AMD Ryzen Threadripper 2990WX (120.000$)
💻 4. Intel Core i9-7980XE (160.000$)
💻 5. AMD Ryzen 9 PRO 3900 (190.000$)
💻 6. Intel Xeon W-3265 (250.000$)
💻 7. Intel Xeon Platinum 8176 (290.000$)
💻 8. Intel Xeon Platinum 8168 (320.000$)
💻 9. Intel Core i9-9980XE (360.000$)
💻 10. AMD Ryzen 9 3950X (400.000$)
💻 11. Intel Xeon W-3175X (470.000$)
💻 12. AMD EPYC 7702P (510.000$)
💻 13. AMD EPYC 7742 (550.000$)
💻 14. AMD Ryzen Threadripper 3960X (600.000$)
💻 15. AMD Ryzen Threadripper 3970X (850.000$)

Для покупки введите "Процессор [номер]"`); 

	const sell = processor.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.processor) return bot(`у вас уже есть процессор (${monitor[message.user.monitor - 1].name}), введите "Продать процессор"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.processor = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхта 14|яхта 15|яхта 16|яхты 14|яхты 15|яхты 16)$/i, async (message, bot) => {
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

🛒 Для покупки введите "Яхта [номер]"`)
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
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
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
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
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
		if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Префиксы|prefix)\s?([0-9]+)?$/i, async (message, bot) => {
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
	if(message.user.tag) return bot(`у вас уже есть префикс (${prefix[message.user.prefix - 1].name})`);

	if(message.user.rubins < sell.cost) return bot(`недостаточно рубинов`);
	else if(message.user.rubins >= sell.cost)
	{
		message.user.rubins -= sell.cost;
		message.user.prefix = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} рубинов`);
	}
})
cmd.hear(/^(?:дом 17|дом 18|дом 19|дом 20|дома 17|дома 18|дома 19|дома 20)$/i, async (message, bot) => {
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

🛒 Для покупки введите "Дом [номер]"`)
   });
cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`дома:
🎒 1. Квартира общежития (250$) Налог: 5.000$
🎒 2. Гараж (3.000$) Налог: 10.000$
🎒 3. Сарай (3.500$) Налог: 15.000$
🎒 4. Старый вагон (5.000$) Налог: 20.000$
🎒 5. Комната в общаге (10.000$) Налог: 25.000$
🎒 6. Разрушенный деревенский дом (25.000$) Налог: 15.000$
🎒 7. Холодильник соседа (37.500$) Налог: 30.000$
🎒 8. Кошачий домик (80.000$) Налог: 40.000$
🎒 9. Кирпичный дом (125.000$) Налог: 80.000$
🎒 10. Коттедж (450.000$) Налог: 100.000$
🎒 11. Вилла в Испании (1.250.000$) Налог: 180.000$
🎒 12. Дом на Рублевке (5.000.000$) Налог: 250.000$
🎒 13. Личный небоскреб (7.000.000$) Налог: 500.000$
🎒 14. Остров с особняком (12.500.000$) Налог: 700.000$
🎒 15. Белый дом (20.000.000$) Налог: 1.000.000$
🎒 16. Своя планета (500.000.000.000$) Налог: 10.000.000$

🛒 Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
		if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.home) return bot(`у вас уже есть дом (${homes[message.user.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.home = sell.id;
		message.user.nalog = 0;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры:
🎒 1. Чердак (15.000$) Налог: 1.000$
🎒 2. Квартира в общежитии (55.000$) Налог: 5.000$
🎒 3. Однокомнатная квартира (175.000$) Налог: 20.000$
🎒 4. Двухкомнатная квартира (260.000$) Налог: 25.000$
🎒 5. Четырехкомнатная квартира (500.000$) Налог: 30.000$
🎒 6. Квартира в центре Москвы (1.600.000$) Налог: 100.000$
🎒 7. Двухуровневая квартира (4.000.000$) Налог: 200.000$
🎒 8. Квартира с Евроремонтом (6.000.000$) Налог: 400.000$

🛒 Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
		if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.apartment = sell.id;
		message.user.nalog = 0;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:нологи|налоги)?$/i, async (message, bot) => {
if(!message.user.apartment && !message.user.home) return bot(`У вас нету квартиры или дома чтобы узнать налоги.`)
return bot(`$$ Ваш налог за имущество: ${utils.sp(message.user.nalog)}$
	✅ Совет: Чтобы оплатить налоги команда: Налог`)

});

cmd.hear(/^(?:Оплата налогов|налог)?$/i, async (message, bot) => {
	if(!message.user.nalog) return bot(`У вас не накопились налоги чтобы их оплатить. Налоги раз в час.`)
		message.user.nalogblock = true;
if(message.user.balance < message.user.nalog) return bot(`У вас нехватает денег для оплаты налогов вы были заблокированы для покупок из магазина`)

const nalogg = message.user.nalog;
const balancik = message.user.balance;
message.user.nalog = 0;
message.user.nalogblock = false;
message.user.balance -= nalogg;
return bot(`Ваши налоги обнулились, деньги были сняты с вашего счета.
🔑 Была задолженность: ${utils.sp(nalogg)}$
🤑 Бывший баланс: ${utils.sp(balancik)}
☹ Новый баланс: ${utils.sp(message.user.balance)} `)

});

cmd.hear(/^(?:телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🎒' : '🎒'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '🎒' : '🎒'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '🎒' : '🎒'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '🎒' : '🎒'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '🎒' : '🎒'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '🎒' : '🎒'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '🎒' : '🎒'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '🎒' : '🎒'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '🎒' : '🎒'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '🎒' : '🎒'} 10. Мегафон С1 (120.000$)
${message.user.misc.phone === 11 ? '🎒' : '🎒'} 11. iРhоnе XR (150.000$)
${message.user.misc.phone === 12 ? '🎒' : '🎒'} 12. iРhоnе XS MАX (190.000$)
${message.user.misc.phone === 13 ? '🎒' : '🎒'} 13. iPhone 11 Pro (220.000$)
${message.user.misc.phone === 14 ? '🎒' : '🎒'} 14. iРhоnе 11 Рrо Mаx (260.000$)

Для покупки введите "Телефоны [номер]"
Меню телефона командой "Телефон"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$, чтобы открыть меню введите "Телефон"`);
	}
});
	cmd.hear(/^(?:Питомцы|pets|🐒 Питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Питомцы: 
🐌 1. Улитка (1.000$)
🐸 2. Лягушка (25.000$)
🐰 3. Заяц (500.000$)
🐷 4. Свинья (300.000.000$)
🦊 5. Лиса (1.250.000.000$)
🐶 6. Собака (5.000.000.000$)
🐼 7. Панда (30.000.000.000$)
🦍 8. Горилла (180.000.000.000$)
🐺 9. Волк (360.000.000.000$)
🦇 10. Летучая мышь (500.000.000.000)
⛄ 11. Дед Мороз (600.000.000.000)
🎽 12. КоронаВирус (800.000.000.000)

🛒 Для покупки введите "Питомцы [номер]"
📜 Информация о вашем питомце "Питомец"
🛑 Для продажи питомца "Продать питомца"`)

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
		if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	if(message.user.pets.pet) return bot(`у вас уже есть питомец (${pets[message.user.pets.pet - 1].name}), введите "Продать питомца"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pets.pet = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
})


cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])  return bot(`майнинг фермы:
🎒 1. 6U Nvidia 2₿/час (20.500.000$)
🎒 2. AntminerS9 10₿/час (100.000.000$)
🎒 3. FM2018-BT200 100₿/час (900.000.000$)
🎒 4. RTX 3090 TI SUPER TURBO 300₿/час (1.300.000.000$)

Для покупки введите "Фермы [номер] [количество]"
Посмотреть статистику "Финфо"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
    	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше`);
	if(!message.args[1]) return message.send(`Вы не ввели количество ферм!`)
	if(count + message.user.misc.farm_count > 1000) return bot(`вы не можете иметь больше 1000 ферм одновременно`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.farm = sell.id;
		message.user.misc.farm_count += count;

		return bot(`вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)}$`, {
			attachment: `photo-171493284_457288792`
		});
	}
});

cmd.hear(/^(?:ЛФермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])  return bot(`майнинг фермы:
🎒 1. LTC FARM BASIC 50000 LC/час (1.000.000$)
🎒 2. LTC FARMER AUTO STANDART 100000 LC/час (30.000.000$)
🎒 3. LiteCoin FARM Platinum 150000 LC/час (50.000.000$)
🎒 4. LiteCoin FARM Titanium 250000 LC/час (70.000.000$)

Для покупки введите "ЛФермы [номер] [количество]"
Посмотреть статистику "Финфо"`);

	const sell = lfarms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше`);
	if(!message.args[1]) return message.send(`Вы не ввели количество ферм!`)
	if(count + message.user.lfarm_count > 1000) return bot(`вы не можете иметь больше 1000 ферм одновременно`);
	if(message.user.lfarm != 0 && message.user.lfarm != message.args[1]) return bot(`вы не можете купить ферму другого типа`);

	if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.lfarm = sell.id;
		message.user.lfarm_count += count;

		return bot(`вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});


cmd.hear(/^(?:финфо|инфо ферма|ферма инфо)$/i, async (message, bot) => {
	if(!message.user.misc.farm && !message.user.lfarm)  return bot(`у вас нет фермы или лайт фермы`);
	let text = ``
	if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`; 
	if(message.user.misc.farm) text += ` 📟 Количество: ${message.user.misc.farm_count}\n`;
	if(message.user.misc.farm) text += ` 🅱 BTC: ${utils.sp(message.user.farm_btc)} ${utils.rn(message.user.farm_btc)}\n`;
   if(message.user.misc.farm)  text += `\n\n📘 Для снятия введите "ферма снять"\n`;
    if(message.user.lfarm) text += `⠀🔋 Лайт Ферма: ${lfarms[message.user.lfarm - 1].name}\n`; 
	if(message.user.lfarm) text += ` 📟 Количество: ${message.user.lfarm_count}\n`;
	if(message.user.lfarm) text += ` 🅱 LTC: ${utils.sp(message.user.farmltc)} ${utils.rn(message.user.farmltc)}\n`;
   if(message.user.lfarm)  text += `\n\n📘 Для снятия введите "ферма снять"\n`;
   return message.send(`📗 Информация: \n${text}`)
  });

  
cmd.hear(/^(?:ферма снять|ферма|💽 Ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm && !message.user.lfarm) return bot(`у вас нет фермы или лайт фермы`);
	if(!message.user.farm_btc && !message.user.farmltc)  return bot(`на вашей ферме пусто, новые биткоины или лайткоины появятся скоро`);

	const btc_ = message.user.farm_btc;
    const ltc_ = message.user.farmltc;

	message.user.btc += message.user.farm_btc;
	message.user.ltc += message.user.farmltc;
	message.user.farm_btc = 0;
	message.user.farmltc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, ${utils.sp(ltc_)}, LTC следующие биткоины и лайт появятся через 15мин
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿\n
	🌐 Лайткоинов ${utils.sp(message.user.ltc)} LTC
	`);
});


cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1])
	{
		return message.send(`@id${message.user.id}(${message.user.tag}), бизнесы:
🌳 1. СуперМаркет: 10 тыс $
Прибыль: 8000$/час

🚓 2. Малоимущий ресторан: 500 тыс $
Прибыль: 20.000$/час

👕 3. Сервис Починки Электро оборудования: 1 млн $
Прибыль: 70.000$/час

🕺 4. Атомная Электростанция: 3 млн $
Прибыль: 200.000$/час

🏪 5. Производство Машин': 12 млн $
Прибыль: 50.000$/час

🚬 6. Производство машин "Bugatti": 15 млн $
Прибыль: 150.000$/час

🏩 7. КиноСтудия: 50 млн $
Прибыль: 1.000.000$/час

👯 8. Бордель: 2.5 млрд $
Прибыль: 60.000.000$/час

🔫 9. Торговля оружием: 10 млрд $
Прибыль: 120.000.000$/час

💹 10. Контробанда за границей: 80 млрд $
Прибыль: 1.200.000.000$/час

🚀 11. Завод Президента США: 250 трлн $
Прибыль: 150.000.000.000$/час

💡 Вы можете иметь только ДВА бизнеса.
🛒 Для покупки введите "Бизнесы [номер]"
		`);
	}
	if(message.user.business.length == 2) return bot(`у вас уже есть два бизнеса`);
		if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)

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

	return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
});


cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес [1-2]`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
	💼 Рабочих: ${message.user.business[message.args[1]].workers}/${biz.workers}
	💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}

	${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$)" : "") }`);
});


cmd.hear(/^(?:бизнес)\s(?:нанять)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
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

cmd.hear(/(?:реши)\s([^]+)/i, (message, bot) => {
		var t  = ['не могу решить этот пример 😟','пример записан не верно 😔'].random();	
		var a = message.$match[1].toLowerCase(); 
		var b = /(q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m|{|}|eval|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|u0|require|root|child_process|выполнить|_выполнить|execSync|exec|dir|'|`|"|_|removeChatUser|setTimeout|setInterval|Wallet|toWallet|getBalance|qiwi|ut|u0|user_id:)/ 
		if(b.test(a) == true) return message.send(`${t}`);	
		var result = math.evaluate(message.$match[1]);
		return message.send(`${message.$match[1]} = ${result}`);
	});




cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
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



cmd.hear(/^(?:бонус|🤑 Бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return message.send(`@id${message.user.id} (${message.user.tag}) Бонус можно брать раз в 24 часа 😯`);
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;

	if(prize === 1)
	{
		message.user.balance += 100000000;
		return bot(`вы выиграли 100.000.000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000000;
		return bot(`вы выиграли 1.000.000฿`);
	}

	if(prize === 3)
	{
		message.user.rating += 5000;
		return bot(`вы выиграли 5.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 4)
	{
		message.user.rating += 1000;
		return bot(`вы выиграли 1.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 5)
	{
		message.user.rating += 10000;
		return bot(`вы выиграли 10.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 6)
	{
		message.user.rating += 2000;
		return bot(`вы выиграли 2.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 7)
	{
		message.user.rating += 3000;
		return bot(`вы выиграли 3.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 8)
	{
		message.user.rating += 4000;
		return bot(`вы выиграли 4.000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 9)
	{
		message.user.bank += 100000000;
		return bot(`вы выиграли 100.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 500000000;
		return bot(`вы выиграли 500.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 1000000000;
		return bot(`вы выиграли 1.000.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 5000000000;
		return bot(`вы выиграли 5.000.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
});

function left(stamp) { 
stamp = stamp / 1000; 
let s = stamp % 60; 
stamp = ( stamp - s ) / 60 
let m = stamp % 60; 
stamp = ( stamp - m ) / 60; 
let h = ( stamp ) % 24; 
let d = ( stamp - h ) / 24; 
let text = ``; 
if(d > 0) text += Math.floor(d) + " д. "; 
if(h > 0) text += Math.floor(h) + " ч. "; 
if(m > 0) text += Math.floor(m) + " мин. "; 
if(s > 0) text += Math.floor(s) + " с."; 
return text; 
}
function left(stamp) { 
stamp = stamp / 1000; 
let s = stamp % 60; 
stamp = ( stamp - s ) / 60 
let m = stamp % 60; 
stamp = ( stamp - m ) / 60; 
let h = ( stamp ) % 24; 
let d = ( stamp - h ) / 24; 
let text = ``; 
if(d > 0) text += Math.floor(d) + " д. "; 
if(h > 0) text += Math.floor(h) + " ч. "; 
if(m > 0) text += Math.floor(m) + " мин. "; 
if(s > 0) text += Math.floor(s) + " с."; 
return text; 
} 
let pchats = []; 
function rand(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
} 
function random(arr) { 
return arr[rand(arr.length - 1)]; 
} 

cmd.hear(/^(?:подарок)$/i, async (message, bot) => {
	let conf = await vk.api.messages.getConversationMembers({peer_id: 
		message.peerId,
	});
    	if(conf.count < 50) return bot(`подарок можно забирать только в беседе где есть 50 участников. 😬
🆘 Не забудьте выдать администратора боту, иначе он не сможет получить количество участников!`);
			if(message.chatId == null) return message.send(`@id${message.user.id}(${message.user.tag}), подарок можно забирать только в беседе. 😬`);
		let ch = pchats.find(x=> x.id == message.chatId); 
	if(!ch) 
	{ 
		pchats.push({ 
		id: message.chatId, 
		time: 0 
	});
	}
	let user = message.user; 
	if(pchats.find(x=> x.id == message.chatId).time > Date.now()) return message.send(`@id${message.user.id}(${message.user.tag}), в этой беседе уже забрали подарок, он появится через ${left(ch.time - Date.now())}. Приходи чуть позже! 😳`); 
		pchats.find(x=> x.id == message.chatId).time = Date.now() + 600000; 
	let win = utils.pick([6,6,6,6,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,2]); 
	const bitcoin = utils.random(70000000, 600000000);
	const platinum = utils.random(1,2,3,4,5);
	const surprise = utils.random(1,2,3,4,5,6,7,8,9,10);
	const dengi = utils.random([10000000000, 20000000000, 30000000000, 40000000000, 50000000000]);

	if(win === 1)
	{
		message.user.btc += bitcoin;
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и нашли ${utils.sp(bitcoin)}฿, приходите в другие беседы и открывайте подарки! 🔥`); 
	}

	if(win === 2)
	{
		message.user.business = 11;
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и нашли «Межпланетный экспресс», приходите в другие беседы и открывайте подарки! 🔥` ); 
	}

	if(win === 3)
	{
		message.user.platinum_case += platinum;
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и нашли "Платинум Кейс" (${utils.sp(platinum)} шт.), приходите в другие беседы и открывайте подарки! 🔥`);
	}

	if(win === 4)
	{
		message.user.surpris_case += surprise;
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и нашли "Сюрприз Кейс" (${utils.sp(surprise)} шт.), приходите в другие беседы и открывайте подарки! 🔥`);
	}

	if(win === 5)
	{
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и ничего не нашли, приходите в другие беседы и открывайте подарки! 🔥`);
	}
});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
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
	message.user.msgbalance += 1;
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.hear(/^(?:развод)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек`);
});

cmd.hear(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`дата регистрации ${user.tag}: ${user.regDate}`);
});

cmd.hear(/^(?:промокодд)$/i, async (message, bot) => {
	if(message.user.right < 6) return bot(`доступно с привилегии - Разраб.`);
	let answers = ['Опа! Новые промокод! Быстрее активируй его :3',
	'Быстрее активируй промо, а то его другие разберут!',
	'Держи промокод, пока его другие не разобрали',
	'Что насчёт нового прома?)',
	'Ыыыыы, новый промокод',
	'Че не ставишь лайки?)',
	'КРЯЯЯЯЯЯ!!! Новый промокод ниже ↓↓↓']
	let rullka = ['За 50 лайков, сделаем раздачу денег',
	'Го за 20 лайков, я сделаю новое КРУТОЕ обновление?)',
	'Набёрем 10 лайков, для следующего промо?']
				var result       = '';
		        var words        = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
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
		owner_id: -190506705,
		message: `[☺] | ${utils.pick(answers)}

		[📝] >> Промокод ${result}
		[🗝] >> Активаций в этом промокоде - 75
		[💰] >> Валюты в этом промокоде - 500.000.000$ 

		[🤴] || ${utils.pick(rullka)}`,
		attachments: 'photo-175039543_456239297'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -190506705,
			post_id: response.post_id
		});
		});
});


cmd.hear(/^(?:питомец улучшить|улучшить питомца)$/i, async (message, bot) => {
	if(message.user.pets.pet < 1) return message.send(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	if(message.user.pets.level += 1);
	if(message.user.pets.level < 1);
	if(message.user.balance < 5000000000) return message.send(`к сожалению, у вас недостаточно денег для улучшения питомца (стоимость улучшения 10.000.000.000$)`)
	if(message.user.balance -= 5000000000) return bot(`Вы улучшили  ${pets[message.user.pets.pet - 1].name}, на данный момент его уровень составляет ${message.user.pets.level}`);
    {
    }
	if(message.user.pets.level < 2);
	if(message.user.balance < 50000000000) return message.send(`к сожалению, у вас недостаточно денег для улучшения питомца (стоимость улучшения 50.000.000.000$)`)
	if(message.user.balance -= 50000000000) return bot(`Вы улучшили  ${pets[message.user.pets.pet - 1].name}, на данный момент его уровень составляет ${message.user.pets.level}`);
    {
    }
	if(message.user.pets.level < 3);
	if(message.user.balance < 100000000000) return message.send(`к сожалению, у вас недостаточно денег для улучшения питомца (стоимость улучшения 100.000.000.000$)`)
	if(message.user.balance -= 100000000000) return bot(`Вы улучшили  ${pets[message.user.pets.pet - 1].name}, на данный момент его уровень составляет ${message.user.pets.level}`);
    {
    }
	if(message.user.pets.level < 4) return message.send(`Достигнут максимальный уровень развития`);
	{
  }
});

cmd.hear(/^(?:питомец найти)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.pets.pet > 0) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас уже есть питомец.`); 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

	if(prize === 1)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize === 2)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 1);
		if(!sell) return;
		message.user.pets.pet = 1;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице улитку, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице улитку, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 3)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize === 4)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 2);
		if(!sell) return;
		message.user.pets.pet = 2;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице лягушку, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице лягушку, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 5)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 6)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 3);
		if(!sell) return;
		message.user.pets.pet = 3;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице зайца, отправляйте его в поход и прокачивайте его уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице зайца, отправляйте его в поход и прокачивайте его уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 7)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 8)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 4);
		if(!sell) return;
		message.user.pets.pet = 4;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице свинью, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице свинью, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 9)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 10)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 5);
		if(!sell) return;
		message.user.pets.pet = 5;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице лису, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице лису, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 11)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 12)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 6);
		if(!sell) return;
		message.user.pets.pet = 6;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице собаку, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице собаку, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 13)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 14)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 7);
		if(!sell) return;
		message.user.pets.pet = 7;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице панду, отправляйте его в поход и прокачивайте его уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице панду, отправляйте его в поход и прокачивайте его уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 15)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 16)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 8);
		if(!sell) return;
		message.user.pets.pet = 8;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице гориллу, отправляйте её в поход и прокачивайте её уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице гориллу, отправляйте её в поход и прокачивайте её уровень.
		Энергия закончилась. 📛`);
		
		}
	}

	if(prize === 17)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;

		if(message.user.energy > 0) return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы не нашли никакого питомца без хозяина на улице, попробуйте еще раз.
		Энергия закончилась. 📛`);

		}
	}

	if(prize == 18)
	{
		if(message.user.energy < 1) return bot(`вы сильно устали.
		📛 Энергия появляется каждые 5 минут!`);

		message.user.energy -= 1;
		const sell = pets.find(x=> x.id === 9);
		if(!sell) return;
		message.user.pets.pet = 9;

		if(message.user.energy > 0) return bot(`вы успешно нашли на улице волка, отправляйте его в поход и прокачивайте его уровень.
			💡 Осталось энергии: ${message.user.energy}`);

		if(message.user.energy < 1) {

		setTimeout(() => {
			message.user.energy = 10;
		}, 300000);

		return bot(`вы успешно нашли на улице волка, отправляйте его в поход и прокачивайте его уровень.
		Энергия закончилась. 📛`);
		
		}
	}
});

cmd.hear(/^(?:питомец)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(message.user.pets.pet < 1) return bot(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	return bot(`информация:
	${pets[message.user.pets.pet - 1].icon} Питомец: «${pets[message.user.pets.pet - 1].name}»
	💖 Радость: ${message.user.pets.joy}%
	🍗 Сытость: ${message.user.pets.satiety}%
	🌟 Уровень: ${message.user.pets.level}
	`);
});

cmd.hear(/^(?:питомец кормить)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(message.user.pets.pet < 1) return bot(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	if(message.user.pets.satiety === 100) return bot(`ваш питомец не хочет кушать. 🙄`)
	message.user.pets.satiety = 100;
	message.user.pets.balance -= 1000000;
	return bot(`вы покормили питомца за 1.000.000$ 🍗`);
});

cmd.hear(/^(?:питомец играть)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(message.user.pets.pet < 1) return bot(`У вас нету питомца, посмотреть питомцев написав команду 'Питомцы'`)
	if(message.user.pets.joy === 100) return bot(`ваш питомец не хочет играть. 🙄`)
	message.user.pets.joy = 100;
	message.user.pets.balance -= 110000;
	return bot(`вы поиграли с питомцем за 110.000$ 🍭`);
});

cmd.hear(/^(?:одежда)\s?([0-9]+)?$/i, async (message, bot) => {
if(!message.args[1]) return bot (`одежда:
👘 1. Шмотки с АliЕxрrеss (5$)
👘 2. Шмотки с рынка (1.000$)
👘 3. Dеmix (10.000$)
👘 4. Рumа (20.000$)
👘 5. Rееbоk (37.000$)
👘 6. Nikе (48.000$)
👘 7. Аdidаs (85.000$)
👘 8. Аrmаni (120.000$)
👘 9. Vеrsасе (170.000$)
👘 10. Burbеrrу (200.000$)
👘 11. Rаlрh Lаurеn (250.000$)
👘 12. Сосо Сhаnеl (550.000$)
👘 13. Рrаdа (1.000.000$)
👘 14. Hеrmes (1.500.000$)
👘 15. TОMMY HILFIGЕR (5.000.000$)
👘 16. Stоnе Islаnd (7.000.000$)
👘 17. Supreme (10.000.000$)
👘 18. GUССI (30.000.000$)
👘 19. Lоuis Vuittоn (50.000.000$)

🛒 Для покупки введите "Одежда [номер]"
`, {
attachment: `photo-171493284_457288076`
});







const sell = clothes.find(x=> x.id === Number(message.args[1]));
if(!sell) return;
	if(message.user.nalogblock == true) return bot(`У вас блокировка покупок! Оплатите налоги`)
if(message.user.clothes) return bot(`у вас уже есть телефон (${clothes[message.user.clothes - 1].name}), введите "Продать одежду"`);

if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
else if(message.user.balance >= sell.cost)
{
message.user.balance -= sell.cost;
message.user.clothes = sell.id;

return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
}


});

	cmd.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = message.users[user_id(message.user)];
		if(message.user.right < 5) return;

		if(!message.args[2]) return message.send(`- - log [id] [number] - -\n1. Передачи [передать]\n2. Выдачи [give]\n3. Обнуления [remove]\n4. Выдача прав [admin]\n5. Обнуление прав [admin]\n6. Варны [warn]`) 
		let id = message.args[1];
		let i = message.args[2];
		if(i < 0 || i > 5) return message.send(`Error`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];}
		if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i];} 
		if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i];} 
		if(i == 5) for(i=0; i!=log.setwin[id].log.length; i++){text += log.setwin[id].log[i];}  
		if(i == 6) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i];}  
		return message.send(text);
	});

	cmd.hear(/^(?:лог)/i, (message) => {
		let id = (message.user.id);
		 
		let text = '⛔ Лог последних 15 игр ⛔\n';
		for(i=0; i!=log.game[id].log.length; i++){text += log.game[id].log[i];} 
		return message.send(text);
	});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else return bot(`не угадали 
	?? Выпало число ${int}`);
});

cmd.hear(/^(?:Положить|Поплнить казну|Пожертвовать)\s([^]+)$/i, async (message, bot) => {
let user = message.user;
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000').replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance));
if(!message.args[1]) return message.send(`📛 ➾ укажите сумму чтобы положить деньги в казну бота`);
let amount = Number(parserInt(message.args[1]));
amount = Math.round(amount); 
if(!Number(amount)) return message.send(`🔸 ➟ Пожертвование должно быть числом!`);
if(amount > user.balance || amount < 1 ) return message.send(`[⚠] » Недостаточно средств для пожертвования `);
user.balance -= amount;
botinfo.kazna += amount;
return message.send(`🏦 Вы успешно пожертвовали ${utils.sp(amount)} [${utils.rn(amount)}]💲в казну штата Fox`);
});

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 2.500.000.000$ 
	Если друг активирует вашу рефералку, то он получит 2.500.000.000$`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 2500000000;
	message.user.balance += 2500000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 2.500.000.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 2.500.000.000$`);
});

 	cmd.hear(/^(?:ко|тест)$/i, async (message, args, bot) => { 
 		return message.send(`&#10004; » Работаю! Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
 	});

 	//---------------|•|•| Система Кейсов |•|•|------------------\\
cmd.hear(/^(?:кейс|кейсы|📦 Кейсы)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
	let text = ``;

text += `1⃣ Сюрприз Кейс: 50.000.000.000$\n`;
text += `📜 Информация: "кейс инфо 1"\n`;
text += `🛒 Купить: "кейс 1 [кол-во]"\n\n`;
text += `2⃣ Платинум Кейс: 3.000.000.000.000$\n`;
text += `📜 Информация: "кейс инфо 2"\n`;
text += `🛒 Купить: "кейс 2 [кол-во]"\n\n`;
    if(message.user.surpris_case || message.user.platinum_case || message.user.donate_case || message.user.halloween_case || 
message.user.premium_case ||message.user.newyear_case)
{ 
	text += `👜 У Вас в инвентаре:\n\n`; 
	 
	if(message.user.surpris_case) text += `📦 Сюрприз Кейс (${utils.sp(message.user.surpris_case)} шт.)\n📜 Открыть: «кейс открыть 1»\n\n`; 
	if(message.user.platinum_case) text += `📦 Платинум Кейс (${utils.sp(message.user.platinum_case)} шт.)\n📜 Открыть: «кейс открыть 2»\n\n`; 
	if(message.user.donate_case) text += `📦 Донат Кейс (${utils.sp(message.user.donate_case)} шт.)\n📜 Открыть: «кейс открыть 3»\n\n`; 
	if(message.user.halloween_case) text += `📦 Хэллоуин Кейс (${utils.sp(message.user.halloween_case)} шт.)\n📜 Открыть: «кейс открыть 4»\n\n`; 
	if(message.user.premium_case) text += `📦 Премиум Кейс (${utils.sp(message.user.premium_case)} шт.)\n📜 Открыть: «кейс открыть 5»\n\n`; 
	if(message.user.newyear_case) text += `📦 Новогодний Кейс (${utils.sp(message.user.newyear_case)} шт.)\n📜 Открыть: «кейс открыть 6»\n\n`; 
 }
 else 
 {
 	text += `⛔ У Вас нет кейсов.`; 
 }
 await message.send(`@id${message.user.id}(${message.user.tag}), кейсы:\n\n${text}`);
});

cmd.hear(/^(?:кейс 1)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 50000000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 50000000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 50000000000 );
		message.user.surpris_case += message.args[1];

		return bot(`вы успешно купили "Сюрприз Кейс" (${message.args[1]} шт.) 💰`);
	}
});

cmd.hear(/^(?:кейс 2)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 3000000000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 3000000000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 3000000000000 );
		message.user.platinum_case += message.args[1];

		return bot(`вы успешно купили "Платинум Кейс" (${message.args[1]} шт.) 💰`);
	}
});

cmd.hear(/^(?:кейс инфо 1)$/i, async (message, bot) => {
 return message.send(`@id${message.user.id}(${message.user.tag}), из "Сюрприз Кейса" может выпасть:

1⃣ Опыт. 
2⃣ Игровая валюта. 
3⃣ Рейтинг. 

🛒 Купить: "кейс 1"
`);
});

cmd.hear(/^(?:кейс инфо 2)$/i, async (message, bot) => {
 return message.send(`@id${message.user.id}(${message.user.tag}), из "Платинум Кейса" может выпасть: 

1⃣ Опыт. 
2⃣ Игровая валюта. 
3⃣ Рейтинг. 
4⃣ Секретный дом. 
5⃣ Секретная машина. 
6⃣ Секретная яхта. 
7⃣ Секретный комп. 
8⃣ Привилегия Bronze.

🛒 Купить: "кейс 2 [кол-во]"
`);
});

cmd.hear(/^(?:кейс открыть 1)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.surpris_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Сюрприз Кейса"! 🙄`); 
	message.user.surpris_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4]);
	const expi = utils.random(1,100);
	const ratings = utils.random(1,2000);
	const moneys = utils.random(1,15000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 3)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize == 4)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
});

cmd.hear(/^(?:кейс открыть 2)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.platinum_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Платинум Кейса"! 🙄`); 
	message.user.platinum_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	const expi = utils.random(1,200);
	const ratings = utils.random(9999,39999);
	const moneys = utils.random(10500000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 3)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 4)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 5)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 6)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 7)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 8)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 9)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 10)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 11)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 18)
	{
		const sell = cars.find(x=> x.id === 29);
		if(!sell) return;
		message.user.transport.car= 29;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 19)
	{
		const sell = cars.find(x=> x.id === 30);
		if(!sell) return;
		message.user.transport.car= 30;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 20)
	{
		const sell = cars.find(x=> x.id === 31);
		if(!sell) return;
		message.user.transport.car= 31;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 21)
	{
		const sell = yachts.find(x=> x.id === 14);
		if(!sell) return;
		message.user.transport.yacht= 14;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 22)
	{
		const sell = yachts.find(x=> x.id === 15);
		if(!sell) return;
		message.user.transport.yacht= 15;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 23)
	{
		const sell = yachts.find(x=> x.id === 16);
		if(!sell) return;
		message.user.transport.yacht= 16;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 24)
	{
		const sell = homes.find(x=> x.id === 17);
		if(!sell) return;
		message.user.realty.home= 17;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 25)
	{
		const sell = homes.find(x=> x.id === 18);
		if(!sell) return;
		message.user.realty.home= 18;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 26)
	{
		const sell = homes.find(x=> x.id === 19);
		if(!sell) return;
		message.user.realty.home= 19;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 27)
	{
		const sell = homes.find(x=> x.id === 20);
		if(!sell) return;
		message.user.realty.home= 20;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 28)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 29)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 30)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 31)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 32)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 33)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 34)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 35)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 36)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 37)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 38)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 39)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 40)
	{
		if(message.user.right >= 1) 
		{
		 	bot(`У вас уже есть какая-то привилегия. Кейс был возвращен назад! 😉`);
		 	message.user.platinum_case += 1; 
		}
		else 
		{
			message.user.right = 1;
			return bot(`вы нашли привилегию Bronze! 😱`);
		}
	}
});

cmd.hear(/^(?:кейс открыть 3)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.donate_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Донат Кейса"! 🙄`); 
	message.user.donate_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	const expi = utils.random(1,200);
	const ratings = utils.random(9999,39999);
	const moneys = utils.random(10500000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 3)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 4)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 5)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 6)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 7)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 8)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 9)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 10)
	{	
		if(message.user.business.length == 2) return bot(`у вас уже есть два бизнеса`);
		const sell = businesses.find(x=> x.id === 11);
		if(!sell) return;
		message.user.business.push({
			"id": 11,
			"upgrade": 1,
			"workers": 1,
			"moneys": 0
		});
		return bot(`вы нашли бизнес «Межпланетный экспресс» 😱`);
	}

	if(prize === 11)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 18)
	{
		const sell = cars.find(x=> x.id === 29);
		if(!sell) return;
		message.user.transport.car= 29;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 19)
	{
		const sell = cars.find(x=> x.id === 30);
		if(!sell) return;
		message.user.transport.car= 30;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 20)
	{
		const sell = cars.find(x=> x.id === 31);
		if(!sell) return;
		message.user.transport.car= 31;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 21)
	{
		const sell = yachts.find(x=> x.id === 14);
		if(!sell) return;
		message.user.transport.yacht= 14;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 22)
	{
		const sell = yachts.find(x=> x.id === 15);
		if(!sell) return;
		message.user.transport.yacht= 15;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 23)
	{
		const sell = yachts.find(x=> x.id === 16);
		if(!sell) return;
		message.user.transport.yacht= 16;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 24)
	{
		const sell = homes.find(x=> x.id === 17);
		if(!sell) return;
		message.user.realty.home= 17;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 25)
	{
		const sell = homes.find(x=> x.id === 18);
		if(!sell) return;
		message.user.realty.home= 18;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 26)
	{
		const sell = homes.find(x=> x.id === 19);
		if(!sell) return;
		message.user.realty.home= 19;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 27)
	{
		const sell = homes.find(x=> x.id === 20);
		if(!sell) return;
		message.user.realty.home= 20;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 28)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 29)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 30)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 31)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 32)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 33)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 34)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 35)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 36)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 37)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 38)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 39)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 40)
	{
		if(message.user.right >= 2) 
		{
		 	bot(`У вас уже есть какая-то привилегия. Кейс был возвращен назад! 😉`);
		 	message.user.donate_case += 1; 
		}
		else 
		{
			message.user.right = 2;
			return bot(`вы нашли привилегию Silver! 😱`);
		}
	}
});

cmd.hear(/^(?:кейс открыть 4)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.halloween_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Хэллоуин Кейса"! 🙄`); 
	message.user.halloween_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	const expi = utils.random(1,200);
	const ratings = utils.random(9999,39999);
	const moneys = utils.random(10500000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 3)
	{
		message.user.balance += moneys;
		return bot(`вы нашли${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 4)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 5)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 6)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 7)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 8)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 9)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 10)
	{	
		const sell = pets.find(x=> x.id === 10);
		if(!sell) return;
		message.user.pets.pet= 10;
		return bot(`вы нашли секретного питомца «${sell.name}» 😱`);
	}

	if(prize === 11)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 18)
	{
		const sell = cars.find(x=> x.id === 29);
		if(!sell) return;
		message.user.transport.car= 29;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 19)
	{
		const sell = cars.find(x=> x.id === 30);
		if(!sell) return;
		message.user.transport.car= 30;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 20)
	{
		const sell = cars.find(x=> x.id === 31);
		if(!sell) return;
		message.user.transport.car= 31;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 21)
	{
		const sell = yachts.find(x=> x.id === 14);
		if(!sell) return;
		message.user.transport.yacht= 14;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 22)
	{
		const sell = yachts.find(x=> x.id === 15);
		if(!sell) return;
		message.user.transport.yacht= 15;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 23)
	{
		const sell = yachts.find(x=> x.id === 16);
		if(!sell) return;
		message.user.transport.yacht= 16;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 24)
	{
		const sell = homes.find(x=> x.id === 17);
		if(!sell) return;
		message.user.realty.home= 17;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 25)
	{
		const sell = homes.find(x=> x.id === 18);
		if(!sell) return;
		message.user.realty.home= 18;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 26)
	{
		const sell = homes.find(x=> x.id === 19);
		if(!sell) return;
		message.user.realty.home= 19;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 27)
	{
		const sell = homes.find(x=> x.id === 20);
		if(!sell) return;
		message.user.realty.home= 20;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 28)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 29)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 30)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 31)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 32)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 33)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 34)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 35)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 36)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 37)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 38)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 39)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 40)
	{
		if(message.user.right >= 1) 
		{
		 	bot(`У вас уже есть какая-то привилегия. Кейс был возвращен назад! 😉`);
		 	message.user.halloween_case += 1; 
		}
		else 
		{
			message.user.right = 1;
			return bot(`вы нашли привилегию Bronze! 😱`);
		}
	}
});

cmd.hear(/^(?:кейс открыть 5)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.premium_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Премиум Кейса"! 🙄`); 
	message.user.premium_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	const expi = utils.random(1,200);
	const ratings = utils.random(9999,39999);
	const moneys = utils.random(10500000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 3)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 4)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 5)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 6)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 7)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 8)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 9)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 10)
	{	
		if(message.user.business.length == 2) return bot(`у вас уже есть два бизнеса`)
		const sell = businesses.find(x=> x.id === 11);
		if(!sell) return;
		message.user.business.push({
			"id": 11,
			"upgrade": 1,
			"workers": 1,
			"moneys": 0
		});
		return bot(`вы нашли бизнес «Межпланетный экспресс» 😱`);
	}

	if(prize === 11)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 18)
	{
		const sell = cars.find(x=> x.id === 29);
		if(!sell) return;
		message.user.transport.car= 29;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 19)
	{
		const sell = cars.find(x=> x.id === 30);
		if(!sell) return;
		message.user.transport.car= 30;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 20)
	{
		const sell = cars.find(x=> x.id === 31);
		if(!sell) return;
		message.user.transport.car= 31;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 21)
	{
		const sell = yachts.find(x=> x.id === 14);
		if(!sell) return;
		message.user.transport.yacht= 14;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 22)
	{
		const sell = yachts.find(x=> x.id === 15);
		if(!sell) return;
		message.user.transport.yacht= 15;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 23)
	{
		const sell = yachts.find(x=> x.id === 16);
		if(!sell) return;
		message.user.transport.yacht= 16;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 24)
	{
		const sell = homes.find(x=> x.id === 17);
		if(!sell) return;
		message.user.realty.home= 17;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 25)
	{
		const sell = homes.find(x=> x.id === 18);
		if(!sell) return;
		message.user.realty.home= 18;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 26)
	{
		const sell = homes.find(x=> x.id === 19);
		if(!sell) return;
		message.user.realty.home= 19;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 27)
	{
		const sell = homes.find(x=> x.id === 20);
		if(!sell) return;
		message.user.realty.home= 20;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 28)
	{
	message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 29)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 30)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 31)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 32)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 33)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 34)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 35)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 36)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 37)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 38)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 39)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 40)
	{
		if(message.user.right >= 2) 
		{
		 	bot(`У вас уже есть какая-то привилегия. Кейс был возвращен назад! 😉`);
		 	message.user.premium_case += 1; 
		}
		else 
		{
			message.user.right = 2;
			return bot(`вы нашли привилегию Silver! 😱`);
		}
	}
});

cmd.hear(/^(?:кейс открыть 6)$/i, async (message, bot) => {
	let user = message.user; 
	if(message.user.newyear_case < 1) return message.send(`@id${message.user.id}(${message.user.tag}), у Вас нет "Новогоднего Кейса"! 🙄`); 
	message.user.newyear_case -= 1; 
	vk.api.message == ({sticker_id: 1});
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	const expi = utils.random(1,200);
	const ratings = utils.random(9999,39999);
	const moneys = utils.random(10500000000000);

	if(prize === 1)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 2)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 3)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 4)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 5)
	{
		message.user.balance += moneys;
		return bot(`вы нашли ${utils.sp(moneys)}$ 🔥`);
	}

	if(prize === 6)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 7)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 8)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 9)
	{
		message.user.rating += ratings;
		return bot(`вы нашли ${utils.sp(ratings)}👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}

	if(prize === 10)
	{	
		const sell = pets.find(x=> x.id === 11);
		if(!sell) return;
		message.user.pets.pet= 11;
		return bot(`вы нашли секретного питомца «${sell.name}» 😱`);
	}

	if(prize === 11)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 18)
	{
		const sell = cars.find(x=> x.id === 29);
		if(!sell) return;
		message.user.transport.car= 29;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 19)
	{
		const sell = cars.find(x=> x.id === 30);
		if(!sell) return;
		message.user.transport.car= 30;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 20)
	{
		const sell = cars.find(x=> x.id === 31);
		if(!sell) return;
		message.user.transport.car= 31;
		return bot(`вы нашли секретную машину «${sell.name}» 😱`);
	}
	if(prize === 21)
	{
		const sell = yachts.find(x=> x.id === 14);
		if(!sell) return;
		message.user.transport.yacht= 14;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 22)
	{
		const sell = yachts.find(x=> x.id === 15);
		if(!sell) return;
		message.user.transport.yacht= 15;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 23)
	{
		const sell = yachts.find(x=> x.id === 16);
		if(!sell) return;
		message.user.transport.yacht= 16;
		return bot(`вы нашли секретную яхту «${sell.name}» 😱`);
	}
	if(prize === 24)
	{
		const sell = homes.find(x=> x.id === 17);
		if(!sell) return;
		message.user.realty.home= 17;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 25)
	{
		const sell = homes.find(x=> x.id === 18);
		if(!sell) return;
		message.user.realty.home= 18;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 26)
	{
		const sell = homes.find(x=> x.id === 19);
		if(!sell) return;
		message.user.realty.home= 19;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 27)
	{
		const sell = homes.find(x=> x.id === 20);
		if(!sell) return;
		message.user.realty.home= 20;
		return bot(`вы нашли секретный дом «${sell.name}» 😱`);
	}
	if(prize === 28)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 29)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 30)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 31)
	{
		message.user.opit += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}
	if(prize === 32)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 33)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 34)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 35)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 36)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 37)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 38)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 39)
	{
		return bot(`вы ничего не нашли. 😒`);
	}
	if(prize === 40)
	{
		if(message.user.right >= 1) 
		{
		 	bot(`У вас уже есть какая-то привилегия. Кейс был возвращен назад! 😉`);
		 	message.user.newyear_case += 1; 
		}
		else 
		{
			message.user.right = 1;
			return bot(`вы нашли привилегию Bronze! 😱`);
		}
	}
});

cmd.hear(/^(?:пинг)/i, async (message, bot) => { 

    tcpp.ping({ address: 'vk.com' }, function(err, data) {
        message.reply(`&#8987; Uptime (${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}) | &#9989; Ping: ${Math.round(data.avg)}ms`)
    }, 60000);
});

cmd.hear(/^(?:all)\s([^]+)/i, async (message, args, bot) => {   
	if(!message.args[1]) return message.send(`🔸 » Введите текст рассылки`)
	if(message.user.right < 6) return message.send(`🔸 »Вы не Сис.Админ`)
    let i = config;
		
	for(x in i.full){if(!i.full[id]) return;} 
	for(i=0;i<20000;i++){	
		if(users[i]){
			vk.api.call("messages.send", {
				peer_id: users[i].id,
				message: `👉 » Важное сообщение от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]`
			})  	
		}
	}
});


cmd.hear(/^(?:написать|смс|sms)\s([0-9]+)?\s([^]+)?$/i, async (message, args, bot) => { 
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
	
cmd.hear(/^(?:)/i, async (message, args, bot) => {
	if(!message.isChat) 
	{
		await message.reply("Такой команды не существует, отправь «помощь» чтобы узнать мои команды. 😖");
	}
});
// Виджет в группу
const pizda = require('request');
async function updateWidget() {
let tops = []
for (i = 0; i < 200000; i++){
	if(users[i]){tops.push({id: i, idvk: users[i].id, lvl: users[i].rating});
}
}
tops.sort(function(a, b) {if (b.lvl > a.lvl) return 1; if (b.lvl < a.lvl) return -1; return 0})

let script = {title: '👑КОРОЛИ БОТА👑', title_url: "vk.com/club190506705", head: [{text: '🔮 НИК'}, {text: '👑 РЕЙТИНГ', align: 'right'},  {text: '💰 ДЕНЬГИ', align: 'right'}], body: [], more: "Перейти к боту", more_url: "vk.me/club190506705"}
for (let g = 0; g < 10; g++) {if (tops.length > g){script.body.push([{icon_id: `id${tops[g].idvk}`, text: `${users[tops[g].id].tag}`, url: `vk.com/id${tops[g].idvk}`}, {text: `${utils.sp(users[tops[g].id].rating)}👑`}, {text: `${utils.sp(users[tops[g].id].balance)}$`}])}}
pizda.post({url: 'https://api.vk.com/method/appWidgets.update', form: {type: 'table', access_token: 'df056776d408fe1caa281825e55799b560153a262f31a74427f14b1da8ed561a532ed966f0949d39011e6', code: `return ${JSON.stringify(script)};`, v: '5.95'}},
function(err, resp, body) {console.log(body)})
console.log("Виджет обновлён!")
}
updateWidget()
setInterval(updateWidget, 300000)	

 //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 	var bonus = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
 
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
		            		balance: 10000000000,
		            		activ: 10,
		            		users: {}
		            	}
		}else{
		}
			user.api.wall.post({
		owner_id: -190506705,
		message: `[☺] | ${utils.pick(answers)}

		[📝] >> Промокод ${result}
		[🗝] >> Активаций в этом промокоде - 10
		[💰] >> Валюты в этом промокоде - 10.000.000.000$ 

		[🤴] || ${utils.pick(rullka)}`,
		attachments: 'photo-174226458_456239378'
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -190506705,
			post_id: response.post_id
		});
		});
	}, 86400000);

	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

	setInterval(() => {
		bonus.sec++;
		if (bonus.sec == 60) { bonus.sec = 0; bonus.min += 1; }
		if (bonus.min == 60) { bonus.min = 0; bonus.hours += 1; }
		if (bonus.hours == 24) { bonus.hours = 0; bonus.days += 1; }
	}, 1000);

 
	function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 

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
       

	// log
	 
 	function game_log(id, name, count, win_lose) {
 
 	// - - - - - - - - - - - - - - - - -   
 		if(!log.game[id]){ log.game[id] = { log: [] }  } 
 		log.game[id].log.push(`[${time()} | ${data()} | ${name}] Ставка: ${count}$ | Исход: ${win_lose.toString().replace(/0/gi, "❌").replace(/1/gi, "✅")}\n`) 
		if(log.game[id].log.length >= 15){ delete log.game[id].log.shift() }  

 	}       
    

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


	Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; }
	/*==========================================================================================================*/
	function user_id(id) {
		 let ids = 0
		 if(uid[1][id]){
		 	ids = uid[1][id].id
		 }    
		return ids; 
	}  
	/*==========================================================================================================*/

/* function  {
let id = is[0];
let i = config;
for(i=0;i<200000;i++){
if(users[i]){
if(users[i].right >= 6){
vk.api.call("messages.send", {
peer_id: users[i].id,
message:
}).then((res) => {}).catch((error) => {console.log('report error'); });
}
}
}
} */

         	 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(users[i]){
 			 	if(users[i].adm_time > 0){
 			 		users[i].adm_time -= 1;
 			 		if(users[i].adm_time == 0){
 			 			users[i].right = 0;

 			 			vk.api.call('messages.send', {
							user_id: users[i].id,
							message: `Срок действия vip/moder/admin прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  

function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2018' ;
		return datas;
	}

 	function logs(id, ids, num, type) {
	 	
 	// - - - - - - - - - - - - - - - - -  
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		}
 		if(type == 3){ 
 			if(!log.remove[ids]){ log.remove[ids] = { log: [] }  } 
 			if(!log.remove[id]){ log.remove[id] = { log: [] }  } 
 			log.remove[id].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
 			log.remove[ids].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			if(log.remove[id].log.length >= 15){ delete log.remove[id].log.shift() } 
			if(log.remove[ids].log.length >= 15){ delete log.remove[id].log.shift() } 
 		} 
 		if(type == 4){ 
 			if(!log.admin[ids]){ log.admin[ids] = { log: [] }  } 
 			if(!log.admin[id]){ log.admin[id] = { log: [] }  } 
 			log.admin[id].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
 			log.admin[ids].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
			if(log.admin[id].log.length >= 15){ delete log.admin[id].log.shift() } 
			if(log.admin[ids].log.length >= 15){ delete log.admin[id].log.shift() } 
 		} 
 		if(type == 5){ 
 			if(!log.setwin[ids]){ log.setwin[ids] = { log: [] }  } 
 			if(!log.setwin[id]){ log.setwin[id] = { log: [] }  } 
 			log.setwin[id].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
 			log.setwin[ids].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
			if(log.setwin[id].log.length >= 15){ delete log.setwin[id].log.shift() } 
			if(log.setwin[ids].log.length >= 15){ delete log.setwin[id].log.shift() }  
 		} 
 		if(type == 6){ 
 			if(!log.warns[ids]){ log.warns[ids] = { log: [] }  } 
 			if(!log.warns[id]){ log.warns[id] = { log: [] }  } 
 			log.warns[id].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
 			log.warns[ids].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
			if(log.warns[id].log.length >= 15){ delete log.warns[id].log.shift() } 
			if(log.warns[ids].log.length >= 15){ delete log.warns[id].log.shift() }  
 		} 
 	}
	//

	// log
	 
 	function game_log(id, name, count, win_lose) {
 
 	// - - - - - - - - - - - - - - - - -   
 		if(!log.game[id]){ log.game[id] = { log: [] }  } 
 		log.game[id].log.push(`[${time()} | ${data()} | ${name}] Ставка: ${count}$ | Исход: ${win_lose.toString().replace(/0/gi, "❌").replace(/1/gi, "✅")}\n`) 
		if(log.game[id].log.length >= 15){ delete log.game[id].log.shift() }  

 	}

function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];  
}


function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}

function spaces(string) {
if (typeof string !== "string") string = string.toString();
return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}

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
function check(user){
     if(user.hero_id == false) return message.send(`\n‼ Упс...‼\n У вас нет персонажа.]\n1&#8419; Этап. Выбор персонажа.\n&#9193; "Герои" - список персонажей.`); 
}

	function restart() {
	 	  for(i=1;i < 200000; i++){  
	 	  	if(message[1]){ 	 
		 	  	if(message[1].users[i]){  
		 	 		message[1].users[i].limits.bonus = false; 
		 	 		message[1].users[i].limits.war = false;
		 	 		message[1].users[i].limits.les = false;
		 	 		message[1].users[i].hero.up = false;
				}
			}
		}
	} 


  setInterval(() =>{ 
for(i=1;i<200000;i++){ 
   if(users[i]){ 
 if(users[i].msg == 100) {users[i].rang = "Начинающий"} 
 if(users[i].msg == 500) {users[i].rang = "Любитель общения"} 
 if(users[i].msg == 1000) {users[i].rang = "Абсолютный любитель"} 
 if(users[i].msg == 2000) {users[i].rang = "Старший"} 
 if(users[i].msg == 3000) {users[i].rang = "Профессионал"} 
 if(users[i].msg == 8000) {users[i].rang = "Генералиссимус"} 
 } 
} 
  }, 1000);

  var uptime = {
	sec: 0,
	min: 0,
	hours: 0,
	days: 0,
}
  var bonus = {
	sec: 0,
	min: 0,
	hours: 0,
	days: 0,
}

  function timeStamp() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(minutes == 0) minutes = "&#127358;&#127358;";
    if(minutes == 1) minutes = "0&#8419;1&#8419;";
    if(minutes == 2) minutes = "0&#8419;2&#8419;";
    if(minutes == 3) minutes = "0&#8419;3&#8419;";
    if(minutes == 4) minutes = "0&#8419;4&#8419;";
    if(minutes == 5) minutes = "0&#8419;5&#8419;";
    if(minutes == 6) minutes = "0&#8419;6&#8419;";
    if(minutes == 7) minutes = "0&#8419;7&#8419;";
    if(minutes == 8) minutes = "0&#8419;8&#8419;";
    if(minutes == 9) minutes = "0&#8419;9&#8419;";
    if(minutes == 10) minutes = "1&#8419;&#127358;";
    if(minutes == 11) minutes = "1&#8419;1&#8419;";
    if(minutes == 12) minutes = "1&#8419;2&#8419;";
    if(minutes == 13) minutes = "1&#8419;3&#8419;";
    if(minutes == 14) minutes = "1&#8419;4&#8419;";
    if(minutes == 15) minutes = "1&#8419;5&#8419;";
    if(minutes == 16) minutes = "1&#8419;6&#8419;";
    if(minutes == 17) minutes = "1&#8419;7&#8419;";
    if(minutes == 18) minutes = "1&#8419;8&#8419;";
    if(minutes == 19) minutes = "1&#8419;9&#8419;";
    if(minutes == 20) minutes = "2&#8419;&#127358;";
    if(minutes == 21) minutes = "2&#8419;1&#8419;";
    if(minutes == 22) minutes = "2&#8419;2&#8419;";
    if(minutes == 23) minutes = "2&#8419;3&#8419;";
    if(minutes == 24) minutes = "2&#8419;4&#8419;";
    if(minutes == 25) minutes = "2&#8419;5&#8419;";
    if(minutes == 26) minutes = "2&#8419;6&#8419;";
    if(minutes == 27) minutes = "2&#8419;7&#8419;";
    if(minutes == 28) minutes = "2&#8419;8&#8419;";
    if(minutes == 29) minutes = "2&#8419;9&#8419;";
    if(minutes == 30) minutes = "3&#8419;&#127358;";
    if(minutes == 31) minutes = "3&#8419;1&#8419;";
    if(minutes == 32) minutes = "3&#8419;2&#8419;";
    if(minutes == 33) minutes = "3&#8419;3&#8419;";
    if(minutes == 34) minutes = "3&#8419;4&#8419;";
    if(minutes == 35) minutes = "3&#8419;5&#8419;";
    if(minutes == 36) minutes = "3&#8419;6&#8419;";
    if(minutes == 37) minutes = "3&#8419;7&#8419;";
    if(minutes == 38) minutes = "3&#8419;8&#8419;";
    if(minutes == 39) minutes = "3&#8419;9&#8419;";
    if(minutes == 40) minutes = "4&#8419;&#127358;";
    if(minutes == 41) minutes = "4&#8419;1&#8419;";
    if(minutes == 42) minutes = "4&#8419;2&#8419;";
    if(minutes == 43) minutes = "4&#8419;3&#8419;";
    if(minutes == 44) minutes = "4&#8419;4&#8419;";
    if(minutes == 45) minutes = "4&#8419;5&#8419;";
    if(minutes == 46) minutes = "4&#8419;6&#8419;";
    if(minutes == 47) minutes = "4&#8419;7&#8419;";
    if(minutes == 48) minutes = "4&#8419;8&#8419;";
    if(minutes == 49) minutes = "4&#8419;9&#8419;";
    if(minutes == 50) minutes = "5&#8419;&#127358;";
    if(minutes == 51) minutes = "5&#8419;1&#8419;";
    if(minutes == 52) minutes = "5&#8419;2&#8419;";
    if(minutes == 53) minutes = "5&#8419;3&#8419;";
    if(minutes == 54) minutes = "5&#8419;4&#8419;";
    if(minutes == 55) minutes = "5&#8419;5&#8419;";
    if(minutes == 56) minutes = "5&#8419;6&#8419;";
    if(minutes == 57) minutes = "5&#8419;7&#8419;";
    if(minutes == 58) minutes = "5&#8419;8&#8419;";
    if(minutes == 59) minutes = "5&#8419;9&#8419;";

    if(hours == 0) hours = "&#127358;&#127358;";
    if(hours == 1) hours = "0&#8419;1&#8419;";
    if(hours == 2) hours = "0&#8419;2&#8419;";
    if(hours == 3) hours = "0&#8419;3&#8419;";
    if(hours == 4) hours = "0&#8419;4&#8419;";
    if(hours == 5) hours = "0&#8419;5&#8419;";
    if(hours == 6) hours = "0&#8419;6&#8419;";
    if(hours == 7) hours = "0&#8419;7&#8419;";
    if(hours == 8) hours = "0&#8419;8&#8419;";
    if(hours == 9) hours = "0&#8419;9&#8419;";
    if(hours == 10) hours = "1&#8419;&#127358;";
    if(hours == 11) hours = "1&#8419;1&#8419;";
    if(hours == 12) hours = "1&#8419;2&#8419;";
    if(hours == 13) hours = "1&#8419;3&#8419;";
    if(hours == 14) hours = "1&#8419;4&#8419;";
    if(hours == 15) hours = "1&#8419;5&#8419;";
    if(hours == 16) hours = "1&#8419;6&#8419;";
    if(hours == 17) hours = "1&#8419;7&#8419;";
    if(hours == 18) hours = "1&#8419;8&#8419;";
    if(hours == 19) hours = "1&#8419;9&#8419;";
    if(hours == 20) hours = "2&#8419;&#127358;";
    if(hours == 21) hours = "2&#8419;1&#8419;";
    if(hours == 22) hours = "2&#8419;2&#8419;";
    if(hours == 23) hours = "2&#8419;3&#8419;";
    if(hours == 24) hours = "&#127358;&#127358;";


    var time = hours + ':' + minutes;
    return time;
}
function timeStamps() {
    var date = new Date();
    let days = date.getDate();
    let month = date.getMonth();
    if(days == 0) days = "0&#8419;0&#8419;";
    if(days == 1) days = "0&#8419;1&#8419;";
    if(days == 2) days = "0&#8419;2&#8419;";
    if(days == 3) days = "0&#8419;3&#8419;";
    if(days == 4) days = "0&#8419;4&#8419;";
    if(days == 5) days = "0&#8419;5&#8419;";
    if(days == 6) days = "0&#8419;6&#8419;";
    if(days == 7) days = "0&#8419;7&#8419;";
    if(days == 8) days = "0&#8419;8&#8419;";
    if(days == 9) days = "0&#8419;9&#8419;";
    if(days == 10) days = "1&#8419;0&#8419;";
    if(days == 11) days = "1&#8419;1&#8419;";
    if(days == 12) days = "1&#8419;2&#8419;";
    if(days == 13) days = "1&#8419;3&#8419;";
    if(days == 14) days = "1&#8419;4&#8419;";
    if(days == 15) days = "1&#8419;5&#8419;";
    if(days == 16) days = "1&#8419;6&#8419;";
    if(days == 17) days = "1&#8419;7&#8419;";
    if(days == 18) days = "1&#8419;8&#8419;";
    if(days == 19) days = "1&#8419;9&#8419;";
    if(days == 20) days = "2&#8419;0&#8419;";
    if(days == 21) days = "2&#8419;1&#8419;";
    if(days == 22) days = "2&#8419;2&#8419;";
    if(days == 23) days = "2&#8419;3&#8419;";
    if(days == 24) days = "2&#8419;4&#8419;";
    if(days == 25) days = "2&#8419;5&#8419;";
    if(days == 26) days = "2&#8419;6&#8419;";
    if(days == 27) days = "2&#8419;7&#8419;";
    if(days == 28) days = "2&#8419;8&#8419;";
    if(days == 29) days = "2&#8419;9&#8419;";
    if(days == 30) days = "3&#8419;0&#8419;";
    if(days == 31) days = "3&#8419;1&#8419;";

    if(month == 0) month = "0&#8419;1&#8419;";
    if(month == 1) month = "0&#8419;2&#8419;";
    if(month == 2) month = "0&#8419;3&#8419;";
    if(month == 3) month = "0&#8419;4&#8419;";
    if(month == 4) month = "0&#8419;5&#8419;";
    if(month == 5) month = "0&#8419;6&#8419;";
    if(month == 6) month = "0&#8419;7&#8419;";
    if(month == 7) month = "0&#8419;8&#8419;";
    if(month == 8) month = "0&#8419;9&#8419;";
    if(month == 9) month = "0&#8419;10&#8419;";
    if(month == 10) month = "1&#8419;11&#8419;";
    if(month == 11) month = "1&#8419;12&#8419;";

    var datas = days + ':' + month + ': 2&#8419;0&#8419;1&#8419;8&#8419;';
    return datas;
}
setInterval(() => {
	uptime.sec++;
	if(uptime.sec == 60) {
		uptime.sec = 0;
		uptime.min += 1;
	}
	if(uptime.min == 60) {
		uptime.min = 0;
		uptime.hours += 1;
	}
	if(uptime.hours == 24) {
		uptime.hours = 0;
		uptime.days += 1;
	}
}, 1000);

setInterval(() => {
	bonus.sec++;
	if(bonus.sec == 60) {
		bonus.sec = 0;
		bonus.min -= 1;
	}
	if(bonus.min == 60) {
		bonus.min = 0;
		bonus.hours -= 1;
	}
	if(bonus.hours == 24) {
		bonus.hours = 0;
		bonus.days -= 1;
	}
}, 1000);

function updateStatus() {
user.api.status.set({
group_id: 190506705,
text: `${utils.pick([`👥 Игроков зарегистрировано: ${utils.sp(users.length)} игроков.`])}`});

}

updateStatus()
setInterval(updateStatus, 10000)
