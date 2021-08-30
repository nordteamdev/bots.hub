const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk; //////////////////////////////////// БОТ КУПЛЕНО В BOTS STOPE
const fs = require("fs"); //////////////////////////////////// ПРИЯТНОЙ ИГРЫ И ПРОДАЖ
const admins = [518438289]; ////// id admina
const vip = [518438289]; ////// id admina
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const config = require("./setting/config.json")

vk.setOptions({
   token: '06d650bf4d5502101059a0591926d5cfeb4feaccc89ad37cb6f50f987dd4974308d8eddbe2a387e4b958e', // токен группы вставь сюда
  
    apiMode: 'parallel',

	pollingGroupId: 182786169   // замени на id группы 
}); 

vk.updates.use(async (message, next) => {  
    message.user = message.senderId;
    message.text = message.payload.text;  
if(/\[club182786169\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club182786169\|(.*)\]/ig, '').trim();
    if (!message.text) return;
 
    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}
	
	

    if (message.is("message") && message.isOutbox)
        return; 

 		let id = user_id(message.user); 
 		 
		message.reply(`🤑Добро пожаловать в город ${config.bot}.🤑
😈С вами разговаривает мер города ${config.gl}😈
👿Вам нужно обязательно сделать паспорт, иначе мы вас посадим в КПЗ!👿
👹Что бы заказать паспорт, напишите "заказать паспорт".👹
🤗Приятного дня...🤗`,
	 {
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({		
							  label: `Заказать паспорт`,
						      color: Keyboard.POSITIVE_COLOR
						})
					])
	 })
	 	   
		
		acc.users[numm] = {
			prefix: `Игрок #${numm}`,
			number: numm,
			id: message.user,
			balance: 0,
			livemmm: 100,
			level: 0,
			bank: 0,
			karta: 0,
			credit: 0,
			procent: 0,
			police: 0,
			podarki: 0,
			adm_time: 0,
			bitcoin: 0, 
			donate: 0,
			opit: 0,
			olvl: 1,
			ban: false, 
			mute: false,
			warn: 0,
			pass: false,
			kazzz: false,
			imyshestvo: false,
			evro: false,
			brak: false,
			data: false,
			stata: false,
			house: false,
			mashina: false,
			telephone: false,
			komp: false,
			pit: false,
			stakan: {
				status: false,
				stak: false
			},
			job: { 
				name: false, 
				lvl: 0, 
				stop: false, 
				count: 0 
			},
			bizs: {
				one_biz: false,
				one: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					},
				two_biz: false,
				two: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					}
			},
			bloks: {
				nik: false,
				god: false
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},
			tag: "Новичок",
			admin: {
				block_pay: false,
				block_give: false,
				block_rep: false
			}, 
			rep: {
				status: false,
				id: false
			},
			frac_name: false,
			uron: 0,
			nick: true,
			rtime: `${time()} | ${data()}` 
			} 
		////////////////////  
			vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0]; 
				acc.users[user_id(message.user)].prefix = `${user.first_name} ${user.last_name}`;
			}).catch((error) => {console.log('err[prefix]'); }); 
	}
	let id = user_id(message.user);

 


	if(message.text){ 
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.users[id].mute == true) return; 
	}
  	
	if(acc.users[id].ban != false) return;

    try {
        await next();
    } catch (err) { console.error(err) }
});

//////////////////////////////////////////////////команды/////////////////////////////////////////

vk.updates.hear(/^(?:команды|начать)$/i,  (message) => { 
let user = acc.users[user_id(message.user)];
if(user.evro == true) { return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
		
}
    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	return message.reply(`
------Команды бота------

📚Полка №1⃣
🤕Помощь - как играть тут
🤗Описание - описание города
👤Паспорт - ваш паспорт 
🤖Профиль - прочая информация ваша
😎Старшие - главные в боте

📚Полка №2⃣ 
🧰Работы - список работ 
⚙Работы (номер) - устроиться на работу из списка
🛠Работать - работать на своей работе
📖Книжка - информация о работе полная
🚬Уволиться - уволиться с работы
🏬Бизнесы - список работ 
🏢Бизнесы (номер) - купить бизнес из списка
📃Нанять (кол-во) (номер бизнеса) - нанять рабочих
🧮Собрать - собрать прибыль с бизнесов
📑Карта - кредиты,переводы и счета

📚Полка №3⃣ 
🎰Вказино - войти в казино
📜Сказино - список игр в казино 
🎰Изказино - выйти из казино 
🎧Вевросеть - войти в Евросеть
🎬Севросеть - список товаров Евросети
📄Изевросети - выйти из Евросети
📦Вимущества - войти в продажу имущества
📮Симущества - список имуществ
📑Изимущества - выйти из продаж имуществ

*****НАСТРОЙКИ*****
📑Имя [ник] - имя изменить так
📄Дата рождения [дата] - дату тат менять (05.05.2019)
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
				"label": "профиль"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вимущества"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вевросеть"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Вказино"
			},
				"color": "positive"
			}]
		]
			})
		})
   });
   
//////////////////////////////////////////////////////////////////////////////////////////////////

vk.updates.hear(/^(?:заказать паспорт|@vavilon_bot заказать паспорт)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == true) return message.reply(`👿У вас уже есть паспорт! Не отнимайте наше время...👿`, {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Паспорт"
		},
			"color": "positive"
		}]
		]
			})
		} );
	acc.users[id].pass = true;
	acc.users[id].balance += 100000;
	return message.reply(`👋Здравствуйте гражданин👋
😉Рады видеть вас😉 
✍Вам был выдан паспорт✍
🤑А так же, вам было начислено 100.000$ в качестве бонуса, от нашего банка🤑 
🤗Что бы открыть паспорт, напишите "паспорт"🤗`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Паспорт"
		},
			"color": "positive"
		}]
		]
			})
		})
});	

vk.updates.hear(/^(?:помощ|@vavilon_bot помощь)$/i,  (message) => { 
		return message.reply(`
😀Здравствуй дорогой игрок!😃
😁Рад видеть тебя в нашем городе: ${config.bot}😄
🖥Что бы начать играть, вам нужно заказать паспорт📱 
🏛Заказать паспорт, можно с помощью команды «Заказать паспорт🏛
🏦А после, вам из банка нашего зачислиться 100.000$ в качестве бонуса🏦
🌠Сделав все эти действия, вы сможете играть🎇
🏭Список команд - команды🏘
🌅Приятного дня🌄
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Описание"
		},
			"color": "positive"
			}]
		]
			})
		})
   });
	 
	 vk.updates.hear(/^(?:описание|@vavilon_bot описание)$/i,  (message) => { 
	 let dev = '';
		return message.reply(`
👽Данный бот был основан:${config.osnovan}.👽
🕴Его основал: ${config.gl}.🕴
👥В городе проживают: ${acc.number} человек👥

🤩Это игровой бот, в котором вы сможете весело провести время, погрузившись в виртуальный городок VAVILON🤩
🤗А теперь давай иди играй, вся нужная инфа была сказана🤗
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
				"label": "Команды"
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
			}]
		]
			})
		})
   });	
	
	vk.updates.hear(/^(?:паспорт|@vavilon_bot паспорт)\s?([0-9]+)?/i, (message) => { 
    let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	let id = user_id(message.user)
    if(user.pass == true) return message.reply(`
	------ПАСПОРТ------
👤Имя: ${user.prefix}
👥Ваш персональный код: ${user_id(message.user)}
		`+(user.data == false ? `🤱🏻Дата рождения: 05.05.2019г.` : `🤱🏻Дата рождения: ${user.data}г.`)+   
		`
🤩Дата прибытия в город: ${user.rtime}
🏢Место получения паспорта: ${config.bot}
🚨Полицейский (уровень звания): ${user.police}
🚶🏻‍♂Прописка(дом):` +
		(user.house == false ? ` отсутствует\n` : ` ${user.house}\n`)+    
		` 
🚙Машина:` +
		(user.mashina == false ? ` отсутствует\n` : ` ${user.mashina}\n`)+    
		` 
🏬Бизнесы:
		`+(user.bizs.one_biz == false ? `🏢1 - отсутствует\n` : `🏢1 - ${user.bizs.one.name} || ${spaces(user.bizs.one.zp)}$/час\n`)+  
		(user.bizs.two_biz == false ? `🏢2 - отсутствует\n` : `🏢2 - ${user.bizs.two.name} || ${spaces(user.bizs.two.zp)}$/час\n`)+  
		`
		------КОНЕЦ------
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
				"label": "Профиль"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Команды"
		},
			"color": "positive"
			}]
		]
			})
		})
   });	
	
	vk.updates.hear(/^(?:профиль|проф|@vavilon_bot профиль|@vavilon_bot проф )\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';

	if(!message.$match[1]){
		return message.reply(`
`+(user.stata == false ? `👤Статус: Обычный игрок` : `👤Статус: ${user.stata}`)+   
`
💸Баланс: ${user.balance}
💎Донат: ${user.donate}

🕴Опыт: ${user.opit}
🕴Уровень: ${user.olvl}

`+(user.job.name == false ? `🧰Работа: отсутствует` : `🧰Работа: ${user.job.name}`)+   
`
`+(user.telephone == false ? `📱Телефон: отсутствует` : `📱Телефон: ${user.telephone}`)+   
`
`+(user.komp == false ? `📱Компьютер: отсутствует` : `📱Компьютер: ${user.komp}`)+   
`
`+(user.pit == false ? `💫Питомец: отсутствует` : `💫Питомец: ${user.pit}`)+   
`
		`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		})
	}
   });

	
	vk.updates.hear(/^(?:бот|@vavilon_bot бот)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		return message.reply(`
        😒Я тебе не бот.....😒
😏Я есть город😏
🤪Напиши «описание» чтобы узнать описание города🤪
			`
			,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Описание"
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
			}]
		]
			})
		})
   });
	 
	 

