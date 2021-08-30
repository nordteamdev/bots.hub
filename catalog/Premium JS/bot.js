const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs");
const rq = require("prequest");
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const ferm = require("./base/ferm.json");
const config = require("./settings/config.json")
const spam = require("./base/spam.json")
let giving = false;


const jobs = {
	"1": {
		name: 'Лесоруб',
		pay: 500,
		level: 1,
		text: ['срубили дерево', 'отпилили ветку', 'срубили куст', 'нарубили дров']
	},
	"2": {
		name: 'Шахтёр',
		pay: 1000,
		level: 2,
		text: ['начали копать','отправились на добычу золота','отправились на добычу угля','очистили найденную добычу']
	},
	"3": {
		name: 'Грузчик',
		pay: 1500,
		level: 3,
		text: ['разгрузили машину с продуктами','разгрузили овощи','загрузили мусор в машину','отнесли отходы на помойку']
	},
	"4": {
		name: 'Таксист',
		pay: 2500,
		level: 5,
		text: ['подвезли бизнесмена','подвезли мера','подвезли школьника','подвели студента']
	},
	"5": {
		name: 'Инкассатор',
		pay: 4000,
		level: 6,
		text: ['забрали деньги из банка','отвезли деньги в банк','защитили машину от нападения','отправились в дорогу']
	},
	"6": {
		name: 'Дальнобольщик',
		pay: 5500,
		level: 8,
		text: ['отправились в рейс в другой город','подвезли незнакомца за деньги','перегнали несколько фур','продали товар бандитам']
	},
	"7": {
		name: 'Пожарный',
		pay: 6500,
		level: 9,
		text: ['потушили домик у моря','потушили здание Администрации','потушили школу','потушили хату бомжа']
	},
	"8": {
		name: 'Пилот',
		pay: 8000,
		level: 12,
		text: ['полетеле в другой город']
	},
	"9": {
		name: 'Наркодилер',
		pay: 10000,
		level: 16,
		text: ['продали мешок муки','обменяли пакет укропа','продали ... за деньги','избили человека и отняли деньги']
	}
}

var limits = {}

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
//////////////////////
////////////////////

setInterval(function(){
    fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
    fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
    fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
    fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
    fs.writeFileSync("./base/ferm.json", JSON.stringify(ferm, null, "\t"));
}, 3500);

/////////////////////
vk.setOptions({
    token: '7f6cd50efd1ed5f4be9e5d81592fed695562addb8f9d22ec8645b78dd11a914f0edbb89ef302d9eda6924',
    apiMode: 'parallel',
    pollingGroupId: 175039543
});
//////////////////////////////

vk.updates.use(async (message, next) => {   
    if (message.is("message") && message.isOutbox)
        return;
    
    message.user = message.senderId;
    message.text = message.payload.text;  

    if (!message.text) return;
    if(!uid[message.user]){
        acc.number += 1;
        let numm = acc.number;
        uid[message.user] = {
            id: numm
        }
        let id = user_id(message.user);    

            message.send(`🚸 *id${message.user} (хай!), Ты успешно зарегистрирован в ☣Premium Bot, напиши "Помощь"`,
 {
keyboard: JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🤵 Паспорт" 
}, 
"color": "primary" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "💶 Баланс" 
}, 
"color": "primary" 
},
{
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "👤 Профиль" 
}, 
"color": "primary" 
}],
[{
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "☢ Бонус" 
}, 
"color": "negative"
}],
[{
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "💼 База" 
}, 
"color": "positive"
}] 
] 
}) 
});

        acc.users[numm] = {
            balance: 5000,
            level: 0, 
            adm_time: 0,
            clanid: false,
            vozrast: 0,
            hp: 100,
            premium: false,
            premtime: 0,
   			pasport: false,
   			nomerp: 0,
   			seria1: 0,
			seria2: 0,
			seria: 0,
			uplvl: 0,
			energy: 5,
   			golod: 100,
            bitcoin: 0, 
            vip: false,
            viptime: 0,
            donate: 0,
            hack: false,
            wins: 0,
            loses: 0,
            fix: false,
            bloks: { 
                rep: false,
                cases: false,
                bonus: false,
                random_game: false,
                giverub: false,
                a_case: false,
                olig: false,
                pay: false,
                frac: false,
                gun_case: false
            }, 
            ferm: {
                id: false,
                bitcoin: 0,
                count: 0,
                balance: 0,
                bitcoin: 0
            },
            exs: 0,
            exsup: 50,
            lvl: 99999999999,
            gps: 1,
            number: numm,
            bonustime: 0,
            id: message.user,
            nick: true,
            ref: false,
            refs: 0,
            agent: 0,
            verify: false,
            block_top: false,
            game: {
                binlose: 0,
                binwin: 0,
                binstop: false,
                kazlose: 0,
                kazwin: 0,
                rand_lose: 0,
                rand_win: 0,
                stavka_win: 0,
                stavka_lose: 0,
                win: 35,
                strela_loose: 0,
                strela_win: 0
            },
            msg: { 
                messages: 0, 
                last_msg: "" 
            },  
            "bizs": {
                "one_biz": false,
                "one": {
                    "count": false,
                    "balance": 0,
                    "id": false,
                    "name": false,
                    "people": 0,
                    "uplvl": 0,
                    "zp": 0,
                    "stop": false,
                    "max_peop": 0
                },
                "two_biz": false,
                "two": {
                    "count": false,
                    "balance": 0,
                    "id": false,
                    "name": false,
                    "people": 0,
                    "uplvl": 0,
                    "zp": 0,
                    "stop": false,
                    "max_peop": 0
                }
            },
            cars: false,
            moto: false,
            prist: false,
            restoran: false,
            garage: false,
            phone: false,
            reys: false,
            aircraft: false,
            house: false,
            kv: false,
            housep: 0,
            pit: false,
            bank_balance: 0,
            lodka: false,
            pcc: false,
            tag: "Новичок", 
            brak: {
                status: false,
                id: false
            },
            ainfo: {
                all_ans: 0,
                ans: 0, 
                good_ans: 0,
                bad_ans: 0,
                vig: 0
            }, 
            safe: {
                status: false,
                key: false
            },
            admin: {
                block_pay: false,
                block_give: false,
                block_rep: false
            }, 
            rep: {
                status: false,
                id: false
            },
            ban: false, 
            mute: false,
            warn: 0,
            warn_p: [],
            credit: 0,
            procent: 0,
            job: { 
                name: false, 
                lvl: 0, 
                stop: false, 
                count: 0 
            }, 
            global_exs: 0,
            autozp: false,
            frac_name: false,
            duel: false,
            duel_summ: false,
            nachal: false,
            uron: 45,
            gun_name: false,
            block_game: true,
            prefix: `Игрок #${numm}`,
            lvl_v: 1,
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

	vk.api.call('groups.isMember', {
	group_id: 175039543,
	user_id: message.user.id
	}).then(function(res) {
	if(res < 1) return message.send(`❗❗❗❗❗ПОДПИШИСЬ И СООБЩЕНИЕ ИСЧЕЗНЕТ!❗❗\n⛔ Подпишись и этот текст пропадёт\n---------`)
	});

    if(message.text){ 
        acc.msg += 1;
        if(!acc.users[user_id(message.user)]) return;
        acc.users[id].msg.messages += 1;
        acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
        if(acc.users[id].mute == true) return; 
    }
    if(acc.users[id].ban != false) return;
    try {
        await next();
    } catch (err) { console.error(err) }
});

vk.updates.hear(/^(?:eval)\s?([^]+)?/i, (message) => {  
    let user = acc.users[user_id(message.user)];
        if(message.user != 196297755) return;

	try {
		const result = eval(message.$match[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return message.send(`@id${user.id} (${user.prefix}), number: ${result}`);
		} else {
			return message.send(`@id${user.id} (${user.prefix}), ${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return message.send(`@id${user.id} (${user.prefix}), ошибка:
		${e.toString()}`);
	}
 
});

	vk.updates.hear(/^(?:wiki|вики)\s([^]+)/i, message => {
	let cc = message.$match[1].toLowerCase();
	 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if(filter0.test(cc) == true || filter1.test(cc) == true){
			var check = true;
			return message.send(`🆘 ➾ Отказ! | Подозрительная ссылка. |⛔`);

		}else{
    rq.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(message.$match[1])+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
        var data = JSON.parse(b);
        message.reply("🔮 Ответ на ваш запрос. \n\n✏ Ссылка: " + data[3][0]);
    });
	}
	})
//////////////////////
//////////////////////
	vk.updates.hear(/^(?:cc)\s?([^]+)?/i,  message => {
		   let cc = message.$match[1].toLowerCase();
	       let text = message.$match[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 ➾ Короткая ссылка: " + res.short_url);
    });  
});

	 	vk.updates.hear(/^(?:крикнуть)\s?([^]+)?/i,  (message) => { 
		return message.send(`📢  *id${message.user} (${acc.users[user_id(message.user)].prefix}) крикнул: 🔅 ${message.$match[1]} 🔅`);
});
/////////////////////
//////////////////////
vk.updates.hear(/^(?:кубик|куб)\s([1-6])$/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
if(message.$match[1] < 0 || message.$match[1] > 6) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
let int = rand(1,6); 
let win = rand(1000000,5000000) 
if(int == message.$match[1]) 
{ 
user.balance += win; 
return message.send(`😃 Вы угадали!\n➡ Вы получили на свой баланс: ${spaces(win)}$`); 
} else return message.send(`😒 Вы не угадали\n🎲 Число было ${int}`); 
});
////////////////////////
///////////////////////
 	vk.updates.hear(/^(?:ударить)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `👊 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) ударил вас 👊`
		});
 		return message.send(`👊  *id${message.user} (${acc.users[user_id(message.user)].prefix}) ударил игрока @id${id.id}(${id.prefix}) 👊`);
 	});
/////////////////////
vk.updates.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, (message) => { 
const result = eval(`${message.match$[1]} ${message.args[2]} ${message.match$[3]}`); 
message.send(`${message.match$[1]} ${message.match$[2]} ${message.match$[3]}=${result}`); 
});
///////////////////////
////////////////////////
 	vk.updates.hear(/^(?:поцеловать)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `💋 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) поцеловал вас 💋`
		});
 		return message.send(`💋  *id${message.user} (${acc.users[user_id(message.user)].prefix}) поцеловал игрока @id${id.id}(${id.prefix}) 💋`);
 	});
///////////////////////
vk.updates.hear(/^(?:переверни)\s([^]+)/i, (message) => {
	let text = ``;
	message.$match[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return message.send(`↪ Держи : "${text.split('').reverse().join('')}"`)
});
///////////////////////
 	vk.updates.hear(/^(?:обнять)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `🤗 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) обнял вас 🤗`
		});
 		return message.send(`🤗 *id${message.user} (${acc.users[user_id(message.user)].prefix}) обнял игрока @id${id.id}(${id.prefix}) 🤗`);
 	});

vk.updates.hear(/^(?:помощь)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`🔯 Выберите категорию :

✳Основные [➕]
💼База [➕]
🎮Игры [➕]
💸Донат [➕]
🔱Развлекательные [➕]
========================
⛔Репорт [жалоба] [TEXT]
        `)
});

vk.updates.hear(/^(?:донат)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`

☢DONATE☢ 
=|=|=|=|=|=|=|=|=|
❗ Разбан
💼 Буст
🔱 Привилегии
=|=|=|=|=|=|=|=|=|

✏Писать по поводу покупки - @nodejs_coder(ему)
        `)
});

vk.updates.hear(/^(?:разбан)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`

❗ Стоимость разбана 50Р

✏Писать по поводу покупки - @nodejs_coder(ему)
        `)
});

vk.updates.hear(/^(?:буст)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`

❗ автосбор прибыли с бизов - 100Р

❗ валюта - 1.000.000.000$ = 3 рубля

✏Писать по поводу покупки - @nodejs_coder(ему)
        `)
});

vk.updates.hear(/^(?:привилегии)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`

VIP - 150Р навсегда
PREMIUM - 350Р навсегда
ADMIN - 500Р навсегда

✏Писать по поводу покупки - @nodejs_coder(ему)
        `)
});

vk.updates.hear(/^(?:аправила)$/i, async (message, bot) => {

	let user = acc.users[user_id(message.user)];
    if(user.level < 1) return message.send(`🔸 » Вы не VIP-ДОСТУП`);
	return message.send(`
	🌍 Актуальный список правил 'PREMIUM_BOT' бота [🌍] 
			💎 для АДМИНИСТРАТОРОВ И VIP 💎

	[🚀] 1. Хамство в ответе на репорт. [Выговор] 
	[🚀] 2. Неадекватные ответы на репорт. ['Молчанка' 120мин] 
	[🚀] 3. Накрутка ответов на репорт. [Выговор] 
	[🚀] 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
	[🚀] 5. Обман спец.администрации. [Бан] 
	[🚀] 6. Выдача наказания без определённой причины. [Выговор] 
	[🚀] 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
	[🚀] 8. Слив какой-либо административной информации. [Бан] 
	[🚀] 9. Ражигание любых конфликтов между игроками. ['Молчанка' 240мин]
	[🚀] 10. Выдача/передача администраторами валюты. [Бан]`);
});

	vk.updates.hear(/^(?:выбери)\s?([^]+)\s?или\s?([^]+)?/i,  (message) => { 
 		return message.send(`⚖ *id${message.user} (${acc.users[user_id(message.user)].prefix}), я выбираю ${[`[${message.$match[1]}]`,`[${message.$match[2]}]`].random()}`);
 	});
///////////////////////
///////////////////////
///////////////////////
 	vk.updates.hear(/^(?:бот)/i,  (message) => { 
 		message.sendSticker(12896);
 	});
///////////////////////
 	vk.updates.hear(/^(?:шанс)\s?([^]+)\s?([^]+)?/i,  (message) => { 
	let chance = rand(1,100);
 		return message.reply(`*id${message.user} (${acc.users[user_id(message.user)].prefix}), 📊  Шанс ${message.$match[1]} равен: ${chance}%`);
 	});
///////////////////////
	vk.updates.hear(/^(?:когда)\s?([^]+)\s?([^]+)?/i,  (message) => { 
	let year = rand(1,100);
	let hours = rand(1,24);
	let min = rand(1,60);
	let sec = rand(1,60);
 		return message.reply(`✨ *id${message.user} (${acc.users[user_id(message.user)].prefix}), ${[`через ${min} минут`,`никогда`,`сам не знаю`,`Думаю через ${hours} часов`,`через ${year} лет`,`через ${sec} секунд`,`прямо сейчас`].random()}`);
 	});
///////////////////////
	vk.updates.hear(/^(?:шар)\s?([^]+)\s?([^]+)?/i,  (message) => { 
 		return message.send(`🔮 *id${message.user} (${acc.users[user_id(message.user)].prefix}), ${[`думаю "Да"`,`бесспорно`,`лучше не рассказывать.`,`конечно (Нет)`,`не может такого быть!`,`предрешено =)`,`не могу предсказать`,`пока не ясно`,`хорошие перспективы`,`сейчас нельзя предсказать`,`весьма сомнительно`,`мой ответ - "нет"`,`определённо да`,`Соберись и повтори вопрос`,`да`,`мне кажется - "Да"`].random()}`);
 	});
///////////////////////
	vk.updates.hear(/^(?:rstl)\s([^]+)/i, (message) => {  
	        let text = message.$match[1]
		message.send(`${text.split("").map(x=>x.toUpperCase()).join(" ")}`);
		
	});
//////////////////////
///////////////////////
 vk.updates.hear(/^(?:кости)\s([0-9]+)/i, (message) => {
     let user = acc.users[user_id(message.user)];
     if(!message.$match[1])	return message.send(`⚠ Укажите ставку! "Кости [ставка]"`);
     if (message.$match[1] > user.balance) return message.send(`⚠ Недостаточно средств`); 
     if(!Number(message.$match[1])) return message.send(`❗Ставка должна быть числового вида!`);
     let summ = Number(message.$match[1]);
     let im = rand(1,6);
     let you = rand(1,6);
     if (im < you) {
	user.loses += summ;
         user.balance -= summ;
         return message.send(`👎 Ты проиграл ${spaces(summ)}💲\n🔹Тебе выпало [${im}]\n🔺Мне выпало [${you}]\n💰Твой баланс: ${spaces(user.balance)}`);
     } else if(im == you) {
         return message.send(`🤝 У нас ничья =)\n💰Твой баланс: ${spaces(user.balance)}💲`);
     } else if(im > you) {
	user.wins += summ;
         user.balance += summ;
         return message.send(`🎉 Ого, ты выиграл ${spaces(summ)}!\n🔹Тебе выпало ${im}\n🔺Мне выпало ${you}\n💰Твой баланс: ${spaces(user.balance)}💲`);
     }
 });
/////////////////////////////////
  	vk.updates.hear(/^(?:стаканчик)\s([0-9]+)\s([0-9]+)/i, message => { 
		let user = acc.users[user_id(message.user)]; 
	if(!Number(message.$match[2])) return message.send(`⚠ Ставка должна быть числового вида!`);
	if(message.$match[1] > 3 || message.$match[1] < 1) return message.send(`⚠ Укажие номер стаканчика "Стканчик [1-3] [ставка]"`);
	if(user.balance < message.$match[2]) return message.send(`⚠ Ставка не должна превышать баланс или быть меньше 1$`);
	let summ = Number(message.$match[2]);

	let q = rand(1,3);
	
if(q == message.$match[1]) {
	user.wins += summ;
user.balance += summ;
	return message.send(`🎉 Вы угадали стаканчик!\n😃Вы выиграли ${spaces(summ)}$\n💰 Ваш баланс: ${spaces(user.balance)}$`);
}else{ 
	user.loses += summ;
user.balance -= summ;
return message.send(`👎 Вы не угадали стаканчик и проиграли ${spaces(summ)}$\n☝ Правильный стаканчик был ${q}!\n💰 Ваш баланс: ${spaces(user.balance)}$`);
	}
});

vk.updates.hear(/^(?:правила)$/i, async (message, bot) => {

	return message.send(`
	[🌍] Актуальный список правил '☣Premium' бота [🌍] 
		[💎] Для бесед/чатов с ботом [💎] 

		[🌍] Наказание: Бан || Предупреждение. 
		  [🚀] 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
		  [🚀] 2. Мат/оскорбления в репорт. 
		  [🚀] 3. Оскорбление проекта.  
		  [🚀] 4. Обман администрации/игроков.

		[🌍] Наказание: 'Молчанка'(60-240) минут || Предупреждение
		 [🚀] 5. Оскорбление чувств игрока(ов).  
		 [🚀] 6. Флуд/оффтоп в репорт.  
		 [🚀] 7. Выдача себя за ADMIN/MODER/VIP. 
		 [🚀] 8. Использование неадекватных ников. 
	     [🚀] 9. 


		[🌍] Наказание: Бан || Предупреждение. 
		 [🚀] 10. Использование БАГов, скрытие их от @nodejs_coder(Создателя)
		 [🚀] 11. Распространение шок контента, контента 18+ и тд. 
		 [🚀] 12. Накрутка любых игровых средств с фейковых аккаунтов. 
		 [🚀] 13. Использование фейк аккаунта. 
		 [🚀] 14. Пиар/реклама/выпрашивание лайков и т.д. 
		 [🚀] 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек) `);
});

	vk.updates.hear(/^(?:купить)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];
 		let bits = acc.bit
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑  Укажите количество PREMIUM coin.`);
		if(user.balance < message.$match[1] * bits) return message.send(`⚠ Для покупки ${message.$match[1]}💳 нужно ${message.$match[1] * bits}`)
		user.balance -= Number(message.$match[1] * bits);
		user.bitcoin += Number(message.$match[1]);
		return message.send(`🔋  Вы успешно купили ${message.$match[1]} PREMIUM coin`);
	});

