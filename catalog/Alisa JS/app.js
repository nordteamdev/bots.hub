console.log('------Бот успешно запущен-------')
console.log('--Разработчик https://vk.com/nodejs_coder--')

var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi('749673bda9c6591b44746c52fbad777b');
let giving = false;

const houses = [
    { name: "Коробка",         uid: 1,  price: 5000       },
    { name: "Каморка",         uid: 2,  price: 15000      },
    { name: "Палатка",         uid: 3,  price: 23000      },
    { name: "Дисковой дом",    uid: 4,  price: 34000      },
    { name: "Домик на дереве", uid: 5,  price: 1000000    },
    { name: "Дача",            uid: 6,  price: 1500000    },
    { name: "Дом у озера",     uid: 7,  price: 2000000    },
    { name: "Кирпичный дом",   uid: 8,  price: 25000000   },
    { name: "Бумажный дом",    uid: 9,  price: 160000000  },
    { name: "Коттедж",         uid: 10, price: 250000000  },
    { name: "Дом на бутылке",  uid: 11, price: 350000000  },
    { name: "Дом на Рублевке", uid: 12, price: 400000000  },
    { name: "Дом Создателя",   uid: 13, price: 600000000  },
    { name: "Подвал",          uid: 14, price: 1359000000 }
];

const businesses = [
	{
		name: 'Шаурмичная',
		cost: 50000,
		earn: 400,
		id: 1,
		icon: '🥖'
	},
	{
		name: 'Ларёк',
		cost: 10000,
		earn: 700,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Ресторан',
		cost: 300000,
		earn: 2500,
		id: 3,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 500000,
		earn: 3800,
		id: 4,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 1500000,
		earn: 8000,
		id: 5,
		icon: '🏭'
	},
	{
		name: 'Шахта',
		cost: 25000000,
		earn: 70000,
		id: 6,
		icon: '⛏'
	},
	{
		name: 'Офис',
		cost: 80000000,
		earn: 220000,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Разработка игр',
		cost: 150000000,
		earn: 300000,
		id: 8,
		icon: '🕹'
	},
	{
		name: 'Нефтевышка',
		cost: 500000000,
		earn: 700000,
		id: 9,
		icon: '🏜'
	},
	{
		name: 'Атомная электростанция',
		cost: 800000000,
		earn: 1000000,
		id: 10,
		icon: '💡'
	},
	{
		name: 'Космическое агентство',
		cost: 50000000000,
		earn: 50000000,
		id: 11,
		icon: '🗺'
	}
];

const comps = [
	{
		name: 'Asus E210',
		cost: 2000,
		id: 1
	},
	{
		name: 'HP T530',
		cost: 6000,
		id: 2
	},
	{
		name: 'Acer Veriton',
		cost: 14000,
		id: 3
	},
	{
		name: 'Dell Vostro',
		cost: 32000,
		id: 4
	},
	{
		name: 'Lenovo iDea',
		cost: 70000,
		id: 5
	},
	{
		name: 'MSI Pro 20ET',
		cost: 215000,
		id: 6
	},
	{
		name: 'HP Pavilion 570',
		cost: 420000,
		id: 7
	},
	{
		name: 'MacBook Air',
		cost: 1000000,
		id: 8
	},
	{
		name: 'iMac',
		cost: 2500000,
		id: 9
	},
	{
		name: 'Mac Pro',
		cost: 8000000,
		id: 10
	},
	{
		name: 'Asus ROG GR8',
		cost: 25000000,
		id: 11
	},
	{
		name: 'Хакерский компуктер 🤓',
		cost: 35000000,
		id: 12
	}
];

const phones = [
    { name: "Nokia 3310",          uid: 1,  price: 5000    },
    { name: "Samsung S2",          uid: 2,  price: 15000   },
    { name: "iPhone 4",            uid: 3,  price: 15000   },
    { name: "iPhone 5s",           uid: 4,  price: 45000   },
    { name: "iPhone 8",            uid: 5,  price: 92000   },
    { name: "Samsung S9",          uid: 6,  price: 150000  },
    { name: "Meizu M5",            uid: 7,  price: 200000  },
    { name: "Xiaomi Redmi 4A",     uid: 8,  price: 350000  },
    { name: "Microsot Lumia 6830", uid: 9,  price: 550000  },
    { name: "iPhone XS",           uid: 10, price: 1000000 },
    { name: "Xiaomi Redmi 6A",     uid: 11, price: 1350000 }
];

const apartments = [
    { name: "Чердак",                     uid: 1, price: 500000     },
    { name: "Квартира в общежитии",       uid: 2, price: 1500000    },
    { name: "Однокомнатная квартира",     uid: 3, price: 1500000    },
    { name: "Двухкомнатная квартира",     uid: 4, price: 4500000    },
    { name: "Четырехкомнатная квартира",  uid: 5, price: 9200000    },
    { name: "Пятикомнатная квартира",     uid: 5, price: 15000000   },
    { name: "Шестикомнатная квартира",    uid: 6, price: 20000000   },
    { name: "Квартира в центре Москвы",   uid: 7, price: 35000000   },
    { name: "Двухуровневая квартира",     uid: 8, price: 55000000   },
    { name: "Квартира с Евроремонтом",    uid: 9, price: 100000000  },
    { name: "Квартира админа",            uid: 10, price: 135000000 }
];

let ADMINS = [496175718, 389712482, 395638472, 201464141, 499334187, 366550316, 517001438, 407188988, 533000578];
let LITE = [496175718, 389712482, 395638472, 201464141, 499334187, 366550316, 517001438, 407188988, 533000578];

let BANS = [];
let CARS = [
	{
		id: 1,
		name: "Lada 2010",
		cost: 50000,
		att: "photo-178862418_456239027"
	},
	{
		id: 2,
		name: "Hyundai Solaris",
		cost: 250000,
		att: "photo-178862418_456239024"
	},
	{
		id: 3,
		name: "Toyota Camry",
		cost: 1000000,
		att: "photo-178862418_456239029"
	},
	{
		id: 4,
		name: "BMW 5",
		cost: 100000000,
		att: "photo-178862418_456239028"
	},
	{
		id: 5,
		name: "Mercedes - Benz",
		cost: 5000000000,
		att: "photo-178862418_456239028"
	},
	{
		id: 6,
		name: "Lamborghini Huracan",
		cost: 100000000000,
		att: "photo-178862418_456239026"
	},
	{
		id: 7,
		name: "Rolls Roys Wrath",
		cost: 50000000000000,
		att: "photo-178862418_456239030"
	}
];

const HACKS = [
	{
		id: 1,
		preview: 'Пентагонские сервера. Теперь вы владеете секретной информацией, которую вы продали за 20.000.000$ в Даркнете',
		attachment: 'photo-167914596_456243902',
		award: 100000
	},
	{
		id: 2,
		preview: 'мобильный телефон прохожего!',
		attachment: 'photo-167914596_456243939',
		award: 100000
	},
	{
		id: 3,
		preview: 'node0.sberbank.ru (Онлайн-банк)',
		attachment: 'photo-167914596_456243903',
		award: 100000
	},
	{
		id: 4,
		preview: 'унитаз в ТЦ',
		attachment: 'photo-167914596_456243937',
		award: 5000
	},
	{
		id: 5,
		preview: 'прошивку. Которую вы прошили своему однокласснику, вы украли деньги с его счёта.',
		attachment: 'photo-167914596_456243938',
		award: 100000
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

let course = 5000;
let updated = Date.now();

process.env.TZ = "Europe/Moscow";
const utils = require("./utils");

setInterval(async () => {
	course = utils.random(4500, 6000);
	updated = Date.now();
}, 600000);

const mongo = require("mongoose");
mongo.connect("mongodb://serega:12qwaszx@ds151997.mlab.com:51997/serega");

const schema = new mongo.Schema({
	uid: Number,
	id: Number,
	balance: Number,
	thack: Number,
	vip: Number,
	bank: Number,
	rating: Number,
	diamonds: Number,
	work: Number,
	tag: String,
	lvl: Number,
	regDate: Number,
	tbonus: Number,
	peredacha: Number,
	twork: Number,
	treport: Number,
	xmas: Boolean,
	ref: Number,
	biz: Number,
	business: Number,
	bantop: Boolean,
	banreport: Boolean,
	banpay: Boolean,
	buttons: Array,
	energy: Number,
	car: Number,
	ttaxi: Number,
	admingive: Number,
	comp: Number,
	house: Number,
	apartment: Number,
	phone: Number,
	computer: Number,
	bangive: Boolean
});

const promoSchema = new mongo.Schema({
	title: String,
	count: Number,
	users: Array,
	sum: Number
});

const stavkaSchema = new mongo.Schema({
	id: Number,
	balance: Number,
	name: String
	});

const logSchema = new mongo.Schema({
	from: Number,
	to: Number,
	date: Number,
	amount: Number
})

const { works } = require("./Earns.js");
const User = mongo.model("User", schema);
const Stavka = mongo.model("Stavka", stavkaSchema);
const Promo = mongo.model("Promo", promoSchema);
const Log = mongo.model("Log", logSchema);

let likes = [];

const { VK, Keyboard } = require("vk-io");
const keyboard = Keyboard;

let user            = new VK();
user.setOptions({
    token: "2effdb14b43a0c336307167990d55634f139bf773b47a430450e64cec6d7f02c6e5847bc35b5f069d77b7",
    apiMode: "parallel"
});

const vk = new VK({
	token:  "2278400a4e3467c7373262f3db311c0555e0e7abffb27e4bb56f07008207b74e6b1547a5501ef4d2addf8",
	pollingGroupId: 182629640,
	apiMode: "parallel"
});

vk.setOptions({
    token:  "2278400a4e3467c7373262f3db311c0555e0e7abffb27e4bb56f07008207b74e6b1547a5501ef4d2addf8",
    apiMode: "parallel",
    pollingGroupId: 182629640
});

setInterval(() => { 
	const buspay = [0, 400, 700, 2500, 3800, 8000, 70000, 220000, 300000, 700000, 1000000, 50000000] 
	User.find().then((res) => {
		res.filter((x) => x.business > 0).map(async (x) => { 
			x.inc("biz", buspay[x.business]);
		});
	});
}, 3600000);

async function collect() {
	const { VK } = require("vk-io");
	const vk = new VK({ token: token });

	let ids = [];

	for (let i = 0; i < 200; i++) {
		await vk.api.messages.getConversations({ count: 200, offset: i * 200 }).then(async (response) => {
			await response.items.map((dialog) => {
				ids.push(dialog.conversation.peer.id);
			});
		}); 
	}
	await vk.api.messages.send({ 
		chat_id: 288, 
		message: `Человечки успешно собраны! (${ids.length} чатов)` 
	   });
	return ids;
}
async function mailing(messages,attachments) {
	let start = Date.now() / 1000;

	const { VK } = require("vk-io");
	const vk = new VK({ token: token, apiMode: "parallel" });

	let ids = await collect();

	for (let i = 0; i < Math.floor(ids.length / 100); i++) {
		await vk.api.call("messages.send", {
			user_ids: ids.slice(i * 100, i * 100 + 100).join(","),
			//user_ids: 459658086,
			message: messages,
			attachment: attachments,
			random_id: Math.random() * 100000
		});
	}

	let end = Date.now() / 1000;
	await vk.api.messages.send({ 
		chat_id: 288, 
		message: `Засрал людям лс контекртно!. (${ids.length - errors} из ${ids.length} за ${end - start}s)` 
	   });
	return true;
}

async function mailingChats(messages,attachments) {
	let start = Date.now() / 1000;

	const { VK } = require("vk-io");
	const vk = new VK({ token: token, apiMode: "parallel" });

	for (let i = 1; i < 4000; i++) {
		await vk.api.call("messages.send", {
			chat_id: i,
			message: messages,
			attachment: attachments,
			random_id: Math.random() * 100000,
			keyboard: generateKeyboard(["🔑 Бонус","📚 Помощь","💸 Баланс"])
		}).catch((err) => {});
	}

	let end = Date.now() / 1000;
	await vk.api.messages.send({ 
		chat_id: 288, 
		message: `Отлишно насрал людям в чаты! (за ${end - start}s)` 
	   });
	return true;
}

let mentionRegexp = new RegExp(`\\[club${vk.options.pollingGroupId}\\|(.*)\\]`);

const { updates, snippets } = vk;
updates.startPolling();

updates.on("message", async (message, next) => {
	stats.messages.inbox += 1;
	if(BANS.indexOf(message.senderId) !== -1) return;

	if(message.senderId < 0) return;
	let _user = await User.findOne({ id: message.senderId });

	if(!_user) {
		let [user_info] = await vk.api.call("users.get", { user_id: message.senderId });

		let count = await User.countDocuments();

		let $user = new User({
			uid: count + 1,
			id: message.senderId,
			balance: 5000,
			bank: 0,
			rating: 0,
			diamonds: 0,
			work: 0,
			biz: 0,
			comp: 0,
			thack: 0,
			business: 0,
			tag: user_info.first_name,
			lvl: 1,
			regDate: getUnix(),
			tbonus: 0,
			peredacha: 0,
			vip: 0,
			biz: 0,
			business: 0,
			twork: 0,
			treport: 0,
			xmas: false,
			ref: 0,
			bantop: false,
			banreport: false,
			banpay: false,
			buttons: ["👑 Донат"],
			energy: 0,
			car: 0,
			ttaxi: 0
		});

		await $user.save();
		console.info(`[${unixStamp(getUnix())} ${message.isChat ? "c"+message.chatId+", @id"+message.senderId : "@id"+message.senderId}]: New user - @id${message.senderId} #${count}`);

		if(!message.isChat) {
			await message.send(`@id${message.senderId} (${user_info.first_name}), привет! Рад познакомиться.\nУзнать все команды бота - <<помощь>>.\nНаша беседа -> https://vk.me/join/AJQ1dyFdohInlyR4A_0GX92X`, {
				keyboard: generateKeyboard(["👑 Донат"], ["📒 Помощь"])
			});

			await message.sendSticker(7464);
		}

		stats.new_users += 1;
	}

	let follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 182629640 });
	message.user = await User.findOne({ id: message.senderId });

	message.reply = (text, params) => message.send(`${message.user.tag}, ${text}\n\n${!follow ? `[club182629640|подпишись на меня братишка (]` : ``}`, params);
	if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, "").trim();

	let start = Date.now();
	await next();

	let end = Date.now();
	if(message.senderId === 423555969) console.info(`[${unixStamp(getUnix())} ${message.isChat ? "c"+message.chatId+", @id"+message.senderId : "@id"+message.senderId}]: ${message.text.slice(0, 64)} handled in ${end-start} ms`);
});