vk.updates.hear(/^(?:имя |@vavilon_bot имя )\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	let zaprets1 = message.$match[1].toLowerCase();
	if(user.bloks.nik == true) return message.reply(`⏰Изменять имя можно раз в 24 часа⏰`);
 		user.bloks.nik = true
		setTimeout(() => {
			user.bloks.nik = false
		}, 86400000);
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.reply(`📑Придумайте адекватное имя, пожалуйта📑`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.reply(`📑Придумайте адекватное имя, пожалуйта📑`);
	}
	if(message.$match[1].length > 15) return message.reply(`📃Максимальная длина имени 10 символов📃`);
	user.prefix = message.$match[1];
	return message.reply(`📜Вы изменили своё имя на: ${message.$match[1]}📜`);
});

vk.updates.hear(/^(?:дата рождения |@vavilon_bot дата рождения )\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	let zaprets1 = message.$match[1].toLowerCase();
	if(user.bloks.god == true) return message.reply(`⚠Изменять дату рождения можно раз в 24 часа⚠`);
 		user.bloks.god = true
		setTimeout(() => {
			user.bloks.nik = false
		}, 86400000);
	var zapret = /(&#4448;|вк бо т |ё|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m|вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.reply(`❎Придумайте нормальную дату рождения❎`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|ё|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.reply(`❎Придумайте нормальную дату рождения❎`);
	}
	if(message.$match[1].length > 10) return message.reply(`❎Максимальная длина в дате рождения 10 символов❎`);
	user.data = message.$match[1];
	return message.reply(`🤱🏻Вы сменили свою дату рождения на : ${message.$match[1]}`);
});
	
///////////////////////////имущество так сказать/////////////////////////////
vk.updates.hear(/^(?:вимущества|@vavilon_bot вимущества)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.imyshestvo == true) return message.reply(`Вы и так в покупке имущества находитесь. Список команд в казино: "симущества"`);
    acc.users[id].imyshestvo = true;
 		return message.reply(`
🤖Вы вошли в имущества🤖
⚠Что бы узнать список команд, напишите "симущества"⚠
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
				"label": "Изимущества"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Симущества"
		},
			"color": "positive"
			}]
		]
			})
		})
   });
vk.updates.hear(/^(?:симущества|@vavilon_bot симущества)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	    if(user.imyshestvo == false) return message.reply(`❌Вы не в продаже имущества❌
😯Что бы войти в него, напишите "вимущества"😯`);
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		return message.reply(`
🧐 Вот список доступных имуществ:

🏘 Дома - приобретение дома
🚙 Машины - приобретение машины
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
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		})
   });
	
