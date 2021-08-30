const rq = require("prequest");
const fs = require("fs");  
const { VK, MarketAttachment, Keyboard } = require('vk-io');
const vk = new VK();  
const str = new VK();  
const { updates } = vk;   
const bot = vk.updates;
let user = new VK();

user.setOptions({ 
token: 'b3923ba09b0a67b274615340fedc4e64a6ed9113a32d5672feb63baf1d26548200d541d52f28d7908856e' 
});
const acc = require("./base/acc.json");  
const f = require("./plugins/functions.js") //Functions

setInterval(async () => {
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))   
}, 1500);

vk.setOptions({ 
	token: '0a9c511e28b3a1ae15add385ba7d89c435d660431fa3e0e70bfd14edb966dd6f2100f0249e45f9b418294', // 
	apiMode: 'parallel',  
	pollingGroupId: 75372115 // 
});  



var limits = {}

vk.updates.use(async (message, next) => {     

	if (message.is("message") && message.isOutbox) { return; } 
	message.user = message.senderId; 
	message.text = message.payload.text; 
 	const info = await vk.api.users.get({ user_id: message.user });
    if(!acc.users.find(a => a.vk === message.user)){ 
    	acc.number++; 
    	acc.users.push(
    		{
				id: acc.number, 
				vk: message.user,
				balance: 0,
				admin: 	0, 
				referal: 0,
				rass: 1,
				promo: false,
				statu: 0,
				donate: 0,
				ban: 	false,
				kazlock: 0,
				clan: 0,
				tag: "Игрок",
				country: "не выбрано",
				warn: 0,
				warn_p: [],
				bloks: {
				     dbonuce: false
			    },
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
					},
					"8": 		{
						price: 	80000,
						count:  0,
						profit: 20
					}
				}
			}
    	)
    	return message.send(`[@id${message.user}(${info[0].first_name})] => Вы зарегистрировались в [club75372115|Bot Panda | Кликер]`)
    } 

	if (/\[club75372115\|(.*)\]/i.test(message.text)) { message.text = message.text.replace(/\[club75372115\|(.*)\]/ig, '').trim(); } 

   	if (!limits[message.user]) {
		limits[message.user] = {   
			block_bonus: 	0
		}
	} 
	
	const user = acc.users.find(a => a.vk === message.user);


	if (message.text) {   
		user.balance += 1;
		if(user.balance % 100 == 0){
			message.send(`@id${message.user}([${user.prefix})] => Ваш баланс: ${user.balance} COIN`);
		}
	}
	
	if(user.ban != false) return message.send(`✖Вы заблокированы навсегда!✖\nПричина: ${user.ban}`); 
	try { await next(); } catch (err) { console.error(err) }
	
	if(message.text){ 
		acc.msg += 1;
	}
	
	
		
});
bot.hear(/^(?:промо бабки)\s?([^]+)?/i,  async message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let podpiska = await vk.api.groups.isMember({ group_id: 75372115, user_id: message.senderId});
	if(podpiska == 0) return message.send(`❌ Вы не подписались на группу`);
	if(user.promo == true) return message.send(`❌ Вы уже активировали Промо бабки в этот раз`);
	if(acc.babki == 0) return message.send(`❌ Упс, акция уже закончилась или ещё не началась`);
	let args = message.$match 
	user.balance += 500000
	user.promo = true
	acc.babki -= 1
	return message.send(`Вы получили Промо бабки
	Осталось ${acc.babki} активаций`);
});
bot.hear(/^(?:тест)$/i, async (message, bot) => {		
		let user = acc.users.find(a => a.vk === message.user);
		let bravos = await vk.api.wall.getReposts({ owner_id: -75372115, post_id: 23476, count: 1000});
		if(bravos == 0) return message.send('✖ Тест не пройден, сделай репост!');
		return message.send(`✅ Тест пройден`);
	}); 
bot.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return;
	for(i in acc.users){
		if(acc.users[i]){
		vk.api.call('messages.send', {
			user_id: acc.users[i].vk,
			message: `${message.$match[1]}`,
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": `Отписаться от рассылки`
		},
			"color": "negative"
		}],				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
		]
			})
		});
	}
		}
	for(var i = 1; i < 900; i++) {
		vk.api.call('messages.send', {
			peer_id: 2000000000 + i,
			message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});
bot.hear(/^(?:отписаться от рассылки)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	return message.send(`Вы успешно отписались от рассылки!
	Введите Подписаться на рассылку!, чтобы снова быть подписаным на рассылку!`);
	user.rass = 0;
});
bot.hear(/^(?:Подписаться на рассылку)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	return message.send(`Вы подписались на рассылку, теперь Вы снова будете получать рассылку!`);
	user.rass = 1;
});
bot.hear(/^(?:rstl)\s([^]+)$/i, (message) => {  
	        let text = message.$match[1]
		message.send(`${text.split("").map(x=>x.toUpperCase()).join(" ")}`);
		
	});
