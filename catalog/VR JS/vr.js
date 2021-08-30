console.log(`Приступаю к запуску бота.`);
const request = require("prequest");
const requests = require("request");
const rq = require("prequest");
const fs = require("fs");
const { VK, MarketAttachment, Keyboard } = require('vk-io');
const vk = new VK();  
const str = new VK();  
const users = require('./db/players/users.json');
const chat = require('./db/chats/chats.json');
const promo = require('./db/utils/promo.json');
const set = require('./db/utils/settings.json');
const lobby = require('./db/lobby/lobby.json');
const commands = [];

vk.setOptions({ 
	token: set.token, 
	apiMode: 'parallel',  
	pollingGroupId: set.id 
});  
console.log(`К ВКонтакте Подключён.`);
  const { updates, snippets } = vk;
  // Обновление базы
  setInterval(async () => {
	fs.writeFileSync("./db/players/users.json", JSON.stringify(users, null, "\t"));
	fs.writeFileSync("./db/utils/promo.json", JSON.stringify(promo, null, "\t"));
     fs.writeFileSync("./db/utils/settings.json", JSON.stringify(set, null, "\t"));
     fs.writeFileSync("./db/chats/chats.json", JSON.stringify(chat, null, "\t"));
     fs.writeFileSync("./db/lobby/lobby.json", JSON.stringify(lobby, null, "\t"));
     for(i in lobby){
     if(lobby[i].time < getUnix()){
        if(lobby[i].players > 0){
  vk.api.call("messages.send", {
    user_id: users[lobby[i].plid[0].uid].id,
     message: `Лобби закрыто. `,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });    
      users[lobby[i].plid[0].uid].lobby = -1;
      users[lobby[i].plid[0].uid].lobbym = 2;
if(lobby[i].players > 1){
vk.api.call("messages.send", {
    user_id: users[lobby[i].plid[1].uid].id,
     message: `Лобби закрыто. `,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });    
      users[lobby[i].plid[1].uid].lobby = -1;
      users[lobby[i].plid[1].uid].lobbym = 2;
               }
            lobby[i].players = 0;
            lobby[i].plid = [];
           }
         }
      }
}, 15000);

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
            c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3)).toFixed(1 + fixed),
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
        for (let i = 0; i < int.length; i++) {
            text += `${int[i]}⃣`;
        }

        return text;
    },
    decl: (n, titles) => {
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]

    },
    random: (x, y) => {
        return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
    },
    pick: (array) => {
        return array[utils.random(array.length - 1)];
    }

}
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club191079194\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club191079194\|(.*)\]/ig, '').trim();

    if(message.isChat){
         if(!chat.find(x=> x.id === message.chatId)){
	          	chat.push({
			         id: message.chatId,
			         uid: chat.length
		           });
            message.send(`Беседа успешно зарегистрирована`);
           }
   }
	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

       message.send(`Предыстория. Для прохождения обучения используйте команду "Обучение" или кнопку`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"start\"}",
						"label": "Обучение"},
					"color": "positive"
				}]]})});
		users.push({
			id: message.senderId,
			uid: users.length,
			admin: 1,
			balance: 0,
			rassa: 0,
			ps: 0,
               reg: 0,
               train: 0,
               promo: [],
               tag: "VR MAN",
               mention: true,
               rass: true,
               str: 50,
               vit: 4000,
               lobby: -1,
               lobbym: 2
		});
	}
	
	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command)
	{

  if(message.messagePayload){
     console.log(message);
  if(message.messagePayload.command == "rassat"){
   if(message.user.rassa > 0) return bot(`У вас уже выбрана расса`);
    message.user.rassa = 1;
      return message.send(`Вы успешно выбрали рассу "тупой"`,{keyboard:JSON.stringify({"one_time": false,"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn1\"}",
						"label": "Кнопка 1"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn2\"}",
						"label": "Кнопка 2"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn3\"}",
						"label": "Кнопка 3"},
					"color": "positive"}],[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn4\"}",
						"label": "Кнопка 4"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn5\"}",
						"label": "Кнопка 5"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn6\"}",
						"label": "Кнопка 6"},
					"color": "positive"}]]})});
        }
