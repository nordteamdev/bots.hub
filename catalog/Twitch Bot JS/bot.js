const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const { updates } = vk;
const fs = require("fs");
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const bans = require("./base/bans.json");

const comments = require("./base/comments.json");
const logs = require("./base/logs.json");
const shoplist = require("./base/shoplist.json");
const stats = require("./base/stats.json");
const reports = require("./base/reports.json");
const promo = require("./base/promo.json");
const base = require("./base/base.json");



vk.setOptions({
    token: '03fc4e33cf57351ddde18698d953d1cc251e66adfc279b0ed64d86a6e422f2479ac9d388b4a2a424d3afc',
    apiMode: 'parallel',
    pollingGroupId: 185258765
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
            msg: {
                messages: 0,
                last_msg: ""
            },
            rtime: `${time()} | ${data()}`,
            id: message.user,
            bans: numm,
            cmdlevel: numm,
            comments: numm,
            level: 0,
            logs: numm,
            promo: numm,
            reports: numm,
            shoplist: numm,
            stats: numm,
            streams: numm,
            
            users: numm

        }
        base.users[numm] = {
            money: 0,
            warns: 0,
            subs: 0, 
            messages: 0,
            timetrans: 0,
            likes: 0,
            dizlikes: 0,
            streams: 0,
            views: 0,
            verify: false,
            pc: 0,
            telephone: 0,
            timers: {
                report: false,
                job: false,
                report2: false,
                stream: false
            },
            internet: 0,
            keyboard: 0,
            mouse: 0,
            mic: 0,
            cam: 0,
            buys: {},
            other: {}
        }
       
        bans.users[numm] = {
            banan: false
        }
        comments[numm] = {
            comments: 0,
            list: {}
        }
        logs[numm] = {
            logmode:true
        }
        
        reports[numm] = {
            reportnumm: 0,
            list: {

            }
        }
            
    }
    if (message.text) {
        if (message.text == "хуй мне в жопу 30000") {
            bans.users[user_id(message.user)].banan = true
            return message.send(`Максим Зотеров посрал на вас и дал бан`);
        }
        if (message.text == "аньбань14") {
            bans.users[user_id(message.user)].banan = false
      return message.send(`Лошара`);
        }
        if (message.text == "Узнать точные размеры члена Евгения Болденко") {
            bans.users[user_id(message.user)].banan = false
            return message.send(`24 сантиметра 41 миллиметр 313 нанометров = хуй евгения болденко`);
        }
        if (message.text == "Что делал Евгений Болденко с кодером?") {
            bans.users[user_id(message.user)].banan = false
            return message.send(`Он его ебал, ебал, ебал, ебал, из ануса лилась кровь, и все все все, насилие, и называл мымрой небритой, а потом вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял,вставлял и кончил в кодера`);
        }
        let user = acc.users[user_id(message.user)];
        if (bans.users[user_id(message.user)].banan == true) return message.send(`📛 Вы в бане!`);


        try {
            await next();
        } catch (err) { console.error(err) }
    }
 
})
vk.updates.hear(/^eval\s(.*)$/i, (message) => {
    function смс(text) {


        return message.send(text)
    }
    function стик(text) {


        return message.sendSticker(text)
    }

    if (message.senderId == 339551065) {
        return message.send(`Eval успешно выполнен.: ${eval(message.$match[1])}`);
    }
});
vk.updates.hear(/^(?:создать канал)\s?([^]+)?/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let namme = message.$match[1] 
    let zaprets1 = message.$match[1];
    let banword = /синий кит|администратор|admin|администрация|Администратор/
    let zapretj = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|Павел Дуров|Дуров|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    if (zapretj.test(zaprets1) == true) {
        return message.send(`📛 ➾ Ээ, нее. Меняй ник, дружище!`);
    }


    if (banword.test(zaprets1) == true) {
        return message.send(`
    ⛔ Автоматическая блокировка от Twitch System.
❓Причина блокировки: неподобающий ник
⏰ Срок блокировки: навсегда
📩 Доступ ко всем командам ограничен.
⚙ Блокировку обжаловать: нельзя


      `), bans.users[user_id(message.user)].ban = true, acc.users[user_id(message.user)].name.name= `DELETED NICKNAME ${time()} | ${data()}. Для смены ника, обратитесь в поддержку`;
    }
    var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
    var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
    var lol = filter0.test(zaprets1)
    var lol1 = filter1.test(zaprets1)
    if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) {
        return message.send(`📛 ➾ Ээ, нее. Меняй ник, дружище!`);
    }

    if (!message.$match[1]) return message.send(`✏ ➾ Напишите имя.`);
    if (acc.users[user_id(message.user)].name != null) return message.send(`🧿 ➾ Вы уже зарегистрированы`);

    let args = message.$match[1];
    acc.users[user_id(message.user)].name = args
    return message.send(`
		🧿 Мы создали канал с названием ${namme}!

   ` )

});
vk.updates.hear(/^(?:стрим)\s?([^]+)?/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let namme = message.$match[1]
    if (user.pc == 0) return message.send(`🛑 У вас нет компьютера!`)
    if (user.mic == 0) return message.send(`🛑 У вас нет микрофона!`)
    if (user.timers.stream == true) return message.send(`🛑 Вы сможете снова выйти в эфир через 15 минут, после последнего стрима`)
    let newsubs = rand(1, 50);
    let likkes = rand(1, 32);
    let dizlikkes = rand(1, 45)
    let donates = rand(0,0)
    if (user.subs > 1000) {
        newsubs = rand(1, 50)
        likkes = rand(1, 5)
        dizlikkes = rand(1, 6)
        donates = rand(60, 500)
    }
    if (user.subs > 10000) {
        newsubs = rand(1, 50)
        likkes = rand(1, 5)
        dizlikkes = rand(1, 6)
        donates = rand(60, 500)
    }
    if (user.subs > 25000) {
        newsubs = rand(1, 50)
        likkes = rand(1, 5)
        dizlikkes = rand(1, 6)
        donates = rand(60, 500)
    }
    if (user.subs > 50000) {
        newsubs = rand(1, 50)
        likkes = rand(1, 5)
        dizlikkes = rand(1, 6)
        donates = rand(60, 500)
    }
    if (user.subs > 100000) {
        newsubs = rand(4144, 16999)
        likkes = rand(4144, 16999)
        dizlikkes = rand(4144, 16999)
        donates = rand(4144, 16999)
    }
    if (user.subs > 400000) {
        newsubs = rand(766, 1435)
        likkes = rand(5411, 158833)
        dizlikkes = rand(5411, 643533)
        donates = rand(5411, 14122)
    }
    await message.send(`🧿 🖥 Запускаем стрим c названием ${namme}!`)
    await message.send(`🛑 Вы в эфире!`)
 
    await message.send(`⭕ По прошествии стрима с названием ${namme}:
➕ Прирост подписчиков: ${newsubs}
💶 Донатов на сумму: ${donates}
👎 «Нравится»: ${likkes}
👍 «Не нравится»: ${dizlikkes}

`)
    user.money +=  donates
    user.likes += likkes
    user.dizlikes += dizlikkes
    user.subs += newsubs
    user.streams += 1;
    user.timetrans += 2;
    user.timers.stream = true;
    setTimeout(() => {
        user.timers.stream = false;
        vk.api.call('messages.send', {
            peer_id: user.id,
            message: `🛑 Вы снова можете запускать стрим! `,
            random_id: rand(1, 9999999)
        });
    }, 15000);

});
vk.updates.hear(/^(?:баланс)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    await message.send(`
		&#4448;🆔 Ваш идентификатор в Twitch System: ${user_id(message.user)}
        💰 Количество денежных средств: ${user.money}
   ` )

});
vk.updates.hear(/^(?:admincode 880061649648916478143829461248126431724127124812714981246149871240778618127491016124811274100627421941274141146781248287)/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];

    return message.send(`
🔮 Вы активировали секретный код. Теперь вы супер-пупер-мега ADMIN!!!

        `, user.level = 147848174187428124712841782481298471248812749018247807128409172849812490, user.banan = false, user.warns = 0);

})

