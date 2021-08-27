const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs");
const cmd = vk.updates;

// ----------------------------------------------- \\

const acc = require("/home/BomjBot/bd/acc.json");
const uid = require("/home/BomjBot/bd/uid.json");
const botinfo = require('/home/BomjBot/bd/botinfo.json');
const log = require("/home/BomjBot/bd/log.json");
const frac = require("/home/BomjBot/bd/frac.json");
const ferm = require("/home/BomjBot/bd/ferm.json");
const config = require("/home/BomjBot/setting/config.json")

//----------------------------------------------\\

setInterval(function(){
	fs.writeFileSync("/home/BomjBot/bd/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("/home/BomjBot/bd/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("/home/BomjBot/bd/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("/home/BomjBot/bd/frac.json", JSON.stringify(frac, null, "\t"));
	fs.writeFileSync("/home/BomjBot/bd/ferm.json", JSON.stringify(ferm, null, "\t"));
	fs.writeFileSync("/home/BomjBot/bd/botinfo.json", JSON.stringify(botinfo, null, "\t"));
}, 1500);

//--------------------------------------------------\\
vk.setOptions({
    token: 'd6dc15718e4f648965fd22283ae7433990389e8a0ee3f53c31f4fb4c5e71bb23c65e5b17a6c0a0cbbb6c3',
    apiMode: 'parallel',
	pollingGroupId: 182145152
});
//-----------------------------------------------------\\

vk.updates.use(async (message, next) => {  	
    if (message.is("message") && message.isOutbox)
        return;
	
    message.user = message.senderId;
    message.text = message.payload.text;  

    if(Number(message.senderId) <= 0) return;
	if(/\[public182145152\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public182145152\|(.*)\]/ig, '').trim();

 
    if (!message.text) return;
    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}
 		let id = user_id(message.user); 		 
			message.send(`🎉 *id${message.user} (Привет игрок!), Ты успешно зарегистрирован, напиши "Помощь"`)

		acc.users[numm] = {
			number: numm,
			id: message.user,
			balance: 5000,
			health: 100,
            golod: 100,
            gigiena: 100,
            need: 100,
            coffe: 0,
            kartoxa: 0,
            pivo: 0,
            tea: 0,
            burg: 0,
            sup: 0,
            milo: 0,
            shampun: 0,
            poroshok: 0,
            pasta: 0,
            keyboard: true,
			level: 0, 
			adm_time: 0,
			clanid: false,
			bitcoin: 0, 
			donate: 0,
			hack: false,
			wins: 0,
			loses: 0,
			fix: false,
			bloks: { 
				rep: false,
				cases: false,
				bonus: false,
				random_game: false,
				giverub: false,
				a_case: false,
				olig: false,
				pay: false,
				frac: false,
				gun_case: false
			}, 
			ferm: {
				id: false,
				bitcoin: 0,
 				count: 0,
 				balance: 0,
 				bitcoin: 0
			},
			lvl: 1,
			exp: 0,
			exsup: 50,
			nick: true,
			ref: false,
			refs: 0,
			agent: 0,
			verify: false,
			block_top: false,
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
				win: 35,
				strela_loose: 0,
				strela_win: 0
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
			"bizs": {
				"one_biz": false,
				"one": {
					"count": false,
					"balance": 0,
					"id": false,
					"name": false,
					"people": 0,
					"uplvl": 0,
					"zp": 0,
					"stop": false,
					"max_peop": 0
				},
				"two_biz": false,
				"two": {
					"count": false,
					"balance": 0,
					"id": false,
					"name": false,
					"people": 0,
					"uplvl": 0,
					"zp": 0,
					"stop": false,
					"max_peop": 0
				}
			},
			cars: false,
			moto: false,
			prist: false,
			restoran: false,
			garage: false,
			phone: false,
			reys: false,
			aircraft: false,
			house: false,
			kv: false,
			housep: 0,
			pit: false,
			bank_balance: 0,
			lodka: false,
			pcc: false,
			tag: "Новичок", 
			brak: {
				status: false,
				i: false
			},
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
			frac_name: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 45,
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

vk.updates.hear(/^(?:zz|eval|dev|system code)\s([^]+)$/i, (message) => {
     let user = acc.users[user_id(message.user)];
        if(user.level < 6) return;

	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === 'string')
		{
			return message.send(`@id${user.id} (${user.prefix}), string: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return message.send(`@id${user.id} (${user.prefix}), number: ${result}`);
		} else {
			return message.send(`@id${user.id} (${user.prefix}), ${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return message.send(`@id${user.id} (${user.prefix}), ошибка:
		${e.toString()}`);
	}
});

// -----------------------------------------------------------------------------\\

//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:help|помощь|начать|start|команды|command)$/i, (message) => {
	return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), команды: 
[🌐] » Важное: 
   [📛] » Правила - Правила бота [Обязательно к прочтению!] 
   [📖] » О боте - Информация о боте. 
   [✳] » Донат

[🔰] » Игровые: 
   [📋] » Профиль - Ваш профиль. 
   [💰] » Баланс - Ваш баланс. 
   [📝] » Nick [name] - Сменить Ник.

[📗] » Список менюшек:
  [🎉] » Развлечения [➕]
  [🎮] » Игры [➕]
  [📝] » Прочее [➕] 
  [📦] »Кейсы [➕]
  [📘] » Ранг [➕]
  [💸] » Фермы [➕]
  [⚡] »  Компания [➕]
  [👪] » Реф инфо - информация по реферальной системе.

🌀 Разное:  
 [✅] » Verify - Список Подтверждённых аккаунтов. 
 [🏦] » Банк - посмотреть счёт в банке. 
 [↪] » Pay [ID] [СУММА] - передача валюты. 
 [🎁] » Бонус - Ежедневный бонус. 
 [📈] » Курс - Курс Baincoin. 
 [👑] » Рейтинг - [➕] 
 [🔝] » top - [➕] 
 [🏣] » Магазин [➕]
 [🏤] » Бизнесы [➕]


[📢] » "Промокод [код]" - Активация промокода.
[🆘] » Репорт [текст] - Связь с Тех.Поддержкой.
`);
});
//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:прочее)$/i,  (message) => { 
	return message.send(`*id${message.user} (${acc.users[user_id(message.user)].prefix}), команды:
📝 Прочее:
⠄🚗 "Продать Машину" - Продажа машины.
🛵 "Мотоцикл продать" - Продажа мотоцикла.
🛩 "Самолет продать" - Продажа самолета.
🛥 "Продать яхту" - Продажа яхты.
🏠 "Продать дом" - Продажа дома.
🌇 "Квартира продать" - Продажа квартиры.
🏚 "Продать гараж" - Продажа гаража.
🏨 "Продать ресторан" - Продажа ресторана.
🐼 "Продать питомца" - Продажа питомца.
🕹 "Продать приставку" - Продажа приставки.
🖥 "Продать компьтер" - Продажа компьютера.
👑 "Рейтинг продать [кол-во]" - Продажа рейтинга

📢 "Промокод [код]" - Активация промокода.
    `);
});
//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:Развлечения|Развличения)$/i,  (message) => { 
	return message.send(`*id${message.user} (${acc.users[user_id(message.user)].prefix}), команды:
[🎉] » Развлечения: 
 [📏] » cc [ссылка] - сократить ссылку. 
 [🔄] » send [ID] [ТЕКСТ] - Отправить сообщение игроку. 
 [📊] » Шанс [событие] 
 [🔮] » Шар [фраза] 
 [↪] » Переверни [слово] 
 [😕] » Выбери [фраза1] или [фраза2] 
 [✨] » Когда [фраза] 
 [🔢] » Реши [Пример] 
 [🔺] » rstl [текст] - делает текст необычным 

 [📢] » Cry [текст] - Крикнуть в чат. 
 [👊] » Hit [ID] - ударить игрока. 
 [💋] » Kiss [ID] - поцеловать игрока. 
 [😊] » Hug [ID] - Обнять игрока. 
 [👤] » Me [действие] 
 [👥] » Friend [ID] - Предложить дружбу игроку. 
    `);
});
//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:Игры|Games)$/i,  (message) => { 
	return message.send(`*id${message.user} (${acc.users[user_id(message.user)].prefix}), команды:
[🎮] » Игры:
 [🎭] » Казино [ставка]. 
 [🎰] » Слоты [ставка]. 
 [♻] » Азино [cтавка]. 
 [🎲] » Куб [1 - 6]
 [💈] » Стаканчик [1-3] [ставка] 
 [💿] » Монетка [орел/решка] [ставка] 
 [🎲] » Кости [Ставка] 
 [🔑] » Сейф - Взлом сейфа. 
 [🎫] » Лотерея - Счастливый билетик. 
 [🔫] » Дуэль [ID] [Ставка] 
    `);
});
//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:квартира продать)/i, (message) => {
     let count = [0, 15000, 55000, 200000, 360000, 640000, 2600000, 5000000, 10000000];
     let user = acc.users[user_id(message.user)];
     if (user.kv == false) return message.send(`[Error] » У вас нет квартиры`)
     let sum = count[user.kv] / 100 * 5;
     user.balance += sum;
     user.kv = false;
     return message.send(`🌇 Вы продали свою квартиру за ${sum}$`)
 });
//-------------------------------------------------------------------------------\\
vk.updates.hear(/^(?:квартиры)\s?([0-9]+)?/i, (message) => {
     let user = acc.users[user_id(message.user)];
     if (!message.$match[1]) {
         return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), квартиры: 
🔸 1. Чердак (20.000$) 
🔸 2. Квартира в общежитии (33.000$) 
🔸 3. Однокомнатная квартира (150.000$) 
🔸 4. Двухкомнатная квартира (300.000$) 
🔸 5. Четырехкомнатная квартира (600.000$) 
🔸 6. Квартира в центре Москвы (1.300.000$) 
🔸 7. Двухуровневая квартира (2.500.000$) 
🔸 8. Квартира с Евроремонтом (5.000.000$) 

Для покупки введите "Квартиры [номер]" 
👉 Квартира продать - продать квартиру

`)
     }
     let i = message.$match[1];
     let ids = [0,1,2,3,4,5,6,7,8]
     let count = [0,20000,33000,150000,300000,600000,1300000,2500000,5000000];
     let names = [0, 'Чердак', 'Квартира в общежитии', 'Однокомнатная квартира', 'Двухкомнатная квартира', 'Четырехкомнатная квартира', 'Квартира в центре Москвы', 'Двухуровневая квартира', 'Квартира с Евроремонтом']
     if (i < 0 || i > 8) return;
     if (user.kv != false) return message.send(`[Error] » У вас уже куплена квартира`);
     if (i > 0 && i <= 8) {
         if (user.balance < count[i]) return message.send(`[Error] » вас не достаточно денег.`);
         user.balance -= count[i];
         user.kv = ids[i];
         return message.send(`🌇 Вы купили квартиру (${names[i]}) за ${count[i]}$`)
     }
 });
//-------------------------------------------------------------------------------\\
 	 vk.updates.hear(/^(?:правила)/i, (message) => { 
 		 return message.send(`
🔺1 - Запрещена продажа/попытка продажи валюты. 
⚄Блокировка передачи / Блокировка аккаунта на 7 дней.
🔺1.1 - Запрещена продажа услуги "буста" чего-либо. 
⚄ Блокировка аккаунта
🔺1.2 - Запрещён обман игроков.
⚄ Блокировка передачи / Блокировка аккаунта на 1-7 дней / Обнуление баланса
🔺1.3 - Запрещена реклама чего-либо.
⚄ Блокировка на 7 дней 
🔺1.4 - Запрещено разглашать ложную информацию.
⚄ Блокировка до 7 дней.
🔺1.5 - Запрещен Флуд | Спам | КАПС | Мат в официальную беседу.
⚠Блокировка на 1 дней, за мат warn (Предупреждение)
🔺1.6 - Запрещены выражения, унижающие человеческое достоинство, дискриминирующие или разжигающие межнациональную рознь.
⚠ Блокировка на 7-30 дней
🔺1.7 - Запрещены попытки блокировки бота.
⚠ Вечная блокировка аккаунта 
🔺1.8 - Запрещена любая автоматизация действий (связанных с ботом) в беседах/личных сообщениях группы бота.
⚠ Блокировка на 2-∞ дней
🔺1.9 - Запрещено оскорбление родителей игроков и администрации, угрозы.
⚠ Блокировка аккаунта навсегда. 
🔺2 - Запрещено преднамеренно использовать баги и недочеты для получения внутриигровой валюты/предметов. 
⚠ Блокировка аккаунта на 7-∞ дней / Обнуление баланса / Игрового аккаунта.
⚠ Вы должны сообщить об найденном баге с помощью темы предложений либо с помощью команды "Репорт [описание бага]". 
⚠ За найденный баг Вам будет начислен бонус в зависимости от критичности 
🔺2.1 - Запрещена покупка/попытка покупки валюты/буста от других игроков. 
⚠ Обнуление баланса/имущества/временный бан до 7 дней.
🔺2.2 - Запрещён шок контент 18+/расчленёнка.
⚠ Кик с беседы.

❗Незнание правил не освобождает от ответственности. Начав использовать бота Вы подтверждаете свое согласие с данными правилами.Администрация не несет ответственности за временную или постоянную невозможность игры на ботах конкретным лицом или группой лиц. Игроки обязаны выполнять требования Администрации и предписания данных правил. Администрация имеет право корректировать данный свод правил без уведомления игрока.❗
`) 
 });
 //-------------------------------------------------------------------------------\\
 vk.updates.hear(/^(?:arule)/i,  (message) => { 
 		 return message.send(`
⛔ Запрещается:⛔
⚕Неадекватные ответы в репорт [warn]
⚕Банить/варнить без причины игроков [down]
⚕Накручивать ответы/респекты в репортах [down]
⚕Передача $ между администраторами [vig]
⚕Выдача $ игрокам [vig]
⚕Непослушание Создателя [down]
⚕Слив Админ-инфы [Снятие + Бан]
⚕Оскорбление игроков в беседах [warn]
⚕Обман своих сотрудников [Снятие + Бан]

 		 	`);
 	});
///////////////////////Развлечения///////////////////////

 	vk.updates.hear(/^(?:cry)\s?([^]+)?/i,  (message) => { 
		return message.send(`📢  *id${message.user} (${acc.users[user_id(message.user)].prefix}) крикнул: 🔅 ${message.$match[1]} 🔅`);
});
/////////////////////
//////////////////////
vk.updates.hear(/^(?:кубик|куб)\s([1-6])$/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
if(message.$match[1] < 0 || message.$match[1] > 6) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
let int = rand(1,6); 
let win = rand(1000000,5000000) 
if(int == message.$match[1]) 
{ 
user.balance += win; 
return message.send(`😃 Вы угадали!\n➡ Вы получили на свой баланс: ${spaces(win)}$`); 
} else return message.send(`😒 Вы не угадали\n🎲 Число было ${int}`); 
});
////////////////////////
///////////////////////
 	vk.updates.hear(/^(?:hit)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `👊 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) ударил вас 👊`
		});
 		return message.send(`👊  *id${message.user} (${acc.users[user_id(message.user)].prefix}) ударил игрока @id${id.id}(${id.prefix}) 👊`);
 	});
/////////////////////
vk.updates.hear(/^(?:реши)\s([^]+)/i, (message) => { 
let user = acc.users[user_id(message.user)];
let text = message.$match[1];
let a = message.$match[1].toLowerCase();
var b = /(users|config|base|user|us|acc|js|eval|for|in|id|vk|updates|hear|node|json|api|call|}|{|match|send|message|attachment|dev|msg|key|a|i)/
if(b.test(a) == true) return message.send(`@id${message.user} (${user.prefix}), Пример использования: «реши [1+3+5]»😉`)
let c = eval(`${message.$match[1]}`);
return message.send(`<<| Калькулятор |>> \n-- Пример <<${text}>>\n-- Ответ получился: ${c}`);
});
///////////////////////
////////////////////////
 	vk.updates.hear(/^(?:kiss)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `💋 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) поцеловал вас 💋`
		});
 		return message.send(`💋  *id${message.user} (${acc.users[user_id(message.user)].prefix}) поцеловал игрока @id${id.id}(${id.prefix}) 💋`);
 	});
///////////////////////
vk.updates.hear(/^(?:переверни)\s([^]+)/i, (message) => {
	let text = ``;
	message.$match[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return message.send(`↪ Держи : "${text.split('').reverse().join('')}"`)
});
///////////////////////
 	vk.updates.hear(/^(?:hug)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `🤗 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) обнял вас 🤗`
		});
 		return message.send(`🤗 *id${message.user} (${acc.users[user_id(message.user)].prefix}) обнял игрока @id${id.id}(${id.prefix}) 🤗`);
 	});
///////////////////////
//////////////////////

/////////////////////
//////////////////////
	vk.updates.hear(/^(?:restart)/i, (message) =>{
		let user = acc.users[user_id(message.user)];
		if(user.level < 6) return message.send(``);
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks.cases = false
				acc.users[i].bloks.bonus = false
				acc.users[i].bloks.random_game = false
				acc.users[i].bloks.gun_case = false
				acc.users[i].bloks.frac = false
				acc.users[i].bloks.pay = false
				acc.users[i].bloks.giverub = false
				acc.users[i].job.stop = false
				acc.users[i].bizs.one.stop = false
				acc.users[i].bizs.two.stop = false
				acc.users[i].hack = false;
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
			}
			return message.send(`Готово!`)
		}
});
///////////////////////
 	vk.updates.hear(/^(?:oligarch)\s?([^]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bloks.olig != false) return message.send(`Попробуй через 3 дня после использлвания.`);
		if(user.level < 4) return message.send(`Моська треснет!`);
		user.balance = 100000000000;
		user.bloks.olig = true;
		setTimeout(() => {
			user.bloks.olig = false;
			}, 259200000);
		var is = [user_id(message.user), message.text] 
		adm_log(is)
 		return message.send(`💰 Режим Олигарха активирован! 💰`);
 	});
///////////////////////
 	vk.updates.hear(/^(?:friend)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `👥 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) Хочет с вами подружиться 👥`
		});
 		return message.send(`👥 *id${message.user} (${acc.users[user_id(message.user)].prefix}) предложил дружбу игроку @id${id.id}(${id.prefix}) 👥`);
 	});
//////////////////////
/////////////////////

///////////////////////
	vk.updates.hear(/^(?:выбери)\s?([^]+)\s?или\s?([^]+)?/i,  (message) => { 
 		return message.send(`⚖ *id${message.user} (${acc.users[user_id(message.user)].prefix}), я выбираю ${[`[${message.$match[1]}]`,`[${message.$match[2]}]`].random()}`);
 	});
