const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk; ///Vrode Bot ot Olega!
const fs = require("fs"); /////////////////////////////////////////////////////////////////////
const admins = [275944431]; //// id админа (для логов)
const vip = [275944431]; /////// id админа (для логов)
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const config = require("./setting/config.json") 

vk.setOptions({
    token: 'da0956748967ea88a0ee2227da316211ded367e47f0cc813ab182e532aee1db65f51b795532548441dde4', // токен группы
    apiMode: 'parallel',
	pollingGroupId: 176640007 // 1 замени на id группы 
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
	
	

    if(message.is("message") && message.isOutbox)
        return; 

 		let id = user_id(message.user); 
 		 
		message.send(` Привет друг, я вижу ты новенький! Напиши «помощь» и узнай, что я могу! `)
	 	   
		
		acc.users[numm] = {
			balance: 4000,
			level: 0,
               podpis: 0,
               hei: 0,
               video: 0,
               kanal: false,
               knser: false,
               mikro: false,
               serkn: false,
               kakake: false,
               uggg: false,
               fggg: false,
               xxxkn: false,
               herkn: false,
               huikn: false,
               govkn: false,
               gerkn: false,
               gggkn: false,
               zolkn: false,
               brilkn: false,
               monit: false,
               prosm: 0,
               dizlike: 0,
               kom: 0,
               huih: 0,
               cers: 0,
               bbbb: 0,
               monk: false,
			podarki: 10,
               kaki: false,
			cip: 0,
			his: 0,
			like: 0,
               obor: false,
			bloks: { 
				cases: false,
                    stream: false,
                    bcases: false,
                    orcase: false,
                    hercase: false,
                    streams: false,
                    vid: false,
                    han: false,
                    gse: false,
                    rrse: false,
                    gras: false,
                    pose: false,
                    bcase: false,
                    gagi: false,
				rukus: false,
				nik: false,
				vivi: false,
                    hersd: false,
                    tata: false,
				bonus: false,
			},
			number: numm,
			id: message.user,
			nick: true,
               name: `Имя буд канала`,
			game: {
				monetka: 0
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},
			bank: 0,
			tag: "Новичок", 
			ainfo: {
				vig: 0,
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
			global_podpis: 0,
			prefix: `Игрок #${numm}`,
			rtime: `${time()} | ${data()}` 
			} 
			
		////////////////////  
			vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0]; 
				acc.users[user_id(message.user)].prefix = ` ${user.first_name} `;
			}).catch((error) => {console.log('err[prefix]'); }); 
	}
	let id = user_id(message.user);

 


	if(message.text){ 
	let user = acc.users[user_id(message.user)];
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

 

 	vk.updates.hear(/^(?:тайм)/i,  (message) => { 
 		return message.send(`&#10004; » Работаю!\n⏰ » Дней: ${uptime.days}\n⏰ » Часов: ${uptime.hours}\n⏰ » Минут: ${uptime.min}\n⏰ » Секунд: ${uptime.sec}`);
 	});	

	vk.updates.hear(/^(?:помощь|начать)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
	@id${message.user} (${user.prefix}), ❄ Прежде чем стать блогером, тебе нужно будет подкопить деньжат используя команду «Работать», ее ты можешь использовать раз в 5 минут.

⭕Далее, тебе нужно будет приобрести оборудование для съемки командой «Оборудование», после этого, можешь создавать канал - создать «Название».

❗Помни, что нецензурная лексика в названии канала может привести к бану, после создания канала, снимай ролики - снять «название» и набирай популярность.

✅Полный список команд ты можешь получить введя «Команды».

😋Удачи!.

    `)
   });

vk.updates.hear(/^(?:баланс|счёт|balance)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		ID аккаунта: ${user_id(message.user)} 
		💴 » Баланс ${spaces(user.balance)}$\n\n		Пожертвовали на бота:\n		@id245036619 (Амир Абдрахманов)
		`)

});

	vk.updates.hear(/^(?:реклама)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	return message.send(`
    @id${message.user} (${user.prefix}), Хай, хочешь купить рекламу для своего канала😏?

✅Мы - самая надежная и законная компания по продаже рекламы, с нами ты достигнешь высот!

1.Тариф «Старт»:
　📈Прирост: ~1.000 сабов
　💸Цена: 15.000$

2.Тариф «Нормал»:
　📈Прирост: ~10.000 сабов
　💸Цена: 75.000$

3.Тариф «Про»:
　📈Прирост: ~100.000 сабов
　💸Цена: 750.000$

4. Тариф «Мега»:
　💸Прирост: ~500.000 сабов
　💸Цена: 3.000.000$

🔥Для покупки введите реклама «нужный вам тариф»

    `)
   });
 
