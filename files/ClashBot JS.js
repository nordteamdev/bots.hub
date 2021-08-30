//Модули
const { VK } = require('vk-io');
const vk = new VK();
var fs = require('fs');
const commands = [];
const users = require('./users1.json');
const promo = require('./promo1.json');
const clans = require('./clans1.json');
const logi = require("./logi.json");
var pr = require('prequest');
var sent;
////////////////////
//var shortUrl = require('node-url-shortener');
/////////////////////

setInterval(async () => {
	fs.writeFileSync('./users1.json', JSON.stringify(users, null, '\t'));
	fs.writeFileSync('./promo1.json', JSON.stringify(promo, null, '\t'));
	fs.writeFileSync('./clans1.json', JSON.stringify(clans, null, '\t'));
	fs.writeFileSync("./logi.json", JSON.stringify(logi, null, "\t"))
}, 1500);

//Таймеры...
setInterval(async () => {
	users.map(x=> {
		x.activ++;
	});
}, 1000);
setInterval(async () => {
	users.map(x=> {
		x.giver = false;
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.dgive != 0).map(x=> {
		x.dgive--;
	});
}, 1000);
vk.updates.on(["chat_invite_user"], async (context, next) => {//добавился в беседу(1страница)
	context.send(`Спасибо за то,что добавил меня в беседу!\nЕсли ты создатель то выдай мне админку:D, а если нет - пиши все команды через @clashbbot пример:\n@clashbbot основать поселение\nПожалуйста, подпишись на группу`);
	});
setInterval(async () => {
	users.filter(x => x.home != false).map(x=> {
		var otn = (x.fermers*2)+(x.warriors*2)+x.works;
		var prmin = ((x.works+x.warriors+x.fermers)/20).toFixed(0);
		var prmax = ((x.works+x.warriors+x.fermers)/10).toFixed(0);
		prmax = (prmax < 1) ? 1: prmax;
		x.works += (x.food == otn) ? rand(0, prmin): (x.food > otn) ? rand(0, prmax): rand(0, prmin);
		x.works -= (x.food == otn) ? rand(0, prmin): (x.food > otn) ? rand(0, prmin): rand(0, prmax);
		x.works = (x.works < 0) ? 0: (x.works > x.derev.count) ? x.derev.count: x.works;
		x.money += x.works*5;
		x.food += x.fermers*5;
		x.food -= otn;
		x.food = (x.food < 0) ? 0: x.food;
	});
}, 60000);

setInterval(async () => {
	users.filter(x => x.bonus != 0).map(x=> {
		x.bonus -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x => x.war.timeout != 0).map(x=> {
		x.war.timeout -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x => x.war.brone != 0).map(x=> {
		x.war.brone -= 1;
	});
}, 1000);
setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.invites.length > 0).map(x=> {
		x.invites.map(z=> {
			z.time--;
			if(z.time <= 0) x.invites.splice(x.invites.indexOf(z), 1);
			});
		});
}, 60000);

setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.war.timeout > 0).map(x=> {
		x.war.timeout--;
		});
}, 1000);

setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.war.brone > 0).map(x=> {
		x.war.brone--;
		});
}, 1000);
/*----------------------------------------------------------------------------------------------------------------------------*/
vk.setOptions({
	token: '9a4fafd9315b541bde18377495981e6c0e8dd49a66d3bd03ac99f610306b9d947c42258f2455b40debfbf', //token group
	apiMode: "parallel",
	pollingGroupId: 193287416//id group
});
const { updates, snippets } = vk;

var limits = {}

/*----------------------------------------------------------------------------------------------------------------------------*/
updates.startPolling();
/*----------------------------------------------------------------------------------------------------------------------------*/
updates.on('message', async (message, next) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club193287416\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club193287416\|(.*)\]/ig, '').trim();
const [vk_user] = await vk.api.users.get({ user_id: message.senderId });
	//Регистрация игроков
if(!users.find(x=> x.id === message.senderId)) {
		const date = new Date();
		users.push({
          id: message.senderId,
		  name: vk_user.first_name,
		  home: false,
		  post: 0,
		  money: 10000, //ебаный рот
		  diamonds: 0,
		  cups: 0,
		  food: 100,
		  works: 5,
		rub5case: 0,	
		rub2case: 0,
		rub5case: 0,
		rub10case: 0,
		allornothing: 0,
	      fermers: 5,
	      warriors: 5,
	      zamok: {
		level: 1,
		up: 100
		        },
		 sad: {
			level: 1,
			count: 10,
			up: 50
			},
			armia: {
				level: 1,
				count: 10,
				up: 50
				},
				derev: {
				level: 1, //а не че так секс
				count: 10,
				up: 50
				  },
		  dgive: 0,
	      bonus: 0,
		  activ: 0,
		  monster: 0,
		  glaz: true,
		  ban: false,
		  token: false,
		  war: {
			timeout: 0,
			user: false,
			brone: 0
			},
			clan: -1,
			veranstaltung: 0,
			leistung: 0,
			klik: 1000,
			sunduk1: 5,
			sunduk2: 3,
			refka: 0,
			refproverka: false,
			ban_pay: false,
			all_pay: 0,
		  uit: users.length,
          uid: users.length
		});
	}

	i = users.filter(x=> x.id === message.senderId).map(x=> x.uid);
    i = users[i[0]];
    
	i0 = users.find(x => x.id === message.senderId)

	let referalochka = (message.payload.message.ref);
	if (referalochka) {
		if (i.refproverka == true) return;
		var u4 = users.find(x => x.id == referalochka);
		if (u4.id == i.id) return;
		let statusref = '';
		i.refproverka = true;
		if (referalochka == 581521418) {
i.diamonds += 35;
message.send('🎉 Вы перешли по реф ссылке кодера и получаете 30 💎!');
}
		i.diamonds += 35;
		u4.diamonds += 35;
		u4.refka += 1;
		if (u4.refka == 55) {
			if (u4.post < 1) {
				u4.post = 1;
				statusref = '\n🎁 Вы пригласили 55 человек и получаете статус VIP!';
			}
		}
		if (u4.refka == 60) {
			if (u4.post < 2) {
				u4.post = 2; //хуя писаюн
				statusref = '\n👑 Вы пригласили 60 человек и получаете статус Гладиатор!';
			}
		}
		vk.api.messages.send({ user_id: referalochka, message: `🔗 Игрок ${i.name} перешёл по вашей реферальной ссылке!\n🎉 Вы получаете по 35  💎!${statusref}`});
	}

 const bot = (text, params) => {
		return message.send(text, params)
	}
	
	let messageArray = message.text.split(" ");
let com1 = messageArray[0].toLowerCase()
let argy = messageArray;
	
	sent = (msg, keyb) => {
message.send(msg, {keyboard: keyb});
	}

	if (!limits[i.id]) {
		limits[i.id] = {
			pay: false,
			//Сюда вписывать новые лимиты (переменные, НЕ В ПРОФИЛИ!)
		}
	}

	if(i.ban == true && i.id != 468094275) return;
	if(com1 == "основать"){
		if(i.home != false) return message.send("📛| У вас уже основано поселение!");
		if(!argy[1]) return message.send("📛| Введите название поселения!");
		if(argy[1].length > 25) return message.send("📛| Название поселения не должно превышать 25 символов!");
		i.home = argy[1];
		i.activ = 0;
		return sent("👕Вы успешно основали поселение!", menu[0]);
		}
		if(com1 == "disconnect"){
			if(i0.uid == i0.uit) return message.send("📛| Вы и так не подключены к аккаунту!");
			i0.uid = i0.uit;
			message.send("💾Сеанс работы с аккаунтом успешно закончен!");
			}
		
		if(i.home == false) return message.send("[🌐]\nДля начала игры напиши: Основать [слово]\nБуду благодарен, если подпишешься на группу\nУ нас так-же есть беседа игроков\nhttps://vk.me/join/AJQ1dybJ4haQSGc_VkTbC0F0");

	if (i.veranstaltung == 0) {
		message.send('🎉 Хей хей, ивент!\nНапиши "Сундуки" или "Клик" и спеши за наградой!\nТеперь в боте есть реферальная программа!\nСейчас за приглашение 25 людей ты получишь ГЛАДИАТОРА БЕСПЛАТНО😉')
		i.veranstaltung = 1;
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;
	if(i.home == false) return;
	i.activ = 0;
/*----------------------------------------------------------------------------------------------------------------------------*/
//try { await next(); } catch (err) { console.error(err) }
/*----------------------------------------------------------------------------------------------------------------------------*/
 args = message.text.match(command[0]);
	await command[1](message, bot);
	
});

/*----------------------------------------------------------------------------------------------------------------------------*/
/*
async function run() {
	await vk.updates.startPolling();
}

run().then(() => {
	console.log('[START]');
})

.catch((error) => {
	console.error('[ERROR] | ' + error);
});
*/
/*----------------------------------------------------------------------------------------------------------------------------*/

const cmd = {
	on: (p, f) => {
		commands.push([p, f]); //ого технологии
	}
}

//Функции...

function sp(string) {
	try{
	if (typeof string !== "string") string = string.toString();
var syt = string;
		string = (syt.length >= 21) ? syt: string;
		return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
		}catch(zz){
			return string
			}
	};

function scl(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

function timer(seconds) {
    if(seconds == "") return "0 секунд"
    var hours = parseInt(seconds/3600 );
    seconds = seconds%3600;
    var minutes = parseInt(seconds/60); 
    seconds = seconds%60;
    hours = (hours == 0 ? "" : hours + " " + scl(hours, ["час", "часа", "часов"]))
    minutes = (minutes == 0 ? "" : minutes + " " + scl(minutes, ["минуту", "минуты", "минут"]))
    seconds = (seconds == 0 ? "" : seconds + " " + scl(seconds, ["секунду", "секунды", "секунд"]))
    var gone = hours + " " + minutes + " " + seconds
    return gone
};

function repl(num){
	var sjop = num.replace(/(k|K|К|к)/ig, "000")
   sjop = sjop.replace(/(все|Все|Всё|всё)/ig, i.money)
   sjop = (sjop < 1) ? 1: sjop;
	return [sjop]
};

function getr(num){
	num = (num < 0) ? "Раб": 
	(num == 0) ? "Игрок":
	(num == 1) ? "VIP":
	(num == 2) ? "Гладиатор":
	(num == 3) ? "Модератор":
	(num == 4) ? "Тех-Администратор":
	(num == 5) ? "CODER":
	(num > 5) ? "ЧСВ": "Ошибка";
	return [num]
	}
	
	function nodonate(num) {
		var flepsj = (`📛Для использования этой команды нужна привилегия: ${getr(num)} или выше!
		💲Купить привилегию можно в нашем донат магазине для этого вы можете нажать кнопку "Донат" или Написать: "Донат"`)
		return flepsj;
		}

function fix(num) {
num = Number(num)
num = num.toFixed(0)
num = Number(num)
return [num]
}

function rand(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}

function token_generate(){
var tokey = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var tokey2 = "";
while(tokey2.length < 25){
	tokey2 += tokey[rand(0, tokey.length-1)]
	}
	return tokey2;
}

//Команды

var config = {
	group: 'https://vk.com/clashbbot' //используй " " так лучше, мне больше нравитса
} //поставь ; а то никрасива

cmd.on(/^(?:Реф|Реферал|Рефералы|ref|рефка|Помощь|👥Реф)$/i, async (message, bot) => {
	var link = (config.group.replace("https://vk.com/", "vk.me/") + "?ref=" + i.id);
	message.send("🔗 Распространяйте свою ссылку, за каждого нового игрока вам и игроку начислят по 35 алмазов 💎!\n\n🎁 За 55 приглашенных игроков вы получите статус VIP!\n\n👑 За 60 приглашённых игроков вы получите статус Гладиатор!");
	message.send(link);
});

/*vk.api.utils.getShortLink({ attachment: link }).then((res) => {
	sent("sex: "+res.short_url);🧰
});*/
 /* Эта дачь пость ещё поэбёт, будут короткие хуи, всё не так секс, да ну хануй
 shortUrl.short('https://pornhub.com', function (err, url) {
	console.log(url);
});*/
cmd.on(/^(?:adm_ref)$/i, async (message, bot) => {
if (i.id != 243266080 && i.id != 581521418) return;
for (i in users) {
users[i].refproverka = false;
}
return message.send('✨ Готово!');
});
//КЕЙСЫ 









cmd.on(/^(?:Кейс1)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Кейс1",
           amount: (args[1]),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (2),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку кейс(а/ов): ${sexx0}`);
});

cmd.on(/^(?:Кейс2)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Кейс2",
           amount: (args[1] * 2),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (3),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку кейс(а/ов): ${sexx0}`);
});

cmd.on(/^(?:Кейс3)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Кейс3",
           amount: (args[1] * 5),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (4),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку кейс(а/ов): ${sexx0}`);
});

cmd.on(/^(?:Кейс4)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Кейс4",
           amount: (args[1] * 10),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (5),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку кейс(а/ов): ${sexx0}`);
});


cmd.on(/^(?:Кейс5)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Кейс5",
           amount: (args[1] * 50),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (6),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку кейс(а/ов): ${sexx0}`);
});



//КЕЙСЫ











cmd.on(/^(?:Валюта)\s([0-9]+)$/i, async (message, bot) => {
	if(args[1] < 1) return;
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Валюта",
           amount: (args[1]),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (1),
           field3: (args[1])
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку: ${sexx0}`);
});

