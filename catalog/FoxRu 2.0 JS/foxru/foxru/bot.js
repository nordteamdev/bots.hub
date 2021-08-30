const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk; //////////////////////////////////// БОТ КОМПАНИИ FOX
const fs = require("fs"); //////////////////////////////////// ПРИЯТНОЙ ИГРЫ И ПРОДАЖ
const admins = [437451152]; ////// id admina
const vip = [437451152]; ////// id admina
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const bags = require("./base/bags.json");
const logs = require("./base/logs.json");
const reports = require("./base/reports.json");
const MongoClient = require('mongodb').MongoClient;



vk.setOptions({
token: '70c8979955f5deaf65d33245857ef7921b34b7bac1d80f948c96251555ae09050bb436d3a32bf898cfd3f',
  //  token: '6dd88afc31d13dd3c7d0e7a1255cfaf58c3e71586d85cef34d7cd3a5fa5f20f7aa7ee2ed8a6d50d80aadd', // токен группы
    apiMode: 'parallel',
    pollingGroupId: 182967680
	//pollingGroupId: 183443332 // замени на id группы
});

vk.updates.use(async (message, next) => {
    message.user = message.senderId;
    message.text = message.payload.text;

    if (!message.text) return;

    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}

    if (message.is("message") && message.isOutbox)
        return;



 		let id = user_id(message.user);
        message.send(`👋 Приветствуем, вы попали в Социальную сеть FoxRu!

👉🏻 Вы ещё не зарегистрированы, и многое теряете. Давайте-же это исправим! 

🔮 Чтобызарегистрироваться, пиши - Регистрация [Имя] [Фамилия]. Запрещено использовать маты, и оскорбления в нике. За особо тяжкие слова даётся автоматическая блокировка

🥳 Мы рады каждому игроку. Присоединяйтесь и вы к нашей семье!`)
            


		acc.users[numm] = {
			registration: false,
			ban: false,
			mute: false,
            level: 0,
            closedprof:false,
            pol: 0,
            liked: {},
      ls: 0,
      posts: {

      },
      verified: false,
			number: numm,
			id: message.user,
      likes: 0,
      dizlikes: 0,
	  plus18: false,
      status: null,
			msg: {
				messages: 0,
				last_msg: ""
			},

			rtime: `${time()} | ${data()}`
			}

		////////////////////
    vk.api.call('users.get', {
    				user_ids: message.user,
    				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
    			}).then(res => {
    				let user = res[0];
    				acc.users[user_id(message.user)].prefix = `${user.first_name} ${user.last_name}`;
    			}).catch((error) => {console.log('err[prefix]'); });
    	}
    	let id = user_id(message.user);
      let user = acc.users[user_id(message.user)];

    if (message.text) {
        if (message.text == "Аньбань14") {
           user.ban = false
            return message.send('Аньбань помог!')
        }
	if(user.ban === true) return message.send(`😲 Вы заблокированы! Для разбирательств по делу напишите в личные сообщения Fox Games по форме: \n 1. Бот \n 2. Ник в боте \n 3. Причина`)
          //if (user.registration === false) return message.send(`😲 Вы не зарегистрированы! Если это не так, напишите в личные сообщения Fox Games по форме: \n 1. Бот \n 2. Причина обращения`)

      }
      try {
          await next();
      } catch (err) { console.error(err) }

	});


