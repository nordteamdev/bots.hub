console.log('Идет запуск');
const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const keyboard = Keyboard;
const request = require('prequest');
const prequest = require('request-promise');
const commands = [];
const users = require('./database/users.json'); 
const clans = require('./clans.json');
const chatslist = require('./database/chatslist.json');
const promo = require('./database/promo.json');
const log = require('./database/log.json');
const soobshenie = require('./database/soobshenie.json');
const botinfo = require('./database/botinfo.json');
const uid = require("./database/uid.json");
let buttons = [];
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

async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}
setInterval(() => {
	let fs = require("fs");
	fs.writeFileSync("./database/users.json", JSON.stringify(users, null, "\t"));
	}, 8000)

vk.setOptions({ token: 'aef1bac6665baffb0a1396ad29eaee770f601160fd7481a0c28c8a6ceab8924a18435c1200c7bf00ef557', pollingGroupId: 190506705 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public190506705\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public190506705\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();
			`https://vk.com/sticker/1-6086-128`
			message.send(`🔥 ОГО! *id${message.senderId} (${user_info.first_name}), ты у меня ВПЕРВЫЕ! Рад познакомится, получай 50.000.000 $ в ПОДАРОК!!! 🤑\n\nОтправь «помощь» что бы узнать мои команды. 📚`)


	
    users.push({
		    id: message.senderId,
			uid: users.length,
			 podpis: 0,
               hei: 0,
               video: 0,
               kanal: false,
               knser: false,
               mikro: false,
	      businesslength: 0,
               serkn: false,
               kakake: false,
               uggg: false,
               fggg: false,
               bonus_balance: false,
               xxxkn: false,
               herkn: false,
               bcase: false,
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
            balance: 50000000,
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
			expkop: 0,
			carlength: 0,
			car2: 0,
			car3: 0,
			car4: 0,
			car5: 0,
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

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Введена команда: ${message.text} `)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

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
		user.timers.gonka = false;
		user.timers.poxod = false;
		user.timers.hack = false;  
		user.timers.present = false;
		user.timers.clear = false;
		user.timers.present = false;
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

setInterval(async () => {
	await saveAll();
}, 3000);


cmd.hear(/^(?:Привет)$/i, async (message) => {
message.send('Hello')
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msg += 1;
	if(message.args[1].length >= 16) return bot(`максимальная длина ника 15 символов`);

	message.user.tag = message.args[1];
	return bot(`Теперь ваш ник: "${message.user.tag}"`);
			});

const videokarts = [
   {
    	name: 'GeForce GTX 650',
        cost: 30000000,
        id: 1
   },
   {
    	name: 'GeForce GTX 460 v2',
        cost: 50000000,
        id: 2
   },
   {
    	name: 'GeForce GTX 660',
        cost: 80000000,
        id: 3
   },
   {
    	name: 'GeForce GTX 760',
        cost: 91000000,
        id: 4
   },
   {
    	name: 'GeForce GTX 590',
        cost: 140000000,
        id: 5
   },
   {
    	name: 'GeForce GTX 770',
        cost: 157000000,
        id: 6
   },
   {
    	name: 'GeForce GTX 980',
        cost: 240000000,
        id: 7
   },
   {
    	name: 'GeForce GTX 1080',
        cost: 405900000,
        id: 8
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
		id: 40
	},
	{
		name: 'Надувной круг',
		cost: 100000,
		id: 41
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
		id: 103
	},
	{
		name: 'Мусорка',
		cost: 150000,
		id: 104
	},
	{
		name: 'Теремок',
		cost: 150000,
		id: 105
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
		name: 'Квартираа в центре Москвы',
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
		cost: 500,
		id: 1
	},
	{
		name: 'Nokia 3310',
		cost: 1500,
		id: 2
	},
	{
		name: 'Motorola MicroTAC',
		cost: 3500,
		id: 3
	},
	{
		name: 'Motorola StarTac',
		cost: 5000,
		id: 4
	},
	{
		name: 'Ericsson A1018s',
		cost: 6000,
		id: 5
	},
	{
		name: 'Sony CMD-J5',
		cost: 7000,
		id: 6
	},
	{
		name: 'Siemens C35',
		cost: 8000,
		id: 7
	},
	{
		name: 'Siemens A50',
		cost: 10000,
		id: 8
	},
	{
		name: 'Samsung SGH-R210',
		cost: 15000,
		id: 9
	},
	{
		name: 'Sony CMD-J70',
		cost: 20000,
		id: 10
	},
	{
		name: 'iРhоnе 6',
		cost: 30000,
		id: 11
	},
	{
		name: 'iРhоnе 6S',
		cost: 32000,
		id: 12
	},
	{
		name: 'Iphone 7',
		cost: 40000,
		id: 13
	},
	{
		name: 'Iphone 7 PLUS',
		cost: 50000,
		id: 14
	},
	{
		name: 'Iphone 8 PLUS',
		cost: 80000,
		id: 15
	},
	{
		name: 'Iphone XS MAX',
		cost: 150000,
		id: 16
	},
	{
		name: 'Iphone 11',
		cost: 300000,
		id: 17
	},
	{
		name: 'Iphone 11 Pro',
		cost: 600000,
		id: 18
	},
	{
		name: 'Iphone 11 Pro Max',
		cost: 900000,
		id: 19
	},
	{
		name: 'Huawei P40 PRO',
		cost: 1200000,
		id: 20
	}
	
];

const pets = [
	{
		name: 'Улитка',
		cost: 1000,
		id: 1
	},
	{
		name: 'Лягушка',
		cost: 25000,
		id: 2
	},
	{
		name: 'Заяц',
		cost: 500000,
		id: 3
    },
	{
		name: 'Свинья',
		cost: 300000000,
		id: 4
    },
	{
		name: 'Лиса',
		cost: 1250000000,
		id: 5
    },
	{
		name: 'Собака',
		cost: 5000000000,
		id: 6
    },
	{
		name: 'Панда',
		cost: 30000000000,
		id: 7
    },
	{
		name: 'Горилла',
		cost: 180000000000,
		id: 8
    },
	{
		name: 'Волк',
		cost: 360000000000,
		id: 9
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

cmd.hear(/^(?:Телефон|telephone)$/i, async (message, bot) => {
	if(message.user.misc.phone < 1) return message.send(`[➖] У вас нету телефона, чтобы купить введите команду "Телефоны"`);
   return message.send(`🎊 @id${message.user.id} (${message.user.tag} меню телефона,
   1) Тинфо - посмотреть инфу о телефоне
   2) Купить номер - купить сим-карту
   4) Смс (ид) (сообщение)
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

 cmd.hear(/^(?:Пища|Еда|продукты)\s?([0-9]+)?$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	if(!message.args[1]) return bot(`: 
${message.user.eda === 1 ? '❌ ' : '🍏'} 1. яблоко (80 листьев)
${message.user.eda === 2 ? '❌ ' : '🍏'} 2. груша (120 листьев)
${message.user.eda === 3 ? '❌ ' : '🍗'} 3. окорок (250 листьев)
${message.user.eda === 4 ? '❌ ' : '🐷 '} 4. свинина (450 листьев)
${message.user.eda === 5 ? '❌ ' : '🐃'} 5. говядина (1.000 листьев)

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
	if(message.user.car1 > 0) return bot(`Неа, Неа, Систему не обманешь! У вас уже есть машина в 1 слоту гаража!`);
	if(!message.args[1]) return bot(`Раздел машин:
 		
  🚜Старый автопром
  🚗Новый автопром
      `);
	
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

    


	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car1 = sell.id;
        message.user.carlength += 1;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		return bot(`Если вам нужна 2 машина то введите: Машина 2 [Ид машины]`)
	}

});


cmd.hear(/^(?:машина 2)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.transport.car == 0) return bot(`Неа, Неа, Систему не обманешь! Купи сначала 1 машину прежде чем купить 2 машину!`);
if(message.user.car2 > 0) return bot(`Вы уже имеете 2-ю машину! Если она вам не нужна или надо заменить можно её продать: Продать 2слот`);
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;



	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car2 = sell.id;
        message.user.carlength += 1;
        
		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		return bot(`Если вам нужна 3 машина то введите: Машина 3 [ид машины]`)
	}
});

cmd.hear(/^(?:машина 3)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.car2 == 0) return bot(`Неа, Неа, Систему не обманешь! Купи сначала 2 машину прежде чем купить 3 машину!`);
if(message.user.car3 > 0) return bot(`Вы уже имеете 3-ю машину! Если она вам не нужна или надо заменить можно её продать: Продать 3слот`);
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;



	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car3 = sell.id;
        message.user.carlength += 1;
        
		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		return bot(`Если вам нужна 4 машина то введите: Машина 4 [ид машины]`)
	}
});

cmd.hear(/^(?:машина 4)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.car3 == 0) return bot(`Неа, Неа, Систему не обманешь! Купи сначала 3 машину прежде чем купить 4 машину!`);
if(message.user.car4 > 0) return bot(`Вы уже имеете 4-ю машину! Если она вам не нужна или надо заменить можно её продать: Продать 4слот`);
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;


	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car4 = sell.id;
        message.user.carlength += 1;
        
		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		return bot(`Если вам нужна 5 машина то введите: Машина 5 [ид машины]`)
	}
});


cmd.hear(/^(?:машина 5)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.car4 == 0) return bot(`Неа, Неа, Систему не обманешь! Купи сначала 4 машину прежде чем купить 5 машину!`);
if(message.user.car5 > 0) return bot(`Вы уже имеете 5-ю машину! Если она вам не нужна или надо заменить можно её продать: Продать 5слот`);
		const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.car4 == 0)  bot(`Неа, Неа, Систему не обманешь! Купи сначала 4 машину прежде чем купить 5 машину!`);



	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{  
		message.user.balance -= sell.cost;
		message.user.car5 = sell.id;
        message.user.carlength += 1;
        
		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
		return bot(`Вы теперь имеете полный гараж машин!`)
	}
});




cmd.hear(/^(?:Гараж|🏢Гараж)\s?([0-9]+)?$/i, async (message, bot) => {


		let text = ``;
        text += `🚗Машины:\n\n`;
		
		if(message.user.car1) text += `     🚗 1 Слот Машина: ${cars[message.user.car1 - 1].name}\n`; 
        if(message.user.car2)  text += `   🚗 2 Слот Машина: ${cars[message.user.car2 - 1].name}\n`; 
	    if(message.user.car3)  text += `   🚗 3 Слот Машина: ${cars[message.user.car3 - 1].name}\n`; 
	    if(message.user.car4)  text += `   🚗 4 Слот Машина: ${cars[message.user.car4 - 1].name}\n`; 
	    if(message.user.car5)  text += `   🚗 5 Слот Машина: ${cars[message.user.car5 - 1].name}`; 

        if(message.user.car1 == 0)  text += `У вас нету машины в 1 слоту😪\n`
		if(message.user.car2 == 0)  text += `У вас нету машины во 2 слоту😪\n`
		if(message.user.car3 == 0)  text += `У вас нету машины в 3 слоту😪\n`
		if(message.user.car4 == 0)  text += `У вас нету машины в 4 слоту😪\n`
		if(message.user.car5 == 0)  text += `У вас нету машины в 5 слоту😪\n`

	    text += `\n\n✈ Самолёты:\n\n`;

	if(message.user.transport.airplane == 0)  text += `У вас нету самолётов😪`

        if(message.user.transport.airplane) text += `✈ Самолёт: ${airplanes[message.user.transport.airplane - 1].name}`;

     text += `\n\n🚁 Вертолёты:\n\n`;

     if(message.user.transport.helicopter == 0)   text += `У вас нету вертолётов😪`

        if(message.user.transport.helicopter) text += `🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}`;

     text += `\n\n⛴ Яхты:\n\n`;

     if(message.user.transport.yacht == 0)   text += `У вас нету Яхт😪`

        if(message.user.transport.yacht) text += `⛴ Яхта: ${yachts[message.user.transport.yacht - 1].name}`;

	  return message.send(`@id${message.user.id} (${message.user.tag}), 🏢Ваш Гараж:\n${text}`);


});


	cmd.hear(/^(?:cid)/i, message => {
 message.send(`Ид беседы: ${message.chatId}`)	
});

cmd.hear(/^(?:Чаты|Беседы)/i, async (message, args, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
message.send(`ID чата: ${message.chatId}`)
message.send(`оффициальная б: ${message.chatId}`)
});


cmd.hear(/^(?:бонус|🤑 Бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus) return bot(`Бонус можно брать раз в 24 часа 😯`);
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
	let win = utils.pick([6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,4,5,5,4,4,3,3,1,1,1,1,2]); 
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
		message.user.balance += dengi;
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и нашли ${utils.sp(dengi)}$, приходите в другие беседы и открывайте подарки! 🔥`);
	}

	if(win === 6)
	{
		return message.send(`@id${message.user.id} (${message.user.tag}), вы открыли подарок в этой беседе и ничего не нашли, приходите в другие беседы и открывайте подарки! 🔥`);
	}
});

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
		if(!message.user.car1) return bot(`у вас нет машины`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.car1 - 1].cost * 0.85);
		message.user.car1 = 0;

		return bot(`вы продали свою машину в 1 слоту за ${utils.sp(a)}$`);
	}

	if(/2слот/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.car2) return bot(`у вас нет машины`);
		if(message.user.car1 > 0) return bot(`Нельзя продать машину во 2 слоту если не продана машина в 1 слоту!`);
		let a = Math.floor(cars[message.user.car2 - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.car2 - 1].cost * 0.85);
		message.user.car2 = 0;

		return bot(`вы продали свою машину в 2 слоту за ${utils.sp(a)}$`);
	}

    if(/3слот/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.car3) return bot(`у вас нет машины`);
		if(message.user.car2 > 0) return bot(`Нельзя продать машину в 3 слоту если не продана машина во 2  слоту!`);
		let a = Math.floor(cars[message.user.car3 - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.car3 - 1].cost * 0.85);
		message.user.car3 = 0;

		return bot(`вы продали свою машину в 3 слоту за ${utils.sp(a)}$`);
	}

	 if(/4слот/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.car4) return bot(`у вас нет машины`);
		if(message.user.car3 > 0) return bot(`Нельзя продать машину в 4 слоту если не продана машина в 3 слоту!`);
		let a = Math.floor(cars[message.user.transport.car4 - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.car4 - 1].cost * 0.85);
		message.user.car4 = 0;

		return bot(`вы продали свою машину в 4 слоту за ${utils.sp(a)}$`);
	}

	 if(/5слот/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.car5) return bot(`у вас нет машины`);
		if(message.user.car4 > 0) return bot(`Нельзя продать машину в 5 слоту если не продана машина в 4 слоту!`);
		let a = Math.floor(cars[message.user.car5 - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.car5 - 1].cost * 0.85);
		message.user.car5 = 0;

		return bot(`вы продали свою машину в 5 слоту за ${utils.sp(a)}$`);
	}

	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.balance += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}$`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.businesslength == 0) return bot(`у вас нет бизнеса`);
		if(options.count < 1 || options.count > 2) return bot(`используйте: Продать бизнес [1 или 2]`);
		if(message.user.businesslength < options.count) return bot(`у вас нет этого бизнеса`);
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
		if(!message.args[2]) return message.send(`Вы не ввели количество ферм!`)
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

		message.user.lists += Math.floor(eda[message.user.eda - 1].cost * 0.85);
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

		cmd.hear(/^(?:пострассылка)\s([^]+)$/i, async (message, bot) => { 
	message.user.msgbalance += 1;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `👮 » Быстро посмотрел запись:`, attachment: `${message.args[1]}`}); 
}); 
let people = 0; 
for(let id in users) { 
vk.api.call('messages.send', { 
chat_id: id, 
message: `👮 » Быстро посмотрел запись:`, 
attachment: `${message.args[1]}` }); 
} 
message.send(`💬 || Я успешно сделал рассылку!`); 

})

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
		adm_log(is)

		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
     message.user.ainfo.bans += 1;
	}); 

async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

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
8⃣ Привилегия ВИП.

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
		message.user.expkop += expi;
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
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 11)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.expkop += expi;
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
		const sell = comp.find(x=> x.id === 6);
		if(!sell) return;
		message.user.compukter= 6;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 29)
	{
		const sell = comp.find(x=> x.id === 7);
		if(!sell) return;
		message.user.compukter= 7;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 30)
	{
		const sell = comp.find(x=> x.id === 8);
		if(!sell) return;
		message.user.compukter= 8;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 31)
	{
		const sell = comp.find(x=> x.id === 9);
		if(!sell) return;
		message.user.compukter= 9;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
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
			return bot(`вы нашли привилегию ВИП! 😱`);
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
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.expkop += expi;
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
		const sell = comp.find(x=> x.id === 6);
		if(!sell) return;
		message.user.compukter= 6;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 29)
	{
		const sell = comp.find(x=> x.id === 7);
		if(!sell) return;
		message.user.compukter= 7;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 30)
	{
		const sell = comp.find(x=> x.id === 8);
		if(!sell) return;
		message.user.compukter= 8;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 31)
	{
		const sell = comp.find(x=> x.id === 9);
		if(!sell) return;
		message.user.compukter= 9;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
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
			return bot(`вы нашли привилегию Премиум! 😱`);
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
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.expkop += expi;
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
		const sell = comp.find(x=> x.id === 6);
		if(!sell) return;
		message.user.compukter= 6;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 29)
	{
		const sell = comp.find(x=> x.id === 7);
		if(!sell) return;
		message.user.compukter= 7;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 30)
	{
		const sell = comp.find(x=> x.id === 8);
		if(!sell) return;
		message.user.compukter= 8;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 31)
	{
		const sell = comp.find(x=> x.id === 9);
		if(!sell) return;
		message.user.compukter= 9;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
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
			return bot(`вы нашли привилегию ВИП! 😱`);
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
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.expkop += expi;
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
		const sell = comp.find(x=> x.id === 6);
		if(!sell) return;
		message.user.compukter= 6;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 29)
	{
		const sell = comp.find(x=> x.id === 7);
		if(!sell) return;
		message.user.compukter= 7;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 30)
	{
		const sell = comp.find(x=> x.id === 8);
		if(!sell) return;
		message.user.compukter= 8;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 31)
	{
		const sell = comp.find(x=> x.id === 9);
		if(!sell) return;
		message.user.compukter= 9;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
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
			return bot(`вы нашли привилегию Премиум! 😱`);
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
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 12)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 13)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 14)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 15)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 16)
	{
		message.user.expkop += expi;
		return bot(`вы нашли ${expi} опыта 🔥`);
	}

	if(prize === 17)
	{
		message.user.expkop += expi;
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
		const sell = comp.find(x=> x.id === 6);
		if(!sell) return;
		message.user.compukter= 6;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 29)
	{
		const sell = comp.find(x=> x.id === 7);
		if(!sell) return;
		message.user.compukter= 7;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 30)
	{
		const sell = comp.find(x=> x.id === 8);
		if(!sell) return;
		message.user.compukter= 8;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
	}
	if(prize === 31)
	{
		const sell = comp.find(x=> x.id === 9);
		if(!sell) return;
		message.user.compukter= 9;
		return bot(`вы нашли секретный комп «${sell.name}» 😱`);
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
			return bot(`вы нашли привилегию ВИП! 😱`);
		}
	}
});


cmd.hear(/^(?:Донат|Товары)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	if(message.user.keyboard == true) {
					await message.send(`🔸У вас на счету: ${utils.sp(message.user.rub)}₽ (Рублей) 
 