///////////////////////
///////////////////////
///////////////////////
 	vk.updates.hear(/^(?:бот)$/i,  (message) => { 
        let stick = utils.pick([3, 37, 40]);
 		return message.send({ sticker_id: stick });
 	});
///////////////////////
 	vk.updates.hear(/^(?:шанс)\s?([^]+)\s?([^]+)?$/i,  (message) => { 
	let chance = rand(1,100);
 		return message.reply(`*id${message.user} (${acc.users[user_id(message.user)].prefix}), 📊  Шанс ${message.$match[1]} равен: ${chance}%`);
 	});
///////////////////////
	vk.updates.hear(/^(?:когда)\s?([^]+)\s?([^]+)?$/i,  (message) => { 
	let year = rand(1,100);
	let hours = rand(1,24);
	let min = rand(1,60);
	let sec = rand(1,60);
 		return message.reply(`✨ *id${message.user} (${acc.users[user_id(message.user)].prefix}), ${[`через ${min} минут`,`никогда`,`сам не знаю`,`Думаю через ${hours} часов`,`через ${year} лет`,`через ${sec} секунд`,`прямо сейчас`].random()}`);
 	});
///////////////////////
	vk.updates.hear(/^(?:шар)\s?([^]+)\s?([^]+)?$/i,  (message) => { 
 		return message.send(`🔮 *id${message.user} (${acc.users[user_id(message.user)].prefix}), ${[`думаю "Да"`,`бесспорно`,`лучше не рассказывать.`,`конечно (Нет)`,`не может такого быть!`,`предрешено =)`,`не могу предсказать`,`пока не ясно`,`хорошие перспективы`,`сейчас нельзя предсказать`,`весьма сомнительно`,`мой ответ - "нет"`,`определённо да`,`Соберись и повтори вопрос`,`да`,`мне кажется - "Да"`].random()}`);
 	});
///////////////////////
	vk.updates.hear(/^(?:rstl)\s([^]+)$/i, (message) => {  
	        let text = message.$match[1]
		message.send(`${text.split("").map(x=>x.toUpperCase()).join(" ")}`);
		
	});
//////////////////////
///////////////////////
 vk.updates.hear(/^(?:кости)\s([0-9]+)$/i, (message) => {
     let user = acc.users[user_id(message.user)];
     if(!message.$match[1])	return message.send(`⚠ Укажите ставку! "Кости [ставка]"`);
     if (message.$match[1] > user.balance) return message.send(`⚠ Недостаточно средств`); 
     if(!Number(message.$match[1])) return message.send(`❗Ставка должна быть числового вида!`);
     let summ = Number(message.$match[1]);
     let im = rand(1,6);
     let you = rand(1,6);
     if (im < you) {
	user.loses += summ;
         user.balance -= summ;
         return message.send(`👎 Ты проиграл ${spaces(summ)}💲\n🔹Тебе выпало [${im}]\n🔺Мне выпало [${you}]\n💰Твой баланс: ${spaces(user.balance)}`);
     } else if(im == you) {
         return message.send(`🤝 У нас ничья =)\n💰Твой баланс: ${spaces(user.balance)}💲`);
     } else if(im > you) {
	user.wins += summ;
         user.balance += summ;
         return message.send(`🎉 Ого, ты выиграл ${spaces(summ)}!\n🔹Тебе выпало ${im}\n🔺Мне выпало ${you}\n💰Твой баланс: ${spaces(user.balance)}💲`);
     }
 });
/////////////////////////////////
  	vk.updates.hear(/^(?:стаканчик)\s([0-9]+)\s([0-9]+)$/i, message => { 
		let user = acc.users[user_id(message.user)]; 
	if(!Number(message.$match[2])) return message.send(`⚠ Ставка должна быть числового вида!`);
	if(message.$match[1] > 3 || message.$match[1] < 1) return message.send(`⚠ Укажие номер стаканчика "Стканчик [1-3] [ставка]"`);
	if(user.balance < message.$match[2]) return message.send(`⚠ Ставка не должна превышать баланс или быть меньше 1$`);
	let summ = Number(message.$match[2]);

	let q = rand(1,3);
	
if(q == message.$match[1]) {
	user.wins += summ;
user.balance += summ;
	return message.send(`🎉 Вы угадали стаканчик!\n😃Вы выиграли ${spaces(summ)}$\n💰 Ваш баланс: ${spaces(user.balance)}$`);
}else{ 
	user.loses += summ;
user.balance -= summ;
return message.send(`👎 Вы не угадали стаканчик и проиграли ${spaces(summ)}$\n☝ Правильный стаканчик был ${q}!\n💰 Ваш баланс: ${spaces(user.balance)}$`);
	}
});
///////////////
vk.updates.hear(/^(?:cid)/i, message => {
 return message.reply(`ID Чата:` + message.chatId);
});

//////////////////////////////////КЕЙСЫ////////////////////////////////
   vk.updates.hear(/^(?:кейс маленький)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 100000) return message.send(`⚠ Маленький кейс стоит 100.000$`);
	user.balance -= 100000;
	if(rand(1,3) == 1){
		let count = rand(100000,300000);
		user.balance += count;
		return message.send(`😃 Вам выпало ${spaces(count)}$ 💰`);
}else{ 
		return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
		}
});
////////////////////
   vk.updates.hear(/^(?:кейс средний)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 500000) return message.send(`⚠ Средний кейс стоит 500.000$`);
	user.balance -= 500000;
	if(rand(1,3) == 1){
		let count = rand(500000,1000000);
		user.balance += count;
		return message.send(`😃 Вам выпало ${spaces(count)}$ 💰`);
}else{ 
		return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
		}
});
////////////////////////
   vk.updates.hear(/^(?:кейс большой)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 1000000) return message.send(`⚠ Большой кейс стоит 1.000.000$`);
	user.balance -= 1000000;
	if(rand(1,3) == 1){
		let count = rand(1000000,2500000);
		let btc = rand(100,200);
		user.balance += count;
		user.bitcoin += btc;
		return message.send(`😃 Вам выпало ${spaces(count)}$ 💰 и ${btc} 💳`);
}else{ 
		return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
		}
});
/////////////////////
   vk.updates.hear(/^(?:кейс серебрянный)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000000) return message.send(`⚠ Серебрянный кейс стоит 5.000.000$`);
	user.balance -= 5000000;
	if(rand(1,3) == 1){
		let count = rand(5000000,10000000);
		let btc = rand(500,1200);
		user.balance += count;
		user.bitcoin += btc;
		return message.send(`😃 Вам выпало ${spaces(count)}$ 💰 и ${btc} 💳`);
}else{ 
		return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
		}
});
///////////////
   vk.updates.hear(/^(?:кейс золотой)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 15000000) return message.send(`⚠ Золотой кейс стоит 15.000.000$`);
	user.balance -= 1500000;
	if(rand(1,3) == 1){
		let count = rand(15000000,20000000);
		let btc = rand(1000,1800);
		user.balance += count;
		user.bitcoin += btc;
		return message.send(`😃 Вам выпало ${spaces(count)}$ 💰 и ${btc} 💳`);
}else{ 
		return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
		}
});
////////////////////////
   vk.updates.hear(/^(?:кейс алмазный)$/i, (message) => {
       let user = acc.users[user_id(message.user)];
       if (user.balance < 50000000) return message.send(`⚠ Алмазный кейс стоит 50.000.000$`);
	user.balance -= 50000000;
       if (rand(1,3) == 1) {
           let count = rand(50000000,80000000);
           let btc = rand(2000, 3800);
           user.balance += count;
           user.bitcoin += btc;
           return message.send(`😃 Вам выпало ${spaces(count)}$ 💰 и ${btc} 💳`);
           } else {
               return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
       }
   });
//////////////////
   vk.updates.hear(/^(?:кейс донат)$/i, (message) => {
       let user = acc.users[user_id(message.user)];
       if (user.donate < 100) return message.send(`⚠ Донат кейс стоит 100₽`);
	user.donate -= 100;
       if (rand(1,5) == 2) {
           let lvl = rand(1, 5);
           user.level = lvl;
           return message.send(`😃 Ого, вы выбили ${lvl} Админ-Уровень!`);
       } else {
           if (rand(1,3) == 1) {
               let count = rand(500000000,800000000);
               let btc = rand(20000, 38000);
               user.balance += count;
               user.bitcoin += btc;
               return message.send(`😃 Вам выпало ${spaces(count)}$ 💰 и ${btc} 💳`);
           } else {
               return message.send(`😉 Вам ничего не выпало, но в следующий раз должно повезти =) `);
           }
       }
   });
//////////////////////////
	 	vk.updates.hear(/^(?:кейсы)$/i,  (message) => { 
 		return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), кейсы:
📦 Маленький - 100.000$💰 
🎁От 100.000$ до 300.000$ 
➖➖➖➖➖➖➖➖➖
🗳 Средний - 500.000$💰 
🎁 От 500.000$ до 1.000.000$ 
➖➖➖➖➖➖➖➖➖
🗄 Большой - 1.000.000$💰 
🎁 От 1.000.000$ до 2.500.000$ 
🎁 От 100 до 200 💳 
➖➖➖➖➖➖➖➖➖
📁 Серебрянный - 5.000.000$💰 
🎁 От 5.000.000$ до 10.000.000$ 
🎁 От 500 до 1200 💳 
➖➖➖➖➖➖➖➖➖
⚜ Золотой - 15.000.000$💰 
 🎁 От 15.000.000$ до 20.000.000$ 
🎁 От 1000 до 1800 💳 
➖➖➖➖➖➖➖➖➖
💠 Алмазный - 50.000.000$💰 
🎁 От 50.000.000$ до 80.000.000$ 
🎁 От 2000 до 3800 💳 
➖➖➖➖➖➖➖➖➖
💠 Донат - 100₽ 
🎁 От 1 до 5 Админ-Уровень 
🎁 От 500.000.000$ до 800.000.000$ 
🎁 От 20000 до 38000 💳
➖➖➖➖➖➖➖➖➖

☝ Что бы открыть кейс, введите: "Кейс [имя]"
☺ Пример: "Кейс маленький"`)
});


	///////////////////////Магазин////////////////
	 	vk.updates.hear(/^(?:магазин)$/i,  (message) => { 
 		return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), магазин:
🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛵 Мотоциклы
⠀⠀🛩 Самолеты
⠀⠀🛥 Яхта

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры
⠀⠀🏚 Гаражи
⠀⠀🏨 Рестораны

📌 Остальное:
⠀⠀💸 Фермы
⠀⠀🐼 Питомцы
⠀⠀📱 Телефоны
⠀⠀🕹 Приставки
⠀⠀🖥 Компьютеры
⠀⠀ 👑 Купить рейтинг [кол-во] 250.000.000$

🔎 Для покупки используйте "[категория] [номер]".
			`);
 	});
////////////////////////
/////////////////////////////
vk.updates.hear(/^(?:cmd1)$/i, message => {
    return message.send(`
📋 Возможности Вип 📋
 🔺arule - важно знать! 
 🔺get [ID] - проверить игрока. 
 🔺tempban [ID] [TIME] - Дать временный бан
 🔺untemp [ID] - Снять временный бан
 🔺hack - Взломать банк.
 🔺setmoney [COUNT] - выдать себе валюту. [1$ - 500000$]`);
});
////////////////////////
vk.updates.hear(/^(?:cmd2)$/i, message => {
    return message.send(`
📋 Возможности Премиум 📋
 🔺arule - важно знать! 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 3000000$]`);
});
////////////////////////
vk.updates.hear(/^(?:cmd3)$/i, message => {
    return message.send(`📋 Возможности Модератора  📋
 🔺arule - важно знать! 
 🔺ban [ID] - заблокировать навсегда. 
 🔺unban [ID] - разблокировать игрока. 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺setnick [ID] [NAME] - изменить ник. 
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 20000000$]
 🔺kick [ССЫЛКА_ВК] - кикнуть из беседы. `);
});
/////////////////////
vk.updates.hear(/^(?:cmd4)$/i, message => {
    return message.send(`📋 Возможности Администратора 📋
 🔺arule - важно знать! 
 🔺ban [ID] - заблокировать навсегда. 
 🔺unban [ID] - разблокировать игрока. 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺setnick [ID] [NAME] - изменить ник. 
 🔺oligarch - Активировать режим олигарха. [Не больше 1 раза за 3 дня]
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 20000000$] 
 🔺kick [ССЫЛКА_ВК] - кикнуть из беседы. 
 🔺vig ID - выдать админ-выговор 
 🔺unvig ID - снять все выговоры. `);
});
//////////////////////
vk.updates.hear(/^(?:cmd5)$/i, message => {
    return message.send(`
Возможности Гл.Администратора 
 🔺arule - важно знать! 
 🔺ban [ID] - заблокировать навсегда. 
 🔺unban [ID] - разблокировать игрока. 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан 
 🔺setnick [ID] [NAME] - изменить ник. 
 🔺oligarch - Активировать режим олигарха. 
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 20000000$] 
 🔺kick [ССЫЛКА_ВК] - кикнуть из беседы. 
 🔺vig [ID] - выдать админ-выговор 
 🔺unvig [ID] - снять все выговоры. 
 🔺offtop [ID] - Скрыть игрока с топа. 
 🔺ontop [ID] - Вернуть в топ. 
 🔺givebronze [ID] [1-7] - Выдать другу VIP аккаунт. 
 🔺ver [ID] - Подтвердить аккаунт игрока. 
 🔺unver [ID] - Снять подтверждённый аккаунт игрока. 
 🔺banrep [ID] - Запретить писать игроку в репорт. 
 🔺unrep [ID] - Разрешить писать игроку в репорт. 
 🔺bpay [ID] - Заблокировать игроку передачу денег. 
 🔺ooff [ID] - Выключить ограничитель на ставки. 
 🔺oon [ID] - Включить ограничитель ставок.`);
});
/////////////////
vk.updates.hear(/^(?:ранг)$/i, message => {
	return message.send(`
👋🏻 Привет. хочешь получить ранг, но не знаешь как? 
😉 Это очень просто. 
☝ Ранг игрока зависит от сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить первый ранг "Начинающий", вам нужно играть в бота и набрать 100 сообщений (В графе "Профиль", показывается ваше кол-во сообщений.) 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Опытный" нужно играть в бота до 500 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Любитель" нужно играть в бота до 2000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Старший" нужно играть в бота до 6000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Профессионал" нужно играть в бота до 11000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Генералиссимус" нужно играть в бота до 15000 сообщений. 
➖➖➖➖➖➖➖`)
});
////////////////////
//Админ панель//
	vk.updates.hear(/^(?:панель)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];

		if(user.level == 1){
			   return message.send(` 
📋 Возможности Вип 📋
 🔺arule - важно знать! 
 🔺get [ID] - проверить игрока. 
 🔺tempban [ID] [TIME] - Дать временный бан
 🔺untemp [ID] - Снять временный бан
 🔺setmoney [COUNT] - выдать себе валюту. [1$ - 500000$]
`); 
} 
if(user.level == 2){ 

return message.send(` 
📋 Возможности Премиум 📋
 🔺arule - важно знать! 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 3000000$]
`); 
} 
if(user.level == 3){ 

return message.send(` 
📋 Возможности Модератора  📋
 🔺arule - важно знать! 
 🔺ban [ID] - заблокировать навсегда. 
 🔺unban [ID] - разблокировать игрока. 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺setnick [ID] [NAME] - изменить ник. 
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 20000000$]
 🔺kick [ССЫЛКА_ВК] - кикнуть из беседы. 
`); 
} 
if(user.level > 3){ 

return message.send(` 
📋 Возможности Администратора  📋
 🔺arule - важно знать! 
 🔺ban [ID] - заблокировать навсегда. 
 🔺unban [ID] - разблокировать игрока. 
 🔺warn [ID] - выдать предупреждение. 
 🔺tempban [ID] [TIME] - Дать временный бан 
 🔺untemp [ID] - Снять временный бан
 🔺setnick [ID] [NAME] - изменить ник. 
 🔺oligarch - Активировать режим олигарха. [Не больше 1 раза за 3 дня]
 🔺get [ID] - проверить игрока. 
 🔺setmoney [COUNT] - выдать себе валюту [1$ - 20000000$] 
 🔺kick [ССЫЛКА_ВК] - кикнуть из беседы. 
 🔺vig ID - выдать админ-выговор 
 🔺unvig ID - снять все выговоры. 
`);
		}
	});
  //kick//
vk.updates.hear(/^(?:kick|кик)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.isChat) return message.send(`⚠ Команда работает только в беседах!`);
 	if(user.level < 3) return message.send(`⚠ Доступно только статусу Gold и выше.`);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
			if(res.object_id == 447690600) return message.reply('⚠ Отказ'); 

			if(acc.users[user_id(res.object_id)]){
				if(acc.users[user_id(res.object_id)].level > 2) return message.send(`⚠ Нельзя кикнуть этого игрока!`);
			} 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`⚠ Ошибка. Возможные причины:\n⚠ В данной беседе группа не Администратор\n⚠Такого игрока нет в беседе.`);
			});  
			return  
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ID не указан, либо указан неверно."); 
		if(message.$match[3] == 447690600) return message.reply('⚠ Отказ'); 

		if(acc.users[user_id(message.$match[3])]){
			if(acc.users[user_id(message.$match[3])].level > 2) return message.send(`⚠ Нельзя кикнуть этого игрока!`);
		}

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`⚠ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠Такого игрока нет в беседе.`);}); 

		return  				
	} 
});
///////////////////////////
vk.updates.hear(/^(?:nick)\s?([^]+)?/i,  (message) => { message.$match[1];
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
		var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|[|]|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`✖Придумай что нибудь получше...`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`📗 Придумай что нибудь другое.`);
	}
	if(message.$match[1].length > 10) return message.send(`✖Что-то длинноватый у тебя ник`);
	user.prefix = message.$match[1];
	return message.send(`✔Вы поменяли себе ник.`);
});
//////////////////////////////
vk.updates.hear(/^(?:tehp)\s?([^]+)?/i,  (message) => { message.$match[1];
	if(acc.users[user_id(message.user)].level < 5) return;
	config.text = message.$match[1];
	return message.send(`Готово`);
});
////////////////////рассылки//////////////////////
vk.updates.hear(/^(?:all)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 5) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 ${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});
//////////////////////
vk.updates.hear(/^(?:postall)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 5) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: ``,
			attachment: `${message.$match[1]}`
		});
	}
	return message.send(`Посты отправлены!`);
});
///////////////////////////
vk.updates.hear(/^(?:send)\s?([0-9]+)\s?([^]+)?/i,  message => { 
	if(message.$match[1] == 1) return message.send(`Запрещено!`);
		vk.api.call('messages.send', {
			user_id: acc.users[message.$match[1]].id,
			message: `💡 Сообщение от игрока *id${message.user} (${acc.users[user_id(message.user)].prefix})\n📨: ${message.$match[2]}`
		});
	return message.send(`Сообщение отправлено!`);
});
 ////////////////////////////
vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => { 	
	if(message.$match[3]){
		var id = user_id(message.$match[3]);
		if(!acc.users[id]) return message.send(`❗ ERROR ❗`);  
		return message.send(`
			Игрок: ${acc.users[id].prefix}
			ID: ${id}
				Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
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
					Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
				`);
		})
		return;
	}
 
});
///////////////////////////
vk.updates.hear(/^(?:состав)/i, message => {  
		let creat, devs, admins, moders, vips, chat; 
		let devels = ``;
		creat = '🔺CREATOR🔺\n'; 
		devs = '\n▪Гл.Администраторы▪\n'; 
		gl = '\n▪Администраторы▪\n'; 
		admins = '\n▪Модераторы▪\n'
		moders = '\n▪Премиум▪\n'; 
		vips = '\n▪Вип▪\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.level == 6) creat += `&#8195;👑 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			if (user.level == 5) devs += `&#8195;⚙ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			if (user.level == 4) gl += `&#8195;💎 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			if (user.level == 3) admins += `&#8195;🔹 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			if (user.level == 2) moders += `&#8195;🔹  @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			if (user.level == 1) vips += `&#8195;🔹  @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
			}
		}
		let text = `\n`;
		if (creat.length != 1) text += creat;
		if (devs.length != 24) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});
///////////////////////
vk.updates.hear(/^(?:verify)/i, message => {  
		let ver; 
		ver = 'Подтверждённые аккаунты: \n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.verify == true) ver += `&#8195;✅ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

			}
		}
		let text = `\n`;
		if (ver.length != 24) text += ver;
		return message.send(`${text}`);
	});
//////////////////////
///////////////////////
///////////////////////
vk.updates.hear(/^(?:agents)/i, message => {  
		if(acc.users[user_id(message.user)].level < 5) return;
		let agt; 
		agt = 'Агенты поддержки: \n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.agent == 2) agt += `&#8195;🆘 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

			}
		}
		let text = `\n`;
		if (agt.length != 24) text += agt;
		return message.send(`${text}`);
	});
////////////////////////
vk.updates.hear(/^(?:pay|передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !message.$match[2]) return message.send(` 👉 Пример команды: передать ID СУММА`) 
		let user = acc.users[user_id(message.user)]; 
			if(user.admin.block_pay == true) return message.send(`🔸У вас заблокированы переводы денег.`) 

		if(user.level < 1){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 5000000) return message.send(`💴 Максимальная сумма передачи 5.000.000$`) 
			} 
		if(user.level == 1){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 7000000) return message.send(`💴 Максимальная сумма передачи 7.000.000$`) 
			} 
		if(user.level == 2){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 10000000) return message.send(`💴 Максимальная сумма передачи 10.000.000$`) 
			} 
		if(user.level == 3){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 20000000) return message.send(`💴 Максимальная сумма передачи 20.000.000$`) 
			}
		if(user.level == 4){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 100000000) return message.send(`💴 Максимальная сумма передачи 100.000.000$`) 
			}
		if(user.level > 4){}
 
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.balance) return message.send(`👉 У вас нет столько $`);
	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 	
 	user.bloks.pay = true; 
		setTimeout(() => {
			user.bloks.pay = false;
	}, 600000);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]}$ `
	 });	
	return message.send(`💴 Вы успешно перевели ${acc.users[message.$match[1]].prefix}  ${message.$match[2]}$.`);
});
///////////////////////////
vk.updates.hear(/^(?:spay)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 У вас заблокированы передача валюты.`)  
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 Пример команды: spay ID СУММА`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 Некорректно введены данные`)
	if(message.$match[2] > user.bitcoin) return message.send(`👉 У вас нет столько Simcoins`);
	user.bitcoin -= Number(message.$match[2]);
	acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: ` 💴 Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} simcoins | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 Вы успешно перевели ${acc.users[message.$match[1]].prefix} ${message.$match[2]} simcoins.`);
});
/////// Банк////////////////////
 vk.updates.hear(/^(?:банк пополнить)\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(!message.$match[1]) return message.send(`👉 Пример команды: Банк пополнить [Сумма]`)
	if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
	if(message.$match[1] > user.balance) return message.send(`👉 У вас нет столько Денег.`);
	if(message.$match[1] < 100000) return message.send(`👉 Минимальная сумма вклада 100.000$`);
	if(message.$match[1] > 2000000000) return message.send(`👉 Нельзя положить больше 2.000.000.000$`);
	if(message.$match[1] > 2000000000) return message.send(`👉 Нельзя положить больше 2.000.000.000$`);
	if(user.bank_balance > 1999999999) return message.send(`👉 Максимальная сумма в банке 2.000.000.000$`)
	user.balance -= Number(message.$match[1]);
	user.bank_balance += Number(message.$match[1]);

 	return message.send(` 💴 Вы успешно положили в банк -> ${message.$match[1]}$.`);
});	
/////////////////////
vk.updates.hear(/^(?:банк снять)\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(!message.$match[1]) return message.send(`👉 Пример команды: Банк снять [Сумма]`)
	if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
	if(message.$match[1] > user.bank_balance) return message.send(`👉 В банке нету столько`);
	user.bank_balance -= Number(message.$match[1]);
	user.balance += Number(message.$match[1]);
 	
	return message.send(`💴 Вы успешно сняли с банка ${message.$match[1]}$.`);
});
////////////////////////
vk.updates.hear(/^(?:бизнес снять)\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(!message.$match[1]) return message.send(`👉 Пример команды: Бизнес снять [Сумма]`)
	if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
	if(user.bizs.one.balance < message.$match[1]) return message.send(`👉 На счету бизнеса нет столько`);
	user.bizs.one.balance -= Number(message.$match[1]);
	user.balance += Number(message.$match[1]);
 	
	return message.send(`💴 Вы успешно сняли с бизнеса ${message.$match[1]}$.`);
});
////////////////////
 	vk.updates.hear(/^(?:самолеты)\s?([0-9]+)?/i,(message) => {  
 	let user = acc.users[user_id(message.user)];  
		if(!message.$match[1]){
			return message.send(`
			🔸 1. Параплан (200.000$) 
			🔸 2. АН-2 (415.000$) 
			🔸 3. Cessna-172E (650.000$) 
			🔸 4. Supermarine Spitfire (860.000$) 
			🔸 5. BRM NG-5 (1.200.000$) 
			🔸 6. Cessna T210 (2.380.000$) 

			Для покупки введите "Самолеты [номер]"
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6]
 	let count = [0,200000,415000,650000,860000,1200000,2380000];
	let names = [0, 'Параплан ','АН-2','Cessna-172E','Supermarine Spitfire','BRM NG-5','Cessna T210']
 	if(i < 0 || i > 6) return;
 	if(user.aircraft != false) return message.send(`✈ У вас уже куплен самолет`);
 	if(i > 0 && i <= 6){
 		if(user.balance < count[i]) return message.send(`✈ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.aircraft = ids[i];
 		return message.send(`✈ Вы купили самолет (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
///////////////////
	vk.updates.hear(/^(?:самолет продать)/i,  (message) => {
		let count = [0, 100000,350000,700000,1000000,1400000,2600000];
		let user = acc.users[user_id(message.user)];
		if(user.aircraft == false) return message.send(`✈ ➾ У вас нет самолета`)
		let sum = count[user.aircraft] / 100 * 5;
		user.balance += sum;
		user.aircraft = false;
		return message.send(`✈ Вы продали свой самолет за ${sum}$`)
	});
////// Система машин
	vk.updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
			🔸1. Mercedes S-Class - 24.000.000$
			 🔸2. Volkswagen Phaeton - 32.000.000$
			🔸3. Lexus LS 430 - 40.000.000$
			🔸4. Skoda Rapid - 67.000.000$
			🔸5. Audi A8 -  71.000.000$
			🔸6. Range Rover - 80.000.000$
			🔸7. BMW X6 - 88.000.000$
			🔸8. Porsche Cayenne - 93.000.000$ 
			🔸9. BMW 7 Series - 100.000.000$
			 🔸10. Lexus LX - 125.000.000$
			 
			🚘 Для покупки напишите: Машины [номер] 
			👉 Машина продать - продать машину

			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0,24000000,32000000,40000000,67000000,71000000,80000000,88000000,93000000,100000000,125000000];
 	let names = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
 	if(i < 0 || i > 10) return;
 	if(user.cars != false) return message.send(`🚘 У вас уже куплена машина`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cars = ids[i]; 
 		return message.send(`🚘 Вы купили машину (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
//////////////////
	vk.updates.hear(/^(?:машина продать)/i, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`🚘 У вас нет машины`)
		let sum = count[user.cars] / 100 * 5;
		user.balance += sum; 
		user.cars = false; 
		return message.send(`🚘 Вы продали свой автомобиль за ${sum}$`)
	});
//////////////////////
	vk.updates.hear(/^(?:мотоциклы)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
🔸1. Honda CBR1000RR Fireblade - 700.000$ 
🔸2. Kawasaki KXF - 950.000$ 
🔸3. Harley-Davidson Fat Boy - 1.200.000$ 
🔸4. Lightning LS-218 - 2.300.000$ 
🔸5. Honda CB500F - 5.500.000$ 
🔸6. Harley-Davidson Road Glide - 9.000.000$ 
🔸7. Yamaha R1 - 13.100.000$ 
🔸8. Suzuki Hayabusa - 21.000.000$ 
🔸9. Honda VFR1200X Crosstourer - 34.000.000$ 
🔸10. Aprilia RS 125 - 42.000.000$
			 
			🛵 Для покупки напишите: Мотоциклы [номер] 
			👉 Мотоцикл продать - продать мотоцикл

			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0,700000,950000,1200000,2300000,5500000,9000000,13000000,21000000,34000000,42000000];
	 	let names = [0, 'Honda CBR1000RR Fireblade','Kawasaki KXF','Harley-Davidson Fat Boy','Lightning LS-218','Honda CB500F','Harley-Davidson Road Glide','Yamaha R1','Suzuki Hayabusa','Honda VFR1200X Crosstourer','Aprilia RS 125']
 	if(i < 0 || i > 10) return;
 	if(user.moto != false) return message.send(`🛵 У вас уже есть мотоцикл`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.moto = ids[i]; 
 		return message.send(`🛵 Вы купили мотоцикл  (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
//////////////////////
	vk.updates.hear(/^(?:мотоцикл продать)/i, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.moto == false) return message.send(`🛵 У вас нет мотоцикла`)
		let sum = count[user.moto] / 100 * 5;
		user.balance += sum; 
		user.moto = false; 
		return message.send(`🛵 Вы продали свой мотоцикл за ${sum}$`)
	});
////////////////////////
/////////////////////////////////////ФЕРМЫ///////////////////////////////////////////////////
vk.updates.hear(/^(?:ферминфо)/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let names = [0, '6U Nvidia','AntminerS9','FM2018-BT200']
	let ids = user_id(message.user);
	if(ferm[user_id(message.user)].ferm !== true) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас нет фермы`);
	if(!ferm[ids]) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас нет фермы`);
	if(ferm[ids]){
	return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), информация о ваших фермах
		🔸Название: ${names[ferm[ids].id]} 
		🔺Количество: ${spaces(ferm[ids].count)} 
		🔹Прибыль: ${ferm[ids].bitcoin} ฿/час`,
		{

		});
		}
});
////////////////////////////
	vk.updates.hear(/^(?:фермы)\s?([1-3]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
		return message.send(`
			@id${message.user}(${acc.users[user_id(message.user)].prefix}), фермы 
			🔸 1. 6U Nvidia 150฿/час (20.300.000$) 
			🔸 2. AntminerS9 500฿/час (50.000.000$) 
			🔸 3. FM2018-BT200 1500฿/час (130.000.000$) 

			✅Для покупки введите "Фермы [номер] [кол-во]" 
			➖Для продажи введите "Продать фермы" 
			⚠ (Продаются все фермы)

			❕Что бы посмотреть стат-ку своих ферм, введите "ферминфо" ❕
		`)
	}

	let one = message.$match[1]; 
	let two = message.$match[2]; 

	let ids = [0,1,2,3];
 	let counts = [0,150,500,1500]; 
 	let cena = [0,20300000,50000000,130000000];
 	let names = [0, '6U Nvidia','AntminerS9','FM2018-BT200']
 		if(!one || !two) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), пример команды "фермы [номер] [кол-во]"`);
 	if(two < 0 || two > 100) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), укажите количество ферм [1-100]`);
 		if(user.balance < Number(two) * Number(cena[one])) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас недостаточно денег на покупку фермы.`);
 	if(!ferm[user_id(message.user)]){
 		ferm[user_id(message.user)] = {
 			ferm: false,
 			id: false,
 			count: 0,
 			balance: 0,
 			bitcoin: 0
 		}
 	}
	let b = ferm[user_id(message.user)];
	if(b.count > 99) {
		 return message.send(`У вас куплено максимальное количество ферм [100]`);
	}
 	if(user.max_ferm - b.count < message.$match[2]) return message.send(`Максимальное кол-во ферм 100!`)
 	let a = ferm[user_id(message.user)];
 	if(a.ferm == false){
 		a.ferm = true;
 		a.id = Number(ids[one]);
 	}

 	if(a.ferm == true && a.id == one){
 		user.balance -= Number(two) * Number(cena[one]);
 		a.count += Number(two);
 		a.bitcoin += Number(counts[one]) * two;
 		return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), вы купили ферму ${names[one]}\n&#128267; Количество [${two}] за [${Number(two) * Number(cena[one])}$]\n&#128267; Прибыль увеличилась на: [${Number(counts[one]) * two}₿]`);

 	}else{
 		return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), покупать можно только один тип ферм.`);
 	}
 }); 
 	setInterval(() =>{
 		for(id in ferm){
 			 if(ferm[id].ferm == true && ferm[id].count > 0){
 			 	acc.users[id].bitcoin += Number(ferm[id].bitcoin);
 			 }
 		}
 	}, 3600000); 
//////////////////////
 	vk.updates.hear(/^(?:продать фермы)/i, (message) => {
let user = acc.users[user_id(message.user)];
if(ferm[user_id(message.user)].ferm !== true) return message.send('У вас нет фермы');
if(!ferm[user_id(message.user)]){
ferm[user_id(message.user)] = {
ferm: false,
id: false,
count: 0,
balance: 0,
bitcoin: 0
}
}
let a = ferm[user_id(message.user)];
let cena = [0,20300000,50000000,130000000];

acc.users[user_id(message.user)].balance += Number(a.count) * cena[a.id] / 2;
a.ferm = false;
a.id = false;
a.count = 0;
a.balance = 0;
a.bitcoin = 0;
return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), вы продали свои фермы.`);
});
/////////////////////
	vk.updates.hear(/^(?:яхта)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
		*id${message.user} (${acc.users[user_id(message.user)].prefix}), яхты: 
		🔸 1. Ванна (2.000$) 
		🔸 2. Nauticat 331 (1.000.000$) 
		🔸 3. Nordhavn 56 MS (6.000.000$) 
		🔸 4. Princess 60 (9.000.000$) 
		🔸 5. Azimut 70 (16.000.000$) 
		🔸 6. Dominator 40M (20.000.000$) 
		🔸 7. Moonen 124 (29.400.000$) 
		🔸 8. Wider 150 (36.230.000$) 
		🔸 9. Palmer Johnson 42M SuperSport (41.000.000$) 
		🔸 10. Wider 165 (53.350.000$)

		🛥 Для покупки введите: "Яхта [Номер]"
		🛥 Что бы продать яхту напишите: "Продать яхту"
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0,2000,1000000,6000000,9000000,16000000,20000000,29000000,36000000,41000000,53350000];
 		let names = [0, 'Ванна ','Nauticat 331','Nordhavn 56 MS','Princess 60','Azimut 70','Dominator 40M','Moonen 124','Wider 150','Palmer Johnson 42M SuperSport','Wider 165']
 	if(i < 0 || i > 10) return;
 	if(user.lodka != false) return message.send(`🛥 У вас уже куплена яхта`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.lodka = ids[i]; 
 		return message.send(`🛥 Вы купили яхту (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
/////////////////////
	vk.updates.hear(/^(?:продать яхту)/i, (message) => {
		let count = [0, 10000,10000000, 15000000,25000000,35000000,50000000,60000000,65000000,80000000,85000000];
		let user = acc.users[user_id(message.user)];
		if(user.lodka == false) return message.send(`🛥 У вас нет яхты`)
		let sum = count[user.lodka] / 100 * 5;
		user.balance += sum; 
		user.lodka = false; 
		return message.send(` 🛥 Вы продали яхту за ${sum}$`)
	});
////////////////////
	vk.updates.hear(/^(?:компьютер)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
		*id${message.user} (${acc.users[user_id(message.user)].prefix}), компьютеры
		🔸 1. Morex CASO-25  (100.000$)
		🔸 2. Zalman Z1 Black (5.000.000$)
		🔸 3. NUDT TH MPP (10.000.000$)
		🔸 4. Cray PC 16 core (25.000.000$)
		🔸 5. Hopper GTX 32 (35.000.000$)
		🔸 6. Pleiades  SGI ICE X (50.000.000$)
		🔸 7. Lindgren X8 E6 (60.000.000$)

		🖥 Для покупки введите: "Компьютер [Номер]"
		🖥 Что бы продать напишите: "Продать компьютер"
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7]
 	let count = [0, 100000,5000000, 10000000,25000000,35000000,50000000,60000000];
 	let names = [0, 'Morex CASO-25 60W','Zalman Z1 Black','NUDT TH MPP','Cray PC 16 core','Hopper - Cray XE6','Pleiades - SGI ICE X','Lindgren - Cray XE6']
 	if(i < 0 || i > 8) return;
 	if(user.pcc != false) return message.send(`🖥 У вас уже куплен компьютер`);
 	if(i > 0 && i <= 8){
 		if(user.balance < count[i]) return message.send(`🖥 У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.pcc = ids[i]; 
 		return message.send(`🖥 Вы купили компьютер (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
////////////////////////
	vk.updates.hear(/^(?:продать компьютер)/i, (message) => {
		let count = [0, 10000,10000000, 15000000,25000000,35000000,50000000,60000000];
		let user = acc.users[user_id(message.user)];
		if(user.pcc == false) return message.send(`🖥 У вас нет компьютера`)
		let sum = count[user.pcc] / 100 * 5;
		user.balance += sum; 
		user.pcc = false; 
		return message.send(`🖥 Вы продали компьютер за ${sum}$`)
	});
////////////////////////// ТЕЛЕФОНЫ///////////////////////////////////////////////////
	vk.updates.hear(/^(?:телефоны)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
			*id${message.user} (${acc.users[user_id(message.user)].prefix}), телефоны: 
			 🔸 1. Nokia 108 (250$)
			🔸 2. Nokia 3310 (2017) (500$)
			🔸 3. ASUS ZenFone 4 (2.000$)
			🔸 4. BQ Aquaris X (10.000$)
			🔸 5. Sony Xperia XA (15.000$)
			🔸 6. Samsung Galaxy S8 (30.000$)
			🔸 7. Xiaomi Mi Mix (50.000$)
			🔸 8. Torex FS1 (75.000$)
			🔸 9. iPhone X (100.000$)
			🔸 10. Мегафон С1 (250.000$)

			📱 Для покупки введите "Телефоны [номер]"
			 📱 Для продажи введите "Телефон продать"

			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0,250,500,2000,10000,15000,30000,50000,75000,100000,250000];
	 	let names = [0,'Nokia 108','Nokia 3310 (2017)','ASUS ZenFone 4','BQ Aquaris X','Sony Xperia XA','Samsung Galaxy S8','Xiaomi Mi Mix','Torex FS1','iPhone X','Мегафон С1']
 	if(i < 0 || i > 10) return;
 	if(user.phone != false) return message.send(`📱 У вас уже куплен телефон`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.phone = ids[i]; 
 		return message.send(` 📱 Вы купили телефон (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
/////////////////////////
	vk.updates.hear(/^(?:телефон продать)/i, (message) => {
		let count = [0,250,500,2000,10000,15000,30000,50000,75000,100000,250000];
		let user = acc.users[user_id(message.user)];
		if(user.phone == false) return message.send(`📱 У вас нет телефона`)
		let sum = count[user.phone] / 100 * 5;
		user.balance += sum; 
		user.phone = false; 
		return message.send(`📱 Вы продали свой телефон за ${sum}$`)
	});
///////////////////
////////////////////////
	vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(`⚠ Повторите попытку в ЛС группы ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`⚠ Повторите попытку: Репорт [жалоба]`);
		if(user.bloks.rep == true) return message.send(`❌ Вам запретили писать в репорт.`)
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);
		user.rep.status = true;
		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].agent >= 2){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
						message: `👉  Жалоба №${user_id(message.user)}: ${message.$match[1]}\n👉  [Для ответа: answer [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸  Вы успешно отправили жалобу, ожидайте ответа.`);
	});
//////////////////////////
	vk.updates.hear(/^(?:answer)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let i = message.$match[1];
		if(user.admin.block_rep == true) return message.send(`❌ Вам нельзя отвечать на репорты!`)
		if(user.agent < 2) return;
		if(acc.users[i].rep.status !== true) return message.send(`Данному игроку уже ответили на его жалобу!`)
			if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
		let a = zapret(message.$match[2]);
		if(a !== 0) return message.send(a); 
		acc.users[message.$match[1]].rep.status = false;
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
                    random_id: 0,
			message: `🔸Агент поддержки прислал вам ответ!\n\n➡ ${message.$match[2]}`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		ans_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;

		return message.send(`📩 Игрок принял ответ!`)
});
//////////////////////
	vk.updates.hear(/^(?:ans)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`❌ Вам нельзя отвечать на репорты!`)
		if(user.level < 5) return;
			if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
                    random_id: 0,
			message: `❇ Создатель ответил вам!\n\n➡ ${message.$match[2]}`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		ans_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`📩 Игрок принял ответ!`)
	});
////////////////////
	vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸  Пример команды: setnick [ID] [ИМЯ]`);
		if(user.level < 3) return;
		let zaprets1 = message.$match[2].toLowerCase();
			var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`✖Получше придумай что нибудь...`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`✖Вижу ты не адекватный, придумай получше.`);
		}

		if(message.$match[1] == 1) {
				user.warn += 1;
			return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		acc.users[message.$match[1]].prefix = message.$match[2];
		user.ainfo.nicks += 1;
		return message.send(`✔ Вы успешно сменили игроку ник: ${message.$match[2]}`);
	});
////////////////////
	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸  Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸ID Должен быть числового вида`);
		if(user.level < 3) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`⚠ Игрок не обнаружен в Базе Данных`);
		acc.users[message.$match[1]].ban = true; 
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `⛔ Вы были заблокированы Администратором навсегда.\n✅  Причина: ${message.$match[2]}`
		});
		if(message.$match[1] == 1) {
				user.warn += 2;
				return message.send(`Нельзя! Ты получаешь 2 варна сразу. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`⛔ Игрок [${acc.users[message.$match[1]].prefix}] BAN = TRUE.\n✅  Причина: ${message.$match[2]}`);
	}); 
 /////////////////