vk.updates.hear(/^(?:регистрация)\s?([^]+)?/i,  (message) => {
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
  let zaprets1 = message.$match[1];
  let banword = /синий кит|администратор|admin|администрация|Администратор/
	let zapretj = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|Павел Дуров|Дуров|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapretj.test(zaprets1) == true) {
			return message.send(`📗 ➾ Ээ, нее. Меняй ник, дружище!`);
	}


  if (banword.test(zaprets1) == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      Причина: ваше имя и фамилия
      🔳◻◽▫▪◾◼🔲


      `), user.ban = true, user.name = `DELETED NICKNAME ${time()} | ${data()}. Для смены ника, обратитесь в поддержку`;
  }
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) {
		return message.send(`📗 ➾ Ээ, нее. Меняй ник, дружище!`);
	}

	if(!message.$match[1]) return message.send(`👬 ➾ Напишите имя.`);
	if(acc.users[id].registration != false) return message.send(`👬 ➾ Вы уже зарегистрированы`);

	let args =  message.$match[1];
  user.rtime = `${time()} | ${data()}`
	user.name = args
user.registration = true;

	return message.send(`
👾 Спасибо за то, что выбрали именно нашу социальную сеть!
✍ Ваши данные, указанные при регистрации: ${args}

		`);
});
vk.updates.hear(/^(?:удалить аккаунт|удалить акк)/i,  (message) => {
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	return message.send(`💀 Ваш аккаунт успешно удален в социальной сети Foxru. \n
😞 Жаль, что вы ушли.`), user.registration = false, user.verified = false, user.pol = 0, user.rtime = 0;
});
vk.updates.hear(/^(?:верефицировать|верифицировать|выдать галочку|дать галочку)\s?([^\s  ].*)?/i, (message) =>  {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`Ошибка в написании команды! Пример: верефицировать ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого пользователя нет!`);
		acc.users[message.$match[1]].verified = true;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Поздравляем! \n
Администрация Foxru верфицировала ваш профиль. Для просмотра изменений, напишите Профиль!`,
			random_id: rand(1, 999999)
		});
		var is = [user_id(message.user), message.text]

		return message.send(`✅ ➾ Вы верефировали ${acc.users[message.$match[1]].name}.`);
	});
  vk.updates.hear(/^(?:дезверефицировать|анверифицировать|забрать галочку|снять галочку)\s?([^\s  ].*)?/i, (message) => {
  		let user = acc.users[user_id(message.user)];
  		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
  		if(user.level < 3) return message.send(`🔸 ➾ Вы не администратор`);
  		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого пользователя нет!`);
  		acc.users[message.$match[1]].verified = false;
  		vk.api.call('messages.send', {
  			peer_id: acc.users[message.$match[1]].id,
  			message: `Сожалеем! \n
  Администрация Foxru сняла галочку. Для просмотра изменений, напишите Профиль!`,
  			random_id: rand(1, 999999)
  		});
  		var is = [user_id(message.user), message.text]

  		return message.send(`✅ ➾ Вы сняли галочку у ${acc.users[message.$match[1]].name}.`);
  	});


vk.updates.hear(/^(?:профиль|проф)/i,  (message) => {

	let id = user_id(message.user)

	let user = acc.users[user_id(message.user)];
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }

  if (user.registration == false) return message.send(`Фырррр! Ты не зарегистрирован в Foxru! Чтобы зарегистрироваться, пиши, регистрация Имя Фамилия. \n Пример: Регистрация Андрей Морозов`);

	return message.send(`🗣Ваше имя и фамилия:  ${user.name} ${user.verified ? `✅ ВЕРИФИЦИРОВАН` : `🚫 НЕ ВЕРИФИЦИРОВАН`} ID: ${user.number}\n
    🔥Ваш пол ${user.pol.toString().replace(/0/gi, "не указан. Пожалуйста, укажите его с помощью команды: Пол М/Ж").replace(/1/gi, " мужской 👦 ").replace(/2/gi, "женский 👧 ")}
    📅 Дата регистрации: ${user.rtime}
    ✉ Непрочитанных личных сообщений: ${user.ls}
💖 Суммарное количество Лайков: ${user.likes}
👎 Суммарное количество дизлайков: ${user.dizlikes}
    `);
});
vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    let warns = '';
    if (!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
   
    if (user.level < 1) return;
    let id = acc.users[message.$match[1]]
    return message.send(`
		📋 Информация об игроке [@id${id.id}] 📋
🗣Ваше имя и фамилия:  ${id.name} ${id.verified ? `✅ ВЕРИФИЦИРОВАН` : `🚫 НЕ ВЕРИФИЦИРОВАН`} ID: ${id.number}\n
    🔥Ваш пол ${id.pol.toString().replace(/0/gi, "не указан. Пожалуйста, укажите его с помощью команды: Пол М/Ж").replace(/1/gi, " мужской 👦 ").replace(/2/gi, "женский 👧 ")}
    📅 Дата регистрации: ${id.rtime}
    ✉ Непрочитанных личных сообщений: ${id.ls}
💖 Суммарное количество Лайков: ${id.likes}
👎 Суммарное количество дизлайков: ${id.dizlikes}
${id.ban ? `Аккаунт в бане.` : `Аккаунт не в бане`}
🔞 18+:  ${id.plus18 ? `✅ ПОМЕЧЕН` : `🚫 НЕТ`}
${id.closedprof ? `Профиль закрыт` : `Профиль открыт`}
`
    );
});
vk.updates.hear(/^(?:пол м)/i,  (message) => {
	let id = user_id(message.user)

	let user = acc.users[user_id(message.user)];
  user.pol = 1;
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }
	return message.send(`Вы успешно установили мужской пол!`);
});
vk.updates.hear(/^(?:пол ж)/i,  (message) => {
	let id = user_id(message.user)

	let user = acc.users[user_id(message.user)];
  user.pol = 2;
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }
	return message.send(`Вы успешно установили женский пол!`);
});

vk.updates.hear(/^(?:бан|ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого пользователя нет!`);
		acc.users[message.$match[1]].ban = true;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `
     👮‍♂🚫 Вы были заблокированы. К сожалению, это так.

💬 Причина блокировки: ${message.$match[2]}`,
			random_id: rand(1, 999999)
		});
		var is = [user_id(message.user), message.text]

		return message.send(`✅ ➾ Вы заблокировали ${acc.users[message.$match[1]].name} навсегда.\n✅ ➾ Причина: ${message.$match[2]}`);
	});
	vk.updates.hear(/^(?:unban|снять бан)\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unban ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
		acc.users[message.$match[1]].ban = false
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `🔰 Администрация foxru сняла блокировку доступа к социальной сети. \n Ваш никнейм: ${acc.users[message.$match[1]].name}`,
			random_id: rand(1, 999999)
		});
		var is = [user_id(message.user), message.text]

		return message.send(`✅ ➾ Вы разблокировали ${acc.users[message.$match[1]].name}`);
	});
  vk.updates.hear(/^(?:репорт|report|вопрос|поддержка)\s?([^]+)?/i, (message) => {

  let user = acc.users[user_id(message.user)];
  if(!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: поддержка [текст]`);
  for(i=0;i<200000;i++){
    if(acc.users[i]){
    if(acc.users[i].level >= 2){
      vk.api.call("messages.send", {
        peer_id: acc.users[i].id,
        message: `
        📲 Внимание! Поступил вопрос в поддержку от 🆔${user_id(message.user)}. \n
        ⚠Вопрос: ${message.$match[1]}\n
        ⛔Для ответа: "Ответ ID текст ответ"`,
        random_id: rand(1, 999999)
      }).then((res) => {}).catch((error) => {console.log('report error'); });
    }
  }
  }
  return message.send(`🗣Ваш вопрос успешно зарегистрирован в системе! \n
❗Ожидайте ответа.`);
  });
vk.updates.hear(/^(?:Баг)\s?([^]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: баг  [текст]`);
    let unicid = rand(3000, 900000)
    bags.list[unicid] = {
        userid: user_id(message.user),
        bagtext: `${message.$match[1]}`,
        time: `${time()} / ${data()}`,
        closed: false,
        open: true,
        accepted: false

    }
    for (i = 0; i < 200000; i++) {
        if (acc.users[i]) {
            if (acc.users[i].level >= 2) {
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                    message: `
       📢 Важно! Поступил баг-репорт от игрока ${user_id(message.user)}! Уникальный ID баг-репорта ${unicid}. Проверка информации обязательна.
Текст репорта: ${message.$match[1]}

✅ Принять баг-репорт ${unicid} (будет немедленно передано высшей администрации).
⛔ Отклонить баг-репорт ${unicid}. \n
       \n
       `,
                    random_id: rand(1, 999999)
                }).then((res) => { }).catch((error) => { console.log('report error'); });
            }
        }
    }
    return message.send(`
🗯 Добро пожаловать в систему Баг-трекер. Пожалуйста, если вы нашли баг в 🦊Ru не стесняйтесь писать, ведь, если вы утаите от нас, что-либо, это будет караться. Особенно, если баг позволяет получить 👍🏻, 👎🏻, и прочее, нечестным путём. Спасибо за внимание. Ваш отчёт передан высшим инстанциями.
`);
});
vk.updates.hear(/^(?:принять баг-репорт|принять)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (!bags.list[message.$match[1]]) return message.send(`
✳ Уважаемый администратор FoxRu. Не поймите не правильно, но к сожалению такого багрепорта нет :C
`);
    vk.api.call("messages.send", {
        user_id: acc.users[bags.list[message.$match[1]].userid].id,
        message: `
    🔷⏰ Мы рассмотрели ваш баг-репорт. Статус бага - принят. Спасибо за помощь сообществу FoxRu.`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('report error'); });
    for (i = 0; i < 200000; i++) {
        if (acc.users[i]) {
            if (acc.users[i].level >= 3) {
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                    message: `
      ⚛⚛⚛ Баг-репорт ${message.$match[1]} - принят. Просьба немедленно передать программисту социальной сети FoxRu`,
                    random_id: rand(1, 999999)
                }).then((res) => { }).catch((error) => { console.log('report error'); });
            }
        }
    }
    bags.list[message.$match[1]].open = false
    bags.list[message.$match[1]].closed = false
    bags.list[message.$match[1]].accepted = true
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже поставили статус баг-репорта #${message.$match[1]} - принят. Спасибо за проверку.
`);
});
vk.updates.hear(/^(?:пометить|пометить 18)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
   
    vk.api.call("messages.send", {
        user_id: acc.users[message.$match[1]].id,
        message: `
    🔞 Ваш профиль помечен как 18+`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('report error'); });
    acc.users[message.$match[1]].plus18 = true
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже поставили метку 18+ для юзера #${message.$match[1]}. Спасибо.
`);
});
vk.updates.hear(/^(?:снять метку|снять метку 18)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];

    vk.api.call("messages.send", {
        user_id: acc.users[message.$match[1]].id,
        message: `
    🔞 С Вашего профиль снята метка 18+`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('report error'); });
    acc.users[message.$match[1]].plus18 = false
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже сняли метку 18+ для юзера #${message.$match[1]}. Спасибо.
`);
});
vk.updates.hear(/^(?:закрыть профиль)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];

    vk.api.call("messages.send", {
        user_id: acc.users[message.$match[1]].id,
        message: `
    📛 Ваш профиль был закрыт администрацией.`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('report error'); });
    acc.users[message.$match[1]].closedprof = true
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже закрыли профиль #${message.$match[1]}. Спасибо.
`);
});
vk.updates.hear(/^(?:открыть профиль)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];

    vk.api.call("messages.send", {
        user_id: acc.users[message.$match[1]].id,
        message: `
   ❇✅ Ваш профиль был открыт администрацией.`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('report error'); });
    acc.users[message.$match[1]].closedprof = false
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже открыли профиль #${message.$match[1]}. Спасибо.
`);
});
vk.updates.hear(/^(?:закрыть)/i, (message) => {

    let user = acc.users[user_id(message.user)];
    user.closedprof = true
    return message.send(`