💠 Привилегии/Аккаунты [➕] 
🌐 Специальные [➕] 
💰 Валюта [➕] 
 💳Рубли[➕]
 
🔹Что бы приобрести рубли, добавьте в друзья [younglabel2|Сергея] с пометкой "rub"`, 
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
 
🔹Приобрести товар можно у [younglabel2|Сергея]`);}
});	

cmd.hear(/^(?:Аккаунты|Привилегии)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
 let text = ``
let text1 = ``   
     if(message.user.rub == 0) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 1) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 2) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 3) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
if(message.user.rub == 4) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

	😓 | Вы пока-что ничего не можете купить :(
	😮 | Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 50) text += `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

❤ || Привилегия: ВИП 
🤑 | Стоимость: 50 RUB 

[💬] Команды: 
1) get [id] проверить игрока
2) givemycoins [1-1.500.000] - выдать себе валюту

✨ || Id товара - 1

➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;

if(message.user.rub > 100) text += `

❤ || Привилегия: Премиум 
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

❤ || Привилегия: Мл.Администратор 
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

❤ || Привилегия: Ст.Администратор 
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
🔹Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]
	`);
});

cmd.hear(/^(?:Рубли|rubs)$/i, async (message, bot) => {
	return message.send(`
  [💰] Рубли: 
 1&#8419; 50➖45руб
 2&#8419; 100руб➖90руб
 3&#8419; 200руб➖190руб
    4&#8419; 300руб➖290руб

