const TOKEN_GROUP = ''; // токен группы
const vk = new(require('vk-io'));
const VK = require("vk-io");  
var bot1 = new newBot(VK, {
	token: "" // токен страницы  
});  
// 
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
const bank = require('./base/bank.json');
const kill = require('./base/kill.json');
const blist = require('./base/blist.json'); 
const mine = require('./base/mine.json'); 
const commands = require('./base/commands.json'); 
const ref = require('./base/ref.json'); 
const bost = require('./base/bost.json'); 


const win = ''; // DA 
const lose = ''; // NET 
const podpiska = ''; // Подписка 
const pomosh = ''; // Помощь 
const igri = ''; // Игры 
const magazin = ''; // Магазин 
const duels = ''; // Дуэль 
const bouyy = ''; // Бои 
const gonkis = ''; // Гонки 
const mineferm = ''; // Майнинг-ферма 
const errors = ''; // Ошибка 
const keysi = ''; // Кейсы 
const bitki = ''; // биткоины 
const bonyys = ''; // бонус 

const mashina = ''; // машины 
const bizzs = ''; // бизнесы 
const kyplens = ''; // куплено 
const fortyn = ''; // фортуна 
const guuns = ''; // оружие 
const bbots = ''; // бот 

const dons = ''; // донат 
const joobs = ''; // работы prochee 
const prochee = ''; // прочее 
const toppp = ''; // Top 
const timmers = ''; // timmers 

const cardss = ''; // карта 
const cclans = ''; // cclans
const promos = '' //промокоды 
const treeeyd = '' //трейд
const bostss = '' //буст
 
 
 
vk_group.setOptions({
	token: TOKEN_GROUP,
	call: "execute"
});
vk_group.longpoll.start().then(() => console.log('Bot activ!'));
vk_group.longpoll.on("message", (message) => {
	// Checkers
	if (!message.text || ~message.flags.indexOf("outbox")) return;


	if(message.text){
			if(iban[message.user]){
				 
					return;
			 
			}
		}
		if(message.text){
			if(blist[message.user]){
				 return;
			}
		}

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
			if(!ref.newsuser[message.user]){
				ref.newsuser[message.user] = {
					i: true
				}
			}  
			message.send(`🎉 » *id${message.user} (${user.first_name}), вы успешно зарегистрировались. \n✨ » Ваш баланс: 1.500💰 \n✨ » Введите команду "Помощь", чтобы узнать список команд.\n\n⚠ » Если вы не знаете как играть с ботом, переходите в нашу беседу. Наши игроки вам помогут.\n https://vk.me/join/AJQ1d4uwJARyDVMC99SyaxMj`);
		})
	} 

	if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,                // раздача в бизе + слив бабла с клана + снятие/вкад в клан,
				reportban: false,
				top: false       
			}
		}
	}

	 
	 
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
	if(acc.users[message.user]){
			if(acc.users[message.user].exs < 0) acc.users[message.user].exs = 0 
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
	DEVELOPERS = [459607222];
	BLACKLIST = [];
	MAINCHAT = 1; //29;
	BOT_ID = null;
	//
	//
	vk.setOptions({
		token: config.token,
		call: "execute"
	});
	
	vk.longpoll.start().then(console.log("BOT - STARTED."));

	////////////////////////////////////////////////
	vk.api.users.get({}).then((res) => { 
		BOT_ID = res[0].id;
		BOT_IDS.push(res[0].id);
	});
	//////////////////////

	var stats = {
		total_msgs: 0,
		total_cmds: 0
	}
	var captcha_status = false
	var captcha = new(require("./captcha"))();
	//var weather = new (require("./weather.js"))("ключ от погоды");
	 
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
		///////////
		if(message.text){
			/*
			 vk.api.messages.getChatUsers({
			 chat_id: message.chat
				}).then(res => {
					let num 
					BOT_IDS.map(e => {

						if(~res.indexOf(e) && e !== BOT_ID) {
								vk.api.call('messages.removeChatUser', { chat_id: message.chat, user_id: e })
						}
					})
				})*/

			if(!commands[message.user]){
				commands[message.user] = {
					command: {
					giverub: false,
					pay: true,
					addvip: false,
					addmoder: false,
					addadmin: false,
					givedonate: false,
					giveexs: false,
					ban: false,
					unban: false,
					tempban: false,
					removerub: false,
					bankbiz: true,               // раздача в бизе + слив бабла с клана + снятие/вкад в клан,
					reportban: false,
					top: false       
				}
			}
		}


 
			if(blist[message.user]){
				vk.api.call('messages.getChat', {chat_id: message.chat})
			        .then(res => {
			            
			             if(res.title == 'Главная беседа || Аврора Бот || Оф. Беседа'){
			            		message.send('Мусору тут не место.');
			            		return vk.api.call('messages.removeChatUser', { chat_id: message.chat, user_id: message.user });    
			            } 
			            if(res.title == 'Фан-беседа || Аврора Бот || Оф. Беседа'){
			            		message.send('Мусору тут не место.');
			            		return vk.api.call('messages.removeChatUser', { chat_id: message.chat, user_id: message.user });      
			            }    
			        })
			}
		}
		if (iban[message.user]) return;
		///////////
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
					balance: 1500,
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
				message.send(`🎉 » *id${message.user} (${user.first_name}), вы успешно зарегистрировались. \n✨ » Ваш баланс: 1.500💰 \n Введите команду "Помощь", чтобы узнать список команд.`);
		})
		}
		if(acc.users[message.user]){
			if(acc.users[message.user].exs < 0) acc.users[message.user].exs = 0
			if(acc.users[message.user].balance < 0) acc.users[message.user].balance = 0 
		}
		  
		if (~BLACKLIST.indexOf(message.user)) return;
		 
		cmds.map(cmd => {
			if (!cmd.r.test(message.text) || message.sended) return;
			message.args = message.text.match(cmd.r) || [];
			if (!acc.users[message.user]) return;
			if (cmd.l <= acc.users[message.user].level || ~DEVELOPERS.indexOf(message.user)) cmd.f(message);
		})
	})
	
	vk.longpoll.on("chat.invite", (action) => {

		vk.api.call("messages.getById", { message_ids: action.id }).then((res) => {
		////////////////////////////
			if(blist[res.items[0].action_mid]){
				vk.api.call('messages.getChat', {chat_id: action.chat})
			        .then(re => {
			            if(re.title == 'Главная беседа || Аврора Бот || Оф. Беседа'){
			            		action.send('Мусору тут не место.');
			            		return vk.api.call('messages.removeChatUser', { chat_id: action.chat, user_id: res.items[0].action_mid });    
			            } 
			            if(re.title == 'Фан-беседа || Аврора Бот || Оф. Беседа'){
			            		action.send('Мусору тут не место.');
			            		return vk.api.call('messages.removeChatUser', { chat_id: action.chat, user_id: res.items[0].action_mid });    
			            }   
			        }) 
			}
		});
		////////////////////////////

		 

		vk.api.messages.getChatUsers({
			chat_id: action.chat
		}).then(res => {
			BOT_IDS.map(e => {
				if(~res.indexOf(e) && e !== BOT_ID) {
						vk.api.messages.removeChatUser({
							chat_id: action.chat,
							user_id: BOT_ID
						})
					//})
				}
			})
		})
	}); 
	 
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

	///////////////////////
	cmd.on(/^(?:капча)/i, "капча", 4, (message) => {
	 	if(acc.users[message.user].level < 4) return;
        rq.get('http://rucaptcha.com/res.php?action=getbalance&key=834b4e4bbe74cd6526dd4cd0a7b486a1&json=1', (e,r,b) => {
            if(e) return
            var data = JSON.parse(b)
            message.send("Баланс rucaptcha: " + data.request + " рублей.")
		});
    });
	///////////////////////////////////////////////////////////////
	cmd.on(/^(?:прочее)/i, "прочее", 0, (message) => {
	botinfo.botflood += 1;
		return message.send(`
📝 Прочие команды 📝

🎎 Команды кланов:
🔹 » addclan - создать клан.
🔹 » khelp  - команды клана.
🔹 » Кланы - список всех кланов.
🔹 » Клан - Инфо о Вашем клане.

🌅 Команды для ферм:
🔹 » Ферма - Инфо о вашей ферме.
🔹 » Фермы - Описание фермы.
🔹 » Купить ферму - Покупка МайнФермы.
🔹 » Улучшить - улучшить ферму.

💼 Команды для кейсов:
🔹 » Магазин - в нем покупают кейсы.
🔹 » Купить ID - купить товар.
🔹 » Кейсы - список купленных кейсов.
🔹 » Открыть ID(кейса) - открыть кейс.
🔹 » Оружие - список вашего оружия.
🔹 » Продать ID - продать оружие.
🔹 » Выбрать ID - взять в руки оружие.
 
💰 Имущество:
🔹 » Машины - список машин.
🔹 » Машина ID - купить.
🔹 » Бизнесы - список бизнесов.
🔹 » Бизнес купить ID - купить.
🔹 » Телефоны - список телефонов.
🔹 » Телефон ID - купить телефон.
🔹 » Работы - список работ.
🔹 » Устроиться - на работу.
🔹 » Уволиться - с работы.

💳 Банк :
🔹 » Карта - создать карту.
🔹 » Снять <сумма> - снять с карты. 
`, {attachment: prochee});
	});


	cmd.on(/^(?:важно)/i, "прочее", 0, (message) => {
		return message.send(`
	✉ Беседа с нашим ботом! 
📌 Залетайте! 
📖 https://vk.me/join/AJQ1dyp0VgTBS0KIXlacOCUX

💎 Хотите получать донат?
Воспользуйтесь реферальной системой.
Прочитать условия можно командой: рефералка
После выполнения условия вы получите донат.
За 1 человека вы получите 1 донат.

✏ За донатом писать: vk.com/alenka.shok
📙 Не забудь вступить в группу: [bot.avrora| Бот Аврора]

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
⛔ » Донат - Купить донат. 
⚠ » Подписка - команды платной подписки.

☀ » Бот - Информация о боте. 
👬 » Рефка - реф.система
🔹 » Правила - к прочтению!
🔹 » Агенты - Список поддержки. 

📖 » Важно - информация.

📝 » Бинфо - ваши улучшения.
📝 » Буст - список улучшений. 

⏩ » Промокод - активация промокода.

❗ » Прочее - остальные команды.
❗ » Таймеры - к прочтению!!!

📰 Основной раздел: 
📒 » Профиль 
📝 » Инфо - ограничения.
📝 » Аинфо - админ. ограничения.
💳 » Банк 
🚘 » Машины
📱 » Телефоны
💲 » Баланс 
🌐 » Биткоин 
👜 » Магазин 
💼 » Бизнесы 
👔 » Работы 

💰 » Зарплата - снять зарплату.
💰 » Прибыль - снять прибыль с бизнеса.
📓 » Бизинфо - информация о бизнесах и их команды!

🤝 » Передать [ID] [сумма] - 💰. 
🔸 » Проверить ID - профиль игрока. 

🔯 Никнейм:
🔯 » Зови меня <Имя> [1.000.000💰]
🔯 » Кто я - покажет префикс.

💡 Разное: 
🎲 » Игры - игровой раздел.
🏆 » Топ - Команды топа.

⚠ » Подписка - Команды подписок. 
🆘 » Репорт - Отправить вопрос/жалобу/предложение. 
👑 » Группа - Наша группа. 
✨ » Беседа - Информация о беседе. 
🐔 » Ко - Отклик бота 
✳ » cid - Узнать ID чата. 
🤵 » Владельцы - бизнесов.
🌍 » Кланы - Список всех кланов. 
🏆 » Вступить ID(клана) - Вступить в клан. 
🏆 » Покинуть - Покинуть клан.
⚠ » МЕГА КОНКУРС! - https://vk.com/bot.avrora?w=wall-166068516_675

⚠ » В группе [bot.avrora| Бот Аврора] бот работает без задержки.


	 `, {attachment: pomosh });
		})
	});
	cmd.on(/^(?:игры|game)/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		return message.send(`
🔮 » Развлечения:
🏁 » Топ - топ кланов и игроков. 
👬 » Рефка - реф.система 
💵 » Стата - мини инфа о профиле. 
💳 » Карта - Меню по карте. (банк для 💰) 
⚠ » Карта - помощь по карте. 
💳 » Бонус - бесплатные 10.000 💰. 
💳 » Баланс - баланс. 
💰 » Монетка ставка орел|решка 
🎰 » Казино ставка - казино. 
🎰 » Азино ставка - казино. 
🔫 » Рр - Русская Рулетка (Игра вабанк). 
🔫 » Дуэль (❗2 игрока). 
⚠ » Бин вверх|вниз ставка - бинарные опционы. 
💼 » Сейф - взломать сейф.
💎 » Майн - устроиться майнером.

🚘 » Гонки (❗2 игрока). 
📦 » Наперсток - игра в наперсток.
🎫 » Лотерея - Лотерея.
🤔 » Ловушка - Ловушка.
🎲 » Кости - игра в кости.
💀 » Тир - Игра в тир.
🥇 » Кубик <ставка> - угадай чет или нечет.
🔎 » Число <ставка>- угадай число
🔹 » Ргб [к/з/ч] [ставка] - цветная рулетка

🥊 » Бой <ставка> - Побеждает игрок набравших 50 голосов.
🥊 » Голос ID - проголосовать за игрока. 

🎮 » Фортуна - донат-рулетка.

🌴 » Команды Майнинг-фермы:
🔥 » Ферма - Инфа по вашей Майнинг-ферме. 
🔥 » Улучшить - улучшить Майнинг-ферму. 
🔥 » Фермы - информация о Майнинг-ферме. 

🔫 » Команды кейсов:
💼 » Открыть: opencase ID(кейса). 
💼 » Ваши скины: оружие 
💼 » Продать скины: продать ID 
💼 » Ваши кейсы: кейсы 
💼 » Купить кейсы: магазин 
🔫 » Выбрать ID - взять в руки оружие.


`, {attachment: igri  });
	});
 


	cmd.on(/^кик?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 0, (message, args) => { 
		if(acc.users[message.user].level < 1) return message.send(`🔹 » У вас не куплена подписка`);
			if(message.args[4]) { 
				var domain = message.args[4].split(" "); 
				vk.api.call("utils.resolveScreenName", { 
				screen_name: message.args[4] 
				}).then((res) => { 
					if(BOT_ID == res.object_id) return message.reply('Отказ'); 
					message.send(`Пользователь @${res.object_id}(${acc.users[res.object_id].prefix}) успешно исключен из беседы.`); 
					return vk.api.call("messages.removeChatUser", { chat_id: message.chat, user_id: res.object_id }); 
				}) 
			}else{ 
				if(!message.args[3]) return message.reply("ID не указан, либо указан неверно."); 
				if(chats[message.chat].users[message.args[3]].level >= chats[message.chat].users[message.user].level) return message.reply('Вы не можете кикнуть vk.com/id' + message.args[3] + '\n'); 
				if(BOT_ID == message.args[3]) return message.reply('Отказ'); 
			 	message.send(`Пользователь @${message.args[3]}(${acc.users[message.args[3]].prefix}) успешно исключен из беседы.`); 
				return vk.api.call("messages.removeChatUser", { chat_id: message.chat, user_id: message.args[3] }); 
				} 
	});




	cmd.on(/^(?:топ|top)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),
    💎 » Команды топа:
    💰 » Топ баланс  
    💥 » Топ опыт
    💎 » Топ донат
    🌍 » Топ кланы 
    `);
	});
	cmd.on(/^(?:топ баланс)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;


		let text = ``;
		var tops = []
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
		if(!commands[i]){
				commands[i] = {
					command: {
					giverub: false,
					pay: true,
					addvip: false,
					addmoder: false,
					addadmin: false,
					givedonate: false,
					giveexs: false,
					ban: false,
					unban: false,
					tempban: false,
					removerub: false,
					bankbiz: true,
					reportban: false,
					top: false                
				}
			}
		}
			 if(commands[i].command['top'] != true){
				tops.push({
				id: i,
				balance: acc.users[i].balance
				})
			}
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
		message.send(text, {attachment: toppp });
	});
	cmd.on(/^(?:топ опыт)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let text = ``;
		var tops = []
		for (let i in acc.users) {
			if(!commands[i]){
				commands[i] = {
					command: {
					giverub: false,
					pay: true,
					addvip: false,
					addmoder: false,
					addadmin: false,
					givedonate: false,
					giveexs: false,
					ban: false,
					unban: false,
					tempban: false,
					removerub: false,
					bankbiz: true,
					reportban: false,
					top: false                
				}
			}
		}
			if(acc.users[i].level != 4){
			 if(commands[i].command['top'] != true){
				tops.push({
				id: i,
				exs: acc.users[i].exs
			 })
			}	
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
		message.send(text, {attachment: toppp });
	});
	cmd.on(/^(?:топ донат)$/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let text = ``;
		var tops = []
 
		for (let i in acc.users) {
			if(acc.users[i].level != 4){
				if(!commands[i]){
				commands[i] = {
					command: {
					giverub: false,
					pay: true,
					addvip: false,
					addmoder: false,
					addadmin: false,
					givedonate: false,
					giveexs: false,
					ban: false,
					unban: false,
					tempban: false,
					removerub: false,
					bankbiz: true,
					reportban: false,
					top: false                
				}
			}
		}
			 if(commands[i].command['top'] != true){
				tops.push({
				id: i,
				donate: acc.users[i].donate
				})
			}	
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
		message.send(text, {attachment: toppp });
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
				`\n🌍 » Количество участников: ${clans[e.id].people}\n\n`, {attachment: toppp }
			)
		);
		
		
		/*var text = ``;
		var tops = []
		for (let i in clans) {
			if (i == Number(i)) {
				tops.push({
					id: i,
					balance: clans[i].balance
				})
			}
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var yo = []
		for (var g = 0; g < 9; g++) {
			if (tops.length > g) {
				let up = g;
				up += 1;
				yo.push({
					id: tops[g].id,
					balance: tops[g].balance,
					smile: `${up}&#8419;`
				})
			}
		}
		var clan = "💰| Топ богатых кланов: \n" + yo.map(a => a.smile + ". " + clans[a.id].name + "\n🐱 » Основатель:  [id" + clans[a.id].owner + "|" + acc.users[clans[a.id].owner].prefix + "] \n🔥 » Баланс клана: " + spaces(a.balance) + `\n🌍 » Количество участников: ${clans[a.id].people}\n`).join("\n")
		text += `${clan}\n`;
		message.send(text);*/
	})
	/*
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
	});*/