//////////////////////////////////////////
	vk.updates.hear(/^(?:тренды)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].podpis
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
		var people = "👑 Лучшие ютуберы 👑 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

  vk.updates.hear(/^(?:!рассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 5) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[Рассылка]\n->${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
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

vk.updates.hear(/^(?:снять)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`У вас нет канала!`);
		if(user.kanal == true){
		if(user.bloks.orcase == true) return message.send(`Снимать можно раз в 10 минут`);
 		user.bloks.orcase = true
		setTimeout(() => {
			user.bloks.orcase = false
		}, 600000);
	if(message.$match[1].length > 15) return message.send(`Максимальная длина ролика 15 символов.`);
     user.video += 1;
     mones = 5 + acc.users[id].podpis + 5;
 	user.balance += mones;
     likes = acc.users[id].podpis + 2 - rand(2,5);
     user.like += likes;
     dizlikes = acc.users[id].hei - rand(1,3);
     user.dizlike += dizlikes;
     prosm = 3 + acc.users[id].podpis * rand(4,6);
     user.prosm += prosm;
     podpis = rand(10,30);
     user.podpis += podpis;
     user.global_podpis += podpis;
     heit = rand(1,3);
     user.hei += heit;
     kom = 1 + acc.users[id].podpis - rand(4,7);
     user.kom += kom;
	return message.send(`@id${message.user} (${user.prefix}), Вы успешно отсняли ролик: ${message.$match[1]}\n\n🎬Статистика ролика:\n👁 Просмотров: ${spaces(prosm)}\n👍 Лайков: ${spaces(likes)}\n👎 Дизлайков: ${spaces(dizlikes)}\n💬 Комментариев: ${spaces(kom)}\n💸 + ${spaces(mones)}$\n🎬Новых сабов: ${spaces(podpis)}\n🚫 Новых хейтеров: ${spaces(heit)}\n✅Ты на верном пути, продолжай выпускать ролики!:`);
   }
});

vk.updates.hear(/^(?:оборудование)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.obor == true) return message.send(`@id${message.user} (${user.prefix}), У тебя уже есть камера!`);
		if(user.obor == false){
 		if(user.balance < 3000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 		user.balance -= 3000;
          user.obor = true;
	return message.send(`@id${message.user} (${user.prefix}), Вы успешно купили оборудование для съёмок! Вас ждёт светлое будущее`);
   }
});

