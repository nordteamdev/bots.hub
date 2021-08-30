const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
const Qiwi = require('node-qiwi-api').Qiwi;
var Wallet = new Qiwi('451df6418a80b51a042ccd31c51b1c18');
const https = require('https');
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
let giving = false;
const promo = require('./base/promo.json');
const botinfo = require('./base/botinfo.json');
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
			e = e.replace(/Infinity/g, '∞!');

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


// Подключение к ВК //
vk.setOptions({ token: '576c182f06f313867bfed9def6b78d2c384c87be8f841e4ba292e1e113acd9f0db9e95260d02210670fe4', pollingGroupId: 178414788 });
const { updates, snippets } = vk;
let user = new VK();
user.setOptions({
	token: 'd50f4cb93d63bf1721fed49c002a162230d86e189b94f5996dd2f734fa50b4411a4c00e06f13ed6939ba7'
});


// Эфириум, работы //

let eth = 1000;

let users = require('./base/users.json');
let buttons = [];

setTimeout(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/eth-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	eth = Math.floor(Number(rq.ticker.price));
}, 5);

setInterval(async () => {
	const rq = await request('https://api.cryptonator.com/api/ticker/eth-usd');

	if(!rq.ticker) return;
	if(!rq.ticker.price) return;

	eth = Math.floor(Number(rq.ticker.price));
}, 60000);


setInterval(async () => {
	await saveUsers();
	console.log('Save "Users.json"', '------------------------');
}, 30000);


setInterval(async () => {
	users.filter(x=> x.misc.farm !== 0).map(x=> {
		if(x.misc.farm === 1)
		{
			x.farm_eth += 5;
		}
		if(x.misc.farm === 2)
		{
			x.farm_eth += 10;
		}
		if(x.misc.farm === 3)
		{
			x.farm_eth += 100;
		}
		if(x.misc.farm === 4)
		{
			x.farm_eth += 250;
		}
		if(x.misc.farm === 5)
		{
			x.farm_eth += 500;
		}
		if(x.misc.farm === 6)
		{
			x.farm_eth += 900;
		}
		if(x.misc.farm === 7)
		{
			x.farm_eth += 1500;
		}
		if(x.misc.farm === 8)
		{
			x.farm_eth += 2000;
		}
		if(x.misc.farm === 9)
		{
			x.farm_eth += 4500;
		}
		if(x.misc.farm === 10)
		{
			x.farm_eth += 10000;
		}
	});
}, 3600000);

setInterval(async () => {
	users.map(user => {
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn;
		}
	});
}, 3600000);

function clearTemp()
{
	users.map(user => {
		user.timers.tm_bal = false;
		user.timers.worked = false;
		user.timers.tm_rat = false;
		user.timers.tm_eth = false;
		user.timers.bonus = false;
		user.timers.tm_lvl = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
	return true;
}
// Системная конфигурация //

vk.updates.on(['IsMember'], async (message, next) => {
	if(message.payload.action.member_id == message.senderId) return;
	let user = await vk.api.users.get({user_id: message.payload.action.member_id})

	return message.send(`!`);

		await next();
	});

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if (message.text) {
		message.user.floder += 1;
		botinfo.msg += 1;
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	if(message.user.exp >= 100)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`ID: ${message.user.uid} [${message.text}]`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
// Образец данных пользователя //
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club178414788\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club178414788\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			uid: users.length
			regdat: {
				id: message.senderId,
				realname: user_info.first_name,
				realfam: user_info.last_name,
				},
			balance: 50,
			rub: 0,
			eth: 0,
			farm_eth: 0,
			farm_up: 0,
			bank: 0,
			biz: 0,
			rating: 0,
			reputation: 0,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			timers: {
				worked: false,
				bonus: false,
				tm_bal: false,
				tm_eth: false,
				tm_lvl: false,
				tm_rat: false,
				},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			level: 1,
			right: 1,
			foolder: 0,
			floder: 0,
			transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				helicopter: 0
				},
			realty: {
				home: 0,
				apartment: 0
				},
			misc: {
				phone: 0,
				farm: 0
				},
			marriage: {
				partner: 0,
				requests: []
				}
			w_war: {
				warns: 0,
         	   warn: 0,
				warn_p: `Не имеется`,
				}
			pets: {
				pet: 0,
				level: 0
				}
		});

await message.reply(`
⚡ Привет! [id${message.senderId}|${user_info.first_name} ${user_info.last_name}], будь как дома.

Рекомендуется прочитать все ссылки, что бы не возникло проблем.
Полезные ссылки
1. Свод команд
2. Свод правил
3. FAQ
4. Лицензионное соглашение

Если вы согласны с лицензионным соглашением и правилами игры, нажмите кнопку "Согласиться".
(Если у Вас не видно кнопок, напишите "Согласиться" или "Отказаться" в чат)
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
		}], 
[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"4\"}",
				"label": "Отказаться"
			},
				"color": "negative"
			}]
		]
			})
		});	
botinfo.people += 1;
}