const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const requests = require('request');
const { MessageContext } = require('vk-io');
const fs = require("fs");
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const config = require("./setting/config.json")  
const clans = require("./base/clans.json") 
const googleTTS = require('google-tts-api');
const doxod = acc.number;
const { SceneManager, StepScene } = require('@vk-io/scenes')
const { SessionManager } = require('@vk-io/session')
const sessionManager = new SessionManager();
const sceneManager = new SceneManager();

updates.use(async (context, next) => {
    if (context.is("message") && context.isOutbox)
return;
    try {
        await next();
    } catch (err) { console.error(err) }
});


let user = new VK();
user.setOptions({
    token: ''
});


const buisnesses = [
	[ // Бизнес #1
		{ // Стандартный бизнес
			name: 'Шаурмечная',
			cost: 50000,
			earn: 200,
			workers: 1,
			id: 1,
			icon: '🥖'
		},

		{ // Первое улучшение
			name: '5 шаурмечных',
			cost: 350000,
			earn: 1000,
			workers: 10,
			id: 1,
			icon: '🥖'
		},

		{ // Второе улучшение
			name: 'Небольшая сеть шаурмечных',
			cost: 900000,
			earn: 2625,
			workers: 30,
			id: 1,
			icon: '🥖'
		},

		{ // 3 улучшение
			name: 'Средняя сеть шаурмечных',
			cost: 1200000,
			earn: 3750,
			workers: 50,
			id: 1,
			icon: '🥖'
		},

		{ // Последнее улучшение
			name: 'Лучшая шаурма в стране',
			cost: 4000000,
			earn: 11000,
			workers: 200,
			id: 1,
			icon: '🥖'
		}
	],

	[
		{
			name: 'Ларёк',
			cost: 100000,
			earn: 700,
			workers: 1,
			id: 2,
			icon: '🏪'
		},

		{
			name: '5 ларьков',
			cost: 500000,
			earn: 3700,
			workers: 5,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Средняя сеть ларьков',
			cost: 950000,
			earn: 7725,
			workers: 40,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки во всех городах страны',
			cost: 8000000,
			earn: 37450,
			workers: 150,
			id: 2,
			icon: '🏪'
		},

		{
			name: 'Ларьки в каждой стране',
			cost: 17500000,
			earn: 79950,
			workers: 400,
			id: 2,
			icon: '🏪'
		}
	],

	[
		{
			name: 'Забегаловка',
			cost: 300000,
			earn: 2700,
			workers: 3,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Общепит',
			cost: 450000,
			earn: 4350,
			workers: 7,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Ресторан',
			cost: 450000,
			earn: 7400,
			workers: 15,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Небольшая сеть ресторанов',
			cost: 4000000,
			earn: 19900,
			workers: 80,
			id: 3,
			icon: '🍷'
		},

		{
			name: 'Лучшие рестораны в стране',
			cost: 11000000,
			earn: 47400,
			workers: 300,
			id: 3,
			icon: '🍷'
		}
	],

	[
		{
			name: 'Мини-магазин',
			cost: 500000,
			earn: 4100,
			workers: 15,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Магазин',
			cost: 1250000,
			earn: 9350,
			workers: 10,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Сеть магазинов',
			cost: 3000000,
			earn: 23350,
			workers: 70,
			id: 4,
			icon: '🏫'
		},

		{
			name: 'Сеть супермаркетов',
			cost: 20000000,
			earn: 109850,
			workers: 500,
			id: 4,
			icon: '🏫'
		}
	],

	[
		{
			name: 'Завод в гараже',
			cost: 1500000,
			earn: 8800,
			workers: 5,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Средний завод',
			cost: 3500000,
			earn: 13800,
			workers: 20,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Сеть заводов',
			cost: 15000000,
			earn: 60800,
			workers: 200,
			id: 5,
			icon: '🏭'
		},

		{
			name: 'Главные заводы страны',
			cost: 50000000,
			earn: 274800,
			workers: 1000,
			id: 5,
			icon: '🏭'
		}
	]
	
];

 

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
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	match: (str, balance) => Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))) < 0 ? 0 : Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))),
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
	},
	time: () => {
		return parseInt(new Date().getTime()/1000)
	}
}

vk.setOptions({
    token: '', // токен группы
    apiMode: 'parallel',
	pollingGroupId:  // 1 замени на id группы 
}); 




var Qiwi = require('node-qiwi-api').Qiwi; 
var Wallet = new Qiwi('');


vk.updates.use(async (message, next) => {  
	
	

    if (message.is("message") && message.isOutbox)
        return; 
    if(Number(message.senderId) <= 0) return;
    message.user = message.senderId;
    message.text = message.payload.text;  

    if (!message.text) return;
 
    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}

 		let id = user_id(message.user); 

	 	   
		acc.users[numm] = {
			id: message.user,
			number: numm,
			balance: 0,
			lczar: 1,
			sklad: 0,
			skladmax: 1440,
			skladlvl: 1,
			skladup: 1440,
			rinok: 0,
			mnojitel: 1,
			bonusgrupa: 0,
			donate: 0,
			vsego_donat: 0,
			buisness: [],
			level: 0, 
			bonus: 0,
			giverub: 0,
			referal: 0,
			referall: 0,
			btop: false,
			podpiska: true,
			number: numm,
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
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
			warn: 0,
			warn_p: [],		
			prefix: `Игрок #${numm}`,
			clan: false,
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

		    if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, '').trim();
		    
	if(message.text){ 
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.users[id].mute == true) return; 
		let start = Date.now();
		await next();
		let end = Date.now();
	}
  	
    try {
    } catch (err) { console.error(err) }
});