🔹Чтобы пополнить баланс, нужно купить его у [younglabel2|Сергея]`)
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
return message.send(`👍🏻 || Вы успешно купили привилегию: ВИП`);
}
});

cmd.hear(/^(?:Аккаунт 2)$/i, async (message, bot) => {
	if(message.user.right == 2) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 100) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 100,
message.user.right = 2;
return message.send(`👍🏻 || Вы успешно купили привилегию: Премиум`);
}
});

cmd.hear(/^(?:Аккаунт 3)$/i, async (message, bot) => {
	if(message.user.right == 3) return bot(`[❌] Вы уже имеете данную привилегию`);
	if(message.user.right == 4) return bot(`[❌] Вы уже имеете более высокую привилегию...`);
    if(message.user.rub < 200) return bot(`[➕] пополните баланс! Команда - Рубли`);
{
message.user.rub -= 200,
message.user.right = 3;
return message.send(`👍🏻 || Вы успешно купили привилегию: Мл.Администратор`);
}
});


cmd.hear(/^(?:Валюта|Деньги)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`💰Валюта:  
 1⃣10ккк$➖20руб
 2⃣50ккк$➖60руб
 3⃣100кккк$➖120руб
   
🔹Что бы купить игровую валюту обратитесь к [younglabel2|Сергею]`,
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
   
🔹Что бы купить игровую валюту обратитесь к [younglabel2|Сергею]`);}
});	

cmd.hear(/^(?:Специальные|Специальное)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`🌟Специальное:  
 1&#8419; Снять ограничение в играх➖100руб
 2&#8419; Разблокирока передачи ➖50руб
 3&#8419; Подтвержденный аккаунт $➖150руб
   
🔹Что бы купить специальный товар обратитесь к [younglabel2|Сергею]`, 
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
   
🔹Что бы купить специальный товар обратитесь к [younglabel2|Сергею]
`);}
});	

//----|°Админ Команды•|----\\

cmd.hear(/^(?:blockpay|заблокировать перевод|заблокировать переводы)?\s([0-9]+)?\s?([0-9]+)\s([^]+)?$/i, async (message, args, bot) => { 
	let user = users.find(x=> x.uid === Number(message.args[1]));
     if(message.user.right < 4) return message.send(`🔸 » Вы не Ст.Администратор`);
	if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » blockpay [ID] [TIME(1-999)] [ПРИЧИНА]`);
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
	if(message.user < 4) return message.send(`🔸 » Вы не Ст.Администратор`);
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unblockpay [ID]`); 
	 
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
  if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не можете посадить себя в тюрму`)
     if(message.user.right < 2) return message.send(`🔸 » Вы не Премиум`);
	if(!message.args[2] || !Number(message.args[1]) || !Number(message.args[2]) || !users[message.args[1]] || message.args[2] > 999 || message.args[2] < 1 ) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-999)] [ПРИЧИНА]`);
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
	if(message.user < 2) return message.send(`🔸 » Вы не Премиум`);
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
        if(message.user.right < 4) return message.send(`🔸 ➾ Вы не Ст.Администратор`);
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
		if(message.user.right < 4) return message.send(`🔸 ➾ Вы не Ст.Администратор`);
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
   if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 1) return message.send(`🔸 » Вы не ВИП`);
	if(message.user.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(message.user.right == 1){
	if(!message.args[1] || message.args[1] < 0 || message.args[1] > 1500000000) return message.send(`💰 » Пример: 'givemycoins [1-1500000000]'`);
		message.user.balance += Number(message.args[1]);
	}
	if(message.user.right == 2){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 35000000000) return message.send(`💰 » Пример: 'givemycoins [1-35000000000]'`);
		message.user.balance += Number(message.args[1]);
	}   
	if(message.user.right == 3){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 650000000000) return message.send(`💰 » Пример: 'givemycoins [1-650000000000]'`);
		message.user.balance += Number(message.args[1]);
	}  
     if(message.user.right == 4){
		if(!message.args[1] || message.args[1] < 0 || message.args[1] > 9000000000000) return message.send(`💰 » Пример: 'givemycoins [1-9000000000000]'`);
		message.user.balance += Number(message.args[1]);
      	}  
      message.user.giverub = true;
		setInterval(() => {
			message.user.giverub = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${utils.sp(message.args[1])}$`);
});

cmd.hear(/^(?:givecoins)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
 if(message.user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача коинов.`)
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 4) return message.send(`🔸 » Вы не Ст.Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givecoins [ID] [COUNT]'`); 
	users[message.args[1]].balance += Number(message.args[2]);
   var is = [message.user.uid, message.text] 
		
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} коинов💰`);
});

cmd.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rub += Number(message.args[2]);
var is = [message.user.uid, message.text] 
		
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рублей💰`);
});

cmd.hear(/^(?:removecoins)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 4) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].balance = 0; 
   var is = [message.user.uid, message.text] 
		
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

cmd.hear(/^(?:removerub)\s?([0-9]+)?\s([0-9+])?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 6) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`💰 » Пример: 'removerub [ID] [COUNT]'`); 
	users[message.args[1]].rub = Number(message.args[2]); 
   var is = [message.user.uid, message.text] 
		
	return message.send(`💰 » Вы забрали все рубли у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});

//----------|•Команды Поиска•|----------\\

cmd.hear(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
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
		🔹 » Привилегия: ${id.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Мл.Администратор").replace(/4/gi, "Ст.Администратор").replace(/5/gi, "Titan").replace(/6/gi, "Владелец")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.right >= 2 ? `🔸 » Уровень: ${id.level}\n` : ``)+ 
		(message.user.right >= 2 ? `🔸 » Опыт: ${id.exp}\n` : ``)+ 

		(message.user.right >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(message.user.right >= 2 ? `⚠ » Причина: [${id.warn_p}]\n` : ``)+ 
		(message.user.right >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.right < 2) return message.send(`🔸➡ Вы не Премиум`);
if(message.args[3]){
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(`
👤 ➖ Игрок: ${user.tag}
    🆔 ➖ ID: ${user.uid}
          ⛔ ➖ Статус: ${user.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Мл.Администратор").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
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
          ⛔ ➖ Статус: ${user2.right.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Мл.Администратор").replace(/4/gi, "Diamomd").replace(/5/gi, "Titan")}
    `)
})
  return;
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
       var is = [message.user.uid, message.text] 
		
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Мл.Администратор").replace(/4/gi, "Администратор").replace(/5/gi, "Ст.Администратор").replace(/6/gi, "Владелец")}`
		}); 
		
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Мл.Администратор").replace(/4/gi, "Ст.Администратор").replace(/5/gi, "Ст.Администратор")}]`);
        });
	