updates.hear(/^(?:помощь|Начать|Start|📒\sПомощь)$/i, message => message.reply(`мои команды:
🌍Основные:
    💾Профиль - показать ваш профиль
    💸Баланс - показать ваш баланс
    🎫Банк [сумма/снять сумма] - положить/снять деньги с банка
    💎Алмаз [количество/продать количество] - купить/продать алмазы
    👑Рейтинг - ваш рейтинг/Рейтинг [количество] - узнать/повысить рейтинг($250млн)
    📟Бизнесы - список бизнесов
    📟Бизнес снять [сумма] - снять прибыль с бизнеса
    📟Продать бизнес - продать бизнес
    ✍Ник [ник] - сменить ник
    ♻Передать [id] [сумма] - передать деньги игроку
    📠Магазин - магазин
    🎖Топ - топ игроков
    🎁Бонус - ежедневный бонус
    💼Реф [id] - активировать реферальный ID
    📈📉Курс - курс алмаза
    📝Работы - список работ

🎮Развлечения:
    🎰Казино [сумма] - сыграть в казино
    🍸Стаканчик [1-3] [сумма] - испытать удачу в "Стаканчике"
    👾Сейф [10-99] - сейф
	👾Бигсейф [100-999] - большой сейф
    😵Трейд вверх/вниз [сумма]
    🅰Буква [а-я] - испытать удачу с алфавитом :)

💾Работа:
    📞Работа [номер работы] - устроиться на работу
    💻Работать - работать(раз в 10 минут)
    ❌Уволиться - уволиться с работы

📠Магазин:
   🏡Дома - список домов
   🏙Квартиры - список квартир
   📱Телефоны - список телефонов
    🖥Компьютеры - список компьютеров

🚗Машины:
    🚘Машины - список машин
    🚘Машина - информация о вашей машине
    🔑Машина продать - продать машину (90% от суммы)
    🚖Таксовать - работать в такси(аналог "Работа")

📌Прочее:
    ⌨Кнопка [текст/удалить] - бинды
    🆓Халява - информация о том, как получить халявные деньги

📢Голосовые сообщения:
    👨Скажи м [текст] - бот озвучит текст мужским голосом
    👩Скажи ж [текст] - бот озвучит текст женским голосом

🔰Канвас (работа с фото):
    💾Кпрофиль - профиль 
    ⚠Порно - порнография (18+)
    ✏Напиши [текст] - напишет текст на фото
     

💳Донат - купить админку
🆘Репорт [текст] - ошибка или пожелания

По всем вопросам к @nodejs_coder

${LITE.indexOf(message.senderId) !== -1 ? `⚠ Админка - зайти в админку` : ``}`));

updates.hear(/^(?:профиль|📒\sпрофиль)$/i, async (message) => {
	let text = ``;
	const biz = businesses.find(x=> x.id === message.user.business);
	message.append = (_text) => text += _text+"\n";

	message.append("твой профиль:");
	message.append("🔎 ID: " + message.user.uid);
	message.append("💰 Баланс: " + utils.spaces(message.user.balance) + "$");
	if(message.user.diamonds) message.append("💎 Алмазов: " + utils.spaces(message.user.diamonds));
	if(message.user.bank) message.append("💳 В банке: " + utils.spaces(message.user.bank) + "$");
	message.append("👑 Рейтинг: " + message.user.rating);
	message.append(LITE.indexOf(message.senderId) !== -1 ? `🔱 Администратор` : ``);
	if(message.user.work) message.append("👔 Работа: " + works.find((x) => x.id === message.user.work).name);
	if(message.user.house || message.user.apartment || message.user.biz || message.user.phone || message.user.business || message.user.computer || message.user.car) message.append("\n🔑 Имущество:");

	if(message.user.car) message.append(`&#4448;🚘 Машина: ${CARS.find((x) => x.id === message.user.car).name}`);
	if(message.user.biz) text += `👩‍💻 Бизнес: ${biz.name}\n`;
	if(message.user.house) message.append(`&#4448;🏠 Дом: ${houses.find((x) => x.uid === message.user.house).name}`);
	if(message.user.apartment) message.append(`&#4448;🌇 Квартира: ${apartments.find((x) => x.uid === message.user.apartment).name}`);
	if(message.user.phone) message.append(`&#4448;📱 Телефон: ${phones.find((x) => x.uid === message.user.phone).name}`);
	if(message.user.comp) message.append(`&#4448;🖥 Компьютер:  ${comps.find((x) => x.id == message.user.comp).name}`);

	message.append("\n📗 Дата регистрации: " + unixStamp(message.user.regDate));

	return message.reply(text);
});

updates.hear(/^(?:баланс)$/i, async (message) => {
	return message.reply(`на руках: ${utils.spaces(message.user.balance)}$${message.user.diamonds ? `\n💎 Алмазов: ${utils.spaces(message.user.diamonds)}` : ``}${message.user.bank ? `\n💳 В банке: ${utils.spaces(message.user.bank)}$` : ``}`);
});

updates.hear(/^(?:скажи)\s([м|ж])\s(.*)$/i, async (message) => { 
let https = require('https'); 
if(!message.$match[1] && !message.$match[2]) return message.send('Пример использования: Скажи м привет (м - мужской голос, ж - женский голос)'); 
if(message.text.length > 500) return message.send('Макс. - 500 символов'); 
https.get("https://tts.voicetech.yandex.net/generate?text=" + encodeURIComponent(message.$match[2]) + `&format=mp3&lang=ru-RU&speaker=${message.$match[1] == "м" ? "ermil" : utils.pick(["alyss", "jane"])}&speed=1&key=3b141899-4097-45c6-a00b-d449812e1ffa&emotion=mixed`, (stream) => { 
stream.name = 'audio_message.ogg'; 
return message.sendAudioMessage(stream); 
}); 
});

