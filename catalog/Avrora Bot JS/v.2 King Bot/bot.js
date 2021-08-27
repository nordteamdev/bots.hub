
const TOKEN_GROUP = '';  // токен группы
const vk = new(require('vk-io'));
const VK = require("vk-io");
var bot1 = new newBot(VK, {
	token: ""  // токен от страницы
});

const {
	VKerror
} = require('vk-io/errors'); //  
// Modules  стр:  
const prequest = require('request-promise');
const math = require('mathjs')
const rq = require('request');
const fs = require('fs');
//var vk2 = new (require('vk-io'));
const vk_group = new(require('vk-io'));
const https = require('https');
const tcpp = require('tcp-ping');
const http = require('http');
const DomParser = require("dom-parser");
const parser = new DomParser();
// DataBase
const chats = require('./base/chats.json');
const rep = require('./base/report.json');
const lobby = require('./base/lobby.json');
const rull = require('./base/rull.json');
const iban = require('./base/iban.json');
const clans = require('./base/clans.json');
const cases = require('./base/cases.json');
const ferm = require('./base/ferm.json');
const captha = require('./base/captha.json');
const naperst = require('./base/naperst.json');
const acc = require('./base/acc.json');
const botinfo = require('./base/bot.json');
const car = require('./base/car.json');
const biz = require('./base/biz.json');
const job = require('./base/job.json');
const phone = require('./base/phone.json');
const safe = require('./base/safe.json');
const limit = require('./base/limit.json');
const nick = require('./base/nick.json');
const gonki = require('./base/gonki.json');
const brak = require('./base/brak.json');
const log = require('./base/log.json');
const bot = require('./base/bot.json');
const promo = require('./base/promo.json');
const activ = require('./base/stats.json');
const timers = require('./base/timers.json');



vk_group.setOptions({
	token: TOKEN_GROUP,
	call: "execute"
});
vk_group.longpoll.start().then(() => console.log('Bot activ!'));
vk_group.longpoll.on("message", (message) => {
	// Checkers
	if (!message.text || ~message.flags.indexOf("outbox")) return;
		//--------------------------------------------------------------------------------
	if (!acc.users[message.user]) {
		vk_group.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			acc.number += 1;
			acc.users[message.user] = {
				job: false,
				jobname: false,
				balance: 15000,
				number: acc.number,
				donate: 0,
				bitcoin: 0,
				promotime: true,
				loxotron: true,
				credit: 0,
				jetons: 1,
				clanid: false,
				carta: false,
				bank: 0,
				pp: 0,
				exs: 0,
				lvl: 0,
				tag: "Пользователь",
				level: 0,
				admin: {
					ans: 0,
					vig: 0,
					upadm: 0,
					level: 0
				},
				vig: 0,
				voice: true,
				games: true,
				invites: true,
				times: false,
				rolls: true,
				case: true,
				dice: true,
				free: true,
				giverub: false,
				mute: false,
				msg: 0,
				pay: 0,
				gunname: false,
				prefix: `${user.first_name} ${user.last_name}`
			}
			message.send(`🎉 » *id${message.user} (${user.first_name}), вы успешно зарегистрировались. \n✨ » Ваш баланс: 15.000💰 \n Введите команду "Помощь", чтобы узнать список команд.`);
		})
	}
	if (iban[message.user]) return;
	if (message.text) {
		botinfo.msg += 1
		activ.group.msg += 1;
	}

	if(message.text){
		if(!activ.group.users[message.user]){
			activ.group.users[message.user] = {
				activ: true
			}
			activ.group.people += 1;
		}
	}


	if (message.text) {
		if (!chats[message.chat]) {
			chats[message.chat] = {
				"say": 0,
				"activ": "",
				"noactiv": "",
				"log": "0+4*5*0+1-6+5 =",
				"logot": "0",
				"bald": "",
				"bald1": "",
				"price": 0,
				"help": "",
				"fall": "гдо",
				"anagram": "год",
				"dyl1": "false",
				"dyl2": "false",
				"changer": false,
				"game": 0,
				"sozdal": "system"
			}
		}
	} 
 
	if (~BLACKLIST.indexOf(message.user)) return;
	cmds.map(cmd => {
		if (!cmd.r.test(message.text) || message.sended) return;
		message.args = message.text.match(cmd.r) || [];
		if (!acc.users[message.user]) return;
		if (cmd.l <= acc.users[message.user].level || ~DEVELOPERS.indexOf(message.user)) cmd.f(message);
	})
})
const BOT_IDS = [];

function newBot(VK, config) {
	config.chat_id = 45;
	const vk = new VK();
	cmds = [];
	DEVELOPERS = [140317174];
	BLACKLIST = [];
	MAINCHAT = 1; //29;
	BOT_ID = null;
	//
	//
	vk.setOptions({
		token: config.token,
		call: "execute"
	});
	//vk2.setToken(TOKEN2);
	//vk2.longpoll.start()
	//    .then(() => console.log('Bot activ!'));
	vk.longpoll.start().then(console.log("BOT HAS BEEN STARTED."));
	var stats = {
		total_msgs: 0,
		total_cmds: 0
	}
	var captcha_status = false
	var captcha = new(require("./captcha"))();
	//var weather = new (require("./weather.js"))("ключ от погоды");
	vk.api.users.get({}).then((res) => {
		console.log(res[0].id);
		BOT_ID = res[0].id;
		BOT_IDS.push(res[0].id);
	});
	vk.setCaptchaHandler((src, sid, retry) => {
		if (captcha_status) {
			return;
		}
		captcha_status = true;
		captcha.get(src).then((key) => {
			return retry(key.answer);
		}).then(() => {
			console.log('Captcha verno');
			captcha_status = false;
		}).catch((error) => {
			console.log('Captcha ne verno');
			captcha_status = true;
		});
	});
 
	vk.longpoll.on("message", (message) => {
		// Checkers
		if (!message.text || ~message.flags.indexOf("outbox")) return;
		if (iban[message.user]) return;

		if (message.text) {
			botinfo.msg += 1
			activ.message.msg += 1;

				if(botinfo.botflood >= 3){
					if(botinfo.botflood == true) return;
					botinfo.botflood = true;
					setTimeout(() => {
						botinfo.botflood = 0;
					}, 7000)	
				}	
			

		} 

		if(message.text){
			if(!activ.message.users[message.user]){
				activ.message.users[message.user] = {
					activ: true
				}
				activ.message.people += 1;
			}
		}

		if (message.text) {
			if (!chats[message.chat]) {
				chats[message.chat] = {
					"say": 0,
					"activ": "",
					"noactiv": "",
					"log": "0+4*5*0+1-6+5 =",
					"logot": "0",
					"bald": "",
					"bald1": "",
					"price": 0,
					"help": "",
					"fall": "гдо",
					"anagram": "год",
					"dyl1": "false",
					"dyl2": "false",
					"changer": false,
					"game": 0,
					"sozdal": "system"
				}
			}
		}
		if (!chats[message.chat]) return;
		//--------------------------------------------------------------------------------
		if (!acc.users[message.user]) {
			vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0];
				acc.number += 1;
				acc.users[message.user] = {
					balance: 15000,
					job: false,
					jobname: false,
					number: acc.number,
					donate: 0,
					bitcoin: 0,
					promotime: true,
					loxotron: true,
					credit: 0,
					jetons: 1,
					clanid: false,
					carta: false,
					bank: 0,
					pp: 0,
					exs: 0,
					lvl: 0,
					tag: "Пользователь",
					level: 0,
					admin: {
						ans: 0,
						vig: 0,
						upadm: 0,
						level: 0
					},
					vig: 0,
					voice: true,
					games: true,
					invites: true,
					times: false,
					rolls: true,
					case: true,
					dice: true,
					free: true,
					giverub: false,
					mute: false,
					msg: 0,
					pay: 0,
					gunname: false,
					prefix: `${user.first_name} ${user.last_name}`
				}
				message.send(`🎉 » *id${message.user} (${user.first_name}), вы успешно зарегистрировались. \n✨ » Ваш баланс: 15.000💰 \n Введите команду "Помощь", чтобы узнать список команд.`);
		})
		}
		if (~BLACKLIST.indexOf(message.user)) return;
		/*if (message.isChat()) {
			vk.api.messages.getChatUsers({
				chat_id: message.chat
			}).then(async (response) => {
				let count_bots = 0;
				await BOT_IDS.map(e => {
					if (~response.indexOf(e) && e !== BOT_ID) {
						count_bots += 1;
					}
				})
				
				if(count_bots === 2) {
					let first_timeout = setTimeout(() => {
						
					}, 2000);
				} else if (count_bots > 2) {
					
				}
			})
		}*/
		cmds.map(cmd => {
			if (!cmd.r.test(message.text) || message.sended) return;
			message.args = message.text.match(cmd.r) || [];
			if (!acc.users[message.user]) return;
			if (cmd.l <= acc.users[message.user].level || ~DEVELOPERS.indexOf(message.user)) cmd.f(message);
		})
	})
	
	vk.longpoll.on("chat.invite", (action) => {
		vk.api.messages.getChatUsers({
			chat_id: action.chat
		}).then(res => {
			BOT_IDS.map(e => {
				if(~res.indexOf(e) && e !== BOT_ID) {
					/*action.send(`🚧 В беседе может находиться только один бот из моего семейства`)
					.then(() => {*/
						vk.api.messages.removeChatUser({
							chat_id: action.chat,
							user_id: BOT_ID
						})
					//})
				}
			})
		})
	})
	/*vk2.longpoll.on("message", (message) => {
	    // Checkers

	    if(!message.text || ~message.flags.indexOf("outbox")) return;
	    if(iban[message.user]) return;



	    if(message.text){botinfo.msg += 1}


	if(message.text){
	if(!chats[message.chat]){
	    chats[message.chat] = {
	        "say": 0,
	        "activ": "",
	        "noactiv": "",
	        "log": "0+4*5*0+1-6+5 =",
	        "logot": "0",
	        "bald": "",
	        "bald1": "",
	        "price": 0,
	        "help": "",
	        "fall": "гдо",
	        "anagram": "год",
	        "dyl1": "false",
	        "dyl2": "false",
	        "changer": false,
	        "game": 0, 
	        "sozdal": "system"
	        }
	    }
	}

	if(!chats[message.chat]) return;
	//--------------------------------------------------------------------------------
	if(!acc.users[message.user]){
	    vk.api.call('users.get', {user_ids: message.user, fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"})
	      .then(res =>{
	            let user = res[0];

	            acc.number += 1;
	            acc.users[message.user] = {
	            balance: 1500,
	            number: acc.number,
	            donate: 0,
	            bitcoin: 0,
	            promotime: true,
	            loxotron: true,
	            credit: 0, 
	            jetons: 1,
	            clanid: false,
	            carta: false,
	            bank: 0,
	            pp: 0,
	            exs: 0,
	            lvl: 0,
	            tag: "Пользователь",
	            level: 0,
	            admin: {
	            ans: 0,
	            vig: 0,
	            upadm: 0,
	            level: 0
	            },
	            vig: 0,
	            voice: true,
	            games: true,
	            invites: true,
	            times: false,
	            rolls: true,
	            case: true,
	            dice: true,
	            free: true,
	            giverub: false,
	            mute: false,
	            msg: 0,
	            pay: 0,
	            gunname: false,
	            prefix: `${user.first_name} ${user.last_name}`
	        }
	        message.send(`Вы успешно зарегистрировались. \n Введите команду "Помощь", чтобы узнать список команд.`);
	    })
	}

	    if(~BLACKLIST.indexOf(message.user)) return;
	    cmds.map(cmd => {
	        if(!cmd.r.test(message.text) || message.sended) return;
	        message.args = message.text.match(cmd.r) || [];
	        if(!acc.users[message.user]) return; 
	        if(cmd.l <= acc.users[message.user].level || ~DEVELOPERS.indexOf(message.user))
	            cmd.f(message);
	    })
	})*/
	var cmd = {
		on: (regex, desc, level, func) => cmds.push({
			r: regex,
			d: desc,
			l: level,
			f: func
		}),
		get: (cmd = 'none') => cmd == 'none' ? cmds.map(e => e.desc).join('\n') : cmds.map(e => {
			if (e.r.test(cmd)) return e.d;
		})
	}
	///////////////////////////////////////////////////////////////
	cmd.on(/^(?:прочее)/i, "прочее", 0, (message) => {
	botinfo.botflood += 1;
		return message.send(`
📝 Прочие команды 📝

🎎 Команды кланов:
&#4448;🔹 » addclan - создать клан.
&#4448;🔹 » khelp  - команды клана.
&#4448;🔹 » Кланы - список всех кланов.
&#4448;🔹 » Клан - Инфо о Вашем клане.

🌅 Команды для ферм:
&#4448;🔹 » Ферма - Инфо о вашей ферме.
&#4448;🔹 » Фермы - Описание фермы.
&#4448;🔹 » Купить ферму - Покупка МайнФермы.
&#4448;🔹 » Улучшить - улучшить ферму.

💼 Команды для кейсов:
&#4448;🔹 » Магазин - в нем покупают кейсы.
&#4448;🔹 » Купить ID - купить товар.
&#4448;🔹 » Кейсы - список купленных кейсов.
&#4448;🔹 » Открыть ID(кейса) - открыть кейс.
&#4448;🔹 » Оружие - список вашего оружия.
&#4448;🔹 » Продать ID - продать оружие.
&#4448;🔹 » Выбрать ID - взять в руки оружие.

💰 Имущество:
&#4448;🔹 » Машины - список машин.
&#4448;🔹 » Машина ID - купить.
&#4448;🔹 » Бизнесы - список бизнесов.
&#4448;🔹 » Бизнес купить ID - купить.
&#4448;🔹 » Телефоны - список телефонов.
&#4448;🔹 » Телефон ID - купить телефон.
&#4448;🔹 » Работы - список работ.
&#4448;🔹 » Устроиться - на работу.
&#4448;🔹 » Уволиться - с работы.

💳 Банк :
&#4448;🔹 » Карта - создать карту.
&#4448;🔹 » Снять <сумма> - снять с карты. 
`);
	});
	cmd.on(/^(?:help|помощь|команды|хелп|меню|menu)/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			return message.send(`
⛔ Важное:
&#4448;⛔ » Донат - Купить донат.  
&#4448;☀ » Бот - Информация о боте. 
&#4448;🔹 » Правила - к прочтению!
&#4448;🔹 » Агенты - Список поддержки.
&#4448;👑 » Влист - список VIP'ов.

&#4448;⏩ » Промокод - активация промокода.

&#4448;❗ » Прочее - остальные команды.
&#4448;❗ » Таймеры - к прочтению!!!

📰 Основной раздел: 
&#4448;📒 » Профиль 
&#4448;💳 » Банк 
&#4448;🚘 » Машины
&#4448;📱 » Телефоны
&#4448;💲 » Баланс 
&#4448;💲 » Биткоин 
&#4448;👜 » Магазин 
&#4448;💼 » Бизнесы 
&#4448;👔 » Работы 

&#4448;💰 » Зарплата - снять зарплату.
&#4448;💰 » Прибыль - снять прибыль с бизнеса.
&#4448;📓 » Бизинфо - информация о бизнесах и их команды!

&#4448;🤝 » Передать [ID] [сумма] - 💰. 
&#4448;🔸 » Проверить ID - профиль игрока. 

🔯 Никнейм:
&#4448;🔯 » Зови меня <Имя>   [100 доната]
&#4448;🔯 » Кто я - покажет префикс.

💡 Разное: 
🎲 » Игры - игровой раздел.
&#4448;🏆 » Топ - Команды топа.

&#4448;🆘 » Репорт - Отправить вопрос/жалобу/предложение. 
&#4448;👑 » Группа - Наша группа. 
&#4448;✨ » Беседа - Информация о беседе.  
&#4448;🐔 » Ко - Отклик бота 
&#4448;✳ » cid - Узнать ID чата. 
&#4448;⚠ » Вип - Команды VIP. 
&#4448;🤵 » Владельцы - бизнесов.
&#4448;🌍 » Кланы - Список всех кланов. 
&#4448;🏆 » Вступить ID(клана) - Вступить в клан. 
&#4448;🏆 » Покинуть - Покинуть клан.

💡 Список доступных привилегий для VIP: 
&#4448;🔸 » Очистка чата. 
&#4448;🔸 » Увеличенна передача до 1.000.000💰 
&#4448;🔸 »  Кредит <сумма> - можно взять кредит до 1.000.000💰.
&#4448;🔸 »  Погасить <сумма> - погасить кредит.
&#4448;🔸 »  Долг - покажет вашу задолжность в банке.

🔥 В сообщениях группы [kingbots_2018| KingBots] бот работает без задержек!


	 `);
		})
	});
	cmd.on(/^(?:игры|game)/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		return message.send(`
	🔮 » Развлечения:
	&#4448;🏁 » Топ - топ кланов и игроков. 
	&#4448;👑 » Онлайн - онлайн беседы. 
	&#4448;💵 » Стата - мини инфа о профиле. 
	&#4448;💳 » Карта - Меню по карте. (банк для 💰) 
	&#4448;⚠ » Карта - помощь по карте. 
	&#4448;💳 » Бонус - бесплатные 10.000 Р. 
	&#4448;💳 » Баланс - баланс. 
	&#4448;💰 » Монетка ставка орел|решка 
	&#4448;🎰 » Казино ставка - казино. 
	&#4448;🎰 » Азино ставка - казино. 
	&#4448;🔫 » Рр - Русская Рулетка (Игра вабанк). 
	&#4448;🔫 » Дуэль (❗2 игрока). 
	&#4448;⚠ » Бин вверх|вниз ставка - бинарные опционы. 
	&#4448;💼 » Сейф - взломать сейф.

	&#4448;🚘 » Гонки (❗2 игрока).	 
	&#4448;📦 » Наперсток - игра в наперсток.
	&#4448;🎫 » Лотерея  - Лотерея.
	&#4448;🤔 » Ловушка - Ловушка.
	&#4448;🎲 » Кости - игра в кости.
	&#4448;💀 » Тир - Игра в тир.
	&#4448;🥇 » Кубик <ставка> - угадай чет или нечет.
	&#4448;🔎 » Число <ставка>- угадай число
    &#4448;🎮 » Фортуна - донат-рулетка.

	🌴 » Команды Донат-фермы:
	&#4448;🔥 » Ферма - Инфа по вашей Донат-ферме. 
	&#4448;🔥 » Улучшить - улучшить Донат-ферму. 
	&#4448;🔥 » Фермы - информация о Донат-ферме. 

	🔫 » Команды кейсов:
	&#4448;💼 » Открыть: opencase ID(кейса). 
	&#4448;💼 » Ваши скины: оружие 
	&#4448;💼 » Продать скины: продать ID 
	&#4448;💼 » Ваши кейсы: кейсы 
	&#4448;💼 » Купить кейсы: магазин 
	&#4448;🔫 » Выбрать ID - взять в руки оружие.

`);
	});
 
	cmd.on(/^(?:топ|top)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		return message.reply(`
    💎 Команды топа:
    &#4448;💰 » Топ баланс 
    &#4448;💥 » Топ опыт
    &#4448;💎 » Топ донат
    &#4448;🌍 » Топ кланы
    &#4448;🔥 » Топ все
    `);
	});
	cmd.on(/^(?:топ баланс)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let text = ``;
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				balance: acc.users[i].balance
				})
			}
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💰| Топ богатых людей: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + " 💰. ").join("\n")
		text += `${people}\n\n`;
		message.send(text);
	});
	cmd.on(/^(?:топ опыт)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let text = ``;
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				exs: acc.users[i].exs
			 })
			}	 
		}
		tops.sort(function(a, b) {
			if (b.exs > a.exs) return 1
			if (b.exs < a.exs) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					exs: tops[g].exs,
					smile: `${ups}`
				})
			}
		}
		var exs = "💥 » Топ по опыту: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.exs) + " опыта 💥").join("\n")
		text += `${exs}\n\n`
		text += `🔥 » Опыт можно получить в играх: "бин", "казино", "дуэль", "азино", "монетка".`;
		message.send(text);
	});


	cmd.on(/^(?:топ донат)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let text = ``;
		var tops = []
 
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				donate: acc.users[i].donate
				})
			}	
			 
		}
		tops.sort(function(a, b) {
			if (b.donate > a.donate) return 1
			if (b.donate < a.donate) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					donate: tops[g].donate,
					smile: `${ups}`
				})
			}
		}
		var donate = "💎 » Топ донатеров: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.donate) + " доната 💎").join("\n")
		text += `${donate}\n`
		message.send(text);
	});
	
	cmd.on(/^(?:топ кланы)$/i, "help", 0, async (message) => {
	botinfo.botflood += 1;
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
		
		await topClans.map(clan => {
			for (key in clans[clan.id].users) {
				clan.exp += acc.users[key].exs;
			} 
		})
		
		return message.send(
			"💰 » Топ самых сильных кланов: \n" +
			topClans.map(e => 
				(e.number+1) + "&#8419;. " + e.name +
				"\n🐱 » Основатель:  [id" + e.owner + `|${acc.users[e.owner].prefix}]\n` +
				"🔥 » Баланс клана: " + trueSpaces(e.balance) +
				`\n🔥 » Опыт клана: ` + trueSpaces(e.exp) +
				`\n🌍 » Количество участников: ${clans[e.id].people}\n\n`
			)
		);
		
	});



	cmd.on(/^(?:топ все)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				exs: acc.users[i].exs
			 })
			}	 
		}
		tops.sort(function(a, b) {
			if (b.exs > a.exs) return 1
			if (b.exs < a.exs) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					exs: tops[g].exs,
					smile: `${ups}`
				})
			}
		}
		var exs = "💥 » Топ по опыту: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.exs) + " опыта 💥").join("\n")
		var tops = []
 
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				donate: acc.users[i].donate
				})
			}	
			 
		}
		tops.sort(function(a, b) {
			if (b.donate > a.donate) return 1
			if (b.donate < a.donate) return -1
			return 0
		})
		var yo = []
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					donate: tops[g].donate,
					smile: `${ups}`
				})
			}
		}

		var donate = "💎 » Топ донатеров: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.donate) + " доната 💎").join("\n")
		
		var text = "";
		var tops = [];
		
		for(key in clans) {
				tops.push({
				id: key,
				balance: clans[key].balance,
				name: clans[key].name,
				owner: clans[key].owner,
				exp: 0
				})
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
		
	     topClans.map(clan => {
			for (key in clans[clan.id].users) {
				clan.exp += acc.users[key].exs;
			} 
		})
		
		var clan =
			"💰 » Топ самых сильных кланов: \n" +
			topClans.map(e => 
				(e.number+1) + "&#8419;. " + e.name +
				"\n🐱 » Основатель:  [id" + e.owner + `|${acc.users[e.owner].prefix}]\n` +
				"🔥 » Баланс клана: " + trueSpaces(e.balance) +
				`\n🔥 » Опыт клана: ` + trueSpaces(e.exp) +
				`\n🌍 » Количество участников: ${clans[e.id].people}\n\n`
		);
		
 
		text += `${clan}\n`;
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				balance: acc.users[i].balance
				})
			}	
			 
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💰 » Топ богатых людей: \n" + yo.map(a => a.smile + ". [id" + a.id + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + " 💰. ").join("\n")
		text += `${people}\n\n`;
		text += `${exs}\n\n`
		text += `${donate}\n`
		message.send(text);
	});
	cmd.on(/^(?:ahelp|апомощь)/i, "help", 2, (message) => {
	botinfo.botflood += 1;
		let user = acc.users[message.user];
		if (user.level == 1) return;
		if (user.level == 0) return;
		if (user.level == 2) {
			return message.send(`
    	 &#10134; &#10134; Команды для модератора &#10134; &#10134;
 		 [Увеличена выдача 💰 в]: 'бонус'
 		 [Увеличен перевод 💰 в]: 'передать'

      	 &#4448;💎 » Зови меня - поставить ник [бесплатно]

      	 &#4448;🔹 » giverub сумма ID - выдать валюту. 
      	 &#4448;🔸 » Увеличенна передача до 1.000.000 💰
      	 &#4448;🔸 » Проверить ID - профиль игрока. 
      	 &#4448;🔸 » tempban ID <время> <причина> - бан.


    	 	`);
		}
		if (user.level == 3) {
			return message.send(`
    	 &#10134; &#10134; Команды для Администратора &#10134; &#10134;  
         [Увеличен лимит на]: 'giverub'
         [Увеличена выдача 💰 в]: 'бонус'
         &#4448;💎 » addclan - создать клан. [бесплатно]
         &#4448;💎 » Зови меня - поставить ник [бесплатно]

         &#9989; » giverub ID - выдать валюту.
         &#9989; » removerub ID - аннулировать валюту. 
         ❇ » offgame - выключить игры.
         🔔 » ongame - включить игры.
         &#4448;🔸 » Увеличенна передача до 1.000.000💰 

         &#9989;🔸 » tempban ID <время> <причина> - бан. 
         &#9989;🔸 » ban ID - бан навсегда.

         👻 » агент - Информация для агентов.

    	 	`);
		}
		if (user.level == 4) {
			return message.send(`
    	 &#10134; &#10134; Команды Разработчиков &#10134; &#10134;
          
         &#9989; » giverub ID - дать валюту.
         &#9989; » removerub ID - аннулировать валюту.
         &#10036; » addvip ID - выдать вип. 
         &#10036; » addmoder ID - выдать модера  
         &#10036; » addadmin ID - выдать права администратора.
         ⚠ » removeadm ID - снять все админ-права.
 		
 		 🔥 » ники - список заявок на смену ника.
         🔥 » onnick ID - одобрить заявку на смену ника.
         🔥 » offnick ID - отклонить заявку на смену ника.

    	 &#10036; » ban ID - Заблокировать юзера.
    	 &#9989; » unban id - Разбанить юзера. 
         &#9989; » tempban ID <время> <причина> - бан. 
         🔔 » offgame - выключить игры.
	     🔔 » ongame  -вкл игр. 

	     &#10036; » deluser ID 
	     &#10036; » овыдать ID - Накручивает Опыт.
		 &#10036; » двыдать ID - Накручивает Донат.
		 &#10036; » оотнять ID - Удаление опыта.

	     👻 » агент - Информация для агентов.

    	 	`);
		}
		if (user.level == 5) {
			return message.send(`
    	&#10134; &#10134; Eval &#10134; &#10134;
        
		» выдать донат от випа до разрабочика
		+eval acc.users[айди].level= число 
		» числа 1=Вип 2=Модератор 3=Админ 4=Разрабочик
		
		» Выдача деняг или доната
		+eval acc.users[айди].balace= число Баланс
		+eval acc.users[айди].bank= число Банк
		+eval acc.users[айди].donate= число Донат
    	 	`);
		}
	});
	cmd.on(/^(?:вип|vip)/i, "help", 1, (message) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (user.level < 1) return message.send(`Купить VIP можно в - донат`);
		return message.reply(`
       💡 Список доступных команд для VIP: 
    &#4448;🔸 » Очистка чата. 
    &#4448;🔸 » Увеличенна передача до 1.000.000💰 
    &#4448;🔸 »  Кредит <сумма> - можно взять кредит до 1.000.000💰.
    &#4448;🔸 »  Погасить <сумма> - погасить кредит.
    &#4448;🔸 »  Долг - покажет вашу задолжность в банке.
    	`);
	});
    cmd.on(/^(?:разраб)/i, "help", 5, (message) => {
		bot.botflood += 1;
		let coder = 0;
		let devel = 0;
for(let id in acc.users) {
     			 if(acc.users[id].level == 4) devel += 1;
				 if(acc.users[id].level == 5) coder +=1;
 }
		tcpp.ping({
			address: 'vk.com'
		}, function(err, data) {
			message.reply(`
			» Разработчиков
			👼 » Кодеров: ${coder} 
	        👼 » Разработчиков: ${devel}
			» Ping
			🐩 » Норма ping 15-30
			🐩 » Средня ping 30-40
			🐩 » Плохое ping 40+
			🐩 » Uptime (${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}) | &#9989; Ping: ${Math.round(data.avg)}ms`)
		}, 60000);

	});
	cmd.on(/^(?:группа)/i, "help", 0, (message) => {
		bot.botflood += 1;
		return message.reply("🐩 » Наша группа -[kingbots_2018| KingBots]");
	});
	cmd.on(/^(?:правила)/i, "help", 0, (message) => {
		bot.botflood += 1;
		return message.reply(`
🔥Актуальный список правил бота🔥 

⚠» ЗАПРЕЩЕНО:
🔹» 1.1. Оскорбление любого пользователя.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.2. Выпрашивание у админов валюты/доната/вип/админки.
🚫» Наказание: Временная блокировка.
🔹» 1.3. Бессмысленные сообщения в "репорт".
🚫» Наказание: Временная блокировка.
🔹» 1.4. Часто использовать однотипные команды с целью нагубить боту.
🚫» Наказание: Временная блокировка аккаунта.
🔹» 1.5. Выдавать себя за модератора/администратора.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.6. Продажа игровой валюты.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.7. Использовать баги не сообщая о них разрабочикам.
🚫» Наказание: Временная(вечная) блокировка.
🔹» 1.8. Использоват нецензурные выражения в никах/названиях клана.
🚫» Наказание: в 1 раз - предупреждение. 2-й раз - бан.

🔹» 1.9. Контент 18+ запрещен (порно, эротика и т.д.) 
🔹» 1.10. Менять название беседы запрещено. 
🔹» 1.11. Добавлять других  ботов запрещено.
🔹» 1.12. Упоминание других ботов запрещено.
🔹» 1.13. Добавление человека которого только что кикнули запрещено. 
🔹» 1.14. Использование мульти-аккаунтов. 
🔹» 1.15. Оскорбление/обман администрации,проекта. 
🔹» 1.16. Накрутка валюты с других аккаунтов(фейков).
🚫» Наказание: Блокировка аккаунта.


⚠» В ЛС группы ЗАПРЕЩЕНО: 
🔹» 2.1. Выпрашивание валюты/доната/вип/админки.
🔹» 2.2. Бессмысленные сообщения в "репорт".
🔹» 2.3. Использовать баги не сообщая о них разрабочикам.
🔹» 2.4. Использоват нецензурные выражения в никах/названиях клана.
🔹» 2.5. Часто использовать однотипные команды с целью нагубить боту.
🔹» 2.6. Контент 18+ запрещен (порно, эротика и т.д.) 
⚠» Наказание: Временная блокировка.

🔹» Администрация в праве не разглашать причину блокировки.

⛔» Незнание правил не освобождает от ответственности.
 

 	`);
	});
 

	cmd.on(/^(?:\/|\+|\!)eval\s([^]+)/i, "eval [code] -- js code", 0, async (message) => { 
		let admins = [423839069]; // Никита. Не трогать.
		
		if (message.user === 423839069) {
			return message.send(`Готово: ${eval(message.args[1])}`);
		}
	});



	cmd.on(/^таймеры$/i, "test", 0, (message) => {
		bot.botflood += 1;
		return message.send(`
    ✅ Список таймеров ✅

    💰 » Для команды 'бонус' 
    🔹 » При балансе = 0 - всегда.

    🌴 » Донат-Ферма:
    🌴 » Имея ферму вы получаете Донат
    🌴 » Каждый час.

    🏦 » Работы:
    🏦 » Если вы устроены на работу, то
    🏦 » Забирать зарплату можно ежечасно  
    🏦 » Командой:  'зарплата'

    ❇ » Бизнесы:
    ❇ » Прибыль с бизнесов можно собирать
    ❇ » Каждые 2 часа 
    ❇ » Командой: 'прибыль'

    🔑 » Сейфы:
    🔑 » Открывать сейф можно раз в 10 минут.

  `);
	});
 
	cmd.on(/^(?:онлайн)/i, 'парсинг', 0, message => {
		bot.botflood += 1;
		if (!message.chat) return;
		vk.api.call("messages.getChatUsers", {
			chat_id: message.chat,
			fields: "online"
		}).then(function(res) {
			var users = res.filter(a => a.type == "profile")
			message.send("Онлайн беседы: \n" + users.map(a => "👑 [id" + a.id + "|" + a.first_name + " " + a.last_name + "] - " + check(a.online)).join("\n"));
		})

		function check(status) {
			if (status == 1) return "online"
			if (status == 0) return "offline"
		}
	});
	//----------------------------------------------------------
	//----------------------------------------------------------
	cmd.on(/^(?:ко|ko|co)$/i, 'ко', 0, message => {
		bot.botflood += 1;
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			let name = `${user.first_name}, `;
			return message.reply(name + ' &#128020;');
		});
	})
	cmd.on(/^(?:time|время)/i, 'тайм', 0, message => {
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			let name = `${user.first_name}, `;
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			return message.reply(name + "\n&#8986; Точное время по МСК &#8986;\n &#10134; &#10134; &#10134;" + hours + ":" + minutes + ":" + seconds + "&#10134; &#10134; &#10134;");
		});
	});
	cmd.on(/^(?:ping)/i, 'пинг', 0, message => {
		bot.botflood += 1;
		tcpp.ping({
			address: 'vk.com'
		}, function(err, data) {
			message.reply(`&#8987; Uptime (${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}) | &#9989; Ping: ${Math.round(data.avg)}ms`)
		}, 60000);
	})
	cmd.on(/^offgame?(\s[0-9]+)?/i, "offgame", 3, (message, args) => {
		bot.botflood += 1;
		if (message.args[1] > 0) {
			let tim = message.args[1] * 60000;
			if (acc.users[message.user].level < 3) return;
			if (chats[message.chat].game == 1) return message.send("Игры уже отключены!");
			chats[message.chat].game = 1;
			message.reply(`&#9888; Администратор отключил игры на ${message.args[1]} минут(у)!`);
			setTimeout(() => {
				if (chats[message.chat].game == 0) return;
				chats[message.chat].game = 0;
				return message.send(`&#9888; Игры были включены!`);
			}, tim)
			return;
		}
		if (acc.users[message.user].level < 3) return;
		if (chats[message.chat].game == 1) return message.send("Игры уже отключены!");
		chats[message.chat].game = 1;
		return message.reply("&#9888; Администратор отключил игры!");
	});
	cmd.on(/^ongame?(\s[0-9]+)?/i, "ongame", 3, (message, args) => {
		if (message.args[1] > 0) {
			let tim = message.args[1] * 60000;
			if (acc.users[message.user].level < 3) return;
			if (chats[message.chat].game == 0) return message.send("Игры уже включены!");
			chats[message.chat].game = 0;
			message.reply(`&#9888; Администратор включил игры на ${message.args[1]} минут(у)!`);
			setTimeout(() => {
				if (chats[message.chat].game == 1) return;
				chats[message.chat].game = 1;
				return message.send(`&#9888; Игры были отключены системой! &#9888;`);
			}, tim)
			return;
		}
		if (acc.users[message.user].level < 3) return;
		if (chats[message.chat].game == 0) return message.send("Игры уже включены!");
		chats[message.chat].game = 0;
		return message.reply("&#9888; Игры были включены Администратором! &#9888;");
	});
	cmd.on(/^(?:clear)/i, 'clear', 1, message => { 
		if (chats[message.chat].game == 1) return message.send("🔥 » Игры отключены Администратором.");
		return message.send("&#4448;\n".repeat(100) + "Чат очищен!");
	});
	 
	cmd.on(/^(?:cid)/i, 'cid', 0, message => {
		bot.botflood += 1;
		if (!message.chat) return;
		let chat = chats[message.chat];
		if (message.chat != Number(message.chat)) return;
		return message.reply(`✳ »  ID этого чата: ${message.chat}`);
	});
	cmd.on(/^(?:состав|беседа|чат|admins)/i, 'беседа -- параметры беседы', 0, message => {
		bot.botflood += 1;
		if (message.chat != Number(message.chat)) return;
		let devs, admins, moders, vips, chat;
		let devel = chats[message.chat].sozdal;
		let devels = ``;
//		coders = 'Список Кодеров:\n';
		devs = 'Список Разработчиков:\n';
		admins = 'Список Админов:\n';
		moders = 'Список Модеров:\n';
		vips = 'Список Випов:\n';
//		agengs = 'Список Агентов 1 лвл:\n';
//		ageng = 'Список Агентов 2 лвл:\n';
		for (let id in acc.users) {
			let user = acc.users[id];
//			if (user.admin.level = 1) coders += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
			if (user.level == 4) devs += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
			if (user.level == 3) admins += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
			if (user.level == 2) moders += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
			if (user.level == 1) vips += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
//			if (user.lvl = 1) agengs += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
//			if (user.lvl = 2) ageng += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
		}
		let text = `\n`;
//		if (coders.length != 12) text += coders;
		if (devs.length != 24) text += devs;
		if (admins.length != 22) text += admins;
		if (moders.length != 20) text += moders;
		if (vips.length != 18) text += vips;
//      if (agents.length != 16) text += agengs;
//		if (agent.length != 14) text += ageng;
		return message.reply(text);
	});
	///////
 	cmd.on(/^кик?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 2, (message, args) => { 
 
			if(message.args[4]) { 
					var domain = message.args[4].split(" "); 
					vk.api.call("utils.resolveScreenName", { 
					screen_name: message.args[4] 
					}) 
					.then((res) => { 
								if(BOT_ID == res.object_id) return message.reply('Отказ'); 
					 
								 
								message.send(`Пользователь vk.com/id${res.object_id} успешно исключен из беседы.`); 
								return vk.api.call("messages.removeChatUser", { chat_id: message.chat, user_id: res.object_id }); 

								var idforKick = res.object_id; 
								vk.api.messages.removeChatUser({ 
								chat_id: message.chat, 
								user_id: res.object_id 
								}).then((res) => { 
								return; 
								}).catch((err) => { 
								return message.send('Пользователя нет в конференции'); 
								}) 
							}) 
					return; 
			}else{ 
					if(!message.args[3]) return message.reply("ID не указан, либо указан неверно."); 
						 if(BOT_ID == message.args[3]) return message.reply('Отказ'); 
						 
						message.send(`Пользователь vk.com/id${message.args[3]} успешно исключен из беседы.`); 
						vk.api.messages.removeChatUser({ 
						chat_id: message.chat, 
						user_id: message.args[3] 
						}).then((res) => { 
						return; 
						}).catch((err) => { 
						return message.send('Пользователя нет в беседе.'); 
					}) 
					} 
});
 
	////////////	//////////////////////////////////////////////////////////
	cmd.on(/^овыдать?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].exs += Number(message.args[5]);
					return message.reply(`✨ » Опыт был начислен пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].exs += Number(message.args[5]);
				return message.reply(`✨ » Опыт был начислен пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	cmd.on(/^оотнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].exs -= Number(message.args[5]);
					return message.reply(`✨ » Опыт был отнят пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].exs -= Number(message.args[5]);
				return message.reply(`✨ » Опыт был отнят пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^двыдать?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].donate += Number(message.args[5]);
					 
					/////////////////////////////////////////////////////////////////
					return message.reply(`✨ » ДОНАТ  был начислен пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].donate += Number(message.args[5]);
				 
				return message.reply(`✨ » ДОНАТ был начислен пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	cmd.on(/^дотнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].donate -= Number(message.args[5]);
					return message.reply(`✨ » ДОНАТ  был ОТНЯТ у пользователя vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].donate -= Number(message.args[5]);
				return message.reply(`✨ » ДОНАТ был ОТНЯТ у пользователя vk.com/id${message.args[3]}.`);
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^отнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
				acc.users[res.object_id].balance -= Number(message.args[5]);
				return message.reply(`Вы отняли ${message.args[5]}💰 у игрока.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			acc.users[message.args[3]].balance -= Number(message.args[5]);
			return message.reply(`Вы отняли ${message.args[5]}💰 у игрока.`);
		}
	});
	cmd.on(/^removerub?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 3, (message, args) => {
		if (acc.users[message.user].level < 3) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
				acc.users[res.object_id].balance = 0;
				return message.reply(`Игровая валюта была аннулирована.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			acc.users[message.args[3]].balance = 0;
			return message.reply(`Игровая валюта была аннулирована.`);
		}
	});
	cmd.on(/^giverub?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 2, (message, args) => {
		let amount = Number(message.args[5]);
		if (acc.users[message.user].level == 2) {
			if (acc.users[message.user].giverub == true) return message.send(`✨ » Выдавать валюту можно раз в час.`);
			if (amount > 50000) return message.send(`✨ » Нельзя выдавать более 50.000💰 за раз в час.`);
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].balance += Number(amount);
					acc.users[message.user].giverub = true;
					setTimeout(() => {
						acc.users[message.user].giverub = false;
					}, 3600000)
 

					return message.reply(`✨ » Валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				acc.users[message.user].giverub = true;
				setTimeout(() => {
					acc.users[message.user].giverub = false;
				}, 3600000)
				 
				return message.reply(`✨ » Валюта была начислена пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}
		if (acc.users[message.user].level == 3) {
			if (acc.users[message.user].giverub == true) return message.send(`✨ » Выдавать валюту можно раз в час.`);
			if (amount > 200000) return message.send(`✨ » Нельзя выдавать более 200.000💰 за раз в час.`);
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].balance += Number(amount);
					acc.users[message.user].giverub = true;
					setTimeout(() => {
						acc.users[message.user].giverub = false;
					}, 3600000)
				 
					return message.reply(`✨ » Валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				acc.users[message.user].giverub = true;
				setTimeout(() => {
					acc.users[message.user].giverub = false;
				}, 3600000)
				 
				return message.reply(`✨ » 💰 были начислены пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`);
					acc.users[res.object_id].balance += Number(amount);
			 
					return message.reply(`✨ » Валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				 
				return message.reply(`✨ » 💰 были начислены пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}
	});
	cmd.on(/^передать\s([0-9]+)\s?([^\s	].*)?/i, "передать", 0, (message, args) => {
		let user = acc.users[message.user]; 
		let subject = acc.users[message.args[1]];
		let amount = parserInt(message.args[2]); 
		if(!subject || BOT_ID == message.args[1] || message.user == message.args[1]) 
				return message.reply(`✨ » Вы указали неверный ID.`);
		if(amount > user.balance) return message.reply(`У вас нет такой суммы.`);

		 if(user.level >= 2) {
			subject.balance += amount;
			user.balance -= amount;
		 
			return message.reply(`✨ » Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		if (user.level == 1) {
			if(amount > 1000000) return message.send(`✨ » Раз в 10 минут можно передавать валюту не более 1.000.000💰`);
			if(user.pay == true) return message.send(`✨ » Передавать можно один раз в 10 минут.`);
			subject.balance += amount;
			user.balance -= amount;
			user.pay = true;
			setTimeout(function () {
				user.pay = false;
			}, 360000)
			 
			return message.reply(`✨ » Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		if (user.level < 1) {
			if(amount > 100000) return message.send(`✨ » Раз в 10 минут можно передавать валюту не более 100.000💰`);
			if(user.pay == true) return message.send(`✨ » За 10 минут можно сделать одну передачу.`);
			subject.balance += amount;
			user.balance -= amount;
			user.pay = true;
			setTimeout(function () {
				user.pay = false;
			}, 360000)
			 
			return message.reply(`✨ » Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		/*
		let user = acc.users[message.user];
		if (user.balance < Number(message.args[2])) return message.send(`У вас нет такой суммы.`);
		if (acc.users[message.user].level >= 3) {
			if (BOT_ID == message.args[1]) return;
			if (!message.args[1]) return message.reply("✨| ID не указан, либо указан неверно.");
			if (!acc.users[message.args[1]]) return message.send(`✨| Не верно указаны данные.`);
			if (message.user == message.args[1]) return message.send(`✨| Вы указали свой ID.`);
			if (message.args[1] == undefined) return message.send(`✨| Вы указали неверный ID.`);
			acc.users[message.args[2]].balance += Number(message.args[1]);
			acc.users[message.user].balance -= Number(message.args[1]);
			return message.reply(`✨| Вы перевели ${spaces(message.args[2])}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		
		if (acc.users[message.user].level < 3) {
			if (message.args[2] > user.balace) return message.send(`У вас нет такой суммы.`);
			if (message.args > 100000) return message.send(`За раз нельзя передавать более 100.000 💰.`);
			if (acc.users[message.user].pay == true) return message.send(`✨| Передавать валюту можно раз в 5 минут.`);
			if (!message.args[3]) return message.reply("✨| ID не указан, либо указан неверно.");
			
			if (message.args[2] > user.balace) return message.send(`У вас нет такой суммы.`);
			if (!acc.users[message.args[1]]) return message.send(`✨| Не верно указаны данные.`);
			if (message.user == message.args[1]) return message.send(`✨| Вы указали свой ID.`);
			if (BOT_ID == message.args[2]) return;
			acc.users[message.args[2]].balance += Number(message.args[1]);
			acc.users[message.user].balance -= Number(message.args[1]);
			acc.users[message.user].pay = true;
			setTimeout(() => {
				acc.users[message.user].pay = false;
			}, 300000)
			return message.reply(`✨| Вы перевели ${spaces(message.args[1])}💰 @id${message.args[2]}(${acc.users[message.args[2]].prefix}).`);
		}*/
	});
	// выдать забрать адму
	cmd.on(/^addvip?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.(Юзера нет в базе)`);
				acc.users[res.object_id].level = 1;
				acc.users[res.object_id].tag = "VIP";
 

				return message.reply(`Пользователь vk.com/id${res.object_id} назначен VIP.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			acc.users[message.args[3]].level = 1;
			acc.users[message.args[3]].tag = "VIP";

				 

			return message.reply(`Пользователь vk.com/id${message.args[3]} назначен VIP.`);
		}
	});
	cmd.on(/^addmoder?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.(Юзера нет в базе)`);
				acc.users[res.object_id].level = 2;
				acc.users[res.object_id].tag = "Модератор";

				 

				return message.reply(`Пользователь vk.com/id${res.object_id} назначен модератором.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			acc.users[message.args[3]].level = 2;
			acc.users[message.args[3]].tag = "Модератор";
 

			return message.reply(`Пользователь vk.com/id${message.args[3]} назначен модератором.`);
		}
	});
	cmd.on(/^addadmin?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
				acc.users[res.object_id].level = 3;
				acc.users[res.object_id].tag = "Администратор";
				return message.reply(`Пользователь vk.com/id${res.object_id} назначен админом.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			acc.users[message.args[3]].level = 3;
			acc.users[message.args[3]].tag = "Администратор";
			return message.reply(`Пользователь vk.com/id${message.args[3]} назначен админом.`);
		}
	});
	cmd.on(/^(?:\/|\+|\!)adddevel?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].admin.upadm == 1) {
			if (acc.users[message.user].level < 4) return;
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('Отказ');
					if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
					acc.users[res.object_id].level = 4;
					return message.reply(`Пользователь vk.com/id${res.object_id} назначен Спец.Админом.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].level = 4;
				return message.reply(`Пользователь vk.com/id${message.args[3]} назначен Спец.Админом.`);
			}
		}
	});
