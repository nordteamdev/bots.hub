const { VK } = require('vk-io');
const mysql = require('mysql');
const vk = new VK();

var bot = {
	users:{},
	mysql:{
		db:null,
		connect:function(){
			bot.mysql.db = mysql.createPool({
				host: 'localhost',
				user: 'bot',
				password: 'vfrcbv225',
				database: 'bot',
				charset: 'utf8_bin',
				connectionLimit: 100
			});
			bot.mysql.db.getConnection(function(err, connection) {
			  if (err) { return console.error(`Ошибка с подключением к бд`, err); }
			  else { bot.mysql.load(); }
			  	            console.log(`К бд подключен`);

			});
		},
		load:function(){ 
			bot.mysql.db.query('SELECT * FROM `users`', function(err,result){ //загрузка настроек чатов
				if(err) return console.log('[MYSQL] Ошибка при загрузке аккаунтов!', err);
				if(!result || !result[0]) return;
				var time = new Date();
				for(var i = 0; i < result.length; i++) {
					bot.users[result[i].uid] = result[i];
				}
			});
		},
	}
}

bot.mysql.connect();
vk.setOptions({ token: '68363a050f24ee48d4e271d90fcd963c2829774b9fc2b91b16b0066411b751786e0e851c006dabdaf5891', pollingGroupId: '186813523', });
const { updates } = vk;

updates.use(async (context, next) => {
	if(context.type === 'message' && context.isOutbox) { return; }
	if(!bot.users[context.senderId]) {
		vk.api.call('users.get', {
			user_ids: context.senderId,
			fields: 'name,lastname,sex,photo_100'
		}).then(res => {
			let user = res[0];
			bot.users[context.senderId] = {
				id: (Object.keys(bot.users).length + 1),
				uid: context.senderId,
				name: user.first_name,
				surname: user.last_name,
				money: 500,
				admin: 0
			}; 
			bot.mysql.db.query('INSERT IGNORE INTO `users` (`uid`,`name`,`money`,`admin`) VALUES (?,?,500,?)', [context.senderId, user.first_name, 0])
			return context.send(`[id${context.senderId}|${bot.users[context.senderId].name}], вы успешно зарегистрировались!\nВведите "Помощь", чтобы узнать список команд!`);
		}).catch((error) => {console.log('err[prefix]'); }); 
		return;
	}
	if (/\[club186813523\|(.*)\]/i.test(context.text)) { context.text = context.text.replace(/\[club186813523\|(.*)\]/ig, '').trim(); } 
	
	try { await next(); } 
	catch (error) {
		if(!bot.users[context.senderId]) return; 
		else console.error('Error:', error);
	} 
});
updates.hear(/^(?:тест)$/i, async (context) => { 
	context.send(`Выберите действие:`,
				{
					keyboard:JSON.stringify(
				{
					"one_time": false,
					"buttons": [
					[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "тест"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "тест"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "тест"
				},
					"color": "positive"
				}],
				[{
						"action": {
						"type": "text",
						"payload": "{\"button\": \"1\"}",
						"label": "тест"
				},
					"color": "positive"
				}]
				]
					})
				});
});

updates.hear(/^(?:Купить)\s?([^]+)?/i, context => {
context.send(`Заявка отправлена, ждите ответа!`);
for(i in bot.users){
if(bot.users[i].admin > 0){
vk.api.call('messages.send', {
user_id: acc.users[i].vk,
message: `Новый заказ: ${context.$match[1]}`
});
}
}
});

updates.hear(/^(?:имя)$/i, async (context) => {
	return context.send(`Дай-ка угадаю, тебя зовут - ${bot.users[context.senderId].name} ?

		`);
});
updates.hear(/^(?:статус)$/i, async (context) => {
	return context.send(`
 Твой статус: ${bot.users[context.senderId].admin.toString().replace(/0/gi, "Обычный").replace(/1/gi, "⚜Администратор")} 
		`);
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





















async function run() {
	await vk.updates.startPolling();
	            console.log(`Включен`);

}

run().catch(console.error);












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

	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;

	let text = ``;

	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";

	return text;
}

function generateKeyboard(array) {
	let kb = [];
	if(array.length > 40) return false;

	for (let i = 0; i < 10; i += 1) {
		if(!array.slice(i * 4, i * 4 + 4)[0]) break;
		kb.push(array.slice(i * 4, i * 4 + 4));
	}

	kb.map((arr) => {
		arr.map((button, i) => {
			arr[i] = Keyboard.textButton({ label: button });
		});
	});

	return Keyboard.keyboard(kb);
}