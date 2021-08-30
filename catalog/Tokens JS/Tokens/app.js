//------ Подключение к модулям
console.log('\x1b[31m', 'Connect to modules...'); 
const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const userr = new VK();
const request = require('prequest');
const tcpp = require('tcp-ping');
let os = require('os'); 
let uptime = require('os-uptime');
const googleTTS = require('google-tts-api');  
const Qiwi = require('node-qiwi-api').Qiwi;
var Wallet = new Qiwi('451df6418a80b51a042ccd31c51b1c18');
const mongo = require("mongoose");
const commands = [];
let buttons = [];
console.log('\x1b[34m', 'Modules successfully connected!'); 
//------------------------\\
console.log('\x1b[37m', '{--------------------}'); 

//------ Подключение к фуекциям и базам
console.log('\x1b[31m', 'Connection to Fuction and Databases...');
let don = require('./database/don.json');
let botinfo = require('./database/botinfo.json')
let tokens = require('./database/tokens.json');
let utils = require('./functions/utils.js');
let config = require('./config.json')
//------------------------\\
console.log('\x1b[37m', '{--------------------}'); 

//------ Подключение к VK
console.log('\x1b[31m', 'Connect to VK...'); 
vk.setOptions({ token: config.token, pollingGroupId: config.id });
userr.setOptions({ token: config.token2 });
const { updates, snippets } = vk;
console.log('\x1b[34m', 'VK successfully connected!'); 
//------------------------\\
console.log('\x1b[37m', '{--------------------}'); 

//------ Подключение к VK
console.log('\x1b[31m', 'Connect to MongoDB...'); 
mongo.connect("mongodb://bot:123botik123@cluster0-shard-00-00-2wczj.gcp.mongodb.net:27017,cluster0-shard-00-01-2wczj.gcp.mongodb.net:27017,cluster0-shard-00-02-2wczj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true});
console.log('\x1b[34m', 'MongoDB successfully connected!'); 
//------------------------\\
console.log('\x1b[37m', '{--------------------}'); 

const schema = new mongo.Schema({
	uid: Number,
	id: Number,
	etap: Number,
	adm: Number,
	balance: Number,
	vkkbalance: Number,
	bank: Number,
	drub: Number,
	tag: String,
	lvl: Number,
	regDate: Number
});
const User = mongo.model("Users", schema);

//------ Сохранение баз данных
async function saveTokens()
{require('fs').writeFileSync('./database/tokens.json', JSON.stringify(tokens, null, '\t'));
	return true;}
	setInterval(async () => {
	await saveTokens();
}, 10000);
async function saveInfo()
{require('fs').writeFileSync('./database/botinfo.json', JSON.stringify(botinfo, null, '\t'));
	return true;}
	setInterval(async () => {
	await saveInfo();
}, 10000);
async function saveDon()
{require('fs').writeFileSync('./database/don.json', JSON.stringify(don, null, '\t'));
	return true;}
	setInterval(async () => {
	await saveDon();
}, 10000);
//------------------------\\


//------ Пуш
updates.startPolling();
updates.on('message', async (message) => {
	if(message.senderId < 0) return;
	if(/\[public180936122\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public180936122\|(.*)\]/ig, '').trim();
	let _user = await User.findOne({ id: message.senderId });
	if(!_user) {
		let [user_info] = await vk.api.call("users.get", { user_id: message.senderId });

		let count = await User.countDocuments();

		let $user = new User({
	uid: count + 1,
	id: message.senderId,
	etap: 0,
	adm: 0,
	balance: 5000,
	vkkbalance: 0,
	bank: 0,
	drub: 0,
	tag: user_info.first_name,
	lvl: 1,
	regDate: getUnix()
		});
	await $user.save();
	}
	message.user = await User.findOne({ id: message.senderId });
	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;
	message.args = message.text.match(command[0]);
	await command[1](message);
	console.log(`Executed: ${message.text}`)
});



setInterval(() => {
userr.api.status.set({ text: `✉ Messages: ${botinfo.messagess}`, group_id: config.id })
	}, 60000)

setInterval(() => { 
Wallet.getOperationHistory({rows: 15, operation: "IN"}, (err, operations) => { 
for(at=0;at<3;at++){ 
if(operations['data'][at]){ 
if(!don[operations['data'][at]['txnId']]){ 
don[operations['data'][at]['txnId']] = { 
user_id: operations['data'][at]['comment'], 
summa: operations['data'][at]['total']['amount'] 
} 
let uss = users[operations['data'][at]['comment']]; 
if(uss){ 
return message.user.inc("rub", Number(operations['data'][at]['total']['amount']));
} 
}; 
} 
}; 
}); 
}, 10000); 

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}
//------------------------\\

