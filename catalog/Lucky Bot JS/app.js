console.log('')
console.log('-------------------------------')
console.log('  Иман Боженька')
console.log('-------------------------------')
console.log('')

const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const commands = [];
const keyboard = Keyboard;
const request = require('prequest');
let user = new VK(); 
user.setOptions({ 
token: '' 
}); 

const https = require('https'); 
const tcpp = require('tcp-ping');
const requests = require('request'); 
const fs = require("fs"); 
const utils = require("./utils");
const rq = require("prequest");
let giving = false;

const logfile_now = 'logs_' + data() + time() + '.txt';
('logs/' + logfile_now, 'w');

const quests = [
	{ name: 'Выиграйте в трейде 3 раза подряд', reward: 350000000, actions: 3 },
	{ name: 'Угадайте стаканчик 3 раза подряд',reward: 700000000,actions: 3 },
    { name: 'Угадайте кубик 2 раза подряд', reward: 2000000000, actions: 2 },
    { name: 'Выиграйте в казино 4 раза подряд', reward: 10000000000, actions: 4 }
]

const cars = [
	{name: 'Самокат',cost: 500,id: 1},
	{name: 'Велосипед',cost: 2500,id: 2},
	{name: 'Гироскутер',cost: 5000,id: 3},
	{name: 'Сегвей',cost: 7500,id: 4},
	{name: 'Мопед',cost: 25000,id: 5},
	{name: 'Мотоцикл',cost: 50000,id: 6},
	{name: 'ВАЗ 2109',cost: 75000,id: 7},
	{name: 'Квадроцикл',cost: 80000,id: 8},
	{name: 'Багги',cost: 135000,id: 9},
	{name: 'Вездеход',cost: 200000,id: 10},
	{name: 'Лада Xray',cost: 350000,id: 11},
	{name: 'Audi Q7',cost: 750000,id: 12},
	{name: 'BMW X6',cost: 1000000,id: 13},
	{name: 'Toyota FT-HS',cost: 1750000,id: 14},
	{name: 'BMW Z4 M',cost: 2500000,id: 15},
	{name: 'Subaru WRX STI',cost: 2750000,id: 16},
	{name: 'Lamborghini Veneno',cost: 3000000,id: 17},
	{name: 'Tesla Roadster',cost: 4500000,id: 18},
	{name: 'Yamaha YZF R6',cost: 5000000,id: 19},
	{name: 'Bugatti Chiron',cost: 6500000,id: 20},
	{name: 'Thrust SSC',cost: 35000000,id: 21},
	{name: 'Ferrari LaFerrari',cost: 39000000,id: 22},
	{name: 'Koenigsegg Regear',cost: 50000000,id: 23},
	{name: 'Tesla Semi',cost: 75000000,id: 24},
	{name: 'Venom GT',cost: 125000000,id: 25},
	{name: 'Rolls-Royce',cost: 200000000,id: 26},
	{name: 'Tesla Cubertruck',cost: 1500000000,id: 27},
	{name: 'Admin`s Car',cost: 10000,id: 28},
	{name: 'BMW M5 F90',cost: 10000,id: 29},
	{name: 'Машина времени',cost: 12500,id: 30},
	{name: 'Победитель 1980',cost: 100000000000,id: 31},
  {name: 'Сани Санты',cost: 100000,id: 32}
];

const yachts = [
	{name: 'Ванна',cost: 10000,id: 1},
	{name: 'Nauticat 331',cost: 10000000,id: 2},
	{name: 'Nordhavn 56 MS',cost: 15000000,id: 3},
	{name: 'Princess 60',cost: 25000000,id: 4},
	{name: 'Azimut 70',cost: 35000000,id: 5},
	{name: 'Dominator 40M',cost: 50000000,id: 6},
	{name: 'Moonen 124',cost: 60000000,id: 7},
	{name: 'Wider 150',cost: 65000000,id: 8},
	{name: 'Palmer Johnson 42M SuperSport',cost: 80000000,id: 9},
	{name: 'Wider 165',cost: 85000000,id: 10},
	{name: 'Eclipse',cost: 150000000,id: 11},
  {name: 'Dubai',cost: 300000000,id: 12},
	{name: 'Streets of Monaco',cost: 750000000,id: 13}
];

const airplanes = [
	{name: 'Параплан',cost: 100000,id: 1},
	{name: 'АН-2',cost: 350000,id: 2},
	{name: 'Cessna-172E',cost: 700000,id: 3},
	{name: 'Supermarine Spitfire',cost: 1000000,id: 4},
	{name: 'BRM NG-5',cost: 1400000,id: 5},
	{name: 'Cessna T210',cost: 2600000,id: 6},
	{name: 'Beechcraft 1900D',cost: 5500000,id: 7},
	{name: 'Cessna 550',cost: 8000000,id: 8},
	{name: 'Hawker 4000',cost: 22400000,id: 9},
	{name: 'Learjet 31',cost: 45000000,id: 10},
	{name: 'Airbus A318',cost: 85000000,id: 11},
	{name: 'F-35A',cost: 160000000,id: 12},
	{name: 'Boeing 747-430 Custom',cost: 225000000,id: 13},
	{name: 'C-17A Globemaster III',cost: 350000000,id: 14},
	{name: 'F-22 Raptor',cost: 400000000,id: 15},
	{name: 'Airbus 380 Custom',cost: 600000000,id: 16},
	{name: 'B-2 Spirit Stealth Bomber',cost: 1359000000,id: 17}
];

const helicopters = [
	{name: 'Шарик с пропеллером',cost: 2,id: 1},
	{name: 'RotorWay Exec 162F',cost: 300000,id: 2},
	{name: 'Robinson R44',cost: 450000,id: 3},
	{name: 'Hiller UH-12C',cost: 1300000,id: 4},
	{name: 'AW119 Koala',cost: 2500000,id: 5},
	{name: 'MBB BK 117',cost: 4000000,id: 6},
	{name: 'Eurocopter EC130',cost: 7500000,id: 7},
	{name: 'Leonardo AW109 Power',cost: 10000000,id: 8},
	{name: 'Sikorsky S-76',cost: 15000000,id: 9},
	{name: 'Bell 429WLG',cost: 19000000,id: 10},
	{name: 'NHI NH90',cost: 35000000,id: 11},
	{name: 'Kazan Mi-35M',cost: 60000000,id: 12},
	{name: 'Bell V-22 Osprey',cost: 135000000,id: 13}
];

const homes = [
	{name: 'Коробка из-под холодильника',cost: 250,id: 1},
	{name: 'Подвал',cost: 3000,id: 2},
	{name: 'Палатка',cost: 3500,id: 3},
	{name: 'Домик на дереве',cost: 5000,id: 4},
	{name: 'Полуразрушенный дом',cost: 10000,id: 5},
	{name: 'Дом в лесу',cost: 25000,id: 6},
	{name: 'Деревянный дом',cost: 37500,id: 7},
	{name: 'Дача',cost: 125000,id: 8},
	{name: 'Кирпичный дом',cost: 80000,id: 9},
	{name: 'Коттедж',cost: 450000,id: 10},
	{name: 'Особняк',cost: 1250000,id: 11},
	{name: 'Дом на Рублёвке',cost: 5000000,id: 12},
	{name: 'Личный небоскрёб',cost: 7000000,id: 13},
	{name: 'Остров с особняком',cost: 12500000,id: 14},
	{name: 'Белый дом',cost: 20000000,id: 15},
	{name: 'Собственная планета',cost: 100000000000,id: 16}
];

const apartments = [
	{name: 'Чердак',cost: 15000,id: 1},
	{name: 'Квартира в общежитии',cost: 55000,id: 2},
	{name: 'Однокомнатная квартира',cost: 175000,id: 3},
	{name: 'Двухкомнатная квартира',cost: 260000,id: 4},
	{name: 'Четырехкомнатная квартира',cost: 500000,id: 5},
	{name: 'Квартира в центре Москвы',cost: 1600000,id: 6},
	{name: 'Двухуровневая квартира',cost: 4000000,id: 7},
	{name: 'Квартира с Евроремонтом',cost: 6000000,id: 8}
];

const phones = [
	{name: 'Nokia 108',cost: 250,id: 1},
	{name: 'Nokia 3310 (2017)',cost: 500,id: 2},
	{name: 'ASUS ZenFone 4',cost: 2000,id: 3},
	{name: 'BQ Aquaris X',cost: 10000,id: 4},
	{name: 'Sony Xperia XA',cost: 15000,id: 5},
	{name: 'Samsung Galaxy S8',cost: 30000,id: 6},
	{name: 'Xiaomi Mi Mix',cost: 50000,id: 7},
	{name: 'Torex FS1',cost: 75000,id: 8},
	{name: 'iPhone X',cost: 100000,id: 9},
	{name: 'Мегафон С1',cost: 250000,id: 10},
  {name: 'СантаФон',cost: 2500,id: 11}
];

const comps = [
	{name: 'Компьютер из пятерочки',cost: 500,id: 1},
	{name: 'Компьютер из Магнита',cost: 1000,id: 2},
	{name: 'Компьютер',cost: 2000,id: 3},
	{name: 'BQ Aquaris X',cost: 10000,id: 4},
	{name: 'Sony Xperia XA',cost: 15000,id: 5},
	{name: 'SamKing',cost: 30000,id: 6},
	{name: 'Xiaomi (2021)',cost: 50000,id: 7},
	{name: 'Torex',cost: 75000,id: 8},
	{name: 'Macbook',cost: 100000,id: 9},
	{name: 'HD Phantom',cost: 250000,id: 10},
	{name: 'Компудактор Санты',cost: 1000,id: 11}
];

const pets = [
	{name: 'Улитка',cost: 1000,min: 250,max: 1500,id: 1,icon: '🐌'},
	{name: 'Лягушка',cost: 25000,min: 5000,max: 15000,id: 2,icon: '🐸'},
	{name: 'Заяц',cost: 500000,min: 50000,max: 150000,id: 3,icon: '🐰'},
	{name: 'Свинья',cost: 300000000,min: 15000000,max: 30000000,id: 4,icon: '🐷'},
	{name: 'Лиса',cost: 1250000000,min: 50000000,max: 90000000,id: 5,icon: '🦊'},
	{name: 'Собака',cost: 5000000000,min: 100000000,max: 250000000,id: 6,icon: '🐶'},
	{name: 'Панда',cost: 30000000000,min: 5000000000,max: 7000000000,id: 7,icon: '🐼'},
	{name: 'Волк',cost: 180000000000,min: 15000000000,max: 32541252145,id: 8,icon: '🐺'},
  {name: 'Дракон',cost: 1000000000000,min: 100000000000,max: 200000000000,id: 9,icon: '🦖'}
];


const petsupd = [
	{cost: 2000,id: 1},
	{cost: 50000,id: 2},
	{cost: 1000000,id: 3},
	{cost: 600000000,id: 4},
	{cost: 2500000000,id: 5},
	{cost: 10000000000,id: 6},
	{cost: 60000000000,id: 7},
	{cost: 360000000000,id: 8},
  {cost: 2000000000000,id: 9}
];

const farms = [
	{name: '6U Nvidia',cost: 20500000,id: 1},
	{name: 'AntminerS9',cost: 100000000,id: 2},
	{name: 'FM2018-BT200',cost: 900000000,id: 3}
];

const businesses = [
	[
		{name: 'Шаурмечная',cost: 50000, earn: 200, workers: 1, id: 1, icon: '🥖'},
        {name: '5 шаурмечныхэ', cost: 350000, earn: 1000, workers: 10, id: 1, icon: '🥖'},
        {name: 'Небольшая сеть шаурмечных',cost: 900000,earn: 2625,workers: 30, id: 1,icon: '🥖'},
		{name: 'Средняя сеть шаурмечных',cost: 1200000,earn: 3750, workers: 50,id: 1,icon: '🥖'},
		{name: 'Лучшая шаурма в стране',cost: 4000000,earn: 11000,workers: 200,id: 1,icon: '🥖'}
	],
    [
		{name: 'Ларёк',cost: 100000,earn: 700,workers: 1,id: 2,icon: '🏪'},
		{name: '5 ларьков',cost: 500000,earn: 3700,workers: 5,id: 2,icon: '🏪'},
		{name: 'Средняя сеть ларьков',cost: 950000,earn: 7725,workers: 40,id: 2,icon: '🏪'},
		{name: 'Ларьки во всех городах страны',cost: 8000000,earn: 37450,workers: 150,id: 2,icon: '🏪'},
		{name: 'Ларьки в каждой стране',cost: 17500000,earn: 79950,workers: 400,id: 2,icon: '🏪'}
	],
	[
		{name: 'Забегаловка',cost: 300000,earn: 2700,workers: 3,id: 3,icon: '🍷'},
		{name: 'Общепит',cost: 450000,earn: 4350,workers: 7,id: 3,icon: '🍷'},
		{name: 'Ресторан',cost: 450000,earn: 7400,workers: 15,id: 3,icon: '🍷'},
		{name: 'Небольшая сеть ресторанов',cost: 4000000,earn: 19900,workers: 80,id: 3,icon: '🍷'},
		{name: 'Лучшие рестораны в стране',cost: 11000000,earn: 47400,workers: 300,id: 3,icon: '🍷'}
	],
    [
		{name: 'Мини-магазин',cost: 500000,earn: 4100,workers: 15,id: 4,icon: '🏫'},
		{name: 'Магазин',cost: 1250000,earn: 9350,workers: 10,id: 4,icon: '🏫'},
		{name: 'Сеть магазинов',cost: 3000000,earn: 23350,workers: 70,id: 4,icon: '🏫'},
		{name: 'Сеть супермаркетов',cost: 20000000,earn: 109850,workers: 500,id: 4,icon: '🏫'}
	],
	[
		{name: 'Завод в гараже',cost: 1500000,earn: 8800,workers: 5,id: 5,icon: '🏭'},
		{name: 'Средний завод',cost: 3500000,earn: 13800,workers: 20,id: 5,icon: '🏭'},
		{name: 'Сеть заводов',cost: 15000000,earn: 60800,workers: 200,id: 5,icon: '🏭'},
		{name: 'Главные заводы страны',cost: 50000000,earn: 274800,workers: 1000,id: 5,icon: '🏭'}
	],
	[
		{name: 'Угольная шахта',cost: 25000000,earn: 84700,workers: 50,id: 6,icon: '⛏'},
		{name: 'Золотая шахта',cost: 50000000,earn: 117200,workers: 75,id: 6,icon: '⛏'},
        {name: 'Алмазная шахта',cost: 60000000,earn: 229700,workers: 200,id: 6,icon: '⛏'},
		{name: 'Алмазный карьер',cost: 90000000,earn: 432700,workers: 360,id: 6,icon: '⛏'},
		{name: 'Крупнейший алмазный карьер',cost: 200000000,earn: 709700,workers: 700,id: 6,icon: '⛏'}
	],
	[
		{name: 'Маленький офис',cost: 80000000,earn: 229625,workers: 10,id: 7,icon: '🏢'},
        {name: 'Средний офис',cost: 240000000,earn: 329175,workers: 60,id: 7,icon: '🏢'},
        {name: 'Большой офис',cost: 240000000,earn: 614675,workers: 200,id: 7,icon: '🏢'},
		{name: 'Офис-небоскрёб',cost: 1000000000,earn: 1227275,workers: 700,id: 7,icon: '🏢'}
	],
    [
		{name: 'Любительский GameDev',cost: 150000000,earn: 302000,workers: 5,id: 8,icon: '🕹'},
		{name: 'Инди GameDev',cost: 200000000,earn: 379500,workers: 10,id: 8,icon: '🕹'},
		{name: 'AA GameDev',cost: 750000000,earn: 1024500,workers: 50,id: 8,icon: '🕹'},
		{name: 'AAA GameDev',cost: 5000000000,earn: 6749500,workers: 500,id: 8,icon: '🕹'}
	],
	[
		{name: 'Нефтевышка',cost: 500000000,earn: 707000,workers: 8,id: 9,icon: '🏜'},
		{name: 'Нефтеплатформа в море',cost: 750000000,earn: 1019000,workers: 20,id: 9,icon: '🏜'},
		{name: 'Нефтеплатформа в океане',cost: 1250000000,earn: 4049000,workers: 50,id: 9,icon: '🏜'},
		{name: '5 нефтеплатформ в океане',cost: 5000000000,earn: 15249000,workers: 250,id: 9,icon: '🏜'}
	],
	[
		{name: 'Мини АЭС',cost: 800000000,earn: 1050700,workers: 40,id: 10,icon: '💡'},
		{name: 'Средняя АЭС',cost: 1200000000,earn: 1496200,workers: 75,id: 10,icon: '💡'},
		{name: 'АЭС с 5 энергоблоками',cost: 4250000000,earn: 3088700,workers: 300,id: 10,icon: '💡'},
		{name: 'Крупнейшая АЭС',cost: 10000000000,earn: 34843700,workers: 650,id: 10,icon: '💡'}
	],
	[
		{name: 'Космическое агенство',cost: 25000000000,earn: 250000000,workers: 75,id: 11,icon: '🗺'},
		{name: 'Улучшенное космическое агенство',cost: 3000000000000,earn: 1000000000,workers: 150,id: 11,icon: '🗺'},
		{name: 'Штат космических агенств',cost: 9000000000000,earn: 5000000000,workers: 250,id: 11,icon: '🗺'},
		{name: 'Все космические агенства в мире',cost: 20000000000000,earn: 11000000000,workers: 500,id: 11,icon: '🗺'},
		{name: 'Самое лучшее космическое агенство',cost: 100000000000000,earn: 45000000000,workers: 1000,id: 11,icon: '🗺'},
		{name: 'Программа космических агенств',cost: 200000000000000,earn: 75000000000,workers: 1500,id: 11,icon: '🗺'},
		{name: '[TOP] космическое агенство',cost: 200000000000000,earn: 75000000000,workers: 1500,id: 12,icon: '🗺'}
	]
];

const manic = [
	{name: 'Monfury B8',cost: 400000000,earn: 416000,id: 1,icon: '🖨'},
	{name: 'Avalon E9',cost: 1100000000,earn: 15830000,id: 2,icon: '🖨'},
	{name: 'Dragon Z5',cost: 3700000000,earn: 41690000,id: 3,icon: '🖨'},
	{name: 'Estelon 4',cost: 10300000000,earn: 125000000,id: 4,icon: '🖨'},
	{name: 'XSUT X5',cost: 22900000000,earn: 300000000,id: 5,icon: '🖨'},
	{name: 'MoneyMaker V2',cost: 50800500000,earn: 700000000,id: 6,icon: '🖨'},
	{name: 'Giant X10',cost: 40000000000000,earn: 1300000000,id: 7,icon: '🖨'}
];

const works = [
	{name: 'Дворник',requiredLevel: 1,min: 2000,max: 2500,id: 1},
	{name: 'Сантехник',requiredLevel: 3,min: 3750,max: 4000,id: 2},
	{name: 'Электрик',requiredLevel: 5,min: 4000,max: 4500,id: 3},
	{name: 'Слесарь',requiredLevel: 8,min: 5000,max: 5500,id: 4},
	{name: 'Юрист',requiredLevel: 10,min: 7500,max: 8000,id: 5},
	{name: 'Бухгалтер',requiredLevel: 14,min: 9000,max: 9489,id: 6},
	{name: 'Бармен',requiredLevel: 22,min: 10000,max: 12500,id: 7},
	{name: 'Администратор',requiredLevel: 25,min: 12500,max: 13500,id: 8},
	{name: 'Программист',requiredLevel: 49,min: 16000,max: 17500,id: 9}
];

let promo = "0";