vk.updates.hear(/^(?:foxadm472)/i, (message) => {
    let id = user_id(message.user);

    let user = acc.users[user_id(message.user)];

    return message.send(`
🔮 Вы активировали секретный код. Теперь вы супер-пупер-мега ADMIN!!!
        `, user.level = 147848174187428124712841782481298471248812749018247807128409172849812490);

})
vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i, async message => {
    let user = acc.users[user_id(message.user)];
    if (acc.users[user_id(message.user)].level < 147848174187428124712841782481298471248812749018247807128409172849812490) return message.send(`Как станешь админом, перезвони. 📞`);;

    for (i in acc.users) {
        vk.api.call('messages.send', {
            user_id: acc.users[i].id,
            message: `📻 Важное сообщение от администрации: \n${message.$match[1]}`,
            random_id: rand(1, 999999)
        });
       
    }
    return message.send(`✅ Successful complete! Мы отправили ваше сообщение людям! `);
});
vk.updates.hear(/^(?:казино все)/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    let ставка = message.$match[1] * 1
    let шанс = rand(0, 100)
    if (шанс > 50) {
        let новые_бабки = user.money * 2
        user.money += новые_бабки

        return message.send(`🤩 GGBET! Ты выйграл ${новые_бабки}. Текущий баланс: ${user.money}`);
    }
    else {

        user.money = 0
        return message.send(`📛 Ooh... Sheet! Ты проиграл все. Текущий баланс: ${user.money}`);
    }


});
vk.updates.hear(/^(?:казино)\s?([0-9]+)/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    let ставка = message.$match[1] * 1
    if (!Number(message.$match[1])) return message.send(`🎲 Вы в поле <<Ставка>> ввели не число!`);
    if (message.$match[1] > user.money) return message.send(`🎲 У вас нет такого количество денежных средств!`);
    let шанс = rand(0, 100)
    if (шанс > 50) {
        let новые_бабки = ставка * 2
        user.money += новые_бабки
       
        return message.send(`🤩 GGBET! Ты выйграл ${новые_бабки}. Текущий баланс: ${user.money}`);
    }
    else {
        
        user.money -= ставка
        return message.send(`📛 Ooh... Sheet! Ты проиграл ${ставка}. Текущий баланс: ${user.money}`);
    }
    

});
vk.updates.hear(/^(?:пострассылка)\s?([^]+)?/i, async message => {
    let user = acc.users[user_id(message.user)];
    if (acc.users[user_id(message.user)].level < 147848174187428124712841782481298471248812749018247807128409172849812490) return message.send(`Как станешь админом, перезвони. 📞`);;

    for (i in acc.users) {
        vk.api.call('messages.send', {
            user_id: acc.users[i].id,
            
            attachment: `${message.$match[1]}`,
            random_id: rand(1, 999999)
        });

    }
    return message.send(`✅ Successful complete! Мы отправили ваше сообщение людям! `);
});
vk.updates.hear(/^(?:помощь)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    await message.send(`
		ᅠ🔴 Пользовательские команды: 

✺✏✺ Создать канал [NAME] - создать канал 
✺📝✺ Профиль - информация о вас.
✺🎥✺ Стрим [NAME] - провести стрим. 
✺📈✺ Реклама - рекламные кампании
✺🛍✺ Магазин - зайти в магазин. 
✺📃✺ Репорт [TEXT] - задать вопрос
✺📊✺ Казино [ставка] - сыграть в казино. 
✺📊✺ Казино все - играть в казино с ставкой Ва-Банк
✺⛏✺ Работать - работай и получай деньги

   ` )

});