updates.hear(/^(?:проверить)\s?([^]+)?/i, (message) => {
    let a = message.match$;  
    let send = reply
    if(!a[1]) return message.send(`Вы не указали номер квитанции\nПрочитайте Инструкцию в 'ДОНАТ'`);
    Wallet.getOperationHistory({rows: 50, operation: "IN"}, (err, operations) => {
        for(i in operations['data']){
            stats = true;
            if(operations['data'][i]['txnId'] != a[1]) return message.send(`Платёж №${a[1]} необнаружен.`)
            if(operations['data'][i]['txnId'] == a[1]){
                if(don[operations['data'][i]['txnId']]) return message.send(`Платёж №${a[1]} уже был активирован.`)
                don[operations['data'][i]['txnId']] = {
                    user: message.senderId,
                    comment: operations['data'][i]['comment']
                }
 
                if(operations['data'][i]['comment'] != null){
                    if(operations['data'][i]['comment'] == 'money'){
                        message.user.balance += Number(operations['data'][i]['total']['amount'] * 2000000000)
                        return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: ${operations['data'][i]['comment']}
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
💎 Наименование товара: Игровая Валюта
💰 Зачисленно: ${operations['data'][i]['total']['amount'] * 2000000000}$
                        `);
                    }  
                }
                    if(operations['data'][i]['comment'] == 'vip' && operations['data'][i]['total']['amount'] == 50){
                        message.user.right = 1;
                        return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: ${operations['data'][i]['comment']}
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
💎 Наименование товара: Bronze`)
                }
                    if(operations['data'][i]['comment'] == 'admin' && operations['data'][i]['total']['amount'] == 100){
                        message.user.vip = 2;
                        return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: ${operations['data'][i]['comment']}
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
💎 Наименование товара: VIP`)
                }
                return message.send(`
[🔥Данный донат был обнаружен🔥]
|||||||||||||||||||||||||||||||
💰Сумма перевода: ${operations['data'][i]['total']['amount']} рублей
💬Ваш комментарий к переводу: Не указан
-_-_-_-_-_-_-_-_-_-_-_-_-_-_
Напишите @id496175718 (ему), для получения доната
                `);
            }
        }
    });
})

updates.hear(/^(?:ставка)$/i, async (message, bot) => { message.user.foolder += 1 
let text = ``; 
for (i in stavka) { 
text += `${message.user.balance > stavka[i].balance && stavka[i].id !== message.user.uid ? '🔸' : '🔹'} ${stavka[i].id}. "${stavka[i].name}" - ${utils.sp(stavka[i].balance)}$\n`; 
}; 
return message.reply(`доступные ставки:\n${text}\n🔸 - Вы можете принять.\n❓ Для принятия ставки введите «Ставка [номер]»`) 
}); 

const fs = require("fs");

updates.hear(/^(?:кпрофиль)/i, async (message, bot) => { 

let ctx = message 

ctx.send(`ПРЕДУПРЕЖДЕНИЕ: чтобы канвас работал, вы должны написать хоть одно сообщение в лс группы.`) 

const { createCanvas, loadImage } = require('canvas'); 
const { registerFont } = require('canvas')

registerFont('./17282.ttf', { family: 'mr_CCUpUpAndAwayG' })
const canvas = createCanvas(800, 400); 
const ctxx = canvas.getContext('2d'); 

const use_id = message.user.id; 
const [ava_info] = await vk.api.users.get({ user_id: use_id, fields: "photo_400" }); 
const [user_info] = await vk.api.users.get({ user_id: use_id }); 
const phone = await loadImage('./canvas/grad.png') 
ctxx.fillStyle = "#FFFFFF"; 

const mychit = await loadImage(ava_info.photo_400); 
ctxx.drawImage(mychit, 0, 0); 
ctxx.drawImage(phone, 0, 0, 800, 400); 

ctxx.font = '25px mr_CCUpUpAndAwayG'; 
ctxx.fillText(`ID: ${utils.spaces(message.user.uid)}`, 250, 70); 
ctxx.fillText(`Баланс: ${utils.spaces(message.user.balance)} $`, 250, 118); 
ctxx.fillText(`Рейтинг: ${utils.spaces(message.user.rating)}`, 258, 170);
ctxx.fillText(`Дата регистрации: ${unixStamp(message.user.regDate)} `, 254, 270);

//ctxx.textAlign = "right"; 
ctxx.font = '22px mr_CCUpUpAndAwayG'; 
ctxx.fillText(`${user_info.first_name} ${user_info.last_name} :`, 370, 27); 

return ctx.sendPhoto({ 
value: canvas.toBuffer(), 
options:{ 
filename: 'cit.png' 
} 
}); 
});

updates.hear(/^(?:топ)$/i, async (message) => {

let ttp = [];

let users = await User.find({ balance: { $gt: 15000000 }});

for (let i = 0; i < users.length; i += 1) {
		ttp.push({ id: users[i].id, rating: users[i].rating, balance: users[i].balance, tag: users[i].tag, uid: users[i].uid });
	}
		return message.reply(`топ игроков:
		
	${
		ttp
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 10)
		.map((x, i) => `${i === 9 ? "&#128287;" : `${i + 1}&#8419;`} @id${x.id} (${x.tag}) — ${utils.formatNumber(x.rating)} 👑 | $${utils.spaces(x.balance)}`)
		.join("\n")
	}`);
});

updates.hear(/^(?:mmm)\s([0-9]+)\s([0-9]+)\s(.*)$/i, async (message) => { 
const qr = require('@vkontakte/vk-qr/dist/umd/qrCodeGenerator'); 
var svg2img = require('svg2img'); 
const QRReader = require('qrcode-reader'); 
const jimp = require('jimp');

	if(message.senderId !== 496175718) return; 
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

updates.hear(/^(?:говори)\s(.*)/i, async (message) => {
const googleTTS = require('google-tts-api');
 
googleTTS(message.$match[1], 'ru', 2.5) 
.then(function (url) {
  message.sendAudioMessage(url) ;
})
.catch(function (err) {
  console.error(err.stack);
});
})

updates.hear(/^(?:напиши)\s(.*)$/i, async (message) => {

let ctx = message 

ctx.send(`ПРЕДУПРЕЖДЕНИЕ: чтобы канвас работал, вы должны написать хоть одно сообщение в лс группы.`) 
if(message.text.length > 100) return message.send('Макс. - 100 символов'); 

const { createCanvas, loadImage } = require('canvas'); 
const canvas = createCanvas(800, 400); 
const ctxx = canvas.getContext('2d'); 

const use_id = message.user.id; 
const [ava_info] = await vk.api.users.get({ user_id: use_id, fields: "photo_400" }); 
const [user_info] = await vk.api.users.get({ user_id: use_id }); 
const phone = await loadImage('./canvas/grad2.jpg') 
ctxx.fillStyle = "#000000"; 

const mychit = await loadImage(ava_info.photo_400); 
ctxx.drawImage(mychit, 0, 0); 
ctxx.drawImage(phone, 0, 0, 800, 400); 

ctxx.font = '23px mr_CCUpUpAndAwayG'; 
ctxx.fillText(`${message.$match[1]}`, 270, 118); 

//ctxx.textAlign = "right"; 
ctxx.font = '22px mr_CCUpUpAndAwayG'; 
ctxx.fillText(`${user_info.first_name} ${user_info.last_name} :`, 300, 27); 

return ctx.sendPhoto({ 
value: canvas.toBuffer(), 
options:{ 
filename: 'napiIIIi.png' 
} 
}); 
});

updates.hear(/^(?:ставка)\s([0-9]+)$/i, async (message, bot) => { message.user.foolder += 1 
message.$match[1] = Math.floor(Number(message.$match[1])); 
for (i in stavka) { 
if(stavka[i].id === message.$match[1]) { 
if(message.user.balance < stavka[i].balance) return message.reply(`У вас недостаточно денег!`); 
if(message.user.uid === stavka[i].id) return message.reply(`Вы не можете играть с самим собой!`); 
let user = users.findOne(uid === Number(message.$match[1]))
if(stavka[i].name == "Решка") name = "Орёл"; 
if(stavka[i].name == "Орёл") name = "Решка"; 
let int = utils.pick(1, 2); 
if(int === 1) { 
count = stavka[i].balance; 
message.user.balance -= count; 
user.balance += count * 2; 
return message.reply(`Выпало "${name}"\n💢 Вы проиграли ${utils.space(count)}$!\n💰 Баланс: ${utils.space(message.user.balance)}`); 
vk.api.messages.send({ user_id: user.id, message: `Выпало "${stavka[i].name}"\n✅ Вы выиграли ${utils.space(count)}$!\n💰 Баланс: ${utils.space(user.balance)}`}); 
delete stavka[i]; 
return 
}; 
if(int === 2) { 
count = stavka[i].balance; 
message.user.balance += count; 
return message.reply(`Выпало "${stavka[i].name}"\n✅ Вы выиграли ${utils.space(count)}$!\n💰 Баланс: ${utils.space(message.user.balance)}`); 
vk.api.messages.send({ user_id: user.id, message: `Выпало "${name}"\n💢 Вы проиграли ${utils.space(count)}$!\n💰 Баланс: ${utils.space(user.balance)}`}); 
delete stavka[i]; 
return 
}; 
}; 
}; 
}); 

updates.hear(/^(?:ставка)\s(удалить)$/i, async (message, bot) => { message.user.foolder += 1 
for (i in stavka) { 
if(stavka[i].id === message.user.uid) { 
count = stavka[i].balance 
message.user.balance += stavka[i].balance 
return message.reply(`Вы удалили свою ставку!`); 
delete stavka[i]; 
return 
} 
}; 
return message.reply(`У вас нет ставок!`); 
}); 

updates.hear(/^(?:ставка)\s(решка)\s(.*)$/i, async (message, bot) => { message.user.foolder += 1 
message.$match[2] = utils.parseBet(message.$match[1], message.user.balance);
if(message.$match[2] <= 0) return; 
if(!Number(message.$match[2])) return; 
if(message.$match[2] > message.user.balance) return message.reply(`У вас нет такой суммы!`); 
for (i in stavka) { 
if(stavka[i].id === message.user.uid) return message.reply(`Вы уже сделали ставку! Введите: «Ставка удалить» если хотите убрать ставку!`); 
}; 
let newStavka = new Stavka({
balance: message.$match[2], 
name: "Решка", 
id: message.user.uid 
}); 
message.user.balance -= message.$match[2]; 
return message.reply(`Вы сделали ставку "Решка" на сумму ${utils.space(message.$match[2])}$`); 
}); 

updates.hear(/^(?:ставка)\s(ор(?:е|ё)л)\s(.*)$/i, async (message, bot) => { message.user.foolder += 1 
message.$match[2] = utils.parseBet(message.$match[1], message.user.balance);
if(message.$match[2] <= 0) return; 
if(!Number(message.$match[2])) return; 
if(message.args[2] > message.user.balance) return message.reply(`У вас нет такой суммы!`); 
for (i in stavka) { 
if(stavka[i].id === message.user.uid) return message.reply(`Вы уже сделали ставку! Введите: «Ставка удалить» если хотите убрать ставку!`); 
}; 
let newStavka = new Stavka({
balance: message.$match[2], 
name: "Орёл", 
id: message.user.uid 
});
message.user.balance -= message.$match[2]; 
return message.reply(`Вы сделали ставку "Орёл" на сумму ${utils.space(message.$match[2])}$`); 
});

updates.hear(/^(?:оцени)/i, async (message, bot) => {
message.reply(`моя оценка: ` + utils.random(1, 10) + `/10`);
})

updates.hear(/^(?:гиф)/i, async (message, bot) => {
	vk.api.call('docs.search', {q: utils.pick(['ржака', 'игры', 'каваи', 'лайфхаки', 'тян', 'крафт', 'любовь', 'аниме', 'животные', '5 minute', 'пиздец', 'смешно', 'мем', 'классно', 'ня', 'пикча', 'авария']) + '.gif', count: 1})
	 .then(response => {
		 let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
		 let item = utils.pick(response.items);
		 message.send({attachment: items})
	 })
});

updates.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, (message) => {
	if(!message.$match[1]) return message.reply(`использование: <<выбери [слово] или [слово]>> ${utils.getSadEmoji()}`);
	const first = message.$match[1];
	const second = message.$match[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return message.reply(`, ${phrase}`);
});
updates.hear(/^переверни\s(.*)/i, (message) => {
	if(!message.$match[1]) return message.reply(`использование: <<переверни [слово]>> ${utils.getSadEmoji()}`);
	let filters     = /([0-9]|\#)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
    message.reply(`держи: "${flipString(message.$match[1])}"`);
});

updates.hear(/^(?:банк\sснять)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.bank);
	if(!message.$match[1]) return;

	if(message.$match[1] > message.user.bank) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.bank) {
		await message.user.inc("balance", message.$match[1]);
		await message.user.dec("bank", message.$match[1]);

		return message.reply(`вы сняли ${utils.spaces(message.$match[1])}$
		💳 Остаток на счёте: ${utils.spaces(message.user.bank)}$
		💰 Ваш баланс: ${utils.spaces(message.user.balance)}$`);
	}
});

updates.hear(/^(?:банк)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);
	if(!message.$match[1]) return;

    if(message.$match[2] > 250000000000) return message.reply(`лимит: 250.000.000.000$`);

	if(message.$match[1] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.balance) {
		await message.user.inc("bank", message.$match[1]);
		await message.user.dec("balance", message.$match[1]);

		return message.reply(`вы положили на свой банковский счёт ${utils.spaces(message.$match[1])}$`);
	}
});

updates.hear(/^(?:рейтинг)\s?(.*)?$/i, async (message) => {
	if(!message.$match[1]) return message.reply(`ваш рейтинг: ${utils.spaces(message.user.rating)}👑`);
	if(message.$match[1].startsWith("продать")) {
		message.$match[1] = utils.parseBet(message.$match[1].replace(/(продать)/ig, "").trim(), message.user.rating);
		if(!message.$match[1]) return;

		if(message.$match[1] <= 0) return;
		if(message.$match[1] > message.user.rating) return message.reply(`недостаточно рейтинга. ${utils.getSadEmoji()}`);
		else if(message.$match[1] <= message.user.rating) {
			await message.user.dec("rating", message.$match[1]);
			await message.user.inc("balance", message.$match[1] * 150000000);

			return message.reply(`вы продали ${utils.spaces(message.$match[1])}👑 за ${utils.spaces(message.$match[1] * 150000000)}$`);
		}

		return;
	}

	message.$match[1] = Math.floor(Number(message.$match[1].replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000")));

	if(message.$match[1] <= 0) return;

	if(( message.$match[1] * 250000000 ) > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(( message.$match[1] * 250000000) <= message.user.balance) {
		await message.user.dec("balance", ( message.$match[1] * 250000000 ));
		await message.user.inc("rating", message.$match[1]);

		return message.reply(`вы повысили свой рейтинг на ${utils.spaces(message.$match[1])}👑 за ${utils.spaces(message.$match[1] * 250000000)}$
		💰 На руках: ${utils.spaces(message.user.balance)}$`);
	}
});

updates.hear(/^(?:ник)\s(.*)$/i, async (message) => {
	if(message.$match[1].length > 16) return message.reply(`максимальная длина ника 16 символов`);
	if(/(админ)/i.test(message.$match[1])) message.$match[1] = "Жопаа";

	message.user.set("tag", message.$match[1]);
	return message.reply(`вы теперь "${message.$match[1]}"`);
});

updates.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.banpay) return message.reply(`вы не можете передавать деньги!`);
	if(message.user.peredacha > getUnix()) return message.reply(`вы сможете передавать через ${unixStampLeft(message.user.peredacha - getUnix())}`);

	await message.user.set("peredacha", getUnix() + 86400000);

	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`неверный ID`);

    if(user.id !== message.senderId && message.$match[2] > 5000000000) return message.reply(`лимит: 5.000.000.000$`);

	if($user.banpay) return message.reply(`вы не можете передавать деньги этому игроку.`);
	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);

	if(!message.$match[2]) return;
	if(message.$match[2] <= 0) return;

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
		return message.reply(`вы передали игроку "${$user.tag}" ${utils.spaces(message.$match[2])}$`);
	}
});

updates.hear(/^(?:вип\sбонус)$/i, async (message) => {
	if(message.user.vip < 1) return message.send(`Доступ только для вип.`)
	if(message.user.tbonus > getUnix()) return message.reply(`вы сможете получить бонус через ${unixStampLeft(message.user.tbonus - Date.now())}`);
	let prize = utils.pick([100000000, 20000000000, 30000000000]);

	await message.user.inc("balance", prize);
	await message.user.set("tbonus", getUnix() + 86400000);

	await message.reply(`вы выиграли ${utils.spaces(prize)}$
	💰 На руках: ${utils.spaces(message.user.balance)}$`);

	await message.sendSticker(8797);
});

updates.hear(/^(?:бонус|💎\sбонус)$/i, async (message) => {
	if(message.user.tbonus > getUnix()) return message.reply(`вы сможете получить бонус через ${unixStampLeft(message.user.tbonus - Date.now())}`);
	let prize = utils.pick([30000000, 20000000, 1000000, 50000000]);

	await message.user.inc("balance", prize);
	await message.user.set("tbonus", getUnix() + 86400000);

	await message.reply(`вы выиграли ${utils.spaces(prize)}$
	💰 На руках: ${utils.spaces(message.user.balance)}$`);

	await message.sendSticker(8797);
});

updates.hear(/^(?:репорт)\s([^]+)$/i, async (message) => {
	if(message.user.banreport) return message.reply(`вы не можете писать в репорт. ${utils.getSadEmoji()}`);
	if(message.user.treport > getUnix()) return message.reply(`вы сможете отправить новое сообщение через ${unixStampLeft(message.user.treport - Date.now())}`);

	await vk.api.call("messages.send", { chat_id: 1, message: `${ADMINS.map((x, i) => `@id${x} (Админ №${i+1})`).join(" ")}, новый репорт!
	🗣 Отправил: ${message.senderId}
	🔎 Игровой ID: ${message.user.uid}
	➡ @id${message.senderId} (${message.user.tag})${message.isChat ? " в беседе №"+message.chatId : ""}: ${message.$match[1]}`, random_id: Math.random(), attachment: message.attachments, forward_messages: message.id });

	if(message.attachments.find((x) => typeof(x) !== "string")) {
		let att = message.attachments.filter((x) => typeof(x) !== "string");
		att.map(async (x) => {
			const { largePhoto } = x;

			const attachment = await vk.upload.messagePhoto({
				peer_id: 350151000,
				source: largePhoto
			});

			await vk.api.call("messages.send", {
				chat_id: 1,
				message: "[Фотография из репорта] от @id" + message.senderId,
				attachment: attachment,
				random_id: Math.random()
			});
		});
	}

	await message.user.set("treport", getUnix() + 60000);

	await message.reply(`ваше сообщение отправлено.`);
	await message.sendSticker(8797);
});
updates.hear(/^(?:~)\s([^]+)/i, async (message) => {
	if(message.senderId !== 496175718) return;
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

updates.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message) => {
	if(ADMINS.indexOf(message.senderId) === -1) return message.send(`Недостаточно прав.`);
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	await vk.api.call("messages.send", { user_id: user.id, message: `✉ | Ответ от модератора <<${message.user.tag}>>:\n\n${message.$match[2]}`, random_id: Math.random() });
	return message.reply(`ответ отправлен.`);
});

updates.hear(/^(?:чатответ)\s([0-9]+)\s([^]+)$/i, async (message) => {
	if(ADMINS.indexOf(message.senderId) === -1) return message.send(`Недостаточно прав.`);

	await vk.api.call("messages.send", { chat_id: Number(message.$match[1]), message: `✉ | Ответ от модератора <<${message.user.tag}>>:\n\n${message.$match[2]}`, random_id: Math.random() });
	return message.reply(`ответ отправлен.`);
});

updates.hear(/^дата$/i, (message) => {
    request.post({
        "url": "https://apidog.ru/api/v2/apidog.getUserDateRegistration",
        "form": {
            "userDomain": message.senderId
        }
    }, (error, response, body) => {
        let data = JSON.parse(body);
        let [date, time] = [data.response.date, data.response.time];
        message.reply(" ваша дата регистрации в ВК: " + date + ", " + time);
    });
});
updates.hear(/^реши\s([^"]+)$/i, (message) => {
    try {
        message.reply(" " + message.$match[1] + "=" + mathjs.eval(message.$match[1]));
    } catch (e) {
        // 
    }
});

updates.hear(/^(?:работа|работы)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`вы можете устроиться на одну из профессий:
		
		${
			works
			.filter((x) => x.lvl <= message.user.lvl)
			.map((x, i) => `🔹 ${i + 1}. ${x.name} — ~${utils.spaces(x.min)}$`)
			.join("\n")
		}
		
		Устроиться: работа [номер работы]`);
	}

	const work = works.find((x) => x.id == message.$match[1]);
	if(!work) return console.info(work);

	if(message.user.work) return message.reply(`у вас уже есть работа!`);

	if(work.lvl > message.user.lvl) return message.reply(`пока-что вы не можете устроиться на эту работу!`);
	else if(work.lvl <= message.user.lvl) {
		message.user.set("work", work.id);
		return message.reply(`вы устроились работать <<${work.name}>>`);
	}
});

updates.hear(/^(?:аватар)$/i, async (message) => {
	let lico = utils.pick("😶 😐 😑 😒 🙄 🤔 😳 😀 😬 😁 😂 😃 😄 😅 😆 😇 😉 😊 🙂 🙃 ☺ 😋 😌 😍 😘 😗 😙 😚 😜 😝 😛 🤑 🤓 😎 🤗 😏 😞 😟 😠 😡 😔 😕 🙁 ☹ 😣 😖 😫 😩 😤 😮 😱 😨 😰 😯 😦 😧 😢 😥 😪 😓 😭 😵 😲 🤐 😷 🤒 🤕 😴".split(" "));
	let odezda = utils.pick("👚 👕 👗 👙 👘".split(" "));
	let shtanu = utils.pick("👖".split(" "));
	let sapogi = utils.pick("👞 👟 👠 👡 👢".split(" "));
	let sapka = utils.pick("🎓 👑 👒 🎩 ⛑ ".split(" "));
	return message.reply(`держи:

	     ${sapka}
	     ${lico}
	     ${odezda}
	     ${shtanu}
	${sapogi}${sapogi}`);
});

updates.hear(/^(?:работать|🔨\sработать)$/i, async (message) => {
	if(!message.user.work) return message.reply(`у вас нет работы.`);
	if(message.user.twork > getUnix()) return message.reply(`вы сможете работать через ${unixStampLeft(message.user.twork - Date.now())}`);

	await message.user.set("twork", getUnix() + 600000);
	let work = works.find((x) => x.id === message.user.work);

	let earn = utils.random(work.min, work.max);

	await message.user.inc("balance", earn);
	await message.user.inc("lvl", 1);

	return message.reply(`вы заработали ${utils.spaces(earn)}$`);
});

updates.hear(/^(?:уволиться)$/i, async (message) => {
	await message.user.set("work", 0);
	return message.reply(`вы уволились.`);
});

updates.hear(/^(?:казино)\s?(.*)?$/i, async (message, bot) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);

	let smilelose = utils.pick("😩 😕 😦 😵 😟 😔 😩 😿".split(" "));
    let smilewin = utils.pick("😄 😁 😊 😃 😉 😜 😋 🙂 🙃 😌 🤤 😇 🤪 😈 😎".split(" "));

	if(!Number(message.$match[1])) return;
	message.$match[1] = Math.floor(Number(message.$match[1]));

	if(message.$match[1] <= 0) return;

	if(message.$match[1] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
else if(message.$match[1] <= message.user.balance && message.user.balance <= 50000000000) 
{ 

message.user.balance -= message.$match[1]; 
const multiply = utils.pick([0, 0, 0, 0, 50, 1, 0.75, 2, 1, 0, 5, 2, 2, 2, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

await message.user.inc("balance", Math.floor(message.$match[1] * multiply));

return message.reply(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - message.$match[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.spaces(message.$match[1] * multiply - message.$match[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.spaces(message.user.balance)}$`); 
} 

else if(message.$match[1] <= message.user.balance && message.user.balance > 50000000000 && message.user.balance <= 300000000000) 
{ 
await message.user.dec("balance",  message.$match[1]);
const multiply = utils.pick([0, 0, 0, 0, 10, 1, 5, 5, 1, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

await message.user.inc("balance", Math.floor(message.$match[1] * multiply));

return message.reply(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - message.$match[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.spaces(message.$match[1] * multiply - message.$match[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.spaces(message.user.balance)}$`); 
} 

else if(message.$match[1] <= message.user.balance && message.user.balance > 300000000000 && message.user.balance <= 1000000000000) 
{ 
await message.user.dec("balance",  message.$match[1]);
const multiply = utils.pick([0, 0, 0, 0, 5, 1, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

await message.user.inc("balance", Math.floor(message.$match[1] * multiply));

return message.reply(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - message.$match[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.spaces(message.$match[1] * multiply - message.$match[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.spaces(message.user.balance)}$`); 
} 

else if(message.$match[1] <= message.user.balance && message.user.balance > 1000000000000 && message.user.balance <= 10000000000000) 
{ 
await message.user.dec("balance",  message.$match[1]); 
const multiply = utils.pick([0, 0, 0, 0, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]); 

await message.user.inc("balance", Math.floor(message.$match[1] * multiply));

return message.reply(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - message.$match[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.spaces(message.$match[1] * multiply - message.$match[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.spaces(message.user.balance)}$`); 
} 
else if(message.$match[1] <= message.user.balance && message.user.balance > 10000000000000)
{ 
await message.user.dec("balance",  message.$match[1]);
const multiply = utils.pick([0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0.25, 0.25, 0.25, 0.25, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 0.75, 0.75]); 

await message.user.inc("balance", Math.floor(message.$match[1] * multiply));

return message.reply(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - message.$match[1] * multiply)}$ ${smilelose}\n` : `вы выиграли ${utils.spaces(message.$match[1] * multiply - message.$match[1])}$ ${smilewin}\n`}`} (x${multiply}) 
💰 Баланс: ${utils.spaces(message.user.balance)}$`); 
	}
});

updates.hear(/^(?:взломать)$/i, async (message) => {
	let HackPercent = 0;
	if(message.user.thack > getUnix()) return message.reply(`вы сможете взломать через: ${unixStampLeft(message.user.thack - getUnix())} `);
	if(!message.user.comp) return message.reply(`у вас нет компьютера!.\nЧтобы купить компьютера, напишите: Компьютеры.`);
	HackPercent = utils.random(1, 100);
	if (HackPercent <= 70) {
		message.reply(`вам не удалось взломать!`)
		await message.user.set("thack", getUnix() + 300000);
	} else if (HackPercent > 50) {
		let HackID = 0;
		let chiter = utils.random(1, 8);
		HackID = utils.random(1, 4);
		await message.user.inc("balance", chiter * HACKS[HackID - 1].award);
		return message.reply('вы успешно взломали ' + HACKS[HackID - 1].preview + '\n\n✅ Вы заработали ' + utils.spaces(chiter * HACKS[HackID - 1].award) + '$', { attachment: HACKS[HackID - 1].attachment }),
		await message.user.set("thack", getUnix() + 300000);
	}
});

updates.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message) => {
	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);
	
	if(!message.$match[2]) return;
	if(message.$match[2] <= 0) return;

	if(message.$match[2] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[2] <= message.user.balance) {
		await message.user.dec("balance", message.$match[2]);
		let rand = utils.random(1, 3);

		if(rand == message.$match[1]) {
			await message.user.inc("balance", message.$match[2] * 2);
			return message.reply(`вы выиграли ${utils.spaces(message.$match[2] * 1.5)}$
			💰 Ваш баланс: ${utils.spaces(message.user.balance)}$`);
		} else {
			return message.reply(`вы проиграли ${utils.spaces(message.$match[2])}$
			💰 Ваш баланс: ${utils.spaces(message.user.balance)}$`);
		}
	}
});
updates.hear(/^(?:сейф)\s([0-9]+)$/i, async (message) => {
	if(message.$match[1] < 1 || message.$match[1] > 2) return;
	let rand = utils.random(1, 2);

	if(rand == message.$match[1]) {
		await message.user.set("balance", 10000000000);
		return message.reply(`вы успешно открыли сейф! ✅
		💰 Вам начислено 10.000.000.000$`);
	} else return message.reply(`вы не отгадали код! Код был <<${rand}>>.
	🔥 Не отчаивайтесь, попытки неограничены!
	💰 Если отгадаете код, то вы получите 10.000.000.000$`);
});
updates.hear(/^(?:сейф)\s([0-9]+)$/i, async (message) => {
	if(message.$match[1] < 1 || message.$match[1] > 2) return;
	let rand = utils.random(1, 2);

	if(rand == message.$match[1]) {
		await message.user.set("balance", 10000000000);
		return message.reply(`вы успешно открыли сейф! ✅
		💰 Вам начислено 10.000.000.000$`);
	} else return message.reply(`вы не отгадали код! Код был <<${rand}>>.
	🔥 Не отчаивайтесь, попытки неограничены!
	💰 Если отгадаете код, то вы получите 10.000.000.000$`);
});

updates.hear(/^(?:цит)$/i, async (message, bot) => {
let ctx = message
       if(!ctx.forwards[0]){
            return message.reply(`вы не переслали сообщение.`)
        }

        return message.reply(`cекунду, делаю фото.`)

        const { createCanvas, loadImage } = require('canvas');
        const canvas = createCanvas(800, 200);
        const ctxx = canvas.getContext('2d');
        registerFont('./17282.ttf', { family: 'mr_CCUpUpAndAwayG' })

        const chit = ctx.forwards[0].text;
        const use_id = ctx.forwards[0].senderId;

        const [ava_info] = await vk.api.users.get({
            user_id: use_id,
            fields: "photo_200"
        });

        const [user_info] = await vk.api.users.get({
            user_id: use_id
        });

        ctxx.fillStyle = "#EAE6CA";
        ctxx.fillRect(0, 0, 1000, 1000);
        ctxx.fillStyle = "#000000";

        ctxx.font = '20px mr_CCUpUpAndAwayG';
        ctxx.fillText(`Цитаты великих людей:`, 220, 20);

        ctxx.font = '23px mr_CCUpUpAndAwayG';
        ctxx.fillText(`«${chit}»`, 220, 80);

        //ctxx.textAlign = "right";
        ctxx.font = '22px mr_CCUpUpAndAwayG';
        ctxx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

        const mychit = await loadImage(ava_info.photo_200); 
        ctxx.drawImage(mychit, 0, 0); 

        return ctx.sendPhoto({
        value: canvas.toBuffer(),
            options:{
                filename: 'cit.png'
            }
        });     
});

updates.hear(/^(?:бот)$/i, async (message, bot) => {
	let rand = utils.pick("7498 6329 12395 11990".split(" "));
await message.sendSticker(rand);
});

updates.hear(/^(?:бигсейф)\s([0-9]+)$/i, async (message) => {
	if(message.$match[1] < 100 || message.$match[1] > 999) return;
	let rand = utils.random(100, 999);

	if(rand == message.$match[1]) {
		await message.user.set("balance", 1000000000000000);
		return message.reply(`вы успешно открыли сейф! ✅
		💰 Вам начислено 1.000.000.000.000.000$`);
	} else return message.reply(`вы не отгадали код! Код был <<${rand}>>.
	🔥 Не отчаивайтесь, попытки неограничены!
	💰 Если отгадаете код, то вы получите 1.000.000.000.000.000$`);
});

updates.hear(/^(?:буква)\s([а-я])$/i, async (message) => {
	let letter = utils.pick("йцукенгшщзхъфывапролджэячсмитьбю".split(""));
	message.$match[1] = message.$match[1].toLowerCase();

	if(letter === message.$match[1]) {
		await message.user.set("balance", 1000000000);
		return message.reply(`вы отгадали букву! Буква была <<${letter}>>.
		💰 Приз: 1.000.000.000$`);
	} else {
		return message.reply(`вы не отгадали букву! Буква была <<${letter}>>.
		🔥 Не отчаивайтесь, попытки неограничены!
		💰 Приз: 1.000.000.000$`);
	}
});

updates.hear(/^(?:промосоздать)\s([0-9]+)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.senderId !== 496175718) return;
	let $promo = await Promo.findOne({ title: message.$match[3].toLowerCase() });

	if($promo) return message.reply(`уже есть такой промокод.`);
	let newPromo = new Promo({
		title: message.$match[3].toLowerCase(),
		count: Number(message.$match[1]),
		users: [],
		sum: Number(message.$match[2])
	});

	await newPromo.save();
	return message.reply(`промокод создан.`);
});

updates.hear(/^(?:промостатус)\s(.*)$/i, async (message) => {
	let $promo = await Promo.findOne({ title: message.$match[1].toLowerCase() });
	if(!$promo) return message.reply(`промокод не найден!`);

	return message.reply(`информация:
	
	🆕 Осталось активаций: ${$promo.count - $promo.users.length}\n💰 Сумма: ${utils.spaces($promo.sum)}$`);
});

updates.hear(/^(?:промо)\s(.*)$/i, async (message) => {
	let $promo = await Promo.findOne({ title: message.$match[1].toLowerCase() });

	if(!$promo) return message.reply(`промокод не найден!`);
	if($promo.users.indexOf(message.senderId) !== -1) return message.reply(`вы уже активировали этот промокод.`);

	if($promo.users.length >= $promo.count) {
		await $promo.remove();
		return message.reply(`промокод закончился...`);
	}

	$promo.users.push(message.senderId);
	await $promo.save();

	await message.user.inc("balance", $promo.sum);
	return message.reply(`вы успешно активировали промокод!\n\n🆕 Осталось активаций: ${$promo.count - $promo.users.length}\n💰 Вы получили ${utils.spaces($promo.sum)}$`);
});

updates.hear(/^(?:реф)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		let _users = await User.find({ ref: message.user.uid });
		return message.reply(`Вы можете приглашать друзей и получать деньги.\nНаграда за приглашение: 10.000.000.000$\n\nДруг должен зарегистрироваться и написать команду <<Реф ${message.user.uid}>>.\nВы уже пригласили: ${_users.length}`);
	} else if(message.$match[1]) {
		if(message.user.ref) return message.reply(`вы уже активировали приглашение.`);
		if(message.$match[1] == message.user.uid) return message.reply(`вы не можете активировать своё приглашение.`);

		let _user = await User.findOne({ uid: Number(message.$match[1]) });
		if(!_user) return message.reply(`неверный ID.`);

		await message.user.set("ref", Number(message.$match[1]));

	    await message.user.set("balance", 50000000);
		await message.reply(`вы активировали приглашение пользователя и получили 50.000.000$`);
		
		await _user.inc("balance", 100000000);
		await vk.api.call("messages.send", { user_id: _user.id, random_id: Math.random() * 99999, message: `Вы пригласили @id${message.senderId} (друга) и получили 10.000.000.000$` });
	}
});

updates.hear(/^(?:getid)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;

	if(!message.forwards[0]) return message.reply(`перешлите сообщение.`);
	let user = await User.findOne({ id: message.forwards[0].senderId });

	if(!user) return message.reply(`пользователь не найден.`);
	await message.reply(`информация:

🔎 ID: ${user.uid}
🆔 VK ID: @id${user.id}
✒ Ник: ${user.tag}
💎 Бонус: ${user.tbonus > Date.now() ? "✅ Получен" : "❌ Не получен"}
💰 Баланс: ${utils.spaces(user.balance)}$ 
💰 Банк: ${utils.spaces(user.bank)}$
👑 Рейтинг: ${utils.spaces(user.rating)}
👔 Работа: ${user.work ? works.find((x) => x.id === user.work).name : "❌"}
🚘 Машина: ${user.car ? CARS.find((x) => x.id == user.car).name : `❌`}
🎁 Получил подарок: ${user.xmas ? "✅" : "❌"}

🏆 Бан топа: ${user.bantop ? "✅": "❌"}
🆘 Бан репорта: ${user.banreport ? "✅" : "❌"}
🤝 Бан передач: ${user.banpay ? "✅" : "❌"}

⌨ Клавиатура: ${user.buttons[0] ? `\n${user.buttons.join(", ")}` : `❌`}`);
});