const mentionRegexp = new RegExp(`\\[club185429331\\|(.*)\\]`);
   

   async function updateWidget() { 
var tops = [] 
for (i=1;i<200000;i++) { 
if(acc.users[i]) { 
if(acc.users[i].level < 3 && acc.users[i].btop == false) { 
tops.push({id: i, idvk: acc.users[i].id, balance: acc.users[i].balance, lczar: acc.users[i].lczar}); 
} 
} 
} 
tops.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0 
}) 

var script = { 
title: `Топ лучших игроков`, 
head: [ 

{ 
text: 'Ник' 
}, 

{ 
text: 'LC', 
align: 'right' 
}, 

{ 
text: 'Cкорость LC/мин', 
align: 'right' 
} 
], 
body: [] 
} 

for (var g = 0; g < 10; g++) { 
if (tops.length > g) { 
var ups = g; 
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
text: `${spaces(acc.users[tops[g].id].balance)} LC` 
}, 

{ 
text: `${spaces(tops[g].lczar)} LC/мин` 
}, 
]) 
} 
} 
requests.post({url: 'https://api.vk.com/method/appWidgets.update', form:{ 
v: '5.95', 
type: 'table', 
code: `return ${JSON.stringify(script)};`, 
access_token: '' 
} 
}, 
function(err, resp, body) { 
console.log(body) 
}) 
} 
updateWidget() 
setInterval(updateWidget, 600000)


	vk.updates.hear(/^(?:начать|помощь)$/i,  (message) => { 
       return message.send(` 

👨‍💻 Профиль 
💰 Собрать - собрать LC со склада 
🕋 Улучшить склад 
🎈 Бот - информация о боте 
🖲 Реф/Реферал - приглашай друзей 
📈 Рынок - покупка рынка 
🎁 Бонус
💹 Скорость (кол-во) - ускорение LC/мин (1 LC/мин - 5.000 LC)
⚔ Кланы - команды кланов
🔥 Привилегия
✅ Пбонус - бонус за подписку на группу`, 

 {
keyboard:JSON.stringify(
{
"one_time": false,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "👨‍💻 Профиль"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "💰 Собрать"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "💰 Улучшить склад"
},
"color": "default"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\": \"1\"}",
"label": "🎈 Бот"
},
"color": "default"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "🎁 Бонус"
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "📈 Рынок"
},
"color": "default"
}]
]
})
   });
	});



 	

vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([^\s  ].*)?/i, (message) => {
              let user = acc.users[user_id(message.user)]; 

		message.$match[2] = message.$match[2].replace(/(\.|\,)/ig, '');
		message.$match[2] = message.$match[2].replace(/(к|k)/ig, '000');
		message.$match[2] = message.$match[2].replace(/(м|m)/ig, '000000');
		message.$match[2] = message.$match[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);

	if(!message.$match[1] || !message.$match[2]) return message.send(`❓// Пример команды: передать (ID) (СУММА)`)
	if(user.admin.block_pay == true) return message.send(`‼ У вас заблокированы переводы денег.`)   

	if(user.level < 1){
		if(message.$match[2] > 10000) return message.send(`💰 Максимальная сумма передачи 10.000 LC`)  
	}
	if(user.level == 1){
		if(message.$match[2] > 50000) return message.send(`💰 Максимальная сумма передачи 50.000 LC`)  
	}
	if(user.level == 2){
		if(message.$match[2] > 100000) return message.send(`💰 Максимальная сумма передачи 100.000 LC`)  
	}
	if(user.level == 3){
		if(message.$match[2] > 200000) return message.send(`💰 Максимальная сумма передачи 200.000 LC`)  
	}
	if(user.level > 3){}
 
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`‼ ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0 || acc.users[message.$match[1]] == user.number) return message.send(`‼ Некорректно введены данные`)
	if(message.$match[2] > user.balance) return message.send(`‼ У вас нет столько LC`);
	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]); 	
	acc.peredali += 1
	acc.peredali_summa += Number(message.$match[2])

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💰 Игрок [ID: ${id}] ${user.prefix} перевел вам ${spaces(message.$match[2])} LC`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💰 Вы успешно перевели ${acc.users[message.$match[1]].prefix} ${spaces(message.$match[2])} LC.`);
});			 


///// АДМИН КОМАНДЫ - - - -- - - 
 
 




 	 	

 	 	


  vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	 		let user = acc.users[user_id(message.user)];
	if(!message.$match[1])
	{
		var text = `бизнесы:\n`;
		for(var i = 0; i < buisnesses.length; i++)
		{
			text += `${(user.buisness.length == 1 && user.buisness[0].id == i + 1) || (user.buisness.length == 2 && user.buisness[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${buisnesses[i][0].name} - ${spaces(buisnesses[i][0].cost)} LC\nПрибыль: ${spaces(buisnesses[i][0].earn)} LC/час\n`;
		}
		return message.send(text);
	}
	/*return bot(`бизнесы:
${message.user.buisness[0].id == 1 || message.user.buisness[1].id == 1 ? '🔸' : '🔹'} 1. Шаурмечная - 50.000$
⠀ ⠀ ⠀ Прибыль: 400$/час
${message.user.buisness[0].id == 2 || message.user.buisness[1].id == 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000$
⠀ ⠀ ⠀ Прибыль: 700$/час
${message.user.buisness[0].id == 3 || message.user.buisness[1].id == 3 ? '🔸' : '🔹'} 3. Забегаловка - 300.000$
⠀ ⠀ ⠀ Прибыль: 2.500$/час
${message.user.buisness[0].id == 4 || message.user.buisness[1].id == 4 ? '🔸' : '🔹'} 4. Магазин - 500.000$
⠀ ⠀ ⠀ Прибыль: 3.800$/час
${message.user.buisness[0].id == 5 || message.user.buisness[1].id == 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000$
⠀ ⠀ ⠀ Прибыль: 8.000$/час
${message.user.buisness[0].id == 6 || message.user.buisness[1].id == 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000$
⠀ ⠀ ⠀ Прибыль: 70.000$/час
${message.user.buisness[0].id == 7 || message.user.buisness[1].id == 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000$
⠀ ⠀ ⠀ Прибыль: 220.000$/час
${message.user.buisness[0].id == 8 || message.user.buisness[1].id == 8 ? '🔸' : '🔹'} 8. Разработка игр - 150.000.000$
⠀ ⠀ ⠀ Прибыль: 300.000$/час
${message.user.buisness[0].id == 9 || message.user.buisness[1].id == 9 ? '🔸' : '🔹'} 9. Нефтевышка - 500.000.000$
⠀ ⠀ ⠀ Прибыль: 700.000$/час
${message.user.buisness[0].id == 10 || message.user.buisness[1].id == 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 800.000.000$
⠀ ⠀ ⠀ Прибыль: 1.000.000$/час
${message.user.buisness[0].id == 11 || message.user.buisness[1].id == 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000$
⠀ ⠀ ⠀ Прибыль: 50.000.000$/час
]"`);*/

	if(user.buisness.length == 2) return message.send(`у вас уже есть 2 бизнеса`);

	message.$match[1] = Number(message.$match[1]) - 1;
	const sell = buisnesses[message.$match[1]][0];
	if(sell == null) return;
	if(user.balance < sell.cost) return message.send(`недостаточно денег`);
	user.balance -= sell.cost;
	user.buisness.push({
		"id": message.$match[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return message.send(`вы купили "${sell.name}" за ${(sell.cost)} LC`);
});




vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {
              let user = acc.users[user_id(message.user)]; 

		message.$match[1] = message.$match[1].replace(/(\.|\,)/ig, '');
		message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
		message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');
		message.$match[1] = message.$match[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);

        if(!message.$match[1]) return message.send(`🔸 ➾ укажите ставку`);
        let amount = Number(message.$match[1]);
        amount = Math.round(amount);   
        if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
        if (amount > user.balance || amount < 1 ) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
 		
			if (amount > 25000 && amount != user.balance) return message.send(`Ставка не должна быть больше 25.000 LC`);

        let mnojitel = [1,2,1,0.25,2,0,1,0.25,0.5,0.75,1,3,2,1,0.25,0].random();
        	let vigrish = message.$match[1] * mnojitel
        	let cha = rand(1, 100);
        	if(cha > 98) {
			let huinia = 1 * (1 / 100) * (message.$match[1])
			let jack_plus = Number(huinia.toFixed(0))
			acc.jackpot += Number(jack_plus)
			user.balance -= amount
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance);
        	user.balance += Number(acc.jackpot);
        	acc.last_jackpot = acc.jackpot
        	acc.jackpot = 0
         return message.send(`[id${user.id}|${user.prefix}], ${mnojitel < 1 ? `вы проиграли ⛔ ${spaces(message.$match[1] - (message.$match[1] * mnojitel))} LC ` : `вы выиграли ${spaces(vigrish - message.$match[1])} LC`} (x${mnojitel} ✅) 
💰 Ваш баланс: ${spaces(user.balance)} LC\n\n 💥 Вы получили джекпот бота в размере ${spaces(acc.last_jackpot)} LC! Поздравляем!`); 
}else{ 
let huinia = 1 * (1 / 100) * (message.$match[1]) 
let jack_plus = Number(huinia.toFixed(0)) 
acc.jackpot += Number(jack_plus) 
user.balance -= amount 
let balance = amount; 
let win_balance = amount * mnojitel; 
win_balance = Math.round(win_balance); 
user.balance += Number(win_balance) 
return message.send(`[id${user.id}|${user.prefix}], ${mnojitel < 1 ? `вы проиграли ⛔ ${spaces(message.$match[1] - (message.$match[1] * mnojitel))} LC` : `вы выиграли ${spaces(vigrish - message.$match[1])} LC`} (x${mnojitel} ✅) 
💰 Ваш баланс: ${spaces(user.balance)} LC\n\n`);
	};
});


	vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`😧 Вы не написали жалобу | Репорт (Жалоба)`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

				vk.api.call("messages.send", {
					chat_id: 1,
					message: `🥃 Хватит отдыхать, тут репорт\n🤖 ID игрока: ${user_id(message.user)}\n😡 Жалоба: ${message.$match[1]}\n✉ Для ответа: ans [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
	
		return message.send(`⭐ Вы успешно отправили репорт.`);
	});


	vk.updates.hear(/^(?:ans)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🤖 У вас заблокированы ответы на репорт.`)
		if(user.level < 2) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🤖 Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `👤 Администратор: ${user.prefix} ответил Вам:\n 💭 ${message.$match[2]}\n\n❓ Оцените ответ: отзыв +/-`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `👤 Администратор: ${user.prefix} (${user.number}) ответил игроку - ID ${message.$match[1]} :\n 💭 ${message.$match[2]}`
				}).then((res) => {}).catch((error) => {console.log('report error'); });		
		var is = [user_id(message.user), message.text] 
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`✅ Ответ отправлен.`)
	});


	vk.updates.hear(/^(?:сетник)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`); 
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = message.$match[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`🚫 Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`🚫 Придумайте адекватный ник`);
		}
		var is = [user_id(message.user), message.text] 
		acc.users[message.$match[1]].prefix = message.$match[2];
		vk.api.call("messages.send", {
			chat_id: 1,
			message: `👤 Администратор: ${user.prefix} (${user.number}) сменил ник игроку - ID ${message.$match[1]} :\n 💭 ${message.$match[2]}`
				}).then((res) => {}).catch((error) => {console.log('report error'); });		
		return message.send(`🚫 Вы сменили ник игрока на: ${message.$match[2]}`);
	});


		vk.updates.hear(/^(?:топбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`Пример команды: топбан [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);
		if(message.$match[1] == 1) return message.send(`Вы попытались забанить создателя. Создатель получит об этом оповещение,и будет принимать меры.`);
		acc.users[message.$match[1]].btop = true;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ${user.prefix} заблокировал доступ к топу.\n💭 Причина: ${message.$match[2]}`
		});
				vk.api.call("messages.send", {
			chat_id: 1,
			message: `👤 Администратор: ${user.prefix} (${user.number}) заблокировал доступ к топу игрока ID ${message.$match[1]} :\n 💭 Причина ${message.$match[2]}`
				}).then((res) => {}).catch((error) => {console.log('report error'); });		
		var is = [user_id(message.user), message.text] 
		return message.send(`✅ Вы заблокировали топ игроку [${acc.users[message.$match[1]].prefix}].\n💭 Причина: ${message.$match[2]}`);
	}); 
 
 

