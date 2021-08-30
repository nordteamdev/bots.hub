console.log('[Voldemar_Dev] >> Bot Monkey number one!');
const { VK, MarketAttachment, Keyboard } = require('vk-io');
const vk = new VK();
const commands = [];
const pezda = require('google-tts-api');
const request = require('prequest');
let user = new VK();
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
const donate_key = 'XIKL3YHJB37H2NHT46SH';
const bot_owner = 192957181;
let giving = true;
var wall_to_send = '';
const config = require('./config.json');
const settings = require('./settings.json');
const convers = require('./convers.json');

const cars = [

	[
		{ name: 'Самокат', cost: 500, 	speed: 3, id: 1 },
		{ name: 'Электросамокат', cost: 1000, speed: 5, id: 1 }
	],

	[
		{ name: 'Велосипед', cost: 2500, speed: 5, id: 2 },
		{ name: 'Горный Велосипед', cost: 5000, speed: 8, id: 2 }
	],

	[
		{ name: 'Гироскутер', cost: 5000, speed: 8, id: 3 },
		{ name: 'Улучшенный Гироскутер', cost: 10000, speed: 15, id: 3 }
	],

	[
		{ name: 'Сегвей', cost: 7500, speed: 15, id: 4 },
		{ name: 'Новый Сегвей', cost: 15000, speed: 28, id: 4 }
	],

	[
		{ name: 'Мопед', cost: 25000, speed: 25, id: 5 },
		{ name: 'Улучшенный Мопед', cost: 50000, speed: 45, id: 5 }
	],

	[
		{ name: 'Мотоцикл', cost: 50000, speed: 40, id: 6 },
		{ name: 'Гоночный Мотоцикл', cost: 100000, speed: 70, id: 6 }
	],

	[
		{ name: 'ВАЗ 2109', cost: 75000, speed: 60, id: 7 },
		{ name: 'Гоночный ВАЗ 2109', cost: 150000, speed: 110, id: 7 }
	],

	[
		{ name: 'Квадроцикл', cost: 80000, speed: 80, id: 8 },
		{ name: 'Новый Квадроцикл', cost: 170000, speed: 160, id: 8 }
	],

	[
		{ name: 'Багги', cost: 135000, speed: 90, id: 9 },
		{ name: 'Гоночный Багги', cost: 300000, speed: 180, id: 9 }
	],

	[
		{ name: 'Вездеход', cost: 200000, speed: 120, id: 10 },
		{ name: 'Улучшенный Вездеход', cost: 500000, speed: 220, id: 10 }
	],

	[
		{ name: 'Лада Xray', cost: 350000, speed: 150, id: 11 },
		{ name: 'Новая Лада Xray', cost: 800000, speed: 300, id: 11 }
	],

	[
		{ name: 'Audi Q7', cost: 750000, speed: 180, id: 12 },
		{ name: 'Новый Audi Q7', cost: 1600000, speed: 360, id: 12 }
	],

	[
		{ name: 'BMW X6', cost: 1000000, speed: 250, id: 13 },
		{ name: 'Новый BMW X6', cost: 2200000, speed: 500, id: 13 }
	],

	[
		{ name: 'Toyota FT-HS', cost: 1750000, speed: 320, id: 14 },
		{ name: 'Улучшенная Toyota FT-HS', cost: 3500000, speed: 600, id: 14 }
	],

	[
		{ name: 'BMW Z4 M', cost: 2500000, speed: 400, id: 15 },
		{ name: 'Новый BMW Z4 M', cost: 5200000, speed: 800, id: 15 }
	],

	[
		{ name: 'Subaru WRX STI', cost: 2750000, speed: 500, id: 16 },
		{ name: 'Новый Subaru WRX STI', cost: 5500000, speed: 900, id: 16 }
	],

	[
		{ name: 'Lamborghini Veneno', cost: 3000000, speed: 600, id: 17 },
		{ name: 'Улучшенная Lamborghini Veneno', cost: 6000000, speed: 1100, id: 17 }
	],

	[
		{ name: 'Tesla Roadster', cost: 4500000, speed: 800, id: 18 },
		{ name: 'Улучшенная Tesla Roadster', cost: 9500000, speed: 1600, id: 18 }
	],

	[
		{ name: 'Yamaha YZF R6', cost: 5000000, speed: 1200, id: 19 },
		{ name: 'Улучшенная Yamaha YZF R6', cost: 10000000, speed: 2200, id: 19 }
	],

	[
		{ name: 'Bugatti Chiron', cost: 6500000, speed: 1200, id: 20 },
		{ name: 'Улучшенная Bugatti Chiron', cost: 15000000, speed: 2500, id: 20 }
	],

	[
		{ name: 'Thrust SSC', cost: 35000000, speed: 2000, id: 21 },
		{ name: 'Улучшенный Thrust SSC', cost: 70000000, speed: 3800, id: 21 }
	],

	[
		{ name: 'Ferrari LaFerrari', cost: 39000000, speed: 2200, id: 22 },
		{ name: 'Speed Ferrari LaFerrari', cost: 100000000, speed: 5000, id: 22 }
	],

	[
		{ name: 'Koenigsegg Regear', cost: 50000000, speed: 3000, id: 23 },
		{ name: 'Koenigsegg Regear', cost: 150000000, speed: 6500, id: 23 }
	],

	[
		{ name: 'Speed Tesla Semi', cost: 75000000, speed: 4000, id: 24 },
		{ name: 'Speed Tesla Semi', cost: 200000000, speed: 9000, id: 24 }
	],

	[
		{ name: 'Venom GT', cost: 125000000, speed: 4500, id: 25 },
		{ name: 'Speed Venom GT', cost: 300000000, speed: 9000, id: 25 },
		{ name: 'Гоночный Venom GT', cost: 700000000, speed: 19000, id: 25 }
	],

	[
		{ name: 'Rolls-Royce', cost: 200000000, speed: 5500, id: 26 },
		{ name: 'Speed Rolls-Royce', cost: 2000000000, speed: 50000, id: 26 },
		{ name: 'Гоночный Rolls-Royce', cost: 10000000000, speed: 220000, id: 26 }
	],

	[
		{ name: 'Машина времени', cost: 3000000000, speed: 70000, id: 27 },
		{ name: 'Атомная машина', cost: 10000000000, speed: 210000, id: 27 },
		{ name: 'Световая машина', cost: 30000000000, speed: 500000, id: 27 }
	],

	[
		{ name: 'Телепорт', cost: 1000000000000, speed: 3000000, id: 28 },
		{ name: 'Улучшенный телепорт', cost: 10000000000000, speed: 25000000, id: 28 },
		{ name: 'Лучший телепорт', cost: 10000000000000, speed: 200000000, id: 28 }
	],

	[
		{ name: 'Тачка администратора', cost: 5000000000, speed: 100000, id: 29 }
	]
];

const pets = [

[
	{ name: 'Хомяк', cost: 10000, min: 1000, max: 5000, id: 1, icon: '🐹' },
	{ name: 'Хомяк', cost: 50000, min: 3000, max: 10000, id: 1, icon: '🐹' }
],

[
	{ name: 'Черепаха', cost: 25000000, min: 1000000, max: 9000000, id: 2, icon: '🐢' },
	{ name: 'Черепаха', cost: 100000000, min: 300000, max: 1500000, id: 2, icon: '🐢' }
],

[
	{ name: 'Оцелот', cost: 100000000, min: 230000, max: 1200000, id: 3, icon: '🐈' },
	{ name: 'Оцелот', cost: 1000000000, min: 2500000, max: 13000000, id: 3, icon: '🐈' }
],

[
	{ name: 'Свинка', cost: 3000000000, min: 70000000, max: 200000000, id: 4, icon: '🐷' },
	{ name: 'Свинка', cost: 6000000000, min: 120000000, max: 350000000, id: 4, icon: '🐷' }
],

[
	{ name: 'Лиса', cost: 30000000000, min: 300000000, max: 1000000000, id: 5, icon: '🦊' },
	{ name: 'Лиса', cost: 90000000000, min: 700000000, max: 2500000000, id: 5, icon: '🦊' }
],

[
	{ name: 'Собака', cost: 100000000000, min: 750000000, max: 3000000000, id: 6, icon: '🐶' },
	{ name: 'Собака', cost: 200000000000, min: 1000000000, max: 4000000000, id: 6, icon: '🐶' }
],

[
	{ name: 'Панда', cost: 300000000000, min: 1000000000, max: 2000000000, id: 7, icon: '🐼' },
	{ name: 'Панда', cost: 900000000000, min: 3000000000, max: 9000000000, id: 7, icon: '🐼' }
],

[
	{ name: 'Волк', cost: 1000000000000, min: 3500000000, max: 9500000000, id: 8, icon: '🐺' },
	{ name: 'Волк', cost: 1500000000000, min: 3800000000, max: 12000000000, id: 8, icon: '🐺' },
	{ name: 'Волк', cost: 3000000000000, min: 7000000000, max: 22000000000, id: 8, icon: '🐺' }
],

[
	{ name: 'Робот', cost: 9000000000000, min: 10000000000, max: 20000000000, id: 9, icon: '🤖' },
	{ name: 'Робот', cost: 18000000000000, min: 20000000000, max: 50000000000, id: 9, icon: '🤖' },
	{ name: 'Робот', cost: 40000000000000, min: 40000000000, max: 70000000000, id: 9, icon: '🤖' }
],

[
	{ name: 'Мартышка', cost: 250000000000000, min: 80000000000, max: 120000000000, id: 10, icon: '🐵' }
],

[
	{ name: 'Шмель', cost: 100000000, min: 230000, max: 1200000, id: 11, icon: '🐝' },
	{ name: 'Шмель', cost: 1000000000, min: 2500000, max: 13000000, id: 11, icon: '🐝' }
]
];

const chasii = [
	{ name: 'Xiaomi Mi Band', cost: 5000, id: 1 },
	{ name: 'Apple Watch 3', cost: 5000000, id: 2 },
	{ name: 'Tourbillon Sapphire', cost: 30000000, id: 3 },
	{ name: 'Rolex Reference 6062', cost: 100000000, id: 4 },
	{ name: 'Patek Phillippe Caliber', cost: 300000000, id: 5 },
	{ name: 'Часы-татуировка', cost: 700000000, id: 6 },
	{ name: 'Ben 10 Omnitrix Ultimate', cost: 3000000000, id: 7 },
	{ name: 'Patek Philippe Ref. 1518', cost: 30000000000, id: 8 },
	{ name: 'Joaillene Manchette', cost: 100000000000, id: 9 },
	{ name: 'Часы Винкс', cost: 700000000000, id: 10 }
];

const works = [
	{ name: 'Дворник', requiredLevel: 1, min: 5000, max: 25000, icon: '🎅', id: 1 },
	{ name: 'Сантехник', requiredLevel: 15, min: 7000, max: 30000, icon: '🛀', id: 2 },
	{ name: 'Электрик', requiredLevel: 30, min: 15000, max: 77000, icon: '👨‍🏭', id: 3 },
	{ name: 'Слесарь', requiredLevel: 80, min: 50000, max: 280000, icon: '👨‍🔧', id: 4 },
	{ name: 'Юрист', requiredLevel: 200, min: 120000, max: 666666, icon: '👨‍⚖', id: 5 },
	{ name: 'Бухгалтер', requiredLevel: 350, min: 200000, max: 999999, icon: '💁‍♀', id: 6 },
	{ name: 'Бармен', requiredLevel: 500, min: 250000, max: 1200000, icon: '💃', id: 7 },
	{ name: 'Админ', requiredLevel: 800, min: 3000000, max: 18000000, icon: '👨‍💻', id: 8 },
	{ name: 'Хакер', requiredLevel: 5000, min: 35000000, max: 100000000, icon: '🤖', id: 9 },
	{ name: 'Бизнесмен', requiredLevel: 12000, min: 100000000, max: 400000000, icon: '💼', id: 10 }
];

const yachts = [
	{ name: 'Ванна', cost: 10000, id: 1 },
	{ name: 'Nauticat 331', cost: 10000000, id: 2 },
	{ name: 'Nordhavn 56 MS', cost: 15000000, id: 3 },
	{ name: 'Princess 60', cost: 25000000, id: 4 },
	{ name: 'Azimut 70', cost: 35000000, id: 5 },
	{ name: 'Dominator 40M', cost: 50000000, id: 6 },
	{ name: 'Moonen 124', cost: 60000000, id: 7 },
	{ name: 'Wider 150', cost: 65000000, id: 8 },
	{ name: 'Palmer Johnson 42M SuperSport', cost: 80000000, id: 9 },
	{ name: 'Wider 165', cost: 85000000, id: 10 },
	{ name: 'Eclipse', cost: 150000000, id: 11 },
	{ name: 'Dubai', cost: 300000000, id: 12 },
	{ name: 'Streets of Monaco', cost: 750000000, id: 13 },
	{ name: 'Яхта Папы Римского', cost: 3000000000, id: 14 },
	{ name: 'Живучий китаец', cost: 3500000000, id: 15 }
];

const airplanes = [
	{ name: 'Параплан', cost: 100000, id: 1 },
	{ name: 'АН-2', cost: 350000, id: 2 },
	{ name: 'Cessna-172E', cost: 700000, id: 3 },
	{ name: 'Supermarine Spitfire', cost: 1000000, id: 4 },
	{ name: 'BRM NG-5', cost: 1400000, id: 5 },
	{ name: 'Cessna T210', cost: 2600000, id: 6 },
	{ name: 'Beechcraft 1900D', cost: 5500000, id: 7 },
	{ name: 'Cessna 550', cost: 8000000, id: 8 },
	{ name: 'Hawker 4000', cost: 22400000, id: 9 },
	{ name: 'Learjet 31', cost: 45000000, id: 10 },
	{ name: 'Airbus A318', cost: 85000000, id: 11 },
	{ name: 'F-35A', cost: 160000000, id: 12 },
	{ name: 'Boeing 747-430 Custom', cost: 225000000, id: 13 },
	{ name: 'C-17A Globemaster III', cost: 350000000, id: 14 },
	{ name: 'F-22 Raptor', cost: 400000000, id: 15 },
	{ name: 'Airbus 380 Custom', cost: 600000000, id: 16 },
	{ name: 'B-2 Spirit Stealth Bomber', cost: 1359000000, id: 17 },
	{ name: 'Космический корабль', cost: 15000000000, id: 18 },
	{ name: 'НЛО', cost: 120000000000, id: 19 },
	{ name: 'Межгалактический транспорт', cost: 3000000000, id: 20 },
	{ name: 'Самолёт с порноактрисами', cost: 2000000000, id: 21 },
	{ name: 'Ковёр-Самолёт', cost: 3000000000, id: 22 },
	{ name: 'Пиздакрыл', cost: 4000000000, id: 23 },
	{ name: 'Бумажный самолётик', cost: 4000000000, id: 24 }
];

const helicopters = [
	{ name: 'Шарик с пропеллером', cost: 150, id: 1 },
	{ name: 'RotorWay Exec 162F', cost: 300000, id: 2 },
	{ name: 'Robinson R44', cost: 450000, id: 3 },
	{ name: 'Hiller UH-12C', cost: 1300000, id: 4 },
	{ name: 'AW119 Koala', cost: 2500000, id: 5 },
	{ name: 'MBB BK 117', cost: 4000000, id: 6 },
	{ name: 'Eurocopter EC130', cost: 7500000, id: 7 },
	{ name: 'Leonardo AW109 Power', cost: 10000000, id: 8 },
	{ name: 'Sikorsky S-76', cost: 15000000, id: 9 },
	{ name: 'Bell 429WLG', cost: 19000000, id: 10 },
	{ name: 'NHI NH90', cost: 35000000, id: 11 },
	{ name: 'Kazan Mi-35M', cost: 60000000, id: 12 },
	{ name: 'Bell V-22 Osprey', cost: 135000000, id: 13 },
	{ name: 'Вертолет из ГТА', cost: 3000000000, id: 14 },
	{ name: 'Летучий китаец', cost: 3000000000, id: 15 },
	{ name: 'Вертолет из ГТА', cost: 3000000000, id: 16 },
	{ name: 'Стальная муха', cost: 2000000000, id: 17 },
	{ name: 'Мясорубка', cost: 3000000000, id: 18 }
];

const homes = [
	{ name: 'Коробка из-под холодильника', cost: 250, id: 1 },
	{ name: 'Подвал', cost: 3000, id: 2 },
	{ name: 'Палатка', cost: 3500, id: 3 },
	{ name: 'Домик на дереве', cost: 5000, id: 4 },
	{ name: 'Полуразрушенный дом', cost: 10000, id: 5 },
	{ name: 'Дом в лесу', cost: 25000, id: 6 },
	{ name: 'Деревянный дом', cost: 37500, id: 7 },
	{ name: 'Дача', cost: 125000, id: 8 },
	{ name: 'Кирпичный дом', cost: 800000, id: 9 },
	{ name: 'Коттедж', cost: 4500000, id: 10 },
	{ name: 'Особняк', cost: 12500000, id: 11 },
	{ name: 'Дом на Рублёвке', cost: 50000000, id: 12 },
	{ name: 'Личный небоскрёб', cost: 70000000, id: 13 },
	{ name: 'Остров с особняком', cost: 125000000, id: 14 },
	{ name: 'Белый дом', cost: 200000000, id: 15 },
	{ name: 'Букингемский дворец', cost: 1500000000, id: 16 },
	{ name: 'Название потом придумаю', cost: 1500000000, id: 17 },
	{ name: 'АШАН', cost: 2500000000, id: 18 },
	{ name: 'Механический дом из Майнкрафта', cost: 50000000000, id: 19 },
	{ name: 'Собственная планета', cost: 2500000000, id: 20 }
];

const apartments = [
	{ name: 'Чердак', cost: 15000, id: 1 },
	{ name: 'Квартира в общежитии', cost: 55000, id: 2 },
	{ name: 'Однокомнатная квартира', cost: 175000, id: 3 },
	{ name: 'Двухкомнатная квартира', cost: 260000, id: 4 },
	{ name: 'Четырехкомнатная квартира', cost: 500000, id: 5 },
	{ name: 'Квартира в центре Москвы', cost: 1600000, id: 6 },
	{ name: 'Двухуровневая квартира', cost: 4000000, id: 7 },
	{ name: 'Квартира с Евроремонтом', cost: 6000000, id: 8 },
	{ name: 'Аппартаменты La Belle Epoque', cost: 335000000, id: 9 },
	{ name: 'Пещера для вписки', cost: 1500000000, id: 10 },
	{ name: 'Крутая квартира', cost: 1500000000, id: 11 },
	{ name: 'Хата с проститутками', cost: 1500000000, id: 12 },
	{ name: 'Мусорный бак', cost: 10000, id: 13 }
];

const secret = [
	{ name: '🚘 VIP-AUTO', id: 1 },
	{ name: '🛸 Световой дрон', id: 2 },
	{ name: '🚲 Велосипед', id: 3 },
	{ name: '🚃 Дом на колёсах', id: 4 },
	{ name: '🏩 Особняк с проститутками', id: 5 },
	{ name: '⛴ Яхта с турбо ускорителем', id: 6 },
	{ name: '👩 Personal slut', id: 7 },
	{ name: '⛄ Снеговик Олух', id: 8 },
	{ name: '🎅 Сани Деда Мороза', id: 9 }
];

const phones = [
	{ name: 'Nokia 108', cost: 250, id: 1 },
	{ name: 'Nokia 3310 (2017)', cost: 500, id: 2 },
	{ name: 'ASUS ZenFone 4', cost: 2000, id: 3 },
	{ name: 'BQ Aquaris X', cost: 10000, id: 4 },
	{ name: 'Sony Xperia XA', cost: 15000, id: 5 },
	{ name: 'Samsung Galaxy S8', cost: 30000, id: 6 },
	{ name: 'Xiaomi Mi Mix', cost: 50000, id: 7 },
	{ name: 'Torex FS1', cost: 75000, id: 8 },
	{ name: 'iPhone X', cost: 100000, id: 9 },
	{ name: 'Мегафон С1', cost: 250000, id: 10 },
	{ name: 'Falcon SuperNova', cost: 50000000, id: 11 },
	{ name: 'Banana', cost: 1000000000, id: 12 },
	{ name: 'Banana', cost: 1000000000, id: 13 },
	{ name: 'Banana', cost: 1000000000, id: 14 },
	{ name: 'Телепатическая связь', cost: 2000000000, id: 15 }
];

const farms = [
	{ name: '6U Nvidia', cost: 20500000, id: 1 },
	{ name: 'AntminerS9', cost: 100000000, id: 2 },
	{ name: 'FM2018-BT200', cost: 900000000, id: 3 },
	{ name: 'Supreme Miner', cost: 5000000000, id: 4 }
];

const businesses = [

[
{ name: 'Шаурмечная', cost: 15000, earn: 500, workers: 1, id: 1, icon: '🌯'},
{ name: '5 шаурмечных', cost: 75000, earn: 1200, workers: 10, id: 1, icon: '🌯'},
{ name: 'Небольшая сеть шаурмечных', cost: 900000, earn: 3000, workers: 30, id: 1, icon: '🌯'},
{ name: 'Средняя сеть шаурмечных', cost: 1200000, earn: 4000, workers: 50, id: 1, icon: '🌯'},
{ name: 'Лучшая шаурма в стране', cost: 4000000, earn: 18000, workers: 200, id: 1, icon: '🌯'}
],

[
{ name: 'Ларёк', cost: 500000, earn: 3000, workers: 1, id: 2, icon: '🏪'},
{ name: '5 ларьков', cost: 2500000, earn: 13000, workers: 5, id: 2, icon: '🏪'},
{ name: 'Средняя сеть ларьков', cost: 5000000, earn: 25000, workers: 40, id: 2, icon: '🏪'},
{ name: 'Ларьки во всех городах страны', cost: 15000000, earn: 120000, workers: 150, id: 2, icon: '🏪'},
{ name: 'Ларьки в каждой стране', cost: 50000000, earn: 400000, workers: 400, id: 2, icon: '🏪'}
],

[
{ name: 'Бар', cost: 900000, earn: 5000, workers: 3, id: 3, icon: '🍷'},
{ name: 'Расширенный бар', cost: 2000000, earn: 11000, workers: 7, id: 3, icon: '🍷'},
{ name: 'Ночной клуб', cost: 4500000, earn: 25000, workers: 15, id: 3, icon: '🍷'},
{ name: 'Клуб на колесах', cost: 10000000, earn: 60000, workers: 80, id: 3, icon: '🍷'},
{ name: 'Лучший клуб на колесах в стране', cost: 100000000, earn: 450000, workers: 300, id: 3, icon: '🍷'}
],

[
{ name: 'Мини-магазин', cost: 5000000, earn: 35000, workers: 15, id: 4, icon: '🏫'},
{ name: 'Магазин', cost: 12500000, earn: 93500, workers: 35, id: 4, icon: '🏫'},
{ name: 'Сеть магазинов', cost: 30000000, earn: 233500, workers: 70, id: 4, icon: '🏫'},
{ name: 'Сеть супермаркетов', cost: 2000000000, earn: 7500000, workers: 500, id: 4, icon: '🏫'}
],

[
{ name: 'Завод в гараже', cost: 15000000, earn: 210000, workers: 5, id: 5, icon: '🏭'},
{ name: 'Средний завод', cost: 35000000, earn: 400000, workers: 20, id: 5, icon: '🏭'},
{ name: 'Сеть заводов', cost: 150000000, earn: 1300000, workers: 200, id: 5, icon: '🏭'},
{ name: 'Главные заводы страны', cost: 3000000000, earn: 8000000, workers: 1000, id: 5, icon: '🏭'}
],

[
{ name: 'Угольная шахта', cost: 250000000, earn: 3200000, workers: 50, id: 6, icon: '⛏'},
{ name: 'Золотая шахта', cost: 600000000, earn: 7000000, workers: 75, id: 6, icon: '⛏'},
{ name: 'Алмазная шахта', cost: 1500000000, earn: 16000000, workers: 200, id: 6, icon: '⛏'},
{ name: 'Алмазный карьер', cost: 5000000000, earn: 50000000, workers: 360, id: 6, icon: '⛏'},
{ name: 'Крупнейший алмазный карьер', cost: 15000000000, earn: 170000000, workers: 700, id: 6, icon: '⛏'}
],

[
{ name: 'Бордель', cost: 900000000, earn: 7000000, workers: 10, id: 7, icon: '💒'},
{ name: 'Большой бордель', cost: 1800000000, earn: 16000000, workers: 60, id: 7, icon: '💒'},
{ name: 'Сеть борделей', cost: 5000000000, earn: 35000000, workers: 200, id: 7, icon: '💒'},
{ name: 'Лучшие бордели страны', cost: 10000000000, earn: 65000000, workers: 700, id: 7, icon: '💒'}
],

[
{ name: 'Разработка игр', cost: 5000000000, earn: 20000000, workers: 5, id: 8, icon: '🕹'},
{ name: 'СРУТЕК', cost: 10000000000, earn: 35000000, workers: 10, id: 8, icon: '🕹'},
{ name: 'Крупная компания разработки игр', cost: 20000000000, earn: 67000000, workers: 50, id: 8, icon: '🕹'},
{ name: 'Мировая компания по разработке игр', cost: 60000000000, earn: 280000000, workers: 500, id: 8, icon: '🕹'}
],

[
{ name: 'Нефтевышка в пустыне', cost: 30000000000, earn: 100000000, workers: 8, id: 9, icon: '🏜'},
{ name: 'Нефтеплатформа в море', cost: 50000000000, earn: 200000000, workers: 20, id: 9, icon: '🏜'},
{ name: 'Нефтеплатформа в океане', cost: 100000000000, earn: 400000000, workers: 50, id: 9, icon: '🏜'},
{ name: '5 нефтеплатформ в океане', cost: 200000000000, earn: 700000000, workers: 250, id: 9, icon: '🏜'}
],

[
{ name: 'Мини АЭС', cost: 100000000000, earn: 200000000, workers: 40, id: 10, icon: '💡'},
{ name: 'Средняя АЭС', cost: 200000000000, earn: 400000000, workers: 75, id: 10, icon: '💡'},
{ name: 'АЭС с 5 энергоблоками', cost: 400000000000, earn: 700000000, workers: 300, id: 10, icon: '💡'},
{ name: 'Крупнейшая АЭС', cost: 800000000000, earn: 1400000000, workers: 650, id: 10, icon: '💡' }
],

[
{ name: 'Небольшое казино', cost: 500000000000, earn: 1000000000, workers: 75, id: 11, icon: '🎰'},
{ name: 'Среднее казино', cost: 1000000000000, earn: 2000000000, workers: 150, id: 11, icon: '🎰'},
{ name: 'Сеть игровых заведений', cost: 2000000000000, earn: 4200000000, workers: 250, id: 11, icon: '🎰'},
{ name: 'Казино по всей Европе', cost: 4000000000000, earn: 8500000000, workers: 500, id: 11, icon: '🎰'},
{ name: 'Сеть казино в развитых странах', cost: 8000000000000, earn: 17000000000, workers: 1000, id: 11, icon: '🎰'},
{ name: 'Сеть нелегальных казино по всему миру', cost: 16000000000000, earn: 35000000000, workers: 1500, id: 11, icon: '🎰'}
],

[
{ name: 'Финансовый рынок', cost: 400000000000000, earn: 200000000000, workers: 5000, id: 12, icon: '📈'}
]

];

const quests = [
	{ name: 'Выиграйте в трейде 4 раза подряд', reward: 500000000, actions: 4 },
	{ name: 'Угадайте стаканчик 3 раза подряд', reward: 700000000, actions: 3 },
	{ name: 'Угадайте кубик 2 раза подряд', reward: 1000000000, actions: 2 },
	{ name: 'Выиграйте в казино 8 раз подряд', reward: 10000000000, actions: 8 },
	{ name: 'Выиграйте в рулетке 10 раз подряд', reward: 20000000000, actions: 10 }
]

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
			e = d + ['', ' тыс.', ' млн.', ' млрд.', ' трлн.', ' трлд.'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, ' много.');

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
	u: 'n',
	i: 'ᴉ',
	o: 'o',
	p: 'd',
	a: 'ɐ',
	s: 's',
	d: 'p',
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

let clans = require('./clans.json');
let botinfo = require('./botinfo.json');
let users = require('./users.json');
let chats = require('./chats.json');
let buttons = [];

function addZero(i){ 
return (i < 10)? "0" + i: i; 
}

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

		if(x.misc.farm === 4)
		{
			x.farm_btc += 500;
		}
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.bank > 10000).map(x=> {

	x.bank += Math.floor(x.bank * 0.0001)
	
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

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 60000);

async function saveConfig()
{
	require('fs').writeFileSync('./config.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveChats()
{
	require('fs').writeFileSync('./chats.json', JSON.stringify(users, null, '\t'));
	return true;
}

function clearPromo() 
{
promo = 0; 
users.map(user => { 
user.promo = false;
}); 
} 

function clearPornoo() 
{
promo = 0; 
users.map(user => { 
user.porno = false; 
}); 
}

function getUnix() {
	return Date.now();
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

    text += addZero(Math.floor(h)) + ":";
    text += addZero(Math.floor(m)) + ":";
    text += addZero(Math.floor(s)) + " ";

	return text;
}

function unixStampLefta(stampa) {
	stampa = stampa / 1000;

	let s = stampa % 60;
	stampa = ( stampa - s ) / 60;

	let m = stampa % 60;
	stampa = ( stampa - m ) / 60;

	let	h = ( stampa ) % 24;
	let	d = ( stampa - h ) / 24;

	let text = ``;

    if(m > 0) text += addZero(Math.floor(m)) + " мин. ";
    if(s > 0) text += addZero(Math.floor(s)) + " сек.";

	return text;
}

function unixStamp() {
	let date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${addZero(month)}.${year} в ${hour}:${mins}:${secs}`;
}

function generateKeyboard(array) { 
let kb = []; 
if(array.length > 40) return false; 

for (let i = 0; i < 10; i += 1) { 
if(!array.slice(i * 4, i * 4 + 4)[0]) break; 
kb.push(array.slice(i * 4, i * 4 + 4)); 
} 

kb.map((arr) => { 
arr.map((button, i) => { 
arr[i] = Keyboard.textButton({ label: button }); 
}); 
}); 

return Keyboard.keyboard(kb); 
}

setInterval(() => {
			fs.writeFileSync("./clans.json", JSON.stringify(clans, null, "\t"));
			fs.writeFileSync("./botinfo.json", JSON.stringify(botinfo, null, "\t"));
			fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
			fs.writeFileSync("./users.json", JSON.stringify(users, null, "\t"));
			fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t"));
}, 15003);

vk.setOptions({ token: '5a4b6da4ce8146b65a1fbe188f89d862b39f1c96fb772cf953118e3deccb359445c2adbbcd530995e41b8', pollingGroupId: 192957181   });
const { updates, snippets } = vk;

updates.startPolling();
let mentionRegexp = new RegExp(`\\[club191380914\\|(.*)\\]`);
let mentionRegexp1 = new RegExp(`\\/`);
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, "").trim();
	if(mentionRegexp1.test(message.text)) message.text = message.text.replace(mentionRegexp1, "").trim();
	
	if(message.subTypes == 'chat_invite_user' && message.payload.action.member_id == -192957181){
	const confach = utils.pick([16159, 15121, 12673, 5239]);
	message.sendSticker(confach);
	message.send(`Спасибо за приглашение!
Выражаем вам огромную благодарность за добавление бота в беседу 💞

📮 Выдайте доступ ко всей переписке или права администратора, но если вы не создатель беседы, пользоваться ботом можно через упоминания.
Пример: @botmendes баланс`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}
	const command = commands.find(x=> x[0].test(message.text));
	if(!command){
		if(message.isChat) return;
	}
	if(!message.text){
		if(message.isChat) return;
	}
	message.user = users.find(x=> x.id === message.senderId);
	if(!message.user)
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			polnom: 0,
			foolder: 0,
			pet: [],
			admin: false,
			anti: false,
			grabim: false,
			balance: 100000000,
			aue: false,
			ag: false,
			lol: false,
			mda: false,
			nep: false,
			kavooo: false,
			zapas: false,
			porno: false,
			vzlom: false,
			promo: false,
			odmen: false,
			vip: false,
			hardcore: false,
			premium: false,
			bank: 0,
			btc: 0,
			case: 0,
			bral1: 0,
			kredit1: false,
			limipered1: false,
			peremena1: false,
			ktokto1: 0,
			rozetka1: false,
			semion1: 1,
			hrust1: false,
			mts1: false,
			bablo1: 0,
			pizdenka1: false,
			lte1: false,
			neebu1: 10,
			krutoi1: false,
			bral2: 0,
			kredit2: false,
			limipered2: false,
			peremena2: false,
			ktokto2: 0,
			rozetka2: false,
			semion2: 1,
			hrust2: false,
			mts2: false,
			bablo2: 0,
			pizdenka2: false,
			lte2: false,
			tur: 0,
			dostuptur: 0,
			neebu2: 10,
			krutoi2: false,
			farm_btc: 0,
			deados: 0,
			farm_ddos: 0,
			clanid: false,
			clanprig: [],
			biz: 0,
			case1: 0,
			case2: 0,
			case3: 0,
			case4: 0,
			rating: 0,
			comTimer: 10,
			regDate: `${unixStamp()}`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false, 
				bonus: false
			},
			tag: user_info.first_name,
			work: 0,
			business: [],
			notifications: true,
			exp: 10,
			level: 1,
			button: [],
			buttoncount: 0,
			referal: null,
			roulette: -1,
			roulette_bet: 0,
			transport: {
				car: [],
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
			ddos: {
				dedik: 0,
				dedik_count: 0
			},
			marriage: {
				partner: 0,
				requests: []
			},
			limit: {
				timer: utils.time(),
				sent: 0
			},
			limitdon: {
				timerdon: utils.time(),
			sentdon: 0
			},
			limitadm: {
				timeradm: utils.time(),
			sentadm: 0
			}
		});

		if('ref' in message.payload){
		message.user = users.find(x=> x.id === message.senderId);
			let ref = utils.random(73, 80);
			let reffeer = users.find(x => x.id == message.payload.ref);

			if (reffeer != undefined){
				if(ref != 77){
				message.user.balance += 3000000000;
				vk.api.messages.send({ user_id: message.senderId, message: `[id${message.senderId}|${user_info.first_name}], вас пригласил [id${reffeer.id}|${reffeer.tag}]!
💥 На ваш счёт было зачислено 3.000.000.000$`})

				reffeer.balance += 3000000000;
				reffeer.bral1 += 1;
				vk.api.messages.send({ user_id: reffeer.id, message: `[id${reffeer.id}|${reffeer.tag}], вы пригласили друга [id${message.senderId}|${user_info.first_name}]!
💥 На ваш счёт было зачислено 3.000.000.000$`})
			}else{
				message.user.balance += 3000000000;
				vk.api.messages.send({ user_id: message.senderId, message: `[id${message.senderId}|${user_info.first_name}], вас пригласил [id${reffeer.id}|${reffeer.tag}]!
💥 На ваш счёт было зачислено 3.000.000.000$`})

				reffeer.balance += 3000000000;
				reffeer.bral1 += 1;
				reffeer.case += 1;
				vk.api.messages.send({ user_id: reffeer.id, message: `[id${reffeer.id}|${reffeer.tag}], вы пригласили друга [id${message.senderId}|${user_info.first_name}]!
💥 На ваш счёт было зачислено 3.000.000.000$
🎁 Вам начислен Lucky-Кейс за друга!`})
			}
		}
	}
		
	}
	if(!message.user){
	message.user = users.find(x=> x.id === message.senderId);
	}
	
	const bot = (text, params) => {
	return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if(message.user.pizdenka1 > getUnix()){
	if(!message.isChat){
	return message.send(`⛔ Вы заблокированы, разблокировка будет через ${unixStampLeft(message.user.pizdenka1 - Date.now())}`, {attachment:''});
	}else{
	return;	
		}
	}

	if(message.user.ban == true){ 
	if(!message.isChat){
	message.send(`⛔ Вы заблокированы навсегда.`, {attachment:''});
	return;
	}else{
	return;	
		}
	}

	if(message.user.nep == false)
	{
	if(!message.isChat){
	const priva = utils.pick([12970, 13361, 14409, 7388, 8782, 12710, 13828, 5937]);
	bot(`я вижу ты впервые! Рад познакомиться, держи 100.000.000$ в ПОДАРОК! 🤑

Бизнесы, питомцы, браки, кланы и многое другое — отправь «помощь» для просмотра команд 📚

Беседа с ботом:`,
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"66\"}", 
"label": "📚 Помощь"
}, 
"color": "positive"
} 
] 
] 
})
});
message.sendSticker(priva);
}else{
if(message.subTypes == "chat_kick_user") return;
const priv = utils.pick([12970, 13361, 14409, 7388, 8782, 12710, 13828, 5937]);
message.sendSticker(priv);
message.send(`👋 @id${message.user.id} (${message.user.tag}), я вижу ты впервые! Рад познакомиться, держи 100.000.000$ в ПОДАРОК! 🤑

🔥 Я — КРУТОЙ игровой БОТ! Начни играть прямо сейчас!
🎲 Начать игру: vk.me/botmendes

📚 Получи помощь по боту, написав команду /помощь`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
}

		message.user.nep = true;
		return;
	}

	if(!command){
		if(!message.isChat) return message.send(`❌ ${message.user.tag}, команда не найдена!
📚 Посмотри список команд, написав «помощь»`);
		return;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);
	console.log(`message: ${message.text}`)
});

updates.on(`new_wall_comment`, async(context) => {
	if(Number(context.userId) <= 0) return;
	let user = users.find(x=> x.id === context.userId);
	if(!user){
		vk.api.call("wall.createComment", {
			owner_id: context.ownerId,
			post_id: context.objectId,
			reply_to_comment: context.id,
			message: `❌ Для начала отправьте любое сообщение боту — vk.me/botmendes`
		});
	
		return;
	}

if((user && user.comTimer > getUnix()) || context.userId < 1){
	if(user.peremena2 == true){
		return;
	}else{
			vk.api.call("wall.createComment", {
			owner_id: context.ownerId,
			post_id: context.objectId,
			reply_to_comment: context.id,
			message: `❌ Следующий бонус через ${unixStampLefta(user.comTimer - Date.now())}`
		});
			user.peremena2 = true;
		return;
	}
}
	let rand = utils.random(500000, 10000000);
	user.balance = Number(user.balance) + Number(rand);
	user.comTimer = getUnix() + 60000;
	user.peremena2 = false;
	
	vk.api.call("wall.createComment", {
		owner_id: context.ownerId,
		post_id: context.objectId,
		reply_to_comment: context.id,
		message: `✅ Вы получили очень много денег (${utils.sp(rand)}$)`
	});

});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:реф|👥 Реф|рефка|рефералка|реферал|друг|деньги за друзей|ref|referal|🎲 Реф|🎲Реф)$/i, async (message, bot) => {
	let link = await vk.api.utils.getShortLink({ url: `vk.me/botmendes?ref=${message.user.id}` })
	return bot(`всего приглашено: ${utils.sp(message.user.bral1)}

✅ У Вас есть специальная ссылка на бота, которую Вы можете рассылать кому угодно: ${link.short_url}

🚨 Для копирования ссылки на телефоне, задержи на ней палец и нажми «Копировать»`)
});

cmd.hear(/^(?:id|айди|ид)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`ваш игровой ID: ${message.user.uid} ${luckych}`);
});

/*
updates.on(`group_leave`, async(context) => {
	let user = users.find(x=> x.id === context.userId);
	vk.api.call("message.send", { 
		user_id: user.id, 
		message: `${utils.pick([`💔`,`😰`,`😓`,`😿`])} [id${user.id}|${user.tag}], не уходи, пожалуйста.`
	});
});
*/

cmd.hear(/^(?:евалл)\s([^]+)$/i, async (message, bot) => {
if(message.polnom < 10) return bot(`ты кто👍🏻`);

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

cmd.hear(/^(?:помощь|помощ|помошь|помош|📚 Помощь|, 📚 Помощь|📚Помощь|команды|меню|хелп|help|commands|cmds|menu|rjvfyls|yfxfnm|начать|start|старт|"начать"|"Начать"|«помощь»|«меню»)$/i, async (message, bot) => {
if(message.user.lte2 == false){
return bot(`список команд:

🔥 Мой профиль:
⠀⠀👤 Профиль
⠀⠀🔖 Ник
⠀⠀👑 Рейтинг
⠀⠀💳 Банк
⠀⠀⚔ Клан
⠀⠀❤ Брак
⠀⠀👒 Квесты
⠀⠀🎁 Бонус
⠀⠀🛍 Купить/Продать
⠀⠀🤝 Передать — перевод денег
⠀⠀👥 Реф — деньги за друзей

🦊 Питомцы
👔 Работать
💼 Бизнес
💱 Курс
🔋 Ферма
⭐ Донат
🎄 Взлом подарка

🔔 Уведомления [вкл/выкл]
⌨ Кнопки [текст/удалить]
🆘 Репорт

🌐 Разное:
⠀⠀🙉 Анекдот
⠀⠀↪ Переверни [фраза]
⠀⠀🔁 Скажи [фраза] — синтез речи
⠀⠀🗣 Макака [фраза] — общение
⠀⠀🔮 Шар [фраза]
⠀⠀📊 Инфа [фраза]
⠀⠀⛅ Погода [город]
⠀⠀⚖ Выбери [фраза] или [фраза2]
⠀⠀🏆 Топ/топ кланы

🎮 Игры:
⠀⠀🎰 Казино
⠀⠀🎲 Кубик
⠀⠀📦 Кейсы
⠀⠀📈 Трейд
⠀⠀🥛 Стаканчик
⠀⠀🔦 Сейф
⠀⠀⚖ Инвест
⠀⠀🔐 Хакнуть
⠀⠀🕹 Рулетка`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы"
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	});
}else{
return bot(`список команд:

🔥 Мой профиль:
⠀⠀👤 Профиль
⠀⠀🔖 Ник
⠀⠀👑 Рейтинг
⠀⠀💳 Банк
⠀⠀⚔ Клан
⠀⠀❤ Брак
⠀⠀👒 Квесты
⠀⠀🎁 Бонус
⠀⠀🛍 Купить/Продать
⠀⠀🤝 Передать — перевод денег
⠀⠀👥 Реф — деньги за друзей

🦊 Питомцы
👔 Работать
💼 Бизнес
💱 Курс
🔋 Ферма
⭐ Донат
🎄 Взлом подарка

🔔 Уведомления [вкл/выкл]
⌨ Кнопки [текст/удалить]
🆘 Репорт

🌐 Разное:
⠀⠀🙉 Анекдот
⠀⠀↪ Переверни [фраза]
⠀⠀🔁 Скажи [фраза] — синтез речи
⠀⠀🗣 Макака [фраза] — общение
⠀⠀🔮 Шар [фраза]
⠀⠀📊 Инфа [фраза]
⠀⠀⛅ Погода [город]
⠀⠀⚖ Выбери [фраза] или [фраза2]
⠀⠀🏆 Топ/топ кланы

🎮 Игры:
⠀⠀🎰 Казино
⠀⠀🎲 Кубик
⠀⠀📦 Кейсы
⠀⠀📈 Трейд
⠀⠀🥛 Стаканчик
⠀⠀🔦 Сейф
⠀⠀⚖ Инвест
⠀⠀🔐 Хакнуть
⠀⠀🕹 Рулетка`);
}
});

cmd.hear(/^(?:донат|данат|донад|пополнить|данад|🎁 Донат|🎁Донат|⭐ Донат|⭐Донат)$/i, async (message, bot) => {
	return bot(`донат выдаётся НАВСЕГДА и МОМЕНТАЛЬНО! 🎁

🔥 Список товаров: 

🎲 Ваш игровой ID: ${message.user.uid}

🛒 Выгодное предложение:`, {attachment: ''});
});

cmd.hear(/^(?:💡 Разное|💡Разное|разное|📚 Основные|📚Основные|основные)$/i, async (message, bot) => {
return bot(`список:

⠀⠀📖 Профиль 
⠀⠀💲 Баланс 
⠀⠀💰 Банк [сумма/снять сумма] 
⠀⠀👑 Рейтинг — ваш рейтинг 
⠀⠀✒ Ник [ник/вкл/выкл] 
⠀⠀🛒 Магазин 
⠀⠀💸 Продать [предмет] 
⠀⠀💽 Ферма — биткоин ферма 
⠀⠀🤝 Передать [id] [сумма]
⠀⠀🏆 Топ/топ кланы
⠀⠀🎁 Донат
⠀⠀📦 Кейсы
⠀⠀💞 Брак [id] — сделать предложение
⠀⠀💔 Развод
⠀⠀💎 Бонус — ежедневный бонус
⠀⠀👫 Реф — деньги за друзей
⠀⠀🔁 Кнопки [текст/удалить]
⠀⠀🆘 Репорт [фраза] — ошибки или пожелания`);
});

cmd.hear(/^(?:🤖 Развлекательные|🤖Развлекательные|развлекательные)$/i, async (message, bot) => {
return bot(`развлекательный список:

⠀⠀📈 Курс
⠀⠀🙉 Анекдот
⠀⠀↪ Переверни [фраза]
⠀⠀🔁 Скажи [фраза] — синтез речи
⠀⠀🗣 Макака [фраза] — общение
⠀⠀🔮 Шар [фраза]
⠀⠀📊 Инфа [фраза]
⠀⠀⛅ Погода [город]
⠀⠀⚖ Выбери [фраза] или [фраза2]`);
});

cmd.hear(/^(?:часы|⌚ Часы|⌚Часы)\s?([0-9]+)?$/i, async (message, bot) => {
return bot(`покупка часов доступна в привилегии ADMINISTRATOR ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`часы:
	${message.user.pizdenka2 === 1 ? '✅' : '⌚'} 1. Xiaomi Mi Band (5.000$)
	${message.user.pizdenka2 === 2 ? '✅' : '⌚'} 2. Apple Watch 3 (5.000.000$)
	${message.user.pizdenka2 === 3 ? '✅' : '⌚'} 3. Tourbillon Sapphire (30.000.000$)
	${message.user.pizdenka2 === 4 ? '✅' : '⌚'} 4. Rolex Reference 6062 (100.000.000$)
	${message.user.pizdenka2 === 5 ? '✅' : '⌚'} 5. Patek Phillippe Caliber (300.000.000$)
	${message.user.pizdenka2 === 6 ? '✅' : '⌚'} 6. Часы-татуировка (700.000.000$)
	${message.user.pizdenka2 === 7 ? '✅' : '⌚'} 7. Ben 10 Omnitrix Ultimate (3.000.000.000$)
	${message.user.pizdenka2 === 8 ? '✅' : '⌚'} 8. Patek Philippe Ref. 1518 (30.000.000.000$)
	${message.user.pizdenka2 === 9 ? '✅' : '⌚'} 9. Joaillene Manchette (100.000.000.000$)
	${message.user.pizdenka2 === 10 ? '✅' : '⌚'} 10. Часы Винкс (700.000.000.000$)

	🛒 Для покупки введите «Часы [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}
}

if(!message.isChat){
if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`часы:
	${message.user.pizdenka2 === 1 ? '✅' : '⌚'} 1. Xiaomi Mi Band (5.000$)
	${message.user.pizdenka2 === 2 ? '✅' : '⌚'} 2. Apple Watch 3 (5.000.000$)
	${message.user.pizdenka2 === 3 ? '✅' : '⌚'} 3. Tourbillon Sapphire (30.000.000$)
	${message.user.pizdenka2 === 4 ? '✅' : '⌚'} 4. Rolex Reference 6062 (100.000.000$)
	${message.user.pizdenka2 === 5 ? '✅' : '⌚'} 5. Patek Phillippe Caliber (300.000.000$)
	${message.user.pizdenka2 === 6 ? '✅' : '⌚'} 6. Часы-татуировка (700.000.000$)
	${message.user.pizdenka2 === 7 ? '✅' : '⌚'} 7. Ben 10 Omnitrix Ultimate (3.000.000.000$)
	${message.user.pizdenka2 === 8 ? '✅' : '⌚'} 8. Patek Philippe Ref. 1518 (30.000.000.000$)
	${message.user.pizdenka2 === 9 ? '✅' : '⌚'} 9. Joaillene Manchette (100.000.000.000$)
	${message.user.pizdenka2 === 10 ? '✅' : '⌚'} 10. Часы Винкс (700.000.000.000$)

	🛒 Для покупки введите «Часы [номер]»`);
	}
}

if(message.isChat){
	if(!message.args[1]) return bot(`часы:
	${message.user.pizdenka2 === 1 ? '✅' : '⌚'} 1. Xiaomi Mi Band (5.000$)
	${message.user.pizdenka2 === 2 ? '✅' : '⌚'} 2. Apple Watch 3 (5.000.000$)
	${message.user.pizdenka2 === 3 ? '✅' : '⌚'} 3. Tourbillon Sapphire (30.000.000$)
	${message.user.pizdenka2 === 4 ? '✅' : '⌚'} 4. Rolex Reference 6062 (100.000.000$)
	${message.user.pizdenka2 === 5 ? '✅' : '⌚'} 5. Patek Phillippe Caliber (300.000.000$)
	${message.user.pizdenka2 === 6 ? '✅' : '⌚'} 6. Часы-татуировка (700.000.000$)
	${message.user.pizdenka2 === 7 ? '✅' : '⌚'} 7. Ben 10 Omnitrix Ultimate (3.000.000.000$)
	${message.user.pizdenka2 === 8 ? '✅' : '⌚'} 8. Patek Philippe Ref. 1518 (30.000.000.000$)
	${message.user.pizdenka2 === 9 ? '✅' : '⌚'} 9. Joaillene Manchette (100.000.000.000$)
	${message.user.pizdenka2 === 10 ? '✅' : '⌚'} 10. Часы Винкс (700.000.000.000$)

	🛒 Для покупки введите «Часы [номер]»`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}

	const sell = chasii.find(x=> x.id === Number(message.args[1]));
	const luckych = utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`]);
	if(!sell) return bot(`данных часов не существует.`);
	if(message.user.pizdenka2) return bot(`у вас уже есть часы (${chasii[message.user.pizdenka2 - 1].name}), введите «Продать часы»`);
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, { attachment: '' });
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pizdenka2 = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:ссылка)$/i, async (message, bot) => {
	return bot(`список бесед с ботом:

Официальная беседа Bot Mendes - `);
});

cmd.hear(/^(?:бизнес 1 нанять|нанять 1 бизнес)\s(.*)$/i, async (message, bot) => {
	return bot(`использование «Бизнес нанять 1 [кол-во рабочих]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 1 9999"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 2 нанять|нанять 2 бизнес)\s(.*)$/i, async (message, bot) => {
	return bot(`использование «Бизнес нанять 2 [кол-во рабочих]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 2 9999"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 1 нанять|нанять 1 бизнес)$/i, async (message, bot) => {
	return bot(`использование «Бизнес нанять 1 [кол-во рабочих]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 1 9999"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 2 нанять|нанять 2 бизнес)$/i, async (message, bot) => {
	return bot(`использование «Бизнес нанять 2 [кол-во рабочих]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 2 9999"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес улучшить|улучшить бизнес|улучшить)$/i, async (message, bot) => {
	return bot(`использование «Бизнес улучшить [1 или 2]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес улучшить 1"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес улучшить 2"
		},
			"color": "positive"
			}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 1 улучшить)$/i, async (message, bot) => {
	return bot(`использование «Бизнес улучшить 1»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес улучшить 1"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 2 улучшить)$/i, async (message, bot) => {
	return bot(`использование «Бизнес улучшить 2»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес улучшить 2"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:знание|знания|знаний|🎓 Знаний|🎓Знаний)$/i, async (message, bot) => {
	return bot(`знаний на аккаунте: ${utils.sp(message.user.level)}
👔 Получение знаний идёт на работе, введите «Работать»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "👔 Работать"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:брак|❤Брак|❤ Брак)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`для быстрого вступления в брак необходимо двум игрокам отправить согласие командой «Брак [игровой ID партнёра]» ${luckych}`);
});

cmd.hear(/^(?:бизнес снять|снять бизнес|снять)$/i, async (message, bot) => {

if(message.user.lte2 == false){
	if(!message.isChat){
	return bot(`использование «Бизнес снять [1 или 2] [сумма]»`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"7\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"8\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
		},		
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}
}

if(message.user.lte2 == true){
	if(!message.isChat){
	return bot(`использование «Бизнес снять [1 или 2] [сумма]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

	if(message.isChat){
	return bot(`использование «Бизнес снять [1 или 2] [сумма]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
		});

cmd.hear(/^(?:ты|кто|ты кто)$/i, async (message, bot) => {

return bot(`ты кто👍🏻`);

});

cmd.hear(/^(?:питомцы|🐾 Питомцы)$/i, async (message, bot) => {

return bot(`список питомцев:

🐹 1. Хомяк — 10.000$
🐢 2. Черепаха — 25.000.000$
🐈 3. Оцелот — 100.000.000$
🐷 4. Свинка — 3.000.000.000$
🦊 5. Лиса — 30.000.000.000$
🐶 6. Собака — 100.000.000.000$
🐼 7. Панда — 300.000.000.000$
🐺 8. Волк — 1.000.000.000.000$
🤖 9. Робот — 9.000.000.000.000$
🐵 10. Мартышка — 0$

🛒 Купить: питомец [номер]
🐾 Найти на улице: питомец найти

🖼 Инфа о вашем питомце: питомец`);
});

cmd.hear(/^(?:питомец найти|найти на улице|найти питомца)$/i, async (message, bot) => {
if(message.user.pet.length !== 0){ 
for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}
if(message.user.pet[i].id == 10){
	var photo = 457257374;
}
if(message.user.pet[i].id == 11){
	var photo = 457257378;
}
return bot(`у вас уже есть питомец! ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}

🤑 Продать его: продать питомца
🐾 Инфа о питомце: питомец`, { attachment: `photo-182435125_${photo}` });
}
}
if(message.user.peremena1 > getUnix()) return bot(`нельзя так часто бегать по лесу! Подождите ${unixStampLefta(message.user.peremena1 - Date.now())} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
let prize = utils.random(1, 5);
if(prize == 1){
	message.user.peremena1 = getUnix() + 600000;
	message.user.pet = [];
	message.user.pet.push({
		"id": 1,
		"upgrade": 1,
		"date": getUnix(),
		"name": "Хомяк",
		"food": 100,
		"play": 100,
		"work": 1,
		"zapas": 1
		});
	return bot(`вы нашли на улице хомячка! 🐹
📚 Введи команду «питомец» для просмотра информации.`);
}
if(prize == 2){
	message.user.peremena1 = getUnix() + 600000;
	return bot(`ничего не найдено, попробуй еще раз! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
}
if(prize == 3){
	message.user.peremena1 = getUnix() + 600000;
	return bot(`ничего не найдено, попробуй еще раз! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);	
}
if(prize == 4){
	message.user.peremena1 = getUnix() + 600000;
	return bot(`ничего не найдено, попробуй еще раз! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
}
if(prize == 5){
	message.user.peremena1 = getUnix() + 600000;
	message.user.pet = [];
	message.user.pet.push({
		"id": 2,
		"upgrade": 1,
		"date": getUnix(),
		"name": "Черепаха",
		"food": 100,
		"play": 100,
		"work": 1,
		"zapas": 1
		});
	return bot(`вы нашли на улице черепашку! 🐢
📚 Введи команду «питомец» для просмотра информации.`);
}
});

cmd.hear(/^(?:питомцы|🐾 Питомцы|питомец)\s([0-9]+)$/i, async (message, bot) => {
if(message.args[1] == 10) return bot(`питомец «Мартышка» продаётся на нашем сайте 
🔥 Для покупки необходимо ввести на сайт свой игровой ID: ${message.user.uid}

Лучший питомец с БОЛЬШИМ доходом и МАКСИМАЛЬНЫМИ улучшениями! 💯`, {attachment: ``});

if(message.user.pet.length !== 0){ 
for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}
if(message.user.pet[i].id == 10){
	var photo = 457257374;
}
if(message.user.pet[i].id == 11){
	var photo = 457257378;
}
return bot(`у вас уже есть питомец! ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}

🤑 Продать его: продать питомца
🐾 Инфа о питомце: питомец`, { attachment: `photo-182435125_${photo}` });
}
}
	if(message.args[1] == 11) return bot(`данного питомца нет в продаже ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	message.args[1] = Number(message.args[1]) - 1;
	const sell = pets[message.args[1]][0];
	if(sell == null) return bot(`данного питомца нет в продаже ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(message.user.balance < sell.cost) return bot(`у вас недостаточно денег ${utils.pick([`🥺`,`😔`,`😞`,`😣`,`😓`])}
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });

message.user.balance -= sell.cost;
	message.user.pet.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"date": getUnix(),
		"name": sell.name,
		"food": 100,
		"play": 100,
		"work": 1,
		"zapas": 1
	});
for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}

return bot(`вы купили питомца! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

🖼 Инфа о вашем питомце: питомец`, { attachment: `photo-182435125_${photo}` });
}
});

cmd.hear(/^(?:питомец цирк|питомец заработать|🎪 В цирк!|🦊 Питомцы|, 🦊 Питомцы|🎪 Цирк)$/i, async (message, bot) => {

if(message.user.pet.length == []) return bot(`список питомцев:

🐹 1. Хомяк — 10.000$
🐢 2. Черепаха — 25.000.000$
🐈 3. Оцелот — 100.000.000$
🐷 4. Свинка — 3.000.000.000$
🦊 5. Лиса — 30.000.000.000$
🐶 6. Собака — 100.000.000.000$
🐼 7. Панда — 300.000.000.000$
🐺 8. Волк — 1.000.000.000.000$
🤖 9. Робот — 9.000.000.000.000$
🐵 10. Мартышка — 0$

🛒 Купить: питомец [номер]
🐾 Найти на улице: питомец найти

🖼 Инфа о вашем питомце: питомец`);

for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].work > getUnix()){
	var stick = utils.pick([`9220`,`15133`,`10389`]);
	bot(`ваш питомец слишком устал! Необходимо подождать ${unixStampLefta(message.user.pet[i].work - Date.now())} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(stick == 9220){
return message.sendSticker(9220); 
}
if(stick == 15133){
return message.sendSticker(15133); 
}
if(stick == 10389){
return message.sendSticker(10389); 
}
}
}
for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].food <= 20){
var stick = utils.pick([`14826`,`15612`,`10020`,`94`,`13621`]);
bot(`ваш питомец очень хочет кушать! ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
🍗 Покормите его командой «питомец покормить»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🍗 Кормить"
		},
			"color": "positive" 
		}]
		]
			})
		});
}
if(stick == 14826){
return message.sendSticker(14826); 
}
if(stick == 15612){
return message.sendSticker(15612); 
}
if(stick == 10020){
return message.sendSticker(10020); 
}
if(stick == 94){
return message.sendSticker(94); 
}
if(stick == 13621){
return message.sendSticker(13621); 
}
}
for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].play <= 20){
var stick = utils.pick([`9228`,`15144`,`11279`,`11939`,`3113`]);
bot(`вашему питомцу грустно! ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
🎾 Поиграйте с ним командой «питомец играть»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎾 Играть"
		},
			"color": "positive" 
		}]
		]
			})
		});
if(stick == 9228){
return message.sendSticker(9228); 
}
if(stick == 15144){
return message.sendSticker(15144); 
}
if(stick == 11279){
return message.sendSticker(11279); 
}
if(stick == 11939){
return message.sendSticker(11939); 
}
if(stick == 3113){
return message.sendSticker(3113); 
}
}
}
for(var i = 0; i < message.user.pet.length; i++)
{
const works = pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1];
const earn = utils.random(works.min, works.max);
message.user.balance += earn;
message.user.pet[i].work = getUnix() + 1200000;
message.user.pet[i].food -= 10;
message.user.pet[i].play -= 10;
if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}
if(message.user.pet[i].id == 10){
	var photo = 457257374;
}
if(message.user.pet[i].id == 11){
	var photo = 457257378;
}
	setTimeout(async () => {
	message.send(`${pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1].icon } [id${message.user.id}|${message.user.tag}], вашему питомцу скучно! ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])} Отведите его в цирк!`,
		{ 
attachment: `photo-182435125_${photo}`,
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "🎪 В цирк!"
}, 
"color": "positive" 
		}] 
] 
}) 
});
	}, 1200001);
return bot(`ваш питомец заработал ${utils.sp(earn)}$ на выступлениях в цирке! 🤑

${ (pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade] != null ? "⭐ Доступно улучшение за " + utils.sp(pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade].cost) + "$" + `! Прокачивай его, чтобы он приносил больше БАБЛА! 🔥` : "") }`, {attachment: `photo-182435125_457257377`});
}
});

cmd.hear(/^(?:кормить|питомец кормить|питомец покормить|покормить питомца|🍗 Кормить)$/i, async (message, bot) => {
if(message.user.pet.length == []) return bot(`у вас нет питомца, давай исправлять! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
📚 Команда: питомцы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🦊 Питомцы"
		},
			"color": "positive" 
		}]
		]
			})
		});
for(var i = 0; i < message.user.pet.length; i++){
	if(message.user.pet[i].food >= 100){
	var stick = utils.pick([`15151`,`7390`,`5234`]);
		bot(`ваш питомец обожрался! ${utils.pick([`🤤`,`😊`,`🙂`,`😍`])}`);
if(stick == 15151){
return message.sendSticker(15151); 
}
if(stick == 7390){
return message.sendSticker(7390); 
}
if(stick == 5234){
return message.sendSticker(5234); 
}
	}
	if(message.user.balance < 2000000) return bot(`у вас недостаточно денег, чтобы покормить питомца! 😳
😱 Скорее найди бабки на корм питомцу!`, {attachment: ``});
	var percent = utils.random(10, 15);
	message.user.pet[i].food += percent;
	message.user.balance -= 2000000;
	var stick = utils.pick([`9222`,`14811`,`15613`,`10017`,`10397`]);
	bot(`вы покормили питомца! Сытость повышена на ${percent}%! ${utils.pick([`🤤`,`😊`,`🙂`,`😍`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🍗 Кормить"
		},
			"color": "positive" 
		}]
		]
			})
		});
if(stick == 9222){
return message.sendSticker(9222); 
}
if(stick == 14811){
return message.sendSticker(14811); 
}
if(stick == 15613){
return message.sendSticker(15613); 
}
if(stick == 10017){
return message.sendSticker(10017); 
}
if(stick == 10397){
return message.sendSticker(10397); 
}
}
});

cmd.hear(/^(?:питомец играть|играть питомец|🎾 Играть|питомец поиграть)$/i, async (message, bot) => {
if(message.user.pet.length == []) return bot(`у вас нет питомца, давай исправлять! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
📚 Команда: питомцы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🦊 Питомцы"
		},
			"color": "positive" 
		}]
		]
			})
		});
for(var i = 0; i < message.user.pet.length; i++){
	if(message.user.pet[i].play >= 100){
	var stick = utils.pick([`3112`,`5235`,`15133`]);
		bot(`вашему питомцу надоело играть! ${utils.pick([`🤤`,`😊`,`🙂`,`😍`])}`);
if(stick == 3112){
return message.sendSticker(3112); 
}
if(stick == 5235){
return message.sendSticker(5235); 
}
if(stick == 15133){
return message.sendSticker(15133); 
}
	}
	if(message.user.balance < 2000000) return bot(`у вас недостаточно денег, чтобы поиграть с ним! 😳
😱 Скорее найди бабки на игру с питомцем!`, {attachment: ``});
	var percent = utils.random(10, 15);
	message.user.pet[i].play += percent;
	message.user.balance -= 2000000;
	var stick = utils.pick([`20`,`7375`,`15146`,`11896`]);
	bot(`вы поиграли с питомцем! Радость повышена на ${percent}%! ${utils.pick([`🤤`,`😊`,`🙂`,`😍`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎾 Играть"
		},
			"color": "positive" 
		}]
		]
			})
		});
if(stick == 20){
return message.sendSticker(20); 
}
if(stick == 7375){
return message.sendSticker(7375); 
}
if(stick == 15146){
return message.sendSticker(15146); 
}
if(stick == 11896){
return message.sendSticker(11896); 
}
}
});

function unixStampLeftas(stampa) {
	stampa = stampa / 1000;

	let s = stampa % 60;
	stampa = ( stampa - s ) / 60;

	let m = stampa % 60;
	stampa = ( stampa - m ) / 60;

	let	h = ( stampa ) % 24;
	let	d = ( stampa - h ) / 24;

	let text = ``;
	if(d > 0){
		if(d < 5){
		text = Math.floor(d) + " дн. (малыш)";
	}
		if(d < 10){
		if(d >= 5){
		text = Math.floor(d) + " дн. (подрастающий)";
		}
	}
		if(d < 30){
		if(d >= 10){
		text = Math.floor(d) + " дн. (подросток)";
		}
	}
		if(d >= 30){
		text = Math.floor(d) + " дн. (взрослый)";
		}
	}
	if(d <= 0){
    text = Math.floor(h) + " ч. (малыш)";
	}
	if(h <= 0){
    text = Math.floor(m) + " мин. (малыш)";
	}
    if(m <= 0){
    text = Math.floor(s) + " сек. (малыш)";
	}
	return text;
}

cmd.hear(/^(?:питомец|🦊 Питомец)$/i, async (message, bot) => {
if(message.user.pet.length == []) return bot(`у вас нет питомца, давай исправлять! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
📚 Команда: питомцы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🦊 Питомцы"
		},
			"color": "positive" 
		}]
		]
			})
		});

for(var i = 0; i < message.user.pet.length; i++){
if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}
if(message.user.pet[i].id == 10){
	var photo = 457257374;
}
if(message.user.pet[i].id == 11){
	var photo = 457257378;
}
	return bot(`ваш питомец: 
${pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1].icon} ${message.user.pet[i].name}, ${ (pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade] != null ? `${message.user.pet[i].upgrade}` : `max`) } ур.
🐾 Возраст: ${unixStampLeftas(Date.now() - message.user.pet[i].date)}

🍗 Сытость: ${message.user.pet[i].food >= 100 ? `100` : `${message.user.pet[i].food}`}%
😍 Радость: ${message.user.pet[i].play >= 100 ? `100` : `${message.user.pet[i].play}`}%

📚 Команды: питомец помощь`,
		{
			attachment: `photo-182435125_${photo}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "⏫ Улучшить"
		},
			"color": "secondary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎪 Цирк"
		},
			"color": "positive"
			}],
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🦊 Помощь" 
				}, 
				"color": "secondary" 
				
					}], 

		]
			})
		});
}
});

cmd.hear(/^(?:питомец помощь|🦊 Помощь|🦊Помощь)$/i, async (message, bot) => {
if(message.user.pet.length !== 0){ 
	for(var i = 0; i < message.user.pet.length; i++){
	return bot(`помощь по питомцам:

✒ Сменить имя: питомец кличка [новое имя]
⏫ Улучшить: питомец улучшить
🎪 Заработать: питомец цирк

${pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1].icon } Не забывайте следить за показателями питомца, чтобы он мог приносить доход!

🍗 Покормить ($2 млн):
питомец покормить

🎾 Поиграть ($2 млн):
питомец играть`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🍗 Кормить"
		},
			"color": "secondary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎾 Играть"
		},
			"color": "secondary"
			}],
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🎪 Цирк" 
				}, 
				"color": "positive" 
				
					}], 

		]
			})
		});
	}
}else{
	return bot(`помощь по питомцам:

✒ Сменить имя: питомец кличка [новое имя]
⏫ Улучшить: питомец улучшить
🎪 Заработать: питомец цирк

🐾 Не забывайте следить за показателями питомца, чтобы он мог приносить доход!

🍗 Покормить ($2 млн):
питомец покормить

🎾 Поиграть ($2 млн):
питомец играть`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🍗 Кормить"
		},
			"color": "secondary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎾 Играть"
		},
			"color": "secondary"
			}],
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🎪 Цирк" 
				}, 
				"color": "positive" 
				
					}], 

		]
			})
		});
}
});

cmd.hear(/^(?:питомец кличка|питомец имя)\s(.*)$/i, async (message, bot) => {
let zaprets = message.args[1].toLowerCase();
var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█||&#1;|▓|�|�||�|™|�|&#0000;||�|™.|марихуана|youtu.be|أحبك|أحب|Cuний кuт|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
if(pizda.test(zaprets) === true || message.args[1].toLowerCase() === ''){
return bot(`придумайте другое имя питомцу ❌`);
}
if(message.user.pet.length == []) return bot(`у вас нет питомца, давай исправлять! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
📚 Команда: питомцы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🦊 Питомцы"
		},
			"color": "positive" 
		}]
		]
			})
		});
if(message.user.polnom < 2) return bot(`менять клички животным могут только VIP-игроки! ${utils.pick([`🤒`,`🤧`,`😭`,`😓`,`😥`])}

🤑 Купи ВИПКУ сейчас по огромной СКИДКЕ и получи много КРУТЫХ ВОЗМОЖНОСТЕЙ! 💯`, {attachment: ``});

if(message.args[1].length >= 11) return bot(`вы указали слишком длинную кличку ${utils.pick([`🤒`,`🤧`,`😭`,`😓`,`😥`])}
🔥 Максимальная длина клички 10 символов.`);

if(message.user.pet.length != 0){ 
	for(var i = 0; i < message.user.pet.length; i++){ 
		message.user.pet[i].name = message.args[1];
		return bot(`теперь у питомца новое имя! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`)
	}
}
});

cmd.hear(/^(?:питомец кличка|питомец имя)$/i, async (message, bot) => {
if(message.user.polnom < 2) return bot(`менять клички животным могут только VIP-игроки! ${utils.pick([`🤒`,`🤧`,`😭`,`😓`,`😥`])}

🤑 Купи ВИПКУ сейчас по огромной СКИДКЕ и получи много КРУТЫХ ВОЗМОЖНОСТЕЙ! 💯`, {attachment: ``});
return bot(`укажите имя питомцу, например: питомец кличка Барсик`)
});

cmd.hear(/^(?:питомец улучшить|улучшить питомца|⏫ Улучшить)$/i, async (message, bot) => {

if(message.user.pet.length == []) return bot(`у вас нет питомца, давай исправлять! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
📚 Команда: питомцы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🦊 Питомцы"
		},
			"color": "positive" 
		}]
		]
			})
		});

	if(message.user.pet.length != 0){ 
	for(var i = 0; i < message.user.pet.length; i++){ 

	if(pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade] == null) return bot(`ваш питомец улучшен до максимального уровня! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	const cost = pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
💰 Баланс: ${utils.sp(message.user.balance)}$`,{ attachment: '' });

	message.user.balance -= cost;
	message.user.pet[i].upgrade++;

if(message.user.pet[i].id == 1){
	var photo = 457257366;
}
if(message.user.pet[i].id == 2){
	var photo = 457257367;
}
if(message.user.pet[i].id == 3){
	var photo = 457257368;
}
if(message.user.pet[i].id == 4){
	var photo = 457257369;
}
if(message.user.pet[i].id == 5){
	var photo = 457257370;
}
if(message.user.pet[i].id == 6){
	var photo = 457257371;
}
if(message.user.pet[i].id == 7){
	var photo = 457257372;
}
if(message.user.pet[i].id == 8){
	var photo = 457257373;
}
if(message.user.pet[i].id == 9){
	var photo = 457257375;
}
if(message.user.pet[i].id == 10){
	var photo = 457257374;
}
if(message.user.pet[i].id == 11){
	var photo = 457257378;
}
	return bot(`питомец улучшен до ${message.user.pet[i].upgrade} ур. за ${utils.sp(cost)}$! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

⏫ Чем выше его уровень, тем больше ДОХОДА он приносит с цирка! 🤑`,
		{
			attachment: `photo-182435125_${photo}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "⏫ Улучшить"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}
}

});

cmd.hear(/^(?:донат|данат|донад|пополнить|данад|🎁 Донат|🎁Донат|⭐ Донат|⭐Донат)$/i, async (message, bot) => {
	return bot(`донат выдаётся НАВСЕГДА и МОМЕНТАЛЬНО! 🎁

🔥 Список товаров: 

🎲 Ваш игровой ID: ${message.user.uid}

🛒 Выгодное предложение:`, {attachment: ''});
});

cmd.hear(/^(?:vip|вип)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
botinfo.iddonate += 1;
	if(message.senderId !== 301015165| message.senderId !== 554081711){
	if(!message.isChat){
	if(!Number(message.args[2])) return bot(`команда не найдена!
📚 Посмотри список команд, написав «помощь»`);
}else{
	return;
}
}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		if(user.odmen == true) return bot(`у данного игрока имеется админка.`);
		user.vip = true;
		user.polnom = 2;
		user.ban = false;
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] VIP статус!`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы теперь постоянный VIP игрок в @botmendes (Bot Mendes)! 🏆
👥 Беседа: 
📚 Команды: впомощь`, attachment:'' });
});

cmd.hear(/^(?:забрать админ|забрать admin)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
	if(message.senderId !== 554081711| message.senderId !== 554081711) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);

		user.odmen = false;
		user.polnom = 0;
		user.misc.farm_count = 3000;

		await bot(`вы забрали у игрока [id${user.id}|${user.tag}] Админку!`);
		vk.api.messages.send({ user_id: user.id, message: `🚫 ${message.user.tag} из-за нарушений забрал у Вас привилегию ADMINISTRATOR!` });
	}
});

cmd.hear(/^(?:забрать vip|забрать вип)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
	if(message.senderId !== 554081711| message.senderId !== 554081711) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);

		user.vip = false;
		user.polnom = 0;
		user.misc.farm_count = 100;

		await bot(`вы забрали у игрока ${user.tag} VIP статус!`);
		vk.api.messages.send({ user_id: user.id, message: `🚫 ${message.user.tag} из-за нарушений забрал у Вас привилегию VIP статус!` });
	}
});

cmd.hear(/^(?:admin|админ)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
	if(message.senderId !== 301015165| message.senderId !== 554081711){
	if(!message.isChat){
	if(!Number(message.args[2])) return bot(`команда не найдена!
📚 Посмотри список команд, написав «помощь»`);
}else{
	return;
}
}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.odmen = true;
		user.vip = false;
		user.polnom = 10;
		user.ban = false;
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] админку!`);
		vk.api.messages.send({ user_id: user.id, message: `🔥 [id${user.id}|${user.tag}], вы теперь постоянный администратор в @botmendes (Bot Mendes)! 🅰
👥 Беседа: 
📚 Команды: апомощь`, attachment:'' });
});

cmd.hear(/^(?:ник|никнейм|имя|nick|nik|nic|🔖 Ник|🔖Ник)$/i, async (message, bot) => {
message.send(`🌈🔖 [id${message.user.id}|${message.user.tag}], использование команды: ник [новый ник]

🔏 Включить или отключить ссылку в нике: ник [вкл/выкл]

✒ Никне́йм — сетевое имя (псевдоним), используемое пользователем в интернете.`);
});

user.setOptions({
token: '6e07addbe4ee84bef8d53414d05965682c8597f3c6e9ad0b283d7292aafb7710918ab28a812b2b282022c' // token ot страницы ( не обязательно )
});

cmd.hear(/^(?:раздачаверт)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `ШОК! 🚁 КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} СЕКРЕТНЫЙ ВЕРТОЛЁТ которого НЕТ В ПРОДАЖЕ. Акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Вертолёт будет выдан по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.transport.helicopter = 17; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислен СЕКРЕТНЫЙ ВЕРТОЛЁТ! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254675' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачавиктор)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `🔥 Долгожданная раздача!
Каждый репостнувший поучаствует в уникальной ВИКТОРИНЕ, в которой вы сможете выиграть АДМИНКУ или ЛУЧШИЙ БИЗНЕС! Добавлено больше позиций!

🔍 Посылки будут отправлены ровно через 48 часов, Ваш профиль ВК должен быть открыт.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '* пример открытия'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.dostuptur = 1; 
vk.api.messages.send({ user_id: user.id, message: `Вы получили посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины 🙀
	
⛳ Что бы начать введите «викторина»`, attachment:'photo-187845340_457255569' });
});
});
}, 172800000);
});
});

cmd.hear(/^(?:раздачакеис)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `🔥 РЕПОСТ + @botmendes (ПОДПИСКА) = LUCKY КЕЙС НА ХАЛЯВУ!

🎁 Выдача через 48 часов, профиль VK должен быть открыт.

⏩ Начать игру — vk.me/botmendes`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '🍻 Не забываем забирать БОНУСЫ ЗА КОММЕНТЫ!'
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.case += 1;
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
${user.tag}, благодарю за участие в нашей раздаче! Вам на аккаунт зачислен один LUCKY КЕЙС! ✅
🎁 Открытие по команде «Кейс»`});
});
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
}, 172800000);
});
});

cmd.hear(/^(?:раздачакрылатая)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `ШОК! ✈ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} СЕКРЕТНЫЙ САМОЛЁТ которого НЕТ В ПРОДАЖЕ. Акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Самолёт будет выдан по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.transport.airplane = 21;
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислен СЕКРЕТНЫЙ САМОЛЁТ! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254672' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачапитх)$/i, async (message, bot) => {

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `🐾 СЕКРЕТНЫЙ ПИТОМЕЦ за РЕПОСТ!

КАЖДЫЙ, кто сделает репост и @botmendes (подпишется на группу), получит секретного питомца, которого НЕТ в продаже! Акция действует 48 часов.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '🐾 Питомец будет выдан по окончании акции, страница должна быть открыта.'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.pet = [];
user.pet.push({
"id": 11,
"upgrade": 1,
"date": getUnix(),
"name": "Шмель",
"food": 100,
"play": 100,
"work": 1,
"zapas": 1
});
vk.api.messages.send({ user_id: user.id, message: `🐝 [id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! К вам прибежал секретный питомец ✅
🖼 Инфа о питомце: питомец`});
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 172800000);
});
});

cmd.hear(/^(?:раздачакеисх)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `🌌 ЧЕРНЫЕ КЕЙСЫ ЗА РЕПОСТ!

КАЖДЫЙ, кто сделает репост и @botmendes (подпишется на группу), получит 2 ЧЕРНЫХ КЕЙСА, которых НЕТ в продаже! Акция действует 48 часов.`,
attachments: 'photo-182435125_457257350'
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '🎂 Кейсы будут выданы по окончании акции, страница должна быть открыта.'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.case4 += 2;
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислено 2 ЧЕРНЫХ КЕЙСА ✅
🎁 Открытие по команде «Праздничный кейс»`});
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 172800000);
});
});

cmd.hear(/^(?:раздачателеф)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `ШОК! 📱 КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} СЕКРЕТНЫЙ ТЕЛЕФОН которого НЕТ В ПРОДАЖЕ. Акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Телефон будет выдан по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.misc.phone = 15;
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислен СЕКРЕТНЫЙ ТЕЛЕФОН! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254672' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачаначислитьпитом)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;

user.api.call('wall.getReposts', { owner_id: -191380914, post_id: message.args[1], count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.pet = [];
user.pet.push({
"id": 11,
"upgrade": 1,
"date": getUnix(),
"name": "Шмель",
"food": 100,
"play": 100,
"work": 1,
"zapas": 1
});
vk.api.messages.send({ user_id: user.id, message: `🐝 [id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! К вам прибежал секретный питомец ✅
🖼 Инфа о питомце: питомец`});
});
});
});

cmd.hear(/^(?:раздачаначислитьглобал)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = Math.floor(Number(message.args[2]));

user.api.call('wall.getReposts', { owner_id: -191380914, post_id: message.args[1], count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += Math.floor(message.args[2]);
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], за участие в раздаче вам зачислено ${utils.sp(message.args[2])}$ 🤑

💸 Старый баланс: ${utils.sp(user.balance - message.args[2])}$
💸 Новый баланс: ${utils.sp(user.balance)}$
С уважением, @club191380914 (Bot Ananas)` });
});
});
});

cmd.hear(/^(?:раздачаначислить дом)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;

user.api.call('wall.getReposts', { owner_id: -191380914, post_id: message.args[1], count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.realty.home = 18; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислен СЕКРЕТНЫЙ ДОМ! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254676' });
});
});
});

cmd.hear(/^(?:раздачаначислить яхта)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;

user.api.call('wall.getReposts', { owner_id: -191380914, post_id: message.args[1], count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.transport.yacht = 15; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислена СЕКРЕТНАЯ ЯХТА! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254673' });
});
});
});

cmd.hear(/^(?:раздачаначислииить)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;

user.api.call('wall.getReposts', { owner_id: -191380914, post_id: message.args[1], count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.dostuptur = 1; 
user.tur = 0;
vk.api.messages.send({ user_id: user.id, message: `Вы получили посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины. 🙀
	
⛳ Что бы начать введите «викторина»
*Всем репостнувшим была повторная выдача, приносим свои извинения.`, attachment:'photo-187845340_457255569' });
});
});
});

cmd.hear(/^(?:раздачаначислитьвиктор)\s([0-9]+)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return; 
user.dostuptur = 1; 
await bot(`вы выдали игроку ${user.tag} викторину!`);
vk.api.messages.send({ user_id: user.id, message: `Вы получили посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины. 🙀
	
⛳ Что бы начать введите «викторина»`, attachment:'photo-187845340_457255569' });
});

cmd.hear(/^(?:раздачаначислить)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.senderId !== 301015165) return;
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

const sell = apartments.find(x=> x.id === Number(message.args[1]));
let user = users.find(x=> x.uid === Number(message.args[2]));

await bot(`вы выдали игроку ${user.tag} «${sell.name}»`);
user.realty.apartment = sell.id;
vk.api.messages.send({ user_id: user.id, message: `Вы получили посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины. 🙀
	
⛳ Что бы начать введите «викторина»
*Всем репостнувшим была повторная выдача, приносим свои извинения.`, attachment:'photo-187845340_457255569' });
});

cmd.hear(/^(?:беседы|чаты|боты|беседа)$/i, async (message, bot) => { 
let text1 = ``; 
let text2 = ``; 

text1 += `1&#8419; Bot Ananas | Официальная беседа\n> vk.cc/anC3v5`; 

return bot(`наши официальные беседы: 

${text1} 
${text2} 

💬 Кол-во участников обновляется в автоматическом режиме`); 
}); 

cmd.hear(/^(?:раздачаяхта)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `ШОК! 🛥 КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} СЕКРЕТНУЮ ЯХТУ которой НЕТ В ПРОДАЖЕ. Акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Яхта будет выдана по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.transport.yacht = 15; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислена СЕКРЕТНАЯ ЯХТА! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254673' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачадом)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `🔦 СЕКРЕТНЫЙ ОБЪЕКТ ЗА @botmendes (РЕПОСТ)!

КАЖДЫЙ репостнувший получит 🚨 СЕКРЕТНЫЙ ОБЪЕКТ, которого нет в продаже. Это имущество очень дорогое! Акция действует ровно сутки.`,
attachments: 'photo-182435125_457257340'
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '* - посылка будет выдана по окончанию акции, ваш профиль VK должен быть открыт.'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return;
user.realty.home = 19; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 🚨

[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислен СЕКРЕТНЫЙ ОБЪЕКТ! ✅
С уважением, @club191380914 (Bot Ananas)`});
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачахата)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `ШОК! 🌇 КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} СЕКРЕТНУЮ КВАРТИРУ которой НЕТ В ПРОДАЖЕ. Акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Квартира будет выдана по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.realty.apartment = 13; 
vk.api.messages.send({ user_id: user.id, message: `АКЦИЯ ОКОНЧЕНА! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! Вам на аккаунт зачислена СЕКРЕТНАЯ КВАРТИРА! ✅
	С уважением, @club191380914 (Bot Ananas)`, attachment:'photo-182435125_457254671' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачабтсп)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} ЦЕЛЫХ 500.000 BTC, акция действует ${razdp}!`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Биткойны будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.btc += 500000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! ✅ Вы получили +500.000 BTC, биткойнов: ${utils.sp(user.btc)}! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239068' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачабтспглобал)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача в честь ГЛОБАЛЬНОГО ОБНОВЛЕНИЯ! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой баланс ЦЕЛЫХ 1.000.000 BTC, акция действует ${razdp}!`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.btc += 1000000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! ✅ Вы получили +1.000.000 BTC, биткойнов: ${utils.sp(user.btc)}! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239028' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачаом)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} ЦЕЛЫЙ 1.000.000.000$, акция действует ${razdp}.`,
attachments: 'photo-182707530_456239069'
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += 1000000000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! ✅ Вы получили +1.000.000.000$, ваш баланс: ${utils.sp(user.balance)}$! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239069' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздаполтора)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} ЦЕЛЫХ 1.500.000.000$, акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += 1500000000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! ✅ Вы получили +1.500.000.000$, ваш баланс: ${utils.sp(user.balance)}$! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239065' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачадм)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} ЦЕЛЫХ 2.000.000.000$, акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += 2000000000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! ✅ Вы получили +2.000.000.000$, ваш баланс: ${utils.sp(user.balance)}$! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239066' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачадвасп)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `Новая раздача! ✅ КАЖДЫЙ кто сделает РЕПОСТ этой записи получит на свой ${blin} ЦЕЛЫХ 2.500.000.000$, акция действует ${razdp}.`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы на баланс по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += 2500000000; 
vk.api.messages.send({ user_id: user.id, message: `Акция окончена! 😯
	[id${user.id}|${user.tag}], благодарю за участие в нашей раздаче! ✅ Вы получили +2.500.000.000$, ваш баланс: ${utils.sp(user.balance)}$! ${luckych}
	С уважением, @club191380914 (Bot Ananas)`, attachment: 'photo-182707530_456239067' });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
});

cmd.hear(/^(?:раздачамегар)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const razdp = utils.pick([`ровно сутки`,`ровно 24 часа`,`ровно 1 день`]);
const blin = utils.pick([`баланс`,`аккаунт`,`профиль`]);

if(message.senderId !== 301015165) return;
user.api.wall.post({
owner_id: -191380914,
message: `3.500.000.000$ за РЕПОСТ! 💰

Все, кто сделает репост данного поста, завтра в 18:30 по Москве получат 3.500.000.000$ на свой игровой баланс!`,
attachments: ''
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*Деньги будут выданы по окончанию акции, ваш профиль VK должен быть открыт, иначе мы не увидим ваш репост!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
setTimeout(() => {
user.api.call('wall.getReposts', { owner_id: -191380914, post_id: response.post_id, count: 1000 }).then((res) => { 
res.items.map(x=> {
if(x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if(!user) return; 
user.balance += 3500000000; 
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], за участие в раздаче вам зачислено 3.500.000.000$ 📈

💸 Старый баланс: ${utils.sp(user.balance - 3500000000)}$
💸 Новый баланс: ${utils.sp(user.balance)}$
С уважением, @club191380914 (Bot Ananas)` });
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '✅ Раздача закончена, подпишись на уведомления, чтобы узнавать в числе первых о новых акциях!'
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
}, 86400000);
});
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
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - «Да»', 'знаки говорят - «Нет»', 'можешь быть уверен в этом', 'мой ответ - «нет»', 'мой ответ - «да»', 'бесспорно', 'мне кажется - «Да»', 'мне кажется - «Нет»']);
	return bot(phrase);
});

cmd.hear(/^(?:кмдвладелец)$/i, async (message, bot) => {
if(message.polnom < 10) return;
	return bot(`команды:
	Рестарт - выкл бота
	Раздатьстарт [сумма] - выдать всем [сумма]
	Поставить баланс [ID] [баланс] - поставить баланс
	Подкрутить/подкрутка [ID] - подкрутить юзеру
	Открутка [ID] - сделать открутку
	Забрать открутку [ID] - забрать открутку
	Забрать подкрутку [ID] - забрать подкрутку
	Обнул вкл - фалсе на всех кланах
	Ответ [ID] [фраза] - ответ на репорт
	Банреп [ID] - бан репорта
	Бизик [ID] [номер бизнеса] - выдача бизнеса	
	Сетреп [ID] - разбан репорта
	Сообщ [ID] [кол-во] - накрутить сообщений
	Забрать сообщения [ID] [кол-во] - забрать сообщения
	yashick/донкейс [ID] [кол-во] - выдача кейсов
	Вип [ID] 10 - выдача випа
	Админ [ID] 10 - выдача администратора
	Забрать [ID] [кол-во] - забрать баланс
	Антисбор [ID] 10 - выдача антисбора
	Забрать вип [ID] 10 - забрать вип
	Забрать админ [ID] 10 - забрать админ
	Полном [ID] [кол-во] - выдать полномочия
	Забрать полном [ID] [кол-во] - забрать полномочия
	Сетник [ID] [фраза] - поменять ник
	Лимит [ID] - выдача лимита в 100кккк
	Забрать лимит [ID] - забрать лимит
	Раздачаначислитьглобал [айди поста] [сумма] - раздача

		Раздачи:
	Раздачаом - раздача на 1.000.000.000$
	Раздачанапомнитьм - рассылка раздачи на 1 млрд $

	Раздаполтора - раздача на 1.500.000.000$
	Рассылкаполтора - рассылка раздачи на 1.5млрд $

	Раздачадм - раздача на 2.000.000.000$
	Раздачанапомнитьдм - рассылка раздачи на 2млрд $

	Раздачадвасп - раздача на 2.500.000.000$
	Раздачанапомнитьдспм - рассылка раздачи на 2.5млрд $

	Раздачамегар - раздача на 3.500.000.000$
	Рассылкамегар - рассылка раздачи на 3.5млрд $

	Раздачабтсп - раздача на 500.000 BTC
	Рассылкараздбтс - рассылка раздачи 500.000 BTC

	Раздачабтспглобал - 1кк бтс 
	Рассылкаглобал - 1кк бтс глобал

	Промо:
	Промо тип баланс/btc - тип промо
	Промо [сумма] - сумма выдачи
	Промо лимит [кол-во] - ограничение
	Промо вкл - вкл промо
	Быстро деньги - сам промо
	Промочет - 300.000бтс промо
	Промочетбт - 500.000бтс промо
	Промобал - 500.000.000$ промо
	Промобало - 1.000.000.000$ промо
	Промопятьбтс - 50.000бтс промо
	Промостобтс - 100.000бтс промо

	Рассылки:
	Рассылкааа
	Пострассылка [номер поста, например 212] [текст] - рассылка поста со своим текстом
	Рассылканорм [сообщение] - рассылка сообщения
	Инфарассылканов - Вышел новый пост по руководству бота
	Инфарассылка - не проходи мимо этого поста
	Активбрассылка - 80млрд $ за беседу
	Раздачанапомнить - скоро конец раздачи
	Рассылкаглобал - стой! Смотри что вышло
	Заценава - зацени новую аватарку!
	Одинострасс - остался один день
	Дваострасс - осталось 2 ДНЯ
	Триострасс - осталось 3 ДНЯ

	Всего игроков: ${users.length}`);
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`, `зуб даю, что ${utils.random(1, 2)} вариант`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:погода)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`укажите город, использование: «Погода [город]» ${luckych}`);
});

cmd.hear(/^(?:профиль|проф|профель)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
	if(message.user.polnom == 2) text += `🏆 VIP-персона\n`;
	if(message.user.polnom == 4) text += `🏆 VIP-персона\n`;
	if(message.user.polnom == 6) text += `🏆 VIP-персона\n`;
	if(message.user.polnom == 8) text += `🏆 VIP-персона\n`;
	if(message.user.polnom >= 10) text += `🔥 ADMINISTRATOR\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `💽 Биткоины: ${utils.sp(message.user.btc)}฿\n`;
	if(message.user.case) text += `🎁 Lucky-Кейсов: ${utils.sp(message.user.case)}\n`;

	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🎓 Знаний: ${utils.sp(message.user.level)}\n`;
	if(message.user.work) text += `${works[message.user.work - 1].icon} Работа: ${works[message.user.work - 1].name}\n`;
	if(message.user.marriage.partner) text += `❤ В браке с [id${users[message.user.marriage.partner].id}|${users[message.user.marriage.partner].tag}]\n`;
	//text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;

	if(message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.transport.car.length != 0 || message.user.mts1 || message.user.pizdenka2){
		text += `\n📦 Имущество:\n`;
		if(message.user.pet.length !== 0){ 
		for(var i = 0; i < message.user.pet.length; i++){
		text += `⠀${pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1].icon } Питомец: ${message.user.pet[i].name}\n`;
			}
		}
		if(message.user.transport.car.length != 0){
		for(var i = 0; i < message.user.transport.car.length; i++){
		text += `⠀🚗 Машина: ${cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade - 1].name}\n`;
			}
		}
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;

		if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.pizdenka2) text += `⠀⌚ Часы: ${chasii[message.user.pizdenka2 - 1].name}\n`;
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name} (${utils.sp(message.user.misc.farm_count)} шт.)\n`;
		if(message.user.mts1) text += `⠀${secret[message.user.mts1 - 1].name}\n`;
	}
		if(message.user.business.length != 0){
			text += `\n\n💼 Бизнесы:\n`;
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n⌚ Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:остальное|📌Остальное)$/i, async (message, bot) => {

if(message.user.lte2 == false){
if(message.user.odmen == true){
if(!message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"21\"}",
				"label": "📱Телефоны"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"22\"}",
				"label": "💽Фермы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"23\"}",
				"label": "💼Бизнесы"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

if(message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.user.odmen == false){
if(!message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"21\"}",
				"label": "📱Телефоны"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"22\"}",
				"label": "💽Фермы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"23\"}",
				"label": "💼Бизнесы"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

if(message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}
}

if(message.user.lte2 == true){
if(message.user.odmen == true){
if(!message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}

if(message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.user.odmen == false){
if(!message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}

if(message.isChat){
	return bot(`📌 Остальное:
⠀⠀📱 Телефоны
⠀⠀💽 Фермы
⠀⠀🎁 Донат
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "💽 Фермы"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "💼 Бизнесы"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🎁 Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}
}

});	

cmd.hear(/^(?:баланс|🐒Баланс)$/i, async (message, bot) => {
	let text = `твой баланс:

💸 На руках: ${utils.sp(message.user.balance)}$
📈 @botmendes (Как пополнить?)`;

	if(message.user.bank) text += `\n\n💳 В банке: ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n💽 Биткоины: ${utils.sp(message.user.btc)}฿`;

	return bot(text,		
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"7\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		}]
		]
		})
	});
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	return bot(`на вашем банковском счёте находится ${utils.sp(message.user.bank)}$
Инфо о банке: «Банк помощь»

✍🏻 Введите «Банк [сумма]» для пополнения.
💳 Введите «Банк снять [сумма]» для снятия.`);
});

cmd.hear(/^(?:биткоин|биткойн|биткоины|биткойны|купить биткоин|купить биткойн|биткоин купить|биткойн купить)$/i, async (message, bot) => {

return bot(`биткоины: ${utils.sp(message.user.btc)}฿

💳 Купить:
биткоин [кол-во]

🤑 Продать:
продать биткоин [кол-во]`);

});

cmd.hear(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
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

    if(message.user.lte2 == false){
    return await bot(`событие произойдет через ${time} ${date} ✅`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
}

    if(message.user.lte2 == true){
    return await bot(`событие произойдет через ${time} ${date} ✅`);
}

function nDay(n, titles) {
    return titles[(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)];
};
});

cmd.hear(/^(?:найти|поиск)\s([0-9]+)$/i, async (message, bot) => {
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);

	if(message.user.polnom < 2){
		return bot(`данная команда доступна с привилегии VIP и выше. ${donatich}`, {attachment: ``});
	}

	if(message.user.ktokto2 > getUnix()){ 
	return bot(`просмотр профиля будет доступен через ${unixStampLeft(message.user.ktokto2 - Date.now())} ${luckych}`);
	}

	let text = ``;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`такого игрока не существует ${donatich}`);
	let clanid = user.clanid;

	if(message.user.odmen == false){
	getUnix() + 60000
	message.user.ktokto2 = getUnix() + 60000;
	
	text += `🔎 ID: ${user.uid}\n`;
	if(user.polnom == 2) text += `🏆 VIP-персона\n`;
	if(user.polnom == 4) text += `🏆 VIP-персона\n`;
	if(user.polnom == 6) text += `🏆 VIP-персона\n`;
	if(user.polnom == 8) text += `🏆 VIP-персона\n`;	
	if(user.polnom >= 10) text += `🔥 ADMINISTRATOR\n`;
	if(user.clanid == false) text += ``;
	if(user.clanid !== false) text += `⚔ Клан: ${clans[user.clanid].name}\n`;
	text += `📝 Никнейм: ${user.tag}\n`;
	text += `&#128279; Ссылка:  vk.com/id${user.id}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `💽 Биткоинов: ${utils.sp(user.btc)}\n`;
	if(user.case) text += `🎁 Lucky-Кейсов: ${utils.sp(user.case)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🎓 Знаний: ${utils.sp(user.level)}\n`;
	if(user.work) text += `${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `❤ В браке с [id${users[user.marriage.partner].id}|${users[user.marriage.partner].tag}]\n`;

	if(user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.transport.car.length != 0 || user.mts1 || user.pizdenka2){
		text += `\n📦 Имущество:\n`;
		if(user.pet.length !== 0){ 
		for(var i = 0; i < user.pet.length; i++){
		text += `⠀${pets[user.pet[i].id - 1][user.pet[i].upgrade - 1].icon } Питомец: ${user.pet[i].name}\n`;
			}
		}
		if(user.transport.car.length != 0){
		for(var i = 0; i < user.transport.car.length; i++){
		text += `⠀🚗 Машина: ${cars[user.transport.car[i].id - 1][user.transport.car[i].upgrade - 1].name}\n`;
			}
		}
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.pizdenka2) text += `⠀⌚ Часы: ${chasii[user.pizdenka2 - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name} (${utils.sp(user.misc.farm_count)} шт.)\n`;
		if(user.mts1) text += `⠀${secret[user.mts1 - 1].name}\n`;
	}
		if(user.business.length != 0){
			text += `\n\n💼 Бизнесы:\n`;
			for(var i = 0; i < user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n⌚ Дата регистрации: ${user.regDate}`;
	if(message.user.odmen == true|message.user.vip == true) return bot(`профиль игрока:\n${text}`);
	}

	if(message.user.odmen == true){
	
	text += `🔎 ID: ${user.uid}\n`;
	if(user.polnom == 2) text += `🏆 VIP-персона\n`;
	if(user.polnom == 4) text += `🏆 VIP-персона\n`;
	if(user.polnom == 6) text += `🏆 VIP-персона\n`;
	if(user.polnom == 8) text += `🏆 VIP-персона\n`;	
	if(user.polnom >= 10) text += `🔥 ADMINISTRATOR\n`;
	if(user.clanid == false) text += ``;
	if(user.clanid !== false) text += `⚔ Клан: ${clans[user.clanid].name}\n`;
	text += `📝 Никнейм: ${user.tag}\n`;
	text += `&#128279; Ссылка:  vk.com/id${user.id}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `💽 Биткоинов: ${utils.sp(user.btc)}\n`;
	if(user.case) text += `🎁 Lucky-Кейсов: ${utils.sp(user.case)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🎓 Знаний: ${utils.sp(user.level)}\n`;
	if(user.work) text += `${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `❤ В браке с [id${users[user.marriage.partner].id}|${users[user.marriage.partner].tag}]\n`;

	if(user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.transport.car.length != 0 || user.mts1 || user.pizdenka2){
		text += `\n📦 Имущество:\n`;
		if(user.pet.length !== 0){ 
		for(var i = 0; i < user.pet.length; i++){
		text += `⠀${pets[user.pet[i].id - 1][user.pet[i].upgrade - 1].icon } Питомец: ${user.pet[i].name}\n`;
			}
		}
		if(user.transport.car.length != 0){
		for(var i = 0; i < user.transport.car.length; i++){
		text += `⠀🚗 Машина: ${cars[user.transport.car[i].id - 1][user.transport.car[i].upgrade - 1].name}\n`;
			}
		}
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.pizdenka2) text += `⠀⌚ Часы: ${chasii[user.pizdenka2 - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name} (${utils.sp(user.misc.farm_count)} шт.)\n`;
		if(user.mts1) text += `⠀${secret[user.mts1 - 1].name}\n`;
	}
		if(user.business.length != 0){
			text += `\n\n💼 Бизнесы:\n`;
			for(var i = 0; i < user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n⌚ Дата регистрации: ${user.regDate}`;
	if(message.user.odmen == true|message.user.vip == true) return bot(`профиль игрока:\n${text}`);
	}

});

cmd.hear(/^(?:найти|поиск)$/i, async (message, bot) => {
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);

	if(message.user.polnom < 2){ 
		return bot(`данная команда доступна с привилегии VIP и выше. ${donatich}`, {attachment: ``});
	}

	if(message.user.ktokto2 > getUnix()){ 
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`просмотр профиля будет доступен через ${unixStampLeft(message.user.ktokto2 - Date.now())} ${luckych}`);
	}

	if(message.forwards[0]){
		var user = users.find(x=> x.id === message.forwards[0].senderId);
	if(!user) return bot(`такого игрока не существует.`);
	};
	if(message.replyMessage){
		var user = users.find(x=> x.id === message.replyMessage.senderId);
	if(!user) return bot(`такого игрока не существует.`);
	};
	if(!message.forwards[0] && !message.replyMessage) return bot(`перешлите сообщение 🔁`);

	let text = ``;
	let clanid = user.clanid;

	if(message.user.odmen == false){
	getUnix() + 60000
	message.user.ktokto2 = getUnix() + 60000;
	
	text += `🔎 ID: ${user.uid}\n`;
	if(user.polnom == 2) text += `🏆 VIP-персона\n`;
	if(user.polnom == 4) text += `🏆 VIP-персона\n`;
	if(user.polnom == 6) text += `🏆 VIP-персона\n`;
	if(user.polnom == 8) text += `🏆 VIP-персона\n`;	
	if(user.polnom >= 10) text += `🔥 ADMINISTRATOR\n`;
	if(user.clanid == false) text += ``;
	if(user.clanid !== false) text += `⚔ Клан: ${clans[user.clanid].name}\n`;
	text += `📝 Никнейм: ${user.tag}\n`;
	text += `&#128279; Ссылка:  vk.com/id${user.id}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `💽 Биткоинов: ${utils.sp(user.btc)}\n`;
	if(user.case) text += `🎁 Lucky-Кейсов: ${utils.sp(user.case)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🎓 Знаний: ${utils.sp(user.level)}\n`;
	if(user.work) text += `${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `❤ В браке с [id${users[user.marriage.partner].id}|${users[user.marriage.partner].tag}]\n`;

	if(user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.transport.car.length != 0 || user.mts1 || user.pizdenka2){
		text += `\n📦 Имущество:\n`;
		if(user.pet.length !== 0){ 
		for(var i = 0; i < user.pet.length; i++){
		text += `⠀${pets[user.pet[i].id - 1][user.pet[i].upgrade - 1].icon } Питомец: ${user.pet[i].name}\n`;
			}
		}
		if(user.transport.car.length != 0){
		for(var i = 0; i < user.transport.car.length; i++){
		text += `⠀🚗 Машина: ${cars[user.transport.car[i].id - 1][user.transport.car[i].upgrade - 1].name}\n`;
			}
		}
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.pizdenka2) text += `⠀⌚ Часы: ${chasii[user.pizdenka2 - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name} (${utils.sp(user.misc.farm_count)} шт.)\n`;
		if(user.mts1) text += `⠀${secret[user.mts1 - 1].name}\n`;
	}
		if(user.business.length != 0){
			text += `\n\n💼 Бизнесы:\n`;
			for(var i = 0; i < user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n⌚ Дата регистрации: ${user.regDate}`;
	if(message.user.odmen == true|message.user.vip == true) return bot(`профиль игрока:\n${text}`);
}

	if(message.user.odmen == true){
	
	text += `🔎 ID: ${user.uid}\n`;
	if(user.polnom == 2) text += `🏆 VIP-персона\n`;
	if(user.polnom == 4) text += `🏆 VIP-персона\n`;
	if(user.polnom == 6) text += `🏆 VIP-персона\n`;
	if(user.polnom == 8) text += `🏆 VIP-персона\n`;	
	if(user.polnom >= 10) text += `🔥 ADMINISTRATOR\n`;
	if(user.clanid == false) text += ``;
	if(user.clanid !== false) text += `⚔ Клан: ${clans[user.clanid].name}\n`;
	text += `📝 Никнейм: ${user.tag}\n`;
	text += `&#128279; Ссылка:  vk.com/id${user.id}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `💽 Биткоинов: ${utils.sp(user.btc)}\n`;
	if(user.case) text += `🎁 Lucky-Кейсов: ${utils.sp(user.case)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	text += `🎓 Знаний: ${utils.sp(user.level)}\n`;
	if(user.work) text += `${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `❤ В браке с [id${users[user.marriage.partner].id}|${users[user.marriage.partner].tag}]\n`;

	if(user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
		user.realty.home || user.realty.apartment ||
		user.misc.phone || user.misc.farm || user.transport.car.length != 0 || user.mts1 || user.pizdenka2){
		text += `\n📦 Имущество:\n`;
		if(user.pet.length !== 0){ 
		for(var i = 0; i < user.pet.length; i++){
		text += `⠀${pets[user.pet[i].id - 1][user.pet[i].upgrade - 1].icon } Питомец: ${user.pet[i].name}\n`;
			}
		}
		if(user.transport.car.length != 0){
		for(var i = 0; i < user.transport.car.length; i++){
		text += `⠀🚗 Машина: ${cars[user.transport.car[i].id - 1][user.transport.car[i].upgrade - 1].name}\n`;
			}
		}
		if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.pizdenka2) text += `⠀⌚ Часы: ${chasii[user.pizdenka2 - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name} (${utils.sp(user.misc.farm_count)} шт.)\n`;
		if(user.mts1) text += `⠀${secret[user.mts1 - 1].name}\n`;
	}
		if(user.business.length != 0){
			text += `\n\n💼 Бизнесы:\n`;
			for(var i = 0; i < user.business.length; i++)
			{
				text += `⠀${ businesses[user.business[i].id - 1][user.business[i].upgrade - 1].icon } ${businesses[user.business[i].id - 1][user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n⌚ Дата регистрации: ${user.regDate}`;
	if(message.user.odmen == true|message.user.vip == true) return bot(`профиль игрока:\n${text}`);
}

});

cmd.hear(/^(?:проф|профиль|гет|get)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => { 
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);

	if(message.user.polnom < 2){
		return bot(`данная команда доступна с привилегии VIP и выше ${donatich}`, {attachment: ``});
	}

var domain = message.args[2].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[2] 
}).then((res) => { 
let user = users.find(x=> x.id === Number(res.object_id));
if(!user) return bot(`данный игрок не зарегистрирован.`); 

return bot(`ID игрока: ${user.uid}\n📝 Ник игрока: ${user.tag}\n❓Подробнее по команде "Поиск ${user.uid}"`); 
})
});

cmd.hear(/^(?:банк)\s(?:снять|вывести)\s(.*)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!message.args[1]) return bot(`использование: «банк снять [сумма]» ${luckych}`);
	if(!Number(message.args[1])) return bot(`использование: «банк снять [сумма]» ${luckych}
	💳 В банке: ${utils.sp(message.user.bank)}$`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 49) return bot(`укажите число больше 50 ${luckych}`);

	if(message.user.bank <= 0) return bot(`у вас нет денег на банковском счёте.`);

	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы в банке.`);
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

	if(message.user.lte2 == false){
		return bot(`вы сняли ${utils.sp(message.args[1])}$ ${luckych}
💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
		return bot(`вы сняли ${utils.sp(message.args[1])}$ ${luckych}
💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}

}
});

cmd.hear(/^(?:банк помощь|банк помощ)$/i, async (message, bot) => {
	return bot(`зачем нужен банк?

🏦 Вложенные средства в банке со временем увеличиваются на несколько процентов, что приносит Вам прибыль.

📈 В любой момент Вы можете снять свои деньги с банка без РИСКОВ и ШТРАФОВ!

✍🏻 Введите «Банк [сумма]» для пополнения.
💳 Введите «Банк снять [сумма]» для снятия.`);
});

cmd.hear(/^(?:банк|банк положить|банк пополнить|положить в банк)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return bot(`укажите сумму больше 50$ ${luckych}`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`минимальная сумма вклада 50$ ${luckych}`);
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$ ${luckych}`);
	if(message.user.polnom < 2){
	if(message.user.bank + message.args[1] > 350000000000) return bot(`на счету в банке не может лежать одновременно больше 350.000.000.000$`);
	}
	if(message.user.polnom >= 10){
	if(message.user.bank + message.args[1] > 3000000000000) return bot(`на счету в банке не может лежать одновременно больше 3.000.000.000.000$`);
	}
	if(message.user.polnom == 2){
	if(message.user.bank + message.args[1] > 600000000000) return bot(`на счету в банке не может лежать одновременно больше 600.000.000.000$`);
	}
	if(message.user.polnom == 4){
	if(message.user.bank + message.args[1] > 600000000000) return bot(`на счету в банке не может лежать одновременно больше 600.000.000.000$`);
	}
	if(message.user.polnom == 6){
	if(message.user.bank + message.args[1] > 600000000000) return bot(`на счету в банке не может лежать одновременно больше 600.000.000.000$`);
	}
	if(message.user.polnom == 8){
	if(message.user.bank + message.args[1] > 600000000000) return bot(`на счету в банке не может лежать одновременно больше 600.000.000.000$`);
	}
	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$ ✅

💰 Счёт банка: ${utils.sp(message.user.bank)}$`);
return message.sendSticker(712);
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
		message.user.notifications = true;
		return bot(`уведомления включены! 🔔`);
	}
});

cmd.hear(/^(?:оповещения|оповещение)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mts2 = true;
		return bot(`вы больше не сможете получать оповещения о вашем клане! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mts2 = false;
		return bot(`оповещения включены! 🔔`);
	}
});

cmd.hear(/^(?:подписаться|подписка|подписатся|подписаца|🔑 Подписаться|🔑Подписаться|«Подписаться»)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

if(message.user.krutoi2 == false){
	return bot(`вы уже подписаны на рассылку, скоро сообщу кое-что крутое ${luckych}`);
}else{
		message.user.krutoi2 = false;
		return bot(`вы успешно подписались на рассылку о новых раздачах и акциях! ${luckych}`);
}

});

cmd.hear(/^(?:отписаться)$/i, async (message, bot) => {
const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);

if(message.isChat){
	return bot(`данная команда работает в личных сообщениях с ботом.`);
}else{
		if(message.user.krutoi2 == true){
			return bot(`вы уже отписаны от рассылки ${donatich}
✅ Введите «Подписаться» для подписки.`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"65\"}",
				"label": "🔑 Подписаться"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"87\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
		}

		if(message.user.krutoi2 == false){
		message.user.krutoi2 = true;
		return bot(`теперь я тебе ничего не сообщу о новых раздачах и акциях.
❓Подписаться можно по команде «Подписаться»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"65\"}",
				"label": "🔑 Подписаться"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"87\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}
}

});

cmd.hear(/^(?:give|гив)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.senderId !== 301015165| message.senderId !== 566793757) return;
	if(message.args[2] <= 0) return;

	if(message.args[2] == 5000000000){
	if(message.args[2] !== 1000000000000){
	if(message.args[2] !== 100000000000){
	if(message.args[2] !== 50000000000){
		var order = 3242522;
	}
}
}
}
	if(message.args[2] == 50000000000){
	if(message.args[2] !== 5000000000){
	if(message.args[2] !== 1000000000000){
	if(message.args[2] !== 100000000000){
		var order = 3242523;
	}
}
}
}
	if(message.args[2] == 100000000000){
	if(message.args[2] !== 50000000000){
	if(message.args[2] !== 5000000000){
	if(message.args[2] !== 1000000000000){
		var order = 3242524;
	}
}
}
}
	if(message.args[2] == 1000000000000){
	if(message.args[2] !== 100000000000){
	if(message.args[2] !== 50000000000){
	if(message.args[2] !== 5000000000){
		var order = 3356896;
	}
}
}
}
	if(message.args[2] !== 1000000000000){
	if(message.args[2] !== 100000000000){
	if(message.args[2] !== 50000000000){
	if(message.args[2] !== 5000000000){
		var order = 3356896;
	}
}
}
}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.balance += message.args[2];
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы успешно пополнили свой счёт на ${utils.sp(message.args[2])}$ 🤑`, attachment:`market-191380914_${order}`});
});

cmd.hear(/^(?:бизик)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
if(message.senderId !== 301015165| message.senderId !== 566793757| message.senderId !== 576563997) return;
	if(message.args[2] <= 0) return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);

		user.ban = false;
		user.business.push({
		"id": message.args[2],
		"upgrade": 1,
		"workers": 5000,
		"moneys": 0
	});
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} бизнес!`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы успешно приобрели Лучший Бизнес! 💼`, attachment:'' });
});

cmd.hear(/^(?:питомчик)\s([0-9]+)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
if(message.polnom < 10) return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);

		user.ban = false;
		user.pet = [];
		user.pet.push({
		"id": 10,
		"upgrade": 1,
		"date": getUnix(),
		"name": "Мартышка",
		"food": 100,
		"play": 100,
		"work": 1,
		"zapas": 1
		});
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] мартышку!`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы успешно приобрели лучшего питомца! 🐵

🖼 Инфа о вашем питомце: питомец`,
			attachment:'photo-182435125_457257374',
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "🦊 Питомец"
		},
			"color": "positive" 
		}]
		]
		})
	});
});

cmd.hear(/^(?:донкейс)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.polnom < 10) return;
	if(message.args[2] <= 0) return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.case += message.args[2];
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} Lucky-Кейс!`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы успешно приобрели ${utils.sp(message.args[2])} Lucky-Кейс! 🎁
➡ Открытие: кейс`, attachment:'' });
});

cmd.hear(/^(?:yashick)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	botinfo.iddonate += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.polnom < 10) return;
	if(message.args[2] <= 0) return;

		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.case += message.args[2];
		await bot(`вы выдали игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} Lucky-Кейсов!`);
		vk.api.messages.send({ user_id: user.id, message: `🛍 [id${user.id}|${user.tag}], вы успешно приобрели ${utils.sp(message.args[2])} Lucky-Кейсов! 🎁
➡ Открытие: кейс`, attachment:'' });
});

cmd.hear(/^(?:открыть 1)$/i, async (message, bot) => {
const smileerror = utils.pick([`😳`, `😒`,`😟`,`🙄`,`🤔`]);
const smilesuccess = utils.pick([`🤤`, `☺`,`🙂`,`😁`,`😏`, `🤑`]);

if(message.user.case1 == 0) return bot(`у вас нет кейсов.
❓Покупка «Кейс 1»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 1"
		},
			"color": "primary" 
		}]
		]
			})
		});
message.user.case1 -= 1;

let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

if(prize2 === 1)
{
message.user.level += 8;
return bot(`вы выиграли 8 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 2)
{
message.user.level += 20;
return bot(`вы выиграли 20 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 3)
{
message.user.level += 12;
return bot(`вы выиграли 12 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 4)
{
message.user.balance += 1500000000;
return bot(`вы выиграли 1.500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 5)
{
message.user.balance += 1100000000;
return bot(`вы выиграли 1.100.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 6)
{
message.user.rating += 7;
return bot(`вы выиграли 7 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}
if(prize2 === 7)
{
message.user.rating += 3;
return bot(`вы выиграли 3 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 8)
{
message.user.case2 += 1;
return bot(`вы выиграли «Стандартный кейс», вам крупно повезло! 📦 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 9)
{
message.user.rating += 5;
return bot(`вы выиграли 5 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 10)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 11)
{
message.user.balance += 900000000;
return bot(`вы выиграли 900.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 12)
{
message.user.balance += 3000000000;
return bot(`вы выиграли 3.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 13)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 14)
{
message.user.balance += 1000000000;
return bot(`вы выиграли 1.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 15)
{
message.user.balance += 900000000;
return bot(`вы выиграли 900.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 16)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 17)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 18)
{
message.user.balance += 900000000;
return bot(`вы выиграли 900.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 19)
{
message.user.balance += 1100000000;
return bot(`вы выиграли 1.100.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 20)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 21)
{
message.user.balance += 900000000;
return bot(`вы выиграли 900.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 22)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 23)
{
message.user.balance += 500000000;
return bot(`вы выиграли 500.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 24)
{
message.user.balance += 100000000;
return bot(`вы выиграли 100.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 25)
{
message.user.balance += 50000000;
return bot(`вы выиграли 50.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

});

cmd.hear(/^(?:открыть 2)$/i, async (message, bot) => {
const smileerror = utils.pick([`😳`, `😒`,`😟`,`🙄`,`🤔`]);
const smilesuccess = utils.pick([`🤤`, `☺`,`🙂`,`😁`,`😏`, `🤑`]);

if(message.user.case2 == 0) return bot(`у вас нет кейсов.
❓Покупка «Кейс 2»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 2"
		},
			"color": "primary" 
		}]
		]
			})
		});
message.user.case2 -= 1;

let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

if(prize2 === 1)
{
message.user.level += 69;
return bot(`вы выиграли 69 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 2)
{
message.user.level += 45;
return bot(`вы выиграли 45 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 3)
{
message.user.level += 30;
return bot(`вы выиграли 30 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 4)
{
message.user.balance += 40000000000;
return bot(`вы выиграли 40.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 5)
{
message.user.balance += 27000000000;
return bot(`вы выиграли 27.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 6)
{
message.user.rating += 150;
return bot(`вы выиграли 150 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}
if(prize2 === 7)
{
message.user.rating += 80;
return bot(`вы выиграли 80 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 8)
{
message.user.case3 += 1;
return bot(`вы выиграли «Золотой кейс», вам крупно повезло! 📦 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 9)
{
message.user.balance += 7000000000;
return bot(`вы выиграли 7.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 10)
{
message.user.rating += 200;
return bot(`вы выиграли 200 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}
if(prize2 === 11)
{
message.user.rating += 228;
return bot(`вы выиграли 228 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}
if(prize2 === 12)
{
message.user.balance += 37000000000;
return bot(`вы выиграли 37.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 13)
{
message.user.rating += 30;
return bot(`вы выиграли 30 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 14)
{
message.user.rating += 222;
return bot(`вы выиграли 222 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 15)
{
message.user.balance += 45000000000;
return bot(`вы выиграли 45.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 16)
{
message.user.balance += 20000000000;
return bot(`вы выиграли 20.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 17)
{
message.user.balance += 60000000000;
return bot(`вы выиграли 60.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 18)
{
message.user.balance += 15000000000;
return bot(`вы выиграли 15.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 19)
{
message.user.balance += 3000000000;
return bot(`вы выиграли 3.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 20)
{
message.user.balance += 20000000000;
return bot(`вы выиграли 20.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 21)
{
message.user.balance += 9000000000;
return bot(`вы выиграли 9.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 22)
{
message.user.balance += 9000000000;
return bot(`вы выиграли 9.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 23)
{
message.user.balance += 20000000000;
return bot(`вы выиграли 20.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 24)
{
message.user.balance += 5000000000;
return bot(`вы выиграли 5.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 25)
{
message.user.balance += 10000000000;
return bot(`вы выиграли 10.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

});

cmd.hear(/^(?:открыть 3)$/i, async (message, bot) => {
const smileerror = utils.pick([`😳`, `😒`,`😟`,`🙄`,`🤔`]);
const smilesuccess = utils.pick([`🤤`, `☺`,`🙂`,`😁`,`😏`, `🤑`]);

if(message.user.case3 == 0) return bot(`у вас нет кейсов.
❓Покупка «Кейс 3»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 3"
		},
			"color": "primary" 
		}]
		]
			})
		});
message.user.case3 -= 1;

let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

if(prize2 === 1)
{
message.user.level += 199;
return bot(`вы выиграли 199 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 2)
{
message.user.level += 111;
return bot(`вы выиграли 111 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 3)
{
message.user.level += 219;
return bot(`вы выиграли 219 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 4)
{
message.user.balance += 60000000000;
return bot(`вы выиграли 60.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 5)
{
message.user.balance += 160000000000;
return bot(`вы выиграли 160.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 6)
{
message.user.balance += 500000000000;
return bot(`вы выиграли 500.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 7)
{
message.user.rating += 800;
return bot(`вы выиграли 800 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 8)
{
message.user.balance += 90000000000;
return bot(`вы выиграли 90.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 9)
{
message.user.rating += 999;
return bot(`вы выиграли 999 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 10)
{
message.user.balance += 140000000000;
return bot(`вы выиграли 140.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 11)
{
message.user.balance += 200000000000;
return bot(`вы выиграли 200.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 12)
{
message.user.balance += 180000000000;
return bot(`вы выиграли 180.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 13)
{
message.user.balance += 50000000000;
return bot(`вы выиграли 50.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 14)
{
message.user.balance += 10000000000;
return bot(`вы выиграли 10.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 15)
{
message.user.balance += 8000000000;
return bot(`вы выиграли 8.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 16)
{
message.user.level += 100;
return bot(`вы выиграли 100 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 17)
{
message.user.rating += 100;
return bot(`вы выиграли 100 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 18)
{
message.user.rating += 110;
return bot(`вы выиграли 110 рейтинга 👑 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 19)
{
message.user.level += 111;
return bot(`вы выиграли 111 знаний 🎓 ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 20)
{
message.user.balance += 8000000000;
return bot(`вы выиграли 8.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 21)
{
message.user.balance += 130000000000;
return bot(`вы выиграли 130.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 22)
{
message.user.balance += 8000000000;
return bot(`вы выиграли 8.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 23)
{
message.user.balance += 60000000000;
return bot(`вы выиграли 60.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

if(prize2 === 24)
{
message.user.balance += 8000000000;
return bot(`вы выиграли 8.000.000.000$ ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
}

});

cmd.hear(/^(?:праздничный бокс|🎄 Открыть|открыть бокс)$/i, async (message, bot) => {
const smileerror = utils.pick([`😳`, `😒`,`😟`,`🙄`,`🤔`]);
if(message.user.case4 < 1) return bot(`у вас нет сюрприз бокса ${smileerror}`,{attachment:''});

message.user.case4 -= 1;
let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
if(prize2 === 1)
{
message.user.mts1 = 9;
bot(`вы выбили уникальный объект «🎅 Сани Деда Мороза»! 🤑

🎁 В скором времени его можно будет продать за хорошую цену.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16592);
}

if(prize2 === 2)
{
message.user.mts1 = 8;
bot(`вы выбили уникальный объект «⛄ Снеговик Олух»! 🤑

🎁 В скором времени его можно будет продать за хорошую цену.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16592);
}

if(prize2 === 3)
{
message.user.balance += 10000000000000;
bot(`вы нашли 10.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 4)
{
message.user.balance += 10000000000000;
bot(`вы нашли 10.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 5)
{
message.user.balance += 100000000000000;
bot(`вы нашли 100.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 6)
{
message.user.balance += 1000000000000000;
bot(`ДЖЕКПОТ! Вы нашли 1.000.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 7)
{
message.user.balance += 150000000000000;
bot(`вы нашли 150.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 8)
{
message.user.balance += 15000000000000;
bot(`вы нашли 15.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 9)
{
message.user.balance += 10000000000000;
bot(`вы нашли 10.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

if(prize2 === 10)
{
message.user.balance += 50000000000000;
bot(`вы нашли 50.000.000.000.000$ под ёлкой! 🎄🤑`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
			})
		});
return message.sendSticker(16159);
}

});

cmd.hear(/^(?:сундуки|кейсы)$/i, async (message, bot) => {
let text = ``;

text += `\n1⃣ Начинающий Кейс — 1 млрд $\n🛒 Купить: «Кейс 1 [кол-во]»\n\n`;
text += `2⃣ Стандартный Кейс — 30 млрд $\n🛒 Купить: «Кейс 2 [кол-во]»\n\n`;
text += `3⃣ Золотой Кейс — 150 млрд $\n🛒 Купить: «Кейс 3 [кол-во]»\n\n`;
text += `4⃣ Lucky-Кейс — 10 руб\n🛒 Купить: «Кейс 4 [кол-во]»\n`;

if(message.user.case1 || message.user.case2 || message.user.case3 || message.user.case)
{
text += `\n👜 Ваши кейсы:\n\n`;
if(message.user.case1) text += `📦 Начинающий Кейс (х${message.user.case1} шт.)\nОткрыть: «Открыть 1»\n\n`;
if(message.user.case2) text += `📦 Стандартный Кейс (х${message.user.case2} шт.)\nОткрыть: «Открыть 2»\n\n`;
if(message.user.case3) text += `📦 Золотой Кейс (х${message.user.case3} шт.)\nОткрыть: «Открыть 3»\n\n`;
if(message.user.case) text += `📦 Lucky-Кейс (х${message.user.case} шт.)\nОткрыть: «Открыть 4»\n`;
}
return bot(`кейсы:\n${text}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Кейс инфо 1"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Кейс инфо 3"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Кейс инфо 4"
		},
			"color": "positive"
		}]
		]
			})
		});

});

cmd.hear(/^(?:кейс инфо 1)$/i, async (message, bot) => {

return bot(`из "Начинающего Кейса" может выпасть:

1⃣ Знания.
2⃣ Игровая валюта.
3⃣ Рейтинг.
4⃣ Стандартный Кейс.

🛒 Купить: "кейс 1 [кол-во]"`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 1"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:кейс инфо 2)$/i, async (message, bot) => {

return bot(`из "Стандартного Кейса" может выпасть:

1⃣ Знания.
2⃣ Игровая валюта.
3⃣ Рейтинг.
4⃣ Золотой Кейс.

🛒 Купить: "кейс 2 [кол-во]"`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 2"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:кейс инфо 3)$/i, async (message, bot) => {

return bot(`из "Золотого Кейса" может выпасть:

1⃣ Знания.
2⃣ Игровая валюта.
3⃣ Рейтинг.

🛒 Купить: "кейс 3 [кол-во]"`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 3"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:кейс инфо 4)$/i, async (message, bot) => {

return bot(`из "Lucky-Кейса" может выпасть:

1⃣ Знания.
2⃣ Игровая валюта.
3⃣ Рейтинг.
4⃣ Золотой Кейс.
5⃣ Имущество.
6⃣ VIP статус.
7⃣ Админка.
8⃣ Увеличение лимита.
9⃣ Lucky-Кейсы
🔟 Лучший бизнес.

🛒 Купить: "кейс 4 [кол-во]"`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Кейс 4"
		},
			"color": "positive" 
		}]
		]
			})
		});

});

cmd.hear(/^(?:сунду(к|ки) 4|кей(с|сы) 4)$/i, async (message, bot) => {
return bot(`покупка в автоматическом режиме: скоро будет автодонат`, {attachment:''});
});

cmd.hear(/^(?:сунду(к|ки) 4|кей(с|сы) 4)\s(.*)$/i, async (message, bot) => {
return bot(`покупка в автоматическом режиме: скоро будет автодонат`, {attachment:''});
});

cmd.hear(/^(?:сунду(к|ки) 3|кей(с|сы) 3)$/i, async (message, bot) => {
if(message.user.balance < 150000000000) return bot (`недостаточно средств.`);
message.user.balance -= 150000000000;
message.user.case3 += 1;
return bot(`вы купили «Золотой кейс» за 150.000.000.000$ 🙃

❓Для открытия введите «открыть 3»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:сундук 3|сундуки 3|кейс 3|кейсы 3)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return bot(`укажите число. ${luckych}`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`укажите число больше чем 0.`);

if(message.user.balance < 150000000000 * message.args[1]) return bot (`недостаточно средств.
❓Вам хватает на покупку ${utils.sp(Math.floor(message.user.balance / 150000000000))} золотых кейсов.`);

message.user.balance -= 150000000000 * message.args[1];
message.user.case3 += message.args[1];
return bot(`вы купили ${utils.sp(message.args[1])} «Золотой кейс» за ${utils.sp(message.args[1] * 150000000000)}$ 🙃

❓Для открытия введите «открыть 3»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 3"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:сунду(к|ки) 2|кей(с|сы) 2)$/i, async (message, bot) => {
if(message.user.balance < 30000000000) return bot(`недостаточно средств.`);

message.user.balance -= 30000000000;
message.user.case2 += 1;
	return bot(`вы купили «Стандартный кейс» за 30.000.000.000$ 🙃

❓Для открытия введите «открыть 2»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:сундук 2|сундуки 2|кейс 2|кейсы 2)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return bot(`укажите число. ${luckych}`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`укажите число больше чем 0.`);

if(message.user.balance < 30000000000 * message.args[1]) return bot (`недостаточно средств.
❓Вам хватает на покупку ${utils.sp(Math.floor(message.user.balance / 30000000000))} стандартных кейсов.`);

message.user.balance -= 30000000000 * message.args[1];
message.user.case2 += message.args[1];
return bot(`вы купили ${utils.sp(message.args[1])} «Стандартный кейс» за ${utils.sp(message.args[1] * 30000000000)}$ 🙃

❓Для открытия введите «открыть 2»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 2"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:сундук 1|сундуки 1|кейс 1|кейсы 1)$/i, async (message, bot) => {
if(message.user.balance < 1000000000) return bot (`недостаточно средств.`);
message.user.balance -= 1000000000;
message.user.case1 += 1;
	return bot(`вы купили «Начинающий кейс» за 1.000.000.000$ 🙃

❓Для открытия введите «открыть 1»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:сундук 1|сундуки 1|кейс 1|кейсы 1)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return bot(`укажите число. ${luckych}`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`укажите число больше чем 0.`);

if(message.user.balance < 1000000000 * message.args[1]) return bot (`недостаточно средств.
❓Вам хватает на покупку ${utils.sp(Math.floor(message.user.balance / 1000000000))} начинающих кейсов.`);

message.user.balance -= 1000000000 * message.args[1];
message.user.case1 += message.args[1];
return bot(`вы купили ${utils.sp(message.args[1])} «Начинающий кейс» за ${utils.sp(message.args[1] * 1000000000)}$ 🙃

❓Для открытия введите «открыть 1»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Открыть 1"
		},
			"color": "secondary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:рулетка красное|рулетка ред|ред рулетка|рулетка красный|красный рулетка|красное рулетка|рулетка красная)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`используйте: «Рулетка красное [сумма]» ${luckych}`);
});

cmd.hear(/^(?:рулетка черное|рулетка чёрное|рулетка черный|рулетка чёрный|черный рулетка|чёрный рулетка|рулетка блек|блек рулетка|черное рулетка|чёрное рулетка|рулетка черная|рулетка чёрная)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`используйте: «Рулетка чёрное [сумма]» ${luckych}`);
});

cmd.hear(/^(?:рулетка зиро|рулетка зеро|рулетка zero|зиро рулетка|зеро рулетка|zero рулетка|рулетка ноль|рулетка грин|грин рулетка|зеленое рулетка|зелёное рулетка|рулетка зеленое|рулетка зелёная|рулетка зелёное)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`используйте: «Рулетка зеро [сумма]» ${luckych}`);
});

cmd.hear(/^(?:рулетка красное|рулетка ред|ред рулетка|рулетка красный|красный рулетка|красное рулетка|рулетка красная)\s(.*)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё|вб)/ig, message.user.balance);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(!Number(message.args[1])) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});
	
	if(message.args[1] <= 0) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});

	if(message.args[1] > message.user.balance){
	if(message.user.lte2 == false){
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
}

	if(message.args[1] >= 150000000000){
	let prizes = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
	let reds = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let blacks = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prizes === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 2)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${reds} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 4)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 6)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${reds} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 8)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 10)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${reds} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 12)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 14)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${reds} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 16)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало 🍀ZERO🍀, ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
	}
}

	if(message.args[1] < 150000000000){
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
	let red = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let black = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prize === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 2)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 4)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 6)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 8)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 10)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 12)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 14)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 16)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${red} (🛑красное🛑), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало 🍀ZERO🍀, ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
	}
}
});

cmd.hear(/^(?:рулетка черное|рулетка чёрное|рулетка черный|рулетка чёрный|черный рулетка|чёрный рулетка|рулетка блек|блек рулетка|черное рулетка|чёрное рулетка|рулетка черная|рулетка чёрная)\s(.*)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё|вб)/ig, message.user.balance);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(!Number(message.args[1])) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});

	if(message.args[1] <= 0) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});

	if(message.args[1] > message.user.balance){
	if(message.user.lte2 == false){
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
}

	if(message.args[1] >= 150000000000){
	let prizes = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
	let reds = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let blacks = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prizes === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 2)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${blacks} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 4)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 6)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${blacks} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 8)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 10)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${blacks} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 12)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 14)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${blacks} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 16)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало 🍀ZERO🍀, ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
	}
}

	if(message.args[1] < 150000000000){
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
	let red = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let black = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prize === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 2)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 4)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 6)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 8)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 10)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 12)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 14)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 16)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 2);
		return bot(`выпало ${black} (⚫чёрное⚫), вы выиграли ${utils.sp(message.args[1] * 2)}$ ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало 🍀ZERO🍀, ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
	}
}
});

cmd.hear(/^(?:рулетка зиро|рулетка зеро|рулетка zero|зиро рулетка|зеро рулетка|zero рулетка|рулетка ноль|рулетка грин|грин рулетка|зеленое рулетка|зелёное рулетка|рулетка зеленое|рулетка зелёное)\s(.*)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё|вб)/ig, message.user.balance);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(!Number(message.args[1])) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});

	if(message.args[1] <= 0) return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});

	if(message.args[1] > message.user.balance){
	if(message.user.lte2 == false){
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`у вас нет столько денег ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
}

	if(message.args[1] >= 150000000000){
	let prizes = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]);
	let reds = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let blacks = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prizes === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 2)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 4)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 6)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 8)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 10)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 12)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 14)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 16)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 19)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 20)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 21)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 22)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 23)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 24)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 25)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 26)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 27)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 28)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 29)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 30)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 31)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 32)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 33)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 34)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 35)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 36)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 37)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 38)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 39)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 40)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 41)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 42)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 43)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 44)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 36);
		bot(`сегодня ваш день! Вам выпало 🍀ZERO🍀, вы выиграли ${utils.sp(message.args[1] * 36)}$ (х36) ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(726);
	}

	if(prizes === 45)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${reds} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prizes === 46)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${blacks} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	}
}

	if(message.args[1] < 150000000000){
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]);
	let red = utils.pick([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
	let black = utils.pick([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

	if(message.args[1] <= message.user.balance){

	if(prize === 1)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 2)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 3)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 4)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 5)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 6)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 7)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 8)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 9)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 10)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 11)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 12)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 13)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 14)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 15)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 16)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 17)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 18)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 19)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 20)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 21)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 22)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 23)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 24)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 25)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 26)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 27)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 28)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 29)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 30)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 31)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 32)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 33)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 34)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 35)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${red} (🛑красное🛑), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 36)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}

	if(prize === 37)
	{
		progressQuest(message.user, 4)
		message.user.balance -= message.args[1];
		message.user.balance += Math.floor(message.args[1] * 36);
		bot(`сегодня ваш день! Вам выпало 🍀ZERO🍀, вы выиграли ${utils.sp(message.args[1] * 36)}$ (х36) ✅
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(726);
	}

	if(prize === 38)
	{
		resetQuest(message.user, 4)
		message.user.balance -= message.args[1];
		return bot(`выпало ${black} (⚫чёрное⚫), ставка слита ❌
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
	}
}
});

cmd.hear(/^(?:рулетка|🕹 Рулетка|🕹Рулетка|рулетке)$/i, async (message, bot) => {
	return bot(`как сыграть в рулетку?

🕹 Необходимо предугадать какой выпадет цвет!

🛑 Выпадет красное:
✏ рулетка красное [ставка] — в случае выигрыша вы получаете х2 со ставки.

⚫ Выпадет черное:
✏ рулетка черное [ставка] — в случае выигрыша вы получаете х2 со ставки.

🍀 Выпадет зеро:
✏ рулетка зеро [ставка] — в случае выигрыша вы получаете х36 со ставки.`, {attachment: `photo-182435125_457257352`});
});

cmd.hear(/^(?:ban|бан|забанить)\s([0-9]+)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
	if(message.user.odmen == false) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
	if(message.user.odmen == true){

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(user.polnom >= 10) return bot(`у данного игрока имеется привилегия против бана! ${phrase}`);
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.ban == true) return bot(`данный игрок уже забанен ${phrase}`);
		if(message.user.ag > getUnix()) return bot(`вы сможете забанить еще одного игрока через ${unixStampLeft(message.user.ag - Date.now())} ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете забанить самого себя ${phrase}`);

		user.ban = true;
		getUnix() + 43200000
		message.user.ag = getUnix() + 43200000;
		await bot(`вы ЗАБАНИЛИ игрока ${user.tag} ${phrase}`);
		vk.api.messages.send({ user_id: user.id, message: 
		`▶ Администратор [id${message.user.id}|${message.user.tag}] забанил вас ${phrase}`, attachment: ''});
	}
	}
});

cmd.hear(/^(?:бантайм|мут|bantime)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
	if(!Number(message.args[1])) return bot(`использование: «Бантайм 228 15»`);
	if(!Number(message.args[2])) return bot(`использование: «Бантайм ${message.args[1]} 15»`);
	if (message.args[2] >= 1441) return bot(`укажите число не больше 1440 ${phrase}`);
	if(message.user.odmen == false) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
	if(message.user.odmen == true){

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(user.polnom >= 10) return bot(`у данного игрока имеется привилегия против бана! ${phrase}`);
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.ban == true) return bot(`данный игрок уже забанен ${phrase}`);
		if(message.user.hrust1 > getUnix()) return bot(`вы сможете забанить еще одного игрока через ${unixStampLeft(message.user.hrust1 - Date.now())} ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете забанить самого себя ${phrase}`);

		getUnix() + message.args[2] * 60000
		user.pizdenka1 = getUnix() + message.args[2] * 60000;
		message.user.hrust1 = getUnix() + 21600000;
		await bot(`вы ЗАБАНИЛИ игрока ${user.tag} на ${message.args[2]} минут ${phrase}`);
		vk.api.messages.send({ user_id: user.id, message: 
		`▶ Вы забанены на ${message.args[2]} минут ${phrase}`, attachment: ''});
	}
	}
});

cmd.hear(/^(?:unban|разбан|разбанить)\s([0-9]+)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	if(message.user.odmen == false) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
	if(message.user.odmen == true){

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(user.polnom >= 10) return bot(`у данного игрока имеется привилегия против бана! ${phrase}`);
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете разбанить самого себя ${phrase}`);
		if(user.ban == false) return bot(`у данного игрока нет бана.`);

		user.ban = false;
		user.pizdenka1 = 2;
		await bot(`вы РАЗБАНИЛИ игрока ${user.tag} ${luckych}`);
		vk.api.messages.send({ user_id: user.id, message: 
		`▶ Администратор ${message.user.tag} разбанил вас, приятной игры! ${luckych}`});
	}
	}
});

cmd.hear(/^(?:unban|разбан|разбанить)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	if(message.user.odmen == false) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
	if(message.user.odmen == true)
	{
		let user = await users.find(x=> x.id === message.forwards[0].senderId);
		if(user.polnom >= 10) return bot(`у данного игрока имеется привилегия против бана! ${phrase}`);
		if(!user) return bot(`такого игрока не существует ${phrase}`);
		if(user.uid === message.user.uid) return bot(`вы не можете разбанить самого себя ${phrase}`);
		if(user.ban == false) return bot(`у данного игрока нет бана.`);

		user.ban = false;
		user.pizdenka1 = 2;
		await bot(`вы РАЗБАНИЛИ игрока ${user.tag} ${luckych}`);
		vk.api.messages.send({ user_id: user.id, message: 
		`▶ Администратор ${message.user.tag} разбанил вас, приятной игры! ${luckych}`});
	}
});

cmd.hear(/^(?:подкрутка|подкрутить)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.kavooo = true;
		user.hardcore = false;
		return bot(`вы выдали игроку ${user.tag} подкрутку`);
});

cmd.hear(/^(?:лимит1)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.limipered2 = false;
		user.limipered1 = true;
		user.kredit1 = true;
		return bot(`вы выдали игроку ${user.tag} лимит в 5кккк`);
});

cmd.hear(/^(?:лимит)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.limipered2 = true;
		user.limipered1 = false;
		user.kredit1 = true;
		return bot(`вы выдали игроку ${user.tag} лимит в 100кккк`);
});

cmd.hear(/^(?:бокс)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.limipered2 = true;
		user.limipered1 = false;
		user.kredit1 = true;
		user.odmen = true;
		user.polnom = 10;
		user.vip = false;
		user.balance += 50000000000000;
		user.ban = false;
		user.business.push({
		"id": 12,
		"upgrade": 1,
		"workers": 5000,
		"moneys": 0
	});
	vk.api.messages.send({ user_id: user.id, message: `🔥 [id${user.id}|${user.tag}], вы успешно приобрели "новогодний бокс", теперь вам доступны: админка, лучший бизнес, лимит на передачу до 100.000.000.000.000$ и 50.000.000.000.000$!
👥 Беседа: vk.cc/arO3K5
📚 Команды: апомощь`,
			attachment:'',
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "профиль"
		},
			"color": "positive" 
		}]
		]
		})
	});
	return bot(`вы выдали игроку [id${user.id}|${user.tag}] набор!`);
});

cmd.hear(/^(?:абв123)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.case4 += 1;
	vk.api.messages.send({ user_id: user.id, message: `🎁 [id${user.id}|${user.tag}], вы успешно приобрели СЮРПРИЗ БОКС!

🔥 Открыть: открыть бокс`,
			attachment:'',
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🎄 Открыть"
		},
			"color": "positive" 
		}]
		]
		})
	});
	return bot(`вы выдали игроку [id${user.id}|${user.tag}] херню какую-то!`);
});

cmd.hear(/^(?:забрать лимит)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.limipered2 = false;
		user.limipered1 = false;
		user.kredit1 = false;
		return bot(`вы забрали лимит игрока ${user.tag}`);
});

cmd.hear(/^(?:открутка|открутить)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.kavooo = false;
		user.hardcore = true;
		return bot(`вы выдали игроку ${user.tag} открутку`);
});

cmd.hear(/^(?:забрать открутку)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.kavooo = false;
		user.hardcore = false;
		return bot(`вы забрали у игрока ${user.tag} открутку`);
});

cmd.hear(/^(?:забрать подкрутку)\s([0-9]+)$/i, async (message, bot) => {
if(message.polnom < 10) return;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`такого игрока не существует`);
		user.kavooo = false;
		user.hardcore = false;
		return bot(`вы забрали у игрока ${user.tag} подкрутку`);
});

cmd.hear(/^(?:set)\s([0-9]+)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.polnom < 10) return;
	message.args[3] = message.args[3].replace(/(\.|\,)/ig, '');
	message.args[3] = message.args[3].replace(/(к|k)/ig, '000');
	message.args[3] = message.args[3].replace(/(м|m)/ig, '000000');

	if(Number(message.args[3])) message.args[3] = Math.floor(Number(message.args[3]));
	if(message.args[3] == "true" || message.args[3] == "false") message.args[3] = message.args[3] == "true" ? true : false;
	if(message.args[2] == "admin" && bot_owner != message.user.id) return bot(`защищённое поле, недоступное вам для редактирования`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`такого игрока не существует`);

	if(user[message.args[2]] == null) return bot(`такого поля не существует`);
	user[message.args[2]] = message.args[3];

	return bot(`вы сменили поле ${message.args[2]} игроку ${user.tag} на значение ${message.args[3]}`);
});

cmd.hear(/^(?:передать|перевести|передай|перидать|пиредать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const int = utils.random(1, `${users.length - 1}`);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return bot(`как передать деньги другому игроку?

Используй команду:
✏ передать [пересланное сообщение ИЛИ id игрока] [сумма]

📦 Например: передать ${int} 1к`);

	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return bot(`как передать деньги другому игроку?

Используй команду:
✏ передать [пересланное сообщение ИЛИ id игрока] [сумма]

📦 Например: передать ${int} 1к`);

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег ${donatich}
💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:''});
	else if(message.args[2] <= message.user.balance)
	{

		if(message.user.limipered1 == true){
		if(message.user.limipered2 == false){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 5000000000000) return bot(`доступно для отправки: ${utils.sp(5000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}

		if(message.user.limipered1 == false){
		if(message.user.limipered2 == true){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 100000000000000) return bot(`доступно для отправки: ${utils.sp(100000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom < 1){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 10000000000) return bot(`доступно для отправки: ${utils.sp(10000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 2){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 4){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 6){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 8){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom >= 10){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[2] + message.user.limit.sent > 2000000000000) return bot(`доступно для отправки: ${utils.sp(2000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		let user = users.find(x=> x.uid === Number(message.args[1]));
		const luckych = utils.pick([`🤤`, `☺`,`🙂`,`😁`,`😏`,`🤑`]);
		if(!user) return bot(`такого игрока не существует ${donatich}`);

		if(user.uid === message.user.uid) return bot(`неверный ID ${donatich}`);

		message.user.balance -= Math.floor(Number(message.args[2]));
		message.user.limit.sent += message.args[2];
		user.balance += Math.floor(Number(message.args[2]));

		await bot(`вы перевели игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$ ${luckych}
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], новый перевод!
✍🏻 Игрок [id${message.user.id}|${message.user.tag}] перевёл вам ${utils.sp(message.args[2])}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.` });
	}
});

cmd.hear(/^(?:кикнуть|кик)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => {
const luckych = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);

if(!message.isChat) return bot(`команда работает только в беседе ${smileerror}`);
if(message.user.roulette > getUnix()) return bot(`вы сможете исключить ещё одного игрока из беседы через ${unixStampLeft(message.user.roulette - Date.now())} ${luckych}`);
if(message.user.odmen == false){
	return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
}

if(message.user.odmen == true){
	if(message.user.roulette < getUnix()){
		var domain = message.args[2].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.args[2]
		}).then((res) => { 
			let user = users.find(x=> x.id === Number(res.object_id)); 
				vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: res.object_id }) 
				.catch((error) => {
				return bot(`ошибка. ⚠ Возможные причины:\n1⃣ В данной беседе группа не Администратор.\n2⃣ Такого игрока нет в беседе.\n3⃣ Вы хотите кикнуть сообщество.`); 
				});
			getUnix() + 43200000
			message.user.roulette = getUnix() + 43200000;
			return bot(`пользователь был исключён из чата.`); 
		})
	}
}
});

cmd.hear(/^(?:кик|kick|кикнуть)$/i, async (message, bot) => { 
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

if(message.user.odmen == false){
	return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
}

if(!message.isChat) return bot(`команда работает только в беседе.`);
if(message.user.roulette > getUnix()) return bot(`вы сможете исключить ещё одного игрока из беседы через ${unixStampLeft(message.user.roulette - Date.now())} ${luckych}`);

if(message.user.roulette < getUnix()){
if(message.user.odmen == true){
let user = await users.find(x=> x.id === message.forwards[0].senderId); 
if(!user) return bot(`ошибка. Возможно вы не переслали сообщение, либо данного игрока нет в беседе.`);
vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.forwards[0].senderId});
getUnix() + 43200000
message.user.roulette = getUnix() + 43200000;
return bot(`пользователь @id${message.forwards[0].senderId} исключён из беседы.`);
}
}
});

cmd.hear(/^(?:передать|перевести|передай|перидать|пиредать)\s(.*)$/i, async (message, bot) => {
	const int = utils.random(1, `${users.length - 1}`);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return bot(`как передать деньги другому игроку?

Используй команду:
✏ передать [пересланное сообщение ИЛИ id игрока] [сумма]

📦 Например: передать ${int} 1к`);

	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`как передать деньги другому игроку?

Используй команду:
✏ передать [пересланное сообщение ИЛИ id игрока] [сумма]

📦 Например: передать ${int} 1к`);

	if(message.args[1] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[1] <= message.user.balance)
	{
		if(message.user.limipered1 == true){
		if(message.user.limipered2 == false){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 5000000000000) return bot(`доступно для отправки: ${utils.sp(5000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == true){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 100000000000000) return bot(`доступно для отправки: ${utils.sp(100000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom < 1){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 10000000000) return bot(`доступно для отправки: ${utils.sp(10000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 2){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 4){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 6){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom == 8){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 600000000000) return bot(`доступно для отправки: ${utils.sp(600000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.user.limipered1 == false){
		if(message.user.limipered2 == false){
		if(message.user.polnom >= 10){
		if(message.user.limit == null) message.user.limit = { timer: utils.time(), sent: 0 };
		if(utils.time() - message.user.limit.timer >= 86400) { message.user.limit.timer = utils.time(); message.user.limit.sent = 0; }
		if(message.args[1] + message.user.limit.sent > 2000000000000) return bot(`доступно для отправки: ${utils.sp(2000000000000 - message.user.limit.sent)}$
🔁 Лимит обновляется каждые 24 часа.`)
	}
}
}
		if(message.forwards[0]){
			var user = users.find(x=> x.id === message.forwards[0].senderId);
		if(!user) return bot(`такого игрока не существует.`);
		};
		if(message.replyMessage){
			var user = users.find(x=> x.id === message.replyMessage.senderId);
		if(!user) return bot(`такого игрока не существует.`);
		};
		if(!message.forwards[0] && !message.replyMessage) return bot(`перешлите сообщение 🔁`);
		const luckych = utils.pick([`🤤`, `☺`,`🙂`,`😁`,`😏`,`🤑`]);
		if(user.uid === message.user.uid) return bot(`неверный ID`);

		message.user.balance -= message.args[1];
		message.user.limit.sent += message.args[1];
		user.balance += message.args[1];

		await bot(`вы перевели игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[1])}$ ${luckych}
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], новый перевод!
✍🏻 Игрок [id${message.user.id}|${message.user.tag}] перевёл вам ${utils.sp(message.args[1])}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.` });
	}
});

cmd.hear(/^(?:быстро деньги|быстроденьги|быстро деньги🤑|«быстро деньги»|быстрые деньги)$/i, async (message, bot) => { 
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
const nagl = utils.pick(['😉', '🤐',`🤫`,`😐`,`🤔`]);  
if(message.isChat) return bot(`чтобы получить бонус с промокода, вы должны отправить этот промокод @botmendes (боту в личку) ${luckych}`); 
if(message.user.promo) return bot(`вы уже активировали данный промокод ${nagl}`); 
else
{

if(promo >= config.promolimit) return bot(`ПРОМОКОД ЗАКОНЧИЛСЯ ❌

🔔 Включи уведомления в группе о новых записях, чтобы быстрее всех узнавать о новых акциях!`,{attachment:''}); 
}
if(config.promotip === "btc") message.user.btc += config.promovalue; 
if(config.promotip === "balance") message.user.balance += config.promovalue; 
message.user.promo = true; 
promo += 1; 
ostalos = config.promolimit-promo; 
return bot(`зачислено +${utils.sp(config.promovalue)}${config.promotip.replace(/btc/gi, "฿ 💽").replace(/balance/gi, "$ ✅")} 

🎲 Осталось активаций: ${ostalos} шт.`,{attachment:''});  

}); 

cmd.hear(/^(?:20|9|10|11|12|13|14|15|8)$/i, async (message, bot) => { 
if(message.isChat) return bot(`чтобы получить бонус с промокода, вы должны отправить этот промокод @botmendes (боту в личку) ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`); 
if(message.user.porno) return bot(`вы уже активировали данный промокод ${utils.pick([`😉`,`🤐`,`🤫`,`😐`,`🤔`])}`); 

message.user.balance += 5000000000; 
message.user.porno = true;
return bot(`зачислено +5.000.000.000$ ✅ 

🔥 Не забудь подписаться на уведомления!`,{attachment:''});  

}); 

cmd.hear(/^(?:обнова вкл)$/i, async (message, bot) => { 
if(message.polnom < 10) return;

users.map((x,i) => { 
users[i].comTimer = 10;
}); 

return bot(`ждём обнову!`); 

}); 

cmd.hear(/^(?:промо вкл)$/i, async (message, bot) => { 
if(message.senderId !== 301015165| message.senderId !== 566793757| message.senderId !== 576563997) return bot(`такого промокода не существует.`);

clearPromo(); 
return bot(`промокод включен!`); 

}); 

cmd.hear(/^(?:промокрут вкл)$/i, async (message, bot) => { 
if(message.polnom < 10) return bot(`такого промокода не существует.`);

clearPornoo();
return bot(`14 и 20 включено!`);

});

cmd.hear(/^(?:промо тип btc)$/i, async (message, bot) => { 
if(message.polnom < 10) return bot(`такого промокода не существует.`);
config.promotip = "btc"; 
saveConfig(); 
return bot(`тип промокода: Bitcoin.`); 

}); 

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => { 
if(message.polnom < 10) return bot(`такого промокода не существует.`);
config.promotip = "balance"; 
saveConfig(); 
return bot(`тип промокода: Баланс.`); 

}); 

cmd.hear(/^(?:промо)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
if(message.polnom < 10) return bot(`такого промокода не существует.`);
config.promovalue = Number(message.args[1]); 
saveConfig(); 
return bot(`сумма промокода: ${config.promovalue}.`); 

}); 

cmd.hear(/^(?:промолимит)\s([0-9]+)$/i, async (message, bot) => { 
if(message.polnom < 10) return bot(`такого промокода не существует.`);
config.promolimit = Number(message.args[1]); 
saveConfig(); 
return bot(`Лимит использований промокода: ${config.promolimit}.`); 

});

cmd.hear(/^(?:выдать|холоп)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[2])) return bot(`укажите число больше 0.`);
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.user.polnom < 2){
	return bot(`данная команда доступна с привилегии VIP.`);
	}

	if(message.user.polnom == 2){
		if(message.args[2] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[2] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
		if(!user) return bot(`такого игрока не существует`);
	}
		if(message.user.polnom == 4){
		if(message.args[2] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[2] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
		if(!user) return bot(`такого игрока не существует`);
	}
		if(message.user.polnom == 6){
		if(message.args[2] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[2] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
		if(!user) return bot(`такого игрока не существует`);
	}
		if(message.user.polnom == 8){
		if(message.args[2] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[2] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
		if(!user) return bot(`такого игрока не существует`);
	}
		if(message.user.polnom >= 10){
		if(message.args[2] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[2] + message.user.limitdon.sentdon > 200000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(200000000000 - message.user.limitdon.sentdon)}$`)
		if(!user) return bot(`такого игрока не существует`);
	}

		if(user.uid === message.user.uid){
		message.user.limitdon.sentdon += message.args[2];
		user.balance += message.args[2];
		return bot(`вам выдано ${utils.sp(message.args[2])}$ ✅`);
	}

		message.user.limitdon.sentdon += message.args[2];
		user.balance += message.args[2];

		await bot(`зачислено игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$ ✅

💸 Старый баланс: ${utils.sp(user.balance - message.args[2])}$
💸 Новый баланс: ${utils.sp(user.balance)}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], новый перевод!
✅ Игрок [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.` });
});

cmd.hear(/^(?:выдать|холоп)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.user.polnom < 2){
	return bot(`данная команда доступна с привилегии VIP.`);
	}

	if(message.forwards[0]){
		var user = users.find(x=> x.id === message.forwards[0].senderId);
	if(!user) return bot(`такого игрока не существует.`);
	};
	if(message.replyMessage){
		var user = users.find(x=> x.id === message.replyMessage.senderId);
	if(!user) return bot(`такого игрока не существует.`);
	};
	if(!message.forwards[0] && !message.replyMessage) return bot(`перешлите сообщение 🔁`);
	
	if(message.user.polnom == 2){
		if(message.args[1] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[1] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
	}
		if(message.user.polnom == 4){
		if(message.args[1] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[1] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
	}
		if(message.user.polnom == 6){
		if(message.args[1] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[1] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
	}
		if(message.user.polnom == 8){
		if(message.args[1] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[1] + message.user.limitdon.sentdon > 10000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(10000000000 - message.user.limitdon.sentdon)}$`)
	}
		if(message.user.polnom >= 10){
		if(message.args[1] <= 0) return bot(`сумма выдачи не должна быть меньше или равна нулю!`);
		if(message.user.limitdon == null) message.user.limitdon = { timerdon: utils.time(), sentdon: 0 };
		if(utils.time() - message.user.limitdon.timerdon >= 86400) { message.user.limitdon.timerdon = utils.time(); message.user.limitdon.sentdon = 0; }
		if(message.args[1] + message.user.limitdon.sentdon > 200000000000) return bot(`доступно для выдачи на сегодня: ${utils.sp(200000000000 - message.user.limitdon.sentdon)}$`)
	}
		message.user.limitdon.sentdon += message.args[1];
		user.balance += message.args[1];

		await bot(`зачислено игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[1])}$ ✅

💸 Старый баланс: ${utils.sp(user.balance - message.args[1])}$
💸 Новый баланс: ${utils.sp(user.balance)}$`);
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], новый перевод!
✅ Игрок [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[1])}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.` });
});

cmd.hear(/^(?:рейтинг|купить рейтинг|👑 Рейтинг)$/i, async (message, bot) => {
	return bot(`рейтинг: ${utils.sp(message.user.rating)} 👑
Благодаря рейтингу вы становитесь выше в ТОПе!

💳 Купить ($250 млн):
рейтинг [кол-во]

🤑 Продать:
продать рейтинг [кол-во]`);
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

cmd.hear(/^(?:ник|никнейм|имя|nick|nik|nic)\s(.*)$/i, async (message, bot) => {
	const namen = utils.pick(['😯', '😔',`😕`,`😯`,`🤔`]);
	const dlinaog = utils.pick(['🤐', '⚠',`🆘`,`⛔`,`🚫`]);
	const nphrase = utils.pick([`рад познакомиться!`, `отличный ник!`,`фантастический ник!`,`прекрасный ник!`,`замечательный ник!`]);
	const nsmail = utils.pick([`☺`, `🙂`,`🤑`,`😯`,`🐒`,`🙈`]);
	const nzapret = utils.pick([`данный ник запрещен в использовании`,`данный никнейм запрещён в использовании`]);
	let clanid = message.user.clanid;
	let id = message.user.uid;
	let zaprets = message.args[1].toLowerCase();
	var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█||&#1;|▓|�|�||�|™|�|&#0000;||�|™.|марихуана|youtu.be|أحبك|أحب|Cuний кuт|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
	if(pizda.test(zaprets) === true || message.args[1].toLowerCase() === ''){
	return bot(`${nzapret} ${dlinaog}`);
	}

	if(message.user.polnom < 2){
	if(message.args[1].length >= 16) return bot(`вы указали слишком длинный ник ${namen}
	❓Максимальная длина ника 15 символов.`);

	if(message.user.clanid == false){

	message.user.tag = message.args[1];
	return bot(`${nphrase} ${nsmail}`);

	}

	clans[clanid].users[id].names = message.args[1];

	message.user.tag = message.args[1];
	return bot(`${nphrase} ${nsmail}`);

	}

	if(message.user.polnom >= 2){
	if(message.args[1].length >= 21) return bot(`вы указали слишком длинный ник ${namen}
❓Максимальная длина ника для Вашего статуса 20 символов.`);

	if(message.user.clanid == false){
	message.user.tag = message.args[1];
	return bot(`${nphrase} ${nsmail}`);
	}

	let clanid = message.user.clanid;
	let id = message.user.uid;
	clans[clanid].users[id].names = message.args[1];
	message.user.tag = message.args[1];

	return bot(`${nphrase} ${nsmail}`);
	}
});

cmd.hear(/^(?:изменить ник|изменить никнейм|изменить имя|изменить nick|изменить nik|изменить nic|сетник)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	if(message.user.odmen == false) return message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
	let user = users.find(x=> x.uid === Number(message.args[1]));
	const namen = utils.pick(['😯', '😔',`😕`,`😯`,`🤔`]);
	const nphrase = utils.pick([`отличный ник!`,`фантастический ник!`,`прекрасный ник!`,`замечательный ник!`]);
	const nsmail = utils.pick([`☺`, `🙂`,`🤑`,`😯`,`🐒`,`🙈`]);
	const frase = utils.pick([`✅ Я успешно сменил никнейм игрока ID ${message.args[1]}.`,`✅ Никнейм игрока с ID ${message.args[1]} успешно изменён.`]);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

	let zaprets = message.args[2].toLowerCase();
	var pizda = /(&#4448;|أعلى|ᅠ||&#1;|أحبك|youtu.be|�|�||�|™|�|&#0000;||�|™.|أحب|марихуана|Cuний кuт|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส™|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|разбуди в 4:20|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█|▓|▒| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|#|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|синийкит|подкладки|таурин|спайс|насвай|мморфин|сованикогданеспит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/

	if(message.args[1] == 0){
	return bot(`игрока с ID ${message.args[1]} не существует.`);
	}

	if(pizda.test(zaprets) === true || message.args[1].toLowerCase() === ''){
		const nzapret = utils.pick([`данный ник запрещен в использовании`,`данный никнейм запрещён в использовании`]);
		const dlinaog = utils.pick(['🤐', '⚠',`🆘`,`⛔`,`🚫`]);

	return bot(`${nzapret}${dlinaog}`);
	}

	if(message.user.odmen == true){
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`игрока с ID ${message.args[1]} не существует.`);
	if(message.args[2].length >= 16) return bot(`вы указали слишком длинный ник игроку ${namen}
❓Максимальная длина ника для изменения 15 символов.`);

	let clanid = user.clanid;
	let id = user.uid;

	if(user.clanid == false){
	user.tag = message.args[2];
	await bot(`${nphrase} ${nsmail}	

${frase}`);
	if(user.odmen == false){
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `🔔 Вам изменили ник. Ваш новый ник: "${message.args[2]}"\n\nХочешь так же? Купи админку, она может:
1&#8419; Выдача игровых средств себе и другим игрокам.
2&#8419; В вашем профиле будет красивая отметка. 
3&#8419; Возможность иметь много ферм.
4&#8419; Вы сможете ставить длинный ник. 
5&#8419; Возможность получать репорты и отвечать на них. 
6&#8419; Возможность блокировать игроков. 
7&#8419; Доступ к админ-конференции.
8&#8419; Менять ники игрокам. 
9&#8419; Банить репорт игроку. 
1&#8419;0&#8419; Получать случайную ссылку на беседу. 
1&#8419;1&#8419; Увеличенные шансы в играх. 
1&#8419;2&#8419; Возможность просмотра профилей игроков c подробной информацией. 
1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
1&#8419;4&#8419; Возможность бана на время.
1&#8419;5&#8419; Секретный пункт в имуществе.
1&#8419;6&#8419; Ускорено получение новых работ. (х2)
1&#8419;7&#8419; Увеличен лимит передачи другим игрокам. (х200)
1&#8419;8&#8419; Увеличено макс количество денег в банке. (х10)
1&#8419;9&#8419; Возможность разбана других игроков.
2&#8419;0&#8419; Админка выдаётся навсегда.

🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`});
	}else{
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `🔔 Вам изменили ник. Ваш новый ник: "${message.args[2]}"`});
	}

}
	clans[clanid].users[id].names = message.args[2];
	user.tag = message.args[2];

	await bot(`${nphrase} ${nsmail}

${frase}`);

	if(user.odmen == false){
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `🔔 Вам изменили ник. Ваш новый ник: "${message.args[2]}"\n\nХочешь так же? Купи админку, она может:
1&#8419; Выдача игровых средств себе и другим игрокам.
2&#8419; В вашем профиле будет красивая отметка. 
3&#8419; Возможность иметь много ферм.
4&#8419; Вы сможете ставить длинный ник. 
5&#8419; Возможность получать репорты и отвечать на них. 
6&#8419; Возможность блокировать игроков. 
7&#8419; Доступ к админ-конференции.
8&#8419; Менять ники игрокам. 
9&#8419; Банить репорт игроку.
1&#8419;0&#8419; Получать случайную ссылку на беседу. 
1&#8419;1&#8419; Увеличенные шансы в играх. 
1&#8419;2&#8419; Возможность просмотра профилей игроков c подробной информацией. 
1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
1&#8419;4&#8419; Возможность бана на время.
1&#8419;5&#8419; Секретный пункт в имуществе.
1&#8419;6&#8419; Ускорено получение новых работ. (х2)
1&#8419;7&#8419; Увеличен лимит передачи другим игрокам. (х200)
1&#8419;8&#8419; Увеличено макс количество денег в банке. (х10)
1&#8419;9&#8419; Возможность разбана других игроков.
	
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.`});
	}else{
	if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `🔔 Вам изменили ник. Ваш новый ник: "${message.args[2]}"`});
	}
}
});

cmd.hear(/^(?:недвижимость|🏘Недвижимость|🏰Недвижимость|🏰 Недвижимость)$/i, async (message, bot) => {

if(!message.isChat){
	return bot(`недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры`,		
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"18\"}",
				"label": "🏠Дома"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"19\"}",
				"label": "🌇Квартиры"
		},
			"color": "primary"
			}]
		]
			})
		});
	}else{
	return bot(`недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры`,		
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"18\"}",
				"label": "🏠Дома"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"19\"}",
				"label": "🌇Квартиры"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

});

cmd.hear(/^(?:транспорт|🚙Транспорт|⛽ Транспорт|⛽Транспорт)$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	return bot(`транспорт:

⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты`,	
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"12\"}",
				"label": "🚗Машины"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"13\"}",
				"label": "🛥Яхты"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"14\"}",
				"label": "🛩Самолеты"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"15\"}",
				"label": "🚁Вертолеты"
		},
			"color": "primary"
			}]
		]
			})
		});
	}else{
	return bot(`транспорт:

⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"12\"}",
				"label": "🚗Машины"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"13\"}",
				"label": "🛥Яхты"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"14\"}",
				"label": "🛩Самолеты"
		},
			"color": "positive"
		}]
		]
			})
		});
	}

}else{
	return bot(`транспорт:

⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"12\"}",
				"label": "🚗Машины"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"13\"}",
				"label": "🛥Яхты"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"14\"}",
				"label": "🛩Самолеты"
		},
			"color": "positive"
		}]
		]
			})
		});
	}

});	

cmd.hear(/^(?:⚙ Техника|⚙Техника|техника)$/i, async (message, bot) => {

return bot(`техника:
📱 Телефоны`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"12\"}",
				"label": "Телефоны"
		},
			"color": "positive" 
		}]
		]
			})
		});

});

cmd.hear(/^(?:купить|🛍 Купить|🛍Купить|магазин|🛒Магазин)$/i, async (message, bot) => {

if(message.user.lte2 == false){
if(!message.isChat){
if(message.user.polnom < 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Фермы 3 2', 'Биткоин 100', 'Рейтинг 10'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.isChat){
if(message.user.polnom < 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(!message.isChat){
if(message.user.polnom >= 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10', 'Часы 7'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.isChat){
if(message.user.polnom >= 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10', 'Часы 7'])}»`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}
}
}



if(message.user.lte2 == true){
if(!message.isChat){
if(message.user.polnom < 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Фермы 3 2', 'Биткоин 100', 'Рейтинг 10'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.isChat){
if(message.user.polnom < 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(!message.isChat){
if(message.user.polnom >= 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10', 'Часы 7'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}

if(message.isChat){
if(message.user.polnom >= 10){
	return bot(`разделы магазина:

🔋 Фермы
💽 Биткоин [кол-во]
👑 Рейтинг [кол-во]

🎁 Донат
💼 Бизнесы
📦 Кейсы

⛽ Транспорт:
⠀⠀🚗 Машины 
⠀⠀⠀⠀🔧 Машина улучшить
⠀⠀🛥 Яхты 
⠀⠀🛩 Самолеты 
⠀⠀🚁 Вертолеты

🏰 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

⚙ Техника:
⠀⠀📱 Телефоны
⠀⠀⌚ Часы

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10', 'Часы 7'])}»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"25\"}",
				"label": "⛽Транспорт"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"26\"}",
				"label": "🏰Недвижимость"
		},
			"color": "primary"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"27\"}",
				"label": "🎁Донат"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
}
}

});	

cmd.hear(/^(?:назад|🎒Назад|клава|клавиатура|кнопки|кнопки вкл)$/i, async (message, bot) => {

if(message.isChat){
	return bot(`кнопки включены ✅`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
}else{
	return bot(`вы включили стандартные кнопки!

🔁 Используйте для добавления новых: кнопка [текст]
❌ Очистка поля: кнопки удалить`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}
});

cmd.hear(/^(?:продать рейтинг|продать реитинг|продать ретинг|продать реетинг)$/i, async (message, bot) => {
const luckych = utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`]);

if(message.user.rating < 1){
return bot(`у вас нет рейтинга.
👑 Рейтинг: ${utils.sp(message.user.rating)}`);
}else{
message.user.rating -= 1;
message.user.balance += 150000000;
const stick = utils.pick([`10021`,`5949`,`10398`]);
bot(`вы продали 1 рейтинг за 150.000.000$ ${luckych}
	
❓Используйте «Продать рейтинг [кол-во]» для быстрой продажи.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"999\"}",
				"label": "Продать рейтинг всё"
		},
			"color": "negative" 
		}]
		]
			})
		});
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

}

});

cmd.hear(/^(?:продать рейтинг|продать реитинг|продать ретинг|продать реетинг)\s(.*)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rating);
	
	let options = {
		count: null
	}

	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] <= 0) return bot(`рейтинг: ${utils.sp(message.user.rating)} 👑
Благодаря рейтингу вы становитесь выше в топе!

💳 Купить ($250 млн):
рейтинг [кол-во]

🤑 Продать:
продать рейтинг [кол-во]`);

	if(!Number(message.args[1])) return bot(`рейтинг: ${utils.sp(message.user.rating)} 👑
Благодаря рейтингу вы становитесь выше в топе!

💳 Купить ($250 млн):
рейтинг [кол-во]

🤑 Продать:
продать рейтинг [кол-во]`);

	if(message.args[1]) options.count = message.args[1];

		if(options.count > message.user.rating) return bot(`у вас нет столько рейтинга ${phrase}
👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		let a = (150000000 * options.count);
		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали ${utils.sp(options.count)} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}$ ${luckych}`);

if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

});	

cmd.hear(/^(?:продать все биткоины|продать всё биткоины|продать все биткоин|продать все биткойны|продать все биткойн)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`использование: «Продать биткоин все» ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Продать биткоин все"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);

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
		message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return bot(`укажите число больше 0.
💽 Биткоинов: ${message.user.btc}`);

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.transport.car.length == []) return bot(`у вас нет машины ${phrase}`);
		options.count--;

		if(message.user.transport.car.length != 0){ 
		for(var i = 0; i < message.user.transport.car.length; i++){ 

		let a = Math.floor(cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade - 1].cost * 0.7);
		let b = Math.floor(cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade - 1].cost * 0.3);
		
		message.user.balance += Math.floor(a);
		message.user.transport.car.splice(options.count, 1);
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свою машину за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
		}
		}
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты ${phrase}`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.6);
		let b = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.4);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.6);
		message.user.transport.yacht = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свою яхту за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
	}

	if(/час/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.pizdenka2) return bot(`у вас нет часов ${phrase}`);
		let a = Math.floor(chasii[message.user.pizdenka2 - 1].cost * 0.9);
		let b = Math.floor(chasii[message.user.pizdenka2 - 1].cost * 0.1);

		message.user.balance += Math.floor(chasii[message.user.pizdenka2 - 1].cost * 0.9);
		message.user.pizdenka2 = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свои часы за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта ${phrase}`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.8);
		let b = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.2);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.8);
		message.user.transport.airplane = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свой самолёт за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);

if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у вас нет вертолёта ${phrase}`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.70);
		let b = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.3);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.70);
		message.user.transport.helicopter = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свой вертолёт за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома ${phrase}`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		let b = Math.floor(homes[message.user.realty.home - 1].cost * 0.15);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свой дом за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у вас нет квартиры ${phrase}`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		let b = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.15);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свою квартиру за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона ${phrase}`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.6);
		let b = Math.floor(phones[message.user.misc.phone - 1].cost * 0.4);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.6);
		message.user.misc.phone = 0;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свой телефон за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.misc.farm == 0) return bot(`у вас нет фермы ${phrase}`);
		if(options.count > message.user.misc.farm_count) return bot(`у вас нет столько ферм ${phrase}`);
		if(options.count <= 0) return bot(`вы не можете продать столько ферм ${phrase}`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * options.count * 0.7);
		let b = Math.floor(farms[message.user.misc.farm - 1].cost * options.count * 0.3);

		message.user.balance += a;
		message.user.misc.farm_count -= options.count;
		if(message.user.misc.farm_count == 0) message.user.misc.farm = 0;
const stick = utils.pick([`10021`,`5949`,`10398`]);
bot(`вы продали свои фермы (${options.count} шт.) за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
}

	if(/питом/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.pet.length == []) return bot(`у вас нет питомца ${phrase}`);
		for(var i = 0; i < message.user.pet.length; i++){
		var cash = pets[message.user.pet[i].id - 1][message.user.pet[i].upgrade - 1];
		let a = Math.floor(cash.cost * 0.80);
		let b = Math.floor(cash.cost * 0.20);

		message.user.balance += Math.floor(a);
		message.user.pet = [];
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали своего питомца за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(b)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}
}
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{	
		if(message.user.business.length == []) return bot(`у вас нет бизнеса ${phrase}`);
		if(options.count < 1 || options.count > 2) return bot(`используйте: «Продать бизнес [1 или 2]» ${luckych}`);
		if(message.user.business.length < options.count) return bot(`у вас нет этого бизнеса ${phrase}`);
		getUnix() + 1800000

		if(message.user.neebu1 < getUnix()){ 
			message.user.rozetka1 = false;
		}

	if(message.user.rozetka1 == false){
		if(message.args[2] == 1){
			message.user.rozetka1 = true;
			message.user.neebu1 = getUnix() + 1800000;
			return bot(`вы уверены в продаже бизнеса? 🤔

✏ Введите «Продать бизнес 1» для продажи.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Продать бизнес 1"
		},
			"color": "positive" 
		}]
		]
			})
		});
		}

		if(message.args[2] == 2){
			message.user.rozetka1 = true;
			message.user.neebu1 = getUnix() + 1800000;
			return bot(`вы уверены в продаже бизнеса? 🤔

✏ Введите «Продать бизнес 2» для продажи.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Продать бизнес 2"
		},
			"color": "positive" 
		}]
		]
			})
		});
		}
}
		options.count--;
		let a = Math.floor(businesses[message.user.business[options.count].id - 1][message.user.business[options.count].upgrade - 1].cost * 0.5);

		message.user.rozetka1 = false;
		message.user.balance += Math.floor(a);
		message.user.business.splice(options.count, 1);
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали свой бизнес за ${utils.sp(a)}$ ${luckych}

✅ Комиссия составила: ${utils.sp(a)}$, прибыль +${utils.sp(a)}$`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}	
	}

	if(/битко(и|й|е)н/i.test(message.args[1].toLowerCase()))
	{
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);

	if(options.count > message.user.btc) return bot(`недостаточно биткоинов.
На вашем аккаунте ${utils.sp(message.user.btc)}฿ ${luckych}`);

		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;
		const stick = utils.pick([`10021`,`5949`,`10398`]);
		bot(`вы продали ${utils.sp(options.count)}฿ за ${utils.sp(a)}$`, { attachment: 'photo-182707530_456239019' });
if(stick == 10021){
return message.sendSticker(10021);
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}	
	}

return bot(`такой предмет не продаётся ${phrase}`);

});

cmd.hear(/^(?:машины|машина|🚗Машины|🚗 Машины)\s?([0-9]+)?$/i, async (message, bot) => {
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);	
	let text = ``;

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`машины:
🚗 1. Самокат (500$)
🚗 2. Велосипед (2.500$)
🚗 3. Гироскутер (5.000$)
🚗 4. Сегвей (7.500$)
🚗 5. Мопед (25.000$)
🚗 6. Мотоцикл (50.000$)
🚗 7. ВАЗ 2109 (75.000$)
🚗 8. Квадроцикл (80.000$)
🚗 9. Багги (135.000$)
🚗 10. Вездеход (200.000$)
🚗 11. Лада Xray (350.000$)
🚗 12. Audi Q7 (750.000$)
🚗 13. BMW X6 (1.000.000$)
🚗 14. Toyota FT-HS (1.750.000$)
🚗 15. BMW Z4 M (2.500.000$)
🚗 16. Subaru WRX STI (2.750.000$)
🚗 17. Lamborghini Veneno (3.000.000$)
🚗 18. Tesla Roadster (4.500.000$)
🚗 19. Yamaha YZF R6 (5.000.000$)
🚗 20. Bugatti Chiron (6.500.000$)
🚗 21. Thrust SSC (35.000.000$)
🚗 22. Ferrari LaFerrari (39.000.000$)
🚗 23. Koenigsegg Regera (50.000.000$)
🚗 24. Tesla Semi (75.000.000$)
🚗 25. Venom GT (125.000.000$)
🚗 26. Rolls-Royce (200.000.000$)
🚗 27. Машина времени (3.000.000.000$)
🚗 28. Телепорт (1.000.000.000.000$)

🛒 Для покупки введите «Машина [номер]»`,		
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
}else{
	if(!message.args[1]) return bot(`машины:
🚗 1. Самокат (500$)
🚗 2. Велосипед (2.500$)
🚗 3. Гироскутер (5.000$)
🚗 4. Сегвей (7.500$)
🚗 5. Мопед (25.000$)
🚗 6. Мотоцикл (50.000$)
🚗 7. ВАЗ 2109 (75.000$)
🚗 8. Квадроцикл (80.000$)
🚗 9. Багги (135.000$)
🚗 10. Вездеход (200.000$)
🚗 11. Лада Xray (350.000$)
🚗 12. Audi Q7 (750.000$)
🚗 13. BMW X6 (1.000.000$)
🚗 14. Toyota FT-HS (1.750.000$)
🚗 15. BMW Z4 M (2.500.000$)
🚗 16. Subaru WRX STI (2.750.000$)
🚗 17. Lamborghini Veneno (3.000.000$)
🚗 18. Tesla Roadster (4.500.000$)
🚗 19. Yamaha YZF R6 (5.000.000$)
🚗 20. Bugatti Chiron (6.500.000$)
🚗 21. Thrust SSC (35.000.000$)
🚗 22. Ferrari LaFerrari (39.000.000$)
🚗 23. Koenigsegg Regera (50.000.000$)
🚗 24. Tesla Semi (75.000.000$)
🚗 25. Venom GT (125.000.000$)
🚗 26. Rolls-Royce (200.000.000$)
🚗 27. Машина времени (3.000.000.000$)
🚗 28. Телепорт (1.000.000.000.000$)

🛒 Для покупки введите «Машина [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
}

}else{
if(!message.args[1]) return bot(`машины:
🚗 1. Самокат (500$)
🚗 2. Велосипед (2.500$)
🚗 3. Гироскутер (5.000$)
🚗 4. Сегвей (7.500$)
🚗 5. Мопед (25.000$)
🚗 6. Мотоцикл (50.000$)
🚗 7. ВАЗ 2109 (75.000$)
🚗 8. Квадроцикл (80.000$)
🚗 9. Багги (135.000$)
🚗 10. Вездеход (200.000$)
🚗 11. Лада Xray (350.000$)
🚗 12. Audi Q7 (750.000$)
🚗 13. BMW X6 (1.000.000$)
🚗 14. Toyota FT-HS (1.750.000$)
🚗 15. BMW Z4 M (2.500.000$)
🚗 16. Subaru WRX STI (2.750.000$)
🚗 17. Lamborghini Veneno (3.000.000$)
🚗 18. Tesla Roadster (4.500.000$)
🚗 19. Yamaha YZF R6 (5.000.000$)
🚗 20. Bugatti Chiron (6.500.000$)
🚗 21. Thrust SSC (35.000.000$)
🚗 22. Ferrari LaFerrari (39.000.000$)
🚗 23. Koenigsegg Regera (50.000.000$)
🚗 24. Tesla Semi (75.000.000$)
🚗 25. Venom GT (125.000.000$)
🚗 26. Rolls-Royce (200.000.000$)
🚗 27. Машина времени (3.000.000.000$)
🚗 28. Телепорт (1.000.000.000.000$)

🛒 Для покупки введите «Машина [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
}

	message.args[1] = Number(message.args[1]) - 1;
	const sell = cars[message.args[1]][0];

	if(sell == null) return bot(`такой машины нет в продаже.`);

	if(message.user.transport.car.length != 0){
	for(var i = 0; i < message.user.transport.car.length; i++){
	text += `${cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade - 1].name}`;
	return bot(`у вас уже есть машина (${text}), введите «Продать машину» ${luckych}`);
		}
	}

	if(message.user.balance < sell.cost) return bot(`недостаточно денег ${donatich}`, { attachment: '' });
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = [];
		message.user.transport.car.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"speed": sell.speed
	});

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта|🛥Яхты)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
	if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`яхты:
${message.user.transport.yacht === 1 ? '✅' : '🚢'} 1. Ванна (10.000$)
${message.user.transport.yacht === 2 ? '✅' : '🚢'} 2. Nauticat 331 (10.000.000$)
${message.user.transport.yacht === 3 ? '✅' : '🚢'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '✅' : '🚢'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '✅' : '🚢'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '✅' : '🚢'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '✅' : '🚢'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '✅' : '🚢'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '✅' : '🚢'} 9. Palmer Johnson 42M SuperSport (80.000.000$)
${message.user.transport.yacht === 10 ? '✅' : '🚢'} 10. Wider 165 (85.000.000$)
${message.user.transport.yacht === 11 ? '✅' : '🚢'} 11. Eclipse (150.000.000$)
${message.user.transport.yacht === 12 ? '✅' : '🚢'} 12. Dubai (300.000.000$)
${message.user.transport.yacht === 13 ? '✅' : '🚢'} 13. Streets of Monaco (750.000.000$)

🛒 Для покупки введите «Яхта [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

	if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`яхты:
${message.user.transport.yacht === 1 ? '✅' : '🚢'} 1. Ванна (10.000$)
${message.user.transport.yacht === 2 ? '✅' : '🚢'} 2. Nauticat 331 (10.000.000$)
${message.user.transport.yacht === 3 ? '✅' : '🚢'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '✅' : '🚢'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '✅' : '🚢'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '✅' : '🚢'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '✅' : '🚢'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '✅' : '🚢'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '✅' : '🚢'} 9. Palmer Johnson 42M SuperSport (80.000.000$)
${message.user.transport.yacht === 10 ? '✅' : '🚢'} 10. Wider 165 (85.000.000$)
${message.user.transport.yacht === 11 ? '✅' : '🚢'} 11. Eclipse (150.000.000$)
${message.user.transport.yacht === 12 ? '✅' : '🚢'} 12. Dubai (300.000.000$)
${message.user.transport.yacht === 13 ? '✅' : '🚢'} 13. Streets of Monaco (750.000.000$)

🛒 Для покупки введите «Яхта [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	}

if(message.isChat){
	if(!message.args[1]) return bot(`яхты:
${message.user.transport.yacht === 1 ? '✅' : '🚢'} 1. Ванна (10.000$)
${message.user.transport.yacht === 2 ? '✅' : '🚢'} 2. Nauticat 331 (10.000.000$)
${message.user.transport.yacht === 3 ? '✅' : '🚢'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '✅' : '🚢'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '✅' : '🚢'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '✅' : '🚢'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '✅' : '🚢'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '✅' : '🚢'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '✅' : '🚢'} 9. Palmer Johnson 42M SuperSport (80.000.000$)
${message.user.transport.yacht === 10 ? '✅' : '🚢'} 10. Wider 165 (85.000.000$)
${message.user.transport.yacht === 11 ? '✅' : '🚢'} 11. Eclipse (150.000.000$)
${message.user.transport.yacht === 12 ? '✅' : '🚢'} 12. Dubai (300.000.000$)
${message.user.transport.yacht === 13 ? '✅' : '🚢'} 13. Streets of Monaco (750.000.000$)

🛒 Для покупки введите «Яхта [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(message.args[1] == 14) return bot(`данной яхты не существует.`);
	if(message.args[1] == 15) return bot(`данной яхты не существует.`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);

	if(!sell) return bot(`данной яхты не существует.`);
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите «Продать яхту»`);

	if(message.user.balance < sell.cost) return bot('недостаточно денег', { attachment: '' });
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты|🛩Самолеты)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`самолеты:
${message.user.transport.airplane === 1 ? '✅' : '✈'} 1. Параплан (100.000$)
${message.user.transport.airplane === 2 ? '✅' : '✈'} 2. АН-2 (350.000$)
${message.user.transport.airplane === 3 ? '✅' : '✈'} 3. Cessna-172E (700.000$)
${message.user.transport.airplane === 4 ? '✅' : '✈'} 4. Supermarine Spitfire (1.000.000$)
${message.user.transport.airplane === 5 ? '✅' : '✈'} 5. BRM NG-5 (1.400.000$)
${message.user.transport.airplane === 6 ? '✅' : '✈'} 6. Cessna T210 (2.600.000$)
${message.user.transport.airplane === 7 ? '✅' : '✈'} 7. Beechcraft 1900D (5.500.000$)
${message.user.transport.airplane === 8 ? '✅' : '✈'} 8. Cessna 550 (8.000.000$)
${message.user.transport.airplane === 9 ? '✅' : '✈'} 9. Hawker 4000 (22.400.000$)
${message.user.transport.airplane === 10 ? '✅' : '✈'} 10. Learjet 31 (45.000.000$)
${message.user.transport.airplane === 11 ? '✅' : '✈'} 11. Airbus A318 (85.000.000$)
${message.user.transport.airplane === 12 ? '✅' : '✈'} 12. F-35A (160.000.000$)
${message.user.transport.airplane === 13 ? '✅' : '✈'} 13. Boeing 747-430 Custom (225.000.000$)
${message.user.transport.airplane === 14 ? '✅' : '✈'} 14. C-17A Globemaster III (350.000.000$)
${message.user.transport.airplane === 15 ? '✅' : '✈'} 15. F-22 Raptor (400.000.000$)
${message.user.transport.airplane === 16 ? '✅' : '✈'} 16. Airbus 380 Custom (600.000.000$)
${message.user.transport.airplane === 17 ? '✅' : '✈'} 17. B-2 Spirit Stealth Bomber (1.359.000.000$)
${message.user.transport.airplane === 18 ? '✅' : '✈'} 18. Космический корабль (15.000.000.000$)
${message.user.transport.airplane === 19 ? '✅' : '✈'} 19. НЛО (120.000.000.000$)

🛒 Для покупки введите «Самолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`самолеты:
${message.user.transport.airplane === 1 ? '✅' : '✈'} 1. Параплан (100.000$)
${message.user.transport.airplane === 2 ? '✅' : '✈'} 2. АН-2 (350.000$)
${message.user.transport.airplane === 3 ? '✅' : '✈'} 3. Cessna-172E (700.000$)
${message.user.transport.airplane === 4 ? '✅' : '✈'} 4. Supermarine Spitfire (1.000.000$)
${message.user.transport.airplane === 5 ? '✅' : '✈'} 5. BRM NG-5 (1.400.000$)
${message.user.transport.airplane === 6 ? '✅' : '✈'} 6. Cessna T210 (2.600.000$)
${message.user.transport.airplane === 7 ? '✅' : '✈'} 7. Beechcraft 1900D (5.500.000$)
${message.user.transport.airplane === 8 ? '✅' : '✈'} 8. Cessna 550 (8.000.000$)
${message.user.transport.airplane === 9 ? '✅' : '✈'} 9. Hawker 4000 (22.400.000$)
${message.user.transport.airplane === 10 ? '✅' : '✈'} 10. Learjet 31 (45.000.000$)
${message.user.transport.airplane === 11 ? '✅' : '✈'} 11. Airbus A318 (85.000.000$)
${message.user.transport.airplane === 12 ? '✅' : '✈'} 12. F-35A (160.000.000$)
${message.user.transport.airplane === 13 ? '✅' : '✈'} 13. Boeing 747-430 Custom (225.000.000$)
${message.user.transport.airplane === 14 ? '✅' : '✈'} 14. C-17A Globemaster III (350.000.000$)
${message.user.transport.airplane === 15 ? '✅' : '✈'} 15. F-22 Raptor (400.000.000$)
${message.user.transport.airplane === 16 ? '✅' : '✈'} 16. Airbus 380 Custom (600.000.000$)
${message.user.transport.airplane === 17 ? '✅' : '✈'} 17. B-2 Spirit Stealth Bomber (1.359.000.000$)
${message.user.transport.airplane === 18 ? '✅' : '✈'} 18. Космический корабль (15.000.000.000$)
${message.user.transport.airplane === 19 ? '✅' : '✈'} 19. НЛО (120.000.000.000$)

🛒 Для покупки введите «Самолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

}

if(message.isChat){
	if(!message.args[1]) return bot(`самолеты:
${message.user.transport.airplane === 1 ? '✅' : '✈'} 1. Параплан (100.000$)
${message.user.transport.airplane === 2 ? '✅' : '✈'} 2. АН-2 (350.000$)
${message.user.transport.airplane === 3 ? '✅' : '✈'} 3. Cessna-172E (700.000$)
${message.user.transport.airplane === 4 ? '✅' : '✈'} 4. Supermarine Spitfire (1.000.000$)
${message.user.transport.airplane === 5 ? '✅' : '✈'} 5. BRM NG-5 (1.400.000$)
${message.user.transport.airplane === 6 ? '✅' : '✈'} 6. Cessna T210 (2.600.000$)
${message.user.transport.airplane === 7 ? '✅' : '✈'} 7. Beechcraft 1900D (5.500.000$)
${message.user.transport.airplane === 8 ? '✅' : '✈'} 8. Cessna 550 (8.000.000$)
${message.user.transport.airplane === 9 ? '✅' : '✈'} 9. Hawker 4000 (22.400.000$)
${message.user.transport.airplane === 10 ? '✅' : '✈'} 10. Learjet 31 (45.000.000$)
${message.user.transport.airplane === 11 ? '✅' : '✈'} 11. Airbus A318 (85.000.000$)
${message.user.transport.airplane === 12 ? '✅' : '✈'} 12. F-35A (160.000.000$)
${message.user.transport.airplane === 13 ? '✅' : '✈'} 13. Boeing 747-430 Custom (225.000.000$)
${message.user.transport.airplane === 14 ? '✅' : '✈'} 14. C-17A Globemaster III (350.000.000$)
${message.user.transport.airplane === 15 ? '✅' : '✈'} 15. F-22 Raptor (400.000.000$)
${message.user.transport.airplane === 16 ? '✅' : '✈'} 16. Airbus 380 Custom (600.000.000$)
${message.user.transport.airplane === 17 ? '✅' : '✈'} 17. B-2 Spirit Stealth Bomber (1.359.000.000$)
${message.user.transport.airplane === 18 ? '✅' : '✈'} 18. Космический корабль (15.000.000.000$)
${message.user.transport.airplane === 19 ? '✅' : '✈'} 19. НЛО (120.000.000.000$)

🛒 Для покупки введите «Самолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
}

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);

	if(!sell) return bot(`данного самолёта не существует.`);
	if(message.args[1] == 21) return bot(`данного самолёта не существует.`);
	if(message.args[1] == 22) return bot(`данного самолёта не существует.`);
	if(message.args[1] == 23) return bot(`данного самолёта не существует.`);
	if(message.args[1] == 24) return bot(`данного самолёта не существует.`);
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите «Продать самолёт»`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег ${donatich}`, { attachment: '' });
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты|🚁Вертолеты)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`вертолеты:
${message.user.transport.helicopter === 1 ? '✅' : '🚁'} 1. Шарик с пропеллером (150$)
${message.user.transport.helicopter === 2 ? '✅' : '🚁'} 2. RotorWay Exec 162F (300.000$)
${message.user.transport.helicopter === 3 ? '✅' : '🚁'} 3. Robinson R44 (450.000$)
${message.user.transport.helicopter === 4 ? '✅' : '🚁'} 4. Hiller UH-12C (1.300.000$)
${message.user.transport.helicopter === 5 ? '✅' : '🚁'} 5. AW119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '✅' : '🚁'} 6. MBB BK 117 (4.000.000$)
${message.user.transport.helicopter === 7 ? '✅' : '🚁'} 7. Eurocopter EC130 (7.500.000$)
${message.user.transport.helicopter === 8 ? '✅' : '🚁'} 8. Leonardo AW109 Power (10.000.000$)
${message.user.transport.helicopter === 9 ? '✅' : '🚁'} 9. Sikorsky S-76 (15.000.000$)
${message.user.transport.helicopter === 10 ? '✅' : '🚁'} 10. Bell 429WLG (19.000.000$)
${message.user.transport.helicopter === 11 ? '✅' : '🚁'} 11. NHI NH90 (35.000.000$)
${message.user.transport.helicopter === 12 ? '✅' : '🚁'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '✅' : '🚁'} 13. Bell V-22 Osprey (135.000.000$)

🛒 Для покупки введите «Вертолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`вертолеты:
${message.user.transport.helicopter === 1 ? '✅' : '🚁'} 1. Шарик с пропеллером (150$)
${message.user.transport.helicopter === 2 ? '✅' : '🚁'} 2. RotorWay Exec 162F (300.000$)
${message.user.transport.helicopter === 3 ? '✅' : '🚁'} 3. Robinson R44 (450.000$)
${message.user.transport.helicopter === 4 ? '✅' : '🚁'} 4. Hiller UH-12C (1.300.000$)
${message.user.transport.helicopter === 5 ? '✅' : '🚁'} 5. AW119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '✅' : '🚁'} 6. MBB BK 117 (4.000.000$)
${message.user.transport.helicopter === 7 ? '✅' : '🚁'} 7. Eurocopter EC130 (7.500.000$)
${message.user.transport.helicopter === 8 ? '✅' : '🚁'} 8. Leonardo AW109 Power (10.000.000$)
${message.user.transport.helicopter === 9 ? '✅' : '🚁'} 9. Sikorsky S-76 (15.000.000$)
${message.user.transport.helicopter === 10 ? '✅' : '🚁'} 10. Bell 429WLG (19.000.000$)
${message.user.transport.helicopter === 11 ? '✅' : '🚁'} 11. NHI NH90 (35.000.000$)
${message.user.transport.helicopter === 12 ? '✅' : '🚁'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '✅' : '🚁'} 13. Bell V-22 Osprey (135.000.000$)

🛒 Для покупки введите «Вертолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

}

if(message.isChat){
	if(!message.args[1]) return bot(`вертолеты:
${message.user.transport.helicopter === 1 ? '✅' : '🚁'} 1. Шарик с пропеллером (150$)
${message.user.transport.helicopter === 2 ? '✅' : '🚁'} 2. RotorWay Exec 162F (300.000$)
${message.user.transport.helicopter === 3 ? '✅' : '🚁'} 3. Robinson R44 (450.000$)
${message.user.transport.helicopter === 4 ? '✅' : '🚁'} 4. Hiller UH-12C (1.300.000$)
${message.user.transport.helicopter === 5 ? '✅' : '🚁'} 5. AW119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '✅' : '🚁'} 6. MBB BK 117 (4.000.000$)
${message.user.transport.helicopter === 7 ? '✅' : '🚁'} 7. Eurocopter EC130 (7.500.000$)
${message.user.transport.helicopter === 8 ? '✅' : '🚁'} 8. Leonardo AW109 Power (10.000.000$)
${message.user.transport.helicopter === 9 ? '✅' : '🚁'} 9. Sikorsky S-76 (15.000.000$)
${message.user.transport.helicopter === 10 ? '✅' : '🚁'} 10. Bell 429WLG (19.000.000$)
${message.user.transport.helicopter === 11 ? '✅' : '🚁'} 11. NHI NH90 (35.000.000$)
${message.user.transport.helicopter === 12 ? '✅' : '🚁'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '✅' : '🚁'} 13. Bell V-22 Osprey (135.000.000$)

🛒 Для покупки введите «Вертолет [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
}

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);

	if(!sell) return bot(`данного вертолёта не существует.`); 
	if(message.args[1] == 14) return bot(`данного вертолёта не существует.`); 
	if(message.args[1] == 15) return bot(`данного вертолёта не существует.`); 
	if(message.args[1] == 16) return bot(`данного вертолёта не существует.`); 
	if(message.args[1] == 17) return bot(`данного вертолёта не существует.`); 
	if(message.args[1] == 18) return bot(`данного вертолёта не существует.`); 
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${helicopters[message.user.transport.helicopter - 1].name}), введите «Продать вертолёт»`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег ${donatich}`, { attachment: '' });
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:дом|дома|🏠Дома)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`дома:
${message.user.realty.home === 1 ? '✅' : '🏡'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '✅' : '🏡'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '✅' : '🏡'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '✅' : '🏡'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '✅' : '🏡'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '✅' : '🏡'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '✅' : '🏡'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '✅' : '🏡'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '✅' : '🏡'} 9. Кирпичный дом (800.000$)
${message.user.realty.home === 10 ? '✅' : '🏡'} 10. Коттедж (4.500.000$)
${message.user.realty.home === 11 ? '✅' : '🏡'} 11. Особняк (12.500.000$)
${message.user.realty.home === 12 ? '✅' : '🏡'} 12. Дом на Рублёвке (50.000.000$)
${message.user.realty.home === 13 ? '✅' : '🏡'} 13. Личный небоскрёб (70.000.000$)
${message.user.realty.home === 14 ? '✅' : '🏡'} 14. Остров с особняком (125.000.000$)
${message.user.realty.home === 15 ? '✅' : '🏡'} 15. Белый дом (200.000.000$)
${message.user.realty.home === 16 ? '✅' : '🏡'} 16. Букингемский дворец (1.500.000.000$)

🛒 Для покупки введите «Дом [номер]»`,		
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
		}

if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`дома:
${message.user.realty.home === 1 ? '✅' : '🏡'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '✅' : '🏡'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '✅' : '🏡'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '✅' : '🏡'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '✅' : '🏡'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '✅' : '🏡'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '✅' : '🏡'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '✅' : '🏡'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '✅' : '🏡'} 9. Кирпичный дом (800.000$)
${message.user.realty.home === 10 ? '✅' : '🏡'} 10. Коттедж (4.500.000$)
${message.user.realty.home === 11 ? '✅' : '🏡'} 11. Особняк (12.500.000$)
${message.user.realty.home === 12 ? '✅' : '🏡'} 12. Дом на Рублёвке (50.000.000$)
${message.user.realty.home === 13 ? '✅' : '🏡'} 13. Личный небоскрёб (70.000.000$)
${message.user.realty.home === 14 ? '✅' : '🏡'} 14. Остров с особняком (125.000.000$)
${message.user.realty.home === 15 ? '✅' : '🏡'} 15. Белый дом (200.000.000$)
${message.user.realty.home === 16 ? '✅' : '🏡'} 16. Букингемский дворец (1.500.000.000$)

🛒 Для покупки введите «Дом [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	}

if(message.isChat){
	if(!message.args[1]) return bot(`дома:
${message.user.realty.home === 1 ? '✅' : '🏡'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '✅' : '🏡'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '✅' : '🏡'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '✅' : '🏡'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '✅' : '🏡'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '✅' : '🏡'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '✅' : '🏡'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '✅' : '🏡'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '✅' : '🏡'} 9. Кирпичный дом (800.000$)
${message.user.realty.home === 10 ? '✅' : '🏡'} 10. Коттедж (4.500.000$)
${message.user.realty.home === 11 ? '✅' : '🏡'} 11. Особняк (12.500.000$)
${message.user.realty.home === 12 ? '✅' : '🏡'} 12. Дом на Рублёвке (50.000.000$)
${message.user.realty.home === 13 ? '✅' : '🏡'} 13. Личный небоскрёб (70.000.000$)
${message.user.realty.home === 14 ? '✅' : '🏡'} 14. Остров с особняком (125.000.000$)
${message.user.realty.home === 15 ? '✅' : '🏡'} 15. Белый дом (200.000.000$)
${message.user.realty.home === 16 ? '✅' : '🏡'} 16. Букингемский дворец (1.500.000.000$)

🛒 Для покупки введите «Дом [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return bot(`данного дома не существует.`);
	if(message.args[1] == 17) return bot(`данного дома не существует.`); 
	if(message.args[1] == 18) return bot(`данного дома не существует.`); 
	if(message.args[1] == 19) return bot(`данного дома не существует.`);
	if(message.args[1] == 20) return bot(`данного дома не существует.`);
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите «Продать дом»`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры|🌇Квартиры)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`квартиры:
${message.user.realty.apartment === 1 ? '✅' : '🌇'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '✅' : '🌇'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '✅' : '🌇'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '✅' : '🌇'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '✅' : '🌇'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '✅' : '🌇'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '✅' : '🌇'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '✅' : '🌇'} 8. Квартира с Евроремонтом (6.000.000$)
${message.user.realty.apartment === 9 ? '✅' : '🌇'} 9. Аппартаменты La Belle Epoque (335.000.000$)

🛒 Для покупки введите «Квартира [номер]»`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"10\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
		}

if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`квартиры:
${message.user.realty.apartment === 1 ? '✅' : '🌇'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '✅' : '🌇'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '✅' : '🌇'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '✅' : '🌇'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '✅' : '🌇'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '✅' : '🌇'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '✅' : '🌇'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '✅' : '🌇'} 8. Квартира с Евроремонтом (6.000.000$)
${message.user.realty.apartment === 9 ? '✅' : '🌇'} 9. Аппартаменты La Belle Epoque (335.000.000$)

🛒 Для покупки введите «Квартира [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
		}

	}

if(message.isChat){
	if(!message.args[1]) return bot(`квартиры:
${message.user.realty.apartment === 1 ? '✅' : '🌇'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '✅' : '🌇'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '✅' : '🌇'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '✅' : '🌇'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '✅' : '🌇'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '✅' : '🌇'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '✅' : '🌇'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '✅' : '🌇'} 8. Квартира с Евроремонтом (6.000.000$)
${message.user.realty.apartment === 9 ? '✅' : '🌇'} 9. Аппартаменты La Belle Epoque (335.000.000$)

🛒 Для покупки введите «Квартира [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(message.args[1] == 10) return bot(`данной квартиры не существует.`);
	if(message.args[1] == 11) return bot(`данной квартиры не существует.`);
	if(message.args[1] == 12) return bot(`данной квартиры не существует.`);
	if(message.args[1] == 13) return bot(`данной квартиры не существует.`);
	if(!sell) return bot(`данной квартиры не существует.`);
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите «Продать квартиру»`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:телефон|телефоны|📱Телефоны)\s?([0-9]+)?$/i, async (message, bot) => {

if(!message.isChat){
if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`телефоны:
${message.user.misc.phone === 1 ? '✅' : '📱'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '✅' : '📱'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '✅' : '📱'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '✅' : '📱'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '✅' : '📱'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '✅' : '📱'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '✅' : '📱'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '✅' : '📱'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '✅' : '📱'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '✅' : '📱'} 10. Мегафон С1 (250.000$)
${message.user.misc.phone === 11 ? '✅' : '📱'} 11. Falcon SuperNova (50.000.000$)
${message.user.misc.phone === 12 ? '✅' : '📱'} 12. Banana (1.000.000.000$)

🛒 Для покупки введите «Телефон [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"7\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

if(message.user.lte2 == true){
	if(!message.args[1]) return bot(`телефоны:
${message.user.misc.phone === 1 ? '✅' : '📱'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '✅' : '📱'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '✅' : '📱'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '✅' : '📱'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '✅' : '📱'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '✅' : '📱'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '✅' : '📱'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '✅' : '📱'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '✅' : '📱'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '✅' : '📱'} 10. Мегафон С1 (250.000$)
${message.user.misc.phone === 11 ? '✅' : '📱'} 11. Falcon SuperNova (50.000.000$)
${message.user.misc.phone === 12 ? '✅' : '📱'} 12. Banana (1.000.000.000$)

🛒 Для покупки введите «Телефон [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	}

	if(message.isChat){
	if(!message.args[1]) return bot(`телефоны:
${message.user.misc.phone === 1 ? '✅' : '📱'} 1. Nokia 108 (250$)
${message.user.misc.phone === 2 ? '✅' : '📱'} 2. Nokia 3310 (2017) (500$)
${message.user.misc.phone === 3 ? '✅' : '📱'} 3. ASUS ZenFone 4 (2.000$)
${message.user.misc.phone === 4 ? '✅' : '📱'} 4. BQ Aquaris X (10.000$)
${message.user.misc.phone === 5 ? '✅' : '📱'} 5. Sony Xperia XA (15.000$)
${message.user.misc.phone === 6 ? '✅' : '📱'} 6. Samsung Galaxy S8 (30.000$)
${message.user.misc.phone === 7 ? '✅' : '📱'} 7. Xiaomi Mi Mix (50.000$)
${message.user.misc.phone === 8 ? '✅' : '📱'} 8. Torex FS1 (75.000$)
${message.user.misc.phone === 9 ? '✅' : '📱'} 9. iPhone X (100.000$)
${message.user.misc.phone === 10 ? '✅' : '📱'} 10. Мегафон С1 (250.000$)
${message.user.misc.phone === 11 ? '✅' : '📱'} 11. Falcon SuperNova (50.000.000$)
${message.user.misc.phone === 12 ? '✅' : '📱'} 12. Banana (1.000.000.000$)

🛒 Для покупки введите «Телефон [номер]»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "🛒Магазин"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return bot(`данного телефона не существует.`); 
	if(message.args[1] == 13) return bot(`данного телефона не существует.`); 
	if(message.args[1] == 14) return bot(`данного телефона не существует.`); 
	if(message.args[1] == 15) return bot(`данного телефона не существует.`); 
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите «Продать телефон»`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: 'photo-182707530_456239026' });
	}
});

cmd.hear(/^(?:фермы 1|фермы 2|фермы 3|фермы 4)$/i, async (message, bot) => { 

return bot(`хотите купить фермы?

🛒 Купить: фермы [номер] [кол-во]
🤑 Собрать биткоины: ферма`);

}); 

cmd.hear(/^(?:фермы|💽Фермы|💽 Фермы|🔋 Фермы|🔋Фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {

	if(!message.isChat){
	if(message.user.lte2 == false){
	if(!message.args[1]) return bot(`майнинг фермы:

${message.user.misc.farm === 1 ? '✅' : '🔋'} 1. 6U Nvidia 2฿/час — 20.500.000$
${message.user.misc.farm === 2 ? '✅' : '🔋'} 2. AntminerS9 10฿/час — 100.000.000$
${message.user.misc.farm === 3 ? '✅' : '🔋'} 3. FM2018-BT200 100฿/час — 900.000.000$
${message.user.misc.farm === 4 ? '✅' : '🔋'} 4. Supreme Miner 500฿/час — 5.000.000.000$

🛒 Купить: фермы [номер] [кол-во]
🤑 Собрать биткоины: ферма`);
	}else{
	if(!message.args[1]) return bot(`майнинг фермы:

${message.user.misc.farm === 1 ? '✅' : '🔋'} 1. 6U Nvidia 2฿/час — 20.500.000$
${message.user.misc.farm === 2 ? '✅' : '🔋'} 2. AntminerS9 10฿/час — 100.000.000$
${message.user.misc.farm === 3 ? '✅' : '🔋'} 3. FM2018-BT200 100฿/час — 900.000.000$
${message.user.misc.farm === 4 ? '✅' : '🔋'} 4. Supreme Miner 500฿/час — 5.000.000.000$

🛒 Купить: фермы [номер] [кол-во]
🤑 Собрать биткоины: ферма`);
	}

	}else{
	if(!message.args[1]) return bot(`майнинг фермы:

${message.user.misc.farm === 1 ? '✅' : '🔋'} 1. 6U Nvidia 2฿/час — 20.500.000$
${message.user.misc.farm === 2 ? '✅' : '🔋'} 2. AntminerS9 10฿/час — 100.000.000$
${message.user.misc.farm === 3 ? '✅' : '🔋'} 3. FM2018-BT200 100฿/час — 900.000.000$
${message.user.misc.farm === 4 ? '✅' : '🔋'} 4. Supreme Miner 500฿/час — 5.000.000.000$

🛒 Купить: фермы [номер] [кол-во]
🤑 Собрать биткоины: ферма`);
	}

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return bot(`такой фермы нет в продаже.`);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`]);

	if(message.user.polnom < 2){
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше ${donatich}`);
	if(count + message.user.misc.farm_count > 3000) return bot(`вы не можете иметь больше 3.000 ферм одновременно ${donatich}`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа, продайте существующие «Продать фермы [кол-во]»`);
	}
	if(message.user.polnom >= 10){
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше ${donatich}`);
	if(count + message.user.misc.farm_count > 50000) return bot(`вы не можете иметь больше 50.000 ферм одновременно ${donatich}`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа, продайте существующие «Продать фермы [кол-во]»`);
	}
	if(message.user.polnom < 10){
	if(message.user.polnom >= 2){
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше ${donatich}`);
	if(count + message.user.misc.farm_count > 12000) return bot(`вы не можете иметь больше 12.000 ферм одновременно ${donatich}`);
	if(message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) return bot(`вы не можете купить ферму другого типа, продайте существующие «Продать фермы [кол-во]»`);
	}
}
	if(message.user.balance < sell.cost * count) return bot(`недостаточно денег ${donatich}
	💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.farm = sell.id;
		message.user.misc.farm_count += count;
		message.user.premium = getUnix() + 3600000;

		return bot(`вы купили «${sell.name}» (${utils.sp(count)} шт.) за ${utils.sp(sell.cost * count)}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: 'photo-182707530_456239022' });
	}
});

cmd.hear(/^(?:забрать полном)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
if(message.polnom < 10) return;
	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.polnom -= message.args[2];

		await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
	}
});

cmd.hear(/^(?:полномочия|полном)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
if(message.polnom < 10) return;
	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.polnom += message.args[2];

		await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
	}
});

cmd.hear(/^(?:рейтинг|купить рейтинг|рейтинг купить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return bot(`укажите число больше 0.
❓Используйте «Продать рейтинг [кол-во]» для продажи.`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return bot(`укажите число больше 0.
❓Используйте «Продать рейтинг [кол-во]» для продажи.`);
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`у вас недостаточно денег ${donatich}
Стоимость одного рейтинга 250.000.000$
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])} 👑 за ${utils.sp(message.args[1] * 250000000)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:бизнесы|бизнес купить|купить бизнес|business|💼Бизнесы|💼 Бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {

	if(!message.isChat){
	if(message.user.lte2 == false){
	if(!message.args[1])
	{
		return bot(`бизнесы:

1. 🌯 Шаурмечная — 15 тыс $
⠀ ⠀ ⠀ Прибыль: 500$/час
2. 🏪 Ларёк — 500 тыс $
⠀ ⠀ ⠀ Прибыль: 3.000$/час
3. 🍷 Бар — 900 тыс $
⠀ ⠀ ⠀ Прибыль: 5.000$/час
4. 🏫 Мини-магазин — 5 млн $
⠀ ⠀ ⠀ Прибыль: 35.000$/час
5. 🏭 Завод в гараже — 15 млн $
⠀ ⠀ ⠀ Прибыль: 210.000$/час
6. ⛏ Угольная шахта — 250 млн $
⠀ ⠀ ⠀ Прибыль: 3.200.000$/час
7. 💒 Бордель — 900 млн $
⠀ ⠀ ⠀ Прибыль: 7.000.000$/час
8. 🕹 Разработка игр — 5 млрд $
⠀ ⠀ ⠀ Прибыль: 20.000.000$/час
9. 🏜 Нефтевышка в пустыне — 30 млрд $
⠀ ⠀ ⠀ Прибыль: 100.000.000$/час
10. 💡 Мини АЭС — 100 млрд $
⠀ ⠀ ⠀ Прибыль: 200.000.000$/час
11. 🎰 Небольшое казино — 500 млрд $
⠀ ⠀ ⠀ Прибыль: 1.000.000.000$/час
12. 📈 Финансовый рынок — 400 трлн $
⠀ ⠀ ⠀ Прибыль: 200.000.000.000$/час

💼 Вы можете иметь не больше ДВУХ бизнесов.

🤑 Купить: Бизнесы [номер]
✏ Например: Бизнесы 1`,
					{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"7\"}",
				"label": "🛒Магазин"
		},
			"color": "positive"
		},		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}
}else{
	if(!message.args[1])
	{
		return bot(`бизнесы:

1. 🌯 Шаурмечная — 15 тыс $
⠀ ⠀ ⠀ Прибыль: 500$/час
2. 🏪 Ларёк — 500 тыс $
⠀ ⠀ ⠀ Прибыль: 3.000$/час
3. 🍷 Бар — 900 тыс $
⠀ ⠀ ⠀ Прибыль: 5.000$/час
4. 🏫 Мини-магазин — 5 млн $
⠀ ⠀ ⠀ Прибыль: 35.000$/час
5. 🏭 Завод в гараже — 15 млн $
⠀ ⠀ ⠀ Прибыль: 210.000$/час
6. ⛏ Угольная шахта — 250 млн $
⠀ ⠀ ⠀ Прибыль: 3.200.000$/час
7. 💒 Бордель — 900 млн $
⠀ ⠀ ⠀ Прибыль: 7.000.000$/час
8. 🕹 Разработка игр — 5 млрд $
⠀ ⠀ ⠀ Прибыль: 20.000.000$/час
9. 🏜 Нефтевышка в пустыне — 30 млрд $
⠀ ⠀ ⠀ Прибыль: 100.000.000$/час
10. 💡 Мини АЭС — 100 млрд $
⠀ ⠀ ⠀ Прибыль: 200.000.000$/час
11. 🎰 Небольшое казино — 500 млрд $
⠀ ⠀ ⠀ Прибыль: 1.000.000.000$/час
12. 📈 Финансовый рынок — 400 трлн $
⠀ ⠀ ⠀ Прибыль: 200.000.000.000$/час

💼 Вы можете иметь не больше ДВУХ бизнесов.

🤑 Купить: Бизнесы [номер]
✏ Например: Бизнесы 1`);
	}
}

}else{
	if(!message.args[1])
	{
		return bot(`бизнесы:

1. 🌯 Шаурмечная — 15 тыс $
⠀ ⠀ ⠀ Прибыль: 500$/час
2. 🏪 Ларёк — 500 тыс $
⠀ ⠀ ⠀ Прибыль: 3.000$/час
3. 🍷 Бар — 900 тыс $
⠀ ⠀ ⠀ Прибыль: 5.000$/час
4. 🏫 Мини-магазин — 5 млн $
⠀ ⠀ ⠀ Прибыль: 35.000$/час
5. 🏭 Завод в гараже — 15 млн $
⠀ ⠀ ⠀ Прибыль: 210.000$/час
6. ⛏ Угольная шахта — 250 млн $
⠀ ⠀ ⠀ Прибыль: 3.200.000$/час
7. 💒 Бордель — 900 млн $
⠀ ⠀ ⠀ Прибыль: 7.000.000$/час
8. 🕹 Разработка игр — 5 млрд $
⠀ ⠀ ⠀ Прибыль: 20.000.000$/час
9. 🏜 Нефтевышка в пустыне — 30 млрд $
⠀ ⠀ ⠀ Прибыль: 100.000.000$/час
10. 💡 Мини АЭС — 100 млрд $
⠀ ⠀ ⠀ Прибыль: 200.000.000$/час
11. 🎰 Небольшое казино — 500 млрд $
⠀ ⠀ ⠀ Прибыль: 1.000.000.000$/час
12. 📈 Финансовый рынок — 400 трлн $
⠀ ⠀ ⠀ Прибыль: 200.000.000.000$/час

💼 Вы можете иметь не больше ДВУХ бизнесов.

🤑 Купить: Бизнесы [номер]
✏ Например: Бизнесы 1`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}
}

	if(message.user.business.length == 2) return bot(`у вас уже есть 2 бизнеса, продажа: Продать бизнес [1-2]
📈 Просмотр статистики: Бизнес [1-2]`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];

	if(sell == null) return bot(`данного бизнеса нет в продаже.`);
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	if(message.user.balance < sell.cost) return bot(`у вас недостаточно денег ${donatich}
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });

	message.user.balance -= sell.cost;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

return bot(`вы купили бизнес «${sell.name}» 🤑

💼 Чтобы узнать информацию о нём и начать мутить БАБЛО, напиши "бизнес"`, { attachment: '' });
});

cmd.hear(/^(?:курс|сколько стоит битко(е|и|й)н|курс битко(е|и|й)на)$/i, async (message, bot) => {

return bot(`1 биткоин = ${utils.sp(btc)}$ 💸

🛍 Купить: биткоин [кол-во]
🔋 Купить ферму: фермы`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Биткоин"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"99\"}",
				"label": "Фермы"
		},
			"color": "positive" 
		}]
		]
		})
	});
});

cmd.hear(/^(?:биткоин|биткойн|биткоен|купить биткоин|биткоин купить|btc|биткоины)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

if(message.args[1] == `всё` | message.args[1] == `все`){
if(message.user.balance > 1000000){
var snus = Math.floor(Number(message.user.balance / btc));
message.user.btc += snus;
bot(`вы купили ${utils.sp(Math.floor(snus))}฿ за ${utils.sp(message.user.balance)}$

💰 Баланс: 0$`, { attachment: 'photo-182707530_456239021' });
message.user.balance = 0;
return;
}
}

if(!Number(message.args[1])) return bot(`укажите число ${luckych}
❓Введите «Продать биткоин [кол-во]» для продажи.`);
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return bot(`укажите число больше чем 0.`);

if( (message.args[1] * btc) > message.user.balance){
return bot(`недостаточно денег.
💸 Курс биткоина: ${utils.sp(btc)}$
🛍 Вам хватает на покупку ${utils.sp(Math.floor(message.user.balance / btc))}฿`);
}else{
message.user.balance -= (message.args[1] * btc);
message.user.btc += message.args[1];

return bot(`вы купили ${utils.sp(message.args[1])}฿ за ${utils.sp(message.args[1] * btc)}$

💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: 'photo-182707530_456239021' });
}
});

cmd.hear(/^(?:топ|top|топ игроков|njg|tops)$/i, async (message, bot) => {
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
		text += `${i === 9 ? `\n&#128287;` : `\n${i + 1}&#8419;`} [id${user.id}|${user.tag}] — ${utils.sp(user.rating)} 👑 | $${utils.rn(user.balance)}`;
	}

bot(`топ игроков:
${text}
—————————————————
➡${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rating)} 👑 | $${utils.rn(message.user.balance)}`);
return message.sendSticker(14261);
});

cmd.hear(/^(?:игры|🎲Игры|🎲 Игры|, 🎲 Игры)$/i, async (message, bot) => {

if(message.user.lte2 == false){
	return bot(`список игр:

⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📦 Кейсы
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [число 1-99]
⠀⠀⚖ Инвест
⠀⠀👔 Работать/работа
⠀⠀🔐 Хакнуть
⠀⠀🕹 Рулетка
⠀⠀👒 Квесты 
⠀⠀🎄 Взлом подарка
⠀⠀🛡 Клан помощь`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`список игр:

⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📦 Кейсы
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [число 1-99]
⠀⠀⚖ Инвест
⠀⠀👔 Работать/работа
⠀⠀🔐 Хакнуть
⠀⠀🕹 Рулетка
⠀⠀👒 Квесты 
⠀⠀🎄 Взлом подарка
⠀⠀🛡 Клан помощь`);
	}

});

cmd.hear(/^(?:бонус|🎁Бонус|🎁 Бонус|,jyec|ьонус|mjyec|ежедневный бонус|, 🎁Бонус)$/i, async (message, bot) => {
	if(message.user.follow == null) message.user.follow = { follow: true, last: getUnix() };
	let follow = message.user.follow.follow
	if(message.user.follow.last < getUnix()) { follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 191380914 }); message.user.follow.last = getUnix() + 300000; message.user.follow.follow = follow }
	if(message.user.bonus > getUnix()) return bot(`следующий бонус через ${unixStampLeft(message.user.bonus - Date.now())} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`)
	let prize = utils.random(1, 10);	
	message.user.bonus = getUnix() + 86400000;
	var money = message.user.balance;

	if(prize == 1){
		if(money > 1000000000000){
			message.user.balance += 10000000000;
		}else{
			message.user.balance += 50000000;
		}
		bot(`вы получили ${money > 1000000000000 ? `10.000.000.000$!` : `50.000.000$!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257386'});
		return message.sendSticker(16159);
	}

	if(prize == 2){
		if(money > 1000000000000){
			message.user.balance += 100000000000;
		}else{
			message.user.balance += 150000000;
		}
		bot(`вы получили ${money > 1000000000000 ? `100.000.000.000$!` : `150.000.000$!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257387'});
		return message.sendSticker(6039);
	}

	if(prize == 3){
		if(money > 1000000000000){
			message.user.balance += 50000000000;
		}else{
			message.user.balance += 100000000;
		}
		bot(`вы получили ${money > 1000000000000 ? `50.000.000.000$!` : `100.000.000$!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257388'});
		return message.sendSticker(5823);
	}

	if(prize == 4){
		if(money > 1000000000000){
			message.user.balance += 30000000000;
		}else{
			message.user.balance += 228228228;
		}
		bot(`вы получили ${money > 1000000000000 ? `30.000.000.000$!` : `228.228.228$!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257389'});
		return message.sendSticker(9218);
	}

	if(prize == 5){
		if(money > 1000000000000){
			message.user.balance += 35000000000;
		}else{
			message.user.balance += 300000000;
		}
		bot(`вы получили ${money > 1000000000000 ? `35.000.000.000$!` : `300.000.000$!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257392'});
		return message.sendSticker(15121);
	}

	if(prize == 6){
		if(money > 1000000000000){
			message.user.btc += 300000;
		}else{
			message.user.btc += 30000;
		}
		bot(`вы получили ${money > 1000000000000 ? `300.000฿!` : `30.000฿!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257391'});
		return message.sendSticker(10021);
	}

	if(prize == 7){
		if(money > 1000000000000){
			message.user.btc += 500000;
		}else{
			message.user.btc += 50000;
		}
		bot(`вы получили ${money > 1000000000000 ? `500.000฿!` : `50.000฿!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257390'});
		return message.sendSticker(8783);
	}

	if(prize == 8){
		if(money > 1000000000000){
			message.user.rating += 150;
		}else{
			message.user.rating += 1;
		}
		bot(`вы получили ${money > 1000000000000 ? `150 👑!` : `1 👑!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257393'});
		return message.sendSticker(15121);
	}

	if(prize == 9){
		if(money > 1000000000000){
			message.user.rating += 200;
		}else{
			message.user.rating += 2;
		}
		bot(`вы получили ${money > 1000000000000 ? `200 👑!` : `2 👑!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257393'});
		return message.sendSticker(9218);
	}

	if(prize == 10){
		if(money > 1000000000000){
			message.user.rating += 500;
		}else{
			message.user.rating += 5;
		}
		bot(`вы получили ${money > 1000000000000 ? `500 👑!` : `5 👑!`} ${utils.pick([`💸`,`💰`,`🔥`,`🎁`])}${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`, {attachment:'photo-182435125_457257393'});
		return message.sendSticker(16159);
	}

});

cmd.hear(/^(?:вип бонус|бонус вип|vip бонус|бонус vip|vip bonus|bonus vip|випбонус|бонусвип|админбонус|бонусадмин|админ бонус|бонус админ|admin бонус|бонус admin|admin bonus|bonus admin|адм бонус|бонус адм)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
if(message.user.polnom < 2) return bot(`данная команда доступна с привилегии VIP и выше.`, {attachment: ``});

if(message.user.polnom >= 10){
	if(getUnix() < message.user.bablo2){
		return bot(`следующий ADMIN бонус через ${unixStampLeft(message.user.bablo2 - Date.now())} ${luckych}`);
	}else{
	let prizes = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	if(prizes === 1)
	{
		message.user.balance += 10000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 10.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(13363);
	}

	if(prizes === 2)
	{
		message.user.balance += 30000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 30.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(14266);
	}

	if(prizes === 3)
	{
		message.user.balance += 10000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 10.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(13363);
	}

	if(prizes === 4)
	{
		message.user.btc += 300000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 300.000฿\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`);
		return message.sendSticker(14266);
	}

	if(prizes === 5)
	{
		message.user.rating += 500;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 500👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		return message.sendSticker(13363);
	}

	if(prizes === 6)
	{
		message.user.rating += 1000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 1000👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		return message.sendSticker(15559);
	}

	if(prizes === 7)
	{
		message.user.btc += 1000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 1.000.000฿\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`);
		return message.sendSticker(13363);
	}

	if(prizes === 8)
	{
		message.user.balance += 50000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 50.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(14266);
	}

	if(prizes === 9)
	{
		message.user.balance += 100000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 100.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(15559);
	}

}
}

if(message.user.polnom >= 2){
	if(getUnix() < message.user.bablo2){
		return bot(`следующий VIP бонус через ${unixStampLeft(message.user.bablo2 - Date.now())} ${luckych}`);
	}else{
	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	if(prize === 1)
	{
		message.user.balance += 1000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 1.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(13363);
	}

	if(prize === 2)
	{
		message.user.balance += 3000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 3.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(14266);
	}

	if(prize === 3)
	{
		message.user.balance += 1000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 1.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(13363);
	}

	if(prize === 4)
	{
		message.user.btc += 30000;
		message.user.bablo2 = getUnix() + 86400000;
		return bot(`вы выиграли 30.000฿\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`);
		return message.sendSticker(14266);
	}

	if(prize === 5)
	{
		message.user.rating += 50;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 50👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		return message.sendSticker(13363);
	}

	if(prize === 6)
	{
		message.user.rating += 100;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 100👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
		return message.sendSticker(14266);
	}

	if(prize === 7)
	{
		message.user.btc += 100000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 100.000฿\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`);
		return message.sendSticker(15559);
	}

	if(prize === 8)
	{
		message.user.balance += 5000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 5.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(14266);
	}

	if(prize === 9)
	{
		message.user.balance += 50000000000;
		message.user.bablo2 = getUnix() + 86400000;
		bot(`вы выиграли 50.000.000.000$\n💰 Баланс: ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(15559);
	}

}
}
});

cmd.hear(/^(?:хакнуть|хак|🚨 Ограбить|🚨Ограбить|🔐 Хакнуть|💽 Хакнуть|💽Хакнуть|🔐Хакнуть|взломать|ограбление|взлом|ограбить|ограбить банк|ограбь)$/i, async (message, bot) => {
if(message.user.follow == null) message.user.follow = { follow: true, last: getUnix() };
let follow = message.user.follow.follow
if(message.user.follow.last < getUnix()) { follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 191380914 }); message.user.follow.last = getUnix() + 300000; message.user.follow.follow = follow }
if(message.user.vzlom > getUnix()) return bot(`${utils.pick([`нельзя так часто рисковать своей ж...`,`чуть-чуть подождём!`,`компьютер выключен!`,`куда так часто?!`])} Следующий хак через ${unixStampLeft(message.user.vzlom - Date.now())} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`,`🤑`])}\n\n${!follow ? `\n\n${utils.pick(['🎲', '🍌',`🔥`,`✅`,`❤`,`🤑`])} Буду рад если @club191380914(подпишешься на меня), конкурсы и акции в группе проводятся каждый день.` : ``}`);

let prize = utils.random(1, 17);	
if(prize !== 17){
let upom = utils.pick([`работники банка пришли с обеда!
ОГРАБЬ его скорее, пока не пришла волна бабушек за пенсией! 👵🏻`,`сосед ушёл на работу, ХАКАЙ скорее его компьютер! 🖥`, `найден баг в мошенническом проекте, ВЗЛОМАЙ его быстрее! 📈`, `компьютер подобрал пароль и готов к взлому!
Напиши "хакнуть", чтобы начать взлом 🔓`,`работники банка пришли с обеда!
Нужно начинать ограбление, а то через 5 минут снова обед! 🕑`]);
const but = utils.random(1, 2);

if(but == 1){
	setTimeout(async () => {
	message.send(`🔦 [id${message.user.id}|${message.user.tag}], ${upom}`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "💽 Хакнуть"
}, 
"color": "positive" 
		}] 
] 
}) 
});
	}, 3600001);
}

if(but == 2){
	setTimeout(async () => {
	message.send(`🔦 [id${message.user.id}|${message.user.tag}], ${upom}`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "🚨 Ограбить"
}, 
"color": "positive" 
		}] 
] 
}) 
});
	}, 3600001);
}
}

	if(prize == 1)
	{
		message.user.balance += 5000000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вам удалось взломать сайт школьника, вы получили +5.000.000$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:'photo-182707530_456239043'});
	}

	if(prize == 2)
	{
		message.user.btc += 50000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вам удалось «опрокинуть» один из бинарных опционов, вы получили +50.000฿ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`, {attachment:'photo-182707530_456239042'});
	}

	if(prize == 3)
	{
		message.user.bank += 10000000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. 
	✅ Вы заработали 10.000.000$!\n💳 В банке: ${utils.sp(message.user.bank)}$`,{attachment:'photo-182707530_456239041'});
	}

	if(prize == 4)
	{
		message.user.balance += 100000000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`благодаря вам удалось взломать страницу знаменитой личности, вы получили +100.000.000$! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:'photo-182707530_456239045'});
	}

	if(prize == 5)
	{
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вы мутили крупный проект, но ваш напарник оказался кидком и слился ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`,`🤑`])}`, {attachment:'photo-182707530_456239044'});
	}

	if(prize == 6)
	{
		message.user.balance += 50000000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вы хакнули компьютер соседа и потребовали выкуп. ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])} Начислено +50.000.000$!\n\n💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:'photo-182707530_456239048'});
	}

	if(prize == 7)
	{
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вы были пойманы при попытке взломать чужой ноутбук, через 1 час вас отмажут.`, {attachment:'photo-184865443_457239019'});
	}

	if(prize == 8)
	{
		message.user.balance += 5000000;
		message.user.vzlom = getUnix() + 3600000;
		return bot(`вам удалось взломать сайт школьника, вы получили +5.000.000$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:'photo-182707530_456239043'});
	}

	if(prize == 9)
	{
		message.user.vzlom = getUnix() + 3600000;
		return bot(`упс... Банк закрыт! о_О
🎡 Сегодня у него выходной, как Вы могли не знать этого?`, {attachment:'photo-182435125_457257327'});
	}

	if(prize == 10)
	{
		message.user.vzlom = getUnix() + 3600000;
		bot(`чёрт! Отключилось электричество и компьютер выключился! Провальная попытка взлома 😔`);
		return message.sendSticker(13646);
	}

	if(prize == 11)
	{
		const moneyrain = utils.random(80000000, 150000000);
		message.user.vzlom = getUnix() + 3600000;
		message.user.balance += moneyrain;
		bot(`вы взломали Пентагон и продали информацию о нём на чёрных рынках 🏛
Выручка: ${utils.sp(moneyrain)}$ 🤑`);
		return message.sendSticker(712);
	}

	if(prize == 12)
	{
		message.user.vzlom = getUnix() + 3600000;
		bot(`чёрт! Ограбление провалено! 😔
🚔👮🏻 Вас поймала полиция. Придётся сидеть час!`);
		return message.sendSticker(714);
	}

	if(prize == 13)
	{
		message.user.vzlom = getUnix() + 3600000;
		bot(`вы забыли включить VPN и успешно спалились на попытке взлома, ничего не заработав 😭`);
		return message.sendSticker(732);
	}

	if(prize == 14)
	{
		const moneyraine = utils.random(80000000, 150000000);
		message.user.vzlom = getUnix() + 3600000;
		message.user.balance += moneyraine;
		return bot(`вы взломали Qiwi-кошелек случайного человека и вывели себе все его деньги 💻
Выручка: ${utils.sp(moneyraine)}$ 🤑`, {attachment:'photo-182435125_457257334'});
	}

	if(prize == 15)
	{
		const moneyrainee = utils.random(80000000, 150000000);
		message.user.vzlom = getUnix() + 3600000;
		message.user.balance += moneyrainee;
		return bot(`вы взломали Qiwi-кошелек случайного человека и вывели себе все его деньги 💻
Выручка: ${utils.sp(moneyrainee)}$ 🤑`, {attachment:'photo-182435125_457257334'});
	}

	if(prize == 16)
	{
		const moneyraineee = utils.random(80000000, 350000000);
		message.user.vzlom = getUnix() + 3600000;
		message.user.bank += moneyraineee;
		return bot(`вы сп*здили чью-то карту и вывели всё БАБЛО 💳
Выручка: ${utils.sp(moneyraineee)}$ 🤑`, {attachment: `photo-182435125_457257347`});
	}

	if(prize == 17)
	{
		return bot(`вы что не видите? У нас ОБЕД!!! 😡
Вам необходимо подождать 5 минут! 😰`, {attachment: `photo-182435125_457257351`});
	}
});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
const errors = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	if(message.user.marriage.partner) return bot(`вы уже в браке с игроком ${users[message.user.marriage.partner].tag}`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете жениться/выйти замуж за себя ${errors}`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	if(user.marriage.partner) return bot(`этот человек уже состоит в браке ${errors}`);

	if(user.marriage.requests.find(x=> x == message.args[1])) return bot(`вы уже делали предложение этому игроку ${errors}`);

	if(message.user.marriage.requests.find(x=> x == message.args[1]))
	{
		message.user.marriage.requests = [];
		message.user.marriage.partner = user.uid;

		user.marriage.requests = [];
		user.marriage.partner = message.user.uid;

		return bot(`вы вступили в брак с игроком «${user.tag}» ${success}`);
	}

	user.marriage.requests.push(message.user.uid);
	
	await bot(`вы сделали предложение игроку «${user.tag}»`);
	vk.api.messages.send({ user_id: user.id, message: `
❤ Игрок ${message.user.tag} сделал вам предложение!
❓ Для вступления в брак с данным игроком напишите «Брак ${message.user.uid}»
⚠ Вам никто не может делать предложения когда вы находитесь в браке.`});

});

cmd.hear(/^(?:браки|предложения)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.hear(/^(?:развод|развестись)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке ${phrase}`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек ${luckych}`);
});

cmd.hear(/^(?:минус репорт|минус реп|банреп|банрепорт)\s([0-9]+)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
if(message.polnom < 10) return;
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.grabim = true;

		await bot(`вы отключили игроку ${user.tag} репорт.`);
		vk.api.messages.send({ user_id: user.id, message: `Вам отключен репорт ${phrase}` });
	}
});

cmd.hear(/^(?:сетреп|сетрепорт|дать репорт|выдать репорт|разбан реп|разбан репорт|разбан репорта)\s([0-9]+)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);

if(message.polnom < 10) return;
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.grabim = false;

		await bot(`вы разбанили игроку ${user.tag} репорт ${luckych}`);
		vk.api.messages.send({ user_id: user.id, message: `Вам включён репорт ${luckych}` });
	}
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {

let zaprets = message.args[1].toLowerCase();
var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█|▓|марихуана|режьте вены|суицид|суицыд|youtu.be|أحبك|أحب|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
if(pizda.test(zaprets) == true) return bot(`ошибка ❌
В вашем сообщении есть запрещенные правилами VK слова.`);

if(message.isChat) return bot(`команда работает @botmendes (только в ЛС ✉)`);

const phrase = utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`]);
if(message.user.grabim == true) return bot(`вам отключен репорт ${phrase}`);

if(message.user.ktokto1 > getUnix()){ 
	return bot(`вы недавно отправляли обращение, дождитесь ответа на старый репорт, либо создайте новый через ${unixStampLeft(message.user.ktokto1 - Date.now())} ${phrase}`);
}else{
	getUnix() + 43200000
	message.user.ktokto1 = getUnix() + 43200000;
	message.user.rozetka2 = true;
	const luckych = utils.pick([`😁`,`😏`,`🤑`,`😯`]);
	vk.api.messages.send({ user_id: 301015165, message: `🗣 Поступил новый репорт.
🔎 Игровой ID: ${message.user.uid}
➡ [id${message.user.id}|${message.user.tag}]: ${message.args[1]}

🔁 Используйте для ответа: ответ ${message.user.uid} [фраза]` });
return bot(`ваше сообщение отправлено ${luckych}`);
}
});

cmd.hear(/^(?:ответ|ответить)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {

let zaprets = message.args[2].toLowerCase();
var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█|أحبك|أحب|▓|синий кит|режьте вены|суицид|суицыд|марихуана|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
if(pizda.test(zaprets) == true) return bot(`ошибка ❌
В вашем сообщении есть запрещенные правилами VK слова.`);

const errors = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);

	if(message.user.kredit1 == false){
	if(message.user.odmen == false) return bot(`вы не являетесь администратором ${errors}`, {attachment:''});
}
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`не могу найти данного игрока ${errors}`);
	const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);

	if(user.rozetka2 == false) return bot(`от данного игрока не поступало запросов, либо уже поступил ответ на обращение ❌`);
	user.ktokto1 = 0;
	user.rozetka2 = false;
	await bot(`ваше сообщение отправлено! ${success}`);
	vk.api.messages.send({ user_id: user.id, message: `🗣 Поступил ответ на ваш репорт.
➡ ${message.user.tag}: ${message.args[2]}` });
});

cmd.hear(/^(?:работа|работы|робота)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия — ${works[message.user.work - 1].name}. Для трудоустройства на новую работу увольтесь со своей нынешней работы.
❌ Увольнение: уволиться`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "Уволиться"
}, 
"color": "negative" 
		}] 
] 
}) 
});
	
	const work = works.find(x=> x.id === Number(message.args[1]));
	const errors = utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`]);
	if(!work) return bot(`данной работы не существует ${errors}`);

	if(work.requiredLevel > message.user.level) return bot(`у вас недостаточно знаний! ${errors}
Устройтесь на другую работу, у вас знаний: ${message.user.level}`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		bot(`вы устроились на работу — ${work.name}.
👔 Введите команду «Работать»`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		}] 
] 
}) 
});
		return message.sendSticker(12971);
	}
});

cmd.hear(/^(?:работа|робота)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
if(message.user.work) return bot(`ваша профессия — ${works[message.user.work - 1].name} ${success}
🤑 Чтобы работать, напиши «Работать»

✅ Список работ по команде «Работы»
❌ Увольнение по команде «Уволиться»`);

	return bot(`профессии:

🎅 1. Дворник — 1 знание
🛀 2. Сантехник — 15 знаний
👨‍🏭 3. Электрик — 30 знаний
👨‍🔧 4. Слесарь — 80 знаний
👨‍⚖ 5. Юрист — 200 знаний
💁‍♀ 6. Бухгалтер — 350 знаний
💃 7. Бармен — 500 знаний
👨‍💻 8. Админ — 800 знаний
🤖 9. Хакер — 5.000 знаний
💼 10. Бизнесмен — 12.000 знаний

✅ Устроиться: работа [номер]
❌ Увольнение: уволиться`);
});

cmd.hear(/^(?:работы)$/i, async (message, bot) => {
	return bot(`профессии:

🎅 1. Дворник — 1 знание
🛀 2. Сантехник — 15 знаний
👨‍🏭 3. Электрик — 30 знаний
👨‍🔧 4. Слесарь — 80 знаний
👨‍⚖ 5. Юрист — 200 знаний
💁‍♀ 6. Бухгалтер — 350 знаний
💃 7. Бармен — 500 знаний
👨‍💻 8. Админ — 800 знаний
🤖 9. Хакер — 5.000 знаний
💼 10. Бизнесмен — 12.000 знаний

✅ Устроиться: работа [номер]
❌ Увольнение: уволиться`);
});

cmd.hear(/^(?:работать|👔Работать|👔 Работать)$/i, async (message, bot) => {
if(!message.user.work) return bot(`вы нигде не работаете ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
👔 Для трудоустройства введите «Работа»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Работа"
		},
			"color": "positive" 
		}]
		]
			})
		});

const polnom = message.user.polnom;
if(polnom < 2){
var dela = 10;
}

if(polnom < 10){
if(polnom >= 2){
var dela = 15;
}
}

if(polnom >= 10){
var dela = 20;
}

if(message.user.zapas > getUnix()) return bot(`вам нечем заняться.
📋 Новые ${dela} дел появятся через ${unixStampLefta(message.user.zapas - Date.now())}`);

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.level += 1;
	message.user.exp -= 1;

if(!message.isChat){
	if(message.user.exp < 1){
	message.user.zapas = getUnix() + 600000;
	message.user.exp = dela;
	if(message.user.lte2 == true){
	setTimeout(async () => {
	message.send(`👔 У вас появилось ${dela} новых дел, введите команду «Работать»`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		}] 
] 
}) 
});
	}, 600001);

return bot(`дела закончились ⚠
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`);

}else{
	setTimeout(async () => {
	message.send(`👔 У вас появилось ${dela} новых дел, введите команду «Работать»`,
		{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
}] 
] 
}) 
});
	}, 600001);

return bot(`дела закончились ⚠
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
}
}else{
if(message.user.lte2 == true){
return bot(`рабочий день закончен, осталось дел: ${message.user.exp} 📋
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		}] 
] 
}) 
});
}else{
return bot(`рабочий день закончен, осталось дел: ${message.user.exp} 📋
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`,
	{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
}] 
] 
}) 
});
	}
}
}else{
	if(message.user.exp < 1){
	message.user.zapas = getUnix() + 600000;
	message.user.exp = dela;

return bot(`дела закончились ⚠
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`);
}else{
return bot(`рабочий день закончен, осталось дел: ${message.user.exp} 📋
🎓 Знаний: ${utils.sp(message.user.level)}
💵 Заработано +${utils.sp(earn)}$`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "👔 Работать"
}, 
"color": "secondary" 
		}] 
] 
}) 
});
}
}
});

cmd.hear(/^(?:уволиться|«Уволиться»|уволится|уволица)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете ${utils.pick([`😳`, `😒`, `😟`, `🙄`, `🤔`])}`);
	message.user.work = 0;
	return bot(`вы уволились со своей работы ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`);
});

cmd.hear(/^(?:кубик|куб|кости)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(message.args[1] > 6) return bot(`укажите число от 1 до 6 🤑`);
	if(int == message.args[1])
	{
		progressQuest(message.user, 2)
		message.user.balance += 5000000;
		return bot(`вы угадали! Приз 5.000.000$ ${utils.pick([`🤤`,`☺`,`🙂`, `😁`,`😏`,`🤑`])}`, { attachment: 'photo-182435125_457257328' });
	}else{
	resetQuest(message.user, 2)
	return bot(`не угадали.
🎲 Выпало число ${int}&#8419;`);
	}
});

cmd.hear(/^(?:инвест|⚖ Инвест|⚖Инвест|инвест дома|инвест технологии|инвест наука)$/i, async (message, bot) => {
	return bot(`инвестируй своё БАБЛО и получай прибыль! 🤑

🏠 В строительство:
инвест дома [сумма]

⚙ В технологии:
инвест технологии [сумма]

⚗ В науку:
инвест наука [сумма]`);
});

cmd.hear(/^(?:инвест|⚖ Инвест|⚖Инвест)\s(дома|технологии|наука)\s(.*)$/i, async (message, bot) => {

if(message.user.deados > getUnix()) return bot(`выгодных условий для инвестиций пока нет, ждём ${unixStampLefta(message.user.deados - Date.now())} ⏳`, { attachment: 'photo-182435125_457257361' });

message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(!Number(message.args[2])) return bot(`инвестируй своё БАБЛО и получай прибыль! 🤑

🏠 В строительство:
инвест дома [сумма]

⚙ В технологии:
инвест технологии [сумма]

⚗ В науку:
инвест наука [сумма]`);

message.args[2] = Math.floor(Number(message.args[2]));

if(message.args[2] < 100) return bot(`минимальная сумма инвестиции 100$ 🤑

💰 Баланс: ${utils.sp(message.user.balance)}$`);

const errors = utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`]);
if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы ${errors}

💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });

if(message.args[1] == `дома`){
	if(message.args[2] < 100000000000){
	var home = utils.pick([0.5, 0.75, 1.5, 2, 0.25, 0.25]);
	var mess = utils.pick([1, 2]);
	if(home < 1){
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`какой ужас! Ваш жилой комплекс был затоплен наводнением! 😲

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257353`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`строители накосячили и дом развалился! 😤

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257355`});
	}

	}else{
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы построили лучший комплекс жилых зданий в округе! 😋

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257354`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы построили ДОМА ДЛЯ МИЛЛИАРДЕРОВ! 😃

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257362`});
	}
	}
}else{
	var homes = utils.pick([0.5, 0.5, 0.75, 0.75, 1.5, 2, 0.25, 0.25]);
	var messs = utils.pick([1, 2]);
	if(homes < 1){
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`какой ужас! Ваш жилой комплекс был затоплен наводнением! 😲

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257353`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`строители накосячили и дом развалился! 😤

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257355`});
	}

	}else{
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы построили лучший комплекс жилых зданий в округе! 😋

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257354`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы построили ДОМА ДЛЯ МИЛЛИАРДЕРОВ! 😃

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257362`});
	}
	}
}
}

if(message.args[1] == `технологии`){
	if(message.args[2] < 100000000000){
	var home = utils.pick([0.5, 0.75, 1.5, 2, 0.25, 0.25]);
	var mess = utils.pick([1, 2]);
	if(home < 1){
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`у вашего робота в край ПОЕХАЛА КРЫША! 🙀

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257357`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали новую структуру асфальта и что-то пошло не так! 💩

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257363`});
	}

	}else{
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`весь мир поражен вашей компанией, создавший такой скачок в технологиях! 😊

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257356`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance +=Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали УМНЫЙ ДОМ! 🏡

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257364`});
	}
	}
}else{
	var homes = utils.pick([0.5, 0.5, 0.75, 0.75, 1.5, 2, 0.25, 0.25]);
	var messs = utils.pick([1, 2]);
	if(homes < 1){
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали новую структуру асфальта и что-то пошло не так! 💩

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257363`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`у вашего робота в край ПОЕХАЛА КРЫША! 🙀

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257357`});
	}

	}else{
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`весь мир поражен вашей компанией, создавший такой скачок в технологиях! 😊

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257356`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали УМНЫЙ ДОМ! 🏡

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257364`});
	}
	}
}
}

if(message.args[1] == `наука`){
	if(message.args[2] < 100000000000){
	var home = utils.pick([0.5, 0.75, 1.5, 2, 0.25, 0.25]);
	var mess = utils.pick([1, 2]);
	if(home < 1){
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы что наделали?! Тут даже фиксики не спасут! ☹

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257360`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`надо было учить химию! Взорвались все образцы! 💥😳

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * home))}$`, {attachment: `photo-182435125_457257359`});
	}

	}else{
	if(mess == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали новое лекарство! 💊

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257358`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * home);
	message.user.deados = getUnix() + 300000;
	return bot(`вашей компании удалось вырастить мясо, теперь в мире НЕТ ГОЛОДА! 🍼

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * home) - message.args[2]))}$`, {attachment: `photo-182435125_457257365`});
	}
	}
}else{
	var homes = utils.pick([0.5, 0.5, 0.75, 0.75, 1.5, 2, 0.25, 0.25]);
	var messs = utils.pick([1, 2]);
	if(homes < 1){
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы что наделали?! Тут даже фиксики не спасут! ☹

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257360`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`надо было учить химию! Взорвались все образцы! 💥😳

💰 Возвращено по страховке: ${utils.sp(Math.floor(message.args[2] * homes))}$`, {attachment: `photo-182435125_457257359`});
	}

	}else{
	if(messs == 1){
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вы создали новое лекарство! 💊

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257358`});
	}else{
	message.user.balance -= message.args[2];
	message.user.balance += Math.floor(message.args[2] * homes);
	message.user.deados = getUnix() + 300000;
	return bot(`вашей компании удалось вырастить мясо, теперь в мире НЕТ ГОЛОДА! 🍼

💰 Прибыль: ${utils.sp(Math.floor((message.args[2] * homes) - message.args[2]))}$`, {attachment: `photo-182435125_457257365`});
	}
	}
}
}

});

cmd.hear(/^(?:казино|азино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё|вб)/ig, message.user.balance);

	if(!Number(message.args[1])) return bot(`хочешь поднять БАБЛИЩА в казино?

🤑 Напиши: казино [ставка]
💯 Сыграть на все деньги: казино все`);

message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 99) return bot(`минимальная ставка 100$ 🤑`);
const phrase = utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`]);
const luckych = utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`]);

if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });

		if(message.user.hardcore == true){
		message.user.balance -= message.args[1];
		const multiplyhard = utils.pick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 2, 2, 2, 2, 2, 2, 5, 10]);
		message.user.balance += Math.floor(message.args[1] * multiplyhard);
		if (multiplyhard > 1)
		progressQuest(message.user, 3)
		else
		resetQuest(message.user, 3)
		return bot(`${multiplyhard === 0 ? `вы слили всю ставку (x${multiplyhard}) ❌` : `${multiplyhard === 1 ? `ваши деньги остаются при вас (x${multiplyhard}) ${luckych}` : `${multiplyhard < 1 ? `вы проиграли ${utils.sp(Math.floor(message.args[1] - message.args[1] * multiplyhard))}$ (x${multiplyhard}) ${phrase}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiplyhard))}$ (x${multiplyhard}) ${luckych}`}`}`}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(message.user.kavooo == true){
		message.user.balance -= message.args[1];
		const multiplypod = utils.pick([0.75, 0.75, 0.75, 0.75, 1, 1, 0.75, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 1, 2, 1, 5, 5, 5, 10, 10, 50]);
		message.user.balance += Math.floor(message.args[1] * multiplypod);
		if (multiplypod > 1)
		progressQuest(message.user, 3)
		else
		resetQuest(message.user, 3)
		return bot(`${multiplypod === 0 ? `вы слили всю ставку (x${multiplypod}) ❌` : `${multiplypod === 1 ? `ваши деньги остаются при вас (x${multiplypod}) ${luckych}` : `${multiplypod < 1 ? `вы проиграли ${utils.sp(Math.floor(message.args[1] - message.args[1] * multiplypod))}$ (x${multiplypod}) ${phrase}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiplypod))}$ (x${multiplypod}) ${luckych}`}`}`}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}else{
		if(message.args[1] < 7000000000){
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0, 0, 0, 0.25, 0.25, 0.25, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 2, 2, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0.75, 0.75, 5, 2, 2, 2, 2, 2, 0.75, 2, 2, 2, 2, 2, 2, 0.25, 0.25, 0.25, 0.25, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 0.25, 0.25, 1, 2, 1, 5, 5, 0.5, 5, 10, 10, 50]);
		message.user.balance += Math.floor(message.args[1] * multiply);
		if (multiply > 1)
		progressQuest(message.user, 3)
		else
		resetQuest(message.user, 3)
		return bot(`${multiply === 0 ? `вы слили всю ставку (x${multiply}) ❌` : `${multiply === 1 ? `ваши деньги остаются при вас (x${multiply}) ${luckych}` : `${multiply < 1 ? `вы проиграли ${utils.sp(Math.floor(message.args[1] - message.args[1] * multiply))}$ (x${multiply}) ${phrase}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}$ (x${multiply}) ${luckych}`}`}`}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(message.args[1] >= 7000000000){
		message.user.balance -= message.args[1];
		const multiplys = utils.pick([0, 0, 0, 0, 0.25, 0.25, 2, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0.75, 0.75, 5, 2, 2, 2, 0.75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0.25, 0.25, 1, 2, 1, 0.5]);
		message.user.balance += Math.floor(message.args[1] * multiplys);
		if (multiplys > 1)
		progressQuest(message.user, 3)
		else
		resetQuest(message.user, 3)
		return bot(`${multiplys === 0 ? `вы слили всю ставку (x${multiplys}) ❌` : `${multiplys === 1 ? `ваши деньги остаются при вас (x${multiplys}) ${luckych}` : `${multiplys < 1 ? `вы проиграли ${utils.sp(Math.floor(message.args[1] - message.args[1] * multiplys))}$ (x${multiplys}) ${phrase}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiplys))}$ (x${multiplys}) ${luckych}`}`}`}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}
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
    return bot(`держи:\n\n ${filter(anek)}\n\n🤤 >> Понравилось? Напиши команду «Анекдот» ещё раз!`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});

	}
});

cmd.hear(/^(?:поэма|поема)$/i, async (message, bot) => {
		let filter = (text) => {
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let poem = await getPoem();
    return bot(`держи:\n\n ${filter(poem)}\n\n🤤 >> Понравилось? Напиши команду «Поэма» ещё раз!`);

function getPoem() {
    return rq('https://www.anekdot.ru/random/aphorism/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});

	}
});

cmd.hear(/^(?:трейд|треид|треед)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
const errors = utils.pick(['😳', '😞',`😟`,`😫`,`😲`]); 
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return bot(`как заработать на трейдах?

💹 Необходимо предугадать в какую сторону пойдет график курса валют!

📈 Пойдёт вверх:
✏ трейд вверх [ставка]

📉 Пойдёт вниз:
✏ трейд вниз [ставка]`, {attachment: `photo-182435125_457257330`});

	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return bot(`как заработать на трейдах?

💹 Необходимо предугадать в какую сторону пойдет график курса валют!

📈 Пойдёт вверх:
✏ трейд вверх [ставка]

📉 Пойдёт вниз:
✏ трейд вниз [ставка]`, {attachment: `photo-182435125_457257330`});

	if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);

if(message.args[2] <= message.user.balance){
if(message.args[2] <= 1000000000000){
message.user.balance -= message.args[2];
const multiplysi = utils.pick([2, 2.1, 2.15]);
	if (message.args[1] == `вверх`) {
		const navisi = utils.pick([1, 2, 3, 4, 5, 6, 7]);
	
		if(navisi == 1){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 2){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 3){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 4){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 5){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 6){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navisi == 7){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}
	
	if (message.args[1] == `вниз`) {
		const naviv = utils.pick([1, 2, 3, 4, 5, 6, 7]);
		if(naviv == 1){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 2){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 3){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 4){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 5){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 6){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(naviv == 7){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplysi);
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplysi))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}
}

if(message.args[2] > 1000000000000){
message.user.balance -= message.args[2];
const multiplys = utils.pick([2, 2.1, 2.15]);
	if (message.args[1] == `вверх`) {
		const navis = utils.pick([1, 2, 3, 4]);
		if(navis == 1){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplys);
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplys))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navis == 2){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navis == 3){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navis == 4){
			resetQuest(message.user, 0)
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}
	
	if (message.args[1] == `вниз`) {
		const navi = utils.pick([1, 2, 3, 4]);
		if(navi == 1){
			progressQuest(message.user, 0)
			message.user.balance += Math.floor(message.args[2] * multiplys);
			return bot(`курс подешевел ⏬ на ${utils.random(100)}$
💶 Ваша прибыль: +${utils.sp(Math.floor(message.args[2] * multiplys))}$ ${success}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navi == 2){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navi == 3){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		if(navi == 4){
			resetQuest(message.user, 0)
			return bot(`курс подорожал ⏫ на ${utils.random(100)}$
💶 Вы потеряли: -${utils.sp(Math.floor(message.args[2]))}$ ${errors}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}
}
}
});

cmd.hear(/^(?:снять банк)\s(.*)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`использование: «банк снять [сумма]» ${luckych}`);
});

cmd.hear(/^(?:репорт|рипорт|pепорт|report)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	bot(`чтобы обратиться за помощью к администрации, напиши «Репорт [фраза]» ${luckych}`);
	return message.sendSticker(718);
});

cmd.hear(/^(?:инфа)$/i, async (message, bot) => {
	return bot(`скажи боту ИНФУ и я скажу ШАНС этого события! Всё абсолютная правда 🎯

Используй команду:
✏ инфа [фраза]

💡 Например:
инфа я выиграю в казино`);
});

cmd.hear(/^(?:бантайм)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`использование: «Бантайм [ID] [минуты]» ${luckych}`);
});

cmd.hear(/^(?:трейд вверх|трейд верх)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	return bot(`использование: «Трейд вверх [сумма]» ${success}`);
});

cmd.hear(/^(?:трейд вниз|трейд низ)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	return bot(`использование: «Трейд вниз [сумма]» ${success}`);
});

cmd.hear(/^(?:кубик1|кубик2|кубик3|кубик4|кубик5|кубик6)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	return bot(`использование: «Кубик [1-6]» ${success}`);
});

cmd.hear(/^(?:продать|🛍Продать|🛍 Продать)$/i, async (message, bot) => {
return bot(`использование: продать [предмет] 🤑`);
});

cmd.hear(/^(?:выбери)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`не можешь решить что выбрать?
Пусть за тебя решит БОТ! 💯

Напиши:
✏ выбери [фраза]

💡 Например:
выбери яблоко или апельсин`);
});

cmd.hear(/^(?:шар)$/i, async (message, bot) => {
	return bot(`спроси магический ШАР обо всём, и он даст тебе наставление!

Используй команду:
✏ шар [вопрос]

💡 Например:
шар вкладывать ли деньги в биткоин?`);
});

cmd.hear(/^(?:банк положить|положить банк)\s(.*)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`для вклада используйте: «Банк [сумма]» ${luckych}`);
});

cmd.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return bot(`как заработать на стаканчиках?

💸 Необходимо предугадать в каком стаканчике будет приз!

🥛 В первом:
✏ стаканчик 1 [ставка]

🥛 Во втором:
✏ стаканчик 2 [ставка]

🥛 В третьем:
✏ стаканчик 3 [ставка]`, {attachment:'photo-182435125_457257348'});

	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return bot(`как заработать на стаканчиках?

💸 Необходимо предугадать в каком стаканчике будет приз!

🥛 В первом:
✏ стаканчик 1 [ставка]

🥛 Во втором:
✏ стаканчик 2 [ставка]

🥛 В третьем:
✏ стаканчик 3 [ставка]`, {attachment:'photo-182435125_457257348'});

	if(message.args[2] > message.user.balance) return bot(`у вас нет данной суммы.
💰 Баланс: ${utils.sp(message.user.balance)}$`);

	if(message.args[2] <= message.user.balance){
		message.user.balance -= message.args[2];

		const multiply = utils.pick([2, 2.1, 2.2, 2.5]);
		const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`]);
		const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);

		if(message.args[1] == 1){
		if(message.args[2] >= 100000000000){
		let cupe = utils.pick([3, 2, 1, 2, 3]);

		if(cupe == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cupe} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		}
	}

		if(message.args[1] == 2){
		if(message.args[2] >= 100000000000){
		let cupes = utils.pick([3, 1, 2, 1, 3]);

		if(cupes == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cupes} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		}
	}

		if(message.args[1] == 3){
		if(message.args[2] >= 100000000000){
		let cupese = utils.pick([2, 1, 3, 1, 2]);

		if(cupese == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cupese} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}

		}
	}

	if(message.args[1] == 1){
		let cup = utils.pick([2, 1, 3, 2]);
		if(cup == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cup} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}

	if(message.args[1] == 2){
		let cupf = utils.pick([1, 2, 3, 3]);
		if(cupf == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cupf} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}

	if(message.args[1] == 3){
		let cupy = utils.pick([1, 3, 1, 2]);
		if(cupy == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${utils.sp(Math.floor(message.args[2] * multiply))}$ ${luckych}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cupy} стаканчик ${phrase}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
	}

}
});

cmd.hear(/^(?:продать биткоин|снять биткоин|снять биткойн|снять биткоен|продать биткойн|биткоин продать|биткойн продать|биткоен продать)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
	return bot(`использование: «Продать биткоин [сумма]» ${luckych}`);
});

cmd.hear(/^(?:продать биткоин|снять биткоин|снять биткойн|снять биткоен|продать биткойн|биткоин продать|биткойн продать|биткоен продать)\s(.*)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`]);
	return bot(`использование: «Продать биткоин [сумма]» ${luckych}`);
});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
let text = ``;
const luckych = utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`]);

	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] < 1 || message.args[1] > 2){ 
	if(message.user.lte2 == false){
	return bot(`команда: «Бизнес [1 или 2]»
🛒 Введите «Бизнесы» для покупки ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	}

	if(message.user.lte2 == true){
	return bot(`команда: «Бизнес [1 или 2]»
🛒 Введите «Бизнесы» для покупки ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	}

}

	if(message.user.business.length < message.args[1]){ 

	if(message.user.lte2 == false){
	return bot(`у вас нет этого бизнеса.
🛒 Введите «Бизнесы» для покупки ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	}

	if(message.user.lte2 == true){
	return bot(`у вас нет этого бизнеса.
🛒 Введите «Бизнесы» для покупки ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	}

}
	message.args[1]--;
	const biz = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1];
	
	if(message.user.business[message.args[1]].workers < biz.workers){
	text += `\n‼ У вас работает мало людей. Прибыль уменьшена в несколько раз. Введите «Бизнес нанять ${message.args[1]+1} [кол-во]» для найма!`;
	}

	if(message.user.business[message.args[1]].workers >= biz.workers){
	text += ``;
	}

	if(!message.isChat){
	if(message.user.lte2 == false){
	return bot(`статистика «${biz.name}»:
🤑 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
🔧 Рабочих: ${utils.sp(message.user.business[message.args[1]].workers)}/${utils.sp(biz.workers)}${text}
💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}$

${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "⏫ Доступно улучшение за " + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$" + ` (напиши "бизнес улучшить ${message.args[1]+1}") 🔥` : "") }`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"7\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"8\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
		},		
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
		}]
		]
			})
		});
	}

	if(message.user.lte2 == true){
	return bot(`статистика «${biz.name}»:
🤑 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
🔧 Рабочих: ${utils.sp(message.user.business[message.args[1]].workers)}/${utils.sp(biz.workers)}${text}
💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}$

${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "⏫ Доступно улучшение за " + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$" + ` (напиши "бизнес улучшить ${message.args[1]+1}") 🔥` : "") }`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
			}]
		]
			})
		});
	}

	}

	if(message.isChat){
	return bot(`статистика «${biz.name}»:
🤑 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * message.user.business[message.args[1]].workers))}$/час
🔧 Рабочих: ${utils.sp(message.user.business[message.args[1]].workers)}/${utils.sp(biz.workers)}${text}
💰 На счёте: ${utils.sp(message.user.business[message.args[1]].moneys)}$

${ (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] != null ? "⏫ Доступно улучшение за " + utils.sp(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost) + "$" + ` (напиши "бизнес улучшить ${message.args[1]+1}") 🔥` : "") }`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
});

cmd.hear(/^(?:бизнес|🤑 Бизнес|📚Бизнес|, 🤑 Бизнес|📚бизнес|💼 Бизнес|бизнес статистика|статистика бизнес)$/i, async (message, bot) => {
let text = ``;

if(message.user.business.length == []) return bot(`у вас нет ни одного бизнеса.
🛒 Введите «Бизнесы» для покупки.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "positive" 
		}]
		]
			})
		});

if(message.isChat){

	if(message.user.business.length != 0){
		for(var i = 0; i < message.user.business.length; i++)
		{
			text += `${i + 1}&#8419;` + ` ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon}${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
		}
	}

	return bot(`бизнесов в наличии: ${message.user.business.length}\n\nВведите «Бизнес [1-2]» для выбора одного из них:\n${text}

💸 Введите «Бизнес снять [1-2] всё» для снятия денег со счёта.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "primary"
			}]
		]
			})
		});
	}else{
	if(message.user.business.length != 0){
		for(var i = 0; i < message.user.business.length; i++)
		{
			text += `${i + 1}&#8419;` + ` ${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
		}
	}

	if(message.user.lte2 == false){
	return bot(`бизнесов в наличии: ${message.user.business.length}

Введите «Бизнес [1-2]» для выбора одного из них:
${text}

💸 Введите «Бизнес снять [1-2] всё» для снятия денег со счёта.`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

	if(message.user.lte2 == true){
	return bot(`бизнесов в наличии: ${message.user.business.length}

Введите «Бизнес [1-2]» для выбора одного из них:
${text}

💸 Введите «Бизнес снять [1-2] всё» для снятия денег со счёта.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "primary"
			}]
		]
			})
		});
	}
}

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

cmd.hear(/^(?:кто)/i, async (message, bot) => {
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	if(message.user.polnom < 2) return bot(`данная команда доступна с привилегии VIP и выше.`);
    let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: message.peerId
    });
    let profile = getRandomElement(profiles);
    return bot(
        getRandomElement(['это точно', 'я уверен, что это', 'твоя мама говорит, что это', 'думаю, что это', 'наверное, это', 'википедия говорит, что это', 'сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});

cmd.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: «Бизнес снять [1 или 2] [кол-во]»`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса!
🛒 Введите «Бизнесы» для покупки.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"161\"}",
				"label": "Бизнесы"
		},
			"color": "positive" 
		}]
		]
			})
		});
	message.args[1]--;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.business[message.args[1]].moneys);
	const errors = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
	const stick = utils.pick([`10021`,`5949`,`10398`,`15559`]);
	if(!message.isChat){
	if(message.user.lte2 == false){
	if(!Number(message.args[2])) return bot(`у вас нет денег на счёте этого бизнеса ${errors}`,
				{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
		},		
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
	}else{
	if(!Number(message.args[2])) return bot(`у вас нет денег на счёте этого бизнеса ${errors}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "positive" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "primary"
			}]
		]
			})
		});
	}

	}else{
	if(!Number(message.args[2])) return bot(`у вас нет денег на счёте этого бизнеса ${errors}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}

	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] <= 0) return bot(`вы не можете снять столько со счёта бизнеса`);
	if(!message.user.business) return bot(`у вас нет денег на счёте этого бизнеса!`);
	if(message.args[2] > message.user.business[message.args[1]].moneys) return bot(`у вас нет денег на счёте этого бизнеса ${errors}`);
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`]);

	if(message.user.polnom >= 2){

	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	if(!message.isChat){
	if(message.user.lte2 == false){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
			}]
		]
			})
		});
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}	
	}

	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}	
}

	if(message.user.polnom < 2){
	const prize = utils.pick([1, 2, 3]);
	if(prize === 1){
	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	if(!message.isChat){
	if(message.user.lte2 == false){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
		},	
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
		}]
		]
			})
		});
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}

	if(message.user.lte2 == true){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}

	}

	if(message.isChat){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
		}
	}

	if(prize === 2){
	message.user.balance += message.args[2];
	message.user.business[message.args[1]].moneys -= message.args[2];

	if(!message.isChat){
	if(message.user.lte2 == false){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
		},	
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
		}]
		]
			})
		});
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`);
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
	}

	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(message.args[2])}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
if(stick == 10021){
return message.sendSticker(10021); 
}

if(stick == 5949){
return message.sendSticker(5949); 
}

if(stick == 10398){
return message.sendSticker(10398); 
}

if(stick == 15559){
return message.sendSticker(15559); 
}
		}
	}

	if(prize === 3){
	const stickss = utils.pick([`7902`,`10009`,`13618`]);
	message.user.balance += Math.floor(message.args[2]/4);
	message.user.business[message.args[1]].moneys -= message.args[2];

	if(!message.isChat){
	if(message.user.lte2 == false){
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(Math.floor(message.args[2]/4))}$ ${luckych}

🚔 Вас посетила налоговая служба, пришлось отдать часть прибыли.

🤑 Купи ВИПКУ сейчас по огромной СКИДКЕ и получи много КРУТЫХ ВОЗМОЖНОСТЕЙ! 💯`,
		{
			attachment: ``,
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес 1"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес 2"
		},
			"color": "positive"
		},	
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"9\"}",
				"label": "🎒Назад"
		},
			"color": "primary"
		}]
		]
			})
		});
if(stickss == 7902){
return message.sendSticker(7902); 
}

if(stickss == 10009){
return message.sendSticker(10009); 
}

if(stickss == 13618){
return message.sendSticker(13618); 
}
	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(Math.floor(message.args[2]/4))}$ ${luckych}

🚔 Вас посетила налоговая служба, пришлось отдать часть прибыли.

🤑 Купи ВИПКУ сейчас по огромной СКИДКЕ и получи много КРУТЫХ ВОЗМОЖНОСТЕЙ! 💯`, {attachment: ``});
	
if(stickss == 7902){
return message.sendSticker(7902); 
}

if(stickss == 10009){
return message.sendSticker(10009); 
}

if(stickss == 13618){
return message.sendSticker(13618); 
}

	}

	}else{
	bot(`вы сняли со счёта своего бизнеса ${utils.sp(Math.floor(message.args[2]/4))}$ ${luckych}

🚔 Вас посетила налоговая служба, пришлось отдать часть прибыли.

🤑 Купи ВИПКУ сейчас по огромной СКИДКЕ и получи много КРУТЫХ ВОЗМОЖНОСТЕЙ! 💯`,
		{
			attachment: ``,
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
if(stickss == 7902){
return message.sendSticker(7902); 
}

if(stickss == 10009){
return message.sendSticker(10009); 
}

if(stickss == 13618){
return message.sendSticker(13618); 
}
		}
	}
}
});

cmd.hear(/^(?:бот|ауе|првнт|тест|хуест)$/i, async (message, bot) => {
const stick = utils.pick([`15136`,`11257`,`14837`,`11918`]);

if(message.user.polnom < 10){
if(stick == 15136){
	return message.sendSticker(15136);
}
if(stick == 11257){
	return message.sendSticker(11257);
}
if(stick == 14837){
	return message.sendSticker(14837);
}
if(stick == 11918){
	return message.sendSticker(11918);
}
}else{
var balance = 0;
users.map((x) => {
balance += x.balance;
});

var btc = 0;
users.map((x) => {
btc += x.btc;
});

var rating = 0;
users.map((x) => {
rating += x.rating;
});

var bank = 0;
users.map((x) => {
bank += x.bank;
});

return bot(`статистика бота:

👥 Всего игроков: ${users.length - 1}
💰 Деньги всех игроков: ${utils.sp(balance)}$
💳 Банк всех игроков: ${utils.sp(bank)}$
💽 Биткоины всех игроков: ${utils.sp(btc)}฿
👑 Рейтинг всех игроков: ${utils.sp(rating)} шт.`);
}
});

cmd.hear(/^(?:бизнес)\s(?:улучшить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте «Бизнес улучшить [1 или 2]»`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса
🛒 Введите «Бизнесы» для покупки`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	
	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения ${donatich}
💰 Баланс: ${utils.sp(message.user.balance)}$`,{ attachment: '' });

	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`]);
	if(message.user.lte2 == false){
	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}$ ${luckych}`);
	}

});

cmd.hear(/^(?:машина улучшить|🔧 Машина улучшить|🔧Машина улучшить|улучшить машина|улучшить машину|машину улучшить)$/i, async (message, bot) => {

	if(message.user.transport.car.length == []){

	return bot(`у вас нет машины.
❓Введите «Машины»`);

	}

	if(message.user.transport.car.length != 0){ 
	for(var i = 0; i < message.user.transport.car.length; i++){ 

	if(cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade] == null) return bot(`нет доступных улучшений для вашей машины`);
	}

	for(var i = 0; i < message.user.transport.car.length; i++){ 

	const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
	const cost = cars[message.user.transport.car[i].id - 1][message.user.transport.car[i].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения ${donatich}
	💰 Баланс: ${utils.sp(message.user.balance)}$`,{ attachment: '' });

	message.user.balance -= cost;
	message.user.transport.car[i].upgrade++;

	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`]);

	if(message.user.lte2 == false){
	return bot(`вы улучшили свою машину за ${utils.sp(cost)}$ ${luckych}`,
		{
			keyboard:JSON.stringify(
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🤑 Бизнес" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🦊 Питомцы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🎁 Бонус" 
		}, 
		"color": "negative" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "⚔ Топ кланы" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📚 Помощь" 
	}, 
	"color": "positive" 
		}] 
	] 
	}) 
	}); 
	}else{
	return bot(`вы улучшили свою машину за ${utils.sp(cost)}$ ${luckych}`);
	}

}
}

});

cmd.hear(/^(?:бизнес)\s(?:нанять)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
const phrase = utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`]);
const luckych = utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`]);
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(!Number(message.args[2])) return bot(`укажите число больше 0 ${luckych}`);
	if(message.args[2] <= 0) return bot(`укажите число больше чем 0 ${luckych}`);
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: «Бизнес нанять [1 или 2] [кол-во работников]» ${luckych}`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса ${phrase}
🛒 Введите «Бизнесы» для покупки ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнесы"
		},
			"color": "primary" 
		}]
		]
			})
		});
	message.args[1]--;

	if(message.user.business[message.args[1]].workers == businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers){

	return bot(`в данном бизнесе имеется максимальное количество работников 🔧`);

	}

	if(message.user.business[message.args[1]].workers + message.args[2] > businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers){
	
	const kolvo = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers - message.user.business[message.args[1]].workers;
	const costa = (businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers - message.user.business[message.args[1]].workers) * 1000;
	if(message.user.balance < costa) return bot(`у вас недостаточно денег для покупки рабочих ${phrase}`)
	message.user.balance -= costa;
	message.user.business[message.args[1]].workers += businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade - 1].workers - message.user.business[message.args[1]].workers;

	return bot(`вы наняли ${kolvo} рабочих для бизнеса #${message.args[1] + 1} за ${utils.sp(costa)}$ ${luckych}`);
	}

	const cost = message.args[2] * 1000;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для покупки рабочих ${phrase}`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].workers += message.args[2];

	return bot(`вы наняли ${message.args[2]} рабочих для бизнеса #${message.args[1] + 1} за ${utils.sp(message.args[2] * 1000)}$ ${luckych}`);

});	 

cmd.hear(/^(?:ферма|ферма снять|💽 Ферма|💽Ферма|, 💽 Ферма|🔋 Ферма|🔋Ферма|, 🔋 Ферма|,🔋 Ферма|ферма собрать)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет ферм!\n💽 Покупка по команде «Фермы»`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"86\"}",
				"label": "Фермы"
		},
			"color": "positive" 
		}]
		]
		})
	});
	if(message.user.premium > getUnix()) return bot(`на вашей ферме пусто, новые биткоины появятся через ${unixStampLeft(message.user.premium - Date.now())}🔎`);

	const btc_ = message.user.farm_btc * message.user.misc.farm_count;

	getUnix() + 3600000
	message.user.btc += btc_;
	message.user.farm_btc = 0;
	message.user.premium = getUnix() + 3600000;

if(message.user.misc.farm == 1){
	var photo = 457257336;
}
if(message.user.misc.farm == 2){
	var photo = 457257337;
}
if(message.user.misc.farm == 3){
	var photo = 457257338;
}
if(message.user.misc.farm == 4){
	var photo = 457257332;
}

return bot(`вы собрали ${utils.sp(btc_)}฿, следующие биткоины появятся через час 🔎

💽 Биткоинов: ${utils.sp(message.user.btc)}฿`, { attachment: `photo-182435125_${photo}` });

});

cmd.hear(/^(?:restart|рестарт)$/i, async (message, bot) => {
	if(message.senderId !== 301015165) return;
	await bot(`бот уходит в перезагрузку.`);

	await saveUsers();
	process.exit(-1);
});		

cmd.hear(/^(?:клан создать)\s(.*)$/i, async (message, bot) => {
const errors = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
    if(!message.args[1]) return bot(`введите название для клана! ${success}`); 
    let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(&#4448;|ᅠ|™|&#1;|أعلى||أحبك|�|�||�|™|�|&#0000;||�|™.|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|марихуана|Cuний кuт|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|█|▓|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|разбуди в 4:20|#|подкладки|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|сованикогданеспит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|синийкит|цп|cp|изнасилование|несовершеннолетние)/
    var sss = zapret.test(zaprets1)
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(zapret.test(zaprets1) === true || message.args[1].toLowerCase() === ''){
    return bot(`вы используете запрещенные слова/символы/смайлики 🆘\n\n😉 Придумайте другое название клану.`);
	}
	if(message.args[1].length >= 21){ return bot(`вы указали слишком длинное название ${errors}
❓Максимальная длина для названия клана 20 символов.`);
	}
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return bot(`подозрительная ссылка.`);
	}

 	let user = message.user;
 	let name = message.args[1];
 	let clanid = message.user.clanid;
 	if(clans[clanid]) return bot(`вы уже состоите в другом клане ⚠`);
 	if(message.user.balance < 100000000000) return bot(`создание клана стоит 100.000.000.000$!
📈 @botmendes (Как пополнить?)`);
 	message.user.balance -= 100000000000;
	Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
	}
 	if(!clans[clanid]){
 		let smile = [`🤘`,`💥`,`💣`,`😻`,`😏`,`🤒`,`🤔`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌝`].random()
 	 	botinfo.number += 1;
 	 	clans[botinfo.number] = {
 		owner: message.user,
 		users: {},
 		zashita: 0,
 		retin: 0,
 		aue: 0,
 		lox: 0,
 		topsk: 0,
 		pisko: 10,
 		fuflo: 0,
 		abramovich: 0,
 		good: 0,
 		number: botinfo.number,
 		name: name,
 		balance: 0,
 		smile: smile,
 		open: true,
 		price: 100,
        exs: 0,
        people: 1
 	}
 	user.clanid = botinfo.number;
 	clans[botinfo.number].users[message.user.uid] = {
        	        		level: 3,
         	        		names: message.user.tag,
        	        		vlozhil: 0,
        	        		don: 0,
        	        		volos: false,
        	        		idd: message.user.id,
        	        		uidd: message.user.uid
    }

return bot(`клан «${name}» успешно создан!

🆔 ID клана: ${botinfo.number}
🔥 Создатель клана: [id${message.user.id}|${message.user.tag}]
💸 Цена за вход: 100$

📚 Команды клана: кпомощь`,
		{
			attachment: `photo-182435125_457257383`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "💡 Помощь"
				},
			"color": "secondary"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Клан" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});
}
});

cmd.hear(/^(?:покинуть|❌ Покинуть|❌Покинуть|клан покинуть)$/i, async (message, bot) => {
const idclan = message.user.clanid;

	if(!idclan) return bot(`вы не состоите в каком-либо клане ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	if(clans[idclan].users[message.user.uid].level == 3) return bot(`создатель не может выйти из клана.`);

	clans[idclan].people -= 1;
	message.user.clanid = false;
	delete clans[idclan].users[message.user.uid];
	let user = users.find(x=> x.uid === clans[idclan].owner.uid);
	if(!user.mts2){
	vk.api.messages.send({ user_id: user.id, message: `❌ Игрок [id${message.user.id}|${message.user.tag}] покинул клан «${clans[idclan].name}»

▶ Введите «Оповещения выкл» для отключения всех клановых оповещений.`});
	}
    return bot(`вы добровольно покинули клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
});

cmd.hear(/^(?:коткрыть|клан открыть)/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(clans[clanid].open == true) return bot(`ваш клан уже открыт, цена за вход: ${utils.sp(clans[clanid].price)}$ 🤑`)
clans[clanid].open = true;
return bot(`вы открыли клан, цена за вход: ${utils.sp(clans[clanid].price)}$ 🤑`);
});

cmd.hear(/^(?:кзакрыть|клан закрыть)/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(clans[clanid].open == false) return bot(`ваш клан уже закрыт ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}

🤑 Открыть: клан открыть`);
clans[clanid].open = false;
return bot(`вы закрыли клан, набор участников больше не производится ❌`);
});

cmd.hear(/^(?:кцена|клан цена)\s(.*)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = Math.floor(Number(message.args[1]));
if(!Number(message.args[1])) return bot(`цена за вход: ${utils.sp(clans[clanid].price)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Установить новую цену: клан цена [цена]`);
if(message.args[1] <= 0) return bot(`цена за вход: ${utils.sp(clans[clanid].price)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Установить новую цену: клан цена [цена]`);
	if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана. ${errors}`);
    if(message.args[1] < 100) return bot(`цена для входа в клан не должна быть меньше 100$`);
    if(message.args[1] > 100000000000000) return bot(`цена для входа в клан не должна быть больше 100.000.000.000.000$`);
    clans[clanid].price = Number(message.args[1]);
    return bot(`вы установили новую цену за вход в клан: ${utils.sp(message.args[1])}$ 🤑`);
});

cmd.hear(/^(?:вступить|клан вступить|войти|клан войти|квступить)\s([0-9]+)$/i, async (message, bot) => {
let idclan = message.args[1];
let clanid = message.user.clanid;
	if(!clans[idclan]) return bot(`такого клана не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clanid == idclan) return bot(`вы состоите в этом клане ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	if(clans[clanid]) return bot(`вы состоите в другом клане ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[idclan].people >= 50) return bot(`в данном клане максимальное количество участников ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[idclan].open == false) return bot(`данный клан закрыт, в него нельзя войти ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(message.user.balance < clans[idclan].price) return bot(`вход в данный клан стоит ${utils.sp(clans[idclan].price)}$ ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`, { attachment: '' });
		message.user.balance -= Number(clans[idclan].price);
		message.user.clanid = Number(message.args[1]);
		if(!clans[idclan].users[message.user]){
			clans[idclan].users[message.user.uid] = {
			level: 0,
			names: message.user.tag,
			vlozhil: 0,
			don: 0,
			volos: false,
			idd: message.user.id,
			uidd: message.user.uid
			}
		}
		clans[idclan].people += 1;
		clans[idclan].balance += clans[idclan].price;
let user = users.find(x=> x.uid === clans[idclan].owner.uid);
if(!user.mts2){
	vk.api.messages.send({ user_id: user.id, message: `🗣 Игрок [id${message.user.id}|${message.user.tag}] вступил в клан «${clans[idclan].name}»

▶ Введите «Оповещения выкл» для отключения всех клановых оповещений.`});
}
	return bot(`вы вошли в клан «${clans[idclan].name}» за ${utils.sp(clans[idclan].price)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}\n\n📚 Команды клана: кпомощь`);
});

cmd.hear(/^(?:кназвание|клан название)\s([^]+)$/i, async (message, bot) => {

 	if(message.user.clanid == false) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
 	let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(&#4448;|ᅠ|أعلى|أحبك|&#1;||марихуана|�|�||�|™|�|&#0000;||�|™.|youtu.be|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|™|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|разбуди в 4:20|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█|▓|▒| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|синийкит|подкладки|таурин|спайс|насвай|мморфин|сованикогданеспит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
    var sss = zapret.test(zaprets1) 

if(zapret.test(zaprets1) == true || message.args[1].toLowerCase() === ''){
var check = true;
return bot(`вы используете запрещенные слова/символы.\n\n😉 Придумайте другое название для клана.`);
}
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)

	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return bot(`подозрительная ссылка 🆘`);
}
		let user = message.user;
		let clanid = user.clanid;
		if(clans[clanid].users[message.user.uid].level < 1) return bot(`вы не модератор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		if(clans[clanid].balance < 10000000000) return bot(`на балансе клана меньше 10.000.000.000$ ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
🛒 Изменение названия клану стоит 10.000.000.000$`);
		clans[clanid].balance -= 10000000000;
		clans[clanid].name = message.args[1];
		return bot(`вы успешно изменили название клану за 10.000.000.000$! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
});

cmd.hear(/^(?:топ кланы|топ кланов|клановый топ|клан топ|топ клан|⚔ Топ кланы|, ⚔ Топ кланы)$/i, async (message, bot) => { 

let text = ``; 
var top = [];

for (let i in clans){
top.push({
	id: i,
	owner: clans[i].owner,
	people: clans[i].people,
	retin: clans[i].retin,
	name: clans[i].name });
} 

	top.sort((a, b) => {
	return b.retin - a.retin;
	});

		for (let i = 0; i < 10; i++){

			if (top.length > i) {
			const pizda = top[i];

			text += `${i === 9 ? `\n&#128287;` : `\n${i + 1}&#8419;`} [${pizda.people}/50] [id${pizda.owner.id}|${pizda.name}] — ${utils.sp(pizda.retin)} 👑`;
		}
	}
	
return bot(`лучшие кланы:

${text}

💡 Рейтинг клана складывается из побед и поражений.`, {attachment: 'photo-182435125_457257381'});
});

cmd.hear(/^(?:клан состав|клан участники|клан у|состав клан|клановый состав|состав клана)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
let text = ``;

 	for(let id in clans[clanid].users) {
		let people = clans[clanid].users[id];
		if(clans[clanid].users[id].level == 3) text += `[🔥] >> [id${clans[clanid].users[id].idd}|${clans[clanid].users[id].names}] | Вложено: ${utils.sp(clans[clanid].users[id].vlozhil)}$ | Создатель.\n\n`;   
		if(clans[clanid].users[id].level == 2) text += `[ID: ${clans[clanid].users[id].uidd}] >> [id${clans[clanid].users[id].idd}|${clans[clanid].users[id].names}] | Вложено: ${utils.sp(clans[clanid].users[id].vlozhil)}$ | Администратор.\n\n`;
		if(clans[clanid].users[id].level == 1) text += `[ID: ${clans[clanid].users[id].uidd}] >> [id${clans[clanid].users[id].idd}|${clans[clanid].users[id].names}] | Вложено: ${utils.sp(clans[clanid].users[id].vlozhil)}$ | Модератор.\n\n`;
		if(clans[clanid].users[id].level == 0) text += `[ID: ${clans[clanid].users[id].uidd}] >> [id${clans[clanid].users[id].idd}|${clans[clanid].users[id].names}] | Вложено: ${utils.sp(clans[clanid].users[id].vlozhil)}$ | Участник.\n\n`;
	}
    return bot(`участники клана «${clans[clanid].name}» [${clans[clanid].people}/50]:

${text}`);
});

cmd.hear(/^(?:клан|⚔ Клан|⚔Клан|мой клан)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clanid) return bot(`вы не состоите в клане.
Введите «клан помощь» для просмотра информации 🔔`); 

let shit = ``;
let zel = ``;
let minus = ``;
if(clans[clanid].abramovich > getUnix()) shit = `\n🏹 Действие щита: ${unixStampLeft(clans[clanid].abramovich - Date.now())}`;
if(clans[clanid].aue > getUnix()) zel = `\n🍹 Зелье: ${unixStampLeft(clans[clanid].aue - Date.now())}`;
if(clans[clanid].retin < 0) minus = `-`;

return bot(`просмотр клана «${clans[clanid].name}»:

🆔 ID клана: ${clans[clanid].number}
💰 Баланс клана: ${utils.sp(clans[clanid].balance)}$
👑 Рейтинг клана: ${minus}${utils.sp(clans[clanid].retin)}
${clans[clanid].open == true ? '🔓' : '🔒'} Тип клана: ${clans[clanid].open == true ? 'открытый' : 'закрытый'}

⚔ Армия: ${utils.sp(clans[clanid].zashita)}${shit}
🔥 Побед: ${utils.sp(clans[clanid].good)}, поражений: ${utils.sp(clans[clanid].fuflo)} 
💸 Цена за вход: ${utils.sp(clans[clanid].price)}$${zel}
👥 Участники: ${clans[clanid].people}/50`); 
});

cmd.hear(/^(?:ккик|изгнать|исключить|клан кик)\s([0-9]+)$/i, async (message, bot) => {
let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	if(clans[clanid].users[message.user.uid].level < 1) return bot(`вы не создатель/администратор/модератор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(clans[clanid].users[message.user.uid].level == 3){
		if(!user) return bot(`такого игрока не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		if(clans[clanid].users[user.uid].level == 3) return bot(`нельзя изгнать создателя из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
❌ Удаление клана: клан удалить`);
		if(user.uid == message.user.uid) return bot(`вы не можете кикнуть себя ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

		vk.api.messages.send({ user_id: user.id, message: 
		`${user.tag}, вас изгнали из клана «${clans[message.user.clanid].name}» ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`});

		delete clans[clanid].users[user.uid];
		clans[clanid].people -= 1;
		user.clanid = false;

		return bot(`вы изгнали игрока [id${user.id}|${user.tag}] из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	}

	if(clans[clanid].users[message.user.uid].level == 2){
	if(clans[clanid].users[user.uid].level == 2) return bot(`нельзя изгнать админа из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].users[user.uid].level == 3) return bot(`нельзя изгнать создателя из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

		if(!user) return bot(`такого игрока не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		if(user.uid == message.user.uid) return bot(`вы не можете кикнуть себя ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		
		vk.api.messages.send({ user_id: user.id, message: 
		`${user.tag}, вас изгнали из клана «${clans[message.user.clanid].name}» ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`});

		delete clans[clanid].users[user.uid];
		clans[clanid].people -= 1;
		user.clanid = false;

		return bot(`вы изгнали игрока [id${user.id}|${user.tag}] из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	}

	if(clans[clanid].users[message.user.uid].level == 1){
	if(clans[clanid].users[user.uid].level == 1) return bot(`нельзя изгнать модератора из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].users[user.uid].level == 2) return bot(`нельзя изгнать админа из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].users[user.uid].level == 3) return bot(`нельзя изгнать создателя из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

		if(!user) return bot(`такого игрока не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		if(user.uid == message.user.uid) return bot(`вы не можете кикнуть себя ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
		
		vk.api.messages.send({ user_id: user.id, message: 
		`${user.tag}, вас изгнали из клана «${clans[message.user.clanid].name}» ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`});

		delete clans[clanid].users[user.uid];
		clans[clanid].people -= 1;
		user.clanid = false;

		return bot(`вы изгнали игрока [id${user.id}|${user.tag}] из клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	}
});

cmd.hear(/^(?:клан магазин|магазин клана|клановый магазин)$/i, async (message, bot) => {

return bot(`магазин:

1⃣ Армия (100 единиц) — 3.000.000.000$
🛒 Купить: армия [кол-во]

2⃣ Щит на сутки — 150.000.000.000$
🛒 Купить: купить щит

3⃣ Зелье силы (10 мин) — 10.000.000.000$
🛒 Купить: купить зелье

❌ Щит пропадает при атаке на любой клан.`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🛡 Щит"
				},
			"color": "secondary"
			},
			{
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🍹 Зелье" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});

});

cmd.hear(/^(?:купить зелье|зелье купить|🍹 Зелье)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].balance < 10000000000) return bot(`на балансе вашего клана меньше 10.000.000.000$ ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	let id = message.user.uid;
	if(clans[clanid].users[id].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].aue > getUnix()) return bot(`у вашего клана уже имеется зелье силы, оно закончится через ${unixStampLefta(clans[clanid].aue - Date.now())} 🍹`);
	
	clans[clanid].balance -= 10000000000;
	clans[clanid].aue = getUnix() + 600000;
	bot(`вы успешно выпили клановое "Зелье силы" за 10.000.000.000$ 🍹

⚔ Команда для атаки босса: атака`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "⚔ Атака"
		},
			"color": "negative"
		}]
		]
			})
		});
	return message.sendSticker(6069);
});

cmd.hear(/^(?:🐵 Босс|босс|☠ Босс)$/i, async (message, bot) => {
	return bot(`нанеси финальный удар боссу и сорви куш! 🤑

🎯 Прошлый победитель: [id${botinfo.final}|${botinfo.cfinal}]
☠ Босс: ${botinfo.name}
❤ Здоровье: ${utils.sp(botinfo.xp)}/10.000
🏹 Чтобы атаковать, пиши «босс атака»`,
		{
			attachment: `${botinfo.att}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "🍹 Зелье"
				},
			"color": "positive"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Атака" 
				}, 
				"color": "negative" 
				
				}], 
			]
		})
		});
});

cmd.hear(/^(?:⚔ Атака|атака|босс атака)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].lox > getUnix()) return bot(`ваша армия слишком устала 😩

⌚ Атаковать босса можно через ${unixStampLefta(clans[clanid].lox - Date.now())}`);
	if(clans[clanid].zashita < 110) return bot(`для атаки требуется минимум 110 армии, армии в вашем клане: ${clans[clanid].zashita} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "армия 100"
		},
			"color": "positive"
		}]
		]
			})
		});
	let arm = utils.random(70, 110);
	clans[clanid].zashita -= arm;
	clans[clanid].pisko -= 1;
	if(clans[clanid].pisko < 1){
		clans[clanid].pisko = 10;
		clans[clanid].lox = getUnix() + 60000;
	}
	let prize = utils.random(1, 10);
	if(clans[clanid].aue > getUnix()){
		var damage = utils.random(20, 30);
	}else{
		var damage = utils.random(10, 20);
	}

	if(prize == 1 || prize == 3 || prize == 4 || prize == 5 || prize == 6 || prize == 7 || prize == 8){
		botinfo.xp -= damage;
		if(botinfo.xp <= 0){
			let cash = utils.random(1000000000000, 1500000000000);
			clans[clanid].balance += cash;
			let ret = utils.random(10, 15);
			clans[clanid].retin += ret;
			clans[clanid].good += 1;
			botinfo.cfinal = clans[clanid].name;
			botinfo.final = message.user.id;
			botinfo.cash = cash;
			botinfo.xp = 10000;
			bot(`поздравляем, вы нанесли ФИНАЛЬНЫЙ УДАР боссу! 🔥

👑 Выбито: ${ret} рейтингов
🤑 Получено: ${utils.sp(cash)}$

📚 Введите «босс» для просмотра информации.`, {attachment: `photo-182435125_457257384`})
			return message.sendSticker(726);
		}
		return bot(`вы нанесли удар боссу, -${damage} XP!
❤ Здоровье: ${utils.sp(botinfo.xp)}/10.000`,
		{
			attachment: `${botinfo.att}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "☠ Босс"
				},
			"color": "negative"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Атака" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});
	}

	if(prize == 2){
		botinfo.xp -= damage;
		if(botinfo.xp <= 0){
			let cash = utils.random(1000000000000, 1500000000000);
			clans[clanid].balance += cash;
			let ret = utils.random(10, 15);
			clans[clanid].retin += ret;
			clans[clanid].good += 1;
			botinfo.cfinal = clans[clanid].name;
			botinfo.final = message.user.id;
			botinfo.cash = cash;
			botinfo.xp = 10000;
			bot(`поздравляем, вы нанесли ФИНАЛЬНЫЙ УДАР боссу! 🔥

👑 Выбито: ${ret} рейтингов
🤑 Получено: ${utils.sp(cash)}$

📚 Введите «босс» для просмотра информации.`, {attachment: `photo-182435125_457257384`})
			return message.sendSticker(726);
		}
		let rating = utils.random(1, 2);
		clans[clanid].retin += rating;
		return bot(`вы нанесли удар боссу, -${damage} XP!
🔥 Вам крупно повезло! +${rating} 👑 рейтинг клана!
❤ Здоровье: ${utils.sp(botinfo.xp)}/10.000`,
		{
			attachment: `${botinfo.att}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "☠ Босс"
				},
			"color": "negative"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Атака" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});
	}

	if(prize == 9){
		botinfo.xp -= (3 * damage);
		if(botinfo.xp <= 0){
			let cash = utils.random(1000000000000, 1500000000000);
			clans[clanid].balance += cash;
			let ret = utils.random(10, 15);
			clans[clanid].retin += ret;
			clans[clanid].good += 1;
			botinfo.cfinal = clans[clanid].name;
			botinfo.final = message.user.id;
			botinfo.cash = cash;
			botinfo.xp = 10000;
			bot(`поздравляем, вы нанесли ФИНАЛЬНЫЙ УДАР боссу! 🔥

👑 Выбито: ${ret} рейтингов
🤑 Получено: ${utils.sp(cash)}$

📚 Введите «босс» для просмотра информации.`, {attachment: `photo-182435125_457257384`})
			return message.sendSticker(726);
		}
		return bot(`вы нанесли КРИТИЧЕСКИЙ УДАР боссу, -${3 * damage} XP!
❤ Здоровье: ${utils.sp(botinfo.xp)}/10.000`,
		{
			attachment: `${botinfo.att}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "☠ Босс"
				},
			"color": "negative"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Атака" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});
	}

	if(prize == 10){
		return bot(`${utils.pick([`босс выпил зелье неуязвимости, вы не смогли ударить его!`,`пока вы целились в босса, он увернулся!`])} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`,
		{
			attachment: `${botinfo.att}`,
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "☠ Босс"
				},
			"color": "negative"
			},
			{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "⚔ Атака" 
				}, 
				"color": "positive" 
				
				}], 
			]
		})
		});
	}
});

cmd.hear(/^(?:купить щит|🛡 Щит)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].balance < 150000000000) return bot(`на балансе вашего клана меньше 150.000.000.000$`);
	let id = message.user.uid;
	if(clans[clanid].users[id].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].abramovich > getUnix()) return bot(`у вашего клана уже имеется щит, он закончится через ${unixStampLeft(clans[clanid].abramovich - Date.now())} ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	
	clans[clanid].balance -= 150000000000;
	clans[clanid].abramovich = getUnix() + 86400000;
	return bot(`вы купили щит на 24 часа для клана ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

❌ Щит пропадает при любой атаке с вашей стороны.`); 
});

cmd.hear(/^(?:клан помощь|клан помошь|клан помош|«клан помощь»|клан помощ)$/i, async (message, bot) => {
	return bot(`команды для клана:

🏹 Мой клан:
⠀⠀🔥 Клан
⠀⠀💰 Казна
⠀⠀⚔ Атаковать
⠀⠀💸 Клан цена
⠀⠀✒ Клан название
⠀⠀🛍 Клан магазин
⠀⠀🔓 Клан открыть/Клан закрыть
⠀⠀❌ Клан удалить

☠ Босс
⚔ Топ клан
📚 Кпомощь
🏹 Клан создать
🔔 Оповещения [вкл/выкл]

👤 Участники:
⠀⠀👥 Клан состав
⠀⠀🚪 Клан вступить
⠀⠀🗣 Пригласить
⠀⠀⏫ Повысить/Понизить
⠀⠀🏃‍♂ Клан кик
⠀⠀❌ Покинуть

🅰 Админ в клане может приглашать и исключать игроков, изменять клан, проводить атаки.

📜 Модератор в клане может изменять название, исключать игроков.`);
});

cmd.hear(/^(?:кпомощь|кпомошь|кпомош|помощь клан|команды клана|клан команды|💡 Помощь)/i, async (message, bot) => {
 	let clanid = message.user.clanid;
 	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
 	let id = message.user.uid;
if(clans[clanid].users[id].level < 1){
	return bot(`клановые команды:

🔥 Клан — ваш клан
☠ Босс — атаковать босса
👥 Клан состав — состав клана
💸 Казна — пополнить казну
⚔ Топ клан — топ кланов

❌ Покинуть — выход из клана`);
}

if(clans[clanid].users[id].level == 1){
	return bot(`клановые команды: 

🔥 Клан — ваш клан 
☠ Босс — атаковать босса
👥 Клан состав — состав клана 
💸 Казна — пополнить казну 
✒ Клан название — название клана
🏃‍♂ Клан кик — изгнать соклана
⚔ Топ клан — топ кланов 

❌ Покинуть — выход из клана`);
}

if(clans[clanid].users[id].level == 2){
	return bot(`клановые команды:

🔥 Клан — ваш клан
☠ Босс — атаковать босса
👥 Клан состав — состав клана
💸 Казна — пополнить казну
✒ Клан название — название клана
🏃‍♂ Клан кик — изгнать соклана
⏫ Повысить/Понизить
🔓 Клан открыть/Клан закрыть
🛍 Клан магазин
🗣 Пригласить — пригласить игрока
🤑 Клан цена — цена за вход
💪🏻 Атаковать — война
⚔ Топ клан — топ кланов

❌ Покинуть — выход из клана`);
}

if(clans[clanid].users[id].level == 3){
	return bot(`клановые команды:

🔥 Клан — ваш клан
☠ Босс — атаковать босса
👥 Клан состав — состав клана
💸 Казна — пополнить казну
✒ Клан название — название клана
🏃‍♂ Клан кик — изгнать соклана
⏫ Повысить/Понизить
🔓 Клан открыть/Клан закрыть
🛍 Клан магазин
🗣 Пригласить — пригласить игрока
🤑 Клан цена — цена за вход
💪🏻 Атаковать — война
⚔ Топ клан — топ кланов

❌ Удалить клан — удаление клана`);
}
});

cmd.hear(/^(?:кбанк|кбаланс|казна|клан казна|кказна|баланс клана|клан положить|кположить)$/i, async (message, bot) => {
 	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	return bot(`баланс вашего клана: ${utils.sp(clans[clanid].balance)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Пополнить: казна [сумма]`);
});

cmd.hear(/^(?:кположить|казна|клан казна|казна клан|клан положить|клан банк|банк клан|клан пополнить)\s(.*)$/i, async (message, bot) => {	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	if(!Number(message.args[1])) return bot(`баланс вашего клана: ${utils.sp(clans[clanid].balance)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Пополнить: казна [сумма]`);
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] > message.user.balance) return bot(`вклад не может превышать ваш баланс ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	if(message.args[1] <= 0) return bot(`баланс вашего клана: ${utils.sp(clans[clanid].balance)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Пополнить: казна [сумма]`);
	
	let id = message.user.uid;
	message.user.balance -= message.args[1];
	clans[clanid].balance += message.args[1];
	clans[clanid].users[id].vlozhil += message.args[1];
	return bot(`вы успешно положили ${utils.sp(message.args[1])}$ в банк клана ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
});

cmd.hear(/^(?:клан удалить|кудалить)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	if(clans[clanid].users[message.user.uid].level < 3) return bot(`вы не создатель клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].people > 1) return bot(`в клане имеются люди, сначала исключите их всех ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].topsk < getUnix()){ 
		clans[clanid].topsk = getUnix() + 600000;
		return bot(`вы уверены в удалении клана? 🤔

❌ Введите для удаления: клан удалить`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{}",
				"label": "клан удалить"
		},
			"color": "negative" 
		}]
		]
			})
		});
	}
	delete clans[clanid];
	message.user.clanid = false;
	return bot(`вы удалили свой клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
});

cmd.hear(/^(?:армия|армии)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	return bot(`армии в вашем клане: ${utils.sp(clans[clanid].zashita)} ⚔

🛍 Купить: армия [кол-во]
🛒 Магазин: клан магазин`);
});

cmd.hear(/^(?:армия|армии|клан армия|купить армию|армию|единица армии)\s(.*)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = Math.floor(Number(message.args[1]));
	let id = message.user.uid;
	let pay = 30000000;
	if(clans[clanid].users[id].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clans[clanid].balance < 3000000000) return bot(`на балансе вашего клана меньше 3.000.000.000$ ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(message.args[1] < 100) return bot(`покупка армии идёт от 100 единиц! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
🛍 Пример: армия 100`);
	if(!Number(message.args[1])) return bot(`армии в вашем клане: ${utils.sp(clans[clanid].zashita)} ⚔

🛍 Купить: армия [кол-во]
🛒 Магазин: клан магазин`);
	if(message.args[1] <= 0) return bot(`армии в вашем клане: ${utils.sp(clans[clanid].zashita)} ⚔

🛍 Купить: армия [кол-во]
🛒 Магазин: клан магазин`);

	if((message.args[1] * pay) > clans[clanid].balance){
	var armich = Math.floor(clans[clanid].balance / 30000000);
return bot(`баланса вашего клана хватает на покупку ${utils.sp(armich)} единиц армии ⚔`);
	}else{
	var stick = utils.pick([5227, 15161]);
	clans[clanid].balance -= (message.args[1] * pay);
	clans[clanid].zashita += message.args[1];

bot(`вы купили ${utils.sp(message.args[1])} единиц армии за ${utils.sp(message.args[1] * pay)}$ ⚔

💰 Баланс клана: ${utils.sp(clans[clanid].balance)}$`);
if(stick == 5227){
	message.sendSticker(5227);
}
if(stick == 15161){
	message.sendSticker(15161);
}
	}
});

cmd.hear(/^(?:пригласить|кпригласить|клан пригласить)\s([0-9]+)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(message.user.clanid == false) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
if(clans[clanid].users[message.user.uid].level < 2) return bot(`в клан могут приглашать только создатель и администратор ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
if(message.user.lol > getUnix()) return bot(`вы сможете пригласить еще одного человека в клан через ${unixStampLeft(message.user.lol - Date.now())} ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`данного игрока не существует.`);
	let clanidi = user.clanid;
	if(clans[clanidi]) return bot(`данный игрок уже состоит в другом клане.`);
	await bot(`вы успешно пригласили игрока [id${user.id}|${user.tag}] в клан! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	getUnix() + 3600000
	message.user.lol = getUnix() + 3600000;
	vk.api.messages.send({ user_id: user.id, message: `✉ Игрок [id${message.user.id}|${message.user.tag}] пригласил Вас в клан «${clans[message.user.clanid].name}»! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}
Для вступления введите «Вступить ${message.user.clanid}» (без кавычек)` });
});

cmd.hear(/^(?:раздатьстарт)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, ''); 
message.args[1] = message.args[1].replace(/(к|k)/ig, '000'); 
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000'); 

if(message.senderId !== 554081711| message.senderId !== 554081711) return; 
if(!Number(message.args[1])) return; 
message.args[1] = Math.floor(Number(message.args[1])); 

if(message.args[1] <= 0) return; 
 {
users.forEach(u => u.balance += message.args[1]);

await bot(`вы раздали всем по ${utils.sp(message.args[1])}$`); 
	}
});

cmd.hear(/^(?:повысить|клан повысить|кповысить)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	return bot(`использование: повысить [ID игрока]

🅰 Админ в клане может приглашать и исключать игроков, изменять клан, проводить атаки.
📜 Модератор в клане может изменять название, исключать игроков.`);
});

cmd.hear(/^(?:повысить|клан повысить|кповысить)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.clanid == false) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`такого игрока не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(user.uid === message.user.uid) return bot(`неверный ID ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

 	let clanid = user.clanid;
 	let clanidi = message.user.clanid;
 	if(clans[clanidi].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clanid !== clanidi) return bot(`этот человек не состоит в клане ${utils.pick([`😳`, `😒`, `😟`, `🙄`, `🤔`])}`);
 	if(clans[clanid].users[user.uid].level == 2) return bot(`данный игрок имеет максимальный статус в клане.`);
	if(clans[clanid].users[user.uid].level == 3) return bot(`данный игрок является создателем клана.`);
	
	if(clans[clanid].users[user.uid].level < 1){ 
		clans[clanid].users[user.uid].level = 1;
await bot(`игрок [id${user.id}|${user.tag}] был назначен модератором в клане ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`); 
vk.api.messages.send({ user_id: user.id, message: `▶ Вас назначили модератором в клане «${clans[message.user.clanid].name}» ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`});
	}else{
		if(clans[clanidi].users[message.user.uid].level < 3) return bot(`до уровня "админ" может повысить только создатель клана ${utils.pick([`😳`, `😒`, `😟`, `🙄`, `🤔`])}`);
		clans[clanid].users[user.uid].level = 2;
await bot(`игрок [id${user.id}|${user.tag}] был назначен администратором в клане ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`); 
vk.api.messages.send({ user_id: user.id, message: `▶ Вас назначили администратором в клане «${clans[message.user.clanid].name}» ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`});
	}
});

cmd.hear(/^(?:понизить|клан понизить|кпонизить)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	return bot(`использование: понизить [ID игрока]

🅰 Админ в клане может приглашать и исключать игроков, изменять клан, проводить атаки.
📜 Модератор в клане может изменять название, исключать игроков.`);
});

cmd.hear(/^(?:понизить|клан понизить|кпонизить)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.clanid == false) return bot(`у вас нет клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`); 
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`такого игрока не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(user.uid === message.user.uid) return bot(`неверный ID ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

 	let clanid = user.clanid;
 	let clanidi = message.user.clanid;
	if(clans[clanidi].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);
	if(clanid !== clanidi) return bot(`этот человек не состоит в клане ${utils.pick([`😳`, `😒`, `😟`, `🙄`, `🤔`])}`);
	if(clans[clanid].users[user.uid].level == 3) return bot(`данный игрок является создателем в клане.`);
	if(clans[clanid].users[user.uid].level < 1) return bot(`данный игрок является участником в клане.`);

	if(clans[clanid].users[user.uid].level == 1){ 
		clans[clanid].users[user.uid].level = 0;
await bot(`игрок [id${user.id}|${user.tag}] был понижен до прав участника в клане ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`); 
vk.api.messages.send({ user_id: user.id, message: `▶ Вас понизили до прав участника в клане «${clans[message.user.clanid].name}» ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`});
	}else{
	if(clans[clanidi].users[message.user.uid].level < 3) return bot(`до уровня "модератор" может понизить только создатель клана ${utils.pick([`😳`, `😒`, `😟`, `🙄`, `🤔`])}`);
		clans[clanid].users[user.uid].level = 1;
await bot(`игрок [id${user.id}|${user.tag}] был понижен до прав модератора в клане ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`); 
vk.api.messages.send({ user_id: user.id, message: `▶ Вас понизили до прав модератора в клане «${clans[message.user.clanid].name}» ${utils.pick([`🤤`, `☺`, `🙂`, `😁`, `😏`, `🤑`])}`});
		}
});

cmd.hear(/^(?:рандом атака|война|⚔ Атаковать|атака рандом|атаковать|клан атака|атака клан)$/i, async (message, bot) => {
var clanid = message.user.clanid;
if(!clanid) return bot(`вы не состоите в клане.
Информация по командам: «клан помощь» 🔔`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "клан помощь"
		},
			"color": "positive" 
		}]
		]
			})
		});

if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель/администратор клана ❌`);
if(clans[clanid].balance < 10000000000) return bot(`на балансе вашего клана меньше 10.000.000.000$ ❌`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Казна 10ккк"
		},
			"color": "positive" 
		}]
		]
			})
		});

if(clans[clanid].zashita < 100) return bot(`для проведения атак требуется минимум 100 армии в вашем клане ❌`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Армия 100"
		},
			"color": "positive" 
		}]
		]
			})
		});

if(clans[clanid].exs > getUnix()) return bot(`ваша армия слишком устала 😩

⌚ Новую атаку можно начать через ${unixStampLefta(clans[clanid].exs - Date.now())}`);

const randclan = utils.random(1, botinfo.number);
if(!clans[randclan]) return bot(`подходящего клана не найдено, попробуйте снова ✅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "⚔ Атаковать"
		},
			"color": "negative" 
		}]
		]
			})
		});

if(clans[randclan].abramovich > getUnix()) return bot(`подходящего клана не найдено, попробуйте снова ✅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "⚔ Атаковать"
		},
			"color": "negative" 
		}]
		]
			})
		});

		let user = users.find(x=> x.uid === clans[randclan].owner.uid);
		let text = ``;
		if(clans[clanid].abramovich > getUnix()) text = `\n\n❌ С вашего клана снят щит.`;
		if(clans[randclan].balance < 10000000000){
			var klmoney = utils.random(100000000, 10000000000);
			if(clans[clanid].zashita == clans[randclan].zashita){
				return bot(`подходящего клана не найдено, попробуйте снова ✅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "⚔ Атаковать"
		},
			"color": "negative" 
		}]
		]
			})
		});
			}

	setTimeout(async () => {
	message.send(`⚔ [id${message.user.id}|${message.user.tag}], армия отдохнула и готова к бою!`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "⚔ Атаковать"
}, 
"color": "negative" 
		}] 
] 
}) 
});
	}, 300001);

			if(clans[clanid].zashita < clans[randclan].zashita){

			clans[clanid].abramovich = 5;
			clans[clanid].exs = getUnix() + 300000;

			clans[randclan].good += 1;
			clans[randclan].retin += 1;	
			clans[randclan].balance += klmoney;

			clans[clanid].retin -= 1;
			clans[clanid].fuflo += 1;	

			resul = Math.floor(clans[clanid].zashita * 0.10);
			clans[clanid].zashita = Math.floor(clans[clanid].zashita * 0.90);

			resulk = Math.floor(resul * 0.5);
			clans[randclan].zashita -= resulk;
			var stick = utils.pick([3134, 10000]);

			bot(`ваш клан потерпел поражение перед «${clans[randclan].name}», вы потеряли ${utils.sp(resul)} армии ❌${text}`);
			if(stick == 3134){
			message.sendSticker(3134);
			}
			if(stick == 10000){
			message.sendSticker(10000);
			}
			if(!user.mts2){
			vk.api.messages.send({ user_id: user.id, message: `⚔ Ваш клан одержал победу перед «${clans[clanid].name}», вы потеряли ${utils.sp(resulk)} армии, украдено: ${utils.sp(klmoney)}$ ✅

🔔 Отписаться от оповещений: «оповещения выкл»`});
}
			}else{

			clans[clanid].abramovich = 5;
			clans[clanid].exs = getUnix() + 300000;

			clans[clanid].good += 1;
			clans[clanid].retin += 1;
			clans[clanid].balance += klmoney;

			clans[randclan].retin -= 1;
			clans[randclan].fuflo += 1;	

			resulkk = Math.floor(clans[randclan].zashita * 0.10);
			clans[randclan].zashita = Math.floor(clans[randclan].zashita * 0.90);

			resulkkk = Math.floor(resulkk * 0.5);
			clans[clanid].zashita -= resulkkk;
			var stick = utils.pick([712, 5949]);

			bot(`ваш клан одержал победу перед «${clans[randclan].name}», вы потеряли ${utils.sp(resulkkk)} армии, украдено: ${utils.sp(klmoney)}$ ✅${text}`);
			if(stick == 712){
			message.sendSticker(712);
			}
			if(stick == 5949){
			message.sendSticker(5949);
			}
			if(!user.mts2){
			vk.api.messages.send({ user_id: user.id, message: `⚔ Ваш клан одержал поражение перед «${clans[clanid].name}», вы потеряли ${utils.sp(resulkk)} армии ❌

🔔 Отписаться от оповещений: «оповещения выкл»`});
}
			}

		}else{
			if(clans[clanid].zashita == clans[randclan].zashita){
				return bot(`подходящего клана не найдено, попробуйте снова ✅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "⚔ Атаковать"
		},
			"color": "negative" 
		}]
		]
			})
		});
			}

	setTimeout(async () => {
	message.send(`⚔ [id${message.user.id}|${message.user.tag}], армия отдохнула и готова к бою!`,
		{ 
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"67\"}", 
"label": "⚔ Атаковать"
}, 
"color": "negative" 
		}] 
] 
}) 
});
	}, 300001);

			if(clans[clanid].zashita < clans[randclan].zashita){
			var kpmoney = utils.random(1000000000, clans[clanid].balance);

			clans[clanid].abramovich = 5;
			clans[clanid].exs = getUnix() + 300000;

			clans[randclan].good += 1;
			clans[randclan].retin += 1;	
			clans[randclan].balance += kpmoney;

			clans[clanid].balance -= kpmoney;
			clans[clanid].retin -= 1;
			clans[clanid].fuflo += 1;	

			resul1 = Math.floor(clans[clanid].zashita * 0.10);
			clans[clanid].zashita = Math.floor(clans[clanid].zashita * 0.90);

			resulk1 = Math.floor(resul1 * 0.5);
			clans[randclan].zashita -= resulk1;
			var stick1 = utils.pick([3134, 10000]);

			bot(`ваш клан потерпел поражение перед «${clans[randclan].name}», вы потеряли ${utils.sp(resul1)} армии и ${utils.sp(kpmoney)}$ ❌${text}`);
			if(stick1 == 3134){
			message.sendSticker(3134);
			}
			if(stick1 == 10000){
			message.sendSticker(10000);
			}
			if(!user.mts2){
			vk.api.messages.send({ user_id: user.id, message: `⚔ Ваш клан одержал победу перед «${clans[clanid].name}», вы потеряли ${utils.sp(resulk1)} армии, украдено: ${utils.sp(kpmoney)}$ ✅

🔔 Отписаться от оповещений: «оповещения выкл»`});
}
			}else{
			var kpmoney1 = utils.random(100000000, clans[randclan].balance);
			clans[clanid].abramovich = 5;
			clans[clanid].exs = getUnix() + 300000;

			clans[clanid].good += 1;
			clans[clanid].retin += 1;
			clans[clanid].balance += kpmoney1;

			clans[randclan].balance -= kpmoney1;
			clans[randclan].retin -= 1;
			clans[randclan].fuflo += 1;	

			resulkk = Math.floor(clans[randclan].zashita * 0.10);
			clans[randclan].zashita = Math.floor(clans[randclan].zashita * 0.90);

			resulkkk = Math.floor(resulkk * 0.5);
			clans[clanid].zashita -= resulkkk;
			var stick = utils.pick([712, 5949]);

			bot(`ваш клан одержал победу перед «${clans[randclan].name}», вы потеряли ${utils.sp(resulkkk)} армии, украдено: ${utils.sp(kpmoney1)}$ ✅${text}`);
			if(stick == 712){
			message.sendSticker(712);
			}
			if(stick == 5949){
			message.sendSticker(5949);
			}
			if(!user.mts2){
			vk.api.messages.send({ user_id: user.id, message: `⚔ Ваш клан одержал поражение перед «${clans[clanid].name}», вы потеряли ${utils.sp(resulkk)} армии и ${utils.sp(kpmoney1)}$ ❌

🔔 Отписаться от оповещений: «оповещения выкл»`});
}
		}
	}

});

cmd.hear(/^(?:апомощь|«АПОМОЩЬ»|апомошь|апомош|апомощ)$/i, async (message, bot) => {
	return bot(`команды для привилегии ADMINISTRATOR:
💰 Выдать [ID игрока] [кол-во] — выдача денег.
🔎 Поиск [ID игрока] — просмотр профиля.
🔑 Профиль [ссылка] — поиск игрока.
📝 Сетник [ID игрока] [слово] — изменить никнейм игроку.
📌 Чистка — очистка беседы.
❓ Кто [фраза] — работает в беседе.
&#128279; Ссылка — ссылка на рандомную беседу.
🏃‍♂ Кик [ссылка] — кик пользователя из беседы.
🙊 Бан [ID] — забанить игрока.
⏰ Бантайм [ID] [минуты] — бан на время.
✅ Разбан [ID] — разбан.
🅰 Секретное — секретное имущество.
🎁 Админ бонус — ADMIN бонус`);
});

cmd.hear(/^(?:впомощь|«ВПОМОЩЬ»|впомош|впомощ|впомошь)$/i, async (message, bot) => {
	return bot(`команды для привилегии VIP:
💰 Выдать [ID игрока] [кол-во] — выдача денег.
🔎 Поиск [ID игрока] — просмотр профиля.
🔑 Профиль [ссылка] — поиск игрока.
📌 Чистка — очистка беседы.
❓ Кто [фраза] — работает в беседе.
&#128279; Ссылка — ссылка на рандомную беседу.
🅰 Секретное — секретное имущество.
🎁 Вип бонус — VIP бонус.`);
});

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1]);
	if(message.args[1] < 1 || message.args[1] >= 100) return bot(`укажите число от 1 до 100 ${utils.pick([`🤑`,`🥳`,`🙂`,`😊`,`📈`])}`);
	const int = utils.random(1, 99);

	if(int === message.args[1])
	{
		const eba = utils.pick(['10398', '5781','15559','14415','712','7906']);
		const cash = utils.random(1000000000, 5000000000);
		message.user.balance += cash;
		bot(`невероятно! Вы взломали сейф ${utils.pick([`🤑`,`🥳`,`🙂`,`😊`,`📈`])}
🚔 За тобой уже выехали! Быстрее трать деньги! 

💸 Выигрыш: ${utils.sp(cash)}$`, { attachment: 'photo-182435125_457257331' });

if(eba == 10398){
return message.sendSticker(10398);
}

if(eba == 5781){
return message.sendSticker(5781);
}

if(eba == 15559){
return message.sendSticker(15559);
}

if(eba == 14415){
return message.sendSticker(14415);
}

if(eba == 712){
return message.sendSticker(712);
}

if(eba == 7906){
return message.sendSticker(7906);
}

	}else{
		return bot(`пароль был «${int}», не отчаивайся, количество попыток неограниченно 🎁

${utils.pick([`🤑`,`🥳`,`🙂`,`😊`,`📈`])} Ты можешь выиграть сумму до 5.000.000.000$`);
	}
});

cmd.hear(/^(?:бизнес нанять 1)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	return bot(`использование: «Бизнес нанять 1 [кол-во]» ${success}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 1 9999"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес нанять 2)$/i, async (message, bot) => {
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	return bot(`использование: «Бизнес нанять 2 [кол-во]» ${success}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес нанять 2 9999"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:казино|азино)$/i, async (message, bot) => {
	bot(`использование: «Казино [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

🎰 Попробуй поднять баблища, сыграть на всё: «Казино все»`);
return message.sendSticker(726);
});

cmd.hear(/^(?:трейд)$/i, async (message, bot) => {
return bot(`как заработать на трейдах?

💹 Необходимо предугадать в какую сторону пойдет график курса валют!

📈 Пойдёт вверх:
✏ трейд вверх [ставка]

📉 Пойдёт вниз:
✏ трейд вниз [ставка]`, {attachment: `photo-182435125_457257330`});
});

cmd.hear(/^(?:сейф)$/i, async (message, bot) => {
bot(`взломай сейф и получи ДОХЕРА бабла! 🔦
Подберите пароль к сейфу и получите до 5.000.000.000$, попыток неограничено. Это совершенно бесплатно! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

🔢 Попробуй угадать пароль от 1 до 99!
✏ сейф [пароль]`);
return message.sendSticker(733);
});

cmd.hear(/^(?:передать)$/i, async (message, bot) => {
const int = utils.random(1, `${users.length - 1}`);
	return bot(`как передать деньги другому игроку?

Используй команду:
✏ передать [пересланное сообщение ИЛИ id игрока] [сумма]

📦 Например: передать ${int} 1к`);
});

cmd.hear(/^(?:выдать)$/i, async (message, bot) => {
	return bot(`использование: «Выдать [ID игрока] [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
});

cmd.hear(/^(?:бан)$/i, async (message, bot) => {
if(message.user.polnom < 10){
	message.send(`🅰 [id${message.user.id}|${message.user.tag}], команда только для админов!`, { attachment: '' });
}else{
	return bot(`использование: «Бан [ID игрока]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
}
});

cmd.hear(/^(?:клан создать|создать клан|ксоздать)$/i, async (message, bot) => {
	return bot(`хочешь создать клан?
		
💸 Стоимость: 100.000.000.000$
🔥 Использование: клан создать [имя] 

${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])} Подробнее: клан помощь`, {attachment: `photo-182435125_457257382`});
});

cmd.hear(/^(?:ккик|клан кик)$/i, async (message, bot) => {
	return bot(`использование: клан кик [ID игрока] 

🏃‍♂ Происходит полное удаление данного игрока из клана.`);
});

cmd.hear(/^(?:клан цена|кцена)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	return bot(`цена за вход: ${utils.sp(clans[clanid].price)}$ ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

💸 Установить новую цену: клан цена [цена]`);
});

cmd.hear(/^(?:вступить|клан вступить|вступить клан|квступить)$/i, async (message, bot) => {
	return bot(`использование: вступить [ID клана]

${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])} Например: вступить ${utils.random(1, botinfo.number)}`);
});

cmd.hear(/^(?:пригласить|кпригласить|клан пригласить)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	return bot(`использование: пригласить [ID игрока] 

${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])} Например: клан пригласить ${utils.random(1, `${users.length - 1}`)}`);
});

cmd.hear(/^(?:клан название|кназвание)$/i, async (message, bot) => {
	let clanid = message.user.clanid;
	if(!clanid) return bot(`у вас нет клана, вступите или создайте клан ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);
	return bot(`использование: клан название [имя] 

${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])} Адекватное название — залог успеха!`);
});

cmd.hear(/^(?:стаканчик|🥛 Стаканчик|стаканчик 1|стаканчик 2|стаканчик 3)$/i, async (message, bot) => {
	return bot(`как заработать на стаканчиках?

💸 Необходимо предугадать в каком стаканчике будет приз!

🥛 В первом:
✏ стаканчик 1 [ставка]

🥛 Во втором:
✏ стаканчик 2 [ставка]

🥛 В третьем:
✏ стаканчик 3 [ставка]`, {attachment:'photo-182435125_457257348'});
});

cmd.hear(/^(?:переверни)$/i, async (message, bot) => {
	return bot(`использование: «Переверни [текст]» ⬆`);
});

cmd.hear(/^(?:кубик|куб|кости|🎲 Кубик|🎲Кубик)$/i, async (message, bot) => {
	bot(`бесплатный заработок денег на игре в кубик! ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}

🎲 Отгадай число от 1 до 6:
✏ кубик [число]`);
	return message.sendSticker(15608);
});

cmd.hear(/^(?:бизнес снять все)$/i, async (message, bot) => {
	return bot(`укажите номер бизнеса, использование: «Бизнес снять ${utils.pick([1,2])} [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "primary" 
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"6\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "positive"
			}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес снять 1|снять бизнес 1|бизнес 1 снять|бизнес снять все 1)$/i, async (message, bot) => {
	return bot(`использование: «Бизнес снять 1 [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{ keyboard:JSON.stringify({
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "positive" 
		}]]})});
});

cmd.hear(/^(?:бизнес продать|бизнес продать 1|бизнес 1 продать)$/i, async (message, bot) => {
	return bot(`использование: «Продать бизнес 1» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Продать бизнес 1"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес снять 2|снять бизнес 2|бизнес 2 снять)$/i, async (message, bot) => {
	return bot(`использование: «Бизнес снять 2 [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес продать 2|бизнес 2 продать)$/i, async (message, bot) => {
	return bot(`использование: «Продать бизнес 2» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Продать бизнес 2"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 1 снять|снять бизнес 1)\s(.*)$/i, async (message, bot) => {
	return bot(`использование: «Бизнес снять 1 [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 1 всё"
		},
			"color": "positive" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:бизнес 2 снять|снять бизнес 2)\s(.*)$/i, async (message, bot) => {
	return bot(`использование: «Бизнес снять 2 [сумма]» ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"5\"}",
				"label": "Бизнес снять 2 всё"
		},
			"color": "primary" 
		}]
		]
			})
		});
});

cmd.hear(/^(?:кейс|case|открыть кейс|кейс открыть|открыть 4|сундук 4|сундуки 4)$/i, async (message, bot) => {
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,`🤑`,`😯`]);
const donatich = utils.pick(['🥺', '😔', '😞', '😣', '😓']);
const success = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`, '🤑']);
	if(message.user.case == 0) return bot(`у вас нет Lucky-Кейсов ${donatich}
✅ Покупка в автоматическом режиме на сайте 
🎲 При покупке укажите свой игровой ID: ${message.user.uid}`, {attachment: ''});

	message.user.case -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26,27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]);

	if(prize === 1)
	{
		message.user.balance += 50000000000;
		return bot(`вы выиграли 50.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 2)
	{
		message.user.btc += 5000000;
		return bot(`вы выиграли 5.000.000฿! ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 3)
	{
		message.user.rating += 300;
		return bot(`вы выиграли 300👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 4)
	{
		message.user.rating += 500;
		return bot(`вы выиграли 500👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 5)
	{
		message.user.balance += 200000000000;
		return bot(`вы выиграли 200.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 6)
	{
		message.user.rating += 125;
		return bot(`вы выиграли 125👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 7)
	{
		message.user.rating += 300;
		return bot(`вы выиграли 300👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 8)
	{
		message.user.rating += 120;
		return bot(`вы выиграли 120👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 9)
	{
		message.user.bank += 100000000000;
		return bot(`вы выиграли 100.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 10)
	{
		message.user.bank += 15000000000;
		return bot(`вы выиграли 15.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 11)
	{
		message.user.bank += 10000000000;
		return bot(`вы выиграли 10.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 12)
	{
		message.user.bank += 150000000000;
		return bot(`вы выиграли 150.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 13)
	{
		message.user.rating += 150;
		return bot(`вы выиграли 150👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 14)
	{
		message.user.balance += 160000000000;
		return bot(`вы выиграли 160.000.000.000! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 15)
	{
		message.user.bank += 50000000000;
		return bot(`вы выиграли 50.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 16)
	{
		message.user.bank += 80000000000;
		return bot(`вы выиграли 80.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 17)
	{
		message.user.bank += 120000000000;
		return bot(`вы выиграли 120.000.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 18)
	{
		message.user.btc += 500000;
		return bot(`вы выиграли 500.000฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 19)
	{
		message.user.btc += 10000000;
		return bot(`вы выиграли 10.000.000฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 20)
	{
		message.user.balance += 99999999999;
		return bot(`вы выиграли 99.999.999.999$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 21)
	{
		message.user.balance += 1000000000000;
		return bot(`вы выиграли 1.000.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 22)
	{
		message.user.bank += 500000000000;
		return bot(`вы выиграли 500.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 23)
	{
		message.user.btc += 1000000;
		return bot(`вы выиграли 1.000.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 24)
	{

	if(message.user.odmen == true){
		message.user.btc += 100000000;
		return bot(`вы выиграли 100.000.000฿ на свой аккаунт! ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(message.user.vip == true){
		message.user.odmen = true;
		message.user.vip = false;
		message.user.polnom = 10;
		return bot(`вы выиграли ADMINISTRATOR на свой аккаунт! ${luckych}\nТеперь ваш аккаунт является ADMINISTRATOR'ом!🏅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(message.user.vip == false){
		message.user.vip = true;
		message.user.odmen = false;
		message.user.polnom = 2;
		return bot(`вы выиграли VIP статус на свой аккаунт! ${luckych}\nТеперь ваш аккаунт является VIP'ом!🏅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}
	}

	if(prize === 25)
	{
		message.user.rating += 400;
		return bot(`вы выиграли 400👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 26)
	{
		message.user.balance += 250000000000;
		return bot(`вы выиграли 250.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 27)
	{
		message.user.bank += 100000000000;
		return bot(`вы выиграли 100.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 28)
	{
		message.user.bank += 99999999999;
		return bot(`вы выиграли 99.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 29)
	{
		message.user.rating += 5000;
		return bot(`вы выиграли 5000👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 30)
	{
		message.user.btc += 800000;
		return bot(`вы выиграли 800.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 31)
	{
		message.user.balance += 30000000000;
		return bot(`вы выиграли 30.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 32)
	{
		message.user.bank += 120000000000;
		return bot(`вы выиграли 120.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 33)
	{
		message.user.balance += 11850000000;
		return bot(`вы выиграли 11.850.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 34)
	{
		message.user.btc += 750000;
		return bot(`вы выиграли 750.000฿! ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 35)
	{
		message.user.rating += 500;
		return bot(`вы выиграли 500👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 36)
	{
		message.user.rating += 2800;
		return bot(`вы выиграли 2800👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 37)
	{
		message.user.balance += 115999999999;
		return bot(`вы выиграли 115.999.999.999$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 38)
	{
		message.user.rating += 700;
		return bot(`вы выиграли 700👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 39)
	{
		message.user.rating += 900;
		return bot(`вы выиграли 900👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 40)
	{
		message.user.rating += 100;
		return bot(`вы выиграли 100👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 41)
	{
		message.user.bank += 180000000000;
		return bot(`вы выиграли 180.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 42)
	{
		message.user.bank += 99999999999;
		return bot(`вы выиграли 99.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 43)
	{
		message.user.bank += 9696969696;
		return bot(`вы выиграли 9.696.969.696$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 44)
	{
		message.user.bank += 9696969696;
		return bot(`вы выиграли 9.969.696.969$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 45)
	{
		message.user.rating += 800;
		return bot(`вы выиграли 800👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 46)
	{
		message.user.balance += 400000000000;
		return bot(`вы выиграли 400.000.000.000! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 47)
	{
		message.user.bank += 499999999999;
		return bot(`вы выиграли 499.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 48)
	{
		message.user.bank += 80000000000;
		return bot(`вы выиграли 80.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 49)
	{
		message.user.bank += 19999999999;
		return bot(`вы выиграли 19.999.999.999$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 50)
	{
		message.user.btc += 120000;
		return bot(`вы выиграли 120.000฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 51)
	{
		message.user.btc += 1000001;
		return bot(`вы выиграли 1.000.001฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 52)
	{
		message.user.balance += 55999999999;
		return bot(`вы выиграли 55.999.999.999$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 53)
	{
		message.user.balance += 1000000000000;
		return bot(`вы выиграли 1.000.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 54)
	{
		message.user.bank += 555500000000;
		return bot(`вы выиграли 555.500.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 55)
	{
		message.user.btc += 2400000;
		return bot(`вы выиграли 2.400.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 56)
	{

	if(message.user.odmen == true){
		message.user.btc += 100000000;
		return bot(`вы выиграли 100.000.000฿ на свой аккаунт! ${luckych}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(message.user.vip == true){
		message.user.odmen = true;
		message.user.vip = false;
		message.user.polnom = 10;
		return bot(`вы выиграли ADMINISTRATOR на свой аккаунт! ${luckych}\nТеперь ваш аккаунт является ADMINISTRATOR'ом!🏅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(message.user.odmen == false){
	if(message.user.vip == false){
		message.user.vip = true;
		message.user.odmen = false;
		message.user.polnom = 2;
		return bot(`вы выиграли VIP статус на свой аккаунт! ${luckych}\nТеперь ваш аккаунт является VIP'ом!🏅`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}
	}
	}

	if(prize === 57)
	{
		message.user.rating += 1200;
		return bot(`вы выиграли 1200👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 58)
	{
		message.user.balance += 222000000000;
		return bot(`вы выиграли 222.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 59)
	{
		message.user.bank += 999999999999;
		return bot(`вы выиграли 999.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 60)
	{
		message.user.bank += 99999999999;
		return bot(`вы выиграли 99.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 61)
	{
		message.user.rating += 160;
		return bot(`вы выиграли 160👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 62)
	{
		message.user.btc += 4800000;
		return bot(`вы выиграли 4.800.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 63)
	{
		message.user.balance += 339999999999;
		return bot(`вы выиграли 339.999.999.999$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 64)
	{
		message.user.bank += 360000000000;
		return bot(`вы выиграли 360.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 65)
	{
		message.user.balance += 400000000000;
		return bot(`вы выиграли 400.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 66)
	{
		message.user.btc += 5000000;
		return bot(`вы выиграли 5.000.000฿! ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 67)
	{
		message.user.rating += 200;
		return bot(`вы выиграли 200👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 68)
	{
		message.user.rating += 300;
		return bot(`вы выиграли 300👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 69)
	{
		message.user.balance += 50000000000;
		return bot(`вы выиграли 50.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 70)
	{
		message.user.rating += 150;
		return bot(`вы выиграли 150👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 71)
	{
		message.user.rating += 220;
		return bot(`вы выиграли 220👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 72)
	{
		message.user.rating += 120;
		return bot(`вы выиграли 120👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 73)
	{
		message.user.bank += 60000000000;
		return bot(`вы выиграли 60.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 74)
	{
		message.user.bank += 190000000000;
		return bot(`вы выиграли 190.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 75)
	{
		message.user.bank += 9999999999;
		return bot(`вы выиграли 9.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 76)
	{
		message.user.bank += 60000000000;
		return bot(`вы выиграли 60.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 77)
	{
		message.user.rating += 99;
		return bot(`вы выиграли 99👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 78)
	{
		message.user.balance += 250000000000;
		return bot(`вы выиграли 250.000.000.000! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 79)
	{
		message.user.bank += 488888888888;
		return bot(`вы выиграли 488.888.888.888$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 80)
	{
		message.user.bank += 77777777777;
		return bot(`вы выиграли 77.777.777.777$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$
			P.s. семерки приносят удачу, вам ДОБАВЛЕН ШАНС на выпадение привилегии "ADMINISTRATOR"!`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 81)
	{
		message.user.bank += 130000000000;
		return bot(`вы выиграли 130.000.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 82)
	{
		message.user.btc += 7777777;
		return bot(`вы выиграли 7.777.777฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}
			P.s. семерки приносят удачу, вам ДОБАВЛЕН ШАНС на выпадение привилегии "ADMINISTRATOR"!`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 83)
	{
		message.user.btc += 1000000;
		return bot(`вы выиграли 1.000.000฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 84)
	{
		message.user.balance += 666666666666;
		return bot(`вы выиграли 666.666.666.666$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 85)
	{
		message.user.balance += 500000000000;
		return bot(`вы выиграли 500.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 86)
	{
		message.user.bank += 70000000000;
		return bot(`вы выиграли 70.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 87)
	{
		message.user.btc += 101000;
		return bot(`вы выиграли 101.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 88)
	{
		message.user.case += 2;
		return bot(`вы выиграли 2 Lucky-Кейса! ${luckych}\nLucky-Кейсов на вашем аккаунте: ${utils.sp(message.user.case)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 89)
	{
		message.user.case += 1;
		return bot(`вы выиграли 1 Lucky-Кейс! ${luckych}\nLucky-Кейсов на вашем аккаунте: ${utils.sp(message.user.case)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 90)
	{
		message.user.case += 3;
		return bot(`вы выиграли 3 Lucky-Кейса! ${luckych}\nLucky-Кейсов на вашем аккаунте: ${utils.sp(message.user.case)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 91)
	{
		message.user.bank += 88888888888;
		return bot(`вы выиграли 88.888.888.888$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 92)
	{
		message.user.bank += 55999999999;
		return bot(`вы выиграли 55.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 93)
	{
		message.user.rating += 220;
		return bot(`вы выиграли 220👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 94)
	{
		message.user.btc += 4999999;
		return bot(`вы выиграли 4.999.999฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 95)
	{
		message.user.balance += 40000000000;
		return bot(`вы выиграли 40.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 96)
	{
		message.user.bank += 120000000000;
		return bot(`вы выиграли 120.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 97)
	{
		message.user.balance += 85000000000;
		return bot(`вы выиграли 85.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 98)
	{
		message.user.btc += 7490000;
		return bot(`вы выиграли 7.490.000฿! ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 99)
	{
		message.user.rating += 120;
		return bot(`вы выиграли 120👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 100)
	{
		message.user.rating += 90;
		return bot(`вы выиграли 90👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 101)
	{
		message.user.balance += 555555555555;
		return bot(`вы выиграли 555.555.555.555$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 102)
	{
		message.user.rating += 777;
		return bot(`вы выиграли 777👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}
		P.s. семерки приносят удачу, вам ДОБАВЛЕН ШАНС на выпадение привилегии "ADMINISTRATOR"!`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 103)
	{
		message.user.rating += 70;
		return bot(`вы выиграли 70👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}
			P.s. семерки приносят удачу, вам ДОБАВЛЕН ШАНС на выпадение привилегии "ADMINISTRATOR"!`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 104)
	{
		message.user.balance += 75000000000;
		return bot(`вы выиграли 75.000.000.000! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 105)
	{
		message.user.bank += 111999999999;
		return bot(`вы выиграли 111.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 106)
	{
		message.user.bank += 77777777777;
		return bot(`вы выиграли 77.777.777.777$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$
			P.s. семерки приносят удачу, вам ДОБАВЛЕН ШАНС на выпадение привилегии "ADMINISTRATOR"!`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 107)
	{
		message.user.bank += 96969696969;
		return bot(`вы выиграли 96.969.696.969$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 108)
	{
		message.user.bank += 9696969696;
		return bot(`вы выиграли 9.969.696.969$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 109)
	{
		message.user.rating += 130;
		return bot(`вы выиграли 130👑! ${luckych}\n👑 Рейтинг: ${utils.sp(message.user.rating)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 110)
	{
		message.user.balance += 40000000001;
		return bot(`вы выиграли 40.000.000.001$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 111)
	{
		message.user.bank += 44999999999;
		return bot(`вы выиграли 44.999.999.999$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 112)
	{
		message.user.bank += 80000000000;
		return bot(`вы выиграли 80.000.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 113)
	{
		message.user.bank += 100999999999;
		return bot(`вы выиграли 100.999.999.999$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 114)
	{
		message.user.btc += 1500000;
		return bot(`вы выиграли 1.500.000฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 115)
	{
		message.user.btc += 1000001;
		return bot(`вы выиграли 1.000.001฿\n ${luckych} Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 116)
	{
		message.user.balance += 55999999999;
		return bot(`вы выиграли 55.999.999.999$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 117)
	{
		message.user.balance += 150000000000;
		return bot(`вы выиграли 150.000.000.000$! ${luckych}\n💰 Баланс: ${utils.sp(message.user.balance)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 118)
	{
		message.user.bank += 155500000000;
		return bot(`вы выиграли 155.500.000.000$ на свой банковский счёт! ${luckych}\n💳 В банке: ${utils.sp(message.user.bank)}$`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 119)
	{
		message.user.btc += 2990000;
		return bot(`вы выиграли 2.990.000฿ ${luckych}\n🤑 Счет BTC: ${utils.sp(message.user.btc)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}

	if(prize === 120)
	{
		message.user.case += 2;
		return bot(`вы выиграли 2 Lucky-Кейса! ${luckych}\nLucky-Кейсов на вашем аккаунте: ${utils.sp(message.user.case)}`,
		{
			keyboard:JSON.stringify(
		{
			"inline": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"101\"}",
				"label": "Кейс"
		},
			"color": "positive" 
		}]
		]
			})
		});
	}
});

/*
cmd.hear(/^(?:подработка|подработать|📦 Подработка|📦Подработка|подработки)$/i, async (message, bot) => {
const phrase = utils.pick(['😳', '😒',`😟`,`🙄`,`🤔`]);
const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);

return bot(`варианты подработок:
${message.user.transport.car.length == [] ? '❌' : '✅'} Сдать машину
${message.user.transport.yacht === 0 ? '❌' : '✅'} Сдать яхту
${message.user.transport.airplane === 0 ? '❌' : '✅'} Сдать самолёт
${message.user.transport.helicopter === 0 ? '❌' : '✅'} Сдать вертолёт
${message.user.realty.home === 0 ? '❌' : '✅'} Сдать дом
${message.user.realty.apartment === 0 ? '❌' : '✅'} Сдать квартиру

‼ Выберите подработку, например «${utils.pick([`Сдать машину`,`Сдать яхту`,`Сдать самолёт`,`Сдать вертолёт`,`Сдать дом`,`Сдать квартиру`]);}»`);

});
*/

cmd.hear(/^(?:обнова2)$/i, async (message, bot) => { 
if(message.polnom < 10) return;
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].pet = [];
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:кнопка|кнопки)\s([^]+)$/i, async (message, bot) => {

if(message.args[1].length >= 26) return bot(`вы указали слишком длинную кнопку.
❓Максимальная длина одной кнопки 25 символов.`);

let zaprets = message.args[1].toLowerCase();
var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|&#1;|█|▓|�|�||�|™|�|&#0000;||�|™.|youtu.be|марихуана|أحب|أحبك|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
if(pizda.test(zaprets) === true){
return bot(`ошибка ❌
Данное слово запрещено в использовании.`);
}

		if(message.isChat) return bot(`команда работает @botmendes (только в ЛС ✉)`);
       
        if (message.chatId) 
        {
        let conver = convers.find(x=> x.cid === message.chatId);
        message.user.lte2 = true;
        if (!conver)
        {
            convers.push({
                id: convers.length + 1,
                cid: message.chatId,
                buttoncount: 0,
                button: []
            });
            conver = convers.find(x=> x.cid === message.chatId);
        message.user.lte2 = true;
        }

        if (message.args[1].toLowerCase() === "удалить")
        {
        
            conver.buttoncount = 0;
            conver.button = [];
            message.user.lte2 = false;
            return vk.api.messages.send({
                chat_id: message.chatId,
                message: `[id${message.user.id}|${message.user.tag}], вы очистили все кнопки!

🔁 Используйте для добавления новых: кнопка [текст]
&#10133; Для включения стандартных кнопок введите: кнопки`,
                keyboard: Keyboard.keyboard([])
            });
        }

        if (conver.button.length >= 40) return bot(`[id${message.user.id}|${message.user.tag}], ваше поле заполнено! (40/40)

❌ Используйте для очистки поля: кнопки удалить
&#10133; Для включения стандартных кнопок введите: кнопки`);

        conver.button.push(message.args[1]);
    	message.user.lte2 = true;
        await vk.api.messages.send({
            chat_id: message.chatId,
            message: `[id${message.user.id}|${message.user.tag}], кнопка успешно добавлена!`,
            keyboard: generateKeyboard(conver.button)
        });
    }
    else
    {
        if (message.args[1].toLowerCase() === "удалить")
        {
            message.user.buttoncount = 0;
            message.user.button = [];
            message.user.lte2 = false;
            return vk.api.messages.send({
                peer_id: message.user.id,
				message: `[id${message.user.id}|${message.user.tag}], вы удалили все кнопки!

🔁 Используйте для добавления новых: кнопка [текст]
&#10133; Для включения стандартных кнопок введите: кнопки`,
                keyboard: Keyboard.keyboard([])
            });
        }

        if (message.user.button == undefined)
        message.user.lte2 = true;
        message.user.button.push(message.args[1]);

        await vk.api.messages.send({
            peer_id: message.user.id,
			message: `[id${message.user.id}|${message.user.tag}], кнопка успешно добавлена!

❌ Используйте для очистки поля: кнопка удалить
&#10133; Для включения стандартных кнопок введите: кнопки`,
            keyboard: generateKeyboard(message.user.button)
        });
        message.user.lte2 = true;
    }
});

cmd.hear(/^(?:взлом подарка|взломать подарок|подарок взлом|2020|новый год|🎄 Взлом подарка)$/i, async (message, bot) => {

if(message.user.semion2 > getUnix()){ 
bot(`попытка взлома подарка уже была! 
Подожди ${unixStampLefta(message.user.semion2 - Date.now())} ${utils.pick([`😢`,`😰`,`😓`,`😭`,`😓`,`😲`])}`);
return message.sendSticker(662);
}else{

const prize = utils.random(1, 30);
const cash = utils.random(500000000, 1500000000);
if(prize == 1){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(5944);
}

if(prize == 5){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(11908);
}

if(prize == 7){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(11904);
}

if(prize == 18){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(10000);
}

if(prize == 20){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(5944);
}

if(prize == 24){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(10398);
}

if(prize == 28){
	message.user.semion2 = getUnix() + 1200000;
	message.user.balance += cash;
	bot(`в подарке оказались ${utils.sp(cash)}$! 🎁`);
	return message.sendSticker(13603);
}

if(prize == 29){
	message.user.semion2 = getUnix() + 1200000;
	if(message.user.mts1 == 8 || message.user.mts1 == 9){
		message.user.balance += 1000000000;
		bot(`в подарке оказались 1.000.000.000$! 🎁`);
		return message.sendSticker(623);
	}
	if(message.user.mts1 !== 8 || message.user.mts1 !== 9){
	message.user.mts1 = 8;
	bot(`вы выбили уникальный объект «⛄ Снеговик Олух»! 🤑

🎁 В скором времени его можно будет продать за хорошую цену.`);
return message.sendSticker(16592);
}
}

if(prize == 30){
	message.user.semion2 = getUnix() + 1200000;
	if(message.user.mts1 == 8 || message.user.mts1 == 9){
		message.user.balance += 1000000000;
		bot(`в подарке оказались 1.000.000.000$! 🎁`);
		return message.sendSticker(623);
	}
	if(message.user.mts1 !== 8 || message.user.mts1 !== 9){
	message.user.mts1 = 9;
	bot(`вы выбили уникальный объект «🎅 Сани Деда Мороза»! 🤑

🎁 В скором времени его можно будет продать за хорошую цену.`);
	return message.sendSticker(16592);
}
}

const stick = utils.pick([1, 2, 3, 4, 5]);
message.user.semion2 = getUnix() + 1200000;
bot(`взломать подарок не удалось ${utils.pick([`😢`,`😰`,`😓`,`😭`,`😓`,`😲`])}
Попробуй снова через 20 мин. 🎁`);
if(stick == 1){
	return message.sendSticker(13648);
}

if(stick == 2){
	return message.sendSticker(15625);
}

if(stick == 3){
	return message.sendSticker(13364);
}

if(stick == 4){
	return message.sendSticker(12694);
}

if(stick == 5){
	return message.sendSticker(12996);
}

}
});

cmd.hear(/^(?:мифа,|мифа|мифка,|мифка|милфа|милфа,|макака|макака,)/i, async (message) => {
request(`https://isinkin-bot-api.herokuapp.com/1/talk?q=${encodeURIComponent(message.text)}`).then(res => {
var bot = res.text;
pezda(bot, `ru`, 5).then(function (url) {
vk.api.messages.setActivity({type: "audiomessage", chat_id: message.chatId})
setTimeout(() => {message.sendAudioMessage(url)}).catch(function (err) {
console.error(err.stack); }, 10000);
});
})
})

cmd.hear(/^(?:скажи|синтез)\s(.*)/i, async (message) => {

if(message.args[1].length >= 51) return bot(`вы указали слишком длинное сообщение.
❓Максимальная длина одного сообщения 50 символов.`);

let zaprets = message.args[1].toLowerCase();
var pizda = /(&#4448;|ᅠ|™|#|Ỏ͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖|█|▓|марихуана|Cuний кuт|режьте вены|режте вены|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̡̛̛̛̛̥̗̹̬̠̙̗̞̲̺̦̬̠͚̺͖̗̰̝͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̈̔͗͆̀̋̏̐͋̃͒̊͊̾̋̽̉́̋̅͆̄̾̆̃͑̄́̆̇̐̃́̈́́̒͗̄̽̄̈́̇̎̊̒͗̾͐̍͂̐͋̀̊͐̇͑̽̑̀̀͆̓̍̈́̇̑̓̎͐͋̄͌̌͗̔̄̑̐̀̒̈́͆̊͆͌̓̓͛͑͒̾͆̿͂́̆̏͂̊̄̓̌̽̾̈́̓̽̋̇̌́̃̈́̍̌̋̽̓́̔̏͂̎̿̌̐̎̂̏̋̇̉̈́̕͘͘͘̚̚͘̚̕͘̚̕͘͘͘͘͘̚͝͝͝͝͝͝͝͝ͅ|˙̢̢̡̢̧̡̢̛̛̛̣̭̺̪̣̤̟̭͕̭̭̙͍͉͙̖͖̱̩̤̘̝̲͍͚͇̫̟͈͚̘̰̫̰̼̟̦͚̜̫͎̘̯̭̙̼̼̰̱̟̗͎̜͖͕̪͔̭̭̺̙͍̞̰̭̎͆̆̊̓͊̌̍͑̈́̊̓̌̀́͐̊̐̀͆̐̿̾́̇͌̅̐̐̎̊̽̅̏̿̋̍͑̔͒̽̋̏̋̋̋̇́̐̈͗̆̈́̌͗͐̽̈́̾̏̊͛͌͒͋̊̽̐̒͋͑͊͊̊̾̂̏̏̓̄̈͐͐̋̇͌̇̽̓͌̾͑̍̓́̈́̀̂̑̑̍̐̒̍͑̿̍͊͆͋̋̔̍̈̈̂̊̐̏͂̇̈̾̂͑̽̓̋͊̔̂̀̀͑̌͛͂̿̍̌̅̔̈́̓̓͗͛͑̏̇̐̍̌̈́̏̍̈̃̓̓̍̿̎́͌̍̈́̾̔̉́͐̓̕͘̕͘͘͜͜͠͝͝͝͠͠͝͠͝͝͠͝͝͝͝͝͝ͅ˙̵̧̡̢̨̧̧̢̨̢̨̡̡̢̧̢̧̨̨̧̢̡̡̨̡̧̡̡̨̛̛̛̛̛̛̛̪͇̥̝̼̻̗͓̤̱͖̙̭̯͙̦̭̗͚͉̜̳͎͎͇̪̭̠̖̱̣̠̟͉̯̣̮͚̙̹̠̤̞͔̩̼̻̟̻͔̹̠͚͍͕̣̹̞̲͙̠̳̟͕̣͇̭̹̮͕̯̫͚͕͕̯͔̟̺̞̟͉̥̞̗̼̭͉̩̣͖̘̣͓̣͎̖̖̥̖̳̮̦̥̹̙̲̘̰̘͈̮̞͙̘̟̯͚̲̜̰̦̯͇̥̯̭̼̥̼̯̖͈̥͎̳̯̻̦̗̖̘͍̬͍̻̠̝̭̜͇̯͔̹͉͖͕̜̳̹̹̜̹̗̺͈̻̹̲̪͚̯̙̤̤̰̞͖̳̜̫͚̖̰̺͕̮̠͇͎͕̘͉͉̟̥̩͙̖͔̟̮͓̪̯̣̼̂̿̿͆̽̾̆̋̓̂̆̀̋̓̋͐̓͌̓̏̈̔̉̀̀̈̈̾̎̓̀͋̀̈́͂̀̓͑̂̍̄̂́̈́̔͋̽́̏̀̂́̿͒͊͌̈́̓́͗͌̀̈́͗͛͌̉̏͛͋̎̂̅̇̒͋́̆̐̓̌́͑̌͗͋͐͒̾́̂̀̀̃͋͆̐̈̉̓͊̽̌͑̽̅͊͛̍̅̃̒̀͐̽͒̓͊̅̈͐̈́͆͊͒̆̋̃̂͗̓͆̾̆͂̓̿̐̄̀̀͂̉̋̚͘̚͘̚̕̕̚̕̚̚̕̚̚̚̚̕̕͜͜͜͜͜͜͜͜͜͠͝͠͝͠͠͠͝͠͝͝ͅͅͅ˙̧̡͕̰͖̰̬̩̞͔̩̞͖̤̞͍̙̥̭͎̻̭͖̳͈̦̹̣̖̞̘͕̗̖̱͍̗̩̩̳̹̹͚͙̗͙̲̪̝̫̰͇͎̤̬̼͉̤̹͓̭͈͛̈̑̌̏͒̽͐̃̅͂̓̐̌̈́̽̽̈́͗̏̅͆͂͛̍̾͑͑̌̊̄͑̎̑̈́͆̍̈͛̑̈́̀̆̄̇͋̏̏̀́̀͋̎̉̚̚͜͜͜͜͜͝͝͠˙̴̡̢̧̧̧̧̡̧̧̡̨̢̢̨̡̛̛̳̦̪̹̠̱̩̘̝̤͇̟̟̜̬̯͍͚͎͔̣͎̗̯͈̲̞͙̟̞̖͍̜̖͕͓̝̠̣͉̹̲̱̭͔̬̞̼̬̱͚̫̣͍̩̯̜͍͕͚̪̹̯͙̫̝̖͓͖̹̜̙̞̻͖̤͚̤̹̞̪͉͖͇̤̱̺̗̖̪̘̰̯̼͔̬̠̖͍̖͍̭͖̣̮̫͙̯̪̥͕̼͕͖̗̺̜̩̙̱̱͍͎̩̖͈̤̣̹̹̘̭͕̮͍̠̫̥̝̟̗̗͍̺͚̺̗͕͎͈̹̗̠̬̞̠̘̗̲͙̗͎̦̖̜̤̼̠̰͙̙̳̞̜͉͔͙̭̮̃̊̎͒̈̽̓̌͛̒͂̓͑̐̋͒͂̊͗͐̓̆͒̀̇͛́̉̌́̌̍̈́͌͌̽̉̉͒͊̀̂́̑̉̿͆̉̀̌͛̆̔͊̄̄̑̈́͗̒̀́̐̈́͑́̽͑͋̾̎̐͗̈̒̀̀̀̌̆̉̾̍̏̓̃̊̅͌̅̏̀̅͋̀̍͒̄̈́̀̎̅̊̔̆̓̋̄̽̍̀̋̈́̄̇̽͂̍̃̍͐̓̅̌̈́͂̓̈́͗̊͛̈́͊̀̾̊̿͊̑̑̑͑̽̈̿̋̏̂͒͗̆̽́͋̓͒̒̿̒͑͐̿̈́̓̉̇̚͘̕͘͘͘̚͘͜͜͜͜͝͝͝͠͝͠͝͝͠͠͝͝͝͝͠͝ͅͅͅͅͅͅ˙̢̧̢̡̧̧̧̧̢̡̡̨̛̛̛̛̛̛̞̺̺͚̻̜̗͇͇̥̞̭̯͓͍̗̝̫̥͎̭̙͔̫̜̝̱͎̦͉͚̪̘̥̖̥̙̰͙͕͚͓̹͈̤̗͈͈̪͓̙̪̗̤̱̫̯̩̹̪͙͖̱̦̞͎̺̫̣̥͇̥͖̩̰̜̞͉̞͓̥̤͕͙̥̥̳̤̞͔̟̟̯̲͉͉͍̜̗͎̦̱̯̺̤̟̱̹̫̖̹̜̠̳̦̹̺̜̥̬̹̭̯̬͍̥͙̠̙̥̭͔̻̩̫̹̦͍̺̫̤̪̜̙̠̞͇̖̣̼͙̳̫̮͈͈̦͈̭̱̺̺͚̰̻̤̭͈̯̮̙̦̖̠̜͇̪̙̭͉̝̹̲͍̟̫͖̰̻͕͙͓̲̾̑́̍̓̃̅̇͛̂̌̀̀̂͗̊͋͗̾̿̅͗̅̒́̓̾͆̍̽͐̾̉͊̋͗̽̒̐͗̀̾͑́̃̓̀́̊̄̿̓͐̅̇̐͒́̋̈́̀̄͌̐̋̃͋̐͌̒̓͗͛̏̓͐̒͌̓̓̊̈́̈̅̈́͗͒̊̇̀͂̅̿̄̍̾̆̄̇̇̋̾̾̂̅̉̎̈́̇́̍̅͑͌̃̀̈̈́̿͗̏̈́̃̌̄̈́̈́͐͊͌́̑̊̀͆̅͂͊͆͌̎͋͑́̌́̏̿̽̈̈́͆͑̋̈́̂̂̏̿̀̇͗́́̿̂̅͛͗͋͐͑͗͌͐̏̐̓̆̽͑̆̿̉͑͆̒͘̚͘͘̚̕̕̚͘͜͜͜͜͜͝͝͝͠͝͝͝͝͠͝͠͝ͅͅͅͅͅͅͅͅ˙̢̡̨̨̨̧̡̢̡̡̧̧̡̡̢̛̛̛̛̛͚̙̭͇͍̫̪̬͚͚͖͔͇͕̼̩͍̦̫͚̭̞̦̮̮̥͙̱̥͉̗̬͕̜̟̭̜̳̞̙̻͕̪̥͓̗̟̳̲̠͇̱̫͉͚̮̺̝͓̝͓͕̼͖̻̲̹̠̼̤̹̺͍̭̯̼̝̖̩͕̜̼̬̠̭͓̙̼̙͓̼̘̠̖̝̦͙̝͓̣̥͍̗̻͍̦̪͍̘͉̤͚̮͚̺̗̖̘̻̬̭̟̫̹̞͍͚̦̝̠͖̦̹̲͔͉͓͙̺͇̮͖̝̤̮̭͖͚͎̖̫̫̦̙̺͖̩͖̦͉̭̤̪̦͍̭̥͔̮͙̝̥̬̠̣̺̖̰͈̻̹͚͙̠̗̙͙͉͔͉̖̝̠̣͚͈̱̭̖̮͉͇͙̹̝̫̝̱̦̼̤͍̣̺̮̜̦̯̅̈́͂͒̈́̌̋̇̇̅́͒̒͊̏̈́̏̋͛̓̀͒͋̈́̀̒̊͌͆̿̂͌̔̊̏̊͗͒͊̿̽̀̌̉̍̋̔̉͑͐͆̏͑̌̈́͛͗̐͒̄̍̾̒̅͌̀̏̏̃͂̎͑͑̅̑̏̓̎̋͊͋̆̿̓͘̚̚͘͘̚͜͜͜͝͠͝͠ͅͅͅͅͅͅͅ˙̵̡̢̨̡̧̧̡̢̛̱̲̰̞̞̝͎͔̳̹̣͉̠̟̰̪͍̘̜͇̲̥̖͕̹͔͍͓̯͕͔͚̳͉͙̘̺̥̦̯̞̣͚̜̘̫͚̩̪͈̻̣̗̫̳̙̠̖̠̝̫̞͔̹̫̝̰͙͕͖͓̩̤̲̟̹̥͋́́̋͊̌̎̄̓͆͗̓͛͑́̉̂̽̌͋̿͌̃̌́̄͆̉̽̀͊͛̅́̀͋̔̎͊̓̇̀͘̚͘͘̕͜͝͝ͅ°̛͛̈́̑͆̌̉̂̈̀̏̏̅͌͆͆͌̀͑̂̂͑̍͊͒̇̏͐̈́̇͌͂̑̌̊̅̒̌̈́͑̿̾͐̐̽̏́̕͘͘͘̚̚͘͝|أعلى|▒|56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏| ẖ̨̢̨̨̢̢̧̧̛̛̛̛̹̮͓͉̜͓̩͚̼͉͖̘̗͚̰͇͉͇͓̜͚͚̯̗͓͓̲̟̲͓̬͙̹̘̮͉̲̮̤̤̼͈̜̭̻͙͚̟͈̤̝̞͚̜͎͖̺̗͓͔̝͙̪̺͖̰͖̳̯̱̼͙̦͓̙̟̻͈̪̬̙̣͇̞͇̻̺͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̅̀̄͗̒͂̔͊͒̌̄̕͘̚̕̚̕͜͜͝͝͝͝͝ͅͅé̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|h̛̛͛̒̏͒̈́̊̏̔̅̾̅́̅̆͂́͋̍̈́̑̇̿̈́́̾̔̅͐͆͆͊̊̌̋̾̏͋͌̅̆́́̇̀́̇̈́̽̾̿̋͛̈̇̋̋̄̾͊̋̈́̀̃̈́̂̅͛́́̅́͊͆́̕͘̚̕̚͝͝͝͝͝|░|é̴̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̛̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̿͒̾̑̌̆̀̎͋̀̈́̓̓̄̂́̃̀̈́̋̎̎͌̈́̓̃̈́̐̾̀̃̎́̈͛̽̔͊͐́͌̿̐̍̈̔̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅͘̚̚̕͘̕̚͜͝͝͠͠͝͠͠͠ͅ.̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̨̡̢̢̧̧̨̨̧̢̧̛͙̟̮̩̥̻̬̱̝͔̝̼̗͖͎̪̲͓͔̝̤͖̫̳̟̪͎̳̭̞̝̣̗̝̱̱̮̠̙̟̙͖̤͔͇̩͍͙̰̭̝̫̜̺̝͓̻̱̤̲͉͙̦͕̰̣̬̣̺̖̘̘̮͈̭̫͍̻̰͍̼̤̙̩͖͇̒̌͆̔̄̔̓̏͛̉͛̈́̑̑̎̈́̑͂̾͑͆̑͂͂́̋͂̄̂̒̃̆̓̐̉̀̾̽͒̎̓͐͆͑̊̉͋͋̀̈́̓̎͛̌͌̂̽̔͆̍̊̓̽̂̆̀̿̀̋̍̃̔̉̇̎̋̈́͆̈́̚͘̚̕̚͘̕͘̚̚͘̚͝͝͠͠͝͝͝ͅͅͅ|̢̢̢̧̡̧̡̢̡̧̡̡̡̨̛̥̟̹͖̲̙̪̙̠̙͍̹̦̦͇̣̯͓̯͈͔̺̺̯͚̱͔̻̖̰̖̙̟͇̘͍͉̱̟͓̞͓̘͓̟̳͕̲̞̫̱̖̗̘͇̯͎̝̹̥̲͍̥͉̳̠̥͕̗͔̟͖͇͖͓̭͖̜̱̠̳̺͚̖̒̽̿͐̅́́̊̿̉̑̑͒̔́̓̄͊̀̋̓͛̇̍̇̈́͐͑̇̌̓̓͂̎̅̕͘̕̚͜͠͠ͅ.|ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็|ส|разбуди в 4:20|синийкит|̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏|56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏&|подкладки|таурин|cпайс|cпайc|спaйс|cпaйc|спайс|насвай|мморфин|ммoрфин|морфин|моpфин|мopфин|мoрфин|сованикогданеспит|cиний кит|синий kит|cиний kит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|вк бо т |вкботру|сова никогда|сова спит|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|botvk|ботвк|vkbot|bot vk|пидр|трах|насилие|.com|.ru|.pw|.pro|.net|.co|.art|.website|vkmix|сова не спит|сoва не спит|coва не cпит|совa нe cпит|наркота|наркотики|кокс|амфетамин|кокаин|опиаты|6-мам|6-МАМ|морфин|кодеин|дигидрокодеин|6-mam|6-MAM|тебаин|буторфанол|наркотин|этилморфин|налорфин|пентазоцин|нальбуфин|бупренорфин|метамфетамин|эфедрин|псевдоэфедрин|хлорфентермин|амфепрамон|фенилэтиламин|фенилпропаноламин|сова никогда не спит|синий кит|цп|cp|изнасилование|несовершеннолетние)/
if(pizda.test(zaprets) === true){
return bot(`в вашем сообщении содержатся запрещенные символы ❌`);
}

pezda(message.args[1], `ru`, 5).then(function (url) {
message.sendAudioMessage(url)}).catch(function (err) {
console.error(err.stack);
});
})

cmd.hear(/^(?:синтез|синтез речи|🎤 Синтез|🎤Синтез|🔁 Скажи|🔁Скажи)$/i, async (message, bot) => {
	const luckych = utils.pick(['🤤', '☺',`🙂`,`😁`,`😏`,'🤑']);
	return bot(`напишите фразу, использование: «Синтез Тест» ${luckych}`);
});

function progressQuest(user, id) {
	if ( !('quests' in user) )
		user.quests = quests.map(item => { return 0 })

	if ( user.quests[id] < quests[id].actions ) {
		if ( user.quests[id] + 1 == quests[id].actions ) {
			user.balance += quests[id].reward
			user.quests[id] = quests[id].actions
			vk.api.messages.send({
				peer_id: user.id,
				message: `[id${user.id}|${user.tag}], поздравляем, Вы выполнили квест! ☺
✅ На ваш счет было зачислено ${utils.sp(quests[id].reward)}$`
				});
		}
		else 
			user.quests[id]++
	}
}

function resetQuest(user, id) {
	if ( !('quests' in user) )
		user.quests = quests.map(item => { return 0 })

	if ( user.quests[id] < quests[id].actions )
		user.quests[id] = 0
}

cmd.hear(/^(?:секретное|секретное имущество)$/i, async (message, bot) => {
	if(message.user.polnom < 2) return bot(`данный раздел доступен с привилегии VIP и выше.`, {attachment: ``})
	return bot (`доступное секретное имущество:

1&#8419; 🚘 VIP-AUTO
2&#8419; 🛸 Световой дрон
3&#8419; 🚲 Велосипед
4&#8419; 🚃 Дом на колёсах
5&#8419; 🏩 Особняк с проститутками
6&#8419; ⛴ Яхта с турбо ускорителем
7&#8419; 👩 Personal slut

✅ Вы можете иметь только одно имущество.
🅰 Введите «секретное [ID]» для получения имущества.
❌ Удалить имущество «секретное удалить»`);
});

cmd.hear(/^(?:секретное удалить|удалить секретное|«секретное удалить»)$/i, async (message, bot) => {
	if(message.user.polnom < 2) return bot(`данный раздел доступен с привилегии VIP и выше.`, {attachment: ``})
	if(!message.user.mts1) return bot(`у вас нет секретного имущества, введите «секретное [ID]» для получения ${utils.pick([`🤤`,`☺`,`🙂`,`😁`,`😏`,`🤑`])}`);

	message.user.mts1 = 0;
	return bot(`секретное имущество удалено ✅
🅰 Вы можете снова его получить по команде «секретное [ID]»`);
});

cmd.hear(/^(?:секретное)\s([1-7])$/i, async (message, bot) => {
	if(message.user.polnom < 2) return bot(`данный раздел доступен с привилегии VIP и выше.`, {attachment: ``});
	const sell = secret.find(x=> x.id === Number(message.args[1]));
	if(!sell) return bot(`такого секретного имущества не существует ${utils.pick([`😳`,`😒`,`😟`,`🙄`,`🤔`])}`);

	message.user.mts1 = sell.id;
	return bot(`теперь у вас есть ${sell.name} ✅`);
});

cmd.hear(/^(?:вип|мшз|vip|dbg|випка)$/i, async (message, bot) => {

if(message.isChat){	
if(message.user.polnom == 2) return;
if(message.user.polnom == 4) return;
if(message.user.polnom == 6) return;
if(message.user.polnom == 8) return;
if(message.user.polnom >= 10) return;
}

return bot (`вы заинтересовались покупкой товара «🏆 VIP» за 100 рублей.
	
🎲 Увеличен шанс победы во всех играх.
🎁 Увеличен лимит передачи другим игрокам. (х60)
💳 Увеличено максимальное количество денег в банке. (х2)
🗝 Возможность получать любое секретное имущество в любой момент.
🔋 Увеличено максимальное количество ферм. (12000)
💼 Нету уменьшения прибыли с бизнеса.
🚀 Ускорено получение новых работ. (х1.5)
💸 Увеличены зарплаты на работах. (X2)
💎 Увеличен ежедневный бонус.	
✍🏻 Возможность установить длинный ник.
📚 Возможность просматривать профили других игроков.
💶 Выдача игровых средств себе и другим игрокам.
📌 Возможность чистки беседы.
❓ Возможность использования команды «Кто [фраза]».
🔥 Красивая отметка в профиле.
📅 VIP статус выдается навсегда.`, {attachment:''});
});

cmd.hear(/^(?:админка|апанель|admin|адм|adm|админн|adminpanel|админ панель|одминка|admin panel|панелька|меню админа)$/i, async (message, bot) => {

if(message.isChat){	
if(message.user.polnom >= 10) return;
}

return bot (`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 999 рублей.

1&#8419; Выдача игровых средств себе и другим игрокам.
2&#8419; В вашем профиле будет красивая отметка. 
3&#8419; Возможность иметь много ферм.
4&#8419; Вы сможете ставить длинный ник. 
5&#8419; Возможность получать репорты и отвечать на них. 
6&#8419; Возможность блокировать игроков. 
7&#8419; Доступ к админ-конференции.
8&#8419; Менять ники игрокам. 
9&#8419; Банить репорт игроку.
1&#8419;0&#8419; Получать случайную ссылку на беседу. 
1&#8419;1&#8419; Увеличенные шансы в играх. 
1&#8419;2&#8419; Возможность просмотра профиля игроков по ID c подробной информацией. 
1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
1&#8419;4&#8419; Возможность бана на время.
1&#8419;5&#8419; Секретный пункт в имуществе.
1&#8419;6&#8419; Ускорено получение новых работ. (х2)
1&#8419;7&#8419; Увеличен лимит передачи другим игрокам. (х200)
1&#8419;8&#8419; Увеличено макс количество денег в банке. (х10)
1&#8419;9&#8419; Возможность разбана других игроков.
2&#8419;0&#8419; Админка выдаётся навсегда.`, {attachment:''});
});

cmd.hear(/^(?:задания|квесты|квест|👒 Квесты|👒Квесты)$/i, (message, bot) => {
if ( !('quests' in message.user) )
message.user.quests = quests.map(item => { return 0 })

let lines = [`доступные квесты:`, '']

quests.map( (quest, i) => {
lines.push(`${message.user.quests[i] >= quest.actions ? '✅' : '❌'} ${i + 1}. ${quest.name} (${utils.sp(quest.reward)}$)`) //message.user.quests.filter( (current, j) => i == j )[0] >= quest.action
})

lines.push('', '🔥 Квесты обновляются раз в 24 часа!')

return bot(lines.join('\n'))
})

resetAtMidnight()

function resetAtMidnight() {
	var now = new Date();
	var night = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
		0, 0, 0
);
var msToMidnight = night.getTime() - now.getTime();

setTimeout(function() {
	users.map(user => {
	user.quests = quests.map(item => { return 0 })
})
resetAtMidnight();
}, msToMidnight);
}

function updateStatus() {

user.api.status.set({ 
group_id: 192957181, 
text: `${utils.pick([`🔥 В беседах бот отвечает мгновенно, без задержки!`,`📝 В боте зарегистрировано: ${utils.sp(users.length - 1)} игроков.`, `🏆 В беседах бот отвечает мгновенно, без задержки!`, `💬 Игровой бот, просто напиши мне`, `💰 Игровой бот, просто напиши мне` , `👒 Проходи ежедневные квесты!`, `🐵 Игровой бот, просто напиши мне`, `🍌 Игровой бот, просто напиши мне`, `🏆 Игровой бот, просто напиши мне`, `💰 Игровой бот, просто напиши мне` , `🤑 Напиши ЛЮБОЕ сообщение в диалоге с ботом и начни ИГРАТЬ!`, `🐵 Игровой бот, просто напиши мне`, `🐒 Игровой бот, просто напиши мне`, `🔥 Напиши ЛЮБОЕ сообщение в диалоге с ботом и начни ИГРАТЬ!`, `🏆 Игровой бот, просто напиши мне`,`💯 Напиши ЛЮБОЕ сообщение в диалоге с ботом и начни ИГРАТЬ!`])}`});

}

updateStatus()
setInterval(updateStatus, 3600000)