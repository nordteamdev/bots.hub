const {VK} = require('vk-io'); 
const {Keyboard} = require('vk-io');
const vk = new VK();
const logs = require('./logs.json');
const chats = require('./chats.json');
const {updates, api, snippets, upload} = vk; 
const fs = require('fs');
const request = require('request-promise');
const chalk = require('chalk');
const base = require('./base.json');
const reports = require('./reports.json');
const design = require('./design.json');
const posts = require('./posts.json');
const res = require('./res.json');
const mg = require('./mg.json');
const clan = require('./clan.json') // база с кланами
const apijson = require('./api.json');
const path = require('path')
const adminchat = 25;
const dcoinsone = `product-192325383_`
vk.setOptions({ 
token: "26b4f52709fe7f61b1e31ae513d948cd697f2faabc5b1d50dbf5a22938a50c18dd441be8ff95510c58816", // токен группы
apiMode: "parallel", 
pollingGroupId: 192325383 // ид группы 192325383
});
const page = new VK();
 page.setOptions({token: `120ab5390b2bfa8884382f0e0a18a4a889afb56526e7cd6db0f62ac02693d5933074ac22767352472c99a`}); // токен юзера


        fs.writeFileSync("./base.json", JSON.stringify(base, null, "\t")) 
}, 2000); // обновление базы данных
        fs.writeFileSync("./reports.json", JSON.stringify(reports, null, "\t")) 
}, 2000); // обновление базы данных
		fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t")) 
}, 2000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./logs.json", JSON.stringify(logs, null, "\t")) 
}, 2000); // обновление базы данных
function rand(text) {
	let tts = Math.floor(text.length * Math.random())
	return text[tts]
}



function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings
}
const utils = { 
sp: (int) => {
int = ``
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
            label: '📒 Профиль', 
            color: Keyboard.POSITIVE_COLOR
            }),
            Keyboard.textButton({ 
            label: '⛔ Заразить', 
            color: Keyboard.NEGATIVE_COLOR
            })
            
      ],
      [
      Keyboard.textButton({ 
            label: '💊 Съесть таблетку', 
            color: Keyboard.PRIMARY_COLOR
            }),  
	  Keyboard.textButton({ 
            label: '💊 Воровать', 
            color: Keyboard.POSITIVE_COLOR
            })                
      ],
      [
       Keyboard.textButton({ 
       label: '👑 Топ', 
       color: Keyboard.PRIMARY_COLOR
       }),
	   Keyboard.textButton({ 
       label: '💊 Статистика', 
       color: Keyboard.NEGATIVE_COLOR
       })
      ],
      [
            Keyboard.applicationButton({ 
            label: 'Добавить в беседу', 
            appId: 6441755,
            ownerId: -192325383
            })
      ]
]
fs.readFile('example_log.txt', function (err, logData) {});
updates.use(async (context, next) => {
 let months = new Date().getMonth()
 let days = new Date().getDate()
 let hour = new Date().getHours()
 let minute = new Date().getMinutes()
 let second = new Date().getSeconds()
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
		tabl: 1,
		life: 4,
		death: 0,
		prefix: false,
		payban: false,
		lastpay: ``,
		paytime: 1440,
		vzlom: 0,
		refered: 0,
		banreason: 0,
		bandays: 0,
		banseconds: 0,
		banminutes: 0,
		banhours: 0,
		bannedby: ``,
		kill: 0,
		payalltime: 0,
		kolvo: 0,
		topenabled: true,
		banreason: ``,
		promoactive: false,
		banned: false,
		rank: 1,
		zaraz: false,
		notifications: true,
		reg: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
		platform: false,
		reportban: false,
		lastactivity: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
		lastactivity1: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
		virus: 0,
		id: context.senderId,
		nick: `${res[0].first_name}`,
		nicknotify: true,
		subscribed: false
    }
	let regby = false
		if(context.payload.message.ref) {
			let refid = context.payload.message.ref
			if(base.bs[refid]) {
				base.bs[base.context.id].balance += Number(1)
				context.send(`Вы перешли по зараженной ссылке *id${base.bs[refid].id} (пользователя) и заразились коронавирусом`)
				base.bs[refid].tabl += Number(1)
				base.bs[refid].virus += 1
				base.bs[base.context.id].refered = refid;
				regby = true
				vk.api.messages.send({user_id: base.bs[refid].id, message: `Вы заразили *id${context.senderId} (${res[0].first_name}) вы получаете: 1 таблетку 🤑`})
			if(regby == true) vk.api.messages.send({chat_id: adminchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался по ссылке *id${base.bs[refid].id} (Пользователя)\n🆔 ${base.id[context.senderId].id}`})
			}
			}
			if(regby == false) vk.api.messages.send({chat_id: adminchat, message: `[#LOG]\n✅ *id${context.senderId} (${res[0].first_name}) Зарегистрировался в боте!\n🆔 ${base.id[context.senderId].id}`})
		return context.send({ 
message: `👋 Привет, *id${context.senderId} (${res[0].first_name}) !
👀Я игровой nCov бот. 
🎮Для того чтобы начать играть, введите команду "помощь"
👉 Ссылка на игровую беседу: https://vk.me/join/AJQ1d41t0xZNhGry73UDAuqH`, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
  } ) 
})
	}


if (context.text) {
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
if(!logs[base.id[context.senderId].id]) {
	logs[base.id[context.senderId].id] = {
		text: ``
		}
}
let chattext = ``
if(context.isChat) chattext = `👥 Беседа: №${context.chatId},`
let timesend = `[🕐 ${nols(hour)}:${nols(minute)}:${nols(second)}]`
logs[base.id[context.senderId].id].text += `\n${timesend}, ${chattext} ✉️ ${context.text.slice(0, 360)}`
base.bs[base.id[context.senderId].id].lastactivity1 = `${nols(hour)}:${nols(minute)}:${nols(second)}`
	}
try {

        await next();
 } catch (err) { console.error(err)
                err = `${err} \n \n ${err}`}
	require('fs').writeFileSync('./base.json', JSON.stringify(base, null, '\t'));
});
async (context) => {
if(context.isChat){
	if(!chats.ids[context.chatId]) {
		chats.ids[context.chatId] = {
			"id": context.chatId,
			"active": 1,
			"message": 0
		}
	}
	chats.ids[context.chatId].message += 1
	if(chats.ids[context.chatId].active == 0) chats.ids[context.chatId].active = 1
	if(chats.ids[context.chatId].active == 3) {
		let choose = getRandomInRange(1, 2)
		chats.ids[context.chatId].active = 0
if(choose == 1) {
setTimeout(() => context.send({chat_id: context.chatId, message: `>> А вы знали, что добавляя [club192325383|Ncov бота] в беседу, Вы получаете крутые награды в виде доната, денег и т.п? 🤑
👇🏻 Быстрее жми на кнопку и скорей добавляй меня!`,
      keyboard: Keyboard.keyboard([
      [ 
            Keyboard.textButton({ 
            label: '📚 Помощь', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"command": "help"
            }
            })         
            
      ],
     	[
            Keyboard.applicationButton({ 
            label: 'Добавить в беседу', 
            appId: 6441755,
            ownerId: -192325383
            })
      ]
     ])
     .inline(false)
  }), 2000) 

}

if(choose == 2) {
setTimeout(() => context.send({chat_id: context.chatId, message: `🎁 В нашей [club192325383|ГРУППЕ] конкурсы и раздачи каждый день! Подпишись и получи шанс выиграть крутые призы `,
      keyboard: Keyboard.keyboard([
      [ 
            Keyboard.textButton({ 
            label: 'vk.com/public192325383', 
            color: Keyboard.POSITIVE_COLOR,
            payload: {
            	"command": "help"
            }
            })         
            
      ]
     ])
     .inline(true)
  }), 2000) 

}

	}
}
};




