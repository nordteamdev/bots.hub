let top = "идёт загрузка топа, напишите через минуту команду еще раз!";
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

const computers = [
    { name: "Asus E210",       uid: 1,  price: 250000    },
    { name: "HP T530",         uid: 2,  price: 600000    },
    { name: "Acer Veriton",    uid: 3,  price: 1500000   },
    { name: "Dell Vostro",     uid: 4,  price: 5500000   },
    { name: "Lenovo iDea",     uid: 5,  price: 12000000  },
    { name: "MSI Pro 20ET",    uid: 6,  price: 15000000  },
    { name: "HP Pavilion 570", uid: 7,  price: 20000000  },
    { name: "MacBook Air",     uid: 8,  price: 35000000  },
    { name: "iMac",            uid: 9,  price: 55000000  },
    { name: "Mac Pro",         uid: 10, price: 100000000 },
    { name: "Asus ROG GR8",    uid: 11, price: 135000000 }
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

setImmediate(async () => {
	top = await leaderBoard();
});

let ADMINS = [1424607, 209052575];
let LITE = [1424607, 209052575, 310004014, 271544971, 275392560];

let BANS = [495903389, 504057161];
let CARS = [
	{
		id: 1,
		name: "Lada 2010",
		cost: 50000,
		att: "photo-160021944_456240473"
	},
	{
		id: 2,
		name: "Hyundai Solaris",
		cost: 250000,
		att: "photo-160021944_456240472"
	},
	{
		id: 3,
		name: "Toyota Camry",
		cost: 1000000,
		att: "photo-160021944_456240477"
	},
	{
		id: 4,
		name: "BMW 5",
		cost: 100000000,
		att: "photo-160021944_456240471"
	},
	{
		id: 5,
		name: "Mercedes - Benz",
		cost: 5000000000,
		att: "photo-160021944_456240475"
	},
	{
		id: 6,
		name: "Lamborghini Huracan",
		cost: 100000000000,
		att: "photo-160021944_456240474"
	},
	{
		id: 7,
		name: "Rolls Roys Wrath",
		cost: 50000000000000,
		att: "photo-160021944_456240476"
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
mongo.connect("mongodb://bot:bot123@ds127988.mlab.com:27988/fozy");

const schema = new mongo.Schema({
	uid: Number,
	id: Number,
	balance: Number,
	bank: Number,
	rating: Number,
	diamonds: Number,
	work: Number,
	business: Number,
	tag: String,
	lvl: Number,
	regDate: Number,
	tbonus: Number,
	twork: Number,
	treport: Number,
	xmas: Boolean,
	ref: Number,
	bantop: Boolean,
	banreport: Boolean,
	banpay: Boolean,
	buttons: Array,
	energy: Number,
	car: Number,
	ttaxi: Number,
	admingive: Number,
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

let likes = [];

const { VK, Keyboard } = require("vk-io");
const keyboard = Keyboard;

const vk = new VK({
	token: "8edfee107e6bb9bbe0a4ea0b839425004532a92a923672ed774192e64f2b53784c66ae2978af306fce9cc",
	pollingGroupId: 176262928,
	apiMode: "parallel"
});

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
			business: 0,
			tag: user_info.first_name,
			lvl: 1,
			regDate: getUnix(),
			tbonus: 0,
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
			await message.send(`@id${message.senderId} (${user_info.first_name}), привет! Рад познакомиться.\nУзнать все команды бота - <<помощь>>.`, {
				keyboard: generateKeyboard(["👑 Донат"])
			});

			await message.sendSticker(8748);
		}

		stats.new_users += 1;
	}

	let follow = await vk.api.call("groups.isMember", { user_id: message.senderId, group_id: 176262928 });
	message.user = await User.findOne({ id: message.senderId });

	message.reply = (text, params) => message.send(`${message.user.tag}, ${text}\n\n${!follow ? `[club176262928|🔔 Ты всё ещё не подписан на меня! Подпишись, чтобы не пропускать раздачи денег, админок, но я не настаиваю. :)]` : ``}`, params);
	if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, "").trim();

	let start = Date.now();
	await next();

	let end = Date.now();
	if(message.senderId === 1424607) console.info(`[${unixStamp(getUnix())} ${message.isChat ? "c"+message.chatId+", @id"+message.senderId : "@id"+message.senderId}]: ${message.text.slice(0, 64)} handled in ${end-start} ms`);
});