cmd.on(/^(?:клик|кликнуть|кликать)$/i, async (message, bot) => {
	if (i.klik == 0) return message.send('Вы откликали весь ивент! Попробуйте сундуки!');
	i.klik -= 1;
	let von = rand(1, 2)
	let mone = 1000;
	let diamon = 1;
	switch (von) {
		case 1:
			i.money += mone;
			message.send(`Вам выпали ${mone} 💰, теперь их количество ${i.money}`, { keyboard: JSON.stringify({ buttons: [[{ action: { type: "text", label: "Клик" }, color: "positive" }]], inline: true }) });
			break;
		case 2:
			i.diamonds += diamon;
			message.send(`Вам выпали ${diamon} 💎, теперь их количество ${i.diamonds}`, { keyboard: JSON.stringify({ buttons: [[{ action: { type: "text", label: "Клик" }, color: "positive" }]], inline: true }) });
			break;
	}
});

let kodsunduk3 = 0;
let sunduk3 = 0;
let kodsunduk4 = 0;
let sunduk4 = 0;

//ГОВНОКЕЙСЫ

cmd.on(/^(?:Кейс1|Кейсы1)$/i, async (message, bot) => {
	var cmoney = rand(100000,3000000)
	var cdiamonds = rand(10,100)
	if(i.rub1case == 0) return message.send("Купи кейс написав [Кейсы] ");
	if(i.rub1case != 0) 
	message.send(`
	Спасибо за покупку :)
	Вы получаете:
	${cmoney} денег
	${cdiamonds} алмазов
	Если не тяжело, купи еще один :)
	`)
	i.money += cmoney
	i.diamonds += cdiamonds
	i.rub1case -= 1;
	});


	cmd.on(/^(?:Кейс2|Кейсы2)$/i, async (message, bot) => {
	var cmoney = rand(500000,4000000)
	var cdiamonds = rand(10,200)
	if(i.rub2case == 0) return message.send("Купи кейс написав [Кейсы] ");
	if(i.rub2case != 0) 
	message.send(`
	Ух-ты :З 
	Спасибо за покупку {0_0}
	За такую щедрость вы получаете:
	${cmoney} денег
	${cdiamonds} алмазов
	Если не тяжело, купи еще один :)
	`)
	i.money += cmoney
	i.diamonds += cdiamonds
	i.rub2case -= 1;
	});


	cmd.on(/^(?:Кейс3|Кейсы3)$/i, async (message, bot) => {
		var cmoney = rand(1000000,10000000)
		var cdiamonds = rand(10,500)
		var case1 = rand(0,4)
		if(i.rub5case == 0) return message.send("Купи кейс написав [Кейсы] ");
		if(i.rub5case != 0) 
		message.send(`
		Да ты крейзи :P
		{00__00} 
		Спасибо за покупку {0_0}
		Это для меня ооооооочень много:)
		За такую щедрость вы получаете:
		${cmoney} денег
		${cdiamonds} алмазов
		${case1} 1-х кейсов
		Если не тяжело, купи еще один :)
		`)
	i.money += cmoney
	i.diamonds += cdiamonds
		i.rub5case -= 1;
		i.rub1case += case1
		});


		cmd.on(/^(?:Кейс4|Кейсы4)$/i, async (message, bot) => {
		var cmoney = rand(1000000,30000000)
		var cdiamonds = rand(10,700)
		var case1 = rand(0,3)
		if(i.rub10case == 0) return message.send("Купи кейс написав [Кейсы] ");
		if(i.rub10case != 0) 
		message.send(`
		Да ты крейзи :P
		{00__00}
		Я тебя люблю :) 
		Спасибо за покупку {0_0}
		Это для меня ооооооочень много:)
		За такую щедрость вы получаете:
		${cmoney} денег
		${cdiamonds} алмазов
		кейсов второго уровня ${case1} 
		Если не тяжело, купи еще один :)
		`)
	i.money += cmoney
	i.diamonds += cdiamonds
		i.rub10case -= 1;
		i.rub2case += case1
		});


				cmd.on(/^(?:Кейс5|Кейсы5)$/i, async (message, bot) => {
			if(i.allornothing == 0) return message.send("Купи кейс написав [Кейсы] ");
			if(i.allornothing != 0)
		var vipp = rand(1,10)
		var glad = rand(1,10)
		var Administartor = rand(1,1000)
		var moder = rand(1,10)
		if(vipp == 1) message.send ("Ты выиграл вип")
		i.post = 1 ;
		if(glad == 1)  message.send("Ты выиграл гладиатора")
		i.post = 2 ;
		if(moder == 1)  message.send("Ты выиграл Модератора")
		i.post = 3 ;
		if(Administartor == 1)  message.send("Ты выиграл админку, УРА")
		i.post = 4;
	    if(Administartor != 1 && vipp != 1 && moder != 1 && glad != 1) return message.send("ты ничего не выиграл.")
		i.allornothing -= 1;
		});
cmd.on(/^(?:Вип|Квип)$/i, async (message, bot) => {
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "вип",
           amount: (30),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (7),
           field3: 1
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку випа : ${sexx0}`);
});
cmd.on(/^(?:Гладиатор|Кгладиатор)$/i, async (message, bot) => {
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Глад",
           amount: (40),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (8),
           field3: 1
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку ГЛАДИАТОРА : ${sexx0}`);
});
cmd.on(/^(?:Модератор|Кмодератор)$/i, async (message, bot) => {
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Модер",
           amount: (70),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (9),
           field3: 1
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку Модератора : ${sexx0}`);
});
cmd.on(/^(?:Администратор|Кадминистратор|Кадмин|Админ)$/i, async (message, bot) => {
	var doshik = {
           shop_id: ad0.shop_id,
           secret_key: ad0.sex_key,
           desc: "Админ",
           amount: (140),
           pay_id: Number(i.id + rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id, 
           field2: (10),
           field3: 1
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             field3: doshik.field3,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        var ultra_sex = vk.api.utils.getShortLink({ url: sexx0 }); //чет не рабит
        
       bot(`💦Ссылка на покупку Администратора : ${sexx0}`);
});

cmd.on(/^(?:Кейсы|Кеисы)$/i, async (message, bot) => {
				message.send(`Это меню покупки кейсов, привет :D

							  Кейс#1 цена 1 рубль.:
							  Валюта: от 100.000 до 3.000.000
							  Алмазы: от 10 до 100
							  Шанс на АДМИНИСТРАТОРА 1%

							  Кейс#2 цена 2 рубля.:
							  Валюта: от 500.000 до 4.000.000
							  Алмазы: от 10 до 200
							  Шанс на АДМИНИСТРАТОРА 5%

							  Кейс#3 цена 5 рублей.:
							  Валюта: от 1.000.000,10.000.000
							  Алмазы: от 10 до 500
							  Шанс на АДМИНИСТРАТОРА 9%

							  Кейс#4 цена 10 рублей
							  Валюта: от 1.000.000 до 30.000.000
							  Алмазы: от 10 до 700
							  Кейс1: до 10
							  Шанс на АДМИНИСТРАТОРА 13%

							  Кейс#5 ВСЁ ИЛИ НИЧЕГО цена 5Р:
							  На администратора 99%
							  На бан 1%
							  Для покупки кейса пиши:
							  Кейс1 [Кол-во] 
							  Кейс2 [Кол-во]
							  Кейс3 [Кол-во]
							  Кейс4 [Кол-во]			
							  Кейс5 [Кол-во] 
							  Пример: 
							  Кейс1 1
				`)
				
				
							});




//КОНЕЦ ИМ
cmd.on(/^(?:Сундук|Сундуки)$/i, async (message, bot) => {
	message.send(`Добро пожаловать на полянку потерянных сундуков!\nУ каждого есть возможность отрыть сундук с однозначным и 2-х значным паролем!\nА вооон там на холмике сундуки с 3-х и 4-х значным паролем,\nони достануться только кому-то одному!\n
Что бы попытаться открыть сундук напиши:\n"Сундук [1-4 тип сундука] [код]"\n
Внимание! Пароли для однозначного и двухзначного сундука меняются каждый раз, но количество попыток не ограничено!\n А вот для 3-х и 4-х значных пароли фиксированы!`)
});
//у сука жара
cmd.on(/^(?:Сундук)\s?([0-9]+)?\s?([0-9]+)?$/i, async (message, bot) => {
	let sunduk = args[1];
	let kodsunduk = args[2];
	if (sunduk == 1) {
		if (i.sunduk1 == 0) return message.send('❌ Вы уже открыли все сундуки с однозначным паролем!');
		let randkod = rand(0, 9);
		if (kodsunduk != randkod) return message.send('Сундук с однозначным паролем\n🔑 Код не подошёл!');
		if (kodsunduk == randkod) {
			i.sunduk1 -= 1;
			let von = rand(1, 2)
			let mone = rand(10000, 25000)
			let diamon = rand(10, 25)
			switch (von) {
				case 1:
					i.money += mone;
					message.send(`   Поздравляем, вы сумели открыть сундук с однозначным паролем! 🎉\nСундуков осталось: ${i.sunduk1}\nВам выпало ${mone} 💰, теперь их количество ${i.money}`)
					break;
				case 2:
					i.diamonds += diamon;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с однозначным паролем! 🎉\nСундуков осталось: ${i.sunduk1}\nВам выпало ${diamon} 💎, теперь их количество ${i.diamonds}`)
					break;
			}
		}
		return;
	}

	if (sunduk == 2) {
		if (i.sunduk2 == 0) return message.send('❌ Вы уже открыли все сундуки с двухзначным паролем!');
		let randkod = rand(0, 99);
		if (kodsunduk != randkod) return message.send('Сундук с двухначным паролем\n🔑 Код не подошёл!');
		if (kodsunduk == randkod) {
			i.sunduk2 -= 1;
			let von = rand(1, 2)
			let mone = rand(25000, 50000)
			let diamon = rand(25, 50)
			switch (von) {
				case 1:
					i.money += mone;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с двухначным паролем! 🎉\nСундуков осталось: ${i.sunduk2}\nВам выпало ${mone} 💰, теперь их количество ${i.money}`)
					break;
				case 2:
					i.diamonds += diamon;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с двухзначным паролем! 🎉\nСундуков осталось: ${i.sunduk2}\nВам выпало ${diamon} 💎, теперь их количество ${i.diamonds}`)
					break;
			}
		}
		return;
	}

	if (sunduk == 3) {
		if (sunduk3 == 0) return message.send('❌ Кто-то опередил вас, этот сундук уже открыт!');
		if (i.post > 2) return message.send('❌ Модерам и админам нельзя, читерите тупо, доверия вам нет)!');
		if (kodsunduk != kodsunduk3) return message.send('Сундук с 3-х значным паролем\n🔑 Код не подошёл!');
		if (kodsunduk == kodsunduk3) {
			sunduk3 -= 1;
			let von = rand(1, 3)
			let mone = rand(50000, 100000)
			let diamon = rand(50, 100)
			switch (von) {
				case 1:
					i.money += mone;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 3-х значным паролем! 🎉\nВам выпало ${mone} 💰, теперь их количество ${i.money}`)
					break;
				case 2:
					i.diamonds += diamon;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 3-х значным паролем! 🎉\nВам выпало ${diamon} 💎, теперь их количество ${i.diamonds}`)
					break;
				case 3:
					if (i.post > 0) {
						i.diamonds += 99;
						message.send(`🎉 Поздравляем, вы сумели открыть сундук с 3-х значным паролем! 🎉\nВам выпал статус VIP, но поскольку он у вас уже есть, вы получаете 99 💎!`)
						break;
					}
					i.post = 1;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 3-х значным паролем! 🎉\nВам выпал статус VIP!`)
					break;
			}
		}
		if (i0.id == 243266080 || i0.id == 581521418) {
			message.send('🗡 БЕЙ ОДМЕНА! ОН ЗНАЛ ПАРОЛЬ, БЕЙ ЕГА!!!\nОДМЕН:', { attachment: ['photo-193287416_457239169'] });
			message.send({ attachment: ['photo-193287416_457239170'] });
		}
		return;
	}

	if (sunduk == 4) {
		if (sunduk4 == 0) return message.send('❌ Кто-то опередил вас, этот сундук уже открыт!');
		if (i.post > 2) return message.send('❌ Модерам и админам нельзя, читерите тупо, доверия вам нет)!');
		if (kodsunduk != kodsunduk4) return message.send('Сундук с 4-х значным паролем\n🔑 Код не подошёл!');
		if (kodsunduk == kodsunduk4) {
			sunduk4 -= 1;
			let von = rand(1, 3)
			let mone = rand(500000, 1000000)
			let diamon = rand(500, 1000)
			switch (von) {
				case 1:
					i.money += mone;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 4-х значным паролем! 🎉\nВам выпало ${mone} 💰, теперь их количество ${i.money}`)
					break;
				case 2:
					i.diamonds += diamon;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 4-х значным паролем! 🎉\nВам выпало ${diamon} 💎, теперь их количество ${i.diamonds}`)
					break;
				case 3:
					if (i.post > 1) {
						i.diamonds += 999;
						message.send(`🎉 Поздравляем, вы сумели открыть сундук с 4-х значным паролем! 🎉\nВам выпал статус Гладиатор, но поскольку он у вас уже есть, вы получаете 999 💎!`)
						break;
					}
					i.post = 2;
					message.send(`🎉 Поздравляем, вы сумели открыть сундук с 4-х значным паролем! 🎉\nВам выпал статус Гладиатор!`)
					break;
			}
		}
		if (i0.id == 243266080 || i0.id == 581521418) {
			message.send('🗡 БЕЙ ОДМЕНА! ОН ЗНАЛ ПАРОЛЬ, БЕЙ ЕГА!!!\nОДМЕН:', { attachment: ['photo-193287416_457239169']});
			message.send({ attachment: ['photo-193287416_457239170'] });
		}
		return;
	}
	return message.send('❗ Пример команды: "Сундук[1 - 4 тип сундука][код]"');
});

cmd.on(/^(?:adm_sunduk)\s?([0-9]+)?\s?([0-9]+)?$/i, async (message, bot) => {//спалю кмд
	if (i.id != 243266080 && i.id != 581521418) return;
	let sunduk = args[1];
	let kodsunduk = args[2];
	if (sunduk == 3) {
		kodsunduk3 = kodsunduk;
		sunduk3 = 1;
		return message.send('🔑 Код успешно установлен!'); //а может сек?%с
	}
	if (sunduk == 4) {
		kodsunduk4 = kodsunduk;
		sunduk4 = 1;//может тут 2 поставить?
		return message.send('🔑 Код успешно установлен!');
	}
	return message.send('Админка не тупи) Пример команды для тебя: "adm_sunduk [3 или 4 значный сундук] [пароль]"');
});

cmd.on(/^(?:adm_klik)\s?([0-9]+)?$/i, async (message, bot) => {
if (i.id != 243266080 && i.id != 581521418) return;
let klik = args[1];
for (i in users) {
users[i].klik = klik;
}
return message.send('✨ Готово!');
});

cmd.on(/^(?:Деактивировать событие)$/i, async (message, bot) => {
if (i.id != 243266080 && i.id != 581521418) return;
for (i in users) {
users[i].veranstaltung = 1;
users[i].klik = 0;
users[i].sunduk1 = 0;
users[i].sunduk2 = 0;
}
return message.send('❌ Собитие деактивировано! ❌'); //за такое банят..
});

cmd.on(/^(?:Активировать событие)$/i, async (message, bot) => {
if (i.id != 243266080 && i.id != 581521418) return;
for (i in users) {
users[i].veranstaltung = 0;
users[i].klik = 1000;
users[i].sunduk1 = 5;
users[i].sunduk2 = 3;
}
return message.send('🎉 Собитие активировано! 🎉');
});
cmd.on(/^(?:Поселение|🎫Поселение|Профиль|Проф|🏡Домой|Домой)$/i, async (message, bot) => {
var fopot = i.works+(i.warriors*2)+(i.fermers*2);
var fodox = i.fermers*5;
var modox = i.works*5;
sent(`[🎫]Ваше поселение:
➖➖➖➖➖➖➖➖
💈| Номер: ${i.uid}
📋| Название: ${i.home}
🔱| Статус: ${getr(i.post)}
🔰| Клан: ${(i.clan > -1) ? clans[i.clan].name : ""}${(i.clan > -1) ? "[" + i.clan + "]" : "Отсутствует"}
🔗| Игроков приглашено: ${i.refka}

[💵]Бюджет: ${sp(i.money)}
[💎]Алмазов: ${sp(i.diamonds)}
[🏆]Кубков: ${sp(i.cups)}
[🍗]Еда: ${sp(i.food)}
[💀]Побеждённых монстров: ${i.monster}

[👲]Жителей: [${sp(i.works)}/${sp(i.derev.count)}]
[🍎]Фермеров: [${sp(i.fermers)}/${sp(i.sad.count)}]
[🔫]Воинов: [${sp(i.warriors)}/${sp(i.armia.count)}]

|💲|Доход ($): ${sp(modox)}$/мин.
|🍟|Сбор (🍎): ${sp(fodox)}/мин.
|🍌|Потребление (🍎): ${sp(fopot)}/мин.`, menu[0]);
});

cmd.on(/^(?:👥Люди|Люди|👥Назад)$/i, async (message, bot) => {
sent(`[👥] - Люди - [👥]
✅Это раздел найма людей, здесь вы можете обучить жителей на: воинов или фермеров. Фермеры служат для добычи еды, собирая 5ед. еды в минуту, но расходуя 2 ед. еды в минуту. Воины служат для защиты и атаки и потребляют 2 ед. еды в минуту. Жители зарабатывают по 5$ в минуту и потребляют 1ед. еды в минуту.`, ludi[0]);
});

cmd.on(/^(?:🍎Фермеры|Фермеры)$/i, async (message, bot) => {
sent(`[🍎] - Фермеры - [🍎]
💲Цена найма 1 фермера - 5000$
➖➖➖➖➖
🔹Доступен ручной ввод:
🍎| Фермеры [кол-во] - обучение фермеров.`, nfermers[0]);
});

cmd.on(/^(?:🔫Воины|Воины)$/i, async (message, bot) => {
sent(`[🔫] - Воины - [🔫]
💲Цена найма 1 воина - 1500$
➖➖➖➖➖
🔹Доступен ручной ввод:
🔫| Воины [кол-во] - обучение воинов.`, nwarriors[0]);
});

cmd.on(/^(?:🍎Фермеры|Фермеры|🍎)\s([^]+)$/i, async (message, bot) => {
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.fermers+count > i.sad.count) return message.send("📛| Не хватает мест в саду!");
if(i.money < count*5000) return message.send("📛| Для найма требуется: "+sp(count*5000)+"$!");
i.money -= count*5000;
i.fermers += count;
sent("🍎Фермеры успешно наняты!", nfermers[0]);
});

cmd.on(/^(?:🔫Воины|Воины|🔫)\s([^]+)$/i, async (message, bot) => {
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.warriors+count > i.armia.count) return message.send("📛| Не хватает мест в армии!");
if(i.money < count*1500) return message.send("📛| Для найма требуется: "+sp(count*1500)+"$!");
i.money -= count*1500;
i.warriors += count;
sent("🔫Воины успешно наняты!", nwarriors[0]);
});

cmd.on(/^(?:🏭Здания|Здания|🏭Назад)$/i, async (message, bot) => {
	var dmo1 = (i.money >= i.zamok.up) ? "✅": "❌";
	var dmo2 = (i.money >= i.derev.up && i.derev.level+1 <= i.zamok.level) ? "✅": "❌";
	var dmo3 = (i.money >= i.sad.up && i.sad.level+1 <= i.zamok.level) ? "✅": "❌";
	var dmo4 = (i.money >= i.armia.up && i.armia.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[🏭] - Здания - [🏭]
➖➖➖➖➖
🏠Штаб[${i.zamok.level}] - (${dmo1})

👒Деревня[${i.derev.level}] - (${dmo2})
(Вместимость: ${i.derev.count} жителей)

🍇Сад[${i.sad.level}] - (${dmo3})
(Вместимость: ${i.sad.count} фермеров)

💪Армия[${i.armia.level}] - (${dmo4})
(Вместимость: ${i.armia.count} воинов)
`, homsd);
});