vk.updates.hear(/^(?:setmoney)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_give == true) return message.send(`🔸  У вас заблокирована выдача валюты.`)
	if(user.level < 1) return message.send(`ERROR`);
	if(user.bloks.giverub == true) return message.send(`💰 Повторите попытку через час.`);
	if(user.level == 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 500000) return message.send(`💰  Пример: 'setmoney [1$ - 500000$]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level == 2){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 3000000) return message.send(`💰  Пример: 'setmoney [1$ - 3000000$]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000) return message.send(`💰  Пример: 'setmoney [1$ - 10000000$]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level > 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 80000000) return message.send(`💰  Пример: 'setmoney [1$ - 80000000$]'`);
		user.balance += Number(message.$match[1]);
	}
	user.bloks.giverub = true;
		setTimeout(() => {
			user.bloks.giverub = false;
	}, 3600000);

	return message.send(`💰  Вы выдали себе ${spaces(message.$match[1])}$`);
});
///////////////
vk.updates.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰  Пример: 'giverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `💰 Вам было начислено ${spaces(message.$match[2])}$`
		});
		 	
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`✅ Игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] выдано ${spaces(message.$match[2])}$`);	 
});
//////////////
vk.updates.hear(/^(?:setrub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
		if(message.user !== 447690600) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰  Пример: 'giverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].donate += Number(message.$match[2]);

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вам начислено ${spaces(message.$match[2])}₽\n Спасибо за покупку!`
		});
		 	
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`✅ Игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] выдано ${spaces(message.$match[2])}₽`);	 
});
///////////////
vk.updates.hear(/^(?:removerub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰  Пример: 'removerub [ID]'`); 
			acc.users[message.$match[1]].balance = 0;

			vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `💰 У вас забрали все деньги.\n\n Возможные причины:\n✅ Вы получили их нечестным способом\n✅ Продавали валюту\n✅ Обманывали игроков.`
		});	

			return message.send(`💰  Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
///////////////
//////////////////////////
//////////////////////
//////////////////////

vk.updates.hear(/^(?:tempban)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`ERROR`);
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  mute [ID] [TIME(1-999)]`);
	let time = message.$match[2] * 60000;
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}
	var is = [user_id(message.user), message.text] 
		adm_log(is)
	let id = Number(message.$match[1])
	acc.users[id].mute = true;
	
		setTimeout(() => {
			acc.users[id].mute = false;
			vk.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `⏺  Временная блокировка была снята. :)`
			});
	}, time);
	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `⏺  ${user.prefix} временно заблокировал доступ к боту на [${message.$match[2]}] минут(ы).\n\n⏺  Через [${message.$match[2]}] минут блокировка пропадет.`
	});
	return message.send(`💰  Вы заблокировали временно доступ к боту игроку  [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/60000} минут`); 
});
////////////////////
vk.updates.hear(/^(?:untemp)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`ERROR`);
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`⏺  Проверьте вводимые данные:\n⏺  unmute [ID]`);
		var is = [user_id(message.user), message.text] 
		adm_log(is)
 	
	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺  Временная блокировка была снята досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰  Вы сняли блокировку игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
////////////////////////////// 
	vk.updates.hear(/^(?:статистика)\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 Статистика бизнесов: \n';
		if(user.bizs.one_biz == true){ text +=  `🏤 Бизнес: ${user.bizs.one.name}\n💰 Прибыль: ${spaces(user.bizs.one.zp)}$/час\n👥 Рабочих: ${user.bizs.one.people}/${user.bizs.one.max_peop}\n💰 На счету: ${spaces(user.bizs.one.balance)}$\n\n🔸 Что бы снять деньги с бизнеса, ввведите "Бизнес снять [кол-во]"`}
			return message.send(text)
	});
/////////////////////////
 vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
🔺1. Продавец ручек (1.000.000) | [15] 
 🔺2. Закусочная (5.000.000$) [30] 
🔺3. Бизнес в интернете (20.000.000$) [55] 
🔺4. Супермаркет (30.000.000$) [80] 
🔺5. Личная компания (50.000.000$) [100] 
🔺6. Магазин (70.000.000$) [150] 
🔺7. Ресторан (90.000.000$) [200] 
 🔺8. Компания Орифлейм (110.000.000$) [350] 
🔺9. Компания OK (130.000.000$) [500] 
🔺10. Компания ВКонтакте (210.000.000$) [600] 

🔸 Для покупки напишите: Бизнесы [номер] 
🔸 Для продажи напишите: Бизнес продат
🔸 Нанять [кол-во] - Нанять рабочих
🔸 Статистика - статистика бизнесов. 

⚠ Цена 1 рабочего - 50.000$ 
⚠ В квадратных скобках [ ] максимальное кол-во рабочих.
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 1000000, 5000000,20000000,30000000,50000000,70000000,90000000,110000000,130000000,210000000];
	let max_peop = [0,15,30,55,80,100,150,200,350,500,600]
 		let names = [0, 'Продавец ручек','Закусочная','Бизнес в интернете','Супермаркет','Личная компания','Магазин','Ресторан','Компания Орифлейм','Компания OK','Компания ВКонтакте'] 
 	if(i < 0 || i > 10) return message.send(`🏢 Неверный номер бизнеса.`)
 	if(!Number(message.$match[1])) return message.send(`🏢 Укажите номер бизнеса`)

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 У вас нет такой суммы.`);
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.balance = 0;
		user.bizs.one.max_peop = max_peop[i];
		return message.send(`🏢 Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	return message.send(`🏢 У вас уже куплен бизнес.`) 
 
 });
///////////////////

/////////////////////

///////////////////
////////////////////////
	vk.updates.hear(/^(?:бизнес продать)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false) return message.send(`🏢 У вас нет бизнеса.`)
			let sum = user.bizs.one.count / 100 * 5
			user.balance += sum;
			user.bizs.one_biz = false;
			user.bizs.one.count = false;
			user.bizs.one.id = false;
			user.bizs.one.name = false;
			user.bizs.one.people = 0; 
			user.bizs.one.zp = 0;
			user.bizs.one.balance = 0;
			user.bizs.one.max_peop = 0;

			return message.send(`🏢 Вы продали свой бизнес за ${sum}$`);	   
	});
///////////////////////////
	vk.updates.hear(/^(?:нанять)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
		if(!message.$match[1]) return message.send(`🏢 Укажите количество рабочих "Нанять [кол-во]"`)
			if(!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > 600) return message.send(`🏢 Неверно указаны данные. "Нанять [кол-во]"`)
		let id = user_id(message.user)
		let num = message.$match[2]; 
			if(message.$match[1] * 50000 > acc.users[id].balance) return message.send(`🏢 Для покупки [${message.$match[1]}] рабочих нужно [${message.$match[1] * 50000}$]`);
	    	if(acc.users[id].bizs.one_biz == false) return message.send(`🏢 ➾ У вас не куплен бизнес.`)
	   	 	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < message.$match[1]) return message.send(`  🏢 ➾ Максимальное количество работников: ${acc.users[id].bizs.one.max_peop}`)
	    	
		acc.users[id].bizs.one.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.one.zp += 20000 * Number(message.$match[1]);
	    	
		return message.send(`🏢 Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 20000}$`)

	});
//////////////////////////////
///////////////////////////
vk.updates.hear(/^(?:oon)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`🔸`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_game = true 
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы поставили ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:ooff)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		var is = [user_id(message.user), message.text] 
			adm_log(is)
		acc.users[message.$match[1]].block_game = false; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺  С вас сняты ограничения на ставки. :)`
	});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы сняли ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:offtop)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_top = true;

		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы отключили топ игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:ontop)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: ontop ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_top = false; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы включили топ игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////////
	vk.updates.hear(/^(?:ver)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: ver ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].verify = true;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Создатель бота подтвердил ваш аккаунт.`
		});

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы подтвердили аккаунт [${acc.users[message.$match[1]].prefix}]`);
	}); 
//////////////////////
	vk.updates.hear(/^(?:closerep)\s?([0-9]+)\s?([^]+)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.agent < 2) return message.send(``)
		if(!message.$match[2]) return message.send(`Укажите причину "closerep [ID] [Причина]"`)
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].rep.status = false;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❗ Ваш репопт закрыт. \n🔹Причина: ${message.$match[2]}`
		});
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✔ Репорт игрока [${acc.users[message.$match[1]].prefix}] закрыт!`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:unver)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unver ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].verify = false; 
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Аккаунт [${acc.users[message.$match[1]].prefix}] Больше не подтверждён.`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:setagent)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 461279728) return;
		acc.users[message.$match[1]].agent = 2;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Вас назначили агентом поддержки.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы назначили игрока [${acc.users[message.$match[1]].prefix}] Агентом поддержки.`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:unagent)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 461279728) return;
		acc.users[message.$match[1]].agent = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вас сняли с поста Агента поддержки.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Аккаунт [${acc.users[message.$match[1]].prefix}] снят с поста Агента поддержки.`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:banrep)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		acc.users[message.$match[1]].bloks.rep = true;
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы запретили [${acc.users[message.$match[1]].prefix}] писать в репорт`);
	}); 
//////////////////////////////////
	vk.updates.hear(/^(?:unrep)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!Number(message.$match[1])) return message.send(`🔸  ID должен быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].bloks.rep = false;

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Игроку [${acc.users[message.$match[1]].prefix}] можно писать в репорт`);
	}); 
////////////////////////////////////
	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unban ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].ban = false 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  ${user.prefix} разблокировал Вас.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы разблокировали игрока [${acc.users[message.$match[1]].prefix}]`);
	}); 
////////////////////
///////////////////////////////////
	vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸  Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 2) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		let text = `✅  ${user.prefix} выдал вам warn (предупреждение) [${message.$match[2]}]`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n 🔸  У вас 3 предупреждения.\n🔸  Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`✅  Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////////
	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(` 🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  Администратор снял Вам все предупреждения`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////////
vk.updates.hear(/^(?:vig)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 Пример команды: vig [ID] `);
		if(!Number(message.$match[1])) return message.send(`🔸 Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам админ-выговор.\n✅ После 3 вас снимет с админ-поста.`
		if(acc.users[message.$match[1]].ainfo.vig == 3){
			acc.users[message.$match[1]].ainfo.vig = 0;  
			acc.users[message.$match[1]].level = 0;
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 Вы лишились админ-прав.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`✅ Вы выдали выговор игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:unvig)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`Ошибка...`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Администратор снял Вам все выговоры`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы сняли все выговоры игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////////// 
	vk.updates.hear(/^(?:о боте)$/i, (message) => {
		let dev = '';   
		return message.send(`
💾 Информация о боте:
&#8195;🔹 Имя бота: ${config.bot}
&#8195;🔹 Версия: ${config.ver} 
&#8195;🔹 Пользователей: ${acc.number}
&#8195;🔹 Группа: ${config.group_url} 
&#8195;🌍  Сообщений боту: ${acc.msg}

&#8195;👤 Владелец: @id416199577 (Данил Зинкин)
&#8195;👷 Кодер: @daviderbaev (Давид Волков)
			`);
	});
//////////////////
vk.updates.hear(/^(?:баланс)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		*id${message.user} (${acc.users[user_id(message.user)].prefix}), на руках:
		💲 Dollars: ${spaces(user.balance)}$ [${utils.rn(user.balance)}]
		🔋 Baincoins: ${spaces(user.bitcoin)}
		💳 RUB: ${spaces(user.donate)}₽
		💰 Счёт в банке: ${spaces(user.bank_balance)}$

		🔎 ID: ${user_id(message.user)} 
		        `);
});
//////////////
vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warn_p = '';
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warn_p += `&#8195;❗  ${user.warn_p[i]}\n`}
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸  Проверьте вводимые данные.`);
	if(message.$match[1] == 1) return message.send(`🔸  Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warn_p += `⛔  ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
		Игрок: ${id.prefix}

		🔎 ID: ${message.$match[1]}
		🔹 VK: @id${id.id}(${id.prefix})
		💲 Dollars: ${spaces(id.balance)} [${utils.rn(id.balance)}]
		🔋 Baincoins: ${spaces(id.bitcoin)}
		💰 Счёт в банке: ${spaces(id.bank_balance)}$ [${utils.rn(id.bank_balance)}]
		🔺 	Status: ${id.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "Вип").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
		⏰ Дата регистрации: ${id.rtime}

        		🔹 Выговоров: [${id.ainfo.vig}]
		⚠ Предупреждений: [${id.warn}] 
		🔺 Причины:
		${id.warn_p}
		----------------------
 		`+(id.giverub == false ? `giverub: ${id.bloks.giverub}\n` : `giverub: ${id.bloks.giverub}\n`)+
		(id.mute == false ? `mute: ${id.mute}\n` : `mute: ${id.mute}\n`)+
		(id.ban == false ? `ban: ${id.ban}\n` : `ban: ${id.ban}\n`)+
		(id.block_top == false ? `off_top: ${id.block_top}\n` : `off_top: ${id.block_top}\n`)+
		(id.bloks.rep == false ? `banrep: ${id.bloks.rep}\n` : `banrep: ${id.bloks.rep}\n`)+
		(id.bloks.pay == false ? `banpay: ${id.bloks.pay}\n` : `banpay: ${id.bloks.pay}\n`)+`
		`);
	});