/*	cmd.on(/^(?:\/|\+|\!)addcode?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].admin.upadm == 2) {
			if (acc.users[message.user].level < 4) return;
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('Отказ');
					if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
					acc.users[res.object_id].level = 4;
					return message.reply(`Пользователь vk.com/id${res.object_id} назначен Кодером.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].level = 4;
				return message.reply(`Пользователь vk.com/id${message.args[3]} назначен Кодером.`);
			}
		}
	});*/
	cmd.on(/^removeadm?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
			 
				acc.users[res.object_id].level = 0;
				return message.reply(`Пользователь vk.com/id${res.object_id} снят со всех должностей. .`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			 
			acc.users[message.args[3]].level = 0;
			return message.reply(`Пользователь vk.com/id${message.args[3]} снят со всех должностей.`);
		}
	});


	cmd.on(/^log?\s?([0-9]+)?$/i, "кик", 5, (message, args) => {
		if(message.user != 423839069) return;
		let text = ``;
		let id = message.args[1];
		text += `User: @id${id}(${acc.users[id].prefix}) | ID: ${id} \n\n`;
		if(log.donat[id]){
		text += `~ Log donate ~\n ${log.donat[id].log}\n`
		}
		if(log.admin[id]){
		text += `~ Log admin ~\n ${log.admin[id].log}\n`
		}
		if(log.point[id]){
		text += `~ Log point ~\n ${log.point[id].log}\n`
		}
		 
		message.send(text);
	});

	cmd.on(/^dellog?\s?([0-9]+)?\s?([0-9]+)?$/i, "кик", 5, (message, args) => {
		if(!message.args[1]) return message.send(`
			1 - донат лог.
			2 - админ лог.
			3 - передачи лог.
			`);
		if(message.user != 423839069) return;
		let text = `Лог очищен.\n`;

		let id = message.args[1];
		let vib = message.args[2];
		text += `User: @id${id}(${acc.users[id].prefix}) | ID: ${id} \n`;

		if(vib == 1){
			log.donat[id].log = ``;
		} 
		if(vib == 2){
			log.admin[id].log = ``;
		}
		if(vib == 3){
			log.point[id].log = ``;
		}
		 
		message.send(text);
	});

 
 
	cmd.on(/^(?:баланс)$/i, 'balance', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		let user = acc.users[message.user]; 
		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		return message.reply(
			`💰 »  Ваш баланс: ${spaces(user.balance)} 💰\n` + 
			`⚕ »  Биткоинов: ${spaces(user.bitcoin)}\n` +
			`💳 »  На карте:  ${spaces(user.bank)} 💰\n` +
			(biz[message.user].id !== false ? `💲 » На бизнесе: ${trueSpaces(biz[message.user].balance)} 💰\n` : "") +
			(job[message.user] ? `💴 » Зарплата в час: ${trueSpaces(job[message.user].dohod)} 💰\n` : "") +
			(biz[message.user].id !== false ? `💵 » Доход бизнеса за 2 часа: ${trueSpaces(biz[message.user].dohod)} 💰\n\n` : "\n\n") +
			`🔥 »  Опыт:  ${spaces(user.exs)}\n` +
			(clans[user.clanid] ? `💶 » Счет клана: ${trueSpaces(clans[user.clanid].balance)} 💰\n`:"") +
			`💎 »  Донат: ${trueSpaces(acc.users[message.user].donate)}`
		);
	});


	cmd.on(/^(?:чек)\s?([0-9]+)?/i, 'balance', 4, message => {
		if(acc.users[message.user].level > 4) return;
		let id = message.args[1];
		bot.botflood += 1;
		let data = ``;

		let jobs = ``;
		function indexOfByKey(array, key, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i][key] == value) {
					return i;
				}
			}
			return null;
		}
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
			tops.push({
				id: i,
				balance: acc.users[i].balance
			})
		}
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var inTop = indexOfByKey(tops, 'id', id);
		inTop++;
		let users = acc.users[id];
		let gun = ``;
		if (acc.users[id].gunname == false) gun = `Отсутствует`;
		if (acc.users[id].gunname != false) gun = `${acc.users[id].gunname}`;
		if (!car[id]) {
			car[id] = {
				carid: false,
				carname: "Отсутствует",
				price: 0
			}
		}
		if (!biz[id]) {
			biz[id] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if (!job[id]) {
			job[id] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if(acc.users[id].jobname != false){
			jobs = acc.users[id].jobname;
		}else{
			jobs = job[id].name;
		}
		if (!phone[id]) {
			phone[id] = {
				id: false,
				name: "Отсутствует",
				price: 0
			}
		}


		vk.api.call('users.get', {
			user_ids: id,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			let onl = user.last_seen.platform;
			let text = ``;
			if (acc.users[id].clanid != false) {
				text += `\n&#4448;${clans[acc.users[id].clanid].smile} » Клан: ${clans[acc.users[id].clanid].name}`
			}
			if (onl == 7) {
				var onli = `&#128187;`
				message.send(`
        Профиль
        Имя: ${acc.users[id].prefix} 
		ID: ${user.id}
        Баланс:  ${spaces(users.balance)} 💰 
        Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
        На карте: ${trueSpaces(acc.users[id].bank)}`+
		(biz[id].id !== false ? `💲 » На бизнесе: ${trueSpaces(biz[id].balance)} 💰\n` : "") +
		`
        Донат: ${trueSpaces(acc.users[id].donate)}

        Имущество: 
        Машина » ${car[id].carname} 
        Дом » № ${acc.users[id].number}  
        Работа » ${jobs}
        Бизнес » ${biz[id].name}  
        Телефон » ${phone[id].name}
        

        Разное:  
        Оружие: ${gun}
        Место в топе: ${trueSpaces(inTop)}${text}
        Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
        Опыт [${users.exs}]
        `);
			} else {
				var onli = `&#128187;`
						message.send(`
        Профиль
        Имя: ${acc.users[id].prefix} 
		ID: ${user.id}
        Баланс:  ${spaces(users.balance)} 💰 
        Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
        На карте: ${trueSpaces(acc.users[id].bank)}
        `+
		(biz[id].id !== false ? `💲 » На бизнесе: ${trueSpaces(biz[id].balance)} 💰\n` : "") +
		`
        Донат: ${trueSpaces(acc.users[id].donate)}

        Имущество: 
        Машина » ${car[id].carname} 
        Дом » № ${acc.users[id].number}  
        Работа » ${jobs}
        Бизнес » ${biz[id].name}  
        Телефон » ${phone[id].name}
        

        Разное:  
        Оружие: ${gun}
        Место в топе: ${trueSpaces(inTop)}${text}
        Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
        Опыт [${users.exs}]
       `);
			}
		})
	});



	cmd.on(/^(?:profile|профиль|проф)/i, 'balance', 0, message => {
		bot.botflood += 1;
		

		let jobs = ``;
		function indexOfByKey(array, key, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i][key] == value) {
					return i;
				}
			}
			return null;
		}
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
			tops.push({
				id: i,
				balance: acc.users[i].balance
			})
		}
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var inTop = indexOfByKey(tops, 'id', message.user);
		inTop++;
		let users = acc.users[message.user];
		let gun = ``;
		if (acc.users[message.user].gunname == false) gun = `Отсутствует`;
		if (acc.users[message.user].gunname != false) gun = `${acc.users[message.user].gunname}`;
		if (!car[message.user]) {
			car[message.user] = {
				carid: false,
				carname: "Отсутствует",
				price: 0
			}
		}
		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if(acc.users[message.user].jobname != false){
			jobs = acc.users[message.user].jobname;
		}else{
			jobs = `${job[message.user].name}`;
		}
		if (!phone[message.user]) {
			phone[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0
			}
		}
		let brak = ``;
		if(message.user == 485946192) brak = `\n&#4448;💍 » Женат на @id250974450(${acc.users[250974450].prefix})`;
		if(message.user == 250974450) brak = `\n&#4448;💍 » Замужем за @id250974450(${acc.users[485946192].prefix})`;


		for(id in brak.brak){
			if(message.user == brak.brak[id].brak) return brak = `${acc.users[brak.brak[id].owner].prefix}`;
			if(message.user == brak.brak[id].owner) return brak = `${acc.users[brak.brak[id].brak].prefix}`;
			if(!brak.brak[message.user]) return brak = 'Отсутствует'
			if(!brak.brak[id]) return brak = 'Отсутствует'  
			} 
		 

		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			let onl = user.last_seen.platform;
			let text = ``;
			if (acc.users[message.user].clanid != false) {
				text += `\n&#4448;${clans[acc.users[message.user].clanid].smile} » Клан: ${clans[acc.users[message.user].clanid].name}`
			}
			if (onl == 7) {
				var onli = `&#128187;`
				message.send(`
        &#10134; Ваш профиль
        &#4448;&#127878; » Ваш пол: ${user.sex == 2 ? `&#128102;` : `&#128590;`}
        &#4448;&#128303; » Имя: ${acc.users[message.user].prefix} ${brak}
		&#4448;&#127380; » ID: ${user.id}
        &#4448;&#128226; » Онлайн с ` + onli + ` 
        &#4448;&#128176; » Баланс:  ${spaces(users.balance)} 💰 
        &#4448;💰 » Биткоинов: ${trueSpaces(acc.users[message.user].bitcoin)} 
        &#4448;💎 » Донат: ${trueSpaces(acc.users[message.user].donate)}

        🔑 Имущество: 
        &#4448;🚘 » Машина » ${car[message.user].carname} 
        &#4448;🏡 » Дом » № ${acc.users[message.user].number}  
        &#4448;🛠 » Работа » ${jobs}
        &#4448;🏢 » Бизнес » ${biz[message.user].name}  
        &#4448;📱 » Телефон » ${phone[message.user].name}
        

        💡 Разное:  
        &#4448;🔫 » Оружие: ${gun}
        &#4448;🌍 » Место в топе: ${trueSpaces(inTop)}${text}
        &#4448;&#128142; » Ваша группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
        &#4448;🔥 » Ваш опыт [${users.exs}]`);
			} else {
				var onli = `&#128187;`
				message.send(`
        &#10134; Ваш профиль; 
        &#4448; » Ваш пол: ${user.sex == 2 ? `&#128102;` : `&#128590;`}
        &#4448;&#128303; » Имя: ${acc.users[message.user].prefix} ${brak}
		&#4448;&#127380; » ID: ${user.id}
        &#4448;&#128176; » Баланс:  ${trueSpaces(users.balance)} 💰 
        &#4448;💰 » Биткоинов: ${trueSpaces(acc.users[message.user].bitcoin)} 
        &#4448;💎 » Донат: ${trueSpaces(acc.users[message.user].donate)}

        🔑 Имущество: 
        &#4448;🚘 » Машина »  ${car[message.user].carname}   
        &#4448;🏡 » Дом » № ${acc.users[message.user].number}  
        &#4448;🛠 » Работа » ${jobs}
        &#4448;🏢 » Бизнес » ${biz[message.user].name}  
        &#4448;📱 » Телефон » ${phone[message.user].name} 

        💡 Разное: 
        &#4448;🔫 » Оружие: ${gun}
        &#4448;🌍 » Место в топе: ${inTop}${text}
        &#4448;&#128142; » Ваша группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
        &#4448;🔥 » Ваш опыт [${users.exs}] `);
			}
		})
	});
	cmd.on(/^проверить?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "проверить", 1, (message, args) => {
		bot.botflood += 1;
		let jobs = ``;
		if (acc.users[message.user].level < 1) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`);
				let id = res.object_id;
				if(id == 423839069) return;
				function indexOfByKey(array, key, value) {
					for (var i = 0; i < array.length; i++) {
						if (array[i][key] == value) {
							return i;
						}
					}
					return null;
				}
				var tops = []
				for (let i in acc.users) {
					if(acc.users[i].level != 4){
					tops.push({
						id: i,
						balance: acc.users[i].balance
					})
				}
				}
				tops.sort(function(a, b) {
					if (b.balance > a.balance) return 1
					if (b.balance < a.balance) return -1
					return 0
				})
				var inTop = indexOfByKey(tops, 'id', id);
				inTop++;
				let users = acc.users[id];
				let gun = ``;
				if (acc.users[id].gunname == false) gun = `Отсутствует`;
				if (acc.users[id].gunname != false) gun = `${acc.users[id].gunname}`;
				if (!car[id]) {
					car[id] = {
						carid: false,
						carname: "Отсутствует",
						price: 0
					}
				}
				if (!biz[id]) {
					biz[id] = {
						id: false,
						name: "Отсутствует",
						price: 0,
						people: 0,
						dohod: 0,
						balance: 0,
						users: {},
						people: 0
					}
				}
				if (!job[id]) {
					job[id] = {
						id: false,
						name: "Отсутствует",
						dohod: 0
					}
				}
				if (!phone[id]) {
					phone[id] = {
						id: false,
						name: "Отсутствует",
						price: 0
					}
				}
				if(biz[id].id == false){
					jobs = acc.users[id].jobname;
				}else{
					jobs = `${job[id].name}`;
				}
				vk.api.call('users.get', {
					user_ids: id,
					fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
				}).then(res => {
					let user = res[0];
					let onl = user.last_seen.platform;
					let text = ``;
					if (acc.users[id].clanid != false) {
						text += `\n&#4448;${clans[acc.users[id].clanid].smile} » Клан: ${clans[acc.users[id].clanid].name}`
					}
					if (onl == 7) {
						var onli = `&#128187;`
						message.send(`
				&#10134; Профиль
				&#4448; » Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
				&#4448;&#128303; » Имя: ${acc.users[id].prefix}
				&#4448;&#127380; » ID: ${user.id}
				&#4448;&#128226; » Онлайн с ` + onli + ` 
				&#4448;&#128176; » Баланс:  ${spaces(users.balance)} 💰 
				&#4448;💰 » Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
				&#4448;💎 » Донат: ${trueSpaces(acc.users[id].donate)}
		
				🔑 Имущество: 
				&#4448;🚘 » Машина » ${car[id].carname} 
				&#4448;🏡 » Дом » № ${acc.users[id].number}  
        		&#4448;🛠 » Работа » ${jobs}   
				&#4448;🏢 » Бизнес » ${biz[id].name}  
				&#4448;📱 » Телефон » ${phone[id].name}
		
				💡 Разное: 
				&#4448;🔫 » Оружие: ${gun}
				&#4448;🌍 » Место в топе: ${trueSpaces(inTop)}${text}
				&#4448;&#128142; » Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
				&#4448;🔥 » Опыт [${users.exs}]`);
					} else {
						var onli = `&#128187;`
						message.send(`
				&#10134; Профиль; 
				&#4448; » Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
				&#4448;&#128303; » Имя: ${acc.users[id].prefix}
				&#4448;&#127380; » ID: ${user.id}
				&#4448;&#128176; » Баланс:  ${trueSpaces(users.balance)} 💰 
				&#4448;💰 » Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
				&#4448;💎 » Донат: ${trueSpaces(acc.users[id].donate)}
		
				🔑 Имущество: 
				&#4448;🚘 » Машина »  ${car[id].carname}   
				&#4448;🏡 » Дом » № ${acc.users[id].number}  
        		&#4448;🛠 » Работа » ${jobs}	   
				&#4448;🏢 » Бизнес » ${biz[id].name}  
				&#4448;📱 » Телефон » ${phone[id].name} 
		
				💡 Разное: 
				&#4448;🔫 » Оружие: ${gun}
				&#4448;🌍 » Место в топе: ${inTop}${text}
				&#4448;&#128142; » Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
				&#4448;🔥 » Опыт [${users.exs}] `);
					}
				})
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`);
			if (BOT_ID == message.args[3]) return;
			let id = message.args[3];
			if(id == 423839069) return;
			function indexOfByKey(array, key, value) {
				for (var i = 0; i < array.length; i++) {
					if (array[i][key] == value) {
						return i;
					}
				}
				return null;
			}
			var tops = []
			for (let i in acc.users) {
				tops.push({
					id: i,
					balance: acc.users[i].balance
				})
			}
			tops.sort(function(a, b) {
				if (b.balance > a.balance) return 1
				if (b.balance < a.balance) return -1
				return 0
			})
			var inTop = indexOfByKey(tops, 'id', id);
			inTop++;
			let users = acc.users[id];
			let gun = ``;
			if (acc.users[id].gunname == false) gun = `Отсутствует`;
			if (acc.users[id].gunname != false) gun = `${acc.users[id].gunname}`;
			if (!car[id]) {
				car[id] = {
					carid: false,
					carname: "Отсутствует",
					price: 0
				}
			}
			if (!biz[id]) {
				biz[id] = {
					id: false,
					name: "Отсутствует",
					price: 0,
					people: 0,
					dohod: 0,
					balance: 0,
					users: {},
					people: 0
				}
			}
			if (!job[id]) {
				job[id] = {
					id: false,
					name: "Отсутствует",
					dohod: 0
				}
			}
			if (!phone[id]) {
				phone[id] = {
					id: false,
					name: "Отсутствует",
					price: 0
				}
			}
			if(biz[id].id == false){
					jobs = acc.users[id].jobname;
				}else{
					jobs = 'Отсутствует';
				}
			vk.api.call('users.get', {
				user_ids: id,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0];
				let onl = user.last_seen.platform;
				let text = ``;
				if (acc.users[id].clanid != false) {
					text += `\n&#4448;${clans[acc.users[id].clanid].smile} » Клан: ${clans[acc.users[id].clanid].name}`
				}
				if (onl == 7) {
					var onli = `&#128187;`
					message.send(`
			&#10134; Профиль
			&#4448; » Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
			&#4448;&#128303; » Имя: ${acc.users[id].prefix}
			&#4448;&#127380; » ID: ${user.id}
			&#4448;&#128226; » Онлайн с ` + onli + ` 
			&#4448;&#128176; » Баланс:  ${spaces(users.balance)} 💰 
			&#4448;💰 » Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
			&#4448;💎 » Донат: ${trueSpaces(acc.users[id].donate)}
	
			🔑 Имущество: 
			&#4448;🚘 » Машина » ${car[id].carname} 
			&#4448;🏡 » Дом » № ${acc.users[id].number}   
        	&#4448;🛠 » Работа » ${jobs}
			&#4448;🏢 » Бизнес » ${biz[id].name}  
			&#4448;📱 » Телефон » ${phone[id].name}
	
			💡 Разное: 
			&#4448;🔫 » Оружие: ${gun}
			&#4448;🌍 » Место в топе: ${trueSpaces(inTop)}${text}
			&#4448;&#128142; » Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
			&#4448;🔥 » Опыт [${users.exs}]`);
				} else {
					var onli = `&#128187;`
					message.send(`
			&#10134; Профиль; 
			&#4448; » Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
			&#4448;&#128303; » Имя: ${acc.users[id].prefix}
			&#4448;&#127380; » ID: ${user.id}
			&#4448;&#128176; » Баланс:  ${trueSpaces(users.balance)} 💰 
			&#4448;💰 » Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
			&#4448;💎 » Донат: ${trueSpaces(acc.users[id].donate)}
	
			🔑 Имущество: 
			&#4448;🚘 » Машина »  ${car[id].carname}   
			&#4448;🏡 » Дом » № ${acc.users[id].number}     
       		&#4448;🛠 » Работа » ${jobs}
			&#4448;🏢 » Бизнес » ${biz[id].name}  
			&#4448;📱 » Телефон » ${phone[id].name} 
	
			💡 Разное: 
			&#4448;🔫 » Оружие: ${gun}
			&#4448;🌍 » Место в топе: ${inTop}${text}
			&#4448;&#128142; » Группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}
			&#4448;🔥 » Опыт [${users.exs}] `);
				}
			})
		}
	});
	// --------- prefix -----------
	cmd.on(/^(?:зови меня)\s?([^]+)?/i, 'ан', 0, message => {
		if(acc.users[message.user].level < 2){
		bot.botflood += 1;
		if (acc.users[message.user].donate < 100) return message.send(`🌚 » Смена ника стоит 100 доната.`);
		if (!message.args[1].match(/^[A-z]+|[А-я]+/i)) return message.send(`🌚 » В нике не должно быть: смайлов/символов/ссылок.`);

		//////////////////////////////////////////////////////////////////////////
		let zaprets1 = message.args[1].toLowerCase();
		var zapret = /(порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		var sss = zapret.test(zaprets1)
		if (zapret.test(zaprets1) == true) {
			var check = true;
			return message.send(`🌚 » Придумайте адекватный ник`);
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		let cc = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if (filter0.test(cc) == true || filter1.test(cc) == true) {
			var check = true;
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if (!iban[message.user]) {
				iban[message.user] = {
					time: "Day"
				}
			}
			vk.api.call('messages.send', {
				peer_id: message.user,
				message: `⛔ » Вы банены в [kingbots_2018| KingBots]\n🐩 » Чтобы получить разблокировку оплатите разбан:\n⏩ » https://vk.cc/7YxoJD\n\n⚠ » Заблокированы: Системой.\n⚠ » Время бана: 1 день.\n⚠ » Причина: Ссылки/запрещенные ресурсы.`
			});
			setTimeout(() => {
				delete iban[message.user]
				vk.api.call('messages.send', {
					peer_id: message.user,
					message: `⛔ » Вы были разблокированы.`
				});
			}, 86400000);
			return message.send(`🆘 » В Нике обнаружена ссылка.\n⛔ » Ваш аккаунт заблокирован на 1 день.`);
		} else {

			acc.users[message.user].donate -= 100;
			if(!nick[message.user]){
				nick[message.user] = {
					user: message.user,
					nick: `${message.args[1]}`
				}
				for(id in acc.users){

				if(acc.users[id].admin.level == 2){
					vk_group.api.call('messages.send', {
						user_id: id,
						message: `🆘 » Новая заявка на смену ника  ->  ники`
					});
					}
				}

				return message.send(`👻 » Заявка на смену ника отправлена администраторам.`);
			}else{
				return message.send(`👻 » Вы уже отправили заявку на рассмотрение.\n Ожидайте смену ника.`);
			}
		}

	}else{
		bot.botflood += 1;
		if (!message.args[1].match(/^[A-z]+|[А-я]+/i)) return message.send(`🌚 » В нике не должно быть: смайлов/символов/ссылок.`);

		//////////////////////////////////////////////////////////////////////////
		let zaprets1 = message.args[1].toLowerCase();
		var zapret = /(порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		var sss = zapret.test(zaprets1)
		if (zapret.test(zaprets1) == true) {
			var check = true;
			return message.send(`🌚 » Придумайте адекватный ник`);
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		let cc = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if (filter0.test(cc) == true || filter1.test(cc) == true) {
			var check = true;
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if (!iban[message.user]) {
				iban[message.user] = {
					time: "Day"
				}
			}
			vk.api.call('messages.send', {
				peer_id: message.user,
				message: `⛔ » Вы банены в [kingbots_2018| KingBots]\n🐩 » Чтобы получить разблокировку оплатите разбан:\n⏩ » https://vk.cc/7YxoJD\n\n⚠ » Заблокированы: Системой.\n⚠ » Время бана: 1 день.\n⚠ » Причина: Ссылки/запрещенные ресурсы.`
			});
			setTimeout(() => {
				delete iban[message.user]
				vk.api.call('messages.send', {
					peer_id: message.user,
					message: `⛔ » Вы были разблокированы.`
				});
			}, 86400000);
			return message.send(`🆘 » В Нике обнаружена ссылка.\n⛔ » Ваш аккаунт заблокирован на 1 день.`);
		} else {

				acc.users[message.user].prefix = message.args[1];
				return message.send(`👻 » Вы успешно сменили себе ник.`);
			
		}
	}
	});

	cmd.on(/^(?:ники)$/i, 'ан', 0, message => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		text = `👻 » Заявки на смену ника:\n`;
		for(id in nick){
			text += `👻 » ID: ${id} | Nick: @id${id}(${nick[id].nick})\n`;
		}
		text += `\n👉 » Для одобрения ники: onnick ID\n👉 » Для отклонения ника: offnick ID`;
		return message.send(text);
	});

	cmd.on(/^onnick\s?([0-9]+)?\s?([^]+)?/i, "бан", 0, (message, args) => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		let id = message.args[1];
		let text = message.args[2];
		if(!message.args[2]){
		if(!nick[id]) return message.send(`Этот человек не подавал заявку на смену ника`);
		acc.users[id].prefix = nick[id].nick;
		delete nick[id];
		return message.send(`Вы одобрили смену ника ID: ${id} | @id${id}(${acc.users[id].prefix})`);
		}else{
			acc.users[id].prefix = message.args[2];
			return message.send(`Вы сменили ник ID: ${id} | @id${id}(${acc.users[id].prefix})`);
		}
	});

	cmd.on(/^offnick\s?([0-9]+)?\s?([0-9]+)?/i, "бан", 0, (message, args) => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		let id = message.args[1];
		let text = message.args[2];
		if(!nick[id]) return message.send(`Этот человек не подавал заявку на смену ника`);
		acc.users[id].donate += 100;
		delete nick[id];
		return message.send(`Вы отказали в смене ника ID: ${id} | @id${id}(${acc.users[id].prefix})`);
	});

	cmd.on(/^(?:Кто я)$/i, 'ан', 0, message => {
		bot.botflood += 1;
		return message.reply(`&#128303; » Вы - @id${message.user}(${acc.users[message.user].prefix})`);
	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	cmd.on(/^stempban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?\s([^]+)/i, "бан", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 4) return;
		if (!message.args[5]) return message.send(`Укажите количество минут.`);
		if (!message.args[6]) return message.send(`Укажите причину.`);
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		let min = message.args[5] * 60000;
		let prichina = message.args[6];
		let timeban = `${hours} : ${minutes} : ${seconds}`;
		let times = convertTime(min)
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				var idforKick = res.object_id;
				message.send(`⚠ » Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был тихо забанен.\n ⚠ » Причина: ${prichina}\n⚠ » На ${times}`);
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: `${times} min`,
						vrem: true,
						prich: `${prichina}`
					}
				}
				setTimeout(() => {
					delete iban[res.object_id];
					return vk.api.messages.send({
						peer_id: res.object_id,
						message: `⚠ » Ваш аккаунт разблокирован.`
					});
				}, min)
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ Отказ';
			var idforKick = res.object_id;
			message.send(`⚠ » Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был тихо забанен.\n ⚠ » Причина: ${prichina}\n⚠ » На ${times}`);
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: `${times} min`,
					vrem: true,
					prich: `${prichina}`
				}
			}
			setTimeout(() => {
				delete iban[message.args[3]];
				return vk.api.messages.send({
					peer_id: message.args[3],
					message: `⚠ » Ваш аккаунт разблокирован.`
				});
			}, min)
		}

		function convertTime(time) {
			return (time / 60000) + " минут(у) "
		}
	});
	////////////////////////////////////////////////////////////////////////////////////              
	cmd.on(/^tempban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?\s([^]+)/i, "бан", 2, (message, args) => {
		if (acc.users[message.user].level < 2) return;
		if (!message.args[5]) return message.send(`Укажите количество минут.`);
		if (message.args[5] > 1440) return message.send(`Время бана не должно привышать 1440 минут(2 дня).`);
		if (!message.args[6]) return message.send(`Укажите причину.`);
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		let min = message.args[5] * 60000;
		let prichina = message.args[6];
		let timeban = `${hours} : ${minutes} : ${seconds}`;
		let times = convertTime(min)
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (acc.users[res.object_id].level > 3) return message.reply('Отказ');
				var idforKick = res.object_id;
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ » Ваш аккаунт заблокирован.\n⚠ » Забанил: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ » Время бана: ${timeban}\n⚠ » На ${times}\n ⚠ » Причина: ${prichina}\n(Разбан можно купить тут: https://vk.cc/7YPgf3)`
				});
				message.send(`⚠ » Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был забанен.\n ⚠ » Причина: ${prichina}\n⚠ » Время бана: ${timeban}\n⚠ » На ${times}`);
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: `${times} min`,
						vrem: true,
						prich: `${prichina}`
					}
				}
				setTimeout(() => {
					delete iban[res.object_id];
					return vk.api.messages.send({
						peer_id: res.object_id,
						message: `⚠ » Ваш аккаунт разблокирован.`
					});
				}, min)
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ » ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ » Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			var idforKick = message.args[3];
			vk.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ » Ваш аккаунт заблокирован.\n⚠ » Забанил: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ » Время бана: ${timeban}\n⚠ » На ${times}\n ⚠ » Причина: ${prichina}\n(Разбан можно купить тут: https://vk.cc/7YPgf3)`
			});
			message.send(`⚠ » Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был забанен.\n ⚠ » Причина: ${prichina}\n⚠ » Время бана: ${timeban}\n⚠ » На ${times}`);
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: `${times} min`,
					vrem: true,
					prich: `${prichina}`
				}
			}
			setTimeout(() => {
				delete iban[message.args[3]];
				return vk.api.messages.send({
					peer_id: message.args[3],
					message: `⚠  » Ваш аккаунт разблокирован.`
				});
			}, min)
		}

		function convertTime(time) {
			return (time / 60000) + " минут(у) "
		}
	});
	cmd.on(/^(?:delrep)\s?([0-9]+)?/i, 'delrep', 4, message => {
		if (acc.users[message.user].level < 4) return;
		if (!message.args[1]) return message.send(` Укажите report_id для удаления`);
		delete rep.reports[message.args[1]];
	});
	 
	// система карты, банка
	cmd.on(/^(?:банк)/i, 'balance', 0, message => {
		bot.botflood += 1;
		return message.send(`
    Информация о карте:
    &#4448;💳 » Вы можете положить 💰 на карту 
    &#4448;💳 » Также, вы можете снять 💰. 
    &#4448;💳 » Каждые 10 минут процент коммисии меняется 
    &#4448;💳 » Процент ставки меняется от 1 до 10 %. 

    Команды:
    &#4448;💳 » Счет - баланс и процент на данный момент на карте. 
    &#4448;💳 » Карта - Создать карту. (можно только 1 раз) 
    &#4448;💳 » Снять <сумма> - снять 💰 с карты. 
    &#4448;💳 » Положить <сумма> - положить 💰 на карту. 

    💎 Для VIP пользователей:
    &#4448;💰 » Кредит сумма - можно взять кредит до 1.000.000 💰. 
    &#4448;💰 » Погасить сумма - погасить кредит. 
    &#4448;💳 » Долг - покажет вашу задолжность в банке.
    `);
	});
	cmd.on(/^(?:карта)/i, 'balance', 0, message => {
		bot.botflood += 1;
		if (acc.users[message.user].carta == true) return message.send(`У вас уже создана карта.`);
		acc.users[message.user].carta = true;
		return message.send(`💳 » Вы успешно создали карту.\n Снять 💰 можно командой: снять`);
	});
	cmd.on(/^(?:положить)\s?([^\s	].*)?/i, 'balance', 0, message => {
		bot.botflood += 1;
		let amount = parserInt(message.args[1]);
		if (!amount) return message.send(`[!] » Введите сумму.`);
		if (amount < 0) return message.send(`Сумма не должна быть ниже 0.`);
		if (amount > acc.users[message.user].balance) return message.send(`На вашем счету не достаточно средств!`);
		acc.users[message.user].balance -= Number(amount);
		acc.users[message.user].bank += Number(amount);
		return message.send(`💳 » Вы успешно положили на карту: ${spaces(amount)}💰.`);
	});
	cmd.on(/^(?:счет)$/i, 'balance', 0, message => {
		bot.botflood += 1;
		return message.send(`💳 » Баланс на карте ${trueSpaces(acc.users[message.user].bank)}💰.\n\nПроцент ставки для обмена 💰:\n ${chats.znach} ${chats.stavka} %`);
	});
	cmd.on(/^(?:снять)\s?([^\s	].*)?/i, 'balance', 0, message => {
		bot.botflood += 1;
		let amount = parserInt(message.args[1]);   
		if (!amount) return message.send(`[!] Введите сумму.`);
		if (amount > acc.users[message.user].bank) return message.send(`На вашем счету не достаточно средств!`);
		let stavkaa = chats.stavka;
		let summa = Number(amount);
		proc = Number(summa) / 100 * Number(stavkaa);
		let vivod = Number(summa) - Number(proc);
		acc.users[message.user].bank -= summa;
		acc.users[message.user].balance += Math.round(vivod);
		return message.send(`💳 » Вы успешно сняли ${trueSpaces(Math.round(vivod))}💰(с учетом ставки банка.)`);
	});
	cmd.on(/^(?:dolg|долг)$/i, 'balance', 1, message => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 1) return message.send(`🔯 » Команда доступна от: VIP пользователя.\n🔯 Купите вип в: донат`);
		return message.send(`💳 » Ваша задолжность ${trueSpaces(acc.users[message.user].credit)}💰.`);
	});
	cmd.on(/^(?:кредит)\s?([^\s	].*)?/i, 'balance', 1, message => {
		bot.botflood += 1;
		let amount = parserInt(message.args[1]);
		if (acc.users[message.user].level < 1) return message.send(`🔯 » Команда доступна от: VIP пользователя.\n🔯 Купите вип в: донат`);
		if (!amount) return message.send(`[!] » Введите сумму.`);
		if(amount < 50000) return message.send(`🔯 » Минимальная сумма для взятия кредита - 50.000💰`);
		if (acc.users[message.user].credit > 1000000) return message.send(`💰 » Взять кредит можно не более чем на 1.000.000💰.💰\n Чтобы взять кредит, нужно погасить задолжность.`);
		if (message.args[1] > 1000000) return message.send(`💰 » Максимальная сумма кредита 1.000.000💰.`);
		if (1000000 - acc.users[message.user].credit < amount) return message.send(`💰 » Максимальная сумма кредита 1.000.000💰.`);
		if (amount < 0) return message.send(`💰 » Сумма не должна быть ниже 0.`);
		let dolg = Number(amount);
		let dolg1 = dolg / 100 * 10;
		let dolg2 = dolg1 + dolg;
		acc.users[message.user].credit += Number(dolg2);
		acc.users[message.user].balance += Number(dolg);
		message.send(`💰 » Вы успешно взяли кредит в банке на ${spaces(amount)}💰.\n💰 » Процент банка 10%.\n💰 » Сумма для погашения в банке: ${spaces(acc.users[message.user].credit)}💰`);
	});
	cmd.on(/^(?:погасить)\s?([^\s	].*)?/i, 'balance', 1, message => {
		bot.botflood += 1;
		let amount = parserInt(message.args[1]); 
		if (acc.users[message.user].level < 1) return message.send(`🔯 » Команда доступна от: VIP пользователя.\n🔯 » Купите вип в: донат`);
		if(amount < 50000) return message.send(`🔯 » Минимальная сумма для погашения - 50.000💰`);
		if (!amount) return message.send(`[!] » Введите сумму.`);
		let pogas = Number(amount);
		if (pogas > acc.users[message.user].credit) return message.send(`💰 » Введите точную сумму погашения платежа.`);
		if (pogas < 0) return message.send(`💰 » Введите точную сумму погашения платежа.`);
		if (pogas > acc.users[message.user].balance) return message.send(`💰 » У вас нет столько 💰 `);
		acc.users[message.user].credit -= Math.round(pogas);
		acc.users[message.user].balance -= Math.round(pogas);
		message.send(`💰 » Вы успешно перевели средства на погашение долга в банке!\n💰 » Сумма для погашения в банке: ${Math.round(acc.users[message.user].credit)}💰`);
	});
	//конец системы
	cmd.on(/^(?:стата)/i, 'balance', 0, message => {
		bot.botflood += 1;
		let users = acc.users[message.user];
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me"
		}).then(res => {
			vk.api.call('friends.get', {
				user_id: message.user
			}).then(re => {
				let user = res[0];
				message.send(`&#128303; Имя: ${user.last_name} ${user.first_name}\n&#127380; »  Обычная ссылка: vk.com/${user.domain}\n &#128142; »  Ваша группа: ${users.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Разработчик")}\n👫 »  Подписчики: ${user.followers_count}\n👫 »  Ваши друзья: ${re.count}`);
			})
		})
	});
	//- - -- - 
	cmd.on(/^(?:агенты)/i, 'agents', 0, message => {
		bot.botflood += 1;
		let text = '⚠ Агент, отвечают на ваши вопросы ( репорт [вопрос] )! \n';
		let users = acc.users;
		for (let id in users) {
			if (users[id].admin.level > 0) text += `   ⚠ » @id${id}(${users[id].prefix})\n`;
		}
		return message.send(text);
	});
 
	///////////////////////////////////////////////////////////// 
	cmd.on(/^deluser?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
	 
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return;
				let id = res.object_id;
				////////////////////////////////////////////////////////////
				acc.users[id].job = false;
				acc.users[id].jobname = false;
				acc.users[id].level = 0;
				acc.users[id].balance = 0;
				acc.users[id].donate = 0;
				acc.users[id].bitcoin = 0;
				acc.users[id].promotime = true;
				acc.users[id].loxotron = true;
				acc.users[id].credit = 0;
				acc.users[id].jetons = 0;
				acc.users[id].clanid = false;
				acc.users[id].carta = false;
				acc.users[id].bank = 0;
				acc.users[id].pp = 0;
				acc.users[id].exs = 0;
				acc.users[id].lvl = 0;
				acc.users[id].tag = "Пользователь";
				acc.users[id].admin.ans = 0;
				acc.users[id].admin.vig = 0;
				acc.users[id].admin.upadm = 0;
				acc.users[id].admin.level = 0;
				acc.users[id].vig = 0;
				acc.users[id].voice = true;
				acc.users[id].games = true;
				acc.users[id].invites = true;
				acc.users[id].times = false;
				acc.users[id].rolls = true;
				acc.users[id].case = true;
				acc.users[id].dice = true;
				acc.users[id].free = true;
				acc.users[id].giverub = false;
				acc.users[id].mute = false;
				acc.users[id].msg = 0;
				acc.users[id].gunname = false;
				acc.users[id].pay = 0;
				////////////////////////////////////////////////////////////
				if (!car[id]) {
					car[id] = {
						carid: false,
						carname: "Отсутствует",
						price: 0
					}
				}
				if (!biz[id]) {
					biz[id] = {
						id: false,
						name: "Отсутствует",
						price: 0,
						people: 0,
						dohod: 0,
						balance: 0,
						users: {},
						people: 0
					}
				}
				if (!job[id]) {
					job[id] = {
						id: false,
						name: "Отсутствует",
						dohod: 0
					}
				}
				if (!phone[id]) {
					phone[id] = {
						id: false,
						name: "Отсутствует",
						price: 0
					}
				}
				if (!safe[id]) {
					safe[id] = {
						game: false,
						kod: false
					}
				}
				for(ids in biz[id].users){
					delete biz[id].users[ids];
				}
				car[id].carid = false;
				car[id].carname = "Отсутствует";
				car[id].price = 0;
				biz[id].id = 0;
				biz[id].name = "Отсутствует";
				biz[id].price = 0;
				biz[id].people = 0;
				biz[id].dohod = 0;
				biz[id].balance = 0;
				job[id].id = false;
				job[id].name = "Отсутствует";
				job[id].dohod = 0;
				phone[id].id = false;
				phone[id].name = "Отсутствует";
				phone[id].price = 0;
				safe[id].game = false;
				safe[id].kod = false;
				delete ferm[id];
				return message.send(`⚠| Вы снесли аккаунт vk.com/id${res.object_id}`);
			})
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]);
			let id = message.args[3];
			////////////////////////////////////////////////////////////
			acc.users[id].job = false;
			acc.users[id].jobname = false;
			acc.users[id].level = 0;
			acc.users[id].balance = 0;
			acc.users[id].donate = 0;
			acc.users[id].bitcoin = 0;
			acc.users[id].promotime = true;
			acc.users[id].loxotron = true;
			acc.users[id].credit = 0;
			acc.users[id].jetons = 0;
			acc.users[id].clanid = false;
			acc.users[id].carta = false;
			acc.users[id].bank = 0;
			acc.users[id].pp = 0;
			acc.users[id].exs = 0;
			acc.users[id].lvl = 0;
			acc.users[id].tag = "Пользователь";
			acc.users[id].admin.ans = 0;
			acc.users[id].admin.vig = 0;
			acc.users[id].admin.upadm = 0;
			acc.users[id].admin.level = 0;
			acc.users[id].vig = 0;
			acc.users[id].voice = true;
			acc.users[id].games = true;
			acc.users[id].invites = true;
			acc.users[id].times = false;
			acc.users[id].rolls = true;
			acc.users[id].case = true;
			acc.users[id].dice = true;
			acc.users[id].free = true;
			acc.users[id].giverub = false;
			acc.users[id].mute = false;
			acc.users[id].msg = 0;
			acc.users[id].gunname = false;
			acc.users[id].pay = 0;
			////////////////////////////////////////////////////////////
			if (!car[id]) {
				car[id] = {
					carid: false,
					carname: "Отсутствует",
					price: 0
				}
			}
			if (!biz[id]) {
				biz[id] = {
					id: false,
					name: "Отсутствует",
					price: 0,
					people: 0,
					dohod: 0,
					balance: 0,
					users: {},
					people: 0
				}
			}
			if (!job[id]) {
				job[id] = {
					id: false,
					name: "Отсутствует",
					dohod: 0
				}
			}
			if (!phone[id]) {
				phone[id] = {
					id: false,
					name: "Отсутствует",
					price: 0
				}
			}
			if (!safe[id]) {
				safe[id].game = false;
				safe[id].kod = false;
			}
			for(ids in biz[id].users){
					delete biz[id].users[ids];
				}
			car[id].carid = false;
			car[id].carname = "Отсутствует";
			car[id].price = 0;
			biz[id].id = 0;
			biz[id].name = "Отсутствует";
			biz[id].price = 0;
			biz[id].people = 0;
			biz[id].dohod = 0;
			biz[id].balance = 0;
			job[id].id = false;
			job[id].name = "Отсутствует";
			job[id].dohod = 0;
			phone[id].id = false;
			phone[id].name = "Отсутствует";
			phone[id].price = 0;
			safe[id].game = false;
			safe[id].kod = false;
			delete ferm[id];
			return message.send(`⚠| Вы снесли аккаунт vk.com/id${id}`);
		}
	});
	//////////////////////////////////////////////////////////////
	cmd.on(/^addagent?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				let id = res.object_id;
				acc.users[id].admin.level = 2;
				return message.send(`⚠ » Вы назначили vk.com/id${res.object_id} агентом поддержки!`);
			})
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			let id = message.args[3];
			acc.users[id].admin.level = 2;
			return message.send(`⚠ » Вы назначили vk.com/id${message.args[3]} агентом поддержки!`);
			return;
		}
	});
	cmd.on(/^removeagent?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				let id = res.object_id;
				acc.users[id].admin.level = 0;
				return message.send(`⚠ » Вы сняли с поста агента vk.com/id${res.object_id} агентом поддержки!`);
			})
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			let id = message.args[3];
			acc.users[id].admin.level = 0;
			return message.send(`⚠ » Вы сняли с поста агента vk.com/id${message.args[3]}`);
			return;
		}
	});
	// - - - - -- - - - - - -- - - - - - -- - - - - - - - - - -- - - - - - - - - - ---- -- - - 

	///////////////////////////////////////
 
	cmd.on(/^(?:репорт|репорт|report|rep|реп)\s([^]+)?/i, 'ко', 0, message => {
		bot.botflood += 1;
		if (!message.chat) {
			for(id in acc.users){
				if(acc.users[id].admin.level == 2){
					vk_group.api.call('messages.send', {
						user_id: id,
						message: `🆘 » Report ++  ->  лист`
					});
				}
			}
			 
			message.send("🆘 » Репорт успешно отправлен.");
			rep.number += 1
			rep.reports[rep.number] = {
				user: message.user, 
				report: message.args[1]
			}
			return;
		}
		return message.send(`Обращаться в репорт можно только через [kingbots_2018| KingBots]!.`);
	})
	cmd.on(/^лист$/i, 'reports', 0, message => {
		bot.botflood += 1;
		if (!acc.users[message.user]) return;
		if (acc.users[message.user].admin.level < 1) return;
		let text = ``;
		for (let id in rep.reports) {
			text += `
        	REPORT ID - ${id}
        	ID: ${rep.reports[id].user} 
        	Report: ${rep.reports[id].report}
        	➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖
        	`;
		}
		text += `\nДля ответа используйте кмд: ответ\n ответ ID[report_id] ID(юзера)  <ответ>`;
		message.send(text);
	});
	cmd.on(/^(?:ответ)\s([0-9]+)?\s([0-9]+)?\s([^]+)?$/i, 'все', 0, message => {
		bot.botflood += 1;
		if (acc.users[message.user].admin.level == 0) return;
		if (!acc.users[message.user]) return;
		if (acc.users[message.user].admin.level < 1) return;
		if (!message.args[1]) return;
		if (!rep.reports[message.args[1]]) return message.send(`➖ » Вы не можете ответить по причинам:\n➖Данного report id нету\n➖Репортов из указанного чата не было\n➖Проверьте данные в:  лист`);
		if (acc.users[message.user].admin.level > 1) {
			let id = message.args[2];
			vk_group.api.call('messages.send', {
				user_id: id,
				message: `Агент.Поддержки:\n -> Пользователю: @id${rep.reports[message.args[1]].user}(${acc.users[rep.reports[message.args[1]].user].prefix})\n -> Ответ: ${message.args[3]}`
			});
			delete rep.reports[message.args[1]];
			acc.users[message.user].admin.ans += 1;
			return message.reply('Ответ отправлен!');
		}
	})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 cmd.on(/^(?:аправила)$/i, ')', 0, message => {
 	if(acc.users[message.user].admin.level < 2) return; 
 	return message.send(`
 		💎 » Правила Агентов 💎

 		🔺 » 1. Запрещено:
 		1.1.» Выпрашивать валюту/повышение.
 		1.2.» Хамить любому игроку.
 		1.3.» Надоедать разработчикам.
 		1.4.» Флудить в ЛС разработчикам.
 		1.5.» Писать не по теме в админ-беседе.
 		1.6.» Хамить в ответах на репорт.
 		1.7.» Банить без причины.
 		1.8.» Выдавать себя за администратора выше уровнем.
 		1.9.» Раздавать валюту кому-то.
 		1.10.» Играться в админ-беседе.
 		1.11.» Использование агент-команд для пределами админ-беседы.
 		1.12.» Слив админ-инфы.
 		Наказание: бан. 

 		🔺 » 2. Разрешено: 
 		2.1.» Отвечать на репорты(в лс группы).
 		2.2.» Одобрять/отклонять заявки на смену ника.
 		2.3.» Помогать советом игрокам.
 		2.4.» Играться в беседах(НЕ АДМИН-БЕСЕДЕ).
 		2.5.» Банить по причине. (Пруфы - в лс Разрабу)

 		`);
});

 cmd.on(/^(?:агент)$/i, ')', 0, message => {
 	if(acc.users[message.user].admin.level < 2) return; 
 	let id = message.user;
 	vk.api.call('users.get', {user_ids: message.user, fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"})
    .then(res =>{
    let user = res[0];
    


    if(acc.users[id].level == 4){
    return message.send(`
    	💎 » Статистика Агента Поддержки -
 		✏ » Имя: ${user.first_name} ${user.last_name}.  
 		✉ » Ответов: ${acc.users[id].admin.ans}.
 		⚠ » Выговоров: ${acc.users[id].admin.vig}.
		🐩 » Уровень агента: ${acc.users[id].admin.level}. 

		🔸 Команды Тех.Поддержки.
        🔸 ban ID | Забанить юзера.
        🔸 unban ID | Разбанить юзера.

        🔸 addvip ID - Выдать ВИП.
        🔸 addmoder ID - Выдать модера.
        🔸 addadmin ID - Выдать админа.

        🔸 Отнять id сумма | Отнять Рубли
        🔸 двыдать ID сумма | выдать донат
        🔸 дотнять ID сумма | отнять донат
        🔸 овыдать ID сумма | выдать опыт
        🔸 оотнять ID сумма | отнять опыт

        🔸 stempban ID <время> <причина> - тихий бан.
        🔸 delrep ID(report_id) - удалить репорт.
        🔸 tempban ID <время> <причина> - бан.
        🔸 Время в минутах!!
        🔸 Пример: tempban vladorr 2 Нарушение правил.


        📝 » Команды:
		ᅠ👻 » Лист - список репортов.
	 	ᅠ👻 » агент - информация о вас.
	 	ᅠ👻 » Ответ ID(report_id) ID(юзера) <ответ> 

	 	ᅠ👻 » vig ID(сслыка) - дать выговор
	 	ᅠ👻 » unvig ID(ссылка) - снять выговор
	 	ᅠ👻 » checkinfo ID(ссылка) - проверить агента.

	 	 🔸 addagent ID | Выдать агент-права.
         🔸 removeagent ID | Снять агента.

        🔥 » ники - список заявок на смену ника.
        🔥 » onnick ID - одобрить заявку на смену ника.
        🔥 » offnick ID - отклонить заявку на смену ника.	


    	`);
}


    if(acc.users[id].admin.level == 2){  
    return message.send(`
    	💎 » Статистика Агента Поддержки -
 		✏ » Имя: ${user.first_name} ${user.last_name}.  
 		✉ » Ответов: ${acc.users[id].admin.ans}.
 		⚠ » Выговоров: ${acc.users[id].admin.vig}.
		🐩 » Уровень агента: ${acc.users[id].admin.level}. 

		📝 » Команды:
		 💎 » аправила - к прочтению!!!

		ᅠ👻 » Лист - список репортов.
	 	ᅠ👻 » агент - информация о вас.
	 	ᅠ👻 » Ответ ID(report_id) ID(юзера) <ответ> 
	 	 🔥 » ники - список заявок на смену ника.
         🔥 » onnick ID - одобрить заявку на смену ника.
         🔥 » offnick ID - отклонить заявку на смену ника.

    	`);
		}


	});
});

	 


cmd.on(/^checkinfo?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 0, (message, args) => {
	if(acc.users[message.user].level< 4) return;  
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {
                   let id = res.object_id;
				 	vk.api.call('users.get', {user_ids: id, fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"})
				    .then(res =>{
				    let user = res[0];
					    if(chats[4].users[id].admin.level == 2){
					    return message.send(`
					    	💎 » Статистика Агента Поддержки -
					 		✏ » Имя: ${user.first_name} ${user.last_name}.  
					 		✉ » Ответов: ${acc.users[id].admin.ans}.
					 		⚠ » Выговоров: ${acc.users[id].admin.vig}.
							🐩 » Уровень агента: ${acc.users[id].admin.level}.
					    	`);
							}
						});
        			})
        return;
    }else{
        if(!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
        if(BOT_ID == message.args[3]) return message.reply('Отказ');  
        let id = message.args[3];
				 	vk.api.call('users.get', {user_ids: id, fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"})
				    .then(res =>{
				    let user = res[0];

				    if(chats[4].users[id].admin.level == 2){
				    return message.send(`
				    	💎 » Статистика Агента Поддержки -
				 		✏ » Имя: ${user.first_name} ${user.last_name}.  
				 		✉ » Ответов: ${acc.users[id].admin.ans}.
				 		⚠ » Выговоров: ${acc.users[id].admin.vig}.
						🐩 » Уровень агента: ${acc.users[id].admin.level}.
				    	`);
						}
					});
        return;
    }
});


cmd.on(/^unvig?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 2, (message, args) => {
	if(acc.users[message.user].level< 4) return;  
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {
                   let id = res.object_id;
				 	 acc.users[id].admin.vig = 0;
				 	 return message.send(`⚠ » Админ-выговоры были успешно сняты.`);
        })
        
    }else{
        if(!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
        if(BOT_ID == message.args[3]) return message.reply('Отказ');  
        		let id = message.args[3];
			 	    acc.users[id].admin.vig = 0;
			 	    return message.send(`⚠ » Админ-выговоры были успешно сняты.`);
        return;
    }
});
cmd.on(/^vig?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 2, (message, args) => {
	if(acc.users[message.user].level == 4){ 
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {
                   let id = res.object_id;			 
					 if(acc.users[id].admin.level > 0){
								acc.users[id].admin.vig += 1;

								if(acc.users[id].admin.vig == 3){
									acc.users[id].admin.level = 0;
									acc.users[id].admin.vig = 0;
									return message.send(`⚠ » Юзер получил 3 выговор.\n⚠| Он был снят с должности.`);
								}

								return message.send(`⚠ » Админ-выговор был выдан.`);}
					
				 	  
        })
        
    }else{
        if(!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
        if(BOT_ID == message.args[3]) return message.reply('Отказ');  
        		let id = message.args[3];
			 	     if(cacc.users[id].admin.level > 0){
								acc.users[id].admin.vig += 1;

								if(acc.users[id].admin.vig == 3){
									acc.users[id].admin.level = 0;
									acc.users[id].admin.vig = 0;
									return message.send(`⚠| Юзер получил 3 выговор.\n⚠| Он был снят с должности.`);
								}

								return message.send(`⚠| Админ-выговор был выдан.`);}		 	  
        }
        return;
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	cmd.on(/^ban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "iban", 3, (message, args) => {
		bot.botflood += 1;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ'); 
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: "Year"
					}
				}
				 
				vk_group.api.call('messages.send', {
					peer_id: res.object_id,
					message: `⛔ » Вы забанены в @kingbots_2018(KingBots)\n🐩 » Чтобы получить разблокировку оплатите разбан:\n⏩ » https://vk.cc/7YxoJD`
				});
				return message.send(`Пользователь заблокирован навсегда.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return; 
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: "Year"
				}
			}
			 
			vk_group.api.call('messages.send', {
				peer_id: message.args[3],
				message: `⛔ » Вы забанены в @kingbots_2018(KingBots)\n🐩 » Чтобы получить разблокировку оплатите разбан:\n⏩ » https://vk.cc/7YxoJD`
			});
			return message.send(`Пользователь заблокирован навсегда.`);
		}
	});


	cmd.on(/^unban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "unban", 3, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (iban[res.object_id]) {
					delete iban[res.object_id]
				}
				return message.send(`Пользователь разблокирован.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return;
			if (iban[message.args[3]]) {
				delete iban[message.args[3]]
			}
			return message.send(`Пользователь разблокирован.`);
		}
	});
	cmd.on(/^blist$/i, "blocked", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 4) return;
		let text = '';
		text += `~~ Users в бане ~~\n`;
		for (let id in iban) {
			text += `https://vk.com/id${id} \n`;
		}
		return message.send(text);
	});
	/////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^дуэль\s?([^\s	].*)?/i, "дуэль", 0, (message, args) => {
		bot.botflood += 1;
		let amount = parserInt(message.args[1]);   
		if (!message.chat) return;
		if (lobby[message.chat]) {
			if (lobby[message.chat].player_one == message.user) return message.send(`⚠ » Вы уже зарегистрировались!`);
			return message.send(`⚠ » Кто-то уже создал дуэль. Для участия пропишите "принять".`);
		}
		if (acc.users[message.user].gunname == false) return message.send(`🔫 » Чтобы сыграть - вам нужно оружие. | Кейсы: магазин`);
		if (!amount) return message.send(`⚠ » Вы не указали ставку!`);
		let user = acc.users[message.user];
		if (user.balance <= 0) return message.send(`⚠ » Ваш баланс должен быть больше 0💰`);
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `⚠ » Ставка не может быть меньше 0 или равна 0 💰` : `Ставка не может превышать баланс`);
		let gun = ``;
		if (acc.users[message.user].gunname != false) gun = `${acc.users[message.user].gunname}`;
		lobby[message.chat] = {
			player_one: message.user,
			player_two: false,
			stavka: Math.round(amount)
		}
		user.balance -= Number(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
		message.send(`➖ » Вы вступили в игру "Дуэль"➖\n🔥 » Участники: 🔥\n⚠ » Игрок 1: @id${message.user}(${acc.users[message.user].prefix})\n⚠ » Ставка 1 игрока: ${spaces(amount)}💰\n🔫 » Оружие: ${gun}\n⚠ » Кто смелый, пишите:  принять`);
	});
	cmd.on(/^принять/i, "принять", 0, (message, args) => {
		bot.botflood += 1;
		if (!lobby[message.chat]) return message.send(`⚠ » Создайте дуэль командой: дуэль <ставка>`);
		if (acc.users[message.user].gunname == false) return message.send(`🔫 » Чтобы сыграть - вам нужно оружие. | Кейсы: магазин`);
		let user = acc.users[message.user];
		if (lobby[message.chat]) {
			if (lobby[message.chat].player_one != false) {
				if (lobby[message.chat].player_one == message.user) return message.send(`⚠ » Вы уже зарегистрировались!`);
				if (acc.users[message.user].balance < lobby[message.chat].stavka) return message.send(`⚠ » У вас нет столько денег для этой игры.`);
				lobby[message.chat].player_two = message.user;
				user.balance -= lobby[message.chat].stavka;
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				let kill = rand(1, 2);
				if (kill == 1) {
					acc.users[lobby[message.chat].player_two].exs += 2;
					acc.users[lobby[message.chat].player_one].exs -= 1;
					acc.users[lobby[message.chat].player_two].balance += lobby[message.chat].stavka * 2;
					message.reply("&#128293; 1.. 2.. 3.. Выстрел &#128299; \n ➖ » @id" + lobby[message.chat].player_one + "(" + `${acc.users[ lobby[message.chat].player_one].prefix}` + "), покойся с миром &#128128; \n➖ » Ваш баланс переходит вашему оппоненту.\n💡 » Проигравший теряеет 1 опыт.\n💡 » Победитель получил 2 опыта.");
					delete lobby[message.chat];
					return;
				}
				if (kill == 2) {
					acc.users[lobby[message.chat].player_one].exs += 2;
					acc.users[lobby[message.chat].player_two].exs -= 1;
					acc.users[lobby[message.chat].player_one].balance += lobby[message.chat].stavka * 2;
					message.reply("&#128293; 1.. 2.. 3.. Выстрел &#128299; \n ➖ » @id" + lobby[message.chat].player_two + "(" + `${acc.users[ lobby[message.chat].player_two].prefix}` + "), покойся с миром &#128128; \n➖ » Ваш баланс переходит вашему оппоненту.\n💡 » Победитель получил 2 опыта.");
					delete lobby[message.chat];
					return;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////
	cmd.on(/^гонки\s?([^\s	].*)?/i, "гонки", 0, (message, args) => {
		bot.botflood += 1;

		if (!message.args[1]) return message.send(`⚠ » Вы не указали ставку!`);
		if (!car[message.user]) {
			car[message.user] = {
				carid: false,
				carname: "Отсутствует",
				price: 0
			}
		}
		let amount = parserInt(message.args[1]);   
		if (!message.chat) return;
		if (gonki[message.chat]) {
			if (gonki[message.chat].player_one == message.user) return message.send(`⚠ » Вы уже зарегистрировались!`);
			return message.send(`🚘 » Кто-то уже начал гонки. Для участия пропишите "участие".`);
		}
		if (car[message.user].carid == false) return message.send(`🚘 » Чтобы играть - вам нужна машина. | "Машины"`); 
		let user = acc.users[message.user];
		if (user.balance <= 0) return message.send(`⚠ » Ваш баланс должен быть больше 0💰`);
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `⚠ » Ставка не может быть меньше 0 или равна 0 💰` : `Ставка не может превышать баланс`);
		let gun = ``;
		if (acc.users[message.user].gunname != false) gun = `${acc.users[message.user].gunname}`;
		gonki[message.chat] = {
			player_one: message.user,
			player_two: false,
			stavka: Math.round(amount)
		}
		user.balance -= Number(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
		message.send(`🚘 » Вы начали игру "Гонки"\n➖ » Игрок 1: @id${message.user}(${acc.users[message.user].prefix})\n⚠ » Ставка 1 игрока: ${spaces(amount)}💰\n🚗 » Машина: ${car[message.user].carname}\n⚠ » Кто смелый, пишите:  'Участие'`);
	});
	cmd.on(/^участие/i, "участие", 0, (message, args) => {
		bot.botflood += 1;
		if (!gonki[message.chat]) return message.send(`⚠ » Создайте дуэль командой: дуэль <ставка>`);
		if (car[message.user].carid == false) return message.send(`🚘 » Чтобы играть - вам нужна машина. | "Машины"`);
		let user = acc.users[message.user];
		if (gonki[message.chat]) {
			if (gonki[message.chat].player_one != false) {
				if (gonki[message.chat].player_one == message.user) return message.send(`⚠ » Вы уже зарегистрировались!`);
				if (acc.users[message.user].balance < gonki[message.chat].stavka) return message.send(`⚠ » У вас нет столько денег для этой игры.`);
				gonki[message.chat].player_two = message.user;
				user.balance -= gonki[message.chat].stavka;
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				let kill = rand(1, 2);
				if (kill == 1) {
					acc.users[gonki[message.chat].player_two].exs += 2;
					acc.users[gonki[message.chat].player_one].exs -= 1;
					acc.users[gonki[message.chat].player_two].balance += gonki[message.chat].stavka * 2;
					message.reply("🏁 » Гонки завершились. \n ➖ » @id" + gonki[message.chat].player_one + "(" + `${acc.users[ gonki[message.chat].player_one].prefix}` + "), приехал последним \n➖ » Ваш баланс переходит вашему оппоненту.\n💡 » Победитель получил 2 опыта.");
					delete gonki[message.chat];
					return;
				}
				if (kill == 2) {
					acc.users[gonki[message.chat].player_one].exs += 2;
					acc.users[gonki[message.chat].player_two].exs -= 1;
					acc.users[gonki[message.chat].player_one].balance += gonki[message.chat].stavka * 2;
					message.reply("🏁 » Гонки завершились.\n ➖ » @id" + gonki[message.chat].player_two + "(" + `${acc.users[ gonki[message.chat].player_two].prefix}` + ") приехал последним \n➖ » Ваш баланс переходит вашему оппоненту.\n💡 » Победитель получил 2 опыта.");
					delete gonki[message.chat];
					return;
				}
			}
		}
	});
	// - - - - - -  - - - - - - СИСТЕМА КЛАНОМ - - - - - - - - - - - - 
	cmd.on(/^addclan\s?([^]+)?/i, "addclan", 0, (message, args) => {
		if(acc.users[message.user].level < 3){
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`⚠ » Введите название для клана!`);
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🆘 »  Отказ! | Подозрительная сслыка. |⛔`);
		} else {
			let user = acc.users[message.user];
			let name = message.args[1];
			let clanid = user.clanid;
			if (user.donate < 50) return message.send(`⚠ »  Создание клана стоит 100 доната | донат`);
			user.donate -= 50;
			if (clans[clanid]) return message.send(`⚠ »  У вас уже создан клан/Вы состоите в клане.`);
			if (!clans[clanid]) {
				let smile = [`📺`, `💥`, `💣`, `💎`, `♻`, `🏆`, `🔥`, `🌚`, `👻`, `💀`, `🎄`, `🎃`, `🚀`, `🎱`, `🍼`, `🍺`, `🐔`, `🐉`, `🌈`, `🌝`].random();
				botinfo.number += 1;
				clans[botinfo.number] = {
					owner: message.user,
					users: {},
					number: botinfo.number,
					name: name,
					balance: 0,
					smile: smile,
					open: true,
					price: 100,
					exs: 0,
					people: 0,
					war: false,
					invites: {}
				}
				user.clanid = botinfo.number;
				clans[botinfo.number].users[message.user] = {
					level: 2
				}
				return message.send(`
 		${clans[user.clanid].smile} »  Клан ${name}  » ${clans[user.clanid].smile} 
 		Был успешно создан!
 		Создатель: vk.com/id${message.user}
 		Номер клана: ${botinfo.number}
 		Логотип клана: ${clans[user.clanid].smile}
 		Тип клана: открытый.
 		Команды клана: khelp
 		`);
			}
		}
	}else{
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`⚠| Введите название для клана!`);
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🆘 »  Отказ! | Подозрительная сслыка. |⛔`);
		} else {
			let user = acc.users[message.user];
			let name = message.args[1];
			let clanid = user.clanid;
			if (clans[clanid]) return message.send(`⚠ »  У вас уже создан клан/Вы состоите в клане.`);
			if (!clans[clanid]) {
				let smile = [`📺`, `💥`, `💣`, `💎`, `♻`, `🏆`, `🔥`, `🌚`, `👻`, `💀`, `🎄`, `🎃`, `🚀`, `🎱`, `🍼`, `🍺`, `🐔`, `🐉`, `🌈`, `🌝`].random();
				botinfo.number += 1;
				clans[botinfo.number] = {
					owner: message.user,
					users: {},
					number: botinfo.number,
					name: name,
					balance: 0,
					smile: smile,
					open: true,
					price: 100,
					exs: 0,
					people: 0,
					invites: {}
				}
				user.clanid = botinfo.number;
				clans[botinfo.number].users[message.user] = {
					level: 2
				}
				return message.send(`
 		${clans[user.clanid].smile} »  Клан ${name}  » ${clans[user.clanid].smile} 
 		Был успешно создан!
 		Создатель: vk.com/id${message.user}
 		Номер клана: ${botinfo.number}
 		Логотип клана: ${clans[user.clanid].smile}
 		Тип клана: открытый.
 		Команды клана: khelp
 		`);
			}
		}
	}
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^покинуть$/i, "exitclan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let idclan = user.clanid;
		if (!clans[idclan]) return message.send(`⚠ »  Вы не в клане.`);
		if (acc.users[message.user].clanid == false) return message.send(`💀 »  Вы не состоите в клане.`);
		if (clans[idclan].users[message.user].level == 2) return message.send(`${clans[idclan].smile} »  Создатель не может выйти из клана.`);
		user.clanid = false;
		delete clans[idclan].users[message.user];
		return message.send(`⚠ »  Вы добровольно покинули клан.`);
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^kopen/i, "kopen", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} »  Вы не ~создатель~  клана.`);
		if (clans[clanid].open == true) return message.send(`${clans[clanid].smile} »  Клан итак открытый.`)
		clans[clanid].open = true;
		return message.send(`${clans[clanid].smile} »  Вы открыли клан. Цена за вход: ${clans[clanid].price}  поинтов.\n${clans[clanid].smile} »  Изменить цену за вход: kprice цена`);
	});
	cmd.on(/^kclose/i, "kclose", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} »  Вы не ~создатель~  клана.`);
		if (clans[clanid].open == false) return message.send(`${clans[clanid].smile} »  Клан итак закрытый.`)
		clans[clanid].open = false;
		return message.send(`${clans[clanid].smile} »  Вы закрыли клан. Набор участников могут проводить только зам/создатель.`);
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^kprice\s?([^\s	].*)?/i, "kprice", 0, (message, args) => {
		bot.botflood += 1;
		/*
		let user = acc.users[message.user];
		//let id = user.clanid;
		if (!user.clanid) return message.reply(``);
		if (clans[user.clanid].users[message.user].level < 2)
		*/
		 
		let user = acc.users[message.user];
		let clanid = user.clanid;
		let amount = parserInt(message.args[1]);  
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} »  Вы не ~создатель~  клана.`);
		//if (!message.args[1]) return message.send(`${clans[clanid].smile} »  Укажите сумму для входа в клан.`);
		if (message.args[1] < 100 || message.args[1] > 50000) return message.send(`${clans[clanid].smile} »  Сумма для входа в клан не должна быть < 100💰 и > 50.000💰`);
		clans[clanid].price = amount;
		return message.send(`${clans[clanid].smile} »  Вы установили цену за вход в размере ${spaces(amount)}💰`);
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^кпринять\s?([0-9]+)?/i, "класс", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`💀 » Введите ID пользователя.`);
		let users = acc.users;
		let user = users[message.user];
		if (!user.clanid) return message.send(`💀 » Вы не состоите в клане`);
		let id = Number(message.args[1]);
		let subject = users[id];
		if (!clans[user.clanid].invites[id]) return message.send(`💀 » Этот человек не подавал заявку на вступление.`);
		if (clans[user.clanid].users[message.user].level === 0) return message.send(`💀 » Принимать в клан может только глава клана и зам.клана`);
		if (subject.clanid) return message.send(`💀 » Данный человек уже вступил в клан`);
		if (subject.balance < clans[user.clanid].price) return message.send(`💀 » У пользователя не хватает денег`);
		subject.balance -= clans[user.clanid].price;
		subject.clanid = user.clanid;
		if(!clans[user.clanid].users[id])
			clans[user.clanid].users[id] = { level: 0 };
		delete clans[user.clanid].invites[id];
		return message.send(`💀 » @id${id}(${acc.users[id].prefix}) был(а) принят(а) в клан по заявке.`);
	});
	
	cmd.on(/^заявки$/i, "заявки", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (!user.clanid) return message.send(`💀 » Вы не состоите в клане`);
		let id = acc.users[message.user].clanid;
		let text = `🔥 Заявки на вступление 🔥\n`;
		if (clans[id].users[message.user].level === 0) return message.send(`💀 » Заявки может просматривать только Глава клана и Зам.клана`);
		for(ids in clans[id].invites){
			text += `ID: ${ids} | @id${ids}(${acc.users[ids].prefix}) - ждет одобрения\n`;
		}
		return message.send(text);
	});

	cmd.on(/^ksliv\s?([^\s	].*)?/i, "кслив", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`💀 » Введите сумму для раздачи участникам клана.`);
		let amount = parserInt(message.args[1]); 
		let id = acc.users[message.user].clanid;   
		if (message.user != clans[id].owner) return message.send(`⚠ »  Раздавать деньги может только Создатель клана!`)
		if(amount > clans[id].balance) return message.send(`💀 » На счету клана нет столько 💰`);
		clans[id].balance -= amount;
		let sum = Math.round(amount / clans[id].people);
		for(ids in clans[id].users){
			acc.users[ids].balance += sum;
		}
		return message.send(`💀 » Каждый участник клана получил по ${sum} 💰 `);
	});

	cmd.on(/^вступить\s?([0-9]+)?/i, "inclan", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`💀 » Введите ID клана.`);
		let user = acc.users[message.user];
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`💀 » Вы в клане.`);
		if(!clans[id]) return message.send(`💀 »  Данного клана не существует.`);
		if(!clans[id].open) {
			if(!clans[id].invites)
				clans[id].invites = {}
				
			if(!clans[id].invites[message.user])
				clans[id].invites[message.user] = { i: true };
			
			return message.reply(`💀 » Ваша заявка на вступление была отправлена создателю.`);
		} else if (clans[id].open) {
			if (user.balance < clans[id].price) return message.send(`У вас на балансе мало 💰`);
			user.balance -= clans[id].price;
			clans[id].balance += clans[id].price;
			user.clanid = id;
			if(!clans[id].users[message.user]) {
				clans[id].users[message.user] = {
					level: 0
				}
			}
			
			return message.send(`${clans[id].smile} »  Вы вошли в клан за ${spaces(clans[id].price)}💰.\n${clans[id].smile} »  Команды клана khelp`);
		}
	});
	
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^ktitle\s?([^]+)?/i, "проверка", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`⚠ »  Укажите название для клана.`);
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🆘 »  Отказ! | Подозрительная сслыка. |⛔`);
		} else {
			let user = acc.users[message.user];
			let clanid = user.clanid;
			if (!clans[clanid]) return message.send(`⚠ » У вас нет клана.`);
			if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} »  Вы не ~создатель~  клана.`);
			if (clans[clanid].balance < 10000) return message.send(`${clans[clanid].smile} »  На балансе клана нету 10.000💰.| kbank `);
			clans[clanid].balance -= 10000;
			if (clans[clanid]) {
				if (message.user != clans[clanid].owner) return message.send(`⚠ »  Изменить название клана может только Создатель!`);
				if (message.user == clans[clanid].owner) {
					clans[clanid].name = message.args[1];
					return message.send(`${clans[clanid].smile} »  Вы успешно изменили название клана за 10.000💰!`);
				}
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^klogo/i, "clogo", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} »  Вы не ~создатель/заместитель~ клана.`);
		if (clans[clanid].balance < 10000) return message.send(`${clans[clanid].smile} »  На балансе клана нету 10000💰.| kbank `);
		clans[clanid].balance -= 10000;
		if (clans[clanid]) {
			let smile = [`📺`, `💥`, `💣`, `💎`, `♻`, `🏆`, `🔥`, `🌚`, `👻`, `💀`, `🎄`, `🎃`, `🚀`, `🎱`, `🍼`, `🍺`, `🐔`, `🐉`, `🌈`, `🌝`].random();
			clans[clanid].smile = smile;
			return message.send(`${clans[clanid].smile} »  Вы успешно изменили логотип клана за 10000💰!`);
		}
	});
	///////////
	cmd.on(/^клист\s([0-9]+)/i, "класс", 0, (message, args) => {
		bot.botflood += 1;
		let users = acc.users;
		let user = users[message.user];
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`Вы уже состоите в клане`);
		
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^(clan|клан)$/i, "clan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		let text = ``;
		let tipe = ``;
		text += `&#4448;&#4448; 🏆 Участники Клана 🏆\n`;
		let userf = acc.users[clans[clanid].owner];
		text += `${clans[clanid].smile} » [id${clans[clanid].owner}|${userf.prefix}] | Создатель.\n`;
		for (let id in clans[clanid].users) {
			let people = acc.users[id];
			if (clans[clanid].users[id].level == 1) text += `${clans[clanid].smile} » [id${id}|${people.prefix}] | Заместитель.\n`;
			if (clans[clanid].users[id].level == 0) text += `${clans[clanid].smile} » [id${id}|${people.prefix}] | Участник.\n`;
		}

		function indexOfByKey(array, key, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i][key] == value) {
					return i;
				}
			}
			return null;
		}
		var tops = []
		for (let i in clans) {
			tops.push({
				id: i,
				balance: clans[i].balance
			})
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var inTop = indexOfByKey(tops, 'id', message.user);
		inTop++;
		if (clans[clanid].open == true) tipe += `Открытый.`
		if (clans[clanid].open == false) tipe += `Закрытый.`
		if (clans[clanid]) {
			let user = acc.users[clans[clanid].owner];
			let exs = 0;
			let convert = 0;
			for (let ii in acc.users) {
				if (acc.users[ii].lvl >= 1) {
					convert = acc.users[ii].lvl * 20;
				}
				exs += convert + acc.users[ii].exs;
			}
		let clan_exs = 0;
		for (key in clans[clanid].users) {
				clan_exs += acc.users[key].exs;
			} 

			return message.send(`
		${clans[clanid].smile} » ~ ${clans[clanid].name} ~ |${clans[clanid].smile} 
 		${clans[clanid].smile} »  Создатель: [id${clans[clanid].owner}|${user.prefix}]
 		${clans[clanid].smile} »  Номер клана: ${clans[clanid].number}
 		${clans[clanid].smile} »  Логотип клана: ${clans[clanid].smile} 
 		${clans[clanid].smile} »  Тип клана: ${tipe}
 		${clans[clanid].smile} »  Цена за вход: ${spaces(clans[clanid].price)}💰 

 		🔥 »  Опыт клана: ${spaces(clan_exs)}
        💰 »  Баланс клана: ${spaces(clans[clanid].balance)}💰 

 		${text}
		`);
		}
	});
	///////////////////////////////////////////////////////////////////////// 
	cmd.on(/^khelp$/i, "khelp", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) {
			return message.send(`
		${clans[clanid].smile} » - Команды клана -  » ${clans[clanid].smile}
		${clans[clanid].smile} » Клан - Информация о вашем клане.
		${clans[clanid].smile} » kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} » kbank - баланс клана.
		${clans[clanid].smile} » clanwar ID <ставка> - Атаковать клан.

		${clans[clanid].smile} » Покинуть - Выйти из клана
		`);
		}
		if (clans[clanid].users[message.user].level == 1) {
			return message.send(`
		${clans[clanid].smile}  - Команды клана -  » ${clans[clanid].smile}
		${clans[clanid].smile} » Клан - Информация о вашем клане. 
		${clans[clanid].smile} » kkick ID(user'a) - выгнать из клана.
		${clans[clanid].smile} » klogo - Сменить логотип клана.
		${clans[clanid].smile} » kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} » kbank - баланс клана.

		${clans[clanid].smile} » clanwar ID <ставка> - Атаковать клан.
		${clans[clanid].smile} » Заявки - список заявок на вступление.
		${clans[clanid].smile} » Кпринять ID - принять в клан. 

		${clans[clanid].smile} » Покинуть - Выйти из клана
		`);
		}
		if (clans[clanid].users[message.user].level == 2) {
			return message.send(`
		${clans[clanid].smile} - Команды клана -  » ${clans[clanid].smile}
		${clans[clanid].smile} » Клан - Информация о вашем клане. 
		${clans[clanid].smile} » kkick ID(user'a) - выгнать из клана.
		${clans[clanid].smile} » kmoder ID(user'a) - назначить заместителем.
		${clans[clanid].smile} » kremove ID(user'a) - снять заместителя.
		${clans[clanid].smile} » ktitle name - изменить название клана.
		${clans[clanid].smile} » klogo - Сменить логотип клана.

		${clans[clanid].smile} » clanwar ID <ставка> - Атаковать клан.

		${clans[clanid].smile} » kopen - Открыть клан.
		${clans[clanid].smile} » kprice - Установить цену за вход.
		${clans[clanid].smile} » kclose - Закрыть клан.

		${clans[clanid].smile} » Заявки - список заявок на вступление.
		${clans[clanid].smile} » Кпринять ID - принять в клан.
		${clans[clanid].smile} » ksliv <сумма> - раздать деньги участникам.

		${clans[clanid].smile} » kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} » kget <сумма> - снять 💰 из банка клана.
		${clans[clanid].smile} » kbank - баланс клана.
		`);
		}
	});

	//////////////////////////////////////////////////////////////////////
	cmd.on(/^kkick?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "cremove", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠| У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} »  Вы не ~создатель/заместитель~  клана.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!clans[clanid].users[res.object_id]) return message.send(`${clans[clanid].smile} »  Этого юзера нет в Вашем клане!`);
				if (!acc.users[res.object_id]) return message.send(`💥 »  Юзера нет в беседе.`);
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`🌝 »  Юзер находится в другом клане.`);
				if (clans[clanid].users[res.object_id].level == 2) return message.send(`${clans[clanid].smile} »  Нельзя выгнать создателя.`);
				if (acc.users[res.object_id].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
				delete clans[clanid].users[res.object_id];
				acc.users[res.object_id].clanid = false;
				return message.send(`${clans[clanid].smile} »  vk.com/id${res.object_id} был изгнан из клана.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			if (!clans[clanid].users[message.args[3]]) return message.send(`${clans[clanid].smile} »  Этого юзера нет в Вашем клане!`);
			if (!acc.users[message.args[3]]) return message.send(`💥 »  Юзера нет в беседе.`);
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 »  Юзер находится в другом клане.`);
			if (clans[clanid].users[message.args[3]].level == 2) return message.send(`${clans[clanid].smile} »  Нельзя выгнать создателя.`);
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
			delete clans[clanid].users[message.args[3]];
			acc.users[message.args[3]].clanid = false;
			return message.send(`${clans[clanid].smile} »  vk.com/id${message.args[3]} был изгнан из клана.`);
		}
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kmoder?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "kmoder", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} »  Вы не ~создатель/заместитель~  клана.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (acc.users[res.object_id].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
				if (!acc.users[res.object_id]) return message.send(`💥 »  Юзера нет в беседе.`);
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`💥 »  Юзер уже состоит в другом клане.`);
				clans[clanid].users[res.object_id].level = 1;
				return message.send(`${clans[clanid].smile} »  vk.com/id${res.object_id} был назначен заместителем в клане.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
			if (!acc.users[message.args[3]]) return message.send(`💥 »  Юзера нет в беседе.`);
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 »  Юзер уже состоит в другом клане.`);
			clans[clanid].users[message.args[3]].level = 1;
			return message.send(`${clans[clanid].smile} »  vk.com/id${message.args[3]} был назначен заместителем в клане.`);
		}
	});
	/////////////////////////////////////////////////////////////////////
	cmd.on(/^kremove?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "kmoder", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} »  Вы не ~создатель/заместитель~  клана.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`💥 »  Юзера нет в беседе.`);
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`💥 »  Юзер уже состоит в другом клане.`);
				if (acc.users[res.object_id].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
				clans[clanid].users[res.object_id].level = 0;
				return message.send(`${clans[clanid].smile} »  vk.com/id${res.object_id} был понижен до <участника> в клане.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			if (!acc.users[message.args[3]]) return message.send(`💥 »  Юзера нет в беседе.`);
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 »  Юзер уже состоит в другом клане.`);
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 »  Юзер не состоит в клане.`);
			clans[clanid].users[message.args[3]].level = 0;
			return message.send(`${clans[clanid].smile} »  vk.com/id${message.args[3]} был понижен до <участника> в клане.`);
		}
	});
	//////////////////////////////////////////////////////////////////////

	cmd.on(/^(?:clanwar)\s?([0-9]+)?\s?([^\s	].*)?/i, 'clanwar', 0, message => { 
		let clanid = acc.users[message.user].clanid;
		if(!message.args[1]) return message.send(`💡 » Укажите ID клана, который хотите атаковать.`);
		if(!message.args[2]) return message.send(`💡 » Укажите ставку.`);
		if(clans[clanid].war == true) return message.send(`⚠ » Атаковать клан можно раз в 10 минут.`);
		let id = Number(message.args[1]); 
		let amount = parserInt(message.args[2]);
		if(amount < 1000) return message.send(`💰 » Минимальная сумма для атаки 1.000💰`);
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} »  Вы не ~создатель/заместитель~  клана.`);
		if(id == clanid) return message.send(`💡 » Нельзя нападать на свой клан.`);
		if(amount > clans[clanid].balance) return message.send(`💰 » На счету вашего клана не хватает 💰`);
		if(amount > clans[id].balance) return message.send(`💰 » На счету  клана (ID: ${id}) не хватает 💰`); 
		if (clanid == false) return message.send(`⚠ »  У вас нет клана.`);
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (!clans[id]) return message.send(`⚠ » Такого клана нет.`);

		clans[clanid].war = true;
			setTimeout(() => {
				clans[clanid].war = false;
			}, 600000);

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += amount;
			clans[clanid].balance -= amount;
			return message.send(`🛡 Clan War 🛡\n⚔ » Клан ${clans[clanid].name} напал на ${clans[id].name}\n🏆 » Победу одержал клан: ${clans[id].name}\n💰 » Выигрыш: ${spaces(amount)} 💰`);
		}else{
			clans[id].balance -= amount;
			clans[clanid].balance += amount;
			return message.send(`🛡 Clan War 🛡\n⚔ » Клан ${clans[clanid].name} напал на ${clans[id].name}\n🏆 » Победу одержал клан: ${clans[clanid].name}\n💰 » Выигрыш: ${spaces(amount)} 💰`);
		}
	});	
	//////////////////////////////////////////////////////////////////////
	cmd.on(/^кланы/i, "кланы", 0, (message, args) => {
		bot.botflood += 1;
		if (!clans) return message.send(`⚠ »  Кланов нет.`);
		let text = '';
		text += `~ 💥| Кланы  |💥 ~\n`;
		for (let id in clans) {
			let user = acc.users[clans[id].owner];
			text += `
             💎 » Название: ${clans[id].name}
             🆔 »  Номер: ${clans[id].number}
             💰 »  Цена входа: ${spaces(clans[id].price)}💰
             💥 »  Баланс клана: ${spaces(clans[id].balance)}💰
             🥇 »  Создал:  [id${clans[id].owner}|${user.prefix}]
             ~~~~~~~~~~~~~~
             `;
		}
		return message.send(text);
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kbank/i, "cremove", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		return message.send(`${clans[clanid].smile} »  Баланс Вашего клана: ${spaces(clans[clanid].balance)} 💰`);
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kput\s?([^\s	].*)?/i, "cremove", 0, (message, args) => {
		bot.botflood += 1; 
		if (!message.args[1]) return message.send(`⚠ »  Укажите сумму вклада.`);
		let amount = parserInt(message.args[1]); 
		if(amount <= 20000) return message.send(`💰 » Минимальная сумма вклада больше 20.000💰 `); 
		if(!Number(amount)) return;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `Вклад не может быть меньше 0 или равен 0 💰.` : `Вклад не может превышать Ваш баланс.`);
		user.balance -= Number(amount);
		clans[clanid].balance += Number(amount);
		return message.send(`${clans[clanid].smile} »  Вы успешно положили ${spaces(amount)}💰 в банк клана.`);
	});
	cmd.on(/^kget\s?([^\s	].*)?/i, "kget", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`⚠ »  Укажите сумму снятия.`);
		let amount = parserInt(message.args[1]); 
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ »  У вас нет клана.`);
		if(amount < 20000) return message.send(`💰 » Минимальный вклад 20.000 💰`);
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} »  Снимать деньги может только создатель клана.`);
		if (amount > clans[clanid].balance) return message.send(`${clans[clanid].smile} »  Данной суммы нет в банке клана.`);
		if (amount <= 0) return message.send(`${clans[clanid].smile} »  Сумма не должна быть меньше или равно 0 💰.`);
		user.balance += Number(amount);
		clans[clanid].balance -= Number(amount);
		return message.send(`${clans[clanid].smile} »  Вы успешно сняли ${spaces(amount)}💰 с банка клана.`);
	});
	////////////////////////////////////////////////
	cmd.on(/^выбрать?\s([0-9]+)?/i, "выбрать", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`Укажите 🆔 оружия, которое хотите выбрать.`);
		if (message.args[1] > 16) return message.send(`Оружия с таким 🆔 нету`);
		if (message.args[1] < 0) return message.send(`Оружия с таким 🆔 нету`);
		if (!cases[message.user].cases[message.args[1]]) return message.send(`У вас нет такого оружия!`);
		acc.users[message.user].gunname = cases[message.user].cases[message.args[1]].name;
		return message.send(`Вы взяли в руки оружие: ${cases[message.user].cases[message.args[1]].name}`);
	});
	/////////////////////////////////////////////////////////////////// КЕЙСЫ
	cmd.on(/^(?:магазин|shop)$/i, 'все', 0, message => {
		bot.botflood += 1;
		return message.send(`
		🆔 1 » Биткоин | Цена: 50.000💰 
    🆔 2 » VIP | Цена: 50.000.000💰 

    💼 » Кейсы:
    🆔 3 » Кейс <новичка> | 20.000💰 
    🆔 4 » Кейс <профи> | 40.000💰 
    🆔 5 » Кейс <легендарный> | 1 БитКоин 
    🆔 6 » Ключ к кейсам. | 10.000💰 

    🌴 » Донат-Ферма:
    💶 » Ферма - Информация. 
    💶 » Купить ферму - Купить Донат-ферму за донат. 

    🔥 » Для покупки товара введите: 
    🔥 » Купить ID (ID - товара)
		`);
	});
	///////////////
	////////////////////майнинг ферма
	cmd.on(/^(?:фермы)$/i, 'все', 0, message => {
		bot.botflood += 1;
		return message.send(`
		💶| ~ Донат-Ферма ~ |💶
		Хотите получать Донат?
		Просто купите Донат-ферму 
	    И она сделает все за Вас.
		Заработок валюты проходит автоматически.
		Ежечасно на баланс будут приходить Донат-очки.
		~~~~~~~~~~~
		Цена: 1000 донат очков.
		Доход: 3 донат в час.
		~~~~~~~~~~~

		🔥 » Команды фермы:
    	🔥 » Ферма - info 
    	🔥 » Улучшить - улучшить ферму.
    	🔥 » Купить ферму - Купить ферму

		
		`);
	});
	///////////////////////////////
	cmd.on(/^биткоин$/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`🔥 » Пример команды: Биткоин [баланс/продать/купить] <кол-во> `);
	});
	cmd.on(/^биткоин баланс$/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user]
		return message.send(`💰 » На балансе ${spaces(user.bitcoin)} Биткоинов.`);
	});
	cmd.on(/^биткоин купить\s?([0-9]+)?/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🔥 » Пример команды: Биткоин [баланс/продать/купить] <кол-во> `);
		let user = acc.users[message.user]
		let price = Number(message.args[1]) * 350000;
		if (user.balance < price) return message.send(`⚠ » ${message.args[1]} Биткоин(ов) стоит(ят) ${spaces(price)} 💰`);
		user.balance -= price;
		user.bitcoin += Number(message.args[1]);
		return message.send(`💰 » Вы купили ${message.args[1]} биткоин(ов). \n💰 » На балансе ${spaces(user.bitcoin)} Биткоинов.`);
	});
	cmd.on(/^биткоин продать\s?([0-9]+)?/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🔥 » Пример команды: Биткоин [баланс/продать/купить] <кол-во>`);
		let user = acc.users[message.user]
		if (user.bitcoin < message.args[1]) return message.send(`🔥 » У вас нет столько БитКоинов.`);
		let sell = rand(12000, 22000);
		let price = Number(message.args[1]) * sell;
		user.balance += price;
		user.bitcoin -= Number(message.args[1]);
		return message.send(`💰 » Вы продали БитКоины: ${spaces(message.args[1])}\n💰 » Вы получили ${spaces(price)}💰.\n💰 » Ставка: 1 БитКоин ~ ${spaces(sell)}💰`);
	});
	cmd.on(/^(?:ферма)$/i, 'все', 0, message => {
		bot.botflood += 1;
		if (!ferm[message.user]) return message.send(`💶 » У вас нет Донат-Фермы.`);
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			return message.send(`
    	💶 Ваша Донат-Ферма 💶
    	🌴 » Владелец: ${user.first_name} ${user.last_name}
    	🌴 » Уровень фермы: ${ferm[message.user].level}
    	🌴 » Цена улучшения: ${spaces(ferm[message.user].lvlup)} доната 💎
    	🌴 » Прибыль: ${spaces(ferm[message.user].dohod)} Доната в час.

    	🔥 ~ Команды Донат-фермы ~ 🔥
    	🔥 » Информация: ферма.
    	🔥 » Улучшить ферму: улучшить.
    	`);
		})
	});
	////////////////
	cmd.on(/^(?:улучшить)/i, 'все', 0, message => {
		bot.botflood += 1;
		if (!ferm[message.user]) return message.send(`💶 » У вас нет Донат-Фермы.`);
		let user = acc.users[message.user];
		if (user.donate < ferm[message.user].lvlup) return message.send(`💶 » Для повышения уровня Донат-фермы нужно: ${spaces(ferm[message.user].lvlup)}💰`);
		user.donate -= ferm[message.user].lvlup;
		ferm[message.user].lvlup += 5;
		ferm[message.user].level += 1;
		ferm[message.user].dohod += 1;
		return message.send(`🔥 » Вы купили улучшение Донат-фермы. Заработок увеличился!\n\n🔥 » Информация:  ферма \n🔥 » Улучшить ферму: улучшить.`);
	});
	////////////////
	cmd.on(/^(?:купить)\s?([0-9]+)?$/i, 'все', 0, message => {
		bot.botflood += 1;
		if (message.text == 'купить ферму') return;
		let text = message.args[1];
		if (!text) return message.send("⚠ » Введите ID товара!");
		let user = acc.users[message.user]
		if (message.args[1] == "1") {
			if (user.balance < 50000) return message.send(`⚠  » 1 Биткоин стоит 50.000 💰`);
			user.balance -= 50000;
			user.bitcoin += 1;
			return message.send(`💰 » Вы купили 1 биткоин. \n 💰 » На балансе ${spaces(user.bitcoin)} Биткоинов.`);
		}
		if (message.args[1] == "2") {
			if (user.balance < 50000000) return message.send(`⚠ » VIP права стоят 50.000.000💰`);
			if (user.level > 1) return message.send(`⚠ » У вас админ-уровень выше чем VIP`);
			user.balance -= 50000000;
			user.level = 1;
			return message.send(`💰 » Вы купили VIP права. \n 💰 » Список команд: Вип.`);
		}
		// кейсы -   - -- -- - -- -  --- - -- - - - - - --- - -- - -- --
		if (message.args[1] == "3") {
			if (user.balance < 20000) return message.send(`💼 » Кейс <новичка> стоит 2.000💰.`);
			user.balance -= 20000;
			if (!cases[message.user]) {
				cases[message.user] = {
					casename: false,
					count: false,
					skinid: false,
					caseone: 0,
					casetwo: 0,
					casethree: 0,
					keys: 0,
					cases: {}
				}
			}
			cases[message.user].caseone += 1;
			return message.send(`💼| Вы купили кейс <новичка> |💼`);
		}
		if (message.args[1] == "4") {
			if (user.balance < 40000) return message.send(`💼 » Кейс <профи> стоит 40.000💰.`);
			user.balance -= 40000;
			if (!cases[message.user]) {
				cases[message.user] = {
					casename: false,
					count: false,
					skinid: false,
					caseone: 0,
					casetwo: 0,
					casethree: 0,
					keys: 0,
					cases: {}
				}
			}
			cases[message.user].casetwo += 1;
			return message.send(`💼| Вы купили кейс <профи> |💼`);
		}
		if (message.args[1] == "5") {
			if (user.bitcoin < 1) return message.send(`💼 » Кейс <легендарный> стоит 1 БитКоин.`);
			user.bitcoin -= 1;
			if (!cases[message.user]) {
				cases[message.user] = {
					casename: false,
					count: false,
					skinid: false,
					caseone: 0,
					casetwo: 0,
					casethree: 0,
					keys: 0,
					cases: {}
				}
			}
			cases[message.user].casethree += 1;
			return message.send(`💼 » Вы купили кейс <легендарный> |💼`);
		}
		if (message.args[1] == "6") {
			if (user.balance < 10000) return message.send(`🔑 » Ключ для кейса стоит 10.000💰.`);
			user.balance -= 10000;
			if (!cases[message.user]) {
				cases[message.user] = {
					casename: false,
					count: false,
					skinid: false,
					caseone: 0,
					casetwo: 0,
					casethree: 0,
					keys: 0,
					cases: {}
				}
			}
			cases[message.user].keys += 1;
			return message.send(`🔑 » Вы купили ключ для открытия кейсов |🔑`);
		} else {
			return message.send(`⚠ » Вы указали неверный 🆔 товара.\nВсе товары вы можете найти в: магазин`);
		}
	});
	cmd.on(/^кейсы/i, "casebuy", 0, (message, args) => {
		bot.botflood += 1;
		if (!cases[message.user]) return message.send(`💼 » У вас нет кейсов. Купите в: магазин.`);
		let user = cases[message.user];
		return message.send(`
		↔ Ваши кейс ↔
		🆔 3 » Кейсов <новичок> - ${user.caseone}.
		🆔 4 » Кейсов <профи> - ${user.casetwo}.
		🆔 5 » Кейсов <легендарный> - ${user.casethree}.
		🔑 » Ключей - ${user.keys}.

		💼 » Открыть: открыть ID(кейса).
		💼 » Просмотр оружия: оружие
		💼 » Продать оружие: продать ID
		`);
	});
	cmd.on(/^(?:открыть)\s?([0-9]+)?/i, 'кейс', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🆔 » Укажите ID кейса.\n💼 Команда:  кейсы`);
		if (!cases[message.user]) return message.send(`💼 » У вас нет кейсов. Купите в: магазин.`);
		let text = message.args[1];
		let user = cases[message.user];
		if (!text) return message.send("⚠ Введите ID кейса!");
		if (text != Number(message.args[1])) return message.send(` 💼 » Такого кейса нет :(`);
		if (text < 3) return message.send(` 💼 » Такого кейса нет :(`);
		if (text > 5) return message.send(` 💼 » Такого кейса нет :(`);
		if (user.keys < 1) return message.send(`🔑 » У вас нет ключа. Купите в: магазин.`);
		if (text == 3) {
			if (user.caseone < 1) return message.send(`💼 » У вас не куплен кейс <новичок> |  магазин`);
			user.keys -= 1;
			user.caseone -= 1;
			let item = caseone.random();
			if (!user.cases[item.skinid]) {
				user.cases[item.skinid] = {
					skinid: 0,
					name: 0,
					price: 0,
					copii: 1
				}
			}
			if (user.cases[item.skinid].name == item.case) {
				user.cases[item.skinid].copii += 1;
			}
			user.cases[item.skinid].skinid = item.skinid;
			user.cases[item.skinid].name = item.case;
			user.cases[item.skinid].price = item.price;
			return message.reply(` 🔔 » Вы открыли кейс <новичок> | 🔔\n 🐩 » Вам выпало: ${item.case}\n 💰 » Цена: ${spaces(item.price)}💰\n🆔 » skin ${item.skinid} \n⚠ » Просмотр ваших кейсов:  кейсы\n⚠ » Просмотр оружия:  оружие`, {
				attachment: item.photo
			});
		}
		if (text == 4) {
			if (user.casetwo < 1) return message.send(`💼 » У вас не куплен кейс <профи>  »  магазин`);
			user.keys -= 1;
			user.casetwo -= 1;
			let item = casetwo.random();
			if (!user.cases[item.skinid]) {
				user.cases[item.skinid] = {
					skinid: 0,
					name: 0,
					price: 0,
					copii: 1
				}
			}
			if (user.cases[item.skinid].name == item.case) {
				user.cases[item.skinid].copii += 1;
			}
			user.cases[item.skinid].skinid = item.skinid;
			user.cases[item.skinid].name = item.case;
			user.cases[item.skinid].price = item.price;
			return message.reply(` 🔔 » Вы открыли кейс <профи> 🔔\n 🐩 » Вам выпало: ${item.case}\n 💰 » Цена: ${spaces(item.price)}💰\n🆔 » skin  ${item.skinid} \n⚠ » Просмотр ваших кейсов:  кейсы\n⚠ » Просмотр оружия:  оружие`, {
				attachment: item.photo
			});
		}
		if (text == 5) {
			if (user.casethree < 1) return message.send(`💼 » У вас не куплен кейс <легендарный>  »  магазин`);
			user.keys -= 1;
			user.casethree -= 1;
			let item = casethree.random();
			if (!user.cases[item.skinid]) {
				user.cases[item.skinid] = {
					skinid: 0,
					name: 0,
					price: 0,
					copii: 1
				}
			}
			if (user.cases[item.skinid].name == item.case) {
				user.cases[item.skinid].copii += 1;
			}
			user.cases[item.skinid].skinid = item.skinid;
			user.cases[item.skinid].name = item.case;
			user.cases[item.skinid].price = item.price;
			return message.reply(` 🔔 » Вы открыли кейс <легендарный> » 🔔\n 🐩 » Вам выпало: ${item.case}\n 💰 » Цена: ${spaces(item.price)}💰\n🆔 » skin ${item.skinid} \n⚠ » Просмотр ваших кейсов: кейсы\n⚠ » Просмотр оружия:  оружие`, {
				attachment: item.photo
			});
		} else {
			return message.send(`🔔 » Проверьте вводимые данные.`);
		}
	})
	////////////////
	cmd.on(/^(?:оружие)/i, 'cinfo', 0, message => {
		bot.botflood += 1;
		if (!cases[message.user]) return message.send(`💼 » У вас нет кейсов. Купите в:  магазин.`);
		let text = ``;
		text += `💼 » Ваши оружия:\n`;
		let cese = cases[message.user];
		for (let id in cese.cases) {
			text += `➡ » ${cases[message.user].cases[id].name}  » 🆔 skin ${id}\n`;
		}
		text += `\n🆔 » Продажа оружия:  продать ID\n🔫 » Взять оружие: "выбрать ID" (оружия)`;
		return message.send(text);
	});
	//////////////
	cmd.on(/^(?:продать)\s?([0-9]+)?/i, 'кейс', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🆔 » Укажите ид скина.  » Кмд:  оружие`);
		if (!cases[message.user]) return message.send(`💼 » У вас нет кейсов. Купите в: магазин.`);
		let user = acc.users[message.user];
		let idcase = message.args[1];
		if (!cases[message.user].cases[idcase]) return message.send(`💼 » У вас нет такого скина. | скины:  оружие`);
		if (idcase == cases[message.user].cases[idcase].skinid) {
			let price = cases[message.user].cases[idcase].price * cases[message.user].cases[idcase].copii;
			let name = cases[message.user].cases[idcase].name;
			user.balance += price;
			delete cases[message.user].cases[idcase];
			return message.send(`&#128142; » Вы продали все скины <${name}>\n&#128179; » Общая сумма продажи: ${spaces(price)} Р`);
		}
		return message.send(`🎃 » У вас нет такого скина.  » Скины:  оружие`);
	});
	/////////////////////\
	var caseone = [{
		case: "AWP | Cotticera",
		photo: "photo475315118_456240414",
		price: 5500,
		skinid: 4
	}, {
		case: "StatTrak | Слоновая кость",
		photo: "photo475315118_456240415",
		price: 5500,
		skinid: 5
	}, {
		case: "PP-Bizon | Osiris",
		photo: "photo475315118_456240417",
		price: 3500,
		skinid: 7
	}, {
		case: "CZ75-Auto | Tuxedo",
		photo: "photo475315118_456240418",
		price: 7500,
		skinid: 8
	}, {
		case: "Karambit | Fade",
		photo: "photo475315118_456240420",
		price: 11200,
		skinid: 10
	}];
	var casetwo = [{
		case: "Dragn Lore",
		photo: "photo475315118_456240411",
		price: 2000,
		skinid: 1
	}, {
		case: "Desert Eagle | Ржавый кобальт",
		photo: "photo475315118_456240412",
		price: 5000,
		skinid: 2,
	}, {
		case: "AWP | Cotticera",
		photo: "photo475315118_456240414",
		price: 5500,
		skinid: 4
	}, {
		case: "AWP | Бог червей",
		photo: "photo475315118_456240416",
		price: 6500,
		skinid: 6
	}, {
		case: "PP-Bizon | Osiris",
		photo: "photo475315118_456240417",
		price: 3500,
		skinid: 7
	}, {
		case: "CZ75-Auto | Tuxedo",
		photo: "photo475315118_456240418",
		price: 7500,
		skinid: 8
	}, {
		case: "Sawed-Off | Оригами",
		photo: "photo475315118_456240419",
		price: 9000,
		skinid: 9
	}, {
		case: "Karambit | Fade",
		photo: "photo475315118_456240420",
		price: 11200,
		skinid: 10
	}, {
		case: "AUG | Радиационная опасность",
		photo: "photo475315118_456240421",
		price: 9900,
		skinid: 11
	}, {
		case: "UMP-45 | Индиго",
		photo: "photo475315118_456240422",
		price: 15900,
		skinid: 12
	}, {
		case: "Desert Eagle | Оксидное пламя.",
		photo: "photo475315118_456240424",
		price: 22900,
		skinid: 14
	}, {
		case: "Tec-9 | Hades.",
		photo: "photo475315118_456240425",
		price: 27300,
		skinid: 15
	}];
	var casethree = [{
		case: "Dragn Lore",
		photo: "photo475315118_456240411",
		price: 17000,
		skinid: 1
	}, {
		case: "Desert Eagle | Ржавый кобальт",
		photo: "photo475315118_456240412",
		price: 18900,
		skinid: 2
	}, {
		case: "M4A4 | Asiimov",
		photo: "photo475315118_456240413",
		price: 25000,
		skinid: 3
	}, {
		case: "AWP | Cotticera",
		photo: "photo475315118_456240414",
		price: 24500,
		skinid: 4
	}, {
		case: "AWP | Бог червей",
		photo: "photo475315118_456240416",
		price: 22500,
		skinid: 6
	}, {
		case: "PP-Bizon | Osiris",
		photo: "photo475315118_456240417",
		price: 30000,
		skinid: 7
	}, {
		case: "CZ75-Auto | Tuxedo",
		photo: "photo475315118_456240418",
		price: 28400,
		skinid: 8
	}, {
		case: "Sawed-Off | Оригами",
		photo: "photo475315118_456240419",
		price: 29000,
		skinid: 9
	}, {
		case: "Karambit | Fade",
		photo: "photo475315118_456240420",
		price: 31200,
		skinid: 10
	}, {
		case: "AUG | Радиационная опасность",
		photo: "photo475315118_456240421",
		price: 29900,
		skinid: 11
	}, {
		case: "UMP-45 | Индиго",
		photo: "photo475315118_456240422",
		price: 25900,
		skinid: 12
	}, {
		case: "AK47 | Vulcan",
		photo: "photo475315118_456240423",
		price: 29900,
		skinid: 13
	}, {
		case: "Desert Eagle | Оксидное пламя.",
		photo: "photo475315118_456240424",
		price: 22900,
		skinid: 14
	}, {
		case: "Tec-9 | Hades.",
		photo: "photo475315118_456240425",
		price: 27300,
		skinid: 15
	}, {
		case: "StatTrak AUG | Wings.",
		photo: "photo475315118_456240426",
		price: 33500,
		skinid: 16
	}];
	//////////////////// ферма
	cmd.on(/^купить ферму$/i, "buyferm", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (user.donate < 1000) return message.send(`⚠ » Покупка Донат-Фермы стоит 1.000 доната  » Кмд:  донат`);
		user.donate -= 1000;
		if (ferm[message.user]) return message.send(`💶 » У вас уже куплена Донат-Ферма: ферма `);
		if (!ferm[message.user]) {
			ferm[message.user] = {
				owner: message.user,
				level: 1,
				dohod: 3,
				lvlup: 300
			}
			return message.send(`💶 » Вы купили Донат-Ферму. Инфа:  ферма |💶`);
		}
	});
	cmd.on(/^фортуна$/i, "крутить", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`
    💠 Призы рулетки 💠
    &#4448;💠 » ADMIN права.
    &#4448;💠 » MODER права.
    &#4448;💠 » VIP права.
    &#4448;💠 » Донат.
    &#4448;💠 » Опыт.
    &#4448;💠 » БитКоины.
    &#4448;💠 » Валюта.

    ✳ » Цена прокрутки: 30 доната.
    ✳ » Команда: 'крутить'
    `);
	});
	////////////////////////////
	cmd.on(/^крутить$/i, "крутить", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (user.donate < 30) return message.send(`💠 » Прокрутка рулетки стоит 30 доната.`);
		user.donate -= 30;
		let balan = rand(290000, 450000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (user.level > 1) {
						user.balance += 400000;
						return message.send(`💠 » Вы выиграли 400.000💰`);
					}
					user.level = 1;
					return message.send(`👑 » Вы выиграли VIP права.\n👑 » Команды для VIP: "Вип"`);
				}
			} else {
				user.balance += balan;
				return message.send(`💠 » Вы выиграли ${spaces(balan)}💰`);
			}
			if (win2 > 1) {
				user.balance += balan;
				return message.send(`💠 » Вы выиграли ${spaces(balan)}💰`);
			}
		}
		if (win == 2) {
			user.balance += balan;
			return message.send(`💠 » Вы выиграли ${spaces(balan)}💰`);
		}
		if (win == 3) {
			let balenc = balan - 5000;
			user.balance += balenc;
			return message.send(`💠 » Вы выиграли ${spaces(balenc)}💰`);
		}
		if (win == 4) {
			let don = rand(20, 35);
			user.donate += don;
			return message.send(`💎 » Вы выиграли ${spaces(don)} доната.`);
		}
		if (win == 5) {
			let exs = rand(35, 60);
			user.exs += exs;
			return message.send(`🔥 » Вы выиграли ${spaces(exs)} опыта.`);
		}
		if (win == 6) {
			let bit = rand(2, 4);
			user.bitcoin += bit;
			return message.send(`✨ » Вы выиграли ${spaces(bit)} БитКоина.`);
		}
	});
	//////////////////////////  донат
	cmd.on(/^(?:донат|donat|donate)/i, "донат", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`

 	 	💰 Донат-меню:
    ⛔ » Ваш баланс: ${spaces(acc.users[message.user].donate)} доната
    💎 » Смена ника - 100 доната!
    💎 » Addclan - цена создания клана 100 доната!
    💎 » Купить ферму - покупка фермы 1000 доната!
    💎 » Информация о ферме - ферма

    🔸Привилегии: 
    🔸 » VIP права - 140 рублей. 
    🔸 » Модер права - 300 рублей. 
    🔸 » Разбан - 120 рублей.
    🔸 » 5.000.000$ - 200 рублей.
    🔸 » 100 доната - 100 рублей.
    🔸 » Администратор права - 1000 рублей.
    🔸 » Разработчик права - 5000 рублей.

    
 	 	`)
	});

	cmd.on(/^(?:влист)$/i, "бот", 0, (message, args) => {
		let text = `👑 VIP LIST 👑\n`;
		let vip = 0;
		for(let id in acc.users) {																																																																																																																					
     			 if(acc.users[id].level == 1){
     			 		vip += 1;
     			 		text += `👒» @id${id}(${acc.users[id].prefix}) | ID: ${id}\n`;
     			 } 
 		} 
 		message.send(text);
	});

	cmd.on(/^(?:бот)$/i, "бот", 0, (message, args) => {
		bot.botflood += 1;
		let people = 0;
		let banned = 0;
		let balance = 0;
		let coder = 0;
		let vip = 0;
		let moder = 0;
		let admin = 0;
		let devel = 0;
		let cmd = botinfo.msg;
		let developer = '';
for(let id in acc.users) {																																																																																																																					
     			 people += 1;
     			 if(acc.users[id].level == -1) banned += 1;
     			 if(acc.users[id].level == 1) vip += 1;
     			 if(acc.users[id].level == 2) moder += 1;
     			 if(acc.users[id].level == 3) admin += 1; 
     			 if(acc.users[id].level == 4) devel += 1;
				 if(acc.users[id].level == 5) coder +=1;

 } 
		return message.send(`
     📊 » Информация о проекте: 
     &#4448;💻 » Проект: [kingbots_2018| KingBots]
	 &#4448;⚙ » Название бота: Егор 
	 &#4448;📎 » Основатель: @garanttop3(Ильдар Гафиятуллин)
	 &#4448;✒ » Дизайнер: @sv1007(Сергей Волков)
	 &#4448;🖤 » Кодер: @a_6666(Ммм🖤🖤🖤)
	 &#4448;🖤 » Кодер: @c_6666(Ммм🖤🖤🖤)
	 &#4448;👤 » Разработчик Кода: @c_o_d_e_r(Vlad Kucher)
     📚 Интересное: 
     &#4448;📥 » Обработано команд: ${cmd}  
     &#4448;📊 » Аптайм: ${botinfo.uptime}
     &#4448;📊 » Пинг: ${botinfo.ping}

     &#4448;👪 » Всего пользователей: ${people}
     &#4448;👪 » Из них:
     &#4448;👼 » Кодеров: ${coder} 
	 &#4448;👼 » Разработчиков: ${devel}
     &#4448;👮 » Администраторов: ${admin}
     &#4448;🕵 » Модераторов: ${moder}
     &#4448;🎅 » VIP: ${vip}
     &#4448;👦 » Пользователей: ${spaces(people)} 


     ⛔ » Не забудьте вступить в группу: [kingbots_2018| KingBots]
     📢 » В ЛС группы работает бот - без задержек.
     🆘 » Страничку бота могут заблокировать, а так вы нас не потеряете

        `);
	});
	////////////////////////////////////////////////////// system car
	cmd.on(/^(?:машины)$/i, "машины", 0, (message, args) => {
		bot.botflood += 1;
		if (!car[message.user]) {
			car[message.user] = {
				carid: 0,
				carname: "Отсутствует",
				price: 0
			}
		}
		return message.send(`
🚘| Машины: 
➕ 1. Ваз 1111 - 24.000 💰
➕ 2. Ваз 2101 - 50.000 💰
➕ 3. Ваз 2103 - 80.000 💰
➕ 4. Ваз 2110 - 140.000 💰
➕ 5. Лада X-Ray - 210.000 💰
➕ 6. BMW E30 - 430.000 💰 
➕ 7. Mitsubishi Lancer - 1.000.000 💰
➕ 8. Mercedes-Benz S - 2.800.000 💰
➕ 9. Audi A7 - 3.200.000 💰 
➕ 10. Porsche Cayenne - 5.700.000 💰 
➕ 11. Toyota Camry - 7.800.000 💰 
➕ 12. Mercedes-Benz G - 12.300.000 💰 
➕ 13. Lamborghini Veneno - 20.000.000 💰
➕ 14. Tesla Roadster - 27.000.000 💰 
➕ 15. Thrust SSC - 48.000.000 💰 
➕ 16. Mazda CX-5 - 120.000.000 💰
➕ 17. Hyundai ix35 - 210.000.000 💰
➕ 18. DeLorean DMC-12 - 376.000.000 💰 
➕ 19. Koenigsegg Agera R - 600.500.000 💰 
➕ 20. Bugatti Chiron - 980.000.000 💰 

💡 Для покупки используйте: "машина [номер]". 
💡 Для продажи: "машина продать".
💡 ПРОДАЕТСЯ ЗА ПОЛ ЦЕНЫ!
    `);
	});
	/////////////////////////////////////////////////////
	cmd.on(/^(?:машина продать)/i, 'машина продать', 0, message => {
		bot.botflood += 1;
		if (!car[message.user]) {
			car[message.user] = {
				carid: false,
				carname: "Отсутствует",
				price: 0
			}
		}
		let user = acc.users[message.user];
		if (car[message.user].carid == false) return message.send(`🚗 » У вас нету машины.\n🚗 » Список машин: Машины`);
		let name = car[message.user].carname;
		let price = car[message.user].price / 2;
		user.balance += price;
		car[message.user].carid = false;
		car[message.user].carname = "Отсутствует";
		car[message.user].price = 0;
		return message.send(`🚙 » Вы продали машину ${name} за ${spaces(price)} 💰`);
	});
	////////////////////////////////////////////////////
	cmd.on(/^(?:машина)\s?([0-9]+)?$/i, 'машина', 0, message => {
		bot.botflood += 1;
		if (message.args[0] == 'машина продать') return;
		let user = acc.users[message.user];
		if (!car[message.user]) {
			car[message.user] = {
				carid: false,
				carname: "Нету",
				price: 0
			}
		}
		if (car[message.user].carid != false) return message.send(`🚗 » У вас уже есть машина: ${car[message.user].carname}\n🚗 » Чтобы купить новую - продайте ее.\n🚗 » Команда:  машина продать`);
		if (!message.args[1]) return message.send(`🚘 » Укажите 🆔 машины`);
		let text = Number(message.args[1]);
		if (text == 1) {
			let name = `Ваз 1111`
			if (user.balance < 24000) return message.send(`🚘 » Ваз 1111 стоит 24.000 💰.`);
			user.balance -= 24000;
			car[message.user].carid = 1;
			car[message.user].carname = "Ваз 1111";
			car[message.user].price = 24000;
			return message.send(`🚘 » Вы купили ${name} за 24.000 💰`);
		}
		if (text == 2) {
			let name = `Ваз 2101`
			if (user.balance < 50000) return message.send(`🚘 » ${name} стоит 50.000 💰.`);
			user.balance -= 50000;
			car[message.user].carid = 2;
			car[message.user].carname = name;
			car[message.user].price = 50000;
			return message.send(`🚘 » Вы купили ${name} за 50.000 💰`);
		}
		if (text == 3) {
			let name = `Ваз 2103`
			if (user.balance < 80000) return message.send(`🚘 » ${name} стоит 80.000 💰.`);
			user.balance -= 80000;
			car[message.user].carid = 3;
			car[message.user].carname = name;
			car[message.user].price = 80000;
			return message.send(`🚘 » Вы купили ${name} за 80.000 💰`);
		}
		if (text == 4) {
			let name = `Ваз 2110`
			if (user.balance < 140000) return message.send(`🚘 » ${name} стоит 140.000 💰.`);
			user.balance -= 140000;
			car[message.user].carid = 4;
			car[message.user].carname = name;
			car[message.user].price = 140000;
			return message.send(`🚘 » Вы купили ${name} за 140.000 💰`);
		}
		if (text == 5) {
			let name = `Лада X-Ray`
			if (user.balance < 210000) return message.send(`🚘 » ${name} стоит 210.000 💰.`);
			user.balance -= 210000;
			car[message.user].carid = 5;
			car[message.user].carname = name;
			car[message.user].price = 210000;
			return message.send(`🚘 » Вы купили ${name} за 210.000 💰`);
		}
		if (text == 6) {
			let name = `BMW E30`
			if (user.balance < 430000) return message.send(`🚘 » ${name} стоит 430.000 💰.`);
			user.balance -= 430000;
			car[message.user].carid = 6;
			car[message.user].carname = name;
			car[message.user].price = 430000;
			return message.send(`🚘 » Вы купили ${name} за 430.000 💰`);
		}
		if (text == 7) {
			let name = `Mitsubishi Lancer`
			if (user.balance < 1000000) return message.send(`🚘 » ${name} стоит 1.000.000 💰.`);
			user.balance -= 1000000;
			car[message.user].carid = 7;
			car[message.user].carname = name;
			car[message.user].price = 1000000;
			return message.send(`🚘 » Вы купили ${name} за 1.000.000 💰`);
		}
		if (text == 8) {
			let name = `Mercedes-Benz S`
			if (user.balance < 2800000) return message.send(`🚘 » ${name} стоит 2.800.000 💰.`);
			user.balance -= 2800000;
			car[message.user].carid = 8;
			car[message.user].carname = name;
			car[message.user].price = 2800000;
			return message.send(`🚘 » Вы купили ${name} за 2.800.000 💰`);
		}
		if (text == 9) {
			let name = `Audi A7`
			if (user.balance < 3200000) return message.send(`🚘 » ${name} стоит 3.200.000 💰.`);
			user.balance -= 3200000;
			car[message.user].carid = 9;
			car[message.user].carname = name;
			car[message.user].price = 3200000;
			return message.send(`🚘 » Вы купили ${name} за 3.200.000 💰`);
		}
		if (text == 10) {
			let name = `Porsche Cayenne`
			if (user.balance < 5700000) return message.send(`🚘 » ${name} стоит 5.700.000 💰.`);
			user.balance -= 5700000;
			car[message.user].carid = 10;
			car[message.user].carname = name;
			car[message.user].price = 5700000;
			return message.send(`🚘 » Вы купили ${name} за 5.700.000 💰`);
		}
		if (text == 11) {
			let name = `Toyota Camry`
			if (user.balance < 7800000) return message.send(`🚘 » ${name} стоит 7.800.000 💰.`);
			user.balance -= 7800000;
			car[message.user].carid = 11;
			car[message.user].carname = name;
			car[message.user].price = 7800000;
			return message.send(`🚘 » Вы купили ${name} за 7.800.000 💰`);
		}
		if (text == 12) {
			let name = `Mercedes-Benz G`
			if (user.balance < 12300000) return message.send(`🚘 » ${name} стоит 12.300.000 💰.`);
			user.balance -= 12300000;
			car[message.user].carid = 12;
			car[message.user].carname = name;
			car[message.user].price = 12300000;
			return message.send(`🚘 » Вы купили ${name} за 12.300.000 💰`);
		}
		if (text == 13) {
			let name = `Lamborghini Veneno`
			if (user.balance < 20000000) return message.send(`🚘 » ${name} стоит 20.000.000 💰.`);
			user.balance -= 20000000;
			car[message.user].carid = 13;
			car[message.user].carname = name;
			car[message.user].price = 20000000;
			return message.send(`🚘 » Вы купили ${name} за 20.000.000 💰`);
		}
		if (text == 14) {
			let name = `Tesla Roadster`
			if (user.balance < 27000000) return message.send(`🚘 » ${name} стоит 27.000.000 💰.`);
			user.balance -= 27000000;
			car[message.user].carid = 14;
			car[message.user].carname = name;
			car[message.user].price = 27000000;
			return message.send(`🚘 » Вы купили ${name} за 27.000.000 💰`);
		}
		if (text == 15) {
			let name = `Thrust SSC`
			if (user.balance < 48000000) return message.send(`🚘 » ${name} стоит 48.000.000 💰.`);
			user.balance -= 48000000;
			car[message.user].carid = 15;
			car[message.user].carname = name;
			car[message.user].price = 48000000;
			return message.send(`🚘 » Вы купили ${name} за 48.000.000 💰`);
		}
		if (text == 16) {
			let name = `Mazda CX-5`
			if (user.balance < 120000000) return message.send(`🚘 » ${name} стоит 120.000.000 💰.`);
			user.balance -= 120000000;
			car[message.user].carid = 16;
			car[message.user].carname = name;
			car[message.user].price = 120000000;
			return message.send(`🚘 » Вы купили ${name} за 120.000.000 💰`);
		}
		if (text == 17) {
			let name = `DeLorean DMC-12`
			if (user.balance < 210000000) return message.send(`🚘 » ${name} стоит 210.000.000 💰.`);
			user.balance -= 210000000;
			car[message.user].carid = 17;
			car[message.user].carname = name;
			car[message.user].price = 210000000;
			return message.send(`🚘 » Вы купили ${name} за 210.000.000💰`);
		}
		if (text == 18) {
			let name = `DeLorean DMC-12`
			if (user.balance < 376000000) return message.send(`🚘 » ${name} стоит 376.000.000💰.`);
			user.balance -= 376000000;
			car[message.user].carid = 18;
			car[message.user].carname = name;
			car[message.user].price = 376000000;
			return message.send(`🚘 » Вы купили ${name} за 376.000.000💰`);
		}
		if (text == 19) {
			let name = `Koenigsegg Agera R`
			if (user.balance < 600500000) return message.send(`🚘 » ${name} стоит 600.500.000💰.`);
			user.balance -= 600500000;
			car[message.user].carid = 19;
			car[message.user].carname = name;
			car[message.user].price = 600500000;
			return message.send(`🚘 » Вы купили ${name} за 600.500.000💰`);
		}
		if (text == 20) {
			let name = `Bugatti Chiron`
			if (user.balance < 980000000) return message.send(`🚘 » ${name} стоит 980.000.000💰.`);
			user.balance -= 980000000;
			car[message.user].carid = 20;
			car[message.user].carname = name;
			car[message.user].price = 980000000;
			return message.send(`🚘 » Вы купили ${name} за 980.000.000💰`);
		}
	});
	////////////////////////////////////////
	cmd.on(/^(?:владельцы)$/i, 'владельцы', 0, message => {
		bot.botflood += 1;
		let text = '';
		text += '🔥 Владельцы бизнесов 🔥\n'
		for (let id in biz) {
			if (biz[id].id > 0) {
				text += `👨‍💼️ » @id${id}(${acc.users[id].prefix})  » ${biz[id].name}\n`
			}
		}
		return message.send(text);
	});


	cmd.on(/^(?:закреп)/i, 'все', 2, message => {
 
vk.api.call('messages.pin', {peer_id: message.peer, message_id: message.id});
});


	cmd.on(/^(?:бизинфо)$/i, 'бизнесы', 0, message => {
				return message.send(`
        📖 »  Доступные команды: 
        📓 »  Бизменю - информация о бизнесе. 

        💸 »  Раздать <сумма> - раздать деньги рабочим.
        🤵 »  Бизнес нанять ID - нанять работника.
        🤵 »  Уволить ID - уволить работника.
        🤵 »  Рабочие - список работников.
        🤵 »  1 работник дает +50.000 💰 . 

        💰 »  Прибыль можно собирать каждые 2 часа
        💰 »  'Снять'  команда для снятия прибыли. 

        💸 »  Бизнес снять [кол-во] - счет бизнеса. 
        💡 »  Для продажи: "бизнес продать [ID] [Цена]". 
        💸 »  Покупка: "бизнес купить ID".
 
        `); 
	});
	//////////////////////////////////////// SYSTEM БИЗОВ
	cmd.on(/^(?:бизнесы)$/i, 'бизнесы', 0, message => {
		bot.botflood += 1;
		let one = 15 - biz.one;
		let two = 13 - biz.two;
		let three = 12 - biz.three;
		let four = 10 - biz.four;
		let five = 8 - biz.five;
		let six = 6 - biz.six;
		let seven = 4 - biz.seven;
		let eight = 1 - biz.eight;
		return message.send(`
        Список доступных бизнесов: 
        ➕ 1&#8419;. Телега с хот-догами - 10.000.000 💰 
        ➕ 2&#8419;. Ларёк с шаурмой - 50.000.000 💰 
        ➕ 3&#8419;. Закусочная - 100.000.000 💰 
        ➕ 4&#8419;. Ферма - 500 💎  
        ➕ 5&#8419;. Молокозавод - 1.000 💎  
        ➕ 6&#8419;. Ресторан - 1.500 💎 
        ➕ 7&#8419;. Нефтевышка - 3.000 💎 
        ➕ 8&#8419;. [В]Контакте - 10.000 💎  


        🔥 Количество свободных бизнесов 🔥
        1&#8419;Телега с хот-догами:&#4448;${one} 
        2&#8419;Ларёк с шаурмой: &#4448;&#4448;${two}
        3&#8419;Закусочная:&#4448;&#4448;&#4448;&#4448;&#4448;${three} 
        4&#8419;Ферма:&#4448; &#4448;&#4448;&#4448;&#4448;&#4448;&#4448;${four}
        5&#8419;Молокозавод:&#4448;&#4448;&#4448;&#4448; ${five}
        6&#8419;Ресторан:&#4448;&#4448;&#4448;&#4448;&#4448;&#4448; ${six}
        7&#8419;Нефтевышка:&#4448;&#4448;&#4448;  &#4448;    ${seven}
        8&#8419;[В]Контакте:&#4448;&#4448;&#4448;&#4448; &#4448;${eight} 

        📓 » Бизинфо - информация о бизнесах и их команды!
 
        `); 
	})
 	cmd.on(/^раздать\s?([^\s	].*)?/i, "раздать", 0, (message, args) => {
		bot.botflood += 1;
 		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if(!message.args[1]) return message.send(`💀 » Введите сумму для раздачи работникам вашего бизнеса.`);
		let amount = parserInt(message.args[1]); 
		let id = acc.users[message.user].clanid;   
		if (biz[message.user].id == false) return message.send(`⚠ »  Раздавать деньги может только владелец бизнеса!`)
		if(amount > biz[message.user].balance) return message.send(`💀 » На счету бизнеса нет столько 💰`);
		biz[message.user].balance -= amount;
		let sum = Math.round(amount / biz[message.user].people);
		for(ids in biz[message.user].users){
			acc.users[ids].balance += sum;
		}
		return message.send(`💀 » Каждый участник бизнеса получил по ${sum} 💰 `);
	});
 	cmd.on(/^(?:рабочие)$/i, 'рабочие', 0, message => {
		bot.botflood += 1;
		text = `👻 » Рабочие вашего бизнеса: \n`;
		for(id in biz[message.user].users){
			text += `👻 » ID: ${id} |  @id${id}(${acc.users[id].prefix})\n`;
		}
		text += `\n👉 » Для увольнения рабочего: Уволить ID`;
		return message.send(text);
	});
 	cmd.on(/^(?:уволить)\s?([0-9]+)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`💡 » Укажите ID человек, кого хотите уволить.`);
		let user = acc.users[message.user];
		let id = message.args[1];
		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if (biz[message.user].id == false) return message.send(`⚠ »  Увольнять может только владелец бизнеса!`)
		if (!biz[message.user].users[id]) return message.send(`⚠ » Этот человек не был нанят.`);
		if (acc.users[id].job != false){
			acc.users[id].jobname = false;
			acc.users[id].job = false;
			delete biz[message.user].users[id];
			return message.send(`📋 » Вы успешно уволили человека.`);
		}	
	});

	cmd.on(/^(?:бизнес купить)\s?([0-9]+)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`💡 » Укажите ID бизнеса который хотите купить.\n📊 » Команда: бизнесы`);
		let user = acc.users[message.user];
		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if (biz[message.user].id != false) return message.send(`💡 » У вас уже куплен бизнес. Команды: бизменю`);
		let text = Number(message.args[1]);
		if (text == 1) {
			if (biz.one >= 15) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.balance < 10000000) return message.send(`💸 » У вас нет столько 💰.`);
			user.balance -= 10000000;
			biz.one += 1;
			biz.number += 1;
			biz[message.user].id = 1;
			biz[message.user].name = "Телега с хот-догами";
			biz[message.user].price = 10000000;
			return message.send(`💸 » Вы купили бизнес 'Телега с хот-догами'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (10 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 2) {
			if (biz.two >= 13) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.balance < 50000000) return message.send(`💸 » У вас нет столько 💰.`);
			user.balance -= 50000000;
			biz.two += 1;
			biz.number += 1;
			biz[message.user].id = 2;
			biz[message.user].name = "Ларёк с шаурмой";
			biz[message.user].price = 50000000;
			return message.send(`💸 » Вы купили бизнес 'Ларёк с шаурмой'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (10 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 3) {
			if (biz.three >= 12) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.balance < 100000000) return message.send(`💸 » Этот бизнес стоит 100.000.000 💰.`);
			user.balance -= 100000000;
			biz.three += 1;
			biz.number += 1;
			biz[message.user].id = 3;
			biz[message.user].name = "Закусочная";
			biz[message.user].price = 100000000;
			return message.send(`💸 » Вы купили бизнес 'Закусочная'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (10 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 4) {
			if (biz.four >= 10) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.donate < 500) return message.send(`💸 » Этот бизнес стоит 500 💎.`);
			user.donate -= 500;
			biz.four += 1;
			biz.number += 1;
			biz[message.user].id = 4;
			biz[message.user].name = "Ферма";
			biz[message.user].price = 500;
			return message.send(`💸 » Вы купили бизнес 'Ферма'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (20 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 5) {
			if (biz.five >= 8) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.donate < 1000) return message.send(`💸 » Этот бизнес стоит 1.000 💎.`);
			user.donate -= 1000;
			biz.five += 1;
			biz.number += 1;
			biz[message.user].id = 5;
			biz[message.user].name = "Молокозавод";
			biz[message.user].price = 1000;
			return message.send(`💸 » Вы купили бизнес 'Телега с хот-догами'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (30 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 6) {
			if (biz.six >= 6) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.donate < 1500) return message.send(`💸 » Этот бизнес стоит 1.500 💎.`);
			user.donate -= 1500;
			biz.six += 1;
			biz.number += 1;
			biz[message.user].id = 6;
			biz[message.user].name = "Ресторан";
			biz[message.user].price = 1500;
			return message.send(`💸 » Вы купили бизнес 'Телега с хот-догами'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (40 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 7) {
			if (biz.seven >= 4) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.donate < 3000) return message.send(`💸 » Этот бизнес стоит 3.000 💎.`);
			user.donate -= 3000;
			biz.seven += 1;
			biz.number += 1;
			biz[message.user].id = 7;
			biz[message.user].name = "Нефтевышка";
			biz[message.user].price = 3000;
			return message.send(`💸 » Вы купили бизнес 'Нефтевышка'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID (50 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
		if (text == 8) {
			if (biz.eight >= 1) return message.send(`💡 » Данный тип бизнеса - распродан.`);
			if (user.donate < 10000) return message.send(`💸 » Этот бизнес стоит 10.000 💎.`);
			user.donate -= 10000;
			biz.eight += 1;
			biz.number += 1;
			biz[message.user].id = 8;
			biz[message.user].name = "[В]Контакте";
			biz[message.user].price = 10000;
			return message.send(`💸 » Вы купили бизнес '[В]Контакте'\n💡 » Для работы бизнеса - наймите рабочих.\n📊 » Бизнес нанять ID  (1000 max)\n 🤵 » 1 работник дает +50.000 💰\n💰 »  Прибыль приходит каждые 6 часов.`);
		}
	});
	cmd.on(/^(?:бизнес нанять)\s?([0-9]+)?$/i, 'бизнес нанять', 0, message => {
		bot.botflood += 1;
		let id = message.args[1];
		if(!message.args[1]) return message.send(`🤵 » Укажите ID человека, кого хотите нанять.`);
		if (!biz[message.user]) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (!job[id]) {
			job[id] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if(job[id].id != false) return message.send(`🤵 » Данный человек где-то работает.`);
		if (biz[message.user].id <= 3) {
			if (biz[message.user].people >= 10) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if (biz[message.user].id == 4) {
			if (biz[message.user].people >= 20) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if (biz[message.user].id == 5) {
			if (biz[message.user].people >= 30) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if (biz[message.user].id == 6) {
			if (biz[message.user].people >= 40) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if (biz[message.user].id == 7) {
			if (biz[message.user].people >= 50) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if (biz[message.user].id == 8) {
			if (biz[message.user].people >= 1000) {
				return message.send(`🤵 » Для данного типа бизнеса - вы наняли максимальное число работников.`);
			}
		}
		if(acc.users[id].job == true) return message.send(`🤵 » Данного рабочего уже наняли.`);
		if(!biz[message.user].users[id]){
			biz[message.user].users[id] = {
				id: false
			}
			acc.users[id].job = true;
			acc.users[id].jobname = `${biz[message.user].name}`;

		}else{
			return message.send(`🤵 » Вы уже наняли этого работника.`);
		}
		let user = acc.users[message.user]; 
		biz[message.user].people += 1;
		biz[message.user].dohod += 50000;
		return message.send(`💸 » Вы успешно наняли 1 работника.\n💸 Информация о бизнесе: бизменю`);
	})
	cmd.on(/^(?:бизменю)$/i, 'бизнес нанять', 0, message => {
		bot.botflood += 1;
		if (!biz[message.user]) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		return message.send(`
        ~Бизнес меню~
        🏣 Название: ${biz[message.user].name}
        💸 Доход: ${trueSpaces(biz[message.user].dohod)}💰 каждые 2 часа..
        🤵 Работников: ${biz[message.user].people}
        💰 Баланс бизнеса: ${trueSpaces(biz[message.user].balance)}💰

        💰 »  Прибыль можно собирать каждые 2 часа
        💰 »  'Снять'  команда для снятия прибыли. 
        `);
	});
	cmd.on(/^(?:бизнес снять)\s?([0-9]+)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if (!biz[message.user]) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if(!Number(message.args[1])) return message.send(`💸 » Сумма должна быть числом.`);
		let user = acc.users[message.user];
		if (!message.args[1]) return message.send(`💸 » Укажите сумму для снятия.`);
		if (message.args[1] > biz[message.user].balance) return message.send(`💸 » На балансе бизнеса нет такой суммы.`);
		let text = Number(message.args[1]);
		user.balance += text;
		biz[message.user].balance -= text;
		return message.send(`💸 » Вы успешно сняли ${spaces(message.args[1])} со счета бизнеса.`);
	});
	/////////////////////////////////////////////\
	cmd.on(/^(?:бизнес продать)/i, "кик", 0, (message, args) => {
		bot.botflood += 1;
		if (!biz[message.user]) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		let user = acc.users[message.user];
		if (biz[message.user].id == 1) {
			let summ = biz[message.user].price / 100 * 75;
			user.balance += summ;
			 
			biz.one -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`);
		}
		if (biz[message.user].id == 2) {
			let summ = biz[message.user].price / 100 * 75;
			user.balance += summ;
			 
			biz.two -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`);
		}
		if (biz[message.user].id == 3) {
			let summ = biz[message.user].price / 100 * 75;
			user.balance += summ;
			 
			biz.three -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`);
		}
		if (biz[message.user].id == 4) {
			let summ = biz[message.user].price / 100 * 75;
			user.donate += summ;
			 
			biz.four -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`);
		}
		if (biz[message.user].id == 5) {
			let summ = biz[message.user].price / 100 * 75;
			user.donate += summ;
		
			biz.five -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`);
		}
		if (biz[message.user].id == 6) {
			let summ = biz[message.user].price / 100 * 75;
			user.donate += summ;
			 
			biz.six -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`);
		}
		if (biz[message.user].id == 7) {
			let summ = biz[message.user].price / 100 * 75;
			user.donate += summ;
			 
			biz.seven -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`);
		}
		if (biz[message.user].id == 8) {
			let summ = biz[message.user].price / 100 * 75;
			user.donate += summ;
			 
			biz.eight -= 1;
			biz[message.user].people = 0;
			biz[message.user].id = false;
			biz[message.user].price = 0;
			biz[message.user].dohod = 0;
			biz[message.user].balance = 0;
			biz[message.user].name = "Отсутствует";
			for(id in biz[message.user].users){
				delete biz[message.user].users[id];
			}
			return message.send(`🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`);
		}
	});











	///////////////////////////// СИСТЕМА РАБОТ
	cmd.on(/^(?:устроиться)\s?([0-9]+)?$/i, 'устроится', 0, message => {
		bot.botflood += 1;
		if (!biz[message.user]) {
			biz[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0,
				people: 0,
				dohod: 0,
				balance: 0,
				users: {},
				people: 0
			}
		}
		if (!message.args[1]) return message.send(`💡 » Укажите ID работы куда хотите устроится.\n📊 » Команда: работы`);
		if (message.args[1] > 11) return message.send(`📍 » Вы указали неверный ID работы`);
		if (message.args[1] < 1) return message.send(`📍 » Вы указали неверный ID работы`);
		if (biz[message.user].id != false) return message.send(`💡 » Устроиться на работу можно, если у вас нет бизнеса.`);
		if(!acc.users[message.user].jobname == false) return message.send(`📍 » Вы уже работаете в бизнесе.\n📍 » Для увольнения пишите: 'Уволиться'`);
		let user = acc.users[message.user];
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if (job[message.user].id != false) return message.send(`💡 » Вы уже устроены на работу  » Команда: работа`);
		let text = Number(message.args[1]);
		if (text == 1) {
			if (user.exs < 100) return message.send(`💸 » Устроиться на работу можно при: 100+ опыта.`);
			job[message.user].id = 1;
			job[message.user].name = "Шахтер";
			job[message.user].dohod = 1000;
			return message.send(`💸 » Вы устроились на работу: 'Шахтер'\n📊 » Доход 1.000р в час.`);
		}
		if (text == 2) {
			if (user.exs < 300) return message.send(`💸 » Устроиться на работу можно при: 300+ опыта.`);
			job[message.user].id = 2;
			job[message.user].name = "Водитель автобуса ";
			job[message.user].dohod = 10000;
			return message.send(`💸 » Вы устроились на работу: 'Водитель автобуса'\n📊 » Доход 10.000р час.`);
		}
		if (text == 3) {
			if (user.exs < 600) return message.send(`💸 » Устроиться на работу можно при: 600+ опыта.`);
			job[message.user].id = 3;
			job[message.user].name = " Гос. работник";
			job[message.user].dohod = 65000;
			return message.send(`💸 » Вы устроились на работу: ' Гос. работник'\n📊 » Доход 65.000 в час.`);
		}
		if (text == 4) {
			if (user.exs < 1000) return message.send(`💸 » Устроиться на работу можно при: 1.000+ опыта.`);
			job[message.user].id = 4;
			job[message.user].name = "Директор банка";
			job[message.user].dohod = 100000;
			return message.send(`💸 » Вы устроились на работу: 'Директор банка'\n📊 » Доход 100.000 в час.`);
		}
		if (text == 5) {
			if (user.exs < 3000) return message.send(`💸 » Устроиться на работу можно при: 3.000+ опыта.`);
			user.balance -= 20000000;
			job[message.user].id = 5;
			job[message.user].name = "Системный Администратор";
			job[message.user].dohod = 200000;
			return message.send(`💸 » Вы устроились на работу: 'Системный Администратор'\n📊 » Доход 200.000 в час.`);
		}
		if (text == 6) {
			if (user.exs < 5000) return message.send(`💸 » Устроиться на работу можно при: 5.000+ опыта.`); 
			job[message.user].id = 6;
			job[message.user].name = "ИТ-менеджер";
			job[message.user].dohod = 300000;
			return message.send(`💸 » Вы устроились на работу: 'ИТ-менеджер'\n📊 » Доход 300.000 в час.`);
		}
		if (text == 7) {
			if (user.exs < 8000) return message.send(`💸 » Устроиться на работу можно при: 8.000+ опыта.`); 
			job[message.user].id = 7;
			job[message.user].name = "Юрист";
			job[message.user].dohod = 5000000;
			return message.send(`💸 » Вы устроились на работу: 'Юрист'\n📊 » Доход 500.000р в час.`);
		}
		if (text == 8) {
			if (user.exs < 10000) return message.send(`💸 » Устроиться на работу можно при: 10.000+ опыта.`); 
			job[message.user].id = 8;
			job[message.user].name = "Менеджер";
			job[message.user].dohod = 7500000;
			return message.send(`💸 » Вы устроились на работу: 'Менеджер'\n📊 » Доход 750.0000 в час.`);
		}
		if (text == 9) {
			if (user.exs < 30000) return message.send(`💸 » Устроиться на работу можно при: 30.000+ опыта.`); 
			job[message.user].id = 8;
			job[message.user].name = "Аналитик";
			job[message.user].dohod = 2000000;
			return message.send(`💸 » Вы устроились на работу: 'Аналитик'\n📊 » Доход 2.000.000 в час.`);
		}
		if (text == 10) {
			if (user.exs < 80000) return message.send(`💸 » Устроиться на работу можно при: 80.000+ опыта.`);
			job[message.user].id = 8;
			job[message.user].name = "Дизайнер ";
			job[message.user].dohod = 7500000;
			return message.send(`💸 » Вы устроились на работу: 'Дизайнер '\n📊 » Доход 5.000.000  в час.`);
		}
		if (text == 11) {
			if (user.exs < 1000000) return message.send(`💸 » Устроиться на работу можно при: 1.000.000+ опыта.`);
			job[message.user].id = 8;
			job[message.user].name = "Наркоторговец ";
			job[message.user].dohod = 100000000;
			return message.send(`💸 » Вы устроились на работу: 'Наркоторговец  '\n📊 » Доход 100.000.000  в час.`);
		}
	});
	cmd.on(/^(?:уволиться)$/i, 'уволиться', 0, message => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if(acc.users[message.user].job != false){
			acc.users[message.user].jobname = false;
			acc.users[message.user].job = false;
			return message.send(`📋 » Вы успешно уволились.`);
		}

		if (job[message.user].id == false) return message.send(`📋 » Увы, но вы нигде не работаете...`);
		job[message.user].id = false;
		job[message.user].name = 'Отсутствует';
		job[message.user].dohod = 0;
		return message.send(`💎 Вы уволились с работы.`);
	});
	cmd.on(/^(?:работы)$/i, 'работы', 0, message => {
		bot.botflood += 1;
		return message.send(`
Список доступных работ: 
➕ 1&#8419;. Шахтёр - 1.000 💰 / час - для устройства 100+ опыта!🔥
➕ 2&#8419;. Водитель автобуса - 10.000 💰 / час - для устройства 300+ опыта!🔥 
➕ 3&#8419;. Гос. работник - 65.000 💰 / час - для устройства 600+ опыта!🔥  
➕ 4&#8419;. Директор банка - 100.000 💰 / час - для устройства 1.000+ опыта!🔥 
➕ 5&#8419;. Системный администратор - 200.000 💰 / час - для устройства 3.000+ опыта!🔥 
➕ 6&#8419;. ИТ-менеджер - 300.000 💰 / час - для устройства 5.000+ опыта!🔥
➕ 7&#8419;. Юрист - 500.000 💰 / час - для устройства 8.000+ опыта!🔥 
➕ 8&#8419;. Менеджер - 750.000 💰 / час - для устройства 10.000+ опыта!🔥  
➕ 9&#8419;. Аналитик - 2.000.000 💰 / час - для устройства 30.000+ опыта!🔥 
➕ 1&#8419;0&#8419;. Дизайнер - 5.000.000 💰 / час - для устройства 80.000+ опыта!🔥
➕ 1&#8419;1&#8419;. Наркоторговец - 100.000.000 💰 / час - для устройства 1.000.000+ опыта!🔥
 
💡 » Для усройства на работу "устроиться [номер]".  
💡 » Для для того, чтобы уволиться "уволиться".

💰 » Зарплату можно получать ежечасно.
💰 » Командой: 'зарплата'.

        `);
	});
	cmd.on(/^(?:работа)$/i, 'работа', 0, message => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if (job[message.user].id == false) return message.send(`📋 Увы, но вы нигде не работаете...`);
		return message.send(`
📋 Информация о работе: 
➕ Вы: ${job[message.user].name}
➕ Доход в час: ${spaces(job[message.user].dohod)}💰

💰 » Зарплату можно получать ежечасно.
💰 » Командой: 'зарплата'.
 
        `);
	});
	cmd.on(/^сейф/i, "сейф", 0, (message, args) => {
		bot.botflood += 1;
		if (!safe[message.user]) {
			safe[message.user] = {
				game: false,
				kod: false
			}
		}
		if (safe[message.user].game == true) return message.send(`🗝 »  Вы уже начали взлом. Команда: "Взлом [код]"`);
		if (acc.users[message.user].safe == true) return;
		safe[message.user].game = true;
		safe[message.user].kod = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(`
  🏛 » Вы начали взлом сейфа 🏛
  🔑 » Ваша задача: подобрать код из 4 одинаковых цифр.
  🗝 » Начать взлом: "Взлом [код]"
  🌚 » Удачи!

  ⏩ » К прочтению:  'таймеры' 
  `);
	});
	cmd.on(/^(?:взлом)\s?([0-9]+)?$/i, 'взлом', 0, message => {
		bot.botflood += 1;
		if (!safe[message.user]) {
			safe[message.user] = {
				game: false,
				kod: false
			}
		}
		if (acc.users[message.user].safe == true) return message.send(`🔑 » Взломать сейф можно раз в 10 минут.`);
		if (safe[message.user].game == false) return;
		if (!message.args[1]) return message.send(`🗝 » Укажите код к сейфу.`);
		if (message.args[1] > 9999) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		if (message.args[1] < 0) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		let nu = safe[message.user].kod;
		let kod = Number(message.args[1]);
		if (kod == safe[message.user].kod) {
			acc.users[message.user].exs += 20;
			let summ = rand(90000,150000);
			acc.users[message.user].balance += summ;
			safe[message.user].game = false;
			safe[message.user].kod = false;
			acc.users[message.user].safe = true;
			setTimeout(() => {
				acc.users[message.user].safe = false;
			}, 600000);
			return message.send(`🤑 » Невероятно!\n🙊 » Вы смогли угадать код\n🏛 » Обыскивая сейф вы нашли:\n💴 » ${spaces(summ)} 💰 и 20 опыта.\n⏩ » К прочтению:  'таймеры' `);
		} else {
			acc.users[message.user].safe = true;
			setTimeout(() => {
				acc.users[message.user].safe = false;
			}, 600000);
			safe[message.user].game = false;
			safe[message.user].kod = false;
			if (acc.users[message.user].exs >= 0) {
				acc.users[message.user].exs -= 2;
			}
			return message.send(`🤠 » Вы не угадали код.\n🤠 » Вас задержали и оштрафовали.\n👤 » Вы потеряли 2 опыта.\n🔑 » Верный код был: ${nu}\n⏩ » К прочтению:  'таймеры' `);
		}
	});
	//////////////////////////////////////////////////////////////
	cmd.on(/^рестарт/i, "рестарт", 4, (message, args) => {
		if (acc.users[message.user].level != 4) return;
		let free = 0;
		let safe = 0;
		let msg = 0;
		let ban = 0;
		let giverub = 0;
		let banid = '';
		let pay = 0;
		for (let id in iban) {
			if (iban[id].vrem == true) {
				ban += 1;
				banid += `User: *id${id} | Time: ${iban[id].time} | Причина: ${iban[id].prich}\n`;
				delete iban[id];
			}
		}
		for (let id in limit) {
			if (limit[id].offchat == true) {
				limit[id].offchat = false;
				limit[id].msg = 0;
				msg += 1;
			}
		}
		for (let id in acc.users) {
			if (acc.users[id].free == false) {
				acc.users[id].free = true;
				free += 1;
			}
			if (acc.users[id].safe == true) {
				acc.users[id].safe = false;
				safe += 1;
			}
			if (acc.users[id].giverub == true) {
				acc.users[id].giverub = false;
				giverub += 1;
			}
			if (acc.users[id].pay == true) {
				acc.users[id].pay = false;
				pay += 1;
			}
		
			for(id in activ.message.users){
				delete activ.message.users[id];
			}
			for(id in activ.group.users){
				delete activ.group.users[id];
			}
			for(id in clans){
			   clans[id].war = false;
			}

			for(id in timers.job){
			   timers.job[id].timers = false;
			}
			for(id in timers.biz){
			   timers.biz[id].timers = false;
			}

			activ.message.people = 0;
			activ.group.people = 0;
			activ.group.time = `${logtime()} | ${logdata()} `;
			activ.message.time = `${logtime()} | ${logdata()} `;
			activ.message.msg = 0;
			activ.group.msg = 0;

		} 
		return message.send(`~ ~ Restart прошел успешно ~ ~\n Log:\nБонусов: ${free}\nСейфов: ${safe}\nЛимит: ${msg}\nВыдача валюты: ${giverub}\nЛимит передачи: ${pay}\nКланвар разрешен всем кланам.\n\nВайп для команды: 'activ'\nСчетчик аннулирован\nВыдача зарплаты/прибыли - доступна\n\n~~ BAN ~~\n Разбанено: ${ban}\n Users:\n${banid}`);
	});
	/////////////////////////////// 
	cmd.on(/^(?:activ)$/i, 'устроится', 4, message => {
		if(acc.users[message.user].level < 4) return;
		return message.send(`
			~Activ LIST~

			Актив группы:	
			Актив после: ${activ.group.time}
			Человек написало боту: ${activ.group.people}
			Сообщений принято: ${activ.group.msg}
			~~~~~~~~~~~~
			Актив сообщений: 
			Актив после: ${activ.message.time}
			Человек написало боту: ${activ.message.people}
			Сообщений принято: ${activ.message.msg}
			`);

	});
	/////////////////////////////// телефоны
	cmd.on(/^(?:телефоны)$/i, 'устроится', 0, message => {
		bot.botflood += 1;
		return message.send(`
📱 Телефоны: 
🔸 1&#8419;. Nokia 108 - 5.400 💰 
🔸 2&#8419;. Meizu M5 - 140.000 💰 
🔸 3&#8419;. Sony Xperia XA - 370.000 💰 
🔸 4&#8419;. iPhone SE - 780.000 💰
🔸 5&#8419;. Xiaomi Mi Mix - 1.005.000 💰 
🔸 6&#8419; Samsung Galaxy S9 - 2.400.000 💰 
🔸 7&#8419;. iPhone X - 3.000.000 💰 

🔸 Для покупки используйте: "телефон [номер]". 
🔸 Для продажи: "телефон продать".
    `);
	});
	cmd.on(/^(?:телефон продать)$/i, 'телефон продать', 0, message => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (!phone[message.user]) {
			phone[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0
			}
		}
		if (phone[message.user].id == false) return message.send(`📱 У вас нету телефона.`);
		user.balance += phone[message.user].price / 100 * 50;
		let price = phone[message.user].price / 100 * 50;
		phone[message.user].id = false;
		phone[message.user].name = "Отсутствует";
		phone[message.user].price = 0
		return message.send(`📱 Вы успешно продали телефон за ${price} 💰.`);
	});
	cmd.on(/^(?:телефон)\s?([0-9]+)?$/i, 'устроится', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`💡 » Укажите ID телефона который хотите купить.\n📊 » Команда: телефоны`);
		if (message.args[1] > 11) return message.send(`📍 Вы указали неверный ID телефона`);
		if (message.args[1] < 1) return message.send(`📍 Вы указали неверный ID телефона`);
		let user = acc.users[message.user];
		if (!phone[message.user]) {
			phone[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0
			}
		}
		if (phone[message.user].id != false) return message.send(`💡 » У вас уже куплен телефон  » Продать: "телефон продать"`);
		let text = Number(message.args[1]);
		if (text == 1) {
			if (user.balance < 5400) return message.send(`💸 » Этот телефон стоит 5.400р`);
			user.balance -= 5400;
			phone[message.user].id = 1;
			phone[message.user].name = "Nokia 108";
			phone[message.user].price = 5400;
			return message.send(`💸 » Вы купили телефон: "Nokia 108"`);
		}
		if (text == 2) {
			if (user.balance < 140000) return message.send(`💸 » Этот телефон стоит 140.000р`);
			user.balance -= 140000;
			phone[message.user].id = 2;
			phone[message.user].name = "Meizu M5";
			phone[message.user].price = 140000;
			return message.send(`💸 » Вы купили телефон: "Meizu M5" `);
		}
		if (text == 3) {
			if (user.balance < 370000) return message.send(`💸 » Этот телефон стоит 370.000р`);
			user.balance -= 370000;
			phone[message.user].id = 3;
			phone[message.user].name = "Sony Xperia XA";
			phone[message.user].price = 370000;
			return message.send(`💸 » Вы купили телефон: "Sony Xperia XA" `);
		}
		if (text == 4) {
			if (user.balance < 780000) return message.send(`💸 » Этот телефон стоит 780.000р`);
			user.balance -= 780000;
			phone[message.user].id = 4;
			phone[message.user].name = "iPhone SE";
			phone[message.user].price = 780000;
			return message.send(`💸 » Вы купили телефон: "iPhone SE" `);
		}
		if (text == 5) {
			if (user.balance < 1005000) return message.send(`💸 » Этот телефон стоит 1.005.000р`);
			user.balance -= 1005000;
			phone[message.user].id = 5;
			phone[message.user].name = "Xiaomi Mi Mix";
			phone[message.user].price = 1005000;
			return message.send(`💸 » Вы купили телефон: "Xiaomi Mi Mix" `);
		}
		if (text == 6) {
			if (user.balance < 2400000) return message.send(`💸 » Этот телефон стоит 2.400.000р`);
			user.balance -= 2400000;
			phone[message.user].id = 6;
			phone[message.user].name = "Samsung Galaxy S9";
			phone[message.user].price = 2400000;
			return message.send(`💸 » Вы купили телефон: "Samsung Galaxy S9" `);
		}
		if (text == 7) {
			if (user.balance < 3000000) return message.send(`💸 » Этот телефон стоит 3.000.000р`);
			user.balance -= 3000000;
			phone[message.user].id = 7;
			phone[message.user].name = "iPhone X";
			phone[message.user].price = 3000000;
			return message.send(`💸 » Вы купили телефон: "iPhone X" `);
		}
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	cmd.on(/^(?:зарплата)$/i, 'зарплата', 0, message => {

		if (job[message.user].id == false) return message.send(`📋 » Увы, но вы нигде не работаете...`);
		if(!timers.job[message.user]){
			timers.job[message.user] = {
				timers: false
			}
		} 
		if(timers.job[message.user].timers == true) return message.send(`💸 » Зарплату можно получать раз в час!`); 
		timers.job[message.user].timers = true;
			setTimeout(() => {
						timers.job[message.user].timers = false;
			}, 3600000)	

			if (job[message.user].id != false) {
				acc.users[message.user].bank += job[message.user].dohod;
			}

		return message.send(`💷 » Зарплата успешно переведена на карту.`);
	});

	cmd.on(/^(?:прибыль)$/i, 'прибыль', 0, message => {
		if (!biz[message.user]) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`💸 » У вас нет бизнеса. Купить: бизнес купить`); 
		if(!timers.biz[message.user]){
			timers.biz[message.user] = {
				timers: false
			}
		} 
		if(timers.biz[message.user].timers == true) return message.send(`💸 » Прибыль с бизнеса можно получать раз в 2 часа!`); 
		timers.biz[message.user].timers = true;
			setTimeout(() => {
						timers.biz[message.user].timers = false;
			}, 7200000)	

			biz[message.user].bank += biz[message.user].people * 50000;

		return message.send(`💷 » Прибыль с бизнеса успешна переведена на карту.`);
	});
 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////     ИГРЫ      ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:число)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором."); 
		if (!message.args[1]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  число <ставка> <число(от 1 до 6)>`);
		if (!message.args[2]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  число <ставка> <число(от 1 до 6)>`);
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`); 
  		if(amount > 10000){
  			let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		let chis = message.args[2];
		if(chis > 6 || chis < 0) return message.send(`📌 » Число должно быть от 1 до 6.`);
		let a = rand(1, 6);
		if(chis == a){
			user.balance += amount * 3;
			user.exs += 2;
			return message.send(`⭐ » Поздравляю! \n🥇 » Вы смогли угадать число!\n🎁 » Получайте скорее вознаграждение!\n🎁 » Утроенная ставка и 2 опыта.`);
		}else{
			user.balance -= amount;
			if (acc.users[message.user].exs >= 1) {
				acc.users[message.user].exs -= 1;
			}
			return message.send(`😔 » Эх...неудача... \n🔎 » Угадать число не так-то просто!\n🎲 » Попробуйте еще разок!\n😢 » Вы потеряли ставку и 1 опыт.`);
		}
  		}else{
  			let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		let chis = message.args[2];
		if(chis > 6 || chis < 0) return message.send(`📌 » Число должно быть от 1 до 6.`);
		let a = rand(1, 6);
		if(chis == a){
			user.balance += amount * 3; 
			return message.send(`⭐ » Поздравляю! \n🥇 » Вы смогли угадать число!\n🎁 » Получайте скорее вознаграждение!\n🎁 » Утроенная ставка.`);
		}else{
			user.balance -= amount; 
			return message.send(`😔 » Эх...неудача... \n🔎 » Угадать число не так-то просто!\n🎲 » Попробуйте еще разок!\n😢 » Вы потеряли ставку.`);
		}
  		}
		l 
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cmd.on(/^(?:кубик)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором."); 
		if (!message.args[1]) return message.reply(`🎲 » Проверьте вводимые данные:\n🎲 »  кубик <ставка> чет/нечет`);
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);    
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		let a = rand(1, 100);
		if(amount > 10000){
			if (a > 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.reply(`🎲 »  Вам выпало 'число ${[`2`,`4`,`6`].random()}'  \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы выиграли: +${spaces(amount)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`🎲 » Вам выпало 'число ${[`2`,`4`,`6`].random()}'\n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы проиграли: ${spaces(amount)}💰\n🌚 » Вы проиграли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`🎲 » Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы проиграли: ${spaces(amount)}💰\n🌚 » Вы проиграли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.reply(`🎲 » Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы выиграли: ${spaces(amount)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
		}
		}else{
			if (a > 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				user.balance += Math.floor(amount);
				return message.reply(`🎲 »  Вам выпало 'число ${[`2`,`4`,`6`].random()}'  \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы выиграли: +${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`🎲 » Вам выпало 'число ${[`2`,`4`,`6`].random()}'\n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы проиграли: ${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`🎲 » Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы проиграли: ${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				user.balance += Math.floor(amount);
				return message.reply(`🎲 » Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 » Вы ставили на [ ${message.args[2]} ]\n💵 » Вы выиграли: ${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`
				);
			}
		}
		}
		 

		return message.reply(`🎲 » кубик ставка чет/нечет`);
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////--- монетка -----------
	cmd.on(/^(?:монетка)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		orel = 'photo423839069_456239719'; // DA
		reshka = 'photo423839069_456239720'; // NET
		if (!message.args[1]) return message.reply(`Ⓜ » Проверьте вводимые данные:\nⓂ »  монетка ставка орел/решка`);
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);  
		if(amount > 10000){
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		let a = rand(1, 100);
		if (a > 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.reply(`&#9410; »  Вам выпала 'Решка' \n&#9989; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы выиграли: +${spaces(amount)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: orel
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`&#9410; » Вам выпала 'Решка' \n&#10062; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы проиграли: ${spaces(amount)}💰\n🌚 » Вы проиграли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: reshka
				});
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`&#9410; » Вам выпал 'Орел' \n&#10062; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы проиграли: ${spaces(amount)}💰\n🌚 » Вы проиграли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: reshka
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.reply(`&#9410; » Вам выпал 'Орел' \n&#9989; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы выиграли: ${spaces(amount)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: orel
				});
			}
		}
	}else{
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		let a = rand(1, 100);
		if (a > 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				user.balance += Math.floor(amount);
				return message.reply(`&#9410; »  Вам выпала 'Решка' \n&#9989; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы выиграли: +${spaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: orel
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`&#9410; » Вам выпала 'Решка' \n&#10062; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы проиграли: ${spaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: reshka
				});
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.reply(`&#9410; » Вам выпал 'Орел' \n&#10062; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы проиграли: ${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: reshka
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				user.balance += Math.floor(amount);
				return message.reply(`&#9410; » Вам выпал 'Орел' \n&#9989; » Вы поставили [ ${message.args[2]} ]\n&#128179; » Вы выиграли: ${spaces(amount)}💰\n💰 » Баланс: ${spaces(user.balance)}`, {
					attachment: orel
				});
			}
		}
	}
		return message.reply(`[Подсказка] » монетка ставка орел/решка`);

	});
	//////////////////////////////////////
	// ---------- Рулетка Руссская ---------
	cmd.on(/^(?:рр)/i, 'ан', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		if (acc.users[message.user].balance == 0) return message.reply("🔔 » Играть в игры можно с балансом выше 0! 🔔");
		message.reply(`&#128303; »  Вы начали игру &#128128;"Русская Рулетка"&#128128; \n&#128303; » Задача: Нажать на курок. Вам дано 3 выстрела.\n&#128303; » Если выиграете - баланс удвоится.\n&#128303; » Проиграете - потеряете все.\n&#9888; » Чтобы сделать выстрел отправьте &#128299;`);
		return acc.users[message.user].pp = 1;
	});
	// ----------------------------------------
	cmd.on(/^(?:🔫)/i, 'ан', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		let balance = acc.users[message.user].balance;
		let pp = acc.users[message.user].pp;
		let p = 3 - pp;
		let ran = ["успешно", "неуcпешно"];
		let rand = ran.random();
		if (acc.users[message.user].pp == 0) return;
		if (acc.users[message.user].pp > 0) {
			if (rand != "успешно") {
				acc.users[message.user].pp += 1;
				if (acc.users[message.user].pp == 4) {
					acc.users[message.user].pp = 0;
					acc.users[message.user].balance += balance * 2;
					return message.reply("&#128520; » Поздравляю! Вы выжили!\n&#128176; » Ваш баланс утроился!");
				}
				return message.reply(`&#128299; »  Вы нажали на курок... \n&#128299; » *пуля выстрелила в голову* | ` + rand + `\n&#128293; » Вам повезло. Стреляйте дальше!\n&#128128; » Осталось выстрелов: ` + p);
			}
			if (rand != "неуcпешно") {
				message.reply(`&#128299; » Вы нажали на курок... \n&#128299;  » *пуля выстрелила в голову* | ` + rand + `\n&#128128; » Удача повернулась к вам спиной.\n&#128128; » Вы проиграли. Баланс анулирован. `);
				acc.users[message.user].balance -= balance;
				return acc.users[message.user].pp = 0;
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:бин)\s([^\s].*)\s(.*)/i, 'casino', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		if (!message.args[2]) return message.reply(`🔥 » Вы не указали ставку\n [Подсказка] » бин вверх/вниз ставка`);
		if (!message.args[1]) return message.reply(`🔥 » Вы не указали вверх/вниз\n [Подсказка] » бин вверх/вниз ставка`);
		let amount = parserInt(message.args[2]);  
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);     
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🔥 » Ставка не может быть меньше 0 или равна 0 💰` : `🔥 » Ставка не может превышать баланс`);
		if(amount > 10000){
		let a = rand(1, 2);
		if (a == 1) {
			if (message.args[1].toLowerCase() == 'вверх') {
				let bin = rand(10, 100);
				acc.users[message.user].exs += 2;
				user.balance += Math.round(amount);
				return message.reply(`
        	📊 » Binary Option 
			📈 » Курс акции вырос на — ${bin} %
			💳 » Вы выиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
      		🔥 » Вы получили +2 опыта.`);
			}
			if (message.args[1].toLowerCase() == 'вниз') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Number(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
			    if(acc.users[message.user].exs <= 0){
			    	acc.users[message.user].exs = 0;
			    }
				let bin = rand(10, 100);
				return message.reply(`
        	📊 » Binary Option 
			📈 » Курс акции вырос на — ${bin} %
			💳 » Вы проиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
      🌚 » Вы потеряли 1 опыт.`);
			}
		}
		if (a == 2) {
			if (message.args[1].toLowerCase() == 'вверх') {
				user.balance -= Math.round(amount);
				let bin = rand(10, 100);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
			    if(acc.users[message.user].exs <= 0){
			    	acc.users[message.user].exs = 0;
			    }
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}

				return message.reply(`
        	📊 » Binary Option 
			📉 » Курс акции упал на — ${bin} %
			💳 » Вы проиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
      🌚 » Вы потеряли 1 опыт.`);
			}
		}
		if (message.args[1].toLowerCase() == 'вниз') {
			acc.users[message.user].exs += 2;
			let bin = rand(10, 100);
			user.balance += Math.round(amount);
			return message.reply(`
      		📊 » Binary Option 
			📉 » Курс акции упал на — ${bin} %
			💳 » Вы выиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
      🔥 » Вы получили +2 опыта.`);
		}
	}else{
		let a = rand(1, 2);
		if (a == 1) {
			if (message.args[1].toLowerCase() == 'вверх') {
				let bin = rand(10, 100);
				user.balance += Math.round(amount);
				return message.reply(`
        	📊 » Binary Option 
			📈 » Курс акции вырос на — ${bin} %
			💳 » Вы выиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
			🌚 » Опыт дается при ставке > 10.000💰`);
			}
			if (message.args[1].toLowerCase() == 'вниз') {
				user.balance -= Number(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				let bin = rand(10, 100);
				return message.reply(`
        	📊 » Binary Option 
			📈 » Курс акции вырос на — ${bin} %
			💳 » Вы проиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
			🌚 » Опыт дается при ставке > 10.000💰`);
			}
		}
		if (a == 2) {
			if (message.args[1].toLowerCase() == 'вверх') {
				user.balance -= Math.round(amount);
				let bin = rand(10, 100);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }

				return message.reply(`
        	📊 » Binary Option 
			📉 » Курс акции упал на — ${bin} %
			💳 » Вы проиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
			🌚 » Опыт дается при ставке > 10.000💰`);
			}
		}
		if (message.args[1].toLowerCase() == 'вниз') {
			let bin = rand(10, 100);
			user.balance += Math.round(amount);
			return message.reply(`
      		📊 » Binary Option 
			📉 » Курс акции упал на — ${bin} %
			💳 » Вы выиграли: ${spaces(amount)}💰.
			💰 » Ваш баланс: ${spaces(user.balance)}💰
			🌚 » Опыт дается при ставке > 10.000💰`);
		}
	}
		return message.reply(`[Подсказка] /бин вверх/вниз ставка`);
	});
	// -------------------------ставить код выше--------------------------------------------
	cmd.on(/^(?:free|бонус)/i, 'фри', 0, message => {
		bot.botflood += 1;
	if(acc.users[message.user].level < 1){
		if(acc.users[message.user].balance >= 1) return message.send(`🔥 » Брать бонус можно при нулевом балансе.`);

			if (acc.users[message.user].bank > 0) return message.send(`🔥 » Брать бонус можно при нулевом балансе тогда, когда у вас на карте нет денег.`);
			acc.users[message.user].balance += 10000;
			return message.reply(`Бонус в виде 10.000💰 начислен!`);

	}else{

			if(acc.users[message.user].balance >= 1) return message.send(`🔥 » Брать бонус можно при нулевом балансе.`);
			if (acc.users[message.user].bank > 0) return message.send(`🔥 » Брать бонус можно при нулевом балансе тогда, когда у вас на карте нет денег.`);
			acc.users[message.user].balance += 20000;
			return message.reply(`Бонус в виде 20.000💰 начислен!`);

	}
	})

cmd.on(/^(?:roll|рулетка|казино|ставка)\s?([^\s	].*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (chats[message.chat].game === 1) return message.send("Игры отключены Администратором.");
		if(!message.args[1]) return message.reply(`Вы не указали ставку`);
		let amount = parserInt(message.args[1]);   
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);  
		if(isNaN(amount)) return message.reply(`Вы не указали ставку`);
		 	if(amount > 10000){
			if (rand(1, 100) > 75) {	
			acc.users[message.user].exs += 2;
			user.balance += Math.floor(amount);
			return message.reply(`Вам выпала комбинация [${['🍓🍓🍓','🍒🍒🍒', '🍊🍊🍊', '🍋🍋🍋', '💰💰💰'].random()}] - Джекпот!\n » Вы выиграли: +${trueSpaces(amount)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${trueSpaces(user.balance)}`);
			}else{
					if(acc.users[message.user].exs > 1){
						acc.users[message.user].exs -= 1;
					}
					user.balance -= Math.floor(amount);
					return message.reply(`Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}] \n » Вы проиграли: 1 опыт и ${trueSpaces(amount)}💰\n💰 » Баланс: ${trueSpaces(user.balance)}`);
			}
		 	} else {
		 	if (rand(1, 100) > 75) {		 
			user.balance += Math.floor(amount);
			return message.reply(`Вам выпала комбинация [${['🍓🍓🍓','🍒🍒🍒', '🍊🍊🍊', '🍋🍋🍋', '💰💰💰'].random()}] - Джекпот!\n » Вы выиграли: +${trueSpaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${trueSpaces(user.balance)}`);
			}else{
				user.balance -= Math.floor(amount);
			    return message.reply(`Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}] \n » Вы проиграли:  ${trueSpaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${trueSpaces(user.balance)}`);
			}
		}
	})

	cmd.on(/^(?:азино)\s?([^\s	].*)?/i, 'casino', 0, message => {
			bot.botflood += 1;
			let user = acc.users[message.user];
			if (chats[message.chat].game === 1) return message.send("😈 » Игры отключены Администратором.");
			if(!message.args[1]) return message.reply(`😈 » Вы не указали ставку`);
			let amount = parserInt(message.args[1]); 
	  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);  
			if(isNaN(amount)) return message.reply(`😈 » Вы не указали ставку`);
			if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
				if(amount > 10000){
				if (rand(1, 100) > 75) {	
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.reply(`-- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;1&#8419;1&#8419;','7&#8419;7&#8419;7&#8419;', '3&#8419;3&#8419;3&#8419;', '0&#8419;0&#8419;0&#8419;', '7&#8419;7&#8419;7&#8419;'].random()}]  \nВы выиграли: +${spaces(amount)}💰\n🔥 » Вы получили 2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`);
				}else{
						if(acc.users[message.user].exs > 1){
							acc.users[message.user].exs -= 1;
						}
						user.balance -= Math.floor(amount);
						return message.reply(`-- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;2&#8419;3&#8419;','7&#8419;7&#8419;1&#8419;', '7&#8419;3&#8419;6&#8419;', '2&#8419;2&#8419;7&#8419;', '6&#8419;6&#8419;9&#8419;    '].random()}]   \nВы проиграли: ${spaces(amount)}💰\n🌚 » Вы потеряли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`);
				}
			 	} else {
			 	if (rand(1, 100) > 75) {		 
				user.balance += Math.floor(amount);
				return message.reply(`-- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;1&#8419;1&#8419;','7&#8419;7&#8419;7&#8419;', '3&#8419;3&#8419;3&#8419;', '0&#8419;0&#8419;0&#8419;', '7&#8419;7&#8419;7&#8419;'].random()}]  \nВы выиграли: +${spaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`);
				}else{
					user.balance -= Math.floor(amount);
				    return message.reply(`-- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;2&#8419;3&#8419;','7&#8419;7&#8419;1&#8419;', '7&#8419;3&#8419;6&#8419;', '2&#8419;2&#8419;7&#8419;', '6&#8419;6&#8419;9&#8419;    '].random()}]   \nВы проиграли: ${spaces(amount)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`);
				}
				}
});
 
