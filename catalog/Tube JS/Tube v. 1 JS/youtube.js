console.log('[ISI BOT] Loading bot. Bot by ISI BOT');
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');

const reklama = [
	{
		name: 'Старт',
		sub: 1000,
		cost: 15000,
		id: 1
	},
	{
		name: 'Нормал',
		sub: 5000,
		cost: 75000,
		id: 2
	},
	{
		name: 'Нормал',
		sub: 25000,
		cost: 750000,
		id: 3
	},
	{
		name: 'Мега',
		sub: 70000,
		cost: 1000000,
		id: 4
	},
	{
		name: 'Горох',
		sub: 140000,
		cost: 2000000,
		id: 5
	},
	{
		name: 'Сметанка',
		sub: 220000,
		cost: 3500000,
		id: 6
	},
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
	}
}

let btc = 6000;

let users = require('./users.json');
let buttons = [];

setInterval(async () => {
	await saveUsers();
	console.log('saved');
}, 30000);


function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.stream = false;
		user.timers.rec = false;
	});
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

vk.setOptions({ token: 'ТОКЕН VK', pollingGroupId: ID ГРУППЫ });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public176715957\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public176715957\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 0,
			part: false,
			kanal: false,
			nuk_kanal: false,
			info_locked: false,
			sub: 1,
			like: 0,
			dislike: 0,
			videos: 0,
			strike: 0,
			sm: 0,
			timers: {
			  hasWorked: false,
			  stream: false,
			  rec: false
		    },
			camera: false,
			microfon: false,
			heteri: 0,
			video: 0,
			comment: 0,
			tematika: false,
			but: false,
			admin: 0,
			tag: user_info.first_name,
			blocked: false

		});
	}

	message.user = users.find(x=> x.id === message.senderId);
    if(message.user.blocked) return;

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	console.log(`CMD: ${message.text}`)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:Помощь)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`❄ Прежде чем стать блогером, тебе нужно будет подкопить деньжат используя команду «Работать», ее ты можешь использовать раз в 10 минут.

⭕ Далее, тебе нужно будет приобрести оборудование для съемки командой «Оборудование», после этого, можешь создавать канал - создать «Название».

⭕ Для того, чтобы зарабатывать деньги с видео, нужно вступить в партнёрку, это ты можешь сделать когда на твоём канале будет более 10000 подписчиков

❗Помни, что нецензурная лексика в названии канала может привести к бану, после создания канала, снимай ролики - снять «название» и набирай популярность.

❗ Для вступления в партнёрку напиши «вступить в партнёрку», эту команду ты можешь использовать при достижении 10000 подписчиков.

❗ Для просмотра информации о своей партнёрки введи «моя партнёрка», для использования этой команды ты должен состоять в партнёрке

✅ Полный список команд ты можешь получить введя «Команды».

😋 Удачи!.`);
});

cmd.hear(/^(?:Команды)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Мои команды:

💻 Создать «название» - Создать канал
💻 Сменить название <название> - Меняет название канала
💾 Оборудование - Покупка оборудования
👭 Вступить в партнёрку - Вступаете в партнёрку
👭 Партнёрка - Показывает информацию о партнёрки
📞 Микрофон - Покупка микрофона для проведения стримов
🔝 Топ Просмотров - Лучшие каналы по просмотрам
📺 Тематика - Здесь Вы выбираете своё продвижение
💸 Передать - Передача денег
📚 Инфо кнопки - Информация о ютуб кнопках
❓ Помощь - Краткая информация о боте
📈 Реклама - Реклама для вашего канал
🎬 Снять «название» - Снять видео
🔥 Канал - Статистика вашего канала
🔨 Работать - Работать на заводе
🎮 Стрим - Запустить стрим
🔝 Тренды - Тренды Ютуба
💸 Баланс - Узнать игровой баланс
🎓 Админкмд - Команды администраторов
📊 Беседы - Показывает список бесед с ботом
📢 Репорт - Ошибки, пожелания, поддержка
🔒 Закрыть - Закрыть информацию о канале
🔓 Открыть - Открыть информацию о канале 
💡 Узнать «название» - Узнать информацию о канале`);
});

cmd.hear(/^(?:Админкмд)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Команды админа:
1. delluser - Удалить аккаунт(удаляется всё)
2. ban - Забанить игрока
3. unban - Разбанить игрока
4. strike - Выдать игроку страйк
5. unstrike - Удалить все страйки игроку

Вы можете купить администратора, для покупки напишите сюда: [itsslipiz|Ссылка]

**** Возможности будут постепенно увеличиваться ****`);
});