vk.updates.use(async (message, next) => {

    // комментарий оставь
    await next(); 
});
setInterval(function (){
for(let a in base.bs){
base.bs[a].life -= 1;
}
}, 3600000);
updates.hear(/профиль|📒 Профиль$/i, async (context) => {
	let command = `Профиль`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`📒`)) return
let refid = context.payload.message.ref
let user = base.bs[base.id[context.senderId].id]
let nick = ``
let task = `` 
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.prefix == false){
let text = `Твой профиль:
🔎 ID: ${base.id[context.senderId].id}
💊 Таблеток ${base.bs[base.id[context.senderId].id].tabl}
🙍‍♂ Вы заразили ${base.bs[base.id[context.senderId].id].virus}
⛔ До смерти ${base.bs[base.id[context.senderId].id].life} ч
💊Количество съеденных таблеток ${base.bs[base.id[context.senderId].id].kolvo}
`
if(base.bs[base.id[context.senderId].id].reg !== ``) text += `\n📚 Дата регистрации: ${base.bs[base.id[context.senderId].id].reg}`
return context.send(text)
}else{

let text = `Твой профиль:
🔎 ID: ${base.id[context.senderId].id}
${base.bs[base.id[context.senderId].id].prefix}
💊 Таблеток ${base.bs[base.id[context.senderId].id].tabl}
🙍‍♂ Вы заразили ${base.bs[base.id[context.senderId].id].virus}
⛔ До смерти ${base.bs[base.id[context.senderId].id].life} ч
💊Количество съеденных таблеток ${base.bs[base.id[context.senderId].id].kolvo}
`
if(base.bs[base.id[context.senderId].id].reg !== ``) text += `\n📚 Дата регистрации: ${base.bs[base.id[context.senderId].id].reg}`
return context.send(text)
}
})
updates.hear(/log ([0-9]+)$/i,async (context) => {
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
	if(user.rank < 4) return
	if(context.isChat) return context.send(`${nick}, данная команда доступна только в лс! ✉️`)
	if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
	let file = `${context.$match[1]}_log.txt`
  async function run() {
  await fs.writeFileSync(`${context.$match[1]}_log.txt`, `${logs[context.$match[1]].text}`);
  await context.sendDocument({
                        value: `${context.$match[1]}_log.txt`,
                        filename: `${file}`,
                    }, {
                        message: `${nick}, логи *id${base.bs[context.$match[1]].id}:`
                    }) 
  await fs.unlinkSync(`${context.$match[1]}_log.txt`);
}
run();
	
	})