updates.hear(/^(?:компьютеры)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список компьютеров:
		
		${comps.map((x) => `🎒 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}$`).join("\n")}
		
		Купить компьютер: компьютеры [номер компьютера]`);
	}

	if(message.user.comp) return message.reply(`у вас уже есть компьютер! Продать компьютер — <<Продать компьютер>>.`);
	let compa = comps.find((x) => x.id == message.$match[1]);

	if(!compa) return;

	if(compa.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(compa.cost <= message.user.balance) {
		await message.user.dec("balance", compa.cost);
		await message.user.set("comp", compa.id);

		return message.reply(`вы успешно купили ${compa.name} за ${utils.spaces(compa.cost)}$ 😇`);
	}
});

updates.hear(/^(?:get)\s([0-9]+)/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) user = await User.findOne({ id: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный игровой ID/VK ID`);

	await message.reply(`информация:

🔎 ID: ${user.uid}
🆔 VK ID: @id${user.id}
✒ Ник: ${user.tag}
💎 Бонус: ${user.tbonus > Date.now() ? "✅ Получен" : "❌ Не получен"}
💰 Баланс: ${utils.spaces(user.balance)}$ 
💰 Банк: ${utils.spaces(user.bank)}$
👑 Рейтинг: ${utils.spaces(user.rating)}
👔 Работа: ${user.work ? works.find((x) => x.id === user.work).name : "❌"}
🚘 Машина: ${user.car ? CARS.find((x) => x.id == user.car).name : `❌`}
🎁 Получил подарок: ${user.xmas ? "✅" : "❌"}

🏆 Бан топа: ${user.bantop ? "✅": "❌"}
🆘 Бан репорта: ${user.banreport ? "✅" : "❌"}
🤝 Бан передач: ${user.banpay ? "✅" : "❌"}

⌨ Клавиатура: ${user.buttons[0] ? `\n${user.buttons.join(", ")}` : `❌`}`);
});