const rotateText = {
	q: 'q', w: 'ʍ', e: 'ǝ', r: 'ɹ', t: 'ʇ', y: 'ʎ', u: 'u', i: 'ᴉ', o: 'o', p: 'p', a: 'ɐ', s: 's', d: 'd', f: 'ɟ',
	g: 'ƃ', h: 'ɥ', j: 'ɾ', k: 'ʞ', l: 'l', z: 'z', x: 'x', c: 'ɔ', v: 'ʌ', b: 'b', n: 'n', m: 'ɯ', й: 'ņ', ц: 'ǹ', у: 'ʎ',
	к: 'ʞ', е: 'ǝ', н: 'н', г: 'ɹ', ш: 'm', щ: 'm', з: 'ε', х: 'х', ъ: 'q', ф: 'ф', ы: 'ıq', в: 'ʚ', а: 'ɐ',п: 'u', р: 'd',
	о: 'о', л: 'v', д: 'ɓ', ж: 'ж', э: 'є', я: 'ʁ', ч: 'һ', с: 'ɔ', м: 'w', и: 'и', т: 'ɯ', ь: 'q', б: 'ƍ', ю: 'oı'
}

let btc = 6000;

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

const users = require('./database/users.json');
const botinfo = require('./database/botinfo.json');
const convers = require('./database/convers.json');
const clans = require('./database/clans.json');
const config = require('./database/config.json');  
const prez = require('./database/prez.json');
let buttons = [];

function displayTime(ticksInSecs) { 
var ticks = ticksInSecs; 
var hh = Math.floor(ticks / 3600); 
var mm = Math.floor((ticks % 3600) / 60); 
var ss = ticks % 60; 

return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) ); 
} 

function rand(min, max) {
		return Math.round(Math.random() * (max - min)) + min
	}

function pad(n, width) { 
var n = n + ''; 
return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
}

function getUnix() {
	return Date.now();
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;

	var s = stamp % 60;
	stamp = ( stamp - s ) / 60;

	var m = stamp % 60;
	stamp = ( stamp - m ) / 60;

	var	h = ( stamp ) % 24;
	var	d = ( stamp - h ) / 24;

	var text = ``;

	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";

	return text;
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

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

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
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

setInterval(async () => { 
users.map(user => { 
if(user.manic) 
{ 
const tool = manic.find(x=> x.id === user.manic); 
if(!tool) return;

user.mnc += tool.earn; 
} 
});
}, 300000); 

	setInterval(() => {
for(a in users) {
users[a].active++;
}
}, 2000);


function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.ataka = false;
		user.timers.farm_btc = false;
		user.timers.hack = false;
		user.timers.poxod = false;
		user.timers.poxod2 = false;
		user.timers.bonus = false;
		user.promo = 0;
		user.energy = 10;
		user.timers.peredat = false;
		user.timers.vidat = false;
	});
}

clearTemp(); 
setInterval(async () => { 
		users.map(user => { 
		user.timers.bonus -= 1; 
		user.timers.poxod -= 1; 
		user.timers.poxod2 -= 1; 
		user.timers.hack -= 1; 
		user.timers.farm_btc -= 1;
		user.timers.vidat -= 1;
		user.timers.peredat -= 1;
		user.timers.ataka -= 1;
}); 
}, 1000);

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

setInterval(() => {
			fs.writeFileSync("./database/users.json", JSON.stringify(users, null, "\t"));
			fs.writeFileSync("./database/prez.json", JSON.stringify(prez, null, "\t"));
			fs.writeFileSync("./database/botinfo.json", JSON.stringify(botinfo, null, "\t"));
			fs.writeFileSync("./database/clans.json", JSON.stringify(clans, null, "\t"));
			fs.writeFileSync("./database/config.json", JSON.stringify(config, null, "\t"));
		}, 15000);

clearTemp();
clearPromo();

vk.setOptions({ token: '', pollingGroupId:  });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club187736695|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club187736695|(.*)\]/ig, '').trim();
	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 50000000,
		  sun: 1,
    	bank: 50000,
			active: 0,
			noactive: 0,
			btc: 0,
			business: [],
			cmd: true,
			farm_btc: 0,
			farms: 0,
			bantop: false,
			farmslimit: 2000,
			ded: 1,
      gort: 0,
      subs: 0,
      gg: 0,
      krut: 0,
      herov: 0,
      ced: 0,
      yuo: 1,
      hero: 1,
      mnc: 0,
			subscribe: true,
			manic: 0,
			energy: 10,
			opit: 0,
			biz: 0,
			zhelezo: 0,
			zoloto: 0,
			manic_pribil: 0,
			tur: 0,
			dostuptur: 0,
			almaz: 0,
      rub: 0,
   	  case6: 0,
      case7: 0,
    	bizlvl: 0,
			manic_lvl: 1,
			nicklimit: 16,
			rating: 1,
			regDate: `${data()}, ${time()}`,
			mention: true,
			ban: false,
			timers: {
				hasWorked: false,
				bonus: false,
				poxod: false,
				poxod2: false,
				kopat: false,
				hack: false,
				vidat: false,
				peredat: false,
				ataka: false,
        sunt: false,
        sunt2: false,
        good: false,
        team: false,
        sunt3: false,
        geart: false,
        hear: false
    	},
			tag: user_info.first_name,
			work: 0,
			notifications: true,
			exp: 0,
			level: 1,
			case1: 0,
			case2: 0,
			case3: 0,
			case4: 0,
			referal: null,
			promo: false,
			prez: false,
			izum: 0,
      case5: 0,
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
				manic: 0,
			  comp: 0,
        dad: 0,
       	pet: 0,
			},
			settings: {
				firstmsg: true,
				adm: 1,
				trade: true,
		    agent: 1,
        bog: 1,
      	old: false,
				limit: 1000000000000,
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
	}
	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if(message.user.ban == true)
	{

		if(message.isChat) return;
		if(!message.isChat) return bot(`ваш аккаунт заблокирован навсегда! ⛔`);
	}

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.settings.firstmsg)
	{

bot(`🎁 » я вижу ты новенький! Рад познакомиться, отправь «помощь» чтобы узнать мои команды. 👍`, 
{ 
	keyboard:JSON.stringify( 
	{ 
	"one_time": false, 
	"buttons": [ 
	[{ 
	"action": { 
	"type": "text", 
	"payload": "{\"button\": \"1\"}", 
	"label": "🏆 Лучшие кланы" 
	}, 
	"color": "positive" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "📦 Сундуки" 
	}, 
	"color": "positive" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "💽 Ферма" 
	}, 
	"color": "primary" 
	}], 
	[{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "💼 Бизнесы" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🖨 Маники" 
	}, 
	"color": "primary" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": "👒 Квесты" 
}, 
"color": "negative" 
	}] 
] 
}) 
});

       message.user.settings.firstmsg = false;


		return message.sendSticker(14085);

	}

	if(!command)
	{

		if(message.isChat) return;
		if(!message.isChat) return bot(`такой команды не существует, отправь «помощь» что бы узнать мои команды. 🎲`) 
}

	if(message.user.exp >= 1)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	botinfo.msg += 1;

	let follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 178616730 }); 
	message.user = users.find(x=> x.id === message.senderId); 
if(!message.isChat) {
	if(!follow){ 
	message.send(`⚔️ Буду благодарен если [club178616730|подпишешься на нашего Сотрудника], отличный Бот`); 
	}
}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	fs.appendFile('logs/' + logfile_now, '\n' + data() + ', ' + time() + ' | ' + message.user.settings.adm.toString().replace(/1/gi, "Простой Игрок").replace(/2/gi, "🔥 VIP-статус").replace(/3/gi, "🌀 Premium-Статус").replace(/4/gi, "🔥 Администратор").replace(/5/gi, "📱 Гл Администратор").replace(/6/gi, "🎅 Санта").replace(/7/gi, "📀 Владелец ").replace(/8/gi, "🌺 Легендарный Боженька") + ' | uID:' + message.user.uid + ' |  URL: https://vk.com/id' + message.user.id + ' | ' + message.text, err => { if(err) console.log(err) }) 
	console.log(` ^^^^^^^^^^^^^^^^^^^^^^^^^`)
	console.log(` command: ${message.text}.`)
	console.log(` ^^^^^^^^^^^^^^^^^^^^^^^^^`)
});

const cmd = {
    hear: (p, f) => {
        commands.push([p, f]);
    }
}

cmd.hear(/^(?:помощь)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].toLowerCase();

	if(message.args[1] === 'переверни')
	{
		return message.send(`Команда "Переверни" пишет ваш текст вверх ногами (Поддерживаются цифры, буквы латинского и кириллического алфавита, а также некоторые символы)`);
	} else if(message.args[1] === 'шар') {
		return message.send(`Команда "Шар" используя магию рандома выводит случайное сообщение.`);
	} else if(message.args[1] === 'инфа') {
		return message.send(`Команда "Инфа" случайным образом присылает шанс чего-либо. Также можно использовать команды "Шанс" или "Вероятность"`);
	} else if(message.args[1] === 'выбери') {
		return message.send(`Команда "Выбери" случайным образом выбирает один из двух предложенных вариантов.`);
	} else if(message.args[1] === 'казино') {
		return message.send(`Команда "Казино" случайным образом умножает вашу ставку (Могут выпасть множители х0, х0.25, х0.5, x0.75, х1, х2, х5, х50 x999). Чтобы поставить всю сумму введите "Казино все" или "Казино вабанк"`);
	} else if(message.args[1] === 'кубик') {
		return message.send(`Команда "Кубик" сравнивает ваше число со случайным от 1 до 6, если вы угадали, то получаете вознаграждение. Также можно использовать "Куб"`);
	} else if(message.args[1] === 'трейд') {
		return message.send(`Команда "Трейд" - симулятор бинарных опционов. Введите "Трейд вверх (сумма)" если думаете, что курс валюты будет увеличиваться, или "Трейд вниз (сумма)" если будет уменьшаться.`);
	} else if(message.args[1] === 'стаканчик') {
		return message.send(`С помощью команды "Стаканчик" вы можете сыграть в аналог игры "Напёрстки". Чтобы играть введите "Стаканчик [1-3] [сумма]".`);
	} else if(message.args[1] === 'работа') {
		return message.send(`С помощью команды "Работа" вы можете устроиться на одну из работ. Чтобы отрыть новые профессии, вам нужно отработать определённое кол-во игровых недель (Команда "Работать"). Для увольнения с работы введите "Уволиться".`);
	} else if(message.args[1] === 'бизнес') {
		return message.send(`Владея бизнесом, вы можете зарабатывать немало денег:
		Бизнесы [номер] - купить бизнес
		Бизнес - ваш бизнес
		Бизнес снять - снять деньги со счёта бизнеса
		Продать бизнес - продажа бизнеса`);
	} else if(message.args[1] === 'реши') {
		return message.send(`Команда "Реши" решает ваш пример (Реши 5 + 5).
		Команда умеет:
		Складывать (+)
		Вычитать (-)
		Умножать (*)
		Делить (/)`);
	} else if(message.args[1] === 'курс') {
		return message.send(`С помощью команды "Курс" можно узнать курс Биткоина на данный момент.`);
	} else if(message.args[1] === 'профиль') {
		return message.send(`Команда "Профиль" выводит вашу игровую статистику.`);
	} else if(message.args[1] === 'баланс') {
		return message.send(`Команда "Баланс" выводит кол-во валюты на вашем аккаунте.`);
	} else if(message.args[1] === 'банк') {
		return message.send(`При вводе команды "Банк" (без параметров) выводится ваша сумма на счёте. Для того чтобы положить на счёт деньги введите "Банк [сумма]" (Максимум 250.000.000.000$). Чтобы забрать деньги из банка введите "Банк снять/взять [сумма]".
		Сумма в банке увеличивается каждый час (больше сумма - больше прибыль).`);
	} else if(message.args[1] === 'рейтинг')
	{
		return message.send(`Пустая команда "Рейтинг" (без параметров) выводит ваше кол-во рейтинга (также можно узнать в профиле). При указании параметра (любое число) вы купите данное кол-во единиц рейтинга (👑1 = 250.000.000$). Рейтинг влияет на ваше положение в топе.`);
	} else if(message.args[1] === 'ник') {
		return message.send(`С помощью команды "Ник" можно выбрать себе ник длинною до 15 символов. Также, ник можно делать кликабельным/некликабельным в топе "Ник вкл" и "Ник выкл"`);
	} else if(message.args[1] === 'магазин') {
		return message.send(`Команда "Магазин" выводит список категорий товаров, которые доступны для покупки.`);
	} else if(message.args[1] === 'продать') {
		return message.send(`С помощью команды "Продать" вы можете продать любой предмет (Машину, дом, квартиру, телефон, яхту, самолет, вертолет, биткоин, ферму).`);
	} else if(message.args[1] === 'передать') {
		return message.send(`Команда "Передать" переводит указанную вами сумму любому игроку (Передать ${message.user.uid} 1000).`);
	} else if(message.args[1] === 'топ') {
		return message.send(`Команда "Топ" выводит 10 игроков с самым большим рейтингом.`);
	} else if(message.args[1].includes('брак')) {
		return message.send(`Используя команды "Брак", "Браки", "развод", вы можете жениться/выходить замуж/разводиться.
		Брак [id] - сделать предложение
		Браки - список предложений
		Развод - ...`);
	} else if(message.args[1] === 'дата') {
		return message.send(`Команда "Дата" выводит дату регистрации человека в боте. Можно использовать id человека.`);
	} else if(message.args[1] === 'репорт') {
		return message.send(`С помощью команды "Репорт" вы можете отправить создателю бота любое сообщение. Также можно использовать "Реп", "Жалоба", "Rep".`);
	}
});

cmd.hear(/^(?:обновить)/i, async (message) => {
if(message.senderId != 496175718 && message.senderId != 545423358) return;
for (i in users) {
	users[i].business=[]
	users[i].biz=0
	users[i].misc.farms=0
	users[i].misc.farm_count=0
}
});

cmd.hear(/^(?:ФиксТ)$/i, async (message, bot) => { 
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].timers.hasWorked = false;
	users[i].timers.bonus = false;
	users[i].timers.poxod = false;
	users[i].timers.poxod2 = false;
  users[i].timers.kopat = false;
  users[i].timers.hack = false;
  users[i].timers.vidat = false;
	users[i].timers.peredat = false;
	users[i].timers.ataka = false;
  users[i].timers.sunt = false;
  users[i].timers.sunt2 = false;
  users[i].timers.good = false;
  users[i].timers.team = false;
	} 
	} 
	return message.send(`готово!`);
});
cmd.hear(/^(?:Вайп)$/i, async (message, bot) => { 
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].settings.adm = 1;
	users[i].rating = 0;
	users[i].balance = 50000000;
	users[i].bank = 500000;
  } 
	} 
	return message.send(`готово!`);
});
cmd.hear(/^(?:newp)$/i, async (message, bot) => { 
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
 users[i].misc.pet = 0;
  } 
	} 
	return message.send(`готово!`);
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

cmd.hear(/^(?:фиксануть нахуй)/i, async (message) => {
  if(message.senderId != 496175718 && message.senderId != 545423358) return;
   for (i in users) {
users[i].balance=5000000000;
users[i].rating=1000;
}
return message.send(`ФИКСАНУЛ НАХУЙ БЛЯТЬ ЕБАТЬ ТЕБЯ В СРАКУ :DDDDDDDDDDDDDDDDDDD`)
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

cmd.hear(/^(?:Рассылка)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot('вы выключили рассылку');
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.notifications = true;
		return bot('вы включили рассылку');
	}
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около', "наверное это"]);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:донат|🎁 Донат|🛒 Донат)$/i, async (message, bot) => {
	return bot(`Вы заинтересовались покупкой Доната
1.🌀 » Гл. Админ - 250 Доната
2.🌐 » Админ - 150 Доната
3.⚔️ » Вип - 25 Доната
4. 💷 » Валюта 1кккк - 9 Доната
5. 💷 » Валюта 1ккк - 3 Доната
6. 🖥️ » Маник: Giant X10 - 59 Доната
7. 🗡️ » Premium-Статус - 50 Доната
8. 🌸 » Супер-Сундук - 35 Доната

Чтобы Купить Донат/Валюту пишите [Донатик [Ид]
`)
});
cmd.hear(/^(?:донатик 8)$/i, async (message, bot) => {
			if(message.user.rub < 35) return bot (`недостаточно средств.`);
			message.user.rub -= 35
			message.user.case4 += 1;
			bot(`Вы Приобрели «Вы приобрели «Супер-Сундук»`);
			return message.sendSticker(16365);
		});
cmd.hear(/^(?:донатик 7)$/i, async (message, bot) => {
			if(message.user.rub < 50) return bot (`недостаточно средств.`);
			message.user.rub -= 50
			message.user.settings.adm = 3;
			bot(`Вы Приобрели «Вы приобрели Премиум-Статус»`);
			return message.sendSticker(16545);
		});
cmd.hear(/^(?:донатик 6)$/i, async (message, bot) => {
			if(message.user.rub < 59) return bot (`недостаточно средств.`);
			message.user.rub -= 59
			message.user.manic = 7;
			bot(`Вы Приобрели «Денежный Принтер Giant X10»`);
			return message.sendSticker(16545);
		});
cmd.hear(/^(?:донатик 5)$/i, async (message, bot) => {
			if(message.user.rub < 3) return bot (`недостаточно средств.`);
			message.user.rub -= 3
			message.user.balance += 1000000000;
			bot(`Вы Приобрели «1ккк»`);
			return message.sendSticker(16945);
		});
cmd.hear(/^(?:донатик 4)$/i, async (message, bot) => {
			if(message.user.rub < 9) return bot (`недостаточно средств.`);
			message.user.rub -= 9
			message.user.balance += 1000000000000;
			bot(`Вы Приобрели «1кккк»`);
			return message.sendSticker(16945);
		});
cmd.hear(/^(?:донатик 3)$/i, async (message, bot) => {
			if(message.user.rub < 25) return bot (`недостаточно средств.`);
			message.user.rub -= 25
			message.user.settings.adm = 2;
			bot(`Вы Приобрели «Vip-Статус»`);
			return message.sendSticker(16945);
		});

cmd.hear(/^(?:донатик 2)$/i, async (message, bot) => {
			if(message.user.rub < 150) return bot (`недостаточно средств.`);
			message.user.rub -= 150
			message.user.settings.adm = 4;
			bot(`Вы Приобрели «Администратора»`);
			return message.sendSticker(16946);
		});
cmd.hear(/^(?:донатик 1)$/i, async (message, bot) => {
			if(message.user.rub < 250) return bot (`недостаточно средств.`);
			message.user.rub -= 250
			message.user.settings.adm = 5;
			bot(`Вы Приобрели «Главного Администратора»`);
			return message.sendSticker(3367);
		});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
    message.sendSticker(1)
});

