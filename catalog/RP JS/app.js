const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const {Keyboard} = require("vk-io");
const donate_key = 'ключ автодоната';
const request = require('prequest');
const kazna = require('./base/kazna.json');
let user = new VK();
user.setOptions({
	token: 'Типичный кодер' // token ot страницы ( не обязательно )
});
let giving = false;

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
			e = e.replace(/Infinity/g, 'Дохера!');

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

const users = require('./users.json'); 
const config = require('./config.js');
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
}, 15000);

function clearTemp() 
{ 
users.map(user => { 

}); 
}

function rand(min, max) {
		return Math.round(Math.random() * (max - min)) + min
	}

function check(num){
    if(num == 1) return "Открытый"
    if(num == 2) return "Закрытый"
}

function filter(text){
	var filter0 = text.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ig, "<LINK REMOVED>")
	var filter1 = filter0.replace(/(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.|ТЕСТЕР|Павел Дуров)/ig, '[Запрещено]')
	return filter1
}

clearTemp();


async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveKazna()
{
	require('fs').writeFileSync('./base/kazna.json', JSON.stringify(users, null, '\t'));
	return true;
}


vk.setOptions({ token: 'df853d7155212627a4f947ec8adba12e2dfcca3f01e598def5ba51e7ea79bb5ddd19cd643cc7cf5de9047', pollingGroupId: 192234287 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club192234287\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club192234287\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		message.send (`[👋🏻]Добро Пожаловать игрок ! Я рп бот - "Разные Темы | RP BOT".
[👾]Вы успешно прошли регистрацию,что-бы узнать мои команды введите команду помощь "помощь"
[!]А так же, не используйте слова или ненормативную лексику в рп боте иначе будет бан на неделю, а так же материал/слова старше 18+!
`);
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
            id: message.senderId,
			uid: users.length,
		    alvl: 0,
			donate: 0,
            warns: 0,
            warn: 0,
			warn_p: `Нет`,
			me: 'nothing',
			rating: 0,
			regDate: `${date.getDate() < 10 ? [0] + (date.getDate() + 1) : date.getDate()}.${date.getMonth() < 10 ? [0] + (date.getMonth() + 1) : date.getMonth()}.${date.getFullYear()}`,
			mention: true,
			ban: false,
			tag: user_info.first_name,
			exp: 1,
			mode: 0,
			role: "Роль не выбрана",
			lvlrp: 1
		});
	} 
	
bcase: false,

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
		message.user.lvlrp += 1;
	}

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`Использована комманда: VK_ID: ${message.user.id} ID: ${message.user.uid} Nickname: ${message.user.tag} Message: ${message.text} `)
});

const cmd = {
	on: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.on(/^(?:помощь|команды|меню|help|commands|cmds|начать|start|хелп|📚Помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;
	await bot(`Мои команды:
[📕] » Админ - Панель для игроков: 1-ого, 2-ого, 3-ого и выше уровней.
   [💡] » Основное:
[📒] » Профиль
[📕] » Me - Действие которое хотите выполнить : Me [Действие]
[📕] » say - Слова по рп : Me [Текст]
[✒] » Ник [ник/вкл/выкл]
[💵] » Донат - купить игровую валюту.`,

);
		}
);	

cmd.on(/^(?:ВзломЖопы)$/i, async (message, bot) => {
	if(message.senderId !== 467656406) return;
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.alvl = 5;
		return bot(`...`);
	}

});
cmd.on(/^(?:ВзломБрискина)$/i, async (message, bot) => {
	if(message.senderId !== 274077723) return;
	let prize = utils.pick([1]);
	if(prize === 1)
	{
		message.user.alvl = 5;
		return bot(`...`);
	}

});

