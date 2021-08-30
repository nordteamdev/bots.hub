/*----------------------------------------------------------------------------------------------------------*/
/*========================================DEVELOPER VLAD KUCHER=============================================*/
/*===========================================vk.com/c_o_d_e_r===============================================*/
/*----------------------------------------------------------------------------------------------------------*/
const rq = require("prequest");

const fs = require("fs");  
const {VK, Keyboard} = require('vk-io');
const vk = new VK(); 
const str = new VK(); 
const {updates} = vk;  
//const rq = require('request');  
/*----------------------------------------------------------------------------------------------------------*/
const acc = require("./base/acc.json"); 
const logi = require("./base/logi.json"); 
/*----------------------------------------------------------------------------------------------------------*/
setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/logi.json", JSON.stringify(logi, null, "\t"))   
}, 1500);
/*----------------------------------------------------------------------------------------------------------*/
vk.setOptions({ 
	token: '', // ТОКЕН ГРУППЫ
	apiMode: 'parallel',  
	pollingGroupId: 1 // ИД ГРУППЫ
});  

 

/*----------------------------------------------------------------------------------------------------------*/
var limits = {}

const msgs = [
	`[${time()}] Connecting...`,
	`[${time()}] Connected. Joining the game...`,
	`[${time()}] Connected to Vlad RP | Adminok и лидерок нет`,
	`[${time()}] Добро пожаловать на сервер Vlad Role Play`,
	`* Для просмотра команд введите: "Помощь" *`
]

 
/*----------------------------------------------------------------------------------------------------------*/

for(i in acc.users){
	let user = acc.users[i];
	user.msg_exs = 0;
	user.bonus = false;
} 

/*------------------------------------- Message handling----------------------------------------------------*/
vk.updates.use(async (message, next) => {    
	if (message.is("message") && message.isOutbox) { return; } 

    message.user = message.senderId;  message.text = message.payload.text; if (!message.text) { return; } 
    if(message.user < 0) return;

   	if(!acc.users[u_id(message.user)]){
   		acc.number += 1;
   		acc.users[acc.number] = {
   			id: message.user,
 			admin: 0,
 			aname: 'Игрок',
 			ans: 0,
 			vip: 0,
   			prefix: false,
   			connect: false,
   			reg: 1,
   			msg: 0,
   			balance: 1000,
   			bank: 0,
   			donate: 0,
   			bank: 0,
   			narko: 0,
   			zakon: 100,
   			hp: 100,
   			golod: 100,
   			level: 1,
   			exs: 0,
   			uplvl: 2,
   			energy: 5,
   			warn: 0,
   			ban: false,
   			job: false,
   			house: false,
   			car: false,
   			bonus: false,
   			mute: false,
   			msg_exs: 0,
   			gps: false,
   			a: {
   				ban: 0,
   				kick: 0, 
   				warn: 0,
   				nick: 0,
   				mute: 0
   			},
   			reg_time: `${data()} | ${time()}`
   		}  
   	}
   	
   	//
   	const user = acc.users[u_id(message.user)];

   	if(message.text.toLowerCase() != 'играть' && user.reg == 1){
   		if(user.prefix == false){
   			return message.send(`Приветствуем Вас!\nЧтобы зарегистрироваться в нашем боте, Вам нужно написать: "Играть"`);
   		} 
   	}
   	if(message.text.toLowerCase() == 'играть' && user.reg == 1){
   		if(user.prefix == false){
   			 user.reg = 2; 

   			setTimeout(() => {
				message.send(`
					В поисках интересного сервера CRMP на разных сайтах, Вы наткнулись на рекламную запись: "Открылся сервер Vlad RP| Adminok и лидерок - нет | Bonus"
					Заинтересовавшись, Вы решили зайти на этот сервер.
				`)
			}, 1000);

			setTimeout(() => {
				message.send(`*Двойной щелчок по ярлыку CR:MP*\n*Ввод IP-адреса сервера и ника в поле "name"*`)
			}, 2000);

			setTimeout(() => {
				message.send(`*Регистрируясь, Вы автоматически соглашаетесь с правилами нашего проекта: vk.com/...*`)
			}, 3000);

			setTimeout(() => {
				message.send(`*Введите Ник-Нейм состоящий из английских букв (Не более 20 символов)*\n* Пример: Vlad_Kucher*`)
			}, 4000);
			return;
   		} 
   	}
   	if(user.reg == 2){
   		if(message.text.length > 20) return message.send(`⚠ Максимальная длина Ник-Нейма - 20 символов\n* Пример: Vlad_Kucher*`);
   		if(message.text.length < 2) return message.send(`⚠ Минимальная длина Ник-Нейма - 2 символа\n* Пример: Vlad_Kucher*`);
   		if(/[а-яА-Я]+/.test(message.text)) return message.send(`⚠ Ник-Нейм должен состоять из английских букв!\n* Пример: Vlad_Kucher*`)
   		for(i in acc.users){
   			if(acc.users[i].prefix == message.text) return message.send(`⚠ Данный Ник-Нейм уже существует!`);
   		}
   		user.reg = 3;
   		user.prefix = message.text;
   		user.connect = true

   		let time = 0;

   		vk.api.call('messages.send', { 
			chat_id: acc.admchat, 
			message: `✉ Зарегистрировался новый игрок: @id${message.user}(${message.text}) [${u_id(message.user)}]`
		});

		for(i=0;i<msgs.length;i++){
			let text = msgs[i];
			time += 1000;
			setTimeout(() => { 
				message.send(text)
			}, time);
		}
   		return
   	}

   	// ------------------------ local base limits -------------
   	if(!limits[message.user]){
		limits[message.user] = { 
			bonus: false,
			energy: 60 
		}
	} 
	// ------------------------ local base limits -------------
 

    if(user.ban != false){ return }
	if(user.mute != false){ return }
	  
	if(user.balance < 0) user.balance = 0;
	if(user.balance == null) user.balance = 0;
	if(user.golod == null) user.golod = 0;

	if(!acc.chats[message.chatId]){
		if(message.chatId != null){
			acc.chats[message.chatId] = {i: true}
		}
	}

    user.balance = Math.round(user.balance)  
	 
	if(message.text) {
		user.msg += 1;
		user.msg_exs += 1;
	}

	try { await next(); } catch (err) { console.error(err) }
});
 

/*----------------------------------------------------------------------------------------------------------*/
var uptime = { sec: 0, min: 0, hours: 0, days: 0 }

setInterval(() => {
	uptime.sec++;
	if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
	if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
	if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; } 
}, 1000);
 
 
/*----------------------------------------------------------------------------------------------------------*/

 
 