vk.updates.hear(/^(?:развлекательные)$/i, (message) => {
	   let user = acc.users[user_id(message.user)];
    return message.send(`
  📏 cc [ссылка] - скоротить ссылку
  📊 Шанс [событие] 
  🔮 Шар [фраза] 
  ↪ Переверни [слово] 
  ⚖ Выбери [фраза1] или [фраза2] 
  ✨ Когда [фраза] 
  🔢 Реши [Пример]`)
});

	vk.updates.hear(/^(?:монетка)\s?([^]+)?\s([^\s	].*)/i,  message => {
		if(!message.$match[1]) return message.send(`⚠ Монетка [орел/решка] [ставка]`) 
		let amount = parserInt(message.$match[2]); 
		amount = Math.round(amount); 
		let id = user_id(message.user) 
		if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`); 
		let user = acc.users[user_id(message.user)]; 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`⚠Ставка не может превышать баланс или быть ниже 1$`); 
		if(user.block_game == true && user.level < 2){ 
		if (amount > 500000) return message.send(`⚠ Ставка не должна быть больше 500.000$`); 
		}
		 	if(message.$match[1].toLowerCase() == 'орел'){
				if(rand(1,2) == 1){ 
					let i = "🔸 Вам попался орёл"
					user.wins += amount;
					user.balance += amount;
						return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}else{
					let i = "🔹 Вам попалась решка"
					user.loses += amount;
					user.balance -= amount;
					return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
				}
			}
			if(message.$match[1].toLowerCase() == 'решка'){ 
				if(rand(1,2) == 1){ 
					let i = "🔹 Вам попалась решка"
					user.wins += amount;
					user.balance += amount;

						return message.reply(`${i} \n✔ Вы выиграли ${spaces(amount)}$`);
				}else{ 
					let i = "🔸 Вам попался орёл"
					user.loses += amount;
					user.balance -= amount;
					return message.reply(`${i} \n✖ Вы проиграли ${spaces(amount)}$`);
				}
			}
	});

vk.updates.hear(/^(?:pay|передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1] || !message.$match[2]) return message.send(` 👉 Пример команды: передать ID СУММА`) 
		let user = acc.users[user_id(message.user)]; 
			if(user.admin.block_pay == true) return message.send(`🔸У вас заблокированы переводы денег.`) 

		if(user.level < 1){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 5000000) return message.send(`💴 Максимальная сумма передачи 5.000.000$`) 
			} 
		if(user.level == 1){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 7000000) return message.send(`💴 Максимальная сумма передачи 7.000.000$`) 
			} 
		if(user.level == 2){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 10000000) return message.send(`💴 Максимальная сумма передачи 10.000.000$`) 
			} 
		if(user.level == 3){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 20000000) return message.send(`💴 Максимальная сумма передачи 20.000.000$`) 
			}
		if(user.level == 4){ 
			if(user.bloks.pay == true) return message.send(`🔸Передавать валюту можно раз в 10 минут.`) 
			if(message.$match[2] > 100000000) return message.send(`💴 Максимальная сумма передачи 100.000.000$`) 
			}
		if(user.level > 4){}
 
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(message.$match[2] > user.balance) return message.send(`👉 У вас нет столько $`);
	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 	
 	user.bloks.pay = true; 
		setTimeout(() => {
			user.bloks.pay = false;
	}, 600000);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]}$ `
	 });	
	return message.send(`💴 Вы успешно перевели ${acc.users[message.$match[1]].prefix}  ${message.$match[2]}$.`);
});
///////////////////////////
vk.updates.hear(/^(?:ppay)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 У вас заблокированы передача валюты.`)  
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 Пример команды: spay ID СУММА`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 Некорректно введены данные`)
	if(message.$match[2] > user.bitcoin) return message.send(`👉 У вас нет столько Simcoins`);
	user.bitcoin -= Number(message.$match[2]);
	acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: ` 💴 Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} simcoins | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 Вы успешно перевели ${acc.users[message.$match[1]].prefix} ${message.$match[2]} simcoins.`);
});

vk.updates.hear(/^(?:🔱 Основные|@vrbotofficial 🔱 Основные|основные)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`
🔱Основные команды [➕]

✅ Verify - Список Подтверждённых аккаунтов. 
📈 Курс - Курс PREMIUM coin. 
🔝 топ - топ игроков 
🛒 Магазин 
🏤 Бизнесы 
🤝 Передать [ID] [СУММА] - передача валюты. 
📋 Профиль - Ваш профиль. 
📖 О боте - Информация о боте. 
🔥 Правила - Правила бота 🔥 
📋 Профиль - Ваш профиль. 
🤵 Паспорт - информация о паспорте.
🚸 volkov - cmd глав админа
🚸 Панель - панель администратора
👨‍💼 Книжка - информация о работе`)
});

vk.updates.hear(/^(?:🎮 Игры |@vrbotofficial 🎮 Игры|игры)$/i, (message) => {
    let user = acc.users[user_id(message.user)];
    return message.send(`
🎮 Игры 
  🎭 Казино [ставка]. 
  🎲 Куб [1 - 6]
  🥛 Стаканчик [1-3] [ставка] 
  💿 Монетка [орел/решка] [ставка] 
  🔑 Сейф - Взлом сейфа. 
  🎫 Лотерея - Счастливый билетик. `)
    });

vk.updates.hear(/^(?:раздача)$/i, async(message, bot) => {
	let user = acc.users[user_id(message.user)];
if (user.level < 5) return bot(`доступно с привилегии - Гл.Администратор`);
if (giving) return bot(`повторите попытку чуть позже (error)`);
giving = true;
user.api.wall.post({
owner_id: -175039543,
message: ` 
👑 Сделай репост данной записи и получи 10.000.000.000Р на счёт в течение ЧАСА!
🙀 Деньги выдаются автоматически!
⛔ Успей сделать репост в ТЕЧЕНИЕ 12 ЧАСОВ, иначе деньги не будут начислены!
 ❗  Включи уведомления о записях, чтобы не пропустить раздачу!
P.S. *Деньги бадут начислены по окончанию акции*`,
attachments: 'photo-496175718_456240409'
}).then((response) => {
user.api.wall.openComments({
owner_id: -175039543,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -175039543,
post_id: response.post_id,
from_group: 175039543,
message: '* Коины будут выданы по окончанию акции, ваш профиль VK должен быть открыт, а то мы не увидим Ваш репост.'
});
setTimeout(() => {
user.api.call('wall.getReposts', {
owner_id: -175039543,
post_id: response.post_id,
count: 1000
}).then((res) => {
res.items.map(x => {
if (x.from_id < 0) return;
let user = users.find(a => a.id === x.from_id);
if (!user) return;
user.balance += 10000000000;
vk.api.messages.send({
user_id: user.id,
message: `\n\n[id${user.id}|${user.tag}], спасибо за участие в нашей раздаче! Вы получили +${utils.sp(10000000000)}$, поэтому ваш баланс составляет сейчас - ${user.balance}$! \n\nС уважением,\nВаш виртуальный помощник VR_BOT`
});
vk.api.messages.send({
user_id: 496175718,
message: `В раздаче учавствовали ([id${user.id}|${user.tag}])\n\nНа данный момент, его баланс составляет:\n${user.balance}$`
})
});
});
user.api.wall.openComments({
owner_id: -175039543,
post_id: response.post_id
});
user.api.wall.createComment({
owner_id: -175039543,
post_id: response.post_id,
from_group: 175039543,
message: 'Сейчас конец раздачи!'
});
user.api.wall.createComment({
owner_id: -175039543,
post_id: response.post_id,
from_group: 175039543,
message: 'ВСЁ! Раздача закончена!'
});
user.api.wall.closeComments({
owner_id: -175039543,
post_id: response.post_id
});
giving = false;
}, 43200000);
});
});

vk.updates.hear(/^(?:реф)\s(?:инфо)$/i, message => {
	let user = acc.users[user_id(message.user)];
	return message.send(`🤵Чтобы вам засчитали приглашённого друга в бота, другу нужно ввести - "реф ${user_id(message.user)}"
=======================================
❓Что получаете вы?

➕Вы получаете 5 рублей , которые вы можете потратить на валюту/админку в нашем боте! (подробнее о покупках в "донат")
=======================================
❓ Что получает выш друг?

➕Ваш друг получает 5.000.000.000$ на свой баланс.`);
});

vk.updates.hear(/^(?:реф|реферал)\s([0-9]+)$/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.$match[1] == user_id(message.user)) return message.send(`вы ввели свой ID!)`)
	if(!message.$match[1]) return message.send(`Укажите ID игрока, который вас пригласил.`);
	if(user.ref) return message.send(`Вы уже активировали реферальную систему.`)
	
	user.ref = message.$match[1]
	acc.users[message.$match[1]].refs += 1

	acc.users[message.$match[1]].donate += 5
	user.balance += 5000000000

	vk.api.call('messages.send', { user_id: acc.users[message.$match[1]].id, message: `👪 Спасибо за приглашение вашего друга в Premium bot!
	❗ На ваш донат счёт было зачислено 5 рублей.` });
	return message.send(`*id${user.id} (${user.prefix}), вы активировали реферал.
	💲 Вам начислено 5.000.000.000$`);
});
//////

	vk.updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];
		if (user.safe.status == true) return message.send(` 🔑  Взломать сейф можно раз в 10 минут.`);
		if (user.safe.status == false) return;
		if (!message.$match[1]) return message.send(`🗝  Укажите код к сейфу.`);
		if (message.$match[1] > 9999) return message.send(`🗝  Код - состоит из 4 одинаковых символов.`);
		if (message.$match[1] < 0) return message.send(`🗝  Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(message.$match[1]);
		let haha = rand(10000,500000);
		if (kod == user.safe.key) { 
			let summ = rand(20000000,50000000);
			user.balance += summ; 
			user.safe.key = false; 
			user.safe.status = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000);
			return message.send(`🤑  Невероятно!\n🙊  Вы смогли угадать код\n🏛  Обыскивая сейф вы нашли:\n💴  ${spaces(summ)}$`);
		} else {
			user.safe.status = true;
			user.safe.key = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000); 
		}
			user.balance -= haha;
			return message.send(`🤠  Вы не угадали код.\n🤠  Вас оштрафовали на ${spaces(haha)}$\n🔑  Верный код был: ${nu}`);	
	});

vk.updates.hear(/^(?:сейф)/i, (message) => { 
 		let user = acc.users[user_id(message.user)]; 	 
		if (user.safe.status != false) return message.send(`🔑  Взломать сейф можно раз в 10 минут.`);	 
		if (user.safe.status == 3) return;
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
		  🏛  Вы начали взлом сейфа 🏛
		  🔑  Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝  Начать взлом: "Взлом [код]"
		  🌚  Удачи!
		 
  `);
	});

vk.updates.hear(/^(?:кубик|куб)\s([1-6])$/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(!message.$match[1]) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
if(message.$match[1] < 0 || message.$match[1] > 6) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`); 
let int = rand(1,6); 
let win = rand(1000000,5000000) 
if(int == message.$match[1]) 
{ 
user.balance += win; 
return message.send(`😃 Вы угадали!\n➡ Вы получили на свой баланс: ${spaces(win)}$`); 
} else return message.send(`😒 Вы не угадали\n🎲 Число было ${int}`); 
});

////////////////////рассылки//////////////////////
vk.updates.hear(/^(?:all)\s?([^]+)?/i,  message => { 
    if(acc.users[user_id(message.user)].level < 5) return;
    for(i in acc.users){
        vk.api.call('messages.send', {
            user_id: acc.users[i].id,
            message: `🔥 ${message.$match[1]}`
        });
    }
    return message.send(`Сообщения отправлены!`);
});
//////////////////////
vk.updates.hear(/^(?:postall)\s?([^]+)?/i,  message => { 
    if(acc.users[user_id(message.user)].level < 5) return;
    for(i in acc.users){
        vk.api.call('messages.send', {
            user_id: acc.users[i].id,
            message: ``,
            attachment: `${message.$match[1]}`
        });
    }
    return message.send(`Посты отправлены!`);
});
///////////////////////////
vk.updates.hear(/^(?:сообщение)\s?([0-9]+)\s?([^]+)?/i,  message => { 
    if(message.$match[1] == 1) return message.send(`Запрещено!`);
        vk.api.call('messages.send', {
            user_id: acc.users[message.$match[1]].id,
            message: `💡 Сообщение от игрока *id${message.user} (${acc.users[user_id(message.user)].prefix})\n📨: ${message.$match[2]}`
        });
    return message.send(`Сообщение отправлено!`);
});
 ////////////////////////////
vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => {   
    if(message.$match[3]){
        var id = user_id(message.$match[3]);
        if(!acc.users[id]) return message.send(`❗ ERROR ❗`);  
        return message.send(`
            Игрок: ${acc.users[id].prefix}
            ID: ${id}
                Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
        `);
    }else{ 
        if(!message.$match[4]) return message.send(`Укажите данные`);
        var domain = message.$match[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.$match[4]
        }).then((res) => { 
            var id = user_id(res.object_id);
            if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
            return message.send(`
                Игрок: ${acc.users[id].prefix}
                ID: ${id}
                    Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "ВИП").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
                `);
        })
        return;
    }
 
});
///////////////////////////
vk.updates.hear(/^(?:sostav)/i, message => {  
        let admins, moders, vips, chat; 
        let devels = ``;
        admins = '\n▪Модераторы▪\n'
        moders = '\n▪Премиум▪\n'; 
        vips = '\n▪Вип▪\n'; 
        for (let id in acc.users) {
            if(acc.users[id]){
            let user = acc.users[id];

            if (user.level == 3) admins += `&#8195;🔱 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
            if (user.level == 2) moders += `&#8195;💎  @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
            if (user.level == 1) vips += `&#8195;🔹  @id${acc.users[id].id}(${acc.users[id].prefix}) [ID: ${id}]\n`; 
            }
        }
        let text = `\n`;
        if (admins.length != 24) text += admins;  
        if (moders.length != 24) text += moders;  
        if (vips.length != 24) text += vips; 
        return message.send(`${text}`);
    });