updates.hear(/им ([0-9]+) префикс (.*)/i,(context) => {
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
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let usid = base.id[context.senderId].id
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let net = `100 зараженных`
let newname = `${context.$match[2]}`
if(task.virus < 100) return context.send(`${nick}, у *id${task.id} (пользователя) нет ${net} 😒`)
task.prefix = newname
return context.send(`${nick}, название изменено! 👍`)
})
	
updates.hear(/передать ([0-9]+) (.*)$/i,(context, ctx) => {
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
if(user.rank > 0) {
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
if(user.payban == true) return context.send(`${nick}, у Вас бан передачи 😯`)
if(!Number(context.$match[1])) return context.send(`${nick}, неверный ID игрока 😔`)
let bb = Number(context.$match[1])
if(!base.bs[bb]) return context.send(`${nick}, неверный ID игрока 😔`)
if(bb == base.id[context.senderId].id) return context.send(`${nick}, неверный ID игрока 😔`)
if(base.bs[bb].payban == true) return context.send(`${nick}, у *id${base.bs[bb].id} (пользователя) бан передачи 😯`) 
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
if(!Number(res)) return context.send(`${nick}, для передачи введите «передать [игровой ID] [сумма]». Пример: «передать 1448393 33к»`)
res = Number(res)
let limit = Number(user.paylimit)
limit += Number(res)
if(user.tabl < Number(res)) return context.send(`${nick}, недостаточно 💊 таблеток 
💊 Таблеток: ${user.tabl}💊`)
 let months = new Date().getMonth()
    let days = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
user.paylimit += Number(res)
user.tabl -= Number(res)
user.payalltime += Number(res)
base.bs[bb].tabl += Number(res)
user.lastpay = `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`
if(base.bs[bb].notifications == true) {
  	vk.api.messages.send({user_id: base.bs[bb].id, message: `[УВЕДОМЛЕНИЕ]
▶ Игрок ${nick} перевел вам ${res}💊!
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`})
}
return context.send(`${nick}, вы передали игроку *id${base.bs[bb].id} (${base.bs[bb].nick}) ${res}💊`)
}

})
updates.hear(/chatid$/i,async (context) => {
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
	return context.send(context.chatId)
	})

setInterval(function(){
for(let o in base.bs){
if(base.bs[o].vzlom > 0){
base.bs[o].vzlom -= 1;
}
}
}, 60000) // таймер команды: "воровать"
updates.hear(/💊 воровать|варавать|💊 воравать|варовать$/i, (context) => {
let command = `воровать`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `варавать` && quest !== `воравать` && quest !== `варовать` && !context.text.includes(`@`) && !context.text.includes(`💊`)) return

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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.vzlom > 0) return context.send(`${nick}, вы сможете воровать через ${user.vzlom} минут `)
let type = getRandomInRange(1, 5)
user.vzlom = 15
if(type == 1) {
let find = 1
user.tabl += Number(1)
return context.send({message: `${nick}, вам удалось украсть несколько таблеток с рынка! ☑️ Вы украли ${find}💊`})
}
if(type == 2) {
return context.send({message: `${nick}, вы целый месяц планировали ограбление магазина с таблетками, настал этот день и вы пошли грабить магазин в одиночку, но вас в него не впустили, оказывается он закрылся пару недель назад.`})

}
if(type == 3) {
let find = 1
user.tabl += Number(1)
return context.send({message: `${nick}, вы нашли уязвимость в безопастности магазина с таблетками, вам заплатили за найденную уязвимость\n☑️ Вы получили ${find}💊`})
}
if(type == 4) {
return context.send({message: `${nick}, вам не удалось ограбить магазин с таблетками, система защиты оказалась слишком сложной, вас поймала охрана магазина и отобрала все украденное.`})
}
if(type == 5) {
let find = 1
user.tabl += Number(1)
return context.send({message: `${nick}, вам удалось ограбить крупный магазин с таблетками!\n☑️ Вы украли: ${find}💊`})

}

})
updates.hear(/@sendtext (.*)$/i,(context) => {
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.rank < 4) return
let text = context.$match[1]
for(let o in base.bs){
	if(base.bs[o].notifications == true) {
		vk.api.messages.send({user_id: base.bs[o].id, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
		 [
				Keyboard.textButton({ 
				label: '🔔 Включить уведомления', 
				color: Keyboard.POSITIVE_COLOR,
				}),
				Keyboard.textButton({ 
				label: '🔕 Выключить уведомления', 
				color: Keyboard.NEGATIVE_COLOR,
				}),
		  ]
		 ])
		 .inline(true)
	  })
	}
	}
	for(let b in chats.ids){
		if(chats.ids[b].active !== 3) {
			vk.api.messages.send({chat_id: chats.ids[b].id, message: `[УВЕДОМЛЕНИЕ]\n▶ ${context.$match[1]}\n`, 
	  })
		}
	}
	})