vk.updates.hear(/^(?:топ)/i, (message) => {   

	let text = ``;
	var tops = []
	var yo = []

	for (i in acc.users) {
		if(acc.users[i].admin < 1){
			tops.push({
				id_vk: acc.users[i].id,
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
 
	for (var g = 0; g < 10; g++) {
		if (tops.length > g) {
			let ups = g;
			ups += 1;
			if(g <= 8) ups = `${ups}&#8419;`
			if(g == 9) ups = `&#128287;`
			yo.push({
				id_vk: tops[g].id_vk,
				id: tops[g].id,
				balance: tops[g].balance,
				smile: `${ups}`
			})
		}
	}
	var people = "💰 Топ богатых людей 💰 \n" + yo.map(a => a.smile + ". [id" + a.id_vk + "|" + acc.users[a.id].prefix + `] [${a.id}] >> ` + spaces(a.balance) + " 💰. ").join("\n")
	text += `${people}\n\n`;
	message.send(text);
	});
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/

vk.updates.hear(/^(?:магазин)/i, (message) => { 
	return message.send(` 
	🏪 Разделы магазина:

	&#4448; 💊 Лекарства 

	🏪 Для выбора напишите название раздела:
	🏪 Пример: "Лекарства"
	`);
});

/*------------------------------------MAIN------------------------------------------------------------------*/
vk.updates.hear(/^(?:помощь)/i, (message) => { 
	return message.send(` 
	Разделы:
	&#4448;🔔 Rp » - РП команды 
	&#4448;⚠ Ahelp » Админ-правила
	&#4448;📍 List (№) - таблица игроков
	&#4448;🌚 Проект - информация

	Основное:
	&#4448;💼 Профиль
	&#4448;💰 Баланс
	&#4448;💶 Бонус - можно брать раз в 10м
	&#4448;💳 Банк [положить/снять] [сумма]
	&#4448;💶 Передать [ID(игровой)] [сумма]
	&#4448;🔎 Поиск [ссылка_вк] 
	&#4448;💰 Топ - самые богатые

 
	&#4448;🔨 Работа
	&#4448;🏡 Дом 
	&#4448;🚘 Машина
	&#4448;🍕 Кушать

	`);
});
 
vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {   
	if(message.$match[3]){ 
		let id = u_id(message.$match[3]);
		if (!acc.users[id]) return message.send(`🔎 Не верно указаны данные | Игрока нет\n🔎 Пример: "Поиск https://vk.com/c_o_d_e_r"`);  
		return message.send(`
			🔹 Игрок: [id${id}|${acc.users[id].prefix}]
			🔹 ID: ${id}
			🔹 Adm-lvl: ${acc.users[id].admin} 
		`);
	}else{ 
		if(!message.$match[4]) return message.send(`🔎 Укажите данные\n🔎 Пример: "Поиск https://vk.com/c_o_d_e_r"`);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = u_id(res.object_id);
			if (!acc.users[id]) return message.send(`🔎 Не верно указаны данные | Игрока нет\n🔎 Пример: "Поиск https://vk.com/c_o_d_e_r"`);  
			return message.send(`
				🔹 Игрок: [id${id}|${acc.users[id].prefix}]
				🔹 ID: ${id}
				🔹 Adm-lvl: ${acc.users[id].admin} 
			`);
		})
		return;
	}
}); 
 
vk.updates.hear(/^(?:профиль|статс|stats|проф)/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	return message.send(` 
		👤 Имя: ${user.prefix}
		🆔 ID: ${u_id(message.user)}
		👑 Статус: ${user.aname}
		🔻 Уровень: ${user.level}
		💡 Очки опыта: ${user.exs}/${user.uplvl} 
		💡 Опыт дается раз в час за активную игру

		💰 Баланс: ${user.balance}$
		💳 В банке: ${user.bank}$ 
		💎 Donat-Money: ${user.donate}

		❤ Здоровье: ${user.hp}/100
		🔒 Законопослушность: ${user.zakon}
		🍕 Голод: ${user.golod}/100
		❗ -1 каждые 20 минут 
		`+
		(user.vip == 0 ? `⚡ Энергия: ${user.energy}/5\n` : `⚡ Энергия: ${user.energy}/10\n`)+

		(user.golod >= 30 ? `❗ +1 энергия даётся раз в час\n\n` : `⚠ Вы голодны. Энергия не прибавляется!\n\n`)+
		(user.house == false ? `` : `&#127969; ${houses[user.house].name}\n`)+
		(user.car == false ? `\n` : `&#128664; ${cars[user.car].name}\n\n`)+
		`
		📕 Warns: ${user.warn}/3
		📗 Дата регистрации: ${user.reg_time}
	`);
});

/*
 
💉 Наркозависимость: ${user.narko} 
 
*/

vk.updates.hear(/^(?:баланс)/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	return message.send(` 
		👤 Имя: ${user.prefix}
		🆔 ID: ${u_id(message.user)} 

		💰 Баланс: ${user.balance}$
		💳 В банке: ${user.bank}$  
	`);
});

vk.updates.hear(/^(?:работать)/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	if(user.job == false) return message.send(`✉ Вы никем не работаете...`);
	if(user.energy == 0) return message.send(`⚡ У вас 0 энергии...\n⚡ До восстановления 1 энергии: ${limits[message.user].energy} мин.`);
	user.balance += Number(jobs[user.job].pay);
	user.energy -= 1; 
	return message.send(` 
		&#128736; Вы ${jobs[user.job].text.random()}
		💰 +${jobs[user.job].pay}$
		⚡ Энергии: ${user.energy}
	`);
});

vk.updates.hear(/^(?:работа)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	let text = '';
	let count = 0;
	if(message.text.toLowerCase() == 'работать') return;
	if(message.$match[1]){
		let args = message.$match; 
		if(user.job != false) return message.send(`✉ Вы уже работаете <<${jobs[user.job].name}>>\n✉ Чтобы уволиться напишите: "Уволиться"`); 
		if(args[1] < 1 || args > 9) return message.send(`✉ Введите корректно номер работы`);
		if(user.level < jobs[args[1]].level) return message.send(`✉ Данная работа не доступна для вас!`); 
		user.job = Number(args[1]);
		return message.send(`💼 Вы успешно устроились на работу <<${jobs[args[1]].name}>>\n&#128296; Для работы напишите: "Работать"`);
	}else{
		if(user.job == false){
			for(i in jobs){
				count += 1;
				if(user.level >= jobs[i].level){
					text += `${count}&#8419;. ${jobs[i].name} | +${jobs[i].pay}$\n`
				}
			}

			return message.send(` 
				&#9874; Доступные работы:
				${text}  
				📍 Больше уровень - больше работ!
				📍 Для устройства напишите: "Работа (номер)"
			`);
		}else{
			return message.send(` 
				&#128221; Вы работаете &#128221;
				&#128100; ${jobs[user.job].name} | +${jobs[user.job].pay}$
				&#128296; Чтобы работать напишите: "Работать"
				💼 Чтобы уволиться напишите: "Уволиться"
			`);
		}
	}
});

vk.updates.hear(/^(?:уволиться)$/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	if(user.job == false) return message.send(`✉ Вы никем не работаете...`);
	user.job = false;

	return message.send(`  
	💼 Вы успешно уволились...
	`);
});