vk.updates.hear(/^(?:тех поддержка)/i, message => {  
		if(acc.users[user_id(message.user)].level < 5) return;
		let agt; 
		agt = 'Агенты поддержки: \n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.agent == 2) agt += `&#8195;🆘 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

			}
		}
		let text = `\n`;
		if (agt.length != 24) text += agt;
		return message.send(`${text}`);
	});

vk.updates.hear(/^(?:хочу админку)$/i, async message => {
	let text = await vk.api.call('utils.getShortLink', { url:`https://qiwi.com/payment/form/99?extra[%27account%27]=+79064523920&amountInteger=100&amountFraction=0&extra[%27comment%27]=vk.com/id${message.senderId}&currency=643&blocked[1]=account&blocked[2]=comment` });
	message.reply(`${message.user.admin ? `a` : 'ссылка на оплату: ' + text.short_url  + '\n\nК оплате: 100 рублей\nСпособ оплаты: QIWI/Банковская карта'}`);
  
  });

vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {

	let smilelose = ['😩','😕','😦','😵','😟','😔','😩','😿'].random(); 
    let smilewin = ['😄','😁','😊','😃','😉','😜','😋','🤗','🙂','🙃','😌','🤤','😇','🤪','😈','😸','😼','😺','😎'].random();

        if(!message.$match[1]) return message.send(`⚠ укажите ставку`); 
let amount = Number(parserInt(message.$match[1])); 
amount = Math.round(amount); 
let user = acc.users[user_id(message.user)]; 
if (amount > user.balance || amount < 1 ) return message.send(`⚠ Ваш баланс = 0`); 
if(user.block_game == true && user.level < 2){ 
if (amount > 500000000000 && amount != user.balance) return message.send(`❗ Максимальная ставка 500.000.000.000$`);
 	}
	if(message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё'){ 
	if (user.balance < 1 ) return message.send(`⚠ Ваш баланс = 0`); 
	amount = user.balance; 
}else{ 
	let amount = parserInt(message.$match[1]); 
	}
if(!Number(amount)) return message.send(`⚠ Ставка должна быть числом!`); 

	let loser = [0.5,1,1.5].random();
	let mnojitel = [0.5,1,1.5,2,5].random();
	let win = ['🌚|🌚|🌚','🔸|🔸|🔸'].random();
	let lose = [' 🌚|🎉|🔸','🔸|🎉|🔸'].random();
 
      if(rand(1,2) == 2){
	user.wins += amount;
            let balance = amount;
            let win_balance = amount * mnojitel;
            win_balance = Math.round(win_balance)
            user.balance += Number(win_balance)
            return message.send(`${smilewin} Вы выиграли ${win_balance}$ (${mnojitel}x)`); 
}else{ 
user.loses += amount;
user.balance -= amount; 
return message.send(`${smilelose} Вы проиграли ${amount}$ `);
	}
   }); 
///////////////////////
vk.updates.hear(/^(?:verify)/i, message => {  
        let ver; 
        ver = 'Подтверждённые аккаунты: \n\n'; 
        for (let id in acc.users) {
            if(acc.users[id]){
            let user = acc.users[id];
 
            if (user.verify == true) ver += `&#8195;✅ @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

            }
        }
        let text = `\n`;
        if (ver.length != 24) text += ver;
        return message.send(`${text}`);
    });
//////////////////////
///////////////////////
///////////////////////
vk.updates.hear(/^(?:agents)/i, message => {  
        if(acc.users[user_id(message.user)].level < 5) return;
        let agt; 
        agt = 'Агенты поддержки: \n\n'; 
        for (let id in acc.users) {
            if(acc.users[id]){
            let user = acc.users[id];
 
            if (user.agent == 2) agt += `&#8195;🆘 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

            }
        }
        let text = `\n`;
        if (agt.length != 24) text += agt;
        return message.send(`${text}`);
    });

vk.updates.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
    let user = acc.users[user_id(message.user)];
    if(message.$from.type == 'user') return message.send(`⚠ Команда работает только в беседах!`);
    if(user.level < 3) return message.send(`⚠ Доступно только статусу ☣Premium.`);

    if(message.$match[4]) { 
        var domain = message.$match[4].split(" "); 
        vk.api.call("utils.resolveScreenName", { 
        screen_name: message.$match[4] 
    }).then((res) => { 
            if(res.object_id == 431700529) return message.reply('⚠ Отказ'); 

            if(acc.users[user_id(res.object_id)]){
                if(acc.users[user_id(res.object_id)].level > 2) return message.send(`⚠ Нельзя кикнуть этого игрока!`);
            } 

            vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
            .catch((error) => {return message.send(`⚠ Ошибка. Возможные причины:\n⚠ В данной беседе группа не Администратор\n⚠Такого игрока нет в беседе.`);
            });  
            return  
        })  
    }else{
        if(!message.$match[3]) return message.reply("⚠ ID не указан, либо указан неверно."); 
        if(message.$match[3] == 431700529) return message.reply('⚠ Отказ'); 

        if(acc.users[user_id(message.$match[3])]){
            if(acc.users[user_id(message.$match[3])].level > 2) return message.send(`⚠ Нельзя кикнуть этого игрока!`);
        }

        vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
        catch((error) => {return message.send(`⚠ Ошибка. Возможные причины:\n⚠ ➾ В данной беседе группа не Администратор\n⚠Такого игрока нет в беседе.`);}); 

        return                  
    } 
});
////////////////////////
vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let ids = message.$match[1]
	let args = message.$match[1];

	if(message.$match[1] == 1) return message.send(`😵 Ошибка: На ваш баланс было зачислено: ${rand(1,30)}.${rand(201,821)}.${rand(403,959)}.${rand(103,999)}.${rand(303,999)}$ 😱😱`); // Наебка))
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Передать [ID] [Сумма].`);
	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к передачи средств`)
	if(user.level > 2) return message.send(`💰 @id${user.id}(${user.prefix}), Администрации запрещено передавать валюту.`)   
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	if(message.$match[2] > user.balance) return message.send(`@id${user.id}(${user.prefix}), недостаточно денег 😩\n 💰 Баланс: ${user.balance}$`);

	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `[УВЕДОМЛЕНИЕ]\n @id${id} (${user.prefix}) перевел вам ${message.$match[2]}$!\n В ${time()} по Московскому времени.`
	}).then((res) => {}).catch((error) => {console.log('[Система]: Сергей! Я обнаружил ошибку в системе: Перевод денежных средств в команде "передать"'); });	
	return message.send(`@id${user.id}(${user.prefix}),  вы передали игроку ${acc.users[message.$match[1]].prefix} ${message.$match[2]}$. 😉`);
});
///////////////////////////
vk.updates.hear(/^(?:spay)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
    let user = acc.users[user_id(message.user)];
    if(user.admin.block_pay == true) return message.send(`🔸 У вас заблокированы передача валюты.`)  
    let id = user_id(message.user)
    let ids = message.$match[1]
    if(!message.$match[1] || !message.$match[2]) return message.send(`👉 Пример команды: spay ID СУММА`)
    if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
    if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 Некорректно введены данные`)
    if(message.$match[2] > user.bitcoin) return message.send(`👉 У вас нет столько Simcoins`);
    user.bitcoin -= Number(message.$match[2]);
    acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
    logs(user_id(message.user), ids, message.$match[2], type = 1)
 
    vk.api.call("messages.send", {
        peer_id: acc.users[message.$match[1]].id,
        message: ` 💴 Игрок [ID: ${id}] ${user.prefix} перевел вам ${message.$match[2]} simcoins | В ${time()}`
    }).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); }); 
    return message.send(`💴 Вы успешно перевели ${acc.users[message.$match[1]].prefix} ${message.$match[2]} simcoins.`);
});
/////// Банк////////////////////
 vk.updates.hear(/^(?:банк пополнить)\s?([0-9]+)?/i,  (message) => {  
    let user = acc.users[user_id(message.user)];
    let id = user_id(message.user)
    if(!message.$match[1]) return message.send(`👉 Пример команды: Банк пополнить [Сумма]`)
    if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
    if(message.$match[1] > user.balance) return message.send(`👉 У вас нет столько Денег.`);
    if(message.$match[1] < 100000) return message.send(`👉 Минимальная сумма вклада 100.000$`);
    if(message.$match[1] > 2000000000) return message.send(`👉 Нельзя положить больше 2.000.000.000$`);
    if(message.$match[1] > 2000000000) return message.send(`👉 Нельзя положить больше 2.000.000.000$`);
    if(user.bank_balance > 1999999999) return message.send(`👉 Максимальная сумма в банке 2.000.000.000$`)
    user.balance -= Number(message.$match[1]);
    user.bank_balance += Number(message.$match[1]);

    return message.send(` 💴 Вы успешно положили в банк -> ${message.$match[1]}$.`);
}); 
/////////////////////
vk.updates.hear(/^(?:банк снять)\s?([0-9]+)?/i,  (message) => {  
    let user = acc.users[user_id(message.user)];
    let id = user_id(message.user)
    if(!message.$match[1]) return message.send(`👉 Пример команды: Банк снять [Сумма]`)
    if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
    if(message.$match[1] > user.bank_balance) return message.send(`👉 В банке нету столько`);
    user.bank_balance -= Number(message.$match[1]);
    user.balance += Number(message.$match[1]);
    
    return message.send(`💴 Вы успешно сняли с банка ${message.$match[1]}$.`);
});
////////////////////////
vk.updates.hear(/^(?:бизнес снять)\s?([0-9]+)?/i,  (message) => {  
    let user = acc.users[user_id(message.user)];
    let id = user_id(message.user)
    if(!message.$match[1]) return message.send(`👉 Пример команды: Бизнес снять [Сумма]`)
    if(!Number(message.$match[1])) return message.send(`👉 СУММА должна быть числового вида.`)
    if(user.bizs.one.balance < message.$match[1]) return message.send(`👉 На счету бизнеса нет столько`);
    user.bizs.one.balance -= Number(message.$match[1]);
    user.balance += Number(message.$match[1]);
    
    return message.send(`💴 Вы успешно сняли с бизнеса ${message.$match[1]}$.`);
});

vk.updates.hear(/(?:профиль|👤 Профиль|@vrbotofficial 👤 Профиль|проф|прф)/i, async (message) => {
    let pc = [0, 'Morex CASO-25 60W','Zalman Z1 Black','NUDT TH MPP','Cray PC 16 core','Hopper - Cray XE6','Pleiades - SGI ICE X','Lindgren - Cray XE6']     ;
        let mt = [0, 'Honda CBR1000RR Fireblade','Kawasaki KXF','Harley-Davidson Fat Boy','Lightning LS-218','Honda CB500F','Harley-Davidson Road Glide','Yamaha R1','Suzuki Hayabusa','Honda VFR1200X Crosstourer','Aprilia RS 125'];
    let grg = [0, 'Контейнер ','Деревянный гараж','Во дворе','Ангар','Автостоянка','В белом доме Путина'] ;
    let pt = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова'];
        let pr = [0, 'Atari 2600','Nes (Aka Dendy)','Sega Genesis','Nintendo Snes','Sony Playstation','Nintendo 64','Sony Playstation-2','Microsoft XBOX 360','Sony Playstation-3','Nintendo Wii'];
        let cars =[0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX'];
        let yah = [0, 'Ванна','Nauticat 331','Nordhavn 56 MS','Princess 60','Dominator 40M','Moonen 124','Wider 150','Porsche Cayenne','Palmer Johnson 42M SuperSport','Wider 165'];
        let kv = [0,'Чердак','Квартира в общежитии','Однокомнатная квартира','Двухкомнатная квартира','Четырехкомнатная квартира','Квартира в центре Москвы','Двухуровневая квартира','Квартира с Евроремонтом'] ;
        let ph = [0,'Nokia 108','Nokia 3310 (2017)','ASUS ZenFone 4','BQ Aquaris X','Sony Xperia XA','Samsung Galaxy S8','Xiaomi Mi Mix','Torex FS1','iPhone X','Мегафон С1'] ;
    let air = [0, 'Параплан ','АН-2','Cessna-172E','Supermarine Spitfire','BRM NG-5','Cessna T210'];
    let gen = [0, 'JSGEN-4000']
    let pref = [0, 'Яичко','ФиФа','Бомжик','НяШкА','УбийцА','🔱Butterfly🔱','♥LOVE♥','💢DEBUG💢','👥DELETED👥','💠ADMIN💠']
    let user = acc.users[user_id(message.user)];
    let id = user_id(message.user);
    let e = (user.vip == 0 ? `⚡ Энергия: ${user.energy}/5\n` : `⚡ Энергия: ${user.energy}/10\n`)
    var vip = (user.vip === false) ? "💸 ВипСтатус: не включен" : `💸 ВипСтатус: Включён || Конец через ${unixStampLeft(user.viptime - Date.now())}`;
     var premium = (user.premium === false) ? "☣Premium Статус: не включён" : `☣Premium Статус: Включён || Конец через ${unixStampLeft(user.premtime - Date.now())}`;

    let warn_p = '';
    for(i=0;i<user.warn_p.length;i++){warn_p += `&#8195;❗  ${user.warn_p[i]}\n`}
    if(!message.$match[1]){
        return message.send(`
        `+(user.fix === false ? `` : `[${user.fix}]`)+` *id${message.user} (${acc.users[user_id(message.user)].prefix}), ваш профиль:
        🛡 ID: ${user_id(message.user)}
        🔰 Имя: ${user.prefix}
        ${vip}
        ${premium}
        💡 Очки опыта: ${user.exs}/${user.uplvl}
        💡 Опыт дается раз в час за активную игру

        👤 Возраст: ${user.vozrast} года/лет
        💲 Денег на руках: ${spaces(user.balance)}$ [${utils.rn(user.balance)}]

        ❤ Здоровье: ${user.hp}/100

        🍕 Голод: ${user.golod}/100
		❗ -1 каждые 20 минут

		${e}
		`+
		(user.golod >= 30 ? `❗ +1 энергия даётся раз в час\n\n` : `⚠ Вы голодны. Энергия не прибавляется!\n\n`)+
		`
        `+(user.global_exs < 1 ? `` : `👑 Рейтинг: ${spaces(user.global_exs)}\n`)+
        ``+(user.bitcoin < 1 ? `` : `🔋 Premiumcoin: ${spaces(user.bitcoin)}\n`)+
        ``+(user.bank_balance < 1 ? `` : `💰 Счёт на киви: ${spaces(user.bank_balance)}$ [${utils.rn(user.bank_balance)}]\n`)+
            `☣ Status: ${user.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]")}
        `+(user.agent == 0 ? `` : `👤 Должность: 🆘SUPPORT🆘\n`)+ 
        `
        `+(user.frac_name === false ? `` : `⠀⠀⚡ База: ${user.frac_name}\n`)+ 

        ``+(user.bizs.one_biz === false ? `` : `⠀⠀🏠 Бизнес: ${user.bizs.one.name}\n`)+  
        ``+(user.aircraft === false ? `` : `⠀⠀✈ Самолет:  ${air[user.aircraft]}\n`)+
        (user.cars === false ? `` : `⠀⠀🚘 Транспорт: ${cars[user.cars]}\n`)+ 
        (user.moto === false ? `` : `⠀⠀🛵 Мотоцикл: ${mt[user.moto]}\n`)+ 
        (user.garage === false ? `` : `⠀⠀🏚 Гараж: ${user.garage}\n`)+ 
        (user.restoran === false ? `` : `⠀⠀🏨 Ресторан: ${user.restoran}\n`)+ 
        (user.prist === false ? `` : `⠀⠀🕹 Приставка: ${user.prist}\n`)+ 
        (user.lodka === false ? `` : `⠀⠀🛥 Яхта: ${yah[user.lodka]}\n`)+ 
        (user.phone === false ? `` : `⠀⠀📱 Телефон: ${ph[user.phone]}\n`)+ 
        (user.pcc === false ? `` : `⠀⠀🖥 Компьютер: ${pc[user.pcc]}\n`)+ 
        (user.house === false ? `` : `⠀⠀🏡 Дом: ${user.house}\n`)+  
         (user.kv === false ? `` : `⠀⠀🌇 Квартира: ${kv[user.kv]}\n`)+ 
        (user.pit === false ? `` : `⠀⠀🐼 Питомец:  ${pt[user.pit]}\n`)+
        `
    
        👪 Зарегистрировано по реф: ${user.refs}
        ⚠ Предупреждений: [${user.warn}] 
        `+(user.ainfo.vig < 1 ? `🔹 Выговоров нету.\n` : `🔹 Выговоров: [${user.ainfo.vig}]\n`)+
        `➕ » Дата регистрации ${user.rtime} « ➕
        `) 
    }else{
        if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸  Проверьте вводимые данные.`);
        if(!!acc.users[1]) return message.send(`🔸  Проверьте вводимые данные.`);
        let id = acc.users[message.$match[1]];
        return message.send(`
            📋 Информация об игроке [${id.prefix}] 📋
            🔹 VK: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})
            💲 на руках: ${spaces(id.balance)} [${utils.rn(id.balance)}]
            🔋 Premiumcoin: ${spaces(id.bit)}
                ☣ Status: ${id.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}
            `);
        } 
});

vk.updates.hear(/^(?:gps|✈ gps)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let name = [0, 'Город Южный', 'Мерия', 'Пиццерия', 'Игровой Клуб', 'Магазин']
	if(message.$match[1]){
		let i = message.$match[1];
		if(i < 0 || i > 5) return message.send(`✉ Неверно указан номер`);
		 
		user.gps = Number(i);
		return message.send(`✉ Вы переместились в ${name[i]}\n Напишите "${name[i]}" для списка команд`);
		 	
	}else{
		return message.send(`
		✉ Список мест ✉
	    1. Москва
		2. Санкт-Петербург
		3. Пиццерия
		4. Игровой Клуб
		5. Магазин

		&#9888; ✈ Для перемещения, напишите: "gps (номер)"
		`);
	}
});

vk.updates.hear(/^(?:Кушать|еда|поесть)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)]; 
	if(user.gps != 3) return message.send(`🍕 Чтобы покушать, сходите в Пиццерию ('gps')`);

	if(message.$match[1]){
		let args = message.$match; 
		let a = [0, 1,2,5,7,10];
		let price = [0,100,200,500,700,1000];
		let name = [0, 'пирожок','картошку фри','пиццу','гамбургер','набор из фастфуда']

		if(args[1] < 1 || args[1] > 5) return message.send(`🍕 Введите корректно номер из меню`);
		if(user.balance < price[args[1]]) return message.send(`✉ У вас недостаточно денег!`);
		user.balance -= Number(price[args[1]]);
		user.golod += Number(a[args[1]]);

		if(user.golod > 100){
			user.golod = rand(39,45);
			return message.send(`🍕 Вы скушали слишком много еды\n🍕 Вас стошнило\n🍕 Уровень голода: ${user.golod}`);
		}else{
			return message.send(`🍕 Вы скушали ${name[args[1]]}\n🍕 Уровень голода: ${user.golod}`);
		}   
	}else{
		return message.send(` 
			🍕 Меню 🍕
			1&#8419;. Пирожок +1 | 100$
			2&#8419;. Картошка фри +2 | 200$
			3&#8419;. Пицца + 5 | 500$
			4&#8419;. Гамбургер + 7 | 700$
			5&#8419;. Набор из фастфуда +10 | 1000$

			✉ Чтобы покушать напишите: "Кушать [номер]"
		`);
	}
});

vk.updates.hear(/^(?:Получить паспорт)$/i,  (message) => {
      let user = acc.users[user_id(message.user)]; 
      if(user.gps != 1) return message.send(`🌙Чтобы получить паспорт, сходите в Москву ('gps')`);
       user.seria1 = rand(10,99);
        user.seria2 = rand(10,99);
        user.seria = (user.seria1+' '+user.seria2);
     user.nomerp = rand(100000,999999);
 
        if(user.pasport == true) return message.send(`${user.prefix}, Вы уже получали паспорт!`);
        if(user.pasport == false)
        user.pasport = true;
    user.balance -= 500;
    return message.send(`${user.prefix}, Вы получили паспорт!\n📝 Вам пришлось заплатить 500 рублей налог!\n📝 Чтобы посмотреть информацию о паспорте введите: "Паспорт"`);
  });

vk.updates.hear(/(?:паспорт|🤵 Паспорт|@vrbotofficial 🤵 Паспорт)/i, async (message) => {
let user = acc.users[user_id(message.user)]; 
if(user.pasport==false) return message.send('У вас нет паспорта!'); 
if(user.gps != 1) return message.send(`🌙 Чтобы использовать эту команду, вы должны находиться в Городе Москва ('gps')`);
if(user.pasport == true){ 
vk.api.call('users.get', { 
user_ids: message.senderId, 
fields: "photo_id, photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online" 
}) 
.then(res => { 
message.send(` 
👤 Имя: ${user.prefix} 
👫 Пол: ${res[0].sex.toString().replace(/1/gi, "Женский").replace(/2/gi, "Мужской")} 
📝 Ваш серийный номер: ${user.seria}
➖➖➖➖➖➖➖➖➖ 
📝 Место жительства: Российская Федерация.
➖➖➖➖➖➖➖➖➖ 
👕 Фотография:`, {attachment: 'photo'+res[0].photo_id}) 
})
} 
})

//Админ панель//
	vk.updates.hear(/^(?:панель)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];

		if(user.level == 1){
			   return message.send(` 