bot.hear(/^(?:выдать бабки)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match
	let razdacha = acc.kazna/acc.number
	if(user.admin < 1) return;
	for(i in acc.users){
    let args = message.$match
			acc.users[i].promo = false;
			acc.babki = 50
		}
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].vk,
			message: `ПОДГОН от ПАНДЫ! 📡 Первые 50 игроков которые отправят боту «промо бабки», гарантированно получат по 500.000 койнов`,
			keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Промо бабки"
				},
					"color": "negative"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "В меню"
				},
					"color": "primary"
				}]
				]
					})
		});
	}
	return message.send(
				`
				ПОДГОН от ПАНДЫ! 📡 Первые 50 игроков которые отправят боту «промо бабки», гарантированно получат по 500.000 койнов
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
						"label": "Промо бабки"
				},
					"color": "negative"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "В меню"
				},
					"color": "primary"
				}]
				]
					})
				});
});
bot.hear(/^(?:дать)\s?([^]+)?/i,  message => { 
	if(user.admin < 1) return;
		user.api.wall.post({
		owner_id: -75372115,
		message: `ПОДГОН от ПАНДЫ! 📡 Первые 50 игроков которые отправят боту «промо бабки», гарантированно получат по 500.000 койнов`});

	return message.send(`Промо бабки включены!`);
});
bot.hear(/^(?:раздача)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match
	let razdacha = acc.kazna/acc.number
	if(user.admin < 1) return;
	for(i in acc.users){
let args = message.$match
			acc.users[i].balance += razdacha;
			acc.kazna = 0 
		}
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].vk,
			message: `Вы получили ${f.spaces(Math.round(razdacha))} койнов, из казны!
			Следующая раздача в ${poltime()} `
		});
	}
	return message.send(`Раздача проведена, выдано по ${f.spaces(Math.round(razdacha))} койнов, ${acc.number} пользователям`);
});
bot.hear(/^(?:войти king|войти кинг)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match
	user.clan = 1
    user.tag = "King"
	acc.king += 1
	return message.send(`Вы вступили в клан King
	Беседа клана:https://vk.me/join/AJQ1d5WfTBA/PXKcK0s91PMH `);
});
bot.hear(/^(?:в king|в кинг)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match
	return message.send(`В клане ${acc.king} человек `);
});
bot.hear(/^(?:обнуление26052002)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match
	if(user.vk !== 217885070) return message.send(`✖ Соси!`);
	for(i in acc.users){
let args = message.$match
			acc.users[i].balance = 0;
			acc.kazna = 0
			acc.users[i].modules =    	
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
					},
					"8": 		{
						price: 	80000,
						count:  0,
						profit: 20
					}
				}
		}
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].vk,
			message: `Вам обнулили профиль`
		});
	}
	return message.send(`Обнулили профиль ${acc.number} пользователям`);
});



////////////////////////////////////////////////////////////////////////
///////////////////////////ДОНАТ///////////////////////////////
//////////////////////////////////////////////////////////////////////// 

bot.hear(/^(?:Донат)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	message.sendPhoto("./photo/1.PNG");
	return message.send(
		`💴На Вашем балансе ${f.spaces(user.donate)}₽
		⚜V.I.P 🆕 - 50₽ ${user.statu.toString().replace(/0/gi, "❌").replace(/1/gi, "Имеется✔").replace(/2/gi, "Имеется✔").replace(/3/gi, "Имеется✔").replace(/4/gi, "Имеется✔")}
		🔱PREMIUM 🆕 - 115₽ ${user.statu.toString().replace(/1/gi, "❌").replace(/0/gi, "❌").replace(/2/gi, "Имеется✔").replace(/3/gi, "Имеется✔").replace(/4/gi, "Имеется✔")}
		💴10000 coin's 🆕 - 1₽
		
		 ⚜Вип - для просмотра команд V.I.P
		 🔱Премиум - для просмотра команд PREMIUM
		
		⚠Все привелегии покупаются НАВСЕГДА!⚠
		▶За покупкой можете обращаться ко мне @id217885070 (Администратора) или командой Пополнить 1-15000◀
		
		Кто хочет пополнить баланс через VK Койны, пишите @id217885070 (Мне)`	
	);
});


bot.hear(/^(?:анекдот)/i, async (message) => { 
		let filter = (text) => {
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let anek = await getAnek();
    return message.send(`держи:\n\n ${filter(anek)}\n\n🤤 >> Понравилось? Напиши команду "Анекдот" ещё раз!`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});

	}
});

