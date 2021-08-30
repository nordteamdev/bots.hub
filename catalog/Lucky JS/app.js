const FLEX = require('./flex.json'); //ААААААААА, ЭТО ЖЕ САМ ФЛЕКС!!!!!!
const VODKA = require('./vodka.json');
const BANS = require('./bans.json');
const fs = require("fs"); 
setInterval(function(){
	fs.writeFileSync('./flex.json', JSON.stringify(FLEX, null, '\t')) 
	fs.writeFileSync('./vodka.json', JSON.stringify(VODKA, null, '\t'))
	fs.writeFileSync('./bans.json', JSON.stringify(BANS, null, '\t'))    
}, 1500);

const qr = require('@vkontakte/vk-qr/dist/umd/qrCodeGenerator');
var svg2img = require('svg2img');
const QRReader = require('qrcode-reader');
const jimp = require('jimp');
var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi('480d456ed');

const playstation = [
	{
		name: 'Microsoft Xbox One S',
		cost: 19999,
		id: 1
	},
	{
		name: 'Microsoft Xbox One',
		cost: 24999,
		id: 2
	},
	{
		name: 'Sony PlayStation 4 Slim',
		cost: 25999,
		id: 3
	},
	{
		name: 'Microsoft Xbox One X',
		cost: 37999,
		id: 4
	},
	{
		name: 'Sony PlayStation 4 Pro',
		cost: 46999,
		id: 5
	}
];
const comps = [
	{
		name: 'Ноутбук Acer Aspire 3',
		cost: 18200,
		id: 1
	},
	{
		name: 'Ноутбук Lenovo Ideapad 330-15IKB ',
		cost: 32300,
		id: 2
	},
	{
		name: 'Ноутбук Acer Predator Helios 300 ',
		cost: 60700,
		id: 3
	},
	{
		name: 'Ноутбук Acer Predator Triton',
		cost: 157100,
		id: 4
	},
	{
		name: 'Ноутбук Apple MacBook Pro',
		cost: 165600,
		id: 5
	}
];

const APARTMENTS = [
	{
		name: 'Коммунальная квартира',
		cost: 15990,
		id: 1
	},
	{
		name: 'Однокомнатная квартира',
		cost: 250990,
		id: 2
	},
	{
		name: 'Квартира разработчика Lucky Life',
		cost: 569990,
		id: 3
	},
	{
		name: 'Квартира с Евроремонтом',
		cost: 6999990,
		id: 4
	},
	{
		name: 'Квартира в центре Москвы',
		cost: 15000000,
		id: 5
	}
];
const phones = [
	{
		name: 'Samsung Galaxy A10',
		cost: 7900,
		id: 1
	},
	{
		name: 'Samsung Galaxy J4 Plus',
		cost: 10800,
		id: 2
	},
	{
		name: 'Meizu 15 Plus',
		cost: 18100,
		id: 3
	},
	{
		name: 'Apple iPhone 6S',
		cost: 22400,
		id: 4
	},
	{
		name: 'Apple iPhone Xs Max',
		cost: 126800,
		id: 5
	}
];
const HOMES = [
	{
		name: 'Старый ангар',
		cost: 6500,
		id: 1
	},
	{
		name: 'Дом в конюшне',
		cost: 10800,
		id: 2
	},
	{
		name: 'Отель',
		cost: 19100,
		id: 3
	},
	{
		name: 'Призидетснкий дом',
		cost: 47100,
		id: 4
	},
	{
		name: 'Дом разработчиков Lucky Life',
		cost: 192800,
		id: 5
	}
];
const CARS = [
	{
		name: 'BMW Z4 M',
		cost: 3990000,
		id: 1
	},
	{
		name: 'Audio Q7',
		cost:  6520000,
		id: 2
	},
	{
		name: 'BMW X6',
		cost: 6520000,
		id: 3
	},
	{
		name: 'Tesla Roadster',
		cost: 15981000,
		id: 4
	},
	{
		name: 'Lamborghini Veneno',
		cost: 297000000,
		id: 5
	}
];
const pets = [
	{
		name: 'Кошка',
		cost: 100,
		icon: "🐈",
		min: 50,
		max: 150,
		id: 1
	},
	{
		name: 'Собака',
		cost:  500,
		icon: "🐕",
		min: 100,
		max: 270,
		id: 2
	},
	{
		name: 'Попугай',
		cost: 1000,
		icon: "🐦",
		min: 250,
		max: 340,
		id: 3
	},
	{
		name: 'Хомяк',
		cost: 1700,
		icon: "🐹",
		min: 300,
		max: 530,
		id: 4
	},
	{
		name: 'Кролик',
		cost: 2300,
		icon: "🐇",
		min: 600,
		max: 850,
		id: 5
	}
];
let stats = {
	messages: {
		inbox: 0,
		outbox: 0
	},
	new_users: 0,
	bot_start: Date.now()
}

let top = [];

process.env.TZ = "Europe/Moscow";

const utils = require("./utils");
const mongo = require("mongoose");
const child_process = require('child_process');
const request = require("request");
const mathjs = require("mathjs");
mongo.connect("mongodb://");
const schema = new mongo.Schema({
	uid: Number,
	id: Number,
	balance: Number,
	kredit: Number,
	bank: Number,
	prefix: Boolean,
	reol: Number,
	work: Number,
	flat: Number,
	house: Number,
	tag: String,
	familia: String,
	warn: Number,
	ban: Boolean,
	age: Number,
	days: Number,
	seria: Number,
	pet: Number,
	phealth: Number,
	seriap: Number,
	numberp: Number,
	passport: Boolean,
	regDate: Number,
	document: Number,
	tbonus: Number,
	twork: Number,
	treport: Number,
	tglass: Number,
	ref: Number,
	bantop: Boolean,
	nick: Boolean,
	notifications: Boolean,
	banreport: Boolean,
	banpay: Boolean,
	mention: Boolean,
	donate: Number,
	rass: Boolean,
	buttons: Array,
	partner: 0,
	energy: Number,
	health: Number,
	hunger: Number,
	sleep: Number,
	life: Number,
	sila: Number,
	admin: Number,
	marry: Number,
	stage: Number,
	ebank: Number,
	gamepr: 0,
	kvar: 0,
	car: 0,
	psi: 0,
	comp: 0,
	home: 0,
	phone: 0,
	pohod: 0,
	vipb: Boolean,
	admingive: Number,
	tsafe: Number,
	donable: Number,
	questt: 0,
	questtt: Boolean,
	questc: 0,
	questcc: Boolean,
	questg: 0,
	questgg: Boolean,
	questd: 0,
	questdd: Boolean,
	requests: Array
});

const promoSchema = new mongo.Schema({
	title: String,
	count: Number,
	users: Array,
	sum: Number
});

const logSchema = new mongo.Schema({
	from: Number,
	to: Number,
	date: Number,
	amount: Number
})
const { works } = require("./Earns.js");


const User = mongo.model("User", schema);
const Promo = mongo.model("Promo", promoSchema);
const Log = mongo.model("Log", logSchema);

function genToken(length) {
let a = "abcdefghijklmnopQRstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""); 
let b = []; 
for (let i = 0; i < length; i++) { 
let j = (Math.random() * (a.length - 1)).toFixed(0); 
b[i] = a[j]; 
} 
return b.join(""); 
}
const { VK, Keyboard } = require("vk-io");
const keyboard = Keyboard;
const cheerio = require("cheerio");
let uservk = new VK();
uservk.setOptions({
    token: 'a4f0ed424356f6cfdb20a0cb'
});
const vk = new VK({
	token: "67b907138d34e2dfd0dca160c",
	pollingGroupId: 183894359,
	apiMode: "parallel"
});
const user = new VK({ token: 'none' });

let mentionRegexp = new RegExp(`\\[club${vk.options.pollingGroupId}\\|(.*)\\]`);
const { updates, snippets } = vk;
updates.startPolling();

setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.bank > 0).map(async (x) => { 
			let bankk = Number((x.bank/100*3).toFixed(0))
			x.inc("bank", bankk);
	     	if(x.notifications) vk.api.messages.send({user_id: x.id, message: `😱 [id${x.id}|${x.tag}], вам начислено на депозит - ${utils.spaces(bankk)}₽\n\n\nС уважением Lucky Bank!`,
	   
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Уведомления"
},
"color": "negative"
}]
]
})
   });

});
	});
}, 3600000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.ebank > 0).map(async (x) => { 
			let ebankk = Number((x.ebank/100*3).toFixed(0))
			x.inc("ebank", ebankk);
	     	if(x.notifications) vk.api.messages.send({user_id: x.id, message: `😱 [id${x.id}|${x.tag}], вам начислено на ЭДепозит - ${utils.spaces(bankk)}₽\n\n\nС уважением EL DEPOZIT!`,
	   
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Уведомления"
},
"color": "negative"
}]
]
})
   });

});
	});
}, 3600000);

setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.kredit > 0).map(async (x) => { 
			let kreditt = Number((x.kredit/100*11).toFixed(0))
			x.dec("kredit", kreditt);
			x.dec("balance", kreditt)
});
	});
}, 3600000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.phealth < 1).map(async (x) => { 
			x.set("pet", 0);
});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.days > 364).map(async (x) => {
		    x.set("days", 0); 
			x.inc("age", 1);
			x.inc("balance", 1000)
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.energy > 100).map(async (x) => {
		    x.set("energy", 100); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.life > 100).map(async (x) => {
		    x.set("life", 100); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.health > 100).map(async (x) => {
		    x.set("health", 100); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.life < 0).map(async (x) => {
		    x.set("life", 0); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.energy < 0).map(async (x) => {
		    x.set("energy", 0); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.health < 0).map(async (x) => {
		    x.set("health", 0); 
		});
	});
}, 1000);
setInterval(() => { 
	User.find().then((res) => {
		res.filter((x) => x.health < 1).map(async (x) => { 
			x.set("health", 100);
			x.set("balance", 5000);
			x.set("kredit", 0);
			x.set("bank", 0);
			x.set("work", 0);
			x.set("age", 17);
			x.set("days", 0);
			x.set("seria", 0);
			x.set("seriap", 0);
			x.set("numberp", 0);
			x.set("pet", 0);
			x.set("phealth", 0);
			x.set("passport", false);
			x.set("regDate", 0);
			x.set("tbonus", 0);
			x.set("twork", 0);
			x.set("treport", 0);
			x.set("health", 100);
			x.set("energy", 100);
			x.set("hunger", 100);
			x.set("sleep", 100);
			x.set("life", 100);
			x.set("sila", 0);
			x.set("kvar", 0);
			x.set("car", 0);
			x.set("psi", 0);
			x.set("phone", 0);
			x.set("comp", 0);
			x.set("home", 0);
			x.set("pohod", 0);
});
	});
}, 1000);
setInterval(async () => {
let uptime = require('os-uptime');
let _users = await User.countDocuments();
    uservk.api.status.set({
       group_id: 183894359,
        text: `[Lucky Life] - 🌍 Работаю! | 🙍‍♂ Количество игроков: ${_users} | ✉️ Сообщений с момента старта: ${utils.spaces(stats.messages.inbox).replace(/\s/g, ".")} | 🔝 Время работы: ${unixStampLeft(process.uptime() * 1000)}`
   });
}, 60000);
updates.on("message", async (message, next) => {
	stats.messages.inbox += 1;
	if(/(Infinity)/gi.test(message.text)) return;
	if(BANS.indexOf(message.senderId) !== -1) return message.reply('Вы заблокированы навсегда.');

	if(message.senderId < 0) return;
	let _user = await User.findOne({ id: message.senderId });

	if(!_user) {
		let [user_info] = await vk.api.call("users.get", { user_id: message.senderId });

		let count = await User.countDocuments();

		let $user = new User({
			uid: count + 1,
			id: message.senderId,
			balance: 5000,
			kredit: 0,
			bank: 0,
			work: 0,
			biz: 0,
			business: 0,
			tag: user_info.first_name,
			familia: user_info.last_name,
			warn: 0,
	        ban: false,
			age: 17,
			days: 0,
			seria: 0,
	        seriap: 0,
	        numberp: 0,
	        pet: 0,
	        phealth: 100,
	        passport: false,
			regDate: 0,
			tbonus: 0,
			twork: 0,
			biz: 0,
			treport: 0,
			tglass: 0,
			xmas: false,
			donate: 0,
			cooldown: 0,
			ref: 0,
			mention: true,
			rass: true,
			notifications: true,
			buttons: ["Меню"],
			energy: 100,
			health: 100,
			hunger: 100,
			sleep: 100,
			life: 100,
			sila: 0,
			admin: 1,
			kvar: 0,
			car: 0,
			psi: 0,
			phone: 0,
			stage: 1,
			ebank: 0,
			gamepr: 0,
			vipb: false,
			admingive: 0,
			partner: 0,
			comp: 0,
			home: 0,
			pohod: 0,
			questt: 0,
			questtt: false,
			questc: 0,
			questcc: false,
			questg: 0,
			questgg: false,
			questd: 0,
			questdd: false,
			requests: []
		});

		await $user.save();
		await vk.api.messages.send({ 
   chat_id: 3, 
   message: `[${unixStamp(getUnix())} ${message.isChat ? "c"+message.chatId+", @id"+message.senderId : "@id"+message.senderId}]: Новый пользователь - @id${message.senderId} ID: ${count + 1}` 
  });
	}
		if(message.hasAttachments('wall')) {
		let user = await User.findOne({ id: message.senderId });
        let url = message.attachments[0].attachments[0].largePhoto;
        console.log(url)
        if(!url)  return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, пришли мне запись с QR-Кодом`);
        const img = await jimp.read(url);

        const qr = new QRReader();

          // qrcode-reader's API doesn't support promises, so wrap it
        const value = await new Promise((resolve, reject) => {
            qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
            qr.decode(img.bitmap);
        });

         let promo = await Promo.findOne({ title: value.result });
        if(!promo) return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, QR-промокод не найден! `);
        if(promo.users.indexOf(message.senderId) !== -1) return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы уже активировали этот QR-промокод. `);
        
        if(promo.users.length >= promo.count) {
		await promo.remove();
		return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, у этого QR-промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ.`);

	}

	promo.users.push(message.senderId);
	await promo.save();

	await user.inc("balance", promo.sum);
	return message.reply(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы успешно активировали QR-промокод, зачислено: ${utils.spaces(promo.sum)}₽\n📢 Осталось  ${promo.count - promo.users.length} использований.`);
} 

    if(message.hasAttachments('photo')) {
    	let user = await User.findOne({ id: message.senderId });
        let url = message.attachments[0].largePhoto;
        if(!url)  return message.reply(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, пришли мне QR-Код`);
        const img = await jimp.read(url);

        const qr = new QRReader();

          // qrcode-reader's API doesn't support promises, so wrap it
        const value = await new Promise((resolve, reject) => {
            qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
            qr.decode(img.bitmap);

     

});
        let promo = await Promo.findOne({ title: value.result });
        if(!promo) return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, QR-промокод не найден!`);
        if(promo.users.indexOf(message.senderId) !== -1) return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы уже активировали этот QR-промокод. `);
        
        if(promo.users.length >= promo.count) {
		await promo.remove();
		return message.reply(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, у этого QR-промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ.`);

	}

	promo.users.push(message.senderId);
	await promo.save();

	await user.inc("balance", promo.sum);
	return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы успешно активировали QR-промокод, зачислено: ${utils.spaces(promo.sum)}₽\n📢 Осталось  ${promo.count - promo.users.length} использований.`);
} 
	let follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: `${vk.options.pollingGroupId}` });
	message.user = await User.findOne({ id: message.senderId });

	message.reply = (text, params) => message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}\n\n${!follow ? `💞 Буду благодарен если [public${vk.options.pollingGroupId}|подпишешься на меня], чтобы не пропустить конкурсы и акции. Спасибо!` : ``}`, params);
	if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, "").trim();

			let start = Date.now();
			await next();

			let end = Date.now();
			if(message.senderId === 482757961 && message.senderId !== 326410377) console.info(`[${unixStamp(getUnix())} ${message.isChat ? "c"+message.chatId+", @id"+message.senderId : "@id"+message.senderId}]: ${message.text.slice(0, 64)} handled in ${end-start} ms`);

	if(message.text) {
	message.user.inc("days", 1)
	}

});
updates.hear(/^(?:eval)\s([^]+)/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === "string")
		{
			return message.reply(`string: ${result}`);
		} else if(typeof(result) === "number")
		{
			return message.reply(`number: ${result}`);
		} else {
			return message.reply(`${typeof(result)}: ${JSON.stringify(result, null, '&#4448;')}`);
		}
	} catch (e) {
		console.error(e);
		return message.reply(`ошибка:
${e.toString()}`);
		}
});
updates.hear(/^(?:ник)$/i, async (message, bot) => {
	if(message.user.mention === false)
	{
		message.user.set("mention", true);
		return message.reply(`гиперссылка включена!`);
	}

	if(message.user.mention === true)
	{
		message.user.set("mention", false);
		return message.reply(`гиперссылка отключена!`);
	}
});
updates.hear(/^(?:меню|помощь|начать|start)$/i, async (message, bot) => {
	return message.reply(`главное меню:`, 

 {
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Основное"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Банк"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Досуг"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "Магазин"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Животные"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Донат"
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Прочее"
},
"color": "default"
}]
]
})
   });
	});


updates.hear(/^(?:животные)$/i, async (message, bot) => {
	return message.reply(`взаимодействия с питомцами:
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
"label": "Питомец"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Питомцы"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Поход питомца"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Выгулить питомца"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Продать питомца"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Меню"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:основное)$/i, async (message, bot) => {
	return message.reply(`основное:`, {

keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Паспорт"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Самочувствие"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Кошелек"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Работы"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Меню"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:Прочее)$/i, async (message, bot) => {
	return message.reply(`прочее: (В разработке!)
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
"label": "Семья"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Телефон"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "Рыбалка"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Охота"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Меню"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:получить)\s(?:паспорт)$/i, async (message, bot) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(message.user.passport) return message.reply(`вы уже имеете паспорт!`);
	{
var result = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 2; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
            }
var seria = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 2; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            seria = seria + words.substring(position, position + 1);
            }
var pnum = '';
   var words = '0123456789';
   var max_position = words.length - 1;
       for( i = 0; i < 6; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            pnum = pnum + words.substring(position, position + 1);
            }
await message.user.set("seria", result)
await message.user.set("seriap", seria)
await message.user.set("numberp", pnum)
await message.user.set("passport", true)
await message.user.set("regDate", getUnix())
return message.reply(`вы успешно получили свой Паспорт! || Серия и номер: ${result} ${seria} ${pnum}.`);
}
});
updates.hear(/^(?:паспорт)$/i, async (message, bot) => {
	let _user = await User.findOne({ uid: message.user.partner });
	if(!message.user.passport) return message.reply(`похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"`)
	let text = ``;

	text += `🎒 ФИ: ${message.user.tag} ${message.user.familia}\n`;
	text += `🔎 ID: ${message.user.uid}\n`;
	text += `💽 Возраст: ${message.user.age} [${message.user.days}|365] \n`;
	text += `📄 Серия и номер паспорта: ${message.user.seria} ${message.user.seriap} ${message.user.numberp}\n`;
	text += `📮 Подписка: ${FLEX.indexOf(message.senderId) !== -1 ? `VIP` : `отсутствует`}\n`;
	if(message.user.work) text += `${works.find((x) => x.id === message.user.work).icon} Работа: ${works.find((x) => x.id === message.user.work).name}\n\n`;
	text += `💶 В кошельке:  ${utils.spaces(message.user.balance)}₽\n`;
	if(message.user.ebank) text += `💎 ЭДепозит: ${utils.spaces(message.user.ebank)}₽\n`;
	if(message.user.bank) text += `🎟 В банке: ${utils.spaces(message.user.bank)}₽\n\n\n`;

	if(message.user.partner) text += `💞 Вы в браке с *id` + _user.id + ' (' + _user.tag + ')\n'

	if(message.user.psi || message.user.comp || message.user.phone || message.user.kvar || message.user.home || message.user.car)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.psi) text += `🎮 Приставка: ${playstation.find((x) => x.id == message.user.psi).name}\n`;
		if(message.user.comp) text += `💻 Компьютер:  ${comps.find((x) => x.id == message.user.comp).name}\n`;
		if(message.user.phone) text += `📲 Телефон: ${phones.find((x) => x.id == message.user.phone).name}\n`;
		if(message.user.home) text += `🏠 Дом: ${HOMES.find((x) => x.id == message.user.home).name}\n`;
		if(message.user.kvar) text += `🌇 Квартира: ${APARTMENTS.find((x) => x.id == message.user.kvar).name}\n`;
		if(message.user.car) text += `🚗 Машина: ${CARS.find((x) => x.id == message.user.car).name}\n`;
	}

	text += `\n🍀 Дата получения паспорта: ${unixStamp(message.user.regDate)}`;
	return message.reply(`твой паспорт:\n${text}`);
});
updates.hear(/^(?:getid)$/i, async (message) => {
	if(FLEX.indexOf(message.senderId) === -1) return;

	if(!message.forwards[0]) return message.reply(`перешлите сообщение, а не отвечайте!`);
	let user = await User.findOne({ id: message.forwards[0].senderId });

	if(!user) return message.reply(`пользователь не найден.`);
	return message.reply(`ID игрока: ${user.uid}.`);
});