/////////////////////////
/////////////////////////
vk.updates.hear(/^(?:профиль|проф|profile|прф)\s?([0-9]+)?/i, (message) => { 
	let pc = [0, 'Morex CASO-25 60W','Zalman Z1 Black','NUDT TH MPP','Cray PC 16 core','Hopper - Cray XE6','Pleiades - SGI ICE X','Lindgren - Cray XE6']	 ;
		let mt = [0, 'Honda CBR1000RR Fireblade','Kawasaki KXF','Harley-Davidson Fat Boy','Lightning LS-218','Honda CB500F','Harley-Davidson Road Glide','Yamaha R1','Suzuki Hayabusa','Honda VFR1200X Crosstourer','Aprilia RS 125'];
	let grg = [0, 'Контейнер ','Деревянный гараж','Во дворе','Ангар','Автостоянка','В белом доме Путина'] ;
	let pt = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова'];
		let pr = [0, 'Atari 2600','Nes (Aka Dendy)','Sega Genesis','Nintendo Snes','Sony Playstation','Nintendo 64','Sony Playstation-2','Microsoft XBOX 360','Sony Playstation-3','Nintendo Wii'];
		let cars =[0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX'];
		let yah = [0, 'Ванна','Nauticat 331','Nordhavn 56 MS','Princess 60','Dominator 40M','Moonen 124','Wider 150','Porsche Cayenne','Palmer Johnson 42M SuperSport','Wider 165'];
	 	let kv = [0,'Чердак','Квартира в общежитии','Однокомнатная квартира','Двухкомнатная квартира','Четырехкомнатная квартира','Квартира в центре Москвы','Двухуровневая квартира','Квартира с Евроремонтом'] ;
		let ph = [0,'Nokia 108','Nokia 3310 (2017)','ASUS ZenFone 4','BQ Aquaris X','Sony Xperia XA','Samsung Galaxy S8','Xiaomi Mi Mix','Torex FS1','iPhone X','Мегафон С1'] ;
	let air = [0, 'Параплан ','АН-2','Cessna-172E','Supermarine Spitfire','BRM NG-5','Cessna T210'];
	let gen = [0, 'JSGEN-4000']
	let pref = [0, 'Яичко','ФиФа','Бомжик','НяШкА','УбийцА','🔱Butterfly🔱','♥LOVE♥','💢DEBUG💢','👥DELETED👥','💠ADMIN💠']
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user);

	let warn_p = '';
	for(i=0;i<user.warn_p.length;i++){warn_p += `&#8195;❗  ${user.warn_p[i]}\n`}
	if(!message.$match[1]){
		return message.send(`
		`+(user.fix === false ? `` : `[${user.fix}]`)+` *id${message.user} (${acc.users[user_id(message.user)].prefix}), ваш профиль:
		🔎 ID: ${user_id(message.user)}
		💲 Dollars: ${spaces(user.balance)}$ [${utils.rn(user.balance)}]
		`+(user.global_exs < 1 ? `` : `👑 Рейтинг: ${spaces(user.global_exs)}\n`)+
		``+(user.bitcoin < 1 ? `` : `🔋 Simcoin: ${spaces(user.bitcoin)}\n`)+
		``+(user.bank_balance < 1 ? `` : `💰 Счёт в банке: ${spaces(user.bank_balance)}$ [${utils.rn(user.bank_balance)}]\n`)+
		``+(user.donate < 1 ? `` : `💳 RUB: ${spaces(user.donate)}₽\n`)+
			`🔺 Status: ${user.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}
		`+(user.agent == 0 ? `` : `👤 Должность: 🆘SUPPORT🆘\n`)+ 
		`
		`+(user.frac_name === false ? `` : `⠀⠀⚡ Компания: ${user.frac_name}\n`)+  
		``+(user.bizs.one_biz === false ? `` : `⠀⠀🏠 Бизнес: ${user.bizs.one.name}\n`)+  
		``+(user.aircraft === false ? `` : `⠀⠀✈ Самолет:  ${air[user.aircraft]}\n`)+
		(user.cars === false ? `` : `⠀⠀🚘 Транспорт: ${cars[user.cars]}\n`)+ 
		(user.moto === false ? `` : `⠀⠀🛵 Мотоцикл: ${mt[user.moto]}\n`)+ 
		(user.garage === false ? `` : `⠀⠀🏚 Гараж: ${user.garage}\n`)+ 
		(user.restoran === false ? `` : `⠀⠀🏨 Ресторан: ${user.restoran}\n`)+ 
		(user.prist === false ? `` : `⠀⠀🕹 Приставка: ${user.prist}\n`)+ 
		(user.lodka === false ? `` : `⠀⠀🛥 Яхта: ${yah[user.lodka]}\n`)+ 
		(user.phone === false ? `` : `⠀⠀📱 Телефон: ${ph[user.phone]}\n`)+ 
		(user.pcc === false ? `` : `⠀⠀🖥 Компьютер: ${pc[user.pcc]}\n`)+ 
		(user.house === false ? `` : `⠀⠀🏡 Дом: ${user.house}\n`)+  
		 (user.kv === false ? `` : `⠀⠀🌇 Квартира: ${kv[user.kv]}\n`)+ 
		(user.pit === false ? `` : `⠀⠀🐼 Питомец:  ${pt[user.pit]}\n`)+
		`
		➕Выиграно: ${spaces(user.wins)}$	
		➖Проиграно: ${spaces(user.loses)}$

		〽 Состояние здоровья:
		⠀⠀❤ Здоровье: ${user.health}%
		⠀⠀👔 Гигиена: ${user.gigiena}%
		⠀⠀🚽 Нужда: ${user.need}%
	
		` +(user.verify === false ? `` : `✅ VERIFIED ✅\n`)+ 
		`🌍 Ранг: ${user.tag} [${user.msg.messages}]
		👪 Пригласил друзей: ${user.refs}
		⚠ Предупреждений: [${user.warn}] 
		`+(user.ainfo.vig < 1 ? `🔹 Выговоров не обнаружено.\n` : `🔹 Выговоров: [${user.ainfo.vig}]\n`)+
        `⏰ Дата регистрации: ${user.rtime}
		`) 
	}else{
		if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸  Проверьте вводимые данные.`);
		if(!!acc.users[1]) return message.send(`🔸  Проверьте вводимые данные.`);
		let id = acc.users[message.$match[1]];
		return message.send(`
			📋 Информация об игроке [${id.prefix}] 📋
			🔹 VK: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})
			💲 Dollars: ${spaces(id.balance)} [${utils.rn(id.balance)}]
			🔋 Baincoins: ${spaces(id.bit)}
				🔹 Status: ${id.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}
			`);
		} 
});
//////////////////////////////////////////
//////////////////////////
cmd.hear(/^(?:холодильник)/i, (message) => {
	let user = acc.users[user_id(message.user)];
 		return message.send(`
[] » Вода/Напитки и т.д « []

[☕] » Коффи: ${user.coffe}
[🍵] » Чая: ${user.tea}
[🍺] » Пива » ${user.pivo}

[] » Еда « []

[🍟] » Картошка фри: ${user.kartoxa}
[🍔] » Бургеров: ${user.burg}
[🍲] » Супа: ${user.sup}

[✔] » Что бы подкрепиться, напишите "Съесть [Картошку/бургер/суп]"
[✔] » Что бы выпить кофе и т.п напишите "Выпить [Кофе/Чай/Пиво]"
[✔] » Что бы попить, напишите "Выпить лимонад"
`)
});
///////////////////////////
cmd.hear(/^(?:ванная|ваная)/i, (message) => {
	let user = acc.users[user_id(message.user)];
 		return message.send(`
🍙 Мыло: ${user.milo}
💈 Шампунь: ${user.shampun}
🔖 Порошок: ${user.poroshok}
🎐 Зубная паста: ${user.pasta} 

[✔] » Чтобы уменьшить нужды напишите "Сходить в туалет"
[✔] » Что бы помыться, напишите "Помыться"
[✔] » Что бы почистить зубы, напишите "Почистить зубы"
[✔] » Что бы постирать вещи, напишите "Постирать вещи"
`)
});

////////////////////////////

cmd.hear(/^(?:продукты)/i, (message) => {
	let user = acc.users[user_id(message.user)];
 		return message.send(`
			 *id${message.user} (${user.prefix}), продукты:
[] » Напитки/Вода и т.д « []

☕ Коффи | (+10% ❤) | (-5% нужды) | (5.000$)
🍵Чай | (+25% ❤) | (-10% нужды) | (25.000$)
🍺 Пиво | (+45% ❤) | (-20% нужды) | (50.000$)
 
[] » Еда « []

🍟 Картошка Фри | (+5% ❤) | (15.000$)
🍔 Бургер | (+ 15% ❤) | (50.000$) 
🍲 Суп | (+ 30% ❤) | (100.000$)

🔹 Для покупки напитков и т.д, напишите "Купить [кофе/чай/пиво] [кол-во]"
🔹 Для покупки еды, напишите "Купить [картошку/бургер/суп] [кол-во]"
 			`);
});
///////////////////////////////
cmd.hear(/^(?:хозтовары)/i, (message) => {
	let user = acc.users[user_id(message.user)];
 		return message.send(`
			*id${message.user} (${user.prefix}), хозтовары:
🍙 Мыло | (+10% 👔) | (15.000$)
💈 Шампунь | (+ 10% 👔) | (25.000$) 
🔖 Порошок | (+ 10% 👔) | (35.000$)
🎐 Зубная паста | (+ 10% 👔) | (50.000$)

🔹 Для покупки, напишите "Купить [мыло/шампунь/порошок/пасту] [кол-во]"
 			`);
});
////////////////////////////////
	cmd.hear(/^(?:помыться)\s?([0-9]+)?/i, (message) => {
       let user = acc.users[user_id(message.user)];
		if(user.shampun < 1 || user.milo < 1) return message.send(`🛢 У вас нет шампуня/мыла что бы помыться.`)
		if(user.gigena > 99) return message.send(`🛢 Вам не нужно мыться`)
		user.shampun -= 1;
		user.milo -= 1;
		user.gigiena += 10;
		return message.send(`🛢 Вы помылись и потратили 1 шампунь и мыло. +10% к гигииене.`);
	});
////////////////////////////////
	cmd.hear(/^(?:почистить зубы)\s?([0-9]+)?/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.pasta < 1) return message.send(`[🎐] » У вас нет зубной пасты что бы почистить зубы.`)
		if(user.hygiene > 99) return message.send(`[🎐] » Вам не нужно чистить зубы.`)
		user.pasta -= 1;
		user.gigiena += 10;
		return message.send(`🎐 Вы почистили зубы  и израсходовали 1 пасту. +10% к гигииене.`);
	});

////////////////////////////////
	cmd.hear(/^(?:постирать вещи)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.poroshok < 1) return message.send(`[💈] » У вас нет порошка что бы постирать вещи.`)
		if(user.gigiena > 99) return message.send(`[💈] » Вам не нужно стирать вещи.`)
		user.gigiena += 10;
		user.poroshok -= 1;
		return message.send(`🔖 Вы постирали вещи  и израсходовали 1 порошок. +10% к гигииене.`);
	});
////////////////////////////////

cmd.hear(/^(?:съесть картошку)\s?([0-9]+)?/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.burg < 1) return message.send(`[🍟] » У вас нет картошки что бы съесть её.`)
		if(user.health > 99) return message.send(`[🍟] » Вы не голодны`)
		user.kartoxa -= 1;
		user.health += 5;
		return message.send(`[🍔] » Вы съели 1 картошку. +5% к здоровью.`);
	});

  cmd.hear(/^(?:съесть бургер)\s?([0-9]+)?/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.burg < 1) return message.send(`[🍔] » У вас нет бургеров что бы съесть её.`)
		if(user.health > 99) return message.send(`[🍔] » Вы не голодны`)
		user.burg -= 1;
		user.health += 15;
		return message.send(`[🍔] » Вы съели 1 бургер. +15% к здоровью.`);
	});
////////////////////////////////
	cmd.hear(/^(?:съесть суп)\s?([0-9]+)?/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.sup < 1) return message.send(`[🍲] » У вас нет супа.`)
		if(user.health > 99) return message.send(`[🍲] » Вы не голодны`)
		user.sup -= 1;
		user.health += 30;
		return message.send(`[🍲] » Вы съели 1 суп. +30% к здоровью.`);
	});
////////////////////////////////

cmd.hear(/^(?:Выпить чай|Выпить чаю|Выпить чая|Выпить чайа)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.tea < 1) return message.send(`[🍵] » У вас нет чая.`)
		if(user.health > 99) return message.send(`[🍵] » Вам не нужно пить.`)
		user.tea -= 1;
        user.need -= 10;
		user.health += 25;
		return message.send(`[🍵] » Вы выпили 1 чай. +25% к здоровью и -10% нужды.`);
	});

cmd.hear(/^(?:Выпить пиво|Выпить пива|Выпить пивасика|Выпить пивчика)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.pivo < 1) return message.send(`[🍺] » У вас нет пива.`)
		if(user.health > 99) return message.send(`[🍺] » Вам не нужно пить.`)
		user.pivo -= 1;
        user.need -= 20;
		user.health += 45;
		return message.send(`[🍺] » Вы выпили 1 пиво. +30% к здоровью и -30% нужды.`);
	});

	cmd.hear(/^(?:Выпить кофе|Выпить коффе|Выпить кофи|Выпить коффи)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(user.coffe < 1) return message.send(`[☕] » У вас нет кофе.`)
		if(user.health > 99) return message.send(`[☕] » Вам не нужно пить.`)
		user.coffe -= 1;
        user.need -= 5;
		user.health += 30;
		return message.send(`[🍵] » Вы выпили 1 кофе. +30% к здоровью.`);
	});
////////////////////////////////
	cmd.hear(/^(?:Сходить в туалет|Справить нужду)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
        let ned = utils.random(10, 15)
		if(user.need > 99) return message.send(`🚽 Вам не нужно этого делать`)
		user.need += ned;
		return message.send(`[🚽] » Вы справили нужду и получили +${ned}% к нужде`);
	});
////////////////////////////////
	cmd.hear(/^(?:купить кофе|купить коффи|купить коффе)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[☕] » Укажите количество кофе.`);
		if(user.balance < message.$match[1] * 15000) return message.send(`[☕] » Для покупки ${message.$match[1]} кофе, нужно ${message.$match[1] * 15000}$`)
		user.balance -= Number(message.$match[1] * 15000);
		user.coffe += Number(message.$match[1]);
		return message.send(`[☕] » Вы успешно купили ${utils.sp(message.$match[1])} кофе за ${utils.sp(Number(message.$match[1]) * 15000)}$`);
	});

vk.updates.hear(/^(?:купить чай|купить чая|купить чаю)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍵] » Укажите количество чая.`);
		if(user.balance < message.$match[1] * 15000) return message.send(`[🍵] » Для покупки ${message.$match[1]} чая, нужно ${message.$match[1] * 25000}$`)
		user.balance -= Number(message.$match[1] * 25000);
		user.tea += Number(message.$match[1]);
		return message.send(`[🍵] » Вы успешно купили ${utils.sp(message.$match[1])} чая за ${utils.sp(Number(message.$match[1]) * 25000)}$`);
	});

vk.updates.hear(/^(?:купить пиво|купить пива|купить пивасик)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍺] » Укажите количество пива.`);
		if(user.balance < message.$match[1] * 50000) return message.send(`[🍺] » Для покупки ${message.$match[1]} пива, нужно ${message.$match[1] * 50000}$`)
		user.balance -= Number(message.$match[1] * 50000);
		user.pivo += Number(message.$match[1]);
		return message.send(`[🍺] » Вы успешно купили ${utils.sp(message.$match[1])}пива за ${utils.sp(Number(message.$match[1]) * 50000)}$`);
	});

////////////////////////////////////////////

vk.updates.hear(/^(?:купить картошку|купить картошку фри)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍟] » Укажите количество картошки.`);
		if(user.balance < message.$match[1] * 15000) return message.send(`[🍟] » Для покупки ${message.$match[1]} картошки, нужно ${message.$match[1] * 15000}$`)
		user.balance -= Number(message.$match[1] * 15000);
		user.burg += Number(message.$match[1]);
		return message.send(`[🍟] » Вы успешно купили ${utils.sp(message.$match[1])} картошки за ${utils.sp(Number(message.$match[1]) * 15000)}$`);
	});

	vk.updates.hear(/^(?:купить бургер)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍔] » Укажите количество бургеров.`);
		if(user.balance < message.$match[1] * 50000) return message.send(`[🍔] » Для покупки ${message.$match[1]} бургеров, нужно ${message.$match[1] * 50000}$`)
		user.balance -= Number(message.$match[1] * 50000);
		user.burg += Number(message.$match[1]);
		return message.send(`[🍔] » Вы успешно купили ${utils.sp(message.$match[1])} бургеров за ${utils.sp(Number(message.$match[1]) * 50000)}$`);
	});
///////////////////////////////////////////
	vk.updates.hear(/^(?:купить суп)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍲] » Укажите количество супа.`);
		if(user.balance < message.$match[1] * 150000) return message.send(`[🍲] » Для покупки ${message.$match[1]} супа, нужно ${message.$match[1] * 150000}$`)
		user.balance -= Number(message.$match[1] * 150000);
		user.sup += Number(message.$match[1]);
		return message.send(`[🍲] » Вы успешно купили ${utils.sp(message.$match[1])} супа за ${utils.sp(Number(message.$match[1]) * 150000)}$`);
	});
////////////////////////////////////////////
	cmd.hear(/^(?:купить мыло)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🍙] » Укажите количество мыла.`);
		if(user.balance < message.$match[1] * 15000) return message.send(`[🍙] » Для покупки ${message.$match[1]} мыла, нужно ${message.$match[1] * 15000}$`)
		user.balance -= Number(message.$match[1] * 15000);
		user.milo += Number(message.$match[1]);
		return message.send(`[🍙] » Вы успешно купили ${utils.sp(message.$match[1])} мыла за ${utils.sp(Number(message.$match[1]) * 15000)}$`);
	});
////////////////////////////////
cmd.hear(/^(?:купить шампунь|купить шомпунь)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[💈] » Укажите количество шампуня.`);
		if(user.balance < message.$match[1] * 25000) return message.send(`[💈] » Для покупки ${message.$match[1]} шампуня, нужно ${message.$match[1] * 25000}$`)
		user.balance -= Number(message.$match[1] * 25000);
		user.shampun += Number(message.$match[1]);
		return message.send(`[💈] » Вы успешно купили ${utils.sp(message.$match[1])} шампуня за ${utils.sp(Number(message.$match[1]) * 25000)}$`);
	});

cmd.hear(/^(?:купить порошок|купить парошок)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🔖] » Укажите количество порошка.`);
		if(user.balance < message.$match[1] * 35000) return message.send(`[🔖] » Для покупки ${message.$match[1]} мыла, нужно ${message.$match[1] * 35000}$`)
		user.balance -= Number(message.$match[1] * 35000);
		user.poroshok += Number(message.$match[1]);
		return message.send(`[🔖] » Вы успешно купили ${utils.sp(message.$match[1])} порошка за ${utils.sp(Number(message.$match[1]) * 35000)}$`);
	});