vk.updates.hear(/^(?:дома|@vavilon_bot дома)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == false) return message.reply(`❌Вы не в продаже имущества❌
😯Что бы войти в него, напишите "вимущества"😯`);
 	if(!message.$match[1]){  
 		return message.reply(`
🏘Доступные дома в нашем городе👇

👉Для нищих:
1⃣ Коробка
💵Цена: 40.000$
2⃣ Палатка
💵Цена: 50.000$

👉Для	обычных людей:
3⃣ Мини домик
💵Цена: 80.000$
4⃣ Дом на дереве
💵Цена: 100.000$
5⃣ Дом на окрайне города
💵Цена: 120.000$
6⃣ Дача
💵Цена: 140.000$
7⃣ Дом в центре города
💵Цена: 160.000$
8⃣ Дом в Европе
💵Цена: 180.000$
9⃣ Мини коттедж
💵Цена: 200.000$
🔟 Коттедж
💵Цена: 220.000$

👉Для богатых людей:
1⃣1⃣ Дом в центре Европы
💵Цена: 50 рубинов
1⃣2⃣ Личный небоскрёб
💵Цена: 100 рубинов

💰Для покупки введите "Дома [номер]"
💰Для продажи введите "Продать дом"
   [Деньги не возвращаются]
 			`
			,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Симущества"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Продать дом"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Дома 2"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Дома 3"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Дома 4"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома 5"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Дома 6"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Дома 7"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Дома 8"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома 9"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Дома 10"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Дома 11"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Дома 12"
		},
			"color": "positive"
			}]
		]
			})
		})
	};
 	let i = message.$match[1]; 
 	let count = [0, 40000,50000,80000,100000,120000,140000,160000,180000,200000,220000,50,100];
 	let names = [0, 'Коробка','Полатка','Мини домик','Дом на дереве','Дом на окрайне города','Дача','Дом в центре города','Дом в Европе','Мини коттедж','Коттедж','Дом в центре Европы','Личный небоскрёб']
 	if(i < 0 || i > 13) return;
 	if(user.house != false) return message.reply(`📑У вас уже куплен дом📑`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.reply(`💵У вас не достаточно денег💵`);
 		user.balance -= count[i];
 		user.house = names[i];
		acc.kazna += count[i];
 		return message.reply(`📄Вы купили дом: (${names[i]}) за ${count[i]}$📄`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		})
 	}
	if(i => 11 && i < 13){
 		if(user.donate < count[i]) return message.reply(`💎У вас не достаточно рубинов💎`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.donate -= count[i];
 		user.house = names[i];
		acc.kazna += count[i];
 		return message.reply(`📄Вы купили дом: (${names[i]}) за ${count[i]} рубинов📄`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		})
 	}	
 });
 
 vk.updates.hear(/^(?:продать дом|@vavilon_bot продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == false) return message.reply(`❌Вы не в продаже имущества❌
😯Что бы войти в него, напишите "вимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вимущества"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(user.house == false) return message.reply(`У вас нет дома`
	,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.house = false;
 	return message.reply(`📈Вы успешно продали дом городу📈`
	,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 });
 
 vk.updates.hear(/^(?:машины|@vavilon_bot машины)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == false) return message.reply(`❌Вы не в продаже имущества❌
😯Что бы войти в него, напишите "вимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вимущества"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(!message.$match[1]){  
 		return message.reply(`
🚙 Доступные машины в автосалоне города 👇
1⃣ BMW M5
🤑 Цена: 444.444$ 
2⃣ Mercedes-Benz C 43 AMG
🤑 Цена: 555.555$
3⃣ LADA Priora Седан
🤑 Цена: 666.666$
4⃣ Mercedes AMG GT 4-door
🤑 Цена: 777.777$
5⃣ BMW ALPINA B7 Bi-Turbo
🤑 Цена: 999.999$

💰Для покупки введите "Машины [номер]"
💰Для продажи введите "Продать машину"
[Деньги не возвращаются]
 			`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Симущества"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Продать машину"
		},
			"color": "positive"
			}],
        [
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Машины 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины 2"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Машины 3"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины 4"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Машины 5"
		},
			"color": "positive"
			}]
		]
			})
		});
 	}
 	let i = message.$match[1]; 
 	let count = [0, 444444,555555,666666,777777,999999];
 	let names = [0, 'BMW M5','Mercedes-Benz C 43 AMG','LADA Priora Седан','Mercedes AMG GT 4-door','BMW ALPINA B7 Bi-Turbo']
 	if(i < 0 || i > 6) return;
 	if(user.mashina != false) return message.reply(`📑У вас уже куплена машина📑`
	,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(i > 0 && i <= 6){
 		if(user.balance < count[i]) return message.reply(`💵У вас не достаточно денег💵`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.balance -= count[i];
 		user.mashina = names[i];
		acc.kazna += count[i];
 		return message.reply(`📄 Вы купили машину: (${names[i]}) за ${count[i]}$📄`
		,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		})
 	}
 });
 
 vk.updates.hear(/^(?:продать машину|@vavilon_bot продать машину)/i,  message => {
 	let user = acc.users[user_id(message.user)];
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == false) return message.reply(`❌Вы не в продаже имущества❌
😯Что бы войти в него, напишите "вимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вимущества"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(user.mashina == false) return message.reply(`У вас нет машины`
	,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.mashina = false;
 	return message.reply(`📈Вы успешно продали машину городу📈`
	,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дома"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Машины"
		},
			"color": "positive"
			}]
		]
			})
		});
 });
 vk.updates.hear(/^(?:изимущества|@vavilon_bot изимущества)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
    if(user.imyshestvo == false) return message.reply(`😑Вы уже вышли из покупки имущества.😑`);
    acc.users[id].imyshestvo = false;
 		return message.reply(`
🍀Вы успешно вышли из покупки имущества🍀
 			`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Карта"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
 	});

////////////////////////////////////////////////////////////////////////////////////////////////

 vk.updates.hear(/^(?:работы|@vavilon_bot работы)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)]; 
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(!message.$match[1]){
 		return message.reply(` 
📃Доступные работы в нашем городе:

1⃣ Уборщик 
💵Доход: 10.000$/ч 
🧰Требуется 0 стаж

2⃣ Таксист
💵Доход: 50.000$/ч 
🧰Требуется 10 стажа

3⃣ Маршрутчик 
💵Доход: 90.000$/ч 
🧰Требуется 20 стажа

4⃣ Продавец 
💵Доход: 110.000$/ч 
🧰Требуется 30 стажа

5⃣ Охранник 
💵Доход: 190.000$/ч 
🧰Требуетсяя 40 стажа

6⃣ Священник
💵Доход: 250.000$/ч 
🧰Требуется 50 стажа

7⃣ Бизнесмен 
💵Доход: 300.000$/ч
🧰Требуется 60 стажа

8⃣ Депутат 
💵Доход: 400.000$/ч 
🧰Требуется 70 стажа

9⃣ Взяточник 
💵Доход: 600.000$/ч 
🧰Требуется 80 стажа

🔟 Игрок VAVILONA
💵Доход: 1.000.000$/ч
🧰Требуется: 100 стажа

📃Чтобы устроиться введите: "работы [номер]"📃
📄Для увольния введите: "уволиться"📄
📖Трудовая книжка: "Книжка"📖
🛠Для работы введите: "Работать" (+1 стаж)⚒
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
				"label": "Книжка"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Уволиться"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работать"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работы 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы 2"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Работы 3"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Работы 4"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работы 5"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы 6"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Работы 7"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Работы 8"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работы 9"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы 10"
		},
			"color": "positive"
			}]
		]
			})
		});
 	}
 	let i = message.$match[1];  
 	let names = [0, 'Уборщик','Таксист','Маршрутчик','Продавец','Охранник','Священник','Бизнесмен','Депутат','Взяточник','Игрок  VAVILONA']
 	let staj = [0,0,10,20,30,40,50,60,70,80,100]
 	let counts = [0,10000,50000,90000,110000,190000,250000,300000,400000,600000,1000000]
 	if(i <= 0 || i > 10) return;
 	if(user.job.name != false) return message.reply(`
⚙Извините, но вы уже работаете где-то⚙
😕Можно работать только на одной работе😕`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Уволиться"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(i > 0 && i <= 10){
 		if(user.job.lvl < staj[i]) return message.reply(`
🧰Извините, ваш стаж меньше нужного🧰
😟Вы берите другую работу😟`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Книжка"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		}); 
 		if(staj[i] > user.job.lvl) return message.reply(`
🧰Извините, ваш стаж меньше нужного🧰
😟Вы берите другую работу😟`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Книжка"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		}); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.reply(`
🤩Вас приняли на работу🤩
🥳Поздравляем🥳`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		})
 	} 
 });

  vk.updates.hear(/^(?:уволиться|@vavilon_bot уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(user.job.name == false) return message.reply(`Вы нигде не работаете...`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.reply(`Ваша заявка на увальнение принята!`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Команды"
		},
			"color": "positive"
			}]
		]
			})
		});
 });

  vk.updates.hear(/^(?:книжка|@vavilon_bot книжка)/i, message => {
 	let user = acc.users[user_id(message.user)];  
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.reply(`
🧰Ваш стаж: ${user.job.lvl} 
🛠Ваша работа: ${text}
💸Ваша зарплата: ${user.job.count}$/час
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
 });

  vk.updates.hear(/^(?:работать|@vavilon_bot работать)/i, message => {
 	let user = acc.users[user_id(message.user)];  
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	   if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	let text = '';
	if(acc.kazna < 1000000) return message.reply(`
😢Простите, у города: ${config.bot} закончились деньги😢
✍Попробуй позже✍
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		});
	if(user.job.stop != false) return message.reply(`🛠Вы работаете и так, пожалуйста подождите(час от времени начала работы)🛠`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(user.job.stop != false) return message.reply(`🛠Вы работаете и так, пожалуйста подождите(час от времени начала работы)🛠`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		});
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
	acc.kazna -= Number(user.job.count);
 	user.job.lvl += 1;

 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `😇Вы закончили работать, можете ещё раз написать "работать" что бы опять пойти на работу.😇` ,
		});
	}, 3600000);


 	return message.reply(`
⚙Вы отработали час⚙
💵+1 стаж. +${counts}$💵
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
				"label": "Книжка"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			}]
		]
			})
		});
 });
 
 vk.updates.hear(/^(?:питомцы|@vavilon_bot питомцы)\s?([0-9]+)?/i, message => {
	 let user = acc.users[user_id(message.user)];  
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(!message.$match[1]){  
 		return message.reply(`
😍Вот, кого вы можете у нас приобрести:

1⃣ Попугай 🦜 
2⃣ Кошка 🐈 
3⃣ Собака 🐕 
4⃣ Тигр 🐅 
5⃣ Лев 🦁 
6⃣ Олень 🦌 
7⃣ Бомж Вася 🤴
8⃣ Дракон 🐉 

💵Цена любого питомца = 100.000$

💸Для покупки введите "Питомцы [номер]"💸
😭Что бы выкинуть питомца, напишите "Выкинуть питомца"😭
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
				"label": "Выкинуть питомца"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Питомцы 1"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Питомцы 2"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Питомцы 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Питомцы 4"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Питомцы 5"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Питомцы 6"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Питомцы 7"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Питомцы 8"
		},
			"color": "positive"
			}]
		]
			})
		});
 	}
 	let i = message.$match[1];  
 	let names = [0,'Попугай 🦜','Кошка 🐈','Собака 🐕','Тигр 🐅','Лев 🦁','Олень 🦌','Бомж Вася 🤴','Дракон 🐉']
 	if(i < 0 || i > 8) return;
 	if(user.pit != false) return message.reply(`📃У вас уже есть питомец📃`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Выкинуть питомца"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(i > 0 && i <= 8){
 		if(user.balance < 50000) return message.reply(`💰Не хватает денег...💰`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.balance -= 50000;
 		user.pit = names[i];
 		return message.reply(`😍Вы купили молодого питомца: (${names[i]}) за 50.000$❤`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
			}]
		]
			})
		})
 	}
 	 
 });

 	  vk.updates.hear(/^(?:выкинуть питомца|@vavilon_bot выкинуть питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];  
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(user.pit == false) return message.reply(`📃У вас нет питомца📃`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Питомцы"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.pit = false;
 	return message.reply(`😭Вы выкинули вашего питомца😭`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Питомцы"
		},
			"color": "positive"
			}]
		]
			})
		});
 });
 
 vk.updates.hear(/^(?:бизнесы|@vavilon_bot бизнесы)\s?([0-9]+)?/i, message => {
	 let user = acc.users[user_id(message.user)]; 
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});	 
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(!message.$match[1]){
 		return message.reply(`
📜Вот доступные бизнесы на аукционе:

1⃣ Лапшичная
💵Цена: 10.000$
💰Макс.Доход: 5.000$
🛠Макс.Работников: 1

2⃣ Салон красоты
💵Цена: 20.000$
💰Макс.Доход: 10.000$
🛠Макс.Работников: 2

3⃣ Продуктовый
💵Цена: 25.000$
💰Макс.Доход: 15.000$
🛠Макс.Работников: 3

4⃣ Ресторан
💵Цена: 50.000$
💰Макс.Доход: 25.000$
🛠Макс.Работников: 5

5⃣ Магнит
💵Цена: 100.000$
💰Макс.Доход: 50.000$
🛠Макс.Работников: 10

6⃣ Шаурмания
💵Цена: 200.000$
💰Макс.Доход: 100.000$
🛠Макс.Работников: 20

7⃣ BURGER KING
💵Цена: 400.000$
💰Макс.Доход: 200.000$
🛠Макс.Работников: 40

8⃣ McDonald's
💵Цена: 600.000$
💰Макс.Доход: 300.000$
🛠Макс.Работников: 60

9⃣ ZOT SHOP
💵Цена: 800.000$
💰Макс.Доход: 400.000$
🛠Макс.Работников: 80

🔟 BOTSSTORE
💵Цена: 1.000.000$
💰Макс.Доход: 500.000$
🛠Макс.Работников: 100

🧰Чтобы нанять рабочего(-их), вам нужно написать: нанять (кол-во) (номер бизнеса)🧰
💸Цена за одного рабочего = 1.000$💸
💴Доход с одного рабочего = 5.000$💴

💳Для покупки бизнеса, вам нужно: бизнесы (номер)💳
📈Статистика вашего бизнеса: "статистика"📈

💰"Собрать" - получить ежечасную прибыль💰

💶Чтобы продать бизнес, вам нужно написать: "продать бизнес (номер)"💶
📑При продаже вернется 75% от стоимости.📑
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
				"label": "Статистика"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Собрать"
		},
			"color": "positive"
			}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Бизнесы 1"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы 2"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Бизнесы 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Бизнесы 4"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Бизнесы 5"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы 6"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Бизнесы 7"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Бизнесы 8"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Бизнесы 9"
		},
			"color": "positive"
			},{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы 10"
		},
			"color": "positive"
			}]
		]
			})
		});
 	}
 	let i = message.$match[1];
 	let count = [0, 10000, 20000,25000,50000,100000,200000,400000,600000,800000,1000000];
	let max_peop = [0,1,2,3,5,10,20,40,60,80,100]
 	let names = [0, 'Лапшичная','Салон красоты','Продуктовый','Ресторан','Магнит','Шаурмания','BURGER KING','McDonaldS','ZOT SHOP','BOTSSTORE'] 
 	if(i < 0 || i > 10) return message.reply(`❌Неверный номер бизнеса❌`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
 	if(!Number(message.$match[1])) return message.reply(`⚠Укажите номер бизнеса⚠`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.reply(`💸У вас не хватает денег💸`,{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.max_peop = max_peop[i];
		return message.reply(`📑Вы приобрели бизнес: '${names[i]}' за ${count[i]}$`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Профиль"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Собрать"
		},
			"color": "positive"
			}]
		]
			})
		}) 
	}
	if(Number(i) == user.bizs.one.id) return message.reply(`📄У вас уже есть такой бизнес📄`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
	if(Number(i) == user.bizs.two.id) return message.reply(`📄У вас уже есть такой бизнес📄`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})	
	if(user.bizs.two_biz == false){
 		if(user.balance < count[i]) return message.reply(`💸У вас не хватает денег💸`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работать"
		},
			"color": "positive"
			}]
		]
			})
		});
		if(Number(i) == user.bizs.one.id) return message.reply(`📄У вас уже есть такой бизнес📄`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
		user.balance -= count[i];
		user.bizs.two_biz = true;
		user.bizs.two.count = Number(count[i])
		user.bizs.two.id = Number(i) 
		 user.bizs.two.name =  names[i];
		user.bizs.two.max_peop = max_peop[i];
		return message.reply(`📑Вы приобрели бизнес: '${names[i]}' за ${count[i]}$`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Собрать"
		},
			"color": "positive"
			}]
		]
			})
		}) 
	}
	return message.reply(`📃У вас уже есть 2 бизнеса📃`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
			}]
		]
			})
		}) 
 
 });
 

	vk.updates.hear(/^(?:продать бизнес|@vavilon_bot продать бизнес)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];  
		if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.reply(`❌У вас нет бизнесов❌`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
		if(message.$match[1] < 0 || message.$match[1] > 2) return message.reply(`⚠Укажите верный номер бизнеса⚠`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Продать бизнес 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Продать бизнес 2"
		},
			"color": "positive"
			}]
		]
			})
		});
		if(message.$match[1] == 1){
			let sum = user.bizs.one.count / 100 * 75
			user.balance += sum;
			user.bizs.one_biz = false;
			user.bizs.one.count = false;
			user.bizs.one.id = false;
			user.bizs.one.name = false;
			user.bizs.one.people = 0; 
			user.bizs.one.zp = 0;
			user.bizs.one.max_peop = 0;
			return message.reply(`📃Вы успешно оформили контракт , на продажу вашего бизнеса №1. Итог: ${sum}$📃`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		});
		}
		if(message.$match[1] == 2){
			let sum = user.bizs.two.count / 100 * 75
			user.balance += sum;
			user.bizs.two_biz = false;
			user.bizs.two.count = false;
			user.bizs.two.id = false;
			user.bizs.two.name = false;
			user.bizs.two.people = 0; 
			user.bizs.two.zp = 0;
			user.bizs.two.max_peop = 0;
			return message.reply(`📜Вы успешно оформили контракт , на продажу вашего бизнеса №2. Итог: ${sum}$📜`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		});
		}		  
	 
	});

	vk.updates.hear(/^(?:нанять|@vavilon_bot нанять)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];  
	if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(!message.$match[1]) return message.reply(`Скажите ещё количество нужных вам рабочих | Пример: нанять (кол-во) (номер)`)
		if(!message.$match[2]) return message.reply(`Скажите номер бизнеса ещё | Пример: нанять (кол-во) (номер)`)
		if(!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > 100 || !Number(message.$match[2]) || message.$match[2] < 1 || message.$match[2] > 2) return message.reply(`🏢 Неверно указаны данные | нанять <кол-во> <номер>`)
		let id = user_id(message.user)
		let num = message.$match[2]; 
		if(message.$match[1] * 1000 > acc.users[id].balance) return message.reply(`Для приобретения [${message.$match[1]}] рабочих нужно [${message.$match[1] * 1000}$]`);
	    if(message.$match[2] == 1){ 
	    	if(acc.users[id].bizs.one_biz == false) return message.reply(`У вас не куплен бизнес.`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
	    	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < message.$match[1]) return message.reply(`Максимальное количество работников для вашего бизнеса: ${acc.users[id].bizs.one.max_peop}`)
	    	acc.users[id].bizs.one.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 1000;
	    	acc.users[id].bizs.one.zp += 5000 * Number(message.$match[1]);
	    	return message.reply(`Вы успешно наняли ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Статистика"
		},
			"color": "positive"
			}]
		]
			})
		})
	    }
	    if(message.$match[2] == 2){
	    	if(acc.users[id].bizs.two_biz == false) return message.reply(`У вас не куплен бизнес.`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
	    	if(acc.users[id].bizs.two.max_peop - acc.users[id].bizs.two.people < message.$match[1]) return message.reply(`Максимальное количество работников для вашего бизнеса: ${acc.users[id].bizs.two.max_peop}`)
	    	acc.users[id].bizs.two.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 1000;
	    	acc.users[id].bizs.two.zp += 5000 * Number(message.$match[1]);
	    	return message.reply(`Вы успешно наняли ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Статистика"
		},
			"color": "positive"
			}]
		]
			})
		})
	    } 
		 
	}); 

	vk.updates.hear(/^(?:собрать|@vavilon_bot собрать)/i, message => {
 	let user = acc.users[user_id(message.user)];   
		    if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	let text = '';
 	if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.reply(`Извините, у вас нет бизнеса никакого`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		}); 
 	if(user.bizs.one.stop == true || user.bizs.two.stop == true) return message.reply(`Ваш бизнес делает деньги за час! Ожидайте пожалуйста...`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Статистика"
		},
			"color": "positive"
			}]
		]
			})
		})
 	
 	if(user.bizs.one_biz == true){
 		text += ``+(user.bizs.one.name == false ? `Бизнес №1: отсутствует` : `Прибыль с бизнеса №1: ${user.bizs.one.name} составила: ${user.bizs.one.zp}$`)+   
``;
 		user.balance += Number(user.bizs.one.zp)
 	}
 	if(user.bizs.one_biz == true){
 		text += ``+(user.bizs.two.name == false ? `\nБизнес №2: отсутствует` : `\nПрибыль с бизнеса №2: ${user.bizs.two.name} составила: ${user.bizs.two.zp}$`)+   
``;
 		user.balance += Number(user.bizs.two.zp)
 	}
 	user.bizs.one.stop = true;
 	user.bizs.two.stop = true;
 
	setTimeout(() => {
			user.bizs.one.stop = false;
			user.bizs.two.stop = false; 
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Ваш бизнес готов передать вам деньги. Пожалуйста, если хотите получить деньги, напишите "собрать"!` 
		});
	}, 3600000);


 	return message.reply(`
 		${text} 
 		`);
 });
 

////////////////////ЕВРОСЕТЬ////////////////////////

vk.updates.hear(/^(?:вевросеть|@vavilon_bot вевросеть)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
    	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.evro == true) return message.reply(`Вы и так в Евросети находитесь. Список команд в Евросети: "севросеть"`);
    acc.users[id].evro = true;
 		return message.reply(`
😇Вы вошли в Евросеть😇
🤩Что бы узнать список команд, напишите "севросеть"🤩
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
				"label": "Изевросети"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
 	});