bot.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users.find(a => a.vk === message.user); 
		let args = message.$match;
		if(!args[1] || !args[2]) return message.send(`✖ Пример команды: warn [ID] [ПРИЧИНА]`);
		if(user.admin < 1) return message.send(`✖ Вы не Администратор`);
		if(!acc.users[args[1]]) return message.send(`✖ Такого игрока нет!`);

		acc.users[args[1]].warn += 1;
		acc.users[args[1]].warn_p.push(args[2]);

		let text = `✅  ${user.prefix} выдал вам warn(предупреждение)`
		if(acc.users[args[1]].warn == 3){
			acc.users[args[1]].warn = 0;
			acc.users[args[1]].ban = true;
			acc.users[args[1]].warn_p = []
			text += `\n🔸 У вас 3 предупреждения.\n✖ Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: text
		});
		return message.send(`✅ Вы выдали предупреждение игроку [${acc.users[args[1]].prefix}].`);
	}); 
bot.hear(/^(?:пополнить)\s?([^]+)?/i,  message => {
	       let user = acc.users.find(a => a.vk === message.user); 
		   let cc = message.$match[1].toLowerCase();
		   let args = message.$match[1];
		   let nomer = 79114065616; // номер без +
		   let ssilka = `https://qiwi.com/payment/form/99?amountFraction=0&extra%5B%27comment%27%5D=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0+%E2%84%96${user.vk}+%5B%23${user.id}%5D&extra%5B%27account%27%5D=%2B${nomer}&amountInteger=${message.$match[1]}&currency=643&blocked[0]=sum&blocked[1]=account&blocked[2]=comment`
	
	     	vk.api.call("utils.getShortLink", {url: ssilka}).then(function (res){
	        if(!message.$match[1]) return message.send(`✖ Введите сумму`);
			if(message.$match[1] < 1) return message.send(`✖ Минимальная сумма - 1 руб.`);
			if(message.$match[1] > 15000) return message.send(`✖ Максимальная сумма - 15.000 руб.`);
	        message.send("Держи ссылку для оплаты\n" + res.short_url);
    });  
});		
bot.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users.find(a => a.vk === message.user);
		let args = message.$match;
		if(!args[1]) return message.send(`✖ Пример команды: unwarn ID`);
		if(user.admin < 1) return message.send(`✖ Вы не Администратор`);
		if(!acc.users[args[1]]) return message.send(`✖ Такого игрока нет!`);

		acc.users[args[1]].warn = 0; 
		acc.users[args[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: `✅ Администратор снял Вам все предупреждения`
		});
		return message.send(`✅ Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

bot.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users.find(a => a.vk === message.user); 
		if(!Number(message.$match[1])) return message.send(`✖ Число должно быть цифрового вида.`);
		if(user.admin < 1) return message.send(`✖ Вы не администратор`);
		let u = acc.users.find(a => a.id === Number(message.$match[1])); 
	    if(!u) return message.send(`✖ Вы указали неверный ID`);
		if(u.admin > 0) return message.send(`✖ Упс! Произошла ошибка!`);
		u.ban = message.$match[2];
		acc.bans +=1
		return message.send(`✅ ➾ Вы заблокировали игрока ${u.prefix} навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 

bot.hear(/^(?:wiki|вики)\s(.*)$/i, async (message, bot) => {
    let args = message.text.match(/^(?:wiki|вики)\s?(.*)/i);
    function isEmpty( str ) { if (str.trim() == '') return true; return false; }
        rq("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent((args[1] ? args[1] : "ВКонтакте"))+"&meta=siteinfo&rvprop=content&format=json")
        .then((res) => {
            if(isEmpty(res[2][0])) {
                if(isEmpty(res[2][1])) {
                    if(isEmpty(res[2][2])) return message.reply('Статья не полная, либо отсутствует.\n\nСсылка: ' + res[3][0]);
                } else {
                    return message.reply(`Я нашёл то, что Вы попросили найти! \n\nСсылка: ${res[3][1]}`);
                }
            } else {
                return message.reply(`Я нашёл то, что Вы попросили найти!\n\nСсылка: ${res[3][0]}`);
            }
        });
});
bot.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users.find(a => a.vk === message.user); 
		if(!Number(message.$match[1])) return message.send(`✖ Число должно быть цифрового вида.`);
		if(user.admin < 1) return message.send(`✖ Вы не администратор`);
		let u = acc.users.find(a => a.id === Number(message.$match[1])); 
	    if(!u) return message.send(`✖ Вы указали неверный ID`);
		if(u.admin > 0) return message.send(`✖ Упс! Произошла ошибка!`);
		u.ban = message.$match[2];
		acc.bans +=1
		return message.send(`✅ ➾ Вы заблокировали игрока ${u.prefix} навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	}); 
bot.hear(/^(?:unban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users.find(a => a.vk === message.user); 
		if(!Number(message.$match[1])) return message.send(`✖ Число должно быть цифрового вида.`);
		if(user.admin < 1) return message.send(`✖ Вы не администратор`);
		let u = acc.users.find(a => a.id === Number(message.$match[1])); 
	    if(!u) return message.send(`✖ Вы указали неверный ID`);
		u.ban = false;
		acc.bans -=1
		return message.send(`✅ ➾ Вы разблокировали игрока ${u.prefix}`);
	}); 
bot.hear(/^(?:nick)\s?([^]+)?/i,  (message) => { 
	let user = acc.users.find(a => a.vk === message.user);
	let args = message.$match; 
	if(user.statu < 1){
		if(args[1].length > 15) return message.send(`✖ Максимальная длина ника 15 символов.`);
		user.prefix = args[1];
	}
	if(user.statu = 1){
		if(args[1].length > 30) return message.send(`✖ Максимальная длина ника 30 символов.`);
		user.prefix = args[1];
	}
	if(user.statu = 2){
		if(args[1].length > 50) return message.send(`✖ Максимальная длина ника 50 символов.`);
		user.prefix = args[1];
	}
	return message.send(`📗 ➾ Вы сменили свой ник на: ${args[1]}`);
});
bot.hear(/^(?:страна)\s?([^]+)?/i,  (message) => { 
	let user = acc.users.find(a => a.vk === message.user);
	let args = message.$match; 
	if(user.statu < 1){
		if(args[1].length > 15) return message.send(`✖ Максимальная длина 15 символов.`);
		user.country = args[1];
	}
	if(user.statu = 1){
		if(args[1].length > 30) return message.send(`✖ Максимальная длина 30 символов.`);
		user.country = args[1];
	}
	if(user.statu = 2){
		if(args[1].length > 50) return message.send(`✖ Максимальная длина 50 символов.`);
		user.country = args[1];
	}
	return message.send(`Вы сменили свою страну на: ${args[1]}`);
});
bot.hear(/^(?:дбонус)\s?([0-9]+)?/i, message => {
	let user = acc.users.find(a => a.vk === message.user);
	let args = message.$match; 
	if(user.statu < 1) return message.send(`⚠ Купите донат для доступа к этой команде!`);
	if(user.bloks.dbonuce == true) return message.send(`✖ Получать донат бонус можно раз в 24 часа!`);
	if(user.statu == 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 500000) return message.send(`✖ Пример: 'Дбонус [1-500000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.statu > 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 1000000) return message.send(`✖ Пример: 'Дбонус [1-1000000]'`);
		user.balance += Number(message.$match[1]);
	}
	user.bloks.dbonuce = true;
		setTimeout(() => {
			user.bloks.dbonuce = false;
	}, 86400000);

	return message.send(`💰 ➾ Вы выдали себе ${spaces(args[1])}$`);
}); 
bot.hear(/^(?:сосать)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(
		`Ну соси, в чём проблема?`
		
	);	
});
bot.hear(/^(?:228)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	let count = ['Мы хранить тебя выносим','Папиросим','Наркоман','1337','Пойти ка на хуй тебя просим','👉🏻👌🏻'].random();
	return message.send(
		`${count}`
		
	);	
});