updates.hear(/^(?:get)\s([0-9]+)/i, async (message) => {
	if(FLEX.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) user = await User.findOne({ id: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный игровой ID/VK ID`);

	await message.reply(`Информация:
🎒 ФИ: ${user.tag} ${user.familia}
🔎 ID: ${user.uid}
🆔 Цифровой ID: @id${user.id}
💽 Возраст: ${user.age} [${user.days}|365]
📄 Серия и номер паспорта: ${user.seria} ${user.seriap} ${user.numberp}
📮 Подписка: ${FLEX.indexOf(user.id) !== -1  ? `VIP` : `отсутствует`}
[💴] Менеджер баланса:
&#4448;💶 В кошельке:  ${utils.spaces(user.balance)}₽
&#4448;🎟 В банке: ${utils.spaces(user.bank)}₽
[🔨] Место работы:
&#4448;👔Работа: ${user.work ? works.find((x) => x.id == user.work).name : `❌`}
[🔑] Имущество:
&#4448;🎮 Приставка: ${user.psi ? playstation.find((x) => x.id == user.psi).name : `❌`}
&#4448;💻 Компьютер: ${user.comp ? comps.find((x) => x.id == user.comp).name : `❌`}
&#4448;📲 Телефон: ${user.phone ? phones.find((x) => x.id == user.phone).name : `❌`}
&#4448;🏠 Дом: ${user.home ? HOMES.find((x) => x.id == user.home).name : `❌`}
&#4448;🌇 Квартира: ${user.kvar ? APARTMENTS.find((x) => x.id == user.kvar).name : `❌`}
&#4448;🚗 Машина: ${user.car ? CARS.find((x) => x.id == user.car).name : `❌`}

[❌] Баны:
&#4448;🆘 Репорта: ${user.banreport ? "✅" : "❌"}
&#4448;🤝 Переводов: ${user.banpay ? "✅" : "❌"}`);
});
updates.hear(/^(?:репорт)\s([^]+)$/i, async (message) => {
	if(!message.$match[1]) return message.reply(`использование данной команды: <<репорт [слово/жалоба/предложение]>> ${utils.getSadEmoji()}`);
	if(message.user.banreport) return message.reply(`вы не можете писать в репорт. ${utils.getSadEmoji()}`);
	if(message.user.treport > getUnix()) return message.reply(`вы сможете отправить новое сообщение через несколько минут, агенты проверяют другие репорты.`);

	await vk.api.call("messages.send", { chat_id: 4, message: `📚 | Был задан новый вопрос!
	🆔 | Этот репорт прислал пользователь: vk.com/id${message.senderId}
	📩 | Его ID: ${message.user.uid}
	➡ | @id${message.senderId} (${message.user.tag})${message.isChat ? " в беседе №"+message.chatId : ""}: ${message.$match[1]}`, random_id: Math.random(), attachment: message.attachments, forward_messages: message.id });

	if(message.attachments.find((x) => typeof(x) !== "string")) {
		let att = message.attachments.filter((x) => typeof(x) !== "string");
		att.map(async (x) => {
			const { largePhoto } = x;

			const attachment = await vk.upload.messagePhoto({
				peer_id: 326410377,
				source: largePhoto
			});

			await vk.api.call("messages.send", {
				chat_id: 4,
				message: "[Фотография из репорта] от @id" + message.senderId,
				attachment: attachment,
				random_id: Math.random()
			});
		});
	}

	await message.user.set("treport", getUnix() + 60000);

	await message.reply(`ваш репорт был зарегистрирован в системе под номером #${message.senderId}.\n\n\nПросим вас дождаться ответа от тех.поддержки.`);
});
updates.hear(/^(?:проверить)\s?([^]+)?/i, (message) => {
	const don = require("./don.json");
    if(!message.$match[1]) return message.send(`Вы не указали номер квитанции\nПрочитайте Инструкцию в 'ДОНАТ'`);
    Wallet.getOperationHistory({rows: 50, operation: "IN"}, (err, operations) => {
        for(i in operations['data']){
            stats = true;
            if(operations['data'][i]['txnId'] == message.$match[1]){
                if(don[operations['data'][i]['txnId']]) return message.send(`Платёж №${message.$match[1]} уже был активирован.`)
                don[operations['data'][i]['txnId']] = {
                    user: message.senderId,
                    comment: operations['data'][i]['comment']
                }
 
                    if(operations['data'][i]['comment'] == message.senderId && operations['data'][i]['total']['amount'] == 79){
                        FLEX.push(operations['data'][i]['comment'])
                        return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: ${operations['data'][i]['comment']}
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
💎 Наименование товара: VIP подписка`)
                }
            
                return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: ${operations['data'][i]['comment']}
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
Напишите @id326410377 (ему), для получения доната
                `);
            }
        }
    });
})
const rq = require("prequest");
updates.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	await vk.api.call("messages.send", { user_id: user.id, message: `📨 | Вам поступил ответ на ваш Репорт #${user.id}\n\nОтвет от тех.поддержки: «${message.$match[2]}»`, random_id: Math.random() });
	return message.reply(`Ответ отправлен.`);
});
updates.hear(/^(?:чатответ)\s([0-9]+)\s([^]+)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	if(!message.$match[1]) return message.reply(`использование данной команды: <<чатответ [ID CHAT] [слово]>> ${utils.getSadEmoji()}`);

	await vk.api.call("messages.send", { chat_id: Number(message.$match[1]), message: `📨 | Участники вам ответ:\n\n${message.$match[2]}`, random_id: Math.random() });
	return message.reply(`ответ отправлен.`);
});
updates.hear(/^(?:донат)$/i, async (message) => {
	return message.reply(`⚠ Внимание! Успей купить VIP подписку, осталось 4 штуки! 
	Скидки 75% в честь открытия! - 79 рублей 

	Возможности:  
	— возможность сменить себе Имя и Фамилию.
	— Выдается 75.000₽. 
	— Выдаётся возраст +1 год. 
	— Выдаётся дом разработчиков Lucky Life.
	— Снимается лимит на переводы.
	— Доступ к тестированию новых игр, команд, функций и т.д.
	— В паспорте будет подписка VIP. 
	— Узнать сколько работает бот после старта.
	— Узнать ID игрока.
	— Узать информацию о пользователе.
	— Вы будете добавлены в беседу администраторов 😎 

    P.S. Возможности со временем будут пополняться!

	Для покупки напишите команду "Купить випку"
	📌 После оплаты админка будет выдана в течении 24 часов и вас добавят в беседу администраторов. ☺`);

});

