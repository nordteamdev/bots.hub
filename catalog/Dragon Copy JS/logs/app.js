console.log('')
console.log('-------------------------------')
console.log('script ')
console.log('-------------------------------')
console.log('')

const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK(); 
user.setOptions({ 
token: '6a8071ede451bc0c5c9454fb560263a095a63895666f32ac7d88118cbbf18d4a9b5173cc2e6b142e8b692' 
}); 

const https = require('https'); 
const requests = require('request'); 
const fs = require("fs"); 
const rq = require("prequest");
let giving = false;

const logfile_now = 'logs_' + data() + time() + '.txt';
('logs/' + logfile_now, 'w');

const quests = [

{name: 'Выиграйте в трейде 3 раза подряд',reward: 350000000,actions: 3},
{name: 'Угадайте стаканчик 3 раза подряд',reward: 700000000,actions: 3},
{name: 'Угадайте кубик 2 раза подряд',reward: 2000000000,actions: 2},
{name: 'Выиграйте в казино 4 раза подряд',reward: 10000000000,actions: 4}

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
{name: 'Lamborgini Huracan',cost: 10000,id: 16},
{name: 'Bugatti Chiron',cost: 10000,id: 17},
{name: 'Privet guys',cost: 10000,id: 18},
{name: 'Машина времени',cost: 12500,id: 19},
{name: 'Tesla Cybertruck',cost: 1000000000,id: 20}

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

const zelya = [ 

{name: 'Зелье удачи', cost: 1000000000000, id: 1 }, 
{name: 'Зелье шахтера', cost: 100000000000, id: 2 }, 
{name: 'Зелье неудачи', cost: 50000000000, id: 3 }, 
{ name: 'Молоко против зелья', cost: 1000000000, id: 4 }
 
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
{name: 'Собственная планета',cost: 500000000000,id: 16}

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
{name: 'Мегафон С1',cost: 250000,id: 10}

];

const pets = [

{name: 'Улитка',cost: 1000,min: 250,max: 1500,id: 1,icon: '🐌'},
{name: 'Лягушка',cost: 25000,min: 5000,max: 15000,id: 2,icon: '🐸'},
{name: 'Заяц',cost: 500000,min: 50000,max: 150000,id: 3,icon: '🐰'},
{name: 'Свинья',cost: 300000000,min: 15000000,max: 30000000,id: 4,icon: '🐷'},
{name: 'Лиса',cost: 1250000000,min: 50000000,max: 90000000,id: 5,icon: '🦊'},
{name: 'Собака',cost: 5000000000,min: 100000000,max: 250000000,id: 6,icon: '🐶'},
{name: 'Панда',cost: 30000000000,min: 5000000000,max: 7000000000,id: 7,icon: '🐼'},
{name: 'Волк',cost: 180000000000,min: 15000000000,max: 32541252145,id: 8,icon: '🐺'}	,
{name: 'Летучая мышь',cost: 1400000000000,min: 150000000000,max: 332541252145,id: 9,icon: '🦇'},
{name: 'Африканский крокодил',cost: 1400000000000,min: 150000000000,max: 332541252145,id: 10,icon: '🐊'},
{name: 'Коронавирус',cost: 1400000000000,min: 150000000000,max: 332541252145,id: 11,icon: '🦠'},
{name: 'Ходячий ананас',cost: 14000000000000,min: 320000000000,max: 922541252145,id: 12,icon: '🍍'}

];


const petsupd = [

{cost: 2000, id: 1},
{cost: 50000, id: 2},
{cost: 1000000, id: 3},
{cost: 600000000, id: 4},
{cost: 2500000000, id: 5},
{cost: 10000000000, id: 6},
{cost: 60000000000, id: 7},
{cost: 360000000000, id: 8},
{cost: 2800000000000, id: 9},
{cost: 2800000000000, id: 10},
{cost: 2800000000000, id: 11},
{cost: 28000000000000, id: 12}

];

const farms = [

{name: '6U Nvidia', cost: 20500000, id: 1},
{name: 'AntminerS9', cost: 100000000, id: 2},
{name: 'FM2018-BT200', cost: 900000000, id: 3}

];

const businesses2 = [

{name: 'Космические перевозки антиматерии', cost: 1500, earn: 80, id: 1, icon: '🚀'}

];

const businesses = [

{name: 'Шаурмичная', cost: 50000, earn: 4000, id: 1, icon: '🌯'},
{name: 'Ларёк', cost: 100000, earn: 15000, id: 2, icon: '🍬'},
{name: 'Ресторан', cost: 3000000, earn: 250000, id: 3, icon: '🍵'},
{name: 'Супермаркет', cost: 50000000, earn: 3800000,	 id: 4, icon: '🛒'},
{name: 'Завод', cost: 150000000, earn: 4000000, id: 5, icon: '🏭'},
{name: 'Шахта', cost: 250000000, earn: 7000000, id: 6, icon: '💎'},
{name: 'Офис ВКонтакте', cost: 800000000, earn: 22000000, id: 7, icon: '🏢'},
{name: 'Разработка игр', cost: 1500000000, earn: 30000000, id: 8, icon: '🕹'},
{name: 'Порт', cost: 5000000000, earn: 700000000, id: 9, icon: '⚓'},
{name: 'Атомная электростанция', cost: 10000000000, earn: 800000000, id: 10, icon: '🛢'},
{name: 'Киностудия', cost: 80000000000, earn: 1200000000, id: 11, icon: '📽'},
{name: 'Межпланетный Экспресс', cost: 250000000000000, earn: 150000000000, id: 12, icon: '🗺'}

];

const manic = [

{name: 'Monfury B8', cost: 400000000, earn: 416000, id: 1, icon: '🖨'},
{name: 'Avalon E9', cost: 1100000000, earn: 15830000, id: 2,	icon: '🖨'},
{name: 'Dragon Z5', cost: 3700000000, earn: 41690000, id: 3, icon: '🖨'},
{name: 'Estelon 4', cost: 10300000000, earn: 125000000, id: 4, icon: '🖨'},
{name: 'XSUT X5', cost: 22900000000, earn: 300000000, id: 5, icon: '🖨'},
{name: 'MoneyMaker V2', cost: 50800500000, earn: 700000000, id: 6, icon: '🖨'},
{name: 'Giant X10', cost: 40000000000000, earn: 10000000000, id: 7, icon: '🖨'},
{name: 'Ultima Z33', cost: 80000000000000, earn: 40000000000, id: 8, icon: '🖨'},
{name: 'Giant-X10 Platinum Version', cost: 160000000000000, earn: 80000000000, id: '🖨'}

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
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 16) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', 'трлд'][k];

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

let promo = "0";

const rotateText = {
	q: 'q', w: 'ʍ', e: 'ǝ', r: 'ɹ', t: 'ʇ', y: 'ʎ', u: 'u', i: 'ᴉ', o: 'o', p: 'p', a: 'ɐ', s: 's', d: 'd', f: 'ɟ',
	g: 'ƃ', h: 'ɥ', j: 'ɾ', k: 'ʞ', l: 'l', z: 'z', x: 'x', c: 'ɔ', v: 'ʌ', b: 'b', n: 'n', m: 'ɯ', й: 'ņ', ц: 'ǹ', у: 'ʎ',
	к: 'ʞ', е: 'ǝ', н: 'н', г: 'ɹ', ш: 'm', щ: 'm', з: 'ε', х: 'х', ъ: 'q', ф: 'ф', ы: 'ıq', в: 'ʚ', а: 'ɐ',п: 'u', р: 'd',
	о: 'о', л: 'v', д: 'ɓ', ж: 'ж', э: 'є', я: 'ʁ', ч: 'һ', с: 'ɔ', м: 'w', и: 'и', т: 'ɯ', ь: 'q', б: 'ƍ', ю: 'oı'
}

let btc = 6000;

//---------------------------------------------------STICKERS!---------------------------------------------------//

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);
let smilik = utils.pick([14409, 6660, 6832, 15791, 3275, 16927, 15560]);
let many = utils.pick([3390, 3407, 8242, 8254, 6666, 6844, 16420, 16428, 16432, 15559, 15562, 15352, 14754, 3395, 6671]);
let plak = utils.pick([3411, 8264, 3287, 6676, 6700, 6850, 6849, 15793, 15800, 10223, 10225, 14411, 15347, 14751, 3362, 4644]);

let users = require('./database/users.json');
let convers = require('./database/convers.json');
let botinfo = require('./database/botinfo.json');
let clans = require('./database/clans.json'); 
let buttons = [];

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

setInterval(async () => {
	await saveAll();
}, 1);

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

}, 1);

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
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		if(user.business2)
		{
			const biz = businesses.find(x=> x.id === user.business2);
			if(!biz) return;

			user.biz2 += biz.earn;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		if(user.balance > 10000000000000000)
		{
			user.balance = 10000000000000000;
		}
	});
}, 1);

setInterval(async () => {
	users.map(user => {
		if(user.settings.limit < user.settings.maxlimit)
		{
			user.settings.limit = user.settings.maxlimit;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		if(user.btc > 10000000000000000)
		{
			user.btc = 10000000000000000;
		}
	});
}, 1);

setInterval(async () => {
	users.map(user => {
		if(user.btc > 10000000000000000)
		{
			user.btc = 10000000000000000;
		}
	});
}, 1);

setInterval(async () => {
	users.map(user => {
		if(user.farm_btc > 100000000000)
		{
			user.farm_btc = 10000000;
		}
	});
}, 1);

setInterval(async () => {
	users.map(user => {
		if(user.settings.adm > 3)
		{
			user.farmslimit = 100000000000000000000000000000;
		}
	});
}, 1);

setInterval(async () => {
	users.map(user => {
		if(user.owner > 1)
		{
			user.ban = false
			user.settings.adm = 8
			user.settings.limit = 10000000000000000
			user.timers.ataka = -1;
		}
	});
}, 199);

setInterval(async () => {
	users.map(user => {
		if(user.vip > 1)
		{
			
			user.settings.limit = 50000000000;
		}
	});
}, 36000);

setInterval(async () => {
	users.map(user => {
		if(user.adm > 1)
		{
			
			user.settings.limit = 100000000000;
		}
	});
}, 36000);

setInterval(async () => {
	users.map(user => {
		if(user.adm > 1)
		{
			
			user.vip = 0;
		}
	});
}, 36000);


setInterval(async () => {
	users.map(user => {
		if(user.settings.adm > 3)
		{
			user.rating = 0;
		}
	});
}, 1);


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

function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = 0;
		user.timers.ataka = 0;
		user.timers.farm_btc = 0;
		user.timers.hack = 0;
		user.timers.poxod = 0;
		user.timers.poxod2 = 0;
		user.timers.bonus = 0;
		user.promo = 0;
		user.energy = 10;
		user.timers.peredat = 0;
		user.timers.vidat = 0;
		user.timers.halyava = 0;
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

clearTemp();
clearPromo();

async function saveAll()
{
	require('fs').writeFileSync('./database/clans.json', JSON.stringify(clans, null, '\t'));
	require('fs').writeFileSync("./database/botinfo.json", JSON.stringify(botinfo, null, "\t"));
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: '5f111e0097f8561cd78464ea4091ef072602b53a4b6840739d87e45e6fe1bb7e4612c2c4350237b48cf83', pollingGroupId: 191380914 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on("new_wall_comment", async (message) => { 
if(Number(message.userId) <= 0) return; 
let user = users.find(x=> x.id === message.userId) 
if(!user) return 
{ 
{ 
let rand = utils.random(1000000000, 7000000000) 
let a = 0 
if(user.settings.adm > 1 & user.settings.adm > 1) a += utils.random(500000000, 600000000) 
if(user.settings.adm > 1 & user.settings.adm > 1) a += utils.random(1000000000, 1200000000) 
if(user.settings.adm > 3 & user.settings.adm > 3) a += utils.random(1500000000, 1700000000) 

user.balance += (rand + a) 
return vk.api.call("wall.createComment", { 
owner_id: message.ownerId, 
post_id: message.objectId, 
reply_to_comment: message.id, 
message: `💞 Вы получили бонус за комментарий! ${utils.sp(rand)}$${a !== 0 ? ` + ${utils.sp(a)}$` : ``}

🍍 Не забудь подписаться на @botpineapple (меня), чтобы самым первым быть в курсе новых новостей!` 
}); 
} 
} 
});
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[191380914|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[191380914|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			owner: 0,
			vip: 0,
			adm: 0,
			vig: 0,
			balance: 50000000,
			bank: 50000,
			rub: 0,
			btc: 0,
			farm_btc: 0,
			farms: 0,
			farmslimit: 2000,
			mnc: 0,
			manic: 0,
			energy: 10,
			opit: 0,
			biz: 0,
			biz2: 0,
			zhelezo: 0,
			zoloto: 0,
			manic_pribil: 0,
			tur: 0,
			dostuptur: 0,
			almaz: 0,
			uran: 0,
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
				ataka: false
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			business2: 0,
			notifications: true,
			case1: 0,
			case2: 0,
			case3: 0,
			case4: 0,
			case5: 0,
			zelya: 0,
			referal: null,
			promo: false,
			prez: false,
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
				manic: 0,
				pet: 0,
			},
			settings: {
				firstmsg: true,
				adm: 1,
				trade: false,
				old: false,
				limit: 10000000000,
				maxlimit: 100000000000
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
		saveAll();
	}

	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if(message.user.ban == true)
	{

		if(message.isChat) return;
		if(!message.isChat) return bot(`ваш аккаунт заблокирован навсегда за нарушения игровых правил! ⛔
			✉ комментарий от администратора: «${message.user.settings.reason}»`);
	}

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.settings.firstmsg)
	{

bot(`Я вижу ты новенький! Рад познакомиться, отправь «помощь» что бы узнать мои команды. 🎲

	Буду благодарен если [botpineapple|подпишешься на меня], конкурсы и акции в группе проводятся каждый день. 🚶

	Посмотреть официальные беседы бота на данный момент - «беседы» 💬 Заходи, там часто бывают раздачи!

	📗 Помощь по командам бота -- vk.cc/aiIVQu
	📘 Как заработать деньги в боте? -- vk.cc/aiIW1E
	📙 Что делать с биткоинами? -- vk.cc/aiIVDY
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
	"label": "🛍 Искать подарки" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🤑 Бизнес" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🍍 Бонус" 
	}, 
	"color": "negative" 
	}], 
	[{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🐾 Питомцы" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🔥 Топ" 
	}, 
	"color": "primary" 
    }, 
    { 
    "action": { 
    "type": "text", 
    "payload": "{}", 
    "label": "🎲 Помощь" 
    }, 
    "color": "positive" 
	}] 
] 
}) 
});



		message.user.settings.firstmsg = false;


		saveAll();
		return message.sendSticker(3389);

	}

	if(!command)
	{

		if(message.isChat) return;
		if(!message.isChat) return bot(`такой команды не существует, отправь «помощь» что бы узнать мои команды. 🎲`);
	}

	botinfo.msg += 1;


	let follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 191380914 }); 
	message.user = users.find(x=> x.id === message.senderId);

	if(!follow){ 
	message.send(`💞 Буду благодарен если [botpineapple|подпишешься на меня], конкурсы и акции в группе проводятся каждый день.`); 
	} 


	message.args = message.text.match(command[0]);
	await command[1](message, bot);
	let text1 = ` `
	if(message.isChat) text1 += `chat id: ${message.chatId},`

	saveAll();
	vk.api.messages.send({ chat_id: 7, message: `[data: ${data()} ${time()}] uID: ${message.user.uid}, ник [id${message.user.id}|${message.user.tag}],${text1} used command: «${message.text}»`}) 
});

const cmd = {
    hear: (p, f) => {
        commands.push([p, f]);
    }
}

cmd.hear(/^(?:помощь|🎲 Помощь)\s(.*)$/i, async (message, bot) => {
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
	
		if(message.args[1] === 'буква')
	{
		return message.send(`Команда "Буква" сравнивает вашу букву со случайным от а до я, если вы угадали, то получаете вознаграждение. Также можно использовать "буква"`);
	}

	if(message.args[1] === 'трейд')
	{
		return message.send(`Команда "Трейд" - симулятор бинарных опционов. Введите "Трейд вверх (сумма)" если думаете, что курс валюты будет увеличиваться, или "Трейд вниз (сумма)" если будет уменьшаться.`);
	}

	if(message.args[1] === 'стаканчик')
	{
		return message.send(`С помощью команды "Стаканчик" вы можете сыграть в аналог игры "Напёрстки". Чтобы играть введите "Стаканчик [1-3] [сумма]".`);
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
		return message.send(`Пустая команда "Рейтинг" (без параметров) выводит ваше кол-во рейтинга (также можно узнать в профиле). При указании параметра (любое число) вы купите данное кол-во единиц рейтинга (👑1 = 1.000.000.000$). Рейтинг влияет на ваше положение в топе.`);
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

	if(message.args[1].includes('брак'))
	{
		return message.send(`Используя команды "Брак", "Браки", "развод", вы можете жениться/выходить замуж/разводиться.
		Брак [id] - сделать предложение
		Браки - список предложений
		Развод - ...`);
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

	return bot(`держи: "${text.split('').reverse().join('')}"`)
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

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot;
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.notifications = true;
		return bot;
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

cmd.hear(/^(?:открыть)$/i, async (message, bot) => {
	if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Доступ к ней доступен только игрокам, которые учавствуют в раздачах.`);
	return bot(`вы открыли посылку, в ней вы обнаружили письмо с кодовым доступом для начала викторины. 🙀
	
	⛳ Что бы начать введите «викторина»`);
});

cmd.hear(/^(?:extended.dostupvip = actived;true)$/i, async (message, bot) => {
	if(message.user.settings.adm < 7) return bot(`вы не администратор.`)
	message.user.tur = 0;
	message.user.dostuptur = 1;
	return bot(`выполнил "extended.dostupvip = actived;true", подробности:
	errors: 0
	dumbs: 0`);
});

cmd.hear(/^(?:секретное)$/i, async (message, bot) => {
	if(message.user.settings.adm < 2) return bot(`вы не VIP.`)
	return bot (`доступное секретное имущество:

	1. VIP-AUTO
	2. Машина времени
	3. Велосипед
	4. Дом на колёсах
	5. Особняк с проститутками
	6. Яхта с турбо ускорителем.

	⚕ Введите "секретное [ID]", что бы получить это имущество.
`);
	});

cmd.hear(/^(?:админка|апанель|admin|адм|adm|админн|adminpanel|одминка|admin panel|панелька|меню админа)$/i, async (message, bot) => {
return bot (`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 199 рублей.

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
	
	🔑 @uundefinedd (Приобрести)

	🆘 При оплате вам необходимо ввести свой ID и ссылку на товар.`);
});

cmd.hear(/^(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start|🎲 Помощь)$/i, async (message, bot) => {
	await bot(`мои команды:

🎉 Развлекательные: 
⠀⠀ 😐 Анекдот 
⠀⠀ ↪ Переверни [фраза] 
⠀⠀ 🔮 Шар [фраза] 
⠀⠀ ⚖ Выбери [фраза] или [фраза] 
⠀⠀ 📊 Инфа [фраза] 
⠀⠀ 📈 Курс - курс валют

👷‍♂ Твои инвестиции:
⠀⠀ 📈 Бизнес [1/2] - статистика 
⠀⠀ 💵 Бизнес снять [1/2]
⠀⠀ 💶 Маник собрать
⠀⠀ 💧 Маник магазин

🐾 Питомец: 
⠀⠀🐒 Питомец - информация 
⠀⠀🐪 Питомец поход 
⠀⠀🐔 Питомец улучшить 

💼 Заработки:
⠀⠀ 🍂 Копать [железо/золото/алмазы/антиматерию]
⠀⠀ 🌲 Поход
⠀⠀ 🚕 Таксовать
⠀⠀ 👒 Квесты

🤑 Изи мани:
⠀⠀ 🛍 Искать подарки
⠀⠀ 🌐 Халява
⠀⠀ 🎲 Кубик [1-6] 
⠀⠀ 💈 Буква [а-я]
⠀⠀ 👮 Взломать 
⠀⠀ 🔦 Сейф [число 10-99]
⠀⠀ 🎁 Бонус - ежедневный бонус 

🚨 Азартные игры: 
⠀⠀ 🎰 Казино [ставка] 
⠀⠀ 📈 Трейд [вверх/вниз] [ставка] 
⠀⠀ 🥛 Стаканчик [1-3] [ставка] 

🛍 Магазин:
⠀⠀ 🛒 Магазин
⠀⠀ 📦 Кейсы
⠀⠀ 👝 Донат

📚 Основные: 
⠀⠀ 📖 Профиль
⠀⠀ 💲 Баланс
⠀⠀ 💰 Банк [сумма/снять сумма] 
⠀⠀ 👑 Рейтинг - ваш рейтинг 
⠀⠀ ✒ Ник [ник/вкл/выкл] 
⠀⠀ 🔋 Ферма - биткоин ферма 
⠀⠀ 💸 Продать [предмет] 
⠀⠀ 🤝 Передать [id] [сумма] 
⠀⠀ 🏆 Топ/Топ кланов


🍀 Беседы - беседы с ботом
🔁 Кнопки [кнопка, кнопка../удалить]
🆘 Репорт [текст] - ошибки или пожелания`, );
return message.sendSticker(14416);
});

cmd.hear(/^(?:профиль|@botpineapple 🔍 Профиль|🔍 Профиль|проф)$/i, async (message, bot) => {
	let text = ``;
	clanid = message.user.clanid

	text += `🆔 Игровой ID: ${message.user.uid}\n`;
	if(message.user.settings.adm > 1)text += `${message.user.settings.adm.toString().replace(/2/gi, "🔥 VIP-status").replace(/4/gi, "🔥 Administator").replace(/6/gi, "🌟 Head Administator").replace(/8/gi, "🍍 Owner of the ananas ✨")}\n`;
	if(clans[clanid]) { 
	text += `⚔ Клан: ${clans[clanid].name}\n`;
	};
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.rub) text += `🍍 Ананасов: ${utils.sp(message.user.rub)}₽\n`;
	text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(message.user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;

	if(message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter ||
		message.user.realty.home || message.user.realty.apartment ||
		message.user.misc.phone || message.user.misc.farm || message.user.business || message.user.misc.pet || message.user.manic || message.user.business2)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;
		
		if(message.user.realty.home) text += `⠀🏡 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;
		
		if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet) text += `⠀${pets[message.user.misc.pet - 1].icon} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.manic) text += `⠀💸 Денежный принтер: ${manic[message.user.manic - 1].name} 📇\n`;
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} Бизнес: ${businesses[message.user.business - 1].name}\n`;
		if(message.user.business2) text += `⠀${businesses2[message.user.business2 - 1].icon} Бизнес: ${businesses2[message.user.business2 - 1].name}\n`;
	}

	text += `\n🗓 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:Статистика)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 3) return;

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);
			let text = ``;	
	
			text += `🆔 ID: ${user.uid}\n`;
	        if(user.settings.adm > 1)text += `${user.settings.adm.toString().replace(/2/gi, "🔥 VIP-status").replace(/4/gi, "🔥 Administator").replace(/6/gi, "🌟 Head Administator").replace(/8/gi, "🍍 Owner of the ananas ✨")}\n`;
			text += `💰 Денег: ${utils.sp(user.balance)}$\n`;
			if(user.marriage.partner)text += `💳 В банке: ${utils.sp(user.bank)}$\n`;
			text += `🍍 Ананасов: ${utils.sp(user.rub)}₽\n`;
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
				if(message.user.business.length != 0)
		        if(message.user.business) text += `⠀${businesses[user.business - 1].icon} Бизнес: ${businesses[user.business - 1].name}\n`;
            }
			text += `\n🗓 Дата регистрации: ${user.regDate}`;
	return bot(`профиль игрока №${user.uid}\n${text}\n\n⛔ Блокировка: ${user.ban.toString().replace(/false/gi, "нету").replace(/true/gi, "есть")}\n🆘 Бан передачи: ${user.settings.trade.toString().replace(/false/gi, "нету").replace(/true/gi, "есть")}\n🛍 Лимит передачи: ${utils.sp(user.settings.limit)}$`);
	});

