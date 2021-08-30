const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs");
const admins = [1];
const vip = [1];
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const telephon = require("./base/telephon.json");
const promo = require("./base/promo.json");
const kosti = require("./games/kosti.json");
const menti = require("./frac/menti.json");
const config = require("./setting/config.json")


vk.setOptions({
    token: '', 
    apiMode: 'parallel',
	pollingGroupId: 0  
});

let mentionRegexp = new RegExp(`\\[club${vk.options.pollingGroupId}\\|(.*)\\]`);

vk.updates.use(async (message, next) => {
	
    if (message.is("message") && message.isOutbox)
    return;	
 
    message.user = message.senderId;
    message.text = message.payload.text;  

    if (!message.text) return;
    if(/\[club1\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club1\|(.*)\]/ig, '').trim();  

    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}

 		let id = user_id(message.user); 
 		 
		message.send(`
[👋] >> Привет, смотрю ты тут новенький? Не бойся, я помогу тебе, я - помощник мера!
[❓] >> Для начала заработай немножко денег, напиши 'Подработка'!

[✅] >> Позвать меня можно командой 'Помощь'`)
	 	 
	 	const [user_info] = await vk.api.users.get({ user_id: message.senderId});
		
		acc.users[numm] = {
			balance: 0,
			level: 0, 
			adm_time: 0,
			golod: 100, // Голод
			voda: 100, // Жажда
			bitcoin: 0, 
			donate: 0,
			perm1: '🍁🍂🍃🍀🍃🍂🌿🌟🍄🌾', // Для дворника \ ненужная переменнная
			perm2: 0, // Проверка на дворника
			perm3: 0, // Сколько для дворника нужно убрать [0\10]
			perm4: 0, // Проверка на охранника
			perm5: 0, // сколько для охранника нужно [0\10]
			perm6: 100, // Шкала жизни
			kredit: 0, // Кредит
			krediti: false, // Проверка на кредит
			proc: 0, // процент кредита
			licbiz: false, // Лицензия на бизнесыЪ
			prava: false, // Права на машину
			pravs: 0, // пронумеровка вопрос прав
			pravse: 0, // Счет прав
			pravaprov: false, // Проверка на права
			cars: 0, // Машина.
			fuel: 0, // Бензин
			fuelp: false, // Проверка на подъезд к заправке
			dvig: false, // Двигатель
			nomer: false, // Номер телефона
            mobile: false, // Телефон
			zolot: 0, // Руда - зоолото
			almaz: 0, // Руда - алмазы
			zhelez: 0, // Руда - железо
			peredv: 0, // Передача | Кол-во
			restoran: false, // Около ресторана
			shaht: 0, // Свободная
			vhod: false, // Вход в ресторан.
			restprov: false, // Проверка к ресторану.
			zavod: false, // Завод
			zalmazi: false, // Завод произвоит алмазы
			zsunduk: false, // Завод произвоит сундуки
			zpalmaz: 0, // Алмазов
			zpsundik: 0, // Сундуков
            rabotnik: 0, // Работники на зваоде
            ferma: false, // Ферма
            kolvoferm: 0, // Кол - во ферм
            proizv: 0, // Кол - во произв. Биткоинов\лайткоинов
            bitc: 0, // Кол - во биткоинов
            litecoin: 0, // Кол - во лайткоинов
            eos: 0,  // Кол - во EOS коинов
            eso: 0, // Кол - во ESO коинов
            perm30: 0, // Пособие
            perm31: false, // Проверка для консультанта
            perm32: false, // сколько для консультанта нужно [0\10]
            pexp: 0, // EXP Для ментов
            kirka: 0, // Свободная переменная
            gameprime: false, // Игровая подписка
            gameclub: false, // Локация Игровая комната
            perm43: false, // Проверка для кассира
            perm44: false, // сколько для кассира нужно [0/10]
            perm45: false, // Провка для директора магазина нужно
            perm46: false, // сколько для директора магазина нужно [0/10]
            perm47: false, // Проверка для Владельца ТЦ 
            perm48: false, // Сколько нужно для валедльца тц [0/10]
            perm49: false, // Локация шахта
            perm50: false, // Чисто для тестеров
            perm51: false, // Нужна для сброса
            perm52: false, // Сброс
            perm53: 0, // Класс
            perm54: false, // Колледж
            perm55: 0, // Курс
            perm56: 0, // Сколько нужно для курса
            perm57: false, // Свободная переменная
            perm58: false, // чисто флекс чтобы не дохуя раз можно было 
            perm59: false, // Свободная переменная
            perm60: false, // Свободная переменная
            perm61: false, // Свободная переменная
            perm62: false, // Свободная переменная
            perm63: false, // Свободная переменная
            perm64: false, // Свободная переменная
            perm65: false, // Свободная переменная
            perm66: false, // Свободная переменная
            perm67: false, // Свободная переменная
            perm68: false, // Свободная переменная
            perm69: false, // Свободная переменная
            perm70: false, // Свободная переменная
            perm71: false, // Свободная переменная
            perm72: false, // Свободная переменная
            perm73: false, // Свободная переменная
            perm74: false, // Свободная переменная
            perm75: false, // Свободная переменная
            perm76: false, // Свободная переменная
            perm77: false, // Свободная переменная
            perm78: false, // Свободная переменная
            perm79: false, // Свободная переменная
            perm80: false, // Свободная переменная
            perm81: false, // Свободная переменная
            perm82: false, // Свободная переменная
            perm83: false, // Свободная переменная
            perm84: false, // Свободная переменная
            perm85: false, // Свободная переменная
            perm86: false, // Свободная переменная
            perm87: false, // Свободная переменная
            perm88: false, // Свободная переменная
            perm89: false, // Свободная переменная
            perm90: false, // Свободная переменная
            perm91: false, // Свободная переменная
            perm92: false, // Свободная переменная
            perm93: false, // Свободная переменная
            perm94: false, // Свободная переменная
            perm95: false, // Свободная переменная
            perm96: false, // Свободная переменная
            perm97: false, // Свободная переменная
            perm98: false, // Свободная переменная
            perm100: false, // Свободная переменная
            perm101: false, // Свободная переменная
            perm102: false, // Свободная переменная
            perm103: false, // Свободная переменная
            perm104: false, // Свободная переменная
            perm105: false, // Свободная переменная
            perm106: false, // Свободная переменная
            perm107: false, // Свободная переменная
            perm108: false, // Свободная переменная
            perm109: false, // Свободная переменная
            perm110: false, // Свободная переменная
            perm111: false, // Свободная переменная
            perm112: false, // Свободная переменная
            perm113: false, // Свободная переменная
			bloks: { 
				cases: false,
				bonus: false,
				random_game: false,
				giverub: false,
				a_case: false,
				pay: false,
				frac: false,
				gun_case: false,
				с_case: false,
				bonis: false
			}, 
			ferm: {
				id: false,
				zp: 0
			},
			exs: 0,
			exsup: 50,
			lvl: 1,
			number: numm,
            fraction: {
                   frac: 'Житель', // Сама фракция
                   rang: 0 // ранг во фракции
            },
			id: message.user,
			nick: true,
			reputac: 0, // Репутация
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
			bizs: {
               bize: false,
               money: 0,
			},
			house: false,
			housep: 0,
			bank: 0,
			tag: "Новичок", 
			brak: false,
			braks: false,
			brag: false, 
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
			frac_name: false,
			prefix: user_info.first_name,
			}

console.log(`\nNew user`)
}
	let id = user_id(message.user);

 


	if(message.text){ 
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		if(acc.users[id].mute == true) return; 
	}
  	
	if(acc.users[id].ban != false) return;

    try {
        await next();
    } catch (err) { console.error(err) }
});


vk.updates.hear(/^(?:помощь|начать|Команды|Start|Help|!Help|!помощь|!начать|!команды|!start)\s?([0-9]+)?/i, (message) => {  
if(!message.$match[1] || message.$match[1] == 1){
return message.send(`
[👤] >> Статистика:
⠀⠀[👨‍💻] >> 'Паспорт' - Информация о себе
⠀⠀[💰] >> 'Баланс' - Ваш баланс
⠀⠀[💲] >> 'Банк' - Ваш баланс в банке
⠀⠀[📱] >> 'Телефон' - Информация о Вашем телефоне

[💳] >> Заработок:
⠀⠀[🛠] >> 'Работы' - Устроиться на работу
⠀⠀[🔩] >> 'Подработка' - Устроиться подрабатывать   
⠀⠀[⛏] >> 'Шахта копать' - Добыча ресурсов
⠀⠀[🚗] >> 'Таксовать' - Подвозить за деньги
⠀⠀[🔋] >> 'Фермы'
⠀⠀[🏭] >> 'Бизнесы'

[🚗] >> Машина:
⠀⠀[🚙] >> 'Машины' - Покупка авто
⠀⠀[✅] >> 'Завести' - завести двигатель
⠀⠀[❌] >> 'Заглушить' - заглушить двигатель
⠀⠀[⛽] >> 'Заправка' - заправить автомобиль
⠀⠀[💲] >> 'Таксовать' - Заработать немного денег

[❓] >> Следующая страница: Помощь 2`)
}

  
if(message.$match[1] == 2){
return message.send(`
[👪] >> Семья:
⠀⠀[👫] >> 'Брак' - Сделать предложение
⠀⠀[👨‍⚖] >> 'Развод' - Развестись

[🏰] >> Имущество:
⠀⠀[🏘] >> 'Дома' - покупка домов
⠀⠀[🚗] >> 'Машины' - покупка машин
⠀⠀[📞] >> 'Телефоны' - покупка телефонов
⠀⠀[🔋] >> 'Фермы' - покупка ферм
⠀⠀[🏭] >> 'Бизнесы' - покупка бизнеса

[💡] >> Разное:
⠀⠀[🎁] >> 'Бонус'
⠀⠀[🔁] >> 'Передать [ID] [Cумма]' - передача валюты
⠀⠀[❓] >> 'Репорт [Text]' - Задать вопрос
⠀⠀[♻] >> 'Промокод [Promo]' - Получить призы за промо  

[❓] >> Следующая страница: Помощь 3

`)
}
if(message.$match[1] == 3){
return message.send(` 
[🛫] >> Локации:
⠀⠀[🚀] >> 'Локация игры' - Посетить игровую зону
⠀⠀[🔨] >> 'Локация шахта' - посетить шахту

[🕹] >> Игры:
⠀⠀[🎰] >> 'Рулетка [Ставка]' - Играть в рулетку
⠀⠀[🎲] >> 'Кости [Ставка]' - Играть в кости

[💾] >> Учеба:
⠀⠀[📯] >> 'Учиться'
⠀⠀[🔧] >> 'Профессии' - Выбрать профессию

`)
}
}); 

 vk.updates.hear(/^(?:Профиль)$/i,  (message) => {
 	return message.send(`
Такой команды нет, воспользуйся: "Паспорт"
`)
});

// ----------------- КОМАНДА РАБОТАТЬ ----------------------------------------------------
   	vk.updates.hear(/^(?:Убираться|Убраться)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm2 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Дворник') return message.send(`🗑 | Вы не работаете дворником.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm2 = 1;
   	 	return message.send(`[♻] >> Вы начали уборку, напишите 'Убирать' несколько раз`
        ,
    {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    }
);  
});
   //-----------------------------------------------------------------------------------------

   //----------------------------- УБРАТЬСЯ --------------------------------------------------
   	vk.updates.hear(/^(?:Убирать)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Дворник') return message.send(`[😕] >> Вы не работаете дворником.`)
   	if(user.perm2 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Убраться'`)
    if(user.perm3 == 11) return message.send(`[🙀] >> Ой-ой, уже все убрано. Приходите через 4 часа`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm2 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm3 == 0){
   		user.perm3 += 1;
   		return message.send(`[♻] >> Вы начали убирать мусор:\n\n🍁🍂🍃🍀🍃🍂🌿🌟🍄🌾`,
        {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    }
)
   	}
   	if(user.perm3 == 1){
    user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 1 из 10 мусора:\n\n🍁🍂🍃🍀🍃🍂🌿🌟🍄`,
              {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    }
)
   	}
   	if(user.perm3 == 2){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 2 из 10 мусора:\n\n🍁🍂🍃🍀🍃🍂🌿🌟`,
                    {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })	
    }
    if(user.perm3 == 3){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 3 из 10 мусора:\n\n🍁🍂🍃🍀🍃🍂🌿`,{
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 4){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 4 из 10 мусора:\n\n🍁🍂🍃🍀🍃🍂`,{
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 5){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 5 из 10 мусора:\n\n🍁🍂🍃🍀🍃`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 6){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 6 из 10 мусора:\n\n🍁🍂🍃🍀`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 7){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 7 из 10 мусора:\n\n🍁🍂🍃`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 8){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 8 из 10 мусора:\n\n🍁🍂`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 9){
   	user.perm3 += 1;
   	return message.send(`[♻] >> Вы убрали 9 из 10 мусора:\n\n🍁`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Убирать"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm3 == 10){
   	user.balance += 1200
   	user.perm3 += 1;
   	return message.send(`[✅] >> Весь мусор успешно убран!\n[💲] >> Вы получили зарплату в размере: 1.200$`)
   	}
	
});
   //------------------------------------------------------------------	
  	vk.updates.hear(/^(?:Охрана)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm4 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Охранник') return message.send(`[🛡] >> Вы не работаете охранником.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm4 = 1;
   	 	return message.send(`[👮] >> Вы начали охранять, напишите 'Охранять'`,

        {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    });

   	 });
  	//-------------------------------------------------------------------------------------

   //----------------------------- ОХРАНЯТЬ --------------------------------------------------
   	vk.updates.hear(/^(?:Охранять)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Охранник') return message.send(`[😕] >> Вы не работаете охранником.`)
   	if(user.perm4 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Охрана'`)
    if(user.perm5 == 11) return message.send(`[🙀] >> Ой-ой, преступников нет. Приходите через 4 часа!`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm4 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm5 == 0){
   		user.perm5 += 1;
   		return message.send(`[👮] >> Вы начали охранять магазин:\n\n👩🧑👨👱‍♀👱👲👳🧕👷💂`,
        {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 1){
    user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 1 из 10 воров:\n\n👩🧑👨👱‍♀👱👲👳🧕👷`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 2){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 2 из 10 воров:\n\n👩🧑👨👱‍♀👱👲👳🧕`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })	
    }
    if(user.perm5 == 3){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 3 из 10 воров:\n\n👩🧑👨👱‍♀👱👲👳`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 4){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 4 из 10 воров:\n\n👩🧑👨👱‍♀👱👲`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 5){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 5 из 10 воров:\n\n👩🧑👨👱‍♀👱`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 6){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 6 из 10 воров:\n\n👩🧑👨👱‍♀`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 7){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 7 из 10 воров:\n\n👩🧑👨`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 8){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 8 из 10 воров:\n\n👩🧑`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 9){
   	user.perm5 += 1;
   	return message.send(`[👮] >> Вы поймали 9 из 10 воров:\n\n👩`,
      {
      keyboard:JSON.stringify(
    {
      "one_time": true,
      "buttons": [
      [{
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Охранять"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Уволиться"
      },
        "color": "negative"
      }]
    ]
      })
    })
   	}
   	if(user.perm5 == 10){
   	user.balance += 2400
   	user.perm5 += 1;
   	return message.send(`[🕵] >> Весь преступники пойманы!\n[💲] >> Вы получили зарплату в размере: 2.400$`)
   	}
	
});
 
  	vk.updates.hear(/^(?:Переговоры начать)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm45 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Директор Магазина') return message.send(`[❌] >> Вы не работаете директором магазина.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm45 = 1; // Сделать, чтобы он работыл
   	 	return message.send(`[👤] >> Вы начали переговоры, напишите 'Переговоры' несколько раз`);

   });