updates.hear(/выключить уведомления|уведомления выкл$/i,(context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	user.notifications = false
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления отключены!\n🔕`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})
	updates.hear(/включить уведомления|уведомления вкл$/i,(context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	user.notifications = true
	let nf = user.notifications
	let nfb
	if(nf == true) {
    nf = Keyboard.PRIMARY_COLOR
    nfb = Keyboard.SECONDARY_COLOR
    }
	if(nf == false) {
	nfb = Keyboard.PRIMARY_COLOR
    nf = Keyboard.SECONDARY_COLOR
    }
	let nc = user.nicknotify
	let ncb
	if(nc == true) {
    nc = Keyboard.PRIMARY_COLOR
    ncb = Keyboard.SECONDARY_COLOR
    }
	if(nc == false) {
    ncb = Keyboard.PRIMARY_COLOR
    nc = Keyboard.SECONDARY_COLOR
    }
	return context.send({message: `${nick}, уведомления включены!\n🔔`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: nf,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: nfb,
            }),
      ],
      [
            Keyboard.textButton({ 
            label: '☝️ Кликабельный ник', 
            color: nc,
            }),
            Keyboard.textButton({ 
            label: '👊 Некликабельный ник', 
            color: ncb,
            })
      ],
      [
            Keyboard.textButton({ 
            label: '◀️ В раздел «разное»', 
            color: Keyboard.PRIMARY_COLOR,
            })           
      ]
     ])
     .inline(platform)
  })
	})
setInterval(function (){
let resphoto = `photo187845340_457239143`
let hour = new Date().getHours()
let minute = new Date().getMinutes()
let second = new Date().getSeconds()
let time = `${nols(hour)}:${nols(minute)}`
let type = base.context.giveawaytype
if(time == `15:00`) {
	if(base.context.lastgiveawayid !== 0) {
		let reposts = 0
		page.api.wall.getReposts({owner_id: -192325383, post_id: base.context.lastgiveawayid, count: 1000}).then((res) => {
			reposts = res.profiles
			for(let r in reposts){
				if(!base.id[reposts[r].id]) return
					let uid = base.id[reposts[r].id].id
				if(type == 1) {
					base.bs[uid].tabl += Number(5)
					vk.api.messages.send({user_id: reposts[r].id, message: `🎉 Вы получили 5💊 за участие в раздаче!`})
				} // 500,000 Биткоинов 
			} // выдача награды

		}) // получение репостов
	} // проверка на запись с раздачей

let givetype = getRandomInRange(1, 6)
let givetext = ``
base.context.giveawaytype = Number(givetype)
if(givetype == 1) {
	page.api.wall.post({owner_id: -192325383, attachment: resphoto, message: `📢 Началась новая раздача!
✅ Репостните эту запись и получите 5💊! Раздача будет длиться ровно сутки.`}).then((res) => {
base.context.lastgiveawayid = Number(res.post_id)
for(let m in base.bs){
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n📢 Началась новая раздача!\n`, })
}		
}
})
} // раздача #1



