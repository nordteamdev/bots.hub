const {VK} = require('vk-io'); 
const {Keyboard} = require('vk-io');
const vk = new VK(); 
const {updates, api, snippets, upload} = vk; 
const fs = require('fs');
const request = require('request-promise');
const chalk = require('chalk');
const base = require('./base.json');
const reports = require('./reports.json');
const design = require('./design.json');
const posts = require('./posts.json');
const mg = require('./mg.json');
const apijson = require('./api.json');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(800, 800)
const Canvas = require('canvas');
const ctx = canvas.getContext('2d')
const path = require('path')
const adminchat = 1;
const dcoinsone = `product-189321788_4169734`
vk.setOptions({ 
token: "1056fc770323ac7a19bfc420a55e85c313559e3dc15b74d3cbc4fd14e1c69bbe4d41d5b2ffab300360758", 
apiMode: "parallel", 
pollingGroupId: 191270429 
});
const page = new VK();
 page.setOptions({token: `6a111e6bb6dbae98c556b55fc2ac072e6e83a034d9b3d9ce4622bcaf7d29f9c2ece7b2f88769ddb516e9b`});


setInterval(function(){
        fs.writeFileSync("./api.json", JSON.stringify(apijson, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./mg.json", JSON.stringify(mg, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./base.json", JSON.stringify(base, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./reports.json", JSON.stringify(reports, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./design.json", JSON.stringify(design, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./posts.json", JSON.stringify(posts, null, "\t")) 
}, 2000); // обновление базы данных
function rand(text) {
	let tts = Math.floor(text.length * Math.random())
	return text[tts]
}
function kovbaska(chislo){
		// by @kovbaska_gg
		chislo = `a${chislo}`
		chislo = chislo.replace(`a`,``)
		if(chislo.includes(`e`)) {
			if(chislo.includes(`.`)) {
				var plus = '.';
				var array = splitString(chislo, plus);
				let zz = array.length
				zz -= Number(1)
				var oz = '+';
				var newb = splitString(array[zz], oz);
				chislo = `${array[0]}e+${newb[1]}`
			}
			return chislo			
		}
		if(Number(chislo) > 999999999999999) {
		if(Number(chislo) < 1000000000000000000) {
			let o = chislo.slice(0, -15)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -12)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}квадр`
			return `${o}квадр`
		}
		if(Number(chislo) < 1000000000000000000000) {
			let o = chislo.slice(0, -18)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -15)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}квинт`
			return `${o}квинт`
		}
		if(Number(chislo) < 1000000000000000000000000) {
			let o = chislo.slice(0, -21)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -18)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}секстлн`
			return `${o}секстлн`
		}
		if(Number(chislo) < 1000000000000000000000000000) {
			let o = chislo.slice(0, -24)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -21)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}септлн`
			return `${o}септлн`
		}
		if(Number(chislo) < 1000000000000000000000000000000) {
			let o = chislo.slice(0, -27)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -24)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}октлн`
			return `${o}октлн`
		}
		if(Number(chislo) < 1000000000000000000000000000000000) {
			let o = chislo.slice(0, -30)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -27)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}нонилн`
			return `${o}нонилн`
		}
		if(Number(chislo) < 1000000000000000000000000000000000000) {
			let o = chislo.slice(0, -33)
			if(o < 1) o = 1
			let checker = chislo.slice(0, -30)
			 checker = checker.slice(1, 4)
			checker = Number(checker)
			
			if(checker > 0) return `${o}.${checker}децилн`
			return `${o}децилн`
		}
		return `infinity`
	}
	chislo = Number(chislo)
	return utils.sp(chislo)
}


function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings
}

const cars = [
	{
	"name": `Самокат`,
	"id": 1,
	"xp": 0,
	"fuel": 0,
	"cost": 1500
	},
	{
	"name": `Велосипед`,
	"id": 2,
	"xp": 50,
	"fuel": 0,
	"cost": 37500
	},
	{
	"name": `Гироскутер`,
	"id": 3,
	"xp": 250,
	"fuel": 0,
	"cost": 45000
	},
	{
	"name": `Сегвей`,
	"cost": 195000,
	"xp": 500,
	"fuel": 50,
	"id": 4
	},
	{
	"name": `Мопед`,
	"id": 5,
	"xp": 750,
	"fuel": 100,
	"cost": 375000
	},
	{
	"name": `Мотоцикл`,
	"id": 6,
	"xp": 1000,
	"fuel": 150,
	"cost": 1680000
	},
	{
	"name": `ВАЗ 2109`,
	"id": 7,
	"xp": 1250,
	"fuel": 200,
	"cost": 3900000
	},
	{
	"name": `Квадроцикл`,
	"id": 8,
	"xp": 1500,
	"fuel": 250,
	"cost": 6000000
	},
	{
	"name": `Багги`,
	"id": 9,
	"xp": 1750,
	"fuel": 300,
	"cost": 9900000
	},
	{
	"name": `Вездеход`,
	"id": 10,
	"xp": 2000,
	"fuel": 350,
	"cost": 22500000
	},
	{
	"name": `Лада Xray`,
	"id": 11,
	"xp": 2500,
	"fuel": 400,
	"cost": 45000000
	},
	{
	"name": `Audi Q7`,
	"id": 12,
	"xp": 3000,
	"fuel": 450,
	"cost": 60000000
	},
	{
	"name": `BMW X6`,
	"id": 13,
	"xp": 4500,
	"fuel": 500,
	"cost": 70500000
	},
	{
	"name": `Toyota FT-HS`,
	"id": 14,
	"xp": 6000,
	"fuel": 550,
	"cost": 84000000
	},
	{
	"name": `Mercedes-Benz G500`,
	"id": 15,
	"xp": 8000,
	"fuel": 600,
	"cost": 96600000
	},
	{
	"name": `Subaru WRX STI`,
	"id": 16,
	"xp": 10000,
	"fuel": 650,
	"cost": 98100000
	},
	{
	"name": `Lamborghini Veneno`,
	"id": 17,
	"xp": 12500,
	"fuel": 700,
	"cost": 193500000
	},
	{
	"name": `Tesla Roadster`,
	"id": 18,
	"xp": 15000,
	"fuel": 750,
	"cost": 223500000
	},
	{
	"name": `Yamaha YZF R6`,
	"id": 19,
	"xp": 175000,
	"fuel": 800,
	"cost": 285000000
	},
	{
	"name": `Bugatti Chiron`,
	"id": 20,
	"xp": 20000,
	"fuel": 825,
	"cost": 301500000
	},
	{
	"name": `Ferrari LaFerrari`,
	"id": 21,
	"xp": 25000,
	"fuel": 850,
	"cost": 417000000
	},
	{
	"name": `Koenigsegg Regera`,
	"id": 22,
	"xp": 37500,
	"fuel": 875,
	"cost": 450000000
	},
	{
	"name": `Tesla Semi`,
	"id": 23,
	"xp": 40000,
	"fuel": 900,
	"cost": 825000000
	},
	{
	"name": `Venom GT`,
	"id": 24,
	"xp": 42500,
	"fuel": 925,
	"cost": 975000000
	},
	{
	"name": `Rolls-Royce`,
	"id": 25,
	"xp": 45000,
	"fuel": 950,
	"cost": 2250000000
	},
	{
	"name": `Thrust SSC`,
	"id": 26,
	"xp": 47500,
	"fuel": 975,
	"cost": 4650000000
	},
	{
	"name": `Devel Sixteen`,
	"id": 27,
	"xp": 50000,
	"fuel": 1000,
	"cost": 5790000000
	},
    {
    "name": `Bugatti Veyron Super Sport`,
    "id": 28,
    "xp": 0,
     "fuel": 10000,
     "cost": 30019500000
    }
];

const computers = [
{
	"name": "DЕXР Аquilоn О175",
	"id": 1,
	"xp": 0,
	"cost": 30000
},
{
	"name": "HYРЕRРС NЕО",
	"id": 2,
	"xp": 250,
	"cost": 1500000
},
{
	"name": "DЕLL Аliеnwаrе Аurоrа R7",
	"id": 3,
	"xp": 500,
	"cost": 3000000
},
{
	"name": "HYРЕRРС СОSMОS X 3",
	"id": 4,
	"xp": 750,
	"cost": 9000000
},
{
	"name": "HYРЕRРС РRЕMIUM",
	"id": 5,
	"xp": 1000,
	"cost": 15000000
}
]
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
e = d + ['', 'тыс', 'млн', 'млрд', 'трлн', `квнтлн`][k]; 

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
text += `${int[i]}⃣`; 
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

function rand(text) {
	let tts = Math.floor(text.length * Math.random())
	return text[tts]
}



function getRandomInRange(min, max) { 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}; //Функция выбора рандомного числа

var now = new Date();
function addZero(num) { return ('0' + num).slice(-2); }

function nols(num) {
    if(num < 10) return('0' + num)
    if(num > 9) return(num)
}

function find(array, value) { 
for (var i = 0; i < array.length; i++) { 
if (array[i] == value) return i; 
} 
return -1; 
};

const menukeyboard = [
[ 
            Keyboard.textButton({ 
            label: '🌴 Пальма', 
            color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({ 
            label: '🎁 Бонус', 
            color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({ 
            label: '📦 Сундуки', 
            color: Keyboard.NEGATIVE_COLOR
            }),
            
      ],
      [
       Keyboard.textButton({ 
       label: '🐯 Профиль', 
       color: Keyboard.PRIMARY_COLOR
       }),
       Keyboard.textButton({ 
       label: '🖼 Рисунок', 
       color: Keyboard.PRIMARY_COLOR
       }),
       Keyboard.textButton({ 
       label: '🏁 Гонка', 
       color: Keyboard.POSITIVE_COLOR
       })
      ],
      [
            Keyboard.applicationButton({ 
            label: 'Добавить в беседу', 
            appId: 6441755,
            ownerId: -191270429
            })
      ]
]
fs.readFile('example_log.txt', function (err, logData) {});
updates.use(async (context, next) => {
 if(context.isGroup)  return
 if(context.isOutbox) return
 if(context.senderId === undefined) return

if(!base.id[context.senderId]){
	base.context.id += Number(1)
	base.id[context.senderId] = {
		id: base.context.id
		}
	vk.api.call("users.get", {
    user_ids: context.senderId
  }).then(res => {
   const now = new Date(); 
  now.setHours(now.getHours() + (now.getTimezoneOffset()/60) + 3)
  let date = `${now.toLocaleString()}`
  const bb = new Date; 
  var array = splitString(date, `,`);
  var arraytwo = splitString(array[0], `/`);
    base.bs[base.context.id] = {
    id: context.senderId,
    nick: `${res[0].first_name}`,
    bananas: 5000000,
    dbananas: 0,
    nicknotify: true,
	subscribed: false,
	bonus: 0,
    dcoins: 0,
    karma: 0,
    verification: 0,
    token: ``,
	hide: false,
	topenabled: true,
	banreason: ``,
	promoactive: false,
	banned: false,
	rank: 1,
	reg: `📚 Дата регистрации: ${arraytwo[1]}.${arraytwo[0]}.${arraytwo[2]}, ${bb.getHours() + (bb.getTimezoneOffset()/60) + 3}:${bb.getMinutes() + (bb.getTimezoneOffset()/60) + 5}`,
	platform: false,
	computerid: 0,
	computername: ``,
    gonka: 0,
	rating: 0,
	lvl: 1,
	bank: 0,
	longnick: false,
	payban: false,
	lastpay: ``,
	payalltime: 0,
	givelimit: 0,
	givetime: 1440,
	reportban: false,
	lastactivity: `${arraytwo[1]}.${arraytwo[0]}.${arraytwo[2]}, ${bb.getHours() + (bb.getTimezoneOffset()/60) + 3}:${bb.getMinutes() + (bb.getTimezoneOffset()/60) + 5}`, 
  paylimit: 0,
	notifications: true,
	palm_btc: 0,
	palmid: 0,
	palms: 0,
	carwins: 0,
	palmtime: 0,
	palmname: ``,
    lazat: 0,
    xp: 0,
    fuel: 0,
    poxod: 0,
    vzlom: 0,
    carname: ``,
    lsmessage: false,
    designlvl: 0,
    carid: 0,
    inmg: 0,
    mgcreate: {
    	"mygames": {},
    	"editgame": 0,
    	"step": 0,
    	"text": 0,
    	"type": 0,
    	"pyt": 0
    },
    crates: {
    	"wooden": 0,
    	"silver": 0,
    	"donate": 0,
    	"premium": 0,
    	"present": 0
    }
    }
 context.send({ 
message: `👋 Привет, *id${context.senderId} (${res[0].first_name})!
🎲 Я игровой Bot Banana, во мне довольно много развлекательных команд, которые помогут скоротать время и найти новых друзей. Не забудь, пожалуйста, подписаться.
🍌 Основная валюта - Бананы, их можно получать играя в казино, сажая пальмы и т.п!
📖 Узнай все мои команды, введи «помощь»

 `, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2]
   ])
  }) 
})
 setTimeout(() => context.sendSticker(12707), 2000)
 }
 
if (context.text) {
console.log(chalk.yellow(`@id${context.senderId} ${ context.isChat ? "#" + context.chatId : "" }, text: ${ context.text.slice(0, 360) }`));
    }
    

if(context.payload){
let abc = 0
let oo = 0
if(!context.payload.message) oo = 1
if(oo == Number(0)) {
if(!context.payload.message.attachments[0]) abc = Number(1)
if(abc == Number(0)){
	console.log(context.payload.message.attachments)
if(context.payload.message.attachments[0].type == `graffiti` && base.bs[base.id[context.senderId].id].designlvl !== Number(1) && base.bs[base.id[context.senderId].id].designlvl !== Number(0)) {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}


if(context.isChat) return context.send(`${nick}, данную команду нельзя использовать в беседах, отправь мне ее в личные сообщения ${cool}`)
design.id += Number(1)
design.wait[design.id] = {
"sender": context.senderId,
"senderid": base.id[context.senderId].id
}
let o = user.designlvl
user.designlvl = Number(1)

context.send({forward_messages: context.id, message: `${nick} — отправил рисунок на проверку по теме: «${o}»! 🖼️\n🤔 Просьба: оценить данный рисунок , используя кнопки`, peer_id: 2000000001, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '1⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 1,
            "quest": o
             },
            color: Keyboard.NEGATIVE_COLOR
            }),
           Keyboard.textButton({ 
            label: '2⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 2,
            "quest": o
             },
            color: Keyboard.NEGATIVE_COLOR
            })
      ],
      [      
           Keyboard.textButton({ 
            label: '3⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 3,
            "quest": o
             },
            color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({ 
            label: '4⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 3,
            "quest": o
             },
            color: Keyboard.PRIMARY_COLOR
            })
       ],
      [
           Keyboard.textButton({ 
            label: '5⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 4,
            "quest": o
             },
            color: Keyboard.POSITIVE_COLOR
            })
      ]  
   ]).inline(true)
  }) 
