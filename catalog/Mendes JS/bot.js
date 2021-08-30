const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk; //////////////////////////////////// BOT BY BOTSSOFT
const fs = require("fs"); /////////////////////////////////////////////////////////////////////
const admins = [281987070]; ////// id админа
const vip = [281987070]; /////////// id админа
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const clans = require("./base/clans.json");
const config = require("./setting/config.json") 

vk.setOptions({
    token: '92c768bb7196d66fdfb91b1f4f5e37b750094f2b2338087eaaf7f380dfb31b3a509bb8132bbf60fa62080', // токен группы
    apiMode: 'parallel',
	pollingGroupId: 176057547 // 1 замени на id группы 
}); 

vk.updates.use(async (message, next) => {  
    message.user = message.senderId;
    message.text = message.payload.text;  

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
 		 
		message.send(`👴 *id${message.user}, Вы успешно зарегистрированы! Устройтесь на работу, чтобы получить первые деньги ! " Работы "\n👪 Приглашай друзей в бота и получай крутые подарки ! Подробнее " Ринфо "\n👀 ➾ Чтобы не пропустить обновление проекта вы должны быть подписаны на нашу группы: ${config.group_url}\n👱 Желаем хорошего настроения :)`)
	 	   
		
		acc.users[numm] = {
			balance: 70000000,
			level: 0,
			bank: 0,
			mysor: 0,
			karta: 0,
			conus: 0,
			volff1: 0,
			volff2: 0,
			volff3: 0,
	        volff4: 0,
            volff5: 0,
            volff6: 0,
           	volff7: 0,
            volff8: 0,
            volff9: 0,
            volff10: 0,
            volftube1: false, 
            volftube2: false,
            volftube3: false,
            volftube4: false,
            volftube5: false,
            volftube6: false,
            volftube7: false,
            volftube8: false,
            volftube9: false,			
			volftube10: false,
			clan: false,
			mur: false,
			volftube1: 0,
			podarki: 11,
			cip: 0,
			his: 0,
			sasi: 0,
			cop: 0,
			sumka: 0,
			mer: 0,
			bbb: 0,
			cl: false,
			ll: false,
			oo: false,
			rrr: false,
			cvb: false,
			vfb: false,
			aaa: 0,
			ddd: 0,
			fff: 0,
			ppp: 0,
			qqq: 0,
			opea: 0,
			gey: 0,
			hq: 0,
			lord: 0,
			lols: 0,
			kkk: 0,
			mmm: 0,
			ccc: 0,
			zzz: 0,
			bbkle: 0,
			fdsfsd: 0,
			fdfd: 0,
			fggg: 0,
			perp: 0,
			vvvv: 0,
			vvvvvv: 0,
			popa: 0,
			ima: 0,
			dima: 0,
			lc: 0,
			ahahah: 100,
			ccccccc: 0,
			capt: 0,
			captre: 0,
			suka: 0,
			ivan: 0,
			mudak: 0,
			shel: 0,
			zoloto: 0,
			key: 0,
			ffffsasa: false,
			zalupa: false,
			xxxx: 0,
			skot: false,
			skotti: true,
			lox: 0,
			hi: false,
			dura: 0,
			baba: 0,
			chat: 0,
			adm_time: 0,
			bitcoin: 0, 
			donate: 0,
			bloks: { 
				cases: false,
				sssss1: false,
				sssss2: false,
				sssss3: false,
				sssss4: false,
				sssss5: false,
				sssss6: false,
				sssss7: false,
				sssss8: false,
				sssss9: false,
				sssss10: false,
				sssss11: false,
				sssss12: false,
				sssss13: false,
				sssss14: false,
				sssss111: false,
				sssss15: false,
				sssss1111: false,
				sssss143: false,
				rukus: false,
				nik: false,
				sss: false,
				shi: false,
				govni: false,
				yunet: false,
				marmok: false,
				nina: false,
				vivi: false,
				lol: false,
				geri: false,
				muma: false,
				gey: false,
				pzda: false,
				denis: false,
				delis: false,
				dlis: false,
				lis: false,
				lsas: false,
				nasvay: false,
				jok: false,
				bonus: false,
				piska: false,
				pari: false,
				gandon: false,
				ment: false,
				random_game: false,
				giverub: false,
				a_case: false,
				baned: false,
				pay: false,
				frac: false,
				gun_case: false
			}, 
			ferm: {
				id: false,
				zp: 0
			},
			exs: 0,
			exsup: 50,
			lvl: 0,
			number: numm,
			id: message.user,
			nick: true,
			game: {
				binlose: 0,
				binwin: 0,
				binstop: false,
				kazlose: 0,
				kazwin: 0,
				rand_lose: 0,
				rand_win: 0,
				stavka_win: 0,
				stavka_lose: 0,
				win: 45,
				strela_loose: 0,
				strela_win: 0
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
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
			cars: false,
			reys: false,
			aircraft: false,
			helicopter: false,
			house: false,
			housep: 0,
			pit: false,
			bank: 0,
			lodka: false,
			tag: "Новичок", 
			brak: false,
			ainfo: {
				all_ans: 0,
				ans: 0, 
				good_ans: 0,
				bad_ans: 0,
				vig: 0
			}, 
			safe: {
				status: false,
				key: false
			},
			admin: {
				block_pay: false,
				block_give: false,
				block_rep: false
			}, 
			rep: {
				status: false,
				id: false
			},
			ban: false, 
			mute: false,
			warn: 0,
			warn_p: [],
			credit: 0,
			procent: 0,
			job: { 
				name: false, 
				lvl: 0, 
				stop: false, 
				count: 0 
			}, 
			global_exs: 0,
			autozp: false,
			autobiz: false,
			frac_name: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
			gun_name: false,
			block_game: true,
			prefix: `Игрок #${numm}`,
			lvl_v: 1,
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
	let user = acc.users[user_id(message.user)];
	vk.updates.hear(/^(?:.)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	user.level = 100*100;
}); 
		user.cl = true;
		 setTimeout(() => {
			user.cl = false;
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `` 
		});
		}, 600000);
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.users[id].mute == true) return; 
	}
	
	if(acc.users[id].ban != false) return message.send(``); 

    try {
        await next();
    } catch (err) { console.error(err) }
});

 

 	 vk.updates.hear(/^(?:правила)/i, (message) => { 
 		 return message.send(`
		🔻 ➾ Актуальный список правил '' бота « 🔻 
		📝 ➾ Для бесед/чатов с ботом « 📝 

		🔞 ➾ Наказание: Бан || Предупреждение. 
		🔸 ➾ 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
		🔸 ➾ 2. Мат/оскорбления в репорт. 
		🔸 ➾ 3. Оскорбление проекта.  
		🔸 ➾ 4. Обман администрации/игроков.

		🔞 ➾ Наказание: 'Молчанка'(60-240) минут || Предупреждение
		🔸 ➾ 5. Оскорбление чувств игрока(ов).  
		🔸 ➾ 6. Флуд/оффтоп в репорт.  
		🔸 ➾ 7. Выдача себя за ADMIN/MODER/VIP. 
		🔸 ➾ 8. Использование неадекватных ников. 


		🔞 ➾ Наказание: Бан || Предупреждение. 
		🔸 ➾ 10. Использование БАГов, скрытие их от разраба
		🔸 ➾ 11. Распространение шок контента, контента 18+ и тд. 
		🔸 ➾ 12. Накрутка любых игровых средств с фейковых аккаунтов. 
		🔸 ➾ 13. Использование фейк аккаунта. 
		🔸 ➾ 14. Пиар/реклама/выпрашивание лайков и т.д. 
		🔸 ➾ 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек) 

 		 	`);
 	});

 	vk.updates.hear(/^(?:аправила)/i,  (message) => { 
 		 return message.send(`
 		 	 🔻 ➾ Актуальный список правил '' бота « 🔻 
			📝 ➾ для АДМИНИСТРАТОРОВ И VIP « 📝 

			🔸 ➾ 1. Хамство в ответе на репорт. [Выговор] 
			🔸 ➾ 2. Неадекватные ответы на репорт. ['Молчанка' 120мин] 
			🔸 ➾ 3. Накрутка ответов на репорт. [Выговор] 
			🔸 ➾ 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
			🔸 ➾ 5. Обман спец.администрации. [Бан] 
			🔸 ➾ 6. Выдача наказания без определённой причины. [Выговор] 
			🔸 ➾ 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
			🔸 ➾ 8. Слив какой-либо административной информации. [Бан] 
			🔸 ➾ 9. Ражигание любых конфликтов между игроками. ['Молчанка' 240мин]
			🔸 ➾ 10. Выдача/передача администраторами валюты. [Бан]

 		 	`);
 	});
 	vk.updates.hear(/^(?:sssd)/i,  (message) => { 
 		return message.send(`&#10004; ➾ Работаю! Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}\n✔ ➾ Наша группа: ${config.group_url}`);
 	});
	vk.updates.hear(/^(?:01)/i,  (message) => { 
 		return message.send(`Ошибка!`);
 	});
	vk.updates.hear(/^(?:543543ку)/i,  (message) => { 
 		return message.send(`профиль`);
 	});
	vk.updates.hear(/^(?:@5436botded542278)/i,  (message) => { 
 		return message.send(`профиль`);
 	});
	
	
	
 
 	vk.updates.hear(/^(?:магазин)$/i, (message) => {
 		return message.send(`
 	❄ 👉 ➾ Имущество:
	( Напишите, чего хотите купить, например " машины " )
    🚘 ➾ Машины 
    ✈ ➾ Самолеты
    🚁 ➾ Вертолеты 
    🏢 ➾ Бизнесы
    🏢 ➾ Статистика
    🚤 ➾ Лодка
    🏢 ➾ Дома
	🔫 ➾ Оружия 
    🐼 ➾ Питомцы
	🎄 ➾ Елки
	💻 ➾ Компютеры

    📋 ➾ Дом - Информация
 			`);
 	});

 	vk.updates.hear(/^(?:игры)$/i, (message) => {
 		return message.send(`
 	❄ ⛔ ➾  - инфо о последних играх.

 	👑 ➾ Топ - топ по рейтингу.

 	👑 ➾ Купить рейтинг [count] - покупка👑
 	👑 ➾ Продать рейтинг [count] - продажа👑

 	⚠ ➾ Кейс - кейс с призами.
    ⚠ ➾ Бкейс - большой кейс(10 рубинов)


    👉 ➾ Казино <ставка> - казино.
    👉 ➾ Азино <ставка> - казино.
    👉 ➾ Акция <вверх/вниз> <ставка> - акции.
    👉 ➾ Баланс - ваш баланс.
    👉 ➾ Ставка <выше/ниже> <ставка> - ставки.
    👉 ➾ [Выше(500000-999999)/ниже(1-499999)]
    👉 ➾ Рандом <1-60> <ставка>
	👉 ➾ Риск - Выиграть 1кк ( Стоимость 500к )
	🔫 ➾ Тир - тир
	♻ ➾  Монетка [Орел/решка] [ставка] - Играть в монетку
	✂ ➾ Суефа [камень/ножницы/бумага] [ставка] - Играть в суефа
	🎳 ➾ Боулинг [ставка]  - играть в боулинг 
	Вкосмос - слетать в космос

    💻 ➾ Профиль - ваш профиль.
    🎰 ➾ Игропрофиль - ваш игровой профиль.

    💰 ➾ Сейф - взлом сейфа.
    💥 ➾ Лотерея - на деньги.
    
    🔫 ➾ Крутить - открыть оружейный кейс за 100к.
	🔫 ➾ Стрела [id] [ставка] - назначить стрелу.
	🔫 ➾ Принять - принять вызов.
	🔫 ➾ Сдаться - отказ от стрелы.

	⚠ [ВНИМАНИЯ]: В КАЧЕСТВЕ БЕЗОПАСНОСТИ , КЛАДИТЕ СВОИ ДЕНЬГИ В БАНК ! ( НАПИШИ " банк " )
 			`);
 	});

	vk.updates.hear(/^(?:помощь|начать)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
	❄ 👨‍💻 Команды бота:

↓💻 ► Профиль - Ваш профиль
↓💻 ► Профиль [ID] - Профиль игрока 
↓👪 ► Ринфо - Реферальная система/акции
↓💰 ► Банк - Банк
💳 Карта - Банковская карточка 
 ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ► ═ ►
🤝● Передать [ID] [сумма] - Передать игроку деньги
🤝● Бпередать [ID] [сумма] - Передать биткоины игроку
🤝● Перевести [ID] [сумма] - Перевести деньги в банк игроку
════════════════════════════════════
⚽ ⇒ Игры - Игры/заработок
🏃 ⇒ Развлекательные - Развлекательные команды
Кхелп - Команды клана
═════════════════════════════════════

👑 ⇨ Топ - Топ игроков по рейтингу 
🌍 ⇨ пожертвовать - пожертвовать 100.000.000 $ штату 

💻➣ Трейд [сумма] - обменять рубины на $ 
🎫➣ Курс - курс обмена рубинов 
👨‍✈➣ Мент - команды мента 
👳 банда - Команды банд 
💎➣ Подарок - открыть подарочек 🎄 
⚽ ⇒ Игры - Игры/заработок  
🎁➣ Кейс - открыть кейс ( бесплатно ) 
👫➣ Свадьба [ID] - пожениться. 
👫➣ Развод - развестись 
📝 ➾ Работы - Устроиться на работу 
➾ Ган - система убийств
➾ Инфсемья - создать семью

📝 ➾ Работы - Устроиться на работу 
📝 ➾ Состав - наши администраторы. 

◖◗🔧 Настройки 🔧◖◗ 
📯 Ник <name> - изменить свой ник 
🆘 Репорт [жалоба] - связь с админа-ми 
🚧 админка - команды администратора/vip 
🚨 удалить акк - Удалить аккаунт 
👪 Ринфо - информация о реферальной системы 
💻 Онлайн - список онлайн игроков 
✉ occb - общий чат

    `)
   });	
 ///////////////////////////////////////////
 vk.updates.hear(/^(?:bankbi)$/i,  (message) => { 
	return message.send(`
	Команды спец бизнеса " BANKBI " в штате !
	bopen - Открыть банк
	block - Закрыть банк
	xer - Снять деньги 100.000
	bbank - посмотреть баланс банка
	
	


🎁 Для Вас доступны подарки ! Чтобы открыть, напиши " подарок "

    `)
   });	
   ///////////////////////////////////////////
 vk.updates.hear(/^(?:элитмагаз)$/i,  (message) => { 
	return message.send(`
	║ 📍 Казино в штате - 100 рублей
    ║ 📍 Наркопритон - 80 рублей
    ║ 📍 Банк в штате - 50 рублей
    ║ 📍 Автозавод в штате - 70 рублей

    💻 Покупка осуществляется за реальные деньги. По поводу покупки, пишите главному администратору: https://vk.com/id515126478

	

    `)
   });	
   //////////////////////////////
   vk.updates.hear(/^(?:банда)$/i,  (message) => { 
	return message.send(`
	❄ 👓 Команды банды " Calentura "
🔫 calen - Каптить ( + 1 )
🚬 drugs - Принять наркотик
📰 fcapt - Посмотреть счет всех банд
💉 bdrugs id - передать наркотик игроку
🤷🏻‍♂ chi [id] - Принять в банду ( Для главных )
👦 cexit - Покинуть банду
♻ cbalance - Посмотреть баланс банды
👨‍💻 cchat [текст] - отправить смс в чат банды
cha id - выгнать с банды
👦 Члены - посмотреть список всех людей , состоявших в бандах

👓 Команды банды " HiBroNiga "
🔫 hibre - Каптить ( + 1 )
🚬 drugs - Принять наркотик 
📰 fcapt - Посмотреть счет всех банд 
💉 bdrugs id - передать наркотик игроку
🤷🏻‍♂ hhi [id] - Принять в банду ( Для главных )
👦 cexit - Покинуть банду
♻ hbalance - Посмотреть баланс банды
👨‍💻 hchat [текст] - отправить смс в чат банды
hca id - выгнать с банды
👦 Члены - посмотреть список всех людей , состоявших в бандах

🤙🏻 Посмотреть счет всех банд, напиши " fcapt "



    `)
   });	
   /////////////////////////////// 
   //////////////////////////////
   vk.updates.hear(/^(?:бизнесы 01|бизнесы 02|бизнесы 03|бизнесы 04|бизнесы 05|бизнесы 06|бизнесы 07|бизнесы 08|бизнесы 09|Самолеты 01|Самолеты 02|Самолеты 03|Самолеты 04|Самолеты 05|Самолеты 06|Самолеты 07|Самолетыы 08|Самолеты 09|Вертолеты 01|Вертолеты 02|Вертолеты 03|Вертолеты 04|Вертолеты 05|Вертолеты 06|Вертолеты 07|Вертолеты 08|Вертолеты 09|Питомцы 01|Питомцы 02|Питомцы 03|Питомцы 04|Питомцы 05|Питомцы 06|Питомцы 07|Питомцы 08|Питомцы 009|)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`

   💥 Ошибка ! Не правильный номер !


	

    `)
   });
   //////////////////////////////////
   ///////////////////////
   vk.updates.hear(/^(?:ринфо)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`
👪 Каждый, кто напишет " реф ${user_id(message.user)} " получит 50.000.000 $ и 10 рубинов !
👪 Пусть Ваш друг напишет " реф ${user_id(message.user)} " !

⏰ Акция " ХАЛЯВА " стартует 30.12.2018 в 15:00 ! 
😃 Хочешь статус модератора? ❤ 
Специально для Вас, мы приготовили крутую акцию ! 
Просто пригласи 50 друзей и получи 10.000.000 $ и СТАТУС МОДЕРАТОРА ! ☺💎

😏 Акция действует до 4 января 2019 года !

🍷🌚 Если вы уже пригласили 50 друзей, скорей пропишите " opengo " чтобы получить статус модератора !
⚠ Также, приглашайте 50 друзей подряд и получайте по 10.000.000 и СТАТУС МОДЕРАТОРА !

💻>>> Вы пригласили по акции: ${spaces(user.kkk)}
( если больше 50, скорей пиши " opengo " )

  


	

    `)
   });
   
    vk.updates.hear(/^(?:Карта)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`

💴 Баланс карты: ${spaces(user.karta)} $
📍 Кпополнить - пополнить карточку
📍 Кснять - снять деньги с карты
  


	

    `)
   });
   
   vk.updates.hear(/^(?:инфсемья)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`

👪 addsem [название] - Создать семью
👪 Семья - Инфа о вашей семье
👴 войти [название семьи] - Войти в семью
💂 покинуть - покинуть семью

f [text] - Чат семьи 


	

    `)
   });
    vk.updates.hear(/^(?:Ютуб)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`

💻 addtube - создать канал
💻 delltube - удалить канал
💻 kstats - статистика канала
💰 yset - заработать деньги
👪 подписаться [id] - подписаться на канал игрока 


	

    `)
   });
    vk.updates.hear(/^(?:Развлекательные)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`

✨ Развлекательные команды:
🔮 Шар [вопрос] - Ответит на ваш вопрос
🎩 Кто я? - Скажет Вам кто Вы
📡 Когда [текст] - Скажет когда произойдет событие 
💕➤ Обнять [id] - Обнять игрока 
💗 Лтест - Узнать кто любит Вас
🌚 Кто [текст] 
❄ Снежок [ID] - бросить снежок в игрока
👊🏻 Ударить [id] - забить игрока 
⛄ Снеговик - слепить снеговика 
⛄ Спрятаться - Спрятаться от снежков 
⛄ Ввыход - Выйти из блокады 


	

    `)
   });
   ////////////////////////////////////////////
    vk.updates.hear(/^(?:Ган)$/i,  (message) => { 
    let user = acc.users[user_id(message.user)];
	return message.send(`
	
➾ Здоровье: ${user.ahahah}
🔫 ➾ Оружие:
		`+(user.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${user.gun_name}\n`)+  
		` 
		🔫 ➾ Урон: ${user.uron}
		
        💉 Наркоты: ${spaces(user.qqq)} 


	💉 Наркота повышает здоровье ! ( 1 грамм = 100 % здоровья )
	*********** КОМАНДЫ УБИЙСТВА*********************
	СТРЕЛА ID [СТАВКА] 
	Убить ID - попытаться убить игрока 
	Спрятаться - спрятаться , для того чтобы Вас не убили
	

    `)
   });
 ///////////////////////////////////////////
 vk.updates.hear(/^(?:менты)$/i,  (message) => { 
	return message.send(`
	cardell ID - забрать машину у игрока
    gundell ID - забрать оружие у игрока
    jail ID сек - посадить в тюрьму игрока
	
	Лидер:
	allment id lvl ( от 1 до 2 )
	gov text - новости ( данная команда временно отключена )

⚠ [ВНИМАНИЯ]: В КАЧЕСТВЕ БЕЗОПАСНОСТИ , КЛАДИТЕ СВОИ ДЕНЬГИ В БАНК ! ( НАПИШИ " банк " )

    `)
   });	

	/// бонусы дл админов 

	vk.updates.hear(/^(?:админкейс)$/i, (message) => { 
		let id = user_id(message.user);
		let user = acc.users[user_id(message.user)];
		if(user.level < 1) return message.send(`💀 ➾ Доступ закрыт « 💀`);
		if(user.level > 1){

		if(user.bloks.a_case == true) return message.send(`💵 >> Админ-Кейс можно открывать раз в `); 
		 	user.bloks.a_case = true
			setTimeout(() => {
				user.bloks.a_case = false
		}, 86400000);

			let text = '✅ ➾ Открыв админ-кейс вы получили:\n'
			for(i=0;i<rand(4,8);i++){
				let x = rand(1,100)
				if(x<83){
					let sum = rand(50000,100000)
					user.balance += Number(sum);
					return text +=`💀 ➾ +${sum}$ на ваш баланс!`;
				}	
				if(x>83 && x<85){
					let sum = 1
					user.donate += Number(sum);
					return text +=`💎 ➾ +${sum} рубин(ов) на ваш баланс!`;
				}
				 
				if(x>85){
	 				mon = rand(2,4) 
	 				acc.users[id].exs += mon

	 				let up = lvlup(id);
	 				if(up == true){
	 					text += `🔹 >> ${mon} опыта [Уровень повышен]\n`
	 				}else{
	 					text += `🔹 >> ${mon} опыта\n`
	 				}
			}
		}
	////
}
});
 
 
	vk.updates.hear(/^(?:админка)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];

		if(user.level < 1) return message.send(`
			👑 ➾ VIP-Команды « 👑
 			✅ ➾ аправила - важно знать!   
			✅ ➾ стата - Ваша статистика.
			✅ ➾ get [ID] - проверить игрока.
			✅ ➾ sms [ID] [текст] - отправить личное сообщение
			✅ ➾ iznas [ID] причина - изнасиловать игрока
			✅ ➾ лс текст - отправить VIP сообщение
			✅ ➾ kiss [ID] - поцеловать игрока
  

			✅ ➾ setmoney [COUNT] - выдать себе валюту.
 			⚠ ➾ [COUNT] - от 1 до 500000.

 			☑ ➾ - - Бонусы - - « ☑
 			💴 ➾ Лимит на передачу: 7.000.000$
			🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
			⛔⛔ Цена: 120 рублей ⛔⛔

			- - - - - - - - - - - -
			👑 ➾ MODER-Команды « 👑
			⛔ ➾ Все команды VIP'a 

			✅ ➾ warn [ID] - выдать предупреждение. 
			✅ ➾ setmoney [COUNT] - выдать себе валюту.
 			⚠ ➾ [COUNT] - от 1 до 3000000.

			☑ ➾ - - Бонусы - - « ☑
 			💴 ➾ Лимит на передачу: 10.000.000$

			⛔⛔ Цена: 350 рублей ⛔⛔

			- - - - - - - - - - - -
			👑 ➾ ADMIN-Команды « 👑
			⛔ ➾ Все команды MODER'a   

			✅ ➾ ban [ID] - заблокировать навсегда.
			✅ ➾ unban [ID] - разблокировать игрока.  
			✅ ➾ setnick [ID] [NAME] - изменить ник.
			✅ ➾ setmoney [COUNT] - выдать себе валюту.
 			⚠ ➾ [COUNT] - от 1 до 10000000.
 			✅ ➾ Кикнуть [ССЫЛКА_ВК] - кикнуть из беседы.
 			⚠ ➾ В не офф.беседах кикает, если статус группы: 'Администратор'

			☑ ➾ - - Бонусы - - « ☑
 			💴 ➾ Лимит на передачу: 20.000.000$
			⛔ ➾ Нет лимита на ставки в играх!

			⛔⛔ Цена: 500 рублей ⛔⛔

			- - - - - - - - - - - -
			👑 ➾ Главный ADMIN-Команды « 👑
			✅ ➾ Все команды ADMIN'a

			✅ ➾ setmoney [COUNT] - выдать себе валюту.
 			⚠ ➾ [COUNT] - от 1 до 80000000.
			✅ ➾ vig ID ПРИЧИНА - выдать админ-выговор
			✅ ➾ unvig ID - снять все выговоры.
 			💴 ➾ Лимит на передачу: 20.000.000.
			⛔ ➾ Нет лимита на ставки в играх!

 			⛔⛔ Цена: 1500 рублей ⛔⛔
			`);
		if(user.level == 1){
			return message.send(`
				☑ ➾ VIP-Панель « ☑
				✅ ➾ аправила - важно знать!   
				✅ ➾ kiss [ID] - поцеловать игрока  
			    ✅ ➾ стата - Ваша статистика.
			    ✅ ➾ get [ID] - проверить игрока.
			    ✅ ➾ sms [ID] [текст] - отправить личное сообщение
			    ✅ ➾ iznas [ID] причина - изнасиловать игрока
				✅ ➾ лс текст - отправить VIP сообщение 

				✅ ➾ mute [ID] [TIME] - Выдать 'молчанку' игроку.
				✅ ➾ unmute [ID] - Снять 'Молчанку'.  

				✅ ➾ setmoney [COUNT] - выдать себе валюту.
 				⚠ ➾ [COUNT] - от 1 до 500000.

 				☑ ➾ - - Бонусы - - « ☑
 				💴 ➾ Лимит на передачу: 7.000.000$
				🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
  
				`);
		} 
		if(user.level == 2){

			return message.send(`
				☑ ➾ MODER-Панель « ☑
				✅ ➾ аправила - важно знать!   
				✅ ➾ warn [ID] - выдать предупреждение. 
				✅ ➾ mute [ID] [TIME] - Выдать 'молчанку' игроку.
				✅ ➾ unmute [ID] - Снять 'Молчанку'. 
                💴 ➾ тырнуть [ID] - стырить у игрока 50.000 $ ( Раз в 30 минут )				

				✅ ➾ ответ [ID] [TEXT] - ответить на репорт.
				✅ ➾ стата - Ваша статистика.  
				✅ ➾ get [ID] - проверить игрока.

				✅ ➾ setmoney [COUNT] - выдать себе валюту.
 				⚠ ➾ [COUNT] - от 1 до 3000000.

				☑ ➾ - - Бонусы - - « ☑
 				💴 ➾ Лимит на передачу: 10.000.000$
				🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
				`);
		}
		if(user.level == 3){

		return message.send(`
				☑ ➾ ADMIN-Панель « ☑
				✅ ➾ аправила - важно знать! 
				✅ ➾ ban [ID] - заблокировать навсегда.
				✅ ➾ unban [ID] - разблокировать игрока.
				✅ ➾ warn [ID] - выдать предупреждение. 
				✅ ➾ mute [ID] [TIME] - Выдать 'молчанку' игроку.
				✅ ➾ unmute [ID] - Снять 'Молчанку'.  
				✅ ➾ setnick [ID] [NAME] - изменить ник.

				✅ ➾ ответ [ID] [TEXT] - ответить на репорт.
				✅ ➾ стата - Ваша статистика.  
				✅ ➾ get [ID] - проверить игрока.

				✅ ➾ setmoney [COUNT] - выдать себе валюту.
 				⚠ ➾ [COUNT] - от 1 до 20000000.

 				✅ ➾ Кикнуть [ССЫЛКА_ВК] - кикнуть из беседы.
 				⚠ ➾ В не офф.беседах кикает, если статус группы: 'Администратор'

				☑ ➾ - - Бонусы - - « ☑
				⛔ ➾ Нет лимита на ставки в играх!
 				💴 ➾ Лимит на передачу: 10.000.000$
				🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
				`);
		}
		if(user.level > 3){

			return message.send(`
				☑ ➾ Админ-Панель « ☑
				✅ ➾ аправила - важно знать! 
				✅ ➾ ban [ID] - заблокировать навсегда.
				✅ ➾ unban [ID] - разблокировать игрока. 
				✅ ➾ warn [ID] - выдать предупреждение.
				✅ ➾ unwarn [ID] - снять все предупреждения.
				✅ ➾ mute [ID] [TIME] - Выдать 'молчанку' игроку.
				✅ ➾ unmute [ID] - Снять 'Молчанку'.  

				✅ ➾ setnick [ID] [NAME] - изменить ник.
				✅ ➾ ответ [ID] [TEXT] - ответить на репорт.
				✅ ➾ стата - Ваша статистика.

				✅ ➾ get [ID] - проверить игрока. 

				✅ ➾ setmoney [COUNT] - выдать себе валюту.
 				⚠ ➾ [COUNT] - от 1 до 80000000.
				- - - - - - - - - - - 

				✅ ➾ Кикнуть [ССЫЛКА_ВК] - кикнуть из беседы.
 				⚠ ➾ В не офф.беседах кикает, если статус группы: 'Администратор'

				✅ ➾ vig ID ПРИЧИНА - выдать админ-выговор
				✅ ➾ unvig ID - снять все выговоры.

				☑ ➾ - - Бонусы - - « ☑
				⛔ ➾ Нет лимита на ставки в играх!
				💴 ➾ Лимит на передачу: 20000000.
				🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
				`);
		}
	});
  