bot.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 
    let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return;
	for(i in acc.users){
		if(acc.users[i]){
			if(acc.users[i].rass >= 1){
		vk.api.call('messages.send', {
			user_id: acc.users[i].vk,
			message: `${message.$match[1]}`,
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": `Отписаться от рассылки`
		},
			"color": "negative"
		}]
		]
			})
		});
	}
	}
		}
	for(var i = 1; i < 900; i++) {
		vk.api.call('messages.send', {
			peer_id: 2000000000 + i,
			message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});

let date = new Date();
let minutes = date.getMinutes();
let hours = new Date().getHours(); 


setInterval(function () { 
 user.api.status.set({ 
 group_id: 75372115, 
 text: `👥 Аккаунтов в базе: ${acc.number} | ✖Из них заблокировано: ${acc.bans} | 💰В казне: ${f.spaces(Math.round(acc.kazna))} койнов`}); 
 
 }, 60000);
bot.hear(/^(?:стата)/i, async (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	let podpiska = await vk.api.groups.isMember({ group_id: 75372115, user_id: message.senderId});
	let online = await vk.api.groups.getOnlineStatus({ group_id: 75372115 });
	let bans = await vk.api.groups.getBanned({ group_id: 75372115 });
	let sub = await vk.api.groups.getMembers({ group_id: 75372115 });
	let ttime = process.uptime();
    let uptime = (ttime + "").toHHMMSS();
	return message.send(
	   `👁‍🗨Сообщество: ${online.status.toString().replace(/none/gi, "❌Не онлайн").replace(/online/gi, "✔Онлайн").replace(/answer_mark/gi, "⚠Отвечает быстро")}
	    ${podpiska.toString().replace(/0/gi, "❌Вы не подписаны на группу!").replace(/1/gi, "✔Вы подписаны на группу!")}
		👥 Людей в группе: ${sub.count}
		✖В ЧС пользователей: ${bans.count}
		👥 Всего пользователей: ${acc.number}
		✖Заблокировано пользователей: ${acc.bans}
		💬Всего сообщений: ${acc.msg}
		💰В казне: ${f.spaces(Math.round(acc.kazna))} койнов
		⌚Аптайм бота - ` + uptime + `
		⏰Время: ${time()} 
		📅День: ${data()}
		👑@id217885070 (Разработчик)
		
		© PandaClicker 2018-2019 Все права защищены
		`
	);	
});

String.prototype.toHHMMSS = function () {
    let sec_num = parseInt(this, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    let ttime    = hours+':'+minutes+':'+seconds;
    return ttime;
}
bot.hear(/^(?:Иди на)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.sendPhoto("./photo/joker.jpg");
});
bot.hear(/^(?:Дата)/i, (message) => {  
    let user = acc.users.find(a => a.vk === message.user);
	return message.send(`Время: ${time()} | День: ${data()}`);	
});
bot.hear(/^(?:ку|привет|здаров|прив|хай)/i, (message) => {  
    let user = acc.users.find(a => a.vk === message.user);
	let count = ['8914','12296','13046'].random();
		if(user.vk == 217885070){
		return message.sendPhoto("./photo/hi.png");	
	}
		if(user.admin < 1){
		return message.sendSticker(`${count}`);	
	}
		if(user.admin > 0){
		return message.sendPhoto("./photo/hiadm.jpg");	
	}
});
bot.hear(/^(?:ок)/i, (message) => {  
    let user = acc.users.find(a => a.vk === message.user);
	let count = ['11367','11367'].random();
	return message.sendSticker(`${count}`);	
});
bot.hear(/^(?:бан)/i, (message) => {  
    let user = acc.users.find(a => a.vk === message.user);
	let count = ['12312','11595','11763','11724'].random();
	return message.sendSticker(`${count}`);	
});

bot.hear(/^(?:как дела|че как|чё как)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	let count = ['Пока не родила, а ты как?','Хорошо, как сам?','Жить можно, а у тебя?','Отлично, как у тебя?'].random();
	return message.send(
		`${count}`
		
	);	
});
bot.hear(/^(?:норм|хорошо)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	let count = ['Хорошо, когда всё хорошо!','Ооооо, красава!','Так нормально или супер?'].random();
	return message.send(
		`${count}`
		
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
		if(!user) return message.send(`✖ Игрок не найден...\n✉ Пример ввода: 'поиск id217885070 `) 

		return message.send(`
			🔹 Игрок: ${user.prefix}
			🔹 VK: vk.com/id${user.vk}
			🔹 ID: ${user.id}`);
	})
});  
bot.hear(/^(?:инфа)\s?(.*)?/i, (message) => { 
	let args = message.$match; 
	let user = acc.users.find(a => a.vk === message.user);
    if(user.statu < 2) return message.send(`✖ Нет доступа!!`);
	vk.api.call("utils.resolveScreenName", {
			screen_name: args[1]
	}).then((res) => { 
		var id = res.object_id;

		let user = acc.users.find(a => a.vk === id); 
		if(!user) return message.send(`✖ Игрок не найден...\n✉ Пример ввода: 'поиск id217885070 `) 

		return message.send(`
			🔹 Игрок: ${user.prefix}
			🔹 VK: vk.com/id${user.vk}
			🔹 ID: ${user.id}
			🔹 Баланс: ${user.balance}
			🔹 Страна: ${user.country}
			${user.statu.toString().replace(/0/gi, "").replace(/1/gi, "🔹Статус: ⚜VIP").replace(/2/gi, "🔹Статус: 🔱PREMIUM").replace(/3/gi, "🔹Статус: 👁‍🗨Следящий").replace(/4/gi, "🔹Статус: Администратор")} 
			 ⏳ Ускорения ⏳ 
	 📕 Курсор [${user.modules["1"].count}] +${user.modules["1"].count*1}/сек
	 📗 Видеокарта  [${user.modules["2"].count}] +${user.modules["2"].count*2}/сек
	 📘 Стойка Видеокарт  [${user.modules["3"].count}] +${user.modules["3"].count*3}/сек
     📙 Суперкомпьютер  [${user.modules["4"].count}] +${user.modules["4"].count*4}/сек
     📔 Сервер ВКонтакте [${user.modules["5"].count}] +${user.modules["5"].count*6}/сек
	 📓 Квантовый компьютер  [${user.modules["6"].count}] +${user.modules["6"].count*8}/сек
	 🖥 Датацентр [${user.modules["7"].count}] +${user.modules["7"].count*10}/сек
	 Ⓜ Корпорация Microsoft [${user.modules["8"].count}] +${user.modules["8"].count*20}/сек
	 
	 💿 Суммарно: ${(user.modules["1"].count*1)+(user.modules["2"].count*2)+(user.modules["3"].count*3)+(user.modules["4"].count*4)+(user.modules["5"].count*6)+(user.modules["6"].count*8)+(user.modules["7"].count*10)+(user.modules["8"].count*20)}/сек
		`);
	})
});  
bot.hear(/^(?:казино)\s?([0-9]+)?/i, (message) => { 
        let user = acc.users.find(a => a.vk === message.user); 
		let args = message.$match;  
        if(!args[1]) return message.send(
				`
				Выберите или введите ставку!
				`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Казино 10000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Казино 100000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Казино 1000000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Казино 10000000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);  
		
		args[1] = args[1].replace(/(\.|\,)/ig, '');
	    args[1] = args[1].replace(/(к|k)/ig, '000');
	    args[1] = args[1].replace(/(м|m)/ig, '000000');
	    args[1] = args[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 
		
        if (amount > user.balance || amount < 1 ) return message.send(`✖  Ставка не может превышать баланс или быть ниже 1$`);

 		if(user.kazlock == 0){
			if (amount > 10000000 && amount != user.balance) return message.send(`✖  Ставка не должна быть больше 10.000.000$\nСнять ограничения можно за 10 рублей, пиши ДОНАТ`);
		} 

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲','🤑|🤑|🤑'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸'].random();
        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`🎲 ➟ Вам выпала комбинация: 
			[${win}]\n💎 ➟ Вы выиграли ${win_balance}$!\n🔥 ➟ Множитель: ${mnojitel}x`); 
        }else{
        	user.balance -= amount;
			acc.kazna += amount/100;
        	return message.send(`🎲 ➟ Вам выпала комбинация: 
			[${lose}]\n🌚 ➟ Вы проиграли ${amount}$!`);
        }
    });
	
	bot.hear(/^(?:Kазино)\s?([0-9]+)?/i, (message) => { 
        let user = acc.users.find(a => a.vk === message.user); 
		if(user.admin < 1) return message.send(`Ты проиграл все свои деньги`);
		let args = message.$match;  
        if(!args[1]) return message.send(`✖ укажите ставку числового вида`);
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);  
		
		args[1] = args[1].replace(/(\.|\,)/ig, '');
	    args[1] = args[1].replace(/(к|k)/ig, '000');
	    args[1] = args[1].replace(/(м|m)/ig, '000000');
	    args[1] = args[1].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 
		
        if (amount > user.balance || amount < 1 ) return message.send(`✖  Ставка не может превышать баланс или быть ниже 1$`);

 		if(user.admin < 1){
			if (amount > 10000000 && amount != user.balance) return message.send(`✖  Ставка не должна быть больше 10.000.000$\nСнять ограничения можно за 10 рублей, пиши ДОНАТ`);
		} 

        let mnojitel = [1,2,3,4,5].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`🎲 ➟ Вам выпала комбинация: [${win}]\n💎 ➟ Вы выиграли ${win_balance}$!\n🔥 ➟ Множитель: ${mnojitel}x`); 
        }else{
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`🎲 ➟ Вам выпала комбинация: [${win}]\n💎 ➟ Вы выиграли ${win_balance}$!\n🔥 ➟ Множитель: ${mnojitel}x`); 
        }
    });
	
	

