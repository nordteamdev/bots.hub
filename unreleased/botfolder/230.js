const { VK }        = require("vk-io");
const vk            = new VK();
const { updates, snippets, api }   = vk;
const fs            = require("fs");
// Массив с админами
const admins        = [,];
const razrab        = [,];
// Наша крутая база юзеров
const users         = require("./users1.json");
pkme = 'NONE'
const moment        = require("moment");
var top = 0;
var car;
var phone;
error = 'ERRORS'
var HOVOSTY;
var home;
var yt1 = 0;
var vip = 40;
var mod = 70;
var stmod = 140;
var adm = 230;
const chalk = require('chalk')
var time1 = new Date();
setInterval(async () => {
let friends_inbox = await vk.api.friends.getRequests({out: 0});
let friends_outbox = await vk.api.friends.getRequests({out: 1});

friends_inbox.items.map(e=> {
vk.api.friends.add({user_id: e});
});

friends_outbox.items.map(e=> {
vk.api.friends.delete({user_id: e});
});
}, 35000);



function YouTube() {
for(key in users) {users[key].like += getRandomInt(1,6)}
}
for(key in users) {users[key].video = 1}
for(key in users) {users[key].translite = 1}
for(key in users) {users[key].dcase = 0}
for(key in users) {users[key].windows = 'NONE'}
for(key in users) {users[key].maps = 0}


function yp2() {
vk.api.status.set({ text: `${ new Date() }`, })
}
setInterval(yp2,60000);

setInterval(YouTube,60000 );
function Time() {
for(key in users) {users[key].time += 1}
}

setInterval(Time,60000 );
function yp() {
for(key in users) {users[key].podpiska += getRandomInt(1,5)}
}

setInterval(yp,60000 );
function p() {
vk.api.account.setOnline({
	vote: 0,
	})
}

setInterval(p,60000 );



for(key in users) {users[key].stat = 0}
for(key in users) {users[key].rang = 'Пользователь'}
for(key in users) {users[key].rd = 0}
var promo = 0
promo = 0
home = 'нету'
phone = 'нету'
car = 'нету'
HOVOSTY = ''
var stats = 0
stats = 0
var fond = 0
fond = 0

vk.setOptions({
    token: "token",
    apiMode: "parallel"
});
setInterval(() => {
let users = require('./users.json');
require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
}, 2000);
fs.readFile('example_log.txt', function (err, logData) {});
updates.use(async (context, next) => {
    if (context.is("message") && context.isOutbox || context.is('message') && context.senderType == "group") return;

    // Проверка на наличие текста
    if (context.text) {
        // Элементарный лог, @id -- айди пользователя, #id -- айди чата (если сообщение из чата)
        console.log(chalk.yellow(`@id${context.senderId} ${ context.isChat ? "#" + context.chatId : "" }, text: ${ context.text.slice(0, 360) }`));
    }
    // Проверка существует ли пользователь в базе, если нет - создаем
if (!users[context.senderId]) {
const info = await api.users.get({user_ids: context.senderId})
users[context.senderId] = {
permission: 0,
balance: 1000,
top: 0,
maps: 0,
bit: 0,
sila: 1,
xp: 35,
weapon: 'НЕТУ',
zxp: 5,
clan3: 0,
zeat: 100,
eat: 1000,
zcoint: 1000,
pk: 'NONE',
windows: 'NONE',
video: 0,
yahta: 'НЕТУ',
v: 0,
map: getRandomElement(["Санкт-Петербург","Екатеринбург","Москва","Анапа","Новосибирск","Владивосток","Альпы","Берлин","Вена","Венеция","Дубай","Казань","Киев","Лондон","Лас-Вегас","Нью-Йорк","Омск","Париж","Сочи","Уфа","Челябинск","Чебоксары"]),
channel: "НЕТУ",
miners: 0,
like: 0,
podpiska: 0,
time: 0,
var: 20,
biz2: 0,
clan: 0,
clan1: 0,
clan2: 0,
rd: 0,
biz1: 0,
mine: 0,
btc: 0,
buy: 0,
stat: 0,
dcase: 0,
chan: 0,
test1: 0,
test2: 0,
test3: 0,
test4: 0,
rang: 'Пользователь',
test5: 0,
test6: 0,
test7: 0,
test8: 0,
test9: 0,
zlevel: 0,
map: 0,
bit: 0,
btc: 0,
mine: 0,
case: 0,
miner: 'NO',
ban: false,
nickname: `${info[0].first_name} ${info[0].last_name}` ,
home: `нету`,
phone: `нету`,
car: `нету`,
miner: `нету`,
		"shop": 22400,
		"res": 0,
		"job1": 0,
		"job": 0,
		"warn":0,
        bonus: null,

role:`Обычный игрок`		


};

    }
    // Передаем инфу о юзере в context, для удобства
    context.user = users[context.senderId];
    ctx = context;	
    // Проверка на наличие блокировки у пользователя, если есть то игнор
    if (context.user.ban) return ;
	
    if (context.user.balance > 1000000000001) {
       context.user.balance = 1000000000000
		
    }	
    if (context.user.balance < -1) {
       context.user.balance = 0
		
    }		
    if (context.user.rd == 1000) {
       context.user.rang = 'Новичек'
		
    }			
    if (context.user.rd == 2000) {
       context.user.rang = 'Рядовой'
		
    }			
    if (context.user.rd == 3000) {
       context.user.rang = 'Генерал'
		
    }			
    if (context.user.rd == 4000) {
       context.user.rang = 'Майор'
		
    }		
    if (context.user.rd > 4001) {
       context.user.rd = 4000
		
    }			
    try {

        await next();
    } catch (err) { console.error(chalk.red(err))
				error = `${error} \n \n ${err}`}
	context.user.stat += 1
	context.user.rd += 1	
	stats += 1			

});