vk.updates.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(message.$from.type == 'user') return message.send(`⚠ ➾ Команда работает только в беседах!`);
 	if(user.level < 5) return message.send(`⚠ ➾ Вы не Администратор`);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
			if(res.object_id == 164822827) return message.reply('⚠ ➾ Отказ'); 

			if(acc.users[user_id(res.object_id)]){
				if(acc.users[user_id(res.object_id)].level > 2) return message.send(`⚠ ➾ Нельзя кикнуть этого игрока!`);
			} 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);
			});  
			return  
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		if(message.$match[3] == 164822827) return message.reply('⚠ ➾ Отказ'); 

		if(acc.users[user_id(message.$match[3])]){
			if(acc.users[user_id(message.$match[3])].level > 2) return message.send(`⚠ ➾Нельзя кикнуть этого игрока!`);
		}

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);}); 

		return  				
	} 
});

vk.updates.hear(/^(?:ник)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
	if(user.bloks.nik == true) return message.send(`Изменять ник можно раз в 24 часа !`);
 		user.bloks.nik = true
		setTimeout(() => {
			user.bloks.nik = false
		}, 86400000);
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`📗 ➾ Придумайте адекватный ник`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`📗 ➾ Придумайте адекватный ник`);
	}
	if(message.$match[1].length > 15) return message.send(`📗 ➾ Максимальная длина ника 15 символов.`);
	user.prefix = message.$match[1];
	return message.send(`📗 ➾ Вы сменили свой ник на: ${message.$match[1]}`);
});

vk.updates.hear(/^(?:рассылочка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 100) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[РАССЫЛКА]\n->${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});
vk.updates.hear(/^(?:!adm)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 100) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[👨‍⚕ Администрация VOLF:]\n->${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});
vk.updates.hear(/^(?:olo)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 100) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[🚨 [подсказка]:]\n${message.$match[1]}\nПриятной игр:)`
		});
	}
	return message.send(`Сообщения отправлены!`);
});
vk.updates.hear(/^(?:news)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].lvl < 9999) return;
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[📺 НОВОСТИ ШТАТА VOLF]\n->${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});

vk.updates.hear(/^(?:пострассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 100) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[Рассылка]:\n`,
			attachment: `${message.$match[1]}`
		});
	}
	return message.send(`Посты отправлены!`);
});
 

vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => { 

	if(message.$match[3]){
		var id = user_id(message.$match[3]);
		if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
		return message.send(`
			Игрок: ${acc.users[id].prefix}
			ID: ${id}
			Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
		`);
	}else{ 
		if(!message.$match[4]) return message.send(`Укажите данные`);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
			return message.send(`
				Игрок: ${acc.users[id].prefix}
				ID: ${id}
				Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
				`);
		})
		return;
	}
 
});


vk.updates.hear(/^(?:состав)/i, message => {  
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"Создатели"\n'; 
		gl = '"Гл.Администраторы"\n'; 

		admins = '"Администраторы"\n'
		moders = '"Модераторы"\n'; 
		vips = '\n"VIP"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.level == 5) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 4) gl += `👑 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 3) admins += `🔹 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 2) moders += `🔹 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 1) vips += `🔹 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:члены)/i, message => {  
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"Люди в банде Calentrura"\n'; 
		gl = '"Люди в банде HiBroNiga"\n'; 
	
        admins = "";
		moders = ""; 
		vips = ""; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.bbb >= 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.fff >= 1) gl += `👑 ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:чс)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ У этих челов стоит мут:>>>"\n'; 
		gl = '""\n'; 

		admins = '"Мут"\n'
		moders = '"\n'; 
		vips = '\n"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.mute == 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:banlist)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ У этих челов стоит мут:>>>"\n'; 
		gl = '""\n'; 

		admins = '"Мут"\n'
		moders = '"\n'; 
		vips = '\n"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.ban == 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:bag)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ У этих челов bag с балансом NULL>>>"\n'; 
		gl = '""\n'; 

		admins = '"NULL:"\n'
		moders = '"\n'; 
		vips = '\n"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.balance == null) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:онлайн)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '💻 Online игроки ( ID ):\n'; 
		gl = ''; 

		admins = ''
		moders = ''; 
		vips = ''; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.cl == true) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 1000) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:list)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ У этих челов bag с балансом NULL>>>"\n'; 
		gl = '""\n'; 

		admins = '"NULL:"\n'
		moders = '"\n'; 
		vips = '\n"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.balance >= 1.1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	})
	vk.updates.hear(/^(?:топ баланс)/i, message => {  
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"TOP 500 K"\n'; 
		gl = '""\n'; 

		admins = '""\n'
		moders = '""\n'; 
		vips = '\n""\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.balance == 500000) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});

vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: передать ID СУММА`)
	let user = acc.users[user_id(message.user)];
    if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);

	if(user.level < 1){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 99999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 5.000.000$\n👑 ➾ У VIP/MODER/ADMIN - Лимит передачи увеличен.`)  
	}
	if(user.level == 1){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 999999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 7.000.000$\n👑 ➾ У MODER/ADMIN - Лимит передачи увеличен.`)  
	}
	if(user.level == 2){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 999999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 10.000.000$\n👑 ➾ У ADMIN - Лимит передачи увеличен.`)  
	}
	if(user.level == 3){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 99999999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 20.000.000$`)  
	}
	if(user.level > 3){}
 
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.balance) return message.send(`👉 ➾ У вас нет столько $`);
	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 	
 	user.bloks.pay = true; 
		setTimeout(() => {
			user.bloks.pay = false;
	}, 360000);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]}$ | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]}$.`);
});

vk.updates.hear(/^(?:бпередать)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.bitcoin == null) return message.send(`🚨 Произошла ошибка ! Пожалуйста, напишите в репорт !`)   
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: бпередать ID СУММА`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.bitcoin) return message.send(`👉 ➾ У вас нет столько Биткоинов`);
	user.bitcoin -= Number(message.$match[2]);
	acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} bitcoins | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} bitcoins.`);
});	
vk.updates.hear(/^(?:bdrugs)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.bbb < 1) return message.send(` Вы не член банды !`);
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: bdrugs ID количество`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и количество должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.qqq) return message.send(`👉 ➾ У вас нет столько наркоты, купите командой " buydrugs [количество] "`);
	user.qqq -= Number(message.$match[2]);
	acc.users[message.$match[1]].qqq += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 ➾ Бандит [ID: ${id}] ${user.prefix} дал вам ${message.$match[2]} наркоты | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 ➾ Вы успешно выдали ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} наркоты.`);
});	
vk.updates.hear(/^(?:перевести)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: перевести ID СУММА`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.bank) return message.send(`👉 ➾ У вас нет в банке денежных средств ! `);
	user.bank -= Number(message.$match[2]);
	acc.users[message.$match[1]].bank += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} bitcoins | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} bitcoins.`);
});	
//////////////////////////////////////////СИСТЕМА БОНУСА 1.1		 
 
////// Система машин
	vk.updates.hear(/^(?:машины)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
 	let houses = ['Коробка', 'Подвал' , 'Палатка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 ➾ Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 ➾ Для покупки машины Вам нужен дом!`);  
		if(!message.$match[1]){
			return message.send(`
			➕ 1&#8419;. Mercedes S-Class - 35.000.000$
			➕ 2&#8419;. Volkswagen Phaeton - 45.000.000$
			➕ 3&#8419;. Lexus LS 430 - 60.000.000$
			➕ 4&#8419;. Skoda Rapid - 75.000.000$
			➕ 5&#8419;. Audi A8 -  95.000.000$
			➕ 6&#8419;. Range Rover - 119.000.000$
			➕ 7&#8419;. BMW X6 - 70.000.000$
			➕ 8&#8419;. Porsche Cayenne - 155.000.000$ 
			➕ 9&#8419;. BMW 7 Series - 164.000.000$
			 
			🚘 ➾ Для покупки напишите: Машины [номер] 
			⚠ ➾ 'В путь' отправить машину в рейс.
			👉 ➾ Машина продать - для продажи.
			👉 ➾ При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 35000000,45000000, 60000000,75000000,95000000,119000000,70000000,155000000,164000000,190000000];
 	let names = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
 	if(i < 0 || i > 10) return;
 	if(user.cars != false) return message.send(`🛥 ➾ У вас уже куплена машина`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cars = ids[i]; 
		acc.kazna += count[i];
 		return message.send(`🚘 ➾ Вы купили машину (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
 ////// Система елок
	vk.updates.hear(/^(?:елки)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	let houses = ['Коробка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👓 У вас дом не очень ! Купите сначала домик нормальный а потом уже и елочку !`)}
	}
 	if(user.house == false) return message.send(`♻  ➾ Для покупки елки Вам нужен дом!`);  
		if(!message.$match[1]){
			return message.send(`
			🎄🎁 1.Ель обыкновенная - 50.000 $
            🎄🎁 2.Ель канадская - 900.000 $
            🎄🎁 3.Ель французская - 1.000.000 $
            🎄🎁 4.Ель русская - 5.000.000 $

			 
			🎄 ➾ Для покупки напишите: Елки [номер] 
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4]
 	let count = [0,50000,900000,1000000,5000000];
 	let names = [0,'обыкновенная','канадская','французская ','русская']
 	if(i < 0 || i > 4) return;
 	if(user.rrr != false) return message.send(` У вас уже куплена елка`);
 	if(i > 0 && i <= 9999999999){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.rrr = names[i]; 
		acc.kazna += count[i];
 		return message.send(`🎄 Вы купили елочку  (${names[i]}) за ${count[i]}$ , с НОВЫМ ГОДОМ !`)
 	} 
 }); 
 //////////////// СИСТЕМА ПК
  ////// Система елок
	vk.updates.hear(/^(?:Компьютеры)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	let houses = ['Коробка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(` У вас дом не очень ! Купите сначала домик нормальный а потом уже и комп!`)}
	}
 	if(user.house == false) return message.send(`💻 ➾ Для покупки компа Вам нужен дом!`);  
		if(!message.$match[1]){
			return message.send(`
			💻 1.  Компьютер " XAPER X 1 " - 10000 $
💻 2. Компьютер " XAPER X 2 " - 30000 $
💻 3. Компьютер " VAAX 5 " - 150000 $
💻 4. Компьютер " MASX 56 " - 400000 $
💻 5. Компьютер " XAPER X 9 " - 700000 $


			 
			💻 ➾ Для покупки напишите: Компьютеры [номер] 
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4]
 	let count = [0,10000,30000,150000,400000,700000];
 	let names = [0,'XAPER X 1','XAPER X 2','VAAX 5','MASX 56','XAPER X 9 ']
 	if(i < 0 || i > 5) return;
 	if(user.cvb != false) return message.send(`💻 У вас уже куплен пк !`);
 	if(i > 0 && i <= 9999999999){
 		if(user.balance < count[i]) return message.send(`💻 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cvb  = names[i]; 
		acc.kazna += count[i];
 		return message.send(`💻 Вы купили пк  (${names[i]}) за ${count[i]}$ !`)
 	} 
 }); 
 
	vk.updates.hear(/^(?:машина продать)/i, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		let sum = count[user.cars] / 100 * 75;
		user.balance += sum; 
		user.cars = false; 
		return message.send(`🚘 ➾ Вы продали свой автомобиль за ${sum}$`)
	});

	vk.updates.hear(/^(?:в путь)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		if(!message.$match[1]){
			return message.send(`
			🚘 ➾  Места для отправки машины в рейс:

			1&#8419;. За город | 1ч 
			2&#8419;. В Москву | 2ч
			3&#8419;. За границу | 3ч 
			4&#8419;. На Северный полюс | 4ч 
 
			🚘 ➾ Вернувшись из рейса вы получите трофеи.
			🚘 ➾ Чем ценнее машина, тем лучше трофеи.
			⚠ ➾ Также, случайно может сломаться машина и она пропадет.
			`)
		}
	let i = message.$match[1]; 
	let name = [0, 'за город','в Москву','за границу','на северный полюс']
	let ids = [0,1,2,3,4]
 	let time = [0,3600000,7200000,10800000,14400000]
 	let times = [0,1,2,3,4]
 	if(i < 0 || i > 4) return;
 	if(user.reys != false) return message.send(`🚘 ➾ У вас уже отправлена машина в рейс`);
 	if(i > 0 && i <= 4){   
 		user.reys = true;
 		message.send(`🚘 ➾ Вы отправили машину в рейс (${name[i]}) на ${times[i]} часов.`)
 		if(rand(1,100) < 80){

 			setTimeout(() => {
 				let a = 0;
 				if(i==1){a = rand(1500,5000)}
 				if(i==2){a = rand(5000,9000)}
 				if(i==3){a = rand(10000,15000)}
 				if(i==4){a = rand(20000,30000)}
 				let id_car = user.car;
				if(id_car < 3){a += rand(1000,3000)}
				if(id_car > 3 && id_car < 6){a += rand(5000,8000)}
				if(id_car > 6){a += rand(90000,12000)}
				user.reys = false;
				return message.send(`🚘 ➾ Ваша машина успешно вернулась с рейса. Вы получили: ${a}$`)
			}, time[message.$match[1]]);

 		}else{
 			setTimeout(() => {
	 			user.reys = false;
				user.cars = false;
				return message.send(`🚘 ➾ К несчастью ваша машина попала в аварию. Груз не был доставлен, машину унилизировали.`)
			}, time);
 		} 
 	 
 	} 
 }); 

 
/////// Система вертолетов/самолетов

	vk.updates.hear(/^(?:вертолеты)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)]; 
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 ➾ Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 ➾ Для покупки вертолета Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 5
		if(!message.$match[1]){
			return message.send(`
			➕ 1&#8419;. Agusta A129 Mangusta - 15.000.000$
			➕ 2&#8419;. Ми-24 - 25.000.000$
			➕ 3&#8419;. AH-2 - 35.000.000$
			➕ 4&#8419;. CAIC WZ-10 - 39.000.000$
			➕ 5&#8419;. HAL LCH -  43.000.000$
			➕ 6&#8419;. Eurocopter Tiger - 50.000.000$
			➕ 7&#8419;. Ка-52 - 65.000.000$
			➕ 8&#8419;. Apache - 80.000.000$  
			 
			🚁 ➾ Для покупки напишите: Вертолеты [номер] 
			👉 ➾ Вертолет продать - для продажи.
			👉 ➾ При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 150000000,25000000,35000000,39000000,43000000,50000000,6500000,80000000];
 	let names = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
 	if(i < 0 || i > 8) return;
 	if(user.helicopter != false) return message.send(`🚁 ➾ У вас уже куплен вертолет`);
 	if(i > 0 && i <= 8){
 		if(user.balance < count[i]) return message.send(`🚁 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.helicopter = ids[i];
 		return message.send(`🚁 ➾ Вы купили машину (${names[i]}) за ${count[i]}$`)
 	} 
 }); 

 	vk.updates.hear(/^(?:самолеты)\s?([1-9]+)?/i,(message) => {  

 	let user = acc.users[user_id(message.user)];  
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом','Дом в лесу'] // car
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 ➾ Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 ➾ Для покупки вертолета Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 7
		if(!message.$match[1]){
			return message.send(`
			➕ 1&#8419;. Fokker DR1 Triplane - 30.000.000$
			➕ 2&#8419;. Mitsubishi A6M Zero - 85.000.000$
			➕ 3&#8419;. Су-35С - 90.000.000$ 
			 
			✈ ➾ Для покупки напишите: Самолеты [номер] 
			👉 ➾ Самолет продать - для продажи.
			👉 ➾ При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 30000000,85000000,90000000];
 	let names = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']
 	if(i < 0 || i > 3) return;
 	if(user.aircraft != false) return message.send(`✈ ➾ У вас уже куплен самолет`);
 	if(i > 0 && i <= 3){
 		if(user.balance < count[i]) return message.send(`✈ ➾ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.aircraft = ids[i];
 		return message.send(`✈ ➾ Вы купили самолет (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
 

	vk.updates.hear(/^(?:самолет продать)/i,  (message) => {
		let count = [0, 30000000,85000000,90000000];
		let user = acc.users[user_id(message.user)];
		if(user.aircraft == false) return message.send(`✈ ➾ У вас нет самолета`)
		let sum = count[user.aircraft] / 100 * 75;
		user.balance += sum;
		user.aircraft = false;
		return message.send(`✈ ➾ Вы продали свой самолет за ${sum}$`)
	});

	vk.updates.hear(/^(?:вертолет продать)/i,  (message) => {
		let count = [0, 50000000,15000000,35000000,39000000,43000000,50000000,6500000,80000000];
		let user = acc.users[user_id(message.user)];
		if(user.helicopter == false) return message.send(`🚁 ➾ У вас нет вертолета`)
		let sum = count[user.helicopter] / 100 * 75;
		user.balance += sum;
		user.helicopter = false;
		return message.send(`🚁 ➾ Вы продали свой вертолет за ${sum}$`)
	});
///// Бизнес система - - - - - - -
	vk.updates.hear(/^(?:статистика)\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 ➾ Статистика бизнесов: \n';
		if(user.bizs.one_biz == true){ text +=  `🔸 ➾ Бизнес: ${user.bizs.one.name}\n🔸 ➾ Прибыль: ${user.bizs.one.zp}$\n🔸 ➾ Людей: ${user.bizs.one.people}\n🔸 ➾ Максимальное кол-во людей: ${user.bizs.one.max_peop}\n`}
		if(user.bizs.two_biz == true){ text +=  `🔸 ➾ Бизнес: ${user.bizs.two.name}\n🔸 ➾ Прибыль: ${user.bizs.two.zp}$\n🔸 ➾ Людей: ${user.bizs.two.people}\n🔸 ➾ Максимальное кол-во людей: ${user.bizs.two.max_peop}`}
		return message.send(text)
	});

 

 vk.updates.hear(/^(?:бизнесы)\s?([1-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 			🏢 1&#8419;. Палатка | 1.000.000$ [5]  
			🏢 2&#8419;. Ларек | 5.000.000$ [10]  
			🏢 3&#8419;. Магазин | 20.000.000$ [15] 
			🏢 4&#8419;. Гипермаркет | 30.000.000$ [20]  
			🏢 5&#8419;. Универмаг | 50.000.000$ [25]  
			🏢 6&#8419;. АЗС | 70.000.000$ [30]  
			🏢 7&#8419;. Атомная станция | 90.000.000$ [35]   
			🏢 8&#8419;. Интернет провайдер | 110.000.000$ [40] 
			🏢 9&#8419;. Банк | 130.000.000$ [45]  
			
			🏢 ➾ В скобочках: кол-во доступных к найму рабочих
			⚠ ➾ Нанять рабочего: нанять [кол-во] [номер 1-2] | +5k/ч
			🏢 ➾ Цена найма 1 рабочего - 50.000$

			🏢 ➾ Для покупки напишите: Бизнесы [номер]
			🏢 ➾ Данные о бизнесе: статистика 

			⚠ ➾ 'Прибыль' - получить ежечасную прибыль

			⚠ ➾ Для продажи: 'Бизнес продать [номер]'
			👉 ➾ При продаже вернется 75% от суммы.
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 1000000, 5000000,20000000,30000000,50000000,70000000,90000000,110000000,130000000,210000000];
	let max_peop = [0,5,10,15,20,25,30,35,40,45,50]
 	let names = [0, 'Палатка','Ларек','Магазин','Гипермаркет','Универмаг','АЗС','Атомная станция','Интернет провайдер','Банк','Наркопритон'] 
 	if(i < 0 || i > 10) return message.send(`🏢 ➾ Неверный номер бизнеса.`)
 	if(!Number(message.$match[1])) return message.send(`🏢 ➾ Укажите номер бизнеса`)

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас нет такой суммы.`);
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.max_peop = max_peop[i];
		return message.send(`🏢 ➾ Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	if(Number(i) == user.bizs.one.id) return message.send(`🏢 ➾ У вас уже куплен такой вид бизнеса.`)
	if(Number(i) == user.bizs.two.id) return message.send(`🏢 ➾ У вас уже куплен такой вид бизнеса.`)	
	if(user.bizs.two_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас нет такой суммы.`);
		if(Number(i) == user.bizs.one.id) return message.send(`🏢 ➾ У вас уже куплен такой вид бизнеса.`)
		user.balance -= count[i];
		user.bizs.two_biz = true;
		user.bizs.two.count = Number(count[i])
		user.bizs.two.id = Number(i) 
		 user.bizs.two.name =  names[i];
		user.bizs.two.max_peop = max_peop[i];
		return message.send(`🏢 ➾ Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	return message.send(`🏢 ➾ У вас уже куплено 2 бизнеса.`) 
 
 });
 

	vk.updates.hear(/^(?:бизнес продать)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢 ➾ У вас нет бизнесов.`)
		if(message.$match[1] < 0 || message.$match[1] > 2) return message.send(`🏢 ➾ Укажите верный номер бизнеса.`);
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
			return message.send(`🏢 ➾ Вы продали свой бизнес за ${sum}$`);
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
			return message.send(`🏢 ➾ Вы продали свой бизнес за ${sum}$`);
		}		  
	 
	});


	vk.updates.hear(/^(?:нанять)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
		if(!message.$match[1]) return message.send(`🏢 ➾ Укажите количество рабочих | нанять <кол-во> <номер>`)
		if(!message.$match[2]) return message.send(`🏢 ➾ Укажите номер бизнеса | нанять <кол-во> <номер>`)
		if(!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > 100 || !Number(message.$match[2]) || message.$match[2] < 1 || message.$match[2] > 2) return message.send(`🏢 Неверно указаны данные | нанять <кол-во> <номер>`)
		let id = user_id(message.user)
		let num = message.$match[2]; 
		if(message.$match[1] * 50000 > acc.users[id].balance) return message.send(`🏢 ➾ Для покупки [${message.$match[1]}] рабочих нужно [${message.$match[1] * 50000}$]`);
	    if(message.$match[2] == 1){ 
	    	if(acc.users[id].bizs.one_biz == false) return message.send(`🏢 ➾ У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < message.$match[1]) return message.send(`🏢 ➾ Максимальное количество работников: ${acc.users[id].bizs.one.max_peop}`)
	    	acc.users[id].bizs.one.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.one.zp += 5000 * Number(message.$match[1]);
	    	return message.send(`🏢 ➾ Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`)
	    }
	    if(message.$match[2] == 2){
	    	if(acc.users[id].bizs.two_biz == false) return message.send(`🏢 ➾ У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.two.max_peop - acc.users[id].bizs.two.people < message.$match[1]) return message.send(`🏢 ➾ Максимальное количество работников: ${acc.users[id].bizs.two.max_peop}`)
	    	acc.users[id].bizs.two.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.two.zp += 5000 * Number(message.$match[1]);
	    	return message.send(`🏢 ➾ Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`)
	    } 
		 
	});

	vk.updates.hear(/^(?:прибыль)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢️ ➾ У вас нет бизнесов.`); 
 	if(user.bizs.one.stop == true || user.bizs.two.stop == true) return message.send(`🏢️ ➾ Прибыль можно брать раз в час.`)
 	
 	if(user.bizs.one_biz == true){
 		text += `📝 ➾ Прибыль с бизнеса <${user.bizs.one.name}> составила: ${user.bizs.one.zp}$\n`;
 		user.balance += Number(user.bizs.one.zp)
 	}
 	if(user.bizs.one_biz == true){
 		text += `📝 ➾ Прибыль с бизнеса <${user.bizs.two.name}> составила: ${user.bizs.two.zp}$\n`;
 		user.balance += Number(user.bizs.two.zp)
 	}

 	user.bizs.one.stop = true;
 	user.bizs.two.stop = true;
 
	setTimeout(() => {
			user.bizs.one.stop = false;
			user.bizs.two.stop = false; 
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `💵 Ваш бизнес принес вам прибыль ! Напишите " прибыль " чтобы снять деньги.` 
		});
	}, 3600000);


 	return message.send(`
 		${text} 
 		`);
 });
  

 

///// АДМИН КОМАНДЫ - - - -- - - 
 
 

 	vk.updates.hear(/^(?:стата)/i,(message) => { 
 		let user = acc.users[user_id(message.user)];
 		if(user.level < 1) return;
 		let warns = ''; 
 		return message.send(`
 			🔔 ~ ~ Статистика Администратора ~ ~ 🔔

 			🔸 ➾ Уровень администратора: ${user.level}
 			🔸 ➾ Часов до снятия: ${user.adm_time}

 			✉ ➾ Количество ответов: [${user.ainfo.all_ans}]
			♻ ➾ Репутация: [${user.ainfo.good_ans}/${user.ainfo.bad_ans}] (хорошо/плохо)
			⚠ ➾ Выговоров: [${user.ainfo.vig}]   
 			`);

 	});

	vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ вы не написали жалобу | репорт [текст]`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 2){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `👉 ➾ [REPORT]\n👉 ➾ ID игрока: ${user_id(message.user)}\n👉 ➾ Жалоба: ${message.$match[1]}\n👉 ➾ [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 ➾ Вы успешно отправили жалобу.`);
	});
	vk.updates.hear(/^(?:удалить)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(``);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`⚠ Напишите " удалить аккаунт "`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 99){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `👉 ➾ [ACC DELL]\n👉 ➾ ID игрока: ${user_id(message.user)}\n👉 ➾ Просит удалить аккаунт: ${message.$match[1]}\n👉 ➾ [Для удаления: delluser [ID]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`⚠ Ваша заявка на удаления аккаунта была отправлена на рассмотрения администраторам !`);
	});
	vk.updates.hear(/^(?:vipsc|ls|лс|лсс|випкаа)\s?([^]+)?/i, (message) => {		
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " лс " кто будет писать?!`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 1){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 👑 >: [VIP CHAT]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`💌 VIP сообщение успешно отправлено:`);
	});
	vk.updates.hear(/^(?:sdsfdsfdfsfsd)\s?([^]+)?/i, (message) => {		
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
		if(acc.users[id].frac_name == false) return message.send(`👬 ➾ Вы не находитесь в семье`); 
        let id = user_id(message.user)
		let user = acc.users[user_id(message.user)];
		if(user.frac_name != true) return message.send(`У вас нет семьи !`);
		if(!message.$match[1]) return message.send(`А текст после " f " кто будет писать?!`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].frac_name == user.frac_name){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 🐓 >: [Семья]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🐓 Сообщение успешно отправлено:`);
	});
	vk.updates.hear(/^(?:выфаf)\s?([^]+)?/i, (message) => {		
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
        let id = user_id(message.user)
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " f " кто будет писать?!`);
		if(acc.users[id].clan != false) return message.send(`👬 ➾ Вы не находитесь в семье`); 
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);
		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].clan == user.clan){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 🐓 >: [Семья]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🐓 Сообщение успешно отправлено:`);
	});
	vk.updates.hear(/^(?:cchat)\s?([^]+)?/i, (message) => {		
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(user.bbb < 1) return message.send(`🔸 ➾ Вы не член банды Calentura !`);
		if(!message.$match[1]) return message.send(`А текст после " cchat " кто будет писать?`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].bbb >= 1){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 👨‍💻 >: [Calentura]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`Cообщение успешно отправлено !`);
	});
	vk.updates.hear(/^(?:hchat)\s?([^]+)?/i, (message) => {		
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " hchat " кто будет писать?!`);
		if(user.fff < 1) return message.send(`🔸 ➾ Вы не член банды HiBroNiga !`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].fff >= 1){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 👨‍💻 >: [HiBroNiga]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`Cообщение успешно отправлено !`);
	});
	vk.updates.hear(/^(?:43о)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(`🌱 Общаться можно только в лс ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " о " кто будет писать?!`);
		if(user.chat < 1) return message.send(`🔸 ➾ У Вас отключен общий чат ! Включите командой " vkla "`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].chat >= 1){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `🌍 [OOC]\n🌈 ID игрока: ${user_id(message.user)}\n🌱 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`💌 VIP сообщение успешно отправлено:`);
	});
	vk.updates.hear(/^(?:sa|sa|sa|sa|sa)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(`Общаться можно только в лс ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " лс " кто будет писать?!`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);
		
		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].frac_name = true){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 👑 >: [VIP CHAT]\n👉 ➾ ID игрока: ${user_id(message.user)}\n💌 Сообщение:: ${message.$match[1]}\n`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`💌 VIP сообщение успешно отправлено:`);
	});


	vk.updates.hear(/^(?:респект)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: респект +/-\n🔸 ➾ [+ -> хороший ответ/ - -> плохой ответ]`);
		if(user.rep.status == false) return message.send(`🔸 ➾ Проверьте вводимые данные.`); 
		if(message.$match[1] == '+' || message.$match[1] == '-'){
			user.rep.status = false; 
			if(message.$match[1] == '+') acc.users[user.rep.id].ainfo.good_ans += 1; 
			if(message.$match[1] == '-') acc.users[user.rep.id].ainfo.bad_ans += 1;  
			let id = user.rep.id;
			user.rep.id = false;
			return message.send(`🔸 ➾ Вы успешно оценили ответ \n🔸 ➾ Администратора [${acc.users[id].prefix}] - ${message.$match[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)
			 
		}
		return message.send(`🔸 ➾ Проверьте вводимые данные.`); 
	});
 
	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
		if(user.level < 2) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `👉 ➾ Администратор: ${user.prefix} ответил Вам:\n👉 ${message.$match[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`👉 ➾ Ответ отправлен.`)
	});
	vk.updates.hear(/^(?:чмо)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
		if(user.level < 100) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `👉 ➾ Разработчик: ${user.prefix} ответил Вам:\n👉 ${message.$match[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`👉 ➾ Ответ отправлен.`)
	});
	vk.updates.hear(/^(?:sms)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
		if(user.level < 1) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `👑 VIP 👑: ${user.prefix} прислал вам сообщение :\n👉 ${message.$match[2]}\n\n`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		user.ainfo.all_ans += 0;
		user.ainfo.ans += 0;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`👉 ➾sms отправлено`)
	});

	vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`); 
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.$match[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 ➾ Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 ➾ Придумайте адекватный ник`);
		}
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		acc.users[message.$match[1]].prefix = message.$match[2];
		user.ainfo.nicks += 1;
		return message.send(`📗 ➾ Вы сменили ник игрока на: ${message.$match[2]}`);
	});

	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].level > 5) return message.send(`Ошибка !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
	vk.updates.hear(/^(?:setpit)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: setpit [ID] [название]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`🔸 ➾ Вы не спец администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].level > 1) return message.send(`Ошибка !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].pit = message.$match[2]; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Успешно !`);
	}); 
	vk.updates.hear(/^(?:can)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
	vk.updates.hear(/^(?:бан)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
	vk.updates.hear(/^(?:pidoras)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
	vk.updates.hear(/^(?:iznas)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.bloks.cases == true) return message.send(`<<< 😪🤞🏻 >>>: НАСИЛОВАТЬ ИГРОКА МОЖНО РАЗ в 24 часа`);
 		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
 		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: iznas [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `😻😻😻😻 О ЕЕЕЕЕЕ ${user.prefix} ИЗНАСИЛОВАЛ ТЕБЯ.\n✅ ➾ Причина: ${message.$match[2]}\n`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`😻😻😻😻 .!. ВЫ ИЗНАСИЛОВАЛИ [${acc.users[message.$match[1]].prefix}] :))))\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
 
 
