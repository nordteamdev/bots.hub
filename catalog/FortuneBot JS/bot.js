const { VK } = require('./plugins/core');

let bot1 = bot('Токен от страницы', false),
	bot2 = bot('Токен от группы', true),
	utils = require('./plugins/utils');
	setInterval(() => {
		let users = require('./base/users.json');
		require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
	}, 2000);
function bot(access, inGroup) {
	var diamond = require('./misc/diamond.json'),
		users = require('./base/users.json'),
		amount = require('./misc/amount.json'),
		azs = require('./base/businesses/azs.json'),
		shop = require('./base/businesses/shop.json'),
		drugs = require('./base/businesses/drugs.json'),
		phone = require('./base/misc/phone.json'),
		car = require('./base/transport/car.json'),
		plane = require('./base/transport/plane.json'),
		properties = require('./base/properties/properties'),
		yacht = require('./base/transport/yacht.json'),
		bunker = require('./base/properties/bunker.json'),
		helicopter = require('./base/transport/helicopter.json'),
		clans = require('./base/clans/clans.json'),
		clanamount = require('./base/clans/camount.json'),
		notebook = require('./base/misc/notebook.json');

	if(!inGroup) {
		setInterval(() => {
			diamond = utils.random(500000, 550000)
			require('fs').writeFileSync('./misc/diamond.json', JSON.stringify(diamond, null, '\t'));
		}, 300000)
	};
	
	setInterval(() => {
			for (key in users) {
			if(users[key].bills.main < 50) {
				users[key].bills.main = 1500;
			};
			if(users[key].bills.main === null) {
				users[key].bills.main = 1500;
			};
		}
	}, 5000)

	setInterval(() => {
		for (key in users) {
			users[key].cooldowns.safe = false
			users[key].cooldowns.cheat = false
			users[key].cooldowns.bonus = false
		}
	}, 3600000)

	// Подключение ядра
	const vk = new VK();

	setInterval(() => {
		for (key in users)
		{
			if(users[key].business.azs !== 0)
			{
				let earn = azs[users[key].business.azs - 1].earn;
				if(!earn) return;
				users[key].bills.main += earn;
			}
			if(users[key].business.shop !== 0)
			{
				let earn = shop[users[key].business.shop - 1].earn;
				if(!earn) return;
				users[key].bills.main += earn;
			}
		}
	}, 3600000);
	// Utils filter/addons

	var utils = require('./plugins/utils');

	const commands = require('fs').readdirSync('./addons').filter(x=> x.endsWith('js')).map(x=> require('./addons/' + x));

	// Задаем параметры для входа
	vk.setOptions({
		token: access,
		apiMode: 'parallel'
	});

	// Запуск VK Longpoll
	vk.updates.startPolling();

	setInterval(() => {
		for (key in users) {
			if(users[key].bills.main >= 100000000000000000000) {
				users[key].bills.main = 99999999999999999999
			}
		}
	}, 1000)

	setInterval(() => {
		for (key in users)
		{
			if(users[key].cooldowns.cheat) return users[key].cooldowns.cheat = false;
			if(users[key].cooldowns.safe) return users[key].cooldowns.cheat = false;
			if(users[key].cooldowns.bonus) return users[key].cooldowns.bonus = false;
		}
	}, 3000000);
	// Задаём ID боту
	var bot_id = "";
	var group_id = "-152545534";
	if(!inGroup) {
		vk.api.users.get()
			.then((res) => {
				bot_id = res[0].id
			})
	};
	if(!inGroup) {
		setInterval(async () => {
			let friends_inbox = await vk.api.friends.getRequests({out: 0});
			let friends_outbox = await vk.api.friends.getRequests({out: 1});

			vk.api.account.setOnline();

			friends_inbox.items.map(e=> {
				vk.api.friends.add({user_id: e});
			});

			friends_outbox.items.map(e=> {
				vk.api.friends.delete({user_id: e});
			});
		}, 35000);
	}

	if(!inGroup) {
			setInterval(() => {
			vk.api.call('friends.get', {user_id: bot_id})
				.then((res) => {
			});

			vk.api.call('groups.getMembers', {group_id: 152545534, count: 0})
				.then((res) => {
			});

		}, 5000);
	};
	let captcha = new ( require('./misc/captcha.js') );

	vk.setCaptchaHandler(async (obj, submit) => {
		captcha.get(obj.src).then(key => {
			console.log('Captcha has been solved! Answer: ' + key.answer);
			return submit(key.answer);
		});
	});
	// Основное
	vk.updates.on('message', async (message) => {
		// Betparser для игр
		function betParser(int)
		{
			int = int.toString().replace(/(вабанк|все|всё|all|вобанк|весь|баланс|олын)/ig, users[message.senderId].bills.main);
			int = int.toString().replace(/(к|k)/ig, '000');
			int = int.toString().replace(/(м|m)/ig, '000000');
			int = Number(int);
	
			return int;
		}
		function intParser(int, fixed)
		{
			if (int === null) return null;
			if (int === 0) return '0';
			fixed = (!fixed || fixed < 0) ? 0 : fixed;
			let b = (int).toPrecision(2).split('e'),
				k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
				c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
				d = c < 0 ? c : Math.abs(c),
				e = d + ['', 'K', 'M', 'B', 'T'][k];
			return e;
		}
		if(!message.text || message.isOutbox) return;
		commands.map(cmd => {
			if(!cmd.pattern.test(message.text)) return;
			message.args = message.text.match(cmd.pattern);
			cmd.f(message);
		});
		// Отсылка сообщений
		let bot = {
			reply: (text, params) => {
				vk.api.messages.setActivity({ peer_id: message.peerId, type: 'typing' });
				message.reply(`${users[message.senderId].punish_info.isBanned ? `💬 Вы заблокированы\n\nПричина: ${users[message.senderId].punish_info.reason}\n` : users[message.senderId].group === 0 ? '[🔹] ' : ''}${users[message.senderId].group === 1 ? '[✏] ' : ''}${users[message.senderId].group === 2 ? '[👑] ' : ''}${users[message.senderId].group >= 3 ? '[👑] ' : ''}${users[message.senderId].tag}, ${users[message.senderId].punish_info.isBanned ? '' : text} ${!inGroup ? users[message.senderId].group < 1 ? utils.pick(['\n\n' + utils.pick(['😏', '😵', '🤧', '❤', '🤤', '😃', '😉', '😜']) + ' Спасибо за использование :)', '\n\n' + utils.pick(['😏', '😵', '🤧', '❤', '🤤', '😃', '😉', '😜']) + ' Спасибо :)']) : '' : ''}`, params);
			},
			utils: utils,
			users: users
		};
		if(!users[message.senderId])
		{
			amount += 1;
			let user_info = await vk.api.users.get({user_id: message.senderId});
			let time = new Date();
			users[message.senderId] = {
				"punish_info": {
					"isBanned": false,
					"reason": "",
					"punisher": ""
				},
				"bills": {
					"main": 5000,
					"bank": 0,
					"card2": 0,
					"diamonds": 0,
					"nextcoins": 0,
					"donate": 0
				},
				"stats": {
					"wins": 0,
					"loses": 0
				},
				"business": {
					"azs": 0,
					"shop": 0,
					"drugs": 0
				},
				"transport": {
					"car": 0,
					"plane": 0,
					"yacht": 0,
					"helicopter": 0
				},
				"marriage": {
					"requests": [],
					"partner": 0
				},
				"misc": {
					"phone": 0,
					"notebook": 0
				},
				"properties": {
					"place1": 0
				},
				"bunker": {
					"is": 0
				},
				"cooldowns": {
					"safe": false,
					"cheat": false,
					"bonus": false
				},
				"clan": {
					"id": 0
				},
				"farm": 0,
				"kicked": false,
				"canKick": false,
				"group": 0,
				"tag": user_info[0].first_name,
				"date": `${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
			};
		};
		if(/^(?:курс)$/i.test(message.text)) {
			return bot.reply(`стоимость алмаза -- ${diamond}$\nЧтобы его приобрести напиши 'алмаз купить [кол-во]'`)
		};
		if(/^(?:алмаз купить)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("алмаз купить ");
			if(!Number(args[1])) return bot.reply('\n&#10067; Не указано кол-во алмазов!');
			let itogo = diamond * Number(args[1]);
			if(Number(args[1] > 10000)) return bot.reply('\n&#10067; Вы можете приобрести за раз только 10000 алмазов')
			if(itogo > users[message.senderId].bills.main) return bot.reply('\n&#10067; У вас недостаточно средств на покупку!\nНужно: ' + itogo + '$');
			users[message.senderId].bills.main -= itogo;
			users[message.senderId].bills.diamonds += Number(args[1]);
			return bot.reply('вы приобрели ' + Number(args[1]) + ' алмазов по цене в ' + itogo + '$')
		};
		if(/^(?:алмаз продать)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("алмаз продать ");
			if(!Number(args[1])) return bot.reply('\n&#10067; Не указано кол-во алмазов!');
			if(users[message.senderId].bills.diamonds < Number(args[1])) return bot.reply('\n&#10067; У вас нет столько алмазов!')
			let itogo = diamond * Number(args[1]);
			users[message.senderId].bills.main += itogo;
			users[message.senderId].bills.diamonds -= Number(args[1]);
			return bot.reply('вы продали ' + Number(args[1]) + ' алмазов по цене в ' + itogo + '$')
		};		
		if(/^(?:брак)$/i.test(message.text)) {
			let users = require('./base/users.json')
			var api = await vk.api.messages.getById({message_ids: message.id});
			var user = api.items[0].fwd_messages[0].from_id
			if(!users[user]) return bot.reply(`\n❌ Игрок не зарегистрирован!`);
			if(api.items[0].fwd_messages[0].from_id === message.senderId) return bot.reply('&#10067; Ты шо дурак сам на себе жениться?');

			if(users[message.senderId].marriage.partner !== 0) return bot.reply(`\n❌ Вы уже имеете партнёра.`);
			if(users[user].marriage.partner !== 0) return bot.reply(`\n❌ Игрок имеет партнёра!`);

			if(users[user].marriage.requests[users[user].marriage.requests.length - 1] === message.senderId)
			{
				users[message.senderId].marriage.partner = user;
				users[user].marriage.partner = message.senderId;

				users[message.senderId].marriage.requests = [];
				users[user].marriage.requests = [];

				return bot.reply(`${users[message.senderId].tag} <3 ${users[user].tag}`);
			}

			users[message.senderId].marriage.requests.push(user);
			users[user].marriage.requests.push(message.senderId);
			vk.api.messages.send({user_id: user, message: `@id${message.senderId} (${users[message.senderId].tag}) сделал вам предложение!\nЧтобы вступить в брак, напишите 'брак +сообщение пользователя'`})
			return bot.reply(`Вы сделали предложение.`);
		};
		if(/^(?:развод)$/i.test(message.text)) {
			if(users[message.senderId].marriage.partner == 0) return bot.reply('\n&#10067; Вы и так холосты!');
			let partner = 0;
			partner = users[message.senderId].marriage.partner;
			users[message.senderId].marriage.partner = 0;
			users[partner].marriage.partner = 0;
			vk.api.messages.send({user_id: partner, message: `@id${message.senderId} (${users[message.senderId].tag}) развёлся с вами! =(`});
			bot.reply('вы успешно развелись с ' + users[partner].tag)
		};
		if(/^(?:помощь)/i.test(message.text)) {
			let args = message.text.split("помощь ");
			if(args[1] === "вип" || args[1] === "vip" || args[1] === "ВИП" || args[1] === "VIP") {
				if(users[message.senderId].group < 1) return bot.reply('недостаточно прав! Приобретите привилегию VIP, написав "донат вип"')
				bot.reply(`вам доступно:\n
				&#4448; 😎 Накрути [0-1000000]\n&#4448;&#4448; Интервал: раз в сутки
				&#4448; 💎 Бонус \n&#4448;&#4448; Интервал: раз в 12 часов
				\n\n&#4448; Дополнительные возможности:\n
				&#4448; 🐩 Ник [новый_ник]
				&#4448; 🎰 Казино [ставка]\n&#4448;&#4448; Преимущества: Процент удачи увеличен на 10%,\n&#4448;&#4448; а выигрыш увеличен до x1.7
				&#4448; 🔐 Сейф [1-6]\n&#4448;&#4448; Интервал: уменьшен до раз в час`)
			} else if(args[1] === "admin" || args[1] === "админ" || args[1] === "Admin") {
				if(users[message.senderId].group < 2) return bot.reply('недостаточно прав! Приобретите привилегию Admin, написав "донат админ"')
				bot.reply(`вам доступно:\n
				&#4448; 😎 Накрути [0-10000000]\n&#4448;&#4448; Интервал: раз в 48 часов
				&#4448; 💎 Бонус \n&#4448;&#4448; Интервал: раз в 5 часов
				\n\n&#4448; Дополнительные возможности:\n
				&#4448; 🐩 Ник [новый_ник]
				&#4448; 🎰 Казино [ставка]\n&#4448;&#4448; Преимущества: Процент удачи увеличен на 20%,\n&#4448;&#4448; а выигрыш увеличен до x1.8
				&#4448; 🔐 Сейф [1-6]\n&#4448;&#4448; Интервал: уменьшен до раз в 30 минут
				&#4448; ⚠ eval [операция]`)
			} else if(!args[1]) return bot.reply(`вот, что я могу:
			\n👾 Основное >>
			&#4448; 💻 Профиль
			&#4448; 💎 Бонус
			&#4448; 🔝 Топ
			&#4448; 💵 Донат	${!inGroup ? '\n&#4448; ✏ Беседа' : ''}
			&#4448; 📈 Курс
			&#4448; 💠 Алмаз [купить/продать] [кол-во]
			&#4448; 🎉 Бизнес [азс/магазин]
			&#4448; 🎉 Бизнес улучшить [азс/магазин]
			&#4448; 🚘 Авто
			&#4448; 🚤 Яхта
			&#4448; ✈ Самолет
			&#4448; 🚁 Вертолет
			&#4448; 🔑 Жилье
			&#4448; ☢ Бункер
			&#4448; 📱 Телефон
			&#4448; 🖥 Ноутбук
			&#4448; 💸 Продать [авто/яхту/самолет/жилье/etc..]
			&#4448; 🤝 Передать [сумма] [+пересл.сообщение]
			&#4448; 💍 Брак [+пересл.сообщение партнёра]
			&#4448; 💔 Развод
			\n🎲 Игры >>
			&#4448; 🎰 Казино [ставка]
			&#4448; ☠ Кости [ставка]
			&#4448; 🎭 Спот [ставка]
			&#4448; 📈 Трейд [вверх/вниз] [ставка]
			&#4448; ⚔ Дуэль
			&#4448; 🔐 Сейф [1-6]${!inGroup ? '\n\n💥 Развлекательное >>\n&#4448; 😑 Кто [что-нибудь]\n&#4448; 🔮 Когда [что-нибудь]\n&#4448; 💯 Оцени [что-нибудь]\n&#4448; 🙂 Инфа [что-нибудь]\n&#4448; 😜 Мем\n&#4448; 🤔 Лоли' : ''}
			`);
		};
		if(/^(?:ник)/i.test(message.text)) {
			if(users[message.senderId].group < 1) return bot.reply('\n&#10067; Изменять ник могут только привилегированные пользователи!\nПодробнее -- "донат"');
			let args = message.text.toLowerCase().split("ник ");
			args = args[1]
			if(users[message.senderId].group < 3) {
				if(/(http(s)?:\/\/.)?(www\.)?[0-9@:%._\+~#=]{2,256}\.[]{2,6}\b([0-9@:%_\+.~#?&//=]*)/ig.test(args)) return bot.reply('❌ В нике обнаружены подозрительные символы/слова.') // ок бро
				if(/(\&\#(?:[0-9]+);)(f57|синий|vk|bot|vto|vtо|vt|кит|сова|админ|admin|создатель|основатель|разработчик|разраб|developer|dev|тихий|тиxий|turboliker|нaкрутка|накрутка|лайки|лaйки|секс|зоофилия|порно|бот)(в|v)(t|т)(o|о)|vkm|вкм|вkm|vкм|vkм|liker|ru|ру|ре|pe|рe|pе|com|сом|cоm|cом|\.|\,|\||\&|\#|bot|bоt|bот|([0-9]+)/ig.test(args)) return bot.reply(`❌ В нике обнаружены подозрительные символы/слова.`); // govnofilter доделай если что!
			};
			if(args.length > 12) return bot.reply(`\n❌ Максимальная длина ника: 12 символов`);
			if(args.length < 4) return bot.reply(`\n❌ Минимальная длина ника: 4 символа`);
			users[message.senderId].tag = args;
			bot.reply('новый ник успешно установлен!');
		};
		if(/^(?:reset)/i.test(message.text)) {
			let name = "";
			await vk.api.users.get({user_ids: message.senderId})
				.then((res) => {
					name = res[0].first_name
				});
			users[message.senderId].tag = name;
			bot.reply('ник восстановлен!')
		};
		if(/^(?:кости)\s([0-9]|вабанк)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("кости ");
			args[1] = betParser(args[1])
			if(Number(args[1]) > users[message.senderId].bills.main) return bot.reply(`ставка превышает ваш баланс`);
			if(Number(args[1]) <= users[message.senderId].bills.main)
			{
			let player = utils.random(1, 9);
			let pbot = utils.random(1, 9);

			users[message.senderId].bills.main -= Number(args[1]);

			if(player > pbot)
			{
				users[message.senderId].bills.main += Number(args[1]) * 1.65;
				users[message.senderId].stats.wins += 1;
				return bot.reply(`вы выиграли ${intParser(Math.floor(Number(args[1] * 1.65)))}$

					&#4448; 🔸 Вы: ${player}&#8419;
					&#4448; 🔸 Бот: ${pbot}&#8419;
					Ваш баланс сейчас: ${intParser(Math.floor(Number(users[message.senderId].bills.main)))}`);
			}

			if(player < pbot)
			{
				users[message.senderId].stats.loses += 1;
				return bot.reply(`вы проиграли ${intParser(Math.floor(Number(args[1])))}$

					&#4448; 🔸 Вы: ${player}&#8419;
					&#4448; 🔸 Бот: ${pbot}&#8419;
					Ваш баланс сейчас: ${intParser(Math.floor(Number(users[message.senderId].bills.main)))}`);
			}

			if(player === pbot)
			{
				users[message.senderId].bills.main += Number(args[1]);
				return bot.reply(`вам вернули деньги.

					&#4448; 🔸 Вы: ${player}&#8419;
					&#4448; 🔸 Бот: ${pbot}&#8419;
					Ваш баланс сейчас: ${intParser(Math.floor(Number(users[message.senderId].bills.main)))}`);
				}
			}
		};
		if(/^(?:спот)\s([0-9]|вабанк)/i.test(message.text)) {
			let bo = utils.random(1,6),
				you = utils.random(1,6),
				args = message.text.toLowerCase().split("спот ");
			args[1] = betParser(args[1])
			if(!Number(args[1])) return bot.reply('\n&#10067; Не указана сумма ставки!');
			if(Number(args[1]) > users[message.senderId].bills.main) return bot.reply('\n&#10067; Сумма ставки превышает ваш баланс!')
			if(Number(args[1] > 1000000)) return bot.reply('\n&#10067; Максимальная ставка - 1000000$')
			if(bo > you) {
				users[message.senderId].stats.loses += 1;
				users[message.senderId].bills.main -= Number(args[1]);
				return bot.reply('вы проиграли :(' + '\nВаш баланс теперь >> ' + intParser(users[message.senderId].bills.main) + '$')
			} else if(you > bo) {
				users[message.senderId].bills.main += Number(args[1]) * 2;
				users[message.senderId].stats.wins += 1;
				return bot.reply('вы выиграли!' + '\nВаш баланс теперь >> ' + intParser(users[message.senderId].bills.main) + '$')
			} else if(you = bo) {
				return bot.reply('ничья. Деньги остаются у вас')
			}
		};
		if(/^(?:мем)/i.test(message.text)) {
			let item = await getItem(bot);

			return message.reply({attachment: item});

			function getItem({api, utils}) {
			return vk.api.call("wall.get", { owner_id: -150493805, count: 40, offset: 1 })
			    .then(response => {
			        let photo = utils.pick(response.items).attachments[0].photo;

			        return `photo${photo.owner_id}_${photo.id}`;
			    })
			}
		};
		if(/^(?:лоли)/i.test(message.text)) {
			let item = await getItem(bot);

			return message.reply({attachment: item});

			function getItem({api, utils}) {
			return vk.api.call("wall.get", { domain: "nyaaloli", count: 40, offset: 1 })
			    .then(response => {
			        let photo = utils.pick(response.items).attachments[0].photo;

			        return `photo${photo.owner_id}_${photo.id}`;
			    })
			}			
		};
		if(/^(?:передать)/i.test(message.text)) {
			let args = message.text.toLowerCase().split("передать ");
			var vid = 0;
			var api = await vk.api.messages.getById({message_ids: message.id});
			if(api.items[0].fwd_messages[0].from_id === message.senderId) return bot.reply('\n&#10067; Вы не можете передать деньги самому себе!');
			if(api.items[0].fwd_messages[0].from_id === undefined) return bot.reply('\n&#10067; Пользователь не зарегистрирован в боте или не определен.');
			if(!Number(args[1])) return bot.reply('\n&#10067; Не указана сумма перевода!');
			if(Number(args[1]) < 5000) return bot.reply('\n&#10067; Минимальная сумма перевода - 5000$');
			if(Number(args[1]) > users[message.senderId].bills.main) return bot.reply('\n&#10067; Сумма перевода превышает ваш баланс');
			users[message.senderId].bills.main -= Number(args[1]);
			users[api.items[0].fwd_messages[0].from_id].bills.main += Number(args[1]);
			bot.reply('получатель: ' + users[api.items[0].fwd_messages[0].from_id].tag + '\nСумма перевода: ' + Number(args[1]));
			vk.api.messages.send({user_id: api.items[0].fwd_messages[0].from_id, message: `@id${message.senderId} (${users[message.senderId].tag}) перевёл вам ${Number(args[1])}$`})
		};
		if(/^(?:кто)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("кто ")
			if(!message.isChat) return bot.reply('&#10067; Команда <<кто>> доступна только в чате!');
			if(!args[1]) return bot.reply('⚠ Использовать команду нужно так: Кто [аргумент]\nНапример: Кто любит Путина');
			let response = await message.vk.api.messages.getChat({ chat_id: message.chatId, fields: 'sex' });
			let user = bot.utils.pick(response.users.filter(x=> !x.name));

			let phrase = bot.utils.pick(['Дай подумать... Это же %user%!', 'Никаких сомнений, что это %user%.', 'Хмм... С научной точки зрения это %user%.', 'Зуб даю, это %user%.']);

			return bot.reply(`🔹 ${phrase.replace(/%user%/ig, `@id${user.id} (${user.first_name} ${user.last_name})`)}`);
		};
		if(/^(?:когда)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("когда ")
			if(!args[1]) return bot.reply('&#10067; Использовать команду нужно так: Когда [аргумент]\nНапример: Когда я получу пятёрку');

			let day = bot.utils.random(1, 31);
			let month = bot.utils.pick(['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']);
			let year = bot.utils.random(2019, 2099);

			return bot.reply(`&#128313; Событие произойдёт ${day} ${month} ${year} года.`);
		};
		if(/^(?:оцени)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("оцени ")
			if(!args[1]) return bot.reply('&#10067; Использовать команду нужно так: Оцени [аргумент]\nНапример: Оцени меня');
			var templates = ['Ужасно!', 'Лучше я не видела', 'Отлично', 'Замечательно', 'Фигово', 'Фигня', 'Пипец'];
			bot.reply('&#128313; ' + utils.pick(templates));
		};
		if(/^(?:продать)\s(.*)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("продать ");
			if(/(самолет)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать самолет ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let pla = plane.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.plane !== pla[0].id) return bot.reply('\n&#10067; Вы не имеете такой самолет!');
				users[message.senderId].bills.main += pla[0].cost;
				users[message.senderId].transport.plane = 0;
				return bot.reply('вы продали свой самолет за ' + pla[0].cost + '$')	
			};
			if(/(самолёт)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать самолёт ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let pla = plane.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.plane !== pla[0].id) return bot.reply('\n&#10067; Вы не имеете такой самолет!');
				users[message.senderId].bills.main += pla[0].cost;
				users[message.senderId].transport.plane = 0;
				return bot.reply('вы продали свой самолет за ' + pla[0].cost + '$')	
			};			
			if(/(телефон)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать телефон ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let pho = phone.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].misc.phone !== pho[0].id) return bot.reply('\n&#10067; Вы не имеете такой телефон!');
				users[message.senderId].bills.main += pho[0].cost;
				users[message.senderId].misc.phone = 0;
				return bot.reply('вы продали свой телефон за ' + pho[0].cost + '$')					
			};
			if(/(бункер)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать бункер ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let bunt = bunker.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].bunker.is !== bunt[0].id) return bot.reply('\n&#10067; Вы не имеете такой бункер!');
				users[message.senderId].bills.main += bunt[0].cost;
				users[message.senderId].bunker.is = 0;
				return bot.reply('вы продали свой бункер за ' + bunt[0].cost + '$')					
			};
			if(/(жилье)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать жилье ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let proppp = properties.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].properties.place1 !== proppp[0].id) return bot.reply('\n&#10067; Вы не имеете данную недвижимость');
				users[message.senderId].bills.main += proppp[0].cost;
				users[message.senderId].properties.place1 = 0;
				return bot.reply('вы продали свою недвижимость за ' + proppp[0].cost + '$')				
			};
			if(/(жильё)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать жильё ")
				if(!Number(args[1])) return bot.reply('\т&#10067; Неверный ID.')
				let proppp = properties.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].properties.place1 !== proppp[0].id) return bot.reply('\n&#10067; Вы не имеете данную недвижимость');
				users[message.senderId].bills.main += proppp[0].cost;
				users[message.senderId].properties.place1 = 0;
				return bot.reply('вы продали свою недвижимость за ' + proppp[0].cost + '$')				
			};
			if(/(ноутбук)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать ноутбук ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let note = notebook.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].misc.notebook !== note[0].id) return bot.reply('\n&#10067; Вы не имеете данного ноутбука!');
				users[message.senderId].bills.main += note[0].cost;
				users[message.senderId].misc.notebook = 0;
				return bot.reply('вы продали свой ноутбук за ' + note[0].cost + '$')
			};
			if(/(авто)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать авто ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let auto = car.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.car !== auto[0].id) return bot.reply('\n&#10067; Вы не имеете данного автомобиля!');
				users[message.senderId].bills.main += auto[0].cost;
				users[message.senderId].transport.car = 0;
				return bot.reply('вы продали своё авто за ' + auto[0].cost + '$')
			};
			if(/(яхту)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать яхту ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let yac = yacht.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.yacht !== yac[0].id) return bot.reply('\n&#10067; Вы не имеете данную яхту!');
				users[message.senderId].bills.main += yac[0].cost;
				users[message.senderId].transport.yacht = 0;
				return bot.reply('вы продали свою яхту за ' + yac[0].cost + '$')				
			};
			if(/(вертолет)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать вертолет ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let helic = helicopter.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.helicopter !== helic[0].id) return bot.reply('\n&#10067; Вы не имеете данный вертолет!');
				users[message.senderId].bills.main += helic[0].cost;
				users[message.senderId].transport.helicopter = 0;
				return bot.reply('вы продали свой вертолет за ' + helic[0].cost + '$')	
			};
			if(/(вертолёт)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("продать вертолёт ")
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let helic = helicopter.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].transport.helicopter !== helic[0].id) return bot.reply('\n&#10067; Вы не имеете данный вертолет!');
				users[message.senderId].bills.main += helic[0].cost;
				users[message.senderId].transport.helicopter = 0;
				return bot.reply('вы продали свой вертолет за ' + helic[0].cost + '$')	
			};
		}
		if(/^(?:бункер)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("бункер ");
			if(!Number(args[1])) return bot.reply('&#10067; Неверный ID.')
			let bun = bunker.filter(x=> x.id === Number(args[1]));
			if(users[message.senderId].bunker.is >= 1) return bot.reply(`&#10067; Вы уже имеете бункер!`)
			if(users[message.senderId].bills.main < bun[0].cost) return bot.reply('&#10067; Недостаточно денег!')
			users[message.senderId].bills.main -= bun[0].cost;
			users[message.senderId].bunker.is = bun[0].id;
			return bot.reply(`✔ Вы купили бункер <<${bun[0].name}>>`);
		};
		if(/^(?:бункер)$/i.test(message.text)) {
			bot.reply(`Вам хватает на >>

			${bunker.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🌍 Расположение: ${x.map}`).join('\n')}

			Вам стоит подкопить на >>

			${bunker.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🌍 Расположение: ${x.map}`).join('\n')}

			Чтобы купить бункер напиши 'бункер [ID]'`)
		};
		if(/^(?:ноутбук)$/i.test(message.text)) {
			bot.reply(`Вы можете приобрести >>

			${notebook.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

			Вам стоит подкопить на >>

			${notebook.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}
			
			Чтобы купить ноутбук, напиши 'ноутбук [ID]'`)
		};
		if(/^(?:ноутбук)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("ноутбук ");
			if(!Number(args[1])) return bot.reply('&#10067; Неверный ID.')
			let not = notebook.filter(x=> x.id === Number(args[1]));
			if(users[message.senderId].misc.notebook >= 1) return bot.reply(`\n&#10067; Вы уже имеете ноутбук!`)
			if(users[message.senderId].bills.main < not[0].cost) return bot.reply('\n&#10067; Недостаточно денег!')
			users[message.senderId].bills.main -= not[0].cost;
			users[message.senderId].misc.notebook = not[0].id;
			return bot.reply(`✔ Вы купили ноутбук <<${not[0].name}>>`);		
		};
		if(/^(?:бизнес азс|бизнес магазин)$/i.test(message.text)) {
			var args = message.text.toLowerCase().split("бизнес ");
			if(args[1] === "азс") {
				return bot.reply(`вы можете приобрести >>

			${azs.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🏧 Заработок: ${x.earn}$/час`).join('\n')}

			Вам стоит подкопить на >>

			${azs.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🏧 Заработок: ${x.earn}$/час`).join('\n')}

			Чтобы купить АЗС нужно написать 'бизнес азс [ID]\nЧтобы улучшить бизнес нужно написать 'бизнес улучшить [название]`)
			};
			if(args[1] === "магазин") {
				return bot.reply(`вы можете приобрести >>

			${shop.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🏧 Заработок: ${x.earn}$/час`).join('\n')}

			Вам стоит подкопить на >>

			${shop.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🏧 Заработок: ${x.earn}$/час`).join('\n')}

			Чтобы купить телефон нужно написать 'бизнес магазин [ID]\nЧтобы улучшить бизнес нужно написать 'бизнес улучшить [название]`)
			};
		}
		if(/^(?:бизнес улучшить азс)/i.test(message.text)) {
			let azsb = azs.filter(x=> x.id === users[message.senderId].business.azs + 1);
			if(users[message.senderId].business.azs < 1) return bot.reply(`\n&#10067; Вы не имеете АЗС!`)
			if(users[message.senderId].business.azs >= 3) return bot.reply('\n&#10067; Ваш бизнес имеет максимальный уровень')
			if(users[message.senderId].bills.main < azsb[0].upgrade) return bot.reply('\n&#10067; Недостаточно денег! Стоимость улучшения ' + azsb[0].upgrade + '$')
			users[message.senderId].bills.main -= azsb[0].upgrade;
			users[message.senderId].business.azs = azsb[0].id;
			bot.reply(`✔ Вы улучшили бизнес до <<${azsb[0].name}>>\nСтоимость улучшения составила ${x.upgrade}$\nТеперь заработок составляет ${x.earn}$`);
		}
		if(/^(?:бизнес улучшить магазин)/i.test(message.text)) {
			let jojo = shop.filter(x=> x.id === users[message.senderId].business.shop + 1);
			if(users[message.senderId].business.shop < 1) return bot.reply(`\n&#10067; Вы не имеете магазина!`)
			if(users[message.senderId].business.shop >= 3) return bot.reply('\n&#10067; Ваш бизнес имеет максимальный уровень')
			if(users[message.senderId].bills.main < jojo[0].upgrade) return bot.reply('\n&#10067; Недостаточно денег! Стоимость улучшения ' + jojo[0].upgrade + '$')
			users[message.senderId].bills.main -= jojo[0].upgrade;
			users[message.senderId].business.shop = jojo[0].id;
			bot.reply(`✔ Вы улучшили бизнес до <<${jojo[0].name}>>\nСтоимость улучшения составила ${x.upgrade}$\nТеперь заработок составляет ${x.earn}$`);
		};
		if(/^(?:бизнес)\s(.*)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("бизнес ");
			if(/(улучшить)/ig.test(message.text)) return;
			if(/(азс)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("бизнес азс ");
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let azsb = azs.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].business.azs > 0) return bot.reply(`\n&#10067; Вы уже имеете АЗС! Вы можете улучшить её командой 'бизнес улучшить азс'`)
				if(users[message.senderId].bills.main < azsb[0].cost) return bot.reply('\n&#10067; Недостаточно денег!')
				users[message.senderId].bills.main -= azsb[0].cost;
				users[message.senderId].business.azs = azsb[0].id;
				return bot.reply(`✔ Вы купили бизнес <<${azsb[0].name}>>`);
			}
			if(/(магазин)/ig.test(message.text)) {
				var args = message.text.toLowerCase().split("бизнес магазин ");
				if(!Number(args[1])) return bot.reply('\n&#10067; Неверный ID.')
				let mag = shop.filter(x=> x.id === Number(args[1]));
				if(users[message.senderId].business.shop >= 1) return bot.reply(`\n&#10067; Вы уже имеете магазин! Вы можете улучшить его командой 'бизнес улучшить магазин'`)
				if(users[message.senderId].bills.main < mag[0].cost) return bot.reply('\n&#10067; Недостаточно денег!')
				users[message.senderId].bills.main -= mag[0].cost;
				users[message.senderId].business.shop = mag[0].id;
				return bot.reply(`✔ Вы купили бизнес <<${mag[0].name}>>`);
			}
		};		
		if(/^(?:телефон)$/i.test(message.text)) {
			bot.reply(`вы можете приобрести >>

			${phone.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

			Вам стоит подкопить на >>

			${phone.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

			Чтобы купить телефон нужно написать 'телефон [ID]`)
		};
		if(/^(?:телефон)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("телефон ");
			if(!Number(args[1])) return bot.reply('\n&#10067; Укажите ID');
			var phones = phone.filter(x=> x.id === Number(args[1]));
			if(users[message.senderId].misc.phone > 0) return bot.reply('\n&#10067; У вас есть телефон! Вы можете его продать')
			if(users[message.senderId].bills.main < phones[0].cost) return bot.reply('\n&#10067; Недостаточно денег!');
			users[message.senderId].bills.main -= phones[0].cost;
			users[message.senderId].misc.phone = phones[0].id;
			return bot.reply(`✔ Вы купили телефон <<${phones[0].name}>>`)
		};
		if(/^(?:валюта)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("валюта ");
			if(!Number(args[1])) return bot.reply('\n&#10067; Неверное кол-во валюты!');
			if(Number(args[1]) < 100000) return bot.reply('\n&#10067; Минимальное кол-во валюты для покупки - 100000$')
			var summa = 0;
			summa = Number(args[1])/100000
			var url = "";
			await vk.api.utils.getShortLink({url: `https://qiwi.com/payment/form/99?amountFraction=0&currency=RUB&extra%5B%27account%27%5D=79771501628&extra%5B%27comment%27%5D=https://vk.com/id${message.senderId}/val&amountInteger=${summa}`, bool: 1, version: 3.0})
			.then((response) => {
					url = response.short_url;
			});			
			bot.reply(`количество валюты: ${Number(args[1])}$\nК оплате: ${summa} рублей\nОплатить здесь: ${url}`)
		}
		if(/^(?:донат)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("донат ")
			if(!args[1]) return bot.reply(`
			&#4448; &#128312; VIP >> 49 рублей
			&#4448; &#128312; Admin >> 249 рублей

			&#4448; &#128313; Валюта >> 1 рубль - 100000$

			Приобрести донат можно написав мне "донат [желаемая привилегия]"
			или купить монеты, написав мне "валюта [кол-во]"`);
			if(/(вип)/ig.test(args[1])) {
				var url = "";
				await vk.api.utils.getShortLink({url: `https://qiwi.com/payment/form/99?amountFraction=0&currency=RUB&extra%5B%27account%27%5D=79771501628&extra%5B%27comment%27%5D=https://vk.com/id${message.senderId}/vip&amountInteger=49.00`, bool: 1, version: 3.0})
				.then((response) => {
						url = response.short_url;
				});
				bot.reply(`\nПокупка только здесь! Сгенерированная ссылка -- ${url}
				&#4448;	Стоимость: 49 рублей

				&#4448;	Возможности:

				&#4448;&#4448; 😎 Накрути [0-1000000]\n&#4448;&#4448;&#4448; Интервал: раз в сутки
				&#4448;&#4448; 💎 Бонус \n&#4448;&#4448;&#4448; Интервал: раз в 12 часов
				&#4448;&#4448; 🐩 Ник [новый_ник]
				&#4448;&#4448; 🎰 Казино [ставка]\n&#4448;&#4448;&#4448; ❓ Преимущества: Процент удачи увеличен на 10%, а выигрыш до x1.7
				&#4448;&#4448; 🔐 Сейф [1-6]\n&#4448;&#4448;&#4448; ❓ Интервал: уменьшен до раз в час`)
			} else if(/(админ)/ig.test(args[1])) {
				var url = "";
				await vk.api.utils.getShortLink({url: `https://qiwi.com/payment/form/99?amountFraction=0&currency=RUB&extra%5B%27account%27%5D=79771501628&extra%5B%27comment%27%5D=https://vk.com/id${message.senderId}/admin&amountInteger=249.00`, bool: 1, version: 3.0})
				.then((response) => {
						url = response.short_url;
				});
				bot.reply(`\nПокупка только здесь! Сгенерированная ссылка -- ${url}
				&#4448; Стоимость: 249 рублей

				&#4448; Возможности:

				&#4448;&#4448;  😎 Накрути [0-10000000]\n&#4448;&#4448;&#4448; ❓ Интервал: раз в 48 часов
				&#4448;&#4448;  💎 Бонус \n&#4448;&#4448;&#4448; ❓ Интервал: раз в 5 часов
				&#4448;&#4448;  🐩 Ник [новый_ник]
				&#4448;&#4448;  🎰 Казино [ставка]\n&#4448;&#4448;&#4448; ❓ Преимущества: Процент удачи увеличен на 20%, а выигрыш до x1.8
				&#4448;&#4448;  🔐 Сейф [1-6]\n&#4448;&#4448;&#4448; ❓ Интервал: уменьшен до раз в 30 минут
				&#4448;&#4448;  ⚠ eval [операция]`)
			}
		};
		if(/^(?:жилье|жильё)$/i.test(message.text)) {
			bot.reply(`вы можете приобрести >>

			${properties.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🌍 >> Расположение: ${x.map}`).join('\n')}

			Вам стоит подкопить на >>

			${properties.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$\n&#4448; 🌍 >> Расположение: ${x.map}`).join('\n')}

			Чтобы купить жильё нужно написать 'жильё [ID]'`);
		};
		if(/^(?:жилье)\s(.*)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("жилье ");
			if(!Number(args[1])) return bot.reply('\n&#10067; ID неверный!');
			let prop = properties.filter(x=> x.id === Number(args[1]));
			if(users[message.senderId].properties.place1 >= 1) return bot.reply(`\n&#10067; Вы уже имеете жильё! Вы можете продать его командой 'продать жильё'`)
			if(users[message.senderId].bills.main < prop[0].cost) return bot.reply('\n&#10067; Недостаточно денег!')
			users[message.senderId].bills.main -= prop[0].cost;
			users[message.senderId].properties.place1 = prop[0].id;
			return bot.reply(`✔ Вы купили жильё <<${prop[0].name}>>`);
		};
		if(/^(?:бонус)/i.test(message.text)) {
			if(users[message.senderId].cooldowns.bonus) return bot.reply('Возвращайтесь позже!')
			var bonus = 0;
			if(users[message.senderId].group === 0) {
				bonus = 1000
			};
			if(users[message.senderId].group === 1) {
				bonus = 10000
			};
			if(users[message.senderId].group === 2) {
				bonus = 200000
			};
			users[message.senderId].bills.main += bonus;
			bot.reply('Вы получили ежедневный бонус в размере ' + bonus + '$.');
			users[message.senderId].cooldowns.bonus = true;
			if(users[message.senderId].group === 0) {
					setTimeout(() => {
					users[message.senderId].cooldowns.bonus = false;
				}, 86400000)
			};
			if(users[message.senderId].group === 1) {
					setTimeout(() => {
					users[message.senderId].cooldowns.bonus = false;
				}, 43200000)
			};
			if(users[message.senderId].group === 2) {
					setTimeout(() => {
					users[message.senderId].cooldowns.bonus = false;
				}, 18000000)
			};
		};
		if(/^(?:трейд) (вверх|вниз)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("трейд ");
			if(/(вверх)/ig.test(args[1])) {
				var vverh = message.text.toLowerCase().split("трейд вверх ");
				vverh = betParser(vverh[1]);
				var x = utils.random(100);
				if(!Number(vverh)) return bot.reply(`\n&#10067; Введите ставку, например: Трейд вверх 1к или Трейд вверх вабанк`);
				if(vverh > 100000000) return bot.reply('\n&#10067; Максимальная ставка - 100.000.000$');
				if(vverh > users[message.senderId].bills.main) return bot.reply('\n&#10067; Недостаточно средств!');
				if(x >= 70) {
					users[message.senderId].bills.main += Math.floor(vverh*1.45)
					bot.reply('Курс поднялся вверх на ' + utils.random(50) + '% и вы заработали ' + intParser(Math.floor(vverh*1.45)) + '$ [x1.45]' + `\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`)
				} else if(x < 70) {
					users[message.senderId].bills.main -= Math.floor(vverh);
					bot.reply('Курс обвалился на ' + utils.random(50) + '%. Вы проиграли ' + intParser(Math.floor(vverh)) + '$' + `\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`);
				}
			};
			if(/(вниз)/ig.test(args[1])) {
				var vniz = message.text.toLowerCase().split("трейд вниз ");
				vniz = betParser(vniz[1]);
				var x = utils.random(100);
				if(!Number(vniz)) return bot.reply(`\n&#10067; Введите ставку, например: Трейд вниз 1к или Трейд вниз вабанк`);
				if(vniz > 100000000) return bot.reply('\n&#10067; Максимальная ставка - 100.000.000$');
				if(vniz > users[message.senderId].bills.main) return bot.reply('\n&#10067; Недостаточно средств!');
				if(x >= 70) {
					users[message.senderId].bills.main += Math.floor(vniz*1.45)
					bot.reply('Курс обвалился на ' + utils.random(50) + '% и вы заработали ' + intParser(Math.floor(vniz*1.45)) + '$ [x1.45]' + `\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`)
				} else if(x < 70) {
					users[message.senderId].bills.main -= Math.floor(vniz);
					bot.reply('Курс поднялся вверх на ' + utils.random(50) + '%. Вы проиграли ' + intParser(Math.floor(vniz)) + '$' + `\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`);
				}
			};
			if(args[1] === "") return bot.reply(`\n&#10067; Укажите и предугадайте рост и ставку, например: Трейд вверх 1к или Трейд вверх вабанк`);
		};
		if(/^(?:инфа)\s(.*)/i.test(message.text)) {
			bot.reply('&#128312; Вероятность - ' + utils.random(1, 101) + '%')
		};
		if(/^(?:накрути)\s([0-9])/i.test(message.text)) {
			var args = message.text.toLowerCase().split("накрути ");
			args[1] = betParser(args[1]);
			if(!Number(args[1])) return bot.reply('ввести можно только число')
			if(users[message.senderId].group < 1) return bot.reply('команда доступна с VIP. Приобрести VIP можно, написав мне "донат"')
			if(users[message.senderId].cooldowns.cheat) return bot.reply('время ещё не прошло! Попробуйте позже.')
			if(users[message.senderId].group === 1) {
				if(Number(args[1]) > 1000000) return bot.reply('максимальную сумму, которую вы можете взять - 1.000.000$. Приобретите Admin, чтобы расширить лимит, напишите мне "донат"')
					users[message.senderId].bills.main += Math.floor(args[1]);
				bot.reply('ваш счёт был пополнен на ' + Math.floor(args[1]) + '$. Вы сможете накрутить деньги снова через сутки.')
				users[message.senderId].cooldowns.cheat = true;
				setTimeout(() => {
					users[message.senderId].cooldowns.cheat = false;
				}, 86400000);
			};
			if(users[message.senderId].group === 2) {
				if(Number(args[1]) > 100000000) return bot.reply('максимальную сумму, которую вы можете взять - 10.000.000$.')
					users[message.senderId].bills.main += Math.floor(args[1]);
				bot.reply('ваш счёт был пополнен на ' + Math.floor(args[1]) + '$. Вы сможете накрутить деньги снова через 2 дня.')
				users[message.senderId].cooldowns.cheat = true;
				setTimeout(() => {
					users[message.senderId].cooldowns.cheat = false;
				}, 172800000);
			};
			if(users[message.senderId].group === 3) {
				users[message.senderId].bills.main += Math.floor(args[1]);
				bot.reply('ваш счёт был пополнен на ' + Math.floor(args[1]) + '$')
			}
		};
		if(/^(?:профиль)/i.test(message.text)) {
			let previes = ['VIP', 'Admin', 'Developer'];
			bot.reply(`ваш профиль:

			&#4448; 💡 Привилегия: ${users[message.senderId].group === 0 ? 'Обычный игрок' : previes[users[message.senderId].group - 1]}${users[message.senderId].marriage.partner !== 0 ? `\n\n&#4448; &#128141; В браке с ` + users[users[message.senderId].marriage.partner].tag + '\n' : ''}
			&#4448; 💲 Счета >>
			&#4448;&#4448; 💰 Денег: ${intParser(users[message.senderId].bills.main)}$
			&#4448;&#4448; 💠 Алмазов: ${users[message.senderId].bills.diamonds} шт.

			&#4448; 🏢 Бизнесы >>
			&#4448;&#4448; 🚗 АЗС: ${users[message.senderId].business.azs === 0 ? 'отсутствует' : azs[users[message.senderId].business.azs - 1].name}
			&#4448;&#4448; 🏬 Магазин: ${users[message.senderId].business.shop === 0 ? 'отсутствует' : shop[users[message.senderId].business.shop - 1].name}
			&#4448;&#4448; 👺 Криминал: ${users[message.senderId].business.drugs === 0 ? 'отсутствует' : drugs[users[message.senderId].business.drugs - 1].name}

			&#4448; 🚌 Транспорт >>
			&#4448;&#4448; 🚘 Автомобиль: ${users[message.senderId].transport.car === 0 ? 'отсутствует' : car[users[message.senderId].transport.car - 1].name}
			&#4448;&#4448; ✈ Самолёт: ${users[message.senderId].transport.plane === 0 ? 'отсутствует' : plane[users[message.senderId].transport.plane - 1].name}
			&#4448;&#4448; 🚁 Вертолёт: ${users[message.senderId].transport.helicopter === 0 ? 'отсутствует' : helicopter[users[message.senderId].transport.helicopter - 1].name}
			&#4448;&#4448; ⛴ Яхта: ${users[message.senderId].transport.yacht === 0 ? 'отсутствует' : yacht[users[message.senderId].transport.yacht - 1].name}

			&#4448; 🔒 Имущество >>
			&#4448;&#4448; 🔑 1 место: ${users[message.senderId].properties.place1 === 0 ? 'свободно' : properties[users[message.senderId].properties.place1 - 1].name + '\n&#4448;&#4448;&#4448; 🌏 Расположение: ' + properties[users[message.senderId].properties.place1 - 1].map}			
			
			&#4448;&#4448; ☢ Бункер${users[message.senderId].bunker.is === 0 ? ': отсутствует' : ' >>\n&#4448;&#4448;&#4448; ✅ Название: ' + bunker[users[message.senderId].bunker.is - 1].name +  ' \n&#4448;&#4448;&#4448; 🌏 Расположение: ' + bunker[users[message.senderId].bunker.is - 1].map}

			&#4448; 💼 Дополнительно >>
			&#4448;&#4448; 📱 Телефон: ${users[message.senderId].misc.phone === 0 ? 'отсутствует' : phone[users[message.senderId].misc.phone - 1].name}
			&#4448;&#4448; 🖥 Ноутбук: ${users[message.senderId].misc.notebook === 0 ? 'отсутствует' : notebook[users[message.senderId].misc.notebook - 1].name}

			&#4448; 💻 Статистика >>
			&#4448;&#4448; 😉 Побед: ${intParser(users[message.senderId].stats.wins)} раз
			&#4448;&#4448; 💔 Поражений: ${intParser(users[message.senderId].stats.loses)} раз`);
		};
		if(/^(?:яхта)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("яхта ");
			let yach = yacht.filter(x=> x.id === Number(args[1]));
			if(!yach[0]) {return bot.reply('\n❌ Яхта не найдена!')};
			if(users[message.senderId].transport.yacht > 1) return bot.reply('\n❌ У вас уже есть яхта. Вы можете продать её командой "продать яхта"');
			if(yach[0].cost > users[message.senderId].bills.main) return bot.reply('\n❌ Недостаточно денег для покупки.');
			users[message.senderId].bills.main -= yach[0].cost;
			users[message.senderId].transport.yacht = yach[0].id;
			return bot.reply(`✔ Вы купили яхту <<${yach[0].name}>>`)		
		};
		if(/^(?:яхта)$/i.test(message.text)) {
			bot.reply(`список яхт, на которые вам хватит денег >>

				${yacht.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Список яхт, на которые вам стоит подкопить >>

				${yacht.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Для покупки напиши 'яхта [ID]'`)
		};
		if(/^(?:вертолет|вертолёт)$/i.test(message.text)) {
			bot.reply(`список вертолётов, на которые вам хватит денег >>

				${helicopter.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Список вертолётов, на которые вам стоит подкопить >>

				${helicopter.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Для покупки напиши 'вертолет [ID]'`)
		};
		if(/^(?:вертолет)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("вертолет");
			let heli = helicopter.filter(x=> x.id === Number(args[1]));
			if(!heli[0]) {return bot.reply('\n❌ Вертолёт не найден!')};
			if(users[message.senderId].transport.helicopter > 1) return bot.reply('\n❌ У вас уже есть вертолёт. Вы можете продать его командой "продать вертолёт"');
			if(heli[0].cost > users[message.senderId].bills.main) return bot.reply('\n❌ Недостаточно денег для покупки.');
			users[message.senderId].bills.main -= heli[0].cost;
			users[message.senderId].transport.helicopter = heli[0].id;
			return bot.reply(`✔ Вы купили вертолёт <<${heli[0].name}>>`)
		};
		if(/^(?:вертолёт)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("вертолёт");
			let heli = helicopter.filter(x=> x.id === Number(args[1]));
			if(!heli[0]) {return bot.reply('\n❌ Вертолёт не найден!')};
			if(users[message.senderId].transport.helicopter > 1) return bot.reply('\n❌ У вас уже есть вертолёт. Вы можете продать его командой "продать вертолёт"');
			if(heli[0].cost > users[message.senderId].bills.main) return bot.reply('\n❌ Недостаточно денег для покупки.');
			users[message.senderId].bills.main -= heli[0].cost;
			users[message.senderId].transport.helicopter = heli[0].id;
			return bot.reply(`✔ Вы купили вертолёт <<${heli[0].name}>>`)
		};
		if(/^(?:машина|авто)$/i.test(message.text)) {
			bot.reply(`список автомобилей, на которые вам хватит денег >>

				${car.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Список автомобилей, на которые вам стоит подкопить >>

				${car.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Для покупки напиши 'авто [ID]'`)
		};
		// adm
		if(/^(?:\#eval)\s(.*)/i.test(message.text))
		{
			if([462951787].indexOf(message.senderId) !== -1)
			{
				let toEval = message.text.split('#eval ');
				toEval = toEval.slice(1).join(' ');
				bot.reply(`результат: ${eval(toEval, null, '&#8195;')}`);
			} else return bot.reply('доступно с привилегии <<Admin>>, подробнее "донат"');
		}
		if(/^(?:самолет)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("самолет ");
			let aero = plane.filter(x=> x.id === Number(args[1]));
			if(!aero[0]) {return bot.reply('\n❌ Самолёт не найден')};
			if(users[message.senderId].transport.plane > 1) return bot.reply('\n❌ У вас уже есть самолёт. Вы можете продать его командой "продать самолёт"');
			if(aero[0].cost > users[message.senderId].bills.main) return bot.reply('\n❌ Недостаточно денег для покупки.');
			users[message.senderId].transport.plane = aero[0].id;
			users[message.senderId].bills.main -= aero[0].cost;
			return bot.reply(`✔ Вы купили самолёт <<${aero[0].name}>>`);
		};
		if(/^(?:самолёт)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("самолёт ");
			let aero = plane.filter(x=> x.id === Number(args[1]));
			if(!aero[0]) {return bot.reply('\n❌ Самолёт не найден')};
			if(users[message.senderId].transport.helicopter > 1) return bot.reply('\n❌ У вас уже есть самолёт. Вы можете продать его командой "продать самолёт"');
			if(aero[0].cost > users[message.senderId].bills.main) return bot.reply('\n❌ Недостаточно денег для покупки.');
			users[message.senderId].transport.plane = aero[0].id;
			users[message.senderId].bills.main -= aero[0].cost;
			return bot.reply(`✔ Вы купили самолёт <<${aero[0].name}>>`);
		};
		if(/^(?:самолет|самолёт)$/i.test(message.text)) {
			bot.reply(`список самолётов, на которые вам хватит денег >>

				${plane.filter(x=> x.cost <= users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Список самолётов, на которые вам стоит подкопить >>

				${plane.filter(x=> x.cost > users[message.senderId].bills.main).map(x=> `📕 ID >> ${x.id} | ${x.name} — ${x.cost}$`).join('\n')}

				Для покупки напиши 'самолёт [ID]'`)
		};
		if(/^(?:авто)\s[0-9]/i.test(message.text)) {
			var args = message.text.toLowerCase().split("авто ")
			let carz = car.filter(x=> x.id === Number(args[1]));
			if(!carz[0]) { return bot.reply(`\n❌ Машина не найдена!`) }
			if(users[message.senderId].transport.car > 1) return bot.reply('\n❌ У вас уже есть машина. Вы можете продать её командой "продать авто"')

			if(carz[0].cost > users[message.senderId].bills.main) return bot.reply(`\n❌ Недостаточно денег для покупки.`);

			users[message.senderId].bills.main -= carz[0].cost;
			users[message.senderId].transport.car = carz[0].id;
			return bot.reply(`✔ Вы купили машину <<${carz[0].name}>>.`);
		}
		if(/^(?:казино)\s([0-9]|вабанк)/i.test(message.text)) {
			let args = message.text.toLowerCase().split("казино ");
			args[1] = betParser(args[1]);
			if(!Number(args[1])) return bot.reply(`\n&#10067; Введите ставку, например: Казино 1к или Казино вабанк`);

			let t = utils.random(1, 9);

			const WIN = `${t} | ${t} | ${t}`;
			const LOSE = `${utils.random(1, 9)} | ${utils.random(1, 9)} | ${utils.random(1, 9)}`;

			if(users[message.senderId].bills.main < args[1]) return bot.reply(`\n&#10060; Недостаточно средств.`);
			if(args[1] > 1000000000) return bot.reply('\n&#10060; Максимальная ставка - 1000.000.000 $')
			else if(users[message.senderId].bills.main >= args[1])
			{
				users[message.senderId].bills.main -= args[1];

				let x = utils.random(0, 100);
				if(x >= 70)
				{
					var win_dollars = 0;
					if(users[message.senderId].group === 0) {
						win_dollars += Math.floor(args[1] * 1.65)
					} else if(users[message.senderId].group === 1) {
						win_dollars += Math.floor(args[1] * 1.7)
					} else if(users[message.senderId].group === 2) {
						win_dollars += Math.floor(args[1] * 1.8)
					} else if(users[message.senderId].group === 3) {
						win_dollars += Math.floor(args[1] * 2)
					};
					users[message.senderId].stats.wins += 1;
					users[message.senderId].bills.main += win_dollars;
					return bot.reply(`[ ${WIN} ]

					&#4448; &#10004; Вы выиграли ${intParser(win_dollars)}$
					&#4448; &#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`);
				} else if(x < 70)
				{
					users[message.senderId].stats.loses += 1;
					users[message.senderId].bills.main += Math.floor(args[1] * 0.25);
					return bot.reply(`[ ${LOSE} ]

						&#4448; &#10060; Вы проиграли и ваша ставка умножилась на [x0.25] -- ${intParser(Math.floor(args[1] * 0.25))}$
						&#4448; &#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`);
				}
			}
		};
		if(/^(?:дуэль)/i.test(message.text)) {
			const x = utils.random(0, 100);
			if(users[message.senderId].bills.main < 200)
			{
				return bot.reply('\n&#10060; Твой баланс ниже 200 монет, вы не можете участвовать с таким низким балансом!')
			};
			if(x >= 50)
			{
				users[message.senderId].stats.wins += 1;
				users[message.senderId].bills.main *= 2;
				return bot.reply(`&#10004; Ты выиграл! Твой баланс был умножен в два раза.\n\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`)
			} else if(x < 50)
			{
				users[message.senderId].stats.loses += 1;
				users[message.senderId].bills.main = 0;
				return bot.reply(`&#10060; Ты проиграл\n\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`)
			}
		};
		if(/^(?:сейф)/i.test(message.text)) {
			var args = message.text.toLowerCase().split("сейф ");
			if(users[message.senderId].cooldowns.safe) return bot.reply('попробуй позже!');
			if(!Number(args[1])) return bot.reply('укажи число от 1 до 6, чтобы взломать сейф')
			const templates = utils.pick(['1', '2', '3', '4', '5', '6']);
				if(args[1] === templates) {
					users[message.senderId].stats.wins += 1;
					users[message.senderId].cooldowns.safe = true;
				if(users[message.senderId].group === 0) {
						setTimeout(() => {
						users[message.senderId].cooldowns.safe = false;
					}, 86400000)
				};
				if(users[message.senderId].group === 1) {
						setTimeout(() => {
						users[message.senderId].cooldowns.safe = false;
					}, 43200000)
				};
				if(users[message.senderId].group === 2) {
						setTimeout(() => {
						users[message.senderId].cooldowns.safe = false;
					}, 18000000)
				}
				users[message.senderId].bills.main += 100000;
				return bot.reply(`ты забрал 100000$!\n\n&#128176; Ваш баланс: ${intParser(users[message.senderId].bills.main)}$`)
			} else if(args[1] !== templates) {
					users[message.senderId].stats.loses += 1;
					users[message.senderId].cooldowns.safe = true
					if(users[message.senderId].group === 0) {
							setTimeout(() => {
							users[message.senderId].cooldowns.bonus = false;
						}, 86400000)
					};
					if(users[message.senderId].group === 1) {
							setTimeout(() => {
							users[message.senderId].cooldowns.bonus = false;
						}, 43200000)
					};
					if(users[message.senderId].group === 2) {
							setTimeout(() => {
							users[message.senderId].cooldowns.bonus = false;
						}, 18000000)
					};
					return bot.reply('ПИН неверный, тебя поймали :(')
				}
		};
	})
}