//////////////////////////////
vk.updates.hear(/^(?:купить пасту|купить зубную пасту)\s([0-9]+)$/i, (message) => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`[🎐] » Укажите количество пасты.`);
		if(user.balance < message.$match[1] * 50000) return message.send(`[🎐] » Для покупки ${message.$match[1]} пасты, нужно ${message.$match[1] * 50000}$`)
		user.balance -= Number(message.$match[1] * 50000);
		user.poroshok += Number(message.$match[1]);
		return message.send(`[🎐] » Вы успешно купили ${utils.sp(message.$match[1])} пасты за ${utils.sp(Number(message.$match[1]) * 50000)}$`);
	});
/////////////////////////////
/////////////////////////////////////////
		vk.updates.hear(/^(?:trub)$/i,  (message) => {
		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
		tops.push({
			id: i,
			idvk: acc.users[i].id,
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
					idvk: tops[g].idvk,
					donate: tops[g].donate,
					smile: `${ups}`
				})
			}
		}
		var people = " Топ по ₽ (Рублям):\n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.donate) + "₽").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});
//////////////////////
	vk.updates.hear(/^(?:топ)$/i,  (message) => {
		let text = ``;
		var tops = []
		var tp = []
		for (i=0;i<200000;i++) {

			if(acc.users[i]){
			if(acc.users[i].level < 4 && acc.users[i].block_top == false){ 
				tops.push({
					id: i,
					idvk: acc.users[i].id,
					balance: acc.users[i].balance
					})
				}
			}  
		}
for (i=0;i<200000;i++) {
		if(acc.users[i]){
			if(acc.users[i].level < 4 && acc.users[i].block_top === false){
			tp.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
				});
			}
		} 
	}

	tp.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1;
			if (b.lvl < a.lvl) return -1;
			return 0;
		});

		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var ao = [];
		for (var g = 0; g < 5; g++) {
			if (tp.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`;
				if(g == 9) ups = `&#8195;&#128287;`;
				ao.push({
					id: tp[g].id,
					idvk: tp[g].idvk,
					lvl: tp[g].lvl,
					smile: `${ups}`
				});
			}
		}
		var yo = []
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`
				if(g == 9) ups = `&#8195;&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💸 Топ баланс\n" + yo.map(a => a.smile + "[id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + "$").join("\n")
		var rating = "👑 Топ рейтинг\n" + ao.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n");
		text += `${people}\n\n➖➖➖➖➖➖➖➖➖➖\n\n${rating }`; 
		message.send(text);
	});
//////////////////////////
//////////////////////////////////ИГРЫ///////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:монетка)\s?([^]+)?\s([^\s	].*)/i,  message => {
		if(!message.$match[1]) return message.send(`⚠ Монетка [орел/решка] [ставка]`) 
		let amount = parserInt(message.$match[2]); 
		amount = Math.round(amount); 
		let id = user_id(message.user) 
		if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`); 
		let user = acc.users[user_id(message.user)]; 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`⚠Ставка не может превышать баланс или быть ниже 1$`); 
		if(user.block_game == true && user.level < 2){ 
		if (amount > 500000) return message.send(`⚠ Ставка не должна быть больше 500.000$`); 
		}
		 	if(message.$match[1].toLowerCase() == 'орел'){
				if(rand(1,2) == 1){ 
					let i = "🔸 Вам попался орёл"
					user.wins += amount;
					user.balance += amount;
						return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}else{
					let i = "🔹 Вам попалась решка"
					user.loses += amount;
					user.balance -= amount;
					return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
				}
			}
			if(message.$match[1].toLowerCase() == 'решка'){ 
				if(rand(1,2) == 1){ 
					let i = "🔹 Вам попалась решка"
					user.wins += amount;
					user.balance += amount;

						return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}else{ 
					let i = "🔸 Вам попался орёл"
					user.loses += amount;
					user.balance -= amount;
					return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
				}
			}
	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {
        if(!message.$match[1]) return message.send(`⚠ укажите ставку`); 
let amount = Number(parserInt(message.$match[1])); 
amount = Math.round(amount); 
let user = acc.users[user_id(message.user)]; 
if (amount > user.balance || amount < 1 ) return message.send(`⚠ Недостаточно средств`); 
if(user.block_game == true && user.level < 2){ 
if (amount > 500000 && amount != user.balance) return message.send(`❗ Максимальная ставка 500.000$`);
 	}
	if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё'){ 
	if (user.balance < 1 ) return message.send(`⚠ Похоже у тебя нету денег =)`); 
	amount = user.balance; 
}else{ 
	let amount = parserInt(message.$match[1]); 
	}
if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`); 

	let loser = [0.5,1,1.5].random();
	let mnojitel = [0.5,1,1.5,2,5].random();
	let win = ['🌚|🌚|🌚','🔸|🔸|🔸'].random();
	let lose = [' 🌚|🎉|🔸','🔸|🎉|🔸'].random();
 
      if(rand(1,2) == 2){
	user.wins += amount;
            let balance = amount;
            let win_balance = amount * mnojitel;
            win_balance = Math.round(win_balance)
            user.balance += Number(win_balance)
            return message.send(`😃 Вы выиграли ${utils.sp(win_balance)}$ (${mnojitel}x)`); 
}else{ 
user.loses += amount;
user.balance -= amount; 
return message.send(`👎 Вы проиграли ${utils.sp(amount)}$ `);
	}
   }); 
///////////////////
	vk.updates.hear(/^(?:азино)\s?([^\s ].*)?/i, (message) => {
	    let user = acc.users[user_id(message.user)];
	    if (!message.$match[1]) return message.send(`🔸 укажите ставку`);
	    let amount = parserInt(message.$match[1]);
	    amount = Math.round(amount);
	    if (user.block_game == true && user.level < 2) {
	        if (amount > 500000) return message.send(`⚠ Ставка не должна быть больше 500.000$`);
	    }
	    if (message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё') {
	        if (user.balance < 1) return message.send(`⚠ Похоже у тебя нету денег =)`);
	        amount = user.balance;
	    } else {
	        let amount = parserInt(message.$match[1]);
	    }
	    if (!Number(amount) || amount < 0 || amount > acc.users[user_id(message.user)].balance) return message.send(`🔸 ставка должна быть числового вида`);
	    acc.users[user_id(message.user)].balance -= Number(amount);
	    let text = '';
	    let smile = {
	        "1": "🎰",
	        "2": "🍋",
	        "3": "🍒"
	    };
	    let block = {
	        four: false,
	        five: false,
	        six: false,
	    };
	    count_1 = 0;
	    count_2 = 0;
	    count_3 = 0;
	    for (i in block) {
	        block[i] = rand(1, 3);
	    }
	    if (block.four == block.five && block.five == block.six) {
	        count_2 += 1;
		user.wins += amount;
	        user.balance += amount * 2;
	    }

	    function smiles() {
	        for (a in block) {
	            block[a] = smile[block[a]];
	        }
	    }
	    smiles();
	    return message.send(` 
						╔➖➖➖╗ 
						║${block.four} ${block.five} ${block.six}║ 
						╚➖➖➖╝ 
						- - - - 
						${count_2.toString().replace(/0/gi, "").replace(/1/gi, `🎉 вы выиграли ${amount * 2}$ 💰`)} 
	`);
	});
///////////////////
vk.updates.hear(/^(?:слоты)\s?([^\s ].*)?/i, message => {
    let user = acc.users[user_id(message.user)];
    if (!message.$match[1]) return message.send(`🎰 укажите ставку`);
    let amount = parserInt(message.$match[1]);
    if (!Number(amount) || amount < 0) return message.send(`🎰 ставка не число`);
    if (amount > acc.users[user_id(message.user)].balance) return message.send(`🎰 Ставка > баланса`);
    if (message.$from.type != 'user') return message.send(`🎰 Эта игра доступна только в ЛС группы`);
	if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё'){ 
	if (user.balance < 1 ) return message.send(`⚠ Похоже у тебя нету денег =)`); 
	amount = user.balance; 
}else{ 
	let amount = parserInt(message.$match[1]); 
	}
    amount = Math.round(amount);
    let text = '';
    let chat = message.user;

    vk.api.call('messages.send', {
            peer_id: chat,
            message: `🎰🎰🎰`
        })
        .then((res) => {
            let rez = [{
                    id: 1,
                    smile: '🔺🔺🔺',
                    win: true
                },
                {
                    id: 2,
                    smile: '🔹🔹🔹',
                    win: true
                },
                {
                    id: 3,
                    smile: '🔸🔸🔸',
                    win: true
                },
                {
                    id: 4,
                    smile: '🔸🔸🔹',
                    win: false
                },
                {
                    id: 5,
                    smile: '🔹🔸🔸',
                    win: false
                },
                {
                    id: 6,
                    smile: '🔹🔹🔸',
                    win: false
                },
                {
                    id: 7,
                    smile: '🔸🔹🔹',
                    win: false
                },
                {
                    id: 8,
                    smile: '💯💯💯',
                    win: true
                },
                {
                    id: 9,
                    smile: '💯❌ 💯',
                    win: false
                },
                {
                    id: 10,
                    smile: '💯 💯❌',
                    win: false
                },
                {
                    id: 11,
                    smile: '❌💯💯',
                    win: false
                },
                {
                    id: 12,
                    smile: '❤❤❤',
                    win: true
                },
                {
                    id: 13,
                    smile: '🖤❤🖤',
                    win: false
                },
                {
                    id: 14,
                    smile: '❤🖤🖤',
                    win: false
                },
                {
                    id: 15,
                    smile: '🖤 🖤🖤 ',
                    win: false
                }
            ]
            let chet = 0;
            for (i = 700; i < 4900; i += 700) {
                let r = rez.random();
                setTimeout(() => {
                    chet += 1;
                    if (chet == 6) {
                        if (r.win == true) {
                            acc.users[user_id(message.user)].balance += Number(amount);
	acc.users[user_id(message.user)].wins += Number(amount);
                            vk.api.call('messages.edit', {
                                peer_id: chat,
                                message: r.smile + `\n🎰 Вы победили!\n💎 Вы выиграли: ${amount}$`,
                                message_id: res
                            })
                            return;
                        } else {
                            acc.users[user_id(message.user)].balance -= Number(amount);
	acc.users[user_id(message.user)].loses += Number(amount);
                            vk.api.call('messages.edit', {
                                peer_id: chat,
                                message: r.smile + `\n🎰 Вы проиграли!\n💎 Вы проиграли: ${amount}$`,
                                message_id: res
                            })
                            return;
                        }
                    }
                    vk.api.call('messages.edit', {
                        peer_id: chat,
                        message: r.smile,
                        message_id: res
                    })
                }, i);
            }
        })
        .catch((error) => {
            console.log('err');
        });
});///////////////////
//////////////////////////
	vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return;

			if(!message.$match[2]) return message.send(`- - log [id] [number] - -\n1. Передачи [передать]\n2. Выдачи [give]\n3. Обнуления [remove]\n4. Выдача прав [admin]\n5. Обнуление прав [admin]\n6. Варны [warn]`) 
		let id = message.$match[1];
		let i = message.$match[2];
		if(i < 0 || i > 6) return message.send(`Error`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];}
		if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i];} 
		if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i];} 
		if(i == 5) for(i=0; i!=log.setwin[id].log.length; i++){text += log.setwin[id].log[i];}  
		if(i == 6) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i];}  
		return message.send(text);
	});
/////////////////////////
 	vk.updates.hear(/^(?:донат)/i,  message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
🔸У вас на счету: ${spaces(user.donate)}₽ (Рублей)

💠 Привилегии [➕]
🌐 Специальные [➕] 

💰Баланс:  
 1⃣500.000.000$➖5₽
 2⃣1.000.000.000$➖10₽
 3⃣50.000.000.000$➖50₽

🔹Что бы купить валюту, введите "Валюта [номер]"
🔹Что бы приобрести рубли, добавьте в друзья @id416199577 (Данила Зинкина) с пометкой "rub"
 			`)
 	});

 	vk.updates.hear(/^(?:привилегии)/i,  message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
💠Аккаунты: 
 1⃣Bronze Аккаунт➖100₽ 
 2⃣Silver Аккаунт➖200₽ 
 3⃣Gold Аккаунт➖350₽
 4⃣Diamond Аккаунт➖500₽
 5⃣SYSTEM  Аккаунт➖700₽

🔸cmd[номер] - посмотреть команды привилегий.

🔹Что бы купить аккаунт, введите "Аккаунт [номер]"
🔹Что бы приобрести ₽убли, добавьте в друзья @id416199577 (Данила Зинкина) пометкой "rub"

🔸У вас на счету: ${spaces(user.donate)}₽ (Рублей)`); 
 	});

//////////////////////
 vk.updates.hear(/^(?:аккаунт)\s?([0-9]+)?/i, message => { 
	if(!message.$match[1]){ 
return message.send(` 
💠Аккаунты: 
 1⃣Bronze Аккаунт➖100₽ 
 2⃣Silver Аккаунт➖200₽ 
 3⃣Gold Аккаунт➖350₽
 4⃣Diamond Аккаунт➖500₽
 5⃣SYSTEM  Аккаунт➖700₽
🔹Что бы купить аккаунт, введите "Аккаунт [номер]"

🔸У вас на счету: ${spaces(user.donate)}₽ (Рублей)`); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
    	let ids = [0,1,2,3,4,5];
	let count = [0,100,200,350,500,700]; 
	let names = [0, 'Вип','Премиум','Модератор','Администратор','Гл.Администратор'];
	if(i < 0 || i > 5) return; 
	if(i > 0 && i <= 5){ 
	if(user.donate < count[i]) return message.send(`⚠ У вас не достаточно ${count[i]}₽.`); 
	user.donate -= count[i]; 
	user.level = ids[i]; 
	return message.send(`✅ Вы купили: (${names[i]}) аккаунт, с вашего счёта списалось ${count[i]}₽`) ;
	}
 
});  
///////////////////////////////
 vk.updates.hear(/^(?:специальные)/i, message => { 
let user = acc.users[user_id(message.user)];
return message.send(` 
1⃣Снять ограничения на ставки➖60₽ 
2⃣Подтверждённый аккаунт➖50₽


🔹Для покупки снятие ограничений, введите "Ограничения [номер]"
🔹Для покупки подтверждённый аккаунт, введите "Верификация [номер]"
🔹Что бы приобрести рубли, добавьте в друзья @ @id416199577 (Данила Зинкина) с пометкой "rub"

🔸У вас на счету: ${spaces(user.donate)}₽ (Рублей)`); 
}); 
////////////////////////////
 vk.updates.hear(/^(?:ограничения)\s?([0-9]+)?/i, message => {
	if(!message.$match[1]){ 
return message.send(``); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
    	let ids = [0,1]
	let count = [0,50]; 
	let names = [0, 'Сняти ограничений на ставки'] 
	if(i < 0 || i > 1) return; 
	if(i > 0 && i <= 1){ 
	if(user.donate < count[i]) return message.send(`⚠ У вас не достаточно ${count[i]}₽.`); 
	user.donate -= count[i]; 
	user.block_game = false;
	return message.send(`✅ Вы купили: (${names[i]}), с вашего счёта списалось ${count[i]}₽`) 
	} 
}); 
 vk.updates.hear(/^(?:верификация)\s?([0-9]+)?/i, message => { 
if(message.$match[1] == 1) return message.send(``)
	if(!message.$match[1]){ 
return message.send(``); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
    	let ids = [0,1,2]
	let count = [0,30,30]; 
	let names = [0, 'Подтверждённый аккаунт','Подтверждённый аккаунт'] 
	if(i < 0 || i > 2) return; 
	if(i > 0 && i <= 2){ 
	if(user.donate < count[i]) return message.send(`⚠ У вас не достаточно ${count[i]}₽.`); 
	user.donate -= count[i]; 
	user.verify = true;
	return message.send(`✅ Вы купили: (${names[i]}), с вашего счёта списалось ${count[i]}₽`) 
	} 
}); 
///////////////////////////////
//////////////////////////
 vk.updates.hear(/^(?:валюта)\s?([0-9]+)?/i, message => { 
	if(!message.$match[1]){ 
	return message.send(`
💰Баланс:  
 1⃣500.000.000$➖5₽

🔹Что бы купить валюту, введите "Валюта [номер]"

🔸У вас на счету: ${spaces(user.donate)}₽ (Рублей)`); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
    	let ids = [0,1,2,3]
	let count = [0,5,10,50]; 
	let bal = [0,500000000,1000000000,50000000000];
	let names = [0, '500.000.000$','1.000.000.000$','50.000.000.000$'];
	if(i < 0 || i > 3) return; 
	if(i > 0 && i <= 3){ 
	if(user.donate < count[i]) return message.send(`⚠ У вас не достаточно ${count[i]}₽.`); 
	user.donate -= count[i]; 
	user.balance += bal[i]; 
	return message.send(`✅ Вы купили: (${names[i]}), с вашего счёта списалось ${count[i]}₽`) 
	} 
}); 
////////////////////////////////
 	vk.updates.hear(/^курс/i,  (message) => {  
		return message.send(` 
💰 Курс Baincoin: ${acc.bit}$ 
➖📶 buy [кол-во] - Купить Simcoin
➖📶 sell [кол-во] - Продать Simcoin
			`);
	});
///////////////////////////
	vk.updates.hear(/^(?:sell)\s?([0-9]+)?/i,  (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`📝  Введите количество Simcoins для продажи`);
		if(user.bitcoin < message.$match[1]) return message.send(`📝  У вас нет столько Simcoins`);
		user.bitcoin -= Number(message.$match[1]);
		user.balance += Number(message.$match[1] * acc.bit)
		return message.send(`📝  Вы продали [${message.$match[1]}] Simcoins за [${message.$match[1] * acc.bit}]$`);
	});
//////////////////////////ПРОМОКОДЫ------------------
 vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`📝  Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`📝  Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`📝  Вы уже активировали промокод`);
 	acc.promos[message.$match[1]].users[message.user] = {i: true};
 	acc.promos[message.$match[1]].activ -= 1;
 	if(acc.promos[message.$match[1]].type == 1){
 		user.balance += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅  Вы активировали промокод!\n✅  Вы получили: ${spaces(acc.promos[message.$match[1]].balance)}$!\n 📛  Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}
  	if(acc.promos[message.$match[1]].activ == 0) delete acc.promos[message.$match[1]];
 	return 
 });