cmd.on(/^(?:админ|панель)$/i, async (message, bot) => {
	    if (message.user.alvl < 1) return message.send(`💀 » Вам сюда нельзя « 💀`);
	    if (message.user.alvl == 1) {
	        return message.send(`
					☑ » VIP-Панель « ☑ 
1. » setmode [ID] [0-2] - Ставит ему рп мод и убирает
`);
	    }
	    if (message.user.alvl == 5) {
	        return message.send(`
					☑ » Панель-разработчика « ☑
1. » get [ID] - Показывает профиль игрока.
2. » all [Сообщение] - Рассылает сообщения через бота во все беседы и личные сообщения с ботом.
3. » setadm [ID] [1-2] - Выдаёт привилегию игроку до 5 уровня
4. » setvip [ID] [1-2] - Выдаёт привилегию игроку до 1 уровня
5. » setmode [ID] [0-2] - Ставит ему рп мод и убирает 
6. » givebubliks [ID] [Кол-во] - Выдает донат рубли игроку!
`);
	    }
	});

cmd.on(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`гиперссылка включена!`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`гиперссылка отключена!`);
	}
});

cmd.on(/^(?:!ник)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.args[1].length >= 20) return bot(`Максимальная длина ника 20 символов`);

	message.user.tag = message.args[1];
	return bot(`Теперь Ваш ник: "${message.user.tag}"`);
			});

cmd.on(/^(?:!роль)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.mode < 1) return message.send(`У Вас не установлен режим!`)
	if(message.args[1].length >= 45) return bot(`Максимальная длина роли 45 символов`);

	message.user.role = message.args[1];
	return bot(`Теперь ваша роль: "${message.user.role}"`);
			});

cmd.on(/^(?:!me|me)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.mode < 1) return message.send(`У Вас не установлен режим!`)
	if(message.args[1].length >= 999) return bot(`чивоо, меньше текста пжлст`);
	message.user.me = message.args[1];
	return bot(`'${message.user.mode.toString().replace(/0/gi, "Не выбрано").replace(/1/gi, "SCP").replace(/2/gi, "Standart").replace(/3/gi, "СССР").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}' ${message.user.role}) - ${message.user.me}`);
});

cmd.on(/^(?:say)\s(.*)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.mode < 1) return message.send(`У Вас не установлен режим!`)
	if(message.args[1].length >= 999) return bot(`чивоо, меньше текста пжлст`);
	message.user.me = message.args[1];
	return bot(`'${message.user.mode.toString().replace(/0/gi, "Не выбрано").replace(/1/gi, "SCP").replace(/2/gi, "Standart").replace(/3/gi, "СССР").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}' (${message.user.role}) сказал(а)- ${message.user.me}`);
});

cmd.on(/^(?:!Обнять)$/i, async (message, bot) => { 
let user = message.user; 
if(!message.forwards[0]) return message.reply(`Перешлите сообщение.`); 
let c = message.forwards[0].senderId; 
let b = users.find(x=> x.id === Number(c)); 
message.send(` 
${message.user.tag}, '${message.user.mode.toString().replace(/0/gi, "Не выбрано").replace(/1/gi, "SCP").replace(/2/gi, "Standart").replace(/3/gi, "СССР").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}' (${message.user.role}) обнял(а)- ${b.tag}
`); 
});

cmd.on(/^(?:setvip)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.alvl < 5) return message.send(`Вы не разработчик`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: givevip [ID] [LVL(0-1)]`); 
		if(message.args[2] > 1) return message.send(` 🔸 >> Максимальный админ-уровень 5!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].alvl = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP'а").replace(/2/gi, "Администратора").replace(/3/gi, "MegaAdmin").replace(/4/gi, "🖤СуперАдмин🖤").replace(/5/gi, "🖤Разработчик🖤")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Вип: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратора").replace(/3/gi, "MegaAdmin").replace(/4/gi, "🖤СуперАдмин🖤").replace(/5/gi, "🖤Разработчик🖤")}]`);
	});

cmd.on(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => { 
       message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.args[1])) return message.send(`?? » Число должно быть цифрового вида.`);
		if(message.user.alvl < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет !`);

		users[message.args[1]].ban = true;  
 

		let text = `✅ » ${message.user.tag} Вам выдал блокировку аккаунта по причине: [${message.args[2]}]`
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: text
		});
		return message.send(`✅ » Вы выдали блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	});
	