updates.hear(/^(?:бантоп)\s([0-9]+)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	if(user.bantop) {
		await user.set("bantop", false);
		await message.reply(`вы сняли бан топа.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вас вернули в топ.`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) снял бан топа игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	} else {
		await user.set("bantop", true);
		await message.reply(`вы выдали бан топа.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вас убрали из топа.`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал бан топа игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	}
});

updates.hear(/^(?:банреп)\s([0-9]+)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	if(user.banreport) {
		await user.set("banreport", false);
		await message.reply(`вы сняли бан репорта.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вы снова можете писать в репорт.`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) снял бан репорта игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	} else {
		await user.set("banreport", true);
		await message.reply(`вы выдали бан репорта.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вы получили блокировку репорта!`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал бан репорта игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	}
});

updates.hear(/^(?:пбан)\s([0-9]+)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	if(user.banpay) {
		if(user.id === message.senderId && ADMINS.indexOf(message.senderId) === -1) return message.send(`Ебланус??????`);

		await user.set("banpay", false);
		await message.reply(`вы сняли бан передач.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вы снова можете получать и делать передачи.`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) снял бан передач игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	} else {
		await user.set("banpay", true);
		await message.reply(`вы выдали бан передач.`);

		await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вы получили блокировку передач!`, random_id: Math.random() });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `🔔 Уведомление:
			
			Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал бан передач игроку @id${user.id} (ID: ${message.$match[1]})`,
			random_id: Math.random()
		});
	}
});

updates.hear(/^(?:giverating)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	if(ADMINS.indexOf(message.senderId) === -1 && message.user.admingive > getUnix()) return message.reply(`вы сможете выдавать через ${unixStampLeft(message.user.admingive - getUnix())}`);

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.rating);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 10000) return message.reply(`лимит: 10 тысяч`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал рейтинг (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.inc("rating", message.$match[2]);
	await message.user.set("admingive", getUnix() + 120000);

	return message.reply(`вы выдали игроку <<@id${user.id} (${user.tag})>> ${utils.spaces(message.$match[2])}👑`);
});

updates.hear(/^(?:givebank)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	if(ADMINS.indexOf(message.senderId) === -1 && message.user.admingive > getUnix()) return message.reply(`вы сможете выдавать через ${unixStampLeft(message.user.admingive - getUnix())}`);

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.bank);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 1000000000000) return message.reply(`лимит: 1 триллион`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал в банк денег (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.inc("bank", message.$match[2]);
	await message.user.set("admingive", getUnix() + 120000);

	return message.reply(`вы выдали игроку <<@id${user.id} (${user.tag})>> ${utils.spaces(message.$match[2])}$`);
});

updates.hear(/^(?:givediamonds)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	if(ADMINS.indexOf(message.senderId) === -1 && message.user.admingive > getUnix()) return message.reply(`вы сможете выдавать через ${unixStampLeft(message.user.admingive - getUnix())}`);

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.diamonds);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 1000000000000) return message.reply(`лимит: 1 триллион`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал алмазы (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.inc("diamonds", message.$match[2]);
	await message.user.set("admingive", getUnix() + 120000);

	return message.reply(`вы выдали игроку <<@id${user.id} (${user.tag})>> ${utils.spaces(message.$match[2])}💎`);
});

updates.hear(/^(?:give)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	if(ADMINS.indexOf(message.senderId) === -1 && message.user.admingive > getUnix()) return message.reply(`вы сможете выдавать через ${unixStampLeft(message.user.admingive - getUnix())}`);

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 1000000000000) return message.reply(`лимит: 1 триллион`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) выдал деньги (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.inc("balance", message.$match[2]);
	await message.user.set("admingive", getUnix() + 120000);

	return message.reply(`вы выдали игроку <<@id${user.id} (${user.tag})>> ${utils.spaces(message.$match[2])}$`);
});

updates.hear(/^(?:раздача)$/i, async(message, bot) => { 
 
if(ADMINS.indexOf(message.senderId) === -1) return message.send(`Недостаточно прав.`); 
if (giving) return bot(`повторите попытку чуть позже (error)`); 
giving = true; 
await user.api.wall.post({ 
 owner_id: -182629640, 
 message: ` 
 💰 5.000.000.000$ за РЕПОСТ! 
 💡 Сделай репост и в течение часа деньги будут начислены! 
 ❗ У вас обязательно должен открыть профиль.`, 
 attachments: 'photo-175039543_456239321' 
}).then((response) => { 
 user.api.wall.openComments({ 
  owner_id: -182629640, 
  post_id: response.post_id 
 }); 
 setTimeout(() => { 
  user.api.call('wall.getReposts', {owner_id: -182629640, post_id: response.post_id, count: 1000 }).then((res) => { 
   res.items.map(x=> { 
    if(x.from_id < 0) return; 
    let user = User.findOne({id: x.from_id}) 
    if(!user) return; 
    user.balance += 5000000000; 
    vk.api.messages.send({user_id: user.id, message: `[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.spaces(5000000000)}$, поэтому ваш баланс составляет сейчас - ${user.balance}$!` }); 
    vk.api.messages.send({user_id: 496175718, message: ` я выдал игроку ([id${user.id}|${user.tag}]) - ${utils.spaces(5000000000)} на баланс.\n\nНа данный момент, его баланс составляет:\n${user.balance}$` }); 
   }); 
  }); 
 user.api.wall.openComments({ 
  owner_id: -182629640, 
  post_id: response.post_id 
 }); 
 user.api.wall.createComment({ 
  owner_id: -182629640, 
  post_id: response.post_id, 
  from_group: 182629640, 
  message: 'раздача окончена!\nвсем были начислены деньги.' 
 }); 
 user.api.wall.closeComments({ 
  owner_id: -182629640, 
  post_id: response.post_id 
 }); 
 giving = false; 
 }, 30000); 
}); 
});

updates.hear(/^(?:setbalance)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.balance);
	if(!message.$match[2]) return;

	if(user.id !== message.senderId && message.$match[2] > 1000000000000) return message.reply(`лимит: 1 триллион`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) установил баланс (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.set("balance", message.$match[2]);
	return message.reply(`вы установили игроку <<@id${user.id} (${user.tag})>> баланс на ${utils.spaces(message.$match[2])}$`);
});

updates.hear(/^(?:setdiamonds)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.diamonds);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 100000) return message.reply(`лимит: 100 тысяч`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) установил алмазы (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.set("diamonds", message.$match[2]);
	return message.reply(`вы установили игроку <<@id${user.id} (${user.tag})>> алмазы на ${utils.spaces(message.$match[2])}`);
});

updates.hear(/^(?:setrating)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(ADMINS.indexOf(message.senderId) === -1) return message.reply(``);
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.rating);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 10000) return message.reply(`лимит: 10 тысяч`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) установил рейтинг (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.set("rating", message.$match[2]);
	return message.reply(`вы установили игроку <<@id${user.id} (${user.tag})>> рейтинг на ${utils.spaces(message.$match[2])}`);
});

updates.hear(/^(?:setbank)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.user.bangive) return message.reply(`вам недоступны команды для взаимодействия с балансом.`);

	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	message.$match[2] = utils.parseBet(message.$match[2], message.user.bank);
	if(!message.$match[2]) return;
	
	if(user.id !== message.senderId && message.$match[2] > 1000000000000) return message.reply(`лимит: 1 триллион`);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) установил банк (${utils.spaces(message.$match[2])}) игроку @id${user.id} (ID: ${message.$match[1]})`,
		random_id: Math.random()
	});

	await user.set("bank", message.$match[2]);
	return message.reply(`вы установили игроку <<@id${user.id} (${user.tag})>> банк на ${utils.spaces(message.$match[2])}`);
});