cmd.hear(/^(?:Беседы)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Список наших бесед:
1.Скоро тут будет беседа!`);
});

cmd.hear(/^(?:Инфо кнопки)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Привет! Тут информация о наших кнопках!

Хочешь получить серебрянную кнопку? Для этого тебе лишь нужно достигнуть отметки в 100000 подписчиков. Легко? Не думаю! Но если достиг, то пиши: получить ск
А вот тут уже ещё сложнее, для золотой кнопки тебе нужно достигнуть отметки в 1000000 подписчиков, это уже ещё сложнее. Достиг? Пиши: получить зк
Вот тут уже полный хардкор 😱, для бриллиантовой кнопки тебе нужно набрать 10 миллионов подписчиков. Набрал? 😎 Пиши: получить бк`);
});

cmd.hear(/^(?:Работать)$/i, async (message, bot) => {
	if(message.user.timers.hasWorked) return bot(`Работать можно раз в 10 минут`);
	let prize = utils.pick([1, 2, 3]);
	
		setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;
	
	if(prize === 1)
	{
		message.user.balance += 193;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 193$`);
	}

	if(prize === 2)
	{
		message.user.balance += 210;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 210$`);
	}

	if(prize === 3)
	{
		message.user.balance += 150;
		return bot(`Ухх, тяжелый был денёк😃!
💰Вы заработали: 150$`);
	}
});

cmd.hear(/^(?:репорт|реп|rep|жалоба)\s([^]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.isChat) return bot(`команда работает только в ЛС.`);

	vk.api.messages.send({ user_id: 271117338, forward_messages: message.id, message: `<<☐>> Чтобы отправить ответ пользователю, вы должны написать - Ответ ${message.user.uid} (Ваш ответ) <<☐>>` }).then(() => {
		return bot(`Вы успешно отправили жалобу.`);
	}).catch((err) => {
		return message.send(`☒ -> Отказ отправление репорта!
			
			⚠ >> Причина:
			Кажись, админ, который купил этого бота, не правильно настроил его.
			Вы можете написать НАСТОЯЩЕМУ администратору бота - [Станислав Семионов]`);
	});
});

cmd.hear(/^(?:Канал)$/i, async (message, bot) => {
	if(!message.user.kanal) return bot(`У вас нет канала`);
	if(!message.user.tematika) return bot(`У вас нет тематики`);
	
	return bot(`Вот информация о канале:
	📕 Название: ${message.user.nuk_kanal}
📺 Тематика: ${message.user.tematika}
😻 Подписчиков: ${message.user.sub}
🚫 Хейтеров: ${message.user.heteri}
👁 Просмотров: ${message.user.sm}
👍 Лайков: ${message.user.like}
👎 Дизлайков: ${message.user.dislike}
💬 Комментариев: ${message.user.comment}
🎥 Роликов: ${message.user.videos}
⛔ Страйки: ${message.user.strike}
Кнопки: ${message.user.but.toString().replace(/1/gi, "Серебрянная кнопка").replace(/2/gi, "Золотая кнопка").replace(/3/gi, "Брилиантовая кнопка")}`
    );
});  

cmd.hear(/^(?:Оборудование)$/i, async (message, bot) => {
	if(message.user.balance < 100) return bot(`недостаточно денег на оборудование!`);
	if(message.user.camera) return bot(`У вас уже есть камера`);
	let prize = utils.pick([1]);

	message.user.balance -= 100;
	
	if(prize === 1)
	{
		message.user.camera = true;
		return bot(`Вы купили камеру для съемок!`);
	}
});

cmd.hear(/^(?:Создать)\s(.*)$/i, async (message, bot) => {
	if(!message.user.camera) return bot(`Вы не купили оборудование!`)
	if(message.user.kanal) return bot(`У вас уже есть канал!`)
	if(message.user.tematika = false) return bot(`Для создания канала нужно выбрать тематику!`) 
	if(message.args[1].length >= 16) return bot(`максимальная длина канала 15 символов`);

	message.user.nuk_kanal = message.args[1];
	message.user.kanal = true
	return bot(`вы создали канал "${message.user.nuk_kanal}"`);
});

