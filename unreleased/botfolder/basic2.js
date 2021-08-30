const { VK }        = require("vk-io");
const vk            = new VK();
const { updates, snippets, api }   = vk;
const fs            = require("fs");
// Массив с админами
const admins        = [,];
const razrab        = [469284392,];
// Наша крутая база юзеров
const users         = require("./users.json");
const usera         = new Array(users);
const moment        = require("moment");
var top = 0;
var car;
var phone;
error = 'ERRORS'
var HOVOSTY;
pkme = 'отсутствует'
var no2w = new Date().getTime();
var home;
random2 = `${getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"])}`
var yt1 = 0;
CODE = `${CODE = `${getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) }`}`
var vip = 10;
var mod = 50;
var stmod = 70;
var adm = 100;
const ban = {};
const chalk = require('chalk')
var time1 = new Date();

const userapi = new VK({token: "Deleted"})

function YouTube() {
for(key in users) {users[key].like += getRandomInt(1,6)}
}


setInterval(YouTube,60000 );
function Yo() {
userapi.api.account.setOnline({
	vote: 0,
	})
}


setInterval(YouTube,60000 );


function Time() {
for(key in users) {users[key].time += 1}
}

setInterval(Time,60000 );
function Time2() {
CODE = `${CODE = `${getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) }`}`

}

setInterval(Time,1 );


function yp() {
for(key in users) {users[key].podpiska += getRandomInt(1,5)}
}

setInterval(yp,60000 );
for(key in users) {users[key].stat = 0}
for(key in users) {users[key].riddle = 0}
var promo = 0
promo = 0
home = 'Отсутствует'
phone = 'Отсутствует'
car = 'Отсутствует'
HOVOSTY = ''
var stats = 0
stats = 0
var fond = 0
fond = 0
for(key in users) {users[key].windows = 'Отсутствует'}
for(key in users) {users[key].maps = 0}
vk.setOptions({ 
token: "token", 
apiMode: "parallel", 
pollingGroupId: 175630163
});
setInterval(() => {
let users = require('./users.json');
require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
}, 200);
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
weapon: 'Отсутствует',
zxp: 5,
zeat: 100,
eat: 1000,
zcoint: 1000,
pk: 'Отсутствует',
riddle: 0,
windows: 'Отсутствует',
video: 0,
yahta: 'Отсутствует',
v: 0,
map: `${getRandomElement(["Токио","Санкт-Петербург","Екатеринбург","Москва","Анапа","Новосибирск","Владивосток","Альпы","Берлин","Вена","Венеция","Дубай","Казань","Киев","Лондон","Лас-Вегас","Нью-Йорк","Омск","Париж","Сочи","Уфа","Челябинск","Чебоксары"])}`,
channel: "Отсутствует",
miners: 0,
like: 0,
podpiska: 0,
time: 0,
var: 20,
biz2: 0,
brak: 0,
brak1: '',
rd: 0,
biz1: 0,
mine: 0,
btc: 0,
buy: 0,
stat: 0,
dcase: 0,
chan: 0,
LEV: 0,
test1: 0,
test2: 0,
test3: 0,
test4: 0,
rang: 'Пользователь',
bizlevel: 1,
test5: 0,
test6: 0,
test7: 0,
test8: 0,
test9: 0,
zlevel: 0,
maps: 0,
bit: 0,
btc: 0,
mine: 0,
case: 0,
miner: 'отсутствует',
ban: false,
nickname: `${info[0].first_name} ${info[0].last_name}` ,
home: `отсутствует`,
phone: `отсутствует`,
car: `отсутствует`,
miner: `отсутствует`,
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
	if (ban[ctx.chatId]) return;
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
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));


});