vk.updates.hear(/^(?:сетмани)\s?([^\s  ].*)?/i, (message) => {
              let user = acc.users[user_id(message.user)]; 

		message.$match[1] = message.$match[1].replace(/(\.|\,)/ig, '');
		message.$match[1] = message.$match[1].replace(/(к|k)/ig, '000');
		message.$match[1] = message.$match[1].replace(/(м|m)/ig, '000000');

	if(user.admin.block_give == true) return message.send(`🔸 У вас заблокирована выдача валюты.`)
	if(user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
	if(user.giverub != 0) return message.send(`Вы недавно выдавали себе валюту, подождите ещё ${timer(user.giverub)}`);
	user.giverub = 3600
	if(user.level == 2){ 
if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 500000) return message.send(`💰 Пример: 'сетмани (1-500.000)'`); 
user.balance += Number(message.$match[1]); 
} 
if(user.level == 3){ 
if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 2000000) return message.send(`💰 Пример: 'сетмани (1-2.000.000)'`); 
user.balance += Number(message.$match[1]); 
} 
if(user.level == 4){ 
if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 5000000) return message.send(`💰 Пример: 'сетмани (1-5.000.000)'`); 
user.balance += Number(message.$match[1]); 
} 
if(user.level > 5){ 
if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 80000000) return message.send(`💰 Пример: 'сетмани (1-10.000.000)'`); 
user.balance += Number(message.$match[1]);
	}

		vk.api.call("messages.send", {
			chat_id: 1,
			message: `👤 Администратор: ${user.prefix} (${user.number}) использовал команду setmoney на ${spaces(message.$match[1])}`
				}).then((res) => {}).catch((error) => {console.log('report error'); });		

	return message.send(`💰 Вы выдали себе ${spaces(message.$match[1])}$`);
});



vk.updates.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'giverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);
		 	
			var is = [user_id(message.user), message.text] 
			vk.api.call("messages.send", {
			chat_id: 1,
			message: `💰 GIVERUB || Администратор: ${user.prefix} (${user.number}) выдал игроку ID: ${message.$match[1]}  ${spaces(message.$match[2])} LC`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			return message.send(`💰 Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} LC`);
 
	 
});