vk.updates.hear(/^(?:микрофон)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.mikro == true) return message.send(`@id${message.user} (${user.prefix}), У тебя уже есть микрофон!`);
		if(user.mikro == false){
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У тебя нет канала)`);
		if(user.kanal == true){
 		if(user.balance < 500) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 		user.balance -= 500;
          user.mikro = true;
	return message.send(`@id${message.user} (${user.prefix}), Вы успешно купили микрофон для стримов`);
     }
   }
});

vk.updates.hear(/^(?:реклама старт)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);
		if(user.kanal == true){
		if(user.bloks.bcase == true) return message.send(`@id${message.user} (${user.prefix}), Покупать рекламу можно раз в 10 минут `);
 		user.bloks.bcase = true
		setTimeout(() => {
			user.bloks.bcase = false
		}, 600000);
 		if(user.balance < 15000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 		user.balance -= 15000;
     podpis = rand(700,900);
     user.podpis += podpis;
     user.global_podpis += podpis;
	return message.send(`@id${message.user} (${user.prefix}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

vk.updates.hear(/^(?:реклама нормал)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);
		if(user.kanal == true){
		if(user.bloks.bcase == true) return message.send(`@id${message.user} (${user.prefix}), Покупать рекламу можно раз в 10 минут `);
 		user.bloks.bcase = true
		setTimeout(() => {
			user.bloks.bcase = false
		}, 600000);
 		if(user.balance < 75000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 	user.balance -= 75000;
     podpis = rand(1000,5000);
     user.podpis += podpis;
     user.global_podpis += podpis;
	return message.send(`@id${message.user} (${user.prefix}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

vk.updates.hear(/^(?:реклама про)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);
		if(user.kanal == true){
		if(user.bloks.bcase == true) return message.send(`@id${message.user} (${user.prefix}), Покупать рекламу можно раз в 10 минут `);
 		user.bloks.bcase = true
		setTimeout(() => {
			user.bloks.bcase = false
		}, 600000);
 		if(user.balance < 750000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 	user.balance -= 750000;
     podpis = rand(100000,130000);
     user.podpis += podpis;
     user.global_podpis += podpis;
	return message.send(`@id${message.user} (${user.prefix}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
   }
});

vk.updates.hear(/^(?:убрать хейтеров)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У тебя нет канала`);
		if(user.kanal == true){
 		if(user.balance < 75000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 	user.balance -= 75000;
     user.hei = 1;
	return message.send(`@id${message.user} (${user.prefix}), Хейтеры подкуплены`);
   }
});

vk.updates.hear(/^(?:реклама мега)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
     let id = user_id(message.user)
	
		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);
		if(user.kanal == true){
		if(user.bloks.bcase == true) return message.send(`@id${message.user} (${user.prefix}), Покупать рекламу можно раз в 10 минут `);
 		user.bloks.bcase = true
		setTimeout(() => {
			user.bloks.bcase = false
		}, 600000);
 		if(user.balance < 3000000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег.`);
 	user.balance -= 3000000;
     podpis = rand(500000,550000);
     user.podpis += podpis;
     user.global_podpis += podpis;
	return message.send(`@id${message.user} (${user.prefix}), Реклама принесла вам ${spaces(podpis)} подписчиков`);
  }
});
vk.updates.hear(/^(?:Создать)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
          if(user.obor == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет камеры!`);
		if(user.obor == true){
		if(user.kanal == true) return message.send(`@id${message.user} (${user.prefix}), У вас уже есть канал!`);
		if(user.kanal == false){
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`@id${message.user} (${user.prefix}), Придумайте адекватное название канала`);
     }
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`@id${message.user} (${user.prefix}), Придумайте адекватное название канала`);
	}
	if(message.$match[1].length > 15) return message.send(`@id${message.user} (${user.prefix}), Максимальная длина канала 15 символов.`);
	if(user.balance < 1000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно денег для создания канала, стоимость 1000$`);
 	user.balance -= 1000;
	user.name = message.$match[1];
     user.kanal = true;
	return message.send(`@id${message.user} (${user.prefix}), Вы успешно создали канал: ${message.$match[1]}`);
      }
   }
});



	vk.updates.hear(/^(?:репорт)\s?([^]+)?/i, (message) => { 
 		if(message.$from.type != 'user') return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`Вы не написали жалобу | репорт [текст]`);
		if(user.bloks.rukus == true) return message.send(`Не флудите!`);
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
					message: `Обращение(репорт)\nID игрока: ${user_id(message.user)}\nЖалоба: ${message.$match[1]}\nДля ответа: ответ id ваш_ответ`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(` Вы успешно отправили жалобу.`);
	});

 
	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`У вас заблокированы ответы на репорт.`)
		if(user.level < 5) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`Проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `Админ: ${user.prefix} ответил Вам: \n${message.$match[2]}`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`Ответ отправлен.`)
	});

	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`Пример команды: ban ID причина`);
		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`Вы не администратор`);
		let a = zapret(message.$match[1]);
	    if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].level > 1) return message.send(`Ошибка !`);
		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}`
		});
		return message.send(` Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\nПричина: ${message.$match[2]}`);	});vk.updates.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {	let user = acc.users[user_id(message.user)];	let id = user_id(message.user)	let i = config;	if(acc.users[id].level < 5) return;			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'giverub id сумма'`); 			acc.users[message.$match[1]].balance += Number(message.$match[2]);			return message.send(`Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`); 	 });vk.updates.hear(/^(?:givepod)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {	let user = acc.users[user_id(message.user)];	let id = user_id(message.user)	let i = config;	if(acc.users[id].level < 5) return;			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'givepod id количество'`); 			acc.users[message.$match[1]].podpis += Number(message.$match[2]);			return message.send(`Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} подписчиков`); 	 });vk.updates.hear(/^(?:delluser)\s?([0-9]+)?/i,  message => {	let id = user_id(message.user)	let i = config;	if(acc.users[id].level < 5) return;			let user = acc.users[user_id(message.user)];			if(user.level < 5) return message.send(`Вы не админ`);			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`Пример: 'delluser [ID]'`); 			acc.users[message.$match[1]].balance = 0;		 	acc.users[message.$match[1]].podpis = 0		 	acc.users[message.$match[1]].like = 0               acc.users[message.$match[1]].prosm = 0		 	acc.users[message.$match[1]].dizlike = 0		 	acc.users[message.$match[1]].kanal = false;               acc.users[message.$match[1]].obor = false;               acc.users[message.$match[1]].mikro = false;		 	acc.users[message.$match[1]].kom  = 0					 			return message.send(`Вы удалил аккаунт игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);	}); 	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 		let user = acc.users[user_id(message.user)];		if(!message.$match[1]) return message.send(`Пример команды: unban id`);		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);		if(user.level < 5) return message.send(`Вы не админ`);		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);		acc.users[message.$match[1]].ban = false 		vk.api.call('messages.send', {			peer_id: acc.users[message.$match[1]].id,			message: ` ${user.prefix} разблокировал Вас.`		});		return message.send(`Вы разблокировали игрока [${acc.users[message.$match[1]].prefix}]`);	});	vk.updates.hear(/^(?:strike)\s?([0-9]+)?\s([^]+)?/i, (message) => { 		let user = acc.users[user_id(message.user)];		if(!message.$match[1] || !message.$match[2]) return message.send(`Пример команды: strike id причина`);		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);		if(user.level < 5) return message.send(`Вы не админ`);		let a = zapret(message.$match[1]);	    if(a != 0) return message.send(a)		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);		acc.users[message.$match[1]].warn += 1;		acc.users[message.$match[1]].warn_p.push(message.$match[2]);		let text = ` ${user.prefix} выдал вам страйк(предупреждение)`		if(acc.users[message.$match[1]].warn == 10){			acc.users[message.$match[1]].warn = 0;			acc.users[message.$match[1]].ban = true;			acc.users[message.$match[1]].warn_p = []			text += `\nУ вас 10 страйков.\nВаш аккаунт заблокирован.`		}		vk.api.call('messages.send', {			peer_id: acc.users[message.$match[1]].id,			message: text		});		user.ainfo.warns += 1;		return message.send(` Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);	}); 	vk.updates.hear(/^(?:unstrike)\s?([0-9]+)?/i, (message) => { 		let user = acc.users[user_id(message.user)];		if(!message.$match[1]) return message.send(`Пример команды: unstrike ID`);		if(!Number(message.$match[1])) return message.send(`Число должно быть цифрового вида.`);		if(user.level < 5) return message.send(`Вы не админ`);		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);		acc.users[message.$match[1]].warn = 0; 		acc.users[message.$match[1]].warn_p = []		vk.api.call('messages.send', {			peer_id: acc.users[message.$match[1]].id,			message: `Администратор снял Вам все страйки`		});		var is = [user_id(message.user), message.text] 		adm_log(is)		return message.send(`Вы сняли все страйки игроку [${acc.users[message.$match[1]].prefix}].`);	}); //////////////////////////////////////	vk.updates.hear(/^(?:админкмд)$/i, (message) => {		let dev = '';   	let user = acc.users[user_id(message.user)];	let id = user_id(message.user)		return message.send(`    			@id${message.user} (${user.prefix}), Команды админа:                giverub - Выдать деньги                givepod - Выдать подписчиков                delluser - Удалить аккаунт(удаляется всё)                ban - Забанить игрока                unban - Разбанить игрока                strike - Выдать игроку страйк                unstrike - Удалить все страйки игроку												`);	});	vk.updates.hear(/^(?:бот)$/i, (message) => {		let dev = '';   		return message.send(`                Версия: 1.0(Stable)                Разработчик: @oleg.smorodnikov (Олег)                Зарегистрировано: ${acc.number}                Сообщений:  ${acc.msg}												`);	});	vk.updates.hear(/^(?:канал)$/i,  (message) => { 	let user = acc.users[user_id(message.user)];	let id = user_id(message.user)		if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала`);		if(user.kanal == true){		return message.send(`          @id${message.user} (${user.prefix}), твой канал 🔥        📕 Название: ${user.name}        😻 Подписчиков: ${user.podpis}        🚫 Хейтеров: ${user.hei}              Просмотров: ${user.prosm}        👍 Лайков: ${user.like}        👎 Дизлайков: ${user.dizlike}       💬 Комментариев: ${user.kom}       🎥 Роликов: ${user.video}       ⛔ Страйки: ${user.warn}		Кнопки:\n`+		(user.serkn== false ? ` ` : `Серебрянная кнопка: Получена\n`)+          (user.zolkn== false ? ` ` : `Золотая кнопка: Получена\n`)+          (user.brilkn== false ? ` ` : `Бриллиантовая кнопка: Получена\n`)+		`        ⚙Дата создания канала:             　${user.rtime} 			`);			} 		return message.send(text) 	}); 	vk.updates.hear(/^(?:работать)/i, (message) => {  		let user = acc.users[user_id(message.user)]; 		let id = user_id(message.user) 		if(user.bloks.cases == true) return message.send(`@id${message.user} (${user.prefix}), Работать можно раз в 10 минут`); 		user.bloks.cases = true		setTimeout(() => {			user.bloks.cases = false		}, 600000); 		text = ' Ухх, тяжелый был денёк😃!\n💰Вы заработали: ' 		let count = rand(1,1); 		for(i=0;i<count;i++){ 			x = rand(1,100) 			if(x<79){ 				mon = rand(100,200) 				if(config.bonus_balance == true) mon = mon * 2; 				text += ` ${spaces(mon)}$\n` 				acc.users[id].balance += mon 			} 			if(x>79 && x <80){ 				mon = 1 				text += `${spaces(mon)}$\n` 				acc.users[id].balance += mon 			} 			if(x>80){ 				mon = rand(1,5) 				if(config.bonus_exs == true) mon = mon * 2; 				acc.users[id].balance += mon 					text += `${mon}$\n` 				} 				  				  			} 		return message.send(text) 	});vk.updates.hear(/^(?:получить ск)$/i,  (message) => { 	let user = acc.users[user_id(message.user)];      let id = user_id(message.user)			if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);		if(user.kanal == true){		if(user.serkn == true) return message.send(`@id${message.user} (${user.prefix}), Ты уже получал кнопку!`);		if(user.serkn == false){ 		if(user.podpis < 100000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно подписчиков. Нужно 100000`);     user.serkn = true;	return message.send(`@id${message.user} (${user.prefix}), Вы получили серебрянную кнопку.`);     }   }});vk.updates.hear(/^(?:получить зк)$/i,  (message) => { 	let user = acc.users[user_id(message.user)];      let id = user_id(message.user)			if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);		if(user.kanal == true){		if(user.zolkn == true) return message.send(`@id${message.user} (${user.prefix}), Ты уже получал кнопку!`);		if(user.zolkn == false){ 		if(user.podpis < 1000000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно подписчиков. Нужно 1 миллион`);     user.zolkn = true;	return message.send(`@id${message.user} (${user.prefix}), Вы получили золотую кнопку.`);     }   }});vk.updates.hear(/^(?:получить бк)$/i,  (message) => { 	let user = acc.users[user_id(message.user)];      let id = user_id(message.user)			if(user.kanal == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет канала!`);		if(user.kanal == true){		if(user.brilkn == true) return message.send(`@id${message.user} (${user.prefix}), Ты уже получал кнопку!`);		if(user.brilkn == false){ 		if(user.podpis < 10000000) return message.send(`@id${message.user} (${user.prefix}), У вас не достаточно подписчиков. Нужно 10 миллионов`);     user.brilkn = true;	return message.send(`@id${message.user} (${user.prefix}), Вы получили брилиантовую кнопку.`);     }   }}); 	 vk.updates.hear(/^(?:Стрим)/i, (message) => { 		let user = acc.users[user_id(message.user)];         	if(user.mikro == false) return message.send(`@id${message.user} (${user.prefix}), У вас нет микрофона, купите его командой «микрофон» без «»`);		if(user.mikro == true){ 		if(user.bloks.a_case == true) return message.send(`@id${message.user} (${user.prefix}), Стримить можно раз в 10 минут`);  		let id = user_id(message.user) 		user.bloks.a_case = true		setTimeout(() => {			user.bloks.a_case = false		}, 600000); 		text = '' 		let count = rand(1,1); 		for(i=0;i<count;i++){ 			x = rand(1,100) 			if(x<79){ 				mon = 10 + acc.users[id].podpis + 20 				if(config.bonus_balance == true) mon = mon * 2; 				text += `@id${message.user} (${user.prefix}), Мои подписчики самые крутые😊\n💰Заработано за стрим: ${spaces(mon)}$\n` 				acc.users[id].balance += mon 			} 			if(x>81 && x <82){ 				mon = 10 + acc.users[id].podpis + 20 				text += `@id${message.user} (${user.prefix}), Обожаю себя!😋\n💰Заработано за стрим: ${spaces(mon)}$\n` 				acc.users[id].balance += mon 			} 			if(x>80){ 				mon = 10 + acc.users[id].podpis + 20 				if(config.bonus_exp == true) mon = mon * 2; 				acc.users[id].balance += mon 				let up = lvlup(id); 				if(up == true){ 					text += `Доработки)\n` 				}else{ 					text += `@id${message.user} (${user.prefix}), Обожаю себя!😋\n💰Заработано за стрим: ${mon}$` 				} 				 } 				  			} 		} 		return message.send(text) 	});	vk.updates.hear(/^(?:Выдать админа)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 		let user = acc.users[user_id(message.user)];		let id = user_id(message.user);		if(user.level < 5) return message.send(`Вы не админ!`);		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`Проверьте вводимые данные:\nВыдать админа id срок(1-999)`);		let time = message.$match[2] * 24;        acc.users[message.$match[1]].adm_time = time;        acc.users[message.$match[1]].level = 5;		return message.send(`Вы выдали админку игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 	});	vk.updates.hear(/^(?:Нвыдать админа)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {		let id = user_id(message.user);	 	 		let i = config;		if(acc.users[id].level < 5) return;		 			let user = acc.users[user_id(message.user)]; 			if(user.level < 5) return message.send(`Вы не админ`);			if(!message.$match[1] || !message.$match[2]) return message.send(`Пример команды: giveadm ID 5`); 			if(message.$match[2] > 5) return message.send(`Максимальный админ-уровень 5!`)			if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`); 			acc.users[message.$match[1]].level = Number(message.$match[2]);			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)			vk.api.call('messages.send', {				peer_id: acc.users[message.$match[1]].id,				message: `✅ ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/5/gi, "Админ")}.`			});			var is = [user_id(message.user), message.text] 			adm_log(is)			return message.send(`Вы выдали игроку[${acc.users[message.$match[1]].prefix}]\nАдмин-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/5/gi, "Админ")}]`);		 	}); 	vk.updates.hear(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {		if(message.user != 515126478) return;		let text = '';		if(!message.$match[1] || !message.$match[2]) return;		let id = user_id(message.user);	 			let i = config;		if(id != 1) return;		let user = acc.users[user_id(message.user)];    		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`);  		if(Number(message.$match[2]) == 1){			texts = 'включил' 			acc.users[message.$match[1]].admin.block_rep = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_rep = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Админ ${texts} Вам запрет на ответы на репорты.`
		}); 
		return message.send(` Вы ${texts}и запрет на ответ на репорты.`);
	});

 	vk.updates.hear(/^(?:команды)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`   
               @id${message.user} (${user.prefix}), Мои команды:

💻 Создать «название» - Создать канал
💾 Оборудование - Покупка оборудования
📞 Микрофон - Покупка микрофона для проведения стримов
📚 Инфо кнопки - Информация о ютуб кнопках
❓ Помощь - Краткая информация о боте
📈 Реклама - Реклама для вашего канал
🎬 Снять «название» - Снять видео
🔥 Канал - Статистика вашего канала
🔨 Работать - Работать на заводе
🎮 Стрим - Запустить стрим
🔝 Тренды - Тренды Ютуба
💸 Баланс - Узнать игровой баланс
🔒 Закрыть - Закрыть информацию о канале (недоступно)
🔓 Открыть - Открыть информацию о канале (недоступно)
💡 Узнать «название» - Узнать информацию о канале (недоступно)
			`);
	});

	vk.updates.hear(/^(?:инфо кнопки)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`   
               @id${message.user} (${user.prefix}), Информация о кнопках:
    Для получения серебрянной кнопки необходимо иметь 100000 подписчиков, введи - получить ск
    Для получения золотой кнопки необходимо иметь 1000000 подписчиков, введи - получить зк
    Для получения брилиантовой кнопки необходитмо иметь 10000000 подписчиков, введи - получить бк
			`);
	});
 