updates.hear(/^(?:випка)$/i, async (message) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(FLEX.indexOf(message.senderId) === -1) return;
	return message.reply(`команды VIP:

   [🤙🏻]  
    &#4448;🤙 Имя [желаемое имя] - Сменить имя
	&#4448;🤙 Фамилия [желаемая фамилия] - Сменить фамилию
	&#4448;🤙 Вип бонус - Получить бонус
	&#4448;🤙 Getid + Пересланное сообщение - Узнать ID игрока
	&#4448;🤙 Get [ID] - Узнать информацию о пользователе
	[🏉] Пранк команды:
	 &#4448;🏉 Фбан [ID] [причина] - Поставить фейк бан: (45.000₽)
	 &#4448;🏉 Фимя [ID] [имя] - Поставить фейк имя: (1.500₽)
	 &#4448;🏉 Фбабло [ID] [сумма] - Выдать фейк бабло: (3.000₽)
	 &#4448;🏉 Фадмин [ID] - Выдать фейк разработчика: (5.000₽)
 
	`);
});
updates.hear(/^(?:giveme)\s(.*)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	if(message.user.admingive > getUnix()) return message.reply(`вы сможете выдавать через ${unixStampLeft(message.user.admingive - getUnix())}`);
	
	let user = await User.findOne({ uid: message.user.uid });
	if(!user) return message.reply(`неверный ID.`);
	
	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);
	if(!message.$match[1]) return;
    if(message.$match[1] > 20000) return message.reply(`ваш персональный лимит - ${utils.spaces(20000)}₽`);

	vk.api.call("messages.send", {
		chat_id: 22,
		message: `[⏰] Уведомление:\n\n\nАдминистратор @id${message.senderId} (ID: ${message.user.uid}) выдал деньги себе: (${utils.spaces(message.$match[1])}₽) `,
		random_id: Math.random()
	});

	await user.inc("balance", message.$match[1]);
	await message.user.set("admingive", getUnix() + 259200000);

	return message.reply(`вы выдали себе ${utils.spaces(message.$match[1])}₽`);
});
updates.hear(/^(?:банреп)\s([0-9]+)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	if(message.$match[1] == 1) return message.reply('отказано')
	if(user.banreport) {
		await user.set("banreport", false);
		await message.reply(`вы сняли бан репорта.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `[⏰] Блокировка репорта снята`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 22,
			message: `[⏰]  Уведомление:\n\n\nАдминистратор @id${message.senderId} (ID: ${message.user.uid}) снял бан репорта игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	} else {
		await user.set("banreport", true);
		await message.reply(`вы выдали бан репорта.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `[⏰] Вам выдали блокировку репорта`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 22,
			message: `[⏰]  Уведомление:\n\n\nАдминистратор @id${message.senderId} (ID: ${message.user.uid}) выдал бан репорта игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	}
});
updates.hear(/^(?:givevip)\s([0-9]+)$/i, async (message) => {
	if(message.senderId !== 326410377 && message.senderId !== 482757961 && message.senderId !== 499430856) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID`);
	if(user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);


	FLEX.push(user.id)

	    vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], вам был выдана VIP Подписка`});
	    vk.api.call("messages.send", {
		chat_id: 22,
		message: `[⏰] Уведомление:\n\n\nАдминистратор @id${message.senderId} (ID: ${message.user.uid}) выдал VIP подписку игроку @id${user.id} (ID: ${user.uid})`,
		random_id: Math.random()
	});
	    return message.reply(`вы успешно выдали игроку @id${user.id} VIP Подписку`)
});
updates.hear(/^(?:ban)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`Неверный ID`);
	if(user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);

	BANS.push(user.id)

	    vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}], к сожалению, Вы забанены НАВЕГДА.\n\n\nПричина: ` +  message.$match[2]});
	    vk.api.call("messages.send", {
		chat_id: 22,
		message: `[⏰] Уведомление:\n\n\nАдминистратор @id${message.senderId} (ID: ${message.user.uid}) заблокировал игрока: @id${user.id} (ID: ${user.uid})`,
		random_id: Math.random()
	});
	    return message.reply(`Вы успешно заблокировали игрока: @id${user.id} (ID: ${user.uid})`)
});

updates.hear(/^(?:фбан)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(FLEX.indexOf(message.senderId) === -1) return;
    if(message.user.balance < 45000) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	if(!message.$match[1]) return message.reply(`использование: "Фбан [ID] [причина]" ${utils.getSadEmoji()}`);
	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`Неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`Не нужно вводить свой ID ${utils.getWowEmoji()}`);

		await message.user.dec("balance", 45000);

		await message.reply(`Вы успешно дали фейковый бан игроку "${$user.tag}", но данный игрок не знает то что это фейковый бан!`);
	    vk.api.messages.send({ user_id: $user.id, message: `[id${user.id}|${$user.tag}], к сожалению, Вы забанены НАВЕГДА.\n\n\nПричина: ` +  message.$match[2]});
});
updates.hear(/^(?:фимя)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(FLEX.indexOf(message.senderId) === -1) return;
    if(message.user.balance < 1500) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	if(!message.$match[1]) return message.reply(`использование: <<Фимя [ID] [имя]>> ${utils.getSadEmoji()}`);
	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);

		await message.user.dec("balance", 1500);

		await message.reply(`вы успешно изменили имя игроку "${$user.tag}" данный игрок не знает то что это фейковая замена!`);
	    vk.api.messages.send({ user_id: $user.id, message: `[id${$user.id}|`+ message.$match[2] + `], вам изменили имя на - "` +  message.$match[2] + `", теперь вы не имеете право менять свое имя!`});
});
updates.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message) => {
	if(!message.$match[1]) return message.reply(`использование: <<стаканчик [1-3] [сумма]>> ${utils.getSadEmoji()}`);
	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);
	
	if(!message.$match[2]) return;
	if(message.$match[2] <= 0) return;
	if(message.$match[2] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[2] <= message.user.balance) {
		await message.user.set("tglass", getUnix() + 10000);
		await message.user.dec("balance", message.$match[2]);
		let rand = utils.random(1, 3);

		if(rand == message.$match[1]) {
			await message.user.inc("balance", message.$match[2] * 2);
			return message.reply(`вы выиграли ${utils.spaces(message.$match[2] * 1.5)}₽
			💰 Ваш баланс: ${utils.spaces(message.user.balance)}₽`);
		} else {
			return message.reply(`вы проиграли ${utils.spaces(message.$match[2])}₽
			💰 Ваш баланс: ${utils.spaces(message.user.balance)}₽`);
		}
	}
});
updates.hear(/^(?:фбабло)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(FLEX.indexOf(message.senderId) === -1) return;
    if(message.user.balance < 3000) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	if(!message.$match[1]) return message.reply(`использование: <<фбабло [ID] [сумма]>> ${utils.getSadEmoji()}`);
	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);

		await message.user.dec("balance", 3000);

		await message.reply(`вы успешно выдали фейк бабло игроку "${$user.tag}" данный игрок не знает то что это фейковая выдача!`);
	    vk.api.messages.send({ user_id: $user.id, message: `[id${$user.id}|${$user.tag}], вам выдали - ${utils.spaces(message.$match[2])}₽`});
});
updates.hear(/^(?:фадмин)\s([0-9]+)$/i, async (message) => {
	if(message.isChat) return message.reply('данная команда доступна только в личных сообщениях группы!')
	if(FLEX.indexOf(message.senderId) === -1) return;
    if(message.user.balance < 5000) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	if(!message.$match[1]) return message.reply(`использование: <<фадмин [ID]>> ${utils.getSadEmoji()}`);
	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);

		await message.user.dec("balance", 5000);

		await message.reply(`вы успешно выдали фейк права разработчика игроку "${$user.tag}" данный игрок не знает то что это фейковая выдача!`);
	    vk.api.messages.send({ user_id: $user.id, message: `[id${$user.id}|${$user.tag}], вы успешно стали новым разработчиков Lucky Life!`});
});
	updates.hear(/^(?:купить)\s(?:випку)$/i, async message => {
		if(message.isChat) return message.reply('Данная команда доступна только в личных сообщениях группы!')
	let text = await vk.api.call('utils.getShortLink', { url:`https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=77776641367&amountInteger=79&amountFraction=0&extra%5B%27comment%27%5D=ID: ${message.senderId}, Game ID: ${message.user.uid}&currency=643&blocked[0]=account&blocked[1]=sum&blocked[2]=comment` });
	message.reply('ссылка на оплату: ' + text.short_url  + '\n\nК оплате: 79 рублей\nСпособ оплаты: QIWI/Банковская карта/Наличными в терминале');
});
updates.hear(/^(?:имя)\s(.*)$/i, async (message, bot) => {
	if(FLEX.indexOf(message.senderId) === -1) return;
	if(!message.$match[1]) return message.reply(`использование: "Имя [желаемое имя]" ${utils.getSadEmoji()}`);
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|админ|администрация|admin|administartor|сова некогда не спит|сова не спит|синий|кит|синий кит)/
	let zaprets1 = message.$match[1].toLowerCase();
	if (zapret.test(zaprets1) == true) { 
			return message.reply(`пожалуйста придумайте адекватное имя!`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.reply(`пожалуйста придумайте адекватное имя!`);
	}

	message.user.set("tag", message.$match[1]);
	return message.reply(`отличное имя!`);
});
updates.hear(/^(?:вип)\s(?:бонус)$/i, async (message, bot) => {
	if(FLEX.indexOf(message.senderId) === -1) return;

	if(message.user.vipb) return message.reply(`вы уже получили свой бонус`);
	await message.user.inc("balance", 75000);
	await message.user.set("home", 5);
	await message.user.inc("age", 1);
    await message.user.set("vipb", true);
    return message.reply(`вы успешно получили в бонусе: \n\n+ ${utils.spaces(75000)}₽\n+ 1 год\n+ Дом разработчиков Lucky Life\n\n\nДанный бонус вы получили благодаря свой VIP подписки`);
});
updates.hear(/^(?:фамилия)\s(.*)$/i, async (message, bot) => {
	if(FLEX.indexOf(message.senderId) === -1) return;
	if(!message.$match[1]) return message.reply(`Использование: "Фамилия [желаемое фамилия]" ${utils.getSadEmoji()}`);
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|админ|администрация|admin|administartor)/
	let zaprets1 = message.$match[1].toLowerCase();
	if (zapret.test(zaprets1) == true) { 
			return message.reply(`пожалуйста придумайте адекватную фамилию!`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.reply(`пожалуйста придумайте адекватную фамилию!`);
	}

	message.user.set("familia", message.$match[1]);
	return message.reply(`отличная фамилия!`);
});
updates.hear(/^(?:промосоздать)\s([0-9]+)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	let $promo = await Promo.findOne({ title: message.$match[3].toLowerCase() });

	if($promo) return message.reply(`уже есть такой промокод, сосун мелкий.`);
	let newPromo = new Promo({
		title: message.$match[3].toLowerCase(),
		count: Number(message.$match[1]),
		users: [],
		sum: Number(message.$match[2])
	});

	await newPromo.save();

        const text = message.$match[3].toLowerCase();
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
updates.hear(/^(?:промостатус)\s(.*)$/i, async (message) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
	let $promo = await Promo.findOne({ title: message.$match[1].toLowerCase() });
	if(!$promo) return message.reply(`промокод не найден!`);

	return message.reply(`информация:
	
	Осталось активаций: ${$promo.count - $promo.users.length}\nСумма: ${utils.spaces($promo.sum)}₽`);




});
updates.hear(/^(?:казино|азино)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);
	if(!message.$match[1]) return message.reply(`использование данной команды: <<казино/азино [сумма]>> ${utils.getSadEmoji()}`);
	
	if(!message.$match[1]) return;
	if(message.$match[1] <= 0) return;
	if(message.$match[1] > message.user.balance) return message.reply(`у Вас недостаточно средств. ${utils.getSadEmoji()}`);

	else if(message.$match[1] <= message.user.balance) {
		await message.user.dec("balance", message.$match[1]);
		let cof = utils.pick([0.75, 0.50, 2, 3, 0.50, 0.75, 2, 2, 2, 1.25, 1.5, 1, 0.5, 0.5, 1.5, 1.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25]);

		await message.user.inc("balance", message.$match[1] * cof);
		return message.reply(`${cof < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - (message.$match[1] * cof))}₽` : `вы выиграли ${utils.spaces(message.$match[1] * cof)}₽`} (x${cof}) ${cof <= 0 ? utils.getSadEmoji() : ``}
		💰 Ваш баланс: ${utils.spaces(message.user.balance)}₽`);
	}
});
updates.hear(/^(?:монетка)\s(орел|решка)\s(.*)$/i, async (message) => {
	message.$match[1] = message.$match[1].toLowerCase();
	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);
	
	if(!message.$match[2]) return;
	if(message.$match[2] <= 0) return;

	if(message.$match[2] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[2] <= message.user.balance) {
		await message.user.dec("balance", message.$match[2]);

		let side = message.$match[1] === "орел" ? 0 : 1;
		let rand = utils.random(0, 1);

		if(rand === side) {
			await message.user.inc("balance", message.$match[2] * 2);
			return message.send(`вы угадали сторону монетки! Выигрыш: ${utils.spaces(message.$match[2] * 2)}₽`);
		} else return message.send(`вы проиграли :(\nВы проиграли ${utils.spaces(message.$match[2])}₽`);
	}
});
updates.hear(/^(?:сейф)\s([0-9]+)$/i, async (message) => {
	if(message.$match[1] < 10 || message.$match[1] > 99) return;
	let rand = utils.random(10, 99);

	if(rand == message.$match[1]) {
		await message.user.inc("balance", 7500);
		return message.reply(`вы успешно открыли сейф! ✅
		💰 Вам начислено 7.500₽`);
	} else return message.reply(`вы не отгадали код! Код был <<${rand}>>.
	🔥 Не отчаивайтесь, попытки неограничены!
	💰 Если отгадаете код, то вы получите 7.500₽`);
});
updates.hear(/^кубик\s([1-6])$/i, (message) => {
	if(!message.$match[1]) return message.reply(`использование: <<кубик [1-6]>> ${utils.getSadEmoji()}`);
    let number = utils.random(1, 6);
    if (number === Number(message.$match[1])) {
        let prize = utils.pick([500, 1000, 5000]);
        message.user.inc("balance", prize);
        message.reply("вы угадали! Приз " + prize + "₽");
    } else {
        let smile = utils.pick("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
        message.reply("не угадали " + smile + "\n🎲 Выпало число " + number);
    }
});
updates.hear(/^(?:лаки|лаки,)\s(.*)/i, async (message) => {
const googleTTS = require('google-tts-api');
rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(message.$match[1]))
.then(async res => {
googleTTS(res.text.toLowerCase(), 'ru', 2.5) 
.then(function (url) {
  message.sendAudioMessage(url) ;
})
.catch(function (err) {
  console.error(err.stack);
});
})
});
updates.hear(/^(?:брак)\s([0-9]+)$/i, async (message) => {
			let user = await User.findOne({ uid: Number(message.user.partner) });
			if(message.user.partner) return message.reply(`вы уже в браке с игроком ${user.tag}`);
			if(Number(message.$match[1]) === message.user.uid) return message.reply(`вы не можете жениться/выйти замуж за себя`);
		
			let _user = await User.findOne({ uid: message.$match[1] })
			if(!_user) return message.reply(`неверный ID`);
		
			if(_user.partner > 1) return message.reply(`этот человек уже состоит в браке`);
		
			if(_user.requests.find(x=> x == message.match[1])) return message.reply(`вы уже делали предложение этому игроку`);
		
			if(message.user.requests.find(x=> x == message.$match[1]))
			{
				message.user.set('requests', []);
				message.user.set('partner', _user.uid);
		
				_user.set('requests', []);
				_user.set('partner', message.user.uid);
		
				return message.reply(`вы вступили в брак с игроком "[id${_user.id}|${_user.tag}]"`);
			}
		
			_user.requests.push(message.user.uid);
			_user.save();
		vk.api.messages.send({user_id: _user.id, message: `❤  Игрок [id${message.user.id}|${message.user.tag}] предлагает вам руку и сердце.
        
        🔹 Для принятия напишите: "Брак ${message.user.uid}`});

			return message.reply(`вы сделали предложение игроку "[id${_user.id}|${_user.tag}]"`);
		});
		
		
		updates.hear(/^(?:развод)$/i, async (message) => {
			if(message.user.partner < 1) return message.reply(`вы не состоите в браке`);
		
			let _user = await User.findOne({ uid: message.user.partner});
		
			message.user.set('partner', 0);
			_user.set('partner', 0);
		    
		 vk.api.messages.send({user_id: _user.id, message: `😱 [id${message.user.id}|${message.user.tag}], расторгнул брак!`});
			return message.reply(`вы теперь свободный человек`);
		});