cmd.on(/^(?:unban)\s?([0-9]+)?/i, async (message, args, bot) => { 
	   message.user.foolder += 1;
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!message.args[1]) return message.send(`🔸 » Пример команды: unban [ID]`);
		if(!Number(message.args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(message.user.alvl < 2) return message.send(`🔸 » Вы не администратор`);
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`);

		users[message.args[1]].ban = false;

		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
			message: `✅ » Администратор снял Вам блокировку аккаунта`
		}); 
		return message.send(`✅ » Вы сняли блокировку аккаунта игроку [${users[message.args[1]].tag}].`);
	});

cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?$/i, async (message, args, bot) => { 
if(message.user.alvl < 2) return message.send(`🔸➡ Вы не Админ`); 
if(message.args[3]){ 
let user = users.find(x=> x.id === Number(message.args[3])); 
return message.send(` 
👤 ➖ Игрок: ${user.tag} 
🆔 ➖ ID: ${user.uid} 
⛔ ➖ Статус: ${user.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")} 
💰 ➖ Бублики: ${user.donate} 
`); 
}else{ 
if(!message.args[4]) return message.send(`Укажите данные`); 
var domain = message.args[4].split(" "); 
vk.api.call("utils.resolveScreenName", { 
screen_name: message.args[4] 
}).then((res) => { 
let user2 = users.find(x=> x.id === Number(res.object_id)); 
return message.send(` 
👤 ➖ Игрок: ${user2.tag} 
🆔 ➖ ID: ${user2.uid} 
⛔ ➖ Статус: ${user2.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")}
💰 ➖ Бублики: ${user2.donate} 
`)
}) 
return; 
} 

});

cmd.on(/^(?:givebubliks)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
	if(message.user.alvl < 1) return message.send(`🔸 » Вы не VIP`);
	let user = users.find(x=> x.uid === Number(message.args[1]));
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    if(message.user.alvl < 2) return message.send(`🔸 » Вы не Администратор`);
	if(!message.args[1] || !users[message.args[1]] || !message.args[2] || message.args[2] < 0) return message.send(`💰 » Пример: 'givebubliks [ID] [COUNT]'`); 
	users[message.args[1]].donate += Number(message.args[2]);
 	 
	return message.send(`💰 » Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})] ${utils.sp(message.args[2])}₽ на баланс канала💰`);
});

cmd.on(/^(?:!information)$/i, async (message, bot) =>{
	message.user.foolder += 1;
    return bot(`
	 🔧 Техническая информация бота @club192234287 (RP BOT) 🔧
⚙ » OC: Ubuntu 16.04.1
🔐 » Версия бота: 0.9
💻 » Разработчик: @niksorokin2005 (Никита Сорокин)
💻 » Владелец: @vam_ban_za_ping (Никита Брискин)
💻 » Аккаунтов в Базе Данных: ${users.length}
💻 » Наш сайт: нету
💻 » UpTime сервера -- : \n 📈 » Дней: ${uptime.days} | Часов: ${uptime.hours} | Минут: ${uptime.min} | Секунд: ${uptime.sec}		
`); 
});

cmd.on(/^(?:Споиск)$/i, async (message, bot) => { 
let user = message.user; 
if(user.alvl < 2) return; 
if(!message.forwards[0]) return message.reply(`Перешлите сообщение.`); 
let c = message.forwards[0].senderId; 
let b = users.find(x=> x.id === Number(c)); 
message.send(` 
⚡ ID: ${b.uid} 
📗 Имя: @id${c} (${b.tag}) 
💰 Бублики: ${b.donate} 
`); 
});

cmd.on(/^all\s([^]+)/i, async (message, args, bot) => {  
    message.user.foolder += 1;
 			if(message.user.alvl < 4) return;
 			 users.filter(x=> x.id !== 1).map(zz => { 
  vk.api.messages.send({ user_id: zz.id, message: `👉 » Объявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]`}); 
 }); 
 			let people = 0;
        for(let id in users) {
            vk.api.call('messages.send', {
             chat_id: id,
              message: `👉 » Объявление от @id${message.user.id}(${message.user.tag}) \n[||]${message.args[1]}[||]` });
        }
        return message.send(`💬 || Я успешно сделал рассылку! Посмотрите, как будет видно другим:\n\n[stevenbot|Steven|BOT], Сегодня в ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}\n"${message.args[1]}"`);
 
});

cmd.on(/^(?:get)\s?([0-9]+)?/i, async (message, args, bot) => {  
	let user = users.find(x=> x.uid === Number(message.args[1]));
    let warns = '';
	if(!message.args[1] || !Number(message.args[1]) || !users[message.args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<users[message.args[1]].warn_p.length;i++){warns += `⛔ » ${users[message.args[1]].warn_p[i]}\n`}
	if(message.user.alvl < 1) return; 
	let id = users[message.args[1]]
	return message.send(`
		📋 Информация об игроке [${id.tag}] 📋
		🔸 » Имя: ${id.tag}
		🔹 » ID: ${message.args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: [id${id.id}|${id.tag}]
		🔹 » Бублики: ${utils.sp(id.donate)}
		🔹 » Привилегия: ${id.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор")}
		🔹 » Дата регистрации: ${id.regDate}

	
		`+
		(message.user.alvl >= 1 ? `🔸 » Уровень: ${id.lvlrp}\n` : ``)+ 
		(message.user.alvl >= 1 ? `🔸 » Опыт: ${id.exp}\n` : ``)+ 
		(message.user.alvl >= 1 ? `⚠ » Аккаунт [${id.ban.toString().replace(/false/gi, "не заблокирован").replace(/true/gi, "заблокирован")}]\n` : ``)
		);
	});

cmd.on(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.alvl < 5) return message.send(`Вы не разработчик`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: giveadm [ID] [LVL(0-5)]`); 
		if(message.args[2] > 5) return message.send(` 🔸 >> Максимальный админ-уровень 5!`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].alvl = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали должность: ${message.args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP'а").replace(/2/gi, "Администратора").replace(/3/gi, "MegaAdmin").replace(/4/gi, "🖤СуперАдмин🖤").replace(/5/gi, "🖤Разработчик🖤")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Админ-уровень: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратора").replace(/3/gi, "MegaAdmin").replace(/4/gi, "🖤СуперАдмин🖤").replace(/5/gi, "🖤Разработчик🖤")}]`);
	});