vk.updates.hear(/^(?:ungiverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'ungiverub [ID] [COUNT]'`); 
			acc.users[message.$match[1]].balance -= Number(message.$match[2]);
		 	

			var is = [user_id(message.user), message.text] 
			return message.send(`💰 ➾ Вы отняли у (@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})) ${spaces(message.$match[2])}$`);
 
	 
});

vk.updates.hear(/^(?:removerub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'removerub [ID]'`); 
			acc.users[message.$match[1]].balance = 0;
			return message.send(`💰 ➾ Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});


vk.updates.hear(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`🔸 ➾ Вы не спец.администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedonate [ID] [COUNT]'`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	return message.send(`💎 ➾ Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} рубинов💎`);
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


 

vk.updates.hear(/^(?:delluser)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'delluser [ID]'`); 

			acc.users[message.$match[1]].balance = 0;
			acc.users[message.$match[1]].lczar = 1;
			acc.users[message.$match[1]].mnojitel = 1;
		 	acc.users[message.$match[1]].donate =0
		 	acc.users[message.$match[1]].bonus =0
		 	acc.users[message.$match[1]].giverub =0		 	
		 	acc.users[message.$match[1]].msg.messages = 0
		 	acc.users[message.$match[1]].msg.last_msg = ''
		 	acc.users[message.$match[1]].prefix = `Удален | ${time()} | ${data()}`
		 	acc.users[message.$match[1]].rep.status = false
		 	acc.users[message.$match[1]].rep.id = false 
		 	acc.users[message.$match[1]].warn = 0 
		 	acc.users[message.$match[1]].warn_p = []
		 	acc.users[message.$match[1]].level = 0
		 			return message.send(`Вы успешно удалили аккаунт ID: ${message.$match[1]}`);
	
});
 
//////////////// mute /////////

	vk.updates.hear(/^(?:варн)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);
		if(user.level < 2) return message.send(`Вы не Модератор`);
		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);

		var is = [user_id(message.user), message.text] 

		let text = `✅ ${user.prefix} выдал вам warn(предупреждение)`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n🔸 —> У вас 3 предупреждения.\n🔸 —> Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`✅ Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

	vk.updates.hear(/^(?:унварн)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 —> Пример команды: унаврн ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 —> Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 —> Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ —> Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ —> Администратор снял Вам все предупреждения`
		});
		var is = [user_id(message.user), message.text] 
		return message.send(`✅ —> Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

 


vk.updates.hear(/^(?:выговор)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 —> Пример команды: vig [ID] `);
		if(!Number(message.$match[1])) return message.send(`🔸 —> Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 —> Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ —> Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 

		let text = `✅ —> ${user.prefix} выдал вам админ-выговор.\n✅ —> После 3 вас снимет с админ-поста.`
		if(acc.users[message.$match[1]].ainfo.vig == 3){
			acc.users[message.$match[1]].ainfo.vig = 0;  
			acc.users[message.$match[1]].level = 0;
			text += `\n🔸 —> У вас 3 предупреждения.\n🔸 —> Вы лишились админ-прав.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`✅ —> Вы выдали выговор игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

	vk.updates.hear(/^(?:унвыговор)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 —> Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 —> Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 —> Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ —> Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Администратор снял Вам все выговоры`
		});
		var is = [user_id(message.user), message.text] 
		return message.send(`✅  Вы сняли все выговоры игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

///////////////////////////////////////////////////////////////////////////
		updates.hear(/^(?:🎈 Бот|Бот)$/i, (message) => {


let allbalance = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].balance)) {
        allbalance += acc.users[a].balance
    }
    }
}

let alllczar = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].lczar)) {
        alllczar += acc.users[a].lczar
    }
    if(acc.users[a].level = 1) {
        alllczar += acc.users[a].lczar
    }
}
}

let adminov = 0;
for(a in acc.users){
    if(acc.users[a].level > 2) {
        adminov += 1
    }
}

let clanall = 0;
for(a in acc.users){
    if(acc.users[a].clan != false) {
        clanall += 1
    }
}

let allsklad = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].sklad)) {
        allsklad += acc.users[a].sklad
}
}
}

let skladmax = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].skladmax)) {
        skladmax += acc.users[a].skladmax
}
}
}

let referal = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].referal)) {
        referal += acc.users[a].referal
}
}
}


let bonusgrupa = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].bonusgrupa)) {
        bonusgrupa += acc.users[a].bonusgrupa
}
}
}

let mnojitel = 0;
for(a in acc.users){
	if(acc.users[a].level < 2 && acc.users[a].btop == false)  {
    if(Number(acc.users[a].mnojitel)) {
        mnojitel += acc.users[a].mnojitel
}
}
}


    return message.send(`
🤖 Пользователей в боте : ${acc.number} 
💬 Принято сообщений: ${acc.msg} 
🎈 Между игроками переданно ${acc.peredali} раз на сумму ${spaces(acc.peredali_summa)} LC
👥 Группа: ${config.group_url}

⚔ Кланов созданно ${acc.numbers} (⚔ Всего в кланах людей: ${clanall})

в складах всего  ${spaces(allsklad)} вместимость ${spaces(skladmax)}
в рефералах находиться  ${spaces(referal)} человек
людей которые использывали бонус за подписку ${spaces(bonusgrupa)}
общий множитель в боте ${spaces(mnojitel)}
💰 Количество LC в боте: ${spaces(allbalance)} LC
💰 Общая скорость LC/мин: ${spaces(alllczar)} LC
🅰 Админов: ${spaces(adminov)} человек
        `)

});


		    setInterval(() => {

let b = 0;
for(i in acc.users){
	if(acc.users[i].level < 2 && acc.users[i].btop == false)  {
    if(Number(acc.users[i].balance)) {
        b += acc.users[i].balance
    }
    }
}

let z = 0;
for(i in acc.users){
	if(acc.users[i].level < 2 && acc.users[i].btop == false)  {
    if(Number(acc.users[i].lczar)) {
        z += acc.users[i].lczar
    }
}
}

let cp = 0;
for(i in acc.users){
    if(acc.users[i].clan != false) {
        cp += 1
    }
}

    let a = [`🤖 Пользователей в боте : ${acc.number}`,`💬 Принято сообщений: ${acc.msg}`,`🎈 Между игроками переданно ${acc.peredali} раз на сумму ${spaces(acc.peredali_summa)} LC`,`⚔ Кланов созданно ${acc.numbers} (⚔ Всего в кланах людей: ${cp})`, `💰 Общая скорость LC/мин: ${spaces(z)} LC`].random();
    user.api.status.set({
	group_id: 185429331,
	text: `OutsdecBot | ${a} | Приятной игры!`
    });
}, 60000);

		updates.hear(/^(?:oc)/i, message => {
          let os = require('os');
    let uptime = require('os-uptime');
    let cpu = os.cpus();
    if(message.user != 339414555) return;
    message.send(`
        System: ${os.type()} ${os.arch()}
        Version: ${os.release()}
        Memory: ${Math.floor(os.freemem() /1024/1024)} МБ используется из 5924 МБ
        Uptime: ${os.uptime()}
        Средние нагрузки: ${os.loadavg()}

`)
})

				updates.hear(/^(?:бесед(ы|а))/i, message => {

    message.send(`
        Беседа бота - https://vk.cc/9JpKFX
`)
})

		updates.hear(/^(?:онлайн)/i, (message) => {
    vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + message.chatId,
        fields: "online"
    }).then(function(res) {
        let text = '';
        for (i in res.profiles) {
            if (res.profiles[i].online == 1) {

                text += `🔸 [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}]\n`
            }
        }
        text += '⚠ Привлекаю ваше внимание!'
        return message.send(text)
    })

    function check(status) {
        if (status == 1) return "online"
        if (status == 0) return "offline"
    }
});

	