cmd.hear(/^(?:открыть)$/i, async (message, bot) => {
	if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Доступ к ней доступен только игрокам, которые учавствуют в раздачах.`);
	return bot(`вы открыли посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины. 🙀
	
	⛳ Что бы начать введите «викторина»`);
});

cmd.hear(/^(?:extended.dostupvip = actived;true)$/i, async (message, bot) => {
	if(message.user.settings.adm < 5) return bot(`вы не администратор.`)
	message.user.tur = 0;
	message.user.dostuptur = 1;
	return bot(`выполнил "extended.dostupvip = actived;true", подробности:
	errors: 0
	dumbs: 0`);
});
cmd.hear(/^(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start)$/i, async (message, bot) => {
	await bot(`мои команды:

🎉 Развлекательные: 
⠀⠀ 😐 Анекдот 
⠀⠀  ↪ Переверни [фраза] 
⠀⠀ 🔮 Шар [фраза] 
⠀⠀ ⚖ Выбери [фраза] или [фраза] 
⠀⠀ 📊 Инфа [фраза] 
⠀⠀ 📈 Курс 

👔 Работа - список работ
⠀⠀ 🔨 Работать
⠀⠀ ❌ Уволиться

💼 Бизнес: 
⠀⠀ 📈 Бизнес [1-2] - статистика 
⠀⠀ 💵 Бизнес снять [1-2] [сумма]
⠀⠀ ✅ Бизнес улучшить [1-2]
       ⚡ Бизнес нанять [1-2] [количество]

🌽 Питомцы: 
⠀⠀🐒 Питомец - информация 
⠀⠀🐪 Питомец поход 
⠀⠀🌟 Питомец улучшить 

🖥 Маник - статистика
⠀⠀ 💶 Маник собрать
⠀⠀ 💧 Маник магазин
⠀⠀ ❓ Маник помощь

🚀 Игры: 
⠀⠀ 🎲 Кубик [1-6] 
⠀⠀ 🎰 Казино [ставка] 
⠀⠀ 📈 Трейд [вверх/вниз] [ставка] 
⠀⠀ 🥛 Стаканчик [1-3] [ставка] 
⠀⠀ 🔦 Сейф [число 10-99] 
⠀⠀ 🍂 Копать 
⠀⠀🌲 Поход
⠀⠀🚕 Таксовать
⠀⠀ 👮 Взломать 
      📱 Играть
       🖥️ Игры

📚 Основные: 
⠀⠀ 📖 Профиль
⠀⠀ 💲 Баланс
⠀⠀ 💰 Банк [сумма/снять сумма] 
⠀⠀ 👑 Рейтинг - ваш рейтинг 
⠀⠀ ✒ Ник [ник/вкл/выкл] 
⠀⠀ 🛒 Магазин 
⠀⠀ 🔋 Ферма - биткоин ферма 
⠀⠀ 💸 Продать [предмет] 
⠀⠀ 📦 Сундуки
⠀⠀ 🤝 Передать [id] [сумма] 
⠀⠀ 🏆 Топ 
⠀⠀ 🛍 Донат 
⠀⠀ 👒 Квесты
⠀⠀ 💞 Брак [id] - пожениться 
⠀⠀ 💔 Развод 
⠀⠀ 💎 Бонус - ежедневный бонус 
       ? Президент
       ? Президент заявка [сумма]

🍀 Беседы - беседы с ботом
🔁 Кнопки [кнопка, кнопка../удалить]
👥 Рассылка [Выкл/Вкл]
🆘 Репорт [текст] - ошибки или пожелания`, );
message.sendSticker(12115);
});

cmd.hear(/^(?:профиль|@infinitywars_1 🔍 Профиль|🔍 Профиль|проф)$/i, async (message, bot) => {
	let text = ``;
	clanid = message.user.clanid

	text += `🔎 ID: ${message.user.uid}\n`;
	if(message.user.prez)text += `🤵 Президент\n`;
 	text += `⭐ Статус: ${message.user.settings.adm.toString().replace(/1/gi, "Простой Игрок").replace(/2/gi, "🔥 VIP-статус").replace(/3/gi, "🌀 Premium-Статус").replace(/4/gi, "🔥 Администратор").replace(/5/gi, "📱 Гл Администратор").replace(/6/gi, "🎅 Санта").replace(/7/gi, "📀 Владелец ").replace(/8/gi, "🌺 Легендарный Боженька").replace(/9/gi, "🖥️ Разработчик")}\n`;
  text += `🖥️ Киберспортсмен: ${message.user.krut.toString().replace(/0/gi, "➖").replace(/1/gi, "➕")}\n`;
  text += `🎟️ Сыграно Игр: ${utils.rn(message.user.gg)}\n`;
  text += `📱 Побед в игре: ${message.user.ced}\n`;
  text += `🖥️ Проигрышев в игре: ${message.user.herov}\n`;
  text += `⚔️Префикс: ${message.user.settings.agent.toString().replace(/1/gi, "Нету").replace(/2/gi, "🖍️ Фломастер").replace(/3/gi, "📀 Боженька").replace(/4/gi, "🎅 Санта").replace(/5/gi, "🤴 Король").replace(/6/gi, "🌀 Нелюдь").replace(/7/gi, "⚔️ Звёздочка").replace(/8/gi, "🌐 ЛЕГЕНДАРНАЯ ЗЕМЛЯ 🌐")}\n`;
	if(clans[clanid]) {
	text += `⚔ Клан: ${clans[clanid].name}\n`; 
	};
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += ` [${utils.rn(message.user.balance)}$]\n`;
  text += `💷 Донат Рубли: ${utils.sp(message.user.rub)}₽\n`;
  text += `🖥️ Выбранная Игра: ${message.user.ded.toString().replace(/1/gi, "Не Выбрано.").replace(/2/gi, "Brawl Stars⭐").replace(/3/gi, "Dota2⚔️").replace(/4/gi, "CS:GO🔪").replace(/5/gi, "Minecraft 🎁").replace(/6/gi, "ROBLOX🗺️").replace(/7/gi, "World Of Tanks🌐").replace(/8/gi, "Fortnite🖥️").replace(/9/gi, "Лицензия Майнкрафта📱")}\n`;
  if(message.user.marriage.partner)text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
  if(message.user.marriage.partner)text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(message.user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;
	text += `🗺️ Должность: ${message.user.settings.bog.toString().replace(/1/gi, "Простой Игрок").replace(/2/gi, "Конкурсовод 🎉").replace(/3/gi, "🌸 Владелец").replace(/4/gi, "🖥️ Кодер").replace(/5/gi, "🗡️ Заместитель Владельца").replace(/6/gi, "👥 Тех Поддержка").replace(/7/gi, "⚔️ Помощник").replace(/8/gi, "🖥️ Разработчик")}\n`;
  if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].tag}\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet || message.user.manic)
	{
		text += `\n🗝 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏡 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀${pets[message.user.misc.pet - 1].icon} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.manic) text += `⠀💸 Денежный принтер: ${manic[message.user.manic - 1].name} 📇\n`;
		if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name} (${message.user.misc.farm_count} шт.)\n`;
	  if(message.user.misc.comp) text += `⠀🖥️ Компьютер: ${comps[message.user.misc.comp - 1].name}\n`;
  }
	{
			for(var i = 0; i < message.user.business.length; i++)
			{
				text += `⠀${ businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].icon } ${businesses[message.user.business[i].id - 1][message.user.business[i].upgrade - 1].name}\n`;
			}
		}

	text += `\n🗓 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});
cmd.hear(/^(?:бан 999|бан 6)/i, async (message) => {

return message.send(`
А хуй забанить не пробовал?
`)
});
cmd.hear(/^(?:pget)$/i, async (message, bot) => {

if(message.user.settings.adm < 2) return;
if(!message.forwards[0] || message.replyMessage) return message.reply(`Перешлите сообщение.`);
let c = message.forwards[0].senderId;
let b = users.find(x=> x.id === Number(c));
message.send(`
🔎 ID: ${utils.sp(b.uid)}
📗 Имя: *id${c} (${b.tag})
💰 Баланс: ${utils.sp(b.balance)}
💷 Донат Рубли: ${utils.sp(b.rub)}
💳 В банке: ${utils.sp(b.bank)}
🌐 Айди ВК: ${b.id}
 VK: https://vk.com/id${b.id}
`);
if(message.replyMessage) { 
let c = message.replyMessage.senderId
let b = users.find(x=> x.id === Number(c));
message.send(`
🔎 ID: ${utils.sp(b.uid)}
📗 Имя: *id${c} (${b.tag})
💰 Баланс: ${utils.sp(b.balance)}
💳 В банке: ${utils.sp(b.bank)}
🌐 Айди ВК: ${utils.sp(b.id)}
 VK: https://vk.com/id${b.id}
`);
}
});
 cmd.hear(/^(?:setadm)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 285443942) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] > 9) return message.send(` 🔸 >> Максимальный админ-уровень 9!`)
  if(!Number(message.args[1] || message.args[2])) return message.send(`Должно быть число!`);
	if(!message.args[1]) {
 return message.send(`👥 -> Введите Ид Юзера`);
 } else if(!message.args[2]) {
 	return message.send(`👥 -> введите число.`);
 }
 user.settings.adm = message.args[2];
 return message.send(`Вы установили админку ${utils.sp(message.args[2])} игроку *id${user.id} (${user.tag})`);
 });

cmd.hear(/^(?:setdol)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 285443942) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] > 8) return message.send(` 🔸 >> Максимальный дол-уровень 8!`)
  if(!Number(message.args[1] || message.args[2])) return message.send(`Должно быть число!`);
	if(!message.args[1]) {
 return message.send(`👥 -> Введите Ид Юзера`);
 } else if(!message.args[2]) {
 	return message.send(`👥 -> введите число.`);
 }
 user.settings.bog = message.args[2];
 return message.send(`Вы установили админку ${utils.sp(message.args[2])} игроку *id${user.id} (${user.tag})`);
 });
cmd.hear(/^(?:ппередать)\s(.*)/i, async (message) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	let c = message.forwards[0].senderId;
	let b = users.find(x=> x.id === Number(c));
	
	if(!b) return message.send(`Данный человек не зарегистрирован в боте.`);
	if(!message.forwards[0]) return message.send(`Перешлите сообщение!`);
	if(message.user.balance < message.args[1]) return message.send(`У вас денег меньше, чем предлагаемая сумма.`);
	if(!message.args[1]) return message.send(`Пример команды: ппередать [пересланное сообщение] [сумма]`);
	if(!Number(message.args[1])) return message.send(`только число!`);
	users[b.uid].balance += message.args[1]
	message.user.balance -= message.args[1]
	return message.send(`Вы успешно перевели *id${b.id} (${b.tag}) ${utils.sp(message.args[1])}$`);
});

cmd.hear(/^(?:Статистика)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 4) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

	1&#8419; Ваш питомец никогда не потеряется в походе. 
	2&#8419; В вашем профиле будет красивая отметка. 
	3&#8419; У вас не будет лимита на фермы. 
	4&#8419; Вы сможете ставить длинный ник. 
	5&#8419; Возможность получать репорты и отвечать на них. 
	6&#8419; Возможность блокировать игроков. 
	7&#8419; Выдача игровых средств в любом количестве. 
	8&#8419; Менять ники игрокам. 
	9&#8419; Выдавать длинные ники другим игрокам. 
	1&#8419;0&#8419; Получать случайную ссылку на беседу. 
	1&#8419;1&#8419; Увеличенные шансы в казино. 
	1&#8419;2&#8419; Возможность просмотра профиля игроков по ID c подробной информацией. 
	1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
	1&#8419;4&#8419; ✅ NEW - Разрешение на продажу ДОПОЛНЕНИЙ другим игрокам! 
		
		🔑 Покупать у https://vk.com/perpnameis
		
		🆘 При оплате вам необходимо ввести свой ID.`, {attachment:'market-187736695_3425202'});

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);
			let text = ``;	
	
			text += `🔎 ID: ${user.uid}\n`;
			if(user.settings.adm > 2)text += `${user.settings.adm.toString().replace(/2/gi, "👑 VIP").replace(/3/gi, "🔥 Администратор").replace(/4/gi, "Обычный игрок").replace(/5/gi, "🔥 Администратор")}\n`;
			text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
			if(user.marriage.partner)text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
			if(user.marriage.partner)text += `💽 Биткоинов: ${utils.sp(user.btc)}฿\n`;
			text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
			text += `🏋 Энергия: ${utils.sp(user.energy)}\n`;
			text += `🏆 Опыт: ${utils.sp(user.opit)}\n`;
			if(user.marriage.partner) text += `👬 Партнер: ${users[user.marriage.partner].tag}\n`;
		
			if(user.transport.car || user.transport.yacht || user.transport.airplane || user.transport.helicopter ||
				user.realty.home || user.realty.apartment ||
				user.misc.phone || user.misc.farm || user.business || user.misc.pet || user.manic)
			{
				text += `\n🗝 Имущество:\n`;
		
				if(user.transport.car) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
				if(user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
				if(user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
				if(user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;
				
				if(user.realty.home) text += `⠀🏡 Дом: ${homes[user.realty.home - 1].name}\n`;
				if(user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;
		
				if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
				if(user.misc.pet) text += `⠀${pets[user.misc.pet - 1].icon}Питомец: ${pets[user.misc.pet - 1].name}\n`;
				if(user.manic) text += `⠀💸 Денежный принтер: ${manic[user.manic - 1].name} 📇\n`;
				if(user.misc.farm) text += `⠀🔋 Фермы: ${farms[user.misc.farm - 1].name} (x${user.farms})\n`;
				if(user.business) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;

			}
			text += `\n🗓 Дата регистрации: ${user.regDate}`;
	return bot(`профиль игрока №${user.uid}\n${text}`);
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
	if(message.user.bank < 1) return bot(`ваш банковский счет пуст.`);
	return bot(`на балансе в банке ${utils.sp(message.user.bank)}$
✍🏻 Введите "Банк [кол-во]" для пополнения`);
});

cmd.hear(/^(?:кмд оф[офф])/i, async (message) => {
message.user.cmd = false;
await message.reply(`готово.`)
});

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы`, {attachment:'market-187736695_3425195'});
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

    if(message.user.settings.adm > 4) return bot(`администратор не может пополнять банковский счёт. 🚫`);
	if(message.args[1] < 1) return bot(`на балансе в банке ${utils.sp(message.user.bank)}$)
✍🏻 Введите "Банк снять [кол-во]" для снятия`);

	if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`, {attachment:'market-187736695_3425195'});
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили в банк ${utils.sp(message.args[1])}$ ${smilesuccess}
💰 На руках ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:передать|пиредать|предать|перидать|перевисти|перевести|перевод)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.user.settings.adm > 4) return bot(`администратор не может передавать игровые средства, воспользуйтесь командой "выдать"`); 
	if(message.args[2] > message.user.settings.limit) return bot(`максимум можно перевести ${utils.sp(message.user.settings.limit)}$`);
	if(message.args[2] <= 0) return;
	if(!message.user.settings.trade) return bot(`у вас установлен бан передачи ${smileerror}`);

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}$`, {attachment:'market-187736695_3425195'});
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		if(user.uid === message.user.uid) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		message.user.peredacha = message.args[2];
		message.user.timers.peredat = 21600;
		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])}$ ${smilesuccess}
		💸 На руках: ${utils.sp(message.user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!` });
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
	let ggtext = utils.pick([`фантастический ник!`, `крутой ник!`, `классный ник!`, `прикольный ник!`, `красивый ник!`, `таких ников я ещё не видел!`]);
	return bot(`${ggtext} ${smilenick}`);
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
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $250 млн
⠀⠀💼 Бизнесы
⠀⠀📇 Маники
⠀⠀💽 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [ID]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});

cmd.hear(/^(?:маник магазин|магазин маник)$/i, async (message, bot) => {
	if(message.user.manic < 1) return message.send(`у вас нет маника 😟
	❓ Для покупки введите «Маники»`);
	return bot(`комплектующие:
	🔋 1. Батарея (300.000$)
	💧 2. Охлаждающий гель (800.000$)
	
	❓ Для покупки введите «Маник магазин [ID]»
⠀  Например: "${utils.pick(['Маник магазин 1', 'Маник магазин 2'])}"`);
});

cmd.hear(/^(?:маник магазин 1|магазин маник 1)$/i, async (message, bot) => {
	return bot(`ваша батарея заряжена достаточно, вы сможете купить новую в том случае, если ваша будет на критическом уровне заряда. 🔋`);
});

cmd.hear(/^(?:маник магазин 2|магазин маник 2)$/i, async (message, bot) => {
	return bot(`вы купили охлаждающий гель для своего принтера.   `);
});

cmd.hear(/^(?:cmd)/i, async (message) => {
if(message.user.settings.adm < 8) {
 return message.send(`От админа.`)
} else {
		return message.send(`Доступные команды:\nответ [id] [текст] 
бан [id] 
статистика [id] - статистика юзера
разбан [id] 
выдать [id] [сумма] 
setwall [wall] - пострассылка 
rassilka [text] - рассылка 
rassilka2 [text] 
сн [id] - запретный ник! 
лник [id] - лимит на ник 
промо тип [btc/баланс] - создать промо 
снять привилегию [id] 
adminka [id] - выдать админку 
autodonate1kkkk [id] - зачислить валюту 
лимит [id] [сумма] - увеличить лимит на передачи 
autodonateunban [id] - разбанить 
autodonatevip [id] - выдать вип 
autodonateadministrator [id] - выдать админа 
autodonate100kkk [id] - выдать 100ккк за покупку 
autodonate50kkk [id] - выдать 50ккк за покупку 
autodonate15kkk [id] - выдать 15ккк за покупку 
autodonatecase [id] - выдать кейс за покупку 
autodonatebiz [id] - выдать последний бизнес за покупку 
победа2 [id] - победа в конкурсе на бизнес 
победа3 [id] - победа в конкурсе на принтер 
победа4 [id] - победа в конкурсе на 6.500.000.000.000$ 
победа5 [id] - победа в конкурсе на 1.000.000.000.000$ 
победа1 [id] - победа в конкурсе на администратора 
autodonatemanic [id] - выдать маник 
сбросить фермы [id] - сбросить фермы 
банпер [id] - бан передач 
разбанпер [id] - разбан передач`)
	}
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
		if(!message.user.transport.car) return bot(`у вас нет машины ${smileerror}
		❓ Для покупки введите «Машины»`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		let b = Math.floor(cars[message.user.transport.car - 1].cost * 0.25);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/питом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.pet) return bot(`у вас нет питомца ${smileerror}
		❓ Для покупки введите «Питомцы»`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		let b = Math.floor(pets[message.user.misc.pet - 1].cost * 0.25);

		message.user.balance += Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		message.user.misc.pet = 0;
		message.user.pet.lvl = 0;
		message.user.pet.poterl = false;

		return bot(`вы продали своего питомца ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
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

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты ${smileerror}
		❓ Для покупки введите «Яхты»`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		let b = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.25);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/маник|принтер|денежный принтер|принтермани/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.manic) return bot(`у вас нет маника ${smileerror}
		❓ Для покупки введите «Маники»`);
		if(message.user.mnc > 1) return bot(`вы не можете продать маник, пока в нём находятся деньги. ${smileerror}
		❓ Для снятия введите «Маник собрать»`);
		let a = Math.floor(manic[message.user.manic - 1].cost * 0.85);
		let b = Math.floor(manic[message.user.manic - 1].cost * 0.25);

		message.user.balance += Math.floor(manic[message.user.manic - 1].cost * 0.85);
		message.user.manic = 0;

		return bot(`вы продали свой маник за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта ${smileerror}
		❓ Для покупки введите «Яхты»`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		let b = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.25);

		message.user.balance += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали свой самолёт за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/в(и|е|я|ё)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у вас нет вертолёта ${smileerror}
		❓ Для покупки введите «Вертолёты»`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		let b = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.25);

		message.user.balance += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`вы продали свой вертолёт за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома ${smileerror}
		❓ Для покупки введите «Дома»`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		let b = Math.floor(homes[message.user.realty.home - 1].cost * 0.25);

		message.user.balance += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у вас нет квартиры ${smileerror}
		❓ Для покупки введите «Квартиры»`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		let b = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.25);

		message.user.balance += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона ${smileerror}
		❓ Для покупки введите «Телефоны»`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		let b = Math.floor(phones[message.user.misc.phone - 1].cost * 0.25);

		message.user.balance += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}