//------------|•Система Варнов•|------------\\

cmd.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.args[1] == message.user.uid) return message.send(`❌ ➾ Вы не выдать себе предупреждение`)
        if(message.user.right < 2) return message.send(`🔸 » Вы не Премиум`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
        if(users[message.user.uid].right < users[message.args[1]].right) return message.send(`⚠ ➾Нельзя выдать предупреждение данному игроку!`);

		users[message.args[1]].warn += 1;  
      users[message.args[1]].warn_p = `${message.args[2]}`
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
		return message.send(`✅ » Вы выдали предупреждение игроку [${users[message.args[1]].tag}].`);
	}); 

cmd.hear(/^(?:unwarn)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unwarn [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 2) return message.send(`🔸 » Вы не Премиум`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].warn = 0; 
		users[message.args[1]].warn_p = `Нету`;
      var is = [message.user.uid, message.text] 
		
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		}); 
		return message.send(`✅ » Вы сняли все предупреждения игроку [${users[message.args[1]].tag}].`);
	});
	
 //----------|•Смена ника•|----------\\

cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
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
		
      message.user.ainfo.nicks += 1;
		return message.send(`📗 » Вы сменили ник игрока на: ${message.args[2]}`);
	});

//---------------|•Выдача/Обнуление Рейтинга•|------------------\\
cmd.hear(/^(?:giverating)\s?([0-9]+)\s?([^\s].*)?$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000").replace(/(м|m)/ig, '000000'));
  if(message.user.right < 5) return message.send(`🔸 » Вы не Ст.Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
	users[message.args[1]].rating += Number(parserInt(message.args[2]));
var is = [message.user.uid, message.text] 
		
 	 
	return message.send(`👑 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} рейтинга`)
	});
	
	cmd.hear(/^(?:removerating)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.right < 5) return message.send(`🔸 » У вас нету доступа`);
	if(!message.args[1] || !users[message.args[1]]) return message.send(`🔸 » Пример: 'removerub [ID]'`); 
	users[message.args[1]].rating = 0; 
   var is = [message.user.uid, message.text] 
		
	return message.send(`👑 » Вы забрали весь рейтинг у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
});


	cmd.hear(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.right < 3) return message.send(`🔸 » Вы не Мл.Администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;
      var is = [message.user.uid, message.text] 
		
    
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял вам блокировку аккаунта`
		}); 
		return message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
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
	
	 cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
		if(!message.args[1]) return message.send(`🔸 вы не написали жалобу | репорт [текст]`);
	vk.api.messages.send({ chat_id: 49, forward_messages: message.id, message: `🆕 Поступил новый репорт!\n🗣 Отправил: ${message.user.id}\n🔎 Игровой ID: ${message.user.uid}\n 💬Сообщение: ${message.args[1]}` }).then(() => {
		return bot(`ваш репорт был отправлен администраторам.`);
	}).catch((err) => {
		return bot(`произошла ошибка при отправлении сообщения технической поддержке.`);
	});
});


	cmd.hear(/^(?:респект)\s?([^]+)?/i, async (message, args, bot) => {
		message.user.soobshenie += 1;
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

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.right < 3) return;
if(!message.isChat) return bot(`команда работает только в беседе админов ${smileerror}`);
let user = await users.find(x=> x.uid === Number(message.args[1]));

vk.api.messages.send({ user_id: user.id, message: `🗣 Вам ответили на вашу жалобу.\n➡ [id${message.user.id}|${message.user.tag}] [ID ${message.user.uid}]: ${message.args[2]}\n\nОцените ответ: респект [id] +/- [хорошо/плохо]` });
message.user.ainfo.all_ans += 1;
message.user.ainfo.ans += 1;
return bot(`данный [id${user.id}|игрок] получил ваш ответ, спасибо что помогаете игрокам.`);
});

cmd.hear(/^(?:Очистка чата|clear)$/i, async (message, bot) => {
	if(!message.isChat) return bot(`команда работает только в беседе!`);
	if(message.user.right < 2) return bot(`💀 » Доступ закрыт « 💀`);
	if(message.user.timers.clear) return bot(`Очищать чат можно раз в 10 минут! 😯`);
	vk.api.message == ({sticker_id: 1});
	message.user.timers.clear = true;
	return message.send("&#4448;\n".repeat(500) + "Чат был успешно очищен!");
});
	
	//---------|•Кик Пользователя•|--------\\
	
	cmd.hear(/^(?:кикнуть|kick|кик)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, (message) => { 
		message.user.soobshenie += 1;
	let user = users[message.user];
 	if(message.user.right < 3) return message.send(`⚠ ➾ Вы не Мл.Администратор`);

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

cmd.hear(/^(?:топ)$/i, async (message, bot) => {
	message.user.msgbalance += 1;
	let top = [];

	users.filter(x => x.right < 2).map(x=> {
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

cmd.hear(/^(?:работа|работать)$/i, async (message, bot) => {
 return message.send(`@id${message.user.id}(${message.user.tag}), вы работаете на шахте, добывайте ресурсы (железо, золото, алмазы, материю) пока не закончится энергия.

✅ Как начать работать и добывать ресурсы? Используйте команды «копать железо», «копать золото», «копать алмазы», «копать материю».

♻ Как продавать накопанные ресурсы? Используйте команды «продать железо», «продать золото», «продать алмазы», «продать материю».
`);
});

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
        return bot(`Вы засунули руку в коробку...\n[😎] >> Из нее вы достали награду  \n💴 >> Вы выиграли:  ${(win)}$`);
    }else{
        let win = text;
        message.user.balance -= Math.round(win);  
	    if(message.user.balance <= 0){
	    	message.user.balance = 0;
	    }
        return bot(`Вы засунули руку в коробку...\n[💀] >> Какая неудача... Вы повредили руку \n[💴] >> Вы проиграли:  ${(win)}$`);
   
    } 		

}
})


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
	message.user.soobshenie += 1;
		if(message.user.right <= 1) {
	if(message.user.timers.commands) return message.send(`[🤕] || [id${message.user.id}|${message.user.tag}], нельзя флудить командами.\n[😎] | Чтобы играть без ограничений, ты должен иметь привилегию с VIP'а.\n\n[😴] || Через 3 сек, Вы сможете ещё раз написать команду.`);

	setTimeout(() => {
		message.user.timers.commands = false;
	}, 3000);

	message.user.timers.commands = true;
}
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
		
		Если вы угадаете код, то вы получите 10.000.000.000$`);
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
       vk.api.call('video.search', {q: message.args[1], count: 5, adult: 0, access_token: 'a84b755ef319ec8df8739b6cab0367735ec97ec937ef5548f41d605f9506936c5469324cbd04f6da13bb5'})
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



cmd.hear(/^(?:старый автопром|🚜Старый автопром)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`
🎒 1. Запорожец (100.000$)
🎒 2. Лада четырка (200.000$)
🎒 3. Лада Шестерка (250.000$)
🎒 4. Лада Семерочка (350.000$)
🎒 5. Нива(500.000$)
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
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:фермы)\s?([0-9]+)?\s?(.*)?$/i, async (message, bot) => {
	if(!message.args[1])  return bot(`майнинг фермы:
🎒 1. 6U Nvidia 2₿/час (20.500.000$)
🎒 2. AntminerS9 10₿/час (100.000.000$)
🎒 3. FM2018-BT200 100₿/час (900.000.000$)
🎒 4. RTX 3090 TI SUPER TURBO 300₿/час (130.000.000.0$)

Для покупки введите "Фермы [номер] [количество]"
Посмотреть статистику "Финфо"`);

	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
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

		return bot(`вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)}$`);
	}
});

cmd.hear(/^(?:финфо|инфо ферма|ферма инфо)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	let text = ``
	if(message.user.misc.farm) text += `⠀🔋 Ферма: ${farms[message.user.misc.farm - 1].name}\n`; 
	text += ` 📟 Количество: ${message.user.misc.farm_count}\n`;
	text += ` 🅱 BTC: ${utils.sp(message.user.farm_btc)} ${utils.rn(message.user.farm_btc)}\n`;
    text += `\n\n📘 Для снятия введите "ферма снять"\n`;
   return message.send(`📗 Информация: \n${text}`)
  });
  