////////////////////
 vk.updates.hear(/^(?:ipromo)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`📝  Укажите промокод`);
	if(user.level < 5) return message.send(`Нельзя!`);
 	if(!acc.promos[message.$match[1]]) return message.send(`📝  Такого промокода нету/либо закончились активации`);
 	return 	message.send(`Информация о промокоде ${message.$match[1]}:\n 💰 Баланс промокода: ${acc.promos[message.$match[1]].balance}$!\n 📛  Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
  });
////////////////////
  vk.updates.hear(/^(?:addpromo)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
		if(message.user != 431700529) return;
 	if(!message.$match[1]) return message.send(`📝  Укажите сумму для промокода`);  
 	var result  = '';
	let words  = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}
	acc.promos[result] = {
		name: result,
		users: {},
		activ: 30,
		type: 1,
		balance: message.$match[1]
	}		 
 	return message.send(` Ловите промокод на ${message.$match[1]}$\n🌟 Введите => Промокод ${result}`);
 });
//////////////////
//////////////////////////////
/////////////////////////
	vk.updates.hear(/^(?:givevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`Нельзя!`);
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 7 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  givebronze [ID] [1-7] (дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 1;
		return message.send(`💰  Вы выдали Вип - Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
/////////////////////////
	vk.updates.hear(/^(?:givemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 447690600) return;
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  givemoder [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.send(`💰  Вы выдали Премиум - Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
//////////////////////////
	vk.updates.hear(/^(?:giveadm)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user);
		if(message.user != 447690600) return;
			if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  giveadm [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
       	 acc.users[message.$match[1]].adm_time = time;
      	  acc.users[message.$match[1]].level = 3;
		return message.send(`💰  Вы выдали Модератор - Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
//////////////////////////////
	vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 447690600) return;
			let user = acc.users[user_id(message.user)]; 
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: giveadm ID LVL(1-5)`); 
			if(message.$match[2] > 6) return message.send(`🔸 >> Максимальный админ-уровень 6!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅  ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}.`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}]\n🔸 >> Админ-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}]`);			
	});
//////////////////////////
	vk.updates.hear(/^(?:boostzp)\s?([0-9]+)?\s?([0-9]+)?/i,(message) => {
		let id = user_id(message.user);	 	 
		if(message.user !== 447690600) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostzp ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autozp = Number(message.$match[2]);
		return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор зарплат на (${message.$match[2]}) раз `);
	});
	vk.updates.hear(/^(?:boostbiz)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let id = user_id(message.user);	 	 
		if(message.user !== 447690600) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostbiz ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autobiz = Number(message.$match[2]);
		return message.send(` 🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор прибыли на (${message.$match[2]}) раз `);
	});
///////////////////
	vk.updates.hear(/^(?:bpay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user !== 447690600) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	 
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = '✖  запрещен' 
			acc.users[message.$match[1]].admin.block_pay = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = '✅ разрешен' 
			acc.users[message.$match[1]].admin.block_pay = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вам ${texts}ы переводы денег`
		}); 
		return message.send(`🔸 >> Готово: ${texts}`);
	});
//////////////////////////////
	vk.updates.hear(/^(?:bgive)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		if(message.user !== 447690600) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
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
			message: `✅  Спец.Администратор ${texts} Вам запрет на выдачу валюты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на выдачу валюты`);
	});
////////////////////////////////////
	vk.updates.hear(/^(?:brep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user !== 447690600) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
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
			message: `✅  Спец.Администратор ${texts} Вам запрет на ответы на репорты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на ответ на репорты.`);
	});
////////////////////
 vk.updates.hear(/^(?:приставки)\s?([0-9]+)?/i, message => { 
	if(!message.$match[1]){ 
	return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), приставки: 
🔸 1. Atari 2600 (250$) 
🔸 2. Nes (Aka Dendy) (3.000$) 
🔸 3. Sega Genesis (3.500$) 
🔸 4. Nintendo Snes (5.000$) 
🔸 5. Sony Playstation (10.000$) 
🔸 6. Nintendo 64 (25.000$) 
🔸 7. Sony Playstation-2 (37.500$) 
🔸 8. Microsoft XBOX 360 (50.000$) 
 🔸 9. Sony Playstation-3 (70.000$) 
🔸 10. Nintendo Wii (75.000$) 

Для покупки введите Приставки [номер]" 
Для продажи введите: Продать приставку 
`); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
	let count = [0, 250,3000,3500,5000,10000,25000,37500,50000,70000,75000]; 
		let names = [0, 'Atari 2600','Nes (Aka Dendy)','Sega Genesis','Nintendo Snes','Sony Playstation','Nintendo 64','Sony Playstation-2','Microsoft XBOX 360','Sony Playstation-3','Nintendo Wii'] 
	if(i < 0 || i > 10) return; 
	if(user.prist != false) return message.send(`  🕹У вас уже куплена приставка`); 
	if(i > 0 && i <= 10){ 
	if(user.balance < count[i]) return message.send(`🕹 У вас не достаточно денег.`); 
	user.balance -= count[i]; 
	user.prist = names[i]; 
	return message.send(`🕹 Вы купили приставку: (${names[i]}) за ${count[i]}$`) 
	} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать приставку)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.prist == false) return message.send(`🕹 У вас нет приставки`); 
user.prist = false; 
return message.send(`🕹 Вы успешно продали приставку`); 
});
///////////////////////////////////////////
 vk.updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
			*id${message.user} (${acc.users[user_id(message.user)].prefix}), дома:
			🔸 1. Коробка из-под холодильника (250$)
			🔸 2. Подвал (3.000$)
			🔸 3. Палатка (3.500$)
			🔸 4. Домик на дереве (5.000$)
			🔸 5. Полуразрушенный дом (10.000$)
			🔸 6. Дом в лесу (25.000$)
			🔸 7. Деревянный дом (37.500$)
			🔸 8. Дача (80.000$)
			🔸 9. Кирпичный дом (125.000$)
			🔸 10. Коттедж (450.000$)
			🔸 11. Особняк (1.250.000$)
			🔸 12. Дом на Рублёвке (5.000.000$)
			🔸 13. Личный небоскрёб (25.000.000$)
			🔸 14. Остров с особняком (40.000.000$)
			🔸 15. Белый дом (300.000.000$)

			Для покупки введите "Дома [номер]"
			Для продажи введите "Продать дом"
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 250,3000,3500,5000,10000,25000,37500,80000,125000,450000,1250000,5000000,25000000,40000000,300000000];
 		let names = [0, 'Коробка из-под холодильника','Подвал','Палатка','Домик на дереве','Полуразрушенный дом','Дом в лесу','Деревянный дом','Дача','Кирпичный дом','Коттедж','Особняк','Дом на Рублёвке','Личный небоскрёб','Остров с особняком','Белый дом']
 	if(i < 0 || i > 15) return;
 	if(user.house != false) return message.send(`🏢  У вас уже куплен дом`);
 	if(i > 0 && i <= 15){
 		if(user.balance < count[i]) return message.send(`🏢  У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.house = names[i];
 		return message.send(` 🏢  Вы купили дом (${names[i]}) за ${count[i]}$`)
 	}
 });
/////////////////////////////////////////
  vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢  Вы успешно продали дом государству.`);
 });
/////////////////////////////////////////
 vk.updates.hear(/^(?:рестораны)\s?([0-9]+)?/i, message => { 
if(!message.$match[1]){ 
return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), рестораны: 
🔸 1. Ресторан "Алые Паруса" (250$) 
🔸 2. Ресторан "Будь Готов" (3.000$) 
🔸 3. Ресторан "СССР" (3.500$) 
🔸 4. Ресторан "Тортила" (5.000$) 
🔸 5. Ресторан "Золотая Хохлома" (10.000$) 
🔸 6. Ресторан "АЙСБЕРГ" (25.000$) 
🔸 7. Ресторан "Чудаки" (37.500$) 

Для покупки введите "Рестораны [номер]" 
Для продажи введите "Продать ресторан" 
`); 
} 
let i = message.$match[1]; 
let user = acc.users[user_id(message.user)]; 
let count = [0, 250,3000,3500,5000,10000,25000,37500,]; 
let names = [0, 'Алые Паруса','Будь Готов','СССР',' Топртила','Золотая Хохлома','Айсберг','Чудаки'] 
if(i < 0 || i > 7) return; 
if(user.restoran != false) return message.send(`🏨 У вас уже куплен ресторан`); 
if(i > 0 && i <= 7){ 
if(user.balance < count[i]) return message.send(`🏨 У вас не достаточно денег.`); 
user.balance -= count[i]; 
user.restoran= names[i]; 
return message.send(` 🏨 Вы купили ресторан (${names[i]}) за ${count[i]}$`) 
} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать ресторан)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.restoran== false) return message.send(`🏨 У вас нет рестарана`); 
user.restoran= false; 
return message.send(`🏨 Вы успешно продали ресторан`); 
});
/////////////////////////////////////////ГАРАЖИ/////////////////////////////
 vk.updates.hear(/^(?:гаражи)\s?([0-9]+)?/i, message => { 
if(!message.$match[1]){ 
return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), гаражи: 
 🔸 1. Контейнер (250$) 
🔸 2. Деревянный гараж (3.000$) 
🔸 3. Во дворе (3.500$) 
🔸 4. Ангар (5.000$) 
🔸 5. Автостоянка (10.000$) 
🔸 6. В белом доме Путина (5.000.000$) 

Для покупки введите "Гаражи [номер]" 
Для продажи введите "Продать гараж" 
`); 
} 
let i = message.$match[1]; 
let user = acc.users[user_id(message.user)]; 
let count = [0, 250,3000,3500,5000,10000,5000000]; 
let names = [0, 'Контейнер ','Деревянный гараж','Во дворе','Ангар','Автостоянка','В белом доме Путина'] 
if(i < 0 || i > 6) return; 
if(user.garage != false) return message.send(`🏚 У вас уже куплен гараж`); 
if(i > 0 && i <= 6){ 
if(user.balance < count[i]) return message.send(`🏚 У вас не достаточно денег.`); 
user.balance -= count[i]; 
user.garage = names[i]; 
return message.send(`🏚 Вы купили гараж (${names[i]}) за ${count[i]}$`) 
} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать гараж)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.garage == false) return message.send(`🏚 У вас нет гаража`); 
user.garage = false; 
return message.send(` 🏚 Вы успешно продали гараж.`); 
});
////////////////////////////////
 vk.updates.hear(/^(?:работы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 🔺1. Библиотекарь | [0] | (1000$/час)  
🔺2. Ботаник | [10] | (5000$/час)
🔺3. Бригадир поезда | [20] | (10.000$/час)  
🔺4. Диктор | [30] | (15.000$/час) 
🔺5. Социолог | [40] | (20.000$/час)
🔺6. Штукатур, маляр | [50] | (25.0000$/час) 
🔺7. Электрик | [65] | (35.000$/час)
🔺8. Инкассатор | [70] | (45.000$/час)  
🔺9. Программист | [80] | (60.000$/час) 
🔺10. Генеральный директор | [100] | (80.000$/час) 

💡Устроиться : "работы [номер]" 
💡Уволиться: "уволиться"
💡Работать: "Работать" - Получение ЗП + Получение стажа [1] 
💡Трудовая книжка: 'Книжка'
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
 		let names = [0, 'Библиотекарь ','Ботаник ','Бригадир поезда','Диктор','Социолог','Штукатур, маляр','Электрик','Инкассатор','Программист',' Генеральный директор ']
 	let staj = [0,0,10,20,30,40,50,65,70,80,100]
 	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000]
 	if(i <= 0 || i > 10) return;
 	if(user.job.name != false) return message.send(`👨‍  У вас уже есть работа`);
 	if(i > 0 && i <= 10){
 		if(user.job.lvl < staj[i]) return message.send(`👨‍  У вас не достаточный стаж.`); 
 		if(staj[i] > user.job.lvl) return message.send(`👨‍  У вас не достаточный стаж.`); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.send(`👨‍⚖️  Вы устроились на работу `)
 	} 
 });
//////////////////////
  vk.updates.hear(/^(?:уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`👨‍⚖️  У вас нет работы.`);
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.send(`👨‍ Вы успешно уволились.`);
 });
////////////////////////
  vk.updates.hear(/^(?:книжка)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.send(`
 		📋 Стаж работы: ${user.job.lvl} 
 		📋 Работа: ${text}
 		📋 Зарплата: ${user.job.count}$/час
 		`);
 });
///////////////////////////////
  vk.updates.hear(/^(?:работать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false) return message.send(`👨‍⚖️  У вас нет работы.`);
 	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час.`);
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
 	user.job.lvl += 1;
 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
	}, 3600000);
		return message.send(`
 		📝  Вы отработали и получили зарплату в размере ${counts}$ 
 		`);
 });
//////////////////
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
//////////////////////
//////////////////////
	vk.updates.hear(/^(?:cc)\s?([^]+)?/i,  message => {
		   let cc = message.$match[1].toLowerCase();
	       let text = message.$match[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 ➾ Короткая ссылка: " + res.short_url);
    });  
});
/////////////////
 vk.updates.hear(/^(?:бонус)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = false
 	if(user.bloks.cases == true) return message.send(`💵 Бонус можно брать 1 раз в сутки.`);
 	user.bloks.cases = true
	setTimeout(() => {
			user.bloks.cases = false
		}, 86400000);	
	if(rez == false){
		let count = rand(10000,50000);
		let dont = rand(10,100);
		user.bitcoin += dont; 
		user.balance += count;
		return message.send(`🎉 В ежедневном бонусе!\n👒  Вы получили ${count}$ и ${dont}🔋`);
	}
});
///////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:банк)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`
			💵  Счет в банке: ${spaces(user.bank_balance)}$

			💳  Кредит [СУММА] - Взять кредит под 15%
			💳  Погасить [СУММА] - Погасить кредит.
			💳  Банк пополнить [СУММА] - Положить деньги в банк.			
			💳  Банк снять [СУММА] - Снять деньги с банка.

			⚠  Важно! Пока ваш долг больше 0 
			⚠  Ежечасно с вашего счета будет списываться 15% от суммы кредита
			`);
	});
//////////////////////////////////
	vk.updates.hear(/^(?:кредит)\s?([0-9]+)?/i,  message => {
		let user = acc.users[user_id(message.user)];
		if(user.credit != 0) return message.send(`💳  Чтобы взять кредит, нужно погасить старый: [${spaces(user.credit)}$]`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳  Вы не указали сумму`);
			if(message.$match[1] < 100000 || message.$match[1] > 10000000) return message.send(`💳  Минимальная сумма кредита 100.000$\n💳  Максимальная сумма кредита 10.000.000$`);
 		user.balance += Number(message.$match[1]);
 		let dolg = Number(message.$match[1]) / 100 * 15;
 		dolg += Number(message.$match[1]);
		user.credit = Number(dolg);
		user.procent = Number(message.$match[1] / 100 * 15);
		return message.send(`
			💳  Вы взяли кредит на сумму: ${spaces(message.$match[1])}$
			💳  К погашению: ${spaces(dolg)}$
			💳  Ежечасно будет списываться: ${spaces(message.$match[1] / 100 * 15)}$
		`);
	});
//////////////////////////////
 	vk.updates.hear(/^(?:погасить)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.credit == 0) return message.send(`💳  у вас нет кредита`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳  Вы не указали сумму.`);
		if(user.credit > user.balance) return message.send(`💳  У вас не достаточно денег.`);
		if(user.credit > message.$match[1]) return message.send(`💳  Оплатить кредит можно одним вкладом. [${spaces(user.credit)}$]`);
		if(user.credit < message.$match[1]) return message.send(`💳  Введите точную сумму к погашению. [${spaces(user.credit)}$]`);

		user.balance -= Number(message.$match[1]);
		user.credit -= Number(message.$match[1]);
		user.procent = 0;
		return message.send(`
			💳  Вы успешно погасили весь кредит.
		`);
});
///////////////////////
 vk.updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), питомцы:

🔺1. Улитка. (10.000$) (5.000$/2 часа)
🔺2. Кит. (50.000$) (10.000$/2 часа)
🔺3. Овца. (100.000$) (20.000$/2 часа)
🔺4. Курица. (170.000$) (35.000$/2 часа)
🔺5. Коала. (300.000$) (55.000$/2 часа)
 🔺6. Оса. (450.000$) (75.000$/2 часа)
🔺7. Свинья. (500.000$) (95.000$/2 часа)
🔺8. Слон. (700.000$) (150.000$/2 часа)
🔺9. Мартышка. (1.000.000$) (500.000$/2 часа)
🔺10. Пингвин. (10.000.000$) (1.500.000$/2 часа)
🔺11. Тигр. (70.000.000$) (5.000.000$/2 часа)
🔺12. Волк. (500.000.000$) (10.000.000$/2 часа)
🔺13. Заяц. (1.000.000.000$) (30.000.000$/2 часа)
🔺14. Корова. (3.000.000.000$) (70.000.000$/2 часа)

🔸Для покупки введите "Питомцы [номер]" 
🔹Для продажи введите "Продать питомца" 
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	let ids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
	let count = [0,10000,50000,100000,170000,300000,450000,500000,700000,1000000,10000000,70000000,500000000,1000000000,3000000000]
 	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова']
 	if(i < 0 || i > 14) return;
 	if(user.pit != false) return message.send(` 🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 14){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.pit = ids[i]; 
 		return message.send(`🐼 Вы купили питомца (${names[i]}) за ${count[i]}$`)
 	}	 
 });
/////////////////////////
  vk.updates.hear(/^(?:продать питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`🐼 У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🐼 Вы успешно продали питомца `);
 });
 /////////////////////////
 vk.updates.hear(/^(?:сейф)/i, (message) => { 
 		let user = acc.users[user_id(message.user)]; 	 
		if (user.safe.status != false) return message.send(`🔑  Взломать сейф можно раз в 10 минут.`);	 
		if (user.safe.status == 3) return;
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
		  🏛  Вы начали взлом сейфа 🏛
		  🔑  Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝  Начать взлом: "Взлом [код]"
		  🌚  Удачи!
		 
  `);
	});
/////////////////////////////
	vk.updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];
		if (user.safe.status == true) return message.send(` 🔑  Взломать сейф можно раз в 10 минут.`);
		if (user.safe.status == false) return;
		if (!message.$match[1]) return message.send(`🗝  Укажите код к сейфу.`);
		if (message.$match[1] > 9999) return message.send(`🗝  Код - состоит из 4 одинаковых символов.`);
		if (message.$match[1] < 0) return message.send(`🗝  Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(message.$match[1]);
		let haha = rand(10000,500000);
		if (kod == user.safe.key) { 
			let summ = rand(20000000,50000000);
			user.balance += summ; 
			user.safe.key = false; 
			user.safe.status = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000);
			return message.send(`🤑  Невероятно!\n🙊  Вы смогли угадать код\n🏛  Обыскивая сейф вы нашли:\n💴  ${spaces(summ)}$`);
		} else {
			user.safe.status = true;
			user.safe.key = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000); 
		}
			user.balance -= haha;
			return message.send(`🤠  Вы не угадали код.\n🤠  Вас оштрафовали на ${spaces(haha)}$\n🔑  Верный код был: ${nu}`);	
	});
