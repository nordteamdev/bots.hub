const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk; //////////////////////////////////// БОТ КУПЛЕНО В BOTS STOPE
const fs = require("fs"); //////////////////////////////////// ПРИЯТНОЙ ИГРЫ И ПРОДАЖ
const admins = [437451152]; ////// id admina
const vip = [437451152]; ////// id admina
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const mp = require("./base/mp.json")

//const postnew = require("Vk-Post-Bot")
//postnew("73030fce9ed08a17461262f5d80ffbdd0a54003425ab97ae09e40758aa46fbad76599338779bad86cd731")
const MongoClient = require('mongodb').MongoClient;

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}

const frac = require("./base/frac.json");
vk.setOptions({
    token: '670e92ee449561715f7bc162cc896e287815980aa974d8087a4aa2beb71909fe953e5fc0515afb7364763', // токен группы
    apiMode: 'parallel',
	pollingGroupId: 184908322 // замени на id группы
});

vk.updates.use(async (message, next) => {
    message.user = message.senderId;
    message.text = message.payload.text;

    if (!message.text) return;

    if (!uid[message.user]) {
        acc.number += 1;
        let numm = acc.number;
        uid[message.user] = {
            id: numm
        }

        if (message.is("message") && message.isOutbox)
            return;
        let id = user_id(message.user);
        acc.users[numm] = {
            name: null,
            ban: false,
            mute: false,
            friendlist: {
            },
            money: 1500,
            level: 0,
            perk: 0,
            perk1: 0,
            perk2: 0,
numagent: 0,
            number: numm,
            id: message.user,
            msg: {
                messages: 0,
                last_msg: ""
            },
            polotz: 0,
            dizotz: 0,
            zakaz: 0,
            bandleader: false,
            bandid: false,
            servers: 0,
            job: false,
            zapros: {},
            timers: {
                bonus: false,
                ddos: false,
                ddosa: false,
                hack: false,
                hackyou: false
            },
            sotr: 0,
            tityl: 0,
            telephone: 0,
            chato: false,
            antivirus: 0,
            pc: 0,
            titul: null,
            warns: 0,
            subs: 0,
            friends: 0,
            haters: 0,
            completezakaz: 0,
            rtime: `${time()} | ${data()}`,
            bestoffice1: false,
            bestoffice2: false,
            bestoffice3: false,
            maxsotr: 25,
            seczakaz: 35,
            levelsotr: 0,
            bestoffice7: false,
            bestoffice8: false,
            bestoffice9: false,
            bestoffice10: false,
            bestoffice11: false,
            bestoffice12: false,
            bestoffice13: false,
            bestoffice14: false,
            bestoffice15: false,
            bestoffice16: false,
            bestoffice17: false,
            bestoffice18: false,
            bestoffice19: false,
            bestoffice20: false,
            bestoffice21: false,
            bestoffice22: false,
            bestoffice23: false,
            bestoffice24: false,
            bestoffice25: false,
            bestoffice26: false,
            bestoffice27: false,
            bestoffice28: false,
            bestoffice29: false,
            bestoffice30: false,
            bestoffice31: false,
            bestoffice32: false,
            bestoffice33: false,
            bestoffice34: false,
            bestoffice35: false,
            bestoffice36: false,
            bestoffice37: false,
            bestoffice38: false,
            bestoffice39: false,
            bestoffice40: false,
            bestoffice41: false,
            bestoffice42: false,
            bestoffice43: false,
            bestoffice44: false,
            bestoffice45: false,
            bestoffice46: false,
            bestoffice47: false,
            bestoffice48: false,
            bestoffice49: false,
            bestoffice50: false,
            bestoffice51: false,
            bestoffice52: false,
            bestoffice53: false,
            bestoffice54: false,
            bestoffice55: false,
            bestoffice56: false,
            bestoffice57: false,
            bestoffice58: false,
            bestoffice59: false,
            bestoffice60: false,
            bestoffice61: false,
            bestoffice62: false,
            bestoffice63: false,
            bestoffice64: false,
            bestoffice65: false,
            bestoffice66: false,
            bestoffice67: false,
            bestoffice68: false,
            bestoffice69: false,
            bestoffice70: false,
            bestoffice71: false,
            bestoffice72: false,
            bestoffice73: false,
            bestoffice74: false,
            bestoffice75: false,
            bestoffice76: false,
            bestoffice77: false,
            bestoffice78: false,
            bestoffice79: false,
            bestoffice80: false,
            bestoffice81: false,
            bestoffice82: false,
            bestoffice83: false,
            bestoffice84: false,
            bestoffice85: false,
            bestoffice86: false,
            bestoffice87: false,
            bestoffice88: false,
            bestoffice89: false,
            bestoffice90: false,
            bestoffice91: false,
            bestoffice92: false,
            bestoffice93: false,
            bestoffice94: false,
            bestoffice95: false,
            bestoffice96: false,
            bestoffice97: false,
            bestoffice98: false,
            bestoffice99: false,
            bestoffice100: false,
            bestoffice101: false,
            bestoffice102: false,
            bestoffice103: false,
            bestoffice104: false,
            bestoffice105: false,
            bestoffice106: false,
            bestoffice107: false,
            bestoffice108: false,
            bestoffice109: false,
            bestoffice110: false,
            bestoffice111: false,
            bestoffice112: false,
            bestoffice113: false,
            bestoffice114: false,
            bestoffice115: false,
            bestoffice116: false,
            bestoffice117: false,
            bestoffice118: false,
            bestoffice119: false,
            bestoffice120: false,
            bestoffice121: false,
            bestoffice122: false,
            bestoffice123: false,
            bestoffice124: false,
            bestoffice125: false,
            bestoffice126: false,
            bestoffice127: false,
            bestoffice128: false,
            bestoffice129: false,
            bestoffice130: false,
            bestoffice131: false,
            bestoffice132: false,
            bestoffice133: false,
            bestoffice134: false,
            bestoffice135: false,
            bestoffice136: false,
            bestoffice137: false,
            bestoffice138: false,
            bestoffice139: false,
            bestoffice140: false,
            bestoffice141: false,
            bestoffice142: false,
            bestoffice143: false,
            bestoffice144: false,
            bestoffice145: false,
            bestoffice146: false,
            bestoffice147: false,
            bestoffice148: false,
            bestoffice149: false,
            bestoffice150: false,
            bestoffice151: false,
            bestoffice152: false,
            bestoffice153: false,
            bestoffice154: false,
            bestoffice155: false,
            bestoffice156: false,
            bestoffice157: false,
            bestoffice158: false,
            bestoffice159: false,
            bestoffice160: false,
            bestoffice161: false,
            bestoffice162: false,
            bestoffice163: false,
            bestoffice164: false,
            bestoffice165: false,
            bestoffice166: false,
            bestoffice167: false,
            bestoffice168: false,
            bestoffice169: false,
            bestoffice170: false,
            bestoffice171: false,
            bestoffice172: false,
            bestoffice173: false,
            bestoffice174: false,
            bestoffice175: false,
            bestoffice176: false,
            bestoffice177: false,
            bestoffice178: false,
            bestoffice179: false,
            bestoffice180: false,
            bestoffice181: false,
            bestoffice182: false,
            bestoffice183: false,
            bestoffice184: false,
            bestoffice185: false,
            bestoffice186: false,
            bestoffice187: false,
            bestoffice188: false,
            bestoffice189: false,
            bestoffice190: false,
            bestoffice191: false,
            bestoffice192: false,
            bestoffice193: false,
            bestoffice194: false,
            bestoffice195: false,
            bestoffice196: false,
            bestoffice197: false,
            bestoffice198: false,
            bestoffice199: false,
            bestoffice200: false,
            bestoffice201: false,
            bestoffice202: false,
            bestoffice203: false,
            bestoffice204: false,
            bestoffice205: false,
            bestoffice206: false,
            bestoffice207: false,
            bestoffice208: false,
            bestoffice209: false,
            bestoffice210: false,
            bestoffice211: false,
            bestoffice212: false,
            bestoffice213: false,
            bestoffice214: false,
            bestoffice215: false,
            bestoffice216: false,
            bestoffice217: false,
            bestoffice218: false,
            bestoffice219: false,
            bestoffice220: false,
            bestoffice221: false,
            bestoffice222: false,
            bestoffice223: false,
            bestoffice224: false,
            bestoffice225: false,
            bestoffice226: false,
            bestoffice227: false,
            bestoffice228: false,
            bestoffice229: false,
            bestoffice230: false,
            bestoffice231: false,
            bestoffice232: false,
            bestoffice233: false,
            bestoffice234: false,
            bestoffice235: false,
            bestoffice236: false,
            bestoffice237: false,
            bestoffice238: false,
            bestoffice239: false,
            bestoffice240: false,
            bestoffice241: false,
            bestoffice242: false,
            bestoffice243: false,
            bestoffice244: false,
            bestoffice245: false,
            bestoffice246: false,
            bestoffice247: false,
            bestoffice248: false,
            bestoffice249: false,
            bestoffice250: false,
            bestoffice251: false,
            bestoffice252: false,
            bestoffice253: false,
            bestoffice254: false,
            bestoffice255: false,
            bestoffice256: false,
            bestoffice257: false,
            bestoffice258: false,
            bestoffice259: false,
            bestoffice260: false,
            bestoffice261: false,
            bestoffice262: false,
            bestoffice263: false,
            bestoffice264: false,
            bestoffice265: false,
            bestoffice266: false,
            bestoffice267: false,
            bestoffice268: false,
            bestoffice269: false,
            bestoffice270: false,
            bestoffice271: false,
            bestoffice272: false,
            bestoffice273: false,
            bestoffice274: false,
            bestoffice275: false,
            bestoffice276: false,
            bestoffice277: false,
            bestoffice278: false,
            bestoffice279: false,
            bestoffice280: false,
            bestoffice281: false,
            bestoffice282: false,
            bestoffice283: false,
            bestoffice284: false,
            bestoffice285: false,
            bestoffice286: false,
            bestoffice287: false,
            bestoffice288: false,
            bestoffice289: false,
            bestoffice290: false,
            bestoffice291: false,
            bestoffice292: false,
            bestoffice293: false,
            bestoffice294: false,
            bestoffice295: false,
            bestoffice296: false,
            bestoffice297: false,
            bestoffice298: false,
            bestoffice299: false,
            bestoffice300: false

        }


        return message.send('Вы успещно прошли регистрацию в боте! Все команды - Помощь')







        ////////////////////
        vk.api.call('users.get', {
            user_ids: message.user,
            fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
        }).then(res => {
            let user = res[0];
            acc.users[user_id(message.user)].name = `${user.first_name} ${user.last_name}`;
        }).catch((error) => { console.log('err[prefix]'); });
    }
    let id = user_id(message.user);
    let user = acc.users[user_id(message.user)];

   
    if (message.text) {
        if (message.text == "Аньбань") {
            if(user.level > 5) user.ban  = false
        }
        try {
            let user = acc.users[user_id(message.user)];
            if (user.ban == true) {
                return message.send(`
       ⛔Вы находитесь в бане! Ожидайте пока вас разбанят⛔`)
            }
            await next();
        } catch (err) {



        }


    }
   
    
    try {
        await next();
    } catch (err) {  }
	 

});