if(message.messagePayload.command == "rassay"){
     if(message.user.rassa > 0) return bot(`У вас уже выбрана расса`);
     message.user.rassa = 2;
     return message.send(`Вы успешно выбрали рассу "умный"`,{keyboard:JSON.stringify({"one_time": false,"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn1\"}",
						"label": "Кнопка 1"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn2\"}",
						"label": "Кнопка 2"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn3\"}",
						"label": "Кнопка 3"},
					"color": "positive"}],[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn4\"}",
						"label": "Кнопка 4"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn5\"}",
						"label": "Кнопка 5"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn6\"}",
						"label": "Кнопка 6"},
					"color": "positive"}]]})});

        }
     }
		if(!message.isChat){
        return bot(`Команда не найдена`,{keyboard:JSON.stringify({"one_time": false,"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn1\"}",
						"label": "Кнопка 1"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn2\"}",
						"label": "Кнопка 2"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn3\"}",
						"label": "Кнопка 3"},
					"color": "positive"}],[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn4\"}",
						"label": "Кнопка 4"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn5\"}",
						"label": "Кнопка 5"},
					"color": "positive"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"kn6\"}",
						"label": "Кнопка 6"},
					"color": "positive"}]]})});
    }
		if(message.isChat) return;

	}
	message.args = message.text.match(command[0]);
	await command[1](message, bot);
});
const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}
cmd.hear(/^(?:лобби коннект)\s?([0-9]+)?$/i, async (message, bot) => {
if(message.user.lobby != -1) return bot(`Вы уже в лобби`);
if(!message.args[1]) return bot(`Пожалуйста, введите номер лобби`);
let lob = lobby.find(x=> x.uid == message.args[1]);
if(!lob) return bot(`1)Лобби с номером "${message.args[1]}" Не существует`);
if(lob.players <= 0) return bot(`2)Лобби с номером "${message.args[1]}" Не существует`);
if(lob.players > 1) return bot(`3)Лобби с номером "${message.args[1]}" Не существует`);
		lobby[message.args[1]].plid.push({
			uid: message.user.uid,
               hod: 2,
               str: message.user.str,
               vit: message.user.vit
		});
          lobby[message.args[1]].players += 1;
          message.user.lobby = message.args[1];
          message.user.lobbym = 1;
          lobby[message.args[1]].time += 300000;
  bot(`Вы присоединились к лобби номер"${message.user.lobby}". Для атаки используйте команду бой атака. На бой выдаётся 5 минут и 2 хода`);
});
cmd.hear(/^(?:лобби)$/i, async (message, bot) => {
let text = `📨 Для присоединения к лобби используйте команду "лобби коннект <номер>" \nСписок доступных лобби для вас\n`;
let h = 0;
for(i in lobby){
if(lobby[i].players == 1){
h++;
text += `${utils.gi(h)} • Лобби номер "${lobby[i].uid}"\n`;
}
}
if(text == `📨 Для присоединения к лобби используйте команду "лобби коннект <номер>" \nСписок доступных лобби для вас\n`) return bot(`Доступных для вас лобби не обнаружено`);
return bot(text);
});
cmd.hear(/^(?:бой атака)$/i, async (message, bot) => {
if(message.user.lobby == -1) return bot(`Вы не в лобби`);
if(lobby[message.user.lobby].players < 2) return bot(`В лобби ещё недостаточно людей`);
if(lobby[message.user.lobby].plid[message.user.lobbym].hod < 1) return bot(`У вас недостаточно ходов`);
let udar = message.user.str + utils.random(0,30);
let r = message.user.lobby;
if(message.user.lobbym == 1){

lobby[r].plid[0].vit -= udar;
lobby[r].plid[1].hod -= 1;
if(lobby[r].plid[0].vit <= 0){
lobby[r].players = 0;
vk.api.call("messages.send", {
    user_id: users[lobby[r].plid[0].uid].id,
     message: `Вы проиграли бой в лобби ${message.user.lobby} `,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });
users[lobby[message.user.lobby].plid[0].uid].lobby = -1;
users[lobby[message.user.lobby].plid[0].uid].lobbym = 2;
return bot(`Вы победили игрока: ${users[lobby[message.user.lobby].plid[0].uid].tag}`);
}else{
return bot(`Вы ударили игрока на ${udar}`);
}
}
if(message.user.lobbym == 0){
lobby[message.user.lobby].plid[1].vit -= udar;
lobby[message.user.lobby].plid[0].hod -= 1;
if(lobby[message.user.lobby].plid[1].vit <= 0){
lobby[message.user.lobby].players = 0;
vk.api.call("messages.send", {
    user_id: users[lobby[message.user.lobby].plid[1].uid].id,
     message: `Вы проиграли бой в лобби ${message.user.lobby} `,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });
users[lobby[message.user.lobby].plid[1].uid].lobby = -1;
users[lobby[message.user.lobby].plid[1].uid].lobbym = 2;
message.user.lobby = -1;
message.user.lobbym = 1;
return bot(`Вы победили игрока: ${users[lobby[message.user.lobby].plid[1].uid].tag}`);
}else{
return bot(`Вы ударили игрока на ${udar}`);
}
}
if(lobby[r].plid[1].hod < 1 && lobby[r].plid[0].hod < 1){
lobby[r].players = 0;
users[lobby[r].plid[1].uid].lobby = -1;
users[lobby[r].plid[1].uid].lobbym = 2;
users[lobby[r].plid[0].uid].lobby = -1;
users[lobby[r].plid[0].uid].lobbym = 2;
return bot(`Ничья`);
}
});
cmd.hear(/^(?:бой)$/i, async (message, bot) => {
if(message.user.lobby != -1) return bot(`Вы уже в лобби`);
let lobid = -1;
for(i in lobby){
 if(lobby[i].players > 0 && lobby[i].players < 2){
    if((lobby[i].plid[0].str + lobby[i].plid[0].vit + utils.random(0,100)) > (message.user.str + message.user.vit + utils.random(0,100)) || (lobby[i].plid[0].str + lobby[i].plid[0].vit + utils.random(0,100)) < (message.user.str + message.user.vit + utils.random(0,100))){
lobid = lobby[i].uid;
}
}
}
if(lobid = -1){
let bl = lobby.length;
let sh = getUnix() + 300000;
		lobby.push({
			uid: lobby.length,
			players: 1,
               plid: [],
               time: sh
		});
		lobby[bl].plid.push({
			uid: message.user.uid,
               hod: 2,
               str: message.user.str,
               vit: message.user.vit
		});
         message.user.lobby = bl;
         message.user.lobbym = 0;
 bot(`Вы создали лобби номер "${bl}". Ждите, когда присоединится ещё 1 человек. Время ожидания составляет всего 5 минут, потом вас исключит из лобби`);
}else{
		lobby[lobid].plid.push({
			uid: message.user.uid,
               hod: 2,
               str: message.user.str,
               vit: message.user.vit
		});
          lobby[lobid].players += 1;
          message.user.lobby = lobid;
          message.user.lobbym = 1;
  bot(`Вы присоединились к "${lobid}" лобби. Для атаки используйте команду бой атака`);
}
});
cmd.hear(/^(?:битва)$/i, async (message, bot) => {
let nap = [];
let user = 0;
let one = message.user.str + message.user.vit;
let two = 0;
let useri = 0;
let y = false;
let bla = users.length - 1;
// Выбираем 10 рандомных челиков из базы
		for(i=0;i<10;i++){ 
     user = utils.random(0,bla);
				nap.push({id: users[user].uid, idvk: users[user].id, na: users[user].tag, sila: users[user].str, hp: users[user].vit}); 
	}

// Сортируем этих 10 челиков
for(i in nap){
  if(nap[i].sila > 0 && nap[i].hp > 0){
    if(nap[i].idvk != message.senderId){
        if((nap[i].sila + utils.random(0,100)) < (message.user.str + utils.random(0,100)) || (nap[i].sila + utils.random(0,100)) > (message.user.str + utils.random(0,100))){
     user = nap[i].id;
     useri = i;
     y = true;
}
}
}
}
if(y != false){
if(users[user].str + users[user].vit + utils.random(0,150) > message.user.str + message.user.vit + utils.random(0,150)){
return bot(`Вы проиграли бой. Вас победил игрок ${users[user].id}`);
}else{
return bot(`Вы выйграли бой. Вы победили игрока ${users[user].id}`);
}
}else{
return bot(`Я вам никого не подобрал`);
}
});
cmd.hear(/^(?:значение переменной)\s?([0-9]+)\s(.*)\s(.*)?$/i, async (message, bot) => {
if(message.user.admin < 1) return bot(`Нет доступа`);
//// Не работает
if(!message.args[1]) return bot(`Введите айди игрока`);
////
let user = users.find(x=> x.uid == message.args[1]);
if(!user) return bot(`Игрок не найден`);
//Не работают т.к если поставить между ними "?", то считает только 2 аргумента
if(!message.args[2]) return bot(`Введите название переменной`);
 if(!message.args[3]) return bot(`Введите значение переменной`);
//////
let per = message.args[2];
let zn = message.args[3];
user[per] = zn;
return bot(`Значение переменной "${per}" игрока "${user.tag}" изменено на "${zn}" `);
});
cmd.hear(/^(?:новое промо)\s?(.*)?$/i, async (message, bot) => {
if(message.user.admin < 1) return bot(`Тут ничего нет`);
var sho = promo.length;
let promik = promo.find(x=> x.code === message.args[1].toLowerCase());
if(!promik){
		promo.push({
			id: promo.length,
			code: message.args[1].toLowerCase(),
               activ: 10,
               activu: []
		});
   return bot(`Промокод номер ${sho} создан. Для активации используйте команду "промо ${promo[sho].code}". Активаций у промокода: ${promo[sho].activ} `);
}else{
promik.activ = 10;
promik.activu = [];
 return bot(`Промокод номер ${promik.id} успешно обновлён. Для активации используйте команду "промо ${promo[promik.id].code}". Активаций у промокода: ${promo[promik.id].activ} `);

}
});
cmd.hear(/^(?:промокоды)$/i, async (message, bot) => {
if(message.user.admin < 1) return bot(`Тут ничего нет`);
let text = ``;
		for(i=0;i<promo.length;i++){
text += `${i+1}. Промокод: "${promo[i].code}" Активаций: ${promo[i].activ}\n`;
   }
return bot(text);
});
cmd.hear(/^(?:рассылка)\s?(.*)?$/i, async (message, bot) => {
if(message.user.admin < 1) return;
if(!message.args[1]) return bot(`Нельзя разослать пустое сообщение`);
const gg = new VK();  
gg.setOptions({token: set.token,apiMode: 'parallel',pollingGroupId: set.id 
});  
const vag = new VK();  
vag.setOptions({token: set.token,apiMode: 'parallel',pollingGroupId: set.id 
});  
for(i in users){
 if(users[i].rass == true){
gg.api.call("messages.send", {
    user_id: users[i].id,
     message: `${message.args[1]}`,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });
  }
}
for(i=0;i<chat.length;i++){
vag.api.call("messages.send", {
    chat_id: chat[i].id,
     message: `${message.args[1]}`,
     random_id: 0
	}).then((res) => {}).catch((error) => {console.log('Ошибка'); });
}
bot(`Рассылка началась`);
});
cmd.hear(/^(?:промо)\s?(.*)?$/i, async (message, bot) => {
let promik = promo.find(x=> x.code === message.args[1].toLowerCase());
let promoactiv = promik.activu.find(x=> x.id === message.user.id);
if(!promik) return bot(`Промокод не найден`);
if(promik.activ <= 0) return bot(`Активации у промокода закончились`);
if(promoactiv) return bot(`Вы уже активировали этот промокод`);
promik.activ -= 1;
		promik.activu.push({
			id: message.user.id
		});
return bot(`Промокод активирован`);
});
cmd.hear(/^(?:обучение)$/i, async (message, bot) => {
  if(message.user.train == 1) return bot(`Используйте команду "Атаковать"`);
  if(message.user.train == 2) return bot(`Используйте команду "Далее"`);
  if(message.user.train == 3) return bot(`Используйте команду "Атаковать"`);
  if(message.user.train == 4) return bot(`Используйте кнопки(клавиатуру отправил)`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"rassat\"}",
						"label": "Тупой"},
					"color": "negative"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"rassay\"}",
						"label": "Умный"},
					"color": "negative"}]]})});
    if(message.user.train > 4) return bot(`Обучение пройдено!`);
     message.user.train +=1;
	return message.send(`На пути к вашему компьютеру вы встретили кибер спортсмена. Он начала нападать на вас. Ваши действия?`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"bla\"}",
						"label": "Атаковать"},
					"color": "negative"}]]})});
}); 
cmd.hear(/^(?:атаковать)$/i, async (message, bot) => {
if(message.user.train == 1){
message.user.train += 1;
return bot(`Вы одолели кибер спортсмена. Теперь вы ищите очки VR. Для продолжения введите команду "Далее" или воспользуйтесь кнопкой`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"bla\"}",
						"label": "Далее"},
					"color": "positive"}]]})});
}
if(message.user.train == 3){
message.user.train += 1;
return bot(`Увы, но монстр вас одолел. Пожалуйста, укажите вашу рассу(тип игрока) для продолжения(используйте кнопки)`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"rassat\"}",
						"label": "Тупой"},
					"color": "negative"},{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"rassay\"}",
						"label": "Умный"},
					"color": "negative"}]]})});

}
});