////////////////////////////////////////////////////////////////////////////////////////////////////////ПОДПИСКА
	cmd.on(/^(?:подписка)/i, "help", 0, (message) => {
	botinfo.botflood += 1;
		let user = acc.users[message.user];
		if (user.level < 2){
			return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),
		     💡 Список доступных команд подписки 'Все включено': 

		    ✳ » Халява - случайный ежедневный подарок.
		    ✳ » Буст - дополнительные улучшения.
	       	✳ » Ежедневно можно брать 1 буст бесплатно.

	        💎 » addclan - создать клан. [бесплатно]
	        💎 » Зови меня - поставить ник [бесплатно]

	        ✨ » Выдать [Ссылка Вк] [СУММА] - выдать валюту (без [ ])
	        ⚠ » Любому игроку 1.500.000 в час.

	        🎃 » Увеличена сумма передачи до 1.000.000💰 
	        🎃 » Увеличен 'бонус' до 100.000💰

		    🌚 » Кредит <сумма> - можно взять кредит до 1.000.000💰.
		    🌚 » Погасить <сумма> - погасить кредит.
		    🌚 » Долг - покажет вашу задолженность в банке.

		    ✨ » Кик [Ссылка вк] - кикнуть игрока из беседы.
		     
		    🔺 » Расценка: 
		    🔹 » Сутки - 50р 
			🔹 » Неделя - 200р
			🔹 » 2 недели  - 350р
			🔹 » Месяц - 650р

		    `, {attachment: podpiska });
		}

		if (user.level == 4) {
			return message.send(`
    	 &#10134; &#10134; Команды подписки 'Легенда' &#10134; &#10134;
          
         🔸 » giverub ID сумма - дать валюту.
         🔸 » removerub ID - аннулировать валюту. 
 		
 		 🔥 » ники - список заявок на смену ника.
         🔥 » onnick ID - одобрить заявку на смену ника.
         🔥 » offnick ID - отклонить заявку на смену ника.

    	 🔸 » ban ID - Заблокировать юзера.
    	 🔸 » unban id - Разбанить юзера. 
         🔸 » tempban ID <время> <причина> - бан. 
      	 🔸 » temprep ID <время> <причина> - бан репорта
         🔔 » offgame - выключить игры.
	     🔔 » ongame  -вкл игр. 
      	 🔸 » blocktop ID - скрыть из топа.
      	 🔸 » untop ID - вернуть в топ. 

      	 🔸 ➣ adellclan ID - удалить клан.
	     👻 » агент - Информация для агентов.

	     ✳ » Буст - дополнительные улучшения.
         ⛔ » Подписка покупается на месяц. По истечению 30 дней с момента покупки - подписка удаляется.

    	 	`, {attachment: podpiska });
		}
	});
 

	cmd.on(/^(?:free|бонус)/i, 'фри', 0, message => {
		bot.botflood += 1;
		 if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
	if(acc.users[message.user].level < 1){
		if(acc.users[message.user].balance >= 1) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n🔥 » Брать бонус можно при нулевом балансе.`, {attachment: bonyys});
		if (acc.users[message.user].bank > 0) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n🔥 » Брать бонус можно при нулевом балансе тогда, когда у вас на карте нет денег.`, {attachment: bonyys});
		acc.users[message.user].balance += 100000;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n💴 » Бонус в виде 100.000💰 начислен!`, {attachment: bonyys});
	}else{
		if(acc.users[message.user].balance >= 1) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n🔥 » Брать бонус можно при нулевом балансе.`, {attachment: bonyys});
		if (acc.users[message.user].bank > 0) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n🔥 » Брать бонус можно при нулевом балансе тогда, когда у вас на карте нет денег.`, {attachment: bonyys});
		acc.users[message.user].balance += 200000;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n💴 » Бонус в виде 200.000💰 начислен!`, {attachment: bonyys});
	}
	})

 	cmd.on(/^(?:халява)/i, 'фри', 1, message => {
 		if(acc.users[message.user].level < 1) return message.send(`✏ » Халява доступна тем, у кого есть подписка.`)
 		if(timers.admin[message.user].free == true) return message.send(`⏰ » 24 часа еще не прошло. Ожидайте.`)
		timers.admin[message.user].free = true;
			setTimeout(function () {
				timers.admin[message.user].free = false
			}, 86400000)	

	let text = rand(1,4);
	if(text == 1){
		let priz = rand(1,5);
		 	
		acc.users[message.user].donate += Number(priz);
		return message.send(`💎 » Поздравляю! Вы получили ${priz} доната! \n⏳ » Следующую халяву можно получить через 24 часа.`);
	}
	if(text == 2){
		let priz = rand(400000,580000);
		acc.users[message.user].balance += Number(priz);
		return message.send(`💴 » Поздравляю! Вы получили ${priz}💰!\n⏳ » Следующую халяву можно получить через 24 часа.`);
	}
	if(text == 3){
		let priz = rand(10,50);
		acc.users[message.user].exs += Number(priz);
		return message.send(`💥 » Вы получили ${priz} опыта!\n⏳ » Следующую халяву можно получить через 24 часа.`);
	}
	if(text == 4){
		let priz = rand(7,12);
		acc.users[message.user].bitcoin += Number(priz);
		return message.send(`💥 » Вы получили ${priz} Биткоинов!\n⏳ » Следующую халяву можно получить через 24 часа.`);
	}
	})







	cmd.on(/^выдать?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 1, (message, args) => {
 
 
		let amount = Number(message.args[5]); 
		

		 if (acc.users[message.user].level >= 1) {
			if (acc.users[message.user].giverub == true) return message.send(`✨ » Выдавать валюту можно раз в 60 минут.`);
			if (amount > 1500000) return message.send(`✨ » Нельзя выдавать более 1.500.000💰 за раз в 60 минут.`);
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].balance += Number(amount);
					acc.users[message.user].giverub = true;
					setTimeout(() => {
						acc.users[message.user].giverub = false;
					}, 3600000)

					/////////////////////////////////////////////////////////////////
					if(!log.point[res.object_id]){
						log.point[res.object_id] = {
							log: ``
						}
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|выдать] Получил от: ${message.user} | ${amount} р\n`
					}else{
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|выдать] Получил от: ${message.user} | ${amount} р\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|выдать] Выдал: ${res.object_id} | ${amount} р\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|выдать] Выдал: ${res.object_id} | ${amount} р\n`
					}
					/////////////////////////////////////////////////////////////////

					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),  валюта была выдана пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return; 
			} else {
				if (!message.args[3]) return message.send("✨ » ID не указан, либо указан неверно. ");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				acc.users[message.user].giverub = true;
				setTimeout(() => {
					acc.users[message.user].giverub = false;
				}, 3600000)
				/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[3]]){
						log.point[message.args[3]] = {
							log: ``
						}
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|выдать] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|выдать] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|выдать] Выдал: ${message.args[3]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|выдать] Выдал: ${message.args[3]} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), валюта была выдана пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		} 
		return message.send(`🎉 »  Доступ к команде доступен от подписки "Все включено"`);
	 
	});
////////////////////////////////////////////////
// выдать забрать адму
	cmd.on(/^addvip?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 0, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}

		if (commands[message.user].command['addvip'] == false) return message.send(`✨ » Доступ к этой команде - запрещен.`);
		bot.botflood += 1; 
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.(Юзера нет в базе)`, {attachment: errors});
				acc.users[res.object_id].level = 1;
				acc.users[res.object_id].tag = "Подписка 'Все включено'";
				var used = res.object_id;
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					if(!timers.admin[used]){
						timers.admin[used] = {
							free: true,
							bost: true
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = false;
					commands[used].command['unban'] = false;
					commands[used].command['tempban'] = false;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
				/////////////////////////////////////////////////////////////////
					if(!log.admin[res.object_id]){
						log.admin[res.object_id] = {
							log: ``
						}
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | 'Все включено'\n`
					}else{
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | 'Все включено'\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | 'Все включено'\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | 'Все включено'\n`
					}
					/////////////////////////////////////////////////////////////////

				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\nПользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) получил подписку 'Все включено'.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
			acc.users[message.args[3]].level = 1;
			acc.users[message.args[3]].tag = "Подписка 'Все включено'";
			var used = message.args[3];
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					if(!timers.admin[used]){
						timers.admin[used] = {
							free: true,
							bost: true
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = false;
					commands[used].command['unban'] = false;
					commands[used].command['tempban'] = false;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
					/////////////////////////////////////////////////////////////////
					if(!log.admin[message.args[3]]){
						log.admin[message.args[3]] = {
							log: ``
						}
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | 'Все включено'\n`
					}else{
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | 'Все включено'\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | 'Все включено'\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} |'Все включено'\n`
					}
					/////////////////////////////////////////////////////////////////

			return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\nПользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) получил подписку 'Все включено'.`);
		}
	});
////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ПОДПИСКА
	 
	cmd.on(/^(?:группа)/i, "help", 0, (message) => {
		bot.botflood += 1;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), Наша группа - [bot.avrora| Бот Аврора]`);
	});
	cmd.on(/^(?:правила)/i, "help", 0, (message) => {
		bot.botflood += 1;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),
🔥Актуальный список правил бота🔥 

⚠» ЗАПРЕЩЕНО:
🔹» 1.1. Оскорбление любого пользователя.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.2. Обман администрации любым способом.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.3. Выпрашивание у РАЗРАБОТЧИКОВ валюту/донат/подписки.
🚫» Наказание: Временная блокировка.
🔹» 1.4. Бессмысленные сообщения в "репорт".
🚫» Наказание: Временная блокировка.
🔹» 1.5. Часто использовать однотипные команды с целью нагубить боту.
🚫» Наказание: Временная блокировка аккаунта.
🔹» 1.6. Выдавать себя за модератора/администратора.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.7. Продажа игровой валюты.
🚫» Наказание: Блокировка аккаунта.
🔹» 1.8. Использовать баги не сообщая о них.
🔹➣ Разработчику или в теме: https://vk.cc/85jli4
🚫» Наказание: Временная(вечная) блокировка.
🔹» 1.9. Использоват нецензурные выражения в никах/названиях клана.
🚫» Наказание: в 1 раз - предупреждение. 2-й раз - бан.

🔹» 1.10. Контент 18+ запрещен (порно, эротика и т.д.) 
🔹» 1.12. Менять название беседы запрещено. 
🔹» 1.13. Добавлять других  ботов запрещено.
🔹» 1.14. Упоминание других ботов запрещено.
🔹» 1.15. Добавление человека которого только что кикнули запрещено. 
🔹» 1.16. Использование мульти-аккаунтов. 
🔹» 1.17. Оскорбление/обман администрации,проекта. 
🔹» 1.18. Накрутка валюты с других аккаунтов(фейков).
🚫» Наказание: Блокировка аккаунта.

🔹» 1.19. Реклама/пиар/выпрашивание лайков.
🚫» Наказание: Первый раз - кик из бесед, последующие разы - блокировка навсегда.
 

⚠» В ЛС группы ЗАПРЕЩЕНО: 
🔹» 2.1. Выпрашивание валюты/доната/подписки.
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
		let admins = [459607222]; // Кучер. Не трогать.
		
		if (message.user === 459607222) {
			return message.send(`Готово: ${eval(message.args[1])}`);
		}
	});



	cmd.on(/^таймеры$/i, "test", 0, (message) => {
		bot.botflood += 1;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),
    ✅ Список таймеров ✅

    💰 » Для команды 'бонус' 
    🔹 » При балансе = 0 - всегда.

    🌴 » Майнинг-Ферма:
    🌴 » Имея ферму вы получаете Биткоины
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

  `, {attachment: timmers});
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
			return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), &#128020;`);
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

			return message.send(name + "\n&#8986; Точное время по МСК &#8986;\n &#10134; &#10134; &#10134;" + hours + ":" + minutes + ":" + seconds + "&#10134; &#10134; &#10134;");
		});
	});
	cmd.on(/^(?:ping)/i, 'пинг', 0, message => {
		bot.botflood += 1;
		tcpp.ping({
			address: 'vk.com'
		}, function(err, data) {
			message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),  Uptime (${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}) | &#9989; Ping: ${Math.round(data.avg)}ms`)
		}, 60000);
	}) 
	cmd.on(/^(?:clear)/i, 'clear', 1, message => { 
		if (chats[message.chat].game == 1) return message.send("🔥 » Игры отключены Администратором.");
		return message.send("&#4448;\n".repeat(100) + "Чат очищен!");
	});
	 
	cmd.on(/^(?:cid)/i, 'cid', 0, message => {
		bot.botflood += 1;
		if (!message.chat) return;
		let chat = chats[message.chat];
		if (message.chat != Number(message.chat)) return;
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), ✳ »  ID этого чата: ${message.chat}`);
	});    
	 
	cmd.on(/^(?:состав|беседа|чат|admins)/i, 'беседа -- параметры беседы', 0, message => {
		bot.botflood += 1;
		if (message.chat != Number(message.chat)) return;
		let devs, admins, moders, vips, chat;
		let devel = chats[message.chat].sozdal;
		let devels = ``;
		devs = 'Подписок "Легенда":\n';
		admins = 'Подписок "Все включено":\n'; 
		for (let id in acc.users) {
			let user = acc.users[id];

			if (user.level == 4) devs += `🔹 » @id${id}(${acc.users[id].prefix})\n`;
			if (user.level == 1) admins += `🔹 » @id${id}(${acc.users[id].prefix})\n`; 
		
		}
		let text = `\n`;
		if (devs.length != 22) text += devs;
		if (admins.length != 24) text += admins; 
		return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), \n${text}`);
	});
	///////
 
	//////////////////////////////////////////////////////////////////////
	cmd.on(/^овыдать?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 0, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['giveexs'] == false) return message.send(`✨ » Доступ к этой команде - запрещен.`);
		bot.botflood += 1; 
		if (acc.users[message.user].level > 0) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].exs += Number(message.args[5]);
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), Опыт был начислен пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.send("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				acc.users[message.args[3]].exs += Number(message.args[5]);
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), Опыт был начислен пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	cmd.on(/^оотнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['giveexs'] == false) return message.send(`✨ » Доступ к этой команде - запрещен.`);
		if(!Number(message.args[5])) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), Сумма должна быть целым числом.`); 
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].exs -= Number(message.args[5]);
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » Опыт был отнят пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.send("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				acc.users[message.args[3]].exs -= Number(message.args[5]);
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » Опыт был отнят пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	///////////////////////////////////////////////////////////////////////// 
	cmd.on(/^двыдать?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 0, (message, args) => { 
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['givedonate'] == false) return message.send(`✨ » Доступ к этой команде - запрещен.`); 
		if (acc.users[message.user].level > 0) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].donate += Number(message.args[5]);
					/////////////////////////////////////////////////////////////////
					if(!log.donat[res.object_id]){
						log.donat[res.object_id] = {
							log: ``
						}
						log.donat[res.object_id].log += `[${logtime()}|${logdata()}] Получил от: ${message.user} | ${message.args[5]} доната\n`
					}else{
						log.donat[res.object_id].log += `[${logtime()}|${logdata()}] Получил от: ${message.user} | ${message.args[5]} доната\n`
					}
					if(!log.donat[message.user]){
						log.donat[message.user] = {
							log: ``
						}
						log.donat[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | ${message.args[5]} доната\n`
					}else{
						log.donat[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | ${message.args[5]} доната\n`
					}
					/////////////////////////////////////////////////////////////////
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » ДОНАТ  был начислен пользователю vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].donate += Number(message.args[5]);
				/////////////////////////////////////////////////////////////////
					if(!log.donat[message.args[3]]){
						log.donat[message.args[3]] = {
							log: ``
						}
						log.donat[message.args[3]].log += `[${logtime()}|${logdata()}] Получил от: ${message.user} | ${message.args[5]} доната\n`
					}else{
						log.donat[message.args[3]].log += `[${logtime()}|${logdata()}] Получил от: ${message.user} | ${message.args[5]} доната\n`
					}
					if(!log.donat[message.user]){
						log.donat[message.user] = {
							log: ``
						}
						log.donat[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | ${message.args[5]} доната\n`
					}else{
						log.donat[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | ${message.args[5]} доната\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » ДОНАТ был начислен пользователю vk.com/id${message.args[3]}.`);
			}
		}
	});
	cmd.on(/^дотнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['givedonate'] == false) return message.send(`✨ »» Доступ к этой команде - запрещен.`); 
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ » Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ » Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].donate -= Number(message.args[5]);
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » ДОНАТ  был ОТНЯТ у пользователя vk.com/id${res.object_id}.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ » ID не указан, либо указан неверно. ");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].donate -= Number(message.args[5]);
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n✨ » ДОНАТ был ОТНЯТ у пользователя vk.com/id${message.args[3]}.`);
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^отнять?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?/i, "кик", 4, (message, args) => {
		if(!Number(message.args[5])) return message.send(`💰 » Сумма должна быть целым числом.`); 
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				acc.users[res.object_id].balance -= Number(message.args[5]);
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n💰 » Вы отняли ${message.args[5]}💰 у игрока.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			acc.users[message.args[3]].balance -= Number(message.args[5]);
			return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n💰 » Вы отняли ${message.args[5]}💰 у игрока.`);
		}
	});
	////////////////////////////////////////////

		cmd.on(/^info?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => { 
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors}); 
				let used = res.object_id;
				if(!commands[used]){
			commands[used] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false              
			}
		}
		}
		let text = ``;
		if(commands[used].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[used].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[used].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[used].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[used].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[used].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[used].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n`;
		if(commands[used].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n`;


		return message.send(`🔺 Информация о: ${acc.users[used].prefix} 🔺
			${text}
			`);	
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ'); 
				let used = message.args[3];
				if(!commands[used]){
			commands[used] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false             
			}
		}
		}
		let text = ``;
		if(commands[used].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[used].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[used].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[used].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[used].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[used].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[used].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n`;
		if(commands[used].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n`;


		return message.send(`🔺 Информация о: ${acc.users[used].prefix} 🔺 
			${text}
			`);	
		}
	});
		//////////////////////////
		cmd.on(/^ainfo?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => { 
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors}); 
				let used = res.object_id;
				if(!commands[used]){
			commands[used] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false              
			}
		}
		}
		let text = ``;
		if(commands[used].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[used].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[used].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[used].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[used].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[used].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[used].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n\n`;
		if(commands[used].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n\n`;

		if(commands[used].command['giverub'] == false) text += `🔺 giverub: запрещен.\n`;
		if(commands[used].command['giverub'] == true) text += `🔺 giverub: разрешен.\n`;
		if(commands[used].command['giverub'] == false) text += `🔺 removerub: запрещен.\n`;
		if(commands[used].command['giverub'] == true) text += `🔺 removerub: разрешен.\n`; 
		if(commands[used].command['giveexs'] == false) text += `🔺 овыдать: нету.\n`;
		if(commands[used].command['giveexs'] == true) text += `🔺 овыдать: есть.\n`;
		if(commands[used].command['tempban'] == false) text += `🔺 tempban: нету.\n`;
		if(commands[used].command['tempban'] == true) text += `🔺 tempban: есть.\n`;
		if(commands[used].command['ban'] == false) text += `🔺 ban: нету.\n`;
		if(commands[used].command['ban'] == true) text += `🔺 ban: есть.\n`;


		return message.send(`🔺 Информация о: ${acc.users[used].prefix} 🔺
			${text}
			`);	
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ'); 
				let used = message.args[3];
				if(!commands[used]){
			commands[used] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false             
			}
		}
		}
		let text = ``;
		if(commands[used].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[used].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[used].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[used].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[used].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[used].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[used].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n\n`;
		if(commands[used].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n\n`;

		if(commands[used].command['giverub'] == false) text += `🔺 giverub: запрещен.\n`;
		if(commands[used].command['giverub'] == true) text += `🔺 giverub: разрешен.\n`;
		if(commands[used].command['giverub'] == false) text += `🔺 removerub: запрещен.\n`;
		if(commands[used].command['giverub'] == true) text += `🔺 removerub: разрешен.\n`; 
		if(commands[used].command['giveexs'] == false) text += `🔺 овыдать: нету.\n`;
		if(commands[used].command['giveexs'] == true) text += `🔺 овыдать: есть.\n`;
		if(commands[used].command['tempban'] == false) text += `🔺 tempban: нету.\n`;
		if(commands[used].command['tempban'] == true) text += `🔺 tempban: есть.\n`;
		if(commands[used].command['ban'] == false) text += `🔺 ban: нету.\n`;
		if(commands[used].command['ban'] == true) text += `🔺 ban: есть.\n`;


		return message.send(`🔺 Информация о: ${acc.users[used].prefix} 🔺 
			${text}
			`);	
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^инфо$/i, "бан", 0, (message, args) => {
	if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false       
			}
		}
		}
		let text = ``;
		if(commands[message.user].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[message.user].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[message.user].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[message.user].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[message.user].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[message.user].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[message.user].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n`;
		if(commands[message.user].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n`;


		return message.send(`🔺 Информация о: ${acc.users[message.user].prefix} 🔺 
			${text}
			`);	
	});
		cmd.on(/^аинфо$/i, "бан", 2, (message, args) => {
	if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false       
			}
		}
		}
		let text = ``;
 
		if(commands[message.user].command['top'] == false) text += `🔺 Бан в топе: нету.\n`;
		if(commands[message.user].command['top'] == true) text += `🔺 Бан в топе: есть.\n`; 
		if(commands[message.user].command['pay'] == false) text += `🔺 Передача валюты: запрещена.\n`;
		if(commands[message.user].command['pay'] == true) text += `🔺 Передача валюты: разрешена.\n`; 
		if(commands[message.user].command['bankbiz'] == false) text += `🔺 Вклад/снятие с биз-а/банка: запрет.\n`;
		if(commands[message.user].command['bankbiz'] == true) text += `🔺 Вклад/снятие с биз-а/банка: разрешено.\n`;
		if(commands[message.user].command['reportban'] == false) text += `🔺 Бан репорта: нету.\n\n`;
		if(commands[message.user].command['reportban'] == true) text += `🔺 Бан репорта: есть.\n\n`;

		if(commands[message.user].command['giverub'] == false) text += `🔺 giverub: запрещен.\n`;
		if(commands[message.user].command['giverub'] == true) text += `🔺 giverub: разрешен.\n`;
		if(commands[message.user].command['giverub'] == false) text += `🔺 removerub: запрещен.\n`;
		if(commands[message.user].command['giverub'] == true) text += `🔺 removerub: разрешен.\n`;  
		if(commands[message.user].command['giveexs'] == false) text += `🔺 овыдать: нету.\n`;
		if(commands[message.user].command['giveexs'] == true) text += `🔺 овыдать: есть.\n`;
		if(commands[message.user].command['tempban'] == false) text += `🔺 tempban: нету.\n`;
		if(commands[message.user].command['tempban'] == true) text += `🔺 tempban: есть.\n`;
		if(commands[message.user].command['ban'] == false) text += `🔺 ban: нету.\n`;
		if(commands[message.user].command['ban'] == true) text += `🔺 ban: есть.\n`;

		return message.send(`🔺 Информация о: ${acc.users[message.user].prefix} 🔺 
			${text}
			`);	
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^givecmd?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([^]+)/i, "бан", 0, (message, args) => {
 
		if(!String(message.args[5])) return message.send(`😈 » Укажите корректно название команды.`); 
		let cmdss = message.args[5]; 
		if(message.user != 459607222) return; 
		var fil2 = /full$/i;
		if(fil2.test(message.args[5]) == true){
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ ➣ Это бот.');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Аккаунта нет в бд.`); 
					commands[res.object_id].command['giverub'] = true; 
					commands[res.object_id].command['pay'] = true;
					commands[res.object_id].command['addvip'] = true;
					commands[res.object_id].command['addmoder'] = true;
					commands[res.object_id].command['addmoder'] = true;
					commands[res.object_id].command['addadmin'] = true;
					commands[res.object_id].command['givedonate'] = true;
					commands[res.object_id].command['giveexs'] = true;
					commands[res.object_id].command['ban'] = true;
					commands[res.object_id].command['unban'] = true;
					commands[res.object_id].command['tempban'] = true;
					commands[res.object_id].command['removerub'] = true;
					commands[res.object_id].command['bankbiz'] = true;
					commands[res.object_id].command['top'] = false;

					/////////////////////////////////////////////////////////////////
					if(!log.cmd[res.object_id]){
						log.cmd[res.object_id] = {
							log: ``
						}
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | Full\n`
					}else{
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | Full\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${res.object_id} | Full\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${res.object_id} | Full\n`
					}
					/////////////////////////////////////////////////////////////////

					return message.send(`🎉 ➣  @id${res.object_id}(${acc.users[res.object_id].prefix}) получил доступ ко всем командам`);
					 })
				return;
			} else {
				if (!message.args[3]) return message.send("✨ ➣ ID не указан, либо указан неверно. ");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Аккаунта нет в бд.`);
				if (BOT_ID == message.args[3]) return message.send('Отказ');
					commands[message.args[3]].command['giverub'] = true; 
					commands[message.args[3]].command['pay'] = true;
					commands[message.args[3]].command['addvip'] = true;
					commands[message.args[3]].command['addmoder'] = true;
					commands[message.args[3]].command['addmoder'] = true;
					commands[message.args[3]].command['addadmin'] = true;
					commands[message.args[3]].command['givedonate'] = true;
					commands[message.args[3]].command['giveexs'] = true;
					commands[message.args[3]].command['ban'] = true;
					commands[message.args[3]].command['unban'] = true;
					commands[message.args[3]].command['tempban'] = true;
					commands[message.args[3]].command['removerub'] = true;
					commands[message.args[3]].command['bankbiz'] = true;
					commands[message.args[3]].command['top'] = true;

				/////////////////////////////////////////////////////////////////
					if(!log.cmd[message.args[3]]){
						log.cmd[message.args[3]] = {
							log: ``
						}
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | Full\n`
					}else{
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | Full\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${message.args[3]} | Full\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${message.args[3]} | Full\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣  @id${message.args[3]}(${acc.users[message.args[3]].prefix}) получил доступ ко всем командам`);
			} 
		}
		var fil = /(giverub$|ban$|addvip$|addmoder$|addadmin$|removerub$|pay$|bankbiz$|giveexs$|givedonate$|unban$|tempban$|top$|reportban$)/i
		if(fil.test(message.args[5]) == true){
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ ➣ Это бот.');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Аккаунта нет в бд.`); 
					commands[res.object_id].command[cmdss] = true; 

					/////////////////////////////////////////////////////////////////
					if(!log.cmd[res.object_id]){
						log.cmd[res.object_id] = {
							log: ``
						}
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | ${cmdss}\n`
					}else{
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | ${cmdss}\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${res.object_id} | ${cmdss}\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${res.object_id} | ${cmdss}\n`
					}
					/////////////////////////////////////////////////////////////////

					return message.send(`🎉 ➣  @id${res.object_id}(${acc.users[res.object_id].prefix}) получил доступ к команде: ${message.args[5]}`);
					 })
				return;
			} else {
				if (!message.args[3]) return message.send("✨ ➣ ID не указан, либо указан неверно. ");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Аккаунта нет в бд.`);
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				commands[message.args[3]].command[cmdss] = true;
				/////////////////////////////////////////////////////////////////
					if(!log.cmd[message.args[3]]){
						log.cmd[message.args[3]] = {
							log: ``
						}
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | ${cmdss}\n`
					}else{
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|givecmd] Получил от: ${message.user} | ${cmdss}\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${message.args[3]} | ${cmdss}\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|givecmd] Выдал: ${message.args[3]} | ${cmdss}\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣  @id${message.args[3]}(${acc.users[message.args[3]].prefix}) получил доступ к команде: ${message.args[5]}`);
			} 
			
		}  return message.send(`📢 ➣ Список команд:\n🔺 ➣ givecmd ID top\n🔺 ➣ givecmd ID ban\n🔺 ➣ givecmd ID removerub\n🔺 ➣ givecmd ID removeadm\n🔺 ➣ givecmd ID addvip\n🔺 ➣ givecmd ID addmoder\n🔺 ➣ givecmd ID addadmin\n🔺 ➣ givecmd ID unban\n🔺 ➣ givecmd ID pay\n🔺 ➣ givecmd ID bankbiz \n🔺 ➣ givecmd ID giveexs\n🔺 ➣ givecmd ID givedonate\n🔺 ➣ givecmd ID tempban`);

	});
	 
	cmd.on(/^removecmd?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([^]+)/i, "бан", 0, (message, args) => {
 
		if(!String(message.args[5])) return message.send(`😈 ➣ Укажите корректно название команды.`); 
		let cmdss = message.args[5]; 
		if(message.user != 459607222) return; 
		var fil = /(giverub$|ban$|addvip$|addmoder$|addadmin$|removerub$|pay$|bankbiz$|giveexs$|givedonate$|unban$|tempban$|top$|reportban)/i
		if(fil.test(message.args[5]) == true){
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ ➣ Это бот.');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Аккаунта нет в бд.`); 
					commands[res.object_id].command[cmdss] = false; 

					/////////////////////////////////////////////////////////////////
					if(!log.cmd[res.object_id]){
						log.cmd[res.object_id] = {
							log: ``
						}
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|removecmd] Забрал: ${message.user} | ${cmdss}\n`
					}else{
						log.cmd[res.object_id].log += `[${logtime()}|${logdata()}|removecmd] Забрал: ${message.user} | ${cmdss}\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|removecmd] Забрал у: ${res.object_id} | ${cmdss}\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|removecmd] Забрал у: ${res.object_id} | ${cmdss}\n`
					}
					/////////////////////////////////////////////////////////////////

					return message.send(`🎉 ➣  @id${res.object_id}(${acc.users[res.object_id].prefix}) лишился доступа к команде: ${message.args[5]}`);
					 })
				return;
			} else {
				if (!message.args[3]) return message.send("✨ ➣ ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Аккаунта нет в бд.`);
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				commands[message.args[3]].command[cmdss] = false;
				/////////////////////////////////////////////////////////////////
					if(!log.cmd[message.args[3]]){
						log.cmd[message.args[3]] = {
							log: ``
						}
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|removecmd] Забрал: ${message.user} | ${cmdss}\n`
					}else{
						log.cmd[message.args[3]].log += `[${logtime()}|${logdata()}|removecmd] Забрал: ${message.user} | ${cmdss}\n`
					}
					if(!log.cmd[message.user]){
						log.cmd[message.user] = {
							log: ``
						}
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|removecmd] Забрал у: ${message.args[3]} | ${cmdss}\n`
					}else{
						log.cmd[message.user].log += `[${logtime()}|${logdata()}|removecmd] Забрал у: ${message.args[3]} | ${cmdss}\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣  @id${message.args[3]}(${acc.users[message.args[3]].prefix}) лишился доступа к команде: ${message.args[5]}`);
			} 
			
		}  return message.send(`📢 ➣ Список команд:\n🔺 ➣ removecmd ID top\n🔺 ➣ removecmd ID ban\n🔺 ➣ removecmd ID removerub\n🔺 ➣ removecmd ID removeadm\n🔺 ➣ removecmd ID addvip\n🔺 ➣ removecmd ID addmoder\n🔺 ➣ removecmd ID addadmin\n🔺 ➣ removecmd ID unban\n🔺 ➣ removecmd ID pay\n🔺 ➣ removecmd ID bankbiz \n🔺 ➣ removecmd ID giveexs\n🔺 ➣ removecmd ID givedonate\n🔺 ➣ removecmd ID tempban`);

	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^removerub?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 0, (message, args) => {
		if (acc.users[message.user].level < 3) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['removerub'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				acc.users[res.object_id].balance = 0;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Игровая валюта была аннулирована.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("💰 ➣ ID не указан, либо указан неверно.");
			if (!acc.users[message.args[3]]) return message.send(`💰 ➣ Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('💰 ➣ Отказ');
			/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[3]]){
						log.point[message.args[3]] = {
							log: ``
						}
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|remove] Удалил он: ${message.user} | ${acc.users[message.args[3]].balance}р\n`
					}else{
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|remove] Удалил он: ${message.user} | ${acc.users[message.args[3]].balance}р\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|remove] Удалил ему: ${message.args[3]} | ${acc.users[message.args[3]].balance}р\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|remove] Удалил ему: ${message.args[3]} | ${acc.users[message.args[3]].balance}р\n`
					}
					/////////////////////////////////////////////////////////////////
			acc.users[message.args[3]].balance = 0;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Игровая валюта была аннулирована.`);
		}
	});
	cmd.on(/^giverub?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?(\s[0-9]+)/i, "кик", 4, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['giverub'] == false) return message.send(`✨ ➣  Доступ к этой команде - запрещен.`);
		let amount = Number(message.args[5]); 
		/*if (acc.users[message.user].level <= 2) {
			if (acc.users[message.user].giverub == true) return message.send(`✨ ➣ Выдавать валюту можно раз в 20 минут.`);
			if (amount > 150000) return message.send(`✨ ➣ Нельзя выдавать более 150.000💰 за раз в 20 минут.`);
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ ➣ Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].balance += Number(amount);
					acc.users[message.user].giverub = true;
					setTimeout(() => {
						acc.users[message.user].giverub = false;
					}, 120000)

					/////////////////////////////////////////////////////////////////
					if(!log.point[res.object_id]){
						log.point[res.object_id] = {
							log: ``
						}
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount} р\n`
					}else{
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount} р\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount} р\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount} р\n`
					}
					/////////////////////////////////////////////////////////////////

					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.send("✨ ➣ ID не указан, либо указан неверно. ");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				acc.users[message.user].giverub = true;
				setTimeout(() => {
					acc.users[message.user].giverub = false;
				}, 120000)
				/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[3]]){
						log.point[message.args[3]] = {
							log: ``
						}
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), валюта была начислена пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}
		if (acc.users[message.user].level == 3) {
			if (acc.users[message.user].giverub == true) return message.send(`✨ ➣ Выдавать валюту можно раз в 20 минут.`);
			if (amount > 300000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Нельзя выдавать более 300.000💰 за раз в 20 минут.`);
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.send('✨ ➣ Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].balance += Number(amount);
					acc.users[message.user].giverub = true;
					setTimeout(() => {
						acc.users[message.user].giverub = false;
					}, 120000)
					/////////////////////////////////////////////////////////////////
					if(!log.point[res.object_id]){
						log.point[res.object_id] = {
							log: ``
						}
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.send("✨ ➣ ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.send('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				acc.users[message.user].giverub = true;
				setTimeout(() => {
					acc.users[message.user].giverub = false;
				}, 120000)
				/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[3]]){
						log.point[message.args[3]] = {
							log: ``
						}
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 💰 ➣ были начислены пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}*/
		if (acc.users[message.user].level == 4) {
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('✨ ➣ Отказ');
					if (!acc.users[res.object_id]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].balance += Number(amount);
					/////////////////////////////////////////////////////////////////
					if(!log.point[res.object_id]){
						log.point[res.object_id] = {
							log: ``
						}
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[res.object_id].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${res.object_id} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Валюта была начислена пользователю @id${res.object_id}(${acc.users[res.object_id].prefix}).`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("✨ ➣ ID не указан, либо указан неверно.");
				if (!acc.users[message.args[3]]) return message.send(`✨ ➣ Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.reply('Отказ');
				acc.users[message.args[3]].balance += Number(amount);
				/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[3]]){
						log.point[message.args[3]] = {
							log: ``
						}
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[3]].log += `[${logtime()}|${logdata()}|give] Получил от: ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[[${logtime()}|${logdata()}|give] Выдал: ${message.args[3]} | ${amount}💰\n`
					}
					/////////////////////////////////////////////////////////////////
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ были начислены пользователю @id${message.args[3]}(${acc.users[message.args[3]].prefix}).`);
			}
		}
	});
	cmd.on(/^передать\s([0-9]+)\s?([^\s	].*)?/i, "передать", 0, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['pay'] == false) return message.send(`✨ ➣ Администратор заблокировал передачу валюты.`);
		let user = acc.users[message.user]; 
		let subject = acc.users[message.args[1]];
		let amount = parserInt(message.args[2]); 
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`);
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`);
		if(!subject || BOT_ID == message.args[1] || message.user == message.args[1]) 
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), ✨ ➣ Вы указали неверный ID.`);
		if(amount > user.balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nУ вас нет такой суммы.`);

		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Сумма передачи должна быть целым числом.`);  

		 if(user.level >= 3) {
			subject.balance += amount;
			user.balance -= amount;
			/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[1]]){
						log.point[message.args[1]] = {
							log: ``
						}
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему : ${message.args[1]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему: ${message.args[1]} | ${amount}💰\n`
					}
			/////////////////////////////////////////////////////////////////
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  ➣ Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		if (user.level == 1) {
			if(amount > 1000000) return message.send(`✨ ➣ Раз в 10 минут можно передавать валюту не более 1.000.000💰`);
			if(user.pay == true) return message.send(`✨ ➣ Передавать можно один раз в 10 минут.`);
			subject.balance += amount;
			user.balance -= amount;
			user.pay = true;
			setTimeout(function () {
				user.pay = false;
			}, 600000)
			/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[1]]){
						log.point[message.args[1]] = {
							log: ``
						}
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему : ${message.args[1]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему: ${message.args[1]} | ${amount}💰\n`
					}
			/////////////////////////////////////////////////////////////////
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}

		if (user.level == 2) {
			if(amount > 5000000) return message.send(`✨ ➣ Раз в 10 минут можно передавать валюту не более 5.000.000💰`);
			if(user.pay == true) return message.send(`✨ ➣ Передавать можно один раз в 10 минут.`);
			subject.balance += amount;
			user.balance -= amount;
			user.pay = true;
			setTimeout(function () {
				user.pay = false;
			}, 600000)
			/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[1]]){
						log.point[message.args[1]] = {
							log: ``
						}
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему : ${message.args[1]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему: ${message.args[1]} | ${amount}💰\n`
					}
			/////////////////////////////////////////////////////////////////
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		}
		if (user.level < 1) {
			if(amount > 100000) return message.send(`✨ ➣ Раз в 10 минут можно передавать валюту не более 100.000💰`);
			if(user.pay == true) return message.send(`✨ ➣ За 10 минут можно сделать одну передачу.`);
			subject.balance += amount;
			user.balance -= amount;
			user.pay = true;
			setTimeout(function () {
				user.pay = false;
			}, 600000)
			/////////////////////////////////////////////////////////////////
					if(!log.point[message.args[1]]){
						log.point[message.args[1]] = {
							log: ``
						}
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}else{
						log.point[message.args[1]].log += `[${logtime()}|${logdata()}|ПЕР] Получение от : ${message.user} | ${amount}💰\n`
					}
					if(!log.point[message.user]){
						log.point[message.user] = {
							log: ``
						}
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему : ${message.args[1]} | ${amount}💰\n`
					}else{
						log.point[message.user].log += `[${logtime()}|${logdata()}|ПЕР] Передача ему: ${message.args[1]} | ${amount}💰\n`
					}
			/////////////////////////////////////////////////////////////////
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы перевели ${spaces(amount)}💰 @id${message.args[1]}(${acc.users[message.args[1]].prefix}).`);
		} 
	});
	 
	cmd.on(/^addmoder?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['addmoder'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (acc.users[message.user].admin.upadm != 5) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.(Юзера нет в базе)`, {attachment: errors});
				acc.users[res.object_id].level = 2;
				acc.users[res.object_id].tag = "Подписка 'Опытный'";
				var used = res.object_id;
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = false;
					commands[used].command['unban'] = false;
					commands[used].command['tempban'] = true;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
				/////////////////////////////////////////////////////////////////
					if(!log.admin[res.object_id]){
						log.admin[res.object_id] = {
							log: ``
						}
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | MODER'ом\n`
					}else{
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | MODER'ом\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | MODER'а\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | MODER'а\n`
					}
					/////////////////////////////////////////////////////////////////

				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${res.object_id} получил подписку 'опытный'.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
			acc.users[message.args[3]].level = 2;
			acc.users[message.args[3]].tag = "Подписка 'Опытный'";
			var used = message.args[3];
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = false;
					commands[used].command['unban'] = false;
					commands[used].command['tempban'] = true;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
			/////////////////////////////////////////////////////////////////
					if(!log.admin[message.args[3]]){
						log.admin[message.args[3]] = {
							log: ``
						}
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | MODER'ом\n`
					}else{
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | MODER'ом\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | MODER'а\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | MODER'а\n`
					}
			/////////////////////////////////////////////////////////////////

			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${message.args[3]} получил подписка 'Опытный'.`);
		}
	});
	cmd.on(/^addadmin?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['addadmin'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (acc.users[message.user].admin.upadm != 5) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				acc.users[res.object_id].level = 3;
				acc.users[res.object_id].tag = "Подписка 'Профессионал'";
				var used = res.object_id;
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = true;
					commands[used].command['unban'] = true;
					commands[used].command['tempban'] = true;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
				/////////////////////////////////////////////////////////////////
					if(!log.admin[res.object_id]){
						log.admin[res.object_id] = {
							log: ``
						}
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | ADMIN'ом\n`
					}else{
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | ADMIN'ом\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | ADMIN'а\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${res.object_id} | ADMIN'а\n`
					}
					/////////////////////////////////////////////////////////////////

				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${res.object_id} получил подписку 'Профессионал'.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			acc.users[message.args[3]].level = 3;
			acc.users[message.args[3]].tag = "Подписка 'Профессионал'";

			var used = message.args[3];
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false                
							}
						}
					}
					commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = false;
					commands[used].command['addmoder'] = false; 
					commands[used].command['addadmin'] = false;
					commands[used].command['givedonate'] = false;
					commands[used].command['giveexs'] = false;
					commands[used].command['ban'] = true;
					commands[used].command['unban'] = true;
					commands[used].command['tempban'] = true;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
			/////////////////////////////////////////////////////////////////
					if(!log.admin[message.args[3]]){
						log.admin[message.args[3]] = {
							log: ``
						}
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | ADMIN'ом\n`
					}else{
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Назначил: ${message.user} | ADMIN'ом\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | ADMIN'а\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Выдал: ${message.args[3]} | ADMIN'а\n`
					}
					/////////////////////////////////////////////////////////////////


			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${message.args[3]} получил подписку 'Профессионал'.`);
		}
	});
	cmd.on(/^(?:\/|\+|\!)adddevel?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].admin.upadm == 5) { 
			if(message.user != 459607222) return;
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
					if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].level = 4;
					if(!commands[res.object_id]){
						commands[res.object_id] = {
							command: {
							giverub: false,
							pay: true,
							addvip: false,
							addmoder: false,
							addadmin: false,
							givedonate: false,
							giveexs: false,
							ban: false,
							unban: false,
							tempban: false,
							removerub: false,
							bankbiz: true ,
							reportban: false,
							top: false               
								}
							}
						}
					commands[res.object_id].command['giverub'] = true; 
					commands[res.object_id].command['pay'] = true;
					commands[res.object_id].command['addvip'] = true;
					commands[res.object_id].command['addmoder'] = true;
					commands[res.object_id].command['addmoder'] = true;
					commands[res.object_id].command['addadmin'] = true;
					commands[res.object_id].command['givedonate'] = true;
					commands[res.object_id].command['giveexs'] = true;
					commands[res.object_id].command['ban'] = true;
					commands[res.object_id].command['unban'] = true;
					commands[res.object_id].command['tempban'] = true;
					commands[res.object_id].command['removerub'] = true;
					commands[res.object_id].command['bankbiz'] = true;
					if(!timers.admin[res.object_id]){
						timers.admin[res.object_id] = {
							free: true,
							bost: true
						}
					}
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📢 ➣ Пользователь vk.com/id${res.object_id} получил подписку 'Легенда'.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
				if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
				acc.users[message.args[3]].level = 4;
				var used = message.args[3];
				if(!commands[used]){
					commands[used] = {
						command: {
						giverub: false,
						pay: true,
						addvip: false,
						addmoder: false,
						addadmin: false,
						givedonate: false,
						giveexs: false,
						ban: false,
						unban: false,
						tempban: false,
						removerub: false,
						bankbiz: true,
						reportban: false,
						top: false               
							}
						}
					}
					if(!timers.admin[used]){
						timers.admin[used] = {
							free: true,
							bost: true
						}
					}
				commands[used].command['giverub'] = true; 
					commands[used].command['pay'] = true;
					commands[used].command['addvip'] = true;
					commands[used].command['addmoder'] = true;
					commands[used].command['addmoder'] = true;
					commands[used].command['addadmin'] = true;
					commands[used].command['givedonate'] = true;
					commands[used].command['giveexs'] = true;
					commands[used].command['ban'] = true;
					commands[used].command['unban'] = true;
					commands[used].command['tempban'] = true;
					commands[used].command['removerub'] = true;
					commands[used].command['bankbiz'] = true;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📢 ➣ Пользователь vk.com/id${message.args[3]} получил подписку 'Легенда'.`);
			}
		}
	});

		cmd.on(/^(?:\/|\+|\!)addfull?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "кик", 0, (message, args) => {
			if(message.user != 459607222) return;
			if (message.args[4]) {
				var domain = message.args[4].split(" ");
				vk.api.call("utils.resolveScreenName", {
					screen_name: message.args[4]
				}).then((res) => {
					if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
					if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
					acc.users[res.object_id].admin.upadm = 5;
					acc.users[res.object_id].level = 4;
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📢 ➣ Пользователь vk.com/id${res.object_id} получил Фулл.Админа.`);
				})
				return;
			} else {
				if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
				if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
				acc.users[message.args[3]].admin.upadm = 5;
				acc.users[message.args[3]].level = 4;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📢 ➣ Пользователь vk.com/id${message.args[3]} получил Фулл.Админа.`);
			}
	});


	cmd.on(/^removeadm?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`, {attachment: errors});
					commands[res.object_id].command['giverub'] = false;  
					commands[res.object_id].command['addvip'] = false;
					commands[res.object_id].command['addmoder'] = false;
					commands[res.object_id].command['addmoder'] = false;
					commands[res.object_id].command['addadmin'] = false;
					commands[res.object_id].command['givedonate'] = false;
					commands[res.object_id].command['giveexs'] = false;
					commands[res.object_id].command['ban'] = false;
					commands[res.object_id].command['unban'] = false;
					commands[res.object_id].command['tempban'] = false;
					commands[res.object_id].command['removerub'] = false; 
				/////////////////////////////////////////////////////////////////
					if(!log.admin[res.object_id]){
						log.admin[res.object_id] = {
							log: ``
						}
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Снят: ${message.user} | admlvl: ${acc.users[res.object_id].level}\n`
					}else{
						log.admin[res.object_id].log += `[${logtime()}|${logdata()}] Снят: ${message.user} | admlvl: ${acc.users[res.object_id].level}\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Снял: ${res.object_id} | admlvl: ${acc.users[res.object_id].level}\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Снял: ${res.object_id} | admlvl: ${acc.users[res.object_id].level}\n`
					}
			/////////////////////////////////////////////////////////////////
				acc.users[res.object_id].level = 0;
				acc.users[res.object_id].admin.upadm = 0;
				delete timers.admin[res.object_id]
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${res.object_id} снят со всех должностей. .`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return message.reply('Отказ', {attachment: errors});
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`, {attachment: errors});
			/////////////////////////////////////////////////////////////////
			commands[message.args[3]].command['giverub'] = false;  
					commands[message.args[3]].command['addvip'] = false;
					commands[message.args[3]].command['addmoder'] = false;
					commands[message.args[3]].command['addmoder'] = false;
					commands[message.args[3]].command['addadmin'] = false;
					commands[message.args[3]].command['givedonate'] = false;
					commands[message.args[3]].command['giveexs'] = false;
					commands[message.args[3]].command['ban'] = false;
					commands[message.args[3]].command['unban'] = false;
					commands[message.args[3]].command['tempban'] = false;
					commands[message.args[3]].command['removerub'] = false; 

					if(!log.admin[message.args[3]]){
						log.admin[message.args[3]] = {
							log: ``
						}
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Снят: ${message.user} | admlvl: ${acc.users[message.args[3]].level}\n`
					}else{
						log.admin[message.args[3]].log += `[${logtime()}|${logdata()}] Снят: ${message.user} | admlvl: ${acc.users[message.args[3]].level}\n`
					}
					if(!log.admin[message.user]){
						log.admin[message.user] = {
							log: ``
						}
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Снял: ${message.args[3]} | admlvl: ${acc.users[message.args[3]].level}\n`
					}else{
						log.admin[message.user].log += `[${logtime()}|${logdata()}] Снял: ${message.args[3]} | admlvl: ${acc.users[message.args[3]].level}\n`
					}
			/////////////////////////////////////////////////////////////////
			acc.users[message.args[3]].level = 0;
			acc.users[message.args[3]].admin.upadm = 0;
			delete timers.admin[message.args[3]]
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПользователь vk.com/id${message.args[3]} снят со всех должностей.`);
		}
	});


	cmd.on(/^log?\s?([0-9]+)?$/i, "кик", 4, (message, args) => {
		if(message.user != 459607222) return;
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
		if(log.ban[id]){
		text += `~ Log ban ~\n ${log.ban[id].log}\n`
		}

		if(log.cmd[id]){
		text += `~ Log cmd ~\n ${log.cmd[id].log}\n`
		}

		message.send(text);
	});

	cmd.on(/^dellog?\s?([0-9]+)?\s?([0-9]+)?$/i, "кик", 4, (message, args) => {
		if (acc.users[message.user].admin.upadm != 5) return;
		if(!message.args[1]) return message.send(`
			1 - донат лог.
			2 - админ лог.
			3 - передачи лог.
			`);
		if(message.user != 459607222) return;
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
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), \n`+
			`🔎 ➣ ID: ${message.user}\n`+
			`💰 ➣  Ваш баланс: ${spaces(user.balance)} 💰\n` + 
			`🌐 ➣  Биткоинов: ${spaces(user.bitcoin)}\n` +
			`💳 ➣  На карте:  ${spaces(user.bank)} 💰\n` +
			(biz[message.user].id !== false ? `💲 ➣ На бизнесе: ${trueSpaces(biz[message.user].balance)} 💰\n` : "") +
			(job[message.user] ? `💴 ➣ Зарплата в час: ${trueSpaces(job[message.user].dohod)} 💰\n` : "") +
			(biz[message.user].id !== false ? `💵 ➣ Доход бизнеса за 2 часа: ${trueSpaces(biz[message.user].dohod)} 💰\n\n` : "\n\n") +
			`🔥 ➣  Опыт:  ${spaces(user.exs)}\n` +
			(clans[user.clanid] ? `💶 ➣ Счет клана: ${trueSpaces(clans[user.clanid].balance)} 💰\n`:"") +
			`💎 ➣  Донат: ${trueSpaces(acc.users[message.user].donate)}`
		);
	});


	cmd.on(/^(?:чек)\s?([0-9]+)?/i, 'balance', 4, message => {
		if (acc.users[message.user].admin.upadm != 5) return;
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
				text += `\n✏ ➣ Клан: ${clans[acc.users[id].clanid].name}`
			}
			if (onl == 7) {
				var onli = `&#128187;`
				message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
        Профиль
        Имя: ${acc.users[id].prefix} 
		ID: ${user.id}
        Баланс:  ${spaces(users.balance)} 💰 
        Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
        На карте: ${trueSpaces(acc.users[id].bank)}`+
		(biz[id].id !== false ? `💲 ➣ На бизнесе: ${trueSpaces(biz[id].balance)} 💰\n` : "") +
		`
        Донат: ${trueSpaces(acc.users[id].donate)}

        Имущество: 
        Машина ➣ ${car[id].carname} 
        Дом ➣ № ${acc.users[id].number}  
        Работа ➣ ${jobs}
        Бизнес ➣ ${biz[id].name}  
        Телефон ➣ ${phone[id].name}
        

        Разное:  
        Оружие: ${gun}
        Место в топе: ${trueSpaces(inTop)}${text}
        ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
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
		(biz[id].id !== false ? `💲 ➣ На бизнесе: ${trueSpaces(biz[id].balance)} 💰\n` : "") +
		`
        Донат: ${trueSpaces(acc.users[id].donate)}

        Имущество: 
        Машина ➣ ${car[id].carname} 
        Дом ➣ № ${acc.users[id].number}  
        Работа ➣ ${jobs}
        Бизнес ➣ ${biz[id].name}  
        Телефон ➣ ${phone[id].name}
        

        Разное:  
        Оружие: ${gun}
        Место в топе: ${trueSpaces(inTop)}${text}
        ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
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
		if(message.user == 485946192) brak = `\n💍 ➣ Женат на @id250974450(${acc.users[250974450].prefix})`;
		if(message.user == 250974450) brak = `\n💍 ➣ Замужем за @id250974450(${acc.users[485946192].prefix})`;


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
				text += `\n✏ ➣ Клан: ${clans[acc.users[message.user].clanid].name}`
			}
			if (onl == 7) {
				var onli = `&#128187;`
				message.send(` 
        &#10134; Ваш профиль
        &#127878; ➣ Ваш пол: ${user.sex == 2 ? `&#128102;` : `&#128590;`}
        &#128303; ➣ Имя: ${acc.users[message.user].prefix} ${brak}
		&#127380; ➣ ID: ${user.id}
        &#128226; ➣ Онлайн с ` + onli + ` 
        &#128176; ➣ Баланс:  ${spaces(users.balance)} 💰 
        🌐 ➣ Биткоинов: ${trueSpaces(acc.users[message.user].bitcoin)} 
        💎 ➣ Донат: ${trueSpaces(acc.users[message.user].donate)}

        🔑 Имущество: 
        🚘 ➣ Машина ➣ ${car[message.user].carname} 
        🏡 ➣ Дом ➣ № ${acc.users[message.user].number}  
        🛠 ➣ Работа ➣ ${jobs}
        🏢 ➣ Бизнес ➣ ${biz[message.user].name}  
        📱 ➣ Телефон ➣ ${phone[message.user].name}
        

        💡 Разное:  
        🔫 ➣ Оружие: ${gun}
        🌍 ➣ Место в топе: ${trueSpaces(inTop)}${text}
        &#128142; ➣ ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
        🔥 ➣ Ваш опыт [${users.exs}]`);
			} else {
				var onli = `&#128187;`
				message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
        &#10134; Ваш профиль; 
         ➣ Ваш пол: ${user.sex == 2 ? `&#128102;` : `&#128590;`}
        &#128303; ➣ Имя: ${acc.users[message.user].prefix} ${brak}
		&#127380; ➣ ID: ${user.id}
        &#128176; ➣ Баланс:  ${trueSpaces(users.balance)} 💰 
        🌐 ➣ Биткоинов: ${trueSpaces(acc.users[message.user].bitcoin)} 
        💎 ➣ Донат: ${trueSpaces(acc.users[message.user].donate)}

        🔑 Имущество: 
        🚘 ➣ Машина ➣  ${car[message.user].carname}   
        🏡 ➣ Дом ➣ № ${acc.users[message.user].number}  
        🛠 ➣ Работа ➣ ${jobs}
        🏢 ➣ Бизнес ➣ ${biz[message.user].name}  
        📱 ➣ Телефон ➣ ${phone[message.user].name} 

        💡 Разное: 
        🔫 ➣ Оружие: ${gun}
        🌍 ➣ Место в топе: ${inTop}${text}
        &#128142; ➣  ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
        🔥 ➣ Ваш опыт [${users.exs}] `);
			}
		})
	});
	cmd.on(/^проверить?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "проверить", 0, (message, args) => {
		bot.botflood += 1;
		let jobs = ``; 
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: errors});
				if (!acc.users[res.object_id]) return message.send(`Не верно указаны данные.`, {attachment: errors});
				let id = res.object_id;
				if(id == 459607222) return;
				if(id == 'undefined') return message.send(`Не верно указаны данные.`, {attachment: errors});

				if(iban[id]) return message.send(`⚠ ➣ Данный аккаунт заблокирован `);

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
						text += `\n🌍 ➣ Клан: ${clans[acc.users[id].clanid].name}`
					}
					if (onl == 7) {
						var onli = `&#128187;`
						message.send(`
				&#10134; Профиль
				 ➣ Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
				&#128303; ➣ Имя: ${acc.users[id].prefix}
				&#127380; ➣ ID: ${user.id}
				&#128226; ➣ Онлайн с ` + onli + ` 
				&#128176; ➣ Баланс:  ${spaces(users.balance)} 💰 
				🌐 ➣ Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
				💎 ➣ Донат: ${trueSpaces(acc.users[id].donate)}
		
				🔑 Имущество: 
				🚘 ➣ Машина ➣ ${car[id].carname} 
				🏡 ➣ Дом ➣ № ${acc.users[id].number} 
				🏢 ➣ Бизнес ➣ ${biz[id].name}  
				📱 ➣ Телефон ➣ ${phone[id].name}
		
				💡 Разное: 
				🔫 ➣ Оружие: ${gun}
				🌍 ➣ Место в топе: ${trueSpaces(inTop)}${text}
				&#128142; ➣ ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
				🔥 ➣ Опыт [${users.exs}]`);
					} else {
						var onli = `&#128187;`
						message.send(`
				&#10134; Профиль; 
				 ➣ Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
				&#128303; ➣ Имя: ${acc.users[id].prefix}
				&#127380; ➣ ID: ${user.id}
				&#128176; ➣ Баланс:  ${trueSpaces(users.balance)} 💰 
				🌐 ➣ Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
				💎 ➣ Донат: ${trueSpaces(acc.users[id].donate)}
		
				🔑 Имущество: 
				🚘 ➣ Машина ➣  ${car[id].carname}   
				🏡 ➣ Дом ➣ № ${acc.users[id].number}  
				🏢 ➣ Бизнес ➣ ${biz[id].name}  
				📱 ➣ Телефон ➣ ${phone[id].name} 
		
				💡 Разное: 
				🔫 ➣ Оружие: ${gun}
				🌍 ➣ Место в топе: ${inTop}${text}
				&#128142; ➣ ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
				🔥 ➣ Опыт [${users.exs}] `);
					}
				})
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: errors});
			if (!acc.users[message.args[3]]) return message.send(`Не верно указаны данные.`, {attachment: errors});
			if (BOT_ID == message.args[3]) return;
			let id = message.args[3];
			if(id == 459607222) return;
			if(id == 'undefined') return message.send(`Не верно указаны данные.`, {attachment: errors});
			if(iban[id]) return message.send(`⚠ ➣ Данный аккаунт заблокирован `);
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
					text += `\n🌍 ➣ Клан: ${clans[acc.users[id].clanid].name}`
				}
				if (onl == 7) {
					var onli = `&#128187;`
					message.send(`
			&#10134; Профиль
			 ➣ Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
			&#128303; ➣ Имя: ${acc.users[id].prefix}
			&#127380; ➣ ID: ${user.id}
			&#128226; ➣ Онлайн с ` + onli + ` 
			&#128176; ➣ Баланс:  ${spaces(users.balance)} 💰 
			🌐 ➣ Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
			💎 ➣ Донат: ${trueSpaces(acc.users[id].donate)}
	
			🔑 Имущество: 
			🚘 ➣ Машина ➣ ${car[id].carname} 
			🏡 ➣ Дом ➣ № ${acc.users[id].number}   
			🏢 ➣ Бизнес ➣ ${biz[id].name}  
			📱 ➣ Телефон ➣ ${phone[id].name}
	
			💡 Разное: 
			🔫 ➣ Оружие: ${gun}
			🌍 ➣ Место в топе: ${trueSpaces(inTop)}${text}
			&#128142; ➣ ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
			🔥 ➣ Опыт [${users.exs}]`);
				} else {
					var onli = `&#128187;`
					message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
			&#10134; Профиль; 
			 ➣ Ваш пол:  ${user.sex == 2 ? `&#128102;` : `&#128590;`}
			&#128303; ➣ Имя: ${acc.users[id].prefix}
			&#127380; ➣ ID: ${user.id}
			&#128176; ➣ Баланс:  ${trueSpaces(users.balance)} 💰 
			🌐 ➣ Биткоинов: ${trueSpaces(acc.users[id].bitcoin)} 
			💎 ➣ Донат: ${trueSpaces(acc.users[id].donate)}
	
			🔑 Имущество: 
			🚘 ➣ Машина ➣  ${car[id].carname}   
			🏡 ➣ Дом ➣ № ${acc.users[id].number}    
			🏢 ➣ Бизнес ➣ ${biz[id].name}  
			📱 ➣ Телефон ➣ ${phone[id].name} 
	
			💡 Разное: 
			🔫 ➣ Оружие: ${gun}
			🌍 ➣ Место в топе: ${inTop}${text}
			&#128142; ➣ ${users.level.toString().replace(/0/gi, "Подписка: отсутствует").replace(/1/gi, "Подписка: 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}
			🔥 ➣ Опыт [${users.exs}] `);
				}
			})
		}
	});
	// --------- prefix -----------
	cmd.on(/^(?:зови меня)\s?([^]+)?/i, 'ан', 0, message => {
		if(acc.users[message.user].level == 0){
		bot.botflood += 1;
		if (acc.users[message.user].balance < 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Смена ника стоит 1.000.000 💰.`);
		if (!message.args[1].match(/^[A-z]+|[А-я]+/i)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  В нике не должно быть: смайлов/символов/ссылок.`);

		//////////////////////////////////////////////////////////////////////////
		let zaprets1 = message.args[1].toLowerCase();
		var zapret = /(вк бо т |вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		var sss = zapret.test(zaprets1)
		if (zapret.test(zaprets1) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Придумайте адекватный ник`);
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
				message: `⛔ ➣ Вы банены в [bot.avrora| Бот Аврора]\n🐩 ➣ Чтобы получить разблокировку оплатите разбан:\n⏩ ➣  https://vk.cc/8cnhje \n\n⚠ ➣ Заблокированы: Системой.\n⚠ ➣ Время бана: 1 день.\n⚠ ➣ Причина: Ссылки/запрещенные ресурсы.`
			});
			setTimeout(() => {
				delete iban[message.user]
				vk.api.call('messages.send', {
					peer_id: message.user,
					message: `⛔ ➣ Вы были разблокированы.`
				});
			}, 86400000);
			return message.send(`🆘 ➣ В Нике обнаружена ссылка.\n⛔ ➣ Ваш аккаунт заблокирован на 1 день.`);
		} else {

			acc.users[message.user].balance -= 1000000;
			if(!nick[message.user]){
				nick[message.user] = {
					user: message.user,
					nick: `${message.args[1]}`
				}
				for(id in acc.users){

				if(acc.users[id].admin.level == 2){
					vk_group.api.call('messages.send', {
						user_id: id,
						message: `🆘 ➣ Новая заявка на смену ника  ->  ники`
					});
					}
				}

				return message.send(`👻 ➣ Заявка на смену ника отправлена администраторам.`);
			}else{
				return message.send(`👻 ➣ Вы уже отправили заявку на рассмотрение.\n Ожидайте смену ника.`);
			}
		}

	}else{
		bot.botflood += 1;
		if (!message.args[1].match(/^[A-z]+|[А-я]+/i)) return message.send(`🌚 ➣ В нике не должно быть: смайлов/символов/ссылок.`);

		//////////////////////////////////////////////////////////////////////////
		let zaprets1 = message.args[1].toLowerCase();
		var zapret = /(порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		var sss = zapret.test(zaprets1)
		if (zapret.test(zaprets1) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Придумайте адекватный ник`);
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
				message: `⛔ ➣ Вы банены в [bot.avrora| Бот Аврора] \n🐩 ➣ Чтобы получить разблокировку оплатите разбан:\n⏩ ➣  https://vk.cc/8cnhje \n\n⚠ ➣ Заблокированы: Системой.\n⚠ ➣ Время бана: 1 день.\n⚠ ➣ Причина: Ссылки/запрещенные ресурсы.`
			});
			setTimeout(() => {
				delete iban[message.user]
				vk.api.call('messages.send', {
					peer_id: message.user,
					message: `⛔ ➣ Вы были разблокированы.`
				});
			}, 86400000);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  В Нике обнаружена ссылка.\n⛔ ➣ Ваш аккаунт заблокирован на 1 день.`);
		} else {

				acc.users[message.user].prefix = message.args[1];
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Вы успешно сменили себе ник.`);
			
		}
	}
	});

	cmd.on(/^(?:ники)$/i, 'ан', 0, message => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		text = `👻 ➣ Заявки на смену ника:\n`;
		for(id in nick){
			text += `👻 ➣ ID: ${id} | Nick: @id${id}(${nick[id].nick})\n`;
		}
		text += `\n👉 ➣ Для одобрения ника: onnick ID\n👉 ➣ Для отклонения ника: offnick ID`;
		return message.send(text);
	});

	cmd.on(/^onnick\s?([0-9]+)?\s?([^]+)?/i, "бан", 0, (message, args) => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		let id = message.args[1];
		let text = message.args[2];
		if(!message.args[2]){
		if(!nick[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Этот человек не подавал заявку на смену ника`);
		acc.users[id].prefix = nick[id].nick;
		delete nick[id];
		return message.send(`Вы одобрили смену ника ID: ${id} | @id${id}(${acc.users[id].prefix})`);
		}else{
			if(acc.users[id].level == 4) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), А за такое и снять могут...`);
			if (!message.args[2].match(/^[A-z]+|[А-я]+/i)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  В нике не должно быть: смайлов/символов/ссылок.`);

		//////////////////////////////////////////////////////////////////////////
		let zaprets1 = message.args[2].toLowerCase();
		var zapret = /(порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		var sss = zapret.test(zaprets1)
		if (zapret.test(zaprets1) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Придумайте адекватный ник`);
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		let cc = message.args[2].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if (filter0.test(cc) == true || filter1.test(cc) == true) {
			var check = true;
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			return message.send(`🆘 ➣ В Нике обнаружена ссылка.`);
		} else {
			acc.users[id].prefix = message.args[2];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Вы сменили ник ID: ${id} | @id${id}(${acc.users[id].prefix})`);
			}
		}
	});

	cmd.on(/^offnick\s?([0-9]+)?\s?([0-9]+)?/i, "бан", 0, (message, args) => {
		if(acc.users[message.user].admin.level < 2) return;
		bot.botflood += 1;
		let id = message.args[1];
		let text = message.args[2];
		if(!nick[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Этот человек не подавал заявку на смену ника`);
		acc.users[id].donate += 100;
		delete nick[id];
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Вы отказали в смене ника ID: ${id} | @id${id}(${acc.users[id].prefix})`);
	});

	cmd.on(/^(?:Кто я)$/i, 'ан', 0, message => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ Вы - @id${message.user}(${acc.users[message.user].prefix})`);
	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*cmd.on(/^свадьба\s?([0-9]+)?/i, "свадьба", 0, (message, args) => {
		bot.botflood += 1;
		let id = message.args[1]; 
		if(!message.args[1]) return message.send(`💍 ➣ Введите ID человека.`); 
		if(brak.zayvka[message.user]) return message.send(`💍 ➣ Вы уже подали заявку на брак.`);
		if(brak.brak[message.user]) return message.send(`💍 ➣ Вы уже состоите в браке.`);
		brak.zayvka[message.user] = {
			owner: message.user,
			brak: id
		}
 		return message.send(`💍 ➣ ${message.user} | @id${message.user}(${acc.users[message.user].prefix})\n предложил пожениться: \nID ${id} | @id${id}(${acc.users[id].prefix})\n💍 ➣ Одобрить: "одобрить ID " `);
		 
	});
	cmd.on(/^одобрить\s?([0-9]+)?/i, "одобрить", 0, (message, args) => {
		bot.botflood += 1;
		let id = message.args[1]; 
		if(!message.args[1]) return message.send(`💍 ➣ Введите ID человека.`);  
		if(brak.brak[message.user]) return message.send(`💍 ➣ Вы уже состоите в браке.`);
		if(brak.zayvka[id].brak == message.user){
			brak.brak[id] = {
				owner: id,
				brak: message.user,
			}
			delete brak.zayvka[id];
		}
		return message.send(`💍 ➣ Вы успешно поженились.`);
	});
	cmd.on(/^развестись/i, "развестись", 0, (message, args) => {
		bot.botflood += 1;  
		if(brak.zayvka[message.user]) return message.send(`💍 ➣ Вы не состоите в браке.`);
		if(brak.brak[id].owner == message.user){
			delete brak.brak[id];
		}
		if(brak.brak[id].brak == message.user){
			delete brak.brak[id];
		}	 
		return message.send(`💍 ➣ Вы успешно развелись.`);
	});*/



////////////////////////////
	cmd.on(/^blocktop?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "бан", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false         
			}
		}
		}

		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
 
 
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ'); 
				var idforKick = res.object_id;
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ ➣ Администратор скрыл вас из топа.`
				});
				commands[res.object_id].command['top'] = true;
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был скрыт из топа.`);
 
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ ➣ ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ ➣ Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			var idforKick = message.args[3];
			if(idforKick == 459607222) return message.send(`📢 ➣ Error...`);
			vk_group.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ ➣ Администратор скрыл вас из топа.`
				});
			commands[message.args[3]].command['top'] = true;
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был скрыт из топа.`);
		}
 
	});
 
	cmd.on(/^untop?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "бан", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false         
			}
		}
		}

		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
 
 
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ'); 
				var idforKick = res.object_id;
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ ➣ Администратор вернул вас в топ.`
				});
				commands[res.object_id].command['top'] = false;
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был возвращен в топ.`);
 
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ ➣ ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ ➣ Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			var idforKick = message.args[3];
			if(idforKick == 459607222) return message.send(`📢 ➣ Error...`);
			vk_group.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ ➣ Администратор вернул вас в топ.`
				});
			commands[message.args[3]].command['top'] = false;
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был возвращен в топ.`);
		}
 
	});
	////////////////////////////////////////////////////////////////////////////////////              
	cmd.on(/^temprep?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?\s([^]+)/i, "бан", 2, (message, args) => {
		if (acc.users[message.user].level < 2) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false         
			}
		}
		}

		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (!message.args[5]) return message.send(`Укажите количество минут.`);
		if (message.args[5] > 2880) return message.send(`Время бана-репорта не должно привышать 2880 минут(2 дня).`);
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
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ ➣ Вы получили блокировку репорта.\n⚠ ➣ Вы теперь не можете писать в 'репорт'\n⚠ ➣ Выдал: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}\n\n✨ ➣ Возможно все ответы на вопросы вы найдете тут: https://vk.cc/8cnktk`
				});
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) получил блокировку репорта.\n⚠ ➣ Выдал: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}`);
			
				commands[res.object_id].command['reportban'] = true;


				setTimeout(() => { 
					commands[res.object_id].command['reportban'] = false;
					return vk_group.api.messages.send({
						peer_id: res.object_id,
						message: `⚠ ➣ Блокировка репорта снята.`
					});
				}, min)
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ ➣ ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ ➣ Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			var idforKick = message.args[3];
			if(idforKick == 459607222) return message.send(`📢 ➣ Error...`);
			vk_group.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ ➣ Вы получили блокировку репорта.\n⚠ ➣ Вы теперь не можете писать в 'репорт'\n⚠ ➣ Выдал: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}\n\n✨ ➣ Возможно все ответы на вопросы вы найдете тут: https://vk.cc/87dfic`
			});
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) получил блокировку репорта.\n⚠ ➣ Выдал: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}`); 
			commands[message.args[3]].command['reportban'] = true;
			setTimeout(() => {
				commands[message.args[3]].command['reportban'] = false;
				return vk_group.api.messages.send({
					peer_id: message.args[3],
					message: `⚠ ➣ Блокировка репорта снята.`
				});
			}, min)
		}

		function convertTime(time) {
			return (time / 60000) + " минут(у) "
		}
	});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	cmd.on(/^stempban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?\s([^]+)/i, "бан", 4, (message, args) => {
		bot.botflood += 1;

		if (acc.users[message.user].level < 4) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true    ,
				reportban: false,
				top: false            
			}
		}
		}
		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
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

				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был тихо забанен.\n ⚠ ➣ Причина: ${prichina}\n⚠ ➣ На ${times}`);
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: `${times} min`,
						vrem: true,
						prich: `${prichina}`
					}
				}
				setTimeout(() => {
					delete iban[res.object_id];
					return vk_group.api.messages.send({
						peer_id: res.object_id,
						message: `⚠ ➣ Ваш аккаунт разблокирован.`
					});
				}, min)
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ Отказ';
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			var idforKick = res.object_id;
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был тихо забанен.\n ⚠ ➣ Причина: ${prichina}\n⚠ ➣ На ${times}`);
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: `${times} min`,
					vrem: true,
					prich: `${prichina}`
				}
			}
			setTimeout(() => {
				delete iban[message.args[3]];
				return vk_group.api.messages.send({
					peer_id: message.args[3],
					message: `⚠ ➣ Ваш аккаунт разблокирован.`
				});
			}, min)
		}

		function convertTime(time) {
			return (time / 60000) + " минут(у) "
		}
	});
	cmd.on(/^iban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([^]+)/i, "бан", 4, (message, args) => {
		if (acc.users[message.user].level < 2) return;
		if (!message.args[5]) return message.send(`Укажите причину.`);  
		let prichina = message.args[5];
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true      ,
				reportban: false,
				top: false          
			}
		}
		}
		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`); 
				var idforKick = res.object_id;
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ ➣ Ваш аккаунт заблокирован.\n⚠ ➣ Причина: ${prichina}\n(Разбан можно купить тут: hhttps://vk.cc/8cnhje)`
				});
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был забанен.\n ⚠ ➣ Причина: ${prichina}`); 
				if (!iban[res.object_id]) {
					 iban[res.object_id] = {
						time: "Year"
					}
				}
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ ➣ ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ ➣ Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			var idforKick = message.args[3];
			vk_group.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ ➣ Ваш аккаунт заблокирован.\n⚠ ➣ Причина: ${prichina}\n(Разбан можно купить тут: https://vk.cc/8cnhje)`
			});
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был забанен.\n ⚠ ➣ Причина: ${prichina}`);
			if (!iban[message.args[3]]) {
					iban[message.args[3]] = {
						time: "Year"
					}
				}
		 
		}
	});
	////////////////////////////////////////////////////////////////////////////////////              
	cmd.on(/^tempban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?\s([0-9]+)?\s([^]+)/i, "бан", 2, (message, args) => {
		if (acc.users[message.user].level < 2) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true       ,
				reportban: false,
				top: false         
			}
		}
		}
		if (commands[message.user].command['tempban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
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
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				vk_group.api.messages.send({
					peer_id: res.object_id,
					message: `⚠ ➣ Ваш аккаунт заблокирован.\n⚠ ➣ Забанил: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ Время бана: ${timeban}\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}\n(Разбан можно купить тут: https://vk.cc/8cnhje)`
				});
				message.send(`⚠ ➣ Пользователь @id${res.object_id}(${acc.users[res.object_id].prefix}) был забанен.\n ⚠ ➣ Причина: ${prichina}\n⚠ ➣ Время бана: ${timeban}\n⚠ ➣ На ${times}`);
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: `${times} min`,
						vrem: true,
						prich: `${prichina}`
					}
				}
				setTimeout(() => {
					delete iban[res.object_id];
					return vk_group.api.messages.send({
						peer_id: res.object_id,
						message: `⚠ ➣ Ваш аккаунт разблокирован.`
					});
				}, min)
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("⚠ ➣ ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return text += '⚠ ➣ Отказ';
			if (acc.users[message.args[3]].level > 3) return message.reply('Отказ');
			var idforKick = message.args[3];
			if(idforKick == 459607222) return message.send(`📢 ➣ Error...`);
			vk_group.api.messages.send({
				peer_id: message.args[3],
				message: `⚠ ➣ Ваш аккаунт заблокирован.\n⚠ ➣ Забанил: Admin | @id${message.user}(${acc.users[message.user].prefix}).\n⚠ ➣ Время бана: ${timeban}\n⚠ ➣ На ${times}\n ⚠ ➣ Причина: ${prichina}\n(Разбан можно купить тут: https://vk.cc/8cnhje)`
			});
			message.send(`⚠ ➣ Пользователь @id${message.args[3]}(${acc.users[message.args[3]].prefix}) был забанен.\n ⚠ ➣ Причина: ${prichina}\n⚠ ➣ Время бана: ${timeban}\n⚠ ➣ На ${times}`);
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: `${times} min`,
					vrem: true,
					prich: `${prichina}`
				}
			}
			setTimeout(() => {
				delete iban[message.args[3]];
				return vk_group.api.messages.send({
					peer_id: message.args[3],
					message: `⚠  ➣ Ваш аккаунт разблокирован.`
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
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
    Информация о карте:
    💳 ➣ Вы можете положить 💰 на карту 
    💳 ➣ Также, вы можете снять 💰. 
    💳 ➣ Каждые 10 минут процент коммисии меняется 
    💳 ➣ Процент ставки меняется от 1 до 10 %. 

    Команды:
    💳 ➣ Счет - баланс и процент на данный момент на карте. 
    💳 ➣ Карта - Создать карту. (можно только 1 раз) 
    💳 ➣ Снять <сумма> - снять 💰 с карты. 
    💳 ➣ Положить <сумма> - положить 💰 на карту. 

    💎 Для подписки 'Все включено':
    💰 ➣ Кредит сумма - можно взять кредит до 1.000.000 💰. 
    💰 ➣ Погасить сумма - погасить кредит. 
    💳 ➣ Долг - покажет вашу задолженность в банке.
    `, {attachment: cardss});
	});
	cmd.on(/^(?:карта)/i, 'balance', 0, message => {
		bot.botflood += 1;
		if (acc.users[message.user].carta == true) return message.send(`💴 ➣ У вас уже создана карта.`, {attachment: cardss});
		acc.users[message.user].carta = true;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно создали карту.\n💴 ➣ Снять 💰 можно командой: снять`, {attachment: cardss});
	});
	cmd.on(/^(?:положить)\s?([^\s	].*)?/i, 'balance', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите сумму.`, {attachment: cardss});
		let amount = parserInt(message.args[1]); 
		if (amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Сумма не должна быть ниже 0.`, {attachment: cardss});
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if (amount > acc.users[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), На вашем счету не достаточно средств!`, {attachment: cardss});
		acc.users[message.user].balance -= Number(amount);
		acc.users[message.user].bank += Number(amount);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно положили на карту: ${spaces(amount)}💰.`, {attachment: cardss});
	});
	cmd.on(/^(?:счет)$/i, 'balance', 0, message => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Баланс на карте ${trueSpaces(acc.users[message.user].bank)}💰.\n\nПроцент ставки для обмена 💰:\n ${chats.znach} ${chats.stavka} %`, {attachment: cardss});
	});
	cmd.on(/^(?:снять)\s?([^\s	].*)?/i, 'balance', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Введите сумму.`, {attachment: cardss});
		let amount = parserInt(message.args[1]);
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});   
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if (!amount) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите сумму.`, {attachment: cardss});
		if (amount > acc.users[message.user].bank) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ На вашем счету не достаточно средств!`, {attachment: cardss});
		let stavkaa = chats.stavka;
		let summa = Number(amount);
		proc = Number(summa) / 100 * Number(stavkaa);
		let vivod = Number(summa) - Number(proc);
		acc.users[message.user].bank -= summa;
		acc.users[message.user].balance += Math.round(vivod);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно сняли ${trueSpaces(Math.round(vivod))}💰(с учетом ставки банка.)`, {attachment: cardss});
	});
	cmd.on(/^(?:dolg|долг)$/i, 'balance', 1, message => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  Команда доступна от: Подписки 'Все включено'.\n🔯 Купите подписку в: донат`, {attachment: cardss});
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Ваша задолженность ${trueSpaces(acc.users[message.user].credit)}💰.`, {attachment: cardss});
	});
	cmd.on(/^(?:кредит)\s?([^\s	].*)?/i, 'balance', 1, message => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Команда доступна от: Подписки 'Все включено'.\n🔯 Купите подписку в: донат`, {attachment: cardss});
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите сумму.`, {attachment: cardss});
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if (!amount) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Введите сумму.`, {attachment: cardss});
		if(amount < 100000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Минимальная сумма для взятия кредита - 100.000💰`, {attachment: cardss});
		if (acc.users[message.user].credit >= 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Взять кредит можно не более чем на 1.000.000💰.💰\n Чтобы взять кредит, нужно погасить задолженность.`, {attachment: cardss});
		if (amount > 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Максимальная сумма кредита 1.000.000💰.`, {attachment: cardss});
		if (1000000 - acc.users[message.user].credit < amount) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Максимальная сумма кредита 1.000.000💰.`, {attachment: cardss});
		if (amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Сумма не должна быть ниже 0.`, {attachment: cardss});
		let dolg = Number(amount);
		let dolg1 = dolg / 100 * 10;
		let dolg2 = dolg1 + dolg;
		acc.users[message.user].credit += Number(dolg2);
		acc.users[message.user].balance += Number(dolg);
		message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно взяли кредит в банке на ${spaces(amount)}💰.\n💰 ➣ Процент банка 10%.\n💰 ➣ Сумма для погашения в банке: ${spaces(acc.users[message.user].credit)}💰`, {attachment: cardss});
	});
	cmd.on(/^(?:погасить)\s?([^\s	].*)?/i, 'balance', 1, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите сумму.`, {attachment: cardss});
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cardss});
		if (acc.users[message.user].level < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Команда доступна от: Подписки 'Все включено'.\n🔯 ➣ Купите подписку в: донат`, {attachment: cardss});
		if(amount < 100000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Минимальная сумма для погашения - 100.000💰`, {attachment: cardss}); 
		let pogas = Number(amount);
		if (pogas > acc.users[message.user].credit) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите точную сумму погашения платежа.`, {attachment: cardss});
		if (pogas < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Введите точную сумму погашения платежа.`, {attachment: cardss});
		if (pogas > acc.users[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), У вас нет столько 💰 `, {attachment: cardss});
		acc.users[message.user].credit -= Math.round(pogas);
		acc.users[message.user].balance -= Math.round(pogas);
		message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно перевели средства на погашение долга в банке!\n💰 ➣ Сумма для погашения в банке: ${Math.round(acc.users[message.user].credit)}💰`, {attachment: cardss});
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
				message.send(`&#128303; Имя: ${user.last_name} ${user.first_name}\n&#127380; ➣  Обычная ссылка: vk.com/${user.domain}\n &#128142; ➣  ${users.level.toString().replace(/0/gi, "Подписка отсутствует").replace(/1/gi, "Подписка 'Все включено'").replace(/2/gi, "Подписка 'Опытный'").replace(/3/gi, "Подписка 'Профессионал'").replace(/4/gi, "Подписка 'Легенда'")}\n👫 ➣  Подписчики: ${user.followers_count}\n👫 ➣  Ваши друзья: ${re.count}`);
			})
		})
	});
	//- - -- - 
	cmd.on(/^(?:агенты)/i, 'agents', 0, message => {
		bot.botflood += 1;
		let text = '⚠ Агент, отвечают на ваши вопросы ( репорт [вопрос] )! \n';
		let users = acc.users;
		for (let id in users) {
			if (users[id].admin.level > 0) text += `   ⚠ ➣ @id${id}(${users[id].prefix})\n`;
		}
		return message.send(text);
	});
 
	///////////////////////////////////////////////////////////// 
	cmd.on(/^deluser?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "кик", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return;
				let id = res.object_id;
				if(id == 459607222) return message.send(`📢 ➣ Error...`);
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
			if(id == 459607222) return message.send(`📢 ➣ Error...`);
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
				return message.send(`⚠ ➣ Вы назначили vk.com/id${res.object_id} агентом поддержки!`);
			})
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			let id = message.args[3];
			acc.users[id].admin.level = 2;
			return message.send(`⚠ ➣ Вы назначили vk.com/id${message.args[3]} агентом поддержки!`);
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
				return message.send(`⚠ ➣ Вы сняли с поста агента vk.com/id${res.object_id} агентом поддержки!`);
			})
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			let id = message.args[3];
			acc.users[id].admin.level = 0;
			return message.send(`⚠ ➣ Вы сняли с поста агента vk.com/id${message.args[3]}`);
			return;
		}
	});
	// - - - - -- - - - - - -- - - - - - -- - - - - - - - - - -- - - - - - - - - - ---- -- - - 

	///////////////////////////////////////
	cmd.on(/^(?:all)\s?([^]+)?$/i, 'все', 4, message => {
		if(!message.chat) return;
		if(!message.args[1]) return message.send(`Укажите текст для рассылки!`);
		if (acc.users[message.user].level < 4) return;
		let people = 0;
		for (let id in acc.users) {
			vk_group.api.call('messages.send', {
				user_id: id,
				message: `${message.args[1]}`
			});
			people += 1;
		}
		return message.reply(`Выполнено!\nОтправлено: ${people} людям.`);
	}) 

	cmd.on(/^(?:репорт|репорт|report|rep|реп)\s([^]+)?/i, 'ко', 0, message => {
		if(commands[message.user].command['reportban'] == true) return message.send(`🔺 ➣ Администратор запретил Вам обращаться в репорт.\n\n✨ ➣ Возможно все ответы на вопросы вы найдете тут: https://vk.cc/87dfic`);
		bot.botflood += 1;
		if (!message.chat) {
			for(id in acc.users){
				if(acc.users[id].admin.level == 2){
					vk_group.api.call('messages.send', {
						user_id: id,
						message: `🆘 ➣ Report ++  ->  лист`
					});
				}
			}
			 
			message.send("🆘 ➣ Ваш репорт отправлен администрации.\n🐩 ➣ Ожидайте ответа.\n\n✨ ➣ Возможно все ответы на вопросы вы найдете тут: https://vk.cc/87dfic");
			rep.number += 1
			rep.reports[rep.number] = {
				user: message.user, 
				report: message.args[1]
			}
			return;
		}
		return message.send(`Обращаться в репорт можно через группу: [bot.avrora| Бот Аврора] .`);
	})
	cmd.on(/^лист$/i, 'reports', 0, message => {
		bot.botflood += 1;
		if (!acc.users[message.user]) return;
		if (acc.users[message.user].admin.level < 1) return;
		let text = ``;
		for (let id in rep.reports) {
			text += `
        	REPORT ID - ${id}
        	ID: ${rep.reports[id].user} | @id${rep.reports[id].user}(${acc.users[rep.reports[id].user].prefix})
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
		if (!rep.reports[message.args[1]]) return message.send(`➖ ➣ Вы не можете ответить по причинам:\n➖Данного report id нету\n➖Репортов из указанного чата не было\n➖Проверьте данные в:  лист`, {attachment: errors});
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
 	return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
 		💎 ➣ Правила Агентов 💎

 		🔺 ➣ 1. Запрещено:
 		1.1.➣ Выпрашивать валюту/повышение.
 		1.2.➣ Хамить любому игроку.
 		1.3.➣ Разжигать конфликты.
 		1.4.➣ Флудить в ЛС разработчикам.
 		1.5.➣ Писать не по теме в админ-беседе.
 		1.6.➣ Хамить в ответах на репорт.
 		1.7.➣ Банить без причины.
 		1.8.➣ Выдавать себя за администратора выше уровнем. 
 		1.9.➣ Играться в админ-беседе.
 		1.10.➣ Использование агент-команд за пределами админ-беседы.
 		1.11.➣ Сливать админ-инфу.
 		Наказание: бан. 

 		🔺 ➣ 2. Разрешено: 
 		2.1.➣ Отвечать на репорты(в лс группы).
 		2.2.➣ Одобрять/отклонять заявки на смену ника.
 		2.3.➣ Помогать советом игрокам.
 		2.4.➣ Играть в официальных беседах.
 		2.5.➣ Банить по причине. (Имея доказательства)
 		2.6.➣ Выдавать валюту раз в час.
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
    	💎 ➣ Статистика Агента Поддержки -
 		✏ ➣ Имя: ${user.first_name} ${user.last_name}.  
 		✉ ➣ Ответов: ${acc.users[id].admin.ans}.
 		⚠ ➣ Выговоров: ${acc.users[id].admin.vig}.
		🐩 ➣ Уровень агента: ${acc.users[id].admin.level}. 

		🔸 Команды Тех.Поддержки.
        🔸 ban ID | Забанить юзера.
        🔸 unban ID | Разбанить юзера.

        🔸 Отнять id сумма | Отнять Рубли 
        🔸 овыдать ID сумма | выдать опыт
        🔸 оотнять ID сумма | отнять опыт

        🔸 stempban ID <время> <причина> - тихий бан.
        🔸 delrep ID(report_id) - удалить репорт.
        🔸 tempban ID <время> <причина> - бан.
        🔸 Время в минутах!!
        🔸 Пример: tempban vladorr 2 Нарушение правил.


        📝 ➣ Команды:
		ᅠ👻 ➣ Лист - список репортов.
	 	ᅠ👻 ➣ агент - информация о вас.
	 	ᅠ👻 ➣ Ответ ID(report_id) ID(юзера) <ответ> 

	 	ᅠ👻 ➣ vig ID(сслыка) - дать выговор
	 	ᅠ👻 ➣ unvig ID(ссылка) - снять выговор
	 	ᅠ👻 ➣ checkinfo ID(ссылка) - проверить агента.

	 	 🔸 addagent ID | Выдать агент-права.
         🔸 removeagent ID | Снять агента.

        🔥 ➣ ники - список заявок на смену ника.
        🔥 ➣ onnick ID - одобрить заявку на смену ника.
        🔥 ➣ offnick ID - отклонить заявку на смену ника.	


    	`);
}


    if(acc.users[id].admin.level == 2){  
    return message.send(`
    	💎 ➣ Статистика Агента Поддержки -
 		✏ ➣ Имя: ${user.first_name} ${user.last_name}.  
 		✉ ➣ Ответов: ${acc.users[id].admin.ans}.
 		⚠ ➣ Выговоров: ${acc.users[id].admin.vig}.
		🐩 ➣ Уровень агента: ${acc.users[id].admin.level}. 

		📝 ➣ Команды:
		 💎 ➣ аправила - к прочтению!!!

		ᅠ👻 ➣ Лист - список репортов.
	 	ᅠ👻 ➣ агент - информация о вас.
	 	ᅠ👻 ➣ Ответ ID(report_id) ID(юзера) <ответ> 
	 	 🔥 ➣ ники - список заявок на смену ника.
         🔥 ➣ onnick ID - одобрить заявку на смену ника.
         🔥 ➣ offnick ID - отклонить заявку на смену ника.

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
					    	💎 ➣ Статистика Агента Поддержки -
					 		✏ ➣ Имя: ${user.first_name} ${user.last_name}.  
					 		✉ ➣ Ответов: ${acc.users[id].admin.ans}.
					 		⚠ ➣ Выговоров: ${acc.users[id].admin.vig}.
							🐩 ➣ Уровень агента: ${acc.users[id].admin.level}.
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
				    	💎 ➣ Статистика Агента Поддержки -
				 		✏ ➣ Имя: ${user.first_name} ${user.last_name}.  
				 		✉ ➣ Ответов: ${acc.users[id].admin.ans}.
				 		⚠ ➣ Выговоров: ${acc.users[id].admin.vig}.
						🐩 ➣ Уровень агента: ${acc.users[id].admin.level}.
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
				 	 return message.send(`⚠ ➣ Админ-выговоры были успешно сняты.`);
        })
        
    }else{
        if(!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
        if(BOT_ID == message.args[3]) return message.reply('Отказ');  
        		let id = message.args[3];
			 	    acc.users[id].admin.vig = 0;
			 	    return message.send(`⚠ ➣ Админ-выговоры были успешно сняты.`);
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
									return message.send(`⚠ ➣ Юзер получил 3 выговор.\n⚠| Он был снят с должности.`);
								}

								return message.send(`⚠ ➣ Админ-выговор был выдан.`);}
					
				 	  
        })
        
    }else{
        if(!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
        if(BOT_ID == message.args[3]) return message.reply('Отказ');  
        		let id = message.args[3];
			 	     if(acc.users[id].admin.level > 0){
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


	cmd.on(/^ban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "iban", 1, (message, args) => {
		bot.botflood += 1;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['ban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);

		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
			    if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`); 
				if (!iban[res.object_id]) {
					iban[res.object_id] = {
						time: "Year"
					}
				}
				 
				vk_group.api.call('messages.send', {
					peer_id: res.object_id,
					message: `⛔ ➣ Вы забанены в [bot.avrora| Бот Аврора] \n👤 ➣ Админ-ом: @id${message.user}(${acc.users[message.user].prefix})\n🐩 ➣ Чтобы получить разблокировку оплатите разбан:\n⏩ ➣  https://vk.cc/8cnhje`
				});
				message.send(`Пользователь заблокирован навсегда.`)
				/////////////////////////////////////////////////
				if(!log.ban[res.object_id]){
						log.ban[res.object_id] = {
							log: ``
						}
						log.ban[res.object_id].log += `[${logtime()}|${logdata()}|ban] Забанил он: ${message.user} навсегда\n`
					}else{
						log.ban[res.object_id].log += `[${logtime()}|${logdata()}|ban] Забанил он: ${message.user} навсегда\n`
					}
					if(!log.ban[message.user]){
						log.ban[message.user] = {
							log: ``
						}
						log.ban[message.user].log += `[${logtime()}|${logdata()}|ban] Его забанили: ${res.object_id} навсегда\n`
					}else{
						log.ban[message.user].log += `[${logtime()}|${logdata()}|ban] Его забанили: ${res.object_id} навсегда\n`
					}
			/////////////////////////////////////////////////
				return;
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			if (BOT_ID == message.args[3]) return; 
			if (!iban[message.args[3]]) {
				iban[message.args[3]] = {
					time: "Year"
				}
			}
			 
			vk_group.api.call('messages.send', {
				peer_id: message.args[3],
				message: `⛔ ➣ Вы забанены в [bot.avrora| Бот Аврора] \n👤 ➣ Админ-ом: @id${message.user}(${acc.users[message.user].prefix})\n🐩 ➣ Чтобы получить разблокировку оплатите разбан:\n⏩ ➣  https://vk.cc/8cnhje`
			});
			 message.send(`Пользователь заблокирован навсегда.`)
			/////////////////////////////////////////////////
				if(!log.ban[message.args[3]]){
						log.ban[message.args[3]] = {
							log: ``
						}
						log.ban[message.args[3]].log += `[${logtime()}|${logdata()}|ban] Забанил он: ${message.user} навсегда\n`
					}else{
						log.ban[message.args[3]].log += `[${logtime()}|${logdata()}|ban] Забанил он: ${message.user} навсегда\n`
					}
					if(!log.ban[message.user]){
						log.ban[message.user] = {
							log: ``
						}
						log.ban[message.user].log += `[${logtime()}|${logdata()}|ban] Его забанили: ${message.args[3]} навсегда\n`
					}else{
						log.ban[message.user].log += `[${logtime()}|${logdata()}|ban] Его забанили: ${message.args[3]} навсегда\n`
					}
			/////////////////////////////////////////////////
			return;
		}
	});


	cmd.on(/^unban?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "unban", 3, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['unban'] == false) return message.send(`✨ ➣ Доступ к этой команде - запрещен.`);
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {  
				if (iban[res.object_id]) {
					delete iban[res.object_id]
				}
				if(blist[res.object_id]){
							delete blist[res.object_id] 
				}
			/////////////////////////////////////////////////
				if(!log.ban[res.object_id]){
						log.ban[res.object_id] = {
							log: ``
						}
						log.ban[res.object_id].log += `[${logtime()}|${logdata()}|unban] Разблокировал он: ${message.user}\n`
					}else{
						log.ban[res.object_id].log += `[${logtime()}|${logdata()}|unban] Разблокировал он: ${message.user}\n`
					}
					if(!log.ban[message.user]){
						log.ban[message.user] = {
							log: ``
						}
						log.ban[message.user].log += `[${logtime()}|${logdata()}|unban] Его разбанили: ${res.object_id}\n`
					}else{
						log.ban[message.user].log += `[${logtime()}|${logdata()}|unban] Его разбанили: ${res.object_id}\n`
					}
			/////////////////////////////////////////////////
				return message.send(`Пользователь разблокирован.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return;
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			if (iban[message.args[3]]) {
				delete iban[message.args[3]]
			}
			if(blist[message.args[3]]){
				delete blist[message.args[3]] 
			}
			/////////////////////////////////////////////////
				if(!log.ban[message.args[3]]){
						log.ban[message.args[3]] = {
							log: ``
						}
						log.ban[message.args[3]].log += `[${logtime()}|${logdata()}|unban] Разблокировал он: ${message.user}\n`
					}else{
						log.ban[message.args[3]].log += `[${logtime()}|${logdata()}|unban] Разблокировал он: ${message.user}\n`
					}
					if(!log.ban[message.user]){
						log.ban[message.user] = {
							log: ``
						}
						log.ban[message.user].log += `[${logtime()}|${logdata()}|unban] Его разбанили: ${message.args[3]}\n`
					}else{
						log.ban[message.user].log += `[${logtime()}|${logdata()}|unban] Его разбанили: ${message.args[3]}\n`
					}
			/////////////////////////////////////////////////
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



	cmd.on(/^блок?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "unban", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				if(blist[res.object_id]) return message.send(`Этот юзер уже в ЧС.`);
						if(!blist[res.object_id]){
							blist[res.object_id] = {
								block: true
							}
						}
			 
			return message.send(`Пользователь добавлен в ЧС.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return;
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			if(blist[message.args[3]]) return message.send(`Этот юзер уже в ЧС.`);
			if(!blist[message.args[3]]){
				blist[message.args[3]] = {
					block: true
				}
			}
			 
			return message.send(`Пользователь добавлен в ЧС.`);
			} 
	});
	cmd.on(/^разблок?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, "unban", 4, (message, args) => {
		if (acc.users[message.user].level < 4) return;
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if(res.object_id == 459607222) return message.send(`📢 ➣ Error...`);
				if(!blist[res.object_id]) return message.send(`Этот юзер не в ЧС.`);
						if(blist[res.object_id]){
							delete blist[res.object_id] 
						}
			 
			return message.send(`Пользователь удален из ЧС.`);
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return;
			if(message.args[3] == 459607222) return message.send(`📢 ➣ Error...`);
			if(!blist[message.args[3]]) return message.send(`Этот юзер не в ЧС.`);
			if(blist[message.args[3]]){
				delete blist[message.args[3]] 
			}
			 
			return message.send(`Пользователь удален из ЧС.`);
			} 
	});

	cmd.on(/^чс$/i, "blocked", 4, (message, args) => {
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
			if (lobby[message.chat].player_one == message.user) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Вы уже зарегистрировались!`, {attachment: duels});
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Кто-то уже создал дуэль. Для участия пропишите "принять".`, {attachment: duels});
		}
		if (acc.users[message.user].gunname == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  Чтобы сыграть - вам нужно оружие. | Кейсы: магазин`, {attachment: duels});
		if (!amount) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Вы не указали ставку!`, {attachment: duels});
		let user = acc.users[message.user];
		if (user.balance <= 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ваш баланс должен быть больше 0💰`, {attachment: duels});
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0 💰` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
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
		message.send(`📢 ➣ Вы вступили в игру "Дуэль"➖\n🔥 ➣ Участники: 🔥\n⚠ ➣ Игрок 1: @id${message.user}(${acc.users[message.user].prefix})\n⚠ ➣ Ставка 1 игрока: ${spaces(amount)}💰\n🔫 ➣ Оружие: ${gun}\n⚠ ➣ Кто смелый, пишите:  принять`, {attachment: duels});
	});
	cmd.on(/^принять/i, "принять", 0, (message, args) => {
		if (!message.chat) return;
		bot.botflood += 1;
		if (!lobby[message.chat]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Создайте дуэль командой: дуэль <ставка>`, {attachment: duels});
		if (acc.users[message.user].gunname == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Чтобы сыграть - вам нужно оружие. | Кейсы: магазин`, {attachment: duels});
		let user = acc.users[message.user];
		if (lobby[message.chat]) {
			if (lobby[message.chat].player_one != false) {
				if (lobby[message.chat].player_one == message.user) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Вы уже зарегистрировались!`, {attachment: duels});
				if (acc.users[message.user].balance < lobby[message.chat].stavka) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), @id${message.user}(${acc.users[message.user].prefix}), У вас нет столько денег для этой игры.`, {attachment: duels});
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
					message.reply("&#128293; 1.. 2.. 3.. Выстрел &#128299; \n ➖ ➣ @id" + lobby[message.chat].player_one + "(" + `${acc.users[ lobby[message.chat].player_one].prefix}` + "), покойся с миром &#128128; \n➖ ➣ Ваш баланс переходит вашему оппоненту.\n💡 ➣ Проигравший теряеет 1 опыт.\n💡 ➣ Победитель получил 2 опыта.", {attachment: duels});
					delete lobby[message.chat];
					return;
				}
				if (kill == 2) {
					acc.users[lobby[message.chat].player_one].exs += 2;
					acc.users[lobby[message.chat].player_two].exs -= 1;
					acc.users[lobby[message.chat].player_one].balance += lobby[message.chat].stavka * 2;
					message.reply("&#128293; 1.. 2.. 3.. Выстрел &#128299; \n ➖ ➣ @id" + lobby[message.chat].player_two + "(" + `${acc.users[ lobby[message.chat].player_two].prefix}` + "), покойся с миром &#128128; \n➖ ➣ Ваш баланс переходит вашему оппоненту.\n💡 ➣ Победитель получил 2 опыта.", {attachment: duels});  
					delete lobby[message.chat];
					return;
				}
			}
		}
	});

	///////////////////////////////////////////////////////////////////
 
 
	// - - - - - -  - - - - - - СИСТЕМА КЛАНОМ - - - - - - - - - - - - 
	cmd.on(/^addclan\s?([^]+)?/i, "addclan", 0, (message, args) => {
		if(acc.users[message.user].level == 0){
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Введите название для клана!`, {attachment: cclans});
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n  Отказ! | Подозрительная сслыка. |⛔`, {attachment: cclans});
		} else {
			let user = acc.users[message.user];
			let name = message.args[1];
			let clanid = user.clanid;
			if (user.donate < 50) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n  Создание клана стоит 50 доната | донат`, {attachment: cclans});
			user.donate -= 50;
			if (clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n У вас уже создан клан/Вы состоите в клане.`, {attachment: cclans});
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
 		${clans[user.clanid].smile} ➣  Клан ${name}  ➣ ${clans[user.clanid].smile} 
 		Был успешно создан!
 		Создатель: vk.com/id${message.user}
 		Номер клана: ${botinfo.number}
 		Логотип клана: ${clans[user.clanid].smile}
 		Тип клана: открытый.
 		Команды клана: khelp
 		`, {attachment: cclans});
			}
		}
	}else{
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Введите название для клана!`, {attachment: cclans});
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n  Отказ! | Подозрительная сслыка. |⛔`, {attachment: cclans});
		} else {
			let user = acc.users[message.user];
			let name = message.args[1];
			let clanid = user.clanid;
			if (clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n  У вас уже создан клан/Вы состоите в клане.`, {attachment: cclans});
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
 		${clans[user.clanid].smile} ➣  Клан ${name}  ➣ ${clans[user.clanid].smile} 
 		Был успешно создан!
 		Создатель: vk.com/id${message.user}
 		Номер клана: ${botinfo.number}
 		Логотип клана: ${clans[user.clanid].smile}
 		Тип клана: открытый.
 		Команды клана: khelp
 		`, {attachment: cclans});
			}
		}
	}
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^dellclan$/i, "delclan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let idclan = user.clanid;
		if (!clans[idclan]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не состоите в клане.`, {attachment: cclans});
		if (acc.users[message.user].clanid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не состоите в клане.`, {attachment: cclans});
		if (clans[idclan].users[message.user].level == 2){
			user.clanid = false;
			delete clans[idclan].users[message.user];
			for(id in clans[idclan].users){
				delete clans[idclan].users[id];
				acc.users[id].clanid = false;
			}
			delete clans[idclan];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы удалили свой клан.`, {attachment: cclans});

		}else{
			return message.send(`${clans[idclan].smile} ➣  только создатель может удалить клан.`, {attachment: cclans});
		}
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^adellclan\s?([0-9]+)?/i, "delclan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let idclan = message.args[1]; 
		if (clans[idclan].users[message.user].level == 2){
			user.clanid = false;
			delete clans[idclan].users[message.user];
			for(id in clans[idclan].users){
				delete clans[idclan].users[id];
				acc.users[id].clanid = false;
			}
			delete clans[idclan];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы удалили клан.`, {attachment: cclans});

		}else{
			return message.send(`${clans[idclan].smile} ➣  только создатель может удалить клан.`, {attachment: cclans});
		}
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^покинуть$/i, "exitclan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let idclan = user.clanid;
		if (!clans[idclan]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не в клане.`, {attachment: cclans});
		if (acc.users[message.user].clanid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не состоите в клане.`, {attachment: cclans});
		if (clans[idclan].users[message.user].level == 2) return message.send(`${clans[idclan].smile} ➣  Создатель не может выйти из клана.`, {attachment: cclans});
		user.clanid = false;
		delete clans[idclan].users[message.user];
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы добровольно покинули клан.`, {attachment: cclans});
	});
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^kopen/i, "kopen", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель~  клана.`, {attachment: cclans});
		if (clans[clanid].open == true) return message.send(`${clans[clanid].smile} ➣  Клан итак открытый.`, {attachment: cclans})
		clans[clanid].open = true;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n ${clans[clanid].smile} ➣  Вы открыли клан. Цена за вход: ${clans[clanid].price}  поинтов.\n${clans[clanid].smile} ➣  Изменить цену за вход: kprice цена`, {attachment: cclans});
	});
	cmd.on(/^kclose/i, "kclose", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель~  клана.`, {attachment: cclans});
		if (clans[clanid].open == false) return message.send(`${clans[clanid].smile} ➣  Клан итак закрытый.`, {attachment: cclans})
		clans[clanid].open = false;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы закрыли клан. Набор участников могут проводить только зам/создатель.`, {attachment: cclans});
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
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель~  клана.`, {attachment: cclans});
		//if (!message.args[1]) return message.send(`${clans[clanid].smile} ➣  Укажите сумму для входа в клан.`);
		if (amount < 100 || amount > 50000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Сумма для входа в клан не должна быть < 100💰 и > 50.000💰`, {attachment: cclans});
		clans[clanid].price = amount;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы установили цену за вход в размере ${spaces(amount)}💰`, {attachment: cclans});
	});

 
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^кпринять\s?([0-9]+)?/i, "класс", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Введите ID пользователя.`, {attachment: cclans});
		let users = acc.users;
		let user = users[message.user];
		if (!user.clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не состоите в клане`, {attachment: cclans});
		let id = Number(message.args[1]);
		let subject = users[id];
		if(clans[user.clanid].people >= 25) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Максимальное кол-во участников в клане: 25`, {attachment: cclans});
			
		if (!clans[user.clanid].invites[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Этот человек не подавал заявку на вступление.`, {attachment: cclans});
		if (clans[user.clanid].users[message.user].level === 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Принимать в клан может только глава клана и зам.клана`, {attachment: cclans});
		if (subject.clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Данный человек уже вступил в клан`, {attachment: cclans});
		if (subject.balance < clans[user.clanid].price) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У пользователя не хватает денег`, {attachment: cclans});
		subject.balance -= clans[user.clanid].price;
		clans[user.clanid].balance += clans[user.clanid].price;
		subject.clanid = user.clanid;
		if(!clans[user.clanid].users[id])
			clans[user.clanid].users[id] = { level: 0 };
		delete clans[user.clanid].invites[id];
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ @id${id}(${acc.users[id].prefix}) был(а) принят(а) в клан по заявке.`, {attachment: cclans});
	});
	
	cmd.on(/^заявки$/i, "заявки", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if (!user.clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы не состоите в клане`, {attachment: cclans});
		let id = acc.users[message.user].clanid;
		let text = `🔥 Заявки на вступление 🔥\n`;
		if (clans[id].users[message.user].level === 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Заявки может просматривать только Глава клана и Зам.клана`, {attachment: cclans});
		for(ids in clans[id].invites){
			text += `ID: ${ids} | @id${ids}(${acc.users[ids].prefix}) - ждет одобрения\n`, {attachment: cclans};
		}
		return message.send(text);
	});

	cmd.on(/^ksliv\s?([^\s	].*)?/i, "кслив", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Введите сумму для раздачи участникам клана.`, {attachment: cclans});
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		let id = acc.users[message.user].clanid;   
		if (message.user != clans[id].owner) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Раздавать деньги может только Создатель клана!`, {attachment: cclans})
		if(amount > clans[id].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ На счету клана нет столько 💰`, {attachment: cclans});
		clans[id].balance -= amount;
		let sum = Math.round(amount / clans[id].people);
		for(ids in clans[id].users){
			acc.users[ids].balance += sum;
		}
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Каждый участник клана получил по ${sum} 💰 `, {attachment: cclans});
	});

	cmd.on(/^вступить\s?([0-9]+)?/i, "inclan", 0, (message, args) => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Введите ID клана.`, {attachment: cclans});
		let user = acc.users[message.user];
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы уже в клане.`, {attachment: cclans});
		if(!clans[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Данного клана не существует.`, {attachment: cclans});
		if(!clans[id].open) {
			if(clans[id].people >= 25) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Максимальное кол-во участников в клане: 25`, {attachment: cclans});
			if(!clans[id].invites)
				clans[id].invites = {}
				
			if(!clans[id].invites[message.user])
				clans[id].invites[message.user] = { i: true };
			
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Ваша заявка на вступление была отправлена создателю.`, {attachment: cclans});
		} else if (clans[id].open) {
			if(clans[id].people >= 25) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Максимальное кол-во участников в клане: 25`, {attachment: cclans});
			
			if (user.balance < clans[id].price) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У вас на балансе мало 💰`, {attachment: cclans});
			user.balance -= clans[id].price;
			clans[id].balance += clans[id].price;
			user.clanid = id;
			if(!clans[id].users[message.user]) {
				clans[id].users[message.user] = {
					level: 0
				}
			}
			
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы вошли в клан за ${spaces(clans[id].price)}💰.\n${clans[id].smile} ➣  Команды клана khelp`, {attachment: cclans});
		}
	});
	
	//////////////////////////////////////////////////////////////////////////
	cmd.on(/^ktitle\s?([^]+)?/i, "проверка", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Укажите название для клана.`, {attachment: cclans});
		let text = message.args[1].toLowerCase();
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(text)
		var lol1 = filter1.test(text)
		if (filter0.test(text) == true || filter1.test(text) == true) {
			var check = true;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Отказ! | Подозрительная сслыка. |⛔`, {attachment: cclans});
		} else {
			let user = acc.users[message.user];
			let clanid = user.clanid;
			if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n У вас нет клана.`, {attachment: cclans});
			if (clans[clanid].users[message.user].level < 2) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель~  клана.`, {attachment: cclans});
			if (clans[clanid].balance < 10000) return message.send(`${clans[clanid].smile} ➣  На балансе клана нету 10.000💰.| kbank `, {attachment: cclans});
			clans[clanid].balance -= 10000;
			if (clans[clanid]) {
				if (message.user != clans[clanid].owner) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Изменить название клана может только Создатель!`, {attachment: cclans});
				if (message.user == clans[clanid].owner) {
					clans[clanid].name = message.args[1];
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы успешно изменили название клана за 10.000💰!`, {attachment: cclans});
				}
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^klogo/i, "clogo", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель/заместитель~ клана.`, {attachment: cclans});
		if (clans[clanid].balance < 10000) return message.send(`${clans[clanid].smile} ➣  На балансе клана нету 10000💰.| kbank `, {attachment: cclans});
		clans[clanid].balance -= 10000;
		if (clans[clanid]) {
			let smile = [`📺`, `💥`, `💣`, `💎`, `♻`, `🏆`, `🔥`, `🌚`, `👻`, `💀`, `🎄`, `🎃`, `🚀`, `🎱`, `🍼`, `🍺`, `🐔`, `🐉`, `🌈`, `🌝`].random();
			clans[clanid].smile = smile;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы успешно изменили логотип клана за 10000💰!`, {attachment: cclans});
		}
	});
	///////////
	cmd.on(/^клист\s([0-9]+)/i, "класс", 0, (message, args) => {
		bot.botflood += 1;
		let users = acc.users;
		let user = users[message.user];
		let id = Number(message.args[1]);
		if(user.clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы уже состоите в клане`, {attachment: cclans});
		
	});
	/////////////////////////////////////////////////////////////////////////
	cmd.on(/^(clan|клан)$/i, "clan", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ У вас нет клана.`, {attachment: cclans});
		let text = ``;
		let tipe = ``;
		text += ` 🏆 Участники Клана 🏆\n`;
		let userf = acc.users[clans[clanid].owner];
		let zam = ``;
		 
		for (let id in clans[clanid].users) {
			let people = acc.users[id];
			if (clans[clanid].users[id].level == 1) zam += `${clans[clanid].smile} ➣ [id${id}|${people.prefix}] [${acc.users[id].exs} опыта] 💥.\n`; 
		}
		text += `🤴 ➣ Создатель:\n ${clans[clanid].smile} ➣ [id${clans[clanid].owner}|${userf.prefix}] [${acc.users[clans[clanid].owner].exs} опыта] 💥.\n\n🤵 ➣ Заместители: \n ${zam}\n\n🎎 ➣ Участники:\n`;

		///////////////////////
		 
		let userr = acc.users[message.user];
		let cclan = user.clanid;

		let top = ``;
		var tops = []
		for (let i in clans[cclan].users) {
			if(acc.users[i].level != 4){
				tops.push({
				id: i,
				exs: acc.users[i].exs
			 })
			}	 
		}

		let count = 0;
		for (key in clans[cclan].users) {
				count += 1;
		} 


		tops.sort(function(a, b) {
			if (b.exs > a.exs) return 1
			if (b.exs < a.exs) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < count; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1; 
				yo.push({
					id: tops[g].id,
					exs: tops[g].exs 
				})
			}
		}
		var exs =  yo.map(a => `${clans[cclan].smile} ➣ [id` + a.id + "|" + acc.users[a.id].prefix + "] [" + spaces(a.exs) + " опыта] 💥").join("\n")
		text += `${exs}` 
		///////////////////////
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
		${clans[clanid].smile} ➣ ~ ${clans[clanid].name} ~ |${clans[clanid].smile} 
 		${clans[clanid].smile} ➣  Создатель: [id${clans[clanid].owner}|${user.prefix}]
 		${clans[clanid].smile} ➣  Номер клана: ${clans[clanid].number}
 		${clans[clanid].smile} ➣  Логотип клана: ${clans[clanid].smile} 
 		${clans[clanid].smile} ➣  Тип клана: ${tipe}
 		${clans[clanid].smile} ➣  Цена за вход: ${spaces(clans[clanid].price)}💰 

 		🔥 ➣  Опыт клана: ${spaces(clan_exs)}
        💰 ➣  Баланс клана: ${spaces(clans[clanid].balance)}💰 

 		${text}
		`, {attachment: cclans});
		}
	});
	///////////////////////////////////////////////////////////////////////// 
	cmd.on(/^khelp$/i, "khelp", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ ➣  У вас нет клана.`);
		if (clans[clanid].users[message.user].level < 1) {
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		${clans[clanid].smile} ➣ - Команды клана -  ➣ ${clans[clanid].smile}
		${clans[clanid].smile} ➣ Клан - Информация о вашем клане.
		${clans[clanid].smile} ➣ kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} ➣ kbank - баланс клана.
		${clans[clanid].smile} ➣ clanwar ID <ставка> - Атаковать клан.

		${clans[clanid].smile} ➣ Покинуть - Выйти из клана
		`, {attachment: cclans});
		}
		if (clans[clanid].users[message.user].level == 1) {
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		${clans[clanid].smile}  - Команды клана -  ➣ ${clans[clanid].smile}
		${clans[clanid].smile} ➣ Клан - Информация о вашем клане. 
		${clans[clanid].smile} ➣ kkick ID(user'a) - выгнать из клана.
		${clans[clanid].smile} ➣ klogo - Сменить логотип клана.
		${clans[clanid].smile} ➣ kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} ➣ kbank - баланс клана.

		${clans[clanid].smile} ➣ clanwar ID <ставка> - Атаковать клан.
		${clans[clanid].smile} ➣ Заявки - список заявок на вступление.
		${clans[clanid].smile} ➣ Кпринять ID - принять в клан. 

		${clans[clanid].smile} ➣ Покинуть - Выйти из клана
		`, {attachment: cclans});
		}
		if (clans[clanid].users[message.user].level == 2) {
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		${clans[clanid].smile} - Команды клана -  ➣ ${clans[clanid].smile}
		${clans[clanid].smile} ➣ Клан - Информация о вашем клане. 
		${clans[clanid].smile} ➣ kkick ID(user'a) - выгнать из клана.
		${clans[clanid].smile} ➣ kmoder ID(user'a) - назначить заместителем.
		${clans[clanid].smile} ➣ kremove ID(user'a) - снять заместителя.
		${clans[clanid].smile} ➣ ktitle name - изменить название клана.
		${clans[clanid].smile} ➣ klogo - Сменить логотип клана.

		${clans[clanid].smile} ➣ clanwar ID <ставка> - Атаковать клан.

		${clans[clanid].smile} ➣ kopen - Открыть клан.
		${clans[clanid].smile} ➣ kprice - Установить цену за вход.
		${clans[clanid].smile} ➣ kclose - Закрыть клан.

		${clans[clanid].smile} ➣ Заявки - список заявок на вступление.
		${clans[clanid].smile} ➣ Кпринять ID - принять в клан.
		${clans[clanid].smile} ➣ ksliv <сумма> - раздать деньги участникам.

		${clans[clanid].smile} ➣ kput <сумма> - положить 💰 в банк клана.
		${clans[clanid].smile} ➣ kget <сумма> - снять 💰 из банка клана.
		${clans[clanid].smile} ➣ kbank - баланс клана.
		${clans[clanid].smile} ➣ dellclan - удалить свой клан.
		`, {attachment: cclans});
		}
	});

	//////////////////////////////////////////////////////////////////////
	cmd.on(/^kkick?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "cremove", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель/заместитель~  клана.`, {attachment: cclans});
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ', {attachment: cclans});
				if (!clans[clanid].users[res.object_id]) return message.send(`${clans[clanid].smile} ➣  Этого юзера нет в Вашем клане!`, {attachment: cclans});
				if (!acc.users[res.object_id]) return message.send(`💥 ➣ Юзера нет в беседе.`, {attachment: cclans});
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Юзер находится в другом клане.`, {attachment: cclans});
				if (clans[clanid].users[res.object_id].level == 2) return message.send(`${clans[clanid].smile} ➣  Нельзя выгнать создателя.`, {attachment: cclans});
				if (acc.users[res.object_id].clanid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Юзер не состоит в клане.`, {attachment: cclans});
				delete clans[clanid].users[res.object_id];
				acc.users[res.object_id].clanid = false;
				return message.send(`${clans[clanid].smile} ➣  vk.com/id${res.object_id} был изгнан из клана.`, {attachment: cclans});
			})
			return;
		} else {
			if (!message.args[3]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ ID не указан, либо указан неверно.`, {attachment: cclans});
			if (BOT_ID == message.args[3]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Отказ`, {attachment: cclans});
			if (!clans[clanid].users[message.args[3]]) return message.send(`${clans[clanid].smile} ➣  Этого юзера нет в Вашем клане!`, {attachment: cclans});
			if (!acc.users[message.args[3]]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Юзера нет в беседе.`, {attachment: cclans});
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 ➣  Юзер находится в другом клане.`, {attachment: cclans});
			if (clans[clanid].users[message.args[3]].level == 2) return message.send(`${clans[clanid].smile} ➣  Нельзя выгнать создателя.`, {attachment: cclans});
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 ➣  Юзер не состоит в клане.`, {attachment: cclans});
			delete clans[clanid].users[message.args[3]];
			acc.users[message.args[3]].clanid = false;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ vk.com/id${message.args[3]} был изгнан из клана.`, {attachment: cclans});
		}
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kmoder?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "kmoder", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ ➣  У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель/заместитель~  клана.`, {attachment: cclans});
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.reply('Отказ');
				if (acc.users[res.object_id].clanid == false) return message.send(`💥 ➣  Юзер не состоит в клане.`, {attachment: cclans});
				if (!acc.users[res.object_id]) return message.send(`💥 ➣  Юзера нет в беседе.`);
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`💥 ➣  Юзер уже состоит в другом клане.`, {attachment: cclans});
				clans[clanid].users[res.object_id].level = 1;
				return message.send(`${clans[clanid].smile} ➣  vk.com/id${res.object_id} был назначен заместителем в клане.`, {attachment: cclans});
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.", {attachment: cclans});
			if (BOT_ID == message.args[3]) return message.reply('Отказ');
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 ➣  Юзер не состоит в клане.`);
			if (!acc.users[message.args[3]]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣  Юзера нет в беседе.`, {attachment: cclans});
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 ➣  Юзер уже состоит в другом клане.`, {attachment: cclans});
			clans[clanid].users[message.args[3]].level = 1;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ vk.com/id${message.args[3]} был назначен заместителем в клане.`, {attachment: cclans});
		}
	});
	/////////////////////////////////////////////////////////////////////
	cmd.on(/^kremove?(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, "kmoder", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  У вас нет клана.`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n${clans[clanid].smile} ➣  Вы не ~создатель/заместитель~  клана.`, {attachment: cclans});
		if (message.args[4]) {
			var domain = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				if (BOT_ID == res.object_id) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n@id${message.user}(${acc.users[message.user].prefix}),\n Отказ`, {attachment: cclans});
				if (!acc.users[res.object_id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣  Юзера нет в беседе., {attachment: cclans}`);
				if (acc.users[res.object_id].clanid != acc.users[message.user].clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣  Юзер уже состоит в другом клане.`, {attachment: cclans});
				if (acc.users[res.object_id].clanid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣  Юзер не состоит в клане.`, {attachment: cclans});
				clans[clanid].users[res.object_id].level = 0;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ vk.com/id${res.object_id} был понижен до <участника> в клане.`, {attachment: cclans});
			})
			return;
		} else {
			if (!message.args[3]) return message.reply("ID не указан, либо указан неверно.");
			if (BOT_ID == message.args[3]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nОтказ`, {attachment: cclans});
			if (!acc.users[message.args[3]]) return message.send(`💥 ➣  Юзера нет в беседе.`, {attachment: cclans});
			if (acc.users[message.args[3]].clanid != acc.users[message.user].clanid) return message.send(`💥 ➣  Юзер уже состоит в другом клане.`, {attachment: cclans});
			if (acc.users[message.args[3]].clanid == false) return message.send(`💥 ➣  Юзер не состоит в клане.`);
			clans[clanid].users[message.args[3]].level = 0;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ vk.com/id${message.args[3]} был понижен до <участника> в клане.`, {attachment: cclans});
		}
	});
	//////////////////////////////////////////////////////////////////////

	cmd.on(/^(?:clanwar)\s?([0-9]+)?\s?([^\s	].*)?/i, 'clanwar', 0, message => { 
		let clanid = acc.users[message.user].clanid;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Укажите ID клана, который хотите атаковать.`, {attachment: cclans});
		if(!message.args[2]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Укажите ставку.`, {attachment: cclans});
		if(clans[clanid].war == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Атаковать клан можно раз в 10 минут.`, {attachment: cclans});
		let id = Number(message.args[1]); 
		let amount = parserInt(message.args[2]);
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), укажите корректно ставку.`, {attachment: cclans});
		if(amount < 1000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Минимальная сумма для атаки 1.000💰`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 1) return message.send(`${clans[clanid].smile} ➣  Вы не ~создатель/заместитель~  клана.`, {attachment: cclans});
		if(id == clanid) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), нельзя нападать на свой клан.`, {attachment: cclans});
		if(amount > clans[clanid].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ На счету вашего клана не хватает 💰`, {attachment: cclans});
		if(amount > clans[id].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ На счету  клана (ID: ${id}) не хватает 💰`, {attachment: cclans}); 
		if (clanid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), у вас нет клана.`, {attachment: cclans});
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), у вас нет клана.`, {attachment: cclans});
		if (!clans[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), такого клана нет.`, {attachment: cclans});

		clans[clanid].war = true;
			setTimeout(() => {
				clans[clanid].war = false;
			}, 600000);

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += amount;
			clans[clanid].balance -= amount;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🛡 Clan War 🛡\n⚔ ➣ Клан ${clans[clanid].name} напал на ${clans[id].name}\n🏆 ➣ Победу одержал клан: ${clans[id].name}\n💰 ➣ Выигрыш: ${spaces(amount)} 💰`, {attachment: cclans});
		}else{
			clans[id].balance -= amount;
			clans[clanid].balance += amount;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🛡 Clan War 🛡\n⚔ ➣ Клан ${clans[clanid].name} напал на ${clans[id].name}\n🏆 ➣ Победу одержал клан: ${clans[clanid].name}\n💰 ➣ Выигрыш: ${spaces(amount)} 💰`, {attachment: cclans});
		}
	});	
	//////////////////////////////////////////////////////////////////////
	cmd.on(/^кланы/i, "кланы", 0, (message, args) => {
		bot.botflood += 1;
		if (!clans) return message.send(`⚠ ➣  Кланов нет.`);
		let text = '';
		text += `~ 💥| Кланы  |💥 ~\n`;
		for (let id in clans) {
			let user = acc.users[clans[id].owner];
			text += `
             💎 ➣ Название: ${clans[id].name}
             🆔 ➣  Номер: ${clans[id].number}
             💰 ➣  Цена входа: ${spaces(clans[id].price)}💰
             💥 ➣  Баланс клана: ${spaces(clans[id].balance)}💰
             🥇 ➣  Создал:  [id${clans[id].owner}|${user.prefix}]
             ~~~~~~~~~~~~~~
             `;
		}
		return message.send(text, {attachment: cclans});
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kbank/i, "cremove", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ У вас нет клана.`, {attachment: cclans});
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Баланс Вашего клана: ${spaces(clans[clanid].balance)} 💰`, {attachment: cclans});
	});
	////////////////////////////////////////////////////////////////////
	cmd.on(/^kput\s?([^\s	].*)?/i, "cremove", 0, (message, args) => {
		bot.botflood += 1; 
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['bankbiz'] == false) return message.send(`✨ ➣ Администратор заблокировал вам:\n✨ ➣ Вклад/снятие с бизнеса/клана`, {attachment: cclans});

		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Укажите сумму вклада.`, {attachment: cclans});
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		if(amount < 50000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Минимальная сумма вклада 50.000💰 `, {attachment: cclans}); 
		if(!Number(amount)) return;
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if (!clans[clanid]) return message.send(`⚠ ➣  У вас нет клана.`, {attachment: cclans});
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `Вклад не может быть меньше 0 или равен 0 💰.` : `Вклад не может превышать Ваш баланс.`, {attachment: cclans});
		
		if(!timers.putclan[message.user]){
			timers.putclan[message.user] = {
				timers: false
			}
		}
		if(timers.putclan[message.user].timers == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Положить сумму в клан можно раз в час!`, {attachment: cclans}); 
		timers.putclan[message.user].timers = true;
			setTimeout(() => {
						timers.putclan[message.user].timers = false;
			}, 3600000)	

		user.balance -= Number(amount);
		clans[clanid].balance += Number(amount);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💴 ➣ Вы успешно положили ${spaces(amount)}💰 в банк клана.`, {attachment: cclans});
	});
	cmd.on(/^kget\s?([^\s	].*)?/i, "kget", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  Укажите сумму снятия.`, {attachment: cclans});
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: cclans});
		let user = acc.users[message.user];
		let clanid = user.clanid;
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['bankbiz'] == false) return message.send(`✨ ➣ Администратор заблокировал вам:\n✨ ➣ Вклад/снятие с бизнеса/клана`, {attachment: cclans});
		if (!clans[clanid]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  У вас нет клана.`, {attachment: cclans});
		if(amount < 50000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Минимальная сумма снятия 50.000 💰`, {attachment: cclans});
		if (clans[clanid].users[message.user].level < 2) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n${clans[clanid].smile} ➣  Снимать деньги может только создатель клана.`, {attachment: cclans});
		if (amount > clans[clanid].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n${clans[clanid].smile} ➣  Данной суммы нет в банке клана.`, {attachment: cclans});
		if (amount <= 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n${clans[clanid].smile} ➣  Сумма не должна быть меньше или равно 0 💰.`, {attachment: cclans});
		
		if(!timers.clan[message.user]){
			timers.clan[message.user] = {
				timers: false
			}
		}
		if(timers.clan[message.user].timers == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Снять сумму с клана можно раз в час!`, {attachment: cclans}); 
		timers.clan[message.user].timers = true;
			setTimeout(() => {
						timers.clan[message.user].timers = false;
			}, 3600000)	

		user.balance += Number(amount);
		clans[clanid].balance -= Number(amount);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n${clans[clanid].smile} ➣  Вы успешно сняли ${spaces(amount)}💰 с банка клана.`, {attachment: cclans});
	});
	////////////////////////////////////////////////
	cmd.on(/^выбрать?\s([0-9]+)?/i, "выбрать", 0, (message, args) => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Укажите 🆔 оружия, которое хотите выбрать.`, {attachment: guuns});
		if (message.args[1] > 16) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Оружия с таким 🆔 нету`, {attachment: guuns});
		if (message.args[1] < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Оружия с таким 🆔 нету`, {attachment: guuns});
		if (!cases[message.user].cases[message.args[1]]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nУ вас нет такого оружия!`, {attachment: guuns});
		acc.users[message.user].gunname = cases[message.user].cases[message.args[1]].name;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📝 ➣ Вы взяли в руки оружие: ${cases[message.user].cases[message.args[1]].name}`, {attachment: guuns});
	});
	/////////////////////////////////////////////////////////////////// КЕЙСЫ
	cmd.on(/^(?:магазин|shop)$/i, 'все', 0, message => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
	🆔 1 ➣ Покупка биткоина | Цена: 50.000💰 
    🆔 2 ➣ Продажа биткоина | Цена: 46.000💰 

    💼 ➣ Кейсы:
    🆔 3 ➣ Кейс <новичка> | 20.000💰 
    🆔 4 ➣ Кейс <профи> | 40.000💰 
    🆔 5 ➣ Кейс <легендарный> | 1 БитКоин 
    🆔 6 ➣ Ключ к кейсам. | 10.000💰 

    🌴 ➣ Майнинг-Ферма:
    💶 ➣ Ферма - Информация. 
    💶 ➣ Купить ферму - Купить Майнинг-ферму за донат. 

    🔥 ➣ Для покупки товара введите: 
    🔥 ➣ Купить ID (ID - товара)
		`, {attachment: magazin   });
	});
	///////////////
	////////////////////майнинг ферма
	cmd.on(/^(?:фермы)$/i, 'все', 0, message => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		💶| ~ Майнинг-Ферма ~ |💶
		Хотите получать Биткоины?
		Просто купите Майнинг-ферму 
	    И она сделает все за Вас.
		Заработок валюты проходит автоматически.
		Ежечасно на баланс будут приходить Биткоины-очки.
		~~~~~~~~~~~
		Цена: 100 донат очков.
		Доход: 2 биткоина в час.
		Улучшение дает +2 биткоина к прибыли.
		~~~~~~~~~~~

		🔥 ➣ Команды фермы:
    	🔥 ➣ Ферма - info 
    	🔥 ➣ Улучшить - улучшить ферму.
    	🔥 ➣ Купить ферму - Купить ферму

		
		`, {attachment: mineferm});
	});
	///////////////////////////////
	cmd.on(/^(биткоин|биткоины|биткойны)$/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Пример команды:\n🔺 ➣ Биткоин баланс\n🔺 ➣ Биткоин продать <кол-во>\n🔺 ➣ Биткоин купить <кол-во>\n🔺 ➣ Курс`, {attachment: bitki });
	});
	cmd.on(/^биткоин баланс$/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user]
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🌐 ➣ На балансе ${spaces(user.bitcoin)} Биткоинов.`, {attachment: bitki });
	});
	cmd.on(/^биткоин купить\s?([0-9]+)?/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1; 
		if(message.args[1] < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`);
		if(!Number(message.args[1])) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Сумма должна быть числом.`);
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Пример команды:\n🔺 ➣ Биткоин баланс\n🔺 ➣ Биткоин продать <кол-во>\n🔺 ➣ Биткоин купить <кол-во>\n🔺 ➣ Курс`, {attachment: bitki });
		let user = acc.users[message.user]
		let price = Number(message.args[1]) * 50000;
		if (user.balance < price) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ ${message.args[1]} Биткоин(ов) стоит(ят) ${spaces(price)} 💰`, {attachment: bitki });
		user.balance -= price;
		user.bitcoin += Number(message.args[1]);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🌐 ➣ Вы купили ${message.args[1]} биткоин(ов). \n🌐 ➣ На балансе ${spaces(user.bitcoin)} Биткоинов.`, {attachment: bitki });
	});

	cmd.on(/^биткоин продать\s?([0-9]+)?/i, "биткоин", 0, (message, args) => {
		bot.botflood += 1; 
		if(message.args[1] < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: bitki });
		if(!Number(message.args[1])) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Сумма должна быть числом.`, {attachment: bitki });
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Пример команды:\n🔺 ➣ Биткоин баланс\n🔺 ➣ Биткоин продать <кол-во>\n🔺 ➣ Биткоин купить <кол-во>\n🔺 ➣ Курс`, {attachment: bitki });
		let user = acc.users[message.user]
		if (user.bitcoin < message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ У вас нет столько БитКоинов.`, {attachment: bitki });
		let sell = chats.bitcoin;
		let price = Number(message.args[1]) * sell;
		acc.users[message.user].balance += price;
		user.bitcoin -= Number(message.args[1]);
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Вы продали БитКоины: ${spaces(message.args[1])}\n⚕ ➣ Вы получили ${spaces(price)}💰.\n💰 ➣ Курс: 1 Bitcoin ~ ${spaces(sell)}💰`, {attachment: bitki });
	});

	cmd.on(/^курс/i, "биткоин", 0, (message, args) => {
		if(message.chat) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚕ ➣ Данная команда работает только в ЛС группы: [bot.avrora| Бот Аврора] .`, {attachment: bitki });
		bot.botflood += 1; 
		let user = acc.users[message.user] 
		let sell = chats.bitcoin; 
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
			💴 ➣ Актуальный курс продажи:
			⚕ ➣ 1 Биткоин -> ${spaces(sell)}💰

			⏳ ➣ Курс меняется каждые 3 секунды.
			📖 ➣ Все команды: 'Биткоин'`, {attachment: bitki });
	});

	cmd.on(/^(?:ферма)$/i, 'все', 0, message => {
		bot.botflood += 1;
		if (!ferm[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💶 ➣ У вас нет Майнинг-Фермы.`, {attachment: mineferm});
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
    	💶 Ваша Майнинг-Ферма 💶
    	🌴 ➣ Владелец: ${user.first_name} ${user.last_name}
    	🌴 ➣ Уровень фермы: ${ferm[message.user].level}
    	🌴 ➣ Цена улучшения: ${spaces(ferm[message.user].lvlup)} доната 💎
    	🌴 ➣ Прибыль: ${spaces(ferm[message.user].dohod)} Биткоинов в час.

    	🔥 ~ Команды Майнинг-фермы ~ 🔥
    	🔥 ➣ Информация: ферма.
    	🔥 ➣ Улучшить ферму: улучшить.
    	`, {attachment: mineferm});
		})
	});
	////////////////
	cmd.on(/^(?:улучшить)/i, 'все', 0, message => {
		bot.botflood += 1;
		if (!ferm[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💶 ➣ У вас нет Майнинг-Фермы.`, {attachment: mineferm});
		let user = acc.users[message.user];
		if (user.donate < ferm[message.user].lvlup) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💶 ➣ Для повышения уровня Майнинг-фермы нужно: ${spaces(ferm[message.user].lvlup)}💰`, {attachment: mineferm});
		user.donate -= ferm[message.user].lvlup; 
		ferm[message.user].level += 1;
		ferm[message.user].dohod += 2;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Вы купили улучшение Майнинг-фермы. Заработок увеличился!\n\n🔥 ➣ Информация:  ферма \n🔥 ➣ Улучшить ферму: улучшить.`, {attachment: mineferm});
	});
	////////////////
	cmd.on(/^(?:купить)\s?([0-9]+)?$/i, 'все', 0, message => {
		bot.botflood += 1;
		if (message.text == 'купить ферму') return;
		let text = message.args[1];
		if (!text) return message.send("⚠ ➣ Введите ID товара!", {attachment: magazin });
		if(!Number(text)) return;
		let user = acc.users[message.user]
		if (message.args[1] == "1") {
			if (user.balance < 50000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ 1 Биткоин стоит 50.000 💰`, {attachment: bitki });			
			user.balance -= 50000;
			user.bitcoin += 1;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Вы купили 1 биткоин. \n 💰 ➣ На балансе ${spaces(user.bitcoin)} Биткоинов.`, {attachment: bitki });
		}
		if (message.args[1] == "2") {
			if (user.bitcoin < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ У вас нет Биткоинов`, {attachment: bitki });			
			user.balance += 46000;
			user.bitcoin -= 1;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Вы продали 1 биткоин. \n 💰 ➣ На балансе ${spaces(user.balance)}💰.`, {attachment: bitki });
		}
		// кейсы -   - -- -- - -- -  --- - -- - - - - - --- - -- - -- --
		if (message.args[1] == "3") {
			if (user.balance < 20000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ Кейс <новичка> стоит 20.000💰.`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼| Вы купили кейс <новичка> |💼`, {attachment: guuns });
		}
		if (message.args[1] == "4") {
			if (user.balance < 40000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ Кейс <профи> стоит 40.000💰.`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼| Вы купили кейс <профи> |💼`, {attachment: guuns });
		}
		if (message.args[1] == "5") {
			if (user.bitcoin < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ Кейс <легендарный> стоит 1 БитКоин.`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ Вы купили кейс <легендарный> |💼`, {attachment: guuns });
		}
		if (message.args[1] == "6") {
			if (user.balance < 10000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔑 ➣ Ключ для кейса стоит 10.000💰.`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔑 ➣ Вы купили ключ для открытия кейсов |🔑`, {attachment: guuns });
		} else {
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы указали неверный 🆔 товара.\nВсе товары вы можете найти в: магазин`, {attachment: guuns });
		}
	});
	cmd.on(/^кейсы/i, "casebuy", 0, (message, args) => {
		bot.botflood += 1;
		if (!cases[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас нет кейсов. Купите в: магазин.`);
		let user = cases[message.user];
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		↔ Ваши кейс ↔
		🆔 3 ➣ Кейсов <новичок> - ${user.caseone}.
		🆔 4 ➣ Кейсов <профи> - ${user.casetwo}.
		🆔 5 ➣ Кейсов <легендарный> - ${user.casethree}.
		🔑 ➣ Ключей - ${user.keys}.

		💼 ➣ Открыть: открыть ID(кейса).
		💼 ➣ Просмотр оружия: оружие
		💼 ➣ Продать оружие: продать ID
		`, {attachment: guuns });
	});
	cmd.on(/^(?:открыть)\s?([0-9]+)?/i, 'кейс', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🆔 ➣ Укажите ID кейса.\n💼 Команда:  кейсы`, {attachment: guuns });
		if (!cases[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас нет кейсов. Купите в: магазин.`, {attachment: guuns });
		let text = message.args[1];
		if(!Number(text)) return;
		let user = cases[message.user];
		if (!text) return message.send("⚠ Введите ID кейса!");
		if (text != Number(message.args[1])) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 💼 ➣ Такого кейса нет :(`, {attachment: guuns });
		if (text < 3) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 💼 ➣ Такого кейса нет :(`, {attachment: guuns });
		if (text > 5) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 💼 ➣ Такого кейса нет :(`, {attachment: guuns });
		if (user.keys < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔑 ➣ У вас нет ключа. Купите в: магазин.`, {attachment: guuns });
		if (text == 3) {
			if (user.caseone < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас не куплен кейс <новичок> |  магазин`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 🔔 ➣ Вы открыли кейс <новичок> | 🔔\n 🐩 ➣ Вам выпало: ${item.case}\n 💰 ➣ Цена: ${spaces(item.price)}💰\n🆔 ➣ skin ${item.skinid} \n⚠ ➣ Просмотр ваших кейсов:  кейсы\n⚠ ➣ Просмотр оружия:  оружие`, {
				attachment: guuns
			});
		}
		if (text == 4) {
			if (user.casetwo < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас не куплен кейс <профи>  ➣  магазин`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 🔔 ➣ Вы открыли кейс <профи> 🔔\n 🐩 ➣ Вам выпало: ${item.case}\n 💰 ➣ Цена: ${spaces(item.price)}💰\n🆔 ➣ skin  ${item.skinid} \n⚠ ➣ Просмотр ваших кейсов:  кейсы\n⚠ ➣ Просмотр оружия:  оружие`, {
				attachment: guuns
			});
		}
		if (text == 5) {
			if (user.casethree < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас не куплен кейс <легендарный>  ➣  магазин`, {attachment: guuns });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n 🔔 ➣ Вы открыли кейс <легендарный> ➣ 🔔\n 🐩 ➣ Вам выпало: ${item.case}\n 💰 ➣ Цена: ${spaces(item.price)}💰\n🆔 ➣ skin ${item.skinid} \n⚠ ➣ Просмотр ваших кейсов: кейсы\n⚠ ➣ Просмотр оружия:  оружие`, {attachment: guuns })
		} else {
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔔 ➣ Проверьте вводимые данные.`, {attachment: errors});
		}
	})
	////////////////
	cmd.on(/^(?:оружие)/i, 'cinfo', 0, message => {
		bot.botflood += 1;
		if (!cases[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас нет кейсов. Купите в:  магазин.`, {attachment: guuns });
		let text = ``;
		text += `💼 ➣ Ваши оружия:\n`;
		let cese = cases[message.user];
		for (let id in cese.cases) {
			text += `➡ ➣ ${cases[message.user].cases[id].name}  ➣ 🆔 skin ${id}\n`;
		}
		text += `\n🆔 ➣ Продажа оружия:  продать ID\n🔫 ➣ Взять оружие: "выбрать ID" (оружия)`, {attachment: guuns };
		return message.send(text);
	});
	//////////////
	cmd.on(/^(?:продать)\s?([0-9]+)?/i, 'кейс', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🆔 ➣ Укажите ид скина.  ➣ Кмд:  оружие`, {attachment: guuns });
		if (!cases[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас нет кейсов. Купите в: магазин.`, {attachment: guuns });
		let user = acc.users[message.user];
		let idcase = message.args[1];
		if (!cases[message.user].cases[idcase]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💼 ➣ У вас нет такого скина. | скины:  оружие`, {attachment: guuns });
		if (idcase == cases[message.user].cases[idcase].skinid) {
			let price = cases[message.user].cases[idcase].price * cases[message.user].cases[idcase].copii;
			let name = cases[message.user].cases[idcase].name;
			user.balance += price;
			delete cases[message.user].cases[idcase];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#128142; ➣ Вы продали все скины <${name}>\n&#128179; ➣ Общая сумма продажи: ${spaces(price)}`, {attachment: guuns });
		}
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎃 ➣ У вас нет такого скина.  ➣ Скины:  оружие`, {attachment: guuns });
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
		case: "Dragon Lore",
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
		case: "Dragon Lore",
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
		if (user.donate < 50) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Покупка Майнинг-Фермы стоит 50 доната  ➣ Кмд:  донат`, {attachment: mineferm});
		user.donate -= 50;
		if (ferm[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💶 ➣ У вас уже куплена Майнинг-Ферма: ферма `, {attachment: mineferm});
		if (!ferm[message.user]) {
			ferm[message.user] = {
				owner: message.user,
				level: 1,
				dohod: 2,
				lvlup: 50
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💶 ➣ Вы купили Майнинг-Ферму. Инфа:  ферма `, {attachment: mineferm});
		}
	});
	cmd.on(/^фортуна$/i, "крутить", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
    💠 Призы рулетки 💠
    💠 ➣ Подписка 'Все включено'. 
    💠 ➣ Донат.
    💠 ➣ Опыт.
    💠 ➣ БитКоины.
    💠 ➣ Валюта.

    ✳ ➣ Цена прокрутки: 30 доната.
    ✳ ➣ Команда: 'крутить'
    `, {attachment: fortyn});
	});
 
	////////////////////////////
	cmd.on(/^крутить$/i, "крутить", 0, (message, args) => {
		bot.botflood += 1;
		let user = acc.users[message.user];
		if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		if(bost[message.user].bostexs){
		   if(bost[message.user].fort == true){
		   	if (user.donate < 20) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Прокрутка рулетки стоит 20 доната.`, {attachment: fortyn});
			user.donate -= 20;
		   }else{
		   	if (user.donate < 30) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Прокрутка рулетки стоит 30 доната.`, {attachment: fortyn});
			user.donate -= 30;
		   }
		}

		 
		let balan = rand(350000, 550000);
		let win = rand(1, 6);
		if (win == 1) {
			let win2 = rand(1, 3);
			if (win2 == 1) {
				let win3 = rand(1, 3);
				if (win3 == 3) {
					if (user.level > 1) {
						user.balance += 500000;
						return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Вы выиграли 500.000💰`, {attachment: fortyn});
					}
					user.level = 1;
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👑 ➣ Вы выиграли подписку 'Все включено'.\n👑 ➣ Команды привилегии: "ппомощь"`, {attachment: fortyn});
				}
			} else {
				user.balance += balan;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Вы выиграли ${spaces(balan)}💰`, {attachment: fortyn});
			}
			if (win2 > 1) {
				user.balance += balan;
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Вы выиграли ${spaces(balan)}💰`, {attachment: fortyn});
			}
		}
		if (win == 2) {
			user.balance += balan;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Вы выиграли ${spaces(balan)}💰`, {attachment: fortyn});
		}
		if (win == 3) {
			let balenc = balan - 5000;
			user.balance += balenc;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💠 ➣ Вы выиграли ${spaces(balenc)}💰`, {attachment: fortyn});
		}
		if (win == 4) {
			let don = rand(24, 36);
			user.donate += don;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💎 ➣ Вы выиграли ${spaces(don)} доната.`, {attachment: fortyn});
		}
		if (win == 5) {
			let exs = rand(35, 60);
			user.exs += exs;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Вы выиграли ${spaces(exs)} опыта.`, {attachment: fortyn});
		}
		if (win == 6) {
			let bit = rand(3, 7);
			user.bitcoin += bit;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n✨ ➣ Вы выиграли ${spaces(bit)} БитКоина.`, {attachment: fortyn});
		}
	});
	//////////////////////////  донат
	cmd.on(/^(?:донат|donat|donate)/i, "донат", 0, (message, args) => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),

 	 💰 Донат-меню:
    ⛔ ➣ Ваш баланс: ${spaces(acc.users[message.user].donate)} доната 