vk.updates.hear(/^(?:проверить)\s?([^]+)?/i, async (message, bot) => { 
let args = message.$match; 
   	 	let user = acc.users[user_id(message.user)];
if(!args[1]) return message.send(`Вы не указали номер квитанции\nПрочитайте Инструкцию в 'ДОНАТ'`); 
let stats = false; 

Wallet.getOperationHistory({rows: 50, operation: "IN"}, (err, operations) => { 
for(i in operations['data']){ 
stats = true; 
if(operations['data'][i]['txnId'] == args[1]){ 
if(acc.donat[operations['data'][i]['txnId']]) return message.send(`$Этот номер уже был активирован\n${s()}По всем попросам писать vk.com/riconc`); 
acc.donat[operations['data'][i]['txnId']] = { 
user: message.user, 
comment: operations['data'][i]['comment'] 
} 

if(operations['data'][i]['comment'] != null){ 
if(operations['data'][i]['comment'] == 'pay'){ 
user.balance += Number(operations['data'][i]['total']['amount'] * 1) 
return message.send(` 
Платеж найден: 
Summa: ${operations['data'][i]['total']['amount']} RUB 
Comment: ${operations['data'][i]['comment']} 
- - - - - 
Вы получили ${operations['data'][i]['total']['amount'] * 1}$ 
`); 
} 
} 
return message.send(` 
Платеж найден: 
Summa: ${operations['data'][i]['total']['amount']} RUB 
Comment: ${operations['data'][i]['comment']} 
- - - - - 
Тег в комментариях не указан. 
Обратитесь к vk.com/riconc
За получением доната 
`); 
} 
} 
if(stats == false) return message.send(`Номер квитанции не найден`); 
}); 
})


	vk.updates.hear(/^(?:Переговоры)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Директор Магазина') return message.send(`[😕] >> Вы не работаете директором магазина.`)
   	if(user.perm45 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Переговоры начать'`)
    if(user.perm46 == 11) return message.send(`[🙀] >> Ой-ой, Вы уже со всеми переговорили. Приходите через 4 часа!`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm45 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm46 == 0){
   		user.perm46 += 1;
   		return message.send(`[🤵] >> Вы начали переговаривать:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬👩‍🎨👨‍🎨👩‍🚒`)
   	}
   	if(user.perm46 == 1){
    user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 1 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬👩‍🎨👨‍🎨`)
   	}
   	if(user.perm46 == 2){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 2 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬👩‍🎨`)	
    }
    if(user.perm46 == 3){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 3 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬`)
   	}
   	if(user.perm46 == 4){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 4 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬`)
   	}
   	if(user.perm46 == 5){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 5 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧`)
   	}
   	if(user.perm46 == 6){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 6 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼👩‍🔧`)
   	}
   	if(user.perm46 == 7){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 7 из 10 купюр:\n\n👨‍💻👩‍💼👨‍💼`)
   	}
   	if(user.perm46 == 8){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 8 из 10 купюр:\n\n👨‍💻👩‍💼`)
   	}
   	if(user.perm46 == 9){
   	user.perm46 += 1;
   	return message.send(`[🤵] >> Вы переговорили с 9 из 10 купюр:\n\n👨‍💻`)
   	}
   	if(user.perm46 == 10){
   	user.balance += 6000
   	user.perm46 += 1;
   	return message.send(`[🕵] >> Вы со всеми переговорили!\n[💲] >> Вы получили зарплату в размере: 6.000$`)
   	}
	
});

  	vk.updates.hear(/^(?:Касса вкл)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm43 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Кассир') return message.send(`[❌] >> Вы не работаете кассиром.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm43 = 1; // Сделать, чтобы он работыл
   	 	return message.send(`[👤] >> Вы начали собирать деньги, напишите 'Касса собрать' несколько раз`);

   });

   	vk.updates.hear(/^(?:Касса собрать)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Кассир') return message.send(`[😕] >> Вы не работаете кассиром.`)
   	if(user.perm43 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Ксса вкл'`)
    if(user.perm44 == 11) return message.send(`[🙀] >> Ой-ой, денег нет. Приходите через 4 часа!`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm43 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm44 == 0){
   		user.perm44 += 1;
   		return message.send(`[💰] >> Вы начали собирать деньги:\n\n💷💶💴💵💸💷💵💴💶💸`)
   	}
   	if(user.perm44 == 1){
    user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 1 из 10 купюр:\n\n💷💶💴💵💸💷💵💴💶`)
   	}
   	if(user.perm44 == 2){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 2 из 10 купюр:\n\n💷💶💴💵💸💷💵💴`)	
    }
    if(user.perm44 == 3){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 3 из 10 купюр:\n\n💷💶💴💵💸💷💵`)
   	}
   	if(user.perm44 == 4){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 4 из 10 купюр:\n\n💷💶💴💵💸💷`)
   	}
   	if(user.perm44 == 5){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 5 из 10 купюр:\n\n💷💶💴💵💸`)
   	}
   	if(user.perm44 == 6){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 6 из 10 купюр:\n\n💷💶💴💵`)
   	}
   	if(user.perm44 == 7){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 7 из 10 купюр:\n\n💷💶💴`)
   	}
   	if(user.perm44 == 8){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 8 из 10 купюр:\n\n💷💶`)
   	}
   	if(user.perm44 == 9){
   	user.perm44 += 1;
   	return message.send(`[💰] >> Вы собрали 9 из 10 купюр:\n\n💷`)
   	}
   	if(user.perm44 == 10){
   	user.balance += 4800
   	user.perm44 += 1;
   	return message.send(`[🕵] >> Все деньги собраны!\n[💲] >> Вы получили зарплату в размере: 4.800$`)
   	}
	
});
//--------------------------------------------------------------------------------------------------------------
  	vk.updates.hear(/^(?:Консультация)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm31 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Консультант') return message.send(`[🛡] >> Вы не работаете консультантом.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm31 = 1;
   	 	return message.send(`[👨‍💼] >> Вы начали консультировать людей, напишите 'Помогать'`)	;

   	 });

  	   	vk.updates.hear(/^(?:Помогать)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Консультант') return message.send(`[😕] >> Вы не работаете консультантом.`)
   	if(user.perm31 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Охрана'`)
    if(user.perm32 == 11) return message.send(`[🙀] >> Ой-ой, людям не нужна консультация. Приходите через 4 часа!`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm4 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm32 == 0){
   		user.perm32 += 1;
   		return message.send(`[👤] >> Вы начали помогать людям с товаром\n\n ✏✉🃏🎈🎲💼💻💿💾💽\n\n[❓] >> Напишите команду еще раз`)
   	}
   	if(user.perm32 == 1){
    user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 1 из 10 людям:\n\n ✏✉🃏🎈🎲💼💻💿💾`)
   	}
   	if(user.perm32 == 2){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 2 из 10 людям:\n\n ✏✉🃏🎈🎲💼💻💿`)	
    }
    if(user.perm32 == 3){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 3 из 10 людям:\n\n ✏✉🃏🎈🎲💼💻`)
   	}
   	if(user.perm32 == 4){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 4 из 10 людям:\n\n ✏✉🃏🎈🎲💼`)
   	}
   	if(user.perm32 == 5){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 5 из 10 людям:\n\n ✏✉🃏🎈🎲`)
   	}
   	if(user.perm32 == 6){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 6 из 10 людям:\n\n ✏✉🃏🎈`)
   	}
   	if(user.perm32 == 7){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 7 из 10 людям:\n\n ✏✉🃏`)
   	}
   	if(user.perm32 == 8){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 8 из 10 людям:\n\n ✏✉`)
   	}
   	if(user.perm32 == 9){
   	user.perm32 += 1;
   	return message.send(`[👤] >> Вы помогли 9 из 10 людям:\n\n✏`)
   	}
   	if(user.perm32 == 10){
   	user.balance += 3600
   	user.perm32 += 1;
   	return message.send(`[🕵] >> Все люди купили нужный товар!\n[💲] >> Вы получили зарплату в размере: 3.600$`)
   	}
	
});

    vk.updates.hear(/^(?:Контроль начать)$/i,  (message) => {
   	 	let user = acc.users[user_id(message.user)];
   	    if(user.perm47 == 1) return message.send(`[❗] >> Вы итак находитесь на работе!`) 
   	 	if(user.job.name != 'Владелец ТЦ') return message.send(`[🛡] >> Вы не работаете Владельцем ТЦ.`)
   	 	if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Перекусить'`)
   	 	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	 	user.perm47 = 1;
   	 	return message.send(`[👾] >> Вы начали охранять, напишите 'Контроль'`)	;

   	 });


  	   	vk.updates.hear(/^(?:Контроль)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.job.name != 'Владелец ТЦ') return message.send(`[😕] >> Вы не работаете Владельцем ТЦ.`)
   	if(user.perm47 == 0) return message.send(`[❌] >> Вы не на работе!\n[❓] >> Напишите 'Контроль начать'`)
    if(user.perm48 == 11) return message.send(`[🙀] >> Ой-ой, Все люди проконтролированы. Приходите через 4 часа!`)	
    if(user.golod == 0) return message.send(`[🍗] >> Вы голодны, напишите 'Покушать'`)
   	if(user.voda == 0) return message.send(`[🍸] >> Вы хотите пить, напишите 'Попить'`)
   	user.perm47 = 1;
   	user.voda -= 2;
   	user.golod -= 1;
   	if(user.perm48 == 0){
   		user.perm48 += 1;
   		return message.send(`[👽] >> Вы начали контролировать работников\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻👨‍🎨👩‍✈👩‍🚀👰🤴\n\n[❓] >> Напишите команду еще раз`)
   	}
   	if(user.perm48 == 1){
    user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 1 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻👨‍🎨👩‍✈👩‍🚀👰`)
   	}
   	if(user.perm48 == 2){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 2 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻👨‍🎨👩‍✈👩‍🚀`)	
    }
    if(user.perm48 == 3){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 3 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻👨‍🎨👩‍✈`)
   	}
   	if(user.perm48 == 4){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 4 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻👨‍🎨`)
   	}
   	if(user.perm48 == 5){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 5 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾👩‍💻`)
   	}
   	if(user.perm48 == 6){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 6 из 10 людей:\n\n 🧖‍♂👷👩‍🏫👩‍🌾`)
   	}
   	if(user.perm48 == 7){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 7 из 10 людей:\n\n 🧖‍♂👷👩‍🏫`)
   	}
   	if(user.perm48 == 8){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 8 из 10 людей:\n\n 🧖‍♂👷`)
   	}
   	if(user.perm48 == 9){
   	user.perm48 += 1;
   	return message.send(`[👽] >> Вы проконтролировали 9 из 10 людей:\n\n🧖‍♂`)
   	}
   	if(user.perm48 == 10){
   	user.balance += 3600
   	user.perm48 += 1;
   	return message.send(`[🤘] >> Все люди проконтролированы!\n[💲] >> Вы получили зарплату в размере: 7.200$`)
   	}
	
});	   	
//---------------------------------------------------------------------------------------------------------------

updates.hear(/^(?:кнопка)\s(.*)$/i, async (message) => {
		let user = acc.users[user_id(message.user)];

	if(message.chatId === 2143 && message.senderId !== 1424607) return message.reply(`в этой беседе добавлять кнопки может только администратор.`);

	if(message.$match[1].toLowerCase() === "удалить") {
		message.user.set("buttons", []);
		return message.sens(`вы очистили все кнопки!
		Для добавления новых используйте: Кнопка [Текст]`, {
			keyboard: Keyboard.keyboard([])
		});
	} else {
		if(user.perm31.length >= 40) return message.reply(`ваше поле заполнено! (40/40)
		Для очистки поля используйте: Кнопка удалить`);



		return message.send(`кнопка успешно добавлена!`, {
			keyboard: Keyboard(user.perm31)
		});
	}
});

vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 1) return message.send(` Доступа нет!`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			random_id: 0,
		    message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});

vk.updates.hear(/^(?:пострассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 4) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			random_id: 0,
			message: `Новый пост на стене!\n\n`,
			attachment: `${message.$match[1]}`
		});
	}
	return message.send(`Посты отправлены!`);
});

vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
	if(!message.$match[1] || !message.$match[2]) return message.send(`[❓] >> Неккоректно. Пример команды: 'Передать [ID] [Сумма]'`)
	let user = acc.users[user_id(message.user)];
    if(user.peredv >= 150000) return message.send(`[❌] >> Валюту передавать можно раз в день.`)
    let proverka = Number(message.$match[2]) + user.peredv
     
   
    
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`[❓] >> Неверное ID или сумма.`)
	if(Number(proverka) > 150000) return message.send(`[❌] >> Выберите число меньше.\n\n[❓] >> Максимальное кол-во передаваемой валюты: 150.000$`)	
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`[❓] >> Проверьте вводимые данные.`)
	if(message.$match[2] > user.balance) return message.send(`[❌] >> У Вас нет столько средств.`);
	user.balance -= Number(message.$match[2]);
	user.peredv += Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		random_id: 0,
		message: `[🔔] >> Оповещение!\n\n[↔] >> Вам перевели ${message.$match[2]}$\n[👤] >> Перевел: @id${user.id}(${user.prefix})`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`[✅] Перевод прошел успешно.\n\n[💲] >> Вы перевели ${acc.users[message.$match[1]].prefix}  ${message.$match[2]}$.`);
});
			  