return context.send(`${nick}, ваш рисунок отправлен администрации на проверку, скоро вы получите за него призы 🖼️\n✍️ Можете написать: «рисунок» и приступать к новому рисунку.`)
}
}
}
}

if(context.text) {
	if(context.isUser || context.isChat) {

		let xp = Number(base.bs[base.id[context.senderId].id].xp)
let minus = 100
let o = base.bs[base.id[context.senderId].id].lvl
o -= Number(1)
minus *= Number(o)
if(base.bs[base.id[context.senderId].id].lvl > 1) {
	xp -= Number(minus)
}
if(xp > 99) {
	 base.bs[base.id[context.senderId].id].lvl += Number(1)
	let d = getRandomInRange(10000, 100000)
	d *= Number(base.bs[base.id[context.senderId].id].lvl)
	base.bs[base.id[context.senderId].id].dbananas += Number(d)

	let j = base.bs[base.id[context.senderId].id].lvl
	j -= Number(1)
	let m = Number(100)
	m *= Number(j)
	xp -= Number(m)
	context.send(`${base.bs[base.id[context.senderId].id].nick}, Вы получили +${kovbaska(d)}💎 За новый уровень (${base.bs[base.id[context.senderId].id].lvl}) 🆙`)
}
if(base.bs[base.id[context.senderId].id].lsmessage == false && context.isUser) base.bs[base.id[context.senderId].id].lsmessage = true
if(base.bs[base.id[context.senderId].id].reg.includes(`undefined`)) base.bs[base.id[context.senderId].id].reg = ``
if(base.bs[base.id[context.senderId].id].mgcreate.editgame > 0) {
	if(base.bs[base.id[context.senderId].id].mgcreate.step == 1) {
		let usericon = context.text
		usericon = usericon.replace(/[a-zа-яё]/g, "")
		usericon = usericon.replace(/[a-z]/g, "")
		usericon = usericon.replace(/([0-9]+)/g, "")
		if(usericon.length < 1 || usericon.length == 1) return context.send(`⛔ Отправьте только смайлик (иконку) !`)
		if(usericon.length > 2) return context.send(`⛔ Отправьте только один смайлик!`)
		mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].icon = usericon
		base.bs[base.id[context.senderId].id].mgcreate.step = Number(2)

		return context.send(`✅ Отлично! Теперь отправьте название вашей мини-игры`)
 
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == 2) {
		let username = context.text
		if(username.length < 3) return context.send(`⛔ Минимальный размер навзания: 3 символа`)
		if(username.length > 10) return context.send(`⛔ Максимальный размер навзания: 10 символов`)
		for(let o in mg.games){
			if(mg.games[o].name == username) return context.send(`⛔ Данное название уже используется, придумайте новое.`)
		}
		mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].name = username
		base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
		context.send(`✅ Мини-игра: [${mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].icon}] ${mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].name} - Успешно создана! Открыть редактор можно командой: /mgedit`)
	
		base.bs[base.id[context.senderId].id].mgcreate.editgame = Number(0)

	 		
	}


}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == 3) {
		if(context.messagePayload) {
		if(mg.games[context.messagePayload.mgforedit].creatorvk !== context.senderId) {
			base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
			base.bs[base.id[context.senderId].id].mgcreate.editgame = Number(0)
			return context.send({message: `⛔ Ошибка`, keyboard: Keyboard.keyboard([])})
		}
		base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
		base.bs[base.id[context.senderId].id].mgcreate.editgame = Number(context.messagePayload.mgforedit)

		return context.send(`✅ Мини-игра для редактирования выбрана! Напишите: <</mgedit>>, Для открытия редактора`)
	}
		return context.send(`⛔ Выберите мини-игру из списка`)
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == Number(4)) {
		if(mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[context.text]) return context.send(`⛔ Данная команда уже существует, выберите другое название`)
		mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[context.text] = {
			"task": context.text,
			"code": "",
			"params": {}
		}
		base.bs[base.id[context.senderId].id].mgcreate.step = 0
		return context.send({message: `✅ Команда добавлена! Настроить её можно в редакторе: /mgedit`})
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == Number(5)) {
			context.text = context.text.replace(`$args[0]`, `needreplace{$args[0]needreplace}`)
			context.text = context.text.replace(`$args[1]`, `needreplace{$args[1]needreplace}`)
			context.text = context.text.replace(`$args[2]`, `needreplace{$args[2]needreplace}`)
			context.text = context.text.replace(`$args[3]`, `needreplace{$args[3]needreplace}`)
			context.text = context.text.replace(`$args[4]`, `needreplace{$args[4]needreplace}`)
			context.text = context.text.replace(`$args[5]`, `needreplace{$args[5]needreplace}`)
			context.text = context.text.replace(`$args[6]`, `needreplace{$args[6]needreplace}`)
			context.text = context.text.replace(`$args[7]`, `needreplace{$args[7]needreplace}`)
			context.text = context.text.replace(`$args[8]`, `needreplace{$args[8]needreplace}`)
			context.text = context.text.replace(`$args[9]`, `needreplace{$args[9]needreplace}`)
			context.text = context.text.replace(`$args[10]`, `needreplace{$args[10]needreplace}`)


		mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[base.bs[base.id[context.senderId].id].mgcreate.pyt].code += `\ncontext.send("${context.text}")`
		
		base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
		return context.send(`✅ Ответ добавлен! Протестировать мини-игру можно командой: /mgtest`)
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == 6) {
	if(!context.text.includes(`,`)) return context.send(`⛔ Неправильный синтаксис, пример: 1,6`)
	var array = splitString(context.text, `,`);
	if(!Number(array[0]) || !Number(array[1])) return context.send(`⛔ Неправильный синтаксис, пример: 1,6`)
	base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
	let randparam = `rand${getRandomInRange(1, 1000)}`
	while(mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[base.bs[base.id[context.senderId].id].mgcreate.pyt].params.randparam){
		randparam = `rand${getRandomInRange(1, 1000)}`
	}

	mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[base.bs[base.id[context.senderId].id].mgcreate.pyt].params[randparam] = {
		"tag": randparam,
		"code": `let thisrandom${randparam} = getRandomInRange(${array[0]}, ${array[1]})\nwhile(evalcode.includes("$${randparam}")){\nevalcode = evalcode.replace("$${randparam}", thisrandom${randparam})\n}`
	}
	return context.send(`✅ Добавлена новая переменная! $${randparam}`)
	}

	if(context.messagePayload && context.messagePayload.commandfordelete) {
		delete mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[context.messagePayload.commandfordelete]
		return context.send({message: `✅ Команда: <<${context.messagePayload.commandfordelete}>> Была удалена, откройте редактор командой: /mgedit`, keyboard: Keyboard.keyboard([])})
	}
	if(context.messagePayload && context.messagePayload.commandforedit) {
		base.bs[base.id[context.senderId].id].mgcreate.pyt = context.messagePayload.commandforedit
		return context.send({message: `✅ Команда для редактирования выбрана! Выберите действие:`, keyboard: Keyboard.keyboard([
			[ 
            Keyboard.textButton({ 
            label: '❌ Удалить', 
            color: Keyboard.NEGATIVE_COLOR,
            payload: {
            	"commandfordelete": context.messagePayload.commandforedit
            }
            })      
            ],
            [
            Keyboard.textButton({ 
            label: '➕ Добавить шаг', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"commandforadd": context.messagePayload.commandforedit
            }
            })  
            ]
		 ])})
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == Number(7)) {
		if(context.text.includes(`Number`)) {
		if(!context.text.includes(`if`) || context.text.includes(` if`) || !context.text.includes(`if(`) || !context.text.includes(`(`) || !context.text.includes(`)`)) return context.send(`⛔ условие неправильно`)
		}
		if(!context.text.includes(`Number`)) {
		if(!context.text.includes(`if`) || context.text.includes(` if`) || context.text.includes(`) `) || !context.text.includes(`if(`) || !context.text.includes(`(`) || !context.text.includes(`)`)) return context.send(`⛔ условие неправильно`)
		}

		base.bs[base.id[context.senderId].id].mgcreate.step = Number(8)
		base.bs[base.id[context.senderId].id].mgcreate.text = context.text
		return context.send(`✏ Теперь отправьте ответ бота, если условие будет выполнено...`)
	}
	if(base.bs[base.id[context.senderId].id].mgcreate.step == Number(8)) {
		base.bs[base.id[context.senderId].id].mgcreate.step = Number(0)
		context.text = context.text.replace(`$args[0]`, `needreplace{$args[0]needreplace}`)
		context.text = context.text.replace(`$args[1]`, `needreplace{$args[1]needreplace}`)
		context.text = context.text.replace(`$args[2]`, `needreplace{$args[2]needreplace}`)
		context.text = context.text.replace(`$args[3]`, `needreplace{$args[3]needreplace}`)
		context.text = context.text.replace(`$args[4]`, `needreplace{$args[4]needreplace}`)
		context.text = context.text.replace(`$args[5]`, `needreplace{$args[5]needreplace}`)
		context.text = context.text.replace(`$args[6]`, `needreplace{$args[6]needreplace}`)
		context.text = context.text.replace(`$args[7]`, `needreplace{$args[7]needreplace}`)
		context.text = context.text.replace(`$args[8]`, `needreplace{$args[8]needreplace}`)
		context.text = context.text.replace(`$args[9]`, `needreplace{$args[9]needreplace}`)
		context.text = context.text.replace(`$args[10]`, `needreplace{$args[10]needreplace}`)
		mg.games[base.bs[base.id[context.senderId].id].mgcreate.editgame].commands[base.bs[base.id[context.senderId].id].mgcreate.pyt].code += `\n${base.bs[base.id[context.senderId].id].mgcreate.text} return context.send("${context.text}")`
		return context.send(`✅ Условие добавлено!`)
	}

}

	if(base.bs[base.id[context.senderId].id].inmg > 0) {
		if(context.text == `/exit` || context.text == `exit`) {
			base.bs[base.id[context.senderId].id].inmg = Number(0)
			return context.send(`✅ Вы успешно вышли из данной мини-игры`)
		}
		context.text = context.text.toLowerCase()
		let game = base.bs[base.id[context.senderId].id].inmg
		for(let o in mg.games[game].commands) {
			let check = mg.games[game].commands[o].task.toLowerCase()
			if(context.text.includes(check)) {
				let evalcode = mg.games[game].commands[o].code
					if(evalcode.includes(`$name`)) {
						const nameget = await vk.api.users.get({user_ids: context.senderId, fields: `first_name`})
						evalcode = evalcode.replace(`$name`, nameget[0].first_name)
					}
				for(let pc in mg.games[game].commands[o].params) {
							if(evalcode.includes(`$${mg.games[game].commands[o].params[pc].tag}`)) {
								eval (mg.games[game].commands[o].params[pc].code)
							}
						}
				if(evalcode.includes(`$args`)) {		
					evalcode = `let $args = splitString(context.text, " ")${evalcode}`
					console.log(evalcode)
				}
				while(evalcode.includes(`needreplace{`)) {
					evalcode = evalcode.replace(`needreplace{`,`" +`)
					//evalcode = evalcode.replace(`thisthing`, `{`)
				}
				while(evalcode.includes(`needreplace}`)) {
					evalcode = evalcode.replace(`needreplace}`,`+ "`)
				}
				evalcode = `function evalcomplete (){\n${evalcode}\n}\nevalcomplete()`
				eval(evalcode)
				return
			}
		}
		return context.send(`❌ Команда: <<${context.text}>> Данной мини-игры не найдена, выйти из игры можно командой: /exit`)
	}
}
try {

        await next();
 } catch (err) { console.error(err)
                error = `${error} \n \n ${err}`}
    require('fs').writeFileSync('./base.json', JSON.stringify(base, null, '\t'));
});



vk.updates.use(async (message, next) => {

    // комментарий оставь
    await next(); 
});

// ⛔ ✅


// ⛔ ✅







sad = `😮`
happy = `😊`
cool = `😎`
setInterval(function(){
sad = rand([`😐`,`😒`,`😣`,`😮`,`😑`,`😯`,`😟`,`😔`,`☹️`,`😢`])
happy = rand([`😁`,`👍`,`😊`,`😗`,`😀`,`🤗`,`😌`,`🙃`])
cool = rand([`😎`,`👍`,`🤑`,`🤠`])
}, 5000) // смайлы
setInterval(function(){
for(let o in base.bs){
if(base.bs[o].lazat > 0){
base.bs[o].lazat -= 1;
}
}
}, 60000) // таймер команды: "лазать"
setInterval(function(){
for(let o in base.bs){
if(base.bs[o].poxod > 0){
base.bs[o].poxod -= 1;
}
}
}, 60000) // таймер команды: "поход"
setInterval(function(){
for(let o in base.bs){
if(base.bs[o].vzlom > 0){
base.bs[o].vzlom -= 1;
}
}
}, 60000) // таймер команды: "воровать"
setInterval(function(){
for(let o in base.bs){
if(base.bs[o].bonus > 0){
base.bs[o].bonus -= 1;
}
}
}, 60000) // таймер команды: "бонус"
setInterval(function(){
for(let o in base.bs){
if(base.bs[o].palms > 0){
	base.bs[o].palmtime -= 1;
	if(base.bs[o].palmtime < 1) {
		base.bs[o].palmtime = Number(60)
let plus = 0
if(base.bs[o].palmid == 1) {
	plus = 10
}
if(base.bs[o].palmid == 2) {
	plus = 50
}
if(base.bs[o].palmid == 3) {
	plus = 500
}
plus *= Number(base.bs[o].palms)
if(base.bs[o].rank == 2) {
	plus *= Number(2)
}
if(base.bs[o].rank > 2) {
	plus *= Number(3)
}
base.bs[o].palm_btc += Number(plus)

}
}
}
}, 60000) // таймер пальм

