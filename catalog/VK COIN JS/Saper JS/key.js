const { VK, Keyboard } = require('vk-io');
const VKCOINAPI = require('node-vkcoinapi');
const fs = require("fs");
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");

const vkcoin = new VKCOINAPI({ 
    key: '1',            // key coin 
    userId: 1,    // user id
    token: '1'    // user token
});

const vk = new VK({
	token: "1"    // group token
});

/*------------------------------------ [ Бот ] ------------------------------------------*/

vk.updates.on('message', (context, next) => {
	if(!uid[context.senderId]) {
		vk.api.call('users.get', {
			user_ids: context.senderId,
			fields: 'name,lastname,sex,photo_100'
		}).then(res => {
			let user = res[0];
			acc.number += 1;
			uid[context.senderId] = { id: acc.number };
			acc.users[acc.number] = {
				uid: context.senderId,
				name: user.first_name,
				coins: 0,
				games: {
					bet: {
						win: 0,
						bets: 0
					},
					keys: [],

					win: 0,
					lose: 0,
					winmoney: 0,
					losemoney: 0,
				},
				bonus: {
					group: 0,
					
					time:0,
					games:0
				},
				menu: 'none'
			};
			return context.send({
				message: `Добро пожаловать!`,
				keyboard: Keyboard.keyboard([
					Keyboard.textButton({ label: 'Пополнить баланс', payload: { command: 'пополнить баланс' }
					})
				])
			});
		}).catch((error) => {console.log('err[prefix]'); }); 
		return;
	}

	const { messagePayload } = context;
	context.state.command = messagePayload && messagePayload.command ? messagePayload.command : null;

	return next();
});

/*------------------------------------ [ Команды ] ------------------------------------------*/

vk.updates.hear(/^(начать|помощь|назад)$/i, async (context) => { StartMenu(context); });

async function StartMenu(context) {
	let UserID = user_id(context.senderId);
	if(acc.users[UserID].menu == "StartGame_in") { 
		acc.users[UserID].coins += acc.users[UserID].games.bet.win;

		acc.users[UserID].games.win += 1;
		acc.users[UserID].games.winmoney += parseInt(acc.users[UserID].games.bet.bets);

		acc.users[UserID].menu = "none";

		await context.send({
			message: `
				Ты забрал приз: ${acc.users[UserID].games.bet.win} (+${parseInt(acc.users[UserID].games.bet.win) - parseInt(acc.users[UserID].games.bet.bets)})
				Твой баланс: ${acc.users[UserID].coins} коинов
			`,
			keyboard: Keyboard.keyboard([
				Keyboard.textButton({ label: 'Начать игру' }),
				[
					Keyboard.textButton({ label: 'Пополнить баланс' }),
					Keyboard.textButton({ label: 'Вывести коины' })
				],
				[
					Keyboard.textButton({ label: 'Баланс' }),
					Keyboard.textButton({ label: 'Бонусы' })
				],
				Keyboard.textButton({ label: 'Топ игроков' }),
			])
		});
	}
	else if(acc.users[UserID].coins == 0) {
		await context.send({
			message: ` Твой баланс составляет 0 коинов, пополни баланс чтобы начать играть `,
			keyboard: Keyboard.keyboard([
				Keyboard.textButton({ label: 'Пополнить баланс' })
			])
		});
	} else {
		await context.send({
			message: `
				Ты вернулся в главное меню
			`,
			keyboard: Keyboard.keyboard([
				Keyboard.textButton({ label: 'Начать игру' }),
				[
					Keyboard.textButton({ label: 'Пополнить баланс' }),
					Keyboard.textButton({ label: 'Вывести коины' })
				],
				[
					Keyboard.textButton({ label: 'Баланс' }),
					Keyboard.textButton({ label: 'Бонусы' })
				],
				Keyboard.textButton({ label: 'Топ игроков' }),
			])
		});
	}
}

vk.updates.hear(/^начать игру$/i, async (context) => {
	let UserID = user_id(context.senderId);
	acc.users[UserID].menu = "StartGame_new";
	await context.send({
		message: `
			Чтобы начать игру отправь текстом сумму ставки
			(Например: 100)
		`,
		keyboard: Keyboard.keyboard([
			[
				Keyboard.textButton({ label: '50000' }),
				Keyboard.textButton({ label: '500000' }),
				Keyboard.textButton({ label: '1000000' }),
				Keyboard.textButton({ label: '10000000' })
			],
			[
				Keyboard.textButton({ label: '1000000' }),
				Keyboard.textButton({ label: `${Math.floor( acc.users[UserID].coins )}` }),
				Keyboard.textButton({ label: 'Назад' })
			],
		])
	});
});