🔱 Возможности VIP 🔱
 ⚡адм правила - важно знать! 
 ⚡проверить [ID] - проверить игрока. 
 ⚡Забанить временно [ID] [TIME] - Дать временный бан
 ⚡untemp [ID] - Снять временный бан
 ⚡setmoney [число] - выдать себе валюту. [1$ - 500000$]

[СОВЕТ]:❗ НЕ ИГРАЙТЕСЬ С АДМИНКОЙ!
`); 
} 
if(user.level == 2){ 

return message.send(` 
🔱 Возможности Премиум 🔱
 ⚡адм правила - важно знать! 
 ⚡warn [ID] - выдать предупреждение. 
 ⚡tempban [ID] [TIME] - Дать временный бан 
 ⚡untemp [ID] - Снять временный бан
 ⚡get [ID] - проверить игрока. 
 ⚡setmoney [COUNT] - выдать себе валюту [1$ - 3000000$]

[СОВЕТ]:❗ НЕ ИГРАЙТЕСЬ С АДМИНКОЙ!
`); 
} 
if(user.level == 3){ 

return message.send(` 
🔱 Возможности Модератора  🔱
 ⚡адм правила - важно знать! 
 ⚡ban [ID] - заблокировать навсегда. 
 ⚡unban [ID] - разблокировать игрока. 
 ⚡warn [ID] - выдать предупреждение. 
 ⚡tempban [ID] [TIME] - Дать временный бан 
 ⚡untemp [ID] - Снять временный бан
 ⚡setnick [ID] [NAME] - изменить ник. 
 ⚡get [ID] - проверить игрока. 
 ⚡setmoney [COUNT] - выдать себе валюту [1$ - 20000000$]
 ⚡kicked [ССЫЛКА_ВК] - кикнуть из беседы.

[СОВЕТ]:❗ НЕ ИГРАЙТЕСЬ С АДМИНКОЙ! 
`); 
} 
if(user.level > 4){ 

return message.send(` 
🔱 Возможности Администратора  🔱
 ⚡адм правила - важно знать! 
 ⚡ban [ID] - заблокировать навсегда. 
 ⚡unban [ID] - разблокировать игрока. 
 ⚡warn [ID] - выдать предупреждение. 
 ⚡tempban [ID] [TIME] - Дать временный бан 
 ⚡untemp [ID] - Снять временный бан
 ⚡setnick [ID] [NAME] - изменить ник. 
 ⚡get [ID] - проверить игрока. 
 ⚡setmoney [COUNT] - выдать себе валюту [1$ - 20000000$] 
 ⚡kicked [ССЫЛКА_ВК] - кикнуть из беседы. 
 ⚡vig ID - выдать админ-выговор 
 ⚡unvig ID - снять все выговоры. 

[СОВЕТ]:❗ НЕ ИГРАЙТЕСЬ С АДМИНКОЙ!
`);
		}
	});

	 	vk.updates.hear(/^(?:випка)/i,  (message) => {  
	 	let user = acc.users[user_id(message.user)];
		return message.send(` 
кмд VIP'ки:
впоиск [ССЫЛКА_ВК] - найти игрока
			`);
	});

	 	vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warn_p = '';
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warn_p += `&#8195;❗  ${user.warn_p[i]}\n`}
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸  Проверьте вводимые данные.`);
	if(message.$match[1] == 1) return message.send(`🔸  Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warn_p += `⛔  ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
		Игрок: ${id.prefix}

		🔎 ID: ${message.$match[1]}
		🔹 VK: @id${id.id}(${id.prefix})
		💲 на руках: ${spaces(id.balance)} [${utils.rn(id.balance)}]
		🔋 Premiumcoin: ${spaces(id.bitcoin)}
		💰 Счёт в банке: ${spaces(id.bank_balance)}$ [${utils.rn(id.bank_balance)}]
		🔱 	Status: ${id.level.toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "Вип").replace(/2/gi, "Премиум").replace(/3/gi, "Модератор").replace(/4/gi, "Администратор").replace(/5/gi, "Гл.Администратор").replace(/6/gi, "👑 CREATOR 👑")}
		🚸 Дата регистрации: ${id.rtime}

        		🔹 Выговоров: [${id.ainfo.vig}]
		⚠ Предупреждений: [${id.warn}] 
		🔺 Причины:
		${id.warn_p}
		----------------------
 		`+(id.giverub == false ? `giverub: ${id.bloks.giverub}\n` : `giverub: ${id.bloks.giverub}\n`)+
		(id.mute == false ? `mute: ${id.mute}\n` : `mute: ${id.mute}\n`)+
		(id.ban == false ? `ban: ${id.ban}\n` : `ban: ${id.ban}\n`)+
		(id.block_top == false ? `off_top: ${id.block_top}\n` : `off_top: ${id.block_top}\n`)+
		(id.bloks.rep == false ? `banrep: ${id.bloks.rep}\n` : `banrep: ${id.bloks.rep}\n`)+
		(id.bloks.pay == false ? `banpay: ${id.bloks.pay}\n` : `banpay: ${id.bloks.pay}\n`)+`
		`);
	});

	 	vk.updates.hear(/^(?:впоиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {   
	 		if(user.vip < true) return;
	if(message.$match[3]){ 
		let id = user_id(message.$match[3]);
		if (!acc.users[id]) return message.send(`🔎 Не верно указаны данные | Игрока нет`);  
		return message.send(`
			🔹 Игрок: [id${id}|${acc.users[id].prefix}]
			🔹 ID: ${id}
			🔹 Adm-lvl: ${acc.users[id].level} 
		`);
	}else{ 
		if(!message.$match[4]) return message.send(`🔎 Укажите данные`);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = u_id(res.object_id);
			if (!acc.users[id]) return message.send(`🔎 Не верно указаны данные | Игрока нет`);  
			return message.send(`
				🔹 Игрок: [id${id}|${acc.users[id].prefix}]
				🔹 ID: ${id}
				🔹 Adm-lvl: ${acc.users[id].level} 
			`);
		})
		return;
	}
}); 

	 	vk.updates.hear(/^(?:выдать деньги)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1] || !message.$match[2]) return message.send(`✉ Укажите ID и СУММУ`);
	let args = message.$match; 
	let user = acc.users[user_id(message.user)];  
	if(user.vip < true) return message.send(`✉ Команда доступна для статуса: VIP`); 
	let ids = args[1]; 
	let summa = args[2];
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].balance += Number(args[2]);
	return message.send(`▪ ${nick(message.user)} выдал ${args[2]}₽ игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

	 	vk.updates.hear(/^(?:removemoney)\s?([0-9]+)?/i, (message) => {
	if(!message.$match[1]) return message.send(`✉ Укажите ID `);
	let args = message.$match; 
	let user = acc.users[u_id(message.user)];  
	if(user.admin < 6) return message.send(`✉ Команда доступна для статуса: <Спец. Администратор>`); 
	let ids = args[1]; 
	if(!acc.users[ids]) return message.send(`✉ Игрок не найден...`);  
	acc.users[ids].balance = 0;
	return message.send(`▪ ${nick(message.user)} аннулировал баланс игроку @id${acc.users[ids].id}(${acc.users[ids].prefix}) [${ids}]`)
});

vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸  Пример команды: setnick [ID] [ИМЯ]`);
		if(user.vip < true) return;
		let zaprets1 = message.$match[2].toLowerCase();
			var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`✖Получше придумай что нибудь...`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`✖Вижу ты не адекватный, придумай получше.`);
		}

		if(message.$match[1] == 1) {
				user.warn += 1;
			return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		acc.users[message.$match[1]].prefix = message.$match[2];
		user.ainfo.nicks += 1;
		return message.send(`✔ Вы успешно сменили игроку ник: ${message.$match[2]}`);
	});

	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸  Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸ID Должен быть числового вида`);
		if(user.level < 3) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`⚠ Игрок не обнаружен в Базе Данных`);
		acc.users[message.$match[1]].ban = true; 
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `⛔ Вы были заблокированы Администратором навсегда.\n✅  Причина: ${message.$match[2]}`
		});
		if(message.$match[1] == 1) {
				user.warn += 2;
				return message.send(`Нельзя! Ты получаешь 2 варна сразу. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`⛔ Игрок [${acc.users[message.$match[1]].prefix}] BAN = TRUE.\n✅  Причина: ${message.$match[2]}`);
	}); 

	 	vk.updates.hear(/(?:баланс|💶 Баланс|@vrbotofficial 💶 Баланс)/i, async (message) => {
	 	let user = acc.users[user_id(message.user)];
		return message.send(` 
💸 На руках: ${utils.sp(user.balance)}
🔋 PREMIUM coins : ${utils.sp(user.bitcoin)}
💳 В банке : ${utils.sp(user.bank_balance)}
			`);
	});

	 	vk.updates.hear(/^(?:финфо)/i, (message) => {
	let user = acc.users[user_id(message.user)];
	let names = [0, '6U Nvidia','AntminerS9','FM2018-BT200']
	let ids = user_id(message.user);
	if(ferm[user_id(message.user)].ferm !== true) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас нет фермы`);
	if(!ferm[ids]) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас нет фермы`);
	if(ferm[ids]){
	return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), информация о ваших фермах
		📖Название: ${names[ferm[ids].id]} 
		💼Количество: ${spaces(ferm[ids].count)} 
		🔹Прибыль: ${ferm[ids].bitcoin} ฿/час`,
		{

		});
		}
});

	 	vk.updates.hear(/^(?:фермы)\s?([1-3]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
		return message.send(`
			@id${message.user}(${acc.users[user_id(message.user)].prefix}), фермы 

			🔋 1. 6U Nvidia 150฿/час (20.300.000$) 
			🔋 2. AntminerS9 500฿/час (50.000.000$) 
			🔋 3. FM2018-BT200 1500฿/час (130.000.000$) 

			✏Для покупки введите "Фермы [номер] [кол-во]" 
			✏Для продажи введите "Продать фермы" 
			✏ (Продаются все фермы)

			❕Чтобы посмотреть стат-ку своих ферм, введите "финфо" ❕
		`)
	}

	let one = message.$match[1]; 
	let two = message.$match[2]; 

	let ids = [0,1,2,3];
 	let counts = [0,150,500,1500]; 
 	let cena = [0,20300000,50000000,130000000];
 	let names = [0, '6U Nvidia','AntminerS9','FM2018-BT200']
 		if(!one || !two) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), пример команды "фермы [номер] [кол-во]"`);
 	if(two < 0 || two > 100) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), укажите количество ферм [1-100]`);
 		if(user.balance < Number(two) * Number(cena[one])) return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), у вас недостаточно денег на покупку фермы.`);
 	if(!ferm[user_id(message.user)]){
 		ferm[user_id(message.user)] = {
 			ferm: false,
 			id: false,
 			count: 0,
 			balance: 0,
 			bitcoin: 0
 		}
 	}
	let b = ferm[user_id(message.user)];
	if(b.count > 99) {
		 return message.send(`У вас куплено максимальное количество ферм [100]`);
	}
 	if(user.max_ferm - b.count < message.$match[2]) return message.send(`Максимальное кол-во ферм 100!`)
 	let a = ferm[user_id(message.user)];
 	if(a.ferm == false){
 		a.ferm = true;
 		a.id = Number(ids[one]);
 	}

 	if(a.ferm == true && a.id == one){
 		user.balance -= Number(two) * Number(cena[one]);
 		a.count += Number(two);
 		a.bitcoin += Number(counts[one]) * two;
 		return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), вы купили ферму ${names[one]}\n&#128267; Количество [${two}] за [${Number(two) * Number(cena[one])}$]\n&#128267; Прибыль увеличилась на: [${Number(counts[one]) * two}₿]`);

 	}else{
 		return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), покупать можно только один тип ферм.`);
 	}
 }); 
 	setInterval(() =>{
 		for(id in ferm){
 			 if(ferm[id].ferm == true && ferm[id].count > 0){
 			 	acc.users[id].bitcoin += Number(ferm[id].bitcoin);
 			 }
 		}
 	}, 3600000); 
//////////////////////
 	vk.updates.hear(/^(?:продать фермы)/i, (message) => {
let user = acc.users[user_id(message.user)];
if(ferm[user_id(message.user)].ferm !== true) return message.send('У вас нет фермы');
if(!ferm[user_id(message.user)]){
ferm[user_id(message.user)] = {
ferm: false,
id: false,
count: 0,
balance: 0,
bitcoin: 0
}
}
let a = ferm[user_id(message.user)];
let cena = [0,20300000,50000000,130000000];

acc.users[user_id(message.user)].balance += Number(a.count) * cena[a.id] / 2;
a.ferm = false;
a.id = false;
a.count = 0;
a.balance = 0;
a.bitcoin = 0;
return message.send(`@id${message.user}(${acc.users[user_id(message.user)].prefix}), вы продали свои фермы.`);
});

vk.updates.hear(/^(?:сообщение)\s?([0-9]+)\s?([^]+)?/i,  message => { 
    if(message.$match[1] == 1) return message.send(`Запрещено!`);
        vk.api.call('messages.send', {
            user_id: acc.users[message.$match[1]].id,
            message: `💡 Сообщение от игрока *id${message.user} (${acc.users[user_id(message.user)].prefix})\n📨: ${message.$match[2]}`
        });
    return message.send(`Сообщение отправлено!`);
});

 	vk.updates.hear(/^курс/i,  (message) => {  
		return message.send(` 