////////////////////////////////////
 vk.updates.hear(/^(?:лотерея)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 150000) return message.send(` 💣  Лотерейный билетик стоит 150000$`);
	user.balance -= 150000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 500;
		return message.send(`💣  Вам попался неудачный билет.`);
	}else{ 
		let count = rand(10000,1000000);
		user.balance += count;
		return message.send(`🎉  Удачный билетик!\n👒  Вы получили ${count}$`);
	}
});
  ////////////////
/////////////////////



/////////////////////
  ////////////////
  	vk.updates.hear(/^(?:купить рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑  Укажите количество рейтинга.`);
			if(user.balance < message.$match[1] * 250000000) return message.send(` 👑  1 рейтинг стоит 250.000.000$\n👑  Для покупки ${message.$match[1]} 👑 нужно ${spaces(message.$match[1] * 250000000)}$`)
		user.balance -= Number(message.$match[1] * 250000000);
		user.global_exs += Number(message.$match[1]);
		return message.send(`👑  Вы успешно купили ${message.$match[1]} рейтинга`);
	});
/////////////////
  	  vk.updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑  Укажите количество рейтинга.`);
		if(user.global_exs < message.$match[1]) return message.send(`👑  У вас нет столько рейтинга.`)
		user.balance += Number(message.$match[1] * 250000000);
		user.global_exs -= Number(message.$match[1]);
		return message.send(`👑  Вы успешно продали ${message.$match[1]} рейтинга за ${message.$match[1] * 250000000}$`);
	});
/////////////////
	vk.updates.hear(/^(?:buy)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];
 		let bits = acc.bit
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑  Укажите количество simcoin.`);
		if(user.balance < message.$match[1] * bits) return message.send(`⚠ Для покупки ${message.$match[1]}💳 нужно ${message.$match[1] * bits}`)
		user.balance -= Number(message.$match[1] * bits);
		user.bitcoin += Number(message.$match[1]);
		return message.send(`🔋  Вы успешно купили ${message.$match[1]} Baincoin`);
	});
 //////////////////////////

/////////////////
vk.updates.hear(/^(?:убежать)/i, message => { 
	let user = acc.users[user_id(message.user)];     
	if(user.duel == false) return message.send(`🔫  Вам никто не бросал вызов/Вы не вызывали на дуэль  никого.`);	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.duel].id,
		message: `
		🔫  Игрок не согласился на дуэль.
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	
	user.duel_summ = false;
	acc.users[user.duel].duel_summ = false;
	acc.users[user.duel].duel = false;
	acc.users[user.duel].nachal = false;
	user.duel = false;
	user.nachal = false; 
	return message.send(`
		🔫  Вы струсили и убежали с поля боя.
	`);
});
//////////////////////
vk.updates.hear(/^(?:дуэль)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(args == user_id(message.user)) return message.send(`🔫  Вы указали свой ID`)
	if(!message.$match[2] || !args || message.$match[2] < 1) return message.send(`💸  Пример команды: 'Дуэль [ID] [СТАВКА]'`)
	if(user.balance < message.$match[2]) return message.send(`💸  Ваша ставка больше вашего баланса`)
	if(!acc.users[args]) return message.send(`🔫  Такого игрока нет!`)
	if(acc.users[args].balance < message.$match[2]) return message.send(`💸  У игрока баланс меньше вашей ставки`)
	if(user.duel != false) return message.send(`🔫  Вы уже назначали дуэль игроку ${acc.users[user.duel].prefix}\n🎌  Для отмены напишите: "Убежать"`);
		if(acc.users[args].duel != false) return message.send(`🔫  Вы уже назначали дуэль игроку ${acc.users[user.duel].prefix}\n&#127987;  Для отмены напишите: 'Сдаюсь'`);
	user.duel_summ = Number(message.$match[2]);
	acc.users[args].duel_summ = Number(message.$match[2]);
	user.duel = Number(args);
	acc.users[args].duel = Number(user_id(message.user));
	user.nachal = user_id(message.user);
	acc.users[args].nachal =  user_id(message.user);
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `
		🔫  Игрок @id${user.id}(${user.prefix}) вызывает вас на дуэль
		💸  Ставка ${message.$match[2]}$

		🔫  Для принятия напишите: 'Принять'
		🎌  Для отмены напишите: 'Убежать'
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	
	return message.send(`
		🔫  Вы вызвали на дуэль игрока @id${acc.users[args].id}(${acc.users[args].prefix})
		💸  Ставка ${message.$match[2]}$
		🔫  Ожидайте принятия боя игроком.
		
		&#127987;  Для отмены напишите: 'Убежать'
	`);
});
/////////////////////

/////////////////////////////////////////////
///////////////////////////////////////////// 
/////////////////////////////////////////////
vk.updates.hear(/^(?:реф)\s(?:инфо)$/i, message => {
	let user = acc.users[user_id(message.user)];
	return message.send(`⏩ Для того, чтобы вам засчитали друга, он должен написать команду "Реф ${user_id(message.user)}"

	😏 За каждого друга вы получаете 2₽ на баланс.
	☝ Если друг активирует вашу рефералку, то он получит 50.000.000$

‼НАКРУТКА С ФЕЙКОВ ЗАПРЕЩЕНА, ВСЕ АККАУНТЫ БУДУТ ЗАБЛОКИРОВАНЫ‼`);
});

vk.updates.hear(/^(?:реф|реферал)\s([0-9]+)$/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.$match[1] == user_id(message.user)) return message.send(`Нельзя пригласить себя!`)
	if(!message.$match[1]) return message.send(`Укажите ID игрока, который вас пригласил.`);
	if(user.ref) return message.send(`Вы уже активировали реферальную систему.`)
	
	user.ref = message.$match[1]
	acc.users[message.$match[1]].refs += 1

	acc.users[message.$match[1]].donate += 2
	user.balance += 50000000

	vk.api.call('messages.send', { user_id: acc.users[message.$match[1]].id, message: `🎉 Спасибо за приглашение друга в нашего бота!
	💸 Вам начислено 2₽ на баланс.` });
	return message.send(`*id${user.id} (${user.prefix}), вы активировали реферал.
	💲 Вам начислено 50.000.000$`);
});
/////////////////////////////////////////////
vk.updates.hear(/^(?:принять)/i, message => {
	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(user.duel == false) return message.send(`🔫  Вам не назначали дуэль!`); 
	if(user.balance < user.summ) return message.send(`💸  Ставка больше вашего баланса`)
	if(acc.users[user.duel].balance < message.$match[2]) return message.send(`💸  У противника баланс меньше ставки`) 
	if(user_id(message.user) == user.nachal) return message.send(`💸  Принять дуэль должен соперник!`);

	let sum = user.duel_summ;  
	let us2 = user.duel;
	let one_hp = 100; //кто принимает
	let two_hp = 100; //кто атакует
	let text = '';
	//1 этап
	one_hp -= acc.users[user.duel].uron;
	two_hp -= user.uron;
	text += `
	- - 1&#8419; раунд - - 
Вы ранили друг друга.
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
					🏁  В финальном раунде победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
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

					return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);
					user.game.strela_win += 1;  
					acc.users[us2].game.strela_loose += 1;
					text += `
					- - Финал - - 
					🏁  В финальном раунде победил @id${user.id}(${user.prefix})
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

					return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
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
				🏁  В финальном раунде победил @id${user.id}(${user.prefix})
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

				return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[user.duel].balance += Number(user.duel_summ);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;
				text += `
				- - Финал - - 
				🏁  В финальном раунде победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
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

				return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
			} 	
	}else{
		text += `
		- - 2&#8419; раунд - - 
Вы опять ранили друг друга.
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
					🏁  В финальном раунде победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
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
					return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);

					user.game.strela_win += 1;
					acc.users[us2].game.strela_loose += 1;
					text += `
					- - Финал - - 
					🏁  В финальном раунде победил @id${user.id}(${user.prefix})
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

					return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
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
				🏁  В финальном раунде победил @id${user.id}(${user.prefix})
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

				return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[us2].balance += Number(user.duel_summ);
				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;
				text += `
				- - Финал - - 
				🏁  В финальном раунде победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
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

				return message.send(`🔫  Результат боя отправлен вам в ЛС.`);			
			}			
	}else{
		text += `
		- - 3&#8419; раунд- - 
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

vk.updates.hear(/^(?:создать компанию)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(user.donate < 30) return message.send(`⚠ Создание компании стоит 30₽`);
	if(!message.$match[1]) return message.send(`⚠ Введите название компании "Создать компанию [название]"`);
	if(acc.users[id].frac_name != false) return message.send(`⚠ Вы уже устроены в компании.`);
	let args =  message.$match[1];
	if(frac[args]) return message.send(`⚠ Компания с таким названием уже существует.`);
	user.donate -= 30;
	frac[args] = {
		users: {},
		balance: 0,
		bank: 0,
		people: 1, 
		counts: 0,
		owner: message.user
	}
	frac[args].users[id] = {
		count: 0
	}
	user.frac_name = args;
	return message.send(`
		✔  Вы создали компанию "${args}"
		🔸 Компания [➕]
		`);
});


vk.updates.hear(/^(?:компании)/i,  (message) => { 
	let text = '📘 Открытые компании:\n\n'
	for(i in frac){
 		text += `📋 Название: ${i} | Владелец: @id${frac[i].owner}(${acc.users[user_id(frac[i].owner)].prefix})\n`
	}
	return message.send(`
	${text}
	`);
});

vk.updates.hear(/^(?:Устроиться)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)]; 
	if(frac[message.$match[1]].owner == message.user) return message.send(`⚠ Вы уже являетесь руководителем компании "${user.frac_name}"`); 
		if(!message.$match[1]) return message.send(`⚠ Напишите точное название компании, где хотите работать. (Учитывая регистр/знаки/символы/смайлы)`);
	if(acc.users[id].frac_name != false) return message.send(`⚠ Вы уже работаете в компании`);
	let args = message.$match[1];
	if(!frac[args]) return message.send(`📘 Такой компании не существует.`);
	if(frac[args].people >= 10) return message.send(`📘 В данной компании нет места для рабочих.`)
	frac[args].people += 1;
	frac[args].users[id] = {
		count: 0
	}
	user.frac_name = args;
	return message.send(`
		✔ Вы устроились в компанию "${args}" 
		🔸 Компания [➕]
		`);
}); 

vk.updates.hear(/^(?:покинуть)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не работаете ни в одной компании.`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner == message.user) return message.send(`⚠ Управляющий не может уволиться.`); 

	frac[name].people -= 1;
	delete frac[name].users[id];

	user.frac_name = false;
	return message.send(`
		🔸 Вы уволились с компании "${name}" 
		`);
});

vk.updates.hear(/^(?:снять)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не работаете ни в одной компании.`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner != message.user) return message.send(`⚠ Только Управляющий может использовать это.`); 
	let sum = frac[name].balance;
	frac[name].balance = 0;
	user.balance += Number(sum);
	return message.send(`
		🔸 Вы сняли с баланса компании ${spaces(sum)}$
		`);
});

vk.updates.hear(/^(?:отработать)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не работаете ни в одной компании.`);  
	if(user.bloks.frac == true) return message.send(`⚠ Вы уже работали в этом часу, попробуйте через час.`);     
	let name = acc.users[id].frac_name; 

	let rb = rand(100000,500000)

	frac[name].users[id].count += 1;
	frac[name].bank += rb;
	 
	user.bloks.frac = true; 
		setTimeout(() => {
			user.bloks.frac = false;
	}, 3600000);

	 
	return message.send(`
		🔹 Вы отработали в компании час. 
		➕ Баланс компании увеличился на ${spaces(rb)}$

		⏳ Через 24 часа, вы получите свою зарплату за работу.
		`);
});

vk.updates.hear(/^(?:компания)$/i, (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	
	if(acc.users[id].frac_name == false){
		return message.send(`
			📕 Помощь по компаниям.

			➡ Создать компанию [название] (30₽)
			➡ Устроиться [Название] - устроиться в компанию. 
			➡ Покинуть - Уволиться с компании. 
			➡ Отработать - Отработать рабочий день.
			➡ Компании - Открытые компании.

			💡 Работать можно 1 раз в час.
			💡 Каждые сутки, баланс компании будет поделён между работниками.
			💡 За одну отработку, на баланс компании зачисляется сумма от 100.000$ до 500.000$ 
		`);
	}
	let text = '';
	for(i in frac[user.frac_name].users){
		text += `👤 @id${acc.users[i].id}(${acc.users[i].prefix}) | [${frac[user.frac_name].users[i].count}] раз за 24 часа\n`
	}
		 return message.send(`
			| "${user.frac_name}" | 
			💀 Управляющий: @id${frac[user.frac_name].owner}(${acc.users[user_id(frac[user.frac_name].owner)].prefix})
			👥 Работников: ${frac[user.frac_name].people}/10 
			💴 В копилке: ${frac[user.frac_name].bank}$ 
 
			📊 Статистика рабочих: 
			${text} 

			➡ Покинуть - Уволиться с компании. 
			➡ Отработать - Отработать рабочий день.
		`);
});


//////////////////////////////////
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
	ю: 'oı',

	Q: 'q',
	W: 'ʍ',
	E: 'ǝ',
	R: 'ɹ',
	T: 'ʇ',
	Y: 'ʎ',
	U: 'u',
	I: 'ᴉ',
	O: 'o',
	P: 'p',
	A: 'ɐ',
	S: 's',
	D: 'd',
	F: 'ɟ',
	G: 'ƃ',
	H: 'ɥ',
	J: 'ɾ',
	K: 'ʞ',
	L: 'l',
	Z: 'z',
	X: 'x',
	C: 'ɔ',
	V: 'ʌ',
	B: 'b',
	N: 'n',
	M: 'ɯ',

	Й: 'ņ',
	Ц: 'ǹ',
	У: 'ʎ',
	К: 'ʞ',
	Е: 'ǝ',
	Н: 'н',
	Г: 'ɹ',
	Ш: 'm',
	Щ: 'm',
	З: 'ε',
	Х: 'х',
	Ъ: 'q',
	Ф: 'ф',
	Ы: 'ıq',
	В: 'ʚ',
	А: 'ɐ',
	П: 'u',
	Р: 'd',
	О: 'о',
	Л: 'v',
	Д: 'ɓ',
	Ж: 'ж',
	Э: 'є',
	Я: 'ʁ',
	Ч: 'һ',
	С: 'ɔ',
	М: 'w',
	И: 'и',
	Т: 'ɯ',
	Ь: 'q',
	Б: 'ƍ',
	Ю: 'oı'

}
////////////
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
 //------------------------------------------------------------------------------------\\
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
	/*
	type == '1' //  [Передать/pay]  
	type == '2' //  [Выдать/give]  
	type == '3' //  [Забрать/remove] 
	type == '4' //  [Выдать] админку
	type == '5' //  [Победы/setwin]
	type == '6' //  [warns | причины]
	*/ 		
 	// - - - - - - - - - - - - - - - - -  
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
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
				texts = `📗 Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 Некорректный запрос.` 
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
 //------------------------------------------------------------------------------------\\ 

// Утилита 
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
 	setInterval(() => {
		acc.curs = rand(30000,80000) 
		acc.bit = rand(5000,6000)
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
				acc.users[i].bloks.cases = false
				acc.users[i].bloks.bonus = false
				acc.users[i].bloks.random_game = false
				acc.users[i].bloks.gun_case = false
				acc.users[i].bloks.frac = false
				acc.users[i].bloks.pay = false
				acc.users[i].bloks.a_case = false
				acc.users[i].bloks.giverub = false
				acc.users[i].job.stop = false
				acc.users[i].bizs.one.stop = false
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
				}
			} 
	}


 	 function adm_log(is) {
  		let id = is[0];	
		let i = config;  
		vk.api.call('messages.send', { user_id: acc.users[1].id, message: `⚠ ⚠ [ADM-LOG | User_id: @id${acc.users[is[0]].id}(${is[0]})] ⚠ ⚠\n[ -> ${is[1]} <- ]`});			 
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
							message: `Срок действия Вип/Премиум/Модератор прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  
		



 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
				if(acc.users[i].msg.messages > 99) {acc.users[i].tag = "Начинающий"}
				if(acc.users[i].msg.messages > 499) {acc.users[i].tag = "Опытный"}
				if(acc.users[i].msg.messages > 1999) {acc.users[i].tag = "Любитель"}
				if(acc.users[i].msg.messages > 5999) {acc.users[i].tag = "Старший"}
				if(acc.users[i].msg.messages > 10999) {acc.users[i].tag = "Профессионал"}
				if(acc.users[i].msg.messages > 14999) {acc.users[i].tag = "Генералиссимус"}
				}
		}
	}, 3000); 


setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
				if(acc.users[i].pit == 1) {acc.users[i].balance += 5000}
				if(acc.users[i].pit == 2) {acc.users[i].balance += 10000}
				if(acc.users[i].pit == 3) {acc.users[i].balance += 20000}
				if(acc.users[i].pit == 4) {acc.users[i].balance += 35000}
				if(acc.users[i].pit == 5) {acc.users[i].balance += 55000}
				if(acc.users[i].pit == 6) {acc.users[i].balance += 75000}
				if(acc.users[i].pit == 7) {acc.users[i].balance += 95000}
				if(acc.users[i].pit == 8) {acc.users[i].balance += 150000}
				if(acc.users[i].pit == 9) {acc.users[i].balance += 500000}
				if(acc.users[i].pit == 10) {acc.users[i].balance += 1500000}
				if(acc.users[i].pit == 11) {acc.users[i].balance += 5000000}
				if(acc.users[i].pit == 12) {acc.users[i].balance += 10000000}
				if(acc.users[i].pit == 13) {acc.users[i].balance += 30000000}
				if(acc.users[i].pit == 14) {acc.users[i].balance += 70000000}
				}
		}
	}, 72000000);


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

 setInterval(() => {
 for(a in users){
  let a = utils.random(1, 8);
  let b = utils.random(2, 8);
  let c = utils.random(4, 8);

  users[a].health -= a;
  users[a].gigiena -= b;
  users[a].need -= c;
 }
}, 24000000);


 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
				if(acc.users[i].bizs.one_biz == true) {
					acc.users[i].bizs.one.balance += acc.users[i].bizs.one.zp}
				}
		}
	}, 3600000); 