💎 » Addclan - цена создания клана 50 доната! 
💎 » Купить ферму - майнинг-ферма 100 доната! 
💎 » Информация о ферме - ферма 

🔸Привилегии: 
🔸 » Подписка 'Все включено' 
💭 » Инфо: подписка

🔹 » Сутки — > 50р 
🔹 » Неделя — > 200р 
🔹 » 2 недели — > 350р 
🔹 » Месяц — > 650р
🔹 » Навсегда — > 800р
➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖ ➖

🔸 » Разбан - 50 рублей. 
⚠ » 1.000.000💰 - 100 рублей. 
⚠ » 1 донат - 1 рубль. 

📌 » Купить донат: 
⚠🔸 » https://vk.com/alenka.shok - через основателя!
 	 	`, {attachment: dons })
	});

 
	cmd.on(/^(?:бот)$/i, "бот", 0, (message, args) => {
		bot.botflood += 1;
		let people = 0;
		let banned = 0;
		let balance = 0;
		let coder = 1;
		let vip = 0;
		let moder = 0;
		let admin = 0;
		let devel = 0;
		let cmd = botinfo.msg;
		let developer = '';
		let chatt = 0;
		let pepchat = 0;
		let peps = 0;

for(let id in acc.users) {																																																																																																																					
     			 people += 1;
     			 if(acc.users[id].level == -1) banned += 1;
     			 if(acc.users[id].level == 1) vip += 1;
     			 if(acc.users[id].level == 2) moder += 1;
     			 if(acc.users[id].level == 3) admin += 1; 

 } 
 		 

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
	ᅠ💻 » Проект: [bot.avrora| Бот Аврора]
	ᅠ⚙ » Название бота: [bot.avrora| Бот Аврора] 
	ᅠ📎 » Основатель: @alenka.shok(Даня Вайн)
	ᅠ👤 » Разработчик (кодер): @linius1337(Хуй Бойцов)
	ᅠ👤 » Разработчик (кодер): @thepipidon(Игорь Гаст)
	ᅠ🌺 » Гл.Администратор: @s3rv3rerr0r(Никита Безлер)
	ᅠ🌺 » Гл.Администратор: @ro_sv(Роман Свиридонов)
	ᅠ✒ » Дизайнер: @brainbooom(Продажный)

	📚 Интересное: 
	🆕 » Обновление: 04.06
	✉ » Актив в беседах/группе:
	✉ » Собщений в группе: 93
	✉ » Сообщений в беседах: 2307 

	📥 » Обработано команд: 2929677 
	📊 » Аптайм: (0:0:0:39)
	📊 » Пинг: 14ms

	👪 » Всего пользователей: 3602 
	👪 » Из них:
	👦 » Пользователей: 3.602 
	👼 » Кодеров: 1

	📌 » Подписок: 
	🎅 » 'Все включено': 2 

	⚠ » Наша группа: [bot.avrora| Бот Аврора]
	🆘 » Страничку бота могут заблокировать, а так вы нас не потеряете

        `, {attachment: bbots });
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
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
🚘 ➣ Машины: 
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
    `, {attachment: mashina });     
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
		if (car[message.user].carid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚗 ➣ У вас нету машины.\n🚗 ➣ Список машин: Машины`, {attachment: mashina });
		let name = car[message.user].carname;
		let price = car[message.user].price / 2;
		user.balance += price;
		car[message.user].carid = false;
		car[message.user].carname = "Отсутствует";
		car[message.user].price = 0;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚙 ➣ Вы продали машину ${name} за ${spaces(price)} 💰`, {attachment: mashina });
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
		if (car[message.user].carid != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚗 ➣ У вас уже есть машина: ${car[message.user].carname}\n🚗 ➣ Чтобы купить новую - продайте ее.\n🚗 ➣ Команда:  машина продать`, {attachment: mashina });
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Укажите 🆔 машины`, {attachment: mashina });
		let text = Number(message.args[1]);
		if (text == 1) {
			let name = `Ваз 1111`
			if (user.balance < 24000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Ваз 1111 стоит 24.000 💰.`, {attachment: kyplens });
			user.balance -= 24000;
			car[message.user].carid = 1;
			car[message.user].carname = "Ваз 1111";
			car[message.user].price = 24000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 24.000 💰`, {attachment: kyplens });
		}
		if (text == 2) {
			let name = `Ваз 2101`
			if (user.balance < 50000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 50.000 💰.`, {attachment: kyplens });
			user.balance -= 50000;
			car[message.user].carid = 2;
			car[message.user].carname = name;
			car[message.user].price = 50000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 50.000 💰`, {attachment: kyplens });
		}
		if (text == 3) {
			let name = `Ваз 2103`
			if (user.balance < 80000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 80.000 💰.`, {attachment: kyplens });
			user.balance -= 80000;
			car[message.user].carid = 3;
			car[message.user].carname = name;
			car[message.user].price = 80000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 80.000 💰`, {attachment: kyplens });
		}
		if (text == 4) {
			let name = `Ваз 2110`
			if (user.balance < 140000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 140.000 💰.`, {attachment: kyplens });
			user.balance -= 140000;
			car[message.user].carid = 4;
			car[message.user].carname = name;
			car[message.user].price = 140000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 140.000 💰`, {attachment: kyplens });
		}
		if (text == 5) {
			let name = `Лада X-Ray`
			if (user.balance < 210000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 210.000 💰.`, {attachment: kyplens });
			user.balance -= 210000;
			car[message.user].carid = 5;
			car[message.user].carname = name;
			car[message.user].price = 210000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 210.000 💰`, {attachment: kyplens });
		}
		if (text == 6) {
			let name = `BMW E30`
			if (user.balance < 430000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 430.000 💰.`, {attachment: kyplens });
			user.balance -= 430000;
			car[message.user].carid = 6;
			car[message.user].carname = name;
			car[message.user].price = 430000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 430.000 💰`, {attachment: kyplens });
		}
		if (text == 7) {
			let name = `Mitsubishi Lancer`
			if (user.balance < 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 1.000.000 💰.`, {attachment: kyplens });
			user.balance -= 1000000;
			car[message.user].carid = 7;
			car[message.user].carname = name;
			car[message.user].price = 1000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 1.000.000 💰`, {attachment: kyplens });
		}
		if (text == 8) {
			let name = `Mercedes-Benz S`
			if (user.balance < 2800000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 2.800.000 💰.`, {attachment: kyplens });
			user.balance -= 2800000;
			car[message.user].carid = 8;
			car[message.user].carname = name;
			car[message.user].price = 2800000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 2.800.000 💰`, {attachment: kyplens });
		}
		if (text == 9) {
			let name = `Audi A7`
			if (user.balance < 3200000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 3.200.000 💰.`, {attachment: kyplens });
			user.balance -= 3200000;
			car[message.user].carid = 9;
			car[message.user].carname = name;
			car[message.user].price = 3200000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 3.200.000 💰`, {attachment: kyplens });
		}
		if (text == 10) {
			let name = `Porsche Cayenne`
			if (user.balance < 5700000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 5.700.000 💰.`, {attachment: kyplens });
			user.balance -= 5700000;
			car[message.user].carid = 10;
			car[message.user].carname = name;
			car[message.user].price = 5700000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 5.700.000 💰`, {attachment: kyplens });
		}
		if (text == 11) {
			let name = `Toyota Camry`
			if (user.balance < 7800000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 7.800.000 💰.`, {attachment: kyplens });
			user.balance -= 7800000;
			car[message.user].carid = 11;
			car[message.user].carname = name;
			car[message.user].price = 7800000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 7.800.000 💰`, {attachment: kyplens });
		}
		if (text == 12) {
			let name = `Mercedes-Benz G`
			if (user.balance < 12300000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 12.300.000 💰.`, {attachment: kyplens });
			user.balance -= 12300000;
			car[message.user].carid = 12;
			car[message.user].carname = name;
			car[message.user].price = 12300000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 12.300.000 💰`, {attachment: kyplens });
		}
		if (text == 13) {
			let name = `Lamborghini Veneno`
			if (user.balance < 20000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 20.000.000 💰.`, {attachment: kyplens });
			user.balance -= 20000000;
			car[message.user].carid = 13;
			car[message.user].carname = name;
			car[message.user].price = 20000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 20.000.000 💰`, {attachment: kyplens });
		}
		if (text == 14) {
			let name = `Tesla Roadster`
			if (user.balance < 27000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 27.000.000 💰.`, {attachment: kyplens });
			user.balance -= 27000000;
			car[message.user].carid = 14;
			car[message.user].carname = name;
			car[message.user].price = 27000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 27.000.000 💰`, {attachment: kyplens });
		}
		if (text == 15) {
			let name = `Thrust SSC`
			if (user.balance < 48000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 48.000.000 💰.`, {attachment: kyplens });
			user.balance -= 48000000;
			car[message.user].carid = 15;
			car[message.user].carname = name;
			car[message.user].price = 48000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 48.000.000 💰`, {attachment: kyplens });
		}
		if (text == 16) {
			let name = `Mazda CX-5`
			if (user.balance < 120000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 120.000.000 💰.`, {attachment: kyplens });
			user.balance -= 120000000;
			car[message.user].carid = 16;
			car[message.user].carname = name;
			car[message.user].price = 120000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 120.000.000 💰`, {attachment: kyplens });
		}
		if (text == 17) {
			let name = `DeLorean DMC-12`
			if (user.balance < 210000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 210.000.000 💰.`, {attachment: kyplens });
			user.balance -= 210000000;
			car[message.user].carid = 17;
			car[message.user].carname = name;
			car[message.user].price = 210000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 210.000.000💰`, {attachment: kyplens });
		}
		if (text == 18) {
			let name = `DeLorean DMC-12`
			if (user.balance < 376000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 376.000.000💰.`, {attachment: kyplens });
			user.balance -= 376000000;
			car[message.user].carid = 18;
			car[message.user].carname = name;
			car[message.user].price = 376000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 376.000.000💰`, {attachment: kyplens });
		}
		if (text == 19) {
			let name = `Koenigsegg Agera R`
			if (user.balance < 600500000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 600.500.000💰.`, {attachment: kyplens });
			user.balance -= 600500000;
			car[message.user].carid = 19;
			car[message.user].carname = name;
			car[message.user].price = 600500000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 600.500.000💰`, {attachment: kyplens });
		}
		if (text == 20) {
			let name = `Bugatti Chiron`
			if (user.balance < 980000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ ${name} стоит 980.000.000💰.`, {attachment: kyplens });
			user.balance -= 980000000;
			car[message.user].carid = 20;
			car[message.user].carname = name;
			car[message.user].price = 980000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🚘 ➣ Вы купили ${name} за 980.000.000💰`, {attachment: kyplens });
		}
	});
	////////////////////////////////////////
	cmd.on(/^(?:владельцы)$/i, 'владельцы', 0, message => {
		bot.botflood += 1;
		let text = '';
		text += '🔥 Владельцы бизнесов 🔥\n'
		for (let id in biz) {
			if (biz[id].id > 0) {
				text += `👨‍💼️ ➣ @id${id}(${acc.users[id].prefix})  ➣ ${biz[id].name}\n`
			}
		}
		return message.send(text, {attachment: bizzs });  
	});

	cmd.on(/^(?:бизинфо)$/i, 'бизнесы', 0, message => {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n
        📖 ➣  Доступные команды: 
        📓 ➣  Бизменю - информация о бизнесе. 

        💸 ➣  Раздать <сумма> - раздать деньги рабочим.
        🤵 ➣  Бизнес нанять ID - нанять работника.
        🤵 ➣  Уволить ID - уволить работника.
        🤵 ➣  Рабочие - список работников.
        🤵 ➣  1 работник дает +50.000 💰 . 

        💰 ➣  Прибыль можно собирать каждые 2 часа
        💰 ➣  'Бизнес снять'  команда для снятия прибыли. 

        💸 ➣  Бизнес снять [кол-во] - счет бизнеса. 
        💡 ➣  Для продажи: "бизнес продать [ID] [Цена]". 
        💸 ➣  Покупка: "бизнес купить ID".
 
        `, {attachment: bizzs }); 
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
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
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

        📓 ➣ Бизинфо - информация о бизнесах и их команды!
        💸 ➣  Покупка: "бизнес купить ID".
 
        `, {attachment: bizzs }); 
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

		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ Введите сумму для раздачи работникам вашего бизнеса.`, {attachment: bizzs });
		let amount = parserInt(message.args[1]); 
		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: bizzs });
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть больше 0`, {attachment: bizzs });
		let id = acc.users[message.user].clanid;   
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  Раздавать деньги может только владелец бизнеса!`, {attachment: bizzs })
		if(amount > biz[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ На счету бизнеса нет столько 💰`, {attachment: bizzs });
		biz[message.user].balance -= amount;
		let sum = Math.round(amount / biz[message.user].people);
		for(ids in biz[message.user].users){
			acc.users[ids].balance += sum;
		}
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ Каждый участник бизнеса получил по ${sum} 💰 `, {attachment: bizzs });
	});
 	cmd.on(/^(?:рабочие)$/i, 'рабочие', 0, message => {
		bot.botflood += 1;
		text = `👻 ➣ Рабочие вашего бизнеса: \n`;
		for(id in biz[message.user].users){
			text += `👻 ➣ ID: ${id} |  @id${id}(${acc.users[id].prefix})\n`;
		}
		text += `\n👉 ➣ Для увольнения рабочего: Уволить ID`, {attachment: bizzs };
		return message.send(text);
	});
 	cmd.on(/^(?:уволить)\s?([0-9]+)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Укажите ID человек, кого хотите уволить.`, {attachment: bizzs });
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
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣  Увольнять может только владелец бизнеса!`, {attachment: bizzs })
		if (!biz[message.user].users[id]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Этот человек не был нанят.`, {attachment: bizzs });
		if (acc.users[id].job != false){
			acc.users[id].jobname = false;
			acc.users[id].job = false;
			delete biz[message.user].users[id];
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📋 ➣ Вы успешно уволили человека.`, {attachment: bizzs });
		}	
	});

	cmd.on(/^(?:бизнес купить)\s?([0-9]+)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Укажите ID бизнеса который хотите купить.\n📊 ➣ Команда: бизнесы`, {attachment: bizzs });
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
		if (biz[message.user].id != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ У вас уже куплен бизнес. Команды: бизменю`, {attachment: bizzs });
		let text = Number(message.args[1]);
		if (text == 1) {
			if (biz.one >= 15) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.balance < 10000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет столько 💰.`, {attachment: bizzs });
			user.balance -= 10000000;
			biz.one += 1;
			biz.number += 1;
			biz[message.user].id = 1;
			biz[message.user].name = "Телега с хот-догами";
			biz[message.user].price = 10000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Телега с хот-догами'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (5 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 2) {
			if (biz.two >= 13) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.balance < 50000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет столько 💰.`, {attachment: bizzs });
			user.balance -= 50000000;
			biz.two += 1;
			biz.number += 1;
			biz[message.user].id = 2;
			biz[message.user].name = "Ларёк с шаурмой";
			biz[message.user].price = 50000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Ларёк с шаурмой'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (10 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 3) {
			if (biz.three >= 12) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.balance < 100000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 100.000.000 💰.`, {attachment: bizzs });
			user.balance -= 100000000;
			biz.three += 1;
			biz.number += 1;
			biz[message.user].id = 3;
			biz[message.user].name = "Закусочная";
			biz[message.user].price = 100000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Закусочная'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (20 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 4) {
			if (biz.four >= 10) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.donate < 500) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 500 💎.`, {attachment: bizzs });
			user.donate -= 500;
			biz.four += 1;
			biz.number += 1;
			biz[message.user].id = 4;
			biz[message.user].name = "Ферма";
			biz[message.user].price = 500;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Ферма'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (30 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 5) {
			if (biz.five >= 8) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.donate < 1000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 1.000 💎.`, {attachment: bizzs });
			user.donate -= 1000;
			biz.five += 1;
			biz.number += 1;
			biz[message.user].id = 5;
			biz[message.user].name = "Молокозавод";
			biz[message.user].price = 1000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Телега с хот-догами'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (40 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 6) {
			if (biz.six >= 6) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.donate < 1500) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 1.500 💎.`, {attachment: bizzs });
			user.donate -= 1500;
			biz.six += 1;
			biz.number += 1;
			biz[message.user].id = 6;
			biz[message.user].name = "Ресторан";
			biz[message.user].price = 1500;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Телега с хот-догами'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (50 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 7) {
			if (biz.seven >= 4) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.donate < 3000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 3.000 💎.`, {attachment: bizzs });
			user.donate -= 3000;
			biz.seven += 1;
			biz.number += 1;
			biz[message.user].id = 7;
			biz[message.user].name = "Нефтевышка";
			biz[message.user].price = 3000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес 'Нефтевышка'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID (60 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
		if (text == 8) {
			if (biz.eight >= 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Данный тип бизнеса - распродан.`, {attachment: bizzs });
			if (user.donate < 10000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот бизнес стоит 10.000 💎.`, {attachment: bizzs });
			user.donate -= 10000;
			biz.eight += 1;
			biz.number += 1;
			biz[message.user].id = 8;
			biz[message.user].name = "[В]Контакте";
			biz[message.user].price = 10000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили бизнес '[В]Контакте'\n💡 ➣ Для работы бизнеса - наймите рабочих.\n📊 ➣ Бизнес нанять ID  (1000 max)\n 🤵 ➣ 1 работник дает +50.000 💰\n💰 ➣  Прибыль приходит каждые 2 часа.`, {attachment: bizzs });
		}
	});
	cmd.on(/^(?:бизнес нанять)\s?([0-9]+)?$/i, 'бизнес нанять', 0, message => {
		bot.botflood += 1;
		let id = message.args[1];
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Укажите ID человека, кого хотите нанять.`, {attachment: bizzs });
		if (!biz[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		if (!job[id]) {
			job[id] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if(job[id].id != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Данный человек где-то работает.`, {attachment: bizzs });
		if (biz[message.user].id == 1) {
			if (biz[message.user].people >= 5) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 2) {
			if (biz[message.user].people >= 10) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 3) {
			if (biz[message.user].people >= 20) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 4) {
			if (biz[message.user].people >= 30) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 5) {
			if (biz[message.user].people >= 40) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 6) {
			if (biz[message.user].people >= 50) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 7) {
			if (biz[message.user].people >= 60) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if (biz[message.user].id == 8) {
			if (biz[message.user].people >= 1000) {
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Для данного типа бизнеса - вы наняли максимальное число работников.`, {attachment: bizzs });
			}
		}
		if(acc.users[id].job == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Данного рабочего уже наняли.`, {attachment: bizzs });
		if(!biz[message.user].users[id]){
			biz[message.user].users[id] = {
				id: false
			}
			acc.users[id].job = true;
			acc.users[id].jobname = `${biz[message.user].name}`;

		}else{
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤵 ➣ Вы уже наняли этого работника.`, {attachment: bizzs });
		}
		let user = acc.users[message.user]; 
		biz[message.user].people += 1;
		biz[message.user].dohod += 50000;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы успешно наняли 1 работника.\n💸 Информация о бизнесе: бизменю`, {attachment: bizzs });
	})
	cmd.on(/^(?:бизменю)$/i, 'бизнес нанять', 0, message => {
		bot.botflood += 1;
		if (!biz[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
        ~Бизнес меню~
        🏣 Название: ${biz[message.user].name}
        💸 Доход: ${trueSpaces(biz[message.user].dohod)}💰 каждые 2 часа..
        🤵 Работников: ${biz[message.user].people}
        💰 Баланс бизнеса: ${trueSpaces(biz[message.user].balance)}💰

        💰 ➣  Прибыль можно собирать каждые 2 часа
        💰 ➣  'Снять'  команда для снятия прибыли. 
        `, {attachment: bizzs });
	});


	cmd.on(/^(?:бизнес снять)\s?([^\s	].*)?$/i, 'купить бизнес', 0, message => {
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), введите сумму`)
		let amount = parserInt(message.args[1]);
		if(!commands[message.user]){
			commands[message.user] = {
				command: {
				giverub: false,
				pay: true,
				addvip: false,
				addmoder: false,
				addadmin: false,
				givedonate: false,
				giveexs: false,
				ban: false,
				unban: false,
				tempban: false,
				removerub: false,
				bankbiz: true,
				reportban: false,
				top: false                
			}
		}
		}
		if (commands[message.user].command['bankbiz'] == false) return message.send(`✨ ➣ Администратор заблокировал вам:\n✨ ➣ Вклад/снятие с бизнеса/клана`, {attachment: bizzs });
		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), сумма должна быть цифрой.`);
		if (!biz[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		let user = acc.users[message.user]; 
		if (amount > biz[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ На балансе бизнеса нет такой суммы.`, {attachment: bizzs });
		let text = Number(amount);
		user.balance += text;
		biz[message.user].balance -= text;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы успешно сняли ${spaces(amount)} со счета бизнеса.`, {attachment: bizzs });
	});
	/////////////////////////////////////////////\
	cmd.on(/^(?:бизнес продать)/i, "кик", 0, (message, args) => {
		bot.botflood += 1;
		if (!biz[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`, {attachment: bizzs });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за ${spaces(summ)} 💰.`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`, {attachment: bizzs });
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
				acc.users[id].jobname = `Отсутствует`;
				delete biz[message.user].users[id];
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🏣 Вы успешно продали бизнес за: ${spaces(summ)}💎`, {attachment: bizzs });
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
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Укажите ID работы куда хотите устроится.\n📊 ➣ Команда: работы`, {attachment: joobs });
		if (message.args[1] > 11) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📍 ➣ Вы указали неверный ID работы`, {attachment: joobs });
		if (message.args[1] < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📍 ➣ Вы указали неверный ID работы`, {attachment: joobs });
		if (biz[message.user].id != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Устроиться на работу можно, если у вас нет бизнеса.`, {attachment: joobs });
		if(acc.users[message.user].jobname != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📍 ➣ Вы уже работаете в бизнесе.\n📍 ➣ Для увольнения пишите: 'Уволиться'`, {attachment: joobs });
		let user = acc.users[message.user];
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if (job[message.user].id != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Вы уже устроены на работу  ➣ Команда: работа`, {attachment: joobs });
		let text = Number(message.args[1]);
		if (text == 1) {
			if (user.exs < 5) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 5+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 1;
			job[message.user].name = "Шахтер";
			job[message.user].dohod = 20000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Шахтер'\n📊 ➣ Доход 20.000р в час.`, {attachment: joobs });
		}
		if (text == 2) {
			if (user.exs < 300) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 300+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 2;
			job[message.user].name = "Водитель автобуса ";
			job[message.user].dohod = 40000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Водитель автобуса'\n📊 ➣ Доход 40.000р час.`, {attachment: joobs });
		}
		if (text == 3) {
			if (user.exs < 600) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 600+ опыта.`, {attachment: joobs });
			job[message.user].id = 3;
			job[message.user].name = " Гос. работник";
			job[message.user].dohod = 65000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: ' Гос. работник'\n📊 ➣ Доход 65.000 в час.`, {attachment: joobs });
		}
		if (text == 4) {
			if (user.exs < 1000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 1.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 4;
			job[message.user].name = "Директор банка";
			job[message.user].dohod = 100000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Директор банка'\n📊 ➣ Доход 100.000 в час.`, {attachment: joobs });
		}
		if (text == 5) {
			if (user.exs < 3000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 3.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 5;
			job[message.user].name = "Системный Администратор";
			job[message.user].dohod = 200000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Системный Администратор'\n📊 ➣ Доход 200.000 в час.`, {attachment: joobs });
		}
		if (text == 6) {
			if (user.exs < 5000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 5.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs }); 
			job[message.user].id = 6;
			job[message.user].name = "ИТ-менеджер";
			job[message.user].dohod = 300000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'ИТ-менеджер'\n📊 ➣ Доход 300.000 в час.`, {attachment: joobs });
		}
		if (text == 7) {
			if (user.exs < 8000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 8.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs }); 
			job[message.user].id = 7;
			job[message.user].name = "Юрист";
			job[message.user].dohod = 500000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Юрист'\n📊 ➣ Доход 500.000р в час.`, {attachment: joobs });
		}
		if (text == 8) {
			if (user.exs < 10000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 10.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs }); 
			job[message.user].id = 8;
			job[message.user].name = "Менеджер";
			job[message.user].dohod = 750000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Менеджер'\n📊 ➣ Доход 750.0000 в час.`, {attachment: joobs });
		}
		if (text == 9) {
			if (user.exs < 30000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 30.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs }); 
			job[message.user].id = 9;
			job[message.user].name = "Аналитик";
			job[message.user].dohod = 2000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Аналитик'\n📊 ➣ Доход 2.000.000 в час.`, {attachment: joobs });
		}
		if (text == 10) {
			if (user.exs < 80000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 80.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 10;
			job[message.user].name = "Дизайнер ";
			job[message.user].dohod = 7500000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Дизайнер '\n📊 ➣ Доход 5.000.000  в час.`, {attachment: joobs });
		}
		if (text == 11) {
			if (user.exs < 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Устроиться на работу можно при: 1.000.000+ опыта.\n📍 ➣ Опыт можно получить играя в игры`, {attachment: joobs });
			job[message.user].id = 11;
			job[message.user].name = "Наркоторговец ";
			job[message.user].dohod = 100000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы устроились на работу: 'Наркоторговец  '\n📊 ➣ Доход 100.000.000  в час.`, {attachment: joobs });
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📋 ➣ Вы успешно уволились.`, {attachment: joobs });
		}

		if (job[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📋 ➣ Увы, но вы нигде не работаете...`, {attachment: joobs });
		job[message.user].id = false;
		job[message.user].name = 'Отсутствует';
		job[message.user].dohod = 0;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💎 ➣ Вы уволились с работы.`, {attachment: joobs });
	});
	cmd.on(/^(?:работы)$/i, 'работы', 0, message => {
		bot.botflood += 1;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
Список доступных работ: 
➕ 1&#8419;. Шахтёр - 20.000 💰 / час - для устройства 5+ опыта!🔥
➕ 2&#8419;. Водитель автобуса - 40.000 💰 / час - для устройства 300+ опыта!🔥 
➕ 3&#8419;. Гос. работник - 65.000 💰 / час - для устройства 600+ опыта!🔥  
➕ 4&#8419;. Директор банка - 100.000 💰 / час - для устройства 1.000+ опыта!🔥 
➕ 5&#8419;. Системный администратор - 200.000 💰 / час - для устройства 3.000+ опыта!🔥 
➕ 6&#8419;. ИТ-менеджер - 300.000 💰 / час - для устройства 5.000+ опыта!🔥
➕ 7&#8419;. Юрист - 500.000 💰 / час - для устройства 8.000+ опыта!🔥 
➕ 8&#8419;. Менеджер - 750.000 💰 / час - для устройства 10.000+ опыта!🔥  
➕ 9&#8419;. Аналитик - 2.000.000 💰 / час - для устройства 30.000+ опыта!🔥 
➕ 1&#8419;0&#8419;. Дизайнер - 5.000.000 💰 / час - для устройства 80.000+ опыта!🔥
➕ 1&#8419;1&#8419;. Наркоторговец - 100.000.000 💰 / час - для устройства 1.000.000+ опыта!🔥
 
💡 ➣ Для усройства на работу "устроиться [номер]".  
💡 ➣ Для для того, чтобы уволиться "уволиться".

💰 ➣ Зарплату можно получать ежечасно.
💰 ➣ Командой: 'зарплата'.

        `, {attachment: joobs });
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
		if (job[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📋 Увы, но вы нигде не работаете...`, {attachment: joobs });
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📋 Информация о работе: 
➕ Вы: ${job[message.user].name}
➕ Доход в час: ${spaces(job[message.user].dohod)}💰

💰 ➣ Зарплату можно получать ежечасно.
💰 ➣ Командой: 'зарплата'.
 
        `, {attachment: joobs });
	});
	cmd.on(/^сейф/i, "сейф", 0, (message, args) => {
		bot.botflood += 1;
		if (!safe[message.user]) {
			safe[message.user] = {
				game: false,
				kod: false
			}
		}
		if (acc.users[message.user].safe == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔑 ➣ Взломать сейф можно раз в 10 минут.`);
		
		if (safe[message.user].game == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🗝 ➣  Вы уже начали взлом. Команда: "Взлом [код]"`);
		if (acc.users[message.user].safe == true) return;
		safe[message.user].game = true;
		safe[message.user].kod = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
  🏛 ➣ Вы начали взлом сейфа 🏛
  🔑 ➣ Ваша задача: подобрать код из 4 одинаковых цифр.
  🗝 ➣ Начать взлом: "Взлом [код]"
  🌚 ➣ Удачи!

  ⏩ ➣ К прочтению:  'таймеры' 
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
		if (acc.users[message.user].safe == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔑 ➣ Взломать сейф можно раз в 10 минут.`);
		if (safe[message.user].game == false) return;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🗝 ➣ Укажите код к сейфу.`);
		if (message.args[1] > 9999) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🗝 ➣ Код - состоит из 4 одинаковых символов.`);
		if (message.args[1] < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🗝 ➣ Код - состоит из 4 одинаковых символов.`);
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤑 ➣ Невероятно!\n🙊 ➣ Вы смогли угадать код\n🏛 ➣ Обыскивая сейф вы нашли:\n💴 ➣ ${spaces(summ)} 💰 и 20 опыта.\n⏩ ➣ К прочтению:  'таймеры' `, {attachment: win});
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
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🤠 ➣ Вы не угадали код.\n🤠 ➣ Вас задержали и оштрафовали.\n👤 ➣ Вы потеряли 2 опыта.\n🔑 ➣ Верный код был: ${nu}\n⏩ ➣ К прочтению:  'таймеры' `, {attachment: lose});
		}
	});
	//////////////////////////////////////////////////////////////
	cmd.on(/^рестарт/i, "рестарт", 4, (message, args) => {
		if (acc.users[message.user].admin.upadm != 5) return;
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
			for(id in timers.clan){
			   timers.clan[id].timers = false;
			} 
			for(id in timers.putclan){
			   timers.putclan[id].timers = false;
			}
			activ.message.people = 0;
			activ.group.people = 0;
			activ.group.time = `${logtime()} | ${logdata()} `;
			activ.message.time = `${logtime()} | ${logdata()} `;
			activ.message.msg = 0;
			activ.group.msg = 0;

		} 
		for (let id in acc.users) {
			if (!Number(acc.users[id].balance)) {
				acc.users[id].balance = 0; 
			}
			if (acc.users[id].balance < 0) {
				acc.users[id].balance = 0; 
			}
		}
		for (let id in biz) {
			if (!Number(biz[id].balance)) {
				biz[id].balance = 0; 
			}
			if (biz[id].balance < 0) {
				biz[id].balance = 0; 
			}
		}
		for (let id in clans) {
			if (!Number(clans[id].balance)) {
				clans[id].balance = 0; 
			}
			if (clans[id].balance < 0) {
				clans[id].balance = 0; 
			}
		}
		for (let id in commands) {
			if (commands[id].command['reportban'] == true) {
				commands[id].command['reportban'] = false 
			} 
		}
 		for (let id in mine) {
			if (mine[id].timer == true) {
				mine[id].timer = false
			} 
		}

		for (let id in timers.admin) { 
				timers.admin[id].free = false
				timers.admin[id].bost = true
		}
 
		return message.send(`🎉 ➣ Restart всего живого -_-`);
	});
	/////////////////////////////// 
	cmd.on(/^(?:activ)$/i, 'устроится', 4, message => {
		if(acc.users[message.user].level < 4) return;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
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
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
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
		if (phone[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📱 ➣ У вас нету телефона.`);
		user.balance += phone[message.user].price / 100 * 50;
		let price = phone[message.user].price / 100 * 50;
		phone[message.user].id = false;
		phone[message.user].name = "Отсутствует";
		phone[message.user].price = 0
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📱 ➣ Вы успешно продали телефон за ${price} 💰.`);
	});
	cmd.on(/^(?:телефон)\s?([0-9]+)?$/i, 'устроится', 0, message => {
		bot.botflood += 1;
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ Укажите ID телефона который хотите купить.\n📊 ➣ Команда: телефоны`);
		if (message.args[1] > 11) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📍 Вы указали неверный ID телефона`);
		if (message.args[1] < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📍 Вы указали неверный ID телефона`);
		let user = acc.users[message.user];
		if (!phone[message.user]) {
			phone[message.user] = {
				id: false,
				name: "Отсутствует",
				price: 0
			}
		}
		if (phone[message.user].id != false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💡 ➣ У вас уже куплен телефон  ➣ Продать: "телефон продать"`);
		let text = Number(message.args[1]);
		if (text == 1) {
			if (user.balance < 5400) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 5.400р`);
			user.balance -= 5400;
			phone[message.user].id = 1;
			phone[message.user].name = "Nokia 108";
			phone[message.user].price = 5400;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "Nokia 108"`);
		}
		if (text == 2) {
			if (user.balance < 140000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 140.000р`);
			user.balance -= 140000;
			phone[message.user].id = 2;
			phone[message.user].name = "Meizu M5";
			phone[message.user].price = 140000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "Meizu M5" `);
		}
		if (text == 3) {
			if (user.balance < 370000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 370.000р`);
			user.balance -= 370000;
			phone[message.user].id = 3;
			phone[message.user].name = "Sony Xperia XA";
			phone[message.user].price = 370000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "Sony Xperia XA" `);
		}
		if (text == 4) {
			if (user.balance < 780000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 780.000р`);
			user.balance -= 780000;
			phone[message.user].id = 4;
			phone[message.user].name = "iPhone SE";
			phone[message.user].price = 780000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "iPhone SE" `);
		}
		if (text == 5) {
			if (user.balance < 1005000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 1.005.000р`);
			user.balance -= 1005000;
			phone[message.user].id = 5;
			phone[message.user].name = "Xiaomi Mi Mix";
			phone[message.user].price = 1005000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "Xiaomi Mi Mix" `);
		}
		if (text == 6) {
			if (user.balance < 2400000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 2.400.000р`);
			user.balance -= 2400000;
			phone[message.user].id = 6;
			phone[message.user].name = "Samsung Galaxy S9";
			phone[message.user].price = 2400000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "Samsung Galaxy S9" `);
		}
		if (text == 7) {
			if (user.balance < 3000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Этот телефон стоит 3.000.000р`);
			user.balance -= 3000000;
			phone[message.user].id = 7;
			phone[message.user].name = "iPhone X";
			phone[message.user].price = 3000000;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Вы купили телефон: "iPhone X" `);
		}
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	cmd.on(/^(?:зарплата)$/i, 'зарплата', 0, message => {
		if (!job[message.user]) {
			job[message.user] = {
				id: false,
				name: "Отсутствует",
				dohod: 0
			}
		}
		if (job[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n📋 ➣ Увы, но вы нигде не работаете...`);
		if(!timers.job[message.user]){
			timers.job[message.user] = {
				timers: false
			}
		} 
		if(timers.job[message.user].timers == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Зарплату можно получать раз в час!`); 
		timers.job[message.user].timers = true;
			setTimeout(() => {
						timers.job[message.user].timers = false;
			}, 3600000)	

			if (job[message.user].id != false) {
				acc.users[message.user].bank += job[message.user].dohod;
			}

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💷 ➣ Зарплата успешно переведена на карту.`);
	});

	cmd.on(/^(?:прибыль)$/i, 'прибыль', 0, message => {
		if (!biz[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`);
		if (biz[message.user].id == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ У вас нет бизнеса. Купить: бизнес купить`); 
		if(!timers.biz[message.user]){
			timers.biz[message.user] = {
				timers: false
			}
		} 
		if(timers.biz[message.user].timers == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💸 ➣ Прибыль с бизнеса можно получать раз в 2 часа!`); 
		timers.biz[message.user].timers = true;
			setTimeout(() => {
						timers.biz[message.user].timers = false;
			}, 7200000)	

			biz[message.user].balance += biz[message.user].people * 50000;

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💷 ➣ Прибыль с бизнеса успешна переведена на карту.`);
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
cmd.on(/^(?:подарок)$/i, 'подарок', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		} 
 	if(bost[message.user].bostgame.activ == false) return message.send(`🎁 ➣ Подарок можно брать имею буст 'Увеличение шанса'`);
 	if(bost[message.user].bostgame.free == false) return message.send(`🎁 ➣ Вы уже брали подарок.`);
 	bost[message.user].bostgame.free = false;
 	let priz = rand(300000,700000);
 	acc.users[message.user].balance += priz;
 	return message.send(`🎁 ➣ Вы открыли подарок.\n🎁 ➣ Вы нашли: ${priz}💰`);

 	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:число)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		} 

		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором."); 
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПроверьте вводимые данные:\nⓂ ➣  число <ставка> <число(от 1 до 6)>`, {attachment: errors});
		if (!message.args[2]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПроверьте вводимые данные:\nⓂ ➣  число <ставка> <число(от 1 до 6)>`, {attachment: errors});
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nСтавка должна быть целым числом.`); 
  		if(amount > 10000){
  		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		let chis = message.args[2];
		if(chis > 6 || chis < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nЧисло должно быть от 1 до 6.`);
		let a = rand(1, 6);
		if(chis == a){
			user.balance += amount * 3;
			user.exs += 2;
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПоздравляю! \n🥇 ➣ Вы смогли угадать число!\n🎁 ➣ Получайте скорее вознаграждение!\n🎁 ➣ Утроенная ставка и 2 опыта.`, {attachment: win});
		}else{
			user.balance -= amount;
			if (acc.users[message.user].exs >= 1) {
				acc.users[message.user].exs -= 1;
			}
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nЭх...неудача... \n🔎 ➣ Угадать число не так-то просто!\n🎲 ➣ Попробуйте еще разок!\n😢 ➣ Вы потеряли ставку и 1 опыт.`, {attachment: lose});
		}
  		}else{
  			let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		let chis = message.args[2];
		if(chis > 6 || chis < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nЧисло должно быть от 1 до 6.`);
		let a = rand(1, 6);
		if(chis == a){
			user.balance += amount * 3; 
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПоздравляю! \n🥇 ➣ Вы смогли угадать число!\n🎁 ➣ Получайте скорее вознаграждение!\n🎁 ➣ Утроенная ставка.`, {attachment: win});
		}else{
			user.balance -= amount; 
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😔 ➣ Эх...неудача... \n🔎 ➣ Угадать число не так-то просто!\n🎲 ➣ Попробуйте еще разок!\n😢 ➣ Вы потеряли ставку.`, {attachment: lose});
		}
  		}
		l 
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cmd.on(/^(?:кубик)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}	
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором."); 
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Проверьте вводимые данные:\n🎲 ➣  кубик <ставка> чет/нечет`, {attachment: errors});
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`, {attachment: errors});    
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		let a = rand(1, 100);
		if(amount > 10000){
			if (a > 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				acc.users[message.user].exs += 2;
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣  Вам выпало 'число ${[`2`,`4`,`6`].random()}'  \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы выиграли: +${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.round(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`2`,`4`,`6`].random()}'\n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose}
				);
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.round(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose}
				);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				acc.users[message.user].exs += 2;
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы выиграли: ${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win}
				);
			}
		}
		}else{
			if (a > 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣  Вам выпало 'число ${[`2`,`4`,`6`].random()}'  \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы выиграли: +${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				user.balance -= Math.round(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`2`,`4`,`6`].random()}'\n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы проиграли: ${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose}
				);
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'чет') {
				user.balance -= Math.round(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы проиграли: ${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose}
				);
			}
			if (message.args[2].toLowerCase() == 'нечет') {
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ Вам выпало 'число ${[`1`,`3`,`5`].random()}' \n🎃 ➣ Вы ставили на [ ${message.args[2]} ]\n💵 ➣ Вы выиграли: ${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win}
				);
			}
		}
		}
		 

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎲 ➣ кубик ставка чет/нечет`);
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////--- монетка -----------
	cmd.on(/^(?:монетка)\s?([^\s].*)?\s(.*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		orel = 'photo459607222_456239719'; // DA
		reshka = 'photo459607222_456239720'; // NET
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nПроверьте вводимые данные:\nⓂ ➣  монетка ставка орел/решка`, {attachment: errors});
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`, {attachment: errors});  
		if(amount > 10000){
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		let a = rand(1, 100);
		///////////////////////////////////////////////////////////
		if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 			}

 			if (a > 30) {
			if (message.args[2].toLowerCase() == 'решка') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣  Вам выпала 'Решка' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: +${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпала 'Решка' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
				});
			}
		}
		if (a < 70) {
			if (message.args[2].toLowerCase() == 'решка') {
				if (acc.users[message.user].exs >= 1) {
					acc.users[message.user].exs -= 1;
				}
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: ${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
				});
			}
		}
 			
 		}
 		///////////////////////////////////////////////////////////
		if (a > 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣  Вам выпала 'Решка' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: +${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпала 'Решка' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: ${spaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
				});
			}
		}
	}else{
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(message.args[1] <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		let a = rand(1, 100);
		if (a > 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣  Вам выпала 'Решка' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: +${spaces(amount)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпала 'Решка' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
				});
			}
		}
		if (a < 50) {
			if (message.args[2].toLowerCase() == 'решка') {
				user.balance -= Math.floor(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#10062; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы проиграли: ${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: lose
				});
			}
			if (message.args[2].toLowerCase() == 'орел') {
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#9410; ➣ Вам выпал 'Орел' \n&#9989; ➣ Вы поставили [ ${message.args[2]} ]\n&#128179; ➣ Вы выиграли: ${spaces(amount)}💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {
					attachment: win
				});
			}
		}
	}
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n[Подсказка] ➣ монетка ставка орел/решка`);

	});
	//////////////////////////////////////
	// ---------- Рулетка Руссская ---------
	cmd.on(/^(?:рр)/i, 'ан', 0, message => {
		bot.botflood += 1;
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		if (acc.users[message.user].balance == 0) return message.reply("🔔 ➣ Играть в игры можно с балансом выше 0! 🔔");
		message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#128303; ➣  Вы начали игру &#128128;"Русская Рулетка"&#128128; \n&#128303; ➣ Задача: Нажать на курок. Вам дано 3 выстрела.\n&#128303; ➣ Если выиграете - баланс удвоится.\n&#128303; ➣ Проиграете - потеряете все.\n&#9888; ➣ Чтобы сделать выстрел отправьте &#128299;`);
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
					acc.users[message.user].balance += balance * 3;
					return message.reply("&#128520; ➣ Поздравляю! Вы выжили!\n&#128176; ➣ Ваш баланс утроился!", {attachment: win});
				}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#128299; ➣  Вы нажали на курок... \n&#128299; ➣ *пуля выстрелила в голову* | ` + rand + `\n&#128293; ➣ Вам повезло. Стреляйте дальше!\n&#128128; ➣ Осталось выстрелов: ` + p);
			}
			if (rand != "неуcпешно") {
				message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n&#128299; ➣ Вы нажали на курок... \n&#128299;  ➣ *пуля выстрелила в голову* | ` + rand + `\n&#128128; ➣ Удача повернулась к вам спиной.\n&#128128; ➣ Вы проиграли. Баланс анулирован. `, {attachment: lose});
				acc.users[message.user].balance -= balance;
				return acc.users[message.user].pp = 0;
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:бин)\s([^\s].*)\s(.*)/i, 'casino', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		if (chats[message.chat].game == 1) return message.send("Игры отключены Администратором.");
		if (!message.args[2]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Вы не указали ставку\n [Подсказка] ➣ бин вверх/вниз ставка`);
		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🔥 ➣ Вы не указали вверх/вниз\n [Подсказка] ➣ бин вверх/вниз ставка`);
		let amount = parserInt(message.args[2]);  
  		if(!Number(amount)) return message.send(`😈 ➣ Ставка должна быть целым числом.`);     
		let user = acc.users[message.user];
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0 💰` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		if(amount > 9999){
 
		let a = rand(1, 2);
		if (a == 1) {
			if (message.args[1].toLowerCase() == 'вверх') {
				let bin = rand(10, 100);
				acc.users[message.user].exs += 2;
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
			📊 ➣ Binary Option 
			📈 ➣ Курс акции вырос на — ${bin} %
			💳 ➣ Вы выиграли: ${spaces(amount)}💰.
			💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
			🔥 ➣ Вы получили +2 опыта.`, {attachment: win});
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
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📈 ➣ Курс акции вырос на — ${bin} %
💳 ➣ Вы проиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Вы потеряли 1 опыт.`, {attachment: lose});
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

				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📉 ➣ Курс акции упал на — ${bin} %
💳 ➣ Вы проиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Вы потеряли 1 опыт.`, {attachment: lose});
			}
		}
		if (message.args[1].toLowerCase() == 'вниз') {
			acc.users[message.user].exs += 2;
			let bin = rand(10, 100);
			user.balance += Math.round(amount);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📉 ➣ Курс акции упал на — ${bin} %
💳 ➣ Вы выиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🔥 ➣ Вы получили +2 опыта.`, {attachment: win});
		}
	}else{
		let a = rand(1, 2);
		if (a == 1) {
			if (message.args[1].toLowerCase() == 'вверх') {
				let bin = rand(10, 100);
				user.balance += Math.round(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📈 ➣ Курс акции вырос на — ${bin} %
💳 ➣ Вы выиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Опыт дается при ставке > 10.000💰`, {attachment: win});
			}
			if (message.args[1].toLowerCase() == 'вниз') {
				user.balance -= Number(amount);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }
				let bin = rand(10, 100);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📈 ➣ Курс акции вырос на — ${bin} %