vk.updates.hear(/^(?:дом)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	let text = '';
	let count = 0; 
	if(message.$match[1]){
		let args = message.$match; 
		if(user.house != false) return message.send(`&#127969; У вас уже куплен ${houses[user.house].name}\n✉ Чтобы продать напишите: "Продать дом"`); 
		if(args[1] < 1 || args > 6) return message.send(`✉ Введите корректно номер дома`);
		if(user.balance < houses[args[1]].price) return message.send(`✉ У вас недостаточно денег!`);
		user.balance -= Number(houses[args[1]].price);
		user.house = Number(args[1]);
		return message.send(`💼 Вы успешно устроились купили <<${houses[args[1]].name}>>`);
	}else{
		if(user.house == false){
			for(i in houses){
				count += 1;
				if(user.balance >= houses[i].price){
					text += `${count}&#8419;. ${houses[i].name} | ${houses[i].price}$\n`
				}
			}

			return message.send(` 
				&#127969; Доступные дома:
				${text}  
				📍 Для покупки напишите: "Дом [номер]"
			`);
		}else{
			return message.send(` 
				&#127969; У вас уже куплен ${houses[user.house].name}
			`);
		}
	}
});
 
vk.updates.hear(/^(?:машина)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	let text = '';
	let count = 0; 
	if(message.$match[1]){
		let args = message.$match; 
		if(user.car != false) return message.send(`🚘 У вас уже куплена ${cars[user.car].name}\n✉ Чтобы продать напишите: "Продать машину"`); 
		if(args[1] < 1 || args > 6) return message.send(`✉ Введите корректно номер машины`);
		if(user.balance < cars[args[1]].price) return message.send(`✉ У вас недостаточно денег!`);
		user.balance -= Number(cars[args[1]].price);
		user.car = Number(args[1]);
		return message.send(`🚘 Вы успешно купили машину <<${cars[args[1]].name}>>`);
	}else{
		if(user.car == false){
			for(i in cars){
				count += 1;
				if(user.balance >= cars[i].price){
					text += `${count}&#8419;. ${cars[i].name} | ${cars[i].price}$\n`
				}
			}

			return message.send(` 
				🚘 Доступные машины:
				${text}  
				📍 Для покупки напишите: "Машина [номер]"
			`);
		}else{
			return message.send(` 
				🚘 У вас уже куплен ${cars[user.car].name}  
			`);
		}
	}
});

vk.updates.hear(/^(?:продать машину)$/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	if(user.car == false) return message.send(`✉ У вас нет машины...`); 
	let mon = cars[user.car].price * 0.75;
	user.balance += Number(cars[user.car].price * 0.75)
	user.car = false;

	return message.send(`  
	🚘 Вы успешно продали машину государству
	🚘 За ${mon}$
	`);
});

vk.updates.hear(/^(?:продать дом)$/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	if(user.house == false) return message.send(`✉ У вас нет дома...`); 
	let mon = houses[user.house].price * 0.75;
	user.balance += Number(houses[user.house].price * 0.75)
	user.house = false;

	return message.send(`  
	🏡 Вы успешно продали дом государству
	🏡 За ${mon}$
	`);
});


vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?(.*)?/i, (message) => {  
	if(!message.$match[1] || !message.$match[2]) return message.send(`💰 Введите корректно команду: "Передать ID СУММА"`);
	if(!acc.users[message.$match[1]]) return message.send(`✉ Такого игрока не найдено...`);
	if(message.$match[1] == u_id(message.user)) return message.send(`✉ Вы указали свой ID...`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];
	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 
	if(!Number(args[2])|| args[2] < 0) return message.send(`💰 Введите корректно сумму`);
	if(user.balance < args[2]) return message.send(`💰 У вас недостаточно денег`);

	user.balance -= Number(args[2]);
	acc.users[args[1]].balance += Number(args[2]);
	return message.send(`💰 Вы перевели ${args[2]}$ игроку @id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})`);
});