cmd.hear(/^(?:баланс|💸 Баланс)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.balance)}$ 💸`;

	if(message.user.bank) text += `\n💳 В банке ${utils.sp(message.user.bank)}$`;
	if(message.user.btc) text += `\n💽 Биткоинов ${utils.sp(message.user.btc)}฿`;
	if(message.user.zhelezo) text += `\n🎛 ${utils.sp(message.user.zhelezo)} железа`;
	if(message.user.zoloto) text += `\n🏵 ${utils.sp(message.user.zoloto)} золота`;
	if(message.user.almaz) text += `\n💎 ${utils.sp(message.user.almaz)} алмаза`;
	if(message.user.uran) text += `\n🌌 ${utils.sp(message.user.uran)} антиматерии`;

	return bot(text);
});

cmd.hear(/^(?:банк|💳 Банк)$/i, async (message, bot) => {
	if(message.user.bank < 1) return bot(`ваш банковский счет пуст.`);
	return bot(`на балансе в банке ${utils.sp(message.user.bank)}$
✍🏻 Введите "Банк [кол-во]" для пополнения`);
});

cmd.hear(/^(?:банк)\s(?:снять)\s(.*)$/i, async (message, bot) => {
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

cmd.hear(/^(?:донат|🎁 Донат|🛒 Донат)$/i, async (message, bot) => {
	return bot(`вы заинтересовались покупкой доната.
	
	🔑 Покупать донат можно только у @develiseev (создателя и владельца) бота.
	
	💯 Все пожертвованные вами деньги пойдут на развитие бота.
	🆘 При оплате вам необходимо ввести свой ID.
	
	🛒 Выгодное предложение:
	`, {attachment:'market-191380914_3361446'});
});

cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

    if(message.user.settings.adm > 3) return bot(`администратор не может пополнять банковский счёт. 🚫`);
	if(message.args[1] < 1) return bot(`на балансе в банке ${utils.sp(message.user.bank)}$)
✍🏻 Введите "Банк снять [кол-во]" для снятия`);

	if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`);
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
	if(message.user.settings.adm > 3) return bot(`администратор не может передавать игровые средства, воспользуйтесь командой "выдать"`); 
	if(message.user.settings.limit < message.args[2]) return bot(`вы можете выдать: ${utils.sp(message.user.settings.limit)} ${smileerror}
		🆘 Лимит восстанавливается каждый час.`)
	if(message.args[2] <= 0) return;
	if(message.user.settings.trade === true) return bot(`у вас установлен бан передачи ${smileerror}`);

	if(message.args[2] > message.user.balance) return bot(`недостаточно денег
💰 Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		if(user.uid === message.user.uid) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

		message.user.settings.limit -= message.args[2];
		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`вы перевели ${user.tag} ${utils.sp(message.args[2])}$ ${smilesuccess}
		💸 На руках: ${utils.sp(message.user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `▶ Игрок ${message.user.tag} перевел вам ${utils.sp(message.args[2])}$!` });
	}
});

cmd.hear(/^(?:рейтинг|👑 Рейтинг)$/i, async (message, bot) => {
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
⠀⠀👑 Рейтинг [кол-во] - $1 млрд
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
		let a3 = message.user.almaz * 450000000;

		var zhelezosda2 = message.user.almaz;

		message.user.balance += message.user.almaz * 100000;
		message.user.almaz = 0;

		return bot(`вы продали ${zhelezosda2} алмазов за ${utils.sp(a3)}$ ✅`);
	}
	
	if(/антиматерию/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.uran < 1) return bot(`у Вас нет антиматерии. ⚠`);
		let a3 = message.user.uran * 10000000000;

		var zhelezosda2 = message.user.uran;

	    message.user.balance += message.user.uran * 10000000000;
		message.user.uran = 0;

		return bot(`вы продали ${zhelezosda2} антиматерии за ${utils.sp(a3)}$ ✅`);
	}

	if(/золот/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zoloto < 1) return bot(`у Вас нет золота. ⚠`);
		let a4 = message.user.zoloto * 4000000;

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
	
			if(/костюм(ы|и|а)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет костюма ${smileerror}
		❓ Для покупки введите «Костюм»`);
		let a = Math.floor(suits[message.user.suit - 1].cost * 0.85);
		let b = Math.floor(suits[message.user.suit - 1].cost * 0.25);

		message.user.balance += Math.floor(elkas[message.user.suit - 1].cost * 0.85);
		message.user.suit = 0;

		return bot(`вы продали свой костюм за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
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

	if(/бизнес 2/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business2) return bot(`у вас нет бизнеса
		❓ Для покупки введите «Бизнесы»`);
		let a = Math.floor(businesses2[message.user.business2 - 1].cost * 0.85);
		let b = Math.floor(businesses2[message.user.business2 - 1].cost * 0.15);

		message.user.uran += Math.floor(a);
		message.user.business2 = 0;
		message.user.bizlvl2 = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)} урана, комиссия составила ${utils.sp(b)} антиматерии. 🌌`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`у вас нет бизнеса
		❓ Для покупки введите «Бизнесы»`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);
		let b = Math.floor(businesses[message.user.business - 1].cost * 0.15);

		message.user.balance += Math.floor(a);
		message.user.business = 0;
		message.user.bizlvl = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}$, комиссия составила ${utils.sp(b)}$`);
	}

	if(/битко(й|и)ны/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.btc < 1) return bot(`недостаточно биткоинов
		❓ Для покупки введите «Биткоин [кол-во]»`);
		let a3 = message.user.btc * btc;

		var btcc = message.user.btc;

	    message.user.balance += a3;
		message.user.btc = 0;

		return bot(`вы продали ${utils.sp(btcc)} биткоина(ов) за ${utils.sp(a3)}$ ✅`);
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.rating < 1) return bot(`недостаточно рейтинга
		❓ Для покупки введите «рейтинг [кол-во]»`);
		let a3 = message.user.rating * 125000000;

		var btcc = message.user.rating;

	    message.user.balance += a3;
		message.user.rating = 0;

		return bot(`вы продали ${utils.sp(btcc)} рейтинга за ${utils.sp(a3)}$ ✅`);
	}
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '🎒' : '🎒'} 1. Самокат (500$)
${message.user.transport.car === 2 ? '🎒' : '🎒'} 2. Велосипед (2.500$)
${message.user.transport.car === 3 ? '🎒' : '🎒'} 3. Гироскутер (5.000$)
${message.user.transport.car === 4 ? '🎒' : '🎒'} 4. Сегвей (7.500$)
${message.user.transport.car === 5 ? '🎒' : '🎒'} 5. Мопед (25.000$)
${message.user.transport.car === 6 ? '🎒' : '🎒'} 6. Мотоцикл (50.000$)
${message.user.transport.car === 7 ? '🎒' : '🎒'} 7. ВАЗ 2109 (75.000$)
${message.user.transport.car === 8 ? '🎒' : '🎒'} 8. Квадроцикл (80.000$)
${message.user.transport.car === 9 ? '🎒' : '🎒'} 9. Багги (135.000$)
${message.user.transport.car === 10 ? '🎒' : '🎒'} 10. Вездеход (200.000$)
${message.user.transport.car === 11 ? '🎒' : '🎒'} 11. Лада Xray (350.000$)
${message.user.transport.car === 12 ? '🎒' : '🎒'} 12. Audi Q7 (750.000$)
${message.user.transport.car === 13 ? '🎒' : '🎒'} 13. BMW X6 (1.000.000$)
${message.user.transport.car === 14 ? '🎒' : '🎒'} 14. Toyota FT-HS (1.750.000$)
${message.user.transport.car === 15 ? '🎒' : '🎒'} 15. BMW Z4 M (2.500.000$)
${message.user.transport.car === 16 ? '🎒' : '🎒'} 16. Lamborgini Huracan (5.000.000$)
${message.user.transport.car === 17 ? '🎒' : '🎒'} 17. Победитель 1980 (7.500.000$)
${message.user.transport.car === 18 ? '🎒' : '🎒'} 18. BMW M5 F90 (9.500.000$)
${message.user.transport.car === 19 ? '🎒' : '🎒'} 19. Машина времени (15.500.000$)

🛍  Для покупки введите «Машина [ID]»
❓  Для продажи введите «Продать машину»`);

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);
	if(message.args[1] > 19) return;
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`яхты: 
${message.user.transport.yacht === 1 ? '🎒' : '🎒'} 1. Ванна (10.000$)
${message.user.transport.yacht === 2 ? '🎒' : '🎒'} 2. Nauticat 331 (10.000.000$)
${message.user.transport.yacht === 3 ? '🎒' : '🎒'} 3. Nordhavn 56 MS (15.000.000$)
${message.user.transport.yacht === 4 ? '🎒' : '🎒'} 4. Princess 60 (25.000.000$)
${message.user.transport.yacht === 5 ? '🎒' : '🎒'} 5. Azimut 70 (35.000.000$)
${message.user.transport.yacht === 6 ? '🎒' : '🎒'} 6. Dominator 40M (50.000.000$)
${message.user.transport.yacht === 7 ? '🎒' : '🎒'} 7. Moonen 124 (60.000.000$)
${message.user.transport.yacht === 8 ? '🎒' : '🎒'} 8. Wider 150 (65.000.000$)
${message.user.transport.yacht === 9 ? '🎒' : '🎒'} 9. Palmer Johnson 42M SuperSport (80.000.000$)
${message.user.transport.yacht === 10 ? '🎒' : '🎒'} 10. Wider 165 (85.000.000$)
${message.user.transport.yacht === 11 ? '🎒' : '🎒'} 11. Eclipse (150.000.000$)
${message.user.transport.yacht === 12 ? '🎒' : '🎒'} 12. Dubai (300.000.000$)
${message.user.transport.yacht === 13 ? '🎒' : '🎒'} 13. Streets of Monaco (750.000.000$)