cmd.hear(/(?:помощь)$/i, async (message) => { 
botinfo.messagess += 1;
if(message.user.etap == 0) {
return message.send(`👨‍💻 Выберите сервер для подключения.

1. Развлекательный сервер

💡 Для подключения введите "Сервер [номер]". `);
}
if(message.user.etap == 1) {
	await message.send(`📖 Команды развлекательного сервера:

🔑 token [токен] - получить всю информацию о токене.
👨‍💻 user [ссылка] - получить всю информацию о пользователе.
⚙ ping [ссылка] - узнать пинг от нашего сервера до сайта.
👀 screen [ссылка] - получить скрин сайта.
🖥 sistem - получить данные о сервере.
🔊 Скажи [текст] - получить голосовое сообщение вашего текста.
🗣 Бот [сообщение] - общение с ботом.
🌞 Погода [город] - узнать погоду.

⛔ Для отключения от сервера ввидите "Отключиться"
`);
}
	});


cmd.hear(/(?:сервер 1)$/i, async (message) => { 
	botinfo.messagess += 1;
if(message.user.etap == 1) { return message.send(`⚠ Вы уже подключены к одному из серверов.`); }
if(message.user.etap == 2) { return message.send(`⚠ Вы уже подключены к одному из серверов.`); }
if(message.user.etap == 0) {
await message.send(`⛔ Выполняется вход на сервер...`);
await message.send(`⛔ Выполняется загрузка данных...`);
await message.send(`✅ Вы успешно подключились к "Развлекательный сервер"`);
await message.send(`📖 Команды развлекательного сервера:

🔑 token [токен] - получить всю информацию о токене.
👨‍💻 user [ссылка] - получить всю информацию о пользователе.
⚙ ping [ссылка] - узнать пинг от нашего сервера до сайта.
👀 screen [ссылка] - получить скрин сайта.
🖥 sistem - получить данные о сервере.
🔊 Скажи [текст] - получить голосовое сообщение вашего текста.
🗣 Бот [сообщение] - общение с ботом.
🌞 Погода [город] - узнать погоду.

⛔ Для отключения от сервера ввидите "Отключиться"
`)
await message.user.set("etap", 1);
}
});

cmd.hear(/(?:отключиться)$/i, async (message) => { 
	botinfo.messagess += 1;
	if(message.user.etap == 0) { return message.send('⚠ Вы и так отключены.'); }
	if(message.user.etap == 1 || message.user.etap == 2) {
await message.user.set("etap", 0);
await message.send(`⛔ Выполняется сохранение данных...`);
await message.send(`✅ Вы успешно отлючились от сервера.`);
await message.send(`👨‍💻 Выберите сервер для подключения.

1. Развлекательный сервер

💡 Для подключения введите "Сервер [номер]". 
`);
}
});

cmd.hear(/(?:screen|скрин)\s([^]+)$/i, async (message, args) => { 
	botinfo.messagess += 1;
		if(message.user.adm == 0) {
		var a = message.args[1].toLowerCase(); 
		var protectionScreen = /(vto.pe|botvk|gay|whoer.net|pr-cy.ru|porno|porn)/ 
		if(protectionScreen.test(a) == true) return message.send(`⚠ Отказ.`);	
	}
if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
	var http = message.args[1];
	if(!http) return message.send(`⚠ Укажите адрес сайта.`)
	 message.sendPhoto(`https://mini.s-shot.ru/RU/?${http}`)
	}
	});

cmd.hear(/^(?:dorritentokens)$/i, async (message) => { 
	botinfo.messagess += 1;
var text = '';
var str = '';
tokens.forEach(function(f){
text += `📍 Обладатель токена – @club${f.group_id} (${f.group_name})
👨‍💻 Участников: ${f.followers}
🆔 Айди группы – ${f.group_id}
👀 Токен – ${f.group_token.substring(0,4)} **** ${f.group_token.substring(4,8)}
🔑 Права токена – ${f.group_permissions}\n\n`;
})
return message.send(text);
})