if(givetype == 4) {
	let colves = getRandomInRange(10, 100)
	base.context.promotype = Number(1)
	base.context.promocolves = Number(colves)
	page.api.wall.post({owner_id: -452381830, message: `⏳ Новый промокод!
▶ Отправь боту промокод «Промо nCov» чтобы получить 5💊! 😯
❗ Лимит активаций: ${colves}`}).then((res) => {
base.context.lastgiveawayid = Number(0)
for(let m in base.bs){
	base.bs[m].promoactive = false
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n`, })
}		
}
})
} // промокод #1



if(givetype == 6) {
	let colves = getRandomInRange(10, 100)
	base.context.promotype = Number(3)
	base.context.promocolves = Number(colves)
	page.api.wall.post({owner_id: -452381830, message: `⏳ Новый промокод!
▶ Отправь боту промокод «Промо nCov» чтобы получить 5💊 
❗ Лимит активаций: ${colves}`}).then((res) => {
base.context.lastgiveawayid = Number(0)
for(let m in base.bs){
	base.bs[m].promoactive = false
if(base.bs[m].notifications == true) {
	vk.api.messages.send({user_id: base.bs[m].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`, keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '🔔 Включить уведомления', 
            color: Keyboard.POSITIVE_COLOR,
            }),
            Keyboard.textButton({ 
            label: '🔕 Выключить уведомления', 
            color: Keyboard.NEGATIVE_COLOR,
            }),
      ]
     ])
     .inline(true)
  })
}
}
for(let z in chats.ids){
	if(chats.ids[z].active !== 3) {
		vk.api.messages.send({chat_id: chats.ids[z].id, attachment: `wall-192325383_${res.post_id}`, message: `[УВЕДОМЛЕНИЕ]\n⏳ Новый промокод!\n`, })
}		
}
})
} // промокод #3


}
}, 60000); // авто-раздачи
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус `)
let repid = context.$match[1]
if(!base.bs[repid]) return context.send(`${nick}, пользователь не найден в базе данных, возможно вы спутали ид репорта с ид отправителя `)
if(reports.reps[repid]) return context.send(`${nick}, найден id репорта <<${repid}>>, возможно вы перепутали ид репорта с ид отправителя `)
let ok = base.bs[repid]
if(ok.reportban == false){
	ok.reportban = true
	vk.api.messages.send({chat_id: adminchat, message: `${nick} - Отключил доступ к команде <<репорт>> игроку: *id${ok.id} (${ok.nick}) `})
	return context.send(`${nick}, пользователю *id${ok.id} (${ok.nick}) - отключена возможность писать в репорт `)
}
if(ok.reportban == true){
	ok.reportban = false
	vk.api.messages.send({chat_id: adminchat, message: `${nick} - Включил доступ к команде <<репорт>> игроку: *id${ok.id} (${ok.nick}) `})
	return context.send(`${nick}, пользователю *id${ok.id} (${ok.nick}) - включена возможность писать в репорт `)
}


})
updates.hear(/промо nCpv|промокод nCov|промо коронавирусом|промокод Коронавирус$/i,(context) => {
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
	if(base.context.promotype < 1) return context.send(`${nick}, промокод не найден, либо вы уже активировали его`)
	if(base.context.promocolves < 1) return context.send(`$${nick}, этот промокод больше нельзя активировать`)
	if(user.promoactive == true) return context.send(`${nick}, промокод не найден, либо вы уже активировали его`)
	user.promoactive = true 
	base.context.promocolves -= Number(1)
	context.send(`${nick}, Вы активировали Промокод <<nCov>>.
	⏳ Осталось активаций: ${base.context.promocolves}`)
	
	if(base.context.promotype == 1) user.tabl += Number(5)
	if(base.context.promotype == 2) user.tabl += Number(5)
	if(base.context.promotype == 3) user.tabl += Number(5)
	
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
	let text = rand([`вы не можете отправлять репорты `,`вам запретили использовать данную команду `,`у Вас нет доступа к этой команде `])
return context.send(`${nick}, ${text}`)
}
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
updates.hear(/Банреп ([0-9]+)$/i,(context) => {
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

if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.reportban == false) {
	task.reportban = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам возможность писать в репорт 🆘`})
	vk.api.messages.send({chat_id: adminchat, message: `${nick} — заблокировал *id${task.id} (Пользователю) возможность писать в репорт 🆘`})
	return context.send(`${nick}, *id${task.id} (Пользователю) отключена возможность писать в репорт 🆘`)
	
	}
	
	if(task.reportban == true) {
	task.reportban = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам возможность писать в репорт 🆘`})
	vk.api.messages.send({chat_id: adminchat, message: `${nick} — разблокировал *id${task.id} (Пользователю) возможность писать в репорт 🆘`})
	return context.send(`${nick}, *id${task.id} (Пользователю) включена возможность писать в репорт 🆘`)
	
	}
	
})


updates.hear(/Тбан ([0-9]+)$/i,(context) => {
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

if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.topenabled == false) {
	task.topenabled = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам доступ к топу`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — разблокирован топ`)
	
	}
if(task.topenabled == true) {
	task.topenabled = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам доступ к топу`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — заблокирован топ`)
	}

})

updates.hear(/Пбан ([0-9]+)$/i,(context) => {
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

if(user.rank < 4) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
let task = base.bs[context.$match[1]]
if(task.payban == false) {
	task.payban = true
	vk.api.messages.send({user_id: task.id, message: `${nick} — заблокировал Вам доступ к передаче валюты`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — заблокирована передача`)
	}