🛍  Для покупки введите «Яхта [ID]»
❓  Для продажи введите «продать яхту»`);

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
	if(!message.args[1]) return bot(`самолеты: 
${message.user.transport.airplane === 1 ? '🎒' : '🎒'} 1. Параплан (100.000$)
${message.user.transport.airplane === 2 ? '🎒' : '🎒'} 2. АН-2 (350.000$)
${message.user.transport.airplane === 3 ? '🎒' : '🎒'} 3. Cessna-172E (700.000$)
${message.user.transport.airplane === 4 ? '🎒' : '🎒'} 4. Supermarine Spitfire (1.000.000$)
${message.user.transport.airplane === 5 ? '🎒' : '🎒'} 5. BRM NG-5 (1.400.000$)
${message.user.transport.airplane === 6 ? '🎒' : '🎒'} 6. Cessna T210 (2.600.000$)
${message.user.transport.airplane === 7 ? '🎒' : '🎒'} 7. Beechcraft 1900D (5.500.000$)
${message.user.transport.airplane === 8 ? '🎒' : '🎒'} 8. Cessna 550 (8.000.000$)
${message.user.transport.airplane === 9 ? '🎒' : '🎒'} 9. Hawker 4000 (22.400.000$)
${message.user.transport.airplane === 10 ? '🎒' : '🎒'} 10. Learjet 31 (45.000.000$)
${message.user.transport.airplane === 11 ? '🎒' : '🎒'} 11. Airbus A318 (85.000.000$)
${message.user.transport.airplane === 12 ? '🎒' : '🎒'} 12. F-35A (160.000.000$)
${message.user.transport.airplane === 13 ? '🎒' : '🎒'} 13. Boeing 747-430 Custom (225.000.000$)
${message.user.transport.airplane === 14 ? '🎒' : '🎒'} 14. C-17A Globemaster III (350.000.000$)
${message.user.transport.airplane === 15 ? '🎒' : '🎒'} 15. F-22 Raptor (400.000.000$)
${message.user.transport.airplane === 16 ? '🎒' : '🎒'} 16. Airbus 380 Custom (600.000.000$)
${message.user.transport.airplane === 17 ? '🎒' : '🎒'} 17. B-2 Spirit Stealth Bomber (1.359.000.000$)

🛍  Для покупки введите «Самолёты [ID]»
❓  Для продажи введите «Продать самолёт»`);

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
	if(!message.args[1]) return bot(`вертолеты: 
${message.user.transport.helicopter === 1 ? '🎒' : '🎒'} 1. Шарик с пропеллером (2$)
${message.user.transport.helicopter === 2 ? '🎒' : '🎒'} 2. RotorWay Exec 162F (300.000$)
${message.user.transport.helicopter === 3 ? '🎒' : '🎒'} 3. Robinson R44 (450.000$)
${message.user.transport.helicopter === 4 ? '🎒' : '🎒'} 4. Hiller UH-12C (1.300.000$)
${message.user.transport.helicopter === 5 ? '🎒' : '🎒'} 5. AW119 Koala (2.500.000$)
${message.user.transport.helicopter === 6 ? '🎒' : '🎒'} 6. MBB BK 117 (4.000.000$)
${message.user.transport.helicopter === 7 ? '🎒' : '🎒'} 7. Eurocopter EC130 (7.500.000$)
${message.user.transport.helicopter === 8 ? '🎒' : '🎒'} 8. Leonardo AW109 Power (10.000.000$)
${message.user.transport.helicopter === 9 ? '🎒' : '🎒'} 9. Sikorsky S-76 (15.000.000$)
${message.user.transport.helicopter === 10 ? '🎒' : '🎒'} 10. Bell 429WLG (19.000.000$)
${message.user.transport.helicopter === 11 ? '🎒' : '🎒'} 11. NHI NH90 (35.000.000$)
${message.user.transport.helicopter === 12 ? '🎒' : '🎒'} 12. Kazan Mi-35M (60.000.000$)
${message.user.transport.helicopter === 13 ? '🎒' : '🎒'} 13. Bell V-22 Osprey (135.000.000$)

🛍  Для покупки введите «Вертолёты [ID]»
❓  Для продажи введите «продать вертолёт»`);

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
	if(!message.args[1]) return bot(`дома: 
${message.user.realty.home === 1 ? '🎒' : '🎒'} 1. Коробка из-под холодильника (250$)
${message.user.realty.home === 2 ? '🎒' : '🎒'} 2. Подвал (3.000$)
${message.user.realty.home === 3 ? '🎒' : '🎒'} 3. Палатка (3.500$)
${message.user.realty.home === 4 ? '🎒' : '🎒'} 4. Домик на дереве (5.000$)
${message.user.realty.home === 5 ? '🎒' : '🎒'} 5. Полуразрушенный дом (10.000$)
${message.user.realty.home === 6 ? '🎒' : '🎒'} 6. Дом в лесу (25.000$)
${message.user.realty.home === 7 ? '🎒' : '🎒'} 7. Деревянный дом (37.500$)
${message.user.realty.home === 8 ? '🎒' : '🎒'} 8. Дача (125.000$)
${message.user.realty.home === 9 ? '🎒' : '🎒'} 9. Кирпичный дом (80.000$)
${message.user.realty.home === 10 ? '🎒' : '🎒'} 10. Коттедж (450.000$)
${message.user.realty.home === 11 ? '🎒' : '🎒'} 11. Особняк (1.250.000$)
${message.user.realty.home === 12 ? '🎒' : '🎒'} 12. Дом на Рублёвке (5.000.000$)
${message.user.realty.home === 13 ? '🎒' : '🎒'} 13. Личный небоскрёб (7.000.000$)
${message.user.realty.home === 14 ? '🎒' : '🎒'} 14. Остров с особняком (12.500.000$)
${message.user.realty.home === 15 ? '🎒' : '🎒'} 15. Белый дом (20.000.000$)
${message.user.realty.home === 16 ? '🎒' : '🎒'} 16. Собственая планета (500.000.000.000$)

🛍  Для покупки введите «Дом [ID]»
❓  Для продажи введите «продать дом»`);

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
	if(!message.args[1]) return bot(`квартиры: 
${message.user.realty.apartment === 1 ? '🎒' : '🎒'} 1. Чердак (15.000$)
${message.user.realty.apartment === 2 ? '🎒' : '🎒'} 2. Квартира в общежитии (55.000$)
${message.user.realty.apartment === 3 ? '🎒' : '🎒'} 3. Однокомнатная квартира (175.000$)
${message.user.realty.apartment === 4 ? '🎒' : '🎒'} 4. Двухкомнатная квартира (260.000$)
${message.user.realty.apartment === 5 ? '🎒' : '🎒'} 5. Четырехкомнатная квартира (500.000$)
${message.user.realty.apartment === 6 ? '🎒' : '🎒'} 6. Квартира в центре Москвы (1.600.000$)
${message.user.realty.apartment === 7 ? '🎒' : '🎒'} 7. Двухуровневая квартира (4.000.000$)
${message.user.realty.apartment === 8 ? '🎒' : '🎒'} 8. Квартира с Евроремонтом (6.000.000$)

🛍  Для покупки введите «Квартиры [ID]»
❓  Для продажи введите «продать квартиру»`);

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
${message.user.misc.phone === 10 ? '🎒' : '🎒'} 10. Мегафон С1 (250.000$)

🛍  Для покупки введите «Телефоны [ID]»
❓  Для продажи введите «продать телефон»`);

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

cmd.hear(/^(?:питомцы|🐒 Питомцы|🐾 Питомцы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`питомцы:
🐌 1. Улитка (1.000$)
🐸 2. Лягушка (25.000$)
🐰 3. Заяц (500.000$)
🐷 4. Свинья (300.000.000$)
🦊 5. Лиса (1.250.000.000$)
🐶 6. Собака (5.000.000.000$)
🐼 7. Панда (30.000.000.000$)
🐺 8. Волк (180.000.000.000$)

🐾 Можно иметь только ОДНОГО питомца!

🛍 Для покупки введите "Питомцы [ID]"
📌 Например: Питомцы 1

🖼 Информация о Вашем питомце: питомец`);

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.pet) return bot(`у Вас уже есть питомец. ${smileerror}`);
	if(message.args[1] > 8) return bot(` такого питомца не существует! попробуйте от 1 до 8.`)

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
🌟 Уровень: ${message.user.pet.lvl}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👒 Питомец улучшить` 
}, 
"color": "default" 
}] 
] 
}) 
});

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

cmd.hear(/^(?:секрет питомец)$/i, async (message, bot) => {
if(message.user.old) return bot(`вы уже получали приз за правильный ответ. ${smileerror}`);
else 
{
	message.user.old = true;
	message.user.misc.pet = 9
	message.user.pet.lvl = 1;
	bot(`Получен секретный питомец «Летучая мышь». 
	Ещё раз приносим свои извенения.`);
	return message.sendSticker(7378); 
}

});

cmd.hear(/^(?:кланказна)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 11) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(clans[i]){ 
clans[i].balance = 0; 
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:лимит1)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 11) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].farmslimit = 2000; 
} 
} 
return bot(`готово!`);
});

cmd.hear(/^(?:кланы в жопу)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 11) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(clans[i]){ 
	clans[i].balance = 12; 
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова15)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 11) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].prez = false;
	} 
	} 
	return bot(`готово!`);
});

cmd.hear(/^(?:обнова1)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 7) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].case1 = 0;
	users[i].case2 = 0;
	users[i].case3 = 0;
	users[i].case4 = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова2414)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 9) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].dostuptur = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова3)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 9) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].tur = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:обнова2)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 9) return bot(`вы не администратор. ${smileerror}`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].settings.limit = 100000000000;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:промо бабки)$/i, async (message, bot) => {
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

cmd.hear(/^(?:питомец улучшить|👒 питомец улучшить)$/i, async (message, bot) => {
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
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`); 
else {
const pet = pets.find(x=> x.id === message.user.misc.pet); 
	if(message.user.timers.poxod >= 0) return bot(`ваш питомец сильно устал, осталось ${displayTime(message.user.timers.poxod)} ${smileerror}`); 

	message.user.timers.poxod = 3600;

let cashfind = utils.random(pet.min,pet.max); 
message.user.balance += cashfind; 

bot(`ваш питомец нашёл в походе ${utils.sp(cashfind)}$. Улучшайте своего питомца! ${smilesuccess}`);
return message.sendSticker(7762); 
} 

});

cmd.hear(/^(?:клан атака|клан атаковать|атака|награбить|⚔ Клан атака)$/i, async (message, bot) => { 
	let clanid = message.user.clanid; 
	if(!clans[clanid]) return bot(`у вас нет клана!`); 
	if(clans[clanid].users[message.user.uid].level < 3) return bot(`проводить атаки может только глава клана.`); 
	if(clans[clanid].peoples < 1) return bot(`что бы проводить атаки необходимо иметь минимум 1 участника. `); 
	if(message.user.timers.ataka >= 0) return bot(`игроки вашего клана сильно устали, они восстановят силы через ${displayTime(message.user.timers.ataka)} ${smileerror}`); 

	message.user.timers.ataka = 180;
	clanataka = utils.random(3245672434, 190000000013); 
	let atackedclan = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	if(atackedclan === 1)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(atackedclan === 2)
	{
		clans[clanid].rating -= 1; 
		clans[clanid].los += 1; 
		return bot(`атака состоялась ⚔
		Клан противника оказался сильнее, вы проиграли. ${smileerror}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].los)} поражений!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(atackedclan === 3)
	{
		return bot(`атака не состоялась, кажется что ваши противники струсили ⚔`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(atackedclan === 4)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(atackedclan === 5)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(atackedclan === 6)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(atackedclan === 7)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(atackedclan === 8)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(atackedclan === 9)
	{
		clans[clanid].rating += 1; 
		clans[clanid].wons += 1; 
		clans[clanid].balance += clanataka; 
		return bot(`атака состоялась ⚔
		Вам удалось награбить ${utils.sp(clanataka)}$ в общую казну клана. ${smilesuccess}
		Ваш клан теперь имеет 🥇${utils.rn(clans[clanid].wons)} побед, поздравляем!`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `⚔ Клан атака` 
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

cmd.hear(/^(?:фермы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔋' : '🔋'} 1. 6U Nvidia 2₿/час (20.500.000$)
${message.user.misc.farm === 2 ? '🔋' : '🔋'} 2. AntminerS9 10₿/час (100.000.000$)
${message.user.misc.farm === 3 ? '🔋' : '🔋'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`);

		let farmm = message.user.farmslimit-message.user.farms;

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм (${message.user.farmslimit}x). ${smileerror}`);
	if(!message.user.misc.farm === message.args[1]) return bot(` вы не можете иметь фермы другого вида.`)
	

    if(message.user.balance < sell.cost * count) return bot(`недостаточно денег ${smileerror}`, {attachment:'https://vk.com/phantombot1?w=product-189251787_3650543%2Fquery'});
	else if(message.user.balance >= sell.cost)
	{

		if(Number(message.args[2])){

		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

			message.user.balance -= sell.cost;
			message.user.misc.farm = sell.id;
			message.user.farms += message.args[2];

			saveAll();
			return bot(`вы купили ${sell.name} (x${message.args[2]}) за ${utils.sp(sell.cost)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);

		}
		else {

		message.user.balance -= sell.cost;
		message.user.misc.farm = sell.id;
		message.user.farms += 1;

		saveAll();
		return bot(`вы купили ${sell.name} (x1) за ${utils.sp(sell.cost)}$
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`);
		}	
	}
});

cmd.hear(/^(?:фермы 1)\s?([0-9]+)?$/i, async (message, bot) => { 
if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔋' : '🔋'} 1. 6U Nvidia 2₿/час (20.500.000$) 
${message.user.misc.farm === 2 ? '🔋' : '🔋'} 2. AntminerS9 10₿/час (100.000.000$) 
${message.user.misc.farm === 3 ? '🔋' : '🔋'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`); 

	let farmm = message.user.farmslimit-message.user.farms;

if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм (x${message.user.farmslimit}). ${smileerror}`);
if(message.args[1] > farmm) return bot(`вы не можете купить ферм более чем (x500) за один раз!. ${smileerror}`)
if(!message.user.misc.farm === 1) return bot(` вы не можете иметь фермы другого вида.`)

var pricefarms1 = 20500000*message.args[1]; 
if(message.user.balance < pricefarms1) return bot(`недостаточно денег ${smileerror}`, {attachment:'https://vk.com/phantombot1?w=product-189251787_3650543%2Fquery'}); 
else if(message.user.balance >= pricefarms1) 
{ 

message.user.balance -= pricefarms1; 
message.user.misc.farm = 1; 

if(message.user.misc.farm === 1) message.user.farms += Number(message.args[1]); 
else 
{ 

message.user.farms = Number(message.args[1]); 

} 

saveAll(); 
return bot(`вы купили 6U Nvidia (x${Number(message.args[1])}) за ${utils.sp(pricefarms1)}$ 
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`); 

} 
});

cmd.hear(/^(?:фермы 2)\s?([0-9]+)?$/i, async (message, bot) => { 
if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔋' : '🔋'} 1. 6U Nvidia 2₿/час (20.500.000$) 
${message.user.misc.farm === 2 ? '🔋' : '🔋'} 2. AntminerS9 10₿/час (100.000.000$) 
${message.user.misc.farm === 3 ? '🔋' : '🔋'} 3. FM2018-BT200 100₿/час (900.000.000$)

Для покупки введите "Фермы [номер] [кол-во]"`); 

	let farmm = message.user.farmslimit-message.user.farms;

if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм (x1000). ${smileerror}`);
if(message.args[1] > farmm) return bot(`вы не можете купить ферм более чем (x500) за один раз!. ${smileerror}`)
if(!message.user.misc.farm === 2) return bot(` вы не можете иметь фермы другого вида.`)

var pricefarms2 = 100000000*message.args[1]; 
if(message.user.balance < pricefarms2) return bot(`недостаточно денег ${smileerror}`, {attachment:'https://vk.com/phantombot1?w=product-189251787_3650543%2Fquery'}); 
else if(message.user.balance >= pricefarms2) 
{ 

message.user.balance -= pricefarms2; 
message.user.misc.farm = 2; 

if(message.user.misc.farm === 2) message.user.farms += Number(message.args[1]); 
else 
{ 

message.user.farms = Number(message.args[1]); 

} 

saveAll(); 
return bot(`вы купили AntminerS9 (x${Number(message.args[1])}) за ${utils.sp(pricefarms2)}$ 
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`); 

} 
});