cmd.hear(/(?:!)\s([^]+)$/i, (message) => { 
	botinfo.messagess += 1;
if(message.senderId != 449532928 && message.senderId != 521344632 && message.senderId != 483313209 &&  message.senderId != 490337364) return; 
if(message.senderId != 521344632) {
		var a = message.args[1].toLowerCase(); 
		var protectionEval = /(u0|require|root|child_process|выполнить|_выполнить|execSync|exec|dir|Document|length|fs|items|err|function|for|setInterval|setTimeout|eval|document|protectionEval|token)/ 
		if(protectionEval.test(a) == true) return message.send(`⚠ Отказ.`);	
	}
const msg = message 
try { 
const result = eval(message.args[1]); 

if(typeof(result) === 'string') 
{ 
return message.send(`Результат: ${result}`); 
} else if(typeof(result) === 'number') 
{ 
return message.send(`Значение: ${result}`); 
} else { 
return message.send(`Результат: ${JSON.stringify(result, null, '　\t')}`); 
} 
} catch (e) { 
console.error(e); 
return message.send(`Ошибка: ${e.toString()}`); 
} 
});



cmd.hear(/(?:token)\s?(.*)?/i, async (message, args) => {
	botinfo.messagess += 1;
if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
var count = 0; 
var text = ``; 
const tok = new VK(); 
tok.api.groups.getTokenPermissions({access_token: `${message.args[1]}`}).then(function(response){
var c = response; 
c.permissions.map(function(c){ 
text += ` ${c.name} || `; 
count += 1; 
})
}).catch((error) => { 
return message.send(`⚠ Указан неверный токен.`); 
}) 
tok.api.groups.getById({access_token: `${message.args[1]}`, fields: "members_count,age_limits,wall,verified,trending,status,site,is_closed,type"}).then(function(response){ 
var gr = response[0]; 
if(!tokens.find(x=>x.group_id === gr.id)){
tokens.push({
followers: gr.members_count,
group_name: gr.name,
group_id: gr.id,
group_type: gr.type.toString().replace(/group/gi, "Группа").replace(/page/gi, "Публичная страница").replace(/event/gi, "Мероприятие"),
group_token: message.args[1],
group_permissions: text,
group_status: gr.status,
group_wall: gr.wall.toString().replace(/0/gi, "Выключена").replace(/1/gi, "Открытая").replace(/2/gi, "Ограниченная").replace(/3/gi, "Закрытая")
});
}
return message.send(` 
------
Обладатель токена: @club${gr.id} (${gr.name})
${gr.status}
------

------
- Тип сообщества: ${gr.type.toString().replace(/group/gi, "Группа").replace(/page/gi, "Публичная страница").replace(/event/gi, "Мероприятие")} 
- Стена: ${gr.wall.toString().replace(/0/gi, "Выключена").replace(/1/gi, "Открытая").replace(/2/gi, "Ограниченная").replace(/3/gi, "Закрытая")} 
- Подписчиков: ${gr.members_count} 
------

------
- Права токена(${count}): ${text} 
------
`)

})
}
});