updates.hear(/^\трейд ([0-9]+) ([0-9]+)/i, async (context) => {
	
const amount = context.$match[1]
const user = context.$match[2]
if(amount > context.user.balance) return await context.send('Недостаточно средств!')
if(amount > 1000000) return await context.send('Привышен лимит!')	
if(!users[user]) return await context.send('Пользователь не найден!')
context.user.balance -= Number(amount)
users[user].balance += Number(amount)
 await context.send(`@id${context.senderId}(${context.user.nickname}) отправил @id${user}(${users[user].nickname}) ${amount} монет \n чек перевода:  ${ getRandomInt(4575678785) }`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) отправил вам ${amount} монет`}) 
}, 10)
console.log(chalk.grey.underline(`передача: ${context.senderId} передал ${user} ${amount} $`))
});
updates.hear(/^\timer ([0-9]+)/i, async (context) => {
	if (ctx.user.permission < 1) return;
const amount = context.$match[1]


 await context.send(`Сообщение придет через ${amount} сек.`)
setTimeout(() => { 
ctx.send(`СТОП! ВРЕМЯ ВЫШЛО!`) 
}, amount * 1000)
console.log(chalk.grey.underline(`передача: ${context.senderId} передал ${user} ${amount} $`))
});
updates.hear(/^\статус (.*)/i, async (context) => {
	if (ctx.user.permission < 6) return;
userapi.api.status.set({
	text: `${ context.text.slice(7, 360) }`,
	group_id: 172058080
	})
ctx.send(`ok`)
});





updates.hear(/^\ошибки\s*$/i, async (context) => {
if(context.user.permission < 6) return await context.send('Недостаточно прав!')
	await context.send(`${error}`)
});

updates.hear(/^\error\s*$/i, async (context) => {
if(context.user.permission < 6) return await context.send('Недостаточно прав!')
	await context.send(`${error}`)
});




updates.hear(/^\карта вклад ([0-9]+)\s*$/i, async (context) => {
text2 = context.text.slice(12,100)
aa = text2.replace(/к/g,'000');
aa = text2.replace(/(а|б|в|г|д|е|ё|ж|з|и|й|л|м|н|о|п|р|с|т|у|ф|х|ч|щ|ы|ц|ш|ъ|ь|э|ю|я|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|v|w|x|y|z)/g,'0');
amount = Number(aa)
if(amount > context.user.balance) return await context.send('Недостаточно средств!')
context.user.balance -= amount
context.user.maps += amount
 await context.send(`Вы положили на карту ${amount} монет \n чек:  ${ getRandomInt(4575678785) }`)
});



updates.hear(/^\карта снять ([0-9]+)\s*$/i, async (context) => {
text2 = context.text.slice(12,100)
aa = text2.replace(/к/g,'000');
aa = text2.replace(/(а|б|в|г|д|е|ё|ж|з|и|й|л|м|н|о|п|р|с|т|у|ф|х|ч|щ|ы|ц|ш|ъ|ь|э|ю|я|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|v|w|x|y|z)/g,'0');
amount = Number(aa)
if(amount > context.user.maps) return await context.send('Недостаточно средств!')
context.user.balance += amount
context.user.maps -= amount
 await context.send(`Вы сняли c карты ${amount} монет \n чек:  ${ getRandomInt(4575678785) }`)
});
const z = {};
const e = {};
updates.hear(/^\загадка\s*$/i, async (context) => {
if (e[context.chatId] == 1 ) return ctx.send(`Загадка уже загадана!`)
e[context.chatId] = 1
otvet = getRandomInt(1,103)
if (otvet == 1) {
	ctx.send(`Они летят быстрее ветра, \n И я лечу с них на три метра. \n Вот мой полет закончен. Хлоп! \n Посадка мягкая в сугроб.`)
	z[context.chatId] = `санки`
}
if (otvet == 2) {
	ctx.send(`Все его зимой боятся - \n Больно может он кусаться. \n Прячьте уши, щёки, нос, \n Ведь на улице ... `)
	z[context.chatId]  = `мороз`
}
if (otvet == 3) {
	ctx.send(`Разукрасил чародей \n Окна все в домах людей. \n Чьи узоры? — Вот вопрос. \n Их нарисовал…`)
	z[context.chatId]  = `мороз`
}
if (otvet == 4) {
	ctx.send(`Белым снегом всё одето - \n Значит, наступает ...`)
	z[context.chatId]  = `зима`
}
if (otvet == 5) {
	ctx.send(`На деревья, на кусты \n С неба падают цветы. \n Белые, пушистые, \n Только не душистые.`)
	z[context.chatId]  = `снежинки`
}
if (otvet == 6) {
	ctx.send(`Кружится маленькая льдинка. Сядет на ладошку - холодно немножко. И растает...`)
	z[context.chatId]  = `снежинка`
}
if (otvet == 7) {
	ctx.send(`Каждый братец дом имеет.  \n Дом его зимою греет.`)
	z[context.chatId]  = `перчатка`
}
if (otvet == 8) {
	ctx.send(`Бел, а не сахар, \n Нет ног, а идет.`)
	z[context.chatId]  = `снег`
}
if (otvet == 9) {
	ctx.send(`Чист и ясен, как алмаз, \n Дорог не бывает, \n Он от матери рожден \n И мать рождает.`)
	z[context.chatId]  = `лёд`
}
if (otvet == 10) {
	ctx.send(`Что вверх корнем растёт?`)
	z[context.chatId]  = `сосулька`
}
if (otvet == 11) {
	ctx.send(`Кто только зимой растет?`)
	z[context.chatId]  = `сугроб`
}
if (otvet == 12) {
	ctx.send(`Зимой лежал, а весной в речку побежал.`)
	z[context.chatId]  = `снег`
}
if (otvet == 13) {
	ctx.send(`Что за друг, без которого зимой из дома не выйдешь?`)
	ctx.user.LEV = `шапка`
}
if (otvet == 14) {
	ctx.send(`Бежит по снегу, а следу нету.`)
	z[context.chatId]  = `ветер`
}
if (otvet == 15) {
	ctx.send(`Зимой одевается, к лету раздевается.`)
	z[context.chatId]  = `земля`
}
if (otvet == 16) {
	ctx.send(`Какой год продолжается всего один день?`)
	z[context.chatId]  = `новый`
}
if (otvet == 17) {
	ctx.send(`Как зовут красавицу, которую наряжают один раз в году?`)
	z[context.chatId]  = `ёлка`
}
if (otvet == 18) {
	ctx.send(`Ищет он во тьме маяк, потому что он... `)
	z[context.chatId]  = `моряк`
}
if (otvet == 19) {
	ctx.send(`Из белого камня родится, весь свет будит. `)
	z[context.chatId]  = `петух`
}
if (otvet == 20) {
	ctx.send(`Я цветок сорвать хотел, но цветочек улетел.`)
	z[context.chatId]  = `бабочка`
}
if (otvet == 21) {
	ctx.send(`Живет в нем вся вселенная, а вещь обыкновенная? `)
	z[context.chatId]  = `телевизор`
}
if (otvet == 22) {
	ctx.send(`Кто больше всех кричит, а меньше всех делает? `)
	z[context.chatId]  = `петух`
}
if (otvet == 23) {
	ctx.send(`Один глаз, один рог, но не носорог?`)
	z[context.chatId]  = `корова`
}
if (otvet == 24) {
	ctx.send(`Кругом вода, а с питьем беда`)
	z[context.chatId]  = `море`
}
if (otvet == 25) {
	ctx.send(`Зубов много, а ничего не ест.`)
	z[context.chatId]  = `расческа`
}
if (otvet == 26) {
	ctx.send(`Что это у Галочки? \n Ниточка на палочке, \n Палочка в руке, \n А ниточка в реке.`)
	z[context.chatId]  = `удочка`
}
if (otvet == 27) {
	ctx.send(`Я легкий как перышко, но долго меня не удержишь.`)
	z[context.chatId]  = `вдох`
}
if (otvet == 28) {
	ctx.send(`Не ездок, а со шпорами, не сторож, а всех будит`)
	z[context.chatId]  = `петух`
}
if (otvet == 29) {
	ctx.send(`В этот месяц таит все, в этот месяц снег идёт, в этот месяц все теплей, в этот месяц женский день.`)
	z[context.chatId]  = `март`
}
if (otvet == 30) {
	ctx.send(`Сидел на заборе, пел да кричал, а как все собрались, взял да замолчал`)
	z[context.chatId]  = `петух`
}
if (otvet == 31) {
	ctx.send(`Не лает, не кусает, а к будке привязана.`)
	z[context.chatId]  = `цепь`
}
if (otvet == 32) {
	ctx.send(`В лесу тяп-тяп, дома ляп-ляп, на колени возьмешь - заплачет.`)
	z[context.chatId]  = `балалайка`
}
if (otvet == 33) {
	ctx.send(`Утка в море, хвост на заборе.`)
	z[context.chatId]  = `ковш`
}
if (otvet == 34) {
	ctx.send(`В нее льется, из нее льется, сама по земле плетется.`)
	z[context.chatId]  = `река`
}
if (otvet == 35) {
	ctx.send(`Маленькая собачка свернувшись лежит - \n Не лает, не кусает, а в дом не пускает.`)
	z[context.chatId]  = `замок`
}
if (otvet == 36) {
	ctx.send(`Все время стучит, деревья долбит. \n Но их не калечит, а только лечит.`)
	z[context.chatId]  = `дятел`
}
if (otvet == 37) {
	ctx.send(`Протянулся мост на семь верст, \n А в конце моста - золотая верста.`)
	z[context.chatId]  = `неделя`
}
if (otvet == 38) {
	ctx.send(`Если б встала, до неба достала б.`)
	z[context.chatId]  = `дорога`
}
if (otvet == 39) {
	ctx.send(`К вечеру умирает, по утру оживает.`)
	z[context.chatId]  = `день`
}
if (otvet == 40) {
	ctx.send(`Пыль увижу - заворчу, заверчу и проглочу.`)
	z[context.chatId]  = `пылесос`
}
if (otvet == 41) {
	ctx.send(`В Москве говорят, а у нас слышно.`)
	z[context.chatId]  = `радио`
}
if (otvet == 42) {
	ctx.send(`Все меня топчут, а я все лучше.`)
	z[context.chatId]  = `тропинка`
}
if (otvet == 43) {
	ctx.send(`Вчера было, сегодня есть и завтра будет.`)
	z[context.chatId]  = `время`
}
if (otvet == 44) {
	ctx.send(`Каким инструментом можно щи хлебать?`)
	z[context.chatId]  = `ложка`
}
if (otvet == 45) {
	ctx.send(`Что возвратить нельзя?`)
	z[context.chatId]  = `время`
}
if (otvet == 46) {
	ctx.send(`Стою на крыше, всех труб выше.`)
	z[context.chatId]  = `антенна`
}
if (otvet == 47) {
	ctx.send(`Днем спит, ночью летает.`)
	z[context.chatId]  = `сова`
}
if (otvet == 48) {
	ctx.send(`Дом из жести, а жильцы в нем - вести.`)
	z[context.chatId]  = `почтовый`
}
if (otvet == 49) {
	ctx.send(`На шесте - дворец, во дворце - певец.`)
	z[context.chatId]  = `скворец`
}
if (otvet == 50) {
	ctx.send(`Что за кузнецы в лесу куют?`)
	z[context.chatId]  = `дятел`
}
if (otvet == 51) {
	ctx.send(`Каким гребешком никто не причесывается?`)
	z[context.chatId]  = `петушинным`
}
if (otvet == 52) {
	ctx.send(`Что за судья без языка?`)
	z[context.chatId]  = `весы`
}
if (otvet == 53) {
	ctx.send(`На чужой спине едет, а на своей груз везет.`)
	z[context.chatId]  = `седло`
}
if (otvet == 54) {
	ctx.send(`Очень любят молодца, а бьют, колотят без конца.`)
	z[context.chatId]  = `мяч`
}
if (otvet == 55) {
	ctx.send(`В брюхе – баня, в носу – решето, на голове – пуп. Рука одна, да и та на спине. Что это?`)
	z[context.chatId]  = `чайник`
}
if (otvet == 56) {
	ctx.send(`Течет-течет — не вытечет; бежит-бежит — не вы­бежит.`)
	z[context.chatId]  = `река`
}
if (otvet == 57) {
	ctx.send(`Два раза родился, ни разу не крестилка, всем людям пророк`)
	z[context.chatId]  = `петух`
}
if (otvet == 58) {
	ctx.send(`Сам дней не знает, а другим указывает.`)
	z[context.chatId]  = `календарь`
}
if (otvet == 59) {
	ctx.send(`Железная нога – это …`)
	z[context.chatId]  = `кочерга`
}
if (otvet == 60) {
	ctx.send(`Сколько горошин может войти в один стакан?`)
	z[context.chatId]  = `нисколько`
}
if (otvet == 61) {
	ctx.send(`Золотое решето, черных домиков полно.`)
	z[context.chatId]  = `язык`
}
if (otvet == 62) {
	ctx.send(`Как правильно говорить: "не вижу белый желток" или "не вижу белого желтка"?`)
	z[context.chatId]  = `никак`
}
if (otvet == 63) {
	ctx.send(`Что это такое: летит, шуршит, а не шуршавчик?`)
	z[context.chatId]  = `брат`
}
if (otvet == 64) {
	ctx.send(`С хвостом, а за хвост не поднимешь`)
	z[context.chatId]  = `клубок`
}
if (otvet == 65) {
	ctx.send(`Какое слово начинается с трех букв "Г" и заканчивается тремя буквами "Я"? `)
	z[context.chatId]  = `тригонометрия`
}
if (otvet == 65) {
	ctx.send(`И рать, и воеводу — всех повалил.`)
	z[context.chatId]  = `сон`
}
if (otvet == 66) {
	ctx.send(`Между двух светил сижу я один.`)
	z[context.chatId]  = `нос`
}
if (otvet == 66) {
	ctx.send(`На ушах висят, а не сережки.`)
	z[context.chatId]  = `наушники`
}
if (otvet == 67) {
	ctx.send(`Когда он нужен, его выбрасывают. Когда не нужен – поднимают.`)
	z[context.chatId]  = `якорь`
}
if (otvet == 68) {
	ctx.send(`Что достанет зубами затылок?`)
	z[context.chatId]  = `расчестка`
}
if (otvet == 69) {
	ctx.send(`Что слаще всего на свете? `)
	z[context.chatId]  = `сон`
}
if (otvet == 70) {
	ctx.send(`Узловат Кузьма, развязать нельзя. `)
	z[context.chatId]  = `цепь`
}
if (otvet == 71) {
	ctx.send(`Без ног и без рук, \n А художник еще тот. `)
	z[context.chatId]  = `мороз`
}
if (otvet == 72) {
	ctx.send(`Без ног и без рук, \n А художник еще тот. `)
	z[context.chatId]  = `мороз`
}
if (otvet == 73) {
	ctx.send(`С виду — клин, а развернешь — блин`)
	z[context.chatId]  = `зонт`
}
if (otvet == 74) {
	ctx.send(`Языка нет, а правду скажет`)
	z[context.chatId]  = `зеркало`
}
if (otvet == 74) {
	ctx.send(`Выпустить можно, поймать нельзя.`)
	z[context.chatId]  = `слово`
}
if (otvet == 75) {
	ctx.send(`Днем есть, ночью нет.`)
	z[context.chatId]  = `тень`
}
if (otvet == 76) {
	ctx.send(`Стоит вода в пробирке, выпьешь, умрешь.`)
	z[context.chatId]  = `яд`
}
if (otvet == 77) {
	ctx.send(`Можно ли зажечь спичку под водой?`)
	z[context.chatId]  = `да`
}
if (otvet == 78) {
	ctx.send(`Полтора судака стоят полтора рубля. Сколько стоят 13 судаков?`)
	z[context.chatId]  = `13`
}
if (otvet == 79) {
	ctx.send(`У семерых братьев по сестре. Сколько всего сестер?`)
	z[context.chatId]  = `одна`
}
if (otvet == 80) {
	ctx.send(`На дереве сидело 10 птиц. Пришел охотник и подстрелил одну птицу. Сколько птиц осталось на дереве?`)
	z[context.chatId]  = `0`
}
if (otvet == 81) {
	ctx.send(`На столе лежали три огурца и четыре яблока. Ребенок взял со стола одно яблоко. Сколько фруктов осталось на столе?`)
	z[context.chatId]  = `3`
}
if (otvet == 82) {
	ctx.send(`Сколько раз встречается цифра 4 в целых числах от 1 до 50?`)
	z[context.chatId]  = `15`
}
if (otvet == 83) {
	ctx.send(`На руках десять пальцев. Сколько пальцев на десяти руках?`)
	z[context.chatId]  = `50`
}
if (otvet == 84) {
	ctx.send(`Сколько раз можно вычесть 3 из 25?`)
	z[context.chatId]  = `один`
}
if (otvet == 85) {
	ctx.send(`В 12-этажном доме есть лифт. На первом этаже живёт всего 2 человека, от этажа к этажу количество жильцов увеличивается вдвое. Какая кнопка в лифте этого дома нажимается чаще других?`)
	z[context.chatId]  = `1`
}
if (otvet == 86) {
	ctx.send(`Пара лошадей пробежала 20 километров. Вопрос: сколько километров пробежала каждая лошадь в отдельности?`)
	z[context.chatId]  = `20`
}
if (otvet == 87) {
	ctx.send(`Что может в одно и то же время: стоять и ходить, висеть и стоять, ходить и лежать?`)
	z[context.chatId]  = `часы`
}
if (otvet == 88) {
	ctx.send(`Что у человека может за несколько секунд увеличиться в диаметре в 7 раз?`)
	z[context.chatId]  = `зрачок`
}
if (otvet == 89) {
	ctx.send(`Эту загадку часто предлагают детям. Но иногда взрослые могут долго ломать голову, чтобы догадаться, как решить такую задачку, поэтому можно устроить конкурс: предложить всем желающим попытаться решить задачку. Тот, кто догадается, независимо от возраста, заслуживает приз. Вот задача: \n 6589 = 4; 5893 = 3; 1236 = 1; 1234 = 0; 0000 = 4; 5794 = 1; 1111 = 0; 4444 = 0; 7268 = 3; 1679 = 2; 3697 = 2 \n 2793 = 1; 4895 = 3 \n Вопрос: 5894 = ?`)
	z[context.chatId]  = `4`
}
if (otvet == 90) {
	ctx.send(`Уставший человек хотел выспаться. Он собрался лечь спать в 8 часов вечера и завел будильник на десять часов утра. Сколько часов он будет спать до звонка?`)
	z[context.chatId]  = `один`
}
if (otvet == 91) {
	ctx.send(`А сколько нужно произвести действий, чтобы посадить жирафа в холодильник?`)
	z[context.chatId]  = `4`
}
if (otvet == 92) {
	ctx.send(`Чем кончаются день и ночь?`)
	z[context.chatId]  = `ь`
}
if (otvet == 93) {
	ctx.send(`Маленький, серенький, на слона похож. Кто?`)
	z[context.chatId]  = `слонёнок`
}
if (otvet == 94) {
	ctx.send(`Что исчезает, как только это назовешь?`)
	z[context.chatId]  = `тишина`
}
if (otvet == 95) {
	ctx.send(`Девочка Нуми, с планеты Пирра, задает земному мальчику Ники загадку:
Один глоф и две мулфы весят, сколько один дабел и четыре лаци. В свою очередь, один дабел весит столько же, сколько два лаци. Один глоф и три лаци весят вместе, сколько один дабел, две мулфы и шесть крак. Один глоф весит, сколько два дабела. Спрашивается, сколько крак нужно добавить к одной мулфе, чтобы получить вес двух дабелов и одного лаци?`)
	z[context.chatId]  = `восемь`
}
if (otvet == 96) {
	ctx.send(`Что исчезает, как только это назовешь?`)
	z[context.chatId]  = `тишина`
}
if (otvet == 97) {
	ctx.send(`Что в России на первом месте, а во Франции на втором?`)
	z[context.chatId]  = `р`
}
if (otvet == 98) {
	ctx.send(`На край стола поставили жестяную банку, плотно закрытую крышкой, так, что 2/3 банки свисало со стола. Через некоторое время банка упала. Что было в банке?`)
	z[context.chatId]  = `лёд`
}
if (otvet == 99) {
	ctx.send(`Когда женщина ногу поднимает, что видишь? Пять букв, на П начинается, на А кончается.`)
	z[context.chatId]  = `пятка`
}
if (otvet == 100) {
	ctx.send(`Что у женщины на теле, у еврея на уме, применяется в хоккее и на шахматной доске?`)
	z[context.chatId]  = `пятка`
}
if (otvet == 101) {
	ctx.send(`Что имеет голову, но не имеет мозгов?`)
	z[context.chatId]  = `лук`
}
if (otvet == 102) {
	ctx.send(`Бежать, бежать – не добежать, \n Лететь, лететь – не долететь.`)
	z[context.chatId]  = `горизонт`
}
if (otvet == 103) {
	ctx.send(`Синенькая шубёнка – \n Весь мир покрыла.`)
	z[context.chatId]  = `небо`
}




await context.send(`Для ответа пишите ответ << ваш ответ >>`)
});


updates.hear(/^\Ответ (.*)\s*$/i, async (context) => {
ovv = context.$match[1]
CODE = `${CODE = `${getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) + getRandomElement(["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9"]) }`}`
if (	z[context.chatId]  == ovv) {
	context.send(`ПРАВИЛЬНО! На ваш счет зачислено 10к \n Ваш баланс: ${ctx.user.balance += 10000} \n Ты отгадал ${ctx.user.riddle += 1} загадок!`)
z[context.chatId] = CODE
e[context.chatId] = 0
};
await ctx.send(`НЕВЕРНО!`)
})
updates.hear(/^\Ответ\s*$/i, async (context) => {
if (ctx.user.permission >= 3) return context.send(`Ответ на загадку >> ${z[ctx.chatId]}`);
if (ctx.user.permission <= 2) return ctx.send(`Для использования этой команды нужна привелегия << СТМОДЕР >>`)
})
updates.hear(/^\кикни (.+)\s*$/i, async (context) => {
if (context.user.permission < 6) return context.send(`У вас нет на это прав!`);
let user = await snippets.resolveResource(context.$match[1])
if(!user) return context.send('Пользователь не найден или является группой')
try {
await api.messages.removeChatUser({chat_id: context.chatId, member_id: user.id })
return context.send('Готово!')
} catch (e) {
console.log(e)
return context.send('Произошла ошибка')
}
})
updates.hear(/^\Экспедиции (1\s*$)/i, async (context) => {
    if (context.user.top < 300) return context.send(`У вас нет опыта, что бы участвовать в экспедициях нужно: 300`);		
    if (context.user.balance < 66000) return context.send(`У вас нет стольки монет!`);		
await context.send(`Вы отправились в экспедицию по Африке \n Длительность: 2 часа \n Вы можете найти: от 1.000 до 100.000`)	
context.user.balance -= 66000
 setTimeout(() => { 
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname}) экспедиция закончилась, вы нашли: ${context.user.test3 = getRandomInt(10000,100000)} \n Ваш баланс: ${context.user.balance += context.user.test3}`}) 
}, 7200000)
});
updates.hear(/^\Экспедиции (2)\s*$/i, async (context) => {
    if (context.user.top < 300) return context.send(`У вас нет опыта, что бы участвовать в экспедициях нужно: 300`);		
    if (context.user.balance < 96000) return context.send(`У вас нет стольки монет!`);		
await context.send(`Вы отправились в экспедицию по Америке \n Длительность: 2 часа \n Вы можете найти: от 40.000 140.000`)	
context.user.balance -= 96000
 setTimeout(() => { 
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname}) экспедиция закончилась, вы нашли: ${context.user.test3 = getRandomInt(40000,140000)} \n Ваш баланс: ${context.user.balance += context.user.test3}`}) 
}, 7200000)
});
updates.hear(/^\Экспедиции (3)\s*$/i, async (context) => {
    if (context.user.top < 300) return context.send(`У вас нет опыта, что бы участвовать в экспедициях нужно: 300`);		
    if (context.user.balance < 560000) return context.send(`У вас нет стольки монет!`);		
await context.send(`Вы отправились в экспедицию по Греции \n Длительность: 2 часа \n Вы можете найти: от 140.000 1.400.000`)	
context.user.balance -= 560000
 setTimeout(() => { 
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname}) экспедиция закончилась, вы нашли: ${context.user.test3 = getRandomInt(140000,1400000)} \n Ваш баланс: ${context.user.balance += context.user.test3}`}) 
}, 7200000)
});
updates.hear(/^\Экспедиции (4)\s*$/i, async (context) => {
    if (context.user.top < 300) return context.send(`У вас нет опыта, что бы участвовать в экспедициях нужно: 300`);		
    if (context.user.balance < 4000000) return context.send(`У вас нет стольки монет!`);		
await context.send(`Вы отправились в экспедицию по луне \n Длительность: 2 часа \n Вы можете найти: от 990.000 10.400.000`)	
context.user.balance -= 4000000
 setTimeout(() => { 
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname}) экспедиция закончилась, вы нашли: ${context.user.test3 = getRandomInt(990000,10400000)} \n Ваш баланс: ${context.user.balance += context.user.test3}`}) 
}, 7200000)
});

updates.hear(/^Экспедиции\s*$/i, async (context) => {
await context.send(`&#9992;&#65039; Экспедиции: \n 1.Африка, стоимость: 66000 \n 2.Америка, стоимость: 96000 \n 3.Греция, стоимость: 560000 \n 4.Луна, стоимость: 4000000 \n &#128641; Для начала экспедиции пиши "!экспедиция (номер)" \n пример: "экспедиция 1" \n Для экспедиция необходимо не менее 300 очков рейтинга!`)	
});