////// Система машин
	vk.updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`[❗] >> Чтобы купить машину Вам нужен дом!`); 
	if(!message.$match[1]){
			return message.send(`
[1⃣] » Номер: 1
⠀⠀[🚗] » Марка: Лада Приора
⠀⠀[💲] » Цена: 50.000$

[2⃣] » Номер: 2
⠀⠀[🚗] » Марка: Volkswagen Polo
⠀⠀[💲] » Цена: 100.000$

[3⃣] » Номер: 3
⠀⠀[🚗] » Марка: Ford Focus
⠀⠀[💲] » Цена: 150.000$

[4⃣] » Номер: 4
⠀⠀[🚗] » Марка: BMW x6
⠀⠀[💲] » Цена: 200.000$

[5⃣] » Номер: 5
⠀⠀[🚗] » Марка: Audi a8
⠀⠀[💲] » Цена: 250.000$

[6⃣] » Номер: 6
⠀⠀[🚗] » Марка: Lexus LX
⠀⠀[💲] » Цена: 300.000$

[7⃣] » Номер: 7
⠀⠀[🚗] » Марка: Rolls Roys Phantom
⠀⠀[💲] » Цена: 400.000$
			 
			[❓] >> Чтобы купить, напишите: Машины [номер]
			[❔] >> Чтобы продать, напишите: 'Машина Продать'. 

			[❗] >> Напишите 'Таксовать', чтобы заработать деньги..
			`)
		}
	let i = message.$match[1]; 
 	let count = [0, 50000,100000,150000,200000,250000,300000,400000];
 	let names = [0, 'Лада Приора','Volkswagen Polo','Ford Focus','BMW x6','Audi A8','Lexus LX','Rolls Roys Phantom']
 	if(i < 0 || i > 7) return message.send(`[❌] >> Машины под таким номером нет.`);
 	if(user.prava == false) return message.send(`[🅰] >> Без прав нельзя покупать машину. Сдайте на права`) 
 	if(user.cars != false) return message.send(`[❓] >> Вы уже имеете машину.\n\n[❔] >> Ваша машина: ${user.cars}`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`[❌] >> У вас не достаточно средств.`);
 		user.balance -= count[i]; 
 		user.cars = names[i]; 
 		return message.send(`[✅] >> Машина <<${names[i]}>> куплена`)
 	} 
 }); 


 
	vk.updates.hear(/^(?:машина продать)/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`[❌] >> Вы не имеете авто.`)
		if(user.cars == 'Лада Приора'){
			user.balance += 50000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<Лада Приора>> продана.\n\n[💲] >> Вы получили: 50.000$`)

		}
		if(user.cars == 'Volkswagen Polo'){
			user.balance += 250000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<Volkswagen Polo>> продана.\n\n[💲] >> Вы получили: 250.000$`)

		}
		if(user.cars == 'Ford Focus'){
			user.balance += 500000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<Ford Focus>> продана.\n\n[💲] >> Вы получили: 500.000$`)

		}
		if(user.cars == 'BMW x6'){
			user.balance += 1500000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<BMW x6>> продана.\n\n[💲] >> Вы получили: 1.500.000$`)

		}
		if(user.cars == 'Lexus LX'){
			user.balance += 5000000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<Lexus LX>> продана.\n\n[💲] >> Вы получили: 5.000.000$`)

		}
		if(user.cars == 'Rolls Roys Phantom'){
			user.balance += 15000000
			user.cars = false
			return message.send(`[✅] >> Машина марки <<Rolls Roys Phantom>> продана.\n\n[💲] >> Вы получили: 15.000.000$`)
		}
	});

 vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 	 let user = acc.users[user_id(message.user)];	
 		return message.send(`

 			${user.prefix}, доступные бизнесы

[1⃣] » Название: Ларек
⠀⠀[💲] » Стоимость: 20.000$
⠀⠀[💰] » Прибыль: 1.000$/час

[2⃣] » Название: Магазин концтоваров
⠀⠀[💲] » Стоимость: 100.000$
⠀⠀[💰] » Прибыль: 5.000$/час

[3⃣] » Название: Магазин гаджетов
⠀⠀[💲] » Стоимость: 1.000.000$
⠀⠀[💰] » Прибыль: 15.000$/час

[4⃣] » Название: Сеть Магазинов
⠀⠀[💲] » Стоимость: 5.000.000$
⠀⠀[💰] » Прибыль: 75.000$/час

[5⃣] » Название: Бизнес Центр
⠀⠀[💲] » Стоимость: 10.000.000
⠀⠀[💰] » Прибыль: 150.000$/час

[6⃣] » Название: Крупнейший ТЦ
⠀⠀[💲] » Стоимость: 50.000.000
⠀⠀[💰] » Прибыль: 750.000$/час 
			

			[✅] >> Чтобы купить, напишите: Бизнесы [номер]
			[❓] >> Данные о бизнесе: Бизнес 

			[❗] >> Чтобы продать, напишите: 'Бизнес продать'

 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 20000, 100000,1000000,5000000,10000000,50000000];
 	let names = [0, 'Ларек','Магазин концтоваров','Магазин гаджетов','Сеть магазинов','Бизнес Центр','Крупнейший ТЦ'] 
 	if(i < 0 || i > 6) return message.send(`[🏢] >> Такого бизнеса не существует.`)
 	if(user.bizs.bize != false) return message.send(`[❌] >> У Вас уже есть бизнес.`)
 	if(!Number(message.$match[1])) return message.send(`[🆔] >> Укажите бизнес.`)

 		if(user.balance < count[i]) return message.send(`[❌] >> Вам не хватает денег.`);
 		user.balance -= count[i];
	    user.bizs.bize = names[i];
	
		return message.send(`[✅] >> Бизнес <<${names[i]}>> куплен\n\n[❓] >> Каждый час Вы будет платить налог в размере: 10.000$`) 
 
 });
vk.updates.hear(/^(?:Пособие)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.job.name != false) return message.send(`[❗] >> Доступно только безработным.`)
return message.send(`
[❓] >> Ваше пособие состовляет: ${user.perm30}$

[❗] >> Подсказка: Снять пособие.`) 
});

vk.updates.hear(/^(?:gbpldddd)$/i,  (message) => {
return message.send(`хуй:

хуй
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
        "label": "Помощь"
    },
      "color": "default"
    },
    {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"3\"}",
        "label": "Паспорт"
    },
      "color": "positive"
      },
      {
        "action": {
        "type": "text",
        "payload": "{\"button\": \"4\"}",
        "label": "Паспорт"
      },
        "color": "negative"
      }]
    ]
      })
    });
    }
);  

vk.updates.hear(/^(?:Снять Пособие)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.job.name != false) return message.send(`[❗] >> Доступно только безработным.`)
if(user.perm30 == 0) return message.send(`[❗] >> Пусто. Снимать нечего!`)
user.balance += 600
user.perm30 = 0
return message.send(`[✅] >> Вы забрали пособие в размере 600$\n\n[❓] >> Пропишите команду через 12 часов! `)
});	

   	vk.updates.hear(/^(?:Бизнес продать)$/i,  (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.bizs.bize == false) return message.send(`[❌] >> Вы не имеете бизнес.`)
		if(user.bizs.bize == 'Ларек'){
			user.balance += user.bizs.money;
			user.balance += 10000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Ларек>> продан за 10.000$`);
		}
		if(user.bizs.bize == 'Магазин концтоваров'){
			user.balance += user.bizs.money;
			user.balance += 50000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Магазин концтоваров>> продан за 50.000$`);
		}
		if(user.bizs.bize == "Магазин гаджетов"){
			user.balance += user.bizs.money;
			user.balance += 500000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Магазин гаджетов>> продан за 500.000$`);
		}
		if(user.bizs.bize == 'Сеть магазинов'){
			user.balance += user.bizs.money;
			user.balance += 2500000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Сеть магазинов>> продан за 2.500.000$`);
		}
		if(user.bizs.bize == 'Бизнес Центр'){
			user.balance += user.bizs.money;
			user.balance += 5000000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Бизнес Центр>> продан за 5.000.000$`);
		}
		if(user.bizs.bize == 'Крупнейший ТЦ'){
			user.balance += user.bizs.money;
			user.balance += 25000000
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >> Бизнес <<Крупнейший ТЦ>> продан за 25.000.000$`);
		}
		if(user.bizs.bize == 'Testers'){
			user.balance += 0
			user.balance += user.bizs.money
			user.bizs.bize = false;
			user.bizs.money = 0;
			return message.send(`[✅] >>  Бизнес тестеров <<Testers>> продан за 0$`);
		}			  
	 
	});

vk.updates.hear(/^(?:Тестеры)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.perm50 == true) return;
if(message.chatId != 1) return;
user.bizs.bize = `Testers`
user.perm50 = true
user.gameprime = true
user.balance += 15000
setTimeout(() => {
	user.gameprime = false;
}, 7200000);
return message.send(`
[✅] >> Ты активировал промокод тестеров и получил:

>> Игровая подписка на 2 часа. !
>> Уникальный бизнес!
>> Игровую валюту в размере: 15.000$!
>> Уникальный статус в паспорте!

[❓] >> Спасибо, что были с нами на протяжении разработки.
Успехов Вам, ожидайте обновлений!

`)
});

vk.updates.hear(/^(?:CID)/i, message => {
return message.send(`${message.chatId}`)	
});

   	vk.updates.hear(/^(?:Бизнес)$/i,  (message) => {
   	    let user = acc.users[user_id(message.user)];
   	    if(user.bizs.bize == false) return message.send(`[❌] >> Вы не имеете бизнес.`)
   	    return message.send(`  
   	  	[🏧] >> Информация о бизнесе

   	  	[🏪] >> Название: ${user.bizs.bize}
   	  	[💲] >> На балансе: ${spaces(user.bizs.money)}


` + 
(user.bizs.bize == `Ларек` ? `[🔰] >> Прибыль: 1.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Магазин концтоваров` ? `[🔰] >> Прибыль: 5.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Магазин гаджетов` ? `[🔰] >> Прибыль: 15.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Бизнес Центр` ? `[🔰] >> Прибыль: 150.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Крупнейший ТЦ` ? `[🔰] >> Прибыль: 750.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Сеть магазинов` ? `[🔰] >> Прибыль: 75.000$/час` : ``)+

`
` + 
(user.bizs.bize == `Testers` ? `[🔰] >> Прибыль: 30.000$/час` : ``)+

`

   	  	`)
   	});

 vk.updates.hear(/^(?:Ресторан)$/i,  (message) => {
 let user = acc.users[user_id(message.user)];
 if(user.restprov == true) return message.send(`[🚶] >> Вы уже находитесь в пути.`)
 if(user.restoran == 1) return message.send(`[❗] >> Вы итак около ресторана\n\n[❓] >> Напишите "Войти ресторан", чтобы посетить ресторан`)
 if(user.vhod == true) return message.send(`[❓] >> Вы уже находитесь в ресторане`)
 if(user.cars == false){
 	user.restprov = true
 	setTimeout(() => {
 	 	        user.restprov = false
				user.restoran = 1;
				message.send(`[🚶] >> @id${user.id}(${user.prefix}), Вы пришли к ресторану\n\n[❓] >> Напишите "Войти ресторан", чтобы посетить ресторан`)
			}, 300000);
 	 message.send(`[🚶] >> Вы пошли пешком до ресторана.\n\n[❓] >> Вы прибудите через 5 минут.`)
 }
 if(user.cars != false){
 	 user.restprov = true

 	setTimeout(() => {
 		user.restprov = false
		user.restoran = 1;
		message.send(`[🚙] >> @id${user.id}(${user.prefix}), Вы приехали к ресторану\n\n[❓] >> Напишите "Войти ресторан", чтобы посетить ресторан`)
	}, 120000);
 	 message.send(`[🚶] >> Вы поехали на машине к ресторану.\n\n[❓] >> Вы прибудите через 2 минут.`)
 }
 
 });

 vk.updates.hear(/^(?:Войти ресторан)$/i,  (message) => {
 let user = acc.users[user_id(message.user)];
  if(user.vhod == true) return message.send(`[❓] >> Вы уже находитесь в ресторане`)
 if(user.restoran != 1) return message.send(`[❗] >> Вы не около ресторана.`)

 user.vhod = true
 user.restoran = 0

 return message.send(`[✅] >> Вы вошли в ресторан.\n\n[❓] >> Напишите "Меню", чтобы узнать список блюд.`)
});

 vk.updates.hear(/^(?:Меню)$/i,  (message) => {
 let user = acc.users[user_id(message.user)];
 if(user.vhod == false) return message.send(`[❓] >> Вы не находитесь в ресторане`)

return message.send(`
Доступные блюда:

[🥗] >> Салаты
[🥘] >> Супы
[🍲] >> Вторые блюда
[🍧] >> Десерты

 	`)
});

//============= СИСТЕМА МЕНТОВ =========================
vk.updates.hear(/^(?:Создать полицию)$/i,  (message) => {
let user = acc.users[user_id(message.user)];

menti['Полиция'] = {
	leader: message.senderId,
	kazna: 0,
	block: true,
	kolvo: 1,
	users: {}
}
menti[`Полиция`].users[user_id(message.user)] = {
	rang: 10,
	id: message.senderId,
	nick: user.prefix
}
user.fraction.frac = `Полиция`
return message.send(`Организация создана.`)
});

vk.updates.hear(/^(?:Вступить полиция)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.fraction.frac == 'Полиция') return message.send(`[🕵] >> Вы уже находитесь в полиции.`)
if(user.fraction.frac == 'Бандиты') return message.send(`[🕵] >> Вы находитесь в другой фракции.`)

menti[`Полиция`].users[user_id(message.user)] = {
	rang: 1,
	id: message.senderId,
	nick: user.prefix
}
user.fraction.frac = `Полиция`
menti[`Полиция`].kolvo += 1;

return message.send(`[🔰] » Вы стали полицейским!

[❓] » Команды полиции: "Кполиция"
[❔] » Информация: "Участок"`)
});

vk.updates.hear(/^(?:Писключить)\s?([0-9]+)?/i, message => {
if(!Number(message.$match[1])) return message.send(`[🕵] >> ID Должен быть числового вида`)
if(message.$match[1] == user_id(message.user)) return message.send(`[🕵] >> Нельзя выбирать самого себя.`)
if(!acc.users[message.$match[1]]) return message.send(`[🕵] >> Данный игрок не зарегистрирован`)
if(acc.users[message.$match[1]].fraction.frac == 'Бандиты') return message.send(`[🕵] >> Данный игрок находится в другой фракции`)					
if(!menti[`Полиция`].users[message.$match[1]]) return message.send(`[🕵] >> Данный игрок является обычным жителем`)	
if(menti[`Полиция`].users[user_id(message.user)].rang < 9) return message.send(`[🕵] >> Ваш ранг не позволяет Вам этого.`)
if(menti[`Полиция`].users[user_id(message.user)].rang < menti[`Полиция`].users[message.$match[1]].rang) return message.send(`[🕵] >> Вы не можете исключить лидера.`)


delete menti[`Полиция`].users[message.$match[1]]
menti[`Полиция`].kolvo -= 1
return message.send(`[🔰] >> @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) был исключен из полиции.`)
});

vk.updates.hear(/^(?:Фпомощь)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.fraction.frac == 'Полиция'){
	return message.send(`