if(/Компьютер/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.comp) return bot(`у вас нет компьютера ${smileerror}
		❓ Для покупки введите «Компьютеры»`);
		let a = Math.floor(comps[message.user.misc.comp - 1].cost * 0.85);
		let b = Math.floor(comps[message.user.misc.comp - 1].cost * 0.25);

		message.user.balance += Math.floor(comps[message.user.misc.comp - 1].cost * 0.85);
		message.user.misc.comp = 0;

		return bot(`вы продали свой Компьютер за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

 	if(/ферм(у|ы)/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.misc.farm == 0) return bot(`у вас нет фермы ${smileerror}
		❓ Для покупки введите «Фермы»`);
		if(options.count > message.user.farms) return bot(`у вас нет столько ферм ${smileerror}
		❓ Для покупки введите «Фермы»`);
		if(options.count <= 0) return bot(`вы не можете продать столько ферм ${smileerror}`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * options.count * 0.85);
		let b = Math.floor(farms[message.user.misc.farm - 1].cost * 0.25);

		message.user.balance += a;
		message.user.farms -= options.count;
		if(message.user.farms == 0) message.user.misc.farm = 0;

		return bot(`вы продали ${farms[message.user.misc.farm - 1].name} (${utils.sp(options.count)}х) за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$ ${smilesuccess}`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга ${smileerror}
		❓ Для покупки введите «Рейтинг [кол-во]»`);
		let a = (150000000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}$`);
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

	if(/битко(й|и)н/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`недостаточно биткоинов
		❓ Для покупки введите «Биткоин [кол-во]»`, {attachment:'market-187736695_3425195'});
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}
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
${message.user.transport.car === 23 ? '??' : '🔸'} 23. Koenigsegg Regera (50.000.000$)
${message.user.transport.car === 24 ? '🔹' : '🔸'} 24. Tesla Semi (75.000.000$)
${message.user.transport.car === 25 ? '🔹' : '🔸'} 25. Venom GT (125.000.000$)
${message.user.transport.car === 26 ? '🔹' : '🔸'} 26. Rolls-Royce (200.000.000$)
${message.user.transport.car === 27 ? '🔹' : '🚗'} 27. Tesla Cubertruck (1.500.000.000$)

❓ Для покупки введите «Машина [ID]»`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);
	if(message.args[1] > 27) return;
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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

❓ Для покупки введите «Яхта [ID]»`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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

❓ Для покупки введите «Самолёт [ID]»`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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
${message.user.transport.helicopter === 12 ? '🔹' : '��'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '🔹' : '🔸'} 13. Bell V-22 Osprey (135.000.000$)

❓ Для покупки введите «Вертолёт [ID]»`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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

❓ Для покупки введите «Дом [ID]»`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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

❓ Для покупки введите «Квартира [ID]»`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
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

❓ Для покупки введите «Телефон [ID]»`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Компьютер|Компьютеры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.comp === 1 ? '🔹' : '🔸'} 1. Компьютер из Пятерочки (500$)
${message.user.misc.comp === 2 ? '🔹' : '🔸'} 2. Компьютер из магнита (1000$)
${message.user.misc.comp === 3 ? '🔹' : '🔸'} 3. Компьютер (2.000$)
${message.user.misc.comp === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (10.000$)
${message.user.misc.comp === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (15.000$)
${message.user.misc.comp === 6 ? '🔹' : '🔸'} 6. SamKing (30.000$)
${message.user.misc.comp === 7 ? '🔹' : '🔸'} 7. Xiaomi (2021) (50.000$)
${message.user.misc.comp === 8 ? '🔹' : '🔸'} 8. Torex FS1 (75.000$)
${message.user.misc.comp === 9 ? '🔹' : '🔸'} 9. MacBook (100.000$)
${message.user.misc.comp === 10 ? '🔹' : '🔸'} 10. HD Phantom (250.000$)

❓ Для покупки введите «Компьютер [ID]»`);

	const sell = comps.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.comp) return bot(`у вас уже есть телефон (${comps[message.user.misc.comp - 1].name}), введите "Продать Компьютер"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.comp = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:питомцы|🐒 Питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`питомцы:
🐌 1. Улитка (1.000$)
🐸 2. Лягушка (25.000$)
🐰 3. Заяц (500.000$)
🐷 4. Свинья (300.000.000$)
🦊 5. Лиса (1.250.000.000$)
🐶 6. Собака (5.000.000.000$)
🐼 7. Панда (30.000.000.000$)
🐺 8. Волк (180.000.000.000$)
🦖 9. Дракон (1.000.000.000.000$)

❓ Для покупки введите «Питомцы [ID]»`);

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
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}
	❓ Для покупки введите «Питомцы»`);
	else {
return bot(`информация:
${pets[message.user.misc.pet - 1].icon} Питомец: «${pets[message.user.misc.pet - 1].name}»
👒 Доступно улучшение, его стоимость: ${utils.sp(petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl)}$
🌟 Уровень: ${message.user.pet.lvl}`);
}

});

cmd.hear(/^(?:❓ Маник помощь|Маник помощь|помощь маник|принтер помощь)$/i, async (message, bot) => {
if(message.user.manic < 1) return bot(`У вас нет маника ${smileerror}
❓ Для покупки введите «Маники»`);
else 
{
	return bot(`система маников:

	🖥 Маники - они же денежные принтеры или манипринтеры, введите «Маник» для просмотра статистики.
	
	🔋 При 0% заряде батареи - печать денег приостанавливается, по мере необходимости покупайте новую.
	
	🆘 Перегрев играет основную роль в жизни вашего принтера, если не следить за его уровнем - ваш принтер взорвется, и вы потеряете всю прибыль. 
	
	💧 Охлаждающий гель служит для охлаждения вашего принтера, для понижения уровня перегрева.
	
	🛒 Для просмотра списка маников введите «Маники», для покупки охлаждения, батареи, введите «Маник магазин»
	
	💰 Для получения напечатанных денег введите «Маник собрать»`);
}

});

cmd.hear(/^(?:41|ответ 41|атвет 41|otvet 41|ответ41)$/i, async (message, bot) => {
if(message.user.old) return bot(`вы уже получали приз за правильный ответ. ${smileerror}`);
else 
{
	message.user.old = true;
	message.user.balance += 10000000000
	bot(`Зачислено +10.000.000.000$ за правильный ответ! 🔥
На руках: ${utils.sp(message.user.balance)}$ 💰`);
	return message.sendSticker(7378); 
}

});

cmd.hear(/^(?:кланказна)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(clans[i]){ 
clans[i].balance = 0; 
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:сделатьраздачу)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].case4 += 1;
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:лимит)$/i, async (message, bot) => { 
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 285443942) return;
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].settings.limit = 1000000000000; 
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:лимит1)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].farmslimit = 2000; 
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:кланы в жопу)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(clans[i]){ 
	clans[i].balance = 12; 
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова15)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].prez = false;
	} 
	} 
	return bot(`готово!`);
});

cmd.hear(/^(?:обнова2414)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].dostuptur = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова3)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].tur = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова2)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].settings.limit = 100000000000;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:промо Инф)$/i, async (message, bot) => {
if(message.isChat) return bot(`что бы получить бонус с промокода вы должны отправить этот промокод боту в личку.`);
if(message.user.promo) return bot(`вы уже активировали промокод. ${smileerror}`);
else
{

	if(promo >= config.promolimit) return bot(`у этого промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ, включи уведомления в группе о новых записях что бы узнавать ОДНИМ ИЗ ПЕРВЫХ о новых промокодах. 📢`);
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

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`недостаточно денег. ${smileerror}`, {attachment:'market-187736695_3425195'});

		var priceupd = petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl;

		var lvlpoupd = message.user.pet.lvl += 1;

		message.user.balance -= priceupd;
		message.user.pet.lvl += 1;

		return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);


}

});


cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => { 
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`); 
else { 

const pet = pets.find(x=> x.id === message.user.misc.pet); 
	if(message.user.timers.poxod > getUnix()) return bot(`Ваш Питомец слишком устал. Ты сможете отправить его через ${unixStampLeft(message.user.timers.poxod - Date.now())}`);
	getUnix() + 3600000;

let cashfind = utils.random(pet.min,pet.max); 
message.user.balance += cashfind; 
message.user.timers.poxod = getUnix() + 3600000;

bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`);
return message.sendSticker(15687); 
} 

});
cmd.hear(/^(?:клан атака|клан атаковать|атака|награбить)$/i, async (message, bot) => { 
	let clanid = message.user.clanid; 
	if(!clans[clanid]) return bot(`у вас нет клана!`); 
	if(clans[clanid].users[message.user.uid].level < 3) return bot(`проводить атаки может только глава клана.`); 
	if(clans[clanid].peoples < 5) return bot(`что бы проводить атаки необходимо иметь минимум 5 участников. `); 
	if(message.user.timers.ataka >= 0) return bot(`игроки вашего клана сильно устали, они восстановят силы через ${displayTime(message.user.timers.ataka)} ${smileerror}`); 

	message.user.timers.ataka = 1200;
	clanataka = utils.random(32456724, 10000000000); 
	let atackedclan = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	if(atackedclan === 1) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 2) {
		clans[clanid].rating -= 1; 
		clans[clanid].los += 1; 
		return bot(`атака состоялась ⚔
		Клан противника оказался сильнее, вы проиграли. ${smileerror}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].los)} поражений!`);
	} else if(atackedclan === 3) {
		return bot(`атака не состоялась, кажется что ваши противники струсили ⚔`);
	} else if(atackedclan === 4) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 5) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 6) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 7) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 8) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	} else if(atackedclan === 9) {
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`);
	}
	});

cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы:
${message.user.misc.farm === 1 ? '💽' : '💽'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '💽' : '💽'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '💽' : '💽'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [количество]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
	if(count <= 0) return bot(`нельзя купить 0 ферм или меньше`);
	if(count + message.user.misc.farm_count > message.user.farmslimit) return bot(`вы не можете иметь больше 1000 ферм одновременно`);

	if(message.user.balance < sell.cost * count) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost * count)
	{
		message.user.balance -= sell.cost * count;
		message.user.misc.farm = sell.id;
		message.user.misc.farm_count += count;

		return bot(`вы купили "${sell.name}" (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.user.settings.adm > 3) return bot(`администратор не может покупать рейтинг. 🚫`);
	if(message.args[1] <= 0) return;

	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`у вас недостаточно денег`, {attachment:'market-187736695_3425195'});
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 250000000)}$`);
	}
});

/*cmd.hear(/^(?:бизнесы|💼 Бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🌯' : '🌯'} 1. Булочная - $50 тыс.
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.business === 2 ? '🍬' : '🍬'} 2. Ларёк - $100 тыс.
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.business === 3 ? '🍵' : '🍵'} 3. Ресторан - $300 тыс.
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.business === 4 ? '🛒' : '🛒'} 4. Супермаркет - $500 тыс.
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.business === 5 ? '🏭' : '🏭'} 5. Завод - $1,5 млн.
⠀ ⠀ ⠀ Прибыль: 8.000$/час
${message.user.business === 6 ? '💎' : '💎'} 6. Шахта - $25 млн.
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.business === 7 ? '🏢' : '🏢'} 7. Офис ВКонтакте - $80 млн.
⠀ ⠀ ⠀ Прибыль: 220.000$/час
${message.user.business === 8 ? '🕹' : '🕹'} 8. Разработка игр - $150 млн.
⠀ ⠀ ⠀ Прибыль: 300.000$/час
${message.user.business === 9 ? '⚓' : '⚓'} 9. Порт - $500 млн.
⠀ ⠀ ⠀ Прибыль: 700.000$/час
${message.user.business === 10 ? '🔋' : '🔋'} 10. Атомная электростанция - $800 млн.
⠀ ⠀ ⠀ Прибыль: 1.000.000$/час
${message.user.business === 11 ? '📽' : '📽'} 11. Киностудия - $50 млрд.
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
${message.user.business === 12 ? '🗺' : '🗺'} 12. Космическое агентство
⠀ ⠀ ⠀ Прибыль: 150.000.000.000$/час

💡 Вы можете иметь только ОДИН бизнес!
❓ Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);
	if(message.args[1] > 11) return bot (`вы заинтересовались покупкой бизнеса «Космическое агентство» за 119 рублей.

	💎 Это лучший игровой бизнес которого НЕТ В ПРОДАЖЕ с прибылью в 150.000.000.000$/час игровой валюты, успей купить за 119 РУБЛЕЙ!
	
	🔑 Покупать у https://vk.com/perpnameis
	
	🆘 При оплате вам необходимо ввести свой ID.`, {attachment:'market-187736695_3425203'});

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
}); 
*/

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
	return bot(`бизнесы:
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
Для покупки введите "Бизнесы [номер]"`);

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

cmd.hear(/^(?:статистика бота|стата|статистика)/i, async (message) => {
	if(message.user.settings.adm < 4) return;
	var active = users.filter(x=> x.active < 601).map(x=> x.uid);
    var nactive = users.filter(x=> x.active > 601 && x.active < 86401).map(x=> x.uid);
    var noactive = users.filter(x=> x.active > 1000).map(x=> x.uid);
    let s = 0;
    let f = 0;
    for(i in users) {
    	s += users[i].balance
    	f += users[i].ban
    }
    let ping = tcpp.ping({ address: 'vk.com' }, function(err, data) {
        message.send(`Подробная статистика бота:\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n😈 Всего юзеров: ${users.length}\n✔ Активных игроков: ${active.length}\n❌ Не активных игроков: ${noactive.length}\n⛔ Заблокированных пользователей: ${f}\n💰 Всего денег: ${utils.sp(s)}$\n💬 Принято всего сообщений: ${botinfo.msg}\n♻ Ping ${Math.round(data.avg)} ms\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`);
})
});

cmd.hear(/^(?:sad)/i, async (message) => {
for (i in users) {
	users[i].active=0;
}
});

cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
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

cmd.hear(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
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

cmd.hear(/^(?:маники|принтеры|манеки|ман|принтер|🖨 Маники)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`денежные принтеры:
${message.user.manic === 1 ? '🔹' : '🔹'} 1. Monfury B8 - 416.000$/5 мин
⠀ ⠀ ⠀ (Цена: 400.000.000$)
${message.user.manic === 2 ? '🔹' : '🔹'} 2. Avalon E9 - 15.830.000$/5 мин
⠀ ⠀ ⠀ (Цена: 1.100.000.000$)
${message.user.manic === 3 ? '🔹' : '🔹'} 3. Dragon Z5 - 41.690.000$/5 мин
⠀ ⠀ ⠀ (Цена: 3.700.000.000$)
${message.user.manic === 4 ? '🔹' : '🔹'} 4. Estelon 4 - 125.000.000/5 мин
⠀ ⠀ ⠀ (Цена: 10.300.000.000$)
${message.user.manic === 5 ? '🔹' : '🔹'} 5. XSUT X5 - 300.000.000/5 мин
⠀ ⠀ ⠀ (Цена: 22.900.000.000$)
${message.user.manic === 6 ? '🔹' : '🔹'} 6. MoneyMaker V2 - 700.000.000/5 мин
⠀ ⠀ ⠀ (Цена: 50.800.500.000$)
${message.user.manic === 7 ? '🔹' : '🔹'} 7. Giant X10 - 1.300.000.000/5 мин

❓ Для покупки введите «Маники [ID]»`);

	const sell = manic.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.manic) return bot(`у вас уже есть маник (${manic[message.user.manic - 1].name}), введите "Продать маник"`);
	if(message.args[1] > 6) return bot(`вы заинтересовались покупкой денежного принтера «Giant X10» за 59 рублей.

	💎 Это лучший денежный принтер которого НЕТ В ПРОДАЖЕ с прибылью в 15.600.000.000$/час игровой валюты.
	🔋 Батарея разряжается в 2 раза дольше.
	💧 Полностью отсутствует перегрев, принтер выдается НАВСЕГДА!
	🎒 При продаже вы получите 40.000.000.000.000$
	
	🔑 Покупать у @demon_demon_demon__demonov_xd_xd
	
	💯 Все пожертвованные вами деньги пойдут на развитие бота.
	🆘 При оплате вам необходимо ввести свой ID.
	
	🛒 Выгодное предложение:`)


	if(message.user.balance < sell.cost) return bot(`недостаточно денег`, {attachment:'market-187736695_3425195'});
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.manic = sell.id;
		message.user.mnc = 0;
		message.user.manic_pribil = sell.earn;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	return bot(`курс валют на данный момент:
💸Биткоин: ${utils.sp(btc)}$`);
});

cmd.hear(/^(?:биткоин|биткойн|бтк|btc)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * btc ) > message.user.balance) return bot(`недостаточно денег
Курс биткоина: ${btc}$`, {attachment:'market-187736695_3425195'});
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`);
	}
});

cmd.hear(/^(?:Топ|топ игроков|топер|tops)$/i, async (message, bot) => {
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — 👑${utils.sp(user.rating)} шт. | $${utils.rn(user.balance)}
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
➡${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} шт. | $${utils.rn(message.user.balance)}`);
});


cmd.hear(/^(?:⚔ топ кланы|топ кланы|⚔ топ кланов|⚔ клан топ|⚔ кланы топ|кланов топ|топ кланов|клан топ|топ клан|лучшие кланы|кланы|🏆 Лучшие кланы)$/i, async (message, bot) => {
		let top = [];  
		let topc = []; 
		
		function cccl(clanidd) { 
		let texxxt = ``; 
		for(let id in clans[clanidd].users) { 
		let user = users[id]; 
		if(clans[clanidd].users[id].level == 3) text += `*id${clans[clanidd].users[id].level == 3} (${clans[clanidd].name})`; 
		} 
		return text; 
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
		
		cll += `${i === 9 ? `🔟` : `${i + 1}⃣`}  [${clan.peoples}/${mp}] ${cccl(clan.id)} -  🏆${utils.sp(clan.rating)} | $${utils.rn(clan.balance)}\n`; 
		} 
		
		return bot(`топ кланов: 
		${cll}
		—————————————————
		
📢 Рейтинг клана складывается из побед и поражений в атаках.`);
		});