updates.hear(/^(?:помощь|Начать|Start)$/i, message => message.reply(`мои команды:
🚀 Игры:
⠀⠀🎰 Казино [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [10-99]
⠀⠀🔦 Бигсейф [100-999]
⠀⠀🅰 Буква [а-я]⠀️
👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться

💡 Разное:
📒 Профиль
💲 Баланс
💰 Банк [сумма/снять сумма]
💎 Алмаз [кол-во/продать кол-во]
👑 Рейтинг - ваш рейтинг
✒ Ник [ник]
🤝 Передать [id] [сумма]
🛒 Магазин
🏆 Топ
💎 Бонус - ежедневный бонус
🆕 Реф
📈 Курс

🚘 Машины - список машин:
🚘 Машина - информация о вашей машине
🔑 Машина продать - продать машину (90% от суммы)
🚖 Таксовать

⌨️ Кнопка [текст/удалить] - бинды
🆓 Халява - как получать халявные деньги
${LITE.indexOf(message.senderId) !== -1 ? `⚠ Админка - зайти в админку` : `👑 Донат - покупка админки`}

🆘 Репорт [фраза] - ошибки или пожелания`));

updates.hear(/^(?:профиль|📒\sпрофиль)$/i, async (message) => {
	let text = ``;
	message.append = (_text) => text += _text+"\n";

	message.append("твой профиль:");
	message.append("🔎 ID: " + message.user.uid);
	message.append("💰 Денег: " + utils.spaces(message.user.balance) + "$");
	if(message.user.diamonds) message.append("💎 Алмазов: " + utils.spaces(message.user.diamonds));
	if(message.user.bank) message.append("💳 В банке: " + utils.spaces(message.user.bank) + "$");
	message.append("👑 Рейтинг: " + message.user.rating);
	if(message.user.work) message.append("👔 Работа: " + works.find((x) => x.id === message.user.work).name);
	if(message.user.house || message.user.apartment || message.user.phone || message.user.computer || message.user.car) message.append("\n🔑 Имущество:");

	if(message.user.car) message.append(`&#4448;🚘 Машина: ${CARS.find((x) => x.id === message.user.car).name}`);
	if(message.user.house) message.append(`&#4448;🏠 Дом: ${houses.find((x) => x.uid === message.user.house).name}`);
	if(message.user.apartment) message.append(`&#4448;🌇 Квартира: ${apartments.find((x) => x.uid === message.user.apartment).name}`);
	if(message.user.phone) message.append(`&#4448;📱 Телефон: ${phones.find((x) => x.uid === message.user.phone).name}`);
	if(message.user.computer) message.append(`&#4448;🖥 Компьютер: ${computers.find((x) => x.uid === message.user.computer).name}`);

	message.append("\n📗 Дата регистрации: " + unixStamp(message.user.regDate));
	return message.reply(text);
});