cmd.hear(/^(?:фермы 3)\s?([0-9]+)?$/i, async (message, bot) => { 
if(!message.args[1]) return bot(`Майнинг фермы: 
${message.user.misc.farm === 1 ? '🔋' : '🔋'} 1. 6U Nvidia 2₿/час (20.500.000$) 
${message.user.misc.farm === 2 ? '🔋' : '🔋'} 2. AntminerS9 10₿/час (100.000.000$) 
${message.user.misc.farm === 3 ? '🔋' : '🔋'} 3. FM2018-BT200 100₿/час (900.000.000$) 

Для покупки введите "Фермы [номер] [кол-во]"`); 

	let farmm = message.user.farmslimit-message.user.farms;

if(message.user.farms >= message.user.farmslimit) return bot(`вы достигли лимита ферм (x${message.user.farmslimit}). ${smileerror}`);
if(!message.user.misc.farm === 3) return bot(` вы не можете иметь фермы другого вида.`)
if(message.args[1] > farmm)return bot(`вы не можете купить ферм более чем (x500) за один раз!. ${smileerror}`)

var pricefarms3 = 900000000*message.args[1]; 
if(message.user.balance < pricefarms3) return bot(`недостаточно денег ${smileerror}`, {attachment:'https://vk.com/phantombot1?w=product-189251787_3650543%2Fquery'}); 
else if(message.user.balance >= pricefarms3) 
{ 

message.user.balance -= pricefarms3; 
message.user.misc.farm = 3; 

if(message.user.misc.farm === 3) message.user.farms += Number(message.args[1]); 
else 
{ 

message.user.farms = Number(message.args[1]); 

} 

saveAll(); 
return bot(`вы купили FM2018-BT200 (x${Number(message.args[1])}) за ${utils.sp(pricefarms3)}$ 
💰 Ваш баланс: ${utils.sp(message.user.balance)}$`); 

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

	if(( message.args[1] * 250000000 ) > message.user.balance) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 250000000 ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 250000000)}$`);
	}
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
${message.user.manic === 7 ? '🔹' : '🔹'} 7. Giant X10 - 10.000.000.000/5 мин

❓ Для покупки введите «Маники [ID]»`);

	const sell = manic.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.manic) return bot(`у вас уже есть маник (${manic[message.user.manic - 1].name}), введите "Продать маник"`);
	if(message.args[1] > 6) return bot(`вы заинтересовались покупкой денежного принтера «Giant X10» за 59 рублей.

	💎 Это лучший денежный принтер которого НЕТ В ПРОДАЖЕ с прибылью в 10.000.000.000$/час игровой валюты.
	🔋 Батарея разряжается в 2 раза дольше.
	💧 Полностью отсутствует перегрев, принтер выдается НАВСЕГДА!
	🎒 При продаже вы получите 40.000.000.000.000$
	
	
	🆘 При оплате вам необходимо ввести свой ID и ссылку на товар.`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
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
Курс биткоина: ${btc}$`);
	else if(( message.args[1] * btc ) <= message.user.balance)
	{
		message.user.balance -= ( message.args[1] * btc );
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}₿ за ${utils.sp(message.args[1] * btc)}$`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `биткоин ${message.args[1]}` 
}, 
"color": "positive" 
}] 
] 
}) 
});

	}

});

cmd.hear(/^(?:топ|топ игроков|топер|tops|🔥 топ)$/i, async (message, bot) => {
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

    bot(`топ игроков:
		${text}
—————————————————
➡${utils.gi(find() + 1)} ${message.user.tag} — 👑${utils.sp(message.user.rating)} шт. | $${utils.rn(message.user.balance)}`);
    return message.sendSticker(16429);
});

cmd.hear(/^(?:⚔ топ кланы|топ кланы|⚔ топ кланов|⚔ клан топ|⚔ кланы топ|кланов топ|топ кланов|клан топ|топ клан|лучшие кланы|кланы|🏆 Лучшие кланы)$/i, async (message, bot) => {
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
		}; 
		if(clan.lvl == 1) { 
		mp += `15`; 
		}; 
		if(clan.lvl == 2) { 
		mp += `25`; 
		}; 
		if(clan.lvl == 3) { 
		mp += `50`; 
		}; 
		
		cll += `${i === 9 ? `🔟` : `${i + 1}⃣`}  [${clan.peoples}/${mp}] ${clan.name} -  🏆${utils.sp(clan.rating)} | $${utils.rn(clan.balance)}\n`; 
		} 
		
		bot(`топ кланов: 
		${cll}
		—————————————————
		
📢 Рейтинг клана складывается из побед и поражений в атаках.`);
		return message.sendSticker(16429);
		});