[❓] >> "БД" - Проверить паспорт игрока |~| 1 Ранг
[📢] >> "GO" - Сказать в громкоговоритель |~| 1 Ранг
[➕] >> "Выдать звезду" - Объявиться в розыск |~| 2 Панг
[💲] >> "Оштрафовать" - Оштрафовать игрока |~| 3 Ранг
[♿] >> "Посадить" - Арестовать игрока |~| 4 Ранг
[🔚] >> "Обыскать" - Посмотреть налицие предметов |~| 5 Ранг
[🔙] >> "Выпустить" - освободить игрока |~| 6 Ранг

		`)
}
});
vk.updates.hear(/^(?:ffff)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.level < 1) return message.send(`соси`);
for(i=1;i<200000;i++){
if(acc.users[i]){

            acc.users[i].perm53 = 0 
            acc.users[i].perm54 = false
            acc.users[i].perm55 = 0
            acc.users[i].perm56 = 0
return message.send(`готово нах`)
}
}
});
vk.updates.hear(/^(?:Сброс)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
if(user.level < 1) return;
for(i=1;i<200000;i++){
if(acc.users[i]){
		acc.users[i].perm3 = 0
		acc.users[i].perm5 = 0
		acc.users[i].perm32 = 0
       	acc.users[i].perm44 = false
		acc.users[i].perm46 = 0
      	acc.users[i].perm48 = 0
		acc.users[i].bloks.cases = false
		acc.users[i].bloks.bonus = false
		acc.users[i].bloks.random_game = false
		acc.users[i].bloks.giverub = false
		acc.users[i].bloks.a_case = false
		acc.users[i].bloks.pay = false;
 		acc.users[i].bloks.bonis = false;
 		acc.users[i].shaht = 0
 		acc.users[i].peredv = 0
	}
}
return message.send(`Сброс таймеров прошел успешно `)	
});

vk.updates.hear(/^(?:Дежурство)$/i,  (message) => {
let user = acc.users[user_id(message.user)];
let hz = [1, 2, 3, 4].random()
let phrase1 = [`[❓] >> Вы гуляли по скверу и увидели, как молодой мужчина пытается украсть сумку у старушки. Вы недолго думая надели на вора наручники и вызвали подкрепление.\n\n[✅] >> Преступник пойман`, `[❓] >> Вы пошли в ресторан поужинать, но пока Вы шли на Вас напал человек в капюшоне, он вытащил телефон из Вашего кармана и убежал в темноту. Вы побежали за ним, и через малое время поймали его. Вы сразу же схватили его и повели в отделение\n\n[✅] >> Преступник пойман`, `[❓] >> Проезжая на машине Вы заметили странную группировку. Недолгодумая Вы вызвали полицию. оказалась - Террористами.\n\n[✅] >> Преступник пойман.`, `[❓] >> Пока вы стояли в магазине в очереди произошло ограбление. Вы помогли задержать преступника.\n\n[✅] >> Преступник пойман! `].random()
let phrase2 = [`[❓] >> Вы спускались по лестнице и увидели, как незнакомый человек бьет женщину. Вы захотели его поймать, но он убежал от Вас.\n\n[❌] >> Преступник пропущен`, `[❓] >> Вы пошли в театр. В театре проищошла драка из-за того, что кто-то кому-то мешал смотреть постановку. Вы выясинили кто виновник этой суматохи, и только Вы собрались его ловить, как он скрылся в толпе\n\n[❌] >> Преступник пропущен`, `[❓] >> Пошли в <<KFC>>, только хотели зайти, но увидели, что рядом с рестораном разодрались двое мужчин. Вы пошли к ним. Они поняли, что Вы полицейский и убежали.\n\n[❌] >> Преступник пропущен`].random()
if(hz == 1){
	return message.send(`${phrase1}`)
}
if(hz == 4){
	return message.send(`${phrase1}`)
}
if(hz == 2){
	return message.send(`${phrase2}`)
}
if(hz == 3){
	return message.send(`${phrase2}`)
}
});	

//========================================================
 vk.updates.hear(/^(?:Купить завод)$/i,  (message) => {
 let user = acc.users[user_id(message.user)];
 if(user.balance < 20000) return message.send(`У Вас не достаточно средств`)
 	user.balance -= 20000
    user.zavod = true
 return message.send(`
 Вы купили завод, но для того, чтобы он что-то производил Вы должны выбрать, что он будет производить
 Доступный выбор:

 1. Производство Алмазов.
 2. Производство сундуков

 Подсказка: Выбрать 1, Выбрать 2

 `)
 });

 vk.updates.hear(/^(?:Полиция)/i,  (message) => { 
	let text = 'Информация о полиции:\n[👮] >> Лидер: @id230200017(Макс)\n\n[👤] >> Участники:\n'
	for(i in menti[`Полиция`].users){
		text += `@id${menti[`Полиция`].users[i].id}(${menti[`Полиция`].users[i].nick}) || Ранг: ${menti[`Полиция`].users[i].rang}\n`
	}
	return message.send(`
	${text}
	`);
});


vk.updates.hear(/^(?:fffff)/i,  (message) => {
addBotToConf({group_id: 1212, peer_ids: 2000000000 + 37})
});

vk.updates.hear(/^(?:Выбрать)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(user.zavod == false) return message.send(`Для начала купите завод\n\nПодсказка: Купить завод.`)
if(user.zalmazi == true && user.zsunduk == true) return message.send(`Ваш завод уже что-то производит.`);

if(message.$match[1] == 1){
	user.zalmazi = true;
	return message.send(`Вы выбрали производство алмазов, каждый час ваш завод будет производить 1 алмаз, но можно увеличить\n\nПодсказка: Нанять работников`)
}
if(message.$match[1] == 2){
	user.zsunduk = true
	return message.send(`Вы выбрали производство сундуков, каждый час ваш завод будет производить 1 сундук, но можно увеличить\n\nПодсказка: Нанять работников`)
}
});

 vk.updates.hear(/^(?:Вайп)$/i,  (message) => {
acc.users = {}
acc.number = 0
acc.msg = 0
uid = {}
return message.send(`Вайп прошел успешно`)
});


 vk.updates.hear(/^(?:Больница лечь)$/i,  (message) => {
 	let user = acc.users[user_id(message.user)];
if(user.perm36 == 1) return message.send(`[❓] >> Вы итак находитесь на стадии лечения.`)
if(user.perm6 > 30) return message.send(`[❓] >> Нельзя ложиться в больницу, когда шкала жизни больше 30%`)	
user.perm36 = 1
 	setTimeout(() => {
 		user.perm36 = 2
		message.send(`[✅] >> @id${user.id}(${user.prefix}), Вас успешно вылечили\n\n[❓] >> Напишите "Выписаться", чтобы выписаться из больницы`)
	}, 1);
 	 message.send(`[🚶] >> Вы легли в больницу.[❓] >> Через 30 минут Вам можно будет выписаться`)
 });

 vk.updates.hear(/^(?:Нанять работников)$/i,  (message) => {
 	let user = acc.users[user_id(message.user)];
    if(user.balance < 1000) return message.send(`Вам не хватает денег`)
    user.rabotnik = 5
    user.balance -= 1000
    return message.send(`Вы купили 5 работников за 1.000$\n\nВаш завод производит: 2 алмаза/сундука в час`)	
});

 vk.updates.hear(/^(?:Завод)$/i,  (message) => {
 let user = acc.users[user_id(message.user)];
 if(user.zavod == false) return message.send(`Вы не имеете завода`)
 if(user.zalmazi == false && user.zsunduk == false) return message.send(`Ваш завод ничего не производит.`);

 return message.send(`
Информация о Вашем заводе:

` + 
(user.zalmazi == true ? `Бизнес производит: Алмазы` : `Бизнес производит: Сундуки`)+

`
Работников: ${user.rabotnik}
` + 
(user.zalmazi == true ? `Алмазов: ${user.zpalmaz}` : `Сундуков: ${user.zpsundik}`)+

`
 		`)

});



// биииииииизнес

 vk.updates.hear(/^(?:Бизнес снять)\s?([0-9]+)?/i, message => {
 	 let user = acc.users[user_id(message.user)];
 	 if(!message.$match[1]) return message.send(`[❓] >> Введи число, которое хотите снять.`)
 	 if(user.bizs.bize == false) return message.send(`[❌] >> Вы не имеете бизнес.`)
 	 if(message.$match[1] > user.bizs.money) return message.send(`[❌] >> На Вашем счету бизнеса не достаточно средств.`)
     user.balance += Number(message.$match[1]);
     user.bizs.money -= Number(message.$match[1]);
     return message.send(`[✅] >> Вы сняли со счета бизнеса: ${message.$match[1]}$`)
     }); 

//------------------- СИСТЕМА ТЕЛЕФОНА БЛЯТЬ ----------------------------
	vk.updates.hear(/^(?:телефоны)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]){
			return message.send(`
[1⃣] » Номер: 1
⠀⠀[📱] » Модель: Samsung GALAXY S8
⠀⠀[💰] » Цена: 3.000$

[2⃣] » Номер: 2
⠀⠀[📱] » Модель: Xiaomi Mi 8
⠀⠀[💰] » Цена: 9.000$

[3⃣] » Номер: 3
⠀⠀[📱] » Модель: Honor 9 Lite
⠀⠀[💰] » Цена: 15.000$

[4⃣] » Номер: 4
⠀⠀[📱] » Модель: Huawei p20
⠀⠀[💰] » Цена: 30.000$

[5⃣] » Номер: 5
⠀⠀[📱] » Модель: Asus ZenFone Max Pro M1
⠀⠀[💰] » Цена: 45.000$

[6⃣] » Номер: 6
⠀⠀[📱] » Модель: Iphone X
⠀⠀[💰] » Цена: 60.000$
		 
			
			[❓] >> Чтобы купить, напишите: Телефоны [номер]
			[❔] >> Чтобы продать, напишите: 'Мобила Продать'. 

			[❗] >> Напишите 'SMS [Номер] [Text]', чтобы написать сообщение..
			`)
		}
	let i = message.$match[1]; 
 	let count = [0, 3000,9000,15000,30000,45000,60000];
 	let names = [0, 'Samsung GALAXY S8','Xiaomi Mi 8','Honor 9 Lite','Huawei p20','Asus Max Pro M1','Iphone X']
 	if(i < 0 || i > 6) return message.send(`[❌] >> Телефона под таким номером нет.`);
 	if(user.mobile != false) return message.send(`[❓] >> У Вас уже имеется телефон.\n\n[❔] >> Ваш телефон: ${user.mobile}`);
 	if(i > 0 && i <= 6){
 		if(user.balance < count[i]) return message.send(`[❌] >> У вас не достаточно средств.`);
 		user.balance -= count[i]; 
 		user.mobile = names[i]; 
 		return message.send(`[✅] >> Телефон <<${names[i]}>> куплен\n\n[💲] >> Вы заплатили ${count[i]}$`)
 	} 
 }); 


	  vk.updates.hear(/^(?:Мобила продать)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.mobile == false) return message.send(`[❌] >> Вы не имеете телефона.`);
    if(user.mobile == `Samsung GALAXY S8`){
    user.mobile = false
    user.balance += 1500
    return message.send(`[✅] >> Телефон продан за 1.500$`)  
    }
    if(user.mobile == `Xiaomi Mi 8`){
    user.mobile = false
    user.balance += 4500
    return message.send(`[✅] >> Телефон продан за 4.500$`)  
    }
    if(user.mobile == `Honor 9 Lite`){
    user.mobile = false
    user.balance += 7500
    return message.send(`[✅] >> Телефон продан за 7.500$`)  
    }
    if(user.mobile == `Huawei p20`){
    user.mobile = false
    user.balance += 15000
    return message.send(`[✅] >> Телефон продан за 15.000$`)  
    }
    if(user.mobile == `Asus Max Pro M1`){
    user.mobile = false
    user.balance += 22500
    return message.send(`[✅] >> Телефон продан за 22.500$`)  
    }
    if(user.mobile == `Iphone X`){
    user.mobile = false
    user.balance += 30000
    return message.send(`[✅] >> Телефон продан за 30.000$`)  
    }
 });
//-----------------------------------------------------------------------

 

	vk.updates.hear(/^(?:Репорт)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.isChat) return message.send(`[❗] >> Только в личных сообщениях бота`)
		if(!message.$match[1]) return message.send(`[❗] >> Некорректно. Введите: 'Репорт [Text]`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 1){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					random_id: 0,
					message: `[👮] » [REPORT++ ]\n\n[👑] » Отправитель: @id${message.senderId}(${user.prefix})\n[🆔] » ID отправителя: ${user_id(message.user)}\n\n[📝] » Текст: ${message.$match[1]}\n\n[❓] » Для ответа: Otvet ID TEXT`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`[❗] >> Вопрос/жалоба успешно отправлен/а!`);
	});

 
	vk.updates.hear(/^(?:Otvet)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 1) return message.send(`я ебааааааал`);
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`[❓] >> Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			random_id: 0,
			message: `[🕵] » Администратор: @id${message.senderId}(${user.prefix}) ответил Вам\n[➡] >> Ответ: ${message.$match[2]}\n\n[❓] » Приятной игры!`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		return message.send(`[📢] >> Ответ на репорт отправлен.`)
	});


	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`[❓] >> Пример команды: Ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`[❌] >> Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`[❌] >> Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`[❌] >> Данного игрока нет в базе данных`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			random_id: 0,
			message: `[✅] >> Администратор @id${message.senderId}(${user.prefix}) выдал Вам бан навсегда\n[📃] >> Причина: ${message.$match[2]}`
		});

		return message.send(`[✅] >> Вы заблокировали игрока ${acc.users[message.$match[1]].prefix} навсегда.\n[✅] >> Причина: ${message.$match[2]}`);
	}); 
 
vk.updates.hear(/^(?:Sosi)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`[❓] >> Пример команды: Sosi [ID]`);
if(!Number(message.$match[1])) return message.send(`[❌] >> Число должно быть цифрового вида.`);
if(user.level < 1) return message.send(`[❌] >> Вы не администратор`);
if(!acc.users[message.$match[1]]) return message.send(`[❌] >> Данного игрока нет в базе данных`);

acc.users[message.$match[1]].ban = false; 
vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		random_id: 0,
		message: `[✅] >> Администратор @id${message.senderId}(${user.prefix}) разблокировал Вас`
	});
		return message.send(`[✅] >> Вы разблокировали игрока ${acc.users[message.$match[1]].prefix}`);

});

vk.updates.hear(/^(?:Addpromo)\s?([^]+)?\s([0-9]+)?\s([0-9]+)?\s([0-9]+)?/i, (message) => { 
    let user = acc.users[user_id(message.user)];
    if(user.level < 1) return message.send(`Доступно только Администратору.`)
    if(!message.$match[1] || !message.$match[2] || !message.$match[3] || !message.$match[4]) return message.send(`[❓] >> Пример команды: Addpromo [Promo] [Кол-во активаций] [Награда] [Кол-во дней]`)
    if(promo[message.$match[1]]) return message.send(`[❓] >> Данный промокод уже существет`)
 
    promo[message.$match[1]] = {
       activate: Number(message.$match[2]),
       prize: Number(message.$match[3]),
       dney: Number(message.$match[4]),
       users: {}  
    }
    return message.send(`[✅] >> Промокод ${message.$match[1]} создан:\n\n[❓] >> Кол-во активаций: ${message.$match[2]}\n[💰] >> Награда: ${message.$match[3]}$\n\n[⌛] >> Доступен дней: ${message.$match[4]}`)
});

vk.updates.hear(/^(?:Промокод)\s?([^]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!promo[message.$match[1]]) return message.send(`[❓] >> Данного промокода не существует`)
	    if(!message.$match[1]) return message.send(`[❓] >> Пример команды: Промокод [Promo]`)

if(promo[message.$match[1]].users[message.senderId]) return message.send(`[❓] >> Данный промокод уже активирован Вами.`)
promo[message.$match[1]].users[message.senderId] = {
}

promo[message.$match[1]].activate -= 1;
user.balance += promo[message.$match[1]].prize
message.send(`[✅] >> Промокод успешно введен.\n\n[💰] >> Вы получили: ${promo[message.$match[1]].prize}$`)
if(promo[message.$match[1]].activate == 0) delete promo[message.$match[1]];
return

});