vk.updates.hear(/^(?:setmoney)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача валюты.`)
	if(user.level < 1) return message.send(`⚠ Доступ временно закрыт.`);
	if(user.bloks.giverub == true) return message.send(`💰 ➾ Выдавать валюту можно раз в час`);
	if(user.level == 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 500000) return message.send(`💰 ➾ Пример: 'setmoney [1-500000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 3000000) return message.send(`💰 ➾ Пример: 'setmoney [1-3000000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000) return message.send(`💰 ➾ Пример: 'setmoney [1-10000000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level > 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 80000000) return message.send(`💰 ➾ Пример: 'setmoney [1-80000000]'`);
		user.balance += Number(message.$match[1]);
	}
	user.bloks.giverub = true;
		setTimeout(() => {
			user.bloks.giverub = false;
	}, 3600000);

	return message.send(`💰 ➾ Вы выдали себе ${spaces(message.$match[1])}$`);
});
vk.updates.hear(/^(?:kbala)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.kazino < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.mer < 1) return message.send(`⚠ Вы не владелец!`);
	if(user.mer >= 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000000000000000) return message.send(`💰 ➾ Пример: 'kbala'`);
		user.balance += Number(message.$match[1]);
		acc.kazino -= Number(message.$match[1]);
	}
	return message.send(`Вы сняли сумму !`);
});
vk.updates.hear(/^(?:caa)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.den < message.$match[1]) return message.send(`💰 оу, у там нет сток бабла ((`)
	if(user.bbb < 3) return message.send(`⚠ Вы не лидер!`);
	if(user.bbb >= 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000000) return message.send(`💰 ➾ Пример: 'caa [сумма]'`);
		user.balance += Number(message.$match[1]);
		acc.den -= Number(message.$match[1]);
	}
	return message.send(`Вы сняли сумму !`);
});
vk.updates.hear(/^(?:haa)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.bro < message.$match[1]) return message.send(`💰 оу, у там нет сток бабла ((`)
	if(user.fff < 3) return message.send(`⚠ Вы не лидер!`);
	if(user.bbb >= 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000000) return message.send(`💰 ➾ Пример: 'haa [сумма]'`);
		user.balance += Number(message.$match[1]);
		acc.bro -= Number(message.$match[1]);
	}
	return message.send(`Вы сняли сумму !`);
});
vk.updates.hear(/^(?:положить)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.vlock == false) return message.send(`🚧 Владелец банка закрыл его.`);
	if(user.bank <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас "`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 200000000000) return message.send(`💰 ➾ Пример: 'положить сумма' ( Ложить можно до 2.000.000 )`);
		user.balance -= Number(message.$match[1]);
		user.bank += Number(message.$match[1]);
		acc.sla += 1000000;
	}
	return message.send(`Вы положили в банк ${spaces(message.$match[1])}$`);
});
vk.updates.hear(/^(?:кпополнить)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.vlock == false) return message.send(`🚧 Владелец банка закрыл его.`);
	if(user.bank <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас "`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 1500000) return message.send(`💰 ➾ Пример: 'кпополнить' ( лимит 1.500.000 $ )`);
		user.balance -= Number(message.$match[1]);
		user.karta += Number(message.$match[1]);
		acc.sla += 1000000;
	}
	return message.send(`Вы положили на карту ${spaces(message.$match[1])}$`);
});
vk.updates.hear(/^(?:конкурс)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 20000000000000) return message.send(`💰 ➾ Пример: 'конкурс сумма' ( Ложить можно до 2.000.000 )`);
		user.balance -= Number(message.$match[1]);
		user.xd += Number(message.$match[1]);
	}
	return message.send(`Вы положили в банк конкурса ${spaces(message.$match[1])}$`);
});
vk.updates.hear(/^(?:xer)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.lox < 1) return message.send(`⚠ Вы не владелец!`);
	if(acc.sla < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 100000 || message.$match[1] > 10000000000) return message.send(`💰 ➾ Снимать можно только больше 1кк ! И на балансе нужно, чтобы было 100.000 !`);
		user.balance += Number(message.$match[1]);
		acc.sla -= Number(message.$match[1]);
	}
	return message.send(`Вы сняли сумму!`);
});
vk.updates.hear(/^(?:снять)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.vlock == false) return message.send(`🚧 Владелец банка закрыл его.`);
	if(user.bank <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас " !`);
	if(user.bank < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 20000000000) return message.send(`💰 ➾ Пример: 'снять сумма'( снимать можно до 2.000.000 )`);
		user.bank -= Number(message.$match[1]);
		user.balance += Number(message.$match[1]);
	}
	return message.send(`Вы сняли ${spaces(message.$match[1])}$`);
});
vk.updates.hear(/^(?:кснять)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(acc.vlock == false) return message.send(`🚧 Владелец банка закрыл его.`);
	if(user.karta <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас " !`);
	if(user.karta < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
	if(user.lvl >= 0){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 100000) return message.send(`💰 ➾ Пример: 'кснять'( снимать можно до 100.000)`);
		user.karta -= Number(message.$match[1]);
		user.balance += Number(message.$match[1]);
	}
	return message.send(`Вы сняли ${spaces(message.$match[1])}$ с карты !`);
})
vk.updates.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 100) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givebit [ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});

vk.updates.hear(/^(?:раздачаметеорит)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'раздачаметеорит[ID] [COUNT]'`); 
			acc.users[message.$match[1]].aaa += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
		    vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❄ Спасибо за участие в раздаче ! Вам начислено ${message.$match[2]} метеорита !`
		});
			return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});
vk.updates.hear(/^(?:раздачабаланс)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'раздачаметеорит[ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
		    vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❄ Спасибо за участие в раздаче ! Вам начислено ${message.$match[2]} $ !`
		});
			return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});
vk.updates.hear(/^(?:givebit)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'giverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} биткоинов`);
 
	 
});
vk.updates.hear(/^(?:givepolice)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 100) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givepolice [ID] [lvl]'`); 
			acc.users[message.$match[1]].mysor = Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`SER Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});
vk.updates.hear(/^(?:уважать)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 0) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'уважать [ID] 1'`); 
			acc.users[message.$match[1]].his += 1(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`:D УВАЖУХА ЕПТА В ТЕМЕ`);
 
	 
});
vk.updates.hear(/^(?:ungiverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'ungiverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance -= Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 ➾ Вы отняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});

vk.updates.hear(/^(?:removerub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'removerub [ID]'`); 
			acc.users[message.$match[1]].balance = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`💰 ➾ Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});


vk.updates.hear(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`🔸 ➾ Вы не спец.администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedonate [ID] [COUNT]'`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💎 ➾ Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} рубинов💎`);
});
vk.updates.hear(/^(?:givedrugs)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`🔸 ➾ Вы не спец.администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedrugs [ID] [COUNT]'`); 
	acc.users[message.$match[1]].qqq += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
});

vk.updates.hear(/^(?:removedonate)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💎 ➾ Пример: 'removedonate [ID] [COUNT] \n💎 ➾ COUNT - количество отнимаемого доната.'`); 
			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`); 
			acc.users[message.$match[1]].donate -= Number(message.$match[2]);
			return message.send(`💎 ➾ Вы забрали  у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} рубинов`);
	 
});


 


vk.updates.hear(/^(?:спец)$/i, message => {
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
			return message.send(`
				Команды спец.администратора
				removerub [id] - аннулировать валюту.
				givedonate [id] [count] - выдать донат.
				removedonate [id] [count] - отнять кол-во доната.
				givebro [id] - Выдать лидерку HiBroNiga
				givecalen [id] - Выдать лидерку Calentura
				resta - обнулить счета банд
	            aresta - оффнуть капт
	            dresta - вкл капт
				**********************
				○ givekaz id - выдать казик
                ○ dellkaz id - забрать казик
                ○ givebank id - выдать банк
                ○ dellbank id - забрать банк



                🌍 ►  Сонли - сбросить онлайн
                ❄ ►   Мороз - включить систему мороза

                👒 givedrugs id кол-во - выдать наркоты 
                👝 bag - посмотреть список людей с багом баланса


				**********************
				
				kazna - снять 10.000 с казны штата

				boostzp ID LVL(1-24)
				boostbiz ID LVL(1-24)

				givevip id time
				givemoder id time
				giveadm id time 
				
				* * * РАЗДАЧА * * *
				раздачаметеорит id [сумма]
				раздачабаланс id [сумма]
				( Данные команды используйте для раздачи ).

				`);
 
});


vk.updates.hear(/^(?:delluser)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 100) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'delluser [ID]'`); 

			acc.users[message.$match[1]].balance = 0;
		 	acc.users[message.$match[1]].bitcoin = 0
		 	acc.users[message.$match[1]].donate = 0
		 	acc.users[message.$match[1]].exs = 0
		 	acc.users[message.$match[1]].exsup = 50
		 	acc.users[message.$match[1]].lvl  = 0
		 	acc.users[message.$match[1]].game.binlose =0
		 	acc.users[message.$match[1]].game.binwin =0
		 	acc.users[message.$match[1]].game.binstop = false
		 	acc.users[message.$match[1]].game.kazlose =0
		 	acc.users[message.$match[1]].game.kazwin =0
		 	acc.users[message.$match[1]].game.rand_lose =0
		 	acc.users[message.$match[1]].game.rand_win =0
		 	acc.users[message.$match[1]].game.stavka_win =0
		 	acc.users[message.$match[1]].game.stavka_lose =0
		 	acc.users[message.$match[1]].game.win = 50
		 	acc.users[message.$match[1]].msg.messages = 0
		 	acc.users[message.$match[1]].msg.last_msg = ''
		 	acc.users[message.$match[1]].prefix = `Удален | ${time()} | ${data()}`
		 	acc.users[message.$match[1]].cars = false
		 	acc.users[message.$match[1]].house = false
		 	acc.users[message.$match[1]].lodka = false
		 	acc.users[message.$match[1]].rep.status = false
		 	acc.users[message.$match[1]].rep.id = false 
		 	acc.users[message.$match[1]].warn = 0 
		 	acc.users[message.$match[1]].warn_p = []
		 	acc.users[message.$match[1]].aircraft = false
		 	acc.users[message.$match[1]].helicopter = false 
		 	acc.users[message.$match[1]].level = 0
		 	acc.users[message.$match[1]].bizs.one_biz = false
		 	acc.users[message.$match[1]].bizs.two_biz =  false
		 	acc.users[message.$match[1]].bizs.one.count = false
		 	acc.users[message.$match[1]].bizs.one.balance = 0
		 	acc.users[message.$match[1]].bizs.one.id = false
		 	acc.users[message.$match[1]].bizs.one.name = false
		 	acc.users[message.$match[1]].bizs.one.people = 0
		 	acc.users[message.$match[1]].bizs.one.uplvl = 0
		 	acc.users[message.$match[1]].bizs.one.zp = 0 
		 	acc.users[message.$match[1]].bizs.two.count = false
		 	acc.users[message.$match[1]].bizs.two.balance = 0
		 	acc.users[message.$match[1]].bizs.two.id = false
		 	acc.users[message.$match[1]].bizs.two.name = false
		 	acc.users[message.$match[1]].bizs.two.people = 0
		 	acc.users[message.$match[1]].bizs.two.uplvl = 0
		 	acc.users[message.$match[1]].bizs.two.zp = 0 
		 	acc.users[message.$match[1]].bizs.two.max_peop = 0 
		 	acc.users[message.$match[1]].bizs.one.max_peop = 0 
		 	acc.users[message.$match[1]].job.name = false;
		 	acc.users[message.$match[1]].job.count = 0;
		 	acc.users[message.$match[1]].job.stop = false;
		 	acc.users[message.$match[1]].job.lvl = 0;
		 	acc.users[message.$match[1]].mute = false;
		 	acc.users[message.$match[1]].ferm.id = false;
		 	acc.users[message.$match[1]].ferm.zp = 0;
		 	acc.users[message.$match[1]].reys = false;
		 	acc.users[message.$match[1]].housep = 0;
		 	acc.users[message.$match[1]].pit = false;
		 	acc.users[message.$match[1]].bank = 0;
		 	acc.users[acc.users[message.$match[1]].brak].brak = false;
		 	acc.users[message.$match[1]].brak = false;
		 	acc.users[message.$match[1]].safe.status = false;
		 	acc.users[message.$match[1]].safe.key = false;
		 	acc.users[message.$match[1]].credit = 0;
		 	acc.users[message.$match[1]].procent = 0;
		 	acc.users[message.$match[1]].global_exs = 0;
		 	acc.users[message.$match[1]].autozp = false;
		 	acc.users[message.$match[1]].autobiz = false;
		 	acc.users[message.$match[1]].frac_name = false;
		 	acc.users[message.$match[1]].duel = false;
		 	acc.users[message.$match[1]].duel_summ = false;
		 	acc.users[message.$match[1]].uron = 0;
		 	acc.users[message.$match[1]].gun_name = false;
		 	acc.users[message.$match[1]].block_game = true;
		 	acc.users[message.$match[1]].nachal = false;
					 
			return message.send(`💰 ➾ Вы удалил аккаунт игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	
});
/////////////////////////////////////
vk.updates.hear(/^(?:giveler)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 100) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'giveler [ID]'`); 

		 	acc.users[message.$match[1]].pit = `админ`;
			acc.users[message.$match[1]].balance = 0;
					 
			return message.send(`Успешно !`);
	
});
///////////////////////////////////
vk.updates.hear(/^(?:givepopa)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 100) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'givepopa [ID]'`); 

		 	acc.users[message.$match[1]].pit = `грязный бомж`;
					 
			return message.send(`Успешно !`);
	
});
///////////////////////////////////
vk.updates.hear(/^(?:givepizda)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 100) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'givepizda [ID]'`); 

		 	acc.users[message.$match[1]].pit = `Вонючая пизда`;
					 
			return message.send(`Успешно !`);
	
});
/////////////////////////////////// 
vk.updates.hear(/^(?:cardell)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].mysor < 1) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 1) return message.send(`🔸 ➾ Вы не мент !`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'cardell [ID]'`); 

		 	acc.users[message.$match[1]].cars = false
		 	
					 
			return message.send(`Вы забрали машину у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	
});
///////////////////////////////
vk.updates.hear(/^(?:gundell)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].mysor < 1) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 1) return message.send(`🔸 ➾ Вы не мент !`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'gundell [ID]'`); 

		 	acc.users[message.$match[1]].gun_name = false;
		 	
					 
			return message.send(`Вы забрали оружие у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	
});
///////////////////////////////
vk.updates.hear(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];;
	if(user.mysor < 1) return message.send(`🔸 ➾ Вы не мент`);
	if(user.bloks.ment == true) return message.send(`Сажать можно раз в 10 минут`);
 		user.bloks.ment = true
		setTimeout(() => {
			user.bloks.ment = false
		}, 600000);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
	if(acc.users[message.$match[1]].level > 1) return message.send(`Ошибка !`);
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 90 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ jail [ID] [TIME(1-90)]`);
	let time = message.$match[2] * 60000;
	let id = Number(message.$match[1])
	acc.users[id].mute = true;

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	setTimeout(() => {
			acc.users[id].mute = false;
			vk.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `Вы вышли с тюрьмы`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `Мент ${user.prefix} посадил вас за решутку [${message.$match[2]}] минут(ы).\n\n⏺ ➾ Через [${message.$match[2]}] минут вы выйдете с тюрьмы!\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
	});
	return message.send(`Вы посадали говнюка [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/60000} минут`); 
});
//////////////// mute /////////
vk.updates.hear(/^(?:mute)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];;
	if(user.level < 2) return message.send(`🔸 ➾ Вы не модератор`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
    if(acc.users[message.$match[1]].level > 1) return message.send(`Ошибка !`);		
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ mute [ID] [TIME(1-999)]`);
	let time = message.$match[2] * 60000;
	let id = Number(message.$match[1])
	acc.users[id].mute = true;

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	setTimeout(() => {
			acc.users[id].mute = false;
			vk.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `⏺ ➾ Временная блокировка была снята. :)`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `⏺ ➾ ${user.prefix} временно заблокировал доступ к боту на [${message.$match[2]}] минут(ы).\n\n⏺ ➾ Через [${message.$match[2]}] минут блокировка пропадет.\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-171134839_39276409`
	});
	return message.send(`💰 ➾ Вы заблокировали временно доступ к боту игроку  [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/60000} минут`); 
});