vk.updates.hear(/^(?:банк положить)\s?(.*)?/i, (message) => {  
	if(!message.$match[1]) return message.send(`💰 Введите корректно сумму`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];
	args[1] = args[1].replace(/(\.|\,)/ig, '');
	args[1] = args[1].replace(/(к|k)/ig, '000');
	args[1] = args[1].replace(/(м|m)/ig, '000000');
	args[1] = args[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 
	if(!Number(args[1])|| args[1] < 0) return message.send(`💰 Введите корректно сумму`);
	if(user.balance < args[1] ) return message.send(`💰 У вас недостаточно денег`);

	user.balance -= Number(args[1]);
	user.bank += Number(args[1]);
	return message.send(`💰 Вы положили в банк ${args[1]}$`);
});

vk.updates.hear(/^(?:банк снять)\s?(.*)?/i, (message) => {  
	if(!message.$match[1]) return message.send(`💰 Введите корректно сумму`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];
	args[1] = args[1].replace(/(\.|\,)/ig, '');
	args[1] = args[1].replace(/(к|k)/ig, '000');
	args[1] = args[1].replace(/(м|m)/ig, '000000');
	args[1] = args[1].replace(/(вабанк|вобанк|все|всё)/ig, user.bank); 
	if(!Number(args[1])|| args[1] < 0) return message.send(`💰 Введите корректно сумму`);
	if(user.bank < args[1] ) return message.send(`💰 У вас недостаточно денег в банке`);

	user.balance += Number(args[1]);
	user.bank -= Number(args[1]);
	return message.send(`💰 Вы сняли с банка ${args[1]}$`);
});

vk.updates.hear(/^(?:казино)\s?(.*)?/i, (message) => {  
	if(!message.$match[1]) return message.send(`💰 Введите корректно ставку`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];
	args[1] = args[1].replace(/(\.|\,)/ig, '');
	args[1] = args[1].replace(/(к|k)/ig, '000');
	args[1] = args[1].replace(/(м|m)/ig, '000000');
	args[1] = args[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 
	if(!Number(args[1])|| args[1] < 0) return message.send(`🎰 Введите корректно ставку`);
	if(user.balance < args[1] ) return message.send(`🎰 У вас недостаточно денег`);

	let win = ['💿|💿|💿','😇|😇|😇','🔮|🔮|🔮','✨|✨|✨','⚽|⚽|⚽','🙈|🙈|🙈','🔔|🔔|🔔','💵|💵|💵','🎰|🎰|🎰','☹|☹|☹','💳|💳|💳','💼|💼|💼','💻|💻|💻','👺|👺|👺','💎|💎|💎','😈|😈|😈'].random();
	let lose = ['⚽|🌍|🐷','😃|😃|😋','🙃|😳|😇','😈|🔔|📙','☺|😀|👻','📗|📝|📘','📖|🔫|📚','📒|🥇|💎','💼|💳|⚽','📒|🥇|💎','😏|😏|🙂','🎉|👺|✉','😨|🤔|😬','📙|💵|💾','📘|🔱|🔮','🔮|📜|📕'].random();

	if(rand(0,100) < 60){
		user.balance -= args[1];
		if(user.balance < 0) {user.balance = 0}  
		return message.send(` 
			🎰 Комбинация: ${lose} 
			🎰 Вы проиграли ${spaces(Math.round(args[1]))}$
			💰 Баланс: ${user.balance}$
		`);
	}else{
		user.balance += args[1]*1.5;
		if(user.balance < 0) {user.balance = 0}  
		return message.send(`  
			🎰 Комбинация: ${win}
			🎰 Вы выиграли ${spaces(Math.round(args[1]*1.5))}$
			💰 Баланс: ${user.balance}$
		`);
	}
});

vk.updates.hear(/^(?:admins)\s?([^]+)?/i, (message) => {  
	let text = '';
	for(i in acc.users){
		if(acc.users[i].admin >= 1){
			text += `[${acc.users[i].admin}] @id${acc.users[i].id}(${acc.users[i].prefix}) [${i}]\n`
		}
	}
	return message.send(text);
});

vk.updates.hear(/^(?:eval)\s?([^]+)?/i, (message) => {  
	if(message.user != 459607222) return;
	let args = message.$match;  
	return message.send(`${eval(args[1])}`);
});

vk.updates.hear(/^(?:репорт)\s?([^]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите текст жалобы/вопроса`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
 
	vk.api.call('messages.send', { 
		chat_id: acc.admchat, 
		message: `✉ [РЕПОРТ] ✉\n✉ Игрок: @id${message.user}(${user.prefix}) [${u_id(message.user)}]\n✉ Жалоба/вопрос: ${args[1]}\n\n✉ Для ответа: "Ответ [ID] [текст]"`
	});
	 
	return message.send(`✉ Вы успешно отправили репорт`)
});



vk.updates.hear(/^(?:кейс)/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.donate < 5) return message.send(`✉ Donat-кейс стоит 5 Donat-Money`);
	user.donate -= 5;
	let sum = rand(5000,50000);
	user.balance += Number(sum);
	return message.send(`📕 Из кейса вам выпало: ${sum}$`); 
});

vk.updates.hear(/^(?:бонус)/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.bonus == true) return message.send(`✉ Бонус можно брать раз в 10 минут`);
	user.bonus = true;
	setTimeout(() => {
		user.bonus = false;
	}, 600000);

	let sum = rand(10000,50000);
	user.balance += Number(sum);
	return message.send(`📕 Из бонуса вам выпало: ${sum}$`); 
});

vk.updates.hear(/^(?:проект)/i, (message) => {  
	let text = ''; let money = 0; let count = 0;
	for(i in acc.users){
		count += 1;
		money += acc.users[i].balance;
	}

	return message.send(`
	✉ Проект: [link|Vlad бот | Vlad BOT] 
	✉ Кодер: vk.com/c_o_d_e_r
	- - - - - - - - - - -  
	✉ Пользователей: ${count}
	✉ Всего денег: ${spaces(money)}$
	`);
});
 
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
// ------------------------------ADMIN-CMD--------------------------------------------------------------------
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/


vk.updates.hear(/^(?:ahelp)/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 1) return message.send(`✉ Команда доступна для статуса <Helper>`); 
	return message.send(` 
	📕 Admin команды:
	▪ [1] admins - список админов
	▪ [1] astats - профиль
	▪ [1] ответ [id] [ответ] 
	▪ [1] mute [id] [time(минут)] - выдать мут
	▪ [1] unmute [id] - снять мут
	▪ [2] get [id] - инфо об игроке 
	▪ [3] setnick [id] [nick] - смена ника
	▪ [3] rnick [id] - установить рандомный ник
	▪ [4] warn [id] [причина] - выдать предупреждение
	▪ [4] unwarn [id] - снять предупреждения
	▪ [5] ban [id] [причина] - заблокировать навсегда
	▪ [5] unban [id] - разблокировать игрока
	▪ [6] givemoney [id] [сумма] - выдать валюту
	▪ [6] removemoney [id] - забрать валюту
	▪ [7] setadm [id] [0-7] - установить уровень прав.
	▪ [7] givedonate [id] [сумма] - выдать донат
	▪ [7] removedonate [id] - забрать донат
	▪ [7] setvip [id] [дней] - выдать vip
	▪ [7] delvip [id] - забрать vip

	`);
});

vk.updates.hear(/^(?:astats)/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 1) return message.send(`✉ Команда доступна для статуса <Helper>`); 
	return message.send(` 
	📕 Admin-Info
	▪ Ответов: ${user.ans}
	▪ Выдано банов: ${user.a.ban}
	▪ Выдано варнов: ${user.a.warn}
	▪ Выдано мутов: ${user.a.mute} 
	▪ Сменил ников: ${user.a.nick}


	`);
});

vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 7) return message.send(`✉ Команда доступна для статуса <Разработчик>`); 
	if(!message.$match[1]) return message.send(`▪ Укажите ID игрока`);
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	let args = message.$match;  
	if(user.admin == 7){
		if(!args[1]) return message.send(`▪ Укажите ID игрока`); 
		
		acc.users[message.$match[1]].admin = args[2];
		acc.users[message.$match[1]].aname = args[2].toString().replace(/0/ig, `Игрок`).replace(/1/ig, `Helper`).replace(/2/ig, `Модератор`).replace(/3/ig, `Главный Модератор`).replace(/4/ig, `Администратор`).replace(/5/ig, `Главный Администратор`).replace(/6/ig, `Спец.Администратор`).replace(/7/ig, `Разработчик`)
				 
		return message.send(`▪ Вы выдали ${args[2]} lvl admina игроку  ${acc.users[message.$match[1]].prefix}`);		 
	}
}); 

vk.updates.hear(/^(?:setvip)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 7) return message.send(`✉ Команда доступна для статуса <Разработчик>`); 
	if(!message.$match[1]) return message.send(`▪ Укажите ID TIME(в днях)`);
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	let args = message.$match;  
	if(user.admin == 7){
		if(!args[1]) return message.send(`▪ Укажите ID игрока`); 
		
		acc.users[message.$match[1]].vip = Number(args[2] * 24);
	 
		return message.send(`▪ Вы выдали VIP аккаунт на ${args[2]} дня игроку  ${acc.users[message.$match[1]].prefix}`);		 
	}
}); 

vk.updates.hear(/^(?:delvip)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 7) return message.send(`✉ Команда доступна для статуса <Разработчик>`); 
	if(!message.$match[1]) return message.send(`▪ Укажите ID`);
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	let args = message.$match;  
	if(user.admin == 7){
		if(!args[1]) return message.send(`▪ Укажите ID игрока`); 
		
		acc.users[message.$match[1]].vip = 0;
	 
		return message.send(`▪ Вы выдали забрали VIP аккаунт у игрока ${acc.users[message.$match[1]].prefix}`);		 
	}
}); 

vk.updates.hear(/^(?:донат)\s?([0-9]+)?/i, (message) => { 
	return message.send(`
	▪ Донат-меню ▪

	▪ 1 DM - 1  рубль
	▪ VIP аккаунт >> 1 день - 10 рублей
	▪ Права <Helper> >> 190 рублей
	`);
}); 

vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => { 
	let u = acc.users[u_id(message.user)];
	let user = acc.users[message.$match[1]]; 
	if(u < 2) return message.send(`✉ Команда доступна для статуса <Модератор>`); 
	if(!message.$match[1]) return message.send(`✉ Укажите ID игрока...`); 
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	return message.send(` 
		👤 Имя: @id${user.id}(${user.prefix})
		🆔 ID: ${message.$match[1]}
		👑 Статус: ${user.aname}
		🔻 Уровень: ${user.level}
		💡 Очки опыта: ${user.exs}/${user.uplvl} 

		💰 Баланс: ${user.balance}$
		💳 В банке: ${user.bank}$ 
		💎 Donat-Money: ${user.donate}

		🔒 Законопослушность: ${user.zakon}
		💉 Наркозависимость: ${user.narko} 
		❤ Здоровье: ${user.hp}/100

		🍕 Голод: ${user.golod}/100
		❗ -1 каждые 20 минут
		⚡ Энергия: ${user.energy}/${user.vip.toString().replace(/0/ig, `5`).replace(/1/ig, `10`)}
		`+
		(user.golod >= 30 ? `❗ +1 энергия даётся раз в час\n\n` : `⚠ Вы голодны. Энергия не прибавляется!\n\n`)+
		(user.house == false ? `` : `&#127969; ${houses[user.house].name}\n`)+
		(user.car == false ? `\n` : `&#128664; ${cars[user.car].name}\n\n`)+
		`
		📕 Warns: ${user.warn}/3
		📗 Дата регистрации: ${user.reg_time}
	`);
});

vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s?([^]+)?/i, (message) => { 
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID ПРИЧИНУ...`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 5) return message.send(`✉ Команда доступна для статуса <Гл. Администратор>`); 
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	let id = args[1]; 

	acc.users[id].ban = true;
	user.a.ban += 1;

	vk.api.call('messages.send', { 
		user_id: acc.users[id].id, 
		message: `⛔ ${user.aname} ${nick(message.user)} заблокировал ваш аккаунт.\n▪ Время: навсегда\n▪ Причина: ${args[2]}`
	})

	admin(`⛔ ${user.aname} ${nick(message.user)} заблокировал навсегда ${nick(acc.users[id].id)}\n▪ Причина: ${args[2]}`)

	return message.send(`▪ Вы заблокировали навсегда игрока ${acc.users[id].prefix}`);	 	 
});

vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`✉ Укажите ID игрока...`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 5) return message.send(`✉ Команда доступна для статуса <Гл. Администратор>`); 
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	 
	let id = args[1]; 

	acc.users[id].ban = false;

	vk.api.call('messages.send', { 
		user_id: acc.users[id].id, 
		message: `⛔ ${user.aname} ${nick(message.user)} разблокировал ваш аккаунт.`
	})
	admin(`⛔ ${user.aname} ${nick(message.user)} разблокировал ${nick(acc.users[id].id)}`)
	return message.send(`▪ Вы разблокировали игрока ${acc.users[id].prefix}`);	 	 
});


vk.updates.hear(/^(?:mute)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID TIME(минут)...`);
	let args = message.$match; 
	let u = acc.users[u_id(message.user)];
	if(u.admin < 1) return message.send(`✉ Команда доступна для статуса <Helper>`); 
	if(u.admin == 1 && args[2] > 30) return message.send(`Helper может выдавать мут от 1 до 30 минут.`);
	let user = acc.users[u_id(message.user)];   
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	
	let id = args[1]; 
	let time = Number(args[2]);
	user.a.mute += 1;

	acc.users[id].mute = Number(time);

	vk.api.call('messages.send', { 
		user_id: acc.users[id].id, 
		message: `⛔ ${u.aname} ${nick(message.user)} выдал вам мут.\n▪ Время: ${time} минут`
	})
	admin(`⛔ ${user.aname} ${nick(message.user)} выдал мут на ${time} минут ${nick(acc.users[id].id)}`)
	return message.send(`▪ Вы выдали мут игроку ${acc.users[id].prefix}`);	 	 
});