cmd.hear(/^(?:далее)$/i, async (message, bot) => {
  if(message.user.train == 0) return;
if(message.user.train == 2){
message.user.train += 1;
return bot(`Вы надели очки VR. Виртуальная реальность начала загружаться, но случилась беда, на вас напал монстр <Чудо-Хуюдо>. Придётся сразиться...`,
	{
					keyboard:JSON.stringify({
					"inline": true,
					"buttons": [[{
						"action": {
						"type": "text",
						"payload": "{\"command\": \"attack\"}",
						"label": "Атаковать"},
					"color": "negative"}]]})});
}
});

function getUnix() {
    return Date.now();
}
async function run() {
    console.log(`Запускаю LongPoll Api`);
    await vk.updates.startPolling();
    console.log(`LongPoll Api запущено. Бот успешно активен`);

}

run().catch(console.error);


// С этой залупой ток обычные кнопки пилить
function generateKeyboard(array) {
    let kb = [];
    if (array.length > 40) return false;

    for (let i = 0; i < 10; i += 1) {
        if (!array.slice(i * 4, i * 4 + 4)[0]) break;
        kb.push(array.slice(i * 4, i * 4 + 4));
    }


    kb.map((arr) => {
        arr.map((button, i) => {
            arr[i] = Keyboard.textButton({
                label: button
            });
        });
    });

    return Keyboard.keyboard(kb);
}