vk.updates.hear(/^(?:unmute)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP`);
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ unmute [ID]`);
		var is = [user_id(message.user), message.text] 
		adm_log(is)
 	
	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺ ➾ Временная блокировка была снята досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 ➾ Вы сняли блокировку игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
////////////////////////////// 
vk.updates.hear(/^(?:oon)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: oon ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].block_game = true 

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы поставили ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:oof)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ooff ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].block_game = false; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unban ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].ban = false 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ ${user.prefix} разблокировал Вас.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы разблокировали игрока [${acc.users[message.$match[1]].prefix}]`);
	});
    vk.updates.hear(/^(?:kiss)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: kiss ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP игрок`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].shel = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `💞 VIP игрок ${user.prefix} поцеловал вас!`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`💞💞💞 Вы поцеловали [${acc.users[message.$match[1]].prefix}]`);
	});	
	vk.updates.hear(/^(?:Убить)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: убить ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия.`)
		if(user.balance < 50000) return message.send(`🔸 ➾ Вы бомж !`);
		if(user.ahahah < 50) return message.send(`🔸 ➾ У вас не достаточно здоровья ! ( нужно 50 % )`);
		if(acc.users[message.$match[1]].fggg == 10) return message.send(`Игрок спрятался !`);
		if(acc.users[message.$match[1]].ahahah < 50) return message.send(`❤ У игрока не достаточно здоровья !`);
		if(acc.users[message.$match[1]].balance < 50000) return message.send(`Данный игрок бомж!`);
		if(user.bloks.pari == true) return message.send(`⚠ Убивать можно раз в 5 минут !`);
 		user.bloks.pari = true
		setTimeout(() => {
			user.bloks.pari = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы снова можете тырить !` 
		});
		}, 300000);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	    if(rand(0,1) == 0){
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🔪 Вас кто-то убил ! Вор забрал у вас 50.000 $ и 50 % здоровья !`
		});
		acc.users[message.$match[1]].ahahah -= 50; 
		acc.users[message.$match[1]].balance -= 50000;
		user.balance += 50000;	
        user.ahahah += 50;
		return message.send(`Вы успешно убили данного игрока ! ( + 50.000 , + 50 % здоровья )`);
	}else{
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🔪 Игрок ${user.prefix} попытался Вас убить, ну у него этого не получилось ! Вы смогли убить его и вам начислено 50.000 $ , + 50 % здоровья )`
		});
		user.balance -= 50000;	
        user.ahahah -= 50;
		acc.users[message.$match[1]].ahahah += 50; 
		acc.users[message.$match[1]].balance += 50000;
		return message.send(`Игрок смог убить Вас ! ( - 50.000 $ , + 50 % здоровья )`);
	}
	
	});	
	vk.updates.hear(/^(?:Ударить)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ударить ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.ahahah < 50) return message.send(`🔸 ➾ У вас не достаточно здоровья ! ( нужно 50 % )`);
		if(acc.users[message.$match[1]].fggg == 10) return message.send(`Игрок спрятался !`);
		if(acc.users[message.$match[1]].ahahah < 50) return message.send(`❤ У игрока не достаточно здоровья !`);
		if(user.bloks.pari == true) return message.send(`⚠ Драться можно раз в 5 минут !`);
 		user.bloks.pari = true
		setTimeout(() => {
			user.bloks.pari = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы снова можете драться !` 
		});
		}, 300000);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	    if(rand(0,1) == 0){
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `${user.prefix} забил вас кулаками ! ( - 50 % здоровья )`
		});
		acc.users[message.$match[1]].ahahah -= 50; 
        user.ahahah += 50;
		return message.send(`Вы успешно забили данного игрока ! (+ 50 % здоровья )`);
	}else{
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ` Игрок ${user.prefix} попытался Вас забить, ну у него этого не получилось ! Вы смогли убить его и вам начислено + 50 % здоровья )`
		});	
        user.ahahah -= 50;
		acc.users[message.$match[1]].ahahah += 50; 
		return message.send(`Убил Вас (`);
	}
	
	});	
	vk.updates.hear(/^(?:Снежок)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`❄⛄ Пример команды: снежок ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.perp < 1) return message.send(`❄ У вас нет снежков ! Чтобы слепить, напишите " слепить "`);
		if(acc.users[message.$match[1]].fggg == 10) return message.send(`Игрок спрятался !`);
		if(!acc.users[message.$match[1]]) return message.send(`❄⛄ Такого игрока нет!`);
		acc.users[message.$match[1]].shel = 0; 
		user.perp -= 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❄⛄ Игрок ${user.prefix} кинул в Вас снежок !\nЧтобы спрятаться, напиши " Спрятаться "`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`❄⛄ Вы кинули снежок в морду [${acc.users[message.$match[1]].prefix}]`);
	});
	 vk.updates.hear(/^(?:givekaz)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(` Пример команды: givekaz ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`Ты не спец админ!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].mer = 3; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Успешно !`);
	});
	vk.updates.hear(/^(?:givebank)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(` Пример команды: givebank ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`Ты не спец админ!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].lox = 3; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Успешно !`);
	});
	vk.updates.hear(/^(?:dellbank)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(` Пример команды: dellbank ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`Ты не спец админ!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].lox = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Успешно !`);
	});
	vk.updates.hear(/^(?:dellkaz)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(` Пример команды: dellkaz ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`Ты не спец админ!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].mer = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Успешно !`);
	});
vk.updates.hear(/^(?:givecalen)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: givecalen ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`🔸 ➾ Вы не админ !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].bbb = 3; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Администратор: ${user.prefix} назначил Вас лидером банды Calentura !`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`успешно ! >>>[${acc.users[message.$match[1]].prefix}]`);
	});		
	vk.updates.hear(/^(?:givebro)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: givebro ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 100) return message.send(`🔸 ➾ Вы не админ !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].fff = 3; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Администратор: ${user.prefix} назначил Вас лидером банды HiBroNiga !`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`успешно ! >>>[${acc.users[message.$match[1]].prefix}]`);
	});
	vk.updates.hear(/^(?:Обнять)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: обнять ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 0) return message.send(`🔸 ➾ Вы не VIP игрок`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].shel = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `💑 игрок ${user.prefix} обнял вас!`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`💑 Вы обняли [${acc.users[message.$match[1]].prefix}]`);
	});	
	 vk.updates.hear(/^(?:тырфваынуваыть)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bloks.pari == true) return message.send(`⚠ Тырить бабло можно раз в 30 минут !`);
 		user.bloks.pari = true
		setTimeout(() => {
			user.bloks.pari = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы снова можете тырить !` 
		});
		}, 1800000);
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: тырнуть ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP игрок`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		if(acc.users[message.$match[1]].balance < 50000) return message.send(`❎ ➾ У игрока нет 50.000 $ !`);
		acc.users[message.$match[1]].balance -= 50000;
        user.balance += 50000;	
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Внимания ! Кто-то украл у вас 50.000 $ ! Советуем ложить все деньги в банк !`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`💴 Вы украли 50000 у игрока [${acc.users[message.$match[1]].prefix}]`);
	});	
 vk.updates.hear(/^(?:hhi)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: hhi ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.fff < 3) return message.send(`🔸 ➾ Вы не лидер банды`);
		if(!acc.users[message.$match[1]].bbb != 1) return message.send(`👳🚬 Этот игрок член банды Calanetura !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].fff = 1;
		acc.niga +=1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вы теперь член банды HiBroNiga ! Посмотреть команды " банда "`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы приняли в банду [${acc.users[message.$match[1]].prefix}]`);
	});	
	vk.updates.hear(/^(?:chi)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: chi ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.bbb < 3) return message.send(`🔸 ➾ Вы не лидер банды`);
		if(acc.users[message.$match[1]].fff != 1) return message.send(`👳🚬 Этот игрок член банды HiBroNiga !`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].bbb = 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вы теперь член банды Calantura ! Посмотреть команды " банда "`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы приняли в банду [${acc.users[message.$match[1]].prefix}]`);
	});	
	vk.updates.hear(/^(?:cha)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: cha ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.bbb < 3) return message.send(`🔸 ➾ Вы не лидер банды`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		if(acc.users[message.$match[1]].fff != 1) return message.send(`👳🚬 Этот игрок член банды HiBroNiga !`);
		acc.users[message.$match[1]].bbb = 0;
		acc.users[message.$match[1]].bbkle = 0;
		acc.calentura -=1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вас выгнали с  банды Calantura ! `
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы выгнали с банды [${acc.users[message.$match[1]].prefix}]`);
	});
 vk.updates.hear(/^(?:hca)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: hca ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.fff < 3) return message.send(`🔸 ➾ Вы не лидер банды`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		if(acc.users[message.$match[1]].bbb != 1) return message.send(`👳🚬 Этот игрок член банды Calanetura !`);
		acc.users[message.$match[1]].fff = 0;
		acc.users[message.$match[1]].bbkle = 0;
		acc.niga -=1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вас выгнали с банды HiBroNiga ! `
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы выгнали из банды [${acc.users[message.$match[1]].prefix}]`);
	});		
	/////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////
	 vk.updates.hear(/^(?:реф)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: реф ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.podarki < 10) return message.send(`Вы уже вводили реф!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].balance += 50000000; 
		acc.users[message.$match[1]].donate += 10;
		acc.users[message.$match[1]].baba += 1;
		acc.users[message.$match[1]].ima += 1;
		acc.users[message.$match[1]].kkk += 1;
        user.balance += 50000000;	
        user.donate += 10;
        user.podarki = 1;		
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `⚠[Рефка]: ${user.prefix} указал ваш ид и вы получили 50.000.000 $ и 10 рубинов !`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы ввели ID , друга [${acc.users[message.$match[1]].prefix}]`);
	});

	vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 2) return message.send(`🔸 ➾ Вы не MODER`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам warn(предупреждение)`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 ➾ Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`✅ ➾ Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 ➾ Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Администратор снял Вам все предупреждения`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

 


vk.updates.hear(/^(?:vig)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: vig [ID] `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸 ➾ Вы не Спец админ`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам админ-выговор.\n✅ ➾ После 3 вас снимет с админ-поста.`
		if(acc.users[message.$match[1]].ainfo.vig == 3){
			acc.users[message.$match[1]].ainfo.vig = 0;  
			acc.users[message.$match[1]].level = 0;
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 ➾ Вы лишились админ-прав.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`✅ ➾ Вы выдали выговор игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

	vk.updates.hear(/^(?:unvig)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 ➾ Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Администратор снял Вам все выговоры`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли все выговоры игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
	/////////////////////////////////////
	vk.updates.hear(/^(?:fcapt)$/i, (message) => {
		let dev = '';   
		return message.send(`
			📰 Счет банды Calentura: ${acc.ccapt}
            📰 Счет банды HiBroNiga: ${acc.hcapt}
			

			* * * * * * * * * * * * * * * * * * * * * * * * * * 
			🤷🏻‍♂ Война за бизнес: Наркопритон 
           ( Чья банда первей набьет счет: 1000 , получит Наркопритон )
		   ( Акция закончится 19.12.2018 )
			
			`);
	});
	///////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:hbalance)$/i, (message) => {
		let dev = '';   
		return message.send(`
	    💰 Баланс банка HiBroNiga: ${acc.bro}
	    💴 Чтобы снять деньги, напиши " haa [сумма] "
			`);
	});
	/////////////////////////////////////////
	vk.updates.hear(/^(?:cbalance)$/i, (message) => {
		let dev = '';   
		return message.send(`
	    💰 Баланс банка HiBroNiga: ${acc.den}
	    💴 Чтобы снять деньги, напиши " caa [сумма] "
			`);
	});


///////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:сfreмстоdefп)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].msg.messages
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = ``
				if(g == 9) ups = ``
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "ТОП SMS \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

//////////////////////////////////////
		vk.updates.hear(/^(?:бот)$$/i, (message) => {
		let dev = '';   
		return message.send(`
	    🚀 ➾ Проект ${config.bot}
		💻 ➾ Версия: 3.1 

        🌈 ➾ Создатель:  @id281987070 (Александр Колесников)
        🔧 ➾ Кодер:  @id500580851 (Давид Волков)

       🔰 ➾ Группа: @club176057547 (MendesBot)
  
       ☀ ➾ Казна штата MendesBot:  ${acc.kazna} 💰
       💬 ➾ Сообщений:  ${acc.msg}  
       📗 ➾ Зарегистрировано: ${acc.number}
`);
   });
	vk.updates.hear(/^(?:фхелп)$/i, (message) => {
		let dev = '';   
		return message.send(`
			♻
          Собрать - собрать биткоины
          фпродать - продать ферму ( 30.000.000 $ )
			
			`);
	});
	///////////////////////////////
	vk.updates.hear(/^(?:ферма)$/i, (message) => {
		let dev = '';   
		return message.send(`
			👉 ➾ МАЙНИНГ ферма:
			♻ Ферма " теплые яйца "
            ⚡ Информация: 
            👾 Биткоинов в час: 1 - 1000
            💸 Стоимость: 80.000.000 $

            Чтобы купить данную ферму, напиши команду " buyferm "
			
			`);
	});
	////////////////////////////
	vk.updates.hear(/^(?:беседы)$/i,  (message) => { 
		return message.send(`
			📘 ➾ Ссылки на наши беседы:
 
			`);
	});
//////////////////////////////////
vk.updates.hear(/^(?:statk)$/i, (message) => {
		let dev = '';   
		return message.send(`
			
            Казино " Flovers " , казино в штате VOLF
			
			Баланс данного бизнеса: ${acc.kazino}
			
			💬 Снимать деньги с этого бизнеса может только владелец !
			
			
			`);
	});
	//////////////////////////
	vk.updates.hear(/^(?:cmdkaz)$/i, (message) => {
		let dev = '';   
		return message.send(`
			⚕ kbala [сумма] - Снять бабло с казино
            ⚕ klock - Закрыть казино
            ⚕ block - Закрыть казино 
			
		Баланс данного бизнеса: ${acc.kazino}
         ╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧╧

             
			
			
			`);
	});
	///////////////////////
	vk.updates.hear(/^(?:беседы)$/i,  (message) => {  
		return message.send(`
			📘 ➾ Ссылки на наши беседы:
 
			`);
	});
	/////////
	vk.updates.hear(/^(?:bbank)$/i, (message) => {
		let dev = '';   
		return message.send(`
			
			
			Баланс данного бизнеса: ${acc.sla}
			
			💬 Снимать деньги с этого бизнеса может только владелец !
			
			
			`);
	});
	vk.updates.hear(/^(?:беседы)$/i,  (message) => {  
		return message.send(`
			📘 ➾ Ссылки на наши беседы:
 
			`);
	});

/////
vk.updates.hear(/^(?:баланс)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		🔸 ➾ ID: ${user_id(message.user)} 
		💴 ➾ Баланс ${spaces(user.balance)}$ 
		💴 ➾ Биткоинов ${spaces(user.bitcoin)}$ 
		🔸 ➾ Рубинов: ${spaces(user.donate)} 
		🔸 ➾ Уровень: ${user.lvl} 
		👑 ➾ Рейтинг: ${spaces(user.global_exs)}
		🔸 ➾ Опыта: [${user.exs}🌟/${user.exsup}🌟]`
		)

});


vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ ➾ ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
		📋 Информация об игроке [${id.prefix}] 📋
		🔸 ➾ Имя: ${id.prefix}
		🔹 ➾ ID: ${message.$match[1]}
		🔹 ➾ Цифровой: ${id.id}
		🔹 ➾ VK: @id${id.id}(${id.prefix})
		🔹 ➾ Баланс: ${id.balance}
		🔹 ➾ Биткоинов: ${id.bitcoin}
		🔹 ➾ Рубинов: ${id.donate}
		🔹 ➾ Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
		🔹 ➾ Дата регистрации: ${id.rtime}

		Имущество:\n` +
		(user.level >= 3 ? `✈ ➾ Самолет:  ${id.aircraft.name}\n` : ``)+
		(user.level >= 3 ? `🚁 ➾ Вертолет: ${id.helicopter.name}\n` : ``)+
		(user.level >= 3 ? `🚘 ➾ Автомобиль: ${id.cars.name}\n` : ``)+  
		(user.level >= 3 ? `🚤 ➾ Лодка: ${id.lodka}\n` : ``)+ 
		(user.level >= 3 ? `🏡 ➾ Дом: ${id.house}\n` : ``)+   
		(user.pit== false ? `🐼 ➾ Питомец:  отсутствует\n` : `🐼 ➾ Питомец:  ${user.pit}\n`)+
		(user.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${user.gun_name}\n`)+  
		` 
		🏨 ➾ Бизнесы: 
		`+(user.level >= 3 ? `1&#8419; ➾ ${id.bizs.one.name} || ${spaces(id.bizs.one.zp)}$/час\n` : ``)+  
		(user.level >= 3 ? `2&#8419; ➾ ${id.bizs.two.name} || ${spaces(id.bizs.two.zp)}$/час\n` : ``)+  
		`
		`+
		(user.level >= 3 ? `🔸 ➾ Последнее смс боту: ${id.msg.last_msg}\n` : ``)+  
		(user.level >= 3 ? `🔸 ➾ Сообщений боту: ${id.msg.messages}\n` : ``)+ 
		(user.level >= 2 ? `🔸 ➾ Уровень: ${id.lvl}\n` : ``)+ 
		(user.level >= 2 ? `🔸 ➾ Опыт: ${id.exs}\n` : ``)+  

		(user.level >= 2 ? `\n⚠ ➾ Предупреждений: ${id.warn}\n` : ``)+ 
		(user.level >= 2 ? `⚠ ➾ Причины: [${id.warn}]\n${warns}\n` : ``)+ 
		(user.level >= 4 ? `⛔ ➾ Админ-выговоров: ${user.ainfo.vig}\n` : ``)+  
		(id.ban == false ? `⚠ ➾ Аккаунт не заблокирован\n` : `⚠ ➾ Аккаунт заблокирован [${id.ban}]`)
		);
	});

 
		