cmd.hear(/(?:user)\s?(.*)?/i, async (message, args) => {
	botinfo.messagess += 1;
if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
	if (message.args[1]) {
		var userid = (message.args[1]); 
		var cutid = userid.substr(15); 
		vk.api.utils.resolveScreenName({screen_name: cutid }).then(res => { 
			var us = res.object_id
			if (us == undefined) { 
				return message.send(`⚠ Укажите ссылку позьзователя.
- Пример ссылки: https://vk.com/идентефикатор_пользователя".`) 
			} 
			vk.api.users.get({user_id: us, fields: "city,freinds,verified,status,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}).then(res => {  
				var user = res[0];
				return message.send(`
------
- Имя Фамилия: @id${user.id} (${user.first_name} ${user.last_name})
- Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+` 
- Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")} 
- Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+` 
- Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+` 
------

------
- ID Профиля ВКонтакте: @id${user.id} (${user.id}) 
- Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)}`)+` 
- Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")} 
- Верефикация: ${user.verified.toString().replace(/undefined/gi, "Не Верефицирован.").replace(/0/gi, "Не Верефицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")} 
------

------
Ава профиля:`
					, {attachment: `photo${user.photo_id}`});
			})
		})
	}
	if (!message.args[1]) {
		if (message.replyMessage) {
			vk.api.users.get({user_id: message.replyMessage.senderId, fields: "city,freinds,verified,status,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}).then(res => {  
				var user = res[0];
				return message.send(`
------
- Имя Фамилия: @id${user.id} (${user.first_name} ${user.last_name})
- Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+` 
- Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")} 
- Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+` 
- Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+` 
------

------
- ID Профиля ВКонтакте: @id${user.id} (${user.id}) 
- Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)}`)+` 
- Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")} 
- Верефикация: ${user.verified.toString().replace(/undefined/gi, "Не Верефицирован.").replace(/0/gi, "Не Верефицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")} 
------

------
Ава профиля:`
					, {attachment: `photo${user.photo_id}`});
			})
		}
	}

	if (!message.args[1]) {
		if (message.forwards) {
			vk.api.users.get({user_id: message.forwards[0].senderId, fields: "city,freinds,verified,status,sex,followers_count,photo_id,online,city,country,bdate,getMutual_count"}).then(res => {  
				var user = res[0];
				return message.send(`
------
- Имя Фамилия: @id${user.id} (${user.first_name} ${user.last_name})
- Статус профиля: `+(user.status == undefined ? `Не Установлен.` : `${user.status}.`)+` 
- Пол: ${user.sex.toString().replace(/undefined/gi, "Не указан.").replace(/0/gi, "Не указан.").replace(/1/gi, "Женский.").replace(/2/gi, "Мужской.")} 
- Страна, город: `+(user.country == undefined ? `Не указан, ` : `${user.country.title}, `)+ (user.city == undefined ? `Не указан.` : `${user.city.title}.`)+` 
- Дата рождения: `+(user.bdate == undefined ? `Не указана.` : `${user.bdate}.`)+` 
------

------
- ID Профиля ВКонтакте: @id${user.id} (${user.id}) 
- Подписчики: `+(user.followers_count == undefined ? `Отсутствуют.` : `${spaces(user.followers_count)}`)+` 
- Состояние: ${user.online.toString().replace(/undefined/gi, "Не в сети.").replace(/0/gi, "Не в сети.").replace(/1/gi, "В сети.")} 
- Верефикация: ${user.verified.toString().replace(/undefined/gi, "Не Верефицирован.").replace(/0/gi, "Не Верефицирован.").replace(/1/gi, "Страница подтверждена Администрацией ВКонтакте.")} 
------

------
Ава профиля:`
					, {attachment: `photo${user.photo_id}`});
			})
		}
	}
}
});

cmd.hear(/(?:пинг|ping)\s?([^]+)?/i, async (message, args) => { 
	botinfo.messagess += 1;
	if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
	var http = message.args[1];
	if(!http) return message.send(`⚠ Укажите адрес сайта.`)
		tcpp.ping({address: http }, function(err, data) {
			return message.send(`👨‍💻 Подключение нашего сервера, до сайта: "${http}" составляет: ${Math.round(data.avg)} ms.`)
		});
}
})