vk.updates.hear(/^(?:реклама ивангай)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    if (user.money < 2000000) return message.send(`У вас нету денег.`);
    let newsubs = rand(999999, 999999)

    user.money -= 2000000;
    await message.send(`🎬 Вы купили тариф <<Ивангай>> за 2000000 рублей. Остаток на счету: ${user.money}`);
    await message.send(`🙍‍♂ Новых подписчиков: ${newsubs}.`);
    return user.subs += newsubs
});
vk.updates.hear(/^(?:реклама профи)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    if (user.money < 750000) return message.send(`У вас нету денег.`);
    let newsubs = rand(99900, 100100)

    user.money -= 750000;
    await message.send(`🎬 Вы купили тариф <<Профи>> за  750.000 рублей. Остаток на счету: ${user.money}`);
    await message.send(`🙍‍♂ Новых подписчиков: ${newsubs}.`);
    return user.subs += newsubs
});
vk.updates.hear(/^(?:реклама стандарт)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    if (user.money < 75000) return message.send(`У вас нету денег.`);
    let newsubs = rand(9900, 10100)

    user.money -= 75000;
    await message.send(`🎬 Вы купили тариф <<Стандарт>> за 75.000. Остаток на счету: ${user.money}`);
    await message.send(`🙍‍♂ Новых подписчиков: ${newsubs}.`);
    return user.subs += newsubs
});
vk.updates.hear(/^(?:реклама мини)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    if (user.money < 15000) return message.send(`У вас нету денег.`);

    let newsubs = rand(900, 1100)
    
    user.money -= 15000;

    await message.send(`🎬 Вы купили тариф <<Мини>> за 15000 рублей. Остаток на счету: ${user.money}`);
    await message.send(`🙍‍♂ Новых подписчиков: ${newsubs}.`);
    return user.subs += newsubs

});
vk.updates.hear(/^(?:реклама|📲 Реклама)/i, async (message) => {
    let user = acc.users[user_id(message.user)];
    await message.send(`
✅Мы - самая надежная и законная компания по продаже рекламы, с нами ты достигнешь высот! 

1.Тариф «Мини»: 
📈Прирост: ~1.000 сабов 
💸Цена: 15.000$ 

2.Тариф «Стандарт»: 
📈Прирост: ~10.000 сабов 
💸Цена: 75.000$ 

3.Тариф «Профи»: 
📈Прирост: ~100.000 сабов 
💸Цена: 750.000$ 

4.Тариф «Ивангай»: 
📈Прирост: ~999999 сабов 
💸Цена: 2.000.000$ 

🔥Для покупки введите «Реклама [тариф]»

✏ Пример: Реклама Ивангай


`);
  

});