//////////////////////////////}
vk.updates.hear(/^(?:лгбт)/i,  (message) => { 
delete uid[message.senderId]
delete acc.users[user_id(message.user)]

return message.send(`Ваш аккаунт удален за тупое слово`)
});
/////
vk.updates.hear(/^(?:баланс)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		[💴] >> На Ваших руках: ${spaces(user.balance)}`)

});

vk.updates.hear(/^(?:аааааааааааааааааааааааааааааааааааа)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
let hui = Number(message.$match[1]) + user.balance 
return message.send(`хм ${Number(hui)}`)
});

// -------------------------------- ПОПИТЬ -------------------
vk.updates.hear(/^(?:попить)/i,  (message) => {
 	let user = acc.users[user_id(message.user)];
    let as = 1 - user.balance
 	if(user.balance < 1) return message.send(`[❌] >> Не достаточно средств!`)
 	if(user.voda >= 70) return message.send(`[🙅‍♂] >> Вы не хотите пить!`)
 		let voda = rand(1,30)
 		user.balance -= 10
 	    user.voda += (voda);
 	    return message.send(`[👌] >> Вы купили "Колу" за 10$\n[🍵] >> Жажда повысилась на ${voda}%\n\n[✅] >> Спасибо за покупку!`)
 });
//------------------------------------------------------------

//-------------------------------- ПОКУШАТЬ -----------------
vk.updates.hear(/^(?:ПОКУШАТЬ|перекусить)/i,  (message) => {
 	let user = acc.users[user_id(message.user)];
 	if(user.balance < 1) return message.send(`[❌] >> Не достаточно средств!`)
 	if(user.voda >= 70) return message.send(`[🙅‍♂] >> Вы не хотите кушать!`)
 	let eda = rand(1,30)
 		user.balance -= 1
 	    user.golod += (eda);
 	    return message.send(`[👌] >> Вы купили "Бургер" за 1$\n[🍵] >> Сытность повысилась на: ${eda}%\n\n[✅] >> Спасибо за покупку!`)
 });
//-----------------------------------------------------------

vk.updates.hear(/^(?:Паспорт)/i,  (message) => {

	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';

	if(!message.$match[1]){
		return message.send(`
${user.prefix}, твоя информация!

[👤] » Игровой ID: ${user_id(message.user)}
[🗣] » Кличка: ${user.prefix}
[🤕] » Репутация: 100

` + 
(user.perm53 > 0 || user.perm4 == false ? `[🚼] >> Класс: ${user.perm53}` : ``)+

`
` + 
(user.perm55 != user.perm56 || user.perm4 != false ? `[💡] >> Учится на: ${user.perm54}\n[💾] >> Курс: ${user.perm55}` : ``)+

`

` + 
(user.job.name == 'Врач' || user.job.name == 'Программист' || user.job.name == 'Юрист' || user.job.name == 'Менеджер' || user.job.name == 'Эколог' ? `[👩‍💻] >> Работа: ${user.job.name}` : ``)+

`

` + 
(user.job.name != 'Врач' && user.job.name != 'Программист' && user.job.name != 'Юрист' && user.job.name != 'Менеджер' && user.job.name != 'Эколог' && user.job.name != false ? `[👨‍💼] >> Подработка: ${user.job.name}` : ``)+

`

[⌛] >> Лет в городе: ${user.lvl}
[⏱] >> Опыт: ${user.exs} / ${user.exsup}

` + 
(user.brak != false ? `[👫] >> Вторая половинка: ${acc.users[user.brak].prefix}\n` : ``)+

`

` + 
(user.bizs.bize != false ? `[🏭] >> Бизнес:\n⠀⠀[🏢] >> Название: ${user.bizs.bize}\n` : ``)+

`
` + 
(user.house != false || user.cars != false || user.mobile != false ? `[🌃] >> Имущество:\n` : ``)+

`` +
(user.house != false ? `⠀⠀[🏡] >> Дом:  ${user.house}\n` : ``)+
(user.cars != false ? `⠀⠀[🚘] >> Автомобиль: ${user.cars}\n` : ``)+
(user.mobile != false ? `⠀⠀[📱] >> Телефон: ${user.mobile}\n` : ``)+      

		`
[💲] » Баланс: ${spaces(user.balance)}$
[💳] » В банке: ${user.bank}$

[🍖] » Голод: ${user.golod}%
[🍹] » Жажда: ${user.voda}%

` + 
(user.level >= 1 ? `[🤴] >> Администратор` : ``)+

`
` + 
(user.perm50 == true ? `[👑] >> Тестер` : ``)+

`

			`);
		}
	 
});



	vk.updates.hear(/^eval\s([^]+)/i, (message) => {  
		if (message.user == 230200017) {
			return message.send(`Вы изменили переменную на: ${eval(message.$match[1])}`);
		}
	});
 

	// --------------------------- СИСТЕМА БЕНЗИНА ------------------------------
	  	vk.updates.hear(/^(?:Заправка)$/i,  (message) => {
	    let user = acc.users[user_id(message.user)];
	    user.fuelp = true;
	    return message.send(`[⛽] >> Вы подъехали к заправке\n[💲] >> Цена за 1 литр - 30$\n\n[❓] >> Чтобы купить, напишите 'Заправить [Кол-во]`)
	    }); 
 	
 	vk.updates.hear(/^(?:заправить)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	let bens = message.$match[1] * 30
 	if(user.fuelp == false) return message.send(`[🚗] >> Вы не около заправки.\n\n[❓] >> Напишите 'Заправка`)
 	if(message.$match[1] > 100) return message.send(`[❌] >> Нельзя покупать более 100 литров бензина.`)
 	if(user.cars == false) return message.send(`[🏎] >> Вы не имеете транспорт.`)
 	if(user.fuel >= 100) return message.send(`[⛽] >> У Вас полный бак бензина.`)	
 	if(user.balance < bens) return message.send(`[❌] >> На Вашем счету не хватает средств.`)
 	user.balance -= bens;
    user.fuelp = false
    user.fuel += message.$match[1];
 	return message.send(`[⛽] >> Вы купили ${message.$match[1]} литров бензина\n\n[💲] >> Вы заплатили: ${spaces(bens)}`)	
 	});

 	vk.updates.hear(/^(?:Номер)\s?([0-9]+)?/i, message => {		
 		let id = user_id(message.user)
	    let user = acc.users[user_id(message.user)];
	    let args =  message.$match[1];
	    if(user.nomer != false) return message.send(`[❌] >> У Вас уже есть номер.`)
	    if(user.mobile == false) return message.send(`[❌] >> Чтобы купить номер, нужен телефон\n\n[📞] >> Купите его в магазине`)	
	    if(telephon[args]) return message.send(`[❌] >> Данный уже номер используется. Выберите другой`);
	    if(user.balance < 1000) return message.send(`[❌] >> Вам не хватает средств на покупку\n\n[❓] >> Номер телефона стоит 1000$`)
		if(message.$match[1].length < 7) return message.send(`[❌] >> Минимальная длина номера: 7 цифр.`);
		if(message.$match[1].length > 7) return message.send(`[❌] >> Максимальная длина номера: 7 цифр.`);



	    user.nomer = message.$match[1];
	    user.balance -= 1000;
		
		telephon[args] = {
			number: message.$match[1]
		}
return message.send(`[✅]>> Ваш новый номер: ${message.$match[1]}`)
});

	  vk.updates.hear(/^(?:Телефон)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.mobile == false) return message.send(`[📞] >> Вы не имеете номера телефона `) 
	return message.send(`[☎] » Марка телефона: ${user.mobile}
⠀⠀[🔤] » Номер: ${user.nomer}
⠀⠀[💰] » Баланс: 0$
	`);
});

	  vk.updates.hear(/^(?:Тменю)/i,  (message) => {
	  let user = acc.users[user_id(message.user)];
	  return message.send(`
     Команды телефона:

     [💬] >> "SMS [Номер] [Text]" - Написать сообщение
     [📱] >> "Телефон" - узнать информацию о телефоне
     [ℹ] >> "Номер [Номер]" - создать свой номер.

     [📞] >> "Телефоны" - купить телефон 
	  	`)

	});



	vk.updates.hear(/^(?:sms)\s?([0-9]+)?\s([^]+)?/i, (message) => { 		
		let user = acc.users[user_id(message.user)];
		let sya = user.nomer;
		if(!message.$match[1]) return message.send(`[❗] >> Некорректно. Введите: 'Sms [Номер] [Text]`);
		if(message.$match[2] == sya) return message.send(`[👤] >> Нельзя писать SMS на свой номер.`)
		if(user.nomer == false) return message.send(`[❌] >> У Вас нет номера телефона\n\n[❓] >> Купите его в магазине`)	
		if(!message.$match[2]) return message.send(`[❗] >> Некорректно. Введите: 'Sms [Номер] [Text]`);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].nomer == message.$match[1]){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					random_id: 0,
					message: `[🔔] >> Новое сообщение\n\n[👤] >> Отправитель: +7${user.nomer}\n[💬] >> Сообщение: ${message.$match[2]}`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`[✅] >> Сообщение отправлено по номеру +7${message.$match[1]}`);
	});

 vk.updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
 [🏢] >> Дома для покупки:


[1⃣] » Место жительства: Мусорка
⠀⠀[💲] » Цена: 7.000$

[2⃣] » Место жительства: Коробка
⠀⠀[💲] » Цена: 30.000$

[3⃣] » Место жительства: Холодильник
⠀⠀[💲] » Цена: 70.000$

[4⃣] » Место жительства: Дом
⠀⠀[💲] » Цена: 110.000$

[5⃣] » Место жительства: Коттедж
⠀⠀[💲] » Цена: 200.000$

[6⃣] » Место жительства: Особняк
⠀⠀[💲] » Цена: 350.000$

           [❓] >> Чтобы купить дом, напишите "Дома [Номер]"
           [❔] >> Чтобы продать дом, напишите "Продать дом"

 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 7000,30000,70000,110000,200000,350000];
 	let names = [0, 'Мусорка','Коробка','Холодильник','Дом','Коттедж','Особняк']
 	if(i < 0 || i > 7) return message.send(`[❓] >> Такого дома в списке нет.`);
 	if(user.house != false) return message.send(`[🏡] >> Вы уже где-то живете.\n\n[❓] >> Ваш дом: ${user.house}`);
 	if(i > 0 && i <= 6){
 		if(user.balance < count[i]) return message.send(`[❌] >> У Вас недостаточно средств.`);
 		user.balance -= count[i];
 		user.house = names[i];
 		return message.send(`[✅] >> Дом ${names[i]} успешно куплен!`)
 	}
 });

vk.updates.hear(/^(?:Работать)/i, message => {
let user = acc.users[user_id(message.user)];
let pisya = rand(7000, 14000)
let hui = rand(2, 7)
if(user.bloks.giverub == true) return message.send(`[❌] >> Работать можно не чаще, чем 1 раз в день.`)
if(user.job.name == 'Врач'){
	user.balance += pisyaЪ
	user.blocks.giverub = true
	return message.send(`[💲] >> За рабочий день Вы вылечили ${hui} людей и получили зарплату в размере ${pisya}$!`)
}
if(user.job.name == 'Программист'){
	user.balance += pisya
	user.blocks.giverub = true
	return message.send(`[💲] >> За рабочий день Вы написали ${hui} программ и получили зарплату в размере ${pisya}$!`)
}
if(user.job.name == 'Юрист'){
	user.balance += pisya
	user.blocks.giverub = true
	return message.send(`[💲] >> Вы защитили ${hui} человек и получили зарплату в размере ${pisya}$!`)
}
if(user.job.name == 'Юрист'){
	user.balance += pisya
	user.blocks.giverub = true
	return message.send(`[💲] >> Вы защитили ${hui} растений и получили зарплату в размере ${pisya}$!`)
}
return message.send(`[❌] >> Вы нигде не работаете.`)
});

  vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`[❌] >> Вы нигде не живете.`);
    if(user.house == `Мусорка`){
    user.house = false
    user.balance += 3500
    return message.send(`[✅] >> Дом продан за 3.500$`)  
    }
    if(user.house == `Коробка`){
    user.house = false
    user.balance += 15000
    return message.send(`[✅] >> Дом продан за 15.000$`)  
    }
    if(user.house == `Холодильник`){
    user.house = false
    user.balance += 35000
    return message.send(`[✅] >> Дом продан за 35.000$`)  
    }
    if(user.house == `Дом`){
    user.house = false
    user.balance += 55000
    return message.send(`[✅] >> Дом продан за 55.000$`)  
    }
    if(user.house == `Коттедж`){
    user.house = false
    user.balance += 100000
    return message.send(`[✅] >> Дом продан за 100.000$`)  
    }
    if(user.house == `Коттедж`){
    user.house = false
    user.balance += 175000
    return message.send(`[✅] >> Дом продан за 175.000$`)  
    }
 });

vk.updates.hear(/^(?:работы)\s?([0-9]+)?/i, message => {
if(!message.$match[1]){
let user = acc.users[user_id(message.user)];
 		return message.send(`
${user.prefix}, доступные подработки:  
			

[💊] >> 1. Врач
[👾] >> 2. Программист
[📝] >> 3. Юрист
[📒] >> 4. Менеджер
[🌿] >> 5. Эколог

[❓] >> Чтобы устроиться, напишите: "Работы [Номер]"

[🔰] >> Чтобы работать, напишите "Работать"
[❔] >> Для увольния, введите: "уволиться"
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 0) return message.send(`[👨‍] >> Устроиться на работу можно имея 0 уровень\n💳 | Ваш уровень [${user.lvl}]`);
 	let jsa = [0, 'Врач','Программист','Юрист','Менеджер','Эколог']
 	if(i <= 0 || i > 5) return;
 	if(user.job.name != false) return message.send(`[❌] >> Вы уже где-то работаете!`);
 	if(i > 0 && i <= 7){
 	if(user.perm54 != jsa[i]) return message.send(`[❓] >> Для начала отучитесь на ${jsa[i]}а.`)	
 		user.job.name = names[i];
 		return message.send(`[ℹ️] >> Вас приняли ${names[i]}ом\n\n[🕰] >> Для работы, напишите "Работать" `)
 	}  
});

 vk.updates.hear(/^(?:подработка)\s?([0-9]+)?/i, message => { 
 	if(!message.$match[1]){
 	let user = acc.users[user_id(message.user)];
 		return message.send(`
${user.prefix}, доступные подработки:  
			

[🍁] >> 1. Дворник - [1 lvl]
[⛔] >> 2. Охранник - [2 lvl]
[💡] >> 3. Консультант - [3 lvl]
[💻] >> 4. Кассир - [4 lvl]
[💼] >> 5. Директор магазина - [5 lvl]
[🏤] >> 6. Владелец ТЦ - [6 lvl]

            [❓] >> Чтобы устроиться, напишите: 'Подработка [Номер]'

            [🔰] >> Для подробной информации, напишите название подработки
		    [❔] >> Для увольния, введите: "уволиться"
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 0) return message.send(`[👨‍] >> Устроиться на работу можно имея 0 уровень\n💳 | Ваш уровень [${user.lvl}]`);
 	let names = [0, 'Дворник','Охранник','Консультант','Кассир','Директор Магазина','Владелец ТЦ']
 	let staj = [0,1,2,3,4,5,6]
 	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000,100000]
 	if(i <= 0 || i > 7) return;
 	if(user.job.name != false) return message.send(`[❌] >> Вы уже где-то работаете!`);
 	if(i > 0 && i <= 7){
 		if(user.lvl < staj[i]) return message.send(`[🕰] >> Вы слишком мало жили в городе.`)
 		user.job.name = names[i];
 		return message.send(`[ℹ️] >> Вы стали устроились на подработку <<${user.job.name}>>!\n\n[🕰] >> Чтобы узнать, как работать , напишите "${user.job.name}!" `)
 	} 
 });

  vk.updates.hear(/^(?:уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`[ℹ] >> Вы безработный.`);
 	user.job.name = false;
 	user.job.count = 0;
 	user.perm2 = 0; 
 	return message.send(`[ℹ] >> Вы уволились со своей работы/подработки!`);
 });


	vk.updates.hear(/^(?:банк)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`
			[💶] >> Банковский счет: ${spaces(user.bank)}$

			[⤴] >> Курс внутреигровых валют:
           ⠀⠀[🔋] >> Биткоин: ${acc.bit}
           ⠀⠀[💡] >> Лайткоин: ${acc.lite}
           ⠀⠀[⚒] >> ESO: ${acc.eso}
           ⠀⠀[📡] >> EOS: ${acc.eos} 
			`);
	});

/* vk.updates.hear(/^(?:кредит)\s?([0-9]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.kredit != 0) return message.send(`[❗] >> У Вас не погашен старый кредит\n\n [💲] >> Сумма к погашению: ${spaces(user.kredit)}$\n[❓] >> Чтобы погасить кредит, напишите 'Погасить'`);
	if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`[💶] >> Укажите сумму кредита.`);
    if(message.$match[1] < 10000 || message.$match[1] > 1000000) return message.send(`[💶] >> Нельзя брать меньше 10.000$\n[💳] >> Нельзя брать больше 1.000.000$`);
    user.balance += Number(message.$match[1]);
    let dolg = Number(message.$match[1]) / 100 * 15;
    dolg += Number(message.$match[1]);
    user.kredit = Number(dolg);
	user.proc = Number(message.$match[1] / 100 * 15);

	return message.send(`
			[✅] >> Вам одобрили кредит на сумму: ${spaces(message.$match[1])}$
			[❗] >> К погашению: ${spaces(dolg)}$
			
			[❓] >> Каждый час будет списано: ${spaces(message.$match[1] / 100 * 15)}$`);
}); */