cmd.hear(/^(?:бонус|🔑 Бонус|🤑 Бонус)$/i, async (message, bot) => {

	if(message.user.timers.bonus > getUnix()) return bot(`🌟 » Вы сможете получить бонус через ${unixStampLeft(message.user.timers.bonus - Date.now())}`);
	getUnix() + 86400000;
	
  let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	if(prize === 1) {
		message.user.balance += 50000;
		message.user.timers.bonus = getUnix() + 86400000;
    bot(`вы выиграли 50.000$ ${smilesuccess}`);
		return message.sendSticker(7510);
	} else if(prize === 2) {
		message.user.btc += 1000;
	  message.user.timers.bonus = getUnix() + 86400000;
  	bot(`вы выиграли 1.000₿ ${smilesuccess}`);
		return message.sendSticker(6362);
	} else if(prize === 3) {
		message.user.rating += 5;
  	message.user.timers.bonus = getUnix() + 86400000;
  	bot(`вы выиграли 5👑`);
		return message.sendSticker(9126);
	} else if(prize === 4) {
		message.user.rating += 1;
  	message.user.timers.bonus = getUnix() + 86400000;
   	bot(`вы выиграли 1👑`);
		return message.sendSticker(6362);
	} else if(prize === 5) {
		message.user.rating += 10;
    message.user.timers.bonus = getUnix() + 86400000;
 		bot(`вы выиграли 10👑`);
		return message.sendSticker(9162);
	} else if(prize === 6) {
		message.user.rating += 2;
    message.user.timers.bonus = getUnix() + 86400000;
		bot(`вы выиграли 2👑`);
		return message.sendSticker(7510);
	} else if(prize === 7) {
		message.user.rating += 3;
	  message.user.timers.bonus = getUnix() + 86400000;
  	bot(`вы выиграли 3👑`);
		return message.sendSticker(7510);
	} else if(prize === 8) {
		message.user.rating += 4;
  	message.user.timers.bonus = getUnix() + 86400000;
   	bot(`вы выиграли 4👑`);
		return message.sendSticker(6362);
	} else if(prize === 9) {
		message.user.bank += 1000000;
  	message.user.timers.bonus = getUnix() + 86400000;
   	bot(`вы выиграли 1.000.000$ на свой банковский счёт ${smilesuccess}`);
		return message.sendSticker(9162);
	} else if(prize === 10) {
		message.user.bank += 5000000;
	  message.user.timers.bonus = getUnix() + 86400000;
  	bot(`вы выиграли 5.000.000$ на свой банковский счёт ${smilesuccess}`);
		return message.sendSticker(6362);
	} else if(prize === 11) {
		message.user.bank += 10000000;
	  message.user.timers.bonus = getUnix() + 86400000;
    bot(`вы выиграли 10.000.000$ на свой банковский счёт ${smilesuccess}`);
		return message.sendSticker(7510);
	} else if(prize === 12) {
		message.user.bank += 50000000;
  	message.user.timers.bonus = getUnix() + 86400000;
   	bot(`вы выиграли 50.000.000$ на свой банковский счёт ${smilesuccess}`);
		return message.sendSticker(9126);
	}
});
cmd.hear(/^(?:Рандт|🎁Ранд|Ранд)$/i, async (message, bot) => {
  if(message.user.settings.adm < 3) return bot(`🗡️ » Вы не Премиум`)
  
  if(message.user.timers.good > getUnix()) return bot(`🌟 » Вы сможете получить ранд через ${unixStampLeft(message.user.timers.good - Date.now())}`);
	getUnix() + 3600000;
	
  let prize = utils.pick([1, 2, 3, 4, 5, 6]);

	if(prize === 1) {
		message.user.case4 += 1;
		message.user.timers.good = getUnix() + 3600000;
    bot(`вы выиграли «Супер-Сундук» ${smilesuccess}`);
		return message.sendSticker(16365);
	} else if(prize === 2) {
		message.user.misc.pet = 8;
	  message.user.pet.lvl += 1;
    message.user.timers.good = getUnix() + 3600000;
  	bot(`вы выиграли Уникального Питомца Волка ${smilesuccess}`);
		return message.sendSticker(16946);
	} else if(prize === 3) {
		message.user.rating += 538;
  	message.user.timers.good = getUnix() + 3600000;
  	bot(`вы выиграли 538👑`);
		return message.sendSticker(16946);
	} else if(prize === 4) {
		message.user.balance += 500000000000;
  	message.user.timers.good = getUnix() + 3600000;
  	bot(`вы выиграли 500ккк`);
		return message.sendSticker(16946);
	} else if(prize === 5) {
		message.user.sun += 6400;
  	message.user.timers.good = getUnix() + 3600000;
  	bot(`вы выиграли 6400❄️`);
		return message.sendSticker(16946);
	} else if(prize === 6) {
		message.user.rub = 20;
  	message.user.timers.good = getUnix() + 3600000;
  	bot(`вы выиграли 20₽`);
		return message.sendSticker(16946);
	}
});

cmd.hear(/^(?:Играть)$/i, async (message, bot) => {
  if(message.user.misc.comp < 1) return bot(`🖥️ » У вас нет Компьютера`)
  if(message.user.ded < 2) return bot(`У вас нет игр`)

  if(message.user.timers.vidat > getUnix()) return bot(`⚔️ » Вы слишком Устали. Ты сможете Играть через ${unixStampLeft(message.user.timers.vidat - Date.now())}`);
	getUnix() + 300000;

  let prize = utils.pick([1, 2, 3, 4, 5, 6, ]);

	if(prize === 1) {
		message.user.balance += 50000000000;
    message.user.gg += 1;
    message.user.ced += 1;
    message.user.timers.vidat = getUnix() + 300000;
   	bot(`Катка Была лёгкая 50ккк$ ${smilesuccess}`);
		return message.sendSticker(13926);
	} else if(prize === 2) {
		message.user.btc += 1000;
    message.user.timers.vidat = getUnix() + 300000;
  	bot(`Вы задонатили на Крипто Валюту, вы окупились 1.000₿, но это не считается как игра ${smilesuccess}`);
		return message.sendSticker(16946);
	} else if(prize === 3) {
		message.user.rating += 5;
	  message.user.gg += 1;
    message.user.herov += 1;
    message.user.timers.vidat = getUnix() + 300000;
    bot(`Вы слили`);
		return message.sendSticker(16545);
	} else if(prize === 4) {
		message.user.rating += 50;
	  message.user.balance += 650000000000;
    message.user.gg += 1;
    message.user.ced += 1;
    message.user.timers.vidat = getUnix() + 300000;
    bot(`🌟 » Катка Была Потной получено 650ккк и 50 рейтинга`);
		return message.sendSticker(16545);
	} else if(prize === 5) {
		message.user.rating += 5000;
	  message.user.balance += 6000000000000;
    message.user.gg += 1;
    message.user.ced += 1;
    message.user.timers.vidat = getUnix() + 300000;
    bot(`🌟 » Катка Была с проффесионалами 6кккк и 5000 рейтинга`);
		return message.sendSticker(16545);
  } else if(prize === 6) {
    message.user.gg += 1;
    message.user.herov += 1;
    message.user.timers.vidat = getUnix() + 300000;
    bot(`🌟 » Вы проиграли.`);
		return message.sendSticker(16545);
  } else if(prize === 7) {
    message.user.gg += 1;
    message.user.herov += 1;
    message.user.timers.vidat = getUnix() + 300000;
    bot(`🌟 » Ваша Команда Ливнула из игры. Вы проиграли`);
		return message.sendSticker(16545);
  }
});
cmd.hear(/^(?:поход|🎩 Поход)$/i, async (message, bot) => {
	if(message.user.timers.poxod2 > getUnix()) return bot(`🌟 » Вы сможете получить бонус через ${unixStampLeft(message.user.timers.poxod2 - Date.now())}`);
	getUnix() + 86400000;
	let s = 13926

	let prize2 = utils.pick([1, 2, 3, 4, 5]);

	if(prize2 === 1) {
		message.user.balance += 50000;
	  message.user.timers.poxod2 = getUnix() + 86400000;
  	bot(`находясь в походе, вы нашли 50.000$ ${smilesuccess}`);
		return message.sendSticker(s);
	} else if(prize2 === 2) {
		message.user.btc += 1000;
		message.user.timers.poxod2 = getUnix() + 86400000;
    bot(`находясь в походе, вы нашли 1.000₿ ${smilesuccess}`);
		return message.sendSticker(s);
	} else if(prize2 === 3) {
		message.user.rating += 5;
	  message.user.timers.poxod2 = getUnix() + 86400000;
  	bot(`находясь в походе, вы нашли 5👑`);
		return message.sendSticker(s);
	} else if(prize2 === 4) {
		message.user.rating += 1;
  	message.user.timers.poxod2 = getUnix() + 86400000;
  	bot(`находясь в походе, вы нашли 1👑`);
		return message.sendSticker(s);
	} else if(prize2 === 5) {
		message.user.rating += 10;
		message.user.timers.poxod2 = getUnix() + 86400000;
    bot(`находясь в походе, вы нашли 10👑`);
		return message.sendSticker(s);
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

cmd.hear(/^(?:set balance)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 8) return;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

	message.args[1] = Math.floor(Number(message.args[1]));
	message.args[2] = Math.floor(Number(message.args[2]));
	if(!Number(message.args[1] || message.args[2])) return message.send(`Должно быть число!`);
	if(!message.args[1]) {
 return message.send(`введите ид юзера`);
 } else if(!message.args[2]) {
 	return message.send(`введите число.`);
 }
 user.balance = message.args[2];
 return message.send(`Вы установили баланс ${utils.sp(message.args[2])} игроку *id${user.id} (${user.tag})`);
 });


cmd.hear(/^(?:репорт|реп|rep)\s([^]+)$/i, async (message) => {
vk.api.messages.send({ user_id: 567412154, message: `🆕 Поступил новый репорт!\n\n🗣 Отправил: ${message.user.id}
🔎 Игровой ID: ${message.user.uid}\n➡ [id${message.user.id}|${message.user.tag}]: ${message.args[1]}` })
return message.send(`[id${message.user.id}|${message.user.tag}], ваш репорт был отправлен администраторам.`);
});


cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.settings.adm < 4) return;
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	message.send(`[id${message.user.id}|${message.user.tag}], данный [id${user.id}|игрок] получил ваш ответ, спасибо что помогаете игрокам.`);

	vk.api.messages.send({ user_id: user.id, message: `🗣 Вам ответили на вашу жалобу.\n➡ [id${message.user.id}|${message.user.tag}]: ${message.args[2]}` });

});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
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

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);

	if(message.user.timers.hasWorked > getUnix()) return bot(`⚔️ » Вы слишком Устали. Вы сможете работать через ${unixStampLeft(message.user.timers.hasWorked - Date.now())}`);
	getUnix() + 600000;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;
  message.user.timers.hasWorked = getUnix() + 600000;
	
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
		progressQuest(message.user, 2)
		message.user.balance += 2000000;
		return bot(`вы угадали! Приз 2.000.000$`);
	} else { 
		resetQuest(message.user, 2)
		return bot(`не угадали 
	🎲 Выпало число ${int}`);
	}
});

cmd.hear(/^(?:казино)\s?(.*)?$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	let smilelose = utils.pick(['😩','😕','😦','😵','😟','😔','😩','😿']);
    let smilewin = utils.pick(['😄','😁','😊','😃','😉','😜','😋','🤗','🙂','🙃','😌','🤤','😇','🤪','😈','😸','😼','😺','😎'])

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

    if(message.user.balance == 0) return bot(`у вас нет денег.`)
	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
else if(message.args[1] <= message.user.balance && message.user.balance <= 50000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 2, 0, 50, 1, 0.75, 2, 1, 0, 5, 2, 2, 2, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 5, 0.5, 0.5, 0.75, 0.75, 0.75, 5, 0.75, 0.75, 5, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

		if (multiply > 1)
			progressQuest(message.user, 3)
		else
			resetQuest(message.user, 3)

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 баланс: ${utils.sp(message.user.balance)}$`); 
} 

else if(message.args[1] <= message.user.balance && message.user.balance > 50000000000 && message.user.balance <= 300000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 10, 1, 5, 5, 1, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply);

		if (multiply > 1)
			progressQuest(message.user, 3)
		else
			resetQuest(message.user, 3)

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 

else if(message.args[1] <= message.user.balance && message.user.balance > 300000000000 && message.user.balance <= 1000000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 5, 1, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

		if (multiply > 1)
			progressQuest(message.user, 3)
		else
			resetQuest(message.user, 3)

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
}

else if(message.args[1] <= message.user.balance && message.user.balance > 1000000000000 && message.user.balance <= 10000000000000) 
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 0, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

		if (multiply > 1)
			progressQuest(message.user, 3)
		else
			resetQuest(message.user, 3)

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
} 
else if(message.args[1] <= message.user.balance && message.user.balance > 10000000000000)
{ 
message.user.balance -= message.args[1]; 
const multiply = utils.pick([0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75]); 

message.user.balance += Math.floor(message.args[1] * multiply); 

		if (multiply > 1)
			progressQuest(message.user, 3)
		else
			resetQuest(message.user, 3)

return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] - message.args[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.sp(message.args[1] * multiply - message.args[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.sp(message.user.balance)}$`); 
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`, {attachment:'market-187736695_3425195'});
	if(message.args[2] <= 50) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			progressQuest(message.user, 0)

			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
			✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 0)
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
			❌ Вы потеряли ${utils.sp(message.args[2])}$ 
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
		}
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`, {attachment:'market-187736695_3425195'});
	if(message.args[2] <= 50) return bot(`ставка должна быть больше 50$ ${smilekazinobad}`);
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const rand = utils.pick([0, 1]);
		const nav = Number(message.args[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			progressQuest(message.user, 0)

			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			message.user.balance += Math.floor(message.args[2] * multiply);

			return bot(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
			✅ Вы заработали +${utils.sp(message.args[2] * multiply)}$
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
		} else {
			resetQuest(message.user, 0)
			return bot(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(20)}$
			❌ Вы потеряли ${utils.sp(message.args[2])}$ 
			💰 Баланс: ${utils.sp(message.user.balance)}$`);
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег 😔
💰 Ваш баланс: ${message.user.balance}$`, {attachment:'market-187736695_3425195'});
	else if(message.args[2] <= message.user.balance)
	{
		message.user.balance -= message.args[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			progressQuest(message.user, 1)
			message.user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз ${message.args[2] * multiply} ${smilesuccess}`);
		} else {
			resetQuest(message.user, 1)
			return bot(`вы не угадали, это был ${cup}-ый стаканчик ${smileerror}`);
		}
	}
});

cmd.hear(/^(?:кнопка)\s([^]+)$/i, async (message, bot) => {
		if(message.isChat) return bot(`команда работает только в ЛС. 🔁`);
        if (message.chatId) 
        {
        let conver = convers.find(x=> x.cid === message.chatId);
        if (!conver)
        {
            convers.push({
                id: convers.length + 1,
                cid: message.chatId,
                buttoncount: 0,
                button: []
            });
            conver = convers.find(x=> x.cid === message.chatId);
        }

        if (message.args[1].toLowerCase() === "удалить")
        {
        
            conver.buttoncount = 0;
            conver.button = [];
            return vk.api.messages.send({
                chat_id: message.chatId,
                message: `[id${message.user.id}|${message.user.tag}], вы очистили все кнопки!
				🔁 Для добавления новых используйте: Кнопка [Текст]
				&#10133; Что бы включить стандартыне кнопки используйте: Кнопка стандарт`,
                keyboard: Keyboard.keyboard([])
            });
        }

        if (conver.button.length >= 40) return bot(`[id${message.user.id}|${message.user.tag}], ваше поле заполнено! (40/40)
		🔁 Для очистки поля используйте: Кнопка удалить
		&#10133; Что бы включить стандартыне кнопки используйте: Кнопка стандарт`);

        conver.button.push(message.args[1]);

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
            return vk.api.messages.send({
                peer_id: message.user.id,
				message: `[id${message.user.id}|${message.user.tag}], вы удалили все кнопки!
				🔁 Для добавления новых используйте: Кнопка [Текст]
				&#10133; Что бы включить стандартыне кнопки используйте: Кнопка стандарт`,
                keyboard: Keyboard.keyboard([])
            });
        }

        if (message.user.button == undefined)
            message.user.button = []
        message.user.button.push(message.args[1]);

        await vk.api.messages.send({
            peer_id: message.user.id,
			message: `[id${message.user.id}|${message.user.tag}], кнопка успешно добавлена!
			🔁 Для удаления всех кнопок используйте: Кнопка удалить
			&#10133; Что бы включить стандартыне кнопки используйте: Стандарт кнопка`,
            keyboard: generateKeyboard(message.user.button)
        });
    }
});



cmd.hear(/^(?:стандарт кнопка|стандартная кнопка|стандарт|кнопка|кнопки|кнопка gay|кнопка хуй|выключить кнопки)$/i, (message) => { 
{
	if(user.full == false) return;
	return message.send(`[id${message.user.id}|${message.user.tag}], вы включили стандартные кнопки!\n🔁 Для добавления новых используйте: Кнопка [Текст]
	`, 
	{ 
		keyboard:JSON.stringify( 
		{ 
		"one_time": false, 
		"buttons": [ 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{\"button\": \"1\"}", 
		"label": "🏆 Лучшие кланы" 
		}, 
		"color": "positive" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "📦 Сундуки" 
		}, 
		"color": "positive" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💽 Ферма" 
		}, 
		"color": "primary" 
		}], 
		[{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "💼 Бизнесы" 
		}, 
		"color": "primary" 
		}, 
		{ 
		"action": { 
		"type": "text", 
		"payload": "{}", 
		"label": "🖨 Маники" 
		}, 
		"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "👒 Квесты" 
	}, 
	"color": "negative" 
		}] 
	] 
	}) 
	}); 
	} 
	});
	
	cmd.hear(/^(?:✅ Полyчить подскaзкy)$/i, async (message) => {
		if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
		if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
		if(message.user.tur == 1) return message.send(`[id${message.user.id}|${message.user.tag}], узнать это можно в @botmeduza (Bot Meduza) ${smilesuccess}`);
		if(message.user.tur == 2) return message.send(`[id${message.user.id}|${message.user.tag}], узнать это можно в @rezerv_bot (LIVE Bot Meduza) ${smilesuccess}`);
		if(message.user.tur == 3) return message.send(`[id${message.user.id}|${message.user.tag}], узнать это можно введя команду «машины» ${smilesuccess}`);
		if(message.user.tur > 3) return message.send(`[id${message.user.id}|${message.user.tag}], нет подсказок для этого задания ${smileerror}`);
		return bot(`extended`);
	});
	cmd.hear(/^(?:25 мaя|2 декaбря|2 июня|10 сентября|Audi Q7|Tesla Roadster|Lamborghini Veneno)$/i, (message) => { 
		{
			if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
			if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
			message.user.tur = 0;
			message.user.dostuptur = 0;
			return message.send(`[id${message.user.id}|${message.user.tag}], ты ответил неправильно, хорошая попытка. ❌`, 
			{ 
				keyboard:JSON.stringify( 
				{ 
				"one_time": false, 
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{\"button\": \"1\"}", 
				"label": "🏆 Лучшие кланы" 
				}, 
				"color": "positive" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "📦 Сундуки" 
				}, 
				"color": "positive" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "💽 Ферма" 
				}, 
				"color": "primary" 
				}], 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "💼 Бизнесы" 
				}, 
				"color": "primary" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🖨 Маники" 
				}, 
				"color": "primary" 
			}, 
			{ 
			"action": { 
			"type": "text", 
			"payload": "{}", 
			"label": "👒 Квесты" 
			}, 
			"color": "negative" 
				
					}], 
			] 
			}) 
			}); 		
			} 
			});

	cmd.hear(/^(?:викторина)$/i, (message) => { 
		{
			if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
			if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
			if(message.user.tur > 1) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
			message.user.tur = 1;
			return message.send(`[id${message.user.id}|${message.user.tag}], первый вопрос:

			В какую дату состоялось открытие @sharkingbot (Bot Shark)?

			Варианты ответа:
			1&#8419; — 17 октября
			2&#8419; — 18 октября
			3&#8419; — 2 декабря

			`, 
			{ 
				keyboard:JSON.stringify( 
				{ 
				"one_time": false, 
				"buttons": [ 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{\"button\": \"1\"}", 
				"label": "17 октября" 
				}, 
				"color": "default" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "18 октября" 
				}, 
				"color": "default" 
			}, 
			{ 
			"action": { 
			"type": "text", 
			"payload": "{}", 
			"label": "2 декaбря" 
			}, 
			"color": "default" 
				}], 
				[{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "✅ Полyчить подскaзкy" 
				}, 
				"color": "positive" 
				
					}], 
			] 
			}) 
			}); 		
			} 
			});

			cmd.hear(/^(?:17 октября)$/i, (message) => { 
				{
					if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
					if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
					if(message.user.tur > 2) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
					message.user.tur = 2;
					return message.send(`[id${message.user.id}|${message.user.tag}], верно! ${smilesuccess} Следующий вопрос:
		
					В какую дату были добавленны денежные принтеры?
					Узнать можно тут — @sharkingbot (Shark bot)
		
					Варианты ответа:
					1&#8419; — 17 октября
					2&#8419; — 18 октября
					3&#8419; — 10 сентября
		
					`, 
					{ 
						keyboard:JSON.stringify( 
						{ 
						"one_time": false, 
						"buttons": [ 
						[{ 
						"action": { 
						"type": "text", 
						"payload": "{\"button\": \"1\"}", 
						"label": "17 октября" 
						}, 
						"color": "default" 
						}, 
						{ 
						"action": { 
						"type": "text", 
						"payload": "{}", 
						"label": "18 октября" 
						}, 
						"color": "default" 
					}, 
					{ 
					"action": { 
					"type": "text", 
					"payload": "{}", 
					"label": "10 сентября" 
					}, 
					"color": "default" 
						}], 
						[{ 
						"action": { 
						"type": "text", 
						"payload": "{}", 
						"label": "✅ Полyчить подскaзкy" 
						}, 
						"color": "positive" 
						
							}], 
					] 
					}) 
					}); 		
					} 
					});

					cmd.hear(/^(?:18 октября)$/i, (message) => { 
						{
							if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
							if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
							if(message.user.tur > 3) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
							message.user.tur = 3;
							return message.send(`[id${message.user.id}|${message.user.tag}], ого! ${smilesuccess} Следующий вопрос:
				
							Какой САМЫЙ дорогой автомобиль из ниже перечисленных?
				
							Варианты ответа:
							1&#8419; — Bugatti Chiron
							2&#8419; — Lamborghini Veneno
							3&#8419; — Audi Q7
							4&#8419; — Tesla Roadster
				
							`, 
							{ 
								keyboard:JSON.stringify( 
								{ 
								"one_time": false, 
								"buttons": [ 
								[{ 
								"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": "Bugatti Chiron" 
								}, 
								"color": "default" 
								}, 
								{ 
								"action": { 
								"type": "text", 
								"payload": "{}", 
								"label": "Lamborghini Veneno" 
								}, 
								"color": "default" 
								}], 
								[{ 
								"action": { 
								"type": "text", 
								"payload": "{}", 
								"label": "Audi Q7" 
								}, 
								"color": "default" 
							}, 
							{ 
							"action": { 
							"type": "text", 
							"payload": "{}", 
							"label": "Tesla Roadster" 
							}, 
							"color": "default" 
						}], 
						[{ 
						"action": { 
						"type": "text", 
						"payload": "{}", 
						"label": "✅ Полyчить подскaзкy" 
						}, 
						"color": "positive" 
									}], 
							] 
							}) 
							}); 		
							} 
							});

							cmd.hear(/^(?:Bugatti Chiron)$/i, (message) => { 
								{
									if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
									if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
									if(message.user.tur > 4) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
									message.user.tur = 4;
									return message.send(`[id${message.user.id}|${message.user.tag}], действительно! Её стоимость составляет 6.500.000$! ${smilesuccess}
						
									💎 Вы прошли викторину ПОЛНОСТЬЮ, вы можете выиграть от игровой валюты ДО ADMINISTRATOR'а
									📦 Выберите ЛЮБОЙ сундук, победа ГАРАНТИРОВАННА!
						
									`, 
									{ 
										keyboard:JSON.stringify( 
										{ 
										"one_time": false, 
										"buttons": [ 
										[{ 
										"action": { 
										"type": "text", 
										"payload": "{\"button\": \"1\"}", 
										"label": "📦 Сундук #1" 
										}, 
										"color": "positive" 
										}, 
										{ 
										"action": { 
										"type": "text", 
										"payload": "{}", 
										"label": "📦 Сундук #2" 
										}, 
										"color": "positive" 
									}, 
									{ 
									"action": { 
									"type": "text", 
									"payload": "{}", 
									"label": "📦 Сундук #3" 
									}, 
									"color": "positive" 
										}], 
										[{ 
										"action": { 
										"type": "text", 
										"payload": "{}", 
										"label": "📦 Сундук #4" 
										}, 
										"color": "positive" 
									}, 
									{ 
									"action": { 
									"type": "text", 
									"payload": "{}", 
									"label": "📦 Сундук #5" 
									}, 
									"color": "positive" 
								}, 
								{ 
								"action": { 
								"type": "text", 
								"payload": "{}", 
								"label": "📦 Сундук #6" 
								}, 
								"color": "positive" 
								}], 
								[{ 
								"action": { 
								"type": "text", 
								"payload": "{}", 
								"label": "ℹ️ Случайный выбор" 
								}, 
								"color": "primary" 
											}], 
									] 
									}) 
									}); 		
									} 
									});