bot.hear(/^(?:передать|перевод)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match;  
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Передать ID СУММА"`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	if(user.balance < args[2]) return message.send(`✖ У вас недостаточно денег`);
	if(args[1] == user.id) return message.send(`✖ Вы указали свой ID`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	user.balance -= Number(args[2]);
	u.balance += Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно передали ${args[2]} coins игроку ${u.prefix}`);

});

bot.hear(/^(?:дпередать|дперевод)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match;  
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Дпередать ID СУММА"`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	if(user.donate < args[2]) return message.send(`✖ У вас недостаточно ₽`);
	if(args[1] == user.id) return message.send(`✖ Вы указали свой ID`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	user.donate -= Number(args[2]);
	u.donate += Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно передали ${args[2]}₽ игроку ${u.prefix}`);

});
bot.hear(/^(?:реферал)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(user.referal != false) return message.send(`✖ Ты уже активировал рефералку`);
	let args = message.$match;  
	if(!args[1]) return message.send(`✖ Пример: "Реферал ID"`);
	if(!u) return message.send(`✖ Вы указали неверный ID`);

    user.referal = args[1];
	u.balance += 100000;
	user.balance += 500000
	return message.send(`[${f.time()}] Вы активировали рефералку ${u.prefix} и получили 500,000 coins`);

});
bot.hear(/^(?:апередать)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Апередать ID СУММА"`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	u.balance += Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно передали ${args[2]} coins игроку ${u.prefix}`);
});
bot.hear(/^(?:unlock)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2]) return message.send(`✖ Пример: "Unlock ID 1"`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);
    u.kazlock = args[2];
	return message.send(`[${f.time()}]💸 Вы успешно сняли ограничения в казино игроку ${u.prefix}`);

});

bot.hear(/^(?:адпередать)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Адпередать ID СУММА"`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	u.donate += Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно начислили ${args[2]} ₽ игроку ${u.prefix}`);

});

bot.hear(/^(?:ahelp|ахелп|апомощь)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`); 
	return message.send(`Команды админа короче, вот: 
	
	Апередать [ID] [Сумма] - выдать койны
	Адпередать [ID] [Сумма] - выдать рубли
	Setnick [ID] [Ник] - установить ник игроку
	Settag [ID] [Тег] - установить тег игроку
	Ban [ID] [Причина] - заблокировать игрока  навсегда
	Unban [ID] [1] - разблокировать игрока
	Раздача - раздать деньги из казны
	Выдать бабки - открыть всем доступ к команде Промо бабки`);

});

bot.hear(/^(?:setadmin)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.statu !== 4) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2]) return message.send(`✖ Пример: "Setadm ID 1"`);
	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);
	u.admin = Number(args[2]);
	u.statu = 4
	return message.send(`[${f.time()}] Вы успешно выдали ${args[2]} уровень администратора игроку ${u.prefix}`);

});
bot.hear(/^(?:setstatus)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.statu !== 4) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2]) return message.send(`✖ Пример: "Setstatus ID 0-2"`);
	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);
	u.statu = Number(args[2]);
	return message.send(`[${f.time()}] Вы успешно выдали ${args[2]} статус игроку ${u.prefix}`);

});

bot.hear(/^(?:setnick)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2] || args[1] < 1) return message.send(`✖ Пример: "Setnick ID ИМЯ"`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	u.prefix = args[2];
	return message.send(`[${f.time()}] Вы успешно поменяли имя игроку ${u.prefix}`);

});
bot.hear(/^(?:settag)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	if(!args[2] || args[1] < 1) return message.send(`✖ Пример: "Settag ID ТЕГ"`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	u.tag = args[2];
	return message.send(`[${f.time()}] Вы успешно поменяли тег игроку ${u.prefix}`);

});