//-------------- УРА ПРАВА ПРАВА ПРАВА --------------
 vk.updates.hear(/^(?:Сдача прав)/i, message => {
 		let user = acc.users[user_id(message.user)];
 		if(user.prava == true) return message.send(`[🙅‍♂] >> У Вас уже имеются права.`)
 		if(user.balance < 5000) return message.send(`[❌] >> у Вас недостаточно средств.`)
 		if(user.pravaprov == true) return message.send(`[🙅‍♂] >> Вы уже сдаете на права.`)	
 		user.pravaprov = true;
 	    user.balance -= 5000;
 		return message.send(`
 			[❓] >> В каком случае Вы совершите вынужденную остановку?

 			[1⃣] >> Остановившись непосредственно перед пешеходным переходом, чтобы уступить дорогу пешеходу.
 			[2⃣] >> Остановившись на проезжей части из-за технической неисправности транспортного средства.
 			[3⃣] >> В обоих перечисленных случаях.

 			[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'
 			[❗] >> 3 ошибки - завал
 
 			`)
 	});
//------------------------------------------------------- ТАКСОВАТЬ -----------------------------------------
 vk.updates.hear(/^(?:Таксовать)/i, message => {
 	 let user = acc.users[user_id(message.user)];
 	 let pass = rand(5,8)
 	 let tar = rand(80,100)
 	 let itog = tar * pass
 	 if(user.cars == false) return message.send(`[🚕] >> Вы не имеете автомобиля.`)
 	 if(user.fuel <= 0) return message.send(`[❌] >> Ваш бензин на нуле`)	
 	 if(user.dvig == false) return message.send(`[🅰] >> Заведите двигатель\n\n[❓] >> Используйте командой: 'Завести'`)	
 	 if(user.bloks.taxi == true) return message.send(`[❌] >> Таксовать можно раз в час`)	
 	 user.balance += Number(itog)
 	 user.bloks.taxi = true;
 	 setTimeout(() => {
				user.bloks.taxi = false;
			}, 3600000);

 	 return message.send(`[✅] >> Вы подвезли ${pass} пассажиров по тарифу ${tar}$\n\n[💲] >> Всего Вы получили: ${itog}$`)
 	});

 vk.updates.hear(/^(?:Завести)/i, message => {
 let user = acc.users[user_id(message.user)];
if(user.cars == false) return message.send(`[🚕] >> Вы не имеете автомобиля.`)
user.dvig = true;
return message.send(`[✅] >> Вы успешно завели двигатель\n\n[❓] >> Еслли двигатель включен, каждый час убдет отнимать -3% бензина\n[❔] >> Чтобы заглушить, введите 'Заглушить'`)
});

 vk.updates.hear(/^(?:Заглушить)/i, message => {
 let user = acc.users[user_id(message.user)];
if(user.cars == false) return message.send(`[🚕] >> Вы не имеете автомобиля.`)
user.dvig = false;
return message.send(`[✅] >> Вы заглушили двигатель`)
});
//------------------------------------------------------- БОНУС ЕПТА ---------------------------------------
 vk.updates.hear(/^(?:Бонус)/i, message => {
 	 		let user = acc.users[user_id(message.user)];
 	 		let summi = rand(50,600)
 	 		if(user.bloks.bonis == true) return message.send(`[⌛] >> Вы можете забрать бонус через день`)
 	 	
 	 		setTimeout(() => {
				user.bloks.bonis = false;
			}, 86400000);

			user.bloks.bonis = true;
            user.balance += (summi);

            return message.send(`[🎁] >> Бонус в размере ${summi}$ получен.`)

 	 	});

 vk.updates.hear(/^(?:Ответ)\s?([0-9]+)?/i, (message) => { 
        let user = acc.users[user_id(message.user)]
        if(user.prava == true) return message.send(`[🙅‍♂] >> У Вас уже имеются права!`)
        if(user.pravaprov == false) return message.send(`[❗] >> Сначала напишите 'Сдача прав'`)
        if(user.pravs == 0){
        	if(message.$match[1] == 2){
               user.pravse += 1;
               user.pravs += 1;
               return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что означает мигание зеленого сигнала светофора?\n\n[1⃣] >> Предупреждает о неисправности светофора.\n[2⃣] >> Разрешает движение и информирует о том, что вскоре будет включен запрещающий сигнал.\n[3⃣] >> Запрещает дальнейшее движение.\n\n[❔] >> Чтобы ответит, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 1){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что означает мигание зеленого сигнала светофора?\n\n[1⃣] >> Предупреждает о неисправности светофора.\n[2⃣] >> Разрешает движение и информирует о том, что вскоре будет включен запрещающий сигнал.\n[3⃣] >> Запрещает дальнейшее движение.\n\n[❔] >> Чтобы ответит, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 3){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что означает мигание зеленого сигнала светофора?\n\n[1⃣] >> Предупреждает о неисправности светофора.\n[2⃣] >> Разрешает движение и информирует о том, что вскоре будет включен запрещающий сигнал.\n[3⃣] >> Запрещает дальнейшее движение.\n\n[❔] >> Чтобы ответит, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        }
        if(user.pravs == 1){
        	if(message.$match[1] == 2){
               user.pravse += 1;
               user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Водитель обязан подавать сигналы световыми указателями поворота (рукой):\n\n[1⃣] >> Перед началом движения или перестроением.\n[2⃣] >> Перед поворотом или разворотом.\n[3⃣] >> Во всех перечисленных случаях\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 1){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Водитель обязан подавать сигналы световыми указателями поворота (рукой):\n\n[1⃣] >> Перед началом движения или перестроением.\n[2⃣] >> Перед поворотом или разворотом.\n[3⃣] >> Во всех перечисленных случаях\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 3){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Водитель обязан подавать сигналы световыми указателями поворота (рукой):\n\n[1⃣] >> Перед началом движения или перестроением.\n[2⃣] >> Перед поворотом или разворотом.\n[3⃣] >> Во всех перечисленных случаях\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        }
        if(user.pravs == 2){
        	if(message.$match[1] == 2){
               user.pravse += 0;
               user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> При какой неисправности разрешается эксплуатация транспортного средства?\n\n[1⃣] >> Не работают пробки топливных баков.\n[2⃣] >> Не работает стеклоподъемник.\n[3⃣] >> Не работают устройства обогрева и обдува стекол.\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 1){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> При какой неисправности разрешается эксплуатация транспортного средства?\n\n[1⃣] >> Не работают пробки топливных баков.\n[2⃣] >> Не работает стеклоподъемник.\n[3⃣] >> Не работают устройства обогрева и обдува стекол.\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 3){
        		user.pravse += 1;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> При какой неисправности разрешается эксплуатация транспортного средства?\n\n[1⃣] >> Не работают пробки топливных баков.\n[2⃣] >> Не работает стеклоподъемник.\n[3⃣] >> Не работают устройства обогрева и обдува стекол.\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        }
        if(user.pravs == 3){
        	if(message.$match[1] == 2){
               user.pravse += 1;
               user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что понимается под временем реакции водителя?\n\n[1⃣] >> Время с момента обнаружения водителем опасности до полной остановки транспортного средства.\n[2⃣] >> Время с момента обнаружения водителем опасности до начала принятия мер по ее избежанию.\n[3⃣] >> Время, необходимое для переноса ноги с педали управления подачей топлива на педаль тормоза..\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 1){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что понимается под временем реакции водителя?\n\n[1⃣] >> Время с момента обнаружения водителем опасности до полной остановки транспортного средства.\n[2⃣] >> Время с момента обнаружения водителем опасности до начала принятия мер по ее избежанию.\n[3⃣] >> Время, необходимое для переноса ноги с педали управления подачей топлива на педаль тормоза..\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        	if(message.$match[1] == 3){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Ответ принят\n\n\n[❓] >> Что понимается под временем реакции водителя?\n\n[1⃣] >> Время с момента обнаружения водителем опасности до полной остановки транспортного средства.\n[2⃣] >> Время с момента обнаружения водителем опасности до начала принятия мер по ее избежанию.\n[3⃣] >> Время, необходимое для переноса ноги с педали управления подачей топлива на педаль тормоза..\n\n[❔] >> Чтобы ответить, напишите 'Ответ [Номер]'\n[❗] >> 3 ошибки - завал`)
        	}
        }
        if(user.pravs == 4){
        	if(message.$match[1] == 2){
               user.pravse += 1;
               user.pravs += 1;
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        	if(message.$match[1] == 1){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        	if(message.$match[1] == 3){
        		user.pravse += 0;
        		user.pravs += 1;
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        }
         if(user.pravs >= 4){
        	if(message.$match[1] == 2){
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        	if(message.$match[1] == 1){
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        	if(message.$match[1] == 3){
        		return message.send(`[✅] >> Вы ответили на все вопросы\n[❓] >> Напишите 'Проверить', чтобы узнать результаты`)
        	}
        }

    });

  	vk.updates.hear(/^(?:Проверить)$/i,  (message) => {
 	 let user = acc.users[user_id(message.user)];
 	 if(user.prava == true) return message.send(`[🙅‍♂] >> У Вас уже имеются права.`);
 	 if(user.pravs < 5) return message.send(`[🙅‍♂] >> Вы ответили не на все вопросы.`);
 	 if(user.pravse >= 2){
 	 	user.prava = true;
 	 	return message.send(`[🅰] >> Вы получили права!\n\n[❓] >> Вы ответили правильно на ${user.pravse} из 4 вопросов`);
 	 } 
 	 if(user.pravse < 2){
 	  message.send(`[😥] >> Вы не получили права!\n\n[❓] >> Вы ответили правильно на ${user.pravse} из 4 вопросов`);
 	  user.pravs = 0;
 	  user.pravse = 0;
 	  pravaprov = false;
 	}
 	
 	 }); 

vk.updates.hear(/^(?:Кирки)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
let bina = message.$match[1] * 400
if(!Number(message.$match[1])) return
if(user.balance < bina)	return message.send(`[❌] >> Не хватает денег\n[❓] >> Одна кирка стоит 400$`)
user.balance -= Number(bina)
user.kirka += Number(message.$match[1])
return message.send(`[✅] >> Куплено ${message.$match[1]} кирки\n[❓] >> Вы заплатили ${bina}$`)	
});
 // --------------------------- ШАХТА ЕПТА -------------------------------
  	vk.updates.hear(/^(?:Шахта копать)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    if(user.perm49 == false) return message.send(`[❌] >> Вы не в локации <<Шахта>>\n\n[❓] >> Подсказка: Локация обычная шахта\n[❓] >> Подсказка: Локация большая шахта`)
    if(user.shaht >= 10) return message.send(`[❌] >> Копать в шахте можно 10 раз в день.`)
    if(user.kirka <= 0) return message.send(`[❌] >> У Вас закончились кирки\n[❓] >> Подсказа: Кирки [Кол-во]`)	
    if(user.golod <= 0) return message.send(`[🍗] >> Вы хотите кушать..`)
    if(user.voda <= 0) return message.send(`[🍸] >> Вы хотите пить..`)
    let resurs = rand(10,50) // Железо. Обычная шахта
    let resurs2 = rand(10, 30) // Золото. Обычная шахта
    let resurs3 = rand (7, 20) // Алмазы. Обычная шахта
    let wet = [1, 2, 3, 4, 5, 6, 7, 8].random() // Шансы на ресы. Обычная шахта 
    let wet1 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4].random()
    let resurs4 = rand(15, 65) // Железо. Большая шахта
    let resurs5 = rand(15, 45) // Золото. Большая шахта
    let resurs6 = rand(10, 30) // Алмазы. Большая шахта
    if(user.perm49 == `Обычная шахта`){
    if(wet == 2){
    	user.zolot += resurs2
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs} золота\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 8){
    	user.zolot += resurs2
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs2} золота\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 3){
    	user.almaz += resurs3
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs3} алмазов\n[❓] >> Подсказа: Ресурсы`)
    }
     if(wet == 4){
    	user.zhelez += resurs
    	user.kirka -= 1
    	user.shaht += 1
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs} железа\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 5){
    	user.zhelez += resurs
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs} железа\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 6){
    	user.zhelez += resurs
    	user.shaht += 1
    	user.golod -= 3
    	user.kirka -= 1
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs} железа\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 7){
    	user.zhelez += resurs
    	user.shaht += 1
    	user.golod -= 3
    	user.kirka -= 1
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs} железа\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet == 1){
    	user.shaht += 1
    	user.golod -= 3
    	user.kirka -= 1
    	user.voda -= 2
    	return message.send(`[⛏] >> В шахте Вам ничего не попалось..`)
    }
}
if(user.perm49 == `Большая шахта`){
    if(wet1 == 1){
    	user.zolot += resurs4
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs4} железа\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet1 == 2){
    	user.zhelez += resurs5
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs5} золота\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet1 == 3){
    	user.almaz += resurs6
    	user.shaht += 1
    	user.kirka -= 1
    	user.golod -= 3
    	user.voda -= 2
    	return message.send(`[⛏] >> Вы откопали в шахте ${resurs6} алмазов\n[❓] >> Подсказа: Ресурсы`)
    }
    if(wet1 == 4){
    	user.shaht += 1
    	user.golod -= 3
    	user.kirka -= 1
    	user.voda -= 2
    	return message.send(`[⛏] >> В шахте Вам ничего не попалось..`)
    }
}
});
 //------------------------------------------------------------------------

 //----------------------- ПРОСМОТР РЕСУРСОВ --------------------------
  	vk.updates.hear(/^(?:Ресурсы)$/i,  (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`
Ваши ресурсы:

[1⃣] >> Железо: ${user.zhelez}
[2⃣] >> Золото: ${user.zolot}
[3⃣] >> Алмазы: ${user.almaz}

[❓] >> Подсказка: Продать [Ресурс] [Кол-во]

    	`)
});

 //-------------------------------------------------------------------- 


 

vk.updates.hear(/^(?:Продать железо)\s?([0-9]+)?/i, message => {
let zhelez = message.$match[1] * 20
let user = acc.users[user_id(message.user)];
if(user.zhelez < message.$match[1]) return message.send(`[❌] >> У Вас нет столько ресурсов.`)
if(!message.$match[1]) return message.send(`[❌] >> Введите кол-во ресурсов`)

user.zhelez -= message.$match[1]
user.balance += zhelez
return message.send(`[✅] >> Вы успешно продали ${message.$match[1]} железа за ${zhelez}$`)
});

vk.updates.hear(/^(?:Продать золото)\s?([0-9]+)?/i, message => {
let zolot = message.$match[1] * 50
let user = acc.users[user_id(message.user)];
if(!message.$match[1]) return message.send(`[❌] >> Введите кол-во ресурсов`)

if(user.zolot < message.$match[1]) return message.send(`[❌] >> У Вас нет столько ресурсов.`)
user.zolot -= message.$match[1]
user.balance += zolot
return message.send(`[✅] >> Вы успешно продали ${message.$match[1]} золота за ${zolot}$`)
});

vk.updates.hear(/^(?:Продать алмазы)\s?([0-9]+)?/i, message => {
 let almaze = message.$match[1] * 90
let user = acc.users[user_id(message.user)];
if(!message.$match[1]) return message.send(`[❌] >> Введите кол-во ресурсов`)
if(user.almaz < message.$match[1]) return message.send(`[❌] >> У Вас нет столько ресурсов.`)
user.almaz -= message.$match[1]
user.balance += almaze
return message.send(`[✅] >> Вы успешно продали ${message.$match[1]} алмазов за ${almaze}$`)
});
//------------ СИСТЕМА ФЕРМЫ ----------------//
 vk.updates.hear(/^(?:Ферма стата)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.ferma == false) return message.send(`[❗] >> У Вас нет фермы.\n\n[❓] >> Подсказка: Фермы`)