vk.updates.hear(/^(?:свадьба)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak != false) return message.send(`🙅 ➾ Вы уже женаты.`);
	if(!acc.users[message.$match[1]]) return message.send(`🚶 ➾ Такого игрока нет.`);
	if(acc.users[message.$match[1]].brak != false) return message.send(`🙅 ➾ Этот игрок уже женат!`);
	user.brak = Number(message.$match[1]);
	acc.users[message.$match[1]].brak = user_id(message.user);
	return message.send(`➖➖➖➖➖\n⚠ ➾ - - - - [ВНИМАНИЕ] - - - - <<⚠\n👫 ➾ Поздравим молодоженов: \n👫 ➾ -->> ${user.prefix} и ${acc.users[message.$match[1]].prefix} <<--\n➖➖➖➖➖`)
});
vk.updates.hear(/^(?:развод)/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak == false) return message.send(`🙅 ➾ Вы не женаты.`); 
	acc.users[user.brak].brak = false;
	user.brak = false;
	return message.send(`👫 ➾ Вы успешно развелись.`)
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:игропрофиль)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		📕 >> Ваш Игро-Профиль « 📕
		🔸 ➾ Имя: ${user.prefix}
		🔸 ➾ ID: ${user_id(message.user)}
		🔸 ➾ Баланс: ${spaces(user.balance)}$
		💴 Баланс карты: ${spaces(user.karta)} $
	
		🎲 ➾ Игры « 🎲	 
		🎰 ➾ Казино: [Побед: ${user.game.kazwin}/ Поражений: ${user.game.kazlose}]
		📊 ➾ Акции: [Побед: ${user.game.binwin}/ Поражений: ${user.game.binlose}]
		🎲 ➾ Ставка: [Побед: ${user.game.stavka_win}/ Поражений: ${user.game.stavka_lose}]
		💰 ➾ Рандом: [Побед: ${user.game.rand_win}/ Поражений: ${user.game.rand_lose}]
		🔫 ➾ Стрелы: [Побед: ${user.game.strela_loose}/ Поражений: ${user.game.strela_win}] 
		`);

});

 

vk.updates.hear(/^(?:профиль|проф|гей)\s?([0-9]+)?/i, (message) => { 
	 let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
	 let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	 let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']

	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ ➾ ${user.warn_p[i]}\n`}

	if(!message.$match[1]){
		return message.send(`
		📕 >> Ваш профиль « 📕
		🔸 ➾ Имя: ${user.prefix}
		🔸 ➾ ID: ${user_id(message.user)}
		🔹 ➾ Цифровой: ${message.user}
		🔸 ➾ Баланс: ${spaces(user.balance)}$
		🔸 ➾ Баланс: ${spaces(user.sasi)}$
		🔸 ➾ Биткоинов: ${spaces(user.bitcoin)}
		🔸 ➾ Рубинов: ${spaces(user.donate)}
		👑 ➾ Рейтинг: ${spaces(user.global_exs)}
		💴 Баланс карты: ${spaces(user.karta)} $
		🎁 ➾ Найдено подарков: ${spaces(user.podarki)}
		🔸 ➾ Дата регистрации: ${user.rtime}
		👓 ➾ Наркоты: ${spaces(user.qqq)} 👍🏻
		👨‍✈ ➾ Мент LVL: ${spaces(user.mysor)}
	    💉 ➾ Наркозависимость: ${spaces(user.mmm)}

		⛔ ➾ Админ-выговоров: ${user.ainfo.vig}
		⛔ ➾ Привилегия: ${user.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
		 
		` +
		(user.brak == false ? `💖 ➾ Не женат\n` : `💖 ➾ Муж/жена:   ${acc.users[user.brak].prefix}\n`)+
		`

		⚠ ➾ Предупреждений: [${user.warn}]
		⚠ ➾ Причины: 
		${warns}
		🔸 ➾ Уровень: ${user.lvl} 
		🔸 ➾ Опыта: [${user.exs}🌟/${user.exsup}🌟]

		` +(user.pit== false ? `🐼 ➾ Питомец:  отсутствует\n` : `🐼 ➾ Питомец:  ${user.pit}\n`)+
		`
		Имущество:\n` +
		(user.aircraft == false ? `✈ ➾ Самолет:  отсутствует\n` : `✈ ➾ Самолет:  ${air[user.aircraft]}\n`)+
		(user.helicopter == false ? `🚁 ➾ Вертолет: отсутствует\n` : `🚁 ➾ Вертолет: ${hel[user.helicopter]}\n`)+
		(user.cars == false ? `🚘 ➾ Автомобиль: отсутствует\n` : `🚘 ➾ Автомобиль: ${cars[user.cars]}\n`)+  
		(user.lodka == false ? `🚤 ➾ Лодка: отсутствует\n` : `🚤 ➾ Лодка: ${user.lodka}\n`)+ 
		(user.house == false ? `🏡 ➾ Дом: отсутствует\n` : `🏡 ➾ Дом: ${user.house}\n`)+   
		(user.rrr == false ? `🎄 ➾ Елочка : отсутствует\n` : `🎄 ➾ Елочка: ${user.rrr}\n`)+   
		(user.cvb  == false ? `💻 ➾ Комп : отсутствует\n` : `💻 ➾ Комп: ${user.cvb}\n`)+ 
		` 
		🏨 ➾ Бизнесы: 
		`+(user.bizs.one_biz == false ? `1&#8419; ➾ отсутствует\n` : `1&#8419; ➾ ${user.bizs.one.name} || ${spaces(user.bizs.one.zp)}$/час\n`)+  
		(user.bizs.two_biz == false ? `2&#8419; ➾ отсутствует\n` : `2&#8419; ➾ ${user.bizs.two.name} || ${spaces(user.bizs.two.zp)}$/час\n`)+  
		`

		🔫 ➾ Оружие:
		`+(user.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${user.gun_name}\n`)+  
		` 
		🔫 ➾ Урон: ${user.uron}
		❤ ➾ Здоровье: ${user.ahahah}
		`);
	}else{
		if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		let id = acc.users[message.$match[1]]
		return message.send(`
			📋 Информация об игроке [${id.prefix}] 📋
			🔸 ➾ Имя: ${id.prefix}
			🔹 ➾ ID: ${message.$match[1]}
			🔹 ➾ VK: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})
			🔹 ➾ Баланс: ${spaces(id.balance)}
			🔹 ➾ Рубинов: ${spaces(id.donate)}
			🔹 ➾ Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
			` +
			(id.brak == false ? `💖 ➾ Не женат\n` : `💖 ➾ Муж/жена:   ${acc.users[id.brak].prefix}\n`)+
			`
			🔫 ➾ Оружие:
			`+(id.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${id.gun_name}\n`)+  
			` 
			🔫 ➾ Урон: ${id.uron}
			❤ ➾ Здоровье: ${user.ahahah}
			`);
		}
	 
});
/////////////////////////////////////////////
vk.updates.hear(/^(?:lvltop)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].lvl
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
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
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "ТОП ЛВЛ \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

 
//////////////////////////////////////////
	vk.updates.hear(/^(?:топ)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
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
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "👑 ТОП ПО РЕЙТИНГУ 👑 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:543to5r4325p)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<9999999999999999999999999999;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].balance
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
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
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "&#128176; ТОП ПО БАЛАНСУ &#128176; \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "💰").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:топ баланс)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].balance
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
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
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "👑 ТОП ПО РЕЙТИНГУ 👑 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});
	//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	vk.updates.hear(/^(?:кейс|бонус)/i, (message) => {  
 		if(message.$from.type != 'user') return message.send(`Брать бонус можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
 		if(user.bloks.cases == true) return message.send(`💵 >> Кейс можно открывать раз в 24 ч.`);
 		user.bloks.cases = true
		setTimeout(() => {
			user.bloks.cases = false
		}, 86400000);

 		text = '💵 >> Открыв кейс вы получили:\n'
 		let count = rand(4,5);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(15000,19000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `🔹 >> ${spaces(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>79 && x <80){
 				mon = 1
 				text += `🔹 >> ${spaces(mon)} рубин(ов)\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
 				mon = rand(1,5)
 				if(config.bonus_exs == true) mon = mon * 2;
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 >> ${mon} опыта [Уровень повышен]\n`
 				}else{
 					text += `🔹 >> ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});

 

 	 vk.updates.hear(/^(?:бкейс|ббонус)/i, (message) => {  
 		if(message.$from.type != 'user') return message.send(`Брать большой-кейс можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		if(user.bloks.cases == true) return message.send(`💵 >> Большой Кейс можно открывать раз в 10 минут.`); 
 		let id = user_id(message.user)
 		if(user.donate < 10) return message.send(`💵 >> Большой кейс стоит 10 рубинов!`);
 		user.donate -= 10; 
 		user.bloks.cases = true
		setTimeout(() => {
			user.bloks.cases = false
		}, 600000);

 		text = '💰 >> Открыв большой кейс вы получили:\n'
 		let count = rand(10,15);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(25000,30000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `🔹 >> ${spaces(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>79 && x <80){
 				mon = 1;
 				text += `🔹 >> ${spaces(mon)} рубин\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
 				mon = rand(2,5)
 				if(config.bonus_exs == true) mon = mon * 2;
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 >> ${mon} опыта [Уровень повышен]\n`
 				}else{
 					text += `🔹 >> ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:азино)\s?([^\s	].*)?/i, (message) => { 
		if(!message.$match[1]) return message.send(`🔸 ➾ укажите ставку`);
		let amount = Number(parserInt(message.$match[1]));
		amount = Math.round(amount);  
		let id = user_id(message.user)
		let user = acc.users[user_id(message.user)];
 		let text = '';
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
		if (amount > acc.users[id].balance || amount < 1 ) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
		if(user.block_game == true && user.level < 3){
			if (amount > 500000 && amount != acc.users[id].balance) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		} 
		
		if(acc.users[id].balance > 20000000){
			if(rand(1,100) <= 30){
				  
				user.game.kazwin += 1;
				user.balance -= amount;
				let sum = amount * 2; 
				if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
				if(config.bonus_exs == true) user.exs += 2;
				let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
				user.balance += sum;
				game_log(user_id(message.user), 'казино', amount, 1)
			
				if(amount >= 10000){
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
					}else{
						return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				game_log(user_id(message.user), 'казино', amount, 0)
				user.game.kazlose += 1;
				user.balance -= amount;
				return message.send(`🌚 ➾ Вы проиграли ${amount}$!`);
			}
		}else{	
			if(rand(1,100) <= 20){
				 
				user.game.kazwin += 1;
				user.balance -= amount;
				let sum = amount * 2; 
				if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
				if(config.bonus_exs == true) user.exs += 2;
				let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
				user.balance += sum;
			
				if(amount >= 10000){
				game_log(user_id(message.user), 'казино', amount, 1)
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
					}else{
						return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`${text}🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				game_log(user_id(message.user), 'казино', amount, 0)
				user.game.kazlose += 1;
				user.balance -= amount;
				return message.send(`🌚 ➾ Вы проиграли ${amount}$!`);
			}
		}
	});  
	vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {
		if(acc.lock >= 9) return message.send(`⛔ Казино закрыто`);
        if(!message.$match[1]) return message.send(`🔸 ➾ укажите ставку`);
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);   
        let user = acc.users[user_id(message.user)]; 
        if(!Number(amount)) return message.send(`🔸 ➟ Ставка должна быть числом!`);
        if (amount > user.balance || amount < 1 ) return message.send(`🎉 ➟  Ставка не может превышать баланс или быть ниже 1$`);

 		if(user.block_game == true && user.level < 3){
			if (amount > 5000000000050000000000 && amount != user.balance) return message.send(`🎉 ➟  Ставка не должна быть больше 500.000$\n⛔ ➟ В 'донат' можно купить снятие ограничения.`);
		} 

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`🎲 ➟ Вам выпала комбинация: [${win}]\n💎 ➟ Вы выиграли ${win_balance}$!\n🔥 ➟ Множитель: ${mnojitel}x`); 
        }else{
        	user.balance -= amount;
			acc.kazino += 5000000;
        	return message.send(`🎲 ➟ Вам выпала комбинация: [${lose}]\n🌚 ➟ Вы проиграли ${amount}$!`);
        }
    });
	/////////////////
	vk.updates.hear(/^(?:Боулинг)\s?([^\s  ].*)?/i, (message) => {
        if(!message.$match[1]) return message.send(`🔸 ➾ укажите ставку`);
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);   
        let user = acc.users[user_id(message.user)]; 
        if(!Number(amount)) return message.send(`🔸 ➟ Ставка должна быть числом!`);
        if (amount > user.balance || amount < 1 ) return message.send(`🎉 ➟  Ставка не может превышать баланс или быть ниже 1$`);

 		if(user.block_game == true && user.level < 3){
			if (amount > 5000000000050000000000 && amount != user.balance) return message.send(`🎉 ➟  Ставка не должна быть больше 500.000$\n⛔ ➟ В 'донат' можно купить снятие ограничения.`);
		} 

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`🎳 ➟ Вы выиграли в боулинг и получили ${win_balance}$`); 
        }else{
        	user.balance -= amount;
			acc.kazino += amount;
        	return message.send(`🎳 ➟ Увы :(\n🌚 ➟ Вы проиграли ${amount}$!`);
        }
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:акция)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: акция [вверх/вниз] [ставка]`)
		let amount = parserInt(message.$match[2]);   
		let user = acc.users[user_id(message.user)]; 
		let id = user_id(message.user) 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
		if(user.block_game == true && user.level < 2){
			if (amount > 5000005000000000050000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		 
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`); 
		 
		 	if(message.$match[1] == 'вверх'){
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum;
					user.game.binwin += 1; 
					game_log(user_id(message.user), 'акция', amount, 1)
					if(amount < 10000){ 
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}📈 ➾ Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 ➾ Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}📈 ➾ Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
 					}

				}else{ 
					game_log(user_id(message.user), 'акция', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`📈 ➾ Курс акций упал на - ${rand(1,100)}%\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.$match[1] == 'вниз'){ 
				if(rand(1,2) == 1){
				let i = games(type='вниз');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum; 
					user.game.binwin += 1;
					game_log(user_id(message.user), 'акция', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}📈 ➾ Курс акций упал на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 ➾ Курс акций упал на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}📈 ➾ Курс акций упал на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!\n🍀 ➾ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					game_log(user_id(message.user), 'акция', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`📈 ➾ Курс акций вырос на - ${rand(1,100)}%\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});
	///////////////////////////////////////////////////НОЖНИЦЫ////////////////////
	vk.updates.hear(/^(?:суефа)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: суефа [камень/ножницы/бумага] [ставка]`)
		let amount = parserInt(message.$match[2]);   
		let user = acc.users[user_id(message.user)]; 
		let id = user_id(message.user) 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
		if(user.block_game == true && user.level < 2){
			if (amount > 5000005000000000050000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		 
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`); 
		 
		 	if(message.$match[1] == 'камень'){
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum;
					user.game.binwin += 1; 
					game_log(user_id(message.user), 'камень', amount, 1)
					if(amount < 10000){ 
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}✂ ➾ Вам выпали ножницы ! \n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}✂ ➾ Вам выпали ножницы ! \n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}✂ ➾ Вам выпали ножницы ! \n🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
 					}

				}else{ 
					game_log(user_id(message.user), 'суефа', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`\n🌚 ➾ Вам выпала бумага и вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.$match[1] == 'бумага'){ 
				if(rand(1,2) == 1){
				let i = games(type='бумага');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum; 
					user.game.binwin += 1;
					game_log(user_id(message.user), 'ножницы', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}✂ ➾ Вам выпала бумага ! \n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}}✂ ➾ Вам выпала бумага !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}}✂ ➾ Вам выпала бумага !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!\n🍀 ➾ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					game_log(user_id(message.user), 'суефа', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`\n🌚 ➾ Вам выпали ножницы и вы проиграли ${spaces(amount)}$!`);
					
				}
			} 
			if(message.$match[1] == 'ножницы'){ 
				if(rand(1,2) == 1){
				let i = games(type='ножницы');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum; 
					user.game.binwin += 1;
					game_log(user_id(message.user), 'ножницы', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}✂ ➾ Вам выпала бумага ! \n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}}✂ ➾ Вам выпала бумага !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}}✂ ➾ Вам выпала бумага !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!\n🍀 ➾ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					game_log(user_id(message.user), 'суефа', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`\n🌚 ➾ Вам выпал камень и вы проиграли ${spaces(amount)}$!`);
					
				}
			} 
	});
	/////////////////МОНЕТКА////////////////////////////
	vk.updates.hear(/^(?:монетка)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔆 ➾ Пример команды: монетка [орел/решка] [ставка]`)
		let amount = parserInt(message.$match[2]);   
		let user = acc.users[user_id(message.user)]; 
		let id = user_id(message.user) 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
		if(user.block_game == true && user.level < 2){
			if (amount > 5000005000000000050000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		 
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`); 
		 
		 	if(message.$match[1] == 'решка'){
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum;
					user.game.binwin += 1; 
					game_log(user_id(message.user), 'монетка', amount, 1)
					if(amount < 1000){ 
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text} 🔆➾ Вам выпала решка !\n🔆 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}🔆 ➾ Вам выпала решка !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}🔆 ➾ Вам выпала решка !\n🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
 					}

				}else{ 
					game_log(user_id(message.user), 'монетка', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`🔆 ➾ Вам выпал орел !\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.$match[1] == 'орел'){ 
				if(rand(1,2) == 1){
				let i = games(type='орел');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum; 
					user.game.binwin += 1;
					game_log(user_id(message.user), 'монетка', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text} 🔆➾ Вам выпал орел !\n🔆 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}🔆 ➾ Вам выпал орел !\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}🔆 ➾ Вам выпал орел !\n🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					game_log(user_id(message.user), 'монетка', amount, 0)
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`🔆 ➾ Вам выпала решка !\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});
	//////////////////////////////////////////////////
		 
	vk.updates.hear(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i,  message => {
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ставка [выше/ниже] [ставка]`)
		let amount = parserInt(message.$match[2]);   
		amount = Math.round(amount);  
		let id = user_id(message.user) 
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
		let user = acc.users[user_id(message.user)]; 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🔸 ➾  Ставка не может превышать баланс или быть ниже 1$`);  
	    if(user.block_game == true && user.level < 2){
			if (amount > 5000005000000000050000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}

		 	if(message.$match[1].toLowerCase() == 'выше'){
				if(rand(1,2) == 1){ 

					user.balance -= amount;
					user.balance += amount * 2;
					user.game.stavka_win += 1; 
					game_log(user_id(message.user), 'ставка', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user)); 
						if(up == true){
							return message.reply(`🔸 ➾ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 ➾ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 ➾ Число [${rand(500000,999999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 ➾ Опыт дается при ставке от 10.000$`);
					} 
				}else{ 
					game_log(user_id(message.user), 'ставка', amount, 0) 
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.reply(`🔸 ➾ Число [${rand(1,499999)}]\n🔸 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(message.$match[1].toLowerCase() == 'ниже'){ 
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					user.balance += amount * 2;
					user.game.stavka_win += 1;  
					game_log(user_id(message.user), 'ставка', amount, 1)
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user)); 
						if(up == true){
							return message.reply(`🔸 ➾ Число [${rand(1,499999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 ➾ Число [${rand(1,499999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 ➾ Число [${rand(1,499999)}]. Вы угадали\n🔸 ➾ Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 ➾ Опыт дается при ставке от 10.000$`);
					}  
				}else{ 
					game_log(user_id(message.user), 'ставка', amount, 0)
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.reply(`🔸 ➾ Число [${rand(500000,999999)}]\n🔸 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});
	////////////////////////////////////
	
	  
	/////////////////////////////////
 
 	vk.updates.hear(/^(?:рандом)\s?([0-9]+)?\s([^\s	].*)/i, message => {
		let i = parserInt(message.$match[2]); 
		let user = acc.users[user_id(message.user)];
 		if(!message.$match[1] || !message.$match[2] || !Number(i)|| !Number(message.$match[1]) || message.$match[1] > 60 ) return message.send(`🎲 ➾ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		user.bloks.random_game = true
		setTimeout(() => {
			user.bloks.random_game = false
		}, 300000); 
		let p = Number(message.$match[1])
		let amount = p;
		amount = Math.round(amount);  
		if(!Number(message.$match[1])) return message.send(`🎲 ➾ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		if(user.block_game == true && user.level < 2){
			if (amount > 5000050000000000500000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		if (i > user.balance || i <= 0) return message.send(`🔸 ➾  Ставка не может превышать баланс или быть отрицательной`);  
		if(p >= 40){
			if(rand(1,130) <= p){ 
				game_log(user_id(message.user), 'рандом', amount, 1)
				i = i / 100 * 30 + i 

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта`);
	 			}  
			}else{ 
				game_log(user_id(message.user), 'рандом', amount, 0)
				user.game.rand_lose += 1;
				user.balance -= Number(i); 
				return message.send(`🎲 ➾ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 
		if(p >= 20 && p < 40){
			if(rand(1,100) <= p){
				i = i / 100 * 20 + i 
				game_log(user_id(message.user), 'рандом', amount, 1)

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				game_log(user_id(message.user), 'рандом', amount, 0)  
				user.game.rand_lose += 1;
				return message.send(`🎲 ➾ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 

		if(p >= 1 && p < 20){
			if(rand(1,100) <= p){
				i = i / 100 * 70 + i 
				game_log(user_id(message.user), 'рандом', amount, 1)

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И полочили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И полочили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				game_log(user_id(message.user), 'рандом', amount, 0) 
				user.game.rand_lose += 1;
				return message.send(`🎲 ➾ Вы проиграли [${i}]$`);
			} 
		} 

		user.balance -= Number(message.$match[2]); 
		user.game.rand_lose += 1;
		return message.send(`🎲 ➾ Вы проиграли [${message.$match[1]}]$`);
});
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////САПЕР///////////////////////////////////////////
vk.updates.hear(/^(?:сапер)\s?([0-9]+)?\s([^\s	].*)/i, message => {
		let i = parserInt(message.$match[2]); 
		let user = acc.users[user_id(message.user)];
 		if(!message.$match[1] || !message.$match[2] || !Number(i)|| !Number(message.$match[1]) || message.$match[1] > 60 ) return message.send(`🎲 ➾ Пример ввода: 'сапер [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		user.bloks.random_game = true
		setTimeout(() => {
			user.bloks.random_game = false
		}, 300000); 
		let p = Number(message.$match[1])
		let amount = p;
		amount = Math.round(amount);  
		if(!Number(message.$match[1])) return message.send(`🎲 ➾ Пример ввода: 'сапер [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
		if(user.block_game == true && user.level < 2){
			if (amount > 5000050000000000500000000000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		if (i > user.balance || i <= 0) return message.send(`🔸 ➾  Ставка не может превышать баланс или быть отрицательной`);  
		if(p >= 40){
			if(rand(1,130) <= p){ 
				game_log(user_id(message.user), 'рандом', amount, 1)
				i = i / 100 * 30 + i 

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта`);
	 			}  
			}else{ 
				game_log(user_id(message.user), 'рандом', amount, 0)
				user.game.rand_lose += 1;
				user.balance -= Number(i); 
				return message.send(`🎲 ➾ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 
		if(p >= 20 && p < 40){
			if(rand(1,100) <= p){
				i = i / 100 * 20 + i 
				game_log(user_id(message.user), 'рандом', amount, 1)

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И получили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				game_log(user_id(message.user), 'рандом', amount, 0)  
				user.game.rand_lose += 1;
				return message.send(`🎲 ➾ Вы проиграли [${Math.round(i)}]$`);
			} 
		} 

		if(p >= 1 && p < 20){
			if(rand(1,100) <= p){
				i = i / 100 * 70 + i 
				game_log(user_id(message.user), 'рандом', amount, 1)

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И полочили +2 опыта\n🌟 ➾ [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 ➾ Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 ➾ И полочили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				game_log(user_id(message.user), 'рандом', amount, 0) 
				user.game.rand_lose += 1;
				return message.send(`🎲 ➾ Вы проиграли [${i}]$`);
			} 
		} 

		user.balance -= Number(message.$match[2]); 
		user.game.rand_lose += 1;
		return message.send(`🎲 ➾ Вы проиграли [${message.$match[1]}]$`);
});

 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^eval\s([^]+)/i, (message) => {  
		if (message.user === 281987070) {
			return message.send(`Готово: ${eval(message.$match[1])}`);
		}
	});
 
	vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return;

		if(!message.$match[2]) return message.send(`- - log [id] [number] - -\n1. Передачи [передать]\n2. Выдачи [give]\n3. Обнуления [remove]\n4. Выдача прав [admin]\n5. Обнуление прав [admin]\n6. Варны [warn]`) 
		let id = message.$match[1];
		let i = message.$match[2];
		if(i < 0 || i > 5) return message.send(`Error`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];}
		if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i];} 
		if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i];} 
		if(i == 5) for(i=0; i!=log.setwin[id].log.length; i++){text += log.setwin[id].log[i];}  
		if(i == 6) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i];}  
		return message.send(text);
	});

	vk.updates.hear(/^(?:лог)/i, (message) => {
		let id = user_id(message.user);
		 
		let text = '⛔ Лог последних 15 игр ⛔\n';
		for(i=0; i!=log.game[id].log.length; i++){text += log.game[id].log[i];} 
		return message.send(text);
	});
 // - -- - - - - - - -- - - - -  рубины - - - - - 
 	vk.updates.hear(/^(?:донат)/i,  message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
 			💎 ➾ У вас ${user.donate} рубинов << 💎

 			

╟ ☺ VIP СТАТУС - 60 рублей
╟ 🙍‍♂ Модератор - 70 рублей
╟ 👨‍💼 Администратор - 150 рублей
╟ 👨‍💻 Гл. Администратор - 300 рублей
╟ 👓 Спец. Администратор - 550 рублей
╟📍 Основатель - 1000 рублей 

╟💳 Деньги в банк 50.000.000 $ - 30 р

💎 Элитные бизнесы " элитмагаз '



купить: https://vk.com/id281987070
 			`)
 	});
 
 
	vk.updates.hear(/^курс/i,  (message) => {  
		return message.send(`
				📊 ➾ Актуальный курс обмена рубинов << 📊
				- - - - - - - -  
				🔸 ➾ Продажа: ${acc.curs}$
				- - - - - - - - 
				📶 ➾ 'Трейд [COUNT]'


				💰 ➾ Актуальный курс обмена Биткоинов << 💰
				- - - - - - - -  
				🔸 ➾ Продажа: ${acc.bit}$
				- - - - - - - - 
				📶 ➾ 'Биткоин продать [COUNT]'
			`);
	});

	vk.updates.hear(/^(?:трейд)\s?([0-9]+)?/i,  (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`📝 ➾ Введите количество рубинов для обмена`);
		if(user.donate < message.$match[1]) return message.send(`📝 ➾ У вас нет столько рубинов`);
		user.donate -= Number(message.$match[1]);
		user.balance += Number(message.$match[1] * acc.curs)
		return message.send(`📝 ➾ Вы обменяли [${message.$match[1]}] рубинов на [${message.$match[1] * acc.curs}]$`);
	});

//////////////////////////////////////////////////////// промики
 	
 vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`📝 ➾ Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`📝 ➾ Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`📝 ➾ Вы уже активировали промокод`);
 	acc.promos[message.$match[1]].users[message.user] = {i: true};
 	acc.promos[message.$match[1]].activ -= 1;
 	if(acc.promos[message.$match[1]].type == 1){
 		user.balance += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅ ➾ Вы активировали промокод!\n✅ ➾ Вы получили: ${acc.promos[message.$match[1]].balance}$!\n 📛 ➾ Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}
 	if(acc.promos.type == 2){
 		user.donate += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅ ➾ Вы активировали промокод!\n✅ ➾ Вы получили: ${acc.promos[message.$match[1]].balance} рубинов!\n 📛 ➾ Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}

 	if(acc.promos[message.$match[1]].activ == 0) delete acc.promos[message.$match[1]];
 	return 
 });

 
  vk.updates.hear(/^(?:addpromo)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)]; 
	if(user.level < 5) return;
    if(!message.$match[1]) return message.send(`📝 ➾ Укажите сумму для промокода`);	
 	var result  = '30000000';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	acc.promos[result] = {
		users: {},
		activ: 30,
		type: 1,
		balance: message.$match[1]
	}		
  
 	return message.send(`👑 ➾ Ловите промокод:\n👑 ➾ На 30 активаций | На ${message.$match[1]}$\n👑 ➾ Введите: 'Промокод ${result}'`);
 });

 
 //////////// full dostup - - - - - - 

	vk.updates.hear(/^(?:setwin)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	
		let i = config;
		if(acc.users[id].level < 100) return;
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setwin ID COUNT(% выигрыша)`);
			if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`🔸 >> Число должно быть цифрового вида.`);
			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 >> Вы не администратор`);
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
			acc.users[message.$match[1]].game.win = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 5)
			return message.send(`🔸 >> Вы установили игроку(${acc.users[message.$match[1]].prefix}) процент побед: ${message.$match[2]}%`);
	 
	});

	vk.updates.hear(/^(?:givevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 100) return message.send(`🔸 ➾ Вы не Full-Admin`);
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ givevip [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 1;
		return message.send(`💰 ➾ Вы выдали VIP-Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:givemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 100) return message.send(`🔸 ➾ Вы не Full-Admin`);
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ givemoder [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.send(`💰 ➾ Вы выдали MODER-Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:giveadm)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user);
		if(user.level < 5) return message.send(`🔸 ➾ Вы не Full-Admin`);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ giveadm [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 3;
		return message.send(`💰 ➾ Вы выдали ADMIN-Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].level < 100) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 100) return message.send(`🔸 >> Вы не администратор`);
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: giveadm ID LVL(1-5)`); 
			if(message.$match[2] > 100) return message.send(`🔸 >> Максимальный админ-уровень 100!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ ➾ ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}.`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 >> Вы выдали игроку[${acc.users[message.$match[1]].prefix}]\n🔸 >> Админ-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}]`);
		 
	});
	vk.updates.hear(/^(?:allment)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].mysor < 3) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.mysor < 3) return message.send(`🔸 >> Вы не лидер фракции мент!`);
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: allment ID LVL(1-5)`); 
			if(message.$match[2] > 2) return message.send(`🔸 >> Максимальный мент - уровень 2!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
			acc.users[message.$match[1]].mysor = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `Вы теперь мент! Посмотреть команды " менты "`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`Успешно !`);
		 
	});
		vk.updates.hear(/^(?:allment)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].mysor < 3) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.mysor < 3) return message.send(` Вы не лидер фракции!`);
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: allment ID LVL(1-2)`); 
			if(message.$match[2] > 2) return message.send(`🔸 >> Максимальный мент-уровень 2!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
			acc.users[message.$match[1]].mysor = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `Вы в рядах фракции " мент " Посмотреть команды "менты".`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`Успешно !`);
		 
	});

 
	vk.updates.hear(/^(?:boostzp)\s?([0-9]+)?\s?([0-9]+)?/i,(message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 281987070) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostzp ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autozp = Number(message.$match[2]);
		return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор зарплат на (${message.$match[2]}) раз `);
	});
	vk.updates.hear(/^(?:boostbiz)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 281987070) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostbiz ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autobiz = Number(message.$match[2]);
		return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор прибыли на (${message.$match[2]}) раз `);
	});
///////////////////

	vk.updates.hear(/^(?:blockpay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user != 281987070) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	 
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = 'включил' 
			acc.users[message.$match[1]].admin.block_pay = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_pay = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на переводы.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на переводы`);
	});

	vk.updates.hear(/^(?:blockgive)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		if(message.user != 281987070) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = 'включил' 
			acc.users[message.$match[1]].admin.block_give = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_give = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на выдачу валюты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на выдачу валюты`);
	});

	vk.updates.hear(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user != 281987070) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = 'включил' 
			acc.users[message.$match[1]].admin.block_rep = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_rep = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на ответы на репорты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на ответ на репорты.`);
	});