updates.hear(/^(?:баланс)$/i, async (message) => {
	return message.reply(`на руках: ${utils.spaces(message.user.balance)}$${message.user.diamonds ? `\n💎 Алмазов: ${utils.spaces(message.user.diamonds)}` : ``}${message.user.bank ? `\n💳 В банке: ${utils.spaces(message.user.bank)}$` : ``}`);
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
	if(LITE.indexOf(message.senderId) !== -1) return message.reply(`администраторы не могут передавать деньги.`);

	let $user = await User.findOne({ uid: Number(message.$match[1]) });

	if(!$user) return message.reply(`неверный ID`);
	if($user.uid === message.user.uid) return message.reply(`неверный ID`);

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

updates.hear(/^(?:топ)$/i, async (message) => {
	await message.reply("самые лучшие игроки (обновляется раз в 10 минут):\n\n" + top);
});

updates.hear(/^(?:бонус|💎\sбонус)$/i, async (message) => {
	if(message.user.tbonus > getUnix()) return message.reply(`вы сможете получить бонус через ${unixStampLeft(message.user.tbonus - Date.now())}`);
	let prize = utils.pick([300000000000, 200000000000, 100000000000, 50000000000]);

	await message.user.inc("balance", prize);
	await message.user.set("tbonus", getUnix() + 86400000);

	await message.reply(`вы выиграли ${utils.spaces(prize)}$
	💰 На руках: ${utils.spaces(message.user.balance)}$`);

	await message.sendSticker(8779);
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
	await message.sendSticker(9808);
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

updates.hear(/^(?:казино)\s(.*)$/i, async (message) => {
	message.$match[1] = utils.parseBet(message.$match[1], message.user.balance);
	
	if(!message.$match[1]) return;
	if(message.$match[1] <= 0) return;

	if(message.$match[1] > message.user.balance) return message.reply(`недостаточно денег. ${utils.getSadEmoji()}`);
	else if(message.$match[1] <= message.user.balance) {
		await message.user.dec("balance", message.$match[1]);
		let cof = utils.pick([0.75, 0.50, 2, 4, 0.50, 0.75, 10, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25]);

		await message.user.inc("balance", message.$match[1] * cof);
		return message.reply(`${cof < 1 ? `вы проиграли ${utils.spaces(message.$match[1] - (message.$match[1] * cof))}$` : `вы выиграли ${utils.spaces(message.$match[1] * cof)}$`} (x${cof}) ${cof <= 0 ? utils.getSadEmoji() : ``}
		💰 Ваш баланс: ${utils.spaces(message.user.balance)}$`);
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
	if(message.$match[1] < 10 || message.$match[1] > 99) return;
	let rand = utils.random(10, 99);

	if(rand == message.$match[1]) {
		await message.user.inc("balance", 100000000);
		return message.reply(`вы успешно открыли сейф! ✅
		💰 Вам начислено 10.000.000.000$`);
	} else return message.reply(`вы не отгадали код! Код был <<${rand}>>.
	🔥 Не отчаивайтесь, попытки неограничены!
	💰 Если отгадаете код, то вы получите 10.000.000.000$`);
});

updates.hear(/^(?:бигсейф)\s([0-9]+)$/i, async (message) => {
	if(message.$match[1] < 100 || message.$match[1] > 999) return;
	let rand = utils.random(100, 999);

	if(rand == message.$match[1]) {
		await message.user.inc("balance", 1000000000000000);
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
		await message.user.inc("balance", 1000000000);
		return message.reply(`вы отгадали букву! Буква была <<${letter}>>.
		💰 Приз: 1.000.000.000$`);
	} else {
		return message.reply(`вы не отгадали букву! Буква была <<${letter}>>.
		🔥 Не отчаивайтесь, попытки неограничены!
		💰 Приз: 1.000.000.000$`);
	}
});

updates.hear(/^(?:промосоздать)\s([0-9]+)\s([0-9]+)\s(.*)$/i, async (message) => {
	if(message.senderId !== 1424607) return;
	let $promo = await Promo.findOne({ title: message.$match[3].toLowerCase() });

	if($promo) return message.reply(`уже есть такой промокод, сосун мелкий.`);
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

		await message.user.inc("balance", 50000000);
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
	return message.reply(`айди игрока: ${user.uid}`);
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
💰 Баланс: ${utils.spaces(user.balance)}$ (Банк: ${utils.spaces(user.bank)}$)
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
	
Для покупки свяжитесь с: vk.com/id209052575`, random_id: Math.random() });
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
	if(message.senderId !== 1424607) return;
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
	if(message.chatId === 2143 && message.senderId !== 1424607) return message.reply(`в этой беседе добавлять кнопки может только администратор.`);

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
	return message.send(`⚠ Для того, чтобы не пропускать ХАЛЯВУ включи уведомления о новых записях, сделать это можно так:`, {
		attachment: "photo-160021944_456240461,photo-160021944_456240460"
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
	return message.reply(`⚠ Внимание! Успей купить админку, осталось 4 штуки! 
	Скидки 50% в честь нового года!

	Возможности: 
	— выдавать деньги СЕБЕ и ДРУГИМ ИГРОКАМ! 🤑 
	— забирать деньги у ДРУГИХ ИГРОКОВ! 🤤 
	— выдавать рейтинг СЕБЕ и ДРУГИМ ИГРОКАМ! 👑 
	— возможность сменить ник ДРУГОМУ ИГРОКУ ✒ 
	— возможность поставить ДЛИННЫЙ НИК ⏳ 
	— возможность убрать игрока из топа 🔝 
	— возможность заблокировать передачи ИГРОКУ 🎲 
	— вы будете добавлены в беседу администраторов 😎 

	Для покупки свяжитесь с: vk.com/id209052575
	📌 После оплаты админка будет выдана в течении 10 минут и вас добавят в беседу администраторов. ☺`);
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

updates.setHearFallbackHandler(async (message) => {
	if(!message.isChat) {
		await message.reply("такой команды не существует. Напиши мне <<помощь>>, чтобы узнать мои команды.");
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

setInterval(async () => {
	top = await leaderBoard();
}, 600000);