updates.hear(/^(?:созвать всех)/i, (message) => {
    let user = acc.users[user_id(message.user)]; 
    if(user.level < 4) return
    vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + message.chatId,
        fields: "online"
    }).then(function(res) {
        let text = '';
        let s = ["✨", "❤", "🌈", "😏", "🌍", "💀", "👹", "🙊"].random();
        for (i in res.profiles) {
            if (res.profiles[i].online == 1 || res.profiles[i].online == 0) {
                text += `[id${res.profiles[i].id}|&#4448;]`
            }
        }
        return message.send(text)
    })

    function check(status) {
        if (status == 1) return "online"
        if (status == 0) return "offline"
    }
});

	vk.updates.hear(/^(?:cid)$/i, (message) => {
		let dev = '';   
		return message.send(`
${message.chatId}
			`);
	});


vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 —> Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ ➾ ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
📋 Информация об игроке [${id.prefix}] 📋
🧔🏽 — Имя: ${id.prefix}
🆔 — ID: ${message.$match[1]}
🔢 — Цифровой: ${id.id}
👤 — VK: @id${id.id}(${id.prefix})
💰 — Баланс: ${id.balance}
🔹 — Биткоинов: ${id.bitcoin}
💎 — Рубинов: ${id.donate}
👪 — Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
ℹ️ — Дата регистрации: ${id.rtime}`);
	});


 vk.updates.hear(/^(?:чек)$/i, (message) => {  
	   if(message.replyMessage) {
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
    let a = message.forwards[0].from_id;
	let id = acc.users[user_id(a)];
	if(user.level < 1) return;
	return message.send(`
		🔎 ID: ${user_id(a)}
		🔹 VK: @id${id.id}(${id.prefix})
		💰 LC : ${spaces(id.balance)} LC
		🔹 Status:  ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Торговец").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
		\n⏰ Таймеры
		&#4448;&#4448;🎁 Бонус: ${timer(id.bonus)}`);
	}
	if(message.forwards[0]) {
		let user = acc.users[user_id(message.user)]; 
	let warns = '';
    let a = message.forwards[0].from_id;
	let id = acc.users[user_id(a)];
	if(user.level < 1) return;
	return message.send(`
		🔎 ID: ${user_id(a)}
		🔹 VK: @id${id.id}(${id.prefix})
		💰 LC : ${spaces(id.balance)} LC
		🔹 Status:  ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Торговец").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}
		\n⏰ Таймеры
		&#4448;&#4448;🎁 Бонус: ${timer(id.bonus)}`);
}
	});

vk.updates.hear(/^(?:профиль|проф|👨‍💻 Профиль)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
				vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0]; 
			}).catch((error) => {console.log('err[prefix]'); }); 
	
	let id = user_id(message.user);
	let ids = [0,1,2,3]
	let fer = [0,1,2,3]
	let warns = '';
		let text = ``;
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ ➾ ${user.warn_p[i]}\n`}

	if(!message.$match[1]){
		
text += `👻 Имя: ${user.prefix} (🆔 ID: ${spaces(user.number)})\n`
text += `${user.mnojitel == 1 ? `💰 LC: ${spaces(user.balance)} LC (${spaces(user.lczar)} LC/мин)\n` : `💰 LC: ${spaces(user.balance)} LC (${spaces(user.lczar * user.mnojitel)} LC/мин) (🔥 x${user.mnojitel} LC/мин)\n`}`
text += `🏕 Информация о складе: ${spaces(user.sklad)}/${spaces(user.skladmax)} LC\n ‼ Цена улучшения склада на ${spaces(user.skladlvl + 1)} уровень - ${spaces(user.skladup)} LC  (⚡ ${spaces(user.skladlvl)} lvl)\n\n`
if(user.clan) text +=  `🛡 Клан: ${clans[acc.users[user_id(message.user)].clan].name}\n\n`

if(user.number == acc.rinokvladelecid) text += `📈 Прибыль с рынка &#10133;${spaces(acc.number)} LC/мин \n\n`

text += `❗ Привилегия: ${user.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Торговец").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}\n`

if(user.warn) text += `⚠ Предупреждений: [${user.warn}] \n ⚠ — Причины: ${warns}`
}
	return message.send(`${text}`);
});

vk.updates.hear(/^(?:ник)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`‼ Придумайте адекватный ник`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`‼ Придумайте адекватный ник`);
	}
	if(message.$match[1].length > 20) return message.send(`‼ Максимальная длина ника 20 символов.`);
	user.prefix = message.$match[1];
	return message.send(`‼ Вы сменили свой ник на: ${message.$match[1]}`);
});