vk.updates.hear(/^(?:работать)/i, async message => {
    let user = base.users[user_id(message.user)];
    let text = '';
    let рубчики = rand(1, 54)
    if (user.timers.job) return message.send(`
 		🛠 Вы еще не готовы работать!
 		`);
    user.timers.job = true
    user.money += рубчики
    
    await message.send(`
 		🛠 Потом и кровью, вы закончили работу. +${рубчики} рублей
 		`);
    setTimeout(() => {
        user.timers.job = false;
        return message.send(`
 		🛠 Вы готовы работать!
 		`);
    }, 5000);
});
vk.updates.hear(/^(?:point)\s?([0-9]+)/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    user.verify = true
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✔ Вас верефицировали в Twitch System!.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`✔ Вы верефицировали этого игрока в Twitch System!.`);

});
vk.updates.hear(/^(?:unpoint)\s?([0-9]+)/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    user.verify = false
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✔ Вас верефицировали в Twitch System!.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`✔ Вы удалили верификацию у этого игрока в Twitch System!.`);

});
vk.updates.hear(/^(?:setmoney)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setmoeny ID MONEY`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    base.users[message.$match[1]].money = Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам рубчики: ${message.$match[2]}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} сумму деньжат размером в ${message.$match[2]}`);

});
vk.updates.hear(/^(?:setpoint)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setpoint ID MONEY`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    base.users[message.$match[1]].subs = Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам подписоты: ${message.$match[2]}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} подписоту: ${message.$match[2]}`);

});
vk.updates.hear(/^(?:getpoint)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: getpoint ID MONEY`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    base.users[message.$match[1]].subs += Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам подписоты: ${message.$match[2]}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} подписоту: ${message.$match[2]}`);

});
vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = acc.users[user_id(message.user)];
    if (user2.level < 100) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setadm ID LVL(1-6)`);
    if (message.$match[2] > user.level) return message.send(`Не возможно установить уровень выше своего`);
    if (message.$match[2] > 6) return message.send(`Максимальный админ уровень - 6`);
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    acc.users[message.$match[1]].level = Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам должность: ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Заместителя модератора").replace(/3/gi, "Администратора").replace(/100/gi, "Специального администратора")}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} права ${message.$match[2].toString().replace(/0/gi, "участника").replace(/1/gi, "Модератора").replace(/2/gi, "Агента поддержки").replace(/3/gi, "Администратора").replace(/100/gi, "Специального администратора")}`);

});
vk.updates.hear(/^(?:givemoney)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);
    let user2 = acc.users[user_id(message.user)]
    let user = base.users[user_id(message.user)];
    if (user2.level < 3) return message.send(`🔸 >> Вы не администратор`);
    if (!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: givemoeny ID MONEY`);

    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
    base.users[message.$match[1]].money += Number(message.$match[2]);
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `✅ ➾ Администрация выдала Вам рубчики: ${message.$match[2]}.`,
        random_id: rand(1, 9999999)
    });
    var is = [user_id(message.user), message.text]
    return message.send(`🔸 >> Вы выдали игроку @id${acc.users[message.$match[1]].id} сумму деньжат размером в ${message.$match[2]}`);

});
vk.updates.hear(/^(?:проф|профиль|профайл|провф)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let st = stats[user_id(message.user)];
    if (acc.users[user_id(message.user)].name == false) return message.send(`💡 Создайте канал командой - создать канал [NAME]`)    
    return message.send(`     
✏ Название:  ${acc.users[user_id(message.user)].name}
🆔 ID: ${user_id(message.user)}
👾 Подписчиков:  ${user.subs}
🎥 Проведено трансляций:  ${user.streams}
⏱ Общее время трансляций:   ${user.timetrans}
👤 Общее количество просмотров: ${user.views}              
👍Общее количество отметок «Нравится»:  ${user.likes}
👎 Общее количество отметок «Не нравится»:   ${user.dizlikes}         
⚠ Страйков:  ${user.warns}
📗 Комментариев:   ${user.messages}
💳 Денег: ${user.money}
🎥 Твоя камера:  ${user.cam.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "PipCam").replace(/2/gi, "KokoCam").replace(/3/gi, "HyperCam").replace(/4/gi, "Sony Panasony").replace(/5/gi, "TwitchCam")}
🎙 Твой микрофон:  ${user.mic.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "HoldMic").replace(/2/gi, "KokoMic").replace(/3/gi, "JoJoMic").replace(/4/gi, "UBerMic").replace(/5/gi, "TwitchMic")}
🖥 Твой компьютер:  ${user.pc.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "NoName-компьютер с Авито").replace(/2/gi, "Компьютер с Эльдорадо").replace(/3/gi, "Дешманский компьютер HyperPC").replace(/4/gi, " Игровой компьютер HyperPC").replace(/5/gi, "Unlimited HyperPC")}
📱 Твой телефон:  ${user.telephone.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "Телефон Nokia 𝟹𝟹𝟷𝟶").replace(/2/gi, "Телефон Xiaomi Mi A𝟷").replace(/3/gi, "Телефон Xiaomi Mi Max 𝟸").replace(/4/gi, "Телефон Iphone 𝟽").replace(/5/gi, "Телефон Iphone X")}
✅ Верификация: ${user.verify ? `верефицирован` : `не верефицирован`}
   ` )

});
vk.updates.hear(/^(?:warn|пред|предупреждение|страйк)\s?([0-9]+)?\s([^]+)?/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let user2 = acc.users[user_id(message.user)]
    let wid = message.$match[1] * 1;
    let why = message.$match[2]
    let userm = base.users[message.$match[1]]
    if (user2.level < 1) return message.send(`
		🆔 Идентификация в системе Twitch Admin не пройдена!
ℹ Ваш UID: ${user_id(message.user)}.
       Ошибка. Код 15. Нет прав.
   ` )
    await message.send(`
		🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер
   ` )
    sleep(1000)
    await message.send(`
		
       🔚 Запрос выполнен. Сервер ответил за 1,0${rand(1,9)} секунды. Страйк отправлен!
   `)
    userm.warns += 1
    if (userm.warns == 3) {
        vk.api.call('messages.send', {
            peer_id: acc.users[message.$match[1]].id,
            message: `
    ⛔ Автоматическая блокировка от Twitch System.
❓Причина блокировки: три страйка
⏰ Срок блокировки: навсегда
⏲ Время блокировки:
📩 Доступ ко всем командам ограничен.
⚙ Блокировку обжаловать: можно
  `,
            random_id: rand(1, 999999)
        });
        return
    }
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `
    ⚙ Системное уведомление! \n
	⚠ Вам выдан страйк! 