vk.updates.hear(/^(?:unmute)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`✉ Укажите ID...`);
	let args = message.$match; 
	let u = acc.users[u_id(message.user)];
	if(u.admin < 1) return message.send(`✉ Команда доступна для статуса <Helper>`); 
	let user = acc.users[u_id(message.user)];   
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	
	let id = args[1]; 

	acc.users[id].mute =false;

	vk.api.call('messages.send', { 
		user_id: acc.users[id].id, 
		message: `⛔ ${u.aname} ${nick(message.user)} снял с вас мут.`
	})
	admin(`⛔ ${user.aname} ${nick(message.user)} снял мут ${nick(acc.users[id].id)}`)
	return message.send(`▪ Вы сняли мут игроку ${acc.users[id].prefix}`);	 	 
});

vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`✉ Укажите ID игрока...`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 4) return message.send(`✉ Команда доступна для статуса <Администратор>`); 
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	
	if(!args[2]) return message.send(`✉ Укажите причину!`); 
	let id = args[1];
	acc.users[id].warn += 1;
	user.a.warn += 1;

	if(acc.users[id].warn >= 3){
		acc.users[id].warn = 0;
		acc.users[id].ban = true;

		vk.api.call('messages.send', { 
			user_id: acc.users[id].id, 
			message: `⛔ ${user.aname} ${nick(message.user)} выдал вам предупреждение\n⛔ Причина: ${args[2]}\n⛔ Предупреждений: 3/3\n⛔ Ваш аккаунт был заблокирован!`
		})
		admin(`⛔ ${user.aname} ${nick(message.user)} выдал варн ${nick(acc.users[id].id)}\n▪ Причина: ${args[2]}`)
		return message.send(`⛔ Вы выдали предупреждение игроку ${acc.users[id].prefix}`);	
	}else{
		vk.api.call('messages.send', { 
			user_id: acc.users[id].id, 
			message: `⛔ ${user.aname} ${nick(message.user)} выдал вам предупреждение\n⛔ Причина: ${args[2]}\n⛔ После 3-х предупреждений - вы получите бан!`
		})
		admin(`⛔ ${user.aname} ${nick(message.user)} выдал варн ${nick(acc.users[id].id)}\n▪ Причина: ${args[2]}`)
		return message.send(`⛔ ${nick(message.user)} выдал предупреждение игроку ${acc.users[id].prefix}`);	
	}	 
});

vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`✉ Укажите ID игрока...`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 4) return message.send(`✉ Команда доступна для статуса <Администратор>`); 
	if(!acc.users[message.$match[1]]) return message.send(`✉ Игрок не найден...`);
	 
	let id = args[1]; 

	acc.users[id].warn = 0;

	vk.api.call('messages.send', { 
		user_id: acc.users[id].id, 
		message: `⛔ ${user.aname} ${nick(message.user)} снял вам предупреждения.`
	})
	admin(`⛔ ${user.aname} ${nick(message.user)} снял все варны ${nick(acc.users[id].id)}`)
	return message.send(`⛔ Вы сняли предупреждения игроку ${acc.users[id].prefix}`);	
	 	 
}); 

vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s?([^]+)?/i, (message) => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите текст жалобы/вопроса и ID игрока`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 1) return message.send(`✉ Команда доступна для статуса: <Helper>`); 
	let ids = args[1]; 
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	if(message.chatId != acc.admchat) return message.send(`[!] Команда работает только в служебной конференкции!`);  
	user.ans += 1; 
	let a = user.ans;
	if(a == 50 || a == 150 || a == 250 || a == 400 || a == 600){
		user.admin += 1;
		let name = [0, 'Helper','Модератор','Главный Модератор','Администратор','Главный Администратор']
		user.aname = name[user.admin];
	}

	vk.api.call('messages.send', { 
		user_id: acc.users[ids].id, 
		message: `✉ [Ответ на репорт] ✉\n✉ ${user.aname}: @id${message.user}(${user.prefix}) [${ids}]\n✉ Ответил: ${args[2]}`
	})
	return message.send(`✉ Вы успешно ответили на репорт`)
});

vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s?([^]+)?/i, (message) => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID и ник`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 3) return message.send(`✉ Команда доступна для статуса: <Главный Модератор>`); 
	let ids = args[1]; 
	user.a.nick += 1;
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].prefix = args[2];
	return message.send(`▪ ${nick(message.user)} сменил ник игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:rnick)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите ID`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)]; 
	if(user.admin < 3) return message.send(`✉ Команда доступна для статуса: <Главный Модератор>`); 
	for(i=0;i<nicks.length;i++){  
		let status = false;
		for(z in acc.users){ 
			if(acc.users[z].prefix == nicks[i]){ 
				status = true;
			}
		}
		if(status == false){ 
			acc.users[message.$match[1]].prefix = nicks[i];
			vk.api.call('messages.send', { 
				user_id: acc.users[message.$match[1]].id, 
				message: `▪ ${user.aname} ${nick(message.user)}\n▪ Сделал вам рандомный рп-ник (${nicks[i]})`
			})
			user.a.nick += 1;
			return message.send(`▪ Вы установили рандомный рп-ник игроку: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})`);
		}
	}  
});

vk.updates.hear(/^(?:givemoney)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID и СУММУ`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 6) return message.send(`✉ Команда доступна для статуса: <Спец. Администратор>`); 
	let ids = args[1]; 
	let summa = args[2];
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].balance += Number(args[2]);
	return message.send(`▪ ${nick(message.user)} выдал ${args[2]}$ игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:removemoney)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите ID `);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 6) return message.send(`✉ Команда доступна для статуса: <Спец. Администратор>`); 
	let ids = args[1]; 
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].balance = 0;
	return message.send(`▪ ${nick(message.user)} аннулировал баланс игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID и СУММУ`);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin != 7) return message.send(`✉ Команда доступна для статуса: <Разработчик>`); 
	let ids = args[1]; 
	let summa = args[2];
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].donate += Number(args[2]);
	return message.send(`▪ ${nick(message.user)} выдал ${args[2]} DM игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:removedonate)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите ID `);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin != 7) return message.send(`✉ Команда доступна для статуса: <Разработчик>`); 
	let ids = args[1]; 
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].donate = 0;
	return message.send(`▪ ${nick(message.user)} аннулировал donat-баланс игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:delete)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите ID `);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 7) return message.send(`✉ Команда доступна для статуса: <Разработчик>`); 
	let ids = args[1]; 
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	let u = acc.users[ids];

	u.admin = 0;
	u.aname = 'Игрок';
	u.ans = 0;
	u.vip = 0;
	u.msg = 0;
	u.balance = 0;
	u.donate = 0;
	u.bank = 0;
	u.narko = 0;
	u.zakon = 100;
	u.hp = 100;
	u.golod = 100;
	u.level = 1;
	u.exs = 0;
	u.uplvl = 2;
	u.energy = 5;
	u.warn = 0;
	u.ban = false;
	u.job = false;
	u.house = false;
	u.car = false;

	return message.send(`▪ ${nick(message.user)} удалил аккаунт игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});


vk.updates.hear(/^(?:list)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`Укажите НОМЕР станицы`);
	if(message.$match[1] < 1) return message.send(`Укажите корректный номер. Пример: "List 1"`);
	let text = `- - Страница #${message.$match[1]} - -\n`;

	let ot_ = 1;
	let do_ = 40;
	if(message.$match[1] == 2){ ot_ = 41; do_ = 80;} if(message.$match[1] == 3){ ot_ = 81; do_ = 120;} if(message.$match[1] == 4){ ot_ = 121; do_ = 160;} if(message.$match[1] == 5){ ot_ = 161; do_ = 200;}


	 
	for(i=ot_;i<do_;i++){
		if(acc.users[i]){
			if(acc.users[i].id > 0){
				if(acc.users[i].prefix == false) {
					text += `@id${acc.users[i].id}(Не зарегистрирован(а)) [${u_id(acc.users[i].id)}]\n`
				}else{
					text += `@id${acc.users[i].id}(${acc.users[i].prefix}) [${u_id(acc.users[i].id)}]\n`
				}
			}
		} 
	}
	return message.send(text);
});


/*------------------------------------RP COMMAND-------------------------------------------------------------*/
 

vk.updates.hear(/^(?:rp)/i, (message) => { 
	return message.send(` 
	📕 RP команды бота:
	&#4448;▪/me [текст] - Отыгровка действий от первого лица
	&#4448;▪/do [текст] - Отыгровка действий от третьего лица
	&#4448;▪/try [текст] - Отыгровка ситуаций на удачу 
	&#4448;▪/b [текст] - ООС чат
	&#4448;▪/s [текст] - Кричать
	&#4448;▪/w [текст] - Шептать   
	&#4448;▪/time - Просмотреть на часы  
	&#4448;▪/id [ID] - Поиск игроков по ID'у  
	&#4448;▪/iznas [ID] - изнасиловать игрока
	&#4448;▪/kiss [ID] - поцеловать игрока
	&#4448;▪/hey [ID] - поздороваться с  игроком
	`);
});

vk.updates.hear(/^(?:\/kiss)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /kiss [ID]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${nick(message.user)} поцеловал @id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})
	`);
});


vk.updates.hear(/^(?:\/hey)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /hey [ID]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${nick(message.user)} поприветствовал @id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})
	`);
});

vk.updates.hear(/^(?:\/iznas)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /iznas [ID]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${nick(message.user)} изнасиловал @id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})
	`);
}); 

vk.updates.hear(/^(?:\/time)/i, (message) => { 
	return message.send(`
	&#8987; ${nick(message.user)} взглянул на часы: Точное время: ${time()}  	
	`);
}); 

vk.updates.hear(/^(?:\/me)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /me [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${nick(message.user)}: ${args[1]}
	`);
}); 

 