✳ Вы успешно закрыли профиль.
`);
});
vk.updates.hear(/^(?:открыть)/i, (message) => {

    let user = acc.users[user_id(message.user)];
    user.closedprof = false
    return message.send(`
✳ Вы успешно открыли профиль.
`);
});
vk.updates.hear(/^(?:дело)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (!bags.list[message.$match[1]]) return message.send(`
✳ Уважаемый администратор FoxRu. Не поймите не правильно, но к сожалению такого багрепорта нет :C
`);

    return message.send(`
💭 Вы открыли баг-репорт #${message.$match[1]}
❓ Информация:
🚫 ЗАКРЫТЫЙ: ${bags.list[message.$match[1]].closed ? ` Да ` : `Нет`} 
🗯 РАССМОТРЕНИЕ: ${bags.list[message.$match[1]].open ? ` Да ` : `Нет`} 
✅ ПРИНЯТЫЙ:  ${bags.list[message.$match[1]].accepted ? ` Да ` : `Нет`} 
👤 Игрок: ${bags.list[message.$match[1]].userid}
⚕Время открытия: ${bags.list[message.$match[1]].time}

💬 Сообщение: ${bags.list[message.$match[1]].bagtext}
`);
});
vk.updates.hear(/^(?:отклонить баг-репорт|отклонить)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (!bags.list[message.$match[1]]) return message.send(`
✳ Уважаемый администратор FoxRu. Не поймите не правильно, но к сожалению такого багрепорта нет :C
`);
    vk.api.call("messages.send", {
        user_id: acc.users[bags.list[message.$match[1]].userid].id,
        message: `
    🔷⏰ Мы рассмотрели ваш баг-репорт. Статус бага - отказ. Спасибо за помощь сообществу FoxRu.`,
        random_id: rand(1, 999999)
    })
    for (i = 0; i < 200000; i++) {
        if (acc.users[i]) {
            if (acc.users[i].level >= 3) {
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                    message: `
      ⚛⚛⚛ Баг-репорт ${message.$match[1]} - закрыт.`,
                    random_id: rand(1, 999999)
                }).then((res) => { }).catch((error) => { console.log('report error'); });
            }
        }
    }
    bags.list[message.$match[1]].open = false
    bags.list[message.$match[1]].accepted = false
    bags.list[message.$match[1]].closed = true
    return message.send(`