if(task.payban == true) {
	task.payban = false
	vk.api.messages.send({user_id: task.id, message: `${nick} — разблокировал Вам доступ к передаче валюты`})
	return context.send(`${nick}, Пользователю *id${task.id} (${task.nick}) — разблокирована передача`)
	}

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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.rank < 4) return context.send(`${nick}, для использования данной команды тебе нужен Deluxe статус ${sad}`)
let repid = context.$match[1]
if(!reports.reps[repid]) return context.send(`${nick}, репорт с таким ID не найден, или на него уже ответил кто-то другой ${sad}`)
vk.api.messages.send({user_id: reports.reps[repid].sender, message: `🔔 *id${reports.reps[repid].sender} (${base.bs[reports.reps[repid].senderid].nick}), на ваше сообщение <<${reports.reps[repid].text}>> поступил ответ:\n💬 ${context.$match[2]}`})
delete reports.reps[repid]
return context.send(`${nick}, ответ доставлен ${cool}`)
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.rank < 6) return 
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
for(let a in base.bs){
base.bs[a].paytime -= 1;
if(base.bs[a].paytime < 1){
base.bs[a].paytime = 1440
base.bs[a].paylimit = 0
}
}
}, 60000); 

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
if(context.isChat){
if(user.life < 1 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
 if(user.rank < 5 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179) return 
 if(!base.bs[context.$match[1]]) return context.send(`Error: (User with id: ${context.$match[1]} not founded) ❎`) 
 if(user.rank < 6 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179){
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
updates.hear(/им ([0-9]+) префикс (.*)/i,(context) => {
let usid = base.id[context.senderId].id
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
let myclan = clan[base.bs[base.id[context.senderId].id].clan]
if(user.rank < 4 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179) return
if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(Number(context.$match[1]) !== Number(usid) && user.rank == 3 && context.senderId !== 452381830 && context.senderId !== 571003825 && context.senderId !== 515400179) return context.send(`${nick}, Вы не можете менять названия Имуществ другим игрокам!😒`)

let task = base.bs[context.$match[1]]
let newname = `${context.$match[2]}`
task.prefix = newname
return context.send(`${nick}, название изменено! 👍`)
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}

	if(context.isChat) return context.send({ 
message: `${nick}, кнопки включены. 👍
 `, 
     keyboard: Keyboard.keyboard([  
     menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
   .inline(false)
 
})
	return context.send({ 
message: `${nick}, кнопки в личке с ботом включены. 👍
 `, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
   .inline(false)
  }) 
	
	
	
})
updates.hear(/💊 Статистика|статистика$/i, async (context) => {
	let platform = false
	let command = `💊 Статистика`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`💊`)) return
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
const get = require("prequest"); 
let china = await get('https://covid2019-api.herokuapp.com/current') 
let piece = await get('https://covid2019-api.herokuapp.com/total') 
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
return context.send(`💊 Игроков зарегистрировано ${base.context.id}\n\nCтатистика 2020-nCoV: 

🇨🇳 Китай: 
🦠 Заражено: ${china.Mainland_China.confirmed} 
💀 Смертей: ${china.Mainland_China.deaths} 
💊 Вылечено: ${china.Mainland_China.recovered} 

🌍 Весь мир: 
🦠 Заражено: ${piece.confirmed} 
💀 Смертей: ${piece.deaths} 
💊 Вылечено: ${piece.recovered} 

📆 Последнее обновление: ${piece.dt}`)
})


updates.hear(/◀️ В раздел «разное»|В раздел «разное»|В раздел "разное"|В раздел разное|◀ В главное меню|В главное меню$/i, (context) => {
	let platform = false
	let command = `В раздел «разное»`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`◀`) && !context.text.includes(`меню`) && !context.text.includes(`В главное меню`) && !context.text.includes(`◀️`)) return
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}

	if(context.isChat) return context.send({ 
message: `${nick}, вы успешно вернулись. 👍
 `, 
     keyboard: Keyboard.keyboard([  
     menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
   .inline(false)
 
})
	return context.send({ 
message: `${nick}, вы успешно вернулись.
 `, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
   .inline(false)
  }) 
	
	
	
})
		updates.hear(/кликабельный ник|ник вкл$/i,(context) => {
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}

		user.nicknotify = true
		let nf = user.notifications
		let nfb
		if(nf == true) {
		nf = Keyboard.PRIMARY_COLOR
		nfb = Keyboard.SECONDARY_COLOR
		}
		if(nf == false) {
		nfb = Keyboard.PRIMARY_COLOR
		nf = Keyboard.SECONDARY_COLOR
		}
		let nc = user.nicknotify
		let ncb
		if(nc == true) {
		nc = Keyboard.PRIMARY_COLOR
		ncb = Keyboard.SECONDARY_COLOR
		}
		if(nc == false) {
		ncb = Keyboard.PRIMARY_COLOR
		nc = Keyboard.SECONDARY_COLOR
		}
		return context.send({message: `${nick}, гиперссылка включена! 👍`,
		  keyboard: Keyboard.keyboard([
		 [
				Keyboard.textButton({ 
				label: '🔔 Включить уведомления', 
				color: nf,
				}),
				Keyboard.textButton({ 
				label: '🔕 Выключить уведомления', 
				color: nfb,
				}),
		  ],
		  [
				Keyboard.textButton({ 
				label: '☝️ Кликабельный ник', 
				color: nc,
				}),
				Keyboard.textButton({ 
				label: '👊 Некликабельный ник', 
				color: ncb,
				})
		  ],
		  [
				Keyboard.textButton({ 
				label: '◀️ В раздел «разное»', 
				color: Keyboard.PRIMARY_COLOR,
				})           
		  ]
		 ])
		 .inline(platform)
	  })
		})
		updates.hear(/некликабельный ник|ник выкл$/i,(context) => {
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}

		user.nicknotify = false
		let nf = user.notifications
		let nfb
		if(nf == true) {
		nf = Keyboard.PRIMARY_COLOR
		nfb = Keyboard.SECONDARY_COLOR
		}
		if(nf == false) {
		nfb = Keyboard.PRIMARY_COLOR
		nf = Keyboard.SECONDARY_COLOR
		}
		let nc = user.nicknotify
		let ncb
		if(nc == true) {
		nc = Keyboard.PRIMARY_COLOR
		ncb = Keyboard.SECONDARY_COLOR
		}
		if(nc == false) {
		ncb = Keyboard.PRIMARY_COLOR
		nc = Keyboard.SECONDARY_COLOR
		}
		return context.send({message: `${nick}, гиперссылка отключена! 👍`,
		  keyboard: Keyboard.keyboard([
		 [
				Keyboard.textButton({ 
				label: '🔔 Включить уведомления', 
				color: nf,
				}),
				Keyboard.textButton({ 
				label: '🔕 Выключить уведомления', 
				color: nfb,
				}),
		  ],
		  [
				Keyboard.textButton({ 
				label: '☝️ Кликабельный ник', 
				color: nc,
				}),
				Keyboard.textButton({ 
				label: '👊 Некликабельный ник', 
				color: ncb,
				})
		  ],
		  [
				Keyboard.textButton({ 
				label: '◀️ В раздел «разное»', 
				color: Keyboard.PRIMARY_COLOR,
				})           
		  ]
		 ])
		 .inline(platform)
	  })
		})