cmd.hear(/^(?:📦 Сундук #1|📦 Сундук #2|📦 Сундук #3|📦 Сундук #4|📦 Сундук #5|📦 Сундук #6|📦 Сундук #1|⏺ Случайный выбор|ℹ️ Случайный выбор)$/i, async (message, bot) => {

if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
if(message.user.tur > 5) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
									
message.user.dostuptur = 0;
									
let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
if(prize2 === 1) {
message.user.balance += 777777777777;
bot(`вы выиграли 777.777.777.777$ 🙀
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 2) {
message.user.rating += 20000;
bot(`вы выиграли 20.000 РЕЙТИНГА! 💝
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 3) {
message.user.balance += 222777222777;
bot(`вы выиграли 222.777.222.777$ 🙀
🔁 Введите «кнопки» что бы включить стандартные кнопки.
											
📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 4) {
message.user.business = 12;
message.user.bizlvl = 1;
bot(`вы выиграли БИЗНЕС 🗺 «Космическое агентство»! 🧙‍♂
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(5973);
} else if(prize2 === 5) {
message.user.manic = 7;
bot(`вы выиграли ДЕНЕЖНЫЙ ПРИНТЕР «Giant X10»! 🏃‍♂
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(5973);
} else if(prize2 === 6) {
message.user.transport.car = 31;
message.user.balance += 5000000000;
bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980» и ЦЕЛЫХ 5.000.000.000$! 😯
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(7377);
} else if(prize2 === 7) {
message.user.realty.home = 16;
bot(`вы выиграли УНИКАЛЬНЫЙ ДОМ «Собственная планета»! 😳
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 8) {
message.user.transport.car = 31;
bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 😳
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(6034);
} else if(prize2 === 9) {
message.user.balance += 1000000000000;
bot(`вы выиграли 1.000.000.000.000$! 🙀
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(7377);
} else if(prize2 === 10) {
message.user.transport.car = 31;
bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 🙀
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 11) {
message.user.balance += 15000000000000;
bot(`вы выиграли 15.000.000.000.000$ 💛
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(7377);
} else if(prize2 === 12) {
message.user.balance += 777777777500;
bot(`вы выиграли 777.777.777.500$ 💛
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
} else if(prize2 === 13) {
message.user.balance += 250000000000;
bot(`вы выиграли 250.000.000.000$ 💥
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(6034);
} else if(prize2 === 14) {
message.user.balance += 777777;
bot(`вы выиграли 777.777$! 😥
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(5968);
} else if(prize2 === 15) {

message.user.transport.car = 31;
bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 💥
🔁 Введите «кнопки» что бы включить стандартные кнопки.

📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
return message.sendSticker(8143);
}
});

cmd.hear(/^(?:bonusrassilka)\s([^]+)/i, async (message, bot) => {
if(message.user.settings.adm < 5) return;
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].balance += 1000000000; 
} 
} 
return bot(`готово)`); 
});

cmd.hear(/^(?:setwall)\s(.*)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 479928763) return;

message.args[1] = message.args[1].replace("wall", ""); 
message.args[1] = message.args[1].split('_'); 
wall_to_send = "wall" + message.args[1][0] + "_" + message.args[1][1]; 
return bot(`обновлён пост для рассылки`); 
}); 

cmd.hear(/^(?:rassilka)\s([^]+)/i, async (message, bot) => {
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 479928763) return;
	
		await bot(`рассылка завершена`);
		users.map(user => {
			if(user.notifications) vk.api.messages.send({ user_id: user.id, message: message.args[1], attachment: wall_to_send, }).then(() => {
				console.log(`SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`NOOOOT ${user.id}`)
			});
			});
	
		for(var i = 1; i < 10; i++) {
			vk.api.messages.send({ chat_id: i, message: message.args[1], attachment: wall_to_send }).then(() => {
				console.log(`CHAT SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`CHAT NOOOOT ${user.id}`)
})
}
});
cmd.hear(/^(?:rassilka2)\s([^]+)/i, async (message, bot) => {
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 479928763) return;
	message.send(`${message.user.tag}, рассылка начата`);
		users.map(user => {
			if(user.notifications) vk.api.messages.send({ user_id: user.id, message: message.args[1], attachment: 'market-187736695_3425205', }).then(() => {
				console.log(`SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`NOOOOT ${user.id}`)
			});
		});
	
		for(var i = 1; i < 900; i++) {
			vk.api.messages.send({ peer_id: 2000000000 + i, message: `🎁 5.000.000.000$ за РЕПОСТ!`, attachment: wall_to_send }).then(() => {
				console.log(`CHAT SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`CHAT NOOOOT ${user.id}`)
		});
	}
	await bot(`рассылка завершена`);
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
	🌟 Уровень: ${message.user.bizlvl}`);
});

cmd.hear(/^(?:маник)$/i, async (message, bot) => {
	if(!message.user.manic) return bot(`у вас нет маника. 
	❓ Для покупки введите «Маники»`);
	const mnc = manic.find(x=> x.id === message.user.manic);
	var nagryzka = utils.random(4, 24);
	return bot(`статистика:
	📇 Модель: ${mnc.name}
	💸 Скорость печатки: ${utils.sp(mnc.earn)}$/5 мин.
	💶 Напечатано: ${utils.sp(message.user.mnc)}$
	💧 Нагрев: ${nagryzka}°C
	🔋 Батарея: RICH ENERGY 1.5v
	✔ Статус: Работает

`);
});

cmd.hear(/^(?:бизнес улучшить)$/i, async (message, bot) => {
	return bot(`Пример команды: бизнес улучшить [1-2]`);
});

cmd.hear(/^(?:маник)\s(?:снять|собрать)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.manic) return bot(`простите, но у вас нет маника. 
	❓ Для покупки введите «Маники»`);
	if(message.user.mnc < 1) return bot(`ваш маник пуст.
	❓ Для просмотра статистики введите «Маник»`);

	const manic_snyal = message.user.mnc;

	message.user.balance += message.user.mnc;
	message.user.mnc = 0;

	return bot(`вы собрали со своего маника ${utils.sp(manic_snyal)}$`);
});

cmd.hear(/(?:ферма|🔋 Ферма|💽 Ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы
	❓ Для покупки введите «Фермы»`);

    if(message.user.timers.farm_btc >= 0) return bot(`биткоины появятся через ${displayTime(message.user.timers.farm_btc)} ${smileerror}`); 

    message.user.timers.farm_btc = 3600;

    const btc_ = message.user.farm_btc * message.user.farmslimit;

    message.user.btc += btc_;
    message.user.farm_btc = 0;

    return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через ${displayTime(message.user.timers.farm_btc)} ${smileerror}
    💽 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(message.user.timers.farm_btc >= 0) return bot(`биткоины появятся через ${displayTime(message.user.timers.farm_btc)} ${smileerror}`); 

	const btc_ = message.user.farm_btc * message.user.misc.farm_count;

	message.user.btc += btc_;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через ${displayTime(message.user.timers.farm_btc)} ${smileerror}
	💽 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`акция завершена. 🙅‍♂`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	return bot(`акция завершена. 🙅‍♂`);
});

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	if(message.args[1] < 10 || message.args[1] >= 100) return bot(`используйте число от 10 до 100`);

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
	
	if(message.user.settings.adm < 4) return bot(`вы не администратор.`); 
	if(!Number(message.args[2])) return; 
	if(message.user.timers.peredat > getUnix()) return bot(`Вы сможете Выдать через ${unixStampLeft(message.user.timers.peredat - Date.now())}`);
	getUnix() + 3600000;

	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	
	{ 

		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
		const bilo = utils.sp(user.balance);
		if(message.args[2] > message.user.settings.limit) return bot(`максимальная сумма для выдачи ${utils.sp(message.user.settings.limit)}$ ${smileerror}`);

		message.user.timers.peredat = getUnix() + 3600000;
		user.balance += message.args[2];

		await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$ ${smilesuccess}

		💸 Старый баланс: ${bilo}$
		💸 Новый баланс: ${utils.sp(user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$` });
}
});
cmd.hear(/^(?:сетник)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 4) return bot(`вы не администратор.`); 
	
	{ 

		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

		user.tag = message.args[2];

		await bot(`Ник сменен`);
vk.api.messages.send({ user_id: user.id, message: `📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$` });
}
});
cmd.hear(/^(?:выдатьруб)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
 message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
 message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
 message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
 
  if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
 if(!Number(message.args[2])) return;  
 message.args[2] = Math.floor(Number(message.args[2])); 
 if(message.args[2] <= 0) return; 
 
 { 

  let user = users.find(x=> x.uid === Number(message.args[1])); 
  if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
  const bilo = utils.sp(user.balance);

  user.rub += message.args[2];

  await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}₽ ${smilesuccess}

`);
vk.api.messages.send({ user_id: user.id, message: `📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}₽!\n💸 Доната: ${utils.sp(user.rub)}$` });
}
});
cmd.hear(/^(?:лимитв)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
 message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
 message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
 message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
 
  if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
 if(!Number(message.args[2])) return;  
 message.args[2] = Math.floor(Number(message.args[2])); 
 if(message.args[2] <= 0) return; 
 
 { 

  let user = users.find(x=> x.uid === Number(message.args[1])); 
  if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
  const bilo = utils.sp(user.balance);

  user.settings.limit = message.args[2];

  await bot(`игроку увеличен лимит Выдачи [id${user.id}|${user.tag}] ${utils.sp(message.args[2])} ${smilesuccess}

`);
vk.api.messages.send({ user_id: user.id, message: `📢 Владелец [id${message.user.id}|${message.user.tag}] увеличил вам лимит ${utils.sp(message.args[2])}!\n Лимит Выдачи: ${utils.sp(user.settings.limit)}$` });
}
});
cmd.hear(/^(?:ВыдатьСан)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
 message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
 message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
 message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
 
 if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
 if(!Number(message.args[2])) return;  
 message.args[2] = Math.floor(Number(message.args[2])); 
 if(message.args[2] <= 0) return; 
 
 { 

  let user = users.find(x=> x.uid === Number(message.args[1])); 
  if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
  const bilo = utils.sp(user.balance);

  user.sun += message.args[2];

  await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}❄️ ${smilesuccess}
  `);
vk.api.messages.send({ user_id: user.id, message: `📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n🌸 СанКойнов: ${utils.sp(user.sun)}$` });
}
});

cmd.hear(/^(?:фокус)/i, async (message) => {
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	users[3].uid=0;
	return message.send(`Угу.`)
	});


cmd.hear(/^(?:бан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 3) return; 

if(message.args[2] < 1) return;
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = true; 
user.settings.adm = 1; 

await bot(`вы забанили игрока *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `ваш аккаунт заблокирован за игровые нарушения администратором [id${message.user.id}|${message.user.tag}] ⛔` }); 
}
});

cmd.hear(/^(?:бантоп)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 7) return; 
	
	if(message.args[2] < 1) return;
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	
	user.bantop = true; 
	
	await bot(`вы забанили топ игрока *id${user.id} (${user.tag}).`,); 
	vk.api.messages.send({ user_id: user.id, message: `Топ был заблокирован за игровые нарушения администратором [id${message.user.id}|${message.user.tag}] ⛔` }); 
	}
});

cmd.hear(/^(?:разбантоп)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 7) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	
	user.bantop = false; 
	
	await bot(`вы разбанили топ игрока *id${user.id} (${user.tag}).`); 
	vk.api.messages.send({ user_id: user.id, message: `Топ был разблокирован.` }); 
	}
	});
	

cmd.hear(/^(?:разбан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 3) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

await bot(`вы разбанили игрока *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:сн)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 3) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

await bot(`игроку *id${user.id} (${user.tag}) установлен ник. &#9989;`); 
user.tag = `СМЕНИТЕ НИК`;

}
});
cmd.hear(/^(?:лник)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 3) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.nicklimit = 30; 

await bot(`игроку *id${user.id} (${user.tag}). выдан лимит на ник до 30 символов. &#9989;`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит на ник до 30 символов администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:промо вкл)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

clearPromo();
return bot(`промокод включен! ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип btc)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
config.promotip = "btc"; 
return bot(`тип промокода: Bitcoin. ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
config.promotip = "balance"; 
return bot(`тип промокода: Баланс. ${smilesuccess}`);

});

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: «копать железо/золото/алмазы» ${smileerror}`);

});

cmd.hear(/^(?:копать железо)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.opit += 2;
message.user.zhelezo += randzhelezo;

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

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

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

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

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.opit}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

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

cmd.hear(/^(?:снять привилегию)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.adm = 1; 
user.farmslimit = 1000;
user.nicklimit = 16; 

await bot(`пользователь *id${user.id} (${user.tag}) успешно снят.`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	🔔 Информация о снятии:
	 Причина: нарушение правил
	 ID снятия: 2№
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});

cmd.hear(/^(?:adminka)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.adm = 3; 
user.farmslimit = 10000000000000000000; 
user.nicklimit = 30;

let donate = utils.random(1, 99);

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл донат "Администратор".`); 
vk.api.messages.send({ user_id: user.id, message: `_____________________

	Спасибо за покупку прав Администратора!

	Информация о покупке:
	 Сумма: 350rub
	 Донат ID: undefined 
	 Ваш игровой ID: ${user.id}

	 _____________________ ` }); 
}
});

cmd.hear(/^(?:autodonate1kkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 1000000000000; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "1.000.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ На ваш счёт зачислена валюта "1.000.000.000.000$ 💼", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonateunban)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.ban = false; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "РАЗБАН".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ Вы приобрели "РАЗБАН", спасибо за покупку!\n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonatevip)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.settings.adm = 2; 
	user.farmslimit = 5500; 
	user.nicklimit = 30; 
	
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "Вип".`); 
	vk.api.messages.send({ user_id: user.id, message: `💥 Вы теперь имеете постоянный VIP-статус! \n\nРекомендуем присоедениться в беседу VIP: https://vk.me/join/AJQ1d4xViRQZVDQSo8eDjhkt` }); 
	}
	});

cmd.hear(/^(?:autodonateadministrator)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 3; 
user.farmslimit = Infinity; 
user.nicklimit = 30; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "АДМИНИСТРАТОРА".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ Вы приобрели привилегию "АДМИНИСТРАТОР", спасибо за покупку! \n\nРекомендуем присоедениться в беседу администрации: https://vk.cc/9E0rEI\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: https://botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonate100kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 100000000000; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "100.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ На ваш счёт зачислена валюта "100.000.000.000$ 💰", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonate50kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 50000000000; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "50.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ На ваш счёт зачислена валюта "50.000.000.000$ 💴", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonate15kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 15000000000; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "15.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "15.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: botmeduza.ru` }); 
}
});

cmd.hear(/^(?:autodonatecase)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.case4 += 1; 
	
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл CASE.`); 
	vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ Спасибо за покупку Супер Сундука!\n\nВсе пожертвованные вами деньги пойдут на развитие бота.` }); 
	}
	});

cmd.hear(/^(?:upload)$/i, async (message, bot) => {
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
    await message.send(`ПЕРЕЗАГРУЗКА, УНИЧТОЖЕНИЯ ВСЕГО.`);

	process.exit(-1);
});

cmd.hear(/^(?:autodonatebiz)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.business = 12; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], вы приобрели бизнес «🖨 Космическое агентство» за 119 рублей.\n\n🔥 Это лучший игровой бизнес которого НЕТ В ПРОДАЖЕ с прибылью в 150.000.000.000$/час игровой валюты!` }); 
}
});

cmd.hear(/^(?:победа2)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.bizlvl = 1;
user.business = 12; 

await bot(`пользователь *id${user.id} (${user.tag}) выиграл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🗺 Вы выиграли в конкурсе лучший бизнес «Космическое Агенство».` }); 
}
});

cmd.hear(/^(?:победа3)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.manic = 7;

await bot(`пользователь *id${user.id} (${user.tag}) выиграл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🖨 Вы выиграли в конкурсе денежный принтер «Giant X10».` }); 
}
});

cmd.hear(/^(?:победа4)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 6500000000000;

await bot(`пользователь *id${user.id} (${user.tag}) выиграл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n💰 Вы выиграли в конкурсе «6.500.000.000.000$». \n❤ Приз уже на вашем балансе!` }); 
}
});

cmd.hear(/^(?:победа5)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 1000000000000;

await bot(`пользователь *id${user.id} (${user.tag}) выиграл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n💰 Вы выиграли в конкурсе «1.000.000.000.000$». \n❤ Приз уже на вашем балансе!` }); 
}
});

cmd.hear(/^(?:победа1)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 3;

await bot(`пользователь *id${user.id} (${user.tag}) выиграл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🚶‍♂ Вы выиграли в конкурсе права «ADMINISTRATOR».` }); 
}
});

cmd.hear(/^(?:autodonatemanic)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.manic = 7; 

await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "Лучший маник.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], вы приобрели денежный принтер «Giant X10» за 59 рублей.\n\n💎 Это лучший денежный принтер которого НЕТ В ПРОДАЖЕ с прибылью в 1.250.000.000$/час игровой валюты.\n🔋 Батарея разряжается в 4 раза дольше.\n💧 Полностью отсутствует перегрев, принтер выдается НАВСЕГДА!` }); 
}
});