setInterval(async function() {
const bit = await request("http://api.cryptonator.com/api/ticker/btc-usd"); 
var x = JSON.parse(bit) 
let o = Math.floor(Number(x.ticker.price))
o *= Number(3)
base.context.kyrc = Number(o)
console.log(chalk.red(`> Новый курс! ${kovbaska(o)}🍌`))
}, 60000) // таймер курса бриллиантовых бананов

updates.hear(/^(?:~replace)\s([0-9]+)\s(.*)\s(.*)$/i,(context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
 if(user.rank < 5) return 
 if(!base.bs[context.$match[1]]) return context.send(`Error: (User with id: ${context.$match[1]} not founded) ❎`) 
 if(user.rank < 6){
    if(context.$match[2] == "bananas" || context.$match[2] == "id" || context.$match[2] == "bank" || context.$match[2] == "rate" || context.$match[2] == "rank" || context.$match[2] == "farms") return context.send(`Error: (Can't change this task) ❎`)
 } 
 base.bs[context.$match[1]][context.$match[2]] = 1
 if(Number(base.bs[context.$match[1]][context.$match[2]])) { 
  base.bs[context.$match[1]][context.$match[2]] = Number(context.$match[3]) 
  let one = context.$match[2]
  let two = context.$match[3]
  vk.api.messages.send({chat_id: adminchat, message:`
[#LOG]
*id${context.senderId} (Разработчик ⚙️) изменил значение переменной «${one}» игроку: "*id${base.bs[context.$match[1]].id} (${base.bs[context.$match[1]].nick})" На: «${(two)}» `})
  return context.send(`Successful - NUM ☑`) 
 } else { 
  base.bs[context.$match[1]][context.$match[2]] = context.$match[3]; 
  return context.send(`Successful - STR ☑`) 
 } 
})

updates.hear(/(?:newtask_num)\s(.*)\s(.*)$/i,async (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 100) return 
let basad = [] 
for (let i in base.bs){
basad.push({ 
id: i 
}) 
} 
for (let j = 0; j < basad.length; j++){ 
base.bs[basad[j].id][context.$match[1]] = Number(context.$match[2]) 
} 
return context.send(`Вы успешно добавили новые переменные`) 
}) 

setInterval(function (){
if(base.context.likepost !== Number(0)) {
	base.context.likeposttime -= Number(1)
	if(base.context.likeposttime > 0) {
		if(base.context.likeposttype == 1) return page.api.wall.edit({owner_id: -189321788, post_id: base.context.likepost, message: `👍🏻 Поставь лайк на эту запись и получи что-то из этих предметов: 1.000.000.000🍌/50.000💎/500🌀/до 50🏷
⏳ Призы будут выданы ровно через ${base.context.likeposttime} минут(-у)`})
	}
	if(base.context.likeposttime < 1) {
		if(base.context.likeposttype == 1) {
			page.api.wall.edit({owner_id: -189321788, post_id: base.context.likepost, message: `👍🏻 Поставь лайк на эту запись и получи что-то из этих предметов: 1.000.000.000🍌/50.000💎/500🌀/до 50🏷
⏳ Призы успешно выданы участникам раздачи.`})
			page.api.likes.getList({type: `post`, owner_id: -189321788, item_id: base.context.likepost}).then(res => {
				console.log(res)
				if(!res.items[0]) {
					console.log(`denied razda4a`)
					return
				}
			for(let o in res.items){
			if(base.id[res.items[o]]) {
				let b = base.bs[base.id[res.items[o]].id]
				let type = getRandomInRange(1, 4)
				if(type == 1) {
					b.bananas += Number(1000000)
					vk.api.messages.send({user_id: b.id, message: `Вы получили +1.000.000.000🍌, за участие в раздаче ${happy}`})
				}
				if(type == 2) {
					b.dbananas += Number(50000)
					vk.api.messages.send({user_id: b.id, message: `Вы получили +50,000💎, за участие в раздаче ${happy}`})
				}
				if(type == 3) {
					b.karma += Number(500)
					vk.api.messages.send({user_id: b.id, message: `Вы получили +500🌀, за участие в раздаче ${happy}`})
				}
				if(type == 4) {
					let it = getRandomInRange(5, 50)
					b.dcoin += Number(it)
					vk.api.messages.send({user_id: b.id, message: `Вы получили +${it}🏷, за участие в раздаче ${happy}`})
				}
			}
			}
			base.context.likepost = Number(0)
			base.context.likeposttime = Number(0)
			base.context.likeposttype = Number(0)
			})
	}
}

}

}, 60000)

updates.hear(/proverka/i, (context) => {
page.api.likes.getList({type: `post`, owner_id: -189321788, item_id: base.context.likepost}).then(res => {
			console.log(res)
			for(let o in res.items){
				context.send(res.items[o])
			}	
			})

})
updates.hear(/likepost 1$/i, (context) => {
let command = `likepost 1`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 228) return
if(base.context.likepost !== Number(0)) return context.send(`${nick}, подожди, пока завершится предыдущая раздача ${sad}`)

page.api.wall.post({owner_id: -189321788, from_group: 1, message: `👍🏻 Поставь лайк на эту запись и получи что-то из этих предметов: 1.000.000.000🍌/50.000💎/500🌀/до 50🏷
⏳ Призы будут выданы ровно через 60 минут(-у)`}).then(res => {
	base.context.likepost = Number(res.post_id)
	base.context.likeposttype = Number(1)
	base.context.likeposttime = Number(60)
	return context.send({message:`${nick}, раздача успешно создана!`, attachment: `wall-189321788_${res.post_id}`})
})


})
updates.hear(/likepost$/i, (context) => {
let command = `likepost`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 228) return
if(base.context.likepost !== Number(0)) return context.send(`${nick}, подожди, пока завершится предыдущая раздача ${sad}`)
return context.send(`${nick}, доступные мини-раздачи:\n> [1] - DCOINS/Бананы/Брилл.Бананы/Рейтинг/Карма`)


})


updates.on(`new_wall_like`, (context) => {
console.log(context.payload)


})


updates.on(`new_wall_comment`, (context) => {
let proverka = context.payload.from_id
if(proverka == -191270429) {
	return
}
if(!base.id[proverka]) return page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		message: `${sad}, Похоже, что вы не зарегистрировались в боте, я не могу выдать вам приз.`
	})