💰 Курс PREMIUM coin: ${acc.bit}$ 
🤝🏻 купить [кол-во] - Купить PREMIUM coin
🤝🏻 продать [кол-во] - Продать PREMIUM coin
			`);
	});
///////////////////////////
	vk.updates.hear(/^(?:продать)\s?([0-9]+)?/i, async  (message, bot) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`❗[ERROR] > Введите количество PREMIUM COINS для продажи`);
		if(user.bitcoin < message.$match[1]) return message.send(`❗[ERROR] > У вас нету столько PREMIUM COINS`);
		user.bitcoin -= Number(message.$match[1]);
		user.balance += Number(message.$match[1] * acc.bit)
		return message.send(`📝  Вы продали [${message.$match[1]}] PREMIUM coins за [${message.$match[1] * acc.bit}]$`);
	});
//////////////////////////ПРОМОКОДЫ------------------
 vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`❗[ERROR] >  Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`❗[ERROR] >  Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`❗[ERROR] >  Вы уже активировали промокод`);
 	acc.promos[message.$match[1]].users[message.user] = {i: true};
 	acc.promos[message.$match[1]].activ -= 1;
 	if(acc.promos[message.$match[1]].type == 1){
 		user.balance += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅  Вы активировали промокод!\n✅  Вы получили: ${spaces(acc.promos[message.$match[1]].balance)}$!\n 📛  Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
 	}
  	if(acc.promos[message.$match[1]].activ == 0) delete acc.promos[message.$match[1]];
 	return 
 });
////////////////////
 vk.updates.hear(/^(?:ipromo)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
 	if(!message.$match[1]) return message.send(`❗[ERROR] >  Укажите промокод`);
	if(user.level < 5) return message.send(`Нельзя!`);
 	if(!acc.promos[message.$match[1]]) return message.send(`❗[ERROR] >  Такого промокода нету/либо закончились активации`);
 	return 	message.send(`Информация о промокоде ${message.$match[1]}:\n 💰 Баланс промокода: ${acc.promos[message.$match[1]].balance}$!\n 📛  Осталось активаций: ${acc.promos[message.$match[1]].activ}`);
  });
////////////////////
  vk.updates.hear(/^(?:addpromo)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`доступно с привилегии "Спец админ"`);
 	if(!message.$match[1]) return message.send(`📝 » Укажите сумму для промокода`);  

 	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}

	acc.promos[result] = {
		users: {},
		activ: 30,
		type: 1,
		balance: message.$match[1]
	}		
  
 	return message.send(`🌍 » Ловите промокод:\n🌍 » На 30 активаций | На ${message.$match[1]}₽\n🌍 » Введите: 'Промо ${result}'`);
 });

  vk.updates.hear(/^(?:tempban|Забанить временно)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`ERROR`);
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  mute [ID] [TIME(1-999)]`);
	let time = message.$match[2] * 60000;
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}
	var is = [user_id(message.user), message.text] 
		adm_log(is)
	let id = Number(message.$match[1])
	acc.users[id].mute = true;
	
		setTimeout(() => {
			acc.users[id].mute = false;
			vk.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `⏺  Временная блокировка была снята. :)`
			});
	}, time);
	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `⏺  ${user.prefix} временно заблокировал доступ к боту на [${message.$match[2]}] минут(ы).\n\n⏺  Через [${message.$match[2]}] минут блокировка пропадет.`
	});
	return message.send(`💰  Вы заблокировали временно доступ к боту игроку  [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${time/60000} минут`); 
});
////////////////////
vk.updates.hear(/^(?:untemp)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`ERROR`);
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`⏺  Проверьте вводимые данные:\n⏺  unmute [ID]`);
		var is = [user_id(message.user), message.text] 
		adm_log(is)
 	
	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺  Временная блокировка была снята досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰  Вы сняли блокировку игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});
//////////////////
/////////////////////////
	vk.updates.hear(/^(?:givemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 496175718) return;
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  givemoder [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.send(`💰  Вы выдали Премиум - Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
//////////////////////////
	vk.updates.hear(/^(?:giveadm)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user);
		if(message.user != 496175718) return;
			if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺  Проверьте вводимые данные:\n⏺  giveadm [ID] [TIME(1-999)](дней)`);
		let time = message.$match[2] * 24;
       	 acc.users[message.$match[1]].adm_time = time;
      	  acc.users[message.$match[1]].level = 3;
		return message.send(`💰  Вы выдали Модератор - Аккаунт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});
//////////////////////////////
	vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 496175718) return;
			let user = acc.users[user_id(message.user)]; 
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: giveadm ID LVL(1-5)`); 
			if(message.$match[2] > 6) return message.send(`🔸 >> Максимальный админ-уровень 6!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅  ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}.`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}]\n🔸 >> Админ-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}]`);			
	});
//////////////////////////
	vk.updates.hear(/^(?:return)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);		 
			let user = acc.users[user_id(message.user)]; 
			if(!message.$match[1] || !message.$match[2]) return message.send(`Ошибка`); 
			if(message.$match[2] > 6) return message.send(`Ошибка`)
			if(!acc.users[message.$match[1]]) return message.send(`Ошибка`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
				return message.send(`Готово: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "[Игрок]").replace(/1/gi, "[Вип]").replace(/2/gi, "[Премиум]").replace(/3/gi, "[Модератор]").replace(/4/gi, "[Администратор]").replace(/5/gi, "[Гл.Администратор]").replace(/6/gi, "👑 CREATOR 👑")}]`);
		 
	});
////////////////////////////
	vk.updates.hear(/^(?:boostzp)\s?([0-9]+)?\s?([0-9]+)?/i,(message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 496175718) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostzp ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autozp = Number(message.$match[2]);
		return message.send(`🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор зарплат на (${message.$match[2]}) раз `);
	});
	vk.updates.hear(/^(?:boostbiz)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let id = user_id(message.user);	 	 
		if(message.user != 496175718) return;
		let user = acc.users[user_id(message.user)];  
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: boostbiz ID LVL(1-24)`);  
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`); 
		acc.users[message.$match[1]].autobiz = Number(message.$match[2]);
		return message.send(` 🔸 >> Вы выдали игроку [${acc.users[message.$match[1]].prefix}] автосбор прибыли на (${message.$match[2]}) раз `);
	});
///////////////////
	vk.updates.hear(/^(?:bpay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user != 496175718) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	 
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = '✖  запрещен' 
			acc.users[message.$match[1]].admin.block_pay = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = '✅ разрешен' 
			acc.users[message.$match[1]].admin.block_pay = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вам ${texts}ы переводы денег`
		}); 
		return message.send(`🔸 >> Готово: ${texts}`);
	});
//////////////////////////////
	vk.updates.hear(/^(?:bgive)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		if(message.user != 496175718) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = 'включил' 
			acc.users[message.$match[1]].admin.block_give = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_give = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  Спец.Администратор ${texts} Вам запрет на выдачу валюты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на выдачу валюты`);
	});
////////////////////////////////////
	vk.updates.hear(/^(?:brep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(message.user != 496175718) return;
		let text = '';
		if(!message.$match[1] || !message.$match[2]) return;
		let id = user_id(message.user);	 	
		let i = config;
		if(id != 1) return;
		let user = acc.users[user_id(message.user)];    
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);  
		if(Number(message.$match[2]) == 1){
			texts = 'включил' 
			acc.users[message.$match[1]].admin.block_rep = true;
		}
		if(Number(message.$match[2]) == 0){
			texts = 'отключил' 
			acc.users[message.$match[1]].admin.block_rep = false;
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  Спец.Администратор ${texts} Вам запрет на ответы на репорты.`
		}); 
		return message.send(`🔸 >> Вы ${texts}и запрет на ответ на репорты.`);
	});

	vk.updates.hear(/^(?:Volkov)/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return;
    return message.send(`
🔱 Возможности Гл.Администратора 🔱 
 ⚡адм правила - важно знать! 
 ⚡ban [ID] - заблокировать навсегда. 
 ⚡unban [ID] - разблокировать игрока. 
 ⚡warn [ID] - выдать предупреждение. 
 ⚡tempban [ID] [TIME] - Дать временный бан 
 ⚡untemp [ID] - Снять временный бан 
 ⚡setnick [ID] [NAME] - изменить ник. 
 ⚡get [ID] - проверить игрока. 
 ⚡setmoney [COUNT] - выдать себе валюту [1$ - 20000000$] 
 ⚡kick [ССЫЛКА_ВК] - кикнуть из беседы. 
 ⚡vig [ID] - выдать админ-выговор 
 ⚡unvig [ID] - снять все выговоры. 
 ⚡offtop [ID] - Скрыть игрока с топа. 
 ⚡ontop [ID] - Вернуть в топ. 
 ⚡givebronze [ID] [1-7] - Выдать другу VIP аккаунт. 
 ⚡ver [ID] - Подтвердить аккаунт игрока. 
 ⚡unver [ID] - Снять подтверждённый аккаунт игрока. 
 ⚡banrep [ID] - Запретить писать игроку в репорт. 
 ⚡unrep [ID] - Разрешить писать игроку в репорт. 
 ⚡bpay [ID] - Заблокировать игроку передачу денег. 
 ⚡ooff [ID] - Выключить ограничитель на ставки. 
 ⚡oon [ID] - Включить ограничитель ставок.`);
});
////////////////////

vk.updates.hear(/^(?:реши)\s([0-9]+)\s(\+|\-|\/|\*)\s([0-9]+)$/i, (message) => { 
const result = eval(`${message.match$[1]} ${message.args[2]} ${message.match$[3]}`); 
message.send(`${message.match$[1]} ${message.match$[2]} ${message.match$[3]}=${result}`); 
});

	 	vk.updates.hear(/^(?:магазин)/i,  (message) => { 
 		return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), магазин:
🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛵 Мотоциклы
⠀⠀🛩 Самолеты
⠀⠀🛥 Яхта

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры
⠀⠀🏚 Гаражи
⠀⠀🏨 Рестораны

📌 Остальное:
⠀⠀💸 Фермы
⠀⠀🐼 Питомцы
⠀⠀📱 Телефоны
⠀⠀🕹 Приставки
⠀⠀🖥 Компьютеры
⠀⠀ 👑 Купить рейтинг [кол-во] 250.000.000$

🔎 Для покупки используйте "[категория] [номер]".
			`);
 	});

 		vk.updates.hear(/^(?:мотоциклы)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
🔸1. Honda CBR1000RR Fireblade - 700.000$ 
🔸2. Kawasaki KXF - 950.000$ 
🔸3. Harley-Davidson Fat Boy - 1.200.000$ 
🔸4. Lightning LS-218 - 2.300.000$ 
🔸5. Honda CB500F - 5.500.000$ 
🔸6. Harley-Davidson Road Glide - 9.000.000$ 
🔸7. Yamaha R1 - 13.100.000$ 
🔸8. Suzuki Hayabusa - 21.000.000$ 
🔸9. Honda VFR1200X Crosstourer - 34.000.000$ 
🔸10. Aprilia RS 125 - 42.000.000$
			 
			🛵 Для покупки напишите: Мотоциклы [номер] 
			👉 Мотоцикл продать - продать мотоцикл

			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0,700000,950000,1200000,2300000,5500000,9000000,13000000,21000000,34000000,42000000];
	 	let names = [0, 'Honda CBR1000RR Fireblade','Kawasaki KXF','Harley-Davidson Fat Boy','Lightning LS-218','Honda CB500F','Harley-Davidson Road Glide','Yamaha R1','Suzuki Hayabusa','Honda VFR1200X Crosstourer','Aprilia RS 125']
 	if(i < 0 || i > 10) return;
 	if(user.moto != false) return message.send(`🛵 У вас уже есть мотоцикл`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.moto = ids[i]; 
 		return message.send(`🛵 Вы купили мотоцикл  (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
//////////////////////
	vk.updates.hear(/^(?:мотоцикл продать)/i, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.moto == false) return message.send(`🛵 У вас нет мотоцикла`)
		let sum = count[user.moto] / 100 * 5;
		user.balance += sum; 
		user.moto = false; 
		return message.send(`🛵 Вы продали свой мотоцикл за ${sum}$`)
	});

	vk.updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
*id${message.user} (${acc.users[user_id(message.user)].prefix}), питомцы:

📚1. Улитка. (10.000$) (5.000$/2 часа)
📚2. Кит. (50.000$) (10.000$/2 часа)
📚3. Овца. (100.000$) (20.000$/2 часа)
📚4. Курица. (170.000$) (35.000$/2 часа)
📚5. Коала. (300.000$) (55.000$/2 часа)
📚6. Оса. (450.000$) (75.000$/2 часа)
📚7. Свинья. (500.000$) (95.000$/2 часа)
📚8. Слон. (700.000$) (150.000$/2 часа)
📚9. Мартышка. (1.000.000$) (500.000$/2 часа)
📚10. Пингвин. (10.000.000$) (1.500.000$/2 часа)
📚11. Тигр. (70.000.000$) (5.000.000$/2 часа)
📚12. Волк. (500.000.000$) (10.000.000$/2 часа)
📚13. Заяц. (1.000.000.000$) (30.000.000$/2 часа)
📚14. Корова. (3.000.000.000$) (70.000.000$/2 часа)

🔸Для покупки введите "Питомцы [номер]" 
🔹Для продажи введите "Продать питомца" 
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	let ids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
	let count = [0,10000,50000,100000,170000,300000,450000,500000,700000,1000000,10000000,70000000,500000000,1000000000,3000000000]
 	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова']
 	if(i < 0 || i > 14) return;
 	if(user.pit != false) return message.send(` 🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 14){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.pit = ids[i]; 
 		return message.send(`🐼 Вы купили питомца (${names[i]}) за ${count[i]}$`)
 	}	 
 });
/////////////////////////
  vk.updates.hear(/^(?:продать питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`🐼 У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🐼 Вы успешно продали питомца `);
 });

 vk.updates.hear(/^(?:приставки)\s?([0-9]+)?/i, message => { 
	if(!message.$match[1]){ 
	return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), приставки: 
🔸 1. Atari 2600 (250$) 
🔸 2. Nes (Aka Dendy) (3.000$) 
🔸 3. Sega Genesis (3.500$) 
🔸 4. Nintendo Snes (5.000$) 
🔸 5. Sony Playstation (10.000$) 
🔸 6. Nintendo 64 (25.000$) 
🔸 7. Sony Playstation-2 (37.500$) 
🔸 8. Microsoft XBOX 360 (50.000$) 
 🔸 9. Sony Playstation-3 (70.000$) 
🔸 10. Nintendo Wii (75.000$) 

Для покупки введите Приставки [номер]" 
Для продажи введите: Продать приставку 
`); 
	} 
	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)]; 
	let count = [0, 250,3000,3500,5000,10000,25000,37500,50000,70000,75000]; 
		let names = [0, 'Atari 2600','Nes (Aka Dendy)','Sega Genesis','Nintendo Snes','Sony Playstation','Nintendo 64','Sony Playstation-2','Microsoft XBOX 360','Sony Playstation-3','Nintendo Wii'] 
	if(i < 0 || i > 10) return; 
	if(user.prist != false) return message.send(`  🕹У вас уже куплена приставка`); 
	if(i > 0 && i <= 10){ 
	if(user.balance < count[i]) return message.send(`🕹 У вас не достаточно денег.`); 
	user.balance -= count[i]; 
	user.prist = names[i]; 
	return message.send(`🕹 Вы купили приставку: (${names[i]}) за ${count[i]}$`) 
	} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать приставку)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.prist == false) return message.send(`🕹 У вас нет приставки`); 