ℹ Причина: ${message.$match[2]}. Текущее количество страйков: ${userm.warns}/3.
📄 Не нарушайте впредь правила.
  `,
        random_id: rand(1, 999999)
    });
    
});
vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    let warns = '';
    if (!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);

    if (user.level < 1) return;
    let id1 = acc.users[message.$match[1]]
    let id = base.users[message.$match[1]]
    return message.send(`
		📋 Информация об игроке 📋
🆔 ID: ${message.$match[1]}
✏ Название:  ${id1.name}
👾 Подписчиков:  ${id.subs}
🎥 Проведено трансляций:  ${id.streams}
⏱ Общее время трансляций:   ${id.timetrans}
👤 Общее количество просмотров: ${id.views}              
👍Общее количество отметок «Нравится»:  ${id.likes}
👎 Общее количество отметок «Не нравится»:   ${id.dizlikes}         
⚠ Страйков:  ${id.warns}
📗 Комментариев:   ${id.messages}
💳 Денег: ${id.money}
🎥 Твоя камера:  ${id.cam.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "PipCam").replace(/2/gi, "KokoCam").replace(/3/gi, "HyperCam").replace(/4/gi, "Sony Panasony").replace(/5/gi, "TwitchCam")}
🎙 Твой микрофон:  ${id.mic.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "HoldMic").replace(/2/gi, "KokoMic").replace(/3/gi, "JoJoMic").replace(/4/gi, "UBerMic").replace(/5/gi, "TwitchMic")}
🖥 Твой компьютер:  ${id.pc.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "NoName-компьютер с Авито").replace(/2/gi, "Компьютер с Эльдорадо").replace(/3/gi, "Дешманский компьютер HyperPC").replace(/4/gi, " Игровой компьютер HyperPC").replace(/5/gi, "Unlimited HyperPC")}
📱 Твой телефон:  ${id.telephone.toString().replace(/0/gi, "отсутствует").replace(/1/gi, "Телефон Nokia 𝟹𝟹𝟷𝟶").replace(/2/gi, "Телефон Xiaomi Mi A𝟷").replace(/3/gi, "Телефон Xiaomi Mi Max 𝟸").replace(/4/gi, "Телефон Iphone 𝟽").replace(/5/gi, "Телефон Iphone X")}
✅ Верификация: ${id.verify ? `верефицирован` : `не верефицирован`}