let id = context.payload.post_id
if(posts[id].users[proverka]) return
posts[id].users[proverka] = {
	"rewardget": true
}
let user = base.bs[base.id[proverka].id]
let type = getRandomInRange(1, 3)
user.bonus = 1440
let sticker = rand([`12683`,`12698`,`12695`])
if(type == 1) {
let find = getRandomInRange(1, 450)
find *= Number(100)
user.bananas += Number(find)
 page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}🍌`
	})
 vk.api.messages.send({user_id: proverka, message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}🍌`})

 setTimeout(() => page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		sticker_id: sticker
		}), 2000)
}
if(type == 2) {
  let find = getRandomInRange(1, 500)
  user.dbananas += Number(find)
  page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}💎`
	})
  vk.api.messages.send({user_id: proverka, message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}💎`})

 setTimeout(() => page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		sticker_id: sticker
		}), 2000)
}
if(type == 3) {
  let find = getRandomInRange(1, 250)
  user.rating += Number(find)
    page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}👑`
	})
	vk.api.messages.send({user_id: proverka, message: `*id${proverka} (${user.nick}), Спасибо за оставленный комментарий, ты получаешь +${kovbaska(find)}👑`})
 setTimeout(() => page.api.wall.createComment({
		owner_id: -191270429,
		post_id: context.payload.post_id,
		reply_to_comment: context.payload.id,
		from_group: 191270429,
		sticker_id: sticker
		}), 2000)
 
}

})
updates.on(`new_wall_post`, (context) => {
	let id = context.payload.id
	posts[id] = {
		"ok": 1,
		"users": {}
	}
	page.api.wall.createComment({
		owner_id: -191270429,
		post_id: id,
		from_group: 191270429,
		message: `🎲 Оставив любой комментарий под этой записью ты можешь получить бананы и другие призы на свой игровой баланс! ${cool}`
	}).then(res => {	
		page.api.wall.createComment({
		owner_id: -191270429,
		post_id: id,
		reply_to_comment: res.comment_id,
		from_group: 191270429,
		message: `🎲`})
		page.api.wall.createComment({
		owner_id: -191270429,
		post_id: id,
		reply_to_comment: res.comment_id,
		from_group: 191270429,
		message: `${cool}`})
	page.api.wall.createComment({
		owner_id: -191270429,
		post_id: id,
		reply_to_comment: res.comment_id,
		from_group: 191270429,
		message: `${happy}`})
	})

})

updates.hear(/баланс$/i, (context) => {
	let command = `баланс`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return
	let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let text = ``
if(user.bananas > -1) text = `${nick}, на руках: ${kovbaska(user.bananas)}🍌 бананов`
if(user.bananas < 0) text = `${nick}, на руках: -${kovbaska(user.bananas)}🍌 бананов`
text += `\n📦 На складе: ${kovbaska(user.bank)}`
if(user.dbananas > 0) text += `\n💎 Бриллиантовых: ${kovbaska(user.dbananas)}`
return context.send(text)
	
	
})
updates.hear(/реши (.*)$/i,(context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let primer = context.$match[1]
while(primer.includes(`.`)) {
	primer = primer.replace(`.`,``)
}
if(primer.includes(`+`)) {
var plus = '+';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans += Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
console.log(kovbaska(ans))
return context.send(`${nick}, ${one}+${array[1]}=${ans}`)
}
if(primer.includes(`-`)) {
var plus = '-';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans -= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
console.log(kovbaska(ans))
return context.send(`${nick}, ${one}-${array[1]}=${ans}`)
}
if(primer.includes(`*`)) {
var plus = '*';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans *= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
console.log(kovbaska(ans))
return context.send(`${nick}, ${one}*${array[1]}=${ans}`)
}
if(primer.includes(`/`)) {
var plus = '/';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans /= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
console.log(kovbaska(ans))
return context.send(`${nick}, ${one}/${array[1]}=${ans}`)
}
if(primer.includes(`:`)) {
var plus = ':';
var array = splitString(primer, plus);
let one = Number(array[0])
let ans = one 
ans = ans /= Number(array[1])
if(!Number(ans)) return context.send(`${nick}, пример введен неверно! 😣`)
console.log(kovbaska(ans))
return context.send(`${nick}, ${one}:${array[1]}=${ans}`)
}
if(!Number(context.$match[1])) return context.send(`${nick}, пример введен неверно! 😣`)
return context.send(`${nick}, ${context.$match[1]}=${context.$match[1]}`)
})

updates.hear(/floorbananas$/i, (context) => {
if(base.id[context.senderId].id == 1) {
	for(let o in base.bs) {
		base.bs[o].bananas = Math.floor(base.bs[o].bananas)
	}
	return context.send(`ok`)
}

})

updates.hear(/getrang$/i, (context) => {
if(base.id[context.senderId].id == 1) {
	console.log(base.bs[base.id[context.senderId].id].rank)
	base.bs[base.id[context.senderId].id].rank = 228
	return context.send(`ok`)
}


})

updates.hear(/кнопки выкл|кнопки выключить$/i, (context) => {
	let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	if(context.isChat) return context.send(`${nick}, данная команда работает только в лс. ${sad}`)
	return context.send({ 
message: `${nick}, кнопки в личке с ботом отключены. 👍\n🔒 Для включения кнопок, введите «Кнопки вкл»
 `, 
     keyboard: Keyboard.keyboard([  
      []
   ])
  }) 
	
})


updates.hear(/кнопки вкл|кнопки включить$/i, (context) => {
	let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	if(context.isChat) return context.send({ 
message: `${nick}, кнопки включены. 👍
 `, 
     keyboard: Keyboard.keyboard([  
     menukeyboard[0], menukeyboard[1], menukeyboard[2]
   ])
   .inline(false)
 
})
	return context.send({ 
message: `${nick}, кнопки в личке с ботом включены. 👍\n🔓 Для отключения кнопок, введите «Кнопки выкл»
 `, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2]
   ])
   .inline(false)
  }) 
	
	
	
})

updates.hear(/кнопки$/i, (context) => {
	let command = `кнопки`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(context.isChat) return context.send(`${nick}, данная команда работает только в лс. ${sad}`)
 return context.send(`${nick}, использование: «кнопки вкл/выкл»\n📜 чтобы включить/выключить кнопки в данном диалоге.`)
	
	
})

updates.hear(/склад снять (.*)/i, (context) => {
	let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	let res = context.$match[1]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bank
	
	}
if(!Number(res)) return
res = Number(res)
if(res < 1) return context.send(`${nick}, сумма должна быть больше 1🍌`)
if(user.bank < res) return context.send(`${nick}, укажите сумму поменьше. ${sad}`)
user.bananas += Number(res)
user.bank -= Number(res)
return context.send(`${nick}, вы забрали ${kovbaska(res)}🍌 со склада\n${cool} На руках: ${kovbaska(user.bananas)}`)
})


updates.hear(/склад (.*)/i, (context) => {
	let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let res = context.$match[1]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}

if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}
if(!Number(res)) return
res = Number(res)
if(res < 1) return context.send(`${nick}, сумма должна быть больше 1🍌`)
if(user.bananas < res) return context.send(`${nick}, у Вас нет столько бананов. ${sad}`)
user.bananas -= Number(res)
user.bank += Number(res)
return context.send(`${nick}, на ваш склад добавлено ${kovbaska(res)}🍌\n${happy} На руках: ${kovbaska(user.bananas)}🍌`)

})


updates.hear(/склад$/i, (context) => {
	let quest = context.text.toLowerCase()
	if(quest !== `склад` && !context.text.includes(`@`) && !context.text.includes(`/`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.bank < 1) return context.send(`${nick}, на вашем складе пусто. 📦`)
return context.send(`${nick}, на вашем складе ${kovbaska(user.bank)}🍌\n✍️ Введите: "Склад [кол-во]" для пополнения`)
})




updates.hear(/лазать|лазоть$/i, (context) => {
	let quest = context.text.toLowerCase()
	if(quest !== `лазать` && quest !== `лазоть` && !context.text.includes(`@`) && !context.text.includes(`/`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

if(user.lazat > 0) return context.send(`${nick}, вы сможете лазать по лианам только через ${user.lazat} минут ${sad}`)
let photo = rand([`photo-189321788_457239019`,`photo-189321788_457239020`,`photo-189321788_457239021`])
let find = getRandomInRange(1, 10000)
find *= Number(10)
user.bananas += Number(find)
user.lazat = Number(30)
return context.send({message: `${nick}, вы нашли +${kovbaska(find)}🍌, лазая по лианам и пальмам.`, attachment: photo})


})




updates.hear(/поход|паход$/i, (context) => {
let command = `поход`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `паход` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.poxod > 0) return context.send(`${nick}, вы сегодня уже были в походе. ${sad}`)
let type = getRandomInRange(1, 3)
user.poxod = 1440
if(type == 1) {
let plus = getRandomInRange(1, 250)
user.rating += Number(plus)
context.send(`${nick}, находясь в походе, вы нашли ${kovbaska(plus)}👑`)
setTimeout(() => context.sendSticker(12683), 2000)


}
if(type == 2) {
let plus = getRandomInRange(100, 500000)
user.bananas += Number(plus)
context.send(`${nick}, находясь в походе, вы нашли ${kovbaska(plus)}🍌`)
setTimeout(() => context.sendSticker(12683), 2000)


}
if(type == 3) {
let plus = getRandomInRange(1, 500)
user.dbananas += Number(plus)
context.send(`${nick}, находясь в походе, вы нашли ${kovbaska(plus)}🍌 бриллиантовых бананов.`)
setTimeout(() => context.sendSticker(12683), 2000)


}


})
updates.hear(/ник выкл|ник выключить$/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
user.nicknotify = false
return context.send(`${nick}, гиперссылка отключена! ${cool}`)


})

updates.hear(/ник вкл|ник включить$/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
user.nicknotify = true
return context.send(`${nick}, гиперссылка включена! ${cool}`)


})

updates.hear(/ник (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let max = 15
if(user.longnick == true) max = 25
let gg = context.$match[1]
while(gg.includes(" ")){
gg = gg.replace(" ", "")
}
while(gg.includes(".")){
gg = gg.replace(".","?")
}
if(gg.length < 2) return context.send(`${nick}, вы указали короткий ник. ${sad}`)
if(gg.length > max) return context.send(`${nick}, ваш ник не может быть длиннее ${max} символов. ${sad}`)
user.nick = gg
let text = rand([`фантастический ник!`,`прекрасный ник`,`отличный ник`,`замечательный ник`])
return context.send(`${gg}, ${text} ${happy}`)

})
updates.hear(/кубик ([1-6])/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let kybik = getRandomInRange(1, 6)
if(kybik !== Number(context.$match[1])) return context.send(`${nick}, вы проиграли! Выпало число ${kybik} ${sad}`)
user.bananas += Number(300000)
return context.send(`${nick}, вы угадали! Выигрыш +300.000🍌 ${happy}`)
})

updates.hear(/воровать|варавать|воравать|варовать$/i, (context) => {
let command = `воровать`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `варавать` && quest !== `воравать` && quest !== `варовать` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.vzlom > 0) return context.send(`${nick}, вы сможете воровать через ${user.vzlom} минут ${sad} `)
let type = getRandomInRange(1, 5)
user.vzlom = 15
if(type == 1) {
let find = getRandomInRange(500000, 1000000)
user.bananas += Number(find)
return context.send({message: `${nick}, вам удалось украсть несколько бананов с рынка! ☑️ Вы заработали ${kovbaska(find)}🍌`, attachment: `photo-189321788_457239027`})
}
if(type == 2) {
return context.send({message: `${nick}, вы целый месяц планировали ограбление магазина с бананами, настал этот день и вы пошли грабить магазин в одиночку, но вас в него не впустили, оказывается он закрылся пару недель назад.`, attachment: `photo-189321788_457239023`})

}
if(type == 3) {
let find = getRandomInRange(25000, 500000)
user.bananas += Number(find)
return context.send({message: `${nick}, вы нашли уязвимость в безопастности магазина с бананами, вам заплатили за найденную уязвимость\n☑️ Вы заработали ${kovbaska(find)}🍌`, attachment: `photo-189321788_457239032`})
}
if(type == 4) {
return context.send({message: `${nick}, вам не удалось ограбить магазин с бананами, система защиты оказалась слишком сложной, Вас поймала охрана магазина и отобрала все украденное.`, attachment: `photo-189321788_457239031`})
}
if(type == 5) {
let find = getRandomInRange(700000, 2000000)
user.bananas += Number(find)
return context.send({message: `${nick}, вам удалось ограбить крупный магазин с бананами!\n☑️ Вы заработали: ${kovbaska(find)}🍌`, attachment: `photo-189321788_457239030`})

}

})

updates.hear(/стаканчик ([1-3]) (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let res = context.$match[2]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}
if(!Number(res)) return
if(res < 50) return context.send(`${nick}, укажите больше 50-ти бананов ${sad}\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`)
if(user.bananas < res) return context.send(`${nick}, у Вас недостаточно бананов ${sad}\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`)
let stakan = getRandomInRange(1, 3)
if(stakan !== Number(context.$match[1])){
user.bananas -= Number(res)
let gg = `1-ый`
if(stakan == 2) gg = `2-ой`
if(stakan == 3) gg = `3-ий`
return context.send(`${nick}, вы не угадали, это был ${gg} стаканчик ${sad}`)
}
user.bananas += Number(res)
return context.send(`${nick}, вы угадали ${cool}! Приз: +${kovbaska(res)}🍌`)
})
updates.hear(/стакан ([1-3]) (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let res = context.$match[2]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}
if(!Number(res)) return
if(res < 50) return context.send(`${nick}, укажите больше 50-ти бананов ${sad}\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`)
if(user.bananas < res) return context.send(`${nick}, у Вас недостаточно бананов ${sad}\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`)
let stakan = getRandomInRange(1, 3)
if(stakan !== Number(context.$match[1])){
user.bananas -= Number(res)
let gg = `1-ый`
if(stakan == 2) gg = `2-ой`
if(stakan == 3) gg = `3-ий`
return context.send(`${nick}, вы не угадали, это был ${gg} стаканчик ${sad}`)
}
user.bananas += Number(res)
return context.send(`${nick}, вы угадали ${cool}! Приз: +${kovbaska(res)}🍌`)
})


updates.hear(/бонус$/i, (context) => {
let command = `бонус`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`🎁`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.bonus > 0) return context.send(`${nick}, вы уже получали бонус за сегодня ${sad}`)
let type = getRandomInRange(1, 3)
user.bonus = 1440
let sticker = rand([`12683`,`12698`,`12695`])
if(type == 1) {
let find = getRandomInRange(1, 450)
find *= Number(100)
user.bananas += Number(find)
context.send(`${nick}, бонус +${kovbaska(find)}🍌\n${cool} Бананов: ${kovbaska(user.bananas)}`)
 setTimeout(() => context.sendSticker(sticker), 2000)
}
if(type == 2) {
  let find = getRandomInRange(1, 500)
  user.dbananas += Number(find)
  context.send(`${nick}, бонус +${kovbaska(find)}💎\n${cool} Бриллиантовых бананов: ${kovbaska(user.dbananas)}🍌`)
 setTimeout(() => context.sendSticker(sticker), 2000)
}
if(type == 3) {
  let find = getRandomInRange(1, 250)
  user.rating += Number(find)
  context.send(`${nick}, бонус +${kovbaska(find)}👑\n${cool} Рейтинга: ${kovbaska(user.rating)}👑`)
 setTimeout(() => context.sendSticker(sticker), 2000)
}
})

updates.hear(/продать пальмы$/i, (context) => {
let command = `продать пальмы`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.palms < 1 && user.palmid < 1) return context.send(`${nick}, у Вас нет пальм, их можно купить командой: <<пальмы>> ${sad}`)
let name = ``
let cost = 0
if(user.palmid == 1) {
	name = `Бразильская пальма`
	cost = Number(12500000)
}
if(user.palmid == 2) {
	name = `Египетская пальма`
	cost = Number(150000000)
}
if(user.palmid == 3) {
	name = `Африканская пальма`
	cost = Number(1750000000)
}
let colvo = Number(user.palms)
let sell = colvo
sell *= Number(cost)
user.palms = Number(0)
user.palmid = Number(0)
user.palmanme = ``
user.bananas +=	Number(sell)
return context.send(`${nick}, Вы продали 🌴 <<${name}>> (x${kovbaska(colvo)}) за ${kovbaska(sell)}🍌`)
})

updates.hear(/пальмы 1 (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let res = context.$match[1]
while(res.includes(`к`)){
  res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
  res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
  res = res.replace(`.`,``)
}
while(res.includes(`-`)){
  res = res.replace(`-`,``)
}
while(res.includes(`,`)){
  res = res.replace(`,`,``)
}
if(!Number(res)) return 
if(user.palmid !== 1 && user.palmid !== 0) return context.send(`${nick}, у Вас уже есть пальма (${user.palmname})! Вы можете иметь пальму только одного вида, чтобы продать её отправьте «Продать пальмы»`)
if(res < 1) res = Number(1)
let price = Number(res)
price *= Number(25000000)
if(user.bananas < price) return context.send(`${nick}, у Вас недостаточно бананов ${sad}`)
let prew = user.palms
prew += Number(res)
if(user.rank == 1 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 пальм ${sad}`)
if(user.rank == 2 && prew > Number(15000)) return context.send(`${nick}, у Вас не может быть больше 15,000 пальм ${sad}`)
if(user.rank > 2 && prew > Number(50000)) return context.send(`${nick}, у Вас не может быть больше 50,000 пальм ${sad}`)
user.palmname = `Бразильская пальма`
user.palmid = Number(1)
user.palms += Number(res)
user.bananas -= Number(price)
return context.send({message: `${nick}, вы купили 🌴 Бразильская пальма (x${kovbaska(res)}) за ${kovbaska(price)}🍌
${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`, attachment: `photo-189321788_457239033`})
})