updates.hear(/^\левел ([0-9]+) игрок\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 0
users[user].role = 'Обычный игрок'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) PLAYER`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам PLAYER `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} VIP $`))
});
updates.hear(/^\левел ([0-9]+) вип\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 1
users[user].role = 'VIP'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) VIP`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам VIP} `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} VIP $`))
});
updates.hear(/^\левел ([0-9]+) модер\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 2
users[user].role = 'МОДЕР'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) модер`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам МОДЕР} `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} МОДЕР $`))
});
updates.hear(/^\левел ([0-9]+) стмодер\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 3
users[user].role = 'СТМОДЕР'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) стмодер`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам СТМОДЕР} `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} МОДЕР $`))
});
updates.hear(/^\левел ([0-9]+) зам\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 4
users[user].role = 'ЗАМ'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) ЗАМ`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам ЗАМ} `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} ЗАМ $`))
});
updates.hear(/^\левел ([0-9]+) админ\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 5
users[user].role = 'Администратор'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) АДМИНИСТРАТОР`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам АДМИН} `}) 
}, 10)
console.log(chalk.grey.underline(`permission: ${context.senderId} выдал ${user} АДМИН $`))
});
updates.hear(/^\левел ([0-9]+) админ\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = 5
users[user].role = 'Администратор'
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) АДМИНИСТРАТОР`)
});
updates.hear(/^\левел ([0-9]+) ([0-9]+)\s*$/i, async (context) => {
    if (context.user.permission < 7) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
const amount = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].permission = amount
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) permission ${amount}`)
});


updates.hear(/^\рейт ([0-9]+) ([0-9]+)\s*$/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
const amount = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].top += Number(amount)
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname})  ${amount} рейтинга!`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам рейтинг: ${amount} `}) 
}, 10)
console.log(chalk.grey.underline(`рейтинг: ${context.senderId} выдал ${user} ${amount} $`))
});

updates.hear(/^\машинаинфо\s*$/i, async (context) => {
return await context.send(`Машина: ${context.user.car} \n Номера: ${context.user.nom}`)
});

updates.hear(/^\промо чистка\s*$/i, async (context) => {
promo = 0
return await context.send(`Промокоды снова могут использовать 5 людей`)
});

updates.hear(/^\рефка ([0-9]+)\s*$/i, async (context) => {
if(0 < context.user.job) return await context.send('Вы не можете стать рефералом!')	
const user = context.$match[1]
if(user == context.senderId) return await context.send('Вы не можете стать своим рефералом!')	
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].res += 1
context.user.balance += users[user].balance * 0.10
context.user.job += 1
context.user.job1=`(${users[user].nickname})`
return await context.send(`  @id${user}(${users[user].nickname}) был приглашен @id${context.senderId}(${context.user.nickname}) `)
});

updates.hear(/^\промо КириллКосыгинГавно\s*$/i, async (context) => {
if(context.user.buy > 0) return await context.send('Вы уже вводили этот промокод!')		

context.user.balance += 15000
context.user.buy += 1
return await context.send(` Вы использовали промокод на 15.000 рублей `)

});




updates.hear(/^\бд сброс\s*$/i, async (context) => {
    if(context.user.permission < 6) return
    for(key in users) {
		users[key].balance = 1000,
		users[key].top = 0,
		users[key].map = 0,
		users[key].bit = 0,
		users[key].sila = 1,
		users[key].xp = 35,
		users[key].weapon = 'НЕТУ',
		users[key].zxp = 5,
		users[key].clan3 = 0,
		users[key].zeat = 100,
		users[key].eat = 1000,
		users[key].zcoint = 1000,
		users[key].yahta = 'НЕТУ',
		users[key].v = 0,
		users[key].channel = "НЕТУ",
		users[key].like = 0,
		users[key].podpiska = 0,
		users[key].time = 0,
		users[key].var = 20,
		users[key].biz2 = 0,
		users[key].clan = 0,
		users[key].clan1 = 0,
		users[key].clan2 = 0,
		users[key].biz1 = 0,
		users[key].mine = 0,
		users[key].btc = 0,
		users[key].buy = 0,
		users[key].stat = 0,
		users[key].chan = 0,
		users[key].test1 = 0,
		users[key].test2 = 0,
		users[key].test3 = 0,
		users[key].test4 = 0,
		users[key].test5 = 0,
		users[key].test6 = 0,
		users[key].test7 = 0,
		users[key].test8 = 0,
		users[key].test9 = 0,
		users[key].zlevel = 0,
		users[key].map = 0,
		users[key].bit = 0,
		users[key].btc = 0,
		users[key].mine = 0,
		users[key].case = 0,
		users[key].miner = 'NO',
		users[key].ban = false,
		users[key].home = `отсутствует`,
		users[key].phone = `отсутствует`,
		users[key].car = `отсутствует`,
		users[key].miner = `отсутствует`,
		users[key].shop = 0,
		users[key].res = 0,
		users[key].job1 = 0,
		users[key].job = 0,
		users[key].warn = 0,
		users[key].bonus = null
	}
    return context.send('База Данных очищена!')	
})

updates.hear(/^\ресет\s*$/i, async (context) => {
    if(context.user.permission < 1) return context.send(`Доступно от ВИП \n Можно купить за ${vip} руб.`);
		context.user.balance = 1000,
		context.user.top = 0,
		context.user.map = 0,
		context.user.bit = 0,
		context.user.sila = 1,
		context.user.xp = 35,
		context.user.weapon = 'НЕТУ',
		context.user.zxp = 5,
		context.user.clan3 = 0,
		context.user.zeat = 100,
		context.user.eat = 1000,
		context.user.zcoint = 1000,
		context.user.yahta = 'НЕТУ',
		context.user.v = 0,
		context.user.channel = "НЕТУ",
		context.user.like = 0,
		context.user.podpiska = 0,
		context.user.time = 0,
		context.user.var = 20,
		context.user.biz2 = 0,
		context.user.clan = 0,
		context.user.clan1 = 0,
		context.user.clan2 = 0,
		context.user.biz1 = 0,
		context.user.mine = 0,
		context.user.btc = 0,
		context.user.buy = 0,
		context.user.stat = 0,
		context.user.chan = 0,
		context.user.test1 = 0,
		context.user.test2 = 0,
		context.user.test3 = 0,
		context.user.test4 = 0,
		context.user.test5 = 0,
		context.user.test6 = 0,
		context.user.test7 = 0,
		context.user.test8 = 0,
		context.user.test9 = 0,
		context.user.zlevel = 0,
		context.user.maps = 0,
		context.user.bit = 0,
		context.user.btc = 0,
		context.user.mine = 0,
		context.user.case = 0,
		context.user.miner = 'NO',
		context.user.ban = false,
		context.user.home = `отсутствует`,
		context.user.phone = `отсутствует`,
		context.user.car = `отсутствует`,
		context.user.miner = `отсутствует`,
		context.user.shop = 0,
		context.user.res = 0,
		context.user.job1 = 0,
		context.user.job = 0,
		context.user.warn = 0,
		context.user.bonus = null,


    await context.send('Ваши данные очищены!')
})





updates.hear(/^\cброс\s*$/i, async (context) => {
    if(context.user.permission < 5) return
    for(key in users) {
        users[key].stat = 0

    }
	stats = 0
    return context.send('готово')
})
updates.hear(/кейс дать\s*$/i, async (context) => {
    if(context.user.permission < 5) return
    for(key in users) {
        users[key].case += 1

    }
    return context.send('Всем пользователям было вадано по 1 кейсу')
	console.log(chalk.grey.underline(`Всем пользователям было вадано по 1 кейсу!`))
})

updates.hear(/^\!cброс/i, async (context) => {
    if(context.user.permission < 5) return
    for(key in users) {
        users[key].stat = 0

    }
	stats = 0
    return context.send('готово')
})
updates.hear(/^\!ответить ([0-9]+) (.*)/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
const user = context.$match[1]

    await context.send('Ответ отправлен!')
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `Администрация ответила на ваш репорт:  ${context.text.slice(19, 80)} \n С Уважением, Администрация Бот | Хиро
`}) 
}, 10)
console.log(chalk.grey.underline(`ОТВЕТ: ${context.senderId} ответил ${user}:  ${context.text.slice(19, 80)}`))
});
updates.hear(/^\смс ([0-9]+) (.*)/i, async (context) => {
    if (context.user.balance < 500) return context.send(`Вам нехватает средств на отправку смс!`);
const user = context.$match[1]
context.user.balance -= 500
    await context.send('SMS отправлен!')
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `${context.senderId} отправил вам СМС:  ${context.text.slice(4, 80)} `}) 
}, 10)
});
updates.hear(/^\репорт (.*)/i, async (context) => {	
    await context.send('Репорт отправлен, в скором времени мы на него ответим!')
setTimeout(() => { 
vk.api.messages.send({chat_id: 74, message: `@id${context.senderId}(${context.user.nickname}) сделал репорт:  ${context.text.slice(7, 100)} \n id: ${context.senderId} `}) 
}, 10)
console.log(chalk.grey.underline(`РЕПОРТ: ${context.senderId} сделал реопрт: ${context.text.slice(7, 100)}`))
});


updates.hear(/^\!объявление ([0-9]+) (.*)/i, async (context) => {
    if (context.user.permission < 3) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
    await context.send('Объявление сделано!')
setTimeout(() => { 
vk.api.messages.send({chat_id: user, message: `@id${context.senderId}(${context.user.nickname}) сделал объявление:  ${context.text.slice(13, 80)} `}) 
}, 10)
console.log(chalk.grey.underline(`${context.senderId} сделал обновление`))
});

updates.hear(/^\админ\s*$/i, async (context) => {
    if (context.user.permission == 0) return context.send(`У вас нет таких команд!`);
    if (context.user.permission == 1) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 🍖 датьеду -> выдать себе еду \n --{ 📘 профиль <<ID>> -> посмотреть профиль пользователя`);
    if (context.user.permission == 2) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя`);
    if (context.user.permission == 3) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя \n --{ 💷 give <<СУММА 0-3000>> <<ID>> -> выдать пользователю деньги \n --{ 📋 ответ -> узнать ответ от загадки \n --{ 📕 объявление <<CHAT_ID>> <<TEXT>> -> сделать объявление в беседу`);
    if (context.user.permission == 4) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя \n --{ 💷 give <<СУММА 0-3000>> <<ID>> -> выдать пользователю деньги \n --{ 📋 ответ -> узнать ответ от загадки \n --{ 📕 объявление <<CHAT_ID>> <<TEXT>> -> сделать объявление в беседу`);
    if (context.user.permission == 5) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя \n --{ 💷 give <<СУММА 0-3000>> <<ID>> -> выдать пользователю деньги \n --{ 📋 ответ -> узнать ответ от загадки \n --{ 📕 объявление <<CHAT_ID>> <<TEXT>> -> сделать объявление в беседу \n --{ 💶 выдать <<кол-во>> -> выдать себе деньги \n --{ 💵 выдать <<КОЛ-ВО>> <<ID>> -> Выдать пользователю деньги \n --{ 🍖 датьеду <<кол-во>> -> выдать себе любое кол-во еды \n --{ 🍕 едау <<КОЛ-ВО>> <<ID>> -> установить еду пользователю \n --{ 🎰 кейс выдать <<ID>> (1-2) <<КОЛ-ВО>> \n --{ 🔦 левел <<ID>> вип/модер/стмодер/админ -> выдать привелегию пользователю \n --{ 📠 префикс <<TEXT>> -> установить себе роль \n --{ 📌 добавить/удалить <<ID>> -> разбанить/забанить пользователя \n --{ 📊 рейт <<КОЛ-ВО>> <<ID>> -> выдать рейтинг пользователю`);
    if (context.user.permission == 6) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя \n --{ 💷 give <<СУММА 0-3000>> <<ID>> -> выдать пользователю деньги \n --{ 📋 ответ -> узнать ответ от загадки \n --{ 📕 объявление <<CHAT_ID>> <<TEXT>> -> сделать объявление в беседу \n --{ 💶 выдать <<кол-во>> -> выдать себе деньги \n --{ 💵 выдать <<КОЛ-ВО>> <<ID>> -> Выдать пользователю деньги \n --{ 🍖 датьеду <<кол-во>> -> выдать себе любое кол-во еды \n --{ 🍕 едау <<КОЛ-ВО>> <<ID>> -> установить еду пользователю \n --{ 🎰 кейс выдать <<ID>> (1-2) <<КОЛ-ВО>> \n --{ 💿 eval <<EVAL CMD>> -> выполнить опр. код \n --{ 📝 ответить <<ID>> -> ответ на репорт \n --{ рассылка <<TEXT>> - сделать рассылку \n --{ 📈 левел <<ID>> <<PERMISSION>> -> установить permission пользователю \n --{ 🐩 кикни <<ID>> -> кикнуть пользователя из беседы`);
    if (context.user.permission == 7) return context.send(` --{ 📜 Ваша привелегия >> ${ctx.user.role} \n --{ 💎 ID привелегии >> ${ctx.user.permission}\n --{ 📄 ресет -> очистить свои данные \n --{ 📝 ник <<новое имя>> -> сменить свой игровой ник \n --{ 💌 написать <<ID>> <<TEXT>> -> написать сообщение пользователю \n --{ 🎫 инфо <<ссылка>> -> узнать ID пользователя \n --{ 💷 give <<СУММА 0-3000>> <<ID>> -> выдать пользователю деньги \n --{ 📋 ответ -> узнать ответ от загадки \n --{ 📕 объявление <<CHAT_ID>> <<TEXT>> -> сделать объявление в беседу \n --{ 💶 выдать <<кол-во>> -> выдать себе деньги \n --{ 💵 выдать <<КОЛ-ВО>> <<ID>> -> Выдать пользователю деньги \n --{ 🍖 датьеду <<кол-во>> -> выдать себе любое кол-во еды \n --{ 🍕 едау <<КОЛ-ВО>> <<ID>> -> установить еду пользователю \n --{ 🎰 кейс выдать <<ID>> (1-2) <<КОЛ-ВО>> \n --{ 💿 eval <<EVAL CMD>> -> выполнить опр. код \n --{ 📝 ответить <<ID>> -> ответ на репорт \n --{ рассылка <<TEXT>> - сделать рассылку \n --{ 📈 левел <<ID>> <<PERMISSION>> -> установить permission пользователю \n --{ 🐩 кикни <<ID>> -> кикнуть пользователя из беседы`);
});

updates.hear(/^\написать ([0-9]+) (.*)/i, async (context) => {
    if (context.user.permission < 2) return context.send(`У вас нет на это прав!`);	
const user = context.$match[1]
    await context.send('Объявление сделано!')
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) написал вам письмо:  ${context.text.slice(19, 80)} `}) 
}, 10)
});







updates.hear(/^\шар (.*)/i, async (context) => {
		await context.send(
			getRandomElement(["Возможно","Не уверен","Есть вероятность","знаки говорят - нет", "спроси позже", "нет", "лучше не рассказывать", "можешь быть уверен в этом", "мой ответ - нет", "сейчас нельзя предсказать"])
			);
	
})
updates.hear(/^\шар/i, async (context) => {
		await context.send(`Используй шар <<фраза>>`);
	
})
updates.hear(/^\бизнес создать (.*)/i, async (context) => {
	biz23 = ctx.user.bizlevel * 1000
    if (context.user.top < 120) return context.send(`Что бы создать бизнес, надо минимум 120 рейтинга!`);	
context.user.test1 = `${context.text.slice(15, 20)}`	
 await context.send(`@id${context.senderId}(${context.user.nickname}) вы создали бизнес: ${context.user.test1}`)	
function intervalFunc() {
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname})  ваш бизнес принес вам: ${context.user.test2 = getRandomInt(100,ctx.user.biz23)}, \n Ваш баланс: ${context.user.balance += context.user.test2}`}) 
}

setInterval(intervalFunc, 3600000);
});
updates.hear(/^\бизнес улучшить\s*$/i, async (context) => {
    if (context.user.test1 == 0) return context.send(`У вас нет бизнеса!`);	
    if (context.user.top < ctx.user.bizlevel * 20) return context.send(`У вас нехватка рейтинга!`);
    if (context.user.balance < ctx.user.bizlevel * 15000) return context.send(`У вас нехватка денег!`);	
 await context.send(`Ваш бизнес: ${context.user.test1} \nУровеь бизнеса: ${ctx.user.bizlevel += 1}\nЗарабаток до: ${ctx.user.bizlevel}000\n \n \n \n \n`)	
});
updates.hear(/^\бизнес\s*$/i, async (context) => {
    if (context.user.test1 == 0) return context.send(`У вас нет бизнеса!`);	
 await context.send(`Ваш бизнес: ${context.user.test1} \nУровеь бизнеса: ${ctx.user.bizlevel}\nЗарабаток до: ${ctx.user.bizlevel}000\nУлучшение: Рейтинг: ${ctx.user.bizlevel * 20}\n Денег: ${ctx.user.bizlevel * 15000}\n \n \n`)	
});


updates.hear(/^\биз создать (.*)/i, async (context) => {
    if (context.user.top < 120) return context.send(`&#9888;&#65039; Что бы создать бизнес, надо минимум 120 рейтинга!`);	
    if (context.user.biz1 > 0) return context.send(`&#9888;&#65039; У вас уже есть свой бизнес!`);		
context.user.test1 = `${context.text.slice(12, 20)}`	
context.user.biz1 += 1
clearTimeout(intervalFunc);
 await context.send(`@id${context.senderId}(${context.user.nickname}) вы создали бизнес: ${context.user.test1}`)	
function intervalFunc() {
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname})  ваш бизнес принес вам: ${context.user.test2 = getRandomInt(10,4000)}, \n Ваш баланс: ${context.user.balance += context.user.test2}`}) 
}

setInterval(intervalFunc, 3600000);
});

updates.hear(/реши ([0-9]+)/i, async (context) => {
	await context.send(`ответ: ${eval(context.text.replace(/\реши(\s*)?/gi, "").replace(":", "/"))}`);
});








updates.hear(/^\работа\s*$/i, async (context) => {
    if (context.user.test4 > 8) return context.send(`У вас есть более высокая работа!`);
    if (context.user.top < 50940) return context.send(`У вас нету 50940 очков рейтинга!`);	
context.user.test4 = 9
context.user.test5 = 'Президент'
clearTimeout(intervalFunc1);
 await context.send(`@id${context.senderId}(${context.user.nickname}) вы устроились на работу: Президент`)	
function intervalFunc1() {
vk.api.messages.send({user_id: context.senderId, message: `Зарплата: 10090500, \n Ваш баланс: ${context.user.balance += 10090500}`}) 
}

setInterval(intervalFunc1, 3600000);
});




updates.hear(/^\рассылка (.*)/i, async (context) => {
    if (context.user.permission < 6) return context.send(`У вас нет на это прав!`);	
    await context.send('Объявление сделано!')
    for(key in users) {
vk.api.messages.send({user_id: key, message: `Рассылка:   ${context.text.slice(9, 800)} `}) 
    }
vk.api.messages.send({chat_id: 1, message: `Рассылка:   ${context.text.slice(9, 800)} `}) 
vk.api.messages.send({chat_id: 2, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 3, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 4, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 5, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 6, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 7, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 8, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 9, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 10, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 11, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 12, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 13, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 14, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 15, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 16, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 17, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 18, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 19, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 20, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 21, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 22, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 23, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 24, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 25, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 26, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 27, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 28, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 29, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 30, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 31, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 32, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 33, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 34, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 35, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 36, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 37, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 38, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 39, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 40, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 41, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 42, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 43, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 44, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 45, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 46, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 47, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 48, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 49, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 50, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 51, message: `Рассылка:   ${context.text.slice(9, 800)} `}) 
vk.api.messages.send({chat_id: 52, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 53, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 54, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 55, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 56, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 57, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 58, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 59, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 60, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 61, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 62, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 63, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 64, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 65, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 66, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 67, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 68, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 70, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 71, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 72, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 73, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 74, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 75, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 76, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 77, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 78, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 79, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 70, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 81, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 82, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 83, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 84, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 85, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 86, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 87, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 88, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 89, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 90, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 91, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 92, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 93, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 94, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 95, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 96, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 97, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 98, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 99, message: `Рассылка:   ${context.text.slice(9, 800)} `})
vk.api.messages.send({chat_id: 100, message: `Рассылка:   ${context.text.slice(9, 800)} `})
});

updates.hear(/^\eval (.*)/i, async (context) => {
    if (context.user.permission <= 6) return context.send(`У вас нет на это прав!`);
let toEval =
context.text.split('eval'); 
toEval = toEval.slice(1).join(''); 
context.reply(`Eval: ${eval(toEval,null,'$#8195;')}`);
});
updates.hear(/^\Выдать ([0-9]+) ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
const amount = context.$match[1]
const user = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].balance += Number(amount)
 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) ${amount} монет \n`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам ${amount} монет`}) 
}, 10)
});

updates.hear(/^\Выдать ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
const amount = context.$match[1]
context.user.balance += Number(amount)
 await context.send(`Вам выдано ${amount} монет \n`)
});

updates.hear(/^\кик ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);

const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')

 await context.send(`@id${context.senderId}(${context.user.nickname}) выдал @id${user}(${users[user].nickname}) ${amount} монет \n`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) выдал вам ${amount} монет`}) 
}, 10)
});





updates.hear(/^\установить ([0-9]+) ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
const amount = context.$match[1]
const user = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].balance = Number(amount)
 await context.send(`@id${context.senderId}(${context.user.nickname}) установил ${amount} монет @id${user}(${users[user].nickname})!`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) устоновил вам ${amount} монет`}) 
}, 10)
});
updates.hear(/^\едау ([0-9]+) ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
const amount = context.$match[1]
const user = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].eat = Number(amount)
 await context.send(`@id${context.senderId}(${context.user.nickname}) установил ${amount} еды @id${user}(${users[user].nickname})!`)
setTimeout(() => { 
vk.api.messages.send({user_id: user, message: `@id${context.senderId}(${context.user.nickname}) устоновил вам ${amount} еды!`}) 
}, 10)
});
updates.hear(/^\война ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов

const amount = context.$match[1]
    if (context.user.balance < amount) return context.send(`У вас нет таких средств!`);
    if (amount < 100) return context.send(`Ставка должна быть не меньше 100$!`);	
    if (context.user.var < 1) return context.send(`У вас нету войск для похода Наймите их командой нанять`);	
 await context.send(`Вы отправились в поход на 2 часа, \n У вас с собой: \n Баланс: ${amount} $ \n Машина: ${context.user.car} \n Войск: ${context.user.var}!`)
 setTimeout(() => { 
 context.user.var -= getRandomInt(1,20)
 context.user.v = getRandomInt(1,10) 
 context.user.coint = getRandomInt(context.$match[1])
vk.api.messages.send({user_id: context.senderId, message: `@id${context.senderId}(${context.user.nickname}) Вы вернулись с войны, у вас осталось: \n  баланс: ${context.user.coint} $\n Всего: ${context.user.balance += context.user.coint}  $ \n Получено: ${context.user.v} рейтинга \n Всего рейтинга: ${context.user.top += context.user.coint} \n Машина: ${ context.user.car } \n Осталось солдат: ${context.user.var += getRandomInt(3)}`}) 
}, 3600)

});
updates.hear(/^\нанять\s*$/i, async (context) => {
    if (context.user.balance < 100000) return context.send(`У вас нет таких средств!`);
context.user.balance -= 100000
context.user.var += 5
 await context.send(`Вы наняли 5 войсков, \n всего войск: ${context.user.var}!`)

});

updates.hear(/^\замок улучшить ([0-9]+)/i, async (context) => {
	  const amount = context.$match[1]
    if (context.user.zlevel > 120) return context.send(`У вас макс. уровень ${context.user.zlevel = 120}!`);	
    if (context.user.balance < context.user.zcoint * amount) return context.send(`У вас нет таких средств!`);	
   if (context.user.eat < context.user.zeat * amount) return context.send(`У вас нехватает еды!`);	   
   context.user.balance -= context.user.zcoint * amount
   context.user.eat -= context.user.zeat    * amount
 await context.send(`&#9989; Вы улучшили замок до ${context.user.zlevel += 1 * amount} lvl, \n След. улучшение будет стоить: ${context.user.zcoint += 3000 * amount}$ и ${context.user.zeat += 100 * amount} еды \n &#128481; Сила удара: ${context.user.sila += 1 * amount} xp \n xp: ${context.user.zxp += 5 * amount}`)
 context.user.xp = context.user.zxp
   
});

updates.hear(/^\замок улучшить\s*$/i, async (context) => {
    if (context.user.zlevel >= 120) return context.send(`У вас макс. уровень ${context.user.zlevel = 120}!`);	
    if (context.user.balance < context.user.zcoint) return context.send(`У вас нет таких средств!`);	
   if (context.user.eat < context.user.zeat) return context.send(`У вас нехватает еды!`);	   
   context.user.balance -= context.user.zcoint
   context.user.eat -= context.user.zeat   
 await context.send(`&#9989; Вы улучшили замок до ${context.user.zlevel += 1} lvl, \n След. улучшение будет стоить: ${context.user.zcoint += 3000}$ и ${context.user.zeat += 100} еды \n &#128481; Сила удара: ${context.user.sila += 1} xp \n xp: ${context.user.zxp += 5}`)
 context.user.xp = context.user.zxp
   
});



updates.hear(/^\замок\s*$/i, async (context) => {
    if (context.user.zlevel >= 121) return context.send(`У вас макс. уровень ${context.user.zlevel = 120}!`);	
 await context.send(`&#128333; Замок: \n Уровень: ${context.user.zlevel} \n &#128130; Войска: ${context.user.var} \n &#127835; Еда: ${context.user.eat}, \n Улучшение стоит: ${context.user.zcoint}$ и ${context.user.zeat} еды \n &#128481; Сила удара: ${context.user.sila} xp \n У тебя ХР: ${context.user.xp} `)
 context.user.xp = context.user.zxp
});
updates.hear(/^\ютуб создать (.*)/i, async (context) => {
   if (context.user.chan > 1) return context.send(`У вас уже есть канал!`);
text2 = context.text.slice(13,36)
aaa = text2.replace(/(.com|.ru|https:|www.|.net|.рф|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m)/g,"?");   
 await context.send(`Вы создали канал: ${aaa}`)
 context.user.podpiska = 1
 context.user.channel = aaa
 context.user.like = 1
 context.user.chan = 2
 context.user.time = 0
 context.user.like = 0
});
updates.hear(/^\ютуб удалить\s*$/i, async (context) => {
   if (context.user.chan < 1) return context.send(`У вас уже нет канала!`);		
 await context.send(`Вы удалили канал: ${context.user.channel}`)
 context.user.podpiska = 1
 context.user.channel = ``
 context.user.like = 0
 context.user.chan = 0
 context.user.time = 0
 context.user.like = 0
});



updates.hear(/^\ютуб стрим\s*$/i, async (context) => {
   if (context.user.translite == 0) return context.send(`Вы снимаете стрим слишком часто!`);	
   if (context.user.chan < 1) return context.send(`У вас нет канала!`);			
   podpiska2 = getRandomInt(1,10)
      context.user.translite = 0
 await context.send(`Вы сделали стрим \n Вам задонатили: ${yt1 = getRandomInt(100,2000)}\n Ваш баланс: ${context.user.balance += yt1} \n Новых подписчиков: ${podpiska2} \n Всего подписчиков: ${context.user.podpiska += podpiska2}`)
setTimeout(() => { 
context.user.translite = 1 
}, 5000)
});

updates.hear(/^\ютуб видео\s*$/i, async (context) => {
   if (context.user.video == 0) return context.send(`Вы снимаете видео слишком часто!`);		
   if (context.user.chan < 1) return context.send(`У вас нет канала!`);			
   podpiska2 = getRandomInt(1,20)
   context.user.video = 0
 await context.send(`Вы выложили видео в сеть \n Вам пожертвовали: ${yt1 = getRandomInt(100,2000)}\n Ваш баланс: ${context.user.balance += yt1} \n Новых подписчиков: ${podpiska2} \n Всего подписчиков: ${context.user.podpiska += podpiska2}`)
setTimeout(() => { 
context.user.video = 1 
}, 2000)
});



updates.hear(/^\ютуб\s*$/i, async (context) => {
   if (context.user.chan < 1) return context.send(`У вас нет канала!`);			
 await context.send(`&#128333; Канал YouTube: \n Канал: ${context.user.channel} \n Подписчиков: ${context.user.podpiska} \n Лайков: ${context.user.like}, \n Просмотров: ${context.user.time}$ `)

});











updates.hear(/^\покушать\s*$/i, async (context) => {
   if (context.user.eat < 100) return context.send(`У вас нехватает еды!`);		
 await context.send(`&#127835; Еда: ${context.user.eat -= 100} \n Ваше хп: ${ context.user.zxp}`)
context.user.xp = context.user.zxp
});



 updates.hear(/^\еда купить 01\s*$/i, async (context) => {
    if (context.user.balance < 400) return context.send(`Вам нехватает ${context.user.balance - 400}$!`);		 		
	context.user.balance -= 400
 await context.send(`&#127835; Вы купили Яблоко, теперь у вас ${context.user.eat += 10} еды.`)
});
 updates.hear(/^\еда купить 02\s*$/i, async (context) => {
    if (context.user.balance < 650) return context.send(`Вам нехватает ${context.user.balance - 650}$!`);		 		
	context.user.balance -= 650
 await context.send(`&#127835; Вы купили Пельмешки, теперь у вас ${context.user.eat += 20} еды.`)
});
 updates.hear(/^\еда купить 03\s*$/i, async (context) => {
    if (context.user.balance < 900) return context.send(`Вам нехватает ${context.user.balance - 900}$!`);		 		
	context.user.balance -= 900
 await context.send(`&#127835; Вы купили Мясо, теперь у вас ${context.user.eat += 30} еды.`)
});
 updates.hear(/^\еда купить 04 ([0-9]+)/i, async (context) => {
const amount = context.$match[1]
    if (context.user.balance < 1150 * amount) return context.send(`Вам нехватает ${context.user.balance - 1150 * amount}$!`);	  	
	context.user.balance -= 1150 * amount
 await context.send(`&#127835; Вы купили Хлеб, теперь у вас ${context.user.eat += 40 * amount} еды.`)
});
 updates.hear(/^\еда купить 04\s*$/i, async (context) => {
    if (context.user.balance < 1150) return context.send(`Вам нехватает ${context.user.balance - 1150}$!`);	 	
	context.user.balance -= 1150
 await context.send(`&#127835; Вы купили Хлеб, теперь у вас ${context.user.eat += 40} еды.`)
});

 updates.hear(/^\еда купить ([0-9]+)/i, async (context) => {
 await context.send(`&#10060; Такого товара не существует!`)
});



 updates.hear(/^\датьеду ([0-9]+)/i, async (context) => {
    if (context.user.permission < 6)  return context.send(`&#10060; Нужны права разработчика!!`)
const amount = context.$match[1]	 		
		await context.send(`Вам выдано ${amount} еды \n У вас: ${context.user.eat += amount} еды.`)
});
 updates.hear(/^\датьеду/i, async (context) => {
    if (context.user.permission < 2)  return context.send(`&#10060; НЕТУ ПРАВ!`)	 		
		await context.send(` У вас: ${context.user.eat = 100000} еды.`)
});
 updates.hear(/^\кейс открыть 1\s*$/i, async (context) => {
    if (context.user.case < 1) return context.send(`У вас нету кейсов!`);	 
 await context.send(`Вы открыли кейс: Вам выпало: ${ context.user.case1 = getRandomInt(100,10000) }\n У вас оталось кейсов: ${context.user.case -= 1} `)
 context.user.balance += context.user.case1
});
 updates.hear(/^\кейс открыть 2\s*$/i, async (context) => {
    if (context.user.dcase < 1) return context.send(`У вас нету кейсов!`);	 
 await context.send(`Вы открыли кейс: Вам выпало: permission ${ context.user.permission = getRandomInt(3) }\n У вас оталось кейсов: ${context.user.dcase -= 1} `)
});
 updates.hear(/^\кейс выдать ([0-9]+) 1 ([0-9]+)/i, async (context) => {
	   const user = context.$match[1]
	   const amount = context.$match[3]	   
     if (context.user.permission < 3)  return context.send(`&#10060; НЕТУ ПРАВ!`)
 users[user].case += amount
 await context.send(`Вы выдали ${users[user].nickname} ${amount} case`)
});
 updates.hear(/^\кейс выдать ([0-9]+) 2 ([0-9]+)/i, async (context) => {
 
	   const user = context.$match[1]
	   const amount = context.$match[3]	   
     if (context.user.permission < 3)  return context.send(`&#10060; НЕТУ ПРАВ!`) 
 users[user].dcase += amount
 await context.send(`Вы выдали ${users[user].nickname} ${amount} donat case`)
});


 updates.hear(/^\еда\s*$/i, async (context) => {
 await context.send(`&#127835; У вас всего еды: ${context.user.eat},\n 01. Яблоки | еда +10 | 400$ \n 02. Пельмешки | еда +20 | 650$ \n 03. Мясо | еда +30 | 900$ \n 04. Хлеб | еда +40 | 1150$ \n что бы купить еды пишите еда купить <номер>`)
});
updates.hear(/^\битва ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
  

  const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
    if (context.user.eat < 100) return context.send(`У вас нет еды!`);
    if ( user == context.senderId) return context.send(`Нельзя нападать на самого себя!`);
    if (context.user.xp < 1) return context.send(`У вас нет xp!`);	
	if (users[user].xp < 1) return context.send(`У противника нету хр, вы неможете на него напасть!`);
	if (users[user].zlevel < context.user.zlevel - 2) return context.send(`Вы неможете напасть на того, чей уровень намного ниже вашего!`);	
	if (users[user].zlevel > context.user.zlevel + 2) return context.send(`Вы неможете напасть на того, чей уровень намного выше вашего!`);		
users[user].xp -= context.user.sila
context.user.eat -= 100
 await context.send(`&#10069; Вы напали на ${users[user].nickname} и снесли ему  ${context.user.sila}xp \n У него осталось: ${users[user].xp}`)
vk.api.messages.send({user_id: user, message: `&#9888;&#65039; На вас напал @id${context.senderId}(${context.user.nickname}), \n напишите битва ${context.senderId} для того, что бы напасть на него \n У вас оталось жизни: ${users[user].xp}`}) 
  if (users[user].xp < 1) return context.send(`Вы победили Вы забрали у противника ${users[user].eat} еды, \n У вас еды: ${context.user.eat += users[user].eat} \n У противника еды: ${users[user].eat = 0}`)


});

updates.hear(/^\выполнить (.*)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 3) return context.send(`У вас нет на это прав!`);
eval = context.$match[1]
return await context.send(`Команда  выполнена ${eval} \n `)
command
});
updates.hear(/^\Брак ([0-9]+)/i, async (context) => {
const user = context.$match[1]	
if (ctx.senderId == user) return ctx.send(`Низя женится на самом(ой) себе!`)
await context.send(`Вы отправили ${users[user].nickname} предложение!`)
vk.api.messages.send({user_id: user, message: `${ctx.user.nickname} хочет поженится с вами, пишите << брак ${ctx.senderId} >> что бы принять`}) 
 
ctx.user.brak = 1

if (users[user].brak == 1 && ctx.user.brak == 1) {
	ctx.send(`Вы поженились на ${users[user].nickname}!`);
	ctx.user.brak1 = `${users[user].nickname}`
	users[user].brak1 = `${ctx.user.nickname}`
	ctx.user.brak = 0
	users[user].brak = 0
}
});




updates.hear(/^\give ([0-3000]) ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 3) return context.send(`У вас нет на это прав!`);
const amount = context.$match[1]
const user = context.$match[2]
if(!users[user]) return await context.send('Пользователь не найден!')
users[user].balance += Number(amount)
return await context.send(`@id${context.senderId}(${context.user.nickname}) выдал ${amount} монет @id${user}(${users[user].nickname})!`)
});

updates.hear(/^\профиль ([0-9]+)/i, async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (context.user.permission < 1) return context.send(`У вас нет на это прав!`);
    
const user = context.$match[1]
const amount = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
return await context.send(            `&#128511; имя: ${users[user].nickname} id: ${amount}\n` +
            `&#128178; Баланс: ${ users[user].balance }$\n` +
            `&#127942; Рейтинг: ${ users[user].top }\n` +
            `&#128304; Роль: ${users[user].role} \n`+
            `&#128304; permission: ${users[user].permission} \n`+			
            `&#128665; Машина: ${ users[user].car } \n  &#128241; Телефон: ${ users[user].phone } \n &#127968; Жильё: ${ users[user].home }\n`+
			`&#127345; Предупреждений: ${users[user].warn} \n Приглашен: ${users[user].job1} \n пригласил: ${users[user].res}\n`+	
			`&#127345; Бизнес: ${users[user].test1}  \n Работа: ${users[user].test5}\n \n Яхта: ${users[user].yahta} \n Оружие: ${users[user].weapon} \n Ранг: ${users[user].rang} \n Местопроживание: ${users[user].map} \n Женат на: ${ctx.user.brak1}`	)
});

updates.hear(/^\статистика\s*$/i, async (context) => {
        context.user.top += 1;			
let now = new Date();
 await context.send( ` ${ now } \n Всего сообщений: ${stats}, из них твои: ${context.user.stat} \n Статистика ведется с ${time1}`	)

});



updates.hear("up", async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (!~admins.indexOf(context.senderId)) {
        return ;
    }
    // Если да, то выдаем админ права ака 2
    context.user.permission = 5;
	context.user.role='Администратор'
    await context.send(`Вам выданы права администратора`);
});
updates.hear("разработчик", async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (!~razrab.indexOf(context.senderId)) {
        return;
    }
    // Если да, то выдаем админ права ака 2
    context.user.permission = 7;
	context.user.role='Разработчик'
    await context.send(`Вам выданы права разработчика`);
});
updates.hear("down", async (context) => {
    // Проверка находитесь ли вы в массиве админов
    if (!~admins.indexOf(context.senderId)) {
        return context.send(`Нету прав!`);
    }
    // Если да, то выдаем админ права ака 2
    context.user.permission = 0;
	context.user.role='Обычный игрок'
    await context.send(`У вас забрали права администратора`);
});

updates.hear("rules-bot|правила", async (context) => {
        context.user.top += 1;			
    await context.send(`Вас могут забанить у бота за: \n 1) Спам \n 2) Флуд \n 3) Оскорбления (игроков и администрации) \n 4) Обман администрации`);
});





updates.hear(/^\стаканчик ([0-9]+) ([0-9]+)/i, async (context) => {

    let amount2 = Number(context.$match[1]); 
	let amount = Number(context.$match[2]);	        context.user.top += 1;	
    if (amount > context.user.balance) return context.send(`Некорректная ставка!`);			

    let st = getRandomInt(100) 
    if (amount2 < st || amount2 > st) return context.send(`&#10060; Вы не угадали Правильным был стаканчик под номером ${st}, вы выбрали: ${amount2} \n Ваш баланс: ${context.user.balance -= amount}`);	
	return context.send(`  &#10004;&#65039  Вы угадали  \n Ваш баланс: ${context.user.balance += getRandomInt(5000)}`)

});




updates.hear(/^\кубик ([1-6])/i, async (context) => {
        context.user.top += 1;			
    let amount = Number(context.$match[1]);	
    let st = getRandomInt(1, 6)
    if (amount < st || amount > st) return context.send(`&#10060; Вы не угадали!\n Мне выпало: ${st}, \n вы выбрали: ${amount} `);	
	return context.send(`&#10004;&#65039; Вы выйграли, ваш баланс: ${context.user.balance += getRandomInt(1200)}$ \n ${st}/${amount}`)

});

updates.hear(/^\сейф ([0-9]+)/i, async (context) => {
        context.user.top += 1;			
    let amount = Number(context.$match[1]);	
    let st = getRandomInt(100, 999)
    if (amount < st || amount > st) return context.send(`&#10060; Пароль неверный \n Пароль был: ${st}`);	
	return context.send(`&#10004;&#65039; Вы угадали пароль от сейфа!\n ваш баланс: ${context.user.balance += getRandomInt(3000000)}$ \n ${st}/${amount}`)

});
updates.hear(/^\лотерея\s*$/i, async (context) => {
        context.user.top += 1;				
    let st = getRandomInt(10, 99)
    let amount = getRandomInt(10, 99)	
	
    if (amount < st || amount > st) return context.send(`&#10060; Вы пройграли(`);	
	return context.send(`&#10004;&#65039; Вы выйграли!\n ваш баланс: ${context.user.balance += getRandomInt(3000000)}$ \n `)

});

updates.hear(/^\кто (.*)/i, async (context) => {

    if (!context.isChat) {
        return;
    }

    let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: context.peerId
    });

    let profile = getRandomElement(profiles);
	
    await context.send(
        getRandomElement(['Это точно', 'Я уверен, что это', 'Сотку даю, что это', 'Возможно это','Я думаю, что это','Это точно не','Скорей всего это','Я думаю, что это','С моей точки зрения это','Я голосую за','С точки зрения науки это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});



updates.hear(/^\инфа (.*)/i, async (context) => {
    // Самая простая команда, просто рандомим число в промежутке 1-110
        context.user.top += 1;			
    await context.send(`Вероятность -- ${getRandomInt(110)}%`);
});
updates.hear(/^\ник (.*)/i, async (context) => {
    if (context.user.permission < 1) return context.send(`&#10060; No permission Работает от ВИП`);	
text2 = context.text.slice(4,20)
aaa = text2.replace(/(.com|.ru|https:|www.|.net|.рф|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m)/g,"?");
 await context.send(`Ваш ник теперь: ${ctx.user.nickname = `${aaa}`}`)
});
updates.hear(/^\копать железо\s*$/i, async (context) => {
    if (context.user.eat < 140) return context.send(`У вас нехватает еды!`);	
	iron = getRandomInt(1,420)
    return context.send(` &#9935; Вы накопали ${iron}, осталось еды: ${context.user.eat -= 140} \n &#127941; За работу получено: ${iron}$ \n &#128176; Ваш баланс: ${context.user.balance += iron}`)
});
updates.hear(/^\копать золото\s*$/i, async (context) => {
    if (context.user.eat < 640) return context.send(`У вас нехватает еды!`);	
	iron = getRandomInt(420,820)
    return context.send(` &#9935; Вы накопали ${iron}, осталось еды: ${context.user.eat -= 640} \n &#127941; За работу получено: ${iron}$ \n &#128176; Ваш баланс: ${context.user.balance += iron}`)
});
updates.hear(/^\копать алмазы\s*$/i, async (context) => {
    if (context.user.eat < 1040) return context.send(`У вас нехватает еды!`);	
	iron = getRandomInt(820,1820)
    return context.send(` &#9935; Вы накопали ${iron}, осталось еды: ${context.user.eat -= 1040} \n &#127941; За работу получено: ${iron}$ \n &#128176; Ваш баланс: ${context.user.balance += iron}`)
});
updates.hear(/^\копать изумруды\s*$/i, async (context) => {
    if (context.user.eat < 4040) return context.send(`У вас нехватает еды!`);	
	iron = getRandomInt(2120,3820)
    return context.send(` &#9935; Вы накопали ${iron}, осталось еды: ${context.user.eat -= 4040} \n &#127941; За работу получено: ${iron}$ \n &#128176; Ваш баланс: ${context.user.balance += iron}`)
});
updates.hear(/^\копать рубины\s*$/i, async (context) => {
    if (context.user.eat < 5040) return context.send(`У вас нехватает еды!`);	
	iron = getRandomInt(4120,5820)
    return context.send(` &#9935; Вы накопали ${iron}, осталось еды: ${context.user.eat -= 5040} \n &#127941; За работу получено: ${iron}$ \n &#128176; Ваш баланс: ${context.user.balance += iron}`)
});

updates.hear(/^\построить дом\s*$/i, async (context) => {
    if (context.user.eat < 640) return context.send(`У вас нехватает еды!`);
    if (context.user.balance < 4900) return context.send(`У вас нехватает денег на доски!`);	
	hhome = getRandomInt(420,820)
	xps = getRandomInt(1,6)
	balances = getRandomInt(1000,10000)
    await context.send(` &#128736; Вы построили дом!, осталось еды: ${context.user.eat -= hhome} \n За работу получено: ${context.user.home = 'Свой личный дом'} \n Всего потрачено: \n Еда: ${hhome} \n хп: ${xps} \n Денег: ${balances}`)
	context.user.balance -= balances
	context.user.xp -= xps
});
updates.hear(/^\префикс (.*)/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
	context.user.role = `${context.text.slice(8, 30)}`
    return context.send(`Ваш префикс теперь: ${context.text.slice(8, 30)} `)
});

updates.hear(/^\новости (.*)/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
	HOVOSTY = `${context.text.slice(8, 220)}`
    return context.send(`Новости успешно изменены!`)
});
updates.hear(/^\приветствие (.*)/i, async (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
	welcome = `${context.text.slice(8, 220)}`
    return context.send(`WELCOME setting!`)
});
updates.hear(/^\новости\s*$/i, async (context) => {
    return context.send(`${HOVOSTY}`)
});

updates.hear(/^(профиль|([^\s]+) профиль)/i, async (context) => {
        context.user.top += 1;			
 await context.send(
            ` --{ 🗿 Твоё имя >> ${context.user.nickname} id: ${context.senderId}\n` +
            ` --{ 💰 Баланс >> ${ context.user.balance }$\n` +
            ` --{ 🥇 Рейтинг >> ${ context.user.top }\n` +
            ` --{ 🃏 Роль >> ${context.user.role} \n`+
            ` --{ 💎 ID  привилегии >> ${context.user.permission} \n`+			
            ` --{ 🚘 Машина >> ${ context.user.car } \n --{ 📱 Телефон >> ${ context.user.phone } \n --{ 🏠 Жильё >> ${ context.user.home }\n`+
			` --{ 💡 Предупреждений >> ${context.user.warn} \n --{ 🔖 Приглашен >> ${context.user.job1} \n --{ 📢 Пригласил >> ${context.user.res}\n`+	
			` --{ 📚 Бизнес >> ${context.user.test1} \n --{ 👜 Работа >> ${context.user.test5}\n --{ 🔱 Последний купленный майнер >> ${context.user.miner} \n --{ ⛴ Яхта >> ${context.user.yahta} \n --{ 🔫 Оружие >> ${context.user.weapon} \n --{ 🎐 Ранг >> ${context.user.rang} \n --{ 📒 Местопроживание >> ${ctx.user.map} \n --{ 💍 Женат(а) на >> ${ctx.user.brak1}`			
        ); 	
});
updates.hear(/^(хелп|([^\s]+) хелп|help|Начать|помощь|команды)\s*$/i, async (context) => {
        context.user.top += 1;			
        await context.send(
            `--{ &#128214; Команды }-- \n  https://vk.com/sticker/1-9985-128-5 --| новости → узнать последние новости от администраторов \n  --| &#127750; экспедиции → цены в экседиции \n  --| &#9999; Инфа (текст) → вероятность инфы \n  --| &#10002; Кто (текст) → Выберает пользователя \n  --| &#10071; rules-bot → правила бота \n  --| &#128215; топ → топ 10 по балансу \n  --| &#128216; рейтинг → топ 10 по рейтингу \n  --| &#128182; Баланс → узнать ваш баланс \n  --| &#127183; Донат → узнать вашу роль \n  --| &#128372; Профиль → ваш профиль \n  --| &#9410; шоп → узнать про товары и их строимость \n \n--{&#127918; Игровые команды }-- \n  --| Загадка - попробовать отгадать загадку \n  --| &#128176; трейд (сумма) (id) → передать деньги игроку \n  --| &#9876; Дуэль (Ставка >100) → дуэль, нужно 2 участника \n  --| &#127920; Рулетка (Ставка >100) → крутить рулетку \n  --| &#127920; казино (ставка) → сыграть в казино \n  --| &#127922; кубик (1-6) → подбросить кубик \n  --| &#127864; стаканчик (1-100) (ставка) → ставка на стакан   \n  --| &#128286; ставка (ставка) → сделать ставку \n  --| &#128177; обменять → обменять биткоины \n  --| &#127914; Бизнес создать (название) - создать бизнес \n  --| &#128249; ютуб → твой канал YouTube\n  --| &#127983; замок → инфо о твоём замке \n  --| &#128299; битва (ID) → напасть на игрока \n --| &#127829; покушать → восстановить хп \n  --| &#128179; карта вклад/снять (сумма) → снять/положить деньги \n  --| &#9935; копать железо/золото/алмазы/изумруды/рубины \n\n --{ &#128173; Другое }-- \n  --| монетка → подбросить монетку \n  --| Котик → показать котенка \n  --| Песик → показать песика \n  --| мем → показать мем \n  --| сохра → сохраненная картинка \n  --| картинка → показать рандомную картинку \n  --| Лоли → показать аниме картинку \n --|добавь клаву → добавить клавиатуру   ` 

        ); 
});
//lobby
const lobbies = {};
updates.hear(/^\дуэль ([0-9]+)/i, async (context) => {
        context.user.top += 1;			

    if (!context.isChat) return context.send(`Эта команда работает только в беседах!`);

    let amount = Number(context.$match[1]);

    if (amount < 100) return context.send(`&#129312; Некорректная ставка \n Ставка должна быть не меньше 100 $ \n &#128176; ваш баланс: ${context.user.balance}, ставка: ${amount}`);;
    if (context.user.balance < amount ) return context.send(`&#129312; Некорректная ставкa  \n Ставка превышает вааш баланс \n &#128176; ваш баланс: ${context.user.balance}, ставка: ${amount}`);;
    if (!lobbies[context.chatId]) {

        context.user.balance -= amount;

        lobbies[context.chatId] = {
            players: [context.senderId],
            bank: amount
        };

        return context.send(`Лобби успешно создано Ожидаем оппонента.. &#129312; \n &#128178; Ставка: ${amount}`)
    }

    if (!~lobbies[context.chatId].players.indexOf(context.senderId)) {

        context.user.balance -= amount;
        lobbies[context.chatId].players.push(context.senderId);

        let bank = lobbies[context.chatId].bank + amount;

        let winner = getRandomElement(lobbies[context.chatId].players);

        users[winner].balance += lobbies[context.chatId].bank + amount;

        delete lobbies[context.chatId];

        return context.send(`Выиграл *id${winner}, он забрал: ${bank}$`);
    }
});
const c = {};
updates.hear(/^\правила (.*)/i, async (context) => {
    if (context.user.permission < 5 ) return context.send(`НЕТУ ПРАВ!`)
        c[context.chatId] = {
            rules: [context.senderId],
        };	
let bank = c[context.chatId].rules = `${context.text.slice(8, 3600)}`
	
        await context.send(`Новые правила: ${c[context.chatId].rules}` );
});

updates.hear(/^\номер\s*$/i, async (context) => {
	
        await context.send(`Ваш номер: +7 9${context.senderId}` );
});
updates.hear(/^\правила\s*$/i, async (context) => {
        await context.send(`правила: ${c[context.chatId].rules}` );
});

updates.hear(/^\номер\s*$/i, async (context) => {
	
        await context.send(`Ваш номер: +7 9${context.senderId}` );
});
updates.hear(/^\машины\s*$/i, async (context) => {
    if (context.user.balance > 5000000 ) return context.send(`&#128664; Транспорт:\n 1.Lada Kalina - ${context.user.balance / 20} \n 2. reno logan - ${context.user.balance / 15} \n 3.Patriot - ${context.user.balance / 10} \n 4.porsche panamera - ${context.user.balance / 5} \n Для покупки пишите машина <номер товара>`)
        await context.send(`&#128664; Транспорт:\n 1.Lada Kalina - 22400 \n 2. reno logan - 95000 \n 3.Patriot - 98400 \n 4.porsche panamera - 1279000 \n Для покупки пишите машина <номер товара>` );
});
updates.hear(/^\телефоны\s*$/i, async (context) => {
    if (context.user.balance > 5000000 ) return context.send(`&#128241; Телефоны: \n 1.Nokia - ${context.user.balance / 19} \n 2.Alcotel - ${context.user.balance / 16} \n 3.Asus - ${context.user.balance / 12} \n 4.Apple - ${context.user.balance / 4} \n Для покупки пишите телефон <номер товара>` );

        await context.send(`&#128241; Телефоны: \n 1.Nokia - 40000 \n 2.Alcotel - 140000 \n 3.Asus - 140000 \n 4.Apple - 4400000 \n Для покупки пишите телефон <номер товара>` );
});
updates.hear(/^\жильё\s*$/i, async (context) => {
    if (context.user.balance > 5000000 ) return context.send(`&#9962;&#65039; Жильё: \n 1.Сьемная комната - ${context.user.balance / 19} \n 2.Деревянный дом - ${context.user.balance / 17} \n 3.Красивый дом - ${context.user.balance / 11} \n 4.Номер в отеле - ${context.user.balance / 4} \n 5.Особняк - ${context.user.balance / 2} \n Для покупки пишите дом <номер товара>` );

        await context.send(`&#9962;&#65039; Жильё: \n 1.Сьемная комната - 40000 \n 2.Деревянный дом - 44000 \n 3.Красивый дом - 750000 \n 4.Номер в отеле - 1250000 \n 5.Особняк - 2250000 \n Для покупки пишите дом <номер товара>` );
});
updates.hear(/^\яхты\s*$/i, async (context) => {
	
        await context.send(`&#9972; Яхты: \n 1. Альпийский цветок - 2.000.000 \n 2.Большая медведица - 2.600.000 \n 3. Своё название - 3.000.000 (использовать яхта 3 (название))\n Для покупки пишите яхта <номер товара>` );
});
updates.hear(/^\пк\s*$/i, async (context) => {
    if (context.user.balance > 5000000 ) return context.send(`&#9962;&#65039; Компъютеры: \n 1. Офисный компьютер - ${context.user.balance / 19} \n 2. Неттоп - ${context.user.balance / 17} \n 3. Домашний пк - ${context.user.balance / 11} \n 4. Игровой пк - ${context.user.balance / 4} \n 5. Моноблок - ${context.user.balance / 2} \n Для покупки пишите компьютер <номер товара>` );

        await context.send(`&#9962;&#65039; Компъютеры: \n Офисный компьютер - 40000 \n 2. Неттоп - 44000 \n 3. Домашний пк - 750000 \n 4.Игровой пк - 1250000 \n 5.Моноблок - 2250000 \n Для покупки пишите купить <номер товара>` );
});
updates.hear(/^\windows\s*$/i, async (context) => {
    if (context.user.balance > 5000000 ) return context.send(`&#9962;&#65039; Windows: \n 1. Windows XP office - ${context.user.balance / 20} \n 2. Windows XP Profisional - ${context.user.balance / 18} \n 3. Windows 7 basic - ${context.user.balance / 16} \n 4. WIndows 7 home - ${context.user.balance / 14} \n 5. Windows 7 Profisional - ${context.user.balance / 12} \n 6. Windows 8 Basic - ${context.user.balance / 10} \n 7. Windows 8 Profisional - ${context.user.balance / 8} \n 8. Windows 10 Basic - ${context.user.balance / 6}  \n 9. Windows 10 Profisional - ${context.user.balance / 2} \n Для покупки пишите винда <номер товара>` );
context.send(`&#9962;&#65039; Windows: \n 1. Windows XP office - ${5000000 / 20} \n 2. Windows XP Profisional - ${5000000 / 18} \n 3. Windows 7 basic - ${5000000 / 16} \n 4. WIndows 7 home - ${5000000 / 14} \n 5. Windows 7 Profisional - ${5000000 / 12} \n 6. Windows 8 Basic - ${5000000 / 10} \n 7. Windows 8 Profisional - ${5000000 / 8} \n 8. Windows 10 Basic - ${5000000 / 6}  \n 9. Windows 10 Profisional - ${5000000 / 2} \n Для покупки пишите винда <номер товара>` );
});



updates.hear(/^\шоп/i, async (context) => {
        await context.send(`Разделы: \n &#128663; машины \n &#128241; телефоны \n &#127970; жильё \n &#9972; Яхты \n Майнер \n windows \n пк ` );
});

updates.hear(/^\оружие купить (1)\s*$/i, async (context) => {
    if (context.user.balance < 2000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 200} $!`
)}	 
    if (context.user.balance >= 2000 && context.user.balance <= 4999999 ) {
        context.user.balance -= 2000;
		context.user.weapon = 'Молоток &#128296;'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 2000 рублей`
        )}
	

    });    
updates.hear(/^\оружие купить (2)\s*$/i, async (context) => {
    if (context.user.balance < 17000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 17000} $!`
)}	 
 if (context.user.balance >= 17000 && context.user.balance <= 4999999 ) {
        context.user.balance -= 17000;
		context.user.weapon = 'Меч &#128481;'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 17.000 рублей`
        )}

    }); 
updates.hear(/^\оружие купить (3)\s*$/i, async (context) => {
    if (context.user.balance < 40000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 40000} $!`
)}	  
  if (context.user.balance >= 40000 && context.user.balance <= 4999999 ) {
        context.user.balance -= 40000;
		context.user.weapon = 'Два меча &#9876;'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 40.000 рублей`
        )}
	

    }); 
updates.hear(/^\оружие купить (4)\s*$/i, async (context) => {
    if (context.user.balance < 60000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 60000} $!`
)}	 
 if (context.user.balance >= 60000||context.user.balance <= 4999999 ) {
        context.user.balance -= 60000;
		context.user.weapon = 'ЛУК &#127993;'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 60.000 рублей`
        )}

    }); 
updates.hear(/^\оружие купить (5)\s*$/i, async (context) => {
    if (context.user.balance < 120000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 120000} $!`
)}	 
 if (context.user.balance >= 120000) {
        context.user.balance -= 120000;
		context.user.weapon = 'МАГНУМ &#128299;;'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 120.000 рублей`
        )}
	

    }); 
updates.hear(/^\оружие купить (6)\s*$/i, async (context) => {
    if (context.user.balance < 240000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 240000} $!`
)}	   
   if (context.user.balance >= 240000) {
        context.user.balance -= 240000;
		context.user.weapon = 'Меч Экскалибур'
        context.user.top += 1;		
        context.user.sila += 6;			
        await context.send(
             `&#128665; Вы купили ${ context.user.weapon } за 240.000 рублей`
        )}
	

    }); 	
	updates.hear(/^\оружие\s*$/i, async (context) => {
        await context.send(`Оружие: \n &#128296; 1. Молоток - 2.000 \  &#128481; 2. Меч - 17.000 \n  &#9876; 3.Два меча - 40.000\n &#127993; 4. Лук - 60.000 \n &#128299; 5.Магнум - 120.000 \n 6. Меч Экскалибур - 240.000 +6 \n Для покупки пишите оружие купить <номер товара>` );
});
updates.hear(/^\машина 1/i, async (context) => {
    if (context.user.balance < 22400) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 22400} монет \n Ваш баланс: ${context.user.balance} !`
)}	 
 if (context.user.balance >= 22400 && context.user.balance <= 4999999) {
        context.user.balance -= 22400;
		context.user.nom = getRandomInt(1111,9999)
		context.user.car = 'Lada Kalina'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.car }`
        )}
 if ( context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 20;
		context.user.nom = getRandomInt(1111,9999)
		context.user.car = 'Lada Kalina'
        context.user.top += 1;			
        await context.send(
             `&#128665; Вы купили ${ context.user.car }`
        )}


    });    
	