updates.hear(/getid (.*)$/i, async (context) => {
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
	
	if(user.rank < 3) return
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
	let res = context.$match[1]
	while(res.includes(`vk.com`)){
		res = res.replace(`vk.com`,``)
	}
	while(res.includes(`/`)){
		res = res.replace(`/`,``)
	}
	while(res.includes(`https:`)){
		res = res.replace(`https:`,``)
	}
	try{
		var mine = await vk.api.users.get({
			user_ids: res
		});
	} catch(e){
		return context.send(`${nick}, вы указали некорректный ID.`)
	}
	if(!base.id[mine[0].id]) return context.send(`${nick}, данный ID не зарегистрирован.`)
	return context.send(
		`
		VK ID: *id${mine[0].id} (${mine[0].id}) | GAME ID: *id${mine[0].id} (${base.id[mine[0].id].id})
		`
		)
})
updates.hear(/get ([0-9]+)$/i, (context) => {
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
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}

if(!base.bs[context.$match[1]]) return context.send(`${nick}, ид указан неверно! 🔍`)
if(user.rank < 2) return
let admtext = `${nick}, информация об игроке «*id${base.bs[context.$match[1]].id} (${base.bs[context.$match[1]].nick})»:`
let guser = base.bs[context.$match[1]]
let profile = `\n🔎 ID: ${base.id[guser.id].id}`
profile += `\n👀 Ник: ${guser.nick}`
profile += `\n💠 ВК ид: ${guser.id}`
profile += `\n💊  Таблеток: ${guser.tabl}🍌`
profile += `\n⛔ Заразил: ${guser.virus}`
profile += `\n⛔ Осталось жить: ${guser.life}`
if(guser.topenabled == true) profile += `\n👑 Топ: Включен`
if(guser.topenabled == false) profile += `\n👑 Топ: Выключен`
if(guser.notifications == true) profile += `\n🔔 Уведомления: Включены`
if(guser.notifications == false) profile += `\n🔔 Уведомления: Выключены`
profile += `\n📗 Дата регистрации: ${guser.reg}`
if(guser.payban == true) profile += `\n⛔ Бан передачи: Есть`
if(guser.payban == false) profile += `\n⛔ Бан передачи: Нет`
profile += `\n➡️ Последний раз передавал: ${guser.lastpay}`
profile +=`\n💲 Передал: ${guser.payalltime}`
if(guser.reportban == true) profile += `\n🆘 Бан репорта: Есть`
if(guser.reportban == false) profile += `\n🆘 Бан репорта: Нет`
if(guser.banned == false) profile += `\n❎ Забанен: Нет`
if(guser.banned == true) profile += `\n❎ Забанен: Да`
return context.send({message: `${admtext} ${profile}`
})
})
updates.hear(/Съесть таблетку|💊 Съесть таблетку$/i, async (context) => {
	let command = `Съесть таблетку`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`💊`)) return
let refid = context.payload.message.ref
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.tabl < 1){
return context.send(`У вас не хватает таблеток`)
}
user.life += Number(2)
user.tabl -= Number(1)
user.kolvo += Number(1)
return context.send(`Вы съели таблетку. Вы продлили срок своей жизни на 2 ч`)
})
updates.hear(/заразить$/i,(context) => {
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}

	
	let ssilka = `vk.me/bot_ncov2?ref=${base.id[context.senderId].id}`
	vk.api.call("utils.getShortLink", {url: ssilka}).then(function (res){ 
	setTimeout(() => context.send(`${nick},😷 Распространяйте свою реферальную ссылку для заражения, за каждого зараженного человека Вы будете получать 1 таблетку! `), 1500)
	setTimeout(() => context.send(`` + res.short_url ), 3000)
})
})




async function run() {
    await vk.updates.startPolling();
    console.log(chalk.red(">_ Started"));
}
 