cmd.on(/^(?:🏠Штаб|Штаб)$/i, async (message, bot) => {
	var cost1 = (i.money >= i.zamok.up) ? "✅": "❌";
sent(`[🏠]Штаб:
🔝| Уровень: ${i.zamok.level}

✔Улучшение:
[💲]: ${sp(i.zamok.up)}$ (${cost1})`, zdan1[0]);
});

cmd.on(/^(?:🏠Улучшить)$/i, async (message, bot) => {
	if(i.money < i.zamok.up) return message.send("📛| Не хватает $!");
	i.money -= i.zamok.up;
	i.zamok.level++;
	i.zamok.up += Number((i.zamok.up*0.15).toFixed(0));
var cost1 = (i.money >= i.zamok.up) ? "✅": "❌";
sent(`[🏠]Штаб:
🔝| Уровень: ${i.zamok.level}

✔Улучшение:
[💲]: ${sp(i.zamok.up)}$ (${cost1})
———
Штаб улучшен!`, zdan1[0]);
});

cmd.on(/^(?:👒Деревня|Деревня)$/i, async (message, bot) => {
	var cost1 = (i.money >= i.derev.up) ? "✅": "❌";
	var cost2 = (i.derev.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[👒]Деревня:
🔝| Уровень: ${i.derev.level}
👥| Вместимость: ${sp(i.derev.count)} жителей

✔Улучшение:
[💲]: ${sp(i.derev.up)}$ (${cost1})
[🏠]: Штаб ${i.derev.level+1} уровня (${cost2})`, zdan2[0]);
});

cmd.on(/^(?:👒Улучшить)$/i, async (message, bot) => {
	if(i.money < i.derev.up) return message.send("📛| Не хватает $!");
	if(i.derev.level+1 > i.zamok.level) return message.send("📛| Для начала улучшите штаб!");
	i.money -= i.derev.up;
	i.derev.level++;
	i.derev.up += Number((i.derev.up*0.15).toFixed(0));
	i.derev.count += Number((i.derev.count*0.10).toFixed(0));
var cost1 = (i.money >= i.derev.up) ? "✅": "❌";
var cost2 = (i.derev.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[👒]Деревня:
🔝| Уровень: ${i.derev.level}
👥| Вместимость: ${sp(i.derev.count)} жителей

✔Улучшение:
[💲]: ${sp(i.derev.up)}$ (${cost1})
[🏠]: Штаб ${i.derev.level+1} уровня (${cost2})
———
Деревня улучшена!`, zdan2[0]);
});

cmd.on(/^(?:🍇Сад|Сад)$/i, async (message, bot) => {
	var cost1 = (i.money >= i.sad.up) ? "✅": "❌";
	var cost2 = (i.sad.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[🍇]Сад:
🔝| Уровень: ${i.sad.level}
👥| Вместимость: ${sp(i.sad.count)} фермеров

✔Улучшение:
[💲]: ${sp(i.sad.up)}$ (${cost1})
[🏠]: Штаб ${i.sad.level+1} уровня (${cost2})`, zdan3[0]);
});

cmd.on(/^(?:🍇Улучшить)$/i, async (message, bot) => {
	if(i.money < i.sad.up) return message.send("📛| Не хватает $!");
	if(i.sad.level+1 > i.zamok.level) return message.send("📛| Для начала улучшите штаб!");
	i.money -= i.sad.up;
	i.sad.level++;
	i.sad.up += Number((i.sad.up*0.15).toFixed(0));
	i.sad.count += Number((i.sad.count*0.10).toFixed(0));
var cost1 = (i.money >= i.sad.up) ? "✅": "❌";
var cost2 = (i.sad.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[🍇]Сад:
🔝| Уровень: ${i.sad.level}
👥| Вместимость: ${sp(i.sad.count)} фермеров

✔Улучшение:
[💲]: ${sp(i.sad.up)}$ (${cost1})
[🏠]: Штаб ${i.sad.level+1} уровня (${cost2})
———
Сад улучшен!`, zdan3[0]);
});