cmd.hear(/^(?:бонус|🔑 Бонус|🤑 Бонус|🍍 Бонус)$/i, async (message, bot) => {

	if(message.user.timers.bonus >= 0) return bot(`бонус можно получить через ${displayTime(message.user.timers.bonus)} ${smileerror}`); 

	message.user.timers.bonus = 86400;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	if(prize === 1)
	{
		message.user.balance += 5000000000;
		bot(`вы выиграли 50.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💸 Баланс` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 2)
	{
		message.user.btc += 10000000;
		bot(`вы выиграли 10.000.000₿ ${smilesuccess}`);
		return message.sendSticker(15559);
	}

	if(prize === 3)
	{
		message.user.rating += 5;
		bot(`вы выиграли 5👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 4)
	{
		message.user.rating += 1;
		bot(`вы выиграли 1👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 5)
	{
		message.user.rating += 10;
		bot(`вы выиграли 10👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 6)
	{
		message.user.rating += 2;
		bot(`вы выиграли 2👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}
	if(prize === 7)
	{
		message.user.rating += 3;
		bot(`вы выиграли 3👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}
	if(prize === 8)
	{
		message.user.rating += 4;
		bot(`вы выиграли 4👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}
	if(prize === 9)
	{
		message.user.bank += 1000000;
		bot(`вы выиграли 1.000.000$ на свой банковский счёт ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💳 Банк` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}
	if(prize === 10)
	{
		message.user.bank += 5000000;
		bot(`вы выиграли 5.000.000$ на свой банковский счёт ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💳 Банк` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 11)
	{
		message.user.bank += 10000000;
		bot(`вы выиграли 10.000.000$ на свой банковский счёт ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💳 Банк` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}

	if(prize === 12)
	{
		message.user.bank += 50000000;
		bot(`вы выиграли 50.000.000$ на свой банковский счёт ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💳 Банк` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(15559);
	}
});

cmd.hear(/^(?:поход|🎩 Поход)$/i, async (message, bot) => {

	if(message.user.timers.poxod2 >= 0) return bot(`в поход можно сходить через ${displayTime(message.user.timers.poxod2)} ${smileerror}`); 

	message.user.timers.poxod2 = 86400;

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

	if(prize2 === 1)
	{
		message.user.balance += 50000;
		bot(`находясь в походе, вы нашли 50.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💸 Баланс` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}

	if(prize2 === 2)
	{
		message.user.btc += 1000;
		bot(`находясь в походе, вы нашли 1.000₿ ${smilesuccess}`);
		return message.sendSticker(4321);
	}

	if(prize2 === 3)
	{
		message.user.rating += 5;
		bot(`находясь в походе, вы нашли 5👑`, 
{ 
keyboard:JSON.stringify( 
{"inline": true, "buttons": [ 
[{ "action":
{ "type": "text", "payload": "{}", "label": `👑 Рейтинг` }, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}

	if(prize2 === 4)
	{
		message.user.rating += 1;
		bot(`находясь в походе, вы нашли 1👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}

	if(prize2 === 5)
	{
		message.user.rating += 10;
		bot(`находясь в походе, вы нашли 10👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}

	if(prize2 === 6)
	{
		message.user.rating += 2;
		bot(`находясь в походе, вы нашли 2👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}
	if(prize2 === 7)
	{
		message.user.rating += 3;
		bot(`находясь в походе, вы нашли 3👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
	}
	if(prize2 === 8)
	{
		message.user.rating += 4;
		bot(`находясь в походе, вы нашли 4👑`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `👑 Рейтинг` 
}, 
"color": "positive" 
}] 
] 
}) 
});
		return message.sendSticker(4321);
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

cmd.hear(/^(?:репорт|реп|rep)\s([^]+)$/i, async (message, bot) => { 
	if(message.isChat) return bot(`Данная команда доступна только в личных сообщениях.`)
vk.api.messages.send({ chat_id: 39, message: `🆕 Поступил новый репорт!\n\n🗣 Отправил: ${message.user.id} 
🔎 Игровой ID: ${message.user.uid}\n➡ [id${message.user.id}|${message.user.tag}]: ${message.args[1]}` }) 
return message.send(`[id${message.user.id}|${message.user.tag}], ваш репорт был отправлен администраторам.`); 
});


cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 3) return;
	if(message.chatId !== 39) return bot(`данная команда доступна только в админ-чате.`)
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	message.send(`[id${message.user.id}|${message.user.tag}], данный [id${user.id}|игрок] получил ваш ответ, спасибо что помогаете игрокам.`);

	vk.api.messages.send({ user_id: user.id, message: `🗣 Вам ответили на вашу жалобу.\n➡ [id${message.user.id}|${message.user.tag}]: ${message.args[2]}` });

});

cmd.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, async (message, bot) => {
	const result = eval(`${message.args[1]} ${message.args[2]} ${message.args[3]}`);
	return bot(`${message.args[1]} ${message.args[2]} ${message.args[3]}=${result}`);
});


cmd.hear(/^(?:eval|dev|zz)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 556842930) return;

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
	🎲 Выпало число ${int}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `кубик ${message.args[1]}` 
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

cmd.hear(/^(?:казино|💎 казино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	let proigrish1 = 0.75;
	let proigrish2 = 0.50;
	let proigrish3 = 0.25;

	if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0.25, 0.25, 1, 1, 2, 2, 0, 2, 0, 2, 2, 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0.75, 0.25, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0.75, 1, 0.25, 0.75, 1, 0.25, 0.25, 0, 0, 0, 0.75, 2, 2, 1, 0.25, 0.25, 0.75, 1, 2, 2, 0.25, 0.75, 1, 0.25, 0.25, 0.75, 1, 0.25, 0.75, 2, 2, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 0.25, 0.75, 1, 0.25, 0.75, 1, 2, 2, 5, 2, 1, 0.50, 0.25, 0.25, 0.75, 0.50, 0.25, 0.25, 0.75, 0.50, 0.25, 0.75, 0.50, 5, 1, 2, 0.50, 0.25, 0, 1, 2, 2, 5, 2, 1, 2, 5, 0, 0.25, 0, 1, 0, 1, 0, 2, 1, 0.25, 0.75, 0.50, 2, 0]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply === 0.75 ? `вы проиграли ${utils.sp(message.args[1] * proigrish3)}$` : `${multiply === 0.25 ? `вы проиграли ${utils.sp(message.args[1] * proigrish1)}$` : `${multiply === 0 ? `вы проиграли ${utils.sp(message.args[1] * 1)}$ ✖` : `${multiply === 0.50 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}`}`}`} (x${multiply})
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
"label": `💎 казино ${message.args[1]}` 
}, 
"color": "positive" 
}] 
] 
})
});

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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`);
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

	if(message.args[2] > message.user.balance) return bot(`у Вас недостаточно денег ${smilekazinobad}`);
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
💰 Ваш баланс: ${message.user.balance}$`);
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
	"label": "🛍 Искать подарки" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🤑 Бизнес" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🍍 Бонус" 
	}, 
	"color": "negative" 
	}], 
	[{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🐾 Питомцы" 
	}, 
	"color": "primary" 
	}, 
	{ 
	"action": { 
	"type": "text", 
	"payload": "{}", 
	"label": "🔥 Топ" 
	}, 
	"color": "primary" 
    }, 
    { 
    "action": { 
    "type": "text", 
    "payload": "{}", 
    "label": "🎲 Помощь" 
    }, 
    "color": "positive" 
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

			В какую дату состоялось открытие @botmeduza (Bot Meduza)?

			Варианты ответа:
			1&#8419; — 21 апреля
			2&#8419; — 25 мая
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
				"label": "21 aпрeля" 
				}, 
				"color": "default" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "25 мaя" 
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

			cmd.hear(/^(?:21 aпрeля)$/i, (message) => { 
				{
					if(message.isChat) return message.send(`[id${message.user.id}|${message.user.tag}], поучавствовать в викторине можно только в ЛС. 🔀`);
					if(message.user.dostuptur == 0) return message.send(`[id${message.user.id}|${message.user.tag}], вы не участвуете в викторине! ${smileerror}\n🔁 Введите «кнопки» что бы включить стандартные кнопки.`);
					if(message.user.tur > 2) return message.send(`[id${message.user.id}|${message.user.tag}], вы уже прошли этот тур. ${smileerror}`);
					message.user.tur = 2;
					return message.send(`[id${message.user.id}|${message.user.tag}], верно! ${smilesuccess} Следующий вопрос:
		
					В какую дату были добавленны денежные принтеры?
					Узнать можно тут — @rezerv_bot (LIVE Bot Meduza)
		
					Варианты ответа:
					1&#8419; — 2 июня
					2&#8419; — 23 августа
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
						"label": "2 июня" 
						}, 
						"color": "default" 
						}, 
						{ 
						"action": { 
						"type": "text", 
						"payload": "{}", 
						"label": "23 августа" 
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

					cmd.hear(/^(?:23 августа)$/i, (message) => { 
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
									
										if(prize2 === 1)
										{
											message.user.balance += 777777777777;
											bot(`вы выиграли 777.777.777.777$ 🙀
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
									
										if(prize2 === 2)
										{
											message.user.rating += 20000;
											bot(`вы выиграли 20.000 РЕЙТИНГА! 💝
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
									
										if(prize2 === 3)
										{
											message.user.balance += 222777222777;
											bot(`вы выиграли 222.777.222.777$ 🙀
											🔁 Введите «кнопки» что бы включить стандартные кнопки.
											
											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
									
										if(prize2 === 4)
										{
											message.user.business = 12;
											message.user.bizlvl = 1;
											bot(`вы выиграли БИЗНЕС 🗺 «Космическое агентство»! 🧙‍♂
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(5973);
										}
									
										if(prize2 === 5)
										{
											message.user.manic = 7;
											bot(`вы выиграли ДЕНЕЖНЫЙ ПРИНТЕР «Giant X10»! 🏃‍♂
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(5973);
										}
									
										if(prize2 === 6)
										{
											message.user.transport.car = 31;
											message.user.balance += 5000000000;
											bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980» и ЦЕЛЫХ 5.000.000.000$! 😯
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(7377);
										}
										if(prize2 === 7)
										{
											message.user.realty.home = 16;
											bot(`вы выиграли УНИКАЛЬНЫЙ ДОМ «Собственная планета»! 😳
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
										if(prize2 === 8)
										{
											message.user.transport.car = 31;
											bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 😳
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(6034);
										}
										if(prize2 === 9)
										{
											message.user.balance += 1000000000000;
											bot(`вы выиграли 1.000.000.000.000$! 🙀
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(7377);
										}
										if(prize2 === 10)
										{
											message.user.transport.car = 31;
											bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 🙀
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
										if(prize2 === 11)
										{
											message.user.balance += 15000000000000;
											bot(`вы выиграли 15.000.000.000.000$ 💛
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(7377);
										}
										if(prize2 === 12)
										{
											message.user.balance += 777777777500;
											bot(`вы выиграли 777.777.777.500$ 💛
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
										if(prize2 === 13)
										{
											message.user.balance += 250000000000;
											bot(`вы выиграли 250.000.000.000$ 💥
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(6034);
										}
										if(prize2 === 14)
										{
											message.user.balance += 777777;
											bot(`вы выиграли 777.777$! 😥
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(5968);
										}
										if(prize2 === 15)
										{
											message.user.transport.car = 31;
											bot(`вы выиграли УНИКАЛЬНЫЙ АВТОМОБИЛЬ «Победитель 1980»! 💥
											🔁 Введите «кнопки» что бы включить стандартные кнопки.

											📢 Что бы не пропускать НОВЫЕ викторины включи уведомления!`);
											return message.sendSticker(8143);
										}
									});

cmd.hear(/^(?:bonusrassilka)\s([^]+)/i, async (message, bot) => {
if(message.user.settings.adm < 6) return;
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].balance += 1000000000; 
} 
} 
return bot(`готово)`); 
});

cmd.hear(/^(?:setwall)\s(.*)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return;

message.args[1] = message.args[1].replace("wall", ""); 
message.args[1] = message.args[1].split('_'); 
wall_to_send = "wall" + message.args[1][0] + "_" + message.args[1][1]; 
return bot(`обновлён пост для рассылки`); 
}); 

cmd.hear(/^(?:rassilka)\s([^]+)/i, async (message, bot) => {
	if(message.user.settings.adm < 7) return;
	
		await bot(`рассылка завершена`);
		users.map(user => {
			if(user.notifications) vk.api.messages.send({ user_id: user.id, message: message.args[1], attachment: wall_to_send, }).then(() => {
				console.log(`SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`NOOOOT ${user.id}`)
			});
		});
	
		for(var i = 1; i < 900; i++) {
			vk.api.messages.send({ peer_id: 2000000000 + i, message: message.args[1], attachment: wall_to_send }).then(() => {
				console.log(`CHAT SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`CHAT NOOOOT ${user.id}`)
		});
	}
});

cmd.hear(/^(?:rassilka2)\s([^]+)/i, async (message, bot) => {
	if(message.user.settings.adm < 7) return;
	message.send(`${message.user.tag}, рассылка начата`);
		users.map(user => {
			if(user.manic < 7) vk.api.messages.send({ user_id: user.id, message: message.args[1],}).then(() => {
				console.log(`SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`NOOOOT ${user.id}`)
			});
		});
	
		for(var i = 1; i < 900; i++) {
			vk.api.messages.send({ peer_id: 2000000000 + i, message: `🎁 3.000.000.000$ за РЕПОСТ!`, attachment: wall_to_send }).then(() => {
				console.log(`CHAT SENDED ${user.id}`)
			}).catch((err) => {
				console.log(`CHAT NOOOOT ${user.id}`)
		});
	}
	await bot(`рассылка завершена`);
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

`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💰 Маник снять` 
}, 
"color": "positive" 
}] 
] 
}) 
});
});

cmd.hear(/^(?:маник|💰 маник)\s(?:снять|собрать)$/i, async (message, bot) => {
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

cmd.hear(/^(?:бизнесы 13)$/i, async (message, bot) => {
	
    const sell = businesses2.find(x=> x.id === Number(1));
	if(!sell) return;
	if(message.user.business2) return bot(`у вас уже есть бизнес "Космические перевозки антиматерии", введите "Продать бизнес"`);

	if(message.user.uran < sell.cost) return bot(`недостаточно антиматерии.`);
	else if(message.user.uran >= sell.cost)
	{
		message.user.uran -= sell.cost;
		message.user.business2 = sell.id;
		message.user.bizlvl2 = 1;
		message.user.biz2 = 0;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)} антиматерии 🌌`);
	}
});

cmd.hear(/^(?:бизнесы|💼 Бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🌯' : '🌯'} 1. Булочная - $50 тыс.
⠀ ⠀ ⠀ Прибыль: 4 тыс$/час
${message.user.business === 2 ? '🍬' : '🍬'} 2. Ларёк - $100 тыс.
⠀ ⠀ ⠀ Прибыль: 15 тыс$/час
${message.user.business === 3 ? '🍵' : '🍵'} 3. Ресторан - $3 млн.
⠀ ⠀ ⠀ Прибыль: 250 тыс$/час
${message.user.business === 4 ? '🛒' : '🛒'} 4. Супермаркет - $50 млн.
⠀ ⠀ ⠀ Прибыль: 3.8 млн$/час
${message.user.business === 5 ? '🏭' : '🏭'} 5. Завод - $150 млн.
⠀ ⠀ ⠀ Прибыль: 4 млн$/час
${message.user.business === 6 ? '💎' : '💎'} 6. Шахта - $250 млн.
⠀ ⠀ ⠀ Прибыль: 7 млн$/час
${message.user.business === 7 ? '🏢' : '🏢'} 7. Офис ВКонтакте - $800 млн.
⠀ ⠀ ⠀ Прибыль: 22 млн$/час
${message.user.business === 8 ? '🕹' : '🕹'} 8. Разработка игр - $1,5 млрд.
⠀ ⠀ ⠀ Прибыль: 30 млн$/час
${message.user.business === 9 ? '⚓' : '⚓'} 9. Порт - $5 млрд.
⠀ ⠀ ⠀ Прибыль: 700 млн$/час
${message.user.business === 10 ? '🔋' : '🔋'} 10. Атомная электростанция - $10 млрд.
⠀ ⠀ ⠀ Прибыль: 800 млн$/час
${message.user.business === 11 ? '📽' : '📽'} 11. Киностудия - $80 млрд.
⠀ ⠀ ⠀ Прибыль: 1.2 млрд$/час
${message.user.business === 12 ? '🗺' : '🗺'} 12. Межпланетный Экспресс - $250 трлн.
⠀ ⠀ ⠀ Прибыль: 150 млрд$/час 
🌌 13. Космические перевозки антиматерии -  1.500 антиматерии
⠀ ⠀ ⠀ 🆕 Этот бизнес можно использовать как второй.
⠀ ⠀ ⠀ Приносит: 80 антиматерии/час.

💡 Вы можете иметь ДВА бизнеса!
❓ Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);
	if(message.args[1] > 12) return;

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= message.args[1])
	{
		message.user.balance -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});


cmd.hear(/^(?:бизнес|🤑 Бизнес|бизнес 1)$/i, async (message, bot) => { 
if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror} 
Для выбора бизнеса отправьте «Бизнесы»`) 

const biz = businesses.find(x=> x.id === message.user.business); 
var lvlcash = biz.earn*message.user.bizlvl; 
return bot(`статистика «${biz.name}»: 
💸 Прибыль: ${utils.sp(lvlcash)}$/час 
💰 На счёте: ${utils.sp(message.user.biz)}$\n\n`,
{ 
keyboard:JSON.stringify( 
{"inline": true,"buttons": [ 
[{ "action": { "type": "text", "payload": "{}", "label": `💰 Бизнес снять` }, 
"color": "default" },
{ "action": { "type": "text", "payload": "{}", "label": `💰 Бизнес снять 2`}, 
"color": "default" 
}] 
] 
}) 
});
});


cmd.hear(/^(?:бизнес 2)$/i, async (message, bot) => {
	if(!message.user.business2) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz2 = businesses2.find(x=> x.id === message.user.business2);
	var lvlcash2 = biz2.earn*message.user.bizlvl2;
	return bot(`статистика «${biz2.name}»: 
🌌 Приносит: ${utils.sp(lvlcash2)} антиматерии/час 
⚖ Добыто: ${utils.sp(message.user.biz2)} антиматерии`, 
{ 
keyboard:JSON.stringify( 
{"inline": true,"buttons": [ 
[{ "action": { "type": "text", "payload": "{}", "label": `💰 Бизнес снять` }, 
"color": "default" },
{ "action": { "type": "text", "payload": "{}", "label": `💰 Бизнес снять 2`}, 
"color": "default" 
}] 
] 
}) 
});
});

cmd.hear(/^(?:💰 бизнес|бизнес)\s(?:снять)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.business) return bot(`простите, но у вас нет бизнеса.`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса!`);

	const biz_balance = message.user.biz;

	message.user.balance += message.user.biz;
	message.user.biz = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)}$`);
});

cmd.hear(/^(?:💰 бизнес|бизнес)\s(?:снять 2)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(!message.user.business2) return bot(`простите, но у вас нет бизнеса.`);
	if(!message.user.biz2) return bot(`у вас нет денег на счёте этого бизнеса!`);

	const biz_balance = message.user.biz2;

	message.user.uran += message.user.biz2;
	message.user.biz2 = 0;

	return bot(`вы сняли со счёта своего бизнеса ${utils.sp(biz_balance)} антиматерии 🌌`);
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

cmd.hear(/^(?:реф|реферал)$/i, async (message, bot) => {
	return bot(`вы пригласили: ${users.filter(x=> x.referal === message.user.uid).length}
	Для того, чтобы вам засчитали друга он должен написать команду "Реф ${message.user.uid}"
	
	За каждого друга вы получаете 10.000.000.000$ (10 млрд)
	Если друг активирует вашу рефералку, то он получит 50.00.000.000$ (50 млрд)`);
});

cmd.hear(/^(?:реф|реферал)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.referal !== null) return bot(`вы уже активировали рефералку!`);
	let user = users.find(x=> x.uid === Number(message.args[1]));

	if(!user) return bot(`неверный ID`);
	if(user.id === message.senderId) return bot(`неверный ID`);

	user.balance += 10000000000;
	message.user.balance += 50000000000;

	message.user.referal = Number(message.args[1]);

	vk.api.messages.send({ user_id: user.id, message: `🎉 Спасибо за приглашение друга в бота!
	💸 Вам начислено 10.000.000.000$ на баланс.` });
	return bot(`вы активировали рефералку.
	💲 Вам начислено 50.000.000.000$`);
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
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.settings.limit);
	
	if(message.user.settings.adm < 4) return bot(`вы не администратор.`); 
	if(!Number(message.args[2])) return; 
	if(message.user.settings.limit < message.args[2]) return bot(`вы можете выдать: ${utils.sp(message.user.settings.limit)} ${smileerror}
		🆘 Лимит восстанавливается каждый час.`); 
	message.args[2] = Math.floor(Number(message.args[2])); 
	if(message.args[2] <= 0) return; 
	
	{ 

		let user = users.find(x=> x.uid === Number(message.args[1])); 
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
		const bilo = utils.sp(user.balance);
		if(message.args[2] > message.user.settings.limit) return bot(`вы можете выдать: ${utils.sp(message.user.settings.limit)} ${smileerror}
		🆘 Лимит восстанавливается каждый час.`);

		message.user.settings.limit -= message.args[2];
		user.balance += message.args[2];

		await bot(`зачисляю игроку [id${user.id}|${user.tag}] ${utils.sp(message.args[2])}$ ${smilesuccess}

		💸 Старый баланс: ${bilo}$
		💸 Новый баланс: ${utils.sp(user.balance)}$`);
vk.api.messages.send({ user_id: user.id, message: `📢 Администратор [id${message.user.id}|${message.user.tag}] выдал вам ${utils.sp(message.args[2])}$!\n💸 На руках: ${utils.sp(user.balance)}$` });
}
});


cmd.hear(/^(?:Бан)\s(.*)\s([^]+)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
if(message.chatId !== 39) return bot(`данная команда доступна только в админ-чате.`)
if(message.user.settings.adm < 3) return bot(`dont have permission`); 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

if(message.user.settings.adm < user.settings.adm) return bot(`you dont have permission to banned this admin`); 


user.ban = true
user.settings.reason = `${message.args[2]}`;

saveAll();
await bot(`вы забанили игрока *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `ваш аккаунт заблокирован за игровые нарушения администратором [id${message.user.id}|${message.user.tag}]
	✉ комментарий от администратора: «${message.args[2]}»

	🆘 Если вы считаете, что блокировка была выдана не правильно - пишите в поддержку.` }); 
}
});


cmd.hear(/^(?:Разбан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
if(message.chatId !== 39) return bot(`данная команда доступна только в админ-чате.`)
if(message.user.settings.adm < 3) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

saveAll();
await bot(`вы разбанили игрока *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:сн)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm <= 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

await bot(`игроку *id${user.id} (${user.tag}) установлен ник. &#9989;`); 
user.tag = `СМЕНИТЕ НИК`;

saveAll();
}
});

cmd.hear(/^(?:лник)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm <= 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.nicklimit = 30; 

saveAll();
await bot(`игроку *id${user.id} (${user.tag}). выдан лимит на ник до 30 символов. &#9989;`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит на ник до 30 символов администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:копать)$/i, async (message, bot) => { 

return bot(`использование: «копать железо/золото/алмазы/антиматерию» ${smileerror}`);

});

cmd.hear(/^(?:копать железо|🎛 Копать железо)$/i, async (message, bot) => { 

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);
let a = 0;
if(message.user.zelya === 2) a += 45;

message.user.energy -= 1;
message.user.opit += 1;
message.user.zhelezo += randzhelezo;
message.user.zhelezo += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🎛 Копать железо` 
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randzhelezo} железа.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🎛 Копать железо` 
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

cmd.hear(/^(?:копать золото|🏵 Копать золото)$/i, async (message, bot) => { 

if(message.user.opit < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);
let a = 0;
if(message.user.zelya === 2) a += 15;

message.user.energy -= 1;
message.user.opit += 2;
message.user.zoloto += randzoloto;
message.user.zoloto += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🏵 Копать золото`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randzoloto} золота.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🏵 Копать золото`
}, 
"color": "positive" 
}] 
] 
})
});

}

});

cmd.hear(/^(?:копать алмазы|💎 Копать алмазы)$/i, async (message, bot) => { 

if(message.user.opit < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(1, 4);
let a = 0;
if(message.user.zelya === 2) a += 2;

message.user.energy -= 1;
message.user.opit += 3;
message.user.almaz += randalmaz;
message.user.almaz += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💎 Копать алмазы`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);
return bot(`+${randalmaz} алмазов.
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💎 Копать алмазы`
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

cmd.hear(/^(?:копать антиматерию|🌌 Копать антиматерию)$/i, async (message, bot) => { 

if(message.user.opit < 99999) return bot(`что бы копать антиматерию нужно больше 100 000 опыта. Копайте железо/золото/алмазы и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randuran = utils.random(1, 2);
let a = 0;
if(message.user.zelya === 2) a += 1;

message.user.energy -= 1;
message.user.opit += 50;
message.user.uran += randuran;
message.user.uran += a;

saveAll();

if(message.user.energy > 0) return bot(`+${randuran} антиматерии. 🌌
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🌌 Копать антиматерию`
}, 
"color": "positive" 
}] 
] 
}) 
});

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 3000000);

return bot(`+${randuran} антиматерии. 🌌
Энергия закончилась. ⚠`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🌌 Копать антиматерию`
}, 
"color": "positive" 
}] 
] 
}) 
});

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zhelezo)} железа. 🎛`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🎛 Копать железо` 
}, 
"color": "positive" 
}] 
] 
}) 
});
});

cmd.hear(/^(?:опыт)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.opit)} опыта. 🏆`);

});

cmd.hear(/^(?:алмазы)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.almaz)} алмазов. 💎`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `💎 Копать алмазы`
}, 
"color": "positive" 
}] 
] 
}) 
});
});

cmd.hear(/^(?:антиматерия)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.uran)} антиматерии 🌌`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🌌 Копать антиматерию`
}, 
"color": "positive" 
}] 
] 
}) 
});
});



cmd.hear(/^(?:лимит)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 10) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.settings.limit = 500000000000; 
	
	saveAll();
	await bot(`лимит увеличен до 500.000.000.000$`); 
	}
	});

cmd.hear(/^(?:autodonateunban)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.ban = false; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "РАЗБАН".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ Вы приобрели "РАЗБАН", спасибо за покупку!` }); 
}
});

cmd.hear(/^(?:autodonatevip)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 10) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.settings.adm = 2; 
	user.farmslimit = 5000; 
	user.nicklimit = 30; 
	
	saveAll();
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "VIP - Игрока".`); 
	vk.api.messages.send({ user_id: user.id, message: `💥 Вы теперь имеете постоянный VIP-статус! \n\nРекомендуем присоедениться в беседу VIP: ` }); 
	}
	});

cmd.hear(/^(?:autodonateadministrator)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 3; 
user.farmslimit = 634853264865274589238465283457823546283567823468; 
user.nicklimit = 30; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "АДМИНИСТРАТОРА".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ Вы приобрели привилегию "АДМИНИСТРАТОР", спасибо за покупку! \n\nРекомендуем присоедениться в беседу администрации: https://vk.cc/9E0rEI`});
}
});

cmd.hear(/^(?:autodonate100kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 100000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "100.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ На ваш счёт зачислена валюта "100.000.000.000$ 💰", спасибо за покупку!` }); 
}
});

cmd.hear(/^(?:autodonate50kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 50000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "50.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ На ваш счёт зачислена валюта "50.000.000.000$ 💴", спасибо за покупку!` }); 
}
});