vk.updates.hear(/^(?:гулять)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
     let id = user_id(message.user)
	if(user.bloks.vivi == true) return message.send(`@id${message.user} (${user.prefix}), Гулять можно раз в 3 часа`);
 		user.bloks.vivi = true
		setTimeout(() => {
			user.bloks.vivi = false
			vk.api.call('messages.send', {
			peer_id: user.id,
			message: `@id${message.user} (${user.prefix}), Вы снова можете гулять!"` 
		});
		}, 10800000);
	let rez = [1,2].random();
	if(rez == 1){
  		let text = [].random(); 
          mones = rand(1000,4000);
       	user.balance += mones;
		return message.send(`@id${message.user} (${user.prefix}), Гуляя, вы нашли кошелек, в котором лежало ${spaces(mones)}$`);
   }
	if(rez == 2){
		let text = [].random(); 
		hmones = rand(2000,4000);
       	user.balance -= hmones;
		return message.send(`@id${message.user} (${user.prefix}), Гуляя на Вас напала банда хейтеров, на лечение Вы потратили: ${spaces(hmones)}$`);
	}
}); 
 
    	
vk.updates.hear(/^(?:restart)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`Вы не админ!`);
	acc.users.bloks.nik = false;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`перезагрузка...`);
	}else{ 
		let count = [].random();
		user.balance += count;
		return message.send(`перезагрузка...`);
	}
}); 


 
async function run() {
    await vk.updates.startPolling();
    console.log('Бот запущен! Развлекайтесь!');
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
 	
 
 
  	function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks.cases = false;
                    acc.users[i].bloks.orcase = false;
				acc.users[i].bloks.bcase = false;
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
							message: `Срок действия админки истек. Вы сняты с должности.`
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
}, 3500);