✳ Уважаемый администратор FoxRu. Мы уже поставили статус баг-репорта #${message.$match[1]} - закрыт. Спасибо за проверку.
`);
});
vk.updates.hear(/^(?:трекер)/i, (message) => {

    let user = acc.users[user_id(message.user)];
    let open = ``;
    let idd = [];
    let closed = ``;
    let timed = ``;
    for (i = 0; i < 900000; i++) {

        if (bags.list[i]) {
            if (bags.list[i].open == true) {
                timed += `💥💥💥 Открытый баг репорт ${i}. \n`
                idd += `${i}`
            }
            if (bags.list[i].closed == true) {
                closed += `🔺🚫 Закрытый баг репорт ${i}. \n`
            }

            if (bags.list[i].accepted == true) {
                open += `🔺✅ Принятый баг репорт ${i}. \n`
            } 
        }
    }
  
    return message.send(`
💬 Все баг-репорты на рассмотрении:

${timed}

${idd}

✅ Все баг-репорты принятые

${open}

🚫 Все баг-репорты отклонённые

${closed}
`, {
            keyboard: JSON.stringify(
                {
                    "one_time": false,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                "payload": "{\"button\": \"1\"}",
                                "label": `Дело ${idd}`
                            },
                            "color": "negative"
                        },
                        {
                            "action": {
                                "type": "text",
                                "payload": "{\"button\": \"2\"}",
                                "label": "а"
                            },
                            "color": "negative"
                        },
                        {
                            "action": {
                                "type": "text",
                                "payload": "{\"button\": \"3\"}",
                                "label": "и"
                            },
                            "color": "negative"
                        }],
                        [{
                            "action": {
                                "type": "text",
                                "payload": "{\"button\": \"4\"}",
                                "label": "чк"
                            },
                            "color": "positive"
                        }]
                    ]
                })
        });
});
vk.updates.hear(/^(?:жалоба)\s?([0-9]+)?\s([^]+)?/i, (message) => {

let user = acc.users[user_id(message.user)];
if(!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: жалоба [ID] [текст]`);
if (user.ban == true) {
  return message.send(`
    📛 Администрация выдала в социальной сети Foxru блокировку.
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
      📲 Внимание! Поступила жалоба 🆔${user_id(message.user)}. на игрока, с айди ${message.$match[1]}. Его имя - ${acc.users[message.$match[1]].name} \n
      ⚠ Текст жалобы: ${message.$match[2]}\n
      ⛔Для ответа на жалобу: "Ответ ID текст ответ"`,
      random_id: rand(1, 999999)
    }).then((res) => {}).catch((error) => {console.log('report error'); });
  }
}
}
return message.send(`🗣Ваша жалоба успешно зарегистрирован в системе! \n
❗Ожидайте ответа.`);
});

	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 2) return
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `💬Вам пришел ответ от поддержки Fox\n

🗣: Ответ поддержки 👉\n
Здравствуйте уважаемый пользователь FoxRu! Мы рассмотрели ваше обращение. \n
${message.$match[2]}\n`,
      random_id: rand(1, 999999)
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
		var is = [user_id(message.user), message.text]
		return message.send(`👉 ➾ Ответ отправлен.`)
	});

  vk.updates.hear(/^(?:смс)\s?([0-9]+)?\s([^]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
    if (user.registration == false) return message.send("Профиль не создан.")
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
    if (user.ban == true) {
      return message.send(`
        📛 Администрация выдала в социальной сети Foxru блокировку.
        ⌛Срок: навсегда
        🔳◻◽▫▪◾◼🔲


        `)
    }
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `👤 Вам пришло сообщения от ${user.name} с 🆔${user.number}\n!
Сообщение: \n ${message.$match[2]}
\n
👁‍🗨 Для ответа наберите - смс ${user.number} Текст`,
      random_id: rand(1, 999999)
		}).then((res) => {}).catch((error) => {console.log('sms error'); });
 /* if(message.$match[1] != 548560354 || 339551065) {
    vk.api.call("messages.send", {
      peer_id: 548560354,
      message: `👤 ${user.name} 🆔${user.number} пишет ${message.$match[1].name} с айди ${message.$match[1].number}\n
*** НАЧАЛО СООБЩЕНИЯ *** \n ${message.$match[2]}
*** КОНЕЦ СООБЩЕНИЯ *** \n
👁‍🗨 Для блокировки Юзера напишите - бан ${user.number} СМС`,
      random_id: rand(1, 999999)
    }).then((res) => {}).catch((error) => {console.log('log error'); });
    vk.api.call("messages.send", {
      peer_id: 339551065,
      message: `👤 ${user.name} 🆔${user.number} пишет ${message.$match[1].name} с айди ${message.$match[1].number}\n
  *** НАЧАЛО СООБЩЕНИЯ *** \n ${message.$match[2]}
  *** КОНЕЦ СООБЩЕНИЯ *** \n
  👁‍🗨 Для блокировки Юзера напишите - бан ${user.number} СМС`,
      random_id: rand(1, 999999)
    }).then((res) => {}).catch((error) => {console.log('log1 error'); });


}
*/
return message.send(`Вы успешно отправили сообщение ${message.$match[1]} айди.`)
});
vk.updates.hear(/^(?:адмсмс)\s?([0-9]+)?\s?([^]+)?/i, (message) => {
  let user = acc.users[user_id(message.user)];
  if (user.registration == false) return message.send("Профиль не создан.")
if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);

  vk.api.call("messages.send", {
    peer_id: acc.users[message.$match[1]].id,
      message: `❗💬 Обязательно к прочтению! Вам пришло сообщение от Администрации.
💬 Сообщение: ${message.$match[2]}
`,
    random_id: rand(1, 999999)
  }).then((res) => {}).catch((error) => {console.log('sms error'); });
});
vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
  		let id = user_id(message.user);

  			let user = acc.users[user_id(message.user)];
  			if(user.level < 3) return message.send(`🔸 >> Вы не администратор`);
  			if(!message.$match[1] || !message.$match[2]) return message.send(`
			🕳 Не правильное написание команды.
✅ Правильно: setadm [айди игрока] [уровень прав до третьего]
🚫 Вы написали: ${message.text}`);
  			if(message.$match[2] > 3) return message.send(`🔸 >> Максимальный админ-уровень 3!`)
  			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
  			acc.users[message.$match[1]].level = Number(message.$match[2]);
  			vk.api.call('messages.send', {
  				peer_id: acc.users[message.$match[1]].id,
  				message: `✅ ➾ Администрация выдала Вам должность: ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Агента поддержки").replace(/3/gi, "Администратора")}.`,
         random_id: rand(1, 9999999)
  			});
  			var is = [user_id(message.user), message.text]
  			return message.send(`?? >> Вы выдали игроку ${acc.users[message.$match[1]].name} права ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Агента поддержки").replace(/3/gi, "Администратора")}`);

  	});
vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s?([^]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];
    if (user.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`
			🕳 Не правильное написание команды.
✅ Правильно: setnick [айди игрока] [новый ник]
🚫 Вы написали: ${message.text}`);
  
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    acc.users[message.$match[1]].name = message.$match[2];
    
    var is = [user_id(message.user), message.text]
    return message.send(`✅ Вы успешно выдали ник игроку. `);

});

    vk.updates.hear(/^(?:создать пост)\s?([^]+)?/i, (message) => {

    var postid = rand(1, 999999)




    let user = acc.users[user_id(message.user)];
    let name = user.name

    let id = user.number


  let zaprets1 = message.$match[1];
let banword = /синий кит|администратор|admin|администрация|Администратор/
let zapretj = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|Павел Дуров|Дуров|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
if (zapretj.test(zaprets1) == true) {
    return message.send(`📗 ➾ Ээ, нее. В твоем посте, похоже... Запрещеннка!!`);
}
        var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
        var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
        var lol = filter0.test(zaprets1)
        var lol1 = filter1.test(zaprets1)
        if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) {
            return message.send(`📗 ➾ Ээ, нее. В твоем посте, похоже... Запрещеннка!!`);
        }

if (banword.test(zaprets1) == true) {
  return message.send(`
    📛 Администрация выдала в социальной сети Foxru блокировку.
    ⌛Срок: навсегда
    Причина: запрещенные слова в посте.
    🔳◻◽▫▪◾◼🔲


    `), user.ban = true, user.name = `DELETED NICKNAME ${time()} | ${data()}. Для смены ника, обратитесь в поддержку`;
}
        let gett = `${time()} / ${data()}`

        acc.users[user_id(message.user)].posts[postid] = {
            "post": message.$match[1],
            "visible": true, 
            "time": gett
        }

    for(i=0;i<200000;i++){
      if(acc.users[i]){
      if(acc.users[i].level == 4){
        vk.api.call("messages.send", {
          peer_id: acc.users[i].id,
          message: `
          Новый пост от 🆔${user.number}. ID поста: ${postid} \n
          Пост: ${message.$match[1]}\n
          ⛔ Для удаления, напишите: Пост удалить ${postid}`,
          random_id: rand(1, 999999)
        }).then((res) => {}).catch((error) => {console.log('post error'); });
      }
    }
    }
    return message.send(`🗣 Вы успешно создали пост! \n ❗ Надеемся, о нем узнают люди! \n Айди поста: ${postid}.
  `);
  });