cmd.on(/^(?:лотерея)\s?([0-9]+)?\s?([^\s	].*)?$/i, 'лотерея', 0, message => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`👒 » Укажите клетку с числом (от 1 до 3)\n🆔 1 » 🎫\n🆔 2 » 🎫\n🆔 3 » 🎫\n\n👒 » Пример: 'лотерея ID(билета) <ставка>'`)
		if(!message.args[2]) return message.send(`👒 » Укажите ставку.`)
		let stavka = parserInt(message.args[2]); 
  		if(!Number(stavka)) return message.send(`😈 » Ставка должна быть целым числом.`);  
		let text = message.args[1];
		if(stavka > acc.users[message.user].balance) return message.send(`💰 »  У вас нет столько 💰`);
		let user = acc.users[message.user];
		if(message.args[1] > 3) return message.send(`👒 » Укажите клетку с числом (от 1 до 3)\n🆔 1 » 🎫\n🆔 2 » 🎫\n🆔 3 » 🎫\n\n👒 » Пример: 'лотерея ID(билета) <ставка>'`)
		if(message.args[1] < 1) return message.send(`👒 » Укажите клетку с числом (от 1 до 3)\n🆔 1 » 🎫\n🆔 2 » 🎫\n🆔 3 » 🎫\n\n👒 » Пример: 'лотерея ID(билета) <ставка>'`)
 		if(stavka > user.balance || stavka <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
   		if(stavka > 10000){
		  if(rand(1,100) > 80){
		    user.balance += stavka * 2;
		    user.exs += 2;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎫 » Поздравляю! Вы угадали!\n🎫 » Вы получаете 2 опыта и удвоенную ставку.`);
		  }else{
		    user.balance -= stavka;
		    user.exs -= 1;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
			if(acc.users[message.user].exs <= 0){
			    	acc.users[message.user].exs = 0;
			}
		    return message.send(`👒 » Увы... Вы не угадали...\n👒 » В следующий раз повезет.\n👒 » Вы проиграли 1 опыт и свою ставку.`);
		  }
		}else{
			if(rand(1,100) > 80){
		    user.balance += stavka * 2;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎫 » Поздравляю! Вы угадали!\n🎫 » Вы получаете удвоенную ставку.`);
		  }else{
		    user.balance -= stavka;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`👒 » Увы... Вы не угадали...\n👒 » В следующий раз повезет.\n👒 » Вы проиграли  свою ставку.`);
		  }
		}
});