cmd.hear(/^(?:сбросить фермы)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.senderId !== 530903911 && message.senderId !== 545423358) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.farm = 0; 
user.farms = 0; 
user.farm_btc = 0; 
user.farmslimit = 1000;

await bot(`пользователю *id${user.id} (${user.tag}) сброшенны фермы.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:банпер)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.user.settings.adm < 4) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

	1&#8419; Ваш питомец никогда не потеряется в походе. 
	2&#8419; В вашем профиле будет красивая отметка. 
	3&#8419; У вас не будет лимита на фермы. 
	4&#8419; Вы сможете ставить длинный ник. 
	5&#8419; Возможность получать репорты и отвечать на них. 
	6&#8419; Возможность блокировать игроков. 
	7&#8419; Выдача игровых средств в любом количестве. 
	8&#8419; Менять ники игрокам. 
	9&#8419; Выдавать длинные ники другим игрокам. 
	1&#8419;0&#8419; Получать случайную ссылку на беседу. 
	1&#8419;1&#8419; Увеличенные шансы в казино. 
	1&#8419;2&#8419; Возможность просмотра профиля игроков по ID c подробной информацией. 
	1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
	1&#8419;4&#8419; ✅ NEW - Разрешение на продажу ДОПОЛНЕНИЙ другим игрокам! 
		
		🔑 Покупать у https://vk.com/perpnameis
		
		🆘 При оплате вам необходимо ввести свой ID.`, {attachment:'market-187736695_3425202'});
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.settings.trade = false;

	return bot(`(${user.tag}) был лишён права передавать деньги.`, {attachment:'market-187736695_3425195'});
}
	});

cmd.hear(/^(?:разбанпер)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.user.settings.adm < 4) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

	1&#8419; Ваш питомец никогда не потеряется в походе. 
	2&#8419; В вашем профиле будет красивая отметка. 
	3&#8419; У вас не будет лимита на фермы. 
	4&#8419; Вы сможете ставить длинный ник. 
	5&#8419; Возможность получать репорты и отвечать на них. 
	6&#8419; Возможность блокировать игроков. 
	7&#8419; Выдача игровых средств в любом количестве. 
	8&#8419; Менять ники игрокам. 
	9&#8419; Выдавать длинные ники другим игрокам. 
	1&#8419;0&#8419; Получать случайную ссылку на беседу. 
	1&#8419;1&#8419; Увеличенные шансы в казино. 
	1&#8419;2&#8419; Возможность просмотра профиля игроков по ID c подробной информацией. 
	1&#8419;3&#8419; Возможность кикать людей из чужих бесед.
	1&#8419;4&#8419; ✅ NEW - Разрешение на продажу ДОПОЛНЕНИЙ другим игрокам! 
		
		🔑 Покупать у https://vk.com/perpnameis
		
		🆘 При оплате вам необходимо ввести свой ID.`, {attachment:'market-187736695_3425202'});
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.settings.trade = true;

	return bot(`(${user.tag}) теперь снова может передавать деньги.`);
}
	});

cmd.hear(/^(?:клан помощь)$/i, async (message, bot) => {
let clanid = message.user.clanid;
return bot(`информация по командам:
⠀1⃣ Клан - информация о клане
⠀2⃣ Клан улучшить - улучшить клан
⠀3⃣ Клан состав - участники клана
⠀4⃣ Клан создать [название] - создать клан
⠀5⃣ Клан название [название] - смена названия клана
⠀6⃣ Клан метка [метка] - символ клана
⠀7⃣ Клан открыть - открыть клан для вступлений 🔓
⠀8⃣ Клан закрыть - закрыть клан для вступлений 🔒
⠀9⃣ Клан [пополнить/снять] [сумма] - казна клана
⠀1⃣0⃣ Клан атака - атаковать другой клан
⠀1⃣1⃣ Клан повысить [id] - повысить звание игроку
⠀1⃣2⃣ Клан понизить [id] - понизить звание игроку
⠀1⃣3⃣ Клан кик [id] - выгнать игрока
⠀1⃣4⃣ Клан войти [id клана] - вступить в клан
⠀1⃣5⃣ Клан покинуть - покинуть клан

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
if(clans[clanid].users[id].level == 3) text += `👑 Создатель клана - @id${user.id} (${user.tag})\n`;
} else {
if(clans[clanid].users[id].level == 3) text += `👑 Создатель клана - @id${user.id} (${user.tag})\n`;
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

cmd.hear(/^(?:vzorvijpa)$/i, async (message, bot) => { 
for(i=0;i<20000;i++){ 
if(users[i].manic < 7){ 
users[i].manic = 0;
} 
} 
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
🆕 Следующее улучшение стоит 500.000.000.000$`);
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
let zaprets1 = message.args[1].toLowerCase();
var zapret = /(🤵)/
var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
var check = true;
return bot(`в названии есть запрещенные символы ${smileerror}`);
} 
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

cmd.hear(/^(?:клан название)\s(.*)$/i, async (message, bot) => {
if(!message.args[1]) return bot(`введите название для клана!`);
let zaprets1 = message.args[1].toLowerCase();
var zapret = /(🤵|📔|📗📘|📙|📕|⍻|🗸|√|☑|✔|👑|✅|✓)/
var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
var check = true;
return bot(`в названии есть запрещенные символы ${smileerror}`);
}
let clanid = message.user.clanid;
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
if(message.user.settings.adm > 2) return bot(`администратор не может пополнять клан. 🚫`);
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return;

if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы ${smileerror}`, {attachment:'market-187736695_3425195'});
else if(message.args[1] <= message.user.balance)
{
message.user.balance -= message.args[1];
clans[clanid].balance += message.args[1];

return bot(`вы положили на счёт клана ${utils.sp(message.args[1])}$`);
}
});

cmd.hear(/^(?:клан)\s(?:снять)\s(.*)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
	❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`снимать деньги клана может модератор клана и выше!`);
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, clans[clanid].balance);

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return;

if(message.args[1] > clans[clanid].balance) return bot(`на балансе клана нет данной суммы ${smileerror}`, {attachment:'market-187736695_3425195'});
else if(message.args[1] <= clans[clanid].balance)
{
message.user.balance += message.args[1];
clans[clanid].balance -= message.args[1];

return bot(`вы сняли ${utils.sp(message.args[1])}$ с баланса клана

Напомним, передача средств через клан строго запрещена и карается блокировкой!`);
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
if(clans[idclan].peoples >= 15) return bot(`клан переполнен!`);
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

cmd.hear(/^(?:обнулить)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 550159662) return;
  
  	{
		 
  			let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.balance = 50000000,
		user.bank=50000,
		user.btc=0,
		user.farm_btc=0,
		user.farms=0,
		user.business=[],
		user.farmslimit=1000,
		user.manic_farm=0,
		user.manic=0,
		user.misc.farm_count=0,
		user.energy=10,
		user.opit=0,
		user.biz=0,
		user.zhelezo=0,
		user.zoloto=0,
		user.manic_pribil=215,
		user.almaz=0,
		user.bizlvl=0,
		user.manic_lvl=1,
		user.nicklimit=16,
		user.rating=1,
		user.regDate=`${data()}, ${time()}`,
		user.mention=true,
		user.ban=false,
		user.timers.hasWorked= false,
		user.timers.bonus= false,
		user.timers.poxod= false,
		user.timers.poxod2= false,
		user.timers.kopat= false,
		user.timers.hack= false,
		user.timers.vidat= false,
		user.timers.peredat= false,
		user.timers.ataka= false,
		user.tag= `СМЕНИТЕ НИК`,
		user.work=0,
		user.business=0,
		user.notifications=true,
		user.exp=0,
		user.level=1,
		user.referal=null,
		user.promo=false,
		user.transport.car=0,
		user.transport.yacht=0,
		user.transport.airplane=0,
		user.transport.helicopter=0
		user.realty.home=0,
		user.realty.apartment=0
		user.misc.phone=0,
		user.misc.pet=0,
		user.misc.farm=0,
		user.settings.firstmsg=true,
		user.settings.adm=1,
		user.settings.trade=true,
		user.settings.old=false,
		user.settings.limit=100000000000,
		user.settings.pet.lvl=0,
		user.settings.pet.poterl=false,
		user.marriage.partner=0,
		user.marriage.requests=[]

		return bot(`обнулен`);
}
	});

cmd.hear(/^(?:золото)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zoloto)} золота. 🏵`);

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
	message.user.energy = 1;
}, 3000000);

return bot(`вы заработали ${utils.sp(taxicash)}$
Энергия закончилась. ⚠`);

}

if(message.user.energy > 0) bot(`вы заработали ${utils.sp(taxicash)}$`);

});

cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.timers.hack >= 0) return bot(`что бы вас не расскрыли, вы сможете взломать только через ${displayTime(message.user.timers.hack)} ${smileerror}`); 

let situac = utils.random(1, 2, 3);

if(situac === 1) {

let hackcash = utils.random(156781,451981);
message.user.balance += hackcash;
message.user.timers.hack = 3600;

return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`,{attachment: `photo-181406058_457239343`});
} else if(situac === 2) {

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
message.user.timers.hack = 6000;

return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. ✅ Вы заработали ${utils.sp(hackcash)}$`,{attachment: `photo-181406058_457239345`});
} else if(situac === 3) {

return bot(`вы целый месяц планировали ограбление банка, настал этот день и вы пошли грабить банк в одиночку, но вас в него не впустили, оказывается он закрылся пару недель назад.`,{attachment: `photo-181406058_457239344`});
}

});

cmd.hear(/^(?:промо)\s([0-9]+)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
config.promovalue = Number(message.args[1]); 
return bot(`сумма промокода: ${config.promovalue}. ${smilesuccess}`);

});

cmd.hear(/^(?:промо лимит)\s([0-9]+)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358) return;
config.promolimit = Number(message.args[1]); 
return bot(`лимит использований промокода: ${config.promolimit}. ${smilesuccess}`);

});
cmd.hear(/^(?:Киберспортсмен)$/i, async (message, bot) => {
			if(message.user.gg < 50) return bot (`📱 » Недостаточно игр сыграно`);
	  	if(message.user.krut == 1) return bot (`😓 » Вы уже Киберспортсмен`);
    	message.user.krut = 1
    	bot(`Вы теперь Киберспортсмен`);
			return message.sendSticker(16585);
	  	});
cmd.hear(/^(?:Префиксы)/i, async (message) => {

return message.send(`
Префиксы: Красивая метка в Профиле
1.🌺 Фломастер - 12.000.000.000$
2.🧝 Боженька - 16.000.000.000$
3.🎅 Санта - 200.000.000.000$
4.🤴 Король - 500.000.000.000$
5.👥 Нелюдь - 750.000.000.000$
6.⭐ Звёздочка - 1.250.000.000.000$
7.🌐 Земля - 2.500.000.000.000$
`)
});
cmd.hear(/^(?:Правила)/i, async (message) => {

return message.send(`
⛔Правила бота Infinity⛔
1.Ники 18+, с матами и т.д.-Бан на 1 день, если модератор-выговор
-------------------------------------
2.Оскорбление кого либо.-Онулирование профиля, если модератор-выговор
-----------------------------------— 
3.Спам, попрошайничество и т.д.-Бан 2 дня, если модератор-выговор
-----------------------------------— 
4.Попытка взлома, хака и т.д.-Бан навсегда, если модератор-увольнение и бан навсегда
-----------------------------------— 
5.Цензура в словах и т.д.-Онулирование профиля, если модератор-выговор
-----------------------------------— 
6.Угроза игрокам, админам и т.д.-Бан 7 дней, если модератор-выговор
-----------------------------------— 
7.Спам в лс бота-Предупреждение, если модератор-предупреждение
-----------------------------------— 
8.Спамить в лс администратором бота-Бан навсегда
⚠Помните, правила, делают бота только лучше, и администрация всегда следит!!!⚠
`)
});
cmd.hear(/^(?:Апанель)/i, async (message) => {
  if(message.user.settings.adm < 4) return bot(`Вы не Администратор`);

return message.send(`
Команды Администратора
1. Ответ [Сообщения]
2. Бан [Ид]
3. Разбан [Ид]
4. Статистика [Ид]
5. Выдать [Ид] [1-1.000.000.000.000]
6. Банпер [Ид]
7. РазбанПер [Ид]
`)
});
cmd.hear(/^(?:Статусы)/i, async (message) => {

return message.send(`
Статусы: Их Нельзя Купить Это статус, кем вы отвечаете в боте
1. 🎁 Конкурсовод
2. 🌟 Владелец
3. 🖥️ Кодер
4. 📱 Тех Поддержка
5. 🔋 Заместитель Владельца
6. 👍 Помощник
7.🖥️  Разработчик
`)
});
cmd.hear(/^(?:Игры)/i, async (message) => {

return message.send(`
⭐ 1. Brawl Stars - 15.000.000.000$
🖥️ 2. Dota2 - 20.000.000.000$
⚔️ 3. CS:GO - 35.000.000.000$
🎁 4. Minecraft - 63.000.000.000$
🏐 5. ROBLOX - 100.000.000.000$
🌸 6. World Of Tanks - 10.000.000.000$
🖥️ 7. Fortnite - 65.000.000.000$

📀 » Для Выбора Напишите "Игра [id]"
`)
});
cmd.hear(/^(?:Игр(а|ы) 7)$/i, async (message, bot) => {
			if(message.user.balance < 65000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 65000000000
			message.user.ded = 8;
			bot(`Вы Приобрели Игру «Fortnite»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 6)$/i, async (message, bot) => {
			if(message.user.balance < 10000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 10000000000
			message.user.ded = 7;
			bot(`Вы Приобрели Игру «World Of Tanks»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 5)$/i, async (message, bot) => {
			if(message.user.balance < 100000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 100000000000
			message.user.ded = 6;
			bot(`Вы Приобрели Игру «ROBLOX»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 4)$/i, async (message, bot) => {
			if(message.user.balance < 63000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 63000000000
			message.user.ded = 5;
			bot(`Вы Приобрели Игру «Minecraft»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 3)$/i, async (message, bot) => {
			if(message.user.balance < 35000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 35000000000
			message.user.ded = 4;
			bot(`Вы Приобрели Игру «CS:GO»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 2)$/i, async (message, bot) => {
			if(message.user.balance < 20000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 20000000000
			message.user.ded = 3;
			bot(`Вы Приобрели Игру «Dota2»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:Игр(а|ы) 1)$/i, async (message, bot) => {
			if(message.user.balance < 15000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 15000000000
			message.user.ded = 2;
			bot(`Вы Приобрели Игру «Brawl Stars»`);
			return message.sendSticker(16509);
	  	});
cmd.hear(/^(?:! vk.token|eval vk.token|- vk.token)/i, async (message) => {

return message.send(`
Хуй а не токен
`)
});
cmd.hear(/^(?:! user.token|eval user.token|- user.token)/i, async (message) => {

return message.send(`
Хуй а не токен
`)
});
cmd.hear(/^(?:Напиток Выпить)$/i, async (message, bot) => {
			if(message.user.sun < 1) return bot (`недостаточно средств.`);
			message.user.sun -= 1
			message.user.timers.vidat = false;
			bot(`Вы Выпили «Напиток Геймера» Таймер Игры Обнулен`);
			return message.sendSticker(16546);
		});
cmd.hear(/^(?:префи(кс|ксы) 1)$/i, async (message, bot) => {
			if(message.user.balance < 12000000000) return bot (`недостаточно средств.`);
			message.user.balance -= 12000000000
			message.user.settings.agent = 2;
			bot(`Вы Приобрели «Префикс Фломастер»`);
			return message.sendSticker(16509);
		});
  cmd.hear(/^(?:префи(кс|ксы) 2)$/i, async (message, bot) => {
			if(message.user.sun < 16000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 16000000000
			message.user.settings.agent = 3;
			bot(`Вы Приобрели «Префикс Боженька»`);
			return message.sendSticker(16509);
		});
cmd.hear(/^(?:префи(кс|ксы) 3)$/i, async (message, bot) => {
			if(message.user.sun < 20000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 20000000000
			message.user.settings.agent = 4;
			bot(`Вы Приобрели «Префикс Санта»`);
			return message.sendSticker(16509);
		});
cmd.hear(/^(?:префи(кс|ксы) 4)$/i, async (message, bot) => {
			if(message.user.sun < 500000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 500000000000
			message.user.settings.agent = 5;
			bot(`Вы Приобрели «Префикс Король»`);
			return message.sendSticker(16509);
	  	});
  cmd.hear(/^(?:префи(кс|ксы) 5)$/i, async (message, bot) => {
			if(message.user.sun < 750000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 750000000000
			message.user.settings.agent = 6;
			bot(`Вы Приобрели «Префикс Нелюдь»`);
			return message.sendSticker(16509);
		});
cmd.hear(/^(?:префи(кс|ксы) 6)$/i, async (message, bot) => {
			if(message.user.sun < 1250000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 1250000000000
			message.user.settings.agent = 7;
			bot(`Вы Приобрели «Префикс Звездочка»`);
			return message.sendSticker(16509);
		});
cmd.hear(/^(?:префи(кс|ксы) 7)$/i, async (message, bot) => {
			if(message.user.sun < 2500000000000) return bot (`недостаточно средств.`);
			message.user.sun -= 2500000000000
			message.user.settings.agent = 8;
			bot(`Вы Приобрели «ЛЕГЕНДАРНЫЙ ПРЕФИКС ЗЕМЛЯ»`);
			return message.sendSticker(16509);
		});
cmd.hear(/^(?:раздача1)$/i, async (message, bot) => {
	if(message.user.settings.adm < 8) return message.send(`вы не администратор`);
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -187620137,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит VIP-статус НАВСЕГДА! 👑
		Беседа с ботом: vk.cc/9Vsneh
		
		🔍 Посылки будут отправлены ровно через 48 часов после создания этой записи, Ваш профиль ВК должен быть открыт.`,
		attachments: 'photo-187736695_457239037'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -187620137,
				post_id: response.post_id,
				from_group: 187620137,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -187620137, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.settings.adm = 2;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! 🔑\n\n 💥 Вы теперь имеете постоянный VIP-статус!` });
					vk.api.messages.send({ user_id: 194177722, message: ``})
				});
			});
			user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
			giving = false;
		}, 172800000);
	});
});
cmd.hear(/^(?:раздача3)$/i, async (message, bot) => {
	if(message.user.settings.adm < 8) return message.send(`вы не администратор`);
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -187620137,
		message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ Получит Новогодний сундук С Новым Годом  👑
		Беседа с ботом: vk.cc/9Vsneh
		
		🔍 Посылки будут отправлены ровно через 1 час после создания этой записи, Ваш профиль ВК должен быть открыт.`,
		attachments: 'photo-187736695_457239037'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -187620137,
				post_id: response.post_id,
				from_group: 187620137,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -187620137, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.case5 += 1;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! 🔑\n\n 💥С новым годом вы получили Новогодний сундук для открытие напишите открыть 5` });
					vk.api.messages.send({ user_id: 194177722, message: ``})
				});
			});
			user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
			giving = false;
		}, 3600000);
	});
});
cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	if(message.user.settings.adm < 8) return message.send(`вы не администратор`);
	if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
	giving = true;
	user.api.wall.post({
		owner_id: -187620137,
		message: `🔥 Новая раздача!
		📢 Каждый, кто сделает репост этой записи, получит 5.000.000.000$ на свой баланс!
❗Деньги будут зачислены через 5 часов после начала акции. Ваш профиль ВК должен быть открыт.
		Беседа с ботом: vk.cc/9Vsneh
		`,
		attachments: 'photo-187736695_457239080'
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -187620137,
				post_id: response.post_id,
				from_group: 187620137,
				message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
			});
			user.api.wall.closeComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -187736695, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance += 5000000000;
					vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], 💖Спасибо за участие в раздаче, вы получаете 5.000.000.000$ на свой баланс. ` });
					vk.api.messages.send({ user_id: 194177722, message: ``})
				});
			});
			user.api.wall.openComments({
				owner_id: -187620137,
				post_id: response.post_id
			});
			user.api.wall.closeComments({
				owner_id: -187736695,
				post_id: response.post_id
			});
			giving = false;
		}, 18000000);
	});
});