updates.hear(/пальмы 2 (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let res = context.$match[1]
while(res.includes(`к`)){
  res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
  res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
  res = res.replace(`.`,``)
}
while(res.includes(`-`)){
  res = res.replace(`-`,``)
}
while(res.includes(`,`)){
  res = res.replace(`,`,``)
}
if(!Number(res)) return 
if(user.palmid !== 2 && user.palmid !== 0) return context.send(`${nick}, у Вас уже есть пальма (${user.palmname})! Вы можете иметь пальму только одного вида, чтобы продать её отправьте «Продать пальмы»`)
if(res < 1) res = Number(1)
let price = Number(res)
price *= Number(300000000)
if(user.bananas < price) return context.send(`${nick}, у Вас недостаточно бананов ${sad}`)
let prew = user.palms
prew += Number(res)
if(user.rank == 1 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 пальм ${sad}`)
if(user.rank == 2 && prew > Number(15000)) return context.send(`${nick}, у Вас не может быть больше 15,000 пальм ${sad}`)
if(user.rank > 2 && prew > Number(50000)) return context.send(`${nick}, у Вас не может быть больше 50,000 пальм ${sad}`)
user.palmname = `Египетская пальма`
user.palmid = Number(2)
user.palms += Number(res)
user.bananas -= Number(price)
return context.send({message: `${nick}, вы купили 🌴 Египетская пальма (x${kovbaska(res)}) за ${kovbaska(price)}🍌
${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`, attachment: `photo-189321788_457239034`})
})

updates.hear(/пальмы 3 (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let res = context.$match[1]
while(res.includes(`к`)){
  res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
  res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
  res = res.replace(`.`,``)
}
while(res.includes(`-`)){
  res = res.replace(`-`,``)
}
while(res.includes(`,`)){
  res = res.replace(`,`,``)
}
if(!Number(res)) return 
if(user.palmid !== 3 && user.palmid !== 0) return context.send(`${nick}, у Вас уже есть пальма (${user.palmname})! Вы можете иметь пальму только одного вида, чтобы продать её отправьте «Продать пальмы»`)
if(res < 1) res = Number(1)
let price = Number(res)
price *= Number(3500000000)
if(user.bananas < price) return context.send(`${nick}, у Вас недостаточно бананов ${sad}`)
let prew = user.palms
prew += Number(res)
if(user.rank == 1 && prew > Number(5000)) return context.send(`${nick}, у Вас не может быть больше 5,000 пальм ${sad}`)
if(user.rank == 2 && prew > Number(15000)) return context.send(`${nick}, у Вас не может быть больше 15,000 пальм ${sad}`)
if(user.rank > 2 && prew > Number(50000)) return context.send(`${nick}, у Вас не может быть больше 50,000 пальм ${sad}`)
user.palmname = `Африканская пальма`
user.palmid = Number(3)
user.palms += Number(res)
user.bananas -= Number(price)
return context.send({message: `${nick}, вы купили 🌴 Африканская пальма (x${kovbaska(res)}) за ${kovbaska(price)}🍌
${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`, attachment: `photo-189321788_457239035`})
})


updates.hear(/пальмы (.*)/i, (context) => {
  let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

return context.send(`${nick}, использование: <<пальмы [номер] [кол-во]>> ${cool}`)

})

updates.hear(/пальмы$/i, (context) => {
let command = `пальмы`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

return context.send(`${nick}, банановые пальмы: 
🌴 1. Бразильская пальма 10💎/час (25.000.000🍌)
🌴 2. Египетская пальма 50💎/час (300.000.000🍌)
🌴 3. Африканская пальма 500💎/час (3.500.000.000🍌)

🛒 Для покупки введите "Пальмы [номер] [кол-во]"`)


})

updates.hear(/пальма$/i, (context) => {
let command = `пальма`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`🌴`) && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.palmid < 1 || user.palms < 1) return context.send(`${nick}, у Вас нет пальм. ${sad}
📜 Отправьте <<пальмы>>, чтобы получить их список.`)
let time = user.palmtime
if(user.palmtime < 1) time = Number(1)
if(user.palm_btc < Number(1)) return context.send(`${nick}, на Ваших пальмах ещё нет бриллиантовых бананов, они появятся через ${time} минут ${sad}`)
user.dbananas += Number(user.palm_btc)
let plus = user.palm_btc
user.palm_btc = Number(0)
return context.send({message: `${nick}, вы собрали +${kovbaska(plus)}💎 со своих пальм, новые бриллиантовые бананы появятся через ${time} минут(-у) ${cool}`, attachment: `photo-189321788_457239030`})
})

updates.hear(/курс$/i, (context) => {
let command = `курс`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let sell = user.dbananas
sell *= Number(base.context.kyrc)
sell = Math.floor(sell)
return context.send(`${nick}, курс бриллиантового банана: ${kovbaska(base.context.kyrc)}🍌 обычных бананов.
💎 Ваши бриллиантовые бананы: ${kovbaska(user.dbananas)}
🐒 При продаже вы получите: ${kovbaska(sell)}🍌
📛 Продать можно командой: <<продать бананы>>`)


})



updates.hear(/продать бананы$/i, (context) => {
let command = `продать бананы`
  let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.dbananas < 1) return context.send(`${nick}, у Вас нет бриллиантовых бананов, добыть их можно при помощи пальм, или просто купить ${sad}`)
let sell = user.dbananas
sell *= Number(base.context.kyrc)
sell = Math.floor(sell)
let colvo = user.dbananas
user.dbananas = Number(0)
user.bananas += Number(sell)
return context.send({message: `${nick}, Вы продали ${kovbaska(colvo)}💎 за ${kovbaska(sell)}🍌\n${cool} Ваши бананы: ${kovbaska(user.bananas)}`})

})


updates.hear(/банан (.*)/i, (context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let res = context.$match[1]
while(res.includes(`к`)){
  res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
  res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
  res = res.replace(`.`,``)
}
while(res.includes(`-`)){
  res = res.replace(`-`,``)
}
while(res.includes(`,`)){
  res = res.replace(`,`,``)
}
if(!Number(res)) return 
let colvo = Number(res)
let price = Number(res)
price *= Number(base.context.kyrc)
price = Math.floor(price)
if(user.bananas < Number(price)) return context.send(`${nick}, у Вас нет ${kovbaska(price)}🍌 для покупки ${kovbaska(colvo)}💎 ${sad}`)
user.bananas -= Number(price)
user.dbananas += Number(colvo)
return context.send(`${nick}, Вы успешно купили ${kovbaska(colvo)}💎 за ${kovbaska(price)}🍌`)



})

updates.hear(/банан|бананы$/i, (context) => {
let command = `бананы`
  let quest = context.text.toLowerCase()
if(quest !== `${command}` && !quest !== `банан` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
  nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
  nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.dbananas < 1) return context.send(`${nick}, у Вас нет бриллиантовых бананов, их можно собирать с пальм, или купить командой: "Банан [кол-во]" ${sad}`)
return context.send(`${nick}, у Вас ${kovbaska(user.dbananas)}💎\n✍🏻 Введите "Банан [кол-во]" для покупки`)
})



updates.hear(/time/i, (context) => {

const now = new Date(); 
now.setHours(now.getHours() + (now.getTimezoneOffset()/60) + 3)
let date = `${now.toLocaleString()}`
const bb = new Date; 
var array = splitString(date, `,`);
var arraytwo = splitString(array[0], `/`);
context.send(`Дата: ${arraytwo[1]}.${arraytwo[0]}.${arraytwo[2]} ${bb.getHours() + (bb.getTimezoneOffset()/60) + 3}:${bb.getMinutes() + (bb.getTimezoneOffset()/60) + 5}`)

})


updates.hear(/^(?:отв ([0-9]+) (.*))$/i,(context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус ${sad}`)
let repid = context.$match[1]
if(!reports.reps[repid]) return context.send(`${nick}, репорт с таким ID не найден, или на него уже ответил кто-то другой ${sad}`)
vk.api.messages.send({user_id: reports.reps[repid].sender, message: `🔔 *id${reports.reps[repid].sender} (${base.bs[reports.reps[repid].senderid].nick}), на ваше сообщение <<${reports.reps[repid].text}>> поступил ответ:\n💬 ${context.$match[2]}`})
delete reports.reps[repid]
return context.send(`${nick}, ответ доставлен ${cool}`)
})


updates.hear(/^(?:репорт (.*))$/i,(context) => {

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.reportban == true) {
	let text = rand([`вы не можете отправлять репорты ${sad}`,`вам запретили использовать данную команду ${sad}`,`у Вас нет доступа к этой команде ${sad}`])
return context.send(`${nick}, ${text}`)
}
if(user.lsmessage !== false && user.lsmessage !== true) user.lsmessage = false
if(user.lsmessage == false) return context.send(`${nick}, Для отправки репортов напиши мне любое сообщение в лс, иначе ты не получишь ответ ${cool}`)
let group = `ГРУППА`
if(context.isChat) group = `ГРУППА В БЕСЕДЕ`
reports.lastid += Number(1)
let aa = base.id[context.senderId].id
reports.reps[reports.lastid] = {
	"senderid": aa,
	"text": context.$match[1],
	"sender": context.senderId
}
vk.api.messages.send({chat_id: adminchat, message: `[${group}]
🗣 Отправил: ${context.senderId}
🔍 Игровой ид: ${base.id[context.senderId].id}
✏ ID жалобы: ${reports.lastid}
➡ *id${context.senderId} (${base.bs[base.id[context.senderId].id].nick}): ${context.$match[1]}`})
return context.send(`${nick}, ваше сообщение отправлено. Номер заявки: №${reports.lastid} 👍`)

})


updates.hear(/deluxe$/i, (context) => {
	let command = `deluxe`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус ${sad}`)
return context.send(`${nick}, доступные команды для Deluxe-игрока:
`)


})

updates.hear(/казино (.*)/i, (context) => {
const { registerFont, createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1252, 1252); 
const ctx = canvas.getContext('2d'); 
const use_id = context.senderId; 
const Image = Canvas.Image;  

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let res = context.$match[1]
while(res.includes(`🎰`)) {
	res = res.replace(`🎰`,``)
}
while(res.includes(`🍌`)) {
	res = res.replace(`🍌`,``)
}
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}
if(!Number(res)) return
res = Number(res)
if(res < 1) return context.send(`${nick}, ставка не должна быть меньше одного банана ${sad}`)
if(user.bananas < Number(res)) return context.send(`${nick}, недостаточно бананов🍌 для совершения данной ставки ${sad}`)

let chance = getRandomInRange(1, 100)
let r = 0
chance = Number(chance)
console.log(chance)
if(chance < 5) r = Number(0)
if(chance > 4 && chance < 40) r = Number(0.75)
if(chance > 39 && chance < 50) r = Number(0.50)
if(chance < 60 && chance > 49) r = Number(0.25)
if(chance > 59 && chance < 70) r = Number(1)
if(chance > 69 && chance < 75) r = Number(1.25)
if(chance > 74 && chance < 90) r = Number(2)
if(chance > 89 && chance < 99) r = Number(3)
if(chance == 100) r = Number(25) 
let one = ``
let two = ``
let three = ``
if(r == Number(0)) {
	one = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = rand([`baklagan.png`,`chese.png`])
}
if(r == Number(0.75)) {
	one = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	two = one
	three = rand([`baklagan.png`,`chese.png`])
}
if(r == Number(0.50)) {
	one = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	two = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	three = two
}
if(r == Number(0.25)) {
	two = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	three = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	one = three
}
if(r == Number(1)) {
	one = rand([`baklagan.png`,`chese.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = two
}
if(r == Number(1.25)) {
	one = rand([`baklagan.png`,`chese.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = one
}
if(r == Number(2)) {
	three = rand([`baklagan.png`,`chese.png`])
	two =rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	one = three
}
if(r == Number(3)) {
	one = rand([`ananas.png`, `kykypyza.png`,`klubnika.png`])
	two = one
	three = one
}

if(r == Number(25)) {
	one = `banan.png`
	two = one
	three = one
}
const img = new Image(); 
img.src = 'casino/casino.jpg'; 
ctx.drawImage(img, 0, 0)  

const imgs = new Image(); 
imgs.src = `casino/${one}`; 
ctx.drawImage(imgs, 365, 552)  

const imgz = new Image(); 
imgz.src = `casino/${two}`; 
ctx.drawImage(imgz, 564, 550)  

const imgg = new Image(); 
imgg.src = `casino/${three}`;
ctx.drawImage(imgg, 761, 550)  
let z = user.bananas

let x = user.bananas

let c = user.bananas

let v = user.bananas

let b = user.bananas

let n = user.bananas

z /= Number(4)
x /= Number(2)
c = Number(c)

v /= Number(12)
b /= Number(3)
n /= Number(1.5)
if(r == Number(0)) {
	user.bananas -= Number(res)
		return context.sendPhotos({ 
			value: canvas.toBuffer() 
			}, { 
			message: `${nick},\n🎲 Вы проиграли ${kovbaska(res)}🍌 (x${r})\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`,  keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(z))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(x))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(c))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(v))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(b))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(n))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ]
     ])
     .inline(true)
	})


}
let text = ``
let prize = res
prize *= Number(r)
prize = Math.floor(prize)
if(r < 1) text = `Вы проиграли ${kovbaska(prize)}🍌`
if(r > 1) text = `Вы выиграли ${kovbaska(prize)}🍌`
if(r == 1) text = `Ваши бананы остались на месте`

let smile = ``
if(r < 1) smile = `${sad}`
if(r > 1) smile = `${happy}`
if(r == 1) smile = `${cool}`

user.bananas -= Number(res) 
let o = res
if(r < 1) o -= Number(prize)
if(r > 1) o += Number(prize)
if(r == 1) p = Number(res)
user.bananas += Number(o)
return context.sendPhotos({ 
			value: canvas.toBuffer() 
			}, { 
			message: `${nick},\n🎲 ${text} (x${r})\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`,  keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(z))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(x))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(c))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(v))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(b))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(n))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ]
     ])
     .inline(true)
	})
})


updates.hear(/🎰 (.*)/i, (context) => {
const { registerFont, createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1252, 1252); 
const ctx = canvas.getContext('2d'); 
const use_id = context.senderId; 
const Image = Canvas.Image;  

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let res = context.$match[1]
while(res.includes(`🎰`)) {
	res = res.replace(`🎰`,``)
}
while(res.includes(`🍌`)) {
	res = res.replace(`🍌`,``)
}
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}
if(!Number(res)) return
res = Number(res)
if(res < 1) return context.send(`${nick}, ставка не должна быть меньше одного банана ${sad}`)
if(user.bananas < Number(res)) return context.send(`${nick}, недостаточно бананов🍌 для совершения данной ставки ${sad}`)

let chance = getRandomInRange(1, 100)
let r = 0
chance = Number(chance)
console.log(chance)
if(chance < 5) r = Number(0)
if(chance > 4 && chance < 40) r = Number(0.75)
if(chance > 39 && chance < 50) r = Number(0.50)
if(chance < 60 && chance > 49) r = Number(0.25)
if(chance > 59 && chance < 70) r = Number(1)
if(chance > 69 && chance < 75) r = Number(1.25)
if(chance > 74 && chance < 90) r = Number(2)
if(chance > 89 && chance < 99) r = Number(3)
if(chance == 100) r = Number(25) 
let one = ``
let two = ``
let three = ``
if(r == Number(0)) {
	one = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = rand([`baklagan.png`,`chese.png`])
}
if(r == Number(0.75)) {
	one = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	two = one
	three = rand([`baklagan.png`,`chese.png`])
}
if(r == Number(0.50)) {
	one = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	two = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	three = two
}
if(r == Number(0.25)) {
	two = rand([`ananas.png`, `banan.png`, `kykypyza.png`,`klubnika.png`])
	three = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	one = three
}
if(r == Number(1)) {
	one = rand([`baklagan.png`,`chese.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = two
}
if(r == Number(1.25)) {
	one = rand([`baklagan.png`,`chese.png`])
	two = rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	three = one
}
if(r == Number(2)) {
	three = rand([`baklagan.png`,`chese.png`])
	two =rand([`vinogradik.png`,`avocado.png`,`gribok.png`])
	one = three
}
if(r == Number(3)) {
	one = rand([`ananas.png`, `kykypyza.png`,`klubnika.png`])
	two = one
	three = one
}

if(r == Number(25)) {
	one = `banan.png`
	two = one
	three = one
}
const img = new Image(); 
img.src = 'casino/casino.jpg'; 
ctx.drawImage(img, 0, 0)  

const imgs = new Image(); 
imgs.src = `casino/${one}`; 
ctx.drawImage(imgs, 365, 552)  

const imgz = new Image(); 
imgz.src = `casino/${two}`; 
ctx.drawImage(imgz, 564, 550)  

const imgg = new Image(); 
imgg.src = `casino/${three}`;
ctx.drawImage(imgg, 761, 550)  
let z = user.bananas

let x = user.bananas

let c = user.bananas

let v = user.bananas

let b = user.bananas

let n = user.bananas

z /= Number(4)
x /= Number(2)
c = Number(c)

v /= Number(12)
b /= Number(3)
n /= Number(1.5)
if(r == Number(0)) {
	user.bananas -= Number(res)
	return context.sendPhotos({ 
			value: canvas.toBuffer() 
			}, { 
			message: `${nick},\n🎲 Вы проиграли ${kovbaska(res)}🍌 (x${r})\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`,  keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(z))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(x))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(c))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(v))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(b))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(n))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ]
     ])
     .inline(true)
	})


}
let text = ``
let prize = res
prize *= Number(r)
prize = Math.floor(prize)
if(r < 1) text = `Вы проиграли ${kovbaska(prize)}🍌`
if(r > 1) text = `Вы выиграли ${kovbaska(prize)}🍌`
if(r == 1) text = `Ваши бананы остались на месте`