cmd.hear(/^(?:Сменить название)\s(.*)$/i, async (message, bot) => {
	if(!message.user.kanal) return bot(`У вас нет канала!`)
	if(message.args[1].length >= 16) return bot(`максимальная длина канала 15 символов`);

	message.user.nuk_kanal = message.args[1];
	return bot(`Вы сменили название канала на: ${message.user.nuk_kanal}`);
});

cmd.hear(/^(?:Стрим)$/i, async (message, bot) => {
	if(!message.user.microfon) return bot(`Для стрима нужен микрофон!`);
	if(message.user.timers.stream) return bot(`Стримить можно раз в минуту`);
	if(!message.user.kanal) return bot(`У вас нет канала!`)
		
	setTimeout(() => {
		message.user.timers.stream = false;
		return bot(`Вы можете стримить!`);
	}, 60000);
	
	message.user.timers.stream = true;

	if(message.user.part == false){
	var cashlvlbiz = message.user.sub * 2;
	message.user.balance += cashlvlbiz;
	
	return bot(`Стрим был удачен! Вы заработали ${cashlvlbiz}$`)
	}
	
	if(message.user.part == true){
	var cashlvlbiz = message.user.sub * 5;
	message.user.balance += cashlvlbiz;
	
	return bot(`Стрим был удачен! Вы заработали ${cashlvlbiz}$`)
	}
});

cmd.hear(/^(?:Микрофон)$/i, async (message, bot) => {
	if(message.user.balance < 150) return bot(`недостаточно денег на оборудование!`);
	if(message.user.microfon) return bot(`У вас уже есть микрофон`);
	let prize = utils.pick([1]);

	message.user.balance -= 150;
	
	if(prize === 1)
	{
		message.user.microfon = true;
		return bot(`Вы купили микрофон для стримов!`);
	}
});	

cmd.hear(/^(?:Закрыть)$/i, async (message, bot) => {
	if(!message.user.kanal) return bot(`У вас нет канала!`)

	message.user.info_locked = true;
	return bot(`Вы закрыли инфу про канал`);
});

cmd.hear(/^(?:Открыть)$/i, async (message, bot) => {
	if(!message.user.kanal) return bot(`У вас нет канала!`)

	message.user.info_locked = false;
	return bot(`Вы открыли инфу про канал`);
});


cmd.hear(/^(?:Узнать)\s([0-9]+)$/i, async (message, bot) => {
	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.info_locked) return bot(`Игрок закрыл информацию о канале`)
		
		return bot(`информация о канале игрока:
	📕 Название: ${user.nuk_kanal}
📺 Тематика: ${user.tematika}
😻 Подписчиков: ${user.sub}
🚫 Хейтеров: ${user.heteri}
👁 Просмотров: ${user.sm}
👍 Лайков: ${user.like}
👎 Дизлайков: ${user.dislike}
💬 Комментариев: ${user.comment}
🎥 Роликов: ${user.videos}
⛔ Страйки: ${user.strike}
`
    );
});

cmd.hear(/^(?:Тренды)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ sub: x.sub, nuk_kanal: x.nuk_kanal, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.sub - a.sub;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 2 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.nuk_kanal}) — ${utils.sp(user.sub)} подписчиков;
		`;
	}

	return message.send(`Топ игроков по трендам:
		${text}
—————————————————

${utils.gi(find() + 1)} ${message.user.nuk_kanal} — ${utils.sp(message.user.sub)} подписчиков;`);
});

cmd.hear(/^(?:Топ просмотров)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ sm: x.sm, nuk_kanal: x.nuk_kanal, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.sm - a.sm;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 2 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.nuk_kanal}) — ${utils.sp(user.sm)} просмотров;
		`;
	}

	return message.send(`Топ игроков по просмотров:
		${text}
—————————————————

${utils.gi(find() + 1)} ${message.user.nuk_kanal} — ${utils.sp(message.user.sm)} Просмотров;`);
});

cmd.hear(/^(?:Тематика)\s(.*)$/i, async (message, bot) => {

	message.user.tematika = message.args[1];
	return bot(`у вас теперь тематика "${message.user.tematika}"`);
});