vk.updates.hear(/^(?:\/do)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /do [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${args[1]} ${nick(message.user)}
	`);
});

vk.updates.hear(/^(?:\/try)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /try [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#128313;','&#128312;'].random()} ${nick(message.user)} ${args[1]} | ${['Удачно','Неудачно'].random()} 
	`);
});

vk.updates.hear(/^(?:\/b)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /b [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#9993;','&#128232;'].random()} ${nick(message.user)} (( ${args[1]} )) 
	`);
});

vk.updates.hear(/^(?:\/s)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /s [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#9993;','&#128232;'].random()} ${nick(message.user)} крикнул: ${args[1]}!
	`);
});

vk.updates.hear(/^(?:\/w)\s?([^]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /w [текст]`)
	let args = message.$match; 
	return message.send(`
	${['&#9993;','&#128232;'].random()} ${nick(message.user)} прошептал: ${args[1]}!
	`);
});

vk.updates.hear(/^(?:\/id)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`${['&#9888;','&#128276;', '&#10071;'].random()} Пример команды: /id [ID]`)
	let args = message.$match; 
	if(acc.users[args[1]]){
		return message.send(`
			&#128221; Игрок: ${acc.users[args[1]].prefix}
			&#128213; Статус: ${acc.users[args[1]].aname}
		`)
	}else{
		return message.send(`&#9999; Такого игрока не найдено...`)
	}
});
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/


vk.updates.hear(/^(?:gps)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)];
	let name = [0, 'город Южный', 'Мерию', 'Пиццерию']
	if(message.$match[1]){
		let i = message.$match[1];
		if(i < 0 || i > 3) return message.send(`✉ Неверно указан номер`);
		 
		user.gps = Number(i);
		return message.send(`✉ Вы успешно переместились в ${name[i]}`);
		 	
	}else{
		return message.send(`
		✉ Список мест ✉
		1&#8419;. Город Южный
		2&#8419;. Мерия
		3&#8419;. Пиццерия

		&#9888; Для перемещения напишите: "gps (номер)"
		`);
	}
});

vk.updates.hear(/^(?:кушать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.gps != 3) return message.send(`🍕 Чтобы покушать, сходите в Пиццерию ('gps')`);

	if(message.$match[1]){
		let args = message.$match; 
		let a = [0, 1,2,5,7,10];
		let price = [0,100,200,500,700,1000];
		let name = [0, 'пирожок','картошку фри','пиццу','гамбургер','набор из фастфуда']

		if(args[1] < 1 || args[1] > 5) return message.send(`🍕 Введите корректно номер из меню`);
		if(user.balance < price[args[1]]) return message.send(`✉ У вас недостаточно денег!`);
		user.balance -= Number(price[args[1]]);
		user.golod += Number(a[args[1]]);

		if(user.golod > 100){
			user.golod = rand(39,45);
			return message.send(`🍕 Вы скушали слишком много еды\n🍕 Вас стошнило\n🍕 Уровень голода: ${user.golod}`);
		}else{
			return message.send(`🍕 Вы скушали ${name[args[1]]}\n🍕 Уровень голода: ${user.golod}`);
		}   
	}else{
		return message.send(` 
			🍕 Меню 🍕
			1&#8419;. Пирожок +1 | 100$
			2&#8419;. Картошка фри +2 | 200$
			3&#8419;. Пицца + 5 | 500$
			4&#8419;. Гамбургер + 7 | 700$
			5&#8419;. Набор из фастфуда +10 | 1000$

			✉ Чтобы покушать напишите: "Кушать [номер]"
		`);
	}
});

vk.updates.hear(/^(?:мерия)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[u_id(message.user)]; 
	if(user.gps != 2) return message.send(`✉ Для использования команды переместитесь в Мерию ('gps')`);

	if(message.$match[1]){
		let args = message.$match; 
		let a = [0, 1,2,5,7,10];
		let price = [0,100,200,500,700,1000];
		let name = [0, 'пирожок','картошку фри','пиццу','гамбургер','набор из фастфуда']

		if(args[1] < 1 || args[1] > 5) return message.send(`🍕 Введите корректно номер из меню`);
		if(user.balance < price[args[1]]) return message.send(`✉ У вас недостаточно денег!`);
		user.balance -= Number(price[args[1]]);
		user.golod += Number(a[args[1]]);

		if(user.golod > 100){
			user.golod = rand(39,45);
			return message.send(`🍕 Вы скушали слишком много еды\n🍕 Вас стошнило\n🍕 Уровень голода: ${user.golod}`);
		}else{
			return message.send(`🍕 Вы скушали ${name[args[1]]}\n🍕 Уровень голода: ${user.golod}`);
		}   
	}else{
		return message.send(` 
			1&#8419;. "Получить паспорт"  
			2&#8419;. ""
			3&#8419;.  
			4&#8419;.  
			5&#8419;.  

			✉ Чтобы покушать напишите: "Кушать [номер]"
		`);
	}
});
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
async function run() {
	await vk.updates.startPolling(); 
}
run().then(() => {
	    console.log('[START]');
})
.catch((error) => {
	    console.error('[ERROR] | '+error);
});

/*----------------------------------------------------------------------------------------------------------*/
function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
/*----------------------------------------------------------------------------------------------------------*/
Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; }
/*----------------------------------------------------------------------------------------------------------*/



setInterval(function(){
	for(i in acc.users){
		let user = acc.users[i];
		if(user.golod >= 1){
			user.golod -= 1;
		}else{
			if(user.golod == 0){
				if(user.hp >= 1){
					user.hp -= 1
				} 
			}
			if(user.hp <= 0){
				// Обнуление профиля. Персонаж умер.
			}
		}
	}
}, 1200000);


setInterval(function(){
	for(i in acc.users){
		if(acc.users[i]){
			if(acc.users[i].mute != false){
				acc.users[i].mute -= 1;
				if(acc.users[i].mute <= 0){
					acc.users[i].mute = false;
				}
			}
		}
	}
}, 60000);

setInterval(function(){  
	for(i in limits){ 
		if(limits[i].energy >= 1){ 
			limits[i].energy -= 1; 
		}
	}

	for(i in limits){ 
		function u_id(user){
			for(i in acc.users){
				if(acc.users[i].id == user){
					return i
				}
			}
		} 
		if(limits[i].energy <= 0){ 
			let id = i;
			let uid = u_id(id); 

			if(acc.users[uid]){ 
				limits[id].energy = 60;
				if(acc.users[uid].golod >= 30){
					if(acc.users[uid].vip == 0){
						if(acc.users[uid].energy != 5){
							acc.users[uid].energy += 1;
						}
					}
					if(acc.users[uid].vip != 0){
						if(acc.users[uid].energy != 10){
							acc.users[uid].energy += 1;
						}
					}	
				} 
			} 
		}
	}
}, 60000);

setInterval(function(){
	for(i in acc.users){
		let user = acc.users[i];

		if(user.vip >= 1){
			user.vip -= 1;
			if(user.vip <= 0){
				user.vip = 0;
			}
		}


		if(user.msg_exs >= 20){
			user.msg_exs = 0;
			user.exs += 1;
			if(user.exs >= user.uplvl){
				user.exs = 0;
				user.uplvl = user.uplvl * 2;
			}
		}
	}
}, 3600000);