💳 ➣ Вы проиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Опыт дается при ставке > 10.000💰`, {attachment: lose});
			}
		}
		if (a == 2) {
			if (message.args[1].toLowerCase() == 'вверх') {
				user.balance -= Math.round(amount);
				let bin = rand(10, 100);
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    }

				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📉 ➣ Курс акции упал на — ${bin} %
💳 ➣ Вы проиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Опыт дается при ставке > 10.000💰`, {attachment: lose});
			}
		}
		if (message.args[1].toLowerCase() == 'вниз') {
			let bin = rand(10, 100);
			user.balance += Math.round(amount);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
📊 ➣ Binary Option 
📉 ➣ Курс акции упал на — ${bin} %
💳 ➣ Вы выиграли: ${spaces(amount)}💰.
💰 ➣ Ваш баланс: ${spaces(user.balance)}💰
🌚 ➣ Опыт дается при ставке > 10.000💰`, {attachment: win});
		}
	}
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n[Подсказка] /бин вверх/вниз ставка`);
	});
	// -------------------------ставить код выше--------------------------------------------
 

cmd.on(/^(?:roll|рулетка|казино|ставка)\s?([^\s	].*)?/i, 'casino', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}	
		let user = acc.users[message.user];
		if (chats[message.chat].game === 1) return message.send("Игры отключены Администратором.");
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nВы не указали ставку`);
		let amount = parserInt(message.args[1]);   
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`);  
		if(isNaN(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nВы не указали ставку`);
		if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
			if(amount > 9999){
   	///////////////////////////////////////////////////////////
		if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 			if (rand(1, 100) > 89) {	
			acc.users[message.user].exs += 2;
			user.balance += Math.floor(amount);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍓🍓🍓','🍒🍒🍒', '🍊🍊🍊', '🍋🍋🍋', '💰💰💰'].random()}] - Джекпот!\n💰 ➣ Вы выиграли: +${trueSpaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: win});
			}else{
					if(acc.users[message.user].exs > 1){
						acc.users[message.user].exs -= 1;
					}
					user.balance -= Math.floor(amount);
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}] \n💰 ➣ Вы проиграли: 1 опыт и ${trueSpaces(amount)}💰\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: lose});
			}
 			}
 		}
			if (rand(1, 100) > 75) {	
			acc.users[message.user].exs += 2;
			user.balance += Math.floor(amount);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍓🍓🍓','🍒🍒🍒', '🍊🍊🍊', '🍋🍋🍋', '💰💰💰'].random()}] - Джекпот!\n💰 ➣ Вы выиграли: +${trueSpaces(amount)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: win});
			}else{
					if(acc.users[message.user].exs > 1){
						acc.users[message.user].exs -= 1;
					}
					user.balance -= Math.floor(amount);
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}] \n💰 ➣ Вы проиграли: 1 опыт и ${trueSpaces(amount)}💰\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: lose});
			}
		 	} else {
		 	if (rand(1, 100) > 75) {		 
			user.balance += Math.floor(amount);
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍓🍓🍓','🍒🍒🍒', '🍊🍊🍊', '🍋🍋🍋', '💰💰💰'].random()}] - Джекпот!\n💰 ➣ Вы выиграли: +${trueSpaces(amount)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: win});
			}else{
				user.balance -= Math.floor(amount);
			    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ Вам выпала комбинация [${['🍒🍊🍓','💰🍊🍒', '🍊🍊💰', '🍋🍊🍊', '💰🍓💰'].random()}] \n💰 ➣ Вы проиграли:  ${trueSpaces(amount)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${trueSpaces(user.balance)}`, {attachment: lose});
			}
		}
	})   

	cmd.on(/^(?:азино)\s?([^\s	].*)?/i, 'casino', 0, message => {
			bot.botflood += 1;
			 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
			let user = acc.users[message.user];
			if (chats[message.chat].game === 1) return message.send("😈 ➣ Игры отключены Администратором.");
			if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы не указали ставку`);
			let amount = parserInt(message.args[1]); 
	  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`);  
			if(isNaN(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы не указали ставку`);
			if (amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
				if(amount > 9999){
    	///////////////////////////////////////////////////////////
		if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 				if (rand(1, 100) > 88) {	
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ -- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;1&#8419;1&#8419;','7&#8419;7&#8419;7&#8419;', '3&#8419;3&#8419;3&#8419;', '0&#8419;0&#8419;0&#8419;', '7&#8419;7&#8419;7&#8419;'].random()}]  \n💰 ➣ Вы выиграли: +${spaces(amount)}💰\n🔥 ➣ Вы получили 2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
				}else{
						if(acc.users[message.user].exs > 1){
							acc.users[message.user].exs -= 1;
						}
						user.balance -= Math.floor(amount);
						return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ -- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;2&#8419;3&#8419;','7&#8419;7&#8419;1&#8419;', '7&#8419;3&#8419;6&#8419;', '2&#8419;2&#8419;7&#8419;', '6&#8419;6&#8419;9&#8419;    '].random()}]   \n💰 ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы потеряли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
				}

 			}
 		}
				if (rand(1, 100) > 75) {	
				acc.users[message.user].exs += 2;
				user.balance += Math.floor(amount);
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ -- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;1&#8419;1&#8419;','7&#8419;7&#8419;7&#8419;', '3&#8419;3&#8419;3&#8419;', '0&#8419;0&#8419;0&#8419;', '7&#8419;7&#8419;7&#8419;'].random()}]  \n💰 ➣ Вы выиграли: +${spaces(amount)}💰\n🔥 ➣ Вы получили 2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
				}else{
						if(acc.users[message.user].exs > 1){
							acc.users[message.user].exs -= 1;
						}
						user.balance -= Math.floor(amount);
						return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎰 ➣ -- Казино "AZINO 777 -- \n Вам выпала комбинация [${['1&#8419;2&#8419;3&#8419;','7&#8419;7&#8419;1&#8419;', '7&#8419;3&#8419;6&#8419;', '2&#8419;2&#8419;7&#8419;', '6&#8419;6&#8419;9&#8419;    '].random()}]   \n💰 ➣ Вы проиграли: ${spaces(amount)}💰\n🌚 ➣ Вы потеряли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
			 	}  
				}
});
 
cmd.on(/^(?:лотерея)\s?([0-9]+)?\s?([^\s	].*)?$/i, 'лотерея', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
		if(!message.args[2]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Укажите ставку.`)
		let stavka = parserInt(message.args[2]); 
  		if(!Number(stavka)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`);  
		let text = message.args[1];
		if(stavka > acc.users[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣  У вас нет столько 💰`);
		let user = acc.users[message.user];
		if(message.args[1] > 3) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
		if(message.args[1] < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Укажите клетку с числом (от 1 до 3)\n🆔 1 ➣ 🎫\n🆔 2 ➣ 🎫\n🆔 3 ➣ 🎫\n\n👒 ➣ Пример: 'лотерея ID(билета) <ставка>'`)
 		if(stavka > user.balance || stavka <= 0) return message.reply(stavka <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
   		if(stavka > 9999){
    	///////////////////////////////////////////////////////////
		if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 			}
 			if(rand(1,100) > 90){
		    user.balance += stavka * 2;
		    user.exs += 2;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете 2 опыта и удвоенную ставку.`, {attachment: win});
		  }else{
		    user.balance -= stavka;
		    user.exs -= 1;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
			if(acc.users[message.user].exs <= 0){
			    	acc.users[message.user].exs = 0;
			}
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли 1 опыт и свою ставку.`, {attachment: lose});
		  }

 		}
		  if(rand(1,100) > 80){
		    user.balance += stavka * 2;
		    user.exs += 2;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете 2 опыта и удвоенную ставку.`, {attachment: win});
		  }else{
		    user.balance -= stavka;
		    user.exs -= 1;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
			if(acc.users[message.user].exs <= 0){
			    	acc.users[message.user].exs = 0;
			}
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли 1 опыт и свою ставку.`, {attachment: lose});
		  }
		}else{
			if(rand(1,100) > 80){
		    user.balance += stavka * 2;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n🎫 ➣ Поздравляю! Вы угадали!\n🎫 ➣ Вы получаете удвоенную ставку.`, {attachment: win});
		  }else{
		    user.balance -= stavka;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    }
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👒 ➣ Увы... Вы не угадали...\n👒 ➣ В следующий раз повезет.\n👒 ➣ Вы проиграли  свою ставку.`, {attachment: lose});
		  }
		}
});


cmd.on(/^(?:ловушка)\s?([^\s	].*)?/i, 'ловушка', 0, message => {
  bot.botflood += 1;
   	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
  if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Укажите ставку`);	
  let user = acc.users[message.user];
  if(chats[message.chat].game == 1) return message.send("😈 ➣ Игры отключены Администратором.");
  let text = parserInt(message.args[1]); 
  if(!Number(text)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`); 
  if(!text) return message.send("😈 ➣ Укажите ставку!");
  if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы не указали ставку`);
  if(text > user.balance || text <= 0) return message.reply(text <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
  if(text > 9999){

  	///////////////////////////////////////////////////////////
	if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 			}
 	if(rand(1,100) > 88) {
        let win = text * 2;
        acc.users[message.user].balance += Math.round(win);   
        user.exs += 1;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы засунули руку в коробку...\n▪ ➣ Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 ➣ Вы выиграли:  ${spaces(win)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👉 ➣ Вы засунули руку в коробку...\n💀 ➣ Неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n💴 ➣ Вы проиграли:  ${spaces(win)}💰\n🔥 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
   
    } 		

 	}
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
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы засунули руку в коробку...\n▪ ➣ Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 ➣ Вы выиграли:  ${spaces(win)}💰\n🔥 ➣ Вы получили +2 опыта.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👉 ➣ Вы засунули руку в коробку...\n💀 ➣ Неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n💴 ➣ Вы проиграли:  ${spaces(win)}💰\n🔥 ➣ Вы проиграли 1 опыт.\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
   
    } 
}else{
	    if(rand(1,100) > 75) {
        let win = text * 2;
        acc.users[message.user].balance += Math.round(win);   
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Вы засунули руку в коробку...\n▪ ➣ Из нее вы достали -> [${['💶','💍', '💎', '💰', '🎁', '⚽'].random()}] \n💴 ➣ Вы выиграли:  ${spaces(win)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
    }else{
        let win = text;
        acc.users[message.user].balance -= Math.round(win);  
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👉 ➣ Вы засунули руку в коробку...\n💀 ➣ Неудача... Вы повредили руку -> [${['ловушкой','мышеловкой', 'капканом'].random()}] \n💴 ➣ Вы проиграли:  ${spaces(win)}💰\n🌚 ➣ Опыт дается при ставке > 10.000💰\n💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
   
    } 

}
})