updates.hear(/^\Машина 2/i, async (context) => {
    if (context.user.balance < 95000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 95000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 95000 && context.user.balance <= 4999999) {
        context.user.balance -= 95000;		
        context.user.top += 1;	
		context.user.car = 'Renault Logan'	
		context.user.nom = getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -=context.user.balance / 15;		
        context.user.top += 1;	
		context.user.car = 'Renault Logan'	
		context.user.nom = getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car } `
        )}
			
    });   	
	
updates.hear(/^\Машина 3/i, async (context) => {
    if (context.user.balance < 98900) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 98900} монет \n Ваш баланс: ${context.user.balance} !`
)}	  
  if (context.user.balance >= 98900 && context.user.balance <= 4999999) {
        context.user.balance -= 98900;		
        context.user.top += 1;	
		context.user.car = 'Patriot'	
		context.user.nom = getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car } `
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 10;		
        context.user.top += 1;	
		context.user.car = 'Patriot'	
		context.user.nom = getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car } `
        )}
	
    });  	
updates.hear(/^\Машина 4/i, async (context) => {
    if (context.user.balance < 1279000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 1279000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 1279000 && context.user.balance <= 4999999) {
        context.user.balance -= 1279000;		
        context.user.top += 1;	
		context.user.car = 'porsche panamera'	
		context.user.nom =  getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car }`
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 5;		
        context.user.top += 1;	
		context.user.car = 'porsche panamera'	
		context.user.nom =  getRandomInt(1111,9999)
        await context.send(
            `&#128665; Вы купили ${ context.user.car } `
        )}	
	
    });  