bot.hear(/^(?:адзабрать)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Адзабрать ID СУММА"`);
	if(args[2] > u.donate ) return message.send(`✖ У игрока нет столько денег`);

	args[2] = args[2].replace(/(\.|\,)/ig, '');
	args[2] = args[2].replace(/(к|k)/ig, '000');
	args[2] = args[2].replace(/(м|m)/ig, '000000');
	args[2] = args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance); 

	u.donate -= Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно забрали ${args[2]} ₽ у игрока ${u.prefix}`);

});
bot.hear(/^(?:азабрать)\s?([0-9]+)?\s?(.*)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.admin < 1) return message.send(`✖ Ты не Администратор!!`);
	let args = message.$match;  
	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);
	if(!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`✖ Пример: "Азабрать ID СУММА"`);
	if(args[2] > u.balance ) return message.send(`✖ У игрока нет столько денег`);

	u.balance -= Number(args[2]);
	return message.send(`[${f.time()}]💸 Вы успешно забрали ${args[2]} койнов у игрока ${u.prefix}`);

});

bot.hear(/^(?:насиловать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match;  
	if(!args[1] || args[1] < 0) return message.send(`✖ Пример: "Насиловать ID"`); 
	
	if(args[1] == user.id) return message.send(`✖ Вы указали свой ID`);

	let u = acc.users.find(a => a.id === Number(args[1])); 
	if(!u) return message.send(`✖ Вы указали неверный ID`);

	return message.send(`Вы изнасиловали игрока ${u.prefix}`);

});

bot.hear(/^(?:вабанк)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	if(user.balance < 1) return message.send(`✖ У тебя нет бабла!`);
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += user.balance;
		return message.send(`😊 Поздравляем ! Вы выиграли !`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(`😒Вы проиграли!`);
	}
});



bot.hear(/^(?:Инфо|📝 инфо|❓инфо)/i, (message) => {  

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
						"label": "Основные"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Игры"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Настройки"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Развлекательные"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}]
				]
					})
				});
		}
		);		

vk.updates.hear(/^(?:обменять)\s?([1-9]+)?/i, message => {
 	
 		return message.send(
		    `
 			✖ Недоступно на данный момент!
 			`
	    );
 	}); 
		
bot.hear(/^(?:Баланс|💰баланс)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	let ss = user.balance
	return message.send(
		`💰 Баланс: ${f.spaces(Math.round(ss))} coins
💴 Донат: ${user.donate}₽
В казне: ${f.spaces(Math.round(acc.kazna))}`
	);	
});
bot.hear(/^(?:премиум|premium)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(
		`Команды PREMIUM:
Дбонус [1-1000000] - добавить денег раз в 24 часа
Nick - максимум 50 символов
Повышен % на победу в казино!
Клик увеличен в 3 раза!
Инфа [id ВК]

${user.statu.toString().replace(/0/gi, "Не имеется❌").replace(/1/gi, "Не меется❌").replace(/2/gi, "Имеется✔").replace(/3/gi, "Имеется✔").replace(/4/gi, "Имеется✔")}`
	);	
});
bot.hear(/^(?:ВИП|VIP|v.i.p)/i, (message) => {  
	let user = acc.users.find(a => a.vk === message.user); 
	return message.send(
		`Команды VIP:
Дбонус [1-500000] - добавить денег раз в 24 часа
Nick - максимум 30 символов
Повышен % на победу в казино!
Клик увеличен в 2 раза!

${user.statu.toString().replace(/0/gi, "Не имеется❌").replace(/1/gi, "Имеется✔").replace(/2/gi, "Имеется✔").replace(/3/gi, "Имеется✔").replace(/4/gi, "Имеется✔")}`
	);	
});
bot.hear(/^(?:слоты)\s?([^\s ].*)?/i, message => {
   let user = acc.users.find(a => a.vk === message.user); 
    if (!message.$match[1]) return message.send(
				`
				Выберите или введите ставку!
				`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Слоты 10000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Слоты 100000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Слоты 1000000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Слоты 10000000"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
    let amount = parserInt(message.$match[1]);
    if (!Number(amount) || amount < 0) return message.send(`✖ ставка не число`);
    if (amount > user.balance) return message.send(`✖ Ставка > баланса`);
	if (amount > 10000000) return message.send(`✖ Ставка > 10.000.000`);
    if (message.$from.type != 'user') return message.send(`✖ Эта игра доступна только в ЛС группы`);
	if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё'){ 
	if (user.balance < 1 ) return message.send(`✖ Похоже у тебя нету денег =)`); 
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
                            user.balance += Number(amount);
                            vk.api.call('messages.edit', {
                                peer_id: chat,
                                message: r.smile + `\n🎰 Вы победили!\n💎 Вы выиграли: ${amount}$`,
                                message_id: res
                            })
                            return;
                        } else {
                            user.balance -= Number(amount);
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
});
bot.hear(/^(?:основные)/i, (message) => {  

			return message.send(
				`
				[🌐]Основные команды:
				  📝 Инфо - информация о проекте
				  ⌚ Дата - посмотреть сколько время и число по МСК
				  🛑 Беседы - посмотреть список Наших бесед
				  💼 Профиль 
				  ♻ Ускорение
				  🎁 Бонус
				  🔝 Топ
				  🔍 Поиск [ссылка(вк)]
				  💰 Передать [ID] [сумма]
				  💴 Дпередать [ID] [сумма]
				  👑 Донат
				  💴 Баланс
				
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
						"label": "Инфо"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Дата"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Беседы"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Профиль"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Ускорение"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Бонус"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Топ"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Баланс"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Донат"
				},
					"color": "negative"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "В меню"
				},
					"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:игры)/i, (message) => {  

			return message.send(
				`
				[🎮] Игры:
			      🎭 Казино [ставка]
				  🎰 Слоты [ставка]
				   🎲 Вабанк - испытать удачу (всё или ничего)
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
						"label": "Казино"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Слоты"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Вабанк"
				},
					"color": "positive"
					}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "В меню"
				},
					"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:в меню)/i, (message) => {  

			return message.send(
				`
				🙆‍♂ | Выбирай братуха
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
						"label": "Основные"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Игры"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Настройки"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Развлекательные"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:настройки)/i, (message) => {  

			return message.send(
				`
				[🛠] Настройки:
                  🛠Nick [имя] - поменять имя в боте
				  👁‍🗨Стата - информация о боте
				  Страна [название] - изменить страну
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
						"label": "Стата"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:Развлекательные)/i, (message) => {  

			return message.send(
				`
				[🎉] Развлекательные:
                    🔮 Шар (фраза)
					💞 Лтест - сколько человек вас любят
					❓ Когда [фраза] - предсказывает когда случится событие
					🔎 Кто я - узнать кто Ты на самом деле
					😀 Анекдот - рандомный Анекдот
					❓ Вики [слово] - определение слова
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
						"label": "Лтест"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Кто я"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Анекдот"
				},
					"color": "positive"
					}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "В меню"
				},
					"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:помощь|команды|📜команды|начать)/i, (message) => {  

			return message.send(
				`
				🙆‍♂ | Выбирай братуха
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
						"label": "Основные"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Игры"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Настройки"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Развлекательные"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Скан"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Магазин"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:магазин|shop)/i, (message) => {  

			return message.send(
				`
				🙆‍♂ | Выбирай братуха
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
						"label": "Бизнесы"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Транспорт"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Недвижимость"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Остальное"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:бизнесы)/i, (message) => {  

			return message.send(
				`
				🙆‍♂ | Выбирай братуха
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
						"label": "Кинотеатр"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Аэропорт"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Банк"
				},
					"color": "positive"
					}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:Кинотеатр)/i, (message) => {  

			return message.send(
				`
				Стоимость - 100.000.000 койнов
                Прибыль: 7.000.000 койнов/час
				
				🙆‍♂ | Выбирай братуха
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
						"label": "Кинотеатр купить"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Кинотеатр продать"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Кинотеатр баланс"
				},
					"color": "positive"
					}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
				}
				);