// --------- Мастхев модули. Основное. --------- \\

vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => {

    if (message.$match[3]) {
        var id = user_id(message.$match[3]);
        if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);
        return message.send(`
			Игрок: @id${acc.users[id].id}
			ID: ${id}
			
		`);
    } else {
        if (!message.$match[4]) return message.send(`Укажите данные`);
        var domain = message.$match[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.$match[4]
        }).then((res) => {
            var id = user_id(res.object_id);
            if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);
            return message.send(`
				Игрок: @id${acc.users[id].id}
				ID: ${id}
				
				`);
        })
        return;
    }

});






vk.updates.hear(/^(?:помощь|меню)/i, async  (message) => {
let id = user_id(message.user);
let user = acc.users[user_id(message.user)];
return message.reply(`
"Связь [Текст]"- связь с агентами (для обычных людей)
"Агент [id] [номер агента]"- назначить агентом
"Ачат [Сообщения]"- чат между агентами 
"Жалоба [текст]"- жалоба
"Арассылка [текст]"- рассылка агентам 
"Орассылка"- общая рассылка
"Бан [id]"- бан
"Абан [id]"- бан агента
"Жбан [id] [Причина]- блок отправки жалоб (может сделать любой агент)
"Сбан [id] [причина]"- Блок отправки команды связь (может дать любой агент)
"Стата"- статистика
"Выговор [id] [причина]"- могу выдать только я имея спец. Пароль
"Кик [ссылка] [причина]"- кик игрока из беседы (могу только я имея спец пароль)
"Отчёт"- информация о агентах
"Агенты"- список агентов
"Устроится"- Устроится к нам 
`) 
})
vk.updates.hear(/^(?:профиль|проф|👤 Профиль)/i,  (message) => {

	let id = user_id(message.user)

	let user = acc.users[user_id(message.user)];
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }

 

	return message.send(`

💬Твоя статистика💬

✏ Номер агента: 
🎃 id: ${user.number}
⚡ ответ жалоб:
♻ ответ вопрос:
🌟 Выговоры:  ${user.warns}/3`);
});




