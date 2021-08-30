const rq = require("prequest");
const fs = require("fs");  
const { VK, Keyboard } = require('vk-io');
const vk = new VK();  
const str = new VK();  
const { updates } = vk;   
const bot = vk.updates;
let user = new VK(); 

user.setOptions({ 
token: '5a9cf27657d3a05a633a4e3fc0a3209575dfd3f311983d197467cd6fe4a4e2dab883af729887384da258e' 
});
/*----------------------------------------------------------------------------------------------------------*////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
const acc = require("./base/acc.json");  
const f = require("./plugins/functions.js") //Functions
/*----------------------------------------------------------------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
setInterval(async () => {
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))   
}, 1500);
/*----------------------------------------------------------------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
vk.setOptions({ 
	token: '5a9cf27657d3a05a633a4e3fc0a3209575dfd3f311983d197467cd6fe4a4e2dab883af729887384da258e', // 
	apiMode: 'parallel',  
	pollingGroupId: 175184730// 
});  
/*----------------------------------------------------------------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////


var limits = {}
 
/*------------------------------------- Message handling----------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////

vk.updates.use(async (message, next) => {     

	if (message.is("message") && message.isOutbox) { return; } 
	message.user = message.senderId; 
	message.text = message.payload.text; 
	if (!message.text) { return; } 
 	const info = await vk.api.users.get({ user_id: message.user });
    if(!acc.users.find(a => a.vk === message.user)){ 
    	acc.number++; 
    	acc.users.push(
    		{
				id: acc.number, 
				vk: message.user,
				balance: 0,
				admin: 	0,
				vip: 	0,
				ban: 	false,
				prefix: info[0].first_name,
				modules:    	
				{
					"1": 		{
						price: 	50,
						count:  0,
						profit: 1
					},
					"2": 		{
						price: 	1400,
						count:  0,
						profit: 2
					},
					"3": 		{
						price: 	2500,
						count:  0,
						profit: 3
					},
					"4": 		{
						price: 	5000,
						count:  0,
						profit: 4
					},
					"5": 		{
						price: 	10250,
						count:  0,
						profit: 6
					},
					"6": 		{
						price: 	15000,
						count:  0,
						profit: 8
					},
					"7": 		{
						price: 	40000,
						count:  0,
						profit: 10
					}
				}
			}
    	)
    	return message.send(`[@id${message.user}(${info[0].first_name})] => Вы зарегистрировались в [club123|MinerBot]`)////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
    } 

	if (/\[club123\|(.*)\]/i.test(message.text)) { message.text = message.text.replace(/\[club123\|(.*)\]/ig, '').trim(); }  ////DEVELOPER - TEMA DOBRIY (FPSKIN)///// 
 	  
 	 
   	if (!limits[message.user]) {
		limits[message.user] = {   
			block_bonus: 	0
		}
	} 
	
	const user = acc.users.find(a => a.vk === message.user);

	if (message.text) {   
		user.balance += 1;
		if(user.balance % 100 == 0){
			message.send(`@id${message.user}([${user.prefix})] => Ваш баланс: ${user.balance} COIN`);////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
		}
	}

	if (user.ban == true) return;
	try { await next(); } catch (err) { console.error(err) }

});

 

////////////////////////////////////////////////////////////////////////
///////////////////////////ДОНАТ///////////////////////////////
//////////////////////////////////////////////////////////////////////// 
bot.hear(/^(?:Донат)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(
		`Здесь напишите ваш прайс на донат!!!!!!`
	);	
});
//////////////////////////////////////ДОНАТ///////////

bot.hear(/^(?:поиск)\s?(.*)?/i, (message) => { 
	let args = message.$match; 

	vk.api.call("utils.resolveScreenName", {
			screen_name: args[1]
	}).then((res) => { 
		var id = res.object_id;

		let user = acc.users.find(a => a.vk === id); 
		if(!user) return message.send(`✉ Игрок не найден...\n✉ Пример ввода: 'поиск https://vk.com/direnyov' `) 

		return message.send(`
			🔹 Игрок: ${user.prefix}
			🔹 VK: vk.com/id${user.vk}
			🔹 ID: ${user.id}
			🔹 Баланс: ${user.balance}
		`);
	})
});  

bot.hear(/^(?:передать|перевод)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match;  
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`💸 Пример: "Передать ID СУММА"`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	if(user.balance < args[2]) return message.send(`💸 У вас недостаточно денег`);
	if(args[1] == user.id) return message.send(`💸 Вы указали свой ID`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`💸 Вы указали неверный ID`);

	user.balance -= Number(args[2]);
	u.balance += Number(args[2]);
	return message.send(`${f.time()}\n💸 Вы успешно передали ${args[2]} coins игроку ${u.prefix}`);

});

bot.hear(/^(?:Инфо|📝 инфо)/i, (message) => {  

	return message.send(
		`
		📮 Чтобы начать получать COIN 
		👦 Вам нужно написать 50 любых сообщений нашему боту.
		✉ За каждое сообщение вы получаете 1 BOT COINS.
		💸 За COIN вы можете покупать ускорения ('ускорение')
		💰 Которые автоматически будут приносить вам прибыль!

		🏆 Чем больше у вас BOT COIN - тем выше вы в топе!

		`,
		
		{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "КЛИК"
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
			},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "ТОП"
		},
			"color": "positive"
			},
			{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "ИНФО"
			},
				"color": "positive"
			}]
		]
			})
		});
		}
		);		

vk.updates.hear(/^(?:обменять)\s?([1-9]+)?/i, message => {
 	
 		return message.send(
		    `
 			Недоступно на данный момент!
 			`
	    );
 	}); 
		
bot.hear(/^(?:Баланс)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(
		`💴 Ваш баланс: ${f.spaces(user.balance)} coins`
	);	
});

bot.hear(/^(?:помощь)/i, (message) => {  

			return message.send(
				`
				Основные:
				 📝 Инфо - информация о проекте
				 💼 Профиль 
				 ♻ Ускорение
				 🎁 Бонус
				 🔝 Топ
				 🔍 Поиск [ссылка(вк)]
				 💰 Передать [ссылка(вк)] [сумма]
				 👑 Донат
				 💴 Баланс
				 
				Развлекательные:
				🔮 Шар (фраза)
				💞 Лтест - сколько человек вас любят
				❓ Когда [фраза] - предсказывает когда случится событие
				🔎 Кто я - узнать кто Ты на самом деле...
				`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "КЛИК"
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
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "ТОП"
				},
					"color": "positive"
					},
					{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "ИНФО"
					},
						"color": "positive"
					}]
				]
					})
				});
				}
				);
		
		
		bot.hear(/^(?:команды)/i, (message) => {  
		
			return message.send(
				`
				Основные:
				 📝 Инфо - информация о проекте
				 💼 Профиль 
				 ♻ Ускорение
				 🎁 Бонус
				 🔝 Топ
				 🔍 Поиск [ссылка(вк)]
				 💰 Передать [ссылка(вк)] [сумма]
				 👑 Донат
				 💴 Баланс
				 
				Развлекательные:
				🔮 Шар (фраза)
				💞 Лтест - сколько человек вас любят
				❓ Когда [фраза] - предсказывает когда случится событие
				🔎 Кто я - узнать кто Ты на самом деле...
		
				`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "КЛИК"
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
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "ТОП"
				},
					"color": "positive"
					},
					{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "ИНФО"
					},
						"color": "positive"
					}]
				]
					})
				});
				}
				);
  
bot.hear(/^(?:бонус|🎁 бонус)/i, (message) => {  

	let user = acc.users.find(a => a.vk === message.user); 
	
	min = limits[message.user].bonus_min; 
	if (limits[message.user].bonus == true) return message.send(`[@id${message.user}(${user.prefix})] => Брать бонус можно через: ${min} минут `); 
	limits[message.user].bonus = true;
 
	limits[message.user].bonus_min = 60

	setTimeout(() => {
		limits[message.user].bonus = false;
	}, 3600000);

	let ss = f.rand(100,2000);
	if(user.vip >= 1){
		ss += f.rand(200,600)
	}
	user.balance += ss;
	return message.send(`
	[@id${message.user}(${user.prefix})] => Вы получили ${f.spaces(Math.round(ss))} coins
	`);
});
  
bot.hear(/^(?:ускорение|ускорения|улучшения|♻ ускорение|♻ ускорения|♻ улучшения)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match; 

	if (!args[1]) {
		return message.send(
			`
			➡ - - Покупка ускорений - - ⬅
			🔔  Название | Цена | Доход 🔔

			1&#8419;. Курсор | ${user.modules["1"].price} | +1/сек 
			2&#8419;. Видеокарта | ${user.modules["2"].price} | +2/сек
			3&#8419;. Стойка Видеокарт | ${user.modules["3"].price} | +3/сек
			4&#8419;. Суперкомпьютер | ${user.modules["4"].price} | +4/сек
			5&#8419;. Сервер ВКонтакте | ${user.modules["5"].price} | +6/сек
			6&#8419;. Квантовый компьютер | ${user.modules["6"].price} | +8/сек
			7&#8419;. Датацентр | ${user.modules["7"].price} | +10/сек

			➡ - -  Для покупки напишите "Ускорение (номер)" - - ⬅
			➡ - -  Пример: "Ускорение 1" - - ⬅
			`
		);	
	}
	let i = args[1];
	
	if (!Number(i) || i < 0 || i > 7) return message.send(`[@id${message.user}(${user.prefix})] => Неверно указан номер ускорения!`, {keyboard: menu});
	if (user.balance < user.modules[Number(i)].price) return message.send(`[@id${message.user}(${user.prefix})] => У вас недостаточно COINS`);

	user.balance -= Number(user.modules[Number(i)].price);
	user.modules[Number(i)].price += (Math.round(user.modules[Number(i)].price * 0.5));
	user.modules[Number(i)].count += 1;

	return message.send(`[@id${message.user}(${user.prefix})] => Вы успешно преобрели ускорение!\n❗ Подробная информация в 'профиль'`);
	 
});



bot.hear(/^(?:профиль|проф|💼 профиль| 💼 проф)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(`
	🆔 ID: ${user.id}

	💰 Баланс: ${f.spaces(user.balance)} coins
	
	⏳ Ваши ускорения ⏳ 
	📕 Курсор [${user.modules["1"].count}] +${user.modules["1"].count*1}/сек
	📗 Видеокарта  [${user.modules["2"].count}] +${user.modules["2"].count*2}/сек
	📘 Стойка Видеокарт  [${user.modules["3"].count}] +${user.modules["3"].count*3}/сек
    📙 Суперкомпьютер  [${user.modules["4"].count}] +${user.modules["4"].count*4}/сек
    📔 Сервер ВКонтакте [${user.modules["5"].count}] +${user.modules["5"].count*6}/сек
	📓 Квантовый компьютер  [${user.modules["6"].count}] +${user.modules["6"].count*8}/сек
	🖥 Датацентр [${user.modules["7"].count}] +${user.modules["7"].count*10}/сек

	💿 Суммарно: ${(user.modules["1"].count*1)+(user.modules["2"].count*2)+(user.modules["3"].count*3)+(user.modules["4"].count*4)+(user.modules["5"].count*6)+(user.modules["6"].count*8)+(user.modules["7"].count*10)}/сек
	`);
	 
});       

bot.hear(/^(?:топ|🔝 топ)/i, (message) => { 

	let text = ``; var tops = []
	 
	for (i=0; i<acc.users.length; i++) { 
		tops.push({
			id: acc.users[i].id,
			vk: acc.users[i].vk, 
			balance: acc.users[i].balance,
			prefix: acc.users[i].prefix
		}) 
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
			yo.push({ id: tops[g].id, vk: tops[g].vk, balance: tops[g].balance, prefix: tops[g].prefix, smile: `${ups}` })
		}
	}
	text = "💴 Топ игроков 💴 \n" + yo.map(a => a.smile + `. ${a.prefix} >> vk.com/id${a.vk} >> ${Math.round(a.balance)} Coins`).join("\n") 
 

	for (i=0;i<tops.length;i++) {
		if(message.user == tops[i].vk) {
			return message.send(text + `\n- - - - - -\n~ Вы на ${i+1} месте ~`)
		}
	} 
});


bot.hear(/^(?:клик)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let ss = f.rand(100,200);
	if(user.vip >= 1){ 
	ss += f.rand(200,300) 
	} 
	
	user.balance += ss; 
	return message.send(` 
	@id${message.user}(${user.prefix}), круто кликаешь😃!\n💰Ты накликал(а): ${f.spaces(Math.round(ss))} coins `,
	{
		keyboard:JSON.stringify(
	{
		"one_time": false,
		"buttons": [
		[{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"1\"}",
			"label": "КЛИК"
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
		},
	{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"3\"}",
			"label": "ТОП"
	},
		"color": "positive"
		},
		{
			"action": {
			"type": "text",
			"payload": "{\"button\": \"4\"}",
			"label": "КОМАНДЫ"
		},
			"color": "positive"
		}]
	]
		})
	});
	}
	);


//развлекательные 

bot.hear(/^(?:кто я)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let rez = [true, false].random();
	if(rez == false){
	}else{ 
		let count = ['Ивангай','Топчик','телка','Майнкрафтер','чмо','крутой','принц','телка админа','человек','пес','овца','лох','ъеъ','кися','Панин','дебил','богатый','миллионер','ауешник','плохой человек','снежный человек','пукан','сын маминой подруги','отец 7-х козлят','какашка единорога','Капитан','говно','упоротый','алкаш','терминатор','пчелка','фея','Анжелла','Рикардо Милос',' флексер','Путин','Навальный','офник','спулае мулае',' гонщик нелегальный','боб строитель','целка','шлюшка','создатель бота'].random();
		return message.send(`Думаю что ты ${count} :)`);
	}
}); 
bot.hear(/^(?:шар)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"'].random();
		return message.send(`😃 ${count}`);
	}
}); 
bot.hear(/^(?:когда)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let rez = [true].random();
	if(rez == false){
	}else{ 

		return message.reply(`😃 Думаю что через ${rand(1,360)} дней`);
	}
}); 
bot.hear(/^(?:лтест)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let rez = [true].random();
	if(rez == false){
	}else{ 

		return message.reply(`👩‍⚕💖 Тест показал, вас любят  ${rand(1,397)} человек`);
	}
});

/*----------------------------------------------------------------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////
////DEVELOPER - TEMA DOBRIY (FPSKIN)/////////DEVELOPER - TEMA DOBRIY (FPSKIN)/////////DEVELOPER - TEMA DOBRIY (FPSKIN)/////////DEVELOPER - TEMA DOBRIY (FPSKIN)

bot.hear(/^(?:eval)\s?([^]+)?/i, (message) => { 
	let args = message.$match; 
	if(message.user != 167888509) return;
	return message.send(`${eval(args[1])}`);
});

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}
/*----------------------------------------------------------------------------------------------------------*/////DEVELOPER - TEMA DOBRIY (FPSKIN)/////

 setInterval(function(){
	for (i=0;i<acc.users.length;i++) {
	 	let u = acc.users[i];
		if (u) {
			u.balance += Number(u.modules['1'].profit * u.modules['1'].count);
		 	u.balance += Number(u.modules['2'].profit * u.modules['2'].count);
		 	u.balance += Number(u.modules['3'].profit * u.modules['3'].count);
		 	u.balance += Number(u.modules['4'].profit * u.modules['4'].count);
		 	u.balance += Number(u.modules['5'].profit * u.modules['5'].count);
		 	u.balance += Number(u.modules['6'].profit * u.modules['6'].count);

		 	if (u.vip == 1) { u.balance += 20 }
		 	if (u.vip == 2) { u.balance += 40 }
		 	if (u.vip == 3) { u.balance += 60 }
		} 
	 }
}, 1000);

setInterval(function () { 

	user.api.status.set({ 
	group_id: 181324393, 
	text: `👥 Всего пользователей: ${acc.number}`}); 
	
	}, 60000);
/*----------------------------------------------------------------------------------------------------------*/
async function run() {
	await vk.updates.startPolling(); 
}
run().then(() => {
	    console.log('[START] --> ' + f.time());
})
.catch((error) => {
	    console.error('[ERROR] | '+error);
});

/*----------------------------------------------------------------------------------------------------------*/
 
 