cmd.on(/^(?:тир)\s?([0-9]+)?\s?([^\s	].*)?$/i, 'лотерея', 0, message => {
		bot.botflood += 1;
		 	if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		} 
		let user = acc.users[message.user];
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Укажите ID мишени (от 1 до 3)\n🆔 1 ➣ 👤\n🆔 2 ➣ 👤\n🆔 3 ➣ 👤\n\n👒 ➣ Пример: 'тир ID(мишени) <ставка>'`)
		if(!message.args[2]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Укажите ставку.`)
		let stavka = parserInt(message.args[2]); 
  		if(!Number(stavka)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`); 
		if(stavka > acc.users[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣  У вас нет столько 💰`);
		let text = message.args[1];   
		if(message.args[1] > 3) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Укажите ID мишени (от 1 до 3)\n🆔 1 ➣ 👤\n🆔 2 ➣ 👤\n🆔 3 ➣ 👤\n\n👒 ➣ Пример: 'тир ID(мишени) <ставка>'`)
		if(message.args[1] < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Укажите ID мишени (от 1 до 3)\n🆔 1 ➣ 👤\n🆔 2 ➣ 👤\n🆔 3 ➣ 👤\n\n👒 ➣ Пример: 'тир ID(мишени) <ставка>'`)
		if(stavka > user.balance || stavka <= 0) return message.reply(stavka <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
	  if(stavka > 9999){
	  	///////////////////////////////////////////////////////////
		if(bost[message.user].bostgame.activ == true){
 			bost[message.user].bostgame.count -= 1
 			if(bost[message.user].bostgame.count == 0){
 				bost[message.user].bostgame.activ = false;
 			}

 	if(rand(1,100) > 88){
	    user.balance += stavka;
	    user.exs += 2;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
	    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Поздравляю! Вы попали в голову!!\n👤 ➣ Вы получаете 2 опыта и свою ставку.`, {attachment: win});
	  }else{
	    user.balance -= stavka;
	    user.exs -= 1;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ Увы... Вы промазали...\n💀 ➣ В следующий раз повезет.\n💀 ➣ Вы проиграли 1 опыт и свою ставку.`, {attachment: lose});
  	}

 		}
 		///////////////////////////////////////////////////////////// 
	  	if(rand(1,100) > 73){
	    user.balance += stavka;
	    user.exs += 2;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
	    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Поздравляю! Вы попали в голову!!\n👤 ➣ Вы получаете 2 опыта и свою ставку.`, {attachment: win});
	  }else{
	    user.balance -= stavka;
	    user.exs -= 1;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
	    if(acc.users[message.user].exs <= 0){
			    acc.users[message.user].exs = 0;
		}
    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ Увы... Вы промазали...\n💀 ➣ В следующий раз повезет.\n💀 ➣ Вы проиграли 1 опыт и свою ставку.`, {attachment: lose});
  	}
}else{
	if(rand(1,100) > 76){
	    user.balance += stavka; 
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    } 
	    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n👤 ➣ Поздравляю! Вы попали в голову!!\n👤 ➣ Вы получаете свою ставку.`, {attachment: win});
	  }else{
	    user.balance -= stavka;
	    if(acc.users[message.user].balance <= 0){
	    	acc.users[message.user].balance = 0;
	    }
    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💀 ➣ Увы... Вы промазали...\n💀 ➣ В следующий раз повезет.\n💀 ➣ Вы проиграли свою ставку.`, {attachment: lose});
  	}
}
	   
});