vk.updates.hear(/^(?:привилегия)$/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	return message.send(`Привилегия торговец доступна тем, кто пригласил от 5 человек (У вас: ${user.referal})\n После получения привилегии вы получаете 1440 LC и скорость добычи "LC/мин" в 2 раза! \n\n Чтобы получить привилегию, введите команду "Проверка"`)
   });


vk.updates.hear(/^(?:проверка)$/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.referal < 5) return message.send(`Чтобы получить привилегию "Торговец", надо пригласить 5 человек, вы пригласили всего ${user.referal}`)
	if(user.level == 1) return message.send(`Вы уже получили привилегию Торговец"`)
	user.level = 1
	user.mnojitel += 1
	user.balance += 1440
	return message.send(`Вы успешно получили привилегию торговец!`)
   });

vk.updates.hear(/^(?:собрать|💰 Собрать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let sobral = user.sklad
	if(user.sklad == 0) return message.send(`На складе пусто!`)
	user.balance += user.sklad
	user.sklad = 0
	return message.send(`Вы успешно собрали ${spaces(sobral)} LC!`)
   });


 
//////////////////////////////////////////
	
vk.updates.hear(/^(?:топ)$/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {

			if(acc.users[i]){
			if(acc.users[i].level < 3 && acc.users[i].btop == false){ 
				tops.push({
					id: i,
					idvk: acc.users[i].id,
					balance: acc.users[i].balance,
					lczar: acc.users[i].lczar
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
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					lczar: tops[g].lczar,
					smile: `${ups}`
				})
			}
		}
		var people = "Топ по LC\n\n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + "LC (" + spaces(a.lczar) + " LC/мин)").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	vk.updates.hear(/^(?:🎁 Бонус|бонус)/i, (message) => {  
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
 		if(user.bonus != 0) return message.send(`Вы уже получали бонус, следующий вы сможете получить через ${timer(user.bonus)}`);
 		user.bonus = 86400
		
 		text = 'Открыв кейс вы получили:\n'
 		let count = 1
 		for(i=0;i<count;i++){
 				mon = rand(100,1000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `🔹 ${spaces(mon)} LC\n`
 				acc.users[id].balance += mon
 		}
 		return message.send(text)
 	});


  
 	  setInterval(() => {

  	let rand_activ = rand(1,5);
  	let rand_balance = rand(100,500)
  	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	acc.promos[result] = {
		users: {},
		activ: rand_activ,
		type: 1,
		balance: rand_balance,
	}		

vk.api.call('messages.send', {
				chat_id: 5,
				message: `👨‍💻 Время на сервере ${time(1)}
							🏕 Игроков: ${spaces(acc.number)} (💬 ${spaces(acc.msg)})

		❗ Сгенерирован новый промокод ${result} на  ${spaces(rand_activ)} активаций и суммой в ${spaces(rand_balance)} LC `
			});

	}, 3600000);

 	   setInterval(() => {
 		
 		vk.api.call("messages.send", {
					chat_id: 5,
					message: [`🔥 Игроки бота OutsdecBot самые лучшие!`,`❗ Чем больше активности, тем больше обновлений!`,`✅ Проверка активности в нашем боте! Кто тут?`,`👨‍💻 Время на сервере ${time(1)}`,`🎵 Какую музыку любишь слушать?`,`💛 Моему создателю нравиться когда ты играешь в бота!`,`🗣 Чтобы быть топ 1, нужно пригласить всего 50 человек!`,`🕹 Моя цель - ${spaces(acc.number + 50)} игроков`].random()
				}).then((res) => {}).catch((error) => {console.log('report error'); });	

	}, 3000000);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 updates.hear(/^(?:set title)\s(.*)$/i, async (message, bot) => {
	                  let user = acc.users[user_id(message.user)]; 

	     if (!message.isChat) {
        return;
    }
    		if(user.level < 4) return;
		

    vk.api.call("messages.editChat", { chat_id: message.chatId, title: message.$match[1]})
    return message.send("Я успешно изменил название беседы на: " + message.$match[1]);
    });
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^eval\s([^]+)/i, (message) => {  
		if (message.user === 339414555) {
			return message.send(`Готово: ${eval(message.$match[1])}`);
		}
	});
 
 // - -- - - - - - - -- - - - -  Донат - - - - - 
 	