user.prist = false; 
return message.send(`🕹 Вы успешно продали приставку`); 
});
///////////////////////////////////////////
 vk.updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
			*id${message.user} (${acc.users[user_id(message.user)].prefix}), дома:
			🔸 1. Коробка из-под холодильника (250$)
			🔸 2. Подвал (3.000$)
			🔸 3. Палатка (3.500$)
			🔸 4. Домик на дереве (5.000$)
			🔸 5. Полуразрушенный дом (10.000$)
			🔸 6. Дом в лесу (25.000$)
			🔸 7. Деревянный дом (37.500$)
			🔸 8. Дача (80.000$)
			🔸 9. Кирпичный дом (125.000$)
			🔸 10. Коттедж (450.000$)
			🔸 11. Особняк (1.250.000$)
			🔸 12. Дом на Рублёвке (5.000.000$)
			🔸 13. Личный небоскрёб (25.000.000$)
			🔸 14. Остров с особняком (40.000.000$)
			🔸 15. Белый дом (300.000.000$)

			Для покупки введите "Дома [номер]"
			Для продажи введите "Продать дом"
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 250,3000,3500,5000,10000,25000,37500,80000,125000,450000,1250000,5000000,25000000,40000000,300000000];
 		let names = [0, 'Коробка из-под холодильника','Подвал','Палатка','Домик на дереве','Полуразрушенный дом','Дом в лесу','Деревянный дом','Дача','Кирпичный дом','Коттедж','Особняк','Дом на Рублёвке','Личный небоскрёб','Остров с особняком','Белый дом']
 	if(i < 0 || i > 15) return;
 	if(user.house != false) return message.send(`🏢  У вас уже куплен дом`);
 	if(i > 0 && i <= 15){
 		if(user.balance < count[i]) return message.send(`🏢  У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.house = names[i];
 		return message.send(` 🏢  Вы купили дом (${names[i]}) за ${count[i]}$`)
 	}
 });
/////////////////////////////////////////
  vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢  Вы успешно продали дом государству.`);
 });
/////////////////////////////////////////
 vk.updates.hear(/^(?:рестораны)\s?([0-9]+)?/i, message => { 
if(!message.$match[1]){ 
return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), рестораны: 
🔸 1. Ресторан "Алые Паруса" (250$) 
🔸 2. Ресторан "Будь Готов" (3.000$) 
🔸 3. Ресторан "СССР" (3.500$) 
🔸 4. Ресторан "Тортила" (5.000$) 
🔸 5. Ресторан "Золотая Хохлома" (10.000$) 
🔸 6. Ресторан "АЙСБЕРГ" (25.000$) 
🔸 7. Ресторан "Чудаки" (37.500$) 

Для покупки введите "Рестораны [номер]" 
Для продажи введите "Продать ресторан" 
`); 
} 
let i = message.$match[1]; 
let user = acc.users[user_id(message.user)]; 
let count = [0, 250,3000,3500,5000,10000,25000,37500,]; 
let names = [0, 'Алые Паруса','Будь Готов','СССР',' Топртила','Золотая Хохлома','Айсберг','Чудаки'] 
if(i < 0 || i > 7) return; 
if(user.restoran != false) return message.send(`🏨 У вас уже куплен ресторан`); 
if(i > 0 && i <= 7){ 
if(user.balance < count[i]) return message.send(`🏨 У вас не достаточно денег.`); 
user.balance -= count[i]; 
user.restoran= names[i]; 
return message.send(` 🏨 Вы купили ресторан (${names[i]}) за ${count[i]}$`) 
} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать ресторан)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.restoran== false) return message.send(`🏨 У вас нет рестарана`); 
user.restoran= false; 
return message.send(`🏨 Вы успешно продали ресторан`); 
});
/////////////////////////////////////////ГАРАЖИ/////////////////////////////
 vk.updates.hear(/^(?:гаражи)\s?([0-9]+)?/i, message => { 
if(!message.$match[1]){ 
return message.send(` 
*id${message.user} (${acc.users[user_id(message.user)].prefix}), гаражи: 
 🔸 1. Контейнер (250$) 
🔸 2. Деревянный гараж (3.000$) 
🔸 3. Во дворе (3.500$) 
🔸 4. Ангар (5.000$) 
🔸 5. Автостоянка (10.000$) 
🔸 6. В белом доме Путина (5.000.000$) 

Для покупки введите "Гаражи [номер]" 
Для продажи введите "Продать гараж" 
`); 
} 
let i = message.$match[1]; 
let user = acc.users[user_id(message.user)]; 
let count = [0, 250,3000,3500,5000,10000,5000000]; 
let names = [0, 'Контейнер ','Деревянный гараж','Во дворе','Ангар','Автостоянка','В белом доме Путина'] 
if(i < 0 || i > 6) return; 
if(user.garage != false) return message.send(`🏚 У вас уже куплен гараж`); 
if(i > 0 && i <= 6){ 
if(user.balance < count[i]) return message.send(`🏚 У вас не достаточно денег.`); 
user.balance -= count[i]; 
user.garage = names[i]; 
return message.send(`🏚 Вы купили гараж (${names[i]}) за ${count[i]}$`) 
} 
}); 
////////////////////////////////
vk.updates.hear(/^(?:продать гараж)/i, message => { 
let user = acc.users[user_id(message.user)]; 
if(user.garage == false) return message.send(`🏚 У вас нет гаража`); 
user.garage = false; 
return message.send(` 🏚 Вы успешно продали гараж.`); 
});
////////////////////////////////
 vk.updates.hear(/^(?:работы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 💼1. Грузчик | [0 ОП] | (1000$/час)  
💼2. Учитель | [10 ОП] | (5000$/час)
💼3. Водитель| [20 ОП] | (10.000$/час)  
💼4. Врач | [30 ОП] | (15.000$/час) 
💼5. JS-разработчик | [40 ОП] | (20.000$/час)
💼6. PHP-разработчик | [50 ОП] | (25.0000$/час) 
💼7. Электрик | [65 ОП] | (35.000$/час)
💼8. Директор | [70 ОП] | (45.000$/час)  
💼9. Программист | [80 ОП] | (60.000$/час) 
💼10. Заведущий компанией орифлейм | [100 ОП] | (80.000$/час) 

💡Устроиться : "работы [номер]" 
💡Уволиться: "уволиться"
💡Работать: "Работать" - Получение ЗП + Получение стажа [1] 
💡Информация о вашей работе: 'Книжка'
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
 		let names = [0, 'грузчик ','учитель ','водитель','врач','JS-разработчик','PHP-разработчик','Электрик','Директор','Программист',' Заведущий компанией орифлейм ']
 	let staj = [0,0,10,20,30,40,50,65,70,80,100]
 	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000]
 	if(i <= 0 || i > 10) return;
 	if(user.job.name != false) return message.send(`👨‍  У вас уже есть работа`);
 	if(i > 0 && i <= 10){
 		if(user.job.lvl < staj[i]) return message.send(`👨‍  У вас не достаточный стаж.`); 
 		if(staj[i] > user.job.lvl) return message.send(`👨‍  У вас не достаточный стаж.`); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.send(`👨‍⚖️  Вы устроились на работу `)
 	} 
 });

 	vk.updates.hear(/^(?:бстата)\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 Статистика бизнесов: \n';
		if(user.bizs.one_biz == true){ text +=  `🏤 Бизнес: ${user.bizs.one.name}\n💰 Прибыль: ${spaces(user.bizs.one.zp)}$/час\n👥 Рабочих: ${user.bizs.one.people}/${user.bizs.one.max_peop}\n💰 На счету: ${spaces(user.bizs.one.balance)}$\n\n🔸 Что бы снять деньги с бизнеса, ввведите "Бизнес снять [кол-во]"`}
			return message.send(text)
	});

	 	vk.updates.hear(/^(?:дружить)\s?([^]+)?/i,  (message) => { 
		let id = acc.users[message.$match[1]]
		let user = acc.users[user_id(message.user)];
		if(message.$match[1] == 1) return;
		vk.api.call('messages.send',  {
			peer_id: acc.users[message.$match[1]].id,
			message: `👥 Игрок  *id${message.user} (${acc.users[user_id(message.user)].prefix}) Хочет с вами подружиться 👥`
		});
 		return message.send(`👥 *id${message.user} (${acc.users[user_id(message.user)].prefix}) предложил дружбу игроку @id${id.id}(${id.prefix}) 👥`);
 	});

	 	vk.updates.hear(/^(?:монетка)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔆 ➾ Пример команды: монетка [орел/решка] [ставка]`)
		let amount = parserInt(message.$match[2]);   
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user) 
		if(user.gps != 4) return message.send(`💰 Чтобы поиграть, сходите в Игровой Клуб ('gps')`);
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 ➾  Ставка не может превышать баланс или быть ниже 1₽`);
		if(user.block_game == true && user.level < 2){
			if (amount > 500000) return message.send(`🎉 ➾  Ставка не должна быть больше 500.000₽\n⛔ ➾ В 'донат' можно купить снятие ограничения.`);
		}
		 
		if(!Number(amount)) return message.send(`🔸 ➾ Ставка должна быть числом!`); 
		 
		 	if(message.$match[1] == 'решка'){
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					user.balance += sum; 
					if(amount < 1000){ 
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text} 🔆➾ Вам выпала решка !\n🔆 ➾ Вы выиграли ${spaces(sum)}₽ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}🔆 ➾ Вам выпала решка !\n🍀 ➾ Вы выиграли ${spaces(sum)}₽ и ${a} опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}🔆 ➾ Вам выпала решка !\n🍀 ➾ Вы выиграли ${spaces(sum)}₽\n🍀 ➾ Опыт дается при ставке от 10.000$`);
 					}

				}else{ 
					user.balance -= amount;
					return message.reply(`🔆 ➾ Вам выпал орел !\n🌚 ➾ Вы проиграли ${spaces(amount)}₽!`);
				}
			}
			if(message.$match[1] == 'орел'){ 
				if(rand(1,2) == 1){
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					user.balance += sum; 
					if(amount < 10000){
						user.exs += 2;
						if(up == true){
							return message.reply(`${text} 🔆➾ Вам выпал орел !\n🔆 ➾ Вы выиграли ${spaces(sum)}₽ и ${a} опыта! \n🌟 ➾ [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}🔆 ➾ Вам выпал орел !\n🍀 ➾ Вы выиграли ${spaces(sum)}₽ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}🔆 ➾ Вам выпал орел !\n🍀 ➾ Вы выиграли ${spaces(sum)}₽\n🍀 ➾ Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{ 
					user.balance -= amount;
					return message.reply(`🔆 ➾ Вам выпала решка !\n🌚 ➾ Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});

/////////////////////////
 vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
💼1. Админ сервера в майне (1.000.000) | [15] 
💼2. Закусочная (5.000.000$) [30] 
💼3. Бизнес в интернете (20.000.000$) [55] 
💼4. Гипермаркет (30.000.000$) [80] 
💼5. Личная компания (50.000.000$) [100 Рабочих] 
💼6. Магазин (70.000.000$) [150 рабочих] 
💼7. Ресторан (90.000.000$) [200 рабочих] 
💼8. Компания Орифлейм (110.000.000$) [350 рабочих] 
💼9. Компания OK (130.000.000$) [500 рабочих] 
💼10. Компания ВКонтакте (210.000.000$) [600 рабочих] 

❗ Для покупки напишите: Бизнесы [номер] 
❗ Для продажи напишите: Бизнес продат
❗ Нанять [кол-во] - Нанять рабочих
❗ Статистика - статистика бизнесов. 

❗ Цена 1 рабочего - 50.000$ 
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 1000000, 5000000,20000000,30000000,50000000,70000000,90000000,110000000,130000000,210000000];
	let max_peop = [0,15,30,55,80,100,150,200,350,500,600]
 		let names = [0, 'Админ сервера в майне','Закусочная','Бизнес в интернете','Гипермаркет','Личная компания','Магазин','Ресторан','Компания Орифлейм','Компания OK','Компания ВКонтакте'] 
 	if(i < 0 || i > 10) return message.send(`🏢 Неверный номер бизнеса.`)
 	if(!Number(message.$match[1])) return message.send(`🏢 Укажите номер бизнеса`)

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 У вас нет такой суммы.`);
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.balance = 0;
		user.bizs.one.max_peop = max_peop[i];
		return message.send(`🏢 Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	return message.send(`🏢 У вас уже куплен бизнес.`) 
 
 });
///////////////////

/////////////////////

///////////////////
////////////////////////
	vk.updates.hear(/^(?:бизнес продать)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false) return message.send(`🏢 У вас нет бизнеса.`)
			let sum = user.bizs.one.count / 100 * 5
			user.balance += sum;
			user.bizs.one_biz = false;
			user.bizs.one.count = false;
			user.bizs.one.id = false;
			user.bizs.one.name = false;
			user.bizs.one.people = 0; 
			user.bizs.one.zp = 0;
			user.bizs.one.balance = 0;
			user.bizs.one.max_peop = 0;

			return message.send(`🏢 Вы продали свой бизнес за ${sum}$`);	   
	});
///////////////////////////
	vk.updates.hear(/^(?:нанять)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
		if(!message.$match[1]) return message.send(`🏢 Укажите количество рабочих "Нанять [кол-во]"`)
			if(!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > 600) return message.send(`🏢 Неверно указаны данные. "Нанять [кол-во]"`)
		let id = user_id(message.user)
		let num = message.$match[2]; 
			if(message.$match[1] * 50000 > acc.users[id].balance) return message.send(`🏢 Для покупки [${message.$match[1]}] рабочих нужно [${message.$match[1] * 50000}$]`);
	    	if(acc.users[id].bizs.one_biz == false) return message.send(`🏢 ➾ У вас не куплен бизнес.`)
	   	 	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < message.$match[1]) return message.send(`  🏢 ➾ Максимальное количество работников: ${acc.users[id].bizs.one.max_peop}`)
	    	
		acc.users[id].bizs.one.people += Number(message.$match[1])
	    	acc.users[id].balance -= Number(message.$match[1]) * 50000;
	    	acc.users[id].bizs.one.zp += 20000 * Number(message.$match[1]);
	    	
		return message.send(`🏢 Вы купили ${message.$match[1]} рабочих. Ваша прибыль увеличилась на: ${message.$match[1] * 20000}$`)

	});
//////////////////////
  vk.updates.hear(/^(?:уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`👨‍⚖️  У вас нет работы.`);
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.send(`👨‍ Вы успешно уволились.`);
 });
////////////////////////
  vk.updates.hear(/^(?:книжка)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.send(`
 		📋 Стаж работы: ${user.job.lvl} 
 		📋 Работа: ${text}
 		📋 Зарплата: ${user.job.count}$/час
 		`);
 });
///////////////////////////////
  vk.updates.hear(/^(?:работать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false) return message.send(`👨‍⚖️  У вас нет работы.`);
 	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час.`);
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
 	user.job.lvl += 1;
 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
	}, 3600000);
		return message.send(`
 		📝  Вы отработали и получили зарплату в размере ${counts}$ 
 		`);
 });

vk.updates.hear(/^(?:тех поддержка)/i, message => {  
        if(acc.users[user_id(message.user)].level < 5) return;
        let agt; 
        agt = 'Агенты поддержки: \n\n'; 
        for (let id in acc.users) {
            if(acc.users[id]){
            let user = acc.users[id];
 
            if (user.agent == 2) agt += `&#8195;🆘 @id${acc.users[id].id}(${acc.users[id].prefix}) [ID:${id}]\n`; 

            }
        }
        let text = `\n`;
        if (agt.length != 24) text += agt;
        return message.send(`${text}`);
    });

vk.updates.hear(/^(?:oon)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`🔸`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_game = true 
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы поставили ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:ooff)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		var is = [user_id(message.user), message.text] 
			adm_log(is)
		acc.users[message.$match[1]].block_game = false; 
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `⏺  С вас сняты ограничения на ставки. :)`
	});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы сняли ограничение на ставки игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:offtop)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_top = true;

		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы отключили топ игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:ontop)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: ontop ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].block_top = false; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы включили топ игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

		vk.updates.hear(/^(?:топ)$/i,  (message) => {
		let text = ``;
		var tops = []
		var tp = []
		for (i=0;i<200000;i++) {

			if(acc.users[i]){
			if(acc.users[i].level < 4 && acc.users[i].block_top == false){ 
				tops.push({
					id: i,
					idvk: acc.users[i].id,
					balance: acc.users[i].balance
					})
				}
			}  
		}
for (i=0;i<200000;i++) {
		if(acc.users[i]){
			if(acc.users[i].level < 4 && acc.users[i].block_top === false){
			tp.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
				});
			}
		} 
	}

	tp.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1;
			if (b.lvl < a.lvl) return -1;
			return 0;
		});

		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var ao = [];
		for (var g = 0; g < 5; g++) {
			if (tp.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`;
				if(g == 9) ups = `&#8195;&#128287;`;
				ao.push({
					id: tp[g].id,
					idvk: tp[g].idvk,
					lvl: tp[g].lvl,
					smile: `${ups}`
				});
			}
		}
		var yo = []
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `&#8195;${ups}&#8419;`
				if(g == 9) ups = `&#8195;&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💸 Топ баланс\n" + yo.map(a => a.smile + "[id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + "$").join("\n")
		var rating = "👑 Топ рейтинг\n" + ao.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n");
		text += `${people}\n\n➖➖➖➖➖➖➖➖➖➖\n\n${rating }`; 
		message.send(text);
	});
///////////////////////////////
	vk.updates.hear(/^(?:ver)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: ver ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].verify = true;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Создатель бота подтвердил ваш аккаунт.`
		});

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы подтвердили аккаунт [${acc.users[message.$match[1]].prefix}]`);
	}); 
//////////////////////
	vk.updates.hear(/^(?:closerep)\s?([0-9]+)\s?([^]+)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.agent < 2) return message.send(``)
		if(!message.$match[2]) return message.send(`Укажите причину "closerep [ID] [Причина]"`)
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].rep.status = false;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `❗ Ваш репопт закрыт. \n🔹Причина: ${message.$match[2]}`
		});
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✔ Репорт игрока [${acc.users[message.$match[1]].prefix}] закрыт!`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:unver)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unver ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].verify = false; 
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Аккаунт [${acc.users[message.$match[1]].prefix}] Больше не подтверждён.`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:setagent)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 496175718) return;
		acc.users[message.$match[1]].agent = 2;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Вас назначили агентом поддержки.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы назначили игрока [${acc.users[message.$match[1]].prefix}] Агентом поддержки.`);
	}); 

	vk.updates.hear(/^(?:о проекте)$/i, (message) => {
		let dev = '';   
	return message.send(`✏Информация о боте✏
  🖊Название бота: ${config.bot} 
 📌Версия: ${config.ver} 
 📪 Пользователей: ${acc.number} 
 📍 Группа: ${config.group_url} 
 📊 Сообщений боту: ${acc.msg}
➖➖➖➖➖➖➖➖➖➖
👨‍💼Владелец/создатель бота: @nodejs_coder(Сергей)`)
});
/////////////////////////////////
	vk.updates.hear(/^(?:unagent)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.user != 496175718) return;
		acc.users[message.$match[1]].agent = 0; 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Вас сняли с поста Агента поддержки.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Аккаунт [${acc.users[message.$match[1]].prefix}] снят с поста Агента поддержки.`);
	}); 
/////////////////////////////////
	vk.updates.hear(/^(?:banrep)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		acc.users[message.$match[1]].bloks.rep = true;
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы запретили [${acc.users[message.$match[1]].prefix}] писать в репорт`);
	}); 