cmd.on(/^(?:наперсток)\s?([^\s	].*)?$/i, "нап", 0, (message, args) => {
		let user = acc.users[message.user];
		bot.botflood += 1;
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Укажите ставку`);	 
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`);   
		if(amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		  
		if(naperst[message.user]){
		  return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Игра ~Наперсток~ угадай где 💰\n🆔1&#8419; | 📦\n🆔2&#8419;| 📦\n🆔3&#8419;| 📦\n📌 ➣ Выбирайте ID коробки  ➣  'выбор ID'`);
		}
		  
		if(!naperst[message.user]){
		  naperst[message.user] = {
		    one: false,
		    two: false,
		    three: false,
		    count: 0
		  }
		}
		 
		if(amount > user.balance || amount <= 0) return message.reply(amount <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может привышать баланс`);

		if(!amount) return message.send(`Укажите ставку!`);


		let win = rand(1,3);
		if(win == 1) naperst[message.user].one = true;
		if(win == 2) naperst[message.user].two = true;
		if(win == 3) naperst[message.user].three = true;

		naperst[message.user].count = amount;
		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Игра ~Наперсток~ угадай где 💰\n🆔1&#8419;| 📦\n🆔2&#8419;| 📦\n🆔3&#8419;| 📦\n📌 ➣ Выбирайте ID коробки ➣ 'выбор ID'`);
});