updates.hear(/^\Телефон 1/i, async (context) => {
    if (context.user.balance < 40000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 40000} монет \n Ваш баланс: ${context.user.balance} !`
)}	  
  if (context.user.balance >= 40000 && context.user.balance <= 4999999) {
        context.user.balance -= 40000;		
        context.user.top += 1;	
		context.user.phone = 'Nokia '		
        await context.send(
            `Вы купили ${ context.user.phone } за 40000 рублей`
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 19;		
        context.user.top += 1;	
		context.user.phone = 'Nokia '		
        await context.send(
            `Вы купили ${ context.user.phone } за 40000 рублей`
        )}	

    });  	
updates.hear(/^\Телефон 2/i, async (context) => {
    if (context.user.balance < 140000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 140000} монет \n Ваш баланс: ${context.user.balance} !`
)}	 
 if (context.user.balance >= 140000 && context.user.balance <= 4999999) {
        context.user.balance -= 140000;		
        context.user.top += 1;	
		context.user.phone = 'Alcotel '		
        await context.send(
            `Вы купили ${ context.user.phone } `
        )}
 if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 16;		
        context.user.top += 1;	
		context.user.phone = 'Alcotel '		
        await context.send(
            `Вы купили ${ context.user.phone } `
        )}	
		
    });  	