return message.send(`
${user.prefix}, статистика Вашей фермы:

[🔤] >> Название фермы: ${user.ferma}
` + 
(user.ferma == "BitCoinLite" ? `[🔋] >> Производит: 60 биткоин/час` : ``)+
`
` + 
(user.ferma == "LiteCoinEro" ? `[🔋] >> Производит: 60 лайткоин/час` : ``)+
`
` + 
(user.ferma == "EOSLine" ? `[🔋] >> Производит: 60 EOSкоин/час` : ``)+
`
` + 
(user.ferma == "Ethereum" ? `[🔋] >> Производит: 60 ESOкоин/час` : ``)+
`
[⚒] >> Работоспособность фермы: 100%

[🔋] >> Биткоинов: ${user.bitc}
[💡] >> Лайткоинов: ${user.litecoin}
[⚒] >> EOSкоинов: ${user.eos}
[📡] >> ESOкоинов: ${user.eso}
	`)

});
vk.updates.hear(/^(?:Продать биткоины)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!Number(message.$match[1])) return
if(user.bitc < message.$match[1]) return message.send(`[❌] >> У Вас нет столько.`)
let spid = acc.bit * message.$match[1]
user.bitc -= message.$match[1]
user.balance += spid
return message.send(`[✅] >> Вы продали ${message.$match[1]} биткоинов за ${spid}$`)	
});

vk.updates.hear(/^(?:Продать eos)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!Number(message.$match[1])) return
if(user.eos < message.$match[1]) return message.send(`[❌] >> У Вас нет столько.`)
let spid = acc.eos * message.$match[1]
user.eos -= message.$match[1]
user.balance += spid
return message.send(`[✅] >> Вы продали ${message.$match[1]} EOSкоинов за ${spid}$`)	
});

vk.updates.hear(/^(?:Продать eso)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!Number(message.$match[1])) return
if(user.eso < message.$match[1]) return message.send(`[❌] >> У Вас нет столько.`)
let spid = acc.eso * message.$match[1]
user.eso -= message.$match[1]
user.balance += spid
return message.send(`[✅] >> Вы продали ${message.$match[1]} ESOкоинов за ${spid}$`)	
});

vk.updates.hear(/^(?:Продать лайт)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!Number(message.$match[1])) return
if(user.litecoin < message.$match[1]) return message.send(`[❌] >> У Вас нет столько.`)
let spid = acc.lite * message.$match[1]
user.litecoin -= message.$match[1]
user.balance += spid
return message.send(`[✅] >> Вы продали ${message.$match[1]} Лайткоинов за ${spid}$`)	
});

	vk.updates.hear(/^курс/i,  (message) => {  
 return message.send(`
Курс внутреигровых валют:

Биткоин: ${acc.bit}
Лайткоин: ${acc.lite}
ESO: ${acc.eso}
EOS: ${acc.eos}

 		`)
 });

vk.updates.hear(/^(?:Фермы)\s?([0-9]+)?/i, message => {
let user = acc.users[user_id(message.user)];
if(!message.$match[1]){ 
	return message .send(`
[🔤] » Название фермы: Ethereum
⠀⠀[🔋] » Производит: 60 ESOкоин/час
⠀⠀[💰] » Цена: 16.000$

[🔤] » Название фермы: EOSLine
⠀⠀[🔋] » Производит: 60 EOSкоин/час
⠀⠀[💰] » Цена: 27.000$

[🔤] » Название фермы: LiteCoinEro
⠀⠀[🔋] » Производит: 60 Лайткоин/час
⠀⠀[💰] » Цена: 43.000$

[🔤] » Название фермы: BitCoinLite
⠀⠀[🔋] » Производит: 60 Биткоин/час
⠀⠀[💰] » Цена: 65.000$


[❓] >> Чтобы купить, напишите: "Фермы [Номер]"
[❗] >> Чтобы продать, напишите: "Ферма продать"

[❔] >> Чтобы посмотреть курс криптовалют, напишите: "Банк"

	`)
			}
	let i = message.$match[1]; 
 	let count = [0, 16000,27000,43000,65000];
 	let names = [0, 'Ethereum','EOSLine', 'LiteCoinEro','BitCoinLite']
 	if(i < 0 || i > 4) return message.send(`[❌] >> Данной фермы не существует.`);
 	if(user.ferma != false) return message.send(`У Вас уже имеется ферма`)
 	if(user.kolvoferm >= 50) return message.send(`[❓] >> Нельзя иметь более 50 ферм`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`[❌] >> У вас не достаточно средств.`);
 		user.balance -= count[i]; 
 		user.ferma = names[i];
 		return message.send(`[✅] >> Ферма <<${names[i]}>> куплена\n[❓] >> Подсказка: Ферма стата`)
 	} 
 });

 	vk.updates.hear(/^(?:Ферма продать)/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.ferma == false) return message.send(`[❌] >> Вы не имеете ферму.`)
		if(user.ferma == 'Ethereum'){
			user.balance += 2500
			user.ferma = false
			return message.send(`[✅] >> Ферма <<Ethereum>> продана.\n\n[💲] >> Вы получили: 8.000$`)

		}
		if(user.ferma == 'EOSLine'){
			user.balance += 5000
			user.ferma = false
			return message.send(`[✅] >> Ферма <<EOSLine>> продана.\n\n[💲] >> Вы получили: 13.500$`)

		}
		if(user.ferma == 'LiteCoinEro'){
			user.balance += 7500
			user.ferma = false
			return message.send(`[✅] >> Ферма <<LiteCoinEro>> продана.\n\n[💲] >> Вы получили: 21.500$`)

		}
		if(user.ferma == 'BitCoinLite'){
			user.balance += 17500
			user.ferma = false
			return message.send(`[✅] >> Ферма <<BitCoinLite>> продана.\n\n[💲] >> Вы получили: 32.500$`)

		}
	}); 
//-------------------------------------------


 //--------------------------------------------------------------------- 
 // --------------------------- ПРОФЕССИИ -------------------------------
 vk.updates.hear(/^(?:Дворник)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе дворник

 [🍁] >> Дворник - зарплата 1.200$ в 4 часа.
 [🔰] >> Требуемый уровень: 1 lvl

 [❓] >> Ваша задача убирать мусор, сначала напишите 'Убираться', а после этого 'Убирать'
 	`)

});
 //-------------------------------------------------------------------- 
 vk.updates.hear(/^(?:Охранник)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе охранника

 [👮] >> Охранник - зарплата 2.400$ в 4 часа.
 [🔰] >> Требуемый уровень: 2 lvl

 [❓] >> Ваша задача выгонять с магазина воров, сначала напишите 'Охрана', а после этого 'Охранять'
 	`)

});
 
 //--------------------------------------------------------------------
 vk.updates.hear(/^(?:Консультант)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе консультанта

 [👨‍💼] >> Консультант - зарплата 3.600$ в 4 часа.
 [🔰] >> Требуемый уровень: 3 lvl

 [❓] >> Ваша задача помогать людям с выбором товара, сначала напишите 'Консультация', а после этого 'Помогать'
 	`)

});
 
//--------------------------------------------------------------------

  vk.updates.hear(/^(?:Кассир)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе Кассира

 [👤] >> Кассир - зарплата 4.800$ в 4 часа.
 [🔰] >> Требуемый уровень: 4 lvl

 [❓] >> Ваша задача собирать деньги, сначала напишите 'Касса вкл', а после этого 'Касса собрать'
 	`)

});
//--------------------------------------------------------------------
  vk.updates.hear(/^(?:Директор магазина)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе Диретора магазина

 [🙎‍♂] >> Директор магазина - зарплата 6.000$ в 4 часа.
 [🔰] >> Требуемый уровень: 5 lvl

 [❓] >> Ваша задача собирать деньги, сначала напишите 'Переговоры начать', а после этого 'Переговоры'
 	`)

});
 
vk.updates.hear(/^(?:Владелец ТЦ)/i, message => {
 let user = acc.users[user_id(message.user)];
 return message.send(`
 ${user.prefix}, Информация о работе Диретора магазина

 [👾] >> Владелец ТЦ - зарплата 7.200$ в 4 часа.
 [🔰] >> Требуемый уровень: 6 lvl

 [❓] >> Ваша задача контролировать работник, сначала напишите 'Контроль начать', а после этого 'Контроль'
 	`)

});
 //================================================= СИСТЕМА МЕНТОВ ===============================

 vk.updates.hear(/^(?:развод)/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak == false) return message.send(`[🙅] >> У Вас нет второй половинки.`); 
	acc.users[user.brak].brak = false;
	user.brak = false;
	acc.users[user.braks].braks = false;
	acc.users[user.braks].brag = false;
	user.braks = false;
	user.brag = false; 

	return message.send(`[✅] >> Развод прошел успешно.`)
});

//------------------- / Команда Ограбление \ -----------------
  vk.updates.hear(/^(?:ограбление)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.zvezd += 1;
     	return message.send(`[👮] >> Ой-ой! Вас поймала полиция.\n[⚠] >>Вам выдали: 1 звездуn\n\n[❓] >> У Вас всего звезд: ${user.zvezd}`);
	}else{ 
		let count = [700,800,1000,1500,2000].random();
		user.balance += count;
		return message.send(`[🔑] >> Вам удалось ограбить дом!\n[🔫] >> Вы награбили: ${count}$`);
	}
});
//------------------------------------------

 //----------------/ Команда БД \-------------
 vk.updates.hear(/^(?:бд)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`[🕵] >> Такого гражданина не существует.`);
	if(!menti[`Полиция`].users) return message.send(`❌ | Вы не сотрудник правоохранительных органов`); 
	let id = acc.users[message.$match[1]]
	return message.send(` 
		[👤] >> Данные о гражданине: ${id.prefix}

		[⭐] >> Звезд: ${id.zvezd}

		[👁‍🗨] >> Организация: ${id.fraction.frac}
		[🆙] >> Ранг: ${id.fraction.rang} 
		`)

});
 // Система образования
vk.updates.hear(/^(?:Учиться)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.perm58 == true) return message.send(`[❗] >> Заниматься учебой можно раз в 24 часа.`)
if(user.perm53 < 9){
user.perm53 += 1
user.perm58 = true
return message.send(`[✅] >> Вы успешно перешли на класс выше\n[❓] >> Вы в ${user.perm53} классе`)
}
if(user.perm54 == false) return message.send(`[❓] >> Вы закончили 9 классов, напишите <<Профессии>>`)
if(user.perm55 < user.perm56){
user.perm55 += 1
user.perm58 = true
return message.send(`[✅] >> Вы успешно перешли на новый курс\n[❓] >> Вы на ${user.perm55} курсе`)
}
if(user.perm55 >= user.perm56) return message.send(`[❓] >> Вы уже отучились, устройтесь на работу `)	
});

vk.updates.hear(/^(?:Профессии)\s?([0-9]+)?/i, message => {	
 	let user = acc.users[user_id(message.user)];
if(user.perm53 < 9) return message.send(`[❓] >> Для начала закончите 9 классов.`)
	if(!message.$match[1]){
			return message.send(`
[1⃣] >> Врач
[2⃣] >> Программист
[3⃣] >> Юрист
[4⃣] >> Менеджер
[5⃣] >> Эколог

[❓] >> Чтобы выбрать на кого учиться, напишите: "Профессии [Номер]"
			`)
		}
	let i = message.$match[1]; 
 	let names = [0, 'Врач','Программист','Юрист','Менеджер','Эколог']
 	let krya = [0, 6, 3, 4, 5, 4]
 	if(i < 0 || i > 5) return
 	if(user.perm54 != false) return message.send(`[❌] >> Вы уже учитесь на <<${user.perm54}а>>`);
 	if(i > 0 && i <= 5){ 		
 	user.perm54 = names[i]; 
 	user.perm56 = krya[i]
 	} 
 }); 
//

  
// ----------- СИСеТМА СВАДЬБЫ, ХИЛЕНЬКАЯ -----------
vk.updates.hear(/^(?:свадьба)\s?([0-9]+)?/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];


    if(user.sex == 'Мужской'){
    	if(acc.users[message.$match[1]].sex == 'Мужской'){
        return message.send(`[😱] >> Однополые браки запрещены.`)
    	}
    }
    if(user.sex == 'Женский'){
    	if(acc.users[message.$match[1]].sex == 'Женский'){
        return message.send(`[😱] >> Однополые браки запрещены.`)
    	}
    }  
	if(args == user_id(message.user)) return message.send(`[🙅] >> Нельзя выбирать самого себя.`)
	if(!acc.users[args]) return message.send(`[🙅] >> Такого игрока нет!`)
	if(user.brak != false) return message.send(`[🙅] >> У Вас уже есть жена!`)	
	if(user.braks != false) return message.send(`[🙅] >> Вы уже предложили пожениться игроку\n🎌 | Для отмены напишите: 'Не хочу'`);
	if(acc.users[args].braks != false) return message.send(`[🙅] >> Вы уже назначали свадьбу игроку ${acc.users[args].prefix}\n[&#127987;] >> Для отмены напишите: 'Не хочу'`);
	user.braks = Number(args);
	acc.users[args].braks = Number(user_id(message.user));
	user.brag = user_id(message.user);
	acc.users[args].brag =  user_id(message.user);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		random_id: 0,
		message: `
		[👫] » Игрок @id${user.id}(${user.prefix}) назначил вам свадьбу

		[✅] » Напишите 'Согласна | Согласен', для согласия
        [❎] » Напишите 'Не хочу', для отказа
		`
	}).then((res) => {}).catch((error) => {console.log('Ошибка /Cвадьба/'); });	

	return message.send(`
		[✅] >> Вы назначили свадьбу игроку @id${acc.users[args].id}(${acc.users[args].prefix})
		[❓] >> Ожидайте принятия согласия игрока.
		
		[❗] >> Для отмены напишите: 'Не хочу'
	`);
});
//------------------------- СОГЛСИЕ НА СВАДЬБА --------------------------------
vk.updates.hear(/^(?:согласна|согласен)/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(user.braks == false) return message.send(`[🙅] >> Вам не назначали свадьбу!`); 
	if(user_id(message.user) == user.brag) return message.send(`[🙅] >> Принять приглашению на свадьбу должен партнер!`);

    acc.users[user.braks].brak = user_id(message.user);
    user.brak = Number(user.braks);
    return message.send(`[🎉] >> Свадьба молодожен, поздравим их!\n\n[💑] >> @id${user.id}(${user.prefix}) и @id${acc.users[user.brak].id}(${acc.users[user.brak].prefix}), счастья Вам!`) 
	
});

//--------------------- ОТКАЗ ОТ СВАДЬБЫ 0--------------------------------
vk.updates.hear(/^(?:Не хочу)/i, message => {
 
	let user = acc.users[user_id(message.user)];     
	if(user.braks == false) return message.send(`[😿] >> Вам никто не наметил свадьба/Вы не наметили никому.`);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.braks].id,
		random: 0,
		message: `
		[😿] >> Игрок не дал согласия на свадьбу.
		`
	}).then((res) => {}).catch((error) => {console.log('Ошибка /Cвадьба/'); });	

	acc.users[user.braks].braks = false;
	acc.users[user.braks].brag = false;
	user.braks = false;
	user.brag = false; 

 

	return message.send(`
		[❗] >> Вы отменили свадьбу.
	`);
});
//------------------------------------------------------------------------
vk.updates.hear(/^(?:Локация игры)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.gameclub == true) return message.send(`[❌] >> Вы итак находитесь в данной локации`)
setTimeout(() => {
 	user.gameclub = true
 	 user.perm49 = false
	message.send(`[🚶] >> @id${user.id}(${user.prefix}), Вы прибыли в выбранную локацию`)
}, 10000);
message.send(`[🚶] >> Вы переходите в локацию: Игровая зона.\n[❓] >> Вы прибудите ровно через 10 секунд.`)
});