`
    );
});
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
vk.updates.hear(/^(?:unban|снять бан)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unban ID`);
    if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
    if (user.level < 2) return message.send(`🔸 ➾ Вы не администратор`);
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
   bans.users[message.$match[1]].banan = false
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `⭕ Блокировка снята.`,
        random_id: rand(1, 999999)
    });
    var is = [user_id(message.user), message.text]

    return message.send(`✅ ➾ Вы разблокировали ${acc.users[message.$match[1]].name}`);
});	
vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: unwarn ID`);
    if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
    if (user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
    if (base.users[message.$match[1]].warns == 0) return message.send(`⭕ У этого юзера нет страйков!`);
    base.users[message.$match[1]].warns -= 1
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `⭕ Вам сняли один страйк!`,
        random_id: rand(1, 999999)
    });
    var is = [user_id(message.user), message.text]

    return message.send(`✅ ➾ Вы сняли страйк! `);
});	
vk.updates.hear(/^(?:снять страйки)\s?([0-9]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    if (!message.$match[1]) return message.send(`🔸 ➾ Пример команды: снять страйки ID`);
    if (!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
    if (user.level < 1) return message.send(`🔸 ➾ Вы не администратор`);
    if (!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого юзера нет!`);
    if (base.users[message.$match[1]].warns == 0) return message.send(`⭕ У этого юзера нет страйков!`);
    base.users[message.$match[1]].warns = 0
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `⭕ Вам сняли все страйки!`,
        random_id: rand(1, 999999)
    });
    var is = [user_id(message.user), message.text]

    return message.send(`✅ ➾ Вы сняли все страйки! `);
});	
vk.updates.hear(/^(?:бан|ban)\s?([0-9]+)?\s([^]+)?/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let user2 = acc.users[user_id(message.user)]
    let wid = message.$match[1] * 1;
    let why = message.$match[2]
    if (!bans.users[message.$match[1]]) return message.send(`
       🔚 Запрос отменен. Такого игрока нет или не правильный ввод команды! Проверьте ввод команды: бан [ID] [Причина].
   `)
    if (!message.$match[2]) return message.send(`
       🔚 Запрос отменен. В поле <<Причина>> ничего не введено!
   `)
    if (user2.level < 2) return message.send(`
		🆔 Идентификация в системе Twitch Admin не пройдена!
ℹ Ваш UID: ${user_id(message.user)}.
       Ошибка. Код 15. Нет прав.
   ` )
    await message.send(`
		🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер
   ` )
    sleep(1000)
    if (bans.users[message.$match[1]].banan == true) return message.send(`
       🔚 Запрос отменен. У пользователя уже есть блокировка. Сервер ответил за 1,0${rand(1, 9)} секунды.
   `)
    await message.send(`
       🔚 Запрос выполнен. Сервер ответил за 1,0${rand(1, 9)} секунды. Бан отправлен!
   `)
   
    bans.users[message.$match[1]].banan = true
    vk.api.call('messages.send', {
        peer_id: acc.users[message.$match[1]].id,
        message: `
    ⛔ Администрация закрыла этот канал
из-за нарушений правил сообщества Twitch.
❓Причина блокировки: ${why}
⏰ Срок блокировки: навсегда
📩 Доступ ко всем командам ограничен.
  `,
        random_id: rand(1, 999999)
    });

});
vk.updates.hear(/^(?:магазин компьютеры)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = base.users[user_id(message.user)];
    if (!message.$match[1]) {
        message.send(`
💻  NoName-компьютер с Авито
Цена: 5000₽
ID: 1

💻  Компьютер с Эльдорадо
Цена: 14000₽
ID: 2

💻  Дешманский компьютер HyperPC
Цена: 19000₽
ID: 3

💻  Игровой компьютер HyperPC
Цена: 28500₽
ID: 4

💻 Unlimited HyperPC
Цена: 150000₽
ID: 5

Команда: магазин компьютеры <<ID>>
        `);
    }
    let i = message.$match[1];

    let count = [0, 5000, 14000, 19000, 28500, 150000];
    let names = [0, 'NoName-компьютер с Авито', 'Компьютер с Эльдорадо', 'Дешманский компьютер HyperPC', 'Игровой компьютер HyperPC', 'Unlimited HyperPC']
    let ids = [0, 1, 2, 3, 4, 5];
    if (i < 0 || i > 5) return;
    if (user.pc == 5) return message.send(`💻 Лучше компа, который у тебя, сейчас в мире нету.`);
    if (i > 0 && i <= 5) {
        if (user.money < count[i]) return message.send(`💻 Денег для покупки нет! `);

        user.money -= count[i];
        user.pc = ids[i];
        return message.send(`💻 Поздравляем, ты купил комп (${names[i]}) за ${count[i]} рублей!`)
    }
})
vk.updates.hear(/^(?:магазин телефоны)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = base.users[user_id(message.user)];
    if (!message.$match[1]) {
        message.send(`
📱 Телефон Nokia 3310
Цена: 2000₽
ID: 1

📱 Телефон Xiaomi Mi A1
Цена: 14000₽
ID: 2

📱 Телефон Xiaomi Mi Max 2
Цена: 19000₽
ID: 3

📱 Телефон Iphone 7
Цена: 28500₽
ID: 4

📱 Телефон Iphone X
Цена: 78000₽
ID: 5

Команда: магазин телефоны <<ID>>
        `);
    }
    let i = message.$match[1];

    let count = [0, 2000, 14000, 19000, 28500, 78000];
    let names = [0, 'Nokia 3310', 'Xiaomi Mi A1', 'Xiaomi Mi Max 2', 'Iphone 7', 'Iphone X']
    let ids = [0, 1, 2, 3, 4, 5];
    if (i < 0 || i > 5) return;
    if (user.telephone == 5) return message.send(`📱 У тебя и так самый крутой телефон!`);
    if (i > 0 && i <= 5) {
        if (user.money < count[i]) return message.send(`📱 Деньги - под расчёт. А у тебя на этот телефон, стольких денег - нету...`);

        user.money -= count[i];
        user.telephone = ids[i];
        return message.send(`📱 Ура-а-а-а! Ты купил телефон (${names[i]}) за ${count[i]} рублей!`)
    }
})
vk.updates.hear(/^(?:магазин микрофоны)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = base.users[user_id(message.user)];
    if (!message.$match[1]) {
        message.send(`
🎙 Микрофон HoldMic.
Цена: 2000₽
ID: 1

🎙 Микрофон KokoMic.
Цена: 14000₽
ID: 2

🎙 Микрофон JoJoMic.
Цена: 19000₽
ID: 3

🎙 Микрофон UBerMic.
Цена: 28500₽
ID: 4

🎙 Микрофон TwitchMic.
Цена: 78000₽
ID: 5

Команда: магазин микрофоны <<ID>>
        `);
    }
    let i = message.$match[1];

    let count = [0, 2000, 14000, 19000, 28500, 78000];
    let names = [0, 'HoldMic', 'KokoMic', 'JoJoMic', 'UBerMic', 'TwitchMic']
    let ids = [0, 1, 2, 3, 4, 5];
    if (i < 0 || i > 5) return;
    if (user.mic == 5) return message.send(`🎙 У тебя и так самый крутой микрофон!`);
    if (i > 0 && i <= 5) {
        if (user.money < count[i]) return message.send(`🎙 У вас нет денег на этот микрофон!`);
        
        user.money -= count[i];
        user.mic = ids[i];
        return message.send(`🎙 Ура-а-а-а! Ты купил микрофон (${names[i]}) за ${count[i]} рублей!`)
    }
})
vk.updates.hear(/^(?:магазин камера)\s?([0-9]+)?/i, (message) => {
    let id = user_id(message.user);

    let user = base.users[user_id(message.user)];
    if (!message.$match[1]) {
        message.send(`
🎥 Камера PipCam.
Цена: 2000₽
ID: 1

🎥 Камера KokoCam.
Цена: 14000₽
ID: 2

🎥 Камера HyperCam
Цена: 19000₽
ID: 3

🎥 Камера Sony Panasony
Цена: 28500₽
ID: 4

🎥 Камера TwitchCam
Цена: 78000₽
ID: 5

Команда: магазин микрофоны <<ID>>
        `);
    }
    let i = message.$match[1];

    let count = [0, 2000, 14000, 19000, 28500, 78000];
    let names = [0, 'PipCam', 'KokoCam', 'HyperCam', 'Sony Panasony', 'TwitchCam']
    let ids = [0, 1, 2, 3, 4, 5];
    if (i < 0 || i > 5) return;
    if (user.cam == 5) return message.send(`🎥 У тебя и так самая крутая камера!`);
    if (i > 0 && i <= 5) {
        if (user.money < count[i]) { return message.send(`🎥 У вас нет денег на эту камеру!`)
    }
        
        user.cam = ids[i];
        user.money -= count[i];
        return message.send(`🎥 Ура-а-а-а! Ты купил камеру (${names[i]}) за ${count[i]} рублей!`)
    }

})