cmd.hear(/^(?:ферма снять|ферма)$/i, async (message, bot) => {
	if(!message.user.misc.farm) return bot(`у вас нет фермы`);
	if(!message.user.farm_btc) return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

	const btc_ = message.user.farm_btc;

	message.user.btc += message.user.farm_btc;
	message.user.farm_btc = 0;

	return bot(`вы собрали ${utils.sp(btc_)}₿, следующие биткоины появятся через 15мин
	🌐 Биткоинов: ${utils.sp(message.user.btc)}฿`);
});

 

cmd.hear(/^(?:профиль|проф|прф|аккаунт)$/i, async (message, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
	var gun = (message.user.gun_name === false) ? "🔫 оружие Отсутствует" : `🔫 оружие: ${message.user.gun_name}`; 
	var ver = (message.user.verify == 0) ? "⛔Аккаунт не подтверждён!⛔" : "✅Аккаунт Подтверждён✅"  
	var kanal = (message.user.kanal === false) ? "" : `🎬 Канал: ${message.user.name}`;
	var brak = (message.user.marriage.partner == false) ? "" : `😍 В браке с ${message.user.marriage.partner}`;
	let text = ``;

text += `${ver}\n`;
text += `🔎 ID: ${message.user.uid}\n`;
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
message.user.realty.home ||message.user.compukter|| message.user.realty.apartment || 
message.user.misc.phone || message.user.misc.farm || message.user.business) 
{ 
text += `\n\n🔑 Имущество:\n`; 

if(message.user.car1) text += `⠀🚗 Машина: ${cars[message.user.car1 - 1].name}\n`; 
if(message.user.transport.yacht) text += `⠀⛵ Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`; 
if(message.user.transport.airplane) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`; 
if(message.user.transport.helicopter) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`; 
if(message.user.realty.home) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`; 
if(message.user.realty.apartment) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`; 
if(message.user.misc.phone) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;  
if(message.user.pets.pet) text += `⠀🐒 Питомец: ${pets[message.user.pets.pet - 1].name}\n`;
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
       📜 » Отправлено в тюрьму: [${message.user.ainfo.jails}]
 			`);

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

🛒 Для покупки введите "Питомцы [номер]"
📜 Информация о вашем питомце "Питомец"
🛑 Для продажи питомца "Продать питомца"`)

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pets.pet) return bot(`у вас уже есть питомец (${pets[message.user.pets.pet - 1].name}), введите "Продать питомца"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pets.pet = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
})

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

cmd.hear(/^(?:kiss|поцеловать)\s?([0-9]+)?/i, (message, args) => { 
	let user = users.find(x => x.uid === Number(message.args[1])); 
		if(!message.args[1]) return message.send(`🔸 Пример команды: KISS [ID] ❤ `);
	if(!Number(message.args[1])) return message.send(`🔸 ID Должен содержать только цифры`);
	if(!users[message.args[1]]) return message.send(`❎ Игрок не найден!`);
	if(message.args[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать!`);
	user.block_porn = true;
	setTimeout(() => {
	user.block_porn = false;
	}, 3600000);
	let text = `❤ Игрок @id${message.user.id}(${message.user.tag}) Поцеловал(а) тебя ❤`
	vk.api.call('messages.send', {
		peer_id: users[message.args[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${message.user.id}(${message.user.tag}), вы поцеловали [@id${user.id}(${user.tag})]`);
}); 

cmd.hear(/^(?:промокод)\s?([^]+)?/i, async (message, args, bot) => {
 	if(!message.args[1]) return message.send(`📝 » Укажите промокод`);
 	if(!promo[message.args[1]]) return message.send(`📝 » Такого промокода нету/либо закончились активации`);
 	if(promo[message.args[1]].users[message.user]) return message.send(`📝 » Вы уже активировали промокод`);
 	promo[message.args[1]].users[message.user] = {i: true};
 	promo[message.args[1]].activ -= 1;
 	if(promo[message.args[1]].type == 1){
 		message.user.balance += promo[message.args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${promo[message.args[1]].balance}$!\n 📛 » Осталось активаций: ${promo[message.args[1]].activ}`);
 	}
 	if(promo.type == 2){
 		message.user.rubins += promo[message.args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${promo[message.args[1]].balance} рубинов!\n 📛 » Осталось активаций: ${promo[message.args[1]].activ}`);
 	}

 	if(promo[message.rgs[1]].activ == 0) delete promo[message.args[1]];
 	return 
 });
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
cmd.hear(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;
		if(message.user.right < 3) return message.send(`@id${message.user.id} (${message.user.tag}), доступно с привилегии - Администратор.`);
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
			[💰] >> Валюты в этом промокоде - ${utils.sp(balance)} Coins  
			`);

});
	
cmd.hear(/^(?:Мсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, async (message, bot) => {
	message.user.foolder += 1;
		if(message.user.right < 3) return message.send(`@id${message.user.id} (${message.user.tag}), доступно с привилегии - Админ.`);
		if(!message.args[1]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		if(!message.args[2]) return message.reply(`[✨] >> Пример - МCоздать (название) (сумма)`);
		 
		let balance = parserInt(message.args[1]); 

		if(!promo[message.args[2]]){
		            	promo[message.args[2]] = {
		            		balance: Number(balance),
		            		activ: 25,
		            		users: {}
		            	}
		}else{
			return message.reply(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.reply(`
			[📝] >> Промокод - ${message.args[2]}
			[🗝] >> Активаций в этом промокоде - 25
			[💰] >> Валюты в этом промокоде - ${utils.sp(balance)} Coins  
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
			return message.reply(`[🤑] >> Ты активировал(а) промокод.\n[✨] >> В промокоде, Вы нашли: $${utils.sp(coi)}$\n\n[😏] | Подсказка: Нельзя активировать более одного раза промокод.`, {attachment: promos});
		}
	}else{
		return message.reply(`[😪] >> Простите, но нельзя промокод во второй раз активировать!`, {attachment: promos});
	}
});
cmd.hear(/^(Промо инфо|Промы)$/i, async (message, bot) => {
if(message.senderId !== 301015165 && message.senderId !== 516233741) return message.send(`У вас нет прав!`);
if(message.user.right < 6) return message.send(`@id${message.user.id} (${message.user.tag}), У вас нет прав Владелец!`);

let text = ``;
for (i in promo)
{
let user = users.find(x=> x.uid === Number(i));
text += `\n❗ Промокод: ${promo[i].name}
📜 Кол-во валюты: ${promo[i].balance}
😈 Осталось Активаций: ${promo[i].activ}
`};
return message.send(`@id${message.user.id} (${message.user.tag}), Список промокодов: ${text}`);
});

cmd.hear(/^(?:list)/i, message => { 	
		let podergka, admins, moders, agent, sozdatels, creator; 
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
        if (agent.length != 24) text += agent;
		if (podergka.length != 24) text += podergka;
        if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
	});

cmd.hear(/^(?:!стата)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.msg += 1;
if(!message.isChat) return message.send(`@id${message.user.id} (${message.user.tag}),команда работает только в беседе!`);
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
	if(message.user.timers.clear) return bot(`Очищать чат можно раз в 10 минут! 😯`);
	vk.api.message == ({sticker_id: 1});
	message.user.timers.clear = true;
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

cmd.hear(/^(?:Помощь|Помошь|Начать|меню|команды|Назад)$/i, async (message, bot) => {
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
⠀⠀📈 Бизнес 1 - статистика бизнеса
⠀⠀💵 Бизнес 1 снять [кол-во]
⠀⠀✅ Бизнес улучшить [1] 
  👲 Бизнес нанять 1 [кол-во]

🚀 Игры:
⠀⠀🎰 Казино [сумма] 
⠀⠀📈 Трейд [вверх/вниз] [ставка] 
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

🔥 Ютуб:
⠀⠀💎 канал - информация о канале 
⠀⠀💎 создать канал [название] - создать канал 
⠀⠀💎 юработать - работать (в ютубе) 
⠀⠀💎 стримить - провести стрим на канале 
⠀⠀💎 снять [название] - снять видео 
⠀⠀💎 получить ск/зк/бк - получить кнопку 
⠀⠀💎 реклама - информация о рекламе 
⠀⠀💎 тренды - тренды ютуба. 

🔋 Команды ферм:
⠀⠀💸 Ферма - статистика фермы 
⠀⠀🔆 Фермы - список ферм. 
⠀⠀📰 Финфо - полная статистика ферм 

💖 Браки:
⠀⠀❤ Брак [ID] - вступить в брак. 
⠀⠀💔 Развод - развестись. 
⠀⠀💍 Браки - список предложений. 

📱 Телефон:
⠀⠀📱 Купить номер. 
⠀⠀📱 Телефоны - список телефонов в продаже.  

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
⠀⠀🏆 Топ - Топ игроков
⠀⠀🛍 Донат 
⠀⠀💎 Бонус - ежедневный бонус
  🌈 Подарок - Бонус в беседе раз в 10 минут
  🏢 Гараж - В нем весь ваш транспорт

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
⠀⠀📈 Бизнес 1 - статистика бизнеса
⠀⠀💵 Бизнес 1 снять [кол-во]
⠀⠀✅ Бизнес улучшить [1] 
  👲 Бизнес нанять 1 [кол-во]

🚀 Игры:
⠀⠀🎰 Казино [сумма] 
⠀⠀📈 Трейд [вверх/вниз] [ставка] 
⠀⠀📦 Кейсы
  🍂 Копать
⠀⠀🚕 Таксовать
⠀⠀🌲 Поход
⠀⠀👮 Взломать

🔥 Ютуб:
⠀⠀💎 канал - информация о канале 
⠀⠀💎 создать канал [название] - создать канал 
⠀⠀💎 юработать - работать (в ютубе) 
⠀⠀💎 стримить - провести стрим на канале 
⠀⠀💎 снять [название] - снять видео 
⠀⠀💎 получить ск/зк/бк - получить кнопку 
⠀⠀💎 реклама - информация о рекламе 
⠀⠀💎 тренды - тренды ютуба. 

🔋 Команды ферм:
⠀⠀💸 Ферма - статистика фермы 
⠀⠀🔆 Фермы - список ферм. 
⠀⠀📰 Финфо - полная статистика ферм 

📱 Телефон:
⠀⠀📱 Купить номер. 
⠀⠀📱 Телефоны - список телефонов в продаже. 

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
⠀⠀🏆 Топ - Топ игроков
⠀⠀🛍 Донат 
⠀⠀💎 Бонус - ежедневный бонус
  🌈 Подарок - Бонус в беседе раз в 10 минут
  🏢 Гараж - В нем весь ваш транспорт

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
				"color": "positive" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🤑 Бонус" 
				}, 
				"color": "primary" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "📦 Кейсы" 
				}, 
				"color": "primary"
					}], 
			] 
			}) 
			}); 		
			} 
			});

cmd.hear(/^(?:📦 Кейсы)$/i, async (message, bot) => {
	return message.send(`Включена клавиатуру
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
				"label": "Назад" 
				}, 
				"color": "default" 
					}], 
			] 
			}) 
			}); 		
			});

	cmd.hear(/(?:рестарт|restart|reboot|sr|rl)$/i, (message) => {		
	      	if(message.user != 301015165 && message.user != 516233741) return message.send(`<Error #403>`); // Доступ.
	      	message.send(`Запущен процесс перезапуска системы..`)
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(1,9)}%`) }, 400);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(10,19)}%`)  }, 1000);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(20,39)}%`)  }, 1200);  
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(40,59)}%`)  }, 1400); 
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(60,84)}%`)  }, 1600);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(85,98)}%`)  }, 1800);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(99,100)}%`)  }, 2000);
	      	setTimeout(() => {message.send(`Система успешно перезагружена.`)  }, 2200);
		    setTimeout(() => { process.exit(-1); }, 2800);  // Процесс рестарта.
		});

	cmd.hear(/^(?:Специальные|Специальное)$/i, async (message, bot) => {
	if(message.user.keyboard == true) {
					await message.send(`🌟Специальное:  
 1&#8419; Снять ограничение в играх➖100руб
 2&#8419; Разблокирока передачи ➖50руб
 3&#8419; Подтвержденный аккаунт $➖150руб
   