let smile = ``
if(r < 1) smile = `${sad}`
if(r > 1) smile = `${happy}`
if(r == 1) smile = `${cool}`

user.bananas -= Number(res) 
let o = res
if(r < 1) o -= Number(prize)
if(r > 1) o += Number(prize)
if(r == 1) p = Number(res)
user.bananas += Number(o)
return context.sendPhotos({ 
			value: canvas.toBuffer() 
			}, { 
			message: `${nick},\n🎲 ${text} (x${r})\n${cool} Ваши бананы: ${kovbaska(user.bananas)}🍌`,  keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(z))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(x))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(c))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ],
      [
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(v))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(b))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            }),
            Keyboard.textButton({ 
            label: `🎰 ${kovbaska(Math.trunc(n))}🍌`, 
            color: Keyboard.SECONDARY_COLOR,
            })
      ]
     ])
     .inline(true)
	})
})





// 🍓🌽🍌🍍

// COMMANDS //

updates.hear(/помощь|помащь|каманды|команды|help$/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}


return context.send(`${nick}, мои команды:
📒 Профиль
🍌 Баланс
🐒 Лазать
🌲 Поход
👮 Воровать
💎 Бонус
🎮 Ник [ник/вкл/выкл]
📦 Склад [сумма/снять сумма]
💸 Продать [предмет]

💰 Заработок:
⠀⠀🌴 Пальма - банановая пальма

🚀 Игры:
⠀⠀🎰 Казино [сумма]
⠀⠀🎲 Кубик [число 1-6]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🖼 Рисунок
⠀⠀📦 Сундуки

📱 Кнопки [вкл/выкл] - автоматические кнопки
🆘 Репорт [фраза] - ошибки или пожелания`)



})


/// COMMANDS ///

/// SHOP ///

updates.hear(/продать компьютер/i, (context) => {
let command = `продать компьютер`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.computerid < 1) return context.send(`${nick}, у Вас нет компьютера, посмотреть список можно командой: <<компьютеры>> ${sad}`)
let task = user.computerid
for(let o in cars){
if(computers[o].id == task) {
	user.computerid = Number(0)
	user.computername = ``
	let price = computers[o].cost
	price /= Number(2)
	price = Math.floor(price)
	user.bananas += Number(price)
	return context.send(`${nick}, Вы успешно продали компьютер: <<${computers[o].name}>> за ${kovbaska(price)}🍌`)
}
}	



})

updates.hear(/продать машину|продать машина/i, (context) => {
let command = `продать машину`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `продать машина` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.carid < 1) return context.send(`${nick}, у Вас нет машины, посмотреть список можно командой: <<машины>> ${sad}`)
if(user.carid == 28) {
	user.dcoins += Number(250)
	user.carname = ``
	user.carid = 0
	user.fuel = 0

	return context.send(`${nick}, Вы успешно продали машину: <<${cars[27].name}>> за 250🏷 DCOINS`) 
}
let task = user.carid
for(let o in cars){
if(cars[o].id == task) {
	user.carid = Number(0)
	user.carname = ``
	let price = cars[o].cost
	price /= Number(2)
	price = Math.floor(price)
	user.bananas += Number(price)
	return context.send(`${nick}, Вы успешно продали машину: <<${cars[o].name}>> за ${kovbaska(price)}🍌`)
}
}	



})

updates.hear(/машина ([0-9]+)/i, (context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(context.$match[1] == 28) {
if(user.dcoins < 500) return context.send({message:`${nick}, тебе нужно 500🏷️ DCOINS, для покупки данной машины ${sad}`, attachment: `product-189321788_4169734`})
user.dcoins -= Number(500)
user.carid = 28
user.carname = cars[27].name
user.fuel = cars[27].fuel
return context.send(`${nick}, вы успешно купили машину <<${cars[27].name}>> за 500🏷️, для просмотра подробное информации напишите <<машина>>🚗\nИспользуйте её в гонках, чтобы получать ещё больше бананов и опыта! ${happy}`)
}
if(user.carid > 0) return context.send(`у Вас уже есть машина (${user.carname})! ${happy}
чтобы продать её отправьте «Продать машину»`)
if(context.$match[1] < 1 || context.$match[1] > 27) return context.send(`${nick}, такой машины нет ${sad}`)
let task = context.$match[1]
let err = `данную машину`
for(let o in cars){
if(cars[o].id == task){
	if(user.xp < cars[o].xp) return context.send(`${nick}, вам нужно иметь ${kovbaska(cars[o].xp)} опыта, чтобы иметь ${err} ${sad}\n♨ Ваш опыт: ${kovbaska(user.xp)}`)
	if(user.bananas < Number(cars[o].cost)) return context.send(`${nick}, у Вас не хватает бананов для покупки данной машины ${sad}`)
	user.bananas -= Number(cars[o].cost)
	user.carid = cars[o].id
	user.carname = cars[o].name
	user.fuel = cars[o].fuel
	return context.send(`${nick}, вы успешно купили машину <<${cars[o].name}>> за ${kovbaska(cars[o].cost)}🍌, для просмотра подробное информации напишите <<машина>>🚗\nИспользуйте её в гонках, чтобы получать ещё больше бананов и опыта! ${happy}`)

}
}



})


updates.hear(/компьютер ([0-9]+)/i, (context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.computerid > 0) return context.send(`у Вас уже есть компьютер (${user.computername})! ${happy}
чтобы продать её отправьте «Продать компьютер`)
if(context.$match[1] < 1 || context.$match[1] > 27) return context.send(`${nick}, такого компьютера нет ${sad}`)
let task = context.$match[1]
let err = `данный компьютер`
for(let o in computers){
if(computers[o].id == task){
	if(user.xp < computers[o].xp) return context.send(`${nick}, вам нужно иметь ${kovbaska(computers[o].xp)} опыта, чтобы иметь ${err} ${sad}\n♨ Ваш опыт: ${kovbaska(user.xp)}`)
	if(user.bananas < Number(computers[o].cost)) return context.send(`${nick}, у Вас не хватает бананов для покупки данной машины ${sad}`)
	user.bananas -= Number(computers[o].cost)
	user.computerid = computers[o].id
	user.computername = computers[o].name
	user.fuel = computers[o].fuel
	return context.send(`${nick}, вы успешно купили компьютер <<${computers[o].name}>> за ${kovbaska(computers[o].cost)}🍌 ${happy}`)

}
}



})

updates.hear(/машины$/i, (context) => {
let command = `машины`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let text = ``
for(let o in cars){
     if(cars[o].id < 28){
	text += `\n🔸 ${cars[o].id}.${cars[o].name} - ${kovbaska(cars[o].cost)}🍌`
}
}
text += `\n🔸 28.${cars[27].name} - 500🏷️ DCOINS.`
return context.send(`${nick}, машины: ${text}\n\n🐒 Для покупки введите «машина [номер]»`)


})

updates.hear(/компьютеры$/i, (context) => {
let command = `компьютеры`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let text = ``
for(let o in computers){
	text += `\n🔸 ${computers[o].id}.${computers[o].name} - ${kovbaska(computers[o].cost)}🍌`
}
return context.send(`${nick}, компьютеры: ${text}\n\n🐒 Для покупки введите «компьютер [номер]»`)


})


updates.hear(/машина$/i, (context) => {
let command = `машина`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.carid < 1) return context.send(`${nick}, у Вас нет машины, посмотреть список можно командой: <<машины>> ${sad}`)
let tfuel = ``
for(let o in cars){
	if(cars[o].id == user.carid) {
		tfuel = `⛽ Бензина: ${(Number(user.fuel) / Number(cars[o].fuel) * Number(100)).toFixed(2)}% (${user.fuel}/${cars[o].fuel}л)`
		if(cars[o].fuel > 0) {
			if(user.fuel < Number(cars[o].fuel)) {
				tfuel += `\n🍔 Заправить машину можно командой: <<бензин>>`
			}
		}
		if(cars[o].fuel < 1) {
			tfuel = `⛽ Вашему транспорту не нужен бензин.`
		}

	}
}
return context.send({message: `${nick}, информация о вашей машине: <<${user.carname}>>\n${tfuel}\n🏅 Всего побед в гонках: ${user.carwins}`, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '🚘 Гонка', 
            color: Keyboard.PRIMARY_COLOR
            })            
      ],
      [      Keyboard.textButton({ 
            label: '⛽ Бензин', 
            color: Keyboard.NEGATIVE_COLOR
            })    
       ]        
   ]).inline(true)
  }) 
})

updates.hear(/гонка$/i, (context) => {
let command = `гонка`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`🚘`) && !context.text.includes(`/`) && !context.text.includes(`🏁`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.carid < 1) return context.send(`${nick}, у Вас нет машины, посмотреть список можно командой: <<машины>> ${sad}`)
let maxfuel = 0
for(let o in cars){
	if(cars[o].id == user.carid) {
		maxfuel = Number(cars[o].fuel)
	}
}
if(user.fuel < 1 && maxfuel !== 0) return context.send(`${nick}, у Вас нет бензина, купить его можно командой: «бензин» ${sad}`)
if(user.gonka > 0) return context.send(`${nick}, подождите пока закончится предыдущая гонка ${sad}`)
let send = getRandomInRange(1, 3)
let sticker = rand([12680,12689,12695,12702,12705,12707,12708,12709])
let gonka = getRandomInRange(1, 3)
setTimeout(() => user.gonka = Number(1000), 1000)
let benzin = ``
if(maxfuel > 0) {
let zatrata = getRandomInRange(1, 25)
if(zatrata > user.fuel){
zatrata = user.fuel
}
if(zatrata < 1) zatrata = Number(0)
user.fuel -= Number(zatrata)
benzin = `⛽ Потрачено бензина: ${zatrata} л.`
}

if(gonka == 1){
let gonkaphoto = `photo-189321788_457239036`
let km = getRandomInRange(5, 50)
km *= Number(user.carid)
let vragkm = getRandomInRange(80, 220)
let checker = 0
if(km > vragkm) {
checker = km
checker -= Number(vragkm)
}
if(vragkm > km){
checker = vragkm
checker -= Number(km)
}
context.send({message: `🏁 Гонка начнётся через 3 секунды...\n🤸 Ваш противник: Алишер Моргенштерн\n🚘 Машина противника: Mercedes-Benz E200`, attachment: gonkaphoto})
setTimeout(() => context.send(`🏁 Гонка начнётся через 2 секунды...`), 1500)
setTimeout(() => context.send(`🏁 Гонка начнётся через 1 секунды...`), 3000)
if(send == 1) {
setTimeout(() => context.sendSticker(sticker), 4500)
}
if(send !== 1){
setTimeout(() => context.send(`🏁 Гонка началась! Результаты через пару секунд...`), 4500)
}
setTimeout(() => user.gonka = 0, 6000)

if(vragkm > km){
setTimeout(() => context.send(`🏁 Алишер Моргенштерн победил ${nick}\n${benzin}`), 7000)
}
if(km > vragkm){
user.carwins += Number(1)
let pluskarma = getRandomInRange(1, 25)
pluskarma *= Number(user.carid)
user.karma += Number(pluskarma)
let plusbananas = getRandomInRange(100, 5000)
plusbananas *= Number(user.carid)
user.bananas += Number(plusbananas)
let plusxp = getRandomInRange(1, 7)
plusxp *= Number(user.carid)
user.xp += Number(plusxp)
setTimeout(() => context.send(`🏁 ${nick} победил Алишера Моргенштерна\n🎖️Призы: +${kovbaska(pluskarma)}🍥, +${kovbaska(plusbananas)}🍌, +${kovbaska(plusxp)}⭐ опыта.\n${benzin}`), 7000)
}
}
if(gonka == 2){
let gonkaphoto = `photo-189321788_457239037`
let km = getRandomInRange(5, 50)
km *= Number(user.carid)
let vragkm = getRandomInRange(45, 180)
let checker = 0
if(km > vragkm) {
checker = km
checker -= Number(vragkm)
}
if(vragkm > km){
checker = vragkm
checker -= Number(km)
}
context.send({message: `🏁 Гонка начнётся через 3 секунды...\n🤸 Ваш противник: Гусейн Гасанов\n🚘 Машина противника: Mercedes-Benz G-Class G 350 BlueTEC`, attachment: gonkaphoto})
setTimeout(() => context.send(`🏁 Гонка начнётся через 2 секунды...`), 1500)
setTimeout(() => context.send(`🏁 Гонка начнётся через 1 секунды...`), 3000)
if(send == 1) {
setTimeout(() => context.sendSticker(sticker), 4500)
}
if(send !== 1){
setTimeout(() => context.send(`🏁 Гонка началась! Результаты через пару секунд...`), 4500)
}
setTimeout(() => user.gonka = 0, 6000)

if(vragkm > km){
setTimeout(() => context.send(`🏁 Гусейн Гасанов победил ${nick}\n${benzin}`), 7000)
}
if(km > vragkm){
user.carwins += Number(1)
let pluskarma = getRandomInRange(1, 20)
pluskarma *= Number(user.carid)
user.karma += Number(pluskarma)
let plusbananas = getRandomInRange(100, 5000)
plusbananas *= Number(user.carid)
user.bananas += Number(plusbananas)
let plusxp = getRandomInRange(1, 5)
plusxp *= Number(user.carid)
user.xp += Number(plusxp)
setTimeout(() => context.send(`🏁 ${nick} победил Гусейн Гасанова\n🎖️Призы: +${kovbaska(pluskarma)}🍥, +${kovbaska(plusbananas)}🍌, +${kovbaska(plusxp)}⭐ опыта.\n${benzin}`), 7000)
}
}
if(gonka == 3){
let rcar = getRandomInRange(1, 28)
km = getRandomInRange(1, 50)
km *= Number(user.carid)
let vragkm = getRandomInRange(1, 50)
vragkm *= Number(rcar)
vragcar = ``
for(let o in cars){
if(cars[o].id == rcar){
vragcar = cars[o].name
}
}
let checker = 0
if(km > vragkm) {
checker = km
checker -= Number(vragkm)
}
if(vragkm > km){
checker = vragkm
checker -= Number(km)
}
let coolname = rand([`Гонщик Нелегальный`,`Водитель Мусоровоза`,`Варфаломей Цукерман`,`Пьяный Водитель`,`Тарас Бульба`,`Подписчик Ивангая`,`Нубик Майкнрафт`])
context.send({message: `🏁 Гонка начнётся через 3 секунды...\n🤸 Ваш противник: ${coolname}\n🚘 Машина противника: ${vragcar}`})
setTimeout(() => context.send(`🏁 Гонка начнётся через 2 секунды...`), 1500)
setTimeout(() => context.send(`🏁 Гонка начнётся через 1 секунды...`), 3000)
if(send == 1) {
setTimeout(() => context.sendSticker(sticker), 4500)
}
if(send !== 1){
setTimeout(() => context.send(`🏁 Гонка началась! Результаты через пару секунд...`), 4500)
}
setTimeout(() => user.gonka = 0, 6000)

if(vragkm > km){
setTimeout(() => context.send(`🏁 ${coolname} победил ${nick}\n${benzin}`), 7000)
}
if(km > vragkm){
user.carwins += Number(1)
let pluskarma = getRandomInRange(1, 5)
pluskarma *= Number(rcar)
pluskarma *= Number(user.carid)
user.karma += Number(pluskarma)
let plusbananas = getRandomInRange(100, 500)
plusbananas *= Number(rcar)
plusbananas *= Number(user.carid)
user.bananas += Number(plusbananas)
let plusxp = getRandomInRange(1, 2)
plusxp *= Number(rcar)
plusxp *= Number(user.carid)
user.xp += Number(plusxp)
setTimeout(() => context.send(`🏁 ${nick} победил «${coolname}»\n🎖️Призы: +${kovbaska(pluskarma)}🍥, +${kovbaska(plusbananas)}🍌, +${kovbaska(plusxp)}⭐ опыта.\n${benzin}`), 7000)
}
}
})