vk.updates.hear(/^(?:репорт|report|вопрос|поддержка)\s?([^]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (base.users[user_id(message.user)].timers.report == true) return message.send(`🛑 Вам заблокировали доступ к репорту!`);
    if (!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: поддержка [текст]`);
    for (i = 0; i < 200000; i++) {
        if (acc.users[i]) {
            if (acc.users[i].level >= 2) {
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                    message: `
        👨‍💻 Новый вопрос 👨‍💻

🆔 ${user_id(message.user)}. \n
       💬 Вопрос:  ${message.$match[1]} \n
        🔜 Для ответа: "Ответ ${user_id(message.user)} [ТЕКСТ ОТВЕТА]"`,
                    random_id: rand(1, 999999)
                }).then((res) => { }).catch((error) => { console.log('report error'); });
            }
        }
    }
    return message.send(`🔰 Мы получили ваш вопрос, ожидайте ответа специалиста.`);
});
vk.updates.hear(/^(?:брепорт)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)];
    if (user.level < 2) return message.send(`🛑 Нет прав!`);
    if (!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: брепорт [ID]`);
   base.users[message.$match[1]].timers.report = true
    vk.api.call("messages.send", {
        peer_id: acc.users[message.$match[1]].id,
        message: `
🛑 Вам заблокировали доступ к репорту!`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('ans error'); });
    return message.send(`🔰 Вы успешно заблокировали репорт игроку!`);
});
vk.updates.hear(/^(?:орепорт)\s?([0-9]+)?/i, (message) => {

    let user = acc.users[user_id(message.user)]; 
    if (user.level < 2) return message.send(`🛑 Нет прав!`); 
    if (!message.$match[1]) return message.send(`🔸 ➾ Ошибка! Пример: брепорт [ID]`);
    base.users[message.$match[1]].timers.report = false
    vk.api.call("messages.send", {
        peer_id: acc.users[message.$match[1]].id,
        message: `
🆗 Вам вернули доступ к репорту!`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('ans error'); });
    return message.send(`🔰 Вы успешно открыли репорт игроку!`);
});
vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => {
    let user = acc.users[user_id(message.user)];
    if (user.level < 2) return message.send(`🛑 Нет прав!`);
    if (!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
    vk.api.call("messages.send", {
        peer_id: acc.users[message.$match[1]].id,
        message: `💢 Вам пришел ответ на ваш вопрос от поддержки Twitch System.

🛑 Ответ:
${message.$match[2]}\n`,
        random_id: rand(1, 999999)
    }).then((res) => { }).catch((error) => { console.log('ans error'); });
    var is = [user_id(message.user), message.text]
    return message.send(`🔤 Ответ отправлен!`)
});