updates.hear(/^(?:подписаться)$/i, async (message, bot) => {
	if(message.user.rass === false)
	{
		message.user.set("rass", true);
		return message.reply(`вы успешно подписались на рассылку!`);
	}

	if(message.user.rass === true)
	{
		message.user.set("rass", false);
		return message.reply(`вы успешно отписались от рассылки!`);
	}
});

updates.hear(/^(?:перевод)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.kredit) return message.reply(`вы не можете переводить денежные средства, так как у вас имеется не погашенный кредит!`)
	if(!message.$match[1]) return message.reply(`использование: "Перевод [айди] [сумма]" ${utils.getSadEmoji()}`);
	if(message.user.banpay) return message.reply(`вы не можете передавать деньги! ${utils.getSadEmoji()}`);
	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`не нужно вводить свой ID ${utils.getWowEmoji()}`);

	if($user.banpay) return message.reply(`вы не можете передавать деньги этому игроку.`);
	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);

	if(!message.$match[2]) return;
	if(message.$match[2] <= 0) return;
	if(FLEX.indexOf(message.senderId) === -1 && message.$match[2] > 25000) return message.reply(`ваш персональный лимит - ${utils.spaces(25000)}₽ за одну транзакцию!`);

	if(message.$match[2] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[2] <= message.user.balance) {
		await message.user.dec("balance", message.$match[2]);
		await $user.inc("balance", message.$match[2]);

		let log = new Log({
			from: message.senderId,
			to: $user.id,
			date: getUnix(),
			amount: message.$match[2]
		});

		await log.save();
		await message.reply(`вы передали игроку "${$user.tag}" ${utils.spaces(message.$match[2])}₽`);
		if($user.notifications) vk.api.messages.send({ user_id: $user.id, message: `▶ Игрок ${message.user.tag} перевел вам ${utils.spaces(message.$match[2])}₽!
		🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения.` });
	}
});

updates.hear(/^(?:работа|работы)\s?([0-9]+)?$/i, async (message) => {
	if(message.user.age < 18) return message.reply('работа доступна с 18 лет! ')
	if(!message.user.passport) return message.reply('Похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"')
	if(!message.$match[1]) {
		return message.reply(`вы можете устроиться на одну из профессий:
		
		${
			works
			.filter((x) => x.stage <= message.user.stage)
			.map((x, i) => `${x.icon} ${x.id}. ${x.name} — от ${utils.spaces(x.min)}₽ до ${utils.spaces(x.max)}₽`)
			.join("\n")
		}
		
		Устроиться: работа [номер работы]`);
	}

	const work = works.find((x) => x.id == message.$match[1]);
	if(!work) return console.info(work);

	if(message.user.work) return message.reply(`у вас уже есть работа!`);

	if(work.stage > message.user.stage) return message.reply(`вы не можете устроиться на эту работу!`);
	else if(work.stage <= message.user.stage) {
		message.user.set("work", work.id);
		return message.reply(`вы устроились работать <<${work.name}>>`);
	}
});

updates.hear(/^(?:бонус|💎\sбонус|🔑 Бонус)$/i, async (message) => {
	if(message.user.tbonus > getUnix()) return message.reply(`вы сможете получить бонус через ${unixStampLeft(message.user.tbonus - Date.now())}`);
	let prize = utils.pick([2500, 3500, 5500, 7500, 8000, 8400, 8700, 9000, 9600, 9900, 10000]);

	await message.user.inc("balance", prize);
	await message.user.set("tbonus", getUnix() + 86400000);

	await message.reply(`вы выиграли ${utils.spaces(prize)}₽
	💰 На руках: ${utils.spaces(message.user.balance)}₽`);

});
updates.hear(/^(?:работать|🔨\sработать)$/i, async (message) => {
	if(!message.user.work) return message.reply(`у вас нет работы.`);
	if(message.user.energy < 35) return message.reply('увы, работать вы не сможете, так как ваша энергия меньше 35%')
	if(message.user.health < 35) return message.reply('увы, работать вы не сможете, так как ваше здровье меньше 35%')
	if(message.user.twork > getUnix()) return message.reply(`вам надо передохнуть.`);

	await message.user.set("twork", getUnix() + 600000);
	let work = works.find((x) => x.id === message.user.work);

    let energy = utils.random(25, 35);

	let earn = utils.random(work.min, work.max);

	let health = utils.random(25, 35)

   
	await message.user.inc("balance", earn);
	await message.user.dec("energy", energy)
	await message.user.dec("health", health)


	return message.reply(`вы заработали ${utils.spaces(earn)}₽.\n\nПотратили энергии: - ${energy}%\n\nПотратили здоровья: - ${health}%`);
});
updates.hear(/^(?:warn)$/i, async (message, bot) => {
if(VODKA.indexOf(message.senderId) === -1) return;
if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
let user = await User.findOne({ id: message.forwards[0].senderId });
await user.inc("warn", 1);
if(user.warn >= 3){
await user.set("warn", 0);
vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: user.id
}).catch((error) => {return message.send(`⛔ [id${user.id}|Данного пользователя] нет в беседе.`);
	});
	await message.send(`⚠ [id${user.id}|Данный пользователь] был заварнен. За наличие 3 варнов он был кикнут.`);
		}else{
			await message.send(`⚠ [id${user.id}|Данный пользователь] был заварнен.(${user.warn}/3)`);
		}

});
updates.hear(/^(?:unwarn)$/i, async (message, bot) => {
if(VODKA.indexOf(message.senderId) === -1) return;
if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
let user = await User.findOne({ id: message.forwards[0].senderId });
if(!user.warn) return message.send(`❎ У этого [id${user.id}|пользователя] нет варнов.`)

await user.set("warn", 0);
return message.send(`✅ [id${user.id}|Данный пользователь] был разварнен.`);

});
updates.hear(/^(?:чс)\s([^]+)$/i, async (message) => {
if(VODKA.indexOf(message.senderId) === -1) return;
if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
uservk.api.groups.ban({ group_id: 183894359, owner_id: message.forwards[0].senderId, reason: 0, comment: message.$match[1], comment_visible: 1, access_token: 'a4fcc7827eb5c4dbf85648107d1378d2554cb861de47a352bc69fbeb97ce0ed4243d92356f6cfdb20a0cb'});
message.send(`Вы успешно кинули в чс сообщества пользователя по причине «${message.$match[1]}».\nСсылка: [vk.com/id${message.forwards[0].senderId}]`);
});
updates.hear(/^(?:изчс)$/i, async (message) => {
if(VODKA.indexOf(message.senderId) === -1) return;
if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
uservk.api.groups.unban({ group_id: 183894359, owner_id: message.forwards[0].senderId, access_token: 'a4fcc7827eb5c4dbf85648107d1378d2554cb861de47a352bc69fbeb97ce0ed4243d92356f6cfdb20a0cb'});
message.send(`Вы успешно выкинули из чс сообщества пользователя.\nСсылка: [vk.com/id${message.forwards[0].senderId}]`);
});