cmd.on(/^(?:выбор)\s?([0-9]+)?$/i, "нап", 0, (message, args) => {
		bot.botflood += 1;
 
 		let user = acc.users[message.user];
		if(!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Укажите 🆔 коробки.`);
		let text = Number(message.args[1]);  
		if(text > acc.users[message.user].balance) return message.send(`💰 ➣  У вас нет столько 💰`);
		if(text > 3) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Введите 🆔 от 1 до 3.`);
		if(text < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Введите 🆔 от 1 до 3.`);
		if(!naperst[message.user]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nВы не начали игру!  ➣ 'наперсток'`); 
		if(text > 9999){
			if(text == 1){
		  if(naperst[message.user].one == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили 2 опыта и ${naperst[message.user].count}💰`, {attachment: win});
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
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
		  }
		}
		if(text == 2){
		  if(naperst[message.user].two == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили 2 опыта и ${naperst[message.user].count}💰`, {attachment: win});
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
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
		  }
		}
		if(text == 3){
		  if(naperst[message.user].three == true){
		    user.balance += naperst[message.user].count;
		    user.exs += 2;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили 2 опыта и ${naperst[message.user].count}💰`, {attachment: win});
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
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
		  }
		}
		}else{	
		if(text == 1){
		  if(naperst[message.user].one == true){
		    user.balance += naperst[message.user].count;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили ${naperst[message.user].count}💰`, {attachment: win});
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
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
		  }
		}
		if(text == 2){
		  if(naperst[message.user].two == true){
		    user.balance += naperst[message.user].count;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили  ${naperst[message.user].count}💰`, {attachment: win});
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
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
		  }
		}
		if(text == 3){
		  if(naperst[message.user].three == true){
		    user.balance += naperst[message.user].count;
		    message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💥 ➣ Поздравляем! Вы угадали!\n🔥 ➣ Вы получили  ${naperst[message.user].count}💰`, {attachment: win});
		    return delete naperst[message.user];
		  }else{
		    user.balance -= naperst[message.user].count;
		    if(acc.users[message.user].balance <= 0){
		    	acc.users[message.user].balance = 0;
		    } 
		    delete naperst[message.user];
		    return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💣 ➣ Увы...Вы не угадали...`, {attachment: lose});
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
  		  if(!Number(text)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n😈 ➣ Ставка должна быть целым числом.`);  
		  if(text > 1000000) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Максимальная ставка для игры: 1.000.000💰 `);
		   if(text < 1) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣ Минимальная ставка для игры: 1💰 `);
		  if(text > acc.users[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n💰 ➣  У вас нет столько 💰`);
		  if(!text) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\nВы не указали ставку`);
		  if(text > user.balance || text <= 0) return message.reply(text <= 0 ? `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может быть меньше 0 или равна 0` : `🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Ставка не может превышать баланс`);
		  
		  if(text > 9999){

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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы победили!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы выиграли:  ${spaces(win)}💰
		        🔥 ➣ Вы получили: 2 опыта.
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы проиграли!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы проиграли:  ${spaces(win)}💰
		        🔥 ➣ Вы проиграли: 1 опыт.
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Ничья!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы получили:  ${spaces(win)}💰 
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы победили!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы выиграли:  ${spaces(win)}💰
		        🔥 ➣ Вы получили: 2 опыта.
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы проиграли!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы проиграли:  ${spaces(win)}💰
		        🔥 ➣ Вы проиграли: 1 опыт.
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Ничья!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы получили:  ${spaces(win)}💰 
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы победили!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы выиграли:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
		  } 
		  if(sumuser < sumbot) {
		        let win = text;
		        acc.users[message.user].balance -= Math.round(win);   
			    if(acc.users[message.user].balance <= 0){
			    	acc.users[message.user].balance = 0;
			    } 
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы проиграли!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы проиграли:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Ничья!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы получили:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы победили!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы выиграли:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
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
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Вы проиграли!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы проиграли:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: lose});
		  } 
		  if(sumuser == sumbot) {
		        let win = text / 2;
		        acc.users[message.user].balance += Math.round(win);   
		        return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),
		        🎰 ➣ Ничья!
		        🎲 ➣ Вам выпали кости: <${userchis}> и <${userchis1}>
		        🎲 ➣ Боту выпали кости: <${botchis}> и <${botchis1}>
		        💴 ➣ Вы получили:  ${spaces(win)}💰 
		        🌚 ➣ Опыт дается при ставке > 10.000💰
		        💰 ➣ Баланс: ${spaces(user.balance)}`, {attachment: win});
		  } 
		  }
   
})

//////////////////////////////////////////////////////////////////////////////////////////////////
 
cmd.on(/^(?:ссоздать)?(\s[^]+)?(\s[0-9]+)$/i, "создать", 4, (message, args) => { 
		if(acc.users[message.user].level < 4) return;
		if(!message.args[1]) return message.send(`✨ ➣ Пример: 'ссоздать <name> <sum>'\n✨ ➣ Запись без <>`);
		if(!message.args[2]) return message.send(`✨ ➣ Пример: 'ссоздать <name> <sum> '\n✨ ➣ Запись без <>`);

		let text = message.args[1].replace(/\s+/g, '');
		if(acc.users[message.user].level < 4) return;
		let count = message.args[2]; 

		if(!promo[text]){
		            	promo[text] = {
		            		count: Number(count),
		            		activ: 30,
		            		users: {}
		            	}
		}else{
			return message.send(`[Error] Пересоздайте код еще раз.`);
		}
		 

		return message.send(`
			📝 ➣ Промокод: ${text}
			🗝 ➣ Количество активаций: 30
			💰 ➣ Сумма рублей: ${spaces(count)}💰  
			`);

});


cmd.on(/^(?:создать)\s?([0-9]+)?\s?([^\s	].*)?/i, "создать", 4, (message, args) => { 
		if(acc.users[message.user].level < 4) return;
		if(!message.args[1]) return message.send(`✨ ➣ Пример: 'Создать <количество активаций> <сумма>'\n✨ ➣ Запись без <>`);
		if(!message.args[2]) return message.send(`✨ ➣ Пример: 'Создать <количество активаций> <сумма> '\n✨ ➣ Запись без <>`);
		 
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
			📝 ➣ Промокод: ${result}
			🗝 ➣ Количество активаций: ${activ}
			💰 ➣ Сумма рублей: ${spaces(count)}💰  
			`);

});

