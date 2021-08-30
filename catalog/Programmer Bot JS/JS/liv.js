console.log('[Prog] started bot..');
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");

const bot_owner = 478493336;

const pks = [
	{
		name: 'Калькулятор',
		cost: 500,
		min: 10,
		max: 20,
		id: 1
	},
	{
		name: 'Телефон',
		cost: 1000,
		min: 10,
		max: 30,
		id: 2
	},
	{
		name: 'Телевизор',
		cost: 3000,
		min: 30,
		max: 90,
		id: 3
	},
	{
		name: 'Бабушкин_ноутбук',
		cost: 500,
		min: 90,
		max: 200,
		id: 4
	},
	{
		name: 'Ноутбук',
		cost: 20000,
		min: 200,
		max: 500,
		id: 5
	},
	{
		name: 'Компьютер',
		cost: 100000,
		min: 1000,
		max: 2000,
		id: 6
	},
	{
		name: 'Микроволновка',
		cost: 500000,
		min: 5000,
		max: 20000,
		id: 7
	}
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



let btc = 6000;

let users = require('./users.json');
let buttons = [];

setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/btc-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	btc = Math.floor(Number(rq.ticker.price));
}, 60000);

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 30000);



setInterval(async () => {
	users.map(user => {
		for(var i = 0; i < user.business.length; i++)
		{
			const biz = businesses[user.business[i].id - 1][user.business[i].upgrade - 1];
			user.business[i].moneys += Math.floor(biz.earn / biz.workers * user.business[i].workers)
		}
	});
}, 3600000);

function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.bonus = false;
   user.timers.text = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: '52e6e3611f150c6f904eefbc098acd43e5a54006213fedcc88f57f98cfc414faea104f72a89070b46dc30', pollingGroupId: 188352532 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public179803283  \|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public179803283  \|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			admin: false,
            vip: false,
            pk: 0,
			balance: 1000,
			nc: 0,
		    dc: 0,
           admins: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			timers: {
				hasWorked: false,
				bonus: false,
       text: false
			},
			tag: user_info.first_name,
			blocked: false

		});
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Executed: ${message.text}`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

//ЮЗЕР
cmd.hear(/^(?:Помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Теперь ты программист. Твоя задача: выполнять заказы, и оставлять клиентов довольными! Свою рупутацию ты можешь посмотреть с помощью команды «профиль» 💿

  📱 Для начала купи свое первое устройство. Сделать это можно в магазине (команда: «магазин»). Подзаработать денег можно с помощью команды «работать» 😃

  📕 После этого можешь приступить к работе! Пиши и продавай свои программы. Сделать это можно с помощью команды «написать» 😎

Все мои команды , сможешь узнать введя «команды»😉`);
});
cmd.hear(/^(?:Команды)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Мои команды:
📗 » Ник - поменять ник.
💰 » Баланс - просмотр баланса.
💩 » Профиль - просмотр профиля.
👑 » Магазин - покупка оборудования.
✏  » Написать - написать и продать программу.
⌨️ » Работать - работать.
💎 » Казино - казино.
🔃 » Передать - передать деньги.
🙇 » Беседа - ссылка на беседу с ботом.
🗃️ » Бонус - Ежедневный бонус.
❓ » Помощь - помощь по боту.`);
});

cmd.hear(/^(?:профиль)$/i, async (message, bot) => {
	return bot(`твой профиль:

✏️ UID: ${message.user.uid}
👍 Довольных клиентов: ${message.user.dc}
👎 Недовольных клиентов: ${message.user.nc}
💰 Баланс: ${message.user.balance}`
    );
});  

cmd.hear(/^(?:баланс|balance|money|деньги)$/i, async (message, bot) => {
	return bot(`На руках: ${message.user.balance}$💰`
    );
});  
cmd.hear(/^(?:работать)$/i, async (message, bot) => {


	if(message.user.timers.hasWorked) return bot(`Вы уже хорошо поработали.\nОтдохни 2 минуты..😘`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 86400000);

	message.user.timers.hasWorked = true;

	const earn = utils.random(10, 25);

	message.user.balance += earn;


	return bot(`рабочий день закончен😘
\nВы заработали ${utils.sp(earn)}$`);
});

cmd.hear(/^(?:бонус)$/i, async (message, bot) => {


	if(message.user.timers.hasWorked) return bot(`Похоже вы уже получили бонус.\nДавай ты заберёшь свой бонус ещё раз, через 24 часа ?😘`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 120000);

	message.user.timers.hasWorked = true;

	const earn = utils.random(500, 1500);

	message.user.balance += earn;

	return bot(`Вы активировали бонус и нашли ${utils.sp(earn)}$❗`);
});

cmd.hear(/^(?:магазин|shop)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Список устройств:

1. ⌨️ Калькулятор
 Цена: 500$
 Заработок с одного заказа: 10-20$

2.📱 Телефон
  Цена: 1.000$
  Заработок с одного заказа: 10-30$

 3.📺 Телевизор
  Цена: 3.000$
  Заработок с одного заказа: 30-90$

4. 📟 Бабушкин_ноутбук
  Цена: 5.000$
  Заработок с одного заказа: 90-200$

5. 💻 Ноутбук
  Цена: 20.000$
  Заработок с одного заказа: 200-500$

6. ⌨ Компьютер
  Цена: 100.000$
  Заработок с одного заказа: 1.000-2.000$

7. 📺 Микроволновка
  Цена: 500.000$
  Заработок с одного заказа: 5.000-20.000$

💰 Для покупки введи: магазин <цифра товара>

❌ Не хватает денег? Пиши «работать»`);