function user_id(id){
	for(i in acc.users){
		if(acc.users[i].id == id){
			return acc.users[i].id
		}
	}
}

 

function u_id(user){
	for(i in acc.users){
		if(acc.users[i].id == user){
			return i
		}
	}
}

 

function nick(user) {
	for(i in acc.users){
		if(acc.users[i].id == user){
			return `@id${user}(${acc.users[i].prefix}) [${i}]`
		}
	}
}

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

function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(",").split("").reverse().join("");
};

 

const jobs = {
	"1": {
		name: 'Лесоруб',
		pay: 500,
		level: 1,
		text: ['срубили дерево', 'отпилили ветку', 'срубили куст', 'нарубили дров']
	},
	"2": {
		name: 'Шахтёр',
		pay: 1000,
		level: 2,
		text: ['начали копать','отправились на добычу золота','отправились на добычу угля','очистили найденную добычу']
	},
	"3": {
		name: 'Грузчик',
		pay: 1500,
		level: 3,
		text: ['разгрузили машину с продуктами','разгрузили овощи','загрузили мусор в машину','отнесли отходы на помойку']
	},
	"4": {
		name: 'Таксист',
		pay: 2500,
		level: 5,
		text: ['подвезли бизнесмена','подвезли мера','подвезли школьника','подвели студента']
	},
	"5": {
		name: 'Инкассатор',
		pay: 4000,
		level: 6,
		text: ['забрали деньги из банка','отвезли деньги в банк','защитили машину от нападения','отправились в дорогу']
	},
	"6": {
		name: 'Дальнобольщик',
		pay: 5500,
		level: 8,
		text: ['отправились в рейс в другой город','подвезли незнакомца за деньги','перегнали несколько фур','продали товар бандитам']
	},
	"7": {
		name: 'Пожарный',
		pay: 6500,
		level: 9,
		text: ['потушили домик у моря','потушили здание Администрации','потушили школу','потушили хату бомжа']
	},
	"8": {
		name: 'Пилот',
		pay: 8000,
		level: 12,
		text: ['полетеле в другой город']
	},
	"9": {
		name: 'Наркодилер',
		pay: 10000,
		level: 16,
		text: ['продали мешок муки','обменяли пакет укропа','продали ... за деньги','избили человека и отняли деньги']
	}
}

const cars = {
	"1": {
		name: 'Alpha',
		price: 100000
	},
	"2": {
		name: 'Comet',
		price: 250000
	},
	"3": {
		name: 'Cheetah',
		price: 500000
	},
	"4": {
		name: 'Elegy',
		price: 1750000
	},
	"5": {
		name: 'Sultan',
		price: 2000000
	},
	"6": {
		name: 'Bullet',
		price: 3000000
	} 
}

const houses = {
	"1": {
		name: 'Номер в отеле',
		price: 100000
	},
	"2": {
		name: `Квартира 'эконом' класса`,
		price: 500000
	},
	"3": {
		name: 'Дом у пляжа Веспуччи',
		price: 1250000
	},
	"4": {
		name: 'Квартира в центральном районе',
		price: 5000000
	},
	"5": {
		name: 'Роскошная квартира около maze bank',
		price: 10000000
	},
	"6": {
		name: 'Элитный особняк на холме Вайнвуд',
		price: 25000000
	} 
}

const nicks = [
"Yury_Dobrow",
"Evgeny_Kuzmi",
"Leonid_Belskin",
"Igor_Krasin",
"Kirill_Balabanin",
"Anton_Babin",
"Trofim_Damin",
"Afanasy_Burakin",
"Mikhail_Rakowskin",
"Ruslan_Rakowskin",
"Ilia_Burdin",
"Taras_Samarin",
"David_Dmitriev",
"Yulian_Devin",
"Konstantin_Polskov",
"Grigory_Krasnov",
"Noah_Rogers",
"Ryan_Carter",
"Jake_Lopez",
"Alexander_Gonzalez",
"Antonio_Clark ",
"Richard_Hayes",
"Austin_Bryant",
"Landon_Jackson",
"Caleb_Butler",
"Alejandro_Wood",
"Matthew_King",
"Cameron_Brooks",
"Hunter_Wright",
"Ashton_Griffin",
"Gavin_Flores",
"Sean_Peterson",
"Hunter_Ross",
"Julian_Evans",
"Ryan_Roberts",
"Gavin_White",
"Cody_Diaz",
"Devin_Robinson",
"Jake_Mitchell",
"Ryan_King",
"Ian_Flores",
"Gabriel_Johnson",
"Isaiah_Bell",
"Brandon_Reed",
"Cole_James",
"Aaron_Griffin",
"Aidan_Diaz",
"Aiden_Lopez",
"Joshua_Kelly",
"Justin_Williams",
"John_Hughes",
"Jose_Williams",
"Matthew_Rogers",
"Jesus_Russell",
"Gabriel_Morris",
"John_Anderson",
"Eric_Cox",
"Michael_Peterson",
"Carlos_Long",
"Brandon_Cox",
"Arkady_Ivanov",
"Garry_Urbanov",
"Immanuil_Chaplin",
"Nikita_Samarin",
"Gavriil_Below",
"Alexei_Rudnitskin",
"Vadim_Morozov",
"Vadim_Shimkov",
"Spartak_Zaretskov",
"Vasily_Morozov",
"Mikhail_Turchin", 
"Nikita_Kozin",
"Maxim_Romanowskin",
"Albert_Simonich",
"Gavriil_Adamovin",
"Alexander_Adamovin",
"Gerasim_Pyzikin",
"Valery_Romanin",
"Alexei_Burdin",
"Viktor_Dubtsov",
"Afanasy_Popov",
"Trofim_Sokolkin",
"Rostislav_Shubin",
"Mark_Romanin", 
"Mikhail_Baranin",
"Grigory_Federov",
"Matvei_Slivin",
"Dmitry_Evanov",
"Kirill_Markow",
"Ilia_Mishkin",
"Ilia_Mishkin",
"Peter_Dembin",
"Semyon_Tarasov",
"Peter_Karpin",
"Ignat_Dobrow",
"Timofei_Rudnitskin", 
"Timofei_Romanin",
"Yaroslav_Belkin",
"Fedor_Belskin",
"Denis_Shepard",
"Anatoly_Polakov"
]

 
function admin(text) {
 	for(i in acc.chats){
 		vk.api.call('messages.send', { 
			chat_id: i, 
			message: text
		});
 	}
}


/*
gps: false
1 - Мерия
2 - Пиццерия
3 - Банк

После выбора gps >> Идет процесс перемещения. Секунд 10-20

*/
 
/*----------------------------------------------------------------------------------------------------------*/
/*========================================DEVELOPER VLAD KUCHER=============================================*/
/*===========================================vk.com/c_o_d_e_r===============================================*/
/*----------------------------------------------------------------------------------------------------------*/