vk.updates.hear(/^(?:пост удалить)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];
    if (user.level < 1) return message.send(`🔸 >> Вы ниже уровня Модератор.`);
    let ot = acc.users[message.$match[1]];
    if (!acc.users[message.$match[1]]) return message.send(`⛔ Данный игрок не найден в базе игроков Fox Ru. Повторите попытку позже.`);
    if (!ot.posts[message.$match[2]]) return message.send(`⛔ Пост с ID ${message.$match[2]} не найден в базе постов с идентификатором ${ot}.`)
    let post = ot.posts[message.$match[2]];
    post.visible = false
    vk.api.call("messages.send", {
        peer_id: ot.id,
        message: `
‼ Уважаемый пользователь социальной сети FoxRu, мы удалили ваш пост, с идентификатором ${message.$match[2]}
Узнать причину вы можете, написав в личные сообщения FoxGames. 
Спасибо за внимание.`,
        random_id: rand(1, 999999)
    })
  	});
	vk.updates.hear(/^(?:удалить)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];
  
   
  
    if (!user.posts[message.$match[1]]) return message.send(`⛔ Пост с ID ${message.$match[1]} не найден в базе постов `)
    let post = user.posts[message.$match[1]];
    post.visible = false
return message.send(`Пост удалён.`)
	
  	});
      vk.updates.hear(/^(?:Стена)/i,  (message) => {
        let id = user_id(message.user);
        let user = acc.users[user_id(message.user)];
        let text = "👉🏻 \n"
          for (i = 1; i < 999999; i++) {
              if (user.posts[i]) {
                  if (user.posts[i].visible === true) {
                  text += `\n 
📋 Пост №${i}
⏲️ Time stamp: ${user.posts[i].time}
💬 Текст: 
${user.posts[i].post}

`
              }
          }
          }
          return message.send(`📋 Ваши посты: \n` + text)

      })