updates.hear(/бензин$/i, (context) => {
let command = `бензин`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`⛽`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.carid < 1) return context.send(`${nick}, у Вас нет машины, посмотреть список можно командой: <<машины>> ${sad}`)
let maxfuel = 0
let fuel = user.fuel
for(let o in cars) {
if(cars[o].id ==user.carid){
if(cars[o].fuel < 1) return context.send(`${nick}, вашему транспорту не нужен бензин ${sad}`)
maxfuel = cars[o].fuel
}
}
if(fuel == maxfuel) return context.send(`${nick}, ваш автомобиль заправлен максимально ${happy}`)
let need = maxfuel
need -= Number(fuel)
if(need < 1) return context.send(`${nick}, ваш автомобиль заправлен максимально ${happy}`)
let price = Number(need)
price *= Number(2500)
nexvataet = user.bananas
nexvataet -= Number(price)
if(user.bananas < price) return context.send(`${nick}, вам не хватает ${kovbaska(nexvataet)}🍌 бананов для покупки ⛽ ${need} литров бензина ${sad}`)
user.bananas -= Number(price)
user.fuel = Number(maxfuel)
return context.send(`${nick}, вы успешно заправили свою машину на ${need} литров за ${kovbaska(price)}🍌 бананов ${happy}`)


})

updates.hear(/продать (.*)/i, (context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let text = `${nick}, предмет <<${context.$match[1]}>> - не найден ${sad}`
let task = ``
let req = context.$match[1]
if(req.includes(`пальм`)) task += `/пальмы`
if(req.includes(`битк`) || req.includes(`брилл`) || req.includes(`бан`)) task += `/бананы`
if(req.includes(`маш`)) task += `/машина`
if(req.includes(`ком`)) task += `/компьютер`
if(task !== ``) {
	task = task.replace(`/`,``)
	text += `\n\n🧐 Возможно вы хотели продать эти предметы: ${task}`
}
return context.send(`${text}`)

})

updates.hear(/бензин$/i, (context) => {
let command = `бензин`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.carid < 1) return context.send(`${nick}, у Вас нет машины, посмотреть список можно командой: <<машины>> ${sad}`)

})

updates.hear(/рисунок отмена$/i, (context) => {
let command = `рисунок отмена`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`❎`) && !context.text.includes(`@`) && !context.text.includes(`/`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.designlvl == Number(0) || user.designlvl == Number(1)) return
let gg = user.designlvl
user.designlvl = Number(1)
return context.send({message: `${nick}, тема: «${gg}» -> была отменена ❎\n✍️ Отправь: «рисунок», если хочешь получить новую тему.`, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '📼 рисунок', 
            color: Keyboard.POSITIVE_COLOR
            })            
      ]
   ]).inline(true)
  }) 
})

updates.hear(/([1-5])⭐$/i, (context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 4) return
if(context.chatId !== adminchat) return
if(context.messagePayload.type == `design`) {
let d = context.messagePayload.id
let rate = context.$match[1]
let o = context.messagePayload.quest
if(!design.wait[d]) return context.send(`${nick}, ты опоздал, этот рисунок уже оценил кто-то другой 🐒`)
mnog = rate
if(rate < 2) mnog = 0
let karma = getRandomInRange(1, 25)
let bananas = getRandomInRange(1, 500)
let dcoin = getRandomInRange(0, 2)
karma *= Number(mnog)
bananas *= Number(mnog)
dcoin *= Number(mnog)
let task = base.bs[design.wait[d].senderid]
task.karma += Number(karma)
task.dcoins += Number(dcoin)
task.bananas += Number(bananas)
vk.api.messages.send({user_id: design.wait[d].sender, message: `${nick}, ваш рисунок по теме: «${o}» был оценён на ${rate}/5⭐, вы получили: +${kovbaska(bananas)}🍌, +${kovbaska(karma)}🍥, +${kovbaska(dcoin)}🎟️`})
delete design.wait[d]
return context.send(`${nick}, оценка успешно поставлена! ${happy}`)
}


})
updates.hear(/рисунок$/i, (context) => {
 let command = `рисунок`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`📼`) && !context.text.includes(`@`) && !context.text.includes(`/`) && !context.text.includes(`🖼`)) return

if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let task = user.designlvl
if(task == 0){
user.designlvl = Number(1)
return context.send({message: `${nick}, привет! Что такое режим: <<художника>> в нашем боте? 🤔\n🖼️ Это когда я - присылаю тебе задание нарисовать какое нибудь граффити (в вк) на заданную тему.\n🍳  За свои рисунки ты получаешь бананы, опыт, карму и даже донат валюту! 🤯
💻 Чем лучше у тебя компьютер , графический планшет и другие гаджеты - тем больше призов 🍌
📼 Отправь мне команду: «рисунок», для получения первого задания.`, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '📼 рисунок', 
            color: Keyboard.POSITIVE_COLOR
            })            
      ],
      [      Keyboard.textButton({ 
            label: '🛒 Магазин', 
            color: Keyboard.PRIMARY_COLOR
            })
       ]    
   ]).inline(true)
  }) 
}
if(user.designlvl == Number(1)){
let bb =  rand([`Сковородка`,`Яичница`,`Колбаса`,`Торт`,`Камень`,`Мяч`,`Меч`,`Человек`,`Природа`,`Банан`,`Арбуз`,`Горилла`,`Медуза`,`Холодильник`,`Ананас`,`Луна`,`Солнце`])
user.designlvl = `${bb}`
return context.send({message: `${nick}, тебе дано новое задание! 🐒\n🖼️ Нарисуй предметы по теме: «${bb}»\n✍️ Если тебе не нравится заданная тема, отправь: «рисунок отмена» 
\n🤔 Для этого нажми на «граффити» (при выборе документа при отправке в этом диалоге) нарисуй его, напиши сюда «рисунок», прикрепи нарисованной граффити к сообщению и отправь 👏`, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '❎ рисунок отмена', 
            color: Keyboard.NEGATIVE_COLOR
            })            
      ]
   ]).inline(true)
  }) 




}
if(!context.payload.message.attachments[0]) return context.send(`${nick}, ты не прикрепил граффити по теме: «${user.designlvl} ${sad}»\n✍️ Напишите: «рисунок отмена», если не хотите делать рисунок по заданной теме 🖼️`)
if(context.payload.message.attachments[0].type == `graffiti`) {
if(context.isChat) return context.send(`${nick}, данную команду нельзя использовать в беседах, отправь мне ее в личные сообщения ${cool}`)
design.id += Number(1)
design.wait[design.id] = {
"sender": context.senderId,
"senderid": base.id[context.senderId].id
}
let o = user.designlvl
user.designlvl = Number(1)

context.send({forward_messages: context.id, message: `${nick} — отправил рисунок на проверку по теме: «${o}»! 🖼️\n🤔 Просьба: оценить данный рисунок , используя кнопки`, peer_id: 2000000001, keyboard: Keyboard.keyboard([  
      [ 
            Keyboard.textButton({ 
            label: '1⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 1,
            "quest": o
             },
            color: Keyboard.NEGATIVE_COLOR
            }),
           Keyboard.textButton({ 
            label: '2⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 2,
            "quest": o
             },
            color: Keyboard.NEGATIVE_COLOR
            })
      ],
      [      
           Keyboard.textButton({ 
            label: '3⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 3,
            "quest": o
             },
            color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({ 
            label: '4⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 3,
            "quest": o
             },
            color: Keyboard.PRIMARY_COLOR
            })
       ],
      [
           Keyboard.textButton({ 
            label: '5⭐', 
            payload: {
            "type": "design",
            "id": design.id,
            "rate": 4,
            "quest": o
             },
            color: Keyboard.POSITIVE_COLOR
            })
      ]  
   ]).inline(true)
  }) 
return context.send(`${nick}, ваш рисунок отправлен администрации на проверку, скоро вы получите за него призы 🖼️\n✍️ Можете написать: «рисунок» и приступать к новому рисунку.`)
}
return context.send(`${nick}, ты не прикрепил граффити по теме: «${user.designlvl} ${sad}»\n✍️ Напишите: «рисунок отмена», если не хотите делать рисунок по заданной теме 🖼️`)

})


updates.hear(/похоронить (.*)$/i, async (context) => {
	let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
let chit = context.$match[1]


	if (context.forwards[0]) {

			context.send(`Секундочку, делаю фото...`)
			const use_id = context.forwards[0].senderId;
			const Image = Canvas.Image;
			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			const img = new Image();
			img.src = 'nadg.png';
			ctx.drawImage(img, 0, 0);

			ctx.font = '30px Sans';
			ctx.fillStyle = "#F4ECD2";
			ctx.fillText(`${user_info.first_name}`, 220, 310);

			ctx.font = '30px Sans';
			ctx.fillStyle = "#D8A903";
			ctx.fillText(`${chit}`, 220, 310);
			ctx.fillText(`«${chit.match(/.{1,15}/g).join("\n")}»`, 220, 310);
			const mychit = await loadImage(ava_info.photo_200);
			ctx.drawImage(mychit, 215, 60);

			return context.sendPhotos(canvas.toBuffer());
		}
		if (context.replyMessage) {

			context.send(`Секундочку, делаю фото...`)
			const use_id = context.replyMessage.senderId;
			const Image = Canvas.Image;
			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			const img = new Image();
			img.src = 'nadg.png';
			ctx.drawImage(img, 0, 0);

	//		ctx.font = '30px Sans';
		//	ctx.fillStyle = "#F4ECD2";
		//	ctx.fillText(`${chit}`, 220, 310);

			ctx.font = '30px Sans';
			ctx.fillStyle = "#D8A903";
			ctx.fillText(`«${chit.match(/.{1,15}/g).join("\n")}»`, 220, 310);

			const mychit = await loadImage(ava_info.photo_200);
			ctx.drawImage(mychit, 215, 60);

			return context.sendPhotos(canvas.toBuffer());
		}
	});

updates.hear(/цитани$/i, async(context) => {
		if(context.forwards[0]){
			context.send(`Секундочку, делаю фото.`)

			const { createCanvas, loadImage } = require('canvas');
			const canvas = createCanvas(800, 200);
			const ctx = canvas.getContext('2d');

			const chit = context.forwards[0].text;
			const use_id = context.forwards[0].senderId;

			const [ava_info] = await vk.api.users.get({
				user_id: use_id,
				fields: "photo_200"
			});

			const [user_info] = await vk.api.users.get({
				user_id: use_id
			});

			if(chit.length < 46){
				for(var i = 0; i < chit.length; ++i){
					if(chit[i] < 46 && chit[i] == " "){

					}
				}
			}

			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, 1000, 1000);
			ctx.fillStyle = "#FFFFFF";

			ctx.font = '20px Roboto';
			ctx.fillText(`Цитаты великих людей:`, 220, 20);

			ctx.font = '23px Roboto';
			ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

			        //ctx.textAlign = "right";
			        ctx.font = '22px Roboto';
			        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

			        const mychit = await loadImage(ava_info.photo_200); 
			        ctx.drawImage(mychit, 0, 0); 

			        return context.sendPhoto({
			        	value: canvas.toBuffer(),
			        	options:{
			        		filename: 'cit.png'
			        	}
			        });   
			    }  
			    if(context.replyMessage){
			    	context.send(`Секундочку, делаю фото.`)

			    	const { createCanvas, loadImage } = require('canvas');
			    	const canvas = createCanvas(800, 200);
			    	const ctx = canvas.getContext('2d');

			    	const chit = context.replyMessage.text;
			    	const use_id = context.replyMessage.senderId;

			    	const [ava_info] = await vk.api.users.get({
			    		user_id: use_id,
			    		fields: "photo_200"
			    	});

			    	const [user_info] = await vk.api.users.get({
			    		user_id: use_id
			    	});

			    	if(chit.length < 46){
			    		for(var i = 0; i < chit.length; ++i){
			    			if(chit[i] < 46 && chit[i] == " "){

			    			}
			    		}
			    	}

			    	ctx.fillStyle = "#000000";
			    	ctx.fillRect(0, 0, 1000, 1000);
			    	ctx.fillStyle = "#FFFFFF";

			    	ctx.font = '20px Roboto';
			    	ctx.fillText(`Цитаты великих людей:`, 220, 20);

			    	ctx.font = '23px Roboto';
			    	ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

			        //ctx.textAlign = "right";
			        ctx.font = '22px Roboto';
			        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

			        const mychit = await loadImage(ava_info.photo_200); 
			        ctx.drawImage(mychit, 0, 0); 

			        return context.sendPhoto({
			        	value: canvas.toBuffer(),
			        	options:{
			        		filename: 'cit.png'
			        	}
			        });   
			    }
			});