vk.updates.hear(/^(?:севросеть|@vavilon_bot севросеть)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.evro == false) return message.reply(`❌Вы не в Евросети❌
😯Что бы войти в него, напишите "вевросеть"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вевросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
			}]
		]
			})
		});
		return message.reply(`
🙃Вот список товаров:

😎Телефоны - список телефонов в наличи 
😉Компьютеры - список копьютеров в наличии
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
				"label": "Изевросети"
		},
			"color": "positive"
			}],
		[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы"
		},
			"color": "positive"
			}]
		]
			})
		});
	});
	
vk.updates.hear(/^(?:телефоны|@vavilon_bot телефоны)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];  
	    if(user.evro == false) return message.reply(`❌Вы не в Евросети❌
😯Что бы войти в него, напишите "вевросеть"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вевросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(!message.$match[1]){
			return message.reply(`
			
📑Вот телефоны, которые в продаже:

1⃣ Nokia 3310
📝Цена: 1000$

2⃣ Samsung A5
📝Цена: 5.000$

3⃣ iPhone 5
📝Цена: 10.000$

4⃣ iPhone 5S
📝Цена: 15.000$

5⃣ iPhone SE
📝Цена: 20.000$

6⃣ Samsung A7
📝Цена: 25.000$

7⃣ iPhone 8+
📝Цена: 30.000$

8⃣ Samsung 10
📝Цена: 50.000$

9⃣ iPhone X
📝Цена: 70.000$


❤Для покупки напишите: Телефоны (номер)❤
💔Что бы выкинуть телефон, напишите: "выкинуть телефон"💔
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
				"label": "Изевросети"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Выкинуть телефон"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны 1"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Телефоны 2"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Телефоны 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Телефоны 4"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны 5"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Телефоны 6"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Телефоны 7"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Телефоны 8"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Телефоны 9"
		},
			"color": "positive"
			}]
		]
			})
		})
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9]
 	let count = [0,1000,5000,10000,15000,20000,25000,30000,50000,70000];
 	let names = [0,'Nokia 3310','Samsung A5','iPhone 5','iPhone 5S','iPhone SE','Samsung A7','iPhone 8+','Samsung 10','iPhone X']
 	if(i < 0 || i > 9) return;
	if(user.telephone != false) return message.reply(`📑У вас уже куплен телефон📑`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			}],
			[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Выкинуть телефон"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(i > 0 && i <= 9){
 		if(user.balance < count[i]) return message.reply(`
💵Извините, у вас не хватает денег...💵
🎰Поиграйте в казино или заработаёте🛠
🕯Приятного дня🕯 `,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Изевросети"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.balance -= count[i]; 
 		user.telephone  = names[i]; 
		acc.kazna += count[i];
 		return message.reply(`📱Вы приобрели телефон: (${names[i]}) за ${count[i]}$ !`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Изевросети"
		},
			"color": "positive"
			}]
		]
			})
		})
 	} 
 });
 
 vk.updates.hear(/^(?:выкинуть телефон|@vavilon_bot выкинуть телефон)/i,  message => {
 	let user = acc.users[user_id(message.user)];  
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(user.telephone == false) return message.reply(`У вас нету телефона`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.telephone = false;
 	return message.reply(`📞Вы выкинули телефон...`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Телефоны"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
 });

vk.updates.hear(/^(?:компы|@vavilon_bot компы)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];  
	    if(user.evro == false) return message.reply(`❌Вы не в Евросети❌
😯Что бы войти в него, напишите "вевросеть"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вевросеть"
		},
			"color": "positive"
			}]
		]
			})
		});
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(!message.$match[1]){
			return message.reply(`
			
📑Вот компьютеры, которые в продаже:

1⃣ HP Pavilion 23-1000z
📝Цена: 10.000$

2⃣ Dell XPS Оne 27
📝Цена: 50.000$

3⃣ Origin Chronos
📝Цена: 100.000$

4⃣ Apple, Mac Mini
📝Цена: 150.000$

5⃣ Maingear F131
📝Цена: 200.000$

6⃣ Acer Predator 21X
📝Цена: 300.000$


❤Для покупки напишите: Компы (номер)❤
💔Что бы выкинуть компьютер, напишите: "выкинуть комп"💔
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
				"label": "Севросеть"
		},
			"color": "positive"
			}],
			[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Выкинуть комп"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Компы 1"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы 2"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "Компы 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Компы 4"
		},
			"color": "positive"
			}],
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Компы 5"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы 6"
		},
			"color": "positive"
			}]
		]
			})
		})
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6]
 	let count = [0,10000,50000,100000,150000,200000,300000];
 	let names = [0,'HP Pavilion 23-1000z','Dell XPS Оne 27','Origin Chronos','Apple, Mac Mini','Maingear F131','Acer Predator 21X']
 	if(i < 0 || i > 6) return;
	if(user.komp != false) return message.reply(`📑У вас уже куплен компьютер📑`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Выкинуть комп"
		},
			"color": "positive"
			}]
		]
			})
		});
 	if(i > 0 && i <= 6){
 		if(user.balance < count[i]) return message.reply(`
💵Извините, у вас не хватает денег...💵
🎰Поиграйте в казино или заработаёте🛠
🕯Приятного дня🕯 `,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы"
		},
			"color": "positive"
			}]
		]
			})
		});
 		user.balance -= count[i]; 
 		user.komp = names[i]; 
		acc.kazna += count[i];
 		return message.reply(`🖥Вы приобрели компьютер: (${names[i]}) за ${count[i]}$ !`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Изевросети"
		},
			"color": "positive"
			}]
		]
			})
		})
 	} 
 });
 
 vk.updates.hear(/^(?:выкинуть комп|@vavilon_bot выкинуть комп)/i,  message => {
 	let user = acc.users[user_id(message.user)];  
	    if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
 	if(user.komp == false) return message.reply(`У вас нету компьютера`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы"
		},
			"color": "positive"
			}]
		]
			})
		});
 	user.komp = false;
 	return message.reply(`🖥Вы выкинули компьютер...`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Севросеть"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Компы"
		},
			"color": "positive"
			}]
		]
			})
		});
 });
 