bot.hear(/^(?:бонус|🎁 бонус)/i, async (message) => {  

	let user = acc.users.find(a => a.vk === message.user); 
	let podpiska = await vk.api.groups.isMember({ group_id: 75372115, user_id: message.senderId});
	if(podpiska == 0) return message.send(`❌ Вы не подписались на группу`);
	
	min = limits[message.user].bonus_min; 
	if (limits[message.user].bonus == true) return message.send(`[@id${message.user}(${user.prefix})] => ✖ Брать бонус можно через: ${min} минут `); 
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
						"label": "Основные"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Игры"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Настройки"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Развлекательные"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}]
				]
					})
				});
				}
				);
				
				 
bot.hear(/^(?:ускорение|ускорения|улучшения|♻ ускорение|♻ ускорения|♻ улучшения)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let args = message.$match; 
	let ss = user.balance

	if (!args[1]) return message.send(
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
			8&#8419;. Корпорация Microsoft | ${user.modules["8"].price} | +20/сек
			
			💰 Баланс: ${f.spaces(Math.round(ss))} coins

			➡ - -  Для покупки напишите "Ускорение (номер)" - - ⬅
			➡ - -  Пример: "Ускорение 1" - - ⬅
				`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 1"
					},
						"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 2"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 3"
					},
						"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 4"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 5"
					},
						"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 6"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 7"
					},
						"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Ускорение 8"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "В меню"
					},
						"color": "primary"
				}]
				]
					})
				});
	let i = args[1];
	
	if (!Number(i) || i < 0 || i > 8) return message.send(`[@id${message.user}(${user.prefix})] => Неверно указан номер ускорения!`, {keyboard: menu});
	if (user.balance < user.modules[Number(i)].price) return message.send(`[@id${message.user}(${user.prefix})] => У вас недостаточно COINS`);

	user.balance -= Number(user.modules[Number(i)].price);
	user.modules[Number(i)].price += (Math.round(user.modules[Number(i)].price * 0.5));
	user.modules[Number(i)].count += 1;

	return message.send(`[@id${message.user}(${user.prefix})] => Вы успешно преобрели ускорение!\n❗ Подробная информация в 'профиль'`);
	 
});



bot.hear(/^(?:профиль|проф|💼 профиль| 💼 проф|🙎‍♂профиль)/i, async (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let ss = user.balance
	return message.send(`
    @id${message.user}(|${user.tag}| ${user.prefix}),
	 🆔 ID: ${user.id}
	 ${user.statu.toString().replace(/0/gi, "").replace(/1/gi, "Статус: ⚜VIP").replace(/2/gi, "Статус: 🔱PREMIUM").replace(/3/gi, "Статус: 👁‍🗨Следящий").replace(/4/gi, "Статус: Администратор")} 

💰 Баланс: ${f.spaces(Math.round(ss))} coins
💴 Донат: ${user.donate}₽

Страна: ${user.country}
	 
	 ⚠
	
	 ⏳ Ваши ускорения ⏳ 
	 📕 Курсор [${user.modules["1"].count}] +${user.modules["1"].count*1}/сек
	 📗 Видеокарта  [${user.modules["2"].count}] +${user.modules["2"].count*2}/сек
	 📘 Стойка Видеокарт  [${user.modules["3"].count}] +${user.modules["3"].count*3}/сек
     📙 Суперкомпьютер  [${user.modules["4"].count}] +${user.modules["4"].count*4}/сек
     📔 Сервер ВКонтакте [${user.modules["5"].count}] +${user.modules["5"].count*6}/сек
	 📓 Квантовый компьютер  [${user.modules["6"].count}] +${user.modules["6"].count*8}/сек
	 🖥 Датацентр [${user.modules["7"].count}] +${user.modules["7"].count*10}/сек
	 Ⓜ Корпорация Microsoft [${user.modules["8"].count}] +${user.modules["8"].count*20}/сек

	💿 Суммарно: ${(user.modules["1"].count*1)+(user.modules["2"].count*2)+(user.modules["3"].count*3)+(user.modules["4"].count*4)+(user.modules["5"].count*6)+(user.modules["6"].count*8)+(user.modules["7"].count*10)+(user.modules["8"].count*20)}/сек
	`);
	 
});       

bot.hear(/^(?:get)/i, async (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let id = acc.users.find(a => a.vk === message.$match[1]); 
	let ss = id.balance
	if(user.admin < 1) return; 
	return message.send(`
    @id${id.vk}(${id.prefix}),
	 🆔 ID: ${id.id}
	 ${id.statu.toString().replace(/0/gi, "").replace(/1/gi, "Статус: ⚜VIP").replace(/2/gi, "Статус: 🔱PREMIUM").replace(/3/gi, "Статус: 👁‍🗨Следящий").replace(/4/gi, "Статус: Администратор")} 

💰 Баланс: ${f.spaces(Math.round(ss))} coins
💴 Донат: ${id.donate}₽
	 
	 ⚠
	
	 ⏳ Ускорения ⏳ 
	 📕 Курсор [${id.modules["1"].count}] +${id.modules["1"].count*1}/сек
	 📗 Видеокарта  [${id.modules["2"].count}] +${id.modules["2"].count*2}/сек
	 📘 Стойка Видеокарт  [${id.modules["3"].count}] +${id.modules["3"].count*3}/сек
     📙 Суперкомпьютер  [${id.modules["4"].count}] +${id.modules["4"].count*4}/сек
     📔 Сервер ВКонтакте [${id.modules["5"].count}] +${id.modules["5"].count*6}/сек
	 📓 Квантовый компьютер  [${id.modules["6"].count}] +${id.modules["6"].count*8}/сек
	 🖥 Датацентр [${id.modules["7"].count}] +${id.modules["7"].count*10}/сек
	 Ⓜ Корпорация Microsoft [${id.modules["8"].count}] +${id.modules["8"].count*20}/сек

	💿 Суммарно: ${(id.modules["1"].count*1)+(id.modules["2"].count*2)+(id.modules["3"].count*3)+(id.modules["4"].count*4)+(id.modules["5"].count*6)+(id.modules["6"].count*8)+(id.modules["7"].count*10)+(id.modules["8"].count*20)}/сек
	`);
	 
});       

bot.hear(/^(?:топ|🔝 топ|👥топ)/i, (message) => { 

	let text = ``; var tops = []
	 
	for (i=0; i<acc.users.length; i++) { 
		tops.push({
			id: acc.users[i].id,
			vk: acc.users[i].vk, 
			balance: acc.users[i].balance,
			prefix: acc.users[i].prefix,
			tag: acc.users[i].tag
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
			yo.push({ id: tops[g].id, vk: tops[g].vk, balance: tops[g].balance, tag: tops[g].tag, prefix: tops[g].prefix, smile: `${ups}` })
		}
	}
	text = "💴 Топ игроков 💴 \n" + yo.map(a => a.smile + `. @id${a.vk} (|${a.tag}| ${a.prefix}) >> ${Math.round(a.balance)} Coins`).join("\n") 
 

	for (i=0;i<tops.length;i++) {
		if(message.user == tops[i].vk) {
			return message.send(text + `\n- - - - - -\n~ Вы на ${i+1} месте ~`)
		}
	} 
});


bot.hear(/^(?:клик|👆🏻клик)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
	let count = ['😃','😀','😄','😁','☺','🙂'].random();
	let how = ['нормально','круто','хорошо','отлично','супер','превосходно'].random();
	let ss = f.rand(100,200);
	if(user.statu == 1){ 
	ss = f.rand(300,400) 
	} 
	if(user.statu == 2){ 
	ss = f.rand(600,700) 
	} 
	if(user.vk == 217885070||user.vk == 525933711){ 
	ss = f.rand(5000,15000) 
	} 
	
	user.balance += ss; 
	acc.kazna  += ss/2;
	return message.reply(` 
	@id${message.user}(|${user.tag}| ${user.prefix}), ${how} кликаешь ${count} !\n💰Ты накликал(а): ${f.spaces(Math.round(ss))} coins `,
	{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "Основные"
				},
					"color": "positive"
				},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"2\"}",
						"label": "Игры"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"3\"}",
						"label": "Настройки"
				},
					"color": "positive"
					},
				{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"4\"}",
						"label": "Развлекательные"
					},
						"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "👆🏻КЛИК"
				},
					"color": "negative"
				}]
				]
					})
				});
	}
	);

//развлекательные 

bot.hear(/^(?:кто я)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user);
		let count = ['Ивангай','Топчик','телка','Майнкрафтер','чмо','крутой','принц','телка админа','человек','пес','овца','лох','ъеъ','кися','Панин','дебил','богатый','миллионер','ауешник','плохой человек','снежный человек','пукан','сын маминой подруги','отец 7-х козлят','какашка единорога','Капитан','говно','упоротый','алкаш','терминатор','пчелка','фея','Анжелла','Рикардо Милос',' флексер','Путин','Навальный','офник','спулае мулае',' гонщик нелегальный','боб строитель','целка','шлюшка','создатель бота'].random();
		return message.send(`Думаю что ты ${count} :)`);
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
		return message.reply(`😃 Думаю что через ${rand(1,360)} дней`);
}); 
bot.hear(/^(?:пиар)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user);  
		return message.reply(`Ты-пиарщик!\nТы должен пиарить бота в беседах!\n\nБеседы для пиара ты можешь найти здесь https://vk.com/topic-158861435_39990067`);
}); 
bot.hear(/^(?:беседы)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
		return message.reply(`НАШИ БЕСЕДЫ\n\n\nБЕСЕДА №1 >> https://vk.me/join/AJQ1d_DJuBFteMGfJp5XDGlQ`);
}); 
bot.hear(/^(?:лтест)/i, (message) => { 
	let user = acc.users.find(a => a.vk === message.user); 
		return message.reply(`👩‍⚕💖 Тест показал, вас любят  ${rand(1,397)} человек`);
});


bot.hear(/^(?:eval)\s?([^]+)?/i, (message) => { 
	let args = message.$match; 
	if(message.user != 217885070) return;
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
			u.balance += Number(u.modules['7'].profit * u.modules['7'].count);
			u.balance += Number(u.modules['8'].profit * u.modules['8'].count);

		 	if (u.vip == 1) { u.balance += 20 }
		 	if (u.vip == 2) { u.balance += 40 }
		 	if (u.vip == 3) { u.balance += 60 }
		} 
	 }
}, 1000);

function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks.dbonuce = false;
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
function poltime() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours()+1;
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
		var datas = days + '.' + month + '.2019' ;
		return datas;
	}
 //---------------------------------------
/*----------------------------------------------------------------------------------------------------------*/
async function run() {
	await vk.updates.startPolling(); 
	restart();
}
run().then(() => {
	    console.log('[START] --> ' + f.time());
})
.catch((error) => {
	    console.error('[ERROR] | '+error);
});
/*----------------------------------------------------------------------------------------------------------*/
bot.setHearFallbackHandler(async (context, next) => {
	return message.send(`такой команды не существует, отправь «помощь» что бы узнать мои команды.`);
});