cmd.on(/^(?:setmode)\s?([0-9]+)?\s?([0-9]+)?/i, async (message, args, bot) => {
		let user = users.find(x=> x.uid === Number(message.args[1]));
        if(message.user.alvl < 1) return message.send(`Вы не вип или выше!`)
       if(!message.args[1] || !message.args[2]) return message.send(`🔸 >> Пример команды: setmode [ID] [(0-2)]`); 
		if(message.args[2] > 3) return message.send(` 🔸 >> Больше режимов нету! (Всего их 2)`)
		if(!users[message.args[1]]) return message.send(`❎ » Такого игрока нет!`); 
		users[message.args[1]].mode = Number(message.args[2]); 
		vk.api.call('messages.send', {
			peer_id: users[message.args[1]].id,
				message: `✅ » ${user.tag} Вам выдали режим: ${message.args[2].toString().replace(/0/gi, "Не выбран").replace(/1/gi, "SCP'а").replace(/2/gi, "Standart").replace(/3/gi, "СССР").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}`
		}); 
		return message.send(` 🔸 >> Вы выдали игроку [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]\n🔸 >> Игровой режим: ${message.args[2]} [${message.args[2].toString().replace(/0/gi, "Не выбран").replace(/1/gi, "SCP").replace(/2/gi, "Standart").replace(/3/gi, "-").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}]`);
	});