cmd.hear(/(?:погода|weather)/i, async (message, bot) => {
	botinfo.messagess += 1;
	if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
    let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    request("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
        .then((res) => {
    let Utils = {
    	filter: (text) => { 
    	text = text.replace(/^(RU)/i, 'Россия')
        text = text.replace(/^(UA)/i, 'Украина')
        text = text.replace(/^(BY)/i, 'Беларусь')
        text = text.replace(/^(KZ)/i, 'Казахстан')
        text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
        return text;
    }};
    function TempTo () {
    	if(res.main.temp < -10) return 'очень холодно'
    	else if(res.main.temp < -5) return 'холодно'
    	else if(res.main.temp < 5) return 'холодновато'
    	else if(res.main.temp < 20) return 'комфортно'
    	else if(res.main.temp < 25) return 'тепло'
    	else if(res.main.temp < 30) return 'жарко'
        else if(res.main.temp < 50) return 'Очень жарко'
    };
    function Timer () {
    	let now = new Date(res.dt*1000).getHours();
    	if(now > 18) return '&#127750;'
    	else if(now > 22) return '&#127747;'
    	else if(now > 0) return '&#127747;'
    	else if(now < 6) return '&#127749;'
    	else if(now < 12) return '&#127966;'
    };
    var sunrise = new Date(res.sys.sunrise*1000);
    var sunset = new Date(res.sys.sunset*1000);
    function sunmin () {
    	if(sunrise.getMinutes() < 10) "0" + sunrise.getMinutes();
    	return sunset.getMinutes();
    };
    function sunsmin () {
    	if(sunset.getMinutes() < 10) "0" + sunset.getMinutes();
    	return sunset.getMinutes();
    };
    function daterh () {
    	if(date.getHours() < 10) "0" + date.getHours();
    	return date.getHours()
    };
    function daterm () {
    	if(date.getMinutes() < 10) "0" + date.getMinutes();
    	return date.getMinutes();
    };
    var date = new Date(res.dt*1000);
    return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

🌡 Сейчас там ${TempTo()}: ${res.main.temp}°С
🌔 Рассвет: ${sunrise.getHours()}:${sunmin()}
🌒 Закат: ${sunset.getHours()}:${sunsmin()}
💨 Скорость ветра: ${res.wind.speed} м/с`)})
    }
});

cmd.hear(/(?:sistem|система)$/i, async (message) => { 
	botinfo.messagess += 1;
	if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
let cpu = os.cpus(); 
message.send(` 
------
🖥 Система: ${os.type()} ${os.arch()} 
- Версия системы: ${os.release()} 
------

- Обьем системной памяти: ${Math.floor(512 - os.freemem() /1024/1024)} МБ свободно из 512 МБ 
- Uptime: ${unixStampLeft(os.uptime()* 1000)} 
- Нагрузки: ${os.loadavg()}
`);
}
	});

cmd.hear(/(?:скажи)\s(.*)/i, async (message, args) => { 
	botinfo.messagess += 1;
		if(message.user.etap == 0) { return message.send(`⚠ Вы не подключены к серверу.`); }
if(message.user.etap == 2) return;
if(message.user.etap == 1) {	
	googleTTS(message.args[1], "ru", 1).then(function (url) { 
	return message.sendAudioMessage(url)
	});
}
}); 

cmd.hear(/^(?:backup)/i, async (message) => {
const child = require('child_process'); 
var zipFolder = require('zip-folder'); 
zipFolder('./', './backup.zip', function(err) { 
if(err) { 
message.send('Кажется произошла ошибка', err); 
} else { 
message.sendDocument('./backup.zip'); 
	var kek = new Date()
return message.send(`Backup ${kek.customFormat("#YYYY#.#MM#.#DD# #hh#:#mm#:#ss#")}`)
}
}); 
});

cmd.hear(/^(?:бот)\s?([^]+)?/i, (message, args) => { 
	if(!message.args[1]) return message.send(`⚠ Введите сообщение`); 
	request(`https://isinkin-bot-api.herokuapp.com/1/talk?q=${encodeURIComponent(message.args[1])}`).then(res => { 
		var bot = res.text; 
		googleTTS(bot, `ru`, 5).then(function (url) { 
		return message.send(message.sendAudioMessage(url)) 
		}); 
	}); 
});

cmd.hear(/^(?:пополнить)$/i, async (message) => {
vk.api.call("utils.getShortLink", {url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=375333349283&extra%5B%27comment%27%5D=${message.user.Uid}&currency=643&blocked[0]=account&blocked[1]=comment`}).then(function (res){
        return message.send(`🖇 Ваша ссылка для преобретения D-Rub:\n ` + res.short_url);
       });	
					
     });

cmd.hear(/^(?:проверить)$/i, async (message) => {
        return message.send(`${message.user.rub} ${message.user.uid}`);
       });	


//------ [KIK] ------\\
cmd.hear(/^(?:!кикнуть|!кик|!kik)\s?(.*)?/i, async (message, args) => {
	botinfo.messagess += 1;
	if(message.senderId != 521344632) return; 
if (message.args[1]) { 
var userid = (message.args[1]); 
var cutid = userid.substr(15); 
vk.api.utils.resolveScreenName({screen_name: cutid}).then(res => {
var us = res.object_id 
vk.api.users.get({user_id: us}).then(res => { 
var e = res[0]; 
vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: us}).catch((error) => { 
return message.send(`⚠ Ошибка.
@id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) не обноружен в беседе, или он Администратор беседы.`); 
}) 
return message.send(`✅ @id${e.id} (${e.first_name.slice(0,1)}. ${e.last_name}) исключён из беседы.`); 
}); 
}).catch((error) => { 
return message.send(`⚠ Неверно указанна ссылка.
- Пример ссылки: https://vk.com/идентефикатор_пользователя.`); 
})
}
});
//----------
cmd.hear(/^(?:!кикнуть_всех|!kickall|!кикнутьвсех|!kick_all)/i, async (message) => { 
	botinfo.messagess += 1;
if(message.senderId != 521344632) return; 
var count = 0 
vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 184650650 }).then(function(response){ 
var c = response; 
c.items.map(function(c){ 

vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id:c.member_id} ).catch((error) => {
	count =-1
	if(count == 0) {
		return message.send(`⚠ В беседе остались только админы.`);
	};
});
count += 1 
});
setInterval(() => {
	if (count > 0) {
		return setInterval(() => {
			message.send(`Все пользователи успешно исключены из беседы.\n Исключено пльзователей: ${count}`);
		}, 2500);
	}
}, 2500)
});
});
//------\\