cmd.hear(/^(?:кикнуть|кик)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе ${smileerror}`);
if(message.user.settings.adm < 4) return;
var domain = message.args[2].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[2]
}).then((res) => { 
let user = users.find(x=> x.id === Number(res.object_id)); 
vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: res.object_id })
.catch((error) => {return bot(`такого игрока нет в беседе ${smileerror}`);
}); 
return bot(`пользователь был исключен из чата!`); 
})
});

cmd.hear(/^(?:беседы|чаты|боты)$/i, async (message, bot) => { 
let text1 = ``; 
let text2 = ``; 
user.api.messages.getChat({ 
chat_id: 1
}).then(async function (response) { 
text1 += `1&#8419; ${response.title} [${response.members_count}/500]\n> vk.cc/9Vsneh`; 
});

return bot(`наши официальные беседы: 

${text1} 

💬 Кол-во участников обновляется в автоматическом режиме`); 
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


cmd.hear(/^(?:задания|квесты|👒 Квесты|квест)$/i, (message, bot) => {
	if ( !('quests' in message.user) )
		message.user.quests = quests.map(item => { return 0 })

	let lines = [`доступные квесты:`, '']

	quests.map( (quest, i) => {
		lines.push(`${message.user.quests[i] >= quest.actions ? '✅' : '❌'} ${i + 1}. ${quest.name} (${utils.sp(quest.reward)}$)`) //message.user.quests.filter( (current, j) => i == j )[0] >= quest.action
	})

	lines.push('', '🔑 Квесты обнуляются раз в 24 часа!')

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

cmd.hear(/^(?:открыть 1|сундук открыть 1|кейс открыть 1)$/i, async (message, bot) => {

	if(message.user.case1 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case1 -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

	if(prize === 1) {
		message.user.opit += 32;
		return bot(`вы выиграли 32 опыта 🏆 ${smilesuccess}`);
	} else if (prize == 2) {
		message.user.opit += 11;
		return bot(`вы выиграли 11 опыта 🏆 ${smilesuccess}`);
	} else if (prize == 3) {
		message.user.opit += 50;
		return bot(`вы выиграли 50 опыта 🏆 ${smilesuccess}`);
	} else if (prize == 4) {
    	message.user.balance += 1500000000;
		return bot(`вы выиграли 1.500.000.000$ ${smilesuccess}`);
	} else if (prize == 5) {
		message.user.balance += 1100000000;
		return bot(`вы выиграли 1.100.000.000$ ${smilesuccess}`);
	} else if(prize === 6) {
		message.user.rating += 10;
		return bot(`вы выиграли 10 рейтинга 👑 ${smilesuccess}`);
	} else if(prize === 7) {
		message.user.rating += 15;
		return bot(`вы выиграли 15 рейтинга 👑 ${smilesuccess}`);
	} else if(prize === 8) {
		message.user.case2 += 1;
		return bot(`вы выиграли «Стандартный сундук», вам крупно повезло! 📦 ${smilesuccess}`);
	}
});
cmd.hear(/^(?:открыть 5|сундук открыть 5|кейс открыть 5)$/i, async (message, bot) => {

	if(message.user.case5 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case5 -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5]);

	if(prize === 1) {
		message.user.sun += 1;
		return bot(`Вам Выпал Геймерский Напиток, чтобы выпить напишите "Напиток Выпить" ${smilesuccess}`);
	} else if (prize == 2) {
		message.user.settings.adm = 4;
		return bot(`Админка Уии ${smilesuccess}`);
	} else if (prize == 3) {
		message.user.ded = 9;
		return bot(`вы выиграли Секретную Игру 🏆 ${smilesuccess}`);
	} else if (prize == 4) {
    	message.user.balance += 1500000000;
		return bot(`вы выиграли 1.500.000.000$ ${smilesuccess}`);
	} else if (prize == 5) {
		message.user.sun += 2;
		return bot(`вам выпало 2 напитка, чтобы выпить напишите "Напиток Выпить" ${smilesuccess}`);
	}
});
cmd.hear(/^(?:открыть 2|сундук открыть 2|кейс открыть 2)$/i, async (message, bot) => {

	if(message.user.case2 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case2 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

	if(prize2 === 1) {
		message.user.opit += 32;
		return bot(`вы выиграли 32 опыта 🏆 ${smilesuccess}`);
	} else if(prize2 == 2) {
		message.user.opit += 69;
		return bot(`вы выиграли 69 опыта 🏆 ${smilesuccess}`);
	} else if(prize2 === 3) {
		message.user.opit += 80;
		return bot(`вы выиграли 80 опыта 🏆 ${smilesuccess}`);
	} else if(prize2 === 4) {
		message.user.balance += 17200000000;
		return bot(`вы выиграли 17.200.000.000$ ${smilesuccess}`);
	} else if(prize2 === 5) {
		message.user.balance += 3500000000;
		return bot(`вы выиграли 3.500.000.000$ ${smilesuccess}`);
	} else if(prize2 === 6) {
		message.user.rating += 10;
		return bot(`вы выиграли 10 рейтинга 👑 ${smilesuccess}`);
	} else if(prize2 === 7) {
		message.user.rating += 1390;
		return bot(`вы выиграли 1.390 рейтинга 👑 ${smilesuccess}`);
	} else if(prize2 === 8) {
		message.user.case3 += 1;
		return bot(`вы выиграли «Золотой сундук», вам крупно повезло! �� ${smilesuccess}`);
	} else if(prize2 === 9) {
		message.user.balance += 3500000000;
		return bot(`вы выиграли 3.500.000.000$ ${smilesuccess}`);
	} else if(prize2 === 10) {
		message.user.rating += 72;
		return bot(`вы выиграли 72 рейтинга 👑 ${smilesuccess}`);
	} else if(prize2 === 11) {
		message.user.rating += 139;
		return bot(`вы выиграли 139 рейтинга 👑 ${smilesuccess}`);
	} else if(prize2 === 12) {
		message.user.balance += 3500000000;
		return bot(`вы выиграли 3.500.000.000$ ${smilesuccess}`);
	} else if(prize2 === 13) {
		message.user.rating += 84;
		return bot(`вы выиграли 84 рейтинга 👑 ${smilesuccess}`);
	} else if(prize2 === 14) {
		message.user.rating += 241;
		return bot(`вы выиграли 241 рейтинга 👑 ${smilesuccess}`);
	}
});

cmd.hear(/^(?:открыть 4|сундук открыть 4|кейс открыть 4)$/i, async (message, bot) => {

	if(message.user.case4 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case4 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4]);

	if(prize2 === 1)
	{
		message.user.settings.adm = 3;
		return bot(`🌟 Вы Выиграли Премиум`);
	} else if(prize2 === 2) {
		message.user.settings.adm = 4;
		return bot(`⚔️ Админ Победа Вместо Обеда`);
	} else if(prize2 === 3) {
		message.user.balance += 500000000000;
		return bot(`👍 500ккк! Класс`);
	} else if(prize2 === 4) {
		message.user.settings.adm = 5;
		return bot(`💎 Вы выиграли "Главного Администратора".`);
	}

});
cmd.hear(/^(?:открыть 7|сундук открыть 7|кейс открыть 4)$/i, async (message, bot) => {

	if(message.user.case7 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case7 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5]);

	if(prize2 === 1)
	{
		message.user.case7 += 1;
		return bot(`1 Супер Сундук`);
	} else if(prize2 === 2) {
		message.user.settings.adm = 4;
		return bot(`⚔️ Админ Победа Вместо Обеда`);
	} else if(prize2 === 3) {
		message.user.balance += 500000000000;
		return bot(`👍 500ккк! Класс`);
	} else if(prize2 === 4) {
		message.user.settings.adm = 5;
		return bot(`💎 Вы выиграли "Главного Администратора".`);
	} else if(prize2 === 5) {
		message.user.settings.adm = 7;
		return bot(`💎 Вы выиграли "Владельца".`);
	}
});

cmd.hear(/^(?:открыть 3|сундук открыть 3|кейс открыть 3)$/i, async (message, bot) => {

	if(message.user.case3 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case3 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5]);

	if(prize2 === 1) {
		message.user.opit += 12;
		return bot(`вы выиграли 12 опыта 🏆 ${smileserror}`);
	} else if(prize2 === 2) {
		message.user.opit += 58;
		return bot(`вы выиграли 58 опыта 🏆 ${smilesuccess}`);
	} else if(prize2 === 3) {
		message.user.opit += 500;
		return bot(`вы выиграли 500 опыта 🏆 ${smilesuccess}`);
	} else if(prize2 === 4) {
		message.user.balance += 20000000000;
		return bot(`вы выиграли 20.000.000.000$ ${smilesuccess}`);
	} else if(prize2 === 5) {
		message.user.balance += 55000000000;
		return bot(`вы выиграли 55.500.000.000$ ${smilesuccess}`);
	}
});

cmd.hear(/^(?:сундуки|кейсы|📦 Сундуки)$/i, async (message, bot) => {
		let text = ``;
	
text += `\n1&#8419; Начинающий сундук - 1 млрд$\n`;
text += `2&#8419; Стандартный сундук - 15 млрд$\n`;
text += `3&#8419; Золотой сундук - 40 млрд$\n`;
text += `4&#8419; Супер сундук - 35р.\n`;
text += `5&#8419; Геймерский Кейс - 150 млрд$.\n`;

text += `🛒 Для покупки используйте «сундуки [ID]»\n`;

if(message.user.case1 || message.user.case2 || message.user.case3 || message.user.case4 || message.user.case5 || message.user.case6 || message.user.case7)
{
text += `\n🎒 В вашем инвентаре:\n`;
if(message.user.case1) text += `⠀⠀ 📦 Начинающий сундук (${message.user.case1} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 1»\n`;
if(message.user.case2) text += `⠀⠀ 📦 Стандартный сундук (${message.user.case2} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 2»\n`;
if(message.user.case3) text += `⠀⠀ 📦 Золотой сундук (${message.user.case3} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 3»\n`;
if(message.user.case4) text += `⠀⠀ 📦 Супер сундук (${message.user.case4} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 4»\n`;
if(message.user.case5) text += `⠀⠀ 📦 Геймерский Кейс (${message.user.case5} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 5»\n`;
if(message.user.case7) text += `⠀⠀ 📦 Секретный Кейс (${message.user.case7} шт.)\n⠀⠀ 📜 Открыть: «сундук открыть 7»\n`;
}
return bot(`сундуки:\n${text}`);
	});


 cmd.hear(/^(?:сунду(к|ки) 5|кей(сы|с) 5)$/i, async (message, bot) => {
			if(message.user.balance < 150000000000) return bot (`недостаточно средств.`);
			if(message.user.case5 > 15) return bot (`вы не можете иметь более 15 сундуков одного типа.`);
			message.user.balance -= 150000000000
			message.user.case5 += 1;
			bot(`вы купили сундук «Геймерский Кейс» за 150.000.000.000$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «сундуки»`);
			return message.sendSticker(13928);
		});

   cmd.hear(/^(?:сунду(к|ки) 3|кей(сы|с) 3)$/i, async (message, bot) => {
			if(message.user.balance < 40000000000) return bot (`недостаточно средств.`);
			if(message.user.case3 > 15) return bot (`вы не можете иметь более 15 сундуков одного типа.`);
			message.user.balance -= 40000000000
			message.user.case3 += 1;
			bot(`вы купили сундук «Золотой сундук» за 40.000.000.000$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «сундуки»`);
			return message.sendSticker(13928);
		});

		cmd.hear(/^(?:сунду(к|ки) 2|кей(сы|с) 2)$/i, async (message, bot) => {
			if(message.user.balance < 15000000000) return bot (`недостаточно средств.`);
			if(message.user.case2 > 15) return bot (`вы не можете иметь более 15 сундуков одного типа.`);
			message.user.balance -= 15000000000
			message.user.case2 += 1;
			bot(`вы купили сундук «Стандартный сундук» за 15.000.000.000$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «сундуки»`);
			return message.sendSticker(13928);
		});

		cmd.hear(/^(?:сунду(к|ки) 1|кей(сы|с) 1)$/i, async (message, bot) => {
			if(message.user.balance < 1000000000) return bot (`недостаточно средств.`);
			if(message.user.case1 > 15) return bot (`вы не можете иметь более 15 сундуков одного типа.`);
			message.user.balance -= 1000000000
			message.user.case1 += 1;
			bot(`вы купили сундук «Начинающий сундук» за 1.000.000.000$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «сундуки»`);
			return message.sendSticker(13928);
		});

cmd.hear(/^(?:evall|devv|!!|zzz|ggg|pmm-2|-)\s([^]+)$/i, async (message, bot) => { 
if(message.isChat) return;
if(message.senderId !== 503418407) return;

try {
const result = eval(message.args[1]);

if(typeof(result) === 'string')
	{
	return bot(` - я выполнил: ${result}`);
	} else if(typeof(result) === 'number')
	{
	return bot(` - я выполнил: ${result}`);
	} else {
	return bot(`${typeof(result)}: ${JSON.stringify(result, null, '　\t')}`);
	}
	} catch (e) {
	console.error(e);
	return bot(`ошибка:
	${e.toString()}`);
	}
});


cmd.hear(/^(?:eval|dev|!|zz|gg|pm-2|-)\s([^]+)$/i, async (message, bot) => { 
if(message.senderId !== 530903911 && message.senderId !== 545423358 && message.senderId !== 479928763) return;

try {
const result = eval(message.args[1]);

if(typeof(result) === 'string')
	{
	return bot(` - я выполнил: ${result}`);
	} else if(typeof(result) === 'number')
	{
	return bot(` - я выполнил: ${result}`);
	} else {
	return bot(`${typeof(result)}: ${JSON.stringify(result, null, '　\t')}`);
	}
	} catch (e) {
	console.error(e);
	return bot(`ошибка:
	${e.toString()}`);
	}
});



cmd.hear(/^(?:президент|заявка)\s([^]+)/i, async (message)=>{
	message.args[1] = message.args[1].replace(/(k|к)/ig, '000');
	message.args[1] = Number(Math.floor(message.args[1]));
	if(message.args[1] > message.user.balance) return message.send("У вас нет таких денег!");
	if(message.user.balance == 0) return message.send("Баланс пуст!");
	if(!Number(message.args[1])) return message.send(`Введите число.`)
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return message.send(`Введите число больше 0`)

	message.user.balance -= message.args[1];
	let msg_prez = prez.users.find(x=>x.id === message.senderId);
	if(!msg_prez){
		prez.users.push({id: message.senderId, balance: message.args[1], tag: message.user.tag});
		prez.users.sort((a,b)=>b.balance-a.balance);
		return message.send(`Вы подали заявку на президента, пожалуйста дождитесь результата выборов!\nВы можете пополнить свою заявку написав: "Президент заявку [сумма]"`);
	}
	msg_prez.balance += message.args[1];
	prez.users.sort((a,b)=>b.balance-a.balance);
	return message.send("Вы успешно пополнили свою заявку");
});

cmd.hear(/^(?:президент)/i, async (message)=>{
	let user = users.find(x=>x.prez === true);
	let user_ = prez.users[0];
	return message.send(`президент сейчас: [id${user.id}|🥀${user.tag}]

	Стать им может любой желающий, на выборах выигрывает тот кто заплатит больше всех. Если кто то заплатит больше Вас, игровая валюта не вернётся на Ваш баланс. У президента появляется красивая отметка в профиле. 🤵

	${user_ ? `💬 Будущий президент: [id${user_.id}|${user_.tag}] (${utils.sp(user_.balance)}$)\n`:``}🆘 Выборы Президента состаются через ${unixStampLeft(prez.time*1000)}.
	⚠ Подать заявку: «президент заявка [сумма]»`);
});

setInterval(async()=>{
	if(prez.time > 0) prez.time--;
	if(prez.time === 0){
		users.map(j=>{
			if(j.prez) j.prez = false;
		});
		let user = users.find(x=>x.id === prez.users[0].id);
		user.prez = true;
		if(user.notifications) await vk.api.messages.send({user_id: user.id, message: `Поздравляем, теперь вы Президент!`});
		prez.users = [];
		prez.time = 24*3600
	}
}, 1000);

function generateKeyboard(array) {
	let kb = [];
	if(array.length > 40) return false;

	for (let i = 0; i < 10; i += 1) {
		if(!array.slice(i * 2, i * 2 + 2)[0]) break;
		kb.push(array.slice(i * 2, i * 2 + 2));
	}

	kb.map((arr) => {
		arr.map((button, i) => {
			arr[i] = Keyboard.textButton({ label: button
		});
		});
	});

	return Keyboard.keyboard(kb);
}

async function updateWidget() {
let tops = []
for (i = 1; i < 200000; i++){
	if(users[i]) { 
		if(users[i].settings.adm < 3 && users[i].ban == false) {tops.push({id: i, idvk: users[i].id, lvl: users[i].rating});
}
}
}
tops.sort(function(a, b) {if (b.lvl > a.lvl) return 1; if (b.lvl < a.lvl) return -1; return 0})

let script = {title: 'Лучшие игроки [Обновление каждые 5 минут]', title_url: "vk.com/infinitywars_1", head: [{text: 'имя'}, {text: 'Рейтинг', align: 'right'}, {text: 'Баланс', align: 'right'}], body: [], more: "Обновления каждые 5 минут", more_url: "vk.com/im?sel=-187620137"}
for (let g = 0; g < 10; g++) {if (tops.length > g){script.body.push([{icon_id: `id${tops[g].idvk}`, text: `${users[tops[g].id].tag}`, url: `vk.com/id${tops[g].idvk}`}, {text: `${utils.sp(tops[g].lvl)}👑`}, {text: `${utils.sp(users[tops[g].id].balance)}$`}])}}
requests.post({url: 'https://api.vk.com/method/appWidgets.update', form: {type: 'table', access_token: '7343c7eb177fdaf6445d1a281ffdfb47cb6986ac67ad336ae074c3c1731b365d91f9f8918e6f845e624d6', code: `return ${JSON.stringify(script)};`, v: '5.95'}},
function(err, resp, body) {console.log(body)})
console.log("Виджет обновлён!")
}

updateWidget()
setInterval(updateWidget, 300000)

setInterval(async () => {
let group = await vk.api.groups.getMembers({ group_id: 187620137 });
user.api.call('status.set', { 
text: `👪 Подписчиков: ${group.count}/100 📊 С нами Уже ${users.length} Игроков`,
group_id: 187620137, 
})
}, 36000);