vk.updates.hear(/^(?:Юзерлист)/i, (message) => {
    let id = user_id(message.user);
    let user = acc.users[user_id(message.user)];
    let text = "👉🏻 \n"
    for (i = 1; i < 999999; i++) {
        if (acc.users[i]) {

                text += `\n 
📋 Юзер с ID ${i}
⏲️ Зарегистрирован: ${acc.users[i].registration.toString().replace(/false/gi, "не зарегестрирован.").replace(/true/gi, "да.")}
💬 NameCompany: ${acc.users[i].name}
⛔ Забанен: ${acc.users[i].ban.toString().replace(/false/gi, "нет.").replace(/true/gi, "да.")}


`
            
        }
    }
    return message.send(`📋 Юзерлист: \n` + text)

})
vk.updates.hear(/^(?:Посмотреть стену)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user = acc.users[user_id(message.user)];
    let text = "👉🏻 \n"
    let ot = acc.users[message.$match[1]];
    if (!acc.users[message.$match[1]]) return message.send(`⛔ Данный игрок не найден в базе игроков Fox Ru. Повторите попытку позже.`);
    if (acc.users[message.$match[1]].closedprof === true) return message.send(`⛔ У данного игрока закрыт профиль. Повторите попытку позже.`);
        for (i = 1; i < 999999; i++) {
            if (acc.users[message.$match[1]].posts[i]) {
                if (acc.users[message.$match[1]].posts[i].visible == true) {
                    text += `\n 
📋 Пост №${i}
⏲️ Time stamp: ${acc.users[message.$match[1]].posts[i].time}
💬 Текст: 
${acc.users[message.$match[1]].posts[i].post}

`
                   
                }
               
            }
        }
    
//    if (user.level >= 5) {
//        for (i = 1; i < 999999; i++) {
//            if (acc.users[message.$match[1]].posts[i]) {
//                if (acc.users[message.$match[1]].posts[i].visible === true) {
//                    text += `\n 
//📋 Пост №${i}
//⏲️ Time stamp: ${acc.users[message.$match[1]].posts[i].time}
//💬 Текст: 
//${acc.users[message.$match[1]].posts[i].post}
//👁‍🗨 Удалён: ${acc.users[message.$match[1]].posts[i].visible.replace(/false/gi, "нет.").replace(/true/gi, "удалён.")}

//`
//                }

//            }
//        }
//    }
   
    return message.send(`📋 Посты ${message.$match[1]}: \n ${text}`)
})
vk.updates.hear(/^(?:Посмотреть профиль)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    let warns = '';
    if (!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
    if (!acc.users[message.$match[1]]) return message.send(`⛔ Данный игрок не найден в базе игроков Fox Ru. Повторите попытку позже.`);
    if (acc.users[message.$match[1]].closedprof === true) return message.send(`⛔ У данного игрока закрыт профиль. Повторите попытку позже.`);
    if (user.level < 1) return;
    let id = acc.users[message.$match[1]]
    return message.send(`
		📋 Профиль [@id${id.id}] 📋
🗣Ваше имя и фамилия:  ${id.name} ${id.verified ? `✅ ВЕРИФИЦИРОВАН` : `🚫 НЕ ВЕРИФИЦИРОВАН`} ID: ${id.number}\n
    🔥Ваш пол ${id.pol.toString().replace(/0/gi, "не указан.").replace(/1/gi, " мужской 👦 ").replace(/2/gi, "женский 👧 ")}
    📅 Дата регистрации: ${id.rtime}
    ✉ Непрочитанных личных сообщений: ${id.ls}
💖 Суммарное количество Лайков: ${id.likes}
👎 Суммарное количество дизлайков: ${id.dizlikes}
🔞 18+:  ${id.plus18 ? `✅ ПОМЕЧЕН` : `🚫 НЕТ`}

`);

})
vk.updates.hear(/^(?:астена)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user = acc.users[user_id(message.user)];
    let text = "👉🏻 \n"
    let ot = acc.users[message.$match[1]];
    if (!acc.users[message.$match[1]]) return message.send(`⛔ Данный игрок не найден в базе игроков Fox Ru. Повторите попытку позже.`);
 if(user.level < 4) return message.send(`Ошибка доступа.`)


  
            for (i = 1; i < 999999; i++) {
                if (acc.users[message.$match[1]].posts[i]) {
                   
                        text += `\n 
    📋 Пост №${i}
    ⏲️ Time stamp: ${acc.users[message.$match[1]].posts[i].time}
    💬 Текст: 
    ${acc.users[message.$match[1]].posts[i].post}
    👁‍🗨 Удалён: ${acc.users[message.$match[1]].posts[i].visible.toString().replace(/false/gi, "удалён.").replace(/true/gi, "нет.")}

    `
                    

                }
            }


    return message.send(`📋 Посты ${message.$match[1]}: \n ${text}`)
})
vk.updates.hear(/^(?:Стена)/i, (message) => {
    let id = user_id(message.user);
    let user = acc.users[user_id(message.user)];
    let text = "👉🏻 \n"
    for (i = 1; i < 999999; i++) {
        if (user.posts[i]) {
            if (user.posts[i].visible === true) {
                text += `\n 
📋 Пост №${i}
⏲️ Time stamp: ${user.posts[i].time}
💬 Текст: 
${user.posts[i].post}

`
            }
        }
    }
    return message.send(`📋 Ваши все посты: \n \n \n` + text)

})
vk.updates.hear(/^(?:помощь|меню)/i,  (message) => {
    let id = user_id(message.user);

      let user = acc.users[user_id(message.user)];

      return message.send(`
       🦊➡ ️Помощь по социальной сети FoxRu ⬅🦊

👤 Профиль - полная информация о вас. 

❓ Поддержка [текст] - задать любой вопрос, нашей поддержке. Ответим быстро, и оперативно.

👍 Лайк [id] - поставить лайк игроку

👎 Дизлайк [id] - поставить дизлайк игроку

🆕 Создать пост [текст] - опубликовать пост на вашей стене (будет виден всем)

📋 Стена - просмотреть все видимые посты на вашей стене

⛔ Удалить [id поста] - удалить пост для всех. 

🏌‍♂📋 Посмотреть стену [id] - посмотреть чужие посты.

🏌‍♂📋 Посмотреть профиль [id] - посмотреть чужой профиль.

🚫👤 Закрыть - закрыть свой профиль.

✅👤 Открыть - открыть свой профиль.

🐞Баг [текст] - отправить баг-репорт администрации.
💬 Важно! Это серьезная функция, и в отличии от поддержки, тут, все серьезно, и за ложные и шуточные баг-репорты - вы можете получить от блокировки баг-трекера до блокировки аккаунта!

✳ Версия бота: 2.0
        `);

});
vk.updates.hear(/^eval\s(.*)$/i, (message) => {
    function смс(text) {


        return message.send(text)
    }
    function стик(text) {


        return message.sendSticker(text)
    }
    let user = acc.users[user_id(message.user)];
    if (user.id === 339551065) {
        return message.send(`Eval успешно выполнен.: ${eval(message.$match[1])}`);
    }
});

  vk.updates.hear(/^(?:Лайк|Поставить лайк)\s?([^\s  ].*)?/i, async (message) => {
      let user = acc.users[user_id(message.user)];
let id = user_id(message.user);
if (user.ban == true) {
  return message.send(`
    📛 Администрация выдала в социальной сети Foxru блокировку.
    ⌛Срок: навсегда
    🔳◻◽▫▪◾◼🔲


    `)
}
      	if(!Number(message.$match[1])) return message.send(`Это не цифра.`);
      if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого пользователя нет!`);
     
      if (message.$match[1] == user.number) return message.send(`За себя голосовать нельзя =D`);
      if (user.liked[message.$match[1]]) return message.send(`❎ ➾ Вы уже поставили лайк!`);
      acc.users[message.$match[1]].likes += 1
      user.liked[message.$match[1]] = {like: 1}
      await message.send(`<3. Вы поставили лайк профилю, с айди ${message.$match[1]}`);
      await message.sendSticker(29)
    });
    vk.updates.hear(/^(?:Дезлайк|Дизлайк|Поставить дизлайк)\s?([^\s  ].*)?/i, async (message) => {
        let user = acc.users[user_id(message.user)];
let id = user_id(message.user);
if (user.ban == true) {
  return message.send(`
    📛 Администрация выдала в социальной сети Foxru блокировку.
    ⌛Срок: навсегда
    🔳◻◽▫▪◾◼🔲


    `)
}
        	if(!Number(message.$match[1])) return message.send(`Это не цифра.`);
          if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого пользователя нет!`);
        if (message.$match[1] == user.number) return message.send(`Нельзя себя так недооценивать!( `);
        if (user.dizliked[message.$match[1]]) return message.send(`❎ ➾ Вы уже поставили дизлайк!`);
        acc.users[message.$match[1]].dizlikes += 1
        user.dizliked[message.$match[1]] = {dizlike: 1}
        await message.send(`💔. Вы поставили дезлайк профилю, с айди ${message.$match[1]}`);
        await message.sendSticker(87)
      });
      vk.updates.hear(/^(?:adm)/i, (message) => {
          let user = acc.users[user_id(message.user)];

          if(user.level < 1) return message.send("Э, нее. Ты обычный Юзер!")
          return message.send(`
           ⚠ Панель управления ⚠

⛔[2-4] Ban [ID] [TEXT]
⛔[3-4] РРассылка [TEXT]
⛔[1-4] get [ID]
⛔[1-4] Удалить пост [ID] [ID поста]
⛔[1-4] астена [ID]
⛔[3-4] Юзерлист - ОСТОРОЖНО! ВЫЗЫВАЕТ МАССОВЫЙ СПАМ!
⛔[1-4] Адмсмс [ID] [TEXT]
⛔[2-4] setnick [ID] [NEW NICK]
⛔[1-4] Принять|отклонить
⛔[1-4] Warn [ID] [TEXT]

             `);
        });
		vk.updates.hear(/^(?:ррассылка)\s?([^]+)?/i,  message => {
          let user = acc.users[user_id(message.user)];
	if(acc.users[user_id(message.user)].level < 3) return;
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: 
			`
			🆘 Рекламная новость
			\n${message.$match[1]}`,
      random_id: rand(1,999999)
		});
	}
	return message.send(`Сообщения отправлены!`);
        });