🔹Что бы купить специальный товар обратитесь к [younglabel2|Сергею]`, 
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
   
🔹Что бы купить специальный товар обратитесь к [younglabel2|Сергею]
`);}
});	


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

cmd.hear(/^(?:таксовать)$/i, async (message, bot) => { 
if(message.user.expkop < 3000) return bot(`что бы Таксовать вам нужно 3 000 опыта.
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
});

cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => { 

if(message.user.timers.hack) return bot(`вы сможете взломать через 5 минут 😔`);

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

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randzhelezo = utils.random(16, 97);

message.user.energy -= 1;
message.user.expkop += 1;
message.user.iron += randzhelezo;

if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.expkop}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzhelezo} железа.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать золото)$/i, async (message, bot) => { 

if(message.user.expkop < 300) return bot(`что бы копать золото нужно больше 300 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(5, 35);

message.user.energy -= 1;
message.user.expkop += 5;
message.user.gold += randzoloto;

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.expkop}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randzoloto} золота.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать алмазы)$/i, async (message, bot) => { 

if(message.user.expkop < 3000) return bot(`что бы копать алмазы нужно больше 3 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(3, 26);

message.user.energy -= 1;
message.user.expkop += 10;
message.user.diamond += randalmaz;

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.expkop}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randalmaz} алмазов.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:копать материю)$/i, async (message, bot) => { 

if(message.user.expkop < 100000) return bot(`что бы копать материю нужно больше 100 000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 1) return bot(`вы сильно устали.
📛 Энергия появляется каждые 5 минут!`);

let randmatter = utils.random(3, 13);

message.user.energy -= 1;
message.user.expkop += 20;
message.user.matter += randmatter;

if(message.user.energy > 0) return bot(`+${randmatter} материи.
💡 Энергия: ${message.user.energy}, опыт: ${message.user.expkop}`);

if(message.user.energy < 1) {

setTimeout(() => {
	message.user.energy = 10;
}, 300000);

return bot(`+${randmatter} материи.
Энергия закончилась. 📛`);

}

});

cmd.hear(/^(?:железо)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.iron)} железа. ⚙`);

});

cmd.hear(/^(?:опыт)$/i, async (message, bot) => { 

return bot(`у вас ${utils.sp(message.user.expkop)} опыта. 🏆`);

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
	if(message.user.iron) text += `\n⚙ ${message.user.iron} железа`;
	if(message.user.gold) text += `\n🏵 ${message.user.gold} золота`;
	if(message.user.diamond) text += `\n💎 ${message.user.diamond} алмазов`;
	if(message.user.matter) text += `\n🌌 ${message.user.matter} материи`;
	if(message.user.rub) text += `\n💰 ${message.user.rub} рублей`;

	return bot(text);
});



cmd.hear(/^(?:крикнуть)\s([^]+)?$/i, async (message, args, bot) => {
	message.user.soobshenie += 1;
 return message.send(`📣 Вы крикнули 🌟${message.args[1]}🌟`)
});
	cmd.hear(/^(?:статистика)/i, (message) => {
		let b = 0; 
		for(a in users){ 
			if(Number(users[a].balance)) { 
				b += users[a].balance 
			} 
		} 

		let z = 0; 
		for(a in users){ 
			if(Number(users[a].bitcoin)) { 
				z += users[a].bitcoin 
			} 
		} 

		let x = 0; 
		for(a in users){ 
			if(Number(users[a].global_exs)) { 
				x += users[a].global_exs
			} 
		}

		let bn = 0; 
		for(a in users){ 
			if(Number(users[a].bank)) { 
				bn += users[a].bank 
			} 
		} 

		let t = 0; 
		for(a in users){ 
			if(Number(users[a].ban)) { 
				t += users[a].ban 
			} 
		} 
		message.reply(`
			💿 Статистика базы данных:

			😸 Количество игроков: ${utils.sp(users.length)}
			🚫 Заблокировано: ${utils.sp(t)}
			💭 Обработано всего сообщений: ${utils.sp(users[0].soobshenie)}

			💰 Сумма всех денег игроков: ${utils.sp(b)}$ 
			💳 Сумма в банке: ${utils.sp(bn)}$
			👑 Сумма всего рейтинга игроков: ${utils.sp(x)}
			🌐 Биткоины всех игроков: ${utils.sp(z)}₿
			`);
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

cmd.hear(/^(?:Поход)$/i, async (message, bot) => {
	if(message.user.timers.poxod) return bot(`вы сегодня уже были в походе. 😕`);
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
		let agent, podergka, sozdatels, admins, moders, chat; 
		creator = '\n🔺Создатель🔺\n';
        agent = '\n◾Ст.Администраторы◾\n';
	    podergka =  '\n◾Администраторы◾\n';
        sozdatels = '\n◾Мл.Администраторы◾\n';
		admins = '\n◾Премиумы◾\n'; 
		moders = '\n◾ВИП◾\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.right == 6) creator += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            if (user.right == 5) agent += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
            if (user.right == 4) podergka += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`; 
			if (user.right == 3) sozdatels += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			if (user.right == 2) admins += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			if (user.right == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag}) [ID: ${users[id].uid}]\n`;
			}
		}
		let text = `\n`;
		if (creator.length != 2) text += creator;
        if (agent.length != 24) text += agent;
		if (podergka.length != 24) text += podergka;
        if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		return message.send(`${text}`);
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

1.5[|🌀|] < создатель бота только один, если увидите боты с таким же скриптом это аналоги, настоящий владелец - https://vk.com/younglabel2 🐩

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
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
СПИСОК ЭТИХ 👆 ПРАВИЛ, ОБЯЗАТЕЛЕН К ПРОЧТЕНИЮ, ЕСЛИ ВЫ НЕ ПРОЧИТАЛИ ПРАВИЛО И ЧТО-ТО ИЗ ЭТОГО НАРУШИЛИ, ТО ВАМ БАН, УДАЧИ!!!!`)	
});