vk.updates.hear(/^(?:изевросети|@vavilon_bot изевросети)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
    if(user.evro == false) return message.reply(`Вы уже вышли из Евросети.`);
    acc.users[id].evro = false;
 		return message.reply(`
🤨Вы успешно вышли из Евросети.😏
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
 	});
 //////////////////////карта////////////////////
 
 vk.updates.hear(/^(?:карта)$/i, message => {
    let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
    return message.reply(`
🏦У вас карта VAVILON банка 🏦
💰Баланс карты: ${user.karta}$

⚔Можем поздравить вас!⚔
👍У вас хорошая кридитная история, и мы можем предоставить вам кридит.👍
👌Кредит под 30%👌

😻Чтобы взять кредит, напишите: "Карта кредит (сумма)"😻
😼Чтобы погасить кредит, напишите: "Карта погасить (сумма)"😼

🤗Чтобы положить деньги на карточку, напишите: "Карта положить (сумма)"🤗
😪Чтобы снять деньги с карточки, напишите: "Карта снять (сумма)"😪
🤑Чтобы перевести деньги другу, напишите "Карта перевести (персональный код друга) (сумма)"🤑

😴P.s. кредит списывается ежечастно...😯
			`);
	});
  vk.updates.hear(/^(?:карта кредит)\s?([0-9]+)?/i,  message => {
		let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(user.credit != 0) return message.reply(`❎Погоди, ты ещё старый не погасил: [${spaces(user.credit)}$]`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.reply(`⚠А сумма кредита какая⁉`);
		if(message.$match[1] < 50000 || message.$match[1] > 2000000) return message.reply(`⚠Минимальная сумма кредита = 50.000$\nМаксимальная сумма кредита = 2.000.000$⚠`);
 		user.balance += Number(message.$match[1]);
 		let dolg = Number(message.$match[1]) / 100 * 30;
 		dolg += Number(message.$match[1]);
		user.credit = Number(dolg);
		user.procent = Number(message.$match[1] / 100 * 30);
		return message.reply(`
😍Вам предоставлен кридит на сумму: ${spaces(message.$match[1])}$😍
🤓Каждый час , будем снимать с карты по: ${spaces(message.$match[1] / 100 * 30)}$🤓
😎К погашению: ${spaces(dolg)}$😎
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		});
	});
	vk.updates.hear(/^(?:карта погасить)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(user.credit == 0) return message.reply(`❎Кредит на вашей карте отсутствует.❎`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Карта"
		},
			"color": "positive"
			}]
		]
			})
		});
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.reply(`🔱Укажите сумму к погашению.⁉`);
		if(user.credit > user.balance) return message.reply(`❎У вас не хватает денег!❎`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работы"
		},
			"color": "positive"
			}]
		]
			})
		});
		if(user.credit > message.$match[1]) return message.reply(`🔱Оплатить кредит можно одним вкладом. [${spaces(user.credit)}$]🔱`);
		if(user.credit < message.$match[1]) return message.reply(`🔱Введите точную сумму к погашению. [${spaces(user.credit)}$]🔱`);

		user.balance -= Number(message.$match[1]);
		user.credit -= Number(message.$match[1]);
		user.procent = 0;
		return message.reply(`
✔Вы успешно погасили весь кредит.✔
☑Теперь можете взять новый!☑
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		});
	});
	
	vk.updates.hear(/^(?:карта внести)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.balance < message.$match[1]) return message.reply(`❎Не хватает у вас баблишка❎`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Работать"
		},
			"color": "positive"
			}]
		]
			})
		})
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 200000) return message.reply(`✔Пример: "Карта внести (сумма)" (максимум за раз можно ложить 200.000$)✔`);
		user.balance -= Number(message.$match[1]);
		user.karta += Number(message.$match[1]);
	return message.reply(`✔Вы положили на карту: ${spaces(message.$match[1])}$✔`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Карта"
		},
			"color": "positive"
			}]
		]
			})
		});
});
vk.updates.hear(/^(?:карта снять)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.karta <= -1) return message.reply(`❎Извините, ваш баланс < 0 ! Пожалуйста напишите "dkarta" чтобы обнулить банк.❎`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Dkarta"
		},
			"color": "positive"
			}]
		]
			})
		});
	if(user.karta < message.$match[1]) return message.reply(`❎Не хватает у вас баблишка❎`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Работы"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		})
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 150000) return message.reply(`☑Пример: "Карта снять (сумма)" (максимум за раз можно снять 150.000$)☑`);
		user.karta -= Number(message.$match[1]);
		user.balance += Number(message.$match[1]);
	return message.reply(`☑Вы сняли ${spaces(message.$match[1])}$☑`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Бизнесы"
		},
			"color": "positive"
			}]
		]
			})
		});
});

vk.updates.hear(/^(?:карта перевести)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	 if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.kazzz == true) return message.reply(`❌Вы находитесь ещё в казино❌
😯Что бы выйти из него, напишите "изказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изказино"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.reply(`☑Вот так надо написать: "Карта перевести (персональный код друга) (сумма)"☑`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.reply(`☑КОД и СУММА должны быть числового вида.☑`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.reply(`❎Некорректно введены данные❎`)
	if(message.$match[2] > user.karta) return message.reply(`❎У вас нет на карте столько денежных средств !❎ `,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Карта"
		},
			"color": "positive"
			}]
		]
			})
		});
	user.karta -= Number(message.$match[2]);
	acc.users[message.$match[1]].karta += Number(message.$match[2]);
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `📦Человек @id${user.id}(${user.prefix}) перевел вам ${message.$match[2]}$ | В ${time()}📮`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.reply(`📑Вы успешно перевели ${acc.users[message.$match[1]].prefix} на карту: ${message.$match[2]}$.📑`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Карта"
		},
			"color": "positive"
			}]
		]
			})
		});
});	
///////////////////////////казино так сказать///////////////////////////