cmd.hear(/^(?:autodonate15kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 15000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "15.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ На ваш счёт зачислена валюта "15.000.000.000$ 💸", спасибо за покупку!` }); 
}
});

cmd.hear(/^(?:autodonatecase5)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 10) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.case4 += 1; 
	
	saveAll();
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл CASE.`); 
	vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ Спасибо за покупку Супер Сундука!\n\nВсе пожертвованные вами деньги пойдут на развитие бота.` }); 
	}
	});
	
	cmd.hear(/^(?:autodonatecase1)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 120) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.case1 += 1; 
	
	saveAll();
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл Новогодний подарок.`); 
	vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ Спасибо за участие в акции.` }); 
	}
	});
	
	cmd.hear(/^(?:autodonatecase6)\s(.*)$/i, async (message, bot) => { 
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(message.user.settings.adm < 9) return;
	
	{ 
	let user = users.find(x=> x.uid === Number(message.args[1])); 
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 
	
	user.case6 += 1; 
	
	saveAll();
	await bot(`пользователь *id${user.id} (${user.tag}) приобрёл Новогодний кейс.`); 
	vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `✅ Спасибо за покупку Новогднего сундука!\n\nВсе пожертвованные вами деньги пойдут на развитие бота.` }); 
	}
	});

cmd.hear(/^(?:upload)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;
if(message.user.settings.adm < 7) return;
    message.send(`идёт сохраниние базы данных... <...>`);
	message.send(`игроки сохранены <...>`);
	message.send(`кланы сохранены <...>`);
	message.send(`Бот уходит в перезагрузку... <node app>`);
    return message.sendSticker(6849);

	await saveAll();
	process.exit(-1);
});

cmd.hear(/^(?:uploads)$/i, async (message, bot) => {
if(message.user.settings.adm < 5) return;
    await message.send(`Бот выключен.`);

	process.exit(-1);
});

cmd.hear(/^(?:autodonatebiz)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.business = 12; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "Лучший бизнес.".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-189251787_457239055', message: `[${user.id}|${user.tag}], вы приобрели бизнес «🖨 Межпланетный Экспресс» за 119 рублей.\n\n🔥 Это лучший игровой бизнес которого НЕТ В ПРОДАЖЕ с прибылью в 150.000.000.000$/час игровой валюты!` }); 
}
});

cmd.hear(/^(?:победа2)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.bizlvl = 1;
user.business = 12; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) выиграл "лучший бизнес «Космическое Агенство».".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🗺 Вы выиграли в конкурсе лучший бизнес «Космическое Агенство».` }); 
}
});

cmd.hear(/^(?:победа3)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.manic = 7;

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) выиграл "денежный принтер «Giant X10»".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🖨 Вы выиграли в конкурсе денежный принтер «Giant X10».` }); 
}
});

cmd.hear(/^(?:победа4)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 6500000000000;

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) выиграл "6.500.000.000.000$".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n💰 Вы выиграли в конкурсе «6.500.000.000.000$». \n❤ Приз уже на вашем балансе!` }); 
}
});

cmd.hear(/^(?:победа5)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 1000000000000;

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) выиграл "1.000.000.000.000$".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n💰 Вы выиграли в конкурсе «1.000.000.000.000$». \n❤ Приз уже на вашем балансе!` }); 
}
});

cmd.hear(/^(?:победа1)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 3;

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) выиграл "ADMINISTRATOR.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], спешим порадовать! ☺\n\n🚶‍♂ Вы выиграли в конкурсе права «ADMINISTRATOR».` }); 
}
});

cmd.hear(/^(?:autodonatemanic)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 9) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.manic = 7; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) выдан "Лучший маник.".`); 
vk.api.messages.send({ user_id: user.id, message: `[${user.id}|${user.tag}], вы приобрели денежный принтер «Giant X10» за 59 рублей.\n\n💎 Это лучший денежный принтер которого НЕТ В ПРОДАЖЕ с прибылью в 1.250.000.000$/час игровой валюты.\n🔋 Батарея разряжается в 4 раза дольше.\n💧 Полностью отсутствует перегрев, принтер выдается НАВСЕГДА!` }); 
}
});

cmd.hear(/^(?:сбросить фермы)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 6) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.farm = 0; 
user.farms = 0; 
user.farm_btc = 0; 
user.farmslimit = 2000;

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшенны фермы.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:banper)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.user.settings.adm < 3) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

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
		
		🔑 Перейти к оплате: @develiseev (Артём Елисеев)
		
		🆘 При оплате вам необходимо ввести свой ID.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.settings.trade = false;

	return bot(`(${user.tag}) был лишён права передавать деньги.`);
}
	});

cmd.hear(/^(?:unbanper)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.user.settings.adm < 3) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

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
		
		🔑 Перейти к оплате: @develiseev (Артём Елисеев)
		
		🆘 При оплате вам необходимо ввести свой ID.`);
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
};
if(clans[clanid].lvl == 1) {
lv += `2`;
mp += `15`;
cost = `🆕 Улучшение клана до 3 уровня стоит 500.000.000.000$`;
};
if(clans[clanid].lvl == 2) {
lv += `3`;
mp += `25`;
cost = `🆕 Улучшение клана до 4 уровня стоит 2.500.000.000.000$`;
};
if(clans[clanid].lvl == 3) {
lv += `4`;
mp += `50`;
cost = `🆒 Клан улучшен максимально.`;
};55
if(clans[clanid].open == true) tipe += `🔓 Клан открыт, свободный для входа`;
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
if(message.user.balance < 100000000000) return bot(`улучшение клана до 2 уровня стоит 100.000.000.000$`);
message.user.balance -= 100000000000;
clans[clanid].lvl = 1;
return bot(`клан улучшен до 2 уровня за 100.000.000.000$!

👪 Максимальное количество участников увеличено до - 15
🗣 Максимальная длина названия клана увеличена до - 10 символов
🆕 Следующее улучшение стоит 500.000.000.000$`);
};
if(clans[clanid].lvl == 1) {
if(message.user.balance < 500000000000) return bot(`улучшение клана до 3 уровня стоит 500.000.000.000$`);
message.user.balance -= 500000000000;
clans[clanid].lvl = 2;
return bot(`клан улучшен до 3 уровня за 500.000.000.000$!

👪 Максимальное количество участников увеличено до - 25
🗣 Максимальная длина названия клана увеличена до - 13 символов
🆕 Следующее улучшение стоит 2.500.000.000.000$`);
};
if(clans[clanid].lvl == 2) {
if(message.user.balance < 2500000000000) return bot(`улучшение клана до 4 уровня стоит 2.500.000.000.000$`);
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
};
if(clans[clanid].lvl == 1) {
mp += `15`;
};
if(clans[clanid].lvl == 2) {
mp += `25`;
};
if(clans[clanid].lvl == 3) {
mp += `50`;
};
if(clans[clanid].lvl == 4) {
mp += `100`;
};

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
if(message.args[1].length >= 20) return bot(`максимальная длина названия клана 20 символов`);
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
clanowner: message.user.uid,
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
if(message.args[1].length >= 20) return bot(`максимальная длина названия клана 20 символов`);
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
if(clans[clanid].users[message.user.uid].level < 2) return bot(`открывать клан может заместитель клана и выше!`);
if(clans[clanid].open == true) return bot(`клан уже открытый!`)
clans[clanid].open = true;
return bot(`вы успешно открыли клан!`);
});

cmd.hear(/^(?:клан закрыть)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
	❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`закрывать клан может заместитель клана и выше!`);
if(clans[clanid].open == false) return bot(`клан уже закрытый!`)
clans[clanid].open = false;
return bot(`вы успешно закрыли клан!`);
});

cmd.hear(/^(?:клан)\s(?:пополнить)\s(.*)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
	❓ Для вступления введите «Клан войти [ID]»`);
if(message.user.settings.adm > 3) return bot(`администратор не может пополнять клан. 🚫`);
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

cmd.hear(/^(?:клан)\s(?:снять)\s(.*)$/i, async (message, bot) => {
let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана!
	❓ Для вступления введите «Клан войти [ID]»`);
if(clans[clanid].users[message.user.uid].level < 2) return bot(`снимать деньги клана может заместитель клана и выше!`);
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, clans[clanid].balance);

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return;

if(message.args[1] > clans[clanid].balance) return bot(`на балансе клана нет данной суммы ${smileerror}`);
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
if(clans[clanid].users[message.user.uid].level <= 2) return bot(`повышать может только создатель клана!`);


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
if(clans[clanid].users[message.user.uid].level < 2) return bot(`понижать может только создатель клана!`);
if(clans[clanid].users[message.user.uid].level < clans[clanid].users[user.uid].level) return bot(`нельзя понижать тех, кто выше вас по званию!`);


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
if(clans[clanid].users[message.user.uid].level < 2) return bot(`кикать может только создатель клана!`);
if(clans[clanid].users[message.user.uid].level < clans[clanid].users[user.uid].level) return bot(`нельзя исключать тех, кто выше вас по званию!`);


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
clans[clanid].peoples -=
 
1;
message.user.clanid = false;
delete clans[clanid].users[message.user.uid];
return bot(`вы покинули клан!`);

});

cmd.hear(/^(?:статистика бота|стата|статистика)/i, async (message) => {
	if(message.user.settings.adm < 3) return;
	
    let s = 0;
    let f = 0;
    for(i in users) {
    	s += users[i].balance
    	f += users[i].ban
    }
        message.send(`Подробная статистика «Bot Drakon» на сегодня (${data()} ${time()}):
        	🌐 Всего игроков: ${users.length}
        	🚫 Заблокированных игроков: ${f}
        	💰 Всего денег: ${utils.sp(s)}$
        	💬 Принято всего сообщений: ${utils.sp(botinfo.msg)}`)
});


cmd.hear(/^(?:обнулить)\s([0-9]+)$/i, async (message, bot) => {
if(message.isChat) return bot(`команда работает только в ЛС.`);
	if(message.user.settings.adm < 7) return bot(`вы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

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
		
		🔑 Перейти к оплате: 
		
		🆘 При оплате вам необходимо ввести свой ID.`);
		{
					let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		user.balance = 50000000,
		user.bank=50000,
		user.btc=0,
		user.farm_btc=0,
		user.farms=0,
		user.farmslimit=1000,
		user.manic_farm=0,
		user.manic=0,
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
		user.settings.pet.poterl=false,
		user.marriage.partner=0;

		return bot(`${user.tag} полностью удалён из базы.`);
}
	});


cmd.hear(/^(?:поиск)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => { 
if(message.user.settings.adm < 3) return bot(`ввы заинтересовались покупкой товара «🔥 АДМИНИСТРАТОР» за 349 рублей.

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
	
	🔑 Перейти к оплате: @develiseev (Артём Елисеев)
	
	🆘 При оплате вам необходимо ввести свой ID.`);
var domain = message.args[2].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[2] 
}).then((res) => { 
let user = users.find(x=> x.id === Number(res.object_id)); 
if(!user) return bot(`неверная ссылка ${smileerror}`); 

return bot(`ID игрока : ${user.uid}\nНик игрока: ${user.tag}\nПодробнее по команде "Статистика ${user.uid}"`); 
}) 
});

cmd.hear(/^(?:золото)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.zoloto)} золота. 🏵`
	, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🏵 Копать золото`
}, 
"color": "positive" 
}] 
] 
}) 
});
});

cmd.hear(/^(?:зелья|зелье)\s?([0-9]+)?$/i, async (message, bot) => { 
if(!message.args[1]) return bot(`список зелий: 

 🍀 Зелье удачи (1.000.000.000.000$) 
 🛒Купить: "зелья 1" 

 ⚒ Зелье шахтера (100.000.000.000$) 
 🛒Купить: "зелья 2" 

 ❌ Зелье неудачи (50.000.000.000$) 
 🛒Купить: "зелья 3" 

 🥛 Молоко против зелья (1.000.000.000$) 
 🛒Купить: "купить молоко"`); 

const sell = zelya.find(x=> x.id === Number(message.args[1])); 
if(!sell) return; 
if(message.user.balance < sell.cost) return bot(`у Вас недостаточно денег ${smileerror}`);
if(message.user.zelya != 0) return bot(`вы уже под действием зелья `);
if(message.args[1] > 3) return bot(`введите номер зелья от 1 до 3`) 
else if(message.user.balance >= message.args[1]) 
{ 
message.user.balance -= sell.cost; 
message.user.zelya = sell.id; 
setTimeout(() => { 
message.user.zelya =0; 
}, 600000);

return bot(`вы успешно выпили "${sell.name}" за ${utils.sp(sell.cost)}$ ${smileerror}🍸`); 
} 
});

cmd.hear(/^(?:купить молоко)/i, async (message, bot) => {
if(message.user.balance < 1000000000) return bot(`недостаточно денег`);

message.user.zelya = 0;
message.user.balance -= 1000000000;

return bot(`Вы выпили молоко от зелий 🥛`);
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

if(situac === 1)
{

let hackcash = utils.random(156781,451981);
message.user.balance += hackcash;
message.user.timers.hack = 3600;

return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! ✅ Вы заработали ${utils.sp(hackcash)}$`,{attachment: `photo-181406058_457239343`});

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.balance += hackcash;
message.user.timers.hack = 6000;

return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. ✅ Вы заработали ${utils.sp(hackcash)}$`);

}

if(situac === 3)
{

return bot(`вы целый месяц планировали ограбление банка, настал этот день и вы пошли грабить банк в одиночку, но вас в него не впустили, оказывается он закрылся пару недель назад.`);

}

});

// ---------------------------------- РАЗДАЧИ ------------------------- //

cmd.hear(/^(?:раздача_бабки)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;
if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
giving = true;
user.api.wall.post({
owner_id: -191380914,
message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит $100 млрд 💸 на свой аккаунт!
		Беседа с ботом: vk.cc/aiIOXh
		
		🔍 Посылки с подаром будут отправлены ровно в 48 часов МСК, Ваш профиль ВК должен быть открыт.`,
attachments: ' '
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*акция действует ровно сутки.',
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
user.balance += 100000000000;
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! \n\n Вы получили $100 млрд бабла на свой игровой баланс!`, attachment:'photo556842930_457239257' });
vk.api.messages.send({ user_id: 556842930 , message: ``})
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
giving = false;
}, 86400000);
});
await bot(`раздача начата`);
});

cmd.hear(/^(?:раздача_питомец)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;
if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
giving = true;
user.api.wall.post({
owner_id: -191380914,
message: `🍍 Новая РАЗДАЧА! Каждый, кто сделает РЕПОСТ данной записи гарантированно получит серкретного питомца на свой аккаунт! Акция действует ровно сутки.`,
attachments: 'photo-191380914_457239042'
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*для участия в акции ваш профиль ВК должен быть открыт, иначе мы не увидим ваш репост.',
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
user.misc.pet = 9;
user.pet.lvl = 1;
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! \n\n Вы получили секретного питомца №1 за участие в раздаче. 🦇 Подробнее: «питомец»`, attachment:'photo-191380914_457239041' });
vk.api.messages.send({ user_id: 556842930 , message: ``})
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
giving = false;
}, 86400000);
});
await bot(`раздача начата`);
});

cmd.hear(/^(?:раздача_фермы)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;
if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
giving = true;
user.api.wall.post({
owner_id: -191380914,
message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит 10 ферм FM2018-BT200 на свой аккаунт.
		Беседа с ботом: vk.cc/aiIOXh
		
		🔍 Посылки с подарком будут отправлены ровно в 48 часов МСК, Ваш профиль ВК должен быть открыт.`,
attachments: ' '
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '🔔 Включи уведомления о новых записях, что бы не пропускать новые крутые раздачи!',
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
user.misc.farm = 3
user.farms += 10;
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! \n\n Вы получили 10 ферм FM2018-BT200!`, attachment:'photo556842930_457239257' });
vk.api.messages.send({ user_id: 556842930 , message: ``})
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
giving = false;
}, 86400000);
});
await bot(`раздача начата`);
});

cmd.hear(/^(?:раздача_антиматерия)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;
if(giving) return message.send(`вы не можете начать новую раздачу, пока предыдущая не закончилась`);
giving = true;
user.api.wall.post({
owner_id: -191380914,
message: `🔥 Новая раздача!
		Каждый, кто сделает РЕПОСТ гарантированно получит 10 антиматерии на свой аккаунт. 🌌
		Беседа с ботом: vk.cc/aiIOXh
		
		🔍 Посылки с подаром будут отправлены через 24 часа по МСК, Ваш профиль ВК должен быть открыт.`,
attachments: 'photo-191380914_457239037'
}).then((response) => {
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -191380914,
post_id: response.post_id,
from_group: 191380914,
message: '*акция действует ровно сутки.',
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
user.uran += 10;
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в раздаче! \n\n Вы получили 10 антиматерии 🌌 на свой аккаунт.`, attachment:'photo556842930_457239257' });
vk.api.messages.send({ user_id: 556842930 , message: ``})
});
});
user.api.wall.openComments({
owner_id: -191380914,
post_id: response.post_id
});
user.api.wall.closeComments({
owner_id: -191380914,
post_id: response.post_id
});
giving = false;
}, 86400000);
});
await bot(`раздача начата`);
});