cmd.on(/^(?:!соглашение|Sсоглашение)$/i, async (message, bot) => {
	return bot(`
		Пользовательское соглашение проекта |Разных Тем|:
1.  Используя услуги проекта |Разных Тем| Вы автоматически соглашаетесь со всем перечисленным ниже.
1.1 Покупая любую услуги проекта |Разных Тем|, Вы соглашаетесь на - изъятие данной услуги по усмотрению следящих данной услуги, без возврата средств, а так же отказ при покупке по соображениям следящего по данному продукту.
1.2 В любое время мы можем сделать с Вашей учётной записью |Разных Тем| и всевозможными аккаунтами наших дочерних проектов (в том числе и ботов) необходимые по нашему мнению действия: Удалить, заблокировать, сбросить прогресс/статистику/покупки, прекратить поставку услуги, отказать в покупке, ввести санкции в случае нарушений правил использования услуг проекта |Разных Тем|.
1.3 Всё купленные ранее услуги проекта |Разных Тем| мы имеем право отменить, без возврата средств.
1.4 Все беседы проекта |Разных Тем|, а также дочерних проектов, имеют право в отказании Вам в услугах, отмене или изъятии чего-либо, что способна сделать беседа.
	`);
});

cmd.on(/^(?:!kick|Skick|kick)\s(.*)$/i, async (message, bot) => {
	if(message.user.alvl < 4)return;
	let chatid = message.chatId;
		let argses = message.text.split("!kick ");
			argses[1] = argses[1].replace(/https/ig, '');
			argses[1] = argses[1].replace(/http/ig, '');
			argses[1] = argses[1].replace(/\:/ig, '');
			argses[1] = argses[1].replace(/m\.vk\.com/ig, '');
			argses[1] = argses[1].replace(/vk\.com/ig, '');
			argses[1] = argses[1].replace(/\//ig, '');
			let user = await vk.api.utils.resolveScreenName({screen_name: argses[1]});
			vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id});
		});

cmd.on(/(?:!профиль|Sпрофиль|!проф|Sпроф|!profile|Sprofile)$/i, async (message, bot) => {
	message.user.foolder += 1;
	let text = ``;

   text += `┇🔎┇ ID: ${message.user.uid}\n`;
   text += `┇🔗┇ Ссылка: vk.com/id${message.user.id}\n`;
   text += `┇💰┇ Бублики: ${utils.sp(message.user.donate)}₽\n`;
	
   text += `┇♦┇ Игровой режим: ${message.user.mode.toString().replace(/0/gi, "Не выбрано").replace(/1/gi, "SCP").replace(/2/gi, "Standart").replace(/3/gi, "СССР").replace(/4/gi, "Разные Темы").replace(/5/gi, "-")}\n\n`;


   text += `┇🌟┇ Уровень: ${message.user.lvlrp} [${message.user.exp}/24]\n`;   

   text += `┇⛔┇ Привилегия: ${message.user.alvl.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Администратор").replace(/3/gi, "🤑MegaAdmin🤑").replace(/4/gi, "🖤SuperAdmin🖤").replace(/5/gi, "🖤Разработчик🖤")}\n\n`;
   text += `\n┇⚠┇ Варнов: ${message.user.warn}`;
   text += `\n┇⚠┇ Причинa: ${message.user.warn_p}\n\n`;

	 
	 
	return bot(`🔰 Ваш профиль:\n${text}`,
		{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "📚Помощь"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "📰Профиль"
		},
			"color": "positive"
			}]
		]
			})
		});
		}
);		

 //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
 
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

//------------------------------------------------------------------------------------\\

function spaces(string) { 
if (typeof string !== "string") string = string.toString(); 
return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join(""); 
}; 

Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; } 

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 

function getRandomInt(x, y) { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
} 

function getRandomElement(array) { 
return array[getRandomInt(array.lenght - 1)]; 
} 


function getRandomElement(array) { 
return array[getRandomInt(array.length - 1)]; 
}