cmd.on(/^(?:ловушка)\s?([^\s	].*)?/i, 'ловушка', 0, message => {
  bot.botflood += 1;
  if(!message.args[1]) return message.send(`😈 » Укажите ставку`);	
  let user = acc.users[message.user];
  if(chats[message.chat].game == 1) return message.send("😈 » Игры отключены Администратором.");
  let text = parserInt(message.args[1]);  
  if(!text) return message.send("😈 » Укажите ставку!");
  if(!message.args[1]) return message.reply(`😈 » Вы не указали ставку`);
  if(text > user.balance || text <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
  if(text > 10000){
    if(rand(1,100) > 80) {
        let win = text * 2;
        acc.users[message.user].balance += Math.round(win);   
        user.exs += 1;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
        return message.reply(`😈 » Вы засунули руку в коробку...\n▪ » Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 » Вы выиграли:  ${spaces(win)}💰\n🔥 » Вы получили +2 опыта.\n💰 » Баланс: ${spaces(user.balance)}`);
    }else{
        let win = text;
        user.exs -= 1;
        acc.users[message.user].balance -= Math.round(win);  
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
        return message.reply(`👉 » Вы засунули руку в коробку...\n💀 » Неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n💴 » Вы проиграли:  ${spaces(win)}💰\n🔥 » Вы проиграли 1 опыт.\n💰 » Баланс: ${spaces(user.balance)}`);
   
    } 
}else{
	    if(rand(1,100) > 75) {
        let win = text * 2;
        acc.users[message.user].balance += Math.round(win);   
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
        return message.reply(`😈 » Вы засунули руку в коробку...\n▪ » Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 » Вы выиграли:  ${spaces(win)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`);
    }else{
        let win = text;
        acc.users[message.user].balance -= Math.round(win);  
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
        return message.reply(`👉 » Вы засунули руку в коробку...\n💀 » Неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n💴 » Вы проиграли:  ${spaces(win)}💰\n🌚 » Опыт дается при ставке > 10.000💰\n💰 » Баланс: ${spaces(user.balance)}`);
   
    } 

}
})

cmd.on(/^(?:тир)\s?([0-9]+)?\s?([^\s	].*)?$/i, 'лотерея', 0, message => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if(!message.args[1]) return message.send(`👤 » Укажите ID мишени (от 1 до 3)\n🆔 1 » 👤\n🆔 2 » 👤\n🆔 3 » 👤\n\n👒 » Пример: 'тир ID(мишени) <ставка>'`)
		if(!message.args[2]) return message.send(`👤 » Укажите ставку.`)
		let stavka = parserInt(message.args[2]); 
  		if(!Number(stavka)) return message.send(`😈 » Ставка должна быть целым числом.`); 
		if(stavka > acc.users[message.user].balance) return message.send(`💰 »  У вас нет столько 💰`);
		let text = message.args[1];   
		if(message.args[1] > 3) return message.send(`👤 » Укажите ID мишени (от 1 до 3)\n🆔 1 » 👤\n🆔 2 » 👤\n🆔 3 » 👤\n\n👒 » Пример: 'тир ID(мишени) <ставка>'`)
		if(message.args[1] < 1) return message.send(`👤 » Укажите ID мишени (от 1 до 3)\n🆔 1 » 👤\n🆔 2 » 👤\n🆔 3 » 👤\n\n👒 » Пример: 'тир ID(мишени) <ставка>'`)
		if(stavka > user.balance || stavka <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
	  if(stavka > 10000){
	  	if(rand(1,100) > 73){
	    user.balance += stavka;
	    user.exs += 2;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
	    return message.send(`👤 » Поздравляю! Вы попали в голову!!\n👤 » Вы получаете 2 опыта и свою ставку.`);
	  }else{
	    user.balance -= stavka;
	    user.exs -= 1;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
    return message.send(`💀 » Увы... Вы промазали...\n💀 » В следующий раз повезет.\n💀 » Вы проиграли 1 опыт и свою ставку.`);
  	}
}else{
	if(rand(1,100) > 76){
	    user.balance += stavka; 
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    } 
	    return message.send(`👤 » Поздравляю! Вы попали в голову!!\n👤 » Вы получаете свою ставку.`);
	  }else{
	    user.balance -= stavka;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
    return message.send(`💀 » Увы... Вы промазали...\n💀 » В следующий раз повезет.\n💀 » Вы проиграли свою ставку.`);
  	}
}
	   
});