vk.updates.hear(/^(\d+)$/i, async (context) => {
	let UserID = user_id(context.senderId);
	if(context.$match[1] < 1) return;
	if(acc.users[UserID].menu == "StartGame_new") {
		if(acc.users[UserID].coins < context.$match[1]){
			await context.send({
			message: `У вас недостаточно койнов на балансе`});
			return;
		}
		acc.users[UserID].games.bet = {
			win: context.$match[1],
			bets: context.$match[1]
		}
		acc.users[UserID].menu = "StartGame_in";
		acc.users[UserID].games.keys = [];
		acc.users[UserID].coins -= context.$match[1];
		acc.users[UserID].bonus.games += 1;

		await context.send({
			message: `Новая игра, выберите координаты где не заминировано`,
			keyboard: Keyboard.keyboard([
				[
					Keyboard.textButton({ label: `1` }),
					Keyboard.textButton({ label: `2` }),
					Keyboard.textButton({ label: `3` })
				],
				[
					Keyboard.textButton({ label: `4` }),
					Keyboard.textButton({ label: `5` }),
					Keyboard.textButton({ label: `6` })
				],
				[
					Keyboard.textButton({ label: `7` }),
					Keyboard.textButton({ label: `8` }),
					Keyboard.textButton({ label: `9` })
				]
			])
		});
	} else if(acc.users[UserID].menu == "StartGame_in") {
		console.log(`Игра начата`);
		console.log(acc.users[UserID].games.keys);

		if(random(1, 100) <= 40) { 
			acc.users[UserID].games.keys = [];
			acc.users[UserID].games.lose += 1;
			acc.users[UserID].games.losemoney += parseInt(acc.users[UserID].games.bet.bets);
			acc.users[UserID].games.bet = {
				win: 0,
				bets: 0
			};
			acc.users[UserID].menu = "none";
			StartMenu(context);
			context.send(`
				 💣Ты подорвался на мине.
				 баланс ${acc.users[UserID].coins} койнов !
			`);
			return;
		}
		acc.users[UserID].games.bet.win = parseInt(acc.users[UserID].games.bet.win) + (parseInt(acc.users[UserID].games.bet.win) * 20 / 100);
		console.log(acc.users[UserID].games.bet.win);
		acc.users[UserID].games.keys.push(context.$match[1]);
		var array = [[], [], []];
		for(var i = 1; i <= 9; i++) {
			console.log(acc.users[UserID].games.keys.indexOf(`${i}`));
			array[(i <= 3 && i > 0 ? 0 : (i <= 6 && i > 3 ? 1 : (i <= 9 && i > 6 ? 2 : 0)))].push(Keyboard.textButton({ label: ( acc.users[UserID].games.keys.indexOf(`${i}`) != -1 ? `Выбрано` : `${i}`) }))
		}
		
		await context.send({
			message: `
				✅ Успех! Мины тут нет.
				 +${parseInt(acc.users[UserID].games.bet.win) * 20 / 100} коинов 
				 Приз: ${acc.users[UserID].games.bet.win}
			`,
			keyboard: Keyboard.keyboard([
				[
					array[0][0],
					array[0][1],
					array[0][2]
				],
				[
					array[1][0],
					array[1][1],
					array[1][2]
				],
				[
					array[2][0],
					array[2][1],
					array[2][2]
				],
				Keyboard.textButton({ label: `Назад` })
			])
		});
	}
});

vk.updates.hear(/^топ игроков$/i, async (context) => {
	var tops = [], text = '', yo = [];
	for(var i = 1; i <= acc.number; i++) {
		tops.push({ 
			id: i, 
			name: acc.users[i].name, 
			uid: acc.users[i].uid, 
			winmoney: acc.users[i].games.winmoney, 
			win: acc.users[i].games.win 
		});
	}
	tops.sort(function(a, b) {
		if (b.winmoney > a.winmoney) return 1
		if (b.winmoney < a.winmoney) return -1
		return 0
	})
	for (var g = 0; g < (tops.length >= 10 ? 10:tops.length); g++) {
		let ups = g;
		ups += 1;
		if(g <= 8) ups = `${ups}&#8419;`
		if(g == 9) ups = `&#128287;`
		yo.push({
			id: i, 
			name: tops[g].name,
			uid: tops[g].uid, 
			winmoney: tops[g].winmoney, 
			win: tops[g].win,
			smile: `${ups}`
		})
	}
	var people = "👑 ТОП ИГРОКОВ 👑 \n" + yo.map(a => a.smile + ". [id" + a.uid + "|" + a.name + "] - " + a.winmoney + " (Игр: " + a.win + ") 👑").join("\n")
	text += `${people}\n\n`; 
	await context.send(text);
});