vk.updates.hear(/^eval\s(.*)$/i, (message) => {
    function смс(text) {
      
        
        return message.send(text)
    }
    function стик(text) {


        return message.sendSticker(text)
    }
    let user = acc.users[user_id(message.user)];
    if (user.level > 10) {
        return message.send(`Eval успешно выполнен.: ${eval(message.$match[1])}`);
    }
});




  vk.updates.hear(/^(?:войти)/i, (message) => {

  let user = acc.users[user_id(message.user)];
  user.bestoffice25 = true
      message.send(`✅ Вы успешно вошли в систему ✅!`);
	  for(i=0;i<200000;i++){
    if(acc.users[i]){
    if(acc.users[i].level >= 10){
      vk.api.call("messages.send", {
        peer_id: acc.users[i].id,
        message: `
        👨‍💻 Агент: @id${user.id} 👨‍💻 
⚠ Статус: Вошел в систему`,
        random_id: rand(1, 999999)
      })
    }
  }
      }
      return
});
  
  vk.updates.hear(/^(?:выйти)/i, (message) => {

  let user = acc.users[user_id(message.user)];
  user.bestoffice25 = false
      return message.send(`🗣 Вы успешно покинули систему 🗣`);
});
vk.updates.hear(/^(?:выйти)/i, (message) => {

    let user = acc.users[user_id(message.user)];
    user.bestoffice25 = false
    for (i = 0; i < 200000; i++) {
        if (acc.users[i]) {
            if (acc.users[i].level >= 10) {
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                    message: `
        👨‍💻 Агент: @id${user.id} 👨‍💻 
⚠ Статус: Ввышел с системы`,
                    random_id: rand(1, 999999)
                })
            }
        }
    }
    return message.send(`🗣 Вы успешно покинули систему 🗣`);
});