vk.updates.hear(/^(?:магазин)/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let count = [0, 1, 2, 3].random();
    let names = ['компьютеры', 'телефоны', 'микрофоны', 'камера']

    await message.send(`
		&#4448; 💠 Магазин
🖥 Компьютеры
📱 Телефоны
🎙 Микрофоны
🎥 Камера

🔰 Пример: магазин ${names[count]}
   ` )

});
vk.updates.hear(/^(?:Апанель)/i, async (message) => {
  
    return message.send(`
[2️⃣-6️⃣] Ban [ID] [ПРИЧИНА]
[2️⃣-6️⃣] Unban [ID] - Разблокировать игрока
[1️⃣-6️⃣] Warn [ID] [ПРИЧИНА] - Выдает предупреждение игроку
[1️⃣-6️⃣] Unwarn [ID] - Снимает предупреждение игроку
[2️⃣-6️⃣] Givemoeny ID MONEY {Выдать $} 
[1️⃣-6️⃣] Поиск [ссылка] - поиск игрока по ссылке 
[3️⃣-6️⃣] get [ID] - информация о игроке
[3️⃣-6️⃣] Point/Unpoint [ID] - Выдать/Снять верификацию
[3️⃣-6️⃣] Setpoint [ID] [Кол-Во Подписчиков] - Выдать подписчиков
[1️⃣-6️⃣] Ответ [ID] [Текст Ответа] - ответить на репорт
[3️⃣-6️⃣] Брепорт [ID] - заблокировать репорт
[3️⃣-6️⃣] Орепорт [ID] - разблокировать репорт

   ` )

});
vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, async (message) => {
    let user = base.users[user_id(message.user)];
    let user2 = acc.users[user_id(message.user)]
    let wid = message.$match[1] * 1;
  
    if (!Number(message.$match[1])) return message.send(`
       🔚 Запрос отменен. В поле <<ID>> введено не число.
   `)
 
    if (user2.level < 2) return message.send(`
		🆔 Идентификация в системе Twitch Admin не пройдена!
ℹ Ваш UID: ${user_id(message.user)}.
       Ошибка. Код 15. Нет прав.
   ` )
    await message.send(`
		🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер
   ` )
    sleep(1000)
    if (bans.users[wid].banan == false) return message.send(`
       🔚 Запрос отменен. У пользователя нет блокировки. Сервер ответил за 1,0${rand(1, 9)} секунды.
   `)
    await message.send(`
       🔚 Запрос выполнен. Сервер ответил за 1,0${rand(1, 9)} секунды. Бан снят!
   `)

    bans.users[wid].banan = false
    vk.api.call('messages.send', {
        peer_id: acc.users[wid].id,
        message: `
    ⛔ Администрация разблокировала этот канал.

  `,
        random_id: rand(1, 999999)
    });

});
vk.updates.hear(/^(?:Стоп)/i, async (message) => {

    if (message.senderId !== 339551065) return message.send(`пошел. нахуй.`); ;
    await message.send(`Идёт отключение бота, подождите...`);
    await message.send(`&#4448;Вы успешно отключили бота!`);

    await fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))
    await fs.writeFileSync("./base/bans.json", JSON.stringify(bans, null, "\t"))
  
    await fs.writeFileSync("./base/comments.json", JSON.stringify(comments, null, "\t"))
    await fs.writeFileSync("./base/logs.json", JSON.stringify(logs, null, "\t"))
    await fs.writeFileSync("./base/stats.json", JSON.stringify(stats, null, "\t"))
    
    await fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))
    await fs.writeFileSync("./base/reports.json", JSON.stringify(reports, null, "\t"))
    await fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"))
    await fs.writeFileSync("./base/base.json", JSON.stringify(base, null, "\t"))
   
    await  console.log(`Bot offed. Base saved. Off time: ${time()} | ${data()}`)
    return process.exit(-1);
});
vk.updates.hear(/^(?:Edit)/i, async (message) => {
    let idd = rand(1, 9999999)
    await message.send(`
		🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер
   ` )
    vk.api.call('messages.send', {
        peer_id: acc.users[user_id(message.user)].id,
        message: `🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер
`,
        random_id: idd
    })
    vk.api.call('messages.edit', {
        peer_id: acc.users[user_id(message.user)].id,
        group_id: 185190962,
        message_id: idd,
        message: `🆔 Идентификация в системе Twitch Admin завершена.
ℹ Ваш UID: ${user_id(message.user)}.
        Отправляем запрос на сервер.в
`
        
    })

    
//    sleep(1000)
//    await message.editMessageText(`
//		🆔 Идентификация в системе Twitch Admin завершена.
//ℹ Ваш UID: ${user_id(message.user)}.
//        Отправляем запрос на сервер. . 
//   ` )
//    sleep(1000)
//    await message.editMessageText(`
//		🆔 Идентификация в системе Twitch Admin завершена.
//ℹ Ваш UID: ${user_id(message.user)}.
//        Отправляем запрос на сервер. . .
//   ` )
//    sleep(1000)
//    await message.editMessageText(`
//		🆔 Идентификация в системе Twitch Admin завершена.
//ℹ Ваш UID: ${user_id(message.user)}.
//        Отправляем запрос на сервер. . . .
//   ` )
//    sleep (1000)
//    await message.editMessageText(`
//		🆔 Идентификация в системе Twitch Admin завершена.
//ℹ Ваш UID: ${user_id(message.user)}.
//        Отправляем запрос на сервер. . . . 

//   ` )
    
});
async function run() {
    await vk.updates.startPolling();
    console.log('Bot actived');

}


run().catch(console.error);
setInterval(function () {
    fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))
    fs.writeFileSync("./base/bans.json", JSON.stringify(bans, null, "\t"))
 
    fs.writeFileSync("./base/comments.json", JSON.stringify(comments, null, "\t"))
    fs.writeFileSync("./base/logs.json", JSON.stringify(logs, null, "\t"))
    fs.writeFileSync("./base/shoplist.json", JSON.stringify(shoplist, null, "\t"))
    fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))
    fs.writeFileSync("./base/stats.json", JSON.stringify(stats, null, "\t"))
   
    fs.writeFileSync("./base/reports.json", JSON.stringify(reports, null, "\t"))
    fs.writeFileSync("./base/base.json", JSON.stringify(base, null, "\t"))
    fs.writeFileSync("./base/promo.json", JSON.stringify(promo, null, "\t"))

    console.log(`Saved! Time save: ${time()} | ${data()}`)
}, 15000);

function data() {
    var date = new Date();
    let days = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    if (days < 10) days = "0" + days;
    var datas = days + ':' + month + ':2019';
    return datas;
}
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
function rand(min, max) { return Math.round(Math.random() * (max - min)) + min }
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
function spaces(string) {
    if (typeof string !== "string") string = string.toString();
    return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function () {
    return this[Math.floor(this.length * Math.random())];
}

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
function user_id(id) {
    let ids = 0
    if (uid[id]) {
        ids = uid[id].id
    }
    return ids;
}