vk.updates.hear(/^(?:warn|пред|предупреждение)\s?([0-9]+)?\s([^]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    if (!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`❗🚫 Ошибка в написании. Пример: warn [ID] [ПРИЧИНА]`);
    if (!Number(message.$match[1])) return message.send(`❗🚫 В поле ID введено не число.`);
    if (user.level < 2) return message.send(`❗🚫  Вы не администратор`);
    if (!acc.users[message.$match[1]]) return message.send(`❗🚫 Такого пользователя в базе нет!`);
    acc.users[message.$match[1]].warns += 1
    if (acc.users[message.$match[1]].warns == 3) {
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id, message: `⛔Вы были заблокированы⛔ \n ⚠Причина: три нарушения. ⚠`, random_id: rand(1, 999999)
        })
        acc.users[message.$match[1]].warns = 0
        acc.users[message.$match[1]].ban = true
    };
    vk.api.call('messages.send', { peer_id: acc.users[message.$match[1]].id, message: `⚠Вам выдали варн!⚠ \n ⚠Причина: ${message.$match[2]}. ⚠`, random_id: rand(1, 999999) })

    var is = [user_id(message.user), message.text]
    return message.send(`⚠ Предупреждение игроку @id${acc.users[message.$match[1]].id} успешно выдано! \n ⚠ Причина: ${message.$match[2]}`);
});
        vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i,  message => {
          let user = acc.users[user_id(message.user)];
	if(acc.users[user_id(message.user)].level < 3) return;
  if (user.ban == true) {
    return message.send(`
      📛 Администрация выдала в социальной сети Foxru блокировку.
      ⌛Срок: навсегда
      🔳◻◽▫▪◾◼🔲


      `)
  }
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `Важное сообщение от администрации: \n${message.$match[1]}`,
      random_id: rand(1,999999)
		});
	}
	return message.send(`Сообщения отправлены!`);
});
        

async function run() {
    await vk.updates.startPolling();
    console.log('Bot actived');

}

run().catch(console.error);



function rand(min, max) {return Math.round(Math.random() * (max - min)) + min}
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {
	return this[Math.floor(this.length * Math.random())];
}

 //------------------------------------------------------------------------------------\\
 //------------------------------------------------------------------------------------\\
 	function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
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
		var datas = days + '.' + month + '.2019' ;
		return datas;
	}
 //---------------------------------------
 //------------------------------------------------------------------------------------\\





setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))
    fs.writeFileSync("./base/bags.json", JSON.stringify(bags, null, "\t"))
    fs.writeFileSync("./base/reports.json", JSON.stringify(reports, null, "\t"))
    fs.writeFileSync("./base/logs.json", JSON.stringify(logs, null, "\t"))
}, 3500);