vk.updates.hear(/^(?:Локация обычная шахта)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.perm49 == `Обычная шахта`) return message.send(`[❌] >> Вы итак находитесь в данной локации`)
setTimeout(() => {
 	user.perm49 = `Обычная шахта`
 	user.gameclub = false
	message.send(`[🚶] >> @id${user.id}(${user.prefix}), Вы прибыли в выбранную локацию`)
}, 10000);
message.send(`[🚶] >> Вы переходите в локацию: Обычная шахта.\n[❓] >> Вы прибудите ровно через 10 секунд.`)
});

vk.updates.hear(/^(?:Локация большая шахта)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.lvl < 2) return message.send(`[❌] >> Посещать эту локацию могут люди, у которых есть 2 уровень`)
if(user.perm49 == `Большая шахта`) return message.send(`[❌] >> Вы итак находитесь в данной локации`)
setTimeout(() => {
 	user.perm49 = `Большая шахта`
 	user.gameclub = false
	message.send(`[🚶] >> @id${user.id}(${user.prefix}), Вы прибыли в выбранную локацию`)
}, 10000);
message.send(`[🚶] >> Вы переходите в локацию: Большая шахта.\n[❓] >> Вы прибудите ровно через 10 секунд.`)
});

vk.updates.hear(/^(?:Игровая подписка)/i, message => {
let user = acc.users[user_id(message.user)];
if(user.gameprime == true) return message.send(`[❌] >> У Вас уже имеется игровая подписка`)
if(user.balance < 100) return message.send(`[❌] >> Не хватает денег.\n[❓] >> Подписка стоит 100$`)
if(user.gameclub == false) return message.send(`[❌] >> Игровую подписку можно покупать только в игровой зоне\n[❓] >> Подсказка: Локация игры`)	
user.balance -= 100
user.gameprime = true
setTimeout(() => {
 	user.gameprime = false
    message.send(`[❌] >> @id${user.id}(${user.prefix}), срок игровой подписки истек`)
}, 3600000);
return message.send(`[✅] >> Игровая подписка сроком на 1 час оформлена\n[❓] >> Теперь Вам доступны игры`)
});

vk.updates.hear(/^(?:Рулетка)\s?([^]+)?/i, message => {	
let user = acc.users[user_id(message.user)];
message.$match[1] = message.$match[1].replace(/(\.|\,)/ig, '');
message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');
message.$match[1] = message.$match[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);
if(!Number(message.$match[1])) return;

if(user.gameclub == false) return message.send(`[❌] >> Вы не в игровой зоне\n[❓] >> Подсказка: Локация игры`)
if(user.gameprime == false) return message.send(`[❌] >> У Вас нет игровой подписки\n[❓] >> Подсказка: Игровая подписка`)
if(user.balance < message.$match[1]) return message.send(`[❌] >> У Вас не хватает денег`)
let win = [0, 1, 0].random()
let louse = [`🍌 | 🍇 | 🍒`, `🍌 | 🍒 | 🍇`, `🍌 | 🍌 | 🍒`, `🍌 | 🍌 | 🍇`, `🍇 | 🍌 | 🍒`, `🍇 | 🍒 | 🍌`, `🍇 | 🍇 | 🍒`, `🍇 | 🍇 | 🍌`, `🍒 | 🍇 | 🍌`, `🍒 | 🍌 | 🍇`, `🍒 | 🍒 | 🍌`, `🍒 | 🍒 | 🍇`].random()
let win2 = [`🍌 | 🍌 | 🍌`, `🍇 | 🍇 | 🍇`, `🍒 | 🍒 | 🍒`].random()
if(win == 0){
user.balance -= Number(message.$match[1])
return message.send(`
-----------------------------
>> ${louse} << 
-----------------------------

[❌] >> Вы проиграли: ${spaces(message.$match[1])}$
[💲] >> Ваш баланс: ${user.balance}

		`)
}
if(win == 1){
user.balance += Number(message.$match[1])
return message.send(`
-----------------------------
>> ${win2} << 
-----------------------------

[✅] » Вы выиграли: ${spaces(message.$match[1])}$
[💲] >> Ваш баланс: ${user.balance}

		`)
}
});

vk.updates.hear(/^(?:Кости)\s?([^]+)?/i, message => {	
let user = acc.users[user_id(message.user)];

message.$match[1] = message.$match[1].replace(/(\.|\,)/ig, '');
message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');
message.$match[1] = message.$match[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);
if(!Number(message.$match[1])) return;
if(user.gameclub == false) return message.send(`[❌] >> Вы не в игровой зоне\n[❓] >> Подсказка: Локация игры`)
if(user.gameprime == false) return message.send(`[❌] >> У Вас нет игровой подписки\n[❓] >> Подсказка: Игровая подписка`)
if(user.balance < message.$match[1]) return message.send(`[❌] >> У Вас не хватает денег`)
let game1 = rand(1, 7) // Кости игрока
let game2 = rand(1, 7) // Кости бота
if(game1 > game2){
user.balance += Number(message.$match[1])
return message.send(`
[👤] >> У Вас выпало: ${game1}
[🤖] >> У бота выпало: ${game2}

[✅] >> Вы получаете: ${spaces(message.$match[1])}$
[💲] >> Ваш баланс: ${user.balance}

`)
}
if(game1 < game2){
user.balance -= Number(message.$match[1])
return message.send(`
[👤] >> У Вас выпало: ${game1}
[🤖] >> У бота выпало: ${game2}

[❌] >> Вы проигрываете: ${spaces(message.$match[1])}$
[💲] >> Ваш баланс: ${user.balance}

`)
}
if(game1 == game2){
return message.send(`
[👤] >> У Вас выпало: ${game1}
[🤖] >> У бота выпало: ${game2}

[➗] >> Ничья
[💲] >> Ваш баланс: ${user.balance}

`)
}
});

vk.updates.hear(/^(?:Смашина)\s?([0-3])?/i, message => {
let win = [1, 1, 2, 3].random()
if(win == 1){
if(message.$match[1] == 1) return message.send(`Вы выиграли, йоу соси хуй`)	
if(message.$match[1] == 2) return message.send(`Вы проебал хахахаха лох`)
if(message.$match[1] == 3) return message.send(`Вы проебал хахахаха лох`)		
}
if(win == 2){
if(message.$match[1] == 2) return message.send(`Вы выиграли, йоу соси хуй`)	
if(message.$match[1] == 1) return message.send(`Вы проебал хахахаха лох`)
if(message.$match[1] == 3) return message.send(`Вы проебал хахахаха лох`)		
}
if(win == 3){
if(message.$match[1] == 3) return message.send(`Вы выиграли, йоу соси хуй`)	
if(message.$match[1] == 1) return message.send(`Вы проебал хахахаха лох`)
if(message.$match[1] == 2) return message.send(`Вы проебал хахахаха лох`)		
}
});
//-
//------------------------------------------------------------------------
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

  	function pitup(id) {
 		let text = false;
 		if(acc.users[id].pits.pitexs >= acc.users[id].pits.upplvl){
 			acc.users[id].pitexs -= acc.users[id].upplvl;
 			acc.users[id].pits.pitlvl += 1;
 			acc.users[id].pits.upplvl += new_plvl();
 			text = true;
 		}
 		return text;
 	} 
 //--------------------------------------------------------------------------------------\\
 	function new_plvl(iid) {
	 	let ids = 0
	 	let numbers = [10,20,30,40,50,60];
	 	let rand = numbers.random()
	 	return rand;
	}

 //--------------------------------------------------------------------------------------\\
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
				texts = `📗 | Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 | Некорректный запрос.` 
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

	
// -------- Если включен двигатель, то -3% fuel ------
	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].dvig == true){
 					if(acc.users[i].fuel <= 0){
 					acc.users[i].fuel -= 0;	
 					}
 				    if(acc.users[i].fuel > 0){
 				    acc.users[i].fuel -= 3; 
 				    }
}				

} 
}
 	}, 3600000);

	  setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].exs >= 0){
 					acc.users[i].exs += 1;
 									}
 				    if(acc.users[i].exs >= acc.users[i].exsup){
 				    acc.users[i].lvl += 1;
 				    acc.users[i].exsup += 25;
 				    acc.users[i].golod = 100;
 				    acc.users[i].voda = 100;
 				    }			

} 
}
 	}, 3600000);
		//---------------------------------------

		//--------- Чтобы бенз не уходил в - --------------

	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].fuel < 0){
 				    acc.users[i].fuel = 0; 
 				    }				

} 
}
 	}, 1);

 
 
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
 //------------------------------------------------------------------------------------\\ 
 	setInterval(() => {
		acc.curs = rand(30000,80000) 
		acc.bit = rand(31000,32200)
	}, 600000);

	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].golod > 0){
 				    acc.users[i].golod -= 1; 
 				    }				
	 				if(acc.users[i].golod <= 0){
	 					acc.users[i].golod -= 0
 	
 		
 }
} 
}
 	}, 3600000);

	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].energy > 0){
 				    acc.users[i].energy += 50; 
 				    }				
	 				if(acc.users[i].energy >= 100){
	 					acc.users[i].golod += 0
 	
 		
 }
} 
}
 	}, 3600000);


	   setInterval(() =>{ // Дворник
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm3 == 11){
 				    acc.users[i].perm3 = 0; 
 	         }
          } 
}
 	}, 14400000);

setInterval(() =>{ // Консультант
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm32 == 11){
 				    acc.users[i].perm32 = 0; 
 	         }
          } 
}
 	}, 14400000);

setInterval(() =>{ // Директор магазина
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm46 == 11){
 				    acc.users[i].perm46 = 0; 
 	         }
          } 
}
 	}, 14400000);

	setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm5 == 11){
 				    acc.users[i].perm5 = 0; 
 	         }
          } 
}
 	}, 14400000);

setInterval(() =>{ // Кассир
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm44 == 11){
 				    acc.users[i].perm44 = 0; 
 	         }
          } 
}
 	}, 14400000);

setInterval(() =>{ // Владелец ТЦ
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm48 == 11){
 				    acc.users[i].perm48 = 0; 
 	         }
          } 
}
 	}, 14400000);

setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].voda > 0){
 				    acc.users[i].voda -= 1; 
 				    }				
	 				if(acc.users[i].voda <= 0){
	 					acc.users[i].voda -= 0
 	
 		
 }
} 
}
 	}, 3600000);

setInterval(() =>{
for(i=1;i<200000;i++){
if(acc.users[i]){
if(acc.users[i].voda == 0 || acc.users[i].golod == 0){
acc.users[i].perm6 -= 1;

}
}
}
}, 1);


setInterval(() =>{
for(i=1;i<200000;i++){
if(acc.users[i]){
    if(acc.users[i].perm6 <= 0){
    acc.users[i].perm6 = 0;

}
}
}
}, 1);

setInterval(() =>{ // Бля не обращайте внимания это по моему добству =)))))))
for(i=1;i<200000;i++){
if(acc.users[i]){
    if(acc.users[i].perm58 == true){
    acc.users[i].perm58 = false;

}
}
}
}, 86400000);

	setInterval(() =>{
 		for(name in promo){
 		promo[name].dney -= 1
 		if(promo[name].dney == 0){ 
 		delete promo[name] 
 		return
 		   }	
 		}
 	}, 86400000); 

// -------- Сундуки, алмазы 
	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].zalmazi == true){
 				    if(acc.users[i].rabotnik == 0){
                       acc.users[i].zpalmaz += 1;
 				    }
 				    if(acc.users[i].rabotnik == 5){
                    acc.users[i].zpalmaz += 2;
                    } 
 				    }				
	 				if(acc.users[i].zsunduk == true){
	 				   if(acc.users[i].rabotnik == 0){
 	                    acc.users[i].zpsundik += 1;
 	                }
 	                if(acc.users[i].rabotnik == 5){
                    acc.users[i].zpsundik += 2;
 		
 }
}
} 
}
 	}, 1);

	  setInterval(() => {
		acc.bit = rand(200,300) 
		acc.lite = rand(100,150)
		acc.eso = rand(50,70)
		acc.eos = rand(70,90)
	}, 600000);

//----------

	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].house != false){
 				    acc.users[i].balance -= 17000; 
 				    }				
	 				if(acc.users[i].house == false){
	 					acc.users[i].balance -= 0 
	 				}
	 				if(acc.users[i].balance <= 0){
	 					acc.users[i].house = false

	 				}
} 
}
 	}, 3600000);


	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm37 > 0){
 				    acc.users[i].perm37 -= 1; 
 				    }				
	 				if(acc.users[i].perm37 <= 0){
	 					acc.users[i].perm37 = 0 
	 				}


} 
}
 	}, 60000);

setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].perm38 > 0){
 				    acc.users[i].perm38 -= 1; 
 				    }				
	 				if(acc.users[i].perm38 <= 0){
	 					acc.users[i].perm38 = 0 
	 				}


} 
}
 	}, 1000);

setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].shaht >= 0){
 				    acc.users[i].shaht = 0 
 				    }				
} 
}
 	}, 86400000);

	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				    if(acc.users[i].bizs.bize == 'Ларек'){
 				        acc.users[i].bizs.money += 1000; 
 				    }				
	 				if(acc.users[i].bizs.bize == 'Магазин концтоваров'){
	 					acc.users[i].bizs.money += 5000;
	 				}
	 				if(acc.users[i].bizs.bize == 'Магазин гаджетов'){
	 					acc.users[i].bizs.money += 15000;
	 				}
	 				if(acc.users[i].bizs.bize == 'Сеть Магазинов'){
	 					acc.users[i].bizs.money += 75000;
                    }
                    if(acc.users[i].bizs.bize == 'Бизнес Центр'){
	 					acc.users[i].bizs.money += 150000;
                    }
                    if(acc.users[i].bizs.bize == 'Крупнейший ТЦ'){
	 					acc.users[i].bizs.money += 750000;
                    }

                    if(acc.users[i].bizs.bize == 'Testers'){
	 					acc.users[i].bizs.money += 30000;
                    }
} 
}
 	}, 3600000);

setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
 			 	if(acc.users[i].sex == 1){
 			 		acc.users[i].sex = 'Женский'
 			 	}
 			 	if(acc.users[i].sex == 2)
 			 	   acc.users[i].sex = 'Мужской'

 			 	}
 		}	

 	}, 1);   	


	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				    if(acc.users[i].ferma == 'BitCoinLite'){
 				        acc.users[i].bitc += 60; 
 				    }				
	 				if(acc.users[i].ferma == 'LiteCoinEro'){
	 					acc.users[i].litecoin += 60;
	 				}
	 				if(acc.users[i].bizs.bize == 'EOSLine'){
	 					acc.users[i].eos += 60;
	 				}
	 				if(acc.users[i].bizs.bize == 'Ethereum'){
	 					acc.users[i].eso += 60;
                    }
} 
}
 	}, 3600000);	   

   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				    if(acc.users[i].bloks.giverub == true){
 				        acc.users[i].bloks.giverub = false; 
 			}	
 }   
}
 	}, 86400000);


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

 
   	 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
 			 	if(acc.users[i].job.name == false){
 			 		acc.users[i].perm30 = 600;

			 			vk.api.call('messages.send', {
							user_id: acc.users[i].id,
							random_id: 0,
							message: `[✅] >> Вам пришло пособие по безработице в размере 600$, каждые 12 часов пособие обнуляется до 600$\n\n[❓] >> Подсказка: Пособие собрать`
						});
 			 		}
 			 }
 		}
 	}, 43200000); 


setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/telephon.json", JSON.stringify(telephon, null, "\t"));
	fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"));
	fs.writeFileSync("./games/kosti.json", JSON.stringify(kosti, null, "\t"));
	fs.writeFileSync("./frac/menti.json", JSON.stringify(menti, null, "\t"));


}, 3500);