cmd.on(/^(?:наперсток)\s?([^\s	].*)?$/i, "нап", 0, (message, args) => {
		let user = acc.users[message.user];
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`😈 » Укажите ставку`);	 
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`😈 » Ставка должна быть целым числом.`);   
		if(amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		  
		if(naperst[message.user]){
		  return message.send(`💣 » Игра ~Наперсток~ угадай где 💰\n🆔1&#8419; | 📦\n🆔2&#8419;| 📦\n🆔3&#8419;| 📦\n📌 » Выбирайте ID коробки  »  'выб ID'`);
		}
		  
		if(!naperst[message.user]){
		  naperst[message.user] = {
		    one: false,
		    two: false,
		    three: false,
		    count: 0
		  }
		}
		 
		if(message.args[1] > user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может привышать баланс`);

		if(!amount) return message.send(`Укажите ставку!`);


		let win = rand(1,3);
		if(win == 1) naperst[message.user].one = true;
		if(win == 2) naperst[message.user].two = true;
		if(win == 3) naperst[message.user].three = true;

		naperst[message.user].count = amount;
		return message.send(`💣 » Игра ~Наперсток~ угадай где 💰\n🆔1&#8419;| 📦\n🆔2&#8419;| 📦\n🆔3&#8419;| 📦\n📌 » Выбирайте ID коробки » 'выб ID'`);
});