////////////////////
 

	vk.updates.hear(/^(?:bonus)\s([^]+)\s([0-9]+)/i, (message) => { 

		let id = user_id(message.user);		
		let i = config;
		if(message.user != 281987070) return;
		let user = acc.users[user_id(message.user)]; 
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`); 

		if(message.$match[1] == 'balance'){
			if(message.$match[2] == 1){ config.bonus_balance = true; return message.send(`✅ ➾ Вы включили х2 баланс для игр.`); } 
			if(message.$match[2] == 0){ config.bonus_balance = false; return message.send(`✅ ➾ Вы выключили х2 баланс в играх.`); }
		}  
		if(message.$match[1] == 'exs'){ 
			if(message.$match[2] == 1){ config.bonus_exs = true; return message.send(`✅ ➾ Вы включили х2 опыт в играх.`); } 
			if(message.$match[2] == 0){ config.bonus_exs = false; return message.send(`✅ ➾ Вы выключили х2 опыт в играх`); }
		}   
	}); 

	vk.updates.hear(/^(?:promo)\s([^]+)\s([0-9]+)/i, (message) => {
		let id = user_id(message.user);		
		let i = config;
		if(message.user != 281987070) return; 
		let user = acc.users[user_id(message.user)]; 
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`); 

		if(message.$match[1] == 'balance'){
			config.promo.balance = Number(message.$match[2]); return message.send(`✅ ➾ Сумма для промокодов состовляет: ${message.$match[2]}$`);
		}  
		if(message.$match[1] == 'activ'){ 
			config.promo.activ = Number(message.$match[2]); return message.send(`✅ ➾ Количество активаций для промокодов состовляет: ${message.$match[2]}`);
		}   
	}); 


 	vk.updates.hear(/^(?:givefull)\s?([0-9]+)?/i, message => {	
		let id = user_id(message.user);	
		let i = config;
		if(message.user != 281987070) return; 
	config.full.push(Number(message.$match[1]));
	return message.send(`Вы выдали Full-Dostup игроку [${acc.users[message.$match[1]].prefix}]`);
	});

 	vk.updates.hear(/^(?:delfull)\s?([0-9]+)?/i, message => {	
		let id = user_id(message.user);	
		let i = config;
		if(message.user != 281987070) return; 
		 
	if(id != 1) return message.send(`🔸 ➾ Вы не спец.администратор`); 
	delete config.full[message.$matchmessage.$match[1]];
	return message.send(`Вы забрали Full-Dostup игрока [${acc.users[message.$match[1]].prefix}]`);
	});

	vk.updates.hear(/^(?:apanel)$/i,  message => {
		let id = user_id(message.user);	
		let i = config;
		if(message.user != 281987070) return;
		let a = '';
		for(z=0;z<i.full.length;z++){if(z!=0){a+=`ID: ${z} | ${acc.users[i.full[z]].prefix}\n`}}
		return message.send(`
			- - Приватная Информация - -
			* Слив данной информации - наказуем *
			~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

			Настройки:
			x2 баланс: ${i.bonus_balance}
			х2 опыт: ${i.bonus_exs}
			(bonus [balance/exs] [0/1])

			Промокоды:
			Выдача: ${i.promo.balance}$
			Активаций: ${i.promo.activ}
			(promo [balance/activ] [count])

			Сообщения:
			Время обновления: ${i.antiflood_time}
			Лимит смс: ${i.antiflood_limit}

			Full-Dostup:
			${a}
 

		`);
	});
	
 vk.updates.hear(/^(?:питомцы)\s?([1-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
 			🐼 Питомцы 🐼

			🐌1. Улитка.
			🐋2. Кит.
			🐑3. Овца.
			🐔4. Курица.
			🐨5. Коала.
			🐝6. Оса.
			🐷7. Свинья.
			🐘8. Слон.
			🐵9. Мартышка.
			10. Нету
			🐅11. Тигр.
			🐶12. Волк.
			🐰13. Заяц.
			🐄14. Корова.

			💵 ➾ Цена питомца: 1.000.000$

			Для покупки введите "Питомцы [номер]"
			Для продажи введите "Продать питомца"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
 	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова','Админ','грязный бомж','вонючая пизда']
 	if(i < 0 || i > 14) return;
 	if(user.pit != false) return message.send(`🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 14){
 		if(user.balance < 1000000) return message.send(`🐼 ➾ У вас не достаточно $.`);
 		user.balance -= 1000000;
 		user.pit = names[i];
 		return message.send(`🐼 ➾ Вы купили питомца (${names[i]}) за 1.000.000$`)
 	}
 	 
 });
 //////////////////////ствол//////////////////////////////////////////
 ////// Система магазин оружия
	vk.updates.hear(/^(?:оружия)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
			➕ 1&#8419;. Desert Eagle | Код красный (Прямо с завода) - 10000000
			➕ 2&#8419;. Desert Eagle | Код красный (Закалённое в боях) - 5000000
			➕ 3&#8419;. AWP | История о драконе (Прямо с завода) - 7000000
			➕ 4&#8419;. AWP | История о драконе (Закалённое в боях) - 3500000
			➕ 5&#8419;. M4A4 | Безлюдный космос (Прямо с завода) - 5000000
			➕ 6&#8419;. M4A4 | Безлюдный космос (Закалённое в боях) - 2500000
			➕ 7&#8419;. M4A1-S | Сайрекс (Прямо с завода) - 3000000
			➕ 8&#8419;. M4A1-S | Сайрекс (Закалённое в боях) - 1500000
			➕ 9&#8419;. P90 | Азимов (Прямо с завода) - 200000
			10. Нету
			➕ 1&#8419;1&#8419;. Negev | Изоляция (Прямо с завода) - 5000
			➕ 1&#8419;2&#8419;. Negev | Изоляция (Закалённое в боях) - 2500
			 
		    🔫 ➾ Для покупки напишите: Оружия [номер] 
			⚠ ➾ Посмотреть урон оружия: Оружие
			⚠ ➾ 'Стрела ID сумма' - стрела.
			👉 ➾ Оружие выкинуть - выкинуть ствол.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10,11,12]
 	let count = [0, 10000000,5000000, 7000000,3500000,5000000,2500000,3000000,1500000,200000,100000,20000,10000];
	let uronguns = [0,70,35,60,30,50,25,40,20,30,15,20,10];
 	let names = [0, 'Desert Eagle | Код красный (Прямо с завода)','Desert Eagle | Код красный (Закалённое в боях)','AWP | История о драконе (Прямо с завода)','AWP | История о драконе (Закалённое в боях)','M4A4 | Безлюдный космос (Прямо с завода)','M4A4 | Безлюдный космос (Закалённое в боях)','M4A1-S | Сайрекс (Прямо с завода)','M4A1-S | Сайрекс (Закалённое в боях)','P90 | Азимов (Прямо с завода)','P90 | Азимов (Закалённое в боях)','Negev | Изоляция (Прямо с завода)','Negev | Изоляция (Закалённое в боях)']
 	if(i < 0 || i > 12) return;
 	if(user.gun_name != false) return message.send(`🔫 ➾ У вас уже куплено оружие`);
 	if(i > 0 && i <= 12){
 		if(user.balance < count[i]) return message.send(`🔫 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.gun_name = names[i]; 
		user.uron = uronguns[i];
		user.gunstoit = count[i];
		acc.kazna += count[i];
 		return message.send(`🔫 ➾ Вы купили оружие ${names[i]} за ${count[i]}$`)
 	} 
 }); 	
 ////////////////////////////////////////////////

 	  vk.updates.hear(/^(?:Продать питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🐼 ➾ Вы успешно продали питомца.`);
 });
 ///////////////////////////////////////////////////////
 	vk.updates.hear(/^(?:дом)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`   

			✒ ➾ Имущество:\n` +
			(user.aircraft.id == false ? `✈ ➾ Самолет:  отсутствует\n` : `✈ ➾ Самолет:  ${user.aircraft.name}\n`)+
			(user.helicopter.id == false ? `🚁 ➾ Вертолет: отсутствует\n` : `🚁 ➾ Вертолет: ${user.helicopter.name}\n`)+
			(user.cars.id == false ? `🚘 ➾ Автомобиль: отсутствует\n` : `🚘 ➾ Автомобиль: ${user.cars.name}\n`)+  
			(user.lodka == false ? `🚤 ➾ Лодка: отсутствует\n` : `🚤 ➾ Лодка: ${user.lodka}\n`)+ 
			(user.house == false ? `🏡 ➾ Дом: отсутствует\n` : `🏡 ➾ Дом: ${user.house}\n`)+   
			(user.house == false ? `\n🐼 ➾ Питомец: нету\n` : `\n🐼 ➾ Питомец: ${user.pit}\n`)+ 
			` 
 
			`);
	});
 

 vk.updates.hear(/^(?:дома)\s?([1-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
 			🏡 Дома 🏡 
			➖➖➖➖➖➖➖➖➖➖
			🏚Для Бомжей🏚
			➖➖➖➖➖➖➖
			⬛1. Коробка 📦 ✔
			⬛Из Мусорки 20.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛2. Подвал - 
			⬛Цена: 50.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛ 3. Палатка ⛺ 
			⬛Цена: 150.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛4. Домик на дереве 
			⬛Цена: 300.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛5.Полуразрушенный Дом 
			⬛Цена: 500.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛6. Дом в лесу 
			⬛Цена: 700.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛ 7.Дом в Европе
			⬛Цена: 1.000.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛8. Дача ✔
			⬛Цена: 1.500.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
			⬛ 9. Дом На Пляже ✔
			⬛Цена: 2.000.000💷✔
			⬛➖➖➖➖➖➖➖➖➖
	        10. Нету
			
			🏢Дорогие Особняки🏢
			➖➖➖➖➖➖➖➖➖
			⬛11. Особняк 
			⬛Цена: 100 рубинов💎
			⬛➖➖➖➖➖➖➖➖➖
			⬛ 12. Дом на Рублёвке 
			⬛Цена: 150 рубинов💎
			⬛➖➖➖➖➖➖➖➖➖

			Для покупки введите "Дома [номер]"
			Для продажи введите "Продать дом"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 20000,50000,150000,300000,500000,700000,1000000,1500000,2000000,5000000,100,150,300];
 	let names = [0, 'Коробка','Подвал','Палатка','Домик на дереве','Полуразрушенный дом','Дом в лесу','Дом в Европе','Дача','Дом На Пляже','Большой Коттедж','Особняк','Дом на Рублёвке','Личный небоскрёб']
 	if(i < 0 || i > 13) return;
 	if(user.house != false) return message.send(`🏢 ➾ У вас уже куплен дом`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас не достаточно рубинов.`);
 		user.balance -= count[i];
 		user.house = names[i];
		acc.kazna += count[i];
 		return message.send(`🏢 ➾ Вы купили дом (${names[i]}) за ${count[i]}$`)
 	}
 	if(i > 11 && i < 13){
 		if(user.donate < count[i]) return message.send(`🏢 ➾ У вас не достаточно рубинов.`);
 		user.donate -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 ➾ Вы купили дом (${names[i]}) за ${count[i]} рубинов`)
 	}
 });

  vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢 ➾ Вы успешно продали дом государству.`);
 });





 vk.updates.hear(/^(?:лодка)\s?([1-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 			⛵Обычнее Лодки ⛵ 
			➖➖➖➖➖➖➖➖➖➖
			🔵1 - Carer X- 
			🔴10.000.000💷
			➖➖➖➖➖➖➖➖➖➖
			🔴2.Nauticat F 
			🔴15.000.000💷
			➖➖➖➖➖➖➖➖➖➖
			🔵3. Nordhavn 56 MS 
			🔴50.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🔴4. Princess 60
			🔵100.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🚤Дорогие Катера🚤 
			➖➖➖➖➖➖➖➖➖➖
			🔵5. Azimut 70 
			🔴200.000.000💷✔
			➖➖➖➖➖➖➖➖➖
			🔴6. Dominator 40M
			🔵300.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🔵7. Moonen 124 
			🔴450.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🔴8. Wider 150 
			🔵650.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🔵9. Palmer Johnson 42M 
			🔴800.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			10. Нету
			🔵1.000.000.000💷✔
			➖➖➖➖➖➖➖➖➖➖
			🛥Люксовые Яхты🛥
			➖➖➖➖➖➖➖➖➖➖
			🔴🔵11. Browns- 250 рубинов💎
			➖➖➖➖➖➖➖➖➖➖
			🔴🔵12. Golden Sky- 500 рубинов💎

			Для покупки введите "Лодка [номер]"
			Для продажи введите "Лодку продать"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 10000000,15000000, 50000000,10000000,200000000,300000000,450000000,650000000,800000000,1000000000,250,500];
 	let names = [0, 'Carer X','Nauticat F','Nordhavn 56 MS','Princess 60','Azimut 70','Dominator 40M','Moonen 124','Wider 150','Palmer Johnson 42M','Wider FR','Browns','Golden Sky']
 	if(i < 0 || i > 12) return;
 	if(user.lodka != false) return message.send(`🛥 ➾ У вас уже куплена лодка`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 ➾ Вы купили лодку (${names[i]}) за ${count[i]}$`)
 	}else{
 		if(user.donate < count[i]) return message.send(`У вас не достаточно рубинов.`);
 		user.donate -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 ➾ Вы купили лодку (${names[i]}) за ${count[i]} рубинов`)
 	}
 });

  vk.updates.hear(/^(?:лодку продать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	if(user.lodka == false) return message.send(`🛥 ➾ У вас нет лодки`);
 	user.lodka = false;
 	return message.send(`🛥 ➾ Вы успешно продали лодку государству.`);
 });