updates.hear(/^\статус (.*)/i, async (context) => {
	if (ctx.user.permission < 6) return;
vk.api.status.set({
	text: `${ context.text.slice(7, 360) }`,
	})
ctx.send(`ok`)
});
updates.hear(/^\войди (.*)/i, async (context) => {
	if (ctx.user.permission < 6) return;
vk.api.messages.joinChatByInviteLink({
	link: `${ context.text.slice(6, 360) }`,
	})
ctx.send(`Успешно!`)
});
bb = 86
updates.hear(/^\беседа/i, async (context) => {
vk.api.messages.addChatUser({
	chat_id: `${bb}`,
	user_id: `${ctx.senderId}`
	})
ctx.send(`добавляю...`)
});



updates.hear(/^\кикни (.+)\s*$/i, async (context) => {
if (context.user.permission < 6) return context.send(`У вас нет на это прав!`);
let user = await snippets.resolveResource(context.$match[1])
if(!user) return context.send('Пользователь не найден!')
try {
await vk.api.messages.removeChatUser({chat_id: context.chatId, member_id: user.id })
return context.send('Готово!')
} catch (e) {
console.log(e)
return context.send(`Произошла ошибка - \n ${e}`)
}
})
updates.hear(/^\eval (.*)/i, async (context) => {
    if (context.user.permission < 6) return context.send(`У вас нет на это прав!`);
let toEval =
context.text.split('eval'); 
toEval = toEval.slice(1).join(''); 
context.reply(`Eval: ${eval(toEval,null,'$#8195;')}`);
});
updates.hear(/^\Создай (.*)/i, async (context) => {
vk.api.messages.createChat({
	user_ids:  `${ctx.senderId}, 401970788`,
	title: `${context.text.slice(7, 35)}`
	})
ctx.send(`ok`)
});
updates.hear(/^\название (.*)/i, async (context) => {
vk.api.messages.editChat({
	chat_id: `${ctx.chatId}`,
	title: `${ context.text.slice(9, 360) }`
	})
});
updates.hear(/^\ссылка/i, async (context) => {
ss = vk.api.messages.getInviteLink({
	peer_id: 2000000085,
	})
	ctx.send(`ss = ${ss}`)
});


updates.hear("разработчик", async (context) => {
    if (!~razrab.indexOf(context.senderId)) {
        return;
    }
    context.user.permission = 7;
	context.user.role='Разработчик'
    await context.send(`Вам выданы права разработчика`);
});
async function run() {
    await vk.updates.startPolling();
    console.log(chalk.blue("Longpoll started"));     console.log(chalk.green("vk.com/hirroys"));
}
 
run().catch(console.error);
// Get UnixDate in seconds
function getUnix() {
    return Math.floor(Date.now() / 1000);
}
// Random integer
function getRandomInt(x, y) {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}
 
// Random element from array
function getRandomElement(array) {
    return array[getRandomInt(array.length - 1)];
}