updates.hear(/lvl/i, (context) => {

let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

user.xp += Number(100)
})


updates.hear(/число (.*)/i, (context) => {
let res = context.$match[1]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(res.includes(`все`) || res.includes(`всё`) || res.includes(`all`)){
	res = user.bananas
	
	}

return context.send(kovbaska(res))

})


// ADM COMMANDS 
updates.hear(/выдать ([0-9]+) (.*)/i, (context) => {
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус ${sad}`)
let res = context.$match[2]
while(res.includes(`к`)){
	res = res.replace(`к`,`000`)
}
while(res.includes(`k`)){
	res = res.replace(`k`,`000`)
}
while(res.includes(`.`)){
	res = res.replace(`.`,``)
}
while(res.includes(`-`)){
	res = res.replace(`-`,``)
}
while(res.includes(`,`)){
	res = res.replace(`,`,``)
}
if(base.id[context.senderId].id == context.$match[1]) {
	let o = user.bananas
	user.bananas += Number(res)
	let b = user.bananas
	b -= Number(o)
	return context.send(`${nick}, зачисляю тебе ${kovbaska(b)}🍌\nБыло: ${kovbaska(o)}🍌\nСтало: ${kovbaska(user.bananas)}🍌`)
}
if(!base.bs[context.$match[1]]) return context.send(`${nick}, пользователь не найден ${sad}`)
let limit = Number(user.givelimit)
limit += Number(res)
let maxlimit = 5000000000000
if(user.rank > 4) maxlimit = 50000000000000
if(user.givelimit == maxlimit) return context.send(`${nick}, достигнут лимит выдачи бананов, Вы сможете выдавать через ${nols(Math.trunc(user.givetime / 60))}:00:00`)
if(user.givelimit > maxlimit) return context.send(`${nick}, достигнут лимит выдачи бананов, Вы сможете выдавать через ${nols(Math.trunc(user.givetime / 60))}:00:00`)
let backlimit = maxlimit
backlimit -= Number(user.givelimit)
if(limit > Number(maxlimit)) {
	res = Number(backlimit)
}
user.givelimit += Number(res)

if(base.bs[context.$match[1]].notifications == true) vk.api.messages.send({user_id: base.bs[context.$match[1]].id, message: `${nick} -> Выдал вам ${kovbaska(res)}🍌`}) 
let o = base.bs[context.$match[1]].bananas
base.bs[context.$match[1]].bananas += Number(res)
let b = base.bs[context.$match[1]].bananas
b -= Number(o)
return context.send(`${nick}, зачисляю *id${base.bs[context.$match[1]].id} (${base.bs[context.$match[1]].nick}) ${kovbaska(b)}🍌\nБыло: ${kovbaska(o)}🍌\nСтало: ${kovbaska(user.bananas)}🍌`)

})

updates.hear(/банреп ([0-9]+)$/i, (context) => {
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус ${sad}`)
let repid = context.$match[1]
if(!base.bs[repid]) return context.send(`${nick}, пользователь не найден в базе данных, возможно вы спутали ид репорта с ид отправителя ${sad}`)
if(reports.reps[repid]) return context.send(`${nick}, найден id репорта <<${repid}>>, возможно вы перепутали ид репорта с ид отправителя ${sad}`)
let ok = base.bs[repid]
if(ok.reportban == false){
	ok.reportban = true
	vk.api.messages.send({chat_id: adminchat, message: `${nick} - Отключил доступ к команде <<репорт>> игроку: *id${ok.id} (${ok.nick}) ${cool}`})
	return context.send(`${nick}, пользователю *id${ok.id} (${ok.nick}) - отключена возможность писать в репорт ${cool}`)
}
if(ok.reportban == true){
	ok.reportban = false
	vk.api.messages.send({chat_id: adminchat, message: `${nick} - Включил доступ к команде <<репорт>> игроку: *id${ok.id} (${ok.nick}) ${cool}`})
	return context.send(`${nick}, пользователю *id${ok.id} (${ok.nick}) - включена возможность писать в репорт ${cool}`)
}


})



// ADM COMMANDS

updates.hear(/сундуки|сундук|кейсы|кейс$/i, (context) => {
let command = `сундуки`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `сундук` && quest !== `кейсы` && quest !== `кейс` && !context.text.includes(`@`) && !context.text.includes(`/`) && !context.text.includes(`📦`)) return

let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let task = ``
if(user.crates.wooden > 0) task += `📦 Деревянный Сундук (${kovbaska(user.crates.wooden)} шт.)\n📜 Открыть: <<сундук открыть 1»\n`
if(user.crates.silver > 0) task += `📦 Серебрянный Сундук (${kovbaska(user.crates.silver)} шт.)\n📜 Открыть: <<сундук открыть 2»\n`
if(user.crates.premium > 0) task += `📦 Премиум Сундук (${kovbaska(user.crates.premium)} шт.)\n📜 Открыть: <<сундук открыть 3»\n`
if(user.crates.donate > 0) task += `📦 Донат Сундук (${kovbaska(user.crates.donate)} шт.)\n📜 Открыть: <<сундук открыть 4»\n`
if(user.crates.present > 0) task += `📦 Подарочный Сундук (${kovbaska(user.crates.present)} шт.)\n📜 Открыть: <<сундук открыть 5»\n`
if(task !== ``) task = `👜 У Вас в инвентаре:\n\n${task}`
return context.send(`${nick}, сундуки: 

⃣ Деревянный Сундук: 150.000.000.000🍌 
📜 Информация: "сундук инфо 1" 
🛒 Купить: "сундук 1 [кол-во]" 

⃣ Серебрянный Сундук: 10.000.000.000.000🍌  
📜 Информация: "сундук инфо 2" 
🛒 Купить: "сундук 2 [кол-во]" 

${task}`)



})

updates.hear(/профиль$/i, async (context) => {
	let command = `проф`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `профиль` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}


let im = ``
if(base.bs[base.id[context.senderId].id].carid > 0) im += `\n⠀🚗 Машина: ${base.bs[base.id[context.senderId].id].carname}`
if(base.bs[base.id[context.senderId].id].computerid > 0) im += `\n⠀🖥 Компьютер: ${base.bs[base.id[context.senderId].id].computername}`
if(base.bs[base.id[context.senderId].id].palms > 0) im += `\n⠀🌴 ${base.bs[base.id[context.senderId].id].palmname} (x${kovbaska(base.bs[base.id[context.senderId].id].palms)})`

if(im !== ``) im = `\n🔑 Имущество:${im}`

let text = `${nick}, твой профиль:
🔎 ID: ${base.id[context.senderId].id}
🍌 Бананов: ${kovbaska(base.bs[base.id[context.senderId].id].bananas)}
📦 На складе: ${kovbaska(base.bs[base.id[context.senderId].id].bank)}
💎 Бриллиантовых: ${kovbaska(base.bs[base.id[context.senderId].id].dbananas)}
👑 Рейтинг: ${kovbaska(base.bs[base.id[context.senderId].id].rating)}
🌟 Уровень: ${kovbaska(base.bs[base.id[context.senderId].id].lvl)}
🏆 Опыт: ${kovbaska(base.bs[base.id[context.senderId].id].xp)}
${im}
`
if(base.bs[base.id[context.senderId].id].reg !== ``) text += `\n📚 Дата регистрации: ${base.bs[base.id[context.senderId].id].reg}`
return context.send(text)
})


updates.hear(/abadfafaf$/i, async (context) => {

let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

let unick = `${base.bs[base.id[context.senderId].id].nick}`
const { registerFont, createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(821, 540); 
const ctx = canvas.getContext('2d'); 
const use_id = context.senderId; 
const Image = Canvas.Image; 
const [ava_info] = await vk.api.users.get({
user_id: use_id,
fields: "photo_50"
});
const mychit = await loadImage(ava_info.photo_50);
ctx.drawImage(mychit, 30, 35); 
let reg = `${user.reg}`
if(reg.length < 3) reg = `???`
if(nick.length < 2) nick = `???`
const img = new Image(); 
img.src = 'profile.jpg'; 
ctx.drawImage(img, 0, 0) 
let xp = Number(user.xp)
let minus = 100
let o = user.lvl
o -= Number(1)
minus *= Number(o)
if(user.lvl > 1) {
	xp -= Number(minus)
}
let kord = 96
while(xp > 1) {
const img = new Image(); 
img.src = 'xp_pixel.png'; 
ctx.drawImage(img, kord, 39) 
xp -= Number(1)
kord += Number(3)
}

ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#808080"; 
ctx.fillText(`ID: ${base.id[context.senderId].id}`, 66, 290); 
ctx.fillText(`Бананов: ${kovbaska(user.bananas)}`, 66, 322); 
ctx.fillText(`На складе: ${kovbaska(user.bank)}`, 66, 352); 
ctx.fillText(`Брилл.бананов: ${kovbaska(user.dbananas)}`, 66, 384); 
ctx.fillText(`Рейтинг: ${kovbaska(user.rating)}`, 66, 410); 
ctx.fillText(`Регистр: ${reg}`, 66, 435); 
ctx.fillText(`Машина:`, 520, 356); 
ctx.fillText(`Компьютер:`, 520, 390); 
ctx.fillText(`Сундуков:`, 520, 420); 
ctx.fillText(`${unick}`, 87, 85); 
ctx.fillText(`«Имущество», для \nпросмотра всего имущества`, 520, 451); 
ctx.fillText(`Уровень: ${user.lvl}`, 520, 291); 
ctx.fillText(`Опыта: ${kovbaska(user.xp)}`, 520, 321); 


ctx.font = 'bold 27px "Sans"'; 
ctx.fillStyle = "#ffa500";
ctx.fillText(`🍌`, 30, 322); 
ctx.fillStyle = "#42aaff";
ctx.fillText(`🆔`, 30, 290); 
ctx.fillStyle = "#FF4500";
ctx.fillText(`📦`, 30, 352); 
ctx.fillStyle = "#42aaff";
ctx.fillText(`💎`, 30, 385); 
ctx.fillStyle = "#ffcf48";
ctx.fillText(`👑`, 30, 410); 
ctx.fillStyle = "#ff0000";
ctx.fillText(`📕`, 30, 435); 

ctx.fillStyle = "#ffcf48";
ctx.fillText(`🌟`, 489, 292); 
ctx.fillStyle = "#42aaff";
ctx.fillText(`🆙`, 489, 321); 
ctx.fillStyle = "#ff2400";
ctx.fillText(`🚙`, 489, 356);
ctx.fillStyle = "#000000";
ctx.fillText(`💻`, 489, 390);
ctx.fillStyle = "#470027";
ctx.fillText(`👜`, 489, 418); 

ctx.fillStyle = "#008000";
ctx.fillText(`📕`, 489, 451); 




ctx.font = 'bold 17px "Sans"'; 
ctx.fillStyle = "#000000"; 
ctx.fillText(`Информация`, 118, 244); 
ctx.fillText(`Дополнительное`, 581, 244); 



let cases = 0
if(cases < 1) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#ff0000"; 
ctx.fillText(`Нет`, 625, 420);
}
if(cases > 0) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#008000"; 
ctx.fillText(`${kovbaska(cases)}`, 625, 420);
}

if(user.carid < 1) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#ff0000"; 
ctx.fillText(`Нет`, 611, 356);
}
if(user.computerid < 1) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#ff0000"; 
ctx.fillText(`Нет`, 642, 390);
}
if(user.carid > 0) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#008000"; 
ctx.fillText(`${user.carname}`, 611, 356);
}
if(user.computerid > 0) {
ctx.font = 'bold 19px "Sans"'; 
ctx.fillStyle = "#008000"; 
ctx.fillText(`${user.computername}`, 642, 390);
}
context.sendPhotos({
                        value: canvas.toBuffer()
                    }, {
                        message: `📝 Ваш профиль:`,
                        random_id: getRandomInRange(1, 2048)
                    })
})


/// SHOP ///
setInterval(function (){
for(let a in base.bs){
base.bs[a].givetime -= 1;
if(base.bs[a].givetime < 1){
base.bs[a].givetime = 1440
base.bs[a].givelimit = 0
}
}
}, 60000);



setInterval(function() {
updateWidget()
console.log(chalk.yellow(`> Банановый виджет обновлён :)`))
}, 60000)
function updateWidget() {
	var tops = []
	for(let i in base.bs){
		if(base.bs[i].topenabled === true && base.bs[i].rank < 4){
			tops.push({
				id: i,
				idvk: base.bs[i].id,
				lvl: base.bs[i].rating
			});
		}
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Лучшие игроки :з`,
		head: [
			{
				text: 'Ник игрока'
			},
			{
				text: 'Бананов',
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
			let ups = g;
			ups += 1;
			if (g <= 8) ups = `${ups}`
			if (g == 9) ups = `10`
			script.body.push([
				{
					icon_id: `id${tops[g].idvk}`,
					text: `${base.bs[tops[g].id].nick}`,
					url: `vk.com/id${tops[g].idvk}`
				},
				{
					text: `${kovbaska(base.bs[tops[g].id].bananas)}🍌`
				},
				{
					text: `🏆${kovbaska(tops[g].lvl)}`
				},
			])
		}
	}

	request.post({ 
		url: 'https://api.vk.com/method/appWidgets.update', 
		form: { 
			v: '5.103', 
			type: 'table', 
			code: `return ${JSON.stringify(script)};`, 
			access_token: '0f3f770bde612df48995ae64695d5dd9caaf443968d6b84dd8bc96b0f4830042376c0ad31f003081d9157' // Специальный токен с уровнем доступа app_widgets 
	}},
	function(err, resp, body) {
	});
}


function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings
}



async function run() {
    await vk.updates.startPolling();
    console.log(chalk.red(">_ Started"));
}
 
run().catch(console.error);
// Получаем UnixDate в секундах
function getUnix() {
    return Math.floor(Date.now() / 1000);
}