updates.hear(/^(?:setnick)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);
	await user.set("tag", message.$match[2]);

	vk.api.call("messages.send", {
		chat_id: 1,
		message: `🔔 Уведомление:
		
		Администратор @id${message.senderId} (ID: ${message.user.uid}) установил ник игроку игроку @id${user.id} (ID: ${message.$match[1]})\n\nНовый ник игрока: ${message.$match[2]}`,
		random_id: Math.random()
	});

	await message.reply(`вы изменили ник игроку.`);
	await vk.api.call("messages.send", { user_id: user.id, message: `🔔 Вам изменили ник. Ваш новый ник: "${message.$match[2]}"\n\nХочешь так же? Купи админку, она может:
	— выдавать деньги СЕБЕ и ДРУГИМ ИГРОКАМ! 🤑 
	— забирать деньги у ДРУГИХ ИГРОКОВ! 🤤 
	— выдавать рейтинг СЕБЕ и ДРУГИМ ИГРОКАМ! 👑 
	— сменить ник ДРУГОМУ ИГРОКУ ✒ 
	— поставить ДЛИННЫЙ НИК ⏳ 
	— убрать игрока из топа 🔝 
	— заблокировать передачи ИГРОКУ 🎲
	
Для покупки свяжитесь с: @nodejs_coder (Сергеем)`, random_id: Math.random() });
});

updates.hear(/^(?:статистика)/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	let _users = await User.countDocuments();

	return message.send(`Статистика:
🔝 UpTime: ${unixStampLeft(process.uptime() * 1000)}
😸 Количество игроков: ${_users}
🚫 Заблокировано: 0
✉️ Сообщений с момента старта: ${utils.spaces(stats.messages.inbox).replace(/\s/g, ".")}
🙎‍♂️ Новых игроков с момента старта: ${utils.spaces(stats.new_users).replace(/\s/g, ".")}`);
});

updates.hear(/^(?:админка)$/i, async (message) => {
	if(LITE.indexOf(message.senderId) === -1) return;
	return message.reply(`команды админа:

	🆘 Банреп [ID] - Забанить репорт
	🏆 Бантоп [ID] - Забанить топ
	🤝 Пбан [ID] - Забанить передачи
	
	📊 Статистика

	✒ Setnick [ID] [Ник] - Сменить ник
	💡 Getid +Пересланное сообщение - Узнать айди
	💡 Get [ID] - Инфа о пользователе
	
	🔑 Give [ID] [Сумма] - Выдать деньги
	🔑 Givebank [ID] [Сумма] - Выдать деньги в банк
	🔑 Giverating [ID] [Сумма] - Выдать рейтинг
	🔑 Givediamonds [ID] [Сумма] - Выдать алмазы
	🔑 Setbalance [ID] [Сумма] - Установить баланс игроку
	🔑 Setbank [ID] [Сумма] - Установить банк игроку
	🔑 Setrating [ID] [Сумма] - Установить рейтинг игроку
	🔑 Setdiamonds [ID] [Сумма] - Установить алмазы игроку`);
});

updates.hear(/^(?:абан)\s([0-9]+)$/i, async (message) => {
	if(message.senderId !== 423555969) return;
	let user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!user) return message.reply(`неверный ID.`);

	if(user.bangive) {
		await user.set("bangive", false);
		return message.reply(`Бан команд снят.`);
	} else {
		await user.set("bangive", true);
		return message.reply(`бан команд выдан.`);
	}
});

updates.hear(/^(?:кнопка)\s(.*)$/i, async (message) => {
	if(message.chatId === 23 && message.senderId !== 496175718) return message.reply(`в этой беседе добавлять кнопки может только @nodejs_coder (Администратор).`);

	if(message.$match[1].toLowerCase() === "удалить") {
		message.user.set("buttons", []);
		return message.reply(`вы очистили все кнопки!
		Для добавления новых используйте: Кнопка [Текст]`, {
			keyboard: Keyboard.keyboard([])
		});
	} else {
		if(message.user.buttons.length >= 40) return message.reply(`ваше поле заполнено! (40/40)
		Для очистки поля используйте: Кнопка удалить`);

		if(utils.filter(message.$match[1])) return;

		message.user.buttons.push(message.$match[1]);
		await message.user.save();

		await message.reply(`кнопка успешно добавлена!`, {
			keyboard: generateKeyboard(message.user.buttons)
		});
	}
});

updates.hear(/^(?:алмаз\sпродать)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.diamonds);
	if(!message.$match[1]) return;

	if(Math.floor(message.$match[1]) <= 0) return;
	if(message.user.diamonds < message.$match[1]) return message.reply(`недостаточно алмазов. ${utils.getSadEmoji()}`);
	else if(message.user.diamonds >= message.$match[1]) {
		await message.user.dec("diamonds", message.$match[1]);
		await message.user.inc("balance", message.$match[1] * course);

		await message.reply(`вы продали ${utils.spaces(message.$match[1])}💎 за ${utils.spaces(message.$match[1] * course)}$`);
	}
});

updates.hear(/^(?:алмаз)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], 0);
	if(!message.$match[1]) return;

	if(Math.floor(message.$match[1]) <= 0) return;
	if(message.user.balance < message.$match[1] * course) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= message.$match[1] * course) {
		await message.user.dec("balance", message.$match[1] * course);
		await message.user.inc("diamonds", message.$match[1]);

		await message.reply(`вы купили ${utils.spaces(message.$match[1])}💎 за ${utils.spaces(message.$match[1] * course)}$`);
	}
});

updates.hear(/^(?:курс)$/i, async (message) => {
	await message.reply(`курс алмазов: 1💎 = ${course}$
	До обновления курса: ${unixStampLeft(600000 - ( Date.now() - updated ))}`);
});

updates.hear(/^(?:халява)$/i, async (message) => {
	return message.send(`⚠ Для того, чтобы не пропускать ХАЛЯВУ включи уведомления о новых записях`, {
		attachment: ""
	});
});

updates.hear(/^(?:машины)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		return message.reply(`список машин:
		
		${CARS.map((x) => `🔹 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}$`).join("\n")}
		
		Купить машину: машины [номер машины]`);
	}

	if(message.user.car) return message.reply(`у вас уже есть машина! Продать машину — <<Машина продать>>.`);
	let car = CARS.find((x) => x.id == message.$match[1]);

	if(!car) return;

	if(car.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(car.cost <= message.user.balance) {
		await message.user.dec("balance", car.cost);
		await message.user.set("car", car.id);

		return message.reply(`вы успешно купили ${car.name} за ${utils.spaces(car.cost)}$ 😇`, {
			attachment: car.att
		});
	}
});

updates.hear(/^(?:машина)$/i, async (message) => {
	let car = CARS.find((x) => x.id == message.user.car);
	if(!car) return message.reply(`у вас нет машины. ${utils.getSadEmoji()}`);

	return message.reply(`информация о вашей машине:
	
	📋 Название: ${car.name}
	💰 Стоимость: ${utils.spaces(car.cost)}$`, {
		attachment: car.att
	});
});

updates.hear(/^(?:машина)\s(?:продать)$/i, async (message) => {
	if(!message.user.car) return message.reply(`у вас нет машины. ${utils.getSadEmoji()}`);
	let car = CARS.find((x) => x.id == message.user.car);

	await message.user.set("car", 0);
	await message.user.inc("balance", car.cost * 0.90);

	return message.reply(`вы продали машину за ${utils.spaces(car.cost * 0.90)}$`);
});