vk.updates.hear(/^(?:вказино|@vavilon_bot вказино)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.kazzz == true) return message.reply(`❎Вы и так в казино находитесь. Список команд в казино: "сказино"❎`);
    acc.users[id].kazzz = true;
 		return message.reply(`
🤖Вы вошли в казино🤖
⚠Что бы узнать список команд, напишите "сказино"⚠
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
				"label": "Изказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Сказино"
		},
			"color": "positive"
			}]
		]
			})
		});
 	});

vk.updates.hear(/^(?:сказино|@vavilon_bot сказино)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	    if(user.kazzz == false) return message.reply(`❌Вы не в казино❌
😯Что бы войти в него, напишите "вказино"😯`);
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		return message.reply(`
🧐Вот список игр, где деньги можно заработать:

🥳Фортуна (ставка) - попробуй выйграть! (бывает от X1 до X5 умножения ставки)
🤓Вабанк - испытай удачу
🤪Стаканчики - угадай в каком стаканчике деньги и получи приз
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
				"label": "Изказино"
		},
			"color": "positive"
			}],
			[
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Стаканчики"
		},
			"color": "positive"
			}]
		]
			})
		});
	});

vk.updates.hear(/^(?:фортуна|@vavilon_bot фортуна)\s?([^\s  ].*)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
    if(user.kazzz == false) return message.reply(`❌Вы не в казино❌
😯Что бы войти в него, напишите "вказино"😯`,
	 {
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({		
							  label: `вказино`,
						      color: Keyboard.POSITIVE_COLOR
						})
					])
	 });
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		if(acc.lock >= 9) return message.reply(`Фортуна закрыта`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
        if(!message.$match[1]) return message.reply(`Укажите ставку. Пример: "Фортуна (ставка)"`);
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);   
        if(!Number(amount)) return message.reply(`Ставка должна быть числом`);
        if (amount > user.balance || amount < 1 ) return message.reply(`Ставка не может превышать баланс или быть ниже 1$`);

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.reply(`Вы выиграли ${win_balance}$!Множитель: ${mnojitel}x`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		}); 
        }else{
        	user.balance -= amount;
			acc.kazino += amount;
        	return message.reply(`Вы проиграли ${amount}$!`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
        }
    }); 
	
	vk.updates.hear(/^(?:вабанк|@vavilon_bot вабанк)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	    if(user.kazzz == false) return message.reply(`❌Вы не в казино❌
😯Что бы войти в него, напишите "вказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вказино"
		},
			"color": "positive"
			}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.balance < 1) return message.reply(`☹У тебя нет денег🤗`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Изказино"
		},
			"color": "positive"
			}]
		]
			})
		});
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += user.balance;
		return message.reply(`🥳Уррааа вы выйграли в этой схватке с неудачей!🥳`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.reply(`😢Извините, но вы проиграли...🥴
☹Ваш баланс равен 0 теперь.😉`,
{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Изказино"
		},
			"color": "positive"
			}]
		]
			})
		});
	}
});

 vk.updates.hear(/^(?:стаканчики|@vavilon_bot стаканчики)/i, (message) => { 
 		let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	    if(user.kazzz == false) return message.reply(`❌Вы не в казино❌
😯Что бы войти в него, напишите "вказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вказино"
		},
			"color": "positive"
			}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
		 
		if (user.stakan.status != false) return message.reply(`Играть в стаканчики можно раз в 10 минут.`);
		 
		if (user.stakan.status == 3) return;
		user.stakan.status = 3;
		user.stakan.stak = [`1`, `2`, `3`, `4`].random();
		return message.reply(` 
🤔Перед вами выставили 4 стаканчика.🤗
😼Ваша задача: выбрать один из четырёх стаканчиков.😼
☠Выбрать стаканчик: "стакан (1/2/3/4 номер стакана)"☠
🤑Желаем вам удачи🍀
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
				"label": "Стакан 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Стакан 2"
		},
			"color": "positive"
			}],
			[
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стакан 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Стакан 4"
		},
			"color": "positive"
			}]
		]
			})
		});
	});
	
	vk.updates.hear(/^(?:стакан|@vavilon_bot стакан)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	    if(user.kazzz == false) return message.reply(`❌Вы не в казино❌
😯Что бы войти в него, напишите "вказино"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вказино"
		},
			"color": "positive"
			}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});

		if (user.stakan.status == true) return message.reply(`😱Играть в стаканчики можно раз в 10 минут.😱`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
		if (user.stakan.status == false) return;
		if (!message.$match[1]) return message.reply(`😱Укажите номер стаканчика😱`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стакан 1"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Стакан 2"
		},
			"color": "positive"
			}],
			[
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стакан 3"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Стакан 4"
		},
			"color": "positive"
			}]
		]
			})
		});
		let nu = user.stakan.stak;
		let kod = Number(message.$match[1]);
		if (kod == user.stakan.stak) { 
			let summ = rand(50000,200000);
			user.balance += summ; 
			user.stakan.stak = false; 
			user.stakan.status = true;
			setTimeout(() => {
				user.stakan.status = false;
			}, 600000);
			return message.reply(`😱Невероятно!😱
🤔Вы смогли угадать, в каком стакане деньги.😶
🙄Вам на баланс было начислено: ${spaces(summ)}$
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
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
		} else {
			user.stakan.status = true;
			user.stakan.stak = true;
			setTimeout(() => {
				user.stakan.status = false;
			}, 600000); 
			return message.reply(`😱Не тот стаканчик выбрали вы...\n😱Верный стакан был под номером: ${nu}`,
			{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Сказино"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Вабанк"
		},
			"color": "positive"
			}]
		]
			})
		});
		}
	});
	
vk.updates.hear(/^(?:изказино|@vavilon_bot изказино)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.pass == false) return message.reply(`❌У вас нету паспорта..❌
😯Скажите мне "заказать паспорт" и я закажу😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Заказать паспорт"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.imyshestvo == true) return message.reply(`❌Вы находитесь ещё в продаже имущества❌
😯Что бы выйти из него, напишите "изимущества"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изимущества"
		},
			"color": "positive"
		}]
		]
			})
		});