cmd.hear(/^(?:кикнуть|кик)\s(\s?https\:\/\/vk\.com\/)?([^]+)?$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе ${smileerror}`);
if(message.user.settings.adm < 3) return;
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
let text3 = ``; 
user.api.messages.getChat({ 
chat_id: 108
}).then(async function (response) { 
text1 += `1&#8419; ${response.title} [${response.members_count}/500]\n> vk.cc/aiIOXh`; 
user.api.messages.getChat({ 
chat_id: 109
}).then(async function (response) { 
text2 += `2&#8419; ${response.title} [${response.members_count}/500]\n> vk.cc/aiIPWO`;
user.api.messages.getChat({ 
chat_id: 110
}).then(async function (response) { 
text3 += `3&#8419; ${response.title} [${response.members_count}/500]\n> vk.cc/aiIQUM`; 
return bot(`наши официальные беседы: 

${text1}
${text2}
${text3}

💬 Кол-во участников обновляется в автоматическом режиме`); 
}); 
}); 
});
});

cmd.hear(/^(?:секретный питомец)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.pet = 9
user.pet.lvl = 1;

await bot(`пользователь *id${user.id} (${user.tag}) получил секретного питомца №1.`); 
vk.api.messages.send({ user_id: user.id, message: `🦇 Вы получили питомца «Летучая мышь» от администратора «*id${message.user.id} (${message.user.tag})»` }); 
}
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

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);
	let bablo = utils.pick([39000000000, 51000000000, 39000000000, 51000000000, 39000000000, 51000000000, 39000000000, 51000000000, 39000000000, 51000000000, 39000000000, 51000000000, 39000000000, 51000000000, 78000000000, 98000000000, 108000000000, 42000000000, 350000000000, 61000000000])

	if(prize2 === 1)
	{
		message.user.opit += 32;
		return bot(`вы выиграли 32 опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 2)
	{
		message.user.opit += 11;
		return bot(`вы выиграли 11 опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 3)
	{
		message.user.opit += 50;
		return bot(`вы выиграли 50 опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 4)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 5)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 6)
	{
		message.user.rating += 384;
		return bot(`вы выиграли 384 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 7)
	{
		message.user.rating += 154;
		return bot(`вы выиграли 154 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 8)
	{
		message.user.case1 += 1;
		return bot(`вы выиграли «Начинающий» кейс! 📦 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 1` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
});

cmd.hear(/^(?:открыть 2|сундук открыть 2|кейс открыть 2)$/i, async (message, bot) => {

	if(message.user.case2 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case2 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
	let opitik = utils.pick([324, 141, 254, 174, 401, 224])
	let bablo = utils.pick([2400000000000, 2400000000000, 2400000000000, 2400000000000, 2400000000000, 2400000000000, 2400000000000, 3100000000000, 3100000000000, 3100000000000, 3100000000000, 4800000000000, 7000000000000, 12000000000000, 15000000000000])

	if(prize2 === 1)
	{
		message.user.opit += opitik;
		return bot(`вы выиграли ${opitik} опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 2)
	{
		message.user.opit += opitik;
		return bot(`вы выиграли ${opitik} опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 3)
	{
		message.user.opit += opitik;
		return bot(`вы выиграли ${opitik} опыта 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 4)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 5)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 6)
	{
		message.user.rating += 32000;
		return bot(`вы выиграли 32.000 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 7)
	{
		message.user.rating += 11390;
		return bot(`вы выиграли 11.390 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 8)
	{
		message.user.case2 += 1;
		return bot(`вы выиграли «Платинум» кейс, вам крупно повезло! 📦 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 9)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 10)
	{
		message.user.rating += 7722;
		return bot(`вы выиграли 7.772 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 11)
	{
		message.user.rating += 14039;
		return bot(`вы выиграли 14.039 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 12)
	{
		message.user.balance += bablo;
		return bot(`вы выиграли ${utils.sp(bablo)}$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 13)
	{
		message.user.rating += 24084;
		return bot(`вы выиграли 24.084 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 14)
	{
		message.user.rating += 32741;
		return bot(`вы выиграли 32.741 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 2` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
});

cmd.hear(/^(?:открыть 3|сундук открыть 3|кейс открыть 3)$/i, async (message, bot) => {

	if(message.user.case3 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case3 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

	if(prize2 === 1)
	{
		message.user.opit += 122;
		return bot(`вы выиграли 122 опыта 🏆 ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 6)
	{
		message.user.rating += 1236;
		return bot(`вы выиграли 1.236 рейтинга 🔥 ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 7)
	{
		message.user.rating += 1254;
		return bot(`вы выиграли 1.254 рейтинга 🔥 ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 8)
	{
		message.user.rating += 3314;
		return bot(`вы выиграли 3.314 рейтинга 🔥 ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 2)
	{
		message.user.opit += 258;
		return bot(`вы выиграли 258 опыта 🏆 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 3)
	{
		message.user.opit += 350;
		return bot(`вы выиграли 350 опыта 🏆 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 4)
	{
		message.user.balance += 2000000000000;
		return bot(`вы выиграли 2.000.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 5)
	{
		message.user.balance += 5500000000000;
		return bot(`вы выиграли 5.500.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 3` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
});

cmd.hear(/^(?:открыть 4|сундук открыть 4|кейс открыть 4)$/i, async (message, bot) => {

	if(message.user.case4 == 0) return bot(`у вас нет кейсов ${smileerror}.`); 
	message.user.case4 -= 1;

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14]);

	if(prize2 === 1)
	{
		message.user.opit += 154;
		return bot(`вы выиграли 154 опыта 🏆 ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 2)
	{
		message.user.opit += 454;
		return bot(`вы выиграли 454 опыта 🏆 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 3)
	{
		message.user.opit += 324;
		return bot(`вы выиграли 324 опыта 🏆 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 4)
	{
		message.user.balance += 5000000000000;
		return bot(`вы выиграли 5.000.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 5)
	{
		message.user.balance += 10000000000000;
		return bot(`вы выиграли 10.000.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 6)
	{
		message.user.btc += 100000000;
		return bot(`вы выиграли 100.000.000 биткоинов ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 10)
	{
		message.user.rating += 11272;
		return bot(`вы выиграли 11.272 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 11)
	{
		message.user.rating += 13429;
		return bot(`вы выиграли 13.429 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 12)
	{
		message.user.balance += 3500000000000;
		return bot(`вы выиграли 3.500.000.000.000$ ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}

	if(prize2 === 13)
	{
		message.user.rating += 86324;
		return bot(`вы выиграли 83.264 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
	if(prize2 === 14)
	{
		message.user.rating += 24321;
		return bot(`вы выиграли 24.321 рейтинга 👑 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `Кейс открыть 4` 
}, 
"color": "positive" 
}] 
] 
}) 
});
	}
});

cmd.hear(/^(?:кейс инфо 1)/i, async (message) => {
return message.send(`🔥 Из «Начинающего» кейса может выпасть:
1⃣ Опыт 
2⃣ Рейтинг 
3⃣ Игровая валюта`)

});

cmd.hear(/^(?:кейс инфо 2)/i, async (message) => {
return message.send(`🔥 Из «Платинум» кейса может выпасть: 

1⃣ Опыт 
2⃣ Рейтинг 
3⃣ Игровая валюта

*в отличии от начинающего кейса, в платинум кейсе выпадают призы в 50-ти кратном размере.`)

});

cmd.hear(/^(?:сундуки|кейсы|📦 кейсы|📦 сундуки)$/i, async (message, bot) => {
		let text = ``;
	
text += `\n1&#8419; Начинающий кейс - 50 млрд$
📜 Информация -  «кейс инфо 1»
🛒 Купить: «кейсы 1 [кол-во]»\n\n`;
text += `2&#8419; Платинум кейс - 3 трлн$
📜 Информация -  «кейс инфо 2»
🛒 Купить: «кейсы 2 [кол-во]»\n\n`;

if(message.user.case1 || message.user.case2 || message.user.case3 || message.user.case4)
{
text += `\n🛍 В вашем инвентаре:\n\n`;
if(message.user.case1) text += `⠀⠀ 📦 Начинающий кейс (${utils.sp(message.user.case1)} шт.)\n⠀⠀ 📜 Открыть: «кейс открыть 1»\n`;
if(message.user.case2) text += `⠀⠀ 📦 Платинум кейс (${utils.sp(message.user.case2)} шт.)\n⠀⠀ 📜 Открыть: «кейс открыть 2»\n`;
if(message.user.case3) text += `⠀⠀ 📦 Донат кейс (${utils.sp(message.user.case3)} шт.)\n⠀⠀ 📜 Открыть: «кейс открыть 3»\n`;
if(message.user.case4) text += `⠀⠀ 📦 VIP - кейс (${utils.sp(message.user.case4)} шт.)\n⠀⠀ 📜 Открыть: «кейс открыть 4»\n`;
}

return bot(`сундуки:\n${text}`);

		});


	cmd.hear(/^(?:кейсы 1)\s(.*)$/i, async (message, bot) => {
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

let case1price = message.args[1]*50000000000;

if(message.user.balance < case1price) return bot(`недостаточно средств для покупки x${message.args[1]} «Начинающих» сундуков.`);


if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`);
    else if(message.args[1] < case1price)
        {
		message.user.balance -= case1price;
		message.user.case1 += message.args[1];

	bot(`вы купили x${message.args[1]} «Начинающих» кейсов за ${utils.sp(case1price)}$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «кейсы»`);
	return message.sendSticker(16432);
	}
});

cmd.hear(/^(?:кейсы 2)\s(.*)$/i, async (message, bot) => {
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

let case2price = message.args[1]*3000000000000;

if(message.user.balance < case2price) return bot(`недостаточно средств для покупки x${message.args[1]} «Платинум» кейсов.`);


if(message.args[1] > message.user.balance) return bot(`на вашем балансе нет столько денег. ${smilesuccess}`);
    else if(message.args[1] < case2price)
        {
		message.user.balance -= case2price;
		message.user.case2 += message.args[1];

	bot(`вы купили x${message.args[1]} «Платинум» кейсов за ${utils.sp(case2price)}$ 🛍
			
			💎 Инвентарь сундуков можно посмотреть, введя «кейсы»`);
	return message.sendSticker(16432);
	}
});

cmd.hear(/^(?:restart)$/i, async (message, bot) => {
	if(message.user.settings.adm < 7) return;
	await bot(`идёт сохраниние базы данных... <...>`);
	await bot(`игроки сохранены <...>`);
	await bot(`кланы сохранены <...>`);
	await bot(`Бот уходит в перезагрузку... <node app>`); 6849

	await saveAll();
	process.exit(-1);
	console.log("node app")
});

cmd.hear(/^(?:сбросить баланс)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.balance = 0; 
user.balance = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшен баланс.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:autodonate100kkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 100000000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "100.000.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "100.000.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: ` }); 
}
});

cmd.hear(/^(?:сбросить рейтинг)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.rating = 0; 
user.rating = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшен рейтинг.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:выговор)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return; 

if(message.args[2] < 1) return;
{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.vig = true; 

saveAll();
await bot(`вы выдали игроку выговор *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `вам выдали выговор за игровые нарушения администратором [id${message.user.id}|${message.user.tag}] ⛔` }); 
}
});


cmd.hear(/^(?:сделатьраздачубаланс)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 5) return bot(`вы не администратор. ${smileerror}`);
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].balance += 2500000000;
} 
} 
return bot(`готово!`);
});


cmd.hear(/^(?:givebank10kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.bank += 10000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "10.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "10.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: ` }); 
}
});

cmd.hear(/^(?:giverub)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.rub += 100; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "100 рублей".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "10.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме на нашем сайте: ` }); 
}
});

cmd.hear(/^(?:сбросить банк)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.bank = 0; 
user.bank = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшен банк.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:autodonate500kkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 500000000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "500.000.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "500.000.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме в нашей группе` }); 
}
});

cmd.hear(/^(?:сбросить опыт)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.opit = 0; 
user.opit = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшен опыт.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:autodonate750kkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 7500000000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "750.000.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "750.000.000.000.000$ 💸", спасибо за покупку! \n\nОплата любых покупок происходит в автоматическом режиме в нашей группе` }); 
}
});
	
cmd.hear(/^(?:autodonate1kkkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.balance += 10000000000000000; 

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) приобрёл "1.000.000.000.000.000".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ На ваш счёт зачислена валюта "1.000.000.000.000.000$ 💸", спасибо за покупку!` }); 
}
});



cmd.hear(/^(?:топ баланс)$/i, async (message, bot) => {
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

cmd.hear(/^(?:очистить чат)$/i, async (message, bot) => {
	message.user.foolder += 1;
				if(message.user.settings.adm < 2) return bot(`доступно с привилегии - Vip-status.`);
		return message.send("&#4448;\n".repeat(200) + "Я очистил чат от лишних сообщений!");
});

cmd.hear(/^(?:sms)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 7) return;

const user = await users.find(x=> x.uid === Number(message.args[1]));
if(!user) return;
await bot(`вы сказали игроку ${user.tag} ${message.args[2]}`);
vk.api.messages.send({ user_id: user.id, message: `✉ Администратор Сказал вам: ${message.args[2]}` });
});



cmd.hear(/^(?:gladmin)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 5; 
user.farmslimit = Infinity; 
user.nicklimit = 30; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) был выдан «Head Administrator».`); 
vk.api.messages.send({ user_id: user.id, message: `✅ Вам выдали права «Head Administator», удачно отстоять срок` }); 
}
});

cmd.hear(/^(?:admin)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 4; 
user.farmslimit = Infinity; 
user.nicklimit = 30; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) был выдан «Administator».`); 
vk.api.messages.send({ user_id: user.id, message: `Вам выдали права «Administator», удачно отстоять срок`});
}
});

cmd.hear(/^(?:vip)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.settings.adm = 2; 
user.farmslimit = 5000; 
user.nicklimit = 30;
user.energy = 50;

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) был выдан "Vip-status".`); 
vk.api.messages.send({ user_id: user.id, message: `✅ Вам выдали права "Vip-status", удачно отстоять срок` }); 
}
});


cmd.hear(/^(?:буква)\s([а-я])$/i, async (message, bot) => {

let letter = utils.pick("йцукенгшщзхъфывапролджэячсмитьбю".split(""));
message.args[1] = message.args[1].toLowerCase();

if(letter === message.args[1]) {
message.user.balance += 10000000000;
return bot(`вы отгадали букву! Буква была "${letter}".
💰 Приз: 10.000.000.000 $`);
} else {
return bot(`вы не отгадали букву! Буква была "${letter}".
🔥 Не отчаивайтесь, попытки неограничены!`);
}
});
	
	cmd.hear(/^(?:Фейкпроф)$/i, async (message, bot) => {
	let text = ``;
	clanid = message.user.clanid

	text += `🔎 ID: ${message.user.uid}\n`;
	if(message.user.prez)text += `🤵 Президент\n`;
	if(clans[clanid]) { 
	text += `⚔ Клан: ${clans[clanid].name}\n`; 
	};
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	if(message.user.marriage.partner)text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	if(message.user.marriage.partner)text += `💽 Биткоинов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	text += `🏋 Энергия: ${utils.sp(message.user.energy)}\n`;
	text += `🏆 Опыт: ${utils.sp(message.user.opit)}\n`;
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
		if(message.user.misc.farm) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
	}

	text += `\n🗓 Дата регистрации: ${message.user.regDate}`;
	return bot(`твой профиль:\n${text}`);
});

cmd.hear(/^(?:лник50)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.nicklimit = 50; 

saveAll();
await bot(`игроку *id${user.id} (${user.tag}). выдан лимит на ник до 50 символов. &#9989;`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит на ник до 50 символов администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});
	
cmd.hear(/^(?:лник500)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.nicklimit = 500; 

saveAll();
await bot(`игроку *id${user.id} (${user.tag}). выдан лимит на ник до 500 символов. &#9989;`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит на ник до 500 символов администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});


cmd.hear(/^(?:промо)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 8) return;
config.promovalue = Number(message.args[1]); 
saveConfig();
return bot(`сумма промокода: ${config.promovalue}. ${smilesuccess}`);

});