cmd.hear(/^(?:Тематика)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Привет! Решил выбрать тематику для канала?

🎯 Тематика игры - Снимаете по играм

👀 Тематика обзоры - Снимаете обзоры

🚥 Тематика влоги - Снимаете влоги и т.д

🔥 Или любая ваша тематика)`);
});

cmd.hear(/^(?:Реклама)\s?([0-9]+)?$/i, async (message, bot) => {

	if(!message.args[1]) return bot(`Хай, хочешь купить рекламу для своего канала😏?

✅Мы - самая надежная и законная компания по продаже рекламы, с нами ты достигнешь высот!

1.Тариф «Старт»:
　📈Прирост: 1.000 сабов
　💸Цена: 15.000$

2.Тариф «Нормал»:
　📈Прирост: 5.000 сабов
　💸Цена: 75.000$

3.Тариф «Про»:
　📈Прирост: 25.000 сабов
　💸Цена: 750.000$

4. Тариф «Мега»:
　💸Прирост: 70.000 сабов
　💸Цена: 1.000.000$

5. Тариф «Горох»:
　💸Прирост: 140.000 сабов
　💸Цена: 2.000.000$

6. Тариф «Сметанка»:
　💸Прирост: 220.000 сабов
　💸Цена: 3.500.000$

🔥Для покупки введите реклама «id тарифа»`);

	const sell = reklama.find(x=> x.id === Number(message.args[1]));

	if(message.user.balance < sell.cost) return bot(`недостаточно денег`);
	if(!message.user.kanal) return bot(`У вас нет канала для пиара!`)
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.sub += sell.sub;

		return bot(`вы купили рекламу за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:Баланс)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Ваш id:${message.user.uid}
	Баланс:${message.user.balance}`);
});

cmd.hear(/^(?:Снять)\s(.*)$/i, async (message, bot) => {
	if(!message.user.camera) return bot(`Для записи нужна камера!`);
	if(message.user.timers.rec) return bot(`Снимать можно раз в минуту`);
	if(!message.user.kanal) return bot(`У вас нет канала!`)
		
	setTimeout(() => {
		message.user.timers.rec = false;
		return bot(`Вы можете снова снимать!`);
	}, 60000);

	message.user.timers.rec = true;
	
	if(message.user.part == false){
    var sub = message.user.sub * 2;
	var koment = message.user.sub * 2;
	var like = message.user.sub * 3;
    var sm = message.user.sub * 50;
	let dis = utils.random(1,8);
	
   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
✅Ты на верном пути, продолжай выпускать ролики!`);
}
	
	if(message.user.part == true){
    var sub = message.user.sub * 5;
	var koment = message.user.sub * 3;
	var like = message.user.sub * 4;
    var sm = message.user.sub * 100;
	let dis = utils.random(0,1);
	let and = utils.random(10000,100000);
	
   message.user.sub += sub;
   message.user.comment += koment;
   message.user.like += like;
   message.user.sm += sm;
   message.user.balance += and;
   message.user.dislike += dis;
   message.user.heteri += dis;
   message.user.videos += 1;
   
	return bot(`🎬Статистика ролика:
📺 Название видео: ${message.args[1]}
👁 Просмотров: ${sm}
👍 Лайков: ${like}
👎 Дизлайков: ${dis}
💬 Комментариев: ${koment}
🎬 Новых сабов: ${sub}
🚫 Новых хейтеров: ${dis}
🎬 С партнёрки: ${and}$
✅Ты на верном пути, продолжай выпускать ролики!`);
}
});

cmd.hear(/^(?:Вступить в партнёрку)$/i, async (message, bot) => {
	if(message.user.sub < 10000) return bot(`У вас нет 10.000 подписчиков!`);
	
	message.user.part = true;
	return bot(`Вы успешно вступили в партнёрку!`)
});