//////////////////////////////////
	vk.updates.hear(/^(?:unrep)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!Number(message.$match[1])) return message.send(`🔸  ID должен быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].bloks.rep = false;

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Игроку [${acc.users[message.$match[1]].prefix}] можно писать в репорт`);
	}); 
////////////////////////////////////
	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unban ID`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
		acc.users[message.$match[1]].ban = false 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  ${user.prefix} разблокировал Вас.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы разблокировали игрока [${acc.users[message.$match[1]].prefix}]`);
	}); 
////////////////////
///////////////////////////////////
	vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸  Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
		if(user.level < 2) return message.send(``);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		if(message.$match[1] == 1) {
				user.warn += 1;
				return message.send(`Нельзя! Ты получаешь 1 варн. После 3-х варнов, ты будешь забанен!`);
}

		let text = `✅  ${user.prefix} выдал вам warn (предупреждение) [${message.$match[2]}]`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n 🔸  У вас 3 предупреждения.\n🔸  Ваш аккаунт заблокирован.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`✅  Вы выдали предупреждение игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////////
	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸  Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(` 🔸  Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅  Администратор снял Вам все предупреждения`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅  Вы сняли все предупреждения игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////////
vk.updates.hear(/^(?:vig)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 Пример команды: vig [ID] `);
		if(!Number(message.$match[1])) return message.send(`🔸 Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸  Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `✅ ➾ ${user.prefix} выдал вам админ-выговор.\n✅ После 3 вас снимет с админ-поста.`
		if(acc.users[message.$match[1]].ainfo.vig == 3){
			acc.users[message.$match[1]].ainfo.vig = 0;  
			acc.users[message.$match[1]].level = 0;
			text += `\n🔸 ➾ У вас 3 предупреждения.\n🔸 Вы лишились админ-прав.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`✅ Вы выдали выговор игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 
///////////////////////////
	vk.updates.hear(/^(?:unvig)\s?([0-9]+)?/i, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 Пример команды: unwarn ID`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`Ошибка...`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ Администратор снял Вам все выговоры`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ Вы сняли все выговоры игроку [${acc.users[message.$match[1]].prefix}].`);
	}); 

vk.updates.hear(/^(?:givevip)\s?([0-9]+)\s([0-9]+)?/i, (message) => {
let user = acc.users[user_id(message.user)];
if(!message.$match[1] || !message.$match[2]) return message.send(`[Error] » Пример: givevip 1 10 (вводить только цифры 1- минута и т.д`)
if(user.level < 1) return;
acc.users[Number(message.$match[1])].viptime = getUnix() + 60000 * Number(message.$match[2])
acc.users[Number(message.$match[1])].vip = true;
return message.send(`вы выдали вип игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${message.$match[2]} минут/у`);
});

vk.updates.hear(/^(?:givepremium)\s?([0-9]+)\s([0-9]+)?/i, (message) => {
let user = acc.users[user_id(message.user)];
if(!message.$match[1] || !message.$match[2]) return message.send(`[Error] » Пример: givevip 1 10 (вводить только цифры 1- минута и т.д`)
if(user.level < 1) return;
acc.users[Number(message.$match[1])].premtime = getUnix() + 60000 * Number(message.$match[2])
acc.users[Number(message.$match[1])].premium = true;
return message.send(`вы выдали ☣Premium аккаунт игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${message.$match[2]} минут/у`);
});

    /////////////////////
    vk.updates.hear(/^(?:яхта)\s?([0-9]+)?/i, (message) => {  
    let user = acc.users[user_id(message.user)];
        if(!message.$match[1]){
            return message.send(`
        *id${message.user} (${acc.users[user_id(message.user)].prefix}), яхты: 
        🔸 1. Ванна (2.000$) 
        🔸 2. Nauticat 331 (1.000.000$) 
        🔸 3. Nordhavn 56 MS (6.000.000$) 
        🔸 4. Princess 60 (9.000.000$) 
        🔸 5. Azimut 70 (16.000.000$) 
        🔸 6. Dominator 40M (20.000.000$) 
        🔸 7. Moonen 124 (29.400.000$) 
        🔸 8. Wider 150 (36.230.000$) 
        🔸 9. Palmer Johnson 42M SuperSport (41.000.000$) 
        🔸 10. Wider 165 (53.350.000$)

        🛥 Для покупки введите: "Яхта [Номер]"
        🛥 Чтобы продать яхту напишите: "Продать яхту"
            `)
        }
    let i = message.$match[1]; 
    let ids = [0,1,2,3,4,5,6,7,8,9,10]
    let count = [0,2000,1000000,6000000,9000000,16000000,20000000,29000000,36000000,41000000,53350000];
        let names = [0, 'Ванна ','Nauticat 331','Nordhavn 56 MS','Princess 60','Azimut 70','Dominator 40M','Moonen 124','Wider 150','Palmer Johnson 42M SuperSport','Wider 165']
    if(i < 0 || i > 10) return;
    if(user.lodka != false) return message.send(`🛥 У вас уже куплена яхта`);
    if(i > 0 && i <= 10){
        if(user.balance < count[i]) return message.send(`🛥 У вас не достаточно денег.`);
        user.balance -= count[i]; 
        user.lodka = ids[i]; 
        return message.send(`🛥 Вы купили яхту (${names[i]}) за ${count[i]}$`)
    } 
 }); 
/////////////////////
    vk.updates.hear(/^(?:продать яхту)/i, (message) => {
        let count = [0, 10000,10000000, 15000000,25000000,35000000,50000000,60000000,65000000,80000000,85000000];
        let user = acc.users[user_id(message.user)];
        if(user.lodka == false) return message.send(`🛥 У вас нет яхты`)
        let sum = count[user.lodka] / 100 * 5;
        user.balance += sum; 
        user.lodka = false; 
        return message.send(` 🛥 Вы продали яхту за ${sum}$`)
    });
////////////////////
    vk.updates.hear(/^(?:компьютер)\s?([0-9]+)?/i, (message) => {  
    let user = acc.users[user_id(message.user)];
        if(!message.$match[1]){
            return message.send(`
        *id${message.user} (${acc.users[user_id(message.user)].prefix}), компьютеры
        🔸 1. Morex CASO-25  (100.000$)
        🔸 2. Zalman Z1 Black (5.000.000$)
        🔸 3. NUDT TH MPP (10.000.000$)
        🔸 4. Cray PC 16 core (25.000.000$)
        🔸 5. Hopper GTX 32 (35.000.000$)
        🔸 6. Pleiades  SGI ICE X (50.000.000$)
        🔸 7. Lindgren X8 E6 (60.000.000$)

        🖥 Для покупки введите: "Компьютер [Номер]"
        🖥 Что бы продать напишите: "Продать компьютер"
            `)
        }
    let i = message.$match[1]; 
    let ids = [0,1,2,3,4,5,6,7]
    let count = [0, 100000,5000000, 10000000,25000000,35000000,50000000,60000000];
    let names = [0, 'Morex CASO-25 60W','Zalman Z1 Black','NUDT TH MPP','Cray PC 16 core','Hopper - Cray XE6','Pleiades - SGI ICE X','Lindgren - Cray XE6']
    if(i < 0 || i > 8) return;
    if(user.pcc != false) return message.send(`🖥 У вас уже куплен компьютер`);
    if(i > 0 && i <= 8){
        if(user.balance < count[i]) return message.send(`🖥 У вас не достаточно денег.`);
        user.balance -= count[i]; 
        user.pcc = ids[i]; 
        return message.send(`🖥 Вы купили компьютер (${names[i]}) за ${count[i]}$`)
    } 
 }); 
////////////////////////
    vk.updates.hear(/^(?:продать компьютер)/i, (message) => {
        let count = [0, 10000,10000000, 15000000,25000000,35000000,50000000,60000000];
        let user = acc.users[user_id(message.user)];
        if(user.pcc == false) return message.send(`🖥 У вас нет компьютера`)
        let sum = count[user.pcc] / 100 * 5;
        user.balance += sum; 
        user.pcc = false; 
        return message.send(`🖥 Вы продали компьютер за ${sum}$`)
    });
////////////////////////// ТЕЛЕФОНЫ///////////////////////////////////////////////////
    vk.updates.hear(/^(?:телефоны)\s?([0-9]+)?/i, (message) => {  
    let user = acc.users[user_id(message.user)];
        if(!message.$match[1]){
            return message.send(`
            *id${message.user} (${acc.users[user_id(message.user)].prefix}), телефоны: 
             🔸 1. Nokia 108 (250$)
            🔸 2. Nokia 3310 (2017) (500$)
            🔸 3. ASUS ZenFone 4 (2.000$)
            🔸 4. BQ Aquaris X (10.000$)
            🔸 5. Sony Xperia XA (15.000$)
            🔸 6. Samsung Galaxy S8 (30.000$)
            🔸 7. Xiaomi Mi Mix (50.000$)
            🔸 8. Torex FS1 (75.000$)
            🔸 9. iPhone X (100.000$)
            🔸 10. Мегафон С1 (250.000$)

            📱 Для покупки введите "Телефоны [номер]"
             📱 Для продажи введите "Телефон продать"

            `)
        }
    let i = message.$match[1]; 
    let ids = [0,1,2,3,4,5,6,7,8,9,10]
    let count = [0,250,500,2000,10000,15000,30000,50000,75000,100000,250000];
        let names = [0,'Nokia 108','Nokia 3310 (2017)','ASUS ZenFone 4','BQ Aquaris X','Sony Xperia XA','Samsung Galaxy S8','Xiaomi Mi Mix','Torex FS1','iPhone X','Мегафон С1']
    if(i < 0 || i > 10) return;
    if(user.phone != false) return message.send(`📱 У вас уже куплен телефон`);
    if(i > 0 && i <= 10){
        if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
        user.balance -= count[i]; 
        user.phone = ids[i]; 
        return message.send(` 📱 Вы купили телефон (${names[i]}) за ${count[i]}$`)
    } 
 }); 
/////////////////////////
    vk.updates.hear(/^(?:телефон продать)/i, (message) => {
        let count = [0,250,500,2000,10000,15000,30000,50000,75000,100000,250000];
        let user = acc.users[user_id(message.user)];
        if(user.phone == false) return message.send(`📱 У вас нет телефона`)
        let sum = count[user.phone] / 100 * 5;
        user.balance += sum; 
        user.phone = false; 
        return message.send(`📱 Вы продали свой телефон за ${sum}$`)
    });
///////////////////
////////////////////////
    vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
        if(message.$from.type != 'user') return message.send(`⚠ Повторите попытку в ЛС группы ${config.group_url}`);
        let user = acc.users[user_id(message.user)];
        if(!message.$match[1]) return message.send(`⚠ Повторите попытку: Репорт [жалоба]`);
        if(user.bloks.rep == true) return message.send(`❌ Вам запретили писать в репорт.`)
        let a = zapret(message.$match[1]);
        if(a != 0) return message.send(a);
        user.rep.status = true;
        for(i=0;i<200000;i++){
            if(acc.users[i]){
            if(acc.users[i].agent >= 2){ 
                vk.api.call("messages.send", {
                    peer_id: acc.users[i].id,
                        message: `👉  Жалоба №${user_id(message.user)}: ${message.$match[1]}\n👉  [Для ответа: answer [ID] [TEXT]`
                }).then((res) => {}).catch((error) => {console.log('report error'); }); 
            }
        }
        }
        return message.send(`🔸  Вы успешно отправили жалобу, ожидайте ответа.`);
    });
//////////////////////////
    vk.updates.hear(/^(?:answer)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
        let user = acc.users[user_id(message.user)];
        let i = message.$match[1];
        if(user.admin.block_rep == true) return message.send(`❌ Вам нельзя отвечать на репорты!`)
        if(user.agent < 2) return;
        if(acc.users[i].rep.status !== true) return message.send(`Данному игроку уже ответили на его жалобу!`)
            if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
        let a = zapret(message.$match[2]);
        if(a !== 0) return message.send(a); 
        acc.users[message.$match[1]].rep.status = false;
        vk.api.call("messages.send", {
            peer_id: acc.users[message.$match[1]].id,
            message: `🔸Агент поддержки прислал вам ответ!\n\n➡ ${message.$match[2]}`
        });
        var is = [user_id(message.user), message.text] 
        adm_log(is)
        ans_log(is)
        user.ainfo.all_ans += 1;
        user.ainfo.ans += 1;

        return message.send(`📩 Игрок принял ответ!`)
});

    vk.updates.hear(/(?:бонус|🔑 Бонус|@sindigame 🔑 Бонус)/i, async (message) => {

    let user = acc.users[user_id(message.user)];

	if(user.bonustime > getUnix()) return message.send(`рано пришел, приходи через ${unixStampLeft(user.bonustime - Date.now())}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

   getUnix() + 86400000

	if(prize === 1)
	{
		user.balance += 50000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 50.000Р `);
	}

	if(prize === 2) 
	{
		user.bitcoin += 1000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 1.000 коинов `);
	}

	if(prize === 3)
	{
		user.rating += 5;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 5👑`);
	}

	if(prize === 4)
	{
		user.rating += 1;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 1👑`);
	}

	if(prize === 5)
	{
		user.rating += 10;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 10👑`);
	}

	if(prize === 6)
	{
		user.rating += 2;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 2👑`);
	}
	if(prize === 7)
	{
		user.rating += 3;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 3👑`);
	}
	if(prize === 8)
	{
		user.rating += 4;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 4👑`);
	}
	if(prize === 9)
	{
		user.bank += 1000000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 1.000.000 рублей на свой банковский счёт `);
	}
	if(prize === 10)
	{
		user.bank += 5000000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 5.000.000 рублей на свой банковский счёт`);
	}

	if(prize === 11)
	{
		user.bank += 10000000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 10.000.000 рублей на свой банковский счёт`);
	}

	if(prize === 12)
	{
		user.bank += 50000000;
		user.bonustime = getUnix() + 86400000;
		return message.send(`вы выиграли 50.000.000 рублей на свой банковский счёт`);
	}
});

//////////////////////
    vk.updates.hear(/^(?:ans)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
        let user = acc.users[user_id(message.user)];
        if(user.admin.block_rep == true) return message.send(`❌ Вам нельзя отвечать на репорты!`)
        if(user.level < 5) return;
            if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
        let a = zapret(message.$match[2]);
        if(a != 0) return message.send(a); 
        vk.api.call("messages.send", {
            peer_id: acc.users[message.$match[1]].id,
            message: `❇ Создатель ответил вам!\n\n➡ ${message.$match[2]}`
        }).then((res) => {}).catch((error) => {console.log('ans error'); });    
        var is = [user_id(message.user), message.text] 
        adm_log(is)
        ans_log(is)
        user.ainfo.all_ans += 1;
        user.ainfo.ans += 1;
        acc.users[message.$match[1]].rep.status = true;
        acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
        return message.send(`📩 Игрок принял ответ!`)
    });

    vk.updates.hear(/^(?:создать базу)\s?([^]+)?/i,  (message) => { 
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)];
    if(user.balance < 1800500) return message.send(`❗ Создание базы стоит 1.800.500₽`);
    if(!message.$match[1]) return message.send(`❗ Введите название базы - "Создать базы [название]"`);
    if(acc.users[id].frac_name != false) return message.send(`❗ Вы уже устроены в базе.`);
    let args =  message.$match[1];
    if(frac[args]) return message.send(`❗ база с таким названием уже существует.`);
    user.balance -= 1800500;
    frac[args] = {
        users: {},
        balance: 0,
        bank: 0,
        people: 1, 
        counts: 0,
        owner: message.user
    }
    frac[args].users[id] = {
        count: 0
    }
    user.frac_name = args;
    return message.send(`
        ✔[УСПЕШНО]  Вы создали базу "${args}"
        🔸 команды базы - 'база' [➕]
        `);
});


