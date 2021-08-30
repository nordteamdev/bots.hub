console.log('Project Nova Bot: Start...');
const { VK } = require('vk-io');
const vk = new VK();
const sendmsg = new VK({token: "Токен для рассылок"});
const commands = [];
const request = require('prequest');
let user = new VK();
user.setOptions({
	token: 'Токен для бота'
});
const express = require('express');
const app = express();
var intel = require('intel');
intel.addHandler(new intel.handlers.File('logs/botlog.log'));
const http = require('http');
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
let giving = false;
const promo = require('./base/promo.json');
const clans = require('./base/clans.json');
const botinfo = require('./base/botinfo.json');

const promos = '' 
const fortyn = '';
const win = ''; 
const lose = '';
const errors = '';

	var timeban = 604800;

setInterval(() => {
		timeban -= 1
	}, 604800);
let chatslist = require('./chatslist.json');

let settings = require('./settings.json'),
	base = require("./base.json"),
	chats = require('./chats.json');

const cars = [
	{
		name: 'Самокат',
		cost: 50000000,
		id: 1
	},
	{
		name: 'Велосипед',
		cost: 250000000,
		id: 2
	},
	{
		name: 'Гироскутер',
		cost: 500000000,
		id: 3
	},
	{
		name: 'Сегвей',
		cost: 750000000,
		id: 4
	},
	{
		name: 'Мопед',
		cost: 2500000000,
		id: 5
	},
	{
		name: 'Мотоцикл',
		cost: 5000000000,
		id: 6
	},
	{
		name: 'ВАЗ 2109',
		cost: 7500000000,
		id: 7
	},
	{
		name: 'Квадроцикл',
		cost: 8000000000,
		id: 8
	},
	{
		name: 'Багги',
		cost: 13500000000,
		id: 9
	},
	{
		name: 'Вездеход',
		cost: 20000000000,
		id: 10
	},
	{
		name: 'Лада Xray',
		cost: 35000000000,
		id: 11
	},
	{
		name: 'Audi Q7',
		cost: 75000000000,
		id: 12
	},
	{
		name: 'BMW X6',
		cost: 100000000000,
		id: 13
	},
	{
		name: 'Toyota FT-HS',
		cost: 175000000000,
		id: 14
	},
	{
		name: 'BMW Z4 M',
		cost: 250000000000,
		id: 15
	},
	{
		name: 'Subaru WRX STI',
		cost: 275000000000,
		id: 16
	},
	{
		name: 'Lamborghini Veneno',
		cost: 300000000000,
		id: 17
	},
	{
		name: 'Tesla Roadster',
		cost: 450000000000,
		id: 18
	},
	{
		name: 'Yamaha YZF R6',
		cost: 500000000000,
		id: 19
	},
	{
		name: 'Bugatti Chiron',
		cost: 650000000000,
		id: 20
	},
	{
		name: 'Thrust SSC',
		cost: 3500000000000,
		id: 21
	},
	{
		name: 'Ferrari LaFerrari',
		cost: 3900000000000,
		id: 22
	},
	{
		name: 'Koenigsegg Regear',
		cost: 5000000000000,
		id: 23
	},
	{
		name: 'Tesla Semi',
		cost: 7500000000000,
		id: 24
	},
	{
		name: 'Venom GT',
		cost: 12500000000000,
		id: 25
	},
	{
		name: 'Rolls-Royce',
		cost: 15000000000000,
		id: 26
	}
];

const yachts = [
	{
		name: 'Ванна GUCCI',
		cost: 1000000000,
		id: 1
	},
	{
		name: 'Nauticat 331',
		cost: 10000000000,
		id: 2
	},
	{
		name: 'Nordhavn 56 MS',
		cost: 1500000000000,
		id: 3
	},
	{
		name: 'Princess 60',
		cost: 2500000000000,
		id: 4
	},
	{
		name: 'Azimut 70',
		cost: 3500000000000,
		id: 5
	},
	{
		name: 'Dominator 40M',
		cost: 5000000000000,
		id: 6
	},
	{
		name: 'Moonen 124',
		cost: 6000000000000,
		id: 7
	},
	{
		name: 'Wider 150',
		cost: 6500000000000,
		id: 8
	},
	{
		name: 'Palmer Johnson 42M SuperSport',
		cost: 8000000000000,
		id: 9
	},
	{
		name: 'Wider 165',
		cost: 8500000000000,
		id: 10
	},
	{
		name: 'Eclipse',
		cost: 15000000000000,
		id: 11
	},
	{
		name: 'Dubai',
		cost: 30000000000000,
		id: 12
	},
	{
		name: 'Streets of Monaco',
		cost: 45000000000000,
		id: 13
	}
];

const airplanes = [
	{
		name: 'Параплан',
		cost: 10000000000,
		id: 1
	},
	{
		name: 'АН-2',
		cost: 35000000000,
		id: 2
	},
	{
		name: 'Cessna-172E',
		cost: 70000000000,
		id: 3
	},
	{
		name: 'Supermarine Spitfire',
		cost: 100000000000,
		id: 4
	},
	{
		name: 'BRM NG-5',
		cost: 140000000000,
		id: 5
	},
	{
		name: 'Cessna T210',
		cost: 260000000000,
		id: 6
	},
	{
		name: 'Beechcraft 1900D',
		cost: 550000000000,
		id: 7
	},
	{
		name: 'Cessna 550',
		cost: 800000000000,
		id: 8
	},
	{
		name: 'Hawker 4000',
		cost: 2240000000000,
		id: 9
	},
	{
		name: 'Learjet 31',
		cost: 4500000000000,
		id: 10
	},
	{
		name: 'Airbus A318',
		cost: 8500000000000,
		id: 11
	},
	{
		name: 'F-35A',
		cost: 16000000000000,
		id: 12
	},
	{
		name: 'Boeing 747-430 Custom',
		cost: 22500000000000,
		id: 13
	},
	{
		name: 'C-17A Globemaster III',
		cost: 35000000000000,
		id: 14
	},
	{
		name: 'F-22 Raptor',
		cost: 40000000000000,
		id: 15
	},
	{
		name: 'Airbus 380 Custom',
		cost: 60000000000000,
		id: 16
	},
	{
		name: 'B-2 Spirit Stealth Bomber',
		cost: 80050000000000,
		id: 17
	}
];

const helicopters = [
	{
		name: 'Шарик с пропеллером',
		cost: 200000,
		id: 1
	},
	{
		name: 'RotorWay Exec 162F',
		cost: 30000000000,
		id: 2
	},
	{
		name: 'Robinson R44',
		cost: 45000000000,
		id: 3
	},
	{
		name: 'Hiller UH-12C',
		cost: 130000000000,
		id: 4
	},
	{
		name: 'AW119 Koala',
		cost: 250000000000,
		id: 5
	},
	{
		name: 'MBB BK 117',
		cost: 400000000000,
		id: 6
	},
	{
		name: 'Eurocopter EC130',
		cost: 750000000000,
		id: 7
	},
	{
		name: 'Leonardo AW109 Power',
		cost: 1000000000000,
		id: 8
	},
	{
		name: 'Sikorsky S-76',
		cost: 1500000000000,
		id: 9
	},
	{
		name: 'Bell 429WLG',
		cost: 1900000000000,
		id: 10
	},
	{
		name: 'NHI NH90',
		cost: 3500000000000,
		id: 11
	},
	{
		name: 'Kazan Mi-35M',
		cost: 6000000000000,
		id: 12
	},
	{
		name: 'Bell V-22 Osprey',
		cost: 4900000000000,
		id: 13
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 25000000,
		id: 1
	},
	{
		name: 'Подвал',
		cost: 300000000,
		id: 2
	},
	{
		name: 'Палатка',
		cost: 350000000,
		id: 3
	},
	{
		name: 'Домик на дереве',
		cost: 500000000,
		id: 4
	},
	{
		name: 'Полуразрушенный дом',
		cost: 1000000000,
		id: 5
	},
	{
		name: 'Дом в лесу',
		cost: 2500000000,
		id: 6
	},
	{
		name: 'Деревянный дом',
		cost: 3750000000,
		id: 7
	},
	{
		name: 'Дача',
		cost: 12500000000,
		id: 8
	},
	{
		name: 'Кирпичный дом',
		cost: 20000000000,
		id: 9
	},
	{
		name: 'Коттедж',
		cost: 45000000000,
		id: 10
	},
	{
		name: 'Особняк',
		cost: 125000000000,
		id: 11
	},
	{
		name: 'Дом на Рублёвке',
		cost: 500000000000,
		id: 12
	},
	{
		name: 'Личный небоскрёб',
		cost: 700000000000,
		id: 13
	},
	{
		name: 'Остров с особняком',
		cost: 1250000000000,
		id: 14
	},
	{
		name: 'Белый дом',
		cost: 2000000000000,
		id: 15
	}
];

const apartments = [
	{
		name: 'Чердак',
		cost: 15000000,
		id: 1
	},
	{
		name: 'Квартира в общежитии',
		cost: 55000000,
		id: 2
	},
	{
		name: 'Однокомнатная квартира',
		cost: 175000000,
		id: 3
	},
	{
		name: 'Двухкомнатная квартира',
		cost: 260000000,
		id: 4
	},
	{
		name: 'Четырехкомнатная квартира',
		cost: 500000000,
		id: 5
	},
	{
		name: 'Квартира в центре Москвы',
		cost: 1600000000,
		id: 6
	},
	{
		name: 'Двухуровневая квартира',
		cost: 4000000000,
		id: 7
	},
	{
		name: 'Квартира с Евроремонтом',
		cost: 6000000000,
		id: 8
	}
];

const phones = [
	{
		name: 'Nokia 108',
		cost: 2500000,
		id: 1
	},
	{
		name: 'Nokia 3310 (2017)',
		cost: 5000000,
		id: 2
	},
	{
		name: 'ASUS ZenFone 4',
		cost: 20000000,
		id: 3
	},
	{
		name: 'BQ Aquaris X',
		cost: 100000000,
		id: 4
	},
	{
		name: 'Sony Xperia XA',
		cost: 150000000,
		id: 5
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 300000000,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 500000000,
		id: 7
	},
	{
		name: 'Torex FS1',
		cost: 750000000,
		id: 8
	},
	{
		name: 'iPhone X',
		cost: 1000000000,
		id: 9
	},
	{
		name: 'Мегафон С1',
		cost: 2500000000,
		id: 10
	}
];

const farms = [
	{
		name: '6U Nvidia',
		cost: 20000000,
		id: 1
	},
	{
		name: 'AntminerS9',
		cost: 1000000000,
		id: 2
	},
	{
		name: 'FM2018-BT200',
		cost: 90000000000,
		id: 3
	},
	{
		name: 'KR-930-739F',
		cost: 9000000000000,
		id: 4
	},
	{
		name: 'DV2003-TETO',
		cost: 900000000000000,
		id: 5
	}
];

const businesses = [
	{
		name: 'Продажа вещей',
		cost: 50000000,
		earn: 4000,
		id: 1,
		icon: '🥖'
	},
	{
		name: 'Ларёк',
		cost: 100000000,
		earn: 7000,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Ресторан',
		cost: 300000000,
		earn: 25000,
		id: 3,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 500000000,
		earn: 38000,
		id: 4,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 1500000000,
		earn: 80000,
		id: 5,
		icon: '🏭'
	},
	{
		name: 'Шахта',
		cost: 2500000000,
		earn: 700000,
		id: 6,
		icon: '⛏'
	},
	{
		name: 'Офис',
		cost: 8000000000,
		earn: 2200000,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Разработка игр',
		cost: 15000000000,
		earn: 3000000,
		id: 8,
		icon: '🕹'
	},
	{
		name: 'Нефтевышка',
		cost: 50000000000,
		earn: 7000000,
		id: 9,
		icon: '🏜'
	},
	{
		name: 'Атомная электростанция',
		cost: 80000000000,
		earn: 10000000,
		id: 10,
		icon: '💡'
	},
	{
		name: 'Космическое агентство',
		cost: 500000000000,
		earn: 5000000,
		id: 11,
		icon: '🗺'
	},
	{
		name: 'Изучение астероидов',
		cost: 50000000000000, 
		earn: 500000000,
		id: 12,
		icon: '☄'
	},
	{
		name: 'Межгалактический экспресс',
		cost: 50000000000000000,
		earn: 5000000000000,
		id: 13,
		icon: '⚡'
	},
	{
		name: 'Космическая аэробаза',
		cost: 500000000000000000,
		earn: 50000000000000,
		id: 14,
		icon: '🔥'
	}
];

const works = [
	{
		name: 'Дворник',
		requiredLevel: 1,
		min: 200,
		max: 250,
		id: 1
	},
	{
		name: 'Сторож',
		requiredLevel: 3,
		min: 375,
		max: 400,
		id: 2
	},
	{
		name: 'Продавец',
		requiredLevel: 5,
		min: 400,
		max: 450,
		id: 3
	},
	{
		name: 'Няня',
		requiredLevel: 8,
		min: 600,
		max: 800,
		id: 4
	},
	{
		name: 'Курьер',
		requiredLevel: 10,
		min: 750,
		max: 800,
		id: 5
	},
	{
		name: 'Слесарь',
		requiredLevel: 14,
		min: 900,
		max: 940,
		id: 6
	},
	{
		name: 'Охранник',
		requiredLevel: 22,
		min: 1000,
		max: 1250,
		id: 7
	},
	{
		name: 'Библиотекарь',
		requiredLevel: 25,
		min: 1200,
		max: 1300,
		id: 8
	},
	{
		name: 'Воспитатель',
		requiredLevel: 35,
		min: 1450,
		max: 1650,
		id: 9
	},
	{
		name: 'Педагог',
		requiredLevel: 49,
		min: 1650,
		max: 1750,
		id: 10
	},
	{
		name: 'Повар',
		requiredLevel: 65,
		min: 1700,
		max: 1800,
		id: 11
	},
	{
		name: 'Грузчик',
		requiredLevel: 95,
		min: 1950,
		max: 2000,
		id: 12
	},
	{
		name: 'Парикмахер',
		requiredLevel: 105,
		min: 2350,
		max: 2400,
		id: 13
	},
	{
		name: 'Врач',
		requiredLevel: 125,
		min: 2450,
		max: 2550,
		id: 14
	},
	{
		name: 'Торговый представитель',
		requiredLevel: 145,
		min: 2650,
		max: 2750,
		id: 15
	},
	{
		name: 'Специалист по валютным операциям',
		requiredLevel: 200,
		min: 5500,
		max: 7050,
		id: 16
	},
	{
		name: 'Юрист по налоговому праву',
		requiredLevel: 250,
		min: 7050,
		max: 11050,
		id: 17
	},
	{
		name: 'Программист PHP',
		requiredLevel: 300,
		min: 9050,
		max: 12050,
		id: 18
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

	Q: 'q',
	W: 'ʍ',
	E: 'ǝ',
	R: 'ɹ',
	T: 'ʇ',
	Y: 'ʎ',
	U: 'u',
	I: 'ᴉ',
	O: 'o',
	P: 'p',
	A: 'ɐ',
	S: 's',
	D: 'd',
	F: 'ɟ',
	G: 'ƃ',
	H: 'ɥ',
	J: 'ɾ',
	K: 'ʞ',
	L: 'l',
	Z: 'z',
	X: 'x',
	C: 'ɔ',
	V: 'ʌ',
	B: 'b',
	N: 'n',
	M: 'ɯ',

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
	ю: 'oı',

	Й: 'ņ',
	Ц: 'ǹ',
	У: 'ʎ',
	К: 'ʞ',
	Е: 'ǝ',
	Н: 'н',
	Г: 'ɹ',
	Ш: 'm',
	Щ: 'm',
	З: 'ε',
	Х: 'х',
	Ъ: 'q',
	Ф: 'ф',
	Ы: 'ıq',
	В: 'ʚ',
	А: 'ɐ',
	П: 'u',
	Р: 'd',
	О: 'о',
	Л: 'v',
	Д: 'ɓ',
	Ж: 'ж',
	Э: 'є',
	Я: 'ʁ',
	Ч: 'һ',
	С: 'ɔ',
	М: 'w',
	И: 'и',
	Т: 'ɯ',
	Ь: 'q',
	Б: 'ƍ',
	Ю: 'oı'
}

let btc = 6000;

let users = require('./base/users.json');
let buttons = [];
//////если человек приглашён по ссылке
	vk.updates.on(['chat_invite_user_by_link'], async (message, next) => {
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
let chatid = message.chatId;	
			if(chats[message.chatId].users[message.senderId].isBanned && chats[message.chatId].users[message.senderId].permanently){

		    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.senderId});
		    return message.send('@id' + message.senderId + ' - находится в бане.');}

		message.send(`🎉 Приветствую тебя, игрок ${user[0].first_name}! Вы находитесь в беседе со мной, советую для начала прописать «Помощь».`, 
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
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});

		await next();
	});
	////если человек просто приглашён
	vk.updates.on(['chat_invite_user'], async (message, next) => {
		if(message.payload.action.member_id == message.senderId) return;

		let user = await vk.api.users.get({user_id: message.payload.action.member_id})
let chatid = message.chatId;	
			if(chats[message.chatId].users[message.payload.action.member_id].isBanned && chats[message.chatId].users[message.payload.action.member_id].permanently){

		    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.payload.action.member_id});
		    return message.send('@id' + message.payload.action.member_id + ' - находится в бане.');}

		message.send(`🎉 Приветствую тебя, игрок ${user[0].first_name}! Вы находитесь в беседе со мной, советую для начала прописать «Помощь».`, 
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
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});

		await next();
	});
	////если чела кикнули
	vk.updates.on(['chat_kick_user'], async (message, next) => {
		if(message.payload.action.member_id == message.senderId) return;

		let user = await vk.api.users.get({user_id: message.payload.action.member_id})

		message.send(`Почтим память светлому герою-дезертиру, press F.`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "F to pay respects"
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
				"label": "Убрать кнопки"
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
	await saveUsers();
}, 30000);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.jalobs == 3)
		{
			x.ban = true
			vk.api.messages.send({ user_id: x.id, message: `Вас постигла судьба бана, так как кол-во жалоб на вас стало 3` }); 
		}
		if(x.jalobs > 3)
		{
			x.ban = true
			vk.api.messages.send({ user_id: x.id, message: `Вас постигла судьба бана, так как кол-во жалоб на вас стало 3` }); 
		}

	});
}, 3000);

setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_btc += 6;
		}

		if(x.misc.farm === 2)
		{
			x.farm_btc += 25;
		}

		if(x.misc.farm === 3)
		{
			x.farm_btc += 40;
		}
		
		if(x.misc.farm === 4)
		{
			x.farm_btc += 63;
		}
		
		if(x.misc.farm === 5)
		{
			x.farm_btc += 80;
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
		user.timers.translation = false;
		user.timers.hasWorked = false;
		user.timers.commands = false;
		user.timers.clanwar = false;
		user.timers.bonus = false;
		user.timers.obva = false;
		user.timers.krik = false;
		user.timers.mine = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'f352ff5ddfa052beafea17d489fc206ff1020db53abc9437947b6158ec67ad5eff7de5eb6fe9691e5a964', pollingGroupId: 181729398 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public181729398'''\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public181729398\|(.*)\]/ig, '').trim();
	if(/\[club181729398'''\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club181729398\|(.*)\]/ig, '').trim();
	if(/\[nova_bot1'''\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[nova_bot\|(.*)\]/ig, '').trim();
	if(/^(?:@nova_bot1)$/i.test(message.text)) message.text = message.text.replace(/^(?:@nova_bot1)$/i, '').trim();
	message.text = message.text.replace(/\[public181729398\|(.*)\]/ig, '').trim();
	message.text = message.text.replace(/\[club181729398\|(.*)\]/ig, '').trim();
	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			realname: user_info.first_name,
			realfam: user_info.last_name,
			id: message.senderId,
			uid: users.length,
			balance: 5000,
			inds: 0,
			skan: 0,
			trgn: 0,
			diamonds: 0,
			emeralds: 0,
			coal: 0,
			iron: 0,
			gold: 0,
			bank: 0,
			btc: 0,
			virts: 0,
			energy: 10,
			dinars: 0,
			farm_btc: 0,
			biz: 0,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				translation: false,
				hasWorked: false,
				commands: false,
				clanwar: false,
				delacc: false,
				bonus: false,
				obva: false,
				krik: false,
				mine: false,
			},
			tag: user_info.first_name,
			clanid: false,
			keyboard: true,
			numberss: false,
			work: 0,
			business: 0,
			pp: 0,
			notifications: true,
			ccard: false,
			card: 0,
			seccard: 0,
			cardss: 0,
			exp: 1,
			level: 1,
			bizlvl: 0,
			right: 1,
			foolder: 0,
			floder: 0,
			operator: 0,
			number: 0,
			call: 0,
			language: 1,
			healths: 100,
			hunger: 100,
			reals: 0,
			jalobs: 0,
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
				pet: 0
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
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if (message.text) {
		message.user.floder += 1;
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

	intel.info(`${message.user.uid} name ${message.user.tag}: ${message.text}`);
	console.log(`${message.user.uid} name ${message.user.tag}: ${message.text}`);

});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:тест)\s(.*)$/i, async (message, bot) => {
	let messagetext = message.text;
	messagetext = messagetext.replace(/(тест)/ig, '');
	messagetext = messagetext.replace(/@redstoneproduction/, '').trim();
	vk.api.messages.send({ user_id: 366668990, message: `Тестовое сообщение:
	
	Вам написали: ${messagetext}

	А что именно писали: ${message.text}
	`});
});

//убито
cmd.hear(/^(?:рандом ба11ланс)$/i, async (message, bot) => {
	const bal = utils.random(50000);
	        
	        if(message.user.right <= 1) {
	if(message.user.timers.clearss) return bot(`через 1 час, Вы сможете ещё раз стереть баланс`);

	setTimeout(() => {
		message.user.timers.clearss = false;
	}, 1200000);

	message.user.timers.clearss = 0;
}
    message.user.balance = bal;
	return bot(`вы стерли изменили баланс на -`);
});

cmd.hear(/^(?:delacc)$/i, async (message, bot) => {
			message.user.balance = 5000;
			message.user.dollars = 0;
			message.user.euro = 0;
			message.user.manat = 0;
			message.user.diamonds = 0;
			message.user.emeralds = 0;
			message.user.coal = 0;
			message.user.iron = 0;
			message.user.gold = 0;
			message.user.bank = 0;
			message.user.btc = 0;
			message.user.farm_btc = 0;
			message.user.biz = 0;
			message.user.rating = 0;
			message.user.regDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
			message.user.mention = true;
			message.user.ban = false;
			message.user.tag = user_info.first_name;
			message.user.clanid = false;
			message.user.keyboard = true;
			message.user.numberss = false;
			message.user.work = 0;
			message.user.business = 0;
			message.user.pp = 0;
			message.user.notifications = true;
			message.user.ccard = false;
			message.user.card = 0;
			message.user.seccard = 0;
			message.user.cardss = 0;
			message.user.exp = 1;
			message.user.level = 1;
			message.user.right = 1;
			message.user.foolder = 0;
			message.user.floder = 0;
			message.user.operator = 0;
			message.user.number = 0;
			message.user.language = 1;
			message.user.healths = 100;
			message.user.hunger = 100;
			message.user.referal = null;
			message.user.transport.car = 0;
			message.user.transport.yacht = 0;
			message.user.transport.airplane = 0;
			message.user.transport.helicopter = 0;
			message.user.realty.home = 0;
			message.user.realty.apartment = 0;
			message.user.misc.phone = 0;
			message.user.misc.farm = 0;
			message.user.marriage.partner = 0;
			message.user.timers.delacc = 0;
	        if(message.user.timers.delacc) return bot(`вы больше не можете удалять аккаунт!`);
	return bot(`вы решили обнулить аккаунт.`);
});

cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 3) return bot(`доступно с привилегии «Администратор»`);
		if(!message.args[1]) return message.reply(`📚 Пример: «Cоздать (количество активаций) (сумма)»`);
		if(!message.args[2]) return message.reply(`📚 Пример: «Cоздать (количество активаций) (сумма)»`);
		 
		let balance = parserInt(message.args[2]); 
		let activ = Number(message.args[1]);

		var result       = '';
		        var words        = 'QWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 4; ++i ) {
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
			📝 Промокод - ${result}
			🗝 Активаций в этом промокоде - ${activ}
			💰 Валюты в этом промокоде - ${spaces(balance)}$
			`);

});
	
cmd.hear(/^(?:Мсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 3) return bot(`доступно с привилегии - Администратор`);
		if(!message.args[1]) return message.reply(`✨ Пример - МCоздать (название) (сумма)`);
		if(!message.args[2]) return message.reply(`✨ Пример - МCоздать (название) (сумма)`);
		 
		let balance = parserInt(message.args[1]); 

		if(!promo[message.args[2]]){
		            	promo[message.args[2]] = {
		            		balance: Number(balance),
		            		activ: 1000,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			📝 Промокод - ${message.args[2]}
			🗝 Активаций в этом промокоде - 1000
			💰 Валюты в этом промокоде - ${spaces(balance)}$
			`);

});

cmd.hear(/^(?:промокод)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return message.reply(`⚠ Перепровеьте сообщение!`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`⏯ У этого промокода закончились активации! Включи уведомления в группе чтобы первым их активировать!`, {attachment: promos});
	
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
			return message.reply(`🤑 Ты активировал(а) промокод.\n✨ В промокоде, Вы нашли: ${spaces(coi)}$\n\n📴 Подсказка: нельзя активировать промокод больше одного раза.`, {attachment: promos});
		}
	}else{
		return message.reply(`😪 Простите, но промокод нельзя активировать дважды.`, {attachment: promos});
	}
});


cmd.hear(/^(?:Evaladmins)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 5) return bot(`доступно с привилегии «Разработчик»`);
    if(message.isChat) return bot(`команда работает только в ЛС.`);
	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`команда выполнена для разработчика под UID: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return bot(`команда выполнена для разработчика под UID: ${result}`);
		} else {
			return bot(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return bot(`ошибка:
		${e.toString()}`);
	}
});

cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	    if(message.user.right < 4) return bot(`доступно с привилегии «Разработчик»`);
	if(message.isChat) return bot(`команда работает только в ЛС.`);

       let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(🥃|👨‍|🚀⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|��|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍  ️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️✈️|👨‍✈️|👩‍🚀️⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.reply(`⚠ Сообщение не принято!

    	⚠ Причина:
    	404`);
}

	vk.api.messages.send({ user_id: 366668990, forward_messages: message.id, message: `Администратор отправил запрос на выполнение команды. ID администратора [${message.user.uid}]` }).then(() => {
		return bot(`⚠ Вы отправили заявку на отправление команды. Ожидайте ответ.`);
	}).catch((err) => {
		return message.send(`☒ Отказ отправление команды!
			
			⚠ Причина:
			404`);
	});
});

//убито
cmd.hear(/^(?:ре11шение)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.right < 5) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `Решение принято ${new Date().getHours()}:${new Date().getMinutes()}
❜${message.args[2]}❜` });
});


cmd.hear(/^(?:привет|прив|хай|кот|хеллоу|хеллов|хелоу|хелов|hello|hi|начать|start|приве|привт|котик)$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.isChat) return;
					if(message.user.keyboard == false) {
	await message.send(`

Привет, [id${message.user.id}|${message.user.tag}]!
Вот список команд:


	
	 🎈 Основное:
	
		[📒] Профиль - ваш профиль в боте
		[💲] Баланс - ваш баланс
		[👑] Рейтинг - персональный рейтинг
		[✒] Ник [ник/вкл/выкл] - ваш специальный ник
		[🤝] Передать [id] [сумма] - передать другому игроку деньги
		[💭] Найти [id] - полный список профиля у другого игрока
		[🏆] Топ - топ баланс, опыт и т.д.

	
	   🎆 Банк:
	
		[💰] Банк [сумма/снять сумма] - положить деньги в банк
		[💰] Банк снять [сумма] - снять деньги с банка
		[📊] Курс - курс валют
		[💎] Бонус - ежедневный бонус

	 
	  🔆 Ферма:
	 
		[🔋] Ферма  - биткоин Ферма

	 
	  🔨 Шахта:
	 
		[⛏] Шахта - выбрать шахту

	 
	 📖 Минералы:
	 
		[📄] Копать - выбрать минерал
		[📄] Копать индий - выкопать индий
		[📄] Копать скадий - выкопать скадий
		[📄] Копать тергоний - выкопать тергоний
		[📄] Индий - узнать счёт индия
		[📄] Скадий - узнать счёт скадия
		[📄] Тергоний - узнать счёт тергония

		[🚀] Энергия - узнать свою энергию

	 
	 🎪 Магазин:
	 
		[🎁] Товары - купить игровые товары
		[🛒] Магазин  - купить товары
		[➖] Продать [предмет]  - продать предметы

	 
	  👔 Работа:
	 
		[🔨] Работать
		[❌] Уволиться

	 
	  💼 Бизнес:
	 
		[📈] Бизнес - статистика
		[💵] Бизнес снять - снять деньги со счёта

	 
	  💒 Браки:
	 
		[👪] Брак [id]  - сделать предложение игроку
		[💍] Браки - список игроков, которые хотят стать вашими партнёрами
		[💔] Развод  - развестить с игроком

	 
	  💡 Прочие:
	 
		[👫] Реферал - деньги за друзей
		[🤖] Бот - информация о боте
		[🎮] Игры - покажет игровые команды
		[🔔] Чат - покажет чат команды

🆘 Репорт [текст] - ошибки/пожелания/предожения`);
}
if(message.user.keyboard == true) {
	await message.send(`
Привет, [id${message.user.id}|${message.user.tag}]!
Вот список команд:


	 
	 🎈 Основное:
	 
		[📒] Профиль - ваш профиль в боте
		[💲] Баланс - ваш баланс
		[👑] Рейтинг - персональный рейтинг
		[✒] Ник [ник/вкл/выкл] - ваш специальный ник
		[🤝] Передать [id] [сумма] - передать другому игроку деньги
		[💭] Найти [id] - полный список профиля у другого игрока
		[🏆] Топ - топ баланс, опыт и т.д.

	 
	   🎆 Банк:
	 
		[💰] Банк [сумма/снять сумма] - положить деньги в банк
		[💰] Банк снять [сумма] - снять деньги с банка
		[📊] Курс - курс валют
		[💎] Бонус - ежедневный бонус

	 
	  🔆 Ферма:
	 
		[🔋] Ферма  - биткоин Ферма

	 
	  🔨 Шахта:
	 
		[⛏] Шахта - выбрать шахту

	 
	 📖 Минералы:
	 
		[📄] Копать - выбрать минерал
		[📄] Копать индий - выкопать индий
		[📄] Копать скадий - выкопать скадий
		[📄] Копать тергоний - выкопать тергоний
		[📄] Индий - узнать счёт индия
		[📄] Скадий - узнать счёт скадия
		[📄] Тергоний - узнать счёт тергония

		[🚀] Энергия - узнать свою энергию

	 
	 🎪 Магазин:
	 
		[🎁] Товары - купить игровые товары
		[  ] Магазин  - купить товары
		[➖] Продать [предмет]  - продать предметы

	 
	  👔 Работа:
	 
		[🔨] Работать
		[❌] Уволиться

	 
	  💼 Бизнес:
	 
		[📈] Бизнес - статистика
		[💵] Бизнес снять - снять деньги со счёта

	 
	  💒 Браки:
	 
		[👪] Брак [id]  - сделать предложение игроку
		[💍] Браки - список игроков, которые хотят стать вашими партнёрами
		[💔] Развод  - развестить с игроком

	 
	  💡 Прочие:
	 
		[👫] Реферал - деньги за друзей
		[🤖] Бот - информация о боте
		[🎮] Игры - покажет игровые команды
		[🔔] Чат - покажет чат команды

🆘 Репорт [текст] - ошибки/пожелания/предожения`, 
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Чат"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Игры"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Ферма"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Другое"
			},
				"color": "positive"
			}]
		]
			})
		});
		}}
);	

cmd.hear(/^(?:помощь|команды|меню|@nova_bot1 помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;

			if(message.user.keyboard == false) {
await message.reply(`
Привет, [id${message.user.id}|${message.user.tag}]!
Вот список команд:


	 
	 🎈 Основное:
	 
		[📒] Профиль - ваш профиль в боте
		[💲] Баланс - ваш баланс
		[👑] Рейтинг - персональный рейтинг
		[✒] Ник [ник/вкл/выкл] - ваш специальный ник
		[🤝] Передать [id] [сумма] - передать другому игроку деньги
		[💭] Найти [id] - полный список профиля у другого игрока
		[🏆] Топ - топ баланс, опыт и т.д.

	 
	   🎆 Банк:
	 
		[💰] Банк [сумма/снять сумма] - положить деньги в банк
		[💰] Банк снять [сумма] - снять деньги с банка
		[📊] Курс - курс валют
		[  ] Бонус - ежедневный бонус

	 
	  🔆 Ферма:
	 
		[🔋] Ферма  - биткоин Ферма

	 
	  🔨 Шахта:
	 
		[⛏] Шахта - выбрать шахту

	 
	 📖 Минералы:
	 
		[📄] Копать - выбрать минерал
		[📄] Копать индий - выкопать индий
		[📄] Копать скадий - выкопать скадий
		[📄] Копать тергоний - выкопать тергоний
		[📄] Индий - узнать счёт индия
		[📄] Скадий - узнать счёт скадия
		[📄] Тергоний - узнать счёт тергония

		[🚀] Энергия - узнать свою энергию

	 
	 🎪 Магазин:
	 
		[🎁] Товары - купить игровые товары
		[🛒] Магазин  - купить товары
		[➖] Продать [предмет]  - продать предметы

	  🌽 Питомцы:
		[🐒] Питомец - информация
		[🐪] Питомец поход
		[🌟] Питомец улучшить

	  👔 Работа:
	 
		[🔨] Работать
		[❌] Уволиться

	 
	  💼 Бизнес:
	 
		[📈] Бизнес - статистика
		[💵] Бизнес снять - снять деньги со счёта

	 
	  💒 Браки:
	 
		[👪] Брак [id]  - сделать предложение игроку
		[💍] Браки - список игроков, которые хотят стать вашими партнёрами
		[💔] Развод  - развестить с игроком

	 
	  💡 Прочие:
	 
		[👫] Реферал - деньги за друзей
		[🤖] Бот - информация о боте
		[🎮] Игры - покажет игровые команды
		[🔔] Чат - покажет чат команды

🆘 Репорт [текст] -ошибки/пожелания/предожения`);
}
if(message.user.keyboard == true) {
	await message.reply(`
Привет, [id${message.user.id}|${message.user.tag}]!
Вот список команд:


	 
	 🎈 Основное:
	 
		[📒] Профиль - ваш профиль в боте
		[💲] Баланс - ваш баланс
		[👑] Рейтинг - персональный рейтинг
		[✒] Ник [ник/вкл/выкл] - ваш специальный ник
		[🤝] Передать [id] [сумма] - передать другому игроку деньги
		[💭] Найти [id] - полный список профиля у другого игрока
		[🏆] Топ - топ баланс, опыт и т.д.

	 
	   🎆 Банк:
	 
		[💰] Банк [сумма/снять сумма] - положить деньги в банк
		[💰] Банк снять [сумма] - снять деньги с банка
		[📊] Курс - курс валют
		[💎] Бонус - ежедневный бонус

	 
	  🔆 Ферма:
	 
		[🔋] Ферма  - биткоин Ферма

	 
	  🔨 Шахта:
	 
		[⛏] Шахта - выбрать шахту

	 
	  📖 Минералы:
	 
		[📄] Копать - выбрать минерал
		[📄] Копать индий - выкопать индий
		[📄] Копать скадий - выкопать скадий
		[📄] Копать тергоний - выкопать тергоний
		[📄] Индий - узнать счёт индия
		[📄] Скадий - узнать счёт скадия
		[📄] Тергоний - узнать счёт тергония

		[🚀] Энергия - узнать свою энергию

	 
	  🎪 Магазин:
	 
		[🎁] Товары - купить игровые товары
		[🛒] Магазин  - купить товары
		[➖] Продать [предмет]  - продать предметы

	  🌽 Питомцы:
		[🐒] Питомец - информация
		[🐪] Питомец поход
		[🌟] Питомец улучшить
	
	  👔 Работа:
	 
		[🔨] Работать
		[❌] Уволиться

	 
	  💼 Бизнес:
	 
		[📈] Бизнес - статистика
		[💵] Бизнес снять - снять деньги со счёта

	 
	  💒 Браки:
	 
		[👪] Брак [id]  - сделать предложение игроку
		[💍] Браки - список игроков, которые хотят стать вашими партнёрами
		[💔] Развод  - развестить с игроком

	 
	  💡 Прочие:
	 
		[👫] Реферал - деньги за друзей
		[🤖] Бот - информация о боте
		[🎮] Игры - покажет игровые команды
		[🔔] Чат - покажет чат команды

🆘 Репорт [текст] - ошибки/пожелания/предожения
`, /////////////
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Чат"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Игры"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Ферма"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Другое"
			},
				"color": "positive"
			}]
		]
			})
		});
		}}
);	
cmd.hear(/^(?:чат|@nova_bot1 чат)$/i, async (message, bot) => {
	message.user.foolder += 1;

			if(message.user.keyboard == false) {
	await message.reply(`Развлекательные команды:

	[🤔]  Кто [фраза] - выбор одного из участников беседы
	[📅]  Когда [фраза] - когда произойдет событие
	[📊] Инфа [фраза] - вероятность события
	[🔮] Шар [фраза] - магический шар
	[⌚] Дата [id] - дата регистрации аккаунта
	[⚖]  Выбери [фраза] или [фраза2] - случайный выбор из 2х вариантов
	[↪] Переверни [фраза] - переворачивает фразу
	[🔑] Вики [фраза] - даёт материал из Википедии
	[🌆] Погода [город] - прогноз погоды
	[🎀] Оцени [картинка] - оценка по 10ти балльной шкале
	[⏳] Время - сколько сейчас времени
	[✨] Бутылочка - безумная игра в бутылочку
	[🤡] Анекдот - рандом анекдот из категории Б
	[📹] Гиф - случайные гифки
`);
}
if(message.user.keyboard == true) {
	await message.reply(`Развлекательные команды:

	[🤔]  Кто [фраза] - выбор одного из участников беседы
	[📅]  Когда [фраза] - когда произойдет событие
	[📊] Инфа [фраза] - вероятность события
	[🔮] Шар [фраза] - магический шар
	[⌚] Дата [id] - дата регистрации аккаунта
	[⚖]  Выбери [фраза] или [фраза2] - случайный выбор из 2х вариантов
	[↪] Переверни [фраза] - переворачивает фразу
	[🔑] Вики [фраза] - даёт материал из Википедии
	[🌆] Погода [город] - прогноз погоды
	[🎀] Оцени [картинка] - оценка по 10ти балльной шкале
	[⏳] Время - сколько сейчас времени
	[✨] Бутылочка - безумная игра в бутылочку
	[🤡] Анекдот - рандом анекдот из категории Б
	[📹] Гиф - случайные гифки
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
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	
cmd.hear(/^(?:игры|@nova_bot1 игры)$/i, async (message, bot) => {
	message.user.foolder += 1;

			if(message.user.keyboard == false) {
					await message.reply(`Игры:

	[🎲] Кубик [1-6]
	[🎰] Казино [сумма]
	[📈] Трейд [вверх/вниз] [сумма]
	[🥛]  Стаканчик [1-3] [сумма]
	[🔦] Сейф [случайные 2 цифры] 
	[🌟] Монетка [сумма] [орел/решка]
	[👤] Тир [1-3] [сумма]
	[👛] Ловушка [сумма]
	[🏆] Фортуна
`);
}
if(message.user.keyboard == true) {
	await message.reply(`Игры:

	[🎲] Кубик [1-6]
	[🎰] Казино [сумма]
	[📈] Трейд [вверх/вниз] [сумма]
	[🥛]  Стаканчик [1-3] [сумма]
	[🔦] Сейф [случайные 2 цифры] 
	[🌟] Монетка [сумма] [орел/решка]
	[👤] Тир [1-3] [сумма]
	[👛] Ловушка [сумма]
	[🏆] Фортуна
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
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	

cmd.hear(/^(?:!manager)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(!message.isChat) return bot(`пожалуйста, напишите эту команду в беседе.`);
let text = ``;	
if(chats[message.chatid].activate == false) text += `🚧 !Activate - Активация чата.`;
if(chats[message.chatid].activate == true) text += `📝 !Title [фраза] - Изменить название беседы
🆘 !Warn [ссылка] - Выдать варн пользователю
⚠ !Kick [ссылка] - Кикнуть пользователя с беседы
🔥!Unban [ссылка] - Разбанить пользователя
🌍 !Permban [ссылка] - Забанить навсегда пользователя
✨ !Роль - Ваша роль в беседе
🍎 !Модер [ссылка] - Выдать модера пользователю
🍏 !Админ [ссылка] - Выдать админа пользователю
🍊 !Хелпер  [ссылка] - Выдать хелпера пользователю

♻ Автоматически:
Варн за рекламу
Приветствие`;

			if(message.user.keyboard == false) {
					await message.reply(`🛡 Менеджер:

${text}
`);
}
if(message.user.keyboard == true) {
	await message.reply(`🛡 Менеджер:

${text}
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
				"payload": "{\"button\": \"4\"}",
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});
		}}
);	


cmd.hear(/^(?:деятельность|Развлекательные|другое|@nova_bot1 другое)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(message.user.keyboard == true) {
					await message.reply(`По просьбе многих игроков, команда была перенесена.`, 
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
				"label": "Убрать кнопки"
			},
				"color": "negative"
			}]
		]
			})
		});}
					if(message.user.keyboard == false) {
					await message.reply(`По просьбе многих игроков, команда была перенесена.`);}
});	


cmd.hear(/^(?:убрать кнопки|@nova_bot1 убрать кнопки)$/i, async (message, bot) => {
	message.user.foolder += 1;
message.user.keyboard = false;
	return bot(`клавиатура показана.

	`);
});

cmd.hear(/^(?:найти)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) {
			var users_arg = message.args[1];
			users_arg[1] = message.args[1].replace(/https/ig, '');
			users_arg[1] = message.args[1].replace(/http/ig, '');
			users_arg[1] = message.args[1].replace(/\:/ig, '');
			users_arg[1] = message.args[1].replace(/m\.vk\.com/ig, '');
			users_arg[1] = message.args[1].replace(/vk\.com/ig, '');
			users_arg[1] = message.args[1].replace(/\//ig, '');
			let user = users.find(x=> x.id === Number(users_arg));
			if(!user){
			return bot(`неверный ID игрока`);
			}
		}
		if(user.uid === message.user.uid) return bot(`неверный ID`);
			let text = ``;	
	
	
	text += `🔎 ID: ${user.uid}\n`;
	text += `🏮 Ссылка:  vk.com/id${user.id}\n`;
	text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
	if(user.bank) text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
	if(user.btc) text += `🌐 Биткоинов: ${utils.sp(user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(user.rating)}\n`;
	if(user.work) text += `👔 Работа: ${works[user.work - 1].name}\n`;
	if(user.marriage.partner) text += `👬 Партнер: ${users[user.marriage.partner].tag}`;
	text += `🌟 Уровень: ${user.level} [${user.exp}/24]\n`;

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

		if(user.misc.pet) text += `⠀🐌 Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(user.misc.phone) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.farm) text += `⠀🔋 Ферма: ${farms[user.misc.farm - 1].name}\n`;
		if(user.business) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}

	if(user.dollars || user.euro || user.manat || user.diamonds || user.emeralds || user.coal || user.iron || user.gold)
		{
		text += `\n&#128184; Доп.Валюта:\n`;
        text += `\n`;

		if(user.dollars) text += `&#128181; Долларов: ${user.dollars}\n`;
	if(user.euro) text += `&#128182; Евро: ${user.euro}\n`;
	if(user.manat) text += `&#128183; Манат: ${user.manat}\n`;
    if(user.diamonds) text += `&#128142; Алмазов: ${user.diamonds}\n`;
    if(user.emeralds) text += `&#128160; Изумрудов: ${user.emeralds}\n`;
    if(user.coal) text += `&#128488; Угля: ${user.coal}\n`;
    if(user.iron) text += `&#11036; Железа: ${user.iron}\n`;
    if(user.gold) text += `&#128155; Золото: ${user.gold}\n`;
	}
	text += `\n🔥 ${user.right.toString().replace(/1/gi, "Привилегия: Пользователь").replace(/2/gi, "Привилегия: Вип").replace(/3/gi, "Привилегия: Админ").replace(/4/gi, "Привилегия: Разраб")}`;
	text += `\n📗 Дата регистрации в боте: ${user.regDate}`;
	return bot(`профиль игрока:\n${text}`);
	});

cmd.hear(/^(?:Поиск)\s(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)$/i, async (message, bot) => { 
	message.user.foolder += 1;
	if (message.args[4]) {
				var domain = message.args[4].split(" ");}

let user = users.find(x=> x.id === Number(message.args[3]));

			let text = ``;	
	
	text +=  `${user.uid}\n`;
	return bot(`ID игрока\n${text}`);
});

cmd.hear(/^(?:cid)$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`🎉 ID этого чата: ${message.chatId}`);
	});   

cmd.hear(/^(?:профиль|проф|@nova_bot1 профиль)$/i, async (message, bot) => {
	message.user.foolder += 1;
			let text = ``;	

    text += `❤ Основное:\n`;
	text += `🔎 ID: ${message.user.uid}\n`;
	text += `🖱 Ссылка: vk.com/id${message.user.id}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `🚀 Энергия: ${message.user.energy}\n`;
	if(message.user.ccard) text += `💳 Баланс карты: ${message.user.card}\n`;
	if(message.user.bank) text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.btc) text += `🌐 Биткоинов: ${utils.sp(message.user.btc)}\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	if(message.user.marriage.partner) text += `👬 Партнер: ${users[message.user.marriage.partner].tag}`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;
	if(message.user.foolder) text += `📚 Использовано команд: ${message.user.foolder}\n`;
    if(message.user.floder) text += `📖 Всего сообщений: ${message.user.floder}\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business ||
		message.user.number)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone) text += `📱  Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.phone)	text += `📱 Оператор: ${message.user.operator.toString().replace(/1/gi, "отсутствует || Команда: Купить номер").replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}\n`;
		if(message.user.number) text += `📱 Номер телефона: +79${message.user.number}\n`;
		if(message.user.misc.pet) text += `⠀🐌 Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm) text += `🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`;
		if(message.user.business) text += `${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	if(message.user.diamonds || message.user.emeralds || message.user.coal || message.user.iron || message.user.gold)
		{
		text += `\n🕯 Руды:\n`;

    if(message.user.diamonds) text += `💎Алмазов: ${message.user.diamonds}\n`;
    if(message.user.emeralds) text += `⭐ Изумрудов: ${message.user.emeralds}\n`;
    if(message.user.coal) text += `☄ Угля: ${message.user.coal}\n`;
    if(message.user.iron) text += `☀ Железа: ${message.user.iron}\n`;
    if(message.user.gold) text += `🌕 Золото: ${message.user.gold}\n`;
	}
	if(message.user.inds || message.user.skan || message.user.trgn)
	{
		text += `\n☁ Минералы:\n`;
	if(message.user.inds) text += `🌊 Индия: ${message.user.inds} ед.\n`;
	if(message.user.skan) text += `🌀 Скадия: ${message.user.skan} ед.\n`;
	if(message.user.trgn) text += `🌫 Тергония: ${message.user.trgn} ед.\n`;
	}

	text += `\n👬 Персонаж:\n`;

    text += `📖 Информация: ${message.user.realname} ${message.user.realfam}\n`;
    text += `💬 Ваш социальный статус: ${message.user.right.toString().replace(/1/gi, "Красный").replace(/2/gi, "Оранжевый").replace(/3/gi, "Синий").replace(/4/gi, "Фиолетовый").replace(/5/gi, "Зелёный").replace(/6/gi, "Белый")}\n`;
    text += `❤ Здоровья: ${message.user.healths}\n`;
    text += `🍗 Голода: ${message.user.hunger}\n`;
    text += `⚠  Жалоб: ${message.user.jalobs}\n`;
    text += `🔥 Привилегия: ${message.user.right.toString().replace(/1/gi, "Пользователь").replace(/2/gi, "Вип").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик").replace(/5/gi, "Создатель").replace(/6/gi, "Элита")}`;

	text += `\n\n📗 Дата регистрации: ${message.user.regDate}`;

	return message.send(`📢 [id${message.user.id}|${message.user.tag}], вот ваш профиль:\n\n${text}`);
		}
);	

cmd.hear(/^(?:брак)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return message.send('[Подсказка]: Нужно использовать так\n\n 💑 Брак [ID]\n\nПосмотреть ваш специальный Uid можно в профиле.');
});

cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const coals = utils.random(50000000000000000);
	let text = `📢 [id${message.user.id}|${message.user.tag}], на ваших руках: \n`;
    text += `\n💰 Денег: ${utils.sp(message.user.balance)}$`;
	if(message.user.bank) text += `\n💳 В банке: ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`;

	return message.send(text);
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`у вас на банковском счёте находится: ${utils.sp(message.user.bank)}$`);
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

	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.bank)
	{
		message.user.balance += message.args[1];
		message.user.bank -= message.args[1];

		return bot(`вы успешо сняли ${utils.sp(message.args[1])}$
💳 Остаток на счёте: ${utils.sp(message.user.bank)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
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
	if(message.args[1] <= 49) return bot(`минимальная сумма вклада 50$`);
	if(message.args[1] > 250000000000) return bot(`максимальная сумма вклада 250.000.000.000$`);

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		message.user.bank += message.args[1];

		return bot(`вы положили на свой банковский счёт ${utils.sp(message.args[1])}$`);
	}
});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`🔕 || ${message.user.tag}, Вы отключили уведомления! :(`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
message.user.notifications = true;
		return message.send(`🔔 [id${message.user.id}|${message.user.tag}], Вы обратно включили уведомления! :3`);
	}
});

cmd.hear(/^(?:передать|передай|перидать|пиредать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
 
		let amount = parserInt(message.args[2]); 
		if(message.user.right <= 1) {
		if(message.args[2] >= 100000000) return message.reply(`📣 Слишком большая сумма!`);
        
	if(message.user.timers.translation) return bot(`вы сможете передать игроку в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.translation = false;
	}, 600000);

	message.user.timers.translation = true;
}
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

		await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:карта)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.user.foolder += 1;
  if(message.user.ccard == true) return message.send(`У вас уже есть карта.`);
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
message.user.balance -= 3000;
  message.user.ccard = true;
  vk.api.messages.send({ user_id: message.user.id, message: `
📞 &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜Добрый день, ${message.user.tag}.
Вы успешно приобрели карту VISA! Вот информация о карте:
========================
Номер карты: ${result}
Ваш CVC: ${results}
========================
Также, было снято 3000$ с вашего баланса, за приобретение карты в боте.❜` }); 
}
});

cmd.hear(/^(?:положить)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.args[1] >= 100000000) return message.reply(`Слишком большая сумма.`);
	  if(message.user.ccard == false) return bot(`у вас нет карты.`);
	  const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!message.args[1])  return message.send(`[!] Введите сумму.`);
if(message.args[1] < 0) return bot(`сумма не должна быть ниже 0.`);
if(message.args[1] > message.user.balance) return bot(`на вашем счету не достаточно средств!`);
message.user.balance -=  Number(message.args[1]);
message.user.card +=  Number(message.args[1]);
vk.api.messages.send({ user_id: message.user.id, message: `
📞 &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜На вашу карту (${message.user.cardss}) было зачислено: ${Number(message.args[1])}$.
Ваш баланс на карте составляет: ${message.user.card}$❜` }); 
return message.send(`💳 Вы успешно положили на карту: ${Number(message.args[1])}$`);
});

cmd.hear(/^(?:снять)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

		if(message.args[1] >= 100000000) return message.reply(`😅 Слишком большая сумма!`);
	if(message.user.ccard == false) return bot(`у вас нет карты.`);
  if(!message.args[1])  return message.send(`введите сумму.`);
  if(message.args[1] > message.user.card) return bot(`на вашем счету недостаточно средств!`);
  let stavkaa = 10;
  let summa = Number(message.args[1]);
  proc = Number(summa) / 100 * Number(stavkaa);

    let vivod = Number(summa) - Number(proc);


  message.user.card -= summa;
  message.user.balance += Math.round(vivod);
  vk.api.messages.send({ user_id: message.user.id, message: `
📞 &#4448;+79000000001&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜С вашей карты (${message.user.cardss}) было снято: ${Math.round(vivod)}$.
Ваш баланс на карте составляет: ${message.user.card}$❜` }); 
  return message.send(`🤑 Вы успешно сняли ${Math.round(vivod)}$ (С комиссией)`);
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
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

cmd.hear(/^(?:ник|зови меня|зови)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(message.user.right <= 1) {
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов\n\n🔌 Что бы снять ограничения, сделайте любую покупку доната.`);
}
	message.user.tag = message.args[1];
	return bot(`вы теперь "${message.user.tag}"`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`разделы магазина:
🚙 Транспорт:

🚗 Машины
🛥 Яхты
🛩 Самолеты
🚁 Вертолеты

🏘 Недвижимость:

🏠 Дома
🌇 Квартиры

📌 Остальное:
🐌 Питомцы
📱 Телефоны
⭐ Фермы
👑 Рейтинг [кол-во] - $250 млн
💼 Бизнесы
🌐 Биткоин [кол-во]

🔎 Для покупки используйте "[категория] [номер]".
💿 Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});

cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
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
		if(!message.user.misc.farm) return bot(`у вас нет фермы`);
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);

		message.user.balance += Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		message.user.misc.farm = 0;

		return bot(`вы продали свою ферму за ${utils.sp(a)}$`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.rating) return bot(`у вас нет рейтинга`);
		let a = (150000 * options.count);

		message.user.balance += Math.floor(a);
		message.user.rating -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтингов'])} за ${utils.sp(Math.floor(a))}`);
	}
if(/инд/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.inds) return bot(`у вас нет/недостаточно индия.`);
		let a = (500 * options.count);

		message.user.balance += Math.floor(a);
		message.user.inds -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['индия', 'индия'])} за ${utils.sp(Math.floor(a))}`);
	}
if(/скад/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.skan) return bot(`у вас нет/недостаточно скадия`);
		let a = (1500 * options.count);

		message.user.balance += Math.floor(a);
		message.user.skan -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['скадия', 'скадия'])} за ${utils.sp(Math.floor(a))}`);
	}
if(/тергон/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.inds) return bot(`у вас нет/недостаточно тергония.`);
		let a = (3500 * options.count);

		message.user.balance += Math.floor(a);
		message.user.trgn -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['тергония', 'тергония'])} за ${utils.sp(Math.floor(a))}`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$`);
	}

	if(/биткоин/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.btc) return bot(`недостаточно биткоинов`);
		let a = Math.floor(btc * options.count);

		message.user.balance += Math.floor(a);
		message.user.btc -= options.count;

		return bot(`вы продали ${options.count}₿ за ${utils.sp(a)}$`);
	}

	if(/уголь/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.coal) return bot(`недостаточно угля`);
		let a = (150 * options.count);

		message.user.balance += Math.floor(a);
		message.user.coal -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['угля', 'угля'])} за ${utils.sp(Math.floor(a))}$`);
	}

	if(/железо/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.iron) return bot(`недостаточно железа`);
		let a = (320 * options.count);

		message.user.balance += Math.floor(a);
		message.user.iron -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['железа', 'железа'])} за ${utils.sp(Math.floor(a))}$`);
	}

	if(/золото/i.test(message.args[1].toLowerCase())) 
	{ 
		if(options.count > message.user.gold) return bot(`недостаточно золота`); 
		let a = (525 * options.count);

		message.user.balance += Math.floor(a);
		message.user.gold -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['золота', 'золота'])} за ${utils.sp(Math.floor(a))}$`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.diamonds) return bot(`недостаточно алмаза`);
		let a = (760 * options.count);

		message.user.balance += Math.floor(a);
		message.user.diamonds -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['алмазов', 'алмазов'])} за ${utils.sp(Math.floor(a))}$`);
	}

	if(/изумруд/i.test(message.args[1].toLowerCase()))
	{
		if(options.count > message.user.emeralds) return bot(`недостаточно эмеральда`);
		let a = (2450 * options.count);

		message.user.balance += Math.floor(a);
		message.user.emeralds -= options.count;

		return bot(`вы продали ${options.count} ${utils.decl(options.count, ['изумруда', 'изумруда'])} за ${utils.sp(Math.floor(a))}$`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🔹' : '🔸'} 1. Самокат (50КК$)
${message.user.transport.car === 2 ? '🔹' : '🔸'} 2. Велосипед (250КК$)
${message.user.transport.car === 3 ? '🔹' : '🔸'} 3. Гироскутер (500КК$)
${message.user.transport.car === 4 ? '🔹' : '🔸'} 4. Сегвей (750КК$)
${message.user.transport.car === 5 ? '🔹' : '🔸'} 5. Мопед (2,5ККК$)
${message.user.transport.car === 6 ? '🔹' : '🔸'} 6. Мотоцикл (5ККК$)
${message.user.transport.car === 7 ? '🔹' : '🔸'} 7. ВАЗ 2109 (7,5ККК$)
${message.user.transport.car === 8 ? '🔹' : '🔸'} 8. Квадроцикл (8ККК$)
${message.user.transport.car === 9 ? '🔹' : '🔸'} 9. Багги (13,5ККК$)
${message.user.transport.car === 10 ? '🔹' : '🔸'} 10. Вездеход (20ККК$)
${message.user.transport.car === 11 ? '🔹' : '🔸'} 11. Лада Xray (35ККК$)
${message.user.transport.car === 12 ? '🔹' : '🔸'} 12. Audi Q7 (75ККК$)
${message.user.transport.car === 13 ? '🔹' : '🔸'} 13. BMW X6 (100ККК$)
${message.user.transport.car === 14 ? '🔹' : '🔸'} 14. Toyota FT-HS (175ККК$)
${message.user.transport.car === 15 ? '🔹' : '🔸'} 15. BMW Z4 M (250ККК$)
${message.user.transport.car === 16 ? '🔹' : '🔸'} 16. Subaru WRX STI (275ККК$)
${message.user.transport.car === 17 ? '🔹' : '🔸'} 17. Lamborghini Veneno (300ККК$)
${message.user.transport.car === 18 ? '🔹' : '🔸'} 18. Tesla Roadster (450ККК$)
${message.user.transport.car === 19 ? '🔹' : '🔸'} 19. Yamaha YZF R6 (500ККК$)
${message.user.transport.car === 20 ? '🔹' : '🔸'} 20. Bugatti Chiron (650ККК$)
${message.user.transport.car === 21 ? '🔹' : '🔸'} 21. Thrust SSC (3,5КККК$)
${message.user.transport.car === 22 ? '🔹' : '🔸'} 22. Ferrari LaFerrari (3,9КККК$)
${message.user.transport.car === 23 ? '🔹' : '🔸'} 23. Koenigsegg Regera (5КККК$)
${message.user.transport.car === 24 ? '🔹' : '🔸'} 24. Tesla Semi (7КККК$)
${message.user.transport.car === 25 ? '🔹' : '🔸'} 25. Venom GT (12,5ККК$)
${message.user.transport.car === 26 ? '🔹' : '🔸'} 26. Rolls-Royce (15КККК$)

Справка: К = 000. Пример: 3КК = 3.000.000.
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
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '🔹' : '🔸'} 1. Ванна GUCCI (1ККК$)
${message.user.transport.yacht === 2 ? '🔹' : '🔸'} 2. Nauticat 331 (1КККК$)
${message.user.transport.yacht === 3 ? '🔹' : '🔸'} 3. Nordhavn 56 MS (1,5КККК$)
${message.user.transport.yacht === 4 ? '🔹' : '🔸'} 4. Princess 60 (2,5КККК$)
${message.user.transport.yacht === 5 ? '🔹' : '🔸'} 5. Azimut 70 (3,5КККК$)
${message.user.transport.yacht === 6 ? '🔹' : '🔸'} 6. Dominator 40M (5КККК$)
${message.user.transport.yacht === 7 ? '🔹' : '🔸'} 7. Moonen 124 (6КККК$)
${message.user.transport.yacht === 8 ? '🔹' : '🔸'} 8. Wider 150 (6,5КККК$)
${message.user.transport.yacht === 9 ? '🔹' : '🔸'} 9. Palmer Johnson 42M SuperSport (8КККК$)
${message.user.transport.yacht === 10 ? '🔹' : '🔸'} 10. Wider 165 (8,5КККК$)
${message.user.transport.yacht === 11 ? '🔹' : '  '} 11. Eclipse (15КККК$)
${message.user.transport.yacht === 12 ? '🔹' : '🔸'} 12. Dubai (30КККК$)
${message.user.transport.yacht === 13 ? '🔹' : '🔸'} 13. Streets of Monaco (45КККК$)

Справка: К = 000. Пример 6ККК = 6.000.000.000.
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
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '🔹' : '🔸'} 1. Параплан (10ККК$)
${message.user.transport.airplane === 2 ? '🔹' : '🔸'} 2. АН-2 (35ККК$)
${message.user.transport.airplane === 3 ? '🔹' : '🔸'} 3. Cessna-172E (70ККК$)
${message.user.transport.airplane === 4 ? '🔹' : '🔸'} 4. Supermarine Spitfire (100ККК$)
${message.user.transport.airplane === 5 ? '🔹' : '🔸'} 5. BRM NG-5 (140ККК$)
${message.user.transport.airplane === 6 ? '🔹' : '🔸'} 6. Cessna T210 (260ККК$)
${message.user.transport.airplane === 7 ? '🔹' : '🔸'} 7. Beechcraft 1900D (550ККК$)
${message.user.transport.airplane === 8 ? '🔹' : '🔸'} 8. Cessna 550 (800ККК$)
${message.user.transport.airplane === 9 ? '🔹' : '🔸'} 9. Hawker 4000 (2,240КККК$)
${message.user.transport.airplane === 10 ? '🔹' : '🔸'} 10. Learjet 31 (4,5КККК$)
${message.user.transport.airplane === 11 ? '🔹' : '🔸'} 11. Airbus A318 (8,5КККК$)
${message.user.transport.airplane === 12 ? '🔹' : '🔸'} 12. F-35A (16КККК$)
${message.user.transport.airplane === 13 ? '🔹' : '🔸'} 13. Boeing 747-430 Custom (22,5КККК$)
${message.user.transport.airplane === 14 ? '🔹' : '🔸'} 14. C-17A Globemaster III (35КККК$)
${message.user.transport.airplane === 15 ? '🔹' : '🔸'} 15. F-22 Raptor (40КККК$)
${message.user.transport.airplane === 16 ? '🔹' : '🔸'} 16. Airbus 380 Custom (60КККК$)
${message.user.transport.airplane === 17 ? '🔹' : '🔸'} 17. B-2 Spirit Stealth Bomber (80КККК$)

Справка: К = 000. Пример: 12К = 12.000.
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
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '🔹' : '🔸'} 1. Шарик с пропеллером (200К$)
${message.user.transport.helicopter === 2 ? '🔹' : '🔸'} 2. RotorWay Exec 162F (30ККК$)
${message.user.transport.helicopter === 3 ? '🔹' : '🔸'} 3. Robinson R44 (45ККК$)
${message.user.transport.helicopter === 4 ? '  ' : '🔸'} 4. Hiller UH-12C (130ККК$)
${message.user.transport.helicopter === 5 ? '🔹' : '🔸'} 5. AW119 Koala (250ККК$)
${message.user.transport.helicopter === 6 ? '🔹' : '🔸'} 6. MBB BK 117 (400ККК$)
${message.user.transport.helicopter === 7 ? '🔹' : '🔸'} 7. Eurocopter EC130 (750ККК$)
${message.user.transport.helicopter === 8 ? '🔹' : '🔸'} 8. Leonardo AW109 Power (1КККК$)
${message.user.transport.helicopter === 9 ? '🔹' : '🔸'} 9. Sikorsky S-76 (1,5КККК$)
${message.user.transport.helicopter === 10 ? '🔹' : '🔸'} 10. Bell 429WLG (1,9КККК$)
${message.user.transport.helicopter === 11 ? '🔹' : '🔸'} 11. NHI NH90 (3,5КККК$)
${message.user.transport.helicopter === 12 ? '🔹' : '🔸'} 12. Kazan Mi-35M (6КККК$)
${message.user.transport.helicopter === 13 ? '🔹' : '🔸'} 13. Bell V-22 Osprey (13,5КККК$)

Справка: К = 000. Пример: 42,1КК = 42.100.000
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
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '🔹' : '🔸'} 1. Коробка из-под холодильника (25КК$)
${message.user.realty.home === 2 ? '🔹' : '🔸'} 2. Подвал (300КК$)
${message.user.realty.home === 3 ? '🔹' : '🔸'} 3. Палатка (350КК$)
${message.user.realty.home === 4 ? '🔹' : '🔸'} 4. Домик на дереве (500КК$)
${message.user.realty.home === 5 ? '🔹' : '🔸'} 5. Полуразрушенный дом (1ККК$)
${message.user.realty.home === 6 ? '🔹' : '🔸'} 6. Дом в лесу (2,5ККК$)
${message.user.realty.home === 7 ? '🔹' : '  '} 7. Деревянный дом (3,75ККК$)
${message.user.realty.home === 8 ? '🔹' : '🔸'} 8. Дача (12,5ККК$)
${message.user.realty.home === 9 ? '🔹' : '🔸'} 9. Кирпичный дом (20ККК$)
${message.user.realty.home === 10 ? '🔹' : '🔸'} 10. Коттедж (45ККК$)
${message.user.realty.home === 11 ? '🔹' : '🔸'} 11. Особняк (125ККК$)
${message.user.realty.home === 12 ? '🔹' : '🔸'} 12. Дом на Рублёвке (500ККК$)
${message.user.realty.home === 13 ? '🔹' : '🔸'} 13. Личный небоскрёб (700ККК$)
${message.user.realty.home === 14 ? '🔹' : '  '} 14. Остров с особняком (1,25КККК$)
${message.user.realty.home === 15 ? '🔹' : '🔸'} 15. Белый дом (2КККК$)

Справка: К = 000. Пример: 6,72ККК = 6.720.000.000.
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

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '🔹' : '🔸'} 1. Чердак (15КК$)
${message.user.realty.apartment === 2 ? '🔹' : '🔸'} 2. Квартира в общежитии (55КК$)
${message.user.realty.apartment === 3 ? '🔹' : '🔸'} 3. Однокомнатная квартира (175КК$)
${message.user.realty.apartment === 4 ? '🔹' : '🔸'} 4. Двухкомнатная квартира (260КК$)
${message.user.realty.apartment === 5 ? '🔹' : '🔸'} 5. Четырехкомнатная квартира (500КК$)
${message.user.realty.apartment === 6 ? '🔹' : '🔸'} 6. Квартира в центре Москвы  (1,6ККК$)
${message.user.realty.apartment === 7 ? '🔹' : '🔸'} 7. Двухуровневая квартира (4ККК$)
${message.user.realty.apartment === 8 ? '🔹' : '🔸'} 8. Квартира с Евроремонтом (6ККК$)

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
	message.user.foolder += 1;

	if(!message.args[1]) return bot(`телефоны: 
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (2,5КК$)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Nokia 3310 (2017) (5КК$)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. ASUS ZenFone 4 (20КК$)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (100КК$)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (150КК$)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Samsung Galaxy S8 (300КК$)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (500КК$)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Torex FS1 (750КК$)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. iPhone X (1ККК$)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. Мегафон С1 (2,5ККК$)

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

cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.user.right == 6) {
		if(( message.args[1] * 250000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
		else if(( message.args[1] * 250000 ) <= message.user.balance)
		{
			message.user.balance -= ( message.args[1] * 250000 );
			message.user.rating += message.args[1];

			return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 250000}$`);
		}
	}

	if(message.user.right > 2) return;
	if(message.args[1] <= 0) return;

if(( message.args[1] * 250000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 250000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${message.args[1]}👑 за ${message.args[1] * 250000}$`);
	}

});



cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`курс на данный момент:
💸Биткоин: ${utils.sp(btc)}$

🗝 Индий: 500$
🗝 Скадий: 1.500$
🗝 Тергоний: 3.500$

🗝 Уголь: 150$
🗝 Железо: 320$
🗝 Золото: 525$
🗝 Алмаз: 760$
🗝 Изумруд: 2.450$
`);
});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

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

cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`вот список топов:

		💿 Топ игроков
		💾 Топ биткоинов
		📰 Топ сообщений
		`);
});

	cmd.hear(/^(?:топ кланы)$/i, async (message, bot) => {
	message.user.foolder += 1;
		let text = "";
		let tops = [];
		
		for(key in clans) {
			tops.push({
				id: key,
				balance: clans[key].balance,
				name: clans[key].name,
				owner: clans[key].owner,
				exp: 0
			});
		}
		tops.sort((a,b) => {
			if(a.balance < b.balance)
				return 1;
			else if (a.balance > b.balance)
				return -1;
			return 0;
		});
		
		let topClans = [];
		for(i = 0; i < (tops.length > 10 ? 9 : tops.length); i++) {
			topClans.push({
				id: tops[i].id,
				balance: tops[i].balance,
				name: tops[i].name,
				owner: tops[i].owner,
				exp: 0,
				number: i
			})
		};
		
		
		return message.send(
			"💰 » Топ самых сильных кланов: \n\n" +
			topClans.map(e => 
				(e.number+1) + `&#8419;. ` + e.name +
				`\n🐱 Основатель: [id${e.owner.id}|${e.owner.tag}]\n` +
				`🔥 Баланс клана: ` + e.balance +
				`\n🔥 ID клана: ` + e.number +
				`\n🌍  Количество участников: ` + e.people + `\n\n`)
		);
});

cmd.hear(/^(?:giverub)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 3) return bot(`доступно с привилегии - Admin.`);
		if(message.args[2] <= 0) return;
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		user.balance[message.$match[1]].balance += Number(message.$match[2]);
	return bot(`Успешно! Вы накрутили пользователю (${user.tag}) -> ${utils.sp(message.args[2])}$`);
}
	});

cmd.hear(/^(?:топ игроков)$/i, async (message, bot) => {
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ${utils.sp(user.rating)}👑 | ${utils.rn(user.balance)}$
		`;
	}

	return bot(`топ игроков:
		${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rating)}👑 | ${utils.rn(message.user.balance)}$`);
});

cmd.hear(/^(?:топ биткоинов)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let top = [];

	users.map(x=> {
		top.push({ btc: x.btc, tag: x.tag, id: x.id, mention: x.mention });
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ${utils.sp(user.btc)}₿
		`;
	}

	return message.send(`Топ игроков по БитКоинам:
		${text}
—————————————————

${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.btc)}₿`);
});

cmd.hear(/^(?:топ сообщений)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let top = [];

	users.map(x=> {
		top.push({ foolder: x.foolder, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.foolder - a.foolder;
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

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ${utils.sp(user.foolder)}&#9993;
		`;
	}

	return message.send(`Топ игроков по сообщениям:
		${text}
—————————————————

${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.foolder)}&#9993;`);
});

cmd.hear(/^(?:бонус)$/i, async (message, bot) => {
	message.user.foolder += 1;
		let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	if(message.user.right <= 1) {
	if(message.user.timers.bonus) return bot(`вы сможете получить бонус в течении 24 часов.`);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;
}
	if(prize === 1)
	{
		message.user.balance += 50000;
		return bot(`вы выиграли 50000$`);
	}

	if(prize === 2)
	{
		message.user.btc += 1000;
		return bot(`вы выиграли 1.000В`);
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
		message.user.rating += 4;
		return bot(`вы выиграли 4👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
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
		message.user.rating += 10;
		return bot(`вы выиграли 10👑!\n👑 Рейтинг: ${utils.sp(message.user.rating)}`);
	}
	if(prize === 9)
	{
		message.user.bank += 100000;
		return bot(`вы выиграли 100.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
	if(prize === 10)
	{
		message.user.bank += 530000;
		return bot(`вы выиграли 530.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 11)
	{
		message.user.bank += 1900000;
		return bot(`вы выиграли 1900000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}

	if(prize === 12)
	{
		message.user.bank += 60000;
		return bot(`вы выиграли 60.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(message.user.bank)}$`);
	}
});

/* |                         | */
/* | А тут уже идут - Звонки | */
/* V                         V */

cmd.hear(/^(?:позвонить)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(!message.user.call) return message.reply(`Ой, ей! Похоже, у вас закончились вызовы....`);
if(message.args[1] < 9000000001) return message.send(`Пожалуйста, перепроверьте ваши данные. Чтобы зарегистрировать новый звонок, напишите так:\n\nПозвонить 9211437838`);

    let args = message.text.match(/^(?:позвонить)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("http://avtobzvon.ru/api/c2e1b006a358894e9f15c29cf7a8a0ed/11?phone=" + encodeURIComponent(args[1]) + "")
 return message.reply(`😜 Звонок зарегистрирован! 
❤ Осталось наборов: ${message.user.call}

`);
});

/* |                        | */
/* | А тут уже идут - Браки | */
/* V                        V */

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

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
	message.user.foolder += 1;

	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.hear(/^(?:развод)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.marriage.partner) return bot(`ты и так свободен!`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек! Удачи ;)`);
});

/* |                          | */
/* | А тут уже идут - Репорты | */
/* V                          V */

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;	
	vk.api.messages.send({ user_id: 366668990, message: `Чтобы отправить ответ пользователю, вы должны написать - Ответ ${message.user.uid} (Ваш ответ)

От: [id${message.user.id}|${message.user.realname}]
ID: ${message.user.uid}
Сообщение:
${message.args[1]}
` }).then(() => {
		return bot(`ваше сообщение на стадии расмотрения.`);
	}).catch((err) => {
		return message.send(`☒ -> Отказ отправление репорта!
			
			⚠ >> Причина:
			404`);
	});
});


cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.right < 3) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;

	vk.api.messages.send({ user_id: user.id, message: `
	📞 &#4448;Moderator&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜${message.args[2]}❜` });
});

cmd.hear(/^(?:купить номер)$/i, async (message, bot) => {
	message.user.foolder += 1;

	const operator1 = utils.random(2, 6);
	if(message.user.number > 9) return bot(`Вы уже имеете номер!`);
	if(!message.user.misc.phone) return message.send(`📱 У вас нет телефона.`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 9; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
message.user.balance -= 3000,
message.user.number = result;
message.user.numberss = true;
message.user.operator = operator1;
return message.send(`📱 Вы успешно получили телефонный номер: +79${result} Оплата: 3000$ Оператор: ${message.user.operator.toString().replace(/2/gi, "Теле2").replace(/3/gi, "Мегафон").replace(/4/gi, "Билайн").replace(/5/gi, "Yota").replace(/5/gi, "Vk mobile").replace(/6/gi, "Мтс")}`);
}
});

cmd.hear(/^(?:!русский)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.user.language += 1;

	return bot(`успешно! Вы сменили язык на русский.`);
});









cmd.hear(/^(?:ша11хта)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.exp < 1) return bot(`мало опыта!`);
if(message.user.right <= 1) {
	if(message.user.timers.mine) return bot(`прости, но ты уже работал(а) на шахте!
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

	return bot(`в шахте, вы нашли:
		💡Угля: ${utils.sp(coals)}
		💡Железа: ${utils.sp(irons)}
		💡Золото: ${utils.sp(golds)}
		💡Алмазов: ${utils.sp(diamondss)}
		💡Изумрудов: ${utils.sp(emeralds)}`);
});








/* |                         | */
/* | А тут уже идёт - Работа | */
/* V                         V */

cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
	message.user.foolder += 1;
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);
	return bot(` профессии:
👔 1. Дворник || Зарплата ~200-250$ || Уровень: 1
👔 2. Сторож || Зарплата ~375-400$ || Уровень: 3
👔 3. Продавец || Зарплата ~400-450$ || Уровень: 5
👔 4. Няня || Зарплата ~600-800$ || Уровень: 8
👔 5. Курьер || Зарплата ~750-800$ || Уровень: 10
👔 6. Слесарь || Зарплата ~900-940$ || Уровень: 14
👔 7. Охранник || Зарплата ~1000-1250$ || Уровень: 22
👔 8. Библиотекарь || Зарплата ~1200-1300$ || Уровень: 25
👔 9. Воспитатель || Зарплата ~1450-1650$ || Уровень: 35
👔 10. Педагог || Зарплата ~1600-1750$ || Уровень: 49
👔 11. Повар || Зарплата ~1700-1800$ || Уровень: 65
👔 12. Грузчик || Зарплата ~1950-2000$ || Уровень: 95
👔 13. Парикмахер || Зарплата ~2350-2400$ || Уровень: 105
👔 14. Врач || Зарплата ~2450-2550$ || Уровень: 125
👔 15. Торговый представитель || Зарплата ~2650-2750$ || Уровень: 145
👔 16. Специалист по валютным операциям || Зарплата ~5500-7050$ || Уровень: 200
👔 17. Юрист по налоговому праву || Зарплата ~7050-11050$ || Уровень: 250
👔 18. Программист PHP || Зарплата ~9050-12050$ || Уровень: 300

💡 Для устройства на работу: «Работа [номер]»
💡 Для того, чтобы уволиться: «Уволиться»

🎬 За каждую прописку «Работать» вы получаете 1 ед опыта.

💰 Зарплату можно получать в течении 10 мин. командой: «Работать»`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работа"`);
if(message.user.right <= 1) {
	if(message.user.timers.hasWorked) return bot(`рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;
}
	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.exp += 1;

	return bot(`рабочий день закончен.
💵 Вы заработали ${utils.sp(earn)}$

📁 Ваш баланс: ${message.user.balance}
🌠 Ваш уровень: ${message.user.exp}/24`);
});

cmd.hear(/^(?:уволиться|уволится)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

/* |                       | */
/* | А тут уже идут - Игры | */
/* V                       V */

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	message.user.foolder += 1;
	
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.balance += 15000;
		return bot(`вы угадали! Приз 15.000$`);
	} else return bot(`вы не угадали 
	🎲 Выпало число ${int}`);
});



cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
		const multiply = utils.pick([0.5, 0.50, 0.75, 0.75, 0.25, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return message.send(`   Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}]
		[${['😐','🤐', '😝', '  ', '🤧'].random()}] ${multiply === 1 ? `Ваши деньги остаются при вас` : `${multiply < 1 ? `Вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `Вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}
		❤ На этот раз, мы умножили вашу сумму на x${multiply}
		
		💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
	}
});

cmd.hear(/^(?:передать|передай|перидать|пиредать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
 
		let amount = parserInt(message.args[2]); 
		if(message.user.right <= 1) {
		if(message.args[2] >= 100000000) return message.reply(`📣 Слишком большая сумма!`);
        
	if(message.user.timers.translation) return bot(`вы сможете передать игроку в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.translation = false;
	}, 600000);

	message.user.timers.translation = true;
}
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

		await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:ловушка)\s(.*)$/i, async (message, bot) => {
  if(!message.args[1]) return message.send(`укажите ставку`);	
  let text = parserInt(message.args[1]); 
  if(!Number(text)) return bot(`ставка должна быть целым числом.`); 
  if(!text) return bot("укажите ставку!");
  if(!message.args[1]) return bot(`Вы не указали ставку`);
  if(text > message.user.balance || text <= 0) return bot(text <= 0 ? `ставка не может быть меньше 0 или равна 0` : `ставка не может превышать баланс`);
{
 	if(rand(1,100) > 50) {
        let win = text * 1.5;
        message.user.balance += Math.round(win);   
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n😎Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 Вы выиграли:  ${spaces(win)}$`);
    }else{
        let win = text;
        message.user.balance -= Math.round(win);  
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n💀Какая неудача... Вы повредили руку [${['ловушкой','мышеловкой','капканом'].random()}] \n💴 Вы проиграли:  ${spaces(win)}$`);
   
    } 		

}
})

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
	    return bot(`поздравляю! Вы попали прямо в цель!!\n👤 Вы забираете ваш выигрыш :3`, {attachment: win});
	  }else{
	    message.user.balance -= stavka;
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }

    return bot(`Вы промахнулись...\n💀 Вы теряете всю свою ставку.`, {attachment: lose});
  	}
	   
});

cmd.hear(/^(?:🔫|выстрел)$/i, async (message, bot) => {

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
			message.user.balance += 1000000;
			return message.reply(`😅 ${message.user.tag}, поздравляем! Вы выжили в этой страшной игре!\n☺ Мы подарили вам - 1.000.000$`);
			}
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`БАХ!!`);
			return message.reply(`😎 Пуля попала вам в голову...\n🍀Вам повезло. Стреляйте дальше!\n😧 Осталось выстрелов: ` + p);

		}
		if(rand != "успешно"){
			message.reply(`1...`);
			message.reply(`2...`);
			message.reply(`3...`);
			message.reply(`БАХ!!`);
			message.reply(`🤕 Пуля попала вам в голову...\n😞 Удача повернулась к вам спиной.\n   Вы проиграли. Баланс анулирован. `);
			message.user.balance = 5000;
			return message.user.pp = 0;
				}
			}


});


cmd.hear(/^(?:монетка)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {


    if(!message.args[1]) return message.reply(`Проверьте вводимые данные:\nⓂ  монетка ставка орел/решка`);
    let user = message.user;
    if(message.args[1] > message.user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   	
	let a = rand(1,100);
    if(a > 50) {
    	if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n💴 Вы выиграли: ${spaces(message.args[1])}$\n[$] Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпала 'Решка' \n\n💸 Вы проиграли: ${spaces(message.args[1])}$\n[$] Баланс: ${spaces(user.balance)}`);
    }
    }
    if(a < 50) {
       if(message.args[2].toLowerCase() == 'решка'){
        message.user.balance -= Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n💸 Вы проиграли: ${spaces(message.args[1])}$\n[$] Баланс: ${spaces(user.balance)}`);
    	}
    	if(message.args[2].toLowerCase() == 'орел'){
        message.user.balance += Math.round(message.args[1]);
        return bot(`вам выпал 'Орел' \n\n💴 Вы выиграли: ${spaces(message.args[1])}$\n[$] Баланс: ${spaces(user.balance)}`);
    		}
   		 }
	return message.reply(`Подсказка: монетка [ставка] [орел/решка]`);
});

cmd.hear(/^(?:Фортуна)$/i, async (message, bot) => {
	message.user.foolder += 1;
			
		return message.reply(`
    [🙃]: Призы рулетки
    ✔ Алмазы.
    ✔ Уголь.
    ✔ Валюта.
    ✔ Биткоины.

    ✳ Цена прокрутки: 2000 Биткоинов.
    ✳ Команда, чтобы начать играть: крутить
    `, {attachment: fortyn});
	});
 
cmd.hear(/^(?:Крутить)$/i, async (message, bot) => {
	message.user.foolder += 1;
		
		let user = message.user
		   	if (message.user.btc < 2000) return message.reply(`🍏 Прокрутка рулетки стоит 2000 Биткоинов.`, {attachment: fortyn});
			message.user.btc -= 2000;

		let balan = rand(350000, 550000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (message.user.level > 1) {
						message.user.balance += 50000;
						return message.reply(`🔆 Вы выиграли 50.000$`, {attachment: fortyn});
					}
			        message.user.balance += 100000;
					return message.reply(`✨ Вы выиграли 100.000$`, {attachment: fortyn});
				}
			} else {
				message.user.balance += balan;
				return message.reply(`🍀 Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
			}
			if (win2 > 1) {
				message.user.balance += balan;
				return message.reply(`⚡ Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
			}
		}
		if (win == 2) {
			message.user.balance += balan;
			return message.reply(`🎉 Вы выиграли ${spaces(balan)}$`, {attachment: fortyn});
		}
		if (win == 3) {
			let balenc = balan - 5000;
			message.user.balance += balenc;
			return message.reply(`🎄 Вы выиграли ${spaces(balenc)}$`, {attachment: fortyn});
		}
		if (win == 4) {
			let don = rand(5, 16);
			message.user.btc += don;
			return message.reply(`💥 Вы выиграли ${spaces(don)} Биткоинов.`, {attachment: fortyn});
		}
		if (win == 5) {
			let exs = rand(135, 160);
			message.user.coal += exs;
			return message.reply(`💣 Вы выиграли ${spaces(exs)} угля.`, {attachment: fortyn});
		}
		if (win == 6) {
			let bit = rand(3, 7);
			message.user.diamond += bit;
			return message.reply(`🔥 Вы выиграли ${spaces(bit)} алмазов.`, {attachment: fortyn});
		}
	});

cmd.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
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

cmd.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
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

cmd.hear(/^(?:сейф)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.args[1] < 10 || message.args[1] >= 100) return;

	const int = utils.random(10, 99);
	message.args[1] = Number(message.args[1]);

	if(int === message.args[1])
	{
		message.user.balance += 10000000;
		return bot(`вау! Невероятно! Вы угадали число - ${int}!
	    Вам начислено 10.000.000$   `);
	} else if(int !== message.args[1])
	{
		return bot(`к сожалению, вы не угадали число. Правильно число, это - "${int}"
		❤ Не отчаивайтесь, ведь количество попыток неограниченно.
		
		Если вы угадаете код, то вы получите 10.000.000$`);
	}
});

/* |                         | */
/* | А тут уже идёт - Бизнес | */
/* V                         V */

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🔸' : '🔹'} 1. Продажа вещей - 5000000$
Прибыль: 4000$/час

${message.user.business === 2 ? '🔸' : '🔹'} 2. Ларёк - 10000000$
Прибыль: 7000$/час

${message.user.business === 3 ? '🔸' : '🔹'} 3. Ресторан - 30000000$
Прибыль: 25000$/час

${message.user.business === 4 ? '🔸' : '🔹'} 4. Магазин - 50000000$
Прибыль: 38000$/час

${message.user.business === 5 ? '🔸' : '🔹'} 5. Завод - 150000000$
Прибыль: 80000$/час

${message.user.business === 6 ? '🔸' : '🔹'} 6. Шахта - 2500000000$
Прибыль: 700000$/час

${message.user.business === 7 ? '🔸' : '🔹'} 7. Офис - 8000000000$
Прибыль: 2200000$/час

${message.user.business === 8 ? '🔸' : '🔹'} 8. Разработка игр - 15000000000$
Прибыль: 3000000$/час

${message.user.business === 9 ? '🔸' : '🔹'} 9. Нефтевышка - 50000000000$
Прибыль: 7000000$/час

${message.user.business === 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 80000000000$
Прибыль: 10000000$/час

${message.user.business === 11 ? '🔸' : '🔹'} 11. Космическое агентство - 500000000000$
Прибыль: 500000000$/час

${message.user.business === 12 ? '🔸' : '🔹'} 12. Изучение астероидов - 50000000000000$
Прибыль: 50000000000$/час

${message.user.business === 13 ? '🔸' : '🔹'} 13. Межгалактический экспресс - 5000000000000000$
Прибыль: 5000000000000$/час

${message.user.business === 14 ? '🔸' : '🔹'} 14. Космическая аэробаза - 500000000000000000$
Прибыль: 500000000000000$/час

Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.business) return bot(`у вас нет бизнеса.`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(biz.earn)}$/час
	💰 На счёте: ${utils.sp(message.user.biz)}$`);
});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.business) return bot(`оууу... Прости, но у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса!`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

/* |                        | */
/* | А тут уже идёт - Ферма | */
/* V                        V */

cmd.hear(/^(?:ферма|@nova_bot1 ферма)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return message.send(`${message.user.tag}, похоже, на вашей ферме пусто, новые биткоины появятся в течении 1 часа.`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}฿, следующие биткоины появятся через час
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 6฿/час (20КК$)

${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 25฿/час (1ККК$)

${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 40฿/час (90ККК$)

${message.user.misc.farm === 4 ? '🔹' : '🔸'} 4. KR-930-739F 63฿/час (9КККК$)

${message.user.misc.farm === 5 ? '🔹' : '🔸'} 5. DV2003-TETО 80฿/час (90ККККК$)

Для покупки введите "Фермы [номер]"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.farm) return bot(`у вас уже есть ферма (${farms[message.user.misc.farm - 1].name}), введите "Продать ферму"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

/* |                          | */
/* | А тут уже идёт - Реферал | */
/* V                          V */

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	message.user.foolder += 1;
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 4.000.000$
	Если друг активирует вашу рефералку, то он получит 5.000.000$ `);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.referal !== null) return bot(`вы уже активировали реферал!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 4000000;
	message.user.balance += 2000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `
	🎯 Привет, ${user.tag}!

	🎉Спасибо за приглашение [id${message.user.id}|друга] в бота!
	💸 Вам начислено 4.000.000$ на баланс.` });
	return bot(`вы успешно активировали реферал игрока - [${user.id}|${user.tag}]!.
	💲 За это, вам начислено 2.000.000$`);
});


cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	message.user.foolder += 1;

const percent = utils.random(100);
const ping = utils.random(300);
const dns = utils.random(6000000);
const core = utils.random(8);
const ipv = utils.random(3000);
	await message.send(`📖 Техническая информация:

Проект: Nova Bot
⚙ OC: Ubuntu
💡 Версия ядра: 14.04
🔐 Версия бота: 62.106.5 Pre-1
🎚 Нагрузка: ${percent}%

💡 Мой Владелец (За донатом к нему) -  vk.com/Novastream2030
💡 Мой создатель - vk.com/delifeless
🎙Отвечают на все вопросы.
`);
});	

/* |                                       | */
/* | А тут уже идут - Чат команды (Беседа) | */
/* V                                       V */

cmd.hear(/^(?:кто)/i, async (message, bot) => {
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

cmd.hear(/^(?:бутылочка)$/i, async (message, bot) => { 
	message.user.foolder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
let { profiles } = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId 
}); 
let profile = utils.pick(profiles); 
let profile2 = utils.pick(profiles); 
message.send(`🍷Бутылочка 

[id${profile.id}|${profile.first_name}] и [id${profile2.id}|${profile2.first_name}] — ваше действие: ` + utils.pick(['Заняться сексом!', 'Поцеловаться', 'Сесть на бутылочку', 'Начать встречаться', '*Вы пропускаете ход*', 'Раздеться', 'Бухнуть', 'Пожениться'])); 
});

cmd.hear(/^(?:онлайн)$/i, async (message, bot) => {
	message.user.foolder += 1;
		if(!message.isChat) return bot(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: message.peerId,
        fields: "online"
    }).then(async function (response) {
        let text = `😎 Список людей, которые сейчас находятся онлайн:\n\n`;
        await response.profiles.map(e => {
            if(e.id < 1) return;
            if(e.online != 0) text += `${['😍', '😎', '😏', '🙂', '🙃', '😌', '🤤', '😇', '😳', '😂', '😝', '🙄', '😝', '😘', '😗', '😙', '😛', '🤑'].random()} || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
			})
        return message.reply(text)
    })
});

cmd.hear(/^(?:очистить чат)$/i, async (message, bot) => {
	message.user.foolder += 1;
				if(message.user.right < 2) return bot(`доступно с привилегии - Vip.`);
		return message.send("&#4448;\n".repeat(200) + "Чат очищен.");
});

/* |                              | */
/* | А тут уже идут - Чат команды | */
/* V                              V */

cmd.hear(/^(?:погода|weather)/i, async (message, bot) => {
	message.user.foolder += 1;
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
        else if(res.main.temp < 50) return 'очень жарко'
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


cmd.hear(/^(?:гиф|@nova_bot1 гиф)/i, async (message, bot) => {
	message.user.foolder += 1;
       vk.api.call('docs.search', {q: utils.pick(['ржака', 'игры', 'каваи', 'лайфхаки', 'тян', 'крафт', 'любовь', 'аниме', 'животные', '5 minute', 'пиздец', 'смешно', 'мем', 'классно', 'ня', 'пикча']) + '.gif', count: 1})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.hear(/^(?:гиф|@nova_bot1 гиф)\s([^]+)/i, async (message, bot) => {
	message.user.foolder += 1;
       vk.api.call('docs.search', {q: message.args[2] + '.gif', count: 1})
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            message.send({attachment: items})
        })
});

cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи: "${text.split('').reverse().join('')}"`)
});

cmd.hear(/^(?:когда|when)\s([^]+)$/i, async (message, bot) => {
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

cmd.hear(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const phrase = utils.pick(['шанс этого', 'данная информация достоверна на', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:анекдот|@nova_bot1 анекдот)$/i, async (message, bot) => {
	message.user.foolder += 1;
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let anek = await getAnek();
    return bot(`держи:\n\n ${filter(anek)}\n\n🤤 Понравилось? Напиши команду "Анекдот" ещё раз!`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});

cmd.hear(/^(?:Кот,)/i, async (msg, bot) => { 
	msg.user.foolder += 1;
	rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(msg.text))
	.then(res => {
		return msg.send(res.text)
	})
});

cmd.hear(/^(?:Время|time)/i, async (msg, bot) => { 
	message.user.foolder += 1;
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
	message.user.foolder += 1;
message.send(`мне кажется, что эта картинка идёт на: ` + utils.random(1, 10) + `/10`);
})

cmd.hear(/^(?:дата)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`неверный ID`);

	return bot(`ваша дата регистрации в ВКонтакте - ${user.tag}: ${user.regDate}`);
});


cmd.hear(/^(?:ре11ши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});

cmd.hear(/^(?:wiki|вики)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
    let args = message.text.match(/^(?:wiki|вики)\s?(.*)/i);
    function isEmpty( str ) { if (str.trim() == '') return true; return false; }
        rq("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent((args[1] ? args[1] : "ВКонтакте"))+"&meta=siteinfo&rvprop=content&format=json")
        .then((res) => {
            if(isEmpty(res[2][0])) {
                if(isEmpty(res[2][1])) {
                    if(isEmpty(res[2][2])) return message.reply('Статья не полная, либо отсутствует.\n\nСсылка: ' + res[3][0]);
                } else {
                    return message.reply(`Я нашел то, что Вы попросили найти! \n\nСсылка: ${res[3][1]}`);
                }
            } else {
                return message.reply(`Я нашел то, что Вы попросили найти!\n\nСсылка: ${res[3][0]}`);
            }
        });
});

/* |                               | */
/* | А тут уже идут - Чат Менеджер | */
/* V                               V */

cmd.hear(/^(?:!стата)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`
			🎉 ID беседы: ${message.chatId}
			🎉 Сообщений собрано: ${chats[message.chatId].flood}

			** - Здесь показана вся информация о беседе.`);
	}); 

cmd.hear(/^(?:!правило|!правила)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return bot(`Вот правило беседы:

		 ${chats[message.chatId].rules}`);
	}); 

cmd.hear(/^(?:!новыеправила)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 3) return;
let argses = message.text.split("!новыеправила ");
			chats[message.chatId].rules = argses[1];
			return message.send(`Новое правило установлено!`);
	});

cmd.hear(/^(?:!роль)$/i, async (message, bot) => {
	message.user.foolder += 1;
if(!message.isChat) return bot(`команда работает только в беседе!`);
		return message.send(`
Ваша роль в беседе — ${chats[message.chatId].users[message.user.id].group.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Helper").replace(/4/gi, "Создатель беседы")}`);
	}); 

cmd.hear(/^(?:!снять)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 3) return;
		let argses = message.text.split("!снять ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			if(chats[message.chatId].users[user.object_id].group >= 4) return message.send(`❌ Данный пользователь имеет привилегию выше!`)
			chats[message.chatId].users[user.object_id].group = 0;
			return message.send('@id' + user.object_id + ', вы теперь пользователь.');
	});

cmd.hear(/^(?:!moder|!модер|!модератор)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 3) return;
		let argses = message.text.split("!модер ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			if(chats[message.chatId].users[user.object_id].group >= 1) return message.send(`❌ Данный пользователь уже может рекламировать или даже имеет привилегию выше!`)
			chats[message.chatId].users[user.object_id].group = 1;
			return message.send('@id' + user.object_id + ', вы теперь Moder.');
	});

cmd.hear(/^(?:!admin|!админ|!администратор)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 3) return;
		let argses = message.text.split("!админ ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			if(chats[message.chatId].users[user.object_id].group >= 2) return message.send(`❌ Данный пользователь уже может рекламировать или даже имеет привилегию выше!`)
			chats[message.chatId].users[user.object_id].group = 2;
			return message.send('@id' + user.object_id + ', вы теперь Админ.');
	});

cmd.hear(/^(?:!хелпер|!helper)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 4) return;
		let argses = message.text.split("!хелпер ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			if(chats[message.chatId].users[user.object_id].group >= 3) return message.send(`❌ Данный пользователь уже может рекламировать или даже имеет привилегию выше!`)
			chats[message.chatId].users[user.object_id].group = 3;
			return message.send('@id' + user.object_id + ', вы теперь Хелпер.');
	});

cmd.hear(/^(?:!unban)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 4) return;
		let argses = message.text.split("!unban ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			if(!chats[message.chatId].users[user.object_id].isBanned && chats[message.chatId].users[user.object_id].permanently) return message.send('@id' + user.object_id + ' не забанен.')
			chats[message.chatId].users[user.object_id].isBanned = false;
		    chats[message.chatId].users[user.object_id].permanently = false;
		    chats[message.chatId].users[user.object_id].group = 0;
		    chats[message.chatId].users[user.object_id].reason = "";
		    vk.api.call("messages.addChatUser", {chat_id: chatid, user_id: user.object_id})
			return message.send('@id' + user.object_id + ' - разбанен.');
	});

cmd.hear(/^(?:!permban)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;	
	if(chats[message.chatId].users[message.user.id].group < 4) return;
		let argses = message.text.split("!permban ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(user.object_id == 262832408) return message.reply('пошол нах');
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
								if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`❌ Нельзя забанить этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 2) return message.send(`❌ Нельзя забанить этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 3) return message.send(`❌ Нельзя забанить этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 4) return message.send(`❌ Нельзя забанить этого игрока! ❌`);
			if(chats[message.chatId].users[user.object_id].isBanned && chats[message.chatId].users[user.object_id].permanently) return message.send('@id' + user.object_id + ' уже забанен.')
			chats[message.chatId].users[user.object_id].isBanned = true;
		    chats[message.chatId].users[user.object_id].permanently = true;
		    chats[message.chatId].users[user.object_id].group = 0;
		    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id});
			return message.send('@id' + user.object_id + ' - забанен навсегда.');
	});

cmd.hear(/^(?:!kick|!кик)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let chatid = message.chatId;
	if(chats[message.chatId].users[message.user.id].group < 2) return;
		let argses = message.text.split("!kick ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
								if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`❌ Нельзя кикнуть этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 2) return message.send(`❌ Нельзя кикнуть этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 3) return message.send(`❌ Нельзя кикнуть этого игрока! ❌`);
		if(chats[message.chatId].users[user.object_id].group == 4) return message.send(`❌ Нельзя кикнуть этого игрока! ❌`);
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			if(user.object_id == 262832408) return message.reply('пошол нах');
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id});
		});

cmd.hear(/^(?:!warn)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
		let chatid = message.chatId;
	if(chats[message.chatId].users[message.user.id].group < 1) return;
		let argses = message.text.split("!warn ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
					if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
		if(chats[message.chatId].users[user.object_id].group == 2) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
		if(chats[message.chatId].users[user.object_id].group == 3) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
		if(chats[message.chatId].users[user.object_id].group == 4) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
			if(user.object_id == 262832408) return message.reply('пошол нах');
			if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
			
			if(chats[message.chatId].users[user.object_id].isBanned == true) {
				return message.send('Пользователь и так уже заблокирован!');
			}
			if(chats[message.chatId].users[user.object_id].isBanned == false) {
									if(chats[message.chatId].users[user.object_id].warns >= 2) {
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id})
		message.send(`@id` + user.object_id + `, был кикнут из беседы за большое количество нарушений.`)
		chats[message.chatId].users[user.object_id].reason = "Ссылки на подозрительные ресурсы";
		chats[message.chatId].users[user.object_id].isBanned = true;
		chats[message.chatId].users[user.object_id].warns = 0;
	}
	if(chats[message.chatId].users[user.object_id].isBanned == false) {
				chats[message.chatId].users[user.object_id].warns += 1
			return message.send('@id' + user.object_id + ', Вы получили предупреждение ' + chats[message.chatId].users[user.object_id].warns + '/3. Впредь ведите себя адекватнее, иначе можете быть кикнуты из чата.');
}}});

cmd.hear(/^(?:!activate)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(chats[message.chatId].activate == true) return bot(`беседу уже кто-то активировал...`);
	if(!message.isChat) return;
return [chats[message.chatId].activate = true, 
chats[message.chatId].users[message.user].group = 4]
});

cmd.hear(/^(?:!erazessssss)$/i, async (message, bot) => {
	message.user.foolder += 1;
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
	if(!chats[message.chatId].users[message.user.id])
	{
		chats[message.chatId].users[message.user.id] = {
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
			user_ids: message.user.id,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			base[message.user] = {
				prefix: `${message.user.realname}`
			}
		})

	};
});

cmd.hear(/^(?:!title)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(chats[message.chatId].users[message.user.id].group < 3) return;
	if(!chats[message.chatId].activate) return;
	if(!message.isChat) return;
			let args = message.text.split("title ")
			let chatid = message.chatId;
			chats[message.chatId].title = args[1];
				if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов\n\n[😉] » Чтобы убрать блокировку, Вы можете приобрести донат С Vip'а на сайте FlowerTime.Fun || [nextgorun|админа]`);
			vk.api.call("messages.editChat", {chat_id: chatid, title: chats[message.chatId].title})
			return message.send(`[id` + message.user.id + `|${message.user.realname}] || Я успешно изменил название беседы!!!`)
		});

cmd.hear(/\.(com|ru|me|xyz|pro|ooo|community|steam|pw)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!chats[message.chatId].activate) return;
	if(!message.isChat) return;
		let chatid = message.chatId;
		if(chats[message.chatId].users[message.user.id].group == 1) return;
		if(chats[message.chatId].users[message.user.id].group == 2) return;
		if(chats[message.chatId].users[message.user.id].group == 3) return;
		if(chats[message.chatId].users[message.user.id].group == 4) return;
		if(chats[message.chatId].users[message.user.id].isBanned == true) {
				return message.send('...');
			}

			if(chats[message.chatId].users[message.user.id].isBanned == false) {
				chats[message.chatId].users[message.user.id].warns += 1
				return message.send(`[id${message.user.id}|${message.user.realname}], вы получили предупреждение за подозрительные ссылки!\n\nКоличество предупреждений: ` + chats[message.chat].users[message.user.id].warns + `/3. При достижении 3-х предупреждений вы будете кикнуты из беседы.`)
		if(chats[message.chatId].users[message.user.id].warns >= 2) {
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id})
		message.send('был кикнут из беседы за большое количество нарушений.')
		chats[message.chatId].users[message.user.id].reason = "Ссылки на подозрительные ресурсы";
		chats[message.chatId].users[message.user.id].isBanned = true;
		chats[message.chatId].users[message.user.id].warns = 0;
	}
			}
	});

cmd.hear(/youtube\.(com)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!chats[message.chatId].activate) return;
	if(!message.isChat) return;
		let chatid = message.chatId;
		if(chats[message.chatId].users[message.user.id].group == 1) return;
		if(chats[message.chatId].users[message.user.id].group == 2) return;
		if(chats[message.chatId].users[message.user.id].group == 3) return;
		if(chats[message.chatId].users[message.user.id].group == 4) return;
		if(chats[message.chatId].users[message.user.id].isBanned == true) {
				return message.send('...');
			}
			if(chats[message.chatId].users[message.user.id].isBanned == false) {
				chats[message.chatId].users[message.user.id].warns += 1
				return message.send(`[id${message.user.id}|${message.user.realname}], вы получили предупреждение за подозрительные ссылки!\n\nКоличество предупреждений: ` + chats[message.chat].users[message.user.id].warns + `/3. При достижении 3-х предупреждений вы будете кикнуты из беседы.`)
		if(chats[message.chatId].users[message.user.id].warns >= 2) {
		vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: message.user.id})
		message.send('был кикнут из беседы за большое количество нарушений.')
		chats[message.chatId].users[message.user.id].reason = "Ссылки на подозрительные ресурсы";
		chats[message.chatId].users[message.user.id].isBanned = true;
		chats[message.chatId].users[message.user.id].warns = 0;
}
			}
	});























/* |                                | */
/* | А тут уже идут - Админ команды | */
/* V                                V */

cmd.hear(/^(?:раздача)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.right < 5) return bot(`недостаточно прав.`);
	if(giving) return bot(`Error 404`);
	giving = true;
	user.api.wall.post({
		owner_id: -181729398,
		message: `
        🔥Сделай репост и получи 10.000.000$ на свой баланс! 

		📢 Предупреждение:
		⚠ Перед тем, как репостить, Вы должны написать любое сообщение в ЛС нашему сообществу. Так же необходимо, чтобы у Вас был открыт профиль.
		⏰ Раздача будет проходить ТОЛЬКО 12 часов.

		UPD: Деньги на баланс будут выданы по окончанию акции.`,
	}).then((response) => {
		user.api.wall.openComments({
				owner_id: -181729398,
				post_id: response.post_id
			});
		user.api.wall.createComment({
				owner_id: -181729398,
				post_id: response.post_id,
				from_group: 181729398,
				message: '😜 Приветствую вас! Здесь, Вы можете комментарировать эту запись.\n\nТакже, тут отвечают админы на ваши вопросы/пожелания/идеи, ну или просто можно с ними пообщаться.'
			});
		setTimeout(() => {
			user.api.call('wall.getReposts', { owner_id: -181729398, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.balance +=100000000; 
					vk.api.messages.send({ user_id: user.id, message: `Приветик!\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(100000000)}$, ваш баланс составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник [nova_bot1|Nova_Bot]` });
					vk.api.messages.send({ user_id: 366668990, message: `😜 [NovaStream2030|администратор], я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.sp(100000000)} на баланс.\n\nНа данный момент, его баланс составляет:\n${user.balance}$`})
				});
			});
			user.api.wall.openComments({
				owner_id: -181729398,
				post_id: response.post_id
			});
			user.api.wall.createComment({
				owner_id: -181729398,
				post_id: response.post_id,
				from_group: 181729398,
				message: 'Ah shit, here we go again.\n\nА ты подписан на бота?'
			});
			user.api.wall.createComment({
				owner_id: -181729398,
				post_id: response.post_id,
				from_group: 181729398,
				message: 'Все! Раздача закончена!'
			});
			user.api.wall.closeComments({
				owner_id: -181729398,
				post_id: response.post_id
			});
			giving = false;
		}, 43200000);
	});
});

cmd.hear(/^(?:!Стоп)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.senderId !== 366668990) return;
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
    await message.send(`Вы успешно отключили бота! \n\nЧтобы его включить, Вы должны зайти на свой сервер VDS, потом запустить START.BAT\n\nС уважением,\nВаш любимый кодер - [NovaStream2030|Гоша]`);

	await saveUsers();
	process.exit(-1);
});

cmd.hear(/^(?:за11пись)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
			if(message.user.right < 4) return bot(`доступно с привилегии - Разраб.`);
				let photos = ['photo-178736263_456239040',
	'photo-178736263_456239041',
	'photo-178736263_456239042',
	'photo-178736263_456239043',
	'photo-178736263_456239044',
	'photo-178736263_456239045',
	'photo-178736263_456239046',
	'photo-178736263_456239047',
	'photo-178736263_456239048',
	'photo-178736263_456239049',
	'photo-178736263_456239050',
	'photo-178736263_456239051',
	'photo-178736263_456239052']
	user.api.wall.post({
		owner_id: -178736263,
		message: `${message.args[1]}`,
		attachments: `${utils.pick(atts)}`
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -178736263,
			post_id: response.post_id
		});
	});
});

cmd.hear(/^(?:промокодд)$/i, async (message, bot) => {
	if(message.user.right < 4) return bot(`доступно с привилегии - Разраб.`);
	let answers = ['Опа! Новый промокод! Быстрее активируй его :3',
	'Быстрее активируй промо, а то его другие разберут!',
	'Держи промокод, пока его другие не разобрали',
	'Что насчёт нового прома?',
	'Гы, новый промокод',
	'Ставь лайк и бери промо!',
	'Салам алейкум, новый промокод ниже ↓↓↓']
	let rullka = ['За 20 лайков, сделаем раздачу денег',
	'Го за 30 лайков, я сделаю новое КРУТОЕ обновление?',
	'Набёрем 8 лайков, для следующего промо?']
				var result       = '';
		        var words        = 'QWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 8; ++i ) {
		                position = Math.floor ( Math.random() * max_position );
		                result = result + words.substring(position, position + 1);
		            }
		if(!promo[result]){
		            	promo[result] = {
		            		balance: 5000000,
		            		activ: 10,
		            		users: {}
		            	}
		}else{
		}
			user.api.wall.post({
		owner_id: -181159235,
		message: `☺ ${utils.pick(answers)}

		📝 Введите "промокод ${result}" в боте
		🗝 Активаций в этом промокоде - 10
		💰 Валюты в этом промокоде - 5.000.000$ 

		 📣 ${utils.pick(rullka)}`,
		attachments: ''
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -181159235,
			post_id: response.post_id
		});
		});
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.right < 5) return;
 			 users.filter(x=> x.id !== 1).map(zz => {
				  if (zz.notifications === true) sendmsg.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`,keyboard:JSON.stringify(
					{
						"one_time": true,
						"buttons": [
						[{
							"action": {
							"type": "text",
							"payload": "{\"button\": \"1\"}",
							"label": "Уведомления выкл"
					},
						"color": "positive"
					},
					{
							"action": {
							"type": "text",
							"payload": "{\"button\": \"2\"}",
							"label": "Помощь"
					},
						"color": "positive"
						},
						{
							"action": {
							"type": "text",
							"payload": "{\"button\": \"3\"}",
							"label": "Профиль"
					},
						"color": "positive"
					},
					]
					]
						})}); 
 });
	
        for(let id in users) {
			if(id.notifications === true)
            sendmsg.api.call('messages.send', {
             chat_id: id,
              message: `${message.args[1]}`, keyboard:JSON.stringify(
				{
					"one_time": true,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Уведомления выкл"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Помощь"
				},
					"color": "positive"
					},
					{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Профиль"
				},
					"color": "positive"
				},
				]
				]
					})});
		}
	
        return message.send(`💬 Я начал делать рассылку! Посмотрите, как будет видно другим:\n\n[nova_bot1|Nova_Bot], Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
})

cmd.hear(/^(?:пострассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
 			if(message.user.right < 4) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  sendmsg.api.messages.send({ user_id: zz.id, message: `👮 Чекай пост!`, attachment: `${message.args[1]}`, keyboard:JSON.stringify(
	{
		"one_time": true,
		"buttons": [
		[{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"1\"}",
			"label": "Уведомления выкл"
	},
		"color": "positive"
	},
	{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"2\"}",
			"label": "Помощь"
	},
		"color": "positive"
		},
		{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"3\"}",
			"label": "Профиль"
	},
		"color": "positive"
	},
	]
	]
		})}); 
 }); 
 			let people = 0;
        for(let id in users) {
            sendmsg.api.call('messages.send', {
             chat_id: id,
              message: `👮 Чекай пост!`,
              attachment: `${message.args[1]}`, keyboard:JSON.stringify(
				{
					"one_time": true,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Уведомления выкл"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Помощь"
				},
					"color": "positive"
					},
					{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Профиль"
				},
					"color": "positive"
				},
				]
				]
					}) });
        }
        return message.send(`💬 Я начал делать рассылку!`);
 
})

cmd.hear(/^(?:Смс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => { 
	message.user.foolder += 1;
		if(message.user.numberss == false) return bot(`доступно при номере телефона!.\nЧтобы приобрести номер, напишите: Купить номер`);

const user = await users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`такого игрока не существует. Вероятно, вы ошиблись.`); 

vk.api.messages.send({ user_id: user.id, message: `Вам пришло сообщение!` }); 

vk.api.messages.send({ user_id: user.id, message: `Сообщение открывается...` }); 

vk.api.messages.send({ user_id: user.id, message: `
📞 &#4448;Administrator&#4448; 📞

[SIM1] ${new Date().getHours()}:${new Date().getMinutes()}
❜${message.args[2]}❜` }); 

message.user.balance -= 20;
	return message.send(`Сообщение успешно отправлено! С вас списано - 20$`);
});

cmd.hear(/^(?:ban)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 4) return bot(`доступно с привилегии - Разработчик.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		user.ban = true;
 user.balance = 0;
  user.exp = 0;
  user.level = 0;
  user.energy = 10;
  user.rating = 0;
  user.bank = 0;
  user.btc = 0;
  user.farm_btc = 0;
  user.biz = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `
?? [id${user.id}|${user.tag}], к сожалению, Вы забанены за нарушение правил.
💣 Вас забанил: ADMINISTRATOR 
⚠ Вы забанены с ${new Date().getHours()}:${new Date().getMinutes()} - навсегда.

🍀 Вы можете купить разбан в группе или у администратора.
` }); 

	return bot(`Вы смогли забанить пользователя (${user.tag}) - навечно.`);
}
	});


cmd.hear(/^(?:unban)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right < 4) return bot(`доступно с привилегии - Разработчик.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		user.ban = false;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `
😜 [id${user.id}|${user.tag}], Вы разбанены. Больше не нарушайте!
❤ Вас разабанил: ADMINISTRATOR ` }); 

	return bot(`Успешно! Вы разбанили пользователя — (${user.tag})`);
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
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

	var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));


		setInterval(() => {
			fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"));
			fs.writeFileSync("./base/clans.json", JSON.stringify(clans, null, "\t"));
			fs.writeFileSync("./base/botinfo.json", JSON.stringify(botinfo, null, "\t"));
		}, 15000);



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
		setTimeout(() => {
	let answers = ['Опа! Новый промокод! Быстрее активируй его :3',
	'Быстрее активируй промо, а то его другие разберут!',
	'Держи промокод, пока его другие не разобрали',
	'Что насчёт нового прома?',
	'Гы, новый промокод',
	'Ставь лайк и бери промо!',
	'Салам алейкум, новый промокод ниже ↓↓↓']
	let rullka = ['За 20 лайков, сделаем раздачу денег',
	'Го за 30 лайков, я сделаю новое КРУТОЕ обновление?',
	'Набёрем 8 лайков, для следующего промо?']
				var result       = '';
		        var words        = 'QWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 8; ++i ) {
		                position = Math.floor ( Math.random() * max_position );
		                result = result + words.substring(position, position + 1);
		            }
		if(!promo[result]){
		            	promo[result] = {
		            		balance: 5000000,
		            		activ: 75,
		            		users: {}
		            	}
		}else{
		}
			user.api.wall.post({
		owner_id: -178736263,
		message: `☺ | ${utils.pick(answers)}

		📝 Введите "промокод ${result}" в боте
		🗝Активаций в этом промокоде - 75
		💰 Валюты в этом промокоде - 5000000$ 

		[🤴] || ${utils.pick(rullka)}`,
		attachments: ''
	}).then((response) => {
		user.api.wall.closeComments({
			owner_id: -181159235,
			post_id: response.post_id
		});
		});
	}, 86400000);

setInterval(() => {
	let fs = require("fs");
	fs.writeFileSync("./base.json", JSON.stringify(base, null, "\t"));
	fs.writeFileSync("./settings.json", JSON.stringify(settings, null, "\t"));
	fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t"));
}, 1000)


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







////////!!!! обнов





cmd.hear(/^(?:adm.rules)/i, async (message, bot) => {
	message.user.foolder += 1;
message.send(`
🚧 Актуальный список правил для администрации!
🚨 За каждое нарушение выдаётся 1 предупреждение. После 3-х предупреждений снимается привелегия без права возврата денег.

1. Запрещено писать любые админ-команды в беседах, можно одну две.
2. Запрещено выдавать приватную информацию бота.
3. Запрещено накручивать большое кол-во денег (больше лимита в 10кк/час)
4. Запрещено часто писать "бонус".
5. Запрещено повышать себе и другим рейтинг!
6. Обязательное толерантное поведение.
7. Обязанность отвечать на вопросы игроков, а если ответа не знаете, направлять [NovaStream2030|администратору].
8. Не создавать часто промокоды.
9. Запрещено выманивание денег с игроков.
10. Запрещены манипуляции над игроками.
11. Запрещено размещать заведомо ложную информацию о проекте.
12. Запрещена моментальная верификация/индефикация аккаунта.
13. Запрещена реклама, не проверенная кодером.
14. Запрещено размещать свои реквизиты для любых целей.
15. Запрещена перепродажа игровых скриптов.
16. Запрещена передача аккаунта с привелегией.
17. Любые попытки скрыть свои ошибки караются, все ваши команды видны в консоли.
`);
})

cmd.hear(/^(?:бсоздать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 4) return bot(`доступно с привилегии «Разработчик»`);
		if(!message.args[1]) return message.reply(`📚 Пример: «БCоздать (количество активаций) (кол-во)»`);
		if(!message.args[2]) return message.reply(`   Пример: «БCоздать (количество активаций) (кол-во)»`);
		 
		let balances = parserInt(message.args[2]); 
		let activ = Number(message.args[1]);

		var result       = '';
		        var words        = 'QWERTYUIOPASDFGHJKLZXCVBNM';
		        var max_position = words.length - 1;
		            for( i = 0; i < 4; ++i ) {
		                position = Math.floor ( Math.random() * max_position );
		                result = result + words.substring(position, position + 1);
		            }
		if(!promo[result]){
		            	promo[result] = {
		            		balances: Number(balances),
		            		activ: activ,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			📝 Промокод - ${result}
			🗝 Активаций в этом промокоде - ${activ}
			💰 Биткоинов этом промокоде - ${spaces(balances)}B
			`);

});
	
	
cmd.hear(/^(?:бпромокод)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

	if(!message.args[1]) return message.reply(`⚠ Перепровеьте сообщение!`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.reply(`⏯ У этого промокода закончились активации! Включи уведомления в группе чтобы первым их активировать!`, {attachment: promos});
	
	if(!promo[message.args[1]].users[message.senderId]){

		if(promo[promos].balances){ 
			let activ = promo[promos].activ - 1;
			if(!promo[promos].users[message.senderId]){
				promo[promos].users[message.senderId] = {
					activ: true
				}
			}
			message.user.btc += Number(promo[promos].balances);
			let coii = Number(promo[promos].balances);
			promo[promos].activ -= 1;
			if(promo[promos].activ == 0){
				delete promo[promos];
			}
			return message.reply(`🤑 Ты активировал(а) промокод.\n✨ В промокоде, Вы нашли: ${spaces(coii)}B\n\n📴 Подсказка: нельзя активировать промокод больше одного раза.`, {attachment: promos});
		}
	}else{
		return message.reply(`😪 Простите, но промокод нельзя активировать дважды.`, {attachment: promos});
	}
})


function clearTemp()
{
 user.energy = 10;
}

////////&/////////



function clearTemp()
{
 user.vir_ex= 10;
}

////////&/////////
setInterval (() => {
 users.filter(x=> x.virts !== 0).map(x=> {
  {
   x.virts += 10;
  }
 });
}, 3600000);
////////////////////=|=|=|=|=|=|=|=|=||=|=|=|=|=|=|=|=|=|=||=//////

cmd.hear(/^(?:энергия)$/i, async (message, bot) => {
	message.user.foolder +=1;
return bot(`энергия: ${message.user.energy}⚡
Энергия восполняется за раз.`);
})

cmd.hear(/^(?:setmoney)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.right == 1) return bot(`команда доступна только для донатеров! Приобрести донат можно в товарах группы.`);
	if(message.user.right == 2) 
		{
		message.user.balance += 2500000;
		return bot(`вы начислили себе 2.500.000$`);
		}
	if(message.user.right == 3)
	{
		message.user.balance += 8000000;
		return bot(`вы начислили себе 8.000.000$`);
	}
	if(message.user.right == 4)
	{
		message.user.balance += 80000000;
		return bot(`вы начислили себе 80.000.000$`);
	}
	if(message.user.right == 5)
	{
		message.user.balance += 100000000;
		return bot(`вы начислили себе 100.000.000$`);
	}
	if(message.user.right == 6)
	{
		message.user.balance += 3;
		return bot(`вы миллиардер! Вы начислили себе целых 3$!`);
	}
setTimeout(() => {
	message.user.mtime = false;
	},
	3600000);
		
});







cmd.hear(/^(?:шахта 1)$/i, async (message, bot) => {
	message.user.foolder += 1;
	
if(message.user.right <= 1) {
	if(message.user.timers.mine1) return bot(`прости, но ты уже работал(а) на шахте!
Шахта будет доступна в течении 5 часов.`);

	setTimeout(() => {
		message.user.timers.mine1 = false;
	}, 18000000);

	message.user.timers.mine1 = true;
}
	const coals = utils.random(100);
	const irons = utils.random(70);
	const golds = utils.random(40);
	const emeralds = utils.random(20);
	const diamondss = utils.random(5);

	message.user.coal += coals;
	message.user.iron += irons;
	message.user.gold += golds;
	message.user.diamonds += diamondss;
	message.user.emeralds += emeralds;

	return bot(`в шахте 1 уровня, вы нашли:
💡 Угля: ${utils.sp(coals)}
💡 Железа: ${utils.sp(irons)}
💡 Золото: ${utils.sp(golds)}
💡 Алмазов: ${utils.sp(diamondss)}
💡 Изумрудов: ${utils.sp(emeralds)}

🍷 Осталось ждать: 5 ч.
💡 Совет: При продаже руды обязательно продавайте по отдельности.
		`);
});

cmd.hear(/^(?:шахта 2)$/i, async (message, bot) => {
	message.user.foolder += 1;
	
if(message.user.right <= 1) {
	if(message.user.timers.mine2) return bot(`прости, но ты уже работал(а) на шахте!
Шахта будет доступна в течении 1 дня.`);

	setTimeout(() => {
		message.user.timers.mine2 = false;
	}, 86400000);

	message.user.timers.mine2 = true;
}
	const coals = utils.random(400);
	const irons = utils.random(360);
	const golds = utils.random(270);
	const emeralds = utils.random(100);
	const diamondss = utils.random(50);

	message.user.coal += coals;
	message.user.iron += irons;
	message.user.gold += golds;
	message.user.diamonds += diamondss;
	message.user.emeralds += emeralds;

	return bot(`в шахте 2 уровня, вы нашли:
💡 Угля: ${utils.sp(coals)}
💡 Железа: ${utils.sp(irons)}
💡 Золото: ${utils.sp(golds)}
💡 Алмазов: ${utils.sp(diamondss)}
💡 Изумрудов: ${utils.sp(emeralds)}

🍷 Осталось ждать: 1 д.
💡 Совет: При продаже руды обязательно продавайте по отдельности.
		`);
});

cmd.hear(/^(?:шахта 3)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(message.user.right <= 1) {
	if(message.user.timers.mine3) return bot(`прости, но ты уже работал(а) на шахте!
Шахта будет доступна в течении недели.`);

	setTimeout(() => {
		message.user.timers.mine3 = false;
	}, 604800000);

	message.user.timers.mine3 = true;
}
	const coals = utils.random(1000);
	const irons = utils.random(970);
	const golds = utils.random(802);
	const emeralds = utils.random(600);
	const diamondss = utils.random(570);

	message.user.coal += coals;
	message.user.iron += irons;
	message.user.gold += golds;
	message.user.diamonds += diamondss;
	message.user.emeralds += emeralds;
	
	

	return bot(`в шахте 3 уровня, вы нашли:
💡 Угля: ${utils.sp(coals)}
💡 Железа: ${utils.sp(irons)}
💡 Золото: ${utils.sp(golds)}
💡 Алмазов: ${utils.sp(diamondss)}
💡 Изумрудов: ${utils.sp(emeralds)}

🍷 Осталось ждать: 7 дн.
💡 Совет: При продаже руды обязательно продавайте по отдельности.
		`);
}); 


cmd.hear(/^(?:копать индий)$/i, async (message, bot) => {
	message.user.foolder +=1;
	if(message.user.energy <= 0) return bot(`энергия закончилась!`);
	if(message.user.energy >= 1) 
	
		{
		message.user.energy -= 1;
		message.user.exp += 1;
		
		const inds1 = utils.random(20,40);
		message.user.inds += inds1;
		}
setTimeout(() => {
	message.user.energy = 10;
}, 300000);
return bot(`⛏ Вы накопали индия.
🔋Индия: ${message.user.inds}
⚡Энергия: ${message.user.energy} || 📈 Опыт: ${message.user.exp}
`)
});


cmd.hear(/^(?:копать скадий)$/i, async (message, bot) => {
	message.user.foolder +=1;
	if(message.user.energy <= 0) return bot(`энергия закончилась!`);
	if(message.user.level < 6) return bot(`копать скадий можно с 6 уровня!`);
	if(message.user.energy >= 1) 
	
		{
		message.user.energy -= 2;
		message.user.exp += 1;
		
		const skan1 = utils.random(10,15);
		message.user.skan += skan1;
		}
setTimeout(() => {
	message.user.energy = 10;
}, 300000);
return bot(`⛏ Вы накопали скандия.
🔋Скандия: ${message.user.skan}
⚡Энергия: ${message.user.energy} || 📈 Опыт: ${message.user.exp}
`)
});


cmd.hear(/^(?:копать тергоний)$/i, async (message, bot) => {
	message.user.foolder +=1;
	if(message.user.energy <= 0) return bot(`энергия закончилась!`);
	if(message.user.level < 80) return bot(`копать тергоний можно с 80 уровня!`);
	if(message.user.energy >= 1) 
	
		{
		message.user.energy -= 3;
		message.user.exp += 2;
		
		const trgn1 = utils.random(1,5);
		message.user.trgn += trgn1;
		}
		
setTimeout(() => {
message.user.energy = 10;
}, 300000);
return bot(`⛏ Вы накопали тергония.
🔋Тергония: ${message.user.trgn}
⚡Энергия: ${message.user.energy} || 📈 Опыт: ${message.user.exp}
`)
});


cmd.hear(/^(?:копать)$/i, async (message, bot) => {
	message.user.foolder +=1;
	return bot(`выберите что хотите копать:
📌 Индий — с 1 ур.
   Скадий — с 6 ур.
📌 Тергоний — с 80 ур.

🗒 Используйте «копать {минерал}»
`)
});
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
cmd.hear(/^(?:индий|индия)$/i, async (message, bot) => {
	message.user.foolder +=1;
	return bot(`у вас ${message.user.inds} индия.`);
	});


cmd.hear(/^(?:скадий|скадия)$/i, async (message, bot) => {
	message.user.foolder +=1;
	return bot(`у вас ${message.user.skan} скадия.`);
	});


cmd.hear(/^(?:тергоний|тергония)$/i, async (message, bot) => {
	message.user.foolder +=1;
	return bot(`у вас ${message.user.trgn} тергония.`);
	});
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//




//\\//\\//\\//\\//\\{}
cmd.hear(/^(?:бпередать|бпередай|бперидать|бпиредать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
 
		let amount = parserInt(message.args[2]); 
		if(message.user.right <= 1) {
		if(message.args[2] >= 100000000) return message.reply(`📣 Слишком большое количество!`);
        
	if(message.user.timers.translation1) return bot(`вы сможете передать игроку в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.translation1 = false;
	}, 600000);

	message.user.timers.translation1 = true;
}
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.btc) return bot(`недостаточно Биткоинов!
📣 Бит-кошелек: ${utils.sp(message.user.btc)}$`);
	else if(message.args[2] <= message.user.btc)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);

		message.user.btc -= message.args[2];
		user.btc += message.args[2];

		await bot(`вы передали игроку ${user.tag} ${utils.sp(message.args[2])}B`);
		if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}B!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
	}
});

cmd.hear(/^(?:ресурсы)$/i, async (message, bot) => {
	message.user.foolder +=1;
return bot(`ваши ресурсы:
📄 Индия: ${message.user.inds}
📄 Скадия: ${message.user.skan}
📄 Тергония: ${message.user.trgn}

📄 Угля: ${message.user.coal}
📄 Железа: ${message.user.iron}
📄 Золота: ${message.user.gold}
📄 Алмазы: ${message.user.diamonds}
📄 Изумруды: ${message.user.emeralds}
`)
});




cmd.hear(/^(?:delmoney)$/i, async (message, bot) => {
	message.user.foolder +=1;
    if(message.user.right == 1) {
       return bot(`команда доступна только для донатеров! Приобрести донат можно в товарах группы.`);
}
    if(message.user.right > 2) {
       message.user.balance = 0;
return bot (`вы очистили свой баланс`);
}
});

cmd.hear(/^(?:выдатьen)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.right < 4) return bot(`доступно с привилегии «Разработчик»`); 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.energy += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} энергии`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} энергии! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});

cmd.hear(/^(?:выдатьexp)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.right < 3) return bot(`доступно с привилегии «Администратор»`); 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.exp += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} опыта`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} опыта! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});


cmd.hear(/^(?:выдатьen)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.right < 4) return bot(`доступно с привилегии «Разработчик»`); 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.energy += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} энергии`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} энергии! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});


cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.right < 3) return bot(`доступно с привилегии «Администратор»`); 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

if(message.args[2] >= 100000000) return message.reply(`📣 Слишком большая сумма!`);

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.balance += message.args[2]; 


await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} денег`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам ${utils.sp(message.args[2])} $! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});


cmd.hear(/^(?:выдатьvip)\s([0-9]+)$/i, async (message, bot) => { 

if(message.user.right < 4) return bot(`доступно с привилегии «Разработчик»`); 

let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.right = 2; 


await bot(`вы выдали игроку ${user.tag} Вип`); 

});

cmd.hear(/^(?:выдатьдонат)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 

if(message.user.right < 5) return bot(`доступно с привилегии «Создатель»`); 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.right = message.args[2]; 


await bot(`вы выдали игроку ${user.tag} Привилегию ${utils.sp(message.args[2])}`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ] 
Администратор выдал вам Привилегию! 
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` }); 
} 
});

cmd.hear(/^(?:adm.cmd)$/i, async (message, bot) => {
	message.user.foolder +=1;
{
	if(message.user.right == 1) return message.send(`это команда не для тебя.`);
}
{
if(message.user.right == 2) return message.send(`Ваша привилегия Вип

Доступные команды:

setmoney - ограниченая выдача денег.

delmoney - очистит твой баланс.

Хочешь больше? Купи другую привилегию
`);
}
{
if(message.user.right == 3) return message.send(`Ваша привилегия Администратор

Доступные команды:

setmoney - ограниченая выдача денег.

delmoney - очистит твой баланс.

Выдатьexp [id] [количество опыта] - выдача опыта.

Выдать [id] [количество денег] - выдача денег.

Хочешь больше? Купи другую привилегию`);
}
{
if(message.user.right == 4) return message.send(`Ваша привилегия Разработчик

Доступные команды:

setmoney - ограниченая выдача денег.

delmoney - очистит твой баланс.

Выдатьexp [id] [количество опыта] - выдача опыта.

Выдать [id] [количество денег] - выдача денег.

Выдатьvip [id] - выдает игроку вип.

eval [команда] - Команда консоль.

Хочешь больше? Купи другую привилегию`);
}
{
if(message.user.right == 5) return message.send(`Ваша привилегия Создатель

А ты точно его создал?

Доступные команды:

setmoney - ограниченая выдача денег.

delmoney - очистит твой баланс.

Выдатьexp [id] [количество опыта] - выдача опыта.

Выдать [id] [количество денег] - выдача денег.

Выдатьvip [id] - выдает игроку вип.

eval [команда] - Команда консоль.

Выдатьдонат [id] [донат от 1 до 6] - выдает донат
1 = Пользователь
2 = Вип
3 = Админ
4 = Разработчик
5 = Создатель
6 = Элита

Хочешь больше? А нет. Я заеб@лся это писать.
`);
}
{
if(message.user.right == 6) return message.send(`Ваша привилегия Элита

Сын депутата?

Доступные команды:

setmoney - ограниченая выдача денег.

delmoney - очистит твой баланс.

Выдатьexp [id] [количество опыта] - выдача опыта.

Выдать [id] [количество денег] - выдача денег.

Выдатьvip [id] - выдает игроку вип.

eval [команда] - Команда консоль.

Выдатьдонат [id] [донат от 1 до 6] - выдает донат
1 = Пользователь
2 = Вип
3 = Админ
4 = Разработчик
5 = Создатель
6 = Элита

Хочешь больше? А нет. Я заеб@лся это писать.`);
}
});

cmd.hear(/^(?:clear)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(message.user.right < 6) return bot(`доступно с привилегии «Элита»`); 
{
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


 user.balance = 0;
  user.exp = 0;
  user.level = 0;
  user.energy = 10;
  user.rating = 0;
  user.bank = 0;
  user.btc = 0;
  user.farm_btc = 0;
  user.biz = 0;

}
});

cmd.hear(/^(?:warn)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(message.user.right < 5) return bot(`доступно с привилегии «Создатель»`); 
{
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.jalobs += 1;
await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} Предупреждение`);  

}
});

cmd.hear(/^(?:unwarn)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;

if(message.user.right < 5) return bot(`доступно с привилегии «Создатель»`); 
{
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
if(user.jalobs == 0) return bot(`У пользователя ноль жалоб, ниже нуля невозможно`)
user.jalobs -= 1;
await bot(`вы выдали игроку ${user.tag} ${utils.sp(message.args[2])} Предупреждение`);  

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

🚩Для покупки введите "Питомцы [номер]"`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(!message.user.misc.pet) {message.user.misc.pet = 0; message.user.pet.level = 0; message.user.pet.poterl = false;};
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
	if(!message.user.misc.pet) {message.user.misc.pet = 0; message.user.pet.level = 0; message.user.pet.poterl = false;};
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {
return bot(`информация:
🐌 Питомец: «${pets[message.user.misc.pet - 1].name}»
💳 Стоимость улучшения: ${utils.sp(petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl)}$
🌟 Уровень: ${message.user.pet.lvl}`);
}

});

cmd.hear(/^(?:питомец улучшить)$/i, async (message, bot) => {
	if(!message.user.misc.pet) {message.user.misc.pet = 0; message.user.pet.level = 0; message.user.pet.poterl = false;};
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.balance < petsupd[message.user.misc.pet - 1].cost) return bot(`недостаточно денег. ${smileerror}`);

		var priceupd = petsupd[message.user.misc.pet - 1].cost*message.user.pet.lvl;

		var lvlpoupd = message.user.pet.lvl+1;

		message.user.balance -= priceupd;
		message.user.pet.lvl += 1;

		return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(priceupd)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);


}

});

cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => {
	if(!message.user.misc.pet) {message.user.misc.pet = 0; message.user.pet.level = 0; message.user.pet.poterl = false;};
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.timers.poxod) return bot(`вы сможете отправить питомца в поход через 60 минут. Ваш питомец довольно сильно устал! ${smileerror}`);

		let cashfind = utils.random(10000000,100000000);
		message.user.balance += cashfind;
		message.user.timers.poxod = true;

			setTimeout(() => {
				message.user.timers.poxod = false;
			}, 3600000);

		return bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`);
}

});

/*
realname: user_info.first_name,
			realfam: user_info.last_name,
			id: message.senderId,
			uid: users.length,
			balance: 5000,
			inds: 0,
			skan: 0,
			trgn: 0,
			diamonds: 0,
			emeralds: 0,
			coal: 0,
			iron: 0,
			gold: 0,
			bank: 0,
			btc: 0,
			virts: 0,
			energy: 10,
			dinars: 0,
			farm_btc: 0,
			biz: 0,
			rating: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				translation: false,
				hasWorked: false,
				commands: false,
				clanwar: false,
				delacc: false,
				bonus: false,
				obva: false,
				krik: false,
				mine: false,
			},
			tag: user_info.first_name,
			clanid: false,
			keyboard: true,
			numberss: false,
			work: 0,
			business: 0,
			pp: 0,
			notifications: true,
			ccard: false,
			card: 0,
			seccard: 0,
			cardss: 0,
			exp: 1,
			level: 1,
			bizlvl: 0,
			right: 1,
			foolder: 0,
			floder: 0,
			operator: 0,
			number: 0,
			call: 0,
			language: 1,
			healths: 100,
			hunger: 100,
			reals: 0,
			jalobs: 0,
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
				pet: 0
			},
			pet: {
				lvl: 0,
				poterl: false
			},
			marriage: {
				partner: 0,
				requests: []
			}
*/

cmd.hear(/^(?:hardwipe)$/i, async (message, bot) => {
	if (users[0].wipe === true){
	users.map(x => {
			x.balance = 5000;
			x.dollars = 0;
			x.euro = 0;
			x.manat = 0;
			x.diamonds = 0;
			x.emeralds = 0;
			x.coal = 0;
			x.iron = 0;
			x.gold = 0;
			x.bank = 0;
			x.btc = 0;
			x.farm_btc = 0;
			x.biz = 0;
			x.rating = 0;
			x.mention = true;
			x.ban = false;
			x.tag = user_info.first_name;
			x.clanid = false;
			x.keyboard = true;
			x.numberss = false;
			x.work = 0;
			x.business = 0;
			x.pp = 0;
			x.notifications = true;
			x.ccard = false;
			x.card = 0;
			x.seccard = 0;
			x.cardss = 0;
			x.exp = 1;
			x.level = 1;
			x.foolder = 0;
			x.floder = 0;
			x.operator = 0;
			x.number = 0;
			x.language = 1;
			x.healths = 100;
			x.hunger = 100;
			x.referal = null;
			x.transport.car = 0;
			x.transport.yacht = 0;
			x.transport.airplane = 0;
			x.transport.helicopter = 0;
			x.realty.home = 0;
			x.realty.apartment = 0;
			x.misc.phone = 0;
			x.misc.farm = 0;
			x.marriage.partner = 0;
	});
	users[0].wipe = false;
	return message.send(`Я сделал вайп`);
} else {
	return message.send(`Нельзя вам делать Вайп`);
}
});

app.get('/', function(req, res){
  intel.info('donate: ' + req.query.us_sell);
  intel.info('id: ' + req.query.us_id);
  console.log('donate: ' + req.query.us_sell);
  console.log('id: ' + req.query.us_id);
  var donat_userid = req.query.us_id;
  var donat_donatid = Number(req.query.us_sell);
	if(donat_donatid == 1) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.balance += 1000000000;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили 1.000.000.000$` }); 

	}
	if(donat_donatid == 2) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.balance += 3000000000;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили 3.000.000.000$` }); 
	}
	if(donat_donatid == 3) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.balance += 5000000000;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили 5.000.000.000$` }); 
	
	}
	if(donat_donatid == 4) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.balance += 10000000000;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили 10.000.000.000$` }); 	
	}

	if(donat_donatid == 5) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.right = 2;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили привилегию ВИП` }); 
	}
	if(donat_donatid == 6) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.right = 3;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили привилегию АДМИНИСТРАТОР` });
	}
	if(donat_donatid == 7) {
		let user = users.find(x=> x.uid === Number(donat_userid));
		user.right = 4;
		donat_donatid = 0;
		vk.api.messages.send({ 
			user_id: user.id, 
			attachment: '',
			message: `Вы купили привилегию РАЗРАБОТЧИК` }); 
	
	}

});

app.listen(3000);