updates.hear(/^(?:уволиться)$/i, async (message) => {
	await message.user.set("work", 0);
	return message.reply(`вы уволились.`);
});
updates.hear(/^(?:самочувствие)$/i, async (message, bot) => {
	let text = ``;
    
    text += `\n💭 » Основные:\n`
	text += `🎚 - Здоровье: ${message.user.health}%\n`;
	text += `🎟 - Энергия: ${message.user.energy}%\n`;
	text += `😃 - Радость ${message.user.life}%\n`;


return message.reply(`твое самочувствие:\n${text}`);
});
updates.hear(/^(?:кошелек)$/i, async (message) => {
	return message.reply(`ваш кошелек:\n\n💰В кошельке: ${utils.spaces(message.user.balance)}₽${message.user.bank ? `\n🎒Счёт в банке: ${utils.spaces(message.user.bank)}₽` : ``}${message.user.ebank ? `\n💎 ЭДепозит: ${utils.spaces(message.user.ebank)}₽` : ``}`);
});
updates.hear(/^(?:досуг)$/i, async (message, bot) => {
	return message.reply(`досуг:

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
"label": "Поспать"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Клуб"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Доктор"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Меню"
},
"color": "primary"
}]
]
})
   });
});
updates.hear(/^(?:поспать)$/i, async (message, bot) => {
	await message.reply(`выберете места для сна:\n\n👑 Поспать в отеле\n\n— Восстановить 75% энергии\n— Стоимость - 500₽\n\n🏭 Поспать в хостеле\n\n— Восстановить 55% энергии\n— Стоимость - 250₽\n\n🔑 Поспать дома\n\n— Восстановит 35% энергии\n— Стоимость - 0₽
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
"label": "Поспать в отеле"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Поспать в хостеле"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Поспать дома"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Досуг"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:666)$/i, async (message, bot) => {
		if(message.senderId !== 482757961 && message.senderId !== 326410377 && message.senderId !== 499430856 && message.senderId !== 555337417) return message.reply('Данная команда доступна только элите, окда?')
		if(message.senderId !== 482757961 && message.senderId !== 326410377 && message.senderId !== 499430856 && message.senderId !== 555337417) return;
		
	message.send("vk.com/luckylifebot\n\n\n".repeat(350));
	});

updates.hear(/^(?:qr)\s(.*)/i, async (message) => {
const text = message.$match[1];
const options = {
  isShowLogo: true, // show logo in center
  logoData: false, // logo data in base64
  isShowBackground: true, // show qr-background 
  backgroundColor: '#ffffff', // qr-code background color
  foregroundColor: '#000000', // qr-code color
};
 
const qrSvg = qr.createQR(text, 2050, 'qr-code-class', options);

//1. convert from svg string 
//2. convert from svg's base64 string 
svg2img(qrSvg, {format:'jpg','quality':75}, function(error, buffer) {
    //default jpeg quality is 75
    fs.writeFileSync('foo5.jpg', buffer);
});

return message.sendPhoto('foo5.jpg')
});

   

updates.hear(/^(?:kick)$/i, async (message) => {
if(!message.isChat) return;
if(VODKA.indexOf(message.senderId) === -1) return;
if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: message.forwards[0].senderId
}).catch((err) => {
uservk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: message.forwards[0].senderId, access_token: 'a4fcc7ce0ed4243d92356f6cfdb20a0cb'});
});
});
updates.hear(/^(?:add)$/i, async (message, bot) => {
	if(VODKA.indexOf(message.senderId) === -1) return;
    uservk.api.messages.addChatUser({chat_id: 200000000023, user_id: message.forwards[0].senderId}); 
});
updates.hear(/^(?:title)\s(.*)$/i, async (message, bot) => {
	 if(!message.isChat) return;
    if(VODKA.indexOf(message.senderId) === -1) return;
    vk.api.call("messages.editChat", { chat_id: message.chatId, title: message.$match[1]})
    return message.send("Я успешно изменил название беседы на: " + message.$match[1]);
    });
updates.hear(/^(?:поспать)\s(?:в)\s(?:отеле)$/i, async (message, bot) => {
	if(message.user.balance < 501) return message.reply(`вы хотели сходить поспать в Отеле!\n\n💭 Но у вас недостаточно средств!`)
	await message.user.inc("energy", 75)
    await message.user.inc("health", 15)
    await message.user.dec("balance", 500)
    return message.reply('вы успешно поспали в отеле!\n\n🍀 Начислено: — 75% Энергии\n — % Здоровья\n\n💽 Снято: -500₽')
	});
updates.hear(/^(?:поспать)\s(?:в)\s(?:хостеле)$/i, async (message, bot) => {
    if(message.user.health < 6) return message.reply('увы, но вы не можете спать в отеле, так как у вас здоровье меньше 5%')
	if(message.user.balance < 251) return message.reply(`вы хотели сходить поспать в Хостеле!\n\n💭 Но у вас недостаточно средств!`)
    await message.user.inc("energy", 55)
    await message.user.dec("balance", 250)
    await message.user.dec("health", 5)
    return message.reply('вы успешно поспали в хостеле!\n\n🍀 Начислено: — 55% Энергии\n\n💽 Снято: -250₽\n5% здоровья')
	});
updates.hear(/^(?:поспать)\s(?:дома)$/i, async (message, bot) => {
	if(!message.user.home && !message.user.kvar) return message.reply('увы, но у вас нет дома или квартиры')
	await message.user.inc("energy", 35)
    return message.reply('вы успешно поспали дома!\n\n🍀 Начислено: — 35% Энергии\n\n💽 Снято: 0₽')
	});