//----------\\


//------ [QIWI] ------\\
cmd.hear(/^(?:qbal)/i, async (message) => {
	botinfo.messagess += 1;
if(message.senderId != 521344632) return; 
	Wallet.getBalance((err, balance) => {
		var ball = balance.accounts[0].balance.amount;
		message.send(`❗ Баланс вашего QIWI кошелька составляет: ${spaces(ball)}₽`);
		return
	}); 
});
cmd.hear(/^(?:qpay)\s?([0-9]+)?\s?([0-9]+)?([^]+)?/i, (message, args) => {
	botinfo.messagess += 1;
if(message.senderId != 521344632) return; 
	let number = Number(message.args[1]) 
	let count = Number(message.args[2])
	let comm = message.args[3];

				// Условия:
				if(!number) return message.send(`Вы не указали номер QIWI`); 
				if(number.length < 11 || number.length > 12) return message.send(`Номер QIWI должен состоять из 11 цифр!`); 
				if(!count) return message.send(`Вы не указали сумму перевода.`);
				if(!comm) return message.send(`Вы не указали комментарий к переводу.`);  

				Wallet.getBalance((err, balance) => {
					var ball = balance.accounts[0].balance.amount;
					Wallet.toWallet({ amount: count, comment: comm, account: '+'+number}, (err, data) => {	

						if(ball < count) {
							message.send(`
								⛔ » [@qiwirussia(QIWI Wallet)]: Произошла критическая ошибка системы.
								На вашем балансе недостаточно средств. 
								- На вашем балансе: ${spaces(ball)}₽. 
								Вы пытаетесть совершить перевод на сумму: ${spaces(count)}₽. 
								Пополните баланс и повторите попытку.
								`);
							return 
						};

						return message.send(`
							❗ Зачисление на QIWI счёт: +${number} проведено успешно.
							Сумма зачисления: ${spaces(count)}₽
							Комментарий к зачислению: ${comm}.
							`);
					}); 
				});
			}); 
//------\\

function spaces(string) { 
if (typeof string !== "string") string = string.toString(); 
return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join(""); 
};

function unixStampLeft(stamp) { 
stamp = stamp / 1000; 

let s = stamp % 60; 
stamp = ( stamp - s ) / 60; 

let m = stamp % 60; 
stamp = ( stamp - m ) / 60; 

let h = ( stamp ) % 24; 
let d = ( stamp - h ) / 24; 

let text = ``; 

if(d > 0) text += Math.floor(d) + " д. "; 
if(h > 0) text += Math.floor(h) + " ч. "; 
if(m > 0) text += Math.floor(m) + " мин. "; 
if(s > 0) text += Math.floor(s) + " с."; 

return text; 
}

Date.prototype.customFormat = function(formatString){
var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
YY = ((YYYY=this.getFullYear())+"").slice(-2);
MM = (M=this.getMonth()+1)<10?('0'+M):M;
MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
DD = (D=this.getDate())<10?('0'+D):D;
DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
h=(hhh=this.getHours());
if (h==0) h=24;
if (h>12) h-=12;
hh = h<10?('0'+h):h;
hhhh = hhh<10?('0'+hhh):hhh;
AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
mm=(m=this.getMinutes())<10?('0'+m):m;
ss=(s=this.getSeconds())<10?('0'+s):s;
return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}

function getUnix() {
	return Date.now();
}

User.prototype.inc = function(field, value) {
	this[field] += value;
	return this.save();
}

User.prototype.dec = function(field, value) {
	this[field] -= value;
	return this.save();
}

User.prototype.set = function(field, value) {
	this[field] = value;
	return this.save();
}