cmd.on(/^(?:выб)\s?([0-9]+)?/i, "нап", 0, (message, args) => {
		bot.botflood += 1;
 
 		let user = acc.users[message.user];
		if(!message.args[1]) return message.send(`💣 » Укажите 🆔 коробки.`);
		let text = Number(message.args[1]);  
		if(text > acc.users[message.user].balance) return message.send(`💰 »  У вас нет столько 💰`);
		if(text > 3) return message.send(`💣 » Введите 🆔 от 1 до 3.`);
		if(text < 1) return message.send(`💣 » Введите 🆔 от 1 до 3.`);
		if(!naperst[message.user]) return message.send(`Вы не начали игру!  » 'наперсток'`); 
		if(text > 10000){
			if(text == 1){
		  if(naperst[message.user].one == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили 2 опыта и ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    if(acc.users[message.user].exs <= 0){
				    acc.users[message.user].exs = 0;
			}
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
		if(text == 2){
		  if(naperst[message.user].two == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили 2 опыта и ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    if(acc.users[message.user].exs <= 0){
				    acc.users[message.user].exs = 0;
			}
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
		if(text == 3){
		  if(naperst[message.user].three == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили 2 опыта и ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    if(acc.users[message.user].exs <= 0){
				    acc.users[message.user].exs = 0;
			}
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
		}else{	
		if(text == 1){
		  if(naperst[message.user].one == true){
		    user.balance += naperst[message.user].count;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    if(acc.users[message.user].exs <= 0){
				    acc.users[message.user].exs = 0;
			}
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
		if(text == 2){
		  if(naperst[message.user].two == true){
		    user.balance += naperst[message.user].count;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили  ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    if(acc.users[message.user].exs <= 0){
				    acc.users[message.user].exs = 0;
			}
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
		if(text == 3){
		  if(naperst[message.user].three == true){
		    user.balance += naperst[message.user].count;
		    message.send(`💥 » Поздравляем! Вы угадали!\n🔥 » Вы получили  ${naperst[message.user].count}💰`);
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    } 
		    delete naperst[message.user];
		    return message.send(`💣 » Увы...Вы не угадали...`);
		  }
		}
	}
});

 
 
cmd.on(/^(?:кости)\s?([^\s	].*)?/i, 'кости', 0, message => {
		bot.botflood += 1;

		  let user = acc.users[message.user];
		  if(chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		  if(!message.args[1]) return message.send("⚠ Укажите ставку!");
		  let text = parserInt(message.args[1]); 
  			if(!Number(text)) return message.send(`😈 » Ставка должна быть целым числом.`);  
		  if(text > 1000000) return message.send(`💰 » Максимальная ставка для игры: 1.000.000💰 `);
		  if(text > acc.users[message.user].balance) return message.send(`💰 »  У вас нет столько 💰`);
		  if(!message.args[1]) return message.reply(`Вы не указали ставку`);
		  if(message.args[1] > user.balance || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Ставка не может быть меньше 0 или равна 0` : `Ставка не может превышать баланс`);
		  
		  if(text > 10000){
		  	 if(rand(1,100) > 93){
		  let userchis = rand(1,5);
		  let botchis = rand(5,6);
		  let userchis1 = rand(1,3);
		  let botchis1 = rand(2,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		  	let conv = sumbot;
		  	sumbot = sumuser;
		  	sumuser = sumbot;
		  }


		  if(sumuser > sumbot) {
		        let win = text * 2;
		        acc.users[message.user].balance += Math.round(win);  
		        user.exs += 2;
		        return message.reply(`
		        🎰 » Вы победили!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы выиграли:  ${spaces(win)}💰
		        🔥 » Вы получили: 2 опыта.
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        acc.users[message.user].balance -= Math.round(win);  
		        user.exs -= 1;
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
			    if(acc.users[message.user].exs <= 0){
					    acc.users[message.user].exs = 0;
				}
		        return message.reply(`
		        🎰 » Вы проиграли!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы проиграли:  ${spaces(win)}💰
		        🔥 » Вы проиграли: 1 опыт.
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.reply(`
		        🎰 » Ничья!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы получили:  ${spaces(win)}💰 
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  }else{
		  let userchis = rand(1,6);
		  let botchis = rand(3,6);
		  let userchis1 = rand(1,6);
		  let botchis1 = rand(3,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		        let win = text * 2;
		        acc.users[message.user].balance += Math.round(win);  
		        user.exs += 2;
		        return message.reply(`
		        🎰 » Вы победили!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы выиграли:  ${spaces(win)}💰
		        🔥 » Вы получили: 2 опыта.
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        acc.users[message.user].balance -= Math.round(win);  
		        user.exs -= 1;
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
			    if(acc.users[message.user].exs <= 0){
					    acc.users[message.user].exs = 0;
				}
		        return message.reply(`
		        🎰 » Вы проиграли!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы проиграли:  ${spaces(win)}💰
		        🔥 » Вы проиграли: 1 опыт.
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.reply(`
		        🎰 » Ничья!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы получили:  ${spaces(win)}💰 
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  }
		  }else{

		  }
		  if(rand(1,100) > 93){
		  let userchis = rand(1,5);
		  let botchis = rand(5,6);
		  let userchis1 = rand(1,3);
		  let botchis1 = rand(2,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		  	let conv = sumbot;
		  	sumbot = sumuser;
		  	sumuser = sumbot;
		  }


		  if(sumuser > sumbot) {
		        let win = text * 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.reply(`
		        🎰 » Вы победили!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы выиграли:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        acc.users[message.user].balance -= Math.round(win);   
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    } 
		        return message.reply(`
		        🎰 » Вы проиграли!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы проиграли:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.reply(`
		        🎰 » Ничья!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы получили:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  }else{
		  let userchis = rand(1,6);
		  let botchis = rand(3,6);
		  let userchis1 = rand(1,6);
		  let botchis1 = rand(3,6);
		  let sumuser = userchis + userchis1;
		  let sumbot = botchis + botchis1;

		  if(sumuser > sumbot) {
		        let win = text * 2;
		        acc.users[message.user].balance += Math.round(win); 
		        return message.reply(`
		        🎰 » Вы победили!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы выиграли:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        acc.users[message.user].balance -= Math.round(win);   
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
			    if(acc.users[message.user].exs <= 0){
					    acc.users[message.user].exs = 0;
				}
		        return message.reply(`
		        🎰 » Вы проиграли!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы проиграли:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.reply(`
		        🎰 » Ничья!
		        🎲 » Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 » Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 » Вы получили:  ${spaces(win)}💰 
		        🌚 » Опыт дается при ставке > 10.000💰
		        💰 » Баланс: ${spaces(user.balance)}`);
		  } 
		  }
   
})

//////////////////////////////////////////////////////////////////////////////////////////////////
 
cmd.on(/^(?:ссоздать)?(\s[^]+)?(\s[0-9]+)$/i, "создать", 4, (message, args) => { 
		if(!message.args[1]) return message.send(`✨ » Пример: 'ссоздать <name> <sum>'\n✨ » Запись без <>`);
		if(!message.args[2]) return message.send(`✨ » Пример: 'ссоздать <name> <sum> '\n✨ » Запись без <>`);

		let text = message.args[1].replace(/\s+/g, '');
		if(acc.users[message.user].level < 4) return;
		let count = message.args[2]; 

		if(!promo[text]){
		            	promo[text] = {
		            		count: Number(count),
		            		activ: 15,
		            		users: {}
		            	}
		}else{
			return message.send(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.send(`
			📝 » Промокод: ${text}
			🗝 » Количество активаций: 15
			💰 » Сумма рублей: ${spaces(count)}💰  
			`);

});


cmd.on(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?/i, "создать", 4, (message, args) => { 
		if(!message.args[1]) return message.send(`✨ » Пример: 'Создать <количество активаций> <сумма>'\n✨ » Запись без <>`);
		if(!message.args[2]) return message.send(`✨ » Пример: 'Создать <количество активаций> <сумма> '\n✨ » Запись без <>`);
		if(acc.users[message.user].level < 4) return;
		let count = parserInt(message.args[2]); 
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
		            		count: Number(count),
		            		activ: activ,
		            		users: {}
		            	}
		}else{
			return message.send(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.send(`
			📝 » Промокод: ${result}
			🗝 » Количество активаций: ${activ}
			💰 » Сумма рублей: ${spaces(count)}💰  
			`);

});

cmd.on(/^(?:дсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, "создать", 4, (message, args) => { 
		if(!message.args[1]) return message.send(`✨ » Пример: 'Дсоздать <количество активаций> <сумма>'\n✨ » Запись без <>`);
		if(!message.args[2]) return message.send(`✨ » Пример: 'Дсоздать <количество активаций> <сумма> '\n✨ » Запись без <>`);
		if(acc.users[message.user].level < 4) return;
		let count = parserInt(message.args[2]); 
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
		            		dcount: Number(count),
		            		activ: activ,
		            		users: {}
		            	}
		}else{
			return message.send(`[Error] Пересоздайте код еще раз.`);
		}


		return message.send(`
			📝 » Промокод: ${result}
			🗝 » Количество активаций: ${activ}
			💰 » Сумма доната: ${spaces(count)}💰  
			`);

});

 

cmd.on(/^(?:коды)$/i, "создать", 4, (message, args) => {
	if(acc.users[message.user].level < 4) return;	
	let text = `- Список Промокодов -\n`;
	for(id in promo){
		if(promo[id].dcount){
			text += `
					📝 » Промокод: ${id}
					🗝 » Количество активаций: ${promo[id].activ}
					💰 » Сумма доната: ${promo[id].dcount}💰  

					`
		}
		if(promo[id].count){
		text += `
		📝 » Промокод: ${id}
		🗝 » Количество активаций: ${promo[id].activ}
		💰 » Сумма рублей: ${spaces(promo[id].count)}💰  

		`
		}
	}
	return message.send(text);
});

cmd.on(/^удалить\s?([^]+)?$/i, "промокод", 0, (message, args) => {
	if(!message.args[1]) return message.send(`❇ » Укажите промокод для удаления.`);
	if(!promo[message.args[1]]) return message.send(`⌛ » Такого промокода не существует.\n⌛ » Либо закончился лимит активаций.`);
	delete promo[message.args[1]];
	return message.send(`⌛ » Промокод был удален.`);

});
	
cmd.on(/^промокод\s?([^]+)?$/i, "промокод", 0, (message, args) => {
	if(!message.args[1]) return message.send(`❇ » Укажите промокод для активации.`);
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.send(`⌛ » Такого промокода не существует.\n⌛ » Либо закончился лимит активаций.`);
	if(!promo[message.args[1]].users[message.user]){

		if(promo[promos].dcount){ 
			let activ = promo[promos].activ - 1;
			if(!promo[promos].users[message.user]){
				promo[promos].users[message.user] = {
					activ: true
				}
				acc.users[message.user].donate += Number(promo[promos].dcount);
			}
			let coi = Number(promo[promos].dcount)
			promo[promos].activ -= 1;
			if(promo[promos].activ == 0){
				delete promo[promos];
			}
			return message.send(`✅ » Вы успешно активировали промокод!\n✨ » Вы получили: ${spaces(coi)} доната.`);
		}
		if(promo[promos].count){ 
			let activ = promo[promos].activ - 1;
			if(!promo[promos].users[message.user]){
				promo[promos].users[message.user] = {
					activ: true
				}
			}
			acc.users[message.user].balance += Number(promo[promos].count);
			let coi = Number(promo[promos].count);
			promo[promos].activ -= 1;
			if(promo[promos].activ == 0){
				delete promo[promos];
			}
			return message.send(`✅ » Вы успешно активировали промокод!\n✨ » Вы получили: ${spaces(coi)} 💰`);
		}
	}else{
		return message.send(`🐩 » Увы, но вы уже активировали промокод.`);
	}
});
 
 
	////////////////////////  /////////////////////////////////
  
	var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
	
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
	function trueSpaces(str) { return str.toLocaleString("ru").split(",").join(".") };
	///////////////////////////////
		setInterval(() => {
			fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"));
			fs.writeFileSync("./base/chats.json", JSON.stringify(chats, null, "\t"));
			fs.writeFileSync("./base/report.json", JSON.stringify(rep, null, "\t"));
			fs.writeFileSync("./base/lobby.json", JSON.stringify(lobby, null, "\t"));
			fs.writeFileSync("./base/rull.json", JSON.stringify(rull, null, "\t"));
			fs.writeFileSync("./base/iban.json", JSON.stringify(iban, null, "\t"));
			fs.writeFileSync("./base/clans.json", JSON.stringify(clans, null, "\t"));
			fs.writeFileSync("./base/cases.json", JSON.stringify(cases, null, "\t"));
			fs.writeFileSync("./base/ferm.json", JSON.stringify(ferm, null, "\t"));
			fs.writeFileSync("./base/captha.json", JSON.stringify(captha, null, "\t"));
			fs.writeFileSync("./base/naperst.json", JSON.stringify(naperst, null, "\t"));
			fs.writeFileSync("./base/botinfo.json", JSON.stringify(botinfo, null, "\t"));
			fs.writeFileSync("./base/car.json", JSON.stringify(car, null, "\t"));
			fs.writeFileSync("./base/biz.json", JSON.stringify(biz, null, "\t"));
			fs.writeFileSync("./base/job.json", JSON.stringify(job, null, "\t"));
			fs.writeFileSync("./base/phone.json", JSON.stringify(phone, null, "\t"));
			fs.writeFileSync("./base/safe.json", JSON.stringify(safe, null, "\t"));
			fs.writeFileSync("./base/limit.json", JSON.stringify(limit, null, "\t"));
			fs.writeFileSync("./base/nick.json", JSON.stringify(nick, null, "\t"));
			fs.writeFileSync("./base/gonki.json", JSON.stringify(gonki, null, "\t"));
			fs.writeFileSync("./base/brak.json", JSON.stringify(brak, null, "\t"));
			fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
			fs.writeFileSync("./base/bot.json", JSON.stringify(bot, null, "\t"));
			fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"));
			fs.writeFileSync("./base/stats.json", JSON.stringify(activ, null, "\t"));  
			fs.writeFileSync("./base/timers.json", JSON.stringify(timers, null, "\t"));
		}, 15000);

	setInterval(function() {
		vk.api.call("friends.getRequests", {
			count: 100
		}).then((res) => {
			if (!res.items[0]) return;
			vk.api.call("friends.add", {
				user_id: res.items[0]
			});
		});
	}, 19000);

	var uptime = {
		sec: 0,
		min: 0,
		hours: 0,
		days: 0,
	}
////////////////////

	function logtime() {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var time = hours + ':' + minutes;
		return time;
	}

	function logdata() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1;
		var datas = days + ':' + month + ':2018' ;
		return datas;
	}
/////////////////////////
	function timeStamp() {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if (minutes == 0) minutes = "&#127358;&#127358;";
		if (minutes == 1) minutes = "0&#8419;1&#8419;";
		if (minutes == 2) minutes = "0&#8419;2&#8419;";
		if (minutes == 3) minutes = "0&#8419;3&#8419;";
		if (minutes == 4) minutes = "0&#8419;4&#8419;";
		if (minutes == 5) minutes = "0&#8419;5&#8419;";
		if (minutes == 6) minutes = "0&#8419;6&#8419;";
		if (minutes == 7) minutes = "0&#8419;7&#8419;";
		if (minutes == 8) minutes = "0&#8419;8&#8419;";
		if (minutes == 9) minutes = "0&#8419;9&#8419;";
		if (minutes == 10) minutes = "1&#8419;&#127358;";
		if (minutes == 11) minutes = "1&#8419;1&#8419;";
		if (minutes == 12) minutes = "1&#8419;2&#8419;";
		if (minutes == 13) minutes = "1&#8419;3&#8419;";
		if (minutes == 14) minutes = "1&#8419;4&#8419;";
		if (minutes == 15) minutes = "1&#8419;5&#8419;";
		if (minutes == 16) minutes = "1&#8419;6&#8419;";
		if (minutes == 17) minutes = "1&#8419;7&#8419;";
		if (minutes == 18) minutes = "1&#8419;8&#8419;";
		if (minutes == 19) minutes = "1&#8419;9&#8419;";
		if (minutes == 20) minutes = "2&#8419;&#127358;";
		if (minutes == 21) minutes = "2&#8419;1&#8419;";
		if (minutes == 22) minutes = "2&#8419;2&#8419;";
		if (minutes == 23) minutes = "2&#8419;3&#8419;";
		if (minutes == 24) minutes = "2&#8419;4&#8419;";
		if (minutes == 25) minutes = "2&#8419;5&#8419;";
		if (minutes == 26) minutes = "2&#8419;6&#8419;";
		if (minutes == 27) minutes = "2&#8419;7&#8419;";
		if (minutes == 28) minutes = "2&#8419;8&#8419;";
		if (minutes == 29) minutes = "2&#8419;9&#8419;";
		if (minutes == 30) minutes = "3&#8419;&#127358;";
		if (minutes == 31) minutes = "3&#8419;1&#8419;";
		if (minutes == 32) minutes = "3&#8419;2&#8419;";
		if (minutes == 33) minutes = "3&#8419;3&#8419;";
		if (minutes == 34) minutes = "3&#8419;4&#8419;";
		if (minutes == 35) minutes = "3&#8419;5&#8419;";
		if (minutes == 36) minutes = "3&#8419;6&#8419;";
		if (minutes == 37) minutes = "3&#8419;7&#8419;";
		if (minutes == 38) minutes = "3&#8419;8&#8419;";
		if (minutes == 39) minutes = "3&#8419;9&#8419;";
		if (minutes == 40) minutes = "4&#8419;&#127358;";
		if (minutes == 41) minutes = "4&#8419;1&#8419;";
		if (minutes == 42) minutes = "4&#8419;2&#8419;";
		if (minutes == 43) minutes = "4&#8419;3&#8419;";
		if (minutes == 44) minutes = "4&#8419;4&#8419;";
		if (minutes == 45) minutes = "4&#8419;5&#8419;";
		if (minutes == 46) minutes = "4&#8419;6&#8419;";
		if (minutes == 47) minutes = "4&#8419;7&#8419;";
		if (minutes == 48) minutes = "4&#8419;8&#8419;";
		if (minutes == 49) minutes = "4&#8419;9&#8419;";
		if (minutes == 50) minutes = "5&#8419;&#127358;";
		if (minutes == 51) minutes = "5&#8419;1&#8419;";
		if (minutes == 52) minutes = "5&#8419;2&#8419;";
		if (minutes == 53) minutes = "5&#8419;3&#8419;";
		if (minutes == 54) minutes = "5&#8419;4&#8419;";
		if (minutes == 55) minutes = "5&#8419;5&#8419;";
		if (minutes == 56) minutes = "5&#8419;6&#8419;";
		if (minutes == 57) minutes = "5&#8419;7&#8419;";
		if (minutes == 58) minutes = "5&#8419;8&#8419;";
		if (minutes == 59) minutes = "5&#8419;9&#8419;";
		if (hours == 0) hours = "&#127358;&#127358;";
		if (hours == 1) hours = "0&#8419;1&#8419;";
		if (hours == 2) hours = "0&#8419;2&#8419;";
		if (hours == 3) hours = "0&#8419;3&#8419;";
		if (hours == 4) hours = "0&#8419;4&#8419;";
		if (hours == 5) hours = "0&#8419;5&#8419;";
		if (hours == 6) hours = "0&#8419;6&#8419;";
		if (hours == 7) hours = "0&#8419;7&#8419;";
		if (hours == 8) hours = "0&#8419;8&#8419;";
		if (hours == 9) hours = "0&#8419;9&#8419;";
		if (hours == 10) hours = "1&#8419;&#127358;";
		if (hours == 11) hours = "1&#8419;1&#8419;";
		if (hours == 12) hours = "1&#8419;2&#8419;";
		if (hours == 13) hours = "1&#8419;3&#8419;";
		if (hours == 14) hours = "1&#8419;4&#8419;";
		if (hours == 15) hours = "1&#8419;5&#8419;";
		if (hours == 16) hours = "1&#8419;6&#8419;";
		if (hours == 17) hours = "1&#8419;7&#8419;";
		if (hours == 18) hours = "1&#8419;8&#8419;";
		if (hours == 19) hours = "1&#8419;9&#8419;";
		if (hours == 20) hours = "2&#8419;&#127358;";
		if (hours == 21) hours = "2&#8419;1&#8419;";
		if (hours == 22) hours = "2&#8419;2&#8419;";
		if (hours == 23) hours = "2&#8419;3&#8419;";
		if (hours == 24) hours = "&#127358;&#127358;";
		var time = hours + ':' + minutes;
		return time;
	}

	function timeStamps() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth();
		if (days == 0) days = "0&#8419;0&#8419;";
		if (days == 1) days = "0&#8419;1&#8419;";
		if (days == 2) days = "0&#8419;2&#8419;";
		if (days == 3) days = "0&#8419;3&#8419;";
		if (days == 4) days = "0&#8419;4&#8419;";
		if (days == 5) days = "0&#8419;5&#8419;";
		if (days == 6) days = "0&#8419;6&#8419;";
		if (days == 7) days = "0&#8419;7&#8419;";
		if (days == 8) days = "0&#8419;8&#8419;";
		if (days == 9) days = "0&#8419;9&#8419;";
		if (days == 10) days = "1&#8419;0&#8419;";
		if (days == 11) days = "1&#8419;1&#8419;";
		if (days == 12) days = "1&#8419;2&#8419;";
		if (days == 13) days = "1&#8419;3&#8419;";
		if (days == 14) days = "1&#8419;4&#8419;";
		if (days == 15) days = "1&#8419;5&#8419;";
		if (days == 16) days = "1&#8419;6&#8419;";
		if (days == 17) days = "1&#8419;7&#8419;";
		if (days == 18) days = "1&#8419;8&#8419;";
		if (days == 19) days = "1&#8419;9&#8419;";
		if (days == 20) days = "2&#8419;0&#8419;";
		if (days == 21) days = "2&#8419;1&#8419;";
		if (days == 22) days = "2&#8419;2&#8419;";
		if (days == 23) days = "2&#8419;3&#8419;";
		if (days == 24) days = "2&#8419;4&#8419;";
		if (days == 25) days = "2&#8419;5&#8419;";
		if (days == 26) days = "2&#8419;6&#8419;";
		if (days == 27) days = "2&#8419;7&#8419;";
		if (days == 28) days = "2&#8419;8&#8419;";
		if (days == 29) days = "2&#8419;9&#8419;";
		if (days == 30) days = "3&#8419;0&#8419;";
		if (days == 31) days = "3&#8419;1&#8419;";
		if (month == 0) month = "0&#8419;1&#8419;";
		if (month == 1) month = "0&#8419;2&#8419;";
		if (month == 2) month = "0&#8419;3&#8419;";
		if (month == 3) month = "0&#8419;4&#8419;";
		if (month == 4) month = "0&#8419;5&#8419;";
		if (month == 5) month = "0&#8419;6&#8419;";
		if (month == 6) month = "0&#8419;7&#8419;";
		if (month == 7) month = "0&#8419;8&#8419;";
		if (month == 8) month = "0&#8419;9&#8419;";
		if (month == 9) month = "0&#8419;10&#8419;";
		if (month == 10) month = "1&#8419;11&#8419;";
		if (month == 11) month = "1&#8419;12&#8419;";
		var datas = days + ':' + month + ': 2&#8419;0&#8419;1&#8419;8&#8419;';
		return datas;
	}

	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) {
			uptime.sec = 0;
			uptime.min += 1;
		}
		if (uptime.min == 60) {
			uptime.min = 0;
			uptime.hours += 1;
		}
		if (uptime.hours == 24) {
			uptime.hours = 0;
			uptime.days += 1;
		}
	}, 1000);
	setInterval(function() {
		tcpp.ping({
			address: 'vk.com'
		}, function(err, data) {
			vk.api.status.set({
				text: `&#10035; Online | &#8986;  Time :${timeStamp()} | Обработано: ${botinfo.msg} сообщение. | Создатель: https://vk.com/garanttop3`
			})
		});
	}, 60000);
	/*setInterval(function () {
	  tcpp.ping({ address: 'vk.com' }, function(err, data) {
	    vk2.api.status.set({text: `&#10035; Online | &#8986;  Time :${timeStamp()} | Обработано: ${botinfo.msg} сообщение.`})
	  });
	},60000);*/

/////////////////////////////////// БОТ ИНФО
	setInterval(() => {
		tcpp.ping({
			address: 'vk.com'
		}, function(err, data) {
			botinfo.ping = `${Math.round(data.avg)}ms`;
			botinfo.uptime = `(${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec})`;
		}, 40000);
	}, 40000);
//////////////////////////////////////////////////
	setInterval(() => {
		chats.znach = "Ставка уменьшилась на - ";
		let stavk = rand(1, 10);
		chats.stavka = Number(stavk);
	}, 30000);
////////////////////////////// подсчет очков в клане
	setInterval(() => {
		let people = 0;
		let exs = 0;
		let convert = 0;
		for (let id in clans) {
			for (let ids in clans[id].users) {
				if (Frs[ids].lvl >= 1) {
					convert = acc.users[ids].lvl * 20;
				}
				exs = convert + acc.users[ids].exs;
				clans[id].exs = exs;
			}
		}
	}, 55000);
/////////////////////////////////////////////////
	setInterval(() => {
			let people = 0;
			for (let id in clans) {
				for (let peoples in clans[id].users) {
					people += 1;
				}
				clans[id].people = people;
				people = 0;
			}
		}, 55000);
/////////////////////////////////////////////////
	setInterval(() => {
		let people = 0;
		for (let id in biz) {
			for (let peoples in biz[id].users) {
				people += 1;
			}
			biz[id].people = people;
			people = 0;
		}
	}, 55000);


	setInterval(() => { 
		for (let id in acc.users) {
			if(acc.users[id].level >= 2){
				acc.users[id].donate += 50;
				acc.users[id].balance += 10000;
			}
		}
	}, 55000);
/////////////////////////////////////////////////
	//////////////// FERMA MINE
	setInterval(() => {
		for (let id in ferm) {
			if (ferm[id].owner == id) {
				acc.users[id].donate += ferm[id].dohod;
			}
		}
	}, 3600000);
 

}
 