cmd.on(/^(?:💪Армия|Армия)$/i, async (message, bot) => {
	var cost1 = (i.money >= i.armia.up) ? "✅": "❌";
	var cost2 = (i.armia.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[💪]Армия:
🔝| Уровень: ${i.armia.level}
👥| Вместимость: ${sp(i.armia.count)} воинов

✔Улучшение:
[💲]: ${sp(i.armia.up)}$ (${cost1})
[🏠]: Штаб ${i.armia.level+1} уровня (${cost2})`, zdan4[0]);
});

cmd.on(/^(?:💪Улучшить)$/i, async (message, bot) => {
	if(i.money < i.armia.up) return message.send("📛| Не хватает $!");
	if(i.armia.level+1 > i.zamok.level) return message.send("📛| Для начала улучшите штаб!");
	i.money -= i.armia.up;
	i.armia.level++;
	i.armia.up += Number((i.armia.up*0.15).toFixed(0));
	i.armia.count += Number((i.armia.count*0.10).toFixed(0));
var cost1 = (i.money >= i.armia.up) ? "✅": "❌";
var cost2 = (i.armia.level+1 <= i.zamok.level) ? "✅": "❌";
sent(`[💪]Армия:
🔝| Уровень: ${i.armia.level}
👥| Вместимость: ${sp(i.armia.count)} воинов

✔Улучшение:
[💲]: ${sp(i.armia.up)}$ (${cost1})
[🏠]: Штаб ${i.armia.level+1} уровня (${cost2})
———
Армия улучшена!`, zdan4[0]);
});

cmd.on(/^(?:🎁Бонус|Бонус)$/i, async (message, bot) => {
if(i.bonus != 0) return message.send("📛| Подождите еще: "+timer(i.bonus)+"\n\n🎁Брать бонус можно раз в 24 часа!");
i.bonus = 86400;
var alm = rand(1, 5);
if(alm == 5) {
	var diam = [1, 3, 5, 10, 25];
	diam = diam[rand(0, 4)];
	i.diamonds += diam;
	return sent(`🎁Из ежедневного бонуса вам выпало: ${diam} алмазов!
(Следующий бонус вы сможете получить через 24 часа!)`, menu[0]);
	}
	var bmon = [1000, 3000, 5000, 25000, 100000];
    bmon = bmon[rand(0, 4)];
    i.money += bmon;
    sent(`🎁Из ежедневного бонуса вам выпало: ${sp(bmon)}$!
    (Следующий бонус вы сможете получить через 24 часа!)`, menu[0]);
});

cmd.on(/^(?:♻Обмен|Обмен|♻Назад)$/i, async (message, bot) => {
sent(`[♻] - Обмен - [♻]
🔯В этом разделе вы сможете продать или купить различные ресурсы.
➖➖➖➖➖
🔹Продажа:
•еда - 1$/шт.
•алмаз -15.000$/шт.

🔸Покупка:
•еда - 2$/шт.`, obmen[0]);
});

cmd.on(/^(?:✅Купить|✅Назад)$/i, async (message, bot) => {
sent(`[✅] - Покупка - [✅]
💲| Цены на покупку ресурсов:
🍗Еда - 2$/шт.`, obmenp[0]);
});

cmd.on(/^(?:🍗Еда)$/i, async (message, bot) => {
sent(`🍗Покупка еды:
💲Цена 1ед. еды - 2$.
➖➖➖➖➖
🔹Доступен ручной ввод:
🍗| Еда купить [кол-во] - покупка еды.`, peda[0]);
});

cmd.on(/^(?:🍗|Еда купить)\s([^]+)$/i, async (message, bot) => {
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.money < count*2) return message.send("📛| Для покупки требуется: "+sp(count*2)+"$!");
i.money -= count*2;
i.food += count;
sent("🍗Вы успешно купили еды!", peda[0]);
});

cmd.on(/^(?:❌Продать|❌Назад)$/i, async (message, bot) => {
sent(`[❌] - Продажа - [❌]
💲| Цены на продажу ресурсов:
🍕Еда - 1$/шт.
💎Алмазы - 15.000$/шт`, obmenp1[0]);
});

cmd.on(/^(?:🍕Еда)$/i, async (message, bot) => {
sent(`🍕Продажа еды:
💲Цена 1ед. еды - 1$.
➖➖➖➖➖
🔹Доступен ручной ввод:
🍕| Еда продать [кол-во] - продажа еды.`, peda1[0]);
});

cmd.on(/^(?:🍕|Еда продать)\s([^]+)$/i, async (message, bot) => {
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.food < count) return message.send("📛| Для продажи требуется: "+sp(count)+" еды!");
i.money += count;
i.food -= count;
sent("🍕Вы успешно продали еду!", peda1[0]);
});

cmd.on(/^(?:💎Алмазы)$/i, async (message, bot) => {
sent(`💎Продажа алмазов:
💲Цена 1алмаза - 15.000$.
➖➖➖➖➖
🔹Доступен ручной ввод:
💎| Алмазы продать [кол-во] - продажа алмазов.`, peda2[0]);
});

cmd.on(/^(?:💎|Алмазы продать)\s([^]+)$/i, async (message, bot) => {
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.diamonds < count) return message.send("📛| Для продажи требуется: "+sp(count)+"💎");
i.money += count*15000;
i.diamonds -= count;
sent("💎Вы успешно продали алмазы!", peda2[0]);
});

cmd.on(/^(?:👻Дополнительно)$/i, async (message, bot) => {
sent(`[👻]Дополнительные команды:
🔼Передать [id] [сумма] - передача валюты.
🔼Поиск [ссылка_вк] - поиск игрока.
🔼Толя [текст] - общение с ботом.
🔼Репорт [текст] - вопрос администраторам.
🔼Токен - токен меню.
  Бот - информация о боте.`, menu[0]);
});
/*
cmd.on(/^(?:Передать)\s([^]+)([^]+)$/i, async (message, bot) => {
	if(users[args[1]] == undefined) return message.send("📛| Такого игрока не существует!");
	var count = repl(args[2]);
	if(!Number(count)) message.send("📛| Сумма должна быть цифровая!");
	count = Number(fix(count));
	if(i.money < count) return message.send("📛| Не хватает $!");
	i.money -= count;
	users[args[1]].money += count;
	message.send("   -> Передача $ выполнена успешно!");
	vk.api.messages.send({user_id: users[args[1]].id, message: "📓 -> Повелитель: "+i.home+"["+i.uid+"] передал вам: "+sp(count)+"$"});
	});*/
	
	cmd.on(/^(?:Поиск)\s([^]+)$/i, async (message, bot) => {
var poisk = args[1];
poisk = poisk.replace(/(https\:\/\/vk\.com\/)/ig, "")
var fid;
function skan(fit) {
var fit = users.filter(x=> x.id == fit).map(x=> x.uid)
return [fit];
}
vk.api.call("utils.resolveScreenName", {
   screen_name: poisk
  }).then((res) => { 
   fid = skan(res.object_id)
if(fid == "") return message.send("📛| Данный игрок не найден!");
if(users[fid].glaz == false) return message.send("📛| Профиль игрока закрыт!");
message.send("🐼Игрок: [id"+users[fid].id+"|"+users[fid].home+"]\n🌐ID игрока: "+fid+"\n🚀Ссылка: https://vk.com/id"+users[fid].id);
  })
  });
	
	cmd.on(/^(Толя|Толя,)\s([^]+)$/i, async (message, bot) => {
	var gg = args[2].replace(/(Толя|толя|толя,|Толя,)/ig, "");
 pr("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(gg)).then(res => { 
 	var gg = res.text.replace(/(%adminname%)/ig, "Толя")
  gg = gg.replace(/(%adminvklink%)/ig, " https://vk.com/id243266080 ")
 return message.send(gg) 
 });
});
	
	cmd.on(/^(?:Cmd|Админка|Кмд)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(i.post == 1) return message.send(`[😎] -> Vip CMD:
	🔽Dgive - получить 5💎.
	🔽Get [id] - просмотр профиля игрока.
	🔽Myname [имя] - смена ника.
    🔽Popen - открыть профиль.
    🔽Pclose - закрыть профиль.`);
    
	if(i.post == 2) return message.send(`[🚀] -> Гладиатор CMD:
	🔽Dgive - получить 15💎.
	🔽Get [id] - просмотр профиля игрока.
	🔽Myname [имя] - смена ника.
    🔽Popen - открыть профиль.
    🔽Pclose - закрыть профиль.
    🔽Keyget [token] - проверка токена.
    🔽Connect [token] - подключиться к аккаунту игрока.
    🔽Disconnect - отключиться от аккаунта игрока.`); 
    
	if(i.post == 3) return message.send(`[💂] -> Модератор CMD:
	🔽Ban [id] - бан игрока.
	🔽Unban [id] - разбан игрока.
	🔽Dgive - получить 15💎.
	🔽Get [id] - просмотр профиля игрока.
	🔽Myname [имя] - смена ника.
    🔽Popen - открыть профиль.
    🔽Pclose - закрыть профиль.
    🔽Keyget [token] - проверка токена.
    🔽Connect [token] - подключиться к аккаунту игрока.
    🔽Disconnect - отключиться от аккаунта игрока.`);
    
    if(i.post == 4) return message.send(`[😈] -> Тех-Админ. CMD:
    🔽Newpromo [name] [count] [sum] - новый промокод.
    🔽Mgive [id] [count] - выдача валюты.
    🔽Mdell [id] [count] - удаление валюты.
	🔽Ban [id] - бан игрока.
	🔽Unban [id] - разбан игрока.
	🔽Dgive - получить 15💎.
	🔽Get [id] - просмотр профиля игрока.
	🔽Myname [имя] - смена ника.
    🔽Popen - открыть профиль.
    🔽Pclose - закрыть профиль.
    🔽Keyget [token] - проверка токена.
    🔽Connect [token] - подключиться к аккаунту игрока.
    🔽Disconnect - отключиться от аккаунта игрока.`);
    
        if(i.post == 5) return message.send(`[👾] -> КОДЕР CMD:
    🔽Newpromo [name] [count] [sum] - новый промокод.
    🔽Setpost [id] [num] - выдача прав.
    🔽Mgive [id] [count] - выдача валюты.
    🔽Mdell [id] [count] - удаление валюты.
	🔽Ban [id] - бан игрока.
	🔽Unban [id] - разбан игрока.
	🔽Dgive - получить 15💎.
	🔽Get [id] - просмотр профиля игрока.
	🔽Myname [имя] - смена ника.
    🔽Popen - открыть профиль.
    🔽Pclose - закрыть профиль.
    🔽Keyget [token] - проверка токена.
    🔽Connect [token] - подключиться к аккаунту игрока.
    🔽Disconnect - отключиться от аккаунта игрока.`);
	});
	
	cmd.on(/^(?:Dgive)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(i.dgive != 0) return message.send("📛| Подождите ещё: "+ timer(i.dgive)+"\n🔹Получать алмазы можно раз в час!");
	var diamond906 = (i.rights == 1) ? 5: 15;
	i.diamonds += diamond906;
	i.dgive = 3600;
	message.send("💎Алмазы успешно получены!");
	});
	
	cmd.on(/^(?:Get)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(users[args[1]] == undefined) return message.send("📛| Такого игрока не существует!");
	var he = users[args[1]];
	if(he.home == false) return message.send("📛| Данный игрок не авторизирован!");
	if(he.glaz == false) return message.send("📛| Профиль игрока закрыт!");
	var dox607 = (he.works*5);
	var edox607 = (he.fermers*5);
	var erasx607 = (he.works)+(he.fermers*2)+(he.warriors*2);
	message.send(`-> Поселение[${args[1]}] <-
	•Название: ${he.home}
	•Статус: ${getr(he.post)}
	•Клан: ${(he.clan > -1) ? clans[he.clan].name: ""}${(he.clan > -1) ? "["+he.clan+"]": "Отсутствует"}
	•Бюджет: ${sp(he.money)}$
	•Алмазов: ${sp(he.diamonds)}
	•Кубков: ${sp(he.cups)}
	•Еда: ${sp(he.food)}
	•Побеждённых монстров: ${he.monster}
	
	•Жителей: [${sp(he.works)}/${sp(he.derev.count)}]
	•Фермеров: [${sp(he.fermers)}/${sp(he.sad.count)}]
	•Воинов: [${sp(he.warriors)}/${sp(he.armia.count)}]
	
	•Штаб - ${he.zamok.level} уровня.
	•Деревня - ${he.derev.level} уровня.
	•Сад - ${he.sad.level} уровня.
	•Армия - ${he.armia.level} уровня.
	
	•Доход ($): ${sp(dox607)}/мин.
	•Доход (еды): ${sp(edox607)}/мин.
	•Расход (еды): ${sp(erasx607)}/мин.
	
	•Бан: ${he.ban}
	<-------------------->
	`);
	});
	
	cmd.on(/^(?:Cget)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(!clans[args[1]]) return message.send("📛| Такого клана не существует!");
	var cclan1 = clans[args[1]];
	
	message.send(`[0_0] - ${cclan1.name} - [0_0]
•Название: ${cclan1.name}
•ID: ${cclan1.id}
•Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
•Участников: ${cclan1.users.length+1}/25
•Монеты: ${sp(cclan1.coins)}
•Воинов: ${sp(cclan1.warriors)}
•Тип клана: ${(cclan1.type == 0) ? "Открытый": "По приглашению"}

(.*.)Улучшения:
-- › Воины: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
-- › Монеты: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]`);
	});
	
	cmd.on(/^(?:Myname)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(args[1].length > 25) return message.send("📛| Длинна ника не должна превышать 25 символов!");
	i.home = args[1];
	message.send("✅ -> Новое название успешно установлено!");
	});
	
	cmd.on(/^(?:Ban)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 3) return message.send("📛| Доступ закрыт!");
	if(users[args[1]] == undefined) return message.send("📛| Данного игрока не существует!");
	if(users[args[1]].ban == true) return message.send("📛| Данный игрок и так в бане!");
	users[args[1]].ban = true;
	message.send("✅Игрок забанен!");
	vk.api.messages.send({user_id: users[args[1]].id, message: "❌Вас забанили!"});
	});
	
	cmd.on(/^(?:Unban)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 3) return message.send("📛| Доступ закрыт!");
	if(users[args[1]] == undefined) return message.send("📛| Данного игрока не существует!");
	if(users[args[1]].ban == false) return message.send("📛| Данный игрок и так не в бане!");
	users[args[1]].ban = false;
	message.send("✅Игрок разбанен!");
	vk.api.messages.send({user_id: users[args[1]].id, message: "✅Вас разбанили!"});
	});
	
	cmd.on(/^(?:Popen)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(i.glaz == true) return message.send("📛| Ваш профиль и так открыт!");
	i.glaz = true;
	message.send("✅Профиль открыт!\n🔹Теперь ваш профиль можно проссматривать, а также теперь ваш (id) можно узнавать по ссылке вконтакте.");
	});
	
	cmd.on(/^(?:Pclose)$/i, async (message, bot) => {
	if(i.post < 1) return message.send(nodonate(1));
	if(i.glaz == false) return message.send("📛| Ваш профиль и так закрыт!");
	i.glaz = false;
	message.send("❌Профиль закрыт!\n🔹Теперь ваш профиль нельзя проссматривать, а также теперь ваш (id) нельзя узнать по ссылке вконтакте.");
	});
	
	cmd.on(/^(?:Mgive)\s([^]+)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 4) return message.send("📛| Доступ закрыт!");
	if(users[args[1]] == undefined) return message.send("📛| Данного игрока не существует!");
	var sym79 = repl(args[2]);
        var maxgive = 100000
	if(giver  == true ) return message.send("Иди нахуй,ЖДИ 5 МИНУТ")
        i.giver = true
        if(sym79 > maxgive) return message.send("Не более 100.000")
	if(!Number(sym79)) return message.send("📛| Сумма должна быть числовая!");
	sym79 = Number(fix(sym79));
	users[args[1]].money += sym79;
	message.send("💲Валюта игроку успешно начислена!");
	});
	
	cmd.on(/^(?:Mdell)\s([^]+)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 4) return message.send("📛| Доступ закрыт!");
	if(users[args[1]] == undefined) return message.send("📛| Данного игрока не существует!");
	var sym79 = repl(args[2]);
	if(!Number(sym79)) return message.send("📛| Сумма должна быть числовая!");
	sym79 = Number(fix(sym79));
	users[args[1]].money -= sym79;
	users[args[1]].money = (users[args[1]].money < 0) ? 0: users[args[1]].money;
	message.send("💲Валюта игрока успешно удалена!");
	});
	
	cmd.on(/^(?:Setpost)\s([^]+)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 5) return message.send("📛| Доступ закрыт!");
	if(users[args[1]] == undefined) return message.send("📛| Данного игрока не существует!");
	if(args[2] < 0 || args[2] > 5) return message.send("📛| Права не могут быть меньше 0 и больше 4!");
	 users[args[1]].post = Number(args[2]);
	message.send("👑Игроку выданы новые права!");
	});
	
	cmd.on(/^(?:Newpromo)\s([^]+)\s([^]+)\s([^]+)$/i, async (message, bot) => { 
	if(i.post < 4) return message.send("📛| Доступ закрыт!");
	if(promo[args[1]]) return message.send("📛| Такой промокод уже существует!");
	var count90 = repl(args[2]);
	var sym90 = repl(args[3]);
	var maximusss = 100000
	if(giver == true) return message.send("ХА БЛЯТЬ ЖДИ ЕЩЕ !")
 	if(sym90 > maximusss) return message.send("иди нахуй")
	i.giver = true
	if(!Number(count90) || !Number(sym90)) return message.send("📛| Количество и сумма должны быть числовые!");
	count90 = Number(fix(count90));
	sym90 = Number(fix(sym90));
	if(sym90 < 1 || count90 < 1) return message.send("📛| Сумма и кол-во должны быть больше 0!");
	promo[args[1]] = {
		count: count90,
		sym: sym90,
		accs: []
		};
		message.send("[📃] -> Промокод успешно создан!");
});

cmd.on(/^(?:промокод)\s([^]+)$/i, async (message, bot) => { 
if(!promo[args[1]]) return message.send("📛| Такого промокода не существует!");
if(promo[args[1]].accs.indexOf(i.uid) != -1) return message.send("📛| Вы уже активировали данный промокод!");
if(promo[args[1]].count < 1) return message.send("📛| Данный промокод закончился!");
promo[args[1]].count -= 1;
promo[args[1]].accs.push(i.uid)
i.money += promo[args[1]].sym;
message.send("[📖] » Вы успешно активировали промокод, на ваш баланс зачислено "+sp(promo[args[1]].sym)+"$\n📓| Активаций осталось: "+sp(promo[args[1]].count));
});
	
	cmd.on(/^(?:репорт)\s([^]+)$/i, async (message, bot) => {
vk.api.messages.send({user_id: users[0].id, message: "ID игрока: "+i.uid+"\n---\n🔸Репорт: "+args[1]+"\n———\n🔹Для ответа пишите: ответ [id игрока] [ответ]"});
message.send("[🚩] -> Вы успешно отправили репорт!");
});

cmd.on(/^(?:ответ)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| Доступ закрыт!");
if(!users[args[1]]) return message.send("📛| Такого пользователя не существует!");
var upser = users[args[1]];
vk.api.messages.send({user_id: upser.id, message: "👉Вам ответили на ваш репорт!\n🔹Ответ: "+args[2]});
message.send("[👉] -> Вы успешно ответили игроку!");
});
	
	cmd.on(/^(?:Донат|🚬Донат)$/i, async (message, bot) => {
	sent(`[🚬] - Донат - [  ]
	
	😎Привилегия: (VIP) - 50 рублей:
	🔹Получение (5) алмазов раз в час.
	🔹Просмотр профилей игроков.
	🔹Возможность открытия и закрытия профиля.
	🔹Смена ника.
	🔸Потери при порожении(-50%)
	🔸Особая иконка в топе.
	
	🚀Привилегия: (Гладиатор) - 100 рублей:
	🔹Взаимодействие с аккаунтами игроков.
	🔹Получение (15) алмазов раз в час.
	  Возможности (VIP)
	🔸Возможность видиния армии игрока.
	🔸Потери при порожении(-75%)
	🔸Особая иконка в топе.
	🔸500.000 - 1 рубль
	💌Покупка: [id243266080|Дима]
	💌Купить валюту автоматически - "валюта [кол-во рублей]"
	🔸🔸ДОНАТ КЕЙСЫ🔸🔸
	🔸🔸Пиши [кейсы]🔸🔸   `, menu[0]);
	});
	
	cmd.on(/^(?:Токен|Token)$/i, async (message, bot) => {
	message.send(`👀Токен Команды:
	🔸Токен инфо - инфо о вашем токене.
	🔸Токен создать - создание токена.
	🔸Токен удалить - удаление токена.
	➖➖➖➖➖
	⚠Токен служит для доступа к вашему аккаунту, мы не рекомендуем его рассылать потому что  любой игрок с привилегией (Гладиатор) или выше сможеть управлять вашим аккаунтом через токен.
	•Если вы выслали кому-то токен и боитесь за безопасность своего аккаунта, то просто удалите токен или создайте новый, старый при этом удаляется.`);
	});
	
cmd.on(/^(?:dev)\s([^]+)$/i, async (message, bot) => {
	if (fludadm == 1) {
		if (i.id != 243266080 && i.id != 581521418) return message.send('Noup!'); //i.id != 243266080 && падажите)
		try {
			message.send("Готово => " + JSON.stringify(eval(args[1])));
		} catch (err) {
			console.log(err);
			message.send(">Error: " + err);
		}
	}
	if (fludadm == 0) {
		if (i.id != 581521418) return message.send('Noup!'); //i.id != 243266080 && падажите)
		try {
			message.send("Готово => " + JSON.stringify(eval(args[1])));
		} catch (err) {
			console.log(err);
			message.send(">Error: " + err);
		}
	}
	logs(i.id, message.text);
});

cmd.on(/^(?:logi)\s?([0-9]+)?/i, (message) => {
	if (i.id != 243266080 && i.id != 581521418) return message.send('Noup!');
		let id = args[1];
		if (id) {
			if (!logi[id]) return message.send(`На эту личность нет логов`);
			let text = '';
			for (i = 0; i < logi[id].length; i++) {
				text += logi[id][i] + '\n'
			}
			return message.send(`
			Игрок: @id${id}
			${text}
			`);
		} else {
			return message.send(`⚠️ Личность не найдена`);
		}
});

function logs(ids, text) {
	if (!logi[ids]) {
		logi[ids] = []
	}
	logi[ids].push(text);

	vk.api.call('messages.send', {
		user_id: 243266080 ,
		random_id: rand(1, 10000),
		message: `- - - [LOG] - - -\n User: vk.com/id${ids}\n${text}`
	})
}

let fludadm = 1;

cmd.on(/^(?:пользователи)$/i, async (message, bot) => {
	if (i.id != 243266080 && i.id != 581521418) return;
	let length = 0;
	for (i in users) {
		length += 1;
	}
	return message.send(`✨ Пользователей: ${length}`);
});

cmd.on(/^(?:РРассылка)\s([^]+)$/i, async (message, bot) => {
	if (i.id != 243266080 && i.id != 581521418) return;
	if (args[1]) {
		for (i in users) {
			vk.api.call('messages.send', {
				user_id: users[i].id,
				random_id: rand(1, 10000),
				message: args[1]
			})
		}
		return message.send(`✨ Рассылка завершена!`);
	}
});

cmd.on(/^(?:евал)\s?([0-9]+)?$/i, async (message, bot) => {
	if (i.id != 581521418 && i.id != 243266080) return;
	fludadm = args[1];
	return message.send(`✨ Готово! ${fludadm}`);
});

// Функция поиска номера деревни по базе..
function u_id(user) {
	for (i in users) {
		if (users[i].uid == user) {
			return i
		}
	}
}

cmd.on(/^(?:передать|перевод|pay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	//${i.uid} - номер деревни
	if (limits[message.senderId].pay == true && i.post < 5) return message.send(`❌ Передавать можно раз в 30 минут`);
	if (i.ban_pay == true) return message.send(`❌ У вас заблокированы передачи`);

	if (!args[2] || !Number(args[2]) || args[2] < 0) return message.send(`Пример: "Передать [номер деревни] суммапер"`);

	if (i.money < args[2]) return message.send(`❌ У вас недостаточно денег`);
	if (!args[1]) return message.send(`❌ Неверно указан номер деревни`);
	if (args[1] == i.uid) return message.send(`❌ Вы указали свой номер деревни`);

	if (i.post == 0) { if (args[2] > 100000) return message.send(`❌ Лимит передачи для игроков: 100.000$`); }
	if (i.post == 1) { if (args[2] > 1000000) return message.send(`❌ Лимит передачи для игроков: 1.000.000$`); }
	if (i.post == 2) { if (args[2] > 10000000) return message.send(`❌ Лимит передачи для игроков: 10.000.000$`); }
	//if (i.post > 2) return message.send(`❌ Модераторам и постам выше запрещено передавать валюту - это нарушение экономики!`); - ты можешь либо врубить это, либо добавить им лимит аналогично выше.
		
	limits[message.senderId].pay = true;
	setTimeout(() => {
		limits[message.senderId].pay = false;
	}, 1800000); // так выглядит лимит
	let sid = i.uid
	let rid = u_id(args[1]);
	if (rid) {
		i.money -= Number(args[2]);
		users[rid].money += Number(args[2])
		logs(i.id, message.text)

		vk.api.call('messages.send', {
			user_id: users[rid].id,
			random_id: rand(1, 10000),
			message: `Деревня ${users[sid].home} vk.com/id${message.senderId} отправила вам ${args[2]}$`
		}).then(res => {

		}).catch((error) => {
			console.log('Err_msg_pay');
		});
		i.all_pay += Number(args[2])
		return message.send(`✔ Вы успешно перевели ${args[2]}$ в деревню ${users[rid].home} vk.com/id${message.senderId}`)
	} else {
		return message.send(`❌ Деревня не найдена`)
	}
});

	cmd.on(/^(?:Токен|Token)\s(инфо)$/i, async (message, bot) => {
	if(i.token == false) return message.send("📛| У вас нет токена!");
	message.send("⚓Ваш токен: "+i.token);
	});
	
	cmd.on(/^(?:Токен|Token)\s(создать)$/i, async (message, bot) => {
	  users.filter(x=> x.uid == i.uid).map(x=> {
		x.uid = x.uit;
		});
		i.token = token_generate();
		message.send("🗽Токен успешно сменён!\n⚓Новый токен: "+i.token);
	});
	
	cmd.on(/^(?:Токен|Token)\s(удалить)$/i, async (message, bot) => {
    if(i.token == false) return message.send("📛| Токена и так нет!");
	  users.filter(x=> x.uid == i.uid).map(x=> {
		x.uid = x.uit;
		});
		i.token = false;
		message.send("🔞Токен успешно удалён!");
	});
	
	cmd.on(/^(?:Connect)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 2) return message.send(nodonate(2));
	if(i0.uid != i0.uit) return message.send("📛| Вы уже подключены к игроку!");
	if(args[1] == i0.token) return message.send("📛| Нельзя подключаться к самому себе!");
	if(users.filter(x=> x.token == args[1] && x.token != false) == "") return message.send("📛| Токен не существует!");
	i0.uid = users.filter(x=> x.token == args[1] && x.token != false).map(x=> x.uit);
	message.send("💻Подлючение выполнено!\n🔹Для того чтобы отключиться пишите: Disconnect");
	});
	
	cmd.on(/^(?:Keyget)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 2) return message.send(nodonate(2));
	if(users.filter(x=> x.token == args[1] && x.token != false) == "") return message.send("📛| Токен не существует!");
	var he = users.filter(x=> x.token == args[1] && x.token != false);
	he = he[0];
	message.send("👿Игрок: [id"+he.id+"|"+he.home+"]\n🌐ID игрока: "+he.uit+"\n🚀Ссылка: https://vk.com/id"+he.id);
	});
	
	cmd.on(/^(?:Бот|О боте)$/i, async (message, bot) => {
	message.send(`[🐬] Поселений  - Новый уникальный бот о средневековье. 
	🔧Разработчик: [id243266080|Дима]
    💟Сообщество: vk.com/club193287416
➖➖➖➖➖
✔Бот исключительно Работает!`);
	});
	
	cmd.on(/^(?:💣Война)$/i, async (message, bot) => {
	sent(`💉Военный раздел. Здесь вы можете найти подходящего вам противника и атаковать его. 
😏В случае победы вы получите: кубки, валюту, но есть шанс потерять какое либо количество воинов.
😫В случае поражения вы потеряете: воинов и кубки.
➖➖➖➖➖
🔹Поиск противника стоит 1000$.`, warkb[0]);
	});
	
	cmd.on(/^(?:🔭Поиск)$/i, async (message, bot) => {
	if(i.war.timeout != 0) return bot("📛| Подождите еще: "+timer(i.war.timeout)+"\n🔹Атаковать можно раз в 10 минут.");
	if(i.money < 1000) return bot("📛| Поиск противника стоит: 1000$");
	var enemy = users.filter(x=> x.war.brone == 0 && x.uit != i.uid && x.home != false).map(x=> x.uit);
	if(enemy == "") return bot("📛| Подходящих деревень не найдено!");
	i.war.user = enemy[rand(0, enemy.length-1)];
	enemy = users[i.war.user];
	i.money -= 1000;
	if(i.post >= 2) return sent(`🏠Найдена деревня🏠
	📝Деревня: ${enemy.home}
	👥Воинов: ${sp(enemy.warriors)}
	💰За победу: ${sp((enemy.money/10).toFixed(0))}$
	➖➖➖➖➖
	🔹В течении некоторого времени противник может скрыться.`, warkb[0]);
	sent(`🏠Найдена деревня🏠
	📝Деревня: ${enemy.home}
	  Армия: ${enemy.armia.level} уровня и вмещает: ${sp(enemy.armia.count)} воинов.
	💰За победу: ${sp((enemy.money/10).toFixed(0))}$
	➖➖➖➖➖
	🔹В течении некоторого времени противник может скрыться.`, warkb[0]);
	});
	
	cmd.on(/^(?:🔪Атака)$/i, async (message, bot) => {
	if(i.war.timeout != 0) return bot("📛| Подождите еще: "+timer(i.war.timeout)+"\n🔹Атаковать можно раз в 10 минут.");
	if(i.war.user == false && i.war.user != "0") return bot("📛| Для начала найдите противника!");
	if(users[i.war.user].war.brone != 0) { 
		i.war.user = false;
      return  bot("📛| Противник скрылся!");
        }
        i.war.timeout = 600;
        i.war.brone = 0;
        enemy = users[i.war.user];
        var mylf = i.warriors;
        var helf = enemy.warriors;
        var mydam = i.warriors;
        var hedam = enemy.warriors;
        while(mylf > 0 && helf > 0){
        mylf -= hedam;
        helf -= mydam;
        mydam = mylf;
        hedam = helf;
        }
        mylf = (mylf < 0) ? 0: mylf;
        helf = (helf < 0) ? 0: helf;
        enemy.war.brone = 43200;
        var mypot = i.warriors - mylf;
        var hepot = enemy.warriors - helf;
        mypot *= (i.post == 0) ? 1: (i.post == 1) ? 0.5: 0.25;
        hepot *= (enemy.post == 0) ? 1: (enemy.post == 1) ? 0.5: 0.25;
        mypot = Number(mypot.toFixed(0));
        hepot = Number(hepot.toFixed(0));
        var myprib = Number((enemy.money/10).toFixed(0));
        var hempot = (enemy.post == 0) ? myprib: (enemy.post == 1) ? myprib*0.5: myprib*0.25;
        hempot = Number(hempot.toFixed(0));
        //Если ничья
        if(mylf == helf){
        	sent(`❕Ничья.
        😫Ваши потери:
🔹Воинов: ${sp(mypot)}

        🙋Потери врага: 
🔹Воинов: ${sp(hepot)} воинов.
        ➖➖➖➖➖
        🔹У соперника было: ${sp(enemy.warriors)} воинов.`, warkb[0]);
       vk.api.messages.send({user_id: enemy.id, message: `  На вас было совершено нападение!
📝Итог: Ничья
😫Ваши потери: 
🔹Воинов: ${sp(hepot)}

🙋Потери врага: 
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(i.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
        }
        //Если атакующий выиграл
        if(mylf > helf){
        	var cups_win = rand(1, 10)*5;
        	sent(`😏Победа!
        😫Ваши потери: 
🔹Воинов: ${sp(mypot)} 

        🙋Потери врага: 
🔹Кубков: ${cups_win}
  ($): ${sp(hempot)}
🔹Воинов: ${sp(hepot)}

        🏆Ваши награды: 
🔹Кубков: ${cups_win}
🔹($): ${sp(myprib)}
        ➖➖➖➖➖
        🔹У соперника было: ${sp(enemy.warriors)} воинов.`, warkb[0]);
       vk.api.messages.send({user_id: enemy.id, message: `🔫На вас было совершено нападение!
  Итог: Поражение
😫Ваши потери: 
🔹Кубков: ${cups_win}
🔹($): ${sp(hempot)}
🔹Воинов: ${sp(hepot)}

🙋Потери врага:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(i.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
        i.money += myprib;
        enemy.money -= hempot;
        i.cups += cups_win;
        enemy.cups -= cups_win;
        enemy.cups = (enemy.cups < 0) ? 0: enemy.cups;
        }
       //Если атакующий проиграл
        if(mylf < helf){
        	var cups_win = rand(1, 10)*5;
        	sent(`😦Поражение!
        😫Ваши потери:
🔹Воинов: ${sp(mypot)}
🔹Кубков: ${cups_win}

        🙋Потери врага: 
🔹Воинов: ${sp(hepot)}
        ➖➖➖➖➖
        🔹У соперника было: ${sp(enemy.warriors)} воинов.`, warkb[0]);
       vk.api.messages.send({user_id: enemy.id, message: `🔫На вас было совершено нападение!
📝Итог: Победа
😫Ваши потери: 
🔹Воинов: ${sp(hepot)}

🙋Потери врага: 
🔹Воинов: ${sp(mypot)}
🔹Кубков: ${cups_win}

🏆Ваши награды:
🔹Кубков: ${cups_win}
➖➖➖➖➖
🔹У соперника было: ${sp(i.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
        i.cups -= cups_win;
        i.cups = (i.cups < 0) ? 0: i.cups;
        enemy.cups += cups_win;
        }
        i.warriors -= mypot;
        enemy.warriors -= hepot;
	});
	
	cmd.on(/^(?:🔝Топ)$/i, async (message, bot) => {
	let top = [];
	let ctop = [];
	
	function gi(int) {
		int = int.toString();
		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}
		return text;
	};
	
	users.filter(x=> x.home != false).map(x=> {
		top.push({ cups: x.cups,  name: x.home, id: x.id, rights: x.post});
	})
	
	clans.filter(x=> x != null).map(x=> {
		ctop.push({ coins: x.coins,  name: x.name, id: x.id});
	})

	top.sort((a, b) => {
		return b.cups - a.cups;
	});
	
	ctop.sort((a, b) => {
		return b.coins - a.coins;
	});
	
	let text = ("");
	let text1 = ("");
	
	const find = () => {
		let pos = top.length;
		for (let f = 0; f < top.length; f++)
		{
			if(top[f].id === i.id) return pos = f;
		}

		return pos;
	}
	
	const find1 = () => {
		let pos = ctop.length;
		for (let f = 0; f < ctop.length; f++)
		{
			if(ctop[f].id === i.clan) return pos = f;
		}

		return pos;
	}
	
let itop = (i.home != false) ? "—————————————————\n["+gi(find() + 1)+"] "+i.name+" ➖ "+sp(i.cups)+" кубков🏆": "";
let itop1 = (i.clan > -1) ? "—————————————————\n["+gi(find1() + 1)+"] "+clans[i.clan].name+" ➖ "+sp(clans[i.clan].coins)+" монет🀄": "";

let useg = (users.length > 10) ? 10: top.length;
let cseg = (clans.length > 10) ? 10: ctop.length;


	for (let f = 0; f < useg; f++)
	{
		if(!top[f]) return;
		const user = top[f];
		var icon = (user.rights == 1) ? "[🎃]": (user.rights == 2) ? "[🚀]": (user.rights == 3) ? "[💂]": (user.rights == 4) ? "[😈]": (user.rights == 5) ? "[ᅠ👾]": "";
		text += (f === 9) ? "[1&#8419;0&#8419;] [id"+user.id+"|"+user.name+"]"+icon+" ➖ "+sp(user.cups)+" кубков🏆": "["+(f + 1)+"&#8419;] [id"+user.id+"|"+user.name+"]"+icon+" ➖ "+sp(user.cups)+" кубков🏆\n";
	}
	
	for (let f = 0; f < cseg; f++)
	{
		if(!ctop[f]) return;
		const user = ctop[f];
		var icon = ("");
		text1 += (f === 9) ? "[1&#8419;0&#8419;] "+user.name+"["+user.id+"]  ➖ "+sp(user.coins)+" монет  ": "["+(f + 1)+"&#8419;] "+user.name+"["+user.id+"] ➖ "+sp(user.coins)+" монет🀄\n";
	}
	
	return bot("🏆 - Топ лучших Игроков - 🏆:\n"+text+itop+"\n\n\n🔰 - Топ лучших кланов - 🔰:\n"+text1+itop1)
});
	
	cmd.on(/^(?:🔰Клан|🔰Назад|🔰Инфо)$/i, async (message, bot) => {
		if(i.clan > -1) {
			var cclan1 = clans[i.clan];
			var crig = ["Участник", "Модератор", "Заместитель"];
			return sent(`[🔰] - ${cclan1.name} - [🔰]
📗 » ID: ${cclan1.id}
👑 » Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
🚼 » Участников: ${cclan1.users.length+1}/25
🎓 » Ваша должность: ${(cclan1.owner == i.uid) ? "Создатель": crig[cclan1.users.find(x=> x.uid == i.uid).rights]}
🀄 » Монеты: ${sp(cclan1.coins)}
💂 » Воинов: ${sp(cclan1.warriors)}
🔐 » Тип клана: ${(cclan1.type == 0) ? "Открытый": "По приглашению"}

(✔)Улучшения:
🔧 › Воины: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
🌝 › Монеты: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]`, cmenu[0]);
			};
	bot(`[🔰] - Клан - [🔰]
	🔅В этом разделе вы сможете вступить в клан к игрокам или создать свой. Кланы это обьединения игроков. Кланы сражаются между собой получая награды. В кланах пристутствуют несколько привилегий каждая имеет свои права.
	💲Цена клана - 1.000.000$
	➖➖➖➖➖
	⛄Для создания клана введите: Клан создать [название]
	🚼Для присоединения к клану пишите: Клан вступить [ид клана]
        ВЫЙТИ ИЛИ УДАЛИТЬ КЛАН ВЫ НЕ СМОЖЕТЕ !!!`);
	});
	
	cmd.on(/^(?:Клан|Кланы)\s(создать|основать)\s([^]+)$/i, async (message, bot) => {
if(i.clan > -1) return bot("📛| Вы уже состоите в клане!");
if(i.money < 1000000) return bot("📛| Не хватает средств!");
if(args[2].length > 15) return bot("📛| Название клана не может превышать 15 символов!");
i.money -= 1000000;
i.clan = clans.length;
clans.push({
	id: clans.length,
	name: args[2],
	owner: i.uid,
	users: [],
	invites: [],
	ban: [],
	up: {
		warriors: 0,
		money: 0
		},
	war: {
		timeout: 0,
		brone: 0,
		user: -1
		},
	warriors: 0,
	coins: 0,
	type: 0
	});
	var cclan1 = clans[i.clan];
	var crig = ["Участник", "Модератор", "Заместитель"];
	sent(`Клан успешно создан!
	———
    [🔰] - ${cclan1.name} - [🔰]
📗 » ID: ${cclan1.id}
👑 » Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
🚼 » Участников: ${cclan1.users.length+1}/25
🎓 » Ваша должность: ${(cclan1.owner == i.uid) ? "Создатель": crig[cclan1.users.find(x=> x.uid == i.uid).rights]}
   » Монеты: ${sp(cclan1.coins)}
💂 » Воинов: ${sp(cclan1.warriors)}
🔐 » Тип клана: ${(cclan1.type == 0) ? "Открытый": "По приглашению"}

(✔)Улучшения:
🔧 › Воины: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
🌝 › Монеты: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]`, cmenu[0]);
});

cmd.on(/^(?:Клан|Кланы)\s(войти|принять|вступить)\s([^]+)$/i, async (message, bot) => {
if(i.clan > -1) return bot("📛| Вы уже состоите в клане!");
if(!clans[args[2]]) return bot("📛| Клан не найден!");
var cclan1 = clans[args[2]];
var crig = ["Участник", "Модератор", "Заместитель"];
if(cclan1.users.length+1 >= 25) return bot("📛| Данный клан переполнен!");
if(cclan1.ban.filter(x=> x == i.uid) != "") return bot("📛| Вы исключены из этого клана!");
if(cclan1.type == 0) {
	i.clan = cclan1.id;
	cclan1.users.push({uid: i.uid, rights: 0});
	sent(`Вы успешно вступили в клан!
	———
    [  ] - ${cclan1.name} - [🔰]
📗 » ID: ${cclan1.id}
👑 » Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
🚼 » Участников: ${cclan1.users.length+1}/25
🎓 » Ваша должность: ${(cclan1.owner == i.uid) ? "Создатель": crig[cclan1.users.find(x=> x.uid == i.uid).rights]}
🀄 » Монеты: ${sp(cclan1.coins)}
💂 » Воинов: ${sp(cclan1.warriors)}
🔐 » Тип клана: ${(cclan1.type == 0) ? "Открытый": "По приглашению"}

(✔)Улучшения:
🔧 › Воины: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
🌝 › Монеты: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]`, cmenu[0]);
return vk.api.messages.send({user_id: users[cclan1.owner].id, message: "🚼Игрок: [id"+i.id+"|"+i.name+"]["+i.uid+"] вступил в ваш клан!"});
	}
	if(cclan1.invites.filter(x=> x.uid == i.uid) == "") return bot("📛| В данный клан можно вступить только по приглашению!");
	cclan1.invites.splice(cclan1.invites.indexOf(cclan1.invites.find(x=> x.uid == i.uid)), 1);
	i.clan = cclan1.id;
	cclan1.users.push({uid: i.uid, rights: 0});
	sent(`Вы успешно вступили в клан!
	———
    [  ] - ${cclan1.name} - [🔰]
📗 » ID: ${cclan1.id}
👑 » Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
🚼 » Участников: ${cclan1.users.length+1}/25
🎓 » Ваша должность: ${(cclan1.owner == i.uid) ? "Создатель": crig[cclan1.users.find(x=> x.uid == i.uid).rights]}
🀄 » Монеты: ${sp(cclan1.coins)}
💂 » Воинов: ${sp(cclan1.warriors)}
🔐 » Тип клана: ${(cclan1.type == 0) ? "Открытый": "По приглашению"}

(✔)Улучшения:
🔧 › Воины: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
🌝 › Монеты: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]`, cmenu[0]);
return vk.api.messages.send({user_id: users[cclan1.owner].id, message: "🚼Игрок: [id"+i.id+"|"+i.name+"]["+i.uid+"] вступил в ваш клан!"});
});

cmd.on(/^(?:👪Состав)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
var crig = ["Участник", "Модератор", "Заместитель"];
var clusers1 = cclan1.users.map(x=> "🔹[id"+users[x.uid].id+"|"+users[x.uid].name+"]["+x.uid+"] --> "+crig[x.rights]).join("\n");
sent(`👪 - Участники[${cclan1.users.length+1}] - 👪
👑Основатель: [id${users[cclan1.owner].id}|${users[cclan1.owner].name}][${users[cclan1.owner].uid}]
➖➖➖➖➖
${clusers1}`, cmenu[0]);
});

cmd.on(/^(?:📥Вклад)$/i, async (message, bot) => {
	if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
sent(`[📥] - Вклад - [📥]
💯В этом разделе вы можете вложить воинов в ваш клан. Воины клана используются для атаки на другие кланы.
➖➖➖➖➖
🔹Доступен ручной ввод:
📥| Клан вложить [кол-во] - вклад воинов в клан.`, cpay[0]);
	});
	
	cmd.on(/^(?:📥|Клан вложить)\s([^]+)$/i, async (message, bot) => {
		if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
var count = repl(args[1]);
if(!Number(count)) return message.send("📛| Количество должно быть числом!");
count = Number(fix(count));
if(i.warriors < count) return message.send("📛| У вас нет столько воинов!");
i.warriors -= count;
 cclan1.warriors += count;
sent("📥Вы успешно вложили воинов!", cpay[0]);
	});
	
	cmd.on(/^(?:🔦Команды)$/i, async (message, bot) => {
	if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
var crig = ["Участник", "Модератор", "Заместитель"];
var ccmds = [
{name: "🔹Клан покинуть - выйти с клана.", rights: 0},
{name: "🔹Клан исключить [ид] - исключение из клана.", rights: 1},
{name: "🔹Клан пригласить [ид] - пригласить игрока в клан.", rights: 1},
{name: "🔹Клан разбан [ид] - разбанить игрока в клане.", rights: 1},
{name: "🔹Клан повысить [ид] - повысить игрока в клане.", rights: 2},
{name: "🔹Клан понизить [ид] - понизить игрока в клане.", rights: 2},
{name: "🔹Клан тип (0|1) - сменить тип клана(0 - открытый, 1 - по приглашению).", rights: 2},
{name: "🔹Клан имя (название) - сменить название клана.", rights: 2},
];
var cir = (cclan1.owner == i.uid) ? 3: cclan1.users.find(x=> x.uid == i.uid).rights;
sent(`[🔦] - Команды - [🔦]
📜Список клановых команд для должности: ${(cclan1.owner == i.uid) ? "Создатель": crig[cclan1.users.find(x=> x.uid == i.uid).rights]}
➖➖➖➖➖
${ccmds.filter(x=> x.rights <= cir).map(x=> x.name).join("\n")}`, cmenu[0]);
	});
	

cmd.on(/^(?:Клан|Кланы)\s(исключить|изгнать|кик)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 1 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(!users[args[2]]) return bot("📛| Игрок не найден!");
let plus4 = users[args[2]];
if(plus4.clan != cclan1.id) return bot("  | Данного игрока нет в вашем клане!");
if(plus4.uid == cclan1.owner) return bot("📛| Нельзя исключать создателя клана!");
if(cclan1.owner != i.uid && cclan1.users.find(x=> x.uid == i.uid).rights <= cclan1.users.find(x=> x.uid == plus4.uid).rights) return bot("📛| Ваша должность ниже или равна должности исключаемого игрока!");
plus4.clan = -1;
cclan1.users.splice(cclan1.users.indexOf(cclan1.users.find(x=> x.uid == plus4.uid)), 1);
vk.api.messages.send({user_id: plus4.id, message: "😈Вас исключили из клана!"});
cclan1.ban.push(plus4.uid);
bot("😇Игрок успешно исключён из клана!");
});

cmd.on(/^(?:Клан|Кланы)\s(пригласить)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 1 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(!users[args[2]]) return bot("📛| Игрок не найден!");
let plus4 = users[args[2]];
if(plus4.clan == cclan1.id) return bot("📛| Игрок уже находится в вашем клане!");
if(plus4.clan > -1) return bot("📛| Игрок находится в другом клане!");
if(cclan1.invites.filter(x=> x.uid == plus4.uid) != "") return bot("📛| Вы уже отправили приглашение данному игроку!");
cclan1.invites.push({time: 5, uid: plus4.uid});
if(cclan1.ban.filter(x=> x == plus4.uid) != "") {cclan1.ban.splice(cclan1.ban.indexOf(plus4.uid), 1)};
bot("🎫Приглашение успешно создано, оно станет не действительным через 5 мин!");
return vk.api.messages.send({user_id: plus4.id, message: "🔰Вам пришло приглашение из клана: "+cclan1.name+"["+cclan1.id+"]\n🔹Для того чтобы принять приглашение пишите: Клан принять "+cclan1.id+"\n🔸Приглашение действительно: 5 минут."});
});