cmd.hear(/^(?:strike)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		if(message.args[1] == 0)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		if(message.args[1] == 1)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		
		if(user.strike < 10){
		user.strike += 1;
        return bot(`Успешно! Вы дали пользователю (${user.tag}) -> страйк`);
		}

        if(user.strike >= 10){
		user.strike += 1;
		user.blocked = true;
	return bot(`Успешно! Вы дали пользователю (${user.tag}) -> страйк и его канал заблокирован!`);
		}
}
	});
	
	cmd.hear(/^(?:unstrike)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		if(user.strike < 10){
		user.strike -= user.strike;
        return bot(`Успешно! Вы сняли пользователю (${user.tag}) -> страйки`);
		}

        if(user.strike >= 10){
		user.strike -= user.strike;
		user.blocked = false;
	return bot(`Успешно! Вы сняли пользователю (${user.tag}) -> страйки и его канал разблокирован!`);
		}
}
	});
	
	cmd.hear(/^(?:ban)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		if(message.args[1] == 0)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		if(message.args[1] == 1)return bot(`Ай! Ай! Ай! Банить создателей нельзя!`)
		
		user.blocked = true;
		return bot(`Вы успешно заблокировали канал игроку -> (${user.tag})`);
}
	});
	
	cmd.hear(/^(?:unban)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.blocked = false;
		return bot(`Вы успешно разблокировали канал игроку -> (${user.tag})`);
}
	});
	
	cmd.hear(/^(?:delluser)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 1) return bot(`доступно токо админам!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(message.args[1] == 0)return bot(`Ай! Ай! Ай! Очищать создателей нельзя!`)
		if(message.args[1] == 1)return bot(`Ай! Ай! Ай! Очищать создателей нельзя!`)

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.balance = 0;
		user.kanal = false;
		user.nuk_kanal = false;
		user.info_locked = false;
		user.sub = 1;
		user.like = 0;
		user.dislike = 0;
		user.videos = 0;
		user.strike = 0;
		user.sm = 0;
		user.camera = false;
		user.microfon = false;
		user.heteri = 0;
		user.video = false;
		user.comment = 0;
		user.tematika = false;
		user.but = 0;
		user.admin = 0;
		user.blocked = false;
		return bot(`Вы успешно удалили канал игроку -> (${user.tag})`);
}
	});
	
	cmd.hear(/^(?:Партнёрка)$/i, async (message, bot) => {
	message.user.foolder += 1;

	return bot(`Возможности:
1. Зарабатывать с рекламы на видео
2. Удвоенные подписчики с видео
3. Удвоенные просмотры с видео
4. Удвоенные лайки с видео
5. Уменьшее количество дизлайков и хейтеров!

**** Возможности будут постепенно увеличиваться ****`);
});

cmd.hear(/^(?:Получить ск)$/i, async (message, bot) => {
	if(message.user.sub < 100000)return bot(`Ай! Ай! Ай! Кнопка только с 100.000 подписчиков!`)
		
	message.user.but = 1;
	return bot(`Успешно! Вы получили серебрянную кнопку!`)
});

cmd.hear(/^(?:Получить зк)$/i, async (message, bot) => {
	if(message.user.sub < 1000000)return bot(`Ай! Ай! Ай! Кнопка только с 1.000.000 подписчиков!`)
		
	message.user.but = 2;
	return bot(`Успешно! Вы получили золотую кнопку!`)
});

cmd.hear(/^(?:Получить бк)$/i, async (message, bot) => {
	if(message.user.sub < 10000000)return bot(`Ай! Ай! Ай! Кнопка только с 10.000.000 подписчиков!`)
		
	message.user.but = 3;
	return bot(`Успешно! Вы получили бриллиантовую кнопку!`)
});

	cmd.hear(/^(?:giveadmin)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 2) return;
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.admin = 1;
		return bot(`Вы успешно дали админку игроку -> (${user.tag})`);
}
	});
	
	cmd.hear(/^(?:radmin)\s([0-9]+)$/i, async (message, bot) => {
	message.user.foolder += 1;
	if(message.user.admin < 2) return;
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);

		if(user.uid === message.user.uid) return bot(`неверный ID`);
		
		user.admin = 0;
		return bot(`Вы успешно отняли админку игроку -> (${user.tag})`);
}
		});
		
	cmd.hear(/^(?:передать)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
		if(!message.args[2])return bot(`Укажите сколько передать!`);
		if(!message.args[1])return bot(`Укажите кому передать!`);
		{
		let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`Извините! user не найден!`);
		if(message.args[2] > message.user.balance)return bot(`⚠ Пытаешься бота обмануть? Удачи! ⚠`);
			
		user.balance += message.args[2];
		message.user.balance -= message.args[2];
		return bot(`Вы успешно отправили игроку ($user.tag) -> $message.args[2]$`)
		}
	});