cmd.hear(/^(?:промо лимит)\s([0-9]+)$/i, async (message, bot) => { 
if(message.user.settings.adm < 8) return;
config.promolimit = Number(message.args[1]); 
saveConfig();
return bot(`лимит использований промокода: ${config.promolimit}. ${smilesuccess}`);

});

cmd.hear(/^(?:промо вкл)$/i, async (message, bot) => { 
if(message.user.settings.adm < 8) return; 

clearPromo();
return bot(`промокод включен! ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип btc)$/i, async (message, bot) => { 
if(message.user.settings.adm < 8) return;
config.promotip = "btc"; 
saveConfig();
return bot(`тип промокода: Bitcoin. ${smilesuccess}`);

});

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => { 
if(message.user.settings.adm < 8) return;
config.promotip = "balance"; 
saveConfig();
return bot(`тип промокода: Баланс. ${smilesuccess}`);

});

cmd.hear(/^(?:уранчииик)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 8) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].uran = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:коостюмы)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 8) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].realty.suit = 0;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:find_chat_id)$/i, async (message, bot) => { 
if(message.user.settings.adm < 5) return bot(`you dont have permisson`); 
if(!message.isChat) return bot(`команда работает только в беседе!`); 
return message.send(` 
this chat id = ${message.chatId}.`); 
});

cmd.hear(/^(?:апомощь|🅰 Админ-панель|панель админа)$/i, async (message, bot) => { 
if(message.user.settings.adm < 3) return bot(`you dont have permisson`); 
let text = ``;

if(message.user.settings.adm > 3) text += `-- поиск [ссылка на игрока] » найти айди игрока по ссылке,\n`
if(message.user.settings.adm > 3) text += `-- статистика [id] » просмотреть профиль игрока,\n`
if(message.user.settings.adm > 3) text += `-- выдать [id] [кол-во] » выдать валюту игроку,\n`
if(message.user.settings.adm > 3) text += `-- бан [id] » заблокировать аккаунт игроку,\n`
if(message.user.settings.adm > 3) text += `-- разбан [id] » разблокировать аккаунт игроку,\n`
if(message.user.settings.adm > 3) text += `-- сн [id] » сменить игроку неприемлимый ник,\n`
if(message.user.settings.adm > 3) text += `-- лник [id] » выдать игроку лимит на установку длинного ника,\n`
if(message.user.settings.adm > 3) text += `-- banper [id] » заброкировать передачу денег игроку,\n`
if(message.user.settings.adm > 3) text += `-- unbanper [id] » разблокировать передачу денег игроку,\n`
if(message.user.settings.adm > 3) text += `-- кик [ссылка на игрока] » исключить участника беседы,\n`
if(message.user.settings.adm > 3) text += `-- получить [кол-во] » получить определённую сумму денег.\n`

return bot(`✅ Доступные вам команды: \n\n${text}`)
});

cmd.hear(/^(?:free_case4)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 9) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].case4 += 1;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:free_case1)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 10) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].case1 += 1;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:передачаа)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 7) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].settings.trade = false;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:limit_standart)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return bot(`you dont have permission`)

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.limit= 100000000000; 
user.settings.maxlimit= 100000000000; 

saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит 100.000.000.000$ на передачу/выдачу администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:limit_upgrade)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 5) return bot(`you dont have permission`)

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.limit= 1000000000000; 
user.settings.maxlimit = 1000000000000; 

saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит 1.000.000.000.000$ на передачу/выдачу администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:limit_max)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 7) return bot(`you dont have permission`)

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.limit= 1000000000000000; 
user.settings.maxlimit= 1000000000000000;

saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдан лимит 1.000.000.000.000.000$ на передачу/выдачу администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:pex donate)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
message.args[2] = message.args[2].replace(/(б|b)/ig, '000000000'); 
message.args[2] = message.args[2].replace(/(т|t)/ig, '000000000000'); 
message.args[2] = message.args[2].replace(/(ю|q)/ig, '000000000000000'); 
if(message.senderId !== 556842930| message.senderId !== 556842930) return bot(`this command is available only coder`)
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.settings.adm= message.args[2];


await bot(`[id${user.id}|${user.tag}] получил права ${message.args[2].toString().replace(/2/gi, "🔥 VIP-status").replace(/4/gi, "🌟 Administator").replace(/6/gi, "🌟 Head Administator").replace(/8/gi, "🍒 Owner of the cherry ✨")}`)

} 
});

cmd.hear(/^(?:pex owner)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 
message.args[2] = message.args[2].replace(/(б|b)/ig, '000000000'); 
message.args[2] = message.args[2].replace(/(т|t)/ig, '000000000000'); 
message.args[2] = message.args[2].replace(/(ю|q)/ig, '000000000000000'); 
if(message.senderId !== 556842930| message.senderId !== 556842930) return bot(`this command is available only coder`)
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.owner= message.args[2];


await bot(`on bog`)

} 
});

cmd.hear(/^(?:pex removeowner)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, ''); 
message.args[1] = message.args[1].replace(/(к|k)/ig, '000'); 
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000'); 
if(message.senderId !== 556842930| message.senderId !== 556842930) return bot(`this command is available only coder`)

if(message.args[1] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);


user.owner= 0;


saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), у вас были отняты все права владельца, администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:разжаловать)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, ''); 
message.args[1] = message.args[1].replace(/(к|k)/ig, '000'); 
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000'); 
if(message.user.settings.adm < 5)return bot(`you dont have permission`)

if(message.args[1] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
if(message.user.settings.adm < user.settings.adm)return bot(`you dont have permission to demote this administrator`)


user.settings.adm= 0;


saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), у вас были отняты все права администратора, администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});


cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	return message.sendSticker(smilik);
});

cmd.hear(/^(?:limit_start)$/i, async (message, bot) => { 
	if(message.user.settings.adm < 7) return bot(`you dont have permission`);
	for(i=0;i<20000;i++){ 
	if(users[i]){ 
	users[i].settings.limit = 100000000000;
	} 
	} 
	return message.send(`готово!`);
});

cmd.hear(/^(?:секретная-машина)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 10) return bot(`you dont have permission`)

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


message.user.transport.car = 20;

saveAll();
await bot(`succes`); 
vk.api.messages.send({ user_id: user.id, message: `*id${user.id} (${user.tag}), вам выдана секретная машина администратором [id${message.user.id}|${message.user.tag}] &#9989;` }); 
}
});

cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.settings.adm < 10) return message.send(`🔸 » Вы не RAZRAB`); 
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
		} 
		users[message.args[1]].tag = message.args[2];
		return message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
});

cmd.hear(/^(?:givebtc)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.settings.adm < 5) return message.send(`🔸 » Вы не RAZRAB`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givebtc [ID] [COUNT]'`); 
	users[message.args[1]].btc += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} биткоинов💰`);
});

cmd.hear(/^(?:giverubli)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.settings.adm < 7) return message.send(`🔸 » Вы не RAZRAB`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverubli [ID] [COUNT]'`); 
	users[message.args[1]].rub += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.hear(/^(?:givelimit)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.settings.adm < 7) return message.send(`🔸 » Вы не RAZRAB`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givelimit [ID] [COUNT]'`); 
	users[message.args[1]].limit += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.hear(/^(?:givebank250kkkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.bank += 250000000000000; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) выдано в банк "250.000.000.000.000$".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ Вам выдали на счет банка "250.000.000.000.000$ 💸", спасибо что вы с нами!` }); 
}
});

cmd.hear(/^(?:givebank250kkk)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.bank += 250000000000; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) выдано в банк "250.000.000.000$".`); 
vk.api.messages.send({ user_id: user.id, attachment:'photo-181406058_457239346', message: `✅ Вам выдали на счет банка "250.000.000.000$ 💸", спасибо что вы с нами!` }); 
}
});

cmd.hear(/^(?:сбросить биткоины)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);

if(message.user.settings.adm < 6) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.btc = 0; 
user.btc = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшены биткоины.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:сбросить рубли)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.btc);

if(message.user.settings.adm < 6) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.misc.rub = 0; 
user.rub = 0; 

saveAll();
await bot(`пользователю *id${user.id} (${user.tag}) сброшены рубли.`); 
vk.api.messages.send({ user_id: user.id, message: ` ` }); 
}
});

cmd.hear(/^(?:rubli)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].rub= 0; 
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:обновочка подехать)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].vip= 0
users[i].adm= 0 
users[i].case1= 0 
users[i].case2= 0
users[i].case3= 0
users[i].case4= 0
users[i].timers.halyava= 0;
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:хуйня антиматерия)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].biz2 = 0
users[i].bizlvl2 = 1;
} 
} 
return message.send(`готово!`); 
});
 
cmd.hear(/^(?:халява)$/i, async (message, bot) => {
	if(message.user.timers.halyava >= 1) return bot(`следущие бесплатные денешки вы сможете получить через ${displayTime(message.user.timers.halyava)} ${smileerror}.`)
message.user.balance += 1500000000
message.user.timers.halyava = 1200;
setTimeout(() => { 
message.user.timers.halyava =0; 
}, 600000);
bot(`Фортануло! ${smilesuccess}
	🤑 +1.500.000.000$
	🛍 Ваш баланс: ${utils.sp(message.user.balance)}$`);
return message.sendSticker(6844);
});

cmd.hear(/^(?:получить)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

    if(message.user.settings.adm < 3) return bot(`недостаточно прав. 🚫`);

	{
		message.user.balance += message.args[1];

		return bot(`вам было выдано ${utils.sp(message.args[1])}$ ${smilesuccess}
💰 На руках ${utils.sp(message.user.balance)}$`);
		return message.sendSticker(6670);
	}
});

cmd.hear(/^(?:whitelist off)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].ban= false; 
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:rubli)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].settings.reason= `1`; 
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:хатыщ)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].owner= 0; 
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:хатыщщщ)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].settings.limitmax = 100000000000;
users[i].zelya = 0;  
} 
} 
return message.send(`готово!`); 
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
cmd.hear(/^(?:подаркии|подарок|🛍 Искать подарки)/i, async (message, bot) => { 
let conf = await vk.api.messages.getConversationMembers({ 
peer_id: message.peerId, 
}); 
if(conf.count < 49) return message.send(`подарок можно забирать только в беседе где есть 50 участников. 😬
🆘 Не забудьте выдать администратора боту, иначе он не сможет получить количество участников!`) 
if(!message.isChat) return message.send(`подарок можно забирать только в беседе где есть 50 участников. 😬`)
let ch = pchats.find(x=> x.id == message.chatId); 
if(!ch) { 
pchats.push({ 
id: message.chatId, 
time: 0 
}); 
} 
if(pchats.find(x=> x.id == message.chatId).time > Date.now())
{
bot(`в этой беседе уже забрали подарок, он появится через ${left(ch.time - Date.now())}. Приходи чуть позже! ${smileerror}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
});
return message.sendSticker(6861);
}
pchats.find(x=> x.id == message.chatId).time = Date.now() + 600000; 
let win = random([5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,2]); 
switch (win) { 
case 1: 
{
let btcc = rand(70000000, 200000000); 
message.user.btc += Number(btcc) 
bot(`Вы открыли подарок в этой беседе и нашли ${utils.sp(btcc)}฿, приходите в другие беседы и открывайте подарки! 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
}); 
return message.sendSticker(many);
}
break; 
case 2:
{
message.user.balance += 250000000000000 
bot(`🆘 ВАМ КРУПНО ПОВЕЗЛО! 🆘 📦 Вы открыли подарок, а там лежал... БИЗНЕС «Межпланетный Экспресс»! (выдано валютой) ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
}); 
return message.sendSticker(many);
}
break; 
case 3: 
let platinum = random([1,2,3]); 
message.user.case2 += platinum 
bot(`Вы открыли подарок в этой беседе и нашли «Платинум» кейс (${platinum} шт.), приходите в другие беседы и открывайте подарки! 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
});
message.sendSticker(many);
break; 
case 4: 
{
let surprise = random([1,2,3,4,5,6,7]);
message.user.case1 += surprise 
bot(`Вы открыли подарок в этой беседе и нашли «Начинающий» кейс (${surprise} шт.), приходите в другие беседы и открывайте подарки! 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
})
return message.sendSticker(many); 
}
break; 
case 5: 
{
let dengi = utils.random(156781123123,1000000000000);
message.user.balance += dengi 
bot(`Вы открыли подарок в этой беседе и нашли ${utils.sp(dengi)}$ игровой валюты, приходите в другие беседы и открывайте подарки! 🔥 ${smilesuccess}`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
}) 
return message.sendSticker(many);
}
break; 
default: 
bot(`Вы открыли подарок в этой беседе и ничего там не нашли. Приходите в другие беседы и открывайте подарки! 🔥`, 
{ 
keyboard:JSON.stringify( 
{
"inline": true,
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{}", 
"label": `🛍 Искать подарки` 
}, 
"color": "default" 
}] 
] 
}) 
});
return message.sendSticker(many); 
} 
});

async function updateWidget() {
let tops = []
for (i = 1; i < 200000; i++){
	if(users[i]){tops.push({id: i, idvk: users[i].id, lvl: users[i].rating});
}
}
tops.sort(function(a, b) {if (b.lvl > a.lvl) return 1; if (b.lvl < a.lvl) return -1; return 0})

let script = {title: '🔥 Лучшие игроки', title_url: "vk.com/botpineapple", head: [{text: 'Игровое имя'}, {text: 'Рейтинг', align: 'right'}, {text: 'Баланс', align: 'right'}], body: [], more: "🔥 Начать играть", more_url: "vk.com/im?sel=-191380914"} 
for (let g = 0; g < 10; g++) {if (tops.length > g){script.body.push([{icon_id: `id${tops[g].idvk}`, text: `${users[tops[g].id].tag}`, url: `vk.com/id${tops[g].idvk}`}, {text: `${utils.sp(tops[g].lvl)}👑`}, {text: `${utils.rn(users[tops[g].id].balance)}$`}])}} 
requests.post({url: 'https://api.vk.com/method/appWidgets.update', form: {type: 'table', access_token: 'e90c56bc8cc282db284a02d1c62b5779b4af545f137d490c76a3ce1e76ac66967677dd91e3f996c08ca20', code: `return ${JSON.stringify(script)};`, v: '5.95'}}, 
function(err, resp, body) {console.log(body)}) 
console.log("Виджет обновлён!") 
} 

updateWidget() 
setInterval(updateWidget, 300000) 

setInterval(async () => { 
let group = await vk.api.groups.getMembers({ group_id: 191380914 }); 
user.api.call('status.set', { 
text: `📊 Зарегистрировано игроков: ${utils.sp(users.length)}`, 
group_id: 191380914, 
}) 
}, 26000);

setInterval(async () => { 
let group = await vk.api.groups.getMembers({ group_id: 191380914 }); 
user.api.call('status.set', { 
text: `📊 Принято сообщений: ${utils.sp(botinfo.msg)}`, 
group_id: 191380914, 
}) 
}, 18000);

cmd.hear(/^(?:хатыщс)$/i, async (message, bot) => { 
if(message.user.settings.adm < 7) return bot(`you dont have permission`); 
for(i=0;i<20000;i++){ 
if(users[i]){ 
users[i].bonuscomment_t= 0; 
} 
} 
return message.send(`готово!`); 
});

cmd.hear(/^(?:pget)$/i, async (message, bot) => {

if(message.user.settings.adm < 3) return;
if(!message.forwards[0] || message.replyMessage) return message.reply(`Перешлите сообщение.`);
let c = message.forwards[0].senderId;
let b = users.find(x=> x.id === Number(c));
message.send(`
🆔 uID: ${utils.sp(b.uid)}
💯 Игровой никнейм: *id${c} (${b.tag})
👤 VK: vk.com/id${b.id}
`);
if(message.replyMessage) { 
let c = message.replyMessage.senderId
let b = users.find(x=> x.id === Number(c));
message.send(`
🆔 uID: ${utils.sp(b.uid)}
📗 Игровой никнейм: *id${c} (${b.tag})
👤 VK: vk.com/id${b.id}
`);
}
});

cmd.hear(/^(?:giveantimateria)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);

if(message.user.settings.adm < 7) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 

user.uran += 1500;

saveAll();
await bot(`пользователь *id${user.id} (${user.tag}) получил 1500 антиматерии.`); 
vk.api.messages.send({ user_id: user.id, message: `✅ На ваш счёт зачислена валюта "1500 метеорита", спасибо за покупку! \n\nОплата любых покупок происходит у @develiseev (создателя)` }); 
}
});