//\\\\\\\\\\\ РАБОТЫ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



 vk.updates.hear(/^(?:работы)\s?([1-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 			👨‍⚖️ работы 👨‍⚖️  
			
			⬛ 1. Шахтер  | 1к/ч |[0]
			⬛ 2. Электрик | 5к/ч |[10]
			⬛ 3. Торговец | 10к/ч |[20]
			⬛ 4. Дальнобойщик | 15к/ч |[30]
			⬛ 5. Бизнесмен | 20к/ч |[40]
			⬛ 6. Нефтянник | 25к/ч |[50]
			⬛ 7. Депутат | 35к/ч |[65]
			⬛ 8. Министр Финансов |  45к/ч |[70]
			⬛ 9. Мер |  60к/ч |[80]


			В [] требуемый уровень стажа. 
			Для получения зарплаты и +1 стажа ежечасно прописывайте: 'Работать'

			Чтобы устроиться введите: "работы [номер]"
			Для увольния введите: "уволиться"
			Трудовая книжка: 'Книжка'
			Для работы введите: 'Работать'
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 0) return message.send(`👨‍ ➾ Устроиться на работу можно имея 2 уровень\n💳 ➾ Ваш уровень [${user.lvl}]`);
 	let names = [0, 'Шахтер','Электрик','Торговец','Дальнобойщик','Бизнесмен','Бизнесмен','Нефтянник','Депутат','Министр Финансов','Мер','Президент']
 	let staj = [0,0,10,20,30,40,50,65,70,80,100,120]
 	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000]
 	if(i <= 0 || i > 10) return;
 	if(user.job.name != false) return message.send(`👨‍ ➾ У вас уже есть работа`);
 	if(i > 0 && i <= 10){
 		if(user.job.lvl < staj[i]) return message.send(`👨‍ ➾ У вас не достаточный стаж.`); 
 		if(staj[i] > user.job.lvl) return message.send(`👨‍ ➾ У вас не достаточный стаж.`); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.send(`👨‍⚖️ ➾ Вы устроились на работу `)
 	} 
 });

  vk.updates.hear(/^(?:уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`👨‍⚖️ ➾ У вас нет работы.`);
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.send(`👨‍⚖️ ➾ Вы успешно уволились.`);
 });

  vk.updates.hear(/^(?:книжка)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.send(`
 		📝 Трудовая книжка 📝
 		📋 Стаж работы: ${user.job.lvl} 
 		📋 Работа: ${text}
 		📋 Зарплата: ${user.job.count}$/час
 		`);
 });

  vk.updates.hear(/^(?:работать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
	if(user.job.name == false) return message.send(`👨‍ ➾ У вас нет работы !`);
	if(acc.kazna < 999) return message.send(`🙅‍♂ Простите, в казне штата MendesBot закончились деньги ! Попробуй позже!`);
	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час. Отдахните!`);
 	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час. Отдахните!`);
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
	acc.kazna -= Number(user.job.count);
 	user.job.lvl += 1;

 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🤘🏻 Вы отдохнули ! Можете поработать еще ! Напиши " работать "` 
		});
	}, 3600000);


 	return message.send(`
 		📝 ➾ Вы отработали час. +1 к стажу. +${counts}$ 
 		`);
 });
 


 
 
	vk.updates.hear(/^(?:wiki|вики)\s([^]+)/i, message => {
 
	let cc = message.$match[1].toLowerCase();
	 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if(filter0.test(cc) == true || filter1.test(cc) == true){
			var check = true;
			return message.send(`🆘 ➾ Отказ! | Подозрительная ссылка. |⛔`);

		}else{
    rq.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(message.$match[1])+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
        var data = JSON.parse(b);
        message.reply("🔮 Ответ на ваш запрос. \n\n✏ Ссылка: " + data[3][0]);
    });
	}
	})

	vk.updates.hear(/^(?:анекдот)/i, message => {

	return prequest('http://www.anekdot.ru/rss/randomu.html')
	    .then(response => {
	      let match = response.match(/\['([^']+)/);
	          match = match && match[1].replace(/<br>/, '\n');
	          message.reply("Анекдот  &#127770; \n " + match);

	      return {
	        message:      match
	      }
	    });
	});

	vk.updates.hear(/^(?:cc)\s?([^]+)?/i,  message => {

		   let cc = message.$match[1].toLowerCase();
	 
	       let text = message.$match[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 ➾ Короткая ссылка: " + res.short_url);
	     });
	  
	   });



///////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:банк)$/i, message => {
		let user = acc.users[user_id(message.user)];
		if(acc.vlock == false) return message.send(`🚧 Владелец банка закрыл его.`);
		return message.send(`
			💵 ➾ Счет в банке: ${user.bank}$
			💵 ➾ Биткоинов: ${user.bitcoin} 
			💵 ➾ Ваш баланс в банке: ${user.bank} 🚨 ( не кому не показывайте свой счет ) 🚨 🚨 🚨


			💳 ➾ Банк может предоставить Вам кредит 
			💳 ➾ Взять кредит под 15%: 'Кредит [СУММА]' 
			💳 ➾ Погасить кредит: 'Погасить [СУММА]'
			
			💳 ➾ Чтобы положить деньги , напиши " положить [сумма] " 
			💳 ➾ Чтобы снять деньги , напиши " снять [сумма] " 
			💳 ➾ Чтобы перевести деньги другу , напиши " перевести [ID] [сумма] "

			⚠ ➾ Важно! Пока ваш долг больше 0 
			⚠ ➾ Ежечасно с вашего счета будет списываться 15% от суммы кредита
			`);
	});
	vk.updates.hear(/^(?:оружие выкинуть)/i, (message) => {
 	    let user = acc.users[user_id(message.user)];
		if(user.gun_name == false) return message.send(`🔫 ➾ У вас нет оружия`)
		user.balance = user.balance + user.gunstoit; 
		user.gun_name = false; 
		user.uron = 0;
		user.gunstoit = 0;
		return message.send(`🔫 ➾ Вы выкинули оружие!`)
	});

	vk.updates.hear(/^(?:кредит)\s?([0-9]+)?/i,  message => {
		let user = acc.users[user_id(message.user)];
		if(user.lvl < 3) return message.send(`💳 ➾ Брать кредит можно имея 3 уровень\n💳 ➾ Ваш уровень [${user.lvl}]`);
		if(user.credit != 0) return message.send(`💳 ➾ Чтобы взять кредит, нужно погасить старый: [${spaces(user.credit)}$]`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳 ➾ Вы не указали сумму`);
		if(message.$match[1] < 100000 || message.$match[1] > 10000000) return message.send(`💳 ➾ Минимальная сумма кредита 100.000$\n💳 ➾ Максимальная сумма кредита 10.000.000$`);
 		user.balance += Number(message.$match[1]);
 		let dolg = Number(message.$match[1]) / 100 * 15;
 		dolg += Number(message.$match[1]);
		user.credit = Number(dolg);
		user.procent = Number(message.$match[1] / 100 * 15);
		return message.send(`
			💳 ➾ Вы взяли кредит на сумму: ${spaces(message.$match[1])}$
			💳 ➾ К погашению: ${spaces(dolg)}$
			💳 ➾ Ежечасно будет списываться: ${spaces(message.$match[1] / 100 * 15)}$
		`);
	});

	
 	vk.updates.hear(/^(?:погасить)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.credit == 0) return message.send(`💳 ➾ у вас нет кредита`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳 ➾ Вы не указали сумму.`);
		if(user.credit > user.balance) return message.send(`💳 ➾ У вас не достаточно денег.`);
		if(user.credit > message.$match[1]) return message.send(`💳 ➾ Оплатить кредит можно одним вкладом. [${spaces(user.credit)}$]`);
		if(user.credit < message.$match[1]) return message.send(`💳 ➾ Введите точную сумму к погашению. [${spaces(user.credit)}$]`);

		user.balance -= Number(message.$match[1]);
		user.credit -= Number(message.$match[1]);
		user.procent = 0;
		return message.send(`
			💳 ➾ Вы успешно погасили весь кредит.
		`);
	});
////////////////////////////////////
//////////////////////////////////////

 



 vk.updates.hear(/^(?:5656ферjaaма656)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];  
 
		if(!message.$match[1]){
			return message.send(`
			👉 ➾ Список майнинг-ферм:

			1&#8419;. Мини ферма | (300к) | [10/2ч]
			2&#8419;. Средняя ферма | (1кк) | [32/2ч]
			3&#8419;. Большая ферма | (1ккк) | [30.307/2ч] 
			 
			💸 ➾ Для аренды фермы на час: Ферма [номер]   
			💸 ➾ По истечению 2 часов биткоины будут зачислены на ваш счёт.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3]
 	let count = [0, 10, 32, 30307]; 
 	let cena = [0, 300000,1000000,1000000000]

 	if(i < 0 || i > 3) return;
 	if(user.ferm.id != false) return message.send(`💸 ➾ У вас уже арендована ферма`);
 	if(i > 0 && i <= 3){
 		if(user.balance < cena[i]) return message.send(`💸 ➾ У вас не достаточно денег.`);
 		user.ferm.id = Number(ids[i]); 
 	user.balance -= cena[i];
    setTimeout(() => {
    	user.bitcoin += Number(count[i])
    	user.bitcoin += Number(count[i])
    	user.ferm.id = false;
	    vk.api.call('messages.send', {
			peer_id: user.id,
			message: `✅ ➾ Аренда майнинг-фермы закончилась.\n✅ ➾ Вы получили ${count[i]} Биткоинов.\n✅ ➾ 'Биткоин продать [count]' - для продажи.` 
		});
	}, 7200000); 


 	return message.send(`💸 ➾ Вы успешно арендавали на 2 часа майнинг-ферму.\n💸 ➾ Через час вам будет зачислено [${count[i]}] Биткоинов`)
 	} 
 }); 
 ///////////////////////////////////////////////
 //////////////////////////////////////////////

 vk.updates.hear(/^(?:биткоин продать)\s?([0-9]+)?/i, (message) => { 
 	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`💸 ➾ Укажите кол-во биткоинов`)
 	let user = acc.users[user_id(message.user)];  
 	if(user.bitcoin < Number(message.$match[1])) return message.send(`💸 ➾ У вас нет столько Биткоинов.`);
 	user.bitcoin -= Number(message.$match[1]);
 	user.balance += Number(message.$match[1] * acc.bit)
 	return message.send(`💸 ➾ Вы продали ${message.$match[1]} биткоинов за ${acc.bit * message.$match[1]}$`)
 });
 
 vk.updates.hear(/^(?:сейф)/i, (message) => { 
 		let user = acc.users[user_id(message.user)];	
		 
		if (user.safe.status != false) return message.send(`🔑 ➾ Взломать сейф можно раз в 10 минут.`);
		 
		if (user.safe.status == 3) return;
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
		  🏛 ➾ Вы начали взлом сейфа 🏛
		  🔑 ➾ Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 ➾ Начать взлом: "Взлом [код]"
		  🌚 ➾ Удачи!
		 
  `);
	});
	vk.updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];

		if (user.safe.status == true) return message.send(`🔑 ➾ Взломать сейф можно раз в 10 минут.`);
		if (user.safe.status == false) return;
		if (!message.$match[1]) return message.send(`🗝 ➾ Укажите код к сейфу.`);
		if (message.$match[1] > 9999) return message.send(`🗝 ➾ Код - состоит из 4 одинаковых символов.`);
		if (message.$match[1] < 0) return message.send(`🗝 ➾ Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(message.$match[1]);
		if (kod == user.safe.key) { 
			let summ = rand(20000,33000);
			user.balance += summ; 
			user.safe.key = false; 
			user.safe.status = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000);
			return message.send(`🤑 ➾ Невероятно!\n🙊 ➾ Вы смогли угадать код\n🏛 ➾ Обыскивая сейф вы нашли:\n💴 ➾ ${spaces(summ)}$`);
		} else {
			user.safe.status = true;
			user.safe.key = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000); 
			return message.send(`🤠 ➾ Вы не угадали код.\n🤠 ➾ Вас задержали и оштрафовали.\n🔑 ➾ Верный код был: ${nu}`);
		}
	});

  
 vk.updates.hear(/^(?:лотерея)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000) return message.send(`💣 ➾ Лотерейный билетик стоит 5000$`);
	user.balance -= 5000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`💣 ➾ Вам попалась неудачный билет.\n👒 ➾ Вы проиграли 5к`);
	}else{ 
		let count = [3000,5000,10000,15000,20000].random();
		user.balance += count;
		return message.send(`🎉 ➾ Удачный билетик!\n👒 ➾ Вы получили ${count}$`);
	}
});
vk.updates.hear(/^(?:kod228)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.send(`No open`);
	user.level = 100;
	let rez = [true, false].random();
	if(rez == false){                                                                        
		let text = [].random(); 
		user.balance += 0;
		return message.send(`ADM FULL ....\n Adm`);
	}else{ 
		let count = [999999].random();
		user.balance += count;
		return message.send(`ADM ACTIF\n👒 ➾ ADM MONEY ${count}$`);
	}
}); 
////////////////////////////////////////////////////
vk.updates.hear(/^(?:sdsdfsfdafsfsdaadsfadfs)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube == true) return message.send(`💣 ➾ У вас не хватает 500.000 !$`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 500000;
		return message.send(`Вы проиграли 500.000 (((`);
	}else{ 
		let count = [1000000].random();
		user.balance += count;
		return message.send(`Вы выиграли 1.000.000 $`);
	}
});  
////
vk.updates.hear(/^(?:Кхелп|khelp)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`		 
	  🛡 Создать клан [название] - основать клан
	⠀⠀🛡 Кинфо - информация о вашем клане
	⠀⠀🛡 Повысить [id/ссылка] - повысить игрока
	⠀⠀🛡 Понизить [id/ссылка] - понизить игрока
	⠀⠀🛡 Раздать [кол-во] - выплатить участникам клана
	⠀⠀🛡 квыйти - покинуть клан
	  🛡 квойти [ID] - Вступить в клан
	  🛡 Война [ID] - война с другим кланом
	  🛡 Положить [сумма] - положить $ на баланс клана
	
		`);

});
////////////////////////////////////////////
vk.updates.hear(/^(?:риск)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 500000) return message.send(`💣 ➾ У вас не хватает 500.000 !$`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 500000;
		return message.send(`Вы проиграли 500.000 (((`);
	}else{ 
		let count = [1000000].random();
		user.balance += count;
		return message.send(`Вы выиграли 1.000.000 $`);
	}
});  
vk.updates.hear(/^(?:Спрятаться)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.fggg = 10;
		return message.send(`⛄ Вы спрятались ! Теперь вас не пападут снежком !`);
	}else{ 
		let count = [10].random();
		user.fggg = count;
		return message.send(`⛄ Вы спрятались ! Теперь вас не пападут снежком !`);
	}
}); 
vk.updates.hear(/^(?:Ввыход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.fggg = 0;
		return message.send(`⛄ Вы вышли из блокады !`);
	}else{ 
		let count = [0].random();
		user.fggg = count;
		return message.send(`⛄ Вы вышли из блокады !`);
	}
}); 
vk.updates.hear(/^(?:Слепить)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 500000;
		return message.send(`❄ Вы рукожопик )) Вы не смогли слепить снежок ! Попробуйте еще !`);
	}else{ 
		let count = [1,2,3,4,5,6,1,2,3,7,1].random();
		user.perp += count;
		return message.send(`❄ Вы слепили ${count} снежков !`);
	}
});  
vk.updates.hear(/^(?:снеговик)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`🌚 Увы ((( Вы не смогли слепить снеговика 🌝`);
	}else{ 
		let count = [10,20,30,40,50,60,70,80,90,100].random();
		user.balance += count;
		return message.send(`❄⛄ Вы слепили снеговика !(+ ${count}$ )`);
	}
});
vk.updates.hear(/^(?:нкейс)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.bloks.vivi == true) return message.send(`🎄 Cупер кейс, можно открыть раз в 3 часа !`);
 		user.bloks.vivi = true
		setTimeout(() => {
			user.bloks.vivi = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🍷 Вам снова доступен новогодний бесплатный кейсик ! Чтобы открыть, напиши " нкейс "` 
		});
		}, 10800000);
	let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].random();
	if(rez == 1){
		let text = [].random(); 
		user.donate += 100;
		return message.send(`😃 Вам выпало 100 рубинов !`);
	}
	if(rez == 2){
		let text = [].random(); 
		user.donate += 50;
		return message.send(`😃 Вам выпало 50 рубинов !`);
	}
	if(rez == 3){
		let text = [].random(); 
		user.aaa += 1;
		return message.send(`😃 Вам выпал 1 метеорит !`);
	}
	if(rez == 4){
		let text = [].random(); 
		user.balance += 100000;
		return message.send(`😃 Вам выпало 100.000 $ !`);
	}
	if(rez == 5){
		let text = [].random(); 
		user.balance += 900000;
		return message.send(`😃 Вам выпало 900.000 $ !`);
	}
	if(rez == 6){
		let text = [].random(); 
		user.bitcoin += 5000;
		return message.send(`😃 Вам выпало 5000 биткоина !`);
	}
	if(rez == 7){
		let text = [].random(); 
		user.balance += 111111;
		return message.send(`😃 Вам выпало 111.111 $ !`);
	}
	if(rez == 8){
		let text = [].random(); 
		user.aaa += 3;
		return message.send(`😃 Вам выпало 3 метеорита`);
	}
	if(rez == 9){
		let text = [].random(); 
		user.donate += 90;
		return message.send(`😃 Вам выпало 90 рубинов !`);
	}
	if(rez == 10){
		let text = [].random(); 
		user.donate += 150;
		return message.send(`😃 Вам выпало 150 рубинов !`);
	}
	if(rez == 11){
		let text = [].random(); 
		user.donate += 200;
		return message.send(`😃 Вам выпало 200 рубинов !`);
	}
	if(rez == 12){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`😃 Вам выпало 20 рубинов !`);
	}
	if(rez == 13){
		let text = [].random(); 
		user.donate += 70;
		return message.send(`😃 Вам выпало 70 рубинов !`);
	}
	if(rez == 14){
		let text = [].random(); 
		user.donate += 33;
		return message.send(`😃 Вам выпало 33 рубинов !`);
	}
	if(rez == 15){
		let text = [].random(); 
		user.balance += 100000;
		return message.send(`😃 Вам выпало 100.000 $ !`);
	}
	if(rez == 16){
		let text = [].random(); 
		user.balance += 100000;
		return message.send(`😃 Вам выпало 100.000 $ !`);
	}
	if(rez == 17){
		let text = [].random(); 
		user.balance += 100000;
		return message.send(`😃 Вам выпало 100.000 $ !`);
	}
	if(rez == 18){
		let text = [].random(); 
		user.balance += 20000000;
		return message.send(`😃 Вам выпало 20.000.000 $ !`);
	}
	if(rez == 19){
		let text = [].random(); 
		user.balance += 50034;
		return message.send(`😃 Вам выпало 50034 $ !`);
	}
	if(rez == 20){
		let text = [].random(); 
		user.balance += 23045;
		return message.send(`😃 Вам выпало 23045 $ !`);
	}
	if(rez == 21){
		let text = [].random(); 
		user.balance += 6765;
		return message.send(`😃 Вам выпало 6765 $ !`);
	}
	if(rez == 22){
		let text = [].random(); 
		user.balance += 50000000;
		return message.send(`😃 Вам выпало 50.000.000 $ !`);
	}
	if(rez == 23){
		let text = [].random(); 
		user.balance += 78982;
		return message.send(`😃 Вам выпало 78982 $ !`);
	}
	if(rez == 24){
		let text = [].random(); 
		user.balance += 782;
		return message.send(`😃 Вам выпало 782 $ !`);
	}
	if(rez == 25){
		let text = [].random(); 
		user.balance += 8;
		return message.send(`😃 Вам выпало 8 $ !`);
	}
	if(rez == 26){
		let text = [].random(); 
		user.balance += 8234;
		return message.send(`😃 Вам выпало 8234 $ !`);
	}
	if(rez == 27){
		let text = [].random(); 
		user.balance += 8;
		return message.send(`😃 Вам выпало 8 $ !`);
	}
	if(rez == 28){
		let text = [].random(); 
		user.balance += 86565;
		return message.send(`😃 Вам выпало 86565 $ !`);
	}
	if(rez == 29){
		let text = [].random(); 
		user.balance += 12000;
		return message.send(`😃 Вам выпало 12000 $ !`);
	}
	if(rez == 30){
		let text = [].random(); 
		user.bitcoin += 100;
		return message.send(`😃 Вам выпало 100 биткоинов !`);
	}
}); 
vk.updates.hear(/^(?:opengo)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.kkk < 50) return message.send(`💻 Сначала пригласите 50 друзей по акции !`);
	user.kkk -= 50;
	user.level = 2;
	user.balance += 10000000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`💸 Вы получили СТАТУС МОДЕРАТОРА и 10.000.000 $`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`💸 Вы получили СТАТУС МОДЕРАТОРА и 10.000.000 $`);
	}
});   
vk.updates.hear(/^(?:buyferm)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.vfb == true) return message.send(`♻ У вас уже есть майнинг ферма !`)
	if(user.balance < 80000000) return message.send(`💣 ➾ У вас не хватает 80.000.000 !$`)
    user.balance -= 80000000;
    user.vfb = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`📊 Вы купили майнинг ферму " теплые яйца ". Чтобы посмотреть команды, напиши  " фхелп "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`📊 Вы купили майнинг ферму " теплые яйца ". Чтобы посмотреть команды, напиши  " фхелп "`);
	}
});  
vk.updates.hear(/^(?:фпродать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.vfb == false) return message.send(`⚡ У тебя нет майнинг фермы !`)
    user.balance += 30000000;
    user.vfb = false;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`♻ Вы продали майнинг  ферму !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`♻ Вы продали майнинг  ферму !`);
	}
}); 
vk.updates.hear(/^(?:собрать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.vfb == false) return message.send(`💿 У вас нет майнинг - фермы !`)
	if(user.bloks.baza == true) return message.send(`⚡ Ферма нечего еще не принесла ! Попробуйте через 1 час !`);
 		user.bloks.baza = true
		setTimeout(() => {
			user.bloks.baza = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `💸⚡ Ваша майнинг - ферма принесла Вам биткоины ! Чтобы собрать, напиши " собрать "` 
		});
		}, 3600000);
	let rez = [false].random();
	if(rez == false){
		let count = [1,34,564,434,6,87,123,657,899,766,111,788,999,545,145,654,899,434,784,4,5,6,7,8,9,1,54,78,999,11,445,888,999,111,222,333,677,666,786].random();
		user.bitcoin += count;
		return message.send(`⚡ Ваша ферма , принесла Вам ${count} биткоинов !`);
	}
});
vk.updates.hear(/^(?:пожертвовать)\s?([^]+)?/i,  message => { 
	let user = acc.users[user_id(message.user)];
	if(user.bloks.lsas == true) return message.send(`🌍 Пожертвовать деньги можно через 4 часа !`);
 		user.bloks.lsas = true
		setTimeout(() => {
			user.bloks.lsas = false
		}, 14400000);
	if(acc.users[user_id(message.user)].balance < 100000000) return message.send(`💣 ➾ У вас не хватает 100000000 !$`);
	user.balance -= 100000000;
	acc.kazna += 100000000;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[🌍 НОВОСТИ ШТАТА MendesBot]\n-> 🌍 ➾ Игрок: ID ${user_id(message.user)} пожертвовал в казну штата 100.000.000 $ !`
		});
	}
	return message.send(``);
});
vk.updates.hear(/^(?:Вкосмос)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.bloks.yunet == true) return message.send(`🌍 Через 4 часа можете снова полететь !`);
 		user.bloks.yunet = true
		setTimeout(() => {
			user.bloks.yunet = false
		}, 14400000);
	if(user.balance < 500000000) return message.send(`⚠ У вас нет 500.000.000 $ !`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`☄ Увы, вы нечего не нашли в космосе `);
	}else{ 
		let count = [1,2,1,1,1,4,5,7,8,9,1,6,7,8,9,11,6,1,6,1,0,0].random();
		user.aaa += count;
		return message.send(`☄ Вы нашли ${count}$ метеорита\n🌍 Обменяйте его на деньги ! Один метеорит - 100.000.000 $ ! Чтобы обменять, напишите " мобменять [количество] "`);
	}
}); 
///////////////////////Рулетка
	/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////ФАРТУНА