run().catch(console.error);
// Получаем UnixDate в секундах
function getUnix() {
    return Math.floor(Date.now() / 1000);
}
setInterval(function() {
updateWidget()
console.log(chalk.yellow(`виджет обновлён :)`))
}, 36000)
function updateWidget() {
	var tops = []
	for(let i in base.bs){
		if(base.bs[i].topenabled === true && base.bs[i].rank < 4){
			tops.push({
				id: i,
				idvk: base.bs[i].id,
				lvl: base.bs[i].virus
			});
		}
	}
	tops.sort(function(a, b) {
		if (b.lvl > a.lvl) return 1
		if (b.lvl < a.lvl) return -1
		return 0
	})

	var script = {
		title: `Топ :3`,
		head: [
			{
				text: 'Ник игрока'
			},
			{
				text: 'Заразил',
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
					text: `🙍‍♂${tops[g].lvl}`
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
			access_token: '936a141f3594798aa02f0b7ef1348c077f02cfa6503e1228f2a2c23d4b13777bce1ea8048c113968c9d3f' 
	}},
	function(err, resp, body) {
	});
}
updates.hear(/👼 Возродиться|возродиться $/i,(context) => {
let command = `возродиться`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `возродиться` && quest !== `Возродиться` && quest !== `возродиться` && !context.text.includes(`👼`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.tabl < 5){
return context.send(`${nick}, вам не хватает таблеток возродиться(5)`)
}
user.tabl -= Number(5)
user.life = 3
return context.send({ 
message: `${nick}, вы успешно возродились
 `, 
     keyboard: Keyboard.keyboard([  
      menukeyboard[0], menukeyboard[1], menukeyboard[2], menukeyboard[3]
   ])
   .inline(false)
  }) 
})
updates.hear(/топ|👑 топ$/i,(context) => {
let command = `топ`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `топ` && quest !== `топ` && quest !== `топ` && !context.text.includes(`👑`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
return context.send({message: `${nick}, укажите вид топа`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '💊 По таблеткам', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ],
	  [
            Keyboard.textButton({ 
            label: '🙍‍♂ По зараженным', 
            color: Keyboard.NEGATIVE_COLOR,
            })
		]
     ])
     .inline(true)
  })
})
updates.hear(/💊 По таблеткам|По таблеткам$/i,(context) => {
let command = `По таблеткам`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `По таблеткам` && quest !== `По таблеткам` && quest !== `По таблеткам` && !context.text.includes(`💊`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
    let top = []
    let topme = [] 

    for (let i in base.bs){
    	if(base.bs[i].topenabled == true && base.bs[i].rank < 3){
        top.push({
            id: i,
            name: base.bs[i].nick,
            balance: base.bs[i].tabl 

        })
    }
    }


    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); 

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 10){
    for (let j = 0; j < top.length; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 💊${utils.rn(top[j].balance)}\n`
    }
} else {
    for (let j = 0; j < 10; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 💊${utils.rn(top[j].balance)}\n`
    }
} 

    return context.send(`${nick}, топ по таблеткам: \n${text}`)
})
updates.hear(/🙍‍♂ По зараженным|По зараженным$/i,(context) => {
let command = `По зараженным`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && quest !== `По зараженным` && quest !== `По зараженным` && quest !== `По зараженным` && !context.text.includes(`🙍‍♂`)) return
let platform = false
if(context.isChat) platform = true
let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(context.isChat){
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(true)
  })
}
}else{
if(user.life < 1){
return context.send({message: `${nick}, вы не смогли выжить`,
      keyboard: Keyboard.keyboard([
     [
            Keyboard.textButton({ 
            label: '👼 Возродиться', 
            color: Keyboard.PRIMARY_COLOR,
            })
      ]
     ])
     .inline(false)
  })
}
}
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}
    let top = []
    let topme = []

    for (let i in base.bs){
    	if(base.bs[i].topenabled == true && base.bs[i].rank < 3){
        top.push({
            id: i,
            name: base.bs[i].nick,
            balance: base.bs[i].virus 

        })
    }
    }


    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
});

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 10){
    for (let j = 0; j < top.length; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 🙍‍♂${utils.rn(top[j].balance)}\n`
    }
} else {
    for (let j = 0; j < 10; j++){
    	j + 1
    	let b = `${j}`
    	b = b.replace("9", "🔟")
    	b = b.replace("8", "9⃣")
    	b = b.replace("7", "8⃣")
    	b = b.replace("6", "7⃣")
    	b = b.replace("5", "6⃣")
    	b = b.replace("4", "5⃣")
    	b = b.replace("3", "4⃣")
    	b = b.replace("2", "3⃣")
    	b = b.replace("1", "2⃣")
    	b = b.replace("0", "1⃣")
        text += `${b} [id${base.bs[top[j].id].id}|${top[j].name}] — 🙍‍♂${utils.rn(top[j].balance)}\n`
    }
} 

    return context.send(`${nick}, топ по зараженным: \n${text}`)
})