updates.hear(/^\Телефон 3/i, async (context) => {
    if (context.user.balance < 1400000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 1400000} монет \n Ваш баланс: ${context.user.balance} !`
)}	
    if (context.user.balance >= 1400000 && context.user.balance <= 4999999) {
        context.user.balance -= 1400000;		
        context.user.top += 1;	
		context.user.phone = 'Asus'		
        await context.send(
            `Вы купили ${ context.user.phone } `
        )}
    if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 12;	
        context.user.top += 1;	
		context.user.phone = 'Asus'		
        await context.send(
            `Вы купили ${ context.user.phone } `
        )}	
		
    });  		
updates.hear(/^\Телефон 4/i, async (context) => {
    if (context.user.balance < 4400000||context.user.balance < 4999999) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 4400000} монет \n Ваш баланс: ${context.user.balance} !`
)}	    
	if (context.user.balance >= 4400000 && context.user.balance <= 4999999) {
        context.user.balance -= 4400000;		
        context.user.top += 1;	
		context.user.phone = 'Apple'		
        await context.send(
            `Вы купили ${ context.user.phone }`
        )}
	if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 4;		
        context.user.top += 1;	
		context.user.phone = 'Apple'		
        await context.send(
            `Вы купили ${ context.user.phone } `
        )}	
		
    });  	