vk.updates.hear(/^пополнить баланс$/i, async (context) => {
	const link = vkcoin.api.getLink(20000000, false);
	await context.send(`
		Ссылка для пополнения: ${link}
		ПОСЛЕ ТОКО КАК ВЫ ПОПОЛНИЛИ НАПИШИ "НАЧАТЬ"!
	`);
});

vk.updates.hear(/^вывести коины$/i, async (context) => {
	let UserID = user_id(context.senderId);
	const paymentResult = await vkcoin.api.sendPayment(context.senderId, acc.users[UserID].coins * 1000);
	acc.users[UserID].coins = 0;
	await context.send(`Мы только что отправили тебе: ${paymentResult.response.amount / 1000} коинов`);
	//await context.send(`Мы только что отправили тебе: ${acc.users[UserID].coins} коинов`);
});

vk.updates.hear(/^баланс$/i, async (context) => {
	let UserID = user_id(context.senderId);
	const myBalance = await vkcoin.api.getMyBalance();
	await context.send(`

		Ваш баланс: ${acc.users[UserID].coins} коинов
	`);
});

vk.updates.hear(/^бонусы$/i, async (context) => {
	await context.send({
		message: `
			На данный момент у нас есть 2 типа бонусов:

			1. Бонус за подписку – 25 000 коинов. Получен ✅
			Чтобы получить бонус за подписку нужно подписаться на официальное сообщество бота Бот Сапёр и не отписываться в течение 1 часа.
			Если все условия будут соблюдены, то Вам автоматически начислится 25 000 коинов.

			2. Ежедневный бонус – до 100 000 коинов.
			Каждый день Вы можете получить от 1 000 до 100 000 коинов просто нажав на кнопку "Ежедневный бонус" в боте.
		`,
		keyboard: Keyboard.keyboard([
			[
				Keyboard.textButton({ label: 'Ежедневный бонус' }),
				Keyboard.textButton({ label: 'Назад' })
			]
		])
	});
});

vk.updates.hear(/^ежедневный бонус$/i, async (context) => {
	let UserID = user_id(context.senderId);
	var now = new Date();
	console.log(now.getTime());
	if(acc.users[UserID].bonus.time > now.getTime()) return context.send(`Еще не прошло 24 часа`);
	else if(acc.users[UserID].bonus.games < 10) { return context.send(`Тебе осталось сыграть игр, чтобы забрать бонус: ${10 - acc.users[UserID].bonus.games}`); }

	var money = random(1000, 100000);
	acc.users[UserID].coins = parseInt(acc.users[UserID].coins) + parseInt(money);
	acc.users[UserID].bonus.time = now.getTime() + 86400000;
	acc.users[UserID].bonus.games = 0;
	await context.send(`Бери свой бонус - ${money} :)`);
});

/*------------------------------------ [ Остальная дичь ] ------------------------------------------*/

function user_id(id) {
	let ids = 0
	if(uid[id]){
		ids = uid[id].id
	}    
	return ids; 
}

function random(x, y) {
	return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}

setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"));
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"));
	console.log(`Сохранение прошло успешно!`);
}, 15000);

/*------------------------------------ [ Пулы ] ------------------------------------------*/

async function run() {
	await vk.updates.start().catch(console.error);
    await vkcoin.updates.startPolling(async(event) => {
	    vkcoin.updates.onTransfer((event) => {
		    const { amount, fromId, id } = event;
		    const score = vkcoin.api.formatCoins(amount);
		    console.log( `Поступил платёж (${id}) от https://vk.com/id${fromId} в размере ${score} коинов` );

		    let UserID = user_id(fromId);
		    acc.users[UserID].coins += (amount / 1000);
		    vk.api.messages.send({ // Используется vk-io в качестве примера
		        user_id: 524929279, // Тут ваш ID
		        message: `
					Баланс пополнен на ${amount / 1000} коинов
					Текущий баланс: ${acc.users[UserID].coins}
					TX ID: ${id}
				`,
				keyboard: Keyboard.keyboard([
					Keyboard.textButton({ label: 'Начать игру' }),
					[
						Keyboard.textButton({ label: 'Пополнить баланс' }),
						Keyboard.textButton({ label: 'Вывести коины' })
					],
					[
						Keyboard.textButton({ label: 'Баланс' }),
						Keyboard.textButton({ label: 'Бонусы' })
					],
					Keyboard.textButton({ label: 'Топ игроков' }),
				])
		    });

		    /* Тут можно выполнять свои действия */
		});

	    console.log(event);
	});
}

run().catch(console.error);


// fixed by @12kot3k