const sell = pks.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.pk) return bot(`У Вас уже есть оборудование.\n📗Чтобы продать "Продать устройство"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.pk = sell.id;

		return bot(`Вы успешно купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Написать)$/i, async (message, bot) => {
	if(!message.user.pk) return bot(`У тебя нет оборудования! Купить его можно в магазине. 📌`);
	if(message.user.timers.text) return bot(`Писать программу можно раз в минуту. Отдохни!`);

	setTimeout(() => {
		message.user.timers.text = false;
	}, 60000);

	message.user.timers.text = true;

 const pk = pks.find(x=> x.id === message.user.pk);
	const earn = utils.random(pk.min, pk.max);
	if(utils.random(0, 150) < 75)
	{
		message.user.balance += earn;
   message.user.dc += 1;
		bot(`Ты написал программу, и она порадовала клиента! 📰
Ты заработал: ${utils.sp(earn)}$`);
	}
	else
	{
		message.user.nc += 1;
		bot(`Ты написал программу, и она не очень порадовала клиента! 💸
`);
	}
});


cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;

	if(message.args[2] > message.user.balance) return bot(`У вас нет столько денег!\n
💰 Ваш Баланс: ${utils.sp(message.user.balance)}$`);
	else if(message.args[2] <= message.user.balance)
	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`Игрок не найден!`);

		if(user.uid === message.user.uid) return bot(`Иголк не найден!`);

		message.user.balance -= message.args[2];
		user.balance += message.args[2];

		await bot(`Вы успешно передали игроку ${user.tag} » ${utils.sp(message.args[2])}$`);

	}
});



//Игры

cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`У Вас нет столько денег!`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([2, 0, 0.5, 0, 2, 0.5]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас` : `${multiply < 1 ? `вы проиграли ${utils.sp(message.args[1] * multiply)}$` : `вы выиграли ${utils.sp(message.args[1] * multiply)}$`}`}
		💰 Баланс: ${utils.sp(message.user.balance)}$`);
	}
});



cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {
	if(message.args[1].length >= 16) return bot(`Длина Ника не должен превышать 16 букв.`);

	message.user.tag = message.args[1];
	return bot(`успешно.`);
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	if(message.isChat) return bot(`Увы, но команда работает только в ЛС сообщества!`);

	vk.api.messages.send({ user_id: 478493336, forward_messages: message.id, message: `Player id: ${message.user.uid}` }).then(() => {
		return bot(`Репорт отправлен.`);
	}).catch((err) => {
		return bot(`Чтото пошло не так.`);
	});
});

//админ
cmd.hear(/^(?:накрути)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
if(message.user.admin == false) return;
	if(message.args[2] <= 0) return;

	{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`Игрок не найден!`);
		if(user.uid === message.user.uid) return bot(`Игрок не найден!`);
		message.user.balance += Number(message.args[1])
		await bot(`Вы успешно выдали игроку ${user.tag} ${utils.sp(message.args[2])}$`);
	}
});

cmd.hear(/^(?:рес)$/i, async (message, bot) => {
	if(message.senderId !== 478493336) return;
	await bot(`бот уходит в перезагрузку.`);

	await saveUsers();
	process.exit(-1);
});

cmd.hear(/^(?:рассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
	if(message.user.admin == false) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `${message.args[1]}` });
        }
        return message.send(`📣 Рассылочка\n\n"${message.args[1]}"`);
 
})

cmd.hear(/^(?:пострассылка)\s([^]+)$/i, async (message, bot) => {
message.user.foolder += 1;
	if(message.user.admin == false) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `тест:`, attachment: `${message.args[1]}`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `📣 Рассылочка:`,
              attachment: `${message.args[1]}` });
        }
        return message.send(`Успешно.`);
 
})

cmd.hear(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
		if(message.user.admin == false) return;
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	vk.api.messages.send({ user_id: user.id, message: `Ответ на репорт`
	${message.args[2]}` });
});


//Ссылки
cmd.hear(/^(?:Беседа)$/i, async (message, bot) => {
	return bot(`\n1. https://vk.me/join/AJQ1d/Qw5QwiVXAhbPqe2HrF`
    );
});  

//Х