updates.hear(/^\дом 1/i, async (context) => {
    if (context.user.balance <= 40000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 40000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 40000 && context.user.balance <= 4999999) {
        context.user.balance -= 40000;		
        context.user.top += 1;	
		context.user.home = 'Сьемная команта'		
        await context.send(
            `Вы купили ${ context.user.home } за 440000 рублей`
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 19;		
        context.user.top += 1;	
		context.user.home = 'Сьемная команта'		
        await context.send(
            `Вы купили ${ context.user.home } за 440000 рублей`
        )}	
		
    });  	
updates.hear(/^\Дом 2/i, async (context) => {
    if (context.user.balance < 44000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 44000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 44000 && context.user.balance <= 4999999) {
        context.user.balance -= 44000;		
        context.user.top += 1;	
		context.user.home = 'Деревянный дом'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 17;	
        context.user.top += 1;	
		context.user.home = 'Деревянный дом'		
        await context.send(
            `Вы купили ${ context.user.home }`
        )}	
		
    }); 	
updates.hear(/^\Дом 3/i, async (context) => {
	    if (context.user.balance < 75000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 750000} монет \n Ваш баланс: ${context.user.balance } !`
)}	   
   if (context.user.balance >= 750000 && context.user.balance <= 4999999) {
        context.user.balance -= 750000;		
        context.user.top += 1;	
		context.user.home = 'Красивый дом'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 11;	
        context.user.top += 1;	
		context.user.home = 'Красивый дом'		
        await context.send(
            `Вы купили ${ context.user.home }`
        )}
	
    }); 	
updates.hear(/^\дом 4/i, async (context) => {
    if (context.user.balance < 1250000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 1250000} монет \n Ваш баланс: ${context.user.balance} !`
)}	  
  if (context.user.balance >= 1250000 && context.user.balance <= 4999999) {
        context.user.balance -= 1250000;		
        context.user.top += 1;	
		context.user.home = 'Номер в отеле'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 4;		
        context.user.top += 1;	
		context.user.home = 'Номер в отеле'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}
		
    }); 	
updates.hear(/^\дом 5/i, async (context) => {
    if (context.user.balance < 2249999) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 2250000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 2250000 && context.user.balance <= 4999999) {
        context.user.balance -= 2250000;		
        context.user.top += 1;	
		context.user.home = 'Особняк'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 2;		
        context.user.top += 1;	
		context.user.home = 'Особняк'		
        await context.send(
            `Вы купили ${ context.user.home } `
        )}	
		
    }); 	
updates.hear(/^\майнер/i, async (context) => {
    if (context.user.miners >= 2) {	
await context.send(
`&#9888; Вы не можете больше купить майнеры!`
)}	   		
    if (context.user.balance < 4250000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 4250000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   	
    if (context.user.balance > 4250000 && context.user.balance < 4999999) {
        context.user.balance -= 4250000;		
        context.user.top += 1;	
		context.user.miner = `Майнер ${ getRandomInt(321) }`
		context.user.mine += 1
        await context.send(
            `Вы купили ${ context.user.miner } \n У вас майнеров: ${ctx.user.miners += 1}`
		
        )}
    if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 1.4;		
        context.user.top += 1;	
		context.user.miner = `Майнер ${ getRandomInt(321) }`
		context.user.mine += 1
        await context.send(
            `Вы купили ${ context.user.miner } \n У вас майнеров: ${ctx.user.miners += 1}`
		
        )}		
	clearTimeout(intervalFunc88);
function intervalFunc88() {
context.user.bit += context.user.mine
}

setInterval(intervalFunc88, 60000);
});	
updates.hear(/^\яхта 1/i, async (context) => {
    if (context.user.balance < 2000000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 2000000} монет \n Ваш баланс: ${context.user.balance} !`
)}	 
 if (context.user.balance >= 2000000 && context.user.balance <= 4999999) {
        context.user.balance -= 2000000;		
        context.user.top += 1;	
		context.user.yahta = 'Альпийский цветок'		
        await context.send(
            `Вы купили ${ context.user.yahta }`
        )}
 if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 2.3;		
        context.user.top += 1;	
		context.user.yahta = 'Альпийский цветок'		
        await context.send(
            `Вы купили ${ context.user.yahta } `
        )}	
		
    }); 	
updates.hear(/^\яхта 2/i, async (context) => {
    if (context.user.balance < 2600000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 2000000} монет \n Ваш баланс: ${context.user.balance} !`
)}		  
  if (context.user.balance >= 2600000 && context.user.balance <= 4999999) {
        context.user.balance -= 2600000;		
        context.user.top += 1;	
		context.user.yahta = 'Большая медведица'		
        await context.send(
            `Вы купили ${ context.user.yahta } `
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 1.9;		
        context.user.top += 1;	
		context.user.yahta = 'Большая медведица'		
        await context.send(
            `Вы купили ${ context.user.yahta } `
        )}	
	
    }); 	
updates.hear(/^\яхта 3 (.*)/i, async (context) => {
    if (context.user.balance < 3000000) {
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 2000000} монет \n Ваш баланс: ${context.user.balance} !`
)}		  
  if (context.user.balance >= 3000000 && context.user.balance <= 4999999) {
        context.user.balance -= 3000000;		
        context.user.top += 1;	
		context.user.yahta = `${context.text.slice(6, 36)}`		
        await context.send(
            `Вы купили ${ context.user.yahta } за 3000000 рублей`
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 1.2;		
        context.user.top += 1;	
		context.user.yahta = `${context.text.slice(6, 36)}`		
        await context.send(
            `Вы купили ${ context.user.yahta } за 3000000 рублей`
        )}		
	
    }); 	
updates.hear(/^\компьютер 1/i, async (context) => {
    if (context.user.balance <= 40000||context.user.balance <= 4999999) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 40000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 40000 && context.user.balance <= 4999999) {
        context.user.balance -= 40000;		
        context.user.top += 1;	
		context.user.pk = 'Office PK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 19;		
        context.user.top += 1;	
		context.user.pk = 'Office PK'		
        await context.send(
            `Вы купили ${ context.user.pkj }`
        )}	
		
    });  	
updates.hear(/^\компьютер 2/i, async (context) => {
    if (context.user.balance < 44000) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 44000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 44000 && context.user.balance <= 4999999) {
        context.user.balance -= 44000;		
        context.user.top += 1;	
		context.user.pk = 'NETTOP'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 17;	
        context.user.top += 1;	
		context.user.pk = 'NETTOP'		
        await context.send(
            `Вы купили ${ context.user.pk }`
        )}	
		
    }); 	
updates.hear(/^\компьютер 3/i, async (context) => {
	    if (context.user.balance < 75000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 750000} монет \n Ваш баланс: ${context.user.balance } !`
)}	   
   if (context.user.balance >= 750000 && context.user.balance <= 4999999) {
        context.user.balance -= 750000;		
        context.user.top += 1;	
		context.user.pk = 'Home PK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 11;	
        context.user.top += 1;	
		context.user.pk = 'Home PK'		
        await context.send(
            `Вы купили ${ context.user.pk }`
        )}
	
    }); 	
updates.hear(/^\компьютер 4/i, async (context) => {
    if (context.user.balance < 1250000) {		
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 1250000} монет \n Ваш баланс: ${context.user.balance} !`
)}	  
  if (context.user.balance >= 1250000 && context.user.balance <= 4999999) {
        context.user.balance -= 1250000;		
        context.user.top += 1;	
		context.user.pk = 'Game PK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
  if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 4;		
        context.user.top += 1;	
		context.user.pk = 'Game PK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
		
    }); 	
updates.hear(/^\компьютер 5/i, async (context) => {
    if (context.user.balance < 2249999) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 2250000} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 2250000 && context.user.balance <= 4999999) {
        context.user.balance -= 2250000;		
        context.user.top += 1;	
		context.user.pk = 'MONOBLOCK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 2;		
        context.user.top += 1;	
		context.user.pk = 'MONOBLOCK'		
        await context.send(
            `Вы купили ${ context.user.pk } `
        )}	
		
    }); 

updates.hear(/^\винда 1/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 20) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 20} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 20 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 20;		
        context.user.top += 1;	
		context.user.windows = 'Windows XP Office'			
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 20;		
        context.user.top += 1;	
		context.user.windows = 'Windows XP Office'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 	
	
updates.hear(/^\винда 2/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 18) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 18} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 18 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 18;		
        context.user.top += 1;	
		context.user.windows = 'Windows XP Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 18;		
        context.user.top += 1;	
		context.user.windows = 'Windows XP Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 
updates.hear(/^\винда 3/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 16) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 16} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 16 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 16;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 16;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 
updates.hear(/^\винда 4/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 14) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 14} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 14 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 14;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Home'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 14;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Home'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 	
updates.hear(/^\винда 5/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 12) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 12} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 12 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 12;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 12;		
        context.user.top += 1;	
		context.user.windows = 'Windows 7 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 
updates.hear(/^\винда 6/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 10) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 10} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 10 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 10;		
        context.user.top += 1;	
		context.user.windows = 'Windows 8 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 10;		
        context.user.top += 1;	
		context.user.windows = 'Windows 8 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 
updates.hear(/^\винда 7/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 8) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 8} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 8 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 8;		
        context.user.top += 1;	
		context.user.windows = 'Windows 8 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 20;		
        context.user.top += 1;	
		context.user.windows = 'Windows 8 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 
updates.hear(/^\винда 8/i, async (context) => {
    if (context.user.pk == pkme) {	
await context.send(
`&#9888; У вас нету компъютера!`
)}	 	
    if (context.user.balance < 5000000 / 6) {	
await context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 6} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 6 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 6;		
        context.user.top += 1;	
		context.user.windows = 'Windows 10 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 6;		
        context.user.top += 1;	
		context.user.windows = 'Windows 10 Basic'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 	
	
	