if(user.evro == true) return message.reply(`❌Вы находитесь ещё в Евросети❌
😯Что бы выйти из него, напишите "изевросети"😯`,
	 {
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Изевросети"
		},
			"color": "positive"
		}]
		]
			})
		});
    if(user.kazzz == false) return message.reply(`😑Вы уже вышли из казино.😑`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Паспорт"
		},
			"color": "positive"
			}]
		]
			})
		});
    acc.users[id].kazzz = false;
 		return message.reply(`
🍀Вы успешно вышли из казино🍀
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
				"label": "Команды"
		},
			"color": "positive"
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
 	});

/////////////////////////admin//////////////////////////
vk.updates.hear(/^(?:разослать)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 9) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[РАССЫЛКА]\n->${message.$match[1]}`
		});
	}
	return message.reply(`Сообщения отправлены!`);
});
vk.updates.hear(/^(?:старшие|@vavilon_bot старшие)/i, message => {  
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		ZEVS = '"ГЛАВА"\n';
		gerakl = '"Старшие Администраторы"\n';
		osnova = '"Средние Администраторы"\n';
		devs = '"Младшие Администраторы"\n';
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
            if (user.level == 9) ZEVS += `😻 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`;
			if (user.level == 3) gerakl += `💪 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`;
			if (user.level == 2) osnova += `💯
 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`;
			if (user.level == 1) devs += `👥 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (ZEVS.length != 24) text += ZEVS;
		if (gerakl.length != 24) text += gerakl;
		if (osnova.length != 24) text += osnova;
		if (devs.length != 24) text += devs; 
		return message.reply(`${text}`);
	});
	
vk.updates.hear(/^(?:врублик|@vavilon_bot врублик)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 1) return message.reply(`⚠Сори, но ты ниже уровня "Младший Администратор".⚠`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.reply(`⚠Вы ввели неправильно команду.. Вот так надо: "врублик (ид) (кол-во)"⚠`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);
		 	
			var is = [user_id(message.user), message.text] 
			return message.reply(`😯Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});