//////////////////////////////////////////////////////// промики
 	
 vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`Вы уже активировали промокод`);
 	acc.promos[message.$match[1]].users[message.user] = {i: true};
 	acc.promos[message.$match[1]].activ -= 1;
 	if(acc.promos[message.$match[1]].type == 1){
 		user.balance += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`📍 Вы активировали промокод!\n💰 Вы получили: ${acc.promos[message.$match[1]].balance} LC!\n 📟 Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}
 	if(acc.promos[message.$match[1]].type == 2){
 		user.donate += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`📍 Вы активировали промокод!\n💰 Вы получили: ${acc.promos[message.$match[1]].balance} DonateRub!\n 📟 Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}
 	if(acc.promos[message.$match[1]].type == 3){
 		user.lczar += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`📍 Вы активировали промокод!\n💰 Вы получили: ${acc.promos[message.$match[1]].balance} LC/мин!\n 📟 Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}

 	if(acc.promos[message.$match[1]].activ == 0) delete acc.promos[message.$match[1]];
 	return 
 });

 
  vk.updates.hear(/^(?:сетпромо)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return;
 	if(!message.$match[1]) return message.send(`Укажите сумму для промокода`);  

 	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	acc.promos[result] = {
		users: {},
		activ: message.$match[2],
		type: message.$match[1],
		balance: message.$match[3]
	}		
  
 	return message.send(`📮 Промокод на ${spaces(message.$match[2])} активаций \n 💰 Сумма промокода ${message.$match[3]} ${message.$match[1] == 2 ? `DonateRub` : `LC`}\n📰Введите: 'Промокод ${result}'`);
 }); 

  updates.hear(/^(?:keys)/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return;    
	let promo;
    promo = 'Ключи:\n\n';
    for (let id in acc.promos) {
        if (acc.promos[id]) {
            promo += `🔑 Ключ: ${acc.promos}\n👥 Активаций: ${acc.promos[id].activ}\n💰 Баланс: ${acc.promos[id].balance}$\n—————\n`;
        }
    }
    let text = `\n`;
    if (promo.length != 24) text += promo;
    return message.send(`${text}`);
});
 
 //////////// full dostup - - - - - - 

	vk.updates.hear(/^(?:сетпривилегия)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].level < 5) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 3) return;
			if(message.$match[1] == 1) return message.send(`Трогаешь создателя? Интересно, зачем же?`)
			if(!message.$match[1] || !message.$match[2]) return message.send(`Пример команды: giveadm ID LVL(1-5)`); 
			if(message.$match[2] > 5) return message.send(`Максимальный админ-уровень 5!`)
			if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`); 
			if(acc.users[message.$match[1]].level == message.$match[2]) return message.send(`У игрока уже есть эта привилегия!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ ➾ ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Торговец").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}.`
			});
			var is = [user_id(message.user), message.text] 
			return message.send(`Пользователь [id${acc.users[message.$match[1]].id}|${acc.users[message.$match[1]].prefix}] (ID: ${acc.users[message.$match[1]].number}) получил привилегию: [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Торговец").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Создатель")}]`);
		 
	});

 
	
///////////////////

	vk.updates.hear(/^(?:блокпередача)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user != 339414555) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	 
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);  
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
			message: `🏅 Администратор ${texts} Вам запрет на переводы. \n ✍ Не согласны с решением администрации? Подайте аппеляцию - https://vk.com/topic-185429331_39717065`
		}); 
		return message.send(`Вы ${texts}и запрет на переводы`);
	}); 
 
 
// Random integer 
function getRandomInt(x, y) {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}
 
// Random element from array
function getRandomElement(array) {
    return array[getRandomInt(array.length - 1)];
}
		 
		
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
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(",").split("").reverse().join("");
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
	//






	// log

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
				texts = `Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `Некорректный запрос.` 
			stat = true; 
		}
		return texts
 	} 
 
  //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\

 function getRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

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
function scl(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};
	
function timer(seconds) {
    if(seconds == "") return "0 секунд"
    var year = parseInt(seconds/31536000);
    seconds = seconds%31536000;
    var month = parseInt(seconds/2592000);
    seconds = seconds%2592000;
    var days = parseInt(seconds/86400);
    seconds = seconds%86400;
    var hours = parseInt(seconds/3600);
    seconds = seconds%3600;
    var minutes = parseInt(seconds/60); 
    seconds = seconds%60;
    year = (month == 0 ? "" : year + " " + scl(year, ["год", "года", "лет"]))
    month = (month == 0 ? "" : month + " " + scl(month, ["месяц", "месяца", "месяцев"]))
    days = (days == 0 ? "" : days + " " + scl(days, ["день", "дня", "дней"]))
    hours = (hours == 0 ? "" : hours + " " + scl(hours, ["час", "часа", "часов"]))
    minutes = (minutes == 0 ? "" : minutes + " " + scl(minutes, ["минуту", "минуты", "минут"]))
    seconds = (seconds == 0 ? "" : seconds + " " + scl(seconds, ["секунду", "секунды", "секунд"]))
    var gone = year + " " + month + " " + days + " " + hours + " " + minutes + " " + seconds
    return gone
};

//------------------------------------------------------------------------------------\\ 
 
  	function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				
				}
			} 
	}
 

setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/clans.json", JSON.stringify(clans, null, "\t"));
}, 1000);




   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].bonus != 0){
	 				acc.users[i].bonus -= 1;
	 				}
	 				if(acc.users[i].giverub != 0){
	 				acc.users[i].giverub -= 1;
	 			    }
	 		}
	 	}
 	}, 1000); 

    setInterval(() =>{
 			if(acc.rinokcooldown != 0){
	 			acc.rinokcooldown -= 1;
	 				
	 	}
 	}, 1000); 


   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].lczar != 0 && acc.users[i].sklad <= acc.users[i].skladmax){
	 				acc.users[i].sklad += acc.users[i].lczar * acc.users[i].mnojitel;
	 				}
	 		}
	 	}
 	}, 60000); 


   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].sklad >= acc.users[i].skladmax){
	 				acc.users[i].sklad = acc.users[i].skladmax;
	 				}
	 		}
	 	}
 	}, 1000); 

setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.rinokvladelecid == acc.users[i].number){
	 				acc.users[i].balance += acc.number;
	 				}
	 		}
	 	}
 	}, 60000); 


 	    setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(clans[i]){
 				if(clans[i].clanlczar != 0){
	 				clans[i].balance += clans[i].clanlczar
				 }
	 		}
	 	}
 	}, 60000); 