vk.updates.hear(/^(?:базы)/i,  (message) => { 
    let text = '🔑 Открытые базы:\n\n'
    for(i in frac){
        text += `📋 Название: ${i} | Владелец: @id${frac[i].owner}(${acc.users[user_id(frac[i].owner)].prefix})\n`
    }
    return message.send(`
    ${text}
    `);
});

vk.updates.hear(/^(?:Устроиться)\s?([^]+)?/i,  (message) => { 
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)]; 
    if(frac[message.$match[1]].owner == message.user) return message.send(`⚠ Вы уже являетесь руководителем базы "${user.frac_name}"`); 
        if(!message.$match[1]) return message.send(`⚠ Напишите точное название базы, где хотите работать. (Учитывая регистр/знаки/символы/смайлы)`);
    if(acc.users[id].frac_name != false) return message.send(`⚠ Вы уже работаете в базе`);
    let args = message.$match[1];
    if(!frac[args]) return message.send(`📘 Такой базы не существует.`);
    if(frac[args].people >= 10) return message.send(`📘 В данной базе нет места для рабочих.`)
    frac[args].people += 1;
    frac[args].users[id] = {
        count: 0
    }
    user.frac_name = args;
    return message.send(`
        ✔ Вы устроились в базу "${args}" 
        🔸 База [➕]
        `);
}); 

vk.updates.hear(/^(?:покинуть)/i,  (message) => { 
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)];  
    if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не работаете ни в одной базе.`);      
    let name = acc.users[id].frac_name;
    if(frac[name].owner == message.user) return message.send(`⚠ Управляющий не может уволиться.`); 

    frac[name].people -= 1;
    delete frac[name].users[id];

    user.frac_name = false;
    return message.send(`
        ❗ Вы уволились с базы "${name}" 
        `);
});

vk.updates.hear(/^(?:снять)/i,  (message) => { 
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)];  
    if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не работаете ни в одной базе.`);      
    let name = acc.users[id].frac_name;
    if(frac[name].owner != message.user) return message.send(`⚠ Только Управляющий может использовать это.`); 
    let sum = frac[name].balance;
    frac[name].balance = 0;
    user.balance += Number(sum);
    return message.send(`
        ❗ Вы сняли с баланса базы ${spaces(sum)}$
        `);
});

vk.updates.hear(/^(?:отработать)/i,  (message) => { 
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)];  
    if(acc.users[id].frac_name == false) return message.send(`⚠ Вы не состоите ни в одной базе.`);  
    if(user.bloks.frac == true) return message.send(`⚠ Вы уже работали в этом часу, попробуйте через час.`);     
    let name = acc.users[id].frac_name; 

    let rb = rand(100000,500000)

    frac[name].users[id].count += 1;
    frac[name].bank += rb;
     
    user.bloks.frac = true; 
        setTimeout(() => {
            user.bloks.frac = false;
    }, 3600000);

     
    return message.send(`
         ❗ Вы отработали в базе час. 
        ➕ к балансу базы ${spaces(rb)}$

        ⏳ Через 24 часа, вы получите свою зарплату за работу.
        `);
});

vk.updates.hear(/^(?:Спамчик)$/i, (message) => {

if(!message.senderId == 496175718) return message.send(`доступ разрешён только @nodejs_coder`)

setInterval(() => {
spam.sp += 1;
vk.api.wall.createComment({
owner_id: 496175718,
post_id: 589,
from_group: 175039543,
message: `Сообщение [${spam.sp}] » Ты топ`
});
}, 500);
return message.send(`Процесс пошел`);
});

updates.hear(/^(?:проверить)$/i, async (message) => { 
if(message.senderId === -1) return; 

if(!message.forwards[0]) return message.reply(`перешлите сообщение.`); 
let user = message.forwards[0].from_id;
if(!acc.users[user_id(user)]) return message.reply(`пользователь не найден.`); 
return message.reply(`🔎ID: ${user_id(user)}`); 
});


vk.updates.hear(/(?:база|💼 База|@vrbotofficial 💼 База)/i, async (message) => {
    let id = user_id(message.user)
    let user = acc.users[user_id(message.user)];
    
    if(acc.users[id].frac_name == false){
        return message.send(`
            📚 Помощь по базам.

            📚 Создать базу [название] (1.800.500₽)
            📚 Устроиться [Название] - устроиться на базу. 
            📚 Покинуть - Уволиться с базы. 
            📚 Отработать - Отработать рабочий день.
            📚 Базы - список баз.

            ❗ Работать можно 1 раз в час.
            ❗ Каждые сутки, баланс базы будет поделён между работниками.
            ❗ За одну отработку, на баланс базы зачисляется сумма от 100.000$ до 500.000$ 
        `);
    }
    let text = '';
    for(i in frac[user.frac_name].users){
        text += `👤 @id${acc.users[i].id}(${acc.users[i].prefix}) | [${frac[user.frac_name].users[i].count}] раз за 24 часа\n`
    }
         return message.send(`
            | "${user.frac_name}" | 
            💀 Управляющий: @id${frac[user.frac_name].owner}(${acc.users[user_id(frac[user.frac_name].owner)].prefix})
            👥 Работников: ${frac[user.frac_name].people}/10 
            💴 В копилке: ${frac[user.frac_name].bank}$ 
 
            📊 Статистика рабочих: 
            ${text} 

            ❗ Покинуть - Уволиться с компании. 
            ❗ Отработать - Отработать рабочий день.
        `);
});

///////////////////////////[[ФУНКЦИИ]]//////////////////////////////////////
/////////////////////////////----------/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const rotateText = {
    q: 'q',
    w: 'ʍ',
    e: 'ǝ',
    r: 'ɹ',
    t: 'ʇ',
    y: 'ʎ',
    u: 'u',
    i: 'ᴉ',
    o: 'o',
    p: 'p',
    a: 'ɐ',
    s: 's',
    d: 'd',
    f: 'ɟ',
    g: 'ƃ',
    h: 'ɥ',
    j: 'ɾ',
    k: 'ʞ',
    l: 'l',
    z: 'z',
    x: 'x',
    c: 'ɔ',
    v: 'ʌ',
    b: 'b',
    n: 'n',
    m: 'ɯ',

    й: 'ņ',
    ц: 'ǹ',
    у: 'ʎ',
    к: 'ʞ',
    е: 'ǝ',
    н: 'н',
    г: 'ɹ',
    ш: 'm',
    щ: 'm',
    з: 'ε',
    х: 'х',
    ъ: 'q',
    ф: 'ф',
    ы: 'ıq',
    в: 'ʚ',
    а: 'ɐ',
    п: 'u',
    р: 'd',
    о: 'о',
    л: 'v',
    д: 'ɓ',
    ж: 'ж',
    э: 'є',
    я: 'ʁ',
    ч: 'һ',
    с: 'ɔ',
    м: 'w',
    и: 'и',
    т: 'ɯ',
    ь: 'q',
    б: 'ƍ',
    ю: 'oı',

    Q: 'q',
    W: 'ʍ',
    E: 'ǝ',
    R: 'ɹ',
    T: 'ʇ',
    Y: 'ʎ',
    U: 'u',
    I: 'ᴉ',
    O: 'o',
    P: 'p',
    A: 'ɐ',
    S: 's',
    D: 'd',
    F: 'ɟ',
    G: 'ƃ',
    H: 'ɥ',
    J: 'ɾ',
    K: 'ʞ',
    L: 'l',
    Z: 'z',
    X: 'x',
    C: 'ɔ',
    V: 'ʌ',
    B: 'b',
    N: 'n',
    M: 'ɯ',

    Й: 'ņ',
    Ц: 'ǹ',
    У: 'ʎ',
    К: 'ʞ',
    Е: 'ǝ',
    Н: 'н',
    Г: 'ɹ',
    Ш: 'm',
    Щ: 'm',
    З: 'ε',
    Х: 'х',
    Ъ: 'q',
    Ф: 'ф',
    Ы: 'ıq',
    В: 'ʚ',
    А: 'ɐ',
    П: 'u',
    Р: 'd',
    О: 'о',
    Л: 'v',
    Д: 'ɓ',
    Ж: 'ж',
    Э: 'є',
    Я: 'ʁ',
    Ч: 'һ',
    С: 'ɔ',
    М: 'w',
    И: 'и',
    Т: 'ɯ',
    Ь: 'q',
    Б: 'ƍ',
    Ю: 'oı'

}
////////////
async function run() {
    await vk.updates.startPolling();
    console.log('Bot actived');
    restart();
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
 //------------------------------------------------------------------------------------\\
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
    // log
    function logs(id, ids, num, type) {
    /*
    type == '1' //  [Передать/pay]  
    type == '2' //  [Выдать/give]  
    type == '3' //  [Забрать/remove] 
    type == '4' //  [Выдать] админку
    type == '5' //  [Победы/setwin]
    type == '6' //  [warns | причины]
    */      
    // - - - - - - - - - - - - - - - - -  
        if(type == 1){ 
            if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
            if(!log.point[id]){ log.point[id] = { log: [] }  } 
            log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
            log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
            if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
            if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
        }
    }
    //

    // log
     
    function game_log(id, name, count, win_lose) {
 
    // - - - - - - - - - - - - - - - - -   
        if(!log.game[id]){ log.game[id] = { log: [] }  } 
        log.game[id].log.push(`[${time()} | ${data()} | ${name}] Ставка: ${count}$ | Исход: ${win_lose.toString().replace(/0/gi, "❌").replace(/1/gi, "✅")}\n`) 
        if(log.game[id].log.length >= 15){ delete log.game[id].log.shift() }  

    }
    //
 //------------------------------------------------------------------------------------\\
    function lvlup(id) {
        let text = false;
        if(acc.users[id].exs >= acc.users[id].exsup){
            acc.users[id].exs -= acc.users[id].exsup;
            acc.users[id].lvl += 1;
            if(acc.users[id].game.win < 52){acc.users[id].game.win += 1;}
            acc.users[id].exsup += new_lvl();
            text = true;
        }
        return text;
    } 
 //------------------------------------------------------------------------------------\\
    function new_lvl(iid) {
        let ids = 0
        let numbers = [10,20,30,40,50,60];
        let rand = numbers.random()
        return rand;
    }
 //------------------------------------------------------------------------------------\\
    function zapret(text) {
        let text1 = text.toLowerCase();
        let texts = 0;
        let stat = false;
        var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
        if (zaprets.test(text1) == true) { 
                texts = `📗 Некорректный запрос.` 
                stat = true;
        }
        var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
        var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
        if (filter1.test(text1) == true || filter2.test(text1) == true) { 
            texts = `📗 Некорректный запрос.` 
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
        var datas = days + ':' + month + ':2018' ;
        return datas;
    }
 //------------------------------------------------------------------------------------\\ 
    setInterval(() => {
        acc.curs = rand(30000,80000) 
        acc.bit = rand(5000,6000)
    }, 600000);


       setInterval(() =>{
        for(i=1;i<200000;i++){
            if(acc.users[i]){
                if(acc.users[i].autobiz != false){
                    acc.users[i].autobiz -= 1;
                    if(acc.users[i].autobiz == 0){acc.users[i].autobiz = false}

                    if(acc.users[i].bizs.one_biz == true){
                        acc.users[i].balance += Number(acc.users[i].bizs.one.zp)
                    }
                    if(acc.users[i].bizs.two_biz == true){
                        acc.users[i].balance += Number(acc.users[i].bizs.two.zp)
                    }
                }
                //
                if(acc.users[i].autozp != false){
                    if(acc.users[i].job.name != false){
                        acc.users[i].autozp -= 1;
                        if(acc.users[i].autozp == 0){acc.users[i].autozp = false}
                        acc.users[i].balance += Number(acc.users[i].job.count)  
                    }
                }
            }
             
        }
    }, 3600000); 
 
 
    function restart() {
            for(i=1;i < 200000; i++){  
                if(acc.users[i]){
                acc.users[i].bloks.cases = false
                acc.users[i].bloks.bonus = false
                acc.users[i].bloks.random_game = false
                acc.users[i].bloks.gun_case = false
                acc.users[i].bloks.frac = false
                acc.users[i].bloks.pay = false
                acc.users[i].bloks.a_case = false
                acc.users[i].bloks.giverub = false
                acc.users[i].job.stop = false
                acc.users[i].bizs.one.stop = false
                acc.users[i].safe.status = false;
                acc.users[i].safe.key = false;
                }
            } 
    }

// Функция

setInterval(() =>{
for(i=0;i<100000;i++){
if(acc.users[i]){
if(acc.users[i].viptime > 0){
acc.users[i].viptime = 0;
if(acc.users[i].viptime == 0){
acc.users[i].vip = false;

vk.api.call('messages.send', {
user_id: acc.users[i].id,
random_id: 0,
message: `Срок действия Вип аккаунта истек.`
});
}
}
}
}
}, 3600000);

// Функция

setInterval(() => {
for(i=0;i<100000;i++){
if(acc.users[i]){
if(acc.users[i].premtime > 0){
acc.users[i].premtime = 0;
if(acc.users[i].premtime == 0){
acc.users[i].premium = false;

vk.api.call('messages.send', {
user_id: acc.users[i].id,
random_id: 0,
message: `Срок действия premium аккаунта истек.`
});
}
}
}
}
}, 3600000);



     function adm_log(is) {
        let id = is[0]; 
        let i = config;  
        vk.api.call('messages.send', { user_id: acc.users[1].id, message: `⚠ ⚠ [ADM-LOG | User_id: @id${acc.users[is[0]].id}(${is[0]})] ⚠ ⚠\n[ -> ${is[1]} <- ]`});          
    }

     setInterval(() =>{
        for(i=0;i<100000;i++){
            if(acc.users[i]){
                if(acc.users[i].adm_time > 0){
                    acc.users[i].adm_time -= 1;
                    if(acc.users[i].adm_time == 0){
                        acc.users[i].level = 0;

                        vk.api.call('messages.send', {
                            user_id: acc.users[i].id,
                            message: `Срок действия Вип/Премиум/Модератор прав истек. Вы сняты с должности.`
                        });
                    }
                }
            }
        }
    }, 3600000);  

     setInterval(function(){
	for(i in acc.users){
		let user = acc.users[i];
			user.vozrast += 1;
				// Прибавление к возрасту.
	}
}, 3600000);
        
function getUnix() {
	return Date.now();
}

function unixStamp(stamp) {
	let date = new Date(stamp),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;

	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;

	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;

	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;

	let text = ``;

	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";

	return text;
}

setInterval(function(){
	for(i in acc.users){
		let user = acc.users[i];
		if(user.golod >= 1){
			user.golod -= 1;
		}else{
			if(user.golod == 0){
				if(user.hp >= 1){
					user.hp -= 1
				} 
			}
			if(user.hp <= 0){
				// Обнуление профиля. Персонаж умер.
			}
		}
	}
}, 1200000);

setInterval(function(){  
	for(i in limits){ 
		if(limits[i].energy >= 1){ 
			limits[i].energy -= 1; 
		}
	}

	for(i in limits){ 
		function u_id(user){
			for(i in acc.users){
				if(acc.users[i].id == user){
					return i
				}
			}
		} 
		if(limits[i].energy <= 0){ 
			let id = i;
			let uid = u_id(id); 

			if(acc.users[uid]){ 
				limits[id].energy = 60;
				if(acc.users[uid].golod >= 30){
					if(acc.users[uid].vip == 0){
						if(acc.users[uid].energy != 5){
							acc.users[uid].energy += 1;
						}
					}
					if(acc.users[uid].vip != 0){
						if(acc.users[uid].energy != 10){
							acc.users[uid].energy += 1;
						}
					}	
				} 
			} 
		}
	}
}, 60000);

function generateKeyboard(array) {
	let kb = [];
	if(array.length > 40) return false;

	for (let i = 0; i < 10; i += 1) {
		if(!array.slice(i * 4, i * 4 + 4)[0]) break;
		kb.push(array.slice(i * 4, i * 4 + 4));
	}

	kb.map((arr) => {
		arr.map((button, i) => {
			arr[i] = Keyboard.textButton({ label: button });
		});
	});

	return Keyboard.keyboard(kb);
}

setInterval(async () => {
	top = await leaderBoard();
}, 600000);