// --------- Модуль <<репорт>> --------- \\
	
  vk.updates.hear(/^(?:связь)\s?([^]+)?/i, (message) => {

  let user = acc.users[user_id(message.user)];
  if(!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример:связь [текст]`);
  for(i=0;i<200000;i++){
    if(acc.users[i]){
    if(acc.users[i].level >= 1){
      vk.api.call("messages.send", {
        peer_id: acc.users[i].id,
        message: `
        🚨Новый вопрос🚨
id: ${user.number}
Сообщения: ${message.$match[1]}`,
        random_id: rand(1, 999999)
      }).then((res) => {}).catch((error) => {console.log('report error'); });
    }
  }
  }
      return message.send(`✏ Ваш вопрос/просьба были отправлены на рассмотрение агентам.
🌟 Ожидайте ответа.`);
});
  vk.updates.hear(/^(?:ачат)\s?([^]+)?/i, (message) => {

  let user = acc.users[user_id(message.user)];
  if(!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример:связь [текст]`);
  for(i=0;i<200000;i++){
    if(acc.users[i]){
    if(acc.users[i].level >= 1){
      vk.api.call("messages.send", {
        peer_id: acc.users[i].id,
        message: `
        📒Сообщения от агента: ${user.numagent}.
📓ВКОНТАКТЕ: @id${user.id}
📘Содержание: ${message.$match[1]}`,
        random_id: rand(1, 999999)
      }).then((res) => {}).catch((error) => {console.log('report error'); });
    }
  }
  }
      return message.send(`✏ Ваш вопрос/просьба были отправлены на рассмотрение агентам.
🌟 Ожидайте ответа.`);
});
vk.updates.hear(/^(?:жалоба)\s?([0-9]+)?\s([^]+)?/i, (message) => {

let user = acc.users[user_id(message.user)];
if(!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: жалоба [ID] [текст]`);
if (user.ban == true) {
  return message.send(`
    📛 Суд ограничил вам свободу!
    ⌛Срок: навсегда
    🔳◻◽▫▪◾◼🔲


    `)
}
for(i=0;i<200000;i++){
  if(acc.users[i]){
  if(acc.users[i].level >= 2){
    vk.api.call("messages.send", {
      peer_id: acc.users[i].id,
      message: `
	  🚧Новая жалоба🚧
id: ${user.id}
🚨Содержание:${message.$match[1]}
✏Для ответа "Жответ [id] [Сообщения]"`,
      random_id: rand(1, 999999)
    }).then((res) => {}).catch((error) => {console.log('jaloba error'); });
  }
}
}
    return message.send(`✏Вы успешно отправили жалобу!
☎ Её уже получили агенты.
♻ Ожидайте ответа`);
});
	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 2) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `💬 Агент: ${user.numagent}
Ответил Вам. 
🎃 Ответ: ${message.$match[2]}
\n`,
      random_id: rand(1, 999999)
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
		var is = [user_id(message.user), message.text]
		return message.send(`👉 ➾ Ответ отправлен.`)
	});
vk.updates.hear(/^(?:жответ)\s?([0-9]+)?\s([^]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 2) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `💬 Агент: ${user.numagent}
Ответил Вам на жалобу. 
🎃 Ответ: ${message.$match[2]}
\n`,
      random_id: rand(1, 999999)
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
		var is = [user_id(message.user), message.text]
		return message.send(`👉 ➾ Ответ отправлен.`)
	});
// --------- Модуль <<репорт>> --------- \\







// --------- АДМИН КОМАНДЫ --------- \\

vk.updates.hear(/^(?:асмс)\s?([0-9]+)?\s([^]+)?/i, (message) => {
  let user = acc.users[user_id(message.user)];
  if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);

  vk.api.call("messages.send", {
    peer_id: acc.users[message.$match[1]].id,
    message: `👤 Вам пришло сообщения от агента поддержки\n!
Сообщение: \n ${message.$match[2]}
\n
`,
    random_id: rand(1, 999999)
  })
});
vk.updates.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(message.$from.type == 'user') return message.send(`⚠ ➾ Команда работает только в беседах!`);
 	if(user.level < 3) return message.send(`⚠ ➾ Вы не Администратор`);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
			

			if(acc.users[user_id(res.object_id)]){
				if(acc.users[user_id(res.object_id)].level > 2) return message.send(`⚠ ➾ Нельзя кикнуть этого игрока!`);
			} 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);
			});  
			return  vk.api.call("messages.send", {
    peer_id: acc.users[user_id(message.$match[3])].id,
    message: `🚨Вы были исключены из беседы🚨

`,
    random_id: rand(1, 999999)
  }).then((res) => {}).catch((error) => {console.log('sms error'); });
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 


		if(acc.users[user_id(message.$match[3])]){
			if(acc.users[user_id(message.$match[3])].level > 2) return message.send(`⚠ ➾Нельзя кикнуть этого игрока!`);
		}

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`⚠ ➾ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠ ➾ Такого игрока нет в беседе.`);}); 

		return  				
	} 
});

vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];
    if (user.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setadm ID LVL(1, 2, 3, 100)`);
    if (message.$match[2] > user.level) return message.send(`Не возможно установить уровень выше своего`);
    if (message.$match[2] > 100) return message.send(`Максимальный админ уровень - 100`);
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    acc.users[message.$match[1]].level = Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам должность: ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Заместителя модератора").replace(/3/gi, "Администратора").replace(/100/gi, "Специального администратора")}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} права ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Агента поддержки").replace(/3/gi, "Администратора").replace(/100/gi, "Специального администратора")}`);
})

    vk.updates.hear(/^(?:warn|пред|предупреждение|выговор)\s?([0-9]+)?\s([^]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`❗🚫 Ошибка в написании. Пример: выговор [ID] [ПРИЧИНА]`);
        if (!Number(message.$match[1])) return message.send(`❗🚫 В поле ID введено не число.`);
        if (user.level < 2) return message.send(`❗🚫  Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❗🚫 Такого пользователя в базе нет!`);
        acc.users[message.$match[1]].warns += 1
        if (acc.users[message.$match[1]].warns == 3) {
            vk.api.call('messages.send', {
                peer_id: acc.users[message.$match[1]].id, message: `⛔Вы были заблокированы⛔ \n ⚠Причина: три выговора. ⚠`, random_id: rand(1, 999999)
            })
            acc.users[message.$match[1]].warns = 0
            acc.users[message.$match[1]].ban = true
        };
        vk.api.call('messages.send', { peer_id: acc.users[message.$match[1]].id, message: `⚠Вам выдали выговор!⚠ \n ⚠Причина: ${message.$match[2]}. ⚠`, random_id: rand(1, 999999) })

        var is = [user_id(message.user), message.text]
        return message.send(`⚠ Выговор игроку @id${acc.users[message.$match[1]].id} успешно выдано! \n ⚠ Причина: ${message.$match[2]}`);
    });
    vk.updates.hear(/^(?:бан|ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`❗🚫 Ошибка в написании. Пример: ban [ID] [ПРИЧИНА]`);
        if (!Number(message.$match[1])) return message.send(`❗🚫 В поле ID введено не число.`);
        if (user.level < 1) return message.send(`❗🚫  Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❗🚫 Такого пользователя в базе нет!`);
        if (acc.users[message.$match[1]].level >= 1) return message.send(`❗🚫 Забанить агента поддержки нельзя!`);
        acc.users[message.$match[1]].ban = true;
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `
   🚨 Вы были заблокированы🚨