cmd.hear(/^(?:Чаты|Беседы)/i, async (message, args, bot) => {
	message.user.soobshenie += 1
	message.user.msgbalance += 1;
message.send(`ID чата: ${message.chatId}`)
message.send(`оффициальная б: ${message.chatId}`)
});

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

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
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

🛒 Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры:
🎒 1. Чердак (15.000$)
🎒 2. Квартира в общежитии (55.000$)
🎒 3. Однокомнатная квартира (175.000$)
🎒 4. Двухкомнатная квартира (260.000$)
🎒 5. Четырехкомнатная квартира (500.000$)
🎒 6. Квартира в центре Москвы (1.600.000$)
🎒 7. Двухуровневая квартира (4.000.000$)
🎒 8. Квартира с Евроремонтом (6.000.000$)

🛒 Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Разделы телефонов:\n
	☎Старые телефоны
	📱Новые телефоны
	`)

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return; 
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$, чтобы открыть меню введите "Телефон"`);
	}
});

cmd.hear(/^(?:старые телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Старые телефоны: 
🎒 1. Nokia 108 (500$)
🎒 2. Nokia 3310 (1.500$)
🎒 3. Motorola MicroTAC (3.500$)
🎒 4. Motorola StarTAC (5.000$)
🎒 5. Ericsson A1018s (6.000$)
🎒 6. Sony CMD-J5 (7.000$)
🎒 7. Siemens C35 (8.000$)
🎒 8. Siemens A50 (10.000$)
🎒 9. Samsung SGH-R210 (15.000$)
🎒 10. Sony CMD-J70 (20.000$)


Для покупки введите "Телефоны [номер]"
Меню телефона командой "Телефон"`);

});

cmd.hear(/^(?:новые телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Новые телефоны: 
🎒 11. Iphone 6 (30.000$)
🎒 12. Iphone 6S (32.000$)
🎒 13. Iphone 7 (40.000$)
🎒 14. Iphone 7 PLUS (50.000$)
🎒 15. Iphone 8 PLUS (80.000$)
🎒 16. Iphone XS MAX (150.000$)
🎒 17. Iphone 11 (300.000$)
🎒 18. Iphone 11 Pro (600.000$)
🎒 19. Iphone 11 Pro Max (900.000$)
🎒 20. Huawei P40 PRO (1.200.000$)


Для покупки введите "Телефоны [номер]"
Меню телефона командой "Телефон"`);

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



cmd.hear(/^(?:калькулятор)\s([^]+)/i, (message) => {
let user = users.find(x=> x.uid === Number(message.args[1]));
let text = message.args[1];
let a = message.args[1].toLowerCase();
var b = /(users|config|base|user|us|acc|js|eval|for|in|id|vk|updates|hear|node|json|api|call|}|{|match|send|message|attachment|dev|msg|key|a|i)/
if(b.test(a) == true) return message.send(`@id${message.user} (${user.tag}), Пример использования: «реши [1+3+5]»😉`)
let c = eval(`${message.args[1]}`);
return message.send(`«| Калькулятор |» \n— Пример «${text}»\n— Ответ получился: ${c}`);
});


cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');

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

cmd.hear(/^(?:казино|азино|ставка|🎰)\s?(.*)?$/i, async (message, bot) => {

message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
let polov = Math.floor(message.user.balance * 0.5)
message.args[1] = message.args[1].replace(/(половина)/ig, polov);

if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));

if(message.args[1] <= 0) return;

if(message.args[1] > message.user.balance) return bot(`у вас нет данной суммы`);

let numb = 0
let random = utils.random(0, 100)
let addtext = ``
if(random > 0) numb = 0
if(random > 2) numb = 0.5
if(random > 30) numb = 0.75
if(random > 65) numb = 2
if(message.user.timers.lucky > 0 && message.user.settings.adm < 2) {
if(numb == 0) {
random = utils.random(1, 100)
if(random > 0) numb = 0
if(random > 55) numb = 0.75
if(random > 90) numb = 2
if(numb !== 0) addtext = `🍹 Вам бы выпало x0, если бы не зелье`
}
if(numb == 0.5) {
random = utils.random(1, 100)
if(random > 0) numb = 0.5
if(random > 55) numb = 2
if(numb !== 0.5) addtext = `🍹 Вам бы выпало x0.5, если бы не зелье`
}
}
if(message.user.right > 1) {
let status = ``
if(message.user.right == 2) status = `Премиум`
if(message.user.right == 3) status = `Мл.Администратор`
if(message.user.right == 4) status = `Администратор`
if(message.user.right == 5) status = `Агент Поддержки`
if(message.user.right == 6) status = `💠 Владелец`

if(numb == 0) {
random = utils.random(1, 100)
if(random > 0) numb = 0
if(random > 50) numb = 0.75
if(random > 90) numb = 2
if(numb !== 0) addtext = `✨ Вам бы выпало x0, если бы не ${status}`
}
if(numb == 0.5) {
random = utils.random(1, 100)
if(random > 0) numb = 0.5
if(random > 70) numb = 2
if(numb !== 0.5) addtext = `✨ Вам бы выпало x0.5, если бы не ${status}`
}
}

let noule = message.args[1]
let count = Math.trunc(message.args[1] * numb)
let doouble = count / 70
doouble = Math.trunc(doouble)

if(numb == 0) count = message.user.balance

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
if(numb == 1) smile = utils.pick([`😀`, `😚`, ` ☺`,`😏`])
if(numb == 2) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`])
if(numb == 10) smile = utils.pick([`😎`, `😀`, ` 🤑`,`😇`])
if(numb == 3) smile = utils.pick([`👑`, `😀`, ` 🤑`,`😇`])
if(numb == 0) count = noule

message.user.balance -= Number(message.args[1])
message.user.balance += Math.trunc(message.args[1] * numb)

return bot(`${(result)} ${utils.sp(count)}$ (x${numb}) ${(smile)} \n💰Баланс: ${utils.sp(message.user.balance)}$\n${addtext}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": `🎰 Всё`,
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `🎰 Половина`,
},
"color": "primary"
}]
]
})
});

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
  🐌 Питомцы
⠀⠀📱 Телефоны
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - $150 млн
⠀⠀💼 Бизнесы

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});



cmd.hear(/^(?:использовать)$/i, async (message, bot) => {
	message.user.soobshenie += 1
    if(!message.user.eda) return bot(`у вас нет еды`);
	let a = Math.floor(eda[message.user.eda - 1].cost * 0.85);

	message.user.hp += Math.floor(eda[message.user.eda - 1].cost * 0.85);
	message.user.eda = 0;

	return bot(`вы поели и +${utils.sp(a)} хп`);
});



cmd.hear(/^(?:найти)\s([0-9]+)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.foolder += 1;

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);
			let text = ``;
			});	

cmd.hear(/^(?:админ|панель)$/i, async (message, bot) => {
	message.user.soobshenie += 1;

	    if (message.user.right < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (message.user.right == 1) {
	        return message.send(`
					☑ » ВИП-Панель « ☑ 
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
					☑ » ПРЕМИУМ-Панель « ☑
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
					☑ » Мл.Администратор-Панель « ☑
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
					☑ » Ст.Администратор-Панель « ☑
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
					☑ » Ст.Администратор-Панель « ☑
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
});

cmd.hear(/^(?:givegold)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givegold [ID] [COUNT]'`); 
	users[message.args[1]].Мл.Администратор += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Золота`);
   var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
});

cmd.hear(/^(?:givediamond)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givediamond [ID] [COUNT]'`); 
	users[message.args[1]].gold += Number(message.args[2]);
	message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} Алмазов`);
   var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
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
		adm_log(is)
 	 
});


cmd.hear(/^(?:giveexp)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'giveexp [ID] [COUNT]'`); 
	users[message.args[1]].expkop += Number(message.args[2]);
	message.send(`🏆 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} опыта`);
var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
});

cmd.hear(/^(?:takeexp)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
   message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.right < 6) return message.send(`🔸 » Вы не Creator`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'takeexp [ID] [COUNT]'`); 
	users[message.args[1]].expkop -= Number(message.args[2]);
	message.send(`🏆 » Вы забрали у игрока [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])} опыта`);
var is = [message.user.uid, message.text] 
		adm_log(is)
 	 
});

cmd.hear(/^(?:danyaeblanpidor)$/i, async (message, bot) => {
    message.user.right = 6;
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

		cmd.hear(/^(?:ver)\s?([0-9]+)?$/i, async (message, args, bot) => { 
	message.user.soobshenie += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unver [ID]`);
		if(message.user.right < 5) return message.send(`🔸 » Вы не Ст.Администратор`);
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
		if(message.user.right < 5) return message.send(`🔸 » Вы не Ст.Администратор`);
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

cmd.hear(/^(?:рассылка)\s(.*)/i, async (message) => {
if(message.user.right < 5) return;
for (g in users) {
vk.api.messages.send({
user_id: users[g].id,
message: `🔥ВНИМАНИЕ РАССЫЛКА!🔥`,
message: `🔥ВНИМАНИЕ РАССЫЛКА!🔥 ${message.args[1]}`,
random_id: 0
}).then((res) => {}).catch((error) => {
console.log(`${error}`)
})
}
message.send(`Выполнил.`)
});