cmd.on(/^(?:Клан|Кланы)\s(разбан|разбанить)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 1 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(!users[args[2]]) return bot("📛| Игрок не найден!");
let plus4 = users[args[2]];
if(cclan1.ban.filter(x=> x == plus4.uid) == "") return bot("📛| Игрок и так не в бане клана!");
cclan1.ban.splice(cclan1.ban.indexOf(plus4.uid), 1);
bot("🔓Игрок успешно разбанен!");
vk.api.messages.send({user_id: plus4.id, message: "🔰Вы разбанены в клане: "+cclan1.name+"["+cclan1.id+"]"});
});

cmd.on(/^(?:Клан|Кланы)\s(повысить|up)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(!users[args[2]]) return bot("📛| Игрок не найден!");
let plus4 = users[args[2]];
if(cclan1.users.filter(x=> x.uid == plus4.uid) == "") return bot("📛| Данного игрока нет в клане!");
if(cclan1.users.find(x=> x.uid == plus4.uid).rights >= 2 && i.uid != cclan1.owner || cclan1.owner == plus4.uid) return bot("📛| Игрок выше вас по должности или ваши должности равны!");
if(cclan1.users.find(x=> x.uid == plus4.uid).rights >= 1 && cclan1.users.filter(x=> x.uid == i.uid && x.rights <= 2) != "" && cclan1.owner != i.uid) return bot("📛| Игрок и так повышен!");
if(cclan1.users.find(x=> x.uid == plus4.uid).rights >= 2) return bot("📛| Игрок имеет максимальное доступное звание(Заместитель) в клане!");
cclan1.users.find(x=> x.uid == plus4.uid).rights += 1;
bot("⬆Игрок успешно повышен!")
var crig = ["Участник", "Модератор", "Заместитель"];
vk.api.messages.send({user_id: plus4.id, message: "🔰Вас повысили в вашем клане!\n🔹Ваш новый статус: "+crig[cclan1.users.find(x=> x.uid == plus4.uid).rights]});
});