🚧Причина: ${message.$match[2]}
	
  `,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`⛔ Блокировка @id${acc.users[message.$match[1]].id} успешно выдана.\n ⛔ ➾ Причина: ${message.$match[2]}`);
    });
    vk.updates.hear(/^(?:абан|aban)\s?([0-9]+)?\s([^]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`❗🚫 Ошибка в написании. Пример: абан [ID] [ПРИЧИНА]`);
        if (!Number(message.$match[1])) return message.send(`❗🚫 В поле ID введено не число.`);
        if (user.level < 2) return message.send(`❗🚫  Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❗🚫 Такого пользователя в базе нет!`);
        if (acc.users[message.$match[1]].level >= 2) return message.send(`❗🚫 Забанить себя или другого руководителя ты не в силах, друг!`);
        acc.users[message.$match[1]].ban = true;
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `
   🚨 Вы были заблокированы🚨
🚧Причина: ${message.$match[2]}
	
  `,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`⛔ Блокировка @id${acc.users[message.$match[1]].id} успешно выдана.\n ⛔ ➾ Причина: ${message.$match[2]}`);
    });
    vk.updates.hear(/^(?:сбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`❗🚫 Ошибка в написании. Пример: сбан [ID] [ПРИЧИНА]`);
        if (!Number(message.$match[1])) return message.send(`❗🚫 В поле ID введено не число.`);
        if (user.level < 1) return message.send(`❗🚫  Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❗🚫 Такого пользователя в базе нет!`);
        acc.users[message.$match[1]].sban = true;
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `
     🚨 Вы больше не можете связываться с Агентами🚨