cmd.on(/^(?:дсоздать)\s?([0-9]+)?\s?([^\s	].*)?/i, "создать", 4, (message, args) => { 
		if(acc.users[message.user].level < 4) return;
		if(!message.args[1]) return message.send(`✨ ➣ Пример: 'Дсоздать <количество активаций> <сумма>'\n✨ ➣ Запись без <>`);
		if(!message.args[2]) return message.send(`✨ ➣ Пример: 'Дсоздать <количество активаций> <сумма> '\n✨ ➣ Запись без <>`);
	 
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
			📝 ➣ Промокод: ${result}
			🗝 ➣ Количество активаций: ${activ}
		    💎 ➣ Сумма доната: ${spaces(count)}💰  
			`);

});

 

cmd.on(/^(?:коды)$/i, "создать", 4, (message, args) => {
	if(acc.users[message.user].level < 4) return;	
	let text = `- Список Промокодов -\n`;
	for(id in promo){
		if(promo[id].dcount){
			text += `
					📝 ➣ Промокод: ${id}
					🗝 ➣ Количество активаций: ${promo[id].activ}
					💰 ➣ Сумма доната: ${promo[id].dcount}💰  

					`
		}
		if(promo[id].count){
		text += `
		📝 ➣ Промокод: ${id}
		🗝 ➣ Количество активаций: ${promo[id].activ}
		💰 ➣ Сумма рублей: ${spaces(promo[id].count)}💰  

		`
		}
	}
	return message.send(text);
});

cmd.on(/^удалить\s?([^]+)?$/i, "промокод", 4, (message, args) => {
	if(acc.users[message.user].level < 4) return;
	if(!message.args[1]) return message.send(`❇ ➣ Укажите промокод для удаления.`);
	if(!promo[message.args[1]]) return message.send(`⌛ ➣ Такого промокода не существует.\n⌛ ➣ Либо закончился лимит активаций.`);
	delete promo[message.args[1]];
	return message.send(`⌛ ➣ Промокод был удален.`);

});
	
cmd.on(/^промокод\s?([^]+)?/i, "промокод", 0, (message, args) => {
	if(!message.args[1]) return message.send(`❇ ➣ Укажите промокод для активации.`, {attachment: promos});
	let promos = message.args[1];
	if(!promo[message.args[1]]) return message.send(`⌛ ➣ Такого промокода не существует.\n⌛ ➣ Либо закончился лимит активаций.`, {attachment: promos});
	
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
			return message.send(`✅ ➣ Вы успешно активировали промокод!\n✨ ➣ Вы получили: ${spaces(coi)} доната.\n📝 ➣ Активаций осталось: ${promo[promos].activ}`, {attachment: promos});
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
			return message.send(`✅ ➣ Вы успешно активировали промокод!\n✨ ➣ Вы получили: ${spaces(coi)} 💰\n📝 ➣ Активаций осталось: ${promo[promos].activ}`, {attachment: promos});
		}
	}else{
		return message.send(`🐩 ➣ Увы, но вы уже активировали промокод.`, {attachment: promos});
	}
});

	cmd.on(/^пхелп$/i, "пхелп", 4, (message, args) => {
		if(acc.users[message.user].level < 4) return;
		return message.send(`
			✅ ➣ Создать - Создать промо на рубли
			✅ ➣ Дсоздать - Создать промо на донат
			✅ ➣ Удалить - удалить промокод.
			✅ ➣ Коды - список промокодов.
			`, {attachment: promos});

	});	

	cmd.on(/^azp$/i, "пхелп", 4, (message, args) => {

		for (let id in job) {
			if (job[id].id != false) {
				acc.users[id].bank += job[id].dohod;
			}
		}
		return message.send(`Зарплата выдана.`);
	});	
 
 
 
/*
	/////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:гонки)\s?([^\s	].*)?/i, 'все', 0, message => {
		if (!car[message.user]) {
			car[message.user] = {
				carid: false,
				carname: "Отсутствует",
				price: 0
			}
		}

		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n Вы не указали ставку!`, {attachment: gonkis});
		let summ = parserInt(message.args[1]);
		if (!message.chat) return; 
		if(!Number(summ)) return message.send('🙈 ➣ Ставка должна быть числом.', {attachment: gonkis});

		if(acc.users[message.user].balance < message.args[1]) return message.send(`💴 ➣ Ваш баланс меньше вашей ставки.`, {attachment: gonkis}); 
		let id = message.user; 

		let cars = 0;
		if(car[message.user].carname == 'Ваз 1111') cars = 1; if(car[message.user].carname == 'Ваз 2101') cars = 2; if(car[message.user].carname == 'Ваз 2103') cars = 3; if(car[message.user].carname == 'Ваз 2110') cars = 4; if(car[message.user].carname == 'Лада X-Ray') cars = 5; if(car[message.user].carname == 'BMW E30') cars = 6; if(car[message.user].carname == 'Mitsubishi Lancer') cars = 7;  if(car[message.user].carname == 'Mercedes-Benz S') cars = 8; if(car[message.user].carname == 'Audi A7') cars = 9; if(car[message.user].carname == 'Porsche Cayenne') cars = 10; if(car[message.user].carname == 'Toyota Camry') cars = 11; if(car[message.user].carname == 'Mercedes-Benz G') cars = 12; if(car[message.user].carname == 'Lamborghini Veneno') cars = 13; if(car[message.user].carname == 'Tesla Roadster') cars = 14; if(car[message.user].carname == 'Thrust SSC') cars = 15; if(car[message.user].carname == 'Mazda CX-5') cars = 16; if(car[message.user].carname == 'Hyundai ix35') cars = 17; if(car[message.user].carname == 'DeLorean DMC-12') cars = 18; if(car[message.user].carname == 'Koenigsegg Agera R') cars = 19; if(car[message.user].carname == 'Bugatti Chiron') cars = 20;		 		
		if (car[message.user].carid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Чтобы играть - вам нужна машина. | "Машины"`, {attachment: gonkis}); 
		

		for(ids in gonki){
			if(gonki[ids].player_one == id) return message.send(`🕵 ➣ Вы уже зарегистрировались.\n🔎 ➣ Для завершения игры, попросите написать\n🔎 ➣ Участие ${message.user}`, {attachment: gonkis});
			if(gonki[ids].player_two == id) return message.send(`🕵 ➣ Вы уже зарегистрировались. \n🔎 ➣ Для завершения игры, попросите написать\n🔎 ➣ Участие ${message.user}`, {attachment: gonkis});
 
		}
		for(ids in gonki){
				if(gonki[ids].people == 2){
				gonki.number += 1;
				gonki[gonki.number] = {
						player_one: id,
						player_two: false,
						stavka: summ,
						people: 1,
						one: 0,
						two: 0, 
						car_one: cars,
						car_two: 0,
						users: {}
					}
					return message.send(`
						🔥 ➣ Вы приняли участие в гонках
						🌚 ➣ 1 участник: ${acc.users[message.user].prefix}
						🚗 ➣ Машина: ${car[message.user].carname}
						💰 ➣ Ставка: ${spaces(summ)}💰 
						🆔 ➣ ${message.user}

						🔎 ➣ Участвовать: 'Участие <ID>'
						🔎 ➣ ID игрока, с кем хотите сыграть.
						`, {attachment: gonkis});
				}
			}
	});


	cmd.on(/^(?:участие)\s?([0-9]+)?$/i, 'все', 0, message => {
		if(!message.args[1]) return message.send(`🔎 ➣ Укажите ID игрока.`, {attachment: errors});
		if(!Number(message.args[1])) return message.send(`🔎 ➣ Не верно указаны данные.`, {attachment: errors});
		let id = Number(message.args[1]);
 	let cars = 0;
		if(car[message.user].carname == 'Ваз 1111') cars = 1; if(car[message.user].carname == 'Ваз 2101') cars = 2; if(car[message.user].carname == 'Ваз 2103') cars = 3; if(car[message.user].carname == 'Ваз 2110') cars = 4; if(car[message.user].carname == 'Лада X-Ray') cars = 5; if(car[message.user].carname == 'BMW E30') cars = 6; if(car[message.user].carname == 'Mitsubishi Lancer') cars = 7;  if(car[message.user].carname == 'Mercedes-Benz S') cars = 8; if(car[message.user].carname == 'Audi A7') cars = 9; if(car[message.user].carname == 'Porsche Cayenne') cars = 10; if(car[message.user].carname == 'Toyota Camry') cars = 11; if(car[message.user].carname == 'Mercedes-Benz G') cars = 12; if(car[message.user].carname == 'Lamborghini Veneno') cars = 13; if(car[message.user].carname == 'Tesla Roadster') cars = 14; if(car[message.user].carname == 'Thrust SSC') cars = 15; if(car[message.user].carname == 'Mazda CX-5') cars = 16; if(car[message.user].carname == 'Hyundai ix35') cars = 17; if(car[message.user].carname == 'DeLorean DMC-12') cars = 18; if(car[message.user].carname == 'Koenigsegg Agera R') cars = 19; if(car[message.user].carname == 'Bugatti Chiron') cars = 20;		 		
		if (car[message.user].carid == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), Чтобы играть - вам нужна машина. | "Машины"`, {attachment: gonkis}); 
		
	for(ids in gonki){
		if(gonki[ids].player_one == id){

			if(gonki[ids].people == 1){
				if(message.user == id) return message.send(`🕵 ➣ Вы указали свой ID`, {attachment: errors});
				if(acc.users[message.user].balance < gonki[ids].stavka) return message.send(`💰 ➣ Ставка для этой игры: ${gonki[ids].stavka}💰 `, {attachment: gonkis});
				gonki[ids].player_two = message.user;
				gonki[ids].stavka += gonki[ids].stavka;
				gonki[ids].people += 1;
				gonki[ids].car_two = cars;

				let kill = 0;
				let win = 0;
				if(gonki[ids].car_two > gonki[ids].car_one){
					if(rand(1,100) > 96){ 
						acc.users[gonki[ids].player_two].exs += 2;
						acc.users[gonki[ids].player_one].exs -= 1;
						acc.users[gonki[ids].player_two].balance += gonki[ids].stavka;
						acc.users[gonki[ids].player_one].balance -= gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix})(${car[gonki[ids].player_two].carname}) обогнал @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix}) (${car[gonki[ids].player_one].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰\n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});
						delete gonki[ids];
						return;
					}else{
						acc.users[gonki[ids].player_one].exs += 2;
						acc.users[gonki[ids].player_two].exs -= 1;
						acc.users[gonki[ids].player_two].balance -= gonki[ids].stavka;
						acc.users[gonki[ids].player_one].balance += gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix})(${car[gonki[ids].player_one].carname}) обогнал @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix}) (${car[gonki[ids].player_two].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰\n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});delete gonki[ids];
						return;
					}
				} 
				if(gonki[ids].car_one < gonki[ids].car_two){
					if(rand(1,100) > 96){ 
						acc.users[gonki[ids].player_one].exs += 2;
						acc.users[gonki[ids].player_two].exs -= 1;
						acc.users[gonki[ids].player_two].balance -= gonki[ids].stavka;
						acc.users[gonki[ids].player_one].balance += gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix})(${car[gonki[ids].player_one].carname}) обогнал @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix}) (${car[gonki[ids].player_two].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰\n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});delete gonki[ids];
						delete gonki[ids];
						return;
					}else{
						acc.users[gonki[ids].player_two].exs += 2;
						acc.users[gonki[ids].player_one].exs -= 1;
						acc.users[gonki[ids].player_one].balance -= gonki[ids].stavka;
						acc.users[gonki[ids].player_two].balance += gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix})(${car[gonki[ids].player_two].carname}) обогнал @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix}) (${car[gonki[ids].player_one].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰\n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});
						delete gonki[ids];
						return;
					}
				}
				if(gonki[ids].car_two == gonki[ids].car_one){
					if(rand(1,100) > 50){ 
						acc.users[gonki[ids].player_two].exs += 2;
						acc.users[gonki[ids].player_one].exs -= 1;
						acc.users[gonki[ids].player_one].balance -= gonki[ids].stavka;
						acc.users[gonki[ids].player_two].balance += gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix})(${car[gonki[ids].player_two].carname}) обогнал @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix}) (${car[gonki[ids].player_one].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰\n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});
						delete gonki[ids];
						return;
					}else{
						acc.users[gonki[ids].player_one].exs += 2;
						acc.users[gonki[ids].player_two].exs -= 1;
						acc.users[gonki[ids].player_two].balance -= gonki[ids].stavka;
						acc.users[gonki[ids].player_one].balance += gonki[ids].stavka;
						message.send(`🏁 ➣ Гонки завершились. \n 🚗 ➣ @id${gonki[ids].player_one}(${acc.users[gonki[ids].player_one].prefix})(${car[gonki[ids].player_one].carname}) обогнал @id${gonki[ids].player_two}(${acc.users[gonki[ids].player_two].prefix}) (${car[gonki[ids].player_two].carname}) \n💰 ➣ Баланс переходит победителю.\n💰 ➣ Выигрыш: ${spaces(gonki[ids].stavka)}💰 \n💡 ➣ Победитель получил 2 опыта.`, {attachment: gonkis});delete gonki[ids];
						delete gonki[ids];
						return;
					}
				}
			}
		} 
		}
	 	return message.send(`
	 		😔 ➣ Вы не смогли вступить в игру.
	 		✨ ➣ Возможные причины: 
	 		🐩 ➣ Неверный ид или не создана игра.
	 		`, {attachment: errors });
 		
	});
 */
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^(?:бой)\s?([0-9]+)?$/i, 'все', 0, message => {
		if(!message.args[1]) return message.send(`💴 ➣ Вы не указали ставку.`, {attachment: bouyy });
		if(!Number(message.args[1])) return message.send('🙈 ➣ Ставка должна быть числом.', {attachment: bouyy });

		if(acc.users[message.user].balance < message.args[1]) return message.send(`💴 ➣ Ваш баланс меньше вашей ставки.`, {attachment: errors });
		 
		let id = message.user;
		let summ = Number(message.args[1]);

		for(ids in kill){
			if(kill[ids].userone == id) return message.send(`🕵 ➣ Вы уже зарегистрировались.`, {attachment: bouyy });
			if(kill[ids].usertwo == id) return message.send(`🕵 ➣ Вы уже зарегистрировались.`, {attachment: bouyy });
			acc.users[message.user].balance -= Number(message.args[1]);
			if(kill[ids].people == 1){
				if(kill[ids].userone == id) return message.send(`🕵 ➣ Вы уже зарегистрировались. Ожидайте второго игрока.`, {attachment: bouyy });
				kill[ids].usertwo = message.user;
				kill[ids].balance += summ;
				kill[ids].people += 1;
				return message.send(`
					🔥 ➣ Бой-Лист
					🌚 ➣ 1 участник: ${acc.users[kill[ids].userone].prefix}
					🌚 ➣ ID: ${kill[ids].userone}

					🌝 ➣ 2 участник: ${acc.users[message.user].prefix}					
					🌝 ➣ ID: ${message.user}
					💴 ➣ Ставка: ${kill[ids].balance}
					`, {attachment: bouyy });
			}
		}

		for(ids in kill){
			if(kill[ids].people == 2){
				acc.users[message.user].balance -= Number(message.args[1]);
			kill.number += 1;
				kill[kill.number] = {
					userone: id,
					usertwo: false,
					balance: summ,
					people: 1,
					one: 0,
					two: 0,
					golos: 10,
					users: {}
				}
				return message.send(`
					🔥 ➣ Бой-Лист
					🌚 ➣ 1 участник: ${acc.users[message.user].prefix}
					🌚 ➣ ID: ${message.user}

					🌝 ➣ 2 участник: Ожидание. 
					💰 ➣ Ставка: ${summ}💰

					🥊 ➣ Участвовать: 'Бой <ставка>'
					`, {attachment: bouyy });
			}
		}
	});


	cmd.on(/^(?:голос)\s?([0-9]+)?$/i, 'все', 0, message => {
		if(!message.args[1]) return message.send(`🔎 ➣ Укажите ID игрока.`, {attachment: errors});
		if(!Number(message.args[1])) return message.send(`🔎 ➣ Не верно указаны данные.`, {attachment: errors});
		let id = Number(message.args[1]);

		let kil = false;
		for(ids in kill){
			if(kill[ids].userone == id){
			    kil = ids;
			}  
			if(kill[ids].usertwo == id){
				kil = ids;
			}   
		}	 
		if(kill == false) return message.send(`🕵 ➣ Данный игрок не зарегистрирован.`, {attachment: bouyy }); 
			if(kill[kil].userone == id) {
				if(kill[kil].users[message.user]) return message.send(`👨‍💻️ ➣ Вы уже голосовали...`, {attachment: bouyy });
				kill[kil].one += 1;
				kill[kil].users[message.user] = {
					i: true
				}
				//////////
				if(kill[kil].one == 10){
					acc.users[kill[kil].userone].balance += kill[kil].balance;
					message.send(`🎉 ➣ @id${kill[kil].userone}(${acc.users[kill[kil].userone].prefix}) набрал 10 голосов!\n🎉 ➣ @id${kill[kil].usertwo}(${acc.users[kill[kil].usertwo].prefix}) проиграл.\n💰 ➣ Победитель забирает: ${kill[kil].balance}`, {attachment: bouyy });
					return delete kill[kil];
				}
				//////////
				return message.send(`🎉 ➣ Вы проголосовали за: @id${id}(${acc.users[id].prefix})\n📶 ➣ У @id${id}(${acc.users[id].prefix})  ${kill[kil].one} голосов\n📶 ➣ У @id${id}(${acc.users[kill[kil].usertwo].prefix})  ${kill[kil].two} голосов`, {attachment: bouyy });
			}else if(kill[kil].usertwo == id){
				if(kill[kil].users[message.user]) return message.send(`👨‍💻️ м Вы уже голосовали...`, {attachment: bouyy });
				kill[kil].two += 1;
				kill[kil].users[message.user] = {
					i: true
				}
				//////////
				if(kill[kil].two == 10){
					acc.users[kill[kil].usertwo].balance += kill[kil].balance;
				    message.send(`🎉 ➣ @id${kill[kil].usertwo}(${acc.users[kill[kil].usertwo].prefix}) набрал 10 голосов!\n🎉 ➣ @id${kill[kil].userone}(${acc.users[kill[kil].userone].prefix}) проиграл.\n💰 ➣ Победитель забирает: ${kill[kil].balance}`, {attachment: bouyy });
					return delete kill[kil];
				}
				//////////
				return message.send(`🎉 ➣ Вы проголосовали за: @id${id}(${acc.users[id].prefix})\n📶 ➣ У @id${id}(${acc.users[id].prefix})  ${kill[kil].two} голосов\n📶 ➣ У @id${kill[kil].userone}(${acc.users[kill[kil].userone].prefix})  ${kill[kil].one} голосов`, {attachment: bouyy });
			}
		 
	});


///////////////////////////////////////////////////////////////////////////////
 
/////////////////////////////////\ майн ферма 
		cmd.on(/^(майн уволиться|майн уволится)$/i, "код", 0, (message, args) => {
		if(!mine[message.user]){
			mine[message.user] = {
				stat: false,
				level: 0,
				up: 0,
				uplvl: 15,
				balance: 0,
				count: 0,
				timer: false
			}
		}
		if(mine[message.user].stat == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вы не работаете на майнинг-ферме.`, {attachment: mineferm});
		if(mine[message.user].stat == true){
			mine[message.user].stat = false; 
		}

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
			💎 ➣ Вы уволились с майнинг-фермы.
			💎 ➣ Ваша статистика сохранилась.
			`, {attachment: mineferm});
	});

	cmd.on(/^майн$/i, "код", 0, (message, args) => {
		if(!mine[message.user]){
			mine[message.user] = {
				stat: false,
				level: 0,
				up: 0,
				uplvl: 15,
				balance: 0,
				count: 0,
				timer: false
			}
		}
		if(mine[message.user].stat == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вы уже работаете на майнинг-ферме.`, {attachment: mineferm});
		if(mine[message.user].stat == false){
			mine[message.user].stat = true; 
		}

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
			💎 ➣ Вы устроились на 'Майнинг-Ферму'
			💎 ➣ Майнить (биткоины) можно в группе.
			💎 ➣ Майнить  - команды для майна.

			💎 ➣ Майнинфо - статистика.
			💎 ➣ Майн уволиться - для увольнения
			`, {attachment: mineferm});
	});

	cmd.on(/^майнинфо$/i, "код", 0, (message, args) => {
		if(!mine[message.user]){
			mine[message.user] = {
				stat: false,
				level: 0,
				up: 0,
				uplvl: 15,
				balance: 0,
				count: 0,
				timer: false
			}
		}
		if(mine[message.user].stat == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вы не работаете на майнинг-ферме.`, {attachment: mineferm});

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
			📝 ➣ Статистика работника

			💴 ➣ Баланс: ${mine[message.user].balance} BitCoin
			🔱 ➣ Криптов: ${mine[message.user].count}
			✏ ➣ Уровень: ${mine[message.user].level} 
			✏ ➣ Уровень повышает % выпадения криптов.

			📌 ➣ 5 криптов - это 1 биткоин.
			📌 ➣ Уровень повышается автоматически.

			💎 ➣ Майн снять <сумма> - снять биткоины.
			💎 ➣ Майн уволиться - для увольнения
			`, {attachment: mineferm});
	});


cmd.on(/^(?:майн снять)\s?([^\s	].*)?/i, 'casino', 0, message => {

		if (!message.args[1]) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), укажите сумму для снятия.`, {attachment: mineferm});
		let amount = parserInt(message.args[1]); 
  		if(!Number(amount)) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), ставка должна быть целым числом.`, {attachment: mineferm}); 
  		if(amount < 0) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), число должно быть больше 0`, {attachment: mineferm}); 

		if(!mine[message.user]){
			mine[message.user] = {
				stat: false,
				level: 0,
				up: 0,
				uplvl: 15,
				balance: 0,
				count: 0,
				timer: false
			}
		}
		if(mine[message.user].stat == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вы не работаете на майнинг-ферме.`, {attachment: mineferm});
		if(amount > mine[message.user].balance) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), на счету фермы нет столько биткоинов`, {attachment: mineferm});
 		acc.users[message.user].bitcoin += amount;
 		mine[message.user].balance -= amount;

		return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), 
			💴 ➣ Вы сняли ${amount} биткоинов.
			💴 ➣ Баланс: ${mine[message.user].balance} BitCoin
			`, {attachment: mineferm});
	});

	cmd.on(/^майнить$/i, "код", 0, (message, args) => {
		if(message.chat) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), майнить можно только в группе: [bot.avrora| Бот Аврора]`, {attachment: mineferm});

		if(!mine[message.user]){
			mine[message.user] = {
				stat: false,
				level: 0,
				up: 0,
				uplvl: 15,
				balance: 0,
				count: 0,
				timer: false
			}
		}
		if(mine[message.user].stat == false) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вы не работаете на майнинг-ферме.`, {attachment: mineferm});
		if(mine[message.user].timer == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), майнить можно раз в 10 минут.`, {attachment: mineferm});
		mine[message.user].timer = true;
			setTimeout(() => {
				mine[message.user].timer = false;
			}, 600000);
	
		if(mine[message.user].level == 0){
			let mines = rand(1,100);
			if(mines > 80){
						mine[message.user].up += 1;
						if(mine[message.user].up >= mine[message.user].uplvl){
							mine[message.user].up = 0;
							mine[message.user].uplvl += 5;
							mine[message.user].level += 1;
						}
						mine[message.user].count += 1;
						if(mine[message.user].count >= 5){
							mine[message.user].count = 0;	
							mine[message.user].balance += 1;
						}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), поздравляем вы нашли: ${['🎁','👑','🌖','☀','🍀','⭐','💎'].random()}!\n📒 ➣ Вы получаете 1 крипт.('Майнинфо')\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}else{	
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  вы нашли: ${['💩','🌚','👺','💀'].random()}!\n📒 ➣ Вы не получили ничего...\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}
		}
		if(mine[message.user].level == 1){
			let mines = rand(1,100);
			if(mines > 88){
						mine[message.user].count += 1;
						if(mine[message.user].up >= mine[message.user].uplvl){
							mine[message.user].up = 0;
							mine[message.user].uplvl += 5;
							mine[message.user].level += 1;
						}
						if(mine[message.user].count >= 5){
							mine[message.user].count = 0;
							mine[message.user].balance += 1;
						}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), поздравляем вы нашли: ${['🎁','👑','🌖','☀','🍀','⭐','💎'].random()}!\n📒 ➣ Вы получаете 1 крипт.('Майнинфо')\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}else{	
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  вы нашли: ${['💩','🌚','👺','💀'].random()}!\n📒 ➣ Вы не получили ничего...\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}
		}
		if(mine[message.user].level >= 2){
			let mines = rand(1,100);
			if(mines > 94){
						mine[message.user].count += 1;
						if(mine[message.user].up >= mine[message.user].uplvl){
							mine[message.user].up = 0;
							mine[message.user].uplvl += 5;
							mine[message.user].level += 1;
						}
						if(mine[message.user].count >= 5){
							mine[message.user].count = 0;
							mine[message.user].balance += 1;
						}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), поздравляем вы нашли: ${['🎁','👑','🌖','☀','🍀','⭐','💎'].random()}!\n📒 ➣ Вы получаете 1 крипт.('Майнинфо')\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}else{	
			return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),  вы нашли: ${['💩','🌚','👺','💀'].random()}!\n📒 ➣ Вы не получили ничего...\n📘 ➣ До нового уровня: ${mine[message.user].uplvl - mine[message.user].up} раз майнинга.`, {attachment: mineferm});
			}
		}
 
	});



	//////// РЕФКА         ________________


	cmd.on(/^реферал\s?([0-9]+)?/i, "бан", 0, (message, args) => {  
 		var id = message.args[1];  
		if(message.chat) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), вводить команду можно только в группе: [bot.avrora| Бот Аврора]`);
		
 		if(!Number(id)) return message.send(`👬 ➣ Укажите ID пригласившего вас в игру.`) 	
		if (BOT_ID == id) return message.reply('👬 ➣ Отказ'); 
		  
		if(!ref.newsuser[message.user]) return message.send(`👬 ➣ Активировать реферала можно только новеньким участникам.`);
		if(!ref[id]) return message.send(`👬 ➣ У игрока не активирована реф.система (Командой: рефка)`);
		delete ref.newsuser[message.user];

	    ref[id].invite += 1;
	    ref[id].dohod += 1;
		ref[id].users[message.user] = {
					i:true
		}
		acc.users[id].donate += 1;
		acc.users[message.user].balance += 50000;
		return message.send(`✅ ➣ Вы успешно зарегистрировались по реф.ссылке.\n✅ ➣ Вы получили 50.000`)
   		 
		 
	});

	cmd.on(/^рефка$/i, "бан", 0, (message, args) => { 

		if(!ref[message.user]){
			ref[message.user] = {
				 invite: 0,
				 users: {},
				 dohod: 0
			}
			return message.send(`
			📪 ➣ Вы активировали реферальную систему.
			💡 ➣ Зовите друзей и получайте донат.

			🔖 ➣ Для получения доната, нужно выполнить:

			1&#8419; ➣ Попросить друга вступить  в группу: [bot.avrora| Бот Аврора]
			2&#8419; ➣ Попросить друга написать любое смс в ЛС группы.
			3&#8419; ➣ Попросить друга написать: 'реферал ${message.user}' ⚠
			`);
		}else{
			let text = '';
			for(id in ref[message.user].users){
				text += `@id${id}(${acc.users[id].prefix})\n`;
			}
			return message.send(`
			📪 ➣ Реферальная статистика.

			👬 ➣ Пригласили: ${ref[message.user].invite} людей.
			💎 ➣ Прибыли: ${ref[message.user].dohod} доната.

			🔖 ➣ Для получения доната, нужно выполнить:

			1&#8419; ➣ Попросить друга вступить  в группу: [bot.avrora| Бот Аврора]
			2&#8419; ➣ Попросить друга написать любое смс в ЛС группы.
			3&#8419; ➣ Попросить друга написать: 'реферал ${message.user}' ⚠

			Приглашенные:
			${text}
			`);
		}
	});	


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^трейд\s?([0-9]+)?/i, "бан", 0, (message, args) => {   
		if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		if(bost[message.user].trade == false) return message.send(`💎 ➣ У вас нет доступа к команде 'трейд', купите в: буст`, {attachment: treeeyd})
		let sum = message.args[1];
		if(!Number(sum)) return message.send(`💎 ➣ Сумма должна быть числом.`, {attachment: treeeyd});
		if(acc.users[message.user].donate < sum) return message.send(`💎 ➣ У вас нет столько доната.`, {attachment: treeeyd});
		acc.users[message.user].donate -= sum;
		acc.users[message.user].balance += sum * 100000;
		return message.send(`💎 ➣ Вы обменяли ${sum} донат(а) на ${sum * 100000}💰 `, {attachment: treeeyd});
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^бинфо$/i, "буст", 0, (message, args) => { 
		let text = ''; 
		if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}

		if(bost[message.user]){
			if(bost[message.user].bostexs.activ == true) text += `🍀 ➣ "Завод опыта" -- куплен.\n`;
			if(bost[message.user].bostexs.activ == false) text += `💀 ➣ "Завод опыта" -- не куплен.\n`;
			 
			if(bost[message.user].bostgame.activ == true) text += `🍀 ➣ "Увеличение шанса" -- куплен.\n`;
			if(bost[message.user].bostgame.activ == false) text += `💀 ➣ "Увеличение шанса" -- не куплен.\n`;
 
			if(bost[message.user].bostbit.activ == true) text += `🍀 ➣ "Майн-рудник" -- куплен.\n`;
			if(bost[message.user].bostbit.activ == false) text += `💀 ➣ "Майн-рудник" -- не куплен.\n`;
 
			if(bost[message.user].trade == true) text += `🍀 ➣ "Доступ к команде <трейд> " -- куплен.\n`;
			if(bost[message.user].trade == false) text += `💀 ➣ "Доступ к команде <трейд> " -- не куплен.\n`;

			if(bost[message.user].fort == true) text += `🍀 ➣ "Дешевая фортуна" -- куплен.\n`;
			if(bost[message.user].fort == false) text += `💀 ➣ "Дешевая фортуна" -- не куплен.\n`;
 
			return message.send(text)
		}
		 
		 
	});
	cmd.on(/^буст$/i, "буст", 0, (message, args) => {  
		if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		} 
		if(acc.users[message.user].level == 0){
			return message.send(`
			1&#8419; ➣  "Завод опыта" - 60 доната. 
			Вырабатывает каждый час 5 опыта. | За день - 120. 
			После выдачи опыта 24 раза(раз в час) - сгорает.
			2&#8419; ➣  "Увеличение шанса" на 10% - 65 доната.
			Увеличивает шанс побед в играх: казино, азино, ловушка, тир, лотерея.
			(После 30 побед - сгорает). 
			🎁 ➣ Так же можно открыть "подарок" и получить до 1кк валюты.
			3&#8419; ➣  "Майн-рудник" - 60 доната.
			В течении суток раз в час выдает - 2 биткоина.
			4&#8419; ➣  "Доступ к команде ТРЕЙД" - 80 доната.
		    Откроет доступ к команде 'трейд'. С помощью этой команды
		    Можно обменивать <донат> на <валюту>.
		    5&#8419; ➣  "Дешевая фортуна" - 70 доната(навсегда).
			Позволит вам крутить фортуну за 20 доната.

			✏ ➣ Бинфо - ваши бусты.
		    ✏ ➣ Купить буст командой:
		    ✏ ➣ купбуст ID
		`, {attachment: bostss});
		}

		if(acc.users[message.user].level >= 1){
			return message.send(`
			1&#8419; ➣  "Завод опыта" - 50 доната. 
			Вырабатывает каждый час 8 опыта. | За день - 192. 
			После выдачи опыта 24 раза(раз в час) - сгорает.
			2&#8419; ➣  "Увеличение шанса" на 20% - 50 доната.
			Увеличивает шанс побед в играх: казино, азино, ловушка, тир, лотерея.
			(После 30 побед - сгорает). 
			🎁 ➣ Так же можно открыть "подарок" и получить до 1кк валюты.
			3&#8419; ➣  "Майн-рудник" - 50 доната.
			В течении суток раз в час выдает - 3 биткоина.
			4&#8419; ➣  "Доступ к команде ТРЕЙД" - 60 доната.
		    Откроет доступ к команде 'трейд'. С помощью этой команды
		    Можно обменивать <донат> на <валюту>. 
			5&#8419; ➣  "Дешевая фортуна" - 50 доната(навсегда).
			Позволит вам крутить фортуну за 20 доната.
			

		    ✏ ➣ Купить буст командой:
		    ✏ ➣ купбуст ID
		`, {attachment: bostss});
		}
		 
	});
 


		cmd.on(/^(?:купбуст)\s?([0-9]+)?$/i, 'все', 0, message => {
 			if(!bost[message.user]){
			bost[message.user] = {
				 	bostexs: {
				 		activ: false,
				 		count: 0
				 	},
 					bostgame: {
 						activ: false,
				 		count: 0,
				 		free: false
 					},
 					bostbit: {
 						activ: false,
				 		count: 0
 					},
 					trade: false,
 					fort: false
			}
		}
		let text = message.args[1];
		if (!text) return message.send("⚠ ➣ Введите ID буста!", {attachment: bostss});
		if(!Number(text)) return;
		let id = message.user;
		let user = acc.users[message.user]
		if (message.args[1] == "1") {
			if(bost[message.user].bostexs.activ == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), у вас уже куплено это улучшение.`, {attachment: bostss});
			if(acc.users[message.user].level == 0){
				if (user.donate < 90) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ Это улучшение стоит 90 доната.`, {attachment: bostss});
				user.donate -= 90;
				bost[message.user].bostexs = {activ: true, count: 24}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили 'Завод опыта'.\n⚠ ➣ Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
			} 
			if(acc.users[message.user].level >= 1){
				if(timers.admin[id].bost == false){
					if (user.donate < 50) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ Это улучшение стоит 50 доната.`, {attachment: bostss});
					user.donate -= 50;
					bost[message.user].bostexs = {activ: true, count: 24}
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили 'Завод опыта'.\n⚠ ➣ Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
			}else{
					timers.admin[id].bost = false;
					setInterval(() => {
			 			timers.admin[id].bost = true;
					}, 86400000);
					bost[message.user].bostexs = {activ: true, count: 24}
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили 'Завод опыта'.\n⚠ ➣ Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
				}
			 }
		}
		if (message.args[1] == "2") {
			if(bost[message.user].bostgame.activ == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), у вас уже куплено это улучшение.`, {attachment: bostss});
			
			if(acc.users[message.user].level == 0){
			 	if (user.donate < 90) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ Это улучшение стоит 90 доната.`, {attachment: bostss});
				user.donate -= 90;
				bost[message.user].bostgame = {activ: true, count: 30, free: true}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили "Увеличение шанса".\n⚠ ➣ Данное улучшение пропадет через 30 побед.\n⚠ ➣ Шанс побед увеличен в играх: казино, азино, ловушка, тир, лотерея.\n🎁 ➣ Вам доступен бонус. Напишите: подарок`, {attachment: bostss});
			}  
			if(acc.users[message.user].level >= 1){
				if(timers.admin[id].bost == false){
					if (user.donate < 50) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ Это улучшение стоит 50 доната.`, {attachment: bostss});
					user.donate -= 50;
					bost[message.user].bostgame = {activ: true, count: 30, free: true}
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили "Увеличение шанса".\n⚠ ➣ Данное улучшение пропадет через 30 побед.\n⚠ ➣ Шанс побед увеличен в играх: казино, азино, ловушка, тир, лотерея.\n🎁 ➣ Вам доступен бонус. Напишите: подарок`, {attachment: bostss});
			}else{
					timers.admin[id].bost = false;
					setInterval(() => {
			 			timers.admin[id].bost = true;
					}, 86400000);
					bost[message.user].bostgame = {activ: true, count: 30, free: true}
					return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили "Увеличение шанса".\n⚠ ➣ Данное улучшение пропадет через 30 побед.\n⚠ ➣ Шанс побед увеличен в играх: казино, азино, ловушка, тир, лотерея.\n🎁 ➣ Вам доступен бонус. Напишите: подарок`, {attachment: bostss});
				}
			 }
		}
		if (message.args[1] == "3") {
			if(bost[message.user].bostbit.activ == true) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}), у вас уже куплено это улучшение.`, {attachment: bostss});
			if(acc.users[message.user].level == 0){
				if (user.donate < 90) return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠  ➣ Это улучшение стоит 90 доната.`, {attachment: bostss});
				user.donate -= 90;
				bost[message.user].bostbit = {activ: true, count: 24}
				return message.send(`🎉 ➣ @id${message.user}(${acc.users[message.user].prefix}),\n⚠ ➣ Вы успешно купили "Майн-рудник".\n⚠ » Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
			} 
			if(acc.users[message.user].level >= 1){
				if(timers.admin[id].bost == false){
					if (user.donate < 50) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠  » Это улучшение стоит 50 доната.`, {attachment: bostss});
					user.donate -= 50;
					bost[message.user].bostbit = {activ: true, count: 24}
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Майн-рудник".\n⚠ » Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
			}else{
					timers.admin[id].bost = false;
					setInterval(() => {
			 			timers.admin[id].bost = true;
					}, 86400000);
					bost[message.user].bostbit = {activ: true, count: 24}
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Майн-рудник".\n⚠ » Данное улучшение пропадет через 24 выдачи.`, {attachment: bostss});
			}
		}
	}
		if (message.args[1] == "4") {
			if(bost[message.user].trade == true) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), у вас уже куплено это улучшение.`, {attachment: bostss});
			if(acc.users[message.user].level == 0){
				if (user.donate < 90) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠  » Это улучшение стоит 90 доната.`, {attachment: bostss});
				user.donate -= 90;
				bost[message.user].trade = true
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Доступ к команде ТРЕЙД".\n⚠ » Данное улучшение позволит вам обменивать донат на валюту.`, {attachment: bostss});
			}  
			if(acc.users[message.user].level >= 1){
				if(timers.admin[id].bost == false){
					if (user.donate < 50) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠  » Это улучшение стоит 50 доната.`, {attachment: bostss});
					user.donate -= 50;
					bost[message.user].trade = true
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Доступ к команде ТРЕЙД".\n⚠ » Данное улучшение позволит вам обменивать донат на валюту.`, {attachment: bostss});
			}else{
					timers.admin[id].bost = false;
					setInterval(() => {
			 			timers.admin[id].bost = true;
					}, 86400000);
					bost[message.user].trade = true
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Доступ к команде ТРЕЙД".\n⚠ » Данное улучшение позволит вам обменивать донат на валюту.`, {attachment: bostss});
			}
		}
	}
		if (message.args[1] == "5") {
			if(bost[message.user].fort == true) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}), у вас уже куплено это улучшение.`, {attachment: bostss});
			if(acc.users[message.user].level == 0){
				if (user.donate < 100) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠  » Это улучшение стоит 100 доната.`, {attachment: bostss});
				user.donate -= 100;
				bost[message.user].fort = true
				return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Дешевая фортуна".\n⚠ » 'Крутить' фортуну можно за 20 доната теперь.`, {attachment: bostss});
			}  
			if(acc.users[message.user].level >= 1){
				if(timers.admin[id].bost == false){
					if (user.donate < 50) return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠  » Это улучшение стоит 50 доната.`, {attachment: bostss});
					user.donate -= 50;
					bost[message.user].fort = true
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Дешевая фортуна".\n⚠ » 'Крутить' фортуну можно за 20 доната теперь.`, {attachment: bostss});
			}else{
					timers.admin[id].bost = false;
					setInterval(() => {
			 			timers.admin[id].bost = true;
					}, 86400000);
					bost[message.user].fort = true
					return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы успешно купили "Дешевая фортуна".\n⚠ » 'Крутить' фортуну можно за 20 доната теперь.`, {attachment: bostss});
			}
		}
		} else {
			return message.send(`🎉 » @id${message.user}(${acc.users[message.user].prefix}),\n⚠ » Вы указали неверный 🆔 буста.\nВсе бусты вы можете найти в: буст`, {attachment: bostss});
		}
	});




	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
			fs.writeFileSync("./base/bank.json", JSON.stringify(bank, null, "\t"));
			fs.writeFileSync("./base/kill.json", JSON.stringify(kill, null, "\t"));
			fs.writeFileSync("./base/blist.json", JSON.stringify(blist, null, "\t")); 
			fs.writeFileSync("./base/mine.json", JSON.stringify(mine, null, "\t")); 
			fs.writeFileSync("./base/commands.json", JSON.stringify(commands, null, "\t")); 
			fs.writeFileSync("./base/ref.json", JSON.stringify(ref, null, "\t")); 
			fs.writeFileSync("./base/bost.json", JSON.stringify(bost, null, "\t")); 
		}, 15000);


 



	setInterval(function() {
		vk.api.call("friends.getRequests", {
			count: 1000 
		}).then((res) => { 
			if (!res.items[0]) return; 
	
				vk.api.call("friends.add", {
				user_id: res.items[0]
				});

		});
	}, 5000); 
 

  


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
				text: `✅ Бот Аврора| ♻ Uptime ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec} | Начни общение с "помощь" `
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
		let bit = rand(30000, 50500);
		chats.bitcoin = Number(bit);
	}, 3000);
//////////////////////////////////////////////////
	setInterval(() => {
		chats.znach = "Ставка уменьшилась на - ";
		let stavk = rand(1, 5);
		chats.stavka = Number(stavk);
	}, 30000);
////////////////////////////// подсчет очков в клане
	setInterval(() => {
		let people = 0;
		let exs = 0;
		let convert = 0;
		for (let id in clans) {
			for (let ids in clans[id].users) {
				if (acc.users[ids].lvl >= 1) {
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


		//////////////// FERMA MINE
 
 
/////////////////////////////////////////////////
}
 
	setInterval(function() {
		for(id in bost){
			if(bost[id].bostexs){
				if(bost[id].bostexs.activ == true){
					if(bost[id].bostexs.count > 0){
						bost[id].bostexs.count -= 1;
						if(acc.users[id].level < 2){
							acc.users[id].exs += 5;
						}  
						if(acc.users[id].level == 2){
							acc.users[id].exs += 5;
						}  
						if(acc.users[id].level > 3){
							acc.users[id].exs += 8;
						}  
						if(bost[id].bostexs.count == 0){
							bost[id].bostexs.activ = false;
						} 
					} 
				}

				if(bost[id].bostbit.activ == true){
					if(bost[id].bostbit.count > 0){
						bost[id].bostbit.count -= 1;
						if(acc.users[id].level > 1){
							acc.users[id].bitcoin += 3; 
						}  
						if(bost[id].bostbit.count == 0){
							bost[id].bostbit.activ = false;
						}
					} 
				}

			}

		} 


	}, 3600000);

	setInterval(() => {
		for (let id in ferm) { 
				if(ferm[id].level == 1){
					acc.users[id].bitcoin += ferm[id].dohod; 
				}
				if(ferm[id].level == 2){
					acc.users[id].bitcoin += ferm[id].dohod; 
				}
				if(ferm[id].level == 3){
					acc.users[id].bitcoin += ferm[id].dohod; 
				}
 
		}
	}, 3600000);
 