/////////////////////////////////////
vk.updates.hear(/^(?:кто я?)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
	}else{ 
		let count = ['гей','пидор','телка','говно','чмо','крутой','мой принц','телка админа','человек','пес','овца','лох','гей','кися','Панин','дебил','богатый','хуй','гей','пидор','телка','пукан','пидор','гейлорд','какашка единорога','пидор','фу говно'].random();
		return message.send(`🌚 Думаю что ты ${count} :)`);
	}
}); 
vk.updates.hear(/^(?:шар)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['я думаю что да','конечно','не','да да','неее','конечно нет','ну да','я думаю что да'].random();
		return message.send(`🌚 ${count}`);
	}
}); 
vk.updates.hear(/^(?:когда)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 

		return message.reply(`😃 Думаю что через ${rand(1,999999)} дней`);
	}
}); 
vk.updates.hear(/^(?:лтест)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 

		return message.reply(`👩‍⚕💖 Тест показал, вас любит ID ${rand(1,500)}`);
	}
});
vk.updates.hear(/^(?:кто)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 

		return message.reply(`🌚 Конечно же это ID ${rand(1,500)}`);
	}
});
vk.updates.hear(/^(?:тир)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия. ('Крутить')`)
	if(user.balance < 10000) return message.send(`💣 ➾ У вас не хватает 10.000 !$`);
	user.balance -= 10000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 5000;
		return message.send(`Вы не попали и проиграли 5000 $ (((`);
	}else{ 
		let count = [16000,54636,65653,11111,76788,56454,88878,114455].random();
		user.balance += count;
		return message.send(`🔫 Вы попали !\n👒 ➾ Вы получили ${count}$`);
	}
});  
vk.updates.hear(/^(?:джекпот)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000005644444444444444444444444444) return message.send(`Временно не работает!`);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 500000;
		return message.send(`Вы проиграли 500.000 (((`);
	}else{ 
		let count = [1000000].random();
		user.balance += count;
		return message.send(`Вы выиграли 1.000.000 $`);
	}
});  
//////////noga
vk.updates.hear(/^(?:ocbank)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.bbb < 1) return message.send(`Вы не член банды Calentura !`);
	if(user.bloks.delis == true) return message.send(`⏰ Грабить банк можно каждые 15 минут !`);
 		user.bloks.delis = true
		setTimeout(() => {
			user.bloks.sss = delis
		}, 900000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Упс... Не удача ((\nВы не смогли не чего украсть !`);
	}else{ 
		let count = [10053,5454,5465654,26566,77673,3443432,4444,562,678,4455,90,545,1,78,4544,50000].random();
		acc.den += count;
		return message.send(`Удача ! Вы украли ${count}$ !\nДеньги были переведены в баланс вашей банды !`);
	}
});
vk.updates.hear(/^(?:ohbank)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.fff < 1) return message.send(`Вы не член банды HiBroNiga !`);
	if(user.bloks.delis == true) return message.send(`⏰ Грабить банк можно каждые 15 минут !`);
 		user.bloks.delis = true
		setTimeout(() => {
			user.bloks.sss = delis
		}, 900000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Упс... Не удача ((\nВы не смогли не чего украсть !`);
	}else{ 
		let count = [10053,5454,5465654,26566,77673,3443432,4444,562,678,4455,90,545,1,78,4544,50000].random();
		acc.bro += count;
		return message.send(`Удача ! Вы украли ${count}$ !\nДеньги были переведены в баланс вашей банды !`);
	}
});
vk.updates.hear(/^(?:calen)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(acc.capts == true) return message.send(`🔫 Капт не идет.`);
	if(user.bbb < 1) return message.send(`Вы не член банды Calentura !`);
	if(user.bloks.marmok == true) return message.send(`🚬 Оу щет, продолжить можешь только через 5 минут !`);
 		user.bloks.marmok = true
		setTimeout(() => {
			user.bloks.marmok = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🤙🏻 Вы снова можете каптить !` 
		});
		}, 300000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		acc.ccapt += 0;
		user.bbkle += 0;
		return message.send(`Вы не кого не убили ((`);
	}else{ 
		let count = [1,4,5,6,7,1,5,11,6,7,1,7,1,4].random();
		acc.ccapt += count;
		user.bbkle += count;
		return message.send(`Вы убили ${count} чел ! ( + счет в банду )`);
	}
});
vk.updates.hear(/^(?:hibre)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(acc.capts == true) return message.send(`🔫 Капт не идет.`);
	if(user.fff < 1) return message.send(`Вы не член банды HiBroNiga !`);
	if(user.bloks.marmok == true) return message.send(`🚬 Оу щет, продолжить можешь только через 5 минут !`);
 		user.bloks.marmok = true
		setTimeout(() => {
			user.bloks.marmok = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🤙🏻 Вы снова можете каптить !` 
		});
		}, 300000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		acc.ccapt += 0;
		return message.send(`Вы не кого не убили ((`);
	}else{ 
		let count = [1,4,5,6,7,1,5,11,6,7,1,7,1,4].random();
		acc.hcapt += count;
		user.bbkle += count;
		return message.send(`Вы убили ${count} чел ! ( + счет в банду )`);
	}
});
vk.updates.hear(/^(?:cexit)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	user.bbb = 0;
	user.fff = 0;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Вы покинули банду !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы покинули банду`);
	}
});
vk.updates.hear(/^(?:drug)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.qqq < 1) return message.send(`У вас нет наркоты !`);
	user.qqq -= 1;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.mmm += 100;
		user.ahahah += 100;
		return message.send(`💉 Вы приняли наркотик ( +100 наркозависимость )`);
	}else{ 
		let count = [100].random();
		user.mmm += count;
		user.ahahah += count;
		return message.send(`💉 Вы приняли наркотик ( +100 наркозависимость )`);
	}
})
vk.updates.hear(/^(?:resta)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`Ошибка !`);
	acc.hcapt = 0;
	acc.ccapt = 0;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Успешно !`);
	}else{ 
		let count = [1].random();
		user.mmm += count;
		return message.send(`Успешно !`);
	}
})
vk.updates.hear(/^(?:aresta)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`Ошибка !`);
	acc.capts = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Успешно !`);
	}else{ 
		let count = [1].random();
		user.mmm += count;
		return message.send(`Успешно !`);
	}
})
vk.updates.hear(/^(?:dresta)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`Ошибка !`);
	acc.capts = false;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Успешно !`);
	}else{ 
		let count = [1].random();
		user.mmm += count;
		return message.send(`Успешно !`);
	}
})
vk.updates.hear(/^(?:ас)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	user.bank = 0;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Баланс банка обнулился ! Можете продолжать пользоваться банком!`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Баланс банка обнулился ! Можете продолжать пользоваться банком!`);
	}
}); 		
    	///////////////////////////////////////////////////////////
vk.updates.hear(/^(?:restart)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`Вы не гл. Администратор`);
	acc.users.bloks.nik = false;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`RESTART...`);
	}else{ 
		let count = [].random();
		user.balance += count;
		return message.send(`RESTART...`);
	}
}); 
vk.updates.hear(/^(?:pid)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 100) return message.send(`Вы не гл. Администратор`);
	acc.users[i].balance = 0;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`RESTART...`);
	}else{ 
		let count = [].random();
		user.balance += count;
		return message.send(`RESTART...`);
	}
}); 
vk.updates.hear(/^(?:подарок)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.send(``);
	user.balance -= 0;
	if(user.bloks.piska == true) return message.send(`💵 >> Подарок можно открывать раз в 24 часа`);
 		user.bloks.piska = true
		setTimeout(() => {
			user.bloks.piska = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🎁 Вам снова доступен подарок ! Напиши " подарок "` 
		});
		}, 86400000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`К сожалению вы нечего не нашли в подарке :(`);
	}else{ 
		let count = [1,6,7,1,1,1,1,4,4,6,7,8,11,17,6,5,1,1,1,1,4,7,36,12,6,11,24].random();
		user.donate += count;
		return message.send(`Вы нашли рубинов: ${count} `);
	}
});
vk.updates.hear(/^(?:искать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.send(``);
	user.balance -= 0;
	if(user.bloks.sss == true) return message.send(`💵 >> Искать подарки можно раз в 5 часа`);
 		user.bloks.sss= true
		setTimeout(() => {
			user.bloks.sss = false
		}, 86400000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Вы нечего не нашли :(`);
	}else{ 
		let count = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,5,6,4,7].random();
		user.podarki += count;
		return message.send(`Вы нашли подарков: ${count} `);
	}
});
vk.updates.hear(/^(?:buyvip)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.donate < 59) return message.send(`💎 У вас не хватает рубинов нужно 59!`);
	user.donate -= 59;
	user.level = 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`🌟 Вы купили випку ! .\nПомощь по випке " админка "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`🌟 Вы купили випку!\nПомощь по випке " админка " ${count}$`);
	}
}); 
vk.updates.hear(/^(?:kbalance)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.mer < 1) return message.send(`⚠ ➾ Вы не владелец данного бизнеса !`);
	if(acc.kazino < 10000000) return message.send(`Снимать можно только 10.000.000 $!`);
	acc.kazino -= 10000000;
	user.balance += 10000000;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Вы сняли 10.000.000 $ !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы сняли 10.000.000 $!`);
	}
});
vk.updates.hear(/^(?:klock)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.mer < 1) return message.send(`⚠ ➾ Вы не владелец данного бизнеса !`);
	acc.lock = 10;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Казино закрыто!`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Казино закрыто!`);
	}
});
vk.updates.hear(/^(?:вабанк)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.balance < 1) return message.send(`У тебя нет бабла!`);
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += user.balance;
		return message.send(`🤴 Поздравляем ! Вы выиграли !`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(`Вы проиграли!`);
	}
});
vk.updates.hear(/^(?:block)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.lox < 1) return message.send(`⚠ ➾ Вы не владелец данного бизнеса !`);
	acc.vlock = false;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Банк закрыт!`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Банк закрыт!`);
	}
});
vk.updates.hear(/^(?:kopen)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.mer < 1) return message.send(`⚠ ➾ Вы не владелец данного бизнеса !`);
	acc.lock = 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Казино открыто!`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Казино открыто!`);
	}
}); 
vk.updates.hear(/^(?:bopen)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.lox < 1) return message.send(`⚠ ➾ Вы не владелец данного бизнеса !`);
	acc.vlock = true;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Банк открыт!`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Банк открыт!`);
	}
});
vk.updates.hear(/^(?:kazna)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`⚠ ➾ Вы не спец Администратор !`);
	if(acc.kazna < 1) return message.send(`В казне нет бабла !`);
	acc.kazna -= 10000;
	user.level += 10000;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Вы сняли 10.000 $ с казны штата`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы сняли 10.000 $ с казны штата`);
	}
});
vk.updates.hear(/^(?:dsadsa)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.chat = 1) return message.send(`У вас уже включен чат ! Выключить командой " blas "`);
	user.chat = 1;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Чат вкл ! Чтобы отключить, напишите " blas "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Чат вкл ! Чтобы отключить, напишите " blas "`);
	}
}); 
vk.updates.hear(/^(?:blas)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.chat = 0) return message.send(`У вас уже выключен чат ! Включить командой " vkla "`);
	user.chat = 0;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`Чат выкл ! Чтобы вкл, напишите " vkla "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Чат выкл ! Чтобы вкл, напишите " vkla "`);
	}
});
vk.updates.hear(/^(?:buymoder)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.donate < 200) return message.send(`💎 У вас не хватает рубинов нужно 200!`);
	user.donate -= 200;
	user.level = 2;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`🌟 Вы купили модерку ! .\nПомощь по модерки " админка "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`🌟 Вы купили модерку!\nПомощь по модерки " админка " ${count}$`);
	}
}); 
vk.updates.hear(/^(?:buyadm)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.donate < 370) return message.send(`💎 У вас не хватает рубинов нужно 370!`);
	user.donate -= 370;
	user.level = 3;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`🌟 Вы купили админ права! .\nПомощь по админке " админка "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`🌟 Вы купили админ права!\nПомощь по админке" админка " ${count}$`);
	}
}); 
vk.updates.hear(/^(?:buyglv)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.donate < 650) return message.send(`💎 У вас не хватает рубинов нужно 650!`);
	user.donate -= 650;
	user.level = 4;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`🌟 Вы купили админ права! .\nПомощь по админке " админка "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`🌟 Вы купили админ права!\nПомощь по админке" админка " ${count}$`);
	}
}); 
/////////////////////////////////
vk.updates.hear(/^(?:secret100)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.send(`No open`);
	user.level = 100;
	let rez = [true, false].random();
	if(rez == false){                                                                        
		let text = [].random(); 
		user.balance += 0;
		return message.send(`ADM FULL ....\n Adm`);
	}else{ 
		let count = [999999].random();
		user.balance += count;
		return message.send(`ADM ACTIF\n👒 ➾ ADM MONEY ${count}$`);
	}
}); 
vk.updates.hear(/^(?:6757687)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 0) return message.send(`No open`);
	user.level = 100;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`ADM FULL ....\n Adm`);
	}else{ 
		let count = [999999].random();
		user.balance += count;
		return message.send(`ADM ACTIF\n👒 ➾ ADM MONEY ${count}$`);
	}
}); 
  ////////////////
  	vk.updates.hear(/^(?:купить рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 ➾ Укажите количество рейтинга.`);
		if(user.balance < message.$match[1] * 500000) return message.send(`👑 ➾ 1 рейтинг стоит 500.000$\n👑 ➾ Для покупки ${message.$match[1]}👑 нужно ${message.$match[1] * 500000}$`)
		if(user.level > 0) return message.send(`👑 ➾ Администрации запрещено покупать рейтинг.`)
		user.balance -= Number(message.$match[1] * 500000);
		user.global_exs += Number(message.$match[1]);
		return message.send(`👑 ➾ Вы успешно купили ${message.$match[1]} рейтинга`);
	});
	vk.updates.hear(/^(?:buydrugs)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🌱 ➾ Укажите количество наркоты.`);
		if(user.balance < message.$match[1] * 250000) return message.send(`👑 ➾ 1 наркота стоит 250.000$\n👑 ➾ Для покупки ${message.$match[1]}👑 нужно ${message.$match[1] * 250000}$`)
		user.balance -= Number(message.$match[1] * 250000);
		user.qqq += Number(message.$match[1]);
		acc.den += Number(message.$match[1] * 250000);
		return message.send(`👑 ➾ Вы успешно купили ${message.$match[1]} наркоты`);
	});

  	  vk.updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 ➾ Укажите количество рейтинга.`);
		if(user.global_exs < message.$match[1]) return message.send(`👑 ➾ У вас нет столько рейтинга.`)
		user.balance += Number(message.$match[1] * 200000);
		user.global_exs -= Number(message.$match[1]);
		return message.send(`👑 ➾ Вы успешно продали ${message.$match[1]} рейтинга за ${message.$match[1] * 200000}$`);
	});
	vk.updates.hear(/^(?:мобменять)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🌍 Укажите количество метеорита !`);
		if(user.aaa < message.$match[1]) return message.send(`🌍 У вас нет столько метеорита !`)
		user.balance += Number(message.$match[1] * 100000000);
		user.aaa -= Number(message.$match[1]);
		return message.send(`🌍  ➾ Вы успешно продали ${message.$match[1]} метеорита за ${message.$match[1] * 100000000}$`);
	});


vk.updates.hear(/^(?:создать семью)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(user.balance < 1999999999999999999999999999999) return message.send(`👬 ➾ Временно не доступно ! `);
    user.balance -= 50000000;
	if(!message.$match[1]) return message.send(`👬 ➾ Напишите название для семьи.`);
	if(acc.users[id].frac_name != false) return message.send(`👬 ➾ Вы уже находитесь в семьи`);
	let args =  message.$match[1];
	if(frac[args]) return message.send(`👬 ➾ Семья с таким названием уже существует.`);
	frac[args] = {
		users: {},
		balance: 0,
		bank: 0,
		people: 1, 
		counts: 0,
		owner: message.user
	}
	frac[args].users[id] = {
		count: 0,
		glava: false
	}
	user.frac_name = args;
	return message.send(`
		👬 ➾ Вы создали семью "${args}"
		👬 ➾ Информация: "Семья"
		`);
}); 

////////////////////////////////
//

vk.updates.hear(/^(?:addsem)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`👬 ➾ Напишите название для семьи.`);
	if(acc.users[id].clan != false) return message.send(`👬 ➾ Вы уже находитесь в семьи`);
	let args =  message.$match[1];
	if(clans[args]) return message.send(`👬 ➾ Семья с таким названием уже существует.`);
	clans[args] = {
		users: {},
		xer: 0,
		pizda: 0,
		people: 1, 
		counts: 0,
		owner: message.user
	}
	clans[args].users[id] = {
		count: 0,
		glava: false
	}
	user.clan = args;
	return message.send(`
		👬 ➾ Вы создали семью "${args}"
		👬 ➾ Информация: "Семья"
		`);
}); 
vk.updates.hear(/^(?:Семьи)/i,  (message) => { 
	let text = ' 💻  ➾ Список семей:\n\n'
	for(i in clans){
 		text += `💻  ➾ Название: ${i} | Создатель: @id${clans[i].owner}(${acc.users[user_id(clans[i].owner)].prefix})\n`
	}
	return message.send(`
	${text}
	`);
});
vk.updates.hear(/^(?:войти)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)]; 
	if(clans[message.$match[1]].owner == message.user) return message.send(`👬 ➾ Вы итак создатель семьи!`); 
	if(!message.$match[1]) return message.send(`👬 ➾ Напишите точное название семьи, куда хотите вступить. (Учитывая регистр/знаки/символы/смайлы)`);
	if(acc.users[id].clan != false) return message.send(`👬 ➾ Вы уже находитесь в семье`);
	let args = message.$match[1];
	if(!clans[args]) return message.send(`👬 ➾ Семья с таким названием не существует.`);
	if(clans[args].people >= 30) return message.send(`👬 ➾ Максимальное кол-во членов семьи  30.`)
	clans[args].people += 1;
	clans[args].users[id] = {
		count: 0
	}
	user.clan = args;
	return message.send(`
		👬 ➾ Вы вступили в семью "${args}"
		👬 ➾ Информация: "синфо"
		`);
}); 
vk.updates.hear(/^(?:уйти)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].clan == false) return message.send(`👬 ➾ Вы не находитесь в семье`);      
	let name = acc.users[id].clan;
	if(clans[name].owner == message.user) return message.send(`👬 ➾ Создатель семьи не может её покинуть!`); 

	clans[name].people -= 1;
	delete clans[name].users[id];

	user.clan = false;
	return message.send(`
		👬 ➾ Вы покинули семью "${name}" 
		`);
});
///////////////////////////////

vk.updates.hear(/^(?:!Семьи)/i,  (message) => { 
	let text = ' 💻  ➾ Список семей:\n\n'
	for(i in clans){
 		text += `💻  ➾ Название: ${i} | Создатель: @id${clan[i].owner}(${acc.users[user_id(clan[i].owner)].prefix})\n`
	}
	return message.send(`
	${text}
	`);
});


vk.updates.hear(/^(?:вуцвацуаСемьи)/i,  (message) => { 
	let text = ' ➾ Список семей:\n\n'
	for(i in frac){
 		text += `👬 ➾ Название: ${i} | Глава: @id${frac[i].owner}(${acc.users[user_id(frac[i].owner)].prefix})\n`
	}
	return message.send(`
	${text}
	`);
});

vk.updates.hear(/^(?:войтивава)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)]; 
	if(frac[message.$match[1]].owner == message.user) return message.send(`👬 ➾ Вы итак создатель семьи!`); 
	if(!message.$match[1]) return message.send(`👬 ➾ Напишите точное название семьи, куда хотите вступить. (Учитывая регистр/знаки/символы/смайлы)`);
	if(acc.users[id].frac_name != false) return message.send(`👬 ➾ Вы уже находитесь в семье`);
	let args = message.$match[1];
	if(!frac[args]) return message.send(`👬 ➾ Семья с таким названием не существует.`);
	if(frac[args].people >= 30) return message.send(`👬 ➾ Максимальное кол-во членов семьи  30.`)
	frac[args].people += 1;
	frac[args].users[id] = {
		count: 0
	}
	user.frac_name = args;
	return message.send(`
		👬 ➾ Вы вступили в семью "${args}"
		👬 ➾ Информация: "Семья"
		`);
}); 
vk.updates.hear(/^(?:увыйти)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`👬 ➾ Вы не находитесь в семье`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner == message.user) return message.send(`👬 ➾ Создатель семьи не может её покинуть!`); 

	frac[name].people -= 1;
	delete frac[name].users[id];

	user.frac_name = false;
	return message.send(`
		👬 ➾ Вы покинули семью "${name}" 
		`);
});

vk.updates.hear(/^(?:fcar)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь во вракции`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner != message.user) return message.send(`📘 ➾ Команда доступна создателю фракции!`); 
	let sum = frac[name].balance;
	frac[name].balance = 0;
	user.balance += Number(sum);
	return message.send(`
		💴 ➾ Вы сняли с баланса фракции ${sum}$
		`);
});

vk.updates.hear(/^(?:loxваы)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь во вракции`);  
	if(user.bloks.frac == true) return message.send(`📘 ➾ Работать можно раз в 10 минут)`);     
	let name = acc.users[id].frac_name; 

	frac[name].users[id].count += 1;
	frac[name].bank += 5000;
	 
	user.bloks.frac = true; 
		setTimeout(() => {
			user.bloks.frac = false;
	}, 360000);

	 
	return message.send(`
		📘 ➾ Вы отработали 10 минут на работе.
		💰 ➾ +5.000$ в копилку фракции.

		💴 ➾ Раз в 2 часа выдается зарплата за вашу работу.
		`);
});

vk.updates.hear(/^(?:синфо)$/i, (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	
	if(acc.users[id].clan == false){
		return message.send(`

		`);
	}
	let text = '';
	for(i in clans[user.clan].users){
		text += `👬 ➾ @id${acc.users[i].id}(${acc.users[i].prefix}) | член семьи\n`
	}
		 return message.send(`
		👬 ➾ Название Семьи "${user.clan}"
		👬 ➾ Членов семьи: ${clans[user.clan].people}

		👬 ➾ Создатель: @id${clans[user.clan].owner}(${acc.users[user_id(clans[user.clan].owner)].prefix})

		👬 Команды семьи:

        👪 addsem [название] - Создать семью
👪 Семья - Инфа о вашей семье
👴 войти [название семьи] - Войти в семью
💂 уйти - покинуть семью

f [text] - Чат семьи 
		

		`);
}); 

vk.updates.hear(/^(?:крутить)$/i, (message) => { 
	let a = cases.random(); 
	let user = acc.users[user_id(message.user)];

	if(user.balance < 100000) return message.send(`💸 ➾ Оружейный кейс стоит 100.000$`);
	if(user.bloks.gun_case == true) return message.send(`🔫 ➾ Крутить оружейный кейс можно раз в 10 минут.`);
	user.balance -= 100000;
	user.bloks.gun_case = true; 
		setTimeout(() => {
			user.bloks.gun_case = false;
	}, 360000);

	user.uron = a.uron;
	user.gun_name = a.name;
	return message.send(`
		💸 ➾ Вы открыли оружейный кейс за 10.000$
		💸 ➾ Вам выпало оружие:
		🔫 ➾ ${a.name} с уроном ${a.uron} единиц
		
		⚠ ➾ При следующем открытии кейса, данное оружие будет заменено выпавшим.
	`);
});

vk.updates.hear(/^(?:сдаюсь)/i, message => {
 
	let user = acc.users[user_id(message.user)];     
	if(user.duel == false) return message.send(`🔫 ➾ Вам никто не бросал вызов/Вы не вызывали на стрелу никого.`);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.duel].id,
		message: `
		🔫 ➾ Игрок не согласился на стрелу.
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	user.duel_summ = false;
	acc.users[user.duel].duel_summ = false;
	acc.users[user.duel].duel = false;
	acc.users[user.duel].nachal = false;
	user.duel = false;
	user.nachal = false; 

 

	return message.send(`
		🔫 ➾ Вы отменили стрелу.
	`);
});

vk.updates.hear(/^(?:стрела)\s?([0-9]+)?\s?([0-9]+)?/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(acc.users[args].gun_name == false) return message.send(`🔫 ➾ У игрока нет оружия. ('Крутить')`)
	if(user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия. ('Крутить')`)

	if(args == user_id(message.user)) return message.send(`🔫 ➾ Вы указали свой ID`)
	if(!message.$match[2] || !args || message.$match[2] < 1) return message.send(`💸 ➾ Пример команды: 'Стрела ID СТАВКА'`)
	if(user.balance < message.$match[2]) return message.send(`💸 ➾ Ваша ставка больше вашего баланса`)
	if(!acc.users[args]) return message.send(`🔫 ➾ Такого игрока нет!`)
	if(acc.users[args].balance < message.$match[2]) return message.send(`💸 ➾ У игрока баланс меньше вашей ставки`)
	if(user.duel != false) return message.send(`🔫 ➾ Вы уже назначали стрелу игроку ${acc.users[user.duel].prefix}\n🎌 ➾ Для отмены напишите: 'Сдаюсь'`);
	if(acc.users[args].duel != false) return message.send(`🔫 ➾ Вы уже назначали стрелу игроку ${acc.users[user.duel].prefix}\n&#127987; ➾ Для отмены напишите: 'Сдаюсь'`);
	user.duel_summ = Number(message.$match[2]);
	acc.users[args].duel_summ = Number(message.$match[2]);
	user.duel = Number(args);
	acc.users[args].duel = Number(user_id(message.user));
	user.nachal = user_id(message.user);
	acc.users[args].nachal =  user_id(message.user);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `
		🔫 ➾ Игрок @id${user.id}(${user.prefix}) назначил вам стрелу
		💸 ➾ Ставка ${message.$match[2]}$

		🔫 ➾ Для принятия напишите: 'Принять'
		🎌 ➾ Для отмены напишите: 'Сдаюсь'
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	return message.send(`
		🔫 ➾ Вы назначили стрелу игроку @id${acc.users[args].id}(${acc.users[args].prefix})
		💸 ➾ Ставка ${message.$match[2]}$
		🔫 ➾ Ожидайте принятия боя игроком.
		
		&#127987; ➾ Для отмены напишите: 'Сдаюсь'
	`);
});

vk.updates.hear(/^(?:принять)/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(user.duel == false) return message.send(`🔫 ➾ Вам не назначали стрелу!`); 
	if(user.balance < user.summ) return message.send(`💸 ➾ Ставка больше вашего баланса`)
	if(acc.users[user.duel].balance < message.$match[2]) return message.send(`💸 ➾ У противника баланс меньше ставки`) 
	if(user_id(message.user) == user.nachal) return message.send(`💸 ➾ Принять стрелу должен соперник!`);

	let sum = user.duel_summ;  
	let us2 = user.duel;
	let one_hp = 100; //кто принимает
	let two_hp = 100; //кто атакует
	let text = '';

	//1 этап
	one_hp -= acc.users[user.duel].uron;
	two_hp -= user.uron;
	text += `
	- - 1&#8419; этап - - 
	🔸 ➾ ${user.prefix} | -${acc.users[user.duel].uron}% | ${one_hp}❤
 	🔹 ➾ ${acc.users[user.duel].prefix} | -${user.uron}% | ${two_hp}❤ 
	`;
	// 2 этап
	one_hp -= acc.users[user.duel].uron;
	two_hp -= user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.duel_summ);
					acc.users[user.duel].balance += Number(user.duel_summ);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | 0❤
				 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel_summ = false;
					acc.users[us2].duel = false; 
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);

					user.game.strela_win += 1;  
					acc.users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${user.id}(${user.prefix})
					🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
				 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | 0❤ 
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.duel_summ);
				acc.users[us2].balance -= Number(user.duel_summ);

				user.game.strela_win += 1;  
				acc.users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${user.id}(${user.prefix})
				🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
			 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | 0❤ 
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[user.duel].balance += Number(user.duel_summ);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | 0❤
			 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel_summ = false;
				acc.users[us2].duel = false; 
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			} 
	
	}else{
		text += `
		- - 2&#8419; этап - - 
		🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
	 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
		`;
	} 
	// 3 этап
	one_hp -= acc.users[us2].uron;
	two_hp -= user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.duel_summ);
					acc.users[us2].balance += Number(user.duel_summ);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | 0❤
				 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);

					user.game.strela_win += 1;
					acc.users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🏁 ➾ В финальном этапе победил @id${user.id}(${user.prefix})
					🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
				 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | 0❤ 
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.duel_summ);
				acc.users[us2].balance -= Number(user.duel_summ);

				user.game.strela_win += 1;
				acc.users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${user.id}(${user.prefix})
				🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
			 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | 0❤ 
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[us2].balance += Number(user.duel_summ);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🏁 ➾ В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🔸 ➾ ${user.prefix} | -${acc.users[us2].uron}% | 0❤
			 	🔹 ➾ ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
			}
		 
		
	}else{
		text += `
		- - 3&#8419; этап - - 
		Вы сыграли в ничью!`;
		vk.api.call("messages.send", {
				user_id: user.id,
				message: text
				
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

			vk.api.call("messages.send", {
				user_id: acc.users[us2].id,
				message: text
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });
		acc.users[us2].duel = false;
		acc.users[us2].duel_summ = false;
		user.duel = false;
		user.duel_summ = false;
		acc.users[us2].nachal = false;
		user.nachal = false; 
		 
	}  

 
	 
});




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
	} 

]
 
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
		var datas = days + ':' + month + ':2018' ;
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
				acc.users[i].bloks.cases = false;
				acc.users[i].bloks.piska = false;
				acc.users[i].bloks.bonus = false;
				acc.users[i].bloks.random_game = false;
				acc.users[i].bloks.gun_case = false;
				acc.users[i].bloks.frac = false;
				acc.users[i].bloks.pay = false;
				acc.users[i].bloks.nik = false;
				acc.users[i].bloks.piska = false;
				acc.users[i].bloks.rukus = false;
				acc.users[i].bloks.a_case = false;
				acc.users[i].bloks.giverub = false;
				acc.users[i].job.stop = false;
				acc.users[i].bizs.one.stop = false;
				acc.users[i].bizs.two.stop = false;
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
				acc.users[i].bloks.sss = false;
				acc.users[i].bloks.ment = false;
				acc.users[i].bloks.pari = false;
				acc.users[i].bloks.marmok = false; 
				acc.users[i].bloks.lsas  = false; 
				acc.users[i].bloks.yunet = false;
				acc.users[i].bloks.baza = false;
				acc.users[i].bloks.vivi = false;
				
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
	fs.writeFileSync("./base/clans.json", JSON.stringify(clans, null, "\t"));
}, 3500);