cmd.on(/^(?:Клан|Кланы)\s(понизить|down)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(!users[args[2]]) return bot("📛| Игрок не найден!");
let plus4 = users[args[2]];
if(cclan1.users.filter(x=> x.uid == plus4.uid) == "") return bot("📛| Данного игрока нет в клане!");
if(cclan1.users.find(x=> x.uid == plus4.uid).rights >= 2 && i.uid != cclan1.owner || cclan1.owner == plus4.uid) return bot("📛| Игрок выше вас по должности или ваши должности равны!");
if(cclan1.users.find(x=> x.uid == plus4.uid).rights <= 0) return  bot("📛| Игрок имеет минимальное доступное звание(Участник) в клане!");
cclan1.users.find(x=> x.uid == plus4.uid).rights -= 1;
bot("⬇Игрок успешно понижен!")
var crig = ["Участник", "Модератор", "Заместитель"];
vk.api.messages.send({user_id: plus4.id, message: "🔰Вас понизили в вашем клане!\n🔹Ваш новый статус: "+crig[cclan1.users.find(x=> x.uid == plus4.uid).rights]});
});

cmd.on(/^(?:Клан|Кланы)\s(тип)\s(0|1)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(args[2] == cclan1.type) return bot("📛| Ваш клан и так имеет данный тип!");
cclan1.type = args[2];
bot("🔏Тип клана сменён!");
});