updates.hear(/^(?:доктор)$/i, async (message, bot) => {
	return message.reply(`вы успешно зашли в больницу!\n\n💭 №1 - DoctorWo - 500₽\n❤ - Здоровье 15-45%\n\n💭 №2 - JuniorFo - 1.800₽\n❤ - Здоровье 35-80%
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
"label": "Сходить в DoctorWo"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Сходить в JuniorFo"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Досуг"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:сходить)\s(?:в)\s(?:DoctorWo)$/i, async (message, bot) => {
	if(message.user.health > 99) return message.reply('вам не нужно идти к доктору, так как у вас здоровье - 100%')
    if(message.user.balance < 501) return message.reply('вы хотели сходить в DoctorWo!\n\n💭 Но у вас недостаточно средств!')
	let heal = utils.random(15, 45);
    await message.user.inc("health", heal)
    await message.user.dec("balance", 500)
    return message.reply(`вы успешно сходили в DoctorWo!\n\n🍀 Начислено: — ${heal}% Здоровья\n\n💽 Снято: -500₽`)
	});
updates.hear(/^(?:сходить)\s(?:в)\s(?:JuniorFo)$/i, async (message, bot) => {
	if(message.user.health > 99) return message.reply('вам не нужно идти к доктору, так как у вас здоровье - 100%')
	if(message.user.balance < 1801) return message.reply('вы хотели сходить в JuniorFo!\n\n💭 Но у вас недостаточно средств!')
	let heal = utils.random(35, 80);
    await message.user.inc("health", heal)
    await message.user.dec("balance", 1700)
    return message.reply(`вы успешно сходили в JuniorFo!\n\n🍀 Начислено: — ${heal}% Здоровья\n\n💽 Снято: -1.800₽`)
	});
updates.hear(/^(?:клуб)$/i, async (message, bot) => {
	return message.reply(`вы успешно зашли в центр клубов!\n\n💭 №1 - Club Goper — 500₽\n🔥Радость — 10-35%\n\n💭 №2 - Club Malibu — 1.700₽\n🔥 Радость — 25-75%
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
"label": "Сходить в Goper"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Сходить в Malibu"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Досуг"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:сходить)\s(?:в)\s(?:Goper)$/i, async (message, bot) => {
    if(message.user.balance < 501) return message.reply('вы хотели сходить в Club Goper!\n\n💭 Но у вас недостаточно средств!')
	let radost = utils.random(10, 35);
    await message.user.inc("life", radost)
    await message.user.dec("balance", 500)
    return message.reply(`вы успешно сходили в Club Goper!\n\n🍀 Начислено: — ${radost}% Радости\n\n💽 Снято: -500₽`)
	});
updates.hear(/^(?:сходить)\s(?:в)\s(?:Malibu)$/i, async (message, bot) => {
	if(message.user.balance < 1701) return message.reply('вы хотели сходить в Club Malibu!\n\n💭 Но у вас недостаточно средств!')
	let life = utils.random(25, 75);
    await message.user.inc("life", life)
    await message.user.dec("balance", 1700)
    return message.reply(`вы успешно сходили в Club Malibu!\n\n🍀 Начислено: — ${life}% Радости\n\n💽 Снято: -1.700₽`)
	});
updates.hear(/^(?:Магазин)$/i, async (message, bot) => { 
return message.reply(`раздел техники:\n\n🎮Приставки\n🖥Компьютеры\n🔑Телефоны\n\n👥Раздел апартаментов:\n\n🏡 Дома\n🌇 Квартиры\n\n🚚 Раздел транспортных средств:\n\n🚗 Машины\n\n📜Выберете один из разделов, а после один из номеров.

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
"label": "Приставки" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры" 
}, 
"color": "default" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины" 
}, 
"color": "default"
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Меню" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
});
updates.hear(/^(?:приставки|приставка)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список приставок:
		
		${playstation.map((x) => `🎮 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить приставку: приставки [номер приставки]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Приставки 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Приставки 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Приставки 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Приставки 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Приставки 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.psi) return message.reply(`У вас уже есть приставка! Продать приставку — <<Продать приставку>>.`,);
	let ps = playstation.find((x) => x.id == message.$match[1]);

	if(!ps) return;

	if(ps.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(ps.cost <= message.user.balance) {
		await message.user.dec("balance", ps.cost);
		await message.user.set("psi", ps.id);

		return message.reply(`Вы успешно купили ${ps.name} за ${utils.spaces(ps.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:компьютеры|компьютер)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список компьютеров:
	
		${comps.map((x) => `💻 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить компьютер: компьютеры [номер компьютера]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Компьютеры 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.comp) return message.reply(`у вас уже есть компьютер! Продать компьютер — <<Продать компьютер>>.`,);
	let compa = comps.find((x) => x.id == message.$match[1]);

	if(!compa) return;

	if(compa.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(compa.cost <= message.user.balance) {
		await message.user.dec("balance", compa.cost);
		await message.user.set("comp", compa.id);

		return message.reply(`вы успешно купили ${compa.name} за ${utils.spaces(compa.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:продать)\s(?:компьютер)$/i, async (message) => {
	if(!message.user.comp) return message.reply(`у вас нет компьютера. ${utils.getSadEmoji()}`);
	let compa = comps.find((x) => x.id == message.user.comp);

	await message.user.set("comp", 0);
	await message.user.inc("balance", compa.cost * 0.90);

	return message.reply(`вы продали компьютер за ${utils.spaces(compa.cost * 0.90)}₽`);
});
updates.hear(/^(?:телефоны|телефон)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список телефонов:
	
		${phones.map((x) => `📱 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить телефон: телефоны [номер телефона]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Телефоны 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.phone) return message.reply(`у вас уже есть компьютер! Продать компьютер — <<Продать компьютер>>.`,);
	let iphone = phones.find((x) => x.id == message.$match[1]);

	if(!iphone) return;

	if(iphone.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(iphone.cost <= message.user.balance) {
		await message.user.dec("balance", iphone.cost);
		await message.user.set("phone", iphone.id);

		return message.reply(`вы успешно купили ${iphone.name} за ${utils.spaces(iphone.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:продать)\s(?:телефон)$/i, async (message) => {
	if(!message.user.phone) return message.reply(`у вас нет телефона. ${utils.getSadEmoji()}\nНапиши: телефоны`);
	let iphone = phones.find((x) => x.id == message.user.phone);

	await message.user.set("phone", 0);
	await message.user.inc("balance", iphone.cost * 0.90);

	return message.reply(`вы продали телефон за ${utils.spaces(iphone.cost * 0.90)}₽`);
});
updates.hear(/^(?:квартиры|квартира)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список квартир:
	
		${APARTMENTS.map((x) => `🍀 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить квартиру: квартира [номер квартиры]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Квартиры 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.kvar) return message.reply(`у вас уже есть квартира! Продать квартиру — <<Продать квартиру>>.`,);
	let kvar = APARTMENTS.find((x) => x.id == message.$match[1]);

	if(!kvar) return;

	if(kvar.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(kvar.cost <= message.user.balance) {
		await message.user.dec("balance", kvar.cost);
		await message.user.set("kvar", kvar.id);

		return message.reply(`вы успешно купили ${kvar.name} за ${utils.spaces(kvar.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:продать)\s(?:квартиру)$/i, async (message) => {
	if(!message.user.kvar) return message.reply(`у вас нет квартиры. ${utils.getSadEmoji()}\nНапиши: квартиры`);
	let kvari = APARTMENTS.find((x) => x.id == message.user.kvar);

	await message.user.set("kvar", 0);
	await message.user.inc("balance", kvari.cost * 0.90);

	return message.reply(`вы продали дом за ${utils.spaces(kvari.cost * 0.90)}₽`);
});
updates.hear(/^(?:дома|дом)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список домов:
	
		${HOMES.map((x) => `🏡 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить дом: дома [номер дома]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Дома 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.home) return message.reply(`у вас уже есть дом! Продать дом — <<Продать дом>>.`,);
	let homes = HOMES.find((x) => x.id == message.$match[1]);

	if(!homes) return;

	if(homes.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(homes.cost <= message.user.balance) {
		await message.user.dec("balance", homes.cost);
		await message.user.set("home", homes.id);
		return message.reply(`вы успешно купили ${homes.name} за ${utils.spaces(homes.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:продать)\s(?:дом)$/i, async (message) => {
	if(!message.user.home) return message.reply(`у вас нет дома. ${utils.getSadEmoji()}. Напиши: дома`);
	let homie = HOMES.find((x) => x.id == message.user.home);

	await message.user.set("home", 0);
	await message.user.inc("balance", homie.cost * 0.90);

	return message.reply(`вы продали дом за ${utils.spaces(homie.cost * 0.90)}₽`);
});
updates.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список машин:
	
		${CARS.map((x) => `🚗 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить машину: машина [номер машины]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Машины 5" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Магазин" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}

	if(message.user.car) return message.reply(`у вас уже есть машина! Продать машину — "Продать машину".`);
	let car = CARS.find((x) => x.id == message.$match[1]);

	if(!car) return;

	if(car.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(car.cost <= message.user.balance) {
		await message.user.dec("balance", car.cost);
		await message.user.set("car", car.id);

		return message.reply(`вы успешно купили ${car.name} за ${utils.spaces(car.cost)}₽ 😇`);
	}

});
updates.hear(/^(?:продать)\s(?:машину)$/i, async (message) => {
	if(!message.user.car) return message.reply(`у вас нет машины. ${utils.getSadEmoji()}`);
	let car = CARS.find((x) => x.id == message.user.car);

	await message.user.set("car", 0);
	await message.user.inc("balance", car.cost * 0.90);

	return message.reply(`вы продали машину за ${utils.spaces(car.cost * 0.90)}₽`);
});
updates.hear(/^(?:статистика)/i, async (message) => {
	let os = require('os');
	let uptime = require('os-uptime');
	let cpu = os.cpus();
	if(FLEX.indexOf(message.senderId) === -1) return;
	let _users = await User.countDocuments();

	return message.send(`Статистика:
	&#4448;🔝 Время работы: ${unixStampLeft(process.uptime() * 1000)}
&#4448;✉️ Сообщений с момента старта: ${utils.spaces(stats.messages.inbox).replace(/\s/g, ".")}
&#4448;📊 Новых игроков с момента старта: ${utils.spaces(stats.new_users).replace(/\s/g, ".")}
&#4448;🙍‍♂ Количество игроков: ${_users}
&#4448;❌ Количество забаненых: ${BANS.length}

🛢 Информация о железе:
&#4448;💻 Система: ${os.type()} ${os.arch()}
&#4448;📎 Версия: ${os.release()}
`);
});
updates.hear(/^(?:банк)$/i, async (message, bot) => {
	await message.reply(`банк:
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
"label": "Депозит"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Кредит"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "ЭДепозит"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Меню"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:снять)\s(?:с)\s(?:депозита)\s(.*)$/i, async (message) => {
	if(!message.$match[1]) return message.reply(`использование: "Снять с депозита [сумма]" ${utils.getSadEmoji()}`);
	message.$match[1] = utils.parseBet(message.$match[1], message.user.bank);
	if(!message.$match[1]) return;

	if(message.$match[1] > message.user.bank) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.bank) {
		await message.user.inc("balance", message.$match[1]);
		await message.user.dec("bank", message.$match[1]);

		return message.reply(`вы сняли ${utils.spaces(message.$match[1])}₽
		💳 Остаток на депозите: ${utils.spaces(message.user.bank)}₽
		💰 Ваш баланс: ${utils.spaces(message.user.balance)}₽`);
	}
});
updates.hear(/^(?:депозит)$/i, async (message, bot) => {
	return message.reply(`добро пожаловать в "Lucky Bank" .\n\n💳 В данные момент у вас на депозите - ${utils.spaces(message.user.bank)}₽\n\n💽 - Здесь вы можете положить свои деньги на депозит.\n\n➕Текущая процентная ставка депозита - 3% \n\n🍀 - Для пополнения депозита пишите: Депозит [сумма] \n🍀 - Для снятия средств с депозита пишите: Снять с депозита [сумма]\n\n💭 Важная информация:\n№1 - Если вы внесли взнос, то каждый час на  `);
});
updates.hear(/^(?:депозит)\s(.*)$/i, async (message) => {

	 if(!message.user.passport) return message.reply(`похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"`);
	 if(message.user.kredit) return message.reply(`вы не можете использовать депозит в данный момент , так как у вас имеется не погашенный кредит в размере ${utils.spaces(message.user.kredit)}₽`);

	if(!message.$match[1]) return message.reply(`использование: "Депозит [сумма]" ${utils.getSadEmoji()}`);

	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);

	if(!message.$match[1]) return;
	if(message.$match[1] < 0) return;
	if(message.$match[1] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.balance) {
		await message.user.inc("bank", message.$match[1]);
		await message.user.dec("balance", message.$match[1]);

		return message.reply(`вы пополнили свой депозит на ${utils.spaces(message.$match[1])}₽`);
	}
});
updates.hear(/^(?:снять)\s(?:с)\s(?:эдепозита)\s(.*)$/i, async (message) => {
	if(FLEX.indexOf(message.senderId) === -1) return;
	if(!message.$match[1]) return message.reply(`использование: "Снять с эдепозита [сумма]" ${utils.getSadEmoji()}`);
	message.$match[1] = utils.parseBet(message.$match[1], message.user.ebank);
	if(!message.$match[1]) return;

	if(message.$match[1] > message.user.ebank) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.ebank) {
		await message.user.inc("balance", message.$match[1]);
		await message.user.dec("ebank", message.$match[1]);

		return message.reply(`вы сняли ${utils.spaces(message.$match[1])}₽
		💳 Остаток на ЭДепозите: ${utils.spaces(message.user.ebank)}₽
		💰 Ваш баланс: ${utils.spaces(message.user.balance)}₽`);
	}
});
updates.hear(/^(?:эдепозит|ЭДепозит)$/i, async (message, bot) => {
	if(message.user.bank) return message.reply(`вы не можете использовать ЭДепозит в данный момент , так как в данный момент вы используете обычный депозит`);
	if(FLEX.indexOf(message.senderId) === -1) return;
	return message.reply(`добро пожаловать в "EL DEPOZIT" .\n\n💳 В данные момент у вас на ЭДепозите - ${utils.spaces(message.user.ebank)}₽\n\n💽 - Здесь вы можете положить свои деньги на ЭДепозит.\n\n➕Текущая процентная ставка депозита - 9% \n\n🍀 - Для пополнения депозита пишите: ЭДепозит [сумма] \n🍀 - Для снятия средств с депозита пишите: Снять с Эдепозита [сумма]\n\n💭 Важная информация:\n№1 - Если вы пополнили Эдепозита, то каждый час на ваш депозит будет начисляться 9% от суммы депозита. `);
});
updates.hear(/^(?:эдепозит)\s(.*)$/i, async (message) => {
	if(message.user.bank) return message.reply(`вы не можете использовать ЭДепозит в данный момент , так как в данный момент вы используете обычный депозит`);
	if(FLEX.indexOf(message.senderId) === -1) return;

	 if(!message.user.passport) return message.reply(`похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"`);
	 if(message.user.kredit) return message.reply(`вы не можете использовать ЭДепозит в данный момент , так как у вас имеется не погашенный кредит в размере ${utils.spaces(message.user.kredit)}₽`);

	if(!message.$match[1]) return message.reply(`использование: "ЭДепозит [сумма]" ${utils.getSadEmoji()}`);

	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);

	if(!message.$match[1]) return;
	if(message.$match[1] < 0) return;
	if(message.$match[1] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.balance) {
		await message.user.inc("ebank", message.$match[1]);
		await message.user.dec("balance", message.$match[1]);

		return message.reply(`вы пополнили свой ЭДепозит на ${utils.spaces(message.$match[1])}₽`);
	}
});
updates.hear(/^(?:уведомления)$/i, async (message, bot) => {
	if(message.user.notifications === true)
	{
		await message.user.set("notifications", false)
		return message.reply(`уведомления отключены! 🔕`);
	}

	if(message.user.notifications === false)

	{   
		await message.user.set("notifications", true)
		return message.reply(`уведомления включены! 🔔`);
	}
});
updates.hear(/^(?:кредит)$/i, async (message, bot) => {
	return message.reply(`добро пожаловать в "Lucky Bank"\n\n💽 - Здесь вы можете взять кредит под 11%\n\n🍀 - Для взятия кредита пишите: Взять кредит [сумма]\n🍀 - Для погашения кредита пишите: Погасить кредит\n\n💭 Важная информация:\n№1 - Сумма кредита не может быть больше 300,000,000₽.\n№2 - Имея кредит нельзя переводить валюту.\n№3 - Если есть кредит, то каждый час с вашего баланса будет сниматься 11% от кредита.
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
"label": "Погасить кредит"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "Банк"
},
"color": "primary"
}]
]
})
   });
	});
updates.hear(/^(?:взять)\s(?:кредит)\s(.*)$/i, async (message) => {
	if(message.isChat) return message.reply('кредит можно брать только в личных сообщениях группы')
	if(message.user.age < 18) return message.reply(`кредиты можно брать лицам старше 18 лет!`)	
	if(!message.user.passport) return message.reply(`похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"`)
	if(message.user.kredit) return message.reply(`у вас уже есть кредит в размере - ${utils.spaces(message.user.kredit)}₽!`)

	if(!message.$match[1]) return message.reply(`использование: "взять кредит [сумма]" ${utils.getSadEmoji()}`);

	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);

	if(!message.$match[1]) return;
 
    if(message.$match[1] <= 0) return;
    if(message.$match[1] > 300000000) return message.reply(`сумма кредита не может быть больше ${utils.spaces(300000000)}₽.`);
	
	await message.reply(`ваша заявка успешно принята, в течении 15 секунд вам придет сообщение синформацией о зачислении средств на счет`);
	setTimeout(() => { 
	message.reply(`на ваш счет успешно поступило - ${utils.spaces(message.$match[1])}₽\n\n\n С уважением Lucky Bank!`)
	message.user.inc("balance", message.$match[1]);
    message.user.set("kredit", message.$match[1]);
	}, 15000);

});

updates.hear(/^(?:погасить)\s(?:кредит)$/i, async (message) => {
	if(message.isChat) return message.reply('кредит можно погасить только лишь в личных сообщениях группы!')
	if(!message.user.passport) return message.reply(`похоже у вас нет паспорта. Паспорт можно получить написав в личные сообщения группы "Получить паспорт"`)
	if(!message.user.kredit) return message.reply(`у вас нет кредита!`)

    if(message.user.kredit > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);

	await message.reply(`ваш кредит в размере ${utils.spaces(message.user.kredit)}₽ успешно погашен! Вам придет сообщение с подтверждением информации в течении 3 минут.`);
	await message.user.dec("balance", message.user.kredit);
    await message.user.set("kredit", 0);
	setTimeout(() => { 
    message.reply(`ваш кредит успешно погашен.\n\n\n С уважением Lucky Bank!`)
	}, 150000);
});
updates.hear(/^(?:питомцы)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список питомцев:
	
		${pets.map((x) => `${x.icon}${x.id}. ${x.name} — ${utils.spaces(x.cost)}₽`).join("\n")}
		
		Купить питомца: питомцы [номер питомца]`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Питомцы 1" 
}, 
"color": "default" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Питомцы 2" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Питомцы 3" 
}, 
"color": "default" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Питомцы 4" 
}, 
"color": "default"
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Питомцы 5" 
}, 
"color": "default"  
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Животные" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
}
    if(!message.$match[1] <= 5) {
	if(message.user.pet) return message.reply(`у вас уже есть питомец! Продать питомец — <<Продать питомца>>.`);
	let petss = pets.find((x) => x.id == message.$match[1]);

	if(!petss) return;

	if(petss.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(petss.cost <= message.user.balance) {
		await message.user.dec("balance", petss.cost);
		await message.user.set("pet", petss.id);
		return message.reply(`вы успешно купили питомца "${petss.name}" за ${utils.spaces(petss.cost)}₽ 😇`);
	}
}
});
updates.hear(/^(?:продать)\s(?:питомца)$/i, async (message) => {
	if(!message.user.pet) return message.reply(`у вас нет питомца. ${utils.getSadEmoji()}`);
	let petss = pets.find((x) => x.id == message.user.pet);

	await message.user.set("pet", 0);
	await message.user.inc("balance", petss.cost * 0.90);

	return message.reply(`вы продали питомца за ${utils.spaces(petss.cost * 0.90)}₽`);
});
updates.hear(/^(?:питомец)$/i, async (message, bot) => {
	if(!message.user.pet) return message.reply(`похоже у вас нет питомца. Ввведи команду "Питомцы"`)
	let text = ``;

	text += `${pets.find((x) => x.id === message.user.pet).icon} Питомец: ${pets.find((x) => x.id === message.user.pet).name}\n`;
	text += `❤ Здровье питомца: ${message.user.phealth}%\n`;

	return message.reply(`твой питомец:\n${text}`);
});
updates.hear(/^(?:поход)\s(?:питомца)$/i, async (message) => {
	if(message.user.pohod > getUnix()) return message.reply(`ваш питомец может пойти в поход через ${unixStampLeft(message.user.pohod - Date.now())}.`);
	if(!message.user.pet) return message.reply(`в настоящее время у вас нету питомца! ${utils.getSadEmoji()}`)
 
    let radost = utils.random(15, 55)
	if(message.user.phealth < 45) return message.reply(`у вашего питомца здоровье меньше 45% ${utils.getSadEmoji()}`);

	let caught = utils.pick([ true, true, true, true, false, false, false, false ]);
	if(caught) {
		await message.user.set("pet", 0); 
		await message.user.dec("life", radost)
		await message.user.set("pohod", getUnix() + 14400000);
		return message.reply(`во время похода, вашего питомца ${utils.pick(['сбила машина', 'зарезал маньяк', 'приютил другой человек'])}! ${utils.getSadEmoji()}`),
		await message.sendSticker(5112);
	}
	await message.user.set("pohod", getUnix() + 14400000)
    let petss = pets.find((x) => x.id === message.user.pet);
    
	let earn = utils.random(petss.min, petss.max);

	let health = utils.random(15, 25)
	await message.user.inc("balance", earn) 
	await message.user.dec("phealth", health)
	return message.reply(`ваш питомец во время похода потерял - ${health}% здоровья, но нашел - ${utils.spaces(earn)}₽`),
	await message.sendSticker(8331);
});
updates.hear(/^(?:выгулить)\s(?:питомца)$/i, async (message) => {
	if(!message.user.pet) return message.reply(`в настоящее время у вас нету питомца! ${utils.getSadEmoji()}`)
	if(message.user.pohod > getUnix()) return message.reply(`вы сможете выгулить своего питомца через ${unixStampLeft(message.user.pohod - Date.now())}.`);

      if(message.user.balance < 750) return message.reply(`чтобы выгулить питомца, вам нужно 500₽`);
      if(message.user.energy < 26) return message.reply('вы не можете выгулить вашего питомца, так как у вас энергия меньше 25%');
      let energy = utils.random(15, 25)
	  await message.user.dec("balance", 500) 
	  await message.user.dec("energy". energy)
	  return message.reply(`вы выгулили питомца и восстановили ему здоровье!\n\nC вашего баланса снято - 500₽, так как парк для животных платный.`),
	  await message.user.set("pohod", getUnix() + 14400000),
	  await message.user.set("phealth", 100)
	  await message.sendSticker(8783);
						});

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

User.prototype.inc = function(field, value) {
	this[field] += value;
	return this.save();
}

User.prototype.dec = function(field, value) {
	this[field] -= value;
	return this.save();
}

User.prototype.set = function(field, value) {
	this[field] = value;
	return this.save();
}
function flipString(string) {
    let result = "";
    string = string.toLowerCase().split("").reverse();
    string.map((symbol) => {
        result += flipTable[symbol] || symbol;
    });
    return result;
}
Array.prototype.last = function() {
	return this[this.length - 1];
}