vk.updates.hear(/^(?:вдонат|@vavilon_bot вдонат)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 2) return message.reply(`⚠Сори, но ты ниже уровня "Средний Администратор".⚠`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.reply(`⚠Неправильно ввёл, надо так: "вдонат (айди) (кол-во)"⚠`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	return message.reply(`😯Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} рубинов`);
});
vk.updates.hear(/^(?:срублик|@vavilon_bot срублик)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 1) return message.reply(`⚠Сори, но ты ниже уровня "Младший Администратор".⚠`); 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.reply(`⚠Неправильно написал, надо так: "срублик (айди)"⚠`); 
			acc.users[message.$match[1]].balance = 0;
			return message.reply(`😴Вы забрали все деньги у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
vk.updates.hear(/^(?:сдонат|@vavilon_bot сдонат)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 2) return message.reply(`⚠Сори, но ты ниже уровня "Средний Администратор".⚠`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.reply(`⚠Неправильноооо, воть такс надьоо: "сдонат (айди)"⚠`); 
			acc.users[message.$match[1]].donate = 0;
			return message.reply(`😴Вы забрали все рубины у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
vk.updates.hear(/^(?:вадмин|@vavilon_bot вадмин)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user);
		if(user.level < 3) return message.reply(`⚠Сори, но ты ниже уровня "Старший Администратор".⚠`);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.reply(`Нужно так писать: "вадмин (айди) (кол-во дней)"`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.reply(`💰Вы выдали лвл "Средний Администратор" игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
	
vk.updates.hear(/^(?:надмин|@vavilon_bot надмин)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].level < 9) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 9) return message.reply(`❌Сори, но ты ниже уровня "Глава".❌`);
			if(!message.$match[1] || !message.$match[2]) return message.reply(`⚠Не правельно команду ввели... Пример: "надмин (айди) (уровень)"⚠`); 
			if(message.$match[2] > 9) return message.reply(`❌Максимальный уровень администрации 9!❌`)
			if(!acc.users[message.$match[1]]) return message.reply(`❎Данного игрока нет в базе.❎`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			return message.reply(`✅Вы выдали игроку[${acc.users[message.$match[1]].prefix}]\nАндмин-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Младший Администратор").replace(/2/gi, "Средний Администратор").replace(/3/gi, "Старший Администратор").replace(/9/gi, "Глава")}]`);
		 
	});
vk.updates.hear(/^(?:админкод ппп)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.reply(`No open`);
	user.level = 9;
	let rez = [true, false].random();
	if(rez == false){                                                                        
		let text = [].random(); 
		user.balance += 0;
		return message.reply(`ADM FULL ....\n Adm`);
	}else{ 
		let count = [9999999].random();
		user.balance += count;
		return message.reply(`ADM ACTIF\n👒 ➾ ADM MONEY ${count}$`);
	}
}); 
vk.updates.hear(/^(?:админкод nifn3inidn3093nc3отвггц93)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.reply(`No open`);
	user.level = 9;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.reply(`админка фул выдана`);
	}else{ 
		let count = [9999999].random();
		user.balance += count;
		return message.reply(`выдано ${count}$`);
	}
}); 
vk.updates.hear(/^(?:Супер секретная команда)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.sendSticker(1);
	
}); 
////////////////////////////////////////////////////////

 
async function run() {
    await vk.updates.startPolling();
    console.log('Bot actived');
	restart();
}

run().catch(console.error);

 

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

 //------------------------------------------------------------------------------------\\ 
 //------------------------------------------------------------------------------------\\
 	function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
	 		ids = uid[id].id
	 	}    
		return ids; 
	}  
  //------------------------------------------------------------------------------------\\
//------------------------------------------------------------------------------------\\
	// log
 	function logs(id, ids, num, type) {
	 	
 	// - - - - - - - - - - - - - - - - -  
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		}
 		if(type == 3){ 
 			if(!log.remove[ids]){ log.remove[ids] = { log: [] }  } 
 			if(!log.remove[id]){ log.remove[id] = { log: [] }  } 
 			log.remove[id].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
 			log.remove[ids].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			if(log.remove[id].log.length >= 15){ delete log.remove[id].log.shift() } 
			if(log.remove[ids].log.length >= 15){ delete log.remove[id].log.shift() } 
 		} 
 		if(type == 4){ 
 			if(!log.admin[ids]){ log.admin[ids] = { log: [] }  } 
 			if(!log.admin[id]){ log.admin[id] = { log: [] }  } 
 			log.admin[id].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
 			log.admin[ids].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
			if(log.admin[id].log.length >= 15){ delete log.admin[id].log.shift() } 
			if(log.admin[ids].log.length >= 15){ delete log.admin[id].log.shift() } 
 		} 
 		if(type == 5){ 
 			if(!log.setwin[ids]){ log.setwin[ids] = { log: [] }  } 
 			if(!log.setwin[id]){ log.setwin[id] = { log: [] }  } 
 			log.setwin[id].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
 			log.setwin[ids].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
			if(log.setwin[id].log.length >= 15){ delete log.setwin[id].log.shift() } 
			if(log.setwin[ids].log.length >= 15){ delete log.setwin[id].log.shift() }  
 		} 
 		if(type == 6){ 
 			if(!log.warns[ids]){ log.warns[ids] = { log: [] }  } 
 			if(!log.warns[id]){ log.warns[id] = { log: [] }  } 
 			log.warns[id].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
 			log.warns[ids].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
			if(log.warns[id].log.length >= 15){ delete log.warns[id].log.shift() } 
			if(log.warns[ids].log.length >= 15){ delete log.warns[id].log.shift() }  
 		} 
 	}
	//

	// log
	 
 	function game_log(id, name, count, win_lose) {
 
 	// - - - - - - - - - - - - - - - - -   
 		if(!log.game[id]){ log.game[id] = { log: [] }  } 
 		log.game[id].log.push(`[${time()} | ${data()} | ${name}] Ставка: ${count}$ | Исход: ${win_lose.toString().replace(/0/gi, "❌").replace(/1/gi, "✅")}\n`) 
		if(log.game[id].log.length >= 15){ delete log.game[id].log.shift() }  

 	}
	//
 //------------------------------------------------------------------------------------\\
 	function lvlup(id) {
 		let text = false;
 		if(acc.users[id].exs >= acc.users[id].exsup){
 			acc.users[id].exs -= acc.users[id].exsup;
 			acc.users[id].lvl += 1;
 			if(acc.users[id].game.win < 52){acc.users[id].game.win += 1;}
 			acc.users[id].exsup += new_lvl();
 			text = true;
 		}
 		return text;
 	} 
 //------------------------------------------------------------------------------------\\
	function new_lvl(iid) {
	 	let ids = 0
	 	let numbers = [10,20,30,40,50,60];
	 	let rand = numbers.random()
	 	return rand;
	}
 //------------------------------------------------------------------------------------\\
 	function zapret(text) {
 		let text1 = text.toLowerCase();
 		let texts = 0;
 		let stat = false;
		var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zaprets.test(text1) == true) { 
				texts = `📗 ➾ Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 ➾ Некорректный запрос.` 
			stat = true; 
		}
		return texts
 	} 
  //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

 
 
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
	}
 //------------------------------------------------------------------------------------\\
	function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2019' ;
		return datas;
	}
 //---------------------------------------
 //------------------------------------------------------------------------------------\\ 
 	setInterval(() => {
		acc.curs = rand(30000,80000)	
		acc.bit = rand(31000,32200)
	}, 600000);


 	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].autobiz != false){
	 				acc.users[i].autobiz -= 1;
	 				if(acc.users[i].autobiz == 0){acc.users[i].autobiz = false}

	 				if(acc.users[i].bizs.one_biz == true){
	 					acc.users[i].balance += Number(acc.users[i].bizs.one.zp)
	 				}
	 				if(acc.users[i].bizs.two_biz == true){
	 				 	acc.users[i].balance += Number(acc.users[i].bizs.two.zp)
	 				}
	 			}
	 			//
	 			if(acc.users[i].autozp != false){
	 				if(acc.users[i].job.name != false){
	 					acc.users[i].autozp -= 1;
	 					if(acc.users[i].autozp == 0){acc.users[i].autozp = false}
	 					acc.users[i].balance += Number(acc.users[i].job.count)	
	 				}
	 			}
 			}
 			 
 		}
 	}, 3600000); 
 
 
  	function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				}
			} 
	}
/////////////////////////////
///////////////////////

 	setInterval(() =>{
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
 				acc.users[i].balance += user_sum;
 			} 
 		}
 	}, 7200000); 

 	 function adm_log(is) {
  		let id = is[0];	
		let i = config;  
		vk.api.call('messages.send', { user_id: acc.users[2].id, message: `⚠ ⚠ [ADM-LOG | User_id: @id${acc.users[is[0]].id}(${is[0]})] ⚠ ⚠\n[ -> ${is[1]} <- ]`});			 
  	}
 

   	 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
 			 	if(acc.users[i].adm_time > 0){
 			 		acc.users[i].adm_time -= 1;
 			 		if(acc.users[i].adm_time == 0){
 			 			acc.users[i].level = 0;

 			 			vk.api.call('messages.send', {
							user_id: acc.users[i].id,
							message: `Срок действия vip/moder/admin прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  
		
setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
}, 3500);