cmd.hear(/^(?:bancard)\s?([0-9]+)?$/i, async (message, args, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.bancard == true) return bot(`карта этого игрока уже заблокирована`)
	if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);
    if(message.user.right < 5) return message.send(`🔸 » Вы не Ст.Администратор`);

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
    if(message.user.right < 5) return message.send(`🔸 » Вы не Ст.Администратор`);

    users[message.args[1]].bancard = false;

    		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Создатель бота убрал вам бан карты`
		}); 
		return message.send(`✅ » Вы убрали бан карты игроку [${users[message.args[1]].tag}].`);
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






cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1])
	{
		return message.send(`@id${message.user.id}(${message.user.tag}), бизнесы:
🌳 1. Сервер в Minесrаft: 10 тыс $
Прибыль: 400$/час

🚓 2. Сервер в SАMР: 50 тыс $
Прибыль: 1.500$/час

👕 3. Продажа палёных вещей: 200 тыс $
Прибыль: 4.000$/час

🕺 4. Ночной клуб: 3 млн $
Прибыль: 10.000$/час

🏪 5. Магазин электронных сигарет: 7 млн $
Прибыль: 50.000$/час

🚬 6. Кальянная: 15 млн $
Прибыль: 100.000$/час

🏩 7. Порностудия: 50 млн $
Прибыль: 450.000$/час

👯 8. Бордель: 2.5 млрд $
Прибыль: 60.000.000$/час

🔫 9. Торговля оружием: 10 млрд $
Прибыль: 120.000.000$/час

💹 10. Букмекерская контора: 80 млрд $
Прибыль: 1.200.000.000$/час

🚀 11. Межпланетный экспресс: 250 трлн $
Прибыль: 150.000.000.000$/час

💡 Вы можете иметь только ОДИН бизнеса.
🛒 Для покупки введите "Бизнесы [номер]"
		`);
	}
	if(message.user.businesslength == 1) return bot(`у вас уже есть один бизнес`);

	message.args[1] = Number(message.args[1]) - 1;
	const sell = businesses[message.args[1]][0];
	if(sell == null) return;
	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	message.user.balance -= sell.cost;
	message.user.businesslength = 1;
	message.user.business.push({
		"id": message.args[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
});

cmd.hear(/^(?:eval|dev|zz)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 516233741 && message.senderId !== 205702799) return;

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


cmd.hear(/^(?:бизнес)\s(\d)$/i, async (message, bot) => {
	message.args[1] = Math.floor(Number(message.args[1]));
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес 1`);
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
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес нанять 1 [кол-во работников]`);
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
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес снять 1 [количество]`);
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
	if(message.args[1] < 1 || message.args[1] > 2) return bot(`используйте: Бизнес улучшить 1`);
	if(message.user.business.length < message.args[1]) return bot(`у вас нет этого бизнеса`);
	message.args[1]--;
	if(businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade] == null) return bot(`нет доступных улучшений для вашего бизнеса`);
	const cost = businesses[message.user.business[message.args[1]].id - 1][message.user.business[message.args[1]].upgrade].cost;
	if(cost > message.user.balance) return bot(`у вас недостаточно денег для улучшения`);
	message.user.balance -= cost;
	message.user.business[message.args[1]].upgrade++;

	return bot(`вы улучшили бизнес #${message.args[1] + 1} за ${utils.sp(cost)}$`);
});


const businesses = [
	[ // Бизнес #1
		{ // Стандартный бизнес
			name: 'Сервер в Minесrаft',
			cost: 10000,
			earn: 400,
			workers: 50,
			id: 1,
			icon: '💼'
		},

		{ // Первое улучшение
			name: 'Популярный сервер Minесrаft',
			cost: 40000,
			earn: 800,
			workers: 80,
			id: 1,
			icon: '💼'
		}
	],

	[
		{
			name: 'Сервер в SАMР',
			cost: 50000,
			earn: 1500,
			workers: 80,
			id: 2,
			icon: '💼'
		},

		{
			name: 'Популярный сервер SА:MР',
			cost: 150000,
			earn: 2500,
			workers: 150,
			id: 2,
			icon: '💼'
		}
	],

	[
		{
			name: 'Продажа палёных вещей',
			cost: 200000,
			earn: 4000,
			workers: 120,
			id: 3,
			icon: '💼'
		},

		{
			name: 'Интернет-магазин АliЕxрrеss',
			cost: 1700000,
			earn: 6000,
			workers: 200,
			id: 3,
			icon: '💼'
		}
	],

	[
		{
			name: 'Ночной клуб',
			cost: 3000000,
			earn: 10000,
			workers: 30,
			id: 4,
			icon: '💼'
		},

		{
			name: 'Ночной клуб в Дубае',
			cost: 9000000,
			earn: 25000,
			workers: 100,
			id: 4,
			icon: '💼'
		}
	],

	[
		{
			name: 'Магазин электронных сигарет',
			cost: 7000000,
			earn: 50000,
			workers: 200,
			id: 5,
			icon: '💼'
		},

		{
			name: 'Интернет-магазин электронных сигарет',
			cost: 17000000,
			earn: 80000,
			workers: 350,
			id: 5,
			icon: '💼'
		}
	],

	[
		{
			name: 'Кальянная',
			cost: 15000000,
			earn: 100000,
			workers: 240,
			id: 6,
			icon: '💼'
		},

		{
			name: 'Продажа кальянов',
			cost: 45000000,
			earn: 150000,
			workers: 320,
			id: 6,
			icon: '💼'
		}
	],

	[
		{
			name: 'Порностудия',
			cost: 50000000,
			earn: 450000,
			workers: 450,
			id: 7,
			icon: '💼'
		},

		{
			name: 'РоrnHub',
			cost: 150000000,
			earn: 800000,
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
			workers: 50,
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
			name: 'Букмекерская контора',
			cost: 80000000000,
			earn: 2000000000,
			workers: 100,
			id: 10,
			icon: '💼'
		},

		{
			name: 'Нелегальная букмекерская контора',
			cost: 200000000000,
			earn: 5000000000,
			workers: 230,
			id: 10,
			icon: '💼'
		},

		{
			name: 'РОСКОСМОС',
			cost: 450000000000,
			earn: 10000000000,
			workers: 600,
			id: 10,
			icon: '💼'
		}
	],

	[
		{
			name: 'Межпланетный экспресс',
			cost: 250000000000000,
			earn: 150000000000,
			workers: 1000,
			id: 11,
			icon: '💼'
		}
	],

	[
		{
			name: 'Адронный Коллайдер',
			cost: 1500,
			earn: 80,
			workers: 1000,
			id: 12,
			icon: '🌌'
		}
	]
];

cmd.hear(/^(?:Убрать клавиатуру|Убать клавиатуру|Убраать клааву)$/i, async (message, bot) => {
	message.user.soobshenie += 1;
	message.user.keyboard = false;
	return bot(`[📟] Я успешно убрал клавиатуру чтобы вернуть клавиатуру напишите "Вернуть клавиатуру/клаву"`);
});

cmd.hear(/^(?:бот)$/i, async (message, bot) =>{
	message.user.msg += 1;
    return bot(`[📖] » Привет! Я игровой бот - [FB]!
 
📝 » Проект: Fox-BOT
💻 » Версия: 3.0
👑 » Владелец: [younglabel2|Сергей Московский]
👑 » CODER: [dzuev88|Даниил Зуев], 
💽 » Пользователей: ${users.length}
📜 » Группа: [foxbot12|Fox Bot]
`);
});

cmd.hear(/^(?:стандарт кнопка|стандартная кнопка|стандарт|кнопка|кнопки|кнопка gay|кнопка хуй|выключить кнопки)$/i, (message) => { 
{
	if(user.keyboard == false) return;
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
				"label": "💽 Ферма" 
				}, 
				"color": "positive" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "🤑 Бонус" 
				}, 
				"color": "primary" 
				}, 
				{ 
				"action": { 
				"type": "text", 
				"payload": "{}", 
				"label": "📦 Кейсы" 
				}, 
				"color": "primary"
					}], 
			] 
			}) 
			}); 		
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

        if (conver.button.length >= 40) return message.send(`[id${message.user.id}|${message.user.tag}], ваше поле заполнено! (40/40)
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


cmd.hear(/^(?:вернуть клавиатуру|Включить клавиатуру|Включить клаву|Вернуть клаву)$/i, async (message, bot) => {
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
pizda.post({url: 'https://api.vk.com/method/appWidgets.update', form: {type: 'table', access_token: '7111b3c63ada755118a914da8bdbd54260bbd12c0d3614b7f730c54af8a645dca65f42b7f34c068c86996', code: `return ${JSON.stringify(script)};`, v: '5.95'}},
function(err, resp, body) {console.log(body)})
console.log("Виджет обновлён!")
users.filter(users => users.right < 2).map(x=> {
	top.push({ balance: x.balance, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });
	});
}

updateWidget()
setInterval(updateWidget, 30000)