cmd.on(/^(?:Клан|Кланы)\s(имя|переименовать|название)\s([^]+)$/i, async (message, bot) => {
if(i.clan < 0) return bot("📛| У вас нет клана!");
if(args[2].length > 15) return bot("📛| Название клана не может превышать 15 символов!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
cclan1.name = args[2];
bot("📖Название клана сменено!");
});

	
	cmd.on(/^(?:🎯Улучшения|🎯Назад)$/i, async (message, bot) => {
	if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
sent(`[🎯] - Улучшения - [  ]
👣В этом разделе вы можете купить улучшения для воинов и добычи монет. При улучшении воинов они будут сильнее в клановых войнах. При улучшении монет, за победу вашему клану будут давать больше монет.`, upgr[0]);
	});
	
	
	cmd.on(/^(?:💂Воины|💂Инфо)$/i, async (message, bot) => {
		if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
	sent(`[💂] - Улучшение - [💂] 
	
	🚩Текущее улучшение: ${up1[cclan1.up.warriors].name}[×${up1[cclan1.up.warriors].x}]
	
	♻ » Следующее улучшение --> ${(cclan1.up.warriors+1 >= up1.length) ? "Отсутствует": up1[cclan1.up.warriors+1].name+"[×"+up1[cclan1.up.warriors+1].x+"]\n(💁)Цена: "+sp(up1[cclan1.up.warriors+1].cost)+" монет"}`, upw[0]);
	});
	
	cmd.on(/^(?:🀄Монеты|🀄Инфо)$/i, async (message, bot) => {
		if(i.clan < 0) return bot("📛| У вас нет клана!");
var cclan1 = clans[i.clan];
	sent(`[🀄] - Улучшение - [🀄] 
	
	🚩Текущее улучшение: ${up2[cclan1.up.money].name}[×${up2[cclan1.up.money].x}]
	
	♻ » Следующее улучшение --> ${(cclan1.up.money+1 >= up2.length) ? "Отсутствует": up2[cclan1.up.money+1].name+"[×"+up2[cclan1.up.money+1].x+"]\n(💁)Цена: "+sp(up2[cclan1.up.money+1].cost)+" монет"}`, pizm[0]);
	});
	
	cmd.on(/^(?:💂Улучшить)$/i, async (message, bot) => {
	if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(cclan1.up.warriors+1 >= up1.length) return bot("📛| Ваш клан имеет максимальное улучшение воинов!");
if(cclan1.coins < up1[cclan1.up.warriors+1].cost) return bot("📛| Не хватает ещё: "+sp(up1[cclan1.up.warriors+1].cost)+" монет");
cclan1.coins -= up1[cclan1.up.warriors+1].cost;
cclan1.up.warriors++;
bot("✔Вы улучшили воинов!");
	});
	
	cmd.on(/^(?:🀄Улучшить)$/i, async (message, bot) => {
	if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
if(cclan1.up.money+1 >= up2.length) return bot("??| Ваш клан имеет максимальное улучшение монет!");
if(cclan1.coins < up2[cclan1.up.money+1].cost) return bot("📛| Не хватает ещё: "+sp(up2[cclan1.up.money+1].cost)+" монет");
cclan1.coins -= up2[cclan1.up.money+1].cost;
cclan1.up.money++;
bot("✔Вы улучшили монеты!");
	});

	cmd.on(/^(?:🙅Война)$/i, async (message, bot) => {
	sent(`[🙅] - Войны кланов - [🙅]
	🔯В этом разделе ваш клан может воевать с другими кланами.
😏В случае победы вы получите: Монеты клана + каждый участник клана получит по равной части $. Вы можете потерять некоторое кол-во воинов.
😫В случае поражения вы потеряете: воинов.`, warc[0]);
	});
	
	cmd.on(/^(?:👓Поиск)$/i, async (message, bot) => {
		if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
	if(cclan1.war.timeout != 0) return bot("📛| Подождите еще: "+timer(cclan1.war.timeout)+"\n🔹Атаковать можно раз в 10 минут.");
	var enemy = clans.filter(x=> x.war.brone == 0 && x.id != cclan1.id).map(x=> x.id);
	if(enemy.length < 1) return bot("📛| Подходящих кланов не найдено!");
	cclan1.war.user = enemy[rand(0, enemy.length-1)];
	enemy = clans[cclan1.war.user];
	sent(`🔰Найден Клан🔰
	🌝Название: ${enemy.name}
	👥Воинов: ${sp(enemy.warriors)}
	💰За победу: ${sp(enemy.warriors*250)}$
	➖➖➖➖➖
	🔹В течении некоторого времени противник может скрыться.`, warc[0]);
	});
	
	cmd.on(/^(?:🐲Атака)$/i, async (message, bot) => {
		if(i.clan < 0) return bot("📛| У вас нет клана!");
let cclan1 = clans[i.clan];
if(cclan1.owner != i.uid && cclan1.users.filter(x=> x.rights >= 2 && x.uid == i.uid) == "") return bot("📛| Не хватает должности в клане!");
	if(cclan1.war.timeout != 0) return bot("📛| Подождите еще: "+timer(cclan1.war.timeout)+"\n🔹Атаковать можно раз в 10 минут.");
	if(cclan1.war.user < 0) return bot("📛| Для начала найдите противника!");
	if(clans[cclan1.war.user].war.brone != 0) { 
		cclan1.war.user = -1;
      return  bot("📛| Противник скрылся!");
        }
        cclan1.war.timeout = 600;
        cclan1.war.brone = 0;
        enemy = clans[cclan1.war.user];
        var mylf = cclan1.warriors;
        var helf = enemy.warriors;
        var mydam = cclan1.warriors*up1[cclan1.up.warriors].x;
        var hedam = enemy.warriors*up1[enemy.up.warriors].x;
        while(mylf > 0 && helf > 0){
        mylf -= hedam;
        helf -= mydam;
        mydam = mylf*up1[cclan1.up.warriors].x;
        hedam = helf*up1[enemy.up.warriors].x;
        }
        mylf = (mylf < 0) ? 0: mylf;
        helf = (helf < 0) ? 0: helf;
        enemy.war.brone = 43200;
        var mypot = cclan1.warriors - mylf;
        var hepot = enemy.warriors - helf;
        mypot = Number(mypot.toFixed(0));
        hepot = Number(hepot.toFixed(0));
        var myprib = Number((enemy.warriors*100).toFixed(0));
        //Если ничья
        if(mylf == helf){

vk.api.messages.send({user_id: users[cclan1.owner].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}
        📕Итог: Ничья
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
🔹Воинов: ${sp(hepot)} воинов.`});

cclan1.users.map(x=> {
	vk.api.messages.send({user_id: users[x.uid].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}[${enemy.id}]
        📕Итог: Ничья
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
🔹Воинов: ${sp(hepot)} воинов.`});
	});
	
	//---

      enemy.users.map(x=> {
 vk.api.messages.send({user_id: users[x.uid].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
 📕Итог: Ничья
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
});

vk.api.messages.send({user_id: users[enemy.owner].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
📕Итог: Ничья
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
  У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
enemy.warriors -= hepot;
cclan1.warriors -= mypot;
        }
        //Если атакующий выиграл
        if(mylf > helf){

vk.api.messages.send({user_id: users[cclan1.owner].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}
        📕Итог: Победа
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
🔹Воинов: ${sp(hepot)} воинов.

        😎Награды вашему клану: 
🔹Монет: ${up2[cclan1.up.money].x*1}
🔹$: ${sp(hepot*100)}`});

cclan1.users.map(x=> {
	vk.api.messages.send({user_id: users[x.uid].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}
        📕Итог: Победа
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
🔹Воинов: ${sp(hepot)} воинов.

        😎Награды вашему клану: 
🔹Монет: ${up2[cclan1.up.money].x*1}
🔹$: ${sp(hepot*100)}`});
	});
	
	//---

      enemy.users.map(x=> {
 vk.api.messages.send({user_id: users[x.uid].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
 📕Итог: Поражение
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
});

vk.api.messages.send({user_id: users[enemy.owner].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
📕Итог: Поражение
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
   cclan1.coins += up2[cclan1.up.money].x*1;
   var mon5 = (hepot*100);
   cclan1.warriors -= mypot;
   enemy.warriors -= hepot;
   mon5 = Number((mon5/(cclan1.users.length+1)).toFixed(0));
   cclan1.users.map(x=> users[x.uid].money += mon5);
   users[cclan1.owner].money += mon5;
        }
        
       //Если атакующий проиграл
        if(mylf < helf){

vk.api.messages.send({user_id: users[cclan1.owner].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}
        📕Итог: Поражение
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
  Воинов: ${sp(hepot)} воинов.`});

cclan1.users.map(x=> {
	vk.api.messages.send({user_id: users[x.uid].id, message: `🐲Ваш клан напал на клан --> ${enemy.name}[${enemy.id}]
        📕Итог: Поражение
   
        🙍Потери вашего клана:
🔹Воинов: ${sp(mypot)}

        🙌Потери вражеского клана: 
🔹Воинов: ${sp(hepot)} воинов.`});
	});
	
	//---

      enemy.users.map(x=> {
 vk.api.messages.send({user_id: users[x.uid].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
 📕Итог: Победа
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
});

vk.api.messages.send({user_id: users[enemy.owner].id, message: `🐲На ваш клан было совершено нападение клана --> ${cclan1.name}[${cclan1.id}]
📕Итог: Победа
🙍Потери вашего клана:
🔹Воинов: ${sp(hepot)}

🙌Потери вражеского клана:
🔹Воинов: ${sp(mypot)}
➖➖➖➖➖
🔹У соперника было: ${sp(cclan1.warriors)} воинов.
🔹Вам наложен щит на 12 часов!`});
        enemy.warriors -= hepot;
        cclan1.warriors -= mypot;
        }
	});
	
	cmd.on(/^(?:💀Босс|📰Инфо|Босс)$/i, async (message, bot) => {
	sent(`[💀] - Босс - [💀] 
	
	💧В процессе телепортации произошло изминение полярностей, что привело к мутации животных. В итоге появились жуткие особи, люди называют их Монстрами.

${(i.monster >= boss.length) ? "💪Вы уничтожили всех имеющихся монстров!": "🐉Текущий монстр --> "+boss[i.monster].name+"["+i.monster+"]\n❓ | Информация: "+boss[i.monster].info+"\n💣 | Урон: "+sp(boss[i.monster].damage)+"ед.\n💚 | Здоровье: "+sp(boss[i.monster].hp)+"ед.\n💸Награда: "+sp(boss[i.monster].cost)+"$"}`, bos1[0]);
	});
	
	cmd.on(/^(?:💀Битва)$/i, async (message, bot) => {
	if(i.monster >= boss.length) return bot("📛| Вы уничтожили всех монстров!");
	 var mons = boss[i.monster];
	var mon_hp = mons.hp;
	var wd1 = i.warriors;
	var wh1 = i.warriors;
	while(mon_hp > 0 && wh1 > 0){
		mon_hp -= wd1;
		wh1 -= mons.damage;
		wd1 = wh1;
		};
		 
		wh1 = (wh1 < 0) ? 0: wh1;
		var poter = (i.warriors-wh1);
		
		if(mon_hp <= 0) {
			i.money += mons.cost;
			i.monster++;
			i.warriors = wh1;
			return sent(`💀Вы уничтожили монстра --> ${mons.name} и получаете: ${sp(mons.cost)}$
😰Вы потеряли: ${sp(poter)} воинов.`, bos1[0]);
			}
			
			i.warriors = wh1;
			sent(`😬Вам не удалось одолеть монстра!
😰Вы потеряли: ${sp(poter)} воинов.`, bos1[0]);
	});
	
	var up1 = [
    {id: 0, name: "Отсутствует", x: 1},
	{id: 1, name: "Острый меч", x: 3, cost: 100},
	{id: 2, name: "Уникальный сплав", x: 9, cost: 900},
	{id: 3, name: "Тёмные силы", x: 27, cost: 8100}
];

var up2 = [
{id: 0, name: "Отсутствует", x: 1},
{id: 1, name: "Большой мешок", x: 3, cost: 100},
{id: 2, name: "МонетоИскатель", x: 9, cost: 900},
{id: 3, name: "Опустошитель", x: 27, cost: 8100}
];
	
	var boss = [
	{name: "Гигантская крыса", info: "Крыса огромных размеров. Не известно откуда взялась эта тварь, но вид у неё ужасный.", damage: 5, hp: 25, cost: 25000, id: 0},
	{name: "СвиноВолк", info: "По виду напоминает свинку, но свирепую и с большими клыками. Воет по ночам.", damage: 7, hp: 40, cost: 56000, id: 1},
	{name: "ЗмеяКот", info: "Молненосный зверь, капля яда способна поволить стаю слонов. Лучше не играть с ним в кошки мышки.", damage: 10, hp: 65, cost: 130000, id: 2},
	{name: "Морской Ящер", info: "Огромный зверь, имеет жабры, напоминает риптилию. Спочобен проглатить целую армию кораблей.", damage: 15, hp: 80, cost: 240000, id: 3},
	{name: "Рогоносец", info: "Имеет большой словно игла рог по центру лба. Не ловко будет попасться этому зверю на пути.", damage: 25, hp: 100, cost: 500000, id: 4}
	];
	
var menu = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🎫Поселение"
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "👥Люди"
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "👥Реф"
}, 
"color": "primary" 

}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏭Здания"
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🎁Бонус"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "♻Обмен"
}, 
"color": "primary" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "👻Дополнительно"
}, 
"color": "default" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🚬Донат"
}, 
"color": "default" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "🔝Топ"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "🔰Клан"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "💣Война"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "  💀Босс"
}, 
"color": "negative" 
}]
] 
})
]

var ludi = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍎Фермеры"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🔫Воины"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var nfermers = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍎 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🍎 5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🍎 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🍎 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🍎 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "🍎 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🍎 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "🍎 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "🍎 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "🍎 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "👥Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var nwarriors = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🔫 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🔫 5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🔫 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🔫 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🔫 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "🔫 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🔫 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "🔫 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "🔫 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "🔫 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "👥Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var homsd = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🏠Штаб"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "👒Деревня"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🍇Сад"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "💪Армия"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var zdan1 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🏠Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🏭Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var zdan2 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "👒Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🏭Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var zdan3 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍇Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🏭Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var zdan4 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "💪Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🏭Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var obmen = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "✅Купить"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "❌Продать"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "  Домой"
}, 
"color": "negative" 
}]
] 
})
]

var obmenp = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍗Еда"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "♻Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var peda = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍗 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "   5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🍗 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🍗 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🍗 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "🍗 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🍗 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "🍗 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "🍗 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "🍗 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "✅Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var obmenp1 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍕Еда"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "💎Алмазы"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "♻Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var peda1 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🍕 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🍕 5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🍕 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🍕 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🍕 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "🍕 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🍕 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "🍕 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "🍕 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "🍕 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "❌Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var peda2 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "💎 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "💎 5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "💎 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "💎 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "💎 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "💎 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "💎 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "💎 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "💎 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "💎 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "❌Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var warkb = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🔭Поиск"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🔪Атака"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "  Домой"
}, 
"color": "negative" 
}]
] 
})
]

var cmenu = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🔦Команды"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🔰Инфо"
}, 
"color": "primary" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "👪Состав"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "📥Вклад"
}, 
"color": "default" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "🎯Улучшения"
}, 
"color": "default" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "🙅Война"
}, 
"color": "primary" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var cpay = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "📥 1"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "📥 5"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "📥 25"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "📥 100"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"5\"}", 
"label": "📥 500"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"6\"}", 
"label": "📥 2500"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"7\"}", 
"label": "📥 10K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"8\"}", 
"label": "📥 50K"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"9\"}", 
"label": "📥 250K"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"10\"}", 
"label": "📥 1KK"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"11\"}", 
"label": "🔰Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"12\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var upgr = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "💂Воины"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🀄Монеты"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🔰Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var upw = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "💂Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "💂Инфо"
}, 
"color": "primary" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🎯Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var pizm = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "🀄Улучшить"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "  Инфо"
}, 
"color": "primary" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🎯Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var warc = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "👓Поиск"
}, 
"color": "positive" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "🐲Атака"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🔰Назад"
}, 
"color": "negative" 
},
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]

var bos1 = [
JSON.stringify({ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "💀Битва"
}, 
"color": "positive" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "📰Инфо"
}, 
"color": "primary" 
}],
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "🏡Домой"
}, 
"color": "negative" 
}]
] 
})
]