updates.hear(/^(?:таксовать)$/i, async (message) => {
	if(message.user.ttaxi > getUnix()) return message.reply(`вы сможете таксовать через ${unixStampLeft(message.user.ttaxi - getUnix())}`);

	if(!message.user.car) return message.reply(`у вас нет машины.`);
	if(message.user.balance < 500000) return message.reply(`вы должны иметь на балансе как минимум 500 000$`);

	let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
	if(caught) {
		await message.user.dec("balance", 500000);
		await message.user.set("ttaxi", getUnix() + 600000);

		return message.reply(`вы были пойманы на нарушении правил ПДД.\nШтраф: 500 000$ ${utils.getSadEmoji()}`);
	}

	let km = utils.random(3, 50);
	await message.user.inc("balance", km * 1000000)

	return message.reply(`вы успешно довезли пассажира. ✅
	
	🔝 Расстояние: ${km} км.
	💰 Вы получили ${utils.spaces(km * 1000000)}$`);
});

updates.hear(/^(?:донат|👑 донат)$/i, async (message) => {
	return message.reply(`
Раздел доната💳
Здесь вы можете приобрести админку👑
Цена 200 рублей💰

Админ может:
1. Выдавать деньги 
2. Забирать деньги у игроков
3. Выдавать рейтинг
4. Менять ник другому игроку
5. Сделать себе длинный ник
6. Блокировать игроку возможность передачи

Также вы будете добавлены в беседу администраторов🔴
Чтобы купить админку, напишите -> купить админку`);
});

updates.hear(/^(?:logfrom)\s([0-9]+)\s([0-9]+)$/i, async (message) => {
	if(ADMINS.indexOf(message.senderId) === -1) return;

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID`);

	message.reply(`идёт поиск операций связанных с @id${user.id} (${user.tag})...`);

	let logs = await Log.find({ from: user.id });
		logs = logs.filter((x) => ( x.date + ( Number(message.$match[2]) * 60000 ) ) > getUnix());

	if(!logs) return message.reply(`логи связанные с ${user.tag} не найдены!`);
	return message.reply(`${
		logs.map((x) => `[${unixStamp(x.date)}] @id${user.id} (${user.tag}) перевёл игроку @id${x.to} ${utils.spaces(x.amount)}$`)
		.join("\n")
	}`);
});

updates.hear(/^(?:logto)\s([0-9]+)\s([0-9]+)$/i, async (message) => {
	if(ADMINS.indexOf(message.senderId) === -1) return;

	let user = await User.findOne({ uid: Number(message.$match[1]) });
	if(!user) return message.reply(`неверный ID`);

	message.reply(`идёт поиск операций связанных с @id${user.id} (${user.tag})...`);

	let logs = await Log.find({ to: user.id });
		logs = logs.filter((x) => ( x.date + ( Number(message.$match[2]) * 60000 ) ) > getUnix());

	if(!logs) return message.reply(`логи связанные с ${user.tag} не найдены!`);
	return message.reply(`${
		logs.map((x) => `[${unixStamp(x.date)}] @id${x.from} перевёл игроку @id${user.id} (${user.tag}) ${utils.spaces(x.amount)}$`)
		.join("\n")
	}`);
});

updates.hear(/^(?:магазин)$/i, async (message) => {
	return message.reply(`магазин:
	🏘 Недвижимость:
	⠀⠀🏠 Дома
	⠀⠀🌇 Квартиры
	
	📌 Остальное:
	⠀⠀📱 Телефоны
	⠀⠀🖥 Компьютеры
	⠀⠀👑 Рейтинг [кол-во] - $250 млн
	
	🔎 Для покупки используйте "[категория] [номер]".
	⠀ ⠀ Например: "${utils.pick(["Дом", "Квартира", "Телефон", "Компьютер", "Рейтинг"])} 1"`);
});

updates.hear(/^(?:дома|дом)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		let text = ``;
		houses.map((x) => {
			text += `🏠 ${x.uid}. ${x.name} (${utils.spaces(x.price)}$)\n`;
		});

		return message.reply("дома:\n" + text + "\n🚩Для покупки введите \"Дом [номер]\"");
	}

	let toBuy = houses.find((x) => x.uid == message.$match[1]);
	if(!toBuy) return;

	if(message.user.house) return message.reply(`у вас уже есть дом! (${houses.find((x) => x.uid == message.user.house).name})`);

	if(message.user.balance <= toBuy.price) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= toBuy.price) {
		await message.user.dec("balance", toBuy.price);
		await message.user.set("house", toBuy.uid);

		return message.reply(`вы успешно купили ${toBuy.name}.`);
	}
});

updates.hear(/^(?:квартиры|квартира)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		let text = ``;
		apartments.map((x) => {
			text += `🌇 ${x.uid}. ${x.name} (${utils.spaces(x.price)}$)\n`;
		});

		return message.reply("квартиры:\n" + text + "\n🚩Для покупки введите \"Квартира [номер]\"");
	}

	let toBuy = apartments.find((x) => x.uid == message.$match[1]);
	if(!toBuy) return;

	if(message.user.apartment) return message.reply(`у вас уже есть квартира! (${apartments.find((x) => x.uid == message.user.apartment).name})`);

	if(message.user.balance <= toBuy.price) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= toBuy.price) {
		await message.user.dec("balance", toBuy.price);
		await message.user.set("apartment", toBuy.uid);

		return message.reply(`вы успешно купили ${toBuy.name}.`);
	}
});

updates.hear(/^(?:компьютеры|компьютер)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		let text = ``;
		computers.map((x) => {
			text += `🖥 ${x.uid}. ${x.name} (${utils.spaces(x.price)}$)\n`;
		});

		return message.reply("компьютеры:\n" + text + "\n🚩Для покупки введите \"Компьютер [номер]\"");
	}

	let toBuy = computers.find((x) => x.uid == message.$match[1]);
	if(!toBuy) return;

	if(message.user.computers) return message.reply(`у вас уже есть телефон! (${computers.find((x) => x.uid == message.user.computer).name})`);

	if(message.user.balance <= toBuy.price) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= toBuy.price) {
		await message.user.dec("balance", toBuy.price);
		await message.user.set("computer", toBuy.uid);

		return message.reply(`вы успешно купили ${toBuy.name}.`);
	}
});

updates.hear(/^(?:телефоны|телефон)\s?([0-9]+)?$/i, async (message) => {
	if(!message.$match[1]) {
		let text = ``;
		phones.map((x) => {
			text += `📱 ${x.uid}. ${x.name} (${utils.spaces(x.price)}$)\n`;
		});

		return message.reply("телефоны:\n" + text + "\n🚩Для покупки введите \"Телефон [номер]\"");
	}

	let toBuy = phones.find((x) => x.uid == message.$match[1]);
	if(!toBuy) return;

	if(message.user.phone) return message.reply(`у вас уже есть телефон! (${phones.find((x) => x.uid == message.user.phone).name})`);

	if(message.user.balance <= toBuy.price) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= toBuy.price) {
		await message.user.dec("balance", toBuy.price);
		await message.user.set("phone", toBuy.uid);

		return message.reply(`вы успешно купили ${toBuy.name}.`);
	}
});

updates.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.$match[1]) return message.reply(`бизнесы:
${message.user.business === 1 ? '🔸' : '🔹'} 1. Шаурмичная - 50.000$
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.business === 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000$
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.business === 3 ? '🔸' : '🔹'} 3. Ресторан - 300.000$
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.business === 4 ? '🔸' : '🔹'} 4. Магазин - 500.000$
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.business === 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000$
⠀ ⠀ ⠀ Прибыль: 8.000$/час
${message.user.business === 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000$
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.business === 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000$
⠀ ⠀ ⠀ Прибыль: 220.000$/час
${message.user.business === 8 ? '🔸' : '🔹'} 8. Разработка игр - 150.000.000$
⠀ ⠀ ⠀ Прибыль: 300.000$/час
${message.user.business === 9 ? '🔸' : '🔹'} 9. Нефтевышка - 500.000.000$
⠀ ⠀ ⠀ Прибыль: 700.000$/час
${message.user.business === 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 800.000.000$
⠀ ⠀ ⠀ Прибыль: 1.000.000$/час
${message.user.business === 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.$match[1]));
	if(!sell) return;
	if(message.user.business) return message.reply(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(sell.cost > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.user.balance >= message.$match[1])
	{
		await message.user.dec("balance", sell.cost);
		await message.user.set("business", sell.id);

		return message.reply(`вы купили "${sell.name}" за ${utils.spaces(sell.cost)}$`);
	}
});
updates.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return message.reply(`у вас нет бизнеса. ${utils.getSadEmoji()}\nНапиши: Бизнесы`);
	const biz = businesses.find(x=> x.id === message.user.business);

	return message.reply(`статистика "${biz.name}":
	💲 Прибыль: ${utils.spaces(biz.earn)}$/час
	👫 Рабочие: ${utils.random(0,400)} работают из ${utils.random(400,500)}
	💰 На счёте: ${utils.spaces(message.user.business)}$`);
});
updates.hear(/^(?:продать)\s(?:бизнес)$/i, async (message) => {
	if(!message.user.business) return message.reply(`у вас нет бизнеса. ${utils.getSadEmoji()}\nНапиши: Бизнесы`);
	let syka = businesses.find((x) => x.id == message.user.business);

	await message.user.set("business", 0);
	await message.user.inc("balance", syka.cost * 0.90);

	return message.reply(`вы продали бизнес за ${utils.spaces(syka.cost * 0.90)}$`);
});

updates.hear(/^(?:купить випку)$/i, async message => {
	let text = await vk.api.call('utils.getShortLink', { url:`https://qiwi.com/payment/form/99?extra[%27account%27]=79064523920&amountInteger=100&amountFraction=0&extra[%27comment%27]=vk.com/id${message.senderId}&currency=643&blocked[1]=account&blocked[2]=comment` });
	message.reply(`${message.user.admin ? `a` : 'ссылка на оплату: ' + text.short_url  + '\n\nК оплате: 100 рублей\nСпособ оплаты: QIWI/Банковская карта'}`);
  
  });

updates.hear(/^(?:купить админку)$/i, async message => {
	let text = await vk.api.call('utils.getShortLink', { url:`https://qiwi.com/payment/form/99?extra[%27account%27]=79064523920&amountInteger=200&amountFraction=0&extra[%27comment%27]=vk.com/id${message.senderId}&currency=643&blocked[1]=account&blocked[2]=comment` });
	message.reply(`${message.user.admin ? `a` : 'ссылка на оплату: ' + text.short_url  + '\n\nК оплате: 200 рублей\nСпособ оплаты: QIWI/Банковская карта'}`);
  
  });

updates.hear(/^(?:памятник)$/i, async (message, bot) => {
	let ctx = message
      if(!message.forwards[0]){
            return messge.reply(`вы не переслали сообщение.`)
        }

        return message.reply(`обрабатываю изображение.`)

        const { createCanvas, loadImage } = require('canvas');
        const canvas = createCanvas(800, 800);
        const ctxx = canvas.getContext('2d');
        const Image = Canvas.Image;

        const use_id = message.forwards[0].senderId;

        const [ava_info] = await vk.api.users.get({
            user_id: use_id,
            fields: "photo_200"
        });

        const [user_info] = await vk.api.users.get({
            user_id: use_id
        });

        ctxx.drawImage(img, 0, 0);

        ctxx.font = '30px mr_CCUpUpAndAwayG';
        ctxx.fillStyle = "#F4ECD2";
        ctxx.fillText(`${user_info.first_name}`, 220, 310);

        ctxx.font = '30px mr_CCUpUpAndAwayG';
        ctxx.fillStyle = "#D8A903";
        ctxx.fillText(`${data()}`, 200, 386);

        const mychit = await loadImage(ava_info.photo_200); 
        ctxx.drawImage(mychit, 215, 60);

        //ctx.arc(75,75,50,0,Math.PI*2,true); // Внешняя окружность

        return reply.sendPhoto(canvas.toBuffer());     
});

updates.hear(/^(?:порно)$/i, async (message, bot) => {
        let { items } = await user.api.wall.get({
            domain: utils.pick(["cekc5", "golie_devuhci", "menstherapy"]),
            offset: 1,
            count: 200
        });
        let item = utils.pick(items);
        item = item.attachments[0].photo;
        await message.send({
            attachment: "photo" + item.owner_id + "_" + item.id
        });      
});