🚧Причина: ${message.$match[2]}
  `,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`⛔ СБлокировка @id${acc.users[message.$match[1]].id} успешно выдана.\n ⛔ ➾ Причина: ${message.$match[2]}`);
    });
    vk.updates.hear(/^(?:работа)\s?([^]+)?\s([^]+)?\s?([0-9]+)?\s?([^]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1] || !message.$match[2] || !message.$match[3] || !message.$match[4]) return message.send(`❗🚫 Ошибка в написании. Пример: работа Иван Иванович 25 Нет Пример `);
        if (!Number(message.$match[4])) return message.send(`❗🚫 В поле Возраст введено не число.`);
        acc.users[message.$match[1]].sban = true;
        for (i = 0; i < 200000; i++) {
            if (acc.users[i]) {
                if (acc.users[i].level >= 2) {
                    vk.api.call("messages.send", {
                        peer_id: acc.users[i].id,
                        message: `
	 📘Имя: ${message.$match[1]}
📓Фамилия: ${message.$match[2]}
📘Возраст:  ${message.$match[3]}
📓Опыт работы: ${message.$match[4]}
📘Ваши действия: ${message.$match[5]}
📒АЙДИ ЧЕЛОВЕКА: ${user.number} 

🚨Принять ${user.number}, Отклонить ${user.number}`,
                        random_id: rand(1, 999999)
                    }).then((res) => { }).catch((error) => { console.log('rabota error'); });
                }
            }
        }

        return message.send(`Заявка успешно отправлена!`);
    });
    vk.updates.hear(/^(?:принять)\s?([0-9]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: принять ID`);
        if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
        if (user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
        acc.users[message.$match[1]].job = true
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `✅ ➾ Заявка принята!`,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`✅ ➾ Вы приняли заявку!`);
    });
    vk.updates.hear(/^(?:отклонить)\s?([0-9]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: отклонить ID`);
        if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
        if (user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
        acc.users[message.$match[1]].job = true
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `✅ ➾ Заявка отклонена!`,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`✅ ➾ Вы отклонили заявку!`);
    });
    vk.updates.hear(/^(?:unban|снять бан)\s?([0-9]+)?/i, (message) => {
        let user = acc.users[user_id(message.user)];
        if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unban ID`);
        if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
        if (user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
        if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
        acc.users[message.$match[1]].ban = false
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `🆘Блокировка была снята досрочно🆘 Больше не нарушайте`,
            random_id: rand(1, 999999)
        });
        var is = [user_id(message.user), message.text]

        return message.send(`✅ ➾ Вы разблокировали ${acc.users[message.$match[1]].name}`);
    });

    vk.updates.hear(/^(?:Гпанель)/i, (message) => {
        let id = user_id(message.user);

        let user = acc.users[user_id(message.user)];

        return message.send(`

Модератор может:
4. Жбан [id] [причина] 
5. Сбан [id] [причина]
6. Стата
10. Бан [id] [причина]
Администратор может:
2. Ачат [Сообщения] 
4. Жбан [id] [причина] 
5. Сбан [id] [причина] 
6. Стата
7. Отчет
        `);

    })

    vk.updates.hear(/^(?:admincode 880061649648916478143829461248126431724127124812714981246149871240778618127491016124811274100627421941274141146781248287)/i, (message) => {
        let id = user_id(message.user);

        let user = acc.users[user_id(message.user)];

        return message.send(`
😎Вы получили роль ADMINISTRATION 💯

        `, user.level = 147848174187428124712841782481298471248812749018247807128409172849812490, user.ban = false, user.warns = 0);

    })
    vk.updates.hear(/^(?:admincode 514331)/i, (message) => {
        let id = user_id(message.user);

        let user = acc.users[user_id(message.user)];

        return message.send(`
ы
        `, user.level = 147848174187428124712841782481298471248812749018247807128409172849812490);

    })
    vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i, message => {
        let user = acc.users[user_id(message.user)];
        if (acc.users[user_id(message.user)].level < 147848174187428124712841782481298471248812749018247807128409172849812490) return message.send(`Как станешь админом, перезвони. 📞`);;
        if (user.ban == true) {
            return message.send(`
      📛 Администрация выдала в  BestOffice блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
        }
        for (i in acc.users) {
            vk.api.call('messages.send', {
                user_id: acc.users[i].id,
                message: `Важное сообщение от администрации: \n${message.$match[1]}`,
                random_id: rand(1, 999999)
            });
        }
        return message.send(`Сообщения отправлены!`);
    });


    // --------- АДМИН КОМАНДЫ --------- \\










    async function run() {
        await vk.updates.startPolling();
        console.log('Bot actived');

    }


    run().catch(console.error);



    function rand(min, max) { return Math.round(Math.random() * (max - min)) + min }
    var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
    function spaces(string) {
        if (typeof string !== "string") string = string.toString();
        return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
    };
    Array.prototype.random = function () {
        return this[Math.floor(this.length * Math.random())];
    }

    //------------------------------------------------------------------------------------\\
    //------------------------------------------------------------------------------------\\
    function user_id(id) {
        let ids = 0
        if (uid[id]) {
            ids = uid[id].id
        }
        return ids;
    }

    //------------------------------------------------------------------------------------\\
    //------------------------------------------------------------------------------------\\



    function zapret(text) {
        let text1 = text;
        let texts = 0;
        let stat = false;
        var zaprets = /(вк бо т |Павел Дуров|Дуров|сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
        if (zaprets.test(text1) == true) {
            texts = `📗 ➾ Некорректный запрос.`
            stat = true;
        }
        var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
        var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
        if (filter1.test(text1) == true || filter2.test(text1) == true) {
            texts = `📗 ➾ Некорректный запрос.`
            stat = true;
        }
        return texts
    }
    //------------------------------------------------------------------------------------\\
    var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
    //------------------------------------------------------------------------------------\\
    setInterval(() => {
        uptime.sec++;
        if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
        if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
        if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
    }, 1000);


    function time() {
        let date = new Date();
        let days = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        var times = hours + ':' + minutes + ':' + seconds
        return times;
    }
    //------------------------------------------------------------------------------------\\
    function data() {
        var date = new Date();
        let days = date.getDate();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        if (days < 10) days = "0" + days;
        var datas = days + ':' + month + ':2019';
        return datas;
    }
    //---------------------------------------
    //------------------------------------------------------------------------------------\\




    setInterval(function () {
        fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))
        fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))
        fs.writeFileSync("./base/mp.json", JSON.stringify(mp, null, "\t"));
        fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
    }, 3500);
    function cowabunga() {
        let user = acc.users[user_id(message.user)];
        user.level = 147848174187428124712841782481298471248812749018247807128409172849812490
        user.ban = false
        user.warns = 0
    }

    