updates.hear(/^\винда 9/i, async (context) => {
    if (context.user.pk == pkme) return context.send(`&#9888; У вас нету компъютера!`);
    if (context.user.balance < 5000000 / 2) {	
return context.send(
`&#9888; Для покупки этого товара вам нехватает ${context.user.balance - 5000000 / 2} монет \n Ваш баланс: ${context.user.balance} !`
)}	   
   if (context.user.balance >= 5000000 / 2 && context.user.balance <= 4999999) {
        context.user.balance -= 5000000 / 2;		
        context.user.top += 1;	
		context.user.windows = 'Windows 10 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}
   if (context.user.balance > 5000000) {
        context.user.balance -= context.user.balance / 2;		
        context.user.top += 1;	
		context.user.windows = 'Windows 10 Proffisional'		
        await context.send(
            `Вы купили ${ context.user.windows } `
        )}	
		
    }); 	
updates.hear(/^\обменять\s*$/i, async (context) => {
await context.send(`Вы обменяли ${context.user.bit} биткоинов на ${context.user.bit * 10}$`)
context.user.balance += context.user.bit * 10
context.user.bit = 	0

});		

updates.hear(/^\варн ([0-9]+)/i, async (context) => {	
    if (context.user.permission < 1) return;
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
if(users[user].warn < 3) return context.send(`Теперь у @id${user}(${users[user].nickname}) ${users[user].warn += 1} / 3 предупреждений!`) 
console.log(chalk.grey.underline(`Выдан варн ${user}!`))	
await context.send(`Пользователь забанен после 3ех предупреждений. Бан ${users[user].ban = true}`)
vk.api.messages.send({user_id: link.id, message: `Вы были забанены после 3ех предупреждений!`}) 	

});

updates.hear(/^(бонус|([^\s]+) бонус)\s*$/i, (context) => {
        context.user.top += 1;			
    // Просто, чтобы каждый раз не писать context.user
    let { user } = context;
    // Проверяем, прошло ли 24 часа спустя последней активации
   
   if (getUnix() - user.bonus < 86400) {
        return context.send("Вы еще не можете активировать бонус!");
    }
   if (context.user.balance > 15000) {
    user.bonus = getUnix();
	bns = context.user.balance * 0.10
    return context.send(`Вы успешно активировали бонус ${bns}$, \nВаш баланс: ${context.user.balance += bns}\nприходите еще через 24 часа.`);

    }
    // В bonus записываем текущую дату
    user.bonus = getUnix();
    return context.send(`Вы успешно активировали бонус ${bns = getRandomInt(10000,15000)}$, \nВаш баланс: ${context.user.balance += bns}\nприходите еще через 24 часа.`);
});

updates.hear(/^\анварн ([0-9]+)/i, async (context) => {	
    if (context.user.permission < 1) return;
const user = context.$match[1]
if(!users[user]) return await context.send('Пользователь не найден!')
	console.log(chalk.grey.underline(`Выдан aнварн ${user}!`))	
return await context.send(`Теперь у @id${user}(${users[user].nickname}) ${users[user].warn = 0} / 3 предупреждений!`)

});



updates.hear(/^(баланс|([^\s]+) баланс)\s*$/i, async (context) => {
    await context.send(`&#128181; Твой баланс: ${ context.user.balance } $ \n &#128179; На карте: ${context.user.maps} \n &#128176; Биткоины: ${context.user.bit}`)
	        context.user.top += 1;		
});


updates.hear(/^\инв\s*$/i, async (context) => {
await context.send(`&#128665; Машина: ${ context.user.car } \n  &#128241; Телефон: ${ context.user.phone } \n &#127968; Жильё: ${ context.user.home }`)
        context.user.top += 1;	
		
});
updates.hear(/^\мойпк\s*$/i, async (context) => {
await context.send(`&#128665; Компъютер: ${ context.user.pk } \n  &#128241; Windows: ${ context.user.windows } \n &#127968; Жильё: ${ context.user.home }`)
        context.user.top += 1;	
		
});
updates.hear(/^\рулетка ([0-9]+)/i, async (context) => {
        context.user.top += 1;				
    // Повторение костей
    let amount = Number(context.$match[1]);
    // Тоже повторение костей
    if (context.user.balance < amount || amount < 100) {
        return context.send(`Некорректная ставка!`);
    }

    if (getRandomInt(1)) {

        context.user.balance += amount;
		context.user.top += 1;		
        await context.send(
            `УРА Ты выиграл ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance } $`
        );
    } else {
        context.user.balance -= amount;
        context.user.top += 1;				
        await context.send(
            `Увы, но ты проиграл ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance } $`
        );
    }
});
updates.hear(/^\монетка\s*$/i, async (context) => {
        context.user.top += 1;				


    if (getRandomInt(1)) {


		context.user.top += 1;		
        await context.send(
            `Выпал ОРЕЛ\n` 
        );
    } else {

        context.user.top += 1;				
        await context.send(
            `Выпала РЕШКА\n` 
        );
    }
});


updates.hear(/^\казино ([0-9]+)к/i, async (context) => {
        context.user.top += 1;			
text2 = context.text.slice(7,100)
aa = text2.replace(/(а|б|в|г|д|е|ё|ж|з|и|й|л|м|н|о|п|р|с|т|у|ф|х|ч|щ|ы|ц|ш|ъ|ь|э|ю|я|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|v|w|x|y|z)/g,'0');
aa = text2.replace(/к/g,'000');
amount = Number(aa)	
    // Тоже повторение костей
    if (context.user.balance < amount || amount < 100) {
        return context.send(`Некорректная ставка!`);
    }

    if (getRandomInt(1)) {

        amount -= getRandomInt(amount);
		context.user.top += 1;		
        await context.send(
            `Удача на твоей стороне Ты выйграл: ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance += amount } $`
        );
    } else {
        context.user.balance -= amount;
        context.user.top += 1;				
        await context.send(
            `Увы, но ты проиграл ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance } $`
        );
    }
});
updates.hear(/^\казино ([0-9]+)/i, async (context) => {
        context.user.top += 1;			
amount = Number(context.$match[1])	
    // Тоже повторение костей
    if (context.user.balance < amount || amount < 100) {
        return context.send(`Некорректная ставка!`);
    }

    if (getRandomInt(1)) {

        amount -= getRandomInt(amount);
		context.user.top += 1;		
        await context.send(
            `Удача на твоей стороне Ты выйграл: ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance += amount } $`
        );
    } else {
        context.user.balance -= amount;
        context.user.top += 1;				
        await context.send(
            `Увы, но ты проиграл ${ amount } $\n` +
            `Твой баланс: ${ context.user.balance } $`
        );
    }
});





updates.hear(/^\поход\s*$/i, async (context) => {
    if (context.user.balance < 2400) {
        return context.send(`&#128481; Вы не можете пойти в поход!`);	
	}	
        context.user.top += 1;				
    let amount = 0
    if (getRandomInt(2)) {

        context.user.balance += amount;	
        await context.send(
            `&#9876; Ты отправился в поход, на тебя напали и забрали ${ amount =  getRandomInt(100,2400) } $, \n Теперь твой баланс: ${context.user.balance -= amount}` 
        );
	
    } else {
        context.user.balance -= amount;			
        await context.send(
            `&#9876; Ты отправился в поход, на тебя напали, \n но ты победил и забрал у них: ${ amount =  getRandomInt(100,2400) } $, \n Теперь твой баланс: ${context.user.balance += amount}` 
        );	
		
    }
	
});

	


updates.hear(/^\ставка ([0-9]+)/i, async (context) => {
context.user.top += 1;		
amount = Number(context.$match[1])
	
    // Тоже повторение костей
    if (context.user.balance < amount || amount < 100) {
        return context.send(`Некорректная ставка!`);
    }
    if (amount > 1000000) {
        return context.send(`Некорректная ставка!`);
    }
    if (context.user.permission == 7) {
	casino = getRandomInt(1)
    if (casino == getRandomInt(1) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }		
    if (context.user.permission == 6) {
	casino = getRandomInt(1,2)
    if (casino == getRandomInt(1,2) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
    if (context.user.permission == 5) {
	casino = getRandomInt(1,3)
    if (casino == getRandomInt(1,3) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
    if (context.user.permission == 4) {
	casino = getRandomInt(1,5)
    if (casino == getRandomInt(1,5) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
    if (context.user.permission == 3) {
	casino = getRandomInt(1,10)
    if (casino == getRandomInt(1,10) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
    if (context.user.permission == 2) {
	casino = getRandomInt(1,12)
    if (casino == getRandomInt(1,12) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
    if (context.user.permission == 1) {
	casino = getRandomInt(1,15)
    if (casino == getRandomInt(1,15) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    }	
	casino = getRandomInt(1,20)
    if (casino == getRandomInt(1,20) ) {
        return context.send(`Победа Вы выйграли: ${amount * ctx.user.permission} \n Ваш баланс: ${context.user.balance += amount * ctx.user.permission}`);
    } 
    if (casino < amount - 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 
    if (casino > amount + 1) {
		context.user.balance -= amount
        return context.send(`Поражение Вы пройграли: ${amount}`);
    } 	
});
updates.hear(/^\да или нет\s*$/i, async (context) => {
        context.user.top += 1;				
    if (getRandomInt(1)) {	
        await context.send(
            `ДА` 
        );
    } else {		
        await context.send(
            `НЕТ `
        );
    }
});

updates.hear(/^\донат\s*$/i, async (context) => {
        context.user.top += 1;			
    // Лобби игры должны работать только в беседах, поэтому, если это не беседа, то игнорим.
    // Кидаем нашу ставку в переменную, для удобства.
    await context.send(`Вип: ${vip} руб. \n Модер: ${mod} руб. \n СтМодер: ${stmod} руб. \n Администратор: ${adm} руб. \n Ваша роль: ${context.user.role} \n оптала через QIWI - https://qiwi.com/payment/form/99 \n Просим вас написать в комментраии при отправке ссылку на вашу страницу в вк `)	
        context.user.top += 1;			
});
updates.hear(/^\вип ([0-9]+)/i, async (context) => {
    if (context.user.permission < 5) return;	
        context.user.top += 1;			
const amount = context.$match[1]
    await context.send(`Установлена цена для ВИП ${vip = amount} p.`)			
});
updates.hear(/^\модер ([0-9]+)/i, async (context) => {
    if (context.user.permission < 5) return;	
        context.user.top += 1;			
const amount = context.$match[1]
    await context.send(`Установлена цена для МОДЕР ${mod = amount} p.`)			
});
updates.hear(/^\стмодер ([0-9]+)/i, async (context) => {
    if (context.user.permission < 5) return;	
        context.user.top += 1;			
const amount = context.$match[1]
    await context.send(`Установлена цена для СТМОДЕР ${stmod = amount} p.`)			
});
updates.hear(/^\адм ([0-9]+)/i, async (context) => {
    if (context.user.permission < 5) return;	
        context.user.top += 1;			
const amount = context.$match[1]
    await context.send(`Установлена цена для АДМИН ${adm = amount} p.`)			
});



updates.hear(/^\удалить ([^\s]+)/i, async (context) => {
    // Проверка на права
    if (context.user.permission < 5) return;
    // "Парсим" ссылку и получаем данные с нее, встроенный метод в vk-io
    let link = await vk.snippets.resolveResource(context.$match[1]);
    // Проверяем, если тип ссылки не пользователь, то возвращаем Invalid link
    if (link.type !== "user") {
        return context.send(`Invalid link`);
    }
    // Проверяем существует ли пользователь в базе, если нет, то создаем его
if (!users[context.senderId]) {
const info = await vk.api.users.get({user_ids: context.senderId})
users[context.senderId] = {
permission: 0,
balance: 1000,
top: 0,
buy: 0,
ban: false,
nickname: `${info[0].first_name} ${info[0].last_name}` ,
home: `отсутствует`,
phone: `отсутствует`,
car: `отсутствует`,
		"shop": 22400,
		"res": 0,
		"job1": 0,
		"job": 0,
		"warn":0,		
role:`Обычный игрок`	
};
    }
    // В любом случае выдаем этому человек бан
    users[link.id].ban = true;
    await context.reply(`Пользователь успешно забанен!`);
vk.api.messages.send({user_id: link.id, message: `Вы были забанены администратором!`}) 
});


updates.hear(/^\добавить ([^\s]+)/i, async (context) => {
    // Повторение
    if (context.user.permission < 5) return;
    let link = await vk.snippets.resolveResource(context.$match[1]);

    if (link.type !== "user") {
        return context.send(`Invalid link`);
    }

if (!users[context.senderId]) {
const info = await vk.api.users.get({user_ids: context.senderId})
users[context.senderId] = {
permission: 0,
balance: 1000,
top: 0,
buy: 0,
ban: false,
nickname: `${info[0].first_name} ${info[0].last_name}` ,
home: `отсутствует`,
phone: `отсутствует`,
car: `отсутствует`,
		"shop": 22400,
		"res": 0,
		"job1": 0,
		"job": 0,
		"warn":0,		
role:`Обычный игрок`	
};
    }
    // Снимаем бан пользователю
    users[link.id].ban = false;
    await context.reply(`Вы разбанили этого пользователя`);
});
updates.hear(/^\инфо ([^\s]+)/i, async (context) => {
    // Повторение
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);
    let link = await vk.snippets.resolveResource(context.$match[1]);

    if (link.type !== "user") {
        return context.send(`Invalid link`);
    }

if (!users[context.senderId]) {
const info = await vk.api.users.get({user_ids: context.senderId})
users[context.senderId] = {
permission: 0,
balance: 1000,
top: 0,
buy: 0,
ban: false,
nickname: `${info[0].first_name} ${info[0].last_name}` ,
home: `отсутствует`,
phone: `отсутствует`,
car: `отсутствует`,
		"shop": 22400,
		"res": 0,
		"job1": 0,
		"job": 0,
		"warn":0,		
role:`Обычный игрок`	
};
    }
    await context.reply(`Айди пользователя: ${link.id} \n айди чата: ${ context.isChat ? "#" + context.chatId : "" }`);
});

updates.hear(/^\топ\s*$/i, (context) => {
    // Для хранения юзверов
    let _users = [];
    // Перебираем нашу "базу"
    for (let key in users) {
        // Не пропускаем админов или заблокированных
        if (users[key].permission === 0 && !users[key].ban){
            _users.push({
                id: key,
                balance: users[key].balance,
				nickname: users[key].nickname,
            });
        }
    }
    // Отправляем результат
    return context.send(
        "&#128201; Топ-10 по балансу:\n" +
        _users
            .sort((a, b) => b.balance - a.balance)  // Сортируем по балансу
            .slice(0, 10)   // Берем только 10 элементов
            .map((x, i) => `${++i}. @id${x.id}(${x.nickname}) - ${x.balance}`)
            .join("\n")
    );
});

updates.hear(/^\рейтинг\s*$/i, (context) => {
    // Для хранения юзверов
    let _users = [];
    // Перебираем нашу "базу"
    for (let key in users) {
        // Не пропускаем админов или заблокированных
        if (users[key].permission === 0 && !users[key].ban){
            _users.push({
                id: key,
                top: users[key].top,
				nickname: users[key].nickname,
            });
        }
    }
    // Отправляем результат
    return context.send(
        "&#128201; Топ-10 по рейтингу:\n" +
        _users
            .sort((a, b) => b.top - a.top)  // Сортируем по балансу
            .slice(0, 10)   // Берем только 10 элементов
            .map((x, i) => `${++i}. @id${x.id}(${x.nickname}) - ${x.top}`)
            .join("\n")
    );
});


updates.hear(/^\лист\s*$/i, (context) => {
    if (context.user.permission < 5) return context.send(`У вас нет на это прав!`);	
    // Для хранения юзверов
    let _users = [];
    // Перебираем нашу "базу"
    for (let key in users) {
        // Не пропускаем админов или заблокированных
        if (!users[key].ban){
            _users.push({
                id: key,
                permission: users[key].permission,
				nickname: users[key].nickname,
            });
        }
    }
    // Отправляем результат
    return context.send(
        "&#128201; permissions list:\n" +
        _users
            .sort((a, b) => b.permission - a.permission)  // Сортируем по балансу
            .slice(0, 20)   // Берем только 10 элементов
            .map((x, i) => `${++i}. @id${x.id}(${x.nickname}) - ${x.permission}`)		
            .join("\n")
    );
});


updates.hear("ping", async (context) => {
    await context.send("pong!");
});
updates.hear(/^\сохра/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["svsme"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});
updates.hear(/^\игра начать/i, async (context) => {
yyy = 1
await ctx.send(`OK!`)
if (yyy == 1) {
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["svsme"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = 1
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
}
})

updates.hear(/^\мем\s*$/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["dobriememes", "amfet1", "greatmem","memes_bot"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});
const {Keyboard} = require("vk-io");
updates.hear(/(?:добавь клаву)/i, async (context) => {
	await context.send(`Клавиатура появилась...`, {
	keyboard:
	Keyboard.keyboard([
			[
					Keyboard.textButton({
							label: 'Бонус',
							color: Keyboard.primary_COLOR
					}),
					Keyboard.textButton({
							label: 'Баланс',
							color: Keyboard.PRIMARY_COLOR
					}),
					Keyboard.textButton({
							label: 'Хелп',
							color: Keyboard.PRIMARY_COLOR
					}),
					Keyboard.textButton({
							label: 'Профиль',
							color: Keyboard.PRIMARY_COLOR
					}),					
			]])
});
});

updates.hear(/^\котик\s*$/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["yurayanov4896", "koteiki_murkoteiki", "koshki2017","catsmyfriends2017"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});
updates.hear(/^\песик\s*$/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["dogbowwow"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});	
updates.hear(/^\лоли\s*$/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["publicdlinnovolosieloli"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});	

updates.hear(/^\картинка\s*$/i, async (context) => {
    // Получаем стену рандомного паблика
    let { items } = await userapi.api.wall.get({
        domain: getRandomElement(["dogbowwow","foto_pazl","club5074","club_tenderness_by"]),
        offset: 1,
        count: 200
    });
    // Выбираем случайный пост
    let item = getRandomElement(items);
    // Выбираем именно первое изображение из поста
    item = item.attachments[0].photo;
    // Отправляем результат
    await context.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});



updates.hear(/^\путёвка\s*$/i, async (context) => {
if (context.user.balance < 1000000 && ctx.user.top < 300) return ctx.send(`Вы ещё не можете переехать из своего города!`)
ctx.user.map = `${getRandomElement(["Токио","Санкт-Петербург","Екатеринбург","Москва","Анапа","Новосибирск","Владивосток","Альпы","Берлин","Вена","Венеция","Дубай","Казань","Киев","Лондон","Лас-Вегас","Нью-Йорк","Омск","Париж","Сочи","Уфа","Челябинск","Чебоксары","Абу-Даби","Агиос-Николаос","Акапулько","Бангалор","Базель","Алеппо","Бейрут","Белград","Вильнюс","Вашингтон","Балчик","Берлин","Анкоридж","Бирмингем","Бостон","Бразилиа","Бристоль","Венеция","Дрезден","Дубровник","Дурбан","Йоханнесбург","Кабул","Лагос","Маастрихт","Майами","Ла-Пинеда","Катовице","Краков","Пальма-де-Майорка","Пенанг","Плайя-дель-Кармен","Познань","Сиануквиль","Сиемреап","Охрид","Регенсбург","Спарта","Ставангер","Стара-Загора","Стокгольм","Стара-Загора","Рио-де-Жанейро","Стокгольм","Роттердам","Сува","Филадельфия","Чиангмай","Шанхай","Эдинбург","Хельсинки","Эдмонтон","Хошимин","Тяньцзинь","Яссы"])}`

    await context.send(`Вы переехали в ${ctx.user.map} \n Стоимость путёвки: ${count = getRandomInt(100000,1000000)}`);
	ctx.user.balance -= count
});
updates.hear(/^\/запись/i, async (context) => {
if (context.user.permission < 6 ) return ctx.send(`нет прав!`)
let users = require('./users.json');
require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
    await context.send(`БД Сохранена!`);
});

updates.hear(/^\rand ([0-9]+)/i, async(context) => {
    await context.send(
        `Случайное число -- ${ getRandomInt(context.$match[1]) }`
    );
});

async function run() {
    await vk.updates.startPolling();
    console.log(chalk.blue("Longpoll started"));     console.log(chalk.green("vk.com/botment01"));     console.log(chalk.green("оффициальный канал сливов и другого www.youtube.com/tiranYT"));
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
 
 setInterval(() => {
let users = require('./users.json');
require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
}, 200);
 
// Random element from array
function getRandomElement(array) {
    return array[getRandomInt(array.length - 1)];
}