updates.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return message.reply(`оууу... Прости, но у вас нет бизнеса.\nДля покупки напиши: бизнесы`);
	if(!message.user.biz) return message.reply(`у вас нет денег на счёте этого бизнеса!`);

	const biz_balance = message.user.biz;

	await message.user.inc("balance", message.user.biz);
	await message.user.set("biz", 0);

	return message.reply(`вы сняли со счёта своего бизнеса ${utils.spaces(biz_balance)}$`);
});

updates.hear(/^(?:продать)\s(.*)$/i, async (message) => {
	message.$match[1] = message.$match[1].toLowerCase();
	if(message.$match[1] === "рейтинг") return message.reply(`используйте: "Рейтинг продать [кол-во]".`);

	let matches = [
		{ type: "houses",     link: houses,     oneType: "house"     },
		{ type: "apartments", link: apartments, oneType: "apartment" },
		{ type: "phones",     link: phones,     oneType: "phone"     },
		{ type: "computers",  link: computers,  oneType: "computer"  }
	];
	let toSell = {};

	if(/(дом)/.test(message.$match[1])) {
		toSell = matches[0];
	}

	if(/(квартир)/.test(message.$match[1])) {
		toSell = matches[1];
	}

	if(/(телефон)/.test(message.$match[1])) {
		toSell = matches[2];
	}

	if(/(комп)/.test(message.$match[1])) {
		toSell = matches[3];
	}

	if(!toSell.link) return;
	toSell.link = toSell.link.find((x) => x.uid == message.user[toSell.oneType]);

	if(!message.user[toSell.oneType]) return message.reply(`у вас нет этой вещи.`);

	await message.user.inc("balance", toSell.link.price * 0.90);
	await message.user.set(toSell.oneType, 0);

	return message.reply(`вы успешно продали ${toSell.link.name}.`);
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
			return message.send(`вы угадали сторону монетки! Выигрыш: ${utils.spaces(message.$match[2] * 2)}$`);
		} else return message.send(`вы проиграли :(\nВы проиграли ${utils.spaces(message.$match[2])}$`);
	}
});

updates.hear(/^(?:трейд)\s(вверх|вниз)\s(.*)$/i, async (message, bot) => {
	message.$match[2] = message.$match[2].replace(/(\.|\,)/ig, '');
	message.$match[2] = message.$match[2].replace(/(к|k)/ig, '000');
	message.$match[2] = message.$match[2].replace(/(м|m)/ig, '000000');
	message.$match[2] = message.$match[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	if(!Number(message.$match[2])) return;
	message.$match[2] = Math.floor(Number(message.$match[2]));

	if(message.$match[2] <= 0) return;

	if(message.$match[2] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[2] <= message.user.balance)
	{
		await message.user.dec("balance",  message.$match[2]);

		const rand = utils.pick([0, 1]);
		const nav = Number(message.$match[1].toLowerCase().replace(/вверх/, '1').replace(/вниз/, '2'));

		if(rand === nav)
		{
			const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
			await message.user.inc("balance", Math.floor(message.$match[2] * multiply));

			return message.reply(`курс ${nav === 1 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			✅ Вы заработали +${utils.spaces(message.$match[2] * multiply)}$
			💰 Баланс: ${utils.spaces(message.user.balance)}$`);
		} else {
			return message.reply(`курс ${nav === 2 ? `подорожал⤴` : `подешевел⤵`} на ${utils.random(100)}$
			❌ Вы потеряли ${utils.spaces(message.$match[2])}$ 
			💰 Баланс: ${utils.spaces(message.user.balance)}`);
		}
	}
});

updates.hear(/^(?:погода|weather)/i, async (message, bot) => {
    let $match = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if($match[1].toLowerCase() == "") return message.send(nope)
    rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent($match[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
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
    return message.send(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

	🌡 Температура: ${TempTo()}: ${res.main.temp}°С
	💨 Скорость ветра:  ${res.wind.speed} м/с
	🌇 Рассвет: ${sunrise.getHours()}:${sunmin()}
	🌆 Закат: ${sunset.getHours()}:${sunsmin()}`)})
});


updates.hear(/^(?:)/i, async (message, bot) => {

if(message.hasAttachments('wall')) { 
	let user = await User.findOne({ id: message.senderId }); 
	let url = message.attachments[0].attachments[0].largePhoto; 
	console.log(url) 
	if(!url) return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, пришли мне запись с QR-Кодом`); 
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
	return message.reply(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы успешно активировали QR-промокод, зачислено: ${utils.spaces(promo.sum)}₽\n📢 Осталось ${promo.count - promo.users.length} использований.`); 
	} 
	
	if(message.hasAttachments('photo')) { 
	let user = await User.findOne({ id: message.senderId }); 
	let url = message.attachments[0].largePhoto; 
	if(!url) return message.reply(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, пришли мне QR-Код`); 
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
	return message.send(`${user.mention ? `[id${user.id}|${user.tag}]` : `${user.tag}`}, вы успешно активировали QR-промокод, зачислено: ${utils.spaces(promo.sum)}₽\n📢 Осталось ${promo.count - promo.users.length} использований.`); 
	}
});

updates.hear(/^(?:иди)\s?(?:на)?(?:хуй)/i, async (message) => {
	return message.reply(`сам иди!!! И не возвращайся. 😡😡😡😡`);
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

async function leaderBoard() {
	let lb = [];
	let users = await User.find({ bantop: false });

	for (let i = 0; i < users.length; i += 1) {
		if(LITE.indexOf(users[i].id) === -1) lb.push({ id: users[i].id, balance: users[i].balance, rating: users[i].rating, tag: users[i].tag });
	}


	return lb
	.sort((a, b) => b.rating - a.rating)
	.slice(0, 10)
	.map((x, i) => `${i === 9 ? "&#128287;" : `${i + 1}&#8419;`} @id${x.id} (${x.tag}) — 👑${utils.spaces(x.rating)} | $${utils.formatNumber(x.balance)}`)
	.join("\n")
}

function flipString(string) {
    let result = "";
    string = string.toLowerCase().split("").reverse();
    string.map((symbol) => {
        result += flipTable[symbol] || symbol;
    });
    return result;
}

const r = {
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
 }
}


const flipTable = {
    "a": "\u0250",
    "b": "q",
    "c": "\u0254",
    "d": "p",
    "e": "\u01DD",
    "f": "\u025F",
    "g": "\u0183",
    "h": "\u0265",
    "i": "\u0131",
    "j": "\u027E",
    "k": "\u029E",
    "m": "\u026F",
    "n": "u",
    "r": "\u0279",
    "t": "\u0287",
    "v": "\u028C",
    "w": "\u028D",
    "y": "\u028E",
    ".": "\u02D9",
    "[": "]",
    "(": ")",
    "{": "}",
    "?": "\u00BF",
    "!": "\u00A1",
    "\"": ",",
    "<": ">",
    "_": "\u203E",
    "\u203F": "\u2040",
    "\u2045": "\u2046",
    "\u2234": "\u2235",
    "\r": "\n",
    "а": "ɐ",
    "б": "ƍ",
    "в": "ʚ",
    "г": "ɹ",
    "д": "ɓ",
    "е": "ǝ",
    "ё": "ǝ",
    "ж": "ж",
    "з": "ε",
    "и": "и",
    "й": "ņ",
    "к": "ʞ",
    "л": "v",
    "м": "w",
    "н": "н",
    "о": "о",
    "п": "u",
    "р": "d",
    "с": "ɔ",
    "т": "ɯ",
    "у": "ʎ",
    "ф": "ф",
    "х": "х",
    "ц": "ǹ",
    "ч": "Һ",
    "ш": "m",
    "щ": "m",
    "ъ": "q",
    "ы": "ıq",
    "ь": "q",
    "э": "є",
    "ю": "oı",
    "я": "ʁ"
};

let USERS = [];

updates.hear(/^(?:рассылка обновить)$/i, async (context) => {
	if(message.senderId !== 496175718) return;
	USERS = [];
	context.send(`Обновление начато!`);
	let res = await User.find({ subToMessage: true });
	res.map(async (x) => USERS.push(x.id));
	return context.send('База пользователей для рассылки обновлена! (' + USERS.length + ')');
});

updates.hear(/^(?:прас)\s([^]+)\s(.*)/i, async (context, next) => {
	if(message.senderId !== 496175718) return;
	let delievered = 0;
	for (let i = 0; i < Math.floor(USERS.length / 100); i++) {
		delivered++
		await vk.api.call("messages.send", {
			user_ids: USERS.slice(i * 100, i * 100 + 100).join(","),
			message: `${context.$match[1]}`,
			keyboard: Keyboard.keyboard([
				Keyboard.textButton({
					label: 'Отписаться',
				}),
				Keyboard.textButton({
					label: 'Меню',
					color: Keyboard.PRIMARY_COLOR
				})
			]),
			attachment: context.$match[2],
			random_id: 0
		}).catch((error) => {
		delivered-= 1
		});
	}
	context.send('Всего доставлено ' + delievered + ' пользователям из ' + USERS.length);
});

updates.hear(/^(?:р)\s([^]+)$/i, async message => { 

if(message.senderId !== 496175718) return; 
const bc = new VK({ token: vk.options.token }); 

let ids = []; 

for (let i = 0; i < 200; i++) { 
await bc.api.messages.getConversations({ count: 200, offset: i * 200 }).then(async (response) => { 
await response.items.map((dialog) => { 
ids.push(dialog.conversation.peer.id); 
}); 
}); 
} 

console.info(`Users have been collected! (${ids.length} chats)`); 

const ab = new VK({ token: vk.options.token, apiMode: "parallel" }); 

for (let i = 0; i < Math.floor(ids.length / 100); i++) { 
await ab.api.call("messages.send", { 
user_ids: ids.slice(i * 100, i * 100 + 100).join(","), 
message: message.$match[1], 
random_id: Math.random() * 100000 
}); 
} 


console.info(`Рассылка в личные сообщения успешно выполнена.`); 

const zzz = new VK({ token: vk.options.token, apiMode: "parallel" }); 

for (let i = 1; i < 4000; i++) { 
await vk.api.call("messages.send", { 
chat_id: i, 
message: message.$match[1], 
random_id: Math.random() * 100000 
}).catch((err) => {}); 
} 


console.info(`Рассылка в чаты успешно выполнена.`); 

});

const widget = new VK({ token: 'ba007d0db16042dafd486771a5834d603a7112196567afd02ff8de68bb9ddb46d0ba15edfe63238f65a11', pollingGroupId: '182629640' });
let top = ``;
setInterval(() => {
	widget.api.call('appWidgets.update', {
		type: 'table',
		code: `return {
			"title": "Лучшие игроки",
			"title_url": "vk.me/bot_al1sa",
			"head": [
				{
					"text": "Пользователь"
				},
				{
					"text": "рейтинг",
					"align": "left"
				}
			],
			"body": ${JSON.stringify(top)}
		};`
	});
}, 60000);
async function leaderBoard() {
	let lb = [];
	let users = await User.find({ balance: { $gt: 15000000 }});

	for (let i = 0; i < users.length; i += 1) {
		lb.push({ id: users[i].id, rating: users[i].rating, tag: users[i].tag, uid: users[i].uid });
	}


	return lb
	.sort((a, b) => b.rating - a.rating)
	.slice(0, 10)
	.map((x, i) => [
		{
			"icon_id": `id${x.id}`,
			"text": `${x.tag}`,
			"url": `https://vk.com/id${x.id}`
		},
		{
			"text": `${utils.formatNumber(x.rating)} 👑`
		}
	]);
}
setInterval(async () => top = await leaderBoard(), 55000);

setInterval(function () { 
user.api.call('status.set', { 
text: `[🕛]> Time : ${unixStamp(getUnix())} || [💬] » Сообщений с момента запуска: ${utils.spaces(stats.messages.inbox).replace(/\s/g, ".")} || Создатель: Сергей Волков`,
group_id: 182629640, 
})
}, 60000);

setInterval(function () { 
	 user.api.users.get({
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {

let online = res[0].online;
let sex = res[0].sex;
let bdate = res[0].bdate;
let city = res[0].city;
let country = res[0].country;
let contacts = res[0].contacts;
var onli = `&#128187;`
user.api.call('status.set', { 
text: `👫Подписчики: ${utils.spaces(res[0].followers_count)} || ✅Активность:  ${(online == 0 ? `Не в сети` : `Онлайн`)} || Онлайн с ${onli}`,
user_id: 496175718, 
})
})
}, 60000);